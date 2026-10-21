import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t4-e06',
  minutos: 15,
  aula,
  armadilhas: [
    'BFS usa fila; DFS usa pilha ou recursão.',
    'Só a BFS garante o menor caminho, e só em número de arestas. Com pesos, use Dijkstra.',
    'Sem marcar os visitados, a busca num grafo com ciclo não termina.',
    'Na BFS, marque o vértice ao colocá-lo na fila, não ao retirá-lo.',
    'Matriz de adjacência gasta O(V²) mesmo com poucas arestas; lista de adjacência gasta O(V + E).',
    '`grafo.get(v)` devolve `null` para vértice sem entrada no mapa. Use `getOrDefault(v, List.of())`.',
    'DFS recursiva em grafos muito grandes pode estourar a pilha.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de Map.computeIfAbsent',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html#computeIfAbsent(K,java.util.function.Function)',
      tipo: 'documentacao',
      porque: 'O método que monta listas de adjacência numa linha, com o exemplo de "multimapa" na própria documentação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de ArrayDeque',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html',
      tipo: 'documentacao',
      porque: 'A fila da BFS e a pilha da DFS iterativa, na mesma classe.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Teoria dos grafos',
      url: 'https://pt.wikipedia.org/wiki/Teoria_dos_grafos',
      tipo: 'artigo',
      porque: 'Os conceitos e o vocabulário: grau, caminho, ciclo, conexidade, árvores e grafos dirigidos.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Busca em largura',
      url: 'https://pt.wikipedia.org/wiki/Busca_em_largura',
      tipo: 'artigo',
      porque: 'O algoritmo com pseudocódigo, animação e as aplicações, como menor caminho e bipartição.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Busca em profundidade',
      url: 'https://pt.wikipedia.org/wiki/Busca_em_profundidade',
      tipo: 'artigo',
      porque: 'A versão recursiva e a iterativa, e o uso em ordenação topológica e componentes.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Sete pontes de Königsberg',
      url: 'https://pt.wikipedia.org/wiki/Sete_pontes_de_K%C3%B6nigsberg',
      tipo: 'artigo',
      porque: 'O problema de 1736 que deu origem à teoria dos grafos, e a prova de Euler.',
      gratuito: true,
      idioma: 'pt',
      nivel: 'fundo',
    },
    {
      titulo: 'Red Blob Games: Introduction to the A* Algorithm',
      url: 'https://www.redblobgames.com/pathfinding/a-star/introduction.html',
      tipo: 'artigo',
      porque: 'Da BFS ao Dijkstra e ao A*, com mapas interativos. Uma das melhores explicações visuais de algoritmos da internet.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Rodrigo Contreras: Métodos de busca em Grafos, Busca em Largura (BFS)',
      url: 'https://www.youtube.com/watch?v=rEQJR4GPpb8',
      tipo: 'video',
      porque: 'A BFS explicada numa aula de grafos, com exercícios, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Café e Computação: Busca em Largura, BFS',
      url: 'https://www.youtube.com/watch?v=mFb8WwI98b0',
      tipo: 'video',
      porque: 'A BFS implementada passo a passo, da disciplina de Teoria dos Grafos do IF Sul de Minas.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'HackerRank: Algorithms, Graph Search, DFS and BFS',
      url: 'https://www.youtube.com/watch?v=zaBhtODEL0w',
      tipo: 'video',
      porque: 'As duas buscas comparadas e implementadas em Java, com o porquê de cada estrutura auxiliar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'VisuAlgo: Graph Traversal (DFS/BFS)',
      url: 'https://visualgo.net/en/dfsbfs',
      tipo: 'ferramenta',
      porque: 'Desenhe um grafo e rode as duas buscas passo a passo, vendo a fila e a pilha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'LeetCode 200: Number of Islands',
      url: 'https://leetcode.com/problems/number-of-islands/',
      tipo: 'ferramenta',
      porque: 'O problema do *flood fill* da aula, para submeter e testar contra casos grandes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Algorithms, 4th Edition: Undirected Graphs (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/41graph/',
      tipo: 'tutorial',
      porque: 'Representação, DFS, BFS e componentes conexos em Java, com os grafos de exemplo do livro.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 4.1',
      nivel: 'fundo',
    },
    {
      titulo: 'Entendendo Algoritmos (Aditya Bhargava)',
      url: 'https://novatec.com.br/livros/entendendo-algoritmos/',
      tipo: 'livro',
      porque: 'Grafos, busca em largura e o algoritmo de Dijkstra com os desenhos característicos do livro.',
      gratuito: false,
      idioma: 'pt',
      onde: 'Cap. 6 "Pesquisa em largura" e cap. 7 "Algoritmo de Dijkstra"',
    },
  ],
  desafio: {
    titulo: 'Ordem de build',
    enunciado:
      'Um projeto tem tarefas que dependem umas das outras: `antes("baixar", "compilar")` quer dizer que `baixar` precisa terminar antes de `compilar`. Escreva `ordenar(List<String[]> regras)`, que devolve uma ordem válida de execução usando o algoritmo de Kahn (uma BFS que só libera uma tarefa quando todas as anteriores terminaram) e detecta ciclos. Com as regras do exemplo, e depois com uma regra a mais que fecha um ciclo, imprima:\n\n```text\nbaixar -> compilar -> testar -> documentar -> empacotar -> publicar\nciclo detectado\n```',
    dicas: [
      'Guarde o grafo como `Map<String, List<String>>` (de cada tarefa para as que dependem dela) e um `Map<String, Integer>` com quantas dependências cada tarefa ainda tem (o grau de entrada).',
      'Use `LinkedHashMap` para a ordem ser a da primeira aparição de cada tarefa.',
      'Comece a fila com as tarefas de grau 0. Ao tirar uma, diminua o grau das que dependem dela e enfileire as que chegarem a 0.',
      'Se no fim a ordem tiver menos tarefas que o grafo, sobrou um ciclo: nenhuma tarefa dele chega a grau 0.',
    ],
    solucao: `import java.util.*;

public class OrdemDeBuild {
    static List<String> ordenar(List<String[]> regras) {
        Map<String, List<String>> depois = new LinkedHashMap<>();
        Map<String, Integer> pendentes = new LinkedHashMap<>();
        for (String[] r : regras) {
            depois.computeIfAbsent(r[0], k -> new ArrayList<>()).add(r[1]);
            depois.computeIfAbsent(r[1], k -> new ArrayList<>());
            pendentes.putIfAbsent(r[0], 0);
            pendentes.merge(r[1], 1, Integer::sum);
        }
        Deque<String> fila = new ArrayDeque<>();
        pendentes.forEach((tarefa, grau) -> {
            if (grau == 0) {
                fila.offer(tarefa);
            }
        });
        List<String> ordem = new ArrayList<>();
        while (!fila.isEmpty()) {
            String atual = fila.poll();
            ordem.add(atual);
            for (String proxima : depois.get(atual)) {
                if (pendentes.merge(proxima, -1, Integer::sum) == 0) {
                    fila.offer(proxima);
                }
            }
        }
        return ordem.size() == pendentes.size() ? ordem : null;
    }

    public static void main(String[] args) {
        List<String[]> regras = new ArrayList<>(List.of(
                new String[] {"baixar", "compilar"},
                new String[] {"compilar", "testar"},
                new String[] {"compilar", "documentar"},
                new String[] {"testar", "empacotar"},
                new String[] {"empacotar", "publicar"},
                new String[] {"documentar", "publicar"}));
        System.out.println(String.join(" -> ", ordenar(regras)));

        regras.add(new String[] {"publicar", "baixar"});
        List<String> comCiclo = ordenar(regras);
        System.out.println(comCiclo == null ? "ciclo detectado" : String.join(" -> ", comCiclo));
    }
}`,
    saida: 'baixar -> compilar -> testar -> documentar -> empacotar -> publicar\nciclo detectado',
    comentarios:
      'É a ordenação topológica, e ela está em toda ferramenta de build: o Maven e o Gradle a usam para decidir a ordem dos módulos, e acusam erro quando há dependência circular. A ordem encontrada não é a única válida (`documentar` poderia vir antes de `testar`), mas toda ordem válida respeita as setas. Com o ciclo, nenhuma tarefa começa com grau 0, a fila nasce vazia e a ordem sai incompleta. O custo é O(V + E), como o de qualquer busca.',
  },
  exercicios: [
    {
      id: 'aprendiz-t4-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual estrutura auxiliar a busca em largura (BFS) usa para decidir o próximo vértice?',
      opcoes: ['Uma fila', 'Uma pilha', 'Uma fila de prioridade', 'Uma árvore binária de busca'],
      resposta: 0,
      explicacao: 'A fila garante que os vértices descobertos primeiro, mais perto da origem, sejam visitados primeiro: é isso que faz a BFS andar em camadas. Com pilha, a busca vira DFS; com fila de prioridade e pesos, vira Dijkstra.',
    },
    {
      id: 'aprendiz-t4-e06-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num grafo **sem pesos**, qual algoritmo encontra o caminho com o menor número de arestas entre dois vértices?',
      opcoes: ['Busca em largura (BFS)', 'Busca em profundidade (DFS)', 'Ordenação topológica', 'Merge sort'],
      resposta: 0,
      explicacao: 'A BFS visita os vértices em ordem de distância: todos a 1 aresta, depois todos a 2, e assim por diante. A primeira vez que alcança o destino é pelo caminho mais curto. A DFS pode achar um caminho, mas não necessariamente o menor.',
    },
    {
      id: 'aprendiz-t4-e06-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata: a ordem de visita da DFS recursiva a partir do 1.',
      codigo: `import java.util.*;

public class Profundidade {
    static Map<Integer, List<Integer>> g = Map.of(
            1, List.of(2, 3),
            2, List.of(4),
            3, List.of(4, 5),
            4, List.of(6),
            5, List.of(6),
            6, List.of());

    static void dfs(int v, Set<Integer> visitados, StringJoiner saida) {
        visitados.add(v);
        saida.add(String.valueOf(v));
        for (int w : g.get(v)) {
            if (!visitados.contains(w)) {
                dfs(w, visitados, saida);
            }
        }
    }

    public static void main(String[] args) {
        StringJoiner saida = new StringJoiner(" ");
        dfs(1, new HashSet<>(), saida);
        System.out.println(saida);
    }
}`,
      resposta: '1 2 4 6 3 5',
      explicacao: 'A DFS vai fundo antes de voltar: 1 → 2 → 4 → 6, que não tem vizinhos. Volta até o 1 (o 4 já foi visitado pelo caminho do 2), segue para o 3 e dali para o 5; o 6 já foi visitado. A BFS daria 1 2 3 4 5 6.',
    },
    {
      id: 'aprendiz-t4-e06-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída? O programa calcula, com BFS, a distância em arestas do vértice 1 ao 6.',
      codigo: `Map<Integer, List<Integer>> g = Map.of(
        1, List.of(2, 3), 2, List.of(4), 3, List.of(4, 5),
        4, List.of(6), 5, List.of(6), 6, List.of());
Map<Integer, Integer> dist = new HashMap<>();
Deque<Integer> fila = new ArrayDeque<>();
dist.put(1, 0);
fila.offer(1);
while (!fila.isEmpty()) {
    int v = fila.poll();
    for (int w : g.get(v)) {
        if (!dist.containsKey(w)) {
            dist.put(w, dist.get(v) + 1);
            fila.offer(w);
        }
    }
}
System.out.println(dist.get(6));`,
      opcoes: ['`3`', '`4`', '`2`', '`5`', '`6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O 6 é alcançado por 1 → 2 → 4 → 6, por 1 → 3 → 4 → 6 ou por 1 → 3 → 5 → 6: todos com 3 arestas. A BFS registra a distância na primeira descoberta, que é sempre a menor.',
    },
    {
      id: 'aprendiz-t4-e06-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais problemas a busca em profundidade (DFS) resolve bem? Escolha dois.',
      opcoes: [
        'Detectar ciclos num grafo dirigido',
        'Contar os componentes conexos de um grafo',
        'Achar o menor caminho num grafo sem pesos',
        'Achar o menor caminho num grafo com pesos',
        'Ordenar um array de inteiros',
      ],
      respostas: [0, 1],
      explicacao: 'A DFS detecta ciclo ao reencontrar um vértice que ainda está no caminho atual, e conta componentes chamando a busca a partir de cada vértice ainda não visitado. Menor caminho sem pesos é tarefa da BFS; com pesos, do Dijkstra.',
    },
    {
      id: 'aprendiz-t4-e06-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma rede tem 1 milhão de usuários, cada um com cerca de 200 conexões. Por que usar lista de adjacência em vez de matriz de adjacência?',
      opcoes: [
        'A matriz teria 10¹² células; a lista guarda só as cerca de 200 milhões de ligações',
        'A lista permite saber se dois usuários são amigos em O(1)',
        'A matriz não funciona com grafos não dirigidos',
        'A lista ordena os usuários automaticamente',
      ],
      resposta: 0,
      explicacao: 'A matriz gasta V² = (10⁶)² posições, quase todas falsas. A lista gasta O(V + E). A vantagem real da matriz, responder "são vizinhos?" em O(1), não compensa tanto desperdício em grafos esparsos.',
    },
    {
      id: 'aprendiz-t4-e06-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas arestas tem um grafo não dirigido com 5 vértices em que todos estão ligados a todos?',
      opcoes: ['10', '25', '20', '5', '15'],
      resposta: 0,
      explicacao: 'Cada par de vértices tem uma aresta, e há 5 × 4 / 2 = 10 pares. Os 20 contariam cada aresta duas vezes (a-b e b-a), e os 25 ainda incluiriam laços de cada vértice consigo mesmo.',
    },
    {
      id: 'aprendiz-t4-e06-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método do `Deque` que retira o primeiro da fila. O programa deve imprimir `[1, 2, 3, 4]`.',
      codigo: `import java.util.*;

public class Largura {
    public static void main(String[] args) {
        Map<Integer, List<Integer>> g = Map.of(1, List.of(2, 3), 2, List.of(4), 3, List.of(4), 4, List.of());
        List<Integer> ordem = new ArrayList<>();
        Set<Integer> vistos = new HashSet<>(Set.of(1));
        Deque<Integer> fila = new ArrayDeque<>(List.of(1));
        while (!fila.isEmpty()) {
            int v = fila.___();
            ordem.add(v);
            for (int w : g.get(v)) {
                if (vistos.add(w)) {
                    fila.offer(w);
                }
            }
        }
        System.out.println(ordem);
    }
}`,
      respostas: ['poll', 'pollFirst', 'remove', 'removeFirst', 'pop'],
      saida: '[1, 2, 3, 4]',
      explicacao: '`offer` insere no fim, e `poll` retira do começo: o comportamento de fila. No `ArrayDeque`, `pollFirst`, `remove`, `removeFirst` e `pop` também retiram do começo. Repare em `vistos.add(w)`: ele devolve `false` se o vértice já estava lá, marcando e testando de uma vez.',
    },
    {
      id: 'aprendiz-t4-e06-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata: quantas ilhas tem o mapa, com vizinhança só para cima, baixo, esquerda e direita?',
      codigo: `public class Diagonais {
    static void afundar(char[][] m, int l, int c) {
        if (l < 0 || c < 0 || l >= m.length || c >= m[0].length || m[l][c] != '#') return;
        m[l][c] = '~';
        afundar(m, l + 1, c);
        afundar(m, l - 1, c);
        afundar(m, l, c + 1);
        afundar(m, l, c - 1);
    }

    public static void main(String[] args) {
        char[][] m = {"#~#".toCharArray(), "~#~".toCharArray(), "#~#".toCharArray()};
        int ilhas = 0;
        for (int l = 0; l < 3; l++)
            for (int c = 0; c < 3; c++)
                if (m[l][c] == '#') { ilhas++; afundar(m, l, c); }
        System.out.println(ilhas);
    }
}`,
      resposta: '5',
      explicacao: 'As cinco terras só se tocam pelas diagonais, que não contam como vizinhança. Cada uma é uma ilha. Com 8 direções (incluindo diagonais), seria uma ilha só: a definição de vizinho é parte do grafo.',
    },
    {
      id: 'aprendiz-t4-e06-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a complexidade de tempo da BFS e da DFS com lista de adjacência?',
      opcoes: ['O(V + E)', 'O(V²)', 'O(V · E)', 'O(log V)', 'O(E²)'],
      resposta: 0,
      explicacao: 'Cada vértice entra na fila (ou na pilha) uma vez, e a lista de vizinhos de cada um é percorrida uma vez: a soma de todas as listas é o número de arestas. Com matriz de adjacência, olhar os vizinhos custa V por vértice, e o total vira O(V²).',
    },
    {
      id: 'aprendiz-t4-e06-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Numa BFS, o que acontece se o vértice for marcado como visitado só quando **sai** da fila, e não quando entra?',
      opcoes: [
        'O mesmo vértice pode entrar na fila várias vezes, desperdiçando tempo e memória',
        'A BFS passa a funcionar como DFS',
        'O algoritmo não compila',
        'Nada muda: as duas formas são equivalentes em custo',
      ],
      resposta: 0,
      explicacao: 'Entre o momento em que é descoberto e o momento em que sai da fila, um vértice pode ser descoberto de novo por outros vizinhos e enfileirado de novo. O resultado continua correto se a saída checar os visitados, mas a fila pode crescer até O(E). Marcar na entrada garante uma vez por vértice.',
    },
    {
      id: 'aprendiz-t4-e06-q12',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'As tarefas têm as dependências A → B, A → C, B → D e C → D (a seta indica "precisa vir antes"). Quais ordens de execução são válidas? Escolha duas.',
      opcoes: ['A B C D', 'A C B D', 'B A C D', 'A B D C', 'D C B A'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `String[][] arestas = {{"A", "B"}, {"A", "C"}, {"B", "D"}, {"C", "D"}};
String[] ordens = {"ABCD", "ACBD", "BACD", "ABDC", "DCBA"};
StringJoiner sj = new StringJoiner(" ");
for (String o : ordens) {
    boolean ok = true;
    for (String[] a : arestas) {
        if (o.indexOf(a[0]) > o.indexOf(a[1])) ok = false;
    }
    sj.add(String.valueOf(ok));
}
System.out.println(sj);`,
      explicacao: 'Uma ordem é válida quando toda seta aponta para a frente. A precisa vir primeiro e D por último; B e C podem trocar entre si. "B A C D" põe B antes de A, e "A B D C" põe D antes de C. Ordenação topológica raramente é única.',
    },
    {
      id: 'aprendiz-t4-e06-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Grafo {
    public static void main(String[] args) {
        Map<String, List<String>> grafo = new HashMap<>();
        grafo.computeIfAbsent("a", k -> new ArrayList<>()).add("b");
        grafo.computeIfAbsent("b", k -> new ArrayList<>()).add(1);
        System.out.println(grafo);
    }
}`,
      resposta: 7,
      explicacao: 'A lista de vizinhos é uma `List<String>`, e `add(1)` tenta inserir um `int`. Os genéricos do Java pegam esse erro na compilação; sem eles, ele só apareceria como `ClassCastException` lá na frente.',
    },
    {
      id: 'aprendiz-t4-e06-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `Map<String, List<String>> grafo = new HashMap<>();
grafo.put("a", List.of("b"));
System.out.println(grafo.get("z").size());`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `0`',
        'Lança `NoSuchElementException`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: '`get` devolve `null` para uma chave ausente, e chamar `size()` em `null` lança `NullPointerException`. Em grafos, vértices sem arestas de saída são comuns: use `grafo.getOrDefault(v, List.of())`.',
    },
    {
      id: 'aprendiz-t4-e06-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um mapa em grade de 1000 × 1000 células é tratado como grafo, com cada célula ligada às vizinhas de cima, baixo, esquerda e direita. Quantos vértices ele tem, e quantas arestas, aproximadamente?',
      opcoes: [
        '1 milhão de vértices e cerca de 2 milhões de arestas',
        '1.000 vértices e 4.000 arestas',
        '1 milhão de vértices e 10¹² arestas',
        '2.000 vértices e 1 milhão de arestas',
      ],
      resposta: 0,
      explicacao: 'Cada célula é um vértice: 10⁶. Cada uma tem até 4 vizinhos, e cada aresta é contada por duas células: cerca de 4 × 10⁶ / 2 = 2 milhões. É um grafo bem esparso, e por isso uma DFS ou BFS na grade é O(V + E), linear no tamanho do mapa.',
    },
  ],
};

export default episodio;
