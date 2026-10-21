import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t5-e03',
  minutos: 14,
  aula,
  armadilhas: [
    'Quatro formas: `Classe::estatico`, `objeto::metodo`, `Tipo::metodoDeInstancia` e `Classe::new`.',
    'Em `Tipo::metodoDeInstancia`, o objeto é o primeiro parâmetro da interface: `String::length` é uma `Function<String, Integer>`.',
    'Nunca há parênteses: `String::length()` não compila.',
    '`Integer::toString` numa `Function<Integer, String>` é ambígua (estático ou de instância) e não compila.',
    'Um método de instância não pode ser referenciado como estático: `Classe::metodoDeInstancia` num `Supplier` não compila.',
    'Em `objeto::metodo`, o objeto é avaliado na criação: a variável não precisa ser efetivamente final.',
    'Com objeto `null`, a referência lança `NullPointerException` já na criação; a lambda equivalente só ao ser chamada.',
    '`super::metodo` chama a versão da superclasse, ignorando a sobrescrita.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Writing Lambda Expressions as Method References',
      url: 'https://dev.java/learn/language/fp/lambdas/method-references/',
      tipo: 'documentacao',
      porque: 'As quatro formas de referência, com a lambda equivalente de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Method References',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html',
      tipo: 'documentacao',
      porque: 'A tabela clássica dos tipos de referência e exemplos com comparadores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.13: Method Reference Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.13',
      tipo: 'documentacao',
      porque: 'Como o compilador escolhe o método, quando há ambiguidade e quando o objeto é avaliado.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Method References in Java',
      url: 'https://www.baeldung.com/java-method-references',
      tipo: 'artigo',
      porque: 'Exemplos de cada forma, inclusive com construtores e varargs.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Method Reference pt 01, Referência a métodos estáticos',
      url: 'https://www.youtube.com/watch?v=f7jGNzFMQb4',
      tipo: 'video',
      porque: 'A forma mais simples de referência, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Method Reference pt 02, Referência a métodos não estáticos',
      url: 'https://www.youtube.com/watch?v=E2Ev36YbjDo',
      tipo: 'video',
      porque: 'As duas formas com métodos de instância, a que mais confunde, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Method Reference pt 03, Referência a construtor',
      url: 'https://www.youtube.com/watch?v=2dUHGheKl9s',
      tipo: 'video',
      porque: 'Construtores como funções, com `Supplier` e `Function`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Dan Vega: Java Method References, A Beginner\'s Guide',
      url: 'https://www.youtube.com/watch?v=DELCbBuCHHE',
      tipo: 'video',
      porque: 'Quando trocar uma lambda por referência e como ler cada forma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Challengers: Java Lambda Expression Method Reference',
      url: 'https://www.youtube.com/watch?v=ikxFSOaOtZg',
      tipo: 'video',
      porque: 'Um desafio no estilo da prova sobre a tradução de referências.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'A tabela das cinco formas de referência e o critério para preferir referência ou lambda.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Lambdas and Streams": Item 43, "Prefer method references to lambdas"',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'Receitas para transformar lambdas em referências e referências a construtores.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Lambda expressions": seção 3.6, "Method references"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As quatro formas com a tabela de lambdas equivalentes que a prova usa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Lambdas and Functional Interfaces": seção "Using Method References"',
    },
  ],
  desafio: {
    titulo: 'Índice de palavras com referências',
    enunciado:
      'Crie `record Palavra(String texto, int tamanho)`. Processe a lista `"  Java "`, `""`, `"lambda"`, `"  "`, `"Stream"` e `"api"` usando referências a métodos sempre que possível: `String::strip` para limpar, `Predicate.not(String::isBlank)` para descartar as vazias, `Palavra::new` como `BiFunction<String, Integer, Palavra>` e um `TreeMap` ordenado com `String::compareToIgnoreCase`. Imprima os valores do mapa com `System.out::println`. A saída deve ser:\n\n```text\nPalavra[texto=api, tamanho=3]\nPalavra[texto=Java, tamanho=4]\nPalavra[texto=lambda, tamanho=6]\nPalavra[texto=Stream, tamanho=6]\n```',
    dicas: [
      'O construtor canônico do record recebe `(String, int)`, compatível com `BiFunction<String, Integer, Palavra>` por desembalagem.',
      '`new TreeMap<>(String::compareToIgnoreCase)` cria um mapa que ordena as chaves sem diferenciar maiúsculas.',
      '`System.out::println` é uma referência a um método do objeto `System.out`.',
    ],
    solucao: `import java.util.List;
import java.util.TreeMap;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Palavras {
    record Palavra(String texto, int tamanho) { }

    public static void main(String[] args) {
        List<String> entrada = List.of("  Java ", "", "lambda", "  ", "Stream", "api");
        Function<String, String> limpar = String::strip;
        Predicate<String> temTexto = Predicate.not(String::isBlank);
        BiFunction<String, Integer, Palavra> criar = Palavra::new;
        Supplier<TreeMap<String, Palavra>> indice = () -> new TreeMap<>(String::compareToIgnoreCase);

        TreeMap<String, Palavra> porNome = indice.get();
        for (String bruta : entrada) {
            if (temTexto.test(bruta)) {
                String limpa = limpar.apply(bruta);
                porNome.put(limpa, criar.apply(limpa, limpa.length()));
            }
        }
        porNome.values().forEach(System.out::println);
    }
}`,
    saida: 'Palavra[texto=api, tamanho=3]\nPalavra[texto=Java, tamanho=4]\nPalavra[texto=lambda, tamanho=6]\nPalavra[texto=Stream, tamanho=6]',
    comentarios:
      'Cada referência substitui uma lambda que só repassava argumentos: `String::strip` no lugar de `s -> s.strip()`, `Palavra::new` no lugar de `(t, n) -> new Palavra(t, n)`. `String::compareToIgnoreCase` vira o `compare` do comparador porque recebe dois textos, o primeiro como objeto. O `Supplier` ainda usa uma lambda, porque `new TreeMap<>(...)` precisa de argumento, e uma referência a construtor não fixa argumentos.',
  },
  exercicios: [
    {
      id: 'pleno-t5-e03-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<String, Integer> a = Integer::valueOf;
        Function<String, Integer> b = String::length;
        System.out.println(a.apply("12") + b.apply("12"));
    }
}`,
      opcoes: ['`14`', '`122`', '`24`', 'Não compila: as duas referências são ambíguas'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Integer::valueOf` converte o texto em 12, e `String::length` mede o texto: 2. Os dois `Integer` são somados.',
    },
    {
      id: 'pleno-t5-e03-q02',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`Function<String, Integer> f = String::length;`',
        '`BiFunction<String, String, Boolean> f = String::equals;`',
        '`Supplier<List<String>> s = ArrayList::new;`',
        '`Supplier<Integer> s = String::length;`',
        '`Function<Integer, String> f = Integer::toString;`',
        '`Function<String, Integer> f = String::length();`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`String::length` precisa de um objeto, que o `Supplier` não fornece. `Integer::toString` tem duas leituras possíveis. E referências não levam parênteses.',
    },
    {
      id: 'pleno-t5-e03-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        String nome = "Ana";
        Supplier<Integer> tamanho = nome::length;
        nome = "Bianca";
        System.out.println(tamanho.get());
    }
}`,
      opcoes: ['`3`', '`6`', 'Não compila: `nome` não é efetivamente final', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O objeto à esquerda de `::` é avaliado quando a referência é criada. Ela guardou "Ana", e a reatribuição posterior não a afeta. Com uma lambda `() -> nome.length()`, o código não compilaria.',
    },
    {
      id: 'pleno-t5-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        String texto = null;
        System.out.println("antes");
        Supplier<Integer> s = texto::length;
        System.out.println("criada");
        System.out.println(s.get());
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `NullPointerException`',
        'Imprime `antes`, `criada` e lança `NullPointerException`',
        'Imprime `antes`, `criada` e `0`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'antes' },
      explicacao: 'A referência confere o objeto ao ser criada e lança a exceção ali mesmo. A lambda `() -> texto.length()` só falharia no `get()`.',
    },
    {
      id: 'pleno-t5-e03-q05',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a classe do construtor referenciado. O programa deve imprimir `olá!`.',
      codigo: `import java.util.function.Function;

