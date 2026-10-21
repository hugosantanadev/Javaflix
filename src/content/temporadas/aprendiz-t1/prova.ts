import type { Exercicio } from '../../types';

/** Prova da temporada Aprendiz T1: do bit ao processador. */
const prova: Exercicio[] = [
  {
    id: 'aprendiz-t1-prova-q01',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(0b1101 + 0x0D + 015);`,
    opcoes: ['`39`', '`29`', '`41`', '`1311015`', '`35`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Os três literais valem 13: `0b1101` = 8 + 4 + 1, `0x0D` = 13 e `015` é octal, 1×8 + 5 = 13. Somando, 39. Quem lê `015` como decimal chega em 41.',
  },
  {
    id: 'aprendiz-t1-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre bases numéricas são verdadeiras? Escolha três.',
    opcoes: [
      '2⁸ = 256',
      'Um dígito hexadecimal equivale a 4 bits',
      '`0x10` vale 16',
      '1 KiB tem 1000 bytes',
      'Em binário, `10` + `01` = `12`',
      'O maior número sem sinal que cabe em 8 bits é 256',
    ],
    respostas: [0, 1, 2],
    explicacao: 'KiB é o prefixo binário, 1024 bytes. Em binário não existe o dígito 2: `10` + `01` = `11`. E com 8 bits os valores vão de 0 a 255, porque o zero ocupa uma das 256 combinações.',
  },
  {
    id: 'aprendiz-t1-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A expressão `(A AND NOT B) OR (NOT A AND B)` é equivalente a qual porta?',
    opcoes: ['XOR', 'AND', 'OR', 'NAND', 'NOR', 'XNOR'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: 'true' },
    codigoVerificacao: `boolean[] v = {false, true};
boolean igual = true;
for (boolean a : v) for (boolean b : v) if (((a && !b) || (!a && b)) != (a ^ b)) igual = false;
System.out.println(igual);`,
    explicacao: 'A expressão é verdadeira quando A é 1 e B é 0, ou quando A é 0 e B é 1: exatamente quando as entradas diferem. Essa é a definição do ou exclusivo, escrita só com AND, OR e NOT.',
  },
  {
    id: 'aprendiz-t1-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(Integer.toBinaryString(42 ^ 15));`,
    opcoes: ['`100101`', '`101111`', '`1010`', '`111111`', '`37`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '42 é `101010` e 15 é `001111`. O XOR liga os bits que diferem: `100101`, que é 37. O `toBinaryString` imprime os bits, não o decimal.',
  },
  {
    id: 'aprendiz-t1-prova-q05',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Num meio-somador com A = 0 e B = 1, quais são as saídas?',
    opcoes: ['Soma 1 e vai-um 0', 'Soma 0 e vai-um 1', 'Soma 1 e vai-um 1', 'Soma 0 e vai-um 0', 'Soma 01 e vai-um 0'],
    resposta: 0,
    explicacao: 'Soma = A XOR B = 1 e vai-um = A AND B = 0. Só sobe um quando os dois bits são 1.',
  },
  {
    id: 'aprendiz-t1-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Por que a porta NAND é tão importante na construção de chips?',
    opcoes: [
      'Porque qualquer circuito lógico pode ser feito só com ela, e ela é barata de construir com transistores',
      'Porque é a única porta que funciona em alta frequência',
      'Porque guarda um bit mesmo sem energia',
      'Porque substitui a ALU inteira com uma porta só',
      'Porque é a única porta com três entradas',
    ],
    resposta: 0,
    explicacao: 'A NAND é universal: com ela se faz NOT, AND, OR e todo o resto. Em CMOS, ela usa só 4 transistores. Guardar um bit exige realimentação, e nenhuma porta sozinha substitui uma ALU.',
  },
  {
    id: 'aprendiz-t1-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `byte b = 127;
b++;
System.out.println(b);`,
    opcoes: ['`-128`', '`128`', '`0`', 'Não compila', 'Lança `ArithmeticException`', '`127`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '127 é `01111111`. Somando 1, vira `10000000`, que no complemento de dois de 8 bits é -128. O `++` faz o cast de volta para `byte` sozinho, então compila, e overflow nunca lança exceção.',
  },
  {
    id: 'aprendiz-t1-prova-q08',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais destes guardam estado, ou seja, são circuitos sequenciais? Escolha duas.',
    opcoes: ['Registrador', 'Contador de programa (PC)', 'ALU', 'Decodificador', 'Meio-somador'],
    respostas: [0, 1],
    explicacao: 'O PC é um registrador: guarda um endereço entre um ciclo e outro. ALU, decodificador e somadores são combinacionais, e a saída deles depende só das entradas do momento.',
  },
  {
    id: 'aprendiz-t1-prova-q09',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Quantas linhas tem a tabela-verdade de uma expressão com 4 variáveis?',
    opcoes: ['16', '8', '4', '32', '24'],
    resposta: 0,
    explicacao: 'Cada variável dobra o número de combinações: 2⁴ = 16.',
  },
  {
    id: 'aprendiz-t1-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `public class ParImpar {
    static boolean ehPar(int n) {
        return n == 0 || ehImpar(n - 1);
    }

    static boolean ehImpar(int n) {
        return n != 0 && ehPar(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(ehPar(4));
        System.out.println(ehPar(-1));
    }
}`,
    opcoes: [
      'Imprime `true` e depois lança `StackOverflowError`',
      'Imprime `true` e `false`',
      'Imprime `true` e fica rodando para sempre',
      'Não compila: métodos não podem chamar um ao outro',
      'Lança `StackOverflowError` antes de imprimir qualquer coisa',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'StackOverflowError', saida: 'true' },
    explicacao: 'Para 4, as chamadas descem até 0 e devolvem `true`. Para -1, o número só diminui e nunca chega a 0, então as chamadas se acumulam na pilha até ela estourar. Recursão infinita não roda para sempre: ela acaba com a pilha.',
  },
  {
    id: 'aprendiz-t1-prova-q11',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual destes acessos costuma ser o mais lento?',
    opcoes: ['Ler do SSD', 'Ler um registrador', 'Ler do cache L1', 'Ler do cache L3', 'Ler da RAM'],
    resposta: 0,
    explicacao: 'Um SSD responde na casa dos 100 microssegundos, cerca de mil vezes mais devagar que a RAM e cem mil vezes mais devagar que o cache L1.',
  },
  {
    id: 'aprendiz-t1-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Na CPU de brinquedo, o opcode fica nos 4 bits de cima e o endereço nos 4 de baixo. Qual é a saída?',
    codigo: `int instrucao = 0xA7;
System.out.println((instrucao >> 4) + " " + (instrucao & 0xF));`,
    opcoes: ['`10 7`', '`7 10`', '`A 7`', '`167 0`', '`0 167`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O deslocamento traz o nibble de cima (`A` = 10) para baixo, e a máscara `0xF` isola o de baixo (7). Como são `int`, o `println` mostra em decimal: 10, não `A`.',
  },
  {
    id: 'aprendiz-t1-prova-q13',
    tipo: 'multipla',
    dificuldade: 1,
    enunciado: 'O que é verdade sobre o PC (contador de programa)? Escolha duas.',
    opcoes: [
      'Guarda o endereço da próxima instrução',
      'É alterado pelas instruções de salto',
      'Guarda o resultado da última conta da ALU',
      'Só existe em computadores com sistema operacional',
      'Fica na RAM, junto com o programa',
    ],
    respostas: [0, 1],
    explicacao: 'O PC é um registrador dentro da CPU que aponta para a próxima instrução. Saltos funcionam escrevendo nele. O resultado da ALU vai para outros registradores, e todo processador tem PC, com ou sem sistema operacional.',
  },
  {
    id: 'aprendiz-t1-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Quantos bytes a String `"Olá!"` ocupa em UTF-8?',
    codigo: `System.out.println("Olá!".getBytes(java.nio.charset.StandardCharsets.UTF_8).length);`,
    opcoes: ['`5`', '`4`', '`8`', '`6`', '`3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`O`, `l` e `!` estão na faixa ASCII e usam 1 byte cada. O `á` precisa de 2 em UTF-8. Total: 5 bytes para 4 caracteres.',
  },
  {
    id: 'aprendiz-t1-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A condição `!(a && !b)` é equivalente a qual destas?',
    opcoes: ['`!a || b`', '`!a && b`', '`a || !b`', '`!a || !b`', '`a && b`'],
    resposta: 0,
    verificar: { tipo: 'executa', saida: 'true' },
    codigoVerificacao: `boolean[] v = {false, true};
boolean igual = true;
for (boolean a : v) for (boolean b : v) if (!(a && !b) != (!a || b)) igual = false;
System.out.println(igual);`,
    explicacao: 'De Morgan: negar um AND vira OR das negações. A negação de `a` é `!a`, e a de `!b` é `b`. Resultado: `!a || b`.',
  },
  {
    id: 'aprendiz-t1-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o padrão de 8 bits do número -1 em complemento de dois?',
    codigo: `byte menosUm = -1;
System.out.println(Integer.toBinaryString(menosUm & 0xFF));`,
    opcoes: ['`11111111`', '`10000001`', '`00000001`', '`01111111`', '`10000000`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Para negar 1 (`00000001`): inverte os bits (`11111110`) e soma 1, chegando a `11111111`. A máscara `& 0xFF` fica só com os 8 bits do byte. `10000001` seria a representação de "sinal e magnitude", que os computadores não usam para inteiros.',
  },
  {
    id: 'aprendiz-t1-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O que diferencia um flip-flop D de um latch simples?',
    opcoes: [
      'O flip-flop só copia a entrada no instante da borda do clock',
      'O flip-flop guarda dois bits em vez de um',
      'O flip-flop não precisa de energia para manter o valor',
      'O flip-flop é combinacional e o latch é sequencial',
    ],
    resposta: 0,
    explicacao: 'O latch responde enquanto está habilitado; o flip-flop "fotografa" a entrada só na borda do clock. Isso faz todos os registradores do processador mudarem juntos, no mesmo instante.',
  },
  {
    id: 'aprendiz-t1-prova-q18',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Num somador de 8 bits sem sinal, quais somas deixam vai-um no último bit? Escolha duas.',
    opcoes: ['200 + 100', '255 + 1', '100 + 27', '0 + 0', '128 + 127'],
    respostas: [0, 1],
    verificar: { tipo: 'executa', saida: 'true\ntrue\nfalse\nfalse\nfalse' },
    codigoVerificacao: `int[][] somas = {{200, 100}, {255, 1}, {100, 27}, {0, 0}, {128, 127}};
for (int[] s : somas) System.out.println(s[0] + s[1] > 255);`,
    explicacao: 'Com 8 bits cabem valores até 255. 300 e 256 passam disso e geram o nono bit. 127, 0 e 255 cabem.',
  },
];

export default prova;
