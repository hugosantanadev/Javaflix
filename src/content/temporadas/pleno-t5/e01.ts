import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t5-e01',
  minutos: 15,
  aula,
  armadilhas: [
    'Parâmetros seguem um único estilo: todos sem tipo, todos com tipo ou todos com `var`; `(Integer a, b)` não compila.',
    'Parênteses são obrigatórios com zero ou vários parâmetros e sempre que houver tipo: `String s -> ...` não compila.',
    '`x -> return x;` e `x -> { x * 2 }` não compilam: `return` exige chaves, e chaves exigem `return`.',
    'Uma lambda precisa de tipo-alvo: `var f = () -> 1;` e `Object o = () -> 1;` não compilam; com cast, compila.',
    '`() -> 42` não serve a um `Runnable`; `() -> System.out.println()` não serve a um `Callable`.',
    'Duas sobrecargas que aceitam a mesma lambda deixam a chamada ambígua.',
    'A lambda só lança as exceções checked que o método da interface declara.',
    '`this` numa lambda é o objeto externo, e um parâmetro não pode repetir o nome de uma variável local.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Writing Your First Lambda Expression',
      url: 'https://dev.java/learn/language/fp/lambdas/first-lambdas/',
      tipo: 'documentacao',
      porque: 'As formas da sintaxe e como o compilador encontra o tipo de uma lambda.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Lambda Expressions',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html',
      tipo: 'documentacao',
      porque: 'Sintaxe, tipo-alvo e acesso a variáveis, com o exemplo clássico de filtrar pessoas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.27: Lambda Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.27',
      tipo: 'documentacao',
      porque: 'A gramática completa, as regras de corpo compatível com `void` ou com valor e o tipo-alvo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 323: Local-Variable Syntax for Lambda Parameters',
      url: 'https://openjdk.org/jeps/323',
      tipo: 'documentacao',
      porque: 'Por que o Java 11 passou a aceitar `var` nos parâmetros e por que não se pode misturar estilos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Brian Goetz: State of the Lambda',
      url: 'https://cr.openjdk.org/~briangoetz/lambda/lambda-state-final.html',
      tipo: 'artigo',
      porque: 'O documento de projeto das lambdas do Java 8, escrito pelo arquiteto da linguagem.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Brian Goetz: Translation of Lambda Expressions',
      url: 'https://cr.openjdk.org/~briangoetz/lambda/lambda-translation.html',
      tipo: 'artigo',
      porque: 'Como o `javac` transforma lambdas em métodos sintéticos e `invokedynamic`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Lambda Expressions and Functional Interfaces, Tips and Best Practices',
      url: 'https://www.baeldung.com/java-8-lambda-expressions-tips',
      tipo: 'artigo',
      porque: 'Boas práticas de escrita, inclusive o problema das sobrecargas ambíguas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Exceptions in Java Lambda Expressions',
      url: 'https://www.baeldung.com/java-lambda-exceptions',
      tipo: 'artigo',
      porque: 'Como lidar com exceções checked dentro de lambdas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Parametrizando comportamentos pt 02',
      url: 'https://www.youtube.com/watch?v=pSSgo8RAf-A',
      tipo: 'video',
      porque: 'Do código repetido à lambda, o caminho que motiva a sintaxe, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Lambda Expressions in Java, Full Simple Tutorial',
      url: 'https://www.youtube.com/watch?v=tj5sLSFjVj4',
      tipo: 'video',
      porque: 'As formas da sintaxe e o papel da interface funcional, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Quando trocar classes anônimas por lambdas e quando não, inclusive pelo significado de `this`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Lambdas and Streams": Item 42, "Prefer lambdas to anonymous classes"',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'O capítulo de referência sobre lambdas, com tipo-alvo, inferência e restrições.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Lambda expressions": seções 3.1 a 3.5, até "Type checking, type inference, and restrictions"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de lambdas válidas e inválidas que a prova reproduz quase literalmente.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Lambdas and Functional Interfaces": seções "Writing Simple Lambdas" e "Coding Functional Interfaces"',
    },
  ],
  desafio: {
    titulo: 'Calculadora com lambdas',
    enunciado:
      'Monte um `Map<String, BinaryOperator<Integer>>` com as operações `+`, `-`, `*`, `/` e `^`. A divisão deve usar um corpo de bloco que lança `ArithmeticException("divisão por zero")`, e a potência, um corpo de bloco com laço e parâmetros com tipo explícito. Escreva `calcular(String expressao)`, que recebe textos como `"3 + 4"` e devolve o resultado, uma mensagem de erro ou "operador desconhecido". Para `"3 + 4"`, `"10 / 3"`, `"2 ^ 10"`, `"5 / 0"` e `"7 % 2"`, a saída deve ser:\n\n```text\n3 + 4 = 7\n10 / 3 = 3\n2 ^ 10 = 1024\n5 / 0 = erro: divisão por zero\n7 % 2 = operador desconhecido\n```',
    dicas: [
      '`Map.of` com o tipo declarado à esquerda dá às lambdas o tipo-alvo `BinaryOperator<Integer>`.',
      'Num corpo de bloco, cada caminho que termina normalmente precisa de `return`; um `throw` também encerra o caminho.',
      '`split(" ")` separa os três pedaços da expressão.',
    ],
    solucao: `import java.util.List;
import java.util.Map;
import java.util.function.BinaryOperator;

public class Calculadora {
    static final Map<String, BinaryOperator<Integer>> OPERACOES = Map.of(
        "+", (a, b) -> a + b,
        "-", (a, b) -> a - b,
        "*", (a, b) -> a * b,
        "/", (a, b) -> {
            if (b == 0) {
                throw new ArithmeticException("divisão por zero");
            }
            return a / b;
        },
        "^", (Integer base, Integer expoente) -> {
            int r = 1;
            for (int i = 0; i < expoente; i++) {
                r *= base;
            }
            return r;
        });

    static String calcular(String expressao) {
        String[] partes = expressao.split(" ");
        int a = Integer.parseInt(partes[0]);
        int b = Integer.parseInt(partes[2]);
        BinaryOperator<Integer> operacao = OPERACOES.get(partes[1]);
        if (operacao == null) {
            return expressao + " = operador desconhecido";
        }
        try {
            return expressao + " = " + operacao.apply(a, b);
        } catch (ArithmeticException e) {
            return expressao + " = erro: " + e.getMessage();
        }
    }

    public static void main(String[] args) {
        for (String e : List.of("3 + 4", "10 / 3", "2 ^ 10", "5 / 0", "7 % 2")) {
            System.out.println(calcular(e));
        }
    }
}`,
    saida: '3 + 4 = 7\n10 / 3 = 3\n2 ^ 10 = 1024\n5 / 0 = erro: divisão por zero\n7 % 2 = operador desconhecido',
    comentarios:
      'Cada operação virou um dado, guardado num mapa e escolhido em tempo de execução: é o padrão *strategy* sem nenhuma classe. As lambdas da divisão e da potência mostram o corpo de bloco, com `throw` num caminho e `return` no outro. Como `ArithmeticException` é unchecked, ela pode sair de um `BinaryOperator`, cujo `apply` não declara exceções.',
  },
  exercicios: [
    {
      id: 'pleno-t5-e01-q01',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`BiFunction<Integer, Integer, Integer> f = (a, b) -> a + b;`',
        '`Function<String, Integer> f = (var s) -> s.length();`',
        '`Supplier<String> f = () -> { return "x"; };`',
        '`BiFunction<Integer, Integer, Integer> f = (Integer a, b) -> a + b;`',
        '`Function<String, Integer> f = String s -> s.length();`',
        '`Function<Integer, Integer> f = x -> { x * 2 };`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Os parâmetros não podem misturar estilos, um tipo declarado exige parênteses, e um corpo entre chaves precisa de `return` e de ponto e vírgula.',
    },
    {
      id: 'pleno-t5-e01-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Supplier<Integer> a = () -> 1;
        var b = () -> 2;
        System.out.println(a.get() + b.get());
    }
}`,
      opcoes: [
        'Não compila: `var` não fornece um tipo-alvo para a lambda',
        'Compila e imprime `3`',
        'Compila e imprime `12`',
        'Não compila: `Supplier` não aceita lambda sem parâmetros',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'O compilador deduz o tipo de `var` a partir do lado direito, e a lambda só ganha tipo a partir do lado esquerdo. Um espera o outro, e nada se resolve.',
    },
    {
      id: 'pleno-t5-e01-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.Callable;

public class Teste {
    static void rodar(Runnable r) {
        System.out.print("R ");
    }

    static void rodar(Callable<String> c) {
        System.out.print("C ");
    }

    public static void main(String[] args) {
        rodar(() -> "ok");
        rodar(() -> System.out.print(""));
        rodar(() -> { });
        System.out.println();
    }
}`,
      opcoes: ['`C R R`', '`R R R`', '`C C R`', 'Não compila: as chamadas são ambíguas'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`() -> "ok"` devolve um valor e só serve ao `Callable`. A chamada a `print` e o bloco vazio não devolvem nada e só servem ao `Runnable`.',
    },
    {
      id: 'pleno-t5-e01-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int base = 10;
        Function<Integer, Integer> soma = n -> n + base;
        Function<Integer, Integer> dobro = base -> base * 2;
        System.out.println(soma.apply(1) + dobro.apply(2));
    }
}`,
      resposta: 7,
      explicacao: 'Os parâmetros de uma lambda vivem no mesmo escopo do método. Um parâmetro chamado `base` colide com a variável local de mesmo nome.',
    },
    {
      id: 'pleno-t5-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    String id = "fora";

    void testar() {
        Runnable a = () -> System.out.print(this.id + " ");
        Runnable b = new Runnable() {
            String id = "dentro";

            public void run() {
                System.out.print(this.id + " ");
            }
        };
        a.run();
        b.run();
        System.out.println();
    }

    public static void main(String[] args) {
        new Teste().testar();
    }
}`,
      opcoes: ['`fora dentro`', '`dentro dentro`', '`fora fora`', '`dentro fora`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A lambda não é um objeto com escopo próprio para `this`, que continua sendo o `Teste`. A classe anônima é uma instância nova, com o próprio campo `id`.',
    },
    {
      id: 'pleno-t5-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.Callable;

public class Teste {
    public static void main(String[] args) throws Exception {
        Callable<String> c = () -> { throw new Exception("c"); };
        Runnable r = () -> { throw new Exception("r"); };
    }
}`,
      opcoes: [
        'Não compila: `Runnable.run()` não declara exceções checked',
        'Compila',
        'Não compila: nenhuma lambda pode lançar `Exception`',
        'Compila, porque `main` declara `throws Exception`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'O corpo da lambda é o corpo de `call()` ou de `run()`. `call()` declara `throws Exception`; `run()` não. O `throws` do `main` não vale para dentro da lambda.',
    },
    {
      id: 'pleno-t5-e01-q07',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BinaryOperator<Integer> a = (x, y) -> x * y;
        BiFunction<Integer, Integer, Integer> b = (var x, var y) -> {
            int t = x - y;
            return t * t;
        };
        Supplier<String> c = () -> "fim";
        System.out.println(a.apply(3, 4) + b.apply(2, 5) + c.get());
    }
}`,
      resposta: '21fim',
      explicacao: 'Os dois resultados `Integer` são somados (12 + 9) antes de a concatenação com a `String` começar.',
    },
    {
      id: 'pleno-t5-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a declaração do parâmetro, que precisa de um tipo ou de `var` por causa do `final`. O programa deve imprimir `5`.',
      codigo: `import java.util.function.Function;

public class Tamanho {
    public static void main(String[] args) {
        Function<String, Integer> f = (final ___ s) -> s.length();
        System.out.println(f.apply("lâmpada".substring(2)));
    }
}`,
      respostas: ['var', 'String'],
      saida: '5',
      explicacao: 'Um modificador como `final` exige que o parâmetro tenha tipo declarado, e desde o Java 11 o `var` serve para isso.',
    },
    {
      id: 'pleno-t5-e01-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>();
        Consumer<String> c = s -> l.add(s);
        Predicate<String> p = s -> l.add(s);
        c.accept("a");
        System.out.println(p.test("a") + " " + l);
    }
}`,
      opcoes: [
        '`true [a, a]`',
        'Não compila: `l.add` devolve `boolean` e não serve a um `Consumer`',
        '`false [a]`',
        'Não compila: `Predicate` precisa de `return`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Uma chamada de método como corpo serve aos dois tipos: no `Consumer`, o `boolean` é descartado; no `Predicate`, é o resultado.',
    },
    {
      id: 'pleno-t5-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Runnable r = () -> 5;
        r.run();
    }
}`,
      opcoes: [
        'Não compila: o corpo devolve um valor e `run()` é `void`',
        'Compila e não imprime nada',
        'Compila e imprime `5`',
        'Compila e lança exceção',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: '`5` não é uma instrução, é só um valor, e um método `void` não tem o que fazer com ele. Uma chamada de método seria aceita, mesmo que devolvesse algo.',
    },
    {
      id: 'pleno-t5-e01-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais contextos uma lambda tem tipo-alvo e compila? Escolha três.',
      opcoes: [
        'Atribuição a uma variável de interface funcional',
        'Argumento de um método cujo parâmetro é uma interface funcional',
        'Cast para uma interface funcional',
        'Atribuição a uma variável declarada com `var`',
        'Atribuição a uma variável do tipo `Object`, sem cast',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O tipo-alvo precisa ser uma interface funcional conhecida no ponto da lambda. `var` não tem tipo próprio, e `Object` não é interface funcional.',
    },
    {
      id: 'pleno-t5-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.Callable;
import java.util.function.Supplier;

public class Teste {
    static void rodar(Supplier<Integer> s) { }

    static void rodar(Callable<Integer> c) { }

    public static void main(String[] args) {
        rodar(() -> 1);
    }
}`,
      opcoes: [
        'Não compila: a chamada é ambígua',
        'Compila e escolhe `Supplier`',
        'Compila e escolhe `Callable`',
        'Não compila: `Callable` não aceita lambdas',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 10 },
      explicacao: 'As duas interfaces têm a mesma forma: nada entra, um `Integer` sai. A diferença no `throws` não desempata, e o compilador recusa a chamada.',
    },
    {
      id: 'pleno-t5-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Object o = (Supplier<String>) () -> "ok";
        System.out.println(((Supplier<?>) o).get());
    }
}`,
      opcoes: ['`ok`', 'Não compila: lambdas não podem ser atribuídas a `Object`', 'Lança `ClassCastException`', '`null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O cast dá à lambda o tipo-alvo `Supplier<String>`. Depois, o objeto pode ser guardado como `Object` e convertido de volta.',
    },
    {
      id: 'pleno-t5-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, String> sinal = n -> {
            if (n > 0) {
                return "positivo";
            } else if (n < 0) {
                return "negativo";
            }
        };
        System.out.println(sinal.apply(0));
    }
}`,
      opcoes: [
        'Não compila: falta `return` quando `n` é zero',
        'Compila e imprime `null`',
        'Compila e lança exceção para zero',
        'Compila e imprime uma linha vazia',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'O corpo de bloco segue as regras de um método: se devolve valor, todo caminho que termina normalmente precisa de `return`.',
    },
    {
      id: 'pleno-t5-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que o `javac` gera para uma lambda?',
      opcoes: [
        'Um método privado sintético com o corpo dela e uma instrução `invokedynamic` no lugar da lambda',
        'Um arquivo `.class` separado, como uma classe anônima',
        'Uma cópia do corpo em cada ponto onde a lambda é chamada',
        'Nada: as lambdas são interpretadas pela JVM a partir do código-fonte',
      ],
      resposta: 0,
      explicacao: 'A classe que implementa a interface só é criada na execução, em memória, pelo `LambdaMetafactory`. Por isso lambdas não deixam arquivos `$1.class`.',
    },
  ],
};

export default episodio;
