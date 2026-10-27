import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CargoId, Prova } from '../content/types';
import { avaliarConquistas } from './conquistas';
import { diaLocal, diferencaDias, somarDias } from './datas';
import { emitir } from './eventos';

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export interface Config {
  som: boolean;
  autoplay: boolean;
  modoLivre: boolean;
  /** Sons de meme no acerto e no erro, tocados do myinstants. Ausente em perfis antigos: vale ligado. */
  sonsMeme?: boolean;
}

export interface Perfil {
  id: string;
  nome: string;
  avatar: number;
  prova: Prova;
  /** Meta diária em XP. */
  meta: number;
  criadoEm: string;
  config: Config;
}

export interface RegistroResposta {
  acertos: number;
  erros: number;
  ultimaCerta: boolean;
  em: string;
}

export interface RegistroEpisodio {
  concluidoEm?: string;
  melhor: number;
  total: number;
  tentativas: number;
  /** Sistema de notas: a melhor soma de pontos numa rodada e a soma dos pesos. Ausentes em progressos antigos. */
  pontos?: number;
  pesos?: number;
  /** Bugs da aba Depuração do episódio, que entram na nota. */
  bugs?: string[];
}

export interface SessaoEpisodio {
  /** Resultado por índice de exercício: true/false ou null se não respondido. */
  resultados: (boolean | null)[];
  indice: number;
  combo: number;
  xp: number;
  melhorCombo: number;
  iniciadaEm: string;
  /** Sistema de notas: pontos de cada questão (0 a peso, já com o teto) e o peso de cada uma. */
  pontos?: (number | null)[];
  pesos?: number[];
}

export interface RegistroExame {
  melhorPct: number;
  ultimaPct: number;
  aprovadoEm?: string;
  tentativas: number;
}

export interface RegistroSimulado {
  em: string;
  prova: Prova;
  acertos: number;
  total: number;
  segundos: number;
}

export interface ItemRevisao {
  caixa: number;
  proxima: string;
}

export interface Reporte {
  id: string;
  exercicio: string;
  motivo: string;
  texto: string;
  em: string;
}

export interface Ofensiva {
  atual: number;
  recorde: number;
  ultimoDia: string | null;
  congelamentos: number;
  diasCongelados: string[];
}

export interface RegistroEtapa {
  criterios: number[];
  viuSolucao?: boolean;
  concluidaEm?: string;
}

export interface Progresso {
  xp: number;
  xpPorDia: Record<string, number>;
  ofensiva: Ofensiva;
  aulas: Record<string, string>;
  respostas: Record<string, RegistroResposta>;
  episodios: Record<string, RegistroEpisodio>;
  sessoes: Record<string, SessaoEpisodio>;
  provas: Record<string, RegistroExame>;
  avaliacoes: Record<string, RegistroExame>;
  promocoes: Partial<Record<CargoId, string>>;
  simulados: RegistroSimulado[];
  revisao: Record<string, ItemRevisao>;
  conquistas: Record<string, string>;
  desafios: Record<string, string>;
  /** Bugs da aba Depuração já resolvidos: dia e se acertou a linha de primeira. Opcional em progressos antigos. */
  bugs?: Record<string, { em: string; dePrimeira: boolean }>;
  /** Quantas vezes cada questão de episódio foi respondida, para o teto por tentativa. */
  tentativas?: Record<string, number>;
  /** Ajuda usada em cada desafio antes de entregar: abriu dica, viu a solução. */
  ajudaDesafio?: Record<string, { dica?: boolean; solucao?: boolean }>;
  /** Etapas de projetos: critérios marcados, se abriu a solução e quando concluiu. Opcional em progressos antigos. */
  etapas?: Record<string, RegistroEtapa>;
  /** Projetos com todas as etapas concluídas: dia da conclusão. Opcional em progressos antigos. */
  projetos?: Record<string, string>;
  videos: Record<string, string>;
  reportes: Reporte[];
  estat: {
    revisoes: number;
    melhorCombo: number;
    linhasCertas: number;
    episodiosPorDia: Record<string, number>;
    madrugada: boolean;
    cedo: boolean;
  };
  ultimoEpisodio?: string;
}

