import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t5-e03',
  minutos: 16,
  aula,
  armadilhas: [
    'O `Locale` de um formato localizado vem do `withLocale`; `ofLocalizedDate` não recebe `Locale` como argumento.',
    '`ofLocalizedDateTime` com `LONG` ou `FULL` exige fuso: num `LocalDateTime`, lança `DateTimeException`.',
    'Os formatos vêm do CLDR e mudam entre versões do Java, como o espaço antes de `AM` e `PM` no Java 20.',
    'No `MessageFormat`, o apóstrofo abre um trecho literal; para escrever um apóstrofo, use `\'\'`.',
    'Um marcador sem argumento correspondente, como `{2}` com dois argumentos, fica no texto.',
    '`MessageFormat.format` estático usa o `Locale` padrão; para outro, crie `new MessageFormat(padrao, locale)`.',
    'No `choice`, `1#` vale para exatamente 1 e `1<` para valores acima de 1.',
    '`{n,date}` formata `java.util.Date` no fuso padrão da JVM.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Dealing with Compound Messages',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/format/messageFormat.html',
      tipo: 'documentacao',
      porque: 'Mensagens com partes variáveis montadas com `MessageFormat` e resource bundles.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Handling Plurals',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/format/choiceFormat.html',
      tipo: 'documentacao',
      porque: 'O `ChoiceFormat` para escolher entre "nenhum", "um" e "vários".',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.text.MessageFormat',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/MessageFormat.html',
      tipo: 'documentacao',
      porque: 'A gramática completa dos marcadores e as regras do apóstrofo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.format.DateTimeFormatter',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html',
      tipo: 'documentacao',
      porque: 'Os formatos localizados e os símbolos de padrão com nomes de mês e dia.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.format.FormatStyle',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/FormatStyle.html',
      tipo: 'documentacao',
      porque: 'Os quatro estilos de formato localizado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Unicode CLDR Project',
      url: 'https://cldr.unicode.org/',
      tipo: 'documentacao',
      porque: 'O banco de dados de onde vêm os formatos de cada idioma e país usados pelo JDK.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'ICU Documentation: Formatting Messages',
      url: 'https://unicode-org.github.io/icu/userguide/format_parse/messages/',
      tipo: 'documentacao',
      porque: 'Mensagens com plurais completos e gênero, além do que o `MessageFormat` do JDK oferece.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to DateTimeFormatter',
      url: 'https://www.baeldung.com/java-datetimeformatter',
      tipo: 'artigo',
      porque: 'Formatos prontos, localizados e por padrão, comparados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Internationalization and Localization in Java',
      url: 'https://www.baeldung.com/java-8-localization',
      tipo: 'artigo',
      porque: 'As seções sobre datas localizadas e mensagens com `MessageFormat`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, Internacionalização Datas com Locale',
      url: 'https://www.youtube.com/watch?v=zejLPQW96uI',
      tipo: 'video',
      porque: 'Datas formatadas para vários países, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java #95, ResourceBundle',
      url: 'https://www.youtube.com/watch?v=3yr9PBzi6Mw',
      tipo: 'video',
      porque: 'Textos de bundles combinados com valores variáveis, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Datas localizadas e `MessageFormat` com bundles, como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seções "Supporting Internationalization and Localization" e "Loading Properties with Resource Bundles"',
    },
  ],
  desafio: {
    titulo: 'Avisos de envio',
    enunciado:
      'Uma loja manda avisos de envio em português e em inglês. Crie os bundles `Textos` (base, inglês) e `Textos_pt` como classes `ListResourceBundle`, cada um com a chave `pedido` e um padrão de `MessageFormat` que use `choice` para escrever "um item" ou a quantidade de itens. Formate a data de envio com `DateTimeFormatter` no estilo `LONG` do `Locale` e passe-a como texto. Gere os avisos de Ana (1 item) e Bruno (1200 itens), envio em 3 de outubro de 2025, para `pt-BR` e `en-US`. A saída deve ser:\n\n```text\nAna, seu pedido de um item será enviado em 3 de outubro de 2025.\nBruno, seu pedido de 1.200 itens será enviado em 3 de outubro de 2025.\nAna, your order of one item ships on October 3, 2025.\nBruno, your order of 1,200 items ships on October 3, 2025.\n```',
    dicas: [
      'O padrão em português pode ser `{0}, seu pedido de {1,choice,1#um item|1<{1,number,integer} itens} será enviado em {2}.`',
      'Crie o `MessageFormat` com o `Locale`, para que o `{1,number,integer}` use o separador de milhar certo.',
      'Formatar a data antes, com `java.time`, evita a dependência do fuso que `{2,date}` teria.',
    ],
    solucao: `import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.Locale;
import java.util.ResourceBundle;

public class Avisos {
    public static class Textos extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {
                {"pedido", "{0}, your order of {1,choice,1#one item|1<{1,number,integer} items} ships on {2}."},
            };
        }
    }

    public static class Textos_pt extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {
                {"pedido", "{0}, seu pedido de {1,choice,1#um item|1<{1,number,integer} itens} será enviado em {2}."},
            };
        }
    }

    record Pedido(String cliente, int itens) {}

    static String aviso(Locale locale, Pedido pedido, LocalDate envio) {
        ResourceBundle textos = ResourceBundle.getBundle(Textos.class.getName(), locale);
        String data = envio.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).withLocale(locale));
        MessageFormat formato = new MessageFormat(textos.getString("pedido"), locale);
        return formato.format(new Object[] {pedido.cliente(), pedido.itens(), data});
    }

    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        LocalDate envio = LocalDate.of(2025, 10, 3);
        List<Pedido> pedidos = List.of(new Pedido("Ana", 1), new Pedido("Bruno", 1200));
        for (Locale locale : List.of(Locale.forLanguageTag("pt-BR"), Locale.US)) {
            for (Pedido p : pedidos) {
                System.out.println(aviso(locale, p, envio));
            }
        }
    }
}`,
    saida: 'Ana, seu pedido de um item será enviado em 3 de outubro de 2025.\nBruno, seu pedido de 1.200 itens será enviado em 3 de outubro de 2025.\nAna, your order of one item ships on October 3, 2025.\nBruno, your order of 1,200 items ships on October 3, 2025.',
    comentarios:
      'Cada idioma tem o padrão inteiro, e não pedaços: o tradutor pode mudar a ordem das partes sem tocar no código. O `choice` resolve o singular e o plural de idiomas com duas formas, como português e inglês; idiomas com mais formas de plural pedem bibliotecas como o ICU4J. O número passa pelo `MessageFormat` do `Locale` e ganha o separador certo, `1.200` e `1,200`.',
  },
  exercicios: [
    {
      id: 'senior-t5-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2025, 1, 5);
        DateTimeFormatter curto = DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT);
        System.out.println(d.format(curto.withLocale(Locale.US)) + " " + d.format(curto.withLocale(Locale.forLanguageTag("pt-BR"))));
    }
}`,
      opcoes: ['`1/5/25 05/01/2025`', '`5/1/25 05/01/2025`', '`01/05/2025 05/01/2025`', '`1/5/25 5/1/25`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Nos Estados Unidos, o mês vem primeiro, sem zero à esquerda e com o ano curto. No Brasil, dia, mês e ano com quatro dígitos.',
    },
    {
      id: 'senior-t5-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime t = LocalDateTime.of(2025, 9, 16, 14, 30);
        System.out.println(t.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.FULL).withLocale(Locale.US)));
    }
}`,
      opcoes: [
        'Lança `DateTimeException`',
        'Imprime a data e a hora por extenso',
        'Imprime só a data, sem a hora',
        'Não compila: `FULL` não serve para data e hora',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'DateTimeException', saida: '' },
      explicacao: 'O estilo `FULL` de data e hora inclui o fuso, que um `LocalDateTime` não tem. Com um `ZonedDateTime`, funcionaria.',
    },
    {
      id: 'senior-t5-e03-q03',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.DayOfWeek;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        Locale br = Locale.forLanguageTag("pt-BR");
        System.out.println(Month.DECEMBER.getDisplayName(TextStyle.FULL, br) + " " + DayOfWeek.FRIDAY.getDisplayName(TextStyle.FULL, br));
    }
}`,
      resposta: 'dezembro sexta-feira',
      explicacao: 'Os nomes vêm do `Locale` informado e, em português, são escritos em minúsculas.',
    },
    {
      id: 'senior-t5-e03-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.MessageFormat;

public class Teste {
    public static void main(String[] args) {
        System.out.println(MessageFormat.format("{0} + {0} = {1}", 2, 4));
    }
}`,
      opcoes: ['`2 + 2 = 4`', '`2 + 4 = {1}`', '`{0} + {0} = {1}`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O mesmo marcador pode aparecer várias vezes, e cada ocorrência recebe o mesmo argumento.',
    },
    {
      id: 'senior-t5-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.MessageFormat;

public class Teste {
    public static void main(String[] args) {
        System.out.println(MessageFormat.format("It's {0}", "ok"));
    }
}`,
      opcoes: ["`Its {0}`", "`It's ok`", "`Its ok`", "`It''s ok`"],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O apóstrofo abre um trecho literal que vai até o fim, e por isso o `{0}` não é substituído e o próprio apóstrofo some. O certo seria `It\'\'s {0}`.',
    },
    {
      id: 'senior-t5-e03-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o marcador para formatar o argumento como percentual. O programa deve imprimir `Total: 25%`.',
      codigo: `import java.text.MessageFormat;
import java.util.Locale;

public class Percentual {
    public static void main(String[] args) {
        System.out.println(new MessageFormat("Total: {0,number,___}", Locale.US).format(new Object[] {0.25}));
    }
}`,
      respostas: ['percent'],
      saida: 'Total: 25%',
      explicacao: 'Os estilos de `number` são `integer`, `currency` e `percent`, ou um padrão de `DecimalFormat`.',
    },
    {
      id: 'senior-t5-e03-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        DateTimeFormatter f = DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG, Locale.US);
        System.out.println(LocalDate.of(2025, 9, 16).format(f));
    }
}`,
      resposta: 8,
      explicacao: '`ofLocalizedDate` só recebe o estilo. O `Locale` é aplicado em seguida, com `.withLocale(Locale.US)`.',
    },
    {
      id: 'senior-t5-e03-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `MessageFormat` são verdadeiras? Escolha duas.',
      opcoes: [
        'Os marcadores são numerados, e os argumentos podem aparecer em qualquer ordem no padrão',
        'O método estático `format` usa o `Locale` padrão',
        'Um marcador sem argumento lança `IllegalArgumentException`',
        'Dois apóstrofos seguidos abrem e fecham um trecho vazio, sem escrever nada',
        'É thread-safe e pode ser compartilhado entre threads',
      ],
      respostas: [0, 1],
      explicacao: 'Um marcador sem argumento fica no texto, `\'\'` escreve um apóstrofo, e o `MessageFormat` não é thread-safe.',
    },
    {
      id: 'senior-t5-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.MessageFormat;

public class Teste {
    public static void main(String[] args) {
        String c = "{0,choice,0#vazio|1#um|2#dois|2<vários}";
        System.out.println(MessageFormat.format(c, 0) + " " + MessageFormat.format(c, 1) + " " + MessageFormat.format(c, 2) + " " + MessageFormat.format(c, 5));
    }
}`,
      opcoes: ['`vazio um dois vários`', '`vazio um vários vários`', '`vazio vazio um dois`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`n#` começa uma faixa que inclui `n`; `n<` começa logo acima de `n`. Cada faixa vai até o início da seguinte.',
    },
    {
      id: 'senior-t5-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Com qual tipo `DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG)` consegue formatar sem lançar exceção?',
      opcoes: ['`ZonedDateTime`', '`LocalDateTime`', '`LocalDate`', '`LocalTime`'],
      resposta: 0,
      explicacao: 'Os estilos `LONG` e `FULL` de data e hora mostram o fuso, e só um `ZonedDateTime` (ou um `OffsetDateTime`) o tem. `LocalDate` e `LocalTime` nem têm todos os campos de data e hora.',
    },
    {
      id: 'senior-t5-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2025, 9, 16);
        System.out.println(d.format(DateTimeFormatter.ofPattern("MMMM", Locale.US)) + " " + d.format(DateTimeFormatter.ofPattern("MMMM", Locale.forLanguageTag("pt-BR"))));
    }
}`,
      opcoes: ['`September setembro`', '`Sep set`', '`09 09`', '`September September`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Quatro `M` pedem o nome completo do mês, no idioma do `Locale` do formato.',
    },
    {
      id: 'senior-t5-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.MessageFormat;

public class Teste {
    public static void main(String[] args) {
        System.out.println(MessageFormat.format("{0} e {1}", "só um"));
    }
}`,
      opcoes: ['`só um e {1}`', '`só um e null`', '`só um e `', 'Lança `ArrayIndexOutOfBoundsException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Faltando o argumento, o marcador é deixado no texto como está, sem exceção.',
    },
    {
      id: 'senior-t5-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um servidor com `Locale` padrão `en_US` atende um usuário brasileiro e usa `MessageFormat.format(padrao, 1234.5)`, com o padrão `"Saldo: {0,number}"`. O que o usuário vê?',
      opcoes: [
        '`Saldo: 1,234.5`, no formato americano',
        '`Saldo: 1.234,5`, no formato brasileiro',
        '`Saldo: 1234.5`, sem formatação',
        'Uma exceção, porque o `Locale` não foi informado',
      ],
      resposta: 0,
      explicacao: 'O método estático usa o `Locale` padrão da JVM, não o do usuário. Para o formato brasileiro, use `new MessageFormat(padrao, localeDoUsuario)`.',
    },
    {
      id: 'senior-t5-e03-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.MessageFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(new MessageFormat("{0,number,integer}", Locale.GERMANY).format(new Object[] {1234567}));
    }
}`,
      opcoes: ['`1.234.567`', '`1,234,567`', '`1234567`', '`1 234 567`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O subformato de número é criado para o `Locale` do `MessageFormat`, e o alemão separa milhares com ponto.',
    },
    {
      id: 'senior-t5-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.MessageFormat;
import java.util.*;

public class Teste {
    public static class Textos extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"caixa", "Olá, {0}! Você tem {1} mensagens."}};
        }
    }

    public static void main(String[] args) {
        ResourceBundle rb = ResourceBundle.getBundle(Textos.class.getName(), Locale.US);
        System.out.println(MessageFormat.format(rb.getString("caixa"), "Ana", 3));
    }
}`,
      opcoes: ['`Olá, Ana! Você tem 3 mensagens.`', '`Olá, {0}! Você tem {1} mensagens.`', '`Olá, Ana! Você tem {1} mensagens.`', 'Lança `MissingResourceException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O bundle guarda o padrão, e o `MessageFormat` preenche os marcadores. É a combinação usada para mensagens traduzidas com valores.',
    },
  ],
};

export default episodio;
