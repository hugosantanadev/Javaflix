import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t6-e06',
  minutos: 17,
  aula,
  armadilhas: [
    '`flatMap` exige uma função que devolve `Stream`; `flatMap(List::size)` não compila.',
    '`map(List::stream)` produz uma stream de streams; `flatMap(List::stream)` concatena os elementos.',
    'O último `parallel()` ou `sequential()` decide o modo do pipeline inteiro.',
    'Em paralelo, `forEach` e `findAny` não têm ordem garantida; `forEachOrdered`, `findFirst` e `toList` mantêm a ordem.',
    '`reduce` paralelo com operação não associativa, como subtração, ou identidade não neutra dá resultado errado.',
    'Lambdas que alteram variáveis ou coleções compartilhadas criam condições de corrida em streams paralelos.',
    '`Stream.gather` e `Gatherers` só existem a partir do Java 24; no 17 e no 21 não compilam.',
    '`windowFixed` entrega a última janela incompleta; `fold` emite um único valor no fim; `scan` emite cada parcial.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Parallelizing Streams',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/parallel-streams/',
      tipo: 'documentacao',
      porque: 'Como o paralelismo funciona, quando compensa e as armadilhas de estado compartilhado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: The Gatherer API',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/gatherers/',
      tipo: 'documentacao',
      porque: 'Os gatherers prontos e como escrever um próprio.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 485: Stream Gatherers',
      url: 'https://openjdk.org/jeps/485',
      tipo: 'documentacao',
      porque: 'A motivação e o desenho da API que tornou as operações intermediárias extensíveis.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.util.stream.Gatherers (Java 25)',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Gatherers.html',
      tipo: 'documentacao',
      porque: 'Os cinco gatherers prontos, com o comportamento exato de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Parallelism',
      url: 'https://docs.oracle.com/javase/tutorial/collections/streams/parallelism.html',
      tipo: 'documentacao',
      porque: 'Ordem, efeitos colaterais e interferência em streams paralelos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: The Difference Between map() and flatMap()',
      url: 'https://www.baeldung.com/java-difference-map-and-flatmap',
      tipo: 'artigo',
      porque: '`map` e `flatMap` lado a lado, em streams e em `Optional`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: When to Use a Parallel Stream in Java',
      url: 'https://www.baeldung.com/java-when-to-use-parallel-stream',
      tipo: 'artigo',
      porque: 'O custo do paralelismo medido, com o efeito do tipo de fonte.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Stream Gatherers in Java',
      url: 'https://www.baeldung.com/java-stream-gatherers',
      tipo: 'artigo',
      porque: 'Exemplos com os gatherers prontos e um gatherer próprio com estado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Streams pt 04, FlatMap pt 01',
      url: 'https://www.youtube.com/watch?v=3IyvpB7Ocxw',
      tipo: 'video',
      porque: 'Achatando listas de listas com `flatMap`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Streams pt 16, Parallel Streams pt 01',
      url: 'https://www.youtube.com/watch?v=n_8HNFLrMsc',
      tipo: 'video',
      porque: 'Streams paralelos e quando eles ajudam, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: Better Java Streams with Gatherers, JEP Café #23',
      url: 'https://www.youtube.com/watch?v=jqUhObgDd5Q',
      tipo: 'video',
      porque: 'José Paumard apresenta os gatherers no canal oficial do Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devoxx: Teaching old Streams new tricks (Viktor Klang)',
      url: 'https://www.youtube.com/watch?v=8fMFa6OqlY8',
      tipo: 'video',
      porque: 'O autor da JEP explica o projeto dos gatherers e como escrever os seus.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: '`flatMap`, streams paralelos, o framework fork/join e os spliterators.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Working with streams": seção 5.3, "Mapping"; Cap. 7, "Parallel data processing and performance"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As questões de ordem e de `reduce` em streams paralelos, como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Working with Parallel Streams"',
    },
  ],
  desafio: {
    titulo: 'Lote de pedidos',
    enunciado:
      'Crie `record Pedido(String cliente, List<String> itens)` com os pedidos de Ana (café, pão, leite), Bia (pão) e Caio (café, café, bolo). Com `flatMap`, conte todos os itens, liste os itens distintos em ordem e conte quantas vezes cada um aparece num `TreeMap`. Liste os clientes que pediram café e confira, com um `parallelStream` e `mapToInt`, que a soma dos tamanhos dá o mesmo total. A saída deve ser:\n\n```text\nitens: 7\ndistintos: [bolo, café, leite, pão]\ncontagem: {bolo=1, café=3, leite=1, pão=2}\npediram café: [Ana, Caio]\nparalelo confere: true\n```',
    dicas: [
      '`p -> p.itens().stream()` transforma cada pedido na stream dos seus itens.',
      '`groupingBy(i -> i, TreeMap::new, Collectors.counting())` conta cada item, guardado numa variável tipada.',
      'A soma em paralelo é segura porque `sum` é associativa e não há estado compartilhado.',
    ],
    solucao: `import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Pedidos {
    record Pedido(String cliente, List<String> itens) { }

    public static void main(String[] args) {
        List<Pedido> pedidos = List.of(
            new Pedido("Ana", List.of("café", "pão", "leite")),
            new Pedido("Bia", List.of("pão")),
            new Pedido("Caio", List.of("café", "café", "bolo")));

        long itens = pedidos.stream().flatMap(p -> p.itens().stream()).count();
        List<String> distintos = pedidos.stream().flatMap(p -> p.itens().stream()).distinct().sorted().toList();
        Map<String, Long> contagem = pedidos.stream()
            .flatMap(p -> p.itens().stream())
            .collect(Collectors.groupingBy(i -> i, TreeMap::new, Collectors.counting()));
        List<String> cafe = pedidos.stream()
            .filter(p -> p.itens().contains("café"))
            .map(Pedido::cliente)
            .toList();
        int paralelo = pedidos.parallelStream().mapToInt(p -> p.itens().size()).sum();

        System.out.println("itens: " + itens);
        System.out.println("distintos: " + distintos);
        System.out.println("contagem: " + contagem);
        System.out.println("pediram café: " + cafe);
        System.out.println("paralelo confere: " + (paralelo == itens));
    }
}`,
    saida: 'itens: 7\ndistintos: [bolo, café, leite, pão]\ncontagem: {bolo=1, café=3, leite=1, pão=2}\npediram café: [Ana, Caio]\nparalelo confere: true',
    comentarios:
      'O `flatMap` transforma uma lista de pedidos numa única stream de itens, sobre a qual todo o resto da temporada se aplica: `distinct`, `sorted`, `groupingBy`. O `parallelStream` é exagero para três pedidos, mas dá o resultado certo porque soma, uma operação associativa, sem tocar em nada compartilhado. Com milhões de pedidos, a mesma linha usaria todos os núcleos.',
  },
  exercicios: [
    {
      id: 'pleno-t6-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(List.of(1, 2), List.of(3)).flatMap(List::stream).map(n -> n * 2).toList());
    }
}`,
      opcoes: ['`[2, 4, 6]`', '`[[2, 4], [6]]`', '`[1, 2, 3]`', 'Não compila: não se multiplica uma lista'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`flatMap` concatena as listas numa única stream de números, e o `map` dobra cada um.',
    },
    {
      id: 'pleno-t6-e06-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of("o sol", "o mar").flatMap(s -> Arrays.stream(s.split(" "))).distinct().toList());
    }
}`,
      resposta: '[o, sol, mar]',
      explicacao: 'Cada frase vira uma stream de palavras, concatenadas na ordem. O `distinct` mantém só a primeira ocorrência de "o".',
    },
    {
      id: 'pleno-t6-e06-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<List<Integer>> listas = List.of(List.of(1, 2), List.of(3));
        List<Integer> tamanhos = listas.stream().map(List::size).toList();
        List<Integer> erro = listas.stream().flatMap(List::size).toList();
        System.out.println(tamanhos + " " + erro);
    }
}`,
      opcoes: [
        'Não compila: a função de `flatMap` precisa devolver uma `Stream`',
        'Compila e imprime `[2, 1] [2, 1]`',
        'Compila e imprime `[2, 1] [3]`',
        'Não compila: `map` não aceita `List::size`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: '`List::size` devolve um `int`. Isso serve ao `map`, que produz um elemento por entrada, mas não ao `flatMap`, que espera uma stream para concatenar.',
    },
    {
      id: 'pleno-t6-e06-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(List.of(1, 2, 3, 4).parallelStream().map(n -> n * n).toList());
    }
}`,
      opcoes: [
        '`[1, 4, 9, 16]`',
        'Os mesmos números, em ordem imprevisível',
        '`[16, 9, 4, 1]`',
        'Lança `ConcurrentModificationException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os elementos são processados em paralelo, mas `toList` respeita a ordem de encontro da fonte ao montar o resultado.',
    },
    {
      id: 'pleno-t6-e06-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2).parallel().filter(n -> true).sequential().isParallel());
    }
}`,
      opcoes: ['`false`', '`true`', 'Depende do número de núcleos', 'Lança `IllegalStateException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O modo vale para o pipeline inteiro, e o último `parallel` ou `sequential` chamado decide.',
    },
    {
      id: 'pleno-t6-e06-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Num stream paralelo sobre uma lista, quais operações dão sempre o mesmo resultado que no sequencial? Escolha três.',
      opcoes: ['`findFirst()`', '`toList()`', '`forEachOrdered(...)`', '`forEach(...)` com impressão', '`findAny()`'],
      respostas: [0, 1, 2],
      explicacao: 'As três respeitam a ordem de encontro. `forEach` imprime na ordem em que as threads terminam, e `findAny` pode devolver qualquer elemento que satisfaça a busca.',
    },
    {
      id: 'pleno-t6-e06-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a operação que concatena as listas numa só stream. O programa deve imprimir `[a, b, c]`.',
      codigo: `import java.util.List;

public class Juntar {
    public static void main(String[] args) {
        List<List<String>> grupos = List.of(List.of("a"), List.of("b", "c"));
        System.out.println(grupos.stream().___(List::stream).toList());
    }
}`,
      respostas: ['flatMap'],
      saida: '[a, b, c]',
      explicacao: '`flatMap` recebe uma função que devolve uma stream para cada elemento e junta todas elas.',
    },
    {
      id: 'pleno-t6-e06-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      provas: ['831'],
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.rangeClosed(1, 7).boxed().gather(Gatherers.windowFixed(3)).toList());
    }
}`,
      opcoes: ['`[[1, 2, 3], [4, 5, 6], [7]]`', '`[[1, 2, 3], [4, 5, 6]]`', '`[[1, 2, 3], [2, 3, 4], [3, 4, 5]]`', '`[6, 15, 7]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`windowFixed` agrupa em listas de tamanho fixo, sem sobreposição, e entrega a última janela mesmo incompleta.',
    },
    {
      id: 'pleno-t6-e06-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      provas: ['831'],
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(2, 3, 4).gather(Gatherers.scan(() -> 0, Integer::sum)).toList());
    }
}`,
      opcoes: ['`[2, 5, 9]`', '`[9]`', '`[0, 2, 5, 9]`', '`[2, 3, 4]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`scan` emite cada resultado parcial da acumulação. Já `fold` emitiria só o total, 9.',
    },
    {
      id: 'pleno-t6-e06-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 17 ou no 21, qual é o resultado de compilar?',
      provas: ['829', '830'],
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2, 3, 4).gather(Gatherers.windowFixed(2)).toList());
    }
}`,
      opcoes: [
        'Não compila: `gather` e `Gatherers` só existem a partir do Java 24',
        'Compila e imprime `[[1, 2], [3, 4]]`',
        'Compila e lança `UnsupportedOperationException`',
        'Compila só com `--enable-preview`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Os gatherers foram prévia nos Java 22 e 23 e se tornaram finais no 24. Nas versões 17 e 21, nem o método nem a classe existem.',
    },
    {
      id: 'pleno-t6-e06-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of("ab", "c").flatMapToInt(String::chars).map(c -> c - 'a').sum());
    }
}`,
      opcoes: ['`3`', '`294`', '`2`', 'Não compila: `chars` devolve `Stream<Character>`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`flatMapToInt` concatena os `IntStream` de cada texto: a, b e c, que viram 0, 1 e 2.',
    },
    {
      id: 'pleno-t6-e06-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída desta redução sequencial?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2, 3, 4).reduce(0, (a, b) -> a - b));
    }
}`,
      opcoes: ['`-10`', '`-2`', '`10`', '`2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em sequência: 0 - 1 - 2 - 3 - 4. A subtração não é associativa, então a mesma linha com `parallel()` poderia dar outro valor, conforme a divisão dos pedaços.',
    },
    {
      id: 'pleno-t6-e06-q13',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      provas: ['831'],
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of("a", "b", "c").gather(Gatherers.fold(() -> "", (acc, s) -> s + acc)).findFirst().get());
    }
}`,
      resposta: 'cba',
      explicacao: '`fold` acumula a partir do valor inicial e emite um único resultado no fim. Cada letra é posta antes do acumulado, invertendo a ordem.',
    },
    {
      id: 'pleno-t6-e06-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.rangeClosed(1, 100).parallel().sum() + " " + IntStream.rangeClosed(1, 100).parallel().filter(n -> n % 2 == 0).count());
    }
}`,
      opcoes: ['`5050 50`', 'Um valor diferente a cada execução', '`5050 51`', '`100 50`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Soma e contagem são associativas e não dependem de ordem, então o paralelismo não muda o resultado.',
    },
    {
      id: 'pleno-t6-e06-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que um stream paralelo sobre uma `LinkedList` costuma ganhar pouco desempenho?',
      opcoes: [
        'Porque ela se divide mal: achar o meio exige percorrer os nós',
        'Porque `LinkedList` não permite acesso por várias threads',
        'Porque `parallelStream()` não existe em `LinkedList`',
        'Porque o `ForkJoinPool` ignora listas ligadas',
      ],
      resposta: 0,
      explicacao: 'O paralelismo depende de dividir a fonte rapidamente. Um `ArrayList` divide pelo índice do meio; a lista ligada precisa caminhar até ele.',
    },
  ],
};

export default episodio;
