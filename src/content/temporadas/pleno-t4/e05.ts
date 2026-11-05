import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t4-e05',
  minutos: 15,
  aula,
  armadilhas: [
    '`MM` é mês e `mm` é minuto: `dd/mm/yyyy` imprime os minutos no lugar do mês.',
    '`HH` vai de 0 a 23; `hh` vai de 1 a 12 e pede `a` para AM/PM.',
    '`YYYY` é o ano da semana: em 30/12/2024, imprime 2025.',
    'O modo padrão, `SMART`, ajusta dias 29 a 31 inexistentes: "31/02/2023" vira 28/02/2023 sem erro.',
    '`ResolverStyle.STRICT` recusa datas impossíveis, mas exige `uuuu` no lugar de `yyyy`.',
    'Formatar um `LocalDate` com `HH` lança `UnsupportedTemporalTypeException` na execução.',
    'Interpretar um texto sem hora como `LocalDateTime` lança `DateTimeParseException`.',
    'Letra inválida no padrão lança `IllegalArgumentException` em `ofPattern`; o compilador não confere o padrão.',
  ],
  ia: {
    uso:
      'Para formatar datas, a IA ajuda a montar padrões e a converter código de `SimpleDateFormat` para `DateTimeFormatter`. Os erros dela são justamente as armadilhas desta aula: `mm` no lugar de `MM`, `YYYY` no lugar de `yyyy`, nenhum `Locale` e validação de formulários com o modo padrão, que aceita 31 de fevereiro.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui o padrão e o código que formata ou lê datas>\n- Explique cada letra do padrão e mostre o resultado para 2024-12-30T14:07 e para 2024-03-05T00:05.\n- Diga se o padrão depende do Locale e qual Locale usar.\n- Para ler datas digitadas, use ResolverStyle.STRICT com uuuu e mostre o que acontece com 31/02.\n- Não use SimpleDateFormat nem Date.',
    erros: [
      'Escreve `dd/mm/yyyy`, que mostra o minuto no lugar do mês.',
      'Usa `YYYY`, o ano da semana, e o ano salta nos últimos dias de dezembro.',
      'Valida datas de formulário com o modo padrão, que corrige 31/02 para 28 ou 29 de fevereiro sem erro.',
      'Formata nomes de meses sem `Locale`, e o texto muda conforme o servidor.',
    ],
    conferir: [
      'Formate 30 de dezembro e um horário com minuto diferente do mês.',
      'Leia "31/02/2023" com o formatador e veja se ele recusa.',
      'Rode com `-Duser.language=en` e compare os nomes de meses.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Parsing and Formatting',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/parsing-formatting/',
      tipo: 'documentacao',
      porque: 'Formatadores prontos, padrões próprios e as exceções de formatação e interpretação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Legacy Date-Time Code',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/legacy-code/',
      tipo: 'documentacao',
      porque: 'A tabela de conversões entre `java.util.Date`, `Calendar`, `java.sql` e `java.time`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Parsing and Formatting',
      url: 'https://docs.oracle.com/javase/tutorial/datetime/iso/format.html',
      tipo: 'documentacao',
      porque: 'Exemplos de `format` e `parse` com padrões próprios.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de DateTimeFormatter: Patterns for Formatting and Parsing',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html#patterns',
      tipo: 'documentacao',
      porque: 'A tabela oficial de todas as letras de padrão e o efeito da quantidade de letras.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.format.ResolverStyle',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/ResolverStyle.html',
      tipo: 'documentacao',
      porque: 'A diferença exata entre `STRICT`, `SMART` e `LENIENT`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to DateTimeFormatter',
      url: 'https://www.baeldung.com/java-datetimeformatter',
      tipo: 'artigo',
      porque: 'Formatadores prontos, localizados e por padrão, com exemplos de cada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Fix DateTimeParseException, Unable to obtain LocalDateTime from TemporalAccessor',
      url: 'https://www.baeldung.com/java-datetimeparseexception-localdatetime-temporalaccessor',
      tipo: 'artigo',
      porque: 'De onde vem a mensagem mais confusa da API e como corrigir o padrão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Intro to Date-to-Instant and Instant-to-Date Converters',
      url: 'https://www.baeldung.com/java-date-instant-converters',
      tipo: 'artigo',
      porque: 'As pontes entre `java.util.Date` e `Instant` nos dois sentidos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, DateTimeFormatter',
      url: 'https://www.youtube.com/watch?v=TyikH6iBUIY',
      tipo: 'video',
      porque: 'Formatando e interpretando datas com padrões, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, Date',
      url: 'https://www.youtube.com/watch?v=IUDT-cW4tcU',
      tipo: 'video',
      porque: 'A classe antiga `Date` e seus problemas, para reconhecer em código legado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevSuperior: Data e hora em Java, aulão completo',
      url: 'https://www.youtube.com/watch?v=WnJUI-jMQGE',
      tipo: 'video',
      porque: 'Uma revisão da temporada inteira, com formatação e conversões, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As letras de padrão que a prova cobra e as exceções de cada combinação errada.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Formatting Values", partes "Formatting Dates and Times" e "Customizing the Date/Time Format"',
    },
  ],
  desafio: {
    titulo: 'Validador de datas brasileiras',
    enunciado:
      'Crie dois formatadores em constantes `static final`: um que lê datas no formato `dd/MM/uuuu` recusando datas impossíveis (`ResolverStyle.STRICT`) e outro que escreve por extenso em português. Para cada texto da lista `"05/03/2024"`, `"31/04/2024"`, `"29/02/2023"`, `"15/13/2024"` e `"01/01/2025"`, mostre a data ISO e o extenso, ou "inválida". A saída deve ser:\n\n```text\n05/03/2024 -> 2024-03-05 (terça-feira, 5 de março de 2024)\n31/04/2024 -> inválida\n29/02/2023 -> inválida\n15/13/2024 -> inválida\n01/01/2025 -> 2025-01-01 (quarta-feira, 1 de janeiro de 2025)\n```',
    dicas: [
      'Sem `STRICT`, "31/04/2024" viraria 30 de abril em silêncio.',
      'No modo estrito, use `uuuu`: com `yyyy`, o formatador exigiria também a era.',
      'Para o extenso, `EEEE, d \'de\' MMMM \'de\' uuuu` com `Locale.forLanguageTag("pt-BR")`.',
    ],
    solucao: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.List;
import java.util.Locale;

public class Conversor {
    static final DateTimeFormatter BR = DateTimeFormatter.ofPattern("dd/MM/uuuu").withResolverStyle(ResolverStyle.STRICT);
    static final DateTimeFormatter EXTENSO = DateTimeFormatter.ofPattern("EEEE, d 'de' MMMM 'de' uuuu", Locale.forLanguageTag("pt-BR"));

    public static void main(String[] args) {
        for (String texto : List.of("05/03/2024", "31/04/2024", "29/02/2023", "15/13/2024", "01/01/2025")) {
            try {
                LocalDate d = LocalDate.parse(texto, BR);
                System.out.println(texto + " -> " + d + " (" + d.format(EXTENSO) + ")");
            } catch (DateTimeParseException e) {
                System.out.println(texto + " -> inválida");
            }
        }
    }
}`,
    saida: '05/03/2024 -> 2024-03-05 (terça-feira, 5 de março de 2024)\n31/04/2024 -> inválida\n29/02/2023 -> inválida\n15/13/2024 -> inválida\n01/01/2025 -> 2025-01-01 (quarta-feira, 1 de janeiro de 2025)',
    comentarios:
      'Formatadores imutáveis podem morar em constantes e ser compartilhados, algo que o antigo `SimpleDateFormat` não permitia. O modo estrito transforma dados ruins em exceção, em vez de corrigi-los sem avisar, e é o que um formulário de cadastro deveria usar. Fixar o `Locale` garante o mesmo texto em qualquer servidor.',
  },
  bugs: [
    {
      id: 'pleno-t4-e05-b01',
      dificuldade: 1,
      sintoma: 'A importação da planilha não compila: `incompatible types: String cannot be converted to DateTimeFormatter`, apontando o `parse` com o padrão escrito direto.',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Importacao {
    public static void main(String[] args) {
        String daPlanilha = "05/03/2024";
        LocalDate data = LocalDate.parse(daPlanilha, "dd/MM/yyyy");
        System.out.println("importado: " + data);
    }
}`,
      linha: 7,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Importacao {
    public static void main(String[] args) {
        String daPlanilha = "05/03/2024";
        LocalDate data = LocalDate.parse(daPlanilha, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        System.out.println("importado: " + data);
    }
}`,
      saidaCorrigida: 'importado: 2024-03-05',
      dica: 'O segundo argumento de `LocalDate.parse` é um texto ou outro tipo de objeto?',
      explicacao:
        '`LocalDate.parse` recebe o texto e um `DateTimeFormatter`, e não o padrão como `String`. Crie o formatador com `DateTimeFormatter.ofPattern("dd/MM/yyyy")`, de preferência numa constante, já que ele é imutável e pode ser compartilhado.',
    },
    {
      id: 'pleno-t4-e05-b02',
      dificuldade: 2,
      sintoma: 'O boleto emitido em 30 de dezembro de 2024 saiu com o ano de 2025 na data de emissão: `emissão 30/12/2025, vencimento 10/01/2025`.',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Boleto {
    public static void main(String[] args) {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/YYYY");
        LocalDate emissao = LocalDate.of(2024, 12, 30);
        LocalDate vencimento = LocalDate.of(2025, 1, 10);
        System.out.println("emissão " + emissao.format(formato) + ", vencimento " + vencimento.format(formato));
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: 'emissão 30/12/2025, vencimento 10/01/2025' },
      correcao: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Boleto {
    public static void main(String[] args) {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate emissao = LocalDate.of(2024, 12, 30);
        LocalDate vencimento = LocalDate.of(2025, 1, 10);
        System.out.println("emissão " + emissao.format(formato) + ", vencimento " + vencimento.format(formato));
    }
}`,
      saidaCorrigida: 'emissão 30/12/2024, vencimento 10/01/2025',
      dica: 'No padrão, `yyyy` e `YYYY` querem dizer a mesma coisa? O que é o ano da semana?',
      explicacao:
        '`YYYY` é o **ano da semana**, não o ano do calendário. A semana que contém 30 de dezembro de 2024 já é a semana 1 de 2025, e o ano saltou. O erro só aparece nos últimos ou nos primeiros dias do ano, por isso escapa dos testes. Use `yyyy`, ou `uuuu`, para datas comuns.',
    },
    {
      id: 'pleno-t4-e05-b03',
      dificuldade: 3,
      sintoma: 'O cadastro aceitou 31/02/2000 como data de nascimento e gravou 29 de fevereiro, sem avisar o usuário: `nascimento aceito: 1995-08-15\nnascimento aceito: 2000-02-29`.',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

public class Cadastro {
    public static void main(String[] args) {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        for (String digitada : new String[] {"15/08/1995", "31/02/2000"}) {
            try {
                System.out.println("nascimento aceito: " + LocalDate.parse(digitada, formato));
            } catch (DateTimeParseException e) {
                System.out.println("data inválida: " + digitada);
            }
        }
    }
}`,
      linha: 8,
      efeito: { tipo: 'saida', saida: 'nascimento aceito: 1995-08-15\nnascimento aceito: 2000-02-29' },
      correcao: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

public class Cadastro {
    public static void main(String[] args) {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/uuuu").withResolverStyle(ResolverStyle.STRICT);
        for (String digitada : new String[] {"15/08/1995", "31/02/2000"}) {
            try {
                System.out.println("nascimento aceito: " + LocalDate.parse(digitada, formato));
            } catch (DateTimeParseException e) {
                System.out.println("data inválida: " + digitada);
            }
        }
    }
}`,
      saidaCorrigida: 'nascimento aceito: 1995-08-15\ndata inválida: 31/02/2000',
      dica: 'Que estilo de resolução o formatador usa por padrão, e o que ele faz com um dia que não existe no mês?',
      explicacao:
        'O estilo padrão, `SMART`, corrige dias de 29 a 31 inexistentes para o último dia válido do mês, e a data errada passa como certa. Para validar o que o usuário digitou, use `ResolverStyle.STRICT`, que recusa com `DateTimeParseException`. No modo estrito, o ano precisa ser `uuuu`: `yyyy` é o ano da era e exigiria também a era.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t4-e05-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime t = LocalDateTime.of(2024, 8, 9, 10, 30);
        System.out.println(t.format(DateTimeFormatter.ofPattern("dd/mm/yy")));
    }
}`,
      opcoes: ['`09/30/24`', '`09/08/24`', '`9/30/24`', 'Lança `UnsupportedTemporalTypeException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`mm` são os minutos, 30. O mês seria `MM`. Como o `LocalDateTime` tem minutos, não há exceção: só um resultado errado.',
      dica: '`mm` é minuto.',
    },
    {
      id: 'pleno-t4-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalTime.of(9, 5).format(DateTimeFormatter.ofPattern("H'h'mm")) + " " + LocalDate.of(2024, 7, 4).format(DateTimeFormatter.ofPattern("d/M/yyyy")));
    }
}`,
      resposta: '9h05 4/7/2024',
      explicacao: 'Uma letra não preenche com zero; duas preenchem. O `h` entre aspas simples é texto literal, não a hora de 1 a 12.',
      dica: 'Uma letra não preenche com zeros, e o texto entre aspas é literal.',
    },
    {
      id: 'pleno-t4-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 3, 5);
        System.out.println(d.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        System.out.println(d.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
    }
}`,
      opcoes: [
        'Imprime `05/03/2024` e lança `UnsupportedTemporalTypeException`',
        'Imprime `05/03/2024` e `05/03/2024 00:00`',
        'Não compila: o padrão não combina com `LocalDate`',
        'Imprime `05/03/2024` e lança `DateTimeParseException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedTemporalTypeException', saida: '05/03/2024' },
      explicacao: 'O padrão é uma `String` comum para o compilador. Na execução, o formatador pede a hora a um `LocalDate`, que não a tem.',
      dica: 'Um `LocalDate` não tem hora para o `HH`.',
    },
    {
      id: 'pleno-t4-e05-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 12, 30);
        System.out.println(d.format(DateTimeFormatter.ofPattern("yyyy YYYY", Locale.US)));
    }
}`,
      opcoes: ['`2024 2025`', '`2024 2024`', '`2025 2025`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`YYYY` é o ano da semana. A semana que contém 30 de dezembro de 2024 também contém 1º de janeiro de 2025, e por isso pertence a 2025.',
      dica: '`YYYY` é o ano da semana, e 30 de dezembro de 2024 já está na semana 1 de 2025.',
    },
    {
      id: 'pleno-t4-e05-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.parse("31/04/2024", DateTimeFormatter.ofPattern("dd/MM/yyyy")));
    }
}`,
      opcoes: ['`2024-04-30`', '`2024-05-01`', 'Lança `DateTimeParseException`', '`2024-04-31`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O modo padrão de resolução, `SMART`, ajusta dias de 29 a 31 que não existem no mês para o último dia válido, sem lançar exceção.',
      dica: 'O modo padrão ajusta dias de 29 a 31 que não existem.',
    },
    {
      id: 'pleno-t4-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;
import java.time.format.*;

public class Teste {
    public static void main(String[] args) {
        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/uuuu").withResolverStyle(ResolverStyle.STRICT);
        System.out.println(LocalDate.parse("30/04/2024", f));
        System.out.println(LocalDate.parse("31/04/2024", f));
    }
}`,
      opcoes: [
        'Imprime `2024-04-30` e lança `DateTimeParseException`',
        'Imprime `2024-04-30` duas vezes',
        'Imprime `2024-04-30` e `2024-05-01`',
        'Lança `DateTimeParseException` na primeira linha',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'DateTimeParseException', saida: '2024-04-30' },
      explicacao: 'No modo estrito, uma data impossível é erro. `uuuu` é o ano sem era, que o modo estrito aceita sozinho.',
      dica: 'No modo estrito, 31 de abril é recusado.',
    },
    {
      id: 'pleno-t4-e05-q07',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Num padrão de `DateTimeFormatter`, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`MM` é o mês com dois dígitos',
        '`mm` é o minuto',
        '`hh` vai de 0 a 23',
        '`YYYY` sempre dá o mesmo resultado que `yyyy`',
        '`EEEE` mostra o número do dia da semana',
      ],
      respostas: [0, 1],
      explicacao: '`hh` vai de 1 a 12 (quem vai de 0 a 23 é `HH`), `YYYY` é o ano da semana, e `EEEE` mostra o nome do dia por extenso.',
      dica: 'Uma letra maiúscula e a mesma minúscula têm significados diferentes.',
    },
    {
      id: 'pleno-t4-e05-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que transforma o texto numa data. O programa deve imprimir `2024-12-25`.',
      codigo: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Natal {
    public static void main(String[] args) {
        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        System.out.println(LocalDate.___("25/12/2024", f));
    }
}`,
      respostas: ['parse'],
      saida: '2024-12-25',
      explicacao: '`parse` com um formatador lê o texto no padrão dado; sem formatador, só aceitaria o formato ISO.',
      dica: 'É o método que lê o texto.',
    },
    {
      id: 'pleno-t4-e05-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate a = LocalDate.parse("05/03/2024", f);
        String b = a.format(f);
        String c = f.format(a);
        LocalDate d = LocalDate.parse("05/03/2024", "dd/MM/yyyy");
        System.out.println(a + b + c + d);
    }
}`,
      resposta: 10,
      explicacao: '`parse` recebe um `DateTimeFormatter`, não o padrão em texto. As duas formas de formatar, `a.format(f)` e `f.format(a)`, são válidas.',
      dica: '`parse` recebe um formatador, não um texto com o padrão.',
    },
    {
      id: 'pleno-t4-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        System.out.println(LocalDate.parse("05/03/2024", f));
        System.out.println(LocalDateTime.parse("05/03/2024", f));
    }
}`,
      opcoes: [
        'Imprime `2024-03-05` e lança `DateTimeParseException`',
        'Imprime `2024-03-05` e `2024-03-05T00:00`',
        'Não compila: o formatador não tem hora',
        'Imprime `2024-03-05` e lança `UnsupportedTemporalTypeException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'DateTimeParseException', saida: '2024-03-05' },
      explicacao: 'O texto foi lido, mas não tem hora, e um `LocalDateTime` precisa de uma. A mensagem é "Unable to obtain LocalDateTime from TemporalAccessor".',
      dica: 'O texto não tem hora para montar um `LocalDateTime`.',
    },
    {
      id: 'pleno-t4-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        DateTimeFormatter doze = DateTimeFormatter.ofPattern("hh:mm a", Locale.US);
        System.out.println(LocalTime.of(0, 5).format(doze) + " " + LocalTime.of(12, 0).format(doze));
    }
}`,
      opcoes: ['`12:05 AM 12:00 PM`', '`00:05 AM 12:00 PM`', '`12:05 PM 12:00 AM`', '`00:05 AM 00:00 PM`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No relógio de 12 horas, `hh` vai de 1 a 12: a meia-noite e cinco é 12:05 AM, e o meio-dia é 12:00 PM.',
      dica: '`hh` vai de 1 a 12: meia-noite e cinco é 12:05 AM.',
    },
    {
      id: 'pleno-t4-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        System.out.println("criando");
        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy j");
        System.out.println(f);
    }
}`,
      opcoes: [
        'Imprime `criando` e lança `IllegalArgumentException`',
        'Imprime `criando` e o padrão',
        'Não compila: letra inválida no padrão',
        'Imprime `criando` e lança `DateTimeParseException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: 'criando' },
      explicacao: '`ofPattern` analisa o padrão ao criar o formatador. Uma letra desconhecida é recusada já ali, com "Unknown pattern letter".',
      dica: 'Letra inválida no padrão é descoberta em `ofPattern`, na execução.',
    },
    {
      id: 'pleno-t4-e05-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.Instant;
import java.util.Date;

public class Teste {
    public static void main(String[] args) {
        Date d = Date.from(Instant.ofEpochSecond(60));
        System.out.println(d.getTime() + " " + d.toInstant());
    }
}`,
      resposta: '60000 1970-01-01T00:01:00Z',
      explicacao: '`java.util.Date` representa um instante, guardado em milissegundos desde a época Unix. As pontes do Java 8 convertem para `Instant` sem perda.',
      dica: '`getTime` devolve milissegundos.',
    },
    {
      id: 'pleno-t4-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime t = LocalDateTime.of(2024, 1, 2, 9, 0);
        System.out.println(t.format(DateTimeFormatter.ofPattern("'dia' d', às' H'h'")));
    }
}`,
      opcoes: ['`dia 2, às 9h`', '`dia 02, às 09h`', '`2 2, às 9 9`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O que está entre aspas simples é copiado como texto. Fora delas, `d` e `H` com uma letra imprimem o dia e a hora sem zero à esquerda.',
      dica: 'Texto literal entre aspas simples; uma letra só, sem zeros.',
    },
    {
      id: 'pleno-t4-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que um `DateTimeFormatter` pode ser guardado numa constante `static final` e usado por várias threads?',
      opcoes: [
        'Porque é imutável e seguro entre threads, ao contrário do antigo `SimpleDateFormat`',
        'Porque cada chamada de `format` cria uma cópia sincronizada do formatador',
        'Porque a JVM bloqueia o formatador enquanto uma thread o usa',
        'Não pode: cada thread precisa do seu formatador',
      ],
      resposta: 0,
      explicacao: 'O `SimpleDateFormat` guardava estado interno que mudava a cada uso, e compartilhá-lo corrompia resultados. O `DateTimeFormatter` não muda depois de criado.',
      dica: 'Pense em imutabilidade.',
    },
  ],
};

export default episodio;
