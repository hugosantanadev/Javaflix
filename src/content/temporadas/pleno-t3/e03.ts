import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t3-e03',
  minutos: 16,
  aula,
  armadilhas: [
    '`put` devolve o valor anterior, ou `null` se a chave era nova.',
    '`get` devolvendo `null` não prova que a chave não existe: o valor pode ser `null`. Use `containsKey`.',
    '`getOrDefault` só usa o padrão se a chave **não existe**; com valor `null` guardado, devolve `null`.',
    '`putIfAbsent`, `computeIfAbsent` e `merge` tratam um valor `null` como ausência.',
    'Se a função de `compute`, `computeIfPresent` ou `merge` devolver `null`, a chave é removida.',
    '`TreeMap` não aceita chave `null`; `HashMap` aceita uma.',
    '`Map.of` vai até 10 pares, rejeita `null` e lança `IllegalArgumentException` com chave repetida.',
    '`Map` não estende `Collection` e não tem `add`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Using Maps to Store Key Value Pairs',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/maps/',
      tipo: 'documentacao',
      porque: 'As implementações de `Map`, as fábricas e as visões de chaves, valores e pares.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Managing the Content of a Map',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/working-with-keys-and-values/',
      tipo: 'documentacao',
      porque: '`getOrDefault`, `putIfAbsent`, `replace` e `remove` com valor, cada um com seu caso de uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Handling Map Values with Lambda Expressions',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/maps-and-lambdas/',
      tipo: 'documentacao',
      porque: '`compute`, `computeIfAbsent`, `computeIfPresent` e `merge`, com a regra do `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Keeping Keys Sorted with SortedMap and NavigableMap',
      url: 'https://dev.java/learn/api/collections-and-streams/collections-framework/sorted-maps/',
      tipo: 'documentacao',
      porque: 'Os métodos de navegação do `TreeMap` e as visões de faixas de chaves.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.HashMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html',
      tipo: 'documentacao',
      porque: 'Capacidade, fator de carga e o custo de iterar um mapa grande.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 180: Handle Frequent HashMap Collisions with Balanced Trees',
      url: 'https://openjdk.org/jeps/180',
      tipo: 'documentacao',
      porque: 'Por que o Java 8 passou a transformar compartimentos longos em árvores.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: The Java HashMap Under the Hood',
      url: 'https://www.baeldung.com/java-hashmap-advanced',
      tipo: 'artigo',
      porque: 'Compartimentos, colisões, redimensionamento e o papel de `hashCode` e `equals`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java TreeMap vs HashMap',
      url: 'https://www.baeldung.com/java-treemap-vs-hashmap',
      tipo: 'artigo',
      porque: 'Ordem, `null` e desempenho das duas implementações, lado a lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Coleções pt 18, Map, HashMap, LinkedHashMap pt 01',
      url: 'https://www.youtube.com/watch?v=kkHyYrfB35s',
      tipo: 'video',
      porque: 'Os primeiros passos com mapas e a diferença entre `HashMap` e `LinkedHashMap`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Coleções pt 21, NavigableMap, TreeMap',
      url: 'https://www.youtube.com/watch?v=2EKe7UJLuCQ',
      tipo: 'video',
      porque: 'O `TreeMap` e os métodos de navegação, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Map and HashMap in Java, Full Tutorial',
      url: 'https://www.youtube.com/watch?v=H62Jfv1DJlU',
      tipo: 'video',
      porque: 'Os métodos essenciais de `Map` e como iterar pelas entradas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Generics and Collections (Maurice Naftalin e Philip Wadler)',
      url: 'https://www.oreilly.com/library/view/java-generics-and/0596527756/',
      tipo: 'livro',
      porque: 'Cada implementação de `Map` por dentro, inclusive `WeakHashMap` e `IdentityHashMap`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 16, "Maps": seções "Using the Methods of Map", "HashMap", "LinkedHashMap", "SortedMap and NavigableMap", "TreeMap" e "Comparing Map Implementations"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de comportamento de `merge` e `computeIfAbsent` com `null`, que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Using the Map Interface"',
    },
  ],
  desafio: {
    titulo: 'Índice de palavras',
    enunciado:
      'Para o texto `"o gato viu o rato e o rato viu o gato"`, monte dois `TreeMap`: um com a frequência de cada palavra, usando `merge`, e outro com as posições (a partir de 0) em que cada palavra aparece, usando `computeIfAbsent`. Depois, descubra a palavra mais frequente percorrendo o `entrySet` (em empate, fica a primeira em ordem alfabética) e a primeira palavra, em ordem alfabética, que vem depois de `"p"`. A saída deve ser:\n\n```text\nfrequência: {e=1, gato=2, o=4, rato=2, viu=2}\nposições: {e=[5], gato=[1, 10], o=[0, 3, 6, 9], rato=[4, 7], viu=[2, 8]}\nmais frequente: o (4)\ndepois de "p": rato\n```',
    dicas: [
      '`merge(palavra, 1, Integer::sum)` insere 1 na primeira vez e soma nas seguintes.',
      '`computeIfAbsent(palavra, k -> new ArrayList<>())` devolve a lista existente ou a nova; encadeie o `.add(i)`.',
      '`ceilingKey("p")` devolve a menor chave maior ou igual a "p".',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Indice {
    public static void main(String[] args) {
        String texto = "o gato viu o rato e o rato viu o gato";
        String[] palavras = texto.split(" ");

        TreeMap<String, Integer> frequencia = new TreeMap<>();
        TreeMap<String, List<Integer>> posicoes = new TreeMap<>();
        for (int i = 0; i < palavras.length; i++) {
            frequencia.merge(palavras[i], 1, Integer::sum);
            posicoes.computeIfAbsent(palavras[i], k -> new ArrayList<>()).add(i);
        }

        String maisFrequente = null;
        for (Map.Entry<String, Integer> e : frequencia.entrySet()) {
            if (maisFrequente == null || e.getValue() > frequencia.get(maisFrequente)) {
                maisFrequente = e.getKey();
            }
        }

        System.out.println("frequência: " + frequencia);
        System.out.println("posições: " + posicoes);
        System.out.println("mais frequente: " + maisFrequente + " (" + frequencia.get(maisFrequente) + ")");
        System.out.println("depois de \\"p\\": " + frequencia.ceilingKey("p"));
    }
}`,
    saida: 'frequência: {e=1, gato=2, o=4, rato=2, viu=2}\nposições: {e=[5], gato=[1, 10], o=[0, 3, 6, 9], rato=[4, 7], viu=[2, 8]}\nmais frequente: o (4)\ndepois de "p": rato',
    comentarios:
      'Os dois métodos modernos eliminam o `if (!mapa.containsKey(...))` que dominava esse tipo de código antes do Java 8. Como o `TreeMap` percorre as chaves em ordem alfabética e só troca de campeão com uma contagem **maior**, o empate fica com a primeira palavra em ordem. E `ceilingKey` mostra a vantagem de um mapa ordenado: responder perguntas de faixa sem percorrer tudo.',
  },
  exercicios: [
    {
      id: 'pleno-t3-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new HashMap<>();
        Integer a = m.put("x", 1);
        Integer b = m.put("x", 2);
        System.out.println(a + " " + b + " " + m.get("x") + " " + m.size());
    }
}`,
      opcoes: ['`null 1 2 1`', '`1 2 2 2`', '`null null 2 1`', '`true true 2 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`put` devolve o valor que estava associado à chave: nada na primeira vez, 1 na segunda. A chave continua uma só.',
    },
    {
      id: 'pleno-t3-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<Character, Integer> contagem = new TreeMap<>();
        for (char c : "banana".toCharArray()) {
            contagem.merge(c, 1, Integer::sum);
        }
        System.out.println(contagem);
    }
}`,
      resposta: '{a=3, b=1, n=2}',
      explicacao: '`merge` insere 1 na primeira ocorrência de cada letra e soma 1 nas seguintes. O `TreeMap` ordena as chaves.',
    },
    {
      id: 'pleno-t3-e03-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new HashMap<>();
        m.put("k", null);
        System.out.println(m.getOrDefault("k", 5) + " " + m.getOrDefault("z", 5) + " " + m.containsKey("k"));
    }
}`,
      opcoes: ['`null 5 true`', '`5 5 true`', '`5 5 false`', '`null 5 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`getOrDefault` só usa o padrão quando a chave não existe. "k" existe, associada a `null`, então o `null` é devolvido.',
    },
    {
      id: 'pleno-t3-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new HashMap<>();
        m.put("k", null);
        Integer r = m.putIfAbsent("k", 1);
        System.out.println(r + " " + m);
    }
}`,
      opcoes: ['`null {k=1}`', '`null {k=null}`', '`1 {k=1}`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para `putIfAbsent`, uma chave associada a `null` conta como ausente. O valor é gravado, e o retorno é o `null` que estava lá.',
    },
    {
      id: 'pleno-t3-e03-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new TreeMap<>(Map.of("a", 1, "b", 2, "c", 3));
        m.merge("a", 5, (x, y) -> null);
        m.computeIfPresent("b", (k, v) -> v > 1 ? null : v);
        m.compute("d", (k, v) -> v == null ? 4 : v);
        m.computeIfAbsent("e", k -> null);
        System.out.println(m);
    }
}`,
      opcoes: ['`{c=3, d=4}`', '`{a=null, b=null, c=3, d=4, e=null}`', '`{a=5, c=3, d=4}`', '`{c=3, d=4, e=null}`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Quando a função de `merge`, `computeIfPresent` ou `compute` devolve `null`, a chave é removida. E `computeIfAbsent` com resultado `null` não insere nada.',
    },
    {
      id: 'pleno-t3-e03-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `TreeMap` são verdadeiras? Escolha duas.',
      opcoes: [
        'Mantém as chaves ordenadas',
        'Lança `NullPointerException` ao receber `null` como chave',
        'Aceita uma única chave `null`',
        '`get` e `put` custam O(1) em média',
        'Estende `HashMap`',
      ],
      respostas: [0, 1],
      explicacao: 'O `TreeMap` é uma árvore rubro-negra ordenada pelas chaves, com operações O(log n). Comparar `null` com a ordem natural é impossível, daí a exceção.',
    },
    {
      id: 'pleno-t3-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println("início");
        Map<String, Integer> notas = Map.of("Ana", 9, "Bia", 8, "Ana", 7);
        System.out.println(notas.size());
    }
}`,
      opcoes: [
        'Imprime `início` e lança `IllegalArgumentException`',
        'Imprime `início` e `2`',
        'Imprime `início` e `3`',
        'Não compila: chave repetida',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: 'início' },
      explicacao: 'Como `Set.of`, `Map.of` trata repetição como erro. Com `put` num `HashMap`, o segundo valor simplesmente substituiria o primeiro.',
    },
    {
      id: 'pleno-t3-e03-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método que insere o valor se a chave é nova ou combina com o valor existente. O programa deve imprimir `{a=2, b=1}`.',
      codigo: `import java.util.*;