export function progressoVazio(): Progresso {
  return {
    xp: 0,
    xpPorDia: {},
    ofensiva: { atual: 0, recorde: 0, ultimoDia: null, congelamentos: 0, diasCongelados: [] },
    aulas: {},
    respostas: {},
    episodios: {},
    sessoes: {},
    provas: {},
    avaliacoes: {},
    promocoes: {},
    simulados: [],
    revisao: {},
    conquistas: {},
    desafios: {},
    bugs: {},
    videos: {},
    reportes: [],
    estat: { revisoes: 0, melhorCombo: 0, linhasCertas: 0, episodiosPorDia: {}, madrugada: false, cedo: false },
  };
}

/* ------------------------------------------------------------------ */
/* Regras de XP                                                        */
/* ------------------------------------------------------------------ */

export const XP = {
  acerto: 10,
  acertoRepetido: 4,
  comboMax: 10,
  aula: 15,
  episodio: 25,
  episodioPerfeito: 25,
  revisao: 8,
  prova: 150,
  avaliacao: 400,
  simuladoAcerto: 2,
  simuladoAprovado: 200,
  desafio: 30,
  bug: 15,
  bugComAjuda: 5,
  etapa: 40,
  etapaComSolucao: 15,
  projeto: 150,
  video: 10,
};

export function bonusCombo(combo: number) {
  return combo >= 2 ? Math.min(XP.comboMax, (combo - 1) * 2) : 0;
}

export const METAS = [
  { xp: 30, nome: 'Leve', texto: 'Uns 10 minutos: a aula ou meia dúzia de questões.' },
  { xp: 60, nome: 'Constante', texto: 'Uns 20 minutos: um episódio quase inteiro.' },
  { xp: 120, nome: 'Sério', texto: 'Uns 40 minutos: um episódio completo e revisão.' },
  { xp: 200, nome: 'Intensivo', texto: 'Uma hora ou mais: para quem marcou a data da prova.' },
];

const INTERVALOS_REVISAO = [1, 3, 7, 16, 35];

/* ------------------------------------------------------------------ */
/* Ofensiva                                                            */
/* ------------------------------------------------------------------ */

export type StatusOfensiva = 'feita' | 'pendente' | 'protegida' | 'perdida' | 'nova';

export function estadoOfensiva(o: Ofensiva, hoje = diaLocal()): { dias: number; status: StatusOfensiva; faltam: number } {
  if (!o.ultimoDia) return { dias: 0, status: 'nova', faltam: 0 };
  if (o.ultimoDia === hoje) return { dias: o.atual, status: 'feita', faltam: 0 };
  const perdidos = diferencaDias(o.ultimoDia, hoje) - 1;
  if (perdidos <= 0) return { dias: o.atual, status: 'pendente', faltam: 0 };
  if (perdidos <= o.congelamentos) return { dias: o.atual, status: 'protegida', faltam: perdidos };
  return { dias: 0, status: 'perdida', faltam: perdidos };
}

function registrarDiaDeMeta(p: Progresso, hoje: string) {
  const o = p.ofensiva;
  if (o.ultimoDia === hoje) return;
  if (!o.ultimoDia) o.atual = 1;
  else {
    const perdidos = diferencaDias(o.ultimoDia, hoje) - 1;
    if (perdidos <= 0) o.atual += 1;
    else if (perdidos <= o.congelamentos) {
      o.congelamentos -= perdidos;
      for (let i = 1; i <= perdidos; i++) o.diasCongelados.push(somarDias(o.ultimoDia, i));
      o.atual += 1;
    } else o.atual = 1;
  }
  o.ultimoDia = hoje;
  o.recorde = Math.max(o.recorde, o.atual);
  emitir({ tipo: 'meta', dias: o.atual });
  if (o.atual % 7 === 0 && o.congelamentos < 2) {
    o.congelamentos += 1;
    emitir({ tipo: 'congelamento', total: o.congelamentos });
  }
}

function ganhar(p: Progresso, perfil: Perfil, valor: number, motivo: string) {
  if (valor <= 0) return;
  const hoje = diaLocal();
  const antes = p.xpPorDia[hoje] ?? 0;
  p.xp += valor;
  p.xpPorDia[hoje] = antes + valor;
  emitir({ tipo: 'xp', valor, motivo });
  if (antes < perfil.meta && antes + valor >= perfil.meta) registrarDiaDeMeta(p, hoje);
}

