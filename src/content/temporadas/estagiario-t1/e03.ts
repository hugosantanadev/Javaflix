import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t1-e03',
  minutos: 11,
  aula,
  armadilhas: [
    'Literal inteiro é `int`: `long x = 3000000000;` não compila sem o `L`.',
    'Literal com ponto é `double`: `float f = 1.5;` não compila sem o `f`.',
    'Zero à esquerda vira octal: `010` vale 8, e `09` não compila.',
    '`_` só entre dígitos: nunca no começo, no fim, ao lado do ponto ou do sufixo.',
    '`char` é numérico e sem sinal (0 a 65.535); `char + char` resulta em `int`.',
    '`boolean` não converte para número nem com cast.',
    'Uma constante que cabe pode ir para `byte`, `short` ou `char` sem cast; uma variável não, a menos que seja `final` e inicializada com constante.',
    'Overflow de `int` dá a volta para o valor negativo, sem exceção.',
  ],
  ia: {
    uso:
      'A IA é boa para gerar exercícios de conversão entre bases e para explicar, passo a passo, por que uma conta deu overflow ou por que 0.1 + 0.2 não dá 0.3. Use-a para conferir as suas contas de binário, não para fazê-las por você: na prova, quem converte é você, sem ajuda.',
    pedido:
      'Estou aprendendo os tipos primitivos do Java 25. Me dê 6 declarações, uma por linha, misturando byte, short, char, long e float, com literais em decimal, hexadecimal, octal e binário.\n- Não diga quais compilam.\n- Depois que eu responder, explique cada uma citando a regra: tipo do literal, faixa ou sufixo.\n- Quando a conta envolver binário, mostre os bits.',
    erros: [
      'Diz que o `char` tem 8 bits, como em C, ou que `byte b = 200;` só gera um aviso.',
      'Sugere `double` para guardar dinheiro, sem avisar que 0.1 não tem representação exata em binário.',
      'Erra conversões de base, principalmente o octal: lê `010` como 10.',
    ],
    conferir: [
      'Rode cada declaração no `jshell`: ele diz na hora se compila e qual é o valor.',
      'Confira conversões com `Integer.toBinaryString` e `Integer.toHexString`.',
      'Para as faixas, imprima `Byte.MIN_VALUE`, `Byte.MAX_VALUE` e `(int) Character.MAX_VALUE`.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: Primitive Data Types',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html',
      tipo: 'documentacao',
      porque: 'A tabela oficial dos oito primitivos, valores padrão e literais, incluindo underscores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 3.10: Literals',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10',
      tipo: 'documentacao',
      porque: 'A definição exata de cada literal: bases, sufixos, underscore e escapes de char.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 5.2: Assignment Contexts',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.2',
      tipo: 'documentacao',
      porque: 'Onde está escrita a regra das constantes que podem ir para byte, short e char sem cast.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Primitive Types',
      url: 'https://dev.java/learn/language/constructs/basics/primitive-types/',
      tipo: 'tutorial',
      porque: 'Capítulo oficial sobre os primitivos e os literais, com a regra do underscore.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Introduction to Java Primitives',
      url: 'https://www.baeldung.com/java-primitives',
      tipo: 'artigo',
      porque: 'Tamanho, faixa e valor padrão de cada tipo numa tabela só, mais overflow e autoboxing.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Primitives Type Casting',
      url: 'https://www.baeldung.com/java-primitive-conversions',
      tipo: 'artigo',
      porque: 'Alargamento e estreitamento entre primitivos: o que é automático e o que exige cast. Prepara a próxima temporada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Representation of Integers at a Bit Level in Java',
      url: 'https://www.baeldung.com/java-integer-bit-representation',
      tipo: 'artigo',
      porque: 'Como um int fica guardado bit a bit, com complemento de dois.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #06, Tipos Primitivos e Manipulação de Dados',
      url: 'https://www.youtube.com/watch?v=JEAQeT7YGs4',
      tipo: 'video',
      porque: 'Os tipos primitivos em português, com exemplos de declaração e conversão.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Crash Course Computer Science #4: Representing Numbers and Letters with Binary',
      url: 'https://www.youtube.com/watch?v=1GSjbWt0c9M',
      tipo: 'video',
      porque: 'Como números, negativos, ponto flutuante e letras viram bits, em 10 minutos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas e as pegadinhas de literal que a prova usa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seções sobre tipos primitivos, literais e underscores',
    },
    {
      titulo: 'IEEE 754 Float Converter',
      url: 'https://www.h-schmidt.net/FloatConverter/IEEE754.html',
      tipo: 'ferramenta',
      porque: 'Digite um número e veja os bits de sinal, expoente e mantissa de um float.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Version Almanac',
      url: 'https://javaalmanac.io/',
      tipo: 'ferramenta',
      porque: 'Para conferir as constantes MIN_VALUE e MAX_VALUE de cada wrapper e o que mudou entre versões.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Tabela de limites',
    enunciado:
      'Escreva a classe `Limites` que imprime o menor e o maior valor de cada tipo inteiro, exatamente assim:\n\n```text\nbyte: -128 a 127\nshort: -32768 a 32767\nint: -2147483648 a 2147483647\nlong: -9223372036854775808 a 9223372036854775807\nchar: 0 a 65535\n```\n\nNão digite os números: use as constantes das classes `Byte`, `Short`, `Integer`, `Long` e `Character`.',
    dicas: [
      'Cada wrapper tem `MIN_VALUE` e `MAX_VALUE`, por exemplo `Byte.MIN_VALUE`.',
      '`Character.MIN_VALUE` é um `char`. Para imprimir o número, faça cast para `int`.',
    ],
    solucao: `public class Limites {
    public static void main(String[] args) {
        System.out.println("byte: " + Byte.MIN_VALUE + " a " + Byte.MAX_VALUE);
        System.out.println("short: " + Short.MIN_VALUE + " a " + Short.MAX_VALUE);
        System.out.println("int: " + Integer.MIN_VALUE + " a " + Integer.MAX_VALUE);
        System.out.println("long: " + Long.MIN_VALUE + " a " + Long.MAX_VALUE);
        System.out.println("char: " + (int) Character.MIN_VALUE + " a " + (int) Character.MAX_VALUE);
    }
}`,
    saida:
      'byte: -128 a 127\nshort: -32768 a 32767\nint: -2147483648 a 2147483647\nlong: -9223372036854775808 a 9223372036854775807\nchar: 0 a 65535',
    comentarios:
      'Sem o cast, `Character.MIN_VALUE` seria impresso como o caractere de código 0, invisível no console. Vale notar que `byte` e `short` são impressos como números normalmente: só o `char` é mostrado como caractere.',
  },
  bugs: [
    {
      id: 'estagiario-t1-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: integer number too large`.',
      codigo: `public class Populacao {
    public static void main(String[] args) {
        long habitantes = 3000000000;
        System.out.println(habitantes);
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Populacao {
    public static void main(String[] args) {
        long habitantes = 3000000000L;
        System.out.println(habitantes);
    }
}`,
      saidaCorrigida: '3000000000',
      dica: 'A variável é `long`, mas o problema está no valor escrito à direita. Que tipo tem um literal inteiro sem sufixo?',
      explicacao: 'Um literal inteiro sem sufixo é `int`, que vai até 2.147.483.647. Não importa que a variável seja `long`: o literal precisa caber no próprio tipo. O sufixo `L` faz dele um `long`.',
    },
    {
      id: 'estagiario-t1-e03-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: possible lossy conversion from double to float`.',
      codigo: `public class Preco {
    public static void main(String[] args) {
        float preco = 19.90;
        System.out.println(preco);
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Preco {
    public static void main(String[] args) {
        float preco = 19.90f;
        System.out.println(preco);
    }
}`,
      saidaCorrigida: '19.9',
      dica: 'Literais com ponto decimal também têm um tipo padrão. Ele cabe num `float` sem perder nada?',
      explicacao: 'Um literal decimal sem sufixo é `double`, e passar de `double` para `float` pode perder precisão, por isso o compilador exige o sufixo `f` ou um cast. Para dinheiro de verdade, nem `float` nem `double`: o certo é `BigDecimal`.',
    },
    {
      id: 'estagiario-t1-e03-b03',
      dificuldade: 3,
      sintoma: 'O programa deveria imprimir os microssegundos de um dia, 86400000000, mas imprime outro número.',
      codigo: `public class MicrossegundosPorDia {
    public static void main(String[] args) {
        long micros = 24 * 60 * 60 * 1000 * 1000;
        System.out.println(micros);
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: '500654080' },
      correcao: `public class MicrossegundosPorDia {
    public static void main(String[] args) {
        long micros = 24L * 60 * 60 * 1000 * 1000;
        System.out.println(micros);
    }
}`,
      saidaCorrigida: '86400000000',
      dica: 'A conta inteira acontece antes de o resultado ser guardado na variável. Em que tipo ela acontece?',
      explicacao: 'Todos os fatores são `int`, então a multiplicação é feita em `int` e estoura em silêncio, antes de o resultado chegar ao `long`. Com `24L`, a conta inteira passa a ser feita em `long`. É um bug real e famoso, sem erro de compilação nem exceção.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t1-e03-q01',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`long populacao = 8_100_000_000L;`',
        '`int salario = 1_500_;`',
        '`float preco = 9.99;`',
        '`double taxa = 5;`',
        '`byte idade = 130;`',
        '`char letra = 65;`',
      ],
      respostas: [0, 3, 5],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        'O `long` tem o sufixo `L` e underscores entre dígitos. Um `int` cabe em `double`. E `65` é uma constante que cabe em `char` (vira `A`). Já `1_500_` termina com underscore, `9.99` é `double` e não vai para `float` sem cast, e 130 não cabe em `byte`.',
      dica: 'Para cada linha, pergunte: de que tipo é o literal, e ele cabe no tipo da variável? E o `_` está entre dois dígitos?',
    },
    {
      id: 'estagiario-t1-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int a = 010;
int b = 0x10;
int c = 0b10;
System.out.println(a + b + c);`,
      opcoes: ['`26`', '`30`', '`12`', '`101010`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        '`010` é octal (8), `0x10` é hexadecimal (16) e `0b10` é binário (2). A soma é 8 + 16 + 2 = 26. Quem lê `010` como dez chega em 28 ou 30.',
      dica: 'Converta cada literal para decimal antes de somar: um zero à esquerda é base 8, `0x` é base 16 e `0b` é base 2.',
    },
    {
      id: 'estagiario-t1-e03-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `char c = 'A';
c++;
System.out.println(c);
System.out.println(c + 1);
System.out.println((char) (c + 1));`,
      resposta: 'B\n67\nC',
      explicacao:
        '`c++` avança para o próximo código, `B` (66). Em `c + 1` o `char` é promovido para `int`, então sai `67`. Com o cast de volta para `char`, 67 vira `C`.',
      dica: '`c++` avança para a letra seguinte. Depois compare: `c + 1` é `char` ou `int`? E o que o cast `(char)` faz com o resultado?',
    },
    {
      id: 'estagiario-t1-e03-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Limites {
    public static void main(String[] args) {
        byte b = 127;
        short s = 32767;
        int i = 2147483647;
        long l = 2147483648;
        System.out.println(b + s + i + l);
    }
}`,
      resposta: 6,
      explicacao:
        'Os três primeiros valores são exatamente os máximos de `byte`, `short` e `int`, então compilam. Na linha 6, `2147483648` é um literal `int` (não tem `L`) que passa do máximo de `int`. Mesmo indo para um `long`, o literal em si é inválido.',
      dica: 'Um literal inteiro sem sufixo é `int`. Qual dos valores passa do maior `int`, 2.147.483.647?',
    },
    {
      id: 'estagiario-t1-e03-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a faixa de valores de um `char`?',
      opcoes: ['0 a 65.535', '-128 a 127', '-32.768 a 32.767', '0 a 255', 'Depende do sistema operacional'],
      resposta: 0,
      explicacao:
        '`char` tem 16 bits e é o único tipo inteiro sem sinal. Ele guarda códigos Unicode de 0 a 65.535, em qualquer sistema.',
      dica: 'O `char` tem 16 bits e não tem sinal: nenhum valor dele é negativo.',
    },
    {
      id: 'estagiario-t1-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com um valor de 4,5 que faça o código compilar e imprimir `9.0`.',
      codigo: `public class Cafe {
    public static void main(String[] args) {
        float preco = ___;
        System.out.println(preco * 2);
    }
}`,
      respostas: ['4.5f', '4.5F', '(float) 4.5', '9 / 2f', '9f / 2'],
      saida: '9.0',
      explicacao:
        '`4.5` sozinho é `double` e não cabe em `float` sem conversão. O sufixo `f` faz do literal um `float`; um cast `(float)` também resolve.',
      dica: 'Um literal com ponto é `double`, que não entra em `float` sem ajuda. Que sufixo, ou que conversão, transforma 4,5 em `float`?',
    },
    {
      id: 'estagiario-t1-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int max = Integer.MAX_VALUE;
int depois = max + 1;
System.out.println(depois);`,
      opcoes: ['`2147483648`', '`-2147483648`', 'Lança `ArithmeticException`', 'Não compila', '`0`'],
      resposta: 1,
      verificar: { tipo: 'saida' },
      explicacao:
        'Somas de `int` que passam do limite dão a volta: depois de 2.147.483.647 vem -2.147.483.648. Java não lança exceção em overflow de inteiros.',
      dica: 'Java não lança exceção em overflow de `int`. O valor dá a volta, como um hodômetro que passa do último número.',
    },
    {
      id: 'estagiario-t1-e03-q08',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha duas.',
      opcoes: [
        '`int i = 10;\nbyte b = i;`',
        '`final int i = 10;\nbyte b = i;`',
        '`final int i = 200;\nbyte b = i;`',
        '`byte b = 10;\nb = b + 1;`',
        "`short s = 'A';`",
      ],
      respostas: [1, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        'Constantes de compilação que cabem na faixa podem ir para `byte`, `short` e `char` sem cast. Uma variável `final` inicializada com literal é constante; uma variável comum não é. `200` não cabe em `byte`, e `b + 1` resulta em `int`. Já `\'A\'` é a constante 65, que cabe em `short`.',
      dica: 'Sem cast, só uma **constante** que cabe na faixa entra num `byte`, `short` ou `char`. E `b + 1` é de que tipo?',
    },
    {
      id: 'estagiario-t1-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Padrao {
    static int numero;
    static double valor;
    static boolean ativo;
    static char letra;

    public static void main(String[] args) {
        System.out.println(numero + " " + valor + " " + ativo + " " + (int) letra);
    }
}`,
      opcoes: ['`0 0.0 false 0`', '`0 0 false 0`', '`null null null null`', 'Não compila: os campos não foram inicializados', '`0 0.0 true 32`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'Campos recebem valores padrão: `0` para inteiros, `0.0` para ponto flutuante, `false` para `boolean` e o caractere de código 0 para `char`. Variáveis locais não teriam esse benefício.',
      dica: 'Campos `static` ganham valor padrão. O `char` padrão é o caractere de código 0, e um `double` sempre imprime com `.0`.',
    },
    {
      id: 'estagiario-t1-e03-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `long km = 1_000L;
int metros = 1_0_0_0;
System.out.println(km + metros);
System.out.println("" + km + metros);`,
      resposta: '2000\n10001000',
      explicacao:
        '`1_0_0_0` é só 1000 escrito de um jeito estranho, mas válido. Na primeira linha a soma é numérica; na segunda, a String vazia no começo transforma tudo em concatenação.',
      dica: 'Na primeira linha, `long + int` é uma soma. Na segunda, a String vazia vem primeiro: o que o `+` passa a fazer?',
    },
    {
      id: 'estagiario-t1-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual declaração compila?',
      opcoes: ['`boolean ok = 1;`', '`boolean ok = "true";`', '`boolean ok = 5 > 3;`', '`boolean ok = null;`', '`Boolean ok = 0;`'],
      resposta: 2,
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        'Um `boolean` só aceita `true`, `false` ou uma expressão que resulte nisso, como `5 > 3`. Números e Strings não viram booleanos, e um primitivo não pode ser `null`.',
      dica: '`boolean` só aceita `true`, `false` ou uma expressão que dê um deles. Nada de números nem de texto.',
    },
    {
      id: 'estagiario-t1-e03-q12',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Precos {
    public static void main(String[] args) {
        double a = 10;
        float b = 2.5f;
        long c = 3;
        float d = a * b;
        System.out.println(c + d);
    }
}`,
      resposta: 6,
      explicacao:
        'Em `a * b`, o `float` é promovido para `double`, e o resultado `double` não cabe em `float` sem cast. As outras linhas são conversões que só aumentam o tipo, como `int` para `double` e `int` para `long`.',
      dica: 'Qual é o tipo de `double * float`? Esse tipo cabe em `float` sem cast?',
    },
    {
      id: 'estagiario-t1-e03-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes **não** é um tipo primitivo?',
      opcoes: ['`int`', '`char`', '`boolean`', '`byte`', '`String`'],
      resposta: 4,
      explicacao: '`String` é uma classe do pacote `java.lang`. Os primitivos são oito: `byte`, `short`, `int`, `long`, `float`, `double`, `char` e `boolean`.',
      dica: 'Os primitivos são oito e todos têm nome em letra minúscula. Um dos itens é uma classe.',
    },
    {
      id: 'estagiario-t1-e03-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais literais são do tipo `double`? Escolha duas.',
      opcoes: ['`3.0`', '`3f`', '`3`', '`3e2`', '`3L`', "`'3'`"],
      respostas: [0, 3],
      explicacao:
        'Um literal com ponto decimal ou com expoente (`e`) é `double`, a menos que tenha o sufixo `f`. `3` é `int`, `3L` é `long` e `\'3\'` é um `char`.',
      dica: 'Um literal é `double` quando tem ponto ou expoente `e` e não tem o sufixo `f`.',
    },
    {
      id: 'estagiario-t1-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `char a = '\\u0041';
char b = 'a';
System.out.println(a + b);`,
      opcoes: ['`Aa`', '`162`', 'Não compila', '`A97`', '`65a`'],
      resposta: 1,
      verificar: { tipo: 'saida' },
      explicacao:
        '`\\u0041` é o `A`, de código 65, e `a` tem código 97. Somar dois `char` dá um `int`: 65 + 97 = 162. Para juntar como texto, seria preciso uma String na expressão.',
      dica: 'Descubra que letra o escape Unicode representa. Depois lembre o que `char + char` produz.',
    },
  ],
};

export default episodio;
