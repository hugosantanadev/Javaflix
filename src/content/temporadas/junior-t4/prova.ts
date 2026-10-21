import type { Exercicio } from '../../types';

/** Prova da temporada Júnior T4: interfaces e enums. */
const prova: Exercicio[] = [
  {
    id: 'junior-t4-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `interface Pagavel {
    double total();
}

class Fatura implements Pagavel {
    double total() { return 100; }
}`,
    opcoes: [
      'Não compila: a implementação precisa ser `public`',
      'Compila',
      'Não compila: falta `@Override`',
      'Compila, mas `total()` não implementa a interface',
      'Não compila: interfaces não podem ter métodos que devolvem `double`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'O método da interface é implicitamente `public`, e a implementação sem modificador teria acesso de pacote, mais restrito.',
  },
  {
    id: 'junior-t4-prova-q02',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais interfaces compilam? Escolha três.',
    opcoes: [
      '`interface A { int X = 1; static int y() { return X; } }`',
      '`interface B { private static void p() { } default void q() { p(); } }`',
      '`interface C extends Runnable, Comparable<String> { }`',
      '`interface D { final void f(); }`',
      '`interface E { default void g(); }`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Constantes, métodos `static`, `private static` e a herança de várias interfaces são válidos. Métodos de interface não podem ser `final`, e um `default` precisa ter corpo.',
  },
  {
    id: 'junior-t4-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `interface A { default String f() { return "A"; } }
interface B extends A { default String f() { return "B" + A.super.f(); } }

class Base { public String f() { return "Base"; } }
class X extends Base implements B { }
class Y implements B { }

System.out.println(new X().f() + " " + new Y().f());`,
    opcoes: ['`Base BA`', '`BA BA`', '`Base B`', '`BBase BA`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Em `X`, o método herdado da classe `Base` vence o `default`. Em `Y`, vale o `default` de `B`, que pode chamar o de `A` porque `A` é a superinterface direta de `B`.',
  },
  {
    id: 'junior-t4-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `Function<String, Integer> tam = String::length;
Predicate<Integer> par = n -> n % 2 == 0;
Supplier<String> s = () -> "javaflix";
System.out.println(par.test(tam.apply(s.get())) + " " + tam.andThen(n -> n * 2).apply("abc"));`,
    opcoes: ['`true 6`', '`false 6`', '`true 3`', '`true 9`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '"javaflix" tem 8 letras, par. Depois, `andThen` aplica o tamanho de "abc" (3) e então dobra: 6.',
  },
  {
    id: 'junior-t4-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `interface Conversor {
    double converter(double v);
    String nome();
}

Conversor c = v -> v * 2;`,
    opcoes: [
      'Não compila: `Conversor` não é uma interface funcional',
      'Compila, e `nome()` devolve `null`',
      'Compila, e a lambda implementa os dois métodos',
      'Não compila: falta `@FunctionalInterface`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'Uma lambda implementa um único método. Com dois métodos abstratos, a interface não é funcional, e a lambda não tem como implementar `nome()`.',
  },
  {
    id: 'junior-t4-prova-q06',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `enum Nota { DO, RE, MI, FA, SOL }

Nota n = Nota.valueOf("MI");
System.out.println(n.ordinal() + " " + Nota.values()[n.ordinal() + 2] + " " + n.compareTo(Nota.DO));`,
    resposta: '2 SOL 2',
    explicacao: '`MI` tem ordinal 2; duas posições depois está `SOL`. O `compareTo` de enum devolve a diferença entre os ordinais: 2 - 0.',
  },
  {
    id: 'junior-t4-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `enum Unidade {
    METRO(1.0), KM(1000.0);

    private final double fator;

    protected Unidade(double fator) {
        this.fator = fator;
    }
}`,
    opcoes: [
      'Não compila: o construtor de um enum não pode ser `protected`',
      'Compila',
      'Não compila: enums não podem ter campos `final`',
      'Compila, mas nenhuma constante pode ser usada',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'O construtor de enum é sempre `private`. Escrever `private` explicitamente compila; `public` e `protected` não.',
  },
  {
    id: 'junior-t4-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `enum Sinal {
    VERDE, VERMELHO;

    static {
        System.out.print("static ");
    }

    Sinal() {
        System.out.print(name() + " ");
    }
}

System.out.print("inicio ");
Sinal s = Sinal.VERMELHO;
System.out.println(s.ordinal());`,
    opcoes: [
      '`inicio VERDE VERMELHO static 1`',
      '`inicio static VERDE VERMELHO 1`',
      '`static VERDE VERMELHO inicio 1`',
      '`inicio VERMELHO static 1`',
      '`inicio VERDE VERMELHO 1`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O enum é inicializado no primeiro uso. As constantes são os primeiros campos `static` declarados, então são criadas antes do bloco `static`, na ordem do código.',
  },
  {
    id: 'junior-t4-prova-q09',
    tipo: 'lacuna',
    dificuldade: 1,
    enunciado: 'Complete com o método do `Predicate`. O programa deve imprimir `true`.',
    codigo: `import java.util.function.Predicate;

public class Filtro {
    public static void main(String[] args) {
        Predicate<String> curta = s -> s.length() <= 3;
        System.out.println(curta.___("sol"));
    }
}`,
    respostas: ['test'],
    saida: 'true',
    explicacao: '`Predicate` recebe um valor e devolve um `boolean` pelo método `test`. "sol" tem 3 letras.',
  },
  {
    id: 'junior-t4-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `interface Imposto {
    double TAXA = 0.1;

    double base();

    default double imposto() {
        return arredondar(base() * TAXA);
    }

    static double arredondar(double v) {
        return Math.round(v * 100) / 100.0;
    }
}

class Servico implements Imposto {
    public double base() { return 123.456; }
}

System.out.println(new Servico().imposto() + " " + Imposto.arredondar(1.005) + " " + Servico.TAXA);`,
    opcoes: [
      '`12.35 1.0 0.1`',
      '`12.35 1.01 0.1`',
      '`12.34 1.0 0.1`',
      'Não compila: `Servico.TAXA` não existe',
      'Não compila: `arredondar` precisa ser chamado por `Servico`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Constantes de interface são herdadas pelas classes, ao contrário dos métodos `static`. E 1,005 não é exato em binário: vale um pouco menos, e o arredondamento vai para 1.0.',
  },
  {
    id: 'junior-t4-prova-q11',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `import java.util.List;

public class Soma {
    public static void main(String[] args) {
        int total = 0;
        List<Integer> nums = List.of(1, 2, 3);
        for (int n : nums) {
            total += n;
        }
        Runnable r = () -> System.out.println(total);
        r.run();
    }
}`,
    resposta: 10,
    explicacao: '`total` é alterada no laço, então não é efetivamente final, e a lambda não pode capturá-la. Uma cópia `final int t = total;` antes da lambda resolveria.',
  },
  {
    id: 'junior-t4-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `enum Bebida {
    CAFE { public String toString() { return "café"; } },
    CHA;

    double preco() {
        return switch (this) {
            case CAFE -> 5.0;
            case CHA -> 4.0;
        };
    }
}

for (Bebida b : Bebida.values()) {
    System.out.print(b + "=" + b.preco() + " ");
}
System.out.println();`,
    opcoes: [
      '`café=5.0 CHA=4.0`',
      '`CAFE=5.0 CHA=4.0`',
      '`café=5.0 chá=4.0`',
      'Não compila: o `switch` não tem `default`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Só `CAFE` sobrescreveu o `toString`. O `switch` sobre `this` cobre todas as constantes, então dispensa o `default`.',
  },
  {
    id: 'junior-t4-prova-q13',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual interface funcional recebe dois valores do mesmo tipo e devolve um valor desse tipo?',
    opcoes: ['`BinaryOperator<T>`', '`BiFunction<T, U, R>`', '`BiPredicate<T, U>`', '`UnaryOperator<T>`', '`Supplier<T>`'],
    resposta: 0,
    explicacao: '`BinaryOperator<T>` é uma `BiFunction<T, T, T>`. `UnaryOperator` recebe um valor só, e `BiPredicate` devolve `boolean`.',
  },
  {
    id: 'junior-t4-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `interface Som { default String tocar() { return "som"; } }
interface Musica extends Som { default String tocar() { return "música"; } }

abstract class Instrumento implements Som {
    public abstract String tocar();
}

class Violao extends Instrumento implements Musica {
    public String tocar() { return "dlim + " + Musica.super.tocar(); }
}

Som s = new Violao();
System.out.println(s.tocar());`,
    opcoes: ['`dlim + música`', '`dlim + som`', '`música`', 'Não compila: `Instrumento` não pode tornar `tocar()` abstrato'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Uma classe abstrata pode redeclarar como abstrato um método `default`. `Violao` implementa e, como implementa `Musica` diretamente, pode chamar `Musica.super.tocar()`.',
  },
  {
    id: 'junior-t4-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais destas interfaces da biblioteca são funcionais? Escolha três.',
    opcoes: ['`Runnable`', '`Comparator<T>`', '`Predicate<T>`', '`List<E>`', '`Map<K, V>`'],
    respostas: [0, 1, 2],
    explicacao: '`Runnable` tem só `run()`; `Comparator`, só `compare` (o `equals` repete `Object` e não conta); `Predicate`, só `test`. `List` e `Map` têm dezenas de métodos abstratos.',
  },
  {
    id: 'junior-t4-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `interface Ligar { default String acao() { return "ligar"; } }
interface Desligar { default String acao() { return "desligar"; } }

class Interruptor implements Ligar, Desligar {
    public String estado() { return "?"; }
}`,
    opcoes: [
      'Não compila: `Interruptor` precisa sobrescrever `acao()`',
      'Compila, e `acao()` devolve "ligar"',
      'Compila, e `acao()` devolve "desligar"',
      'Não compila: uma classe não pode implementar duas interfaces',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: 'As duas interfaces não têm relação, e nenhuma regra decide entre os dois `default`. A classe precisa sobrescrever, e pode usar `Ligar.super.acao()`.',
  },
  {
    id: 'junior-t4-prova-q17',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `enum Medalha { OURO, PRATA, BRONZE }

Map<Medalha, Integer> quadro = new EnumMap<>(Medalha.class);
quadro.put(Medalha.BRONZE, 3);
quadro.put(Medalha.OURO, 1);
quadro.put(Medalha.PRATA, 2);
quadro.put(Medalha.OURO, quadro.get(Medalha.OURO) + 4);
System.out.println(quadro);`,
    resposta: '{OURO=5, PRATA=2, BRONZE=3}',
    explicacao: 'O `EnumMap` mantém as chaves na ordem de declaração do enum, não na ordem de inserção. O último `put` de `OURO` substitui o valor.',
  },
  {
    id: 'junior-t4-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `UnaryOperator<String> a = s -> s + "a";
UnaryOperator<String> b = s -> s + "b";
Function<String, String> ab = a.andThen(b);
Function<String, String> ba = a.compose(b);
System.out.println(ab.apply("x") + " " + ba.apply("x"));`,
    opcoes: ['`xab xba`', '`xab xab`', '`xba xab`', '`xba xba`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`a.andThen(b)` aplica `a` e depois `b`. `a.compose(b)` aplica `b` primeiro e depois `a`.',
  },
  {
    id: 'junior-t4-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `interface Config {
    String NOME;
    int versao();
}`,
    opcoes: [
      'Não compila: o campo de interface precisa de valor',
      'Compila, e `NOME` vale `null`',
      'Compila, e cada classe define o seu `NOME`',
      'Não compila: interfaces não podem ter campos `String`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 2 },
    explicacao: 'Campos de interface são `static final` e precisam ser inicializados na declaração. Não há construtor nem bloco que possa fazê-lo depois.',
  },
  {
    id: 'junior-t4-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `interface Rotulado {
    String rotulo();
}

enum Tamanho implements Rotulado {
    P("pequeno"), G("grande");

    private final String texto;

    Tamanho(String texto) {
        this.texto = texto;
    }

    public String rotulo() {
        return name() + "/" + texto;
    }
}

Rotulado r = Tamanho.valueOf("G");
System.out.println(r.rotulo() + " " + (r instanceof Tamanho) + " " + (r == Tamanho.G));`,
    opcoes: ['`G/grande true true`', '`G/grande true false`', '`grande true true`', 'Não compila: enums não implementam interfaces'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O enum implementa a interface, e a constante pode ser guardada numa variável do tipo dela. O `valueOf` devolve a constante única `G`, então o `==` dá `true`.',
  },
];

export default prova;
