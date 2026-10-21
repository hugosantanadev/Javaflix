import { Marked } from 'marked';
import { destacar, destacarLinhas } from './destaque';

const ROTULO_LINGUA: Record<string, string> = {
  java: 'Java',
  bash: 'Terminal',
  sh: 'Terminal',
  text: 'Texto',
  json: 'JSON',
  sql: 'SQL',
  yaml: 'YAML',
  xml: 'XML',
  properties: 'Properties',
  c: 'C',
  asm: 'Assembly',
};

const CALLOUTS: Record<string, { titulo: string; classe: string }> = {
  PROVA: { titulo: 'Na prova', classe: 'c-prova' },
  DICA: { titulo: 'Dica', classe: 'c-dica' },
  ATENCAO: { titulo: 'Atenção', classe: 'c-atencao' },
  VERSAO: { titulo: 'Versões do Java', classe: 'c-versao' },
  MATEMATICA: { titulo: 'A matemática aqui', classe: 'c-mat' },
  IA: { titulo: 'A IA costuma errar aqui', classe: 'c-ia' },
  ANTES: { titulo: 'Como era antes', classe: 'c-antes' },
  PENSE: { titulo: 'Pare e pense', classe: 'c-pense' },
  BOAPRATICA: { titulo: 'Boa prática', classe: 'c-boa' },
  // os quadros do Deitel
  ERRO: { titulo: 'Erro comum de programação', classe: 'c-erro' },
  PREVENCAO: { titulo: 'Dica de prevenção de erro', classe: 'c-prevencao' },
  DESEMPENHO: { titulo: 'Dica de desempenho', classe: 'c-desempenho' },
  ENGENHARIA: { titulo: 'Observação de engenharia de software', classe: 'c-engenharia' },
  // os recursos do Use a Cabeça!
  PERGUNTAS: { titulo: 'Não existem perguntas idiotas', classe: 'c-perguntas' },
  CONVERSA: { titulo: 'Papo de bastidor', classe: 'c-conversa' },
  LAPIS: { titulo: 'Aponte seu lápis', classe: 'c-lapis' },
  COMPILADOR: { titulo: 'Seja o compilador', classe: 'c-compilador' },
};

/** Num `> [!CONVERSA]`, cada parágrafo `**Fulano:** fala` vira um balão; o primeiro a falar fica à esquerda. */
function baloes(corpo: string) {
  const lados = new Map<string, string>();
  return corpo.replace(/<p><strong>([^<]{1,40}?):<\/strong>\s*([\s\S]*?)<\/p>/g, (_, quem: string, fala: string) => {
    if (!lados.has(quem)) lados.set(quem, lados.size % 2 === 0 ? 'esq' : 'dir');
    return `<div class="fala fala-${lados.get(quem)}"><span class="fala-quem">${quem}</span><div class="fala-balao">${fala}</div></div>`;
  });
}

