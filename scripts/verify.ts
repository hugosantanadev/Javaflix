/**
 * npm run verify
 *
 * 1. Confere a estrutura de todas as temporadas geradas contra o catálogo.
 * 2. Compila e roda o Java de cada questão verificável, de cada exemplo de
 *    aula marcado com `java executar` e de cada solução de desafio, em todas
 *    as versões do Java cobertas pelas provas da questão (17, 21 e/ou 25).
 * 3. Reprova o conteúdo quando o gabarito diverge do que o JDK faz.
 *
 * Flags:
 *   --sem-java          só a checagem estrutural
 *   --temporada <id>    verifica só uma temporada
 *   --projeto <id>      verifica só um projeto
 *   --sem-cache         ignora o cache de resultados
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { CARGOS, getCargo, getTemporada } from '../src/content/catalogo.ts';
import { getProjeto, PROJETOS } from '../src/content/projetos.ts';
import type { Bug, EpisodioConteudo, Exercicio, ProjetoConteudo, Prova, TemporadaConteudo } from '../src/content/types.ts';
import { compilarEExecutar, normalizarSaida, versaoDoJdk, type ResultadoJava } from './lib/java.ts';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR_TEMPORADAS = join(RAIZ, 'src', 'content', 'temporadas');
const DIR_PROJETOS = join(RAIZ, 'src', 'content', 'projetos');
const ARQ_CACHE = join(RAIZ, 'node_modules', '.cache', 'javaflix', 'java-cache.json');

const args = process.argv.slice(2);
const SEM_JAVA = args.includes('--sem-java');
const SEM_CACHE = args.includes('--sem-cache');
const SO_TEMPORADA = args.includes('--temporada') ? args[args.indexOf('--temporada') + 1] : null;
const SO_PROJETO = args.includes('--projeto') ? args[args.indexOf('--projeto') + 1] : null;

const RELEASE: Record<Prova, 17 | 21 | 25> = { '829': 17, '830': 21, '831': 25 };
const EPISODIOS_IDS = new Set(CARGOS.flatMap((c) => c.temporadas.flatMap((t) => t.episodios.map((e) => e.id))));
/** "Escolha duas." ou "Escolha dois." conforme o gênero do que se escolhe. */
const POR_EXTENSO: Record<number, string> = { 2: '(duas|dois)', 3: 'três', 4: 'quatro', 5: 'cinco' };

