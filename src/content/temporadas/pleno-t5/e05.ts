import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t5-e05',
  minutos: 14,
  aula,
  armadilhas: [
    '`f.andThen(g)` aplica `f` primeiro; `f.compose(g)` aplica `g` primeiro.',
    '`and` e `or` de `Predicate` têm curto-circuito: o segundo predicado pode nem ser avaliado.',
    '`a.and(b).or(c)` é `(a && b) || c`: a ordem é a das chamadas, sem precedência.',
    'Compor dois `UnaryOperator` com `andThen` devolve uma `Function`, que não pode ser atribuída a um `UnaryOperator`.',
    '`Supplier` não tem `andThen`, e `BiFunction` não tem `compose`.',
    '`Consumer.andThen` executa os dois consumidores com o mesmo argumento, em sequência.',
    'Compor não executa nada: só cria uma função nova, executada no `apply`.',
    '`andThen(null)` lança `NullPointerException` na composição, não na chamada.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Combining Lambda Expressions',
      url: 'https://dev.java/learn/language/fp/lambdas/combining-chaining-composing/',
      tipo: 'documentacao',
      porque: 'Encadear e compor predicados, funções e consumidores com os métodos `default`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.function.Function',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Function.html',
      tipo: 'documentacao',
      porque: 'As assinaturas de `andThen`, `compose` e `identity`, com o PECS nos tipos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.function.Consumer',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Consumer.html',
      tipo: 'documentacao',
      porque: 'O `andThen` de consumidores e o que acontece se o primeiro lançar exceção.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Predicate Chain',
      url: 'https://www.baeldung.com/java-predicate-chain',
      tipo: 'artigo',
      porque: 'Combinando predicados com `and`, `or` e `negate`, inclusive a partir de listas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Currying in Java',
      url: 'https://www.baeldung.com/java-currying',
      tipo: 'artigo',
      porque: 'Funções que devolvem funções e a aplicação parcial de argumentos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Engineering Digest: Java 8 Function Interface Explained, apply(), andThen(), compose() and identity()',
      url: 'https://www.youtube.com/watch?v=COc5i6hG1j0',
      tipo: 'video',
      porque: 'A ordem de aplicação de `andThen` e `compose` com exemplos lado a lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Joker: Design Patterns in the Light of Lambda Expressions (Venkat Subramaniam)',
      url: 'https://www.youtube.com/watch?v=gIrKP76iuPs',
      tipo: 'video',
      porque: 'Padrões como strategy e decorator reescritos com composição de funções.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Devoxx: Get a Taste of Lambdas and Get Addicted to Streams (Venkat Subramaniam)',
      url: 'https://www.youtube.com/watch?v=1OpAgZvYXLQ',
      tipo: 'video',
      porque: 'Da composição de funções aos streams, a ponte para a próxima temporada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'A composição de comparadores, predicados e funções, com a analogia matemática.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Lambda expressions": seções 3.8, "Useful methods to compose lambda expressions", e 3.9, "Similar ideas from mathematics"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de métodos de conveniência de cada interface funcional.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Lambdas and Functional Interfaces": seção "Working with Built-in Functional Interfaces", parte "Using Convenience Methods on Functional Interfaces"',
    },
  ],
  desafio: {
    titulo: 'Regras de preço compostas',
    enunciado:
      'Crie `record Pedido(String cliente, double valor, boolean primeiraCompra)` e o método `static Predicate<Pedido> valorMinimo(double minimo)`. Para cada pedido, monte o cálculo do preço final partindo de `Function.identity()` e acrescentando com `andThen`: um desconto de 10% (`v -> v - v / 10`) na primeira compra e um frete de 15 quando o valor for menor que 100 (use `negate()`). No fim, liste os clientes VIP: primeira compra **e** valor mínimo de 150. Para Ana (200, primeira compra), Bia (80) e Caio (150), a saída deve ser:\n\n```text\nAna: 180.0 (desconto, frete grátis)\nBia: 95.0 (frete)\nCaio: 150.0 (frete grátis)\nvip: Ana\n```',
    dicas: [
      'Reatribua o cálculo a cada regra: `calculo = calculo.andThen(desconto);`.',
      '`Pedido::primeiraCompra` já é um `Predicate<Pedido>`, porque o componente devolve `boolean`.',
      'O VIP é `primeiraCompra.and(valorMinimo(150))`.',
    ],
    solucao: `import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

public class Precos {
    record Pedido(String cliente, double valor, boolean primeiraCompra) { }

    static Predicate<Pedido> valorMinimo(double minimo) {
        return p -> p.valor() >= minimo;
    }

    public static void main(String[] args) {
        Predicate<Pedido> primeiraCompra = Pedido::primeiraCompra;
        Predicate<Pedido> freteGratis = valorMinimo(100);
        Predicate<Pedido> vip = primeiraCompra.and(valorMinimo(150));
        Function<Double, Double> desconto = v -> v - v / 10;
        Function<Double, Double> frete = v -> v + 15;

        List<Pedido> pedidos = List.of(new Pedido("Ana", 200, true), new Pedido("Bia", 80, false), new Pedido("Caio", 150, false));
        for (Pedido p : pedidos) {
            Function<Double, Double> calculo = Function.identity();
            StringBuilder regras = new StringBuilder();
            if (primeiraCompra.test(p)) {
                calculo = calculo.andThen(desconto);
                regras.append("desconto, ");
            }
            if (freteGratis.negate().test(p)) {
                calculo = calculo.andThen(frete);
                regras.append("frete");
            } else {
                regras.append("frete grátis");
            }
            System.out.println(p.cliente() + ": " + calculo.apply(p.valor()) + " (" + regras + ")");
        }

        StringBuilder vips = new StringBuilder();
        for (Pedido p : pedidos) {
            if (vip.test(p)) {
                vips.append(p.cliente());
            }
        }
        System.out.println("vip: " + vips);
    }
}`,
    saida: 'Ana: 180.0 (desconto, frete grátis)\nBia: 95.0 (frete)\nCaio: 150.0 (frete grátis)\nvip: Ana',
    comentarios:
      'Cada pedido ganha um cálculo próprio, montado só com as regras que se aplicam a ele. A variável `calculo` é reatribuída, o que é permitido porque nenhuma lambda a captura. O desconto escrito como `v - v / 10` evita o arredondamento binário de `v * 0.9`. Os predicados reaproveitam `valorMinimo` com limites diferentes: uma função que fabrica funções.',
  },
  exercicios: [
    {
      id: 'pleno-t5-e05-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, Integer> menos1 = x -> x - 1;
        Function<Integer, Integer> quadrado = x -> x * x;
        System.out.println(menos1.andThen(quadrado).apply(4) + " " + menos1.compose(quadrado).apply(4));
    }
}`,
      opcoes: ['`9 15`', '`15 9`', '`9 9`', '`15 15`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`andThen`: 4 - 1 = 3, depois 3² = 9. `compose`: primeiro 4² = 16, depois 16 - 1 = 15.',
    },
    {
      id: 'pleno-t5-e05-q02',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<String, String> a = s -> s + "1";
        Function<String, String> b = s -> s + "2";
        System.out.println(a.andThen(b).compose(b).apply("x"));
    }
}`,
      resposta: 'x212',
      explicacao: '`compose(b)` aplica `b` antes de tudo: "x2". Depois vem a função `a.andThen(b)`: "x21" e "x212".',
    },
    {
      id: 'pleno-t5-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Predicate<String> vazio = s -> {
            System.out.print("V");
            return s.isEmpty();
        };
        Predicate<String> curto = s -> {
            System.out.print("C");
            return s.length() < 3;
        };
        System.out.println(" " + vazio.or(curto).test("ab") + " " + vazio.and(curto).test("ab"));
    }
}`,
      opcoes: ['`VCV true false`', '`VCVC true false`', '`VC true false`', '`VV true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No `or`, "ab" não é vazio, então `curto` também é avaliado. No `and`, o primeiro já é falso, e `curto` não roda. As letras aparecem antes do texto, porque os testes rodam enquanto a `String` é montada.',
    },
    {
      id: 'pleno-t5-e05-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`Function<Integer, Integer> f = x -> x; Function<Integer, String> g = f.andThen(x -> "#" + x);`',
        '`Predicate<String> p = String::isEmpty; Predicate<String> q = p.negate().or(s -> s.length() > 3);`',
        '`Consumer<String> c = s -> { }; Consumer<String> d = c.andThen(System.out::println);`',
        '`Supplier<String> s = () -> "a"; Supplier<String> t = s.andThen(x -> x);`',
        '`UnaryOperator<Integer> u = x -> x; UnaryOperator<Integer> v = u.andThen(x -> x + 1);`',
        '`BiFunction<Integer, Integer, Integer> b = Integer::sum; BiFunction<Integer, Integer, Integer> c = b.compose(x -> x);`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`Supplier` não tem `andThen`, `BiFunction` não tem `compose`, e o `andThen` de um `UnaryOperator` devolve uma `Function`, que não é um `UnaryOperator`.',
    },
    {
      id: 'pleno-t5-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Consumer<List<String>> poeX = l -> l.add("x");
        Consumer<List<String>> poeTamanho = l -> l.add(String.valueOf(l.size()));
        List<String> lista = new ArrayList<>();
        poeX.andThen(poeTamanho).andThen(poeX).accept(lista);
        System.out.println(lista);
    }
}`,
      opcoes: ['`[x, 1, x]`', '`[x, 0, x]`', '`[x, x, 2]`', '`[1, x, x]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os três consumidores recebem a mesma lista, em sequência. Quando o segundo roda, o "x" já está lá, e o tamanho é 1.',
    },
    {
      id: 'pleno-t5-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Predicate<String> a = String::isEmpty;
        Predicate<String> b = s -> s.length() > 5;
        Predicate<String> c = s -> s.startsWith("x");
        System.out.println(a.and(b).or(c).test("x") + " " + a.or(b).and(c).test("x"));
    }
}`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para "x", `a` e `b` são falsos e `c` é verdadeiro. A primeira expressão é `(a && b) || c`; a segunda, `(a || b) && c`.',
    },
    {
      id: 'pleno-t5-e05-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que aplica `mais3` antes de `dobro`. O programa deve imprimir `16`.',
      codigo: `import java.util.function.Function;

