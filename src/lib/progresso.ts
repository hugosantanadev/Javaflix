import { CARGOS, EPISODIOS, getCargo, getTemporada, getTemporadaDoEpisodio } from '../content/catalogo';
import { PROJETOS } from '../content/projetos';
import type { CargoMeta, EpisodioMeta, ProjetoMeta, Prova, TemporadaMeta } from '../content/types';
import { episodioDisponivel, projetoDisponivel, temporadaDisponivel } from './conteudo';
import type { Perfil, Progresso } from './store';

export const episodioRelevante = (e: EpisodioMeta, prova: Prova) => e.provas.length === 0 || e.provas.includes(prova);

export interface EstadoEpisodio {
  disponivel: boolean;
  relevante: boolean;
  aulaVista: boolean;
  respondidas: number;
  total: number;
  acertos: number;
  concluido: boolean;
  /** 0 a 1, para a barrinha do card. */
  pct: number;
}

export function estadoEpisodio(e: EpisodioMeta, p: Progresso, prova: Prova): EstadoEpisodio {
  const s = p.sessoes[e.id];
  const reg = p.episodios[e.id];
  const total = s?.resultados.length ?? reg?.total ?? 15;
  const respondidas = s ? s.resultados.filter((r) => r !== null).length : 0;
  const acertos = s ? s.resultados.filter((r) => r === true).length : 0;
  const aulaVista = !!p.aulas[e.id];
  const concluido = !!reg?.concluidoEm;
  const pct = concluido ? 1 : (aulaVista ? 0.2 : 0) + (total ? (respondidas / total) * 0.8 : 0);
  return {
    disponivel: episodioDisponivel(e.id),
    relevante: episodioRelevante(e, prova),
    aulaVista,
    respondidas,
    total,
    acertos,
    concluido,
    pct,
  };
}

export interface EstadoTemporada {
  disponivel: boolean;
  relevantes: EpisodioMeta[];
  concluidos: number;
  provaAprovada: boolean;
  provaLiberada: boolean;
  completa: boolean;
  pct: number;
  iniciada: boolean;
}

export function estadoTemporada(t: TemporadaMeta, p: Progresso, prova: Prova): EstadoTemporada {
  const relevantes = t.episodios.filter((e) => episodioRelevante(e, prova));
  const estados = relevantes.map((e) => estadoEpisodio(e, p, prova));
  const concluidos = estados.filter((s) => s.concluido).length;
  const provaAprovada = !!p.provas[t.id]?.aprovadoEm;
  const provaLiberada = concluidos === relevantes.length;
  const soma = estados.reduce((acc, s) => acc + s.pct, 0) + (provaAprovada ? 1 : 0);
  return {
    disponivel: temporadaDisponivel(t.id),
    relevantes,
    concluidos,
    provaAprovada,
    provaLiberada,
    completa: provaLiberada && provaAprovada,
    pct: relevantes.length ? soma / (relevantes.length + 1) : 0,
    iniciada: estados.some((s) => s.pct > 0),
  };
}

export const promovido = (c: CargoMeta, p: Progresso) => !!p.promocoes[c.id];

/** O cargo do aluno: o primeiro da carreira em que ainda não foi promovido. A trilha base não conta. */
export function cargoAtual(p: Progresso): CargoMeta {
  return CARGOS.find((c) => c.trilha !== 'base' && !promovido(c, p)) ?? CARGOS[CARGOS.length - 1];
}

export function cargoDesbloqueado(c: CargoMeta, p: Progresso, perfil: Perfil): boolean {
  if (perfil.config.modoLivre || c.trilha === 'base') return true;
  return c.ordem <= cargoAtual(p).ordem;
}

export const ehBase = (episodioId: string) => getCargo(getTemporadaDoEpisodio(episodioId)?.cargo ?? '')?.trilha === 'base';

/**
 * Temporadas abrem em sequência dentro do cargo: a próxima abre quando todos os
 * episódios da anterior forem concluídos. Uma temporada ainda não gerada não trava
 * as seguintes. A prova da temporada é exigida na promoção do cargo.
 */
export function temporadaDesbloqueada(t: TemporadaMeta, p: Progresso, perfil: Perfil): boolean {
  if (perfil.config.modoLivre) return true;
  const c = getCargo(t.cargo);
  if (!c || !cargoDesbloqueado(c, p, perfil)) return false;
  const i = c.temporadas.findIndex((x) => x.id === t.id);
  if (i <= 0) return true;
  const anterior = c.temporadas[i - 1];
  if (!temporadaDisponivel(anterior.id)) return true;
  return estadoTemporada(anterior, p, perfil.prova).provaLiberada;
}

