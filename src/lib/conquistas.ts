import type { Progresso } from './store';

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  /** Glifo curto mostrado no selo. */
  selo: string;
  cond: (p: Progresso) => boolean;
}

const episodiosConcluidos = (p: Progresso) => Object.values(p.episodios).filter((e) => e.concluidoEm).length;
const provasAprovadas = (p: Progresso) => Object.values(p.provas).filter((e) => e.aprovadoEm).length;
const respondidas = (p: Progresso) => Object.values(p.respostas).reduce((s, r) => s + r.acertos + r.erros, 0);
const diasEstudados = (p: Progresso) => Object.keys(p.xpPorDia).length;

export const CONQUISTAS: Conquista[] = [
  {
    id: 'hello-world',
    titulo: 'Hello, World',
    descricao: 'Concluiu o primeiro episódio.',
    selo: 'main',
    cond: (p) => episodiosConcluidos(p) >= 1,
  },
  {
    id: 'compilou-de-primeira',
    titulo: 'Compilou de primeira',
    descricao: 'Acertou todos os exercícios de um episódio.',
    selo: '0 err',
    cond: (p) => Object.values(p.episodios).some((e) => e.concluidoEm && e.total > 0 && e.melhor === e.total),
  },
  {
    id: 'sem-warnings',
    titulo: 'Sem warnings',
    descricao: 'Fez uma sequência de 10 acertos seguidos.',
    selo: 'x10',
    cond: (p) => p.estat.melhorCombo >= 10,
  },
  {
    id: 'maratona',
    titulo: 'Maratonou',
    descricao: 'Concluiu 3 episódios no mesmo dia.',
    selo: '3ep',
    cond: (p) => Object.values(p.estat.episodiosPorDia).some((n) => n >= 3),
  },
  {
    id: 'ofensiva-3',
    titulo: 'Pegando o ritmo',
    descricao: 'Bateu a meta diária 3 dias seguidos.',
    selo: '3d',
    cond: (p) => p.ofensiva.recorde >= 3,
  },
  {
    id: 'ofensiva-7',
    titulo: 'Semana cheia',
    descricao: 'Ofensiva de 7 dias. Ganhou um congelamento.',
    selo: '7d',
    cond: (p) => p.ofensiva.recorde >= 7,
  },
  {
    id: 'ofensiva-30',
    titulo: 'Hábito formado',
    descricao: 'Ofensiva de 30 dias.',
    selo: '30d',
    cond: (p) => p.ofensiva.recorde >= 30,
  },
  {
    id: 'ofensiva-100',
    titulo: 'Long-term support',
    descricao: 'Ofensiva de 100 dias.',
    selo: 'LTS',
    cond: (p) => p.ofensiva.recorde >= 100,
  },
  {
    id: 'temporada-fechada',
    titulo: 'Fim de temporada',
    descricao: 'Passou na primeira prova de temporada.',
    selo: 'T1',
    cond: (p) => provasAprovadas(p) >= 1,
  },
  {
    id: 'gabarito',
    titulo: 'Gabaritou',
    descricao: 'Tirou 100% numa prova de temporada.',
    selo: '100%',
    cond: (p) => Object.values(p.provas).some((e) => e.melhorPct === 100),
  },
  {
    id: 'promovido',
    titulo: 'Promovido',
    descricao: 'Passou numa avaliação de desempenho.',
    selo: '↑',
    cond: (p) => Object.values(p.avaliacoes).some((e) => e.aprovadoEm),
  },
  {
    id: 'cacador-de-bugs',
    titulo: 'Caçador de bugs',
    descricao: 'Achou 10 linhas que não compilam.',
    selo: 'bug',
    cond: (p) => p.estat.linhasCertas >= 10,
  },
  {
    id: 'revisor',
    titulo: 'Code review',
    descricao: 'Fez 25 revisões de questões que tinha errado.',
    selo: 'diff',
    cond: (p) => p.estat.revisoes >= 25,
  },
  {
    id: 'cem-questoes',
    titulo: 'Cem questões',
    descricao: 'Respondeu 100 questões.',
    selo: '100',
    cond: (p) => respondidas(p) >= 100,
  },
  {
    id: 'mil-questoes',
    titulo: 'Mil questões',
    descricao: 'Respondeu 1.000 questões.',
    selo: '1k',
    cond: (p) => respondidas(p) >= 1000,
  },
  {
    id: 'xp-1000',
    titulo: 'Mil de XP',
    descricao: 'Acumulou 1.000 XP.',
    selo: '1kXP',
    cond: (p) => p.xp >= 1000,
  },
  {
    id: 'xp-10000',
    titulo: 'Dez mil de XP',
    descricao: 'Acumulou 10.000 XP.',
    selo: '10k',
    cond: (p) => p.xp >= 10000,
  },
  {
    id: 'madrugada',
    titulo: 'Deploy de madrugada',
    descricao: 'Estudou entre meia-noite e 5h.',
    selo: '03h',
    cond: (p) => p.estat.madrugada,
  },
  {
    id: 'cedo',
    titulo: 'Antes do daily',
    descricao: 'Estudou antes das 7h.',
    selo: '06h',
    cond: (p) => p.estat.cedo,
  },
  {
    id: 'desafio',
    titulo: 'Abriu a IDE',
    descricao: 'Resolveu o primeiro desafio de código.',
    selo: '{ }',
    cond: (p) => Object.keys(p.desafios).length >= 1,
  },
  {
    id: 'primeiro-commit',
    titulo: 'Primeiro commit',
    descricao: 'Concluiu a primeira etapa de um projeto.',
    selo: 'git',
    cond: (p) => Object.values(p.etapas ?? {}).some((e) => e.concluidaEm),
  },
  {
    id: 'projeto',
    titulo: 'Pronto para o portfólio',
    descricao: 'Concluiu um projeto inteiro.',
    selo: 'v1.0',
    cond: (p) => Object.keys(p.projetos ?? {}).length >= 1,
  },
  {
    id: 'tres-projetos',
    titulo: 'GitHub verdinho',
    descricao: 'Concluiu três projetos.',
    selo: '3x',
    cond: (p) => Object.keys(p.projetos ?? {}).length >= 3,
  },
  {
    id: 'video',
    titulo: 'Sessão pipoca',
    descricao: 'Assistiu a um vídeo do curso como reforço.',
    selo: '▶',
    cond: (p) => Object.keys(p.videos).length >= 1,
  },
  {
    id: 'reporte',
    titulo: 'Abriu uma issue',
    descricao: 'Reportou um erro numa questão.',
    selo: '#1',
    cond: (p) => p.reportes.length >= 1,
  },
  {
    id: 'dez-dias',
    titulo: 'Dez dias de estudo',
    descricao: 'Estudou em 10 dias diferentes.',
    selo: '10d',
    cond: (p) => diasEstudados(p) >= 10,
  },
  {
    id: 'simulado',
    titulo: 'Pronto para a prova',
    descricao: 'Passou num simulado completo.',
    selo: 'OCP',
    cond: (p) => !!p.promocoes['reta-final'],
  },
];

export const getConquista = (id: string) => CONQUISTAS.find((c) => c.id === id);

export function avaliarConquistas(p: Progresso): string[] {
  return CONQUISTAS.filter((c) => !p.conquistas[c.id] && c.cond(p)).map((c) => c.id);
}
