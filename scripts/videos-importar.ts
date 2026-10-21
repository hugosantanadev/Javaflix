/**
 * npm run videos:importar
 *
 * Liga os vídeos do curso (Google Drive) aos episódios da Javaflix e grava
 * src/content/videos.local.ts, um arquivo pessoal que fica fora do git.
 *
 * Fontes da lista de vídeos:
 *   1. videos.txt na raiz, uma linha por vídeo:
 *        Módulo / Submódulo | Título | https://drive.google.com/file/d/ID/view | 12:40
 *      (módulo e duração são opcionais; linhas com # são comentários).
 *      Para gerar a lista de uma pasta privada, use scripts/drive-listar.gs.
 *   2. Pasta pública, pela API do Drive:
 *        GOOGLE_API_KEY=xxx npm run videos:importar -- --pasta https://drive.google.com/drive/folders/ID
 *
 * Episódios: se scripts/videos-regras.ts tiver regras, elas decidem. Sem
 * regras, o script sugere até 2 episódios pelas palavras-chave do catálogo.
 * Ligações editadas à mão são mantidas, a menos que você passe --refazer.
 *
 * --conta email@gmail.com  conta do Google que o player deve usar
 */
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { EPISODIOS, getTemporadaDoEpisodio } from '../src/content/catalogo.ts';
import type { VideoCurso } from '../src/content/types.ts';
import { REGRAS } from './videos-regras.ts';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ARQ_TXT = join(RAIZ, 'videos.txt');
const ARQ_TS = join(RAIZ, 'src', 'content', 'videos.local.ts');
const args = process.argv.slice(2);
const REFAZER = args.includes('--refazer');
const PASTA = args.includes('--pasta') ? args[args.indexOf('--pasta') + 1] : null;
const CONTA = args.includes('--conta') ? args[args.indexOf('--conta') + 1] : null;
const MAX_EPISODIOS = 3;

const semAcento = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '');

/** Para as regras: minúsculas, sem acento, pontuação preservada. */
const paraRegra = (s: string) => semAcento(s.toLowerCase()).replace(/\s+/g, ' ').trim();

/** Para as palavras-chave: só letras, dígitos e alguns símbolos. */
const normalizar = (s: string) =>
  semAcento(s.toLowerCase())
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Tira marcas de redistribuição, emojis e espaços sobrando dos títulos. */
export function limparTitulo(s: string): string {
  return s
    .replace(/\s*-?\s*Cat[aá]logo( no)? Telegram.*$/i, '')
    .replace(/\s*-?\s*Telegram\s+@\S+.*$/i, '')
    .replace(/\p{Extended_Pictographic}|\p{Variation_Selector}/gu, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[\s\-–]+$/, '')
    .trim();
}

