import type { Exercicio } from '../../types';

/** Prova da temporada Estagiário T6: arrays e Math. */
const prova: Exercicio[] = [
  {
    id: 'estagiario-t6-prova-q01',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos **não** compilam? Escolha dois.',
    opcoes: [
      '`int[] a = new int[2] {1, 2};`',
      '`int[][] b = new int[][2];`',
      '`int c[] = new int[0];`',
      '`int[] d = {};`',
      '`int[][] e = {{}, {1}};`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: 'Tamanho e valores juntos não compilam, e só a primeira dimensão é obrigatória. Arrays de tamanho zero são válidos, com `new int[0]` ou com chaves vazias, inclusive como linhas de uma matriz.',
  },
  {
    id: 'estagiario-t6-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int[] a = {1, 2, 3};
int[] b = Arrays.copyOf(a, a.length);
int[] c = a;
b[0] = 7;
c[1] = 8;
System.out.println(Arrays.toString(a) + Arrays.toString(b));`,
    opcoes: [
      '`[1, 8, 3][7, 2, 3]`',
      '`[7, 8, 3][7, 8, 3]`',
      '`[1, 8, 3][7, 8, 3]`',
      '`[7, 8, 3][7, 2, 3]`',
      '`[1, 2, 3][7, 2, 3]`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`copyOf` cria um array novo, independente: mudar `b` não afeta `a`. Já `c = a` copia só a referência, e `c[1] = 8` muda o próprio `a`.',
  },
  {
    id: 'estagiario-t6-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `int[][] m = new int[2][];
m[0] = new int[] {1, 2};
for (int[] linha : m) {
    System.out.print(linha.length);
}`,
    opcoes: [
      'Imprime `2` e lança `NullPointerException`',
      'Imprime `20`',
      'Imprime `22`',
      'Lança `ArrayIndexOutOfBoundsException`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: '2' },
    explicacao: 'A linha 0 foi criada e tem tamanho 2. A linha 1 nunca recebeu um array e continua `null`: ler `length` dela lança `NullPointerException`.',
  },
  {
    id: 'estagiario-t6-prova-q04',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `String[] nomes = {"Caio", "ana", "Bia", "Duda"};
Arrays.sort(nomes);
System.out.println(Arrays.binarySearch(nomes, "Bia") + " " + Arrays.binarySearch(nomes, "Ana"));`,
    opcoes: ['`0 -1`', '`1 -1`', '`0 -2`', '`2 -1`', '`-1 0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Maiúsculas vêm antes das minúsculas: a ordem é `[Bia, Caio, Duda, ana]`, e "Bia" está na posição 0. "Ana" não existe e deveria entrar na posição 0, antes de "Bia": -0 - 1 = -1.',
  },
  {
    id: 'estagiario-t6-prova-q05',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `System.out.println(Arrays.compare(new int[] {1, 5}, new int[] {1, 2, 9}) > 0);
System.out.println(Arrays.compare(new String[] {"a"}, new String[] {"A"}) > 0);
System.out.println(Arrays.mismatch(new int[] {4, 4}, new int[] {4, 4}));`,
    resposta: 'true\ntrue\n-1',
    explicacao: 'No primeiro, a posição 1 decide antes do tamanho: 5 é maior que 2. No segundo, "a" vem depois de "A" na ordem natural. Arrays iguais têm `mismatch` -1.',
  },
  {
    id: 'estagiario-t6-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `String[] arr = {"x", "y", "z"};
List<String> lista = Arrays.asList(arr);
arr[1] = "w";
lista.set(0, "v");
System.out.println(lista + " " + arr[0]);`,
    opcoes: [
      '`[v, w, z] v`',
      '`[v, y, z] x`',
      '`[x, w, z] v`',
      '`[v, w, z] x`',
      'Lança `UnsupportedOperationException`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A lista do `asList` lê e escreve no próprio array. A mudança no array aparece na lista, e o `set` da lista muda o array. O `set` é permitido, porque não muda o tamanho.',
  },
  {
    id: 'estagiario-t6-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
int e = 128;
System.out.println((a == b) + " " + (c == d) + " " + (c == e));`,
    opcoes: [
      '`true false true`',
      '`true true true`',
      '`true false false`',
      '`false false true`',
      '`true true false`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '127 está no cache, e `a` e `b` são o mesmo objeto. 128 está fora, e `c` e `d` são objetos diferentes. Em `c == e`, um lado é primitivo, então `c` é desembrulhado e a comparação é de valores.',
  },
  {
    id: 'estagiario-t6-prova-q08',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais linhas compilam? Escolha três.',
    opcoes: [
      '`Integer i = Integer.parseInt("1");`',
      '`int j = Integer.valueOf("2");`',
      '`Character c = \'x\';`',
      '`Long l = Integer.valueOf(3);`',
      '`Double d = 4;`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'O `int` do `parseInt` é embrulhado num `Integer`, o `Integer` do `valueOf` é desembrulhado num `int`, e o `char` vira `Character`. Um `Integer` não é um `Long`, e um `int` não vira `Double` direto.',
  },
  {
    id: 'estagiario-t6-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `List<Integer> numeros = new ArrayList<>(List.of(1, 2, 3, 4));
numeros.remove(Integer.valueOf(1));
numeros.remove(1);
System.out.println(numeros);`,
    opcoes: ['`[2, 4]`', '`[3, 4]`', '`[2, 3]`', '`[1, 4]`', '`[4]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Primeiro sai o **valor** 1, e a lista vira `[2, 3, 4]`. Depois, `remove(1)` tira o **índice** 1, o 3. Sobra `[2, 4]`.',
  },
  {
    id: 'estagiario-t6-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `Integer[] valores = new Integer[3];
valores[0] = 5;
int soma = 0;
for (int v : valores) {
    soma += v;
}
System.out.println(soma);`,
    opcoes: [
      'Lança `NullPointerException`',
      'Imprime `5`',
      'Imprime `0`',
      'Não compila',
      'Lança `ArrayIndexOutOfBoundsException`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NullPointerException' },
    explicacao: 'Um `Integer[]` começa cheio de `null`, não de zeros. A variável do laço é `int`, então cada elemento é desembrulhado, e o segundo, `null`, lança a exceção.',
  },
  {
    id: 'estagiario-t6-prova-q11',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `double x = 7.5;
System.out.println(Math.round(x) + Math.ceil(x) + " " + Math.floor(-x) + " " + (int) -x);`,
    resposta: '16.0 -8.0 -7',
    explicacao: '`round(7.5)` é 8, um `long`, e `ceil(7.5)` é 8.0: a soma é `double`, 16.0. O `floor` de -7.5 vai para -8.0, longe do zero, enquanto o cast para `int` só corta a parte decimal: -7.',
  },
  {
    id: 'estagiario-t6-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado?',
    codigo: `int base = 2;
int quadrado = Math.pow(base, 2);
System.out.println(quadrado);`,
    opcoes: ['Não compila', 'Imprime `4`', 'Imprime `4.0`', 'Lança exceção'],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 2 },
    explicacao: '`Math.pow` sempre devolve `double`, mesmo com argumentos inteiros, e um `double` não cabe num `int` sem cast. Com `(int) Math.pow(base, 2)` compilaria.',
  },
  {
    id: 'estagiario-t6-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Na declaração `int[] a, b[], c[][];`, quais são os tipos?',
    opcoes: [
      '`a` é `int[]`, `b` é `int[][]` e `c` é `int[][][]`',
      'Os três são `int[]`',
      '`a` é `int[]`, `b` é `int[]` e `c` é `int[][]`',
      '`a` é `int`, `b` é `int[]` e `c` é `int[][]`',
      'A declaração não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'executa', saida: '6' },
    codigoVerificacao: `int[] a, b[], c[][];
a = new int[1];
b = new int[2][2];
c = new int[3][3][3];
System.out.println(a.length + b.length + c.length);`,
    explicacao: 'Os colchetes depois do tipo valem para todas as variáveis, e os depois de cada nome se somam a eles.',
  },
  {
    id: 'estagiario-t6-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int[] v = {9, 7, 5, 3, 1};
Arrays.sort(v, 1, 4);
System.out.println(Arrays.toString(v));`,
    opcoes: [
      '`[9, 3, 5, 7, 1]`',
      '`[1, 3, 5, 7, 9]`',
      '`[9, 1, 3, 5, 7]`',
      '`[3, 5, 7, 9, 1]`',
      '`[9, 5, 3, 1, 7]`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O intervalo vai do índice 1 (incluído) ao 4 (excluído): só o 7, o 5 e o 3 são ordenados. As pontas ficam onde estavam.',
  },
  {
    id: 'estagiario-t6-prova-q15',
    tipo: 'lacuna',
    dificuldade: 1,
    enunciado: 'Complete para imprimir o conteúdo da matriz. O programa deve imprimir `[[1, 2], [3]]`.',
    codigo: `import java.util.Arrays;

public class Matriz {
    public static void main(String[] args) {
        int[][] m = {{1, 2}, {3}};
        System.out.println(Arrays.___(m));
    }
}`,
    respostas: ['deepToString'],
    saida: '[[1, 2], [3]]',
    explicacao: '`deepToString` desce nos arrays internos. `toString` mostraria a referência de cada linha, algo como `[[I@1b6d3586, [I@4554617c]`.',
  },
  {
    id: 'estagiario-t6-prova-q16',
    tipo: 'linha',
    dificuldade: 1,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `public class Tamanho {
    public static void main(String[] args) {
        int[] numeros = {3, 1, 2};
        java.util.Arrays.sort(numeros);
        int total = numeros.length();
        System.out.println(total);
    }
}`,
    resposta: 5,
    explicacao: 'Em arrays, `length` é campo, sem parênteses. Com parênteses, é o método da `String`.',
  },
  {
    id: 'estagiario-t6-prova-q17',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `int[][] m = {{1, 2}, {3, 4}};
int[][] c = Arrays.copyOf(m, 2);
c[0][0] = 9;
c[1] = new int[] {7};
System.out.println(m[0][0] + " " + m[1].length);`,
    opcoes: ['`9 2`', '`1 2`', '`9 1`', '`1 1`', 'Lança exceção'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`copyOf` cria um array externo novo, mas copia as **referências** das linhas: `c[0]` e `m[0]` são o mesmo array, e o 9 aparece em `m`. Trocar `c[1]` por outro array não afeta `m[1]`, que continua com 2 posições.',
  },
  {
    id: 'estagiario-t6-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O que a especificação da linguagem **garante** sobre o autoboxing de valores `int`?',
    opcoes: [
      'Valores de -128 a 127 sempre resultam no mesmo objeto',
      'Todo valor resulta sempre no mesmo objeto',
      'Cada autoboxing cria sempre um objeto novo',
      'Valores de 0 a 255 sempre resultam no mesmo objeto',
      'Nada: depende totalmente da JVM',
    ],
    resposta: 0,
    explicacao: 'A JLS exige o cache de -128 a 127. Fora dessa faixa, a JVM pode ou não reaproveitar objetos (o limite de cima pode ser aumentado por opção), então `==` fora dela não é confiável. A única comparação segura de valores é `equals`.',
  },
  {
    id: 'estagiario-t6-prova-q19',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais linhas compilam? Escolha duas.',
    opcoes: [
      '`long a = Math.round(1.5);`',
      '`double b = Math.max(1, 2);`',
      '`int c = Math.round(1.5);`',
      '`int d = Math.sqrt(4);`',
      '`float e = Math.pow(2, 2);`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`round(double)` devolve `long`, e `max(int, int)` devolve `int`, que é alargado para `double` sem problema. `sqrt` e `pow` devolvem `double`, que não cabe em `int` nem em `float` sem cast, e o `long` do `round` não cabe num `int`.',
  },
  {
    id: 'estagiario-t6-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `String[] partes = "10,20,x,30".split(",");
int soma = 0;
for (String p : partes) {
    try {
        soma += Integer.parseInt(p);
    } catch (NumberFormatException e) {
        soma -= 1;
    }
}
System.out.println(soma);`,
    opcoes: ['`59`', '`60`', '`30`', 'Lança `NumberFormatException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O "x" lança `NumberFormatException`, que é tratada dentro do laço e subtrai 1. Os outros três somam 60: o total é 59.',
  },
];

export default prova;
