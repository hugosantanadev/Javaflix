import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t2-e01',
  minutos: 16,
  aula,
  armadilhas: [
    '`x++` não é atômico: são três passos (ler, somar, gravar) que outra thread pode intercalar.',
    'Um método `synchronized` de instância trava `this`; um `static synchronized` trava o objeto `Class`. Os dois não se excluem.',
    'Blocos sincronizados em objetos diferentes não se excluem.',
    '`synchronized (n)` com `n` primitivo não compila; com referência `null`, lança `NullPointerException`.',
    'Construtores e métodos abstratos não podem ser `synchronized`.',
    'Travas são reentrantes: um método sincronizado pode chamar outro do mesmo objeto sem travar.',
    '`wait`, `notify` e `notifyAll` fora de um bloco sincronizado no mesmo objeto lançam `IllegalMonitorStateException`.',
    'Ler um dado compartilhado sem sincronizar pode devolver um valor antigo: `synchronized` também garante visibilidade.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Thread Interference',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/interfere.html',
      tipo: 'documentacao',
      porque: 'O `c++` decomposto em passos e como duas threads os intercalam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Memory Consistency Errors',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/memconsist.html',
      tipo: 'documentacao',
      porque: 'Por que uma thread pode não enxergar o que outra gravou, e a relação *happens-before*.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Intrinsic Locks and Synchronization',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html',
      tipo: 'documentacao',
      porque: 'Métodos e blocos sincronizados, travas de métodos estáticos e reentrância.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 17.1: Synchronization',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.1',
      tipo: 'documentacao',
      porque: 'A definição de monitores na especificação, e o que acontece ao travar e destravar.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 8.4.3.6: synchronized Methods',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.3.6',
      tipo: 'documentacao',
      porque: 'Qual trava cada tipo de método usa, nas palavras da especificação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to the Synchronized Keyword in Java',
      url: 'https://www.baeldung.com/java-synchronized',
      tipo: 'artigo',
      porque: 'Métodos, métodos estáticos e blocos sincronizados, com testes que mostram a corrida.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: wait and notify() Methods in Java',
      url: 'https://www.baeldung.com/java-wait-notify',
      tipo: 'artigo',
      porque: 'Esperar uma condição com `wait` e acordar com `notify`, num exemplo de produtor e consumidor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Race Conditions and Critical Sections',
      url: 'https://jenkov.com/tutorials/java-concurrency/race-conditions-and-critical-sections.html',
      tipo: 'artigo',
      porque: 'Os padrões "ler, modificar, gravar" e "verificar e agir", com diagramas da intercalação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Threads pt 05, Sincronismo de thread pt 01',
      url: 'https://www.youtube.com/watch?v=WKx6tEM8LEU',
      tipo: 'video',
      porque: 'A condição de corrida acontecendo ao vivo e a correção com `synchronized`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Threads pt 06, Sincronismo de thread pt 02',
      url: 'https://www.youtube.com/watch?v=LVIZJWoHnjs',
      tipo: 'video',
      porque: 'Blocos sincronizados e a escolha do objeto de trava, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Threads pt 09, Sincronismo de thread pt 05, Wait, notify e notifyAll',
      url: 'https://www.youtube.com/watch?v=A4zRkIydFjE',
      tipo: 'video',
      porque: 'Threads que esperam uma condição e se avisam, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'A definição de thread safety, atomicidade e travas, que todo o resto do livro usa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Thread Safety": seções 2.2, "Atomicity", e 2.3, "Locking"; Cap. 3, "Sharing Objects", seção 3.1, "Visibility"',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que até a leitura de um campo compartilhado precisa de sincronização.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Concurrency": Item 78, "Synchronize access to shared mutable data"',
    },
  ],
  desafio: {
    titulo: 'Bilheteria',
    enunciado:
      'Uma sala de cinema tem 50 lugares, e 4 caixas vendem ao mesmo tempo, cada um tentando vender os lugares de 0 a 49, nessa ordem. Escreva a classe `Bilheteria` com `boolean reservar(int lugar)`, que reserva um lugar livre e devolve `true`, ou devolve `false` se ele já estiver ocupado, e `int vendidos()`. Cada caixa é uma thread que conta as próprias recusas num `int[] recusas`, na sua posição. No fim, imprima o total de vendidos e de recusas. Nenhum lugar pode ser vendido duas vezes, em nenhuma execução. A saída deve ser:\n\n```text\nvendidos: 50\nrecusas: 150\n```',
    dicas: [
      '`reservar` é um "verificar e depois agir": a verificação e a marcação precisam acontecer sob a mesma trava.',
      'Cada caixa escreve só na sua posição de `recusas`, e o `join` torna essas escritas visíveis ao `main`.',
      'Torne `vendidos()` sincronizado também, para ler o valor mais recente.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Bilheteria {
    private final boolean[] ocupados;
    private int vendidos;

    Bilheteria(int lugares) {
        ocupados = new boolean[lugares];
    }

    synchronized boolean reservar(int lugar) {
        if (ocupados[lugar]) {
            return false;
        }
        ocupados[lugar] = true;
        vendidos++;
        return true;
    }

    synchronized int vendidos() {
        return vendidos;
    }

    public static void main(String[] args) throws InterruptedException {
        Bilheteria sala = new Bilheteria(50);
        int[] recusas = new int[4];
        List<Thread> caixas = new ArrayList<>();
        for (int c = 0; c < 4; c++) {
            int caixa = c;
            caixas.add(new Thread(() -> {
                for (int lugar = 0; lugar < 50; lugar++) {
                    if (!sala.reservar(lugar)) {
                        recusas[caixa]++;
                    }
                }
            }));
        }
        for (Thread t : caixas) {
            t.start();
        }
        for (Thread t : caixas) {
            t.join();
        }
        int totalRecusas = 0;
        for (int r : recusas) {
            totalRecusas += r;
        }
        System.out.println("vendidos: " + sala.vendidos());
        System.out.println("recusas: " + totalRecusas);
    }
}`,
    saida: 'vendidos: 50\nrecusas: 150',
    comentarios:
      'Quantas vendas cada caixa faz muda de uma execução para outra, mas os totais não: 200 tentativas, 50 vendas e 150 recusas. Sem `synchronized` em `reservar`, dois caixas poderiam ver o mesmo lugar livre e vendê-lo duas vezes, e `vendidos` passaria de 50. O array `recusas` não precisa de trava porque cada posição tem um único dono, e o `join` garante que o `main` enxergue o que cada caixa gravou.',
  },
  exercicios: [
    {
      id: 'senior-t2-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que `contador++` executado por duas threads ao mesmo tempo pode perder incrementos?',
      opcoes: [
        'Porque são três passos (ler, somar e gravar), e outra thread pode agir entre eles',
        'Porque o operador `++` não funciona em campos estáticos',
        'Porque a JVM ignora incrementos repetidos',
        'Porque o `int` estoura quando duas threads o usam',
      ],
      resposta: 0,
      explicacao: 'Se as duas leem o mesmo valor antes de qualquer uma gravar, as duas gravam o mesmo resultado, e um incremento some.',
    },
    {
      id: 'senior-t2-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    int n = 0;

    void somar() {
        synchronized (n) {
            n++;
        }
    }
}`,
      opcoes: [
        'Não compila: `synchronized` exige uma referência, não um primitivo',
        'Compila; o `int` é convertido em `Integer` para a trava',
        'Compila, mas lança `IllegalMonitorStateException`',
        'Não compila: `synchronized` só pode marcar métodos',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Só objetos têm trava. Não há autoboxing na expressão de um bloco sincronizado.',
    },
    {
      id: 'senior-t2-e01-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    private int total;

    synchronized void somar(int n) {
        total += n;
    }

    public static void main(String[] args) throws InterruptedException {
        Teste t = new Teste();
        List<Thread> threads = new ArrayList<>();
        for (int i = 1; i <= 4; i++) {
            threads.add(new Thread(() -> {
                for (int j = 0; j < 10_000; j++) {
                    t.somar(1);
                }
            }));
        }
        for (Thread th : threads) {
            th.start();
        }
        for (Thread th : threads) {
            th.join();
        }
        synchronized (t) {
            System.out.println(t.total);
        }
    }
}`,
      resposta: '40000',
      explicacao: 'O método sincronizado trava o objeto `t`, e as quatro threads o disputam. A leitura final também usa a trava de `t`, embora o `join` já bastasse para a visibilidade.',
    },
    {
      id: 'senior-t2-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Na classe `Conta`, quais afirmações são verdadeiras? Escolha duas.',
      codigo: `public class Conta {
    private static int contas;
    private int saldo;

    synchronized void depositar(int valor) {
        saldo += valor;
    }

    static synchronized void abrir() {
        contas++;
    }
}`,
      opcoes: [
        '`depositar` usa a trava do objeto `Conta` em que é chamado',
        '`abrir` usa a trava do objeto `Conta.class`',
        '`depositar` e `abrir` usam a mesma trava',
        'Dois objetos `Conta` diferentes não podem executar `depositar` ao mesmo tempo',
        '`abrir` usa a trava de um objeto `Conta` escolhido pela JVM',
      ],
      respostas: [0, 1],
      explicacao: 'Cada objeto tem sua trava, e cada classe também tem a sua, no objeto `Class`. Depósitos em contas diferentes correm em paralelo.',
    },
    {
      id: 'senior-t2-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    synchronized void a() {
        System.out.print("a ");
        b();
    }

    synchronized void b() {
        System.out.println("b " + Thread.holdsLock(this));
    }

    public static void main(String[] args) {
        new Teste().a();
    }
}`,
      opcoes: ['`a b true`', '`a` e o programa trava para sempre', '`a b false`', 'Lança `IllegalMonitorStateException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As travas do Java são reentrantes: a thread que já segura a trava de `this` entra em `b()` sem esperar.',
    },
    {
      id: 'senior-t2-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o bloco para sincronizar na trava do próprio objeto. O programa deve imprimir `1`.',
      codigo: `public class Contador {
    private int valor;

    void incrementar() {
        synchronized (___) {
            valor++;
        }
    }

    public static void main(String[] args) {
        Contador c = new Contador();
        c.incrementar();
        System.out.println(c.valor);
    }
}`,
      respostas: ['this'],
      saida: '1',
      explicacao: 'Um bloco `synchronized (this)` que envolve o método inteiro equivale a declarar o método como `synchronized`.',
    },
    {
      id: 'senior-t2-e01-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Fila {
    private final Object trava = new Object();
    private int tamanho;

    synchronized Fila() {
        tamanho = 0;
    }

    void adicionar() {
        synchronized (trava) {
            tamanho++;
        }
    }
}`,
      resposta: 5,
      explicacao: 'Construtores não podem ser `synchronized`: enquanto o objeto é construído, nenhuma outra thread tem referência a ele.',
    },
    {
      id: 'senior-t2-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    static Object trava;

    public static void main(String[] args) {
        System.out.println("antes");
        synchronized (trava) {
            System.out.println("dentro");
        }
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `NullPointerException`',
        'Imprime `antes` e `dentro`',
        'Não compila: `trava` não foi inicializada',
        'Imprime `antes` e lança `IllegalMonitorStateException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'antes' },
      explicacao: 'Campos estáticos começam com `null`, e o compilador não reclama. Ao entrar no bloco, não há objeto cuja trava adquirir.',
    },
    {
      id: 'senior-t2-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Object trava = new Object();
        System.out.println("vai esperar");
        trava.wait(100);
        System.out.println("acordou");
    }
}`,
      opcoes: [
        'Imprime `vai esperar` e lança `IllegalMonitorStateException`',
        'Imprime `vai esperar` e, 100 ms depois, `acordou`',
        'Não compila: `wait` precisa estar num método `synchronized`',
        'Imprime `vai esperar` e espera para sempre',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalMonitorStateException', saida: 'vai esperar' },
      explicacao: '`wait` libera a trava do objeto enquanto espera, e por isso exige que a thread a segure. A regra é verificada em execução, não pelo compilador.',
    },
    {
      id: 'senior-t2-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Object a = new Object();
        Object b = new Object();
        synchronized (a) {
            System.out.println(Thread.holdsLock(a) + " " + Thread.holdsLock(b));
        }
        System.out.println(Thread.holdsLock(a));
    }
}`,
      opcoes: ['`true false` e `false`', '`true true` e `false`', '`true false` e `true`', '`false false` e `false`'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true false\nfalse' },
      explicacao: 'Dentro do bloco, a thread segura só a trava de `a`. Ao sair, a trava é liberada.',
    },
    {
      id: 'senior-t2-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Duas threads chamam `adicionarSeAusente(1)` ao mesmo tempo, num objeto cuja `lista` é `Collections.synchronizedList(new ArrayList<>())`. O que pode acontecer?',
      codigo: `void adicionarSeAusente(Integer x) {
    if (!lista.contains(x)) {
        lista.add(x);
    }
}`,
      opcoes: [
        'O `1` pode ser adicionado duas vezes',
        'Nada de errado: a lista sincronizada torna o método seguro',
        'Lança `ConcurrentModificationException` sempre',
        'O método trava para sempre',
      ],
      resposta: 0,
      explicacao: 'Cada chamada à lista é atômica, mas o par "verificar e depois agir" não é. As duas threads podem passar pelo `contains` antes de qualquer `add`. A correção é envolver os dois passos num `synchronized (lista)`.',
    },
    {
      id: 'senior-t2-e01-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações não compilam? Escolha duas.',
      opcoes: [
        '`abstract synchronized void m();` numa classe abstrata',
        '`synchronized Pedido() { }` como construtor de `Pedido`',
        '`static synchronized void m() { }`',
        '`private synchronized int m() { return 0; }`',
        '`final synchronized void m() { }`',
      ],
      respostas: [0, 1],
      explicacao: 'Um método abstrato não tem corpo para proteger, e um construtor não pode ser sincronizado. As outras combinações são válidas.',
    },
    {
      id: 'senior-t2-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Além de impedir que duas threads executem a seção crítica ao mesmo tempo, o que mais `synchronized` garante?',
      opcoes: [
        'Que o que uma thread gravou antes de liberar a trava fica visível para quem adquire a mesma trava depois',
        'Que as threads executam na ordem em que foram iniciadas',
        'Que a seção crítica nunca lança exceção',
        'Que a thread com maior prioridade adquire a trava primeiro',
      ],
      resposta: 0,
      explicacao: 'É a garantia de visibilidade do modelo de memória. Sem ela, uma thread poderia ler um valor antigo, guardado no cache de outro núcleo.',
    },
    {
      id: 'senior-t2-e01-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static synchronized void estatico() {
        System.out.print(Thread.holdsLock(Teste.class) + " ");
    }

    synchronized void instancia() {
        System.out.println(Thread.holdsLock(this) + " " + Thread.holdsLock(Teste.class));
    }

    public static void main(String[] args) {
        estatico();
        new Teste().instancia();
    }
}`,
      opcoes: ['`true true false`', '`true true true`', '`false true false`', '`true false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O método estático segura a trava de `Teste.class`. O de instância segura só a de `this`, e as duas travas são independentes.',
    },
    {
      id: 'senior-t2-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma classe guarda seu estado em campos privados e sincroniza todos os métodos com `synchronized (this)`. Por que costuma ser melhor sincronizar num campo `private final Object trava = new Object()`?',
      opcoes: [
        'Porque código externo também pode sincronizar no objeto e interferir nas travas da classe',
        'Porque `synchronized (this)` não garante visibilidade',
        'Porque `this` não pode ser usado num bloco sincronizado',
        'Porque um objeto `Object` tem uma trava mais rápida',
      ],
      resposta: 0,
      explicacao: 'Qualquer um que tenha a referência pode fazer `synchronized (objeto)` e segurar a trava por tempo indeterminado. Uma trava privada fica sob controle exclusivo da classe.',
    },
  ],
};

export default episodio;