const cor = {
  verm: (s: string) => `\x1b[31m${s}\x1b[0m`,
  verde: (s: string) => `\x1b[32m${s}\x1b[0m`,
  amarelo: (s: string) => `\x1b[33m${s}\x1b[0m`,
  cinza: (s: string) => `\x1b[90m${s}\x1b[0m`,
  negrito: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

const problemas: { onde: string; msg: string }[] = [];
const falha = (onde: string, msg: string) => problemas.push({ onde, msg });

/* ------------------------------------------------------------------ */
/* Carregamento                                                        */
/* ------------------------------------------------------------------ */

async function carregarConteudo(): Promise<{ temporadas: TemporadaConteudo[]; projetos: ProjetoConteudo[] }> {
  const pastas = existsSync(DIR_TEMPORADAS) ? (await readdir(DIR_TEMPORADAS, { withFileTypes: true })).filter((d) => d.isDirectory()) : [];
  const pastasProjeto = existsSync(DIR_PROJETOS) ? (await readdir(DIR_PROJETOS, { withFileTypes: true })).filter((d) => d.isDirectory()) : [];
  const lista: TemporadaConteudo[] = [];
  const projetos: ProjetoConteudo[] = [];
  // O conteúdo importa as aulas como `./e01.md?raw`; o Vite resolve isso igual ao site.
  const vite = await createServer({
    root: RAIZ,
    configFile: false,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    for (const p of pastas) {
      if (SO_PROJETO || (SO_TEMPORADA && p.name !== SO_TEMPORADA)) continue;
      const arq = join(DIR_TEMPORADAS, p.name, 'index.ts');
      if (!existsSync(arq)) {
        falha(p.name, 'pasta sem index.ts');
        continue;
      }
      let mod: { default?: TemporadaConteudo };
      try {
        mod = await vite.ssrLoadModule(`/src/content/temporadas/${p.name}/index.ts`);
      } catch (e) {
        falha(p.name, `erro ao carregar: ${(e as Error).message}`);
        continue;
      }
      const t = mod.default;
      if (!t || !Array.isArray(t.episodios)) {
        falha(p.name, 'index.ts precisa ter `export default` de uma TemporadaConteudo');
        continue;
      }
      if (t.id !== p.name) falha(p.name, `id "${t.id}" diferente do nome da pasta`);
      lista.push(t);
    }
    for (const p of pastasProjeto) {
      if (SO_TEMPORADA || (SO_PROJETO && p.name !== SO_PROJETO)) continue;
      let mod: { default?: ProjetoConteudo };
      try {
        mod = await vite.ssrLoadModule(`/src/content/projetos/${p.name}/index.ts`);
      } catch (e) {
        falha(`projeto ${p.name}`, `erro ao carregar: ${(e as Error).message}`);
        continue;
      }
      const pj = mod.default;
      if (!pj || !Array.isArray(pj.etapas)) {
        falha(`projeto ${p.name}`, 'index.ts precisa ter `export default` de um ProjetoConteudo');
        continue;
      }
      if (pj.id !== p.name) falha(`projeto ${p.name}`, `id "${pj.id}" diferente do nome da pasta`);
      projetos.push(pj);
    }
  } finally {
    await vite.close();
  }
  return { temporadas: lista, projetos };
}

/* ------------------------------------------------------------------ */
/* Checagem estrutural                                                 */
/* ------------------------------------------------------------------ */

const idsVistos = new Map<string, string>();

function semCrases(s: string): string {
  const m = /^\s*`+([\s\S]*?)`+\s*$/.exec(s);
  return m ? m[1] : s;
}

function provasDaQuestao(q: Exercicio, padrao: Prova[]): Prova[] {
  return q.provas ?? padrao;
}

function releasesDaQuestao(q: Exercicio, padrao: Prova[]): number[] {
  if (q.release) return [q.release];
  const ps = provasDaQuestao(q, padrao);
  if (ps.length === 0) return [25];
  return [...new Set(ps.map((p) => RELEASE[p]))].sort((a, b) => a - b);
}

function checarExercicio(q: Exercicio, onde: string, prefixo: string, provasPermitidas: Prova[]) {
  const aqui = `${onde} › ${q.id}`;
  if (!q.id.startsWith(prefixo)) falha(aqui, `id deve começar com "${prefixo}"`);
  if (idsVistos.has(q.id)) falha(aqui, `id repetido (também em ${idsVistos.get(q.id)})`);
  idsVistos.set(q.id, onde);
  if (!q.enunciado || q.enunciado.trim().length < 10) falha(aqui, 'enunciado vazio ou curto demais');
  if (!q.explicacao || q.explicacao.trim().length < 40) falha(aqui, 'explicação curta demais (mín. 40 caracteres)');
  if (q.provas) {
    for (const p of q.provas) if (!provasPermitidas.includes(p)) falha(aqui, `prova ${p} não está entre as do episódio/temporada`);
    if (q.provas.length === 0 && provasPermitidas.length > 0) falha(aqui, 'provas: [] numa questão de certificação');
  }

  switch (q.tipo) {
    case 'escolha': {
      if (q.opcoes.length < 3 || q.opcoes.length > 8) falha(aqui, 'escolha precisa de 3 a 8 opções');
      if (q.resposta < 0 || q.resposta >= q.opcoes.length) falha(aqui, 'resposta fora do intervalo');
      if (new Set(q.opcoes.map((o) => o.trim())).size !== q.opcoes.length) falha(aqui, 'opções repetidas');
      break;
    }
    case 'multipla': {
      if (q.opcoes.length < 4 || q.opcoes.length > 8) falha(aqui, 'múltipla precisa de 4 a 8 opções');
      const r = new Set(q.respostas);
      if (r.size !== q.respostas.length) falha(aqui, 'respostas repetidas');
      if (q.respostas.length < 2 || q.respostas.length >= q.opcoes.length) falha(aqui, 'múltipla precisa de 2+ respostas e ao menos 1 errada');
      if (q.respostas.some((i) => i < 0 || i >= q.opcoes.length)) falha(aqui, 'resposta fora do intervalo');
      const palavra = POR_EXTENSO[q.respostas.length];
      if (palavra && !new RegExp(`escolha ${palavra}`, 'i').test(q.enunciado)) {
        falha(aqui, `enunciado deve dizer "Escolha ${palavra.replace(/[()]/g, '').replace('|', '/')}." (há ${q.respostas.length} corretas)`);
      }
      if (new Set(q.opcoes.map((o) => o.trim())).size !== q.opcoes.length) falha(aqui, 'opções repetidas');
      break;
    }
    case 'saida':
      if (!q.resposta && q.resposta !== '') falha(aqui, 'saída sem resposta');
      break;
    case 'lacuna': {
      const n = q.codigo.split('___').length - 1;
      if (n !== 1) falha(aqui, `lacuna precisa de exatamente um "___" (achei ${n})`);
      if (q.respostas.length === 0) falha(aqui, 'lacuna sem respostas aceitas');
      break;
    }
    case 'linha': {
      const linhas = q.codigo.split('\n').length;
      if (q.resposta < 1 || q.resposta > linhas) falha(aqui, `linha ${q.resposta} fora do código (${linhas} linhas)`);
      break;
    }
  }
}

function eVerificavel(q: Exercicio) {
  return q.tipo === 'saida' || q.tipo === 'lacuna' || q.tipo === 'linha' || !!q.verificar;
}

let semIa = 0;
let semBugs = 0;
let semMatematica = 0;
let semFigura = 0;
let semLivros = 0;
let semDeitel = 0;
let semDica = 0;

function checarBug(b: Bug, onde: string, idEsperado: string) {
  const aqui = `${onde} › ${b.id}`;
  if (b.id !== idEsperado) falha(aqui, `id deveria ser ${idEsperado}`);
  const linhas = b.codigo.split('\n');
  const corrigidas = b.correcao.split('\n');
  if (b.linha < 1 || b.linha > linhas.length) falha(aqui, `linha ${b.linha} fora do código (${linhas.length} linhas)`);
  if (corrigidas.length !== linhas.length) falha(aqui, `a correção tem ${corrigidas.length} linhas, o código com bug tem ${linhas.length}`);
  else {
    const mudadas = linhas.map((l, i) => (l === corrigidas[i] ? 0 : i + 1)).filter(Boolean);
    if (!mudadas.includes(b.linha)) falha(aqui, `a linha ${b.linha} não muda na correção (mudam: ${mudadas.join(', ') || 'nenhuma'})`);
  }
  if (b.sintoma.length < 20) falha(aqui, 'descreva o sintoma (20+ caracteres)');
  if (b.dica.length < 20) falha(aqui, 'escreva uma dica (20+ caracteres)');
  if (b.explicacao.length < 40) falha(aqui, 'explicação curta demais (40+ caracteres)');
  if (b.efeito.tipo === 'saida' && normalizarSaida(b.efeito.saida) === normalizarSaida(b.saidaCorrigida)) falha(aqui, 'a saída com bug é igual à corrigida');
}

/** Monta questões equivalentes para reaproveitar a verificação: o bug como descrito e a correção rodando limpa. */
function agendarBug(b: Bug, onde: string, provas: Prova[]) {
  const base = { enunciado: '', explicacao: '', dificuldade: b.dificuldade } as const;
  let comBug: Exercicio;
  if (b.efeito.tipo === 'naoCompila') comBug = { ...base, id: b.id, tipo: 'linha', codigo: b.codigo, resposta: b.linha };
  else if (b.efeito.tipo === 'saida') comBug = { ...base, id: b.id, tipo: 'saida', codigo: b.codigo, resposta: b.efeito.saida };
  else comBug = { ...base, id: b.id, tipo: 'escolha', codigo: b.codigo, opcoes: ['-'], resposta: 0, verificar: { tipo: 'excecao', nome: b.efeito.nome } };
  agendarQuestao(comBug, onde, provas);
  agendarQuestao({ ...base, id: `${b.id} (correção)`, tipo: 'saida', codigo: b.correcao, resposta: b.saidaCorrigida }, onde, provas);
}

/** Figuras só de public/figuras, com texto alternativo, e links internos que existem. */
function checarFigurasELinks(md: string, onde: string) {
  for (const m of md.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    const [, alt, src] = m;
    if (!src.startsWith('/figuras/')) falha(onde, `figura fora de public/figuras (imagens de terceiros não): ${src}`);
    else if (!existsSync(join(RAIZ, 'public', src))) falha(onde, `figura não encontrada: public${src}`);
    if (alt.trim().length < 10) falha(onde, `figura sem texto alternativo descritivo: ${src}`);
  }
  // links internos: /assistir/<episodio>, /?t=<temporada> e /projetos/<projeto>
  for (const m of md.matchAll(/\]\((\/assistir\/([\w-]+)|\/\?t=([\w-]+)|\/projetos\/([\w-]+))\)/g)) {
    const [, link, epId, tId, pjId] = m;
    if (epId && !EPISODIOS_IDS.has(epId)) falha(onde, `link para episódio inexistente: ${link}`);
    if (tId && !getTemporada(tId)) falha(onde, `link para temporada inexistente: ${link}`);
    if (pjId && !getProjeto(pjId)) falha(onde, `link para projeto inexistente: ${link}`);
  }
}

function checarEpisodio(ep: EpisodioConteudo, onde: string, provas: Prova[]) {
  if (!(ep.minutos >= 3 && ep.minutos <= 40)) falha(onde, 'minutos deve ficar entre 3 e 40');
  if (!ep.aula || ep.aula.length < 3500) falha(onde, `aula curta demais (${ep.aula?.length ?? 0} caracteres, mín. 3500)`);
  const blocosVerificados = (ep.aula.match(/```java[^\n]*\b(executar|compila|nao-compila)\b/g) ?? []).length;
  if (provas.length > 0 && blocosVerificados < 3) falha(onde, `aula com ${blocosVerificados} blocos verificados (mín. 3: executar, compila ou nao-compila)`);
  if (ep.armadilhas.length < 3) falha(onde, 'liste ao menos 3 armadilhas de prova');
  if (ep.recursos.length < 5) falha(onde, `recomende ao menos 5 recursos externos (tem ${ep.recursos.length})`);
  if (!ep.recursos.some((r) => r.tipo === 'documentacao')) falha(onde, 'inclua ao menos uma fonte oficial (tipo documentacao)');
  if (!ep.recursos.some((r) => r.tipo === 'video')) falha(onde, 'inclua ao menos um vídeo (tipo video)');
  for (const r of ep.recursos) {
    if (!/^https:\/\//.test(r.url)) falha(onde, `recurso com URL inválida: ${r.url}`);
    if (r.idioma !== 'pt' && r.idioma !== 'en') falha(onde, `recurso sem idioma: ${r.titulo}`);
    if (r.tipo === 'livro' && !r.onde) falha(onde, `livro sem capítulo ou seção em "onde": ${r.titulo}`);
  }
  checarFigurasELinks(ep.aula, onde);
  if (!ep.aula.includes('[!MATEMATICA]')) semMatematica++;
  if (!/!\[[^\]]*\]\(\/figuras\//.test(ep.aula)) semFigura++;
  // recursos do Use a Cabeça! e quadros do Deitel (docs/GERAR_TEMPORADA.md)
  const recursosDoLivro = new Set([...ep.aula.matchAll(/\[!(PERGUNTAS|CONVERSA|LAPIS|COMPILADOR)\]|```(imas)/g)].map((m) => m[1] ?? m[2]));
  if (recursosDoLivro.size < 2) semLivros++;
  if (!/\[!(ERRO|PREVENCAO|DESEMPENHO|ENGENHARIA)\]/.test(ep.aula)) semDeitel++;
  for (const m of ep.aula.matchAll(/```imas[^\n]*\n([\s\S]*?)```/g)) {
    if (m[1].split('\n').filter((l) => l.trim()).length < 4) falha(onde, 'ímãs de código precisam de ao menos 4 linhas');
  }
  (ep.bugs ?? []).forEach((b, i) => checarBug(b, onde, `${ep.id}-b${String(i + 1).padStart(2, '0')}`));
  if (!ep.bugs?.length) semBugs++;
  if (ep.ia) {
    if (ep.ia.uso.length < 80) falha(onde, 'IA na prática: o uso precisa de ao menos 80 caracteres');
    if (ep.ia.pedido.length < 60) falha(onde, 'IA na prática: o pedido de exemplo precisa de ao menos 60 caracteres');
    if (ep.ia.erros.length < 2) falha(onde, 'IA na prática: liste ao menos 2 erros comuns da IA');
    if (ep.ia.conferir.length < 2) falha(onde, 'IA na prática: liste ao menos 2 formas de conferir');
  } else {
    semIa++;
  }
  if (ep.exercicios.length !== 15) falha(onde, `episódio precisa de 15 exercícios (tem ${ep.exercicios.length})`);
  const tipos = new Set(ep.exercicios.map((q) => q.tipo));
  if (tipos.size < 3) falha(onde, 'use ao menos 3 tipos diferentes de exercício');
  const verificaveis = ep.exercicios.filter(eVerificavel).length;
  if (provas.length > 0 && verificaveis < 6) falha(onde, `só ${verificaveis} exercícios verificados pelo JDK (mín. 6)`);
  ep.exercicios.forEach((q) => checarExercicio(q, onde, `${ep.id}-`, provas));
  semDica += ep.exercicios.filter((q) => !q.dica).length;
}

