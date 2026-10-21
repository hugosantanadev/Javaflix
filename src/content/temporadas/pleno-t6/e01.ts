import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t6-e01',
  minutos: 16,
  aula,
  armadilhas: [
    'Sem operação terminal, nada executa: um `peek` ou um `map` com `println` não imprime nada.',
    'Uma stream só pode ser consumida uma vez; a segunda operação terminal lança `IllegalStateException`.',
    'A fonte não é modificada: `map` cria valores novos e a lista original continua igual.',
    '`IntStream.range(1, 4)` exclui o 4; `rangeClosed(1, 4)` inclui.',
    '`Stream.iterate` e `Stream.generate` sem `limit` são infinitas; com `sorted` ou `toList`, o programa nunca termina.',
    '`takeWhile` para no primeiro elemento que falha; `dropWhile` descarta só o começo e mantém todo o resto.',
    'Cada elemento atravessa o pipeline inteiro antes do próximo; `sorted` é uma barreira que precisa de todos.',
    '`IntStream` não tem `toList()`; é preciso `boxed()` antes.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Processing Data in Memory Using the Stream API',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/map-filter-reduce/',
      tipo: 'documentacao',
      porque: 'O modelo de map, filter e reduce que sustenta a API de streams.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Creating Streams',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/creating/',
      tipo: 'documentacao',
      porque: 'Todas as formas de criar uma stream, das coleções aos geradores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Adding Intermediate Operations on a Stream',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/intermediate-operation/',
      tipo: 'documentacao',
      porque: 'Cada operação intermediária, com as que guardam estado e as de curto-circuito.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.stream: Stream operations and pipelines',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html#StreamOps',
      tipo: 'documentacao',
      porque: 'A definição oficial de preguiça, operações com estado e curto-circuito.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.util.stream.Stream',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html',
      tipo: 'documentacao',
      porque: 'Os métodos da interface, inclusive `iterate` com predicado e `mapMulti`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Introduction to Java Streams',
      url: 'https://www.baeldung.com/java-8-streams-introduction',
      tipo: 'artigo',
      porque: 'Os conceitos básicos de pipeline com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: The Java Stream API Tutorial',
      url: 'https://www.baeldung.com/java-8-streams',
      tipo: 'artigo',
      porque: 'Um tutorial longo, da criação à avaliação preguiçosa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Streams pt 01, Introduction pt 01',
      url: 'https://www.youtube.com/watch?v=ID9zo1hSbXw',
      tipo: 'video',
      porque: 'Por que streams e como montar o primeiro pipeline, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Streams pt 09, Gerando streams pt 01',
      url: 'https://www.youtube.com/watch?v=3Ud0CDMdwiY',
      tipo: 'video',
      porque: 'As fábricas de streams, inclusive as infinitas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Amigoscode: Java Streams Tutorial',
      url: 'https://www.youtube.com/watch?v=Q93JsQ8vcwY',
      tipo: 'video',
      porque: 'Um passeio prático pelas operações mais usadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Quando streams deixam o código mais claro e quando um laço é melhor.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Lambdas and Streams": Item 45, "Use streams judiciously"',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'Streams contra coleções, iteração interna e as operações intermediárias.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Introducing streams"; Cap. 5, "Working with streams"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O fluxo do pipeline, as fontes e as operações intermediárias como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Streams": seção "Using Streams", partes "Understanding the Pipeline Flow", "Creating Stream Sources" e "Using Common Intermediate Operations"',
    },
  ],
  desafio: {
    titulo: 'As vendas que mais renderam',
    enunciado:
      'Crie `record Venda(String produto, int quantidade, double preco)` com o método `double total()`. A lista tem caneta (3 × 2.5), lápis (0 × 1.0), caderno (2 × 12.0), caneta de novo (3 × 2.5, um registro duplicado), borracha (5 × 0.8) e mochila (1 × 99.9). Com streams, conte as vendas válidas (sem duplicadas e com quantidade positiva) e mostre as 3 de maior total, em ordem decrescente, no formato `produto: total`. A saída deve ser:\n\n```text\nvendas válidas: 4\nmochila: 99.9\ncaderno: 24.0\ncaneta: 7.5\n```',
    dicas: [
      'Records têm `equals` gerado, então `distinct()` remove a venda repetida.',
      '`Comparator.comparingDouble(Venda::total).reversed()` ordena do maior para o menor.',
      'Cada contagem ou listagem precisa de uma stream nova: a primeira já foi consumida pelo `count`.',
    ],
    solucao: `import java.util.Comparator;
import java.util.List;

public class Vendas {
    record Venda(String produto, int quantidade, double preco) {
        double total() {
            return quantidade * preco;
        }
    }

    public static void main(String[] args) {
        List<Venda> vendas = List.of(
            new Venda("caneta", 3, 2.5), new Venda("lápis", 0, 1.0), new Venda("caderno", 2, 12.0),
            new Venda("caneta", 3, 2.5), new Venda("borracha", 5, 0.8), new Venda("mochila", 1, 99.9));

        long validas = vendas.stream().distinct().filter(v -> v.quantidade() > 0).count();
        System.out.println("vendas válidas: " + validas);

        vendas.stream()
            .distinct()
            .filter(v -> v.quantidade() > 0)
            .sorted(Comparator.comparingDouble(Venda::total).reversed())
            .limit(3)
            .map(v -> v.produto() + ": " + v.total())
            .forEach(System.out::println);
    }
}`,
    saida: 'vendas válidas: 4\nmochila: 99.9\ncaderno: 24.0\ncaneta: 7.5',
    comentarios:
      'O pipeline lê como a descrição do problema: sem repetidas, só as válidas, ordenadas pelo total, as três primeiras, formatadas. A lista original não muda. Como cada stream só serve uma vez, a contagem e o relatório usam duas streams, e o trabalho de `distinct` e `filter` é refeito; para listas grandes, valeria guardar o resultado intermediário numa lista.',
  },
  exercicios: [
    {
      id: 'pleno-t6-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream.of(1, 2, 3).peek(System.out::print).map(x -> x * 2);
        System.out.println("fim");
    }
}`,
      opcoes: ['`fim`', '`123fim`', '`246fim`', 'Não compila: falta a operação terminal'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem operação terminal, as intermediárias só descrevem o trabalho, e nenhuma lambda executa. O código compila normalmente.',
    },
    {
      id: 'pleno-t6-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.iterate(2, n -> n <= 50, n -> n * n).toList());
    }
}`,
      resposta: '[2, 4, 16]',
      explicacao: 'A versão de três argumentos para quando o predicado falha: depois de 16 viria 256, que passa de 50.',
    },
    {
      id: 'pleno-t6-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream<String> s = Stream.of("a", "b", "c");
        System.out.println(s.count());
        System.out.println(s.count());
    }
}`,
      opcoes: [
        'Imprime `3` e lança `IllegalStateException`',
        'Imprime `3` duas vezes',
        'Imprime `3` e `0`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: '3' },
      explicacao: 'A primeira operação terminal consome a stream. Para contar de novo, seria preciso criar outra.',
    },
    {
      id: 'pleno-t6-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of(5, 6, 7, 1, 8).takeWhile(n -> n > 4).count() + " " + Stream.of(5, 6, 7, 1, 8).dropWhile(n -> n > 4).toList());
    }
}`,
      opcoes: ['`3 [1, 8]`', '`4 [1]`', '`3 [1]`', '`4 [1, 8]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`takeWhile` pega 5, 6 e 7 e para no 1, ignorando o 8. `dropWhile` descarta só até o 1 e mantém o resto, inclusive o 8.',
    },
    {
      id: 'pleno-t6-e01-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream.of("a", "bb", "cc")
            .filter(s -> {
                System.out.print(s);
                return s.length() == 2;
            })
            .map(String::toUpperCase)
            .limit(1)
            .forEach(System.out::print);
        System.out.println();
    }
}`,
      opcoes: ['`abbBB`', '`abbccBB`', '`abbccBBCC`', '`BB`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada elemento atravessa o pipeline antes do próximo. "a" é filtrado; "bb" passa, vira "BB" e é impresso; o `limit(1)` fica satisfeito e "cc" nunca chega ao filtro.',
    },
    {
      id: 'pleno-t6-e01-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`Stream<String> s = Stream.of("a", "b");`',
        '`IntStream r = IntStream.rangeClosed(1, 5);`',
        '`Stream<Double> g = Stream.generate(Math::random);`',
        '`Stream<Integer> i = Stream.iterate(1, n -> n + 1, 10);`',
        '`Stream<String> e = new Stream<>();`',
        '`List<Integer> l = Stream.of(1, 2).toList;`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'A versão de três argumentos de `iterate` recebe semente, predicado e função. `Stream` é uma interface, e `toList` é um método, que precisa de parênteses.',
    },
    {
      id: 'pleno-t6-e01-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que inclui o limite superior. O programa deve imprimir `15`.',
      codigo: `import java.util.stream.IntStream;

