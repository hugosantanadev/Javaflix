import type { EpisodioConteudo } from '../../types';
import aula from './e07.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e07',
  minutos: 14,
  aula,
  armadilhas: [
    '`Collections.unmodifiableList(l)` é uma visão: mudanças feitas em `l` aparecem nela.',
    '`List.copyOf(l)` é uma cópia: mudanças em `l` não aparecem; e rejeita `null`.',
    'Uma coleção imutável não torna imutáveis os seus elementos.',
    'Qualquer alteração em coleções imutáveis lança `UnsupportedOperationException`, inclusive `sort` e o `remove` do iterador.',
    '`Collections.nCopies`, `emptyList` e `singletonList` também devolvem listas imutáveis.',
    '`toArray()` sem argumentos devolve `Object[]`; para `String[]`, use `toArray(new String[0])` ou `toArray(String[]::new)`.',
    '`Collections.max` usa a ordem natural; com um `Comparator`, usa o critério dele.',
    'A ordem de iteração de `Set.of` e `Map.of` muda entre execuções do programa.',
  ],
  ia: {
    uso:
      'Para imutabilidade, a IA ajuda a revisar uma classe e apontar onde uma coleção interna escapa sem proteção. O erro mais comum dela é tratar as três formas como sinônimas: usar `Collections.unmodifiableList` como se fosse cópia, esquecer que `List.copyOf` recusa `null` e dizer que uma lista imutável protege também os elementos.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui a classe ou o record que guarda uma coleção>\n- Diga se a coleção pode ser alterada de fora, por quem criou o objeto ou por quem lê o getter.\n- Para cada proteção, diga se é visão, cópia ou lista nova, e o que acontece se a original mudar depois.\n- Proponha cópias defensivas com List.copyOf no construtor e explique o que acontece com elementos null.\n- Não mude a interface pública da classe.',
    erros: [
      'Usa `Collections.unmodifiableList` como cópia defensiva, e a lista original continua alterando o objeto.',
      'Diz que `List.of` torna imutáveis também os objetos guardados na lista.',
      'Esquece que `List.copyOf` e `List.of` lançam `NullPointerException` com elementos `null`.',
      'Cria listas de listas com `Collections.nCopies(n, new ArrayList<>())`, que repete a mesma lista.',
    ],
    conferir: [
      'Altere a lista original depois de criar o objeto e imprima o que ele guarda.',
      'Tente um `add` pela lista devolvida no getter e veja se lança `UnsupportedOperationException`.',
      'Passe uma lista com `null` para o construtor e veja o que acontece.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Creating and Processing Data with the Collections Factory Methods',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/factory-methods/',
      tipo: 'documentacao',
      porque: 'As fábricas `of` e `copyOf` e os métodos de `Collections` que criam e embrulham coleções.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Core Libraries: Creating Unmodifiable Lists, Sets, and Maps',
      url: 'https://docs.oracle.com/en/java/javase/21/core/creating-immutable-lists-sets-and-maps.html',
      tipo: 'documentacao',
      porque: 'O guia oficial que distingue coleções imutáveis de visões inalteráveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.Collections',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html',
      tipo: 'documentacao',
      porque: 'Todos os algoritmos e embrulhos da classe utilitária.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Immutable vs Unmodifiable Collection in Java',
      url: 'https://www.baeldung.com/java-collection-immutable-unmodifiable-differences',
      tipo: 'artigo',
      porque: 'A diferença entre visão inalterável e coleção imutável, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Convenience Factory Methods for Collections',
      url: 'https://www.baeldung.com/java-9-collections-factory-methods',
      tipo: 'artigo',
      porque: 'As fábricas do Java 9 e as regras de `null` e repetidos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devoxx: Collections Refueled (Stuart Marks)',
      url: 'https://www.youtube.com/watch?v=LI8rpkOGU3c',
      tipo: 'video',
      porque: 'O mantenedor das coleções explica as fábricas imutáveis e a ordem aleatória de `Set.of`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devoxx: Collections Corner Cases (Stuart Marks)',
      url: 'https://www.youtube.com/watch?v=OXdm5BzQ8mI',
      tipo: 'video',
      porque: 'Visões, embrulhos e outros cantos escuros do framework de coleções.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: Coleções pt 13, Conversão de Lista para Arrays e vice-versa',
      url: 'https://www.youtube.com/watch?v=meW6F-95yIw',
      tipo: 'video',
      porque: '`toArray` e `Arrays.asList` lado a lado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que preferir objetos imutáveis e quando fazer cópias defensivas de coleções recebidas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Classes and Interfaces": Item 17, "Minimize mutability"; Cap. 8, "Methods": Item 50, "Make defensive copies when needed"',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'Os algoritmos, as fábricas e os embrulhos da classe `Collections`, um por um.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 17, "The Collections Class": seções "Generic Algorithms", "Collection Factories" e "Wrappers"',
    },
  ],
  desafio: {
    titulo: 'Catálogo imutável',
    enunciado:
      'Crie `record Catalogo(String nome, List<String> itens)` que faz uma cópia defensiva no construtor compacto e tem o método `com(String item)`, que devolve um **novo** catálogo com o item acrescentado, sem alterar o atual. No `main`, crie o catálogo "papelaria" a partir de uma `ArrayList` com caneta e lápis, acrescente "régua" à `ArrayList` original depois disso, e crie `v2` com borracha e caneta a mais. Mostre os dois catálogos, quantas canetas há em `v2` (`Collections.frequency`), o último item em ordem alfabética (`Collections.max`) e tente alterar `v2.itens()` diretamente. A saída deve ser:\n\n```text\nv1: [caneta, lápis]\nv2: [caneta, lápis, borracha, caneta]\ncanetas em v2: 2\núltimo em ordem alfabética: lápis\nalteração direta recusada\n```',
    dicas: [
      'No construtor compacto, `itens = List.copyOf(itens);` corta o vínculo com a lista de quem chamou.',
      'Em `com`, copie para uma `ArrayList`, acrescente e passe o resultado ao construtor, que copiará de novo para uma lista imutável.',
      'A tentativa de alterar `v2.itens()` lança `UnsupportedOperationException`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Catalogos {
    record Catalogo(String nome, List<String> itens) {
        Catalogo {
            itens = List.copyOf(itens);
        }

        Catalogo com(String item) {
            List<String> novos = new ArrayList<>(itens);
            novos.add(item);
            return new Catalogo(nome, novos);
        }
    }

    public static void main(String[] args) {
        List<String> origem = new ArrayList<>(List.of("caneta", "lápis"));
        Catalogo v1 = new Catalogo("papelaria", origem);
        origem.add("régua");
        Catalogo v2 = v1.com("borracha").com("caneta");

        System.out.println("v1: " + v1.itens());
        System.out.println("v2: " + v2.itens());
        System.out.println("canetas em v2: " + Collections.frequency(v2.itens(), "caneta"));
        System.out.println("último em ordem alfabética: " + Collections.max(v2.itens()));
        try {
            v2.itens().add("cola");
        } catch (UnsupportedOperationException e) {
            System.out.println("alteração direta recusada");
        }
    }
}`,
    saida: 'v1: [caneta, lápis]\nv2: [caneta, lápis, borracha, caneta]\ncanetas em v2: 2\núltimo em ordem alfabética: lápis\nalteração direta recusada',
    comentarios:
      'O catálogo nunca muda: cada "alteração" cria outro, e `v1` continua intacto depois de gerar `v2`. É o mesmo estilo de `String` e das classes de data do Java, que a próxima temporada explora. A régua acrescentada à lista original não aparece em lugar nenhum, porque a cópia defensiva já tinha cortado o vínculo. O custo é copiar a lista a cada mudança, aceitável para coleções pequenas e para dados que mudam pouco.',
  },
  bugs: [
    {
      id: 'pleno-t3-e07-b01',
      dificuldade: 1,
      sintoma: 'A exportação do cabeçalho para a API antiga, que pede um `String[]`, não compila: `incompatible types: Object[] cannot be converted to String[]`.',
      codigo: `import java.util.List;

public class Exportacao {
    static void enviar(String[] colunas) {
        System.out.println("enviando " + colunas.length + " colunas: " + String.join(";", colunas));
    }

    public static void main(String[] args) {
        List<String> cabecalho = List.of("data", "cliente", "total");
        String[] colunas = cabecalho.toArray();
        enviar(colunas);
    }
}`,
      linha: 10,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.util.List;

public class Exportacao {
    static void enviar(String[] colunas) {
        System.out.println("enviando " + colunas.length + " colunas: " + String.join(";", colunas));
    }

    public static void main(String[] args) {
        List<String> cabecalho = List.of("data", "cliente", "total");
        String[] colunas = cabecalho.toArray(String[]::new);
        enviar(colunas);
    }
}`,
      saidaCorrigida: 'enviando 3 colunas: data;cliente;total',
      dica: 'Que tipo de array o `toArray()` sem argumentos devolve?',
      explicacao:
        'Por causa do apagamento, a lista não sabe na execução que guarda `String`, e `toArray()` sem argumentos devolve um `Object[]`. Para um array tipado, passe um gerador, `toArray(String[]::new)`, desde o Java 11, ou um array do tipo, `toArray(new String[0])`.',
    },
    {
      id: 'pleno-t3-e07-b02',
      dificuldade: 2,
      sintoma: 'A Bia se inscreveu depois de a turma A ser fechada, e mesmo assim aparece na lista da turma: `turma A: [Ana, Bia]`.',
      codigo: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Matriculas {
    record Turma(String nome, List<String> alunos) {
        Turma {
            alunos = Collections.unmodifiableList(alunos);
        }
    }

    public static void main(String[] args) {
        List<String> inscritos = new ArrayList<>(List.of("Ana"));
        Turma turma = new Turma("A", inscritos);
        inscritos.add("Bia");
        System.out.println("turma " + turma.nome() + ": " + turma.alunos());
    }
}`,
      linha: 8,
      efeito: { tipo: 'saida', saida: 'turma A: [Ana, Bia]' },
      correcao: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Matriculas {
    record Turma(String nome, List<String> alunos) {
        Turma {
            alunos = List.copyOf(alunos);
        }
    }

    public static void main(String[] args) {
        List<String> inscritos = new ArrayList<>(List.of("Ana"));
        Turma turma = new Turma("A", inscritos);
        inscritos.add("Bia");
        System.out.println("turma " + turma.nome() + ": " + turma.alunos());
    }
}`,
      saidaCorrigida: 'turma A: [Ana]',
      dica: '`Collections.unmodifiableList` copia a lista ou só embrulha a original?',
      explicacao:
        '`unmodifiableList` devolve uma **visão** somente leitura: ninguém altera pela turma, mas quem guardou a lista original ainda altera, e a turma vê a mudança. Para um record que não deve mudar, a cópia defensiva é `List.copyOf(alunos)` no construtor compacto: a turma fica com os alunos do momento da criação.',
    },
    {
      id: 'pleno-t3-e07-b03',
      dificuldade: 3,
      sintoma: 'Na agenda da semana, a reunião de segunda e a entrega de sexta aparecem em todos os dias: `segunda: [reunião, entrega], quarta: [reunião, entrega]`.',
      codigo: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Semana {
    public static void main(String[] args) {
        List<List<String>> dias = new ArrayList<>(Collections.nCopies(5, new ArrayList<>()));
        dias.get(0).add("reunião");
        dias.get(4).add("entrega");
        System.out.println("segunda: " + dias.get(0) + ", quarta: " + dias.get(2));
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'segunda: [reunião, entrega], quarta: [reunião, entrega]' },
      correcao: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Semana {
    public static void main(String[] args) {
        List<List<String>> dias = new ArrayList<>(); for (int i = 0; i < 5; i++) dias.add(new ArrayList<>());
        dias.get(0).add("reunião");
        dias.get(4).add("entrega");
        System.out.println("segunda: " + dias.get(0) + ", quarta: " + dias.get(2));
    }
}`,
      saidaCorrigida: 'segunda: [reunião], quarta: []',
      dica: 'Quantas listas de compromissos o `nCopies` criou? Cinco listas, ou cinco referências?',
      explicacao:
        '`Collections.nCopies(5, x)` repete a **mesma referência** cinco vezes, e o argumento `new ArrayList<>()` é avaliado uma vez só: os cinco dias apontam para a mesma lista. Com valores imutáveis, como `"-"`, isso não importa; com objetos mutáveis, cada alteração aparece em todos. Crie uma lista nova para cada dia, num laço ou com `Stream.generate`.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t3-e07-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> base = new ArrayList<>(List.of(1));
        List<Integer> visao = Collections.unmodifiableList(base);
        List<Integer> copia = List.copyOf(base);
        base.add(2);
        System.out.println(visao.size() + " " + copia.size());
    }
}`,
      opcoes: ['`2 1`', '`1 1`', '`2 2`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A visão de `unmodifiableList` repassa as leituras à lista original e vê o novo elemento. A cópia de `List.copyOf` ficou com o que existia no momento.',
      dica: 'A visão acompanha a original; a cópia, não.',
    },
    {
      id: 'pleno-t3-e07-q02',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = List.of(1, 2, 3);
        System.out.println(l.get(0));
        l.sort(null);
        System.out.println(l);
    }
}`,
      opcoes: [
        'Imprime `1` e lança `UnsupportedOperationException`',
        'Imprime `1` e `[1, 2, 3]`, porque a lista já está ordenada',
        'Imprime `1` e lança `NullPointerException`',
        'Não compila: `sort` não aceita `null`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: '1' },
      explicacao: 'As listas de `List.of` recusam qualquer operação de alteração, mesmo uma que não mudaria nada. `sort(null)` significa ordem natural e seria válido numa lista mutável.',
      dica: '`sort` também é uma alteração.',
    },
    {
      id: 'pleno-t3-e07-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("a", "b", "c", "d"));
        Collections.rotate(l, 1);
        Collections.swap(l, 0, 1);
        System.out.println(l + " " + Collections.frequency(l, "a"));
    }
}`,
      resposta: '[a, d, b, c] 1',
      explicacao: '`rotate(l, 1)` leva o último para o começo: `[d, a, b, c]`. Depois, `swap` troca as posições 0 e 1.',
      dica: '`rotate(l, 1)` leva o último para o começo; `swap` troca duas posições.',
    },
    {
      id: 'pleno-t3-e07-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<int[]> l = List.of(new int[] {1});
        l.get(0)[0] = 5;
        System.out.println(l.get(0)[0]);
    }
}`,
      opcoes: ['`5`', '`1`', 'Lança `UnsupportedOperationException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A lista é imutável, mas o array dentro dela não. Alterar o conteúdo de um elemento não é uma operação da lista.',
      dica: 'A lista é imutável, mas o array dentro dela não.',
    },
    {
      id: 'pleno-t3-e07-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais destas listas um `add` lança `UnsupportedOperationException`? Escolha três.',
      opcoes: [
        '`Collections.unmodifiableList(new ArrayList<>())`',
        '`List.copyOf(new ArrayList<>())`',
        '`Collections.nCopies(2, "x")`',
        '`new ArrayList<>(List.of("x"))`',
        '`new LinkedList<>()`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Visões inalteráveis, cópias imutáveis e `nCopies` recusam alterações. Copiar para um `ArrayList` é justamente o jeito de obter uma lista que pode mudar.',
      dica: 'Três delas são imutáveis ou visões somente leitura.',
    },
    {
      id: 'pleno-t3-e07-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    record Pedido(List<String> itens) {
        Pedido {
            itens = List.copyOf(itens);
        }
    }

    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("café"));
        Pedido p = new Pedido(l);
        l.add("pão");
        System.out.println(p.itens().size() + " " + l.size());
    }
}`,
      opcoes: ['`1 2`', '`2 2`', '`1 1`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A cópia defensiva no construtor compacto desliga o pedido da lista original. O "pão" entra só na `ArrayList` de quem criou o pedido.',
      dica: 'O construtor compacto copiou a lista na entrada.',
    },
    {
      id: 'pleno-t3-e07-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>();
        l.add(null);
        System.out.println(l.size());
        List<String> c = List.copyOf(l);
        System.out.println(c.size());
    }
}`,
      opcoes: [
        'Imprime `1` e lança `NullPointerException`',
        'Imprime `1` e `1`',
        'Imprime `1` e `0`',
        'Lança `NullPointerException` no `add`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: '1' },
      explicacao: 'O `ArrayList` aceita `null`, mas `List.copyOf`, como `List.of`, rejeita elementos nulos.',
      dica: '`List.copyOf` recusa `null`, como `List.of`.',
    },
    {
      id: 'pleno-t3-e07-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método de `Collections` que cria uma lista com o mesmo valor repetido. O programa deve imprimir `---`.',
      codigo: `import java.util.Collections;

public class Linha {
    public static void main(String[] args) {
        System.out.println(String.join("", Collections.___(3, "-")));
    }
}`,
      respostas: ['nCopies'],
      saida: '---',
      explicacao: '`nCopies(n, valor)` devolve uma lista imutável de tamanho `n`, sem criar `n` objetos: todas as posições apontam para o mesmo valor.',
      dica: 'É o método que repete um valor `n` vezes.',
    },
    {
      id: 'pleno-t3-e07-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia");
        String[] a = nomes.toArray(new String[0]);
        String[] b = nomes.toArray(String[]::new);
        String[] c = nomes.toArray();
        System.out.println(a.length + b.length + c.length);
    }
}`,
      resposta: 8,
      explicacao: '`toArray()` sem argumentos devolve `Object[]`, que não pode ser atribuído a `String[]` sem cast. As outras duas formas recebem o tipo do array.',
      dica: '`toArray()` sem argumentos devolve `Object[]`.',
    },
    {
      id: 'pleno-t3-e07-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = List.of("pera", "uva", "abacaxi");
        System.out.println(Collections.max(l) + " " + Collections.min(l, Comparator.comparingInt(String::length)));
    }
}`,
      opcoes: ['`uva uva`', '`abacaxi uva`', '`uva pera`', '`pera uva`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem comparador, `max` usa a ordem alfabética, e "uva" é a última. Com o comparador por tamanho, `min` também escolhe "uva", a mais curta.',
      dica: '`max` usa a ordem natural; `min`, o comparador por tamanho.',
    },
    {
      id: 'pleno-t3-e07-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>();
        Collections.addAll(l, 1, 2, 3);
        boolean semComum = Collections.disjoint(l, List.of(4, 5));
        Collections.fill(l, 0);
        System.out.println(l + " " + semComum);
    }
}`,
      opcoes: ['`[0, 0, 0] true`', '`[1, 2, 3] true`', '`[0, 0, 0] false`', '`[0] true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`addAll` acrescenta os três valores; `disjoint` confirma que não há elemento em comum; `fill` troca todos por 0, mantendo o tamanho.',
      dica: '`fill` troca todos os elementos; `disjoint` diz se não há nada em comum.',
    },
    {
      id: 'pleno-t3-e07-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Iterator<String> it = List.of("a", "b").iterator();
        System.out.println(it.next());
        it.remove();
        System.out.println(it.next());
    }
}`,
      opcoes: [
        'Imprime `a` e lança `UnsupportedOperationException`',
        'Imprime `a` e `b`',
        'Imprime `a` e lança `IllegalStateException`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: 'a' },
      explicacao: 'O iterador de uma coleção imutável também recusa remoções. Numa lista mutável, `remove` depois de `next` seria válido.',
      dica: 'O iterador de uma lista imutável também não remove.',
    },
    {
      id: 'pleno-t3-e07-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> base = new ArrayList<>(List.of(1, 2, 3));
        List<Integer> leitura = Collections.unmodifiableList(base);
        Collections.reverse(base);
        base.remove(Integer.valueOf(2));
        System.out.println(leitura + " " + leitura.equals(base));
    }
}`,
      resposta: '[3, 1] true',
      explicacao: 'A visão acompanha cada mudança da original, inclusive a inversão e a remoção. O `equals` de listas compara os elementos.',
      dica: 'A visão acompanha cada mudança da base.',
    },
    {
      id: 'pleno-t3-e07-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a ordem de iteração de `Set.of` muda entre execuções do programa?',
      opcoes: [
        'Para que código que dependa por engano da ordem falhe cedo, nos testes',
        'Porque a JVM reorganiza a memória a cada coleta de lixo',
        'Porque `Set.of` ordena os elementos pelo endereço de memória',
        'Por causa de um defeito conhecido, corrigido no Java 21',
      ],
      resposta: 0,
      explicacao: 'A especificação nunca prometeu uma ordem. Sorteando um valor ao iniciar a JVM, o JDK impede que alguém passe a depender da ordem atual sem perceber.',
      dica: 'É uma vacina contra dependência acidental de ordem.',
    },
    {
      id: 'pleno-t3-e07-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, List<Integer>> m = Map.of("k", new ArrayList<>(List.of(1)));
        m.get("k").add(2);
        System.out.println(m);
    }
}`,
      opcoes: ['`{k=[1, 2]}`', '`{k=[1]}`', 'Lança `UnsupportedOperationException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O mapa é imutável: não se pode trocar o valor de "k" nem acrescentar chaves. A lista guardada como valor, porém, é um `ArrayList` comum.',
      dica: 'O mapa é imutável; a lista guardada nele, não.',
    },
  ],
};

export default episodio;
