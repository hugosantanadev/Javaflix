import type { Exercicio } from '../../types';

/** Prova da temporada Júnior T2: métodos. */
const prova: Exercicio[] = [
  {
    id: 'junior-t2-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static void f(StringBuilder a, StringBuilder b) {
        a.append("1");
        b = a;
        b.append("2");
    }

    public static void main(String[] args) {
        StringBuilder x = new StringBuilder("x");
        StringBuilder y = new StringBuilder("y");
        f(x, y);
        System.out.println(x + " " + y);
    }
}`,
    opcoes: ['`x12 y`', '`x1 y2`', '`x12 x12`', '`x1 y`', '`x y`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O parâmetro `b` passa a apontar para o mesmo objeto de `a`, e os dois `append` vão para o `StringBuilder` de `x`. A variável `y` do `main` não é afetada pela reatribuição.',
  },
  {
    id: 'junior-t2-prova-q02',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `public class T {
    static int alterar(int n, int[] v) {
        n++;
        v[0]++;
        return n;
    }

    public static void main(String[] args) {
        int n = 1;
        int[] v = {1};
        int r = alterar(n, v);
        System.out.println(n + " " + v[0] + " " + r);
    }
}`,
    resposta: '1 2 2',
    explicacao: 'O `int` é copiado, e o incremento só afeta a cópia, devolvida pelo `return`. O array é compartilhado pela referência copiada, e o incremento dentro dele é visto pelo `main`.',
  },
  {
    id: 'junior-t2-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static void m(double d) { System.out.print("double "); }
    static void m(Integer i) { System.out.print("Integer "); }
    static void m(Object o) { System.out.print("Object "); }

    public static void main(String[] args) {
        m(1);
        m('a');
        m(Integer.valueOf(2));
        m(3L);
        System.out.println();
    }
}`,
    opcoes: [
      '`double double Integer double`',
      '`Integer Object Integer Object`',
      '`double Object Integer double`',
      '`Integer double Integer Object`',
      '`double double Object double`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`int`, `char` e `long` alargam para `double` na primeira fase, antes de qualquer embrulho. O `Integer` tem versão exata.',
  },
  {
    id: 'junior-t2-prova-q04',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais classes compilam? Escolha três.',
    opcoes: [
      '`class A { void m(int a, String b) { } void m(String a, int b) { } }`',
      '`class B { void m(int... a) { } void m(int[] a) { } }`',
      '`class C { void m(long a) { } int m(int a) { return a; } }`',
      '`class D { void m(Object o) { } void m(Object p) { } }`',
      '`class E { static void m() { } void m(int x) { } }`',
    ],
    respostas: [0, 2, 4],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Ordem diferente, tipos diferentes e número diferente de parâmetros são sobrecargas válidas, mesmo com retornos e modificadores diferentes. `int...` e `int[]` são o mesmo tipo, e o nome do parâmetro não conta.',
  },
  {
    id: 'junior-t2-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado?',
    codigo: `public class T {
    static void registrar(Long id) {
        System.out.println(id);
    }

    public static void main(String[] args) {
        registrar(42);
    }
}`,
    opcoes: ['Não compila', 'Imprime `42`', 'Imprime `42L`', 'Lança `ClassCastException`'],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: 'O literal `42` é `int` e só se embrulha em `Integer`. Alargar para `long` e embrulhar em `Long` seriam duas conversões.',
  },
  {
    id: 'junior-t2-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static String m(int... v) { return "varargs"; }
    static String m(Integer a, Integer b) { return "boxing"; }
    static String m(long a, long b) { return "long"; }

    public static void main(String[] args) {
        System.out.println(m(1, 2) + " " + m(1) + " " + m(Integer.valueOf(1), Integer.valueOf(2)));
    }
}`,
    opcoes: [
      '`long varargs boxing`',
      '`boxing varargs boxing`',
      '`varargs varargs boxing`',
      '`long varargs long`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Dois `int` alargam para `long` na primeira fase. Um argumento só cabe no varargs. Dois `Integer` têm versão exata, também na primeira fase.',
  },
  {
    id: 'junior-t2-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A classe abaixo é imutável?',
    codigo: `public final class Faixa {
    private final int inicio;
    private final int fim;
    private final int[] marcas;

    public Faixa(int inicio, int fim, int[] marcas) {
        this.inicio = inicio;
        this.fim = fim;
        this.marcas = marcas.clone();
    }

    public int getInicio() { return inicio; }
    public int getFim() { return fim; }
    public int[] getMarcas() { return marcas; }
}`,
    opcoes: [
      'Não: `getMarcas` devolve o array interno, que pode ser alterado por fora',
      'Sim: todos os campos são `private final` e a classe é `final`',
      'Não: o construtor deveria ser `private`',
      'Não: campos `int` não podem ser `final`',
      'Sim: o construtor faz uma cópia do array',
    ],
    resposta: 0,
    explicacao: 'A cópia na entrada está correta, mas a saída entrega a referência do array guardado: `f.getMarcas()[0] = 99` altera a faixa. O getter também precisa devolver `marcas.clone()`.',
  },
  {
    id: 'junior-t2-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Loja {
    private int vendas;
    private static int total;

    class Caixa {
        void vender() {
            vendas++;
            total++;
        }
    }

    public static void main(String[] args) {
        Loja centro = new Loja();
        Loja bairro = new Loja();
        Loja.Caixa c1 = centro.new Caixa();
        Loja.Caixa c2 = bairro.new Caixa();
        c1.vender();
        c1.vender();
        c2.vender();
        System.out.println(centro.vendas + " " + bairro.vendas + " " + total);
    }
}`,
    opcoes: ['`2 1 3`', '`3 3 3`', '`2 1 2`', '`3 0 3`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Cada caixa pertence à loja usada no `new` e incrementa as vendas dela. O `total` é `static`, um só para todas as lojas.',
  },
  {
    id: 'junior-t2-prova-q09',
    tipo: 'linha',
    dificuldade: 3,
    enunciado: 'Clique na linha em que o compilador acusa o erro.',
    codigo: `interface Mensagem {
    String texto();
}

public class Aviso {
    public static void main(String[] args) {
        String nome = "Ana";
        Mensagem m = new Mensagem() {
            public String texto() {
                return "Olá, " + nome;
            }
        };
        nome = "Bia";
        System.out.println(m.texto());
    }
}`,
    resposta: 10,
    explicacao: 'A reatribuição da linha 13 faz `nome` deixar de ser efetivamente final, mas o erro é acusado onde a variável é capturada, dentro da classe anônima. Sem a linha 13, o código compilaria.',
  },
  {
    id: 'junior-t2-prova-q10',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `public class T {
    static int contar(Object... itens) {
        return itens.length;
    }

    public static void main(String[] args) {
        System.out.println(contar() + contar(1, "a") + contar((Object) new int[] {1, 2, 3}));
    }
}`,
    resposta: '3',
    explicacao: 'Sem argumentos, o array é vazio (0). Dois argumentos dão 2. O `int[]` com cast para `Object` vira um único elemento (1). A soma é 3.',
  },
  {
    id: 'junior-t2-prova-q11',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class T {
    static double media(double... notas, int casas) {
        return 0;
    }
}`,
    opcoes: [
      'Não compila: o varargs precisa ser o último parâmetro',
      'Compila',
      'Não compila: varargs não aceita `double`',
      'Compila, mas o método não pode ser chamado',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 2 },
    explicacao: 'Com o varargs no meio, o compilador não saberia onde terminam as notas. A assinatura correta seria `media(int casas, double... notas)`.',
  },
  {
    id: 'junior-t2-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Config {
    private static String ambiente = "dev";
    private String usuario = "ana";

    static class Leitor {
        String ler(Config c) {
            return ambiente + ":" + c.usuario;
        }
    }

    public static void main(String[] args) {
        Config c = new Config();
        ambiente = "prod";
        System.out.println(new Config.Leitor().ler(c));
    }
}`,
    opcoes: ['`prod:ana`', '`dev:ana`', 'Não compila: `Leitor` não acessa membros `private`', 'Não compila: `Leitor` precisa de um objeto `Config` para ser criado'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A aninhada estática enxerga os membros `private` da externa: o `static` direto, e o de instância por meio de um objeto recebido. Ela é criada sem objeto `Config`.',
  },
  {
    id: 'junior-t2-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static String limpar(String s) {
        s = s.trim();
        return s.toLowerCase();
    }

    public static void main(String[] args) {
        String entrada = "  OLA  ";
        limpar(entrada);
        String saida = limpar(entrada);
        System.out.println("[" + entrada + "][" + saida + "]");
    }
}`,
    opcoes: ['`[  OLA  ][ola]`', '`[ola][ola]`', '`[OLA][ola]`', '`[  OLA  ][  ola  ]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A `String` é imutável e o parâmetro é uma cópia da referência: `entrada` nunca muda. O resultado da primeira chamada é descartado; o da segunda vai para `saida`.',
  },
  {
    id: 'junior-t2-prova-q14',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Numa classe imutável, campos de quais tipos podem ser recebidos no construtor e devolvidos nos getters sem cópia defensiva? Escolha duas.',
    opcoes: ['`String`', '`Integer`', '`StringBuilder`', '`int[]`', '`ArrayList<String>`'],
    respostas: [0, 1],
    explicacao: 'Objetos imutáveis podem ser compartilhados sem risco. `StringBuilder`, arrays e `ArrayList` podem ser alterados por quem tiver a referência.',
  },
  {
    id: 'junior-t2-prova-q15',
    tipo: 'lacuna',
    dificuldade: 1,
    enunciado: 'Complete para criar o elevador do prédio. O programa deve imprimir `subindo até o 10º andar`.',
    codigo: `public class Predio {
    private int andares = 10;

    class Elevador {
        String status() {
            return "subindo até o " + andares + "º andar";
        }
    }

    public static void main(String[] args) {
        Predio p = new Predio();
        Predio.Elevador e = p.___ Elevador();
        System.out.println(e.status());
    }
}`,
    respostas: ['new'],
    saida: 'subindo até o 10º andar',
    explicacao: 'Uma classe interna é criada a partir de um objeto da externa, com a sintaxe `objeto.new Interna()`. O elevador fica ligado ao prédio `p` e enxerga os campos dele.',
  },
  {
    id: 'junior-t2-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static String f(Object o) { return "O"; }
    static String f(CharSequence c) { return "C"; }
    static String f(String s) { return "S"; }

    public static void main(String[] args) {
        CharSequence cs = "x";
        Object o = cs;
        System.out.println(f(null) + f(cs) + f(o) + f("y"));
    }
}`,
    opcoes: ['`SCOS`', '`SSSS`', '`OCOS`', 'Não compila: `f(null)` é ambíguo', '`SCSS`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`String` é um `CharSequence`, que é um `Object`: para `null`, vence o mais específico, `String`. Nas outras chamadas, vale o tipo declarado de cada expressão, não o objeto real.',
  },
  {
    id: 'junior-t2-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A classe `Main` declara duas classes anônimas, nessa ordem, no método `main`. Qual é o nome do arquivo gerado para a segunda?',
    opcoes: ['`Main$2.class`', '`Main$Anonima2.class`', '`Main.2.class`', 'Nenhum: classes anônimas não geram arquivo'],
    resposta: 0,
    explicacao: 'O compilador numera as classes anônimas de cada classe externa, a partir de 1, na ordem em que aparecem no código.',
  },
  {
    id: 'junior-t2-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static void f(Integer[] v, Integer x) {
        v[0] = v[0] + 1;
        x = x + 1;
    }

    public static void main(String[] args) {
        Integer[] v = {10};
        Integer x = 10;
        f(v, x);
        System.out.println(v[0] + " " + x);
    }
}`,
    opcoes: ['`11 10`', '`11 11`', '`10 10`', '`10 11`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os dois parâmetros são cópias de referências. A primeira linha coloca um `Integer` novo dentro do array compartilhado; a segunda só reatribui a cópia local `x`.',
  },
  {
    id: 'junior-t2-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado?',
    codigo: `public class T {
    static void m(StringBuilder sb) { }
    static void m(String s) { }

    public static void main(String[] args) {
        m(null);
    }
}`,
    opcoes: ['Não compila', 'Chama `m(String)`', 'Chama `m(StringBuilder)`', 'Lança `NullPointerException`'],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: '`null` cabe nas duas, e nem `String` é um `StringBuilder` nem o contrário: nenhuma versão é mais específica. Um cast, como `m((String) null)`, resolveria.',
  },
  {
    id: 'junior-t2-prova-q20',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `final class Vetor {
    private final int x, y;

    Vetor(int x, int y) {
        this.x = x;
        this.y = y;
    }

    Vetor somar(Vetor o) {
        return new Vetor(x + o.x, y + o.y);
    }

    Vetor escalar(int k) {
        return new Vetor(x * k, y * k);
    }

    String texto() {
        return "(" + x + ", " + y + ")";
    }
}

Vetor a = new Vetor(1, 2);
Vetor b = a.somar(new Vetor(3, 4)).escalar(2);
a.escalar(10);
System.out.println(a.texto() + " " + b.texto());`,
    resposta: '(1, 2) (8, 12)',
    explicacao: 'Cada operação devolve um vetor novo, e `a` nunca muda. `b` é (1 + 3, 2 + 4) escalado por 2. O resultado de `a.escalar(10)` foi descartado.',
  },
];

export default prova;
