import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t4-e01',
  minutos: 15,
  aula,
  armadilhas: [
    'As classes de `java.time` não têm construtor público: `new LocalDate(...)` não compila.',
    'Meses vão de 1 a 12. `LocalDate.of(2024, 13, 1)` e `LocalDate.of(2023, 2, 29)` lançam `DateTimeException`.',
    'Os objetos são imutáveis: `d.plusDays(1);` sem atribuição não muda `d`.',
    '`LocalDate` não tem `plusHours`, e `LocalTime` não tem `plusDays`: chamar não compila.',
    'Somar meses ou anos para um dia inexistente usa o último dia válido: 31/01 mais um mês é 29/02 em 2024.',
    '`LocalTime` dá a volta na meia-noite: 23:00 mais duas horas é 01:00.',
    'O `toString` de `LocalTime` omite os segundos quando são zero: `LocalTime.of(9, 0)` imprime `09:00`.',
    '`parse` exige o formato ISO com zeros: `"2024-3-5"` lança `DateTimeParseException`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: The Date Time API Overview',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/intro/',
      tipo: 'documentacao',
      porque: 'O mapa do pacote `java.time` e os princípios de projeto da API.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Date',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/date/',
      tipo: 'documentacao',
      porque: '`LocalDate`, `YearMonth`, `MonthDay` e `Year`, com os métodos de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Date-Time Design Principles',
      url: 'https://docs.oracle.com/javase/tutorial/datetime/overview/design.html',
      tipo: 'documentacao',
      porque: 'Por que a API é imutável, fluente e clara, e o que isso muda em relação a `Date` e `Calendar`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.LocalDate',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html',
      tipo: 'documentacao',
      porque: 'Cada método com a regra de ajuste para dias inexistentes e o aviso de classe value-based.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.temporal.TemporalAdjusters',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/temporal/TemporalAdjusters.html',
      tipo: 'documentacao',
      porque: 'Todos os ajustadores prontos: primeiro e último dia, próximo dia da semana e outros.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JSR 310: Date and Time API',
      url: 'https://jcp.org/en/jsr/detail?id=310',
      tipo: 'documentacao',
      porque: 'A especificação que deu origem ao `java.time`, liderada por Stephen Colebourne.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Introduction to the Java Date/Time API',
      url: 'https://www.baeldung.com/java-8-date-time-intro',
      tipo: 'artigo',
      porque: 'Um panorama das classes principais com exemplos curtos de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Date and Calendar, From Legacy to Modern Approaches',
      url: 'https://www.baeldung.com/java-date-time-history',
      tipo: 'artigo',
      porque: 'A história dos problemas de `Date` e `Calendar` e como o `java.time` os resolve.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: TemporalAdjuster in Java',
      url: 'https://www.baeldung.com/java-temporal-adjuster',
      tipo: 'artigo',
      porque: 'Os ajustadores prontos e como escrever um próprio.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, LocalDate',
      url: 'https://www.youtube.com/watch?v=S7Uc4TxTbb8',
      tipo: 'video',
      porque: 'Criando e manipulando datas com `LocalDate`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, LocalTime',
      url: 'https://www.youtube.com/watch?v=huyHYTds_xU',
      tipo: 'video',
      porque: 'Horas sem data com `LocalTime`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, TemporalAdjusters',
      url: 'https://www.youtube.com/watch?v=81xG_vGIiwg',
      tipo: 'video',
      porque: 'Ajustando datas para o próximo dia útil ou o fim do mês, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: Java 8 Date and Time API with Jim Gough',
      url: 'https://www.youtube.com/watch?v=OIg9lNpMJew',
      tipo: 'video',
      porque: 'As classes principais do `java.time` apresentadas no canal oficial do Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de métodos de cada classe e as armadilhas de imutabilidade que a prova repete.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Working with Dates and Times", partes "Creating Dates and Times" e "Manipulating Dates and Times"',
    },
  ],
  desafio: {
    titulo: 'Vencimentos de fatura',
    enunciado:
      'Escreva `static LocalDate vencimento(int ano, int mes, int dia)`, que devolve a data de vencimento de uma fatura: o dia pedido, ou o último dia do mês se ele não existir, empurrado para a segunda-feira seguinte se cair num sábado ou domingo. No `main`, a partir de janeiro de 2024, mostre os 4 vencimentos de uma fatura com dia 31, cada um com o dia da semana. A saída deve ser:\n\n```text\n2024-01-31 WEDNESDAY\n2024-02-29 THURSDAY\n2024-04-01 MONDAY\n2024-04-30 TUESDAY\n```',
    dicas: [
      '`lengthOfMonth()` diz quantos dias o mês tem; `Math.min` escolhe entre ele e o dia pedido.',
      '`TemporalAdjusters.next(DayOfWeek.MONDAY)` leva para a próxima segunda-feira.',
      'Para avançar os meses, some `plusMonths(i)` ao primeiro dia de janeiro, que sempre existe.',
    ],
    solucao: `import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

public class Faturas {
    static LocalDate vencimento(int ano, int mes, int dia) {
        LocalDate primeiro = LocalDate.of(ano, mes, 1);
        LocalDate data = primeiro.withDayOfMonth(Math.min(dia, primeiro.lengthOfMonth()));
        DayOfWeek semana = data.getDayOfWeek();
        if (semana == DayOfWeek.SATURDAY || semana == DayOfWeek.SUNDAY) {
            return data.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        }
        return data;
    }

    public static void main(String[] args) {
        LocalDate inicio = LocalDate.of(2024, 1, 1);
        for (int i = 0; i < 4; i++) {
            LocalDate mes = inicio.plusMonths(i);
            LocalDate v = vencimento(mes.getYear(), mes.getMonthValue(), 31);
            System.out.println(v + " " + v.getDayOfWeek());
        }
    }
}`,
    saida: '2024-01-31 WEDNESDAY\n2024-02-29 THURSDAY\n2024-04-01 MONDAY\n2024-04-30 TUESDAY',
    comentarios:
      'Partir do dia 1 de cada mês evita o problema de `LocalDate.of(2024, 2, 31)`, que lançaria `DateTimeException`. O vencimento de março caiu num domingo e foi para a segunda, 1º de abril. Comparar enums com `==` é seguro: cada constante existe uma única vez.',
  },
  exercicios: [
    {
      id: 'pleno-t4-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 1, 10);
        d.plusDays(5);
        d.minusMonths(1);
        System.out.println(d);
    }
}`,
      opcoes: ['`2024-01-10`', '`2023-12-15`', '`2024-01-15`', '`2023-12-10`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`LocalDate` é imutável. Os dois cálculos criam objetos novos que são descartados, porque o resultado não foi atribuído.',
    },
    {
      id: 'pleno-t4-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2023, 1, 31).plusMonths(1) + " " + LocalDate.of(2024, 3, 31).minusMonths(1));
    }
}`,
      resposta: '2023-02-28 2024-02-29',
      explicacao: 'O dia 31 não existe em fevereiro, então o cálculo usa o último dia válido: 28 em 2023 e 29 em 2024, que é bissexto.',
    },
    {
      id: 'pleno-t4-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2024, 2, 29));
        System.out.println(LocalDate.of(2023, 2, 29));
    }
}`,
      opcoes: [
        'Imprime `2024-02-29` e lança `DateTimeException`',
        'Imprime `2024-02-29` e `2023-02-28`',
        'Imprime `2024-02-29` e `2023-03-01`',
        'Lança `DateTimeException` na primeira linha',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'DateTimeException', saida: '2024-02-29' },
      explicacao: '2024 é bissexto e 2023 não. Na criação com `of`, uma data impossível é erro; o ajuste para o último dia válido só acontece em cálculos como `plusMonths`.',
    },
    {
      id: 'pleno-t4-e01-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate data = LocalDate.of(2024, 5, 1);
        LocalTime hora = LocalTime.of(8, 0);
        LocalDateTime junto = data.atTime(hora);
        LocalDate amanha = data.plusDays(1);
        LocalDate depois = data.plusHours(24);
        System.out.println(junto + " " + amanha + " " + depois);
    }
}`,
      resposta: 9,
      explicacao: '`LocalDate` não tem unidades de hora, então não existe `plusHours`. Para somar horas, seria preciso um `LocalDateTime`.',
    },
    {
      id: 'pleno-t4-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalTime.of(9, 0) + " " + LocalTime.of(9, 0, 30) + " " + LocalTime.of(23, 59).plusMinutes(2));
    }
}`,
      opcoes: ['`09:00 09:00:30 00:01`', '`09:00:00 09:00:30 24:01`', '`9:00 9:00:30 00:01`', '`09:00 09:00:30 23:61`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Segundos zerados são omitidos no `toString`, e as horas sempre têm dois dígitos. Passar da meia-noite volta para 00:01.',
    },
    {
      id: 'pleno-t4-e01-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`LocalDate d = LocalDate.of(2024, Month.MAY, 1);`',
        '`LocalTime t = LocalTime.of(10, 30).plusMinutes(15);`',
        '`LocalDateTime x = LocalDate.of(2024, 5, 1).atTime(10, 0);`',
        '`LocalDate d = new LocalDate(2024, 5, 1);`',
        '`LocalTime t = LocalTime.of(10, 30).plusDays(1);`',
        '`LocalDate d = LocalDate.of(2024, 5, 1).plusHours(1);`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Os construtores são privados, e cada classe só tem os métodos das unidades que representa. `atTime` junta uma data e uma hora num `LocalDateTime`.',
    },
    {
      id: 'pleno-t4-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 12, 25);
        System.out.println(d.getDayOfWeek() + " " + d.getMonth() + " " + d.getMonthValue());
    }
}`,
      opcoes: ['`WEDNESDAY DECEMBER 12`', '`WEDNESDAY DECEMBER 11`', '`3 12 12`', '`TUESDAY DECEMBER 12`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`getDayOfWeek` e `getMonth` devolvem enums, impressos pelo nome. `getMonthValue` devolve o número, de 1 a 12.',
    },
    {
      id: 'pleno-t4-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o ajustador que leva ao último dia do mês. O programa deve imprimir `2024-02-29`.',
      codigo: `import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

public class FimDoMes {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 2, 10);
        System.out.println(d.with(TemporalAdjusters.___()));
    }
}`,
      respostas: ['lastDayOfMonth'],
      saida: '2024-02-29',
      explicacao: '`TemporalAdjusters.lastDayOfMonth()` sabe quantos dias cada mês tem, inclusive em anos bissextos.',
    },
    {
      id: 'pleno-t4-e01-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDateTime.of(2024, 12, 31, 23, 50).plusMinutes(15));
    }
}`,
      opcoes: ['`2025-01-01T00:05`', '`2024-12-31T00:05`', '`2024-12-31T24:05`', '`2025-01-01T00:05:00`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Diferente de `LocalTime`, o `LocalDateTime` leva a virada da meia-noite para a data, e aqui também para o ano.',
    },
    {
      id: 'pleno-t4-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println("lendo");
        LocalDate d = LocalDate.parse("2024-3-5");
        System.out.println(d);
    }
}`,
      opcoes: [
        'Imprime `lendo` e lança `DateTimeParseException`',
        'Imprime `lendo` e `2024-03-05`',
        'Imprime `lendo` e `2024-3-5`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'DateTimeParseException', saida: 'lendo' },
      explicacao: 'Sem formatador, `parse` usa o formato ISO, que exige dois dígitos para mês e dia: `2024-03-05`.',
    },
    {
      id: 'pleno-t4-e01-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Month.NOVEMBER.plus(3) + " " + DayOfWeek.SATURDAY.plus(2) + " " + Month.FEBRUARY.maxLength());
    }
}`,
      opcoes: ['`FEBRUARY MONDAY 29`', '`FEBRUARY MONDAY 28`', '`14 8 29`', 'Lança `DateTimeException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os enums `Month` e `DayOfWeek` dão a volta: depois de dezembro vem janeiro, depois de domingo vem segunda. `maxLength` considera anos bissextos.',
    },
    {
      id: 'pleno-t4-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate a = LocalDate.of(2024, 5, 1);
        LocalDate b = LocalDate.parse("2024-05-01");
        System.out.println(a.equals(b) + " " + a.isAfter(b) + " " + a.plusDays(1).isAfter(b));
    }
}`,
      opcoes: ['`true false true`', '`false false true`', '`true true true`', '`true false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As duas datas têm o mesmo valor, então `equals` é `true` e nenhuma é posterior à outra. O dia seguinte é posterior.',
    },
    {
      id: 'pleno-t4-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na API antiga, por que `new java.util.Date(2024, 2, 15)` é uma armadilha?',
      opcoes: [
        'O ano conta a partir de 1900 e o mês a partir de zero, então a data é 15 de março de 3924',
        'O construtor só aceita datas posteriores a 1970',
        'A data é criada no fuso de Greenwich e muda ao ser impressa',
        'O construtor lança exceção para meses abaixo de 3',
      ],
      resposta: 0,
      explicacao: 'O construtor, depreciado há décadas, soma 1900 ao ano e conta os meses de 0 a 11. No `java.time`, `LocalDate.of(2024, 3, 15)` diz exatamente o que parece.',
    },
    {
      id: 'pleno-t4-e01-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalTime t = LocalTime.of(22, 30);
        t = t.plusHours(3).plusMinutes(45);
        System.out.println(t + " " + t.isBefore(LocalTime.of(22, 30)));
    }
}`,
      resposta: '02:15 true',
      explicacao: 'O `LocalTime` passa da meia-noite e chega a 02:15, que vem antes de 22:30 no mesmo relógio, sem data para diferenciar os dias.',
    },
    {
      id: 'pleno-t4-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2023, 3, 31).withMonth(2) + " " + LocalDate.of(2024, 5, 20).withDayOfMonth(1).minusDays(1));
    }
}`,
      opcoes: [
        '`2023-02-28 2024-04-30`',
        'Lança `DateTimeException`',
        '`2023-03-03 2024-04-30`',
        '`2023-02-28 2024-05-00`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`withMonth` ajusta o dia para o último válido, como `plusMonths`. Voltar um dia a partir do dia 1 cai no último dia do mês anterior.',
    },
  ],
};

export default episodio;
