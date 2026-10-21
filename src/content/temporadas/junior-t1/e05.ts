import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t1-e05',
  minutos: 14,
  aula,
  armadilhas: [
    'O bloco `static` roda uma vez, no primeiro uso ativo da classe; o de instância, a cada `new`.',
    'A classe do `main` é inicializada antes do `main`; as outras, só quando são usadas.',
    'Campos e blocos rodam na ordem do código, e todos antes do corpo do construtor, mesmo os escritos depois dele.',
    'Ler uma constante de compilação, criar um array do tipo ou declarar uma variável não inicializam a classe.',
    'Campo `final` de instância precisa de valor em todos os construtores, se não for inicializado antes.',
    '`static final` não pode ser atribuído no construtor.',
    'Ler pelo nome simples um campo declarado mais abaixo é uma referência adiantada ilegal.',
    'Exceção num inicializador `static` vira `ExceptionInInitializerError`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: More on Classes, Initializing Fields',
      url: 'https://dev.java/learn/language/oop/classes-objects/more-on-classes/#initializing-fields',
      tipo: 'documentacao',
      porque: 'Blocos `static`, blocos de instância e métodos `final` como alternativa, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Initializing Fields',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/initial.html',
      tipo: 'documentacao',
      porque: 'A versão clássica do mesmo tutorial, com exemplos curtos de cada bloco.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 12.4.1: When Initialization Occurs',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.4.1',
      tipo: 'documentacao',
      porque: 'A lista exata do que dispara e do que não dispara a inicialização de uma classe.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.6 e 8.7: Instance Initializers e Static Initializers',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.6',
      tipo: 'documentacao',
      porque: 'As regras dos dois tipos de bloco, inclusive o que eles podem lançar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.3.3: Restrictions on Field References in Initializers',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.3.3',
      tipo: 'documentacao',
      porque: 'A regra da referência adiantada, com o exemplo de `Frente.b` que compila.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 5.5: Initialization',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-5.html#jvms-5.5',
      tipo: 'documentacao',
      porque: 'O procedimento de inicialização com a trava por classe e o `ExceptionInInitializerError`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Static vs. Instance Initializer Block in Java',
      url: 'https://www.baeldung.com/java-static-instance-initializer-blocks',
      tipo: 'artigo',
      porque: 'Os dois blocos lado a lado, com a ordem de execução de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to Java Initialization',
      url: 'https://www.baeldung.com/java-initialization',
      tipo: 'artigo',
      porque: 'Do valor padrão ao construtor, passando por inicializadores e blocos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Curso Java Completo, Aula 41: Blocos de inicialização',
      url: 'https://www.youtube.com/watch?v=TB7mzmjP6WI',
      tipo: 'video',
      porque: 'O bloco de instância e a ordem em que ele roda, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Curso Java Completo, Aula 44: Bloco de inicialização',
      url: 'https://www.youtube.com/watch?v=QD3_CfitYDU',
      tipo: 'video',
      porque: 'O bloco `static` e por que ele roda uma única vez.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de ordem de inicialização numeradas, com programas que imprimem de todo lugar.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Class Design": seção "Initializing Objects", partes "Initializing Classes", "Initializing final Fields" e "Initializing Instances"',
    },
  ],
  desafio: {
    titulo: 'A ordem do boot',
    enunciado:
      'Escreva a classe `Sistema` para que o programa abaixo imprima exatamente a saída esperada. Regras: a mensagem `carregando Sistema` sai de um bloco `static`; o número de cada sistema é um campo `final`, atribuído num bloco de instância; e `Sistema()` delega para `Sistema(String modo)` com o modo `padrão`.\n\n```java\npublic class Boot {\n    public static void main(String[] args) {\n        System.out.println("main começou");\n        new Sistema();\n        new Sistema("turbo");\n        System.out.println("total: " + Sistema.criados);\n    }\n}\n```\n\nSaída esperada:\n\n```text\nmain começou\ncarregando Sistema\nSistema #1 (padrão) pronto\nSistema #2 (turbo) pronto\ntotal: 2\n```',
    dicas: [
      'A classe `Sistema` só é inicializada no primeiro `new`, depois do "main começou".',
      'O bloco de instância roda uma vez por objeto, mesmo com `this(...)` no caminho: ele entra no construtor que não delega.',
      'Use `numero = ++criados;` no bloco de instância.',
    ],
    solucao: `class Sistema {
    static int criados;
    final int numero;
    String modo;

    static {
        System.out.println("carregando Sistema");
    }

    {
        numero = ++criados;
    }

    Sistema() {
        this("padrão");
    }

    Sistema(String modo) {
        this.modo = modo;
        System.out.println("Sistema #" + numero + " (" + modo + ") pronto");
    }
}

public class Boot {
    public static void main(String[] args) {
        System.out.println("main começou");
        new Sistema();
        new Sistema("turbo");
        System.out.println("total: " + Sistema.criados);
    }
}`,
    saida: 'main começou\ncarregando Sistema\nSistema #1 (padrão) pronto\nSistema #2 (turbo) pronto\ntotal: 2',
    comentarios:
      'A classe do `main` é `Boot`; `Sistema` só é carregada e inicializada no primeiro uso, por isso a mensagem do bloco `static` aparece depois. O bloco de instância é copiado para `Sistema(String)`, o construtor que chama `super()`, e roda antes do corpo dele: quando a mensagem é impressa, `numero` já tem valor.',
  },
  exercicios: [
    {
      id: 'junior-t1-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quando roda um bloco `static { ... }`?',
      opcoes: [
        'Uma única vez, quando a classe é inicializada no primeiro uso',
        'Toda vez que um objeto da classe é criado',
        'Toda vez que um método `static` é chamado',
        'Quando o programa termina',
      ],
      resposta: 0,
      explicacao: 'Blocos `static` pertencem à classe e rodam na inicialização dela, uma vez. Blocos de instância, sem `static`, rodam a cada objeto.',
    },
    {
      id: 'junior-t1-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Ciclo {
    static {
        System.out.print("A");
    }

    {
        System.out.print("B");
    }

    Ciclo() {
        System.out.print("C");
    }

    public static void main(String[] args) {
        System.out.print("D");
        new Ciclo();
        new Ciclo();
        System.out.println();
    }
}`,
      resposta: 'ADBCBC',
      explicacao: 'O bloco `static` roda antes do `main`, porque a classe precisa ser inicializada. Depois, cada objeto roda o bloco de instância e então o construtor.',
    },
    {
      id: 'junior-t1-e05-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Valores {
    int x = 5;

    {
        x += 10;
    }

    Valores() {
        x *= 2;
    }

    {
        x -= 1;
    }

    public static void main(String[] args) {
        System.out.println(new Valores().x);
    }
}`,
      opcoes: ['`28`', '`29`', '`20`', '`14`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Inicializadores e blocos rodam na ordem do código, e todos antes do corpo do construtor, mesmo o que está escrito depois dele: 5, 15, 14. Só então o construtor dobra: 28.',
    },
    {
      id: 'junior-t1-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Pedido {
    final int numero;

    Pedido() {
    }

    Pedido(int numero) {
        this.numero = numero;
    }
}`,
      opcoes: [
        'Não compila: o construtor sem parâmetros deixa `numero` sem valor',
        'Compila, e `numero` vale 0 no construtor sem parâmetros',
        'Não compila: campos `final` precisam ser inicializados na declaração',
        'Compila, mas lança exceção ao chamar `new Pedido()`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Um `final` sem valor na declaração nem em bloco precisa ser atribuído em todos os construtores. Valor padrão não conta para campos `final`.',
    },
    {
      id: 'junior-t1-e05-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Onde um campo de instância `final int x;` pode receber o seu valor? Escolha três.',
      opcoes: [
        'Na própria declaração, como `final int x = 1;`',
        'Num bloco de inicialização de instância',
        'Em todos os construtores',
        'Num método comum, chamado depois',
        'Num bloco `static`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O valor tem de estar definido quando o objeto termina de ser construído, e uma única vez. Métodos comuns rodam depois, e o bloco `static` não tem objeto.',
    },
    {
      id: 'junior-t1-e05-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que a mensagem saia antes de `rodando`, sem criar nenhum objeto. O programa deve imprimir `carregando` e depois `rodando`.',
      codigo: `public class Carga {
    ___ {
        System.out.println("carregando");
    }

    public static void main(String[] args) {
        System.out.println("rodando");
    }
}`,
      respostas: ['static'],
      saida: 'carregando\nrodando',
      explicacao: 'O bloco `static` roda na inicialização da classe, antes do `main`. Sem `static`, seria um bloco de instância, e como nenhum objeto é criado, nunca rodaria.',
    },
    {
      id: 'junior-t1-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Juros {
    static double taxa = base * 2;
    static double base = 0.01;

    public static void main(String[] args) {
        System.out.println(taxa);
    }
}`,
      resposta: 2,
      explicacao: '`base` é declarado abaixo de `taxa`, e ler um campo pelo nome simples antes da declaração dele, num inicializador, é uma referência adiantada ilegal. Trocar as duas linhas resolve.',
    },
    {
      id: 'junior-t1-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Tabela {
    static final int LIMITE = 10;

    static {
        System.out.print("[init]");
    }
}

