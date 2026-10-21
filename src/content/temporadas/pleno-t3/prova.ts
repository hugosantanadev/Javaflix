import type { Exercicio } from '../../types';

/** Prova da temporada Pleno T3: coleções. */
const prova: Exercicio[] = [
  {
    id: 'pleno-t3-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(10, 20, 30));
        l.remove(Integer.valueOf(10));
        l.remove(0);
        System.out.println(l);
    }
}`,
    opcoes: ['`[30]`', '`[20]`', '`[10, 30]`', 'Lança `IndexOutOfBoundsException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O primeiro `remove` recebe um `Integer` e remove o valor 10. O segundo recebe um `int` e remove a posição 0, onde agora está o 20.',
  },
  {
    id: 'pleno-t3-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        String[] a = {"x", "y"};
        List<String> l = Arrays.asList(a);
        l.set(1, "z");
        a[0] = "w";
        System.out.println(l + a[1]);
    }
}`,
    opcoes: ['`[w, z]z`', '`[x, z]y`', '`[w, y]z`', 'Lança `UnsupportedOperationException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`Arrays.asList` devolve uma visão do array: o `set` na lista escreve no array, e a escrita no array aparece na lista.',
  },
  {
    id: 'pleno-t3-prova-q03',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais declarações compilam? Escolha três.',
    opcoes: [
      '`Map<String, Integer> m = new TreeMap<>();`',
      '`Deque<Integer> d = new ArrayDeque<>();`',
      '`Queue<Integer> q = new LinkedList<>();`',
      '`List<Integer> l = new ArrayDeque<>();`',
      '`Set<Integer> s = new ArrayList<>();`',
      '`Collection<Integer> c = new HashMap<>();`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`ArrayDeque` não é `List`, `ArrayList` não é `Set`, e nenhum `Map` é `Collection`. A `LinkedList` implementa `List` e `Deque`, e portanto `Queue`.',
  },
  {
    id: 'pleno-t3-prova-q04',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeSet<String> t = new TreeSet<>(List.of("maçã", "banana", "uva", "kiwi"));
        System.out.println(t.first() + " " + t.ceiling("c") + " " + t.headSet("m"));
    }
}`,
    resposta: 'banana kiwi [banana, kiwi]',
    explicacao: 'Em ordem: banana, kiwi, maçã, uva. O menor a partir de "c" é "kiwi", e `headSet("m")` traz os menores que "m".',
  },
  {
    id: 'pleno-t3-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new TreeMap<>();
        for (String s : "a b a c b a".split(" ")) {
            m.merge(s, 1, Integer::sum);
        }
        System.out.println(m);
    }
}`,
    opcoes: ['`{a=3, b=2, c=1}`', '`{a=1, b=1, c=1}`', '`{a=3, b=2, c=1, a=1}`', '`{c=1, b=2, a=3}`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`merge` insere 1 na primeira ocorrência e soma 1 nas seguintes. O `TreeMap` ordena as chaves.',
  },
  {
    id: 'pleno-t3-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new TreeMap<>(Map.of("a", 1));
        System.out.println(m.get("z"));
        m.put(null, 0);
        System.out.println(m);
    }
}`,
    opcoes: [
      'Imprime `null` e lança `NullPointerException`',
      'Imprime `null` e `{null=0, a=1}`',
      'Lança `NullPointerException` no `get`',
      'Imprime `null` e `{a=1, null=0}`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'null' },
    explicacao: '`get` de uma chave ausente devolve `null`. Já uma chave `null` não pode ser comparada pela ordem natural, e o `TreeMap` a recusa.',
  },
  {
    id: 'pleno-t3-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Deque<Integer> d = new ArrayDeque<>();
        d.offer(1);
        d.offer(2);
        d.push(3);
        System.out.println(d.poll() + " " + d.pollLast() + " " + d.peek());
    }
}`,
    opcoes: ['`3 2 1`', '`1 3 2`', '`1 2 3`', '`3 1 2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`offer` insere no fim e `push` no começo, formando `[3, 1, 2]`. `poll` tira do começo, `pollLast` do fim, e sobra o 1.',
  },
  {
    id: 'pleno-t3-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        pq.addAll(List.of(4, 9, 1));
        System.out.println(pq.poll() + " " + pq.peek() + " " + pq.size());
    }
}`,
    opcoes: ['`9 4 2`', '`1 4 2`', '`4 9 2`', '`9 4 3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com a ordem inversa, a prioridade é do maior. `poll` remove o 9; `peek` consulta o próximo, o 4, sem remover.',
  },
  {
    id: 'pleno-t3-prova-q09',
    tipo: 'linha',
    dificuldade: 3,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("bb", "a"));
        l.sort(Comparator.comparing(String::length));
        l.sort(Comparator.comparing(String::length).reversed());
        l.sort(Comparator.comparing(s -> s.length()));
        l.sort(Comparator.comparing(s -> s.length()).reversed());
    }
}`,
    resposta: 9,
    explicacao: 'Na linha 8, o destino de `sort` informa o tipo da lambda. Na 9, `reversed()` é chamado sobre o resultado de `comparing`, e a lambda é inferida com `Object`, que não tem `length()`.',
  },
  {
    id: 'pleno-t3-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("b10", "b9", "B1", "a"));
        Collections.sort(l);
        System.out.println(l);
    }
}`,
    opcoes: ['`[B1, a, b10, b9]`', '`[a, B1, b9, b10]`', '`[a, b10, b9, B1]`', '`[B1, a, b9, b10]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Maiúsculas vêm antes das minúsculas, e a comparação é caractere a caractere: em "b10" e "b9", decide o "1" contra o "9".',
  },
  {
    id: 'pleno-t3-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    provas: ['830', '831'],
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(1, 2, 3));
        l.reversed().removeFirst();
        l.addFirst(0);
        System.out.println(l + " " + l.getLast());
    }
}`,
    opcoes: ['`[0, 1, 2] 2`', '`[0, 2, 3] 3`', '`[1, 2, 0] 0`', 'Lança `UnsupportedOperationException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O primeiro elemento da visão invertida é o último da original, então o 3 sai. `addFirst` põe o 0 no começo, e o último passa a ser o 2.',
  },
  {
    id: 'pleno-t3-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    provas: ['830', '831'],
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeMap<String, Integer> t = new TreeMap<>(Map.of("b", 2));
        System.out.println(t.firstEntry());
        t.putFirst("a", 1);
        System.out.println(t);
    }
}`,
    opcoes: [
      'Imprime `b=2` e lança `UnsupportedOperationException`',
      'Imprime `b=2` e `{a=1, b=2}`',
      'Não compila: `TreeMap` não tem `putFirst`',
      'Imprime `b=2` e `{b=2, a=1}`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: 'b=2' },
    explicacao: '`TreeMap` é um `SequencedMap`, então o método existe. Mas a posição das chaves é decidida pela ordenação, e `putFirst` é recusado.',
  },
  {
    id: 'pleno-t3-prova-q13',
    tipo: 'lacuna',
    dificuldade: 2,
    enunciado: 'Complete com o método de `Collections` que procura um valor numa lista ordenada em tempo logarítmico. O programa deve imprimir `2`.',
    codigo: `import java.util.*;