public class Soma {
    public static void main(String[] args) {
        System.out.println(IntStream.___(1, 5).sum());
    }
}`,
      respostas: ['rangeClosed'],
      saida: '15',
      explicacao: '`rangeClosed(1, 5)` vai de 1 a 5, somando 15. `range(1, 5)` iria só até 4, somando 10.',
    },
    {
      id: 'pleno-t6-e01-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Stream.of(2, 1)
            .peek(x -> System.out.print("p" + x))
            .sorted()
            .forEach(x -> System.out.print("f" + x));
        System.out.println();
    }
}`,
      opcoes: ['`p2p1f1f2`', '`p2f2p1f1`', '`p1p2f1f2`', '`p2p1f2f1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `sorted` precisa receber todos os elementos antes de liberar o primeiro. Os `peek` acontecem na ordem original; os `forEach`, na ordem ordenada.',
    },
    {
      id: 'pleno-t6-e01-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia");
        List<String> maiusculas = nomes.stream().map(String::toUpperCase).toList();
        List<Integer> tamanhos = nomes.stream().map(String::length).toList();
        List<String> erro = nomes.stream().map(String::length).toList();
        System.out.println(maiusculas + " " + tamanhos + " " + erro);
    }
}`,
      resposta: 9,
      explicacao: '`map(String::length)` transforma a `Stream<String>` numa `Stream<Integer>`, e o `toList` devolve uma `List<Integer>`.',
    },
    {
      id: 'pleno-t6-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Stream.of("a", "b", "a", "c", "b", "d").distinct().skip(1).limit(2).toList());
    }
}`,
      opcoes: ['`[b, c]`', '`[a, b]`', '`[b, a]`', '`[c, b]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`distinct` mantém a primeira ocorrência de cada um: a, b, c, d. `skip(1)` pula o "a", e `limit(2)` fica com b e c.',
    },
    {
      id: 'pleno-t6-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>(List.of("ana", "bia"));
        nomes.stream().map(String::toUpperCase).forEach(x -> { });
        System.out.println(nomes);
    }
}`,
      opcoes: ['`[ana, bia]`', '`[ANA, BIA]`', '`[]`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Streams não alteram a fonte. O `map` produziu textos novos, descartados pelo `forEach` vazio.',
    },
    {
      id: 'pleno-t6-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        long n = List.of("a", "b").stream().peek(System.out::print).count();
        System.out.println(n);
    }
}`,
      opcoes: ['`2`', '`ab2`', '`a2`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Desde o Java 9, o `count` de uma stream de tamanho conhecido, sem operações que possam mudar o tamanho, usa o tamanho direto e nem percorre os elementos. O `peek` não executa.',
    },
    {
      id: 'pleno-t6-e01-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println("banana".chars().filter(c -> c == 'a').count() + " " + Stream.of("x", "y").map(String::toUpperCase).collect(Collectors.joining("-")));
    }
}`,
      resposta: '3 X-Y',
      explicacao: '`chars()` devolve um `IntStream` com os códigos dos caracteres; a comparação com o `char` `\'a\'` funciona porque ele é promovido a `int`.',
    },
    {
      id: 'pleno-t6-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> a = Stream.of(1, 2, 3).toList();
        List<Integer> b = IntStream.range(0, 3).toList();
        System.out.println(a + " " + b);
    }
}`,
      opcoes: [
        'Não compila: `IntStream` não tem `toList()`',
        'Compila e imprime `[1, 2, 3] [0, 1, 2]`',
        'Compila e imprime `[1, 2, 3] [0, 1, 2, 3]`',
        'Não compila: `Stream.toList()` só existe no Java 21',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'Streams de primitivos não têm `toList`, porque uma `List` precisa de objetos. É preciso `boxed()` antes. `Stream.toList()` existe desde o Java 16.',
    },
    {
      id: 'pleno-t6-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece ao executar `Stream.generate(() -> 1).sorted().findFirst()`?',
      opcoes: [
        'O programa nunca termina: `sorted` precisa ver todos os elementos de uma stream infinita',
        'Devolve `Optional[1]` imediatamente',
        'Lança `IllegalStateException` por stream infinita',
        'Não compila: streams infinitas não podem ser ordenadas',
      ],
      resposta: 0,
      explicacao: 'O `findFirst` é de curto-circuito, mas o `sorted` antes dele não é. Ele espera o fim da stream, que nunca chega, até a memória acabar.',
    },
  ],
};

export default episodio;
