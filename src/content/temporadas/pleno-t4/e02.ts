import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t4-e02',
  minutos: 14,
  aula,
  armadilhas: [
    '`Period` guarda anos, meses e dias; `Duration` guarda segundos e nanossegundos.',
    '`Period.ofWeeks(2)` imprime `P14D`: semanas viram dias.',
    '`Duration.ofDays(1)` imprime `PT24H`: o `toString` de `Duration` nunca mostra dias.',
    '`Period.ofYears(1).ofMonths(2)` é `P2M`: as fábricas são estáticas e só a última vale.',
    '`Period` não normaliza sozinho: `Period.ofMonths(14)` é `P14M` até chamar `normalized()`.',
    '`LocalTime.plus(Period)` e `LocalDate.plus(Duration)` compilam, mas lançam `UnsupportedTemporalTypeException`.',
    '`Period.between(a, b).getDays()` é só a parte dos dias; o total vem de `ChronoUnit.DAYS.between(a, b)`.',
    '`toMinutes()` devolve o total; `toMinutesPart()` devolve só a parte dos minutos.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Period and Duration',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/period-duration/',
      tipo: 'documentacao',
      porque: 'As duas classes de quantidade, `ChronoUnit.between` e quando usar cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Period and Duration',
      url: 'https://docs.oracle.com/javase/tutorial/datetime/iso/period.html',
      tipo: 'documentacao',
      porque: 'A diferença entre medir em unidades de calendário e em unidades de tempo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.Period',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Period.html',
      tipo: 'documentacao',
      porque: 'As fábricas, `between`, `normalized` e a ordem em que os campos são somados a uma data.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.Duration',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Duration.html',
      tipo: 'documentacao',
      porque: 'O formato do `toString`, os métodos `toX` e `toXPart` e a representação em segundos e nanos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.temporal.ChronoUnit',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/temporal/ChronoUnit.html',
      tipo: 'documentacao',
      porque: 'As unidades de tempo e o `between`, que conta só unidades completas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipedia: ISO 8601, Durations',
      url: 'https://en.wikipedia.org/wiki/ISO_8601#Durations',
      tipo: 'artigo',
      porque: 'A norma por trás de `P1Y2M3D` e `PT1H30M`, usada também em JSON e XML.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Period and Duration in Java',
      url: 'https://www.baeldung.com/java-period-duration',
      tipo: 'artigo',
      porque: 'Criação, cálculo e conversão das duas classes com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Format a Milliseconds Duration to HH:MM:SS',
      url: 'https://www.baeldung.com/java-ms-to-hhmmss',
      tipo: 'artigo',
      porque: 'Formatando durações com os métodos `toXPart` do Java 9.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, Duration',
      url: 'https://www.youtube.com/watch?v=4vg2lEGYJi4',
      tipo: 'video',
      porque: 'Medindo intervalos de tempo com `Duration`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, Period',
      url: 'https://www.youtube.com/watch?v=g9GtolzNlPo',
      tipo: 'video',
      porque: 'Anos, meses e dias entre datas com `Period`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, ChronoUnit',
      url: 'https://www.youtube.com/watch?v=YuwLrTwLI88',
      tipo: 'video',
      porque: 'Contando dias, semanas e meses entre datas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'JDK IO 2016: Stephen Colebourne, Date and Time in Java 8',
      url: 'https://www.youtube.com/watch?v=2HXc3f-C3L0',
      tipo: 'video',
      porque: 'O autor da API explica as escolhas de projeto, inclusive a separação entre `Period` e `Duration`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de quando usar `Period` e `Duration` e as exceções de cada combinação.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Working with Dates and Times", partes "Working with Periods", "Working with Durations" e "Period vs. Duration"',
    },
  ],
  desafio: {
    titulo: 'Calculadora de prazos',
    enunciado:
      'Um projeto começa em 31/01/2024 com prazo de 1 mês e 15 dias. Calcule a data de entrega com um `Period` e os dias corridos com `ChronoUnit`. Depois, some as durações de três turnos de trabalho (08:30 às 12:00, 13:00 às 17:45 e 18:30 às 20:10) com `Duration` e calcule a média por turno com `dividedBy`. A saída deve ser:\n\n```text\nentrega: 2024-03-15 (P1M15D depois de 2024-01-31)\ndias corridos: 44\nhoras trabalhadas: PT9H55M (9h55min)\nmédia por turno: PT3H18M20S\n```',
    dicas: [
      'Somar um `Period` aplica primeiro os meses e depois os dias: 31/01 mais um mês é 29/02, e mais 15 dias, 15/03.',
      'Comece o total com `Duration.ZERO` e acumule com `plus`, guardando o resultado.',
      '`toHours()` dá as horas inteiras e `toMinutesPart()` os minutos que sobram.',
    ],
    solucao: `import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;

public class Prazos {
    public static void main(String[] args) {
        LocalDate inicio = LocalDate.of(2024, 1, 31);
        Period prazo = Period.of(0, 1, 15);
        LocalDate entrega = inicio.plus(prazo);
        System.out.println("entrega: " + entrega + " (" + prazo + " depois de " + inicio + ")");
        System.out.println("dias corridos: " + ChronoUnit.DAYS.between(inicio, entrega));

        LocalTime[][] turnos = {
            {LocalTime.of(8, 30), LocalTime.of(12, 0)},
            {LocalTime.of(13, 0), LocalTime.of(17, 45)},
            {LocalTime.of(18, 30), LocalTime.of(20, 10)},
        };
        Duration total = Duration.ZERO;
        for (LocalTime[] turno : turnos) {
            total = total.plus(Duration.between(turno[0], turno[1]));
        }
        System.out.println("horas trabalhadas: " + total + " (" + total.toHours() + "h" + total.toMinutesPart() + "min)");
        System.out.println("média por turno: " + total.dividedBy(turnos.length));
    }
}`,
    saida: 'entrega: 2024-03-15 (P1M15D depois de 2024-01-31)\ndias corridos: 44\nhoras trabalhadas: PT9H55M (9h55min)\nmédia por turno: PT3H18M20S',
    comentarios:
      'O prazo é uma quantidade de calendário, e por isso é um `Period`: "um mês" depende de qual mês. As horas trabalhadas são uma quantidade de relógio, e por isso uma `Duration`, que divide sem perder os segundos. Como as classes são imutáveis, `total.plus(...)` sem a atribuição não acumularia nada.',
  },
  exercicios: [
    {
      id: 'pleno-t4-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Period.ofWeeks(3) + " " + Duration.ofDays(2));
    }
}`,
      opcoes: ['`P21D PT48H`', '`P3W P2D`', '`P21D P2D`', '`P3W PT48H`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Period` não guarda semanas, só dias. O `toString` de `Duration` vai no máximo até horas.',
    },
    {
      id: 'pleno-t4-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Period p = Period.ofDays(10).ofMonths(1).ofYears(2);
        System.out.println(p);
    }
}`,
      opcoes: ['`P2Y`', '`P2Y1M10D`', '`P10D`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`ofDays`, `ofMonths` e `ofYears` são estáticos. Chamá-los por um objeto compila, mas ignora o objeto: cada chamada cria um período novo, e fica o último.',
    },
    {
      id: 'pleno-t4-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Duration d = Duration.between(LocalTime.of(8, 40), LocalTime.of(10, 5));
        System.out.println(d + " " + d.toMinutes() + " " + d.toMinutesPart());
    }
}`,
      resposta: 'PT1H25M 85 25',
      explicacao: 'São 1 hora e 25 minutos. `toMinutes` dá o total, 85; `toMinutesPart` dá o que sobra depois das horas, 25.',
    },
    {
      id: 'pleno-t4-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalTime abertura = LocalTime.of(9, 0);
        System.out.println(abertura.plus(Duration.ofHours(1)));
        System.out.println(abertura.plus(Period.ofDays(1)));
    }
}`,
      opcoes: [
        'Imprime `10:00` e lança `UnsupportedTemporalTypeException`',
        'Imprime `10:00` e `09:00`',
        'Não compila: `LocalTime.plus` não aceita `Period`',
        'Imprime `10:00` e `09:00+1`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedTemporalTypeException', saida: '10:00' },
      explicacao: '`plus` recebe um `TemporalAmount`, então compila. Na execução, o `LocalTime` não sabe somar dias e recusa.',
    },
    {
      id: 'pleno-t4-e02-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        LocalDate a = LocalDate.of(2024, 2, 10);
        LocalDate b = LocalDate.of(2024, 4, 15);
        Period p = Period.between(a, b);
        System.out.println(p + " " + p.getDays() + " " + ChronoUnit.DAYS.between(a, b));
    }
}`,
      opcoes: ['`P2M5D 5 65`', '`P2M5D 65 65`', '`P65D 65 65`', '`P2M5D 5 64`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Period.between` decompõe em 2 meses e 5 dias, e `getDays` devolve só os 5. `ChronoUnit.DAYS.between` conta o total: 19 dias de fevereiro, 31 de março e 15 de abril.',
    },
    {
      id: 'pleno-t4-e02-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`Period` guarda anos, meses e dias como campos independentes',
        'O `toString` de `Duration` nunca mostra dias',
        '`Period.ofWeeks` guarda o número de semanas',
        'Uma `Duration` pode ser somada a um `LocalDate`',
        '`Period.ofMonths(14)` imprime `P1Y2M`',
      ],
      respostas: [0, 1],
      explicacao: 'Semanas viram dias, `LocalDate` não aceita unidades de segundos e `Period` só normaliza os meses com `normalized()`.',
    },
    {
      id: 'pleno-t4-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Period p = Period.ofMonths(25).normalized();
        System.out.println(p + " " + p.getYears() + " " + p.toTotalMonths());
    }
}`,
      opcoes: ['`P2Y1M 2 25`', '`P25M 0 25`', '`P2Y1M 2 1`', '`P2Y1M 2 24`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`normalized` converte cada 12 meses em um ano. `toTotalMonths` volta a contar tudo em meses.',
    },
    {
      id: 'pleno-t4-e02-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a unidade que conta os dias entre as datas. O programa deve imprimir `60`.',
      codigo: `import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Dias {
    public static void main(String[] args) {
        LocalDate a = LocalDate.of(2024, 1, 1);
        LocalDate b = LocalDate.of(2024, 3, 1);
        System.out.println(ChronoUnit.___.between(a, b));
    }
}`,
      respostas: ['DAYS'],
      saida: '60',
      explicacao: 'Janeiro tem 31 dias e fevereiro de 2024, 29. `ChronoUnit.DAYS.between` devolve o total como `long`.',
    },
    {
      id: 'pleno-t4-e02-q09',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Period p1 = Period.ofDays(3);
        Period p2 = Period.ofWeeks(1);
        Duration d1 = Duration.ofHours(5);
        Period p3 = Period.ofHours(2);
        System.out.println(p1 + " " + p2 + " " + d1 + " " + p3);
    }
}`,
      resposta: 8,
      explicacao: '`Period` só trabalha com anos, meses, semanas e dias. Horas são assunto de `Duration`.',
    },
    {
      id: 'pleno-t4-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Duration.ofSeconds(90) + " " + Duration.ofMinutes(60) + " " + Duration.ofSeconds(3600).plusMillis(500));
    }
}`,
      opcoes: ['`PT1M30S PT1H PT1H0.5S`', '`PT90S PT60M PT3600.5S`', '`PT1M30S PT1H PT1H0M0.5S`', '`PT1.5M PT1H PT1H0.5S`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `toString` converte para horas, minutos e segundos e omite as partes zeradas, exceto quando ainda há segundos a mostrar.',
    },
    {
      id: 'pleno-t4-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime t = LocalDateTime.of(2024, 2, 28, 12, 0);
        System.out.println(t.plus(Period.ofDays(2)) + " " + t.plus(Duration.ofHours(30)));
    }
}`,
      opcoes: [
        '`2024-03-01T12:00 2024-02-29T18:00`',
        '`2024-03-02T12:00 2024-02-29T18:00`',
        '`2024-03-01T12:00 2024-03-01T18:00`',
        'Lança `UnsupportedTemporalTypeException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`LocalDateTime` aceita as duas quantidades. Dois dias a partir de 28 de fevereiro de 2024, ano bissexto, caem em 1º de março; 30 horas levam a 29 de fevereiro às 18h.',
    },
    {
      id: 'pleno-t4-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate a = LocalDate.of(2024, 1, 1);
        LocalDate b = LocalDate.of(2024, 1, 2);
        System.out.println(Period.between(a, b));
        System.out.println(Duration.between(a, b));
    }
}`,
      opcoes: [
        'Imprime `P1D` e lança `UnsupportedTemporalTypeException`',
        'Imprime `P1D` e `PT24H`',
        'Não compila: `Duration.between` não aceita `LocalDate`',
        'Imprime `P1D` e `PT0S`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedTemporalTypeException', saida: 'P1D' },
      explicacao: '`Duration.between` recebe `Temporal`, então compila. Mas ele mede em segundos, e `LocalDate` não tem essa unidade.',
    },
    {
      id: 'pleno-t4-e02-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Period p = Period.between(LocalDate.of(2024, 5, 20), LocalDate.of(2024, 3, 10));
        System.out.println(p + " " + p.isNegative());
    }
}`,
      resposta: 'P-2M-10D true',
      explicacao: 'Com o fim antes do início, o período é negativo, e cada campo aparece com o sinal.',
    },
    {
      id: 'pleno-t4-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        LocalDate a = LocalDate.of(2024, 1, 31);
        LocalDate b = LocalDate.of(2024, 2, 29);
        System.out.println(a.until(b, ChronoUnit.MONTHS) + " " + ChronoUnit.WEEKS.between(a, b) + " " + Period.between(a, b));
    }
}`,
      opcoes: ['`0 4 P29D`', '`1 4 P1M`', '`1 4 P29D`', '`0 5 P29D`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um mês completo a partir de 31 de janeiro exigiria chegar ao "dia 31" de fevereiro, que não existe, então ainda não passou um mês inteiro. São 29 dias, ou 4 semanas completas.',
    },
    {
      id: 'pleno-t4-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que somar `Period.ofDays(1)` e somar `Duration.ofHours(24)` a um horário com fuso podem dar resultados diferentes?',
      opcoes: [
        'Porque num dia com mudança de horário de verão um dia de calendário não tem 24 horas',
        'Porque `Duration` ignora anos bissextos',
        'Porque `Period` arredonda as horas para o dia mais próximo',
        'Não podem: as duas somas sempre dão o mesmo resultado',
      ],
      resposta: 0,
      explicacao: '`Period` preserva o horário de parede e `Duration` preserva o tempo decorrido. Quando o relógio adianta ou atrasa uma hora, essas duas coisas se separam.',
    },
  ],
};

export default episodio;
