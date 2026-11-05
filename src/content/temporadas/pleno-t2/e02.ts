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
  ia: {
    uso:
      'A IA explica bem por que uma chamada genérica inferiu certo tipo e gera variações para treinar a posição do `<T>`. Ela erra em detalhes que a prova cobra: esquece o `<T>` de métodos estáticos, cria a sombra de um `T` da classe e escreve a testemunha explícita sem o qualificador, como `<String>primeiro(lista)`.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui o método genérico e as chamadas>\n- Para cada chamada, diga qual tipo o compilador infere para T e de onde ele tirou essa informação: argumentos, destino ou lambda.\n- Aponte se algum <T> esconde o da classe ou se um método static usa o T da classe.\n- Mostre a mesma chamada com testemunha explícita, do jeito que compila.\n- Não acrescente casts nem @SuppressWarnings para fazer compilar.',
    erros: [
      'Declara uma fábrica `static Caixa<T> de(T valor)` sem o `<T>` próprio, que não compila.',
      'Repete `<T>` num método de instância de uma classe genérica e cria um tipo novo, que esconde o da classe.',
      'Escreve a testemunha sem qualificador, `<String>primeiro(lista)`, que não compila.',
      'Diz que a inferência usa o tipo real do objeto na execução, e não os tipos estáticos.',
    ],
    conferir: [
      'Compile cada versão: posição do `<T>`, sombra e testemunha são regras de compilação.',
      'Use `Ctrl+Shift+P` no IntelliJ sobre a chamada para ver o tipo inferido.',
      'Atribua o resultado a uma variável do tipo esperado e veja se o compilador aceita sem cast.',
    ],
  },
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
  bugs: [
    {
      id: 'pleno-t2-e02-b01',
      dificuldade: 1,
      sintoma: 'A fábrica estática `Resultado.ok` não compila: `non-static type variable T cannot be referenced from a static context`.',
      codigo: `public class Resultados {
    static class Resultado<T> {
        final T valor;
        final String erro;

        Resultado(T valor, String erro) {
            this.valor = valor;
            this.erro = erro;
        }

        static Resultado<T> ok(T valor) { return new Resultado<>(valor, null); }

        boolean sucesso() {
            return erro == null;
        }
    }

    public static void main(String[] args) {
        Resultado<Integer> r = Resultado.ok(42);
        System.out.println(r.sucesso() + " " + r.valor);
    }
}`,
      linha: 11,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Resultados {
    static class Resultado<T> {
        final T valor;
        final String erro;

        Resultado(T valor, String erro) {
            this.valor = valor;
            this.erro = erro;
        }

        static <T> Resultado<T> ok(T valor) { return new Resultado<>(valor, null); }

        boolean sucesso() {
            return erro == null;
        }
    }

    public static void main(String[] args) {
        Resultado<Integer> r = Resultado.ok(42);
        System.out.println(r.sucesso() + " " + r.valor);
    }
}`,
      saidaCorrigida: 'true 42',
      dica: 'Um método `static` pertence a qual `Resultado`: ao de `Integer`, ao de `String`, a nenhum?',
      explicacao:
        'O `T` da classe só existe para uma instância parametrizada, e um método `static` não pertence a nenhuma. A fábrica precisa declarar o próprio parâmetro de tipo, `static <T> Resultado<T> ok(T valor)`, como fazem `List.of` e `Optional.of`. O `T` do método é outro `T`, que só tem o mesmo nome por convenção.',
    },
    {
      id: 'pleno-t2-e02-b02',
      dificuldade: 2,
      sintoma: 'O recibo deveria mostrar o total em reais, com duas casas, mas mostra o número cru: `total: 45`.',
      codigo: `import java.math.BigDecimal;
import java.util.List;

public class Recibo {
    static String formatar(Object valor) {
        return String.valueOf(valor);
    }

    static String formatar(BigDecimal valor) {
        return "R$ " + valor.setScale(2);
    }

    static <T> T ultimo(List<T> itens) {
        return itens.get(itens.size() - 1);
    }

    public static void main(String[] args) {
        List<Object> totais = List.of(new BigDecimal("19.9"), new BigDecimal("45"));
        System.out.println("total: " + formatar(ultimo(totais)));
    }
}`,
      linha: 18,
      efeito: { tipo: 'saida', saida: 'total: 45' },
      correcao: `import java.math.BigDecimal;
import java.util.List;

public class Recibo {
    static String formatar(Object valor) {
        return String.valueOf(valor);
    }

    static String formatar(BigDecimal valor) {
        return "R$ " + valor.setScale(2);
    }

    static <T> T ultimo(List<T> itens) {
        return itens.get(itens.size() - 1);
    }

    public static void main(String[] args) {
        List<BigDecimal> totais = List.of(new BigDecimal("19.9"), new BigDecimal("45"));
        System.out.println("total: " + formatar(ultimo(totais)));
    }
}`,
      saidaCorrigida: 'total: R$ 45.00',
      dica: 'Qual `formatar` o compilador escolhe depende do tipo que ele infere para `ultimo(totais)`. Que tipo é esse?',
      explicacao:
        'A sobrecarga é escolhida na compilação, pelo tipo estático do argumento. Com `List<Object>`, o `T` de `ultimo` é inferido como `Object`, e o compilador chama `formatar(Object)`, mesmo que o objeto seja um `BigDecimal`. Com `List<BigDecimal>`, o `T` vira `BigDecimal`, e a sobrecarga certa é escolhida.',
    },
    {
      id: 'pleno-t2-e02-b03',
      dificuldade: 3,
      sintoma: 'A aplicação não sobe: `ClassCastException: class java.lang.String cannot be cast to class java.lang.Integer`, apontando a linha que lê o timeout, e não o método que leu a configuração.',
      codigo: `import java.util.Map;

public class Configuracao {
    static final Map<String, Object> VALORES = Map.of("timeout", "30", "tentativas", 3);

    @SuppressWarnings("unchecked")
    static <T> T valor(String chave) {
        return (T) VALORES.get(chave);
    }

    public static void main(String[] args) {
        int tentativas = valor("tentativas");
        int timeout = valor("timeout");
        System.out.println("tentativas: " + tentativas + ", timeout: " + timeout + "s");
    }
}`,
      linha: 13,
      efeito: { tipo: 'excecao', nome: 'ClassCastException' },
      correcao: `import java.util.Map;

public class Configuracao {
    static final Map<String, Object> VALORES = Map.of("timeout", "30", "tentativas", 3);

    @SuppressWarnings("unchecked")
    static <T> T valor(String chave) {
        return (T) VALORES.get(chave);
    }

    public static void main(String[] args) {
        int tentativas = valor("tentativas");
        int timeout = Integer.parseInt(valor("timeout"));
        System.out.println("tentativas: " + tentativas + ", timeout: " + timeout + "s");
    }
}`,
      saidaCorrigida: 'tentativas: 3, timeout: 30s',
      dica: 'O cast `(T)` dentro de `valor` confere alguma coisa? Onde está o cast que de fato falhou?',
      explicacao:
        'O `(T)` é um cast sem verificação: depois do apagamento, `valor` devolve `Object`, e quem confere é o `checkcast` que o compilador põe na chamada, com o tipo inferido pelo destino, aqui `Integer` por causa do `int`. Como o timeout está guardado como texto, o erro estoura longe da causa. A correção converte o texto; um projeto melhor recebe o tipo esperado, `valor(chave, Integer.class)`, e usa `tipo.cast(...)` para falhar com uma mensagem clara.',
    },
  ],
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
      dica: 'O `<T>` vem depois dos modificadores e antes do tipo de retorno; a ordem dos modificadores é livre.',
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
      dica: 'O meio de um array de tamanho 3 é o índice 1; de tamanho 4, o índice 2.',
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
      dica: 'A testemunha explícita precisa de algo antes do ponto.',
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
      dica: 'Dentro do método, a expressão opera sobre `T`; fora, sobre números.',
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
      dica: 'O `<T>` do método esconde o da classe: `valor` é de outro `T`.',
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
      dica: 'Com `var`, o tipo de `x` é a interseção de `String` e `Integer`.',
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
      dica: 'O método precisa declarar o próprio parâmetro de tipo.',
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
      dica: 'Cada `mapear` cria uma caixa nova, com o resultado da função.',
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
      dica: 'Construtores também podem ser genéricos, com a testemunha depois do `new`.',
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
      dica: 'A inferência é feita na compilação, com informações estáticas.',
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
      dica: 'O tipo não existe na execução, então uma só lista vazia serve a todos.',
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
      dica: 'O compilador sabe que `List<String>` e `List<Integer>` são tipos distintos.',
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
      dica: 'O tipo esperado à esquerda fixa o `T` de `asList`.',
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
      dica: '`a` tem dois elementos, e `b`, três.',
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
      dica: 'Um método `static` não pertence a nenhuma instância parametrizada.',
    },
  ],
};

export default episodio;
