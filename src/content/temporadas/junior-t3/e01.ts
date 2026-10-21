import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t3-e01',
  minutos: 14,
  aula,
  armadilhas: [
    'Uma classe estende exatamente uma outra; sem `extends`, estende `Object`.',
    'Membros `private` da superclasse existem no objeto, mas a subclasse não pode usá-los pelo nome.',
    'Construtores não são herdados.',
    'Sem `super(...)` explícito, o compilador insere `super()` no início de todo construtor.',
    'Se a superclasse não tem construtor sem parâmetros, a subclasse precisa chamar `super(args)`, inclusive quando não declara construtor nenhum.',
    'Um construtor tem no máximo uma chamada explícita: `this(...)` ou `super(...)`.',
    'Na criação, os construtores rodam de cima para baixo: `Object`, depois a superclasse, depois a subclasse.',
    'Classes `final`, como `String`, não podem ser estendidas.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Inheritance',
      url: 'https://dev.java/learn/language/oop/inheritance/what-is-inheritance/',
      tipo: 'documentacao',
      porque: 'O que uma subclasse herda, o que pode acrescentar e o que acontece com os membros `private`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Polymorphism, Using the Keyword super',
      url: 'https://dev.java/learn/language/oop/inheritance/polymorphism/#using-the-keyword-super',
      tipo: 'documentacao',
      porque: '`super` para membros e para construtores, com a cadeia de construtores até `Object`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.8.7: Constructor Body',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8.7',
      tipo: 'documentacao',
      porque: 'A regra que insere `super()` automaticamente quando não há chamada explícita.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Inheritance',
      url: 'https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html',
      tipo: 'documentacao',
      porque: 'A hierarquia de classes da plataforma e o exemplo clássico da bicicleta de montanha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Inheritance in Java',
      url: 'https://www.baeldung.com/java-inheritance',
      tipo: 'artigo',
      porque: 'Herança de classes e de interfaces, com o que é e o que não é herdado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the super Java Keyword',
      url: 'https://www.baeldung.com/java-super',
      tipo: 'artigo',
      porque: 'Os dois usos de `super`, no construtor e nos membros.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 37, Orientação a Objetos: Herança',
      url: 'https://www.youtube.com/watch?v=MOXLCjL4Ik4',
      tipo: 'video',
      porque: 'Herança do zero, com uma hierarquia de exemplo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 38, Herança: Palavra chave super',
      url: 'https://www.youtube.com/watch?v=aRPal-8z4RQ',
      tipo: 'video',
      porque: 'O `super` nos construtores e nos métodos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Herança pt 04, Construtores',
      url: 'https://www.youtube.com/watch?v=64GcJDKN4mI',
      tipo: 'video',
      porque: 'A cadeia de construtores e o erro da superclasse sem construtor padrão, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que herança é delicada e por que construtores nunca devem chamar métodos que podem ser sobrescritos.',
      gratuito: false,
      idioma: 'en',
      onde: 'Item 18, "Favor composition over inheritance", e Item 19, "Design and document for inheritance or else prohibit it"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de construtores na herança, com a tabela do que o compilador insere.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Class Design": seções "Understanding Inheritance" e "Declaring Constructors", parte "Calling Parent Constructors with super()"',
    },
  ],
  desafio: {
    titulo: 'Funcionários e gerentes',
    enunciado:
      'Crie `Funcionario`, com nome e salário `protected final`, cujo construtor recusa salário negativo com `IllegalArgumentException("salário negativo")`, e um método `descrever()`. Crie `Gerente`, que estende `Funcionario`, acrescenta o tamanho da equipe e reaproveita a descrição da superclasse com `super.descrever()`. Rode com:\n\n```java\nFuncionario ana = new Funcionario("Ana", 5000);\nGerente bia = new Gerente("Bia", 9000, 4);\nSystem.out.println(ana.descrever());\nSystem.out.println(bia.descrever());\ntry {\n    new Gerente("Caio", -1, 2);\n} catch (IllegalArgumentException e) {\n    System.out.println("Erro: " + e.getMessage());\n}\n```\n\nSaída esperada:\n\n```text\nAna ganha 5000.0\nBia ganha 9000.0 e lidera 4 pessoas\nErro: salário negativo\n```',
    dicas: [
      'O construtor de `Gerente` começa com `super(nome, salario)`.',
      'A validação fica só em `Funcionario`: todo gerente passa por ela.',
      '`super.descrever()` devolve o texto da superclasse; acrescente o resto.',
    ],
    solucao: `class Funcionario {
    protected final String nome;
    protected final double salario;

    Funcionario(String nome, double salario) {
        if (salario < 0) {
            throw new IllegalArgumentException("salário negativo");
        }
        this.nome = nome;
        this.salario = salario;
    }

    String descrever() {
        return nome + " ganha " + salario;
    }
}

class Gerente extends Funcionario {
    private final int equipe;

    Gerente(String nome, double salario, int equipe) {
        super(nome, salario);
        this.equipe = equipe;
    }

    String descrever() {
        return super.descrever() + " e lidera " + equipe + " pessoas";
    }
}

public class Empresa {
    public static void main(String[] args) {
        Funcionario ana = new Funcionario("Ana", 5000);
        Gerente bia = new Gerente("Bia", 9000, 4);
        System.out.println(ana.descrever());
        System.out.println(bia.descrever());
        try {
            new Gerente("Caio", -1, 2);
        } catch (IllegalArgumentException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}`,
    saida: 'Ana ganha 5000.0\nBia ganha 9000.0 e lidera 4 pessoas\nErro: salário negativo',
    comentarios:
      'A regra do salário vive num lugar só, e nenhum gerente escapa dela, porque o `super(...)` é obrigatório. Os campos `final` da superclasse são atribuídos no construtor dela, e a subclasse não consegue alterá-los, só lê-los, por serem `protected`. `super.descrever()` evita duplicar o formato da descrição: se ele mudar em `Funcionario`, muda para os gerentes também.',
  },
  exercicios: [
    {
      id: 'junior-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas classes uma classe Java pode estender diretamente?',
      opcoes: ['Exatamente uma', 'Quantas quiser', 'Duas', 'Nenhuma, se não declarar `extends`'],
      resposta: 0,
      explicacao: 'Java tem herança simples de classes. Sem `extends`, a classe estende `Object`, que é a única sem superclasse.',
    },
    {
      id: 'junior-t3-e01-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `class A {
    A() { System.out.print("A"); }
}

class B extends A {
    B() { System.out.print("B"); }
}

class C extends B {
    C() { System.out.print("C"); }
}

new C();
System.out.println();`,
      resposta: 'ABC',
      explicacao: 'Cada construtor chama o da superclasse antes de executar o próprio corpo. A chamada sobe até `Object`, e os corpos rodam na descida: `A`, `B`, `C`.',
    },
    {
      id: 'junior-t3-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `class Pessoa {
    String nome;

    Pessoa(String nome) {
        this.nome = nome;
    }
}

class Aluno extends Pessoa {
    int matricula;
}`,
      opcoes: [
        'Não compila: o construtor padrão de `Aluno` chama `super()`, que não existe',
        'Compila, e `Aluno` herda o construtor `Pessoa(String)`',
        'Compila, e `new Aluno()` deixa `nome` com `null`',
        'Não compila: `Aluno` não pode ter campos novos',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Sem construtor declarado, `Aluno` ganha o padrão, que chama `super()`. Como `Pessoa` só tem o construtor com `String`, a chamada não encontra destino.',
    },
    {
      id: 'junior-t3-e01-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Pai {
    String log = "p";

    Pai() {
        log += "P";
    }
}

class Filho extends Pai {
    Filho() {
        log += "F";
    }

    {
        log += "f";
    }
}

System.out.println(new Filho().log);`,
      opcoes: ['`pPfF`', '`pfPF`', '`fpPF`', '`pPFf`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O nível `Pai` termina inteiro antes: inicializador do campo e construtor ("pP"). Depois, o nível `Filho`: o bloco de instância e, por fim, o corpo do construtor ("fF").',
    },
    {
      id: 'junior-t3-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Uma subclasse em outro pacote herda o que, da superclasse? Escolha duas.',
      opcoes: [
        'Os métodos `public` e `protected`',
        'Os campos `protected`',
        'Os construtores',
        'O acesso aos campos `private`',
        'Os membros sem modificador de acesso',
      ],
      respostas: [0, 1],
      explicacao: 'A subclasse herda o que pode acessar. Fora do pacote, membros de pacote não são visíveis; `private` nunca é; e construtores não são herdados em caso nenhum.',
    },
    {
      id: 'junior-t3-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o livro reaproveite o construtor de `Produto`. O programa deve imprimir `Dom Casmurro - Machado`.',
      codigo: `class Produto {
    String nome;

    Produto(String nome) {
        this.nome = nome;
    }
}

class Livro extends Produto {
    String autor;

    Livro(String nome, String autor) {
        ___(nome);
        this.autor = autor;
    }
}

public class Loja {
    public static void main(String[] args) {
        Livro l = new Livro("Dom Casmurro", "Machado");
        System.out.println(l.nome + " - " + l.autor);
    }
}`,
      respostas: ['super'],
      saida: 'Dom Casmurro - Machado',
      explicacao: '`super(nome)` chama o construtor de `Produto`. Sem ele, o compilador inseriria `super()`, que não existe nessa superclasse.',
    },
    {
      id: 'junior-t3-e01-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `class Conta {
    private double saldo = 100;
    protected String titular = "Ana";
}

class Poupanca extends Conta {
    String resumo() {
        return titular + ": " + saldo;
    }
}`,
      resposta: 8,
      explicacao: '`titular` é `protected` e pode ser usado. `saldo` é `private`: existe no objeto `Poupanca`, mas só o código de `Conta` o enxerga. Um getter em `Conta` resolveria.',
    },
    {
      id: 'junior-t3-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Saudacao {
    String ola() {
        return "Olá";
    }
}

class SaudacaoFormal extends Saudacao {
    String ola() {
        return super.ola() + ", senhor(a)";
    }

    String duas() {
        return ola() + " / " + super.ola();
    }
}

System.out.println(new SaudacaoFormal().duas());`,
      opcoes: [
        '`Olá, senhor(a) / Olá`',
        '`Olá / Olá`',
        '`Olá, senhor(a) / Olá, senhor(a)`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`ola()` sozinho chama a versão da própria classe, que já usa a da superclasse. `super.ola()` pula direto para a versão de `Saudacao`.',
    },
    {
      id: 'junior-t3-e01-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `final class Moeda {
    String codigo = "BRL";
}

class MoedaDigital extends Moeda {
}`,
      opcoes: ['Não compila', 'Compila', 'Compila, mas `MoedaDigital` não herda `codigo`', 'Não compila: falta um construtor'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: '`final` numa classe proíbe subclasses. É o que impede, por exemplo, que alguém estenda `String` e quebre a imutabilidade dela.',
    },
    {
      id: 'junior-t3-e01-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Base {
    static { System.out.print("s1 "); }
    { System.out.print("i1 "); }
    Base() { System.out.print("c1 "); }
}

class Sub extends Base {
    static { System.out.print("s2 "); }
    { System.out.print("i2 "); }
    Sub() { System.out.print("c2 "); }
}

public class Teste {
    public static void main(String[] args) {
        new Sub();
        new Sub();
        System.out.println();
    }
}`,
      opcoes: [
        '`s1 s2 i1 c1 i2 c2 i1 c1 i2 c2`',
        '`s1 i1 c1 s2 i2 c2 i1 c1 i2 c2`',
        '`s2 s1 i2 c2 i1 c1 i2 c2 i1 c1`',
        '`s1 s2 i1 i2 c1 c2 i1 i2 c1 c2`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As classes são inicializadas uma vez, da superclasse para a subclasse. Cada objeto passa por `Base` inteira (bloco e construtor) antes de `Sub`.',
    },
    {
      id: 'junior-t3-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a superclasse de uma classe declarada sem `extends`?',
      opcoes: ['`Object`', 'Nenhuma', 'A classe do `main`', '`Class`'],
      resposta: 0,
      explicacao: 'Toda classe, exceto `Object`, tem exatamente uma superclasse. Por isso todo objeto tem `toString`, `equals` e `hashCode`.',
    },
    {
      id: 'junior-t3-e01-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Forma {
    String nome;

    Forma(String nome) {
        this.nome = nome;
        System.out.print("[Forma " + nome + "]");
    }
}

class Quadrado extends Forma {
    int lado;

    Quadrado() {
        this(1);
        System.out.print("[padrão]");
    }

    Quadrado(int lado) {
        super("quadrado");
        this.lado = lado;
        System.out.print("[lado " + lado + "]");
    }
}

new Quadrado();
System.out.println();`,
      resposta: '[Forma quadrado][lado 1][padrão]',
      explicacao: 'O construtor sem parâmetros delega para `Quadrado(int)`, que chama `super`. A superclasse termina primeiro, depois o construtor de um parâmetro, e por último o que delegou.',
    },
    {
      id: 'junior-t3-e01-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`class A { A(int x) { } } class B extends A { B() { super(1); } }`',
        '`class A { A(int x) { } } class B extends A { B(int y) { super(y * 2); } }`',
        '`class A { A(int x) { } } class B extends A { }`',
        '`class A { A(int x) { } } class B extends A { B() { } }`',
        '`class A { A() { } A(int x) { } } class B extends A { }`',
      ],
      respostas: [0, 1, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Quando `A` só tem `A(int)`, todo construtor de `B` precisa chamar `super` com um argumento. Se `A` também tiver o construtor sem parâmetros, o `super()` automático funciona.',
    },
    {
      id: 'junior-t3-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um construtor pode conter `this(...)` e `super(...)` ao mesmo tempo?',
      opcoes: [
        'Não: no máximo uma chamada explícita a outro construtor',
        'Sim, desde que `super(...)` venha primeiro',
        'Sim, desde que `this(...)` venha primeiro',
        'Sim, em qualquer ordem',
      ],
      resposta: 0,
      explicacao: 'Se o construtor delega com `this(...)`, o construtor chamado é que fará o `super(...)`. Ter os dois faria a superclasse ser construída duas vezes.',
    },
    {
      id: 'junior-t3-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num objeto `Cachorro`, que estende `Animal`, onde ficam os campos declarados em `Animal`?',
      opcoes: [
        'No mesmo objeto, antes dos campos de `Cachorro`, em posições fixas',
        'Num objeto `Animal` separado, apontado pelo `Cachorro`',
        'Na classe `Animal`, compartilhados por todos os cachorros',
        'Em lugar nenhum: campos não são herdados',
      ],
      resposta: 0,
      explicacao: 'Um `new Cachorro()` cria um único objeto com os campos de toda a hierarquia. Com herança simples, os campos herdados têm sempre o mesmo deslocamento, e o código de `Animal` funciona em qualquer subclasse.',
    },
  ],
};

export default episodio;