public class Teste {
    public static void main(String[] args) {
        System.out.print(Tabela.LIMITE);
        System.out.println();
    }
}`,
      opcoes: ['`10`', '`[init]10`', '`10[init]`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`LIMITE` é uma constante de compilação: o `javac` copia o 10 para dentro de `Teste`, e `Tabela` nem é consultada. Sem a inicialização, o bloco `static` não roda.',
    },
    {
      id: 'junior-t1-e05-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Serie {
    static int contador;
    static final int INICIO;
    final int numero;

    static {
        INICIO = 500;
        contador = INICIO;
    }

    {
        numero = ++contador;
    }

    public static void main(String[] args) {
        Serie a = new Serie();
        Serie b = new Serie();
        System.out.println(a.numero + " " + b.numero + " " + contador);
    }
}`,
      resposta: '501 502 502',
      explicacao: 'O bloco `static` define o início uma vez. Cada objeto pré-incrementa o contador compartilhado e guarda o resultado no seu `numero`.',
    },
    {
      id: 'junior-t1-e05-q10',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'A classe `C` tem um bloco `static` e uma constante `static final int X = 1;`. Quais ações disparam a inicialização de `C`? Escolha duas.',
      opcoes: [
        '`new C();`',
        'Chamar um método `static` de `C`',
        'Declarar `C c;`',
        'Criar um array: `new C[3]`',
        'Ler `C.X`',
      ],
      respostas: [0, 1],
      explicacao: 'Criar objetos e usar membros `static` que não são constantes inicializam a classe. Declarar variáveis e criar arrays não usam a classe de verdade, e a constante é copiada pelo compilador.',
    },
    {
      id: 'junior-t1-e05-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `class Falha {
    static int valor = 10 / Integer.parseInt("0");
}

