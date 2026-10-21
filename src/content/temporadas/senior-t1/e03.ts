import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t1-e03',
  minutos: 16,
  aula,
  armadilhas: [
    '`execute(Runnable)` devolve `void`; `submit(...)` devolve um `Future`.',
    '`Callable<V>.call()` devolve `V` e pode lançar exceções checked; `Runnable.run()` não faz nenhum dos dois.',
    'O `get()` de um `Future` de `Runnable` devolve `null`.',
    'A exceção lançada pela tarefa chega no `get()`, embrulhada numa `ExecutionException`; a original está em `getCause()`.',
    '`get(prazo)` lança `TimeoutException`, mas a tarefa continua rodando.',
    'Sem `shutdown()`, o programa não termina: as threads do pool não são daemon.',
    'Depois do `shutdown()`, `submit` e `execute` lançam `RejectedExecutionException`.',
    '`ExecutorService` só é `AutoCloseable` a partir do Java 19; no 17, não entra num try-with-resources.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Executors',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html',
      tipo: 'documentacao',
      porque: 'A separação entre tarefas e o mecanismo que as executa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Executor Interfaces',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/exinter.html',
      tipo: 'documentacao',
      porque: '`Executor`, `ExecutorService` e `ScheduledExecutorService`, com o papel de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Thread Pools',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/pools.html',
      tipo: 'documentacao',
      porque: 'Por que reaproveitar threads e os tipos de pool das fábricas de `Executors`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.ExecutorService',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html',
      tipo: 'documentacao',
      porque: 'O exemplo oficial de encerramento em duas fases e o `close()` do Java 19.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.Future',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Future.html',
      tipo: 'documentacao',
      porque: '`get`, `cancel`, `isDone` e os métodos `resultNow` e `state` do Java 19.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.Callable',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Callable.html',
      tipo: 'documentacao',
      porque: 'A tarefa com resultado e exceção, comparada ao `Runnable`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to the Java ExecutorService',
      url: 'https://www.baeldung.com/java-executor-service-tutorial',
      tipo: 'artigo',
      porque: 'Criação, envio de tarefas e encerramento correto de executores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Runnable vs. Callable in Java',
      url: 'https://www.baeldung.com/java-runnable-callable',
      tipo: 'artigo',
      porque: 'As duas interfaces de tarefa e o tratamento de exceções em cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to java.util.concurrent.Future',
      url: 'https://www.baeldung.com/java-future',
      tipo: 'artigo',
      porque: 'Esperar, cancelar e combinar resultados de tarefas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Concorrência pt 08, Executors pt 01, Thread Pools',
      url: 'https://www.youtube.com/watch?v=y7PUfmtWIXs',
      tipo: 'video',
      porque: 'Os pools de threads e as fábricas de `Executors`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Concorrência pt 10, Executors pt 03, Interface Callable',
      url: 'https://www.youtube.com/watch?v=ct9KQy16pVE',
      tipo: 'video',
      porque: 'Tarefas com resultado usando `Callable`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Concorrência pt 11, Executors pt 04, Future',
      url: 'https://www.youtube.com/watch?v=NzXEuBgTHKE',
      tipo: 'video',
      porque: 'Esperando e cancelando tarefas com `Future`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'O framework de executores explicado por quem o projetou, com o ciclo de vida e a configuração de pools.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Task Execution": seções 6.2, "The Executor framework", e 6.3, "Finding exploitable parallelism"; Cap. 8, "Applying Thread Pools"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As diferenças entre `execute` e `submit`, e entre `Runnable` e `Callable`, como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Creating Threads with the Concurrency API"',
    },
  ],
  desafio: {
    titulo: 'Downloads em paralelo',
    enunciado:
      'Escreva `static Callable<Integer> baixar(String nome)`, que simula um download: espera 100 ms e devolve o tamanho em KB (o tamanho do nome vezes 100), ou lança `IllegalArgumentException("nome vazio")` para um nome vazio. Envie as tarefas para `"relatorio.pdf"`, `"foto.png"`, `""` e `"notas.txt"` a um pool fixo de 2 threads, e depois leia os resultados na ordem de envio, tratando a falha. Encerre o pool num `finally`. A saída deve ser:\n\n```text\nrelatorio.pdf: 1300 KB\nfoto.png: 800 KB\nfalha: nome vazio\nnotas.txt: 900 KB\ntotal: 3000 KB em 3 arquivos\n```',
    dicas: [
      'Envie todas as tarefas antes do primeiro `get()`, para que rodem ao mesmo tempo.',
      'Ler os `Future` na ordem da lista mantém a saída na ordem de envio, mesmo que terminem fora de ordem.',
      'A exceção da tarefa chega como `ExecutionException`; a mensagem original está em `getCause()`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Downloads {
    static Callable<Integer> baixar(String nome) {
        return () -> {
            if (nome.isEmpty()) {
                throw new IllegalArgumentException("nome vazio");
            }
            Thread.sleep(100);
            return nome.length() * 100;
        };
    }

    public static void main(String[] args) throws InterruptedException {
        List<String> arquivos = List.of("relatorio.pdf", "foto.png", "", "notas.txt");
        ExecutorService pool = Executors.newFixedThreadPool(2);
        try {
            List<Future<Integer>> futuros = new ArrayList<>();
            for (String nome : arquivos) {
                futuros.add(pool.submit(baixar(nome)));
            }
            int total = 0;
            int baixados = 0;
            for (int i = 0; i < arquivos.size(); i++) {
                try {
                    int kb = futuros.get(i).get();
                    System.out.println(arquivos.get(i) + ": " + kb + " KB");
                    total += kb;
                    baixados++;
                } catch (ExecutionException e) {
                    System.out.println("falha: " + e.getCause().getMessage());
                }
            }
            System.out.println("total: " + total + " KB em " + baixados + " arquivos");
        } finally {
            pool.shutdown();
        }
    }
}`,
    saida: 'relatorio.pdf: 1300 KB\nfoto.png: 800 KB\nfalha: nome vazio\nnotas.txt: 900 KB\ntotal: 3000 KB em 3 arquivos',
    comentarios:
      'Com duas threads, os downloads acontecem de dois em dois, e o tempo total cai pela metade em relação a um laço sequencial. A falha de uma tarefa não derruba as outras: ela fica guardada no `Future` até alguém chamar `get()`. O `finally` garante o `shutdown` mesmo se algo der errado no meio, e sem ele o programa nunca terminaria.',
  },
  exercicios: [
    {
      id: 'senior-t1-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<String> a = ex.submit(() -> "x");
        Future<?> b = ex.submit(() -> { });
        System.out.println(a.get() + b.get());
        ex.shutdown();
    }
}`,
      opcoes: ['`xnull`', '`x`', '`x0`', 'Não compila: `Future<?>` não tem `get()`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A primeira lambda devolve valor e vira um `Callable<String>`. A segunda é um `Runnable`, cujo `Future` devolve `null` no `get()`.',
    },
    {
      id: 'senior-t1-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<?> a = ex.submit(() -> System.out.println("a"));
        Future<Integer> b = ex.submit(() -> System.out.println("b"));
        ex.shutdown();
    }
}`,
      opcoes: [
        'Não compila: uma tarefa sem retorno produz `Future<?>`, não `Future<Integer>`',
        'Compila e imprime `a` e `b`',
        'Compila e lança `ClassCastException`',
        'Não compila: `submit` não aceita lambdas',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'A chamada a `println` é `void`, então a lambda é um `Runnable`, e `submit(Runnable)` devolve `Future<?>`.',
    },
    {
      id: 'senior-t1-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<String> f = ex.submit(() -> {
            if (true) {
                throw new IOException("disco");
            }
            return "ok";
        });
        try {
            f.get();
        } catch (ExecutionException e) {
            System.out.println(e.getCause().getClass().getSimpleName() + ": " + e.getCause().getMessage());
        }
        ex.shutdown();
    }
}`,
      opcoes: ['`IOException: disco`', '`ExecutionException: disco`', 'Não compila: a lambda não pode lançar `IOException`', 'Lança `IOException` no `main`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como `Callable.call()` declara `throws Exception`, a tarefa pode lançar `IOException`. Ela é guardada e relançada no `get()`, embrulhada.',
    },
    {
      id: 'senior-t1-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<String> f = ex.submit(() -> {
            Thread.sleep(400);
            return "ok";
        });
        try {
            f.get(20, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            System.out.print("T ");
        }
        System.out.println(f.get());
        ex.shutdown();
    }
}`,
      opcoes: ['`T ok`', '`T`', '`ok`', 'Lança `TimeoutException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O prazo esgotado só faz o `get` desistir de esperar. A tarefa continua, e o segundo `get()` recebe o resultado.',
    },
    {
      id: 'senior-t1-e03-q05',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`Callable.call()` pode lançar exceções checked',
        '`Callable` devolve um valor',
        '`Runnable.run()` devolve um `Future`',
        '`execute()` aceita um `Callable`',
        '`submit()` só aceita `Runnable`',
      ],
      respostas: [0, 1],
      explicacao: '`execute` só aceita `Runnable` e devolve `void`; `submit` aceita os dois e devolve `Future`.',
    },
    {
      id: 'senior-t1-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(2);
        System.out.println(ex.submit(() -> "primeira").get());
        ex.shutdown();
        ex.submit(() -> "segunda");
    }
}`,
      opcoes: [
        'Imprime `primeira` e lança `RejectedExecutionException`',
        'Imprime `primeira` e executa a segunda',
        'Imprime `primeira` e ignora a segunda em silêncio',
        'Lança `IllegalStateException` no `shutdown`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'RejectedExecutionException', saida: 'primeira' },
      explicacao: 'Depois do `shutdown`, o executor não aceita tarefas novas, e as recusa com exceção.',
    },
    {
      id: 'senior-t1-e03-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que encerra o executor, para que o programa termine. O programa deve imprimir `42`.',
      codigo: `import java.util.concurrent.*;

