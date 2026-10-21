import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t4-e02',
  minutos: 13,
  aula,
  armadilhas: [
    'Busca binária em array desordenado não lança erro: só devolve um resultado errado.',
    'Quando não acha, `Arrays.binarySearch` devolve `-(ponto de inserção) - 1`, não `-1`.',
    'Com elementos repetidos, `Arrays.binarySearch` não garante qual das posições iguais devolve.',
    '`while (inicio < fim)` na busca clássica deixa de examinar o último candidato.',
    '`(inicio + fim) / 2` estoura com índices grandes. Use `(inicio + fim) >>> 1`.',
    '`List.contains` e `indexOf` são buscas lineares, O(n).',
    'Busca binária numa `LinkedList` não compensa: chegar ao meio já é O(n).',
  ],
  recursos: [
    {
      titulo: 'Javadoc de Arrays.binarySearch',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#binarySearch(int[],int)',
      tipo: 'documentacao',
      porque: 'O contrato completo: exige array ordenado, não garante qual de vários iguais e devolve o ponto de inserção codificado.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção "Returns" do método',
    },
    {
      titulo: 'Javadoc de Collections.binarySearch',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#binarySearch(java.util.List,T)',
      tipo: 'documentacao',
      porque: 'A versão para listas, e o aviso de que numa lista sem acesso aleatório ela faz O(n) travessias.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Google Research: Nearly All Binary Searches and Mergesorts are Broken',
      url: 'https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/',
      tipo: 'artigo',
      porque: 'Joshua Bloch conta como o overflow no cálculo do meio ficou anos escondido no JDK.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Pesquisa binária',
      url: 'https://pt.wikipedia.org/wiki/Pesquisa_bin%C3%A1ria',
      tipo: 'artigo',
      porque: 'O algoritmo, a análise de complexidade e implementações em várias linguagens.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Khan Academy: Binary search',
      url: 'https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search',
      tipo: 'tutorial',
      porque: 'Do jogo de adivinhar números ao pseudocódigo, com exercícios interativos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Aula 10: Busca Binária, Estruturas de Dados com Java',
      url: 'https://www.youtube.com/watch?v=ShsMgfuIack',
      tipo: 'video',
      porque: 'A busca binária implementada passo a passo em Java, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'UNIVESP: Programação de Computadores, Aula 23, Busca Sequencial e Binária',
      url: 'https://www.youtube.com/watch?v=8weGr_G3Pqo',
      tipo: 'video',
      porque: 'As duas buscas lado a lado, com a comparação de desempenho.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'CS50x 2024: Lecture 3, Algorithms',
      url: 'https://www.youtube.com/watch?v=jZzyERW7h1A',
      tipo: 'video',
      porque: 'O começo da aula compara busca linear e binária com portas e números escondidos no palco.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Binary and Linear Search Visualization (USF)',
      url: 'https://www.cs.usfca.edu/~galles/visualization/Search.html',
      tipo: 'ferramenta',
      porque: 'Anima as duas buscas no mesmo array, mostrando quantos elementos cada uma examina.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'LeetCode 704: Binary Search',
      url: 'https://leetcode.com/problems/binary-search/',
      tipo: 'ferramenta',
      porque: 'Implemente e submeta a sua busca binária contra centenas de casos de teste.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Algorithms, 4th Edition: Programming Model (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/11model/',
      tipo: 'tutorial',
      porque: 'O livro de Princeton abre com a busca binária em Java como primeiro exemplo de programa.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 1.1, exemplo "BinarySearch.java"',
      nivel: 'fundo',
    },
    {
      titulo: 'Entendendo Algoritmos (Aditya Bhargava)',
      url: 'https://novatec.com.br/livros/entendendo-algoritmos/',
      tipo: 'livro',
      porque: 'Busca binária com desenhos, do jogo de adivinhação à notação Big-O.',
      gratuito: false,
      idioma: 'pt',
      onde: 'Cap. 1 "Introdução a algoritmos"',
    },
  ],
  desafio: {
    titulo: 'Primeira e última ocorrência',
    enunciado:
      'Num array ordenado com repetidos, `Arrays.binarySearch` não diz qual ocorrência devolve. Escreva `primeira(int[] v, int alvo)` e `ultima(int[] v, int alvo)`, ambas O(log n), que devolvem a primeira e a última posição do alvo (ou −1). Com `v = {1, 3, 3, 3, 5, 8, 8, 9}`, imprima:\n\n```text\n3: de 1 a 3, 3 ocorrências\n8: de 5 a 6, 2 ocorrências\n4: de -1 a -1, 0 ocorrências\n```',
    dicas: [
      'Faça a busca binária normal, mas, ao achar o alvo, guarde a posição e **continue** procurando: para a esquerda na `primeira`, para a direita na `ultima`.',
      'Quantidade de ocorrências: `ultima - primeira + 1`, ou 0 se não achou.',
    ],
    solucao: `public class Ocorrencias {
    static int primeira(int[] v, int alvo) {
        int inicio = 0;
        int fim = v.length - 1;
        int achou = -1;
        while (inicio <= fim) {
            int meio = (inicio + fim) >>> 1;
            if (v[meio] < alvo) {
                inicio = meio + 1;
            } else {
                if (v[meio] == alvo) {
                    achou = meio;
                }
                fim = meio - 1;
            }
        }
        return achou;
    }

    static int ultima(int[] v, int alvo) {
        int inicio = 0;
        int fim = v.length - 1;
        int achou = -1;
        while (inicio <= fim) {
            int meio = (inicio + fim) >>> 1;
            if (v[meio] > alvo) {
                fim = meio - 1;
            } else {
                if (v[meio] == alvo) {
                    achou = meio;
                }
                inicio = meio + 1;
            }
        }
        return achou;
    }

    public static void main(String[] args) {
        int[] v = {1, 3, 3, 3, 5, 8, 8, 9};
        for (int alvo : new int[] {3, 8, 4}) {
            int p = primeira(v, alvo);
            int u = ultima(v, alvo);
            int quantos = p == -1 ? 0 : u - p + 1;
            System.out.println(alvo + ": de " + p + " a " + u + ", " + quantos + " ocorrências");
        }
    }
}`,
    saida: '3: de 1 a 3, 3 ocorrências\n8: de 5 a 6, 2 ocorrências\n4: de -1 a -1, 0 ocorrências',
    comentarios:
      'Contar quantas vezes um valor aparece num array ordenado com duas buscas binárias custa O(log n), contra O(n) de percorrer tudo. Essas variações (*lower bound* e *upper bound*) são as que as bibliotecas de C++ e Python oferecem, e aparecem muito em entrevistas. Repare que o laço não para ao achar: o invariante muda para "a resposta, se existir, está entre `inicio` e `fim` ou já está guardada em `achou`".',
  },
  exercicios: [
    {
      id: 'aprendiz-t4-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a condição para usar busca binária num array?',
      opcoes: [
        'O array precisa estar ordenado',
        'O array precisa ter tamanho par',
        'O array não pode ter mais de um milhão de elementos',
        'Os elementos precisam ser números primos',
      ],
      resposta: 0,
      explicacao: 'A busca binária descarta metade do array a cada comparação partindo do princípio de que tudo à esquerda do meio é menor e tudo à direita é maior. Sem ordem, essa conclusão é falsa.',
    },
    {
      id: 'aprendiz-t4-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int[] v = {1, 3, 5, 9, 11};
System.out.println(Arrays.binarySearch(v, 7));`,
      opcoes: ['`-4`', '`-3`', '`-1`', '`3`', '`4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O 7 não está no array e deveria entrar na posição 3, entre o 5 e o 9. O método devolve −(3) − 1 = −4. O −1 é o que muita gente espera, mas só vale quando o ponto de inserção é 0.',
    },
    {
      id: 'aprendiz-t4-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata: os valores de `meio` examinados até achar o 60.',
      codigo: `int[] v = {10, 20, 30, 40, 50, 60, 70};
int inicio = 0, fim = v.length - 1;
while (inicio <= fim) {
    int meio = (inicio + fim) >>> 1;
    System.out.println(meio);
    if (v[meio] == 60) break;
    if (v[meio] < 60) inicio = meio + 1;
    else fim = meio - 1;
}`,
      resposta: '3\n5',
      explicacao: 'Primeiro meio: (0 + 6) / 2 = 3, valor 40, menor que 60, então `inicio` vira 4. Segundo: (4 + 6) / 2 = 5, valor 60. Duas comparações num array de 7.',
    },
    {
      id: 'aprendiz-t4-e02-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'No pior caso, quantas comparações a busca linear faz num array de 1.000 elementos?',
      opcoes: ['1.000', '500', '10', '1', '1.000.000'],
      resposta: 0,
      explicacao: 'O pior caso é o alvo ser o último ou não estar no array: as 1.000 posições são examinadas. 500 é o caso médio quando o alvo está presente; 10 seria a busca binária.',
    },
    {
      id: 'aprendiz-t4-e02-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais operações fazem uma busca linear, O(n)? Escolha três.',
      opcoes: [
        '`ArrayList.contains(x)`',
        '`List.indexOf(x)`',
        '`String.indexOf("abc")`',
        '`HashSet.contains(x)`',
        '`TreeSet.contains(x)`',
        '`Arrays.binarySearch(v, x)`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Listas e strings são percorridas elemento a elemento. O `HashSet` vai direto ao balde do hash (O(1) em média), o `TreeSet` desce uma árvore balanceada (O(log n)) e o `binarySearch` corta ao meio (O(log n)).',
    },
    {
      id: 'aprendiz-t4-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Esta busca binária tem um bug. Qual é a saída?',
      codigo: `public class Bug {
    static int busca(int[] v, int alvo) {
        int inicio = 0, fim = v.length - 1;
        while (inicio < fim) {
            int meio = (inicio + fim) >>> 1;
            if (v[meio] == alvo) return meio;
            if (v[meio] < alvo) inicio = meio + 1;
            else fim = meio - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(busca(new int[] {10, 20, 30, 40, 50}, 50));
    }
}`,
      opcoes: ['`-1`', '`4`', '`3`', 'O laço nunca termina', 'Lança `ArrayIndexOutOfBoundsException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O intervalo encolhe até `inicio == fim == 4`, justamente a posição do 50. Mas com `<`, o laço para antes de examiná-la e devolve −1. Com `<=`, o último candidato seria testado.',
    },
    {
      id: 'aprendiz-t4-e02-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o cálculo do meio que nunca estoura. O programa deve imprimir `1750000000`.',
      codigo: `public class Meio {
    public static void main(String[] args) {
        int inicio = 1_500_000_000;
        int fim = 2_000_000_000;
        int meio = inicio + (fim - inicio) ___ 2;
        System.out.println(meio);
    }
}`,
      respostas: ['/'],
      saida: '1750000000',
      explicacao: '`fim - inicio` nunca estoura porque os dois são índices válidos, e somar metade dessa distância a `inicio` não passa de `fim`. É a correção "matemática" do bug; `(inicio + fim) >>> 1` é a correção "de bits".',
    },
    {
      id: 'aprendiz-t4-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você precisa verificar **uma única vez** se um valor está num array desordenado de n elementos. O que é mais rápido?',
      opcoes: [
        'Busca linear, O(n)',
        'Ordenar e fazer busca binária, porque O(log n) é melhor que O(n)',
        'Colocar tudo num `TreeSet` e chamar `contains`',
        'Tanto faz: as três opções são O(log n)',
      ],
      resposta: 0,
      explicacao: 'Ordenar custa O(n log n), mais caro que olhar cada elemento uma vez. Montar um `TreeSet` também custa O(n log n). Ordenar só compensa quando vão ser feitas muitas buscas nos mesmos dados.',
    },
    {
      id: 'aprendiz-t4-e02-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Raiz {
    static long raiz(long n) {
        long inicio = 0, fim = n;
        while (inicio < fim) {
            long meio = (inicio + fim + 1) >>> 1;
            if (meio * meio <= n) inicio = meio;
            else fim = meio - 1;
        }
        return inicio;
    }

    public static void main(String[] args) {
        System.out.println(raiz(50));
        System.out.println(raiz(49));
        System.out.println(raiz(0));
    }
}`,
      resposta: '7\n7\n0',
      explicacao: 'A função acha o maior x com x² ≤ n, por busca binária na resposta. 7² = 49 ≤ 50 e 8² = 64 > 50, então raiz(50) = 7; raiz(49) também é 7. Com n = 0, o laço nem roda.',
    },
    {
      id: 'aprendiz-t4-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `git bisect` faz busca binária no histórico para achar o commit que introduziu um bug. Com 1.000 commits entre o último bom e o primeiro ruim, quantos testes são necessários, aproximadamente?',
      opcoes: ['Cerca de 10', 'Cerca de 500', 'Cerca de 100', 'Cerca de 1.000', 'Cerca de 3'],
      resposta: 0,
      explicacao: 'Cada teste divide os candidatos ao meio, e 2¹⁰ = 1024: com 10 testes sobra um commit. É a busca binária fora do código, num problema do dia a dia.',
    },
    {
      id: 'aprendiz-t4-e02-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `List<String> nomes = List.of("ana", "bia", "caio", "duda");
System.out.println(Collections.binarySearch(nomes, "caio"));`,
      opcoes: ['`2`', '`3`', '`-3`', '`true`', '`1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A lista está em ordem alfabética e "caio" está na posição 2 (contando do 0). Quando acha, o método devolve o índice; o negativo é só para quando não acha.',
    },
    {
      id: 'aprendiz-t4-e02-q12',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Busca {
    public static void main(String[] args) {
        int[] v = {1, 3, 5};
        List<Integer> lista = List.of(1, 3, 5);
        System.out.println(Arrays.binarySearch(v, 3));
        System.out.println(Collections.binarySearch(lista, 3));
        System.out.println(Arrays.binarySearch(lista, 3));
    }
}`,
      resposta: 9,
      explicacao: '`Arrays.binarySearch` só aceita arrays. Para listas existe `Collections.binarySearch`, como na linha 8. O compilador não encontra nenhuma versão de `Arrays.binarySearch` que receba uma `List`.',
    },
    {
      id: 'aprendiz-t4-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o invariante da busca binária clássica, válido no começo de cada volta?',
      opcoes: [
        'Se o alvo está no array, ele está entre as posições `inicio` e `fim`',
        '`inicio` e `fim` sempre têm a mesma paridade',
        'O elemento do meio é sempre o alvo',
        'O intervalo entre `inicio` e `fim` sempre tem tamanho par',
      ],
      resposta: 0,
      explicacao: 'No começo, o intervalo é o array inteiro. Cada corte só descarta posições onde o alvo não pode estar, porque o array é ordenado. Quando o intervalo fica vazio (`inicio > fim`), o invariante prova que o alvo não existe.',
    },
    {
      id: 'aprendiz-t4-e02-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quando `Arrays.binarySearch` devolve um número negativo `r`, o que se pode concluir? Escolha duas.',
      opcoes: [
        'O alvo não está no array',
        '`-r - 1` é a posição onde o alvo deveria ser inserido para manter a ordem',
        'O array não estava ordenado',
        '`-r` é a posição do último elemento examinado',
        'O alvo está repetido no array',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: '-3 2 true' },
      codigoVerificacao: `int[] v = {10, 20, 30, 40};
int r = Arrays.binarySearch(v, 25);
int[] novo = new int[5];
int p = -r - 1;
System.arraycopy(v, 0, novo, 0, p);
novo[p] = 25;
System.arraycopy(v, p, novo, p + 1, v.length - p);
System.out.println(r + " " + p + " " + Arrays.equals(novo, new int[] {10, 20, 25, 30, 40}));`,
      explicacao: 'O negativo significa "não achei", e ainda carrega o ponto de inserção: `-r - 1`. O método não verifica se o array está ordenado; com dados desordenados, o resultado simplesmente não tem garantia.',
    },
    {
      id: 'aprendiz-t4-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a busca binária não compensa numa `LinkedList`?',
      opcoes: [
        'Porque chegar ao elemento do meio exige percorrer os nós um a um, O(n)',
        'Porque `LinkedList` não pode ser ordenada',
        'Porque `LinkedList` não aceita números',
        'Porque a busca binária só funciona com tipos primitivos',
      ],
      resposta: 0,
      explicacao: 'A busca binária faz O(log n) comparações, mas cada uma pressupõe acesso direto à posição do meio. Numa lista ligada, `get(meio)` caminha até lá, e as caminhadas somam O(n). É o que a documentação de `Collections.binarySearch` avisa.',
    },
  ],
};

export default episodio;
