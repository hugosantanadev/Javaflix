import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t3-e03',
  minutos: 12,
  aula,
  armadilhas: [
    'Na forma `->` não há fall-through nem `break`.',
    'Não se mistura `case X:` com `case Y ->` no mesmo `switch`.',
    'Expressão `switch` termina com `;` depois da `}`.',
    'Num bloco de expressão `switch`, o valor sai com `yield`; `return` não é permitido ali dentro.',
    'Expressão `switch` sobre `int` ou `String` sem `default` não compila: precisa ser exaustiva.',
    'Com `enum`, cobrir todas as constantes dispensa o `default`.',
    'Ramos de tipos numéricos diferentes são promovidos: `case 1 -> 1; default -> 2.5;` resulta em `double`.',
    'Com `:` dentro de uma expressão `switch`, o fall-through volta.',
  ],
  ia: {
    uso:
      'A IA converte bem um `switch` clássico numa expressão com setas e explica a exaustividade. Use para modernizar código antigo, mas confira se o resultado ficou idêntico: uma constante de `enum` esquecida, ou um `default` acrescentado sem necessidade, muda o comportamento.',
    pedido:
      'Converta o switch abaixo para uma expressão switch com setas, em Java 21.\n<cole o switch aqui>\n- Mantenha exatamente o mesmo comportamento, inclusive nos valores que hoje caem no default.\n- Se o seletor for um enum, liste todas as constantes e não acrescente default.\n- Antes do código, liste os casos de teste que provam que nada mudou.',
    erros: [
      'Usa `return` ou `break valor;` dentro do bloco de uma expressão `switch`, em vez de `yield`.',
      'Esquece o `;` depois da `}` de uma expressão `switch` usada numa atribuição.',
      'Acrescenta um `default` num `switch` sobre `enum` "por segurança", desligando o aviso de constante nova.',
    ],
    conferir: [
      'Compile: a exaustividade e o `yield` são conferidos pelo compilador.',
      'Teste um valor de cada `case` e um que caia no `default`.',
      'Compare com a conversão automática do IntelliJ, pelo Alt + Enter na palavra `switch`.',
    ],
  },
  recursos: [
    {
      titulo: 'JEP 361: Switch Expressions',
      url: 'https://openjdk.org/jeps/361',
      tipo: 'documentacao',
      porque: 'A proposta que criou a forma arrow e o `yield`, com a motivação e todos os exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Language Updates: Switch Expressions and Statements',
      url: 'https://docs.oracle.com/en/java/javase/21/language/switch-expressions-and-statements.html',
      tipo: 'documentacao',
      porque: 'O guia oficial da Oracle sobre as formas do `switch`, com a recomendação de preferir `->`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.28: switch Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.28',
      tipo: 'documentacao',
      porque: 'A regra de exaustividade e o cálculo do tipo do resultado.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 441: Pattern Matching for switch',
      url: 'https://openjdk.org/jeps/441',
      tipo: 'documentacao',
      porque: 'Padrões de tipo, `when`, `case null` e dominância, finalizados no Java 21.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Branching with Switch Expressions',
      url: 'https://dev.java/learn/language/constructs/basics/switch-expression/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre a forma arrow, o `yield` e a exaustividade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the yield Keyword in Java',
      url: 'https://www.baeldung.com/java-yield-switch',
      tipo: 'artigo',
      porque: 'O `yield` nas duas formas de expressão `switch`, com o código antigo ao lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP Café #14: Pattern Matching com Records, instanceof e Switch',
      url: 'https://www.youtube.com/watch?v=aKaw9W789wU',
      tipo: 'video',
      porque: 'José Paumard, da equipe Java da Oracle, mostra a evolução do `switch` até os padrões.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A seção de expressões `switch` lista as regras de exaustividade e de `yield` que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção sobre `switch` expressions',
    },
  ],
  desafio: {
    titulo: 'Tarifa de estacionamento',
    enunciado:
      'Escreva `tarifa(String veiculo, int horas)` usando uma expressão `switch` sobre o tipo de veículo: moto paga 3 por hora; carro paga 5 por hora; caminhão paga 10 por hora, com mínimo de 30; qualquer outro tipo lança `IllegalArgumentException`. Imprima:\n\n```text\nmoto 2h: 6\ncarro 3h: 15\ncaminhao 1h: 30\ncaminhao 5h: 50\ninválido: bicicleta\n```',
    dicas: [
      'Use `case "caminhao" -> { ... yield ...; }` para o mínimo de 30: `Math.max(30, horas * 10)`.',
      'No `default`, use `throw new IllegalArgumentException(veiculo)`: um `throw` também é um lado direito válido.',
      'No `main`, capture a exceção e imprima `"inválido: " + e.getMessage()`.',
    ],
    solucao: `public class Estacionamento {
    static int tarifa(String veiculo, int horas) {
        return switch (veiculo) {
            case "moto" -> horas * 3;
            case "carro" -> horas * 5;
            case "caminhao" -> {
                int valor = horas * 10;
                yield Math.max(30, valor);
            }
            default -> throw new IllegalArgumentException(veiculo);
        };
    }

    public static void main(String[] args) {
        System.out.println("moto 2h: " + tarifa("moto", 2));
        System.out.println("carro 3h: " + tarifa("carro", 3));
        System.out.println("caminhao 1h: " + tarifa("caminhao", 1));
        System.out.println("caminhao 5h: " + tarifa("caminhao", 5));
        try {
            tarifa("bicicleta", 1);
        } catch (IllegalArgumentException e) {
            System.out.println("inválido: " + e.getMessage());
        }
    }
}`,
    saida: 'moto 2h: 6\ncarro 3h: 15\ncaminhao 1h: 30\ncaminhao 5h: 50\ninválido: bicicleta',
    comentarios:
      'O `default -> throw` satisfaz a exaustividade sem inventar um valor falso: um tipo desconhecido é um erro, e o método deixa isso claro. Compare com a versão clássica: uma variável declarada antes, um `break` em cada `case` e o risco de esquecer um deles. A expressão `switch` no `return` deixa o método com uma única saída.',
  },
  bugs: [
    {
      id: 'estagiario-t3-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: \';\' expected`.',
      codigo: `public class Plano {
    public static void main(String[] args) {
        int codigo = 2;
        String tipo = switch (codigo) {
            case 1 -> "comum";
            default -> "especial";
        }
        System.out.println(tipo);
    }
}`,
      linha: 7,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Plano {
    public static void main(String[] args) {
        int codigo = 2;
        String tipo = switch (codigo) {
            case 1 -> "comum";
            default -> "especial";
        };
        System.out.println(tipo);
    }
}`,
      saidaCorrigida: 'especial',
      dica: 'O `switch` aqui é o lado direito de uma atribuição. Como termina toda atribuição?',
      explicacao: 'Quando o `switch` é uma expressão, ele faz parte de um comando maior, a atribuição `String tipo = ...`, e todo comando termina com `;`. A `}` fecha o `switch`, e o `;` depois dela fecha a atribuição.',
    },
    {
      id: 'estagiario-t3-e03-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: attempt to return out of a switch expression`.',
      codigo: `public class Nota {
    public static void main(String[] args) {
        int estrelas = 4;
        String texto = switch (estrelas) {
            case 1, 2 -> "ruim";
            default -> {
                String base = "bom";
                return base + "!";
            }
        };
        System.out.println(texto);
    }
}`,
      linha: 8,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Nota {
    public static void main(String[] args) {
        int estrelas = 4;
        String texto = switch (estrelas) {
            case 1, 2 -> "ruim";
            default -> {
                String base = "bom";
                yield base + "!";
            }
        };
        System.out.println(texto);
    }
}`,
      saidaCorrigida: 'bom!',
      dica: 'Dentro do bloco de um `case`, qual palavra entrega o valor para a expressão `switch`?',
      explicacao: '`return` sairia do método inteiro, e isso não é permitido no meio de uma expressão. O valor de um bloco numa expressão `switch` sai com `yield`, que entrega o resultado e encerra só o `switch`.',
    },
    {
      id: 'estagiario-t3-e03-b03',
      dificuldade: 2,
      sintoma: 'Para novembro, o mês 11, imprime `31 dias`, mas novembro tem 30.',
      codigo: `public class Calendario {
    public static void main(String[] args) {
        int mes = 11;
        int dias = switch (mes) {
            case 2 -> 28;
            case 4, 6, 9, 10 -> 30;
            default -> 31;
        };
        System.out.println(dias + " dias");
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: '31 dias' },
      correcao: `public class Calendario {
    public static void main(String[] args) {
        int mes = 11;
        int dias = switch (mes) {
            case 2 -> 28;
            case 4, 6, 9, 11 -> 30;
            default -> 31;
        };
        System.out.println(dias + " dias");
    }
}`,
      saidaCorrigida: '30 dias',
      dica: 'Recite os meses de 30 dias: abril, junho, setembro e... Compare com os rótulos do `case`.',
      explicacao: 'Um rótulo errado, 10 no lugar de 11, faz novembro cair no `default`. O compilador não tem como saber disso: só um teste com cada mês pega. É o tipo de bug que um teste automatizado com os doze meses encontra na hora.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t3-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a principal diferença de comportamento entre `case X:` e `case X ->`?',
      opcoes: [
        'Com `->`, não há fall-through: só o lado direito da seta é executado',
        'Com `->`, os rótulos não precisam ser constantes',
        'Com `->`, o `switch` aceita seletor `long`',
        'Não há diferença, é só estilo',
      ],
      resposta: 0,
      explicacao: 'Na forma arrow, cada `case` é independente, e o `break` deixa de ser necessário. As regras dos rótulos e dos tipos do seletor continuam as mesmas.',
      dica: 'Pense no que acontece depois de um `case` executar: na forma com seta, a execução continua para o próximo?',
    },
    {
      id: 'estagiario-t3-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int m : new int[] {2, 11, 12}) {
    int dias = switch (m) {
        case 2 -> 28;
        case 4, 6, 9, 11 -> 30;
        default -> 31;
    };
    System.out.println(dias);
}`,
      resposta: '28\n30\n31',
      explicacao: 'A expressão `switch` produz um valor por mês: fevereiro 28, novembro está na lista dos meses de 30 dias, e dezembro cai no `default`.',
      dica: 'Para cada mês do laço, procure o `case` que casa; o que não casa vai para o `default`.',
    },
    {
      id: 'estagiario-t3-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `int x = 5;
String s = switch (x) {
    case 1 -> "um";
    case 2 -> "dois";
};
System.out.println(s);`,
      opcoes: [
        'Não compila: a expressão `switch` não cobre todos os valores',
        'Imprime `null`',
        'Lança `MatchException`',
        'Imprime uma linha vazia',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Uma expressão sempre precisa produzir um valor, e um `int` pode ser qualquer coisa além de 1 e 2. Sem `default`, o compilador recusa. Com um `enum`, listar todas as constantes bastaria.',
      dica: 'Uma expressão precisa de um valor para todo `int`. O que acontece com o 5?',
    },
    {
      id: 'estagiario-t3-e03-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`int n = 1; switch (n) { case 1 -> System.out.println(1); case 2: System.out.println(2); }`',
        '`int n = 1; int r = switch (n) { case 1 -> 10; default -> { yield 20; } };`',
        '`int n = 1; int r = switch (n) { case 1 -> 10; default -> { 20; } };`',
        '`int n = 1; String s = switch (n) { case 1: yield "um"; default: yield "outro"; };`',
        '`int n = 1; switch (n) { case 1 -> {} default -> {} }`',
      ],
      respostas: [0, 2],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Misturar `->` com `:` é proibido, e um bloco numa expressão precisa terminar com `yield` (`20;` sozinho nem é um comando válido). A forma com `:` funciona numa expressão desde que cada caminho termine em `yield`, e blocos vazios são válidos num `switch` comando.',
      dica: 'Não se misturam `:` e `->` no mesmo `switch`, e um bloco precisa entregar o valor com `yield`.',
    },
    {
      id: 'estagiario-t3-e03-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int n = 3;
String r = switch (n) {
    case 1:
    case 2:
        yield "pequeno";
    case 3:
        System.out.println("três");
    default:
        yield "grande";
};
System.out.println(r);`,
      opcoes: ['`três\ngrande`', '`grande`', '`três`', 'Não compila: `case 3` sem `yield`', '`três\npequeno`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com `:`, o fall-through existe mesmo numa expressão. O `case 3` imprime e cai no `default`, que produz o valor. Basta que todo caminho termine num `yield`, e termina.',
      dica: 'Com `:` numa expressão, o fall-through volta. A execução entra no `case 3` e desce até um `yield`.',
    },
    {
      id: 'estagiario-t3-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `var v = switch (1) {
    case 1 -> 'x';
    default -> 1L;
};
System.out.println(v);`,
      opcoes: ['`120`', '`x`', '`120.0`', 'Não compila: tipos diferentes nos ramos'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os ramos são `char` e `long`, então a expressão é promovida para `long`. O `\'x\'` escolhido vira 120. Com `var`, o tipo inferido é `long`.',
      dica: 'Os ramos são `char` e `long`. Qual é o tipo da expressão, e quanto vale `\'x\'` nesse tipo?',
    },
    {
      id: 'estagiario-t3-e03-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com a palavra que devolve o valor do bloco. O programa deve imprimir `A`.',
      codigo: `public class Conceito {
    public static void main(String[] args) {
        int nota = 9;
        String conceito = switch (nota / 2) {
            case 5, 4 -> {
                String c = "A";
                ___ c;
            }
            default -> "B";
        };
        System.out.println(conceito);
    }
}`,
      respostas: ['yield'],
      saida: 'A',
      explicacao: '9 / 2 é 4, que cai no primeiro `case`. Dentro do bloco, `yield` produz o valor da expressão. `return` sairia do `main` e não é permitido dentro de uma expressão `switch`.',
      dica: 'No bloco de um `case`, qual palavra entrega o valor à expressão?',
    },
    {
      id: 'estagiario-t3-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Tamanho {
    enum Camiseta { P, M, G }

    static int medida(Camiseta c) {
        return switch (c) {
            case P -> 50;
            case M -> 54;
            case G -> 58;
        };
    }

    public static void main(String[] args) {
        System.out.println(medida(Camiseta.M) + medida(Camiseta.G));
    }
}`,
      opcoes: ['`112`', '`5458`', 'Não compila: falta `default`', '`104`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com `enum`, cobrir todas as constantes torna a expressão exaustiva sem `default`. 54 + 58 = 112: soma de dois `int`, sem nenhuma `String` na conta.',
      dica: 'Com `enum`, cobrir todas as constantes basta. Some as duas medidas.',
    },
    {
      id: 'estagiario-t3-e03-q09',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Retorno {
    static String f(int n) {
        String s = switch (n) {
            case 1 -> "um";
            case 2 -> {
                return "dois";
            }
            default -> "outro";
        };
        return s;
    }

    public static void main(String[] args) {
        System.out.println(f(2));
    }
}`,
      resposta: 6,
      explicacao: 'Não se pode sair do método de dentro de uma expressão `switch`: o bloco precisa produzir um valor com `yield "dois";`. O `return s;` da linha 10 está fora do `switch` e é válido.',
      dica: 'Procure uma palavra que tentaria sair do método inteiro de dentro da expressão.',
    },
    {
      id: 'estagiario-t3-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      provas: ['830', '831'],
      enunciado: 'No Java 21, qual é a saída?',
      codigo: `Object o = "Java";
String r = switch (o) {
    case Integer i when i > 0 -> "positivo";
    case String s when s.length() > 3 -> "texto longo";
    case String s -> "texto";
    default -> "outro";
};
System.out.println(r);`,
      opcoes: ['`texto longo`', '`texto`', '`outro`', 'Não compila: padrões no `switch`', '`positivo`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os `case` com padrão são testados em ordem. O objeto não é `Integer`; é `String` com 4 letras, então a guarda `when` é verdadeira no segundo `case`. Pattern matching em `switch` é do Java 21.',
      dica: 'Os `case` são testados em ordem. "Java" é `String`, e o comprimento dele é maior que 3?',
    },
    {
      id: 'estagiario-t3-e03-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int d = 5; d <= 7; d++) {
    switch (d) {
        case 1, 2, 3, 4, 5 -> System.out.println(d + " útil");
        case 6 -> System.out.println(d + " sábado");
        default -> System.out.println(d + " domingo");
    }
}`,
      resposta: '5 útil\n6 sábado\n7 domingo',
      explicacao: 'Cada `case` com seta executa só o seu lado direito. Sem fall-through, o 5 não "cai" no `case 6`, como aconteceria com `:` e sem `break`.',
      dica: 'Na forma com seta não há fall-through: cada `d` imprime uma linha só.',
    },
    {
      id: 'estagiario-t3-e03-q12',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais afirmações sobre expressões `switch` são verdadeiras? Escolha duas.',
      opcoes: [
        'Precisam cobrir todos os valores possíveis do seletor',
        'Na forma `->`, não há fall-through',
        'Podem usar `return` para produzir o valor de um `case`',
        'Usam `break valor;` para sair com um resultado',
        'Aceitam seletor `long`',
      ],
      respostas: [0, 1],
      explicacao: 'Uma expressão sempre precisa ter um valor, daí a exaustividade, e a seta elimina o fall-through. O valor de um bloco sai com `yield` (o `break` com valor existiu só numa versão de *preview*), e os tipos do seletor são os mesmos do `switch` clássico.',
      dica: 'Pense na exaustividade e na ausência de fall-through.',
    },
    {
      id: 'estagiario-t3-e03-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Dentro de um bloco `{ }` de uma expressão `switch`, qual palavra produz o valor do `case`?',
      opcoes: ['`yield`', '`return`', '`break`', '`continue`'],
      resposta: 0,
      explicacao: '`yield` encerra o bloco e entrega o valor para a expressão. `return` sairia do método e não é permitido ali.',
      dica: 'Não é `return` nem `break`: é a palavra criada para entregar o valor de um bloco.',
    },
    {
      id: 'estagiario-t3-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `String s = "a";
int r = switch (s) {
    case "a" -> 1;
    case "b" -> 2;
};`,
      opcoes: [
        'Não compila: falta o `default`',
        'Compila; `r` vale 1',
        'Compila, mas lança exceção se `s` não for "a" nem "b"',
        'Não compila: `switch` não aceita `String`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Uma `String` pode ter infinitos valores, e dois `case` não a cobrem. O compilador não "sabe" que `s` vale "a": a exaustividade é verificada pelo tipo, não pelo valor.',
      dica: '`String` tem infinitos valores possíveis. Dois `case` cobrem todos?',
    },
    {
      id: 'estagiario-t3-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int i = 0;
int r = switch (i++) {
    case 0 -> i * 10;
    case 1 -> i * 100;
    default -> -1;
};
System.out.println(r + " " + i);`,
      opcoes: ['`10 1`', '`0 1`', '`100 1`', '`0 0`', '`10 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O seletor `i++` vale 0 e deixa `i` em 1, uma única vez, antes de escolher o `case`. O `case 0` usa o `i` já incrementado: 1 · 10 = 10.',
      dica: 'O seletor usa `i++`: ele vale o 0 antigo, e `i` já é 1 quando o `case` calcula o resultado.',
    },
  ],
};

export default episodio;
