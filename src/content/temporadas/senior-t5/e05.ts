import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t5-e05',
  minutos: 18,
  aula,
  armadilhas: [
    'Concatenar entradas do usuário no SQL permite injeção; use `PreparedStatement` com `?`.',
    'Os parâmetros são numerados a partir de 1, como as colunas do `ResultSet`.',
    'Num `PreparedStatement`, chame `executeQuery()` sem argumentos; passar o SQL de novo lança `SQLException`.',
    'Executar com algum `?` sem valor lança `SQLException`.',
    '`executeBatch()` devolve um `int[]`, uma contagem por comando do lote.',
    'O auto-commit é o padrão: sem `setAutoCommit(false)`, cada comando é confirmado na hora.',
    '`rollback(savepoint)` recebe o `Savepoint`, e não o nome dele.',
    'Ao fechar uma conexão com transação pendente, o que acontece depende do driver: termine sempre com `commit` ou `rollback`.',
    '`java.sql.Date.valueOf(String)` só aceita `aaaa-mm-dd`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Using Prepared Statements',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html',
      tipo: 'documentacao',
      porque: 'Parâmetros, reutilização e a vantagem de desempenho do `PreparedStatement`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Using Transactions',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/transactions.html',
      tipo: 'documentacao',
      porque: 'Auto-commit, `commit`, `rollback`, níveis de isolamento e pontos de salvamento.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Using Stored Procedures',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/storedprocedures.html',
      tipo: 'documentacao',
      porque: 'Parâmetros de entrada e saída com `CallableStatement`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.sql.PreparedStatement',
      url: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.sql/java/sql/PreparedStatement.html',
      tipo: 'documentacao',
      porque: 'Todos os `set`, os lotes e a regra sobre os métodos herdados de `Statement`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.sql.Connection',
      url: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.sql/java/sql/Connection.html',
      tipo: 'documentacao',
      porque: 'Os métodos de transação e o aviso sobre fechar com transação ativa.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OWASP: SQL Injection Prevention Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
      tipo: 'artigo',
      porque: 'A referência de segurança sobre injeção de SQL, com consultas parametrizadas como primeira defesa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Difference Between Statement and PreparedStatement',
      url: 'https://www.baeldung.com/java-statement-preparedstatement',
      tipo: 'artigo',
      porque: 'As duas interfaces lado a lado, com segurança e desempenho.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Batch Processing in JDBC',
      url: 'https://www.baeldung.com/jdbc-batch-processing',
      tipo: 'artigo',
      porque: 'Lotes de comandos com `addBatch` e `executeBatch`, e o tratamento de falhas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: JDBC pt 17, PreparedStatement',
      url: 'https://www.youtube.com/watch?v=uQ2cESUncjM',
      tipo: 'video',
      porque: 'Consultas com parâmetros e a injeção de SQL evitada, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: JDBC pt 19, CallableStatement',
      url: 'https://www.youtube.com/watch?v=PRXFwv9p4qI',
      tipo: 'video',
      porque: 'Chamando um procedimento armazenado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: JDBC pt 23, Transação',
      url: 'https://www.youtube.com/watch?v=ivueCjdK6C0',
      tipo: 'video',
      porque: '`commit`, `rollback` e o auto-commit na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: '`PreparedStatement`, `CallableStatement` e transações como a prova 1Z0-829 cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 15, "JDBC": seções "Working with a PreparedStatement", "Calling a CallableStatement" e "Controlling Data with Transactions"',
    },
  ],
  desafio: {
    titulo: 'Busca com filtros opcionais',
    enunciado:
      'Uma tela de produtos tem filtros opcionais: parte do nome, preço máximo e ordenação. Escreva `static Consulta montar(Busca busca)`, que devolve o SQL com marcadores `?` e a lista de parâmetros, na ordem, para depois serem passados a um `PreparedStatement` com `setObject(i + 1, parametros.get(i))`. Os filtros ausentes (`null`) não entram no `WHERE`. A ordenação não pode ser um parâmetro, porque nomes de coluna não aceitam `?`: aceite só `nome` ou `preco`, e use `nome` para qualquer outro valor. Teste com três buscas: `("caneta", 10.00, "preco")`, só nulos, e uma tentativa de injeção com o nome `x\' OR \'1\'=\'1` e a ordem `nome; DROP TABLE produto`. A saída deve ser:\n\n```text\nSELECT id, nome, preco FROM produto WHERE nome LIKE ? AND preco <= ? ORDER BY preco\n  parâmetros: [%caneta%, 10.00]\nSELECT id, nome, preco FROM produto ORDER BY nome\n  parâmetros: []\nSELECT id, nome, preco FROM produto WHERE nome LIKE ? ORDER BY nome\n  parâmetros: [%x\' OR \'1\'=\'1%]\n```',
    dicas: [
      'Junte as condições numa lista e use `String.join(" AND ", condicoes)`.',
      'Os `%` do `LIKE` vão no parâmetro, e não no SQL.',
      '`Set.of(...).contains(null)` lança `NullPointerException`: teste o `null` antes.',
    ],
    solucao: `import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class Filtros {
    record Busca(String nome, BigDecimal precoMaximo, String ordem) {}

    record Consulta(String sql, List<Object> parametros) {}

    static final Set<String> ORDENS = Set.of("nome", "preco");

    static Consulta montar(Busca busca) {
        StringBuilder sql = new StringBuilder("SELECT id, nome, preco FROM produto");
        List<String> condicoes = new ArrayList<>();
        List<Object> parametros = new ArrayList<>();
        if (busca.nome() != null) {
            condicoes.add("nome LIKE ?");
            parametros.add("%" + busca.nome() + "%");
        }
        if (busca.precoMaximo() != null) {
            condicoes.add("preco <= ?");
            parametros.add(busca.precoMaximo());
        }
        if (!condicoes.isEmpty()) {
            sql.append(" WHERE ").append(String.join(" AND ", condicoes));
        }
        String ordem = busca.ordem() != null && ORDENS.contains(busca.ordem()) ? busca.ordem() : "nome";
        sql.append(" ORDER BY ").append(ordem);
        return new Consulta(sql.toString(), parametros);
    }

    public static void main(String[] args) {
        List<Busca> buscas = List.of(
            new Busca("caneta", new BigDecimal("10.00"), "preco"),
            new Busca(null, null, null),
            new Busca("x' OR '1'='1", null, "nome; DROP TABLE produto"));
        for (Busca b : buscas) {
            Consulta c = montar(b);
            System.out.println(c.sql());
            System.out.println("  parâmetros: " + c.parametros());
        }
    }
}`,
    saida: "SELECT id, nome, preco FROM produto WHERE nome LIKE ? AND preco <= ? ORDER BY preco\n  parâmetros: [%caneta%, 10.00]\nSELECT id, nome, preco FROM produto ORDER BY nome\n  parâmetros: []\nSELECT id, nome, preco FROM produto WHERE nome LIKE ? ORDER BY nome\n  parâmetros: [%x' OR '1'='1%]",
    comentarios:
      'O texto do SQL só contém trechos escritos no próprio código: nada do que o usuário digita vira SQL. A tentativa de injeção no nome virou um valor comum de parâmetro, que o banco vai procurar literalmente. Já a ordenação mostra o limite do `?`: marcadores só substituem valores, nunca nomes de coluna ou palavras-chave, e por isso a coluna é escolhida de uma lista fechada, a única defesa segura nesse caso.',
  },
  exercicios: [
    {
      id: 'senior-t5-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static String consulta(String login) {
        return "SELECT id FROM usuario WHERE login = '" + login + "'";
    }

    public static void main(String[] args) {
        System.out.println(consulta("' OR '1'='1"));
    }
}`,
      opcoes: [
        "`SELECT id FROM usuario WHERE login = '' OR '1'='1'`",
        "`SELECT id FROM usuario WHERE login = '\\' OR \\'1\\'=\\'1'`",
        "`SELECT id FROM usuario WHERE login = ?`",
        'Lança `SQLException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A concatenação não escapa nada: o texto digitado vira parte do SQL, e a condição `OR \'1\'=\'1\'` torna a busca verdadeira para todas as linhas.',
    },
    {
      id: 'senior-t5-e05-q02',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        PreparedStatement ps = c.prepareStatement("SELECT * FROM usuario WHERE login = ?");
        ps.setString("login", "ana");
    }
}`,
      resposta: 7,
      explicacao: 'Os `set` de um `PreparedStatement` recebem a posição do `?`, a partir de 1: `ps.setString(1, "ana")`.',
    },
    {
      id: 'senior-t5-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        PreparedStatement ps = c.prepareStatement("DELETE FROM log WHERE id = ?");
        ps.setInt(1, 1);
        ps.addBatch();
        int total = ps.executeBatch();
    }
}`,
      opcoes: [
        'Não compila: `executeBatch` devolve `int[]`',
        'Compila',
        'Não compila: `addBatch` exige o SQL',
        'Não compila: `setInt` não existe',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'Um lote tem vários comandos, e o resultado traz uma contagem para cada um.',
    },
    {
      id: 'senior-t5-e05-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        c.setAutoCommit(false);
        Savepoint s = c.setSavepoint();
        c.rollback("inicio");
    }
}`,
      resposta: 8,
      explicacao: '`rollback` recebe o objeto `Savepoint` devolvido por `setSavepoint`. O nome, quando existe, serve só para identificação.',
    },
    {
      id: 'senior-t5-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um código cria `ps = conexao.prepareStatement("SELECT * FROM produto WHERE id = ?")` e chama `ps.executeQuery()` sem nenhum `set`. O que acontece?',
      opcoes: [
        'Lança `SQLException`: o parâmetro não recebeu valor',
        'Executa com `id = NULL`',
        'Executa sem o filtro e devolve todas as linhas',
        'Não compila',
      ],
      resposta: 0,
      explicacao: 'Cada `?` precisa de um valor, mesmo que seja `NULL`, informado com `setNull`. O compilador não confere isso.',
    },
    {
      id: 'senior-t5-e05-q06',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class Teste {
    public static void main(String[] args) {
        java.sql.Date d = java.sql.Date.valueOf(LocalDate.of(2025, 3, 9));
        Timestamp t = Timestamp.valueOf(LocalDateTime.of(2025, 3, 9, 8, 5));
        System.out.println(d + " " + t);
    }
}`,
      resposta: '2025-03-09 2025-03-09 08:05:00.0',
      explicacao: '`java.sql.Date` imprime no formato ISO. O `Timestamp` mostra a hora com segundos e a fração de segundo.',
    },
    {
      id: 'senior-t5-e05-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que converte um `java.sql.Date` para `java.time`. O programa deve imprimir `2025-09-17`.',
      codigo: `import java.time.LocalDate;

public class Converter {
    public static void main(String[] args) {
        java.sql.Date d = java.sql.Date.valueOf(LocalDate.of(2025, 9, 16));
        System.out.println(d.___().plusDays(1));
    }
}`,
      respostas: ['toLocalDate'],
      saida: '2025-09-17',
      explicacao: '`toLocalDate()` e `Date.valueOf(LocalDate)` fazem a ponte entre os tipos do JDBC e os de `java.time`.',
    },
    {
      id: 'senior-t5-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println("convertendo");
        java.sql.Date d = java.sql.Date.valueOf("16/09/2025");
        System.out.println(d);
    }
}`,
      opcoes: [
        'Imprime `convertendo` e lança `IllegalArgumentException`',
        'Imprime `convertendo` e `2025-09-16`',
        'Imprime `convertendo` e lança `SQLException`',
        'Imprime `convertendo` e lança `DateTimeParseException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: 'convertendo' },
      explicacao: 'Esse `valueOf` só aceita `aaaa-mm-dd`. Para outros formatos, leia com `DateTimeFormatter` e converta o `LocalDate`.',
    },
    {
      id: 'senior-t5-e05-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre transações no JDBC são verdadeiras? Escolha duas.',
      opcoes: [
        'Uma conexão nova está em auto-commit',
        '`rollback()` desfaz tudo o que foi feito desde o último `commit`',
        '`commit()` funciona mesmo em auto-commit, confirmando o próximo comando',
        'Fechar a conexão sempre desfaz a transação pendente',
        '`setSavepoint()` confirma o que foi feito até ali',
      ],
      respostas: [0, 1],
      explicacao: 'Em auto-commit, `commit()` lança `SQLException`. Fechar com transação pendente depende do driver, e um ponto de salvamento só marca uma posição, sem confirmar nada.',
    },
    {
      id: 'senior-t5-e05-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Com auto-commit desligado, um código faz `UPDATE A`, `Savepoint s = setSavepoint()`, `UPDATE B`, `rollback(s)`, `UPDATE C` e `commit()`. Quais alterações ficam gravadas?',
      opcoes: ['`A` e `C`', '`A`, `B` e `C`', 'Só `C`', 'Nenhuma'],
      resposta: 0,
      explicacao: 'O `rollback(s)` desfaz só o que veio depois do ponto, o `UPDATE B`. A transação continua, e o `commit` grava `A` e `C`.',
    },
    {
      id: 'senior-t5-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como se chama um procedimento armazenado `atualizar_estoque` que recebe um parâmetro de entrada e devolve um de saída?',
      opcoes: [
        '`conexao.prepareCall("{call atualizar_estoque(?, ?)}")`, com `registerOutParameter` para o segundo',
        '`conexao.prepareStatement("CALL atualizar_estoque")`, lendo o retorno com `getResultSet()`',
        '`conexao.createStatement().executeProcedure("atualizar_estoque")`',
        '`conexao.prepareCall("atualizar_estoque", 2)`',
      ],
      resposta: 0,
      explicacao: 'O `CallableStatement` usa a sintaxe de escape `{call ...}`. Os parâmetros de saída precisam ser registrados com o tipo SQL antes do `execute`.',
    },
    {
      id: 'senior-t5-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num `PreparedStatement` criado com um SQL, o que acontece com `ps.executeQuery("SELECT * FROM produto")`?',
      opcoes: [
        'Lança `SQLException`: num `PreparedStatement`, os `execute` devem ser chamados sem argumentos',
        'Executa o novo SQL',
        'Executa o SQL original e ignora o argumento',
        'Não compila',
      ],
      resposta: 0,
      explicacao: 'O método compila, porque é herdado de `Statement`, mas a especificação proíbe chamá-lo num `PreparedStatement`.',
    },
    {
      id: 'senior-t5-e05-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que um `PreparedStatement` impede a injeção de SQL?',
      opcoes: [
        'Os valores vão separados do SQL e são tratados como dados, nunca como código',
        'Porque ele remove os apóstrofos dos textos',
        'Porque ele só aceita números como parâmetros',
        'Porque ele valida o SQL no compilador Java',
      ],
      resposta: 0,
      explicacao: 'O comando é analisado pelo banco sem os valores, que entram depois. Nada do que o usuário envia passa pelo analisador de SQL.',
    },
    {
      id: 'senior-t5-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.sql.Connection;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Connection.TRANSACTION_READ_COMMITTED < Connection.TRANSACTION_SERIALIZABLE);
        System.out.println(Connection.TRANSACTION_SERIALIZABLE);
    }
}`,
      opcoes: ['`true` e `8`', '`false` e `4`', '`true` e `4`', '`false` e `8`'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true\n8' },
      explicacao: 'Os níveis são constantes `int` crescentes: 1 (`READ_UNCOMMITTED`), 2 (`READ_COMMITTED`), 4 (`REPEATABLE_READ`) e 8 (`SERIALIZABLE`).',
    },
    {
      id: 'senior-t5-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma busca precisa ordenar pela coluna escolhida pelo usuário. Qual é a forma segura?',
      opcoes: [
        'Conferir o valor numa lista fechada de colunas permitidas e só então colocá-lo no SQL',
        'Usar `ORDER BY ?` e `setString(1, coluna)`',
        'Concatenar o valor depois de remover os apóstrofos',
        'Usar um `CallableStatement`',
      ],
      resposta: 0,
      explicacao: 'Marcadores só substituem valores, não nomes de coluna. Com `ORDER BY ?`, o banco ordenaria por um texto constante, e remover apóstrofos não impede outras formas de injeção.',
    },
  ],
};

export default episodio;
