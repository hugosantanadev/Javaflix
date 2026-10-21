import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t5-e05',
  minutos: 15,
  aula,
  armadilhas: [
    'Os `case` com padrões são testados em ordem; um tipo mais geral antes de um mais específico não compila (dominância).',
    'Um `case` sem guarda domina o mesmo tipo com guarda: o guardado precisa vir antes.',
    'Todo `switch` com padrões precisa ser exaustivo, inclusive o `switch` comando.',
    'Uma hierarquia selada coberta por completo dispensa o `default`.',
    'Sem `case null`, um `switch` que recebe `null` lança `NullPointerException`; o `default` não pega `null`.',
    'A guarda é escrita com `when`, não com `&&`.',
    'Num record pattern, o número e a ordem dos componentes precisam bater com o record.',
    'O padrão sem nome `_` é do Java 22: vale para a prova 1Z0-831, não para a 830.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Using Pattern Matching, Pattern Matching for Switch',
      url: 'https://dev.java/learn/language/fp/pattern-matching/#pattern-matching-for-switch',
      tipo: 'documentacao',
      porque: 'Padrões de tipo no `switch`, guardas e record patterns, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Pattern Matching for switch Expressions and Statements',
      url: 'https://docs.oracle.com/en/java/javase/21/language/pattern-matching-switch.html',
      tipo: 'documentacao',
      porque: 'O guia oficial, com as regras de dominância, exaustividade e `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Record Patterns',
      url: 'https://docs.oracle.com/en/java/javase/21/language/record-patterns.html',
      tipo: 'documentacao',
      porque: 'Como desmontar records, inclusive aninhados, com `var` e tipos exatos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 441: Pattern Matching for switch',
      url: 'https://openjdk.org/jeps/441',
      tipo: 'documentacao',
      porque: 'A especificação final do recurso no Java 21, com a motivação de cada regra.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 440: Record Patterns',
      url: 'https://openjdk.org/jeps/440',
      tipo: 'documentacao',
      porque: 'Os record patterns finais do Java 21, aninhamento e inferência com `var`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 456: Unnamed Variables & Patterns',
      url: 'https://openjdk.org/jeps/456',
      tipo: 'documentacao',
      porque: 'O `_` do Java 22 em padrões e variáveis que não serão usadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Pattern Matching for Switch',
      url: 'https://www.baeldung.com/java-switch-pattern-matching',
      tipo: 'artigo',
      porque: 'Padrões de tipo, guardas, `null` e dominância com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Record Patterns in Java',
      url: 'https://www.baeldung.com/java-19-record-patterns',
      tipo: 'artigo',
      porque: 'Record patterns no `instanceof` e no `switch`, aninhados e com `var`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michelli Brito: Java, Record Patterns, Sealed Classes, Pattern Matching',
      url: 'https://www.youtube.com/watch?v=TwSOR_-JMHU',
      tipo: 'video',
      porque: 'O acumulado das novidades das últimas versões do JDK, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Softblue: The Dev Show 023, Java 21, Pattern Matching for Switch',
      url: 'https://www.youtube.com/watch?v=FzPASpKUxgQ',
      tipo: 'video',
      porque: 'O `switch` com padrões do Java 21 demonstrado em código, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: Java 21 Pattern Matching Tutorial #RoadTo21',
      url: 'https://www.youtube.com/watch?v=QrwFrm1R8OY',
      tipo: 'video',
      porque: 'O canal oficial do Java resume padrões de tipo, record patterns e exaustividade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Padrões no `switch` e record patterns são assunto da edição do Java 21 do livro.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção sobre `switch`, parte de pattern matching; e Cap. 7, "Beyond Classes": seção "Encapsulating Data with Records", parte de record patterns',
    },
  ],
  desafio: {
    titulo: 'Avaliador com padrões',
    enunciado:
      'Reescreva a calculadora do episódio 3 sem métodos nos records. Crie a interface selada `Expr` e os records `Num(int n)`, `Soma(Expr a, Expr b)`, `Mult(Expr a, Expr b)` e `Neg(Expr e)`. Escreva `avaliar(Expr e)` e `texto(Expr e)` com `switch` e record patterns, sem `default`. Em `avaliar`, acrescente dois atalhos: uma multiplicação cujo primeiro fator é o número 0 dá 0 sem avaliar o resto, e uma dupla negação devolve a expressão interna. Rode com:\n\n```java\nExpr e1 = new Mult(new Soma(new Num(2), new Num(3)), new Neg(new Num(4)));\nExpr e2 = new Neg(new Neg(new Soma(new Num(1), new Num(1))));\nExpr e3 = new Mult(new Num(0), new Soma(new Num(9), new Num(9)));\nfor (Expr e : new Expr[] {e1, e2, e3}) {\n    System.out.println(texto(e) + " = " + avaliar(e));\n}\n```\n\nSaída esperada:\n\n```text\n(2 + 3) * -4 = -20\n--(1 + 1) = 2\n0 * (9 + 9) = 0\n```',
    dicas: [
      'O atalho do zero é `case Mult(Num(int zero), Expr b) when zero == 0 -> 0;`, antes do `case Mult(Expr a, Expr b)`.',
      'A dupla negação é `case Neg(Neg(Expr interno))`, antes de `case Neg(Expr x)`.',
      'Sem `default`, o compilador confere que os quatro records estão cobertos.',
    ],
    solucao: `sealed interface Expr permits Num, Soma, Mult, Neg { }
record Num(int n) implements Expr { }
record Soma(Expr a, Expr b) implements Expr { }
record Mult(Expr a, Expr b) implements Expr { }
record Neg(Expr e) implements Expr { }

public class Avaliador {
    static int avaliar(Expr e) {
        return switch (e) {
            case Num(int n) -> n;
            case Soma(Expr a, Expr b) -> avaliar(a) + avaliar(b);
            case Mult(Num(int zero), Expr b) when zero == 0 -> 0;
            case Mult(Expr a, Expr b) -> avaliar(a) * avaliar(b);
            case Neg(Neg(Expr interno)) -> avaliar(interno);
            case Neg(Expr x) -> -avaliar(x);
        };
    }

    static String texto(Expr e) {
        return switch (e) {
            case Num(int n) -> String.valueOf(n);
            case Soma(Expr a, Expr b) -> "(" + texto(a) + " + " + texto(b) + ")";
            case Mult(Expr a, Expr b) -> texto(a) + " * " + texto(b);
            case Neg(Expr x) -> "-" + texto(x);
        };
    }

    public static void main(String[] args) {
        Expr e1 = new Mult(new Soma(new Num(2), new Num(3)), new Neg(new Num(4)));
        Expr e2 = new Neg(new Neg(new Soma(new Num(1), new Num(1))));
        Expr e3 = new Mult(new Num(0), new Soma(new Num(9), new Num(9)));
        for (Expr e : new Expr[] {e1, e2, e3}) {
            System.out.println(texto(e) + " = " + avaliar(e));
        }
    }
}`,
    saida: '(2 + 3) * -4 = -20\n--(1 + 1) = 2\n0 * (9 + 9) = 0',
    comentarios:
      'No episódio 3, cada record sabia se avaliar; aqui, os dados são só dados, e as operações ficam fora deles. Acrescentar uma operação nova, como derivar a expressão, vira escrever mais um `switch`, sem tocar nos records. É o estilo que Brian Goetz chama de programação orientada a dados, e os atalhos com padrões aninhados mostram o poder dele: as regras de simplificação são lidas quase como matemática.',
  },
  exercicios: [
    {
      id: 'junior-t5-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num `switch` com padrões, para que serve `when`?',
      opcoes: [
        'Acrescentar uma condição, além do tipo, para o `case` ser escolhido',
        'Indicar o `case` padrão',
        'Tratar o valor `null`',
        'Repetir o `case` enquanto a condição for verdadeira',
      ],
      resposta: 0,
      explicacao: '`case Integer i when i < 0` só casa com inteiros negativos. Se a guarda for falsa, o `switch` continua testando os `case` seguintes.',
    },
    {
      id: 'junior-t5-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static String tipo(Object o) {
        return switch (o) {
            case Integer i when i > 100 -> "grande";
            case Integer i -> "inteiro";
            case String s -> "texto(" + s.length() + ")";
            default -> "?";
        };
    }

    public static void main(String[] args) {
        System.out.println(tipo(500) + " " + tipo(5) + " " + tipo("abc") + " " + tipo(1.0));
    }
}`,
      resposta: 'grande inteiro texto(3) ?',
      explicacao: 'O primeiro `case` que casa vence. 500 passa na guarda; 5 falha nela e cai no `case Integer i`. O `Double` só casa com o `default`.',
    },
    {
      id: 'junior-t5-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    static String f(Object o) {
        return switch (o) {
            case Number n -> "número";
            case Integer i -> "inteiro";
            default -> "outro";
        };
    }
}`,
      opcoes: [
        'Não compila: o `case Integer` é dominado pelo `case Number`',
        'Compila, e um `Integer` sempre dá "inteiro"',
        'Compila, e um `Integer` sempre dá "número"',
        'Não compila: falta `case null`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Todo `Integer` é um `Number`, então o segundo `case` nunca seria alcançado. A ordem certa é do mais específico para o mais geral.',
    },
    {
      id: 'junior-t5-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class T {
    static int tamanho(Object o) {
        return switch (o) {
            case String s -> s.length();
            default -> 0;
        };
    }

    public static void main(String[] args) {
        System.out.println(tamanho("abc"));
        System.out.println(tamanho(null));
    }
}`,
      opcoes: [
        'Imprime `3` e lança `NullPointerException`',
        'Imprime `3` e `0`',
        'Imprime `3` e `null`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: '3' },
      explicacao: 'O `default` não pega o `null`. Sem `case null`, o `switch` lança `NullPointerException`. Com `case null, default -> 0`, a saída seria 3 e 0.',
    },
    {
      id: 'junior-t5-e05-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o `switch` com padrões são verdadeiras? Escolha duas.',
      opcoes: [
        'Ele precisa ser exaustivo, com `default` ou cobrindo todos os casos',
        '`case null` permite tratar o valor `null` sem exceção',
        'O `default` também trata o `null`',
        'A ordem dos `case` não importa',
        'A guarda é escrita com `&&` depois do padrão',
      ],
      respostas: [0, 1],
      explicacao: 'O `null` só é tratado com `case null`. A ordem importa, por causa da dominância, e a guarda usa a palavra `when`.',
    },
    {
      id: 'junior-t5-e05-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a guarda do primeiro `case`. O programa deve imprimir `diagonal / fora da diagonal`.',
      codigo: `record Ponto(int x, int y) { }

