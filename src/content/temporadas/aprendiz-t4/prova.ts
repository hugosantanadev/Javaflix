import type { Exercicio } from '../../types';

/** Prova da temporada Aprendiz T4: algoritmos e estruturas de dados. */
const prova: Exercicio[] = [
  {
    id: 'aprendiz-t4-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Misterio {
    static int f(int n) {
        if (n <= 1) {
            return n;
        }
        return f(n / 2) + n % 2;
    }

    public static void main(String[] args) {
        System.out.println(f(13) + " " + f(16) + " " + f(255));
    }
}`,
    opcoes: ['`3 1 8`', '`4 5 8`', '`13 16 255`', '`1 1 1`', '`3 4 7`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A cada chamada, `n % 2` é o último bit de n e `n / 2` descarta esse bit: a função conta os bits 1. 13 = 1101 tem três, 16 = 10000 tem um e 255 = 11111111 tem oito. É o que `Integer.bitCount` faz.',
  },
  {
    id: 'aprendiz-t4-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a complexidade de tempo do Fibonacci recursivo **com memoização** para calcular fib(n)?',
    opcoes: ['O(n)', 'O(2ⁿ)', 'O(n²)', 'O(log n)', 'O(1)'],
    resposta: 0,
    explicacao: 'Com memoização, cada fib(k) de 2 a n é calculado uma única vez, fazendo trabalho constante além das chamadas, e as chamadas repetidas voltam na hora. Sem memoização, a árvore de chamadas cresce como 1,6ⁿ.',
  },
  {
    id: 'aprendiz-t4-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Regua {
    static void f(int n) {
        if (n == 0) {
            return;
        }
        f(n - 1);
        System.out.print(n);
        f(n - 1);
    }

    public static void main(String[] args) {
        f(3);
        System.out.println();
    }
}`,
    opcoes: ['`1213121`', '`123`', '`321`', '`1231231`', '`3121213`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'f(1) imprime "1". f(2) imprime f(1), "2", f(1): "121". f(3) imprime "121", "3", "121". São 2ⁿ − 1 = 7 dígitos, e a sequência é exatamente a dos discos movidos na Torre de Hanói com 3 discos.',
  },
  {
    id: 'aprendiz-t4-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int[] v = {3, 6, 9, 12};
System.out.println(Arrays.binarySearch(v, 1) + " " + Arrays.binarySearch(v, 13));`,
    opcoes: ['`-1 -5`', '`-1 -1`', '`0 4`', '`-1 -4`', '`-0 -4`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O 1 entraria na posição 0, então o retorno é −0 − 1 = −1. O 13 entraria depois do último, na posição 4: −4 − 1 = −5. O "−1" da fórmula existe para que o ponto de inserção 0 também dê negativo.',
  },
  {
    id: 'aprendiz-t4-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'No pior caso, quantas comparações com elementos a busca binária faz num array ordenado de 100 elementos?',
    opcoes: ['7', '50', '100', '10', '6'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '7' },
    codigoVerificacao: `System.out.println(32 - Integer.numberOfLeadingZeros(100));`,
    explicacao: 'São ⌊log₂ 100⌋ + 1 = 6 + 1 = 7, porque 2⁶ = 64 ≤ 100 < 128 = 2⁷. O 50 seria a média da busca linear, e o 6 esquece a última comparação.',
  },
  {
    id: 'aprendiz-t4-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'A "busca binária na resposta" calcula, por exemplo, a raiz quadrada inteira de n procurando o maior x com x² ≤ n. Qual propriedade a pergunta testada precisa ter para isso funcionar?',
    opcoes: [
      'Ser monótona: a resposta muda de "sim" para "não" uma única vez ao longo do intervalo',
      'Ter resposta sempre verdadeira',
      'Envolver apenas números primos',
      'Poder ser respondida em O(1) sem nenhum cálculo',
    ],
    resposta: 0,
    explicacao: 'A busca binária descarta metade do intervalo com base numa resposta. Isso só é seguro se, sabendo a resposta no meio, você souber a resposta de um lado inteiro. "x² ≤ n" é sim para todo x pequeno e não a partir de um ponto. O custo de cada pergunta pode ser qualquer um.',
  },
  {
    id: 'aprendiz-t4-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O código faz **uma** partição do quicksort (esquema de Lomuto, pivô no último elemento). Qual é a saída?',
    codigo: `int[] a = {9, 2, 7, 4, 5};
int pivo = a[4];
int i = 0;
for (int j = 0; j < 4; j++) {
    if (a[j] < pivo) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
        i++;
    }
}
int t = a[i]; a[i] = a[4]; a[4] = t;
System.out.println(Arrays.toString(a) + " " + i);`,
    opcoes: [
      '`[2, 4, 5, 9, 7] 2`',
      '`[2, 4, 5, 7, 9] 2`',
      '`[4, 2, 5, 9, 7] 2`',
      '`[2, 4, 5, 9, 7] 4`',
      '`[9, 2, 7, 4, 5] 4`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os menores que 5 (o 2 e o 4) vão para o começo, na ordem em que aparecem; depois o pivô é trocado para a posição 2, a sua posição final. O lado direito (9, 7) ainda não está ordenado: isso fica para a chamada recursiva. Partição não é ordenação.',
  },
  {
    id: 'aprendiz-t4-prova-q08',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais algoritmos de ordenação são estáveis, na forma clássica? Escolha dois.',
    opcoes: ['Merge sort', 'Insertion sort', 'Quicksort', 'Selection sort', 'Heap sort'],
    respostas: [0, 1],
    explicacao: 'O merge sort tira do lado esquerdo nos empates, e o insertion sort não ultrapassa elementos iguais. Quicksort, selection sort e heap sort fazem trocas de longa distância que podem inverter elementos iguais. É por isso que o Java usa TimSort, derivado do merge sort, para objetos.',
  },
  {
    id: 'aprendiz-t4-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Quantos níveis de recursão, aproximadamente, o merge sort tem para ordenar 1.048.576 elementos?',
    opcoes: ['20', '1.048.576', '1.000', '524.288', '10'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '20' },
    codigoVerificacao: `System.out.println(31 - Integer.numberOfLeadingZeros(1_048_576));`,
    explicacao: '1.048.576 = 2²⁰, e cada nível divide os pedaços ao meio: 20 níveis até chegar a pedaços de 1. Cada nível intercala n elementos no total, e daí vem n log n ≈ 21 milhões de operações.',
  },
  {
    id: 'aprendiz-t4-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `List<String> nomes = new ArrayList<>(List.of("Bia", "Ana", "Caio", "Lu", "Duda"));
nomes.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.reverseOrder()));
System.out.println(nomes);`,
    opcoes: [
      '`[Lu, Bia, Ana, Duda, Caio]`',
      '`[Lu, Ana, Bia, Caio, Duda]`',
      '`[Lu, Bia, Ana, Caio, Duda]`',
      '`[Duda, Caio, Bia, Ana, Lu]`',
      '`[Ana, Bia, Caio, Duda, Lu]`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O primeiro critério é o tamanho: Lu (2), depois os de 3 letras, depois os de 4. Nos empates, `thenComparing(Comparator.reverseOrder())` ordena em ordem alfabética **inversa**: Bia antes de Ana, Duda antes de Caio.',
  },
  {
    id: 'aprendiz-t4-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `Deque<Integer> d = new ArrayDeque<>();
