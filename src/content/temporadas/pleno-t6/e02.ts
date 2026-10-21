import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t6-e02',
  minutos: 15,
  aula,
  armadilhas: [
    '`count()` devolve `long`; atribuir a um `int` não compila.',
    '`min`, `max`, `findFirst` e `findAny` devolvem `Optional`; `min` e `max` de `Stream` exigem um `Comparator`.',
    'Numa stream vazia, `anyMatch` dá `false`, mas `allMatch` e `noneMatch` dão `true`.',
    '`anyMatch`, `allMatch`, `noneMatch`, `findFirst` e `findAny` são de curto-circuito e funcionam até com streams infinitas, se a resposta aparecer.',
    '`reduce(identidade, acc)` devolve `T`; `reduce(acc)` devolve `Optional<T>`.',
    'A identidade precisa ser neutra: `reduce(10, Integer::sum)` soma 10 a mais (e mais ainda em paralelo).',
    '`forEach` devolve `void`; não dá para atribuir o resultado.',
    '`Stream.toList()` é imutável; `Collectors.toList()` costuma devolver um `ArrayList`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Adding a Terminal Operation on a Stream',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/terminal-operations/',
      tipo: 'documentacao',
      porque: 'As operações terminais organizadas por tipo de resultado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Reducing a Stream',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/reducing/',
      tipo: 'documentacao',
      porque: 'As três formas de `reduce`, a identidade e a associatividade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.stream: Reduction operations',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html#Reduction',
      tipo: 'documentacao',
      porque: 'A definição formal de redução e por que a identidade e a associatividade importam.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Reduction',
      url: 'https://docs.oracle.com/javase/tutorial/collections/streams/reduction.html',
      tipo: 'documentacao',
      porque: 'A diferença entre `reduce` e `collect`, com o exemplo da média.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Stream.reduce()',
      url: 'https://www.baeldung.com/java-stream-reduce',
      tipo: 'artigo',
      porque: 'Identidade, acumulador e combinador com exemplos de cada forma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Stream findFirst() vs. findAny()',
      url: 'https://www.baeldung.com/java-stream-findfirst-vs-findany',
      tipo: 'artigo',
      porque: 'Por que `findAny` pode devolver elementos diferentes em streams paralelas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Streams pt 06, Finding and Matching',
      url: 'https://www.youtube.com/watch?v=8KiVd58GBJU',
      tipo: 'video',
      porque: '`findFirst`, `findAny` e os `match`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Streams pt 07, Reduce pt 01',
      url: 'https://www.youtube.com/watch?v=wTsGajhPCBY',
      tipo: 'video',
      porque: 'O `reduce` com e sem identidade, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Streams pt 08, Reduce pt 02',
      url: 'https://www.youtube.com/watch?v=-eudNNKAGgM',
      tipo: 'video',
      porque: 'Reduções mais elaboradas e a ponte para os streams primitivos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: Journey\'s End, Collection and Reduction in the Streams API',
      url: 'https://www.youtube.com/watch?v=GOMovkQCYD4',
      tipo: 'video',
      porque: 'Redução e coleta explicadas no canal oficial do Java, com o modelo paralelo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'Busca, correspondência e redução, com a explicação da identidade.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Working with streams": seções 5.4, "Finding and matching", e 5.5, "Reducing"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de terminais com retorno e curto-circuito que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Streams": seção "Using Streams", parte "Using Common Terminal Operations"',
    },
  ],
  desafio: {
    titulo: 'Estatísticas de uma turma',
    enunciado:
      'Para as notas `[8, 6, 10, 4, 7]`, use apenas operações terminais (sem `Collectors`) para mostrar: a quantidade (`count`), a soma (`reduce` com identidade) e a média, a maior e a menor nota (`max` e `min`), se alguém reprovou (nota menor que 5), se todas são válidas (entre 0 e 10) e a primeira nota aprovada (7 ou mais). Por fim, mostre a maior nota de uma turma vazia, com "nenhuma" no lugar. A saída deve ser:\n\n```text\nquantidade: 5\nsoma: 35, média: 7.0\nmaior: 10, menor: 4\nalguém reprovado? true\ntodas válidas? true\nprimeira aprovada: 8\nmaior de uma turma vazia: nenhuma\n```',
    dicas: [
      'Cada estatística precisa de uma stream nova: `notas.stream()` de novo a cada linha.',
      'Para a média em `double`, converta antes de dividir: `(double) soma / quantidade`.',
      'Na turma vazia, `max` devolve `Optional.empty()`; `map(String::valueOf).orElse("nenhuma")` resolve.',
    ],
    solucao: `import java.util.List;
import java.util.Optional;

public class Notas {
    public static void main(String[] args) {
        List<Integer> notas = List.of(8, 6, 10, 4, 7);
        long quantidade = notas.stream().count();
        int soma = notas.stream().reduce(0, Integer::sum);
        Optional<Integer> maior = notas.stream().max(Integer::compare);
        Optional<Integer> menor = notas.stream().min(Integer::compare);
        System.out.println("quantidade: " + quantidade);
        System.out.println("soma: " + soma + ", média: " + (double) soma / quantidade);
        System.out.println("maior: " + maior.get() + ", menor: " + menor.get());
        System.out.println("alguém reprovado? " + notas.stream().anyMatch(n -> n < 5));
        System.out.println("todas válidas? " + notas.stream().allMatch(n -> n >= 0 && n <= 10));
        System.out.println("primeira aprovada: " + notas.stream().filter(n -> n >= 7).findFirst().get());

        List<Integer> vazia = List.of();
        System.out.println("maior de uma turma vazia: " + vazia.stream().max(Integer::compare).map(String::valueOf).orElse("nenhuma"));
    }
}`,
    saida: 'quantidade: 5\nsoma: 35, média: 7.0\nmaior: 10, menor: 4\nalguém reprovado? true\ntodas válidas? true\nprimeira aprovada: 8\nmaior de uma turma vazia: nenhuma',
    comentarios:
      'Cada terminal tem o tipo de resultado que a pergunta pede: `long` para contar, `boolean` para testar, `Optional` para "talvez não exista". O `get()` é seguro nas notas da turma porque a lista não está vazia; na turma vazia, o `Optional` evita uma `NoSuchElementException`. No episódio 4, os streams primitivos farão tudo isso de uma vez, com `summaryStatistics()`.',
  },
  exercicios: [
    {
      id: 'pleno-t6-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        long n = Stream.of(4, 9, 2).count();
        Optional<Integer> m = Stream.of(4, 9, 2).min(Integer::compare);
        System.out.println(n + " " + m.get());
    }
}`,
      opcoes: ['`3 2`', '`3 Optional[2]`', '`3 9`', 'Não compila: `count` devolve `int`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`count` devolve `long` e `min` devolve `Optional<Integer>`; o `get()` extrai o valor.',
    },
    {
      id: 'pleno-t6-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.<Integer>empty().allMatch(n -> n > 100) + " "
            + Stream.<Integer>empty().noneMatch(n -> n > 100) + " "
            + Stream.<Integer>empty().anyMatch(n -> n > 100));
    }
}`,
      opcoes: ['`true true false`', '`false false false`', '`true false false`', 'Lança `NoSuchElementException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem elementos, não existe ninguém que reprove o `allMatch` nem que aprove no `noneMatch`; ambos são verdadeiros. `anyMatch` precisa de pelo menos um que passe.',
    },
    {
      id: 'pleno-t6-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(2, 3, 4).reduce(1, (a, b) -> a * b) + " " + Stream.of("a", "b").reduce("", String::concat));
    }
}`,
      resposta: '24 ab',
      explicacao: '1 é a identidade do produto e `""` a da concatenação. As duas reduções devolvem o valor direto, sem `Optional`.',
    },
    {
      id: 'pleno-t6-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Integer a = Stream.of(1, 2).reduce(0, Integer::sum);
        Integer b = Stream.of(1, 2).reduce(Integer::sum);
        System.out.println(a + b);
    }
}`,
      opcoes: [
        'Não compila: `reduce` sem identidade devolve `Optional<Integer>`',
        'Compila e imprime `6`',
        'Compila e imprime `3`',
        'Não compila: `reduce` exige três argumentos',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'Sem identidade, a stream poderia estar vazia e não haveria resultado. Por isso o retorno é `Optional<Integer>`.',
    },
    {
      id: 'pleno-t6-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2).reduce(5, Integer::sum));
    }
}`,
      opcoes: ['`8`', '`3`', '`13`', '`Optional[8]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O primeiro argumento é usado como valor inicial: 5 + 1 + 2. Como 5 não é neutro para a soma, o resultado mudaria numa stream paralela.',
    },
    {
      id: 'pleno-t6-e02-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`long n = Stream.of(1, 2).count();`',
        '`Optional<String> s = Stream.of("a").findAny();`',
        '`boolean b = Stream.of(1).noneMatch(x -> x > 1);`',
        '`int n = Stream.of(1, 2).count();`',
        '`Optional<Integer> m = Stream.of(1, 2).max();`',
        '`String s = Stream.of("a").findFirst();`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`count` devolve `long`, que não cabe num `int` sem cast. `max` de `Stream` exige um `Comparator`. `findFirst` devolve `Optional<String>`.',
    },
    {
      id: 'pleno-t6-e02-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a operação terminal que devolve o maior elemento. O programa deve imprimir `8`.',
      codigo: `import java.util.Comparator;
import java.util.stream.Stream;

public class Maior {
    public static void main(String[] args) {
        System.out.println(Stream.of(3, 8, 5).___(Comparator.naturalOrder()).get());
    }
}`,
      respostas: ['max'],
      saida: '8',
      explicacao: '`max` recebe um `Comparator` e devolve `Optional`; `get()` extrai o 8.',
    },
    {
      id: 'pleno-t6-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        boolean r = Stream.of(1, 2, 3, 4).peek(System.out::print).anyMatch(n -> n == 2);
        System.out.println(" " + r);
    }
}`,
      opcoes: ['`12 true`', '`1234 true`', '`2 true`', '`1234 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`anyMatch` para no primeiro elemento que satisfaz o predicado. O 3 e o 4 nunca passam pelo `peek`.',
    },
    {
      id: 'pleno-t6-e02-q09',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<String> a = Stream.of("x").toList();
        long b = Stream.of("x").count();
        Object[] c = Stream.of("x").toArray();
        List<String> d = Stream.of("x").forEach(System.out::println);
    }
}`,
      resposta: 9,
      explicacao: '`forEach` é uma terminal que devolve `void`: ela executa uma ação, mas não produz resultado.',
    },
    {
      id: 'pleno-t6-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        int total = Stream.of("java", "é", "legal").reduce(0, (t, s) -> t + s.length(), Integer::sum);
        System.out.println(total);
    }
}`,
      opcoes: ['`10`', '`3`', '`javaélegal`', 'Não compila: o acumulador mistura tipos'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A forma de três argumentos permite um resultado de tipo diferente: o acumulador recebe um `Integer` e uma `String`. O combinador só é usado em paralelo.',
    },
    {
      id: 'pleno-t6-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = Stream.of(3, 1).sorted().toList();
        System.out.println(l);
        l.add(5);
        System.out.println(l);
    }
}`,
      opcoes: [
        'Imprime `[1, 3]` e lança `UnsupportedOperationException`',
        'Imprime `[1, 3]` e `[1, 3, 5]`',
        'Imprime `[3, 1]` e `[3, 1, 5]`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: '[1, 3]' },
      explicacao: '`Stream.toList()` devolve uma lista imutável. Para alterar, colete com `Collectors.toList()` ou copie para um `ArrayList`.',
    },
    {
      id: 'pleno-t6-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.iterate(1, n -> n + 1).allMatch(n -> n < 5));
    }
}`,
      opcoes: ['`false`', '`true`', 'O programa nunca termina', 'Lança `IllegalStateException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`allMatch` para no primeiro elemento que falha. A stream é infinita, mas o 5 aparece logo e decide a resposta.',
    },
    {
      id: 'pleno-t6-e02-q13',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = Stream.of("b", "a").collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        l.add("c");
        System.out.println(l);
    }
}`,
      resposta: '[b, a, c]',
      explicacao: 'A forma de três argumentos de `collect` cria o recipiente, acrescenta cada elemento e junta recipientes parciais. O resultado é um `ArrayList` comum, que aceita o "c".',
    },
    {
      id: 'pleno-t6-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of("pera", "uva", "kiwi").sorted().findFirst().map(String::length).orElse(-1));
    }
}`,
      opcoes: ['`4`', '`3`', '`-1`', '`kiwi`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em ordem alfabética, "kiwi" vem primeiro. O `map` do `Optional` transforma o texto no tamanho dele.',
    },
    {
      id: 'pleno-t6-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a identidade de um `reduce` precisa ser um valor neutro para a operação?',
      opcoes: [
        'Porque numa stream paralela ela é usada uma vez em cada pedaço da divisão',
        'Porque o compilador rejeita valores não neutros',
        'Porque ela é descartada se a stream não estiver vazia',
        'Porque `reduce` só funciona com somas',
      ],
      resposta: 0,
      explicacao: 'Cada parte paralela começa da identidade. Com 0 na soma, isso não muda nada; com 10, cada parte soma 10 a mais, e o resultado depende de quantas partes houve.',
    },
  ],
};

export default episodio;
