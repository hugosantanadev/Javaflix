import type { Exercicio } from '../../types';

/** Prova da temporada Sênior T2: código thread-safe. */
const prova: Exercicio[] = [
  {
    id: 'senior-t2-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    private int n;

    synchronized void inc() {
        n++;
    }

    public static void main(String[] args) throws InterruptedException {
        Teste a = new Teste();
        Teste b = new Teste();
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) a.inc();
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) b.inc();
        });
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(a.n + " " + b.n);
    }
}`,
    opcoes: ['`1000 1000`', 'Valores imprevisíveis, menores que 1000', '`2000 0`', 'O programa trava'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Cada thread incrementa um objeto diferente, com a própria trava. Não há dado compartilhado nem disputa, e o `join` torna os valores visíveis ao `main`.',
  },
  {
    id: 'senior-t2-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre `synchronized` são verdadeiras? Escolha duas.',
    opcoes: [
      'Um método `static synchronized` usa a trava do objeto `Class` da classe',
      'Uma thread que segura uma trava pode adquiri-la de novo sem travar a si mesma',
      'Dois blocos `synchronized` em objetos diferentes se excluem mutuamente',
      'Um construtor pode ser marcado como `synchronized`',
      '`synchronized` aceita uma expressão do tipo `int`',
    ],
    respostas: [0, 1],
    explicacao: 'A exclusão só vale para a mesma trava. Construtores não podem ser sincronizados, e a expressão do bloco precisa ser uma referência.',
  },
  {
    id: 'senior-t2-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        Object trava = new Object();
        synchronized (trava) {
            trava.notify();
            System.out.println("dentro");
        }
        trava.notifyAll();
        System.out.println("fora");
    }
}`,
    opcoes: [
      'Imprime `dentro` e lança `IllegalMonitorStateException`',
      'Imprime `dentro` e `fora`',
      'Lança `IllegalMonitorStateException` antes de imprimir',
      'Não compila: `notifyAll` fora de bloco sincronizado',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalMonitorStateException', saida: 'dentro' },
    explicacao: 'Notificar sem ninguém esperando não é erro, desde que a thread segure a trava. Fora do bloco, `notifyAll` lança a exceção em tempo de execução.',
  },
  {
    id: 'senior-t2-prova-q04',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) {
        AtomicInteger n = new AtomicInteger(10);
        System.out.println(n.decrementAndGet() + " " + n.getAndDecrement() + " " + n.get());
    }
}`,
    opcoes: ['`9 9 8`', '`9 8 8`', '`10 9 8`', '`9 9 9`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`decrementAndGet` vai a 9 e devolve 9. `getAndDecrement` devolve 9 e deixa 8.',
  },
  {
    id: 'senior-t2-prova-q05',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.concurrent.atomic.AtomicLong;

public class Teste {
    public static void main(String[] args) {
        AtomicLong menor = new AtomicLong(Long.MAX_VALUE);
        for (long v : new long[] {42, 17, 99, 23}) {
            menor.accumulateAndGet(v, Math::min);
        }
        System.out.println(menor.get() + " " + menor.compareAndSet(17, 0) + " " + menor.get());
    }
}`,
    resposta: '17 true 0',
    explicacao: '`accumulateAndGet` com `Math::min` guarda o menor valor visto, 17. O `compareAndSet(17, 0)` encontra 17 e grava 0.',
  },
  {
    id: 'senior-t2-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um campo é declarado `private volatile int visitas`, e dez threads executam `visitas++`. Qual afirmação é verdadeira?',
    opcoes: [
      'Incrementos podem se perder, porque `volatile` não torna a operação atômica',
      'Nenhum incremento se perde, porque `volatile` sincroniza o campo',
      'O código não compila',
      'Cada thread enxerga apenas os próprios incrementos',
    ],
    resposta: 0,
    explicacao: '`volatile` garante que cada leitura veja a última escrita, mas o incremento continua sendo ler, somar e gravar. Para contar, use `AtomicInteger` ou trava.',
  },
  {
    id: 'senior-t2-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.concurrent.locks.ReentrantLock;

public class Teste {
    public static void main(String[] args) {
        ReentrantLock trava = new ReentrantLock();
        trava.lock();
        trava.lock();
        trava.unlock();
        System.out.println(trava.getHoldCount());
        trava.unlock();
        System.out.println(trava.getHoldCount());
        trava.unlock();
    }
}`,
    opcoes: [
      'Imprime `1` e `0` e lança `IllegalMonitorStateException`',
      'Imprime `1` e `0` e termina normalmente',
      'Imprime `0` e `0` e lança `IllegalMonitorStateException`',
      'Trava no segundo `lock()`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalMonitorStateException', saida: '1\n0' },
    explicacao: 'A trava é reentrante e conta as aquisições. Depois de dois `unlock()`, a thread já não a segura, e o terceiro lança a exceção.',
  },
  {
    id: 'senior-t2-prova-q08',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) {
        Lock a = new ReentrantLock();
        Lock b = new Lock();
        a.lock();
        a.unlock();
    }
}`,
    opcoes: [
      'Não compila: `Lock` é uma interface e não pode ser instanciada',
      'Compila e termina normalmente',
      'Compila, mas lança `IllegalMonitorStateException`',
      'Não compila: `ReentrantLock` não implementa `Lock`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'Só implementações concretas, como `ReentrantLock`, podem ser criadas com `new`.',
  },
  {
    id: 'senior-t2-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Teste {
    public static void main(String[] args) {
        ReentrantReadWriteLock rw = new ReentrantReadWriteLock();
        rw.readLock().lock();
        rw.readLock().lock();
        System.out.println(rw.getReadLockCount() + " " + rw.writeLock().tryLock() + " " + rw.isWriteLocked());
    }
}`,
    opcoes: ['`2 false false`', '`1 false false`', '`2 true true`', 'O programa trava no segundo `lock()`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A trava de leitura é reentrante e conta 2. Com leituras ativas, a escrita não é concedida, nem para a própria thread.',
  },
  {
    id: 'senior-t2-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

public class Teste {
    public static void main(String[] args) {
        List<String> lista = new CopyOnWriteArrayList<>(List.of("a", "b"));
        Iterator<String> it = lista.iterator();
        lista.remove("a");
        System.out.println(it.next() + " " + lista);
        it.remove();
    }
}`,
    opcoes: [
      'Imprime `a [b]` e lança `UnsupportedOperationException`',
      'Imprime `b [b]` e termina',
      'Lança `ConcurrentModificationException`',
      'Imprime `a [b]` e termina',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: 'a [b]' },
    explicacao: 'O iterador percorre o retrato de quando foi criado, que ainda tem o `a`. E, por percorrer um retrato, ele não permite remover: `it.remove()` não é suportado.',
  },
  {
    id: 'senior-t2-prova-q11',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

public class Teste {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> m = new ConcurrentHashMap<>();
        m.put("a", 1);
        m.merge("a", 5, Integer::sum);
        m.putIfAbsent("a", 100);
        m.computeIfAbsent("b", k -> 7);
        m.compute("b", (k, v) -> v * 2);
        System.out.println(new TreeMap<>(m));
    }
}`,
    resposta: '{a=6, b=14}',
    explicacao: '`merge` soma 5 ao 1. `putIfAbsent` não faz nada, porque `a` existe. `computeIfAbsent` cria `b` com 7, e `compute` o dobra.',
  },
  {
    id: 'senior-t2-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        BlockingQueue<Integer> fila = new ArrayBlockingQueue<>(1);
        System.out.println(fila.add(1));
        fila.add(2);
    }
}`,
    opcoes: [
      'Imprime `true` e lança `IllegalStateException`',
      'Imprime `true` e espera para sempre',
      'Imprime `true` e termina; o 2 é descartado',
      'Não compila: `add` declara `InterruptedException`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: 'true' },
    explicacao: 'Na fila cheia, `add` lança exceção, `offer` devolve `false` e só `put` espera. `add` não declara exceção checked.',
  },
  {
    id: 'senior-t2-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um `CyclicBarrier` é criado com 3 partes, mas só duas threads chamam `await()`. O que acontece com elas?',
    opcoes: [
      'Ficam esperando até uma terceira thread chegar, ou até serem interrompidas',
      'Seguem em frente, porque a maioria chegou',
      'Lançam `BrokenBarrierException` na hora',
      'A barreira se reinicia com 2 partes',
    ],
    resposta: 0,
    explicacao: 'A barreira só abre quando o número exato de partes chega. Se uma das que esperam for interrompida, as outras recebem `BrokenBarrierException`.',
  },
  {
    id: 'senior-t2-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Num sistema, duas threads ficam alternando entre pegar uma trava, perceber que a outra quer o mesmo recurso, soltar e tentar de novo, indefinidamente, sem que nenhuma conclua. Que problema é esse?',
    opcoes: ['Livelock', 'Deadlock', 'Starvation', 'Condição de corrida'],
    resposta: 0,
    explicacao: 'As threads não estão bloqueadas: estão ativas, reagindo uma à outra, sem progredir. No deadlock, estariam paradas esperando.',
  },
  {
    id: 'senior-t2-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O método abaixo é chamado ao mesmo tempo como `transferir(c1, c2)` e `transferir(c2, c1)`. Qual alteração elimina o risco de deadlock?',
    codigo: `void transferir(Conta de, Conta para) {
    synchronized (de) {
        synchronized (para) {
            de.sacar(10);
            para.depositar(10);
        }
    }
}`,
    opcoes: [
      'Travar primeiro a conta de menor id e depois a outra, não importa qual é a origem',
      'Marcar os campos de saldo como `volatile`',
      'Trocar a ordem das linhas `sacar` e `depositar`',
      'Tornar o método `static`, mantendo os blocos internos',
    ],
    resposta: 0,
    explicacao: 'O impasse vem das ordens opostas de aquisição. Com uma ordem global, as duas chamadas disputam primeiro a mesma trava, e o ciclo não se forma.',
  },
  {
    id: 'senior-t2-prova-q16',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre deadlock em Java são verdadeiras? Escolha duas.',
    opcoes: [
      'A JVM não desfaz um deadlock: as threads ficam presas até o processo terminar',
      'Threads presas esperando monitores de `synchronized` ficam no estado `BLOCKED`',
      'A JVM lança uma exceção nas threads em deadlock',
      'Um código sujeito a deadlock sempre trava na primeira execução',
      'Declarar as travas como `volatile` evita deadlocks',
    ],
    respostas: [0, 1],
    explicacao: 'Deadlocks são silenciosos e dependem da intercalação. Só a prevenção, como a ordem global de travas, resolve.',
  },
  {
    id: 'senior-t2-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.rangeClosed(1, 5).parallel().mapToObj(String::valueOf).collect(Collectors.joining("-")));
    }
}`,
    opcoes: ['`1-2-3-4-5`', 'Uma ordem imprevisível', '`5-4-3-2-1`', '`12345`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`collect` respeita a ordem de encontro: cada pedaço é juntado na ordem certa, mesmo processado por threads diferentes.',
  },
  {
    id: 'senior-t2-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de `IntStream.rangeClosed(1, 100).parallel().reduce(0, (a, b) -> a - b)`?',
    opcoes: [
      'Pode variar entre execuções e máquinas, porque a subtração não é associativa',
      'Sempre -5050',
      'Sempre 0',
      'Não compila: `reduce` em paralelo exige um combinador',
    ],
    resposta: 0,
    explicacao: 'Em sequência seria -5050. Em paralelo, os pedaços são reduzidos separadamente e combinados com a mesma subtração, e `(a - b) - c` não é `a - (b - c)`.',
  },
  {
    id: 'senior-t2-prova-q19',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.Arrays;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;

public class Teste extends RecursiveAction {
    private final int[] dados;
    private final int inicio, fim;

    Teste(int[] dados, int inicio, int fim) {
        this.dados = dados;
        this.inicio = inicio;
        this.fim = fim;
    }

    @Override
    protected void compute() {
        if (fim - inicio <= 2) {
            for (int i = inicio; i < fim; i++) {
                dados[i] *= 2;
            }
            return;
        }
        int meio = (inicio + fim) / 2;
        invokeAll(new Teste(dados, inicio, meio), new Teste(dados, meio, fim));
    }

    public static void main(String[] args) {
        int[] dados = {1, 2, 3, 4, 5, 6, 7};
        ForkJoinPool.commonPool().invoke(new Teste(dados, 0, dados.length));
        System.out.println(Arrays.toString(dados));
    }
}`,
    resposta: '[2, 4, 6, 8, 10, 12, 14]',
    explicacao: 'A ação divide o array até pedaços de no máximo dois elementos e dobra cada um. Os pedaços não se sobrepõem, então as threads nunca disputam a mesma posição.',
  },
  {
    id: 'senior-t2-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.concurrent.RecursiveTask;

public class Teste extends RecursiveTask<Integer> {
    private final int n;

    Teste(int n) {
        this.n = n;
    }

    @Override
    protected int compute() {
        return n * 2;
    }
}`,
    opcoes: [
      'Não compila: `compute()` precisa devolver `Integer`, o tipo de `RecursiveTask<Integer>`',
      'Compila: o `int` é convertido para `Integer` por autoboxing',
      'Não compila: `compute()` precisa ser `public`',
      'Compila, mas lança `ClassCastException` ao executar',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 11 },
    explicacao: 'Na sobrescrita, o tipo de retorno pode ser um subtipo, mas `int` não é subtipo de `Integer`: o autoboxing não vale para tipos de retorno de métodos sobrescritos.',
  },
];

export default prova;