function checarCatalogoDeProjetos() {
  const vistos = new Set<string>();
  for (const pj of PROJETOS) {
    const onde = `catálogo de projetos › ${pj.id}`;
    if (vistos.has(pj.id)) falha(onde, 'id repetido');
    vistos.add(pj.id);
    if (!getCargo(pj.cargo)) falha(onde, `cargo inexistente: ${pj.cargo}`);
    if (pj.id !== `${pj.cargo}-p${pj.numero}`) falha(onde, `o id deveria ser ${pj.cargo}-p${pj.numero}`);
    const anteriores = PROJETOS.filter((x) => x.cargo === pj.cargo && x.numero < pj.numero).length;
    if (anteriores !== pj.numero - 1) falha(onde, 'os números dos projetos de um cargo seguem 1, 2, 3...');
    for (const t of pj.requisitos) if (!getTemporada(t)) falha(onde, `requisito não é uma temporada do catálogo: ${t}`);
    if (pj.requisitos.some((t) => getTemporada(t)?.cargo !== pj.cargo)) falha(onde, 'os requisitos são temporadas do próprio cargo');
    if (pj.resumo.length > 180) falha(onde, `resumo longo demais (${pj.resumo.length} caracteres, máx. 180)`);
    if (pj.pratica.length < 3 || pj.pratica.length > 6) falha(onde, 'liste de 3 a 6 itens em pratica');
    if (!pj.stack.length || !pj.horas) falha(onde, 'informe stack e horas');
    if ([pj.titulo, pj.resumo, ...pj.pratica].some((s) => s.includes('—'))) falha(onde, 'textos sem travessão (—)');
  }
}

