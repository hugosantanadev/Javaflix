import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t1-e05',
  minutos: 15,
  aula,
  armadilhas: [
    '`new Thread(...)` sempre cria uma thread de plataforma; não há construtor público para threads virtuais.',
    'Threads virtuais são sempre daemon: `setDaemon(false)` lança `IllegalArgumentException`, e a JVM não espera por elas.',
    'A prioridade de uma thread virtual é sempre 5; `setPriority` não tem efeito.',
    'Sem `name(...)`, uma thread virtual tem nome vazio, não `Thread-0`.',
    '`Thread.ofVirtual().name(...)` devolve um construtor, não uma `Thread`: falta chamar `start` ou `unstarted`.',
    'Threads virtuais não aceleram tarefas que usam a CPU o tempo todo; ganham em tarefas que esperam.',
    'Não coloque threads virtuais num pool; para limitar acesso a um recurso, use um `Semaphore`.',
  ],
  recursos: [
    {
      titulo: 'JEP 444: Virtual Threads',
      url: 'https://openjdk.org/jeps/444',
      tipo: 'documentacao',
      porque: 'A proposta que tornou as threads virtuais definitivas no Java 21, com a motivação e as decisões de projeto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Virtual Threads (Core Libraries, Java 21)',
      url: 'https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html',
      tipo: 'documentacao',
      porque: 'O guia oficial, com o que muda em relação às threads de plataforma e as recomendações de uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Virtual Threads',
      url: 'https://dev.java/learn/api/virtual-threads/',
      tipo: 'documentacao',
      porque: 'O tutorial da Oracle sobre criar, usar e entender threads virtuais.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.Thread.Builder',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.Builder.html',
      tipo: 'documentacao',
      porque: 'Os construtores `ofVirtual` e `ofPlatform`, com nomes numerados, `start`, `unstarted` e `factory`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 491: Synchronize Virtual Threads without Pinning',
      url: 'https://openjdk.org/jeps/491',
      tipo: 'documentacao',
      porque: 'Como o Java 24 acabou com o *pinning* em `synchronized`, e por que ele existia.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'InfoQ: Virtual Threads, New Foundations for High-Scale Java Applications (Brian Goetz)',
      url: 'https://www.infoq.com/articles/java-virtual-threads/',
      tipo: 'artigo',
      porque: 'O arquiteto da linguagem explica por que threads virtuais aumentam a vazão e o que fazer e evitar com elas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java: Java 21 new feature, Virtual Threads (#RoadTo21)',
      url: 'https://www.youtube.com/watch?v=5E0LU85EnTI',
      tipo: 'video',
      porque: 'José Paumard, da Oracle, mostra a API e o funcionamento das threads virtuais.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devertelo: Java 21, como funciona o Virtual Threads?',
      url: 'https://www.youtube.com/watch?v=buQ93Y3Nq-A',
      tipo: 'video',
      porque: 'O funcionamento das threads virtuais e das carregadoras, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Elder Moraes: O que são virtual threads e qual a relação com programação reativa',
      url: 'https://www.youtube.com/watch?v=G95wqr8126E',
      tipo: 'video',
      porque: 'Threads virtuais comparadas ao estilo assíncrono que elas vieram substituir, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Giuliana Bezerra: Conheça o poder das Virtual Threads com Java e Spring Boot',
      url: 'https://www.youtube.com/watch?v=a8gMokxIt4Q',
      tipo: 'video',
      porque: 'Threads virtuais num serviço Spring Boot, com o ganho de vazão medido, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As threads virtuais como a prova 1Z0-830 cobra, ao lado das de plataforma.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency", na edição do Java 21',
    },
  ],
  desafio: {
    titulo: 'Verificador de links',
    enunciado:
      'Um site tem 5000 links para conferir, e cada consulta leva 100 ms de rede. Simule a consulta com `static int consultar(int id)`, que dorme 100 ms e devolve `404` se `id` for múltiplo de 7, `500` se for múltiplo de 11 (e não de 7) e `200` nos outros casos. Consulte os ids de 1 a 5000, cada um numa thread virtual, conte quantos links tiveram cada status, em ordem de status, e confirme que todas as consultas rodaram em threads virtuais. A saída deve ser:\n\n```text\n{200=3896, 404=714, 500=390}\ntodas virtuais: true\n```',
    dicas: [
      '`Executors.newVirtualThreadPerTaskExecutor()` num try-with-resources cria uma thread por tarefa e espera todas no `close()`.',
      'Faça a tarefa devolver um `record` com o status e `Thread.currentThread().isVirtual()`.',
      'Some os resultados no `main`, lendo os `Future`, para não precisar de sincronização.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Links {
    record Resultado(int status, boolean virtual) {}

    static int consultar(int id) throws InterruptedException {
        Thread.sleep(100);
        if (id % 7 == 0) {
            return 404;
        }
        return id % 11 == 0 ? 500 : 200;
    }

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        List<Future<Resultado>> futuros = new ArrayList<>();
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int id = 1; id <= 5000; id++) {
                int atual = id;
                futuros.add(executor.submit(() -> new Resultado(consultar(atual), Thread.currentThread().isVirtual())));
            }
        }
        Map<Integer, Integer> porStatus = new TreeMap<>();
        boolean todasVirtuais = true;
        for (Future<Resultado> f : futuros) {
            Resultado r = f.get();
            porStatus.merge(r.status(), 1, Integer::sum);
            todasVirtuais &= r.virtual();
        }
        System.out.println(porStatus);
        System.out.println("todas virtuais: " + todasVirtuais);
    }
}`,
    saida: '{200=3896, 404=714, 500=390}\ntodas virtuais: true',
    comentarios:
      'São 5000 tarefas de 100 ms cada: em sequência, levariam mais de 8 minutos; num pool fixo de 50 threads, 10 segundos; com threads virtuais, pouco mais de 100 ms, porque todas esperam ao mesmo tempo. O código continua sequencial e bloqueante, sem callbacks. A contagem fica no `main`, depois do `close()`: cada tarefa só devolve seu resultado, e nenhuma estrutura é compartilhada entre threads.',
  },
  exercicios: [
    {
      id: 'senior-t1-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread v = Thread.ofVirtual().unstarted(() -> { });
        System.out.println(v.isVirtual() + " " + v.isDaemon() + " " + v.getState());
    }
}`,
      opcoes: ['`true true NEW`', '`true false NEW`', '`true true RUNNABLE`', '`false true NEW`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Threads virtuais são sempre daemon. Criada com `unstarted`, a thread ainda não foi iniciada e está em `NEW`.',
    },
    {
      id: 'senior-t1-e05-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread v = Thread.ofVirtual().unstarted(() -> System.out.println("rodou"));
        v.setDaemon(false);
        v.start();
    }
}`,
      opcoes: [
        'Lança `IllegalArgumentException`',
        'Imprime `rodou`',
        'Lança `IllegalThreadStateException`',
        'Não compila: `setDaemon` não existe em threads virtuais',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: '' },
      explicacao: 'O método existe, porque a thread virtual é um `Thread`, mas `false` não é um valor permitido para ela. `setDaemon(true)` seria aceito sem efeito.',
    },
    {
      id: 'senior-t1-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread p = Thread.ofPlatform().unstarted(() -> { });
        Thread v = Thread.ofVirtual().unstarted(() -> { });
        p.setPriority(Thread.MAX_PRIORITY);
        v.setPriority(Thread.MAX_PRIORITY);
        System.out.println(p.getPriority() + " " + v.getPriority());
    }
}`,
      opcoes: ['`10 5`', '`10 10`', '`5 5`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A prioridade de uma thread virtual é fixa em `NORM_PRIORITY`, 5. O `setPriority` é aceito, mas ignorado.',
    },
    {
      id: 'senior-t1-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread.Builder construtor = Thread.ofVirtual().name("v-", 0);
        Thread a = construtor.start(() -> { });
        Thread b = construtor.unstarted(() -> { });
        Thread c = Thread.ofVirtual().start(() -> { });
        a.join();
        c.join();
        System.out.println(a.getName() + " " + b.getName() + " [" + c.getName() + "]");
    }
}`,
      opcoes: ['`v-0 v-1 []`', '`v-0 v-1 [v-2]`', '`v-0 v-0 []`', '`v-0 v-1 [Thread-0]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O construtor numera cada thread que cria, iniciada ou não. A terceira veio de outro construtor, sem nome, e threads virtuais sem nome têm nome vazio.',
    },
    {
      id: 'senior-t1-e05-q05',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais trechos criam threads virtuais? Escolha três.',
      opcoes: [
        '`Thread.ofVirtual().start(tarefa)`',
        '`Thread.startVirtualThread(tarefa)`',
        '`Executors.newVirtualThreadPerTaskExecutor().submit(tarefa)`',
        '`new Thread(tarefa)`',
        '`Thread.ofPlatform().start(tarefa)`',
        '`Executors.newCachedThreadPool().submit(tarefa)`',
      ],
      respostas: [0, 1, 2],
      explicacao: '`new Thread`, `Thread.ofPlatform()` e os executores tradicionais criam threads de plataforma.',
    },
    {
      id: 'senior-t1-e05-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    public static void main(String[] args) throws Exception {
        Runnable r = () -> System.out.println("oi");
        Thread a = Thread.ofVirtual().start(r);
        Thread b = Thread.startVirtualThread(r);
        Thread c = Thread.ofVirtual().name("c");
        a.join();
        b.join();
    }
}`,
      resposta: 6,
      explicacao: '`name(...)` configura o construtor e devolve o próprio construtor, um `Thread.Builder.OfVirtual`. Para obter a `Thread`, falta `.start(r)` ou `.unstarted(r)`.',
    },
    {
      id: 'senior-t1-e05-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Thread.ofVirtual().start(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                return;
            }
            System.out.println("virtual");
        });
        System.out.println("fim do main");
    }
}`,
      opcoes: ['`fim do main`', '`virtual`', 'As duas linhas, em ordem imprevisível', 'Nada; o programa nunca termina'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A thread virtual é daemon, e a JVM termina quando o `main` acaba, sem esperar por ela. Para ver `virtual`, o `main` precisaria de um `join()`.',
    },
    {
      id: 'senior-t1-e05-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método de `Executors` que cria uma thread virtual nova para cada tarefa. O programa deve imprimir `true`.',
      codigo: `import java.util.concurrent.*;

public class PorTarefa {
    public static void main(String[] args) throws Exception {
        try (ExecutorService executor = Executors.___()) {
            Future<Boolean> f = executor.submit(() -> Thread.currentThread().isVirtual());
            System.out.println(f.get());
        }
    }
}`,
      respostas: ['newVirtualThreadPerTaskExecutor'],
      saida: 'true',
      explicacao: 'Esse executor não tem pool nem fila: cada `submit` ganha uma thread virtual nova, descartada quando a tarefa termina.',
    },
    {
      id: 'senior-t1-e05-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger contador = new AtomicInteger();
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            threads.add(Thread.startVirtualThread(contador::incrementAndGet));
        }
        for (Thread t : threads) {
            t.join();
        }
        System.out.println(contador.get());
    }
}`,
      resposta: '1000',
      explicacao: 'Mil threads virtuais custam pouco. O `join` em cada uma garante que todas terminaram antes da leitura, e o `AtomicInteger` não perde incrementos.',
    },
    {
      id: 'senior-t1-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um programa calcula hashes de 8 arquivos já carregados na memória, numa máquina de 8 núcleos, usando um `newFixedThreadPool(8)`. O que acontece se trocar o pool por `newVirtualThreadPerTaskExecutor()`?',
      opcoes: [
        'Praticamente nada: a tarefa usa a CPU o tempo todo, e só há 8 núcleos para executá-la',
        'Fica cerca de 8 vezes mais rápido',
        'Fica muito mais lento, porque threads virtuais são interpretadas',
        'Não funciona: threads virtuais não podem usar a CPU por muito tempo',
      ],
      resposta: 0,
      explicacao: 'Threads virtuais ganham quando as tarefas passam o tempo esperando. Um cálculo puro não espera, e o limite continua sendo o número de núcleos.',
    },
    {
      id: 'senior-t1-e05-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um serviço com threads virtuais precisa limitar a 20 as consultas simultâneas a um banco de dados. Qual é a abordagem recomendada?',
      opcoes: [
        'Uma thread virtual por tarefa, com um `Semaphore` de 20 permissões em volta da consulta',
        'Um `newFixedThreadPool(20)` com threads virtuais',
        'Chamar `setPriority` nas threads que consultam o banco',
        'Usar threads de plataforma para tudo',
      ],
      resposta: 0,
      explicacao: 'Threads virtuais não devem ir para um pool. O que se quer limitar é o acesso ao banco, e não o número de threads, e o `Semaphore` faz exatamente isso.',
    },
    {
      id: 'senior-t1-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece quando uma thread virtual chama `Thread.sleep(1000)`?',
      opcoes: [
        'Ela é desmontada, e a thread carregadora fica livre para executar outras threads virtuais',
        'A thread carregadora dorme junto por 1 segundo',
        'A JVM cria uma thread de plataforma nova para as outras tarefas',
        'O `sleep` é ignorado em threads virtuais',
      ],
      resposta: 0,
      explicacao: 'A pilha da thread virtual é guardada no heap enquanto ela espera. Quando o tempo passa, ela volta a ser montada, possivelmente em outra carregadora.',
    },
    {
      id: 'senior-t1-e05-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No Java 21, o que acontece quando uma thread virtual bloqueia dentro de um bloco `synchronized`?',
      opcoes: [
        'Ela fica presa (*pinning*) à thread carregadora, que não pode executar outras threads virtuais enquanto isso',
        'Lança `IllegalStateException`',
        'O `synchronized` é ignorado em threads virtuais',
        'Ela é desmontada normalmente, como em qualquer bloqueio',
      ],
      resposta: 0,
      explicacao: 'No Java 21, `synchronized` impedia a desmontagem. A recomendação era usar `ReentrantLock` em código que bloqueia. O Java 24 (JEP 491) eliminou essa limitação.',
    },
    {
      id: 'senior-t1-e05-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre threads virtuais são verdadeiras? Escolha duas.',
      opcoes: [
        'São instâncias de `java.lang.Thread`',
        'Funcionam com `join`, `interrupt` e `getState`',
        'Devem ser reaproveitadas num pool, como as de plataforma',
        'Podem ser transformadas em não daemon antes do `start`',
        'São criadas com `new Thread(tarefa)` seguido de `setVirtual(true)`',
      ],
      respostas: [0, 1],
      explicacao: 'Threads virtuais são `Thread` comuns na API. Não vão para pools, são sempre daemon e saem dos construtores `ofVirtual` ou do executor por tarefa.',
    },
    {
      id: 'senior-t1-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Thread v = Thread.ofVirtual().start(() -> {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("interrompida " + Thread.currentThread().isInterrupted());
            }
        });
        v.interrupt();
        v.join();
    }
}`,
      opcoes: ['`interrompida false`', '`interrompida true`', 'Nada; a thread dorme até o fim', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A interrupção funciona igual nas threads virtuais. Se chegar antes do `sleep`, ele lança na hora; se chegar durante, ele acorda. Nos dois casos, a exceção desliga a marca.',
    },
  ],
};

export default episodio;
