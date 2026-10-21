import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t1-e04',
  minutos: 15,
  aula,
  armadilhas: [
    'Recursos precisam implementar `AutoCloseable`; uma classe com um método `fechar()` qualquer não serve.',
    'Os recursos fecham na ordem inversa da abertura, antes de o `catch` e o `finally` rodarem.',
    'A variável do recurso não existe no `catch` nem no `finally`.',
    'Variáveis de recurso são implicitamente `final`.',
    'Exceção do `close()` com o corpo já falhando vira suprimida; sozinha, é a principal.',
    'O `close()` de `AutoCloseable` declara `throws Exception`: com um recurso desse tipo, é preciso tratar ou declarar.',
    'Java 9: `try (r)` só aceita variáveis `final` ou efetivamente final.',
    'Se um recurso falha ao abrir, só os já abertos são fechados; recursos `null` não são fechados.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: The try-with-resources Statement',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/catching-handling/#the-try-with-resources-statement',
      tipo: 'documentacao',
      porque: 'Vários recursos, exceções suprimidas e as classes que implementam `AutoCloseable`, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The try-with-resources Statement',
      url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html',
      tipo: 'documentacao',
      porque: 'O exemplo clássico com arquivos e a comparação com o `finally`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.20.3: try-with-resources',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20.3',
      tipo: 'documentacao',
      porque: 'A tradução exata para `try`/`finally`, com o tratamento de `null` e das suprimidas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de Throwable.addSuppressed',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Throwable.html#addSuppressed(java.lang.Throwable)',
      tipo: 'documentacao',
      porque: 'Como uma exceção guarda as que foram suprimidas no fechamento.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de AutoCloseable',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/AutoCloseable.html',
      tipo: 'documentacao',
      porque: 'O contrato do `close()` e a recomendação de não lançar `InterruptedException`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java, Try with Resources',
      url: 'https://www.baeldung.com/java-try-with-resources',
      tipo: 'artigo',
      porque: 'Sintaxe, ordem de fechamento e a forma do Java 9.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Suppressed Exceptions',
      url: 'https://www.baeldung.com/java-suppressed-exceptions',
      tipo: 'artigo',
      porque: 'Como as exceções suprimidas aparecem e como lê-las.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Exceções pt 09, Try with resources',
      url: 'https://www.youtube.com/watch?v=PERQlV7ax2M',
      tipo: 'video',
      porque: 'O try-with-resources na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'RinaldoDev: Não use a nova sintaxe do try-with-resources antes de ver este vídeo',
      url: 'https://www.youtube.com/watch?v=_tHGntQ9yms',
      tipo: 'video',
      porque: 'Os cuidados com a forma do Java 9, que usa variáveis declaradas antes, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Clustermicro: Java OCP 21 (1Z0-830), try-with-resources & Suppressed Exceptions',
      url: 'https://www.youtube.com/watch?v=hclrMlc1tAM',
      tipo: 'video',
      porque: 'O assunto apresentado com o foco das questões da prova 1Z0-830.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que o try-with-resources é sempre melhor que o `try`/`finally` para fechar recursos.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Creating and Destroying Objects": Item 9, "Prefer try-with-resources to try-finally"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A ordem de execução com `catch` e `finally` e as suprimidas, no formato das questões.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Automating Resource Management", partes "Introducing Try-with-Resources" e "Understanding Suppressed Exceptions"',
    },
  ],
  desafio: {
    titulo: 'Cópia com dois recursos',
    enunciado:
      'Crie a classe `Leitor`, que implementa `AutoCloseable`, imprime ao abrir e ao fechar, tem `ler(int linha)` (que lança `IllegalStateException("fim inesperado de nome")` a partir da linha 3) e pode ser configurada para falhar também no `close()`. Escreva `copiar(int linhas, boolean falhaAoFechar)` com dois leitores, `origem` e `destino`, num try-with-resources, imprimindo a exceção principal e as suprimidas. Rode `copiar(2, false)`, uma linha `---` e `copiar(3, true)`. A saída esperada é:\n\n```text\nabrindo origem\nabrindo destino\ncopiou origem:1\ncopiou origem:2\nfechando destino\nfechando origem\n---\nabrindo origem\nabrindo destino\ncopiou origem:1\ncopiou origem:2\nfechando destino\nfechando origem\nfalhou: fim inesperado de origem\n  suprimida: erro ao fechar origem\n```',
    dicas: [
      'Declare os dois recursos no mesmo cabeçalho, separados por `;`.',
      'No `catch`, percorra `e.getSuppressed()`.',
      'A exceção da leitura é a principal; a do `close()` da origem é anexada a ela.',
    ],
    solucao: `public class Copia {
    static class Leitor implements AutoCloseable {
        private final String nome;
        private final boolean falhaAoFechar;

        Leitor(String nome, boolean falhaAoFechar) {
            this.nome = nome;
            this.falhaAoFechar = falhaAoFechar;
            System.out.println("abrindo " + nome);
        }

        String ler(int linha) {
            if (linha > 2) throw new IllegalStateException("fim inesperado de " + nome);
            return nome + ":" + linha;
        }

        @Override
        public void close() {
            System.out.println("fechando " + nome);
            if (falhaAoFechar) throw new IllegalStateException("erro ao fechar " + nome);
        }
    }

    static void copiar(int linhas, boolean falhaAoFechar) {
        try (Leitor origem = new Leitor("origem", falhaAoFechar);
             Leitor destino = new Leitor("destino", false)) {
            for (int i = 1; i <= linhas; i++) {
                System.out.println("copiou " + origem.ler(i));
            }
        } catch (IllegalStateException e) {
            System.out.println("falhou: " + e.getMessage());
            for (Throwable s : e.getSuppressed()) {
                System.out.println("  suprimida: " + s.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        copiar(2, false);
        System.out.println("---");
        copiar(3, true);
    }
}`,
    saida: 'abrindo origem\nabrindo destino\ncopiou origem:1\ncopiou origem:2\nfechando destino\nfechando origem\n---\nabrindo origem\nabrindo destino\ncopiou origem:1\ncopiou origem:2\nfechando destino\nfechando origem\nfalhou: fim inesperado de origem\n  suprimida: erro ao fechar origem',
    comentarios:
      'Com `finally`, a falha ao fechar teria substituído a de leitura, e o log mostraria só o sintoma menos importante. O try-with-resources mantém a causa real como principal e guarda a outra como suprimida. E repare que nenhum `if (origem != null)` foi necessário: o fechamento dos dois recursos, na ordem certa, é automático.',
  },
  exercicios: [
    {
      id: 'pleno-t1-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que um tipo precisa para ser usado como recurso num try-with-resources?',
      opcoes: [
        'Implementar `AutoCloseable` (ou `Closeable`, que a estende)',
        'Ter um método chamado `close`, de qualquer forma',
        'Ser uma classe do pacote `java.io`',
        'Ter um construtor sem parâmetros',
      ],
      resposta: 0,
      explicacao: 'O compilador gera a chamada a `close()` pela interface. Um método com o mesmo nome numa classe que não implementa a interface não serve.',
    },
    {
      id: 'pleno-t1-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static class R implements AutoCloseable {
        String n;
        R(String n) { this.n = n; System.out.print("+" + n); }
        public void close() { System.out.print("-" + n); }
    }

    public static void main(String[] args) {
        try (R a = new R("a"); R b = new R("b")) {
            System.out.print(" corpo ");
            throw new RuntimeException();
        } catch (RuntimeException e) {
            System.out.print(" catch");
        } finally {
            System.out.println(" finally");
        }
    }
}`,
      resposta: '+a+b corpo -b-a catch finally',
      explicacao: 'Abertura na ordem, fechamento na ordem inversa, e só então o `catch` e o `finally`.',
    },
    {
      id: 'pleno-t1-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    static class Janela {
        void fechar() { }
    }

    public static void main(String[] args) {
        try (Janela j = new Janela()) {
            System.out.println("aberta");
        }
    }
}`,
      opcoes: [
        'Não compila: `Janela` não implementa `AutoCloseable`',
        'Compila, e `fechar()` é chamado no fim',
        'Compila, mas nada é fechado',
        'Não compila: falta um `catch`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'O try-with-resources só aceita `AutoCloseable`. A falta de `catch` não é problema: ele pode ficar sozinho.',
    },
    {
      id: 'pleno-t1-e04-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class R implements AutoCloseable {
        String n;
        R(String n) { this.n = n; }
        public void close() { throw new IllegalStateException("close " + n); }
    }

    public static void main(String[] args) {
        try (R a = new R("a"); R b = new R("b")) {
            throw new RuntimeException("corpo");
        } catch (RuntimeException e) {
            System.out.print(e.getMessage());
            for (Throwable s : e.getSuppressed()) System.out.print(" | " + s.getMessage());
            System.out.println();
        }
    }
}`,
      opcoes: [
        '`corpo | close b | close a`',
        '`corpo | close a | close b`',
        '`close a | corpo | close b`',
        '`corpo`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A exceção do corpo é a principal. As dos fechamentos são anexadas como suprimidas, na ordem em que acontecem: `b` fecha antes de `a`.',
    },
    {
      id: 'pleno-t1-e04-q05',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`try (StringReader r = new StringReader("x")) { System.out.println((char) r.read()); } catch (IOException e) { }`',
        '`StringReader r = new StringReader("x"); try (r) { }`',
        '`try (StringReader r = new StringReader("x")) { }`',
        '`try (StringReader r = new StringReader("x")) { r = null; }`',
        '`StringReader r = new StringReader("x"); r = new StringReader("y"); try (r) { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O `close()` de `StringReader` não declara exceções, então não há o que tratar ao fechar. As variáveis de recurso são `final`, e a forma do Java 9 exige uma variável efetivamente final.',
    },
    {
      id: 'pleno-t1-e04-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que a sessão possa ser usada num try-with-resources. O programa deve imprimir `logado` e depois `sessão encerrada`.',
      codigo: `public class Login {
    static class Sessao implements ___ {
        @Override
        public void close() {
            System.out.println("sessão encerrada");
        }
    }

    public static void main(String[] args) {
        try (Sessao s = new Sessao()) {
            System.out.println("logado");
        }
    }
}`,
      respostas: ['AutoCloseable', 'java.io.Closeable'],
      saida: 'logado\nsessão encerrada',
      explicacao: 'Qualquer uma das duas interfaces serve. Como o `close()` sobrescrito não declara exceções, nada precisa ser tratado.',
    },
    {
      id: 'pleno-t1-e04-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class T {
    static class Log implements AutoCloseable {
        public void close() { }
    }

    public static void main(String[] args) {
        try (Log l = new Log()) {
            System.out.println("ok");
            l = new Log();
        }
    }
}`,
      resposta: 9,
      explicacao: 'Variáveis declaradas no cabeçalho do try-with-resources são implicitamente `final`. Se pudessem mudar, o recurso original nunca seria fechado.',
    },
    {
      id: 'pleno-t1-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class R implements AutoCloseable {
        public void close() { throw new IllegalStateException("fechar"); }
    }

    public static void main(String[] args) {
        try (R r = new R()) {
            System.out.print("corpo ");
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage() + " " + e.getSuppressed().length);
        }
    }
}`,
      opcoes: ['`corpo fechar 0`', '`corpo fechar 1`', '`corpo`', '`fechar 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O corpo terminou sem erro, então não há exceção principal para receber a do fechamento: ela mesma se torna a principal, sem suprimidas.',
    },
    {
      id: 'pleno-t1-e04-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    public static void main(String[] args) {
        AutoCloseable r = () -> { };
        try (r) {
            System.out.println("x");
        }
    }
}`,
      opcoes: [
        'Não compila: o fechamento pode lançar `Exception`, que não é tratada nem declarada',
        'Compila e imprime `x`',
        'Não compila: `AutoCloseable` não pode ser implementada por lambda',
        'Não compila: a forma `try (r)` só existe para `Closeable`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: 'O tipo declarado é `AutoCloseable`, cujo `close()` declara `throws Exception`. A chamada implícita ao fechar entra na regra de tratar ou declarar, e o erro aponta para o `try`.',
    },
    {
      id: 'pleno-t1-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class R implements AutoCloseable {
        public void close() { System.out.print("fechou "); }
    }

    public static void main(String[] args) {
        try (R a = new R(); R b = null) {
            System.out.print("corpo ");
        }
        System.out.println("fim");
    }
}`,
      opcoes: ['`corpo fechou fim`', 'Lança `NullPointerException`', '`corpo fechou fechou fim`', '`corpo fim`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para um recurso `null`, o `close()` simplesmente não é chamado. O recurso `a` é fechado normalmente.',
    },
    {
      id: 'pleno-t1-e04-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em que ordem os recursos de um try-with-resources são fechados?',
      opcoes: [
        'Na ordem inversa da declaração',
        'Na ordem da declaração',
        'Em ordem alfabética do nome da variável',
        'Em ordem indefinida',
      ],
      resposta: 0,
      explicacao: 'O último aberto é o primeiro fechado, como uma pilha. Faz sentido: um recurso aberto depois pode depender dos anteriores.',
    },
    {
      id: 'pleno-t1-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    static class R implements AutoCloseable {
        public void close() { }
    }

    public static void main(String[] args) {
        try (R r = new R()) {
            throw new RuntimeException();
        } catch (RuntimeException e) {
            System.out.println(r);
        }
    }
}`,
      opcoes: [
        'Não compila: `r` não existe no `catch`',
        'Compila e imprime a referência do recurso',
        'Compila e imprime `null`',
        'Não compila: o `catch` não pode tratar `RuntimeException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 10 },
      explicacao: 'O escopo da variável de recurso é só o bloco `try`. Quando o `catch` roda, o recurso já foi fechado.',
    },
    {
      id: 'pleno-t1-e04-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre exceções suprimidas são verdadeiras? Escolha duas.',
      opcoes: [
        'A exceção do `close()` é suprimida quando o corpo já lançou uma exceção',
        'As suprimidas ficam acessíveis por `getSuppressed()` na exceção principal',
        'A exceção do `close()` substitui a do corpo',
        'As suprimidas são descartadas sem registro',
        'Elas só existem quando há um bloco `finally`',
      ],
      respostas: [0, 1],
      explicacao: 'Suprimir é anexar, não descartar: a principal continua sendo a do corpo, e o `printStackTrace` mostra as outras numa seção própria.',
    },
    {
      id: 'pleno-t1-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class R implements AutoCloseable {
        String n;
        R(String n, boolean falha) {
            if (falha) throw new IllegalStateException("não abriu " + n);
            this.n = n;
            System.out.print("abriu " + n + "; ");
        }
        public void close() { System.out.print("fechou " + n + "; "); }
    }

    public static void main(String[] args) {
        try (R a = new R("a", false); R b = new R("b", true)) {
            System.out.print("corpo; ");
        } catch (IllegalStateException e) {
            System.out.print(e.getMessage());
        }
        System.out.println();
    }
}`,
      opcoes: [
        '`abriu a; fechou a; não abriu b`',
        '`abriu a; não abriu b`',
        '`abriu a; corpo; fechou a; não abriu b`',
        '`abriu a; fechou a; fechou b; não abriu b`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O segundo recurso falha ao ser criado, então o corpo nem roda. Só os recursos que chegaram a abrir são fechados, e então o `catch` trata a exceção.',
    },
    {
      id: 'pleno-t1-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como o `javac` implementa o try-with-resources?',
      opcoes: [
        'Traduzindo-o para `try`/`finally` com uma variável que guarda a exceção principal e chama `addSuppressed` com a do fechamento',
        'Com uma instrução própria da JVM que fecha recursos',
        'Registrando os recursos no coletor de lixo para fechamento automático',
        'Chamando `close()` só se nenhuma exceção acontecer',
      ],
      resposta: 0,
      explicacao: 'É açúcar sintático. O código gerado também confere se o recurso é `null` antes de fechar, e recursos aninhados viram blocos aninhados, o que dá a ordem inversa.',
    },
  ],
};

export default episodio;
