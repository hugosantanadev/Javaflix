import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t2-e03',
  minutos: 11,
  aula,
  armadilhas: [
    '`byte + byte`, `short + char` e `char + char` resultam em `int`.',
    'Com `long` e `float` na mesma conta, o resultado é `float`.',
    '`byte c = a + b;` não compila com variáveis comuns; compila se `a` e `b` forem constantes `final` e o resultado couber.',
    '`(int) 3.99` é 3 e `(int) -3.99` é −3: o cast trunca em direção a zero.',
    'Cast de `double` grande demais para inteiro satura no limite; entre inteiros, descarta os bits de cima.',
    '`(double) 1 / 2` é 0.5, mas `(double) (1 / 2)` é 0.0.',
    '`int` para `float` e `long` para `double` compilam sem cast e podem perder precisão.',
    '`long x = Integer.MAX_VALUE * 2;` estoura em `int` antes de virar `long`.',
  ],
  ia: {
    uso:
      'A IA ajuda a montar tabelas de conversão entre tipos e a explicar por que um cast perdeu informação, com os bits na mão. Use para gerar treinos de "compila ou não compila" com tipos misturados, e confira cada resposta compilando: conversões de tipo são um terreno em que os modelos confundem regras de linguagens diferentes.',
    pedido:
      'Estou estudando promoção numérica e cast para a certificação Java (Java 21). Monte 8 linhas que misturem byte, short, char, int, long, float e double em atribuições e contas.\n- Para cada uma, eu vou dizer se compila e, se compilar, o valor.\n- Não mostre as respostas antes de eu responder.\n- Na correção, cite a regra da JLS (5.1.2, 5.1.3 ou 5.6) e mostre os bits quando houver corte.',
    erros: [
      'Diz que o cast de `double` para `int` arredonda, quando ele trunca em direção a zero.',
      'Afirma que `int` para `float` é sempre exato, porque "o float é maior".',
      'Esquece que `byte + byte` dá `int` e garante que `byte c = a + b;` compila.',
    ],
    conferir: [
      'Compile cada linha: o `javac` é quem decide o que compila.',
      'Confira o tipo de cada conta com Ctrl + Shift + P no IntelliJ.',
      'Para cortes de bits, use `Integer.toBinaryString` e compare com a explicação.',
    ],
  },
  recursos: [
    {
      titulo: 'JLS 5.6: Numeric Contexts',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.6',
      tipo: 'documentacao',
      porque: 'As regras exatas da promoção numérica, com a lista de operadores em que ela se aplica.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 5.1.2: Widening Primitive Conversion',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.2',
      tipo: 'documentacao',
      porque: 'As 19 ampliações permitidas e o aviso de que `int` para `float` pode perder precisão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 5.1.3: Narrowing Primitive Conversion',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.3',
      tipo: 'documentacao',
      porque: 'O que acontece em cada cast que reduz: truncamento, saturação e descarte de bits.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 2.11.1: Types and the Java Virtual Machine',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.11.1',
      tipo: 'documentacao',
      porque: 'A tabela que mostra que a JVM não tem instruções aritméticas para `byte`, `short` e `char`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Primitive Data Types',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html',
      tipo: 'documentacao',
      porque: 'Os tamanhos e as faixas de cada primitivo, a base para saber o que cabe onde.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Primitives Type Casting',
      url: 'https://www.baeldung.com/java-primitive-conversions',
      tipo: 'artigo',
      porque: 'Ampliação, redução, promoção e boxing, com exemplos de cada caso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #06, Tipos Primitivos e Manipulação de Dados',
      url: 'https://www.youtube.com/watch?v=JEAQeT7YGs4',
      tipo: 'video',
      porque: 'Os tipos primitivos e as conversões entre eles, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de promoção numérica do livro são cobradas quase literalmente na prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Operators": seções sobre regras de promoção numérica e casting de valores',
    },
  ],
  desafio: {
    titulo: 'Média sem armadilhas',
    enunciado:
      'Com as notas `{7, 8, 10, 6}`, calcule a média e a porcentagem de notas maiores ou iguais a 7. Mostre primeiro a média "ingênua", com divisão inteira, e depois as contas certas. Imprima:\n\n```text\nmédia errada: 7\nmédia certa: 7.75\naprovados: 75.0%\n```',
    dicas: [
      'A soma das notas é um `int`; dividir por `notas.length` (também `int`) descarta a fração.',
      'Converta **antes** de dividir: `(double) soma / notas.length`.',
      'Cuidado com a porcentagem: `aprovados / notas.length * 100` dá 0. Multiplique primeiro ou use `double`.',
    ],
    solucao: `public class Media {
    public static void main(String[] args) {
        int[] notas = {7, 8, 10, 6};
        int soma = 0;
        int aprovados = 0;
        for (int n : notas) {
            soma += n;
            if (n >= 7) {
                aprovados++;
            }
        }
        System.out.println("média errada: " + soma / notas.length);
        System.out.println("média certa: " + (double) soma / notas.length);
        System.out.println("aprovados: " + 100.0 * aprovados / notas.length + "%");
    }
}`,
    saida: 'média errada: 7\nmédia certa: 7.75\naprovados: 75.0%',
    comentarios:
      'São dois erros clássicos de relatório: a média truncada e a porcentagem que dá zero, porque 3 / 4 em inteiros é 0 antes de multiplicar por 100. Começar a conta com `100.0` promove tudo para `double` desde o primeiro passo. Os parênteses em `(double) soma / notas.length` não são necessários: o cast tem precedência maior que a divisão.',
  },
  bugs: [
    {
      id: 'estagiario-t2-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: possible lossy conversion from int to byte`.',
      codigo: `public class Estoque {
    public static void main(String[] args) {
        byte loja = 40;
        byte deposito = 25;
        byte total = loja + deposito;
        System.out.println("Total: " + total);
    }
}`,
      linha: 5,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Estoque {
    public static void main(String[] args) {
        byte loja = 40;
        byte deposito = 25;
        int total = loja + deposito;
        System.out.println("Total: " + total);
    }
}`,
      saidaCorrigida: 'Total: 65',
      dica: 'Os dois valores são `byte`. De que tipo é a soma deles?',
      explicacao: 'Em toda conta, `byte`, `short` e `char` viram `int`. A soma de dois `byte` é um `int`, que não entra num `byte` sem cast. Guardar o total num `int` resolve e ainda evita estouro se o estoque crescer.',
    },
    {
      id: 'estagiario-t2-e03-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: possible lossy conversion from double to int`.',
      codigo: `public class Cronometro {
    public static void main(String[] args) {
        double minutos = 3.5;
        int segundos = minutos * 60;
        System.out.println(segundos + " segundos");
    }
}`,
      linha: 4,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Cronometro {
    public static void main(String[] args) {
        double minutos = 3.5;
        int segundos = (int) (minutos * 60);
        System.out.println(segundos + " segundos");
    }
}`,
      saidaCorrigida: '210 segundos',
      dica: 'Um operando é `double`. Qual é o tipo do resultado, e ele cabe numa variável `int`?',
      explicacao: 'Com um `double` na conta, o resultado é `double`, e ir para `int` pode perder a parte decimal. O compilador exige que você assuma o risco com um cast. Os parênteses fazem o cast valer para a conta inteira, e não só para `minutos`.',
    },
    {
      id: 'estagiario-t2-e03-b03',
      dificuldade: 3,
      sintoma: 'Imprime `Milissegundos em 30 dias: -1702967296`, um número negativo.',
      codigo: `public class Prazo {
    public static void main(String[] args) {
        long ms = 1000 * 60 * 60 * 24 * 30;
        System.out.println("Milissegundos em 30 dias: " + ms);
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: 'Milissegundos em 30 dias: -1702967296' },
      correcao: `public class Prazo {
    public static void main(String[] args) {
        long ms = 1000L * 60 * 60 * 24 * 30;
        System.out.println("Milissegundos em 30 dias: " + ms);
    }
}`,
      saidaCorrigida: 'Milissegundos em 30 dias: 2592000000',
      dica: 'A variável é `long`, mas de que tipo são os números que estão sendo multiplicados?',
      explicacao: 'A conta é feita em `int`, porque todos os literais são `int`, e estoura antes de chegar ao `long`. Só o resultado já errado é convertido. Com `1000L`, a primeira multiplicação já é `long`, e todas as seguintes também.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t2-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o tipo do resultado de `b1 + b2`, quando `b1` e `b2` são `byte`?',
      opcoes: ['`int`', '`byte`', '`short`', '`long`'],
      resposta: 0,
      explicacao: 'Na promoção numérica, operandos `byte`, `short` e `char` viram `int` antes da operação. Por isso o resultado de somar dois `byte` precisa de cast para voltar a ser `byte`.',
      dica: 'Lembre a regra 4 da promoção: o que acontece com `byte`, `short` e `char` em qualquer conta?',
    },
    {
      id: 'estagiario-t2-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `short s = 10;
char c = 'a';
System.out.println(s + c);`,
      opcoes: ['`107`', '`10a`', '`k`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Não há `String`, então é aritmética: os dois viram `int`, e 10 + 97 = 107. O resultado é `int`, por isso o `println` mostra o número e não um caractere.',
      dica: '`short` mais `char` é conta, não concatenação. Qual é o código de `\'a\'`?',
    },
    {
      id: 'estagiario-t2-e03-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`byte b = 10;`',
        '`byte b = 10; b = b + 1;`',
        '`final byte x = 1; byte b = x + 2;`',
        '`int i = 5; byte b = i;`',
        '`char c = 65;`',
      ],
      respostas: [0, 2, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Constantes que cabem no tipo podem ser atribuídas a `byte`, `short` e `char` sem cast, e `x + 2` com `x` final constante é uma constante que vale 3. Já `b + 1` e a variável `i` não são constantes: atribuir `int` a `byte` exige cast.',
      dica: 'Uma variável comum não pode ir para `byte` sem cast; uma constante `final` que cabe, pode.',
    },
    {
      id: 'estagiario-t2-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println((byte) 200 + (short) 70000);`,
      opcoes: ['`4408`', '`70200`', '`-56`', '`4464`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada cast se aplica só ao seu literal. 200 em 8 bits vale −56; 70.000 em 16 bits vale 70.000 − 65.536 = 4.464. A soma é feita em `int`: −56 + 4.464 = 4.408.',
      dica: 'Calcule cada cast separadamente: 200 em 8 bits e 70.000 em 16 bits. Depois some.',
    },
    {
      id: 'estagiario-t2-e03-q05',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println((char) ('a' + 1));
System.out.println('a' + 1);
System.out.println((int) -7.9);
System.out.println((long) 2.5e10);`,
      resposta: 'b\n98\n-7\n25000000000',
      explicacao: 'A primeira converte o `int` 98 de volta para `char`: b. A segunda fica `int`: 98. O cast de −7.9 trunca em direção a zero: −7. E 2,5 × 10¹⁰ cabe num `long`, então o cast é exato.',
      dica: 'O cast vale só para o que vem logo depois dele. E de `double` para inteiro, ele trunca em direção a zero.',
    },
    {
      id: 'estagiario-t2-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `float f = 123456789;
System.out.println((int) f == 123456789);`,
      opcoes: ['`false`', '`true`', 'Não compila: `int` não vai para `float` sem cast', 'Lança `ArithmeticException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`int` para `float` é uma ampliação e compila sem cast, mas o `float` só tem 24 bits de precisão: 123.456.789 é guardado como 123.456.792. Voltando para `int`, o valor já é outro.',
      dica: 'O `float` guarda uns 7 dígitos significativos. 123.456.789 tem quantos?',
    },
    {
      id: 'estagiario-t2-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `double r = (double) 1 / 2 + (double) (1 / 2);
System.out.println(r);`,
      opcoes: ['`0.5`', '`1.0`', '`0.0`', '`1`', '`0.25`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No primeiro termo, o cast converte o 1 antes da divisão: 0.5. No segundo, os parênteses fazem a divisão inteira primeiro (0) e só depois convertem: 0.0. Soma: 0.5.',
      dica: 'Na primeira parte, o cast vem antes da divisão; na segunda, depois. Calcule as duas separadamente.',
    },
    {
      id: 'estagiario-t2-e03-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o cast para que a média saia com casas decimais. O programa deve imprimir `7.5`.',
      codigo: `public class MediaDeDois {
    public static void main(String[] args) {
        int a = 7, b = 8;
        double media = (___) (a + b) / 2;
        System.out.println(media);
    }
}`,
      respostas: ['double', 'float'],
      saida: '7.5',
      explicacao: 'O cast converte a soma (15) antes da divisão, então a divisão é de ponto flutuante: 7.5. Sem o cast, 15 / 2 seria 7, e o `double` receberia 7.0.',
      dica: 'Converta antes de dividir, senão a divisão inteira já cortou a parte decimal.',
    },
    {
      id: 'estagiario-t2-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual destas atribuições **exige** um cast explícito para compilar?',
      opcoes: ['`int i = 3L;`', '`double d = 3L;`', '`long l = \'a\';`', '`float f = 100L;`', '`int i = \'z\';`'],
      resposta: 0,
      explicacao: '`long` para `int` é uma redução: o literal `3L` é `long`, e o compilador não reduz sem cast, mesmo que o valor caiba (a regra das constantes vale para `byte`, `short` e `char`, e não para `long`). As outras são ampliações.',
      dica: 'Siga as setas da ampliação: qual atribuição vai no sentido contrário?',
    },
    {
      id: 'estagiario-t2-e03-q10',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Conversoes {
    public static void main(String[] args) {
        long a = 100;
        float b = a;
        double c = b;
        int d = c;
        System.out.println(a + b + c);
    }
}`,
      resposta: 6,
      explicacao: '`long` para `float` e `float` para `double` são ampliações automáticas. `double` para `int` é redução e exige `(int)`.',
      dica: 'Percorra as linhas: em qual delas um tipo maior vai para um menor sem cast?',
    },
    {
      id: 'estagiario-t2-e03-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println((long) 1e19 == Long.MAX_VALUE);`,
      opcoes: ['`true`', '`false`', 'Lança `ArithmeticException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '10¹⁹ passa do maior `long` (cerca de 9,2 × 10¹⁸). O cast de ponto flutuante para inteiro não dá a volta: satura no limite. Entre inteiros, ao contrário, os bits de cima seriam descartados.',
      dica: 'Um `double` grande demais para `long` não dá a volta: ele satura num valor específico.',
    },
    {
      id: 'estagiario-t2-e03-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = 7, y = 2;
System.out.println(x / y * y);
System.out.println(x / (double) y * y);`,
      resposta: '6\n7.0',
      explicacao: 'Na primeira, 7 / 2 = 3 em inteiros, e 3 · 2 = 6: a fração perdida não volta. Na segunda, o cast faz a divisão em `double` (3.5), e 3.5 · 2 = 7.0.',
      dica: 'Na primeira linha, tudo é `int`; na segunda, o `double` aparece antes da multiplicação.',
    },
    {
      id: 'estagiario-t2-e03-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `long l = Integer.MAX_VALUE * 2;
System.out.println(l);`,
      opcoes: ['`-2`', '`4294967294`', 'Não compila', '`0`', '`2147483647`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A multiplicação é entre dois `int` e estoura antes de virar `long`: (2³¹ − 1) · 2 = 2³² − 2, que em 32 bits é −2. Com `Integer.MAX_VALUE * 2L`, sairia 4294967294.',
      dica: 'A multiplicação acontece em `int` antes de virar `long`. O que acontece com o maior `int` vezes 2?',
    },
    {
      id: 'estagiario-t2-e03-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais expressões resultam num valor do tipo `double`? Escolha duas.',
      opcoes: ['`1 + 2.0`', '`\'a\' * 1.5`', '`10L / 4`', '`3f * 2`', '`(int) 2.5 + 1`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'Double Double Long Float Integer' },
      codigoVerificacao: `Object[] v = {1 + 2.0, 'a' * 1.5, 10L / 4, 3f * 2, (int) 2.5 + 1};
StringJoiner sj = new StringJoiner(" ");
for (Object o : v) sj.add(o.getClass().getSimpleName());
System.out.println(sj);`,
      explicacao: 'Um literal com ponto e sem sufixo é `double`, e ele promove o outro lado. `10L / 4` é `long` (2), `3f * 2` é `float`, e `(int) 2.5 + 1` é `int`: o cast vale só para o 2.5.',
      dica: 'O resultado é `double` quando algum operando é `double`.',
    },
    {
      id: 'estagiario-t2-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o Java promove `byte`, `short` e `char` para `int` em toda operação aritmética?',
      opcoes: [
        'Porque a JVM só tem instruções aritméticas para `int`, `long`, `float` e `double`; esses tipos menores viram `int` na pilha de operandos',
        'Porque `byte` não pode ser negativo',
        'Para evitar que o programa use memória demais',
        'Porque o processador não sabe somar números pequenos',
      ],
      resposta: 0,
      explicacao: 'Não existe `badd` nem `sadd` no bytecode: a soma de dois `byte` é um `iadd`. A linguagem reflete isso na promoção numérica. Os tipos menores economizam espaço em campos e arrays, não nas contas.',
      dica: 'Pense nas instruções que a JVM tem para somar: existe uma para `byte`?',
    },
  ],
};

export default episodio;
