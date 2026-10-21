import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t2-e01',
  minutos: 10,
  aula,
  armadilhas: [
    '`int / int` descarta a fração: `7 / 2` é 3, e `-7 / 2` é −3 (arredonda em direção a zero).',
    'O resto tem o sinal do dividendo: `-7 % 3` é −1 e `7 % -3` é 1.',
    'Divisão inteira por zero compila e lança `ArithmeticException`; com `double`, dá `Infinity` ou `NaN`.',
    '`*`, `/` e `%` têm a mesma precedência e são resolvidos da esquerda para a direita.',
    'Precedência não muda a ordem de avaliação: os operandos são calculados da esquerda para a direita.',
    '`1 + 2 + "3"` é `"33"`, mas `"1" + 2 + 3` é `"123"`.',
    '`char + char` é soma de números: `\'a\' + \'b\'` é 195.',
    'Concatenar `null` com `String` dá `"null"`, sem exceção.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Operators',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html',
      tipo: 'documentacao',
      porque: 'A tabela oficial de precedência, do mais alto para o mais baixo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Assignment, Arithmetic, and Unary Operators',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op1.html',
      tipo: 'documentacao',
      porque: 'Os operadores aritméticos com exemplos, incluindo o `+` de concatenação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.7: Evaluation Order',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.7',
      tipo: 'documentacao',
      porque: 'A regra que garante a avaliação da esquerda para a direita, com exemplos da própria especificação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.17: Multiplicative Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17',
      tipo: 'documentacao',
      porque: 'Divisão inteira, resto com sinal e divisão por zero, para inteiros e ponto flutuante.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 15.18.1: String Concatenation Operator +',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.18.1',
      tipo: 'documentacao',
      porque: 'Quando o `+` concatena e como cada tipo vira texto, inclusive `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 280: Indify String Concatenation',
      url: 'https://openjdk.org/jeps/280',
      tipo: 'documentacao',
      porque: 'Por que, desde o Java 9, a concatenação virou `invokedynamic` em vez de `StringBuilder`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Using Operators in Your Programs',
      url: 'https://dev.java/learn/language/constructs/basics/using-operators/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre operadores, com precedência e exemplos executáveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #07, Operadores Aritméticos e Classe Math',
      url: 'https://www.youtube.com/watch?v=W9V5wtOOZHs',
      tipo: 'video',
      porque: 'Os operadores aritméticos e a precedência explicados do zero, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro de referência para a prova, com a tabela de precedência e dezenas de questões no estilo da Oracle.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Operators": seções sobre ordem de precedência e operadores aritméticos',
    },
    {
      titulo: 'Think Java, 2ª edição (Downey e Mayfield)',
      url: 'https://greenteapress.com/wp/think-java-2e/',
      tipo: 'livro',
      porque: 'Livro gratuito para iniciantes, com operadores e ordem das operações explicados com calma.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 2, "Variables and Operators", seções sobre operadores e ordem das operações',
    },
  ],
  desafio: {
    titulo: 'Troco em notas',
    enunciado:
      'Dado um valor inteiro em reais, calcule quantas notas de 100, 50, 20, 10, 5 e 2 e quantas moedas de 1 são necessárias, usando só `/` e `%` (sem laços sobre o valor). Para 389 reais, imprima:\n\n```text\n100: 3\n50: 1\n20: 1\n10: 1\n5: 1\n2: 2\n1: 0\n```',
    dicas: [
      'Quantas notas de 100 cabem: `valor / 100`. O que sobra: `valor % 100`.',
      'Guarde as notas num array e repita a mesma conta para cada uma.',
    ],
    solucao: `public class Troco {
    public static void main(String[] args) {
        int valor = 389;
        int[] notas = {100, 50, 20, 10, 5, 2, 1};
        for (int nota : notas) {
            System.out.println(nota + ": " + valor / nota);
            valor = valor % nota;
        }
    }
}`,
    saida: '100: 3\n50: 1\n20: 1\n10: 1\n5: 1\n2: 2\n1: 0',
    comentarios:
      'A divisão inteira diz quantas notas cabem, e o resto é o que falta pagar. É o algoritmo guloso do troco, que funciona para o sistema de notas do real porque cada nota é "grande o bastante" em relação às menores. Com notas de 1, 3 e 4, ele falharia para 6 (daria 4 + 1 + 1, quando 3 + 3 usa menos notas).',
  },
  exercicios: [
    {
      id: 'estagiario-t2-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(10 / 4);`,
      opcoes: ['`2`', '`2.5`', '`3`', '`2.0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os dois operandos são `int`, então a divisão é inteira e descarta o 0,5. Para obter 2.5, pelo menos um lado precisa ser `double`: `10 / 4.0`.',
    },
    {
      id: 'estagiario-t2-e01-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(1 + 2 + "3" + 4 + 5);`,
      opcoes: ['`3345`', '`12345`', '`339`', '`3312`', '`15`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Da esquerda para a direita: `1 + 2` é 3 (dois `int`); `3 + "3"` é `"33"`; a partir daí tudo é concatenação: `"334"`, `"3345"`.',
    },
    {
      id: 'estagiario-t2-e01-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(-17 % 5);
System.out.println(17 % -5);
System.out.println(-17 / 5);`,
      resposta: '-2\n2\n-3',
      explicacao: 'O resto tem o sinal do dividendo: −17 % 5 é −2 e 17 % −5 é 2. A divisão arredonda −3,4 em direção a zero: −3. A identidade (a / b) * b + a % b == a sempre vale: (−3) · 5 + (−2) = −17.',
    },
    {
      id: 'estagiario-t2-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(2 + 3 * 4 % 5 - 1);`,
      opcoes: ['`3`', '`4`', '`9`', '`0`', '`13`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`*` e `%` vêm primeiro, da esquerda para a direita: 3 * 4 = 12, 12 % 5 = 2. Depois a soma e a subtração: 2 + 2 − 1 = 3.',
    },
    {
      id: 'estagiario-t2-e01-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Avaliacao {
    static int f(int x) {
        System.out.print(x);
        return x;
    }

    public static void main(String[] args) {
        int r = f(1) + f(2) * f(3) - f(4);
        System.out.println(" " + r);
    }
}`,
      opcoes: ['`1234 3`', '`2314 3`', '`1234 -3`', '`2341 3`', '`1234 5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os operandos são avaliados da esquerda para a direita, então os métodos imprimem 1, 2, 3, 4 nessa ordem. Só depois os operadores são aplicados conforme a precedência: 1 + (2 · 3) − 4 = 3. Quem acha que a multiplicação "roda primeiro" responde 2314.',
    },
    {
      id: 'estagiario-t2-e01-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais linhas **não** compilam? Escolha duas.',
      opcoes: [
        '`String s = "a" - "b";`',
        '`int x = "5" * 2;`',
        '`String t = 5 + "";`',
        '`String u = \'a\' + "";`',
        '`int y = \'a\' * 2;`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Só `+` (e `+=`) aceita `String`. `5 + ""` e `\'a\' + ""` concatenam e produzem `String`. `\'a\' * 2` é aritmética com `char`, que é numérico: 194.',
    },
    {
      id: 'estagiario-t2-e01-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println('A' + 1);`,
      opcoes: ['`66`', '`B`', '`A1`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Não há `String` na expressão, então é aritmética: o `char` \'A\' vale 65, e 65 + 1 = 66, um `int`. Para imprimir `B`, seria preciso converter de volta: `(char) (\'A\' + 1)`.',
    },
    {
      id: 'estagiario-t2-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com um operador para o programa imprimir `20`.',
      codigo: `public class Parenteses {
    public static void main(String[] args) {
        int r = (2 ___ 3) * 4;
        System.out.println(r);
    }
}`,
      respostas: ['+'],
      saida: '20',
      explicacao: 'Os parênteses forçam a soma antes da multiplicação: (2 + 3) * 4 = 20. Sem eles, `2 + 3 * 4` daria 14.',
    },
    {
      id: 'estagiario-t2-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `int a = 10, b = 0;
System.out.println(a / b);`,
      opcoes: [
        'Lança `ArithmeticException`',
        'Imprime `Infinity`',
        'Imprime `0`',
        'Não compila: divisão por zero',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArithmeticException' },
      explicacao: 'Com dois `int`, a divisão é inteira, e dividir um inteiro por zero lança `ArithmeticException` ("/ by zero"). O compilador não verifica valores de variáveis. `Infinity` só aparece com ponto flutuante.',
    },
    {
      id: 'estagiario-t2-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(10.0 / 0 + " " + 0.0 / 0);`,
      opcoes: ['`Infinity NaN`', 'Lança `ArithmeticException`', '`Infinity Infinity`', '`NaN NaN`', '`0.0 NaN`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com um operando `double`, a divisão segue o IEEE 754: um número positivo dividido por zero é infinito, e zero dividido por zero é indefinido, NaN. Nenhuma exceção.',
    },
    {
      id: 'estagiario-t2-e01-q11',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Conta {
    public static void main(String[] args) {
        int a = 7;
        double b = a / 2;
        int c = a % 2;
        int d = a / 2.0;
        System.out.println(b + c + d);
    }
}`,
      resposta: 6,
      explicacao: '`a / 2.0` é `double`, e atribuir `double` a `int` exige cast. A linha 4 compila: `a / 2` é o `int` 3, ampliado para 3.0 na atribuição. É uma pegadinha clássica: o resultado não é 3.5.',
    },
    {
      id: 'estagiario-t2-e01-q12',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `String nome = null;
int x = 2, y = 3;
System.out.println(nome + x + y);
System.out.println(x + y + nome);`,
      resposta: 'null23\n5null',
      explicacao: 'Na primeira linha, `nome + x` já é concatenação (`"null2"`), e o `y` é concatenado em seguida. Na segunda, `x + y` é a soma 5, e só depois vem a `String`. `null` concatenado vira o texto "null".',
    },
    {
      id: 'estagiario-t2-e01-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Na expressão `a + b * c - d`, qual operação é aplicada primeiro?',
      opcoes: ['`b * c`', '`a + b`', '`c - d`', '`a + b * c`, como um bloco'],
      resposta: 0,
      explicacao: 'A multiplicação tem precedência maior que a soma e a subtração. Depois, `+` e `-`, que estão no mesmo nível, são aplicados da esquerda para a direita: (a + (b · c)) − d.',
    },
    {
      id: 'estagiario-t2-e01-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais expressões valem `2`? Escolha duas.',
      opcoes: ['`2 * 3 % 4`', '`14 / 5`', '`10 - (4 - 4)`', '`100 / 10 / 5 * 2`', '`7 % 5 * 2`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: '2 2 10 4 4' },
      codigoVerificacao: `System.out.println((2 * 3 % 4) + " " + (14 / 5) + " " + (10 - (4 - 4)) + " " + (100 / 10 / 5 * 2) + " " + (7 % 5 * 2));`,
      explicacao: '2 · 3 = 6 e 6 % 4 = 2. 14 / 5 é 2 na divisão inteira. As outras: 10 − 0 = 10; ((100 / 10) / 5) · 2 = 4; (7 % 5) · 2 = 4. Operadores do mesmo nível sempre da esquerda para a direita.',
    },
    {
      id: 'estagiario-t2-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(-2 * -3 - -4);`,
      opcoes: ['`10`', '`2`', '`-10`', '`14`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os menos unários se aplicam primeiro: (−2) · (−3) = 6, e 6 − (−4) = 10. `- -4` com espaço é válido; sem espaço, `--4` seria um decremento num literal e não compilaria.',
    },
  ],
};

export default episodio;
