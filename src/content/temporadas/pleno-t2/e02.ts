import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t2-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'O `<T>` de um método vem depois dos modificadores e antes do tipo de retorno: `public static <T> T f(T t)`.',
    '`public static T <T> f()` e `<T> public static T f()` não compilam.',
    'Métodos `static` não enxergam o `T` da classe e precisam declarar o próprio.',
    'Um `<T>` declarado num método de instância esconde o `T` da classe; são tipos diferentes.',
    'A testemunha explícita exige qualificador: `Util.<String>f()` ou `this.<String>f()`; `<String>f()` sozinho não compila.',
    'Com argumentos de tipos diferentes, a inferência chega a um tipo interseção, e `var` só oferece os métodos comuns.',
    'Dentro de um método genérico, `cond ? a : b` com operandos `T` não sofre promoção numérica.',
    '`List<Integer> l = Arrays.asList(1, 2.5);` não compila; com `List<Number>` à esquerda, compila.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Generic Methods',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/methods.html',
      tipo: 'documentacao',
      porque: 'A sintaxe de métodos genéricos e a chamada com o tipo explícito.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Type Inference',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/genTypeInference.html',
      tipo: 'documentacao',
      porque: 'Inferência pelos argumentos, pelo destino, no diamante e em construtores genéricos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Type Inference',
      url: 'https://dev.java/learn/language/fp/generics/type-inference/',
      tipo: 'documentacao',
      porque: 'A versão atualizada do tutorial de inferência, com tipos-alvo e lambdas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.4: Generic Methods',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.4',
      tipo: 'documentacao',
      porque: 'A definição formal de método genérico e do escopo dos seus parâmetros de tipo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS, capítulo 18: Type Inference',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-18.html',
      tipo: 'documentacao',
      porque: 'O algoritmo de inferência como sistema de restrições: variáveis de inferência, limites e resolução.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 101: Generalized Target-Type Inference',
      url: 'https://openjdk.org/jeps/101',
      tipo: 'documentacao',
      porque: 'A proposta do Java 8 que passou a usar o parâmetro de destino na inferência.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Generalized Target-Type Inference in Java',
      url: 'https://www.baeldung.com/java-generalized-target-type-inference',
      tipo: 'artigo',
      porque: 'O que mudou na inferência do Java 8, com exemplos de antes e depois.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Generic Constructors in Java',
      url: 'https://www.baeldung.com/java-generic-constructors',
      tipo: 'artigo',
      porque: 'Construtores genéricos em classes comuns e genéricas, um detalhe que a prova pode cobrar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Generics pt 06, Métodos Genéricos',
      url: 'https://www.youtube.com/watch?v=_feJhRzYxYk',
      tipo: 'video',
      porque: 'Declarando e chamando métodos genéricos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Programming with Mosh: Java Generics Tutorial',
      url: 'https://www.youtube.com/watch?v=7i3Rliqzquw',
      tipo: 'video',
      porque: 'De uma lista sem tipo a classes e métodos genéricos, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Quando transformar um método utilitário em genérico, incluindo fábricas e o padrão de identidade genérica.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Generics": Item 30, "Favor generic methods"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As posições válidas do `<T>`, a testemunha explícita e a sombra de parâmetros de tipo, como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Working with Generics", parte "Writing Generic Methods"',
    },
  ],
  desafio: {
    titulo: 'Utilitários genéricos',
    enunciado:
      'Escreva dois métodos estáticos genéricos. `intercalar(List<T> a, List<T> b)` devolve uma nova lista alternando os elementos das duas, começando por `a`, e acrescenta no fim o que sobrar da maior. `maisFrequente(List<T> itens)` devolve o elemento que mais aparece; em caso de empate, o que atingiu a contagem máxima primeiro. Lista vazia lança `IllegalArgumentException("lista vazia")`. No `main`, intercale `[1, 3, 5, 7]` com `[2, 4]`, ache o mais votado em `["java", "kotlin", "java", "go", "kotlin", "java"]` e na lista intercalada, e intercale `List.of("a")` com `List.of(1)` usando uma testemunha explícita `<Object>`. A saída deve ser:\n\n```text\n[1, 2, 3, 4, 5, 7]\njava\n1\n[a, 1]\n```',
    dicas: [
      'Percorra até o tamanho da maior lista e confira o índice em cada uma antes de ler.',
      'Um `Map<T, Integer>` conta as ocorrências; `getOrDefault(item, 0)` evita o `null`.',
      'Para a testemunha num método estático, escreva o nome da classe antes: `Classe.<Object>intercalar(...)`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Genericos {
    static <T> List<T> intercalar(List<T> a, List<T> b) {
        List<T> resultado = new ArrayList<>();
        int maior = Math.max(a.size(), b.size());
        for (int i = 0; i < maior; i++) {
            if (i < a.size()) {
                resultado.add(a.get(i));
            }
            if (i < b.size()) {
                resultado.add(b.get(i));
            }
        }
        return resultado;
    }

    static <T> T maisFrequente(List<T> itens) {
        if (itens.isEmpty()) {
            throw new IllegalArgumentException("lista vazia");
        }
        Map<T, Integer> contagem = new HashMap<>();
        T melhor = itens.get(0);
        for (T item : itens) {
            int n = contagem.getOrDefault(item, 0) + 1;
            contagem.put(item, n);
            if (n > contagem.get(melhor)) {
                melhor = item;
            }
        }
        return melhor;
    }

    public static void main(String[] args) {
        List<Integer> mesclada = intercalar(List.of(1, 3, 5, 7), List.of(2, 4));
        System.out.println(mesclada);
        List<String> votos = List.of("java", "kotlin", "java", "go", "kotlin", "java");
        System.out.println(maisFrequente(votos));
        System.out.println(maisFrequente(mesclada));
        System.out.println(Genericos.<Object>intercalar(List.of("a"), List.of(1)));
    }
}`,
    saida: '[1, 2, 3, 4, 5, 7]\njava\n1\n[a, 1]',
    comentarios:
      'Os dois métodos funcionam para qualquer tipo porque só usam o que todo objeto tem: `equals` e `hashCode`, por meio do `HashMap`. Como `melhor` só muda quando uma contagem **supera** a dele, o empate fica com quem chegou primeiro. Na última linha, a testemunha `<Object>` faz `List.of("a")` e `List.of(1)` serem lidas como `List<Object>`. Sem ela, a inferência também resolveria, chegando a um tipo interseção de `String` e `Integer`.',
  },
  exercicios: [
    {
      id: 'pleno-t2-e02-q01',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`class A { static <T> T f(T t) { return t; } }`',
        '`class B { public <T> void f(T t) { } }`',
        '`class C { static public <T> void f(T t) { } }`',
        '`class D { <T> public static void f(T t) { } }`',
        '`class E { public static T <T> f(T t) { return t; } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O `<T>` fica entre os modificadores e o tipo de retorno. A ordem dos modificadores entre si é livre, e métodos de instância também podem ser genéricos.',
    },
    {
      id: 'pleno-t2-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    static <T> T meio(T[] itens) {
        return itens[itens.length / 2];
    }

    public static void main(String[] args) {
        Integer[] numeros = {5, 8, 13};
        String[] letras = {"x", "y", "z", "w"};
        System.out.println(meio(numeros) + meio(letras));
    }
}`,
      resposta: '8z',
      explicacao: 'Para 3 elementos, o índice é 1; para 4, é 2. O primeiro operando é um `Integer` e o segundo, uma `String`, então o `+` concatena.',
    },
    {
      id: 'pleno-t2-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    static <T> T primeiro(List<T> lista) {
        return lista.get(0);
    }

    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia");
        String a = Teste.<String>primeiro(nomes);
        String b = <String>primeiro(nomes);
        System.out.println(a + b);
    }
}`,
      opcoes: [
        'Não compila: a testemunha explícita precisa de um qualificador antes',
        'Compila e imprime `AnaAna`',
        'Não compila: métodos estáticos não aceitam testemunha explícita',
        'Compila e imprime `AnaBia`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 11 },
      explicacao: 'A linha 10 é válida. Na 11, `<String>primeiro(...)` sem `Teste.` antes é erro de sintaxe.',
    },
    {
      id: 'pleno-t2-e02-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static <T> T escolher(boolean primeiro, T a, T b) {
        return primeiro ? a : b;
    }

    public static void main(String[] args) {
        Number a = escolher(true, 1, 2.5);
        Number b = true ? 1 : 2.5;
        System.out.println(a + " " + b);
    }
}`,
      opcoes: ['`1 1.0`', '`1.0 1.0`', '`1 1`', '`1.0 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No método genérico, os operandos são do tipo `T`, e o `Integer` 1 é devolvido como está. Na expressão direta, `1` e `2.5` são numéricos, e o resultado é promovido a `double`.',
    },
    {
      id: 'pleno-t2-e02-q05',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Caixa<T> {
    private T valor;

    Caixa(T valor) {
        this.valor = valor;
    }

    T ler() {
        return valor;
    }

    <T> T substituir(T novo) {
        T antigo = valor;
        return novo;
    }
}`,
      resposta: 13,
      explicacao: 'O `<T>` de `substituir` cria um tipo novo que esconde o `T` da classe. `valor` é do `T` da classe e não pode ser atribuído ao `T` do método.',
    },
    {
      id: 'pleno-t2-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    static <T> T escolher(T a, T b) {
        return a;
    }

    public static void main(String[] args) {
        var x = escolher("texto", 42);
        System.out.println(x.length());
    }
}`,
      opcoes: [
        'Não compila: `x` não tem o método `length()`',
        'Compila e imprime `5`',
        'Não compila: `T` não pode ser inferido',
        'Compila e lança `ClassCastException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'O tipo inferido é a interseção dos supertipos comuns de `String` e `Integer`, como `Serializable` e `Comparable`. `length()` não está entre eles.',
    },
    {
      id: 'pleno-t2-e02-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que `primeiro` seja um método genérico. O programa deve imprimir `Ana 3`.',
      codigo: `import java.util.List;

public class Lista {
    static ___ T primeiro(List<T> itens) {
        return itens.get(0);
    }

    public static void main(String[] args) {
        System.out.println(primeiro(List.of("Ana", "Bia")) + " " + primeiro(List.of(3, 4)));
    }
}`,
      respostas: ['<T>'],
      saida: 'Ana 3',
      explicacao: 'A declaração do parâmetro de tipo fica logo antes do tipo de retorno.',
    },
    {
      id: 'pleno-t2-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.Function;

public class Teste {
    static class Caixa<T> {
        private final T valor;

        Caixa(T valor) {
            this.valor = valor;
        }

        <R> Caixa<R> mapear(Function<T, R> f) {
            return new Caixa<>(f.apply(valor));
        }
    }

    public static void main(String[] args) {
        Caixa<Integer> c = new Caixa<>("abc").mapear(String::length).mapear(n -> n * n);
        System.out.println(c.valor);
    }
}`,
      opcoes: ['`9`', '`3`', '`abcabcabc`', 'Não compila: `mapear` não pode declarar outro parâmetro de tipo'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um método de instância pode declarar parâmetros de tipo além dos da classe. A cadeia vai de `Caixa<String>` para `Caixa<Integer>` com 3 e depois para 9.',
    },
    {
      id: 'pleno-t2-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static class Etiqueta {
        private final String texto;

        <T> Etiqueta(T valor) {
            texto = "[" + valor + "]";
        }
    }

    public static void main(String[] args) {
        Etiqueta a = new Etiqueta(42);
        Etiqueta b = new <String>Etiqueta("ok");
        System.out.println(a.texto + b.texto);
    }
}`,
      opcoes: [
        '`[42][ok]`',
        'Não compila: construtores não podem ser genéricos',
        'Não compila: `new <String>Etiqueta` não é sintaxe válida',
        '`[ok][42]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Construtores podem declarar parâmetros de tipo, mesmo numa classe comum. A testemunha explícita vai logo depois do `new`.',
    },
    {
      id: 'pleno-t2-e02-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais informações o compilador usa para inferir o argumento de tipo de um método genérico? Escolha três.',
      opcoes: [
        'Os tipos dos argumentos passados na chamada',
        'O tipo do lado esquerdo de uma atribuição',
        'O tipo do parâmetro de outro método que recebe a chamada como argumento',
        'O tipo real dos objetos em tempo de execução',
        'O nome da variável que recebe o resultado',
      ],
      respostas: [0, 1, 2],
      explicacao: 'A inferência é feita na compilação, a partir dos argumentos e do destino. Desde o Java 8, o destino inclui o parâmetro de outro método. Nada da execução participa.',
    },
    {
      id: 'pleno-t2-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> textos = Collections.emptyList();
        List<Integer> numeros = Collections.emptyList();
        System.out.println((Object) textos == numeros);
    }
}`,
      opcoes: ['`true`', '`false`', 'Não compila: os tipos são incomparáveis', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`emptyList()` devolve sempre a mesma instância, que serve a qualquer `T` porque o tipo não existe na execução. O cast para `Object` evita o erro de tipos incomparáveis.',
    },
    {
      id: 'pleno-t2-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> textos = Collections.emptyList();
        List<Integer> numeros = Collections.emptyList();
        System.out.println(textos == numeros);
    }
}`,
      opcoes: [
        'Não compila: `List<String>` e `List<Integer>` são tipos incomparáveis',
        'Compila e imprime `true`',
        'Compila e imprime `false`',
        'Compila com aviso de `unchecked`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'O compilador sabe que nenhum objeto poderia ser ao mesmo tempo as duas parametrizações e recusa a comparação, mesmo que na execução as referências sejam iguais.',
    },
    {
      id: 'pleno-t2-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2.5);
        System.out.println(numeros);
    }
}`,
      opcoes: [
        'Não compila: `2.5` não é um `Integer`',
        'Compila e imprime `[1, 2]`',
        'Compila e imprime `[1, 2.5]`',
        'Lança `ClassCastException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'O destino fixa `T` como `Integer`, e um `Double` não cabe. Com `List<Number>` à esquerda, compilaria.',
    },
    {
      id: 'pleno-t2-e02-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    static <T> List<T> repetir(T item, int vezes) {
        List<T> lista = new ArrayList<>();
        for (int i = 0; i < vezes; i++) {
            lista.add(item);
        }
        return lista;
    }

    public static void main(String[] args) {
        List<String> a = repetir("ab", 2);
        List<Integer> b = repetir(3, 3);
        System.out.println(a + "" + b.size() + String.join("", a));
    }
}`,
      resposta: '[ab, ab]3abab',
      explicacao: 'O mesmo método gera uma `List<String>` e uma `List<Integer>`. `String.join` cola os elementos sem separador.',
    },
    {
      id: 'pleno-t2-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    static class Caixa<T> {
        private final T valor;

        Caixa(T valor) {
            this.valor = valor;
        }

        static Caixa<T> de(T valor) {
            return new Caixa<>(valor);
        }
    }
}`,
      opcoes: [
        'Não compila: o método `static` não pode usar o `T` da classe',
        'Compila',
        'Não compila: o construtor precisa ser `public`',
        'Compila, mas `de` só aceita `Object`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'Um método `static` não pertence a nenhuma parametrização da classe. Ele precisa declarar o próprio parâmetro: `static <T> Caixa<T> de(T valor)`.',
    },
  ],
};

export default episodio;