public class Plano {
    static String onde(Ponto p) {
        return switch (p) {
            case Ponto(int x, int y) ___ x == y -> "diagonal";
            case Ponto(int x, int y) -> "fora da diagonal";
        };
    }

    public static void main(String[] args) {
        System.out.println(onde(new Ponto(2, 2)) + " / " + onde(new Ponto(1, 3)));
    }
}`,
      respostas: ['when'],
      saida: 'diagonal / fora da diagonal',
      explicacao: 'O record pattern desmonta o ponto, e o `when` usa as variáveis dos componentes. O segundo `case` cobre o resto, então o `switch` é exaustivo sem `default`.',
    },
    {
      id: 'junior-t5-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha em que o compilador acusa o erro.',
      codigo: `sealed interface Animal permits Gato, Cao, Peixe { }
record Gato() implements Animal { }
record Cao() implements Animal { }
record Peixe() implements Animal { }

public class Sons {
    static String som(Animal a) {
        return switch (a) {
            case Gato g -> "miau";
            case Cao c -> "au";
        };
    }
}`,
      resposta: 8,
      explicacao: 'A interface selada tem três subtipos, e o `switch` só cobre dois. Sem `default`, ele não é exaustivo; o erro aparece no próprio `switch`.',
    },
    {
      id: 'junior-t5-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `record Ponto(int x, int y) { }
