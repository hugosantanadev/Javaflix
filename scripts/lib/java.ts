import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Compila e executa trechos Java com o JDK instalado.
 *
 * Um trecho pode ser:
 * - programa completo (tem `void main(`): compilado como está;
 * - unidade de compilação sem main (só tipos): apenas compilado;
 * - sequência de comandos: embrulhado num `main` com imports comuns.
 *   O embrulho ocupa 2 linhas antes do código, e os números de linha dos
 *   erros são corrigidos para bater com o código mostrado ao aluno.
 */

export const IMPORTS_DO_EMBRULHO =
  'import java.util.*; import java.util.function.*; import java.util.stream.*; import java.time.*; import java.time.format.*; import java.io.*; import java.nio.file.*; import java.math.*;';

export interface FontePreparada {
  arquivo: string;
  classePrincipal: string | null;
  texto: string;
  deslocamento: number;
  modo: 'programa' | 'unidade' | 'trecho';
}

export interface ErroCompilacao {
  linha: number;
  mensagem: string;
}

export interface ResultadoJava {
  compilou: boolean;
  erros: ErroCompilacao[];
  executou: boolean;
  saida: string;
  stderr: string;
  codigoSaida: number | null;
  excecao: string | null;
  estourouTempo: boolean;
  fonte: FontePreparada;
}

/** Troca comentários, strings, text blocks e chars por espaços (mantendo quebras de linha). */
export function apagarLiterais(src: string): string {
  const out = src.split('');
  let i = 0;
  const blank = (from: number, to: number) => {
    for (let k = from; k < to && k < out.length; k++) if (out[k] !== '\n') out[k] = ' ';
  };
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (c === '/' && n === '/') {
      const end = src.indexOf('\n', i);
      const stop = end === -1 ? src.length : end;
      blank(i, stop);
      i = stop;
    } else if (c === '/' && n === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? src.length : end + 2;
      blank(i, stop);
      i = stop;
    } else if (c === '"' && src.startsWith('"""', i)) {
      let j = i + 3;
      while (j < src.length) {
        if (src[j] === '\\') {
          j += 2;
          continue;
        }
        if (src.startsWith('"""', j)) break;
        j++;
      }
      const stop = Math.min(src.length, j + 3);
      blank(i, stop);
      i = stop;
    } else if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c && src[j] !== '\n') {
        if (src[j] === '\\') j++;
        j++;
      }
      const stop = Math.min(src.length, j + 1);
      blank(i, stop);
      i = stop;
    } else {
      i++;
    }
  }
  return out.join('');
}

interface TipoTopo {
  nome: string;
  publico: boolean;
  /** Início da declaração, incluindo modificadores e anotações. */
  inicioDecl: number;
  inicioCorpo: number;
  fimCorpo: number;
}

function tiposDeTopo(limpo: string): TipoTopo[] {
  const tipos: TipoTopo[] = [];
  let profundidade = 0;
  let pendente: { nome: string; publico: boolean; inicioDecl: number } | null = null;
  let inicioCorpo = -1;
  const re = /\b(class|interface|enum|record)\s+([A-Za-z_$][\w$]*)/y;
  for (let i = 0; i < limpo.length; i++) {
    const c = limpo[i];
    if (profundidade === 0 && !pendente && /[a-z]/.test(c) && (i === 0 || /[^\w$.@]/.test(limpo[i - 1]))) {
      re.lastIndex = i;
      const m = re.exec(limpo);
      if (m) {
        // procura "public" entre o fim da declaração anterior e aqui
        let k = i - 1;
        while (k >= 0 && limpo[k] !== ';' && limpo[k] !== '}' && limpo[k] !== '{') k--;
        const prefixo = limpo.slice(k + 1, i);
        pendente = { nome: m[2], publico: /\bpublic\b/.test(prefixo), inicioDecl: k + 1 };
        i = re.lastIndex - 1;
        continue;
      }
    }
    if (c === '{') {
      if (profundidade === 0 && pendente) inicioCorpo = i;
      profundidade++;
    } else if (c === '}') {
      profundidade--;
      if (profundidade === 0 && pendente && inicioCorpo >= 0) {
        tipos.push({ ...pendente, inicioCorpo, fimCorpo: i });
        pendente = null;
        inicioCorpo = -1;
      }
    }
  }
  return tipos;
}

