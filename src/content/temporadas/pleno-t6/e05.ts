import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t6-e05',
  minutos: 17,
  aula,
  armadilhas: [
    '`Collectors.counting()` devolve `Long`; atribuir a `Integer` ou `int` não compila.',
    '`averagingInt` devolve `Double`; `summingInt` devolve `Integer`.',
    '`minBy` e `maxBy` devolvem `Optional`, também como coletores de baixo.',
    '`toMap` com chave repetida, sem função de mesclagem, lança `IllegalStateException`.',
    '`groupingBy(f)` devolve `Map<K, List<T>>` num `HashMap`, sem ordem; passe `TreeMap::new` para ordenar as chaves.',
    '`partitioningBy` sempre tem as chaves `false` e `true`, mesmo que um lado fique vazio.',
    '`filtering` dentro do `groupingBy` mantém grupos vazios; um `filter` antes os faz sumir.',
    'Um `collect` com `TreeMap::new` passado direto ao `println` pode não compilar: guarde numa variável tipada.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Using a Collector as a Terminal Operation',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/using-collectors/',
      tipo: 'documentacao',
      porque: 'Os coletores prontos, do `toList` ao `groupingBy` com coletores de baixo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.stream.Collectors',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html',
      tipo: 'documentacao',
      porque: 'Cada coletor com o tipo exato que devolve e exemplos de composição.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Implementing the Collector Interface',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/collector-interface/',
      tipo: 'documentacao',
      porque: 'As quatro funções de um coletor e como escrever um próprio.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to Java Collectors',
      url: 'https://www.baeldung.com/java-8-collectors',
      tipo: 'artigo',
      porque: 'Um catálogo dos coletores com exemplos de cada um, inclusive `teeing`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Java groupingBy Collector',
      url: 'https://www.baeldung.com/java-groupingby-collector',
      tipo: 'artigo',
      porque: 'Todas as formas de `groupingBy`, com mapas ordenados e agrupamentos aninhados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Streams pt 12, Collectors pt 02, Grouping by pt 01',
      url: 'https://www.youtube.com/watch?v=EH74dqRDCM0',
      tipo: 'video',
      porque: 'O primeiro `groupingBy`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Streams pt 14, Collectors pt 04, Grouping by pt 03',
      url: 'https://www.youtube.com/watch?v=1FvYGWxmltw',
      tipo: 'video',
      porque: 'Agrupamentos com coletores de baixo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Michelli Brito: Collectors, Java 8',
      url: 'https://www.youtube.com/watch?v=uN3MqVNw4HI',
      tipo: 'video',
      porque: 'Os coletores mais usados no dia a dia, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Devoxx: Collectors in the wild! (José Paumard)',
      url: 'https://www.youtube.com/watch?v=yddwA3458eo',
      tipo: 'video',
      porque: 'Coletores combinados para resolver problemas reais de agregação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que usar coletores em vez de efeitos colaterais, com os casos de `toMap` e `groupingBy`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Lambdas and Streams": Item 46, "Prefer side-effect-free functions in streams"',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'O capítulo inteiro sobre coletores, de reduções a agrupamentos em vários níveis.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Collecting data with streams"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de coletores com os tipos de retorno que a prova testa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Streams": seção "Using Advanced Stream Pipeline Concepts", parte "Collecting Results"',
    },
  ],
  desafio: {
    titulo: 'Boletim por turma',
    enunciado:
      'Com os alunos Ana (turma A, nota 9), Bia (B, 6), Caio (A, 7), Davi (B, 4) e Eva (A, 8), agrupe por turma num `TreeMap` e, para cada turma, mostre os nomes separados por vírgula, a média e o nome de quem tirou a maior nota. Depois, use `partitioningBy` com `mapping` para listar aprovados (nota 7 ou mais) e reprovados. A saída deve ser:\n\n```text\nA: Ana, Caio, Eva | média 8.0 | melhor: Ana\nB: Bia, Davi | média 5.0 | melhor: Bia\naprovados: [Ana, Caio, Eva]\nreprovados: [Bia, Davi]\n```',
    dicas: [
      '`groupingBy(Aluno::turma, TreeMap::new, Collectors.toList())` dá os alunos de cada turma em ordem de turma.',
      'Dentro do `forEach` do mapa, cada lista vira uma nova stream para os nomes, a média e o melhor.',
      '`partitioningBy` com `mapping(Aluno::nome, toList())` guarda só os nomes em cada lado.',
    ],
    solucao: `import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Boletim {
    record Aluno(String nome, String turma, int nota) { }

    public static void main(String[] args) {
        List<Aluno> alunos = List.of(new Aluno("Ana", "A", 9), new Aluno("Bia", "B", 6), new Aluno("Caio", "A", 7),
            new Aluno("Davi", "B", 4), new Aluno("Eva", "A", 8));

        Map<String, List<Aluno>> porTurma = alunos.stream()
            .collect(Collectors.groupingBy(Aluno::turma, TreeMap::new, Collectors.toList()));
        porTurma.forEach((turma, lista) -> {
            String nomes = lista.stream().map(Aluno::nome).collect(Collectors.joining(", "));
            double media = lista.stream().collect(Collectors.averagingInt(Aluno::nota));
            String melhor = lista.stream().max(Comparator.comparingInt(Aluno::nota)).map(Aluno::nome).orElse("?");
            System.out.println(turma + ": " + nomes + " | média " + media + " | melhor: " + melhor);
        });

        Map<Boolean, List<String>> situacao = alunos.stream()
            .collect(Collectors.partitioningBy(a -> a.nota() >= 7, Collectors.mapping(Aluno::nome, Collectors.toList())));
        System.out.println("aprovados: " + situacao.get(true));
        System.out.println("reprovados: " + situacao.get(false));
    }
}`,
    saida: 'A: Ana, Caio, Eva | média 8.0 | melhor: Ana\nB: Bia, Davi | média 5.0 | melhor: Bia\naprovados: [Ana, Caio, Eva]\nreprovados: [Bia, Davi]',
    comentarios:
      'O `TreeMap` deixa as turmas em ordem, e cada grupo mantém a ordem original dos alunos. A partição sempre tem os dois lados, então `situacao.get(false)` nunca é `null`. Uma alternativa seria calcular tudo num único coletor de baixo com `teeing`, mas três streams curtas por turma são mais fáceis de ler.',
  },
  exercicios: [
    {
      id: 'pleno-t6-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        String a = Stream.of("x", "y").collect(Collectors.joining("-", "(", ")"));
        String b = Stream.<String>empty().collect(Collectors.joining("-", "(", ")"));
        System.out.println(a + " " + b);
    }
}`,
      opcoes: ['`(x-y) ()`', '`(x-y) `', '`x-y ()`', '`(x)-(y) ()`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O prefixo e o sufixo envolvem o resultado inteiro, e continuam presentes mesmo sem elementos.',
    },
    {
      id: 'pleno-t6-e05-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Object n = Stream.of("a", "b", "c").collect(Collectors.counting());
        Object m = Stream.of(1, 2).collect(Collectors.averagingInt(x -> x));
        System.out.println(n.getClass().getSimpleName() + " " + m.getClass().getSimpleName() + " " + m);
    }
}`,
      opcoes: ['`Long Double 1.5`', '`Integer Double 1.5`', '`Long Integer 1`', '`Integer Integer 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`counting` conta em `Long` e `averagingInt` devolve `Double`, mesmo com valores inteiros.',
    },
    {
      id: 'pleno-t6-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Integer, String> a = Stream.of("um", "três").collect(Collectors.toMap(String::length, s -> s));
        System.out.println(a.size());
        Map<Integer, String> b = Stream.of("um", "três", "de").collect(Collectors.toMap(String::length, s -> s));
        System.out.println(b.size());
    }
}`,
      opcoes: [
        'Imprime `2` e lança `IllegalStateException`',
        'Imprime `2` e `2`',
        'Imprime `2` e `3`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: '2' },
      explicacao: '"um" e "de" têm o mesmo tamanho, e o `toMap` sem função de mesclagem não sabe qual valor manter.',
    },
    {
      id: 'pleno-t6-e05-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Integer, Long> m = Stream.of("sol", "mar", "céu", "terra", "vento")
            .collect(Collectors.groupingBy(String::length, TreeMap::new, Collectors.counting()));
        System.out.println(m);
    }
}`,
      resposta: '{3=3, 5=2}',
      explicacao: 'A chave é o tamanho, e o coletor de baixo conta os elementos de cada grupo. O `TreeMap` ordena as chaves.',
    },
    {
      id: 'pleno-t6-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Boolean, List<Integer>> m = Stream.of(2, 4).collect(Collectors.partitioningBy(n -> n > 10));
        System.out.println(m);
    }
}`,
      opcoes: ['`{false=[2, 4], true=[]}`', '`{false=[2, 4]}`', '`{true=[], false=[2, 4]}`', '`[[2, 4], []]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`partitioningBy` sempre cria as duas chaves. Com `groupingBy(n -> n > 10)`, só a chave `false` existiria.',
    },
    {
      id: 'pleno-t6-e05-q06',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`Map<Boolean, List<Integer>> m = Stream.of(1, 2).collect(Collectors.partitioningBy(n -> n > 1));`',
        '`Long n = Stream.of(1, 2).collect(Collectors.counting());`',
        '`Map<Integer, List<String>> g = Stream.of("a").collect(Collectors.groupingBy(String::length));`',
        '`Integer n = Stream.of(1, 2).collect(Collectors.counting());`',
        '`Map<Integer, String> g = Stream.of("a").collect(Collectors.groupingBy(String::length));`',
        '`Double d = Stream.of(1, 2).collect(Collectors.summingInt(x -> x));`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`counting` dá `Long`, o `groupingBy` simples guarda listas como valores, e `summingInt` dá `Integer`.',
    },
    {
      id: 'pleno-t6-e05-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o coletor que transforma cada elemento antes de coletá-lo no grupo. O programa deve imprimir `{A=[Ana, Caio], B=[Bia]}`.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Nomes {
    record Aluno(String nome, String turma) { }

    public static void main(String[] args) {
        List<Aluno> alunos = List.of(new Aluno("Ana", "A"), new Aluno("Bia", "B"), new Aluno("Caio", "A"));
        Map<String, List<String>> m = alunos.stream()
            .collect(Collectors.groupingBy(Aluno::turma, TreeMap::new, Collectors.___(Aluno::nome, Collectors.toList())));
        System.out.println(m);
    }
}`,
      respostas: ['mapping'],
      saida: '{A=[Ana, Caio], B=[Bia]}',
      explicacao: '`mapping` aplica uma função a cada elemento do grupo e repassa o resultado a outro coletor.',
    },
    {
      id: 'pleno-t6-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Long> a = Stream.of(1, 2, 3, 5)
            .collect(Collectors.groupingBy(n -> n % 2 == 0 ? "par" : "impar", TreeMap::new, Collectors.filtering(n -> n > 2, Collectors.counting())));
        Map<String, Long> b = Stream.of(1, 2, 3, 5).filter(n -> n > 2)
            .collect(Collectors.groupingBy(n -> n % 2 == 0 ? "par" : "impar", TreeMap::new, Collectors.counting()));
        System.out.println(a + " " + b);
    }
}`,
      opcoes: [
        '`{impar=2, par=0} {impar=2}`',
        '`{impar=2} {impar=2}`',
        '`{impar=2, par=0} {impar=2, par=0}`',
        '`{impar=3, par=1} {impar=2}`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com `filtering`, o grupo "par" é criado (o 2 passou pelo classificador) e fica com contagem 0. Filtrando antes, o 2 nunca chega ao `groupingBy`.',
    },
    {
      id: 'pleno-t6-e05-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<String> palavras = List.of("um", "dois", "três");
        Map<Integer, List<String>> a = palavras.stream().collect(Collectors.groupingBy(String::length));
        Map<Integer, Long> b = palavras.stream().collect(Collectors.groupingBy(String::length, Collectors.counting()));
        Map<Integer, Integer> c = palavras.stream().collect(Collectors.groupingBy(String::length, Collectors.counting()));
        System.out.println(a + " " + b + " " + c);
    }
}`,
      resposta: 9,
      explicacao: '`counting()` produz `Long`, e `Map<Integer, Long>` não é um `Map<Integer, Integer>`.',
    },
    {
      id: 'pleno-t6-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Character, Integer> m = "banana".chars().mapToObj(c -> (char) c)
            .collect(Collectors.toMap(c -> c, c -> 1, Integer::sum, TreeMap::new));
        System.out.println(m);
    }
}`,
      opcoes: ['`{a=3, b=1, n=2}`', '`{b=1, a=3, n=2}`', 'Lança `IllegalStateException`', '`{a=1, b=1, n=1}`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A função de mesclagem soma os valores de chaves repetidas, e o quarto argumento escolhe um `TreeMap`, ordenado.',
    },
    {
      id: 'pleno-t6-e05-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Double media = Stream.of(1, 2).collect(Collectors.averagingInt(x -> x));
        Integer soma = Stream.of(1, 2).collect(Collectors.summingInt(x -> x));
        System.out.println(media + " " + soma);
    }
}`,
      opcoes: ['`1.5 3`', '`1 3`', '`1.5 3.0`', '`1 3.0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`averagingInt` calcula em `double`; `summingInt` mantém `Integer`.',
    },
    {
      id: 'pleno-t6-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        String r = Stream.of(3, 9, 5).collect(Collectors.teeing(
            Collectors.counting(),
            Collectors.summingInt(x -> x),
            (n, s) -> s + "/" + n));
        System.out.println(r);
    }
}`,
      opcoes: ['`17/3`', '`3/17`', '`17/3.0`', 'Não compila: `teeing` não existe'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`teeing` (Java 12) envia cada elemento a dois coletores e combina os resultados com a função do terceiro argumento.',
    },
    {
      id: 'pleno-t6-e05-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Character, String> m = Stream.of("ana", "bia", "alex", "beto", "caio")
            .collect(Collectors.groupingBy(s -> s.charAt(0), TreeMap::new, Collectors.joining(",")));
        System.out.println(m);
    }
}`,
      resposta: '{a=ana,alex, b=bia,beto, c=caio}',
      explicacao: 'Cada grupo é coletado por `joining(",")`. O `toString` do mapa separa as entradas com vírgula e espaço, e os valores já trazem as vírgulas do `joining`.',
    },
    {
      id: 'pleno-t6-e05-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Map<Integer, Long> m = Stream.of("a", "bb").collect(Collectors.groupingBy(String::length, TreeMap::new, Collectors.counting()));
        System.out.println(m);
        System.out.println(Stream.of("a", "bb").collect(Collectors.groupingBy(String::length, TreeMap::new, Collectors.counting())));
    }
}`,
      opcoes: [
        'Não compila: o compilador não consegue inferir o tipo do resultado na chamada ao `println`',
        'Compila e imprime `{1=1, 2=1}` duas vezes',
        'Não compila: `TreeMap::new` não é um `Supplier`',
        'Compila, mas a segunda linha imprime um endereço de memória',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Com várias sobrecargas de `println`, não há tipo-alvo único para o `collect`, e a inferência com `TreeMap::new` falha. Guardar numa variável tipada, como na linha 6, resolve.',
    },
    {
      id: 'pleno-t6-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Que tipo de mapa o `Collectors.groupingBy(classificador)`, sem outros argumentos, devolve na implementação atual?',
      opcoes: [
        'Um `HashMap`, sem ordem garantida das chaves',
        'Um `TreeMap`, com as chaves ordenadas',
        'Um `LinkedHashMap`, na ordem em que as chaves aparecem',
        'Um mapa imutável',
      ],
      resposta: 0,
      explicacao: 'A documentação não garante o tipo, e o JDK usa `HashMap`. Para ordem, passe uma fábrica: `groupingBy(f, TreeMap::new, coletor)`.',
    },
  ],
};

export default episodio;
