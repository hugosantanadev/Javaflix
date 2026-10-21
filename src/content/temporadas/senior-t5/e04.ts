import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t5-e04',
  minutos: 17,
  aula,
  armadilhas: [
    '`executeQuery` devolve `ResultSet`; `executeUpdate`, um `int` com as linhas afetadas; `execute`, um `boolean`.',
    'O `ResultSet` começa antes da primeira linha: é preciso chamar `next()` antes de ler qualquer coluna.',
    'As colunas são numeradas a partir de 1; `getString(0)` lança `SQLException`.',
    'Os nomes de coluna em `getString("nome")` não diferenciam maiúsculas de minúsculas.',
    'Todos os métodos do JDBC declaram `SQLException`, que é checked.',
    'Um `NULL` do banco vira `0` ou `false` em `getInt` e `getBoolean`; use `wasNull()` para saber.',
    'Sem um driver que aceite a URL, `getConnection` lança `SQLException` com "No suitable driver".',
    'Desde o JDBC 4.0, os drivers se registram sozinhos, sem `Class.forName`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: JDBC Basics',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html',
      tipo: 'documentacao',
      porque: 'O roteiro oficial do JDBC, da conexão às consultas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Establishing a Connection',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/connecting.html',
      tipo: 'documentacao',
      porque: 'URLs de conexão, `DriverManager` e `DataSource`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Processing SQL Statements with JDBC',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/processingsqlstatements.html',
      tipo: 'documentacao',
      porque: 'Os passos de criar, executar e processar um comando, com o fechamento dos recursos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Retrieving and Modifying Values from Result Sets',
      url: 'https://docs.oracle.com/javase/tutorial/jdbc/basics/retrieving.html',
      tipo: 'documentacao',
      porque: 'O cursor do `ResultSet`, os `get` por nome e por posição e os tipos de cursor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc do pacote java.sql',
      url: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.sql/java/sql/package-summary.html',
      tipo: 'documentacao',
      porque: 'Todas as interfaces do JDBC e o carregamento automático de drivers.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.sql.ResultSet',
      url: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.sql/java/sql/ResultSet.html',
      tipo: 'documentacao',
      porque: 'As regras do cursor e o comportamento de `NULL` nos `get` de primitivos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Introduction to JDBC',
      url: 'https://www.baeldung.com/java-jdbc',
      tipo: 'artigo',
      porque: 'Conexão, comandos, `ResultSet` e transações num só lugar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the JDBC ResultSet Interface',
      url: 'https://www.baeldung.com/jdbc-resultset',
      tipo: 'artigo',
      porque: 'Navegação, tipos de cursor e metadados do `ResultSet`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Loading JDBC Drivers',
      url: 'https://www.baeldung.com/java-jdbc-loading-drivers',
      tipo: 'artigo',
      porque: 'Do `Class.forName` ao registro automático pelo `ServiceLoader`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: JDBC pt 05, Adicionando dependência e conectando com banco',
      url: 'https://www.youtube.com/watch?v=JatWzzOSGwg',
      tipo: 'video',
      porque: 'O driver no projeto e a primeira conexão, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: JDBC pt 10, Buscando dados com ResultSet',
      url: 'https://www.youtube.com/watch?v=SA88IvP6Wr8',
      tipo: 'video',
      porque: 'Consultas e o laço com `next()`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O capítulo de JDBC da prova 1Z0-829, com as interfaces, a conexão e o `ResultSet`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 15, "JDBC": seções "Introducing the Interfaces of JDBC", "Connecting to a Database" e "Getting Data from a ResultSet"',
    },
  ],
  desafio: {
    titulo: 'Um driver de brinquedo',
    enunciado:
      'Para entender que o JDBC é só um conjunto de interfaces, escreva um driver mínimo, `Memoria`, que aceita URLs começadas por `jdbc:memoria:` e responde a qualquer consulta com uma tabela fixa de produtos (id, nome, preço): (1, caneta, 3,5), (2, caderno, 19,9) e (3, mochila, 249,0). Implemente `Connection`, `Statement` e `ResultSet` com `java.lang.reflect.Proxy`, tratando só os métodos usados: `createStatement`, `executeQuery`, `next`, `getInt`, `getString`, `getDouble` e `close`. O `ResultSet` deve seguir as regras reais: cursor antes da primeira linha, colunas a partir de 1 e nomes sem diferenciar maiúsculas. Registre o driver com `DriverManager.registerDriver` e use-o com código JDBC comum. A saída deve ser:\n\n```text\nantes do next: cursor fora de uma linha\n1 caneta 3.5\n2 caderno 19.9\n3 mochila 249.0\ndepois do fim: cursor fora de uma linha\nNo suitable driver found for jdbc:outro:loja\n```',
    dicas: [
      '`Proxy.newProxyInstance(carregador, new Class<?>[] {Connection.class}, (proxy, metodo, args) -> ...)` cria um objeto que implementa a interface e manda toda chamada para a lambda.',
      'Guarde a linha atual num `int[] linha = {-1}`: o cursor começa antes da primeira.',
      '`connect` deve devolver `null` para URLs que não são suas: é assim que o `DriverManager` passa ao próximo driver.',
    ],
    solucao: `import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.DriverPropertyInfo;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.sql.Statement;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

public class DriverDeBrinquedo {
    static final List<String> COLUNAS = List.of("id", "nome", "preco");
    static final List<Object[]> PRODUTOS = List.of(
        new Object[] {1, "caneta", 3.5},
        new Object[] {2, "caderno", 19.9},
        new Object[] {3, "mochila", 249.0});

    public static class Memoria implements Driver {
        public boolean acceptsURL(String url) {
            return url.startsWith("jdbc:memoria:");
        }

        public Connection connect(String url, Properties info) {
            if (!acceptsURL(url)) {
                return null;
            }
            return (Connection) Proxy.newProxyInstance(Connection.class.getClassLoader(), new Class<?>[] {Connection.class},
                (proxy, metodo, args) -> switch (metodo.getName()) {
                    case "createStatement" -> comando();
                    case "close" -> null;
                    default -> throw new SQLFeatureNotSupportedException(metodo.getName());
                });
        }

        public DriverPropertyInfo[] getPropertyInfo(String url, Properties info) { return new DriverPropertyInfo[0]; }
        public int getMajorVersion() { return 1; }
        public int getMinorVersion() { return 0; }
        public boolean jdbcCompliant() { return false; }
        public Logger getParentLogger() { return Logger.getLogger("memoria"); }
    }

    static Statement comando() {
        return (Statement) Proxy.newProxyInstance(Statement.class.getClassLoader(), new Class<?>[] {Statement.class},
            (proxy, metodo, args) -> switch (metodo.getName()) {
                case "executeQuery" -> resultado();
                case "close" -> null;
                default -> throw new SQLFeatureNotSupportedException(metodo.getName());
            });
    }

    static ResultSet resultado() {
        int[] linha = {-1};
        return (ResultSet) Proxy.newProxyInstance(ResultSet.class.getClassLoader(), new Class<?>[] {ResultSet.class},
            (proxy, metodo, args) -> switch (metodo.getName()) {
                case "next" -> ++linha[0] < PRODUTOS.size();
                case "getInt", "getString", "getDouble" -> {
                    if (linha[0] < 0 || linha[0] >= PRODUTOS.size()) {
                        throw new SQLException("cursor fora de uma linha");
                    }
                    int coluna = args[0] instanceof Integer i ? i : COLUNAS.indexOf(((String) args[0]).toLowerCase()) + 1;
                    if (coluna < 1 || coluna > COLUNAS.size()) {
                        throw new SQLException("coluna inválida: " + args[0]);
                    }
                    Object valor = PRODUTOS.get(linha[0])[coluna - 1];
                    yield metodo.getName().equals("getString") ? String.valueOf(valor) : valor;
                }
                case "close" -> null;
                default -> throw new SQLFeatureNotSupportedException(metodo.getName());
            });
    }

    public static void main(String[] args) throws SQLException {
        DriverManager.registerDriver(new Memoria());
        try (Connection conexao = DriverManager.getConnection("jdbc:memoria:loja");
             Statement comando = conexao.createStatement();
             ResultSet linhas = comando.executeQuery("SELECT id, nome, preco FROM produto")) {
            try {
                linhas.getString("nome");
            } catch (SQLException e) {
                System.out.println("antes do next: " + e.getMessage());
            }
            while (linhas.next()) {
                System.out.println(linhas.getInt("id") + " " + linhas.getString(2) + " " + linhas.getDouble("PRECO"));
            }
            try {
                linhas.getString(0);
            } catch (SQLException e) {
                System.out.println("depois do fim: " + e.getMessage());
            }
        }
        try {
            DriverManager.getConnection("jdbc:outro:loja");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    saida: 'antes do next: cursor fora de uma linha\n1 caneta 3.5\n2 caderno 19.9\n3 mochila 249.0\ndepois do fim: cursor fora de uma linha\nNo suitable driver found for jdbc:outro:loja',
    comentarios:
      'O `main` é código JDBC comum, que funcionaria igual com o driver do PostgreSQL: só a URL mudaria. Tudo o que o driver de verdade faz a mais, como abrir um socket, falar o protocolo do banco e traduzir os tipos, fica escondido atrás das mesmas interfaces. A segunda conexão mostra o papel do `acceptsURL`: o `DriverManager` pergunta a cada driver registrado, e nenhum aceitou `jdbc:outro:`. Para um banco em memória de verdade, para testes, existem o H2 e o HSQLDB, que são drivers JDBC completos.',
  },
  exercicios: [
    {
      id: 'senior-t5-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `statement.executeUpdate("DELETE FROM produto WHERE estoque = 0")` devolve?',
      opcoes: [
        'Um `int` com a quantidade de linhas apagadas',
        'Um `ResultSet` com as linhas apagadas',
        'Um `boolean` dizendo se apagou alguma linha',
        'Nada: o método é `void`',
      ],
      resposta: 0,
      explicacao: '`executeUpdate` serve para comandos que alteram dados e devolve a contagem de linhas afetadas.',
    },
    {
      id: 'senior-t5-e04-q02',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        Statement s = c.createStatement();
        ResultSet rs = s.executeUpdate("DELETE FROM produto");
    }
}`,
      resposta: 7,
      explicacao: '`executeUpdate` devolve um `int`. Um `ResultSet` só vem de `executeQuery` ou, depois de um `execute`, de `getResultSet()`.',
    },
    {
      id: 'senior-t5-e04-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        System.out.println(c);
    }
}`,
      opcoes: [
        'Não compila: `getConnection` declara `SQLException`, que não é tratada',
        'Compila e imprime a conexão',
        'Compila e lança `SQLException` ao executar',
        'Não compila: falta o usuário e a senha',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: '`SQLException` é checked. Existe uma versão de `getConnection` só com a URL, mas o `main` precisa tratar ou declarar a exceção.',
    },
    {
      id: 'senior-t5-e04-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        ResultSet rs = c.createStatement().executeQuery("SELECT nome FROM produto");
        while (rs.next()) {
            System.out.println(rs.getString());
        }
    }
}`,
      resposta: 8,
      explicacao: 'Os `get` do `ResultSet` precisam saber qual coluna ler: pelo nome, `getString("nome")`, ou pela posição, `getString(1)`.',
    },
    {
      id: 'senior-t5-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa consulta `SELECT id, nome FROM produto`, depois de `rs.next()` devolver `true`, o que faz `rs.getString(0)`?',
      opcoes: [
        'Lança `SQLException`: as colunas começam em 1',
        'Devolve o `id`',
        'Devolve o `nome`',
        'Devolve `null`',
      ],
      resposta: 0,
      explicacao: 'No JDBC, a primeira coluna é a 1. Por isso `getString(1)` é o `id` e `getString(2)`, o `nome`.',
    },
    {
      id: 'senior-t5-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um código faz `ResultSet rs = s.executeQuery(sql); String nome = rs.getString("nome");`, sem chamar `next()`. O que acontece?',
      opcoes: [
        'Lança `SQLException`: o cursor ainda está antes da primeira linha',
        'Lê a primeira linha',
        'Devolve `null`',
        'Não compila',
      ],
      resposta: 0,
      explicacao: 'O `ResultSet` nasce posicionado antes da primeira linha. Só depois de um `next()` que devolva `true` há uma linha atual para ler.',
    },
    {
      id: 'senior-t5-e04-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar, sem nenhum driver JDBC no classpath?',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        System.out.println("conectando");
        Connection c = DriverManager.getConnection("jdbc:postgresql://localhost/loja", "app", "senha");
        System.out.println("conectado");
    }
}`,
      opcoes: [
        'Imprime `conectando` e lança `SQLException`',
        'Imprime `conectando` e `conectado`',
        'Imprime `conectando` e lança `ClassNotFoundException`',
        'Não compila: o driver do PostgreSQL não está disponível',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'SQLException', saida: 'conectando' },
      explicacao: 'O código só usa interfaces, e compila sem driver. Na execução, nenhum driver aceita a URL, e o `DriverManager` lança `SQLException`.',
    },
    {
      id: 'senior-t5-e04-q08',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata, sem nenhum driver JDBC no classpath.',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) {
        try {
            DriverManager.getConnection("jdbc:mysql://localhost/loja");
        } catch (SQLException e) {
            System.out.println(e.getSQLState() + " " + e.getErrorCode());
        }
    }
}`,
      resposta: '08001 0',
      explicacao: 'O SQLState `08001` é o código padrão de "não foi possível estabelecer a conexão". O código de erro é específico de cada banco e, sem banco, fica 0.',
    },
    {
      id: 'senior-t5-e04-q09',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais destes tipos pertencem ao pacote `java.sql`? Escolha três.',
      opcoes: ['`Connection`', '`PreparedStatement`', '`ResultSet`', '`EntityManager`', '`JdbcTemplate`'],
      respostas: [0, 1, 2],
      explicacao: '`EntityManager` é da JPA, e `JdbcTemplate` é do Spring. Os dois funcionam por cima do JDBC.',
    },
    {
      id: 'senior-t5-e04-q10',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que devolve o código padronizado do erro. O programa deve imprimir `08001`.',
      codigo: `import java.sql.*;

public class Estado {
    public static void main(String[] args) {
        try {
            DriverManager.getConnection("jdbc:postgresql://localhost/loja");
        } catch (SQLException e) {
            System.out.println(e.___());
        }
    }
}`,
      respostas: ['getSQLState'],
      saida: '08001',
      explicacao: 'O SQLState segue um padrão comum aos bancos: os dois primeiros caracteres indicam a classe do erro, como `08` para conexão e `23` para violação de restrição.',
    },
    {
      id: 'senior-t5-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que significa `statement.execute(sql)` devolver `false`?',
      opcoes: [
        'Que o comando produziu uma contagem de linhas, lida com `getUpdateCount()`, e não um `ResultSet`',
        'Que o comando falhou',
        'Que a consulta não trouxe nenhuma linha',
        'Que a conexão foi fechada',
      ],
      resposta: 0,
      explicacao: 'Falhas viram `SQLException`. O `boolean` só indica o tipo de resultado: `true` para um `ResultSet`, lido com `getResultSet()`.',
    },
    {
      id: 'senior-t5-e04-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Na linha atual, a coluna `desconto` é `NULL`. O que `rs.getInt("desconto")` devolve, e como saber que era `NULL`?',
      opcoes: [
        '`0`; chamando `rs.wasNull()` logo depois',
        '`null`; testando o resultado com `== null`',
        'Lança `SQLException`; não há como ler `NULL`',
        '`-1`; comparando com -1',
      ],
      resposta: 0,
      explicacao: 'Um `int` não pode ser `null`, e o JDBC devolve 0. `wasNull()` diz se a última coluna lida era `NULL`. A alternativa é `rs.getObject("desconto", Integer.class)`, que devolve `null`.',
    },
    {
      id: 'senior-t5-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num `try (Connection c = ...; Statement s = ...; ResultSet rs = ...)`, em que ordem os recursos são fechados?',
      opcoes: [
        '`rs`, depois `s`, depois `c`',
        '`c`, depois `s`, depois `rs`',
        'Só `c` é fechado; os outros fecham junto',
        'A ordem não é definida',
      ],
      resposta: 0,
      explicacao: 'O try-with-resources fecha na ordem inversa da declaração, e faz isso mesmo que o bloco lance exceção.',
    },
    {
      id: 'senior-t5-e04-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = new Connection();
        System.out.println(c.isClosed());
    }
}`,
      opcoes: [
        'Não compila: `Connection` é uma interface',
        'Compila e imprime `false`',
        'Compila e imprime `true`',
        'Compila e lança `SQLException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Quem cria conexões é o driver, por meio do `DriverManager` ou de um `DataSource`. O código só conhece a interface.',
    },
    {
      id: 'senior-t5-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num código JDBC moderno, por que não é mais preciso chamar `Class.forName("org.postgresql.Driver")` antes de conectar?',
      opcoes: [
        'Desde o JDBC 4.0, os drivers se registram sozinhos pelo `ServiceLoader`, a partir do `META-INF/services` do JAR',
        'Porque o JDK já traz o driver do PostgreSQL',
        'Porque o `DriverManager` baixa o driver da internet',
        'Porque `Class.forName` foi removido do Java',
      ],
      resposta: 0,
      explicacao: 'O JAR do driver declara `java.sql.Driver` como serviço, e o `DriverManager` encontra os provedores na primeira vez em que é usado.',
    },
  ],
};

export default episodio;
