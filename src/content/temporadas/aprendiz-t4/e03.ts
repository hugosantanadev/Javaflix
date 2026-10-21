import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t4-e03',
  minutos: 16,
  aula,
  armadilhas: [
    'Quicksort é O(n log n) em média, mas O(n²) no pior caso, como pivô no último elemento com array já ordenado.',
    'Merge sort é sempre O(n log n), mas usa O(n) de memória extra.',
    'Insertion sort é O(n²) no pior caso, mas O(n) num array já ordenado.',
    'Nenhuma ordenação por comparação faz menos que cerca de n log n comparações no pior caso.',
    '`Arrays.sort` com primitivos usa Dual-Pivot Quicksort; com objetos, TimSort.',
    '`List.sort` e `Collections.sort` são estáveis: elementos iguais mantêm a ordem anterior.',
    '`Collections.sort(lista)` sem `Comparator` exige que os elementos sejam `Comparable`.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de Arrays.sort(int[])',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#sort(int[])',
      tipo: 'documentacao',
      porque: 'A nota de implementação cita o Dual-Pivot Quicksort de Yaroslavskiy, Bentley e Bloch e a sua complexidade.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção "Implementation Note"',
    },
    {
      titulo: 'Javadoc de List.sort',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)',
      tipo: 'documentacao',
      porque: 'A garantia de estabilidade e a descrição do TimSort, adaptado do Python.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção "Implementation Note"',
    },
    {
      titulo: 'Código-fonte do TimSort no OpenJDK',
      url: 'https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/TimSort.java',
      tipo: 'documentacao',
      porque: 'O algoritmo de ordenação de objetos do Java, com comentários que explicam runs, galope e as invariantes da pilha.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Wikipédia: Algoritmo de ordenação',
      url: 'https://pt.wikipedia.org/wiki/Algoritmo_de_ordena%C3%A7%C3%A3o',
      tipo: 'artigo',
      porque: 'A tabela comparativa de dezenas de algoritmos, com complexidade, memória e estabilidade.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Merge sort',
      url: 'https://pt.wikipedia.org/wiki/Merge_sort',
      tipo: 'artigo',
      porque: 'A análise da recorrência T(n) = 2T(n/2) + n e implementações em várias linguagens.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Quicksort',
      url: 'https://pt.wikipedia.org/wiki/Quicksort',
      tipo: 'artigo',
      porque: 'Estratégias de escolha de pivô e por que o pior caso é quadrático.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Algorithms, 4th Edition: Mergesort (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/22mergesort/',
      tipo: 'tutorial',
      porque: 'Merge sort em Java com a prova do limite inferior de n log n para ordenação por comparação.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 2.2, incluindo "Computational complexity of sorting"',
      nivel: 'fundo',
    },
    {
      titulo: 'Algorithms, 4th Edition: Quicksort (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/23quicksort/',
      tipo: 'tutorial',
      porque: 'Partição, escolha de pivô e o quicksort de três vias para chaves repetidas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: '15 Sorting Algorithms in 6 Minutes (Timo Bingmann)',
      url: 'https://www.youtube.com/watch?v=kPRA0W1kECg',
      tipo: 'video',
      porque: 'Cada algoritmo visualizado e sonorizado: dá para ver e ouvir a diferença entre O(n²) e O(n log n).',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'ENSICO: Algoritmos de Ordenação',
      url: 'https://www.youtube.com/watch?v=t9_dHIy0QxA',
      tipo: 'video',
      porque: 'Bubble sort, merge sort e quicksort explicados com animações, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Algoritmo de ordenação: MergeSort, vídeo-aula',
      url: 'https://www.youtube.com/watch?v=PKCMMSXQyJE',
      tipo: 'video',
      porque: 'A divisão e a intercalação do merge sort feitas passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'VisuAlgo: Sorting',
      url: 'https://visualgo.net/en/sorting',
      tipo: 'ferramenta',
      porque: 'Execute bubble, insertion, merge e quick sort passo a passo, com o pseudocódigo destacado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Entendendo Algoritmos (Aditya Bhargava)',
      url: 'https://novatec.com.br/livros/entendendo-algoritmos/',
      tipo: 'livro',
      porque: 'Ordenação por seleção e quicksort com desenhos, incluindo a análise do caso médio.',
      gratuito: false,
      idioma: 'pt',
      onde: 'Cap. 2 "Ordenação por seleção" e cap. 4 "Quicksort"',
    },
  ],
  desafio: {
    titulo: 'Quicksort com mediana de três',
    enunciado:
      'Implemente um quicksort que conte as comparações e escolha o pivô como a mediana entre o primeiro, o do meio e o último elemento do trecho. Compare com o pivô fixo no último elemento, ordenando um array **já ordenado** de 1.000 elementos. Imprima:\n\n```text\npivô no fim: 499500 comparações\nmediana de três: 7987 comparações\nordenado: true\n```',
    dicas: [
      'Conte uma comparação a cada `a[j] < pivo` dentro do laço de partição.',
      'Para a mediana de três, ordene os três candidatos entre si (sem contar essas comparações) e troque a mediana com a última posição; depois, particione como sempre.',
      'Com o array já ordenado, o pivô no fim é o maior elemento: um lado fica vazio a cada chamada, e as comparações somam 999 + 998 + ... + 1.',
    ],
    solucao: `public class Mediana {
    static long comps;

    static void quick(int[] a, int ini, int fim, boolean mediana) {
        if (ini >= fim) return;
        if (mediana) {
            int meio = (ini + fim) >>> 1;
            if (a[meio] < a[ini]) troca(a, meio, ini);
            if (a[fim] < a[ini]) troca(a, fim, ini);
            if (a[fim] < a[meio]) troca(a, fim, meio);
            troca(a, meio, fim);
        }
        int pivo = a[fim];
        int i = ini;
        for (int j = ini; j < fim; j++) {
            comps++;
            if (a[j] < pivo) {
                troca(a, i, j);
                i++;
            }
        }
        troca(a, i, fim);
        quick(a, ini, i - 1, mediana);
        quick(a, i + 1, fim, mediana);
    }

    static void troca(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    static int[] ordenado(int n) {
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = i;
        return a;
    }

    public static void main(String[] args) {
        int[] a = ordenado(1000);
        comps = 0;
        quick(a, 0, a.length - 1, false);
        System.out.println("pivô no fim: " + comps + " comparações");

        int[] b = ordenado(1000);
        comps = 0;
        quick(b, 0, b.length - 1, true);
        System.out.println("mediana de três: " + comps + " comparações");
        System.out.println("ordenado: " + java.util.Arrays.equals(b, ordenado(1000)));
    }
}`,
    saida: 'pivô no fim: 499500 comparações\nmediana de três: 7987 comparações\nordenado: true',
    comentarios:
      'Com o pivô no fim, o array ordenado é o pior caso: 1000 × 999 / 2 = 499.500 comparações, e a recursão chega a 1.000 níveis de profundidade (com 100 mil elementos, estouraria a pilha). A mediana de três escolhe exatamente o elemento do meio quando o array já está ordenado, e o quicksort volta a dividir ao meio: 7.987 comparações, abaixo de n log₂ n ≈ 10.000. É uma das técnicas que o Dual-Pivot Quicksort do JDK usa, junto com dois pivôs e insertion sort para pedaços pequenos.',
  },
  exercicios: [
    {
      id: 'aprendiz-t4-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes algoritmos é O(n log n) **mesmo no pior caso**?',
      opcoes: ['Merge sort', 'Quicksort', 'Bubble sort', 'Insertion sort', 'Selection sort'],
      resposta: 0,
      explicacao: 'O merge sort sempre divide ao meio, então sempre tem log n níveis com n de trabalho cada. O quicksort depende do pivô e pode cair para O(n²). Bubble, insertion e selection são O(n²) no pior caso.',
    },
    {
      id: 'aprendiz-t4-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata depois de **uma** passada do bubble sort.',
      codigo: `int[] a = {5, 1, 4, 2, 8};
for (int i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1]) {
        int t = a[i];
        a[i] = a[i + 1];
        a[i + 1] = t;
    }
}
System.out.println(Arrays.toString(a));`,
      resposta: '[1, 4, 2, 5, 8]',
      explicacao: '5 e 1 trocam, 5 e 4 trocam, 5 e 2 trocam, 5 e 8 ficam. O 5 foi empurrado para a direita até encontrar um maior que ele. Ao fim de cada passada, o maior valor do trecho percorrido está na última posição; outras passadas ordenam o resto.',
    },
    {
      id: 'aprendiz-t4-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que significa dizer que um algoritmo de ordenação é **estável**?',
      opcoes: [
        'Elementos considerados iguais mantêm a ordem relativa que tinham antes',
        'O tempo de execução é sempre o mesmo, qualquer que seja a entrada',
        'Ele nunca lança exceção',
        'Ele ordena sem usar memória extra',
      ],
      resposta: 0,
      explicacao: 'Estabilidade é sobre empates. Ordenando pedidos por valor de forma estável, dois pedidos de R$ 50 continuam na ordem em que estavam, por exemplo, por data. Ordenar sem memória extra é outra propriedade, "no lugar".',
    },
    {
      id: 'aprendiz-t4-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Com o pivô sempre no último elemento, em que situação o quicksort cai para O(n²)?',
      opcoes: [
        'Quando o array já está ordenado',
        'Quando o array tem tamanho ímpar',
        'Quando o array tem números negativos',
        'Quando o array está em ordem aleatória',
      ],
      resposta: 0,
      explicacao: 'Num array ordenado, o último elemento é o maior: a partição deixa n − 1 elementos de um lado e nenhum do outro, a cada nível. São n níveis com trabalho decrescente, n(n − 1)/2 comparações. Em ordem aleatória, o pivô costuma dividir bem.',
    },
    {
      id: 'aprendiz-t4-e03-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Intercala {
    static int[] merge(int[] a, int[] b) {
        int[] r = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) {
            r[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];
        }
        while (i < a.length) r[k++] = a[i++];
        while (j < b.length) r[k++] = b[j++];
        return r;
    }

    public static void main(String[] args) {
        int[] r = merge(new int[] {1, 4, 9}, new int[] {2, 3, 10});
        System.out.println(java.util.Arrays.toString(r));
    }
}`,
      resposta: '[1, 2, 3, 4, 9, 10]',
      explicacao: 'A intercalação compara os primeiros de cada lista e tira o menor, até uma acabar; o que sobra da outra já está em ordem e vai para o fim. Custa O(a + b): cada elemento é copiado uma vez.',
    },
    {
      id: 'aprendiz-t4-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `record Pedido(String cliente, int valor) {}

