import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t5-e02',
  minutos: 15,
  aula,
  armadilhas: [
    'Métodos: `Supplier.get`, `Consumer.accept`, `Predicate.test`, `Function.apply`; com saída primitiva, `getAsInt`, `applyAsInt` e afins.',
    '`IntFunction<R>` recebe `int` e tem `apply`; `ToIntFunction<T>` devolve `int` e tem `applyAsInt`.',
    '`UnaryOperator<T>` estende `Function<T, T>`: pode ser atribuído a uma `Function`, mas não o contrário.',
    '`IntPredicate` não é um `Predicate<Integer>`: atribuir um ao outro não compila.',
    'Não existem `Supplier<int>`, `BiSupplier` nem `TriFunction`.',
    '`ObjIntConsumer<T>` recebe um objeto e um `int`, e o método é `accept`.',
    '`Predicate.not` (Java 11) inverte uma referência a método; `String::isEmpty.negate()` não compila.',
    'Fora da faixa de -128 a 127, cada autoboxing de `Integer` cria um objeto novo, e `==` entre eles dá `false`.',
  ],
  recursos: [
    {
      titulo: 'Javadoc do pacote java.util.function',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html',
      tipo: 'documentacao',
      porque: 'A lista das 43 interfaces, com a forma e o método de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Using Lambdas Expressions in Your Application',
      url: 'https://dev.java/learn/language/fp/lambdas/functional-interfaces/',
      tipo: 'documentacao',
      porque: 'As famílias de interfaces funcionais e as especializações para primitivos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.function.Predicate',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Predicate.html',
      tipo: 'documentacao',
      porque: 'Os métodos `default` de combinação e as fábricas `not` e `isEqual`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 9.8: Functional Interfaces',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.8',
      tipo: 'documentacao',
      porque: 'A definição formal de interface funcional e do seu tipo de função.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de Integer.valueOf',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#valueOf(int)',
      tipo: 'documentacao',
      porque: 'O cache de -128 a 127 que explica por que `==` entre `Integer` às vezes funciona.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Functional Interfaces in Java',
      url: 'https://www.baeldung.com/java-8-functional-interfaces',
      tipo: 'artigo',
      porque: 'As interfaces do pacote com exemplos, incluindo as especializações primitivas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Lambdas pt 01, Predicate',
      url: 'https://www.youtube.com/watch?v=sF6z6PTqTVo',
      tipo: 'video',
      porque: '`Predicate` na prática, filtrando listas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Lambdas pt 02, Consumer',
      url: 'https://www.youtube.com/watch?v=T5mFXrYBsao',
      tipo: 'video',
      porque: '`Consumer` e `BiConsumer`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Lambdas pt 03, Function',
      url: 'https://www.youtube.com/watch?v=2P6LbYqmz7c',
      tipo: 'video',
      porque: 'Transformando valores com `Function`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Geekific: Functional Interfaces and Lambda Expressions in Java',
      url: 'https://www.youtube.com/watch?v=HsOVdmmBS9E',
      tipo: 'video',
      porque: 'As interfaces do pacote organizadas por forma, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que preferir as interfaces padrão e quando vale criar uma própria.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Lambdas and Streams": Item 44, "Favor the use of standard functional interfaces"',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'As interfaces funcionais com a explicação do custo do autoboxing.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Lambda expressions": seção 3.4, "Using functional interfaces"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de interfaces e métodos que a prova exige de memória.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Lambdas and Functional Interfaces": seção "Working with Built-in Functional Interfaces"',
    },
  ],
  desafio: {
    titulo: 'Cadastro com interfaces padrão',
    enunciado:
      'Processe as linhas `"  ana silva ;ana@x.com"`, `"BIA;bia-sem-arroba"` e `"caio;caio@y.org"` usando só interfaces de `java.util.function`: um `IntSupplier` que gera ids a partir de 100, uma `Function<String, String>` que normaliza o nome (sem espaços nas pontas, só a primeira letra maiúscula), um `Predicate<String>` que valida o e-mail (um `@` que não está no início e um ponto depois dele), uma `BiFunction<Integer, String, String>` que monta o rótulo e dois `Consumer<String>` para aceitos e recusados. Só os aceitos consomem um id. A saída deve ser:\n\n```text\nok #100 Ana silva <ana@x.com>\nrecusado: Bia (e-mail inválido)\nok #101 Caio <caio@y.org>\n```',
    dicas: [
      'Um contador mutável dentro da lambda pode ser um array de um elemento: `int[] proximo = {100};`.',
      '`indexOf(\'.\', posicaoDoArroba)` procura o ponto a partir da arroba.',
      '`Character.toUpperCase(t.charAt(0)) + t.substring(1)` deixa só a primeira letra maiúscula.',
    ],
    solucao: `import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.IntSupplier;
import java.util.function.Predicate;

public class Cadastro {
    public static void main(String[] args) {
        int[] proximo = {100};
        IntSupplier ids = () -> proximo[0]++;
        Function<String, String> normalizar = s -> {
            String t = s.trim().toLowerCase();
            return Character.toUpperCase(t.charAt(0)) + t.substring(1);
        };
        Predicate<String> emailValido = e -> e.indexOf('@') > 0 && e.indexOf('.', e.indexOf('@')) > 0;
        BiFunction<Integer, String, String> rotulo = (id, nome) -> "#" + id + " " + nome;
        Consumer<String> aceitar = s -> System.out.println("ok " + s);
        Consumer<String> recusar = s -> System.out.println("recusado: " + s);

        for (String linha : List.of("  ana silva ;ana@x.com", "BIA;bia-sem-arroba", "caio;caio@y.org")) {
            String[] partes = linha.split(";");
            String nome = normalizar.apply(partes[0]);
            String email = partes[1].trim();
            if (emailValido.test(email)) {
                aceitar.accept(rotulo.apply(ids.getAsInt(), nome) + " <" + email + ">");
            } else {
                recusar.accept(nome + " (e-mail inválido)");
            }
        }
    }
}`,
    saida: 'ok #100 Ana silva <ana@x.com>\nrecusado: Bia (e-mail inválido)\nok #101 Caio <caio@y.org>',
    comentarios:
      'Nenhuma interface nova foi preciso criar: cada etapa tem a forma de uma das famílias padrão. O `IntSupplier` devolve `int` sem autoboxing, e por isso o método é `getAsInt`. O array `proximo` contorna a regra de que lambdas só capturam variáveis efetivamente final: a referência ao array não muda, só o conteúdo, assunto do episódio 4.',
  },
  exercicios: [
    {
      id: 'pleno-t5-e02-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        IntUnaryOperator dobro = n -> n * 2;
        IntBinaryOperator soma = (a, b) -> a + b;
        IntPredicate impar = n -> n % 2 != 0;
        int x = soma.applyAsInt(dobro.applyAsInt(3), 1);
        System.out.println(x + " " + impar.test(x));
    }
}`,
      opcoes: ['`7 true`', '`7 false`', '`8 false`', 'Não compila: o método é `apply`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As versões para `int` devolvem `int` com `applyAsInt`. O dobro de 3 mais 1 é 7, e 7 é ímpar.',
    },
    {
      id: 'pleno-t5-e02-q02',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`IntFunction<String> f = n -> "#" + n;`',
        '`ToIntFunction<String> f = s -> s.length();`',
        '`UnaryOperator<String> u = s -> s; Function<String, String> f = u;`',
        '`Function<String, String> f = s -> s; UnaryOperator<String> u = f;`',
        '`Supplier<int> s = () -> 1;`',
        '`IntPredicate p = n -> n > 0; Predicate<Integer> q = p;`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`UnaryOperator` estende `Function`, então só a atribuição nesse sentido vale. Generics não aceitam primitivos, e as versões primitivas não herdam das genéricas.',
    },
    {
      id: 'pleno-t5-e02-q03',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        IntSupplier dado = () -> 6;
        IntUnaryOperator dobro = n -> n * 2;
        IntPredicate par = n -> n % 2 == 0;
        int a = dado.getAsInt();
        int b = dobro.apply(a);
        System.out.println(par.test(b));
    }
}`,
      resposta: 9,
      explicacao: '`IntUnaryOperator` devolve `int`, e o método é `applyAsInt`. Já `IntPredicate` mantém o `test` da família.',
    },
    {
      id: 'pleno-t5-e02-q04',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método de `ToIntFunction`. O programa deve imprimir `3`.',
      codigo: `import java.util.function.ToIntFunction;

public class Medida {
    public static void main(String[] args) {
        ToIntFunction<String> tamanho = String::length;
        System.out.println(tamanho.___("abc"));
    }
}`,
      respostas: ['applyAsInt'],
      saida: '3',
      explicacao: 'O prefixo `To` indica que a saída é primitiva, e o método ganha `As` + o tipo: `applyAsInt`.',
    },
    {
      id: 'pleno-t5-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BinaryOperator<String> menor = BinaryOperator.minBy(Comparator.comparingInt(String::length));
        BinaryOperator<String> maior = BinaryOperator.maxBy(Comparator.naturalOrder());
        System.out.println(menor.apply("abc", "de") + " " + maior.apply("abc", "de"));
    }
}`,
      opcoes: ['`de de`', '`de abc`', '`abc de`', '`abc abc`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Pelo tamanho, "de" é a menor. Pela ordem alfabética, "de" vem depois de "abc" e é a maior.',
    },
    {
      id: 'pleno-t5-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Predicate<String> vazio = String::isEmpty;
        System.out.println(Predicate.not(vazio).test("") + " " + Predicate.isEqual(null).test(null) + " " + Predicate.isEqual("a").test("A"));
    }
}`,
      opcoes: ['`false true false`', '`true true false`', '`false false false`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`not` inverte o predicado. `isEqual` usa `Objects.equals`, que trata `null` sem exceção e diferencia maiúsculas.',
    },
    {
      id: 'pleno-t5-e02-q07',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Supplier<StringBuilder> fabrica = StringBuilder::new;
        StringBuilder a = fabrica.get();
        a.append("x");
        System.out.println(fabrica.get().length() + "" + a.length());
    }
}`,
      resposta: '01',
      explicacao: 'Cada `get()` executa o construtor de novo e devolve um objeto novo. O segundo `StringBuilder` está vazio.',
    },
    {
      id: 'pleno-t5-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Supplier<Integer> a = () -> 1000;
        IntSupplier b = () -> 1000;
        System.out.println((a.get() == a.get()) + " " + (b.getAsInt() == b.getAsInt()));
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada chamada de `a.get()` embrulha 1000 num `Integer` novo, fora do cache de -128 a 127, e `==` compara referências. Com `int`, a comparação é de valores.',
    },
    {
      id: 'pleno-t5-e02-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais pares de interface e método estão corretos? Escolha duas.',
      opcoes: [
        '`BooleanSupplier`: `getAsBoolean()`',
        '`ObjIntConsumer<T>`: `accept(T, int)`',
        '`IntFunction<R>`: `applyAsInt(int)`',
        '`ToLongFunction<T>`: `apply(T)`',
        '`DoubleSupplier`: `get()`',
      ],
      respostas: [0, 1],
      explicacao: '`IntFunction` devolve objeto e usa `apply`; `ToLongFunction` devolve `long` e usa `applyAsLong`; `DoubleSupplier` usa `getAsDouble`.',
    },
    {
      id: 'pleno-t5-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        ObjIntConsumer<List<Integer>> quadrado = (l, n) -> l.add(n * n);
        List<Integer> l = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            quadrado.accept(l, i);
        }
        System.out.println(l);
    }
}`,
      opcoes: ['`[1, 4, 9]`', '`[1, 2, 3]`', '`[]`', 'Não compila: `accept` não aceita dois argumentos'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`ObjIntConsumer` recebe um objeto e um `int` sem embrulhá-lo. O `boolean` devolvido por `add` é descartado.',
    },
    {
      id: 'pleno-t5-e02-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BiFunction<Integer, Integer, Integer> soma2 = (a, b) -> a + b;
        TriFunction<Integer, Integer, Integer, Integer> soma3 = (a, b, c) -> a + b + c;
        System.out.println(soma2.apply(1, 2) + soma3.apply(1, 2, 3));
    }
}`,
      opcoes: [
        'Não compila: `TriFunction` não existe no pacote `java.util.function`',
        'Compila e imprime `9`',
        'Compila e imprime `36`',
        'Não compila: `BiFunction` precisa de dois tipos',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'O pacote só vai até duas entradas. Para três, é preciso declarar uma interface funcional própria.',
    },
    {
      id: 'pleno-t5-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BiConsumer<String, Integer> mostrar = (k, v) -> System.out.print(k + "=" + v + ";");
        new TreeMap<>(Map.of("b", 2, "a", 1)).forEach(mostrar);
        System.out.println();
    }
}`,
      opcoes: ['`a=1;b=2;`', '`b=2;a=1;`', '`{a=1, b=2}`', 'Não compila: `forEach` de mapas recebe um `Consumer`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Map.forEach` recebe um `BiConsumer` com a chave e o valor. O `TreeMap` percorre as chaves em ordem.',
    },
    {
      id: 'pleno-t5-e02-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual interface representa uma função que recebe um `int` e devolve um objeto?',
      opcoes: ['`IntFunction<R>`', '`ToIntFunction<T>`', '`IntUnaryOperator`', '`IntSupplier`'],
      resposta: 0,
      explicacao: 'O prefixo `Int` diz o que entra; o `To` diz o que sai. `ToIntFunction` faz o inverso, e `IntUnaryOperator` devolve outro `int`.',
    },
    {
      id: 'pleno-t5-e02-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        ToDoubleBiFunction<Integer, Integer> media = (a, b) -> (a + b) / 2.0;
        IntToLongFunction quadrado = n -> (long) n * n;
        System.out.println(media.applyAsDouble(3, 4) + " " + quadrado.applyAsLong(100_000));
    }
}`,
      resposta: '3.5 10000000000',
      explicacao: 'A média é calculada em `double`. O cast para `long` antes da multiplicação evita o estouro de `int`.',
    },
    {
      id: 'pleno-t5-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        IntFunction<Integer> f = n -> n;
        int r = f.applyAsInt(3);
        System.out.println(r);
    }
}`,
      opcoes: [
        'Não compila: `IntFunction` usa `apply`',
        'Compila e imprime `3`',
        'Não compila: `IntFunction` não pode devolver `Integer`',
        'Compila com aviso de autoboxing',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: '`IntFunction<R>` recebe `int` mas devolve um objeto do tipo `R`, então o método é `apply`. `applyAsInt` pertence às interfaces que devolvem `int`.',
    },
  ],
};

export default episodio;