function marcarHorario(p: Progresso) {
  const h = new Date().getHours();
  if (h >= 0 && h < 5) p.estat.madrugada = true;
  if (h >= 5 && h < 7) p.estat.cedo = true;
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

interface Estado {
  perfis: Perfil[];
  ativo: string | null;
  progresso: Record<string, Progresso>;

  criarPerfil: (dados: Omit<Perfil, 'id' | 'criadoEm' | 'config'> & { config?: Partial<Config> }) => string;
  editarPerfil: (id: string, dados: Partial<Omit<Perfil, 'id'>>) => void;
  removerPerfil: (id: string) => void;
  selecionarPerfil: (id: string | null) => void;

  marcarAula: (episodioId: string) => void;
  iniciarSessao: (episodioId: string, pesos: number[], recomecar?: boolean) => void;
  responderNoEpisodio: (
    episodioId: string,
    exercicioId: string,
    indice: number,
    certo: boolean,
    tipo: string,
    comDica?: boolean,
    pontos?: number,
  ) => number;
  avancarSessao: (episodioId: string, indice: number) => void;
  concluirEpisodio: (episodioId: string, bugs?: string[]) => { acertos: number; total: number; xp: number; primeira: boolean };
  responderRevisao: (exercicioId: string, certo: boolean, comDica?: boolean) => number;
  registrarExame: (
    tipo: 'prova' | 'avaliacao',
    id: string,
    resultado: { acertos: number; total: number; aprovado: boolean; erradas: string[] },
  ) => void;
  registrarSimulado: (r: RegistroSimulado & { aprovado: boolean; erradas: string[] }) => void;
  concluirDesafio: (episodioId: string) => void;
  usarAjudaDesafio: (episodioId: string, ajuda: 'dica' | 'solucao') => void;
  resolverBug: (bugId: string, dePrimeira: boolean) => void;
  marcarCriterio: (etapaId: string, indice: number, marcado: boolean) => void;
  verSolucaoEtapa: (etapaId: string) => void;
  /** Conclui a etapa; com todas as `etapasDoProjeto` concluídas, conclui o projeto. */
  concluirEtapa: (projetoId: string, etapaId: string, etapasDoProjeto: string[]) => void;
  marcarVideo: (driveId: string) => void;
  reportar: (r: Omit<Reporte, 'id' | 'em'>) => void;
  removerReporte: (id: string) => void;
  importar: (json: string) => void;
  zerarProgresso: () => void;
}

function novoId() {
  return Math.random().toString(36).slice(2, 10);
}

export const useStore = create<Estado>()(
  persist(
    (set, get) => {
      /** Aplica uma mudança no progresso do perfil ativo e confere conquistas. */
      function mutar<T>(fn: (p: Progresso, perfil: Perfil) => T): T {
        const { ativo, perfis, progresso } = get();
        const perfil = perfis.find((x) => x.id === ativo);
        if (!perfil) throw new Error('nenhum perfil ativo');
        const p = structuredClone(progresso[perfil.id] ?? progressoVazio());
        const r = fn(p, perfil);
        const novas = avaliarConquistas(p);
        for (const id of novas) {
          p.conquistas[id] = diaLocal();
          emitir({ tipo: 'conquista', id });
        }
        set({ progresso: { ...get().progresso, [perfil.id]: p } });
        return r;
      }

      function agendarRevisao(p: Progresso, exercicioId: string) {
        p.revisao[exercicioId] = { caixa: 0, proxima: somarDias(diaLocal(), 1) };
      }

      function registrarResposta(p: Progresso, exercicioId: string, certo: boolean) {
        const r = p.respostas[exercicioId] ?? { acertos: 0, erros: 0, ultimaCerta: false, em: '' };
        if (certo) r.acertos++;
        else r.erros++;
        r.ultimaCerta = certo;
        r.em = diaLocal();
        p.respostas[exercicioId] = r;
        marcarHorario(p);
      }

      return {
        perfis: [],
        ativo: null,
        progresso: {},

        criarPerfil: (dados) => {
          const id = novoId();
          const perfil: Perfil = {
            id,
            nome: dados.nome,
            avatar: dados.avatar,
            prova: dados.prova,
            meta: dados.meta,
            criadoEm: diaLocal(),
            config: { som: true, autoplay: true, modoLivre: false, ...dados.config },
          };
          set((s) => ({
            perfis: [...s.perfis, perfil],
            progresso: { ...s.progresso, [id]: progressoVazio() },
          }));
          return id;
        },

        editarPerfil: (id, dados) =>
          set((s) => ({
            perfis: s.perfis.map((p) =>
              p.id === id ? { ...p, ...dados, config: { ...p.config, ...(dados.config ?? {}) } } : p,
            ),
          })),

        removerPerfil: (id) =>
          set((s) => {
            const progresso = { ...s.progresso };
            delete progresso[id];
            return {
              perfis: s.perfis.filter((p) => p.id !== id),
              progresso,
              ativo: s.ativo === id ? null : s.ativo,
            };
          }),

        selecionarPerfil: (id) => set({ ativo: id }),

        marcarAula: (episodioId) =>
          mutar((p, perfil) => {
            p.ultimoEpisodio = episodioId;
            if (p.aulas[episodioId]) return;
            p.aulas[episodioId] = diaLocal();
            ganhar(p, perfil, XP.aula, 'Aula assistida');
          }),

        iniciarSessao: (episodioId, pesos, recomecar = false) =>
          mutar((p) => {
            p.ultimoEpisodio = episodioId;
            const total = pesos.length;
            const atual = p.sessoes[episodioId];
            if (atual && !recomecar && atual.resultados.length === total) {
              // sessão de antes das notas: começa a contar pontos daqui em diante
              if (!atual.pontos) {
                atual.pontos = atual.resultados.map(() => null);
                atual.pesos = pesos;
              }
              return;
            }
            p.sessoes[episodioId] = {
              resultados: Array(total).fill(null),
              indice: 0,
              combo: 0,
              xp: 0,
              melhorCombo: 0,
              iniciadaEm: diaLocal(),
              pontos: Array(total).fill(null),
              pesos,
            };
          }),

        responderNoEpisodio: (episodioId, exercicioId, indice, certo, tipo, comDica = false, pontos) =>
          mutar((p, perfil) => {
            const s = p.sessoes[episodioId];
            if (!s || s.resultados[indice] !== null) return 0;
            const jaAcertou = (p.respostas[exercicioId]?.acertos ?? 0) > 0;
            registrarResposta(p, exercicioId, certo);
            s.resultados[indice] = certo;
            p.tentativas ??= {};
            p.tentativas[exercicioId] = (p.tentativas[exercicioId] ?? 0) + 1;
            if (s.pontos && pontos !== undefined) s.pontos[indice] = pontos;
            let ganho = 0;
            if (certo && comDica) {
              // acerto com dica: conta para o episódio, mas não rende XP nem aumenta a sequência
              if (tipo === 'linha') p.estat.linhasCertas += 1;
            } else if (certo) {
              s.combo += 1;
              s.melhorCombo = Math.max(s.melhorCombo, s.combo);
              p.estat.melhorCombo = Math.max(p.estat.melhorCombo, s.combo);
              if (tipo === 'linha') p.estat.linhasCertas += 1;
              ganho = (jaAcertou ? XP.acertoRepetido : XP.acerto) + bonusCombo(s.combo);
              ganhar(p, perfil, ganho, s.combo >= 3 ? `Sequência de ${s.combo}` : 'Resposta certa');
            } else {
              s.combo = 0;
              agendarRevisao(p, exercicioId);
            }
            s.xp += ganho;
            return ganho;
          }),

        avancarSessao: (episodioId, indice) =>
          mutar((p) => {
            const s = p.sessoes[episodioId];
            if (s) s.indice = indice;
          }),

        concluirEpisodio: (episodioId, bugs) =>
          mutar((p, perfil) => {
            const s = p.sessoes[episodioId];
            const acertos = s ? s.resultados.filter((r) => r === true).length : 0;
            const total = s ? s.resultados.length : 0;
            const reg = p.episodios[episodioId] ?? { melhor: 0, total, tentativas: 0 };
            const primeira = !reg.concluidoEm;
            // nota guardada até aqui; em progresso antigo, a dos acertos
            const antes = primeira ? -1 : (reg.pontos ?? reg.melhor) / ((reg.pesos ?? reg.total) || 1);
            reg.tentativas += 1;
            reg.melhor = Math.max(reg.melhor, acertos);
            reg.total = total;
            if (s?.pontos && s.pesos && s.pontos.every((x) => x !== null)) {
              // refazer guarda a maior nota
              const pontos = s.pontos.reduce<number>((a, x) => a + (x ?? 0), 0);
              const pesos = s.pesos.reduce((a, x) => a + x, 0);
              if (pesos && pontos / pesos > antes) {
                reg.pontos = pontos;
                reg.pesos = pesos;
              }
            }
            if (bugs) reg.bugs = bugs;
            let xp = 0;
            if (primeira) {
              reg.concluidoEm = diaLocal();
              const hoje = diaLocal();
              p.estat.episodiosPorDia[hoje] = (p.estat.episodiosPorDia[hoje] ?? 0) + 1;
              xp += XP.episodio;
              ganhar(p, perfil, XP.episodio, 'Episódio concluído');
            }
            if (acertos === total && total > 0 && reg.melhor === total && primeira) {
              xp += XP.episodioPerfeito;
              ganhar(p, perfil, XP.episodioPerfeito, 'Gabaritou o episódio');
            }
            p.episodios[episodioId] = reg;
            return { acertos, total, xp: (s?.xp ?? 0) + xp, primeira };
          }),

        responderRevisao: (exercicioId, certo, comDica = false) =>
          mutar((p, perfil) => {
            registrarResposta(p, exercicioId, certo);
            p.estat.revisoes += 1;
            const item = p.revisao[exercicioId];
            if (!certo) {
              agendarRevisao(p, exercicioId);
              return 0;
            }
            if (comDica) {
              // com dica, a questão volta amanhã na mesma caixa e não rende XP
              if (item) p.revisao[exercicioId] = { caixa: item.caixa, proxima: somarDias(diaLocal(), 1) };
              return 0;
            }
            if (item) {
              const caixa = item.caixa + 1;
              if (caixa >= INTERVALOS_REVISAO.length) delete p.revisao[exercicioId];
              else p.revisao[exercicioId] = { caixa, proxima: somarDias(diaLocal(), INTERVALOS_REVISAO[caixa]) };
            }
            ganhar(p, perfil, XP.revisao, 'Revisão');
            return XP.revisao;
          }),

        registrarExame: (tipo, id, r) =>
          mutar((p, perfil) => {
            const mapa = tipo === 'prova' ? p.provas : p.avaliacoes;
            const pct = r.total ? Math.round((r.acertos / r.total) * 100) : 0;
            const reg = mapa[id] ?? { melhorPct: 0, ultimaPct: 0, tentativas: 0 };
            const primeiraAprovacao = r.aprovado && !reg.aprovadoEm;
            reg.tentativas += 1;
            reg.ultimaPct = pct;
            reg.melhorPct = Math.max(reg.melhorPct, pct);
            if (r.aprovado && !reg.aprovadoEm) reg.aprovadoEm = diaLocal();
            mapa[id] = reg;
            for (const ex of r.erradas) agendarRevisao(p, ex);
            if (primeiraAprovacao) {
              if (tipo === 'prova') ganhar(p, perfil, XP.prova, 'Prova da temporada');
              else {
                ganhar(p, perfil, XP.avaliacao, 'Avaliação de desempenho');
                p.promocoes[id as CargoId] = diaLocal();
                emitir({ tipo: 'promocao', cargo: id });
              }
            }
            marcarHorario(p);
          }),

        registrarSimulado: (r) =>
          mutar((p, perfil) => {
            const { aprovado, erradas, ...registro } = r;
            const jaAprovado = p.simulados.some((s) => s.total >= 40 && s.acertos / s.total >= 0.68 && s.prova === r.prova);
            p.simulados.push(registro);
            for (const ex of erradas) agendarRevisao(p, ex);
            ganhar(p, perfil, r.acertos * XP.simuladoAcerto, 'Simulado');
            if (aprovado && r.total >= 40 && !jaAprovado) {
              ganhar(p, perfil, XP.simuladoAprovado, 'Simulado aprovado');
              if (!p.promocoes['reta-final']) {
                p.promocoes['reta-final'] = diaLocal();
                emitir({ tipo: 'promocao', cargo: 'reta-final' });
              }
            }
          }),

        concluirDesafio: (episodioId) =>
          mutar((p, perfil) => {
            if (p.desafios[episodioId]) return;
            p.desafios[episodioId] = diaLocal();
            ganhar(p, perfil, XP.desafio, 'Desafio de código');
          }),

        usarAjudaDesafio: (episodioId, ajuda) =>
          mutar((p) => {
            if (p.desafios[episodioId]) return;
            p.ajudaDesafio ??= {};
            (p.ajudaDesafio[episodioId] ??= {})[ajuda] = true;
          }),

        resolverBug: (bugId, dePrimeira) =>
          mutar((p, perfil) => {
            p.bugs ??= {};
            if (p.bugs[bugId]) return;
            p.bugs[bugId] = { em: diaLocal(), dePrimeira };
            ganhar(p, perfil, dePrimeira ? XP.bug : XP.bugComAjuda, 'Bug corrigido');
          }),

        marcarCriterio: (etapaId, indice, marcado) =>
          mutar((p) => {
            p.etapas ??= {};
            const e = (p.etapas[etapaId] ??= { criterios: [] });
            const s = new Set(e.criterios);
            if (marcado) s.add(indice);
            else s.delete(indice);
            e.criterios = [...s].sort((a, b) => a - b);
          }),

        verSolucaoEtapa: (etapaId) =>
          mutar((p) => {
            p.etapas ??= {};
            const e = (p.etapas[etapaId] ??= { criterios: [] });
            if (!e.concluidaEm) e.viuSolucao = true;
          }),

        concluirEtapa: (projetoId, etapaId, etapasDoProjeto) =>
          mutar((p, perfil) => {
            p.etapas ??= {};
            const e = (p.etapas[etapaId] ??= { criterios: [] });
            if (e.concluidaEm) return;
            e.concluidaEm = diaLocal();
            marcarHorario(p);
            ganhar(p, perfil, e.viuSolucao ? XP.etapaComSolucao : XP.etapa, 'Etapa de projeto');
            p.projetos ??= {};
            if (!p.projetos[projetoId] && etapasDoProjeto.every((id) => p.etapas?.[id]?.concluidaEm)) {
              p.projetos[projetoId] = diaLocal();
              ganhar(p, perfil, XP.projeto, 'Projeto concluído');
            }
          }),

        marcarVideo: (driveId) =>
          mutar((p, perfil) => {
            if (p.videos[driveId]) return;
            p.videos[driveId] = diaLocal();
            ganhar(p, perfil, XP.video, 'Vídeo do curso');
          }),

        reportar: (r) =>
          mutar((p) => {
            p.reportes.push({ ...r, id: novoId(), em: new Date().toISOString() });
          }),

        removerReporte: (id) =>
          mutar((p) => {
            p.reportes = p.reportes.filter((r) => r.id !== id);
          }),

        importar: (json) => {
          const dados = JSON.parse(json);
          if (!dados || !Array.isArray(dados.perfis) || typeof dados.progresso !== 'object') {
            throw new Error('Arquivo não parece um backup da Javaflix.');
          }
          set({ perfis: dados.perfis, progresso: dados.progresso, ativo: null });
        },

        zerarProgresso: () =>
          set((s) => (s.ativo ? { progresso: { ...s.progresso, [s.ativo]: progressoVazio() } } : {})),
      };
    },
    {
      name: 'javaflix',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ perfis: s.perfis, ativo: s.ativo, progresso: s.progresso }),
    },
  ),
);

/* ------------------------------------------------------------------ */
/* Hooks de leitura                                                    */
/* ------------------------------------------------------------------ */

export function usePerfil(): Perfil | null {
  return useStore((s) => s.perfis.find((p) => p.id === s.ativo) ?? null);
}

const VAZIO = progressoVazio();

export function useProgresso(): Progresso {
  return useStore((s) => (s.ativo ? (s.progresso[s.ativo] ?? VAZIO) : VAZIO));
}

export function revisoesPendentes(p: Progresso, hoje = diaLocal()): string[] {
  return Object.entries(p.revisao)
    .filter(([, r]) => r.proxima <= hoje)
    .map(([id]) => id);
}
