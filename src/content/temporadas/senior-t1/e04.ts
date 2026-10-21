import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t1-e04',
  minutos: 15,
  aula,
  armadilhas: [
    'Os métodos de agendamento só existem em `ScheduledExecutorService`; numa variável `ExecutorService`, `schedule` não compila.',
    '`schedule` aceita `Callable` e `Runnable`; `scheduleAtFixedRate` e `scheduleWithFixedDelay` só aceitam `Runnable`.',
    'Taxa fixa conta o período a partir do início de cada execução; atraso fixo, a partir do fim.',
    'Execuções da mesma tarefa periódica nunca se sobrepõem, mesmo que ela demore mais que o período.',
    'Uma exceção numa tarefa periódica cancela as próximas execuções sem aviso; só o `get()` do `ScheduledFuture` a revela.',
    '`invokeAll` devolve `List<Future<T>>` na ordem da coleção, não na ordem de término, e bloqueia até todas terminarem.',
    '`invokeAny` devolve `T`, não `Future<T>`, e só lança `ExecutionException` se todas as tarefas falharem.',
    '`invokeAll` e `invokeAny` só recebem coleções de `Callable`.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de java.util.concurrent.ScheduledExecutorService',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ScheduledExecutorService.html',
      tipo: 'documentacao',
      porque: 'Os quatro métodos de agendamento e o exemplo oficial de uma tarefa periódica cancelada depois de um tempo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.ScheduledThreadPoolExecutor',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ScheduledThreadPoolExecutor.html',
      tipo: 'documentacao',
      porque: 'As políticas do que acontece com tarefas atrasadas e periódicas no `shutdown`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.ExecutorCompletionService',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorCompletionService.html',
      tipo: 'documentacao',
      porque: 'Receber os resultados na ordem em que terminam, a peça que o `invokeAny` usa por dentro.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Jakob Jenkov: Java ScheduledExecutorService',
      url: 'https://jenkov.com/tutorials/java-util-concurrent/scheduledexecutorservice.html',
      tipo: 'artigo',
      porque: 'Cada método de agendamento com um exemplo curto, incluindo a diferença entre taxa e atraso fixos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java ExecutorService',
      url: 'https://jenkov.com/tutorials/java-util-concurrent/executorservice.html',
      tipo: 'artigo',
      porque: 'As seções sobre `invokeAny` e `invokeAll`, com o comportamento de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: ExecutorService, Waiting for Threads to Finish',
      url: 'https://www.baeldung.com/java-executor-wait-for-threads',
      tipo: 'artigo',
      porque: 'Esperar um lote de tarefas com `invokeAll`, com `CountDownLatch` e com `ExecutorCompletionService`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Introduction to Thread Pools in Java',
      url: 'https://www.baeldung.com/thread-pool-java-and-guava',
      tipo: 'artigo',
      porque: 'O `ScheduledThreadPoolExecutor` ao lado dos outros pools, e os parâmetros de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Timer',
      url: 'https://www.baeldung.com/java-timer-and-timertask',
      tipo: 'artigo',
      porque: 'A forma antiga de agendar, comparada ao `ScheduledExecutorService`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: Concorrência pt 09, Executors pt 02, ScheduledExecutorService',
      url: 'https://www.youtube.com/watch?v=oxwUqSAbMLY',
      tipo: 'video',
      porque: 'Agendamento de tarefas únicas e periódicas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Harry Gill: Concurrency, submit, invokeAll/Any (Java Certification)',
      url: 'https://www.youtube.com/watch?v=YoEcRes9b8w',
      tipo: 'video',
      porque: '`submit`, `invokeAll` e `invokeAny` do ponto de vista da prova de certificação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'Por que trocar o `Timer` pelo `ScheduledThreadPoolExecutor` e como impor prazo a um lote de tarefas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Task Execution": seções 6.2.5, "Delayed and periodic tasks", e 6.3.7, "Placing time limits on tasks"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Agendamento e envio de coleções de tarefas, com as pegadinhas de tipo que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seções "Submitting Task Collections" e "Scheduling Tasks"',
    },
  ],
  desafio: {
    titulo: 'Painel de cotações',
    enunciado:
      'Quatro corretoras informam a cotação de uma moeda, cada uma com sua demora: Alfa responde `5.12` em 100 ms, Beta falha com `IllegalStateException("indisponível")` em 50 ms, Gama responde `5.01` em 2000 ms e Delta responde `5.09` em 150 ms. Modele cada corretora como um `record Corretora(String nome, long ms, double valor)` (um valor negativo significa falha) e escreva `static Callable<Double> consultar(Corretora c)`. Consulte todas com `invokeAll` e um prazo de 500 ms, mostre o resultado de cada uma na ordem original, distinguindo resposta, falha e falta de resposta, e indique a melhor cotação, a menor entre as recebidas. A saída deve ser:\n\n```text\nAlfa: 5.12\nBeta: indisponível\nGama: sem resposta no prazo\nDelta: 5.09\nmelhor cotação: 5.09 (Delta)\n```',
    dicas: [
      'A versão de `invokeAll` com prazo cancela as tarefas que não terminaram a tempo; `isCancelled()` as identifica.',
      'O `get()` de um `Future` cancelado lança `CancellationException`; teste `isCancelled()` antes.',
      'Gama tem a menor cotação, mas não respondeu no prazo: ela não entra na comparação.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class Painel {
    record Corretora(String nome, long ms, double valor) {}

    static Callable<Double> consultar(Corretora c) {
        return () -> {
            Thread.sleep(c.ms());
            if (c.valor() < 0) {
                throw new IllegalStateException("indisponível");
            }
            return c.valor();
        };
    }

    public static void main(String[] args) throws InterruptedException {
        List<Corretora> corretoras = List.of(
            new Corretora("Alfa", 100, 5.12),
            new Corretora("Beta", 50, -1),
            new Corretora("Gama", 2000, 5.01),
            new Corretora("Delta", 150, 5.09));
        List<Callable<Double>> consultas = new ArrayList<>();
        for (Corretora c : corretoras) {
            consultas.add(consultar(c));
        }
        ExecutorService pool = Executors.newFixedThreadPool(4);
        try {
            List<Future<Double>> respostas = pool.invokeAll(consultas, 500, TimeUnit.MILLISECONDS);
            String melhor = null;
            double menor = Double.MAX_VALUE;
            for (int i = 0; i < corretoras.size(); i++) {
                String nome = corretoras.get(i).nome();
                Future<Double> f = respostas.get(i);
                if (f.isCancelled()) {
                    System.out.println(nome + ": sem resposta no prazo");
                    continue;
                }
                try {
                    double valor = f.get();
                    System.out.println(nome + ": " + valor);
                    if (valor < menor) {
                        menor = valor;
                        melhor = nome;
                    }
                } catch (ExecutionException e) {
                    System.out.println(nome + ": " + e.getCause().getMessage());
                }
            }
            System.out.println("melhor cotação: " + menor + " (" + melhor + ")");
        } finally {
            pool.shutdown();
        }
    }
}`,
    saida: 'Alfa: 5.12\nBeta: indisponível\nGama: sem resposta no prazo\nDelta: 5.09\nmelhor cotação: 5.09 (Delta)',
    comentarios:
      'O `invokeAll` com prazo resolve num só lugar o que daria trabalho fazer à mão: enviar tudo, esperar no máximo 500 ms e cancelar o que atrasou. Cada `Future` termina num de três estados (valor, exceção ou cancelado), e o laço trata os três. Como a lista segue a ordem de envio, a saída sai organizada mesmo com as respostas chegando fora de ordem. Se a meta fosse só a primeira cotação válida, sem comparar, `invokeAny` bastaria.',
  },
  exercicios: [
    {
      id: 'senior-t1-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ScheduledExecutorService s = Executors.newSingleThreadScheduledExecutor();
        ScheduledFuture<Integer> f = s.schedule(() -> 10 + 5, 100, TimeUnit.MILLISECONDS);
        System.out.println(f.isDone() + " " + f.get() + " " + f.isDone());
        s.shutdown();
    }
}`,
      opcoes: ['`false 15 true`', '`true 15 true`', '`false 15 false`', '`false null true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A concatenação é avaliada da esquerda para a direita. Logo depois do agendamento, a tarefa ainda espera os 100 ms; o `get()` espera por ela, e só então o último `isDone()` é chamado.',
    },
    {
      id: 'senior-t1-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        ScheduledExecutorService s = Executors.newSingleThreadScheduledExecutor();
        s.schedule(() -> "uma vez", 1, TimeUnit.SECONDS);
        s.scheduleAtFixedRate(() -> "sempre", 0, 1, TimeUnit.SECONDS);
        s.shutdownNow();
    }
}`,
      opcoes: [
        'Não compila: `scheduleAtFixedRate` só aceita `Runnable`',
        'Não compila: `schedule` só aceita `Runnable`',
        'Compila e não imprime nada',
        'Compila e imprime `uma vez`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'Uma lambda que devolve valor não serve como `Runnable`. O `schedule` da linha 6 aceita, porque tem uma versão para `Callable`.',
    },
    {
      id: 'senior-t1-e04-q03',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newScheduledThreadPool(1);
        Future<String> a = ex.submit(() -> "agora");
        Future<String> b = ex.schedule(() -> "depois", 1, TimeUnit.SECONDS);
        System.out.println(a.get() + b.get());
        ex.shutdown();
    }
}`,
      resposta: 7,
      explicacao: 'O objeto é um executor agendado, mas a variável é do tipo `ExecutorService`, que não declara `schedule`. O compilador só enxerga os métodos do tipo declarado.',
    },
    {
      id: 'senior-t1-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais métodos aceitam uma tarefa `Callable`? Escolha três.',
      opcoes: ['`schedule`', '`invokeAny`', '`submit`', '`scheduleAtFixedRate`', '`execute`', '`scheduleWithFixedDelay`'],
      respostas: [0, 1, 2],
      explicacao: '`execute` e os dois métodos periódicos só aceitam `Runnable`. `submit` e `schedule` aceitam os dois tipos; `invokeAll` e `invokeAny`, só `Callable`.',
    },
    {
      id: 'senior-t1-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(3);
        List<Callable<String>> tarefas = List.of(
            () -> { Thread.sleep(200); return "a"; },
            () -> "b",
            () -> { Thread.sleep(100); return "c"; });
        StringBuilder sb = new StringBuilder();
        for (Future<String> f : ex.invokeAll(tarefas)) {
            sb.append(f.get());
        }
        System.out.println(sb);
        ex.shutdown();
    }
}`,
      opcoes: ['`abc`', '`bca`', '`cba`', 'Uma ordem imprevisível'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As tarefas terminam na ordem b, c, a, mas `invokeAll` devolve os `Future` na ordem da coleção recebida.',
    },
    {
      id: 'senior-t1-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(2);
        List<Callable<Integer>> tarefas = List.of(() -> 1, () -> 2);
        List<Integer> resultados = ex.invokeAll(tarefas);
        System.out.println(resultados);
        ex.shutdown();
    }
}`,
      opcoes: [
        'Não compila: `invokeAll` devolve `List<Future<Integer>>`',
        'Compila e imprime `[1, 2]`',
        'Compila e imprime uma ordem imprevisível de 1 e 2',
        'Não compila: `invokeAll` devolve um único `Integer`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Os resultados vêm embrulhados em `Future`, um para cada tarefa. Quem devolve o valor direto é `invokeAny`, e só um.',
    },
    {
      id: 'senior-t1-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(2);
        List<Callable<String>> tarefas = List.of(
            () -> { throw new IllegalStateException("primeira"); },
            () -> { Thread.sleep(100); return "segunda"; });
        System.out.println(ex.invokeAny(tarefas));
        ex.shutdown();
    }
}`,
      opcoes: ['`segunda`', 'Lança `ExecutionException` com a causa `primeira`', '`null`', '`[segunda]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A falha da primeira tarefa não encerra o `invokeAny`: ele espera a primeira que terminar com sucesso, mesmo que ela demore mais.',
    },
    {
      id: 'senior-t1-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(2);
        List<Callable<String>> tarefas = List.of(
            () -> { throw new IllegalStateException("a"); },
            () -> { throw new IllegalArgumentException("b"); });
        System.out.println("antes");
        try {
            System.out.println(ex.invokeAny(tarefas));
        } finally {
            ex.shutdown();
        }
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `ExecutionException`',
        'Imprime `antes` e `null`',
        'Imprime `antes` e lança `IllegalStateException`',
        'Imprime `antes` e o programa fica esperando para sempre',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ExecutionException', saida: 'antes' },
      explicacao: 'Com todas as tarefas falhando, não há resultado para devolver. O `invokeAny` lança `ExecutionException`, com a exceção de uma delas como causa.',
    },
    {
      id: 'senior-t1-e04-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        ScheduledExecutorService s = Executors.newSingleThreadScheduledExecutor();
        AtomicInteger n = new AtomicInteger();
        ScheduledFuture<?> f = s.scheduleAtFixedRate(() -> {
            if (n.incrementAndGet() == 4) {
                throw new RuntimeException("fim");
            }
        }, 0, 5, TimeUnit.MILLISECONDS);
        try {
            f.get();
        } catch (ExecutionException e) {
            System.out.println(n.get() + " " + e.getCause().getMessage());
        }
        s.shutdown();
    }
}`,
      resposta: '4 fim',
      explicacao: 'A quarta execução lança exceção, e o agendador cancela todas as seguintes. O `get()`, que esperaria para sempre por uma tarefa periódica, termina com `ExecutionException` e revela a causa.',
    },
    {
      id: 'senior-t1-e04-q10',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que repete a tarefa em intervalos contados a partir do **início** de cada execução. O programa deve imprimir `dois tiques`.',
      codigo: `import java.util.concurrent.*;