public class Inicia {
    public static void main(String[] args) {
        System.out.println(Falha.valor);
    }
}`,
      opcoes: [
        'Lança `ExceptionInInitializerError`',
        'Lança `ArithmeticException` diretamente',
        'Imprime `0`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ExceptionInInitializerError' },
      explicacao: 'A divisão por zero acontece dentro do `<clinit>` de `Falha`. A JVM embrulha a `ArithmeticException` num `ExceptionInInitializerError`, e a classe fica inutilizável dali em diante.',
    },
    {
      id: 'junior-t1-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Frente {
    static int a = Frente.b + 1;
    static int b = 2;

    public static void main(String[] args) {
        System.out.println(a + " " + b);
    }
}`,
      opcoes: ['`1 2`', '`3 2`', 'Não compila', '`0 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com o nome qualificado, a regra da referência adiantada não se aplica. Quando o inicializador de `a` roda, `b` ainda tem o valor padrão, 0: `a` vale 1. Só depois `b` recebe 2.',
    },
    {
      id: 'junior-t1-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Contagem {
    static int s;
    int i;

    static {
        s++;
    }

    {
        i++;
        s++;
    }

    public static void main(String[] args) {
        Contagem a = new Contagem();
        Contagem b = new Contagem();
        System.out.println(a.i + " " + b.i + " " + s);
    }
}`,
      opcoes: ['`1 1 3`', '`1 2 3`', '`1 1 2`', '`2 2 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O bloco `static` soma 1 uma vez. O de instância roda para cada objeto: cada `i` é próprio e vale 1, e `s` recebe mais 2.',
    },
    {
      id: 'junior-t1-e05-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais classes compilam? Escolha duas.',
      opcoes: [
        '`class A { final int x; A() { x = 1; } }`',
        '`class B { static final int Y; static { Y = 2; } }`',
        '`class C { final int z; }`',
        '`class D { final int w = 1; D() { w = 2; } }`',
        '`class E { static final int V; E() { V = 3; } }`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`A` atribui no único construtor, e `B` no bloco `static`. `C` nunca atribui, `D` atribui duas vezes, e `E` tenta atribuir um `static final` no construtor, que rodaria a cada objeto.',
    },
    {
      id: 'junior-t1-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No bytecode, para onde vão os blocos `static` e os inicializadores de campos `static`?',
      opcoes: [
        'Para um método especial `<clinit>`, que a JVM executa uma vez, com uma trava por classe',
        'Para o início do método `main`',
        'Para dentro de cada construtor `<init>`',
        'Para o arquivo `.class` como valores prontos, sem código',
      ],
      resposta: 0,
      explicacao: 'O `<clinit>` reúne tudo na ordem do código. A trava garante que duas threads não inicializem a classe ao mesmo tempo. Os inicializadores de instância é que vão para os `<init>`.',
    },
  ],
};

export default episodio;
