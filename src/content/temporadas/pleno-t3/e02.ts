import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e02',
  minutos: 15,
  aula,
  armadilhas: [
    '`add` de um elemento repetido devolve `false`, sem exceção.',
    '`HashSet` não garante ordem; `LinkedHashSet` segue a inserção; `TreeSet` ordena.',
    'Sobrescrever `equals` sem `hashCode` deixa repetidos entrarem num `HashSet`.',
    'Mudar um campo usado no `hashCode` depois de inserir o objeto o perde dentro do conjunto.',
    '`TreeSet` decide igualdade por `compareTo` ou pelo `Comparator`, não por `equals`.',
    '`TreeSet.add(null)` lança `NullPointerException`; um objeto não comparável lança `ClassCastException` já no primeiro `add`.',
    '`floor` e `ceiling` incluem o próprio valor; `lower` e `higher` não. `headSet(x)` exclui `x` e `tailSet(x)` inclui.',
    '`Set.of` com elementos repetidos lança `IllegalArgumentException`; `Set.copyOf` descarta os repetidos.',
  ],
  ia: {
    uso:
      'Com conjuntos, a IA ajuda a escolher a implementação pela ordem que você precisa e a gerar `equals` e `hashCode`. Os erros dela são justamente os que fazem um `Set` falhar em silêncio: métodos que olham campos diferentes, campos mutáveis no hash e comparadores que empatam elementos diferentes num `TreeSet`.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui a classe e o código que a coloca num Set>\n- Diga quantos elementos o conjunto terá e por quê, citando equals, hashCode ou a comparação.\n- Aponte campos mutáveis usados no hash e comparadores que devolvem 0 para elementos diferentes.\n- Se a classe for só dados, reescreva-a como record.\n- Mostre um teste curto que confira o tamanho do conjunto com dois objetos iguais.',
    erros: [
      'Gera `equals` e `hashCode` com campos diferentes, e o `HashSet` guarda repetidos.',
      'Inclui no `hashCode` um campo que muda depois da inserção, e o elemento se perde.',
      'Ordena um `TreeSet` por um único campo com empates, e elementos diferentes somem.',
      'Afirma que o `HashSet` mantém a ordem de inserção, que é do `LinkedHashSet`.',
    ],
    conferir: [
      'Teste com dois objetos iguais e confira `size()` igual a 1.',
      'Gere `equals` e `hashCode` pelo IntelliJ e compare os campos com os da IA.',
      'Num `TreeSet`, adicione dois elementos que empatam no comparador e confira se os dois entraram.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Extending Collection with Set, SortedSet and NavigableSet',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/sets/',
      tipo: 'documentacao',
      porque: 'As três interfaces de conjunto e os métodos de navegação de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The Set Interface',
      url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/set.html',
      tipo: 'documentacao',
      porque: 'Operações de conjunto com `addAll`, `retainAll` e `removeAll`, e as implementações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.TreeSet',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeSet.html',
      tipo: 'documentacao',
      porque: 'O aviso sobre ordenação consistente com `equals` e o custo O(log n) das operações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.NavigableSet',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/NavigableSet.html',
      tipo: 'documentacao',
      porque: 'A definição exata de `floor`, `ceiling`, `lower`, `higher` e das visões.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.Set: Unmodifiable Sets',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html#unmodifiable',
      tipo: 'documentacao',
      porque: 'Por que `Set.of` rejeita repetidos e `null`, e por que a ordem de iteração não é garantida.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to HashSet in Java',
      url: 'https://www.baeldung.com/java-hashset',
      tipo: 'artigo',
      porque: 'Os métodos do `HashSet`, o `HashMap` interno e o fator de carga.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to TreeSet in Java',
      url: 'https://www.baeldung.com/java-tree-set',
      tipo: 'artigo',
      porque: 'Ordenação, `null` e os métodos de navegação do `TreeSet`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: HashSet and TreeSet Comparison',
      url: 'https://www.baeldung.com/java-hashset-vs-treeset',
      tipo: 'artigo',
      porque: 'Quando escolher cada um, com a diferença de desempenho.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Coleções pt 15, Set, HashSet',
      url: 'https://www.youtube.com/watch?v=dJ3fhRq-5tM',
      tipo: 'video',
      porque: '`HashSet` e `LinkedHashSet` com `equals` e `hashCode`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Coleções pt 16, NavigableSet, TreeSet pt 01',
      url: 'https://www.youtube.com/watch?v=JibYosgdk00',
      tipo: 'video',
      porque: '`TreeSet` e os métodos de navegação, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Set and HashSet in Java, Full Tutorial',
      url: 'https://www.youtube.com/watch?v=QvHBHuuddYk',
      tipo: 'video',
      porque: 'Os métodos de `Set` e as diferenças entre as três implementações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que `hashCode` precisa acompanhar `equals`, com o exemplo de um objeto que some de um `HashMap`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Methods Common to All Objects": Item 11, "Always override hashCode when you override equals"',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'Cada implementação de `Set` por dentro, com a comparação de custos.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Sets": seções "HashSet", "LinkedHashSet", "SortedSet and NavigableSet", "TreeSet" e "Comparing Set Implementations"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os conjuntos do jeito que a prova cobra: implementações, fábricas e ordem.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Using the Set Interface"',
    },
  ],
  desafio: {
    titulo: 'Alunos em duas turmas',
    enunciado:
      'Crie `record Aluno(String matricula, String nome)` que implementa `Comparable<Aluno>`, ordenando pelo nome e, em caso de empate, pela matrícula. A turma de Java tem as matrículas `1 Caio`, `2 Ana`, `3 Bia` e `2 Ana` de novo (um registro duplicado); a de Banco tem `3 Bia`, `4 Davi` e `1 Caio`. Use conjuntos para descobrir quantos alunos distintos a turma de Java tem, quem está nas duas, quem está só em Java e o total de alunos, sempre em ordem de nome. A saída deve ser:\n\n```text\njava: 4 registros, 3 alunos\nnas duas: Bia, Caio\nsó java: Ana\ntotal: 4 Ana, Bia, Caio, Davi\n```',
    dicas: [
      'Records já têm `equals` e `hashCode` por componente: um `HashSet` descarta o registro duplicado.',
      'Interseção, diferença e união são `retainAll`, `removeAll` e `addAll` sobre cópias.',
      'Copiar para um `TreeSet` ordena pelo `compareTo`. Desempatar pela matrícula mantém a comparação coerente com `equals`.',
    ],
    solucao: `import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class Turmas {
    record Aluno(String matricula, String nome) implements Comparable<Aluno> {
        @Override
        public int compareTo(Aluno outro) {
            int c = nome.compareTo(outro.nome);
            return c != 0 ? c : matricula.compareTo(outro.matricula);
        }
    }

    static String nomes(Set<Aluno> alunos) {
        StringBuilder sb = new StringBuilder();
        for (Aluno a : alunos) {
            if (sb.length() > 0) {
                sb.append(", ");
            }
            sb.append(a.nome());
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        List<Aluno> java = List.of(
            new Aluno("1", "Caio"), new Aluno("2", "Ana"), new Aluno("3", "Bia"), new Aluno("2", "Ana"));
        List<Aluno> banco = List.of(new Aluno("3", "Bia"), new Aluno("4", "Davi"), new Aluno("1", "Caio"));

        Set<Aluno> turmaJava = new HashSet<>(java);
        Set<Aluno> turmaBanco = new HashSet<>(banco);

        Set<Aluno> ambas = new TreeSet<>(turmaJava);
        ambas.retainAll(turmaBanco);
        Set<Aluno> soJava = new TreeSet<>(turmaJava);
        soJava.removeAll(turmaBanco);
        Set<Aluno> todos = new TreeSet<>(turmaJava);
        todos.addAll(turmaBanco);

        System.out.println("java: " + java.size() + " registros, " + turmaJava.size() + " alunos");
        System.out.println("nas duas: " + nomes(ambas));
        System.out.println("só java: " + nomes(soJava));
        System.out.println("total: " + todos.size() + " " + nomes(todos));
    }
}`,
    saida: 'java: 4 registros, 3 alunos\nnas duas: Bia, Caio\nsó java: Ana\ntotal: 4 Ana, Bia, Caio, Davi',
    comentarios:
      'O `HashSet` usa o `equals` e o `hashCode` gerados pelo record, e o `TreeSet` usa o `compareTo`. Se a comparação olhasse só o nome, dois alunos diferentes chamados "Ana" virariam um só no `TreeSet`, embora o `HashSet` os mantivesse separados. O desempate pela matrícula deixa as duas noções de igualdade de acordo, como a documentação do `TreeSet` recomenda.',
  },
  bugs: [
    {
      id: 'pleno-t3-e02-b01',
      dificuldade: 1,
      sintoma: 'O sorteio que pega o primeiro inscrito em ordem alfabética não compila: `cannot find symbol`, apontando o `get(0)`.',
      codigo: `import java.util.List;
import java.util.TreeSet;

public class Sorteio {
    public static void main(String[] args) {
        TreeSet<String> inscritos = new TreeSet<>(List.of("Caio", "Ana", "Bia"));
        String primeiro = inscritos.get(0);
        System.out.println("primeiro da lista: " + primeiro);
    }
}`,
      linha: 7,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.util.List;
import java.util.TreeSet;

public class Sorteio {
    public static void main(String[] args) {
        TreeSet<String> inscritos = new TreeSet<>(List.of("Caio", "Ana", "Bia"));
        String primeiro = inscritos.first();
        System.out.println("primeiro da lista: " + primeiro);
    }
}`,
      saidaCorrigida: 'primeiro da lista: Ana',
      dica: 'Conjuntos têm posições numeradas? Que método de `TreeSet` devolve o menor elemento?',
      explicacao:
        '`Set` não tem índice, e por isso não existem `get(i)` nem `set(i, e)`. O `TreeSet` mantém a ordem e oferece `first()` e `last()`, além das buscas de `NavigableSet`, como `ceiling` e `floor`. Se o código precisa de posições, o tipo certo é uma `List`.',
    },
    {
      id: 'pleno-t3-e02-b02',
      dificuldade: 2,
      sintoma: 'O mesmo CPF aparece duas vezes no relatório de clientes únicos, uma com o nome em maiúsculas: `clientes únicos: 2`.',
      codigo: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Clientes {
    static class Cliente {
        final String cpf;
        final String nome;

        Cliente(String cpf, String nome) {
            this.cpf = cpf;
            this.nome = nome;
        }

        @Override
        public boolean equals(Object o) {
            return o instanceof Cliente c && c.cpf.equals(cpf);
        }

        @Override
        public int hashCode() {
            return Objects.hash(cpf, nome);
        }
    }

    public static void main(String[] args) {
        Set<Cliente> unicos = new HashSet<>();
        unicos.add(new Cliente("123.456.789-00", "Ana Lima"));
        unicos.add(new Cliente("123.456.789-00", "ANA LIMA"));
        System.out.println("clientes únicos: " + unicos.size());
    }
}`,
      linha: 22,
      efeito: { tipo: 'saida', saida: 'clientes únicos: 2' },
      correcao: `import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Clientes {
    static class Cliente {
        final String cpf;
        final String nome;

        Cliente(String cpf, String nome) {
            this.cpf = cpf;
            this.nome = nome;
        }

        @Override
        public boolean equals(Object o) {
            return o instanceof Cliente c && c.cpf.equals(cpf);
        }

        @Override
        public int hashCode() {
            return Objects.hash(cpf);
        }
    }

    public static void main(String[] args) {
        Set<Cliente> unicos = new HashSet<>();
        unicos.add(new Cliente("123.456.789-00", "Ana Lima"));
        unicos.add(new Cliente("123.456.789-00", "ANA LIMA"));
        System.out.println("clientes únicos: " + unicos.size());
    }
}`,
      saidaCorrigida: 'clientes únicos: 1',
      dica: '`equals` e `hashCode` olham os mesmos campos? Dois clientes iguais para o `equals` caem no mesmo compartimento?',
      explicacao:
        'O contrato exige que objetos iguais por `equals` tenham o mesmo `hashCode`. Aqui, `equals` compara só o CPF, mas `hashCode` mistura o nome: as duas grafias geram hashes diferentes, caem em compartimentos diferentes, e o `HashSet` nem chega a chamar `equals`. Use exatamente os mesmos campos nos dois métodos, de preferência gerados juntos pela IDE ou por um record.',
    },
    {
      id: 'pleno-t3-e02-b03',
      dificuldade: 3,
      sintoma: 'Três jogadores pontuaram, mas o ranking mostra só dois, e Caio sumiu sem nenhum erro: `2 no ranking: [Bia=90, Ana=80]`.',
      codigo: `import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

public class Ranking {
    record Jogador(String nome, int pontos) {
        @Override
        public String toString() {
            return nome + "=" + pontos;
        }
    }

    public static void main(String[] args) {
        TreeSet<Jogador> ranking = new TreeSet<>(Comparator.comparingInt(Jogador::pontos).reversed());
        ranking.addAll(List.of(new Jogador("Ana", 80), new Jogador("Bia", 90), new Jogador("Caio", 80)));
        System.out.println(ranking.size() + " no ranking: " + ranking);
    }
}`,
      linha: 14,
      efeito: { tipo: 'saida', saida: '2 no ranking: [Bia=90, Ana=80]' },
      correcao: `import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

public class Ranking {
    record Jogador(String nome, int pontos) {
        @Override
        public String toString() {
            return nome + "=" + pontos;
        }
    }

    public static void main(String[] args) {
        TreeSet<Jogador> ranking = new TreeSet<>(Comparator.comparingInt(Jogador::pontos).reversed().thenComparing(Jogador::nome));
        ranking.addAll(List.of(new Jogador("Ana", 80), new Jogador("Bia", 90), new Jogador("Caio", 80)));
        System.out.println(ranking.size() + " no ranking: " + ranking);
    }
}`,
      saidaCorrigida: '3 no ranking: [Bia=90, Ana=80, Caio=80]',
      dica: 'Para o `TreeSet`, quando dois jogadores são o mesmo elemento? O que o comparador responde para Ana e Caio?',
      explicacao:
        'O `TreeSet` decide igualdade pela comparação, e não por `equals`: se o `Comparator` devolve 0, o segundo elemento é tratado como repetido e o `add` devolve `false`. Comparando só pelos pontos, Ana e Caio empatam. Desempate com um campo que diferencie os elementos, como `thenComparing(Jogador::nome)`, para que a ordem seja consistente com `equals`.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Set<String> s = new HashSet<>();
        boolean a = s.add("x");
        boolean b = s.add("x");
        boolean c = s.add("X");
        System.out.println(a + " " + b + " " + c + " " + s.size());
    }
}`,
      opcoes: ['`true false true 2`', '`true true true 3`', '`true false false 1`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um `add` repetido devolve `false`, sem exceção. "x" e "X" são strings diferentes.',
      dica: '`add` repetido devolve `false`; maiúscula e minúscula são textos diferentes.',
    },
    {
      id: 'pleno-t3-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Set<Integer> s = new LinkedHashSet<>(List.of(3, 1, 3, 2, 1));
        System.out.println(s);
    }
}`,
      opcoes: ['`[3, 1, 2]`', '`[1, 2, 3]`', '`[3, 1, 3, 2, 1]`', '`[2, 1, 3]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `LinkedHashSet` mantém a ordem da primeira inserção de cada elemento e descarta os repetidos.',
      dica: '`LinkedHashSet` guarda a ordem da primeira inserção.',
    },
    {
      id: 'pleno-t3-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeSet<Integer> t = new TreeSet<>(List.of(2, 8, 4, 6));
        System.out.println(t.floor(5) + " " + t.higher(8) + " " + t.ceiling(4) + " " + t.lower(2));
    }
}`,
      resposta: '4 null 4 null',
      explicacao: '`floor(5)` é o maior até 5; nada é maior que 8; `ceiling(4)` inclui o próprio 4; nada é menor que 2.',
      dica: '`floor` e `ceiling` incluem o valor; `higher` e `lower` são estritos.',
    },
    {
      id: 'pleno-t3-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeSet<Integer> t = new TreeSet<>(List.of(40, 10, 30, 20));
        System.out.println(t.headSet(30) + " " + t.tailSet(30) + " " + t.subSet(15, 35));
    }
}`,
      opcoes: [
        '`[10, 20] [30, 40] [20, 30]`',
        '`[10, 20, 30] [40] [20, 30]`',
        '`[10, 20] [40] [15, 20, 30, 35]`',
        '`[40, 10] [30, 20] [10, 30]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`headSet` exclui o limite, `tailSet` o inclui, e `subSet` inclui o início e exclui o fim. Os limites não precisam existir no conjunto.',
      dica: '`headSet` exclui o limite; `tailSet` inclui; `subSet` vai do primeiro, inclusive, ao segundo, exclusive.',
    },
    {
      id: 'pleno-t3-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println("criando");
        Set<String> cores = Set.of("azul", "verde", "azul");
        System.out.println(cores.size());
    }
}`,
      opcoes: [
        'Imprime `criando` e lança `IllegalArgumentException`',
        'Imprime `criando` e `2`',
        'Imprime `criando` e `3`',
        'Não compila: elementos repetidos',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: 'criando' },
      explicacao: '`Set.of` trata repetidos como erro de programação. `new HashSet<>(List.of(...))` ou `Set.copyOf` descartariam o repetido em silêncio.',
      dica: '`Set.of` recusa repetidos.',
    },
    {
      id: 'pleno-t3-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Set<String> a = new HashSet<>();
        a.add(null);
        System.out.println(a.size());
        Set<String> b = new TreeSet<>();
        b.add(null);
        System.out.println(b.size());
    }
}`,
      opcoes: [
        'Imprime `1` e lança `NullPointerException`',
        'Imprime `1` e `1`',
        'Imprime `0` e `0`',
        'Lança `NullPointerException` na primeira inserção',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: '1' },
      explicacao: 'O `HashSet` aceita um `null`. O `TreeSet` precisa comparar o elemento, e `null` não pode ser comparado pela ordem natural.',
      dica: 'O `TreeSet` precisa comparar o `null` com algo.',
    },
    {
      id: 'pleno-t3-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static class Codigo {
        final int valor;

        Codigo(int valor) {
            this.valor = valor;
        }

        @Override
        public boolean equals(Object o) {
            return o instanceof Codigo c && c.valor == valor;
        }
    }

    public static void main(String[] args) {
        Set<Codigo> s = new HashSet<>();
        s.add(new Codigo(7));
        s.add(new Codigo(7));
        System.out.println(s.size() + " " + new Codigo(7).equals(new Codigo(7)));
    }
}`,
      opcoes: ['`2 true`', '`1 true`', '`2 false`', '`1 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem `hashCode` sobrescrito, cada objeto tem um hash diferente e cai em outro compartimento, onde o `equals` nem é chamado.',
      dica: 'Sem `hashCode`, cada objeto cai num compartimento diferente.',
    },
    {
      id: 'pleno-t3-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    record Item(List<String> tags) { }

    public static void main(String[] args) {
        List<String> tags = new ArrayList<>(List.of("a"));
        Item item = new Item(tags);
        Set<Item> s = new HashSet<>();
        s.add(item);
        tags.add("b");
        System.out.println(s.contains(item) + " " + s.size());
    }
}`,
      opcoes: ['`false 1`', '`true 1`', '`false 0`', '`true 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O record é imutável só na superfície: a lista dentro dele mudou, e com ela o `hashCode`. O item continua no conjunto, mas no compartimento do hash antigo.',
      dica: 'O `hashCode` do record usa a lista, que mudou depois da inserção.',
    },
    {
      id: 'pleno-t3-e02-q09',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método de `NavigableSet` que devolve o menor elemento estritamente maior que o argumento. O programa deve imprimir `30`.',
      codigo: `import java.util.*;

public class Busca {
    public static void main(String[] args) {
        TreeSet<Integer> t = new TreeSet<>(List.of(10, 20, 30));
        System.out.println(t.___(20));
    }
}`,
      respostas: ['higher'],
      saida: '30',
      explicacao: '`higher` exclui o próprio valor. `ceiling(20)` devolveria 20, porque inclui o valor quando ele existe.',
      dica: 'É o vizinho estritamente maior.',
    },
    {
      id: 'pleno-t3-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Set<String> s = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        s.add("Java");
        s.add("java");
        s.add("JAVA");
        s.add("Kotlin");
        System.out.println(s);
    }
}`,
      opcoes: ['`[Java, Kotlin]`', '`[JAVA, Java, Kotlin, java]`', '`[java, Kotlin]`', '`[JAVA, Kotlin]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `TreeSet` considera iguais os elementos que o comparador diz serem iguais. As variações de "Java" são recusadas, e fica a primeira inserida.',
      dica: 'O comparador sem caixa considera iguais as três grafias de Java; fica a primeira.',
    },
    {
      id: 'pleno-t3-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    static class Caixa {
        int peso = 1;
    }

    public static void main(String[] args) {
        Set<Caixa> caixas = new TreeSet<>();
        System.out.println("antes");
        caixas.add(new Caixa());
        System.out.println(caixas.size());
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `ClassCastException`',
        'Imprime `antes` e `1`',
        'Não compila: `Caixa` não implementa `Comparable`',
        'Imprime `antes` e só falha no segundo `add`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ClassCastException', saida: 'antes' },
      explicacao: 'O tipo `TreeSet<Caixa>` compila, porque o comparador poderia vir no construtor. Sem ele, o `TreeSet` tenta usar `Caixa` como `Comparable` e falha já no primeiro elemento.',
      dica: 'O `TreeSet` precisa comparar já no primeiro `add`.',
    },
    {
      id: 'pleno-t3-e02-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`LinkedHashSet` itera na ordem de inserção',
        '`TreeSet` usa a comparação para decidir se dois elementos são iguais',
        '`HashSet` itera em ordem crescente',
        '`TreeSet` aceita um único elemento `null`',
        '`Set` tem o método `get(int)`',
      ],
      respostas: [0, 1],
      explicacao: 'A ordem do `HashSet` depende dos códigos hash e não é garantida. O `TreeSet` rejeita `null`, e nenhum `Set` tem acesso por índice.',
      dica: 'Uma afirmação fala da ordem de inserção; outra, de como a árvore decide igualdade.',
    },
    {
      id: 'pleno-t3-e02-q13',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Set<String> nomes = new TreeSet<>(List.of("Bia", "Ana"));
        TreeSet<String> ordenados = new TreeSet<>(nomes);
        String primeiro = ordenados.first();
        String segundo = nomes.get(1);
        System.out.println(primeiro + segundo);
    }
}`,
      resposta: 8,
      explicacao: '`Set` não tem índices. Para o primeiro ou o último, `TreeSet` oferece `first()` e `last()`.',
      dica: '`Set` não tem índice.',
    },
    {
      id: 'pleno-t3-e02-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Set<Integer> a = new TreeSet<>(List.of(1, 2, 3));
        boolean mudou = a.retainAll(Set.of(2, 3, 4));
        boolean mudouDeNovo = a.retainAll(Set.of(2, 3));
        System.out.println(a + " " + mudou + " " + mudouDeNovo);
    }
}`,
      resposta: '[2, 3] true false',
      explicacao: '`retainAll` mantém só a interseção e devolve `true` se o conjunto mudou. Na segunda chamada, nada sai.',
      dica: '`retainAll` devolve se o conjunto mudou.',
    },
    {
      id: 'pleno-t3-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeSet<Integer> t = new TreeSet<>(List.of(10, 20, 30));
        SortedSet<Integer> h = t.headSet(25);
        h.add(5);
        t.add(22);
        System.out.println(h + " " + t.size());
    }
}`,
      opcoes: ['`[5, 10, 20, 22] 5`', '`[5, 10, 20] 4`', '`[5, 10, 20] 5`', '`[10, 20, 22] 4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`headSet` devolve uma visão da faixa abaixo de 25. O 5 entra no conjunto original por ela, e o 22 inserido no original aparece na visão.',
      dica: 'O `headSet` é uma visão: o que entra na faixa aparece nos dois.',
    },
  ],
};

export default episodio;
