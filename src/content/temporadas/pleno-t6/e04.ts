import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t6-e04',
  minutos: 13,
  aula,
  armadilhas: [
    '`Stream<Integer>` não tem `sum()` nem `average()`: é preciso `mapToInt` antes.',
    '`average()` sempre devolve `OptionalDouble`, mesmo num `IntStream`.',
    '`sum()` devolve o primitivo e dá 0 numa stream vazia; `max()` e `min()` devolvem `OptionalInt` e afins.',
    '`IntStream.map` recebe e devolve `int` e continua sendo `IntStream`; para objetos, use `mapToObj` ou `boxed`.',
    '`IntStream.max()` dispensa comparador; `Stream.max` exige um.',
    '`IntStream` estoura em silêncio como `int`; para produtos grandes, use `LongStream`.',
    'As estatísticas de uma stream vazia têm média 0.0, mínimo `Integer.MAX_VALUE` e máximo `Integer.MIN_VALUE`.',
    '`"texto".chars()` devolve um `IntStream` de códigos; para `Character`, faça o cast no `mapToObj`.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de java.util.stream.IntStream',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/IntStream.html',
      tipo: 'documentacao',
      porque: 'Todos os métodos do stream de `int`, com os tipos de retorno de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.IntSummaryStatistics',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/IntSummaryStatistics.html',
      tipo: 'documentacao',
      porque: 'Os valores iniciais de mínimo e máximo e o que acontece com estatísticas vazias.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Aggregate Operations',
      url: 'https://docs.oracle.com/javase/tutorial/collections/streams/index.html',
      tipo: 'documentacao',
      porque: 'O tutorial clássico de streams, com exemplos de `mapToInt` e `average`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Primitive Type Streams in Java',
      url: 'https://www.baeldung.com/java-8-primitive-streams',
      tipo: 'artigo',
      porque: 'As três streams primitivas, as conversões e as operações aritméticas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java IntStream Conversions',
      url: 'https://www.baeldung.com/java-intstream-convert',
      tipo: 'artigo',
      porque: 'Como sair de um `IntStream` para listas, arrays e outras streams.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Summing Numbers with Java Streams',
      url: 'https://www.baeldung.com/java-stream-sum',
      tipo: 'artigo',
      porque: 'As várias formas de somar, de `reduce` a `sum` e `summingInt`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Streams pt 10, Gerando streams pt 02',
      url: 'https://www.youtube.com/watch?v=AQO2JlZcwaA',
      tipo: 'video',
      porque: 'Streams de números com `IntStream` e afins, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Streams pt 11, Collectors pt 01, Summarizing',
      url: 'https://www.youtube.com/watch?v=5wDiTtBayU4',
      tipo: 'video',
      porque: 'Estatísticas de uma vez com `summaryStatistics` e os coletores de resumo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Selenium Express: Java Stream Vs IntStream, Which one for better performance?',
      url: 'https://www.youtube.com/watch?v=FSXPEr6Hjec',
      tipo: 'video',
      porque: 'O custo do autoboxing medido na prática.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Shristi Tech Academy: Primitive Streams in Java 8',
      url: 'https://www.youtube.com/watch?v=0YG1ecTVQVw',
      tipo: 'video',
      porque: '`IntStream`, `LongStream` e `DoubleStream` com exemplos de cada operação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'Streams numéricos, faixas e o exemplo das triplas pitagóricas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Working with streams": seção 5.7, "Numeric streams"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de métodos e retornos de cada stream primitiva, um campo minado na prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Streams": seção "Working with Primitive Streams"',
    },
  ],
  desafio: {
    titulo: 'Raio X de um texto',
    enunciado:
      'Para o texto `"streams primitivos evitam caixas"`, use streams primitivas para mostrar: o número de palavras e o total de letras (sem espaços), a quantidade de vogais (com `chars()`), o menor, o maior e a média dos tamanhos das palavras (com um único `summaryStatistics`) e a primeira palavra com o tamanho máximo. A saída deve ser:\n\n```text\npalavras: 4\nletras: 29\nvogais: 12\nmenor: 6, maior: 10, média: 7.25\nmaior palavra: primitivos\n```',
    dicas: [
      '`Arrays.stream(palavras).mapToInt(String::length).summaryStatistics()` calcula tudo de uma vez.',
      '`"aeiou".indexOf(c) >= 0` diz se o código `c` é de uma vogal.',
      'A lambda que procura a maior palavra pode usar as estatísticas, porque a variável é efetivamente final.',
    ],
    solucao: `import java.util.Arrays;
import java.util.IntSummaryStatistics;

public class Texto {
    public static void main(String[] args) {
        String texto = "streams primitivos evitam caixas";
        String[] palavras = texto.split(" ");
        IntSummaryStatistics tamanhos = Arrays.stream(palavras).mapToInt(String::length).summaryStatistics();
        long vogais = texto.chars().filter(c -> "aeiou".indexOf(c) >= 0).count();

        System.out.println("palavras: " + tamanhos.getCount());
        System.out.println("letras: " + tamanhos.getSum());
        System.out.println("vogais: " + vogais);
        System.out.println("menor: " + tamanhos.getMin() + ", maior: " + tamanhos.getMax() + ", média: " + tamanhos.getAverage());
        String maior = Arrays.stream(palavras).filter(p -> p.length() == tamanhos.getMax()).findFirst().orElse("");
        System.out.println("maior palavra: " + maior);
    }
}`,
    saida: 'palavras: 4\nletras: 29\nvogais: 12\nmenor: 6, maior: 10, média: 7.25\nmaior palavra: primitivos',
    comentarios:
      'Uma única passada pelas palavras produziu cinco números, sem nenhum `Integer` no caminho. O `chars()` trata o texto como uma stream de `int`, e `count()` devolve `long`. O `toString` das estatísticas foi evitado de propósito: ele formata a média pelo idioma da máquina, e imprimiria "7,250000" num computador em português.',
  },
  exercicios: [
    {
      id: 'pleno-t6-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.of(2, 4).average() + " " + IntStream.of(2, 4).sum());
    }
}`,
      opcoes: ['`OptionalDouble[3.0] 6`', '`3.0 6`', '`OptionalInt[3] 6`', '`3 6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`average()` devolve `OptionalDouble`, mesmo para inteiros. `sum()` devolve o `int` direto.',
    },
    {
      id: 'pleno-t6-e04-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        int a = IntStream.of(1, 2, 3).sum();
        int b = Stream.of(1, 2, 3).sum();
        System.out.println(a + b);
    }
}`,
      opcoes: [
        'Não compila: `Stream<Integer>` não tem `sum()`',
        'Compila e imprime `12`',
        'Compila e imprime `6`',
        'Não compila: `IntStream.sum()` devolve `long`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: '`Stream<T>` não sabe somar um `T` qualquer. É preciso converter: `Stream.of(1, 2, 3).mapToInt(Integer::intValue).sum()`.',
    },
    {
      id: 'pleno-t6-e04-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of("um", "três", "dez").mapToInt(String::length).sum() + " " + IntStream.rangeClosed(1, 4).map(i -> i * i).boxed().toList());
    }
}`,
      resposta: '9 [1, 4, 9, 16]',
      explicacao: 'Os tamanhos são 2, 4 e 3. Depois, `map` mantém o `IntStream`, e `boxed` converte para `Stream<Integer>` antes do `toList`.',
    },
    {
      id: 'pleno-t6-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        int soma = IntStream.of(1, 2).sum();
        double media = IntStream.of(1, 2).average();
        System.out.println(soma + media);
    }
}`,
      opcoes: [
        'Não compila: `average()` devolve `OptionalDouble`',
        'Compila e imprime `4.5`',
        'Compila e imprime `3.0`',
        'Não compila: `sum()` devolve `OptionalInt`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'A média de uma stream vazia não existe, por isso o retorno é `OptionalDouble`. Seria preciso `getAsDouble()` ou `orElse`.',
    },
    {
      id: 'pleno-t6-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`int s = IntStream.of(1, 2).sum();`',
        '`OptionalInt m = IntStream.of(1, 2).max();`',
        '`Stream<Integer> b = IntStream.of(1, 2).boxed();`',
        '`Stream<Integer> x = IntStream.of(1, 2).map(i -> i * 2);`',
        '`int s = Stream.of(1, 2).sum();`',
        '`OptionalInt a = IntStream.of(1, 2).average();`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`IntStream.map` devolve outro `IntStream`. `Stream<Integer>` não tem `sum`. E `average` devolve `OptionalDouble`, não `OptionalInt`.',
    },
    {
      id: 'pleno-t6-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.empty().sum() + " " + IntStream.empty().max().orElse(-1));
    }
}`,
      opcoes: ['`0 -1`', '`-1 -1`', '`0 0`', 'Lança `NoSuchElementException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A soma de nada é 0, a identidade da soma. Já o máximo de nada não existe, e o `OptionalInt` vazio cai no `orElse`.',
    },
    {
      id: 'pleno-t6-e04-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a operação que converte a stream de textos num `IntStream`. O programa deve imprimir `12`.',
      codigo: `import java.util.List;

public class Letras {
    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia", "Caio", "Lu");
        System.out.println(nomes.stream().___(String::length).sum());
    }
}`,
      respostas: ['mapToInt'],
      saida: '12',
      explicacao: '`mapToInt` recebe uma `ToIntFunction` e devolve um `IntStream`, que tem `sum()`.',
    },
    {
      id: 'pleno-t6-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        IntSummaryStatistics s = IntStream.of(4, 8, 6).summaryStatistics();
        System.out.println(s.getMin() + s.getMax() + " " + s.getAverage());
    }
}`,
      opcoes: ['`12 6.0`', '`48 6.0`', '`12 6`', '`4 8 6.0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`getMin()` e `getMax()` devolvem `int`, e a soma 4 + 8 acontece antes da concatenação. `getAverage()` devolve `double`.',
    },
    {
      id: 'pleno-t6-e04-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<String> a = IntStream.range(0, 3).mapToObj(i -> "x" + i).toList();
        List<Integer> b = IntStream.range(0, 3).boxed().toList();
        IntStream c = IntStream.range(0, 3).map(i -> i + 1);
        IntStream d = IntStream.range(0, 3).map(i -> "x" + i);
        System.out.println(a + " " + b + " " + c.sum() + " " + d.count());
    }
}`,
      resposta: 9,
      explicacao: '`IntStream.map` recebe um `IntUnaryOperator`: de `int` para `int`. Para produzir textos, é `mapToObj`, como na linha 6.',
    },
    {
      id: 'pleno-t6-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println("Java".chars().filter(Character::isUpperCase).count() + " " + "abc".chars().map(c -> c - 'a' + 1).sum());
    }
}`,
      opcoes: ['`1 6`', '`1 294`', '`4 6`', 'Não compila: `chars()` devolve `Stream<Character>`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`chars()` devolve um `IntStream` de códigos. `Character.isUpperCase(int)` aceita o código, e a conta transforma a, b e c em 1, 2 e 3.',
    },
    {
      id: 'pleno-t6-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        int a = IntStream.rangeClosed(1, 13).reduce(1, (x, y) -> x * y);
        long b = LongStream.rangeClosed(1, 13).reduce(1, (x, y) -> x * y);
        System.out.println(a + " " + b);
    }
}`,
      opcoes: ['`1932053504 6227020800`', '`6227020800 6227020800`', 'Lança `ArithmeticException`', '`-1 6227020800`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '13! passa do maior `int`, e a multiplicação estoura em silêncio, ficando com os 32 bits de baixo. Com `long`, o valor cabe.',
    },
    {
      id: 'pleno-t6-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.of(4).average().getAsDouble());
        System.out.println(IntStream.empty().average().getAsDouble());
    }
}`,
      opcoes: [
        'Imprime `4.0` e lança `NoSuchElementException`',
        'Imprime `4.0` e `0.0`',
        'Imprime `4.0` e `NaN`',
        'Imprime `4` e lança `NoSuchElementException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException', saida: '4.0' },
      explicacao: 'O `OptionalDouble` vazio não tem valor, e `getAsDouble()` lança exceção, como `get()` num `Optional` vazio.',
    },
    {
      id: 'pleno-t6-e04-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.of(1, 2, 3).asDoubleStream().map(d -> d / 2).sum() + " " + IntStream.range(1, 4).mapToObj(i -> "x".repeat(i)).collect(Collectors.joining(",")));
    }
}`,
      resposta: '3.0 x,xx,xxx',
      explicacao: '`asDoubleStream` converte cada `int` em `double`, e a divisão não trunca. `range(1, 4)` vai de 1 a 3.',
    },
    {
      id: 'pleno-t6-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        IntSummaryStatistics s = IntStream.empty().summaryStatistics();
        System.out.println(s.getAverage() + " " + s.getMax());
    }
}`,
      opcoes: ['`0.0 -2147483648`', '`0.0 0`', 'Lança `NoSuchElementException`', '`NaN 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As estatísticas não lançam exceção. Sem elementos, a média é 0.0 e o máximo fica no valor inicial, `Integer.MIN_VALUE`, que qualquer número substituiria.',
    },
    {
      id: 'pleno-t6-e04-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que existem `IntStream`, `LongStream` e `DoubleStream`, se já existe `Stream<Integer>`?',
      opcoes: [
        'Para evitar o custo de embrulhar cada número num objeto e oferecer operações numéricas como `sum` e `average`',
        'Porque `Stream<Integer>` não aceita números negativos',
        'Porque `Stream<Integer>` não pode ser paralela',
        'Para permitir que a stream seja reutilizada',
      ],
      resposta: 0,
      explicacao: 'Cada `Integer` é um objeto no heap. As streams primitivas trabalham com os valores direto e sabem fazer contas, porque o tipo dos elementos é conhecido.',
    },
  ],
};

export default episodio;