/** Episódios abrem em sequência dentro da temporada: cada um destrava o seguinte ao ser concluído. */
export function episodioDesbloqueado(e: EpisodioMeta, p: Progresso, perfil: Perfil): boolean {
  if (perfil.config.modoLivre) return true;
  const t = getTemporadaDoEpisodio(e.id);
  if (!t || !temporadaDesbloqueada(t, p, perfil)) return false;
  const relevantes = t.episodios.filter((x) => episodioRelevante(x, perfil.prova));
  const i = relevantes.findIndex((x) => x.id === e.id);
  if (i <= 0) return true;
  const anterior = relevantes[i - 1];
  return !!p.episodios[anterior.id]?.concluidoEm || !episodioDisponivel(anterior.id);
}

/** Por que um episódio está bloqueado, em uma frase, ou null se está liberado. */
export function motivoDoBloqueio(e: EpisodioMeta, p: Progresso, perfil: Perfil): { titulo: string; texto: string } | null {
  if (episodioDesbloqueado(e, p, perfil)) return null;
  const t = getTemporadaDoEpisodio(e.id)!;
  const c = getCargo(t.cargo)!;
  if (!cargoDesbloqueado(c, p, perfil))
    return {
      titulo: 'Esse episódio exige promoção',
      texto: `Ele faz parte do cargo ${c.titulo}. Conclua o seu cargo atual, chegue ao nível exigido e passe na avaliação de desempenho.`,
    };
  if (!temporadaDesbloqueada(t, p, perfil)) {
    const anterior = c.temporadas[c.temporadas.findIndex((x) => x.id === t.id) - 1];
    return {
      titulo: 'Temporada bloqueada',
      texto: `Ela abre quando você concluir todos os episódios da temporada anterior, "${anterior.titulo}".`,
    };
  }
  const relevantes = t.episodios.filter((x) => episodioRelevante(x, perfil.prova));
  const anterior = relevantes[relevantes.findIndex((x) => x.id === e.id) - 1];
  return { titulo: 'Episódio bloqueado', texto: `Ele abre quando você concluir o episódio anterior, "${anterior.titulo}": a aula e os exercícios.` };
}

/* ------------------------------------------------------------------ */
/* Níveis                                                              */
/* ------------------------------------------------------------------ */

/** XP total para chegar ao nível n: 0, 100, 300, 600, 1.000, ... (50 × n × (n - 1)). */
export const xpDoNivel = (n: number) => 50 * n * (n - 1);

export function nivelDoXp(xp: number): number {
  return Math.max(1, Math.floor((1 + Math.sqrt(1 + 0.08 * Math.max(0, xp))) / 2));
}

/** Nível atual, XP dentro do nível e quanto falta para o próximo. */
export function infoNivel(xp: number) {
  const nivel = nivelDoXp(xp);
  const base = xpDoNivel(nivel);
  const proximo = xpDoNivel(nivel + 1);
  return { nivel, noNivel: xp - base, doNivel: proximo - base, falta: proximo - xp };
}

/** XP que cada episódio relevante garante para o nível exigido: a aula, a conclusão e uns 6 acertos. */
const XP_POR_EPISODIO_EXIGIDO = 100;

/**
 * Nível exigido para a promoção de um cargo: 100 XP por episódio relevante já
 * publicado na carreira até ele (sem a trilha base). Quem faz o conteúdo chega lá;
 * quem pula tudo com dicas, não.
 */
export function nivelExigido(c: CargoMeta, prova: Prova): number {
  let episodios = 0;
  for (const outro of CARGOS) {
    if (outro.trilha === 'base' || outro.ordem > c.ordem) continue;
    for (const t of outro.temporadas) {
      episodios += t.episodios.filter((e) => episodioRelevante(e, prova) && episodioDisponivel(e.id)).length;
    }
  }
  return nivelDoXp(episodios * XP_POR_EPISODIO_EXIGIDO);
}

/** O que falta para a avaliação de promoção abrir. Vazio quando já pode fazer. */
export function pendenciasDaPromocao(c: CargoMeta, p: Progresso, perfil: Perfil): string[] {
  if (perfil.config.modoLivre) return [];
  const faltam: string[] = [];
  const disponiveis = c.temporadas.filter((t) => temporadaDisponivel(t.id));
  const completas = disponiveis.filter((t) => estadoTemporada(t, p, perfil.prova).completa).length;
  if (completas < disponiveis.length) faltam.push(`concluir as ${disponiveis.length} temporadas, com as provas (${completas} feitas)`);
  const exigido = nivelExigido(c, perfil.prova);
  const atual = nivelDoXp(p.xp);
  if (atual < exigido) faltam.push(`chegar ao nível ${exigido} (você está no ${atual})`);
  return faltam;
}

