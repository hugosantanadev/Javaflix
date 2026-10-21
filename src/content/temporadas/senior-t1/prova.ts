import type { Exercicio } from '../../types';

/** Prova da temporada Sênior T1: threads. */
const prova: Exercicio[] = [
  {
    id: 'senior-t1-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.print(Thread.currentThread().getName() + " "), "worker");
        t.run();
        t.start();
        t.join();
        System.out.println(t.getState());
    }
}`,
    opcoes: ['`main worker TERMINATED`', '`worker worker TERMINATED`', '`main main TERMINATED`', '`main worker RUNNABLE`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`run()` direto executa na thread atual, a `main`. Só o `start()` cria a thread `worker`, e depois do `join` ela está em `TERMINATED`.',
  },
  {
    id: 'senior-t1-prova-q02',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.print("a"));
        t.start();
        t.join();
        t.start();
    }
}`,
    opcoes: [
      'Imprime `a` e lança `IllegalThreadStateException`',
      'Imprime `aa`',
      'Imprime `a` e termina normalmente',
      'Não compila: `start` não pode ser chamado duas vezes',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalThreadStateException', saida: 'a' },
    explicacao: 'Uma thread só pode ser iniciada uma vez. O compilador não detecta isso; o erro aparece em tempo de execução.',
  },
  {
    id: 'senior-t1-prova-q03',
    tipo: 'multipla',
    dificuldade: 1,
    enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
    opcoes: [
      'Uma thread pode ser criada estendendo `Thread` e sobrescrevendo `run()`',
      'Uma thread pode ser criada passando um `Runnable` ao construtor de `Thread`',
      'O construtor de `Thread` aceita um `Callable`',
      'Chamar `run()` diretamente cria uma thread nova',
      '`setPriority(Thread.MAX_PRIORITY)` garante que a thread rode antes das outras',
    ],
    respostas: [0, 1],
    explicacao: '`Callable` é usado com executores, não com `Thread`. `run()` direto roda na thread atual, e prioridades são só sugestões ao escalonador.',
  },
  {
    id: 'senior-t1-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        Thread.currentThread().interrupt();
        System.out.print(Thread.interrupted() + " ");
        System.out.print(Thread.interrupted() + " ");
        Thread.currentThread().interrupt();
        System.out.println(Thread.currentThread().isInterrupted());
    }
}`,
    opcoes: ['`true false true`', '`true true true`', '`true false false`', '`false false true`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O método estático `interrupted()` lê e desliga a marca; a segunda chamada já encontra `false`. `isInterrupted()` só lê, sem desligar.',
  },
  {
    id: 'senior-t1-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.print("interrompida ");
            }
        });
        t.start();
        t.join(100);
        System.out.print(t.isAlive() + " ");
        t.interrupt();
        t.join();
        System.out.println(t.isAlive());
    }
}`,
    opcoes: ['`true interrompida false`', '`false false`', '`true false`', '`interrompida true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`join(100)` desiste depois de 100 ms, com a thread ainda dormindo. A interrupção a acorda com exceção, e o segundo `join` espera ela terminar.',
  },
  {
    id: 'senior-t1-prova-q06',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `public class Teste {
    public static void main(String[] args) {
        Thread.currentThread().interrupt();
        try {
            Thread.sleep(5000);
            System.out.println("dormiu");
        } catch (InterruptedException e) {
            System.out.println("acordou " + Thread.currentThread().isInterrupted());
        }
    }
}`,
    resposta: 'acordou false',
    explicacao: 'Com a marca já ligada, `sleep` lança `InterruptedException` na hora, sem dormir. Ao lançar, ele desliga a marca.',
  },
  {
    id: 'senior-t1-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Callable<Integer> c = () -> 42;
        Runnable r = () -> System.out.println("oi");
        Future<Integer> f1 = ex.submit(c);
        Future<Integer> f2 = ex.submit(r);
        System.out.println(f1.get());
        ex.shutdown();
    }
}`,
    opcoes: [
      'Não compila: `submit(Runnable)` devolve `Future<?>`',
      'Compila e imprime `oi` e `42`',
      'Compila e imprime `42`',
      'Não compila: `submit` não aceita `Callable`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 9 },
    explicacao: 'O `Future` de um `Runnable` não tem tipo de resultado definido, e não pode ser atribuído a `Future<Integer>`.',
  },
  {
    id: 'senior-t1-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        int zero = 0;
        Future<Integer> f = ex.submit(() -> 10 / zero);
        try {
            System.out.println(f.get());
        } catch (ExecutionException e) {
            System.out.println(f.isDone() + " " + e.getCause().getClass().getSimpleName());
        }
        ex.shutdown();
    }
}`,
    opcoes: ['`true ArithmeticException`', '`false ArithmeticException`', '`true ExecutionException`', 'Lança `ArithmeticException` no `main`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A tarefa que termina com exceção também conta como terminada. A exceção original fica em `getCause()` da `ExecutionException`.',
  },
  {
    id: 'senior-t1-prova-q09',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre o encerramento de um `ExecutorService` são verdadeiras? Escolha duas.',
    opcoes: [
      '`shutdown()` deixa as tarefas já enviadas terminarem',
      'Depois do `shutdown()`, `submit` lança `RejectedExecutionException`',
      '`shutdown()` bloqueia até todas as tarefas terminarem',
      '`shutdownNow()` garante que as tarefas em execução parem na hora',
      '`isTerminated()` devolve `true` logo após o `shutdown()`',
    ],
    respostas: [0, 1],
    explicacao: 'Quem espera é `awaitTermination`. `shutdownNow()` só interrompe as tarefas, que podem ignorar o pedido, e `isTerminated()` só fica `true` quando todas acabam.',
  },
  {
    id: 'senior-t1-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newSingleThreadExecutor();
        Future<String> f = ex.submit(() -> {
            Thread.sleep(2000);
            return "x";
        });
        System.out.println("esperando");
        try {
            System.out.println(f.get(100, TimeUnit.MILLISECONDS));
        } finally {
            ex.shutdownNow();
        }
    }
}`,
    opcoes: [
      'Imprime `esperando` e lança `TimeoutException`',
      'Imprime `esperando` e `x`',
      'Imprime `esperando` e `null`',
      'Imprime `esperando` e lança `InterruptedException`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'TimeoutException', saida: 'esperando' },
    explicacao: 'O prazo de 100 ms se esgota antes da tarefa. O `finally` interrompe a tarefa com `shutdownNow`, e a `TimeoutException` sai do `main`.',
  },
  {
    id: 'senior-t1-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ScheduledExecutorService s = Executors.newScheduledThreadPool(2);
        ScheduledFuture<?> a = s.schedule(() -> System.out.print("a "), 200, TimeUnit.MILLISECONDS);
        ScheduledFuture<String> b = s.schedule(() -> "b", 10, TimeUnit.MILLISECONDS);
        System.out.println(b.get() + " " + a.get());
        s.shutdown();
    }
}`,
    opcoes: ['`a b null`', '`b a`', '`b null`', '`b a null`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A concatenação só é impressa depois dos dois `get()`. Enquanto o `main` espera o segundo, a tarefa `a` imprime `a `. O `get()` de um `Runnable` devolve `null`.',
  },
  {
    id: 'senior-t1-prova-q12',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Considere `ScheduledExecutorService s` e `AtomicInteger n`. Quais chamadas compilam? Escolha três.',
    opcoes: [
      '`s.scheduleAtFixedRate(() -> n.incrementAndGet(), 0, 1, TimeUnit.SECONDS);`',
      '`s.schedule(() -> "pronto", 1, TimeUnit.SECONDS);`',
      '`s.scheduleWithFixedDelay(() -> System.out.println("x"), 0, 1, TimeUnit.SECONDS);`',
      '`s.scheduleAtFixedRate(() -> "x", 0, 1, TimeUnit.SECONDS);`',
      '`s.scheduleWithFixedDelay(() -> { return 1; }, 0, 1, TimeUnit.SECONDS);`',
      '`s.schedule(() -> "x", 1);`',
    ],
    respostas: [0, 1, 2],
    explicacao: 'A primeira compila porque uma chamada de método pode ser usada como comando e ter o resultado descartado, e serve como `Runnable`. Já `"x"` e `return 1` só servem para tarefas com retorno, que os métodos periódicos não aceitam. E `schedule` exige a unidade de tempo.',
  },
  {
    id: 'senior-t1-prova-q13',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(3);
        List<Callable<String>> tarefas = List.of(
            () -> { Thread.sleep(300); return "x"; },
            () -> { throw new IllegalStateException(); },
            () -> "z");
        StringBuilder sb = new StringBuilder();
        for (Future<String> f : ex.invokeAll(tarefas)) {
            try {
                sb.append(f.get());
            } catch (ExecutionException e) {
                sb.append("-");
            }
        }
        System.out.println(sb + " " + ex.invokeAny(tarefas));
        ex.shutdown();
    }
}`,
    resposta: 'x-z z',
    explicacao: '`invokeAll` devolve os `Future` na ordem da lista, e a falha vira um `-`. `invokeAny` ignora a falha e fica com a primeira tarefa bem-sucedida, a `z`, que termina na hora.',
  },
  {
    id: 'senior-t1-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Uma tarefa que leva 500 ms é agendada com atraso inicial 0 e intervalo de 2 segundos. Em que momento começa a terceira execução com `scheduleAtFixedRate` e com `scheduleWithFixedDelay`, respectivamente?',
    opcoes: ['4 s e 5 s', '4 s e 4 s', '5 s e 5 s', '4,5 s e 5 s'],
    resposta: 0,
    explicacao: 'Na taxa fixa, as execuções começam em 0, 2 e 4 s. No atraso fixo, cada uma espera 2 s depois do fim da anterior: 0, 2,5 e 5 s.',
  },
  {
    id: 'senior-t1-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    provas: ['830', '831'],
    codigo: `public class Teste {
    public static void main(String[] args) {
        Thread v = Thread.ofVirtual().name("v").unstarted(() -> { });
        Thread p = Thread.ofPlatform().name("p").unstarted(() -> { });
        System.out.println(v.getName() + v.isDaemon() + " " + p.getName() + p.isDaemon());
    }
}`,
    opcoes: ['`vtrue pfalse`', '`vtrue ptrue`', '`vfalse pfalse`', '`true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Threads virtuais são sempre daemon. A de plataforma herda a condição de quem a criou, a `main`, que não é daemon.',
  },
  {
    id: 'senior-t1-prova-q16',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Em quais cenários trocar threads de plataforma por threads virtuais tende a aumentar a vazão? Escolha dois.',
    provas: ['830', '831'],
    opcoes: [
      'Um servidor que passa a maior parte do tempo esperando respostas do banco e de outros serviços HTTP',
      'Milhares de tarefas que leem de sockets e esperam a resposta',
      'O cálculo de números primos usando todos os núcleos',
      'A ordenação de um array grande que já está na memória',
      'A renderização de imagens com uso intenso de CPU',
    ],
    respostas: [0, 1],
    explicacao: 'Threads virtuais ganham quando as tarefas esperam: enquanto uma espera, a carregadora executa outra. Tarefas de CPU continuam limitadas pelo número de núcleos.',
  },
  {
    id: 'senior-t1-prova-q17',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    provas: ['830', '831'],
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Thread.Builder construtor = Thread.ofVirtual().name("t-", 5);
        List<String> nomes = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            nomes.add(construtor.unstarted(() -> { }).getName());
        }
        System.out.println(nomes);
    }
}`,
    resposta: '[t-5, t-6, t-7]',
    explicacao: 'O contador do construtor começa no número informado e avança a cada thread criada, iniciada ou não.',
  },
  {
    id: 'senior-t1-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    provas: ['830', '831'],
    codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        try (ExecutorService ex = Executors.newVirtualThreadPerTaskExecutor()) {
            ex.submit(() -> {
                Thread.sleep(200);
                System.out.print("tarefa ");
                return null;
            });
        }
        System.out.println("fim");
    }
}`,
    opcoes: ['`tarefa fim`', '`fim`', '`fim tarefa`', 'Não compila: `ExecutorService` não é `AutoCloseable`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A thread da tarefa é virtual e, portanto, daemon, mas o `close()` do executor espera todas as tarefas terminarem antes de sair do try.',
  },
  {
    id: 'senior-t1-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    provas: ['831'],
    codigo: `public class Teste {
    static final ScopedValue<String> NOME = ScopedValue.newInstance();

    static String saudar() {
        return "olá, " + NOME.orElse("visitante");
    }

    public static void main(String[] args) {
        System.out.print(saudar() + " | ");
        String r = ScopedValue.where(NOME, "ana").call(() -> saudar() + " | " + ScopedValue.where(NOME, "bia").call(Teste::saudar));
        System.out.println(r);
    }
}`,
    opcoes: [
      '`olá, visitante | olá, ana | olá, bia`',
      '`olá, visitante | olá, bia | olá, bia`',
      '`olá, ana | olá, ana | olá, bia`',
      'Lança `NoSuchElementException`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Fora de qualquer associação, `orElse` devolve a alternativa. O primeiro `saudar()` do `call` roda antes da associação aninhada, e só o último enxerga `bia`.',
  },
  {
    id: 'senior-t1-prova-q20',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Sobre o Java 25, qual afirmação é verdadeira?',
    provas: ['831'],
    opcoes: [
      '`ScopedValue` é definitivo, e `StructuredTaskScope` ainda é preview',
      'Os dois são definitivos',
      'Os dois ainda são preview',
      '`StructuredTaskScope` é definitivo, e `ScopedValue` ainda é preview',
    ],
    resposta: 0,
    explicacao: 'Os scoped values foram finalizados pela JEP 506. A concorrência estruturada está na quinta preview (JEP 505) e exige `--enable-preview`.',
  },
];

export default prova;
