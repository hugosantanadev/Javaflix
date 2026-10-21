import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t2-e04',
  minutos: 11,
  aula,
  armadilhas: [
    '`&&` e `||` fazem curto-circuito; `&`, `|` e `^` com `boolean` avaliam os dois lados.',
    'Um `++` ou uma chamada de método no lado direito de `&&`/`||` pode não ser executado.',
    '`&&` tem precedência maior que `||`: `a || b && c` é `a || (b && c)`.',
    '`1 < x < 10` não compila: `1 < x` é `boolean`, e `boolean < int` não existe.',
    '`boolean` não se compara com número: `x == true` com `x` inteiro não compila.',
    'Números são promovidos antes de comparar: `5 == 5.0` e `\'a\' == 97` são `true`.',
    'Qualquer comparação com `NaN` dá `false`, menos `!=`.',
    '`s.length() > 0 && s != null` lança `NullPointerException` com `s` nulo: o teste veio tarde.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Equality, Relational, and Conditional Operators',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html',
      tipo: 'documentacao',
      porque: 'Os operadores de comparação e os condicionais `&&` e `||`, com a explicação do curto-circuito.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.20: Relational Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.20',
      tipo: 'documentacao',
      porque: 'A especificação mostra por que `a < b < c` não compila e como NaN se comporta nas comparações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.21: Equality Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.21',
      tipo: 'documentacao',
      porque: 'Igualdade numérica, booleana e de referência, cada uma com as suas regras.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.23: Conditional-And Operator &&',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.23',
      tipo: 'documentacao',
      porque: 'A definição do curto-circuito: o operando da direita só é avaliado se o da esquerda for `true`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.22.2: Boolean Logical Operators &, ^, and |',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.22.2',
      tipo: 'documentacao',
      porque: 'Os operadores lógicos sem curto-circuito quando os operandos são `boolean`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Using Operators in Your Programs',
      url: 'https://dev.java/learn/language/constructs/basics/using-operators/',
      tipo: 'tutorial',
      porque: 'Exemplos de comparação e de operadores condicionais no tutorial atual da Oracle.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #08, Operadores Lógicos e Relacionais',
      url: 'https://www.youtube.com/watch?v=xHgnlic7fj8',
      tipo: 'video',
      porque: 'Relacionais, lógicos e tabelas-verdade em Java, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Operadores Lógicos e Relacionais (Curso de Algoritmos #04)',
      url: 'https://www.youtube.com/watch?v=Ig4QZNpVZYs',
      tipo: 'video',
      porque: 'A lógica por trás dos operadores, antes de qualquer linguagem.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro detalha o curto-circuito com os exemplos de efeito colateral que a prova usa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Operators": seções sobre operadores relacionais, lógicos e condicionais',
    },
  ],
  desafio: {
    titulo: 'Validador de cadastro',
    enunciado:
      'Escreva `valido(String nome, int idade, String email)`, numa única expressão `boolean`, que aceita o cadastro quando o nome não é nulo nem em branco, a idade está entre 18 e 65 (inclusive) e o e-mail não é nulo e contém `@`. Ela não pode lançar exceção para nenhuma entrada. Teste e imprima:\n\n```text\ntrue\nfalse\nfalse\nfalse\nfalse\n```\n\npara `("Ana", 30, "ana@exemplo.com")`, `(null, 30, "x@y.com")`, `("Bia", 17, "bia@exemplo.com")`, `("Caio", 40, null)` e `("  ", 40, "c@d.com")`.',
    dicas: [
      'Encadeie as condições com `&&`. A ordem importa: teste `nome != null` antes de `nome.isBlank()`.',
      'Faixa inclusiva: `idade >= 18 && idade <= 65`.',
      '`isBlank()` (Java 11) é verdadeiro para strings vazias ou só com espaços.',
    ],
    solucao: `public class Cadastro {
    static boolean valido(String nome, int idade, String email) {
        return nome != null && !nome.isBlank()
                && idade >= 18 && idade <= 65
                && email != null && email.contains("@");
    }

    public static void main(String[] args) {
        System.out.println(valido("Ana", 30, "ana@exemplo.com"));
        System.out.println(valido(null, 30, "x@y.com"));
        System.out.println(valido("Bia", 17, "bia@exemplo.com"));
        System.out.println(valido("Caio", 40, null));
        System.out.println(valido("  ", 40, "c@d.com"));
    }
}`,
    saida: 'true\nfalse\nfalse\nfalse\nfalse',
    comentarios:
      'O curto-circuito transforma a cadeia de `&&` numa sequência de portões: assim que um falha, os seguintes nem são avaliados. Por isso `nome.isBlank()` nunca roda com `nome` nulo. Trocar qualquer `&&` por `&` faria o segundo e o quarto testes lançarem `NullPointerException`.',
  },
  exercicios: [
    {
      id: 'estagiario-t2-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(5 == 5.0);`,
      opcoes: ['`true`', '`false`', 'Não compila: tipos diferentes', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Antes de comparar, o `int` 5 é promovido para `double` 5.0. Números de tipos diferentes podem ser comparados com `==`.',
    },
    {
      id: 'estagiario-t2-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = 5;
boolean b = x > 10 && x++ > 0;
System.out.println(b + " " + x);
b = x > 10 || x++ > 0;
System.out.println(b + " " + x);`,
      resposta: 'false 5\ntrue 6',
      explicacao: 'No `&&`, o lado esquerdo é falso e o `x++` é pulado: x continua 5. No `||`, o lado esquerdo é falso, então o direito precisa ser avaliado: `x++ > 0` é verdadeiro e x vira 6.',
    },
    {
      id: 'estagiario-t2-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(true || false && false);`,
      opcoes: ['`true`', '`false`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`&&` tem precedência maior que `||`: a expressão é `true || (false && false)`, que dá `true`. Lendo da esquerda para a direita sem a precedência, chegaria-se a `false`.',
    },
    {
      id: 'estagiario-t2-e04-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int i = 0;
if (i++ == 0 || ++i == 2) i += 10;
System.out.println(i);`,
      opcoes: ['`11`', '`12`', '`1`', '`2`', '`10`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`i++ == 0` compara o valor antigo (0) e deixa i em 1. Como é verdadeiro, o `||` não avalia o `++i`. O `if` entra e soma 10: 11.',
    },
    {
      id: 'estagiario-t2-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`boolean b = 1 < 2 < 3;`',
        '`boolean c = 5 == true;`',
        '`boolean d = \'a\' < 98;`',
        '`boolean e = 1.0 == 1;`',
        '`boolean f = !(3 > 2);`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: '`1 < 2` é `boolean`, e `boolean < 3` não existe. Comparar `int` com `boolean` também não. `char` é numérico, então `\'a\' < 98` compila (e dá `true`), e `1.0 == 1` compara números após promoção.',
    },
    {
      id: 'estagiario-t2-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String s = null;
System.out.println(s == null | s.isEmpty());`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `true`',
        'Imprime `false`',
        'Não compila: `|` não funciona com `boolean`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'O `|` com `boolean` é o OU **sem** curto-circuito: mesmo com o lado esquerdo verdadeiro, ele avalia `s.isEmpty()`, e `s` é nulo. Com `||`, a expressão daria `true` sem exceção.',
    },
    {
      id: 'estagiario-t2-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(10 / 4 == 2.5);`,
      opcoes: ['`false`', '`true`', 'Não compila', '`2.5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`10 / 4` é uma divisão de inteiros e vale 2. Só depois o 2 é promovido para comparar com 2.5. A promoção na comparação não "volta no tempo" para refazer a divisão.',
    },
    {
      id: 'estagiario-t2-e04-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o operador que evita a exceção. O programa deve imprimir `false`.',
      codigo: `public class Seguro {
    public static void main(String[] args) {
        String s = null;
        boolean valido = s != null ___ s.length() > 2;
        System.out.println(valido);
    }
}`,
      respostas: ['&&'],
      saida: 'false',
      explicacao: 'Com `&&`, como `s != null` é falso, o `s.length()` nunca é chamado. Com `&`, ele seria chamado e lançaria `NullPointerException`. Com `||`, o lado direito também seria avaliado (porque o esquerdo é falso), com o mesmo resultado.',
    },
    {
      id: 'estagiario-t2-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(true ^ true ^ false);`,
      opcoes: ['`false`', '`true`', 'Não compila: `^` só funciona com números'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com `boolean`, `^` é o OU exclusivo: verdadeiro quando os lados diferem. `true ^ true` é `false`, e `false ^ false` é `false`.',
    },
    {
      id: 'estagiario-t2-e04-q10',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Comparacoes {
    public static void main(String[] args) {
        int idade = 20;
        boolean maior = idade >= 18;
        boolean faixa = 18 <= idade <= 60;
        System.out.println(maior + " " + faixa);
    }
}`,
      resposta: 5,
      explicacao: '`18 <= idade` vira um `boolean`, e comparar `boolean <= 60` não existe. O jeito certo é `18 <= idade && idade <= 60`.',
    },
    {
      id: 'estagiario-t2-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `double x = Double.NaN;
System.out.println((x < 1) + " " + (x >= 1) + " " + (x != x));`,
      opcoes: ['`false false true`', '`true false false`', '`false true false`', '`false false false`', 'Lança `ArithmeticException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'NaN não é menor, maior nem igual a nada, nem a si mesmo. Todas as comparações dão `false`, exceto `!=`, que dá `true`. É por isso que `x != x` é um teste (obscuro) de NaN; o legível é `Double.isNaN(x)`.',
    },
    {
      id: 'estagiario-t2-e04-q12',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int a = 1, b = 1;
boolean r = a++ > 1 & b++ > 1;
System.out.println(r + " " + a + " " + b);
r = a++ > 1 && b++ > 1;
System.out.println(r + " " + a + " " + b);`,
      resposta: 'false 2 2\ntrue 3 3',
      explicacao: 'Com `&`, os dois lados rodam: 1 > 1 e 1 > 1 são falsos, e os dois viram 2. Com `&&`, o lado esquerdo (2 > 1) é verdadeiro, então o direito também é avaliado: 2 > 1 é verdadeiro, e os dois viram 3.',
    },
    {
      id: 'estagiario-t2-e04-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes operadores, aplicado a dois `boolean`, **sempre** avalia os dois lados?',
      opcoes: ['`&`', '`&&`', '`||`', '`? :`'],
      resposta: 0,
      explicacao: '`&` (assim como `|` e `^`) é o operador lógico sem curto-circuito. `&&` e `||` podem pular o lado direito, e o ternário só avalia um dos dois ramos.',
    },
    {
      id: 'estagiario-t2-e04-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais expressões são equivalentes a `!(a > 5 && b < 3)` para quaisquer inteiros `a` e `b`? Escolha duas.',
      opcoes: [
        '`a <= 5 || b >= 3`',
        '`!(a > 5) || !(b < 3)`',
        '`a < 5 || b > 3`',
        '`a <= 5 && b >= 3`',
        '`!(a > 5) && !(b < 3)`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `boolean[] ok = {true, true, true, true, true};
for (int a = 0; a <= 10; a++) for (int b = 0; b <= 6; b++) {
    boolean original = !(a > 5 && b < 3);
    if ((a <= 5 || b >= 3) != original) ok[0] = false;
    if ((!(a > 5) || !(b < 3)) != original) ok[1] = false;
    if ((a < 5 || b > 3) != original) ok[2] = false;
    if ((a <= 5 && b >= 3) != original) ok[3] = false;
    if ((!(a > 5) && !(b < 3)) != original) ok[4] = false;
}
System.out.println(ok[0] + " " + ok[1] + " " + ok[2] + " " + ok[3] + " " + ok[4]);`,
      explicacao: 'Pela lei de De Morgan, a negação de um E é o OU das negações. A negação de `a > 5` é `a <= 5`, e a de `b < 3` é `b >= 3`. Trocar `<=` por `<` erra quando a vale 5; manter o `&&` esquece de trocar o operador.',
    },
    {
      id: 'estagiario-t2-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em `if (pedido != null && pedido.getTotal() > 100)`, qual é a função do `&&`?',
      opcoes: [
        'Garantir que `getTotal()` só seja chamado se `pedido` não for nulo',
        'Avaliar as duas condições em paralelo',
        'Converter o resultado de `getTotal()` para `boolean`',
        'Nenhuma: `&` daria exatamente o mesmo comportamento',
      ],
      resposta: 0,
      explicacao: 'Se `pedido` é nulo, o lado esquerdo é falso e o `&&` encerra a avaliação sem chamar `getTotal()`. Com `&`, a chamada aconteceria e lançaria `NullPointerException`.',
    },
  ],
};

export default episodio;
