import type { Exercicio } from '../../types';

/** Prova da temporada Estagiário T2: operadores. */
const prova: Exercicio[] = [
  {
    id: 'estagiario-t2-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(15 / 4 * 4 + 15 % 4);`,
    opcoes: ['`15`', '`16`', '`12`', '`18.75`', '`3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '15 / 4 é 3 em divisão inteira, e 3 · 4 = 12. 15 % 4 é 3. Somando, 15: a identidade (a / b) · b + a % b sempre devolve o a original.',
  },
  {
    id: 'estagiario-t2-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println("" + 1 + 2 * 3 + 4);`,
    opcoes: ['`164`', '`1234`', '`11`', '`74`', '`1610`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A multiplicação vem antes: 2 · 3 = 6. Depois, da esquerda para a direita, tudo é concatenação, porque a expressão começa com uma `String`: "" + 1 = "1", "1" + 6 = "16", "16" + 4 = "164".',
  },
  {
    id: 'estagiario-t2-prova-q03',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos lançam `ArithmeticException` ao executar? Escolha dois.',
    opcoes: [
      '`int x = 0; int r = 10 % x;`',
      '`long y = 10L / 0L;`',
      '`double d = 10 / 0.0;`',
      '`double e = 0.0 / 0;`',
      '`float f = 1f % 0;`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'executa', saida: 'true true false false false' },
    codigoVerificacao: `boolean[] lanca = new boolean[5];
try { int x = 0; int r = 10 % x; } catch (ArithmeticException e) { lanca[0] = true; }
try { long y = 10L / 0L; } catch (ArithmeticException e) { lanca[1] = true; }
try { double d = 10 / 0.0; } catch (ArithmeticException e) { lanca[2] = true; }
try { double e = 0.0 / 0; } catch (ArithmeticException ex) { lanca[3] = true; }
try { float f = 1f % 0; } catch (ArithmeticException e) { lanca[4] = true; }
System.out.println(lanca[0] + " " + lanca[1] + " " + lanca[2] + " " + lanca[3] + " " + lanca[4]);`,
    explicacao: 'Divisão e resto de inteiros (`int` ou `long`) por zero lançam exceção. Com qualquer operando de ponto flutuante, o resultado é `Infinity` ou `NaN`, sem exceção, inclusive no resto: `1f % 0` é NaN.',
  },
  {
    id: 'estagiario-t2-prova-q04',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int a = 3;
int b = a++ + a++ * --a;
System.out.println(a + " " + b);`,
    opcoes: ['`4 19`', '`5 19`', '`4 28`', '`4 15`', '`5 23`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Da esquerda para a direita: `a++` vale 3 (a = 4), `a++` vale 4 (a = 5), `--a` vale 4 (a = 4). Com os valores no lugar, 3 + 4 · 4 = 19, e `a` terminou em 4.',
  },
  {
    id: 'estagiario-t2-prova-q05',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `short s = 32767;
s++;
s += 1;
System.out.println(s);`,
    opcoes: ['`-32767`', '`32769`', '`-32768`', 'Não compila', '`32767`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`++` e `+=` têm cast implícito para `short`, então compilam. 32.767 é o maior `short`: o `++` dá a volta para −32.768, e o `+= 1` leva a −32.767.',
  },
  {
    id: 'estagiario-t2-prova-q06',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos **não** compilam? Escolha dois.',
    opcoes: [
      '`int x = 5; x =+ 2;`',
      '`int y = 5; ++y++;`',
      '`final int z = 5; z++;`',
      '`char c = \'a\'; c++;`',
      '`long l = 1; l *= 2.5;`',
    ],
    respostas: [1, 2],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: '`y++` é um valor, e `++` precisa de uma variável. Uma variável `final` não pode ser alterada. `x =+ 2` compila e atribui +2; `c++` e `l *= 2.5` compilam graças ao cast implícito.',
  },
  {
    id: 'estagiario-t2-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `byte b = (byte) 0b1000_0001;
System.out.println(b + " " + (b & 0xFF));`,
    opcoes: ['`-127 129`', '`129 129`', '`-1 255`', '`-127 -127`', '`1 129`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`1000 0001` é 129 sem sinal. No `byte`, o bit de cima vale −128, então b é −128 + 1 = −127. Com `& 0xFF`, o `byte` promovido a `int` perde os bits de sinal estendidos e volta a valer 129.',
  },
  {
    id: 'estagiario-t2-prova-q08',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais atribuições compilam **sem** cast? Escolha três.',
    opcoes: [
      '`float f = 10L;`',
      '`long l = \'x\';`',
      '`double d = 3.0f;`',
      '`int i = 3.0;`',
      '`short s = 40000;`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`long` para `float`, `char` para `long` e `float` para `double` são ampliações. `3.0` é `double`, e `double` para `int` é redução. 40.000 não cabe num `short` (o máximo é 32.767), então a regra das constantes não se aplica.',
  },
  {
    id: 'estagiario-t2-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(1_000_000 * 3_000 / 1_000);`,
    opcoes: ['`-1294967`', '`3000000`', '`3000000000`', '`-1294967296`', 'Lança `ArithmeticException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A multiplicação vem antes da divisão (esquerda para a direita) e estoura o `int`: 3 × 10⁹ − 2³² = −1.294.967.296. Dividido por 1.000, em divisão inteira, dá −1.294.967. Dividir antes (`3_000 / 1_000`) evitaria o estouro.',
  },
  {
    id: 'estagiario-t2-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int i = 'a' + 'b';
char c = 'a' + 1;
System.out.println(i + " " + c);`,
    opcoes: ['`195 b`', '`ab b`', '`195 98`', 'Não compila: `\'a\' + 1` é `int`', '`195 a1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`\'a\' + \'b\'` é aritmética: 97 + 98 = 195. `\'a\' + 1` também é `int`, mas é uma constante (98) que cabe num `char`, então a atribuição compila sem cast e `c` vale \'b\'.',
  },
  {
    id: 'estagiario-t2-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int x = 0, y = 0;
if (x++ > 0 & y++ > 0 || x++ > 0 && ++y > 0) System.out.println("A");
System.out.println(x + " " + y);`,
    opcoes: ['`A\n2 2`', '`2 2`', '`A\n1 1`', '`A\n2 1`', '`1 1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Pela precedência, a condição é `(x++ > 0 & y++ > 0) || (x++ > 0 && ++y > 0)`. O `&` avalia os dois lados: 0 > 0 e 0 > 0 são falsos, x e y viram 1. Como o lado esquerdo do `||` é falso, o direito roda: 1 > 0 é verdadeiro (x = 2), e `++y > 0` também (y = 2). Imprime A.',
  },
  {
    id: 'estagiario-t2-prova-q12',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Com `String s = null;`, quais expressões são avaliadas sem lançar exceção? Escolha duas.',
    opcoes: [
      '`s != null && s.isEmpty()`',
      '`s == null || s.isEmpty()`',
      '`s.isEmpty() || s == null`',
      '`s != null & s.isEmpty()`',
      '`s == null | s.isEmpty()`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'executa', saida: 'true true false false false' },
    codigoVerificacao: `String s = null;
boolean[] seguro = {true, true, true, true, true};
try { boolean r = s != null && s.isEmpty(); } catch (NullPointerException e) { seguro[0] = false; }
try { boolean r = s == null || s.isEmpty(); } catch (NullPointerException e) { seguro[1] = false; }
try { boolean r = s.isEmpty() || s == null; } catch (NullPointerException e) { seguro[2] = false; }
try { boolean r = s != null & s.isEmpty(); } catch (NullPointerException e) { seguro[3] = false; }
try { boolean r = s == null | s.isEmpty(); } catch (NullPointerException e) { seguro[4] = false; }
System.out.println(seguro[0] + " " + seguro[1] + " " + seguro[2] + " " + seguro[3] + " " + seguro[4]);`,
    explicacao: 'O teste de nulo precisa vir antes e com o operador de curto-circuito: no `&&`, o lado esquerdo falso encerra; no `||`, o lado esquerdo verdadeiro encerra. Com `&` e `|`, o `s.isEmpty()` sempre roda; na terceira, ele roda primeiro.',
  },
  {
    id: 'estagiario-t2-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(0.1 + 0.2 == 0.3 | 'b' > 'a');`,
    opcoes: ['`true`', '`false`', 'Não compila: `|` com `boolean`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`0.1 + 0.2 == 0.3` é falso por causa do ponto flutuante, e `\'b\' > \'a\'` é verdadeiro (98 > 97). O `|` com `boolean` é o OU lógico: falso OU verdadeiro dá verdadeiro.',
  },
  {
    id: 'estagiario-t2-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `char c = 'x';
int i = 10;
System.out.println(true ? c : i);
System.out.println(true ? c : 10);`,
    opcoes: ['`120\nx`', '`x\nx`', '`120\n120`', '`x\n120`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com um ramo `char` e outro variável `int`, o ternário é `int`: imprime 120. Com a constante 10, que cabe num `char`, o ternário é `char`: imprime x. O valor escolhido é o mesmo; o tipo muda o que o `println` mostra.',
  },
  {
    id: 'estagiario-t2-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(-1 >>> 31 + 1);`,
    opcoes: ['`-1`', '`2`', '`1`', '`0`', '`4294967295`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `+` tem precedência maior que o deslocamento: a expressão é `-1 >>> 32`. Num `int`, só os 5 bits de baixo da distância contam, e 32 vira 0. Deslocar 0 posições deixa o −1 como está.',
  },
  {
    id: 'estagiario-t2-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int x = 0b1011;
x &= x - 1;
System.out.println(Integer.toBinaryString(x));`,
    opcoes: ['`1010`', '`1011`', '`1000`', '`10`', '`0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`x - 1` é `1010`, e `1011 & 1010` = `1010`. O truque `x & (x - 1)` sempre desliga o bit 1 mais baixo de x; repetido até zerar, conta quantos bits estão ligados.',
  },
  {
    id: 'estagiario-t2-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int a = 5;
String r = a > 3 ? a > 4 ? "x" : "y" : "z";
System.out.println(r);`,
    opcoes: ['`x`', '`y`', '`z`', 'Não compila: ternário aninhado sem parênteses'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O ternário do meio é o ramo verdadeiro do externo: `a > 3 ? (a > 4 ? "x" : "y") : "z"`. Como 5 > 3 e 5 > 4, o resultado é x. Ternários aninhados compilam sem parênteses, embora fiquem mais legíveis com eles.',
  },
  {
    id: 'estagiario-t2-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int i = 10;
i += i++ + ++i;
System.out.println(i);`,
    opcoes: ['`32`', '`34`', '`33`', '`22`', '`31`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'No `+=`, o valor antigo de `i` (10) é guardado primeiro. Depois: `i++` vale 10 (i = 11), `++i` vale 12 (i = 12). A soma do lado direito é 22, e i recebe 10 + 22 = 32, por cima do 12.',
  },
  {
    id: 'estagiario-t2-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `long l = 5;
int x = (int) l * 2;
double d = x / 4;
System.out.println(d);`,
    opcoes: ['`2.0`', '`2.5`', '`2`', 'Não compila: `(int) l * 2` é `long`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O cast vale só para `l`, então `(int) l * 2` é uma multiplicação de `int`: 10. `x / 4` é divisão inteira, 2, e só depois ampliado para `double`: 2.0.',
  },
  {
    id: 'estagiario-t2-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int a = 7;
boolean b = a % 2 == 1 ? a > 5 : a < 5;
System.out.println(b + " " + (a & 1) + " " + (a >> 1));`,
    opcoes: ['`true 1 3`', '`false 1 3`', '`true 7 3`', '`true 1 14`', '`true 0 3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '7 % 2 é 1, então o ternário avalia `a > 5`, verdadeiro. `a & 1` isola o último bit (1, porque 7 é ímpar). `a >> 1` divide por 2 descartando o resto: 3.',
  },
];

export default prova;