public class Contador {
    public static void main(String[] args) {
        Map<String, Integer> contagem = new TreeMap<>();
        for (String s : List.of("a", "b", "a")) {
            contagem.___(s, 1, Integer::sum);
        }
        System.out.println(contagem);
    }
}`,
      respostas: ['merge'],
      saida: '{a=2, b=1}',
      explicacao: '`merge(chave, valor, função)` insere o valor se a chave é nova e, se não, guarda `função(antigo, valor)`.',
    },
    {
      id: 'pleno-t3-e03-q09',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> idades = new HashMap<>();
        idades.put("Ana", 30);
        idades.putIfAbsent("Bia", 25);
        idades.add("Caio", 41);
        System.out.println(idades.size());
    }
}`,
      resposta: 8,
      explicacao: '`Map` não estende `Collection` e não tem `add`. Os pares entram com `put` e suas variações.',
    },
    {
      id: 'pleno-t3-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeMap<Integer, String> t = new TreeMap<>(Map.of(10, "dez", 20, "vinte", 30, "trinta"));
        System.out.println(t.floorKey(25) + " " + t.ceilingEntry(25) + " " + t.headMap(20) + " " + t.tailMap(20, false));
    }
}`,
      opcoes: [
        '`20 30=trinta {10=dez} {30=trinta}`',
        '`20 30 {10=dez, 20=vinte} {20=vinte, 30=trinta}`',
        '`30 20=vinte {10=dez} {30=trinta}`',
        '`20 30=trinta {10=dez, 20=vinte} {30=trinta}`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`floorKey` dá a maior chave até 25; `ceilingEntry` devolve o par, impresso como `chave=valor`. `headMap(20)` exclui o 20, e `tailMap(20, false)` também.',
    },
    {
      id: 'pleno-t3-e03-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, Integer> e) {
                return size() > 3;
            }
        };
        cache.put("a", 1);
        cache.put("b", 2);
        cache.put("c", 3);
        cache.get("a");
        cache.get("b");
        cache.put("d", 4);
        System.out.println(cache);
    }
}`,
      opcoes: ['`{a=1, b=2, d=4}`', '`{b=2, c=3, d=4}`', '`{c=3, a=1, b=2, d=4}`', '`{a=1, b=2, c=3}`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com ordem de acesso, cada `get` leva a entrada para o fim. Depois de ler "a" e "b", a mais antiga é "c", descartada quando "d" faz o mapa passar de 3.',
    },
    {
      id: 'pleno-t3-e03-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<Integer, List<String>> porTamanho = new TreeMap<>();
        for (String p : List.of("sol", "lua", "terra", "mar")) {
            porTamanho.computeIfAbsent(p.length(), k -> new ArrayList<>()).add(p);
        }
        System.out.println(porTamanho);
    }
}`,
      resposta: '{3=[sol, lua, mar], 5=[terra]}',
      explicacao: '`computeIfAbsent` cria a lista só na primeira palavra de cada tamanho e devolve a lista existente nas seguintes.',
    },
    {
      id: 'pleno-t3-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> m = new TreeMap<>(Map.of("a", 1, "b", 2, "c", 3));
        m.values().removeIf(v -> v % 2 == 1);
        for (Map.Entry<String, Integer> e : m.entrySet()) {
            e.setValue(e.getValue() * 10);
        }
        System.out.println(m);
    }
}`,
      opcoes: ['`{b=20}`', '`{a=1, b=20, c=3}`', '`{b=2}`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`values()` e `entrySet()` são visões do mapa: remover pela primeira remove os pares, e `setValue` pela segunda altera o valor guardado.',
    },
    {
      id: 'pleno-t3-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> h = new HashMap<>();
        h.put(null, 0);
        System.out.println(h.get(null));
        Map<String, Integer> t = new TreeMap<>();
        t.put(null, 0);
        System.out.println(t.size());
    }
}`,
      opcoes: [
        'Imprime `0` e lança `NullPointerException`',
        'Imprime `0` e `1`',
        'Lança `NullPointerException` no primeiro `put`',
        'Imprime `null` e `0`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: '0' },
      explicacao: 'O `HashMap` aceita uma chave `null`, tratada à parte. O `TreeMap` precisa comparar a chave, e a ordem natural não compara `null`.',
    },
    {
      id: 'pleno-t3-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece quando um `HashMap` passa do fator de carga padrão, 75% de ocupação?',
      opcoes: [
        'O array de compartimentos dobra de tamanho e as entradas são redistribuídas',
        'As novas entradas passam a ser guardadas numa árvore separada',
        'O mapa lança `IllegalStateException`',
        'As entradas mais antigas são descartadas',
      ],
      resposta: 0,
      explicacao: 'O redimensionamento mantém as listas dos compartimentos curtas. Árvores só aparecem em compartimentos com muitas colisões, e descartar entradas é o comportamento opcional do `LinkedHashMap` com `removeEldestEntry`.',
    },
  ],
};

export default episodio;
