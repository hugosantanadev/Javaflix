import type { Exercicio } from '../../types';

/** Prova da temporada Pleno T6: streams. */
const prova: Exercicio[] = [
  {
    id: 'pleno-t6-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream.of("a", "b").map(s -> {
            System.out.print("x");
            return s;
        });
        System.out.println("ok");
    }
}`,
    opcoes: ['`ok`', '`xxok`', '`xok`', 'Não compila: falta a operação terminal'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Sem operação terminal, nenhuma lambda do pipeline executa.',
  },
  {
    id: 'pleno-t6-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais declarações compilam? Escolha três.',
    opcoes: [
      '`long n = Stream.of(1).count();`',
      '`Optional<String> o = Stream.of("a").findFirst();`',
      '`OptionalDouble m = IntStream.of(1).average();`',
      '`int n = Stream.of(1).count();`',
      '`double m = IntStream.of(1).average();`',
      '`int s = Stream.of(1).sum();`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`count` devolve `long`, `average` devolve `OptionalDouble`, e `Stream<Integer>` não tem `sum`.',
  },
  {
    id: 'pleno-t6-prova-q03',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(5, 3, 5, 1, 3).distinct().sorted().map(n -> n * 10).limit(2).toList());
    }
}`,
    resposta: '[10, 30]',
    explicacao: 'Sem repetidos: 5, 3, 1. Ordenados: 1, 3, 5. Multiplicados e limitados a dois: 10 e 30.',
  },
  {
    id: 'pleno-t6-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream<String> s = List.of("a", "bb").stream().filter(x -> x.length() > 1);
        System.out.println(s.toList());
        System.out.println(s.count());
    }
}`,
    opcoes: [
      'Imprime `[bb]` e lança `IllegalStateException`',
      'Imprime `[bb]` e `1`',
      'Imprime `[bb]` e `0`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: '[bb]' },
    explicacao: 'A stream já foi consumida pelo `toList`. Cada operação terminal precisa de uma stream nova.',
  },
  {
    id: 'pleno-t6-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(2, 4, 5, 6).takeWhile(n -> n % 2 == 0).toList() + " " + Stream.of(2, 4, 5, 6).filter(n -> n % 2 == 0).toList());
    }
}`,
    opcoes: ['`[2, 4] [2, 4, 6]`', '`[2, 4, 6] [2, 4, 6]`', '`[2, 4] [2, 4]`', '`[5, 6] [2, 4, 6]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`takeWhile` para no 5, o primeiro que falha, e ignora o 6. `filter` examina todos.',
  },
  {
    id: 'pleno-t6-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2, 3).reduce(1, (a, b) -> a * b) + " " + Stream.<Integer>empty().reduce(1, (a, b) -> a * b));
    }
}`,
    opcoes: ['`6 1`', '`6 0`', '`6 Optional.empty`', 'Lança `NoSuchElementException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com identidade, `reduce` devolve o valor direto; numa stream vazia, devolve a própria identidade.',
  },
  {
    id: 'pleno-t6-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        String a = Stream.of("x").filter(String::isEmpty).findFirst().orElse("vazio");
        String b = Stream.of("x").findFirst().map(String::toUpperCase).get();
        System.out.println(a + " " + b);
    }
}`,
    opcoes: ['`vazio X`', '`x X`', '`vazio x`', 'Lança `NoSuchElementException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O filtro elimina o único elemento, e `findFirst` devolve um `Optional` vazio. No segundo caso, o `map` do `Optional` transforma o valor presente.',
  },
  {
    id: 'pleno-t6-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int[] chamadas = {0};
        Supplier<String> padrao = () -> {
            chamadas[0]++;
            return "d";
        };
        Optional.of("a").orElse(padrao.get());
        Optional.of("a").orElseGet(padrao);
        Optional.empty().orElseGet(padrao);
        System.out.println(chamadas[0]);
    }
}`,
    opcoes: ['`2`', '`1`', '`3`', '`0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O argumento de `orElse` é avaliado sempre: uma chamada. O `orElseGet` com valor presente não chama o fornecedor; o vazio chama: mais uma.',
  },
  {
    id: 'pleno-t6-prova-q09',
    tipo: 'lacuna',
    dificuldade: 1,
    enunciado: 'Complete com a operação que calcula a média. O programa deve imprimir `6.0`.',
    codigo: `import java.util.stream.IntStream;

public class Media {
    public static void main(String[] args) {
        System.out.println(IntStream.of(4, 8).___().getAsDouble());
    }
}`,
    respostas: ['average'],
    saida: '6.0',
    explicacao: '`average()` devolve `OptionalDouble`, e `getAsDouble()` extrai o valor.',
  },
  {
    id: 'pleno-t6-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        int a = IntStream.of(1, 2).sum();
        int b = IntStream.of(1, 2).boxed().sum();
        System.out.println(a + b);
    }
}`,
    opcoes: [
      'Não compila: depois de `boxed()`, a stream é `Stream<Integer>`, que não tem `sum()`',
      'Compila e imprime `6`',
      'Compila e imprime `3`',
      'Não compila: `IntStream` não tem `boxed()`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: '`boxed` sai do mundo primitivo, e com ele vão embora as operações numéricas.',
  },
  {
    id: 'pleno-t6-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        IntSummaryStatistics s = Stream.of("aa", "b", "ccc").mapToInt(String::length).summaryStatistics();
        System.out.println(s.getSum() + " " + s.getMax() + " " + s.getAverage());
    }
}`,
    opcoes: ['`6 3 2.0`', '`6 3 2`', '`3 3 2.0`', '`6 ccc 2.0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os tamanhos são 2, 1 e 3. A soma e o máximo são `long` e `int`; a média é `double`.',
  },
  {
    id: 'pleno-t6-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Character, List<String>> m = Stream.of("pera", "uva", "pêssego", "maçã")
            .collect(Collectors.groupingBy(s -> s.charAt(0), TreeMap::new, Collectors.toList()));
        System.out.println(m);
    }
}`,
    opcoes: [
      '`{m=[maçã], p=[pera, pêssego], u=[uva]}`',
      '`{p=[pera, pêssego], u=[uva], m=[maçã]}`',
      '`{m=1, p=2, u=1}`',
      '`{m=[maçã], p=[pêssego, pera], u=[uva]}`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `TreeMap` ordena as chaves, e cada grupo mantém a ordem original dos elementos.',
  },
  {
    id: 'pleno-t6-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Boolean, Long> m = Stream.of(10, 20).collect(Collectors.partitioningBy(n -> n > 5, Collectors.counting()));
        System.out.println(m);
    }
}`,
    opcoes: ['`{false=0, true=2}`', '`{true=2}`', '`{false=null, true=2}`', '`{true=2, false=0}`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`partitioningBy` sempre cria as duas chaves; o lado sem elementos recebe o resultado do coletor para um grupo vazio, 0.',
  },
  {
    id: 'pleno-t6-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> a = Stream.of("x", "y").collect(Collectors.toMap(s -> s, s -> 1));
        System.out.println(a.size());
        Map<String, Integer> b = Stream.of("x", "x").collect(Collectors.toMap(s -> s, s -> 1));
        System.out.println(b.size());
    }
}`,
    opcoes: [
      'Imprime `2` e lança `IllegalStateException`',
      'Imprime `2` e `1`',
      'Imprime `2` e `2`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: '2' },
    explicacao: 'Sem uma função de mesclagem, `toMap` trata a chave repetida como erro.',
  },
  {
    id: 'pleno-t6-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre os tipos produzidos pelos coletores são verdadeiras? Escolha três.',
    opcoes: [
      '`counting()` produz `Long`',
      '`averagingInt(...)` produz `Double`',
      '`maxBy(...)` produz `Optional`',
      '`summingInt(...)` produz `Long`',
      '`joining(...)` produz `StringBuilder`',
    ],
    respostas: [0, 1, 2],
    explicacao: '`summingInt` produz `Integer`, e `joining` produz `String`.',
  },
  {
    id: 'pleno-t6-prova-q16',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(List.of("a", "b"), List.of("c")).flatMap(List::stream).collect(Collectors.joining()));
    }
}`,
    opcoes: ['`abc`', '`[a, b][c]`', '`[[a, b], [c]]`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`flatMap` junta as listas numa stream de textos, e `joining()` os concatena sem separador.',
  },
  {
    id: 'pleno-t6-prova-q17',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Boolean, String> m = Stream.of(1, 2, 3, 4)
            .collect(Collectors.partitioningBy(n -> n > 2, Collectors.mapping(String::valueOf, Collectors.joining(","))));
        System.out.println(m);
    }
}`,
    resposta: '{false=1,2, true=3,4}',
    explicacao: 'Cada lado da partição é coletado por `mapping` e `joining`. O mapa imprime `false` antes de `true`.',
  },
  {
    id: 'pleno-t6-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Long> a = Stream.of("x").collect(Collectors.groupingBy(s -> s, Collectors.counting()));
        Map<String, Integer> b = Stream.of("x").collect(Collectors.groupingBy(s -> s, Collectors.counting()));
        System.out.println(a + " " + b);
    }
}`,
    opcoes: [
      'Não compila: `counting()` produz `Long`, não `Integer`',
      'Compila e imprime `{x=1} {x=1}`',
      'Não compila: `groupingBy` precisa de `TreeMap::new`',
      'Compila com aviso de conversão',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: 'Não há conversão automática entre `Map<String, Long>` e `Map<String, Integer>`. Para inteiros, seria preciso `summingInt(s -> 1)` ou um `collectingAndThen`.',
  },
  {
    id: 'pleno-t6-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    provas: ['831'],
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2, 3, 4).gather(Gatherers.windowSliding(2)).toList());
    }
}`,
    opcoes: ['`[[1, 2], [2, 3], [3, 4]]`', '`[[1, 2], [3, 4]]`', '`[3, 5, 7]`', '`[[1], [2], [3], [4]]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`windowSliding(2)` cria janelas de dois elementos que avançam de um em um, com sobreposição.',
  },
  {
    id: 'pleno-t6-prova-q20',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'O que se pode afirmar sobre `List.of(1, 2, 3).parallelStream().forEach(System.out::print)`?',
    opcoes: [
      'Os três números são impressos, mas a ordem pode variar entre execuções',
      'Imprime sempre `123`',
      'Imprime sempre `321`',
      'Lança `ConcurrentModificationException`',
    ],
    resposta: 0,
    explicacao: '`forEach` em paralelo executa a ação na ordem em que as threads processam os pedaços. Para manter a ordem, seria preciso `forEachOrdered`.',
  },
];

export default prova;
