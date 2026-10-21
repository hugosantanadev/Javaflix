import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t3-e03',
  minutos: 16,
  aula,
  armadilhas: [
    '`COUNT(*)` conta linhas, inclusive as que o LEFT JOIN preencheu com nulos; `COUNT(coluna)` conta só valores.',
    'A soma de um grupo sem valores é `NULL`, não zero: use `COALESCE(SUM(...), 0)`.',
    'Toda coluna do `SELECT` precisa estar no `GROUP BY` ou numa agregação.',
    'Agregações não podem ir no `WHERE`: filtros sobre grupos vão no `HAVING`.',
    'Depois de juntar com uma tabela de "muitos", `COUNT(*)` conta as linhas multiplicadas; use `COUNT(DISTINCT id)`.',
    'No SQL Server, `AVG` de uma coluna inteira devolve um inteiro truncado.',
    'No Java, `getInt` de um `NULL` devolve 0 sem avisar; confira com `wasNull()` ou use `getObject`.',
  ],
  recursos: [
    {
      titulo: 'Documentação do PostgreSQL: Aggregate Functions',
      url: 'https://www.postgresql.org/docs/current/functions-aggregate.html',
      tipo: 'documentacao',
      porque: 'Todas as funções de agregação, com o comportamento de cada uma diante de nulos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: The GROUP BY and HAVING Clauses',
      url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP',
      tipo: 'documentacao',
      porque: 'Como os grupos são formados, a regra das colunas e a diferença entre `WHERE` e `HAVING`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Window Functions (tutorial)',
      url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
      tipo: 'tutorial',
      porque: '`OVER`, `PARTITION BY` e as funções de janela, com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'SQLBolt: Queries with aggregates',
      url: 'https://sqlbolt.com/lesson/select_queries_with_aggregates',
      tipo: 'curso',
      porque: 'Exercícios interativos de `GROUP BY`, seguidos dos de `HAVING`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Modern SQL: FILTER e funções de janela',
      url: 'https://modern-sql.com/feature/filter',
      tipo: 'artigo',
      porque: 'A cláusula `FILTER` nas agregações e quais bancos a suportam.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc: Collectors.groupingBy',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Collectors.html',
      tipo: 'documentacao',
      porque: 'O equivalente em Java do `GROUP BY`, usado no exemplo e no desafio.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Hashtag Programação: Funções de agregação no SQL',
      url: 'https://www.youtube.com/watch?v=BBASKdGg2Wo',
      tipo: 'video',
      porque: '`SUM`, `COUNT`, `AVG`, `MIN` e `MAX` com exemplos práticos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Programação Dinâmica: GROUP BY, HAVING e CASE na prática',
      url: 'https://www.youtube.com/watch?v=VRPsBvN4hyY',
      tipo: 'video',
      porque: 'Agrupamentos e filtros de grupo sobre uma base real, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Otávio Miranda: funções de agregação',
      url: 'https://www.youtube.com/watch?v=4aT5OzKV6Q8',
      tipo: 'video',
      porque: 'As agregações no MySQL, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Becoming a Data Scientist: GROUP BY, HAVING vs. WHERE',
      url: 'https://www.youtube.com/watch?v=nNrgRVIzeHg',
      tipo: 'video',
      porque: 'A diferença entre filtrar linhas e filtrar grupos, em seis minutos.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Relatório de faturamento em Java',
    enunciado:
      'Reproduza em Java a consulta da aula que lista os clientes que gastaram mais de R$ 1.000, sem contar pedidos cancelados, com o número de pedidos distintos e o total gasto, do maior para o menor. Use as listas de clientes, pedidos e itens da loja, com `BigDecimal` para os valores. Atenção às mesmas armadilhas do SQL: o filtro de status vale para as linhas (como o `WHERE`), o mínimo vale para os grupos (como o `HAVING`), e o número de pedidos deve ser contado sem repetir o pedido a cada item. A saída deve ser:\n\n```text\nDiego Rocha | 1 | 3947.90\nBruno Souza | 2 | 2288.70\n```',
    dicas: [
      'Monte mapas de pedido por id e de nome por id de cliente: são as junções.',
      'Percorra os itens, pule os de pedidos cancelados e acumule com `merge(nome, valor, BigDecimal::add)`.',
      'Para contar pedidos distintos, guarde um `Set<Integer>` de ids por cliente.',
      'Compare `BigDecimal` com `compareTo`, e ordene com `Comparator.comparing(...).reversed()`.',
    ],
    solucao: `import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Faturamento {
    record Cliente(int id, String nome) {}

    record Pedido(int id, int clienteId, String status) {}

    record Item(int pedidoId, int quantidade, BigDecimal precoUnitario) {}

    record Linha(String nome, int pedidos, BigDecimal gasto) {}

    static final List<Cliente> CLIENTES = List.of(new Cliente(1, "Ana Lima"), new Cliente(2, "Bruno Souza"),
            new Cliente(3, "Carla Dias"), new Cliente(4, "Diego Rocha"), new Cliente(5, "Elisa Prado"));

    static final List<Pedido> PEDIDOS = List.of(new Pedido(101, 1, "ENTREGUE"), new Pedido(102, 2, "ENTREGUE"),
            new Pedido(103, 1, "PAGO"), new Pedido(104, 3, "CANCELADO"), new Pedido(105, 4, "PAGO"),
            new Pedido(106, 2, "AGUARDANDO"));

    static final List<Item> ITENS = List.of(
            new Item(101, 1, new BigDecimal("349.90")), new Item(101, 2, new BigDecimal("129.90")),
            new Item(102, 1, new BigDecimal("1899.00")), new Item(103, 1, new BigDecimal("259.90")),
            new Item(103, 1, new BigDecimal("119.90")), new Item(104, 1, new BigDecimal("219.00")),
            new Item(105, 1, new BigDecimal("349.90")), new Item(105, 2, new BigDecimal("1799.00")),
            new Item(106, 3, new BigDecimal("129.90")));

    static List<Linha> relatorio(BigDecimal minimo) {
        Map<Integer, Pedido> pedidoPorId = new HashMap<>();
        PEDIDOS.forEach(p -> pedidoPorId.put(p.id(), p));
        Map<Integer, String> nomePorId = new HashMap<>();
        CLIENTES.forEach(c -> nomePorId.put(c.id(), c.nome()));

        Map<String, BigDecimal> gasto = new HashMap<>();
        Map<String, Set<Integer>> pedidos = new HashMap<>();
        for (Item i : ITENS) {
            Pedido p = pedidoPorId.get(i.pedidoId());
            if (p.status().equals("CANCELADO")) continue;
            String nome = nomePorId.get(p.clienteId());
            gasto.merge(nome, i.precoUnitario().multiply(BigDecimal.valueOf(i.quantidade())), BigDecimal::add);
            pedidos.computeIfAbsent(nome, k -> new HashSet<>()).add(p.id());
        }
        return gasto.entrySet().stream()
                .filter(e -> e.getValue().compareTo(minimo) > 0)
                .map(e -> new Linha(e.getKey(), pedidos.get(e.getKey()).size(), e.getValue()))
                .sorted(Comparator.comparing(Linha::gasto).reversed())
                .toList();
    }

    public static void main(String[] args) {
        for (Linha l : relatorio(new BigDecimal("1000"))) {
            System.out.println(l.nome() + " | " + l.pedidos() + " | " + l.gasto());
        }
    }
}`,
    saida: 'Diego Rocha | 1 | 3947.90\nBruno Souza | 2 | 2288.70',
    comentarios:
      'O resultado coincide com o do banco, linha por linha. A Ana gastou 989,50 e fica de fora pelo filtro de grupo; a Carla só tem um pedido cancelado e nem chega a formar grupo, porque o filtro de linha vem antes. O `Set` de ids é o `COUNT(DISTINCT p.id)`: sem ele, o Bruno apareceria com três pedidos, um por item. E o `BigDecimal` mantém os centavos exatos, o que um `double` não garantiria numa soma de muitos valores. Em produção, essa conta fica no banco: trazer todos os itens para a memória da aplicação só para somá-los é desperdício de rede e de memória.',
  },
  exercicios: [
    {
      id: 'backend-junior-t3-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Numa tabela com 5 clientes, um deles sem cidade, quanto vale `COUNT(cidade)`?',
      opcoes: ['4', '5', '1', '0'],
      resposta: 0,
      explicacao: '`COUNT(coluna)` ignora os nulos. `COUNT(*)` contaria as 5 linhas.',
    },
    {
      id: 'backend-junior-t3-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual consulta lista os status com mais de um pedido?',
      opcoes: [
        '`SELECT status FROM pedidos GROUP BY status HAVING COUNT(*) > 1`',
        '`SELECT status FROM pedidos WHERE COUNT(*) > 1 GROUP BY status`',
        '`SELECT status FROM pedidos HAVING status > 1`',
        '`SELECT DISTINCT status FROM pedidos WHERE COUNT(status) > 1`',
      ],
      resposta: 0,
      explicacao: 'A contagem só existe depois do agrupamento, e por isso o filtro vai no `HAVING`. O `WHERE` atua sobre linhas e não aceita agregações.',
    },
    {
      id: 'backend-junior-t3-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o PostgreSQL recusa `SELECT cliente_id, status, COUNT(*) FROM pedidos GROUP BY cliente_id`?',
      opcoes: [
        'Porque `status` não está no `GROUP BY` nem numa agregação, e um cliente pode ter vários status',
        'Porque `COUNT(*)` não pode ser usado com `GROUP BY`',
        'Porque falta um `ORDER BY`',
        'Porque `cliente_id` é uma chave estrangeira',
      ],
      resposta: 0,
      explicacao: 'Para cada grupo, o banco precisaria escolher um status entre vários. Ou `status` entra no `GROUP BY`, formando grupos por cliente e status, ou vai para uma agregação, como `MAX(status)`.',
    },
    {
      id: 'backend-junior-t3-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num `clientes LEFT JOIN pedidos ... GROUP BY c.nome`, a cliente Elisa não tem pedidos. Quanto valem `COUNT(*)` e `COUNT(p.id)` para ela?',
      opcoes: ['1 e 0', '0 e 0', '1 e 1', '0 e 1'],
      resposta: 0,
      explicacao: 'O LEFT JOIN gera uma linha para ela, com `p.id` nulo. `COUNT(*)` conta a linha; `COUNT(p.id)` ignora o nulo.',
    },
    {
      id: 'backend-junior-t3-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A categoria Cadeiras não tem produtos. Num `categorias LEFT JOIN produtos ... GROUP BY ca.nome`, quanto vale `SUM(pr.estoque)` para ela?',
      opcoes: ['`NULL`', '0', '1', 'A consulta dá erro'],
      resposta: 0,
      explicacao: 'A soma de nenhum valor é `NULL`. Para mostrar zero, `COALESCE(SUM(pr.estoque), 0)`.',
    },
    {
      id: 'backend-junior-t3-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Depois de juntar `pedidos` com `itens_pedido`, um relatório usa `COUNT(*)` para mostrar quantos pedidos cada cliente fez, e o Bruno aparece com 3, embora tenha 2 pedidos. Qual é a correção?',
      opcoes: [
        '`COUNT(DISTINCT p.id)`',
        '`COUNT(p.cliente_id)`',
        '`SUM(1)`',
        '`COUNT(*) / 2`',
      ],
      resposta: 0,
      explicacao: 'A junção repete o pedido uma vez por item. Contar os ids distintos de pedido devolve o número certo, seja qual for a quantidade de itens.',
    },
    {
      id: 'backend-junior-t3-e03-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em que ordem lógica as cláusulas de uma consulta com agrupamento são avaliadas?',
      opcoes: [
        '`FROM`, `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `ORDER BY`',
        '`SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`',
        '`FROM`, `GROUP BY`, `WHERE`, `HAVING`, `SELECT`, `ORDER BY`',
        '`FROM`, `WHERE`, `SELECT`, `GROUP BY`, `ORDER BY`, `HAVING`',
      ],
      resposta: 0,
      explicacao: 'Por isso o `WHERE` não vê agregações, e o `ORDER BY` pode usar os apelidos do `SELECT`.',
    },
    {
      id: 'backend-junior-t3-e03-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre as funções de agregação são verdadeiras? Escolha duas.',
      opcoes: [
        '`AVG` ignora os nulos, e calcula a média só dos valores presentes',
        '`COUNT(DISTINCT cidade)` não conta os nulos',
        '`SUM` trata nulos como zero e devolve sempre um número',
        '`MAX` de uma coluna de texto dá erro',
        '`COUNT(*)` ignora as linhas em que alguma coluna é nula',
      ],
      respostas: [0, 1],
      explicacao: 'Só o `COUNT(*)` olha as linhas inteiras. `SUM` de nenhum valor é `NULL`, e `MAX` funciona com texto, pela ordem alfabética.',
    },
    {
      id: 'backend-junior-t3-e03-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa agrupa pedidos por status, como um `GROUP BY`. Digite a saída exata.',
      codigo: `import java.util.*;
import java.util.stream.*;

public class Teste {
    public static void main(String[] args) {
        List<String> status = List.of("PAGO", "ENTREGUE", "PAGO", "CANCELADO", "PAGO");
        Map<String, Long> contagem = status.stream()
                .collect(Collectors.groupingBy(s -> s, TreeMap::new, Collectors.counting()));
        System.out.println(contagem);
    }
}`,
      resposta: '{CANCELADO=1, ENTREGUE=1, PAGO=3}',
      explicacao: 'O `TreeMap` ordena as chaves, como um `ORDER BY status`. Com o `HashMap` padrão do `groupingBy`, a ordem não seria garantida, como num `GROUP BY` sem `ORDER BY`.',
    },
    {
      id: 'backend-junior-t3-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> estoques = Arrays.asList(10, null, 20, null);
        long contaTudo = estoques.size();
        long contaValores = estoques.stream().filter(Objects::nonNull).count();
        double media = estoques.stream().filter(Objects::nonNull).mapToInt(Integer::intValue).average().orElse(0);
        System.out.println(contaTudo + " " + contaValores + " " + media);
    }
}`,
      opcoes: ['`4 2 15.0`', '`4 4 7.5`', '`2 2 15.0`', '`4 2 7.5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'É exatamente o que o SQL faz: `COUNT(*)` conta 4 linhas, `COUNT(estoque)` conta 2 valores, e `AVG(estoque)` divide 30 por 2, ignorando os nulos.',
    },
    {
      id: 'backend-junior-t3-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Que valor `rs.getInt("unidades")` devolve quando a coluna veio `NULL` de um `SUM`?',
      opcoes: [
        '0, e `rs.wasNull()` passa a devolver `true`',
        '`null`',
        'Lança `SQLException`',
        'Lança `NullPointerException`',
      ],
      resposta: 0,
      explicacao: 'Um `int` primitivo não pode ser nulo. Para distinguir "zero" de "sem valor", use `wasNull()`, `getObject("unidades", Integer.class)` ou um `COALESCE` na consulta.',
    },
    {
      id: 'backend-junior-t3-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como obter o pedido mais recente de cada cliente, com todas as colunas do pedido?',
      opcoes: [
        'Numerar os pedidos com `ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY criado_em DESC)` numa subconsulta e filtrar o número 1',
        '`SELECT *, MAX(criado_em) FROM pedidos GROUP BY cliente_id`',
        '`SELECT * FROM pedidos ORDER BY criado_em DESC LIMIT 1`',
        '`SELECT DISTINCT cliente_id, * FROM pedidos`',
      ],
      resposta: 0,
      explicacao: 'O `GROUP BY` não permite as outras colunas, e o `LIMIT 1` traria um pedido só, de um cliente só. A função de janela numera dentro de cada cliente.',
    },
    {
      id: 'backend-junior-t3-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre `SUM(total) OVER (ORDER BY id)` e `SUM(total)` com `GROUP BY`?',
      opcoes: [
        'A função de janela devolve uma linha para cada linha, com a soma acumulada até ela; o `GROUP BY` junta as linhas numa por grupo',
        'São equivalentes',
        'A função de janela só funciona com datas',
        'O `GROUP BY` calcula a soma acumulada',
      ],
      resposta: 0,
      explicacao: 'As funções de janela calculam sobre um conjunto de linhas sem eliminá-las do resultado.',
    },
    {
      id: 'backend-junior-t3-e03-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A tela mostra o preço médio com 12 casas decimais. Como exibir com duas?',
      opcoes: ['`ROUND(AVG(preco), 2)`', '`AVG(ROUND(preco))`', '`AVG(preco, 2)`', '`CAST(AVG(preco) AS INT)`'],
      resposta: 0,
      explicacao: 'Arredonde o resultado, não os valores de entrada: `AVG(ROUND(preco))` arredonda cada preço antes da média e muda o resultado.',
    },
    {
      id: 'backend-junior-t3-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que é melhor calcular o faturamento por cliente com `GROUP BY` no banco do que trazer todos os itens para o Java e somar lá?',
      opcoes: [
        'Porque o banco devolve só uma linha por cliente, em vez de milhares de itens pela rede e na memória da aplicação',
        'Porque o Java não sabe somar `BigDecimal`',
        'Porque o resultado em Java seria diferente',
        'Não há diferença',
      ],
      resposta: 0,
      explicacao: 'O resultado é o mesmo, mas o custo não. O banco faz a conta perto dos dados, muitas vezes usando índices, e transfere só o resumo.',
    },
  ],
};

export default episodio;
