import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t1-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'Construtor não tem tipo de retorno: `void Conta() {}` é um método com o nome da classe.',
    'O construtor padrão só é criado se a classe não declarar nenhum construtor.',
    'Declarar `Pedido(int n)` faz `new Pedido()` deixar de compilar.',
    'Parâmetro com o nome do campo o esconde: `nome = nome` compila e não altera o campo.',
    'Até o Java 21, `this(...)` tem de ser o primeiro comando do construtor; o Java 25 aceita comandos antes, se não usarem o objeto.',
    'Construtores que se chamam em ciclo não compilam.',
    'Inicializadores de campo rodam uma vez, no construtor que não começa com `this(...)`.',
    '`this` não existe em métodos `static`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Providing Constructors for your Classes',
      url: 'https://dev.java/learn/language/oop/classes-objects/defining-constructors/',
      tipo: 'documentacao',
      porque: 'Construtores com e sem parâmetros e o construtor padrão, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: More on Classes, Using the this Keyword',
      url: 'https://dev.java/learn/language/oop/classes-objects/more-on-classes/#using-the-this-keyword',
      tipo: 'documentacao',
      porque: '`this` com campos escondidos por parâmetros e `this(...)` entre construtores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.8: Constructor Declarations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8',
      tipo: 'documentacao',
      porque: 'As regras oficiais, inclusive a proibição de chamadas em ciclo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.8.9: Default Constructor',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8.9',
      tipo: 'documentacao',
      porque: 'Quando o compilador cria o construtor padrão e com qual modificador de acesso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 513: Flexible Constructor Bodies',
      url: 'https://openjdk.org/jeps/513',
      tipo: 'documentacao',
      porque: 'A mudança do Java 25 que permite validar argumentos antes de `this(...)` e `super(...)`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to Constructors in Java',
      url: 'https://www.baeldung.com/java-constructors',
      tipo: 'artigo',
      porque: 'Construtor padrão, parametrizado, de cópia e encadeado, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the this Java Keyword',
      url: 'https://www.baeldung.com/java-this',
      tipo: 'artigo',
      porque: 'Todos os usos de `this`: campos, construtores, argumento e retorno.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 29, Orientação a Objetos: Construtores',
      url: 'https://www.youtube.com/watch?v=uJKcKzro9pU',
      tipo: 'video',
      porque: 'Construtores com e sem parâmetros, explicados em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 30, Orientação a Objetos: Palavra chave this',
      url: 'https://www.youtube.com/watch?v=RLzR--Pwvcs',
      tipo: 'video',
      porque: 'O `this` resolvendo a ambiguidade entre campo e parâmetro.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de construtores, do padrão ao `this(...)`, com as pegadinhas da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Class Design": seção "Declaring Constructors", partes "Creating a Constructor", "The Default Constructor" e "Calling Overloaded Constructors with this()"',
    },
  ],
  desafio: {
    titulo: 'Relógio de 24 horas',
    enunciado:
      'Crie a classe `Hora`, com `h` e `m`, e três construtores: `Hora(int h, int m)`, que lança `IllegalArgumentException` com a mensagem `hora inválida H:M` para valores fora do relógio; `Hora(int minutos)`, que converte minutos desde a meia-noite; e `Hora()`, que vale meia-noite. Os dois últimos devem reaproveitar o primeiro com `this(...)`. Acrescente `somar(int minutos)`, que devolve uma **nova** `Hora` dando a volta na meia-noite, e `formatar()`, no formato `HH:MM`. Rode com:\n\n```java\nHora a = new Hora(9, 5);\nHora b = new Hora(135);\nHora c = new Hora();\nSystem.out.println(a.formatar() + " " + b.formatar() + " " + c.formatar());\nSystem.out.println(a.somar(70).formatar() + " " + b.somar(1380).formatar());\ntry {\n    new Hora(25, 0);\n} catch (IllegalArgumentException e) {\n    System.out.println("Erro: " + e.getMessage());\n}\n```\n\nSaída esperada:\n\n```text\n09:05 02:15 00:00\n10:15 01:15\nErro: hora inválida 25:0\n```',
    dicas: [
      'A validação fica só no construtor de dois parâmetros: os outros chegam até ele.',
      '`Hora(int minutos)` é `this(minutos / 60, minutos % 60)`.',
      'Em `somar`, converta tudo para minutos e use `% (24 * 60)` para dar a volta.',
      '`String.format("%02d:%02d", h, m)` completa com zero à esquerda.',
    ],
    solucao: `class Hora {
    int h, m;

    Hora() {
        this(0);
    }

    Hora(int minutos) {
        this(minutos / 60, minutos % 60);
    }

    Hora(int h, int m) {
        if (h < 0 || h > 23 || m < 0 || m > 59) {
            throw new IllegalArgumentException("hora inválida " + h + ":" + m);
        }
        this.h = h;
        this.m = m;
    }

    Hora somar(int minutos) {
        return new Hora((h * 60 + m + minutos) % (24 * 60));
    }

    String formatar() {
        return String.format("%02d:%02d", h, m);
    }
}

public class Relogio {
    public static void main(String[] args) {
        Hora a = new Hora(9, 5);
        Hora b = new Hora(135);
        Hora c = new Hora();
        System.out.println(a.formatar() + " " + b.formatar() + " " + c.formatar());
        System.out.println(a.somar(70).formatar() + " " + b.somar(1380).formatar());
        try {
            new Hora(25, 0);
        } catch (IllegalArgumentException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}`,
    saida: '09:05 02:15 00:00\n10:15 01:15\nErro: hora inválida 25:0',
    comentarios:
      'Com a validação num único construtor, não existe caminho para criar uma hora inválida: todo `new` passa por ela. `somar` devolve um objeto novo em vez de alterar o atual, o que torna `Hora` quase imutável, uma ideia que a próxima temporada aprofunda. No Java 25, daria para validar também os minutos negativos em `Hora(int minutos)`, antes do `this(...)`.',
  },
  exercicios: [
    {
      id: 'junior-t1-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Dentro da classe `Livro`, qual declaração é um **construtor**?',
      opcoes: [
        '`Livro(String titulo) { }`',
        '`void Livro(String titulo) { }`',
        '`Livro criar(String titulo) { return null; }`',
        '`static Livro(String titulo) { }`',
      ],
      resposta: 0,
      explicacao: 'Construtor tem o nome da classe e nenhum tipo de retorno. Com `void`, é um método comum. Construtores também não podem ser `static`: eles sempre trabalham sobre um objeto novo.',
    },
    {
      id: 'junior-t1-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Jogador {
    String nome;
    int nivel = 1;

    Jogador(String nome, int nivel) {
        this.nome = nome;
        nivel = nivel;
    }
}

Jogador j = new Jogador("Rex", 5);
System.out.println(j.nome + " " + j.nivel);`,
      resposta: 'Rex 1',
      explicacao: 'Sem `this`, `nivel = nivel` atribui o parâmetro a ele mesmo. O campo fica com o valor do inicializador, 1.',
    },
    {
      id: 'junior-t1-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `class Aluno {
    String nome;

    Aluno(String nome) {
        this.nome = nome;
    }
}

Aluno a = new Aluno("Lia");
Aluno b = new Aluno();`,
      opcoes: [
        'Não compila na linha 10',
        'Compila, e `b.nome` vale `null`',
        'Não compila na linha 4',
        'Compila, mas lança exceção na linha 10',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 10 },
      explicacao: 'Como a classe declarou um construtor, o compilador não cria o padrão, sem parâmetros. Para `new Aluno()` funcionar, ele precisa ser declarado explicitamente.',
    },
    {
      id: 'junior-t1-e02-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Caixa {
    String log = "";

    Caixa() {
        this("P");
        log += "A";
    }

    Caixa(String tamanho) {
        this(tamanho, 1);
        log += "B";
    }

    Caixa(String tamanho, int qtd) {
        log += "C";
    }
}

System.out.println(new Caixa().log);`,
      opcoes: ['`CBA`', '`ABC`', '`C`', '`A`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada construtor chama o próximo antes de fazer o seu trabalho. O mais interno termina primeiro e escreve "C"; depois o de um parâmetro continua com "B", e o sem parâmetros, com "A".',
    },
    {
      id: 'junior-t1-e02-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais classes compilam? Escolha duas.',
      opcoes: [
        '`class A { A() { this(1); } A(int x) { } }`',
        '`class B { B(int x) { } }`',
        '`class C { C() { this(); } }`',
        '`class D { void D() { return 1; } }`',
        '`class E { E(int x) { System.out.println(x); this(); } E() { } }`',
      ],
      respostas: [0, 1],
      provas: ['829', '830'],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`A` encadeia construtores corretamente, e `B` é válida mesmo sem construtor sem parâmetros. `C` chama a si mesmo, um ciclo. `D` é um método `void` tentando devolver um valor. Em `E`, até o Java 21, o `this()` precisa vir primeiro.',
    },
    {
      id: 'junior-t1-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o campo receba o parâmetro. O programa deve imprimir `Teclado`.',
      codigo: `class Item {
    String nome;

    Item(String nome) {
        ___.nome = nome;
    }
}

public class Loja {
    public static void main(String[] args) {
        System.out.println(new Item("Teclado").nome);
    }
}`,
      respostas: ['this'],
      saida: 'Teclado',
      explicacao: 'Dentro do construtor, o parâmetro `nome` esconde o campo. `this.nome` é o campo do objeto que está sendo criado.',
    },
    {
      id: 'junior-t1-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Pelas regras do Java 17 e 21, clique na linha que impede o código de compilar.',
      codigo: `class Temperatura {
    double celsius;

    Temperatura(double celsius) {
        this.celsius = celsius;
    }

    Temperatura() {
        double padrao = 20.0;
        this(padrao);
    }
}`,
      resposta: 10,
      provas: ['829', '830'],
      explicacao: 'Até o Java 21, a chamada a outro construtor tem de ser o primeiro comando. Bastaria `this(20.0);`. No Java 25, este código compila, porque a linha 9 não usa o objeto em construção.',
    },
    {
      id: 'junior-t1-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Lampada {
    boolean acesa;

    void Lampada() {
        acesa = true;
    }
}

Lampada l = new Lampada();
System.out.println(l.acesa);`,
      opcoes: ['`false`', '`true`', 'Não compila', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com `void`, `Lampada()` é um método, não um construtor. O `new` usa o construtor padrão, e o método nunca é chamado: `acesa` fica com o valor padrão.',
    },
    {
      id: 'junior-t1-e02-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Contador {
    int total;

    Contador mais(int n) {
        total += n;
        return this;
    }
}

Contador c = new Contador().mais(2).mais(3);
Contador d = c.mais(5);
System.out.println(c.total + " " + d.total + " " + (c == d));`,
      resposta: '10 10 true',
      explicacao: '`mais` devolve o próprio objeto, então todas as chamadas trabalham no mesmo contador. `d` é outro nome para ele.',
    },
    {
      id: 'junior-t1-e02-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quando o compilador cria o construtor padrão de uma classe?',
      opcoes: [
        'Só quando a classe não declara nenhum construtor',
        'Sempre, além dos construtores declarados',
        'Quando nenhum construtor declarado é `public`',
        'Quando a classe tem algum campo sem inicializador',
      ],
      resposta: 0,
      explicacao: 'Qualquer construtor declarado, com qualquer lista de parâmetros, impede a criação do padrão.',
    },
    {
      id: 'junior-t1-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No Java 25, cobrado pela prova 1Z0-831, qual é o resultado?',
      codigo: `class Faixa {
    int min, max;

    Faixa(int min, int max) {
        this.min = min;
        this.max = max;
    }

    Faixa(int max) {
        if (max < 0) throw new IllegalArgumentException("negativo");
        this(0, max);
    }
}

Faixa f = new Faixa(10);
System.out.println(f.min + " " + f.max);`,
      opcoes: [
        '`0 10`',
        'Não compila: `this(...)` tem de ser o primeiro comando',
        'Lança `IllegalArgumentException`',
        '`10 0`',
      ],
      resposta: 0,
      provas: ['831'],
      verificar: { tipo: 'saida' },
      explicacao: 'O Java 25 (JEP 513) aceita comandos antes de `this(...)`, desde que não usem o objeto em construção. Validar o argumento é o uso típico. Nas versões anteriores, a resposta seria "não compila".',
    },
    {
      id: 'junior-t1-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `class Idade {
    int valor;

    Idade(int valor) {
        if (valor < 0) {
            throw new IllegalArgumentException("idade negativa");
        }
        this.valor = valor;
    }
}

