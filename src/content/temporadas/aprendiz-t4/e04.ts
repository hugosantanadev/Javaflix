import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t4-e04',
  minutos: 15,
  aula,
  armadilhas: [
    'Pilha é LIFO; fila é FIFO. `PriorityQueue` implementa `Queue`, mas não é FIFO.',
    '`poll` e `peek` devolvem `null` com a estrutura vazia; `remove`, `element` e `pop` lançam `NoSuchElementException`.',
    '`ArrayDeque` não aceita `null`: `offer(null)` lança `NullPointerException`.',
    'Evite `java.util.Stack`: é legada e sincronizada. Use `Deque<T> pilha = new ArrayDeque<>()`.',
    'No `ArrayDeque` usado como pilha, `push` insere no começo, e o `toString` mostra o topo primeiro.',
    '`LinkedList.get(i)` é O(n): é preciso caminhar pelos nós.',
    'Coleções genéricas não aceitam primitivos: `Queue<int>` não compila; use `Queue<Integer>`.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de Deque',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html',
      tipo: 'documentacao',
      porque: 'As tabelas que mostram cada método como fila e como pilha, e qual lança exceção ou devolve valor especial.',
      gratuito: true,
      idioma: 'en',
      onde: 'Tabelas "Summary of Deque methods" e "Comparison of Stack and Deque methods"',
    },
    {
      titulo: 'Javadoc de Stack',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Stack.html',
      tipo: 'documentacao',
      porque: 'A própria documentação recomenda trocar `Stack` por `Deque`, com o exemplo de código.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de ArrayDeque',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html',
      tipo: 'documentacao',
      porque: 'Por que ela é mais rápida que `Stack` como pilha e que `LinkedList` como fila, e por que proíbe `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The Queue Interface',
      url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/queue.html',
      tipo: 'tutorial',
      porque: 'As duas formas de cada operação da fila e um exemplo de contagem regressiva com `Queue`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Pilha (informática)',
      url: 'https://pt.wikipedia.org/wiki/Pilha_(inform%C3%A1tica)',
      tipo: 'artigo',
      porque: 'Operações, implementações e aplicações da pilha, incluindo avaliação de expressões.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Lista ligada',
      url: 'https://pt.wikipedia.org/wiki/Lista_ligada',
      tipo: 'artigo',
      porque: 'Listas simplesmente e duplamente ligadas, circulares, e a comparação com arrays.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Baeldung: Introduction to the Java ArrayDeque',
      url: 'https://www.baeldung.com/java-array-deque',
      tipo: 'artigo',
      porque: 'O `ArrayDeque` usado como pilha e como fila, com os métodos de cada uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Bóson Treinamentos: Listas, Pilhas e Filas, qual a diferença?',
      url: 'https://www.youtube.com/watch?v=OwiHoj-mAi8',
      tipo: 'video',
      porque: 'Tipos abstratos, LIFO, FIFO, listas encadeadas, filas duplas e circulares, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Estrutura de Dados com Java, Lista Encadeada (introdução)',
      url: 'https://www.youtube.com/watch?v=RW0oD2L_tSg',
      tipo: 'video',
      porque: 'O começo do módulo de lista encadeada do curso gratuito de estruturas de dados em Java da Loiane.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'HackerRank: Data Structures, Stacks and Queues',
      url: 'https://www.youtube.com/watch?v=wjI1WNcIntg',
      tipo: 'video',
      porque: 'Gayle Laakmann McDowell implementa pilha e fila em Java com nós ligados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'VisuAlgo: Linked List, Stack, Queue, Deque',
      url: 'https://visualgo.net/en/list',
      tipo: 'ferramenta',
      porque: 'Insira e remova elementos e veja as referências entre os nós mudarem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Algorithms, 4th Edition: Bags, Queues, and Stacks (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/13stacks/',
      tipo: 'tutorial',
      porque: 'Pilha e fila implementadas em Java com array redimensionável e com lista ligada, e o algoritmo de Dijkstra para avaliar expressões com duas pilhas.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 1.3',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Calculadora pós-fixa',
    enunciado:
      'Na notação pós-fixa (polonesa reversa), o operador vem depois dos operandos: `3 4 + 2 *` significa (3 + 4) × 2. Escreva `calcular(String expressao)`, que avalia uma expressão pós-fixa com inteiros e os operadores `+`, `-`, `*` e `/`, usando uma pilha. Imprima:\n\n```text\n3 4 + 2 * = 14\n5 1 2 + 4 * + 3 - = 14\n2 3 4 * + = 14\n10 2 8 * + 3 - = 23\n```',
    dicas: [
      'Separe os pedaços com `expressao.split(" ")`.',
      'Número: empilhe. Operador: desempilhe dois, calcule e empilhe o resultado.',
      'Cuidado com a ordem: o primeiro `pop` é o operando da **direita**.',
      'No fim, a pilha deve ter exatamente um elemento: o resultado.',
    ],
    solucao: `import java.util.ArrayDeque;
import java.util.Deque;

public class PosFixa {
    static int calcular(String expressao) {
        Deque<Integer> pilha = new ArrayDeque<>();
        for (String parte : expressao.split(" ")) {
            switch (parte) {
                case "+", "-", "*", "/" -> {
                    int direita = pilha.pop();
                    int esquerda = pilha.pop();
                    pilha.push(switch (parte) {
                        case "+" -> esquerda + direita;
                        case "-" -> esquerda - direita;
                        case "*" -> esquerda * direita;
                        default -> esquerda / direita;
                    });
                }
                default -> pilha.push(Integer.parseInt(parte));
            }
        }
        if (pilha.size() != 1) {
            throw new IllegalArgumentException("expressão malformada: " + expressao);
        }
        return pilha.pop();
    }

    public static void main(String[] args) {
        for (String e : new String[] {"3 4 + 2 *", "5 1 2 + 4 * + 3 -", "2 3 4 * +", "10 2 8 * + 3 -"}) {
            System.out.println(e + " = " + calcular(e));
        }
    }
}`,
    saida: '3 4 + 2 * = 14\n5 1 2 + 4 * + 3 - = 14\n2 3 4 * + = 14\n10 2 8 * + 3 - = 23',
    comentarios:
      'A notação pós-fixa não precisa de parênteses nem de regras de precedência: a ordem dos símbolos já diz tudo. Por isso calculadoras HP antigas a usavam, e por isso o bytecode da JVM é pós-fixo: `iload a, iload b, imul, iload c, iadd` é `a b * c +`. Converter uma expressão comum para pós-fixa também se faz com uma pilha, no algoritmo shunting-yard de Dijkstra.',
  },
  exercicios: [
    {
      id: 'aprendiz-t4-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual estrutura segue a regra "o último a entrar é o primeiro a sair" (LIFO)?',
      opcoes: ['Pilha', 'Fila', 'Fila de prioridade', 'Lista ordenada'],
      resposta: 0,
      explicacao: 'Na pilha, só o topo é acessível: o último empilhado é o primeiro a sair. A fila é FIFO, e a fila de prioridade entrega o menor (ou o de maior prioridade), qualquer que seja a ordem de chegada.',
    },
    {
      id: 'aprendiz-t4-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `Deque<String> p = new ArrayDeque<>();
p.push("a");
p.push("b");
p.push("c");
p.pop();
p.push("d");
System.out.println(p.peek() + " " + p.size() + " " + p);`,
      resposta: 'd 3 [d, b, a]',
      explicacao: 'Depois de empilhar a, b, c, o `pop` tira o c, e o `push` coloca o d no topo. `peek` mostra o topo sem remover. O `push` do `ArrayDeque` insere no começo, então o `toString` lista do topo para a base.',
    },
    {
      id: 'aprendiz-t4-e04-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `Queue<Integer> f = new ArrayDeque<>();
f.offer(1);
f.offer(2);
f.offer(3);
f.poll();
f.offer(4);
System.out.println(f);`,
      opcoes: ['`[2, 3, 4]`', '`[1, 2, 3]`', '`[4, 2, 3]`', '`[1, 2, 4]`', '`[2, 3]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Fila é FIFO: `poll` tira o primeiro a ter entrado, o 1, e `offer` põe o 4 no fim.',
    },
    {
      id: 'aprendiz-t4-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `Queue<Integer> q = new PriorityQueue<>();
q.offer(7);
q.offer(3);
q.offer(9);
q.offer(1);
System.out.println(q.poll() + " " + q.poll());`,
      opcoes: ['`1 3`', '`7 3`', '`9 7`', '`1 9`', '`7 9`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A `PriorityQueue` sempre entrega o menor elemento (pela ordem natural), não o primeiro que entrou. Por dentro é um *heap* binário: `poll` custa O(log n).',
    },
    {
      id: 'aprendiz-t4-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `Deque<Integer> pilha = new ArrayDeque<>();
System.out.println(pilha.pop());`,
      opcoes: [
        'Lança `NoSuchElementException`',
        'Imprime `null`',
        'Lança `EmptyStackException`',
        'Lança `NullPointerException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException' },
      explicacao: '`pop` é o equivalente de `removeFirst`, que lança `NoSuchElementException` com o deque vazio. Para receber `null` em vez de exceção, use `poll`. `EmptyStackException` é da classe legada `Stack`.',
    },
    {
      id: 'aprendiz-t4-e04-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais métodos de `Queue` devolvem `null`, em vez de lançar exceção, quando a fila está vazia? Escolha dois.',
      opcoes: ['`poll()`', '`peek()`', '`remove()`', '`element()`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'null null true true' },
      codigoVerificacao: `Queue<Integer> q = new ArrayDeque<>();
boolean r = false, e = false;
try { q.remove(); } catch (NoSuchElementException x) { r = true; }
try { q.element(); } catch (NoSuchElementException x) { e = true; }
System.out.println(q.poll() + " " + q.peek() + " " + r + " " + e);`,
      explicacao: 'A interface `Queue` oferece cada operação em duas versões: `remove`/`element` lançam `NoSuchElementException`, e `poll`/`peek` devolvem `null`. Escolha conforme fila vazia seja erro ou situação normal.',
    },
    {
      id: 'aprendiz-t4-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que preferir `ArrayDeque` a `java.util.Stack` para uma pilha?',
      opcoes: [
        '`Stack` é legada: estende `Vector`, tem métodos sincronizados e permite acesso a qualquer posição',
        '`Stack` não tem o método `push`',
        '`ArrayDeque` não tem limite de memória',
        '`Stack` só aceita números',
      ],
      resposta: 0,
      explicacao: 'A sincronização tem custo mesmo quando só uma thread usa a pilha, e herdar de `Vector` expõe métodos como `get(i)` e `add(i, x)`, que não fazem sentido numa pilha. A documentação de `Stack` recomenda `Deque`.',
    },
    {
      id: 'aprendiz-t4-e04-q08',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Nos {
    record No(int valor, No proximo) {}

    public static void main(String[] args) {
        No lista = null;
        for (int v = 1; v <= 3; v++) {
            lista = new No(v, lista);
        }
        for (No n = lista; n != null; n = n.proximo()) {
            System.out.print(n.valor());
        }
        System.out.println();
    }
}`,
      resposta: '321',
      explicacao: 'Cada novo nó é inserido no começo e aponta para a cabeça anterior. O último inserido, o 3, vira a cabeça, e a lista é percorrida a partir dele: 3, 2, 1. Inserir no começo inverte a ordem de chegada, como uma pilha.',
    },
    {
      id: 'aprendiz-t4-e04-q09',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o operador que faz o índice dar a volta no array circular. O programa deve imprimir `0`.',
      codigo: `public class Circular {
    public static void main(String[] args) {
        int capacidade = 4;
        int posicao = 3;
        posicao = (posicao + 1) ___ capacidade;
        System.out.println(posicao);
    }
}`,
      respostas: ['%'],
      saida: '0',
      explicacao: 'Na última posição (3), avançar leva a 4, que não existe num array de 4. O resto por 4 traz de volta para 0: é a aritmética modular que transforma o array numa fila circular.',
    },
    {
      id: 'aprendiz-t4-e04-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o custo de `LinkedList.get(i)` numa lista de n elementos?',
      opcoes: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
      resposta: 0,
      explicacao: 'Não há como pular direto para o nó i: é preciso seguir as referências desde uma das pontas (a `LinkedList` começa pela mais próxima, mas ainda é O(n)). Num `ArrayList`, `get(i)` é uma conta de endereço, O(1).',
    },
    {
      id: 'aprendiz-t4-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `Queue<String> fila = new ArrayDeque<>();
fila.offer("a");
fila.offer(null);
System.out.println(fila.size());`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `2`',
        'Imprime `1`',
        '`offer` devolve `false` e imprime `1`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'O `ArrayDeque` proíbe `null`, porque `poll` e `peek` usam `null` para dizer "vazio": se `null` pudesse ser elemento, seria impossível distinguir os dois casos. A `LinkedList` aceita `null`, e esse é um dos motivos de ela ser uma fila pior.',
    },
    {
      id: 'aprendiz-t4-e04-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destes problemas são resolvidos naturalmente com uma **fila** (FIFO)? Escolha dois.',
      opcoes: [
        'Busca em largura num grafo',
        'Atender pedidos na ordem em que chegaram',
        'Desfazer a última ação de um editor',
        'Verificar se os parênteses de uma expressão estão balanceados',
        'Guardar as chamadas de método pendentes',
      ],
      respostas: [0, 1],
      explicacao: 'A busca em largura visita os vértices na ordem em que foram descobertos, e o atendimento justo segue a ordem de chegada: FIFO. Desfazer, parênteses e a pilha de chamadas dependem do mais recente: LIFO.',
    },
    {
      id: 'aprendiz-t4-e04-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Filas {
    public static void main(String[] args) {
        Queue<Integer> a = new ArrayDeque<>();
        Deque<String> b = new ArrayDeque<>();
        Queue<int> c = new ArrayDeque<>();
        a.offer(1);
        b.push("x");
        System.out.println(a + " " + b);
    }
}`,
      resposta: 7,
      explicacao: 'Argumentos de tipo genérico precisam ser tipos de referência. `int` é primitivo; use `Integer`, como na linha 5, e o autoboxing converte os valores automaticamente.',
    },
    {
      id: 'aprendiz-t4-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quanto vale a expressão pós-fixa `3 4 + 2 *`, avaliada com uma pilha?',
      opcoes: ['14', '11', '24', '10', '9'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '14' },
      codigoVerificacao: `Deque<Integer> p = new ArrayDeque<>();
p.push(3);
p.push(4);
p.push(p.pop() + p.pop());
p.push(2);
p.push(p.pop() * p.pop());
System.out.println(p.pop());`,
      explicacao: 'Empilha 3 e 4; o `+` desempilha os dois e empilha 7; empilha 2; o `*` desempilha 2 e 7 e empilha 14. Em notação comum, (3 + 4) × 2. O 11 seria 3 + 4 × 2, outra expressão.',
    },
    {
      id: 'aprendiz-t4-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Na teoria, inserir no meio de uma `LinkedList` é O(1). Por que, na prática, um `ArrayList` costuma ser mais rápido até para inserções no meio?',
      opcoes: [
        'Porque achar a posição na lista ligada já custa O(n), com saltos espalhados na memória, enquanto o array desloca um bloco contíguo, que o cache e a CPU copiam muito rápido',
        'Porque o `ArrayList` usa uma árvore por dentro',
        'Porque a `LinkedList` copia a lista inteira a cada inserção',
        'Porque o `ArrayList` nunca precisa deslocar elementos',
      ],
      resposta: 0,
      explicacao: 'O O(1) da lista ligada vale só quando você já tem o nó em mãos. Chegar até ele é uma caminhada de O(n) por nós espalhados, cada um uma provável falha de cache. O array também é O(n) para deslocar, mas é uma cópia de memória contígua, uma das operações mais rápidas do processador.',
    },
  ],
};

export default episodio;
