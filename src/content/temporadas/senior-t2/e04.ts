import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t2-e04',
  minutos: 17,
  aula,
  armadilhas: [
    'Remover de uma `ArrayList` dentro de um for-each lança, em geral, `ConcurrentModificationException`, mesmo com uma thread só.',
    '`Collections.synchronizedList` não torna operações compostas atômicas, e iterar exige `synchronized` manual.',
    '`ConcurrentHashMap` não aceita `null` como chave nem como valor: lança `NullPointerException`.',
    'O iterador de `CopyOnWriteArrayList` não vê alterações feitas depois de criado, e nunca lança `ConcurrentModificationException`.',
    'Em `BlockingQueue`, `offer` e `poll` não esperam; `put` e `take` esperam e declaram `InterruptedException`.',
    '`ArrayBlockingQueue` não tem construtor sem argumentos: a capacidade é obrigatória.',
    '`CountDownLatch` não pode ser reiniciado; `CyclicBarrier` se rearma a cada rodada.',
    'Um `countDown()` extra não deixa a contagem negativa: ela para em zero.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Concurrent Collections',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/collections.html',
      tipo: 'documentacao',
      porque: 'As interfaces `BlockingQueue`, `ConcurrentMap` e `ConcurrentNavigableMap` e o papel de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc do pacote java.util.concurrent',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/package-summary.html',
      tipo: 'documentacao',
      porque: 'O resumo oficial de coleções concorrentes, sincronizadores e das garantias de visibilidade de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.ConcurrentHashMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html',
      tipo: 'documentacao',
      porque: 'Operações atômicas, iteradores fracamente consistentes e as operações em massa com paralelismo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.BlockingQueue',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/BlockingQueue.html',
      tipo: 'documentacao',
      porque: 'A tabela oficial das quatro formas de inserir e remover, e um exemplo de produtor e consumidor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to ConcurrentMap',
      url: 'https://www.baeldung.com/java-concurrent-map',
      tipo: 'artigo',
      porque: '`ConcurrentHashMap` comparado a `Hashtable` e ao mapa sincronizado, com medições.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to CopyOnWriteArrayList',
      url: 'https://www.baeldung.com/java-copy-on-write-arraylist',
      tipo: 'artigo',
      porque: 'Como o iterador sobre um retrato funciona e quando a cópia compensa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to CountDownLatch in Java',
      url: 'https://www.baeldung.com/java-countdown-latch',
      tipo: 'artigo',
      porque: 'Esperar trabalhadores terminarem e fazer threads largarem juntas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: CyclicBarrier in Java',
      url: 'https://www.baeldung.com/java-cyclic-barrier',
      tipo: 'artigo',
      porque: 'A barreira reutilizável e a ação que roda quando todos chegam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Semaphores in Java',
      url: 'https://www.baeldung.com/java-semaphore',
      tipo: 'artigo',
      porque: 'Limitar o acesso a um recurso com permissões.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Threads pt 07, Sincronismo de thread pt 03, Classes thread safe',
      url: 'https://www.youtube.com/watch?v=WN2bb0RsMyM',
      tipo: 'video',
      porque: 'Por que coleções comuns quebram com várias threads, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Concorrência pt 05, CopyOnWriteArrayList',
      url: 'https://www.youtube.com/watch?v=6rCcB4EVkm4',
      tipo: 'video',
      porque: 'A lista que copia a cada escrita, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Concorrência pt 06, ArrayBlockingQueue',
      url: 'https://www.youtube.com/watch?v=MkZjut9L6W8',
      tipo: 'video',
      porque: 'Produtor e consumidor com uma fila bloqueante, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Concurrency in Practice (Brian Goetz e outros)',
      url: 'https://jcip.net/',
      tipo: 'livro',
      porque: 'Coleções concorrentes, filas bloqueantes e sincronizadores como blocos de construção.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Building Blocks": seções 5.2, "Concurrent collections", 5.3, "Blocking queues and the producer-consumer pattern", e 5.5, "Synchronizers"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As coleções concorrentes e os wrappers sincronizados como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Concurrency": seção "Using Concurrent Collections"',
    },
  ],
  desafio: {
    titulo: 'Contagem de palavras em paralelo',
    enunciado:
      'Conte as palavras de seis linhas usando três threads, cada uma responsável por duas linhas consecutivas. As linhas são: `o rato roeu a roupa`, `do rei de roma`, `a rainha de roma`, `o rei e a rainha`, `a roupa do rei` e `roma e o rato`. Acumule a contagem num `ConcurrentHashMap` e use um `CountDownLatch`, e não `join`, para o `main` esperar os trabalhadores. Imprima as quatro palavras mais frequentes, da mais para a menos frequente e, no empate, em ordem alfabética, e o total de palavras distintas. A saída deve ser:\n\n```text\na: 4\no: 3\nrei: 3\nroma: 3\npalavras distintas: 11\n```',
    dicas: [
      '`merge(palavra, 1, Integer::sum)` cria a entrada ou soma 1, numa operação atômica.',
      'Cada trabalhador chama `countDown()` ao terminar; o `main` chama `await()`.',
      'Para ordenar, copie as entradas para uma lista e use `Map.Entry.comparingByValue().reversed()` seguido de `thenComparing(Map.Entry.comparingByKey())`.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;

public class Palavras {
    public static void main(String[] args) throws InterruptedException {
        List<String> linhas = List.of(
            "o rato roeu a roupa",
            "do rei de roma",
            "a rainha de roma",
            "o rei e a rainha",
            "a roupa do rei",
            "roma e o rato");
        Map<String, Integer> contagem = new ConcurrentHashMap<>();
        int trabalhadores = 3;
        CountDownLatch terminaram = new CountDownLatch(trabalhadores);
        for (int t = 0; t < trabalhadores; t++) {
            int inicio = t * 2;
            new Thread(() -> {
                for (String linha : linhas.subList(inicio, inicio + 2)) {
                    for (String palavra : linha.split(" ")) {
                        contagem.merge(palavra, 1, Integer::sum);
                    }
                }
                terminaram.countDown();
            }).start();
        }
        terminaram.await();
        List<Map.Entry<String, Integer>> ranking = new ArrayList<>(contagem.entrySet());
        ranking.sort(Map.Entry.<String, Integer>comparingByValue().reversed().thenComparing(Map.Entry.comparingByKey()));
        for (Map.Entry<String, Integer> e : ranking.subList(0, 4)) {
            System.out.println(e.getKey() + ": " + e.getValue());
        }
        System.out.println("palavras distintas: " + contagem.size());
    }
}`,
    saida: 'a: 4\no: 3\nrei: 3\nroma: 3\npalavras distintas: 11',
    comentarios:
      'O `merge` resolve num passo o "ler, somar e gravar" que, num `HashMap`, perderia contagens. O `CountDownLatch` faz o papel do `join` sem precisar das referências às threads, e também garante a visibilidade: o que cada trabalhador gravou antes do `countDown` é visto pelo `main` depois do `await`. Na ordenação, `comparingByValue()` precisa do tipo explícito `Map.Entry.<String, Integer>`, porque a chamada a `reversed()` em seguida impede o compilador de inferi-lo.',
  },
  exercicios: [
    {
      id: 'senior-t2-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>(List.of("ana", "bia", "caio"));
        System.out.println("antes");
        for (String n : nomes) {
            if (n.startsWith("a")) {
                nomes.remove(n);
            }
        }
        System.out.println(nomes);
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `ConcurrentModificationException`',
        'Imprime `antes` e `[bia, caio]`',
        'Imprime `antes` e `[ana, bia, caio]`',
        'Não compila: não se pode alterar a lista dentro do for-each',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ConcurrentModificationException', saida: 'antes' },
      explicacao: 'A remoção acontece, mas o próximo `next()` do iterador percebe que a lista mudou e lança a exceção, mesmo sem nenhuma outra thread.',
    },
    {
      id: 'senior-t2-e04-q02',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>(List.of("ana", "bia", "caio"));
        for (String n : nomes) {
            if (n.startsWith("b")) {
                nomes.remove(n);
            }
        }
        System.out.println(nomes);
    }
}`,
      opcoes: ['`[ana, caio]`', 'Lança `ConcurrentModificationException`', '`[ana, bia, caio]`', '`[caio]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Remover o penúltimo elemento deixa a lista com 2 itens quando o iterador já está na posição 2. O `hasNext()` devolve `false`, o laço acaba, e a conferência que lançaria a exceção nunca acontece. Por isso a exceção é dita "de melhor esforço".',
    },
    {
      id: 'senior-t2-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

public class Teste {
    public static void main(String[] args) {
        List<String> lista = new CopyOnWriteArrayList<>(List.of("a", "b"));
        for (String s : lista) {
            lista.add(s.toUpperCase());
        }
        System.out.println(lista);
    }
}`,
      opcoes: ['`[a, b, A, B]`', 'Lança `ConcurrentModificationException`', 'O laço nunca termina', '`[a, b]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O iterador percorre o array que existia quando começou, com dois elementos. As adições criam arrays novos, que o iterador não vê.',
    },
    {
      id: 'senior-t2-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class Teste {
    public static void main(String[] args) {
        Map<String, String> m = new ConcurrentHashMap<>();
        m.put("a", "1");
        System.out.println(m.get("x"));
        m.put("b", null);
        System.out.println(m.size());
    }
}`,
      opcoes: [
        'Imprime `null` e lança `NullPointerException`',
        'Imprime `null` e `2`',
        'Lança `NullPointerException` antes de imprimir',
        'Não compila: `put` não aceita `null`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'null' },
      explicacao: '`get` de uma chave inexistente devolve `null`, normalmente. Mas gravar `null` como valor não é permitido num `ConcurrentHashMap`.',
    },
    {
      id: 'senior-t2-e04-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        Map<Character, Integer> m = new ConcurrentHashMap<>();
        Runnable contar = () -> {
            for (char c : "banana".toCharArray()) {
                m.merge(c, 1, Integer::sum);
            }
        };
        Thread t1 = new Thread(contar);
        Thread t2 = new Thread(contar);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(new TreeMap<>(m));
    }
}`,
      resposta: '{a=6, b=2, n=4}',
      explicacao: '"banana" tem três `a`, um `b` e dois `n`, contados por duas threads. Cada `merge` é atômico, e nada se perde.',
    },
    {
      id: 'senior-t2-e04-q06',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais classes podem ser alteradas por várias threads ao mesmo tempo sem sincronização externa? Escolha três.',
      opcoes: ['`ConcurrentHashMap`', '`CopyOnWriteArrayList`', '`ConcurrentLinkedQueue`', '`HashMap`', '`ArrayList`', '`TreeMap`'],
      respostas: [0, 1, 2],
      explicacao: 'As três primeiras são de `java.util.concurrent`. As outras são coleções comuns, que exigem trava ou um wrapper sincronizado.',
    },
    {
      id: 'senior-t2-e04-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método que cria a entrada ou combina o valor atual com o novo, de forma atômica. O programa deve imprimir `3`.',
      codigo: `import java.util.concurrent.ConcurrentHashMap;

public class Votos {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> votos = new ConcurrentHashMap<>();
        for (int i = 0; i < 3; i++) {
            votos.___("java", 1, Integer::sum);
        }
        System.out.println(votos.get("java"));
    }
}`,
      respostas: ['merge'],
      saida: '3',
      explicacao: 'Na primeira chamada, `merge` grava 1. Nas seguintes, aplica `Integer::sum` ao valor atual e ao 1.',
    },
    {
      id: 'senior-t2-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> fila = new ArrayBlockingQueue<>(2);
        System.out.print(fila.offer("a") + " " + fila.offer("b") + " " + fila.offer("c") + " ");
        System.out.println(fila.poll() + " " + fila.poll() + " " + fila.poll(50, TimeUnit.MILLISECONDS));
    }
}`,
      opcoes: ['`true true false a b null`', '`true true true a b c`', 'Lança `IllegalStateException` no terceiro `offer`', '`true true false a b` e espera para sempre'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com capacidade 2, o terceiro `offer` devolve `false` sem esperar. O `poll` com prazo espera 50 ms na fila vazia e devolve `null`.',
    },
    {
      id: 'senior-t2-e04-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        BlockingQueue<String> a = new LinkedBlockingQueue<>();
        BlockingQueue<String> b = new ArrayBlockingQueue<>();
        a.offer("x");
        System.out.println(a.peek());
    }
}`,
      resposta: 6,
      explicacao: 'A `ArrayBlockingQueue` é um array de tamanho fixo e exige a capacidade no construtor. A `LinkedBlockingQueue` aceita ser criada sem limite.',
    },
    {
      id: 'senior-t2-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        BlockingQueue<String> fila = new LinkedBlockingQueue<>();
        fila.offer("a");
        String s = fila.take();
        System.out.println(s);
    }
}`,
      opcoes: [
        'Não compila: `take` declara `InterruptedException`',
        'Compila e imprime `a`',
        'Compila e espera para sempre',
        'Não compila: `offer` devolve `boolean` e o valor é ignorado',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'Os métodos que esperam (`put`, `take` e as versões com prazo) podem ser interrompidos, e declaram a exceção checked. `offer` e `poll` sem prazo não declaram.',
    },
    {
      id: 'senior-t2-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.Semaphore;

public class Teste {
    public static void main(String[] args) {
        Semaphore s = new Semaphore(2);
        System.out.print(s.tryAcquire() + " " + s.tryAcquire() + " " + s.tryAcquire() + " ");
        s.release();
        System.out.println(s.availablePermits());
    }
}`,
      opcoes: ['`true true false 1`', '`true true true 0`', '`true false false 1`', '`true true false 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Há duas permissões: as duas primeiras tentativas conseguem, a terceira falha sem esperar. O `release()` devolve uma.',
    },
    {
      id: 'senior-t2-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.concurrent.CountDownLatch;

public class Teste {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(2);
        latch.countDown();
        latch.countDown();
        latch.countDown();
        latch.await();
        System.out.println("passou " + latch.getCount());
    }
}`,
      opcoes: ['`passou 0`', '`passou -1`', 'Lança `IllegalStateException` no terceiro `countDown`', 'O `await` espera para sempre'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A contagem para em zero; `countDown()` a mais não faz nada. Com a contagem em zero, `await()` retorna na hora.',
    },
    {
      id: 'senior-t2-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Cinco threads executam rodadas de uma simulação e, ao fim de cada rodada, precisam esperar todas as outras antes de começar a próxima. Qual classe se encaixa?',
      opcoes: ['`CyclicBarrier`', '`CountDownLatch`', '`Semaphore`', '`ConcurrentLinkedQueue`'],
      resposta: 0,
      explicacao: 'A barreira junta as cinco a cada rodada e se rearma sozinha. Um `CountDownLatch` serviria uma única vez, porque não pode ser reiniciado.',
    },
    {
      id: 'senior-t2-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma lista criada com `Collections.synchronizedList(new ArrayList<>())` é percorrida por uma thread com for-each enquanto outra adiciona elementos. O que é necessário para a iteração ser segura?',
      opcoes: [
        'Envolver o laço inteiro num `synchronized (lista)`',
        'Nada: todos os métodos da lista já são sincronizados',
        'Declarar a variável da lista como `volatile`',
        'Usar `lista.stream()` em vez do for-each',
      ],
      resposta: 0,
      explicacao: 'Cada método do wrapper é sincronizado, mas a iteração são muitas chamadas. O Javadoc exige que quem itera segure a trava da lista durante todo o laço.',
    },
    {
      id: 'senior-t2-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.concurrent.*;

public class Teste {
    public static void main(String[] args) {
        Set<Integer> numeros = new ConcurrentSkipListSet<>(List.of(30, 10, 20));
        Map<String, Integer> mapa = new ConcurrentSkipListMap<>(Map.of("b", 2, "a", 1));
        System.out.println(numeros + " " + mapa);
    }
}`,
      opcoes: ['`[10, 20, 30] {a=1, b=2}`', '`[30, 10, 20] {b=2, a=1}`', 'A ordem não é garantida', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As coleções *skip list* são as versões concorrentes de `TreeSet` e `TreeMap`: mantêm os elementos ordenados.',
    },
  ],
};

export default episodio;
