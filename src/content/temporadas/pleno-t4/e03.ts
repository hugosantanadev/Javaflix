import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t4-e03',
  minutos: 16,
  aula,
  armadilhas: [
    '`Instant` conta segundos desde 1970-01-01T00:00Z, e o `toString` é sempre em UTC, terminando com `Z`.',
    '`Instant` aceita unidades até dias; somar meses ou anos lança `UnsupportedTemporalTypeException`.',
    '`ZoneOffset` é um deslocamento fixo; `ZoneId` é uma região cujas regras mudam com o tempo.',
    '`ZoneId.of` com um nome desconhecido, como `America/Brasilia`, lança `ZoneRulesException`.',
    '`LocalDateTime.toInstant` exige um `ZoneOffset`: `ldt.toInstant()` sem argumento não compila.',
    '`withZoneSameInstant` mantém o momento e muda a hora; `withZoneSameLocal` mantém a hora e muda o momento.',
    '`equals` entre `ZonedDateTime` compara também o fuso; `isEqual`, `isBefore` e `isAfter` comparam só o instante.',
    '`-03:00` está três horas atrás do UTC: 10h em São Paulo são 13h UTC.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Instant',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/instant/',
      tipo: 'documentacao',
      porque: 'O instante na linha do tempo, a época Unix e as conversões para outras classes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Time Zone and Offset',
      url: 'https://dev.java/learn/api/date-time-regex/date-time/zoneid-zone-offset/',
      tipo: 'documentacao',
      porque: '`ZoneId`, `ZoneOffset`, `ZonedDateTime` e `OffsetDateTime`, com a diferença entre fuso e deslocamento.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Time Zone and Offset Classes',
      url: 'https://docs.oracle.com/javase/tutorial/datetime/iso/timezones.html',
      tipo: 'documentacao',
      porque: 'Exemplos de conversão entre fusos, incluindo o cálculo de um voo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.ZonedDateTime',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/ZonedDateTime.html',
      tipo: 'documentacao',
      porque: 'A combinação de data, hora e fuso, e as regras de `equals`, `isEqual` e mudança de fuso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.time.Instant',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Instant.html',
      tipo: 'documentacao',
      porque: 'A escala de tempo do Java, a faixa de valores e as unidades suportadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'IANA: Time Zone Database',
      url: 'https://www.iana.org/time-zones',
      tipo: 'documentacao',
      porque: 'O banco de dados de fusos usado pelo Java e pelos sistemas operacionais, com o histórico de versões.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Difference Between Instant and LocalDateTime',
      url: 'https://www.baeldung.com/java-instant-vs-localdatetime',
      tipo: 'artigo',
      porque: 'Quando usar um instante absoluto e quando uma data e hora de parede.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Differences Between ZonedDateTime and OffsetDateTime',
      url: 'https://www.baeldung.com/java-zoneddatetime-offsetdatetime',
      tipo: 'artigo',
      porque: 'Fuso com regras contra deslocamento fixo, e qual guardar num banco de dados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jon Skeet: Storing UTC is not a silver bullet',
      url: 'https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/',
      tipo: 'artigo',
      porque: 'Por que converter tudo para UTC pode dar errado quando as regras de um fuso mudam.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Computerphile: The Problem with Time & Timezones',
      url: 'https://www.youtube.com/watch?v=-5wpm-gesOY',
      tipo: 'video',
      porque: 'Tom Scott explica por que lidar com fusos é tão difícil e por que não se deve fazê-lo à mão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, Instant',
      url: 'https://www.youtube.com/watch?v=mcv5zRtDGag',
      tipo: 'video',
      porque: 'O `Instant` e a época Unix, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, ZonedDateTime, ZoneId, OffsetDateTime',
      url: 'https://www.youtube.com/watch?v=75nO4WZVjq0',
      tipo: 'video',
      porque: 'Fusos e deslocamentos na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'RinaldoDev: Você sabe escolher entre Instant, LocalDateTime ou ZonedDateTime?',
      url: 'https://www.youtube.com/watch?v=gEoeKd2Zzvs',
      tipo: 'video',
      porque: 'Critérios para escolher a classe certa em sistemas reais, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Reunião em vários fusos',
    enunciado:
      'Uma reunião foi marcada para 12/06/2024 às 10h em São Paulo. Mostre o instante em UTC e, para Lisboa, Nova York, Tóquio, Manaus e Auckland (`Pacific/Auckland`), a data, a hora local e o deslocamento. No fim, liste os fusos em que a reunião cai fora do expediente (antes das 8h ou a partir das 18h). A saída deve ser:\n\n```text\ninstante: 2024-06-12T13:00:00Z\nEurope/Lisbon: 2024-06-12 14:00 (+01:00)\nAmerica/New_York: 2024-06-12 09:00 (-04:00)\nAsia/Tokyo: 2024-06-12 22:00 (+09:00)\nAmerica/Manaus: 2024-06-12 09:00 (-04:00)\nPacific/Auckland: 2024-06-13 01:00 (+12:00)\nfora do expediente: Asia/Tokyo, Pacific/Auckland\n```',
    dicas: [
      'Crie a reunião com `ZonedDateTime.of(LocalDateTime, ZoneId)` e converta com `withZoneSameInstant`.',
      '`getOffset()` dá o deslocamento em vigor naquele momento, com o horário de verão já aplicado.',
      'Em Auckland, o mesmo instante já é o dia seguinte.',
    ],
    solucao: `import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class Reuniao {
    public static void main(String[] args) {
        ZonedDateTime reuniao = ZonedDateTime.of(LocalDateTime.of(2024, 6, 12, 10, 0), ZoneId.of("America/Sao_Paulo"));
        System.out.println("instante: " + reuniao.toInstant());
        List<String> fora = new ArrayList<>();
        for (String id : List.of("Europe/Lisbon", "America/New_York", "Asia/Tokyo", "America/Manaus", "Pacific/Auckland")) {
            ZonedDateTime local = reuniao.withZoneSameInstant(ZoneId.of(id));
            System.out.println(id + ": " + local.toLocalDate() + " " + local.toLocalTime() + " (" + local.getOffset() + ")");
            LocalTime hora = local.toLocalTime();
            if (hora.isBefore(LocalTime.of(8, 0)) || !hora.isBefore(LocalTime.of(18, 0))) {
                fora.add(id);
            }
        }
        System.out.println("fora do expediente: " + String.join(", ", fora));
    }
}`,
    saida: 'instante: 2024-06-12T13:00:00Z\nEurope/Lisbon: 2024-06-12 14:00 (+01:00)\nAmerica/New_York: 2024-06-12 09:00 (-04:00)\nAsia/Tokyo: 2024-06-12 22:00 (+09:00)\nAmerica/Manaus: 2024-06-12 09:00 (-04:00)\nPacific/Auckland: 2024-06-13 01:00 (+12:00)\nfora do expediente: Asia/Tokyo, Pacific/Auckland',
    comentarios:
      'Em junho, Lisboa e Nova York estão no horário de verão (`+01:00` e `-04:00`), e Auckland, no hemisfério sul, está no horário padrão. Nenhuma dessas regras aparece no código: elas vêm do banco de fusos. O mesmo instante cai em dois dias diferentes, e por isso guardar só a hora de parede de um evento internacional não basta.',
  },
  exercicios: [
    {
      id: 'pleno-t4-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Instant.ofEpochSecond(86_400) + " " + Instant.ofEpochMilli(250));
    }
}`,
      opcoes: [
        '`1970-01-02T00:00:00Z 1970-01-01T00:00:00.250Z`',
        '`1970-01-01T24:00:00Z 1970-01-01T00:00:00.250Z`',
        '`1970-01-02 1970-01-01`',
        '`86400 250`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '86.400 segundos são exatamente um dia depois da época Unix. O `toString` de `Instant` mostra a data e a hora em UTC, com frações quando existem.',
    },
    {
      id: 'pleno-t4-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Instant i = Instant.parse("2024-06-01T00:30:00Z");
        System.out.println(i.atZone(ZoneId.of("America/Sao_Paulo")).toLocalDateTime());
    }
}`,
      resposta: '2024-05-31T21:30',
      explicacao: 'São Paulo está três horas atrás do UTC, então 00:30 UTC de 1º de junho ainda é 21:30 de 31 de maio.',
    },
    {
      id: 'pleno-t4-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        Instant i = Instant.parse("2024-01-31T12:00:00Z");
        System.out.println(i.plus(1, ChronoUnit.DAYS));
        System.out.println(i.plus(1, ChronoUnit.MONTHS));
    }
}`,
      opcoes: [
        'Imprime `2024-02-01T12:00:00Z` e lança `UnsupportedTemporalTypeException`',
        'Imprime `2024-02-01T12:00:00Z` e `2024-02-29T12:00:00Z`',
        'Não compila: `Instant` não aceita `ChronoUnit`',
        'Lança `UnsupportedTemporalTypeException` na primeira soma',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedTemporalTypeException', saida: '2024-02-01T12:00:00Z' },
      explicacao: 'Para um `Instant`, um dia são sempre 86.400 segundos. Um mês depende de calendário e fuso, que o instante não tem.',
    },
    {
      id: 'pleno-t4-e03-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime ldt = LocalDateTime.of(2024, 3, 15, 10, 0);
        ZonedDateTime z = ldt.atZone(ZoneId.of("America/Sao_Paulo"));
        Instant a = z.toInstant();
        Instant b = ldt.toInstant(ZoneOffset.UTC);
        Instant c = ldt.toInstant();
        System.out.println(a + " " + b + " " + c);
    }
}`,
      resposta: 9,
      explicacao: 'Um `LocalDateTime` não sabe onde está. Para virar um instante, ele precisa de um deslocamento, passado como argumento.',
    },
    {
      id: 'pleno-t4-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime sp = ZonedDateTime.of(LocalDateTime.of(2024, 3, 15, 10, 0), ZoneId.of("America/Sao_Paulo"));
        ZoneId manaus = ZoneId.of("America/Manaus");
        System.out.println(sp.withZoneSameInstant(manaus).getHour() + " " + sp.withZoneSameLocal(manaus).getHour());
    }
}`,
      opcoes: ['`9 10`', '`10 9`', '`11 10`', '`10 10`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Manaus está uma hora atrás de São Paulo. No mesmo instante, lá são 9h; mantendo a hora de parede, continua 10h, mas num instante diferente.',
    },
    {
      id: 'pleno-t4-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime sp = ZonedDateTime.of(LocalDateTime.of(2024, 3, 15, 10, 0), ZoneId.of("America/Sao_Paulo"));
        ZonedDateTime utc = sp.withZoneSameInstant(ZoneOffset.UTC);
        System.out.println(sp.equals(utc) + " " + sp.isEqual(utc));
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os dois representam o mesmo instante, então `isEqual` é `true`. `equals` também compara a data, a hora e o fuso, que são diferentes.',
    },
    {
      id: 'pleno-t4-e03-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um voo sai de Manaus às 8h e chega a São Paulo às 13h15 do mesmo dia, 10/05/2024. Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime saida = ZonedDateTime.of(LocalDateTime.of(2024, 5, 10, 8, 0), ZoneId.of("America/Manaus"));
        ZonedDateTime chegada = ZonedDateTime.of(LocalDateTime.of(2024, 5, 10, 13, 15), ZoneId.of("America/Sao_Paulo"));
        System.out.println(Duration.between(saida, chegada));
    }
}`,
      opcoes: ['`PT4H15M`', '`PT5H15M`', '`PT6H15M`', '`PT13H15M`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em UTC, a saída é às 12h (Manaus está em `-04:00`) e a chegada às 16h15 (São Paulo em `-03:00`). A diferença de fuso "come" uma hora da conta ingênua.',
    },
    {
      id: 'pleno-t4-e03-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método de `Instant` que cria um `ZonedDateTime` num fuso. O programa deve imprimir `2024-03-15T10:00-03:00[America/Sao_Paulo]`.',
      codigo: `import java.time.Instant;
import java.time.ZoneId;

public class NoFuso {
    public static void main(String[] args) {
        Instant i = Instant.parse("2024-03-15T13:00:00Z");
        System.out.println(i.___(ZoneId.of("America/Sao_Paulo")));
    }
}`,
      respostas: ['atZone'],
      saida: '2024-03-15T10:00-03:00[America/Sao_Paulo]',
      explicacao: '`atZone` mantém o instante e calcula a data e a hora de parede naquele fuso.',
    },
    {
      id: 'pleno-t4-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ZoneId.of("America/Sao_Paulo"));
        System.out.println(ZoneId.of("America/Brasilia"));
    }
}`,
      opcoes: [
        'Imprime `America/Sao_Paulo` e lança `ZoneRulesException`',
        'Imprime `America/Sao_Paulo` e `America/Brasilia`',
        'Imprime `America/Sao_Paulo` e `-03:00`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ZoneRulesException', saida: 'America/Sao_Paulo' },
      explicacao: 'O horário de Brasília é representado pelo fuso `America/Sao_Paulo`. Um nome que não existe no banco de fusos é recusado na execução.',
    },
    {
      id: 'pleno-t4-e03-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'O `toString` de `Instant` sempre mostra o horário em UTC',
        '`ZoneOffset` representa um deslocamento fixo em relação ao UTC',
        '`America/Sao_Paulo` teve o mesmo deslocamento em todas as datas',
        '`LocalDateTime` guarda o fuso do sistema em que foi criado',
        '`Instant` tem o método `plusMonths`',
      ],
      respostas: [0, 1],
      explicacao: 'São Paulo usou `-02:00` nos verões até 2019. `LocalDateTime` não guarda fuso nenhum, e `Instant` não tem métodos de calendário.',
    },
    {
      id: 'pleno-t4-e03-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        OffsetDateTime o = OffsetDateTime.of(LocalDateTime.of(2024, 1, 1, 0, 30), ZoneOffset.ofHours(-3));
        System.out.println(o + " " + o.toInstant());
    }
}`,
      resposta: '2024-01-01T00:30-03:00 2024-01-01T03:30:00Z',
      explicacao: '`OffsetDateTime` guarda um deslocamento fixo, sem nome de fuso. Para chegar ao UTC, somam-se as três horas.',
    },
    {
      id: 'pleno-t4-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime a = ZonedDateTime.of(LocalDateTime.of(2024, 3, 15, 12, 0), ZoneId.of("Europe/Lisbon"));
        ZonedDateTime b = ZonedDateTime.of(LocalDateTime.of(2024, 3, 15, 10, 0), ZoneId.of("America/Sao_Paulo"));
        System.out.println(b.isAfter(a) + " " + (b.getHour() > a.getHour()));
    }
}`,
      opcoes: ['`true false`', '`false false`', '`false true`', '`true true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em março, Lisboa está em UTC, então `a` é 12h UTC. As 10h de São Paulo são 13h UTC, um momento posterior, embora a hora de parede seja menor.',
    },
    {
      id: 'pleno-t4-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        Instant i = Instant.parse("2024-03-15T23:30:00Z");
        System.out.println(i.plus(1, ChronoUnit.HOURS).truncatedTo(ChronoUnit.DAYS));
    }
}`,
      opcoes: ['`2024-03-16T00:00:00Z`', '`2024-03-15T00:00:00Z`', '`2024-03-16T00:30:00Z`', 'Lança `UnsupportedTemporalTypeException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Somar uma hora leva a 00:30 do dia 16 em UTC. `truncatedTo(DAYS)` zera tudo abaixo do dia, sempre em UTC para um `Instant`.',
    },
    {
      id: 'pleno-t4-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece se um programa rodar num JDK com o banco de fusos anterior a 2019 e calcular datas de dezembro de 2024 em `America/Sao_Paulo`?',
      opcoes: [
        'Ele aplica o horário de verão que o Brasil aboliu e mostra horários uma hora adiantados',
        'Ele lança `ZoneRulesException` por fuso desatualizado',
        'Nada muda: as regras de fuso são calculadas pela posição do sol',
        'Ele usa automaticamente o banco de fusos do sistema operacional',
      ],
      resposta: 0,
      explicacao: 'As regras vêm embutidas no JDK. Sem a atualização, o Java continua seguindo as regras antigas, e por isso existe o `tzupdater`.',
    },
    {
      id: 'pleno-t4-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZoneId sp = ZoneId.of("America/Sao_Paulo");
        System.out.println(ZonedDateTime.of(2018, 12, 1, 12, 0, 0, 0, sp).getOffset() + " " + ZonedDateTime.of(2024, 12, 1, 12, 0, 0, 0, sp).getOffset());
    }
}`,
      opcoes: ['`-02:00 -03:00`', '`-03:00 -03:00`', '`-02:00 -02:00`', '`-03:00 -02:00`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em dezembro de 2018, São Paulo estava no horário de verão. Em 2024, o fuso já não tem horário de verão, e o deslocamento é o padrão.',
    },
  ],
};

export default episodio;
