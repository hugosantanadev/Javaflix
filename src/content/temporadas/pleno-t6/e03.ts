import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t6-e03',
  minutos: 14,
  aula,
  armadilhas: [
    '`Optional.of(null)` lança `NullPointerException`; `Optional.ofNullable(null)` devolve vazio.',
    '`get()` e `orElseThrow()` num `Optional` vazio lançam `NoSuchElementException`.',
    'O argumento de `orElse` é avaliado sempre; o `Supplier` de `orElseGet` só quando falta valor.',
    '`map` com uma função que devolve `null` produz `Optional.empty()`, sem exceção.',
    '`map` com uma função que devolve `Optional` cria `Optional<Optional<T>>`; `flatMap` evita a camada extra.',
    '`Optional<Integer>` não tem `getAsInt()`; esse método é de `OptionalInt`.',
    '`isEmpty()` é do Java 11; `ifPresentOrElse`, `or` e `stream` são do Java 9; `orElseThrow()` sem argumento é do Java 10.',
    'O `toString` mostra `Optional[valor]` ou `Optional.empty`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Using Optionals',
      url: 'https://dev.java/learn/api/collections-and-streams/streams/optionals/',
      tipo: 'documentacao',
      porque: 'Criação, consulta e transformação de `Optional`, com as boas práticas de uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.Optional',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html',
      tipo: 'documentacao',
      porque: 'Todos os métodos com a versão em que surgiram e a nota sobre uso como retorno.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Tired of Null Pointer Exceptions? Consider Using Java SE 8\'s Optional!',
      url: 'https://www.oracle.com/technical-resources/articles/java/java8-optional.html',
      tipo: 'artigo',
      porque: 'O artigo clássico que apresentou o `Optional`, com o encadeamento de `flatMap`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Stuart Marks: vJUG24 Session on Optional',
      url: 'https://stuartmarks.wordpress.com/2016/09/27/vjug24-session-on-optional/',
      tipo: 'artigo',
      porque: 'As regras de uso do `Optional` segundo um dos mantenedores do JDK.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide To Java Optional',
      url: 'https://www.baeldung.com/java-optional',
      tipo: 'artigo',
      porque: 'Um guia completo dos métodos, das versões 8 a 11.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Optional, orElse() vs orElseGet()',
      url: 'https://www.baeldung.com/java-optional-or-else-vs-or-else-get',
      tipo: 'artigo',
      porque: 'A diferença de avaliação entre os dois, com o impacto em desempenho.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Optional as Return Type',
      url: 'https://www.baeldung.com/java-optional-return',
      tipo: 'artigo',
      porque: 'Quando devolver `Optional` e quando não usá-lo, como em campos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'InfoQ: Null References, The Billion Dollar Mistake (Tony Hoare)',
      url: 'https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/',
      tipo: 'video',
      porque: 'O inventor da referência nula conta a história e as consequências da decisão.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: Optional pt 01',
      url: 'https://www.youtube.com/watch?v=-xxb8LoOiRs',
      tipo: 'video',
      porque: 'Por que o `Optional` existe e como criá-lo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Optional pt 02',
      url: 'https://www.youtube.com/watch?v=sOeNRIwhyzg',
      tipo: 'video',
      porque: '`map`, `flatMap` e os valores alternativos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Devoxx: Optional, The Mother of All Bikesheds (Stuart Marks)',
      url: 'https://www.youtube.com/watch?v=Ej0sss6cq14',
      tipo: 'video',
      porque: 'Os usos certos e errados do `Optional`, com as regras de ouro do JDK.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Quando devolver `Optional` e por que não usá-lo em coleções nem com primitivos embrulhados.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Methods": Item 55, "Return optionals judiciously"',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'O capítulo inteiro sobre `Optional`, com o exemplo de seguradoras encadeado por `flatMap`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Using Optional as a better alternative to null"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de métodos do `Optional` e o que cada um faz com valor e sem valor.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 10, "Streams": seção "Returning an Optional"',
    },
  ],
  desafio: {
    titulo: 'Busca de clientes sem null',
    enunciado:
      'Crie `record Cliente(String nome, String email)` com o método `Optional<String> emailOpcional()`, um mapa com Ana (`ana@x.com`) no id "1" e Bia (sem e-mail) no id "2", e o método `Optional<Cliente> buscar(String id)`. Escreva `descrever(id)`, sem nenhum `if` nem `get()`, que devolve o nome com o e-mail entre `<>`, o nome com "(sem e-mail)" ou "cliente X não encontrado". Depois, extraia o domínio do e-mail do cliente "1" em maiúsculas com `flatMap` e `map`. A saída deve ser:\n\n```text\nAna <ana@x.com>\nBia (sem e-mail)\ncliente 3 não encontrado\ndomínio de 1: X.COM\n```',
    dicas: [
      '`Optional.ofNullable(mapa.get(id))` transforma o `null` do mapa num `Optional` vazio.',
      'Dentro do `map` do cliente, outro `Optional` resolve o e-mail: `c.emailOpcional().map(...).orElse(...)`.',
      'Como a mensagem de não encontrado depende do `id`, use `orElseGet` com uma lambda.',
    ],
    solucao: `import java.util.List;
import java.util.Map;
import java.util.Optional;

public class Clientes {
    record Cliente(String nome, String email) {
        Optional<String> emailOpcional() {
            return Optional.ofNullable(email);
        }
    }

    static final Map<String, Cliente> BANCO = Map.of(
        "1", new Cliente("Ana", "ana@x.com"),
        "2", new Cliente("Bia", null));

    static Optional<Cliente> buscar(String id) {
        return Optional.ofNullable(BANCO.get(id));
    }

    static String descrever(String id) {
        return buscar(id)
            .map(c -> c.nome() + c.emailOpcional().map(e -> " <" + e + ">").orElse(" (sem e-mail)"))
            .orElseGet(() -> "cliente " + id + " não encontrado");
    }

    public static void main(String[] args) {
        for (String id : List.of("1", "2", "3")) {
            System.out.println(descrever(id));
        }
        String dominio = buscar("1")
            .flatMap(Cliente::emailOpcional)
            .map(e -> e.substring(e.indexOf('@') + 1).toUpperCase())
            .orElse("?");
        System.out.println("domínio de 1: " + dominio);
    }
}`,
    saida: 'Ana <ana@x.com>\nBia (sem e-mail)\ncliente 3 não encontrado\ndomínio de 1: X.COM',
    comentarios:
      'As duas ausências possíveis, cliente inexistente e e-mail vazio, são tratadas pelo tipo, sem nenhuma comparação com `null` fora dos `ofNullable`. O campo `email` continua sendo um `String` comum, como recomenda o projeto do `Optional`; quem consulta recebe o `Optional` pelo método. O `flatMap` evita o `Optional<Optional<String>>` que um `map` produziria.',
  },
  exercicios: [
    {
      id: 'pleno-t6-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Optional.ofNullable("a") + " " + Optional.ofNullable(null) + " " + Optional.of("b").isEmpty());
    }
}`,
      opcoes: ['`Optional[a] Optional.empty false`', '`a null false`', '`Optional[a] Optional[null] false`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`ofNullable` aceita `null` e devolve o `Optional` vazio, impresso como `Optional.empty`.',
    },
    {
      id: 'pleno-t6-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        String nome = null;
        System.out.println(Optional.ofNullable(nome).isPresent());
        System.out.println(Optional.of(nome).isPresent());
    }
}`,
      opcoes: [
        'Imprime `false` e lança `NullPointerException`',
        'Imprime `false` duas vezes',
        'Imprime `false` e lança `NoSuchElementException`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'false' },
      explicacao: '`Optional.of` exige um valor e falha com `null` na criação. Para valores que podem ser nulos, existe `ofNullable`.',
    },
    {
      id: 'pleno-t6-e03-q03',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    static String padrao() {
        System.out.print("P");
        return "d";
    }

    public static void main(String[] args) {
        System.out.println(Optional.of("x").orElse(padrao()) + Optional.of("y").orElseGet(Teste::padrao) + Optional.<String>empty().orElseGet(Teste::padrao));
    }
}`,
      resposta: 'PPxyd',
      explicacao: 'O argumento de `orElse` é avaliado antes da chamada, mesmo com valor presente: um "P". O `orElseGet` com valor não chama o fornecedor; o vazio chama: outro "P". Os dois saem antes da linha montada.',
    },
    {
      id: 'pleno-t6-e03-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Optional<String> vazio = Optional.empty();
        System.out.println(vazio.orElse("nada"));
        System.out.println(vazio.get());
    }
}`,
      opcoes: [
        'Imprime `nada` e lança `NoSuchElementException`',
        'Imprime `nada` e `null`',
        'Imprime `nada` duas vezes',
        'Imprime `nada` e lança `NullPointerException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException', saida: 'nada' },
      explicacao: '`get()` num `Optional` vazio lança `NoSuchElementException` com a mensagem "No value present".',
    },
    {
      id: 'pleno-t6-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        String a = Optional.of("abc").map(s -> s.length() > 5 ? s : null).orElse("curto");
        String b = Optional.of("abcdef").filter(s -> s.length() > 5).map(String::toUpperCase).orElse("curto");
        System.out.println(a + " " + b);
    }
}`,
      opcoes: ['`curto ABCDEF`', '`abc ABCDEF`', '`null ABCDEF`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Quando a função de `map` devolve `null`, o resultado é um `Optional` vazio, e o `orElse` entra em ação. O `filter` deixa passar "abcdef".',
    },
    {
      id: 'pleno-t6-e03-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`Optional<String> o = Optional.ofNullable(null);`',
        '`String s = Optional.of("a").orElse("b");`',
        '`int n = Optional.of("abc").map(String::length).orElse(0);`',
        '`String s = Optional.of("a").orElse(1);`',
        '`Optional<int> o = Optional.of(1);`',
        '`int x = Optional.of(5).getAsInt();`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O valor de `orElse` precisa ser do tipo do `Optional`. Generics não aceitam primitivos, e `getAsInt` pertence a `OptionalInt`.',
    },
    {
      id: 'pleno-t6-e03-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método que encadeia uma função que já devolve `Optional`. O programa deve imprimir `Recife`.',
      codigo: `import java.util.Optional;