Idade a = new Idade(30);
Idade b = new Idade(-1);
System.out.println(a.valor + b.valor);`,
      opcoes: [
        'Lança `IllegalArgumentException`',
        'Imprime `29`',
        'Imprime `30`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException' },
      explicacao: 'Um construtor que lança exceção impede o objeto de existir: o `new` não devolve nada, e a linha seguinte nem chega a rodar. É a forma de garantir que só existam objetos válidos.',
    },
    {
      id: 'junior-t1-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `this` são verdadeiras? Escolha duas.',
      opcoes: [
        '`this` é a referência para o objeto em que o método ou construtor está rodando',
        '`this.x` acessa o campo `x` mesmo quando um parâmetro tem o mesmo nome',
        '`this` pode ser usado dentro de um método `static`',
        '`this` pode receber outro objeto, como em `this = outro;`',
        '`this(...)` pode ser chamado de dentro de um método comum',
      ],
      respostas: [0, 1],
      explicacao: '`this` é uma referência somente leitura para o objeto atual, que não existe em contexto `static`. A forma `this(...)` só vale dentro de construtores.',
    },
    {
      id: 'junior-t1-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Teste {
    int x = 10;

    Teste() {
        this(5);
        x += 1;
    }

    Teste(int y) {
        x += y;
    }
}

System.out.println(new Teste().x);`,
      opcoes: ['`16`', '`11`', '`15`', '`6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O inicializador `x = 10` roda uma única vez, no construtor que não começa com `this(...)`: `x` vale 10, depois 15. De volta ao construtor sem parâmetros, soma 1.',
    },
    {
      id: 'junior-t1-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como um construtor aparece no bytecode gerado pelo `javac`?',
      opcoes: [
        'Como um método especial chamado `<init>`, que devolve `void`',
        'Como um método `static` chamado `new`',
        'Como um método com o nome da classe, que devolve o objeto',
        'Ele não aparece: o código vai para dentro da instrução `new`',
      ],
      resposta: 0,
      explicacao: 'O `javap -c` mostra os construtores como `<init>`. A instrução `new` só aloca; quem roda o construtor é o `invokespecial` que chama o `<init>`, e os inicializadores de campo são copiados para dentro dele.',
    },
  ],
};

export default episodio;
