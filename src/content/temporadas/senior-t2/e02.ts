import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t2-e02',
  minutos: 15,
  aula,
  armadilhas: [
    '`volatile` garante visibilidade, não atomicidade: `x++` num campo `volatile` ainda perde incrementos.',
    '`volatile` só marca campos; numa variável local não compila, e com `final` também não.',
    '`incrementAndGet()` devolve o valor novo; `getAndIncrement()`, o antigo, como `++x` e `x++`.',
    '`compareAndSet` devolve `boolean`, não o valor, e só grava se o valor atual for o esperado.',
    'Em `AtomicReference`, `compareAndSet` compara com `==`, não com `equals`.',
    'Objetos atômicos não aceitam operadores: `n++` com `n` do tipo `AtomicInteger` não compila.',
    '`LongAdder.sum()` não é um retrato exato enquanto outras threads somam; para ids, use `AtomicLong`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Atomic Access',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html',
      tipo: 'documentacao',
      porque: 'Quais leituras e escritas são atômicas por natureza e o que `volatile` acrescenta.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Atomic Variables',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/atomicvars.html',
      tipo: 'documentacao',
      porque: 'Um contador reescrito com `AtomicInteger`, sem `synchronized`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc do pacote java.util.concurrent.atomic',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/package-summary.html',
      tipo: 'documentacao',
      porque: 'Todas as classes atômicas, incluindo `LongAdder` e as versões para arrays.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.3.1.4: volatile Fields',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.3.1.4',
      tipo: 'documentacao',
      porque: 'O que a especificação garante para um campo `volatile` e por que não combina com `final`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 17.4.5: Happens-before Order',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4.5',
      tipo: 'documentacao',
      porque: 'A relação formal que define quando uma escrita fica visível para outra thread.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to the Volatile Keyword in Java',
      url: 'https://www.baeldung.com/java-volatile',
      tipo: 'artigo',
      porque: 'Caches, reordenação e as garantias de `volatile`, com o exemplo da bandeira de parada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: An Introduction to Atomic Variables in Java',
      url: 'https://www.baeldung.com/java-atomic-variables',
      tipo: 'artigo',
      porque: 'Do contador com trava ao contador com CAS, e os métodos das classes atômicas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java Volatile Keyword',
      url: 'https://jenkov.com/tutorials/java-concurrency/volatile.html',
      tipo: 'artigo',
      porque: 'A garantia de visibilidade "total" de `volatile`, que arrasta as escritas anteriores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Compare and Swap',
      url: 'https://jenkov.com/tutorials/java-concurrency/compare-and-swap.html',
      tipo: 'artigo',
      porque: 'Como o CAS funciona e por que dispensa travas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: Concorrência pt 01, AtomicInteger',
      url: 'https://www.youtube.com/watch?v=eafDSpZMBbE',
      tipo: 'video',
      porque: 'Um contador compartilhado corrigido com `AtomicInteger`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Volatile Keyword in Java Tutorial',
      url: 'https://www.youtube.com/watch?v=yg_UPwSD3-U',
      tipo: 'video',
      porque: 'Um programa que não termina sem `volatile` e termina com ele.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'Quando `volatile` basta e quando não, e como as classes atômicas funcionam sem trava.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Sharing Objects": seção 3.1.4, "Volatile variables"; Cap. 15, "Atomic Variables and Nonblocking Synchronization"',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'A bandeira de parada que nunca para e o gerador de números de série corrigido com `AtomicLong`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Concurrency": Item 78, "Synchronize access to shared mutable data"',
    },
  ],
  desafio: {
    titulo: 'Caixa registradora',
    enunciado:
      'Quatro caixas registram pedidos ao mesmo tempo. Escreva `static long registrar(long valor)`, que dá a cada pedido um id sequencial a partir de 1, soma o valor ao faturamento total e guarda o maior valor visto, sem usar `synchronized`. O caixa `c` (de 0 a 3) registra os pedidos de valor `c * 1000 + i`, para `i` de 1 a 1000, e marca o id recebido num `boolean[] usados` de 4001 posições. No fim, imprima quantos ids distintos foram usados, o próximo id, o total e o maior pedido. A saída deve ser:\n\n```text\nids distintos: 4000\npróximo id: 4001\ntotal: 8002000\nmaior pedido: 4000\n```',
    dicas: [
      '`AtomicLong.getAndIncrement()` entrega cada id a uma única thread.',
      'Para o total, muitas threads só somam: `LongAdder` é a escolha natural.',
      '`accumulateAndGet(valor, Math::max)` atualiza o maior de forma atômica.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.LongAdder;

public class Pedidos {
    private static final AtomicLong proximoId = new AtomicLong(1);
    private static final LongAdder total = new LongAdder();
    private static final AtomicLong maior = new AtomicLong();

    static long registrar(long valor) {
        long id = proximoId.getAndIncrement();
        total.add(valor);
        maior.accumulateAndGet(valor, Math::max);
        return id;
    }

    public static void main(String[] args) throws InterruptedException {
        boolean[] usados = new boolean[4001];
        List<Thread> caixas = new ArrayList<>();
        for (int c = 0; c < 4; c++) {
            int caixa = c;
            caixas.add(new Thread(() -> {
                for (int i = 1; i <= 1000; i++) {
                    long id = registrar(caixa * 1000 + i);
                    usados[(int) id] = true;
                }
            }));
        }
        for (Thread t : caixas) {
            t.start();
        }
        for (Thread t : caixas) {
            t.join();
        }
        int distintos = 0;
        for (boolean usado : usados) {
            if (usado) {
                distintos++;
            }
        }
        System.out.println("ids distintos: " + distintos);
        System.out.println("próximo id: " + proximoId.get());
        System.out.println("total: " + total.sum());
        System.out.println("maior pedido: " + maior.get());
    }
}`,
    saida: 'ids distintos: 4000\npróximo id: 4001\ntotal: 8002000\nmaior pedido: 4000',
    comentarios:
      'Cada campo usa a ferramenta certa para o seu acesso. Os ids precisam do valor exato de cada incremento, e o `getAndIncrement` garante que nenhum se repete. O total só é lido no fim, então o `LongAdder` pode espalhar as somas entre as threads. O maior valor é um "ler, comparar e gravar" que vira uma única operação atômica com `accumulateAndGet`. Como cada id vai para uma posição diferente de `usados`, o array não precisa de trava, e o `join` publica as escritas para o `main`.',
  },
  exercicios: [
    {
      id: 'senior-t2-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) {
        AtomicInteger n = new AtomicInteger(5);
        System.out.println(n.getAndIncrement() + " " + n.incrementAndGet() + " " + n.get());
    }
}`,
      opcoes: ['`5 7 7`', '`6 7 7`', '`5 6 7`', '`6 8 8`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`getAndIncrement` devolve 5 e deixa 6; `incrementAndGet` vai para 7 e devolve 7.',
    },
    {
      id: 'senior-t2-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) {
        AtomicInteger n = new AtomicInteger(1);
        System.out.println(n.compareAndSet(1, 2) + " " + n.compareAndSet(1, 3) + " " + n.get());
    }
}`,
      opcoes: ['`true false 2`', '`true true 3`', '`2 2 2`', '`false false 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O primeiro grava 2, porque o valor era 1. O segundo espera 1, encontra 2 e não grava nada.',
    },
    {
      id: 'senior-t2-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) {
        AtomicInteger n = new AtomicInteger(3);
        System.out.println(n.updateAndGet(x -> x * 10) + " " + n.getAndUpdate(x -> x + 1) + " " + n.accumulateAndGet(4, Integer::sum));
    }
}`,
      resposta: '30 30 35',
      explicacao: '`updateAndGet` leva a 30 e devolve 30. `getAndUpdate` devolve 30 e deixa 31. `accumulateAndGet` soma 4 e devolve 35.',
    },
    {
      id: 'senior-t2-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Duas threads executam `contador++` mil vezes cada, num campo declarado `private volatile int contador`. Qual é o valor final?',
      opcoes: [
        'Pode ser menor que 2000: `volatile` não torna o incremento atômico',
        'Sempre 2000: `volatile` impede a condição de corrida',
        'Sempre 1000: cada thread só enxerga o próprio incremento',
        'Não compila: `volatile` não aceita `++`',
      ],
      resposta: 0,
      explicacao: 'Cada leitura e cada escrita enxergam a memória, mas outra thread ainda pode agir entre a leitura e a escrita do incremento.',
    },
    {
      id: 'senior-t2-e02-q05',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que soma 1 e devolve o valor novo. O programa deve imprimir `1`.',
      codigo: `import java.util.concurrent.atomic.AtomicInteger;

