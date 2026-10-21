import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t1-e01',
  minutos: 14,
  aula,
  armadilhas: [
    '`start()` cria uma thread e executa `run()` nela; chamar `run()` direto executa na thread atual.',
    'Uma thread só pode ser iniciada uma vez: o segundo `start()` lança `IllegalThreadStateException`.',
    '`setDaemon` numa thread já iniciada e ainda viva lança `IllegalThreadStateException`.',
    'Sem sincronização, a ordem de execução entre threads não é garantida; prioridades são só sugestão.',
    'A prioridade padrão é 5 (`NORM_PRIORITY`), entre 1 e 10.',
    'Uma exceção não tratada encerra só a thread em que aconteceu; as outras continuam.',
    '`Runnable.run()` não devolve valor nem declara exceções checked: `Thread.sleep` dentro dele exige `try`.',
    'Uma thread herda a condição de daemon da thread que a criou.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Processes and Threads',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html',
      tipo: 'documentacao',
      porque: 'A diferença entre processos e threads e o que a JVM cria sozinha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Defining and Starting a Thread',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/runthread.html',
      tipo: 'documentacao',
      porque: 'As duas formas de criar uma thread e por que `Runnable` é a mais flexível.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.Thread',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html',
      tipo: 'documentacao',
      porque: 'Construtores, nomes, prioridades, daemon e o tratamento de exceções não capturadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS, capítulo 17: Threads and Locks',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html',
      tipo: 'documentacao',
      porque: 'O modelo de memória do Java, que define quando uma thread enxerga o que a outra escreveu.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Implementing a Runnable vs Extending a Thread',
      url: 'https://www.baeldung.com/java-runnable-vs-extending-thread',
      tipo: 'artigo',
      porque: 'As duas formas lado a lado, com os motivos para preferir `Runnable`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: How to Start a Thread in Java',
      url: 'https://www.baeldung.com/java-start-thread',
      tipo: 'artigo',
      porque: 'Criação e início de threads, das formas clássicas aos executores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Daemon Threads in Java',
      url: 'https://www.baeldung.com/java-daemon-thread',
      tipo: 'artigo',
      porque: 'O que muda numa thread daemon e quando ela é útil.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Threads pt 01, Introduction',
      url: 'https://www.youtube.com/watch?v=dFPwCqr43Ag',
      tipo: 'video',
      porque: 'O que são threads e como criar as primeiras, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Multithreading in Java Explained in 10 Minutes',
      url: 'https://www.youtube.com/watch?v=r_MbozD32eo',
      tipo: 'video',
      porque: 'Criação de threads, `start`, `join` e a ordem imprevisível, de forma direta.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'O livro de referência sobre concorrência em Java, escrito por membros do grupo que criou o `java.util.concurrent`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Introduction": seções 1.2, "Benefits of threads", e 1.3, "Risks of threads"',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que trabalhar com tarefas e executores em vez de criar threads à mão.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Concurrency": Item 80, "Prefer executors, tasks, and streams to threads"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Criação de threads, tipos de thread e as questões de saída que a prova monta com elas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Introducing Threads"',
    },
  ],
  desafio: {
    titulo: 'Soma em fatias',
    enunciado:
      'Some os números de 1 a 1.000.000 dividindo o trabalho entre 4 threads: cada uma soma uma fatia contínua de 250.000 números e grava o resultado na sua posição de um `long[]`. O `main` espera todas com `join`, imprime as somas parciais e o total, e confere o resultado com a fórmula n(n + 1)/2. A saída deve ser:\n\n```text\nfatia 0: 31250125000\nfatia 1: 93750125000\nfatia 2: 156250125000\nfatia 3: 218750125000\ntotal: 500000500000\nconfere: true\n```',
    dicas: [
      'Copie o índice do laço para uma variável nova antes de usá-lo na lambda: ela precisa ser efetivamente final.',
      'Cada thread escreve numa posição diferente do array, então elas não disputam nada.',
      'Inicie todas as threads antes de fazer o primeiro `join`; senão elas rodariam uma de cada vez.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class SomaParalela {
    public static void main(String[] args) throws InterruptedException {
        final int n = 1_000_000;
        final int fatias = 4;
        long[] parciais = new long[fatias];
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < fatias; i++) {
            int indice = i;
            int inicio = i * (n / fatias) + 1;
            int fim = (i + 1) * (n / fatias);
            Thread t = new Thread(() -> {
                long soma = 0;
                for (int x = inicio; x <= fim; x++) {
                    soma += x;
                }
                parciais[indice] = soma;
            }, "fatia-" + i);
            threads.add(t);
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
        long total = 0;
        for (int i = 0; i < fatias; i++) {
            System.out.println("fatia " + i + ": " + parciais[i]);
            total += parciais[i];
        }
        System.out.println("total: " + total);
        System.out.println("confere: " + (total == (long) n * (n + 1) / 2));
    }
}`,
    saida: 'fatia 0: 31250125000\nfatia 1: 93750125000\nfatia 2: 156250125000\nfatia 3: 218750125000\ntotal: 500000500000\nconfere: true',
    comentarios:
      'As quatro threads rodam ao mesmo tempo, cada uma na sua fatia, e não importa qual termina primeiro: o `main` só lê os resultados depois de todos os `join`, que também garantem que as escritas das threads fiquem visíveis. O cast para `long` na fórmula evita o estouro de `int`. É exatamente o que um stream paralelo faria por você, como na temporada anterior, aqui feito à mão.',
  },
  exercicios: [
    {
      id: 'senior-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.print(Thread.currentThread().getName() + " "), "x");
        t.run();
        t.start();
        t.join();
        System.out.println();
    }
}`,
      opcoes: ['`main x`', '`x x`', '`x main`', 'Lança `IllegalThreadStateException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`run()` é uma chamada comum, executada na thread `main`. Só o `start()` cria a thread "x". Chamar `run` antes não impede o `start` depois.',
    },
    {
      id: 'senior-t1-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> { });
        t.start();
        t.join();
        System.out.println("terminou");
        t.start();
    }
}`,
      opcoes: [
        'Imprime `terminou` e lança `IllegalThreadStateException`',
        'Imprime `terminou` e executa a thread de novo',
        'Imprime `terminou` e termina normalmente',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalThreadStateException', saida: 'terminou' },
      explicacao: 'Uma thread que terminou não pode ser reiniciada. Para executar a tarefa de novo, é preciso criar outra `Thread`.',
    },
    {
      id: 'senior-t1-e01-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        int[] r = new int[2];
        Thread a = new Thread(() -> r[0] = 10 * 2);
        Thread b = new Thread(() -> r[1] = 3 + 4);
        a.start();
        b.start();
        a.join();
        b.join();
        System.out.println(r[0] + r[1]);
    }
}`,
      resposta: '27',
      explicacao: 'As duas threads podem terminar em qualquer ordem, mas cada uma escreve na sua posição, e os `join` garantem que as duas acabaram antes da soma.',
    },
    {
      id: 'senior-t1-e01-q04',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais formas criam e iniciam uma nova thread? Escolha duas.',
      opcoes: [
        'Estender `Thread`, sobrescrever `run()` e chamar `start()`',
        'Passar um `Runnable` ao construtor de `Thread` e chamar `start()`',
        'Implementar `Runnable` e chamar `run()` diretamente',
        'Chamar `Thread.start(runnable)`',
        'Chamar `run()` num objeto `Thread`',
      ],
      respostas: [0, 1],
      explicacao: 'Só `start()` cria a nova linha de execução. Chamar `run()` executa o código na thread atual, e não existe um `Thread.start` estático.',
    },
    {
      id: 'senior-t1-e01-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> { });
        System.out.print(t.getState() + " ");
        t.start();
        t.join();
        System.out.println(t.getState());
    }
}`,
      opcoes: ['`NEW TERMINATED`', '`NEW RUNNABLE`', '`RUNNABLE TERMINATED`', '`READY DEAD`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Antes do `start`, a thread está em `NEW`. Depois do `join`, com certeza terminou: `TERMINATED`.',
    },
    {
      id: 'senior-t1-e01-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread.sleep(10);
        Runnable a = () -> System.out.println("a");
        Runnable b = () -> {
            Thread.sleep(10);
            System.out.println("b");
        };
    }
}`,
      resposta: 6,
      explicacao: '`Thread.sleep` lança `InterruptedException`, que é checked. O `throws` do `main` vale para a linha 3, mas não para dentro da lambda, que implementa `run()`, um método que não declara exceções.',
    },
    {
      id: 'senior-t1-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
            }
        });
        t.start();
        System.out.println("iniciada");
        t.setDaemon(true);
        t.join();
    }
}`,
      opcoes: [
        'Imprime `iniciada` e lança `IllegalThreadStateException`',
        'Imprime `iniciada` e termina normalmente',
        'Não compila: `setDaemon` exige `try`',
        'Imprime `iniciada` e a thread vira daemon',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalThreadStateException', saida: 'iniciada' },
      explicacao: 'A condição de daemon é definida antes do início. Mudar enquanto a thread está viva lança a exceção; aqui ela ainda dorme quando o `setDaemon` é chamado.',
    },
    {
      id: 'senior-t1-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que inicia a thread. O programa deve imprimir `worker`.',
      codigo: `public class Inicio {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.println(Thread.currentThread().getName()), "worker");
        t.___();
        t.join();
    }
}`,
      respostas: ['start'],
      saida: 'worker',
      explicacao: 'Com `start()`, o código roda na nova thread, chamada "worker". Com `run()`, ele rodaria no `main` e imprimiria "main".',
    },
    {
      id: 'senior-t1-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            throw new RuntimeException("boom");
        });
        t.setUncaughtExceptionHandler((thread, e) -> System.out.print("[" + e.getMessage() + "]"));
        t.start();
        t.join();
        System.out.println("fim");
    }
}`,
      opcoes: ['`[boom]fim`', 'Lança `RuntimeException` e não imprime `fim`', '`fim`', '`fim[boom]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A exceção encerra só a thread dela e é entregue ao handler. O `join` espera esse fim, e o `main` continua normalmente.',
    },
    {
      id: 'senior-t1-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread t = new Thread(() -> { }, "x");
        System.out.println(t.getPriority() + " " + t.isDaemon() + " " + Thread.MAX_PRIORITY);
    }
}`,
      opcoes: ['`5 false 10`', '`1 false 10`', '`5 true 10`', '`0 false 100`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Uma thread herda a prioridade e a condição de daemon de quem a criou. A `main` tem prioridade 5 e não é daemon.',
    },
    {
      id: 'senior-t1-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread pai = new Thread(() -> {
            Thread filha = new Thread(() -> { });
            System.out.println(filha.isDaemon());
        });
        pai.setDaemon(true);
        pai.start();
        pai.join();
    }
}`,
      opcoes: ['`true`', '`false`', 'Lança `IllegalThreadStateException`', 'Nada é impresso'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A filha é criada dentro de uma thread daemon e herda essa condição. O `join` garante que o `main` espere a impressão.',
    },
    {
      id: 'senior-t1-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Duas threads iniciadas em sequência imprimem, cada uma, uma letra diferente, sem nenhuma sincronização. O que se pode afirmar sobre a saída?',
      opcoes: [
        'As duas letras aparecem, mas a ordem não é garantida',
        'A letra da thread iniciada primeiro sempre aparece primeiro',
        'A letra da thread de maior prioridade sempre aparece primeiro',
        'Só uma letra aparece',
      ],
      resposta: 0,
      explicacao: 'O escalonador decide quando cada thread roda, e prioridades são só uma sugestão. Para impor uma ordem, é preciso sincronizar, por exemplo com `join`.',
    },
    {
      id: 'senior-t1-e01-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.print(Thread.currentThread().getName()), "T");
        t.start();
        t.join();
        new Thread(() -> System.out.print("-" + Thread.currentThread().getName()), "U").run();
        System.out.println();
    }
}`,
      resposta: 'T-main',
      explicacao: 'A primeira thread foi iniciada com `start` e roda como "T". A segunda só teve o `run` chamado, que executa no `main`.',
    },
    {
      id: 'senior-t1-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread a = new Thread(() -> System.out.println(42));
        Thread b = new Thread(() -> 42);
        a.start();
        b.start();
    }
}`,
      opcoes: [
        'Não compila: o `run()` de um `Runnable` não devolve valor',
        'Compila e imprime `42`',
        'Compila e imprime `42` duas vezes',
        'Não compila: `Thread` não aceita lambdas',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: 'O construtor de `Thread` recebe um `Runnable`, cujo método é `void`. Para tarefas com resultado, existe `Callable`, usado com executores no episódio 3.',
    },
    {
      id: 'senior-t1-e01-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que implementar `Runnable` costuma ser preferível a estender `Thread`?',
      opcoes: [
        'Separa a tarefa do mecanismo que a executa e deixa a classe livre para estender outra',
        'Porque `Runnable` executa mais rápido',
        'Porque só `Runnable` permite usar `join`',
        'Porque estender `Thread` foi removido no Java 21',
      ],
      resposta: 0,
      explicacao: 'A mesma tarefa `Runnable` pode ser executada por uma `Thread`, por um executor ou por uma thread virtual, sem mudar uma linha dela.',
    },
  ],
};

export default episodio;
