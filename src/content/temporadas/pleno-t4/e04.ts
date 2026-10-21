import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t4-e04',
  minutos: 14,
  aula,
  armadilhas: [
    'Um horário dentro da lacuna não lança exceção: ele é empurrado para a frente pelo tamanho da lacuna (2h30 vira 3h30).',
    'Na sobreposição, o Java escolhe o deslocamento anterior; `withLaterOffsetAtOverlap` escolhe o posterior.',
    '`plusDays(1)` num `ZonedDateTime` mantém a hora de parede; `plus(Duration.ofHours(24))` mantém o tempo decorrido.',
    'No dia em que o relógio adianta, um dia tem 23 horas; no dia em que atrasa, 25.',
    '`Duration.between` entre `ZonedDateTime` mede tempo real; entre `LocalDateTime`, ignora o horário de verão.',
    'Somar horas atravessando a sobreposição pode repetir a mesma hora de parede com outro deslocamento.',
    'No Brasil, a mudança era à meia-noite: `atStartOfDay(zona)` podia devolver 1h.',
    '`withLaterOffsetAtOverlap` só existe em `ZonedDateTime`; `LocalDateTime` não sabe nada de fusos.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de ZonedDateTime: resolução de lacunas e sobreposições',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/ZonedDateTime.html#withLaterOffsetAtOverlap()',
      tipo: 'documentacao',
      porque: 'As regras exatas de como um horário de parede ambíguo ou inexistente é resolvido.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.zone.ZoneRules',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/zone/ZoneRules.html',
      tipo: 'documentacao',
      porque: 'Transições, deslocamentos válidos e a consulta `isDaylightSavings`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Timezone Updater Tool',
      url: 'https://www.oracle.com/java/technologies/javase/tzupdater-readme.html',
      tipo: 'documentacao',
      porque: 'Como atualizar o banco de fusos de um JDK quando um país muda as regras.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Decreto nº 9.772, de 25 de abril de 2019',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/D9772.htm',
      tipo: 'documentacao',
      porque: 'O texto que encerrou o horário de verão no Brasil e mudou as regras de `America/Sao_Paulo`.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Horário de verão no Brasil',
      url: 'https://pt.wikipedia.org/wiki/Hor%C3%A1rio_de_ver%C3%A3o_no_Brasil',
      tipo: 'artigo',
      porque: 'A história das datas de início e fim, que explica os casos de meia-noite.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipedia: tz database',
      url: 'https://en.wikipedia.org/wiki/Tz_database',
      tipo: 'artigo',
      porque: 'Como o banco de fusos é organizado, mantido e distribuído.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Handling Daylight Savings Time in Java',
      url: 'https://www.baeldung.com/java-daylight-savings',
      tipo: 'artigo',
      porque: 'Lacunas e sobreposições com a API nova e com a antiga.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: How to Set the JVM Time Zone',
      url: 'https://www.baeldung.com/java-jvm-time-zone',
      tipo: 'artigo',
      porque: 'De onde vem o fuso padrão da JVM e por que não depender dele.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Clustermicro: Java OCP 21 (1Z0-830), Time Zones & DST, Spring Forward, Fall Back',
      url: 'https://www.youtube.com/watch?v=Ys8jBRcV6lc',
      tipo: 'video',
      porque: 'As questões de horário de verão da prova resolvidas passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'CGP Grey: You Lose an Hour of Sleep to Save $4',
      url: 'https://www.youtube.com/watch?v=84aWtseb2-4',
      tipo: 'video',
      porque: 'A história e a política do horário de verão, em poucos minutos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os exemplos de lacuna e sobreposição que a prova repete, com a conversão para UTC.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Working with Dates and Times", parte "Accounting for Daylight Saving Time"',
    },
  ],
  desafio: {
    titulo: 'Plantões noturnos',
    enunciado:
      'Um hospital em Nova York paga os plantões pelo tempo real trabalhado. Para três plantões das 22h às 6h, iniciados em 09/03/2024, 02/11/2024 e 01/06/2024, calcule as horas reais (com `ZonedDateTime` no fuso `America/New_York`) e as horas pelo relógio de parede (com `LocalDateTime`), e o total pago. A saída deve ser:\n\n```text\n2024-03-09 22:00 até 2024-03-10 06:00: 7h (parede: 8h)\n2024-11-02 22:00 até 2024-11-03 06:00: 9h (parede: 8h)\n2024-06-01 22:00 até 2024-06-02 06:00: 8h (parede: 8h)\ntotal pago: 24h\n```',
    dicas: [
      '`ldt.atZone(fuso)` transforma cada horário de parede num `ZonedDateTime`.',
      '`Duration.between` entre dois `LocalDateTime` não conhece fusos e sempre dá 8 horas aqui.',
      'Para imprimir data e hora com espaço, junte `toLocalDate()` e `toLocalTime()`.',
    ],
    solucao: `import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class Plantoes {
    static final ZoneId FUSO = ZoneId.of("America/New_York");

    static String texto(LocalDateTime t) {
        return t.toLocalDate() + " " + t.toLocalTime();
    }

    public static void main(String[] args) {
        LocalDateTime[][] plantoes = {
            {LocalDateTime.of(2024, 3, 9, 22, 0), LocalDateTime.of(2024, 3, 10, 6, 0)},
            {LocalDateTime.of(2024, 11, 2, 22, 0), LocalDateTime.of(2024, 11, 3, 6, 0)},
            {LocalDateTime.of(2024, 6, 1, 22, 0), LocalDateTime.of(2024, 6, 2, 6, 0)},
        };
        Duration total = Duration.ZERO;
        for (LocalDateTime[] p : plantoes) {
            Duration real = Duration.between(p[0].atZone(FUSO), p[1].atZone(FUSO));
            Duration parede = Duration.between(p[0], p[1]);
            total = total.plus(real);
            System.out.println(texto(p[0]) + " até " + texto(p[1]) + ": " + real.toHours() + "h (parede: " + parede.toHours() + "h)");
        }
        System.out.println("total pago: " + total.toHours() + "h");
    }
}`,
    saida: '2024-03-09 22:00 até 2024-03-10 06:00: 7h (parede: 8h)\n2024-11-02 22:00 até 2024-11-03 06:00: 9h (parede: 8h)\n2024-06-01 22:00 até 2024-06-02 06:00: 8h (parede: 8h)\ntotal pago: 24h',
    comentarios:
      'Pelo relógio de parede, os três plantões têm 8 horas. Na prática, quem trabalhou na noite em que o relógio adiantou trabalhou 7, e quem trabalhou na noite em que atrasou trabalhou 9. Um sistema de folha de pagamento que guardasse só `LocalDateTime` pagaria errado duas vezes por ano. A soma bate por coincidência: as duas mudanças se anulam.',
  },
  exercicios: [
    {
      id: 'pleno-t4-e04-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em Nova York, em 10/03/2024, o relógio pulou das 2h para as 3h. Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZoneId ny = ZoneId.of("America/New_York");
        System.out.println(ZonedDateTime.of(LocalDateTime.of(2024, 3, 10, 2, 15), ny));
    }
}`,
      opcoes: [
        '`2024-03-10T03:15-04:00[America/New_York]`',
        '`2024-03-10T02:15-05:00[America/New_York]`',
        '`2024-03-10T01:15-05:00[America/New_York]`',
        'Lança `DateTimeException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '2h15 não existiu naquele dia. O Java não lança exceção: empurra o horário para a frente pelo tamanho da lacuna, uma hora, já no deslocamento de verão.',
    },
    {
      id: 'pleno-t4-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em Nova York, em 03/11/2024, o relógio voltou das 2h para a 1h. Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZoneId ny = ZoneId.of("America/New_York");
        ZonedDateTime z = ZonedDateTime.of(LocalDateTime.of(2024, 11, 3, 1, 45), ny);
        System.out.println(z.getOffset() + " " + z.withLaterOffsetAtOverlap().getOffset());
    }
}`,
      opcoes: ['`-04:00 -05:00`', '`-05:00 -04:00`', '`-05:00 -05:00`', '`-04:00 -04:00`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '1h45 aconteceu duas vezes. Por padrão, o Java fica com a primeira, ainda no horário de verão; `withLaterOffsetAtOverlap` escolhe a segunda.',
    },
    {
      id: 'pleno-t4-e04-q03',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime sab = ZonedDateTime.of(LocalDateTime.of(2024, 11, 2, 12, 0), ZoneId.of("America/New_York"));
        System.out.println(sab.plusDays(1).getHour() + " " + sab.plus(Duration.ofHours(24)).getHour() + " " + Duration.between(sab, sab.plusDays(1)));
    }
}`,
      resposta: '12 11 PT25H',
      explicacao: 'O domingo em que o relógio volta tem 25 horas. `plusDays` mantém o meio-dia; 24 horas reais terminam às 11h; e entre os dois meios-dias passam 25 horas.',
    },
    {
      id: 'pleno-t4-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZoneId ny = ZoneId.of("America/New_York");
        ZonedDateTime a = ZonedDateTime.of(LocalDateTime.of(2024, 3, 10, 1, 0), ny);
        ZonedDateTime b = ZonedDateTime.of(LocalDateTime.of(2024, 3, 10, 3, 0), ny);
        System.out.println(Duration.between(a, b));
    }
}`,
      opcoes: ['`PT1H`', '`PT2H`', '`PT3H`', '`PT0S`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em UTC, 1h `-05:00` são 6h, e 3h `-04:00` são 7h. Passou uma hora real, embora o relógio de parede tenha andado duas.',
    },
    {
      id: 'pleno-t4-e04-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime t = ZonedDateTime.of(LocalDateTime.of(2024, 11, 3, 0, 30), ZoneId.of("America/New_York"));
        System.out.println(t.plusHours(2).toLocalTime() + " " + t.plusHours(3).toLocalTime());
    }
}`,
      opcoes: ['`01:30 02:30`', '`02:30 03:30`', '`01:30 01:30`', '`02:30 02:30`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Às 2h, o relógio volta para 1h. Duas horas reais depois da 0h30 o relógio marca 1h30, pela segunda vez; três horas depois, 2h30.',
    },
    {
      id: 'pleno-t4-e04-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Um horário dentro da lacuna é ajustado para a frente',
        'Na sobreposição, o deslocamento anterior é o padrão',
        'Criar um horário dentro da lacuna lança `DateTimeException`',
        '`plusDays(1)` sempre soma exatamente 24 horas',
        '`Duration.between` entre `ZonedDateTime` ignora o horário de verão',
      ],
      respostas: [0, 1],
      explicacao: '`plusDays` preserva a hora de parede, mesmo que o dia tenha 23 ou 25 horas, e `Duration.between` mede o tempo real, que é justamente o afetado pelo horário de verão.',
    },
    {
      id: 'pleno-t4-e04-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Em 04/11/2018, o horário de verão começou em São Paulo à meia-noite. Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate dia = LocalDate.of(2018, 11, 4);
        System.out.println(dia.atStartOfDay().toLocalTime() + " " + dia.atStartOfDay(ZoneId.of("America/Sao_Paulo")).toLocalTime());
    }
}`,
      opcoes: ['`00:00 01:00`', '`00:00 00:00`', '`01:00 01:00`', '`00:00 23:00`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem fuso, o dia começa à meia-noite por definição. Em São Paulo, naquele dia, a meia-noite não existiu, e o primeiro instante foi 1h.',
    },
    {
      id: 'pleno-t4-e04-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para escolher a segunda ocorrência do horário repetido. O programa deve imprimir `-05:00`.',
      codigo: `import java.time.*;