export function idDoDrive(link: string): string | null {
  const padroes = [/\/file\/d\/([\w-]{10,})/, /[?&]id=([\w-]{10,})/, /\/d\/([\w-]{10,})/, /^([\w-]{25,})$/];
  for (const p of padroes) {
    const m = p.exec(link.trim());
    if (m) return m[1];
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Fontes                                                              */
/* ------------------------------------------------------------------ */

interface Bruto {
  driveId: string;
  titulo: string;
  modulo?: string;
  duracao?: string;
}

async function lerTxt(): Promise<Bruto[]> {
  if (!existsSync(ARQ_TXT)) return [];
  const linhas = (await readFile(ARQ_TXT, 'utf8')).split(/\r?\n/);
  const lista: Bruto[] = [];
  let n = 0;
  for (const linha of linhas) {
    const l = linha.trim();
    if (!l || l.startsWith('#')) continue;
    const partes = l.split('|').map((p) => p.trim());
    const iLink = partes.findIndex((p) => /drive\.google\.com|^[\w-]{25,}$/.test(p));
    if (iLink < 0) {
      console.warn(`  ignorada (sem link do Drive): ${l}`);
      continue;
    }
    const driveId = idDoDrive(partes[iLink]);
    if (!driveId) {
      console.warn(`  ignorada (não achei o ID no link): ${l}`);
      continue;
    }
    n++;
    const antes = partes.slice(0, iLink);
    const depois = partes.slice(iLink + 1);
    const titulo = limparTitulo(antes.length ? antes[antes.length - 1] : `Vídeo ${n}`);
    const modulo = antes.length > 1 ? limparTitulo(antes.slice(0, -1).join(' / ')) : undefined;
    const duracao = depois.find((d) => /^\d{1,2}:\d{2}(:\d{2})?$/.test(d));
    lista.push({ driveId, titulo, modulo, duracao });
  }
  return lista;
}

async function listarPasta(pasta: string): Promise<Bruto[]> {
  const chave = process.env.GOOGLE_API_KEY;
  if (!chave) {
    console.error('  Para ler uma pasta, defina GOOGLE_API_KEY (veja docs/VIDEOS.md). Usando só o videos.txt.');
    return [];
  }
  const raiz = /folders\/([\w-]+)/.exec(pasta)?.[1] ?? pasta;
  const saida: Bruto[] = [];
  async function visitar(id: string, modulo?: string) {
    let token: string | undefined;
    do {
      const q = encodeURIComponent(`'${id}' in parents and trashed = false`);
      const url =
        `https://www.googleapis.com/drive/v3/files?q=${q}&key=${chave}&pageSize=1000&orderBy=name` +
        `&supportsAllDrives=true&includeItemsFromAllDrives=true` +
        `&fields=nextPageToken,files(id,name,mimeType,videoMediaMetadata(durationMillis))` +
        (token ? `&pageToken=${token}` : '');
      const r = await fetch(url);
      if (!r.ok) throw new Error(`Drive API ${r.status}: ${await r.text()}`);
      const dados = (await r.json()) as {
        nextPageToken?: string;
        files: { id: string; name: string; mimeType: string; videoMediaMetadata?: { durationMillis?: string } }[];
      };
      for (const f of dados.files) {
        if (f.mimeType === 'application/vnd.google-apps.folder') await visitar(f.id, modulo ? `${modulo} / ${f.name}` : f.name);
        else if (f.mimeType.startsWith('video/')) {
          const ms = Number(f.videoMediaMetadata?.durationMillis ?? 0);
          const duracao = ms ? `${Math.floor(ms / 60000)}:${String(Math.round((ms % 60000) / 1000)).padStart(2, '0')}` : undefined;
          saida.push({
            driveId: f.id,
            titulo: limparTitulo(f.name.replace(/\.(mp4|mkv|mov|webm|avi)$/i, '')),
            modulo: modulo ? limparTitulo(modulo) : undefined,
            duracao,
          });
        }
      }
      token = dados.nextPageToken;
    } while (token);
  }
  await visitar(raiz);
  return saida;
}

/* ------------------------------------------------------------------ */
/* Casamento vídeo → episódio                                          */
/* ------------------------------------------------------------------ */

const IDS_VALIDOS = new Set(EPISODIOS.map((e) => e.id));

function pelasRegras(b: Bruto): string[] {
  const texto = paraRegra(`${b.modulo ?? ''} | ${b.titulo}`);
  const eps: string[] = [];
  for (const [re, ids] of REGRAS) {
    if (!re.test(texto)) continue;
    for (const id of ids) if (!eps.includes(id)) eps.push(id);
  }
  return eps.slice(0, MAX_EPISODIOS);
}

const PALAVRAS_VAZIAS = new Set(['a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'com', 'para', 'por', 'um', 'uma', 'aula', 'parte', 'modulo', 'video', 'java']);

function pontuar(titulo: string, ep: (typeof EPISODIOS)[number]): number {
  const t = ` ${normalizar(titulo)} `;
  let pts = 0;
  for (const tag of ep.tags) {
    const n = normalizar(tag);
    if (n && t.includes(` ${n} `)) pts += 2 + n.split(' ').length;
    else if (n.length >= 5 && t.includes(n)) pts += 1.5;
  }
  const palavras = normalizar(ep.titulo)
    .split(' ')
    .filter((p) => p.length > 2 && !PALAVRAS_VAZIAS.has(p));
  for (const p of palavras) if (t.includes(` ${p} `)) pts += 1;
  return pts;
}

function pelasPalavras(b: Bruto): string[] {
  const titulo = `${b.modulo ?? ''} ${b.titulo}`;
  const notas = EPISODIOS.map((ep) => ({ id: ep.id, pts: pontuar(titulo, ep) }))
    .filter((x) => x.pts >= 3)
    .sort((a, b2) => b2.pts - a.pts);
  if (!notas.length) return [];
  const melhor = notas[0].pts;
  return notas.filter((x) => x.pts >= melhor * 0.75).slice(0, 2).map((x) => x.id);
}

const sugerir = (b: Bruto) => (REGRAS.length ? pelasRegras(b) : pelasPalavras(b));

/* ------------------------------------------------------------------ */

async function atuais(): Promise<{ videos: VideoCurso[]; conta: string | null }> {
  if (!existsSync(ARQ_TS)) return { videos: [], conta: null };
  const mod = await import(`${pathToFileURL(ARQ_TS).href}?t=${Date.now()}`);
  return { videos: (mod.VIDEOS ?? []) as VideoCurso[], conta: (mod.CONTA_DRIVE ?? null) as string | null };
}

function gerarTs(videos: VideoCurso[], conta: string | null) {
  const corpo = videos
    .map((v) => {
      const campos = [
        `driveId: ${JSON.stringify(v.driveId)}`,
        `titulo: ${JSON.stringify(v.titulo)}`,
        v.modulo ? `modulo: ${JSON.stringify(v.modulo)}` : null,
        v.duracao ? `duracao: ${JSON.stringify(v.duracao)}` : null,
        `episodios: ${JSON.stringify(v.episodios)}`,
      ].filter(Boolean);
      return `  {\n    ${campos.join(',\n    ')},\n  },`;
    })
    .join('\n');
  return `// Arquivo pessoal gerado por \`npm run videos:importar\`. Fica fora do git (.gitignore).
// Pode editar \`episodios\` à mão: o importador mantém as suas escolhas, a menos que rode com --refazer.
import type { VideoCurso } from './types';

/** Conta do Google com acesso aos vídeos; o player abre o Drive com ela. */
export const CONTA_DRIVE: string | null = ${JSON.stringify(conta)};

export const VIDEOS: VideoCurso[] = [
${corpo}
];
`;
}

const ordem = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });

async function main() {
  console.log('\nJavaflix · importar vídeos do Drive\n');
  const brutos = [...(await lerTxt()), ...(PASTA ? await listarPasta(PASTA) : [])];
  if (!brutos.length) {
    console.log('  Nada para importar. Crie videos.txt na raiz (veja docs/VIDEOS.md) ou use --pasta.\n');
    process.exit(1);
  }
  const atual = await atuais();
  const existentes = new Map(atual.videos.map((v) => [v.driveId, v]));
  const conta = CONTA ?? atual.conta;
  const vistos = new Set<string>();
  const videos: VideoCurso[] = [];
  for (const b of brutos) {
    if (vistos.has(b.driveId)) continue;
    vistos.add(b.driveId);
    const antigo = existentes.get(b.driveId);
    const episodios = antigo && !REFAZER ? antigo.episodios : sugerir(b);
    for (const id of episodios) if (!IDS_VALIDOS.has(id)) console.warn(`  episódio inexistente: ${id}`);
    videos.push({ ...b, episodios: episodios.filter((id) => IDS_VALIDOS.has(id)) });
  }
  for (const [id, v] of existentes) if (!vistos.has(id)) videos.push(v);
  videos.sort((a, b) => ordem.compare(a.modulo ?? '', b.modulo ?? '') || ordem.compare(a.titulo, b.titulo));

  await writeFile(ARQ_TS, gerarTs(videos, conta), 'utf8');

  const porTemporada = new Map<string, number>();
  for (const v of videos)
    for (const id of v.episodios) {
      const t = getTemporadaDoEpisodio(id)!;
      porTemporada.set(t.id, (porTemporada.get(t.id) ?? 0) + 1);
    }
  const ligados = videos.filter((v) => v.episodios.length).length;
  console.log(`  ${videos.length} vídeos, ${ligados} ligados a episódios, ${videos.length - ligados} só na página Vídeos.`);
  console.log(`  Conta do player: ${conta ?? 'nenhuma (arquivos públicos)'}`);
  console.log('\n  Ligações por temporada:');
  for (const [t, n] of [...porTemporada].sort((a, b) => ordem.compare(a[0], b[0]))) console.log(`    ${t.padEnd(22)} ${n}`);
  const semEp = new Map<string, number>();
  for (const v of videos) if (!v.episodios.length) semEp.set(v.modulo ?? 'Sem módulo', (semEp.get(v.modulo ?? 'Sem módulo') ?? 0) + 1);
  console.log('\n  Sem episódio, por pasta:');
  for (const [m, n] of semEp) console.log(`    ${String(n).padStart(3)}  ${m}`);
  console.log(`\n  Arquivo: src/content/videos.local.ts\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