record Retangulo(Ponto canto, Ponto oposto) { }

Object o = new Retangulo(new Ponto(1, 1), new Ponto(4, 5));
if (o instanceof Retangulo(Ponto(var x1, var y1), Ponto(var x2, var y2))) {
    System.out.println((x2 - x1) * (y2 - y1));
}`,
      opcoes: ['`12`', '`20`', 'Não compila: record patterns não podem ser aninhados', 'Não imprime nada'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O padrão desmonta o retângulo e os dois pontos de uma vez. A largura é 4 - 1 e a altura 5 - 1: 3 × 4 = 12.',
    },
    {
      id: 'junior-t5-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `sealed interface Pagamento permits Pix, Boleto { }
record Pix(double valor) implements Pagamento { }
record Boleto(double valor, int dias) implements Pagamento { }

public class Taxas {
    static double taxa(Pagamento p) {
        return switch (p) {
            case Pix(double v) -> 0;
            case Boleto(double v, int d) -> 2.5 + d * 0.1;
        };
    }

    public static void main(String[] args) {
        System.out.println(taxa(new Pix(100)) + " " + taxa(new Boleto(100, 5)));
    }
}`,
      opcoes: ['`0.0 3.0`', '`0 3.0`', 'Não compila: falta `default`', '`0.0 2.5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com a interface selada, os dois `case` cobrem tudo. O `switch` expressão tem tipo `double`, então o `0` do Pix é promovido a 0.0.',
    },
    {
      id: 'junior-t5-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static String f(Object o) {
        return switch (o) {
            case String s -> "texto";
            case null, default -> "outro ou nulo";
        };
    }

    public static void main(String[] args) {
        System.out.println(f(null) + " | " + f(3) + " | " + f("a"));
    }
}`,
      opcoes: [
        '`outro ou nulo | outro ou nulo | texto`',
        'Lança `NullPointerException`',
        'Não compila: `null` e `default` não podem ficar juntos',
        '`texto | outro ou nulo | texto`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`case null, default` é a forma de tratar o `null` e todo o resto num só ramo.',
    },
    {
      id: 'junior-t5-e05-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que acontece quando um `switch` com padrões, sem `case null`, recebe `null`?',
      opcoes: [
        'Lança `NullPointerException`',
        'Executa o `default`',
        'Não executa nenhum `case`',
        'Executa o primeiro `case`',
      ],
      resposta: 0,
      explicacao: 'É o mesmo comportamento do `switch` antigo. A diferença é que agora existe o `case null` para tratar o caso.',
    },
    {
      id: 'junior-t5-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No Java 25, cobrado pela prova 1Z0-831, qual é a saída?',
      codigo: `record Pedido(String cliente, double total, boolean pago) { }

