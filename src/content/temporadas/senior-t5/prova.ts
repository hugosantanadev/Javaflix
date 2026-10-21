import type { Exercicio } from '../../types';

/** Prova da temporada Sênior T5: localização e JDBC. */
const prova: Exercicio[] = [
  {
    id: 'senior-t5-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        Locale ca = Locale.forLanguageTag("fr-CA");
        System.out.println(ca.getDisplayCountry(Locale.US) + " " + ca.getLanguage());
    }
}`,
    opcoes: ['`Canada fr`', '`CA fr`', '`Canada French`', '`Canadá fr`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`getDisplayCountry(Locale.US)` escreve o nome do país em inglês. `getLanguage` devolve o código do idioma.',
  },
  {
    id: 'senior-t5-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Existem `app.properties`, `app_de.properties` e `app_en_US.properties`. O `Locale` padrão é `en_US`. Qual bundle `ResourceBundle.getBundle("app", Locale.forLanguageTag("de-AT"))` escolhe?',
    opcoes: ['`app_de.properties`', '`app_en_US.properties`', '`app.properties`', 'Lança `MissingResourceException`'],
    resposta: 0,
    explicacao: 'Não há `app_de_AT`, mas há o idioma pedido, `app_de`, que vem antes de qualquer candidato do `Locale` padrão.',
  },
  {
    id: 'senior-t5-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Existem `app.properties` e `app_fr.properties`. O `Locale` padrão é `fr_FR`. Qual bundle `ResourceBundle.getBundle("app", Locale.ITALY)` escolhe?',
    opcoes: ['`app_fr.properties`', '`app.properties`', 'Lança `MissingResourceException`', '`app_it.properties`, criado vazio'],
    resposta: 0,
    explicacao: 'Sem italiano, os próximos candidatos são os do padrão: `app_fr_FR`, que não existe, e `app_fr`, que existe. O base só viria depois.',
  },
  {
    id: 'senior-t5-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.*;

public class Teste {
    public static class Textos extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"ok", "Confirmar"}};
        }
    }

    public static void main(String[] args) {
        ResourceBundle rb = ResourceBundle.getBundle(Textos.class.getName(), Locale.US);
        System.out.println(rb.getString("ok"));
        System.out.println(rb.getString("cancelar"));
    }
}`,
    opcoes: [
      'Imprime `Confirmar` e lança `MissingResourceException`',
      'Imprime `Confirmar` e `null`',
      'Imprime `Confirmar` e `cancelar`',
      'Lança `MissingResourceException` antes de imprimir',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'MissingResourceException', saida: 'Confirmar' },
    explicacao: 'Uma chave ausente em toda a cadeia de bundles lança exceção, e não devolve `null`.',
  },
  {
    id: 'senior-t5-prova-q05',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(NumberFormat.getPercentInstance(Locale.US).format(0.4567));
    }
}`,
    opcoes: ['`46%`', '`45.67%`', '`0.46%`', '`45%`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O formato de percentual multiplica por 100 e, por padrão, não mostra casas decimais: 45,67 arredonda para 46.',
  },
  {
    id: 'senior-t5-prova-q06',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(NumberFormat.getCurrencyInstance(Locale.US).format(-3.5));
    }
}`,
    resposta: '-$3.50',
    explicacao: 'No formato americano, o sinal negativo vem antes do símbolo, e a moeda tem duas casas.',
  },
  {
    id: 'senior-t5-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) throws ParseException {
        System.out.println(NumberFormat.getInstance(Locale.US).parse("1,5"));
    }
}`,
    opcoes: ['`15`', '`1.5`', '`1`', 'Lança `ParseException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Nos Estados Unidos, a vírgula é o separador de milhar, que a leitura ignora mesmo fora da posição usual. O decimal seria o ponto.',
  },
  {
    id: 'senior-t5-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        DecimalFormat f = new DecimalFormat("#,##0.0#", DecimalFormatSymbols.getInstance(Locale.US));
        System.out.println(f.format(1234.5678) + " " + f.format(2));
    }
}`,
    opcoes: ['`1,234.57 2.0`', '`1,234.5678 2`', '`1234.57 2.00`', '`1,234.6 2.0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O padrão exige uma casa decimal (`0`) e permite uma segunda (`#`). 1234,5678 fica com duas; o 2 fica com a obrigatória.',
  },
  {
    id: 'senior-t5-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        NumberFormat f = NumberFormat.getIntegerInstance(Locale.US);
        System.out.println(f.format(6.5) + " " + f.format(7.5));
    }
}`,
    opcoes: ['`6 8`', '`7 8`', '`6 7`', '`7 7`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O arredondamento padrão é `HALF_EVEN`: no empate, vai para o par mais próximo.',
  },
  {
    id: 'senior-t5-prova-q10',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2025, 5, 1).format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).withLocale(Locale.GERMANY)));
    }
}`,
    opcoes: ['`1. Mai 2025`', '`May 1, 2025`', '`01.05.2025`', '`1 de maio de 2025`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O estilo `LONG` alemão escreve o dia com ponto e o nome do mês por extenso, em alemão.',
  },
  {
    id: 'senior-t5-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime t = LocalDateTime.of(2025, 5, 1, 9, 0);
        System.out.println(t.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG).withLocale(Locale.UK)));
    }
}`,
    opcoes: ['Lança `DateTimeException`', 'Imprime a data e a hora por extenso', 'Imprime só a data', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'DateTimeException', saida: '' },
    explicacao: 'O estilo `LONG` de data e hora inclui o fuso, e um `LocalDateTime` não tem fuso para mostrar.',
  },
  {
    id: 'senior-t5-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.text.MessageFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        MessageFormat f = new MessageFormat("{0,choice,0#sem pontos|1#1 ponto|1<{0,number,integer} pontos}", Locale.forLanguageTag("pt-BR"));
        System.out.println(f.format(new Object[] {2500}));
    }
}`,
    opcoes: ['`2.500 pontos`', '`2,500 pontos`', '`1 ponto`', '`2500 pontos`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O valor cai na faixa `1<`, e o número é formatado com o separador de milhar do `Locale` do `MessageFormat`.',
  },
  {
    id: 'senior-t5-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.text.MessageFormat;

public class Teste {
    public static void main(String[] args) {
        System.out.println(MessageFormat.format("{0}'s", "Ana"));
    }
}`,
    opcoes: ["`Anas`", "`Ana's`", "`{0}'s`", "`Ana''s`"],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O apóstrofo abre um trecho literal e some do resultado. Para o possessivo do inglês, o padrão precisaria de `{0}\'\'s`.',
  },
  {
    id: 'senior-t5-prova-q14',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre `Locale` são verdadeiras? Escolha duas.',
    opcoes: [
      '`Locale.forLanguageTag` usa hífen como separador, como em `pt-BR`',
      'Formatações sem `Locale` explícito usam o `Locale` padrão da JVM',
      'Existe a constante `Locale.BRAZIL`',
      '`Locale.forLanguageTag("pt_BR")` lança `IllformedLocaleException`',
      'O `toString()` de um `Locale` usa hífen',
    ],
    respostas: [0, 1],
    explicacao: 'Não há constante para o Brasil; a tag com sublinhado gera um `Locale` vazio, sem exceção; e o `toString()` usa sublinhado.',
  },
  {
    id: 'senior-t5-prova-q15',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual método de `Statement` executa um `SELECT` e devolve as linhas encontradas?',
    provas: ['829'],
    opcoes: ['`executeQuery`', '`executeUpdate`', '`executeSelect`', '`getResultSet` sem executar antes'],
    resposta: 0,
    explicacao: '`executeQuery` devolve um `ResultSet`. `executeUpdate` é para comandos que alteram dados e devolve um `int`.',
  },
  {
    id: 'senior-t5-prova-q16',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de compilar?',
    provas: ['829'],
    codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        Connection c = DriverManager.getConnection("jdbc:h2:mem:loja");
        PreparedStatement ps = c.prepareStatement("DELETE FROM produto WHERE id = ?");
        ps.setInt(1, 10);
        ResultSet rs = ps.executeUpdate();
    }
}`,
    opcoes: [
      'Não compila: `executeUpdate` devolve `int`',
      'Compila',
      'Não compila: `setInt` não aceita a posição 1',
      'Não compila: `DELETE` precisa de `executeQuery`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 8 },
    explicacao: 'O compilador não conhece o SQL, mas conhece os tipos: `executeUpdate` devolve a quantidade de linhas afetadas.',
  },
  {
    id: 'senior-t5-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A consulta é `SELECT nome, preco FROM produto`. Depois de `rs.next()` devolver `true`, qual chamada lê o preço?',
    provas: ['829'],
    opcoes: ['`rs.getDouble(2)`', '`rs.getDouble(1)`', '`rs.getDouble(0)`', '`rs.getDouble()`'],
    resposta: 0,
    explicacao: 'As colunas são numeradas a partir de 1, na ordem do `SELECT`: `nome` é a 1 e `preco`, a 2. Também daria `rs.getDouble("preco")`.',
  },
  {
    id: 'senior-t5-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar, sem nenhum driver JDBC no classpath?',
    provas: ['829'],
    codigo: `import java.sql.*;