public class Visitas {
    public static void main(String[] args) {
        AtomicInteger contador = new AtomicInteger();
        System.out.println(contador.___());
    }
}`,
      respostas: ['incrementAndGet'],
      saida: '1',
      explicacao: '`getAndIncrement` também soma 1, mas devolveria o valor antigo, 0.',
    },
    {
      id: 'senior-t2-e02-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Config {
    private volatile boolean ativo;
    private final volatile int limite = 10;
    private volatile String nome = "padrão";

    void ativar() {
        ativo = true;
    }
}`,
      resposta: 3,
      explicacao: '`final` e `volatile` não se combinam: um campo `final` não muda depois da construção, e não há escrita para tornar visível.',
    },
    {
      id: 'senior-t2-e02-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.atomic.AtomicInteger;

public class Teste {
    public static void main(String[] args) {
        AtomicInteger n = new AtomicInteger();
        n++;
        System.out.println(n);
    }
}`,
      opcoes: [
        'Não compila: `++` não se aplica a `AtomicInteger`',
        'Compila e imprime `1`',
        'Compila e imprime `0`',
        'Compila, mas lança `UnsupportedOperationException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Não há unboxing para classes atômicas. O incremento é `n.incrementAndGet()` ou `n.getAndIncrement()`.',
    },
    {
      id: 'senior-t2-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.atomic.AtomicReference;

public class Teste {
    public static void main(String[] args) {
        AtomicReference<String> r = new AtomicReference<>(new String("a"));
        System.out.println(r.compareAndSet("a", "b") + " " + r.get());
    }
}`,
      opcoes: ['`false a`', '`true b`', '`true a`', '`false b`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`compareAndSet` compara com `==`. O valor guardado é um objeto `String` novo, diferente do literal `"a"`, mesmo com o mesmo conteúdo.',
    },
    {
      id: 'senior-t2-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.atomic.AtomicBoolean;

public class Teste {
    public static void main(String[] args) {
        AtomicBoolean iniciado = new AtomicBoolean();
        for (int i = 0; i < 3; i++) {
            if (iniciado.compareAndSet(false, true)) {
                System.out.print("iniciou ");
            }
        }
        System.out.println(iniciado.get());
    }
}`,
      opcoes: ['`iniciou true`', '`iniciou iniciou iniciou true`', '`true`', '`iniciou false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Só a primeira chamada encontra `false` e consegue trocar. É o padrão para garantir que algo rode uma única vez, mesmo com várias threads.',
    },
    {
      id: 'senior-t2-e02-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.concurrent.atomic.LongAdder;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        LongAdder soma = new LongAdder();
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            threads.add(new Thread(() -> {
                for (int j = 0; j < 25_000; j++) {
                    soma.increment();
                }
            }));
        }
        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
        System.out.println(soma.sum());
    }
}`,
      resposta: '100000',
      explicacao: 'O `LongAdder` não perde incrementos. Depois dos `join`, ninguém mais soma, e `sum()` devolve o total exato.',
    },
    {
      id: 'senior-t2-e02-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `volatile` são verdadeiras? Escolha duas.',
      opcoes: [
        'Toda leitura do campo enxerga a última escrita feita por qualquer thread',
        'O que uma thread gravou antes de escrever no campo fica visível para quem o ler depois',
        'Torna `x++` atômico',
        'Pode marcar variáveis locais',
        'Pode ser combinado com `final`',
      ],
      respostas: [0, 1],
      explicacao: '`volatile` dá visibilidade e ordem. Não dá atomicidade, e só se aplica a campos não `final`.',
    },
    {
      id: 'senior-t2-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No método abaixo, o que acontece se outra thread mudar `n` entre o `get()` e o `compareAndSet`?',
      codigo: `static int dobrar(AtomicInteger n) {
    while (true) {
        int atual = n.get();
        int novo = atual * 2;
        if (n.compareAndSet(atual, novo)) {
            return novo;
        }
    }
}`,
      opcoes: [
        'O `compareAndSet` devolve `false`, e o laço tenta de novo com o valor atualizado',
        'O `compareAndSet` lança `ConcurrentModificationException`',
        'O valor da outra thread é sobrescrito',
        'A thread fica bloqueada até a outra terminar',
      ],
      resposta: 0,
      explicacao: 'É o laço CAS, a base das operações sem trava: ninguém bloqueia, e quem perde a disputa simplesmente recalcula. `updateAndGet` faz exatamente isso por dentro.',
    },
    {
      id: 'senior-t2-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma thread de interface fica num laço `while (!cancelado)`, e outra thread grava `cancelado = true`. Qual declaração garante que o laço perceba a mudança?',
      opcoes: [
        '`private volatile boolean cancelado;`',
        '`private boolean cancelado;`',
        '`private static boolean cancelado;`',
        '`private final boolean cancelado = false;`',
      ],
      resposta: 0,
      explicacao: 'Sem `volatile` nem trava, o JIT pode ler o campo uma única vez e o laço nunca termina. `static` não muda a visibilidade, e um campo `final` nem poderia ser alterado.',
    },
    {
      id: 'senior-t2-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.atomic.AtomicLong;

public class Teste {
    public static void main(String[] args) {
        AtomicLong id = new AtomicLong(100);
        long a = id.getAndIncrement();
        long b = id.getAndAdd(10);
        System.out.println(a + " " + b + " " + id.get());
    }
}`,
      opcoes: ['`100 101 111`', '`101 111 111`', '`100 110 111`', '`100 101 101`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os dois métodos devolvem o valor de antes da operação: 100 e depois 101. Ao final, o valor é 101 + 10.',
    },
    {
      id: 'senior-t2-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um serviço com 64 threads conta requisições para um painel de métricas, que lê o total a cada minuto. Qual classe é a mais indicada para o contador?',
      opcoes: ['`LongAdder`', '`AtomicBoolean`', 'Um `long` com `volatile`', 'Um `Long` com `synchronized` na leitura'],
      resposta: 0,
      explicacao: 'Com muitas threads somando e leituras raras, o `LongAdder` evita a disputa por uma única posição de memória. Um `volatile long` perderia incrementos.',
    },
  ],
};

export default episodio;
