import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t1-e03',
  minutos: 13,
  aula,
  armadilhas: [
    'Os tipos de um multi-catch não podem ter relação de herança entre si.',
    'A variável do multi-catch é implicitamente `final` e não pode ser reatribuída.',
    'Dentro do multi-catch, o tipo da variável é o supertipo comum das alternativas.',
    '`catch (Exception e) { throw e; }` só exige declarar as checked que o `try` realmente lança.',
    'Se a variável do `catch` for reatribuída, o relançamento preciso deixa de valer.',
    'Embrulhe com a causa: `new X("contexto", e)`; a original fica em `getCause()`.',
    'Um `catch` vazio engole o problema: registre ou relance.',
    '`UncheckedIOException` embrulha uma `IOException` numa exceção unchecked.',
  ],
  ia: {
    uso:
      'Para multi-catch e relançamento, a IA é útil para explicar por que um `catch` não compila e para mostrar o stack trace com `Caused by` de um código que embrulha exceções. O ponto fraco são as regras finas da prova: ela esquece que alternativas relacionadas por herança não compilam e não conhece bem o relançamento preciso do Java 7.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui o código e, se houver, a mensagem do javac>\n- Diga se compila e, se não, qual regra do multi-catch ou do relançamento foi violada.\n- Para cada catch, diga qual é o tipo da variável e quais exceções checked o método precisa declarar.\n- Se sugerir embrulhar a exceção, passe a original como causa e explique quem vai tratá-la.\n- Não troque os tipos por catch (Exception e) só para compilar.',
    erros: [
      'Escreve `catch (FileNotFoundException | IOException e)`, que não compila.',
      'Diz que `catch (Exception e) { throw e; }` sempre obriga o método a declarar `throws Exception`.',
      'Cria a exceção nova sem passar a original como causa, e a origem some do log.',
      'Afirma que a variável do multi-catch pode ser reatribuída como a de um `catch` comum.',
    ],
    conferir: [
      'Compile o trecho: as regras do multi-catch e do relançamento são todas de compilação.',
      'Rode com a exceção acontecendo e procure a seção `Caused by` no stack trace.',
      'Use `Ctrl+Shift+P` no IntelliJ para ver o tipo que o compilador deu à variável do `catch`.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Catching and Handling Exceptions, Multi-catching Exceptions',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/catching-handling/#multi-catching-exceptions',
      tipo: 'documentacao',
      porque: 'A sintaxe do multi-catch e a regra da variável `final`, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Catching Multiple Exception Types and Rethrowing Exceptions with Improved Type Checking',
      url: 'https://docs.oracle.com/javase/8/docs/technotes/guides/language/catch-multiple.html',
      tipo: 'documentacao',
      porque: 'O texto que apresentou o multi-catch e o relançamento preciso no Java 7.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Throwing Exceptions, Chained Exceptions',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/throwing/#chained-exceptions',
      tipo: 'documentacao',
      porque: 'Como embrulhar uma exceção em outra preservando a causa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 11.2.3: Exception Checking',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html#jls-11.2.3',
      tipo: 'documentacao',
      porque: 'As regras que tornam o relançamento preciso possível.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Chained Exceptions in Java',
      url: 'https://www.baeldung.com/java-chained-exceptions',
      tipo: 'artigo',
      porque: 'Encadear exceções e ler o `Caused by` de um stack trace.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 48, Exceptions: múltiplos catch',
      url: 'https://www.youtube.com/watch?v=G8-fhwpHdFU',
      tipo: 'video',
      porque: 'Vários `catch` e o multi-catch, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Exceções pt 07, Capturando múltiplas exceções',
      url: 'https://www.youtube.com/watch?v=ibrTQmTNHQ0',
      tipo: 'video',
      porque: 'O multi-catch e a ordem dos `catch`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Tradução de exceções entre camadas e por que nunca ignorar uma exceção.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Exceptions": Item 73, "Throw exceptions appropriate to the abstraction", e Item 77, "Don\'t ignore exceptions"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de multi-catch que aparecem nas questões de "compila ou não".',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Handling Exceptions", parte "Applying a Multi-catch Block"',
    },
  ],
  desafio: {
    titulo: 'Importador de pessoas',
    enunciado:
      'Escreva `static int importar(List<String> linhas) throws ImportacaoException`, que lê linhas no formato `nome;idade`. Linhas sem idade (`ArrayIndexOutOfBoundsException`) ou com idade inválida (`NumberFormatException`) são registradas e puladas, num único multi-catch. Se houver mais erros que acertos, o método lança `ImportacaoException`, uma exceção checked própria, com a última exceção como causa. Rode com:\n\n```java\ntry {\n    System.out.println("total: " + importar(List.of("Ana;30", "Bia", "Caio;31")));\n    importar(List.of("Davi;x", "Eva"));\n} catch (ImportacaoException e) {\n    System.out.println(e.getMessage() + " | causa: " + e.getCause().getClass().getSimpleName());\n}\n```\n\nSaída esperada:\n\n```text\nimportado: Ana (30)\nlinha ignorada: "Bia" (ArrayIndexOutOfBoundsException)\nimportado: Caio (31)\ntotal: 2\nlinha ignorada: "Davi;x" (NumberFormatException)\nlinha ignorada: "Eva" (ArrayIndexOutOfBoundsException)\narquivo com erros demais: 2 de 2 | causa: ArrayIndexOutOfBoundsException\n```',
    dicas: [
      '`ImportacaoException` estende `Exception` e repassa a mensagem e a causa com `super(msg, causa)`.',
      'As duas exceções do multi-catch não têm relação de herança, então podem ficar juntas.',
      'Guarde a última exceção numa variável do tipo `RuntimeException` para usá-la como causa.',
    ],
    solucao: `import java.util.List;

public class Importador {
    static class ImportacaoException extends Exception {
        ImportacaoException(String msg, Throwable causa) {
            super(msg, causa);
        }
    }

    static int importar(List<String> linhas) throws ImportacaoException {
        int ok = 0;
        int erros = 0;
        RuntimeException ultimo = null;
        for (String linha : linhas) {
            try {
                String[] partes = linha.split(";");
                String nome = partes[0].trim();
                int idade = Integer.parseInt(partes[1].trim());
                System.out.println("importado: " + nome + " (" + idade + ")");
                ok++;
            } catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {
                erros++;
                ultimo = e;
                System.out.println("linha ignorada: \\"" + linha + "\\" (" + e.getClass().getSimpleName() + ")");
            }
        }
        if (erros > ok) {
            throw new ImportacaoException("arquivo com erros demais: " + erros + " de " + linhas.size(), ultimo);
        }
        return ok;
    }

    public static void main(String[] args) {
        try {
            System.out.println("total: " + importar(List.of("Ana;30", "Bia", "Caio;31")));
            importar(List.of("Davi;x", "Eva"));
        } catch (ImportacaoException e) {
            System.out.println(e.getMessage() + " | causa: " + e.getCause().getClass().getSimpleName());
        }
    }
}`,
    saida: 'importado: Ana (30)\nlinha ignorada: "Bia" (ArrayIndexOutOfBoundsException)\nimportado: Caio (31)\ntotal: 2\nlinha ignorada: "Davi;x" (NumberFormatException)\nlinha ignorada: "Eva" (ArrayIndexOutOfBoundsException)\narquivo com erros demais: 2 de 2 | causa: ArrayIndexOutOfBoundsException',
    comentarios:
      'Linhas ruins isoladas são toleradas: o multi-catch registra e segue. Quando o arquivo inteiro está ruim, o problema muda de natureza, e uma exceção checked própria obriga quem chama a decidir o que fazer. A causa preservada permite, no log, saber exatamente qual erro de baixo nível disparou a falha.',
  },
  bugs: [
    {
      id: 'pleno-t1-e03-b01',
      dificuldade: 1,
      sintoma: 'A leitura do arquivo de cupons parou de compilar depois que alguém juntou os dois `catch` num só: `Alternatives in a multi-catch statement cannot be related by subclassing`.',
      codigo: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Cupons {
    static String ler(String arquivo) throws IOException {
        if (!arquivo.endsWith(".csv")) throw new FileNotFoundException(arquivo);
        return "NATAL10;FRETE0";
    }

    public static void main(String[] args) {
        for (String arquivo : new String[] {"cupons.csv", "cupons.txt"}) {
            try {
                System.out.println(ler(arquivo));
            } catch (FileNotFoundException | IOException e) {
                System.out.println("sem cupons: " + e.getMessage());
            }
        }
    }
}`,
      linha: 14,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Cupons {
    static String ler(String arquivo) throws IOException {
        if (!arquivo.endsWith(".csv")) throw new FileNotFoundException(arquivo);
        return "NATAL10;FRETE0";
    }

    public static void main(String[] args) {
        for (String arquivo : new String[] {"cupons.csv", "cupons.txt"}) {
            try {
                System.out.println(ler(arquivo));
            } catch (IOException e) {
                System.out.println("sem cupons: " + e.getMessage());
            }
        }
    }
}`,
      saidaCorrigida: 'NATAL10;FRETE0\nsem cupons: cupons.txt',
      dica: 'As duas exceções da lista têm alguma relação de herança?',
      explicacao:
        '`FileNotFoundException` é subclasse de `IOException`, então listar as duas é redundante, e o compilador recusa alternativas relacionadas por herança. Basta o tipo mais geral: `catch (IOException e)` já pega o arquivo inexistente.',
    },
    {
      id: 'pleno-t1-e03-b02',
      dificuldade: 2,
      sintoma: 'Um pedido não foi salvo, e o log diz só que não foi possível salvar, sem a causa: `não foi possível salvar o pedido PED-1042 | causa: null`.',
      codigo: `import java.io.IOException;

public class Pedidos {
    static class RepositorioException extends RuntimeException {
        RepositorioException(String mensagem) {
            super(mensagem);
        }

        RepositorioException(String mensagem, Throwable causa) {
            super(mensagem, causa);
        }
    }

    static void gravar(String pedido) throws IOException {
        throw new IOException("disco cheio ao gravar " + pedido);
    }

    static void salvar(String pedido) {
        try {
            gravar(pedido);
        } catch (IOException e) {
            throw new RepositorioException("não foi possível salvar o pedido " + pedido);
        }
    }

    public static void main(String[] args) {
        try {
            salvar("PED-1042");
        } catch (RepositorioException e) {
            System.out.println(e.getMessage() + " | causa: " + e.getCause());
        }
    }
}`,
      linha: 22,
      efeito: { tipo: 'saida', saida: 'não foi possível salvar o pedido PED-1042 | causa: null' },
      correcao: `import java.io.IOException;

public class Pedidos {
    static class RepositorioException extends RuntimeException {
        RepositorioException(String mensagem) {
            super(mensagem);
        }

        RepositorioException(String mensagem, Throwable causa) {
            super(mensagem, causa);
        }
    }

    static void gravar(String pedido) throws IOException {
        throw new IOException("disco cheio ao gravar " + pedido);
    }

    static void salvar(String pedido) {
        try {
            gravar(pedido);
        } catch (IOException e) {
            throw new RepositorioException("não foi possível salvar o pedido " + pedido, e);
        }
    }

    public static void main(String[] args) {
        try {
            salvar("PED-1042");
        } catch (RepositorioException e) {
            System.out.println(e.getMessage() + " | causa: " + e.getCause());
        }
    }
}`,
      saidaCorrigida: 'não foi possível salvar o pedido PED-1042 | causa: java.io.IOException: disco cheio ao gravar PED-1042',
      dica: 'A exceção nova sabe qual exceção a provocou? Quem passou essa informação para ela?',
      explicacao:
        'A `RepositorioException` foi criada só com a mensagem, e a `IOException` original se perdeu: `getCause()` devolve `null`, e o stack trace não tem a seção `Caused by`. Ao traduzir uma exceção, passe sempre a original como causa, no construtor que recebe um `Throwable`.',
    },
    {
      id: 'pleno-t1-e03-b03',
      dificuldade: 3,
      sintoma: 'O envio deveria tentar de novo quando a rede falha, mas o programa morre na primeira falha com `RuntimeException: java.io.IOException: rede instável`.',
      codigo: `import java.io.IOException;

public class Envio {
    static int tentativas = 0;

    static void enviar() throws IOException {
        tentativas++;
        if (tentativas < 3) throw new IOException("rede instável");
    }

    static void enviarComLog() throws IOException {
        try {
            enviar();
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        while (true) {
            try {
                enviarComLog();
                System.out.println("enviado na tentativa " + tentativas);
                break;
            } catch (IOException e) {
                System.out.println("tentando de novo");
            }
        }
    }
}`,
      linha: 16,
      efeito: { tipo: 'excecao', nome: 'RuntimeException' },
      correcao: `import java.io.IOException;

public class Envio {
    static int tentativas = 0;

    static void enviar() throws IOException {
        tentativas++;
        if (tentativas < 3) throw new IOException("rede instável");
    }

    static void enviarComLog() throws IOException {
        try {
            enviar();
        } catch (Exception e) {
            System.out.println("log: " + e.getMessage());
            throw e;
        }
    }

    public static void main(String[] args) {
        while (true) {
            try {
                enviarComLog();
                System.out.println("enviado na tentativa " + tentativas);
                break;
            } catch (IOException e) {
                System.out.println("tentando de novo");
            }
        }
    }
}`,
      saidaCorrigida: 'log: rede instável\ntentando de novo\nlog: rede instável\ntentando de novo\nenviado na tentativa 3',
      dica: 'Que tipo de exceção sai de `enviarComLog` quando a rede falha? É esse o tipo que o `main` espera para tentar de novo?',
      explicacao:
        'O `catch` registrava o erro e embrulhava a `IOException` numa `RuntimeException`, e o `catch (IOException e)` do `main`, que faz a nova tentativa, nunca era alcançado. Como `e` não é reatribuída, `throw e` relança a própria `IOException`, e o método só precisa declarar `throws IOException`: é o relançamento preciso do Java 7. Embrulhe só quando quiser mudar o tipo de propósito, e confira quem trata o tipo original.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t1-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como se trata `IOException` e `TimeoutException` com o mesmo bloco?',
      opcoes: [
        '`catch (IOException | TimeoutException e)`',
        '`catch (IOException, TimeoutException e)`',
        '`catch (IOException e | TimeoutException e)`',
        '`catch (IOException || TimeoutException e)`',
      ],
      resposta: 0,
      explicacao: 'O multi-catch usa uma única barra entre os tipos e uma única variável no fim.',
      dica: 'O separador do multi-catch é um único símbolo, e a variável aparece uma vez só.',
    },
    {
      id: 'pleno-t1-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static String f(Object o) {
        try {
            String s = (String) o;
            return "" + s.charAt(5);
        } catch (ClassCastException | StringIndexOutOfBoundsException e) {
            return e.getClass().getSimpleName().substring(0, 5);
        }
    }

    public static void main(String[] args) {
        System.out.println(f("javaflix") + " " + f(1) + " " + f("oi"));
    }
}`,
      resposta: 'l Class Strin',
      explicacao: 'O caractere de índice 5 de "javaflix" é "l". O `Integer` gera `ClassCastException`, e "oi" não tem índice 5. O mesmo bloco trata as duas exceções.',
      dica: 'Cada chamada falha de um jeito diferente, ou não falha.',
    },
    {
      id: 'pleno-t1-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            Integer.parseInt("x");
        } catch (IllegalArgumentException | NumberFormatException e) {
            System.out.println("erro");
        }
    }
}`,
      opcoes: [
        'Não compila: `NumberFormatException` é subclasse de `IllegalArgumentException`',
        'Compila e imprime `erro`',
        'Compila e imprime `erro` duas vezes',
        'Não compila: multi-catch só aceita exceções checked',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Alternativas com relação de herança são redundantes, e o compilador recusa. Bastaria `catch (IllegalArgumentException e)`.',
      dica: 'Uma das duas exceções da lista é subclasse da outra.',
    },
    {
      id: 'pleno-t1-e03-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`try { Integer.parseInt("1"); } catch (NumberFormatException | NullPointerException e) { }`',
        '`try { } catch (IllegalStateException | IllegalArgumentException e) { System.out.println(e.getMessage()); }`',
        '`try { throw new java.io.IOException(); } catch (java.io.IOException | RuntimeException e) { }`',
        '`try { } catch (RuntimeException | IllegalStateException e) { }`',
        '`try { } catch (NumberFormatException | NullPointerException e) { e = null; }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Tipos sem relação de herança podem se combinar, checked ou não. `IllegalStateException` é uma `RuntimeException`, e a variável do multi-catch não aceita nova atribuição.',
      dica: 'Procure os trechos com herança na lista ou com uma checked que o `try` não lança.',
    },
    {
      id: 'pleno-t1-e03-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `import java.io.IOException;

public class T {
    static void f() throws IOException {
        try {
            throw new IOException("x");
        } catch (Exception e) {
            System.out.print("log ");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            f();
        } catch (IOException e) {
            System.out.println("main " + e.getMessage());
        }
    }
}`,
      opcoes: [
        '`log main x`',
        'Não compila: `f` precisaria declarar `throws Exception`',
        'Imprime `log` e o programa termina com a exceção',
        'Imprime `main x`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como `e` não é reatribuída, o compilador sabe que o `try` só lança `IOException` e aceita a declaração mais precisa. É o relançamento preciso do Java 7.',
      dica: 'Com `e` sem reatribuição, o compilador sabe exatamente o que o `try` lança.',
    },
    {
      id: 'pleno-t1-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o multi-catch. O programa deve imprimir `falhou: 5s`.',
      codigo: `import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Rede {
    static void conectar() throws IOException, TimeoutException {
        throw new TimeoutException("5s");
    }

    public static void main(String[] args) {
        try {
            conectar();
        } catch (IOException ___ TimeoutException e) {
            System.out.println("falhou: " + e.getMessage());
        }
    }
}`,
      respostas: ['|'],
      saida: 'falhou: 5s',
      explicacao: 'A barra vertical separa as alternativas. As duas exceções são checked e sem relação de herança.',
      dica: 'É o mesmo símbolo do ou lógico, só que um só.',
    },
    {
      id: 'pleno-t1-e03-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            Object o = "x";
            Integer i = (Integer) o;
        } catch (ClassCastException | NullPointerException e) {
            System.out.println(e.getClass().getSimpleName());
            e = new ClassCastException();
        }
    }
}`,
      resposta: 8,
      explicacao: 'A variável de um multi-catch é implicitamente `final`. Num `catch` de um tipo só, a reatribuição seria permitida.',
      dica: 'A variável do multi-catch é implicitamente `final`.',
    },
    {
      id: 'pleno-t1-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            try {
                Integer.parseInt("abc");
            } catch (NumberFormatException e) {
                throw new IllegalStateException("configuração inválida", e);
            }
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage() + " <- " + e.getCause().getClass().getSimpleName());
        }
    }
}`,
      opcoes: [
        '`configuração inválida <- NumberFormatException`',
        '`For input string: "abc" <- IllegalStateException`',
        '`configuração inválida <- null`',
        'Lança `NumberFormatException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A exceção nova carrega a original como causa. A mensagem é a da nova, e `getCause()` devolve a `NumberFormatException`.',
      dica: 'A mensagem é da exceção nova; a causa, da original.',
    },
    {
      id: 'pleno-t1-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.IOException;

public class T {
    static void f() throws IOException {
        try {
            throw new IOException("x");
        } catch (Exception e) {
            e = new IOException("y");
            throw e;
        }
    }
}`,
      opcoes: [
        'Não compila: com `e` reatribuída, o `throw e` lança uma `Exception` não declarada',
        'Compila, e `f` lança a `IOException` "y"',
        'Compila, e `f` lança a `IOException` "x"',
        'Não compila: a variável do `catch` é sempre `final`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'O relançamento preciso só vale se a variável for efetivamente final. Reatribuída, ela volta a ser só uma `Exception` para o compilador, que exige `throws Exception`.',
      dica: 'Depois da reatribuição, o compilador só sabe que `e` é uma `Exception`.',
    },
    {
      id: 'pleno-t1-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em `catch (IOException | TimeoutException e)`, qual é o tipo de `e` para o compilador?',
      opcoes: [
        'O supertipo comum das duas, `Exception`',
        '`IOException`, o primeiro listado',
        '`Throwable`, sempre',
        'Um tipo especial que tem os métodos das duas classes',
      ],
      resposta: 0,
      explicacao: 'Só os métodos do supertipo comum podem ser chamados. Para usar algo específico de uma das alternativas, seria preciso um `instanceof`.',
      dica: 'O compilador precisa de um tipo que sirva para as duas alternativas.',
    },
    {
      id: 'pleno-t1-e03-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    public static void main(String[] args) {
        int[] v = {1, 2};
        String r = "";
        for (int i = 0; i < 3; i++) {
            try {
                r += 10 / (v[i] - 1);
            } catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
                r += "!";
            }
        }
        System.out.println(r);
    }
}`,
      resposta: '!10!',
      explicacao: 'Com `i = 0`, a divisão é por zero. Com `i = 1`, 10 / 1 = 10. Com `i = 2`, o índice não existe. O multi-catch trata os dois erros do mesmo jeito, e o laço continua.',
      dica: 'Siga as três voltas do laço: um resultado normal, uma divisão por zero e um índice fora do array.',
    },
    {
      id: 'pleno-t1-e03-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que passar a exceção original como causa ao lançar uma nova?',
      opcoes: [
        'Para preservar a origem do problema no stack trace, na seção `Caused by`',
        'Porque o compilador exige',
        'Para que a exceção nova seja checked',
        'Para que o `finally` não rode',
      ],
      resposta: 0,
      explicacao: 'A exceção nova dá o contexto da camada atual; a causa guarda o detalhe técnico. Sem ela, a informação de quem realmente falhou se perde.',
      dica: 'Pense no que aparece no log quando a causa é preservada.',
    },
    {
      id: 'pleno-t1-e03-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o multi-catch são verdadeiras? Escolha duas.',
      opcoes: [
        'A variável declarada é implicitamente `final`',
        'Os tipos listados não podem ter relação de herança entre si',
        'Ele aceita no máximo dois tipos',
        'O mesmo tipo pode aparecer duas vezes na lista',
        'O bloco roda uma vez para cada tipo listado',
      ],
      respostas: [0, 1],
      explicacao: 'A lista pode ter quantos tipos forem necessários, sem repetição nem herança entre eles, e o bloco roda uma vez, para a exceção que de fato aconteceu.',
      dica: 'Duas regras do multi-catch: a variável e a relação entre os tipos.',
    },
    {
      id: 'pleno-t1-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.io.UncheckedIOException;

public class T {
    static void ler() {
        try {
            throw new IOException("sem acesso");
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public static void main(String[] args) {
        try {
            ler();
        } catch (RuntimeException e) {
            System.out.println(e.getClass().getSimpleName() + ": " + e.getCause().getMessage());
        }
    }
}`,
      opcoes: [
        '`UncheckedIOException: sem acesso`',
        '`IOException: sem acesso`',
        'Não compila: `ler` precisa declarar `throws IOException`',
        '`RuntimeException: sem acesso`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`UncheckedIOException` é uma `RuntimeException`, então `ler` não precisa de `throws`. A `IOException` original continua acessível como causa.',
      dica: 'A `UncheckedIOException` guarda a `IOException` como causa.',
    },
    {
      id: 'pleno-t1-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como um multi-catch aparece no bytecode?',
      opcoes: [
        'Um único tratador, com uma linha na tabela de exceções para cada tipo listado, todas apontando para ele',
        'O bloco duplicado, uma cópia para cada tipo',
        'Um tratador de `Throwable` com uma sequência de `instanceof`',
        'Uma instrução nova da JVM para capturar vários tipos',
      ],
      resposta: 0,
      explicacao: 'Por isso o multi-catch gera menos bytecode que dois `catch` com o mesmo corpo. Já o relançamento preciso é só análise do compilador, sem efeito no bytecode.',
      dica: 'O multi-catch não duplica código no bytecode.',
    },
  ],
};

export default episodio;
