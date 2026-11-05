import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t1-e06',
  minutos: 13,
  aula,
  armadilhas: [
    'O método sobrescrito pode declarar menos exceções, subclasses das originais ou qualquer unchecked.',
    'Ele não pode declarar checked novas nem mais amplas que as do método original.',
    'A regra vale também para métodos de interface e métodos abstratos.',
    'A chamada pela referência da superclasse exige tratar o que a superclasse declara, mesmo que o objeto não lance.',
    'Pela referência da subclasse, valem só as exceções que a subclasse declara.',
    'O construtor da subclasse precisa declarar as checked do construtor da superclasse, ou uma mais ampla.',
    'Lambdas não podem lançar checked se o método da interface funcional não as declarar.',
    'Exceções unchecked ficam fora de todas essas regras.',
  ],
  ia: {
    uso:
      'Neste assunto, a IA serve bem para explicar uma mensagem como `overridden method does not throw Exception` e para listar o que uma sobrescrita pode declarar. Ela erra ao aplicar aos construtores a regra dos métodos, que ali é a inversa, e ao propor lambdas que lançam checked em interfaces de `java.util.function`.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui as classes e a mensagem do javac>\n- Para cada método sobrescrito e cada construtor, diga quais exceções checked ele pode declarar e por quê.\n- Explique qual cláusula throws o compilador usa em cada chamada, pelo tipo da referência.\n- Corrija sem trocar tudo por RuntimeException e sem acrescentar throws Exception no main.\n- Termine com dois trechos parecidos, um de sobrescrita e um de construtor, para eu dizer se compilam.',
    erros: [
      'Diz que o construtor da subclasse pode declarar menos exceções que o da superclasse, como acontece com métodos.',
      'Escreve uma lambda de `Function` ou `Consumer` que lança uma checked, o que não compila.',
      'Afirma que a chamada pela referência da superclasse dispensa o `try` quando o objeto é de uma subclasse que não lança nada.',
      'Sugere `@SneakyThrows` ou o truque de genéricos para fugir da regra, sem avisar que o `catch` de quem chama deixa de funcionar.',
    ],
    conferir: [
      'Compile cada versão: todas as regras desta aula são de compilação.',
      'Use `Ctrl+U` no IntelliJ para ver o `throws` do método original.',
      'Para lambdas, abra a interface funcional e leia a assinatura do método abstrato dela.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Overriding and Hiding Methods',
      url: 'https://dev.java/learn/language/oop/inheritance/overriding/',
      tipo: 'documentacao',
      porque: 'As regras de sobrescrita, incluindo a cláusula `throws`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.8.3: Requirements in Overriding and Hiding',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.8.3',
      tipo: 'documentacao',
      porque: 'A regra exata sobre exceções checked na sobrescrita.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 11.2.3: Exception Checking',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html#jls-11.2.3',
      tipo: 'documentacao',
      porque: 'Como o compilador confere construtores, inicializadores e chamadas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 4.7.5: The Exceptions Attribute',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.7.5',
      tipo: 'documentacao',
      porque: 'Onde a cláusula `throws` fica no arquivo `.class`, e por que a JVM não a confere.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Exception Handling in Java',
      url: 'https://www.baeldung.com/java-exceptions',
      tipo: 'artigo',
      porque: 'A seção sobre exceções e herança resume o que a subclasse pode declarar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Exceções pt 05, Lançando exceção checked',
      url: 'https://www.youtube.com/watch?v=Gc5SIWgcsYI',
      tipo: 'video',
      porque: 'Declarar e propagar exceções checked, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Exceções pt 04, Lançando exceção unchecked',
      url: 'https://www.youtube.com/watch?v=M7CU5TOOmTc',
      tipo: 'video',
      porque: 'Por que as unchecked ficam fora das regras de declaração, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Checked vs. Unchecked Exceptions in Java Tutorial',
      url: 'https://www.youtube.com/watch?v=bCPClyGsVhc',
      tipo: 'video',
      porque: 'A regra de tratar ou declarar, base de tudo o que este episódio combina.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os exemplos de sobrescrita com exceções que aparecem nas questões.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Understanding Exceptions", parte "Overriding Methods with Exceptions"',
    },
  ],
  desafio: {
    titulo: 'Repositórios intercambiáveis',
    enunciado:
      'Crie a exceção checked `RepositorioException` e a subclasse `ConexaoException`, e a interface `Repositorio`, com `String buscar(int id) throws RepositorioException`. Implemente: `EmMemoria`, que não declara exceção nenhuma; `Remoto`, que declara e lança `ConexaoException("servidor fora do ar")`; e `ComReserva`, que tenta um repositório principal e, em caso de erro, usa um `EmMemoria`, sem declarar exceção. Rode com:\n\n```java\nEmMemoria memoria = new EmMemoria();\nSystem.out.println(memoria.buscar(1));\nRepositorio[] repos = {memoria, new Remoto(), new ComReserva(new Remoto())};\nfor (Repositorio r : repos) {\n    try {\n        System.out.println(r.getClass().getSimpleName() + ": " + r.buscar(2));\n    } catch (RepositorioException e) {\n        System.out.println(r.getClass().getSimpleName() + " falhou: " + e.getMessage());\n    }\n}\n```\n\nSaída esperada:\n\n```text\nAna\nEmMemoria: Bia\nRemoto falhou: servidor fora do ar\nComReserva: Bia (reserva: servidor fora do ar)\n```',
    dicas: [
      '`memoria.buscar(1)` não precisa de `try`, porque a referência é do tipo `EmMemoria`, que não declara exceção.',
      'No laço, a referência é `Repositorio`, e o `catch` é obrigatório.',
      'Em `ComReserva`, capture `RepositorioException`, que também pega a `ConexaoException`.',
    ],
    solucao: `import java.util.Map;

public class Repositorios {
    static class RepositorioException extends Exception {
        RepositorioException(String m) { super(m); }
    }

    static class ConexaoException extends RepositorioException {
        ConexaoException(String m) { super(m); }
    }

    interface Repositorio {
        String buscar(int id) throws RepositorioException;
    }

    static class EmMemoria implements Repositorio {
        private final Map<Integer, String> dados = Map.of(1, "Ana", 2, "Bia");

        @Override
        public String buscar(int id) {
            return dados.getOrDefault(id, "desconhecido");
        }
    }

    static class Remoto implements Repositorio {
        @Override
        public String buscar(int id) throws ConexaoException {
            throw new ConexaoException("servidor fora do ar");
        }
    }

    static class ComReserva implements Repositorio {
        private final Repositorio principal;
        private final EmMemoria reserva = new EmMemoria();

        ComReserva(Repositorio principal) {
            this.principal = principal;
        }

        @Override
        public String buscar(int id) {
            try {
                return principal.buscar(id);
            } catch (RepositorioException e) {
                return reserva.buscar(id) + " (reserva: " + e.getMessage() + ")";
            }
        }
    }

    public static void main(String[] args) {
        EmMemoria memoria = new EmMemoria();
        System.out.println(memoria.buscar(1));
        Repositorio[] repos = {memoria, new Remoto(), new ComReserva(new Remoto())};
        for (Repositorio r : repos) {
            try {
                System.out.println(r.getClass().getSimpleName() + ": " + r.buscar(2));
            } catch (RepositorioException e) {
                System.out.println(r.getClass().getSimpleName() + " falhou: " + e.getMessage());
            }
        }
    }
}`,
    saida: 'Ana\nEmMemoria: Bia\nRemoto falhou: servidor fora do ar\nComReserva: Bia (reserva: servidor fora do ar)',
    comentarios:
      'As três implementações usam as três liberdades da regra: não declarar nada, declarar uma subclasse e tratar internamente. Quem usa a interface precisa tratar `RepositorioException`; quem tem a referência concreta de `EmMemoria`, não. É o mesmo raciocínio do polimorfismo: o compilador confia no tipo da variável.',
  },
  bugs: [
    {
      id: 'pleno-t1-e06-b01',
      dificuldade: 1,
      sintoma: 'A nova exportação em PDF não compila: `exportar(String) in ExportadorPdf cannot override exportar(String) in Exportador`, com a observação `overridden method does not throw Exception`.',
      codigo: `import java.io.IOException;

public class Exportacao {
    static class Exportador {
        String exportar(String relatorio) throws IOException {
            return relatorio + ".csv";
        }
    }

    static class ExportadorPdf extends Exportador {
        @Override
        String exportar(String relatorio) throws Exception {
            return relatorio + ".pdf";
        }
    }

    public static void main(String[] args) throws IOException {
        Exportador e = new ExportadorPdf();
        System.out.println(e.exportar("vendas-outubro"));
    }
}`,
      linha: 12,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.io.IOException;

public class Exportacao {
    static class Exportador {
        String exportar(String relatorio) throws IOException {
            return relatorio + ".csv";
        }
    }

    static class ExportadorPdf extends Exportador {
        @Override
        String exportar(String relatorio) throws IOException {
            return relatorio + ".pdf";
        }
    }

    public static void main(String[] args) throws IOException {
        Exportador e = new ExportadorPdf();
        System.out.println(e.exportar("vendas-outubro"));
    }
}`,
      saidaCorrigida: 'vendas-outubro.pdf',
      dica: 'O que o método original promete lançar? A versão sobrescrita pode prometer mais que isso?',
      explicacao:
        'Um método sobrescrito não pode declarar uma checked mais ampla que a do original. O código que usa um `Exportador` se preparou só para `IOException`; um `ExportadorPdf` que lançasse qualquer `Exception` quebraria essa promessa. Declare `IOException`, uma subclasse dela, ou nada.',
    },
    {
      id: 'pleno-t1-e06-b02',
      dificuldade: 2,
      sintoma: 'A classe `Planilha` não compila, e o `javac` aponta a chamada ao construtor da superclasse: `unreported exception IOException; must be caught or declared to be thrown`.',
      codigo: `import java.io.IOException;

public class Planilhas {
    static class Arquivo {
        final String nome;

        Arquivo(String nome) throws IOException {
            if (nome.isBlank()) throw new IOException("nome de arquivo vazio");
            this.nome = nome;
        }
    }

    static class Planilha extends Arquivo {
        Planilha(String nome) { super(nome); }

        String completo() {
            return nome + ".xlsx";
        }
    }

    public static void main(String[] args) {
        try {
            System.out.println(new Planilha("notas").completo());
            System.out.println(new Planilha(" ").completo());
        } catch (Exception e) {
            System.out.println("não criou: " + e.getMessage());
        }
    }
}`,
      linha: 14,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.io.IOException;

public class Planilhas {
    static class Arquivo {
        final String nome;

        Arquivo(String nome) throws IOException {
            if (nome.isBlank()) throw new IOException("nome de arquivo vazio");
            this.nome = nome;
        }
    }

    static class Planilha extends Arquivo {
        Planilha(String nome) throws IOException { super(nome); }

        String completo() {
            return nome + ".xlsx";
        }
    }

    public static void main(String[] args) {
        try {
            System.out.println(new Planilha("notas").completo());
            System.out.println(new Planilha(" ").completo());
        } catch (Exception e) {
            System.out.println("não criou: " + e.getMessage());
        }
    }
}`,
      saidaCorrigida: 'notas.xlsx\nnão criou: nome de arquivo vazio',
      dica: 'Quem chama o construtor de `Arquivo`? Dá para pôr essa chamada dentro de um `try`?',
      explicacao:
        'Com construtores, a regra se inverte: o da subclasse chama o da superclasse com `super(...)`, que precisa ser a primeira instrução e não pode ficar num `try`. Por isso ele precisa declarar as checked do construtor da superclasse, ou uma mais ampla. Num método sobrescrito, ao contrário, declarar menos é sempre permitido.',
    },
    {
      id: 'pleno-t1-e06-b03',
      dificuldade: 3,
      sintoma: 'A importação deveria pular os arquivos com problema e seguir com os outros, mas para no segundo com `IOException: formato não suportado: vendas.xls`, saindo de um método sem nenhum `throws`.',
      codigo: `import java.io.IOException;

public class Importacao {
    @SuppressWarnings("unchecked")
    static <E extends Throwable> void lancar(Throwable t) throws E {
        throw (E) t;
    }

    static void importar(String arquivo) {
        if (arquivo.endsWith(".xls")) Importacao.<RuntimeException>lancar(new IOException("formato não suportado: " + arquivo));
        System.out.println("importado " + arquivo);
    }

    public static void main(String[] args) {
        for (String arquivo : new String[] {"clientes.csv", "vendas.xls", "estoque.csv"}) {
            try {
                importar(arquivo);
            } catch (RuntimeException e) {
                System.out.println("pulando " + arquivo + ": " + e.getMessage());
            }
        }
    }
}`,
      linha: 18,
      efeito: { tipo: 'excecao', nome: 'IOException' },
      correcao: `import java.io.IOException;

public class Importacao {
    @SuppressWarnings("unchecked")
    static <E extends Throwable> void lancar(Throwable t) throws E {
        throw (E) t;
    }

    static void importar(String arquivo) {
        if (arquivo.endsWith(".xls")) Importacao.<RuntimeException>lancar(new IOException("formato não suportado: " + arquivo));
        System.out.println("importado " + arquivo);
    }

    public static void main(String[] args) {
        for (String arquivo : new String[] {"clientes.csv", "vendas.xls", "estoque.csv"}) {
            try {
                importar(arquivo);
            } catch (Exception e) {
                System.out.println("pulando " + arquivo + ": " + e.getMessage());
            }
        }
    }
}`,
      saidaCorrigida: 'importado clientes.csv\npulando vendas.xls: formato não suportado: vendas.xls\nimportado estoque.csv',
      dica: '`importar` não declara exceções checked, mas usa um truque de genéricos para lançar. Uma `IOException` é uma `RuntimeException`?',
      explicacao:
        'O método genérico `lancar` engana o compilador, o *sneaky throw*: para o `javac`, ele lança `RuntimeException`, mas na execução sai a `IOException` intacta, porque a regra das checked não existe na JVM. Como `IOException` não é `RuntimeException`, o `catch` não a pega. Bibliotecas que escondem checked assim, como o `@SneakyThrows` do Lombok, exigem `catch (Exception e)` de quem chama, ou melhor, que não escondam.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t1-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O método original declara `throws IOException`. O que a versão sobrescrita pode declarar?',
      opcoes: [
        'Nada, `IOException`, uma subclasse dela ou exceções unchecked',
        'Qualquer exceção checked',
        'Obrigatoriamente `IOException`',
        'Só exceções mais amplas, como `Exception`',
      ],
      resposta: 0,
      explicacao: 'A subclasse pode prometer menos problemas, nunca mais. Unchecked não entram na conta.',
      dica: 'Pense no que o código que usa o tipo mais geral se preparou para tratar.',
    },
    {
      id: 'pleno-t1-e06-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.io.IOException;

public class T {
    static class Base {
        String f() throws IOException { return "base"; }
    }
    static class Sub extends Base {
        @Override String f() { return "sub"; }
    }

    public static void main(String[] args) throws IOException {
        Base b = new Sub();
        Sub s = new Sub();
        System.out.println(b.f() + " " + s.f());
    }
}`,
      resposta: 'sub sub',
      explicacao: 'Os dois objetos são `Sub`, e a versão sobrescrita roda nos dois casos. O `throws` do `main` cobre a chamada pela referência `Base`.',
      dica: 'Qual versão de `f` roda em cada chamada, se o objeto é o mesmo tipo?',
    },
    {
      id: 'pleno-t1-e06-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.FileNotFoundException;
import java.io.IOException;

class Base {
    void abrir() throws FileNotFoundException { }
}

class Sub extends Base {
    @Override
    void abrir() throws IOException { }
}`,
      opcoes: [
        'Não compila: `IOException` é mais ampla que `FileNotFoundException`',
        'Compila',
        'Compila, mas `@Override` é ignorado',
        'Não compila: métodos sobrescritos não podem declarar exceções',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Quem chama `Base.abrir()` só se preparou para `FileNotFoundException`. A subclasse não pode ampliar o que a superclasse prometeu.',
      dica: '`IOException` é mais ampla que `FileNotFoundException`.',
    },
    {
      id: 'pleno-t1-e06-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`class A { void f() throws Exception { } } class B extends A { void f() throws java.io.IOException { } }`',
        '`class A { void f() throws java.io.IOException { } } class B extends A { void f() throws RuntimeException { } }`',
        '`class A { void f() { } } class B extends A { void f() throws IllegalStateException { } }`',
        '`class A { void f() { } } class B extends A { void f() throws Exception { } }`',
        '`class A { void f() throws java.io.IOException { } } class B extends A { void f() throws Exception { } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Restringir a checked e trocá-la por unchecked são permitidos, assim como acrescentar unchecked. Acrescentar ou ampliar checked não.',
      dica: 'Procure as sobrescritas que ampliam ou acrescentam uma checked.',
    },
    {
      id: 'pleno-t1-e06-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    static class Conexao {
        void abrir() throws Exception { }
    }
    static class ConexaoLocal extends Conexao {
        @Override void abrir() { }
    }

    public static void main(String[] args) {
        ConexaoLocal local = new ConexaoLocal();
        local.abrir();
        Conexao c = local;
        c.abrir();
    }
}`,
      opcoes: [
        'Não compila: a chamada pela referência `Conexao` precisa tratar `Exception`',
        'Compila',
        'Não compila: `ConexaoLocal.abrir()` precisa declarar `throws Exception`',
        'Compila, mas lança exceção na segunda chamada',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 13 },
      explicacao: 'O compilador olha o `throws` do tipo da referência. Pela `ConexaoLocal`, não há exceção; pela `Conexao`, há, mesmo sendo o mesmo objeto.',
      dica: 'O compilador olha o `throws` do tipo da referência.',
    },
    {
      id: 'pleno-t1-e06-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o tipo capturado. O programa deve imprimir `não achou dados.txt`.',
      codigo: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Leitura {
    static class Fonte {
        String ler() throws IOException { return "fonte"; }
    }
    static class Arquivo extends Fonte {
        @Override
        String ler() throws FileNotFoundException {
            throw new FileNotFoundException("dados.txt");
        }
    }

    public static void main(String[] args) {
        Arquivo a = new Arquivo();
        try {
            a.ler();
        } catch (___ e) {
            System.out.println("não achou " + e.getMessage());
        }
    }
}`,
      respostas: ['FileNotFoundException', 'IOException', 'Exception'],
      saida: 'não achou dados.txt',
      explicacao: 'Pela referência `Arquivo`, basta tratar `FileNotFoundException`, a exceção que essa versão declara. Tipos mais amplos também servem.',
      dica: 'O `catch` aceita a exceção lançada ou qualquer superclasse dela.',
    },
    {
      id: 'pleno-t1-e06-q07',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha em que o compilador acusa o erro.',
      codigo: `import java.io.IOException;

class Conexao {
    Conexao() throws IOException {
        System.out.println("conectando");
    }
}

class ConexaoSegura extends Conexao {
    ConexaoSegura() {
        System.out.println("segura");
    }
}`,
      resposta: 10,
      explicacao: 'O construtor de `ConexaoSegura` chama `super()` implicitamente, e esse construtor pode lançar `IOException`. Como não dá para tratar a chamada ao `super`, o construtor precisa declarar a exceção.',
      dica: 'O construtor da subclasse chama o da superclasse, que declara uma checked.',
    },
    {
      id: 'pleno-t1-e06-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    interface Tarefa {
        void executar() throws Exception;
    }

    public static void main(String[] args) {
        Tarefa ok = () -> System.out.print("ok ");
        Tarefa falha = () -> { throw new java.io.IOException("io"); };
        for (Tarefa t : new Tarefa[] {ok, falha}) {
            try {
                t.executar();
            } catch (Exception e) {
                System.out.print(e.getClass().getSimpleName() + " ");
            }
        }
        System.out.println();
    }
}`,
      opcoes: ['`ok IOException`', 'Não compila: lambdas não lançam checked', '`ok`', '`IOException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O método da interface declara `throws Exception`, então a lambda pode lançar uma checked. Quem chama `executar()` precisa tratar.',
      dica: '`Tarefa.executar()` declara `throws Exception`.',
    },
    {
      id: 'pleno-t1-e06-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    public static void main(String[] args) {
        Runnable r = () -> {
            throw new java.io.IOException("x");
        };
        r.run();
    }
}`,
      opcoes: [
        'Não compila: `Runnable.run()` não declara exceções checked',
        'Compila, e `run()` lança a `IOException`',
        'Compila, e a exceção é ignorada',
        'Não compila: lambdas não podem ter `throw`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: 'A lambda é a implementação de `run()`, e um método que implementa outro não pode lançar checked que o original não declara. Uma `RuntimeException` seria aceita.',
      dica: '`Runnable.run()` não declara nenhuma exceção.',
    },
    {
      id: 'pleno-t1-e06-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Ao sobrescrever um método, qual mudança na cláusula `throws` é proibida?',
      opcoes: [
        'Acrescentar uma exceção checked mais ampla que as originais',
        'Remover todas as exceções',
        'Acrescentar uma exceção unchecked',
        'Trocar a exceção por uma subclasse dela',
      ],
      resposta: 0,
      explicacao: 'Quem usa o tipo mais geral só está preparado para as exceções que ele declara. Ampliar seria uma surpresa; restringir, não.',
      dica: 'A regra protege quem usa o tipo mais geral.',
    },
    {
      id: 'pleno-t1-e06-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;

public class T {
    static class Base {
        Base() throws IOException { System.out.print("base "); }
    }
    static class Sub extends Base {
        Sub() throws Exception { System.out.print("sub "); }
    }

    public static void main(String[] args) throws Exception {
        new Sub();
        System.out.println();
    }
}`,
      opcoes: [
        '`base sub`',
        'Não compila: o construtor não pode declarar exceção mais ampla',
        '`sub base`',
        'Não compila: `Sub` precisa declarar exatamente `IOException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Construtores não são sobrescritos. O da subclasse precisa cobrir as exceções do `super()`, e `Exception` cobre `IOException`.',
      dica: 'No construtor, declarar uma exceção mais ampla é permitido.',
    },
    {
      id: 'pleno-t1-e06-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a linguagem proíbe exceções checked mais amplas num método sobrescrito?',
      opcoes: [
        'Porque o código que usa o tipo mais geral só se preparou para as exceções que ele declara',
        'Porque a JVM não consegue lançar exceções mais amplas',
        'Para melhorar o desempenho das chamadas',
        'Porque exceções mais amplas não podem ser capturadas',
      ],
      resposta: 0,
      explicacao: 'É o princípio da substituição: um objeto da subclasse precisa funcionar em qualquer lugar onde o da superclasse funcionaria, sem surpresas.',
      dica: 'Pense no código que só conhece a superclasse.',
    },
    {
      id: 'pleno-t1-e06-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static class Calculadora {
        int dividir(int a, int b) { return a / b; }
    }
    static class CalculadoraSegura extends Calculadora {
        @Override
        int dividir(int a, int b) throws ArithmeticException {
            if (b == 0) throw new ArithmeticException("divisor zero");
            return super.dividir(a, b);
        }
    }

    public static void main(String[] args) {
        Calculadora c = new CalculadoraSegura();
        try {
            System.out.println(c.dividir(10, 2));
            System.out.println(c.dividir(1, 0));
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      resposta: '5\ndivisor zero',
      explicacao: 'Declarar uma unchecked na sobrescrita é sempre permitido, mesmo que o original não declare nada. A mensagem é a da exceção lançada pela subclasse.',
      dica: 'Acrescentar uma unchecked ao `throws` é sempre permitido.',
    },
    {
      id: 'pleno-t1-e06-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Ao sobrescrever `void salvar() throws IOException`, quais declarações são permitidas? Escolha três.',
      opcoes: [
        '`void salvar()`',
        '`void salvar() throws FileNotFoundException`',
        '`void salvar() throws IOException, IllegalStateException`',
        '`void salvar() throws Exception`',
        '`void salvar() throws java.sql.SQLException`',
      ],
      respostas: [0, 1, 2],
      explicacao: '`SQLException` é uma checked sem relação com `IOException`, portanto nova. `Exception` é mais ampla. As outras três restringem ou só acrescentam unchecked.',
      dica: 'Menos exceções, exceções mais estreitas ou unchecked: tudo isso cabe.',
    },
    {
      id: 'pleno-t1-e06-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A JVM confere, na execução, se um método lança apenas as exceções checked que declara?',
      opcoes: [
        'Não: a regra é do compilador; a cláusula `throws` no `.class` não é verificada pela JVM',
        'Sim: a JVM lança `IncompatibleClassChangeError` se a regra for quebrada',
        'Sim, mas só para exceções de `java.io`',
        'Não, porque a JVM não diferencia exceções de erros',
      ],
      resposta: 0,
      explicacao: 'Para a JVM, todas as exceções são iguais. É por isso que o truque do *sneaky throw* funciona e que linguagens como Kotlin dispensam exceções checked.',
      dica: 'A cláusula `throws` vira um atributo de documentação no `.class`.',
    },
  ],
};

export default episodio;
