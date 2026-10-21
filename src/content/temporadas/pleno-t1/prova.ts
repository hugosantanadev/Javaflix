import type { Exercicio } from '../../types';

/** Prova da temporada Pleno T1: exceções. */
const prova: Exercicio[] = [
  {
    id: 'pleno-t1-prova-q01',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static String f(int n) {
        StringBuilder sb = new StringBuilder();
        try {
            sb.append("t");
            if (n == 0) throw new IllegalArgumentException();
            sb.append("u");
            return sb.toString();
        } catch (IllegalArgumentException e) {
            sb.append("c");
            return sb.toString();
        } finally {
            sb.append("f");
        }
    }

    public static void main(String[] args) {
        System.out.println(f(1) + " " + f(0));
    }
}`,
    opcoes: ['`tu tc`', '`tuf tcf`', '`tu tcf`', '`tuf tc`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `return` calcula `sb.toString()` antes do `finally`, e a `String` resultante não muda depois. O "f" acrescentado ao `StringBuilder` não aparece no valor já devolvido.',
  },
  {
    id: 'pleno-t1-prova-q02',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais trechos compilam? Escolha três.',
    opcoes: [
      '`try { throw new java.io.IOException(); } catch (java.io.IOException | IllegalStateException e) { }`',
      '`try { Integer.parseInt("1"); } catch (NumberFormatException e) { } finally { }`',
      '`try { } catch (Exception e) { }`',
      '`try { } catch (java.io.IOException e) { }`',
      '`try { } finally { } catch (RuntimeException e) { }`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Um `catch` de `Exception` sempre é aceito, porque cobre as unchecked. Já uma checked que o `try` vazio nunca lança, como `IOException`, não. E o `finally` vem sempre por último.',
  },
  {
    id: 'pleno-t1-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class T {
    public static void main(String[] args) {
        try {
            Object o = null;
            o.hashCode();
        } catch (Exception e) {
            System.out.println("geral");
        } catch (NullPointerException e) {
            System.out.println("nulo");
        }
    }
}`,
    opcoes: [
      'Não compila: o `catch` de `NullPointerException` é inalcançável',
      'Compila e imprime `geral`',
      'Compila e imprime `nulo`',
      'Compila e imprime `geral` e `nulo`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 8 },
    explicacao: 'O `catch` de `Exception` já pegaria toda `NullPointerException`. Os `catch` vão do mais específico ao mais geral.',
  },
  {
    id: 'pleno-t1-prova-q04',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static class R implements AutoCloseable {
        public void close() throws Exception { throw new Exception("close"); }
    }

    public static void main(String[] args) {
        try (R r = new R()) {
            throw new IllegalStateException("corpo");
        } catch (Exception e) {
            System.out.println(e.getMessage() + " " + e.getSuppressed()[0].getMessage());
        }
    }
}`,
    opcoes: ['`corpo close`', '`close corpo`', '`close`', 'Lança `ArrayIndexOutOfBoundsException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A exceção do corpo é a principal, e a do `close()` fica anexada como suprimida. O `catch (Exception e)` cobre a `Exception` que o fechamento pode lançar.',
  },
  {
    id: 'pleno-t1-prova-q05',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `public class Conta {
    static class SaldoException extends Exception {
        SaldoException() { super("saldo"); }
    }

    private double saldo;

    void sacar(double v) {
        if (v > saldo) throw new SaldoException();
        saldo -= v;
    }
}`,
    resposta: 9,
    explicacao: '`SaldoException` estende `Exception`, então é checked. `sacar` precisaria declarar `throws SaldoException`.',
  },
  {
    id: 'pleno-t1-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    public static void main(String[] args) {
        try {
            try {
                throw new RuntimeException("A");
            } catch (RuntimeException e) {
                throw new RuntimeException("B");
            } finally {
                System.out.print("F ");
            }
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    opcoes: ['`F B`', '`F A`', '`B F`', '`F A B`', 'Lança `RuntimeException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `catch` interno lança uma exceção nova; o `finally` roda antes de ela subir; e o `catch` externo recebe a "B".',
  },
  {
    id: 'pleno-t1-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.io.*;

public class T {
    public static void main(String[] args) {
        try {
            new FileReader("x.txt").close();
        } catch (FileNotFoundException | IOException e) {
            System.out.println("erro");
        }
    }
}`,
    opcoes: [
      'Não compila: `FileNotFoundException` é subclasse de `IOException`',
      'Compila e imprime `erro`',
      'Compila e não imprime nada',
      'Não compila: `FileReader` não pode ser fechado',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: 'Alternativas de um multi-catch não podem ter relação de herança. Bastaria `catch (IOException e)`.',
  },
  {
    id: 'pleno-t1-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static class A {
        void f() throws Exception { System.out.print("A "); }
    }
    static class B extends A {
        @Override void f() { System.out.print("B "); }
    }

    public static void main(String[] args) {
        B b = new B();
        b.f();
        A a = b;
        try {
            a.f();
        } catch (Exception e) {
            System.out.print("erro ");
        }
        System.out.println();
    }
}`,
    opcoes: ['`B B`', '`B A`', '`B erro`', 'Não compila: `b.f()` precisa de `try`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Pela referência `B`, `f()` não declara exceção e dispensa o `try`. Pela referência `A`, o `try` é obrigatório, mas o método executado é o de `B`, que não lança nada.',
  },
  {
    id: 'pleno-t1-prova-q09',
    tipo: 'lacuna',
    dificuldade: 2,
    enunciado: 'Complete com o método que devolve as exceções suprimidas. O programa deve imprimir `alarme + porta emperrada`.',
    codigo: `public class Fechamento {
    static class Porta implements AutoCloseable {
        @Override
        public void close() {
            throw new IllegalStateException("porta emperrada");
        }
    }

    public static void main(String[] args) {
        try (Porta p = new Porta()) {
            throw new RuntimeException("alarme");
        } catch (RuntimeException e) {
            for (Throwable s : e.___()) {
                System.out.println(e.getMessage() + " + " + s.getMessage());
            }
        }
    }
}`,
    respostas: ['getSuppressed'],
    saida: 'alarme + porta emperrada',
    explicacao: '`getSuppressed()` devolve um array com as exceções anexadas à principal, aqui a do fechamento da porta.',
  },
  {
    id: 'pleno-t1-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static int f() {
        int x = 1;
        try {
            x = 2;
            return x;
        } finally {
            x = 3;
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    opcoes: ['`2`', '`3`', '`1`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O valor do `return` é guardado antes do `finally`. Mudar a variável primitiva depois não altera o resultado.',
  },
  {
    id: 'pleno-t1-prova-q11',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual destas exceções é checked?',
    opcoes: ['`InterruptedException`', '`ArithmeticException`', '`ClassCastException`', '`StackOverflowError`', '`NumberFormatException`'],
    resposta: 0,
    explicacao: '`InterruptedException` estende `Exception` diretamente. As três exceções do meio são `RuntimeException`, e `StackOverflowError` é um `Error`.',
  },
  {
    id: 'pleno-t1-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static class R implements AutoCloseable {
        String n;
        R(String n) { this.n = n; }
        public void close() {
            System.out.print("fecha" + n + " ");
            if (n.equals("2")) throw new IllegalStateException("x" + n);
        }
    }

    public static void main(String[] args) {
        try (R a = new R("1"); R b = new R("2")) {
            System.out.print("corpo ");
        } catch (IllegalStateException e) {
            System.out.print("catch " + e.getMessage() + " ");
        }
        System.out.println();
    }
}`,
    opcoes: [
      '`corpo fecha2 fecha1 catch x2`',
      '`corpo fecha2 catch x2`',
      '`corpo fecha1 fecha2 catch x2`',
      '`corpo catch x2 fecha2 fecha1`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Mesmo com a falha ao fechar o segundo recurso, o primeiro ainda é fechado. Só depois a exceção chega ao `catch`.',
  },
  {
    id: 'pleno-t1-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class T {
    static class Base {
        Base() throws Exception { }
    }
    static class Sub extends Base {
        Sub() throws RuntimeException { }
    }
}`,
    opcoes: [
      'Não compila: o construtor de `Sub` não cobre a `Exception` do `super()`',
      'Compila',
      'Não compila: construtores não podem declarar `throws`',
      'Compila, porque `RuntimeException` é subclasse de `Exception`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'O `super()` implícito pode lançar `Exception`. O construtor da subclasse precisa declarar `Exception` (ou mais amplo), e `RuntimeException` não cobre todas as `Exception`.',
  },
  {
    id: 'pleno-t1-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `public class T {
    public static void main(String[] args) {
        try {
            Integer.parseInt("dez");
        } catch (IllegalStateException e) {
            System.out.println("estado");
        } finally {
            System.out.println("finally");
        }
    }
}`,
    opcoes: [
      'Imprime `finally` e termina com `NumberFormatException`',
      'Imprime `estado` e `finally`',
      'Imprime só `finally`, sem erro',
      'Termina com `NumberFormatException` sem imprimir nada',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NumberFormatException', saida: 'finally' },
    explicacao: 'O `catch` não é compatível com `NumberFormatException`. O `finally` roda mesmo assim, e depois a exceção continua subindo até derrubar o programa.',
  },
  {
    id: 'pleno-t1-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre o `finally` são verdadeiras? Escolha duas.',
    opcoes: [
      'Ele roda mesmo quando o `try` sai com `return`',
      'Uma exceção lançada nele substitui a exceção original',
      'Ele roda antes do `catch`',
      'Ele é obrigatório em todo `try`',
      'Ele não roda se nenhum `catch` tratar a exceção',
    ],
    respostas: [0, 1],
    explicacao: 'O `finally` roda depois do `catch`, roda com exceções não tratadas e é opcional quando há um `catch` ou recursos.',
  },
  {
    id: 'pleno-t1-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.IOException;

public class T {
    static void ler(boolean falha) throws IOException {
        if (falha) throw new IOException("io");
    }

    static void processar() throws IOException {
        try {
            ler(true);
        } catch (Exception e) {
            System.out.print("log:" + e.getMessage() + " ");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            processar();
        } catch (IOException e) {
            System.out.println("tratado");
        }
    }
}`,
    opcoes: [
      '`log:io tratado`',
      'Não compila: `processar` precisa declarar `throws Exception`',
      '`tratado`',
      '`log:io` e o programa termina com a exceção',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Relançamento preciso: como `e` não é reatribuída, o compilador sabe que só uma `IOException` pode sair do `try`, e `throws IOException` basta.',
  },
  {
    id: 'pleno-t1-prova-q17',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual afirmação sobre a hierarquia de exceções é verdadeira?',
    opcoes: [
      '`Error` e `Exception` são subclasses diretas de `Throwable`',
      '`RuntimeException` é subclasse de `Error`',
      '`Exception` é subclasse de `RuntimeException`',
      'Toda exceção checked estende `RuntimeException`',
    ],
    resposta: 0,
    explicacao: '`Throwable` tem dois ramos. `RuntimeException` fica dentro do ramo de `Exception` e marca as unchecked.',
  },
  {
    id: 'pleno-t1-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static class DadosException extends RuntimeException {
        DadosException(String m, Throwable c) { super(m, c); }
    }

    public static void main(String[] args) {
        try {
            try {
                Object o = "texto";
                Integer i = (Integer) o;
            } catch (ClassCastException e) {
                throw new DadosException("tipo errado", e);
            }
        } catch (DadosException e) {
            System.out.println(e.getMessage() + " / " + (e.getCause() instanceof ClassCastException));
        }
    }
}`,
    opcoes: ['`tipo errado / true`', '`tipo errado / false`', 'Lança `ClassCastException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A exceção customizada embrulha a original como causa. A mensagem é a nova, e a causa continua sendo a `ClassCastException`.',
  },
  {
    id: 'pleno-t1-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class T {
    public static void main(String[] args) {
        try {
            System.out.println(10 / 2);
        } catch (InterruptedException e) {
            System.out.println("interrompido");
        }
    }
}`,
    opcoes: [
      'Não compila: o `try` nunca lança `InterruptedException`',
      'Compila e imprime `5`',
      'Compila e imprime `interrompido`',
      'Não compila: `InterruptedException` precisa de `throws`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 5 },
    explicacao: '`InterruptedException` é checked, e nada no `try` pode lançá-la. Para checked, o compilador recusa um `catch` inalcançável.',
  },
  {
    id: 'pleno-t1-prova-q20',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `public class T {
    static String f() {
        try {
            try {
                return "interno";
            } finally {
                System.out.print("[f1]");
            }
        } finally {
            System.out.print("[f2]");
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    resposta: '[f1][f2]interno',
    explicacao: 'O `return` passa pelos dois `finally`, do mais interno ao mais externo, antes de o valor chegar ao `println`.',
  },
];

export default prova;
