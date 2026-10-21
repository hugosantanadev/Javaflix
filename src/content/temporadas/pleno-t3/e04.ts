import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e04',
  minutos: 14,
  aula,
  armadilhas: [
    'Fila vazia: `poll()` e `peek()` devolvem `null`; `remove()` e `element()` lançam `NoSuchElementException`.',
    'Em `Deque`, `push`, `pop` e `peek` usam o começo; `offer` e `add` usam o fim; `poll` tira do começo.',
    '`push` equivale a `addFirst` e `pop` a `removeFirst`, que lança exceção se a pilha estiver vazia.',
    'O `toString` de uma `Deque` usada como pilha mostra do topo para a base; o de `Stack`, da base para o topo.',
    '`ArrayDeque` e `PriorityQueue` lançam `NullPointerException` com `null`; `LinkedList` aceita.',
    '`PriorityQueue` entrega o menor em `poll`, mas o `toString` e a iteração mostram o heap, não a ordem.',
    '`Queue` não tem `push` nem `pop`; esses métodos são de `Deque`.',
    '`Stack` é legado e sincronizado; a recomendação é usar `ArrayDeque`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Storing Elements in Stacks and Queues',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/stacks-queues/',
      tipo: 'documentacao',
      porque: 'As interfaces `Queue` e `Deque` com as tabelas de métodos que lançam exceção ou devolvem valor especial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The Queue Interface',
      url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/queue.html',
      tipo: 'documentacao',
      porque: 'A semântica de cada operação de fila, inclusive em filas com capacidade limitada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The Deque Interface',
      url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/deque.html',
      tipo: 'documentacao',
      porque: 'As operações nas duas pontas e o uso de `Deque` como pilha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.Deque',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html',
      tipo: 'documentacao',
      porque: 'As tabelas de equivalência entre os métodos de `Queue`, de pilha e de `Deque`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.PriorityQueue',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html',
      tipo: 'documentacao',
      porque: 'O aviso de que o iterador não percorre em ordem e o custo de cada operação no heap.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Introduction to the Java ArrayDeque',
      url: 'https://www.baeldung.com/java-array-deque',
      tipo: 'artigo',
      porque: '`ArrayDeque` como fila e como pilha, com os métodos de cada uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Deque vs. Stack',
      url: 'https://www.baeldung.com/java-deque-vs-stack',
      tipo: 'artigo',
      porque: 'Por que `Stack` é desaconselhada e o que muda ao trocar por `Deque`, inclusive a ordem de iteração.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Java PriorityQueue',
      url: 'https://www.baeldung.com/java-priorityqueue',
      tipo: 'artigo',
      porque: 'Ordem natural, comparadores e o heap por trás da fila de prioridade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Coleções pt 22, Queue, PriorityQueue',
      url: 'https://www.youtube.com/watch?v=Q6CiTfKsAQc',
      tipo: 'video',
      porque: 'Filas e filas de prioridade com comparadores, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: What are the main operations of a stack or a queue? (Cracking the Java Coding Interview)',
      url: 'https://www.youtube.com/watch?v=Nt2-PlW1iiQ',
      tipo: 'video',
      porque: 'As operações de pilha e fila na API do Java, no canal oficial da linguagem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'Cada fila do JDK por dentro, incluindo as bloqueantes, com a comparação de custos.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 14, "Queues": seções "Using the Methods of Queue", "PriorityQueue", "Deque" e "Comparing Queue Implementations"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de métodos de `Queue` e `Deque` que a prova usa para montar questões de saída.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Using the Queue and Deque Interfaces"',
    },
  ],
  desafio: {
    titulo: 'Validador de parênteses',
    enunciado:
      'Escreva `static String validar(String expressao)`, que confere se `()`, `[]` e `{}` estão balanceados usando uma `Deque<Character>` como pilha. Devolva `"ok"`, `"erro na posição N"` (a posição do fechamento que não combina ou que não tem abertura) ou `"faltam N fechamentos"`. Use `poll`, que devolve `null` com a pilha vazia, em vez de `pop`, que lançaria exceção. Para `"([]{()})"`, `"([)]"`, `"(("` e `"())"`, a saída deve ser:\n\n```text\n([]{()}) -> ok\n([)] -> erro na posição 2\n(( -> faltam 2 fechamentos\n()) -> erro na posição 2\n```',
    dicas: [
      'Um `Map.of(\')\', \'(\', \']\', \'[\', \'}\', \'{\')` diz qual abertura cada fechamento espera.',
      'Com `push`, o topo da pilha fica no começo da `Deque`, e `poll` tira justamente do começo.',
      'Compare `Character` com `equals`, não com `!=`, que compara referências.',
    ],
    solucao: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;
import java.util.Map;

public class Validador {
    static final Map<Character, Character> PARES = Map.of(')', '(', ']', '[', '}', '{');

    static String validar(String expressao) {
        Deque<Character> abertos = new ArrayDeque<>();
        for (int i = 0; i < expressao.length(); i++) {
            char c = expressao.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                abertos.push(c);
            } else if (PARES.containsKey(c)) {
                Character topo = abertos.poll();
                if (topo == null || !topo.equals(PARES.get(c))) {
                    return "erro na posição " + i;
                }
            }
        }
        return abertos.isEmpty() ? "ok" : "faltam " + abertos.size() + " fechamentos";
    }

    public static void main(String[] args) {
        for (String e : List.of("([]{()})", "([)]", "((", "())")) {
            System.out.println(e + " -> " + validar(e));
        }
    }
}`,
    saida: '([]{()}) -> ok\n([)] -> erro na posição 2\n(( -> faltam 2 fechamentos\n()) -> erro na posição 2',
    comentarios:
      'A pilha guarda as aberturas pendentes, e cada fechamento precisa casar com a mais recente: é o LIFO em ação. O `poll` resolve com um `null` o caso do fechamento sem abertura, sem precisar de `try`. O mesmo algoritmo aparece em compiladores, que conferem blocos aninhados, e em editores, que destacam o par de um parêntese.',
  },
  exercicios: [
    {
      id: 'pleno-t3-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(3);
        q.offer(1);
        q.add(2);
        System.out.println(q.poll() + " " + q.peek() + " " + q);
    }
}`,
      opcoes: ['`3 1 [1, 2]`', '`1 2 [2, 3]`', '`3 1 [3, 1, 2]`', '`2 1 [3, 1]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A fila é FIFO: sai o primeiro que entrou. `peek` só consulta, sem remover.',
    },
    {
      id: 'pleno-t3-e04-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Queue<String> q = new ArrayDeque<>();
        System.out.println(q.poll() + " " + q.peek());
    }
}`,
      opcoes: ['`null null`', 'Lança `NoSuchElementException`', 'Lança `NullPointerException`', 'Não imprime nada'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`poll` e `peek` sinalizam fila vazia devolvendo `null`. As versões que lançam exceção são `remove` e `element`.',
    },
    {
      id: 'pleno-t3-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Queue<String> q = new ArrayDeque<>();
        System.out.println(q.peek());
        System.out.println(q.element());
    }
}`,
      opcoes: [
        'Imprime `null` e lança `NoSuchElementException`',
        'Imprime `null` duas vezes',
        'Lança `NoSuchElementException` na primeira linha',
        'Imprime `null` e lança `NullPointerException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException', saida: 'null' },
      explicacao: '`peek` e `element` consultam o começo da fila; com ela vazia, o primeiro devolve `null` e o segundo lança exceção.',
    },
    {
      id: 'pleno-t3-e04-q04',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Deque<String> d = new ArrayDeque<>();
        d.push("a");
        d.offer("b");
        d.push("c");
        d.offerLast("d");
        System.out.println(d.pop() + d.pollLast() + d);
    }
}`,
      resposta: 'cd[a, b]',
      explicacao: '`push` insere no começo e `offer` no fim, formando `[c, a, b, d]`. `pop` tira do começo e `pollLast` do fim.',
    },
    {
      id: 'pleno-t3-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Deque<Integer> d = new ArrayDeque<>();
        Stack<Integer> s = new Stack<>();
        for (int i = 1; i <= 3; i++) {
            d.push(i);
            s.push(i);
        }
        System.out.println(d + " " + s);
    }
}`,
      opcoes: ['`[3, 2, 1] [1, 2, 3]`', '`[1, 2, 3] [1, 2, 3]`', '`[3, 2, 1] [3, 2, 1]`', '`[1, 2, 3] [3, 2, 1]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `push` da `Deque` insere no começo, que o `toString` mostra primeiro. A `Stack`, como `Vector`, acrescenta no fim do array e imprime da base para o topo.',
    },
    {
      id: 'pleno-t3-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Queue<String> a = new LinkedList<>();
        a.offer(null);
        System.out.println(a.size());
        Queue<String> b = new ArrayDeque<>();
        b.offer(null);
        System.out.println(b.size());
    }
}`,
      opcoes: [
        'Imprime `1` e lança `NullPointerException`',
        'Imprime `1` e `1`',
        'Imprime `0` e `0`',
        'Imprime `1` e `0`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: '1' },
      explicacao: '`LinkedList` aceita `null`. `ArrayDeque` rejeita, porque `null` é o que `poll` devolve para indicar fila vazia.',
    },
    {
      id: 'pleno-t3-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        PriorityQueue<String> pq = new PriorityQueue<>(List.of("pera", "banana", "uva", "abacaxi"));
        System.out.println(pq.poll() + " " + pq.poll() + " " + pq.size());
    }
}`,
      opcoes: ['`abacaxi banana 2`', '`pera banana 2`', '`uva pera 2`', '`abacaxi banana 4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A fila de prioridade entrega sempre o menor pela ordem natural, e `poll` remove o elemento.',
    },
    {
      id: 'pleno-t3-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(3);
        pq.offer(1);
        pq.offer(2);
        System.out.println(pq + " " + pq.peek());
    }
}`,
      opcoes: ['`[1, 3, 2] 1`', '`[1, 2, 3] 1`', '`[3, 1, 2] 3`', '`[3, 2, 1] 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `toString` mostra o array do heap. O 1 subiu para a raiz trocando com o 3, e o 2 entrou como segundo filho do 1, sem precisar subir.',
    },
    {
      id: 'pleno-t3-e04-q09',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método de pilha que remove e devolve o topo. O programa deve imprimir `ba`.',
      codigo: `import java.util.*;

public class Topo {
    public static void main(String[] args) {
        Deque<String> pilha = new ArrayDeque<>();
        pilha.push("a");
        pilha.push("b");
        System.out.println(pilha.___() + pilha.peek());
    }
}`,
      respostas: ['pop', 'removeFirst', 'pollFirst', 'poll', 'remove'],
      saida: 'ba',
      explicacao: '`pop` remove do começo da `Deque`, onde `push` coloca. `removeFirst`, `pollFirst`, `poll` e `remove` fazem o mesmo aqui.',
    },
    {
      id: 'pleno-t3-e04-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Numa `Deque`, quais destes métodos operam no **começo**? Escolha três.',
      opcoes: ['`push`', '`pop`', '`peek`', '`offer`', '`add`'],
      respostas: [0, 1, 2],
      explicacao: 'Os métodos de pilha usam o começo. `offer` e `add`, herdados de `Queue`, inserem no fim, como numa fila.',
    },
    {
      id: 'pleno-t3-e04-q11',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Queue<String> fila = new ArrayDeque<>();
        fila.offer("a");
        fila.add("b");
        fila.push("c");
        System.out.println(fila.poll());
    }
}`,
      resposta: 8,
      explicacao: 'O objeto é um `ArrayDeque`, mas a variável é `Queue`, e `Queue` não tem `push`. O compilador olha o tipo da referência.',
    },
    {
      id: 'pleno-t3-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Queue<String> q = new LinkedList<>();
        q.offer(null);
        q.offer("x");
        System.out.println(q.size() + " " + q.poll() + " " + q.poll());
    }
}`,
      opcoes: ['`2 null x`', '`1 x null`', '`2 x null`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A `LinkedList` aceita `null`, e o primeiro `poll` devolve o `null` guardado, indistinguível de "fila vazia". É por isso que as outras filas o proíbem.',
    },
    {
      id: 'pleno-t3-e04-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> a.length() - b.length());
        pq.addAll(List.of("ccc", "a", "bb"));
        StringBuilder sb = new StringBuilder();
        while (!pq.isEmpty()) {
            sb.append(pq.poll()).append(",");
        }
        System.out.println(sb);
    }
}`,
      resposta: 'a,bb,ccc,',
      explicacao: 'O comparador define a prioridade pelo tamanho. Consumir com `poll` até esvaziar entrega na ordem do comparador.',
    },
    {
      id: 'pleno-t3-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Deque<Integer> d = new ArrayDeque<>(List.of(1, 2, 3));
        System.out.println(d.pollFirst() + d.pollLast() + "" + d.pollFirst() + d.pollFirst());
    }
}`,
      opcoes: ['`42null`', '`132null`', '`4 2 null`', 'Lança `NoSuchElementException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os dois primeiros `Integer` são somados (1 + 3) antes de a concatenação começar. Depois vem o 2, e a última chamada encontra a `Deque` vazia e devolve `null`.',
    },
    {
      id: 'pleno-t3-e04-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que a documentação recomenda `ArrayDeque` em vez de `Stack` para pilhas?',
      opcoes: [
        '`Stack` estende `Vector` e sincroniza todos os métodos, um custo desnecessário na maioria dos usos',
        '`Stack` não tem os métodos `push` e `pop`',
        '`ArrayDeque` aceita `null`, e `Stack` não',
        '`Stack` foi removida no Java 17',
      ],
      resposta: 0,
      explicacao: '`Stack` é da época do Java 1.0. Ela continua existindo e funcionando, mas `Deque` oferece a mesma pilha com uma interface mais coerente e sem sincronização.',
    },
  ],
};

export default episodio;
