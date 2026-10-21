import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t1-e01',
  minutos: 14,
  aula,
  armadilhas: [
    'Checked são `Exception` e subclasses, menos as `RuntimeException`; unchecked são `RuntimeException`, `Error` e subclasses.',
    'Uma exceção checked precisa ser tratada com `catch` ou declarada com `throws`.',
    '`throw` lança uma exceção; `throws` declara que o método pode lançá-la.',
    '`catch` de uma checked que o `try` nunca lança não compila; `Exception` e `Throwable` são exceções a essa regra.',
    '`Error` não é `Exception`: um `catch (Exception e)` não pega `StackOverflowError`.',
    '`NumberFormatException` é subclasse de `IllegalArgumentException`.',
    'Depois de uma exceção, o resto do bloco `try` é abandonado.',
    'Sem `catch` compatível, a exceção sobe a pilha até derrubar a thread.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: What Is an Exception?',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/what-is-an-exception/',
      tipo: 'documentacao',
      porque: 'A regra de tratar ou declarar e os três tipos de exceção, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Unchecked Exceptions, The Controversy',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/unchecked-exception-controversy/',
      tipo: 'documentacao',
      porque: 'Quando usar cada tipo, segundo a própria Oracle.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS, capítulo 11: Exceptions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html',
      tipo: 'documentacao',
      porque: 'A definição de checked e unchecked e as regras que o compilador confere.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.lang.Throwable',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Throwable.html',
      tipo: 'documentacao',
      porque: 'A raiz de tudo o que pode ser lançado: mensagem, causa, stack trace e suprimidas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JVMS 2.10: Exceptions',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.10',
      tipo: 'documentacao',
      porque: 'Como a JVM procura o tratador na tabela de exceções e desfaz os quadros da pilha.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Checked and Unchecked Exceptions in Java',
      url: 'https://www.baeldung.com/java-checked-unchecked-exceptions',
      tipo: 'artigo',
      porque: 'A diferença entre os dois tipos com exemplos de cada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Common Java Exceptions',
      url: 'https://www.baeldung.com/java-common-exceptions',
      tipo: 'artigo',
      porque: 'As exceções mais frequentes, de onde vêm e como evitá-las.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 51, Exceptions: tipos de erros no Java',
      url: 'https://www.youtube.com/watch?v=5R8pw1V2H-g',
      tipo: 'video',
      porque: 'A hierarquia de exceções explicada em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 50, Exceptions: stacktrace e throws',
      url: 'https://www.youtube.com/watch?v=CW7DER5TqLM',
      tipo: 'video',
      porque: 'Como ler um stack trace e declarar exceções com `throws`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Prof. Gabriel Gadelha: Checked vs Unchecked no Java',
      url: 'https://www.youtube.com/watch?v=dGOE9MFnpq4',
      tipo: 'video',
      porque: 'Por que exceções de domínio costumam ser `RuntimeException`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Checked vs. Unchecked Exceptions in Java Tutorial',
      url: 'https://www.youtube.com/watch?v=bCPClyGsVhc',
      tipo: 'video',
      porque: 'A diferença entre os dois tipos, com a regra de tratar ou declarar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'O critério clássico: checked para condições recuperáveis, runtime para erros de programação.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Exceptions": Item 70, "Use checked exceptions for recoverable conditions and runtime exceptions for programming errors"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de exceções checked, unchecked e erros que a prova espera que você saiba de cor.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seções "Understanding Exceptions" e "Recognizing Exception Classes"',
    },
  ],
  desafio: {
    titulo: 'Leitor de configuração',
    enunciado:
      'Escreva `static int lerPorta(String texto) throws java.io.IOException`, que lança `IOException("configuração ausente")` para texto `null` ou em branco, converte o texto com `Integer.parseInt` (deixando a `NumberFormatException` subir) e lança `IllegalArgumentException("porta fora da faixa: X")` para valores fora de 1 a 65535. No `main`, trate cada caso separadamente, sem um `catch (Exception e)` genérico. Para as entradas `"8080"`, `""`, `"80a"` e `"70000"`, a saída deve ser:\n\n```text\n8080: porta 8080\n: configuração ausente (checked)\n80a: não é número (unchecked)\n70000: porta fora da faixa: 70000 (unchecked)\n```',
    dicas: [
      '`NumberFormatException` é uma `IllegalArgumentException`: o `catch` dela precisa vir **antes**.',
      'O `main` só compila se tratar a `IOException`, já que `lerPorta` a declara.',
      '`isBlank()` cobre a string vazia e a feita só de espaços.',
    ],
    solucao: `import java.io.IOException;
import java.util.List;

public class Configuracao {
    static int lerPorta(String texto) throws IOException {
        if (texto == null || texto.isBlank()) {
            throw new IOException("configuração ausente");
        }
        int porta = Integer.parseInt(texto.trim());
        if (porta < 1 || porta > 65535) {
            throw new IllegalArgumentException("porta fora da faixa: " + porta);
        }
        return porta;
    }

    public static void main(String[] args) {
        for (String entrada : List.of("8080", "", "80a", "70000")) {
            try {
                System.out.println(entrada + ": porta " + lerPorta(entrada));
            } catch (IOException e) {
                System.out.println(entrada + ": " + e.getMessage() + " (checked)");
            } catch (NumberFormatException e) {
                System.out.println(entrada + ": não é número (unchecked)");
            } catch (IllegalArgumentException e) {
                System.out.println(entrada + ": " + e.getMessage() + " (unchecked)");
            }
        }
    }
}`,
    saida: '8080: porta 8080\n: configuração ausente (checked)\n80a: não é número (unchecked)\n70000: porta fora da faixa: 70000 (unchecked)',
    comentarios:
      'A configuração ausente é um problema do ambiente, que o programa deve prever: checked. Um texto que não é número e uma porta fora da faixa indicam dados errados, que o código chamador deveria ter validado: unchecked. Se o `catch` de `IllegalArgumentException` viesse antes do de `NumberFormatException`, o segundo seria inalcançável e o código não compilaria, assunto do próximo episódio.',
  },
  exercicios: [
    {
      id: 'pleno-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destas exceções é checked?',
      opcoes: ['`IOException`', '`NullPointerException`', '`IllegalArgumentException`', '`ArithmeticException`'],
      resposta: 0,
      explicacao: '`IOException` estende `Exception` sem passar por `RuntimeException`. As outras três são `RuntimeException`, portanto unchecked.',
    },
    {
      id: 'pleno-t1-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static String testar(Object o) {
        try {
            String s = (String) o;
            return "tamanho " + s.length();
        } catch (ClassCastException e) {
            return "não é texto";
        } catch (NullPointerException e) {
            return "nulo";
        }
    }

    public static void main(String[] args) {
        System.out.println(testar("abc") + ", " + testar(5) + ", " + testar(null));
    }
}`,
      resposta: 'tamanho 3, não é texto, nulo',
      explicacao: 'O cast de um `Integer` para `String` lança `ClassCastException`. O cast de `null` funciona, e a exceção só aparece ao chamar `length()`.',
    },
    {
      id: 'pleno-t1-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Arquivo {
    static void abrir(String nome) {
        if (nome == null) {
            throw new Exception("sem nome");
        }
    }
}`,
      opcoes: [
        'Não compila: `Exception` é checked e não foi tratada nem declarada',
        'Compila',
        'Compila, mas lança exceção ao carregar a classe',
        'Não compila: `throw` precisa de `throws` mesmo para exceções unchecked',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: '`Exception` é a raiz das checked. Seria preciso `throws Exception` na assinatura, ou lançar uma unchecked, como `IllegalArgumentException`.',
    },
    {
      id: 'pleno-t1-e01-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais classes compilam? Escolha três.',
      opcoes: [
        '`class A { void f() { throw new RuntimeException(); } }`',
        '`class B { void f() throws Exception { throw new java.io.IOException(); } }`',
        '`class C { void f() { throw new Error("x"); } }`',
        '`class D { void f() { throw new java.io.IOException(); } }`',
        '`class E { void f() throws RuntimeException { throw new Exception(); } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Unchecked e erros dispensam declaração. Declarar `throws Exception` cobre uma `IOException`. Declarar só `RuntimeException` não cobre uma `Exception` checked.',
    },
    {
      id: 'pleno-t1-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a superclasse direta de `NumberFormatException`?',
      opcoes: ['`IllegalArgumentException`', '`ArithmeticException`', '`IOException`', '`Exception`'],
      resposta: 0,
      explicacao: 'Um texto que não representa um número é um argumento inválido. Por isso um `catch (IllegalArgumentException e)` também pega o erro do `parseInt`.',
    },
    {
      id: 'pleno-t1-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para declarar a exceção. O programa deve imprimir `falha de leitura`.',
      codigo: `import java.io.IOException;

public class Leitor {
    static int ler() ___ IOException {
        throw new IOException("falha de leitura");
    }

    public static void main(String[] args) {
        try {
            ler();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      respostas: ['throws'],
      saida: 'falha de leitura',
      explicacao: '`throws` na assinatura declara a exceção checked e passa a obrigação de tratá-la para quem chama, aqui o `main`.',
    },
    {
      id: 'pleno-t1-e01-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.io.IOException;

public class Calculo {
    public static void main(String[] args) {
        try {
            int x = 10 / 2;
            System.out.println(x);
        } catch (ArithmeticException e) {
            System.out.println("divisão");
        } catch (IOException e) {
            System.out.println("arquivo");
        }
    }
}`,
      resposta: 10,
      explicacao: 'Nada no `try` pode lançar `IOException`, que é checked, e o compilador recusa o `catch` inalcançável. Para unchecked, como `ArithmeticException`, o `catch` é sempre aceito.',
    },
    {
      id: 'pleno-t1-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static void a() { b(); System.out.print("a"); }
    static void b() { c(); System.out.print("b"); }
    static void c() { throw new IllegalStateException("c"); }

    public static void main(String[] args) {
        try {
            a();
        } catch (IllegalStateException e) {
            System.out.print("pegou " + e.getMessage());
        }
        System.out.println();
    }
}`,
      opcoes: ['`pegou c`', '`bapegou c`', '`apegou c`', 'Não compila: `c()` precisa declarar a exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A exceção sai de `c`, atravessa `b` e `a` sem que o resto deles rode, e só para no `catch` do `main`. Sendo unchecked, ninguém precisa declará-la.',
    },
    {
      id: 'pleno-t1-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            int n = Integer.parseInt("12x");
            System.out.println(n);
        } catch (ArithmeticException e) {
            System.out.println("conta");
        }
    }
}`,
      opcoes: [
        'Lança `NumberFormatException`, que não é pega',
        'Imprime `conta`',
        'Imprime `12`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NumberFormatException' },
      explicacao: 'O `catch` só pega `ArithmeticException`, que não tem relação com `NumberFormatException`. A exceção sai do `main` e derruba o programa.',
    },
    {
      id: 'pleno-t1-e01-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais exceções são unchecked? Escolha três.',
      opcoes: [
        '`NullPointerException`',
        '`IllegalArgumentException`',
        '`ArrayIndexOutOfBoundsException`',
        '`IOException`',
        '`InterruptedException`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'As três primeiras estendem `RuntimeException`. `IOException` e `InterruptedException` estendem `Exception` diretamente e são checked.',
    },
    {
      id: 'pleno-t1-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            try {
                throw new StackOverflowError();
            } catch (Exception e) {
                System.out.println("Exception");
            }
        } catch (Error e) {
            System.out.println("Error: " + e.getClass().getSimpleName());
        }
    }
}`,
      opcoes: ['`Error: StackOverflowError`', '`Exception`', 'Não compila', 'O programa termina com o erro'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Error` e `Exception` são ramos separados de `Throwable`. O `catch` interno não pega o erro, que sobe até o `catch (Error e)` externo.',
    },
    {
      id: 'pleno-t1-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença entre `throw` e `throws`?',
      opcoes: [
        '`throw` lança uma exceção; `throws` declara, na assinatura, que o método pode lançá-la',
        'São sinônimos',
        '`throw` é para checked e `throws` para unchecked',
        '`throws` lança várias exceções de uma vez',
      ],
      resposta: 0,
      explicacao: '`throw new X()` é um comando, dentro do corpo. `throws X` faz parte da declaração do método e é obrigatório para checked não tratadas.',
    },
    {
      id: 'pleno-t1-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `Exception a = new IllegalArgumentException("idade negativa");
Exception b = new RuntimeException();
System.out.println(a.getMessage() + " | " + a + " | " + b.getMessage());`,
      opcoes: [
        '`idade negativa | java.lang.IllegalArgumentException: idade negativa | null`',
        '`idade negativa | idade negativa | null`',
        '`idade negativa | IllegalArgumentException | `',
        '`idade negativa | java.lang.IllegalArgumentException: idade negativa | RuntimeException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`getMessage()` devolve só a mensagem, `null` se não houver. O `toString` de uma exceção é o nome completo da classe, dois-pontos e a mensagem.',
    },
    {
      id: 'pleno-t1-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class T {
    static int idade(int valor) {
        if (valor < 0) throw new IllegalArgumentException("negativa");
        return valor;
    }

    public static void main(String[] args) {
        System.out.println(idade(30));
        System.out.println(idade(-1));
    }
}`,
      opcoes: [
        'Imprime `30` e lança `IllegalArgumentException`',
        'Não compila: `idade` precisa declarar `throws`',
        'Imprime `30` e `-1`',
        'Lança a exceção antes de imprimir',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: '30' },
      explicacao: 'Exceções unchecked não precisam ser declaradas nem tratadas. A primeira chamada funciona; a segunda lança, e ninguém trata.',
    },
    {
      id: 'pleno-t1-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como o bytecode representa um bloco `try`/`catch`?',
      opcoes: [
        'Com uma tabela de exceções no método: para cada faixa de instruções, o tipo capturado e o endereço do tratador',
        'Com uma instrução `try` no início e outra `catch` no fim',
        'Com um `if` depois de cada instrução, conferindo se houve erro',
        'Não há representação: o `catch` é copiado para cada ponto que pode lançar',
      ],
      resposta: 0,
      explicacao: 'Quando uma exceção é lançada com `athrow`, a JVM consulta a tabela do método atual e, se nada servir, desfaz o quadro e repete no método de quem chamou. Um `try` sem exceção não custa praticamente nada.',
    },
  ],
};

export default episodio;
