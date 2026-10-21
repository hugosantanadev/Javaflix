import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t2-e06',
  minutos: 16,
  aula,
  armadilhas: [
    'Alterar um `ArrayList` dentro de um `forEach` paralelo pode perder elementos ou lançar exceção.',
    'Em paralelo, `reduce` aplica a identidade a cada pedaço: uma identidade que não é neutra muda o resultado.',
    'Acumuladores não associativos, como a subtração, dão resultados diferentes em paralelo.',
    '`reduce` com operação associativa e `collect` mantêm a ordem de encontro, mesmo em paralelo.',
    '`parallelStream()` existe em `Collection`, não em `Stream`; num `Stream`, use `parallel()`.',
    'Um stream só pode ser consumido uma vez: a segunda operação terminal lança `IllegalStateException`.',
    '`groupingByConcurrent` e `toConcurrentMap` não garantem a ordem dos elementos dentro dos grupos.',
    'Em fork/join, chame `fork()` numa metade e `compute()` na outra; depois, `join()` na que foi bifurcada.',
  ],
  recursos: [
    {
      titulo: 'Javadoc do pacote java.util.stream',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html',
      tipo: 'documentacao',
      porque: 'As seções oficiais sobre paralelismo, não interferência, lambdas sem estado, efeitos colaterais e associatividade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Fork/Join',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html',
      tipo: 'documentacao',
      porque: 'O padrão de dividir até um limite e resolver em sequência, com um exemplo de processamento de imagem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.RecursiveTask',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/RecursiveTask.html',
      tipo: 'documentacao',
      porque: 'O exemplo oficial de Fibonacci com `fork`, `compute` e `join`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.ForkJoinPool',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ForkJoinPool.html',
      tipo: 'documentacao',
      porque: 'O pool comum, o roubo de trabalho e as propriedades que configuram o paralelismo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to the Fork/Join Framework in Java',
      url: 'https://www.baeldung.com/java-fork-join',
      tipo: 'artigo',
      porque: '`RecursiveTask`, `RecursiveAction` e o pool comum, com um exemplo de cada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Custom Thread Pools in Java Parallel Streams',
      url: 'https://www.baeldung.com/java-8-parallel-streams-custom-threadpool',
      tipo: 'artigo',
      porque: 'Como executar um stream paralelo fora do pool comum, e por que isso é um detalhe de implementação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Jakob Jenkov: Java ForkJoinPool',
      url: 'https://jenkov.com/tutorials/java-util-concurrent/java-fork-and-join-forkjoinpool.html',
      tipo: 'artigo',
      porque: 'A diferença entre bifurcar e juntar, com diagramas da divisão das tarefas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Streams pt 17, Parallel Streams pt 02',
      url: 'https://www.youtube.com/watch?v=ZnkpA5rUq6I',
      tipo: 'video',
      porque: 'Quando o paralelismo compensa e quando atrapalha, medindo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Defog Tech: Understanding how ForkJoinPool works',
      url: 'https://www.youtube.com/watch?v=5wgZYyvIVJk',
      tipo: 'video',
      porque: 'As filas por thread e o roubo de trabalho, desenhados passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java ForkJoinPool',
      url: 'https://www.youtube.com/watch?v=aiwuJQt7YJU',
      tipo: 'video',
      porque: '`RecursiveTask` e `RecursiveAction` em código, com a divisão até o limite.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Modern Java in Action (Urma, Fusco e Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'Medições de streams paralelos, o uso correto e o framework fork/join que os sustenta.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Parallel data processing and performance": seções 7.1, "Parallel streams", 7.2, "The fork/join framework", e 7.3, "Spliterator"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Streams paralelos com as pegadinhas de ordem e de `reduce` que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Working with Parallel Streams"',
    },
  ],
  desafio: {
    titulo: 'Primos em paralelo',
    enunciado:
      'Escreva `static boolean primo(int n)` por divisão até a raiz quadrada. Com streams paralelos de `IntStream`, calcule quantos primos existem até 1 milhão e confira com a versão sequencial; encontre, em ordem, os cinco primeiros primos entre 1000000 e 1000100; e some os primos até 100. A saída deve ser:\n\n```text\nprimos até 1 milhão: 78498\nmesmo resultado em sequência: true\ncinco primeiros depois de 1 milhão: [1000003, 1000033, 1000037, 1000039, 1000081]\nsoma dos primos até 100: 1060\n```',
    dicas: [
      '`IntStream.rangeClosed(a, b).parallel()` divide bem, porque a faixa sabe onde fica o meio.',
      '`primo` não tem estado nem efeito colateral, e por isso é seguro em paralelo.',
      '`filter`, `limit` e `toList` mantêm a ordem de encontro: os cinco primeiros saem em ordem crescente.',
    ],
    solucao: `import java.util.List;
import java.util.stream.IntStream;

public class Primos {
    static boolean primo(int n) {
        if (n < 2) {
            return false;
        }
        for (int d = 2; (long) d * d <= n; d++) {
            if (n % d == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        long paralela = IntStream.rangeClosed(1, 1_000_000).parallel().filter(Primos::primo).count();
        long sequencial = IntStream.rangeClosed(1, 1_000_000).filter(Primos::primo).count();
        List<Integer> depoisDoMilhao = IntStream.rangeClosed(1_000_000, 1_000_100).parallel()
            .filter(Primos::primo)
            .limit(5)
            .boxed()
            .toList();
        int somaAte100 = IntStream.rangeClosed(1, 100).parallel().filter(Primos::primo).sum();
        System.out.println("primos até 1 milhão: " + paralela);
        System.out.println("mesmo resultado em sequência: " + (paralela == sequencial));
        System.out.println("cinco primeiros depois de 1 milhão: " + depoisDoMilhao);
        System.out.println("soma dos primos até 100: " + somaAte100);
    }
}`,
    saida: 'primos até 1 milhão: 78498\nmesmo resultado em sequência: true\ncinco primeiros depois de 1 milhão: [1000003, 1000033, 1000037, 1000039, 1000081]\nsoma dos primos até 100: 1060',
    comentarios:
      'Testar primalidade é trabalho de CPU puro, com muitos elementos independentes: o caso ideal para streams paralelos. O resultado em paralelo é idêntico ao sequencial porque `primo` só lê o próprio argumento. O `limit(5)` num stream ordenado obriga o paralelismo a respeitar a ordem, o que custa algum trabalho extra; se só importassem cinco primos quaisquer, `unordered()` deixaria a operação mais barata.',
  },
  exercicios: [
    {
      id: 'senior-t2-e06-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que o trecho imprime?',
      codigo: `List<Integer> lista = new ArrayList<>();
IntStream.range(0, 10_000).parallel().forEach(lista::add);
System.out.println(lista.size());`,
      opcoes: [
        'Não há saída garantida: pode imprimir menos que 10000 ou lançar exceção',
        'Sempre `10000`',
        'Sempre `0`',
        'Não compila: `forEach` não aceita referência a método',
      ],
      resposta: 0,
      explicacao: 'Várias threads alteram o mesmo `ArrayList` sem sincronização. O certo é `IntStream.range(0, 10_000).parallel().boxed().toList()`.',
    },
    {
      id: 'senior-t2-e06-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.List;

public class Teste {
    public static void main(String[] args) {
        List<String> palavras = List.of("um", "dois", "tres");
        int total = palavras.parallelStream().reduce(0, (soma, p) -> soma + p.length(), Integer::sum);
        System.out.println(total);
    }
}`,
      resposta: '10',
      explicacao: 'O acumulador soma o tamanho de cada palavra ao parcial; o combinador soma os parciais dos pedaços: 2 + 4 + 4.',
    },
    {
      id: 'senior-t2-e06-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.Stream;

public class Teste {
    public static void main(String[] args) {
        String s = Stream.of("a", "b", "c", "d").parallel().reduce("", String::concat);
        StringBuilder sb = Stream.of("w", "x", "y", "z").parallel()
            .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
        System.out.println(s + " " + sb);
    }
}`,
      opcoes: ['`abcd wxyz`', 'Uma ordem imprevisível nas duas partes', '`abcd` e uma ordem imprevisível na segunda', '`dcba zyxw`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A concatenação é associativa e `""` é neutro; `reduce` e `collect` combinam os pedaços na ordem de encontro. A ordem de execução varia, a do resultado não.',
    },
    {
      id: 'senior-t2-e06-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de `Stream.of(1, 2, 3).parallel().reduce(10, Integer::sum)`?',
      opcoes: [
        'Pode variar: o 10 é somado uma vez por pedaço, e a divisão depende da máquina',
        'Sempre 16',
        'Sempre 46',
        'Não compila: a identidade precisa ser 0',
      ],
      resposta: 0,
      explicacao: 'Em sequência seria 16. Em paralelo, cada pedaço começa pela identidade; com três pedaços, por exemplo, seria 36. Por isso a identidade precisa ser neutra.',
    },
    {
      id: 'senior-t2-e06-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Para que `reduce(identidade, acumulador)` dê o mesmo resultado em paralelo e em sequência, quais condições são necessárias? Escolha duas.',
      opcoes: [
        'A identidade é neutra para o acumulador',
        'O acumulador é associativo',
        'O acumulador é `synchronized`',
        'O stream foi criado com `parallelStream()`',
        'Os elementos estão ordenados',
      ],
      respostas: [0, 1],
      explicacao: 'Com identidade neutra e operação associativa, não importa como o stream é dividido. Sincronizar o acumulador não resolveria uma identidade errada.',
    },
    {
      id: 'senior-t2-e06-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que torna o stream paralelo. O programa deve imprimir `true`.',
      codigo: `import java.util.stream.Stream;

public class Paralelo {
    public static void main(String[] args) {
        System.out.println(Stream.of(1, 2, 3).___().isParallel());
    }
}`,
      respostas: ['parallel'],
      saida: 'true',
      explicacao: 'Num `Stream`, o método é `parallel()`. `parallelStream()` é de `Collection`.',
    },
    {
      id: 'senior-t2-e06-q07',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        long a = List.of(1, 2, 3).parallelStream().count();
        long b = Stream.of(1, 2, 3).parallel().count();
        long c = Stream.of(1, 2, 3).parallelStream().count();
        System.out.println(a + b + c);
    }
}`,
      resposta: 8,
      explicacao: '`parallelStream()` é um método de `Collection`. Um `Stream` já existente vira paralelo com `parallel()`.',
    },
    {
      id: 'senior-t2-e06-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream<Integer> s = List.of(1, 2).parallelStream();
        System.out.println(s.count());
        System.out.println(s.count());
    }
}`,
      opcoes: [
        'Imprime `2` e lança `IllegalStateException`',
        'Imprime `2` duas vezes',
        'Imprime `2` e `0`',
        'Não compila: `count` não pode ser chamado duas vezes',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: '2' },
      explicacao: 'Uma operação terminal consome o stream. Para contar de novo, é preciso criar outro a partir da lista.',
    },
    {
      id: 'senior-t2-e06-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.RecursiveTask;

public class Teste extends RecursiveTask<Integer> {
    private final int n;

    Teste(int n) {
        this.n = n;
    }

    @Override
    protected Integer compute() {
        if (n <= 1) {
            return n;
        }
        Teste a = new Teste(n - 1);
        a.fork();
        return new Teste(n - 2).compute() + a.join();
    }

    public static void main(String[] args) {
        System.out.println(new Teste(10).invoke());
    }
}`,
      opcoes: ['`55`', '`89`', '`10`', 'Lança `IllegalStateException`: a tarefa não foi enviada a um pool'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'É o Fibonacci do Javadoc de `RecursiveTask`. `invoke()` chamado fora de um pool executa a tarefa no pool comum. O décimo número de Fibonacci é 55.',
    },
    {
      id: 'senior-t2-e06-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em que threads rodam as lambdas de `lista.parallelStream().map(...).toList()`, por padrão?',
      opcoes: [
        'Nas threads do `ForkJoinPool` comum e também na thread que chamou `toList()`',
        'Numa thread nova criada para cada elemento',
        'Só na thread que chamou `toList()`',
        'Num `ExecutorService` que precisa ser informado antes',
      ],
      resposta: 0,
      explicacao: 'O pool comum é compartilhado pelo processo inteiro e tem, por padrão, uma thread a menos que o número de núcleos, porque quem chama também trabalha.',
    },
    {
      id: 'senior-t2-e06-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        ConcurrentMap<Boolean, Long> m = IntStream.rangeClosed(1, 10).parallel().boxed()
            .collect(Collectors.groupingByConcurrent(n -> n % 3 == 0, Collectors.counting()));
        System.out.println(new TreeMap<>(m));
    }
}`,
      resposta: '{false=7, true=3}',
      explicacao: 'De 1 a 10, os múltiplos de 3 são 3, 6 e 9. O `TreeMap` ordena as chaves: `false` vem antes de `true`.',
    },
    {
      id: 'senior-t2-e06-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um pipeline paralelo faz `.map(x -> { contador++; return x * 2; })`, com `contador` sendo um campo `int`. O que acontece?',
      opcoes: [
        'O mapeamento sai certo, mas `contador` pode terminar com um valor menor que o número de elementos',
        'Não compila: lambdas não podem alterar campos',
        'O stream deixa de ser paralelo',
        'Lança `ConcurrentModificationException`',
      ],
      resposta: 0,
      explicacao: 'Lambdas podem alterar campos, mas aqui o incremento corre em várias threads sem proteção. Para contar, use `count()` ou um contador atômico, e melhor ainda, nenhum efeito colateral.',
    },
    {
      id: 'senior-t2-e06-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual fonte de dados tende a se dividir pior num stream paralelo?',
      opcoes: ['`LinkedList`', '`ArrayList`', 'Um array', '`IntStream.range`'],
      resposta: 0,
      explicacao: 'Dividir uma lista ligada exige percorrer os nós até o meio. `ArrayList`, arrays e faixas sabem calcular o meio pelo índice.',
    },
    {
      id: 'senior-t2-e06-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais operações dão o mesmo resultado num stream paralelo ordenado e na versão sequencial? Escolha três.',
      opcoes: ['`toList()`', '`findFirst()`', '`forEachOrdered(...)`', '`findAny()`', '`forEach(System.out::println)`'],
      respostas: [0, 1, 2],
      explicacao: 'Essas três respeitam a ordem de encontro. `findAny` pode devolver qualquer elemento, e `forEach` imprime na ordem em que as threads processam.',
    },
    {
      id: 'senior-t2-e06-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num `RecursiveTask`, por que se faz `esquerda.fork(); long d = direita.compute(); return esquerda.join() + d;` em vez de chamar `fork()` nas duas metades?',
      opcoes: [
        'Para a thread atual trabalhar numa metade em vez de ficar parada esperando as duas',
        'Porque `fork()` só pode ser chamado uma vez por tarefa pai',
        'Porque `compute()` é mais rápido que `join()` em qualquer caso',
        'Para evitar `IllegalStateException`',
      ],
      resposta: 0,
      explicacao: 'Bifurcar as duas também funciona, mas a thread atual só esperaria. Calcular uma metade diretamente aproveita a thread e reduz o número de tarefas na fila.',
    },
  ],
};

export default episodio;
