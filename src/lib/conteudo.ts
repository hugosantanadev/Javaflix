import { useEffect, useState } from 'react';
import { CARGOS, getCargo, getTemporada, getTemporadaDoEpisodio, TEMPORADAS } from '../content/catalogo';
import type { CargoId, EpisodioConteudo, Exercicio, ProjetoConteudo, Prova, TemporadaConteudo, TemporadaMeta } from '../content/types';

const modulos = import.meta.glob<{ default: TemporadaConteudo }>('../content/temporadas/*/index.ts');

const porId = new Map<string, () => Promise<{ default: TemporadaConteudo }>>();
for (const [caminho, carregar] of Object.entries(modulos)) {
  const id = caminho.split('/').at(-2)!;
  porId.set(id, carregar);
}

export const temporadaDisponivel = (id: string) => porId.has(id);
export const episodioDisponivel = (id: string) => {
  const t = getTemporadaDoEpisodio(id);
  return !!t && porId.has(t.id);
};

export const TEMPORADAS_DISPONIVEIS = TEMPORADAS.filter((t) => porId.has(t.id));

const cache = new Map<string, Promise<TemporadaConteudo>>();
const prontas = new Map<string, TemporadaConteudo>();

export function carregarTemporada(id: string): Promise<TemporadaConteudo> {
  const carregar = porId.get(id);
  if (!carregar) return Promise.reject(new Error(`Temporada ${id} ainda não foi gerada`));
  let p = cache.get(id);
  if (!p) {
    p = carregar().then((m) => {
      prontas.set(id, m.default);
      return m.default;
    });
    cache.set(id, p);
  }
  return p;
}

export function carregarTodas(): Promise<TemporadaConteudo[]> {
  return Promise.all(TEMPORADAS_DISPONIVEIS.map((t) => carregarTemporada(t.id)));
}

export type Carga<T> = { status: 'carregando' } | { status: 'ok'; dados: T } | { status: 'indisponivel' } | { status: 'erro'; erro: string };

export function useTemporada(id: string | undefined): Carga<TemporadaConteudo> {
  const [estado, setEstado] = useState<Carga<TemporadaConteudo>>(() => {
    if (!id || !porId.has(id)) return { status: 'indisponivel' };
    const pronta = prontas.get(id);
    return pronta ? { status: 'ok', dados: pronta } : { status: 'carregando' };
  });
  useEffect(() => {
    if (!id || !porId.has(id)) {
      setEstado({ status: 'indisponivel' });
      return;
    }
    const pronta = prontas.get(id);
    if (pronta) {
      setEstado({ status: 'ok', dados: pronta });
      return;
    }
    let vivo = true;
    setEstado({ status: 'carregando' });
    carregarTemporada(id)
      .then((dados) => vivo && setEstado({ status: 'ok', dados }))
      .catch((e) => vivo && setEstado({ status: 'erro', erro: String(e) }));
    return () => {
      vivo = false;
    };
  }, [id]);
  return estado;
}

export function useTodas(): Carga<TemporadaConteudo[]> {
  const [estado, setEstado] = useState<Carga<TemporadaConteudo[]>>({ status: 'carregando' });
  useEffect(() => {
    let vivo = true;
    carregarTodas()
      .then((dados) => vivo && setEstado({ status: 'ok', dados }))
      .catch((e) => vivo && setEstado({ status: 'erro', erro: String(e) }));
    return () => {
      vivo = false;
    };
  }, []);
  return estado;
}

/* ------------------------------------------------------------------ */
/* Filtros por prova                                                   */
/* ------------------------------------------------------------------ */

/** O exercício vale para a prova do aluno? Conteúdo de mercado vale sempre. */
export function exercicioNaProva(q: Exercicio, provasPadrao: Prova[], prova: Prova): boolean {
  const ps = q.provas ?? provasPadrao;
  return ps.length === 0 || ps.includes(prova);
}

export function exerciciosDoEpisodio(ep: EpisodioConteudo, prova: Prova): Exercicio[] {
  const meta = getTemporadaDoEpisodio(ep.id)?.episodios.find((e) => e.id === ep.id);
  const padrao = meta?.provas ?? [];
  return ep.exercicios.filter((q) => exercicioNaProva(q, padrao, prova));
}

export function provasDe(t: TemporadaMeta): Prova[] {
  const s = new Set<Prova>();
  t.episodios.forEach((e) => e.provas.forEach((p) => s.add(p)));
  return [...s];
}

export function questoesDaProva(t: TemporadaConteudo, prova: Prova): Exercicio[] {
  const meta = getTemporada(t.id);
  const padrao = meta ? provasDe(meta) : [];
  return t.prova.filter((q) => exercicioNaProva(q, padrao, prova));
}

/** Índice global exercício → contexto, para revisão e simulado. */
export interface QuestaoComContexto {
  q: Exercicio;
  temporadaId: string;
  episodioId: string | null;
  provasPadrao: Prova[];
}

export function indexarQuestoes(temporadas: TemporadaConteudo[]): Map<string, QuestaoComContexto> {
  const m = new Map<string, QuestaoComContexto>();
  for (const t of temporadas) {
    const meta = getTemporada(t.id);
    if (!meta) continue;
    t.episodios.forEach((ep) => {
      const em = meta.episodios.find((e) => e.id === ep.id);
      ep.exercicios.forEach((q) => m.set(q.id, { q, temporadaId: t.id, episodioId: ep.id, provasPadrao: em?.provas ?? [] }));
    });
    const padrao = provasDe(meta);
    t.prova.forEach((q) => m.set(q.id, { q, temporadaId: t.id, episodioId: null, provasPadrao: padrao }));
  }
  return m;
}

export function cargoCompleto(id: CargoId) {
  const c = getCargo(id);
  return !!c && c.temporadas.length > 0 && c.temporadas.every((t) => porId.has(t.id));
}

export { CARGOS };

/* ------------------------------------------------------------------ */
/* Projetos                                                            */
/* ------------------------------------------------------------------ */

const modulosProjeto = import.meta.glob<{ default: ProjetoConteudo }>('../content/projetos/*/index.ts');
const projetoPorId = new Map<string, () => Promise<{ default: ProjetoConteudo }>>();
for (const [caminho, carregar] of Object.entries(modulosProjeto)) {
  projetoPorId.set(caminho.split('/').at(-2)!, carregar);
}

export const projetoDisponivel = (id: string) => projetoPorId.has(id);

const projetosProntos = new Map<string, ProjetoConteudo>();

export function useProjeto(id: string | undefined): Carga<ProjetoConteudo> {
  const [estado, setEstado] = useState<Carga<ProjetoConteudo>>(() => {
    if (!id || !projetoPorId.has(id)) return { status: 'indisponivel' };
    const pronto = projetosProntos.get(id);
    return pronto ? { status: 'ok', dados: pronto } : { status: 'carregando' };
  });
  useEffect(() => {
    const carregar = id ? projetoPorId.get(id) : undefined;
    if (!id || !carregar) {
      setEstado({ status: 'indisponivel' });
      return;
    }
    const pronto = projetosProntos.get(id);
    if (pronto) {
      setEstado({ status: 'ok', dados: pronto });
      return;
    }
    let vivo = true;
    setEstado({ status: 'carregando' });
    carregar()
      .then((m) => {
        projetosProntos.set(id, m.default);
        if (vivo) setEstado({ status: 'ok', dados: m.default });
      })
      .catch((e) => vivo && setEstado({ status: 'erro', erro: String(e) }));
    return () => {
      vivo = false;
    };
  }, [id]);
  return estado;
}