public class Busca {
    public static void main(String[] args) {
        List<Integer> l = List.of(2, 4, 6, 8);
        System.out.println(Collections.___(l, 6));
    }
}`,
    respostas: ['binarySearch'],
    saida: '2',
    explicacao: '`binarySearch` exige a lista ordenada e devolve o índice do valor, ou um negativo que indica onde ele entraria.',
  },
  {
    id: 'pleno-t3-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Set.copyOf(List.of(1, 1, 2)).size() + " " + Set.of(1, 2).equals(Set.of(2, 1)));
    }
}`,
    opcoes: ['`2 true`', '`3 true`', '`2 false`', 'Lança `IllegalArgumentException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`Set.copyOf` descarta repetidos sem erro, ao contrário de `Set.of`. E dois conjuntos são iguais quando têm os mesmos elementos, em qualquer ordem.',
  },
  {
    id: 'pleno-t3-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
    opcoes: [
      '`Collections.unmodifiableList(l)` reflete as mudanças feitas depois em `l`',
      '`List.copyOf` lança `NullPointerException` se a lista tiver um `null`',
      '`List.of` permite `set`, mas não `add`',
      '`Arrays.asList` permite `add`, mas não `set`',
      '`Collections.nCopies` devolve uma lista mutável',
    ],
    respostas: [0, 1],
    explicacao: 'A visão inalterável repassa as leituras à lista original. Quem permite `set` e não `add` é `Arrays.asList`; `List.of` e `nCopies` recusam qualquer alteração.',
  },
  {
    id: 'pleno-t3-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        l.removeIf(n -> n % 3 == 0);
        Iterator<Integer> it = l.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) {
                it.remove();
            }
        }
        System.out.println(l);
    }
}`,
    opcoes: ['`[1, 5]`', '`[1, 2, 4, 5]`', '`[1, 3, 5]`', 'Lança `ConcurrentModificationException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`removeIf` tira os múltiplos de 3, e o `remove` do iterador tira os pares com segurança. Sobram 1 e 5.',
  },
  {
    id: 'pleno-t3-prova-q17',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeMap<Integer, List<String>> m = new TreeMap<>();
        for (String s : List.of("aa", "b", "cc", "ddd")) {
            m.computeIfAbsent(s.length(), k -> new ArrayList<>()).add(s);
        }
        System.out.println(m.descendingMap() + " " + m.firstKey());
    }
}`,
    resposta: '{3=[ddd], 2=[aa, cc], 1=[b]} 1',
    explicacao: '`computeIfAbsent` agrupa as palavras por tamanho. `descendingMap` é uma visão com as chaves em ordem inversa, e `firstKey` continua sendo a menor do mapa original.',
  },
  {
    id: 'pleno-t3-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new HashMap<>(Map.of("a", 1));
        for (String chave : m.keySet()) {
            System.out.println(chave);
        }
        for (String chave : m) {
            System.out.println(chave);
        }
    }
}`,
    opcoes: [
      'Não compila: `Map` não é `Iterable`',
      'Compila e imprime `a` duas vezes',
      'Compila e imprime `a` e `a=1`',
      'Não compila: `keySet()` não pode ser usado no for-each',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 9 },
    explicacao: '`Map` não estende `Collection` nem `Iterable`. Para percorrer um mapa, use uma das visões: `keySet()`, `values()` ou `entrySet()`.',
  },
  {
    id: 'pleno-t3-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("b", "cc", "a", "ab"));
        l.sort(Comparator.comparing(String::length).thenComparing(Comparator.reverseOrder()));
        System.out.println(l);
    }
}`,
    opcoes: ['`[b, a, cc, ab]`', '`[a, b, ab, cc]`', '`[cc, ab, b, a]`', '`[b, a, ab, cc]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O critério principal é o tamanho, crescente. Só o desempate entre textos do mesmo tamanho usa a ordem alfabética inversa.',
  },
  {
    id: 'pleno-t3-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O que acontece quando um `ArrayList` com o array interno cheio recebe mais um elemento?',
    opcoes: [
      'Um array cerca de 50% maior é criado e os elementos são copiados para ele',
      'O elemento é guardado num nó ligado ao fim do array',
      'O `add` lança `IllegalStateException`',
      'O array dobra de tamanho no mesmo lugar da memória, sem cópia',
    ],
    resposta: 0,
    explicacao: 'Arrays têm tamanho fixo, então crescer exige um array novo e uma cópia. Como isso acontece cada vez mais raramente, o custo médio do `add` no fim continua constante.',
  },
];

export default prova;