public class Fim {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<Integer> f = executor.submit(() -> 6 * 7);
        System.out.println(f.get());
        executor.___();
    }
}`,
      respostas: ['shutdown', 'shutdownNow'],
      saida: '42',
      explicacao: 'As threads do pool não são daemon. Sem `shutdown()`, elas continuariam esperando tarefas, e a JVM nunca terminaria.',
    },
    {
      id: 'senior-t1-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        StringBuilder sb = new StringBuilder();
        ex.submit(() -> sb.append("a"));
        ex.submit(() -> sb.append("b"));
        Future<?> ultima = ex.submit(() -> sb.append("c"));
        ultima.get();
        System.out.println(sb);
        ex.shutdown();
    }
}`,
      opcoes: ['`abc`', 'Uma ordem imprevisível de a, b e c', '`c`', '`cba`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com uma única thread, as tarefas rodam na ordem de envio. Esperar a última garante que as anteriores já terminaram.',
    },
    {
      id: 'senior-t1-e03-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        ex.execute(() -> System.out.println("a"));
        ex.submit(() -> 42);
        ex.execute(() -> 42);
        ex.shutdown();
    }
}`,
      resposta: 8,
      explicacao: '`execute` só recebe `Runnable`, e uma lambda que devolve 42 não é um `Runnable`. O `submit` da linha 7 aceita, como `Callable`.',
    },
    {
      id: 'senior-t1-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      provas: ['830', '831'],
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        try (ExecutorService ex = Executors.newFixedThreadPool(2)) {
            System.out.print(ex.submit(() -> "dentro ").get());
        }
        System.out.println("fora");
    }
}`,
      opcoes: ['`dentro fora`', 'Não compila: `ExecutorService` não é `AutoCloseable`', '`fora`', 'O programa nunca termina'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Desde o Java 19, `ExecutorService` é `AutoCloseable`. O `close()` faz o `shutdown` e espera as tarefas terminarem.',
    },
    {
      id: 'senior-t1-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 17, qual é o resultado de compilar?',
      provas: ['829'],
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        try (ExecutorService ex = Executors.newFixedThreadPool(2)) {
            System.out.println(ex.submit(() -> "ok").get());
        }
    }
}`,
      opcoes: [
        'Não compila: no Java 17, `ExecutorService` não é `AutoCloseable`',
        'Compila e imprime `ok`',
        'Compila, mas o programa nunca termina',
        'Não compila: `submit` não aceita lambdas',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'O `close()` em `ExecutorService` chegou no Java 19. No 17, é preciso `shutdown()` num `finally`.',
    },
    {
      id: 'senior-t1-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<Integer> f = ex.submit(() -> {
            Thread.sleep(5000);
            return 1;
        });
        Thread.sleep(50);
        f.cancel(true);
        System.out.println(f.isDone() + " " + f.isCancelled());
        ex.shutdown();
    }
}`,
      opcoes: ['`true true`', '`false true`', '`true false`', '`false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Uma tarefa cancelada conta como terminada para `isDone()`. Com `true`, o `cancel` também interrompe a thread que a executava, que sai do `sleep`.',
    },
    {
      id: 'senior-t1-e03-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        List<Future<Integer>> futuros = new ArrayList<>();
        for (int i = 1; i <= 4; i++) {
            int n = i;
            futuros.add(pool.submit(() -> n * n));
        }
        int soma = 0;
        for (Future<Integer> f : futuros) {
            soma += f.get();
        }
        System.out.println(soma);
        pool.shutdown();
    }
}`,
      resposta: '30',
      explicacao: 'As tarefas podem rodar em qualquer ordem nas três threads, mas a soma só acontece depois de cada `get()`: 1 + 4 + 9 + 16.',
    },
    {
      id: 'senior-t1-e03-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<Integer> f = ex.submit(() -> {
            Thread.sleep(5000);
            return 1;
        });
        f.cancel(true);
        System.out.println("cancelada");
        ex.shutdown();
        System.out.println(f.get());
    }
}`,
      opcoes: [
        'Imprime `cancelada` e lança `CancellationException`',
        'Imprime `cancelada` e `1`',
        'Imprime `cancelada` e `null`',
        'Imprime `cancelada` e espera 5 segundos',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'CancellationException', saida: 'cancelada' },
      explicacao: 'O `get()` de uma tarefa cancelada não espera nem devolve valor: lança `CancellationException`, que é unchecked.',
    },
    {
      id: 'senior-t1-e03-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um programa cria um `newFixedThreadPool(4)`, envia tarefas, imprime os resultados e chega ao fim do `main`, mas nunca termina. Qual é a causa mais provável?',
      opcoes: [
        'Faltou chamar `shutdown()`: as threads do pool não são daemon e seguem esperando tarefas',
        'Uma das tarefas lançou exceção',
        'O `main` precisa chamar `System.exit` em todo programa com threads',
        'O pool fixo não permite que o `main` termine antes dele',
      ],
      resposta: 0,
      explicacao: 'A JVM só termina quando todas as threads não daemon acabam. As do pool ficam vivas, esperando trabalho, até o executor ser encerrado.',
    },
  ],
};

export default episodio;
