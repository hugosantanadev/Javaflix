import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t2-e03',
  minutos: 16,
  aula,
  armadilhas: [
    'Depois do apagamento, `T` vira o primeiro limite, ou `Object` se não houver limite.',
    '`new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass()` é `true`.',
    'Campos `static` de uma classe genérica são compartilhados por todas as parametrizações.',
    'Métodos que só diferem no argumento de tipo (`f(List<String>)` e `f(List<Integer>)`) não compilam: mesmo apagamento.',
    '`o instanceof List<String>` com `o` do tipo `Object` não compila; `o instanceof List<?>` compila.',
    '`new List<String>[3]` não compila; declarar `List<String>[] a` e criar `new List<?>[3]` compila.',
    'Na poluição do heap, a `ClassCastException` aparece onde o valor é lido com o tipo específico, não onde entrou.',
    'O compilador gera métodos-ponte para manter a sobrescrita depois do apagamento.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Type Erasure',
      url: 'https://dev.java/learn/language/fp/generics/type-erasure/',
      tipo: 'documentacao',
      porque: 'Apagamento de classes e métodos, métodos-ponte, tipos não reificáveis e poluição do heap.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Effects of Type Erasure and Bridge Methods',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/bridgeMethods.html',
      tipo: 'documentacao',
      porque: 'O exemplo clássico de método-ponte e a `ClassCastException` que ele pode lançar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Non-Reifiable Types',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/nonReifiableVarargsType.html',
      tipo: 'documentacao',
      porque: 'Tipos reificáveis, poluição do heap e o uso de `@SafeVarargs`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 4.6 e 4.7: Type Erasure e Reifiable Types',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.6',
      tipo: 'documentacao',
      porque: 'As regras exatas de apagamento e a lista de tipos reificáveis.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Brian Goetz: Background, How We Got the Generics We Have',
      url: 'https://openjdk.org/projects/valhalla/design-notes/in-defense-of-erasure',
      tipo: 'artigo',
      porque: 'O arquiteto da linguagem explica por que o Java escolheu o apagamento e o que isso significa para o Valhalla.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Type Erasure in Java Explained',
      url: 'https://www.baeldung.com/java-type-erasure',
      tipo: 'artigo',
      porque: 'Apagamento de classes e de métodos com o bytecode resultante e os casos de borda.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java @SafeVarargs Annotation',
      url: 'https://www.baeldung.com/java-safevarargs',
      tipo: 'artigo',
      porque: 'Por que varargs genéricos geram aviso de poluição do heap e quando é seguro suprimi-lo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Angelika Langer: Java Generics FAQ',
      url: 'https://angelikalanger.com/GenericsFAQ/JavaGenericsFAQ.html',
      tipo: 'artigo',
      porque: 'A referência mais completa sobre generics, com centenas de perguntas sobre apagamento, pontes e reificação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java: How the JVM Optimizes Generic Code, A Deep Dive',
      url: 'https://www.youtube.com/watch?v=J4O5h3xpIY8',
      tipo: 'video',
      porque: 'O que acontece com código genérico depois do apagamento, dentro do JIT, no canal oficial do Java.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Devoxx: Java Generics, Past, Present and Future (Richard Warburton e Raoul-Gabriel Urma)',
      url: 'https://www.youtube.com/watch?v=LEAoMMEIUXk',
      tipo: 'video',
      porque: 'A história das decisões de projeto dos generics, apagamento incluído, e o que pode vir depois.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Arrays contra listas genéricas, varargs genéricos e o contêiner heterogêneo com token de tipo.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Generics": Item 28, "Prefer lists to arrays", Item 32, "Combine generics and varargs judiciously", e Item 33, "Consider typesafe heterogeneous containers"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O apagamento visto pelas questões da prova: sobrecarga, sobrescrita e o que não compila.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Working with Generics", parte "Understanding Type Erasure"',
    },
  ],
  desafio: {
    titulo: 'Preferências com token de tipo',
    enunciado:
      'Escreva a classe `Preferencias`, um contêiner que guarda um valor por tipo, com `<T> void guardar(Class<T> tipo, T valor)` e `<T> T buscar(Class<T> tipo)`. Por dentro, use um `Map<Class<?>, Object>` e confira o tipo com `tipo.cast(...)` tanto ao guardar quanto ao buscar, para que nem um raw type consiga poluir o mapa. No `main`, guarde `"pt-BR"` como `String`, `14` como `Integer` e um `record Tema(String nome)` com `"escuro"`; leia os três sem cast, busque um `Double` ausente e tente guardar `"quinze"` passando `Integer.class` por uma variável raw `Class`. A saída deve ser:\n\n```text\npt-BR 16 escuro\nnull\nrecusado: Cannot cast java.lang.String to java.lang.Integer\n```',
    dicas: [
      '`Class<T>.cast(Object)` devolve o objeto como `T` ou lança `ClassCastException`; com `null`, devolve `null`.',
      'A chave do mapa é o próprio `Class`, como `String.class`.',
      'A variável raw `Class cru = Integer.class` desliga a verificação do compilador; só o `cast` na execução segura o erro.',
    ],
    solucao: `import java.util.HashMap;
import java.util.Map;

public class Preferencias {
    private final Map<Class<?>, Object> valores = new HashMap<>();

    <T> void guardar(Class<T> tipo, T valor) {
        valores.put(tipo, tipo.cast(valor));
    }

    <T> T buscar(Class<T> tipo) {
        return tipo.cast(valores.get(tipo));
    }

    record Tema(String nome) { }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public static void main(String[] args) {
        Preferencias p = new Preferencias();
        p.guardar(String.class, "pt-BR");
        p.guardar(Integer.class, 14);
        p.guardar(Tema.class, new Tema("escuro"));

        String idioma = p.buscar(String.class);
        int fonte = p.buscar(Integer.class);
        Tema tema = p.buscar(Tema.class);
        System.out.println(idioma + " " + (fonte + 2) + " " + tema.nome());
        System.out.println(p.buscar(Double.class));

        try {
            Class cru = Integer.class;
            p.guardar(cru, "quinze");
        } catch (ClassCastException e) {
            System.out.println("recusado: " + e.getMessage());
        }
    }
}`,
    saida: 'pt-BR 16 escuro\nnull\nrecusado: Cannot cast java.lang.String to java.lang.Integer',
    comentarios:
      'O apagamento tira o `T` da execução, então o contêiner recebe o tipo como valor, o objeto `Class<T>`. É o padrão que Joshua Bloch chama de contêiner heterogêneo seguro. O `tipo.cast` em `guardar` é a defesa contra a poluição do heap: sem ele, a `String` entraria no mapa e só falharia mais tarde, quando alguém lesse um `Integer`. Com ele, a falha acontece no ponto exato do erro.',
  },
  exercicios: [
    {
      id: 'pleno-t2-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass());
    }
}`,
      opcoes: ['`true`', '`false`', 'Não compila: os tipos são incomparáveis', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Depois do apagamento, só existe a classe `ArrayList`. `getClass()` devolve `Class<? extends ArrayList>` nos dois casos, então a comparação compila.',
    },
    {
      id: 'pleno-t2-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Relatorio {
    int total(List<Integer> valores) {
        return valores.size();
    }

    int total(List<Double> valores) {
        return valores.size() * 2;
    }
}`,
      opcoes: [
        'Não compila: os dois métodos têm o mesmo apagamento',
        'Compila: é uma sobrecarga válida',
        'Compila, mas a chamada com `List<Double>` é ambígua',
        'Não compila: falta `static`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Depois do apagamento, os dois viram `total(List)`. O erro aparece no segundo método, que conflita com o primeiro.',
    },
    {
      id: 'pleno-t2-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static class Caixa<T> {
        static int total;
        T item;

        Caixa(T item) {
            this.item = item;
            total++;
        }
    }

    public static void main(String[] args) {
        new Caixa<>("a");
        new Caixa<>(1);
        new Caixa<Double>(2.0);
        System.out.println(Caixa.total);
    }
}`,
      opcoes: ['`3`', '`1`', 'Não compila: classe genérica não pode ter campo `static`', 'Não compila: `Caixa.total` precisa de argumento de tipo'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Há uma única classe `Caixa` e um único campo `total`, compartilhado pelas três parametrizações. Um campo `static int` é permitido; proibido seria `static T`.',
    },
    {
      id: 'pleno-t2-e03-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`Object o = new ArrayList<String>(); boolean b = o instanceof List<?>;`',
        '`List<String> l = new ArrayList<>(); boolean b = l instanceof ArrayList<String>;`',
        '`List<?>[] listas = new List<?>[2];`',
        '`Object o = new ArrayList<String>(); boolean b = o instanceof List<String>;`',
        '`List<String>[] listas = new List<String>[2];`',
        '`Class<?> c = List<String>.class;`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`List<?>` é reificável. `l instanceof ArrayList<String>` é aceito desde o Java 16 porque `l` já é uma lista de `String`. A partir de um `Object`, o `String` não pode ser conferido na execução, e arrays e literais de classe exigem tipos reificáveis.',
    },
    {
      id: 'pleno-t2-e03-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>(List.of("a"));
        List cru = nomes;
        cru.add(2);
        Object o = nomes.get(1);
        System.out.println(o);
        String s = nomes.get(1);
        System.out.println(s);
    }
}`,
      opcoes: [
        'Imprime `2` e depois lança `ClassCastException`',
        'Imprime `2` duas vezes',
        'Lança `ClassCastException` em `cru.add(2)`',
        'Não compila: `nomes` só aceita `String`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ClassCastException', saida: '2' },
      explicacao: 'O raw type deixou um `Integer` entrar. Ler como `Object` não exige cast; ler como `String` dispara o cast inserido pelo compilador.',
    },
    {
      id: 'pleno-t2-e03-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Agenda {
    private List<String>[] porDia;
    private List<?>[] rascunho = new List<?>[7];

    Agenda() {
        porDia = new List<String>[7];
    }
}`,
      resposta: 8,
      explicacao: 'Declarar uma variável `List<String>[]` é permitido; criar o array não. `new List<?>[7]` compila porque `List<?>` é reificável.',
    },
    {
      id: 'pleno-t2-e03-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    record Nome(String valor) implements Comparable<Nome> {
        public int compareTo(Nome o) {
            return valor.compareTo(o.valor);
        }
    }

    public static void main(String[] args) {
        Comparable c = new Nome("Ana");
        System.out.println(c.compareTo(new Nome("Bia")) < 0);
        System.out.println(c.compareTo("Bia"));
    }
}`,
      opcoes: [
        'Imprime `true` e depois lança `ClassCastException`',
        'Imprime `true` e `-1`',
        'Não compila: `compareTo` só aceita `Nome`',
        'Imprime `true` e `0`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ClassCastException', saida: 'true' },
      explicacao: 'Pelo raw `Comparable`, a chamada vai para o método-ponte `compareTo(Object)`, que faz o cast para `Nome` antes de delegar. Com uma `String`, o cast falha.',
    },
    {
      id: 'pleno-t2-e03-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o token de tipo. O programa deve imprimir `ko`.',
      codigo: `public class Fabrica {
    static <T> T criar(Class<T> tipo) throws ReflectiveOperationException {
        return tipo.getDeclaredConstructor().newInstance();
    }

    public static void main(String[] args) throws ReflectiveOperationException {
        StringBuilder sb = criar(___);
        sb.append("ok");
        System.out.println(sb.reverse());
    }
}`,
      respostas: ['StringBuilder.class'],
      saida: 'ko',
      explicacao: 'Como `T` não existe na execução, o método recebe o tipo como valor, o objeto `Class<T>`, e cria a instância por reflexão.',
    },
    {
      id: 'pleno-t2-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Depois do apagamento, qual é o tipo do campo `valor` em `class Medida<N extends Number> { N valor; }`?',
      opcoes: ['`Number`', '`Object`', '`N`', '`Integer`'],
      resposta: 0,
      explicacao: 'O parâmetro de tipo é substituído pelo seu primeiro limite. Sem limite, seria `Object`.',
    },
    {
      id: 'pleno-t2-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    static class Base {
        void processar(List<String> itens) { }
    }

    static class Derivada extends Base {
        void processar(List<Integer> itens) { }
    }
}`,
      opcoes: [
        'Não compila: os métodos têm o mesmo apagamento, mas um não sobrescreve o outro',
        'Compila: `Derivada` sobrecarrega `processar`',
        'Compila: `Derivada` sobrescreve `processar`',
        'Compila com aviso de `unchecked`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'Para sobrescrever, os parâmetros precisariam ser iguais; para sobrecarregar, os apagamentos precisariam ser diferentes. Nenhuma das duas condições vale.',
    },
    {
      id: 'pleno-t2-e03-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destes tipos são reificáveis? Escolha três.',
      opcoes: ['`String`', '`List<?>`', '`int[]`', '`List<String>`', '`Map<String, ?>`'],
      respostas: [0, 1, 2],
      explicacao: 'Reificáveis são os tipos que existem por inteiro na execução: classes não genéricas, primitivos, raw types, parametrizações só com `?` e arrays deles. `Map<String, ?>` ainda depende de `String`, que foi apagado.',
    },
    {
      id: 'pleno-t2-e03-q12',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> seguros = Collections.checkedList(new ArrayList<>(), String.class);
        List cru = seguros;
        try {
            cru.add(1);
        } catch (ClassCastException e) {
            System.out.print("barrado ");
        }
        cru.add("ok");
        System.out.println(seguros);
    }
}`,
      resposta: 'barrado [ok]',
      explicacao: 'A lista de `checkedList` confere o tipo a cada inserção, na execução. O `Integer` é recusado no próprio `add`, e só o texto entra.',
    },
    {
      id: 'pleno-t2-e03-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static class Textos extends ArrayList<String> { }

    public static void main(String[] args) {
        String a = new Textos().getClass().getGenericSuperclass().getTypeName();
        Object b = new ArrayList<String>().getClass().getTypeParameters()[0];
        System.out.println(a + " " + b);
    }
}`,
      opcoes: [
        '`java.util.ArrayList<java.lang.String> E`',
        '`java.util.ArrayList<java.lang.String> java.lang.String`',
        '`java.util.ArrayList E`',
        '`java.util.ArrayList java.lang.Object`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A declaração `extends ArrayList<String>` fica gravada no `.class` e a reflexão a lê. Já o objeto `ArrayList<String>` não guarda o argumento: a classe só conhece o parâmetro declarado, `E`.',
    },
    {
      id: 'pleno-t2-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Buffer<T> {
    private T[] itens;

    Buffer(int tamanho) {
        itens = new T[tamanho];
    }
}`,
      opcoes: [
        'Não compila: não é possível criar um array de `T`',
        'Compila',
        'Não compila: campos não podem ter o tipo `T[]`',
        'Compila com aviso de `unchecked`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'O array precisa saber o tipo dos elementos na execução, e `T` foi apagado. A declaração do campo `T[]` é válida; a saída comum é `(T[]) new Object[tamanho]`, com aviso de `unchecked`.',
    },
    {
      id: 'pleno-t2-e03-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que o Java implementou generics com apagamento de tipos?',
      opcoes: [
        'Para que bibliotecas e programas anteriores ao Java 5 continuassem funcionando junto do código genérico',
        'Porque a JVM não tem memória suficiente para guardar argumentos de tipo',
        'Para permitir `new T()` e arrays genéricos',
        'Porque generics só existem em tempo de execução',
      ],
      resposta: 0,
      explicacao: 'Com o apagamento, uma biblioteca podia adotar generics sem quebrar os binários de quem a usava. O preço são as restrições sobre `T` na execução.',
    },
  ],
};

export default episodio;