List<Pedido> pedidos = new ArrayList<>(List.of(
        new Pedido("Bia", 50), new Pedido("Ana", 30),
        new Pedido("Caio", 50), new Pedido("Duda", 30)));
pedidos.sort(Comparator.comparingInt(Pedido::valor));
System.out.println(pedidos.stream().map(Pedido::cliente).toList());`,
      opcoes: [
        '`[Ana, Duda, Bia, Caio]`',
        '`[Duda, Ana, Caio, Bia]`',
        '`[Ana, Duda, Caio, Bia]`',
        '`[Ana, Bia, Caio, Duda]`',
        'A ordem entre empatados não é garantida',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`List.sort` é estável: entre os de valor 30, Ana vinha antes de Duda; entre os de 50, Bia antes de Caio. A ordem relativa original é preservada. A ordem alfabética só apareceria com `thenComparing(Pedido::cliente)`.',
    },
    {
      id: 'aprendiz-t4-e03-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete a condição do insertion sort para deslizar os maiores para a direita. O programa deve imprimir `[1, 2, 3, 5, 8]`.',
      codigo: `import java.util.Arrays;

public class Insercao {
    public static void main(String[] args) {
        int[] a = {5, 2, 8, 1, 3};
        for (int i = 1; i < a.length; i++) {
            int x = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] ___ x) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = x;
        }
        System.out.println(Arrays.toString(a));
    }
}`,
      respostas: ['>', '>='],
      saida: '[1, 2, 3, 5, 8]',
      explicacao: 'Enquanto o elemento à esquerda for maior que `x`, ele anda uma casa para a direita, abrindo espaço. Com `>`, empates param a caminhada e a ordenação fica estável; com `>=`, também ordena, mas troca a ordem de iguais.',
    },
    {
      id: 'aprendiz-t4-e03-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que nenhum algoritmo que só compara elementos consegue ordenar qualquer array de n elementos com menos de cerca de n log n comparações?',
      opcoes: [
        'Porque há n! ordens possíveis e k comparações distinguem no máximo 2ᵏ casos; logo k ≥ log₂(n!) ≈ n log n',
        'Porque toda comparação custa log n operações',
        'Porque o array precisa ser percorrido log n vezes',
        'Porque a memória do computador é limitada',
      ],
      resposta: 0,
      explicacao: 'O algoritmo precisa descobrir qual das n! permutações recebeu, e cada comparação é uma pergunta de sim ou não. É o mesmo argumento dos bits: para distinguir N possibilidades, são precisos log₂ N bits de informação. Counting sort escapa porque não compara: usa o valor como índice.',
    },
    {
      id: 'aprendiz-t4-e03-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quanta memória extra o merge sort tradicional usa?',
      opcoes: ['O(n), para o array auxiliar da intercalação', 'O(1)', 'O(n²)', 'O(log n) e nada mais'],
      resposta: 0,
      explicacao: 'A intercalação escreve o resultado num array auxiliar do mesmo tamanho e depois copia de volta. Além disso há O(log n) de pilha de recursão, mas o termo dominante é o auxiliar.',
    },
    {
      id: 'aprendiz-t4-e03-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata: o número de comparações do bubble sort com parada antecipada.',
      codigo: `public class Conta {
    static int comparacoes(int[] a) {
        int comps = 0;
        for (int fim = a.length - 1; fim > 0; fim--) {
            boolean trocou = false;
            for (int i = 0; i < fim; i++) {
                comps++;
                if (a[i] > a[i + 1]) {
                    int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;
                    trocou = true;
                }
            }
            if (!trocou) break;
        }
        return comps;
    }

    public static void main(String[] args) {
        System.out.println(comparacoes(new int[] {1, 2, 3, 4, 5}));
        System.out.println(comparacoes(new int[] {5, 4, 3, 2, 1}));
    }
}`,
      resposta: '4\n10',
      explicacao: 'Ordenado: a primeira passada faz 4 comparações, não troca nada e para. Invertido: todas as passadas trocam, e são 4 + 3 + 2 + 1 = 10 = 5 × 4 / 2 comparações.',
    },
    {
      id: 'aprendiz-t4-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual algoritmo o `Arrays.sort(int[])` usa?',
      opcoes: ['Dual-Pivot Quicksort', 'TimSort', 'Bubble sort', 'Merge sort clássico', 'Heap sort'],
      resposta: 0,
      explicacao: 'Para primitivos, a estabilidade não importa (dois `int` iguais são indistinguíveis), então o JDK usa um quicksort com dois pivôs, muito rápido na prática. Para objetos, onde a estabilidade importa, usa o TimSort.',
    },
    {
      id: 'aprendiz-t4-e03-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais algoritmos ordenam no próprio array, sem um array auxiliar do tamanho da entrada? Escolha três.',
      opcoes: ['Bubble sort', 'Insertion sort', 'Quicksort', 'Merge sort tradicional', 'Counting sort'],
      respostas: [0, 1, 2],
      explicacao: 'Bubble e insertion só trocam e deslocam elementos. O quicksort particiona no lugar e usa apenas a pilha da recursão. O merge sort precisa de um auxiliar de tamanho n, e o counting sort de um array de contagens.',
    },
    {
      id: 'aprendiz-t4-e03-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Ordena {
    record Pedido(String cliente, int valor) {}

    public static void main(String[] args) {
        List<Pedido> pedidos = new ArrayList<>();
        pedidos.add(new Pedido("Ana", 30));
        pedidos.sort(Comparator.comparingInt(Pedido::valor));
        Collections.sort(pedidos);
        System.out.println(pedidos);
    }
}`,
      resposta: 10,
      explicacao: '`Collections.sort(lista)` sem comparador exige elementos `Comparable`, e o record `Pedido` não implementa essa interface. A linha 9 compila porque informa como comparar.',
    },
    {
      id: 'aprendiz-t4-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para ordenar um array que já está **quase** ordenado (poucos elementos fora do lugar), qual algoritmo simples é o melhor?',
      opcoes: ['Insertion sort', 'Quicksort com pivô no último elemento', 'Bubble sort sem parada antecipada', 'Selection sort'],
      resposta: 0,
      explicacao: 'No insertion sort, cada elemento anda só o necessário para a esquerda: com poucos fora do lugar, o total fica perto de O(n). O quicksort com pivô no fim é o pior caso nessa situação, e o selection sort sempre faz n²/2 comparações. O TimSort explora justamente essa ideia.',
    },
    {
      id: 'aprendiz-t4-e03-q15',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais afirmações sobre o merge sort são verdadeiras? Escolha duas.',
      opcoes: [
        'Sua recorrência é T(n) = 2T(n/2) + n, com solução O(n log n)',
        'É estável quando a intercalação usa `<=` para tirar do lado esquerdo nos empates',
        'É O(n²) quando o array já está ordenado',
        'Ordena sem nenhuma memória extra',
        'Escolhe um pivô a cada chamada',
      ],
      respostas: [0, 1],
      explicacao: 'Duas metades de n/2 mais uma intercalação de n: log n níveis de n cada. Tirando da esquerda nos empates, quem vinha antes continua antes. O merge sort não depende da entrada, usa O(n) extra e não tem pivô (isso é do quicksort).',
    },
  ],
};

export default episodio;