public class Ordem {
    public static void main(String[] args) {
        Function<Integer, Integer> dobro = x -> x * 2;
        Function<Integer, Integer> mais3 = x -> x + 3;
        System.out.println(dobro.___(mais3).apply(5));
    }
}`,
      respostas: ['compose'],
      saida: '16',
      explicacao: '`dobro.compose(mais3)` calcula `dobro(mais3(5))`: 8 e depois 16. Com `andThen`, seriam 10 e 13.',
    },
    {
      id: 'pleno-t5-e05-q08',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        UnaryOperator<Integer> soma1 = x -> x + 1;
        Function<Integer, Integer> a = soma1.andThen(x -> x * 2);
        Function<Integer, Integer> b = soma1.compose(x -> x * 2);
        UnaryOperator<Integer> c = soma1.andThen(x -> x * 3);
        System.out.println(a.apply(1) + b.apply(1) + c.apply(1));
    }
}`,
      resposta: 8,
      explicacao: '`andThen` e `compose` são herdados de `Function` e devolvem `Function`. Guardar o resultado num `UnaryOperator` exigiria um tipo mais específico do que o método garante.',
    },
    {
      id: 'pleno-t5-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, Function<Integer, Integer>> menos = a -> b -> a - b;
        System.out.println(menos.apply(10).apply(3) + " " + menos.apply(3).apply(10));
    }
}`,
      opcoes: ['`7 -7`', '`-7 7`', '`7 7`', 'Não compila: lambdas não podem devolver lambdas'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`menos.apply(10)` devolve a função `b -> 10 - b`, que recebe o 3. A ordem dos argumentos importa.',
    },
    {
      id: 'pleno-t5-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, Integer> dobro = x -> x * 2;
        System.out.println("compondo");
        Function<Integer, Integer> nada = dobro.andThen(null);
        System.out.println("composta");
    }
}`,
      opcoes: [
        'Imprime `compondo` e lança `NullPointerException`',
        'Imprime `compondo` e `composta`',
        'Não compila: `null` não é uma `Function`',
        'Imprime `compondo`, `composta` e só falharia no `apply`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'compondo' },
      explicacao: '`andThen` confere o argumento com `Objects.requireNonNull` ao compor, e a exceção sai ali, antes de qualquer `apply`.',
    },
    {
      id: 'pleno-t5-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        List<Function<Integer, Integer>> etapas = List.of(x -> x + 1, x -> x * 3, x -> x - 2);
        Function<Integer, Integer> tudo = Function.identity();
        for (Function<Integer, Integer> e : etapas) {
            tudo = tudo.andThen(e);
        }
        System.out.println(tudo.apply(2));
    }
}`,
      opcoes: ['`7`', '`2`', '`5`', 'Não compila: `tudo` não é efetivamente final'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A identidade é o ponto de partida neutro. As etapas são aplicadas na ordem da lista: 3, 9 e 7. `tudo` pode mudar porque nenhuma lambda a captura.',
    },
    {
      id: 'pleno-t5-e05-q12',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`f.andThen(g)` aplica `f` primeiro',
        '`p.and(q)` não avalia `q` se `p` for falso',
        '`f.compose(g)` aplica `f` primeiro',
        '`Supplier` tem o método `andThen`',
        'Compor funções as executa imediatamente',
      ],
      respostas: [0, 1],
      explicacao: '`compose` aplica o argumento primeiro, `Supplier` não tem métodos de composição, e compor só cria uma função nova, executada depois.',
    },
    {
      id: 'pleno-t5-e05-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BiFunction<String, Integer, String> repetir = String::repeat;
        System.out.println(repetir.andThen(String::length).apply("ab", 3));
    }
}`,
      resposta: '6',
      explicacao: '`BiFunction.andThen` transforma o resultado com uma `Function`: "ababab" tem 6 caracteres.',
    },
    {
      id: 'pleno-t5-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    static Predicate<Integer> maiorQue(int n) {
        return x -> x > n;
    }

    public static void main(String[] args) {
        Predicate<Integer> faixa = maiorQue(5).and(maiorQue(10).negate());
        System.out.println(faixa.test(7) + " " + faixa.test(12));
    }
}`,
      opcoes: ['`true false`', '`false true`', '`true true`', '`false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A faixa é "maior que 5 e não maior que 10". O 7 passa; o 12 é maior que 10 e não passa.',
    },
    {
      id: 'pleno-t5-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece quando se chama `f.andThen(g)`?',
      opcoes: [
        'Cria-se uma nova função que guarda `f` e `g`; nada é executado até o `apply`',
        '`f` é executada imediatamente e o resultado é guardado para `g`',
        '`f` e `g` são fundidas num único método pelo compilador',
        '`f` é modificada para chamar `g` no fim',
      ],
      resposta: 0,
      explicacao: '`andThen` é um método `default` que devolve uma lambda capturando as duas funções. As funções originais não mudam, porque objetos funcionais são imutáveis.',
    },
  ],
};

export default episodio;
