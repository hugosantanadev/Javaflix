import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e01',
  minutos: 16,
  aula,
  armadilhas: [
    'Em `List<Integer>`, `remove(1)` remove o índice 1; `remove(Integer.valueOf(1))` remove o valor.',
    '`set(i, e)` devolve o elemento substituído.',
    '`add(i, e)` aceita `i == size()`; acima disso, `IndexOutOfBoundsException`.',
    '`new ArrayList<>(20)` cria uma lista vazia com capacidade 20, não 20 elementos.',
    '`List.of` não aceita `null`, nem em `contains(null)`, e todo método que altera lança `UnsupportedOperationException`.',
    '`Arrays.asList` tem tamanho fixo, mas aceita `set`, aceita `null` e escreve no array original.',
    '`subList` é uma visão: alterá-la altera a lista original.',
    'Remover dentro de um for-each lança `ConcurrentModificationException`; use `Iterator.remove` ou `removeIf`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Getting to Know the Collection Hierarchy',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/organization/',
      tipo: 'documentacao',
      porque: 'O desenho completo das interfaces do framework e o papel de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Extending Collection with List',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/lists/',
      tipo: 'documentacao',
      porque: 'Os métodos com índice, `subList` e os iteradores de lista.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Choosing the Right Implementation Between ArrayList and LinkedList',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/arraylist-vs-linkedlist/',
      tipo: 'documentacao',
      porque: 'A comparação oficial, com o custo real de cada operação e o efeito do cache.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.List',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#unmodifiable',
      tipo: 'documentacao',
      porque: 'As regras das listas imutáveis de `List.of` e `List.copyOf`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.ArrayList',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html',
      tipo: 'documentacao',
      porque: 'Capacidade, crescimento amortizado e o comportamento fail-fast dos iteradores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 269: Convenience Factory Methods for Collections',
      url: 'https://openjdk.org/jeps/269',
      tipo: 'documentacao',
      porque: 'Por que `List.of` rejeita `null` e não promete a classe concreta que devolve.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java ArrayList vs LinkedList',
      url: 'https://www.baeldung.com/java-arraylist-linkedlist',
      tipo: 'artigo',
      porque: 'A diferença de estrutura e de desempenho entre as duas listas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: The Capacity of an ArrayList vs the Size of an Array in Java',
      url: 'https://www.baeldung.com/java-list-capacity-array-size',
      tipo: 'artigo',
      porque: 'Capacidade inicial, tamanho e quando o array interno cresce.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Coleções pt 06, List pt 01',
      url: 'https://www.youtube.com/watch?v=PFuvDDS9_J8',
      tipo: 'video',
      porque: 'Os métodos básicos de `List` e `ArrayList`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Coleções pt 14, Iterator',
      url: 'https://www.youtube.com/watch?v=FlwOWSpYUkA',
      tipo: 'video',
      porque: 'Remover durante a iteração sem `ConcurrentModificationException`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: LinkedList vs ArrayList in Java Tutorial',
      url: 'https://www.youtube.com/watch?v=5dscMs2hnDI',
      tipo: 'video',
      porque: 'Quando cada lista ganha, com medições.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Stuart Marks: Collections Framework Enhancements in JDK 9',
      url: 'https://www.youtube.com/watch?v=nem4QUXepTc',
      tipo: 'video',
      porque: 'O mantenedor das coleções no JDK explica as fábricas `List.of`, `Set.of` e `Map.of`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'Iteradores, a notação O e a comparação detalhada das implementações de `List`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Preliminaries": seções "Iterable and Iterators" e "Efficiency and the O-Notation"; Cap. 15, "Lists"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os métodos comuns de `Collection` e de `List`, as fábricas e as exceções que cada uma lança.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seções "Using Common Collection APIs" e "Using the List Interface"',
    },
  ],
  desafio: {
    titulo: 'Limpando leituras de um sensor',
    enunciado:
      'Escreva `static List<Integer> limpar(List<Integer> leituras, int limite)`, que devolve uma **nova** lista sem os valores negativos, com os valores acima do limite trocados pelo limite e sem repetições consecutivas, deixando a original intacta. Use `removeIf`, `replaceAll` e um `Iterator`. No `main`, limpe `[3, -1, 3, 8, 12, 12, -5, 7, 7, 7, 2]` com limite 10, depois remova da lista limpa o **valor** 10 e em seguida o **primeiro elemento**. A saída deve ser:\n\n```text\noriginal: [3, -1, 3, 8, 12, 12, -5, 7, 7, 7, 2]\nlimpa: [3, 8, 10, 7, 2]\nsem o 10: [3, 8, 7, 2]\nsem o primeiro: [8, 7, 2]\n```',
    dicas: [
      'Copie a entrada com `new ArrayList<>(leituras)`: a original pode até ser imutável.',
      'Para as repetições consecutivas, guarde o último valor mantido e use `it.remove()` quando o atual for igual.',
      'Remover o valor 10 exige `Integer.valueOf(10)`; `remove(0)` remove a posição.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Leituras {
    static List<Integer> limpar(List<Integer> leituras, int limite) {
        List<Integer> resultado = new ArrayList<>(leituras);
        resultado.removeIf(n -> n < 0);
        resultado.replaceAll(n -> Math.min(n, limite));
        Iterator<Integer> it = resultado.iterator();
        Integer anterior = null;
        while (it.hasNext()) {
            Integer atual = it.next();
            if (atual.equals(anterior)) {
                it.remove();
            } else {
                anterior = atual;
            }
        }
        return resultado;
    }

    public static void main(String[] args) {
        List<Integer> leituras = List.of(3, -1, 3, 8, 12, 12, -5, 7, 7, 7, 2);
        List<Integer> limpa = limpar(leituras, 10);
        System.out.println("original: " + leituras);
        System.out.println("limpa: " + limpa);
        limpa.remove(Integer.valueOf(10));
        System.out.println("sem o 10: " + limpa);
        limpa.remove(0);
        System.out.println("sem o primeiro: " + limpa);
    }
}`,
    saida: 'original: [3, -1, 3, 8, 12, 12, -5, 7, 7, 7, 2]\nlimpa: [3, 8, 10, 7, 2]\nsem o 10: [3, 8, 7, 2]\nsem o primeiro: [8, 7, 2]',
    comentarios:
      'A cópia protege quem chamou o método e, de quebra, permite receber um `List.of`, que não aceitaria `removeIf`. A comparação com `equals` evita a armadilha de `==` entre `Integer`, que só funciona por acaso para valores pequenos, guardados em cache. No fim, as duas formas de `remove` mostram a diferença entre valor e posição.',
  },
  exercicios: [
    {
      id: 'pleno-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(3, 1, 2));
        l.remove(1);
        l.remove(Integer.valueOf(3));
        System.out.println(l);
    }
}`,
      opcoes: ['`[2]`', '`[1, 2]`', '`[3]`', '`[2, 3]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`remove(1)` usa a sobrecarga do índice e tira o 1, que está na posição 1. Depois, `remove(Integer.valueOf(3))` tira o valor 3.',
    },
    {
      id: 'pleno-t3-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("x", "y"));
        String a = l.set(0, "z");
        l.add(1, a);
        l.add(l.size(), "w");
        System.out.println(a + l);
    }
}`,
      resposta: 'x[z, x, y, w]',
      explicacao: '`set` devolve o antigo, "x". Ele é inserido na posição 1, e `add(l.size(), ...)` equivale a acrescentar no fim.',
    },
    {
      id: 'pleno-t3-e01-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> letras = List.of("a", "b");
        System.out.println("antes");
        letras.add("c");
        System.out.println(letras);
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `UnsupportedOperationException`',
        'Imprime `antes` e `[a, b, c]`',
        'Não compila: `List.of` devolve uma lista imutável',
        'Imprime `antes` e lança `IllegalStateException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException', saida: 'antes' },
      explicacao: 'O tipo é `List<String>`, que tem `add`, então compila. A lista de `List.of` recusa a alteração na execução.',
    },
    {
      id: 'pleno-t3-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `Arrays.asList(array)` são verdadeiras? Escolha duas.',
      opcoes: [
        '`set` na lista altera também o array original',
        'A lista aceita elementos `null`',
        '`add` na lista aumenta o array original',
        'A lista é uma cópia independente do array',
        '`contains(null)` lança `NullPointerException`',
      ],
      respostas: [0, 1],
      explicacao: 'A lista é uma visão do array, com tamanho fixo: `set` escreve no array, e `add` lança `UnsupportedOperationException`. Quem rejeita `null` é `List.of`.',
    },
    {
      id: 'pleno-t3-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Integer[] arr = {1, 2, 3};
        List<Integer> l = Arrays.asList(arr);
        arr[0] = 9;
        l.set(2, 7);
        System.out.println(l + " " + arr[2]);
    }
}`,
      opcoes: ['`[9, 2, 7] 7`', '`[1, 2, 7] 3`', '`[9, 2, 7] 3`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Lista e array compartilham os mesmos elementos: a mudança no array aparece na lista, e a da lista aparece no array.',
    },
    {
      id: 'pleno-t3-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("a", "b", "c"));
        for (String s : l) {
            System.out.print(s);
            if (s.equals("a")) {
                l.remove(s);
            }
        }
    }
}`,
      opcoes: [
        'Imprime `a` e lança `ConcurrentModificationException`',
        'Imprime `abc`',
        'Imprime `bc`',
        'Imprime `a` e termina normalmente',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ConcurrentModificationException', saida: 'a' },
      explicacao: 'A remoção muda o contador de modificações da lista, e o próximo `next()` do iterador do for-each percebe e lança a exceção.',
    },
    {
      id: 'pleno-t3-e01-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = new ArrayList<>(List.of("a", "b", "c"));
        for (String s : l) {
            System.out.print(s);
            if (s.equals("b")) {
                l.remove(s);
            }
        }
        System.out.println(" " + l);
    }
}`,
      opcoes: [
        '`ab [a, c]`',
        'Imprime `ab` e lança `ConcurrentModificationException`',
        '`abc [a, c]`',
        '`ab [a, b, c]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Ao remover o penúltimo, o tamanho cai para 2, e o cursor do iterador já está em 2. `hasNext()` devolve `false`, o laço acaba sem chamar `next()` e a exceção não acontece. O "c" nem é visitado.',
    },
    {
      id: 'pleno-t3-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que remove todos os elementos que satisfazem a condição. O programa deve imprimir `[Ana, Bia]`.',
      codigo: `import java.util.*;

public class Filtro {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>(List.of("Ana", " ", "Bia", ""));
        nomes.___(n -> n.isBlank());
        System.out.println(nomes);
    }
}`,
      respostas: ['removeIf'],
      saida: '[Ana, Bia]',
      explicacao: '`removeIf` vem de `Collection` e recebe um `Predicate`. Ele remove com segurança, sem `ConcurrentModificationException`.',
    },
    {
      id: 'pleno-t3-e01-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>();
        nomes.add("Ana");
        nomes.add(0, "Bia");
        String primeiro = nomes.get(0);
        boolean trocou = nomes.set(1, "Caio");
        System.out.println(primeiro + trocou);
    }
}`,
      resposta: 9,
      explicacao: '`set` devolve o elemento substituído, do tipo `String`, não um `boolean`. Quem devolve `boolean` é o `add(E)`.',
    },
    {
      id: 'pleno-t3-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(5);
        System.out.print(l.size() + " ");
        l.add(5);
        System.out.println(l.get(0));
    }
}`,
      opcoes: ['`0 5`', '`5 5`', '`1 5`', 'Lança `IndexOutOfBoundsException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O argumento do construtor é a capacidade inicial do array interno, não o tamanho. A lista nasce vazia.',
    },
    {
      id: 'pleno-t3-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> a = Arrays.asList(1, null);
        System.out.println(a.contains(null));
        List<Integer> b = List.of(1, 2);
        System.out.println(b.contains(null));
    }
}`,
      opcoes: [
        'Imprime `true` e lança `NullPointerException`',
        'Imprime `true` e `false`',
        'Lança `NullPointerException` na primeira linha',
        'Imprime `false` e `false`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'true' },
      explicacao: '`Arrays.asList` aceita `null`. As coleções de `List.of` rejeitam `null` até em consultas, como `contains` e `indexOf`.',
    },
    {
      id: 'pleno-t3-e01-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`ArrayList.get(i)` executa em tempo constante',
        '`LinkedList` implementa `List` e `Deque`',
        '`LinkedList.get(i)` executa em tempo constante',
        '`ArrayList` não aceita elementos `null`',
        '`new ArrayList<>(10)` cria uma lista com 10 elementos `null`',
      ],
      respostas: [0, 1],
      explicacao: 'O `ArrayList` calcula o endereço da posição no array; a `LinkedList` precisa percorrer os nós. As duas aceitam `null`, e a capacidade inicial não cria elementos.',
    },
    {
      id: 'pleno-t3-e01-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>(List.of(1, 2, 3, 4, 5));
        List<Integer> meio = l.subList(1, 4);
        meio.set(0, 20);
        meio.remove(Integer.valueOf(3));
        System.out.println(l + " " + meio);
    }
}`,
      opcoes: [
        '`[1, 20, 4, 5] [20, 4]`',
        '`[1, 2, 3, 4, 5] [20, 4]`',
        '`[1, 20, 3, 4, 5] [20, 4]`',
        'Lança `UnsupportedOperationException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`subList(1, 4)` é uma visão das posições 1 a 3 da lista original. Trocar e remover pela visão muda a original.',
    },
    {
      id: 'pleno-t3-e01-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> l = List.of("a", "b", "a", "c");
        System.out.println(l.indexOf("a") + "" + l.lastIndexOf("a") + l.indexOf("z") + l.contains("c"));
    }
}`,
      resposta: '02-1true',
      explicacao: 'A primeira ocorrência de "a" está em 0, a última em 2, e um valor ausente devolve `-1`. O `""` transforma o resto em concatenação.',
    },
    {
      id: 'pleno-t3-e01-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> a = new ArrayList<>();
        List<String> b = new List<>();
        System.out.println(a.equals(b));
    }
}`,
      opcoes: [
        'Não compila: `List` é uma interface e não pode ser instanciada',
        'Compila e imprime `true`',
        'Compila e imprime `false`',
        'Não compila: falta o tipo no diamante',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: '`List` define o contrato; para criar o objeto é preciso uma classe concreta, como `ArrayList` ou `LinkedList`.',
    },
  ],
};

export default episodio;
