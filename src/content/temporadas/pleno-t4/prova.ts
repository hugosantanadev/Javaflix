import type { Exercicio } from '../../types';

/** Prova da temporada Pleno T4: datas e horas. */
const prova: Exercicio[] = [
  {
    id: 'pleno-t4-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 3, 31);
        d.plusMonths(1);
        LocalDate e = d.plusMonths(1);
        System.out.println(d + " " + e);
    }
}`,
    opcoes: ['`2024-03-31 2024-04-30`', '`2024-04-30 2024-05-31`', '`2024-03-31 2024-05-01`', 'Lança `DateTimeException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A primeira soma é descartada, porque `LocalDate` é imutável. A segunda vai para abril, que não tem dia 31, e fica no último dia válido.',
  },
  {
    id: 'pleno-t4-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos compilam? Escolha três.',
    opcoes: [
      '`LocalDate d = LocalDate.now().plusWeeks(1);`',
      '`LocalTime t = LocalTime.NOON.minusMinutes(1);`',
      '`Duration x = Duration.between(LocalTime.MIN, LocalTime.MAX);`',
      '`LocalDate d = LocalDate.of(2024, 1, 1).plusMinutes(1);`',
      '`Period p = Period.ofHours(1);`',
      '`LocalDateTime t = new LocalDateTime();`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`LocalDate` não tem métodos de minutos, `Period` não tem horas, e as classes de `java.time` não têm construtores públicos.',
  },
  {
    id: 'pleno-t4-prova-q03',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Period.ofWeeks(1).plusDays(2) + " " + Duration.ofMinutes(135));
    }
}`,
    resposta: 'P9D PT2H15M',
    explicacao: 'Uma semana vira 7 dias, mais 2. A `Duration` converte 135 minutos em horas e minutos no `toString`.',
  },
  {
    id: 'pleno-t4-prova-q04',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Period p = Period.ofYears(2).ofDays(3);
        System.out.println(LocalDate.of(2024, 1, 1).plus(p));
    }
}`,
    opcoes: ['`2024-01-04`', '`2026-01-04`', '`2026-01-01`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`ofDays` é estático: chamado pelo resultado de `ofYears`, ignora esse resultado e cria um período só de 3 dias.',
  },
  {
    id: 'pleno-t4-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalDate d = LocalDate.of(2024, 6, 1);
        System.out.println(d.plus(Period.ofDays(1)));
        System.out.println(d.plus(Duration.ofDays(1)));
    }
}`,
    opcoes: [
      'Imprime `2024-06-02` e lança `UnsupportedTemporalTypeException`',
      'Imprime `2024-06-02` duas vezes',
      'Não compila: `LocalDate.plus` não aceita `Duration`',
      'Imprime `2024-06-02` e `2024-06-01T24:00`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'UnsupportedTemporalTypeException', saida: '2024-06-02' },
    explicacao: 'Uma `Duration` é medida em segundos, unidade que o `LocalDate` não tem. Como `plus` recebe `TemporalAmount`, o erro só aparece na execução.',
  },
  {
    id: 'pleno-t4-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        LocalDate a = LocalDate.of(2024, 1, 20);
        LocalDate b = LocalDate.of(2024, 4, 10);
        System.out.println(Period.between(a, b) + " " + ChronoUnit.MONTHS.between(a, b) + " " + ChronoUnit.DAYS.between(a, b));
    }
}`,
    opcoes: ['`P2M21D 2 81`', '`P2M21D 3 81`', '`P2M21D 2 80`', '`P3M10D 2 81`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'De 20/01 a 20/03 são 2 meses, e de 20/03 a 10/04, 21 dias. `MONTHS.between` conta só meses completos. O total de dias: 11 de janeiro, 29 de fevereiro, 31 de março e 10 de abril.',
  },
  {
    id: 'pleno-t4-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Instant i = Instant.parse("2024-01-15T02:00:00Z");
        System.out.println(i.atZone(ZoneId.of("America/Sao_Paulo")).toLocalDate() + " " + i.atZone(ZoneOffset.UTC).toLocalDate());
    }
}`,
    opcoes: ['`2024-01-14 2024-01-15`', '`2024-01-15 2024-01-15`', '`2024-01-15 2024-01-14`', '`2024-01-14 2024-01-14`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Às 2h UTC, em São Paulo ainda são 23h do dia anterior. O mesmo instante cai em datas diferentes conforme o fuso.',
  },
  {
    id: 'pleno-t4-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        OffsetDateTime a = OffsetDateTime.of(LocalDateTime.of(2024, 1, 1, 12, 0), ZoneOffset.ofHours(-3));
        OffsetDateTime b = OffsetDateTime.of(LocalDateTime.of(2024, 1, 1, 15, 0), ZoneOffset.UTC);
        System.out.println(a.equals(b) + " " + a.isEqual(b) + " " + a.toInstant().equals(b.toInstant()));
    }
}`,
    opcoes: ['`false true true`', '`true true true`', '`false false true`', '`false true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Meio-dia em `-03:00` e 15h em UTC são o mesmo instante. `equals` compara também a hora local e o deslocamento; `isEqual` e os instantes, não.',
  },
  {
    id: 'pleno-t4-prova-q09',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `import java.time.*;
import java.time.temporal.ChronoUnit;

public class Teste {
    public static void main(String[] args) {
        Instant i = Instant.parse("2024-01-01T00:00:00Z");
        Instant a = i.plusSeconds(60);
        Instant b = i.plus(1, ChronoUnit.DAYS);
        Instant c = i.plusYears(1);
        System.out.println(a + " " + b + " " + c);
    }
}`,
    resposta: 9,
    explicacao: '`Instant` não tem métodos de calendário como `plusYears`. Somar dias por `ChronoUnit` compila e funciona, porque para um instante um dia são 86.400 segundos.',
  },
  {
    id: 'pleno-t4-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Em Nova York, em 10/03/2024, o relógio pulou das 2h para as 3h. Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime z = ZonedDateTime.of(LocalDateTime.of(2024, 3, 10, 2, 45), ZoneId.of("America/New_York"));
        System.out.println(z.toLocalTime() + " " + z.getOffset());
    }
}`,
    opcoes: ['`03:45 -04:00`', '`02:45 -05:00`', '`01:45 -05:00`', 'Lança `DateTimeException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O horário caiu na lacuna e foi empurrado uma hora para a frente, já no deslocamento de verão.',
  },
  {
    id: 'pleno-t4-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime sab = ZonedDateTime.of(LocalDateTime.of(2024, 3, 9, 9, 0), ZoneId.of("America/New_York"));
        System.out.println(sab.plusDays(1).getHour() + " " + sab.plus(Duration.ofHours(24)).getHour());
    }
}`,
    opcoes: ['`9 10`', '`9 9`', '`9 8`', '`10 9`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Na madrugada de domingo o relógio adiantou uma hora. `plusDays` mantém as 9h de parede; 24 horas reais depois, o relógio marca 10h.',
  },
  {
    id: 'pleno-t4-prova-q12',
    tipo: 'lacuna',
    dificuldade: 2,
    enunciado: 'Complete com o método que mostra o mesmo instante em outro fuso. O programa deve imprimir `22:00`.',
    codigo: `import java.time.*;