public class Relogio {
    public static void main(String[] args) throws Exception {
        ScheduledExecutorService s = Executors.newSingleThreadScheduledExecutor();
        CountDownLatch dois = new CountDownLatch(2);
        s.___(dois::countDown, 0, 10, TimeUnit.MILLISECONDS);
        dois.await();
        System.out.println("dois tiques");
        s.shutdown();
    }
}`,
      respostas: ['scheduleAtFixedRate'],
      saida: 'dois tiques',
      explicacao: 'Na taxa fixa, o período conta do início de cada execução. `scheduleWithFixedDelay` contaria do fim. O `shutdown` cancela a tarefa periódica, e o programa termina.',
    },
    {
      id: 'senior-t1-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        ScheduledExecutorService s = Executors.newScheduledThreadPool(1);
        s.schedule(() -> System.out.print("única "), 100, TimeUnit.MILLISECONDS);
        ScheduledFuture<?> p = s.scheduleAtFixedRate(() -> System.out.print("periódica "), 200, 100, TimeUnit.MILLISECONDS);
        s.shutdown();
        s.awaitTermination(2, TimeUnit.SECONDS);
        System.out.println(p.isCancelled());
    }
}`,
      opcoes: ['`única true`', '`true`', '`única periódica false`', '`única false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Por padrão, o `shutdown` de um executor agendado ainda executa as tarefas únicas que esperavam o atraso, mas cancela as periódicas.',
    },
    {
      id: 'senior-t1-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma tarefa agendada com `scheduleWithFixedDelay(tarefa, 0, 1, TimeUnit.SECONDS)` leva 400 ms para rodar. Quanto tempo depois do início da primeira execução começa a segunda?',
      opcoes: ['1,4 s', '1 s', '0,6 s', '0,4 s'],
      resposta: 0,
      explicacao: 'O atraso fixo conta a partir do fim da execução anterior: 400 ms de trabalho mais 1 s de espera. Com `scheduleAtFixedRate`, seria 1 s.',
    },
    {
      id: 'senior-t1-e04-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma tarefa agendada com `scheduleAtFixedRate` e período de 1 segundo passa a levar 3 segundos para rodar. O que acontece?',
      opcoes: [
        'As execuções seguintes começam atrasadas, uma logo após a outra, sem nunca rodar ao mesmo tempo',
        'Três execuções passam a rodar em paralelo, em threads diferentes',
        'O agendador lança `RejectedExecutionException`',
        'A tarefa é cancelada por estourar o período',
      ],
      resposta: 0,
      explicacao: 'Uma tarefa periódica só volta à fila depois de terminar. Se atrasar, a próxima execução começa assim que a anterior acabar; execuções da mesma tarefa não se sobrepõem.',
    },
    {
      id: 'senior-t1-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(2);
        List<Callable<String>> tarefas = List.of(
            () -> "rápida",
            () -> { Thread.sleep(2000); return "lenta"; });
        List<Future<String>> futuros = ex.invokeAll(tarefas, 200, TimeUnit.MILLISECONDS);
        System.out.println(futuros.get(0).get());
        ex.shutdown();
        System.out.println(futuros.get(1).get());
    }
}`,
      opcoes: [
        'Imprime `rápida` e lança `CancellationException`',
        'Imprime `rápida` e `lenta`',
        'Imprime `rápida` e lança `TimeoutException`',
        'Lança `TimeoutException` antes de imprimir',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'CancellationException', saida: 'rápida' },
      explicacao: 'O `invokeAll` com prazo não lança `TimeoutException`: ele cancela o que não terminou e devolve a lista. O `get()` da tarefa cancelada lança `CancellationException`.',
    },
    {
      id: 'senior-t1-e04-q15',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`invokeAll` bloqueia a thread que chama até todas as tarefas terminarem',
        '`invokeAny` devolve o resultado de uma tarefa, não um `Future`',
        '`invokeAll` devolve os `Future` na ordem em que as tarefas terminam',
        '`invokeAny` lança exceção assim que a primeira tarefa falha',
        '`invokeAll` aceita uma `List<Runnable>`',
      ],
      respostas: [0, 1],
      explicacao: 'A lista de `invokeAll` segue a ordem da coleção; `invokeAny` ignora falhas enquanto alguma tarefa puder ter sucesso; e os dois só recebem `Callable`.',
    },
  ],
};

export default episodio;
