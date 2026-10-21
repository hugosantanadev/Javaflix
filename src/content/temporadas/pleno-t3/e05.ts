import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e05',
  minutos: 16,
  aula,
  armadilhas: [
    '`compareTo` e `compare`: negativo, o primeiro vem antes; zero, empate; positivo, vem depois. Só o sinal importa.',
    'Ordem natural de `String`: dígitos antes de maiúsculas, maiúsculas antes de minúsculas; "10" vem antes de "9".',
    '`reversed()` inverte toda a cadeia de comparação à sua esquerda, não só o último critério.',
    '`Comparator.comparing(p -> p.nome()).reversed()` não compila: a lambda é inferida com `Object`.',
    'Comparar com `a - b` estoura com valores grandes; use `Integer.compare` ou `comparingInt`.',
    '`Collections.sort` com um tipo que não é `Comparable` não compila; `TreeSet` desse tipo compila e lança `ClassCastException`.',
    '`binarySearch` exige lista ordenada; sem achar, devolve `-(ponto de inserção) - 1`.',
    '`Arrays.sort` com `Comparator` só funciona com arrays de objetos, não de primitivos.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Object Ordering',
      url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/order.html',
      tipo: 'documentacao',
      porque: 'Ordem natural, o contrato de `compareTo` e a escrita de comparadores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.Comparator',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html',
      tipo: 'documentacao',
      porque: 'Todos os métodos de fábrica e de composição, com a regra de `reversed`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.Comparable',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Comparable.html',
      tipo: 'documentacao',
      porque: 'O contrato completo e o aviso sobre ordem natural coerente com `equals`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Collections.binarySearch',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#binarySearch(java.util.List,T)',
      tipo: 'documentacao',
      porque: 'O valor devolvido quando a chave não é encontrada e a exigência de lista ordenada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Tim Peters: listsort.txt',
      url: 'https://github.com/python/cpython/blob/main/Objects/listsort.txt',
      tipo: 'artigo',
      porque: 'A descrição do TimSort escrita pelo próprio autor, com runs, galope e estabilidade.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Comparator and Comparable in Java',
      url: 'https://www.baeldung.com/java-comparator-comparable',
      tipo: 'artigo',
      porque: 'As duas interfaces lado a lado, com exemplos de ordenação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Java Comparator.comparing()',
      url: 'https://www.baeldung.com/java-8-comparator-comparing',
      tipo: 'artigo',
      porque: '`comparing`, `thenComparing`, `reversed` e o tratamento de `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Coleções pt 10, Sorting lists pt 02, Comparable',
      url: 'https://www.youtube.com/watch?v=OJGQ0lvaKGE',
      tipo: 'video',
      porque: 'Implementando `Comparable` para ordenar uma lista, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Coleções pt 11, Sorting lists pt 03, Comparator',
      url: 'https://www.youtube.com/watch?v=ZyI_8ljieUA',
      tipo: 'video',
      porque: 'Ordens alternativas com `Comparator`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Coleções pt 12, Binary Search',
      url: 'https://www.youtube.com/watch?v=Ixd1Fib9F9g',
      tipo: 'video',
      porque: 'A busca binária da API e o valor negativo de quando a chave não existe, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Telusko: Comparator vs Comparable in Java',
      url: 'https://www.youtube.com/watch?v=ZA2oNhtNk3w',
      tipo: 'video',
      porque: 'Quando usar cada interface, com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Como implementar `compareTo` corretamente, com comparadores de construção e sem subtração.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Methods Common to All Objects": Item 14, "Consider implementing Comparable"',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'O contrato de `Comparable`, a construção de comparadores e os algoritmos da classe `Collections`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Comparison and Bounds": seções "Comparable" e "Comparator"; Cap. 17, "The Collections Class": seção "Generic Algorithms"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Comparable contra Comparator, comparação por vários campos e busca, como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Sorting Data"',
    },
  ],
  desafio: {
    titulo: 'Ranking de jogadores',
    enunciado:
      'Crie `record Jogador(String nome, int pontos, int vitorias)` com ordem natural pelo nome. Com Caio (30 pontos, 11 vitórias), Eva (15, 4), Bia (42, 12), Ana (30, 9) e Davi (42, 12), ordene a lista pela ordem natural e use `Collections.binarySearch` para achar Caio e para descobrir onde Beto entraria. Depois, monte um `Comparator` com `comparingInt`, `reversed` e `thenComparing` que ordene por pontos (decrescente), vitórias (decrescente) e nome (crescente), e imprima o ranking. A saída deve ser:\n\n```text\npor nome: Ana, Bia, Caio, Davi, Eva\nranking: 1. Bia (42), 2. Davi (42), 3. Caio (30), 4. Ana (30), 5. Eva (15)\nCaio está na posição 2\nBeto entraria na posição 1\n```',
    dicas: [
      'Para inverter só um critério, aplique `reversed()` ao comparador dele antes de encadear: `thenComparing(Comparator.comparingInt(Jogador::vitorias).reversed())`.',
      'A busca binária só funciona sobre a lista na mesma ordem usada na busca: faça-a antes de reordenar pelo ranking.',
      'Se `binarySearch` devolve `r` negativo, o ponto de inserção é `-r - 1`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Ranking {
    record Jogador(String nome, int pontos, int vitorias) implements Comparable<Jogador> {
        @Override
        public int compareTo(Jogador outro) {
            return nome.compareTo(outro.nome);
        }
    }

    static final Comparator<Jogador> RANKING = Comparator
        .comparingInt(Jogador::pontos).reversed()
        .thenComparing(Comparator.comparingInt(Jogador::vitorias).reversed())
        .thenComparing(Comparator.naturalOrder());

    public static void main(String[] args) {
        List<Jogador> jogadores = new ArrayList<>(List.of(
            new Jogador("Caio", 30, 11), new Jogador("Eva", 15, 4), new Jogador("Bia", 42, 12),
            new Jogador("Ana", 30, 9), new Jogador("Davi", 42, 12)));

        Collections.sort(jogadores);
        StringBuilder nomes = new StringBuilder();
        for (Jogador j : jogadores) {
            if (nomes.length() > 0) {
                nomes.append(", ");
            }
            nomes.append(j.nome());
        }
        System.out.println("por nome: " + nomes);

        int caio = Collections.binarySearch(jogadores, new Jogador("Caio", 0, 0));
        int beto = Collections.binarySearch(jogadores, new Jogador("Beto", 0, 0));

        List<Jogador> ranking = new ArrayList<>(jogadores);
        ranking.sort(RANKING);
        StringBuilder linha = new StringBuilder();
        for (int i = 0; i < ranking.size(); i++) {
            if (i > 0) {
                linha.append(", ");
            }
            Jogador j = ranking.get(i);
            linha.append(i + 1).append(". ").append(j.nome()).append(" (").append(j.pontos()).append(")");
        }
        System.out.println("ranking: " + linha);
        System.out.println("Caio está na posição " + caio);
        System.out.println("Beto entraria na posição " + (-beto - 1));
    }
}`,
    saida: 'por nome: Ana, Bia, Caio, Davi, Eva\nranking: 1. Bia (42), 2. Davi (42), 3. Caio (30), 4. Ana (30), 5. Eva (15)\nCaio está na posição 2\nBeto entraria na posição 1',
    comentarios:
      'A ordem natural pelo nome serve para buscar; o comparador do ranking serve para exibir. Aplicar `reversed()` dentro de cada `thenComparing` inverte só aquele critério, enquanto um `reversed()` no fim inverteria também o desempate pelo nome. Repare que o `compareTo` olha só o nome, então não é coerente com o `equals` do record: dois jogadores com o mesmo nome e pontos diferentes seriam "iguais" para um `TreeSet`.',
  },
  exercicios: [
    {
      id: 'pleno-t3-e05-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("b", "B", "a", "1", "A"));
        Collections.sort(l);
        System.out.println(l);
    }
}`,
      opcoes: ['`[1, A, B, a, b]`', '`[a, A, b, B, 1]`', '`[A, a, B, b, 1]`', '`[1, a, A, b, B]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A ordem natural de `String` segue os códigos dos caracteres: dígitos, depois maiúsculas, depois minúsculas.',
    },
    {
      id: 'pleno-t3-e05-q02',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println("a".compareTo("c") + " " + "abc".compareTo("ab") + " " + "B".compareTo("a"));
    }
}`,
      resposta: '-2 1 -31',
      explicacao: '`String.compareTo` devolve a diferença entre os primeiros caracteres diferentes (97 - 99 e 66 - 97) ou, se um texto é prefixo do outro, a diferença de tamanho.',
    },
    {
      id: 'pleno-t3-e05-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    record Pessoa(String nome, int idade) { }

    public static void main(String[] args) {
        List<Pessoa> pessoas = new ArrayList<>();
        pessoas.sort(Comparator.comparing(p -> p.nome()).reversed());
    }
}`,
      opcoes: [
        'Não compila: a lambda é inferida com `Object`, que não tem `nome()`',
        'Compila',
        'Não compila: `reversed()` não existe em `Comparator`',
        'Compila, mas ordena em ordem crescente',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Como `reversed()` é chamado sobre o resultado de `comparing`, o compilador não usa o destino para inferir o tipo da lambda. `Pessoa::nome` ou `(Pessoa p) -> p.nome()` resolveriam.',
    },
    {
      id: 'pleno-t3-e05-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    record Item(String cat, int preco) { }

    public static void main(String[] args) {
        List<Item> l = new ArrayList<>(List.of(new Item("b", 1), new Item("a", 2), new Item("a", 1)));
        l.sort(Comparator.comparing(Item::cat).thenComparing(Item::preco).reversed());
        StringBuilder sb = new StringBuilder();
        for (Item i : l) {
            sb.append(i.cat()).append(i.preco()).append(' ');
        }
        System.out.println(sb.toString().trim());
    }
}`,
      opcoes: ['`b1 a2 a1`', '`b1 a1 a2`', '`a1 a2 b1`', '`a2 a1 b1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`reversed()` no fim inverte a cadeia inteira: categoria decrescente e, no empate, preço decrescente.',
    },
    {
      id: 'pleno-t3-e05-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Comparator<Integer> c = (a, b) -> a - b;
        System.out.println(c.compare(2_000_000_000, -2_000_000_000) < 0);
    }
}`,
      opcoes: ['`true`', '`false`', 'Lança `ArithmeticException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A diferença real, 4 bilhões, não cabe num `int` e dá a volta para um negativo. O comparador diz que 2 bilhões vem antes de menos 2 bilhões. `Integer.compare` não tem esse problema.',
    },
    {
      id: 'pleno-t3-e05-q06',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais destas classes já implementam `Comparable`? Escolha três.',
      opcoes: ['`String`', '`Integer`', '`java.time.LocalDate`', '`Object`', '`ArrayList`'],
      respostas: [0, 1, 2],
      explicacao: 'Texto, números e datas têm ordem natural. `Object` e as coleções não, e por isso não podem ser ordenados sem um `Comparator`.',
    },
    {
      id: 'pleno-t3-e05-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(10, 20, 30, 40));
        System.out.println(Collections.binarySearch(l, 30) + " " + Collections.binarySearch(l, 25) + " " + Collections.binarySearch(l, 50));
    }
}`,
      opcoes: ['`2 -3 -5`', '`2 -1 -1`', '`3 -3 -5`', '`2 -2 -4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O 30 está no índice 2. O 25 entraria na posição 2, então o resultado é -2 - 1; o 50 entraria na 4, e o resultado é -4 - 1.',
    },
    {
      id: 'pleno-t3-e05-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método de fábrica que cria um comparador a partir de uma chave `int`. O programa deve imprimir `[a, bb, ccc]`.',
      codigo: `import java.util.*;

public class PorTamanho {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("ccc", "a", "bb"));
        l.sort(Comparator.___(String::length));
        System.out.println(l);
    }
}`,
      respostas: ['comparingInt', 'comparing'],
      saida: '[a, bb, ccc]',
      explicacao: '`comparingInt` recebe uma função que devolve `int` e compara sem autoboxing. `comparing` também funcionaria, embalando o tamanho em `Integer`.',
    },
    {
      id: 'pleno-t3-e05-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    static class Produto {
        String nome;

        Produto(String nome) {
            this.nome = nome;
        }
    }

    public static void main(String[] args) {
        List<Produto> l = new ArrayList<>(List.of(new Produto("b"), new Produto("a")));
        Set<Produto> s = new TreeSet<>();
        Collections.sort(l);
    }
}`,
      resposta: 15,
      explicacao: '`Collections.sort(List<T>)` exige `T extends Comparable<? super T>`, conferido na compilação. O `TreeSet<Produto>` compila, porque poderia receber um `Comparator` no construtor; só falharia ao adicionar.',
    },
    {
      id: 'pleno-t3-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(Arrays.asList("b", null, "a"));
        l.sort(Comparator.nullsLast(Comparator.reverseOrder()));
        System.out.println(l);
    }
}`,
      opcoes: ['`[b, a, null]`', '`[null, b, a]`', '`[a, b, null]`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`nullsLast` põe os `null` no fim e usa o comparador recebido para o resto, aqui em ordem inversa.',
    },
    {
      id: 'pleno-t3-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("bb", "a", "cc", "d"));
        l.sort(Comparator.comparingInt(String::length));
        System.out.println(l);
    }
}`,
      opcoes: ['`[a, d, bb, cc]`', '`[d, a, cc, bb]`', '`[a, d, cc, bb]`', '`[d, a, bb, cc]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A ordenação de objetos é estável: elementos com o mesmo tamanho mantêm a ordem em que estavam na lista.',
    },
    {
      id: 'pleno-t3-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    record Tarefa(String nome, int prioridade) implements Comparable<Tarefa> {
        public int compareTo(Tarefa o) {
            return Integer.compare(prioridade, o.prioridade);
        }
    }

    public static void main(String[] args) {
        Set<Tarefa> t = new TreeSet<>();
        t.add(new Tarefa("a", 2));
        t.add(new Tarefa("b", 1));
        t.add(new Tarefa("c", 2));
        StringBuilder sb = new StringBuilder();
        for (Tarefa x : t) {
            sb.append(x.nome());
        }
        System.out.println(t.size() + " " + sb);
    }
}`,
      opcoes: ['`2 ba`', '`3 bac`', '`3 bca`', '`2 bc`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `TreeSet` usa o `compareTo`. "c" tem a mesma prioridade de "a", compara como igual e é recusado, mesmo sendo diferente para o `equals` do record.',
    },
    {
      id: 'pleno-t3-e05-q13',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    record P(String nome, int idade) { }

    public static void main(String[] args) {
        List<P> l = new ArrayList<>(List.of(new P("Ana", 20), new P("Bia", 30), new P("Ana", 30)));
        l.sort(Comparator.comparing(P::nome).thenComparing(P::idade, Comparator.reverseOrder()));
        StringBuilder sb = new StringBuilder();
        for (P p : l) {
            sb.append(p.nome()).append(p.idade()).append(';');
        }
        System.out.println(sb);
    }
}`,
      resposta: 'Ana30;Ana20;Bia30;',
      explicacao: 'O nome fica em ordem crescente, e só o desempate por idade é invertido, porque o comparador inverso foi passado ao `thenComparing`.',
    },
    {
      id: 'pleno-t3-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Integer[] objetos = {3, 1, 2};
        Arrays.sort(objetos, Collections.reverseOrder());
        int[] primitivos = {3, 1, 2};
        Arrays.sort(primitivos, Collections.reverseOrder());
    }
}`,
      opcoes: [
        'Não compila: não existe `Arrays.sort(int[], Comparator)`',
        'Compila',
        'Não compila: `Collections.reverseOrder()` não serve para arrays',
        'Compila, mas lança `ClassCastException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Comparadores trabalham com objetos. Para um `int[]`, `Arrays.sort` só ordena em ordem crescente; para a inversa, é preciso usar `Integer[]` ou inverter depois.',
    },
    {
      id: 'pleno-t3-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que significa dizer que a ordenação de `List.sort` é estável?',
      opcoes: [
        'Elementos que empatam na comparação mantêm a ordem relativa que tinham antes',
        'O tempo de execução é o mesmo para qualquer entrada',
        'A lista não pode ser alterada durante a ordenação',
        'O resultado é o mesmo em qualquer versão do Java',
      ],
      resposta: 0,
      explicacao: 'A estabilidade do TimSort permite ordenar em etapas, por exemplo primeiro por nome e depois por idade, mantendo os nomes em ordem dentro de cada idade.',
    },
  ],
};

export default episodio;
