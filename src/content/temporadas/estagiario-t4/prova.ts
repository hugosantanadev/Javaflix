import type { Exercicio } from '../../types';

/** Prova da temporada Estagiário T4: laços. */
const prova: Exercicio[] = [
  {
    id: 'estagiario-t4-prova-q01',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int i = 0, s = 0;
while (i++ < 5) s += i;
System.out.println(s + " " + i);`,
    opcoes: ['`15 6`', '`10 5`', '`15 5`', '`10 6`', '`21 6`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os testes comparam 0, 1, 2, 3 e 4 com 5, e o corpo soma os valores já incrementados: 1 + 2 + 3 + 4 + 5 = 15. O último teste (5 < 5) falha, mas também incrementa: `i` termina em 6.',
  },
  {
    id: 'estagiario-t4-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int n = 10;
do {
    n -= 4;
} while (n > 0);
System.out.println(n);`,
    opcoes: ['`-2`', '`2`', '`6`', '`0`', '`-6`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'n passa por 6, 2 e −2. Depois do −2, o teste `n > 0` falha. A variável guarda o primeiro valor que falhou.',
  },
  {
    id: 'estagiario-t4-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int total = 0;
for (int i = 0, j = 10; i < j; i++, j -= 2) total += j - i;
System.out.println(total);`,
    opcoes: ['`22`', '`21`', '`16`', '`30`', '`10`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os pares (i, j) são (0, 10), (1, 8), (2, 6) e (3, 4); depois vem (4, 2), que falha. As diferenças somam 10 + 7 + 4 + 1 = 22.',
  },
  {
    id: 'estagiario-t4-prova-q04',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos compilam? Escolha três.',
    opcoes: [
      '`for (int i = 0, j = 0; i < 3; i++) {}`',
      '`for (int i = 0, int j = 0; i < 3; i++) {}`',
      '`int i; for (i = 0; i < 3; i++) {} System.out.println(i);`',
      '`for (;;) { break; }`',
      '`for (int i = 0; i < 3; i++) {} i = 5;`',
    ],
    respostas: [0, 2, 3],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Várias variáveis do mesmo tipo usam uma só declaração (`int i = 0, j = 0`), sem repetir o tipo. Declarar `i` antes do laço permite usá-la depois. Partes vazias são válidas. A variável declarada no `for` não existe depois dele.',
  },
  {
    id: 'estagiario-t4-prova-q05',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int x = 0;
for (int i = 0; i < 10; i += 3) {
    x += i;
    i--;
}
System.out.println(x);`,
    opcoes: ['`20`', '`18`', '`30`', '`12`', 'O laço nunca termina'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Cada volta anda 3 − 1 = 2: i vale 0, 2, 4, 6 e 8 quando é somado, e o próximo seria 10, que falha. 0 + 2 + 4 + 6 + 8 = 20.',
  },
  {
    id: 'estagiario-t4-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int[] v = {1, 2, 3};
int i = 0;
for (int x : v) v[i++] = x * 2;
System.out.println(Arrays.toString(v));`,
    opcoes: ['`[2, 4, 6]`', '`[1, 2, 3]`', 'Lança `ConcurrentModificationException`', '`[2, 4, 3]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Atribuir à variável do laço não muda o array, mas atribuir a `v[i]` muda. Arrays não lançam `ConcurrentModificationException`: só coleções verificam modificações durante a iteração.',
  },
  {
    id: 'estagiario-t4-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `List<String> nomes = new ArrayList<>(List.of("Ana", "Bia"));
for (String n : nomes) {
    nomes.add(n + "!");
}
System.out.println(nomes);`,
    opcoes: [
      'Lança `ConcurrentModificationException`',
      'Imprime `[Ana, Bia, Ana!, Bia!]`',
      'O laço nunca termina',
      'Imprime `[Ana, Bia]`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'ConcurrentModificationException' },
    explicacao: 'Acrescentar elementos também é uma modificação estrutural. No segundo `next()`, o iterador percebe que a lista mudou desde que ele foi criado e lança a exceção.',
  },
  {
    id: 'estagiario-t4-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `List<String> itens = new ArrayList<>(List.of("a", "b", "c"));
for (String s : itens) {
    if (s.equals("c")) itens.remove(s);
}
System.out.println(itens);`,
    opcoes: [
      'Lança `ConcurrentModificationException`',
      'Imprime `[a, b]`',
      'Imprime `[a, b, c]`',
      'Imprime `[c]`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'ConcurrentModificationException' },
    explicacao: 'Remover o último deixa o iterador na posição 3 com a lista de tamanho 2. O `hasNext()` compara 3 com 2, devolve verdadeiro, e o `next()` detecta a modificação. Só remover o penúltimo escapa da exceção.',
  },
  {
    id: 'estagiario-t4-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int c = 0;
linha:
for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
        if (j == 2) continue linha;
        if (i == 2) break linha;
        c++;
    }
}
System.out.println(c);`,
    opcoes: ['`4`', '`6`', '`8`', '`5`', '`2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com i = 0 e i = 1, o interno conta j = 0 e j = 1 e salta para o próximo i no j = 2. Com i = 2, logo no j = 0 o `break linha` encerra os dois laços. 2 + 2 = 4.',
  },
  {
    id: 'estagiario-t4-prova-q10',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos **não** compilam? Escolha dois.',
    opcoes: [
      '`a: { break a; }`',
      '`a: if (true) { continue a; }`',
      '`for (int i = 0; i < 1; i++) { continue; }`',
      '`int x = 0; while (x < 3) { x++; break; x--; }`',
      '`b: for (;;) { break b; }`',
    ],
    respostas: [1, 3],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: 'O rótulo de um `continue` precisa marcar um laço, e o `x--` depois do `break` é inalcançável. `break` com rótulo funciona em qualquer bloco, e um `continue` no fim do corpo é válido (mesmo que inútil).',
  },
  {
    id: 'estagiario-t4-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int i = 0, impares = 0;
while (i < 10) {
    i++;
    if (i % 2 == 0) continue;
    impares += i;
}
System.out.println(impares);`,
    opcoes: ['`25`', '`30`', '`20`', 'O laço nunca termina', '`55`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O incremento está no começo do corpo, então o `continue` não o pula. Os pares são ignorados e os ímpares de 1 a 9 somados: 1 + 3 + 5 + 7 + 9 = 25.',
  },
  {
    id: 'estagiario-t4-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int c = 0;
for (int i = 1; i <= 4; i++)
    for (int j = 1; j <= 4; j++)
        if ((i + j) % 2 == 0) c++;
System.out.println(c);`,
    opcoes: ['`8`', '`16`', '`4`', '`6`', '`10`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A soma é par quando i e j têm a mesma paridade. Para cada i, dois dos quatro valores de j servem: 4 × 2 = 8. É o número de casas de uma cor num tabuleiro 4 × 4.',
  },
  {
    id: 'estagiario-t4-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `for (int i = 0; i < 3; i++) {
    String s = "";
    for (int j = 0; j < 3; j++) s += (i == j) ? "1" : "0";
    System.out.println(s);
}`,
    opcoes: ['`100\n010\n001`', '`111\n000\n000`', '`001\n010\n100`', '`100100100`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O 1 aparece onde a linha e a coluna coincidem, a diagonal principal: é a matriz identidade. `s` é recriada vazia a cada volta do laço externo.',
  },
  {
    id: 'estagiario-t4-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Com `n = 8`, quantas vezes o corpo executa?',
    codigo: `for (int i = 1; i <= n; i *= 2)
    for (int j = 0; j < n; j++)
        // corpo`,
    opcoes: ['32', '64', '24', '16', '15'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '32' },
    codigoVerificacao: `int n = 8, c = 0;
for (int i = 1; i <= n; i *= 2)
    for (int j = 0; j < n; j++)
        c++;
System.out.println(c);`,
    explicacao: 'O externo passa por 1, 2, 4 e 8: 4 voltas, que é log₂ 8 + 1. Em cada uma, o interno roda 8 vezes: 4 × 8 = 32. Em geral, O(n log n).',
  },
  {
    id: 'estagiario-t4-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int[] v = {2, 4, 6, 8};
int s = 0;
for (int i = v.length - 1; i >= 0; i -= 2) s += v[i];
System.out.println(s);`,
    opcoes: ['`12`', '`20`', '`8`', '`6`', 'Lança `ArrayIndexOutOfBoundsException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O laço começa no último índice (3) e desce de 2 em 2: visita as posições 3 e 1, com 8 e 4. O próximo índice seria −1, que falha o teste antes de ser usado.',
  },
  {
    id: 'estagiario-t4-prova-q16',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `int n = 0;
do {
    n++;
    if (n == 3) break;
} while (true);
System.out.println(n);`,
    opcoes: ['`3`', '`4`', 'O laço nunca termina', 'Não compila: `println` inalcançável'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `while (true)` sozinho tornaria o `println` inalcançável, mas o `break` alcançável dentro do laço permite que ele termine. Ele termina quando n chega a 3.',
  },
  {
    id: 'estagiario-t4-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar o trecho?',
    codigo: `String s = "abc";
for (char c : s) System.out.println(c);`,
    opcoes: [
      'Não compila: `String` não é array nem `Iterable`',
      'Imprime `a`, `b` e `c`, um por linha',
      'Imprime `abc`',
      'Lança `ClassCastException`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: '`String` não implementa `Iterable` e não é um array. Para percorrer os caracteres, use `s.toCharArray()` ou um `for` clássico com `s.charAt(i)`.',
  },
  {
    id: 'estagiario-t4-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int voltas = 0;
for (byte b = 125; b > 0; b += 1) voltas++;
System.out.println(voltas);`,
    opcoes: ['`3`', 'O laço nunca termina', '`2`', 'Não compila: `byte` com `+=`', '`131`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'b passa por 125, 126 e 127. Depois, `b += 1` estoura para −128 (o `+=` tem cast implícito), e o teste falha. Três voltas.',
  },
];

export default prova;