public class Construtor {
    public static void main(String[] args) {
        Function<String, StringBuilder> criar = ___::new;
        System.out.println(criar.apply("olá").append("!"));
    }
}`,
      respostas: ['StringBuilder'],
      saida: 'olá!',
      explicacao: 'Com uma `Function<String, ...>`, `StringBuilder::new` chama o construtor que recebe um texto.',
    },
    {
      id: 'pleno-t5-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("pera", "Abacaxi", "uva"));
        l.sort(String::compareToIgnoreCase);
        System.out.println(l);
    }
}`,
      opcoes: ['`[Abacaxi, pera, uva]`', '`[pera, uva, Abacaxi]`', '`[Abacaxi, uva, pera]`', 'Não compila: `sort` espera um `Comparator`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`String::compareToIgnoreCase` vira um `Comparator<String>`: `compare(a, b)` chama `a.compareToIgnoreCase(b)`.',
    },
    {
      id: 'pleno-t5-e03-q07',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.function.*;

public class Teste {
    String saudar() { return "oi"; }
    static String despedir() { return "tchau"; }

    public static void main(String[] args) {
        Teste t = new Teste();
        Supplier<String> a = t::saudar;
        Supplier<String> b = Teste::despedir;
        Function<Teste, String> c = Teste::saudar;
        Supplier<String> d = Teste::saudar;
        System.out.println(a.get() + b.get() + c.apply(t) + d.get());
    }
}`,
      resposta: 12,
      explicacao: '`Teste::saudar` precisa de um `Teste` para ser chamado. A `Function<Teste, String>` da linha 11 o recebe como parâmetro; o `Supplier` da linha 12 não tem de onde tirá-lo.',
    },
    {
      id: 'pleno-t5-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    static class Animal {
        String som() { return "..."; }
    }

    static class Gato extends Animal {
        @Override
        String som() { return "miau"; }

        String dois() {
            Supplier<String> pai = super::som;
            Supplier<String> eu = this::som;
            return pai.get() + " " + eu.get();
        }
    }

    public static void main(String[] args) {
        System.out.println(new Gato().dois());
    }
}`,
      opcoes: ['`... miau`', '`miau miau`', '`... ...`', 'Não compila: `super::` não é permitido'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`super::som` aponta para a versão da superclasse, sem despacho polimórfico. `this::som` usa a versão sobrescrita.',
    },
    {
      id: 'pleno-t5-e03-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BiFunction<String, String, String> juntar = String::concat;
        UnaryOperator<String> maiuscula = String::toUpperCase;
        System.out.println(maiuscula.apply(juntar.apply("ja", "va")));
    }
}`,
      resposta: 'JAVA',
      explicacao: 'Em `String::concat`, o primeiro parâmetro é o objeto e o segundo, o argumento: `"ja".concat("va")`.',
    },
    {
      id: 'pleno-t5-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, String> a = String::valueOf;
        Function<Integer, String> b = Integer::toString;
        System.out.println(a.apply(1) + b.apply(2));
    }
}`,
      opcoes: [
        'Não compila: `Integer::toString` é ambígua',
        'Compila e imprime `12`',
        'Compila e imprime `3`',
        'Não compila: `String::valueOf` é ambígua',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'O `Integer` pode ser o objeto de `toString()` ou o argumento de `Integer.toString(int)`. Em `String::valueOf`, só a versão estática existe, e a escolha entre as sobrecargas é única.',
    },
    {
      id: 'pleno-t5-e03-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais traduções estão corretas? Escolha duas.',
      opcoes: [
        '`String::isEmpty` equivale a `s -> s.isEmpty()`',
        '`System.out::println` equivale a `x -> System.out.println(x)`',
        '`Math::max` equivale a `() -> Math.max()`',
        '`ArrayList::new` só pode ser usado como `Supplier`',
        'Referências a métodos exigem variável efetivamente final à esquerda do `::`',
      ],
      respostas: [0, 1],
      explicacao: '`Math::max` recebe os dois números como parâmetros, `ArrayList::new` também serve a uma `Function<Integer, ...>`, e o objeto da referência é avaliado na criação, sem exigência de efetivamente final.',
    },
    {
      id: 'pleno-t5-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        IntFunction<String[]> criar = String[]::new;
        String[] a = criar.apply(2);
        System.out.println(a.length + " " + a[0]);
    }
}`,
      opcoes: ['`2 null`', 'Lança `NullPointerException`', 'Não compila: arrays não têm construtor', '`0 null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`String[]::new` equivale a `n -> new String[n]`. O array nasce com as posições em `null`.',
    },
    {
      id: 'pleno-t5-e03-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    String prefixo = "> ";

    String marcar(String s) {
        return prefixo + s;
    }

    public static void main(String[] args) {
        Teste t = new Teste();
        Function<String, String> marca = t::marcar;
        t.prefixo = "# ";
        t = new Teste();
        System.out.println(marca.apply("x") + t.marcar("y"));
    }
}`,
      opcoes: ['`# x> y`', '`> x> y`', '`# x# y`', 'Não compila: `t` não é efetivamente final'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A referência guardou o primeiro objeto, cujo campo foi alterado para "# ". A variável `t` passou a apontar para um objeto novo, com o prefixo original, mas isso não afeta a referência.',
    },
    {
      id: 'pleno-t5-e03-q14',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BiFunction<String, Integer, Character> letra = String::charAt;
        Function<Object, String> texto = String::valueOf;
        System.out.println(letra.apply("javaflix", 4) + texto.apply(3.5));
    }
}`,
      resposta: 'f3.5',
      explicacao: '`String::charAt` recebe o texto como objeto e o índice como argumento. Um `Character` mais uma `String` resulta em concatenação.',
    },
    {
      id: 'pleno-t5-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que o `javac` gera para uma referência a método como `String::length`?',
      opcoes: [
        'Um `invokedynamic` que aponta direto para o método referenciado, sem método `lambda$` intermediário',
        'Um método privado `lambda$main$0` que chama `length`',
        'Uma classe anônima em um arquivo `.class` separado',
        'Uma chamada direta a `length`, sem criar objeto nenhum',
      ],
      resposta: 0,
      explicacao: 'O método já existe, então não há corpo a extrair. Na execução, a JVM cria o objeto que implementa a interface e chama o método referenciado.',
    },
  ],
};

export default episodio;
