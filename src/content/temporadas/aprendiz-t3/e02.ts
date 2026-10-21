import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t3-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'A faixa é assimétrica: há um negativo a mais. `Math.abs(Integer.MIN_VALUE)` e `-Integer.MIN_VALUE` dão o próprio `MIN_VALUE`.',
    'Overflow de `int` e `long` não lança exceção: o resultado dá a volta.',
    '`long x = 24 * 60 * 60 * 1000 * 1000;` estoura em `int` antes da atribuição. Ponha `L` no primeiro número.',
    'Somar um positivo com um negativo nunca estoura.',
    '`(byte) 200` é −56: o cast descarta os bits de cima.',
    'Um `byte` negativo promovido a `int` ganha 24 bits 1 à esquerda. Use `b & 0xFF` para ler de 0 a 255.',
    '`>>` preserva o sinal e arredonda para baixo; `/` arredonda para zero. `-7 >> 1` é −4 e `-7 / 2` é −3.',
  ],
  recursos: [
    {
      titulo: 'JLS 4.2.2: Integer Operations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2.2',
      tipo: 'documentacao',
      porque: 'A regra que diz que os operadores de inteiros não indicam overflow, e as únicas exceções que eles lançam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 5.1.3: Narrowing Primitive Conversion',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.3',
      tipo: 'documentacao',
      porque: 'Por que `(byte) 200` vira −56: a conversão descarta tudo menos os n bits de baixo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 15.19: Shift Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.19',
      tipo: 'documentacao',
      porque: 'A definição de `<<`, `>>` e `>>>`, incluindo a extensão de sinal e o detalhe de que só os 5 bits de baixo do deslocamento contam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Math.abs e dos métodos exatos',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html#abs(int)',
      tipo: 'documentacao',
      porque: 'A própria documentação avisa que `abs(Integer.MIN_VALUE)` devolve um negativo, e aponta o `absExact`.',
      gratuito: true,
      idioma: 'en',
      onde: 'Métodos abs, absExact, addExact, multiplyExact e toIntExact',
    },
    {
      titulo: 'Google Research: Nearly All Binary Searches and Mergesorts are Broken',
      url: 'https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/',
      tipo: 'artigo',
      porque: 'O texto de Joshua Bloch sobre o overflow que ficou nove anos escondido na busca binária do JDK.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Overflow and Underflow in Java',
      url: 'https://www.baeldung.com/java-overflow-underflow',
      tipo: 'artigo',
      porque: 'Overflow de inteiros e de ponto flutuante lado a lado, com as formas de detectar cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Complemento para dois',
      url: 'https://pt.wikipedia.org/wiki/Complemento_para_dois',
      tipo: 'artigo',
      porque: 'A definição formal, a conversão passo a passo e a extensão de sinal.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipedia: Integer overflow',
      url: 'https://en.wikipedia.org/wiki/Integer_overflow',
      tipo: 'artigo',
      porque: 'Casos reais causados por overflow, como o do Boeing 787 e o de videogames antigos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Ben Eater: Twos complement, Negative numbers in binary',
      url: 'https://www.youtube.com/watch?v=4qH4unVtJkE',
      tipo: 'video',
      porque: 'Compara sinal e magnitude, complemento de um e complemento de dois, e mostra por que o último venceu.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Aula 7: Complemento de 2, Números Binários com Exercícios',
      url: 'https://www.youtube.com/watch?v=AML1F6li9Y0',
      tipo: 'video',
      porque: 'Conversões e somas em complemento de dois resolvidas no quadro, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: "Computer Systems: A Programmer's Perspective (Bryant e O'Hallaron)",
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'A referência sobre inteiros com e sem sinal, conversões e overflow, com provas e muitos exercícios.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, seções 2.2 "Integer Representations" e 2.3 "Integer Arithmetic"',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Conversor de complemento de dois',
    enunciado:
      'Escreva dois métodos: `valor(String bits)`, que interpreta uma sequência de bits em complemento de dois, e `bits(int valor, int largura)`, que faz o caminho inverso. Imprima:\n\n```text\n1101 = -3\n0111 = 7\n10000000 = -128\n-3 em 4 bits: 1101\n5 em 8 bits: 00000101\n-1 em 8 bits: 11111111\n```',
    dicas: [
      'Use a definição: com n bits, o primeiro bit vale −2ⁿ⁻¹ e os outros, as potências positivas de sempre.',
      'O peso do bit na posição i (contando da esquerda, a partir de 0) é `1 << (n - 1 - i)`.',
      'Para extrair o bit i de um `int`, use `(valor >> i) & 1`. O `>>` mantém o sinal, então funciona para negativos.',
    ],
    solucao: `public class ComplementoDeDois {
    static int valor(String bits) {
        int n = bits.length();
        int total = 0;
        for (int i = 0; i < n; i++) {
            if (bits.charAt(i) == '1') {
                int peso = 1 << (n - 1 - i);
                total += (i == 0) ? -peso : peso;
            }
        }
        return total;
    }

    static String bits(int valor, int largura) {
        StringBuilder sb = new StringBuilder();
        for (int i = largura - 1; i >= 0; i--) {
            sb.append((valor >> i) & 1);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        for (String b : new String[] {"1101", "0111", "10000000"}) {
            System.out.println(b + " = " + valor(b));
        }
        System.out.println("-3 em 4 bits: " + bits(-3, 4));
        System.out.println("5 em 8 bits: " + bits(5, 8));
        System.out.println("-1 em 8 bits: " + bits(-1, 8));
    }
}`,
    saida: '1101 = -3\n0111 = 7\n10000000 = -128\n-3 em 4 bits: 1101\n5 em 8 bits: 00000101\n-1 em 8 bits: 11111111',
    comentarios:
      'O método `bits` funciona para negativos sem nenhum caso especial: um `int` já está em complemento de dois, então basta ler os n bits de baixo. Isso é o mesmo que o cast para um tipo menor faz. E `valor` é a definição da aula escrita em Java: só o primeiro bit tem peso negativo. Teste `valor(bits(x, 8))` para x de −128 a 127 e confira que sempre volta x.',
  },
  exercicios: [
    {
      id: 'aprendiz-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quanto vale `1101` em complemento de dois com 4 bits?',
      opcoes: ['−3', '13', '−5', '−2', '3'],
      resposta: 0,
      explicacao: 'Os pesos são −8, 4, 2 e 1. Então `1101` = −8 + 4 + 1 = −3. O 13 é a leitura sem sinal; o −5 é a leitura em sinal e magnitude.',
    },
    {
      id: 'aprendiz-t3-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a faixa de valores de um `short` do Java, que tem 16 bits?',
      opcoes: ['−32.768 a 32.767', '−32.767 a 32.767', '0 a 65.535', '−65.536 a 65.535', '−32.768 a 32.768'],
      resposta: 0,
      explicacao: 'Com n bits, a faixa é −2ⁿ⁻¹ a 2ⁿ⁻¹ − 1, e 2¹⁵ = 32.768. O lado negativo tem um valor a mais porque o zero ocupa uma das combinações do lado não negativo. 0 a 65.535 é a faixa do `char`, que não tem sinal.',
    },
    {
      id: 'aprendiz-t3-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println((byte) 130);`,
      opcoes: ['`-126`', '`130`', '`126`', '`-130`', '`2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '130 não cabe num `byte`, então o cast fica com os 8 bits de baixo, `1000 0010`. Com o bit de cima valendo −128: −128 + 2 = −126. Outra conta: 130 − 256 = −126.',
    },
    {
      id: 'aprendiz-t3-e02-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(~7);
System.out.println(~-1);
System.out.println(-~5);`,
      resposta: '-8\n0\n6',
      explicacao: 'Como x + ~x = −1, ~x = −x − 1. Então ~7 = −8, ~(−1) = 0 e ~5 = −6, que negado dá 6.',
    },
    {
      id: 'aprendiz-t3-e02-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída? Trinta dias têm 2.592.000.000 milissegundos.',
      codigo: `long trintaDias = 1000 * 60 * 60 * 24 * 30;
System.out.println(trintaDias);`,
      opcoes: ['`-1702967296`', '`2592000000`', '`0`', 'Lança `ArithmeticException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A multiplicação é feita em `int`, que estoura antes de o resultado virar `long`. 2.592.000.000 − 2³² = 2.592.000.000 − 4.294.967.296 = −1.702.967.296. Com `1000L * ...` sairia o valor certo.',
    },
    {
      id: 'aprendiz-t3-e02-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais expressões valem `Integer.MIN_VALUE`? Escolha três.',
      opcoes: [
        '`Integer.MAX_VALUE + 1`',
        '`Math.abs(Integer.MIN_VALUE)`',
        '`-Integer.MIN_VALUE`',
        '`Integer.MIN_VALUE - 1`',
        '`Integer.MAX_VALUE * 2`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'executa', saida: 'true true true false false' },
      codigoVerificacao: `int m = Integer.MIN_VALUE;
System.out.println((Integer.MAX_VALUE + 1 == m) + " " + (Math.abs(m) == m) + " " + (-m == m)
        + " " + (m - 1 == m) + " " + (Integer.MAX_VALUE * 2 == m));`,
      explicacao: 'MAX + 1 dá a volta para MIN. Como +2³¹ não cabe num `int`, negar MIN dá o próprio MIN, e `Math.abs` também. MIN − 1 dá a volta para MAX, e MAX × 2 dá −2 (`0111...1` deslocado vira `1111...10`).',
    },
    {
      id: 'aprendiz-t3-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que, em complemento de dois, inverter todos os bits e somar 1 dá o negativo de um número?',
      opcoes: [
        'Porque x + ~x é um número com todos os bits 1, que vale −1; logo ~x + 1 = −x',
        'Porque inverter os bits troca o sinal e o +1 corrige o arredondamento',
        'Porque o processador tem uma instrução especial que faz isso',
        'Porque o bit de sinal precisa ser somado separadamente',
      ],
      resposta: 0,
      explicacao: 'Somando x e ~x, cada coluna tem um único 1, sem vai-um: o resultado é `111...1`. Em complemento de dois isso vale −1. De x + ~x = −1 vem ~x + 1 = −x. É álgebra, não convenção.',
    },
    {
      id: 'aprendiz-t3-e02-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o operador que calcula o meio sem estragar o resultado quando a soma estoura. O programa deve imprimir `1750000000`.',
      codigo: `public class Meio {
    public static void main(String[] args) {
        int inicio = 1_500_000_000;
        int fim = 2_000_000_000;
        int meio = (inicio + fim) ___ 1;
        System.out.println(meio);
    }
}`,
      respostas: ['>>>'],
      saida: '1750000000',
      explicacao: 'A soma estoura e vira negativa, mas os 32 bits ainda guardam 3.500.000.000 sem sinal. O `>>>` desloca pondo zero à esquerda, o que lê esses bits como positivos e divide por 2. Com `>>` o sinal seria mantido e o meio sairia negativo. É a linha que está no `Arrays.binarySearch` do JDK.',
    },
    {
      id: 'aprendiz-t3-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `System.out.println(Math.multiplyExact(100_000, 100_000));`,
      opcoes: [
        'Lança `ArithmeticException`',
        'Imprime `10000000000`',
        'Imprime `1410065408`',
        'Não compila: o literal é grande demais',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArithmeticException' },
      explicacao: '10¹⁰ não cabe num `int`. A multiplicação comum daria a volta e imprimiria 1.410.065.408 (10¹⁰ − 2 × 2³²), mas os métodos `Exact` lançam `ArithmeticException` justamente para isso não passar em silêncio.',
    },
    {
      id: 'aprendiz-t3-e02-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(-1 >>> 28);
System.out.println(-1 >> 28);
System.out.println(-9 >> 1);
System.out.println(-9 / 2);`,
      resposta: '15\n-1\n-5\n-4',
      explicacao: '−1 são 32 bits 1. Com `>>>`, entram zeros e sobram 4 uns: 15. Com `>>`, entram cópias do sinal e tudo continua 1: −1. `>> 1` divide por 2 arredondando para baixo (−4,5 vira −5), enquanto `/` arredonda para zero (−4).',
    },
    {
      id: 'aprendiz-t3-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `byte b = -1;
System.out.println(b & 0xFF);`,
      opcoes: ['`255`', '`-1`', '`0`', '`-255`', '`127`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `byte` −1 é `1111 1111`. No `&`, ele é promovido a `int` com extensão de sinal (32 uns), e a máscara `0xFF` mantém só os 8 bits de baixo: 255. É o jeito de ler um byte como número de 0 a 255.',
    },
    {
      id: 'aprendiz-t3-e02-q12',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Bytes {
    public static void main(String[] args) {
        byte a = 127;
        byte b = -128;
        byte c = (byte) 200;
        byte d = 128;
        System.out.println(a + b + c + d);
    }
}`,
      resposta: 6,
      explicacao: 'Uma constante inteira pode ser atribuída a um `byte` sem cast só se couber na faixa de −128 a 127. O 128 não cabe. Com o cast explícito, como na linha 5, o compilador aceita e descarta os bits de cima.',
    },
    {
      id: 'aprendiz-t3-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais situações a soma de dois `int` pode estourar? Escolha duas.',
      opcoes: [
        'Dois positivos cuja soma passa de 2.147.483.647',
        'Dois negativos cuja soma fica abaixo de −2.147.483.648',
        'Um positivo e um negativo',
        'Qualquer soma com zero',
        'Somar 1 a −1',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false' },
      codigoVerificacao: `int r1 = 2_000_000_000 + 2_000_000_000;
int r2 = -2_000_000_000 + -2_000_000_000;
int r3 = Integer.MAX_VALUE + Integer.MIN_VALUE;
System.out.println((r1 < 0) + " " + (r2 > 0) + " " + (r3 != -1));`,
      explicacao: 'O resultado de um positivo com um negativo fica sempre entre os dois, então cabe na faixa. Só sinais iguais podem passar do limite, e aí o resultado sai com o sinal trocado: é a regra que o `Math.addExact` testa.',
    },
    {
      id: 'aprendiz-t3-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um sistema conta o tempo ligado em **centésimos de segundo** num `int`. Depois de quanto tempo o contador estoura?',
      opcoes: ['Cerca de 248 dias', 'Cerca de 25 dias', 'Cerca de 68 anos', 'Cerca de 2 anos', 'Nunca, porque o `int` volta a zero'],
      resposta: 0,
      explicacao: '2³¹ centésimos são 21.474.836 segundos, e 21.474.836 ÷ 86.400 ≈ 248,5 dias. Foi o bug do Boeing 787. Em milissegundos, o mesmo `int` estoura em cerca de 25 dias; em segundos, em 68 anos (o problema de 2038).',
    },
    {
      id: 'aprendiz-t3-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(Integer.toUnsignedString(-2));`,
      opcoes: ['`4294967294`', '`-2`', '`4294967295`', '`2147483646`', '`65534`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '−2 é `1111...1110`. Lido sem sinal, o bit de cima vale +2³¹ em vez de −2³¹, o que soma 2³² ao valor: −2 + 4.294.967.296 = 4.294.967.294. O 4294967295 seria o −1.',
    },
  ],
};

export default episodio;
