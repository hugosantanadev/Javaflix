import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t1-e02',
  minutos: 15,
  aula,
  armadilhas: [
    'Os estados são `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING` e `TERMINATED`; não existe `RUNNING`.',
    '`Thread.sleep` é estático: `t.sleep(100)` faz dormir a thread atual, não `t`.',
    '`sleep`, `join` e `wait` lançam `InterruptedException`, que é checked.',
    '`interrupt()` não para a thread: só liga uma marca, que ela precisa conferir.',
    'Uma thread bloqueada em `sleep`, `join` ou `wait` acorda com `InterruptedException`, e a marca é desligada.',
    '`isInterrupted()` só lê a marca; o estático `Thread.interrupted()` lê e desliga.',
    '`join(ms)` desiste depois do prazo; a thread pode continuar viva.',
    '`sleep` não libera as travas de `synchronized` que a thread tem.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Pausing Execution with Sleep',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/sleep.html',
      tipo: 'documentacao',
      porque: 'O `sleep`, a precisão que ele não garante e a `InterruptedException`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Interrupts',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/interrupt.html',
      tipo: 'documentacao',
      porque: 'Como uma thread deve reagir a uma interrupção, com e sem métodos bloqueantes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Joins',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/join.html',
      tipo: 'documentacao',
      porque: 'Esperar o fim de outra thread, com e sem prazo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Thread.State',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.State.html',
      tipo: 'documentacao',
      porque: 'A definição de cada estado e quais métodos levam a cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Thread.interrupt()',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#interrupt()',
      tipo: 'documentacao',
      porque: 'O efeito exato da interrupção em cada situação de bloqueio.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Life Cycle of a Thread in Java',
      url: 'https://www.baeldung.com/java-thread-lifecycle',
      tipo: 'artigo',
      porque: 'Cada estado com um exemplo que leva a thread até ele.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: How to Handle InterruptedException in Java',
      url: 'https://www.baeldung.com/java-interrupted-exception',
      tipo: 'artigo',
      porque: 'As formas certas de tratar a interrupção sem perder o pedido de parada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: The Thread.join() Method in Java',
      url: 'https://www.baeldung.com/java-thread-join',
      tipo: 'artigo',
      porque: 'O `join`, suas variações com prazo e a garantia de visibilidade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: How to Kill a Java Thread',
      url: 'https://www.baeldung.com/java-thread-stop',
      tipo: 'artigo',
      porque: 'Por que não se usa `stop()` e como parar uma thread com uma marca ou com interrupção.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Threads pt 02, Estados das threads',
      url: 'https://www.youtube.com/watch?v=xyU1c0iJGr8',
      tipo: 'video',
      porque: 'O ciclo de vida de uma thread, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Threads pt 03, Prioridade e Sleep',
      url: 'https://www.youtube.com/watch?v=1TSH83Clt18',
      tipo: 'video',
      porque: 'Prioridades e o `sleep`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Threads pt 04, Yield e Join',
      url: 'https://www.youtube.com/watch?v=BLM9Q9zdARU',
      tipo: 'video',
      porque: 'Esperando outras threads com `join`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'A política de interrupção explicada em detalhe, com o que fazer em cada caso.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Cancellation and Shutdown": seção 7.1, "Task cancellation", incluindo "Interruption" e "Responding to interruption"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os estados de thread, o `sleep` e a interrupção como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Introducing Threads", partes "Managing a Thread\'s Life Cycle" e "Interrupting a Thread"',
    },
  ],
  desafio: {
    titulo: 'Tarefa cancelável',
    enunciado:
      'Uma thread processa os itens `item-1` a `item-5`, um por vez, com uma pausa de 1 segundo depois de cada um, e confere a marca de interrupção antes de cada item. Use um `CountDownLatch(3)` para o `main` esperar os três primeiros itens e então interromper a thread. Na `InterruptedException`, a thread imprime uma mensagem e religa a marca, para que o laço perceba e pare. No fim, o `main` mostra quantos itens foram feitos, se a marca ficou ligada e o estado final. A saída deve ser:\n\n```text\nprocessado: item-1\nprocessado: item-2\nprocessado: item-3\ninterrompido durante a pausa\nparou com 3 de 5 itens; marca religada: true\nestado final: TERMINATED\n```',
    dicas: [
      'Chame `countDown()` logo depois de processar cada item; `await()` no `main` libera no terceiro.',
      'Dentro do `catch`, `Thread.currentThread().interrupt()` religa a marca que a exceção desligou.',
      'Guarde a marca num array de um elemento para o `main` ler depois do `join`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

public class Cancelavel {
    public static void main(String[] args) throws InterruptedException {
        List<String> itens = List.of("item-1", "item-2", "item-3", "item-4", "item-5");
        List<String> feitos = new ArrayList<>();
        CountDownLatch tresFeitos = new CountDownLatch(3);
        boolean[] marca = new boolean[1];

        Thread trabalhadora = new Thread(() -> {
            for (String item : itens) {
                if (Thread.currentThread().isInterrupted()) {
                    break;
                }
                feitos.add(item);
                System.out.println("processado: " + item);
                tresFeitos.countDown();
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("interrompido durante a pausa");
                    Thread.currentThread().interrupt();
                }
            }
            marca[0] = Thread.currentThread().isInterrupted();
        });

        trabalhadora.start();
        tresFeitos.await();
        trabalhadora.interrupt();
        trabalhadora.join();
        System.out.println("parou com " + feitos.size() + " de " + itens.size() + " itens; marca religada: " + marca[0]);
        System.out.println("estado final: " + trabalhadora.getState());
    }
}`,
    saida: 'processado: item-1\nprocessado: item-2\nprocessado: item-3\ninterrompido durante a pausa\nparou com 3 de 5 itens; marca religada: true\nestado final: TERMINATED',
    comentarios:
      'A thread decide onde parar: só entre um item e outro, nunca no meio de um processamento. Sem religar a marca no `catch`, o laço não perceberia o pedido e processaria os itens 4 e 5. O `join` garante que a lista e o array preenchidos pela trabalhadora fiquem visíveis para o `main`. Se a interrupção chegar antes de a thread começar a dormir, o `sleep` lança a exceção na hora, e o resultado é o mesmo.',
  },
  exercicios: [
    {
      id: 'senior-t1-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> { });
        System.out.print(t.isAlive() + " " + t.getState() + " ");
        t.start();
        t.join();
        System.out.println(t.isAlive() + " " + t.getState());
    }
}`,
      opcoes: ['`false NEW false TERMINATED`', '`true NEW false TERMINATED`', '`false NEW true RUNNABLE`', '`false READY false DEAD`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Antes do `start`, a thread não está viva e está em `NEW`. Depois do `join`, terminou: não está viva e está em `TERMINATED`.',
    },
    {
      id: 'senior-t1-e02-q02',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread.currentThread().interrupt();
        System.out.println(Thread.currentThread().isInterrupted() + " " + Thread.interrupted() + " " + Thread.currentThread().isInterrupted());
    }
}`,
      opcoes: ['`true true false`', '`true true true`', '`false true false`', '`true false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`isInterrupted()` só lê a marca. `Thread.interrupted()` lê e desliga, então a terceira leitura dá `false`.',
    },
    {
      id: 'senior-t1-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.print("I" + Thread.currentThread().isInterrupted() + " ");
            }
        });
        t.start();
        t.interrupt();
        t.join();
        System.out.println("fim");
    }
}`,
      resposta: 'Ifalse fim',
      explicacao: 'A interrupção acorda o `sleep` com exceção e desliga a marca. Se ela chegar antes de a thread dormir, o `sleep` lança na hora: o resultado é o mesmo.',
    },
    {
      id: 'senior-t1-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread t = new Thread(() -> System.out.println("oi"));
        t.start();
        t.join();
    }
}`,
      opcoes: [
        'Não compila: `join()` lança `InterruptedException`, que precisa ser tratada ou declarada',
        'Compila e imprime `oi`',
        'Compila, mas lança `InterruptedException`',
        'Não compila: `start()` também exige `try`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: '`join` pode ser interrompido e declara `InterruptedException`, que é checked. `start()` não declara nada.',
    },
    {
      id: 'senior-t1-e02-q05',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais são valores do enum `Thread.State`? Escolha três.',
      opcoes: ['`NEW`', '`BLOCKED`', '`TIMED_WAITING`', '`RUNNING`', '`SLEEPING`'],
      respostas: [0, 1, 2],
      explicacao: 'Os seis estados são `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING` e `TERMINATED`. Uma thread rodando ou dormindo aparece como `RUNNABLE` ou `TIMED_WAITING`.',
    },
    {
      id: 'senior-t1-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> System.out.print("t "));
        t.start();
        t.sleep(100);
        t.join();
        System.out.println("main");
    }
}`,
      opcoes: ['`t main`', 'Não compila: `sleep` é estático', '`main t`', 'Lança `IllegalThreadStateException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Chamar um método estático por uma referência compila, mas ignora a referência: quem dorme é a thread atual, o `main`. A thread `t` não é afetada.',
    },
    {
      id: 'senior-t1-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread lenta = new Thread(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
            }
        });
        lenta.start();
        lenta.join(50);
        System.out.print(lenta.isAlive() + " ");
        lenta.interrupt();
        lenta.join();
        System.out.println(lenta.isAlive());
    }
}`,
      opcoes: ['`true false`', '`false false`', '`true true`', 'Lança `InterruptedException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `join(50)` desiste antes de a thread terminar, que continua viva. A interrupção acorda o `sleep`, a thread termina, e o segundo `join` espera esse fim.',
    },
    {
      id: 'senior-t1-e02-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para religar a marca de interrupção no `catch`. O programa deve imprimir `true`.',
      codigo: `public class Religa {
    public static void main(String[] args) {
        Thread.currentThread().interrupt();
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            Thread.currentThread().___();
        }
        System.out.println(Thread.currentThread().isInterrupted());
    }
}`,
      respostas: ['interrupt'],
      saida: 'true',
      explicacao: 'A exceção desliga a marca. Chamar `interrupt()` na própria thread a liga de novo, preservando o pedido de parada para quem vier depois.',
    },
    {
      id: 'senior-t1-e02-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    static void esperar(Thread t) {
        if (t.isAlive()) {
            System.out.println("esperando");
        }
        t.join(100);
    }
}`,
      resposta: 6,
      explicacao: '`join(100)` também declara `InterruptedException`. O método `esperar` não a trata nem a declara.',
    },
    {
      id: 'senior-t1-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            while (!Thread.currentThread().isInterrupted()) {
            }
            System.out.println("parou " + Thread.currentThread().isInterrupted());
        });
        t.start();
        Thread.sleep(50);
        t.interrupt();
        t.join();
    }
}`,
      opcoes: ['`parou true`', '`parou false`', 'O programa nunca termina', 'Lança `InterruptedException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A thread não está bloqueada, então nenhuma exceção é lançada: a marca fica ligada, o laço a percebe e termina.',
    },
    {
      id: 'senior-t1-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Object trava = new Object();
        Thread t = new Thread(() -> {
            synchronized (trava) {
                try {
                    trava.wait();
                } catch (InterruptedException e) {
                }
            }
        });
        t.start();
        Thread.sleep(200);
        System.out.println(t.getState());
        t.interrupt();
        t.join();
    }
}`,
      opcoes: ['`WAITING`', '`TIMED_WAITING`', '`BLOCKED`', '`RUNNABLE`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`wait()` sem prazo leva a `WAITING`. Com prazo, seria `TIMED_WAITING`; `BLOCKED` é a espera para entrar no `synchronized`.',
    },
    {
      id: 'senior-t1-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma thread bloqueada em `Thread.sleep` é interrompida. O que acontece com a marca de interrupção?',
      opcoes: [
        'É desligada, e a thread acorda com `InterruptedException`',
        'Continua ligada, e a thread acorda com `InterruptedException`',
        'Continua ligada, e a thread dorme até o fim do prazo',
        'A thread é encerrada imediatamente',
      ],
      resposta: 0,
      explicacao: 'A exceção é o aviso, e a marca é limpa ao lançá-la. Por isso quem não pode tratar deve religá-la com `Thread.currentThread().interrupt()`.',
    },
    {
      id: 'senior-t1-e02-q13',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        StringBuilder sb = new StringBuilder();
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                sb.append("I");
                return;
            }
            sb.append("T");
        });
        t.start();
        t.join(20);
        sb.append("M");
        t.interrupt();
        t.join();
        System.out.println(sb);
    }
}`,
      resposta: 'MI',
      explicacao: 'O `main` desiste de esperar após 20 ms e escreve "M". A interrupção acorda a thread, que escreve "I" e sai com `return`, sem chegar ao "T".',
    },
    {
      id: 'senior-t1-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a situação de `Thread.stop()` nas versões atuais do Java?',
      opcoes: [
        'Desde o Java 20, só lança `UnsupportedOperationException`; o caminho é a interrupção cooperativa',
        'Encerra a thread na hora e é a forma recomendada',
        'Foi substituído por `Thread.kill()`',
        'Funciona apenas em threads daemon',
      ],
      resposta: 0,
      explicacao: 'Parar uma thread à força podia deixar objetos pela metade. O método foi depreciado no Java 1.2 e desativado no Java 20.',
    },
    {
      id: 'senior-t1-e02-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println(Thread.State.values().length + " " + Thread.State.valueOf("BLOCKED").ordinal());
    }
}`,
      opcoes: ['`6 2`', '`5 2`', '`6 3`', '`7 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'São seis estados, declarados na ordem `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING` e `TERMINATED`. `BLOCKED` é o terceiro, de índice 2.',
    },
  ],
};

export default episodio;
