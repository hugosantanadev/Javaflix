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
  ia: {
    uso:
      'A IA ajuda a desenhar uma hierarquia pequena e a explicar a ordem em que os construtores rodam. Use-a para revisar se uma relação é mesmo "é um", e não "tem um", antes de escrever o `extends`.',
    pedido:
      'Revise esta hierarquia de classes Java 21.\n<cole o código aqui>\n- Para cada extends, diga se a subclasse é mesmo um caso particular da superclasse, ou se composição serviria melhor.\n- Liste os campos protected e diga se poderiam ser private com um método de acesso.\n- Mostre a ordem exata de execução de construtores e inicializadores num new da classe mais baixa.',
    erros: [
      'Deixa todos os campos `protected` para as subclasses, quebrando o encapsulamento.',
      'Gera o construtor da subclasse sem `super(...)` quando a superclasse exige argumentos.',
      'Usa herança onde a relação é "tem um", como `Carro extends Motor`.',
    ],
    conferir: [
      'Compile: o `super()` que falta aparece como "constructor ... cannot be applied to given types".',
      'Imprima uma linha em cada construtor e inicializador para ver a ordem real.',
      'Leia cada `extends` em voz alta como "todo X é um Y" e veja se a frase faz sentido.',
    ],
  },
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
  bugs: [
    {
      id: 'junior-t3-e01-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: constructor Veiculo in class Veiculo cannot be applied to given types;`.',
      codigo: `class Veiculo {
    String placa;

    Veiculo(String placa) {
        this.placa = placa;
    }
}

class Moto extends Veiculo {
    Moto(String placa) { this.placa = placa; }
}

public class Garagem {
    public static void main(String[] args) {
        System.out.println(new Moto("ABC1D23").placa);
    }
}`,
      linha: 10,
      efeito: { tipo: 'naoCompila' },
      correcao: `class Veiculo {
    String placa;

    Veiculo(String placa) {
        this.placa = placa;
    }
}

class Moto extends Veiculo {
    Moto(String placa) { super(placa); }
}

public class Garagem {
    public static void main(String[] args) {
        System.out.println(new Moto("ABC1D23").placa);
    }
}`,
      saidaCorrigida: 'ABC1D23',
      dica: 'Que chamada o compilador coloca sozinho no início de todo construtor? Ela combina com algum construtor de `Veiculo`?',
      explicacao: 'Sem `super(...)` explícito, o construtor de `Moto` começa com `super()`, e `Veiculo` só tem o construtor que recebe a placa. Repassar a placa com `super(placa)` resolve e ainda deixa `Veiculo` cuidar do próprio campo.',
    },
    {
      id: 'junior-t3-e01-b02',
      dificuldade: 2,
      sintoma: 'O gato foi criado com o nome "Mia", mas a apresentação imprime `Sou null`.',
      codigo: `class Animal {
    String nome;

    String apresentar() {
        return "Sou " + nome;
    }
}

class Gato extends Animal {
    String nome;

    Gato(String nome) {
        this.nome = nome;
    }
}

public class Abrigo {
    public static void main(String[] args) {
        System.out.println(new Gato("Mia").apresentar());
    }
}`,
      linha: 10,
      efeito: { tipo: 'saida', saida: 'Sou null' },
      correcao: `class Animal {
    String nome;

    String apresentar() {
        return "Sou " + nome;
    }
}

class Gato extends Animal {
    // o campo nome vem de Animal

    Gato(String nome) {
        this.nome = nome;
    }
}

public class Abrigo {
    public static void main(String[] args) {
        System.out.println(new Gato("Mia").apresentar());
    }
}`,
      saidaCorrigida: 'Sou Mia',
      dica: 'Quantos campos chamados `nome` existem dentro de um objeto `Gato`? Qual deles `apresentar` lê?',
      explicacao: 'Declarar `nome` de novo em `Gato` cria um segundo campo, que esconde o de `Animal` dentro de `Gato`. O construtor preenche o de `Gato`, e `apresentar`, escrito em `Animal`, lê o de `Animal`, que ficou `null`. Campos não se sobrescrevem: basta usar o herdado.',
    },
    {
      id: 'junior-t3-e01-b03',
      dificuldade: 3,
      sintoma: 'Criar um `Cadastro` lança `NullPointerException` dentro de `preparar`, embora `campos` seja inicializado na declaração.',
      codigo: `import java.util.ArrayList;
import java.util.List;

class Formulario {
    Formulario() {
        preparar();
    }

    void preparar() { }
}

class Cadastro extends Formulario {
    private List<String> campos = new ArrayList<>();

    Cadastro() {
        super();
    }

    void preparar() {
        campos.add("nome");
    }

    public static void main(String[] args) {
        Cadastro c = new Cadastro();
        System.out.println(c.campos);
    }
}`,
      linha: 6,
      efeito: { tipo: 'excecao', nome: 'NullPointerException' },
      correcao: `import java.util.ArrayList;
import java.util.List;

class Formulario {
    Formulario() {
        // não chama métodos que a subclasse sobrescreve
    }

    void preparar() { }
}

class Cadastro extends Formulario {
    private List<String> campos = new ArrayList<>();

    Cadastro() {
        preparar();
    }

    void preparar() {
        campos.add("nome");
    }

    public static void main(String[] args) {
        Cadastro c = new Cadastro();
        System.out.println(c.campos);
    }
}`,
      saidaCorrigida: '[nome]',
      dica: 'Na criação de um `Cadastro`, o que roda primeiro: o construtor de `Formulario` ou o inicializador de `campos`?',
      explicacao: 'O construtor da superclasse roda antes dos inicializadores da subclasse. Quando `Formulario()` chama `preparar()`, a versão de `Cadastro` executa com `campos` ainda `null`. Construtores não devem chamar métodos que uma subclasse pode sobrescrever; a subclasse chama depois de pronta.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas classes uma classe Java pode estender diretamente?',
      opcoes: ['Exatamente uma', 'Quantas quiser', 'Duas', 'Nenhuma, se não declarar `extends`'],
      resposta: 0,
      explicacao: 'Java tem herança simples de classes. Sem `extends`, a classe estende `Object`, que é a única sem superclasse.',
      dica: 'Java tem herança simples ou múltipla de classes?',
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
      dica: 'Cada construtor chama o da superclasse antes de executar o próprio corpo.',
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
      dica: '`Aluno` não declara construtor. O que o construtor padrão chama?',
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
      dica: 'Por nível: primeiro os inicializadores de campo e de instância, depois o corpo do construtor.',
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
      dica: 'Em outro pacote, só passa o que o acesso permite: veja `public`, `protected` e o acesso de pacote.',
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
      dica: 'Qual palavra chama o construtor da superclasse?',
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
      dica: 'Qual dos dois campos de `Conta` a subclasse pode usar pelo nome?',
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
      dica: '`ola()` sem prefixo chama a versão da própria classe; `super.ola()`, a de cima.',
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
      dica: 'O que `final` numa classe impede?',
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
      dica: 'Os blocos `static` rodam uma vez só, na primeira carga, de cima para baixo.',
    },
    {
      id: 'junior-t3-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a superclasse de uma classe declarada sem `extends`?',
      opcoes: ['`Object`', 'Nenhuma', 'A classe do `main`', '`Class`'],
      resposta: 0,
      explicacao: 'Toda classe, exceto `Object`, tem exatamente uma superclasse. Por isso todo objeto tem `toString`, `equals` e `hashCode`.',
      dica: 'Existe uma classe na raiz de toda a hierarquia.',
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
      dica: '`this(1)` leva ao outro construtor, que chama `super` antes de imprimir.',
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
      dica: 'Uma subclasse sem chamada explícita recebe `super()`. Ele existe em cada `A`?',
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
      dica: 'As duas chamadas precisam ser o primeiro comando do construtor.',
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
      dica: 'Um `new` cria quantos objetos no heap?',
    },
  ],
};

export default episodio;
