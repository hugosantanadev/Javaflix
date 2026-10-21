/**
 * Schema do conteúdo da Javaflix.
 *
 * O catálogo (catalogo.ts) descreve TODOS os cargos, temporadas e episódios,
 * mesmo os que ainda não foram gerados. O conteúdo de cada temporada mora em
 * src/content/temporadas/<id-da-temporada>/ e é carregado sob demanda.
 *
 * Regras completas para gerar conteúdo: docs/GERAR_TEMPORADA.md
 */

export type Prova = '829' | '830' | '831';

export const PROVAS: Record<
  Prova,
  { codigo: string; java: number; questoes: number; minutos: number; aprovacao: number; resumo: string }
> = {
  '829': {
    codigo: '1Z0-829',
    java: 17,
    questoes: 50,
    minutos: 90,
    aprovacao: 68,
    resumo: 'Java 17. Tem JDBC; não cobra threads virtuais nem pattern matching em switch.',
  },
  '830': {
    codigo: '1Z0-830',
    java: 21,
    questoes: 50,
    minutos: 120,
    aprovacao: 68,
    resumo: 'Java 21. Sai JDBC; entram threads virtuais, pattern matching em switch e record patterns.',
  },
  '831': {
    codigo: '1Z0-831',
    java: 25,
    questoes: 50,
    minutos: 120,
    aprovacao: 68,
    resumo: 'Java 25. A mais nova; soma recursos do Java 22 ao 25.',
  },
};

export type CargoId =
  | 'aprendiz'
  | 'estagiario'
  | 'junior'
  | 'pleno'
  | 'senior'
  | 'reta-final'
  | 'backend-junior'
  | 'backend-pleno'
  | 'backend-senior';

/* ------------------------------------------------------------------ */
/* Catálogo                                                            */
/* ------------------------------------------------------------------ */

export interface CargoMeta {
  id: CargoId;
  ordem: number;
  titulo: string;
  /** Uma linha: o que o cargo cobre. */
  foco: string;
  descricao: string;
  /**
   * certificacao e mercado formam a carreira, com promoções.
   * base é a trilha opcional de fundamentos: sempre aberta, sem avaliação.
   */
  trilha: 'base' | 'certificacao' | 'mercado';
  /** Cor de destaque da arte (hex). */
  cor: string;
  /** Cor de fundo da arte (hex, escura). */
  fundo: string;
  temporadas: TemporadaMeta[];
}

export interface TemporadaMeta {
  /** ex.: "estagiario-t1" */
  id: string;
  cargo: CargoId;
  numero: number;
  titulo: string;
  sinopse: string;
  /** Glifo grande da arte da temporada (ex.: "if", "[ ]", "i++"). */
  glifo: string;
  episodios: EpisodioMeta[];
}

export interface EpisodioMeta {
  /** ex.: "estagiario-t1-e01" */
  id: string;
  numero: number;
  titulo: string;
  /** Provas em que o assunto cai. Vazio para conteúdo de mercado. */
  provas: Prova[];
  /** Palavras-chave usadas para casar vídeos do curso com o episódio. */
  tags: string[];
}

/* ------------------------------------------------------------------ */
/* Conteúdo gerado                                                     */
/* ------------------------------------------------------------------ */

export interface TemporadaConteudo {
  id: string;
  episodios: EpisodioConteudo[];
  /** Prova da temporada: questões inéditas, no formato da certificação. */
  prova: Exercicio[];
}

export interface EpisodioConteudo {
  id: string;
  /** Minutos estimados de leitura da aula. */
  minutos: number;
  /** Aula em Markdown. Blocos ```java executar``` são compilados pelo verify. */
  aula: string;
  /** Armadilhas típicas de prova, uma frase cada. */
  armadilhas: string[];
  /** Material externo recomendado. */
  recursos: Recurso[];
  /** Desafio de código para resolver na IDE (opcional). */
  desafio?: Desafio;
  /** Como usar IA neste assunto, onde ela erra e como conferir. Obrigatório em episódios novos. */
  ia?: IaNaPratica;
  /** Aba Depuração: bugs para achar e corrigir, do erro de sintaxe ao bug de produção. */
  bugs?: Bug[];
  /** Exatamente 15 exercícios. */
  exercicios: Exercicio[];
}

/**
 * Um bug para caçar. O aluno lê o sintoma, clica na linha culpada e depois vê
 * a correção. O verify confere que o código com bug se comporta como o
 * sintoma diz e que a correção roda e imprime `saidaCorrigida`.
 */
