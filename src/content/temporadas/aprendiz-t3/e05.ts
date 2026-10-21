import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t3-e05',
  minutos: 15,
  aula,
  armadilhas: [
    'Big-O é limite superior: n log n também é O(n²), embora O(n log n) diga mais.',
    'A base do logaritmo não importa em Big-O: log₂ n e log₁₀ n diferem por uma constante.',
    '`Math.log(1000) / Math.log(10)` dá 2,9999999999999996. Para log₂ de inteiros, use `31 - Integer.numberOfLeadingZeros(n)`.',
    'Laços em sequência somam (fica o maior); laços aninhados multiplicam.',
    'Um laço em que `i` dobra (`i *= 2`) roda log n vezes, não n.',
    '`ArrayList.contains` é O(n). Dentro de um laço, vira O(n²).',
    '`HashMap` é O(1) **em média**; o pior caso depende das colisões.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de ArrayList',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html',
      tipo: 'documentacao',
      porque: 'A documentação diz o custo de cada operação, incluindo o "amortized constant time" do `add`.',
      gratuito: true,
      idioma: 'en',
      onde: 'Terceiro parágrafo da introdução da classe',
    },
    {
      titulo: 'Javadoc de HashMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html',
      tipo: 'documentacao',
      porque: 'Por que `get` e `put` são de tempo constante, e como a capacidade e o fator de carga afetam o desempenho.',
      gratuito: true,
      idioma: 'en',
      onde: 'Introdução da classe, parágrafos sobre desempenho',
    },
    {
      titulo: 'Javadoc de TreeMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeMap.html',
      tipo: 'documentacao',
      porque: 'A garantia de log(n) para `get`, `put` e `remove`, e a citação ao livro de algoritmos em que a implementação se baseia.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Integer.numberOfLeadingZeros',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#numberOfLeadingZeros(int)',
      tipo: 'documentacao',
      porque: 'A documentação mostra como calcular ⌊log₂ x⌋ e ⌈log₂ x⌉ com esse método, sem ponto flutuante.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'freeCodeCamp: Notação Big O explicada com exemplos',
      url: 'https://www.freecodecamp.org/portuguese/news/notacao-big-o-explicada-com-exemplos/',
      tipo: 'artigo',
      porque: 'As classes de complexidade com exemplos de código e gráficos de crescimento, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Grande-O',
      url: 'https://pt.wikipedia.org/wiki/Grande-O',
      tipo: 'artigo',
      porque: 'A definição formal, as notações Ω e Θ, e a tabela das ordens mais comuns.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Algorithms, 4th Edition: Analysis of Algorithms (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/14analysis/',
      tipo: 'tutorial',
      porque: 'O site do livro de Princeton, com exemplos em Java: modelos de custo, notação til e experimentos de dobrar o n.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 1.4 "Analysis of Algorithms"',
      nivel: 'fundo',
    },
    {
      titulo: 'Big-O Algorithm Complexity Cheat Sheet',
      url: 'https://www.bigocheatsheet.com/',
      tipo: 'ferramenta',
      porque: 'Tabelas de complexidade das estruturas de dados e algoritmos de ordenação mais conhecidos, numa página só.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Bóson Treinamentos: O que é a Notação Big O em Algoritmos',
      url: 'https://www.youtube.com/watch?v=JTIpS1WlgXg',
      tipo: 'video',
      porque: 'Introdução em português à notação e às classes de complexidade.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'HackerRank: Big O Notation (Gayle Laakmann McDowell)',
      url: 'https://www.youtube.com/watch?v=v4cd1O4zkGw',
      tipo: 'video',
      porque: 'A autora de "Cracking the Coding Interview" explica as regras práticas: descartar constantes, termos dominantes e entradas diferentes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crash Course Computer Science #13: Intro to Algorithms',
      url: 'https://www.youtube.com/watch?v=rL8X2mlNHPM',
      tipo: 'video',
      porque: 'Ordenação, busca e por que n² e n log n fazem diferença, com animações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Entendendo Algoritmos (Aditya Bhargava)',
      url: 'https://novatec.com.br/livros/entendendo-algoritmos/',
      tipo: 'livro',
      porque: 'O livro ilustrado mais acessível sobre algoritmos, com edição em português. O primeiro capítulo é busca binária e Big-O.',
      gratuito: false,
      idioma: 'pt',
      onde: 'Cap. 1 "Introdução a algoritmos"',
    },
    {
      titulo: 'Discrete Mathematics: An Open Introduction (Oscar Levin)',
      url: 'https://discrete.openmathbooks.org/dmoi3/sec_seq-arithgeom.html',
      tipo: 'livro',
      porque: 'As somas aritméticas e geométricas que aparecem na análise de laços, com demonstrações.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 2.2 "Arithmetic and Geometric Sequences"',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Medindo o crescimento',
    enunciado:
      'Conte as operações de três algoritmos para n = 10, 100 e 1.000: a busca linear e a busca binária procurando um valor que não está no array `{0, 1, ..., n − 1}` (conte as comparações com elementos), e a contagem de todos os pares `i < j`. Imprima a tabela:\n\n```text\nn        linear   binária  pares\n10       10       4        45\n100      100      7        4950\n1000     1000     10       499500\n```',
    dicas: [
      'Procure o valor `n`, que é maior que todos os elementos: é o pior caso das duas buscas.',
      'Na busca binária, conte uma volta a cada vez que o laço `while (inicio <= fim)` executa.',
      'Os pares são dois laços: `j` começa em `i + 1`.',
      'Para alinhar: `System.out.printf("%-8d %-8d %-8d %d%n", ...)`.',
    ],
    solucao: `public class Crescimento {
    static int linear(int[] v, int alvo) {
        int comparacoes = 0;
        for (int x : v) {
            comparacoes++;
            if (x == alvo) {
                break;
            }
        }
        return comparacoes;
    }

    static int binaria(int[] v, int alvo) {
        int passos = 0;
        int inicio = 0;
        int fim = v.length - 1;
        while (inicio <= fim) {
            passos++;
            int meio = (inicio + fim) >>> 1;
            if (v[meio] == alvo) {
                break;
            }
            if (v[meio] < alvo) {
                inicio = meio + 1;
            } else {
                fim = meio - 1;
            }
        }
        return passos;
    }

    static long pares(int n) {
        long cont = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                cont++;
            }
        }
        return cont;
    }

    public static void main(String[] args) {
        System.out.println(String.format("%-8s %-8s %-8s %s", "n", "linear", "binária", "pares"));
        for (int n : new int[] {10, 100, 1000}) {
            int[] v = new int[n];
            for (int i = 0; i < n; i++) {
                v[i] = i;
            }
            System.out.printf("%-8d %-8d %-8d %d%n", n, linear(v, n), binaria(v, n), pares(n));
        }
    }
}`,
    saida: 'n        linear   binária  pares\n10       10       4        45\n100      100      7        4950\n1000     1000     10       499500',
    comentarios:
      'Cada vez que n é multiplicado por 10, a coluna linear também é multiplicada por 10, a binária ganha só cerca de 3,3 (log₂ 10) e os pares são multiplicados por 100. É Big-O medido em vez de deduzido. A coluna binária é exatamente o número de bits de n, ⌊log₂ n⌋ + 1. Experimente acrescentar n = 1.000.000: a coluna de pares passa de 499 bilhões e o programa demora visivelmente, enquanto a binária responde 20.',
  },
  exercicios: [
    {
      id: 'aprendiz-t3-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o valor aproximado de 2²⁰?',
      opcoes: ['Um milhão', 'Mil', 'Um bilhão', 'Vinte mil', 'Cem mil'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '1048576' },
      codigoVerificacao: `System.out.println(1 << 20);`,
      explicacao: '2¹⁰ = 1.024 ≈ mil, então 2²⁰ = (2¹⁰)² ≈ mil × mil = um milhão. O valor exato é 1.048.576. A regra é: 10 bits valem cerca de 3 dígitos decimais.',
    },
    {
      id: 'aprendiz-t3-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quanto é log₂ 1024?',
      opcoes: ['10', '512', '2', '100', '32'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '10' },
      codigoVerificacao: `System.out.println(31 - Integer.numberOfLeadingZeros(1024));`,
      explicacao: '2¹⁰ = 1024, então log₂ 1024 = 10. Outra leitura: dividindo 1024 ao meio 10 vezes, chega-se a 1. O 512 é 1024 ÷ 2, o primeiro corte.',
    },
    {
      id: 'aprendiz-t3-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No pior caso, quantas comparações a busca binária faz num array ordenado com um bilhão de elementos?',
      opcoes: ['Cerca de 30', 'Cerca de 1.000', 'Cerca de 500 milhões', 'Cerca de 9', 'Cerca de 1 milhão'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '30' },
      codigoVerificacao: `System.out.println(32 - Integer.numberOfLeadingZeros(1_000_000_000));`,
      explicacao: 'Cada comparação descarta metade, e 2³⁰ ≈ um bilhão: cerca de 30 cortes esgotam o array. 500 milhões seria o caso médio da busca linear; 9 é a quantidade de zeros de um bilhão.',
    },
    {
      id: 'aprendiz-t3-e05-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int a = 0;
for (int n = 1024; n > 1; n /= 2) a++;
int b = 0;
for (int i = 1; i < 1000; i *= 2) b++;
System.out.println(a);
System.out.println(b);`,
      resposta: '10\n10',
      explicacao: 'O primeiro laço divide 1024 ao meio até chegar a 1: 10 vezes. O segundo dobra `i` de 1 até passar de 1000: 1, 2, 4, ..., 512, também 10 voltas. Dividir e dobrar são os dois lados do mesmo logaritmo.',
    },
    {
      id: 'aprendiz-t3-e05-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um algoritmo faz 3n² + 100n + 7 operações. Qual é a sua complexidade em Big-O?',
      opcoes: ['O(n²)', 'O(3n²)', 'O(n² + n)', 'O(100n)', 'O(n³)'],
      resposta: 0,
      explicacao: 'Para n grande, o termo n² domina, e constantes multiplicativas são descartadas. O(3n²) e O(n² + n) descrevem a mesma classe, mas não estão na forma simplificada. O(n³) seria um limite verdadeiro, mas folgado.',
    },
    {
      id: 'aprendiz-t3-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quantas vezes a linha `cont++` executa?',
      codigo: `int n = 100;
int cont = 0;
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        cont++;
    }
}
System.out.println(cont);`,
      opcoes: ['`4950`', '`10000`', '`5050`', '`9900`', '`100`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para cada `i`, o laço de dentro roda n − 1 − i vezes: 99 + 98 + ... + 0 = 99 · 100 / 2 = 4950, a soma de Gauss. São os pares sem repetição, n(n − 1)/2, que continua sendo O(n²). O 5050 é 1 + ... + 100.',
    },
    {
      id: 'aprendiz-t3-e05-q07',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais operações são O(1), pelo menos em média? Escolha três.',
      opcoes: [
        '`ArrayList.get(i)`',
        '`HashMap.get(chave)`',
        '`HashSet.contains(x)`',
        '`ArrayList.contains(x)`',
        '`TreeMap.get(chave)`',
        '`LinkedList.get(i)`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O `ArrayList` acessa o índice direto no array interno. `HashMap` e `HashSet` calculam o balde pelo hash. Já `ArrayList.contains` percorre a lista (O(n)), o `TreeMap` desce uma árvore balanceada (O(log n)) e a `LinkedList` anda nó por nó até o índice (O(n)).',
    },
    {
      id: 'aprendiz-t3-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a complexidade deste trecho?',
      codigo: `for (int i = 1; i < n; i *= 2) {
    for (int j = 0; j < n; j++) {
        soma += i * j;
    }
}`,
      opcoes: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)', 'O(2ⁿ)'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '10240' },
      codigoVerificacao: `int n = 1024;
