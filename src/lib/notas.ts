import { getTemporada } from '../content/catalogo';
import type { CargoMeta, EpisodioMeta, Exercicio, TemporadaMeta } from '../content/types';
import { temporadaDisponivel } from './conteudo';
import { quantasCorretas, estaCerta, type Resposta } from './respostas';
import type { Progresso } from './store';

/*
 * Sistema de notas (docs/NOTAS.md): cada questão vale de 0 a 1, cada episódio tem
 * média de 0 a 10 e a temporada é aprovada com média 7. Por enquanto vale só no
 * cargo Estagiário; os outros cargos seguem as regras antigas.
 */

export const MEDIA_APROVACAO = 7;
export const CARGOS_COM_NOTA = new Set(['estagiario']);

/** Peso de cada bug da aba Depuração na média do episódio, contra 1 de uma questão comum. */
export const PESO_BUG = 0.5;

const PESOS = { exercicios: 0.3, desafio: 0.2, prova: 0.5 };

export const usaNotas = (temporadaId: string) => CARGOS_COM_NOTA.has(getTemporada(temporadaId)?.cargo ?? '');
export const cargoUsaNotas = (c: CargoMeta) => CARGOS_COM_NOTA.has(c.id);

/* ------------------------------------------------------------------ */
/* Questão                                                             */
/* ------------------------------------------------------------------ */

/**
 * Pontuação de 0 a 1 antes do teto. Tudo ou nada, menos a múltipla escolha:
 * cada certa marcada vale 1/N e cada errada marcada desconta 1/N.
 */
export function pontuar(q: Exercicio, r: Resposta | null): number {
  if (!r) return 0;
  if (q.tipo === 'multipla' && r.tipo === 'multipla') {
    const n = quantasCorretas(q);
    const certas = r.valor.filter((v) => q.respostas.includes(v)).length;
    const erradas = r.valor.length - certas;
    return Math.max(0, (certas - erradas) / n);
  }
  return estaCerta(q, r) ? 1 : 0;
}

/** Teto da questão: dica aberta 0,7; segunda tentativa 0,7; terceira em diante 0,5; viu a solução 0. */
export function teto({ dica = false, tentativa = 1, solucao = false }: { dica?: boolean; tentativa?: number; solucao?: boolean }): number {
  if (solucao) return 0;
  let t = 1;
  if (dica) t = Math.min(t, 0.7);
  if (tentativa === 2) t = Math.min(t, 0.7);
  if (tentativa >= 3) t = Math.min(t, 0.5);
  return t;
}

export const pesoDe = (q: Exercicio) => q.peso ?? 1;

/* ------------------------------------------------------------------ */
/* Episódio                                                            */
/* ------------------------------------------------------------------ */

/** Nota parcial da sessão em andamento, de 0 a 10, e quantas questões já contam. Null sem nada respondido. */
export function notaParcialDaSessao(p: Progresso, episodioId: string): { nota: number; respondidas: number; total: number } | null {
  const s = p.sessoes[episodioId];
  if (!s?.pontos || !s.pesos) return null;
  let pts = 0;
  let pesos = 0;
  let respondidas = 0;
  s.pontos.forEach((x, i) => {
    if (x === null) return;
    pts += x;
    pesos += s.pesos![i];
    respondidas++;
  });
  if (!respondidas) return null;
  return { nota: pesos ? (pts / pesos) * 10 : 0, respondidas, total: s.pontos.length };
}

/** Nota do episódio de 0 a 10: a melhor rodada de exercícios mais os bugs da Depuração. Null se nunca foi concluído. */
export function notaEpisodio(p: Progresso, episodioId: string): number | null {
  const reg = p.episodios[episodioId];
  if (!reg?.concluidoEm) return null;
  // progresso de antes das notas: usa os acertos (tudo ou nada, sem teto)
  const pontos = reg.pontos ?? reg.melhor;
  const pesos = reg.pesos ?? reg.total;
  const bugs = reg.bugs ?? [];
  const ptsBugs = bugs.reduce((acc, id) => acc + (p.bugs?.[id] ? notaBug(p.bugs[id].dePrimeira) : 0), 0) * PESO_BUG;
  const total = pesos + bugs.length * PESO_BUG;
  return total ? ((pontos + ptsBugs) / total) * 10 : 0;
}

/** Bug achado de primeira vale 1; depois de errar a linha, 0,7. */
export const notaBug = (dePrimeira: boolean) => (dePrimeira ? 1 : 0.7);