function checarProjeto(pj: ProjetoConteudo, onde: string) {
  const textos = [pj.briefing, pj.portfolio, ...pj.etapas.flatMap((e) => [e.titulo, e.objetivo, e.instrucoes, e.dica, e.solucao, ...e.criterios])];
  if (textos.some((s) => s.includes('—'))) falha(onde, 'textos sem travessão (—)');
  if (pj.briefing.length < 400) falha(onde, `briefing curto demais (${pj.briefing.length} caracteres, mín. 400)`);
  if (pj.portfolio.length < 150) falha(onde, `portfolio curto demais (${pj.portfolio.length} caracteres, mín. 150)`);
  if (pj.etapas.length < 4 || pj.etapas.length > 7) falha(onde, `um projeto tem de 4 a 7 etapas (tem ${pj.etapas.length})`);
  checarFigurasELinks(pj.briefing, onde);
  checarFigurasELinks(pj.portfolio, onde);
  pj.etapas.forEach((e, i) => {
    const aqui = `${onde} › etapa ${i + 1}`;
    const esperado = `${pj.id}-s${String(i + 1).padStart(2, '0')}`;
    if (e.id !== esperado) falha(aqui, `id deveria ser ${esperado}, veio ${e.id}`);
    if (!e.titulo || e.titulo.length > 70) falha(aqui, 'título vazio ou com mais de 70 caracteres');
    if (e.objetivo.length < 30 || e.objetivo.length > 200) falha(aqui, 'objetivo deve ter de 30 a 200 caracteres');
    if (e.instrucoes.length < 400) falha(aqui, `instruções curtas demais (${e.instrucoes.length} caracteres, mín. 400)`);
    if (e.criterios.length < 3 || e.criterios.length > 6) falha(aqui, `de 3 a 6 critérios de aceite (tem ${e.criterios.length})`);
    if (e.criterios.some((c) => c.length < 15)) falha(aqui, 'critério de aceite curto demais (mín. 15 caracteres)');
    if (e.dica.length < 30) falha(aqui, 'dica curta demais (mín. 30 caracteres)');
    if (e.solucao.length < 200) falha(aqui, 'solução de referência curta demais (mín. 200 caracteres)');
    checarFigurasELinks(e.instrucoes, aqui);
    checarFigurasELinks(e.solucao, aqui);
  });
}