Object o = new Pedido("Ana", 150.0, false);
String status = switch (o) {
    case Pedido(_, double t, boolean pago) when pago -> "pago: " + t;
    case Pedido(var c, _, _) -> "pendente de " + c;
    default -> "?";
};
System.out.println(status);`,
      opcoes: ['`pendente de Ana`', '`pago: 150.0`', 'Não compila: `_` não é um nome válido', '`?`'],
      resposta: 0,
      provas: ['831'],
      verificar: { tipo: 'saida' },
      explicacao: 'O `_` é um padrão sem nome, do Java 22: casa com qualquer valor e não declara variável. O pedido não está pago, então a guarda falha, e o segundo `case` usa só o cliente.',
    },
    {
      id: 'junior-t5-e05-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'No Java 21, quais rótulos são válidos num `switch` sobre um `Object`? Escolha três.',
      opcoes: [
        '`case Integer i ->`',
        '`case Ponto(int x, var y) ->`, sendo `Ponto` um record',
        '`case String s when s.isEmpty() ->`',
        '`case int i ->`',
        '`case String s, Integer i ->`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Padrões de tipo, record patterns e guardas são válidos. Padrões de tipos primitivos ainda não são finais no Java 21, e um `case` não pode juntar padrões que declaram variáveis.',
    },
    {
      id: 'junior-t5-e05-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    public static void main(String[] args) {
        Object o = 42;
        switch (o) {
            case String s:
                System.out.println("texto");
                break;
            case Integer i when i > 40:
                System.out.println("grande");
                break;
            case Integer i:
                System.out.println("inteiro");
                break;
            default:
                System.out.println("outro");
        }
    }
}`,
      opcoes: ['`grande`', '`grande` e `inteiro`', '`inteiro`', 'Não compila: padrões exigem a forma com seta'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Padrões também funcionam no `switch` com dois-pontos. O `break` encerra o `switch`; sem ele, a execução não poderia cair num `case` que declara uma variável de padrão.',
    },
    {
      id: 'junior-t5-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um `switch` sem `default` cobre todos os subtipos de uma interface selada. Uma biblioteca acrescenta um subtipo novo, e o código não é recompilado. O que acontece quando o `switch` recebe esse subtipo?',
      opcoes: [
        'A JVM lança `MatchException`',
        'O `switch` executa o último `case`',
        'O `switch` não faz nada e devolve `null`',
        'A JVM recompila o `switch` com um `default`',
      ],
      resposta: 0,
      explicacao: 'O compilador garantiu a exaustividade para os subtipos que conhecia. Na execução, um valor que nenhum `case` cobre gera `MatchException`, o erro criado no Java 21 para esse caso.',
    },
  ],
};

export default episodio;
