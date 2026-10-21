import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t2-e03',
  minutos: 16,
  aula,
  armadilhas: [
    'Com `Lock`, a liberação é manual: `lock()` antes do `try` e `unlock()` no `finally`.',
    '`unlock()` sem segurar a trava lança `IllegalMonitorStateException`.',
    '`ReentrantLock` adquirida duas vezes pela mesma thread precisa de dois `unlock()`.',
    '`tryLock()` não lança exceção checked; `tryLock(tempo, unidade)` declara `InterruptedException`.',
    '`tryLock()` devolve `boolean`: só chame `unlock()` se ele devolveu `true`.',
    '`Lock` e `ReadWriteLock` são interfaces; `ReadWriteLock` não tem `lock()`, só `readLock()` e `writeLock()`.',
    'Quem segura a leitura não consegue a escrita (não há promoção); quem segura a escrita consegue a leitura (rebaixamento).',
    '`Condition.await()` sem a trava lança `IllegalMonitorStateException`, como o `wait()`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Lock Objects',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/newlocks.html',
      tipo: 'documentacao',
      porque: 'O `tryLock` usado para evitar um impasse, no exemplo dos amigos que se cumprimentam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.locks.Lock',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/Lock.html',
      tipo: 'documentacao',
      porque: 'As formas de adquirir uma trava e o padrão oficial com `finally`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.locks.ReentrantLock',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html',
      tipo: 'documentacao',
      porque: 'Justiça, contagem de posse e os métodos de inspeção, como `getHoldCount` e `isLocked`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.locks.ReentrantReadWriteLock',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/ReentrantReadWriteLock.html',
      tipo: 'documentacao',
      porque: 'Reentrância, rebaixamento e o exemplo oficial de um cache protegido por leitura e escrita.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.locks.AbstractQueuedSynchronizer',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html',
      tipo: 'documentacao',
      porque: 'A base comum de travas e sincronizadores, com o estado em `int` e a fila de espera.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to java.util.concurrent.Locks',
      url: 'https://www.baeldung.com/java-concurrent-locks',
      tipo: 'artigo',
      porque: '`ReentrantLock`, `ReentrantReadWriteLock`, `StampedLock` e `Condition`, com exemplos de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java Lock',
      url: 'https://jenkov.com/tutorials/java-util-concurrent/lock.html',
      tipo: 'artigo',
      porque: 'As diferenças entre `Lock` e `synchronized`, método por método.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: ReadWriteLock',
      url: 'https://jenkov.com/tutorials/java-util-concurrent/readwritelock.html',
      tipo: 'artigo',
      porque: 'As regras de quando leitores e escritores podem entrar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Concorrência pt 02, Lock and ReentrantLock',
      url: 'https://www.youtube.com/watch?v=4yw1WJUIrwg',
      tipo: 'video',
      porque: '`ReentrantLock`, `tryLock` e justiça, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Concorrência pt 03, Conditions',
      url: 'https://www.youtube.com/watch?v=8Gxw4WzYx-w',
      tipo: 'video',
      porque: 'Esperar e sinalizar com `Condition`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Concorrência pt 04, ReentrantReadWriteLock',
      url: 'https://www.youtube.com/watch?v=hsnTg0Y5Iuw',
      tipo: 'video',
      porque: 'Leituras em paralelo e escrita exclusiva, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'Quando trocar `synchronized` por uma trava explícita, e quando não vale a pena.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Explicit Locks": seções 13.1, "Lock and ReentrantLock", 13.4, "Choosing between synchronized and ReentrantLock", e 13.5, "Read-write locks"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: '`Lock`, `ReentrantLock` e `tryLock` com as pegadinhas que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Writing Thread-Safe Code", parte sobre o framework de `Lock`',
    },
  ],
  desafio: {
    titulo: 'Fila limitada',
    enunciado:
      'Implemente uma fila de capacidade fixa, compartilhada por um produtor e um consumidor, usando uma `ReentrantLock` e duas `Condition`: `naoCheia` e `naoVazia`. `colocar(item)` espera enquanto a fila estiver cheia; `retirar()` espera enquanto estiver vazia. Registre o maior tamanho que a fila atingiu. Com capacidade 3, o produtor coloca os números de 1 a 10 e o consumidor retira 10 itens, acumulando-os. A saída deve ser:\n\n```text\nrecebidos: 1 2 3 4 5 6 7 8 9 10\nsoma: 55\ndentro da capacidade: true\n```',
    dicas: [
      'Teste a condição num `while`, não num `if`: depois de acordar, a fila pode ter mudado de novo.',
      'Depois de colocar, sinalize `naoVazia`; depois de retirar, sinalize `naoCheia`.',
      'Cada método adquire a trava antes do `try` e a libera no `finally`, mesmo durante o `await`.',
    ],
    solucao: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringJoiner;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class FilaLimitada {
    private final Deque<Integer> itens = new ArrayDeque<>();
    private final int capacidade;
    private final ReentrantLock trava = new ReentrantLock();
    private final Condition naoCheia = trava.newCondition();
    private final Condition naoVazia = trava.newCondition();
    private int maiorTamanho;

    FilaLimitada(int capacidade) {
        this.capacidade = capacidade;
    }

    void colocar(int item) throws InterruptedException {
        trava.lock();
        try {
            while (itens.size() == capacidade) {
                naoCheia.await();
            }
            itens.addLast(item);
            maiorTamanho = Math.max(maiorTamanho, itens.size());
            naoVazia.signal();
        } finally {
            trava.unlock();
        }
    }

    int retirar() throws InterruptedException {
        trava.lock();
        try {
            while (itens.isEmpty()) {
                naoVazia.await();
            }
            int item = itens.removeFirst();
            naoCheia.signal();
            return item;
        } finally {
            trava.unlock();
        }
    }

    int maiorTamanho() {
        trava.lock();
        try {
            return maiorTamanho;
        } finally {
            trava.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        FilaLimitada fila = new FilaLimitada(3);
        Thread produtor = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    fila.colocar(i);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        StringJoiner recebidos = new StringJoiner(" ");
        int[] soma = new int[1];
        Thread consumidor = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    int item = fila.retirar();
                    recebidos.add(String.valueOf(item));
                    soma[0] += item;
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        produtor.start();
        consumidor.start();
        produtor.join();
        consumidor.join();
        System.out.println("recebidos: " + recebidos);
        System.out.println("soma: " + soma[0]);
        System.out.println("dentro da capacidade: " + (fila.maiorTamanho() <= 3));
    }
}`,
    saida: 'recebidos: 1 2 3 4 5 6 7 8 9 10\nsoma: 55\ndentro da capacidade: true',
    comentarios:
      'O `await()` libera a trava enquanto espera e a readquire antes de voltar, por isso o produtor dormindo não impede o consumidor de retirar. Duas condições na mesma trava evitam acordar à toa: o produtor só é avisado quando abre espaço, e o consumidor, quando chega item. O `while` protege contra despertares espúrios, que a especificação permite. Esta é, em miniatura, a `ArrayBlockingQueue` do próximo episódio, que já vem pronta.',
  },
  exercicios: [
    {
      id: 'senior-t2-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) {
        Lock trava = new ReentrantLock();
        System.out.println("antes");
        trava.unlock();
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `IllegalMonitorStateException`',
        'Imprime `antes` e termina normalmente',
        'Não compila: `unlock` sem `lock`',
        'Imprime `antes` e trava para sempre',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalMonitorStateException', saida: 'antes' },
      explicacao: 'Só quem segura a trava pode liberá-la. O compilador não acompanha isso; o erro aparece em execução.',
    },
    {
      id: 'senior-t2-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.locks.ReentrantLock;

public class Teste {
    public static void main(String[] args) {
        ReentrantLock trava = new ReentrantLock();
        trava.lock();
        trava.lock();
        trava.unlock();
        System.out.println(trava.getHoldCount() + " " + trava.isLocked());
    }
}`,
      opcoes: ['`1 true`', '`0 false`', '`2 true`', '`1 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Foram dois `lock()` e um `unlock()`. A trava continua com a thread, com contagem 1.',
    },
    {
      id: 'senior-t2-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a forma recomendada de usar uma `ReentrantLock` chamada `trava`?',
      opcoes: [
        '`trava.lock(); try { trabalhar(); } finally { trava.unlock(); }`',
        '`trava.lock(); trabalhar(); trava.unlock();`',
        '`try { trabalhar(); } finally { trava.lock(); trava.unlock(); }`',
        '`synchronized (trava) { trabalhar(); }`',
      ],
      resposta: 0,
      explicacao: 'Sem `finally`, uma exceção em `trabalhar()` deixaria a trava presa para sempre. Usar `synchronized` sobre um objeto `Lock` funciona, mas usa o monitor do objeto, não a trava que ele representa.',
    },
    {
      id: 'senior-t2-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.locks.ReentrantLock;

public class Teste {
    public static void main(String[] args) {
        ReentrantLock trava = new ReentrantLock();
        trava.lock();
        System.out.println(trava.tryLock() + " " + trava.getHoldCount());
    }
}`,
      opcoes: ['`true 2`', '`false 1`', '`true 1`', 'O programa trava para sempre'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A trava é reentrante: a própria dona consegue adquiri-la de novo, e a contagem sobe para 2.',
    },
    {
      id: 'senior-t2-e03-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que uma `ReentrantLock` oferece que o `synchronized` não oferece? Escolha três.',
      opcoes: [
        'Tentar adquirir sem esperar, com `tryLock()`',
        'Desistir depois de um prazo, com `tryLock(tempo, unidade)`',
        'Ordem justa de chegada, com `new ReentrantLock(true)`',
        'Liberação automática ao sair do bloco',
        'Reentrância',
        'Garantia de visibilidade entre threads',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Os dois mecanismos são reentrantes e garantem visibilidade. A liberação automática é justamente o que o `synchronized` tem e a `Lock` não.',
    },
    {
      id: 'senior-t2-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o `finally` para liberar a trava. O programa deve imprimir `false`.',
      codigo: `import java.util.concurrent.locks.ReentrantLock;

public class Conta {
    public static void main(String[] args) {
        ReentrantLock trava = new ReentrantLock();
        trava.lock();
        try {
            int saldo = 100;
        } finally {
            trava.___();
        }
        System.out.println(trava.isLocked());
    }
}`,
      respostas: ['unlock'],
      saida: 'false',
      explicacao: 'Com um `lock()` e um `unlock()`, a trava volta a ficar livre.',
    },
    {
      id: 'senior-t2-e03-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) {
        ReadWriteLock rw = new ReentrantReadWriteLock();
        rw.readLock().lock();
        rw.readLock().unlock();
        rw.lock();
    }
}`,
      resposta: 8,
      explicacao: '`ReadWriteLock` não tem `lock()`. Ela só entrega as duas travas, por `readLock()` e `writeLock()`.',
    },
    {
      id: 'senior-t2-e03-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Teste {
    public static void main(String[] args) {
        ReentrantReadWriteLock rw = new ReentrantReadWriteLock();
        rw.readLock().lock();
        System.out.print(rw.writeLock().tryLock() + " ");
        rw.readLock().unlock();
        rw.writeLock().lock();
        System.out.println(rw.readLock().tryLock());
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Segurando a leitura, a thread não consegue a escrita: não há promoção. Segurando a escrita, consegue a leitura: é o rebaixamento.',
    },
    {
      id: 'senior-t2-e03-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.concurrent.locks.*;

public class Teste {
    private static final Lock trava = new ReentrantLock();
    private static int total;

    public static void main(String[] args) throws InterruptedException {
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            threads.add(new Thread(() -> {
                for (int j = 0; j < 5000; j++) {
                    trava.lock();
                    try {
                        total++;
                    } finally {
                        trava.unlock();
                    }
                }
            }));
        }
        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
        System.out.println(total);
    }
}`,
      resposta: '20000',
      explicacao: 'Todas as threads usam a mesma trava, e o incremento fica protegido. Quatro threads de 5000 dão 20000.',
    },
    {
      id: 'senior-t2-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) {
        Lock trava = new ReentrantLock();
        if (trava.tryLock()) {
            trava.unlock();
        }
        if (trava.tryLock(100, TimeUnit.MILLISECONDS)) {
            trava.unlock();
        }
    }
}`,
      opcoes: [
        'Não compila: `tryLock` com prazo lança `InterruptedException`, que não é tratada',
        'Compila sem erros',
        'Não compila: `tryLock()` sem argumentos não existe',
        'Não compila: `tryLock` devolve `void`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 10 },
      explicacao: 'A versão com prazo pode ser interrompida enquanto espera, e por isso declara `InterruptedException`. A versão sem argumentos não espera e não lança.',
    },
    {
      id: 'senior-t2-e03-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Lock trava = new ReentrantLock();
        Thread.currentThread().interrupt();
        trava.lock();
        System.out.println("lock comum: conseguiu");
        trava.unlock();
        trava.lockInterruptibly();
        System.out.println("lockInterruptibly: conseguiu");
    }
}`,
      opcoes: [
        'Imprime `lock comum: conseguiu` e lança `InterruptedException`',
        'Imprime as duas linhas',
        'Lança `InterruptedException` sem imprimir nada',
        'Imprime as duas linhas e lança `InterruptedException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'InterruptedException', saida: 'lock comum: conseguiu' },
      explicacao: 'O `lock()` comum ignora a marca de interrupção. O `lockInterruptibly()` a verifica logo na entrada e lança a exceção, mesmo com a trava livre.',
    },
    {
      id: 'senior-t2-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.concurrent.locks.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Lock trava = new ReentrantLock();
        Condition pronto = trava.newCondition();
        System.out.println("antes");
        pronto.await();
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `IllegalMonitorStateException`',
        'Imprime `antes` e espera para sempre',
        'Não compila: `await` precisa de um prazo',
        'Imprime `antes` e termina',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalMonitorStateException', saida: 'antes' },
      explicacao: '`await()` libera a trava enquanto espera, por isso exige segurá-la. É a mesma regra do `wait()` com `synchronized`.',
    },
    {
      id: 'senior-t2-e03-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sobre `ReentrantReadWriteLock`, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Várias threads podem segurar a trava de leitura ao mesmo tempo',
        'A trava de escrita só é concedida quando ninguém está lendo nem escrevendo',
        'Uma thread que segura a leitura pode adquirir a escrita sem soltá-la',
        'Leituras e escritas usam a mesma trava, sem distinção',
        'A trava de leitura não é reentrante',
      ],
      respostas: [0, 1],
      explicacao: 'Leitura compartilhada, escrita exclusiva. A promoção de leitura para escrita não existe, e as duas travas são reentrantes.',
    },
    {
      id: 'senior-t2-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que muda ao criar a trava com `new ReentrantLock(true)`?',
      opcoes: [
        'Ela passa a dar a vez à thread que espera há mais tempo, com menos vazão',
        'Ela deixa de ser reentrante',
        'Ela passa a liberar a trava automaticamente',
        'Ela permite várias threads ao mesmo tempo',
      ],
      resposta: 0,
      explicacao: 'O argumento é a justiça (*fairness*). Sem ela, uma thread recém-chegada pode passar na frente de quem já esperava, o que rende mais mas pode atrasar alguém indefinidamente.',
    },
    {
      id: 'senior-t2-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um método faz `if (trava.tryLock()) { try { atualizar(); } finally { trava.unlock(); } }`. Qual é o comportamento quando outra thread segura a trava?',
      opcoes: [
        'O método retorna sem chamar `atualizar()` e sem esperar',
        'O método espera a trava ficar livre e então atualiza',
        'O `unlock()` do `finally` lança `IllegalMonitorStateException`',
        'O método lança `InterruptedException`',
      ],
      resposta: 0,
      explicacao: '`tryLock()` devolve `false` na hora, o `if` não entra, e o `finally` nem chega a rodar. É o jeito de pular um trabalho opcional quando o recurso está ocupado.',
    },
  ],
};

export default episodio;
