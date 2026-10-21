import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t2-e04',
  minutos: 16,
  aula,
  armadilhas: [
    'Generics são invariantes: `List<Number> l = new ArrayList<Integer>();` não compila.',
    'Arrays são covariantes: `Object[] o = new String[1]; o[0] = 1;` compila e lança `ArrayStoreException`.',
    '`List<?>` aceita qualquer lista; `List<Object>` só aceita `List<Object>`.',
    'Em `List<? extends Number>`, nenhum `add` compila, exceto `add(null)`.',
    'Em `List<? super Integer>`, `add` aceita `Integer`, mas `get` devolve `Object`.',
    '`List<? super Number> l = new ArrayList<Integer>();` não compila: `Integer` não é supertipo de `Number`.',
    'Coringa não entra em `new ArrayList<?>()`, em `class Caixa<?>` nem em `implements Comparable<?>`.',
    'Mensagens com `CAP#1` ou `capture of ?` indicam o tipo desconhecido que o compilador inventou para um coringa.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Wildcards',
      url: 'https://dev.java/learn/language/fp/generics/wildcards/',
      tipo: 'documentacao',
      porque: 'Coringas sem limite, com limite superior e inferior, captura e as diretrizes de uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Wildcards and Subtyping',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/subtyping.html',
      tipo: 'documentacao',
      porque: 'O diagrama da hierarquia entre `List<?>`, `List<? extends Number>` e `List<Integer>`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Wildcard Capture and Helper Methods',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/capture.html',
      tipo: 'documentacao',
      porque: 'O erro de `capture of ?` explicado e o método auxiliar que o resolve.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 4.5.1: Type Arguments of Parameterized Types',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5.1',
      tipo: 'documentacao',
      porque: 'A definição de wildcards e a relação de contenção entre argumentos de tipo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 5.1.10: Capture Conversion',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.10',
      tipo: 'documentacao',
      porque: 'Como o compilador transforma cada `?` num tipo novo, o `CAP#1` das mensagens de erro.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java Generics, <?> vs <? extends Object>',
      url: 'https://www.baeldung.com/java-generics-vs-extends-object',
      tipo: 'artigo',
      porque: 'A equivalência entre as duas formas e a única diferença que já existiu entre elas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Generics "capture of ?"',
      url: 'https://www.baeldung.com/java-generics-capture-of',
      tipo: 'artigo',
      porque: 'De onde vem a mensagem `capture of ?` e as formas de contorná-la.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Nada Amin e Ross Tate: Java and Scala\'s Type Systems are Unsound (OOPSLA 2016)',
      url: 'https://github.com/namin/unsound',
      tipo: 'artigo',
      porque: 'O artigo e os exemplos que mostram como wildcards e `null` furam o sistema de tipos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: Generics pt 02, Wildcard pt 01',
      url: 'https://www.youtube.com/watch?v=NfguvWHYbQM',
      tipo: 'video',
      porque: 'Por que arrays e listas genéricas se comportam diferente com herança, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Generics pt 03, Wildcard pt 02',
      url: 'https://www.youtube.com/watch?v=rchsi7CvUBM',
      tipo: 'video',
      porque: '`? extends` e `? super` na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Geekific: Generics and Wildcards in Java, Part 2, Invariance vs Covariance vs Contravariance',
      url: 'https://www.youtube.com/watch?v=FXAUXvPNKi8',
      tipo: 'video',
      porque: 'Os três tipos de variância com diagramas, ligando cada um a um tipo de wildcard.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'O livro de referência sobre generics, escrito por um dos projetistas da versão que entrou no Java 5.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Subtyping and Wildcards": seções "Wildcards with extends", "Wildcards with super", "Arrays" e "Wildcard Capture"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de atribuições e de `add` permitidos com cada tipo de wildcard, no formato da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Working with Generics", parte "Bounding Generic Types"',
    },
  ],
  desafio: {
    titulo: 'Inventário com coringas',
    enunciado:
      'Crie a interface `Produto` (com `nome()` e `preco()`) e os records `Livro` e `Jogo` que a implementam. Escreva três métodos estáticos que funcionem com `List<Livro>`, `List<Jogo>` e `List<Object>` sem sobrecarga: `valorTotal`, que soma os preços; `copiarCaros(origem, destino, minimo)`, que copia para `destino` os produtos com preço maior ou igual ao mínimo; e `imprimir`, que mostra o tamanho e cada item de qualquer lista. Com os livros "Algoritmos" (250.0) e "Java Moderno" (45.0) e os jogos "Xadrez" (80.0) e "Dominó" (15.5), copiando os caros (mínimo 50) para uma `List<Object>`, a saída deve ser:\n\n```text\nlivros: 295.0\njogos: 95.5\n2 itens:\n- Livro[nome=Algoritmos, preco=250.0]\n- Jogo[nome=Xadrez, preco=80.0]\n```',
    dicas: [
      'Quem só lê produtos de uma lista pode recebê-la como `List<? extends Produto>`.',
      'Quem coloca produtos numa lista precisa de `List<? super Produto>`, que aceita `List<Produto>` e `List<Object>`.',
      'Para imprimir qualquer lista, basta `List<?>` e ler os elementos como `Object`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Inventario {
    interface Produto {
        String nome();
        double preco();
    }

    record Livro(String nome, double preco) implements Produto { }

    record Jogo(String nome, double preco) implements Produto { }

    static double valorTotal(List<? extends Produto> itens) {
        double total = 0;
        for (Produto p : itens) {
            total += p.preco();
        }
        return total;
    }

    static void copiarCaros(List<? extends Produto> origem, List<? super Produto> destino, double minimo) {
        for (Produto p : origem) {
            if (p.preco() >= minimo) {
                destino.add(p);
            }
        }
    }

    static void imprimir(List<?> lista) {
        System.out.println(lista.size() + " itens:");
        for (Object item : lista) {
            System.out.println("- " + item);
        }
    }

    public static void main(String[] args) {
        List<Livro> livros = List.of(new Livro("Algoritmos", 250.0), new Livro("Java Moderno", 45.0));
        List<Jogo> jogos = List.of(new Jogo("Xadrez", 80.0), new Jogo("Dominó", 15.5));
        System.out.println("livros: " + valorTotal(livros));
        System.out.println("jogos: " + valorTotal(jogos));

        List<Object> caros = new ArrayList<>();
        copiarCaros(livros, caros, 50);
        copiarCaros(jogos, caros, 50);
        imprimir(caros);
    }
}`,
    saida: 'livros: 295.0\njogos: 95.5\n2 itens:\n- Livro[nome=Algoritmos, preco=250.0]\n- Jogo[nome=Xadrez, preco=80.0]',
    comentarios:
      'Com `List<Produto>` nos parâmetros, nenhuma chamada do `main` compilaria, porque `List<Livro>` não é `List<Produto>`. A origem de `copiarCaros` só é lida, então usa `extends`; o destino só recebe, então usa `super`. Essa divisão entre quem produz e quem consome tem nome, PECS, e é o assunto do próximo episódio.',
  },
  exercicios: [
    {
      id: 'pleno-t2-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> inteiros = new ArrayList<>();
        List<Number> numeros = inteiros;
        numeros.add(1);
    }
}`,
      opcoes: [
        'Não compila: `List<Integer>` não é uma `List<Number>`',
        'Compila',
        'Compila, mas lança `ClassCastException`',
        'Não compila: `add(1)` precisa de um `Number`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Tipos genéricos são invariantes. Se a atribuição fosse aceita, `numeros.add(2.5)` colocaria um `Double` numa lista de inteiros.',
    },
    {
      id: 'pleno-t2-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Object[] objetos = new String[2];
        objetos[0] = "a";
        try {
            objetos[1] = 1;
        } catch (ArrayStoreException e) {
            System.out.print("ASE ");
        }
        System.out.println(objetos[0] + "" + objetos[1]);
    }
}`,
      opcoes: ['`ASE anull`', '`a1`', 'Não compila: `Object[]` não aceita um `String[]`', '`ASE a1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Arrays são covariantes, então a atribuição compila, mas o array lembra que é de `String` e recusa o `Integer` na execução. A posição 1 continua `null`.',
    },
    {
      id: 'pleno-t2-e04-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais atribuições compilam? Escolha três.',
      opcoes: [
        '`List<? extends Number> a = new ArrayList<Integer>();`',
        '`List<? super Integer> b = new ArrayList<Object>();`',
        '`List<?> c = new ArrayList<String>();`',
        '`List<? super Number> d = new ArrayList<Integer>();`',
        '`List<Object> e = new ArrayList<String>();`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: '`Integer` estende `Number`; `Object` é supertipo de `Integer`; `?` aceita qualquer coisa. Mas `Integer` não é supertipo de `Number`, e `List<Object>` é invariante.',
    },
    {
      id: 'pleno-t2-e04-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    static double total(List<? extends Number> valores) {
        double soma = 0;
        for (Number n : valores) {
            soma += n.doubleValue();
        }
        valores.add(null);
        valores.add(0);
        return soma;
    }
}`,
      resposta: 10,
      explicacao: 'Com `? extends Number`, a lista pode ser de qualquer subtipo, então o compilador não aceita nenhum valor, nem um `Integer`. Só `null` entra, porque pertence a todo tipo.',
    },
    {
      id: 'pleno-t2-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static void preencher(List<? super Integer> lista) {
        lista.add(1);
        lista.add(2);
    }

    public static void main(String[] args) {
        List<Number> numeros = new ArrayList<>(List.of(0.5));
        preencher(numeros);
        List<Object> coisas = new ArrayList<>();
        preencher(coisas);
        System.out.println(numeros + " " + coisas.size());
    }
}`,
      opcoes: [
        '`[0.5, 1, 2] 2`',
        'Não compila: `List<Number>` não é `List<? super Integer>`',
        '`[1, 2] 2`',
        'Não compila: `List<Object>` não é `List<? super Integer>`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Number` e `Object` são supertipos de `Integer`, então as duas listas são aceitas, e qualquer `Integer` cabe nelas.',
    },
    {
      id: 'pleno-t2-e04-q06',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`List<? super java.io.IOException> l = new ArrayList<Exception>(); l.add(new java.io.IOException());`',
        '`List<? super java.io.IOException> l = new ArrayList<Exception>(); l.add(new java.io.FileNotFoundException());`',
        '`List<? super java.io.IOException> l = new ArrayList<Exception>(); Object o = l;`',
        '`List<? super java.io.IOException> l = new ArrayList<Exception>(); l.add(new Exception());`',
        '`List<? super java.io.IOException> l = new ArrayList<Exception>(); Exception e = l.get(0);`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'A lista pode ser de `IOException`, então só entram `IOException` e subclasses, como `FileNotFoundException`. Uma `Exception` genérica não cabe nesse pior caso, e a leitura só garante `Object`.',
    },
    {
      id: 'pleno-t2-e04-q07',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    static String descrever(List<?> lista) {
        return lista.size() + ":" + lista.get(0);
    }

    public static void main(String[] args) {
        System.out.println(descrever(List.of("a", "b")) + " " + descrever(List.of(3)) + " " + descrever(Arrays.asList(null, 1)));
    }
}`,
      resposta: '2:a 1:3 2:null',
      explicacao: '`List<?>` aceita listas de qualquer tipo e lê os elementos como `Object`. `Arrays.asList` aceita `null`, ao contrário de `List.of`.',
    },
    {
      id: 'pleno-t2-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    static void imprimir(List<Object> itens) {
        for (Object o : itens) {
            System.out.println(o);
        }
    }

    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia");
        imprimir(nomes);
    }
}`,
      opcoes: [
        'Não compila: `List<String>` não pode ser passada como `List<Object>`',
        'Compila e imprime os dois nomes',
        'Compila com aviso de `unchecked`',
        'Não compila: `List.of` devolve uma lista imutável',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 12 },
      explicacao: '`List<Object>` é invariante. Com `List<?>` no parâmetro, a chamada compilaria.',
    },
    {
      id: 'pleno-t2-e04-q09',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o tipo do parâmetro com um wildcard. O programa deve imprimir `3.0 1.5`.',
      codigo: `import java.util.List;

public class Somas {
    static double soma(List<___> numeros) {
        double total = 0;
        for (Number n : numeros) {
            total += n.doubleValue();
        }
        return total;
    }

    public static void main(String[] args) {
        List<Integer> inteiros = List.of(1, 2);
        List<Double> decimais = List.of(1.5);
        System.out.println(soma(inteiros) + " " + soma(decimais));
    }
}`,
      respostas: ['? extends Number'],
      saida: '3.0 1.5',
      explicacao: 'O método só lê os elementos como `Number`, e precisa aceitar listas de subtipos. É o caso do limite superior.',
    },
    {
      id: 'pleno-t2-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<?> qualquer = new ArrayList<?>();
        System.out.println(qualquer.size());
    }
}`,
      opcoes: [
        'Não compila: o wildcard não pode ser usado ao criar o objeto',
        'Compila e imprime `0`',
        'Compila com aviso e imprime `0`',
        'Não compila: `List<?>` não tem o método `size()`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Para criar o objeto é preciso um tipo concreto. `new ArrayList<>()` funcionaria, deduzindo `Object`.',
    },
    {
      id: 'pleno-t2-e04-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`class A<T> { }`',
        '`List<?> l = new ArrayList<>();`',
        '`Map<String, ?> m = new HashMap<String, Integer>();`',
        '`List<?> l = new ArrayList<?>();`',
        '`class B<?> { }`',
        '`class C implements Comparable<?> { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O wildcard só aparece no uso de um tipo, em variáveis e parâmetros. Não serve para criar objetos, declarar parâmetros de tipo ou nomear um supertipo.',
    },
    {
      id: 'pleno-t2-e04-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static void inverter(List<?> lista) {
        ajudante(lista);
    }

    private static <T> void ajudante(List<T> lista) {
        for (int i = 0, j = lista.size() - 1; i < j; i++, j--) {
            T temp = lista.get(i);
            lista.set(i, lista.get(j));
            lista.set(j, temp);
        }
    }

    public static void main(String[] args) {
        List<Integer> numeros = new ArrayList<>(List.of(1, 2, 3, 4));
        inverter(numeros);
        System.out.println(numeros);
    }
}`,
      opcoes: [
        '`[4, 3, 2, 1]`',
        'Não compila: uma `List<?>` não pode ser passada para `List<T>`',
        '`[1, 2, 3, 4]`',
        'Lança `UnsupportedOperationException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Ao chamar `ajudante`, o compilador captura o `?` num `T` com nome. Dentro do auxiliar, ler e escrever o mesmo `T` é permitido. A lista é um `ArrayList`, que aceita `set`.',
    },
    {
      id: 'pleno-t2-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dada `List<? super Integer> lista`, qual é o tipo de `lista.get(0)` para o compilador?',
      opcoes: ['`Object`', '`Integer`', '`Number`', 'Nenhum: a lista não pode ser lida'],
      resposta: 0,
      explicacao: 'A lista pode ser de `Integer`, de `Number` ou de `Object`. O único tipo garantido para qualquer elemento é `Object`.',
    },
    {
      id: 'pleno-t2-e04-q14',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<? super Integer> numeros = new ArrayList<Number>();
        numeros.add(1);
        numeros.add(Integer.valueOf(2));
        Object primeiro = numeros.get(0);
        Integer segundo = numeros.get(1);
        System.out.println(primeiro + " " + segundo);
    }
}`,
      resposta: 9,
      explicacao: 'Escrever `Integer` é permitido, mas a leitura devolve `Object`. Seria preciso um cast para guardar o valor num `Integer`.',
    },
    {
      id: 'pleno-t2-e04-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual afirmação sobre `List<?>` e `List<Object>` é verdadeira?',
      opcoes: [
        'Um parâmetro `List<?>` aceita uma `List<String>`; um parâmetro `List<Object>` não',
        'As duas são equivalentes',
        'Em ambas, é possível adicionar qualquer objeto',
        'Um parâmetro `List<Object>` aceita qualquer lista, e `List<?>` só aceita `List<Object>`',
      ],
      resposta: 0,
      explicacao: '`List<?>` representa uma lista de algum tipo desconhecido e aceita qualquer parametrização, mas só permite adicionar `null`. `List<Object>` aceita qualquer objeto no `add`, mas só aceita receber uma `List<Object>`.',
    },
  ],
};

export default episodio;
