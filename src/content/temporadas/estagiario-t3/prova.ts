import type { Exercicio } from '../../types';

/** Prova da temporada Estagiário T3: decisões. */
const prova: Exercicio[] = [
  {
    id: 'estagiario-t3-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int x = 15;
if (x > 10)
    if (x > 20) System.out.println("A");
    else System.out.println("B");
else System.out.println("C");`,
    opcoes: ['`B`', '`A`', '`C`', 'Nada', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O primeiro `else` pertence ao `if (x > 20)`, e o segundo ao `if (x > 10)`. Como 15 > 10 e 15 não é maior que 20, roda o `else` interno: B.',
  },
  {
    id: 'estagiario-t3-prova-q02',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int n = 0;
if (n > 5); n++;
if (n > 5) n += 10; n += 100;
System.out.println(n);`,
    opcoes: ['`101`', '`1`', '`111`', '`100`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O primeiro `if` tem corpo vazio (o `;`), e o `n++` roda sempre: n = 1. No segundo, o `if` controla só o `n += 10`, que não roda; o `n += 100` está fora dele: 101.',
  },
  {
    id: 'estagiario-t3-prova-q03',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais trechos compilam? Escolha dois.',
    opcoes: [
      '`Object o = 5; if (o instanceof Integer i && i > 3) {}`',
      '`Object o = 5; if (o instanceof Integer i || i > 3) {}`',
      '`Object o = 5; if (!(o instanceof Integer i)) {} else { int d = i * 2; }`',
      '`Object o = 5; if (o instanceof Integer i) {} int e = i;`',
      '`Integer n = 5; if (n instanceof String s) {}`',
    ],
    respostas: [0, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'A variável do padrão só existe onde o teste é certamente verdadeiro: depois de `&&` e no `else` de um teste negado. Depois de `||` e depois do `if`, o teste pode ter falhado. E `Integer` nunca pode ser `String`: o compilador recusa o teste impossível.',
  },
  {
    id: 'estagiario-t3-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `String s = "b";
int x = 0;
switch (s) {
    case "a": x += 1;
    case "b": x += 2;
    case "c": x += 4; break;
    default: x += 8;
}
System.out.println(x);`,
    opcoes: ['`6`', '`2`', '`14`', '`7`', '`8`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A execução entra no `case "b"` e cai no `case "c"`, onde o `break` encerra: 2 + 4 = 6. O `case "a"` vem antes e o `default` vem depois do `break`.',
  },
  {
    id: 'estagiario-t3-prova-q05',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos **não** compilam? Escolha dois.',
    opcoes: [
      '`long v = 1; switch (v) { default: }`',
      '`short s = 1; switch (s) { case 40000: }`',
      '`Integer i = 1; switch (i) { case 1: break; }`',
      '`char c = \'x\'; switch (c) { case 120: break; }`',
      '`String s = "x"; final String K = "x"; switch (s) { case K: break; }`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: '`long` nunca é seletor válido, e 40.000 não cabe num `short`. Os wrappers de inteiros são aceitos, 120 é um `char` válido, e uma `String` final inicializada com literal é uma constante de compilação.',
  },
  {
    id: 'estagiario-t3-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `Integer codigo = null;
switch (codigo) {
    case 1: System.out.println("um"); break;
    default: System.out.println("outro");
}`,
    opcoes: ['Lança `NullPointerException`', 'Imprime `outro`', 'Imprime nada', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NullPointerException' },
    explicacao: 'Para comparar com os rótulos `int`, o `Integer` é desembrulhado, e desembrulhar `null` lança `NullPointerException`. O `default` não cobre o nulo; só o `case null` do Java 21 cobriria.',
  },
  {
    id: 'estagiario-t3-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int n = 2;
int r = switch (n) {
    case 1: yield 10;
    case 2: n++;
    case 3: yield n * 100;
    default: yield -1;
};
System.out.println(r + " " + n);`,
    opcoes: ['`300 3`', '`200 3`', '`300 2`', 'Não compila: `case 2` sem `yield`', '`200 2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com `:`, mesmo numa expressão, há fall-through. O `case 2` incrementa `n` para 3 e cai no `case 3`, que produz 3 · 100. Todo caminho termina num `yield`, então compila.',
  },
  {
    id: 'estagiario-t3-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar o trecho?',
    codigo: `int x = 1;
int r = switch (x) {
    case 1 -> 10;
    default -> 20;
}
System.out.println(r);`,
    opcoes: [
      'Não compila: falta `;` depois da `}` da expressão `switch`',
      'Imprime `10`',
      'Imprime `20`',
      'Não compila: falta `yield`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: 'A expressão `switch` faz parte de uma declaração (`int r = ...;`), e toda declaração termina com `;`. Na forma arrow com uma expressão simples, o `yield` não é necessário.',
  },
  {
    id: 'estagiario-t3-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `enum Nivel { BAIXO, MEDIO, ALTO }

Nivel n = Nivel.ALTO;
var peso = switch (n) {
    case BAIXO -> 1;
    case MEDIO -> 2.5f;
    case ALTO -> 4;
};
System.out.println(peso);`,
    opcoes: ['`4.0`', '`4`', 'Não compila: falta `default`', 'Não compila: ramos de tipos diferentes', '`4.0f`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Cobrir todas as constantes do `enum` dispensa o `default`. Os ramos são `int`, `float` e `int`, então a expressão é `float`, e o 4 escolhido vira 4.0.',
  },
  {
    id: 'estagiario-t3-prova-q10',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
    opcoes: [
      'Numa expressão `switch`, um bloco `{ }` depois de `->` precisa produzir o valor com `yield`',
      'Uma expressão `switch` sobre um `enum` que lista todas as constantes compila sem `default`',
      'Todo `switch` comando com `->` precisa ser exaustivo',
      '`return` pode ser usado dentro de uma expressão `switch` para produzir o valor',
      '`case 1 ->` e `case 2:` podem ser misturados no mesmo `switch`',
    ],
    respostas: [0, 1],
    explicacao: 'O `yield` é a única saída com valor de um bloco, e a exaustividade com `enum` vem das constantes. Um `switch` comando com rótulos constantes não precisa ser exaustivo; `return` não é permitido dentro da expressão; e as duas formas de `case` não se misturam.',
  },
  {
    id: 'estagiario-t3-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    provas: ['830', '831'],
    enunciado: 'No Java 21, qual é a saída?',
    codigo: `Object o = null;
String r = switch (o) {
    case null -> "nulo";
    case String s -> "texto";
    default -> "outro";
};
System.out.println(r);`,
    opcoes: ['`nulo`', 'Lança `NullPointerException`', '`outro`', 'Não compila: `case null`', '`texto`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Desde o Java 21, um `switch` pode ter `case null`, e então o seletor nulo cai nele em vez de lançar `NullPointerException`. Sem o `case null`, mesmo com `default`, a exceção continuaria.',
  },
  {
    id: 'estagiario-t3-prova-q12',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais trechos **não** compilam? Escolha três.',
    opcoes: [
      '`int x = 1; if (x > 0) { return; } System.out.println(x);`',
      '`int x = 1; return; System.out.println(x);`',
      '`for (;;) { } System.out.println(1);`',
      '`do { break; } while (true); System.out.println(1);`',
      '`while (1 > 2) { System.out.println(1); }`',
    ],
    respostas: [1, 2, 4],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: 'Um `return` solto torna o resto do bloco inalcançável; um `for (;;)` sem `break` nunca termina; e `1 > 2` é uma expressão constante falsa, o que torna o corpo do `while` inalcançável, como `while (false)`. O `return` dentro de um `if` deixa o caminho do "falso", e o `break` encerra o `do-while`.',
  },
  {
    id: 'estagiario-t3-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar o trecho?',
    codigo: `int n = 1, x;
switch (n) {
    case 1 -> x = 1;
    case 2 -> x = 2;
}
System.out.println(x);`,
    opcoes: [
      'Não compila: `x` pode não ter sido inicializada',
      'Imprime `1`',
      'Imprime `0`',
      'Não compila: o `switch` precisa ser exaustivo',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: 'O `switch` comando com rótulos constantes não precisa ser exaustivo, então compila. O problema é o `println`: sem `default`, existe o caminho em que `n` não é 1 nem 2, e nele `x` não tem valor.',
  },
  {
    id: 'estagiario-t3-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `final boolean DEBUG = false;
int x = 1;
if (DEBUG) {
    x = 2;
}
while (!DEBUG && x < 4) {
    x++;
}
System.out.println(x);`,
    opcoes: ['`4`', '`1`', '`2`', 'Não compila: código inalcançável'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`if (DEBUG)` com constante falsa é permitido. A condição do `while` envolve `x`, que não é constante, então o laço é tratado normalmente e incrementa x até 4.',
  },
  {
    id: 'estagiario-t3-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de compilar a classe?',
    codigo: `public class Cores {
    enum Cor { R, G }

    static int f(Cor c) {
        switch (c) {
            case R: return 1;
            case G: return 2;
        }
    }
}`,
    opcoes: [
      'Não compila: falta `return` depois do `switch`',
      'Compila: o `switch` cobre todas as constantes',
      'Não compila: `switch` clássico não aceita `enum`',
      'Compila, mas lança exceção com `null`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: 'Um `switch` **comando** com rótulos constantes não é considerado exaustivo, mesmo listando todas as constantes, e o compilador enxerga um caminho que passa direto por ele. Uma expressão `switch` com `return switch (c) { ... };` resolveria.',
  },
  {
    id: 'estagiario-t3-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int pontos = 75;
String r = pontos >= 90 ? "ouro" : switch (pontos / 25) {
    case 3 -> "prata";
    case 2 -> "bronze";
    default -> "nada";
};
System.out.println(r);`,
    opcoes: ['`prata`', '`bronze`', '`ouro`', '`nada`', 'Não compila: `switch` dentro do ternário'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Uma expressão `switch` pode estar em qualquer lugar onde cabe uma expressão, inclusive num ramo do ternário. 75 não é ≥ 90, e 75 / 25 é 3.',
  },
  {
    id: 'estagiario-t3-prova-q17',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `char c = 'B';
switch (c) {
    case 'A' + 1 -> System.out.println("B por conta");
    case 'C' -> System.out.println("C");
    default -> System.out.println("outro");
}`,
    opcoes: ['`B por conta`', '`outro`', 'Não compila: rótulo com conta', '`C`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`\'A\' + 1` é uma expressão constante (66), calculada pelo compilador, e 66 é \'B\'. Rótulos aceitam qualquer constante de compilação que caiba no tipo do seletor, não só literais.',
  },
  {
    id: 'estagiario-t3-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int a = 3, b = 0;
if (a > 2) b = switch (a) { case 3 -> 30; default -> 0; };
else b = -1;
System.out.println(a + b);`,
    opcoes: ['`33`', '`330`', '`2`', '`3`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A atribuição com a expressão `switch` é um único comando, terminado em `;`, e por isso o `else` continua ligado ao `if`. b recebe 30, e a soma de dois `int` é 33.',
  },
];

export default prova;
