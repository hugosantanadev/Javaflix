import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t3-e02',
  minutos: 11,
  aula,
  armadilhas: [
    'O seletor não pode ser `long`, `boolean`, `float` nem `double`.',
    'Os rótulos precisam ser constantes de compilação: uma variável comum não serve; uma `final` inicializada com constante, sim.',
    'Rótulos repetidos não compilam, inclusive `case \'b\'` e `case 98` no mesmo `switch`.',
    'O rótulo precisa caber no tipo do seletor: `case 200` com seletor `byte` não compila.',
    'Sem `break`, a execução cai nos `case` seguintes, sem testá-los.',
    'O `default` pode estar em qualquer posição, e o fall-through também passa por ele.',
    '`switch` com `String` compara por `equals` e lança `NullPointerException` se o seletor for nulo.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: The switch Statement',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html',
      tipo: 'documentacao',
      porque: 'O `switch` com fall-through, o exemplo dos dias do mês e o `switch` com `String`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.11: The switch Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11',
      tipo: 'documentacao',
      porque: 'As regras exatas: tipos do seletor, rótulos constantes, duplicados e o que acontece com `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'dev.java: Branching with Switch Statements',
      url: 'https://dev.java/learn/language/constructs/basics/switch-statement/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre o `switch` clássico e o fall-through.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JVMS 6.5: a instrução tableswitch',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-6.html#jvms-6.5.tableswitch',
      tipo: 'documentacao',
      porque: 'A tabela de saltos que torna o `switch` com valores próximos tão rápido quanto um acesso a array.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to the Java Switch Statement',
      url: 'https://www.baeldung.com/java-switch',
      tipo: 'artigo',
      porque: 'Fall-through, `String`, `enum` e as formas modernas, com exemplos lado a lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #10, Estruturas Condicionais (Parte 2)',
      url: 'https://www.youtube.com/watch?v=oNSrBld06qs',
      tipo: 'video',
      porque: 'Condições múltiplas e o `switch`, explicados em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os tipos aceitos e as regras de rótulos estão numa tabela do livro que vale decorar.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção sobre o `switch` statement',
    },
  ],
  desafio: {
    titulo: 'Dias do mês',
    enunciado:
      'Escreva `dias(int mes, int ano)` com um `switch` clássico que agrupe os meses de 30 e de 31 dias e trate fevereiro com a regra do ano bissexto: divisível por 4, exceto os divisíveis por 100 que não são divisíveis por 400. Imprima:\n\n```text\n2/2024: 29\n2/2025: 28\n2/1900: 28\n2/2000: 29\n4/2025: 30\n12/2025: 31\n```',
    dicas: [
      'Use `case 4, 6, 9, 11:` para os meses de 30 dias.',
      'Bissexto: `(ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0`.',
      'Com `return` dentro de cada `case`, nem precisa de `break`.',
    ],
    solucao: `public class DiasDoMes {
    static int dias(int mes, int ano) {
        switch (mes) {
            case 4, 6, 9, 11:
                return 30;
            case 2:
                boolean bissexto = (ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0;
                return bissexto ? 29 : 28;
            default:
                return 31;
        }
    }

    public static void main(String[] args) {
        int[][] casos = {{2, 2024}, {2, 2025}, {2, 1900}, {2, 2000}, {4, 2025}, {12, 2025}};
        for (int[] c : casos) {
            System.out.println(c[0] + "/" + c[1] + ": " + dias(c[0], c[1]));
        }
    }
}`,
    saida: '2/2024: 29\n2/2025: 28\n2/1900: 28\n2/2000: 29\n4/2025: 30\n12/2025: 31',
    comentarios:
      'O `return` encerra o método e, com ele, o `switch`: não há fall-through possível. A regra do ano bissexto é do calendário gregoriano de 1582: 1900 não foi bissexto, 2000 foi. Na prática, use `java.time.YearMonth.of(ano, mes).lengthOfMonth()`, que já sabe tudo isso, assunto da temporada de datas.',
  },
  exercicios: [
    {
      id: 'estagiario-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes tipos **não** pode ser usado como seletor de um `switch`?',
      opcoes: ['`long`', '`char`', '`String`', '`Integer`'],
      resposta: 0,
      explicacao: 'O `switch` aceita `int` e os tipos menores (`byte`, `short`, `char`), os wrappers deles, `String` e `enum`. `long` fica de fora, assim como `boolean`, `float` e `double`.',
    },
    {
      id: 'estagiario-t3-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int nivel = 2;
switch (nivel) {
    case 1:
        System.out.println("bronze");
    case 2:
        System.out.println("prata");
    case 3:
        System.out.println("ouro");
        break;
    default:
        System.out.println("nenhum");
}`,
      resposta: 'prata\nouro',
      explicacao: 'A execução entra no `case 2` e, sem `break`, cai no `case 3`, onde o `break` encerra. O `case 1` vem antes e não roda; o `default` vem depois do `break`.',
    },
    {
      id: 'estagiario-t3-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 9;
switch (x) {
    case 1:
        System.out.println("um");
    default:
        System.out.println("outro");
    case 2:
        System.out.println("dois");
        break;
    case 3:
        System.out.println("três");
}`,
      opcoes: ['`outro\ndois`', '`outro`', '`um\noutro\ndois`', '`outro\ndois\ntrês`', 'Não compila: `default` fora do lugar'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Nenhum `case` casa com 9, então a execução começa no `default`, que pode estar em qualquer posição. Sem `break`, cai no `case 2` e para no `break`.',
    },
    {
      id: 'estagiario-t3-e02-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`int x = 1; switch (x) { case 1: case 1: break; }`',
        '`byte b = 1; switch (b) { case 200: break; }`',
        '`char c = \'a\'; switch (c) { case \'a\': case 98: break; }`',
        '`String s = "a"; switch (s) { case "a": break; default: }`',
        '`final int k = 2; int x = 1; switch (x) { case k: break; }`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Rótulos repetidos e rótulos que não cabem no tipo do seletor são erros. `case 98` com seletor `char` é válido (98 é \'b\', diferente de \'a\'), um `default:` vazio no fim é permitido, e `k` é uma constante de compilação.',
    },
    {
      id: 'estagiario-t3-e02-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String cmd = "Sair";
switch (cmd) {
    case "sair":
        System.out.println("A");
        break;
    default:
        System.out.println("B");
    case "SAIR":
        System.out.println("C");
}`,
      opcoes: ['`B\nC`', '`A`', '`C`', '`B`', '`A\nB\nC`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A comparação é por `equals`, que diferencia maiúsculas: "Sair" não é "sair" nem "SAIR". A execução começa no `default` e, sem `break`, cai no `case "SAIR"`.',
    },
    {
      id: 'estagiario-t3-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String s = null;
switch (s) {
    case "a":
        System.out.println("a");
        break;
    default:
        System.out.println("outro");
}`,
      opcoes: ['Lança `NullPointerException`', 'Imprime `outro`', 'Imprime nada', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'O `switch` de `String` começa calculando o `hashCode()` do seletor, e chamar um método em `null` lança exceção. O `default` não cobre o caso nulo.',
    },
    {
      id: 'estagiario-t3-e02-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o programa imprima só `dois`.',
      codigo: `public class Opcao {
    public static void main(String[] args) {
        int opcao = 2;
        switch (opcao) {
            case 1:
                System.out.println("um");
                break;
            case 2:
                System.out.println("dois");
                ___;
            case 3:
                System.out.println("três");
        }
    }
}`,
      respostas: ['break'],
      saida: 'dois',
      explicacao: 'Sem o `break`, a execução cairia no `case 3` e imprimiria "três" também. O `break` sai do `switch`.',
    },
    {
      id: 'estagiario-t3-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int n = 2, total = 0;
switch (n) {
    case 1: total += 1;
    case 2: total += 2;
    case 3: total += 3;
    default: total += 10;
}
System.out.println(total);`,
      opcoes: ['`15`', '`2`', '`5`', '`12`', '`16`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A execução entra no `case 2` e, sem nenhum `break`, executa tudo dali para baixo: 2 + 3 + 10 = 15.',
    },
    {
      id: 'estagiario-t3-e02-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Menu {
    public static void main(String[] args) {
        int opcao = 2;
        final int SAIR = 0;
        int ajuda = 9;
        switch (opcao) {
            case SAIR:
                System.out.println("tchau");
                break;
            case ajuda:
                System.out.println("ajuda");
                break;
        }
    }
}`,
      resposta: 10,
      explicacao: '`ajuda` é uma variável comum, e o rótulo de um `case` precisa ser uma constante de compilação. `SAIR` funciona porque é `final` e foi inicializada com uma constante.',
    },
    {
      id: 'estagiario-t3-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar e executar?',
      codigo: `public class Letras {
    public static void main(String[] args) {
        char c = 'b';
        switch (c + 1) {
            case 'b': System.out.println("b"); break;
            case 'c': System.out.println("c"); break;
            case 99: System.out.println("99"); break;
        }
    }
}`,
      opcoes: ['Não compila: rótulo repetido', 'Imprime `c`', 'Imprime `99`', 'Imprime `c` e `99`', 'Não compila: `c + 1` não é um seletor válido'],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: '\'c\' vale 99, então `case \'c\'` e `case 99` são o mesmo rótulo, e rótulos repetidos não compilam. O seletor `c + 1` é um `int`, que é válido.',
    },
    {
      id: 'estagiario-t3-e02-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (String m : new String[] {"jan", "abr", "fev"}) {
    switch (m) {
        case "abr", "jun", "set", "nov":
            System.out.println(m + " 30");
            break;
        case "fev":
            System.out.println(m + " 28");
            break;
        default:
            System.out.println(m + " 31");
    }
}`,
      resposta: 'jan 31\nabr 30\nfev 28',
      explicacao: 'Desde o Java 14, um `case` pode ter vários rótulos separados por vírgula. "jan" não casa com nenhum e cai no `default`.',
    },
    {
      id: 'estagiario-t3-e02-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sem pattern matching, quais tipos podem ser o seletor de um `switch`? Escolha três.',
      opcoes: ['`String`', '`char`', '`Integer`', '`long`', '`boolean`', '`double`'],
      respostas: [0, 1, 2],
      explicacao: '`String`, os inteiros até `int` (com os seus wrappers) e `enum`. `long`, `boolean`, `float` e `double` não são aceitos.',
    },
    {
      id: 'estagiario-t3-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como a JVM costuma executar um `switch` cujos `case` são 1, 2, 3, 4 e 5?',
      opcoes: [
        'Com uma tabela de saltos indexada pelo valor (`tableswitch`), sem testar os `case` um a um',
        'Testando cada `case` em ordem, como uma cadeia de `if`',
        'Convertendo o `switch` num `HashMap` em tempo de execução',
        'Ordenando os `case` a cada execução',
      ],
      resposta: 0,
      explicacao: 'Com valores próximos, o `javac` gera `tableswitch`: o valor vira um índice numa tabela de endereços. Com valores espalhados, gera `lookupswitch`, com busca binária. Nos dois casos, não há teste sequencial.',
    },
    {
      id: 'estagiario-t3-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `char nota = 'B';
switch (nota) {
    case 'A':
        System.out.println("ótimo");
        break;
    case 'B':
        System.out.println("bom");
        break;
    default:
        System.out.println("estude mais");
}`,
      opcoes: ['`bom`', '`bom\nestude mais`', '`ótimo`', '`estude mais`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `case \'B\'` casa e o `break` impede a queda no `default`. `char` é um seletor válido.',
    },
    {
      id: 'estagiario-t3-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Restos {
    static String tipo(int n) {
        switch (n % 3) {
            case 0: return "múltiplo";
            case 1:
            case -1: return "resto um";
            default: return "resto dois";
        }
    }

    public static void main(String[] args) {
        System.out.println(tipo(9) + ", " + tipo(-4) + ", " + tipo(5));
    }
}`,
      opcoes: [
        '`múltiplo, resto um, resto dois`',
        '`múltiplo, resto dois, resto dois`',
        '`múltiplo, resto um, resto um`',
        'Não compila: `case -1` com `%`',
        '`múltiplo, resto dois, resto um`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '9 % 3 é 0. Em Java, −4 % 3 é −1 (o resto tem o sinal do dividendo), que cai no `case -1` e é agrupado com o `case 1`. 5 % 3 é 2: `default`. O `return` dispensa o `break`.',
    },
  ],
};

export default episodio;