export function prepararFonte(codigo: string): FontePreparada {
  const limpo = apagarLiterais(codigo);
  const temMain = /\bvoid\s+main\s*\(/.test(limpo);
  const tipos = tiposDeTopo(limpo);
  const pacote = /^\s*package\s+([\w.]+)\s*;/m.exec(limpo)?.[1];
  const qualificar = (nome: string) => (pacote ? `${pacote}.${nome}` : nome);

  // Tipos declarados no topo seguidos de comandos soltos (ex.: um record local antes
  // do código que o usa) formam um trecho, não uma unidade de compilação.
  let foraDosTipos = limpo;
  for (const t of [...tipos].reverse()) {
    foraDosTipos = foraDosTipos.slice(0, t.inicioDecl) + foraDosTipos.slice(t.fimCorpo + 1);
  }
  foraDosTipos = foraDosTipos.replace(/\b(import|package)\b[^;]*;/g, '');
  const comandosSoltos = !temMain && tipos.length > 0 && foraDosTipos.trim() !== '';

  if (temMain || (tipos.length > 0 && !comandosSoltos)) {
    const publico = tipos.find((t) => t.publico);
    let classePrincipal: string | null = null;
    let arquivo = publico ? `${publico.nome}.java` : 'Main.java';
    if (temMain) {
      const comMain = tipos.find((t) => /\bvoid\s+main\s*\(/.test(limpo.slice(t.inicioCorpo, t.fimCorpo)));
      if (comMain) {
        classePrincipal = qualificar(comMain.nome);
        if (!publico) arquivo = `${comMain.nome}.java`;
      } else {
        // arquivo-fonte compacto (Java 25): classe implícita com o nome do arquivo
        classePrincipal = 'Main';
        arquivo = 'Main.java';
      }
    }
    return { arquivo, classePrincipal, texto: codigo, deslocamento: 0, modo: temMain ? 'programa' : 'unidade' };
  }

  const texto = `${IMPORTS_DO_EMBRULHO}\npublic class Main { public static void main(String[] args) throws Exception {\n${codigo}\n}}\n`;
  return { arquivo: 'Main.java', classePrincipal: 'Main', texto, deslocamento: 2, modo: 'trecho' };
}

interface Processo {
  codigo: number | null;
  stdout: string;
  stderr: string;
  estourouTempo: boolean;
}

function executar(cmd: string, args: string[], cwd: string, timeoutMs: number, entrada?: string): Promise<Processo> {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { cwd, windowsHide: true });
    // sem entrada, o stdin fecha na hora: um Scanner lendo do teclado recebe fim de arquivo
    p.stdin.on('error', () => {});
    p.stdin.end(entrada ?? '');
    let stdout = '';
    let stderr = '';
    let estourouTempo = false;
    const timer = setTimeout(() => {
      estourouTempo = true;
      p.kill('SIGKILL');
    }, timeoutMs);
    p.stdout.setEncoding('utf8');
    p.stderr.setEncoding('utf8');
    p.stdout.on('data', (d) => (stdout += d));
    p.stderr.on('data', (d) => (stderr += d));
    p.on('error', (e) => {
      clearTimeout(timer);
      resolve({ codigo: -1, stdout, stderr: stderr + String(e), estourouTempo });
    });
    p.on('close', (codigo) => {
      clearTimeout(timer);
      resolve({ codigo, stdout, stderr, estourouTempo });
    });
  });
}

export function normalizarSaida(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '');
}

const RAIZ = join(tmpdir(), 'javaflix-verify');
const JVM_RAPIDA = ['-XX:TieredStopAtLevel=1', '-XX:+UseSerialGC', '-Xshare:auto'];

export async function compilarEExecutar(
  codigo: string,
  opcoes: { release: number; executar: boolean; timeoutMs?: number; entrada?: string },
): Promise<ResultadoJava> {
  const fonte = prepararFonte(codigo);
  const hash = createHash('sha1').update(`${opcoes.release}\n${fonte.texto}`).digest('hex').slice(0, 16);
  const dir = join(RAIZ, `${hash}-${Math.random().toString(36).slice(2, 8)}`);
  const src = join(dir, 'src');
  const out = join(dir, 'out');
  await mkdir(src, { recursive: true });
  await mkdir(out, { recursive: true });
  await writeFile(join(src, fonte.arquivo), fonte.texto, 'utf8');

  try {
    const javac = await executar(
      'javac',
      [
        ...JVM_RAPIDA.map((f) => `-J${f}`),
        '-J-Dstdout.encoding=UTF-8',
        '-J-Dstderr.encoding=UTF-8',
        '--release',
        String(opcoes.release),
        '-encoding',
        'UTF-8',
        '-nowarn',
        '-Xlint:none',
        '-Xmaxerrs',
        '20',
        '-d',
        out,
        join('src', fonte.arquivo),
      ],
      dir,
      60_000,
    );
    const erros: ErroCompilacao[] = [];
    const reErro = /^.*?\.java:(\d+): error: (.*)$/gm;
    let m: RegExpExecArray | null;
    while ((m = reErro.exec(javac.stderr))) {
      erros.push({ linha: Number(m[1]) - fonte.deslocamento, mensagem: m[2] });
    }
    const compilou = javac.codigo === 0;
    if (!compilou && erros.length === 0) {
      erros.push({ linha: 0, mensagem: javac.stderr.trim() || 'javac falhou' });
    }
    const base: ResultadoJava = {
      compilou,
      erros,
      executou: false,
      saida: '',
      stderr: javac.stderr,
      codigoSaida: null,
      excecao: null,
      estourouTempo: javac.estourouTempo,
      fonte,
    };
    if (!compilou || !opcoes.executar || !fonte.classePrincipal) return base;

    const java = await executar(
      'java',
      [...JVM_RAPIDA, '-Dstdout.encoding=UTF-8', '-Dstderr.encoding=UTF-8', '-cp', out, fonte.classePrincipal],
      dir,
      opcoes.timeoutMs ?? 15_000,
      opcoes.entrada,
    );
    const exc = /Exception in thread "[^"]*" ([\w.$]+)/.exec(java.stderr)?.[1] ?? null;
    return {
      ...base,
      executou: true,
      saida: normalizarSaida(java.stdout),
      stderr: java.stderr,
      codigoSaida: java.codigo,
      excecao: exc ? exc.split('.').pop()! : null,
      estourouTempo: java.estourouTempo,
    };
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

export async function versaoDoJdk(): Promise<string | null> {
  const r = await executar('javac', ['-version'], process.cwd(), 30_000);
  if (r.codigo !== 0) return null;
  return (r.stdout + r.stderr).trim();
}
