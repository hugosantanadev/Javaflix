import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e06',
  minutos: 13,
  aula,
  armadilhas: [
    'As sequenced collections são do Java 21: no Java 17, `List` não tem `getFirst`, `getLast` nem `reversed`.',
    '`HashSet` e `HashMap` não implementam as interfaces sequenciadas; `LinkedHashSet`, `TreeSet`, `LinkedHashMap` e `TreeMap` implementam.',
    '`reversed()` devolve uma visão: alterá-la altera a original, com as pontas trocadas.',
    '`addFirst`/`addLast` num `LinkedHashSet` movem um elemento que já existe para a ponta, sem duplicar.',
    '`addFirst` e `addLast` num `TreeSet`, e `putFirst` e `putLast` num `TreeMap`, lançam `UnsupportedOperationException`.',
    '`getFirst`, `getLast`, `removeFirst` e `removeLast` numa coleção vazia lançam `NoSuchElementException`.',
    'Em coleções imutáveis, os métodos de leitura funcionam e os de alteração lançam `UnsupportedOperationException`.',
    '`LinkedList.reversed()` devolve `LinkedList`, por ser ao mesmo tempo `List` e `Deque`.',
  ],
  recursos: [
    {
      titulo: 'JEP 431: Sequenced Collections',
      url: 'https://openjdk.org/jeps/431',
      tipo: 'documentacao',
      porque: 'A motivação, o desenho das três interfaces e os riscos de compatibilidade da mudança.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.SequencedCollection',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedCollection.html',
      tipo: 'documentacao',
      porque: 'Os métodos, as implementações padrão e a definição de ordem de encontro.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.SequencedMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedMap.html',
      tipo: 'documentacao',
      porque: 'As operações de entrada nas pontas e as visões sequenciadas de chaves, valores e pares.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.SequencedSet',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedSet.html',
      tipo: 'documentacao',
      porque: 'O conjunto sequenciado e o `reversed()` que devolve outro `SequencedSet`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Sequenced Collections in Java',
      url: 'https://www.baeldung.com/java-21-sequenced-collections',
      tipo: 'artigo',
      porque: 'Os métodos novos aplicados a listas, conjuntos e mapas, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Sequenced Collections, JEP Café #19',
      url: 'https://www.youtube.com/watch?v=8RVr6VTfRvw',
      tipo: 'video',
      porque: 'José Paumard apresenta as interfaces novas no canal oficial do Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Inside Java Newscast #45, Java 21\'s New (Sequenced) Collections',
      url: 'https://www.youtube.com/watch?v=9G_0el3RWPE',
      tipo: 'video',
      porque: 'Um resumo curto da mudança e do que ela resolve.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devoxx: Sequenced Collections (Stuart Marks)',
      url: 'https://www.youtube.com/watch?v=fdFM5CFqv6o',
      tipo: 'video',
      porque: 'O autor da JEP explica as decisões de projeto, inclusive os retornos covariantes.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java: Sequenced Collections, Deep Dive with the Expert',
      url: 'https://www.youtube.com/watch?v=6yuDqkkYTGU',
      tipo: 'video',
      porque: 'Uma conversa longa sobre compatibilidade, métodos `default` e casos difíceis da JEP.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Softblue: The Dev Show 026, Java 21 Sequenced Collections',
      url: 'https://www.youtube.com/watch?v=YCoD8FeYfiw',
      tipo: 'video',
      porque: 'As sequenced collections apresentadas em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Histórico de navegação',
    enunciado:
      'Use um `LinkedHashSet<String>` para guardar as 3 últimas páginas visitadas, sem repetição. A cada visita, leve a página para o fim com `addLast` (se ela já estava no histórico, ela só muda de lugar) e, se o histórico passar de 3, descarte a mais antiga com `removeFirst`. Imprima o histórico depois de cada visita e, no fim, as páginas da mais recente para a mais antiga com `reversed()`. Para as visitas home, produtos, carrinho, home, ajuda e produtos, a saída deve ser:\n\n```text\nhome -> [home]\nprodutos -> [home, produtos]\ncarrinho -> [home, produtos, carrinho]\nhome -> [produtos, carrinho, home]\najuda -> [carrinho, home, ajuda]\nprodutos -> [home, ajuda, produtos]\nrecentes primeiro: [produtos, ajuda, home]\n```',
    dicas: [
      'No `LinkedHashSet`, `addLast` de um elemento existente o move para o fim, em vez de ignorá-lo como faria um `add`.',
      '`removeFirst` remove e devolve o elemento mais antigo.',
      '`reversed()` dá a ordem inversa sem copiar nem alterar o conjunto.',
    ],
    solucao: `import java.util.LinkedHashSet;
import java.util.List;

public class Historico {
    static final int LIMITE = 3;

    public static void main(String[] args) {
        LinkedHashSet<String> historico = new LinkedHashSet<>();
        for (String pagina : List.of("home", "produtos", "carrinho", "home", "ajuda", "produtos")) {
            historico.addLast(pagina);
            if (historico.size() > LIMITE) {
                historico.removeFirst();
            }
            System.out.println(pagina + " -> " + historico);
        }
        System.out.println("recentes primeiro: " + historico.reversed());
    }
}`,
    saida: 'home -> [home]\nprodutos -> [home, produtos]\ncarrinho -> [home, produtos, carrinho]\nhome -> [produtos, carrinho, home]\najuda -> [carrinho, home, ajuda]\nprodutos -> [home, ajuda, produtos]\nrecentes primeiro: [produtos, ajuda, home]',
    comentarios:
      'Antes do Java 21, esse histórico exigiria remover e reinserir a página para mudá-la de lugar, e descobrir a mais antiga com `iterator().next()`. Com `addLast`, `removeFirst` e `reversed`, o código diz exatamente o que faz. Repare na quarta visita: "home" não foi duplicada, foi para o fim, e o histórico continuou com 3 páginas.',
  },
  exercicios: [
    {
      id: 'pleno-t3-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("b"));
        l.addFirst("a");
        l.addLast("c");
        System.out.println(l.getFirst() + l.getLast() + l.size());
    }
}`,
      opcoes: ['`ac3`', '`ba3`', '`ab3`', 'Não compila: `List` não tem `addFirst`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Desde o Java 21, `List` estende `SequencedCollection` e ganhou os métodos de ponta.',
    },
    {
      id: 'pleno-t3-e06-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(1, 2, 3));
        l.reversed().addFirst(9);
        l.reversed().set(0, 8);
        System.out.println(l);
    }
}`,
      resposta: '[1, 2, 3, 8]',
      explicacao: 'O começo da visão invertida é o fim da original: `addFirst(9)` acrescenta no fim, e `set(0, 8)` troca justamente esse último elemento.',
    },
    {
      id: 'pleno-t3-e06-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        LinkedHashSet<Integer> s = new LinkedHashSet<>(List.of(1, 2, 3));
        s.addFirst(3);
        s.addFirst(4);
        s.addLast(1);
        System.out.println(s);
    }
}`,
      opcoes: ['`[4, 3, 2, 1]`', '`[4, 3, 1, 2, 3, 1]`', '`[4, 1, 2, 3]`', '`[1, 2, 3, 4]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No `LinkedHashSet`, `addFirst` e `addLast` de elementos existentes os movem para a ponta. O 3 vai para o começo, o 4 entra antes dele, e o 1 vai para o fim.',
    },
    {
      id: 'pleno-t3-e06-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeSet<Integer> t = new TreeSet<>(List.of(5, 3, 9));
        System.out.println(t.getFirst());
        t.addFirst(1);
        System.out.println(t);
    }
}`,
      opcoes: [
        'Imprime `3` e lança `UnsupportedOperationException`',
        'Imprime `3` e `[1, 3, 5, 9]`',
        'Imprime `5` e `[1, 5, 3, 9]`',
        'Não compila: `TreeSet` não tem `addFirst`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: '3' },
      explicacao: '`TreeSet` é `SequencedSet`, então o método existe e compila. Mas a posição é decidida pela comparação, e a implementação recusa a inserção numa ponta escolhida.',
    },
    {
      id: 'pleno-t3-e06-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>();
        System.out.println("vazia");
        System.out.println(l.getFirst());
    }
}`,
      opcoes: [
        'Imprime `vazia` e lança `NoSuchElementException`',
        'Imprime `vazia` e `null`',
        'Imprime `vazia` e lança `IndexOutOfBoundsException`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException', saida: 'vazia' },
      explicacao: 'Os métodos de ponta lançam `NoSuchElementException` em coleções vazias, como `Deque.getFirst` sempre fez.',
    },
    {
      id: 'pleno-t3-e06-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destas classes implementam `SequencedCollection`? Escolha três.',
      opcoes: ['`ArrayList`', '`ArrayDeque`', '`LinkedHashSet`', '`HashSet`', '`PriorityQueue`'],
      respostas: [0, 1, 2],
      explicacao: 'Só coleções com ordem de encontro definida são sequenciadas. A `HashSet` não tem ordem, e a `PriorityQueue` só garante a ordem de saída, não a de iteração.',
    },
    {
      id: 'pleno-t3-e06-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> m = new LinkedHashMap<>();
        m.put("x", 1);
        m.put("y", 2);
        m.putFirst("y", 20);
        System.out.println(m + " " + m.lastEntry());
    }
}`,
      opcoes: ['`{y=20, x=1} x=1`', '`{x=1, y=20} y=20`', '`{y=20, x=1, y=2} y=2`', '`{y=2, x=1} x=1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`putFirst` com uma chave existente atualiza o valor e move a entrada para o começo. A última entrada passa a ser "x".',
    },
    {
      id: 'pleno-t3-e06-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método do Java 21 que devolve o último elemento. O programa deve imprimir `Caio`.',
      codigo: `import java.util.List;

public class Ultimo {
    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia", "Caio");
        System.out.println(nomes.___());
    }
}`,
      respostas: ['getLast'],
      saida: 'Caio',
      explicacao: '`getLast()` substitui o antigo `get(size() - 1)` e funciona também em listas imutáveis, porque só lê.',
    },
    {
      id: 'pleno-t3-e06-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        LinkedHashSet<String> b = new LinkedHashSet<>(List.of("y"));
        HashSet<String> c = new HashSet<>(List.of("z"));
        System.out.println(b.getFirst());
        System.out.println(c.getFirst());
    }
}`,
      resposta: 8,
      explicacao: '`HashSet` não tem ordem definida e não implementa `SequencedSet`, então não ganhou `getFirst`. O `LinkedHashSet`, que estende `HashSet`, ganhou.',
    },
    {
      id: 'pleno-t3-e06-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeMap<Integer, String> t = new TreeMap<>(Map.of(1, "a", 2, "b", 3, "c"));
        System.out.println(t.pollFirstEntry() + " " + t.pollLastEntry() + " " + t);
    }
}`,
      opcoes: ['`1=a 3=c {2=b}`', '`1=a 3=c {1=a, 2=b, 3=c}`', '`a c {2=b}`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`pollFirstEntry` e `pollLastEntry` removem e devolvem as entradas das pontas, impressas como `chave=valor`. Remover funciona no `TreeMap`; só `putFirst` e `putLast` são recusados.',
    },
    {
      id: 'pleno-t3-e06-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = List.of(1, 2, 3);
        System.out.println(l.reversed());
        l.addFirst(0);
        System.out.println(l);
    }
}`,
      opcoes: [
        'Imprime `[3, 2, 1]` e lança `UnsupportedOperationException`',
        'Imprime `[3, 2, 1]` e `[0, 1, 2, 3]`',
        'Lança `UnsupportedOperationException` em `reversed()`',
        'Não compila: listas imutáveis não têm `addFirst`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: '[3, 2, 1]' },
      explicacao: '`reversed()` só cria uma visão, o que uma lista imutável permite. `addFirst` alteraria a lista e é recusado na execução.',
    },
    {
      id: 'pleno-t3-e06-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Deque<Integer> d = new ArrayDeque<>(List.of(1, 2, 3));
        Deque<Integer> r = d.reversed();
        r.push(0);
        System.out.println(d + " " + r.peek());
    }
}`,
      opcoes: ['`[1, 2, 3, 0] 0`', '`[0, 1, 2, 3] 0`', '`[1, 2, 3, 0] 1`', '`[1, 2, 3] 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`push` na visão insere no começo dela, que é o fim da original. `peek` na visão olha esse mesmo elemento.',
    },
    {
      id: 'pleno-t3-e06-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (String s : List.of("a", "b", "c").reversed()) {
            sb.append(s);
        }
        LinkedHashMap<String, Integer> m = new LinkedHashMap<>();
        m.put("x", 1);
        m.put("y", 2);
        System.out.println(sb + " " + m.sequencedKeySet().reversed() + " " + m.reversed().firstEntry());
    }
}`,
      resposta: 'cba [y, x] y=2',
      explicacao: 'O for-each sobre a visão invertida percorre de trás para a frente. Nos mapas, `sequencedKeySet()` e `reversed()` oferecem o mesmo para chaves e entradas.',
    },
    {
      id: 'pleno-t3-e06-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        LinkedList<Integer> l = new LinkedList<>(List.of(1, 2));
        LinkedList<Integer> r = l.reversed();
        r.addFirst(3);
        System.out.println(l + " " + r.getFirst());
    }
}`,
      opcoes: [
        '`[1, 2, 3] 3`',
        'Não compila: `reversed()` devolve `List`',
        '`[3, 1, 2] 3`',
        '`[1, 2] 3`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A `LinkedList` sobrescreve `reversed()` com retorno `LinkedList`, compatível com `List` e com `Deque`. O `addFirst` na visão acrescenta no fim da original.',
    },
    {
      id: 'pleno-t3-e06-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que `TreeSet.addFirst` lança `UnsupportedOperationException`?',
      opcoes: [
        'Porque no `TreeSet` a posição de cada elemento é decidida pela comparação, não por quem insere',
        'Porque o `TreeSet` não implementa `SequencedCollection`',
        'Porque o `TreeSet` é imutável',
        'Porque `addFirst` só existe em listas',
      ],
      resposta: 0,
      explicacao: 'O `TreeSet` herda o método de `SequencedCollection`, mas não pode honrá-lo sem quebrar a ordenação. Os métodos de leitura e de remoção das pontas funcionam.',
    },
  ],
};

export default episodio;
