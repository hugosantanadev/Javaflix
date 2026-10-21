import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t3-e03',
  minutos: 15,
  aula,
  armadilhas: [
    '0,1, 0,2 e 0,3 não têm representação exata em binário; 0,5, 0,25 e 0,375 têm.',
    'Divisão de `double` por zero não lança exceção: dá `Infinity`, `-Infinity` ou `NaN`.',
    '`NaN == NaN` é `false`. Teste com `Double.isNaN`.',
    '`Double.MIN_VALUE` é o menor número **positivo**, não o mais negativo.',
    '`(int) -3.99` é −3: o cast trunca em direção a zero. Valores grandes demais saturam em `Integer.MAX_VALUE`.',
    '`Math.round(-2.5)` é −2: os empates vão para +∞.',
    '`new BigDecimal(0.1)` herda o erro do `double`. Use `new BigDecimal("0.1")`.',
    '`BigDecimal.equals` considera a escala (`2.50` ≠ `2.5`); para comparar valores, use `compareTo`.',
  ],
  recursos: [
    {
      titulo: 'JLS 4.2.3: Floating-Point Types, Formats, and Values',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2.3',
      tipo: 'documentacao',
      porque: 'Como o Java define `float` e `double` em cima do IEEE 754, com zeros com sinal, infinitos e NaN.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Double: Floating-point Equality, Equivalence, and Comparison',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Double.html#equivalenceRelation',
      tipo: 'documentacao',
      porque: 'Por que `==` e `equals` discordam sobre NaN e sobre −0,0, explicado pela própria documentação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de BigDecimal',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html',
      tipo: 'documentacao',
      porque: 'Escala, precisão e modos de arredondamento, com a diferença entre `equals` e `compareTo` documentada.',
      gratuito: true,
      idioma: 'en',
      onde: 'Introdução da classe e os métodos divide, setScale e compareTo',
    },
    {
      titulo: 'Microsoft Learn: Representação de ponto flutuante IEEE',
      url: 'https://learn.microsoft.com/pt-br/cpp/build/ieee-floating-point-representation?view=msvc-170',
      tipo: 'documentacao',
      porque: 'Os campos de sinal, expoente e mantissa do `float` e do `double`, com exemplos em hexadecimal, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'JEP 306: Restore Always-Strict Floating-Point Semantics',
      url: 'https://openjdk.org/jeps/306',
      tipo: 'documentacao',
      porque: 'A história do `strictfp` e por que, desde o Java 17, toda conta de ponto flutuante dá o mesmo resultado em qualquer máquina.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Python: Aritmética de ponto flutuante, problemas e limitações',
      url: 'https://docs.python.org/pt-br/3/tutorial/floatingpoint.html',
      tipo: 'artigo',
      porque: 'Uma das melhores explicações curtas do assunto, em português. Os exemplos são em Python, mas o `float` dele é o mesmo `double` do Java.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'The Floating-Point Guide',
      url: 'https://floating-point-gui.de/',
      tipo: 'artigo',
      porque: 'O guia prático para programadores: comparação com tolerância, tipos decimais e erros comuns.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'What Every Computer Scientist Should Know About Floating-Point Arithmetic (David Goldberg)',
      url: 'https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html',
      tipo: 'artigo',
      porque: 'O artigo clássico de 1991, hospedado pela Oracle. Denso, com as provas de por que os erros de arredondamento se comportam como se comportam.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Computerphile: Floating Point Numbers',
      url: 'https://www.youtube.com/watch?v=PZRI1IfStY0',
      tipo: 'video',
      porque: 'Tom Scott explica, com papel e caneta, por que o computador não consegue guardar 0,1.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Professor Pantoja: Arquitetura de Computadores, IEEE 754',
      url: 'https://www.youtube.com/watch?v=ealNNf7lGoU',
      tipo: 'video',
      porque: 'Conversões de decimal para IEEE 754 e de volta, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'IEEE-754 Floating Point Converter',
      url: 'https://www.h-schmidt.net/FloatConverter/IEEE754.html',
      tipo: 'ferramenta',
      porque: 'Ligue e desligue cada bit de um `float` e veja o valor mudar, com o erro de conversão calculado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Computer Systems: A Programmer's Perspective (Bryant e O'Hallaron)",
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'O IEEE 754 do ponto de vista de quem programa, com arredondamento, subnormais e exercícios.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, seção 2.4 "Floating Point"',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Decodificador de float',
    enunciado:
      'Escreva o método `decodificar(float x)`, que extrai com operações de bits o sinal, o expoente e a fração de um `float`, reconstrói o valor pela fórmula do IEEE 754 e imprime tudo. Rode com `0.15625f`, `-6.5f` e `0.1f`:\n\n```text\n0.15625: sinal=0 expoente=124 (2^-3) fração=2097152 -> 0.15625\n-6.5: sinal=1 expoente=129 (2^2) fração=5242880 -> -6.5\n0.1: sinal=0 expoente=123 (2^-4) fração=5033165 -> 0.10000000149011612\n```',
    dicas: [
      '`Float.floatToIntBits(x)` devolve os 32 bits num `int`.',
      'O sinal é o bit 31 (`bits >>> 31`); o expoente são os 8 bits seguintes (`(bits >>> 23) & 0xFF`); a fração são os 23 de baixo (`bits & 0x7FFFFF`).',
      'Com 23 bits de fração, o valor é `(1 + fracao / 2²³) × 2^(expoente − 127)`. 2²³ = 8.388.608.',
    ],
    solucao: `public class DecodificaFloat {
    static void decodificar(float x) {
        int bits = Float.floatToIntBits(x);
        int sinal = bits >>> 31;
        int expoente = (bits >>> 23) & 0xFF;
        int fracao = bits & 0x7FFFFF;
        double valor = (1 + fracao / 8388608.0) * Math.pow(2, expoente - 127);
        if (sinal == 1) {
            valor = -valor;
        }
        System.out.println(x + ": sinal=" + sinal + " expoente=" + expoente
                + " (2^" + (expoente - 127) + ") fração=" + fracao + " -> " + valor);
    }

    public static void main(String[] args) {
        decodificar(0.15625f);
        decodificar(-6.5f);
        decodificar(0.1f);
    }
}`,
    saida: '0.15625: sinal=0 expoente=124 (2^-3) fração=2097152 -> 0.15625\n-6.5: sinal=1 expoente=129 (2^2) fração=5242880 -> -6.5\n0.1: sinal=0 expoente=123 (2^-4) fração=5033165 -> 0.10000000149011612',
    comentarios:
      'A última linha mostra o que o `float` guarda de fato quando você escreve `0.1f`: 0,100000001490116..., o número representável mais próximo. O `Float.toString` imprime `0.1` porque escolhe o decimal mais curto que identifica aquele `float` sem ambiguidade. O decodificador não trata os casos especiais (expoente 0 ou 255): acrescente os subnormais, os infinitos e o NaN como exercício extra.',
  },
  exercicios: [
    {
      id: 'aprendiz-t3-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantos bits um `double` usa para o expoente e para a fração?',
      opcoes: ['11 e 52', '8 e 23', '11 e 53', '16 e 47', '10 e 53'],
      resposta: 0,
      explicacao: 'O `double` tem 64 bits: 1 de sinal, 11 de expoente e 52 de fração. Com o bit implícito, a precisão é de 53 bits. 8 e 23 são os campos do `float`.',
    },
    {
      id: 'aprendiz-t3-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Que valor representa o `float` com os bits `0 10000000 10000000000000000000000`?',
      opcoes: ['3,0', '1,5', '2,5', '6,0', '−3,0'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '3.0' },
      codigoVerificacao: `System.out.println(Float.intBitsToFloat(0b0_10000000_10000000000000000000000));`,
      explicacao: 'Sinal 0, positivo. Expoente 128 − 127 = 1. Fração `1` seguida de zeros, com o bit implícito: 1,1 em binário, que é 1,5. Então 1,5 × 2¹ = 3,0.',
    },
    {
      id: 'aprendiz-t3-e03-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais valores têm representação **exata** num `double`? Escolha três.',
      opcoes: ['0,5', '0,75', '0,375', '0,1', '0,2', '1/3'],
      respostas: [0, 1, 2],
      verificar: { tipo: 'executa', saida: '0.5 0.75 0.375 false false' },
      codigoVerificacao: `System.out.println(new BigDecimal(0.5) + " " + new BigDecimal(0.75) + " " + new BigDecimal(0.375)
        + " " + new BigDecimal(0.1).equals(new BigDecimal("0.1"))
        + " " + new BigDecimal(0.2).equals(new BigDecimal("0.2")));`,
      explicacao: '0,5 = 1/2, 0,75 = 3/4 e 0,375 = 3/8: denominadores que são potências de 2. 0,1 = 1/10 e 0,2 = 1/5 têm o fator 5 no denominador e viram dízimas em binário. 1/3 não é exato nem em decimal.',
    },
    {
      id: 'aprendiz-t3-e03-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `double a = 0;
for (int i = 0; i < 4; i++) a += 0.25;
double b = 0;
for (int i = 0; i < 10; i++) b += 0.1;
System.out.println(a == 1.0);
System.out.println(b == 1.0);`,
      resposta: 'true\nfalse',
      explicacao: '0,25 é 2⁻², exato em binário, e as somas parciais (0,5; 0,75; 1,0) também são exatas. Já cada 0,1 carrega um erro, que se acumula até 0,9999999999999999.',
    },
    {
      id: 'aprendiz-t3-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `double x = Double.NaN;
System.out.println((x == x) + " " + Double.isNaN(x) + " " + Double.valueOf(x).equals(x));`,
      opcoes: ['`false true true`', '`true true true`', '`false true false`', '`false false false`', '`true false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Pelo IEEE 754, NaN é diferente de tudo, até de si mesmo, então `x == x` é falso. Já `equals` compara os bits, e aí NaN é igual a NaN; é isso que permite usar `Double` como chave de um `HashMap`.',
    },
    {
      id: 'aprendiz-t3-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(1 / 0.0 + " " + -1 / 0.0 + " " + 1 / -0.0);`,
      opcoes: [
        '`Infinity -Infinity -Infinity`',
        '`Infinity -Infinity Infinity`',
        '`NaN -Infinity NaN`',
        'Lança `ArithmeticException`',
        '`Infinity Infinity Infinity`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com um operando `double`, a divisão segue o IEEE 754 e não lança exceção. O zero negativo existe e guarda o sinal: 1 ÷ (−0,0) é −∞. Só a divisão de inteiros por zero lança `ArithmeticException`.',
    },
    {
      id: 'aprendiz-t3-e03-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é `Double.MIN_VALUE`?',
      opcoes: [
        'O menor `double` positivo, cerca de 4,9 × 10⁻³²⁴',
        'O `double` mais negativo que existe',
        'Zero',
        'O mesmo que `Long.MIN_VALUE`, convertido para `double`',
      ],
      resposta: 0,
      explicacao: 'Ao contrário de `Integer.MIN_VALUE`, o `MIN_VALUE` dos tipos de ponto flutuante é o menor valor positivo, um subnormal. O `double` mais negativo é `-Double.MAX_VALUE`.',
    },
    {
      id: 'aprendiz-t3-e03-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para comparar a soma com 1,0 usando uma tolerância. O programa deve imprimir `true`.',
      codigo: `public class Tolerancia {
    public static void main(String[] args) {
        double soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += 0.1;
        }
        System.out.println(Math.___(soma - 1.0) < 1e-9);
    }
}`,
      respostas: ['abs'],
      saida: 'true',
      explicacao: 'A diferença pode ser positiva ou negativa; o que importa é o tamanho dela. `Math.abs(a - b) < tolerância` é o jeito certo de comparar resultados de contas com ponto flutuante.',
    },
    {
      id: 'aprendiz-t3-e03-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println((int) -7.9);
System.out.println(Math.round(-7.5));
System.out.println(Math.floor(-7.5));
System.out.println((int) 1e10);`,
      resposta: '-7\n-7\n-8.0\n2147483647',
      explicacao: 'O cast trunca em direção a zero: −7. `Math.round` manda o empate para +∞: −7. `Math.floor` vai para −∞ e devolve `double`: −8.0. E 10¹⁰ não cabe num `int`, então o cast satura em `Integer.MAX_VALUE`.',
    },
    {
      id: 'aprendiz-t3-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(new BigDecimal("2.0").equals(new BigDecimal("2.00")));`,
      opcoes: ['`false`', '`true`', 'Lança `ArithmeticException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um `BigDecimal` é um valor mais uma escala, e `equals` compara os dois: 2,0 tem escala 1 e 2,00 tem escala 2. Para comparar só o valor, use `compareTo(...) == 0`.',
    },
    {
      id: 'aprendiz-t3-e03-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `BigDecimal um = new BigDecimal("1");
System.out.println(um.divide(new BigDecimal("3")));`,
      opcoes: [
        'Lança `ArithmeticException`',
        'Imprime `0.3333333333333333`',
        'Imprime `0.33`',
        'Imprime `0`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArithmeticException' },
      explicacao: 'Sem escala nem modo de arredondamento, `divide` tenta o resultado exato. 1/3 é uma dízima infinita em decimal, então ele lança `ArithmeticException`. Informe a escala: `divide(tres, 2, RoundingMode.HALF_EVEN)`.',
    },
    {
      id: 'aprendiz-t3-e03-q12',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Literais {
    public static void main(String[] args) {
        double a = 3.14;
        float b = 3.14f;
        float c = 3.14;
        double d = 3.14f;
        System.out.println(a + b + c + d);
    }
}`,
      resposta: 5,
      explicacao: 'Um literal com ponto é `double` por padrão. Atribuir `double` a `float` perde precisão, então exige o sufixo `f` ou um cast. O contrário, `float` para `double`, é uma ampliação e compila.',
    },
    {
      id: 'aprendiz-t3-e03-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Todo valor `int` pode ser guardado num `double` sem perda',
        '`0.1 + 0.2 == 0.3` é `false`',
        'Todo valor `long` pode ser guardado num `double` sem perda',
        'A soma de `double` é associativa: `(a + b) + c == a + (b + c)`',
        'Dividir um `double` por zero lança `ArithmeticException`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true false false false' },
      codigoVerificacao: `int m = Integer.MAX_VALUE;
long grande = (1L << 53) + 1;
System.out.println(((int) (double) m == m) + " " + (0.1 + 0.2 == 0.3)
        + " " + ((long) (double) grande == grande)
        + " " + ((0.1 + 0.2) + 0.3 == 0.1 + (0.2 + 0.3)));`,
      explicacao: 'Um `int` tem 32 bits e o `double` tem 53 de precisão: cabe. Um `long` tem 64, e a partir de 2⁵³ começam a faltar valores. A soma não é associativa porque cada passo arredonda, e a divisão por zero em ponto flutuante dá infinito.',
    },
    {
      id: 'aprendiz-t3-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Até qual valor **todos** os inteiros positivos têm representação exata num `float`?',
      opcoes: ['2²⁴ = 16.777.216', '2²³ = 8.388.608', '2³¹ − 1', '2³²', '2⁵³'],
      resposta: 0,
      explicacao: 'O `float` tem 23 bits de fração mais o implícito: 24 bits de precisão. Até 2²⁴, o espaçamento entre floats vizinhos é no máximo 1; depois passa a ser 2, e 16.777.217 já não existe. Para `double`, o limite é 2⁵³.',
    },
    {
      id: 'aprendiz-t3-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num sistema de pagamentos, qual é a forma adequada de guardar valores em reais?',
      opcoes: [
        '`BigDecimal` criado a partir de `String`, ou centavos num `long`',
        '`double`, arredondando com `Math.round` na hora de mostrar',
        '`float`, para economizar memória',
        '`BigDecimal` criado com `new BigDecimal(19.90)`',
      ],
      resposta: 0,
      explicacao: 'Dinheiro exige exatidão decimal. `double` e `float` acumulam erros binários, e arredondar só na exibição não conserta somas erradas. `new BigDecimal(19.90)` recebe o `double` já errado; a versão com `String` guarda exatamente 19,90.',
    },
  ],
};

export default episodio;