/** Próximo episódio a assistir: o último em andamento, ou o primeiro não concluído liberado. */
export function proximoEpisodio(p: Progresso, perfil: Perfil): EpisodioMeta | null {
  if (p.ultimoEpisodio) {
    const e = EPISODIOS.find((x) => x.id === p.ultimoEpisodio);
    if (e && !p.episodios[e.id]?.concluidoEm && episodioDisponivel(e.id)) return e;
  }
  for (const e of EPISODIOS) {
    // a trilha base é opcional: só vira "próximo" se você já estiver nela
    if (ehBase(e.id) || !episodioDisponivel(e.id) || !episodioRelevante(e, perfil.prova)) continue;
    if (!episodioDesbloqueado(e, p, perfil)) continue;
    if (!p.episodios[e.id]?.concluidoEm) return e;
  }
  return null;
}

/** Episódio seguinte na mesma temporada (ou na próxima), para o "próximo episódio". */
export function episodioSeguinte(id: string, prova: Prova): EpisodioMeta | null {
  const i = EPISODIOS.findIndex((e) => e.id === id);
  for (let k = i + 1; k < EPISODIOS.length; k++) {
    const e = EPISODIOS[k];
    if (episodioRelevante(e, prova)) return e;
  }
  return null;
}

export function emAndamento(p: Progresso, prova: Prova): EpisodioMeta[] {
  return EPISODIOS.filter((e) => {
    if (!episodioDisponivel(e.id)) return false;
    const s = estadoEpisodio(e, p, prova);
    return !s.concluido && s.pct > 0;
  });
}

export function rotuloEpisodio(e: EpisodioMeta): string {
  const t = getTemporadaDoEpisodio(e.id)!;
  return `T${t.numero}:E${e.numero}`;
}

export { provasDe } from './conteudo';

/* ------------------------------------------------------------------ */
/* Projetos                                                            */
/* ------------------------------------------------------------------ */

const juntar = (itens: string[]) => (itens.length <= 1 ? itens.join('') : `${itens.slice(0, -1).join(', ')} e ${itens.at(-1)}`);

/** Temporadas exigidas pelo projeto que ainda não foram concluídas. As que ainda não foram geradas não contam. */
export function requisitosPendentes(pj: ProjetoMeta, p: Progresso, prova: Prova): TemporadaMeta[] {
  return pj.requisitos
    .map((id) => getTemporada(id))
    .filter((t): t is TemporadaMeta => !!t && temporadaDisponivel(t.id) && !estadoTemporada(t, p, prova).provaLiberada);
}

/** O projeto publicado anterior no mesmo cargo, que precisa terminar antes deste abrir. */
export function projetoAnterior(pj: ProjetoMeta): ProjetoMeta | undefined {
  return PROJETOS.filter((x) => x.cargo === pj.cargo && x.numero < pj.numero && projetoDisponivel(x.id)).at(-1);
}

/** Por que o projeto está fechado, numa frase; null quando está aberto. */
export function motivoBloqueioProjeto(pj: ProjetoMeta, p: Progresso, perfil: Perfil): string | null {
  if (perfil.config.modoLivre) return null;
  const c = getCargo(pj.cargo)!;
  if (!cargoDesbloqueado(c, p, perfil)) return `Abre quando você chegar ao cargo ${c.titulo}.`;
  const pendentes = requisitosPendentes(pj, p, perfil.prova);
  if (pendentes.length === 1) return `Abre quando você concluir a temporada "${pendentes[0].titulo}".`;
  if (pendentes.length > 1) return `Abre quando você concluir as temporadas ${juntar(pendentes.map((t) => `"${t.titulo}"`))}.`;
  const anterior = projetoAnterior(pj);
  if (anterior && !p.projetos?.[anterior.id]) return `Abre quando você concluir o projeto "${anterior.titulo}".`;
  return null;
}

export const projetoDesbloqueado = (pj: ProjetoMeta, p: Progresso, perfil: Perfil) => motivoBloqueioProjeto(pj, p, perfil) === null;

/** Etapas abrem em sequência: cada uma destrava a seguinte ao ser concluída. */
export function etapaDesbloqueada(etapas: { id: string }[], i: number, p: Progresso, perfil: Perfil): boolean {
  return perfil.config.modoLivre || i === 0 || !!p.etapas?.[etapas[i - 1].id]?.concluidaEm;
}
