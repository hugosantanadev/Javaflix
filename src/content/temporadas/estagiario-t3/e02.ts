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
  ia: {
    uso:
      'Use a IA para converter cadeias de `if` em `switch`, e o contrário, e para gerar treinos de fall-through. Peça sempre que ela diga onde estão os `break` e o que acontece com cada valor, e confira rodando: um `break` a menos compila e muda a saída.',
    pedido:
      'Estou estudando o switch clássico (com dois-pontos) para a certificação Java (Java 21). Monte 5 switch curtos com fall-through, default no meio e case com vários rótulos.\n- Não mostre as saídas.\n- Na correção, diga em que case a execução entra e por quais case ela passa até parar.\n- Use só int, char e String como seletor.',
    erros: [
      'Esquece um `break` ao converter uma cadeia de `if` em `switch`.',
      'Propõe um `switch` sobre `long`, `double` ou `boolean`, que não compila sem pattern matching.',
      'Diz que o `default` precisa ser o último ou que o fall-through não passa por ele.',
    ],
    conferir: [
      'Rode o código com um valor que caia em cada `case` e um que não caia em nenhum.',
      'Use o aviso de fall-through do IntelliJ para achar `case` sem `break`.',
      'Confira os tipos aceitos no seletor na seção 14.11 da JLS.',
    ],
  },
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
  bugs: [
    {
      id: 'estagiario-t3-e02-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: String cannot be converted to int`.',
      codigo: `public class Pedido {
    public static void main(String[] args) {
        int status = 2;
        switch (status) {
            case 1:
                System.out.println("Recebido");
                break;
            case "2":
                System.out.println("Enviado");
                break;
        }
    }
}`,
      linha: 8,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Pedido {
    public static void main(String[] args) {
        int status = 2;
        switch (status) {
            case 1:
                System.out.println("Recebido");
                break;
            case 2:
                System.out.println("Enviado");
                break;
        }
    }
}`,
      saidaCorrigida: 'Enviado',
      dica: 'Todo rótulo precisa ser do mesmo tipo do seletor. Compare o tipo de `status` com o de cada `case`.',
      explicacao: 'O seletor é um `int`, e um rótulo `"2"` é uma `String`: o `switch` não converte um no outro. Aspas transformam o número em texto, e os rótulos precisam caber no tipo do seletor.',
    },
    {
      id: 'estagiario-t3-e02-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: constant expression required`.',
      codigo: `public class Elevador {
    public static void main(String[] args) {
        int andar = 0;
        int terreo = 0;
        switch (andar) {
            case terreo:
                System.out.println("Térreo");
                break;
            default:
                System.out.println("Andar " + andar);
        }
    }
}`,
      linha: 6,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Elevador {
    public static void main(String[] args) {
        int andar = 0;
        int terreo = 0;
        switch (andar) {
            case 0:
                System.out.println("Térreo");
                break;
            default:
                System.out.println("Andar " + andar);
        }
    }
}`,
      saidaCorrigida: 'Térreo',
      dica: 'O rótulo de um `case` precisa ser conhecido na compilação. Uma variável comum é?',
      explicacao: 'Os rótulos de `case` precisam ser constantes de compilação: literais ou variáveis `final` inicializadas com constante. Uma variável comum pode mudar, então o compilador não aceita. A correção usa o literal `0`; outra saída seria declarar `final int terreo = 0;` e manter o `case terreo:`.',
    },
    {
      id: 'estagiario-t3-e02-b03',
      dificuldade: 2,
      sintoma: 'Para o plano prata, imprime `Frete grátis` e `Cashback de 5%`, mas o cashback é só do plano ouro.',
      codigo: `public class Beneficios {
    public static void main(String[] args) {
        String plano = "prata";
        switch (plano) {
            case "prata":
                System.out.println("Frete grátis");
            case "ouro":
                System.out.println("Cashback de 5%");
                break;
        }
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: 'Frete grátis\nCashback de 5%' },
      correcao: `public class Beneficios {
    public static void main(String[] args) {
        String plano = "prata";
        switch (plano) {
            case "prata":
                System.out.println("Frete grátis"); break;
            case "ouro":
                System.out.println("Cashback de 5%");
                break;
        }
    }
}`,
      saidaCorrigida: 'Frete grátis',
      dica: 'O que acontece depois do último comando do `case "prata"`? Existe algo que faça a execução parar ali?',
      explicacao: 'Sem `break`, a execução desce para o `case "ouro"` sem testá-lo e entrega um benefício que não devia. Cada `case` que não deve continuar precisa terminar com `break`, ou com `return`.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes tipos **não** pode ser usado como seletor de um `switch`?',
      opcoes: ['`long`', '`char`', '`String`', '`Integer`'],
      resposta: 0,
      explicacao: 'O `switch` aceita `int` e os tipos menores (`byte`, `short`, `char`), os wrappers deles, `String` e `enum`. `long` fica de fora, assim como `boolean`, `float` e `double`.',
      dica: 'Lembre a tabela dos tipos aceitos no seletor: os inteiros pequenos, os wrappers deles, `String` e `enum`.',
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
      dica: 'A execução entra no `case 2`. Sem `break`, por onde ela continua?',
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
      dica: 'Nenhum `case` casa com 9. Onde a execução começa, e o que vem logo abaixo?',
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
      dica: 'Rótulos repetidos não compilam, e o valor de um rótulo precisa caber no tipo do seletor.',
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
      dica: 'O `switch` de `String` diferencia maiúsculas. Nenhum `case` casa com "Sair"?',
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
      dica: 'Para comparar o seletor com os rótulos, o `switch` precisa chamar métodos dele. E se ele for `null`?',
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
      dica: 'Qual comando faz a execução sair do `switch` logo depois de imprimir?',
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
      dica: 'A execução entra no `case 2` e, sem `break`, soma tudo daí para baixo, inclusive o `default`.',
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
      dica: 'Rótulos precisam ser constantes. Qual dos dois é uma variável comum?',
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
      dica: '`\'c\'` e `99` são o mesmo valor para um `char`. Dois rótulos iguais compilam?',
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
      dica: 'Para cada mês, procure o `case` que casa; os que não casam vão para o `default`.',
    },
    {
      id: 'estagiario-t3-e02-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sem pattern matching, quais tipos podem ser o seletor de um `switch`? Escolha três.',
      opcoes: ['`String`', '`char`', '`Integer`', '`long`', '`boolean`', '`double`'],
      respostas: [0, 1, 2],
      explicacao: '`String`, os inteiros até `int` (com os seus wrappers) e `enum`. `long`, `boolean`, `float` e `double` não são aceitos.',
      dica: 'Sem pattern matching, valem os inteiros pequenos, os wrappers deles, `String` e `enum`.',
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
      dica: 'Com valores próximos, a JVM pode montar uma tabela e pular direto para a posição certa.',
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
      dica: 'Qual `case` casa com `\'B\'`, e o que vem logo depois dele?',
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
      dica: 'O resto em Java tem o sinal do dividendo: quanto dá `-4 % 3`? E `return` encerra o método na hora.',
    },
  ],
};

export default episodio;