public class Sobreposta {
    public static void main(String[] args) {
        ZonedDateTime z = ZonedDateTime.of(LocalDateTime.of(2024, 11, 3, 1, 30), ZoneId.of("America/New_York"));
        System.out.println(z.___().getOffset());
    }
}`,
      respostas: ['withLaterOffsetAtOverlap'],
      saida: '-05:00',
      explicacao: '`withLaterOffsetAtOverlap` só faz efeito numa sobreposição: escolhe o deslocamento posterior, já fora do horário de verão.',
    },
    {
      id: 'pleno-t4-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        ZoneId ny = ZoneId.of("America/New_York");
        ZonedDateTime a = LocalDate.of(2024, 3, 10).atStartOfDay(ny);
        ZonedDateTime b = LocalDate.of(2024, 3, 11).atStartOfDay(ny);
        System.out.println(ChronoUnit.HOURS.between(a, b));
    }
}`,
      opcoes: ['`23`', '`24`', '`25`', '`0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O domingo em que o relógio adianta tem uma hora a menos. Entre as duas meias-noites passam 23 horas reais.',
    },
    {
      id: 'pleno-t4-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Em Lisboa, em 31/03/2024, o relógio pulou da 1h para as 2h. Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ZonedDateTime.of(LocalDateTime.of(2024, 3, 31, 1, 30), ZoneId.of("Europe/Lisbon")));
    }
}`,
      opcoes: [
        '`2024-03-31T02:30+01:00[Europe/Lisbon]`',
        '`2024-03-31T01:30Z[Europe/Lisbon]`',
        '`2024-03-31T01:30+01:00[Europe/Lisbon]`',
        'Lança `DateTimeException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em Lisboa, a lacuna é entre 1h e 2h. O horário inexistente é empurrado uma hora para a frente, já no deslocamento de verão, `+01:00`.',
    },
    {
      id: 'pleno-t4-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime a = LocalDateTime.of(2024, 3, 10, 1, 0);
        LocalDateTime b = LocalDateTime.of(2024, 3, 10, 3, 0);
        System.out.println(Duration.between(a, b));
    }
}`,
      opcoes: ['`PT2H`', '`PT1H`', '`PT3H`', 'Lança `DateTimeException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem fuso, não existe horário de verão: um `LocalDateTime` mede pelo relógio de parede. A mesma conta com `ZonedDateTime` em Nova York daria uma hora.',
    },
    {
      id: 'pleno-t4-e04-q12',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZoneId ny = ZoneId.of("America/New_York");
        LocalDateTime ldt = LocalDateTime.of(2024, 11, 3, 1, 30);
        ZonedDateTime z = ldt.atZone(ny);
        ZonedDateTime tarde = z.withLaterOffsetAtOverlap();
        LocalDateTime erro = ldt.withLaterOffsetAtOverlap();
        System.out.println(tarde + " " + erro);
    }
}`,
      resposta: 9,
      explicacao: 'Sobreposição é um conceito de fuso. `LocalDateTime` não tem fuso, e portanto não tem esse método.',
    },
    {
      id: 'pleno-t4-e04-q13',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;
import java.time.zone.ZoneRules;

public class Teste {
    public static void main(String[] args) {
        ZoneRules r = ZoneId.of("America/New_York").getRules();
        System.out.println(r.getValidOffsets(LocalDateTime.of(2024, 3, 10, 2, 30)).size() + " "
            + r.getValidOffsets(LocalDateTime.of(2024, 11, 3, 1, 30)).size() + " "
            + r.getValidOffsets(LocalDateTime.of(2024, 7, 4, 12, 0)).size());
    }
}`,
      resposta: '0 2 1',
      explicacao: 'Na lacuna, nenhum deslocamento torna o horário válido; na sobreposição, dois; num dia comum, um.',
    },
    {
      id: 'pleno-t4-e04-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um alarme deve tocar todo dia às 7h, no fuso do usuário. Como calcular o próximo toque a partir do atual?',
      opcoes: [
        '`proximo = atual.plusDays(1)`, com `atual` sendo um `ZonedDateTime`',
        '`proximo = atual.plus(Duration.ofHours(24))`',
        '`proximo = atual.toInstant().plusSeconds(86_400)`',
        'Qualquer uma das três, porque sempre dão o mesmo resultado',
      ],
      resposta: 0,
      explicacao: 'O alarme segue o relógio de parede, então a quantidade é de calendário. Somar 24 horas reais faria o alarme tocar às 8h ou às 6h depois de uma mudança de horário.',
    },
    {
      id: 'pleno-t4-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.zone.ZoneRules;

public class Teste {
    public static void main(String[] args) {
        ZoneRules r = ZoneId.of("America/New_York").getRules();
        System.out.println(r.isDaylightSavings(Instant.parse("2024-07-01T00:00:00Z")) + " " + r.isDaylightSavings(Instant.parse("2024-01-01T00:00:00Z")));
    }
}`,
      opcoes: ['`true false`', '`false true`', '`true true`', '`false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No hemisfério norte, o horário de verão vai de março a novembro. Em julho, Nova York está nele; em janeiro, não.',
    },
  ],
};

export default episodio;