public class Cidade {
    record Endereco(String cidade) { }

    record Cliente(Endereco endereco) {
        Optional<Endereco> enderecoOpcional() {
            return Optional.ofNullable(endereco);
        }
    }

    public static void main(String[] args) {
        Cliente c = new Cliente(new Endereco("Recife"));
        System.out.println(Optional.of(c).___(Cliente::enderecoOpcional).map(Endereco::cidade).orElse("?"));
    }
}`,
      respostas: ['flatMap'],
      saida: 'Recife',
      explicacao: 'Com `map`, o resultado seria `Optional<Optional<Endereco>>`, e o `map(Endereco::cidade)` seguinte não compilaria. `flatMap` achata a camada extra.',
    },
    {
      id: 'pleno-t6-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Optional<String> texto = Optional.of("5");
        System.out.println(texto.map(s -> Optional.of(Integer.parseInt(s))) + " " + texto.flatMap(s -> Optional.of(Integer.parseInt(s))));
    }
}`,
      opcoes: ['`Optional[Optional[5]] Optional[5]`', '`Optional[5] Optional[5]`', '`Optional[5] Optional[Optional[5]]`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`map` embrulha o resultado da função num `Optional`, mesmo que ele já seja um. `flatMap` devolve o `Optional` da função como está.',
    },
    {
      id: 'pleno-t6-e03-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        OptionalInt a = IntStream.of(3, 9).max();
        Optional<Integer> b = Stream.of(3, 9).max(Integer::compare);
        int x = a.getAsInt();
        int y = b.getAsInt();
        System.out.println(x + y);
    }
}`,
      resposta: 9,
      explicacao: '`Optional<Integer>` usa `get()` ou `orElse`. `getAsInt()` é de `OptionalInt`, o resultado dos streams de `int`.',
    },
    {
      id: 'pleno-t6-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Optional<String> a = Optional.of("x");
        Optional<String> b = Optional.empty();
        a.ifPresent(s -> System.out.print("1" + s));
        b.ifPresent(s -> System.out.print("2" + s));
        b.ifPresentOrElse(s -> System.out.print("3" + s), () -> System.out.print("4"));
        System.out.println();
    }
}`,
      opcoes: ['`1x4`', '`1x2null4`', '`1x24`', '`1x3x`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`ifPresent` só age com valor. `ifPresentOrElse` executa a segunda ação quando está vazio.',
    },
    {
      id: 'pleno-t6-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        long n = Stream.of(Optional.of("a"), Optional.<String>empty(), Optional.of("c"))
            .flatMap(Optional::stream)
            .count();
        System.out.println(n);
    }
}`,
      opcoes: ['`2`', '`3`', '`1`', 'Lança `NoSuchElementException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Optional.stream()` devolve uma stream com um elemento ou nenhum. O `flatMap` junta tudo, e os vazios desaparecem.',
    },
    {
      id: 'pleno-t6-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(IntStream.of().average().orElse(0) + " " + IntStream.of(2, 3).average().getAsDouble());
    }
}`,
      opcoes: ['`0.0 2.5`', '`0 2.5`', '`0.0 2`', 'Lança `NoSuchElementException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`average()` devolve `OptionalDouble`, vazio para uma stream vazia. `orElse` recebe um `double`, e o 0 vira 0.0.',
    },
    {
      id: 'pleno-t6-e03-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        String a = Optional.<String>empty().or(() -> Optional.of("b")).map(s -> s + "!").orElse("z");
        String b = Optional.of("a").or(() -> Optional.of("b")).get();
        System.out.println(a + b);
    }
}`,
      resposta: 'b!a',
      explicacao: '`or` só usa o fornecedor quando o `Optional` está vazio, e devolve outro `Optional`, que segue no encadeamento.',
    },
    {
      id: 'pleno-t6-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, String> config = Map.of("porta", "8080");
        System.out.println(Optional.ofNullable(config.get("porta")).orElseThrow());
        String host = Optional.ofNullable(config.get("host"))
            .orElseThrow(() -> new IllegalArgumentException("host ausente"));
        System.out.println(host);
    }
}`,
      opcoes: [
        'Imprime `8080` e lança `IllegalArgumentException`',
        'Imprime `8080` e `null`',
        'Imprime `8080` e lança `NoSuchElementException`',
        'Lança `NullPointerException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: '8080' },
      explicacao: '`orElseThrow` com um `Supplier` lança a exceção que ele cria. Sem argumento, lançaria `NoSuchElementException`.',
    },
    {
      id: 'pleno-t6-e03-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o uso recomendado de `Optional` pelos projetistas do JDK?',
      opcoes: [
        'Como tipo de retorno de métodos que podem não ter resultado',
        'Como tipo de todos os campos que podem ser nulos',
        'Como parâmetro de métodos com argumentos opcionais',
        'Dentro de coleções, para representar elementos ausentes',
      ],
      resposta: 0,
      explicacao: 'O `Optional` nasceu para retornos. Em campos, parâmetros e coleções, ele acrescenta custo e complexidade sem resolver o problema, e por isso nem é `Serializable`.',
    },
  ],
};

export default episodio;
