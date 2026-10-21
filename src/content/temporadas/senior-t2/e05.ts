import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t2-e05',
  minutos: 15,
  aula,
  armadilhas: [
    'Deadlock não lança exceção: as threads ficam bloqueadas para sempre, e o programa simplesmente para.',
    'Duas threads que adquirem as mesmas duas travas em ordens opostas podem entrar em deadlock, mas não necessariamente em toda execução.',
    'Presas em `synchronized`, as threads ficam `BLOCKED`; presas em `Lock.lock()`, ficam `WAITING`.',
    'No livelock, as threads estão ativas e gastando CPU, mas nenhuma progride.',
    'Na starvation, o programa avança, mas uma thread nunca consegue a vez.',
    'Uma thread que segura a leitura de uma `ReentrantReadWriteLock` e pede a escrita trava a si mesma.',
    '`tryLock(tempo, unidade)` só evita o impasse se, ao falhar, a thread soltar as travas que já tem.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Deadlock',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/deadlock.html',
      tipo: 'documentacao',
      porque: 'O exemplo clássico dos dois amigos que se curvam ao mesmo tempo e ficam presos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Starvation and Livelock',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/starvelive.html',
      tipo: 'documentacao',
      porque: 'As duas outras formas de falta de progresso, com a analogia do corredor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.management.ThreadMXBean',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.management/java/lang/management/ThreadMXBean.html',
      tipo: 'documentacao',
      porque: '`findDeadlockedThreads` e as informações de travas de cada thread.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The jstack Command',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/jstack.html',
      tipo: 'documentacao',
      porque: 'O despejo de threads que revela um impasse num processo em execução.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Thread Deadlock and Livelock',
      url: 'https://www.baeldung.com/java-deadlock-livelock',
      tipo: 'artigo',
      porque: 'Os dois problemas reproduzidos em código, com a forma de evitar cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Deadlock Prevention',
      url: 'https://jenkov.com/tutorials/java-concurrency/deadlock-prevention.html',
      tipo: 'artigo',
      porque: 'Ordem de travas, tempo limite e detecção, com as vantagens de cada técnica.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Starvation and Fairness',
      url: 'https://jenkov.com/tutorials/java-concurrency/starvation-and-fairness.html',
      tipo: 'artigo',
      porque: 'As causas de inanição e como uma trava justa as resolve.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Deadlock',
      url: 'https://jenkov.com/tutorials/java-concurrency/deadlock.html',
      tipo: 'artigo',
      porque: 'Impasses com duas e com mais threads, e impasses em bancos de dados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Threads pt 08, Sincronismo de thread pt 04, Deadlock',
      url: 'https://www.youtube.com/watch?v=Pm0EfS0Lu4M',
      tipo: 'video',
      porque: 'Um impasse provocado ao vivo e a análise das travas envolvidas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Brains: Deadlocks vs Livelocks',
      url: 'https://www.youtube.com/watch?v=NUazC4EUG50',
      tipo: 'video',
      porque: 'A diferença entre threads paradas e threads ocupadas sem progresso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'O capítulo inteiro sobre riscos de vivacidade, com a transferência entre contas ordenada por id.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Avoiding Liveness Hazards": seções 10.1, "Deadlock", 10.2, "Avoiding and diagnosing deadlocks", e 10.3, "Other liveness hazards"',
    },
  ],
  desafio: {
    titulo: 'Banco sem impasse',
    enunciado:
      'Três contas, A (id 1), B (id 2) e C (id 3), começam com 50000 cada. Quatro threads fazem 10000 transferências de 1 cada, nas rotas A para B, B para C, C para A e B para A. As rotas formam um ciclo, e uma transferência que trava a origem e depois o destino pode entrar em impasse. Escreva `transferir(de, para, valor)` com uma `ReentrantLock` por conta, adquiridas sempre em ordem crescente de id. A saída deve ser:\n\n```text\nA: 60000\nB: 40000\nC: 50000\ntotal: 150000\n```',
    dicas: [
      'Descubra qual das duas contas tem o menor id e trave-a primeiro, não importa se é a origem ou o destino.',
      'Libere as travas em `finally`, na ordem inversa.',
      'Os saldos finais só dependem de quantas transferências cada rota fez, não da ordem em que aconteceram.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

public class Banco {
    static class Conta {
        final int id;
        final String nome;
        private long saldo;
        final ReentrantLock trava = new ReentrantLock();

        Conta(int id, String nome, long saldo) {
            this.id = id;
            this.nome = nome;
            this.saldo = saldo;
        }
    }

    static void transferir(Conta de, Conta para, long valor) {
        Conta primeira = de.id < para.id ? de : para;
        Conta segunda = primeira == de ? para : de;
        primeira.trava.lock();
        try {
            segunda.trava.lock();
            try {
                de.saldo -= valor;
                para.saldo += valor;
            } finally {
                segunda.trava.unlock();
            }
        } finally {
            primeira.trava.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Conta a = new Conta(1, "A", 50_000);
        Conta b = new Conta(2, "B", 50_000);
        Conta c = new Conta(3, "C", 50_000);
        Conta[][] rotas = {{a, b}, {b, c}, {c, a}, {b, a}};
        List<Thread> threads = new ArrayList<>();
        for (Conta[] rota : rotas) {
            threads.add(new Thread(() -> {
                for (int i = 0; i < 10_000; i++) {
                    transferir(rota[0], rota[1], 1);
                }
            }));
        }
        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
        for (Conta conta : List.of(a, b, c)) {
            System.out.println(conta.nome + ": " + conta.saldo);
        }
        System.out.println("total: " + (a.saldo + b.saldo + c.saldo));
    }
}`,
    saida: 'A: 60000\nB: 40000\nC: 50000\ntotal: 150000',
    comentarios:
      'Com três threads nas rotas A para B, B para C e C para A, travar sempre a origem primeiro permite um ciclo de três: cada uma segura a sua origem e espera a de outra. Com a ordem por id, a rota C para A trava A antes de C, e o ciclo se desfaz: ninguém pode segurar C esperando A, porque quem quer as duas pega A primeiro. Os saldos conferem, A ganhou 10000 líquidos e B perdeu 10000, e o total se mantém.',
  },
  exercicios: [
    {
      id: 'senior-t2-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que caracteriza um deadlock?',
      opcoes: [
        'Duas ou mais threads bloqueadas para sempre, cada uma esperando uma trava que outra segura',
        'Uma thread que lança exceção dentro de um bloco sincronizado',
        'Threads ativas que mudam de estado sem progredir',
        'Uma thread que nunca consegue a vez porque outras sempre ganham',
      ],
      resposta: 0,
      explicacao: 'As outras alternativas descrevem um erro comum, o livelock e a starvation.',
    },
    {
      id: 'senior-t2-e05-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A thread 1 chama `a()` e a thread 2 chama `b()`, ao mesmo tempo, no mesmo objeto. O que pode acontecer?',
      codigo: `private final Object x = new Object();
private final Object y = new Object();

void a() {
    synchronized (x) {
        synchronized (y) {
            System.out.println("a");
        }
    }
}

void b() {
    synchronized (y) {
        synchronized (x) {
            System.out.println("b");
        }
    }
}`,
      opcoes: [
        'Pode imprimir as duas linhas, ou as duas threads podem ficar presas para sempre',
        'Sempre imprime `a` e depois `b`',
        'Sempre fica preso',
        'Lança `IllegalMonitorStateException`',
      ],
      resposta: 0,
      explicacao: 'As travas são adquiridas em ordens opostas. Se uma thread pega as duas antes da outra começar, tudo corre bem; se cada uma pega a primeira, há impasse. O resultado depende da intercalação.',
    },
    {
      id: 'senior-t2-e05-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais técnicas evitam deadlock? Escolha duas.',
      opcoes: [
        'Adquirir as travas sempre na mesma ordem global',
        'Usar `tryLock` com prazo e, se falhar, soltar as travas já adquiridas',
        'Aumentar a prioridade de uma das threads',
        'Declarar as travas como `volatile`',
        'Criar mais threads',
      ],
      respostas: [0, 1],
      explicacao: 'A ordem global quebra a espera circular; o `tryLock` com recuo quebra a posse e espera. Prioridades, `volatile` e mais threads não mudam o ciclo.',
    },
    {
      id: 'senior-t2-e05-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Duas threads tentam pegar duas travas com `tryLock`, falham, soltam o que tinham e tentam de novo, sempre no mesmo ritmo. A CPU fica em 100%, mas nenhuma conclui o trabalho. Como se chama isso?',
      opcoes: ['Livelock', 'Deadlock', 'Starvation', 'Condição de corrida'],
      resposta: 0,
      explicacao: 'No livelock, as threads não estão bloqueadas: reagem umas às outras sem avançar. Uma espera aleatória antes de tentar de novo quebra a simetria.',
    },
    {
      id: 'senior-t2-e05-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num servidor, as requisições comuns sempre conseguem a trava de um recurso, mas a thread de relatórios espera horas sem nunca conseguir. Como se chama isso?',
      opcoes: ['Starvation', 'Deadlock', 'Livelock', 'Exclusão mútua'],
      resposta: 0,
      explicacao: 'O sistema progride, mas uma thread nunca ganha a vez. Uma trava justa, `new ReentrantLock(true)`, atende por ordem de chegada.',
    },
    {
      id: 'senior-t2-e05-q06',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    static int saldoA = 500, saldoB = 500;
    static final Object travaA = new Object(), travaB = new Object();

    static void transferir(boolean deAparaB) {
        synchronized (travaA) {
            synchronized (travaB) {
                if (deAparaB) {
                    saldoA--;
                    saldoB++;
                } else {
                    saldoB--;
                    saldoA++;
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 300; i++) transferir(true);
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 100; i++) transferir(false);
        });
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(saldoA + " " + saldoB);
    }
}`,
      resposta: '300 700',
      explicacao: 'As duas direções travam A antes de B, então não há ciclo nem impasse. A perde 300 e ganha 100.',
    },
    {
      id: 'senior-t2-e05-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'As duas threads entram em deadlock, ambas paradas em `lock()`. Qual é a saída?',
      codigo: `import java.lang.management.ManagementFactory;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.locks.ReentrantLock;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        ReentrantLock a = new ReentrantLock();
        ReentrantLock b = new ReentrantLock();
        CountDownLatch ambas = new CountDownLatch(2);
        Thread t1 = new Thread(() -> pegar(a, b, ambas));
        Thread t2 = new Thread(() -> pegar(b, a, ambas));
        t1.setDaemon(true);
        t2.setDaemon(true);
        t1.start();
        t2.start();
        while (ManagementFactory.getThreadMXBean().findDeadlockedThreads() == null) {
            Thread.sleep(50);
        }
        System.out.println(t1.getState() + " " + t2.getState());
    }

    static void pegar(ReentrantLock primeira, ReentrantLock segunda, CountDownLatch ambas) {
        primeira.lock();
        ambas.countDown();
        try {
            ambas.await();
        } catch (InterruptedException e) {
            return;
        }
        segunda.lock();
    }
}`,
      opcoes: ['`WAITING WAITING`', '`BLOCKED BLOCKED`', '`RUNNABLE RUNNABLE`', '`TIMED_WAITING TIMED_WAITING`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`BLOCKED` é exclusivo de quem espera um monitor de `synchronized`. As travas de `java.util.concurrent` estacionam a thread com `LockSupport.park()`, que resulta em `WAITING`.',
    },
    {
      id: 'senior-t2-e05-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método que tenta adquirir a trava, desistindo depois do prazo. O programa deve imprimir `livre`.',
      codigo: `import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class Recuo {
    public static void main(String[] args) throws InterruptedException {
        ReentrantLock trava = new ReentrantLock();
        if (trava.___(100, TimeUnit.MILLISECONDS)) {
            try {
                System.out.println("livre");
            } finally {
                trava.unlock();
            }
        }
    }
}`,
      respostas: ['tryLock'],
      saida: 'livre',
      explicacao: 'Com a trava livre, `tryLock` consegue na hora. Se não conseguisse no prazo, devolveria `false`, permitindo recuar em vez de esperar para sempre.',
    },
    {
      id: 'senior-t2-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        ReentrantLock a = new ReentrantLock();
        ReentrantLock b = new ReentrantLock();
        b.lock();
        Thread t = new Thread(() -> {
            a.lock();
            try {
                if (b.tryLock(100, TimeUnit.MILLISECONDS)) {
                    try {
                        System.out.println("transferiu");
                    } finally {
                        b.unlock();
                    }
                } else {
                    System.out.println("desistiu");
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                a.unlock();
            }
        });
        t.start();
        t.join();
        b.unlock();
        System.out.println(a.isLocked() + " " + b.isLocked());
    }
}`,
      opcoes: ['`desistiu` e `false false`', '`transferiu` e `false false`', '`desistiu` e `true false`', 'O programa trava para sempre'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'desistiu\nfalse false' },
      explicacao: 'O `main` segura `b` até a thread terminar. A thread espera 100 ms, desiste, solta `a` e termina; só então o `main` solta `b`.',
    },
    {
      id: 'senior-t2-e05-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma thread adquire `rw.readLock().lock()` de uma `ReentrantReadWriteLock` e, sem soltar, chama `rw.writeLock().lock()`. O que acontece?',
      opcoes: [
        'A thread espera para sempre: a escrita aguarda o fim de todas as leituras, inclusive a dela',
        'A leitura é promovida a escrita',
        'Lança `IllegalMonitorStateException`',
        'A trava de leitura é solta automaticamente',
      ],
      resposta: 0,
      explicacao: 'É um impasse de uma thread só. A promoção de leitura para escrita não existe; o certo é soltar a leitura antes de pedir a escrita.',
    },
    {
      id: 'senior-t2-e05-q11',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Lock a = new ReentrantLock();
        boolean pegou = a.tryLock(100);
        if (pegou) {
            a.unlock();
        }
    }
}`,
      resposta: 7,
      explicacao: 'A versão de `tryLock` com espera exige a unidade de tempo: `tryLock(100, TimeUnit.MILLISECONDS)`.',
    },
    {
      id: 'senior-t2-e05-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são condições necessárias para um deadlock? Escolha três.',
      opcoes: [
        'Espera circular entre as threads',
        'Threads que seguram um recurso enquanto esperam outro',
        'Recursos que não podem ser tomados de quem os segura',
        'Threads com prioridades diferentes',
        'Uso de `volatile`',
        'Mais threads que núcleos',
      ],
      respostas: [0, 1, 2],
      explicacao: 'São três das quatro condições de Coffman; a quarta é a exclusão mútua. Prioridades, `volatile` e o número de núcleos não fazem parte delas.',
    },
    {
      id: 'senior-t2-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um serviço em produção parou de responder, sem erros no log e com a CPU ociosa. Qual ferramenta mostra se há um deadlock?',
      opcoes: [
        '`jstack <pid>`, que imprime as threads e avisa `Found one Java-level deadlock`',
        '`javac -Xlint`, que analisa as travas do código',
        '`java -version`',
        '`jar tf`, que lista as classes do programa',
      ],
      resposta: 0,
      explicacao: 'O despejo de threads mostra o que cada uma espera e quem segura cada trava. `jcmd <pid> Thread.print` faz o mesmo.',
    },
    {
      id: 'senior-t2-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("antes");
        Thread.currentThread().join(200);
        System.out.println("depois");
    }
}`,
      opcoes: [
        'Imprime `antes` e, 200 ms depois, `depois`',
        'Imprime `antes` e espera para sempre',
        'Lança `IllegalThreadStateException`',
        'Não compila: uma thread não pode fazer `join` em si mesma',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'antes\ndepois' },
      explicacao: 'Uma thread esperando o próprio fim nunca seria atendida, mas com prazo o `join` desiste depois de 200 ms. Sem o prazo, seria um impasse de uma thread só.',
    },
    {
      id: 'senior-t2-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num programa, três threads transferem nas rotas A para B, B para C e C para A, travando sempre a conta de origem e depois a de destino. Qual afirmação é correta?',
      opcoes: [
        'Pode haver deadlock entre as três, mesmo sem duas rotas opostas',
        'Não há risco: deadlock só acontece entre duas threads',
        'Não há risco: nenhuma rota é o inverso da outra',
        'Sempre há deadlock na primeira execução',
      ],
      resposta: 0,
      explicacao: 'Cada thread pode segurar sua origem e esperar a origem da seguinte, formando um ciclo de três. Travar sempre em ordem de id elimina o ciclo.',
    },
  ],
};

export default episodio;
