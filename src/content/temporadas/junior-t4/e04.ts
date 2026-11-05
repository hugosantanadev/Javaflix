import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t4-e04',
  minutos: 13,
  aula,
  armadilhas: [
    '`ordinal()` começa em 0, na ordem de declaração.',
    '`valueOf` diferencia maiúsculas e lança `IllegalArgumentException` com um nome inexistente.',
    'Enums não podem ser instanciados com `new`: o construtor é sempre `private`.',
    'No `case`, a constante aparece sem o nome do tipo; o nome qualificado só compila a partir do Java 21.',
    'Um `switch` expressão sobre um enum precisa cobrir todas as constantes ou ter `default`.',
    '`compareTo` compara pela ordem de declaração, não pelo nome.',
    '`values()` devolve uma cópia nova do array a cada chamada.',
    'Enums estendem `java.lang.Enum` e não podem estender outra classe, mas podem implementar interfaces.',
  ],
  ia: {
    uso:
      'A IA ajuda a trocar constantes `int` por um enum e a completar `switch` com todas as constantes. Confira com atenção o que ela faz com `ordinal()` e `valueOf`, dois pontos em que costuma errar.',
    pedido:
      'Revise o uso de enums neste código Java 21.\n<cole o código aqui>\n- Aponte constantes int ou String que deveriam ser um enum.\n- Aponte usos de ordinal() como dado persistido e proponha name() ou um código próprio.\n- Mostre onde valueOf recebe texto de fora sem normalização nem tratamento de IllegalArgumentException.',
    erros: [
      'Salva `ordinal()` no banco e lê de volta com `values()[n]`.',
      'Chama `valueOf` com o texto do usuário sem normalizar maiúsculas.',
      'Compara enums com `equals` numa variável que pode ser `null`.',
    ],
    conferir: [
      'Teste `valueOf` com minúsculas e com um nome inexistente.',
      'Acrescente uma constante no meio do enum e veja se algo depende da posição.',
      'Compile o `switch` expressão sem `default`: o compilador aponta constantes não cobertas.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Enums',
      url: 'https://dev.java/learn/language/oop/classes-objects/enums/',
      tipo: 'documentacao',
      porque: 'Declarar, comparar e percorrer enums, com as precauções do tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Enum Types',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html',
      tipo: 'documentacao',
      porque: 'O exemplo clássico dos planetas e o uso de `values()`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.9: Enum Classes',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.9',
      tipo: 'documentacao',
      porque: 'O que o compilador gera e as restrições sobre construtores e herança.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.lang.Enum',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Enum.html',
      tipo: 'documentacao',
      porque: 'Os métodos herdados por todo enum, como `name`, `ordinal` e `compareTo`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.EnumMap',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/EnumMap.html',
      tipo: 'documentacao',
      porque: 'O mapa especializado para chaves enum, em ordem de declaração.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 441: Pattern Matching for switch',
      url: 'https://openjdk.org/jeps/441',
      tipo: 'documentacao',
      porque: 'A mudança do Java 21 que permitiu constantes de enum qualificadas no `case`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to Java Enums',
      url: 'https://www.baeldung.com/a-guide-to-java-enums',
      tipo: 'artigo',
      porque: 'Enums com `switch`, `EnumSet`, `EnumMap` e padrões de projeto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 53, Enumeradores (Enum)',
      url: 'https://www.youtube.com/watch?v=EdEKx24xHGc',
      tipo: 'video',
      porque: 'Enums do básico, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Codando Simples: Java, Aula 29, Enums',
      url: 'https://www.youtube.com/watch?v=veIr8sogdhk',
      tipo: 'video',
      porque: 'Por que enums são melhores que constantes `int`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Java Enums Explained in 6 Minutes',
      url: 'https://www.youtube.com/watch?v=wq9SJb8VeyM',
      tipo: 'video',
      porque: 'Os métodos de enum e o uso com `switch`, rapidamente.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que trocar constantes `int` por enums e por que não usar o `ordinal()` como dado.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Enums and Annotations": Item 34, "Use enums instead of int constants", e Item 35, "Use instance fields instead of ordinals"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Enums simples e no `switch`, com a regra do nome não qualificado.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Working with Enums", partes "Creating Simple Enums" e "Using Enums in switch Statements"',
    },
  ],
  desafio: {
    titulo: 'Dias úteis',
    enunciado:
      'Crie o enum `DiaSemana`, de `SEGUNDA` a `DOMINGO`, e dois métodos: `util(DiaSemana d)`, com um `switch` expressão, e `depois(DiaSemana d, int dias)`, que dá a volta na semana usando `ordinal()` e `values()`. A partir de `DiaSemana.valueOf("SEXTA")`, a saída deve ser:\n\n```text\nSEXTA é útil? true\nDaqui a 3 dias: SEGUNDA\nDias úteis nos próximos 10 dias: 6\n```\n\nOs "próximos 10 dias" incluem o próprio dia.',
    dicas: [
      '`case SABADO, DOMINGO -> false;` agrupa as duas constantes; o resto é `default -> true`.',
      '`values()[(d.ordinal() + dias) % values().length]` dá a volta na semana.',
      'Conte com um laço de `i = 0` a `i < 10`, testando `util(depois(hoje, i))`.',
    ],
    solucao: `enum DiaSemana { SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO, DOMINGO }

public class Agenda {
    static boolean util(DiaSemana d) {
        return switch (d) {
            case SABADO, DOMINGO -> false;
            default -> true;
        };
    }

    static DiaSemana depois(DiaSemana d, int dias) {
        DiaSemana[] todos = DiaSemana.values();
        return todos[(d.ordinal() + dias) % todos.length];
    }

    public static void main(String[] args) {
        DiaSemana hoje = DiaSemana.valueOf("SEXTA");
        System.out.println(hoje + " é útil? " + util(hoje));
        System.out.println("Daqui a 3 dias: " + depois(hoje, 3));
        int uteis = 0;
        for (int i = 0; i < 10; i++) {
            if (util(depois(hoje, i))) uteis++;
        }
        System.out.println("Dias úteis nos próximos 10 dias: " + uteis);
    }
}`,
    saida: 'SEXTA é útil? true\nDaqui a 3 dias: SEGUNDA\nDias úteis nos próximos 10 dias: 6',
    comentarios:
      'O `%` faz a aritmética circular, como num relógio, que você viu no episódio de aritmética modular. O `ordinal()` aqui é usado só em memória, para calcular posições, e nunca guardado: se a semana fosse redefinida, o código continuaria correto. A biblioteca padrão tem o seu próprio `java.time.DayOfWeek`, com `plus(dias)` pronto.',
  },
  bugs: [
    {
      id: 'junior-t4-e04-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: enum classes may not be instantiated`.',
      codigo: `enum Plano { BASICO, PREMIUM }

public class Assinatura {
    public static void main(String[] args) {
        Plano escolhido = new Plano();
        System.out.println(escolhido);
    }
}`,
      linha: 5,
      efeito: { tipo: 'naoCompila' },
      correcao: `enum Plano { BASICO, PREMIUM }

public class Assinatura {
    public static void main(String[] args) {
        Plano escolhido = Plano.PREMIUM;
        System.out.println(escolhido);
    }
}`,
      saidaCorrigida: 'PREMIUM',
      dica: 'Quais valores um `Plano` pode ter? Algum deles nasce com `new`?',
      explicacao: 'Os únicos objetos de um enum são as constantes declaradas, criadas na carga da classe. O construtor é sempre privado, e `new` não compila. Use a constante: `Plano.PREMIUM`.',
    },
    {
      id: 'junior-t4-e04-b02',
      dificuldade: 2,
      sintoma: 'Pedidos em `SEPARANDO` aparecem com dois textos de status: `separando no galpão saiu para entrega`.',
      codigo: `enum Status { NOVO, SEPARANDO, ENVIADO }

public class Rastreio {
    public static void main(String[] args) {
        Status s = Status.SEPARANDO;
        String texto = "";
        switch (s) {
            case NOVO:
                texto += "aguardando ";
                break;
            case SEPARANDO:
                texto += "separando no galpão ";
            case ENVIADO:
                texto += "saiu para entrega";
        }
        System.out.println(texto.trim());
    }
}`,
      linha: 12,
      efeito: { tipo: 'saida', saida: 'separando no galpão saiu para entrega' },
      correcao: `enum Status { NOVO, SEPARANDO, ENVIADO }

public class Rastreio {
    public static void main(String[] args) {
        Status s = Status.SEPARANDO;
        String texto = "";
        switch (s) {
            case NOVO:
                texto += "aguardando ";
                break;
            case SEPARANDO:
                texto += "separando no galpão "; break;
            case ENVIADO:
                texto += "saiu para entrega";
        }
        System.out.println(texto.trim());
    }
}`,
      saidaCorrigida: 'separando no galpão',
      dica: 'Depois que um `case` com dois pontos executa, o que impede o próximo de executar também?',
      explicacao: 'No `switch` com dois pontos, a execução continua no `case` seguinte até um `break` (o *fall-through*). O `switch` com setas, `case SEPARANDO -> ...`, não tem esse comportamento e evita o bug por construção.',
    },
    {
      id: 'junior-t4-e04-b03',
      dificuldade: 3,
      sintoma: 'O filtro de pedidos lança `IllegalArgumentException: No enum constant Status.enviado` quando o usuário digita o status em minúsculas.',
      codigo: `enum Status { NOVO, SEPARANDO, ENVIADO }

public class Filtro {
    static Status ler(String entrada) {
        return Status.valueOf(entrada.trim());
    }

    public static void main(String[] args) {
        String digitado = " enviado ";
        System.out.println(ler(digitado));
    }
}`,
      linha: 5,
      efeito: { tipo: 'excecao', nome: 'IllegalArgumentException' },
      correcao: `enum Status { NOVO, SEPARANDO, ENVIADO }

public class Filtro {
    static Status ler(String entrada) {
        return Status.valueOf(entrada.trim().toUpperCase());
    }

    public static void main(String[] args) {
        String digitado = " enviado ";
        System.out.println(ler(digitado));
    }
}`,
      saidaCorrigida: 'ENVIADO',
      dica: 'O `valueOf` compara o texto com o nome da constante de que jeito: ignorando maiúsculas ou não?',
      explicacao: '`valueOf` procura o nome exato, com as mesmas maiúsculas da declaração, e lança `IllegalArgumentException` se não achar. Texto vindo de fora precisa ser normalizado antes; e, para entradas realmente livres, trate a exceção com uma mensagem própria.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t4-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o `ordinal()` da primeira constante declarada num enum?',
      opcoes: ['0', '1', '-1', 'Depende do nome da constante'],
      resposta: 0,
      explicacao: 'Os ordinais seguem a ordem de declaração e começam em 0, como os índices de um array.',
      dica: 'Como os índices de array.',
    },
    {
      id: 'junior-t4-e04-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `enum Tamanho { P, M, G, GG }

Tamanho t = Tamanho.G;
System.out.println(t.ordinal() + " " + t.name().length() + " " + Tamanho.values()[1]);`,
      resposta: '2 1 M',
      explicacao: '`G` é a terceira constante, de ordinal 2, e o nome dela tem uma letra. A posição 1 do array de `values()` é `M`.',
      dica: 'G é a terceira constante; o nome tem uma letra; `values()[1]` é a segunda.',
    },
    {
      id: 'junior-t4-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `enum Moeda { REAL, DOLAR }

Moeda m = Moeda.valueOf("Real");
System.out.println(m);`,
      opcoes: ['Lança `IllegalArgumentException`', 'Imprime `REAL`', 'Imprime `null`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException' },
      explicacao: '`valueOf` procura o nome exato, diferenciando maiúsculas. "Real" não é "REAL". O compilador não confere o texto, então o erro só aparece na execução.',
      dica: '`valueOf` compara o nome exato, com maiúsculas.',
    },
    {
      id: 'junior-t4-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 17, cobrado pela prova 1Z0-829, qual é o resultado?',
      codigo: `enum Fase { INICIO, MEIO, FIM }

Fase f = Fase.MEIO;
switch (f) {
    case Fase.INICIO:
        System.out.println("começo");
        break;
    case Fase.MEIO:
        System.out.println("meio");
        break;
    default:
        System.out.println("fim");
}`,
      opcoes: ['Não compila', 'Imprime `meio`', 'Imprime `começo`', 'Imprime `fim`'],
      resposta: 0,
      provas: ['829'],
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Até o Java 17, o `case` de um enum precisa do nome da constante sem o tipo: `case INICIO:`. O nome qualificado passou a ser aceito no Java 21.',
      dica: 'No Java 17, o `case` de enum aceita só o nome simples da constante.',
    },
    {
      id: 'junior-t4-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 21 ou 25, cobrados pelas provas 1Z0-830 e 1Z0-831, qual é o resultado?',
      codigo: `enum Fase { INICIO, MEIO, FIM }

Fase f = Fase.MEIO;
switch (f) {
    case Fase.INICIO:
        System.out.println("começo");
        break;
    case Fase.MEIO:
        System.out.println("meio");
        break;
    default:
        System.out.println("fim");
}`,
      opcoes: ['`meio`', 'Não compila', '`começo`', '`fim`'],
      resposta: 0,
      provas: ['830', '831'],
      verificar: { tipo: 'saida' },
      explicacao: 'Desde o Java 21 (JEP 441), o `case` aceita a constante qualificada pelo tipo do enum. O comportamento é o mesmo da forma curta.',
      dica: 'O Java 21 passou a aceitar o nome qualificado no `case`.',
    },
    {
      id: 'junior-t4-e04-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que devolve todas as constantes. O programa deve imprimir `VVA`.',
      codigo: `enum Cor { VERMELHO, VERDE, AZUL }

public class Paleta {
    public static void main(String[] args) {
        String r = "";
        for (Cor c : Cor.___()) {
            r += c.name().charAt(0);
        }
        System.out.println(r);
    }
}`,
      respostas: ['values'],
      saida: 'VVA',
      explicacao: '`values()` devolve um array com as constantes na ordem de declaração, pronto para o for-each.',
      dica: 'Que método estático devolve o array de constantes?',
    },
    {
      id: 'junior-t4-e04-q07',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `enum Plano { BASICO, PREMIUM }

public class Assinatura {
    public static void main(String[] args) {
        Plano a = Plano.BASICO;
        Plano b = Plano.valueOf("PREMIUM");
        Plano c = new Plano();
        System.out.println(a + " " + b + " " + c);
    }
}`,
      resposta: 7,
      explicacao: 'As constantes são os únicos objetos que um enum pode ter. Os outros dois jeitos de obter uma constante são válidos.',
      dica: 'Constantes de enum nascem com `new`?',
    },
    {
      id: 'junior-t4-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `enum Nivel { FACIL, MEDIO, DIFICIL }

Nivel n = Nivel.DIFICIL;
int pontos = switch (n) {
    case FACIL -> 10;
    case MEDIO -> 20;
    case DIFICIL -> 50;
};
System.out.println(pontos + n.ordinal());`,
      opcoes: ['`52`', '`502`', '`50`', 'Não compila: falta `default`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `switch` expressão cobre todas as constantes, então não precisa de `default`. 50 + 2 é soma, porque os dois são números.',
      dica: '50 somado ao `ordinal()` de DIFICIL, que é 2.',
    },
    {
      id: 'junior-t4-e04-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre enums são verdadeiras? Escolha três.',
      opcoes: [
        'O `toString()` padrão devolve o nome da constante',
        'Comparar constantes com `==` é seguro',
        'Um enum pode implementar interfaces',
        'Um enum pode estender outra classe',
        'O `ordinal()` da primeira constante é 1',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Cada constante existe uma vez só, por isso o `==` funciona. Enums já estendem `java.lang.Enum`, então não estendem mais nada, mas implementam interfaces normalmente.',
      dica: 'Enums já estendem `java.lang.Enum`.',
    },
    {
      id: 'junior-t4-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `enum Prioridade { BAIXA, MEDIA, ALTA, URGENTE }

Prioridade a = Prioridade.MEDIA;
Prioridade b = Prioridade.URGENTE;
System.out.println(a.compareTo(b) + " " + b.compareTo(a) + " " + (a.compareTo(Prioridade.MEDIA) == 0));`,
      opcoes: ['`-2 2 true`', '`-1 1 true`', '`1 -1 true`', '`-2 2 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `compareTo` de enum devolve a diferença entre os ordinais: 1 - 3 = -2, e o contrário, 2. Uma constante comparada a si mesma dá 0.',
      dica: '`compareTo` devolve a diferença entre os `ordinal()`.',
    },
    {
      id: 'junior-t4-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `enum Turno { MANHA, TARDE, NOITE }

Turno t = Turno.TARDE;
String saudacao = switch (t) {
    case MANHA -> "bom dia";
    case TARDE -> "boa tarde";
};
System.out.println(saudacao);`,
      opcoes: [
        'Não compila: o `switch` não cobre `NOITE`',
        'Compila e imprime `boa tarde`',
        'Compila, mas lança exceção com `NOITE`',
        'Compila e imprime `null` com `NOITE`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Um `switch` expressão precisa produzir um valor para toda entrada possível. Sem `NOITE` e sem `default`, o compilador recusa.',
      dica: 'Um `switch` expressão precisa produzir valor para toda constante.',
    },
    {
      id: 'junior-t4-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `enum Cor { VERMELHO, VERDE, AZUL }

Cor[] v = Cor.values();
v[0] = Cor.AZUL;
System.out.println(v[0] + " " + Cor.values()[0] + " " + Cor.values().length);`,
      opcoes: ['`AZUL VERMELHO 3`', '`AZUL AZUL 3`', '`VERMELHO VERMELHO 3`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`values()` devolve uma cópia nova a cada chamada. Alterar a cópia não muda a lista de constantes do enum.',
      dica: '`values()` devolve uma cópia nova a cada chamada.',
    },
    {
      id: 'junior-t4-e04-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Dado `enum Naipe { COPAS, PAUS }`, o que acontece em `Naipe.valueOf("copas")`?',
      opcoes: [
        'Lança `IllegalArgumentException`',
        'Devolve `COPAS`',
        'Devolve `null`',
        'Não compila',
      ],
      resposta: 0,
      explicacao: 'A busca é pelo nome exato. Para aceitar minúsculas, converta antes: `Naipe.valueOf(texto.toUpperCase())`.',
      dica: 'Maiúsculas importam no `valueOf`.',
    },
    {
      id: 'junior-t4-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `enum Mes { JAN, FEV, MAR }

Mes m = Mes.JAN;
int dias = 0;
switch (m) {
    case JAN:
        dias += 31;
    case FEV:
        dias += 28;
        break;
    case MAR:
        dias += 31;
}
System.out.println(dias);`,
      opcoes: ['`59`', '`31`', '`90`', '`28`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `switch` clássico com dois-pontos tem queda (*fall-through*): sem `break` em `JAN`, a execução continua em `FEV` até o `break`.',
      dica: 'Sem `break` depois de JAN, a execução cai em FEV.',
    },
    {
      id: 'junior-t4-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como o `javac` representa um enum no bytecode?',
      opcoes: [
        'Como uma classe `final` que estende `java.lang.Enum`, com um campo `static final` por constante e um array com todas',
        'Como uma interface com constantes `int`',
        'Como um tipo primitivo especial da JVM',
        'Como uma classe comum, sem relação com `java.lang.Enum`',
      ],
      resposta: 0,
      explicacao: 'O bloco `static` gerado cria um objeto por constante, passando o nome e o ordinal ao construtor de `Enum`. Por isso enums não podem estender outra classe.',
      dica: 'Enum é açúcar para uma classe que estende `java.lang.Enum`.',
    },
  ],
};

export default episodio;
