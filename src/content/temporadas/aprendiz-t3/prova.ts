import type { Exercicio } from '../../types';

/** Prova da temporada Aprendiz T3: matemática para programar. */
const prova: Exercicio[] = [
  {
    id: 'aprendiz-t3-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual fórmula é equivalente a ¬(p → q), a negação da implicação?',
    opcoes: ['p ∧ ¬q', '¬p → ¬q', '¬p ∧ q', '¬p ∨ q', 'q → p', '¬p ∧ ¬q'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: 'true' },
    codigoVerificacao: `boolean[] v = {false, true};
boolean ok = true;
for (boolean p : v) for (boolean q : v) {
    boolean negacao = !(!p || q);
    if (negacao != (p && !q)) ok = false;
}
System.out.println(ok);`,
    explicacao: 'p → q ≡ ¬p ∨ q. Negando com De Morgan: ¬(¬p ∨ q) ≡ p ∧ ¬q. Faz sentido: a única forma de uma promessa "se p, então q" ser quebrada é p acontecer e q não. ¬p → ¬q é a inversa, que não equivale nem à implicação nem à sua negação.',
  },
  {
    id: 'aprendiz-t3-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `Set<Integer> a = new TreeSet<>(List.of(1, 2, 3, 4, 5, 6));
Set<Integer> b = new TreeSet<>(List.of(4, 5, 6, 7, 8));
Set<Integer> c = new TreeSet<>(a);
c.removeAll(b);
Set<Integer> d = new TreeSet<>(b);
d.removeAll(a);
c.addAll(d);
System.out.println(c);`,
    opcoes: ['`[1, 2, 3, 7, 8]`', '`[4, 5, 6]`', '`[1, 2, 3]`', '`[1, 2, 3, 4, 5, 6, 7, 8]`', '`[7, 8]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`c` fica com A − B = {1, 2, 3} e `d` com B − A = {7, 8}. A união das duas diferenças é a **diferença simétrica**: os elementos que estão em exatamente um dos conjuntos. É o XOR dos conjuntos.',
  },
  {
    id: 'aprendiz-t3-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `List<Integer> v = List.of();
List<Integer> w = List.of(2, 4, 7);
System.out.println(v.stream().allMatch(x -> x > 100) + " "
        + v.stream().anyMatch(x -> x > 100) + " "
        + !w.stream().allMatch(x -> x % 2 == 0) + " "
        + w.stream().noneMatch(x -> x % 2 != 0));`,
    opcoes: [
      '`true false true false`',
      '`false false true false`',
      '`true false false true`',
      '`true true true false`',
      '`false false false true`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Na lista vazia, "todos" é verdadeiro (não há contraexemplo) e "existe" é falso (não há exemplo). Em `w`, o 7 é ímpar: "nem todos são pares" é verdadeiro, e "nenhum é ímpar" é falso. Repare que as duas últimas são negações uma da outra, como ¬∀ ≡ ∃¬.',
  },
  {
    id: 'aprendiz-t3-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int p = 0b101;
p |= 0b010;
p &= ~0b001;
System.out.println(p);`,
    opcoes: ['`6`', '`7`', '`4`', '`5`', '`2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Vendo os bits como um conjunto: `|=` acrescenta o elemento do meio (`101` vira `111`, 7) e `&= ~` retira o de baixo (`111` vira `110`, 6). É a união e a diferença de conjuntos guardados num `int`.',
  },
  {
    id: 'aprendiz-t3-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println((short) 40000);`,
    opcoes: ['`-25536`', '`40000`', '`-40000`', '`25536`', '`7232`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Um `short` vai até 32.767. O cast fica com os 16 bits de baixo, e o resultado é 40.000 − 2¹⁶ = 40.000 − 65.536 = −25.536. O cast explícito faz o código compilar, mesmo com um valor fora da faixa.',
  },
  {
    id: 'aprendiz-t3-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int x = Integer.MAX_VALUE;
long a = x + 1;
long b = x + 1L;
long c = (long) x + 1;
System.out.println(a + " " + b + " " + c);`,
    opcoes: [
      '`-2147483648 2147483648 2147483648`',
      '`2147483648 2147483648 2147483648`',
      '`-2147483648 -2147483648 2147483648`',
      '`-2147483648 2147483648 -2147483648`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Em `a`, a soma é entre dois `int`, estoura e só depois vira `long`. Em `b`, o literal `1L` promove a conta para `long`. Em `c`, o cast vale para `x` (tem precedência maior que o `+`), então a conta também é feita em `long`.',
  },
  {
    id: 'aprendiz-t3-prova-q07',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais expressões lançam `ArithmeticException` quando executadas? Escolha duas.',
    opcoes: [
      '`Math.addExact(Integer.MAX_VALUE, 1)`',
      '`Math.toIntExact(3_000_000_000L)`',
      '`Integer.MAX_VALUE + 1`',
      '`Math.abs(Integer.MIN_VALUE)`',
      '`Integer.MIN_VALUE / -1`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'executa', saida: 'true true false false false' },
    codigoVerificacao: `boolean[] lanca = new boolean[5];
try { Math.addExact(Integer.MAX_VALUE, 1); } catch (ArithmeticException e) { lanca[0] = true; }
try { Math.toIntExact(3_000_000_000L); } catch (ArithmeticException e) { lanca[1] = true; }
try { int x = Integer.MAX_VALUE + 1; } catch (ArithmeticException e) { lanca[2] = true; }
try { Math.abs(Integer.MIN_VALUE); } catch (ArithmeticException e) { lanca[3] = true; }
try { int y = Integer.MIN_VALUE / -1; } catch (ArithmeticException e) { lanca[4] = true; }
System.out.println(lanca[0] + " " + lanca[1] + " " + lanca[2] + " " + lanca[3] + " " + lanca[4]);`,
    explicacao: 'Só os métodos `Exact` avisam do overflow, e 3 bilhões não cabem num `int`. As outras três estouram em silêncio: MAX + 1 dá MIN, `Math.abs(MIN)` dá MIN e MIN ÷ (−1) também dá MIN. A única exceção da aritmética comum de inteiros é a divisão por zero.',
  },
  {
    id: 'aprendiz-t3-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `byte b = (byte) 0x9C;
System.out.println((b >> 2) + " " + ((b & 0xFF) >> 2));`,
    opcoes: ['`-25 39`', '`39 39`', '`-25 -25`', '`39 -25`', '`-100 156`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`0x9C` é 156, que no `byte` vira 156 − 256 = −100. No `>>`, o `byte` é promovido a `int` com extensão de sinal, e −100 ÷ 4 = −25. Com a máscara `& 0xFF`, o valor volta a ser 156, e 156 ÷ 4 = 39.',
  },
  {
    id: 'aprendiz-t3-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `float f = 0.1f;
double d = f;
System.out.println(d == 0.1);
System.out.println(f == 0.1f);`,
    opcoes: [
      '`false\ntrue`',
      '`true\ntrue`',
      '`false\nfalse`',
      '`true\nfalse`',
      'Não compila: `float` não pode ser atribuído a `double`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`0.1f` é o `float` mais próximo de 0,1, com 24 bits de precisão. Ao virar `double`, ele não ganha precisão: continua valendo 0,100000001490116..., enquanto o literal `0.1` é o `double` mais próximo de 0,1, com 53 bits. São números diferentes. Já `f == 0.1f` compara o mesmo `float` com ele mesmo.',
  },
  {
    id: 'aprendiz-t3-prova-q10',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais expressões valem `true`? Escolha três.',
    opcoes: [
      '`Double.isNaN(0.0 / 0)`',
      '`1.0 / 0 > Double.MAX_VALUE`',
      '`0.0 == -0.0`',
      '`Double.NaN == Double.NaN`',
      '`Double.MIN_VALUE < 0`',
      '`(0.1 + 0.2) + 0.3 == 0.1 + (0.2 + 0.3)`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'executa', saida: 'true true true false false false' },
    codigoVerificacao: `System.out.println(Double.isNaN(0.0 / 0) + " " + (1.0 / 0 > Double.MAX_VALUE) + " " + (0.0 == -0.0)
        + " " + (Double.NaN == Double.NaN) + " " + (Double.MIN_VALUE < 0)
        + " " + ((0.1 + 0.2) + 0.3 == 0.1 + (0.2 + 0.3)));`,
    explicacao: '0/0 é NaN, e infinito é maior que qualquer número finito. O `==` numérico considera 0,0 e −0,0 iguais. Já NaN é diferente de tudo, `Double.MIN_VALUE` é o menor **positivo**, e a soma de ponto flutuante não é associativa: um lado dá 0,6000000000000001 e o outro, 0,6.',
  },
  {
    id: 'aprendiz-t3-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `BigDecimal a = new BigDecimal("1.10");
BigDecimal b = new BigDecimal("1.1");
System.out.println(a.equals(b) + " " + (a.compareTo(b) == 0) + " " + a.add(b));`,
    opcoes: [
      '`false true 2.20`',
      '`true true 2.2`',
      '`false true 2.2`',
      '`false false 2.20`',
      '`true false 2.20`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`equals` compara valor e escala (2 casas contra 1), então é falso; `compareTo` compara só o valor. Na soma, o resultado fica com a maior escala dos dois operandos: 2,20.',
  },
  {
    id: 'aprendiz-t3-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println((int) 2.9 + (int) -2.9 + Math.round(2.5) + Math.round(-2.5));`,
    opcoes: ['`1`', '`0`', '`2`', '`-1`', '`3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O cast trunca em direção a zero: 2 e −2. `Math.round` manda os empates para +∞: 2,5 vira 3 e −2,5 vira −2. Somando: 2 − 2 + 3 − 2 = 1. Quem acha que `round` é simétrico chega em 0.',
  },
  {
    id: 'aprendiz-t3-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(-13 % 4 + " " + Math.floorMod(-13, 4) + " " + -13 / 4 + " " + Math.floorDiv(-13, 4));`,
    opcoes: ['`-1 3 -3 -4`', '`3 3 -4 -4`', '`-1 -1 -3 -3`', '`3 -1 -4 -3`', '`-1 3 -4 -3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `/` arredonda −3,25 para zero (−3), e o `%` completa: −13 = (−3) · 4 + (−1). O `floorDiv` arredonda para baixo (−4), e o `floorMod` completa: −13 = (−4) · 4 + 3. Com divisor positivo, `floorMod` nunca é negativo.',
  },
  {
    id: 'aprendiz-t3-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Hoje é quarta-feira. Que dia da semana será daqui a 1.000 dias?',
    opcoes: ['Terça-feira', 'Quarta-feira', 'Segunda-feira', 'Quinta-feira', 'Domingo', 'Sábado'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: 'TUESDAY' },
    codigoVerificacao: `System.out.println(DayOfWeek.WEDNESDAY.plus(1000));`,
    explicacao: 'Só importa o resto por 7: 1000 = 142 · 7 + 6. Andar 6 dias a partir de quarta é o mesmo que voltar 1: terça-feira. Ninguém precisa contar mil dias.',
  },
  {
    id: 'aprendiz-t3-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Quais são o mdc e o mmc de 12 e 18?',
    opcoes: [
      'mdc 6 e mmc 36',
      'mdc 3 e mmc 216',
      'mdc 6 e mmc 216',
      'mdc 2 e mmc 36',
      'mdc 12 e mmc 18',
    ],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '6 36' },
    codigoVerificacao: `int g = BigInteger.valueOf(12).gcd(BigInteger.valueOf(18)).intValue();
System.out.println(g + " " + 12 * 18 / g);`,
    explicacao: 'Por Euclides: mdc(18, 12) = mdc(12, 6) = mdc(6, 0) = 6. E mmc(a, b) = a · b ÷ mdc(a, b) = 216 ÷ 6 = 36. O 216 é só o produto, que é múltiplo comum, mas não o menor.',
  },
  {
    id: 'aprendiz-t3-prova-q16',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre o operador `%` com inteiros em Java são verdadeiras? Escolha duas.',
    opcoes: [
      'Quando não é zero, o resultado tem o sinal do dividendo',
      '`(a / b) * b + a % b == a` vale para quaisquer `a` e `b` com `b != 0`',
      '`x % 0` devolve `x`',
      'Só funciona com `int` e `long`, não com `double`',
      '`Math.floorMod(x, n)` pode ser negativo quando `n` é positivo',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'executa', saida: 'true true' },
    codigoVerificacao: `boolean sinal = true, identidade = true;
for (int a = -20; a <= 20; a++) for (int b = -7; b <= 7; b++) {
    if (b == 0) continue;
    int r = a % b;
    if (r != 0 && Integer.signum(r) != Integer.signum(a)) sinal = false;
    if ((a / b) * b + a % b != a) identidade = false;
}
System.out.println(sinal + " " + identidade);`,
    explicacao: 'A identidade é a definição do `%` na JLS, e é dela que vem o sinal do dividendo. Resto por zero lança `ArithmeticException`, o `%` funciona com `double` (`5.5 % 2` é 1,5) e o `floorMod` com divisor positivo fica sempre entre 0 e n − 1.',
  },
  {
    id: 'aprendiz-t3-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a complexidade do trecho abaixo em função de n?',
    codigo: `for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j *= 2) {
        total++;
    }
}
for (int k = 0; k < n; k++) {
    total++;
}`,
    opcoes: ['O(n log n)', 'O(n²)', 'O(n log n + n²)', 'O(log n)', 'O(n)'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '11264' },
    codigoVerificacao: `int n = 1024;
long total = 0;
for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j *= 2) {
        total++;
    }
}
for (int k = 0; k < n; k++) {
    total++;
}
System.out.println(total);`,
    explicacao: 'O primeiro bloco são n voltas de um laço que dobra `j`: n · log n. O segundo bloco, em sequência, soma n. O termo dominante é n log n. Para n = 1024: 1024 · 10 + 1024 = 11.264 operações.',
  },
  {
    id: 'aprendiz-t3-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A busca binária faz no máximo cerca de 20 comparações num array ordenado de um milhão de elementos. Quantas faz, no máximo, num array de um trilhão (10¹²)?',
    opcoes: ['Cerca de 40', 'Cerca de 20 milhões', 'Cerca de 1 milhão', 'Cerca de 2.000', 'Cerca de 60'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '40' },
    codigoVerificacao: `System.out.println(64 - Long.numberOfLeadingZeros(1_000_000_000_000L));`,
    explicacao: 'Um trilhão é um milhão ao quadrado, e log(n²) = 2 · log n: o dobro de comparações, 40. Multiplicar a entrada por um milhão só acrescentou 20 passos. É a força do O(log n).',
  },
  {
    id: 'aprendiz-t3-prova-q19',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais afirmações sobre a notação Big-O são verdadeiras? Escolha duas.',
    opcoes: [
      'Se f(n) = O(n), então também vale f(n) = O(n²)',
      'log₂ n e log₁₀ n pertencem à mesma classe, O(log n)',
      'O(2ⁿ) e O(3ⁿ) são a mesma classe, porque a base é uma constante',
      'n² = O(n log n)',
      'Um algoritmo O(n log n) é sempre mais rápido que um O(n²), para qualquer n',
    ],
    respostas: [0, 1],
    explicacao: 'Big-O é limite superior, então todo O(n) também é O(n²). Logaritmos de bases diferentes diferem por um fator constante. Já 3ⁿ ÷ 2ⁿ = 1,5ⁿ cresce sem limite: não há constante que resolva, e as classes são diferentes. E Big-O fala de n grande: para n pequeno, as constantes podem fazer o O(n²) ganhar.',
  },
  {
    id: 'aprendiz-t3-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Um programa testa todos os subconjuntos de um conjunto de n itens, gastando 1 microssegundo por subconjunto. Com n = 30, ele leva cerca de 18 minutos. Quanto tempo levaria com n = 40?',
    opcoes: ['Cerca de 13 dias', 'Cerca de 24 minutos', 'Cerca de 3 horas', 'Cerca de 1 ano', 'Cerca de 30 segundos'],
    resposta: 0,
    explicacao: 'São 2ⁿ subconjuntos. Passar de 30 para 40 multiplica o trabalho por 2¹⁰ = 1024: 18 minutos × 1024 ≈ 18.400 minutos, perto de 13 dias. Quem responde 24 minutos pensou em crescimento linear (30 → 40 é só 33% a mais).',
  },
];

export default prova;