function agendarProjeto(pj: ProjetoConteudo, onde: string) {
  pj.etapas.forEach((e, i) => {
    agendarMarkdown(e.instrucoes, `${onde} › etapa ${i + 1}, instruções`, 25);
    agendarMarkdown(e.solucao, `${onde} › etapa ${i + 1}, solução`, 25);
  });
}

/* ------------------------------------------------------------------ */
/* Jobs de Java                                                        */
/* ------------------------------------------------------------------ */

interface Job {
  onde: string;
  codigo: string;
  release: number;
  executar: boolean;
  /** O que o programa lê do teclado (stdin). */
  entrada?: string;
  checar: (r: ResultadoJava) => string | null;
}

const jobs: Job[] = [];

function linhasDeErro(r: ResultadoJava) {
  return [...new Set(r.erros.map((e) => e.linha))];
}

function descreverErros(r: ResultadoJava) {
  return r.erros.map((e) => `linha ${e.linha}: ${e.mensagem}`).join(' | ');
}

function exigirCompilacao(r: ResultadoJava): string | null {
  if (!r.compilou) return `não compilou: ${descreverErros(r)}`;
  return null;
}

function exigirExecucaoLimpa(r: ResultadoJava): string | null {
  const e = exigirCompilacao(r);
  if (e) return e;
  if (r.estourouTempo) return 'estourou o tempo de execução';
  if (r.codigoSaida !== 0) return `terminou com erro (${r.excecao ?? 'código ' + r.codigoSaida}): ${r.stderr.split('\n')[0]}`;
  return null;
}

