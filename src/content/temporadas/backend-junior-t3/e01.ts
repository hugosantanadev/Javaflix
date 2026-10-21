import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t3-e01',
  minutos: 16,
  aula,
  armadilhas: [
    '`WHERE coluna = NULL` nunca encontra nada: o teste é `IS NULL`.',
    '`WHERE cidade <> \'São Paulo\'` também exclui quem não tem cidade.',
    '`NOT IN` com um `NULL` na lista, ou numa subconsulta, não devolve nenhuma linha.',
    '`AND` tem precedência sobre `OR`: `a OR b AND c` é `a OR (b AND c)`.',
    'Sem `ORDER BY`, a ordem das linhas não é garantida, mesmo que pareça estável.',
    'Apelidos criados no `SELECT` não existem no `WHERE`, que é avaliado antes.',
    'Concatenar texto do usuário no SQL abre a porta para injeção de SQL: use parâmetros.',
  ],
  recursos: [
    {
      titulo: 'Documentação do PostgreSQL: Queries',
      url: 'https://www.postgresql.org/docs/current/queries.html',
      tipo: 'documentacao',
      porque: 'O capítulo oficial sobre `SELECT`, `WHERE`, `ORDER BY`, `LIMIT` e `DISTINCT`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Comparison Functions and Operators',
      url: 'https://www.postgresql.org/docs/current/functions-comparison.html',
      tipo: 'documentacao',
      porque: '`BETWEEN`, `IS NULL`, `IS DISTINCT FROM` e o comportamento das comparações com nulos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Documentação do PostgreSQL: Tutorial',
      url: 'https://www.postgresql.org/docs/current/tutorial.html',
      tipo: 'tutorial',
      porque: 'Criar tabelas, inserir e consultar dados, do começo, no banco mais usado em backends Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'SQLBolt',
      url: 'https://sqlbolt.com/',
      tipo: 'curso',
      porque: 'Exercícios interativos de SQL no navegador, um conceito por lição.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Use The Index, Luke: NULL in the Oracle Database e outros',
      url: 'https://use-the-index-luke.com/sql/where-clause/null',
      tipo: 'artigo',
      porque: 'Como os nulos se comportam no `WHERE` e nos índices de cada banco.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Modern SQL: NULL',
      url: 'https://modern-sql.com/concept/null',
      tipo: 'artigo',
      porque: 'A lógica de três valores explicada a fundo, com a tabela-verdade e as diferenças entre bancos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OWASP: SQL Injection Prevention Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
      tipo: 'artigo',
      porque: 'Por que concatenar SQL é perigoso e como os parâmetros resolvem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'H2 Database Engine',
      url: 'https://www.h2database.com/html/main.html',
      tipo: 'ferramenta',
      porque: 'O banco em memória usado nos exemplos, com modos de compatibilidade com outros bancos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Código Fonte TV: Minicurso de SQL',
      url: 'https://www.youtube.com/watch?v=dpanYy8IrcU',
      tipo: 'video',
      porque: 'Uma hora de SQL do zero, com `SELECT`, filtros e ordenação na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Programação Dinâmica: SELECT, DISTINCT, WHERE e LIMIT',
      url: 'https://www.youtube.com/watch?v=DUYnl5CS0Po',
      tipo: 'video',
      porque: 'As consultas básicas sobre uma base de dados de verdade, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'CFBCursos: Como usar a cláusula WHERE',
      url: 'https://www.youtube.com/watch?v=Ghd3U2OdlpY',
      tipo: 'video',
      porque: 'Operadores de comparação, `AND`, `OR`, `BETWEEN` e `LIKE`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Dev Aprender: Curso SQL completo',
      url: 'https://www.youtube.com/watch?v=G7bMwefn8RQ',
      tipo: 'video',
      porque: 'Um curso longo, com desafios, para praticar toda a temporada, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Um SELECT em Java',
    enunciado:
      'Reproduza em Java, com *streams*, os resultados das quatro consultas abaixo sobre a tabela `clientes` da aula. Escreva um método `selecionar(where, orderBy, limit, offset)` que aplique as etapas na mesma ordem lógica do SQL: filtrar, ordenar, pular, limitar e só então projetar o nome. O filtro `cidade <> valor` deve seguir a lógica do SQL, descartando as cidades nulas, e a ordenação por cidade deve colocar os nulos por último, como o PostgreSQL. A saída deve ser:\n\n```text\nWHERE cidade <> \'São Paulo\' ORDER BY nome: [Bruno Souza, Elisa Prado]\nORDER BY cidade, nome: [Elisa Prado, Bruno Souza, Ana Lima, Carla Dias, Diego Rocha]\nORDER BY cidade, nome LIMIT 2 OFFSET 2: [Ana Lima, Carla Dias]\nWHERE cidade <> \'São Paulo\' OR cidade IS NULL ORDER BY nome: [Bruno Souza, Diego Rocha, Elisa Prado]\n```',
    dicas: [
      'Um `record Cliente(String nome, String cidade)` e uma `List.of(...)` fazem o papel da tabela.',
      '`Comparator.nullsLast(Comparator.naturalOrder())` põe os nulos no fim; `thenComparing(Cliente::nome)` desempata.',
      'Na ordem certa: `filter`, `sorted`, `skip`, `limit` e `map`. Trocar `skip` e `limit` muda o resultado.',
      'O `OR cidade IS NULL` é um `Predicate.or(c -> c.cidade() == null)`.',
    ],
    solucao: `import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;

public class MiniSelect {
    record Cliente(String nome, String cidade) {}

    static final List<Cliente> CLIENTES = List.of(
            new Cliente("Ana Lima", "São Paulo"),
            new Cliente("Bruno Souza", "Recife"),
            new Cliente("Carla Dias", "São Paulo"),
            new Cliente("Diego Rocha", null),
            new Cliente("Elisa Prado", "Curitiba"));

    /** WHERE cidade <> valor: só é verdadeiro quando a cidade existe e é diferente. */
    static Predicate<Cliente> cidadeDiferenteDe(String valor) {
        return c -> c.cidade() != null && !c.cidade().equals(valor);
    }

    static List<String> selecionar(Predicate<Cliente> where, Comparator<Cliente> orderBy, int limit, int offset) {
        return CLIENTES.stream()
                .filter(where)
                .sorted(orderBy)
                .skip(offset)
                .limit(limit)
                .map(Cliente::nome)
                .toList();
    }

    public static void main(String[] args) {
        Comparator<Cliente> porCidadeENome = Comparator
                .comparing(Cliente::cidade, Comparator.nullsLast(Comparator.<String>naturalOrder()))
                .thenComparing(Cliente::nome);
        System.out.println("WHERE cidade <> 'São Paulo' ORDER BY nome: "
                + selecionar(cidadeDiferenteDe("São Paulo"), Comparator.comparing(Cliente::nome), Integer.MAX_VALUE, 0));
        System.out.println("ORDER BY cidade, nome: "
                + selecionar(c -> true, porCidadeENome, Integer.MAX_VALUE, 0));
        System.out.println("ORDER BY cidade, nome LIMIT 2 OFFSET 2: "
                + selecionar(c -> true, porCidadeENome, 2, 2));
        System.out.println("WHERE cidade <> 'São Paulo' OR cidade IS NULL ORDER BY nome: "
                + selecionar(cidadeDiferenteDe("São Paulo").or(c -> c.cidade() == null), Comparator.comparing(Cliente::nome), Integer.MAX_VALUE, 0));
    }
}`,
    saida: "WHERE cidade <> 'São Paulo' ORDER BY nome: [Bruno Souza, Elisa Prado]\nORDER BY cidade, nome: [Elisa Prado, Bruno Souza, Ana Lima, Carla Dias, Diego Rocha]\nORDER BY cidade, nome LIMIT 2 OFFSET 2: [Ana Lima, Carla Dias]\nWHERE cidade <> 'São Paulo' OR cidade IS NULL ORDER BY nome: [Bruno Souza, Diego Rocha, Elisa Prado]",
    comentarios:
      'As quatro listas são exatamente as que o banco devolveu na aula. A correspondência é direta: `FROM` é a lista, `WHERE` é o `filter`, `ORDER BY` é o `sorted`, `OFFSET` é o `skip`, `LIMIT` é o `limit` e o `SELECT nome` é o `map`. A diferença está no "como": a *stream* sempre percorre a lista inteira, enquanto o banco pode usar um índice para achar só as linhas certas, já na ordem pedida, e parar assim que tiver as primeiras linhas do `LIMIT`. Repare também que o predicado em Java precisou tratar o `null` explicitamente; no SQL, a lógica de três valores faz isso sozinha, para o bem e para o mal.',
  },
  exercicios: [
    {
      id: 'backend-junior-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual consulta lista os clientes que não informaram a cidade?',
      opcoes: [
        "`SELECT nome FROM clientes WHERE cidade IS NULL`",
        "`SELECT nome FROM clientes WHERE cidade = NULL`",
        "`SELECT nome FROM clientes WHERE cidade = ''`",
        "`SELECT nome FROM clientes WHERE cidade = 'NULL'`",
      ],
      resposta: 0,
      explicacao: '`= NULL` é sempre desconhecido e não encontra nada. Texto vazio e o texto `\'NULL\'` são valores, não a ausência de valor.',
    },
    {
      id: 'backend-junior-t3-e01-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A tabela `clientes` tem cinco linhas: duas de São Paulo, uma de Recife, uma de Curitiba e uma sem cidade. Quantas linhas `WHERE cidade <> \'Recife\'` devolve?',
      opcoes: ['3', '4', '5', '1'],
      resposta: 0,
      explicacao: 'As duas de São Paulo e a de Curitiba. A linha sem cidade fica de fora, porque comparar `NULL` com `\'Recife\'` dá desconhecido.',
    },
    {
      id: 'backend-junior-t3-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como o banco interpreta `WHERE status = \'PAGO\' OR status = \'ENTREGUE\' AND cliente_id = 7`?',
      opcoes: [
        "`status = 'PAGO' OR (status = 'ENTREGUE' AND cliente_id = 7)`",
        "`(status = 'PAGO' OR status = 'ENTREGUE') AND cliente_id = 7`",
        'Da esquerda para a direita, sem precedência',
        'Como um erro de sintaxe',
      ],
      resposta: 0,
      explicacao: 'O `AND` vem antes do `OR`. Se a intenção era "pedidos pagos ou entregues do cliente 7", faltaram os parênteses, ou um `status IN (\'PAGO\', \'ENTREGUE\')`.',
    },
    {
      id: 'backend-junior-t3-e01-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A consulta `SELECT nome FROM produtos WHERE categoria_id NOT IN (SELECT categoria_id FROM promocoes)` não devolve nenhuma linha, embora haja produtos fora das promoções. Qual é a causa mais provável?',
      opcoes: [
        'A subconsulta devolve pelo menos um `categoria_id` nulo, e o `NOT IN` com nulo nunca é verdadeiro',
        'O `NOT IN` não aceita subconsultas',
        'Falta um `ORDER BY`',
        'A tabela `promocoes` está vazia',
      ],
      resposta: 0,
      explicacao: 'Com a tabela vazia, todos os produtos voltariam. A correção é filtrar os nulos na subconsulta, com `WHERE categoria_id IS NOT NULL`, ou usar `NOT EXISTS`.',
    },
    {
      id: 'backend-junior-t3-e01-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Uma listagem sem `ORDER BY` sempre mostrou os produtos na ordem de cadastro. O que se pode afirmar?',
      opcoes: [
        'Nada: sem `ORDER BY`, a ordem não é garantida e pode mudar a qualquer momento',
        'A ordem de cadastro é o padrão do SQL',
        'A ordem é sempre a da chave primária',
        'A ordem é alfabética',
      ],
      resposta: 0,
      explicacao: 'A ordem depende de onde as linhas estão gravadas e do plano escolhido. Atualizações, leituras em paralelo e o crescimento da tabela a mudam.',
    },
    {
      id: 'backend-junior-t3-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que `SELECT preco * 0.9 AS promocional FROM produtos WHERE promocional < 200` dá erro, mas `... ORDER BY promocional` funciona?',
      opcoes: [
        'O `WHERE` é avaliado antes do `SELECT`, onde o apelido nasce; o `ORDER BY` é avaliado depois',
        'Apelidos só funcionam com `ORDER BY`',
        'Porque `promocional` é uma palavra reservada',
        'Porque falta um `GROUP BY`',
      ],
      resposta: 0,
      explicacao: 'A ordem lógica é `FROM`, `WHERE`, `SELECT`, `ORDER BY`, `LIMIT`. No `WHERE`, repita a expressão: `WHERE preco * 0.9 < 200`.',
    },
    {
      id: 'backend-junior-t3-e01-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Na tabela de produtos da aula, quais nomes `WHERE nome LIKE \'Mo%\'` encontra?',
      opcoes: [
        'Mouse sem fio, Monitor 27 e Monitor 24',
        'Só Monitor 27 e Monitor 24',
        'Só Mouse sem fio',
        'Nenhum: o `%` precisa estar dos dois lados',
      ],
      resposta: 0,
      explicacao: '`%` aceita qualquer sequência de caracteres, inclusive nenhuma. Todos os nomes que começam com "Mo" casam.',
    },
    {
      id: 'backend-junior-t3-e01-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `NULL` são verdadeiras? Escolha duas.',
      opcoes: [
        '`NULL = NULL` é desconhecido, não verdadeiro',
        "`COALESCE(cidade, 'não informada')` devolve a cidade, ou o texto quando ela for nula",
        '`NULL` é o mesmo que zero numa coluna numérica',
        '`cidade = NULL` e `cidade IS NULL` são equivalentes',
        'Uma coluna `NULL` é igual a texto vazio',
      ],
      respostas: [0, 1],
      explicacao: 'O nulo é a ausência de valor, diferente de zero e de texto vazio. Só o `IS NULL` testa se ele está presente.',
    },
    {
      id: 'backend-junior-t3-e01-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa ordena cidades com nulos de dois jeitos. Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> cidades = new ArrayList<>(Arrays.asList("Recife", null, "Curitiba"));
        cidades.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        String comoPostgres = cidades.toString();
        cidades.sort(Comparator.nullsFirst(Comparator.naturalOrder()));
        System.out.println(comoPostgres + " " + cidades);
    }
}`,
      resposta: '[Curitiba, Recife, null] [null, Curitiba, Recife]',
      explicacao: 'O PostgreSQL trata o nulo como maior que tudo, e na ordem crescente ele vai para o fim, como no `nullsLast`. O MySQL faz o contrário.',
    },
    {
      id: 'backend-junior-t3-e01-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    enum L {
        V, F, D;

        L e(L o) { return this == F || o == F ? F : this == V && o == V ? V : D; }
        L ou(L o) { return this == V || o == V ? V : this == F && o == F ? F : D; }
    }

    public static void main(String[] args) {
        System.out.println(L.D.e(L.V) + " " + L.D.e(L.F) + " " + L.D.ou(L.F) + " " + L.D.ou(L.V));
    }
}`,
      opcoes: ['`D F D V`', '`D D D D`', '`V F F V`', '`F F D V`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Desconhecido E verdadeiro continua desconhecido; E falso é falso, seja o que for o outro lado. No OU, verdadeiro decide, e falso não.',
    },
    {
      id: 'backend-junior-t3-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Uma tela mostra 20 produtos por página. Que trecho busca a página 3?',
      opcoes: ['`LIMIT 20 OFFSET 40`', '`LIMIT 20 OFFSET 60`', '`LIMIT 60 OFFSET 40`', '`LIMIT 3 OFFSET 20`'],
      resposta: 0,
      explicacao: 'As páginas 1 e 2 ocupam as 40 primeiras linhas, que são puladas. E sem `ORDER BY`, as páginas podem repetir ou pular produtos.',
    },
    {
      id: 'backend-junior-t3-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Os pedidos têm os status PAGO, PAGO, ENTREGUE e CANCELADO. Quantas linhas `SELECT DISTINCT status FROM pedidos` devolve?',
      opcoes: ['3', '4', '1', '2'],
      resposta: 0,
      explicacao: 'O `DISTINCT` remove as linhas repetidas do resultado: PAGO aparece uma vez só.',
    },
    {
      id: 'backend-junior-t3-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A coluna `desconto` é nula nos produtos sem promoção. O que `SELECT preco - desconto FROM produtos` devolve para eles, e como corrigir?',
      opcoes: [
        '`NULL`, porque qualquer conta com nulo dá nulo; `preco - COALESCE(desconto, 0)` corrige',
        'O próprio preço, porque nulo vale zero',
        'Um erro de execução',
        'Zero',
      ],
      resposta: 0,
      explicacao: 'O nulo se propaga pelas expressões: `100 - NULL` é `NULL`. O `COALESCE` substitui o nulo pelo valor que faz sentido na conta.',
    },
    {
      id: 'backend-junior-t3-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: "Um método monta `\"SELECT * FROM clientes WHERE email = '\" + email + \"'\"` com o e-mail digitado no login. Alguém digita `' OR '1'='1`. O que acontece, e qual é a correção?",
      opcoes: [
        "A condição vira `email = '' OR '1'='1'`, verdadeira para todos; a correção é usar `PreparedStatement` com `?`",
        'Nada: o banco rejeita aspas',
        'O banco apaga a tabela',
        'A consulta fica lenta; a correção é criar um índice',
      ],
      resposta: 0,
      explicacao: 'É a injeção de SQL. Com parâmetros, o valor nunca é interpretado como SQL: ele é sempre só um valor.',
    },
    {
      id: 'backend-junior-t3-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No PostgreSQL, sem `NULLS FIRST` nem `NULLS LAST`, onde ficam os clientes sem cidade em `ORDER BY cidade DESC`?',
      opcoes: ['No começo', 'No fim', 'Em posição aleatória', 'Ficam de fora do resultado'],
      resposta: 0,
      explicacao: 'Para o PostgreSQL, o nulo é maior que qualquer valor. Na ordem decrescente, os maiores vêm primeiro.',
    },
  ],
};

export default episodio;
