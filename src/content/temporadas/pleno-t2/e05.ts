import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t2-e05',
  minutos: 16,
  aula,
  armadilhas: [
    '`<T extends X>` aceita `X` e subtipos, e `extends` vale também para interfaces: `<T extends Runnable>`.',
    'Com vários limites, a classe vem primeiro e só pode haver uma: `<T extends Number & Comparable<T>>`.',
    '`<T super Integer>` não compila; `super` só existe em wildcards.',
    'Dentro do código, `T` só tem os métodos do seu limite: `<T extends Number>` não tem `compareTo`.',
    '`<T extends Comparable<T>>` rejeita uma subclasse que herdou `compareTo` do pai; `<T extends Comparable<? super T>>` aceita.',
    'PECS: quem produz valores para o método usa `extends`; quem os consome usa `super`.',
    '`Comparator`, `Consumer` e `Predicate` consomem, por isso aparecem como `Comparator<? super T>`.',
    'O apagamento usa o primeiro limite: `<T extends Object & Comparable<? super T>>` vira `Object`.',
  ],
  ia: {
    uso:
      'Para limites e PECS, a IA ajuda a ler assinaturas complicadas do JDK, como a de `Collections.max`, e a dizer quem produz e quem consome em cada parâmetro. Ela costuma escrever `<T extends Comparable<T>>`, que recusa subclasses, e errar a ordem dos limites com `&`.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui a assinatura genérica e um exemplo de uso>\n- Para cada parâmetro, diga se ele produz ou consome valores, e qual coringa o PECS indica.\n- Explique os limites do parâmetro de tipo e como fica o apagamento.\n- Mostre uma chamada com uma subclasse que herda compareTo e outra com um Comparator<Object>, e diga se compilam.\n- Não troque os coringas por List<T> nem use raw types.',
    erros: [
      'Declara `<T extends Comparable<T>>`, e a chamada com uma subclasse que herda o `compareTo` não compila.',
      'Escreve os limites fora de ordem, como `<T extends Comparable<T> & Number>`, que não compila.',
      'Usa `<T super Integer>` num parâmetro de tipo, onde `super` não existe.',
      'Inverte o PECS e declara o destino de uma cópia como `? extends T`.',
    ],
    conferir: [
      'Compile chamadas com uma subclasse e com um `Comparator<Object>` contra a assinatura sugerida.',
      'Imprima `toGenericString()` do método, por reflexão, para ver os limites declarados.',
      'Compare a assinatura com a de um método parecido do JDK, como `Collections.copy` ou `Collections.max`.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Bounded Type Parameters',
      url: 'https://dev.java/learn/language/fp/generics/intro/#bounded-type-parameters',
      tipo: 'documentacao',
      porque: 'Limites simples e múltiplos, e métodos genéricos com parâmetros limitados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Guidelines for Wildcard Use',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/wildcardGuidelines.html',
      tipo: 'documentacao',
      porque: 'A versão oficial do PECS, com variáveis de entrada e de saída.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Collections.max',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#max(java.util.Collection)',
      tipo: 'documentacao',
      porque: 'A assinatura com `Object &` e `? super T` que resume esta aula inteira.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 4.4: Type Variables',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.4',
      tipo: 'documentacao',
      porque: 'As regras de limites: uma classe no máximo, depois interfaces, e os membros que o tipo ganha.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java Generics PECS, Producer Extends Consumer Super',
      url: 'https://www.baeldung.com/java-generics-pecs',
      tipo: 'artigo',
      porque: 'A regra PECS com exemplos de produtor e consumidor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Type Parameter vs Wildcard in Java Generics',
      url: 'https://www.baeldung.com/java-generics-type-parameter-vs-wildcard',
      tipo: 'artigo',
      porque: 'Quando usar um `T` com nome e quando um wildcard resolve melhor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Geekific: Java Generics Finally Explained (Wildcards, PECS & More)',
      url: 'https://www.youtube.com/watch?v=NAZkukK5zX0',
      tipo: 'video',
      porque: 'Limites, wildcards e PECS amarrados num só vídeo, com diagramas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Challengers #16: Generics super wildcard',
      url: 'https://www.youtube.com/watch?v=N3lKqCh_9TY',
      tipo: 'video',
      porque: 'Um desafio no estilo da prova sobre o que entra e o que sai de uma lista com `? super`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevSuperior: Generics, fundamentos e prática, Java e Spring',
      url: 'https://www.youtube.com/watch?v=XuR756Q37bk',
      tipo: 'video',
      porque: 'Uma aula longa de generics com casos práticos em Java e Spring, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Onde nasceu a sigla PECS, com o caso de `Comparable<? super T>` e a regra de não usar wildcard no retorno.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Generics": Item 31, "Use bounded wildcards to increase API flexibility"',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'O princípio do get e put, a versão dos autores para o PECS, e a assinatura de `max` explicada passo a passo.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, seção "The Get and Put Principle"; Cap. 3, "Comparison and Bounds": seções "Maximum of a Collection", "A Fruity Example" e "Multiple Bounds"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os limites superiores, inferiores e sem limite comparados lado a lado, e as questões que os combinam.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Working with Generics", partes "Bounding Generic Types" e "Putting It All Together"',
    },
  ],
  desafio: {
    titulo: 'Ranking genérico',
    enunciado:
      'Escreva dois métodos estáticos. `topN(itens, n)` devolve os `n` maiores elementos de uma coleção em ordem decrescente, para qualquer tipo comparável, inclusive subclasses que herdaram o `compareTo`. `transferir(origem, destino, filtro)` copia para `destino` os itens que passam no `Predicate` e devolve quantos copiou. Use limites e wildcards seguindo o PECS. Crie `Jogador implements Comparable<Jogador>` (comparando por pontos, com `toString` no formato `Nome(pontos)`) e `Goleiro extends Jogador`. No `main`, ache os 2 melhores goleiros entre Ana (72), Bia (91) e Caio (85); os 5 maiores entre "pera", "uva" e "maçã"; transfira para uma `List<Jogador>` os goleiros com mais de 80 pontos usando um `Predicate<Jogador>`; e transfira a seleção para uma `List<Object>` com um `Predicate<Object>` que aceita tudo. A saída deve ser:\n\n```text\n[Bia(91), Caio(85)]\n[uva, pera, maçã]\n2 [Bia(91), Caio(85)]\n2\n```',
    dicas: [
      '`Goleiro` é `Comparable<Jogador>`, não `Comparable<Goleiro>`: o limite de `T` precisa de `? super T`.',
      'A coleção de entrada só é lida (`? extends T`); o destino só recebe (`? super T`); o filtro consome (`? super T`).',
      'Copie para um `ArrayList<T>`, ordene com `(a, b) -> b.compareTo(a)` e use `subList` com `Math.min` para não passar do tamanho.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Predicate;

public class Ranking {
    static class Jogador implements Comparable<Jogador> {
        final String nome;
        final int pontos;

        Jogador(String nome, int pontos) {
            this.nome = nome;
            this.pontos = pontos;
        }

        @Override
        public int compareTo(Jogador outro) {
            return Integer.compare(pontos, outro.pontos);
        }

        @Override
        public String toString() {
            return nome + "(" + pontos + ")";
        }
    }

    static class Goleiro extends Jogador {
        Goleiro(String nome, int pontos) {
            super(nome, pontos);
        }
    }

    static <T extends Comparable<? super T>> List<T> topN(Collection<? extends T> itens, int n) {
        List<T> ordenados = new ArrayList<>(itens);
        ordenados.sort((a, b) -> b.compareTo(a));
        return ordenados.subList(0, Math.min(n, ordenados.size()));
    }

    static <T> int transferir(Collection<? extends T> origem, Collection<? super T> destino, Predicate<? super T> filtro) {
        int total = 0;
        for (T item : origem) {
            if (filtro.test(item)) {
                destino.add(item);
                total++;
            }
        }
        return total;
    }

    public static void main(String[] args) {
        List<Goleiro> goleiros = List.of(new Goleiro("Ana", 72), new Goleiro("Bia", 91), new Goleiro("Caio", 85));
        List<Goleiro> melhores = topN(goleiros, 2);
        System.out.println(melhores);
        System.out.println(topN(List.of("pera", "uva", "maçã"), 5));

        List<Jogador> selecao = new ArrayList<>();
        Predicate<Jogador> acimaDe80 = j -> j.pontos > 80;
        int n = transferir(goleiros, selecao, acimaDe80);
        System.out.println(n + " " + selecao);

        List<Object> registro = new ArrayList<>();
        Predicate<Object> todos = o -> true;
        transferir(selecao, registro, todos);
        System.out.println(registro.size());
    }
}`,
    saida: '[Bia(91), Caio(85)]\n[uva, pera, maçã]\n2 [Bia(91), Caio(85)]\n2',
    comentarios:
      'Com `<T extends Comparable<T>>`, a chamada `topN(goleiros, 2)` não compilaria, porque `Goleiro` herdou um `compareTo(Jogador)`. Em `transferir`, cada parâmetro tem o wildcard do seu papel, e o compilador acha um `T` que satisfaz os três: na primeira chamada, qualquer tipo entre `Goleiro` e `Jogador` serve. Sem os wildcards, seria preciso que origem, destino e filtro tivessem exatamente o mesmo tipo.',
  },
  bugs: [
    {
      id: 'pleno-t2-e05-b01',
      dificuldade: 1,
      sintoma: 'O utilitário que acha o menor preço não compila: `interface expected here`.',
      codigo: `import java.util.List;

public class Precos {
    static <T extends Comparable<T> & Number> T menor(List<T> valores) {
        T m = valores.get(0);
        for (T v : valores) if (v.compareTo(m) < 0) m = v;
        return m;
    }

    public static void main(String[] args) {
        System.out.println(menor(List.of(19, 7, 12)) + " " + menor(List.of(2.5, 1.5)));
    }
}`,
      linha: 4,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.util.List;

public class Precos {
    static <T extends Number & Comparable<T>> T menor(List<T> valores) {
        T m = valores.get(0);
        for (T v : valores) if (v.compareTo(m) < 0) m = v;
        return m;
    }

    public static void main(String[] args) {
        System.out.println(menor(List.of(19, 7, 12)) + " " + menor(List.of(2.5, 1.5)));
    }
}`,
      saidaCorrigida: '7 1.5',
      dica: 'Num limite com `&`, onde a classe precisa ficar?',
      explicacao:
        'Com vários limites, no máximo um é classe, e ela vem **primeiro**; depois do `&`, o compilador só aceita interfaces. Escreva `<T extends Number & Comparable<T>>`. A ordem também decide o apagamento: o método compilado usa o primeiro limite, aqui `Number`.',
    },
    {
      id: 'pleno-t2-e05-b02',
      dificuldade: 2,
      sintoma: 'A fila de atendimento lista o pedido 100 antes do 25 e o 9 por último: `[Ana, Bia, Caio] [10, 100, 25, 9]`.',
      codigo: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Fila {
    static final Comparator<Object> POR_TEXTO = Comparator.comparing(Object::toString);

    public static void main(String[] args) {
        List<String> clientes = new ArrayList<>(List.of("Caio", "Ana", "Bia"));
        clientes.sort(POR_TEXTO);
        List<Integer> pedidos = new ArrayList<>(List.of(10, 9, 100, 25));
        pedidos.sort(POR_TEXTO);
        System.out.println(clientes + " " + pedidos);
    }
}`,
      linha: 12,
      efeito: { tipo: 'saida', saida: '[Ana, Bia, Caio] [10, 100, 25, 9]' },
      correcao: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Fila {
    static final Comparator<Object> POR_TEXTO = Comparator.comparing(Object::toString);

    public static void main(String[] args) {
        List<String> clientes = new ArrayList<>(List.of("Caio", "Ana", "Bia"));
        clientes.sort(POR_TEXTO);
        List<Integer> pedidos = new ArrayList<>(List.of(10, 9, 100, 25));
        pedidos.sort(Comparator.naturalOrder());
        System.out.println(clientes + " " + pedidos);
    }
}`,
      saidaCorrigida: '[Ana, Bia, Caio] [9, 10, 25, 100]',
      dica: 'O comparador reaproveitado compara os pedidos como números ou como texto?',
      explicacao:
        '`List.sort` pede um `Comparator<? super E>`, e por isso um `Comparator<Object>` é aceito para qualquer lista: é o PECS a favor da reutilização. Mas `POR_TEXTO` compara o `toString`, e como texto `"10"` vem antes de `"100"`, que vem antes de `"25"` e de `"9"`. Para números, use a ordem natural, `Comparator.naturalOrder()`, ou `Comparator.comparingInt`.',
    },
    {
      id: 'pleno-t2-e05-b03',
      dificuldade: 3,
      sintoma: 'Depois que a prioridade MEDIA foi criada, o sistema passou a mandar atender primeiro os chamados médios, e não os de prioridade alta: `atender primeiro: MEDIA`.',
      codigo: `import java.util.List;

public class Chamados {
    enum Prioridade { BAIXA, ALTA, MEDIA }

    static <T extends Comparable<? super T>> T maior(List<? extends T> itens) {
        T m = itens.get(0);
        for (T item : itens) if (item.compareTo(m) > 0) m = item;
        return m;
    }

    public static void main(String[] args) {
        List<Prioridade> abertos = List.of(Prioridade.BAIXA, Prioridade.ALTA, Prioridade.MEDIA);
        System.out.println("atender primeiro: " + maior(abertos));
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: 'atender primeiro: MEDIA' },
      correcao: `import java.util.List;

public class Chamados {
    enum Prioridade { BAIXA, MEDIA, ALTA }

    static <T extends Comparable<? super T>> T maior(List<? extends T> itens) {
        T m = itens.get(0);
        for (T item : itens) if (item.compareTo(m) > 0) m = item;
        return m;
    }

    public static void main(String[] args) {
        List<Prioridade> abertos = List.of(Prioridade.BAIXA, Prioridade.ALTA, Prioridade.MEDIA);
        System.out.println("atender primeiro: " + maior(abertos));
    }
}`,
      saidaCorrigida: 'atender primeiro: ALTA',
      dica: 'Como um `enum` implementa `Comparable`? O que define qual constante é maior?',
      explicacao:
        'Todo `enum` é `Comparable` de si mesmo, pelo limite recursivo `Enum<E extends Enum<E>>`, e o `compareTo` usa o `ordinal`: a ordem da declaração. A constante `MEDIA` foi acrescentada no fim e virou a maior. Declare as constantes na ordem que tem significado, ou compare por um campo explícito, como um `int peso`, para não depender da posição.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t2-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    static class Medida<N extends Number> {
        N valor;

        Medida(N valor) {
            this.valor = valor;
        }
    }

    public static void main(String[] args) {
        Medida<Integer> a = new Medida<>(5);
        Medida<String> b = new Medida<>("5");
        System.out.println(a.valor);
    }
}`,
      opcoes: [
        'Não compila: `String` está fora do limite de `N`',
        'Compila e imprime `5`',
        'Compila, mas lança `ClassCastException`',
        'Não compila: `Medida` precisa de um construtor sem argumentos',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 12 },
      explicacao: '`N extends Number` só aceita `Number` e subtipos. `Integer` serve; `String`, não.',
      dica: '`String` está dentro do limite de `N`?',
    },
    {
      id: 'pleno-t2-e05-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static <T extends Comparable<T>> T maior(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(maior("pera", "Pera") + maior(10, 9) + maior('a', 'b'));
    }
}`,
      opcoes: ['`pera10b`', '`Pera10b`', '`pera10a`', 'Não compila: `char` não é `Comparable`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Letras minúsculas vêm depois das maiúsculas na tabela de caracteres, então "pera" é maior. Os `char` viram `Character`, que é `Comparable<Character>`.',
      dica: 'Na comparação de `String`, maiúsculas vêm antes de minúsculas; `Character` também é `Comparable`.',
    },
    {
      id: 'pleno-t2-e05-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`class A<T extends Number & Comparable<T>> { }`',
        '`class B<T extends Comparable<T> & java.io.Serializable> { }`',
        '`class C<T extends Runnable> { }`',
        '`class D<T extends Comparable<T> & Number> { }`',
        '`class E<T super Integer> { }`',
        '`class F<T extends Number & Integer> { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Nos limites, `extends` serve para classe e interface. Pode haver várias interfaces, mas só uma classe, e ela vem primeiro. `super` não existe em parâmetros de tipo.',
      dica: 'Com vários limites, só uma classe e sempre a primeira; `super` não existe em declaração.',
    },
    {
      id: 'pleno-t2-e05-q04',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    static <T extends Comparable<T>> T maior(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(maior("abacaxi", "banana"));
        System.out.println(maior(3, 7));
        System.out.println(maior(1, 2.5));
    }
}`,
      resposta: 9,
      explicacao: 'Com `1` e `2.5`, `T` precisaria ser `Integer` e `Double` ao mesmo tempo. Um tipo comum como `Number` não serve, porque não é `Comparable<Number>`.',
      dica: '`T` precisaria ser `Integer` e `Double` ao mesmo tempo.',
    },
    {
      id: 'pleno-t2-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Comparator<Object> porTexto = Comparator.comparing(Object::toString);
        List<Integer> numeros = new ArrayList<>(List.of(10, 9, 100));
        numeros.sort(porTexto);
        System.out.println(numeros);
    }
}`,
      opcoes: [
        '`[10, 100, 9]`',
        '`[9, 10, 100]`',
        'Não compila: um `Comparator<Object>` não serve para `List<Integer>`',
        '`[100, 10, 9]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`List.sort` recebe `Comparator<? super E>`, então um comparador de `Object` é aceito. Como texto, "10" < "100" < "9".',
      dica: 'Comparados como texto, os números seguem a ordem dos caracteres.',
    },
    {
      id: 'pleno-t2-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    static class Fruta implements Comparable<Fruta> {
        int peso;

        public int compareTo(Fruta outra) {
            return Integer.compare(peso, outra.peso);
        }
    }

    static class Maca extends Fruta { }

    static <T extends Comparable<T>> T maior(List<T> itens) {
        return Collections.max(itens);
    }

    public static void main(String[] args) {
        List<Fruta> frutas = List.of(new Fruta(), new Maca());
        Fruta f = maior(frutas);
        List<Maca> macas = List.of(new Maca());
        Maca m = maior(macas);
    }
}`,
      opcoes: [
        'Não compila: `Maca` não é `Comparable<Maca>`',
        'Compila',
        'Não compila: `Collections.max` não aceita `List<T>`',
        'Não compila: `List<Fruta>` não pode guardar uma `Maca`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 22 },
      explicacao: '`Maca` herdou `Comparable<Fruta>`. Com `List<Fruta>`, `T` é `Fruta` e o limite é satisfeito; com `List<Maca>`, não. `<T extends Comparable<? super T>>` aceitaria as duas.',
      dica: '`Maca` herda o `compareTo` de `Fruta`: ela é `Comparable` de quê?',
    },
    {
      id: 'pleno-t2-e05-q07',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    static class Animal implements Comparable<Animal> {
        final String nome;
        final int idade;

        Animal(String nome, int idade) {
            this.nome = nome;
            this.idade = idade;
        }

        public int compareTo(Animal outro) {
            return Integer.compare(idade, outro.idade);
        }
    }

    static class Cachorro extends Animal {
        Cachorro(String nome, int idade) {
            super(nome, idade);
        }
    }

    static <T extends Comparable<? super T>> T menor(List<? extends T> itens) {
        T m = itens.get(0);
        for (T item : itens) {
            if (item.compareTo(m) < 0) {
                m = item;
            }
        }
        return m;
    }

    public static void main(String[] args) {
        List<Cachorro> cachorros = List.of(new Cachorro("Rex", 5), new Cachorro("Bidu", 2), new Cachorro("Thor", 7));
        Cachorro c = menor(cachorros);
        System.out.println(c.nome + " " + Collections.max(cachorros).nome);
    }
}`,
      resposta: 'Bidu Thor',
      explicacao: 'O limite `Comparable<? super T>` aceita `Cachorro`, que herdou `Comparable<Animal>`. `Collections.max` tem o mesmo limite e devolve o mais velho.',
      dica: 'Com `? super T`, a subclasse usa o `compareTo` do pai, pela idade.',
    },
    {
      id: 'pleno-t2-e05-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o tipo do destino seguindo o PECS. O programa deve imprimir `[início, 1, 2]`.',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class Copia {
    static <T> void copiar(List<___> destino, List<? extends T> origem) {
        for (T item : origem) {
            destino.add(item);
        }
    }

    public static void main(String[] args) {
        List<Object> tudo = new ArrayList<>(List.of("início"));
        copiar(tudo, List.of(1, 2));
        System.out.println(tudo);
    }
}`,
      respostas: ['? super T'],
      saida: '[início, 1, 2]',
      explicacao: 'O destino consome valores de `T`, então recebe `? super T` e aceita uma `List<Object>` para elementos `Integer`.',
      dica: 'O destino consome valores: qual coringa o PECS indica?',
    },
    {
      id: 'pleno-t2-e05-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sobre `Collections.copy(List<? super T> dest, List<? extends T> src)`, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`src` é um produtor: o método só lê dele',
        '`dest` é um consumidor: o método escreve nele',
        'O método pode adicionar elementos novos em `src`',
        '`dest` precisa ser exatamente uma `List<T>`',
        'Trocar os dois parâmetros por `List<T>` não mudaria quais chamadas compilam',
      ],
      respostas: [0, 1],
      explicacao: 'É o PECS: quem produz usa `extends`, quem consome usa `super`. Com `List<T>` nos dois, copiar uma `List<Integer>` para uma `List<Number>` deixaria de compilar.',
      dica: 'PECS: `src` produz, `dest` consome.',
    },
    {
      id: 'pleno-t2-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static <T> void copiar(List<? super T> destino, List<? extends T> origem) {
        for (T item : origem) {
            destino.add(item);
        }
    }

    public static void main(String[] args) {
        List<Object> tudo = new ArrayList<>(List.of("a"));
        copiar(tudo, List.of(1, 2));
        copiar(tudo, List.of(true));
        System.out.println(tudo);
    }
}`,
      opcoes: [
        '`[a, 1, 2, true]`',
        'Não compila: `List<Object>` não pode receber `Integer` e `Boolean`',
        '`[1, 2, true]`',
        'Não compila: `T` não pode ser inferido',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em cada chamada, o compilador infere um `T` diferente: `Integer` e depois `Boolean`. Em ambos os casos, `List<Object>` é uma lista de algum supertipo de `T`.',
      dica: '`List<Object>` é supertipo de qualquer argumento de `T`.',
    },
    {
      id: 'pleno-t2-e05-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que `Collections.max` declara `<T extends Object & Comparable<? super T>>`, se todo tipo já estende `Object`?',
      opcoes: [
        'Para que o apagamento do retorno seja `Object`, como na versão anterior ao Java 5',
        'Para permitir que `T` seja um tipo primitivo',
        'Porque sem `Object` o compilador não aceitaria `? super T`',
        'Para que `max` aceite coleções de tipos que não implementam `Comparable`',
      ],
      resposta: 0,
      explicacao: 'O apagamento usa o primeiro limite. Com `Object` na frente, o método compilado continua devolvendo `Object`, e os programas antigos que o chamavam seguem funcionando.',
      dica: 'O apagamento usa o primeiro limite.',
    },
    {
      id: 'pleno-t2-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    static <T super Integer> void adicionar(T valor) {
        System.out.println(valor);
    }
}`,
      opcoes: [
        'Não compila: `super` não pode limitar um parâmetro de tipo',
        'Compila',
        'Compila, e `T` aceita `Integer`, `Number` ou `Object`',
        'Não compila: falta `static` antes de `<T>`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'Limites inferiores só existem em wildcards, como `List<? super Integer>`. Em declarações de parâmetro de tipo, só `extends`.',
      dica: '`super` só existe em wildcards.',
    },
    {
      id: 'pleno-t2-e05-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        Function<Object, Integer> tamanho = o -> o.toString().length();
        List<Integer> tamanhos = Stream.of("a", "bb", "ccc").map(tamanho).collect(Collectors.toList());
        Consumer<Object> imprimir = o -> System.out.print(o + ";");
        List.of("x", "y").forEach(imprimir);
        System.out.println(tamanhos);
    }
}`,
      opcoes: [
        '`x;y;[1, 2, 3]`',
        'Não compila: `map` espera uma `Function<String, ...>`',
        'Não compila: `forEach` espera um `Consumer<String>`',
        '`[1, 2, 3]x;y;`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`map` recebe `Function<? super T, ? extends R>` e `forEach` recebe `Consumer<? super T>`. Funções e consumidores de `Object` servem a qualquer stream ou lista.',
      dica: '`map` e `forEach` aceitam funções que consomem um supertipo.',
    },
    {
      id: 'pleno-t2-e05-q14',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    static <T extends Number> String descrever(T a, T b) {
        double soma = a.doubleValue() + b.doubleValue();
        int inteiro = a.intValue();
        boolean maior = a.compareTo(b) > 0;
        return soma + " " + inteiro + " " + maior;
    }
}`,
      resposta: 5,
      explicacao: '`T` só tem os métodos do seu limite. `Number` não implementa `Comparable`; seria preciso `<T extends Number & Comparable<T>>`.',
      dica: '`Number` não tem `compareTo`.',
    },
    {
      id: 'pleno-t2-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quando um parâmetro de tipo aparece uma única vez na assinatura de um método, como em `<T> void imprimir(List<T> lista)`, qual é a recomendação?',
      opcoes: [
        'Trocá-lo por um wildcard: `void imprimir(List<?> lista)`',
        'Trocá-lo por `List<Object>`',
        'Usar um raw type: `void imprimir(List lista)`',
        'Adicionar um limite: `<T extends Object>`',
      ],
      resposta: 0,
      explicacao: 'Se `T` não relaciona nada a nada, o nome não ajuda, e `List<?>` comunica o mesmo de forma mais simples. `List<Object>` restringiria as chamadas, e o raw type desligaria a verificação.',
      dica: 'Um parâmetro de tipo que aparece uma vez só pode virar coringa.',
    },
  ],
};

export default episodio;
