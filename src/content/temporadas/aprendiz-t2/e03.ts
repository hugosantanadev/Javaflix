import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t2-e03',
  minutos: 12,
  aula,
  armadilhas: [
    'Erro de tipo é semântico, não sintático: o código está bem formado, mas não faz sentido.',
    'Expressões só com literais e `final` constantes são calculadas pelo `javac`.',
    '`"Ja" + "va" == "Java"` é `true` (constante); com uma variável não `final` no meio, é `false`.',
    'Rótulo de `case` precisa ser constante de compilação; variável comum não compila.',
    '`while (false)` não compila (corpo inalcançável), mas `if (false)` compila.',
    'O `javac` otimiza pouco; a otimização pesada é do JIT.',
  ],
  ia: {
    uso:
      'A IA ajuda a ler mensagens do compilador e a dizer em que etapa cada erro nasce. Também é uma boa parceira para escrever um analisador léxico pequeno, desde que você teste com entradas difíceis.',
    pedido:
      'Estou estudando as etapas de um compilador.\n<cole a mensagem de erro do javac e o trecho de código aqui>\n- Diga em que etapa (léxica, sintática, semântica) o erro nasce e por quê.\n- Explique a correção sem reescrever o resto do código.\n- Se houver vários erros, diga qual é a causa e quais são consequência.',
    erros: [
      'Atribui o erro à etapa errada ou corrige outro problema.',
      'Diz que `==` com Strings funciona sempre que o texto é igual.',
      'Escreve analisadores léxicos que perdem o último token da entrada.',
    ],
    conferir: [
      'Leia a linha e a coluna apontadas pelo `javac`; comece pelo primeiro erro.',
      'Teste Strings com `equals`, e confira `==` só para entender o pool.',
      'Teste o analisador com uma entrada que termina num número.',
    ],
  },
  recursos: [
    {
      titulo: 'JLS 15.29: Constant Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.29',
      tipo: 'documentacao',
      porque: 'A lista exata do que conta como expressão constante em Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.22: Unreachable Statements',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.22',
      tipo: 'documentacao',
      porque: 'As regras de código inalcançável, inclusive a justificativa para o `if (false)` ser permitido.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Crafting Interpreters: A Map of the Territory',
      url: 'https://craftinginterpreters.com/a-map-of-the-territory.html',
      tipo: 'tutorial',
      porque: 'O capítulo que mostra todas as etapas de um compilador com uma metáfora de montanha. O livro inteiro é gratuito.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Akitando #117: Linguagem Compilada vs Interpretada',
      url: 'https://akitaonrails.com/2022/04/15/akitando-117-linguagem-compilada-vs-interpretada-qual-e-melhor/',
      tipo: 'video',
      porque: 'Em português: análise léxica, sintática, AST, otimização e geração de código, com exemplos em várias linguagens.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Crash Course Computer Science #12: Programming Basics, Statements & Functions',
      url: 'https://www.youtube.com/watch?v=l26oaHV7D40',
      tipo: 'video',
      porque: 'Como as instruções de alto nível são definidas por uma gramática que o compilador entende.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crafting Interpreters (Robert Nystrom)',
      url: 'https://craftinginterpreters.com/',
      tipo: 'livro',
      porque: 'Constrói um interpretador completo em Java e outro em C. Gratuito na web.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 4 "Scanning", 5 "Representing Code" e 6 "Parsing Expressions"',
      nivel: 'fundo',
    },
    {
      titulo: 'OpenJDK: Compilation Overview',
      url: 'https://openjdk.org/groups/compiler/doc/compilation-overview/index.html',
      tipo: 'documentacao',
      porque: 'As etapas do próprio `javac` (parse, enter, attribute, flow, desugar, generate), com o que cada uma faz.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Manual do javac (JDK 21)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/javac.html',
      tipo: 'documentacao',
      porque: 'Todas as opções do compilador, como `--release`, `-Xlint` e `-g`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crafting Interpreters: Scanning',
      url: 'https://craftinginterpreters.com/scanning.html',
      tipo: 'tutorial',
      porque: 'Um lexer completo escrito em Java, linha por linha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crafting Interpreters: Parsing Expressions',
      url: 'https://craftinginterpreters.com/parsing-expressions.html',
      tipo: 'tutorial',
      porque: 'Como a gramática e a precedência viram um parser de descida recursiva.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Compilador',
      url: 'https://pt.wikipedia.org/wiki/Compilador',
      tipo: 'artigo',
      porque: 'As fases do compilador e a história, de Grace Hopper ao LLVM.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Um analisador léxico de verdade',
    enunciado:
      'Escreva a classe `Lexer` que recebe uma expressão aritmética com inteiros, `+ - * /`, parênteses e espaços, e imprime um token por linha com o tipo. Para `12 + 3*(40 - 2)`, a saída deve ser:\n\n```text\nNUM 12\nOP +\nNUM 3\nOP *\nABRE (\nNUM 40\nOP -\nNUM 2\nFECHA )\n```',
    dicas: [
      'Percorra a String com um índice. Espaço: pule. Dígito: continue lendo enquanto for dígito.',
      '`Character.isDigit(c)` e `Character.isWhitespace(c)` ajudam.',
      'Qualquer outro caractere que não seja operador ou parêntese deveria virar um erro léxico.',
    ],
    solucao: `public class Lexer {
    public static void main(String[] args) {
        String fonte = "12 + 3*(40 - 2)";
        int i = 0;
        while (i < fonte.length()) {
            char c = fonte.charAt(i);
            if (Character.isWhitespace(c)) {
                i++;
            } else if (Character.isDigit(c)) {
                int inicio = i;
                while (i < fonte.length() && Character.isDigit(fonte.charAt(i))) i++;
                System.out.println("NUM " + fonte.substring(inicio, i));
            } else if ("+-*/".indexOf(c) >= 0) {
                System.out.println("OP " + c);
                i++;
            } else if (c == '(') {
                System.out.println("ABRE (");
                i++;
            } else if (c == ')') {
                System.out.println("FECHA )");
                i++;
            } else {
                throw new IllegalArgumentException("caractere inesperado: " + c);
            }
        }
    }
}`,
    saida: 'NUM 12\nOP +\nNUM 3\nOP *\nABRE (\nNUM 40\nOP -\nNUM 2\nFECHA )',
    comentarios:
      'É exatamente o primeiro passo do `javac`, em miniatura. Repare que os espaços somem e que `12` vira um token só, não dois. O próximo passo seria um parser que consome esses tokens respeitando a precedência, como o do capítulo 6 do Crafting Interpreters.',
  },
  bugs: [
    {
      id: 'aprendiz-t2-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: constant expression required`.',
      codigo: `public class Rotulo {
    public static void main(String[] args) {
        int limite = 3;
        int n = 3;
        switch (n) {
            case limite -> System.out.println("no limite");
            default -> System.out.println("fora do limite");
        }
    }
}`,
      linha: 6,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Rotulo {
    public static void main(String[] args) {
        int limite = 3;
        int n = 3;
        switch (n) {
            case 3 -> System.out.println("no limite");
            default -> System.out.println("fora do limite");
        }
    }
}`,
      saidaCorrigida: 'no limite',
      dica: 'O valor de um rótulo de `case` precisa ser conhecido em que momento?',
      explicacao: 'Os rótulos de `case` precisam ser expressões constantes, calculadas pelo compilador. Uma variável comum só tem valor na execução. Um literal resolve, e uma variável `final` inicializada com constante também serviria.',
    },
    {
      id: 'aprendiz-t2-e03-b02',
      dificuldade: 2,
      sintoma: 'O login compara o usuário digitado com "admin" e responde `negado`, embora o texto seja igual.',
      codigo: `public class Login {
    public static void main(String[] args) {
        String prefixo = "ad";
        String digitado = prefixo + "min";
        if (digitado == "admin") {
            System.out.println("liberado");
        } else {
            System.out.println("negado");
        }
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'negado' },
      correcao: `public class Login {
    public static void main(String[] args) {
        String prefixo = "ad";
        String digitado = prefixo + "min";
        if (digitado.equals("admin")) {
            System.out.println("liberado");
        } else {
            System.out.println("negado");
        }
    }
}`,
      saidaCorrigida: 'liberado',
      dica: '`prefixo` não é `final`. A concatenação acontece na compilação ou na execução? E o que `==` compara?',
      explicacao: 'Como `prefixo` não é uma constante, a concatenação acontece na execução e cria um objeto novo, diferente do `"admin"` do pool. O `==` compara referências. Para comparar o texto, use `equals`.',
    },
    {
      id: 'aprendiz-t2-e03-b03',
      dificuldade: 3,
      sintoma: 'O analisador léxico de brinquedo devolve `[12, +]` para a entrada `12+34`, perdendo o último número.',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class Lexer {
    static List<String> tokens(String s) {
        List<String> r = new ArrayList<>();
        String numero = "";
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                numero += c;
            } else {
                if (!numero.isEmpty()) { r.add(numero); numero = ""; }
                r.add(String.valueOf(c));
            }
        }
        return r;
    }

    public static void main(String[] args) {
        System.out.println(tokens("12+34"));
    }
}`,
      linha: 16,
      efeito: { tipo: 'saida', saida: '[12, +]' },
      correcao: `import java.util.ArrayList;
import java.util.List;

public class Lexer {
    static List<String> tokens(String s) {
        List<String> r = new ArrayList<>();
        String numero = "";
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                numero += c;
            } else {
                if (!numero.isEmpty()) { r.add(numero); numero = ""; }
                r.add(String.valueOf(c));
            }
        }
        if (!numero.isEmpty()) r.add(numero); return r;
    }

    public static void main(String[] args) {
        System.out.println(tokens("12+34"));
    }
}`,
      saidaCorrigida: '[12, +, 34]',
      dica: 'Um número só é guardado na lista quando aparece um caractere que não é dígito. E se a entrada terminar num número?',
      explicacao: 'O token acumulado em `numero` só é emitido quando chega um operador. No fim da entrada não chega mais nada, e o último número fica para trás. Todo laço que acumula precisa de um "descarrego" depois que termina.',
    },
  ],
  exercicios: [
    {
      id: 'aprendiz-t2-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a ordem das etapas de um compilador?',
      opcoes: [
        'Análise léxica, sintática, semântica, otimização e geração de código',
        'Análise sintática, léxica, geração de código e semântica',
        'Otimização, análise léxica, semântica e sintática',
        'Geração de código, otimização, análise semântica e léxica',
      ],
      resposta: 0,
      explicacao: 'Primeiro os caracteres viram tokens, depois os tokens viram árvore, a árvore é conferida, otimizada e por fim vira código.',
      dica: 'Do texto cru até o código de destino, passando pela árvore.',
    },
    {
      id: 'aprendiz-t2-e03-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantos tokens tem a linha `int total = preco * 2;`?',
      opcoes: ['7', '5', '6', '8', '21'],
      resposta: 0,
      explicacao: '`int`, `total`, `=`, `preco`, `*`, `2` e `;`. Espaços não são tokens; servem só para separar.',
      dica: 'Conte palavra-chave, identificadores, operadores, literal e pontuação.',
    },
    {
      id: 'aprendiz-t2-e03-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destes são erros semânticos, ou seja, o código está bem formado mas não faz sentido? Escolha duas.',
      opcoes: [
        '`int x = "dez";`',
        'Usar uma variável que não foi declarada',
        'Esquecer o `;` no fim da linha',
        "Escrever `char c = 'ab';`",
        'Abrir uma chave `{` e não fechar',
      ],
      respostas: [0, 1],
      explicacao: 'Tipo incompatível e nome desconhecido são semânticos: as frases são válidas, o significado não. `;` e chave sem fechar são sintáticos, e um char com dois caracteres é léxico.',
      dica: 'Erro semântico: frase bem formada que não faz sentido.',
    },
    {
      id: 'aprendiz-t2-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String a = "café";
final String c = "ca";
String d = "ca";
System.out.println((a == c + "fé") + " " + (a == d + "fé"));`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`c` é `final` e inicializada com constante, então `c + "fé"` é uma expressão constante: o `javac` monta `"café"` e usa o mesmo objeto do pool. Com `d`, a concatenação acontece na execução e cria outro objeto, com o mesmo texto.',
      dica: 'Só a concatenação com uma constante `final` é feita pelo compilador.',
    },
    {
      id: 'aprendiz-t2-e03-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Na árvore sintática de `2 + 3 * 4`, qual operação fica na raiz?',
      opcoes: [
        'A soma, com a multiplicação como filha da direita',
        'A multiplicação, com a soma como filha da esquerda',
        'As duas no mesmo nível',
        'Nenhuma: a árvore só guarda os números',
      ],
      resposta: 0,
      explicacao: 'A operação que é feita por último fica na raiz. Como a multiplicação tem precedência, ela é calculada antes, mais fundo na árvore, e a soma usa o resultado dela.',
      dica: 'A operação feita por último fica mais perto da raiz.',
    },
    {
      id: 'aprendiz-t2-e03-q06',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha com o erro semântico que impede a compilação.',
      codigo: `public class Tipos {
    public static void main(String[] args) {
        int quantidade = 3;
        double preco = 9.90;
        String rotulo = "Total: ";
        int total = quantidade * preco;
        System.out.println(rotulo + total);
    }
}`,
      resposta: 6,
      explicacao: '`quantidade * preco` é `double`, e não cabe num `int` sem cast. A linha está sintaticamente perfeita; o problema é de tipo, descoberto na análise semântica.',
      dica: 'Procure a atribuição em que os tipos não combinam.',
    },
    {
      id: 'aprendiz-t2-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar e executar?',
      codigo: `public class Inalcancavel {
    public static void main(String[] args) {
        while (false) {
            System.out.println("nunca");
        }
        System.out.println("fim");
    }
}`,
      opcoes: [
        'Não compila: o corpo do `while` é inalcançável',
        'Imprime `fim`',
        'Imprime `nunca` e `fim`',
        'Entra em laço infinito',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Com a condição constante `false`, o corpo do `while` nunca pode executar, e a especificação manda recusar código inalcançável. O `if (false)` é a exceção à regra.',
      dica: 'O compilador recusa código que nunca executa, salvo uma exceção.',
    },
    {
      id: 'aprendiz-t2-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'E agora, com `if`?',
      codigo: `public class Desligado {
    static final boolean DEBUG = false;

    public static void main(String[] args) {
        if (DEBUG) {
            System.out.println("depurando");
        }
        System.out.println("fim");
    }
}`,
      opcoes: ['`fim`', 'Não compila: o corpo do `if` é inalcançável', '`depurando` e `fim`', '`depurando`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `if` com condição constante é permitido de propósito, para ligar e desligar trechos. Como `DEBUG` é constante, o `javac` nem gera o bytecode do `println("depurando")`.',
      dica: 'O `if` com constante é a exceção permitida de propósito.',
    },
    {
      id: 'aprendiz-t2-e03-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é constant folding?',
      opcoes: [
        'Calcular na compilação as expressões formadas só por constantes',
        'Transformar variáveis em constantes automaticamente',
        'Guardar constantes num arquivo separado',
        'Proibir alterações em variáveis `final`',
      ],
      resposta: 0,
      explicacao: 'Se o resultado não depende de nada que só se sabe na execução, o compilador já calcula e grava o resultado. `60 * 60 * 24` vira `86400` no bytecode.',
      dica: '*Folding* é dobrar: a conta vira o resultado.',
    },
    {
      id: 'aprendiz-t2-e03-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais otimizações um compilador pode fazer sem mudar o resultado do programa? Escolha três.',
      opcoes: [
        'Remover código que nunca executa',
        'Calcular antes expressões constantes',
        'Trocar a chamada de um método curto pelo corpo dele (inlining)',
        'Remover um `println` que o programador escreveu',
        'Trocar `int` por `long` para evitar overflow',
        'Mudar a ordem de dois `println`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'As três primeiras deixam o comportamento observável igual. Remover ou reordenar prints e trocar tipos mudaria o que o programa faz, e isso nenhum compilador correto pode fazer.',
      dica: 'Otimizar nunca muda o que o programa imprime.',
    },
    {
      id: 'aprendiz-t2-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que compiladores como GCC e LLVM separam front-end, representação intermediária e back-end?',
      opcoes: [
        'Para combinar várias linguagens com vários processadores sem escrever um compilador para cada par',
        'Para o programa rodar mais rápido na primeira execução',
        'Porque cada etapa precisa rodar num computador diferente',
        'Para impedir que o código seja descompilado',
      ],
      resposta: 0,
      explicacao: 'Com N linguagens e M processadores, seriam N × M compiladores. Com uma representação comum no meio, bastam N front-ends e M back-ends, e as otimizações do meio valem para todos.',
      dica: 'N linguagens e M processadores: quantos compiladores seriam sem o meio?',
    },
    {
      id: 'aprendiz-t2-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual destas linhas tem um erro léxico?',
      opcoes: ["`char c = 'ab';`", '`int x = 10`', '`int y = "a";`', '`x = 5;` sem declarar `x`'],
      resposta: 0,
      explicacao: 'O analisador léxico espera um único caractere entre aspas simples e não consegue formar o token. As outras são sintática (falta `;`) e semânticas (tipo e nome).',
      dica: 'Erro léxico é palavra mal escrita: um literal impossível.',
    },
    {
      id: 'aprendiz-t2-e03-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `final int base = 10;
final int dobro = base * 2;
int valor = 20;
switch (valor) {
    case dobro -> System.out.println("dobro");
    default -> System.out.println("outro");
}`,
      resposta: 'dobro',
      explicacao: '`dobro` é `final` e inicializada com uma expressão constante, então é uma constante de compilação, que o `case` aceita. O `javac` já sabe que ela vale 20.',
      dica: '`dobro` é `final` e inicializado com constante.',
    },
    {
      id: 'aprendiz-t2-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No bytecode de `int x = 2 + 3 * 4;`, o que o `javac` gera?',
      opcoes: [
        'Uma instrução que empilha 14 (`bipush 14`)',
        'Instruções `imul` e `iadd` para fazer a conta na execução',
        'Uma String com o texto `"2 + 3 * 4"`',
        'Uma chamada a `Math.multiplyExact`',
      ],
      resposta: 0,
      explicacao: 'É constant folding: o resultado não depende de nada da execução, então o compilador grava direto o 14. Você viu isso com o `javap -c` no primeiro episódio do cargo Estagiário.',
      dica: '2 + 3 * 4 é calculado pelo compilador.',
    },
    {
      id: 'aprendiz-t2-e03-q15',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para que `LIMITE` possa ser usado como rótulo de `case`. O programa deve imprimir `no limite`.',
      codigo: `public class Rotulo {
    public static void main(String[] args) {
        ___ int LIMITE = 3;
        int n = 3;
        switch (n) {
            case LIMITE -> System.out.println("no limite");
            default -> System.out.println("fora");
        }
    }
}`,
      respostas: ['final'],
      saida: 'no limite',
      explicacao: 'Sem `final`, `LIMITE` é uma variável comum e o `case` não compila: o rótulo precisa ser uma constante que o compilador conhece. Com `final` e um literal, ela vira constante de compilação.',
      dica: 'Que modificador transforma a variável em constante de compilação?',
    },
  ],
};

export default episodio;