public class Toquio {
    public static void main(String[] args) {
        ZonedDateTime sp = ZonedDateTime.of(LocalDateTime.of(2024, 3, 15, 10, 0), ZoneId.of("America/Sao_Paulo"));
        System.out.println(sp.___(ZoneId.of("Asia/Tokyo")).toLocalTime());
    }
}`,
    respostas: ['withZoneSameInstant'],
    saida: '22:00',
    explicacao: '10h em São Paulo são 13h UTC, e Tóquio está nove horas à frente. `withZoneSameLocal` manteria as 10h, num outro instante.',
  },
  {
    id: 'pleno-t4-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2024, 2, 9).format(DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.US)));
    }
}`,
    opcoes: ['`February 9, 2024`', '`Feb 09, 2024`', '`02 9, 2024`', '`February 09, 2024`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Quatro `M` dão o nome completo do mês no idioma do `Locale`, e um `d` imprime o dia sem zero à esquerda.',
  },
  {
    id: 'pleno-t4-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        LocalTime t = LocalTime.of(8, 15);
        System.out.println(t.format(DateTimeFormatter.ofPattern("HH:mm")));
        System.out.println(t.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
    }
}`,
    opcoes: [
      'Imprime `08:15` e lança `UnsupportedTemporalTypeException`',
      'Imprime `08:15` e `01/01/1970 08:15`',
      'Não compila: o padrão tem campos de data',
      'Imprime `08:15` e lança `DateTimeParseException`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'UnsupportedTemporalTypeException', saida: '08:15' },
    explicacao: 'Um `LocalTime` não tem dia, mês nem ano. O formatador só descobre isso na execução, ao pedir esses campos.',
  },
  {
    id: 'pleno-t4-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
    opcoes: [
      '`Period.between` devolve a distância em anos, meses e dias',
      '`ChronoUnit.DAYS.between` devolve o total de dias como `long`',
      '`Duration.ofDays(1)` imprime `P1D`',
      'O `toString` de `Instant` usa o fuso da máquina',
      '`LocalDate` guarda o fuso em que foi criado',
    ],
    respostas: [0, 1],
    explicacao: '`Duration.ofDays(1)` imprime `PT24H`, o `toString` de `Instant` é sempre em UTC, e as classes `Local` não têm fuso.',
  },
  {
    id: 'pleno-t4-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.time.*;
import java.time.format.DateTimeFormatter;

public class Teste {
    public static void main(String[] args) {
        System.out.println(LocalDate.parse("30/02/2024", DateTimeFormatter.ofPattern("dd/MM/yyyy")));
    }
}`,
    opcoes: ['`2024-02-29`', '`2024-03-01`', 'Lança `DateTimeParseException`', '`2024-02-30`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O modo padrão, `SMART`, ajusta dias de 29 a 31 inexistentes para o último dia do mês. Para recusar, seria preciso `ResolverStyle.STRICT`.',
  },
  {
    id: 'pleno-t4-prova-q17',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        Duration d = Duration.between(LocalTime.of(23, 0), LocalTime.of(1, 30));
        System.out.println(d + " " + d.isNegative() + " " + d.abs().toMinutes());
    }
}`,
    resposta: 'PT-21H-30M true 1290',
    explicacao: 'Sem data, 1h30 vem antes de 23h no mesmo dia, e a duração é negativa. `abs` tira o sinal: 21 horas e meia são 1.290 minutos.',
  },
  {
    id: 'pleno-t4-prova-q18',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        LocalTime abre = LocalTime.of(10, 0);
        LocalTime fecha = abre.plusHours(8);
        LocalTime amanha = abre.plusDays(1);
        System.out.println(fecha + " " + amanha);
    }
}`,
    opcoes: [
      'Não compila: `LocalTime` não tem `plusDays`',
      'Compila e imprime `18:00 10:00`',
      'Compila e lança `UnsupportedTemporalTypeException`',
      'Compila e imprime `18:00 10:00+1`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: 'Cada classe só tem os métodos das suas unidades. Para dias, seria preciso um `LocalDateTime`.',
  },
  {
    id: 'pleno-t4-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Em Nova York, em 03/11/2024, o relógio voltou das 2h para a 1h. Qual é a saída?',
    codigo: `import java.time.*;

public class Teste {
    public static void main(String[] args) {
        ZonedDateTime z = ZonedDateTime.of(LocalDateTime.of(2024, 11, 3, 1, 0), ZoneId.of("America/New_York"));
        ZonedDateTime w = z.plusHours(1);
        System.out.println(w.toLocalTime() + " " + w.getOffset());
    }
}`,
    opcoes: ['`01:00 -05:00`', '`02:00 -04:00`', '`02:00 -05:00`', '`01:00 -04:00`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A 1h inicial é a primeira, em `-04:00`. Uma hora real depois, o relógio já voltou e marca 1h de novo, agora em `-05:00`.',
  },
  {
    id: 'pleno-t4-prova-q20',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual classe é a mais adequada para registrar o momento exato em que um pedido foi feito num sistema usado em vários países?',
    opcoes: ['`Instant`', '`LocalDateTime`', '`LocalDate`', '`LocalTime`'],
    resposta: 0,
    explicacao: 'Um `Instant` é um ponto absoluto na linha do tempo, igual em qualquer fuso. Um `LocalDateTime` sem fuso não diz a que momento corresponde.',
  },
];

export default prova;
