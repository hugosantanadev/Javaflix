import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T3: SQL. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t3-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A coluna `desconto` é `NULL` nos produtos sem promoção, e alguns têm desconto 0. Qual consulta lista **todos** os produtos sem desconto?',
    opcoes: [
      '`SELECT nome FROM produtos WHERE COALESCE(desconto, 0) = 0`',
      '`SELECT nome FROM produtos WHERE desconto = 0`',
      '`SELECT nome FROM produtos WHERE desconto = NULL OR desconto = 0`',
      '`SELECT nome FROM produtos WHERE NOT desconto > 0`',
    ],
    resposta: 0,
    explicacao: 'O `COALESCE` transforma o nulo em 0 antes da comparação. As outras deixam os nulos de fora: `= NULL` nunca é verdadeiro, e `NOT (NULL > 0)` é desconhecido.',
  },
  {
    id: 'backend-junior-t3-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Com os produtos da temporada (Monitor 27 a 1.899,00, Monitor 24 a 1.099,00, Teclado a 349,90 e os demais mais baratos), o que devolve `SELECT nome FROM produtos ORDER BY preco DESC LIMIT 1 OFFSET 1`?',
    opcoes: ['Monitor 24', 'Monitor 27', 'Teclado mecânico', 'Nenhuma linha'],
    resposta: 0,
    explicacao: 'O `OFFSET 1` pula o mais caro, e o `LIMIT 1` pega o seguinte: o segundo mais caro.',
  },
  {
    id: 'backend-junior-t3-prova-q03',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: '`WHERE preco BETWEEN 100 AND 400` inclui um produto de exatamente 400,00?',
    opcoes: [
      'Sim: o `BETWEEN` inclui as duas pontas',
      'Não: o `BETWEEN` exclui as pontas',
      'Só se o preço for inteiro',
      'Depende do banco',
    ],
    resposta: 0,
    explicacao: 'É o mesmo que `preco >= 100 AND preco <= 400`. Com datas e horários, essa inclusão da ponta superior costuma surpreender.',
  },
  {
    id: 'backend-junior-t3-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O programa converte um padrão de `LIKE` numa expressão regular do Java. Qual é a saída?',
    codigo: `import java.util.List;

public class Teste {
    public static void main(String[] args) {
        String like = "M_n%";
        String regex = like.replace("_", ".").replace("%", ".*");
        List<String> nomes = List.of("Monitor 27", "Mouse sem fio", "Mini teclado", "Headset");
        System.out.println(nomes.stream().filter(n -> n.matches(regex)).toList());
    }
}`,
    opcoes: ['`[Monitor 27, Mini teclado]`', '`[Monitor 27, Mouse sem fio, Mini teclado]`', '`[Monitor 27]`', '`[]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `_` aceita exatamente um caractere, e o `%`, qualquer sequência. "Mouse" tem "u" na terceira posição, onde o padrão exige "n".',
  },
  {
    id: 'backend-junior-t3-prova-q05',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'A consulta deveria listar todas as categorias com a quantidade de produtos em estoque, inclusive as vazias: `SELECT ca.nome, COUNT(pr.id) FROM categorias ca LEFT JOIN produtos pr ON pr.categoria_id = ca.id WHERE pr.estoque > 0 GROUP BY ca.nome`. As categorias sem produtos em estoque somem. Qual é a correção?',
    opcoes: [
      'Levar `pr.estoque > 0` para o `ON` do LEFT JOIN',
      'Trocar `COUNT(pr.id)` por `COUNT(*)`',
      'Trocar o LEFT JOIN por um INNER JOIN',
      'Acrescentar `ORDER BY ca.nome`',
    ],
    resposta: 0,
    explicacao: 'No `WHERE`, a condição descarta as linhas com `pr.estoque` nulo, e o LEFT vira INNER. No `ON`, ela só define quais produtos casam. E o `COUNT(*)` contaria 1 para as categorias vazias.',
  },
  {
    id: 'backend-junior-t3-prova-q06',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Há 5 clientes e 6 pedidos, todos de clientes existentes; uma cliente não tem pedidos. Quantas linhas `SELECT * FROM pedidos p JOIN clientes c ON c.id = p.cliente_id` devolve?',
    opcoes: ['6', '5', '7', '30'],
    resposta: 0,
    explicacao: 'O INNER JOIN devolve uma linha por pedido, com o seu cliente. A cliente sem pedidos não aparece; com um LEFT JOIN a partir de clientes, seriam 7.',
  },
  {
    id: 'backend-junior-t3-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual consulta lista os produtos que nunca foram vendidos, sem risco de errar por causa de nulos?',
    opcoes: [
      '`SELECT nome FROM produtos pr WHERE NOT EXISTS (SELECT 1 FROM itens_pedido i WHERE i.produto_id = pr.id)`',
      '`SELECT nome FROM produtos WHERE id NOT IN (SELECT produto_id FROM itens_pedido)`, sempre',
      '`SELECT nome FROM produtos pr JOIN itens_pedido i ON i.produto_id = pr.id WHERE i.produto_id IS NULL`',
      '`SELECT nome FROM produtos WHERE id <> ALL (NULL)`',
    ],
    resposta: 0,
    explicacao: 'O `NOT IN` falha se a subconsulta tiver um nulo. O INNER JOIN da terceira opção nunca produz `i.produto_id` nulo, e devolveria nada.',
  },
  {
    id: 'backend-junior-t3-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Dois pedidos têm frete de 10 e 20; o primeiro tem 3 itens, e o segundo, 1. O programa soma o frete depois de "juntar" pedidos e itens, e depois direto. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<Integer, Integer> frete = Map.of(1, 10, 2, 20);
        List<Integer> itensDoPedido = List.of(1, 1, 1, 2);
        int depoisDaJuncao = 0;
        for (int pedido : itensDoPedido) depoisDaJuncao += frete.get(pedido);
        int direto = frete.values().stream().mapToInt(Integer::intValue).sum();
        System.out.println(depoisDaJuncao + " " + direto);
    }
}`,
    opcoes: ['`50 30`', '`30 30`', '`50 50`', '`40 30`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A junção repete o pedido 1 três vezes, e o frete dele é somado três vezes. Some colunas do pedido sem juntar os itens, ou agregue os itens numa subconsulta antes.',
  },
  {
    id: 'backend-junior-t3-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A tabela `pedidos` tem 6 pedidos de 4 clientes diferentes. Quanto valem `COUNT(*)` e `COUNT(DISTINCT cliente_id)`?',
    opcoes: ['6 e 4', '6 e 6', '4 e 4', '4 e 6'],
    resposta: 0,
    explicacao: 'O primeiro conta linhas; o segundo, valores distintos da coluna.',
  },
  {
    id: 'backend-junior-t3-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual consulta lista os clientes com mais de um pedido **pago**?',
    opcoes: [
      "`SELECT cliente_id FROM pedidos WHERE status = 'PAGO' GROUP BY cliente_id HAVING COUNT(*) > 1`",
      "`SELECT cliente_id FROM pedidos GROUP BY cliente_id HAVING COUNT(*) > 1 AND status = 'PAGO'`",
      "`SELECT cliente_id FROM pedidos WHERE COUNT(*) > 1 AND status = 'PAGO'`",
      "`SELECT DISTINCT cliente_id FROM pedidos WHERE status = 'PAGO'`",
    ],
    resposta: 0,
    explicacao: 'O filtro de linha (só os pagos) vai no `WHERE`; o filtro de grupo (mais de um), no `HAVING`. A segunda opção nem é válida, porque `status` não está no `GROUP BY`.',
  },
  {
    id: 'backend-junior-t3-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A coluna `nota` tem os valores 10, `NULL` e 20. Quanto vale `AVG(nota)`?',
    opcoes: ['15', '10', '`NULL`', '30'],
    resposta: 0,
    explicacao: 'As agregações ignoram os nulos: a média é de dois valores, (10 + 20) / 2. Para contar o nulo como zero, `AVG(COALESCE(nota, 0))` daria 10.',
  },
  {
    id: 'backend-junior-t3-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Para listar os três produtos mais vendidos **de cada categoria**, qual recurso do SQL resolve sem consultas separadas por categoria?',
    opcoes: [
      'Uma função de janela, como `ROW_NUMBER() OVER (PARTITION BY categoria_id ORDER BY vendidos DESC)`, filtrando os números até 3',
      '`GROUP BY categoria_id LIMIT 3`',
      '`ORDER BY vendidos DESC LIMIT 3`',
      '`HAVING COUNT(*) <= 3`',
    ],
    resposta: 0,
    explicacao: 'O `LIMIT` vale para o resultado inteiro, não por grupo. A numeração dentro de cada partição permite o "três por categoria".',
  },
  {
    id: 'backend-junior-t3-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'A consulta mais frequente da API é `SELECT ... FROM pedidos WHERE cliente_id = ? ORDER BY criado_em DESC LIMIT 10`. Que índice a atende melhor?',
    opcoes: [
      'Um índice composto em `(cliente_id, criado_em)`',
      'Um índice em `criado_em`',
      'Dois índices separados, um em cada coluna, sempre equivalentes ao composto',
      'Um índice em `status`',
    ],
    resposta: 0,
    explicacao: 'Com a primeira coluna fixada pelo `=`, o índice já entrega os pedidos do cliente ordenados por data, e o banco lê só os 10 primeiros, sem ordenar nada.',
  },
  {
    id: 'backend-junior-t3-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O cadastro tenta inserir um cliente com um e-mail que já existe, e o banco recusa pela restrição `UNIQUE`. Como a API deve responder?',
    opcoes: [
      'Tratar a violação e responder `409 Conflict`, com uma mensagem clara',
      'Deixar a exceção virar `500 Internal Server Error`',
      'Remover a restrição `UNIQUE`',
      'Tentar inserir de novo até funcionar',
    ],
    resposta: 0,
    explicacao: 'A violação é uma situação de negócio prevista, não uma falha do servidor. A restrição continua sendo a garantia de verdade, mesmo com requisições simultâneas.',
  },
  {
    id: 'backend-junior-t3-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Na tabela associativa `produto_tags(produto_id, tag_id)`, por que a chave primária é composta pelas duas colunas?',
    opcoes: [
      'Para impedir que a mesma tag seja ligada duas vezes ao mesmo produto',
      'Porque tabelas associativas não podem ter chave primária',
      'Para que cada produto tenha uma tag só',
      'Para que cada tag pertença a um produto só',
    ],
    resposta: 0,
    explicacao: 'O par (produto, tag) é único, mas cada coluna sozinha se repete: um produto tem várias tags, e uma tag está em vários produtos.',
  },
  {
    id: 'backend-junior-t3-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O `EXPLAIN` de `SELECT * FROM clientes WHERE LOWER(email) = ?` mostra uma varredura completa, embora exista um índice em `email`. Qual é a melhor correção?',
    opcoes: [
      'Criar um índice sobre a expressão `LOWER(email)`, ou guardar o e-mail já em minúsculas',
      'Recriar o índice em `email`',
      'Trocar o `=` por `LIKE`',
      'Acrescentar `ORDER BY email`',
    ],
    resposta: 0,
    explicacao: 'O índice guarda os valores da coluna, não o resultado de uma função sobre ela. Um índice sobre a expressão, ou dados já normalizados, permite a busca direta.',
  },
  {
    id: 'backend-junior-t3-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Num PostgreSQL com o nível padrão, uma transação lê o saldo de uma conta, outra transação o altera e confirma, e a primeira lê de novo. O que ela vê?',
    opcoes: [
      'O valor novo: em READ COMMITTED, cada comando enxerga o que estava confirmado quando ele começou',
      'O valor antigo, sempre',
      'Um erro de leitura',
      'O valor novo só depois de um `COMMIT` da primeira',
    ],
    resposta: 0,
    explicacao: 'É a leitura não repetível, permitida no READ COMMITTED. Em REPEATABLE READ, a segunda leitura repetiria o valor antigo.',
  },
  {
    id: 'backend-junior-t3-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Dois saques simultâneos na mesma conta leem o saldo, calculam o novo valor no Java e gravam. O saldo final ignora um dos saques. Qual é a correção mais direta?',
    opcoes: [
      '`UPDATE contas SET saldo = saldo - ? WHERE id = ? AND saldo >= ?`, conferindo as linhas afetadas',
      'Ler o saldo duas vezes antes de gravar',
      'Usar `READ UNCOMMITTED`',
      'Fazer o cálculo com `double` em vez de `BigDecimal`',
    ],
    resposta: 0,
    explicacao: 'O banco calcula sobre o valor atual e serializa as duas gravações; a condição ainda impede o saldo negativo. `SELECT ... FOR UPDATE` e o controle de versão também resolveriam.',
  },
  {
    id: 'backend-junior-t3-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O programa escolhe a versão visível de uma linha num banco com MVCC: a mais nova criada por uma transação da fotografia. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    record Versao(int valor, int criadaPor) {}

    public static void main(String[] args) {
        List<Versao> versoes = List.of(new Versao(100, 0), new Versao(80, 2), new Versao(60, 3));
        Set<Integer> fotografia = Set.of(0, 2);
        int visto = -1;
        for (Versao v : versoes) {
            if (fotografia.contains(v.criadaPor())) visto = v.valor();
        }
        System.out.println(visto);
    }
}`,
    opcoes: ['`80`', '`60`', '`100`', '`-1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A transação 3, que gravou o 60, não está na fotografia: ou não tinha confirmado quando a fotografia foi tirada, ou começou depois. A versão visível mais nova é a 80.',
  },
  {
    id: 'backend-junior-t3-prova-q20',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'A aplicação recebe, de vez em quando, erros de impasse e de falha de serialização do banco. O que fazer? Escolha dois.',
    opcoes: [
      'Repetir a transação inteira automaticamente, um número limitado de vezes',
      'Bloquear as linhas sempre na mesma ordem, para reduzir os impasses',
      'Ignorar o erro e seguir como se a transação tivesse confirmado',
      'Desligar as restrições de chave estrangeira',
      'Usar `READ UNCOMMITTED` para eliminar os bloqueios',
    ],
    respostas: [0, 1],
    explicacao: 'O banco desfez a transação para proteger os dados, e repeti-la é o tratamento previsto. Mudar a ordem dos bloqueios ataca a causa dos impasses.',
  },
];

export default prova;
