import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t4-e05',
  minutos: 16,
  aula,
  armadilhas: [
    'Se `a.equals(b)`, `a.hashCode()` tem de ser igual a `b.hashCode()`. O contrário não é exigido.',
    'Sobrescrever `equals` sem `hashCode` faz o `HashSet` não achar objetos iguais.',
    'Alterar um objeto que é chave de um `HashMap` o torna inalcançável, mas ele continua contado no `size()`.',
    '`HashMap` não garante ordem de iteração; `TreeMap` itera pelas chaves em ordem; `LinkedHashMap`, pela ordem de inserção.',
    '`TreeSet` e `TreeMap` exigem chaves `Comparable` (ou um `Comparator`). Senão, `ClassCastException` em tempo de execução.',
    'Uma BST simples recebendo dados ordenados vira uma lista: altura n e busca O(n).',
    'O(1) do `HashMap` é em média. Um `hashCode` ruim joga tudo no mesmo balde.',
  ],
  ia: {
    uso:
      'A IA ajuda a implementar árvores e tabelas hash para estudo e a escolher entre `HashMap`, `TreeMap` e `LinkedHashMap`. Confira as classes de chave que ela gerar: `equals`, `hashCode` e imutabilidade.',
    pedido:
      'Implemente em Java uma árvore binária de busca de inteiros com inserir, contém e percurso em ordem.\n- Explique a altura da árvore para inserções em ordem aleatória e em ordem crescente.\n- Escreva testes que comparam o percurso em ordem com um TreeSet para 1.000 valores aleatórios.\n- Diga quando usar TreeMap no lugar de HashMap, com um exemplo real.',
    erros: [
      'Gera classes de chave com `equals` sem `hashCode`.',
      'Diz que `HashMap` mantém a ordem de inserção.',
      'Põe objetos sem `Comparable` num `TreeSet` sem `Comparator`.',
    ],
    conferir: [
      'Compare o resultado com `TreeSet` e `HashSet` do JDK.',
      'Teste a busca depois de inserir chaves iguais criadas separadamente.',
      'Meça a altura da árvore com dados ordenados.',
    ],
  },
  recursos: [
    {
      titulo: 'Javadoc de Object.hashCode',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#hashCode()',
      tipo: 'documentacao',
      porque: 'O contrato oficial entre `equals` e `hashCode`, que toda chave de tabela hash precisa cumprir.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de HashMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html',
      tipo: 'documentacao',
      porque: 'Capacidade inicial, fator de carga de 0,75 e o custo de redimensionar, explicados pela documentação.',
      gratuito: true,
      idioma: 'en',
      onde: 'Introdução da classe, parágrafos sobre "initial capacity" e "load factor"',
    },
    {
      titulo: 'Javadoc de TreeMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeMap.html',
      tipo: 'documentacao',
      porque: 'A confirmação de que é uma árvore rubro-negra com log(n) garantido, e os métodos de navegação.',
      gratuito: true,
      idioma: 'en',
      onde: 'Introdução e métodos floorKey, ceilingKey, headMap e subMap',
    },
    {
      titulo: 'Javadoc de PriorityQueue',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html',
      tipo: 'documentacao',
      porque: 'A fila de prioridade baseada em heap, com a complexidade de cada operação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Wikipédia: Árvore binária de busca',
      url: 'https://pt.wikipedia.org/wiki/%C3%81rvore_bin%C3%A1ria_de_busca',
      tipo: 'artigo',
      porque: 'Busca, inserção, remoção (o caso mais difícil) e percursos, com diagramas.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Tabela de dispersão',
      url: 'https://pt.wikipedia.org/wiki/Tabela_de_dispers%C3%A3o',
      tipo: 'artigo',
      porque: 'Funções de hash, tratamento de colisões por encadeamento e por endereçamento aberto.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Árvore rubro-negra',
      url: 'https://pt.wikipedia.org/wiki/%C3%81rvore_rubro-negra',
      tipo: 'artigo',
      porque: 'As cinco regras de cor que mantêm a árvore do `TreeMap` balanceada, e as rotações.',
      gratuito: true,
      idioma: 'pt',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: A Guide to Java HashMap',
      url: 'https://www.baeldung.com/java-hashmap',
      tipo: 'artigo',
      porque: 'Como o `HashMap` funciona por dentro, com colisões, redimensionamento e chaves mutáveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'UNIVESP: Estrutura de Dados, Aula 16, Árvores binárias de pesquisa',
      url: 'https://www.youtube.com/watch?v=7IKXYhqipK8',
      tipo: 'video',
      porque: 'Aula universitária sobre árvores binárias de busca, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Douglas Maioli: Tabela Hash, Tratamento de Colisões',
      url: 'https://www.youtube.com/watch?v=eSklGt_70-U',
      tipo: 'video',
      porque: 'Encadeamento e endereçamento aberto explicados e implementados, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'HackerRank: Data Structures, Hash Tables',
      url: 'https://www.youtube.com/watch?v=shs0KM3wKv8',
      tipo: 'video',
      porque: 'Hash, baldes e colisões com encadeamento, em nove minutos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'HackerRank: Data Structures, Trees',
      url: 'https://www.youtube.com/watch?v=oSWTXtMglKE',
      tipo: 'video',
      porque: 'Árvores binárias de busca com inserção e percursos implementados em Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'VisuAlgo: Binary Search Tree, AVL Tree',
      url: 'https://visualgo.net/en/bst',
      tipo: 'ferramenta',
      porque: 'Insira valores em ordem e fora de ordem e veja a altura da árvore mudar; compare com a versão AVL.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Algorithms, 4th Edition: Hash Tables (Sedgewick e Wayne)',
      url: 'https://algs4.cs.princeton.edu/34hash/',
      tipo: 'tutorial',
      porque: 'Encadeamento e sondagem linear implementados em Java, com a análise do fator de carga.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 3.4 (e 3.2 para árvores de busca)',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Sua própria tabela hash',
    enunciado:
      'Implemente `MiniHash`, uma tabela hash de `String` para `Integer` com encadeamento: um array de `LinkedList` de pares, `put`, `get` e redimensionamento para o dobro quando o número de elementos passar de 75% dos baldes. Comece com 4 baldes e use a tabela para contar as palavras de "o rato roeu a roupa do rei de roma e o rei riu do rato". Imprima:\n\n```text\nrato=2 rei=2 o=2 gato=null\n11 palavras distintas em 16 baldes\n```',
    dicas: [
      'O índice do balde é `Math.floorMod(chave.hashCode(), baldes.length)`: o `hashCode` pode ser negativo.',
      'No `put`, procure a chave no balde: se existir, atualize o valor; senão, acrescente o par e aumente o tamanho.',
      'Ao redimensionar, cada par precisa ser recolocado, porque o índice depende do número de baldes.',
      'Criar um array genérico exige `new LinkedList[n]` com `@SuppressWarnings("unchecked")`.',
    ],
    solucao: `import java.util.LinkedList;

public class MiniHash {
    static class Par {
        final String chave;
        int valor;

        Par(String chave, int valor) {
            this.chave = chave;
            this.valor = valor;
        }
    }

    private LinkedList<Par>[] baldes = novos(4);
    private int tamanho = 0;

    @SuppressWarnings("unchecked")
    static LinkedList<Par>[] novos(int n) {
        LinkedList<Par>[] b = new LinkedList[n];
        for (int i = 0; i < n; i++) {
            b[i] = new LinkedList<>();
        }
        return b;
    }

    static int indice(String chave, int capacidade) {
        return Math.floorMod(chave.hashCode(), capacidade);
    }

    void put(String chave, int valor) {
        LinkedList<Par> balde = baldes[indice(chave, baldes.length)];
        for (Par p : balde) {
            if (p.chave.equals(chave)) {
                p.valor = valor;
                return;
            }
        }
        balde.add(new Par(chave, valor));
        tamanho++;
        if (tamanho > baldes.length * 3 / 4) {
            redimensionar();
        }
    }

    Integer get(String chave) {
        for (Par p : baldes[indice(chave, baldes.length)]) {
            if (p.chave.equals(chave)) {
                return p.valor;
            }
        }
        return null;
    }

    void redimensionar() {
        LinkedList<Par>[] antigos = baldes;
        baldes = novos(antigos.length * 2);
        for (LinkedList<Par> balde : antigos) {
            for (Par p : balde) {
                baldes[indice(p.chave, baldes.length)].add(p);
            }
        }
    }

    public static void main(String[] args) {
        MiniHash contagem = new MiniHash();
        String texto = "o rato roeu a roupa do rei de roma e o rei riu do rato";
        for (String palavra : texto.split(" ")) {
            Integer atual = contagem.get(palavra);
            contagem.put(palavra, atual == null ? 1 : atual + 1);
        }
        System.out.println("rato=" + contagem.get("rato") + " rei=" + contagem.get("rei")
                + " o=" + contagem.get("o") + " gato=" + contagem.get("gato"));
        System.out.println(contagem.tamanho + " palavras distintas em " + contagem.baldes.length + " baldes");
    }
}`,
    saida: 'rato=2 rei=2 o=2 gato=null\n11 palavras distintas em 16 baldes',
    comentarios:
      'A tabela começou com 4 baldes, dobrou para 8 ao receber a 4ª palavra distinta e para 16 na 7ª. Cada redimensionamento custa O(n), mas, como no `ArrayList`, a soma dos redimensionamentos é uma série geométrica e o custo médio por inserção continua O(1). O `HashMap` do JDK faz o mesmo, com três refinamentos: capacidades potência de 2 (índice com `&` em vez de `floorMod`), mistura dos bits altos do hash e baldes que viram árvores quando ficam grandes.',
  },
  bugs: [
    {
      id: 'aprendiz-t4-e05-b01',
      dificuldade: 1,
      sintoma: 'O percurso em ordem da árvore deveria listar os valores em ordem crescente, mas imprime `80 70 60 50 40 30 20`.',
      codigo: `public class Arvore {
    static class No {
        int valor; No esq, dir;
        No(int v) { valor = v; }
    }

    static No inserir(No raiz, int v) {
        if (raiz == null) return new No(v);
        if (v > raiz.valor) raiz.esq = inserir(raiz.esq, v);
        else raiz.dir = inserir(raiz.dir, v);
        return raiz;
    }

    static void emOrdem(No n, StringBuilder sb) {
        if (n == null) return;
        emOrdem(n.esq, sb);
        sb.append(n.valor).append(' ');
        emOrdem(n.dir, sb);
    }

    public static void main(String[] args) {
        No raiz = null;
        for (int v : new int[] {50, 30, 70, 20, 40, 60, 80}) raiz = inserir(raiz, v);
        StringBuilder sb = new StringBuilder();
        emOrdem(raiz, sb);
        System.out.println(sb.toString().trim());
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: '80 70 60 50 40 30 20' },
      correcao: `public class Arvore {
    static class No {
        int valor; No esq, dir;
        No(int v) { valor = v; }
    }

    static No inserir(No raiz, int v) {
        if (raiz == null) return new No(v);
        if (v < raiz.valor) raiz.esq = inserir(raiz.esq, v);
        else raiz.dir = inserir(raiz.dir, v);
        return raiz;
    }

    static void emOrdem(No n, StringBuilder sb) {
        if (n == null) return;
        emOrdem(n.esq, sb);
        sb.append(n.valor).append(' ');
        emOrdem(n.dir, sb);
    }

    public static void main(String[] args) {
        No raiz = null;
        for (int v : new int[] {50, 30, 70, 20, 40, 60, 80}) raiz = inserir(raiz, v);
        StringBuilder sb = new StringBuilder();
        emOrdem(raiz, sb);
        System.out.println(sb.toString().trim());
    }
}`,
      saidaCorrigida: '20 30 40 50 60 70 80',
      dica: 'Pela regra da árvore binária de busca, para que lado vão os valores menores que o nó?',
      explicacao: 'A inserção manda os maiores para a esquerda, invertendo a regra. A árvore continua consistente, só que espelhada, e o percurso esquerda, nó, direita sai em ordem decrescente. Menores vão para a esquerda.',
    },
    {
      id: 'aprendiz-t4-e05-b02',
      dificuldade: 2,
      sintoma: 'Depois de acrescentar um item ao carrinho guardado num `HashSet`, o conjunto diz que não contém o carrinho: `false 1`.',
      codigo: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Carrinhos {
    public static void main(String[] args) {
        Set<List<String>> abertos = new HashSet<>();
        List<String> carrinho = new ArrayList<>(List.of("caneta"));
        abertos.add(carrinho);
        carrinho.add("caderno");
        System.out.println(abertos.contains(carrinho) + " " + abertos.size());
    }
}`,
      linha: 10,
      efeito: { tipo: 'saida', saida: 'false 1' },
      correcao: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Carrinhos {
    public static void main(String[] args) {
        Set<List<String>> abertos = new HashSet<>();
        List<String> carrinho = new ArrayList<>(List.of("caneta"));
        carrinho.add("caderno");
        abertos.add(carrinho);
        System.out.println(abertos.contains(carrinho) + " " + abertos.size());
    }
}`,
      saidaCorrigida: 'true 1',
      dica: 'O balde de um elemento é escolhido pelo `hashCode` dele. O `hashCode` de uma lista muda quando ela muda?',
      explicacao: 'A lista foi guardada no balde do hash de `[caneta]`; ao ganhar um item, o hash mudou, e o `contains` procura no balde novo. O elemento continua lá, inalcançável. Objetos que são elementos de `HashSet` ou chaves de `HashMap` não podem mudar enquanto estão lá.',
    },
    {
      id: 'aprendiz-t4-e05-b03',
      dificuldade: 3,
      sintoma: 'Montar o ranking de pedidos num `TreeSet` lança `ClassCastException: class Pedido cannot be cast to class java.lang.Comparable`.',
      codigo: `import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class Ranking {
    static class Pedido {
        final String cliente; final int valor;
        Pedido(String cliente, int valor) { this.cliente = cliente; this.valor = valor; }
        public String toString() { return cliente + "=" + valor; }
    }

    public static void main(String[] args) {
        Set<Pedido> ranking = new TreeSet<>();
        ranking.add(new Pedido("Ana", 50));
        ranking.add(new Pedido("Bia", 30));
        System.out.println(ranking);
    }
}`,
      linha: 13,
      efeito: { tipo: 'excecao', nome: 'ClassCastException' },
      correcao: `import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class Ranking {
    static class Pedido {
        final String cliente; final int valor;
        Pedido(String cliente, int valor) { this.cliente = cliente; this.valor = valor; }
        public String toString() { return cliente + "=" + valor; }
    }

    public static void main(String[] args) {
        Set<Pedido> ranking = new TreeSet<>(Comparator.comparingInt((Pedido p) -> p.valor));
        ranking.add(new Pedido("Ana", 50));
        ranking.add(new Pedido("Bia", 30));
        System.out.println(ranking);
    }
}`,
      saidaCorrigida: '[Bia=30, Ana=50]',
      dica: 'Uma árvore binária de busca precisa decidir se cada elemento vai para a esquerda ou para a direita. Como o `TreeSet` compara dois `Pedido`?',
      explicacao: 'Sem `Comparator`, o `TreeSet` supõe que os elementos são `Comparable` e faz o cast na hora de comparar. `Pedido` não é, e o erro só aparece na execução. Passe um `Comparator` no construtor, ou implemente `Comparable` na classe.',
    },
  ],
  exercicios: [
    {
      id: 'aprendiz-t4-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a regra de uma árvore binária de busca?',
      opcoes: [
        'Para cada nó, os valores à esquerda são menores e os da direita são maiores',
        'Cada nó tem exatamente dois filhos',
        'Os valores ficam ordenados por nível, da raiz para as folhas',
        'A raiz é sempre o maior valor',
      ],
      resposta: 0,
      explicacao: 'É essa regra, valendo em todos os nós, que permite buscar descendo por um único caminho. Nós podem ter zero, um ou dois filhos. Raiz sempre maior (ou menor) é a regra do heap, outra árvore.',
      dica: 'Menores de um lado, maiores do outro, em toda subárvore.',
    },
    {
      id: 'aprendiz-t4-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata: o percurso em **pré-ordem** (nó, esquerda, direita).',
      codigo: `import java.util.StringJoiner;

public class PreOrdem {
    static class No {
        int valor;
        No esq, dir;
        No(int valor) { this.valor = valor; }
    }

    static No inserir(No r, int v) {
        if (r == null) return new No(v);
        if (v < r.valor) r.esq = inserir(r.esq, v);
        else r.dir = inserir(r.dir, v);
        return r;
    }

    static void preOrdem(No n, StringJoiner sj) {
        if (n == null) return;
        sj.add(String.valueOf(n.valor));
        preOrdem(n.esq, sj);
        preOrdem(n.dir, sj);
    }

    public static void main(String[] args) {
        No raiz = null;
        for (int v : new int[] {8, 3, 10, 1, 6, 14}) raiz = inserir(raiz, v);
        StringJoiner sj = new StringJoiner(" ");
        preOrdem(raiz, sj);
        System.out.println(sj);
    }
}`,
      resposta: '8 3 1 6 10 14',
      explicacao: 'A árvore fica com 8 na raiz, 3 e 10 como filhos, 1 e 6 abaixo do 3, e 14 à direita do 10. A pré-ordem visita o nó antes dos filhos: 8, depois toda a subárvore esquerda (3, 1, 6), depois a direita (10, 14). O percurso em ordem daria os valores ordenados.',
      dica: 'Pré-ordem visita o nó antes dos filhos.',
    },
    {
      id: 'aprendiz-t4-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Inserindo os valores 1, 2, 3, ..., n, nessa ordem, numa árvore binária de busca **sem balanceamento**, qual é a altura final?',
      opcoes: ['n', 'log₂ n', 'n/2', '√n', '2'],
      resposta: 0,
      explicacao: 'Cada novo valor é maior que todos os anteriores e vai sempre para a direita do último: a árvore vira uma corrente, uma lista ligada disfarçada. Por isso existem as árvores balanceadas, como a rubro-negra do `TreeMap`.',
      dica: 'Cada valor novo é maior que todos os anteriores.',
    },
    {
      id: 'aprendiz-t4-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(("Aa".hashCode() == "BB".hashCode()) + " " + "Aa".equals("BB"));`,
      opcoes: ['`true false`', '`false false`', '`true true`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '65 · 31 + 97 = 2112 e 66 · 31 + 66 = 2112: as duas strings colidem. Hash igual não significa objetos iguais, e o contrato não exige isso. A tabela hash resolve a colisão comparando com `equals`.',
      dica: 'Siga a busca na árvore a partir da raiz.',
    },
    {
      id: 'aprendiz-t4-e05-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sobre o contrato entre `equals` e `hashCode`, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Se `a.equals(b)`, então `a.hashCode() == b.hashCode()`',
        'Se `a.hashCode() != b.hashCode()`, então `a` e `b` não são iguais pelo `equals`',
        'Se `a.hashCode() == b.hashCode()`, então `a.equals(b)`',
        'Cada objeto precisa ter um `hashCode` único',
        'O `hashCode` pode mudar a cada chamada, mesmo sem o objeto mudar',
      ],
      respostas: [0, 1],
      explicacao: 'A primeira é a regra do contrato; a segunda é a contrapositiva dela, e por isso também vale (e é o que deixa a tabela pular candidatos sem chamar `equals`). A terceira é a recíproca, que não vale: colisões existem. O hash precisa ser estável enquanto o objeto não muda.',
      dica: '`equals` igual exige `hashCode` igual; o contrário não.',
    },
    {
      id: 'aprendiz-t4-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Produto {
    final String codigo;

    Produto(String codigo) {
        this.codigo = codigo;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Produto p && p.codigo.equals(codigo);
    }

    public static void main(String[] args) {
        Set<Produto> estoque = new HashSet<>();
        estoque.add(new Produto("X1"));
        System.out.println(estoque.contains(new Produto("X1")));
    }
}`,
      opcoes: ['`false`', '`true`', 'Não compila: falta `hashCode`', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem sobrescrever `hashCode`, cada `Produto` usa o hash de identidade herdado de `Object`. O segundo objeto cai em outro balde (ou tem outro hash) e o `equals` nem é chamado. O compilador não exige `hashCode`; só o contrato.',
      dica: 'Pense no balde em que cada objeto foi guardado.',
    },
    {
      id: 'aprendiz-t4-e05-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o `TreeMap` oferece em troca de ser O(log n), e não O(1) como o `HashMap`?',
      opcoes: [
        'Chaves sempre em ordem, com consultas como `floorKey` e `headMap`',
        'Aceitar chaves sem `equals`',
        'Usar menos memória que um array',
        'Permitir chaves duplicadas',
      ],
      resposta: 0,
      explicacao: 'A árvore mantém as chaves ordenadas a cada inserção. Isso permite iterar em ordem e perguntar pela maior chave menor que um valor, pela faixa entre duas chaves, pela primeira e pela última. Nenhum mapa do Java aceita chaves duplicadas.',
      dica: 'A árvore mantém as chaves em ordem.',
    },
    {
      id: 'aprendiz-t4-e05-q08',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `TreeMap<Integer, String> faixas = new TreeMap<>(Map.of(0, "infantil", 13, "juvenil", 18, "adulto", 60, "sênior"));
System.out.println(faixas.floorEntry(15).getValue());
System.out.println(faixas.floorEntry(60).getValue());
System.out.println(faixas.ceilingKey(19));`,
      resposta: 'juvenil\nsênior\n60',
      explicacao: '`floorEntry(15)` é o par com a maior chave ≤ 15, a do 13. `floorEntry(60)` inclui a igualdade e devolve o próprio 60. `ceilingKey(19)` é a menor chave ≥ 19, o 60. Faixas de idade, de preço ou de horário viram uma linha com `TreeMap`.',
      dica: '`floorKey` dá a maior chave menor ou igual.',
    },
    {
      id: 'aprendiz-t4-e05-q09',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o campo que leva a busca para o lado dos menores. O programa deve imprimir `true false`.',
      codigo: `public class Busca {
    static class No {
        int valor;
        No esq, dir;
        No(int valor, No esq, No dir) { this.valor = valor; this.esq = esq; this.dir = dir; }
    }

    static boolean contem(No raiz, int v) {
        if (raiz == null) return false;
        if (v == raiz.valor) return true;
        if (v < raiz.valor) return contem(raiz.___, v);
        return contem(raiz.dir, v);
    }

    public static void main(String[] args) {
        No arvore = new No(50, new No(30, null, new No(40, null, null)), new No(70, null, null));
        System.out.println(contem(arvore, 40) + " " + contem(arvore, 45));
    }
}`,
      respostas: ['esq'],
      saida: 'true false',
      explicacao: 'Valores menores que o nó estão na subárvore esquerda. A busca por 40 desce 50 → 30 → 40. A busca por 45 desce 50 → 30 → 40 → direita do 40, que é `null`: não está. Cada passo descarta um lado inteiro.',
      dica: 'Os menores ficam na subárvore da esquerda.',
    },
    {
      id: 'aprendiz-t4-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um `HashMap` criado com `new HashMap<>()` tem 16 baldes e fator de carga 0,75. Ao inserir qual elemento ele dobra de tamanho pela primeira vez?',
      opcoes: ['O 13º', 'O 16º', 'O 17º', 'O 12º', 'O 9º'],
      resposta: 0,
      explicacao: '16 × 0,75 = 12 é o limite. Quando o tamanho passa de 12, ou seja, ao inserir o 13º elemento, a tabela vai para 32 baldes. Quem já sabe quantos elementos terá pode passar a capacidade no construtor e evitar redimensionamentos.',
      dica: '16 × 0,75 = 12: o redimensionamento vem no elemento seguinte.',
    },
    {
      id: 'aprendiz-t4-e05-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `Set<List<Integer>> conjunto = new HashSet<>();
List<Integer> chave = new ArrayList<>(List.of(1));
conjunto.add(chave);
chave.add(2);
System.out.println(conjunto.contains(chave) + " " + conjunto.size());`,
      opcoes: ['`false 1`', '`true 1`', '`false 0`', '`true 2`', 'Lança `ConcurrentModificationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A lista entrou no balde calculado pelo hash de `[1]`. Ao virar `[1, 2]`, o hash mudou, e `contains` procura em outro balde. O objeto continua dentro do conjunto (tamanho 1), mas não é mais encontrado. Chaves devem ser imutáveis.',
      dica: 'Confira o `hashCode` e o `equals` da classe usada como chave.',
    },
    {
      id: 'aprendiz-t4-e05-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais estruturas percorrem as chaves em ordem crescente? Escolha duas.',
      opcoes: ['`TreeMap`', '`TreeSet`', '`HashMap`', '`HashSet`', '`LinkedHashMap`'],
      respostas: [0, 1],
      explicacao: 'As estruturas de árvore mantêm as chaves ordenadas. O `HashMap` e o `HashSet` não garantem ordem nenhuma, e o `LinkedHashMap` mantém a ordem de **inserção**, não a ordem das chaves.',
      dica: 'Quais estruturas são árvores?',
    },
    {
      id: 'aprendiz-t4-e05-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Mapas {
    public static void main(String[] args) {
        Map<String, Integer> idades = new HashMap<>();
        idades.put("Ana", 30);
        Set<String> nomes = idades.keySet();
        Map<String> errado = new HashMap<>();
        System.out.println(nomes);
    }
}`,
      resposta: 8,
      explicacao: '`Map` tem dois parâmetros de tipo, a chave e o valor. `Map<String>` é um número errado de argumentos de tipo. Um conjunto de chaves seria `Set<String>`, como na linha 7.',
      dica: 'Confira os tipos genéricos e os argumentos.',
    },
    {
      id: 'aprendiz-t4-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `record Ponto(int x, int y) {}

Set<Ponto> pontos = new TreeSet<>();
pontos.add(new Ponto(1, 2));
System.out.println(pontos);`,
      opcoes: [
        'Lança `ClassCastException`',
        'Imprime `[Ponto[x=1, y=2]]`',
        'Não compila: `Ponto` não é `Comparable`',
        'Imprime `[]`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ClassCastException' },
      explicacao: 'O `TreeSet` precisa comparar elementos para posicioná-los na árvore. Sem `Comparator`, ele tenta converter para `Comparable`, e o record não implementa essa interface. O compilador não percebe, porque `TreeSet<Ponto>` aceita qualquer tipo; o erro só aparece ao inserir. A solução é `new TreeSet<>(Comparator.comparingInt(Ponto::x).thenComparingInt(Ponto::y))`.',
      dica: 'Pense no que o `TreeSet` precisa fazer com cada elemento.',
    },
    {
      id: 'aprendiz-t4-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma classe usada como chave de `HashMap` tem `hashCode()` que sempre devolve 42. O que acontece?',
      opcoes: [
        'Funciona, mas todas as chaves caem no mesmo balde e as operações degradam de O(1)',
        'Não compila',
        'O `HashMap` lança exceção ao detectar o hash repetido',
        'As chaves passam a ser consideradas iguais e se sobrescrevem',
      ],
      resposta: 0,
      explicacao: 'O contrato é cumprido (iguais têm o mesmo hash), então o mapa continua correto: o `equals` diferencia as chaves. Mas todas colidem no mesmo balde, e cada busca compara com todas. Desde o Java 8, o balde vira uma árvore e o pior caso é O(log n), em vez de O(n), se as chaves forem `Comparable`.',
      dica: 'Todas as chaves no mesmo balde.',
    },
  ],
};

export default episodio;