function agendarQuestao(q: Exercicio, onde: string, padrao: Prova[]) {
  const aqui = `${onde} › ${q.id}`;
  const releases = releasesDaQuestao(q, padrao);
  const menor = releases[0];
  const fonte = q.codigoVerificacao ?? q.codigo;

  const compilaEmTodas = (codigo: string, rotulo = '') => {
    for (const rel of releases.slice(1)) {
      jobs.push({ onde: `${aqui}${rotulo} [Java ${rel}]`, codigo, release: rel, executar: false, checar: exigirCompilacao });
    }
  };

  if (q.tipo === 'saida') {
    jobs.push({
      onde: `${aqui} [Java ${menor}]`,
      codigo: fonte!,
      release: menor,
      executar: true,
      checar: (r) => exigirExecucaoLimpa(r) ?? (r.saida === normalizarSaida(q.resposta) ? null : `saída real:\n${r.saida}\n--- gabarito:\n${q.resposta}`),
    });
    compilaEmTodas(fonte!);
    return;
  }

  if (q.tipo === 'lacuna') {
    q.respostas.forEach((resp, i) => {
      const codigo = (q.codigoVerificacao ?? q.codigo).replace('___', resp);
      jobs.push({
        onde: `${aqui} (resposta ${i + 1}: ${resp}) [Java ${menor}]`,
        codigo,
        release: menor,
        executar: true,
        checar: (r) => exigirExecucaoLimpa(r) ?? (r.saida === normalizarSaida(q.saida) ? null : `saída real:\n${r.saida}\n--- esperada:\n${q.saida}`),
      });
      compilaEmTodas(codigo, ` (resposta ${i + 1})`);
    });
    return;
  }

  if (q.tipo === 'linha') {
    for (const rel of releases) {
      jobs.push({
        onde: `${aqui} [Java ${rel}]`,
        codigo: fonte!,
        release: rel,
        executar: false,
        checar: (r) => {
          if (r.compilou) return 'o código compila, mas a questão diz que a linha ' + q.resposta + ' não compila';
          const ls = linhasDeErro(r);
          if (ls.length !== 1 || ls[0] !== q.resposta) return `erros em ${ls.join(', ')} (esperado só na linha ${q.resposta}): ${descreverErros(r)}`;
          return null;
        },
      });
    }
    return;
  }

  const v = q.verificar;
  if (!v) return;
  const corretas = q.tipo === 'escolha' ? [q.resposta] : q.respostas;

  switch (v.tipo) {
    case 'saida': {
      if (!fonte) return falha(aqui, 'verificar.saida sem código');
      jobs.push({
        onde: `${aqui} [Java ${menor}]`,
        codigo: fonte,
        release: menor,
        executar: true,
        checar: (r) => {
          const e = exigirExecucaoLimpa(r);
          if (e) return e;
          const certas = corretas.map((i) => normalizarSaida(semCrases(q.opcoes[i])));
          if (!certas.every((c) => c === r.saida)) return `saída real:\n${r.saida}\n--- opção marcada como certa:\n${certas.join('\n---\n')}`;
          const erradasIguais = q.opcoes.filter((o, i) => !corretas.includes(i) && normalizarSaida(semCrases(o)) === r.saida);
          if (erradasIguais.length) return `uma opção errada é igual à saída real: ${erradasIguais.join(' / ')}`;
          return null;
        },
      });
      compilaEmTodas(fonte);
      break;
    }
    case 'naoCompila': {
      if (!fonte) return falha(aqui, 'verificar.naoCompila sem código');
      for (const rel of releases) {
        jobs.push({
          onde: `${aqui} [Java ${rel}]`,
          codigo: fonte,
          release: rel,
          executar: false,
          checar: (r) => {
            if (r.compilou) return 'o gabarito diz que não compila, mas compilou';
            if (v.linha !== undefined) {
              const ls = linhasDeErro(r);
              if (!ls.includes(v.linha)) return `erro esperado na linha ${v.linha}, mas foi em ${ls.join(', ')}: ${descreverErros(r)}`;
            }
            return null;
          },
        });
      }
      break;
    }
    case 'excecao': {
      if (!fonte) return falha(aqui, 'verificar.excecao sem código');
      jobs.push({
        onde: `${aqui} [Java ${menor}]`,
        codigo: fonte,
        release: menor,
        executar: true,
        checar: (r) => {
          const e = exigirCompilacao(r);
          if (e) return e;
          if (r.excecao !== v.nome) return `esperava ${v.nome}, veio ${r.excecao ?? 'nenhuma exceção'} (saída: ${r.saida})`;
          if (v.saida !== undefined && r.saida !== normalizarSaida(v.saida)) return `saída antes da exceção:\n${r.saida}\n--- esperada:\n${v.saida}`;
          return null;
        },
      });
      compilaEmTodas(fonte);
      break;
    }
    case 'executa': {
      if (!fonte) return falha(aqui, 'verificar.executa sem código');
      jobs.push({
        onde: `${aqui} [Java ${menor}]`,
        codigo: fonte,
        release: menor,
        executar: true,
        checar: (r) => exigirExecucaoLimpa(r) ?? (r.saida === normalizarSaida(v.saida) ? null : `saída real:\n${r.saida}\n--- esperada:\n${v.saida}`),
      });
      compilaEmTodas(fonte);
      break;
    }
    case 'opcoesCompilam':
    case 'opcoesNaoCompilam': {
      const querCompila = v.tipo === 'opcoesCompilam';
      q.opcoes.forEach((op, i) => {
        const certa = corretas.includes(i);
        const deveCompilar = querCompila ? certa : !certa;
        for (const rel of releases) {
          jobs.push({
            onde: `${aqui} opção ${String.fromCharCode(65 + i)} [Java ${rel}]`,
            codigo: semCrases(op),
            release: rel,
            executar: false,
            checar: (r) => {
              if (r.compilou === deveCompilar) return null;
              return deveCompilar
                ? `a opção deveria compilar: ${descreverErros(r)}`
                : 'a opção deveria NÃO compilar, mas compilou';
            },
          });
        }
      });
      break;
    }
  }
}

/**
 * Agenda os blocos verificados de um Markdown: `java executar` (seguido de um
 * bloco `entrada` opcional, passado no stdin, e do bloco `saida`), `java compila`
 * e `java nao-compila`. `java25` no info fixa a versão.
 */