export interface Bug {
  /** `<episodio>-b01` em diante. */
  id: string;
  dificuldade: 1 | 2 | 3;
  /** O que alguém relataria: "não compila", "imprime X, mas deveria imprimir Y", "lança Z". */
  sintoma: string;
  /** O código com o bug. Mesmas regras de montagem dos exercícios. */
  codigo: string;
  /** Linha do bug, a partir de 1. Precisa ser a linha que muda na correção. */
  linha: number;
  /**
   * Como o bug aparece, conferido pelo verify:
   * naoCompila: todos os erros do compilador estão em `linha`;
   * saida: roda e imprime exatamente isso (a saída errada);
   * excecao: roda e lança a exceção de nome simples `nome`.
   */
  efeito: { tipo: 'naoCompila' } | { tipo: 'saida'; saida: string } | { tipo: 'excecao'; nome: string };
  /** O código corrigido, com o mesmo número de linhas. */
  correcao: string;
  /** Saída do código corrigido. */
  saidaCorrigida: string;
  /** Por onde começar a investigar, sem entregar a resposta. */
  dica: string;
  /** Por que acontece e como evitar, de 1 a 4 frases. */
  explicacao: string;
}

export interface IaNaPratica {
  /** Para que a IA serve neste assunto, um parágrafo curto. */
  uso: string;
  /** Um pedido de exemplo, pronto para copiar e adaptar. */
  pedido: string;
  /** Erros que assistentes de IA costumam cometer neste assunto, uma frase cada. */
  erros: string[];
  /** Como conferir o que a IA entregou, uma frase cada. */
  conferir: string[];
}

export interface Recurso {
  titulo: string;
  url: string;
  /**
   * documentacao: fonte oficial (Javadoc, JLS, JEP, Oracle, docs do framework)
   * artigo / tutorial: texto de terceiros (Baeldung, dev.java, blogs)
   * video: um vídeo ou playlist específica
   * livro: livro, com o capítulo ou seção em `onde`
   * ferramenta / simulado / curso: algo para praticar
   */
  tipo: 'documentacao' | 'tutorial' | 'livro' | 'simulado' | 'video' | 'artigo' | 'ferramenta' | 'curso';
  /** Por que vale a pena, uma frase. */
  porque: string;
  gratuito: boolean;
  /** Idioma do material. */
  idioma: 'pt' | 'en';
  /** Onde exatamente: capítulo, seção, aula da playlist, minuto. */
  onde?: string;
  /** base: para entender o assunto. fundo: para quem quer ir além do que a prova cobra. */
  nivel?: 'base' | 'fundo';
}

export interface Desafio {
  titulo: string;
  enunciado: string;
  dicas: string[];
  /** Programa Java completo com a solução. Compilado pelo verify. */
  solucao: string;
  /** Saída esperada da solução (verificada). */
  saida?: string;
  /** Comentários sobre a solução, em Markdown. */
  comentarios: string;
}

/* ------------------------------------------------------------------ */
/* Exercícios                                                          */
/* ------------------------------------------------------------------ */

/**
 * Como o verify confere a questão rodando o Java de verdade.
 *
 * - saida: o código roda; a opção correta (sem crases) é exatamente a saída.
 *   Nenhuma opção errada pode ser igual à saída.
 * - naoCompila: o código NÃO compila. Se `linha` vier, o erro tem de ser nessa
 *   linha (contada no código mostrado ao aluno, começando em 1).
 * - excecao: o código compila e lança a exceção `nome` (nome simples da
 *   classe). `saida` opcional confere o que foi impresso antes.
 * - executa: o código compila e imprime `saida` (para questões cujas opções
 *   são explicações, não saídas).
 * - opcoesCompilam: cada opção é um trecho de código; as corretas são
 *   exatamente as que compilam.
 * - opcoesNaoCompilam: cada opção é um trecho; as corretas são as que NÃO compilam.
 */
export type Verificacao =
  | { tipo: 'saida' }
  | { tipo: 'naoCompila'; linha?: number }
  | { tipo: 'excecao'; nome: string; saida?: string }
  | { tipo: 'executa'; saida: string }
  | { tipo: 'opcoesCompilam' }
  | { tipo: 'opcoesNaoCompilam' };