d.offer(1);
d.push(2);
d.offer(3);
d.push(4);
System.out.println(d.poll() + " " + d.pollLast() + " " + d);`,
    opcoes: ['`4 3 [2, 1]`', '`1 4 [2, 3]`', '`4 1 [2, 3]`', '`1 3 [2, 4]`', '`4 3 [1, 2]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`offer` insere no fim e `push` no começo. Depois das quatro operações, o deque é [4, 2, 1, 3]. `poll` tira do começo (4), `pollLast` tira do fim (3), e sobra [2, 1].',
  },
  {
    id: 'aprendiz-t4-prova-q12',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Com um `ArrayDeque` vazio, quais métodos lançam `NoSuchElementException`? Escolha três.',
    opcoes: ['`pop()`', '`remove()`', '`element()`', '`poll()`', '`peek()`'],
    respostas: [0, 1, 2],
    verificar: { tipo: 'executa', saida: 'true true true false false' },
    codigoVerificacao: `Deque<Integer> d = new ArrayDeque<>();
boolean[] lanca = new boolean[5];
try { d.pop(); } catch (NoSuchElementException e) { lanca[0] = true; }
try { d.remove(); } catch (NoSuchElementException e) { lanca[1] = true; }
try { d.element(); } catch (NoSuchElementException e) { lanca[2] = true; }
try { d.poll(); } catch (NoSuchElementException e) { lanca[3] = true; }
try { d.peek(); } catch (NoSuchElementException e) { lanca[4] = true; }
System.out.println(lanca[0] + " " + lanca[1] + " " + lanca[2] + " " + lanca[3] + " " + lanca[4]);`,
    explicacao: '`pop`, `remove` e `element` são as versões que lançam exceção. `poll` e `peek` devolvem `null`, e é por isso que o `ArrayDeque` não aceita `null` como elemento.',
  },
  {
    id: 'aprendiz-t4-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o custo de inverter uma lista simplesmente ligada de n nós, mudando só as referências?',
    opcoes: [
      'O(n) de tempo e O(1) de memória extra',
      'O(n²) de tempo e O(1) de memória extra',
      'O(n) de tempo e O(n) de memória extra, obrigatoriamente',
      'O(log n) de tempo',
      'O(1): basta trocar a cabeça pela cauda',
    ],
    resposta: 0,
    explicacao: 'Uma passada pela lista basta, com três variáveis (anterior, atual e próximo) virando cada seta para trás. Uma versão recursiva também é O(n), mas gasta O(n) de pilha. Trocar só a cabeça e a cauda deixaria todas as setas do meio apontando para o lado errado.',
  },
  {
    id: 'aprendiz-t4-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `TreeSet<Integer> s = new TreeSet<>(List.of(50, 20, 80, 10, 30));
System.out.println(s.first() + " " + s.higher(20) + " " + s.lower(10) + " " + s.headSet(30));`,
    opcoes: [
      '`10 30 null [10, 20]`',
      '`50 30 null [10, 20]`',
      '`10 30 10 [10, 20, 30]`',
      '`10 50 null [50, 20]`',
      'Lança `NoSuchElementException`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `TreeSet` mantém os elementos ordenados: `first` é o menor. `higher(20)` é o menor estritamente maior que 20, e `lower(10)` não existe, então devolve `null` (só `first` e `last` lançam exceção em conjunto vazio). `headSet(30)` exclui o 30.',
  },
  {
    id: 'aprendiz-t4-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `record Chave(String a, int b) {}

Map<Chave, String> m = new HashMap<>();
m.put(new Chave("x", 1), "um");
m.put(new Chave("x", 1), "dois");
System.out.println(m.size() + " " + m.get(new Chave("x", 1)));`,
    opcoes: ['`1 dois`', '`2 dois`', '`2 um`', '`1 um`', '`1 null`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Records geram `equals` e `hashCode` a partir dos componentes: os três objetos `Chave("x", 1)` são iguais e têm o mesmo hash. O segundo `put` substitui o valor da mesma chave, e o `get` com um terceiro objeto igual o encontra.',
  },
  {
    id: 'aprendiz-t4-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Uma árvore binária de busca **balanceada** guarda 1 milhão de chaves. Quantas comparações uma busca faz, aproximadamente, no pior caso?',
    opcoes: ['Cerca de 20', 'Cerca de 1 milhão', 'Cerca de 1.000', 'Cerca de 500 mil', '1'],
    resposta: 0,
    explicacao: 'Numa árvore bem balanceada, a altura é cerca de log₂ n, e 2²⁰ ≈ 1 milhão. A rubro-negra do `TreeMap` tolera um pouco de desequilíbrio (altura de até 2 log₂ n), mas continua na casa das dezenas. Uma BST sem balanceamento, alimentada com chaves ordenadas, chegaria a 1 milhão.',
  },
  {
    id: 'aprendiz-t4-prova-q17',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais operações têm custo O(log n) **garantido no pior caso**? Escolha duas.',
    opcoes: [
      '`TreeMap.get`',
      '`PriorityQueue.poll`',
      '`HashMap.get`',
      '`ArrayList.contains`',
      'Busca numa árvore binária de busca sem balanceamento',
    ],
    respostas: [0, 1],
    explicacao: 'A árvore rubro-negra e o heap binário têm altura logarítmica sempre. O `HashMap.get` é O(1) em média, mas o pior caso depende das colisões. `ArrayList.contains` é O(n), e uma BST sem balanceamento pode degenerar para O(n).',
  },
  {
    id: 'aprendiz-t4-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a ordem de visita da BFS a partir do vértice 1?',
    codigo: `Map<Integer, List<Integer>> g = Map.of(
        1, List.of(3, 2), 2, List.of(4), 3, List.of(4, 5),
        4, List.of(6), 5, List.of(), 6, List.of());
List<Integer> ordem = new ArrayList<>();
Set<Integer> vistos = new HashSet<>(Set.of(1));
Deque<Integer> fila = new ArrayDeque<>(List.of(1));
while (!fila.isEmpty()) {
    int v = fila.poll();
    ordem.add(v);
    for (int w : g.get(v)) {
        if (vistos.add(w)) fila.offer(w);
    }
}
System.out.println(ordem);`,
    opcoes: [
      '`[1, 3, 2, 4, 5, 6]`',
      '`[1, 2, 3, 4, 5, 6]`',
      '`[1, 3, 4, 6, 5, 2]`',
      '`[1, 2, 4, 6, 3, 5]`',
      '`[6, 5, 4, 3, 2, 1]`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A fila respeita a ordem de descoberta: os vizinhos de 1 entram como 3 e 2; o 3 descobre 4 e 5; o 2 não descobre nada novo; o 4 descobre o 6. A DFS, indo fundo, daria 1, 3, 4, 6, 5, 2.',
  },
  {
    id: 'aprendiz-t4-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'No algoritmo de Kahn para ordenação topológica, como se descobre que o grafo de dependências tem um ciclo?',
    opcoes: [
      'A ordem produzida termina com menos vértices que o grafo, porque os do ciclo nunca chegam a ter zero dependências pendentes',
      'A fila fica com mais vértices que o grafo',
      'Algum vértice é visitado duas vezes',
      'O algoritmo entra em laço infinito',
    ],
    resposta: 0,
    explicacao: 'Um vértice só entra na fila quando todas as suas dependências já saíram. Num ciclo, cada vértice espera por outro do próprio ciclo, e nenhum é liberado. O algoritmo termina normalmente, mas sem eles: comparar o tamanho da ordem com o número de vértices revela o ciclo.',
  },
  {
    id: 'aprendiz-t4-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Por que a BFS não serve para achar o caminho mais curto num mapa em que cada rua tem uma distância diferente?',
    opcoes: [
      'Porque ela minimiza o número de arestas, não a soma dos pesos; com pesos, usa-se Dijkstra, com fila de prioridade',
      'Porque a BFS não funciona em grafos com mais de mil vértices',
      'Porque a BFS só funciona em árvores',
      'Porque grafos com pesos não podem ser guardados em listas de adjacência',
    ],
    resposta: 0,
    explicacao: 'Um caminho com duas ruas longas pode ser pior que um com cinco ruas curtas, e a BFS escolheria o de duas. O Dijkstra troca a fila comum por uma fila de prioridade ordenada pela distância acumulada, e sempre expande o vértice mais próximo ainda não resolvido.',
  },
];

export default prova;