function agendarMarkdown(md: string, onde: string, releasePadrao: number) {
  // ```imas executar são ímãs de código: as linhas, na ordem certa, formam um programa
  const re = /```(?:java|imas)([^\n]*)\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(md))) {
    n++;
    const info = m[1];
    let codigo = m[2];
    let depois = md.slice(re.lastIndex);
    // código dentro de um destaque (> [!COMPILADOR], por exemplo): cada linha vem com "> " na frente
    const inicioDaLinha = md.lastIndexOf('\n', m.index) + 1;
    if (/^\s*>\s?$/.test(md.slice(inicioDaLinha, m.index))) {
      codigo = codigo.replace(/^>[ \t]?/gm, '');
      depois = depois.replace(/^>[ \t]?/gm, '');
    }
    const io = /^\s*(?:```entrada\n([\s\S]*?)```\s*)?```saida\n([\s\S]*?)```/.exec(depois);
    const entrada = io?.[1];
    const saida = io?.[2];
    const rel = Number(/java(\d\d)/.exec(info)?.[1] ?? releasePadrao);
    if (/\bexecutar\b/.test(info)) {
      jobs.push({
        onde: `${onde}, bloco ${n}`,
        codigo,
        release: rel,
        executar: true,
        entrada,
        checar: (r) =>
          exigirExecucaoLimpa(r) ??
          (saida === undefined || r.saida === normalizarSaida(saida) ? null : `saída real:\n${r.saida}\n--- bloco saida:\n${saida}`),
      });
    } else if (/\bnao-compila\b/.test(info)) {
      jobs.push({
        onde: `${onde}, bloco ${n}`,
        codigo,
        release: rel,
        executar: false,
        checar: (r) => (r.compilou ? 'bloco marcado nao-compila, mas compilou' : null),
      });
    } else if (/\bcompila\b/.test(info)) {
      jobs.push({ onde: `${onde}, bloco ${n}`, codigo, release: rel, executar: false, checar: exigirCompilacao });
    }
  }
}

function agendarAula(ep: EpisodioConteudo, onde: string, provas: Prova[]) {
  const releases = provas.length ? [...new Set(provas.map((p) => RELEASE[p]))].sort((a, b) => a - b) : [25];
  agendarMarkdown(ep.aula, `${onde} › aula`, releases[0]);
  if (ep.desafio) {
    const d = ep.desafio;
    jobs.push({
      onde: `${onde} › desafio`,
      codigo: d.solucao,
      release: releases[releases.length - 1],
      executar: true,
      checar: (r) =>
        exigirExecucaoLimpa(r) ?? (d.saida === undefined || r.saida === normalizarSaida(d.saida) ? null : `saída real:\n${r.saida}\n--- esperada:\n${d.saida}`),
    });
  }
}

/* ------------------------------------------------------------------ */
/* Execução com cache                                                  */
/* ------------------------------------------------------------------ */

type ResultadoCache = Omit<ResultadoJava, 'fonte'>;

async function lerCache(): Promise<Record<string, ResultadoCache>> {
  if (SEM_CACHE || !existsSync(ARQ_CACHE)) return {};
  try {
    return JSON.parse(await readFile(ARQ_CACHE, 'utf8'));
  } catch {
    return {};
  }
}

async function rodarJobs(): Promise<number> {
  const cache = await lerCache();
  const usados: Record<string, ResultadoCache> = {};
  // O código do executor entra na chave: mudar a forma de embrulhar ou rodar invalida o cache.
  const executor = createHash('sha1').update(await readFile(join(RAIZ, 'scripts', 'lib', 'java.ts'))).digest('hex');
  const chave = (j: Job) =>
    createHash('sha1')
      .update(`${executor}|${j.release}|${j.executar}|${j.codigo}` + (j.entrada === undefined ? '' : `|${j.entrada}`))
      .digest('hex');
  let feitos = 0;
  let doCache = 0;
  const total = jobs.length;
  const fila = [...jobs];
  const paralelo = Math.max(2, Math.min(12, availableParallelism()));

  const progresso = () => {
    if (process.stdout.isTTY) process.stdout.write(`\r  ${cor.cinza(`compilando ${feitos}/${total}`)}   `);
  };

  async function trabalhador() {
    while (fila.length) {
      const j = fila.shift()!;
      const k = chave(j);
      let r = cache[k] as ResultadoJava | undefined;
      if (r) doCache++;
      else {
        r = await compilarEExecutar(j.codigo, { release: j.release, executar: j.executar, entrada: j.entrada });
      }
      const { fonte: _f, ...semFonte } = r as ResultadoJava;
      usados[k] = semFonte;
      const erro = j.checar(r as ResultadoJava);
      if (erro) falha(j.onde, erro);
      feitos++;
      progresso();
    }
  }
  await Promise.all(Array.from({ length: paralelo }, trabalhador));
  if (process.stdout.isTTY) process.stdout.write('\r' + ' '.repeat(40) + '\r');
  await mkdir(dirname(ARQ_CACHE), { recursive: true });
  // uma rodada parcial mantém o resto do cache; só a rodada completa descarta o que não foi usado
  const parcial = SO_TEMPORADA || SO_PROJETO;
  await writeFile(ARQ_CACHE, JSON.stringify(parcial ? { ...cache, ...usados } : usados));
  return doCache;
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  const inicio = Date.now();
  console.log(cor.negrito('\nJavaflix · verify\n'));

  // catálogo
  const ids = new Set<string>();
  for (const c of CARGOS) for (const t of c.temporadas) for (const e of t.episodios) {
    if (ids.has(e.id)) falha('catálogo', `episódio repetido ${e.id}`);
    ids.add(e.id);
  }

  checarCatalogoDeProjetos();
  const { temporadas, projetos } = await carregarConteudo();
  let totalQuestoes = 0;
  let totalVerificaveis = 0;

  for (const t of temporadas) {
    const meta = getTemporada(t.id);
    if (!meta) {
      falha(t.id, 'temporada não existe no catálogo (src/content/catalogo.ts)');
      continue;
    }
    if (t.episodios.length !== meta.episodios.length) {
      falha(t.id, `catálogo tem ${meta.episodios.length} episódios, conteúdo tem ${t.episodios.length}`);
    }
    const provasTemporada = new Set<Prova>();
    t.episodios.forEach((ep, i) => {
      const em = meta.episodios[i];
      if (!em || em.id !== ep.id) {
        falha(t.id, `episódio ${i + 1} deveria ser ${em?.id}, veio ${ep.id}`);
        return;
      }
      em.provas.forEach((p) => provasTemporada.add(p));
      const onde = `${ep.id} (${em.titulo})`;
      checarEpisodio(ep, onde, em.provas);
      totalQuestoes += ep.exercicios.length;
      totalVerificaveis += ep.exercicios.filter(eVerificavel).length;
      if (!SEM_JAVA) {
        ep.exercicios.forEach((q) => agendarQuestao(q, onde, em.provas));
        (ep.bugs ?? []).forEach((b) => agendarBug(b, onde, em.provas));
        agendarAula(ep, onde, em.provas);
      }
    });
    const provasT = [...provasTemporada];
    const ondeProva = `${t.id} › prova`;
    if (t.prova.length < 18) falha(ondeProva, `prova da temporada precisa de ao menos 18 questões (tem ${t.prova.length})`);
    t.prova.forEach((q) => {
      checarExercicio(q, ondeProva, `${t.id}-prova-`, provasT);
      if (!SEM_JAVA) agendarQuestao(q, ondeProva, provasT);
    });
    totalQuestoes += t.prova.length;
    totalVerificaveis += t.prova.filter(eVerificavel).length;
    console.log(`  ${cor.verde('•')} ${meta.id.padEnd(20)} ${meta.titulo.padEnd(28)} ${t.episodios.length} episódios, ${t.prova.length} questões de prova`);
  }

  for (const pj of projetos) {
    const meta = getProjeto(pj.id);
    if (!meta) {
      falha(`projeto ${pj.id}`, 'projeto não existe no catálogo (src/content/projetos.ts)');
      continue;
    }
    const onde = `${pj.id} (${meta.titulo})`;
    checarProjeto(pj, onde);
    if (!SEM_JAVA) agendarProjeto(pj, onde);
    console.log(`  ${cor.verde('•')} ${pj.id.padEnd(20)} ${meta.titulo.slice(0, 28).padEnd(28)} ${pj.etapas.length} etapas`);
  }

  if (temporadas.length === 0 && projetos.length === 0) console.log(cor.amarelo('  nenhuma temporada gerada ainda'));
  if (semIa > 0) console.log(cor.cinza(`\n  ${semIa} episódio(s) ainda sem a seção IA na prática`));
  if (semBugs > 0) console.log(cor.cinza(`  ${semBugs} episódio(s) ainda sem bugs na aba Depuração`));
  if (semMatematica > 0) console.log(cor.cinza(`  ${semMatematica} episódio(s) ainda sem o destaque A matemática aqui`));
  if (semFigura > 0) console.log(cor.cinza(`  ${semFigura} episódio(s) ainda sem figura`));
  if (semLivros > 0) console.log(cor.cinza(`  ${semLivros} episódio(s) com menos de dois recursos do Use a Cabeça! (perguntas, conversa, lápis, compilador, ímãs)`));
  if (semDeitel > 0) console.log(cor.cinza(`  ${semDeitel} episódio(s) ainda sem quadro do Deitel (erro comum, prevenção, desempenho ou engenharia)`));
  if (semDica > 0) console.log(cor.cinza(`  ${semDica} exercício(s) ainda sem dica`));

  let doCache = 0;
  if (!SEM_JAVA && jobs.length) {
    const jdk = await versaoDoJdk();
    if (!jdk) {
      console.log(cor.verm('\n  javac não encontrado no PATH. Instale o JDK 25 (compila para 17, 21 e 25).'));
      process.exit(1);
    }
    console.log(cor.cinza(`\n  ${jdk}; ${jobs.length} compilações`));
    doCache = await rodarJobs();
  }

  const seg = ((Date.now() - inicio) / 1000).toFixed(1);
  console.log(
    `\n  ${temporadas.length} temporada(s), ${projetos.length} projeto(s), ${totalQuestoes} questões, ${totalVerificaveis} conferidas no JDK` +
      (SEM_JAVA ? cor.amarelo(' (Java pulado)') : cor.cinza(` (${jobs.length} execuções, ${doCache} do cache)`)) +
      cor.cinza(` em ${seg}s`),
  );

  if (problemas.length) {
    console.log(cor.verm(cor.negrito(`\n  ✗ ${problemas.length} problema(s):\n`)));
    for (const p of problemas) {
      console.log(`  ${cor.verm('✗')} ${cor.negrito(p.onde)}`);
      console.log('    ' + p.msg.split('\n').join('\n    '));
    }
    console.log('');
    process.exit(1);
  }
  console.log(cor.verde(cor.negrito('\n  ✓ tudo certo\n')));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
