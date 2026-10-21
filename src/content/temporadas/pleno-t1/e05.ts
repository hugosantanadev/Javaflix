import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t1-e05',
  minutos: 13,
  aula,
  armadilhas: [
    'Estender `Exception` cria uma checked; estender `RuntimeException`, uma unchecked.',
    'Uma exceção customizada checked entra na regra de tratar ou declarar como qualquer outra.',
    'As regras de construtor valem: se a superclasse só tem `Exceção(String)`, a subclasse precisa chamar `super(...)`.',
    '`Exception` não tem construtor que receba um `int`: a mensagem é uma `String`.',
    'Records não podem estender `Exception` nem `RuntimeException`.',
    'Não estenda `Throwable` diretamente nem `Error`.',
    'Num `catch` com hierarquia própria, a exceção mais específica vem antes.',
    'O construtor de quatro argumentos de `Throwable` desliga o stack trace e a supressão.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Throwing Exceptions, Creating Exception Classes',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/throwing/#creating-exception-classes',
      tipo: 'documentacao',
      porque: 'Quando criar uma exceção própria e como escolher a superclasse, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Creating Exception Classes',
      url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/creating.html',
      tipo: 'documentacao',
      porque: 'O exemplo da lista encadeada com uma hierarquia de exceções própria.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.RuntimeException',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/RuntimeException.html',
      tipo: 'documentacao',
      porque: 'Os construtores disponíveis, inclusive o protegido que desliga o stack trace.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Create a Custom Exception in Java',
      url: 'https://www.baeldung.com/java-new-custom-exception',
      tipo: 'artigo',
      porque: 'Exceções customizadas checked e unchecked, com causa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 52, Exceptions: criando sua própria exceção',
      url: 'https://www.youtube.com/watch?v=Xt0CpwJT5yY',
      tipo: 'video',
      porque: 'Uma exceção própria do zero, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Exceções pt 10, Exceção customizada',
      url: 'https://www.youtube.com/watch?v=3P8imoW60Uo',
      tipo: 'video',
      porque: 'Exceções customizadas com construtores e mensagens, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Prof. Gabriel Gadelha: Por que exceções de domínio devem ser RuntimeException?',
      url: 'https://www.youtube.com/watch?v=dGOE9MFnpq4',
      tipo: 'video',
      porque: 'O argumento a favor das exceções unchecked para erros de negócio, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Exceções padrão antes das customizadas e mensagens com os dados do problema.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Exceptions": Item 72, "Favor the use of standard exceptions", e Item 75, "Include failure-capture information in detail messages"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Como declarar exceções próprias e os construtores mais usados.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Recognizing Exception Classes", parte "Creating Custom Exceptions"',
    },
  ],
  desafio: {
    titulo: 'Cadastro com todos os erros',
    enunciado:
      'Crie a exceção checked `ValidacaoException`, que guarda uma lista **imutável** de mensagens de erro e tem como mensagem principal `N erro(s) de validação`. Escreva `criar(String nome, String email, int idade)`, que confere todas as regras de uma vez (nome obrigatório, e-mail com `@`, idade mínima 18) e, se houver algum erro, lança a exceção com a lista completa; senão, devolve um record `Usuario`. Rode com:\n\n```java\ntry {\n    System.out.println(criar("Ana", "ana@x.com", 30));\n    criar(" ", "ana.x.com", 15);\n} catch (ValidacaoException e) {\n    System.out.println(e.getMessage());\n    for (String erro : e.getErros()) {\n        System.out.println("- " + erro);\n    }\n}\n```\n\nSaída esperada:\n\n```text\nUsuario[nome=Ana, email=ana@x.com, idade=30]\n3 erro(s) de validação\n- nome obrigatório\n- e-mail inválido\n- idade mínima é 18\n```',
    dicas: [
      'Acumule os erros numa `ArrayList` e só lance a exceção no fim, se a lista não estiver vazia.',
      'No construtor da exceção, chame `super(erros.size() + " erro(s) de validação")` e guarde `List.copyOf(erros)`.',
      'Um usuário que recebe todos os erros de uma vez corrige tudo numa tentativa só.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Cadastro {
    static class ValidacaoException extends Exception {
        private final List<String> erros;

        ValidacaoException(List<String> erros) {
            super(erros.size() + " erro(s) de validação");
            this.erros = List.copyOf(erros);
        }

        List<String> getErros() {
            return erros;
        }
    }

    record Usuario(String nome, String email, int idade) { }

    static Usuario criar(String nome, String email, int idade) throws ValidacaoException {
        List<String> erros = new ArrayList<>();
        if (nome == null || nome.isBlank()) erros.add("nome obrigatório");
        if (email == null || !email.contains("@")) erros.add("e-mail inválido");
        if (idade < 18) erros.add("idade mínima é 18");
        if (!erros.isEmpty()) throw new ValidacaoException(erros);
        return new Usuario(nome, email, idade);
    }

    public static void main(String[] args) {
        try {
            System.out.println(criar("Ana", "ana@x.com", 30));
            criar(" ", "ana.x.com", 15);
        } catch (ValidacaoException e) {
            System.out.println(e.getMessage());
            for (String erro : e.getErros()) {
                System.out.println("- " + erro);
            }
        }
    }
}`,
    saida: 'Usuario[nome=Ana, email=ana@x.com, idade=30]\n3 erro(s) de validação\n- nome obrigatório\n- e-mail inválido\n- idade mínima é 18',
    comentarios:
      'Lançar na primeira regra quebrada obrigaria o usuário a corrigir um erro por vez. Acumular os erros e lançá-los juntos, numa exceção com dados, dá uma resposta completa, que uma API pode devolver como uma lista de problemas por campo. A lista é copiada no construtor, porque uma exceção também não deve ser alterada depois de criada.',
  },
  exercicios: [
    {
      id: 'pleno-t1-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Que classe uma exceção customizada checked deve estender?',
      opcoes: ['`Exception`', '`RuntimeException`', '`Error`', '`Throwable`'],
      resposta: 0,
      explicacao: 'Estendendo `Exception` sem passar por `RuntimeException`, ela é checked. `Throwable` e `Error` não são usados para exceções de aplicação.',
    },
    {
      id: 'pleno-t1-e05-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static class LimiteException extends RuntimeException {
        LimiteException(int limite) {
            super("limite de " + limite + " excedido");
        }
    }

    public static void main(String[] args) {
        try {
            throw new LimiteException(10);
        } catch (LimiteException e) {
            System.out.println(e.getMessage() + " | " + (e instanceof RuntimeException));
        }
    }
}`,
      resposta: 'limite de 10 excedido | true',
      explicacao: 'O construtor monta a mensagem e a repassa com `super`. Como estende `RuntimeException`, a exceção é unchecked.',
    },
    {
      id: 'pleno-t1-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    static class AcessoNegadoException extends Exception {
        AcessoNegadoException(String usuario) {
            super(usuario);
        }
    }

    static void entrar(String usuario) {
        if (usuario.isEmpty()) throw new AcessoNegadoException(usuario);
    }
}`,
      opcoes: [
        'Não compila: `entrar` lança uma checked sem declará-la',
        'Compila',
        'Não compila: exceções customizadas precisam de construtor sem parâmetros',
        'Compila, mas a exceção é tratada como unchecked',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'Por estender `Exception`, a exceção é checked. Seria preciso `static void entrar(String usuario) throws AcessoNegadoException`.',
    },
    {
      id: 'pleno-t1-e05-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`class A extends Exception { A(String m) { super(m); } }`',
        '`class B extends RuntimeException { B(String m, Throwable c) { super(m, c); } }`',
        '`class C extends Exception { }`',
        '`record D(String m) extends Exception { }`',
        '`class E extends Exception { E() { super(42); } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Uma exceção sem construtor declarado ganha o padrão, que chama `Exception()`. Records não estendem classes, e `Exception` não tem construtor com `int`.',
    },
    {
      id: 'pleno-t1-e05-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class AppException extends RuntimeException {
        AppException(String m) { super(m); }
    }
    static class DadosException extends AppException {
        DadosException(String m) { super(m); }
    }

    static void f(int i) {
        if (i == 1) throw new DadosException("dados");
        if (i == 2) throw new AppException("app");
        throw new IllegalStateException("estado");
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            try {
                f(i);
            } catch (DadosException e) {
                System.out.print("D:" + e.getMessage() + " ");
            } catch (AppException e) {
                System.out.print("A:" + e.getMessage() + " ");
            } catch (RuntimeException e) {
                System.out.print("R:" + e.getMessage() + " ");
            }
        }
        System.out.println();
    }
}`,
      opcoes: ['`D:dados A:app R:estado`', '`A:dados A:app R:estado`', '`D:dados D:app R:estado`', 'Não compila: ordem dos `catch` errada'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada exceção cai no primeiro `catch` compatível, do mais específico ao mais geral. A `IllegalStateException` não pertence à hierarquia da aplicação e só cai no último.',
    },
    {
      id: 'pleno-t1-e05-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a superclasse para que a exceção seja unchecked, já que `cancelar` não declara `throws`. O programa deve imprimir `pedido 7 já enviado`.',
      codigo: `public class Pedidos {
    static class PedidoException extends ___ {
        PedidoException(String m) {
            super(m);
        }
    }

    static void cancelar(int id) {
        throw new PedidoException("pedido " + id + " já enviado");
    }

    public static void main(String[] args) {
        try {
            cancelar(7);
        } catch (PedidoException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      respostas: ['RuntimeException', 'IllegalStateException'],
      saida: 'pedido 7 já enviado',
      explicacao: 'Qualquer `RuntimeException` serve, inclusive uma subclasse dela, como `IllegalStateException`. Com `Exception`, o método precisaria de `throws`.',
    },
    {
      id: 'pleno-t1-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Erros {
    static class ErroA extends RuntimeException { }
    record ErroB(String campo) extends RuntimeException { }
}`,
      resposta: 3,
      explicacao: 'Records não podem ter `extends`: todos já estendem `java.lang.Record`. Uma exceção precisa ser uma classe comum.',
    },
    {
      id: 'pleno-t1-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class ServicoException extends RuntimeException {
        ServicoException(String m, Throwable c) { super(m, c); }
    }

    public static void main(String[] args) {
        try {
            try {
                int[] v = new int[2];
                v[5] = 1;
            } catch (ArrayIndexOutOfBoundsException e) {
                throw new ServicoException("falha no cálculo", e);
            }
        } catch (ServicoException e) {
            System.out.println(e.getMessage() + " / " + e.getCause().getMessage());
        }
    }
}`,
      opcoes: [
        '`falha no cálculo / Index 5 out of bounds for length 2`',
        '`falha no cálculo / null`',
        '`Index 5 out of bounds for length 2 / falha no cálculo`',
        'Lança `ArrayIndexOutOfBoundsException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A exceção customizada carrega a original como causa, graças ao construtor com `Throwable`. As duas mensagens continuam acessíveis.',
    },
    {
      id: 'pleno-t1-e05-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    static class Base extends Exception {
        Base(String m) { super(m); }
    }
    static class Filha extends Base {
        Filha() { }
    }
}`,
      opcoes: [
        'Não compila: o construtor de `Filha` chama `super()`, que `Base` não tem',
        'Compila',
        'Compila, e a mensagem de `Filha` é `null`',
        'Não compila: exceções não podem ser estendidas',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'É a regra de construtores da herança: sem chamada explícita, o compilador insere `super()`. Bastaria `Filha() { super("filha"); }`.',
    },
    {
      id: 'pleno-t1-e05-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual nome segue a convenção para uma exceção customizada?',
      opcoes: ['`SaldoInsuficienteException`', '`ErroSaldo`', '`SaldoInsuficiente`', '`ExcecaoDeSaldo`'],
      resposta: 0,
      explicacao: 'Por convenção, o nome descreve o problema e termina em `Exception`, como as exceções da biblioteca.',
    },
    {
      id: 'pleno-t1-e05-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class Rapida extends RuntimeException {
        Rapida(String m) { super(m, null, false, false); }
    }

    public static void main(String[] args) {
        Rapida r = new Rapida("sem rastro");
        System.out.println(r.getMessage() + " " + r.getStackTrace().length + " " + (r.getCause() == null));
    }
}`,
      opcoes: ['`sem rastro 0 true`', '`sem rastro 2 true`', 'Não compila: o construtor de quatro argumentos é privado', '`sem rastro 0 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O construtor protegido de quatro argumentos recebe a mensagem, a causa e dois interruptores: suprimidas e stack trace gravável. Com o segundo desligado, o stack trace fica vazio.',
    },
    {
      id: 'pleno-t1-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Segundo o Effective Java, quando uma exceção deve ser checked?',
      opcoes: [
        'Quando representa uma condição da qual quem chama pode razoavelmente se recuperar',
        'Sempre que o erro for grave',
        'Quando representa um erro de programação, como um argumento nulo',
        'Nunca: exceções checked foram descontinuadas',
      ],
      resposta: 0,
      explicacao: 'Checked obrigam quem chama a pensar no problema, o que faz sentido se houver o que fazer. Erros de programação devem ser unchecked: corrige-se o código, não o `catch`.',
    },
    {
      id: 'pleno-t1-e05-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são boas práticas para exceções customizadas? Escolha duas.',
      opcoes: [
        'Oferecer um construtor que recebe a causa',
        'Guardar em campos os dados úteis para quem trata o erro',
        'Estender `Throwable` diretamente',
        'Estender `Error` para erros de negócio graves',
        'Usar a mesma mensagem genérica, como "erro", em todas',
      ],
      respostas: [0, 1],
      explicacao: 'A causa preserva a origem, e os campos permitem decidir o que fazer sem analisar o texto da mensagem. `Throwable` e `Error` não são para exceções de aplicação.',
    },
    {
      id: 'pleno-t1-e05-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static class CampoException extends RuntimeException {
        private final String campo;
        CampoException(String campo) { this.campo = campo; }
        @Override public String getMessage() { return "campo inválido: " + campo; }
    }

    public static void main(String[] args) {
        try {
            throw new CampoException("email");
        } catch (CampoException e) {
            System.out.println(e.getMessage() + " | " + e);
        }
    }
}`,
      opcoes: [
        '`campo inválido: email | T$CampoException: campo inválido: email`',
        '`campo inválido: email | T$CampoException`',
        '`null | T$CampoException: null`',
        '`campo inválido: email | CampoException: email`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `toString` de `Throwable` usa o nome da classe e o resultado de `getLocalizedMessage()`, que chama o `getMessage()` sobrescrito. O nome de uma classe aninhada leva o `$`.',
    },
    {
      id: 'pleno-t1-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que criar uma exceção é mais caro que criar um objeto comum?',
      opcoes: [
        'Porque o construtor de `Throwable` percorre a pilha de chamadas para montar o stack trace',
        'Porque exceções são alocadas fora do heap',
        'Porque cada exceção carrega uma cópia das variáveis locais',
        'Porque o `throw` precisa recompilar o método',
      ],
      resposta: 0,
      explicacao: 'O `fillInStackTrace` registra cada quadro da pilha. O `throw` em si é barato. Por isso exceções não devem ser usadas como fluxo normal num laço quente.',
    },
  ],
};

export default episodio;