/** Em `[!LAPIS]` e `[!COMPILADOR]`, o que vem a partir de `**Resposta:**` fica escondido até a pessoa pedir. */
function esconderResposta(corpo: string) {
  const marca = '<p><strong>Resposta:</strong>';
  const i = corpo.indexOf(marca);
  if (i < 0) return corpo;
  return `${corpo.slice(0, i)}<details class="md-resposta"><summary>Ver a resposta</summary><p>${corpo.slice(i + marca.length)}</details>`;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Ímãs de código: as linhas certas, embaralhadas sempre do mesmo jeito, para montar clicando. */
function imas(texto: string) {
  const linhas = texto.split('\n').filter((l) => l.trim() !== '');
  let semente = hash(texto);
  const ordem = linhas.map((_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    semente = Math.imul(semente ^ (semente >>> 15), 2246822507) >>> 0;
    const j = semente % (i + 1);
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  if (ordem.every((v, i) => v === i) && ordem.length > 1) ordem.reverse();
  const botoes = ordem
    .map((i, pos) => {
      const l = linhas[i];
      return `<button type="button" class="ima" data-ima="${escapar(l)}" data-pos="${pos}"><code>${destacar(l.trim(), 'java')}</code></button>`;
    })
    .join('');
  return `<div class="md-imas" data-imas data-certo="${escapar(JSON.stringify(linhas))}">
<div class="imas-cabeca"><span class="imas-titulo">Ímãs de código</span><span class="imas-instrucao">As linhas caíram da geladeira. Clique nelas na ordem certa para montar o programa; clique de novo para devolver.</span></div>
<div class="imas-geladeira" aria-label="Linhas soltas">${botoes}</div>
<div class="imas-montagem" aria-label="Seu programa" data-vazio="Seu programa aparece aqui"></div>
<div class="imas-acoes"><button type="button" class="btn btn-sm btn-accent" data-imas-conferir>Conferir</button><button type="button" class="btn btn-sm btn-ghost" data-imas-recomecar>Recomeçar</button><span class="imas-resultado" aria-live="polite"></span></div>
</div>`;
}

export function slug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapar(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const md = new Marked({ gfm: true });

/** `//> texto` no fim de uma linha de código vira uma anotação na margem (é um comentário Java: o verify compila igual). */
const ANOTACAO = /\s*\/\/>\s?(.*)$/;

function separarAnotacoes(texto: string) {
  const notas: { linha: number; texto: string }[] = [];
  const limpo = texto
    .split('\n')
    .map((l, i) => {
      const m = ANOTACAO.exec(l);
      if (!m) return l;
      notas.push({ linha: i + 1, texto: m[1].trim() });
      return l.slice(0, m.index).replace(/\s+$/, '');
    })
    .join('\n');
  return { limpo, notas };
}

md.use({
  renderer: {
    code({ text, lang }) {
      const info = (lang ?? '').trim();
      const lingua = info.split(/\s+/)[0] || 'text';
      if (lingua === 'saida') {
        return `<figure class="md-saida"><figcaption>Saída</figcaption><pre>${escapar(text)}</pre></figure>`;
      }
      if (lingua === 'entrada') {
        return `<figure class="md-saida md-entrada"><figcaption>Você digita</figcaption><pre>${escapar(text)}</pre></figure>`;
      }
      if (lingua === 'imas') return imas(text);
      const executavel = /\bexecutar\b/.test(info);
      const naoCompila = /\bnao-compila\b/.test(info);
      const versao = /java(\d\d)/.exec(info.replace(/^java\b/, ''))?.[1];
      const selos = [
        executavel ? '<span class="md-selo ok">Compilado e executado no verify</span>' : '',
        naoCompila ? '<span class="md-selo erro">Não compila</span>' : '',
        versao ? `<span class="md-selo">Java ${versao}</span>` : '',
      ].join('');
      const cabeca = `<figcaption><span class="md-lingua">${
        ROTULO_LINGUA[lingua] ?? lingua
      }</span>${selos}<button type="button" class="md-copiar" data-copiar>Copiar</button></figcaption>`;
      const { limpo, notas } = separarAnotacoes(text);
      if (!notas.length) {
        return `<figure class="md-codigo${naoCompila ? ' nao-compila' : ''}">${cabeca}<pre><code>${destacar(text, lingua)}</code></pre></figure>`;
      }
      const linhas = destacarLinhas(limpo, lingua);
      notas.forEach((n, k) => {
        linhas[n.linha - 1] += `<span class="md-marca" data-n="${k + 1}" aria-hidden="true"></span>`;
      });
      const lista = notas
        .map((n, k) => `<li data-n="${k + 1}" data-linha="${n.linha}"><span><span class="sr-only">Linha ${n.linha}: </span>${md.parseInline(n.texto, { async: false })}</span></li>`)
        .join('');
      return `<div class="md-anotado"><figure class="md-codigo${naoCompila ? ' nao-compila' : ''}">${cabeca}<pre><code>${linhas.join(
        '\n',
      )}</code></pre></figure><ol class="md-notas" aria-label="Anotações do código">${lista}</ol></div>`;
    },
    blockquote({ tokens }) {
      const inner = this.parser.parse(tokens);
      const m = /^<p>\[!(\w+)\]\s*/.exec(inner);
      if (m && CALLOUTS[m[1]]) {
        const c = CALLOUTS[m[1]];
        let corpo = inner.replace(m[0], '<p>').replace(/^<p>\s*<\/p>/, '');
        if (m[1] === 'CONVERSA') corpo = baloes(corpo);
        if (m[1] === 'LAPIS' || m[1] === 'COMPILADOR') corpo = esconderResposta(corpo);
        return `<aside class="md-callout ${c.classe}"><div class="md-callout-titulo">${c.titulo}</div>${corpo}</aside>`;
      }
      return `<blockquote>${inner}</blockquote>`;
    },
    heading({ tokens, depth }) {
      const texto = this.parser.parseInline(tokens);
      return `<h${depth} id="${slug(texto)}">${texto}</h${depth}>`;
    },
    image({ href, title, text }) {
      const legenda = title ?? text;
      return `<figure class="md-figura"><img src="${escapar(href)}" alt="${escapar(text)}" loading="lazy" decoding="async"><figcaption>${escapar(
        legenda,
      )}</figcaption></figure>`;
    },
    link({ href, tokens }) {
      const texto = this.parser.parseInline(tokens);
      const externo = /^https?:/.test(href);
      return `<a href="${escapar(href)}"${externo ? ' target="_blank" rel="noopener noreferrer"' : ''}>${texto}</a>`;
    },
  },
  hooks: {
    postprocess(html) {
      return html.replace(/<table>/g, '<div class="md-tabela"><table>').replace(/<\/table>/g, '</table></div>');
    },
  },
});

const cacheBloco = new Map<string, string>();

export function renderMarkdown(texto: string): string {
  let html = cacheBloco.get(texto);
  if (html === undefined) {
    html = md.parse(texto, { async: false }) as string;
    if (cacheBloco.size > 400) cacheBloco.clear();
    cacheBloco.set(texto, html);
  }
  return html;
}

export function renderInline(texto: string): string {
  return md.parseInline(texto, { async: false }) as string;
}

export function indiceDoMarkdown(texto: string): { id: string; titulo: string }[] {
  return md
    .lexer(texto)
    .filter((t) => t.type === 'heading' && t.depth === 2)
    .map((t) => {
      const titulo = (t as { text: string }).text;
      return { id: slug(renderInline(titulo)), titulo: titulo.replace(/`/g, '') };
    });
}

/** Primeiro parágrafo de texto do Markdown, para sinopses. */
export function primeiroParagrafo(texto: string, max = 220): string {
  const p = md.lexer(texto).find((t) => t.type === 'paragraph') as { text: string } | undefined;
  if (!p) return '';
  const limpo = p.text.replace(/`/g, '').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return limpo.length > max ? limpo.slice(0, max).replace(/\s+\S*$/, '') + '…' : limpo;
}
