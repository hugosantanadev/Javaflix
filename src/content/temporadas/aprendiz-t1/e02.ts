import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t1-e02',
  minutos: 11,
  aula,
  armadilhas: [
    'XOR é 1 quando as entradas são diferentes, não quando "pelo menos uma" é 1.',
    'Negar um AND vira OR das negações (De Morgan); trocar só o operador sem negar as partes está errado.',
    'Em Java, `!` só funciona com `boolean`; `!5` não compila.',
    '`&` e `|` em inteiros operam bit a bit; `5 & 3` vale 1, não `true`.',
    '`~x` inverte todos os 32 bits do `int`, por isso `~0` é -1.',
    'NAND e NOR são universais; AND, OR e XOR sozinhas não são.',
  ],
  recursos: [
    {
      titulo: 'JLS 15.22: Bitwise and Logical Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.22',
      tipo: 'documentacao',
      porque: 'Como `&`, `|` e `^` funcionam com inteiros e com booleanos, direto da especificação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Wikipédia: Porta lógica',
      url: 'https://pt.wikipedia.org/wiki/Porta_l%C3%B3gica',
      tipo: 'artigo',
      porque: 'Símbolos, tabelas-verdade e a implementação com transistores de cada porta, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Crash Course Computer Science #3: Boolean Logic & Logic Gates',
      url: 'https://www.youtube.com/watch?v=gI-qXk7XojA',
      tipo: 'video',
      porque: 'De transistores a AND, OR, NOT e XOR, com a analogia de chaves e água.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Operadores Lógicos e Relacionais (Curso de Algoritmos #04)',
      url: 'https://www.youtube.com/watch?v=Ig4QZNpVZYs',
      tipo: 'video',
      porque: 'Tabelas-verdade de E, OU e NÃO explicadas do zero, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Nandgame',
      url: 'https://nandgame.com/',
      tipo: 'ferramenta',
      porque: 'Um jogo de navegador: você constrói todas as portas, depois um somador e uma CPU, só com NAND.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'CircuitVerse',
      url: 'https://circuitverse.org/',
      tipo: 'ferramenta',
      porque: 'Simulador de circuitos digitais online e gratuito: monte as portas deste episódio e teste as tabelas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Code: The Hidden Language of Computer Hardware and Software (Charles Petzold)',
      url: 'https://www.codehiddenlanguage.com/',
      tipo: 'livro',
      porque: 'Constrói as portas lógicas a partir de relés e lâmpadas, sem pular nenhum passo.',
      gratuito: false,
      idioma: 'en',
      onde: '1ª edição: cap. 10 "Logic and Switches" e 11 "Gates (Not Bill)"',
    },
    {
      titulo: 'The Java Tutorials: Bitwise and Bit Shift Operators',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op3.html',
      tipo: 'tutorial',
      porque: 'Os operadores `&`, `|`, `^`, `~`, `<<`, `>>` e `>>>` do Java, com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.23: Conditional-And Operator &&',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.23',
      tipo: 'documentacao',
      porque: 'A regra do curto-circuito: o lado direito do `&&` só é avaliado se o esquerdo for `true`. A seção seguinte faz o mesmo para o `||`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Teoremas de De Morgan',
      url: 'https://pt.wikipedia.org/wiki/Teoremas_de_De_Morgan',
      tipo: 'artigo',
      porque: 'As duas leis com tabelas-verdade e a versão com conjuntos.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Baeldung: Java Bitwise Operators',
      url: 'https://www.baeldung.com/java-bitwise-operators',
      tipo: 'artigo',
      porque: 'Cada operador bit a bit com a conta em binário ao lado e usos práticos, como máscaras e flags.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Nand2Tetris, projeto 1: Boolean Logic',
      url: 'https://www.nand2tetris.org/project01',
      tipo: 'curso',
      porque: 'O exercício que dá sentido à aula: construir NOT, AND, OR, XOR e o multiplexador só com portas NAND, num simulador.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Tabela-verdade de uma expressão',
    enunciado:
      'Escreva a classe `Expressao` que imprime a tabela-verdade de `(A AND B) OR (NOT C)` para as 8 combinações de A, B e C, usando 0 e 1, uma linha por combinação, no formato `A B C = R`. A ordem é a de contagem binária, de 000 a 111:\n\n```text\n0 0 0 = 1\n0 0 1 = 0\n0 1 0 = 1\n0 1 1 = 0\n1 0 0 = 1\n1 0 1 = 0\n1 1 0 = 1\n1 1 1 = 1\n```',
    dicas: [
      'Um laço de 0 a 7 percorre as 8 combinações. Os bits de cada número são A, B e C.',
      'O bit de A é `(i >> 2) & 1`; o de B, `(i >> 1) & 1`; o de C, `i & 1`.',
      'Com inteiros 0 e 1, AND é `&`, OR é `|` e NOT é `1 - x` (ou `x ^ 1`).',
    ],
    solucao: `public class Expressao {
    public static void main(String[] args) {
        for (int i = 0; i < 8; i++) {
            int a = (i >> 2) & 1;
            int b = (i >> 1) & 1;
            int c = i & 1;
            int r = (a & b) | (c ^ 1);
            System.out.println(a + " " + b + " " + c + " = " + r);
        }
    }
}`,
    saida: '0 0 0 = 1\n0 0 1 = 0\n0 1 0 = 1\n0 1 1 = 0\n1 0 0 = 1\n1 0 1 = 0\n1 1 0 = 1\n1 1 1 = 1',
    comentarios:
      'Contar de 0 a 2ⁿ − 1 e separar os bits é o jeito clássico de gerar todas as combinações de n variáveis booleanas, e é exatamente o que um gerador de tabela-verdade faz. Repare que a expressão só dá 0 quando C é 1 e A AND B é 0.',
  },
  exercicios: [
    {
      id: 'aprendiz-t1-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(true ^ true);`,
      opcoes: ['`false`', '`true`', '`0`', 'Não compila: `^` só funciona com números'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'XOR é verdadeiro só quando as entradas são diferentes. Com as duas `true`, o resultado é `false`. Em Java, `^` funciona tanto com `boolean` quanto com inteiros.',
    },
    {
      id: 'aprendiz-t1-e02-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais expressões são equivalentes a `!(a || b)` para quaisquer valores de `a` e `b`? Escolha duas.',
      opcoes: ['`!a && !b`', '`!a || !b`', '`!(b || a)`', '`a && b`', '`!a ^ !b`'],
      respostas: [0, 2],
      verificar: { tipo: 'executa', saida: 'true\nfalse\ntrue\nfalse\nfalse' },
      codigoVerificacao: `boolean[] v = {false, true};
boolean[] equivale = {true, true, true, true, true};
for (boolean a : v) for (boolean b : v) {
    boolean alvo = !(a || b);
    if ((!a && !b) != alvo) equivale[0] = false;
    if ((!a || !b) != alvo) equivale[1] = false;
    if (!(b || a) != alvo) equivale[2] = false;
    if ((a && b) != alvo) equivale[3] = false;
    if ((!a ^ !b) != alvo) equivale[4] = false;
}
for (boolean e : equivale) System.out.println(e);`,
      explicacao: 'Pela lei de De Morgan, negar um OR é fazer o AND das negações: `!a && !b`. E OR é comutativo, então trocar a ordem dentro dos parênteses não muda nada. As outras falham em pelo menos uma combinação.',
    },
    {
      id: 'aprendiz-t1-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(6 & 3);
System.out.println(6 | 3);
System.out.println(6 ^ 3);`,
      resposta: '2\n7\n5',
      explicacao: '6 é `110` e 3 é `011`. Bit a bit: AND dá `010` = 2, OR dá `111` = 7 e XOR dá `101` = 5.',
    },
    {
      id: 'aprendiz-t1-e02-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas portas NAND são necessárias para fazer uma porta NOT?',
      opcoes: ['1', '2', '3', '4', 'É impossível'],
      resposta: 0,
      explicacao: 'Ligando a mesma entrada nos dois pinos, `A NAND A` = NOT (A AND A) = NOT A. Uma porta só.',
    },
    {
      id: 'aprendiz-t1-e02-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual porta tem saída 1 somente quando as duas entradas são diferentes?',
      opcoes: ['XOR', 'AND', 'OR', 'NAND', 'NOR'],
      resposta: 0,
      explicacao: 'É a definição do ou exclusivo. O OR também dá 1 com entradas diferentes, mas dá 1 com as duas em 1, o que o XOR não faz.',
    },
    {
      id: 'aprendiz-t1-e02-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com um operador para testar se `n` é par olhando o último bit. O programa deve imprimir `true`.',
      codigo: `public class Par {
    public static void main(String[] args) {
        int n = 42;
        System.out.println((n ___ 1) == 0);
    }
}`,
      respostas: ['&'],
      saida: 'true',
      explicacao: '`n & 1` isola o bit da unidade: 0 para pares, 1 para ímpares. É uma máscara de um bit. Faz o mesmo que `n % 2 == 0` para números positivos.',
    },
    {
      id: 'aprendiz-t1-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A expressão `a || (a && b)` é sempre igual a qual destas?',
      opcoes: ['`a`', '`b`', '`a && b`', '`a || b`', '`true`'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true' },
      codigoVerificacao: `boolean[] v = {false, true};
boolean sempre = true;
for (boolean a : v) for (boolean b : v) if ((a || (a && b)) != a) sempre = false;
System.out.println(sempre);`,
      explicacao: 'É a lei da absorção. Se `a` for verdadeiro, o OR já é verdadeiro. Se `a` for falso, `a && b` também é falso, e sobra falso. Nos dois casos, o resultado é o próprio `a`.',
    },
    {
      id: 'aprendiz-t1-e02-q08',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(~0);
System.out.println(~(-1));`,
      resposta: '-1\n0',
      explicacao: '`0` tem os 32 bits desligados; `~0` liga todos, e 32 bits ligados representam -1 em complemento de dois. Invertendo de novo, voltamos a 0.',
    },
    {
      id: 'aprendiz-t1-e02-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(5 & 3);`,
      opcoes: ['`1`', '`7`', '`6`', '`8`', '`true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '5 é `101` e 3 é `011`. Só o último bit está ligado nos dois, então o AND bit a bit dá `001` = 1. Com inteiros, `&` devolve um número, não um `boolean`.',
    },
    {
      id: 'aprendiz-t1-e02-q10',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Logica {
    public static void main(String[] args) {
        int x = 5;
        boolean par = x % 2 == 0;
        boolean impar = !par;
        boolean zero = !x;
        System.out.println(par + " " + impar + " " + zero);
    }
}`,
      resposta: 6,
      explicacao: 'Em Java, o `!` só se aplica a `boolean`. Diferente de C, um número não vira verdadeiro ou falso sozinho. O certo seria `x == 0`.',
    },
    {
      id: 'aprendiz-t1-e02-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais portas, sozinhas, conseguem construir qualquer circuito lógico? Escolha duas.',
      opcoes: ['NAND', 'NOR', 'AND', 'OR', 'XOR', 'NOT'],
      respostas: [0, 1],
      explicacao: 'NAND e NOR são universais porque cada uma consegue produzir um NOT (ligando as entradas juntas) e, com ele, o AND e o OR. Só com AND ou só com OR não dá para inverter um sinal, e só com NOT não dá para combinar dois.',
    },
    {
      id: 'aprendiz-t1-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Para quais entradas a porta NOR tem saída 1?',
      opcoes: [
        'Somente quando A = 0 e B = 0',
        'Somente quando A = 1 e B = 1',
        'Quando as entradas são diferentes',
        'Sempre que pelo menos uma entrada é 0',
      ],
      resposta: 0,
      explicacao: 'NOR é a negação do OR. O OR só dá 0 quando as duas entradas são 0, então o NOR só dá 1 nesse caso. "Pelo menos uma entrada é 0" é a descrição do NAND.',
    },
    {
      id: 'aprendiz-t1-e02-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class SoNand {
    static boolean nand(boolean a, boolean b) { return !(a && b); }

    public static void main(String[] args) {
        boolean a = true;
        boolean b = false;
        System.out.println(nand(a, a));
        System.out.println(nand(nand(a, b), nand(a, b)));
        System.out.println(nand(nand(a, a), nand(b, b)));
    }
}`,
      resposta: 'false\nfalse\ntrue',
      explicacao: 'A primeira linha é um NOT feito com NAND: NOT true = false. A segunda é um AND: true AND false = false. A terceira é um OR, por De Morgan: true OR false = true.',
    },
    {
      id: 'aprendiz-t1-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A condição `!(idade < 18 || semDocumento)` é equivalente a qual destas?',
      opcoes: [
        '`idade >= 18 && !semDocumento`',
        '`idade >= 18 || !semDocumento`',
        '`idade > 18 && !semDocumento`',
        '`!(idade < 18) || semDocumento`',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true' },
      codigoVerificacao: `boolean sempre = true;
for (int idade = 16; idade <= 20; idade++) {
    for (boolean semDocumento : new boolean[] {false, true}) {
        if (!(idade < 18 || semDocumento) != (idade >= 18 && !semDocumento)) sempre = false;
    }
}
System.out.println(sempre);`,
      explicacao: 'De Morgan: negar o OR vira AND das negações. A negação de `idade < 18` é `idade >= 18` (com o igual, senão quem tem 18 fica de fora) e a de `semDocumento` é `!semDocumento`.',
    },
    {
      id: 'aprendiz-t1-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 12345;
System.out.println(x ^ x);`,
      opcoes: ['`0`', '`12345`', '`24690`', '`-1`', '`1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'XOR de um bit com ele mesmo é sempre 0, então `x ^ x` zera qualquer número. Processadores usam esse truque para zerar registradores com uma instrução curta.',
    },
  ],
};

export default episodio;