public class Teste {
    public static void main(String[] args) throws SQLException {
        try (Connection c = DriverManager.getConnection("jdbc:oracle:thin:@servidor:1521/loja", "app", "senha")) {
            System.out.println(c.getAutoCommit());
        }
    }
}`,
    opcoes: ['Lança `SQLException`', 'Imprime `true`', 'Imprime `false`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'SQLException', saida: '' },
    explicacao: 'Nenhum driver aceita a URL, e o `DriverManager` lança `SQLException` com "No suitable driver found". Com o driver, a conexão viria em auto-commit.',
  },
  {
    id: 'senior-t5-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Com auto-commit desligado, um código executa `INSERT X`, `Savepoint p = setSavepoint()`, `INSERT Y`, `INSERT Z`, `rollback(p)` e `commit()`. O que fica gravado?',
    provas: ['829'],
    opcoes: ['Só `X`', '`X`, `Y` e `Z`', '`X` e `Z`', 'Nada'],
    resposta: 0,
    explicacao: 'O `rollback(p)` desfaz tudo o que veio depois do ponto de salvamento, `Y` e `Z`. O `commit` confirma o que restou.',
  },
  {
    id: 'senior-t5-prova-q20',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    provas: ['829'],
    codigo: `import java.sql.Timestamp;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Timestamp.valueOf("2025-09-16 08:00:00").toLocalDateTime().plusHours(2));
    }
}`,
    resposta: '2025-09-16T10:00',
    explicacao: '`toLocalDateTime` converte para `java.time`, e o `LocalDateTime` imprime no formato ISO, com o `T` e sem os segundos zerados.',
  },
];

export default prova;
