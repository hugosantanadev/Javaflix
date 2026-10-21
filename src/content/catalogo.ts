import type { CargoId, CargoMeta, EpisodioMeta, Prova, TemporadaMeta } from './types';

/**
 * Catálogo completo da trilha. Todas as temporadas aparecem no site; as que
 * ainda não têm pasta em src/content/temporadas/ aparecem como "Em breve".
 */

const TODAS: Prova[] = ['829', '830', '831'];
const J21: Prova[] = ['830', '831'];
const J25: Prova[] = ['831'];
const J17: Prova[] = ['829'];
const MERCADO: Prova[] = [];

type EpDef = [titulo: string, provas: Prova[], tags: string[]];

function temporada(
  cargo: CargoId,
  numero: number,
  titulo: string,
  glifo: string,
  sinopse: string,
  eps: EpDef[],
): TemporadaMeta {
  const id = `${cargo}-t${numero}`;
  const episodios: EpisodioMeta[] = eps.map(([t, provas, tags], i) => ({
    id: `${id}-e${String(i + 1).padStart(2, '0')}`,
    numero: i + 1,
    titulo: t,
    provas,
    tags,
  }));
  return { id, cargo, numero, titulo, glifo, sinopse, episodios };
}

export const CARGOS: CargoMeta[] = [
  {
    id: 'aprendiz',
    ordem: 0,
    titulo: 'Aprendiz',
    foco: 'Do bit ao processador, do código à máquina',
    descricao:
      'A base que quase todo curso pula. Como um computador funciona por dentro, de portas lógicas a assembly, C, compiladores e a JVM, e a matemática que aparece em todo programa. Opcional e sempre aberto: faça antes do estágio ou volte aqui quando bater a curiosidade.',
    trilha: 'base',
    cor: '#FF7EB6',
    fundo: '#1A0710',
    temporadas: [
      temporada('aprendiz', 1, 'Do bit ao processador', '01', 'Bits, bases numéricas, lógica booleana, portas lógicas, somadores, memória e o ciclo que faz a CPU executar um programa.', [
        ['Bits, bytes e bases numéricas', MERCADO, ['binário', 'binario', 'bit', 'byte', 'hexadecimal', 'base numérica', 'sistema de numeração']],
        ['Lógica booleana e portas lógicas', MERCADO, ['lógica booleana', 'porta lógica', 'portas lógicas', 'álgebra booleana', 'tabela verdade', 'and', 'xor']],
        ['Circuitos: do somador à memória', MERCADO, ['circuito', 'somador', 'flip-flop', 'registrador', 'alu', 'ula']],
        ['Como a CPU executa um programa', MERCADO, ['cpu', 'processador', 'registradores', 'memória', 'clock', 'cache', 'von neumann']],
      ]),
      temporada('aprendiz', 2, 'Do código à máquina', 'asm', 'Linguagem de máquina, assembly, C, as fases de um compilador e como a JVM transforma bytecode em código nativo.', [
        ['Linguagem de máquina e assembly', MERCADO, ['assembly', 'linguagem de máquina', 'registradores', 'x86', 'arm']],
        ['C: compilar, ligar e executar', MERCADO, ['linguagem c', 'compilador c', 'linker', 'ponteiro', 'malloc']],
        ['Compiladores por dentro', MERCADO, ['compilador', 'análise léxica', 'análise sintática', 'ast', 'otimização', 'tempo de compilação']],
        ['Interpretadores, máquinas virtuais e a JVM', MERCADO, ['jvm', 'bytecode', 'jit', 'interpretador', 'máquina virtual', 'javap']],
      ]),
      temporada('aprendiz', 3, 'Matemática para programar', '2ⁿ', 'Lógica, complemento de dois, ponto flutuante, aritmética modular, logaritmos e a matemática por trás do Big-O.', [
        ['Lógica proposicional e conjuntos', MERCADO, ['lógica', 'proposição', 'conjuntos', 'matemática discreta']],
        ['Complemento de dois e overflow', MERCADO, ['complemento de dois', 'overflow', 'número negativo', 'bit de sinal']],
        ['Ponto flutuante: IEEE 754', MERCADO, ['ponto flutuante', 'ieee 754', 'float', 'double', 'precisão']],
        ['Aritmética modular e divisão inteira', MERCADO, ['módulo', 'resto', 'aritmética modular', 'divisão inteira']],
        ['Potências, logaritmos e Big-O', MERCADO, ['logaritmo', 'potência', 'big o', 'bigo', 'complexidade']],
      ]),
      temporada('aprendiz', 4, 'Algoritmos e estruturas de dados', 'O(n)', 'Recursão, busca, ordenação, pilhas, filas, listas, árvores, hash e grafos, implementados em Java do zero.', [
        ['Algoritmos, pseudocódigo e recursão', MERCADO, ['algoritmo', 'pseudocódigo', 'recursão', 'recursividade']],
        ['Busca linear e binária', MERCADO, ['busca binária', 'busca linear', 'pesquisa']],
        ['Ordenação: bubble, insertion, merge e quick', MERCADO, ['ordenação', 'bubble sort', 'merge sort', 'quick sort', 'insertion sort']],
        ['Pilhas, filas e listas ligadas', MERCADO, ['pilha', 'fila', 'lista ligada', 'lista encadeada', 'stack', 'queue']],
        ['Árvores e tabelas hash', MERCADO, ['árvore', 'árvore binária', 'hash', 'tabela hash']],
        ['Grafos: BFS e DFS', MERCADO, ['grafo', 'bfs', 'dfs', 'busca em largura', 'busca em profundidade']],
      ]),
    ],
  },
  {
    id: 'estagiario',
    ordem: 1,
    titulo: 'Estagiário',
    foco: 'Tipos, operadores, fluxo, texto e arrays',
    descricao:
      'Seu primeiro crachá. Aqui você aprende como o Java roda e domina a base que aparece em toda questão de prova: tipos, operadores, decisões, laços, strings e arrays.',
    trilha: 'certificacao',
    cor: '#F5A524',
    fundo: '#1B1206',
    temporadas: [
      temporada('estagiario', 1, 'Primeiro dia', 'main', 'Do javac ao primeiro programa: como o Java roda, a anatomia de uma classe, os tipos primitivos e as regras de variáveis que a prova adora cobrar.', [
        ['Como o Java roda', TODAS, ['jvm', 'jdk', 'jre', 'javac', 'bytecode', 'compilar', 'instalação', 'instalar', 'introdução', 'hello world', 'main']],
        ['Anatomia de um programa', TODAS, ['classe', 'pacote', 'package', 'import', 'comentário', 'estrutura', 'main']],
        ['Tipos primitivos e literais', TODAS, ['tipos primitivos', 'primitivo', 'int', 'long', 'double', 'char', 'boolean', 'literal', 'tipos de dados']],
        ['Variáveis, var e escopo', TODAS, ['variável', 'variáveis', 'var', 'escopo', 'identificador', 'inferência', 'declaração']],
      ]),
      temporada('estagiario', 2, 'Operadores', '+=', 'Precedência, promoção numérica, casting e curto-circuito. A temporada que separa quem chuta de quem calcula a saída de cabeça.', [
        ['Aritmética e precedência', TODAS, ['operadores', 'aritmético', 'precedência', 'divisão', 'resto', 'módulo']],
        ['Incremento, decremento e atribuição composta', TODAS, ['incremento', 'decremento', '++', 'atribuição', 'operadores']],
        ['Promoção numérica e casting', TODAS, ['casting', 'cast', 'conversão', 'promoção', 'overflow']],
        ['Relacionais, lógicos e curto-circuito', TODAS, ['lógico', 'relacional', 'curto-circuito', 'boolean', 'operadores lógicos']],
        ['Ternário e operadores bit a bit', TODAS, ['ternário', 'bit a bit', 'bitwise', 'operadores']],
      ]),
      temporada('estagiario', 3, 'Decisões', 'if', 'if, else e as duas caras do switch: o clássico com fall-through e a expressão moderna com arrow e yield.', [
        ['if, else e blocos', TODAS, ['if', 'else', 'condicional', 'decisão', 'estrutura condicional']],
        ['switch clássico e fall-through', TODAS, ['switch', 'case', 'break', 'fall-through']],
        ['switch como expressão: arrow e yield', TODAS, ['switch expression', 'yield', 'arrow', 'switch']],
        ['Armadilhas de fluxo', TODAS, ['inalcançável', 'unreachable', 'fluxo', 'escopo']],
      ]),
      temporada('estagiario', 4, 'Laços', 'for', 'while, do-while, for, for-each, rótulos e break. Contar iterações sem errar é metade das questões de saída.', [
        ['while e do-while', TODAS, ['while', 'do while', 'laço', 'loop', 'repetição']],
        ['for clássico', TODAS, ['for', 'laço', 'loop', 'repetição']],
        ['for-each', TODAS, ['for each', 'foreach', 'for-each', 'iteração']],
        ['break, continue e rótulos', TODAS, ['break', 'continue', 'label', 'rótulo']],
        ['Laços aninhados e contagem', TODAS, ['aninhado', 'laço', 'loop', 'matriz']],
      ]),
      temporada('estagiario', 5, 'Texto', '"abc"', 'String imutável, StringBuilder mutável, text blocks e o pool de strings. Os métodos que caem e as pegadinhas de igualdade.', [
        ['String e imutabilidade', TODAS, ['string', 'imutável', 'texto']],
        ['Métodos de String', TODAS, ['string', 'substring', 'indexof', 'métodos de string']],
        ['StringBuilder', TODAS, ['stringbuilder', 'string builder', 'append']],
        ['Text blocks', TODAS, ['text block', 'bloco de texto', 'string']],
        ['Igualdade de strings e o pool', TODAS, ['equals', 'string pool', 'comparação', '==']],
      ]),
      temporada('estagiario', 6, 'Arrays e Math', '[ ]', 'Arrays de uma e mais dimensões, a classe Arrays, wrappers, autoboxing e a API Math.', [
        ['Arrays: declarar, criar e acessar', TODAS, ['array', 'vetor', 'arrays']],
        ['Arrays multidimensionais', TODAS, ['matriz', 'multidimensional', 'array']],
        ['A classe Arrays', TODAS, ['arrays.sort', 'binarysearch', 'arrays', 'ordenação']],
        ['Wrappers, autoboxing e Math', TODAS, ['wrapper', 'autoboxing', 'integer', 'math', 'boxing']],
      ]),
    ],
  },
  {
    id: 'junior',
    ordem: 2,
    titulo: 'Desenvolvedor Júnior',
    foco: 'Orientação a objetos, records, sealed e pattern matching',
    descricao:
      'Promovido. Agora o código vira objeto: construtores, herança, polimorfismo, interfaces, enums e o Java moderno com records, tipos sealed e pattern matching.',
    trilha: 'certificacao',
    cor: '#2FD3A0',
    fundo: '#061813',
    temporadas: [
      temporada('junior', 1, 'Classes e objetos', 'new', 'Referências, construtores, membros static, ordem de inicialização e modificadores de acesso.', [
        ['Classes, objetos e referências', TODAS, ['classe', 'objeto', 'referência', 'orientação a objetos', 'poo']],
        ['Construtores e this', TODAS, ['construtor', 'this', 'construtores']],
        ['Ciclo de vida e garbage collector', TODAS, ['garbage collector', 'gc', 'coleta de lixo', 'ciclo de vida']],
        ['Membros static', TODAS, ['static', 'estático']],
        ['Inicializadores e ordem de execução', TODAS, ['inicializador', 'bloco static', 'ordem de inicialização']],
        ['Pacotes e modificadores de acesso', TODAS, ['modificador de acesso', 'private', 'protected', 'public', 'pacote']],
      ]),
      temporada('junior', 2, 'Métodos', '( )', 'Passagem por valor, sobrecarga, varargs, encapsulamento, imutabilidade e classes aninhadas.', [
        ['Passagem por valor', TODAS, ['passagem por valor', 'parâmetro', 'método']],
        ['Sobrecarga e resolução de métodos', TODAS, ['sobrecarga', 'overload', 'método']],
        ['Varargs', TODAS, ['varargs', 'argumentos variáveis']],
        ['Encapsulamento e objetos imutáveis', TODAS, ['encapsulamento', 'getter', 'setter', 'imutável']],
        ['Classes aninhadas e anônimas', TODAS, ['classe interna', 'inner class', 'anônima', 'aninhada']],
      ]),
      temporada('junior', 3, 'Herança e polimorfismo', 'super', 'extends, super, sobrescrita, casting, instanceof, classes abstratas e os métodos de Object.', [
        ['extends e super', TODAS, ['herança', 'extends', 'super']],
        ['Regras de sobrescrita', TODAS, ['sobrescrita', 'override', '@override']],
        ['Polimorfismo', TODAS, ['polimorfismo']],
        ['Casting e instanceof', TODAS, ['casting', 'instanceof', 'cast']],
        ['Classes abstratas', TODAS, ['abstrata', 'abstract']],
        ['equals, hashCode e toString', TODAS, ['equals', 'hashcode', 'tostring', 'object']],
      ]),
      temporada('junior', 4, 'Interfaces e enums', 'enum', 'Interfaces com métodos default, static e private, interfaces funcionais e enums com estado e comportamento.', [
        ['Interfaces e seus métodos', TODAS, ['interface', 'default', 'interfaces']],
        ['Interfaces funcionais', TODAS, ['interface funcional', 'functionalinterface']],
        ['Conflitos de métodos default', TODAS, ['default', 'herança múltipla', 'interface']],
        ['Enums', TODAS, ['enum', 'enumeração']],
        ['Enums com campos e métodos', TODAS, ['enum', 'enumeração']],
      ]),
      temporada('junior', 5, 'Java moderno', 'record', 'Records, tipos sealed, pattern matching com instanceof e switch, e record patterns.', [
        ['Records', TODAS, ['record', 'records']],
        ['Records: construtor compacto e customização', TODAS, ['record', 'construtor compacto']],
        ['Classes e interfaces sealed', TODAS, ['sealed', 'permits', 'selada']],
        ['Pattern matching com instanceof', TODAS, ['pattern matching', 'instanceof']],
        ['Pattern matching em switch e record patterns', J21, ['pattern matching', 'switch', 'record pattern']],
      ]),
    ],
  },
  {
    id: 'pleno',
    ordem: 3,
    titulo: 'Desenvolvedor Pleno',
    foco: 'Exceções, generics, coleções, datas, lambdas e streams',
    descricao:
      'Você já entrega sozinho. Hora de dominar o que todo sistema real usa: exceções, generics, coleções, a API de datas, lambdas e streams.',
    trilha: 'certificacao',
    cor: '#5B8CFF',
    fundo: '#070D20',
    temporadas: [
      temporada('pleno', 1, 'Exceções', 'throw', 'Checked, unchecked, try-with-resources, multi-catch, exceções suprimidas e customizadas.', [
        ['Hierarquia de exceções', TODAS, ['exceção', 'exception', 'checked', 'unchecked', 'error']],
        ['try, catch e finally', TODAS, ['try', 'catch', 'finally', 'exceção']],
        ['Multi-catch e relançamento', TODAS, ['multi-catch', 'catch', 'throw']],
        ['try-with-resources e suprimidas', TODAS, ['try-with-resources', 'autocloseable', 'suppressed']],
        ['Exceções customizadas', TODAS, ['exceção personalizada', 'custom exception', 'exceção']],
        ['Exceções e sobrescrita', TODAS, ['throws', 'sobrescrita', 'exceção']],
      ]),
      temporada('pleno', 2, 'Generics', '<T>', 'Classes e métodos genéricos, type erasure, wildcards e limites.', [
        ['Classes e interfaces genéricas', TODAS, ['generics', 'genérico', 'tipo genérico']],
        ['Métodos genéricos e inferência', TODAS, ['generics', 'método genérico']],
        ['Type erasure', TODAS, ['type erasure', 'generics']],
        ['Wildcards: extends e super', TODAS, ['wildcard', 'extends', 'super', 'generics']],
        ['Limites e PECS na prática', TODAS, ['bounded', 'pecs', 'generics']],
      ]),
      temporada('pleno', 3, 'Coleções', 'List', 'List, Set, Map, Deque, ordenação com Comparator e as sequenced collections do Java 21.', [
        ['List: ArrayList, LinkedList e List.of', TODAS, ['list', 'arraylist', 'linkedlist', 'coleções', 'collections']],
        ['Set: HashSet, LinkedHashSet e TreeSet', TODAS, ['set', 'hashset', 'treeset', 'coleções']],
        ['Map e seus métodos modernos', TODAS, ['map', 'hashmap', 'treemap', 'coleções']],
        ['Queue e Deque', TODAS, ['queue', 'deque', 'fila', 'pilha', 'arraydeque']],
        ['Comparable e Comparator', TODAS, ['comparable', 'comparator', 'ordenação', 'sort']],
        ['Sequenced collections', J21, ['sequenced', 'coleções', 'java 21']],
        ['Imutabilidade e utilitários', TODAS, ['collections', 'imutável', 'unmodifiable', 'list.of']],
      ]),
      temporada('pleno', 4, 'Datas e horas', 'now()', 'LocalDate, Period, Duration, Instant, fusos, horário de verão e formatação.', [
        ['LocalDate, LocalTime e LocalDateTime', TODAS, ['localdate', 'data', 'hora', 'date time', 'datas']],
        ['Period e Duration', TODAS, ['period', 'duration', 'datas']],
        ['Instant, ZonedDateTime e fusos', TODAS, ['instant', 'zoneddatetime', 'fuso', 'timezone']],
        ['Horário de verão na prática', TODAS, ['horário de verão', 'dst', 'fuso']],
        ['Formatando e convertendo datas', TODAS, ['datetimeformatter', 'formatar data', 'datas']],
      ]),
      temporada('pleno', 5, 'Lambdas', '->', 'Sintaxe, interfaces funcionais, method references, effectively final e composição.', [
        ['Sintaxe de lambdas', TODAS, ['lambda', 'expressão lambda']],
        ['Interfaces de java.util.function', TODAS, ['predicate', 'function', 'consumer', 'supplier', 'lambda']],
        ['Method references', TODAS, ['method reference', 'referência de método', '::']],
        ['Escopo e effectively final', TODAS, ['effectively final', 'lambda', 'escopo']],
        ['Compondo funções', TODAS, ['andthen', 'compose', 'lambda']],
      ]),
      temporada('pleno', 6, 'Streams', '.map()', 'Criar, transformar, reduzir, agrupar e particionar dados, de streams simples a paralelos.', [
        ['Criando streams e operações intermediárias', TODAS, ['stream', 'streams', 'filter', 'map']],
        ['Operações terminais e reduce', TODAS, ['stream', 'reduce', 'collect']],
        ['Optional', TODAS, ['optional']],
        ['Streams primitivos', TODAS, ['intstream', 'stream', 'primitivo']],
        ['Collectors: agrupar, particionar e mapear', TODAS, ['collectors', 'groupingby', 'partitioningby', 'stream']],
        ['flatMap, paralelos e gatherers', TODAS, ['flatmap', 'parallel', 'stream', 'gatherer']],
      ]),
    ],
  },
  {
    id: 'senior',
    ordem: 4,
    titulo: 'Desenvolvedor Sênior',
    foco: 'Concorrência, entrada e saída, módulos e localização',
    descricao:
      'O último degrau antes da prova. Threads de plataforma e virtuais, código thread-safe, I/O e NIO.2, o sistema de módulos e localização.',
    trilha: 'certificacao',
    cor: '#FF5D4A',
    fundo: '#1E0806',
    temporadas: [
      temporada('senior', 1, 'Threads', 'run()', 'Threads de plataforma e virtuais, Runnable, Callable, executores e o ciclo de vida.', [
        ['Threads e Runnable', TODAS, ['thread', 'runnable', 'concorrência']],
        ['Ciclo de vida: sleep, join e interrupt', TODAS, ['thread', 'sleep', 'join', 'interrupt']],
        ['ExecutorService, Callable e Future', TODAS, ['executor', 'callable', 'future', 'executorservice']],
        ['Agendamento, invokeAll e invokeAny', TODAS, ['scheduled', 'invokeall', 'executor']],
        ['Threads virtuais', J21, ['virtual thread', 'thread virtual', 'loom']],
        ['Scoped values e concorrência estruturada', J25, ['scoped value', 'structured concurrency', 'concorrência estruturada']],
      ]),
      temporada('senior', 2, 'Código thread-safe', 'lock', 'synchronized, atômicos, locks, coleções concorrentes e os problemas clássicos de concorrência.', [
        ['Condição de corrida e synchronized', TODAS, ['synchronized', 'race condition', 'concorrência']],
        ['Classes atômicas e volatile', TODAS, ['atomic', 'atomicinteger', 'volatile']],
        ['ReentrantLock e ReadWriteLock', TODAS, ['lock', 'reentrantlock']],
        ['Coleções concorrentes', TODAS, ['concurrenthashmap', 'copyonwrite', 'concorrência']],
        ['Deadlock, livelock e starvation', TODAS, ['deadlock', 'livelock', 'starvation']],
        ['Streams paralelos', TODAS, ['parallel stream', 'paralelo', 'stream']],
      ]),
      temporada('senior', 3, 'Entrada e saída', '/io', 'java.io, serialização e NIO.2 com Path e Files.', [
        ['Streams de I/O: bytes e caracteres', TODAS, ['inputstream', 'outputstream', 'reader', 'writer', 'arquivo']],
        ['Console e I/O bufferizado', TODAS, ['bufferedreader', 'console', 'scanner']],
        ['Serialização', TODAS, ['serializable', 'serialização', 'transient']],
        ['Path: resolver, normalizar e relativizar', TODAS, ['path', 'nio', 'paths']],
        ['Files: ler, escrever, copiar e mover', TODAS, ['files', 'nio', 'arquivo']],
        ['Percorrer diretórios e atributos', TODAS, ['files.walk', 'diretório', 'atributos']],
      ]),
      temporada('senior', 4, 'Módulos', 'module', 'module-info, exports, requires, serviços, jlink e migração para módulos.', [
        ['module-info, requires e exports', TODAS, ['módulo', 'module', 'jpms', 'module-info']],
        ['requires transitive, opens e reflexão', TODAS, ['módulo', 'opens', 'reflexão']],
        ['Serviços e ServiceLoader', TODAS, ['serviceloader', 'provides', 'uses', 'módulo']],
        ['jar modular, jdeps e jlink', TODAS, ['jlink', 'jdeps', 'jar']],
        ['Migração: unnamed e automatic modules', TODAS, ['automatic module', 'unnamed module', 'migração']],
      ]),
      temporada('senior', 5, 'Localização e JDBC', 'pt_BR', 'Locale, resource bundles, formatação de números, moedas, datas e mensagens. JDBC para quem vai de 1Z0-829.', [
        ['Locale e resource bundles', TODAS, ['locale', 'resourcebundle', 'internacionalização', 'i18n']],
        ['Números, moeda e percentual', TODAS, ['numberformat', 'moeda', 'formatação']],
        ['Datas, mensagens e MessageFormat', TODAS, ['messageformat', 'formatação', 'locale']],
        ['JDBC: conexão e consultas', J17, ['jdbc', 'banco de dados', 'connection', 'resultset']],
        ['JDBC: PreparedStatement e transações', J17, ['jdbc', 'preparedstatement', 'transação']],
      ]),
    ],
  },
  {
    id: 'reta-final',
    ordem: 5,
    titulo: 'Reta final',
    foco: 'Simulados de 50 questões no tempo da prova',
    descricao:
      'Simulados com o formato real: 50 questões, enunciados longos, de 5 a 8 alternativas e o relógio da prova escolhida. Passou com 68%, está pronto.',
    trilha: 'certificacao',
    cor: '#E8C766',
    fundo: '#15120A',
    temporadas: [],
  },
  {
    id: 'backend-junior',
    ordem: 6,
    titulo: 'Backend Júnior',
    foco: 'Git, HTTP, SQL, Spring Boot, JPA, testes e IA no dia a dia',
    descricao:
      'Certificado na mão, agora o mercado. O que as vagas de backend Java pedem primeiro: Git, HTTP, SQL, Spring Boot, JPA e testes, uma API de verdade e como trabalhar com assistentes de IA sem confiar às cegas.',
    trilha: 'mercado',
    cor: '#A8E05F',
    fundo: '#0E1505',
    temporadas: [
      temporada('backend-junior', 1, 'Ferramentas do dia a dia', 'git', 'Terminal, Git, GitHub, pull requests, Maven e Gradle.', [
        ['Terminal e Git básico', MERCADO, ['git', 'terminal', 'commit']],
        ['Branches, merge e conflitos', MERCADO, ['git', 'branch', 'merge', 'conflito']],
        ['Rebase e histórico limpo', MERCADO, ['git', 'rebase']],
        ['GitHub, pull requests e code review', MERCADO, ['github', 'pull request', 'code review']],
        ['Maven e Gradle', MERCADO, ['maven', 'gradle', 'build', 'dependências']],
      ]),
      temporada('backend-junior', 2, 'HTTP e APIs', '200', 'Métodos, status, REST, JSON e o HttpClient do Java.', [
        ['HTTP: métodos, status e headers', MERCADO, ['http', 'status', 'headers', 'web']],
        ['Desenhando APIs REST', MERCADO, ['rest', 'api', 'restful']],
        ['JSON e Jackson', MERCADO, ['json', 'jackson']],
        ['HttpClient do Java', MERCADO, ['httpclient', 'http', 'requisição']],
        ['curl, Postman e OpenAPI', MERCADO, ['postman', 'curl', 'openapi', 'swagger']],
      ]),
      temporada('backend-junior', 3, 'SQL', 'JOIN', 'Consultas, JOINs, agregações, modelagem, índices e transações.', [
        ['SELECT, filtros e ordenação', MERCADO, ['sql', 'select', 'banco de dados']],
        ['JOINs', MERCADO, ['join', 'sql']],
        ['GROUP BY e HAVING', MERCADO, ['group by', 'sql', 'agregação']],
        ['Modelagem, chaves e índices', MERCADO, ['modelagem', 'índice', 'chave primária', 'sql']],
        ['Transações e isolamento', MERCADO, ['transação', 'isolamento', 'acid']],
      ]),
      temporada('backend-junior', 4, 'Spring Boot', '@Bean', 'Injeção de dependências, controllers REST, validação, erros e profiles.', [
        ['Inversão de controle e injeção de dependências', MERCADO, ['spring', 'injeção de dependência', 'ioc', 'bean']],
        ['Seu primeiro projeto Spring Boot', MERCADO, ['spring boot', 'spring initializr']],
        ['Controllers REST', MERCADO, ['controller', 'restcontroller', 'spring']],
        ['Validação e tratamento de erros', MERCADO, ['validation', 'validação', 'exception handler', 'spring']],
        ['Configuração e profiles', MERCADO, ['application.properties', 'profile', 'spring']],
      ]),
      temporada('backend-junior', 5, 'Persistência com JPA', '@Id', 'Entidades, Spring Data, relacionamentos, N+1 e migrations.', [
        ['Entidades e mapeamento', MERCADO, ['jpa', 'entity', 'hibernate']],
        ['Spring Data JPA', MERCADO, ['spring data', 'repository', 'jpa']],
        ['Relacionamentos', MERCADO, ['onetomany', 'manytoone', 'relacionamento', 'jpa']],
        ['N+1, fetch e performance', MERCADO, ['n+1', 'fetch', 'lazy', 'jpa']],
        ['Migrations com Flyway', MERCADO, ['flyway', 'migration']],
      ]),
      temporada('backend-junior', 6, 'Testes', '@Test', 'JUnit, AssertJ, Mockito, testes de integração e Testcontainers.', [
        ['JUnit: anatomia de um teste', MERCADO, ['junit', 'teste', 'teste unitário']],
        ['Asserções com AssertJ', MERCADO, ['assertj', 'teste']],
        ['Mocks com Mockito', MERCADO, ['mockito', 'mock', 'teste']],
        ['Testes de integração com Spring', MERCADO, ['springboottest', 'mockmvc', 'teste de integração']],
        ['Testcontainers', MERCADO, ['testcontainers', 'teste']],
      ]),
      temporada('backend-junior', 7, 'Projeto: API de pedidos', 'POST', 'Uma API completa do zero, com camadas, persistência, testes e documentação.', [
        ['Planejando a API', MERCADO, ['projeto', 'api']],
        ['Camadas e DTOs', MERCADO, ['dto', 'camadas', 'service']],
        ['Persistência e migrations', MERCADO, ['jpa', 'flyway', 'projeto']],
        ['Cobertura de testes', MERCADO, ['teste', 'projeto']],
        ['Documentação e entrega', MERCADO, ['openapi', 'deploy', 'projeto']],
      ]),
      temporada('backend-junior', 8, 'IA para desenvolvedores', 'LLM', 'Como os modelos de linguagem funcionam e como usá-los para escrever, revisar e testar código, sem confiar às cegas.', [
        ['Como um modelo de linguagem funciona', MERCADO, ['ia', 'llm', 'token', 'contexto', 'alucinação']],
        ['Engenharia de prompt: pedindo do jeito certo', MERCADO, ['engenharia de prompt', 'prompt', 'segurança', 'manutenção', 'ia']],
        ['Programando com um assistente de IA', MERCADO, ['assistente de código', 'agente', 'ia']],
        ['Revisar, testar e conferir código gerado', MERCADO, ['revisão de código', 'teste', 'ia']],
        ['Riscos: dados, licenças e segurança', MERCADO, ['segurança', 'prompt injection', 'privacidade', 'ia']],
      ]),
    ],
  },
  {
    id: 'backend-pleno',
    ordem: 7,
    titulo: 'Backend Pleno',
    foco: 'Segurança, Docker, CI/CD, mensageria, cache, observabilidade, system design e IA',
    descricao:
      'O sistema já está em produção e precisa aguentar o tranco. Segurança, containers, pipelines, filas, cache, métricas, arquitetura, como projetar um sistema do zero e como pôr IA dentro dele.',
    trilha: 'mercado',
    cor: '#33C7E6',
    fundo: '#03141A',
    temporadas: [
      temporada('backend-pleno', 1, 'Segurança', '401', 'Spring Security, JWT, OAuth2, autorização e OWASP.', [
        ['Spring Security por dentro', MERCADO, ['spring security', 'segurança', 'autenticação']],
        ['JWT e OAuth2 Resource Server', MERCADO, ['jwt', 'oauth2', 'token']],
        ['Autorização por papéis e escopos', MERCADO, ['autorização', 'roles', 'spring security']],
        ['OWASP Top 10 para APIs', MERCADO, ['owasp', 'segurança']],
      ]),
      temporada('backend-pleno', 2, 'Docker', 'FROM', 'Imagens, Dockerfile para Java, Compose e a JVM dentro do container.', [
        ['Imagens e containers', MERCADO, ['docker', 'container', 'imagem']],
        ['Dockerfile para Java', MERCADO, ['dockerfile', 'docker']],
        ['Docker Compose', MERCADO, ['docker compose', 'compose']],
        ['JVM em container', MERCADO, ['docker', 'jvm', 'memória']],
      ]),
      temporada('backend-pleno', 3, 'CI/CD', 'CI', 'GitHub Actions, pipelines de qualidade e deploy contínuo.', [
        ['GitHub Actions', MERCADO, ['github actions', 'ci', 'pipeline']],
        ['Pipeline de build, testes e qualidade', MERCADO, ['pipeline', 'ci', 'sonar']],
        ['Versionamento e deploy contínuo', MERCADO, ['deploy', 'cd', 'versionamento']],
      ]),
      temporada('backend-pleno', 4, 'Mensageria', 'topic', 'Comunicação assíncrona com RabbitMQ e Kafka.', [
        ['Por que mensageria', MERCADO, ['mensageria', 'fila', 'assíncrono']],
        ['RabbitMQ', MERCADO, ['rabbitmq', 'fila']],
        ['Kafka: tópicos, partições e consumer groups', MERCADO, ['kafka', 'tópico']],
        ['Spring Kafka e idempotência', MERCADO, ['kafka', 'spring kafka', 'idempotência']],
      ]),
      temporada('backend-pleno', 5, 'Cache', 'TTL', 'Estratégias de cache, Redis e invalidação.', [
        ['Estratégias de cache', MERCADO, ['cache']],
        ['Redis', MERCADO, ['redis', 'cache']],
        ['Spring Cache e invalidação', MERCADO, ['spring cache', 'cacheable', 'cache']],
      ]),
      temporada('backend-pleno', 6, 'Observabilidade', 'p99', 'Logs estruturados, métricas, tracing distribuído e health checks.', [
        ['Logs estruturados', MERCADO, ['log', 'logging', 'slf4j']],
        ['Métricas com Micrometer e Prometheus', MERCADO, ['micrometer', 'prometheus', 'métricas']],
        ['Tracing com OpenTelemetry', MERCADO, ['opentelemetry', 'tracing']],
        ['Actuator e health checks', MERCADO, ['actuator', 'health check']],
      ]),
      temporada('backend-pleno', 7, 'Arquitetura', 'SOLID', 'Camadas, hexagonal, DDD, SOLID, padrões de projeto e refatoração.', [
        ['Camadas, hexagonal e clean architecture', MERCADO, ['arquitetura', 'hexagonal', 'clean architecture']],
        ['DDD na prática', MERCADO, ['ddd', 'domain driven design']],
        ['SOLID e padrões de projeto', MERCADO, ['solid', 'design pattern', 'padrões de projeto']],
        ['Refatoração e código limpo', MERCADO, ['refatoração', 'clean code', 'código limpo']],
      ]),
      temporada('backend-pleno', 8, 'System design', 'QPS', 'Estimativas de capacidade, escala horizontal, dados distribuídos e dois sistemas projetados do zero.', [
        ['Requisitos e estimativas de capacidade', MERCADO, ['system design', 'estimativa', 'capacidade', 'qps']],
        ['Escala horizontal e balanceamento de carga', MERCADO, ['escalabilidade', 'load balancer', 'balanceamento de carga']],
        ['Replicação, particionamento e o teorema CAP', MERCADO, ['replicação', 'sharding', 'particionamento', 'cap']],
        ['Projeto: um encurtador de links', MERCADO, ['system design', 'encurtador de links', 'url shortener']],
        ['Projeto: o checkout da loja', MERCADO, ['system design', 'checkout', 'pagamento']],
      ]),
      temporada('backend-pleno', 9, 'IA no backend Java', 'RAG', 'Modelos de linguagem dentro da aplicação: Spring AI, ferramentas, embeddings, RAG, custo e avaliação.', [
        ['Chamando um modelo de linguagem por API', MERCADO, ['llm', 'api', 'ia']],
        ['Spring AI: ChatClient e respostas estruturadas', MERCADO, ['spring ai', 'chatclient', 'ia']],
        ['Ferramentas: tool calling e MCP', MERCADO, ['tool calling', 'function calling', 'mcp', 'ia']],
        ['Embeddings, busca vetorial e RAG', MERCADO, ['embeddings', 'rag', 'banco vetorial', 'pgvector']],
        ['Custo, latência, avaliação e segurança', MERCADO, ['avaliação', 'custo', 'prompt injection', 'ia']],
      ]),
    ],
  },
  {
    id: 'backend-senior',
    ordem: 8,
    titulo: 'Backend Sênior',
    foco: 'Microsserviços, resiliência, AWS, Kubernetes, JVM e entrevistas',
    descricao:
      'Você decide a arquitetura. Microsserviços, resiliência, nuvem, Kubernetes, a JVM por dentro e como passar nas entrevistas de sênior.',
    trilha: 'mercado',
    cor: '#E4E4E7',
    fundo: '#101012',
    temporadas: [
      temporada('backend-senior', 1, 'Microsserviços', 'RPC', 'Quando quebrar o monolito, como os serviços conversam e como manter consistência.', [
        ['Monolito, modular ou microsserviços', MERCADO, ['microsserviços', 'monolito', 'arquitetura']],
        ['Comunicação síncrona e assíncrona', MERCADO, ['microsserviços', 'rest', 'mensageria']],
        ['API gateway e service discovery', MERCADO, ['api gateway', 'service discovery']],
        ['Sagas e consistência eventual', MERCADO, ['saga', 'consistência eventual']],
      ]),
      temporada('backend-senior', 2, 'Resiliência', 'retry', 'Timeouts, retries, circuit breaker, rate limiting e outbox.', [
        ['Timeouts e retries', MERCADO, ['timeout', 'retry', 'resiliência']],
        ['Circuit breaker com Resilience4j', MERCADO, ['circuit breaker', 'resilience4j']],
        ['Rate limiting e bulkhead', MERCADO, ['rate limit', 'bulkhead']],
        ['Idempotência e outbox', MERCADO, ['idempotência', 'outbox']],
      ]),
      temporada('backend-senior', 3, 'AWS', 's3://', 'Os serviços da AWS que aparecem nas vagas e quanto eles custam.', [
        ['IAM, regiões e VPC', MERCADO, ['aws', 'iam', 'vpc']],
        ['EC2, ECS e Lambda', MERCADO, ['ec2', 'ecs', 'lambda', 'aws']],
        ['S3, RDS e DynamoDB', MERCADO, ['s3', 'rds', 'dynamodb', 'aws']],
        ['SQS, SNS e custos', MERCADO, ['sqs', 'sns', 'aws']],
      ]),
      temporada('backend-senior', 4, 'Kubernetes', 'pod', 'Pods, deployments, configuração, probes e Helm.', [
        ['Pods, deployments e services', MERCADO, ['kubernetes', 'k8s', 'pod']],
        ['ConfigMaps e Secrets', MERCADO, ['configmap', 'secret', 'kubernetes']],
        ['Probes, recursos e autoscaling', MERCADO, ['probe', 'hpa', 'kubernetes']],
        ['Helm e estratégias de deploy', MERCADO, ['helm', 'deploy', 'kubernetes']],
      ]),
      temporada('backend-senior', 5, 'JVM por dentro', 'GC', 'Memória, coletores, profiling com JFR e diagnóstico em produção.', [
        ['Memória: heap, stack e metaspace', MERCADO, ['jvm', 'heap', 'memória']],
        ['Garbage collectors: G1 e ZGC', MERCADO, ['garbage collector', 'g1', 'zgc']],
        ['Profiling com JFR', MERCADO, ['jfr', 'profiling', 'flight recorder']],
        ['Heap dump e thread dump', MERCADO, ['heap dump', 'thread dump', 'diagnóstico']],
      ]),
      temporada('backend-senior', 6, 'Entrevistas', 'hire()', 'System design, live coding, entrevista comportamental e negociação.', [
        ['System design', MERCADO, ['system design', 'entrevista']],
        ['Live coding', MERCADO, ['live coding', 'algoritmos', 'entrevista']],
        ['Entrevista comportamental', MERCADO, ['comportamental', 'entrevista', 'star']],
        ['Carreira e negociação', MERCADO, ['carreira', 'salário', 'negociação']],
      ]),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Índices                                                             */
/* ------------------------------------------------------------------ */

export const TEMPORADAS: TemporadaMeta[] = CARGOS.flatMap((c) => c.temporadas);
export const EPISODIOS: EpisodioMeta[] = TEMPORADAS.flatMap((t) => t.episodios);

const cargoPorId = new Map(CARGOS.map((c) => [c.id, c]));
const temporadaPorId = new Map(TEMPORADAS.map((t) => [t.id, t]));
const episodioPorId = new Map(EPISODIOS.map((e) => [e.id, e]));
const temporadaDoEpisodio = new Map(TEMPORADAS.flatMap((t) => t.episodios.map((e) => [e.id, t] as const)));

export const getCargo = (id: string) => cargoPorId.get(id as CargoId);
export const getTemporada = (id: string) => temporadaPorId.get(id);
export const getEpisodio = (id: string) => episodioPorId.get(id);
export const getTemporadaDoEpisodio = (episodioId: string) => temporadaDoEpisodio.get(episodioId);

/** Provas cobertas por uma temporada (união das provas dos episódios). */
export function provasDaTemporada(t: TemporadaMeta): Prova[] {
  const s = new Set<Prova>();
  t.episodios.forEach((e) => e.provas.forEach((p) => s.add(p)));
  return (['829', '830', '831'] as Prova[]).filter((p) => s.has(p));
}