/** Nota do desafio de 0 a 10, ou null se ainda não foi entregue. Progresso antigo sem registro de ajuda vale 10. */
export function notaDesafio(p: Progresso, episodioId: string): number | null {
  if (!p.desafios[episodioId]) return null;
  const a = p.ajudaDesafio?.[episodioId];
  return teto({ dica: a?.dica, solucao: a?.solucao }) * 10;
}

/* ------------------------------------------------------------------ */
/* Temporada                                                           */
/* ------------------------------------------------------------------ */

export type Situacao = 'cursando' | 'aprovado' | 'recuperacao';

export interface NotaTemporada {
  /** Médias de cada parte (0 a 10); null quando ainda não há nada naquela parte. */
  exercicios: number | null;
  desafio: number | null;
  prova: number | null;
  /** Média da temporada com o que falta contando zero. */
  media: number;
  situacao: Situacao;
  /** Nota que falta tirar na prova para fechar com 7, se a prova ainda não foi feita. */
  precisaNaProva: number | null;
  episodios: { meta: EpisodioMeta; nota: number | null; desafio: number | null }[];
}

const mediaDe = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

/**
 * Exercícios 30%, desafio 20% e prova 50%. Todo episódio do Estagiário tem desafio,
 * então o desafio de um episódio não entregue conta zero.
 */
export function notaTemporada(t: TemporadaMeta, p: Progresso, relevantes: EpisodioMeta[]): NotaTemporada {
  const episodios = relevantes.map((meta) => ({ meta, nota: notaEpisodio(p, meta.id), desafio: notaDesafio(p, meta.id) }));
  const concluidos = episodios.filter((e) => e.nota !== null);
  const exercicios = concluidos.length ? mediaDe(concluidos.map((e) => e.nota!)) : null;
  const entregues = episodios.filter((e) => e.desafio !== null);
  const desafio = entregues.length ? mediaDe(episodios.map((e) => e.desafio ?? 0)) : null;
  const reg = p.provas[t.id];
  const prova = reg ? reg.melhorPct / 10 : null;

  const exTotal = mediaDe(episodios.map((e) => e.nota ?? 0));
  const deTotal = mediaDe(episodios.map((e) => e.desafio ?? 0));
  const semProva = PESOS.exercicios * exTotal + PESOS.desafio * deTotal;
  const media = semProva + PESOS.prova * (prova ?? 0);

  const tudoFeito = concluidos.length === episodios.length && prova !== null;
  const situacao: Situacao = !tudoFeito ? 'cursando' : media >= MEDIA_APROVACAO - 1e-9 ? 'aprovado' : 'recuperacao';
  const precisa = (MEDIA_APROVACAO - semProva) / PESOS.prova;
  return {
    exercicios,
    desafio,
    prova,
    media,
    situacao,
    precisaNaProva: prova === null ? Math.max(0, precisa) : null,
    episodios,
  };
}

/* ------------------------------------------------------------------ */
/* Cargo                                                               */
/* ------------------------------------------------------------------ */

/** CR do cargo: a média das temporadas publicadas, ou null se nenhuma foi começada. */
export function crDoCargo(c: CargoMeta, p: Progresso, relevantesDe: (t: TemporadaMeta) => EpisodioMeta[]): number | null {
  const medias = c.temporadas
    .filter((t) => temporadaDisponivel(t.id))
    .map((t) => notaTemporada(t, p, relevantesDe(t)))
    .filter((n) => n.exercicios !== null || n.prova !== null)
    .map((n) => n.media);
  return medias.length ? mediaDe(medias) : null;
}

/* ------------------------------------------------------------------ */
/* Formatação                                                          */
/* ------------------------------------------------------------------ */

/** 8.333 → "8,3". Trunca, para um 6,96 não aparecer como 7,0 em recuperação. */
export const fmtNota = (n: number) => (Math.floor(n * 10 + 1e-6) / 10).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const ROTULO_SITUACAO: Record<Situacao, string> = {
  cursando: 'Cursando',
  aprovado: 'Aprovado',
  recuperacao: 'Recuperação',
};

/** O que falta na prova para fechar a temporada com 7, em uma frase. */
export function textoDaProva(n: NotaTemporada): string {
  if (n.situacao === 'recuperacao')
    return `Média ${fmtNota(n.media)}: recuperação. Refaça a prova; a nota só é trocada se a nova for maior.`;
  if (n.precisaNaProva === null) return `Média ${fmtNota(n.media)}.`;
  if (n.precisaNaProva > 10)
    return `Nem um 10 na prova fecha a temporada com 7 agora. Refaça os episódios e desafios mais fracos para subir a média.`;
  return `Vale 50% da média. Você precisa de ${fmtNota(Math.ceil(n.precisaNaProva * 10) / 10)} na prova para fechar a temporada com 7.`;
}
