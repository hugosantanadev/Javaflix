import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t2-e02',
  minutos: 10,
  aula,
  armadilhas: [
    '`x++` vale o valor antigo; `++x`, o novo. Os dois alteram `x`.',
    '`x = x++;` não altera `x`: o valor antigo é gravado de volta.',
    'Resolva `i++ + ++i` da esquerda para a direita, trocando cada termo pelo seu valor; só depois aplique a precedência.',
    '`5++`, `++(a + 1)` e `(x++)++` não compilam: incremento exige uma variável.',
    '`b += 5` compila num `byte` (cast implícito); `b = b + 5` não compila.',
    'O cast implícito pode estourar ou truncar: `byte b = 100; b += 100;` dá −56, e `int x = 5; x *= 2.5;` dá 12.',
    '`x =+ 1` não é `x += 1`: é `x = +1`.',
    '`if (flag = true)` compila com `boolean` e sempre entra; com `int`, `if (x = 5)` não compila.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Assignment, Arithmetic, and Unary Operators',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op1.html',
      tipo: 'documentacao',
      porque: 'Os operadores unários com o exemplo clássico de prefixo e sufixo.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção "The Unary Operators"',
    },
    {
      titulo: 'JLS 15.14.2: Postfix Increment Operator ++',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.14.2',
      tipo: 'documentacao',
      porque: 'A definição do valor da expressão e da conversão de volta para o tipo da variável.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.26.2: Compound Assignment Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.26.2',
      tipo: 'documentacao',
      porque: 'A frase que explica o cast escondido: `E1 op= E2` equivale a `E1 = (T) ((E1) op (E2))`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JVMS 6.5: a instrução iinc',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-6.html#jvms-6.5.iinc',
      tipo: 'documentacao',
      porque: 'A instrução de bytecode que incrementa uma variável local direto no slot.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Summary of Operators',
      url: 'https://dev.java/learn/language/constructs/basics/all-operators/',
      tipo: 'tutorial',
      porque: 'Todos os operadores de atribuição, unários e aritméticos numa página só.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Compound Operators',
      url: 'https://www.baeldung.com/java-compound-operators',
      tipo: 'artigo',
      porque: 'Os operadores compostos com o cast implícito e a ordem de avaliação, em exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #07, Operadores Aritméticos e Classe Math',
      url: 'https://www.youtube.com/watch?v=W9V5wtOOZHs',
      tipo: 'video',
      porque: 'Incremento, decremento e atribuições compostas explicados com exemplos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os exercícios de incremento do livro são os mais parecidos com os da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Operators": seções sobre operadores unários, incremento e decremento, e atribuição composta',
    },
  ],
  desafio: {
    titulo: 'A conjectura de Collatz',
    enunciado:
      'Partindo de n, aplique repetidamente: se n é par, divida por 2; se é ímpar, troque por 3n + 1. Ninguém provou que a sequência sempre chega a 1, mas até hoje chegou para todo número testado. Conte os passos e o maior valor atingido partindo de 27, usando operadores compostos e `++`. Imprima:\n\n```text\n27 chega a 1 em 111 passos; maior valor: 9232\n```',
    dicas: [
      'Um `while (n != 1)` com um `if` para o par e o ímpar.',
      'Use `n /= 2` para o caso par e `passos++` a cada volta.',
      'Use `long`: em outros pontos de partida, os valores crescem bastante.',
    ],
    solucao: `public class Collatz {
    public static void main(String[] args) {
        long n = 27;
        int passos = 0;
        long maior = n;
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            passos++;
            if (n > maior) {
                maior = n;
            }
        }
        System.out.println("27 chega a 1 em " + passos + " passos; maior valor: " + maior);
    }
}`,
    saida: '27 chega a 1 em 111 passos; maior valor: 9232',
    comentarios:
      'O 27 é famoso porque, apesar de pequeno, sobe até 9.232 antes de descer. A conjectura de Collatz é um dos problemas abertos mais simples de enunciar da matemática: já foi verificada para todos os números até mais de 2⁶⁸, mas ninguém tem uma prova. Repare que `n /= 2` e `passos++` deixam o laço curto e legível.',
  },
  exercicios: [
    {
      id: 'estagiario-t2-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `int a = 5;
System.out.println(a++ + " " + a);`,
      opcoes: ['`5 6`', '`6 6`', '`5 5`', '`6 7`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`a++` vale 5 (o valor antigo) e deixa `a` em 6. Como os operandos são avaliados da esquerda para a direita, o segundo `a` já lê o 6.',
    },
    {
      id: 'estagiario-t2-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = 1;
int y = x++ + x++;
System.out.println(x + " " + y);`,
      resposta: '3 3',
      explicacao: 'O primeiro `x++` vale 1 (x vira 2); o segundo vale 2 (x vira 3). y = 1 + 2 = 3, e x terminou em 3.',
    },
    {
      id: 'estagiario-t2-e02-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int i = 2;
i = i++ * 2 + ++i;
System.out.println(i);`,
      opcoes: ['`8`', '`9`', '`7`', '`10`', '`6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Da esquerda para a direita: `i++` vale 2 (i vira 3); `++i` vale 4 (i vira 4). A expressão fica 2 · 2 + 4 = 8, e a atribuição grava 8 em `i`, por cima do 4.',
    },
    {
      id: 'estagiario-t2-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 10;
x = x++;
x = x++;
System.out.println(x);`,
      opcoes: ['`10`', '`11`', '`12`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em `x = x++`, o lado direito vale o valor antigo, e a atribuição grava esse valor por cima do incremento. Duas vezes ou mil, `x` continua 10.',
    },
    {
      id: 'estagiario-t2-e02-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`byte b = 1; b += 1;`',
        '`byte b = 1; b++;`',
        '`byte b = 1; b = b + 1;`',
        '`byte b = 1; b = (byte) (b + 1);`',
        '`byte b = 1; b = b * 2;`',
      ],
      respostas: [0, 1, 3],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Os operadores compostos e o `++` têm cast implícito para o tipo da variável. Já `b + 1` e `b * 2` são `int` (byte é promovido na conta), e atribuir `int` a `byte` exige cast explícito.',
    },
    {
      id: 'estagiario-t2-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 5;
x *= 2.5;
System.out.println(x);`,
      opcoes: ['`12`', '`12.5`', '`13`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`x *= 2.5` equivale a `x = (int) (x * 2.5)`. A conta é feita em `double` (12.5) e o cast implícito trunca para 12. Com `x = x * 2.5`, não compilaria.',
    },
    {
      id: 'estagiario-t2-e02-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `byte b = 100;
b += 100;
System.out.println(b);`,
      opcoes: ['`-56`', '`200`', '`127`', 'Não compila', 'Lança `ArithmeticException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '100 + 100 = 200 é calculado em `int` e convertido para `byte` pelo cast implícito, que guarda só os 8 bits de baixo: 200 − 256 = −56. O compilador aceita, e nada avisa do estouro.',
    },
    {
      id: 'estagiario-t2-e02-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para que o programa imprima `12 6`.',
      codigo: `public class Prefixo {
    public static void main(String[] args) {
        int x = 5;
        int y = ___x * 2;
        System.out.println(y + " " + x);
    }
}`,
      respostas: ['++'],
      saida: '12 6',
      explicacao: 'Com o prefixo, `x` vira 6 antes de ser lido, e y = 6 · 2 = 12. Com `--x`, daria `8 4`. Escrever `x++` exigiria o operador depois da variável.',
    },
    {
      id: 'estagiario-t2-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int a, b;
a = b = 4;
a += b *= 2;
System.out.println(a + " " + b);`,
      opcoes: ['`12 8`', '`8 8`', '`16 8`', '`12 4`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A atribuição é associativa à direita e é uma expressão. `a = b = 4` deixa os dois em 4. Em `a += b *= 2`, o valor antigo de `a` (4) é guardado, `b *= 2` vale 8 (e b vira 8), e a recebe 4 + 8 = 12.',
    },
    {
      id: 'estagiario-t2-e02-q10',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Incremento {
    public static void main(String[] args) {
        int a = 1;
        a++;
        ++a;
        int b = a++ + 1;
        int c = ++(a + 1);
        System.out.println(a + b + c);
    }
}`,
      resposta: 7,
      explicacao: '`a + 1` é um valor, não uma variável, e não tem onde guardar o incremento. Por isso `++(a + 1)` não compila. Para somar 2 em `a`, use `a += 2`.',
    },
    {
      id: 'estagiario-t2-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `boolean flag = false;
if (flag = true) System.out.println("A");
else System.out.println("B");
System.out.println(flag);`,
      opcoes: ['`A\ntrue`', '`B\nfalse`', '`A\nfalse`', '`B\ntrue`', 'Não compila: `=` dentro do `if`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`flag = true` é uma atribuição, não uma comparação. Ela grava `true` e vale `true`, então o `if` sempre entra. Compila porque o resultado é `boolean`. Com `==`, sairia B.',
    },
    {
      id: 'estagiario-t2-e02-q12',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int k = 2;
k += k++ * 3;
System.out.println(k);`,
      resposta: '8',
      explicacao: 'O valor antigo de `k` (2) é guardado antes do lado direito. `k++ * 3` vale 2 · 3 = 6 (e k vira 3 de passagem). A soma 2 + 6 = 8 é gravada em `k`, e o incremento se perde.',
    },
    {
      id: 'estagiario-t2-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `char c = 'x';
c++;
c += 1;
System.out.println(c);`,
      opcoes: ['`z`', '`122`', '`x`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`char` é numérico, e `++` e `+=` têm cast implícito de volta para `char`. \'x\' + 2 é \'z\'. Como a variável continua `char`, o `println` imprime a letra, e não 122.',
    },
    {
      id: 'estagiario-t2-e02-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Começando sempre com `int x = 5;`, quais comandos deixam `x` valendo 6? Escolha três.',
      opcoes: ['`x++;`', '`x += 1;`', '`x = ++x;`', '`x = x++;`', '`x =+ 1;`'],
      respostas: [0, 1, 2],
      verificar: { tipo: 'executa', saida: '6 6 6 5 1' },
      codigoVerificacao: `int a = 5; a++;
int b = 5; b += 1;
int c = 5; c = ++c;
int d = 5; d = d++;
int e = 5; e =+ 1;
System.out.println(a + " " + b + " " + c + " " + d + " " + e);`,
      explicacao: '`x = ++x` funciona porque o prefixo já vale 6. `x = x++` grava o valor antigo de volta. E `x =+ 1` é uma pegadinha de digitação: o compilador lê `x = +1`, que atribui 1.',
    },
    {
      id: 'estagiario-t2-e02-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença entre `++x` e `x++` quando usados dentro de uma expressão?',
      opcoes: [
        '`++x` vale o valor já incrementado; `x++` vale o valor de antes do incremento',
        '`++x` incrementa duas vezes; `x++` incrementa uma vez',
        '`x++` só incrementa no fim do método',
        'Não há diferença nenhuma',
      ],
      resposta: 0,
      explicacao: 'Os dois somam 1 à variável imediatamente. A diferença é só no valor que a expressão produz para quem está ao redor: o novo, no prefixo, ou o antigo, no sufixo.',
    },
  ],
};

export default episodio;