interface ExercicioBase {
  /** Único no site. ex.: "estagiario-t1-e01-q03" */
  id: string;
  /** Enunciado em Markdown. */
  enunciado: string;
  /** Código mostrado junto ao enunciado (Java). */
  codigo?: string;
  /** Explicação mostrada depois da resposta, em Markdown. */
  explicacao: string;
  /** Pista que ajuda sem entregar a resposta. Quem abre a dica não ganha XP na questão. */
  dica?: string;
  dificuldade: 1 | 2 | 3;
  /** Sobrescreve as provas do episódio, se a questão for mais restrita. */
  provas?: Prova[];
  /**
   * Versão do Java usada pelo verify. Se omitida, usa a menor versão entre as
   * provas da questão (829 → 17, 830 → 21, 831 → 25).
   */
  release?: 17 | 21 | 25;
  /** Código-fonte usado pelo verify no lugar de `codigo` (ex.: com imports extras). */
  codigoVerificacao?: string;
}

/** Uma alternativa correta. */
export interface ExercicioEscolha extends ExercicioBase {
  tipo: 'escolha';
  opcoes: string[];
  resposta: number;
  verificar?: Verificacao;
}

/** Várias alternativas corretas ("Escolha duas."). */
export interface ExercicioMultipla extends ExercicioBase {
  tipo: 'multipla';
  opcoes: string[];
  respostas: number[];
  verificar?: Verificacao;
}

/** O aluno digita a saída exata do programa. Sempre verificado. */
export interface ExercicioSaida extends ExercicioBase {
  tipo: 'saida';
  codigo: string;
  /** Saída exata (linhas separadas por \n). */
  resposta: string;
}

/**
 * O código tem uma lacuna `___` que o aluno preenche.
 * O verify substitui cada resposta aceita e confere a saída.
 */
export interface ExercicioLacuna extends ExercicioBase {
  tipo: 'lacuna';
  codigo: string;
  /** Respostas aceitas (comparadas sem espaços extras). A primeira é a canônica. */
  respostas: string[];
  /** Saída do programa com a lacuna preenchida. */
  saida: string;
}

/** O aluno clica na linha que não compila. Sempre verificado. */
export interface ExercicioLinha extends ExercicioBase {
  tipo: 'linha';
  codigo: string;
  /** Linha (1-based) com o único erro de compilação. */
  resposta: number;
}

export type Exercicio =
  | ExercicioEscolha
  | ExercicioMultipla
  | ExercicioSaida
  | ExercicioLacuna
  | ExercicioLinha;

/* ------------------------------------------------------------------ */
/* Vídeos do curso (Google Drive)                                      */
/* ------------------------------------------------------------------ */

export interface VideoCurso {
  /** ID do arquivo no Google Drive. */
  driveId: string;
  titulo: string;
  /** Módulo/pasta do curso, se houver. */
  modulo?: string;
  /** Duração aproximada, ex.: "12:40". */
  duracao?: string;
  /** Episódios em que o vídeo aparece como reforço. */
  episodios: string[];
}

/* ------------------------------------------------------------------ */
/* Projetos práticos                                                   */
/* ------------------------------------------------------------------ */

/** Projeto no catálogo (src/content/projetos.ts). Aparece no site antes de ser escrito, como "em breve". */
export interface ProjetoMeta {
  /** `<cargo>-p<n>`. */
  id: string;
  cargo: CargoId;
  numero: number;
  titulo: string;
  /** Glifo curto da arte procedural. */
  glifo: string;
  /** Uma frase: o que você vai construir. */
  resumo: string;
  /** O que o projeto pratica, poucas palavras cada. */
  pratica: string[];
  /** Temporadas que precisam estar concluídas para o projeto abrir. */
  requisitos: string[];
  /** Tempo estimado, como "4 a 6 horas". */
  horas: string;
  /** Ferramentas e bibliotecas usadas. */
  stack: string[];
}

export interface ProjetoConteudo {
  id: string;
  /** O pedido, em Markdown, como um chamado de empresa: contexto, regras e o que entregar. */
  briefing: string;
  /** De 4 a 7 etapas, cada uma com uma entrega que funciona sozinha. */
  etapas: EtapaProjeto[];
  /** Como mostrar o projeto no portfólio: README, GitHub e o que destacar. Markdown. */
  portfolio: string;
}

export interface EtapaProjeto {
  /** `<projeto>-s01` em diante. */
  id: string;
  titulo: string;
  /** Uma frase com o objetivo da etapa. */
  objetivo: string;
  /** Instruções em Markdown. Blocos verificados seguem as regras das aulas. */
  instrucoes: string;
  /** Critérios de aceite: o aluno marca cada um ao cumprir. De 3 a 6. */
  criterios: string[];
  /** Por onde começar, sem entregar a solução. */
  dica: string;
  /** Solução de referência em Markdown, verificada como as aulas. Abrir antes de concluir reduz o XP da etapa. */
  solucao: string;
}
