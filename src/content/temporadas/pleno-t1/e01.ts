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
  ia: {
    uso:
      'Para estudar exceções, a IA é uma boa tutora: explica uma mensagem do `javac` ou um stack trace linha por linha e gera trechos de treino no estilo "compila ou não compila". O limite está na classificação: ela erra se exceções menos comuns são checked e inventa superclasses, então a última palavra é do Javadoc e do compilador.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui o código e a mensagem do javac>\n- Explique por que não compila, dizendo se cada exceção envolvida é checked ou unchecked e qual é a superclasse direta dela.\n- Mostre as duas correções possíveis, tratar e declarar, e diga quando cada uma faz sentido.\n- Não use catch vazio nem throws Exception genérico.\n- No fim, crie três trechos parecidos para eu dizer se compilam, com as respostas separadas.',
    erros: [
      'Afirma que `catch (Exception e)` também pega `StackOverflowError` e outros `Error`.',
      'Classifica `InterruptedException` ou `CloneNotSupportedException`, que são checked, como unchecked.',
      'Sugere um `catch` vazio, ou `throws Exception` no `main`, só para o código compilar.',
      'Diz que `throws` é obrigatório também para exceções unchecked.',
    ],
    conferir: [
      'Compile cada trecho sugerido e compare o resultado com o que a IA afirmou.',
      'Abra o Javadoc da exceção e leia a hierarquia no topo da página.',
      'Rode o programa e compare o stack trace real com a explicação.',
    ],
  },
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
  bugs: [
    {
      id: 'pleno-t1-e01-b01',
      dificuldade: 1,
      sintoma: 'O cadastro não compila depois que alguém acrescentou o tratamento de idade inválida: `exception IOException is never thrown in body of corresponding try statement`.',
      codigo: `public class Idade {
    static int idade(String texto) {
        return Integer.parseInt(texto.trim());
    }

    public static void main(String[] args) {
        String[] entradas = {"30", "trinta", " 42 "};
        for (String e : entradas) {
            try {
                System.out.println("idade: " + idade(e));
            } catch (java.io.IOException ex) {
                System.out.println("inválida: " + e);
            }
        }
    }
}`,
      linha: 11,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Idade {
    static int idade(String texto) {
        return Integer.parseInt(texto.trim());
    }

    public static void main(String[] args) {
        String[] entradas = {"30", "trinta", " 42 "};
        for (String e : entradas) {
            try {
                System.out.println("idade: " + idade(e));
            } catch (NumberFormatException ex) {
                System.out.println("inválida: " + e);
            }
        }
    }
}`,
      saidaCorrigida: 'idade: 30\ninválida: trinta\nidade: 42',
      dica: 'Que exceção o `Integer.parseInt` lança quando o texto não é um número? Ela é checked?',
      explicacao:
        'Um `catch` de exceção checked exige que o `try` possa lançá-la, e nada ali faz entrada e saída. O `parseInt` lança `NumberFormatException`, uma unchecked, filha de `IllegalArgumentException`. Capture a exceção que o código realmente lança: o compilador recusa o `catch` que nunca seria usado.',
    },
    {
      id: 'pleno-t1-e01-b02',
      dificuldade: 2,
      sintoma: 'O relatório de erros do sistema marca uma `NullPointerException` como checked: `NullPointerException=checked IOException=checked StackOverflowError=error`.',
      codigo: `import java.io.IOException;

public class Classificador {
    static String tipo(Throwable t) {
        if (t instanceof Error) return "error";
        if (t instanceof Exception) return "checked";
        return "unchecked";
    }

    public static void main(String[] args) {
        Throwable[] vistas = {new NullPointerException(), new IOException(), new StackOverflowError()};
        StringBuilder relatorio = new StringBuilder();
        for (Throwable t : vistas) {
            relatorio.append(t.getClass().getSimpleName()).append('=').append(tipo(t)).append(' ');
        }
        System.out.println(relatorio.toString().trim());
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: 'NullPointerException=checked IOException=checked StackOverflowError=error' },
      correcao: `import java.io.IOException;

public class Classificador {
    static String tipo(Throwable t) {
        if (t instanceof Error) return "error";
        if (t instanceof Exception && !(t instanceof RuntimeException)) return "checked";
        return "unchecked";
    }

    public static void main(String[] args) {
        Throwable[] vistas = {new NullPointerException(), new IOException(), new StackOverflowError()};
        StringBuilder relatorio = new StringBuilder();
        for (Throwable t : vistas) {
            relatorio.append(t.getClass().getSimpleName()).append('=').append(tipo(t)).append(' ');
        }
        System.out.println(relatorio.toString().trim());
    }
}`,
      saidaCorrigida: 'NullPointerException=unchecked IOException=checked StackOverflowError=error',
      dica: '`RuntimeException` também é uma `Exception`. O que o `instanceof Exception` responde para ela?',
      explicacao:
        '`RuntimeException` estende `Exception`, e por isso toda unchecked passa no teste `instanceof Exception`. Checked é `Exception` **menos** as `RuntimeException`: a condição precisa excluir esse ramo, ou testar `RuntimeException` antes. Na hierarquia, sempre confira o caso mais específico primeiro.',
    },
    {
      id: 'pleno-t1-e01-b03',
      dificuldade: 3,
      sintoma: 'Com a taxa de juros escrita errado na configuração, o sistema deveria usar a taxa padrão, mas morre na inicialização com `ExceptionInInitializerError`, causada por `NumberFormatException: For input string: "2,5"`.',
      codigo: `public class Configuracao {
    static class Taxas {
        static final int JUROS = Integer.parseInt("2,5");
    }

    public static void main(String[] args) {
        int juros;
        try {
            juros = Taxas.JUROS;
        } catch (Exception e) {
            juros = 2;
        }
        System.out.println("juros: " + juros + "%");
    }
}`,
      linha: 10,
      efeito: { tipo: 'excecao', nome: 'ExceptionInInitializerError' },
      correcao: `public class Configuracao {
    static class Taxas {
        static final int JUROS = Integer.parseInt("2,5");
    }

    public static void main(String[] args) {
        int juros;
        try {
            juros = Taxas.JUROS;
        } catch (ExceptionInInitializerError e) {
            juros = 2;
        }
        System.out.println("juros: " + juros + "%");
    }
}`,
      saidaCorrigida: 'juros: 2%',
      dica: 'Quando um inicializador `static` lança uma exceção, o que a JVM entrega para quem tentou usar a classe? E isso é uma `Exception`?',
      explicacao:
        'Uma exceção num inicializador `static` chega embrulhada num `ExceptionInInitializerError`, que é um `Error`, e `catch (Exception e)` não pega `Error`. A correção mostra o tipo certo, mas o melhor é não deixar o inicializador falhar: leia e valide a configuração num método comum. Depois desse erro, a classe fica inutilizável, e cada nova tentativa lança `NoClassDefFoundError`.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destas exceções é checked?',
      opcoes: ['`IOException`', '`NullPointerException`', '`IllegalArgumentException`', '`ArithmeticException`'],
      resposta: 0,
      explicacao: '`IOException` estende `Exception` sem passar por `RuntimeException`. As outras três são `RuntimeException`, portanto unchecked.',
      dica: 'Checked é a que o compilador obriga a tratar: a que representa um problema do mundo lá fora.',
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
      dica: 'Cada chamada segue um caminho diferente: o cast falha com um número, e o `null` passa no cast.',
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
      dica: '`Exception` não é uma `RuntimeException`.',
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
      dica: 'Para cada `throw`, a exceção é checked? Se for, o método declara?',
    },
    {
      id: 'pleno-t1-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a superclasse direta de `NumberFormatException`?',
      opcoes: ['`IllegalArgumentException`', '`ArithmeticException`', '`IOException`', '`Exception`'],
      resposta: 0,
      explicacao: 'Um texto que não representa um número é um argumento inválido. Por isso um `catch (IllegalArgumentException e)` também pega o erro do `parseInt`.',
      dica: 'Ela nasce de um argumento inválido.',
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
      dica: 'A palavra que vai na assinatura é diferente da que lança.',
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
      dica: 'Um `catch` de checked exige que o `try` possa lançá-la.',
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
      dica: 'Depois do lançamento, o resto de cada método é abandonado.',
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
      dica: 'O `catch` pega o tipo certo de exceção?',
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
      dica: 'Unchecked são as que estendem `RuntimeException`.',
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
      dica: '`StackOverflowError` é um `Error`, e não uma `Exception`.',
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
      dica: 'Uma das duas palavras termina com s.',
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
      dica: 'O `toString` de uma exceção mostra o nome completo da classe; uma exceção sem mensagem tem mensagem `null`.',
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
      dica: 'A primeira chamada roda inteira antes da segunda.',
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
      dica: 'Um `try` não vira instrução: a informação fica numa tabela do método.',
    },
  ],
};

export default episodio;