long ops = 0;
for (int i = 1; i < n; i *= 2) {
    for (int j = 0; j < n; j++) {
        ops++;
    }
}
System.out.println(ops);`,
      explicacao: 'O laço de fora dobra `i`, então roda cerca de log₂ n vezes. O de dentro roda n vezes a cada volta. Aninhados, multiplicam: n · log n. Para n = 1024, são 10 × 1024 = 10.240 operações, bem longe de 1024² ≈ um milhão.',
    },
    {
      id: 'aprendiz-t3-e05-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Chamadas {
    static int chamadas = 0;

    static int fib(int n) {
        chamadas++;
        return n < 2 ? n : fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fib(5) + " " + chamadas);
    }
}`,
      resposta: '5 15',
      explicacao: 'fib(5) = 5. Cada chamada com n ≥ 2 gera duas outras, e o total de chamadas para fib(n) é 2 · F(n + 1) − 1, com F(6) = 8: 15 chamadas. Esse número cresce cerca de 1,6 vez a cada n a mais: é exponencial.',
    },
    {
      id: 'aprendiz-t3-e05-q10',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com um operador de atribuição composta para que o laço divida `k` ao meio a cada volta. O programa deve imprimir `20`.',
      codigo: `public class Metades {
    public static void main(String[] args) {
        int passos = 0;
        for (int k = 1_048_576; k > 1; k ___ 2) {
            passos++;
        }
        System.out.println(passos);
    }
}`,
      respostas: ['/='],
      saida: '20',
      explicacao: '1.048.576 é 2²⁰, então são 20 cortes ao meio até chegar a 1: log₂ n. Cuidado com `>>=`: `k >>= 2` desloca dois bits, ou seja, divide por 4, e daria só 10 voltas. Para dividir por 2 com deslocamento, seria `k >>= 1`.',
    },
    {
      id: 'aprendiz-t3-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que se escreve O(log n) sem indicar a base do logaritmo?',
      opcoes: [
        'Porque log_a n = log_b n / log_b a: mudar a base só multiplica por uma constante, que o Big-O descarta',
        'Porque em computação o logaritmo é sempre na base 10',
        'Porque a base é sempre 2 e fica subentendida',
        'Porque logaritmos de bases diferentes dão o mesmo valor',
      ],
      resposta: 0,
      explicacao: 'Pela mudança de base, log₂ n ≈ 3,32 · log₁₀ n: as duas funções crescem no mesmo ritmo e diferem por um fator fixo. Como Big-O ignora constantes, qualquer base serve. Os valores, porém, são diferentes: log₂ 1000 ≈ 10 e log₁₀ 1000 = 3.',
    },
    {
      id: 'aprendiz-t3-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println((int) (Math.log(1000) / Math.log(10)));`,
      opcoes: ['`2`', '`3`', '`2.9999999999999996`', '`3.0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A divisão dá 2,9999999999999996 por causa do arredondamento dos dois logaritmos, e o cast para `int` trunca em direção a zero: 2. Para logaritmos inteiros, use contas exatas: `Math.log10` para base 10 ou `31 - Integer.numberOfLeadingZeros(n)` para base 2.',
    },
    {
      id: 'aprendiz-t3-e05-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Pela definição formal, quais funções são O(n²)? Escolha três.',
      opcoes: ['n²/2', '5n² + 1000n', 'n log n', 'n³', '2ⁿ'],
      respostas: [0, 1, 2],
      explicacao: 'Big-O é um limite superior: f = O(g) se f fica abaixo de c · g a partir de algum n. n²/2 e 5n² + 1000n cabem com c = 1 e c = 6. n log n cresce mais devagar que n², então também cabe, ainda que O(n log n) seja a descrição mais útil. n³ e 2ⁿ passam de qualquer c · n² para n grande.',
    },
    {
      id: 'aprendiz-t3-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: '`pedidos` e `cancelados` têm n elementos cada, e `cancelados` é um `ArrayList`. Qual é a complexidade do laço, e o que muda se `cancelados` virar um `HashSet`?',
      codigo: `for (Pedido p : pedidos) {
    if (cancelados.contains(p.id())) {
        p.cancelar();
    }
}`,
      opcoes: [
        'O(n²); com `HashSet` vira O(n) em média',
        'O(n); com `HashSet` continua O(n)',
        'O(n log n); com `HashSet` vira O(1)',
        'O(n²); com `HashSet` continua O(n²)',
      ],
      resposta: 0,
      explicacao: 'São n buscas, e cada `contains` num `ArrayList` percorre até n elementos: n · n. No `HashSet`, cada busca é O(1) em média, e o laço inteiro fica O(n). O laço continua precisando visitar cada pedido, então não chega a O(1).',
    },
    {
      id: 'aprendiz-t3-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um algoritmo O(n²) leva 1 segundo para n = 10.000. Quanto tempo deve levar, aproximadamente, para n = 1.000.000?',
      opcoes: ['Cerca de 3 horas', 'Cerca de 100 segundos', 'Cerca de 10 segundos', 'Cerca de 1 minuto', 'Cerca de 1 ano'],
      resposta: 0,
      explicacao: 'n foi multiplicado por 100, então n² é multiplicado por 100² = 10.000: 10.000 segundos, perto de 2 horas e 47 minutos. Quem responde 100 segundos fez a conta de um algoritmo linear.',
    },
  ],
};

export default episodio;
