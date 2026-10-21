import type { Exercicio } from '../../types';

/** Prova da temporada Júnior T1: classes e objetos. */
const prova: Exercicio[] = [
  {
    id: 'junior-t1-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `class Caneta {
    String cor = "azul";
}

Caneta a = new Caneta();
Caneta b = new Caneta();
Caneta c = a;
c.cor = "preta";
b = c;
b.cor = "verde";
System.out.println(a.cor + " " + b.cor + " " + (a == b));`,
    opcoes: [
      '`verde verde true`',
      '`preta verde false`',
      '`azul verde false`',
      '`verde verde false`',
      '`preta preta true`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`c` aponta para a caneta de `a`, e depois `b` também passa a apontar para ela. As três variáveis acabam no mesmo objeto, e a última cor atribuída é "verde".',
  },
  {
    id: 'junior-t1-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Depois da última linha, quantos objetos `Caneta` estão elegíveis para a coleta de lixo?',
    codigo: `Caneta a = new Caneta();
Caneta b = new Caneta();
Caneta c = new Caneta();
a = b;
b = c;
c = null;`,
    opcoes: ['1', '0', '2', '3', 'Não é possível saber'],
    resposta: 0,
    explicacao: 'Na quarta linha, a primeira caneta perde a única referência e fica elegível. No fim, `a` aponta para a segunda e `b` para a terceira, que continuam alcançáveis.',
  },
  {
    id: 'junior-t1-prova-q03',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `public class Bolo {
    static String log = "";

    static {
        log += "s";
    }

    {
        log += "i";
    }

    Bolo() {
        this(1);
        log += "a";
    }

    Bolo(int camadas) {
        log += "b" + camadas;
    }

    public static void main(String[] args) {
        log += "m";
        new Bolo();
        new Bolo(2);
        System.out.println(log);
    }
}`,
    resposta: 'smib1aib2',
    explicacao: 'O bloco `static` roda antes do `main`. No primeiro `new`, o construtor sem parâmetros delega para `Bolo(int)`, que recebe o bloco de instância: "i", "b1" e, de volta, "a". O segundo objeto faz "i" e "b2". O bloco de instância roda uma vez por objeto.',
  },
  {
    id: 'junior-t1-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado?',
    codigo: `class Livro {
    String titulo;

    Livro(String titulo) {
        this.titulo = titulo;
    }
}

public class Estante {
    public static void main(String[] args) {
        Livro a = new Livro("Java");
        Livro b = new Livro();
        System.out.println(a.titulo + b.titulo);
    }
}`,
    opcoes: [
      'Não compila na linha 12',
      'Imprime `Javanull`',
      'Imprime `Java`',
      'Lança `NullPointerException`',
      'Não compila na linha 4',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 12 },
    explicacao: 'Como `Livro` declara um construtor, o compilador não cria o padrão. Não existe `Livro()`.',
  },
  {
    id: 'junior-t1-prova-q05',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais classes compilam? Escolha três.',
    opcoes: [
      '`class A { int x; static int dobro(A a) { return a.x * 2; } }`',
      '`class B { static int y; int ler() { return y; } }`',
      '`class C { static final int Z = 1; static { System.out.println(Z); } }`',
      '`class D { int w; static int ler() { return w; } }`',
      '`class E { static void f() { this.g(); } void g() { } }`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Um método `static` pode usar membros de instância por meio de uma referência, como em `A`. Métodos de instância usam membros `static` livremente. `D` e `E` tentam usar membros de instância e `this` num contexto `static`.',
  },
  {
    id: 'junior-t1-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Visita {
    static int total;
    int ordem;

    Visita() {
        ordem = ++total;
    }

    public static void main(String[] args) {
        Visita v = null;
        for (int i = 0; i < 3; i++) {
            v = new Visita();
        }
        Visita nula = null;
        System.out.println(v.ordem + " " + nula.total);
    }
}`,
    opcoes: ['`3 3`', 'Lança `NullPointerException`', '`3 0`', 'Não compila', '`1 3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`v` termina apontando para o terceiro objeto, de ordem 3. `nula.total` é um acesso `static`: o compilador usa só o tipo da variável, e o `null` nunca é consultado.',
  },
  {
    id: 'junior-t1-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class Sabor {
    static final String NOME = "limão";
    static int pedidos = registrar();

    static int registrar() {
        System.out.print("[Sabor] ");
        return 0;
    }
}

public class Sorveteria {
    public static void main(String[] args) {
        System.out.print(Sabor.NOME + " ");
        Sabor.pedidos++;
        System.out.println(Sabor.pedidos);
    }
}`,
    opcoes: [
      '`limão [Sabor] 1`',
      '`[Sabor] limão 1`',
      '`limão 1`',
      '`[Sabor] limão 0`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`NOME` é uma constante de compilação, copiada para `Sorveteria`: ler o valor não inicializa `Sabor`. O acesso a `pedidos`, que não é constante, é que dispara a inicialização, e o `registrar` imprime nesse momento.',
  },
  {
    id: 'junior-t1-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A classe `pacote1.A` declara `int x` (sem modificador), `protected int y` e `public int z`. A classe `pacote2.B` estende `A`. Num método de instância de `B`, quais campos podem ser lidos com `this.x`, `this.y` e `this.z`?',
    opcoes: ['Só `y` e `z`', 'Só `z`', '`x`, `y` e `z`', 'Só `y`', 'Nenhum'],
    resposta: 0,
    explicacao: 'O acesso de pacote não alcança subclasses de outros pacotes. `protected` alcança, por `this` ou por referências do tipo da subclasse, e `public` alcança qualquer um.',
  },
  {
    id: 'junior-t1-prova-q09',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais classes **não** compilam? Escolha duas.',
    opcoes: [
      '`class A { final int x; }`',
      '`class B { final int y; B() { y = 1; } B(int v) { this(); } }`',
      '`class C { final int z = 1; void mudar() { z++; } }`',
      '`class D { static final int W; static { W = 4; } }`',
      '`class E { final StringBuilder sb = new StringBuilder(); void f() { sb.append("x"); } }`',
    ],
    respostas: [0, 2],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: '`A` nunca dá valor ao `final`, e `C` tenta mudá-lo. `B` é válida porque `B(int)` delega para `B()`, que atribui. Em `E`, o `final` impede trocar a referência, não alterar o objeto.',
  },
  {
    id: 'junior-t1-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `class Produto {
    String nome = "sem nome";
    double preco;

    Produto(String nome, double preco) {
        nome = nome.toUpperCase();
        this.preco = preco;
    }
}

Produto p = new Produto("mesa", 300);
System.out.println(p.nome + " " + p.preco);`,
    opcoes: [
      '`sem nome 300.0`',
      '`MESA 300.0`',
      '`mesa 300.0`',
      '`sem nome 300`',
      '`null 300.0`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Sem `this`, `nome` é o parâmetro: o construtor só troca o valor da variável local. O campo fica com o inicializador. `preco` é `double`, impresso com o `.0`.',
  },
  {
    id: 'junior-t1-prova-q11',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `public class Carteira {
    private int moedas;

    Carteira(int moedas) {
        this.moedas = moedas;
    }

    void roubar(Carteira vitima, int qtd) {
        vitima.moedas -= qtd;
        moedas += qtd;
    }

    public static void main(String[] args) {
        Carteira a = new Carteira(10);
        Carteira b = new Carteira(20);
        a.roubar(b, 5);
        b.roubar(a, 1);
        System.out.println(a.moedas + " " + b.moedas);
    }
}`,
    resposta: '14 16',
    explicacao: 'O `private` é por classe: uma carteira mexe no campo de outra. Depois da primeira chamada, as duas têm 15; na segunda, uma moeda passa de `a` para `b`.',
  },
  {
    id: 'junior-t1-prova-q12',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `public class Placar {
    private int pontos;
    private static int recorde;

    void marcar(int n) {
        pontos += n;
        if (pontos > recorde) recorde = pontos;
    }

    static void zerar() {
        recorde = 0;
        pontos = 0;
    }
}`,
    resposta: 12,
    explicacao: '`zerar` é `static` e não tem objeto: de qual placar seriam os `pontos`? O método de instância `marcar`, ao contrário, usa o `recorde` `static` sem problema.',
  },
  {
    id: 'junior-t1-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual afirmação sobre a coleta de lixo é verdadeira?',
    opcoes: [
      'Um objeto elegível pode nunca ser coletado, se o programa terminar antes',
      'Chamar `System.gc()` garante que todos os objetos elegíveis sejam coletados',
      '`finalize()` é sempre chamado antes de o objeto ser coletado',
      'Um objeto é coletado assim que a última referência a ele vira `null`',
      'Objetos que se referenciam mutuamente nunca são coletados',
    ],
    resposta: 0,
    explicacao: 'Elegível significa que pode ser coletado. Quando, ou se, isso acontece é decisão da JVM; `System.gc()` é só uma sugestão, e ilhas de objetos inalcançáveis são coletáveis.',
  },
  {
    id: 'junior-t1-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    int a = 2;

    Teste() {
        a *= b;
    }

    {
        a += 1;
    }

    int b = a * 2;

    public static void main(String[] args) {
        Teste t = new Teste();
        System.out.println(t.a + " " + t.b);
    }
}`,
    opcoes: ['`18 6`', '`12 4`', '`0 6`', '`3 6`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Na ordem do código: `a` = 2, o bloco o leva a 3, e `b` = 6. Só então o corpo do construtor roda, mesmo estando escrito antes: 3 × 6 = 18. No construtor, ler `b` é permitido; a regra da referência adiantada vale só para inicializadores.',
  },
  {
    id: 'junior-t1-prova-q15',
    tipo: 'lacuna',
    dificuldade: 1,
    enunciado: 'Complete para que o construtor de um parâmetro reaproveite o de dois. O programa deve imprimir `16`.',
    codigo: `public class Retangulo {
    int largura, altura;

    Retangulo(int lado) {
        ___(lado, lado);
    }

    Retangulo(int largura, int altura) {
        this.largura = largura;
        this.altura = altura;
    }

    public static void main(String[] args) {
        Retangulo r = new Retangulo(4);
        System.out.println(r.largura * r.altura);
    }
}`,
    respostas: ['this'],
    saida: '16',
    explicacao: '`this(...)` chama outro construtor da mesma classe, escolhido pelos argumentos. Com dois `int`, é o de largura e altura.',
  },
  {
    id: 'junior-t1-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `class Porta implements AutoCloseable {
    String id;

    Porta(String id) {
        this.id = id;
        System.out.print("abre " + id + "; ");
    }

    public void close() {
        System.out.print("fecha " + id + "; ");
    }
}

try (Porta a = new Porta("A"); Porta b = new Porta("B")) {
    System.out.print("usa; ");
}
System.out.println("fim");`,
    opcoes: [
      '`abre A; abre B; usa; fecha B; fecha A; fim`',
      '`abre A; abre B; usa; fecha A; fecha B; fim`',
      '`abre A; abre B; usa; fim`',
      '`abre A; usa; fecha A; abre B; fecha B; fim`',
      '`abre B; abre A; usa; fecha A; fecha B; fim`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os recursos abrem na ordem em que são declarados e fecham na ordem inversa, logo depois do bloco e antes da linha seguinte.',
  },
  {
    id: 'junior-t1-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Pelas regras do Java 17 e 21, qual é o resultado de compilar?',
    codigo: `class Conta {
    double saldo;

    Conta(double saldo) {
        this.saldo = saldo;
    }

    Conta() {
        System.out.println("conta nova");
        this(0);
    }
}`,
    opcoes: [
      'Não compila: `this(...)` tem de ser o primeiro comando do construtor',
      'Compila, e `new Conta()` imprime "conta nova"',
      'Não compila: construtores não podem chamar outros construtores',
      'Compila, mas `new Conta()` entra num ciclo infinito',
    ],
    resposta: 0,
    provas: ['829', '830'],
    verificar: { tipo: 'naoCompila', linha: 10 },
    explicacao: 'Até o Java 21, a chamada a `this(...)` ou `super(...)` precisa abrir o construtor. O Java 25 aceita comandos antes dela, desde que não usem o objeto, e este código compilaria.',
  },
  {
    id: 'junior-t1-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o modificador mais restritivo que ainda permite que uma subclasse em outro pacote chame o método `calcular()` herdado?',
    opcoes: ['`protected`', '`public`', 'Nenhum modificador', '`private`', '`static`'],
    resposta: 0,
    explicacao: 'Sem modificador, só o próprio pacote enxerga. `protected` acrescenta as subclasses de outros pacotes, e `public` abriria para todos, mais do que o necessário.',
  },
  {
    id: 'junior-t1-prova-q19',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `class Fragil {
    static int valor = Integer.parseInt("x");
}

public class Teste {
    public static void main(String[] args) {
        for (int i = 0; i < 2; i++) {
            try {
                System.out.println(Fragil.valor);
            } catch (Throwable t) {
                System.out.println(t.getClass().getSimpleName());
            }
        }
    }
}`,
    resposta: 'ExceptionInInitializerError\nNoClassDefFoundError',
    explicacao: 'Na primeira tentativa, o `parseInt` falha dentro da inicialização da classe, e a JVM embrulha a exceção num `ExceptionInInitializerError`. A classe fica marcada como com defeito, e a segunda tentativa recebe `NoClassDefFoundError`.',
  },
  {
    id: 'junior-t1-prova-q20',
    tipo: 'saida',
    dificuldade: 1,
    enunciado: 'Digite a saída exata.',
    codigo: `class Registro {
    int numero;
    boolean ativo;
    String nome;
    double[] notas;
}

Registro r = new Registro();
System.out.println(r.numero + " " + r.ativo + " " + r.nome + " " + r.notas);`,
    resposta: '0 false null null',
    explicacao: 'Campos recebem o valor padrão do tipo. Um array também é uma referência, e começa `null`: nenhum array é criado até alguém fazer `new`.',
  },
];

export default prova;
