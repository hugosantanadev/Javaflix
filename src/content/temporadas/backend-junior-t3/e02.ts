import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t3-e02',
  minutos: 17,
  aula,
  armadilhas: [
    'O INNER JOIN some com as linhas sem par: clientes sem pedidos não aparecem.',
    'Num LEFT JOIN, uma condição sobre a tabela da direita no `WHERE` o transforma num INNER JOIN.',
    'A sintaxe com vírgula sem `WHERE` produz o produto cartesiano de todas as linhas.',
    'Em junções de um para muitos, a linha do "um" se repete: somar uma coluna dela depois de juntar conta várias vezes.',
    'Colunas com o mesmo nome nas duas tabelas, como `id`, precisam do apelido da tabela.',
    '`NOT IN` com subconsulta que devolve nulo não encontra nada; prefira `NOT EXISTS`.',
    'Junção entre tabelas grandes sem índice na coluna do `ON` é uma das causas mais comuns de lentidão.',
  ],
  recursos: [
    {
      titulo: 'Documentação do PostgreSQL: Joined Tables',
      url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN',
      tipo: 'documentacao',
      porque: 'Todos os tipos de JOIN, com o efeito de `ON` e `WHERE` explicado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Joins Between Tables (tutorial)',
      url: 'https://www.postgresql.org/docs/current/tutorial-join.html',
      tipo: 'tutorial',
      porque: 'A introdução do tutorial oficial, com INNER, OUTER e a junção de uma tabela com ela mesma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Subquery Expressions',
      url: 'https://www.postgresql.org/docs/current/functions-subquery.html',
      tipo: 'documentacao',
      porque: '`EXISTS`, `IN` e `NOT IN`, com o comportamento diante de nulos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Use The Index, Luke: The Join Operation',
      url: 'https://use-the-index-luke.com/sql/join',
      tipo: 'artigo',
      porque: 'Laços aninhados, *hash join* e *merge join*, e que índices cada um precisa.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'SQLBolt: Multi-table queries with JOINs',
      url: 'https://sqlbolt.com/lesson/select_queries_with_joins',
      tipo: 'curso',
      porque: 'Exercícios interativos de INNER JOIN no navegador, seguidos dos de OUTER JOIN.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Cod3r: Conheça os JOINs do SQL',
      url: 'https://www.youtube.com/watch?v=165r4qUvp8Q',
      tipo: 'video',
      porque: 'INNER, OUTER, FULL, *semi join* e anti-junção, com diagramas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: INNER JOIN com várias tabelas',
      url: 'https://www.youtube.com/watch?v=jx2ne8iZMOA',
      tipo: 'video',
      porque: 'Junções encadeadas passo a passo, numa aula longa e detalhada, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Canal TI: SQL Joins nunca foram tão fáceis',
      url: 'https://www.youtube.com/watch?v=Lt8Hry6N334',
      tipo: 'video',
      porque: 'INNER, LEFT, RIGHT e FULL em menos de seis minutos, com exemplos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Bóson Treinamentos: LEFT e RIGHT JOIN',
      url: 'https://www.youtube.com/watch?v=4m3HNtsFRoI',
      tipo: 'video',
      porque: 'As junções externas na prática, com as linhas sem par, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'LEFT JOIN em Java',
    enunciado:
      'Implemente um `leftJoin(condicaoNoOn)` entre as listas de clientes e de pedidos da aula, usando um mapa de pedidos por cliente, como um *hash join*. A condição extra é aplicada **antes** do casamento, como no `ON`; clientes sem nenhum pedido que passe nela aparecem com `NULL`. Ordene por nome do cliente e id do pedido. Com ele, reproduza as quatro consultas da aula: o LEFT JOIN simples, a anti-junção, o status no `WHERE` (filtrando o resultado depois) e o status no `ON`. A saída deve ser:\n\n```text\nLEFT JOIN:\n  Ana Lima | 101 ENTREGUE\n  Ana Lima | 103 PAGO\n  Bruno Souza | 102 ENTREGUE\n  Bruno Souza | 106 AGUARDANDO\n  Carla Dias | 104 CANCELADO\n  Diego Rocha | 105 PAGO\n  Elisa Prado | NULL\nanti-junção (sem pedidos):\n  Elisa Prado | NULL\nstatus no WHERE:\n  Ana Lima | 103 PAGO\n  Diego Rocha | 105 PAGO\nstatus no ON:\n  Ana Lima | 103 PAGO\n  Bruno Souza | NULL\n  Carla Dias | NULL\n  Diego Rocha | 105 PAGO\n  Elisa Prado | NULL\n```',
    dicas: [
      '`computeIfAbsent(clienteId, k -> new ArrayList<>()).add(pedido)` monta o mapa de pedidos por cliente.',
      'Aplique a condição do `ON` ao montar o mapa: pedidos que não passam nela nem entram.',
      'Para cada cliente, se a lista dele estiver vazia, gere uma linha com pedido `null`; senão, uma linha por pedido.',
      'O "status no `WHERE`" é um `filter` sobre o resultado do LEFT JOIN simples, e o `null` não passa nele.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

public class Juntar {
    record Cliente(int id, String nome) {}

    record Pedido(int id, int clienteId, String status) {}

    record Linha(Cliente cliente, Pedido pedido) {
        @Override
        public String toString() {
            return cliente.nome() + " | " + (pedido == null ? "NULL" : pedido.id() + " " + pedido.status());
        }
    }

    static final List<Cliente> CLIENTES = List.of(new Cliente(1, "Ana Lima"), new Cliente(2, "Bruno Souza"),
            new Cliente(3, "Carla Dias"), new Cliente(4, "Diego Rocha"), new Cliente(5, "Elisa Prado"));

    static final List<Pedido> PEDIDOS = List.of(new Pedido(101, 1, "ENTREGUE"), new Pedido(102, 2, "ENTREGUE"),
            new Pedido(103, 1, "PAGO"), new Pedido(104, 3, "CANCELADO"), new Pedido(105, 4, "PAGO"),
            new Pedido(106, 2, "AGUARDANDO"));

    /** clientes LEFT JOIN pedidos ON pedido.cliente_id = cliente.id AND condicaoNoOn */
    static List<Linha> leftJoin(Predicate<Pedido> condicaoNoOn) {
        Map<Integer, List<Pedido>> porCliente = new HashMap<>();
        for (Pedido p : PEDIDOS) {
            if (condicaoNoOn.test(p)) porCliente.computeIfAbsent(p.clienteId(), k -> new ArrayList<>()).add(p);
        }
        List<Linha> linhas = new ArrayList<>();
        for (Cliente c : CLIENTES) {
            List<Pedido> dele = porCliente.getOrDefault(c.id(), List.of());
            if (dele.isEmpty()) linhas.add(new Linha(c, null));
            for (Pedido p : dele) linhas.add(new Linha(c, p));
        }
        linhas.sort(Comparator.comparing((Linha l) -> l.cliente().nome())
                .thenComparing(l -> l.pedido() == null ? Integer.MAX_VALUE : l.pedido().id()));
        return linhas;
    }

    static void imprimir(String titulo, List<Linha> linhas) {
        System.out.println(titulo);
        linhas.forEach(l -> System.out.println("  " + l));
    }

    public static void main(String[] args) {
        imprimir("LEFT JOIN:", leftJoin(p -> true));
        imprimir("anti-junção (sem pedidos):", leftJoin(p -> true).stream().filter(l -> l.pedido() == null).toList());
        imprimir("status no WHERE:", leftJoin(p -> true).stream()
                .filter(l -> l.pedido() != null && l.pedido().status().equals("PAGO")).toList());
        imprimir("status no ON:", leftJoin(p -> p.status().equals("PAGO")));
    }
}`,
    saida: 'LEFT JOIN:\n  Ana Lima | 101 ENTREGUE\n  Ana Lima | 103 PAGO\n  Bruno Souza | 102 ENTREGUE\n  Bruno Souza | 106 AGUARDANDO\n  Carla Dias | 104 CANCELADO\n  Diego Rocha | 105 PAGO\n  Elisa Prado | NULL\nanti-junção (sem pedidos):\n  Elisa Prado | NULL\nstatus no WHERE:\n  Ana Lima | 103 PAGO\n  Diego Rocha | 105 PAGO\nstatus no ON:\n  Ana Lima | 103 PAGO\n  Bruno Souza | NULL\n  Carla Dias | NULL\n  Diego Rocha | 105 PAGO\n  Elisa Prado | NULL',
    comentarios:
      'O código mostra por que a posição da condição importa. No `ON`, ela age enquanto as linhas são casadas: um cliente sem pedido pago fica sem par e ganha o `NULL`, mas continua lá. No `WHERE`, ela age sobre o resultado já pronto, e as linhas com `NULL` simplesmente não passam no teste. O mapa por `clienteId` é exatamente a estrutura que um *hash join* monta em memória; a diferença é que o banco escolhe sozinho qual tabela vira o mapa, normalmente a menor, e, se ela não couber na memória, divide o trabalho em partes gravadas em disco.',
  },
  exercicios: [
    {
      id: 'backend-junior-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A cliente Elisa não tem pedidos. Qual consulta a inclui no resultado?',
      opcoes: [
        '`SELECT c.nome, p.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id`',
        '`SELECT c.nome, p.id FROM clientes c JOIN pedidos p ON p.cliente_id = c.id`',
        '`SELECT c.nome, p.id FROM clientes c INNER JOIN pedidos p ON p.cliente_id = c.id`',
        'Nenhuma: clientes sem pedidos nunca aparecem num JOIN',
      ],
      resposta: 0,
      explicacao: 'O LEFT JOIN mantém todas as linhas da esquerda e preenche `p.id` com `NULL`. `JOIN` e `INNER JOIN` são a mesma coisa.',
    },
    {
      id: 'backend-junior-t3-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na loja da aula, os produtos 1 a 5 aparecem em algum item de pedido, e o 6 (Monitor 24), em nenhum. O que devolve `SELECT pr.nome FROM produtos pr LEFT JOIN itens_pedido i ON i.produto_id = pr.id WHERE i.produto_id IS NULL`?',
      opcoes: ['Só o Monitor 24', 'Todos os produtos', 'Nenhum produto', 'Os produtos 1 a 5'],
      resposta: 0,
      explicacao: 'É a anti-junção: só os produtos que ficaram sem par, com as colunas de `itens_pedido` nulas.',
    },
    {
      id: 'backend-junior-t3-e02-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A consulta `SELECT c.nome, p.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id WHERE p.criado_em >= DATE \'2025-09-10\'` deveria listar todos os clientes, com os pedidos recentes quando houver. Por que alguns clientes somem, e como corrigir?',
      opcoes: [
        'O `WHERE` descarta as linhas com `p.criado_em` nulo ou antigo; a condição deve ir para o `ON`',
        'O LEFT JOIN não aceita datas',
        'Falta um `ORDER BY`',
        'Falta um `GROUP BY c.nome`',
      ],
      resposta: 0,
      explicacao: 'Com `ON p.cliente_id = c.id AND p.criado_em >= DATE \'2025-09-10\'`, a data faz parte do casamento, e os clientes sem pedido recente ficam com `NULL`.',
    },
    {
      id: 'backend-junior-t3-e02-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas linhas `SELECT * FROM clientes CROSS JOIN pedidos` devolve, com 5 clientes e 6 pedidos?',
      opcoes: ['30', '11', '6', '5'],
      resposta: 0,
      explicacao: 'O CROSS JOIN combina cada cliente com cada pedido: 5 × 6.',
    },
    {
      id: 'backend-junior-t3-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um relatório antigo usa `FROM pedidos, clientes WHERE pedidos.status = \'PAGO\'` e mostra cada pedido pago repetido cinco vezes. Por quê?',
      opcoes: [
        'Faltou a condição que liga as tabelas, e cada pedido foi combinado com todos os clientes',
        'O status está duplicado na tabela',
        'A vírgula soma as tabelas',
        'Porque não há índice em `status`',
      ],
      resposta: 0,
      explicacao: 'Sem `pedidos.cliente_id = clientes.id`, a vírgula produz o produto cartesiano. Com `JOIN ... ON`, a condição de ligação fica explícita e difícil de esquecer.',
    },
    {
      id: 'backend-junior-t3-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual consulta é equivalente a `SELECT ... FROM produtos pr RIGHT JOIN categorias ca ON ca.id = pr.categoria_id`?',
      opcoes: [
        '`SELECT ... FROM categorias ca LEFT JOIN produtos pr ON ca.id = pr.categoria_id`',
        '`SELECT ... FROM produtos pr LEFT JOIN categorias ca ON ca.id = pr.categoria_id`',
        '`SELECT ... FROM produtos pr JOIN categorias ca ON ca.id = pr.categoria_id`',
        '`SELECT ... FROM categorias ca CROSS JOIN produtos pr`',
      ],
      resposta: 0,
      explicacao: 'Trocar as tabelas de lado transforma um RIGHT num LEFT. É por isso que o RIGHT JOIN é raro: o LEFT é mais fácil de ler.',
    },
    {
      id: 'backend-junior-t3-e02-q07',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'No FULL OUTER JOIN entre `produtos` e `categorias` da aula, quais linhas aparecem que um INNER JOIN não mostraria? Escolha duas.',
      opcoes: [
        'A Webcam Full HD, com categoria nula',
        'A categoria Cadeiras, com produto nulo',
        'O Teclado mecânico, com a categoria Periféricos',
        'O Monitor 27, com a categoria Monitores',
        'Uma linha toda nula',
      ],
      respostas: [0, 1],
      explicacao: 'O FULL mantém as linhas sem par dos dois lados. Teclado e Monitor têm par e apareceriam em qualquer junção.',
    },
    {
      id: 'backend-junior-t3-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa faz um LEFT JOIN de clientes com pedidos usando um mapa. Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> clientes = List.of(1, 2, 3, 4);
        List<int[]> pedidos = List.of(new int[] {101, 1}, new int[] {102, 1}, new int[] {103, 3});
        Map<Integer, List<Integer>> porCliente = new HashMap<>();
        for (int[] p : pedidos) porCliente.computeIfAbsent(p[1], k -> new ArrayList<>()).add(p[0]);
        int linhas = 0;
        for (int c : clientes) {
            List<Integer> dele = porCliente.getOrDefault(c, List.of());
            linhas += dele.isEmpty() ? 1 : dele.size();
        }
        System.out.println(linhas);
    }
}`,
      opcoes: ['`5`', '`3`', '`4`', '`7`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O cliente 1 gera duas linhas, o 3 gera uma, e os clientes 2 e 4, sem pedidos, geram uma cada, com `NULL`.',
    },
    {
      id: 'backend-junior-t3-e02-q09',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Uma junção por laços aninhados, sem índice, compara cada linha de uma tabela com cada linha da outra. Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        int[] pedidos = {101, 102, 103, 104};
        int[] clientes = {1, 2, 3};
        int comparacoes = 0;
        for (int p : pedidos) {
            for (int c : clientes) {
                comparacoes++;
            }
        }
        System.out.println(comparacoes);
    }
}`,
      resposta: '12',
      explicacao: '4 × 3. Com um milhão de linhas de cada lado, seriam um trilhão de comparações, por isso o banco usa índices ou *hash join*.',
    },
    {
      id: 'backend-junior-t3-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na junção de `clientes` com ela mesma para achar pares da mesma cidade, para que serve o `a.id < b.id` no `ON`?',
      opcoes: [
        'Para não parear um cliente com ele mesmo nem repetir o mesmo par invertido',
        'Para ordenar o resultado',
        'Para melhorar o desempenho, sem mudar o resultado',
        'É obrigatório em toda junção de uma tabela com ela mesma',
      ],
      resposta: 0,
      explicacao: 'Sem ele, Ana apareceria pareada com Ana, e o par Ana e Carla apareceria também como Carla e Ana.',
    },
    {
      id: 'backend-junior-t3-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A tabela `pedidos` tem a coluna `frete`. Um relatório faz `SELECT SUM(p.frete) FROM pedidos p JOIN itens_pedido i ON i.pedido_id = p.id`. O que há de errado?',
      opcoes: [
        'O frete de cada pedido é somado uma vez por item, porque a junção repete a linha do pedido',
        'Nada: o `SUM` ignora linhas repetidas',
        'O `SUM` não funciona com JOIN',
        'O frete precisa estar em `itens_pedido`',
      ],
      resposta: 0,
      explicacao: 'Um pedido com três itens aparece três vezes. Some o frete direto de `pedidos`, ou agregue os itens numa subconsulta antes de juntar.',
    },
    {
      id: 'backend-junior-t3-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que `NOT EXISTS` é preferível a `NOT IN` para encontrar clientes sem pedidos, quando a subconsulta pode ter nulos?',
      opcoes: [
        'Porque o `NOT EXISTS` só pergunta se existe uma linha, e não é afetado pela lógica de três valores',
        'Porque o `NOT IN` não aceita subconsultas',
        'Porque o `NOT EXISTS` é sempre mais rápido',
        'Não há diferença de resultado',
      ],
      resposta: 0,
      explicacao: 'Um único nulo na lista do `NOT IN` torna a condição desconhecida para todas as linhas, e o resultado fica vazio.',
    },
    {
      id: 'backend-junior-t3-e02-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que acontece com `SELECT id, nome FROM pedidos p JOIN clientes c ON c.id = p.cliente_id`?',
      opcoes: [
        'Erro: a coluna `id` é ambígua, porque existe nas duas tabelas',
        'Devolve o `id` do pedido',
        'Devolve o `id` do cliente',
        'Devolve as duas colunas `id`',
      ],
      resposta: 0,
      explicacao: 'O banco não adivinha qual `id` você quer. Escreva `p.id` ou `c.id`, e de preferência qualifique todas as colunas numa junção.',
    },
    {
      id: 'backend-junior-t3-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A consulta busca os itens de **um** pedido, e `itens_pedido` tem um índice por `pedido_id`. Que algoritmo de junção o otimizador provavelmente escolhe?',
      opcoes: [
        'Laços aninhados, usando o índice para achar os poucos itens',
        '*Hash join*, montando um *hash* com a tabela inteira de itens',
        'Produto cartesiano',
        '*Merge join*, ordenando as duas tabelas inteiras',
      ],
      resposta: 0,
      explicacao: 'Com poucas linhas de um lado e um índice do outro, cada busca é instantânea. *Hash* e *merge* compensam quando as duas entradas são grandes.',
    },
    {
      id: 'backend-junior-t3-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que `itens_pedido` guarda o `preco_unitario`, se o preço já está em `produtos`?',
      opcoes: [
        'Porque o preço do produto muda, e o pedido precisa registrar o preço do momento da compra',
        'Por desempenho, para evitar o JOIN',
        'É uma duplicação desnecessária, que deveria ser removida',
        'Porque o banco não permite JOIN com `produtos`',
      ],
      resposta: 0,
      explicacao: 'O Mouse custava 119,90 no pedido 103 e custa 129,90 hoje. Sem a cópia, o histórico dos pedidos mudaria a cada reajuste.',
    },
  ],
};

export default episodio;
