import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t6-e02',
  minutos: 11,
  aula,
  armadilhas: [
    'Java não tem matriz de verdade: `int[][]` é um array cujas posições guardam `int[]`.',
    '`m.length` é o número de linhas; o tamanho de cada linha é `m[i].length`.',
    '`new int[3][]` compila e deixa as linhas `null`; `new int[][3]` não compila.',
    'Em `new int[3][]`, acessar `m[0][0]` lança `NullPointerException`, porque a linha ainda não existe.',
    'Num array irregular, usar `m.length` como limite das colunas lança `ArrayIndexOutOfBoundsException`.',
    '`int[] a, b[]` faz `b` ser `int[][]`; `int a[][], b` faz `b` ser um `int` comum.',
    '`Arrays.toString` de uma matriz mostra referências; o conteúdo vem com `Arrays.deepToString`.',
    'No for-each externo, a variável é uma linha inteira: `for (int[] linha : m)`.',
  ],
  recursos: [
    {
      titulo: 'JLS 15.10.1: Array Creation Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.10.1',
      tipo: 'documentacao',
      porque: 'A regra que permite omitir só as últimas dimensões, e o exemplo de criação de arrays irregulares.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Arrays',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html',
      tipo: 'documentacao',
      porque: 'O exemplo `MultiDimArrayDemo` mostra um array de arrays com linhas de tamanhos diferentes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Creating Arrays',
      url: 'https://dev.java/learn/language/constructs/basics/arrays/',
      tipo: 'documentacao',
      porque: 'A versão atual do tutorial, com a seção sobre arrays de várias dimensões.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Jagged Arrays in Java',
      url: 'https://www.baeldung.com/java-jagged-arrays',
      tipo: 'artigo',
      porque: 'Como criar, preencher e percorrer arrays com linhas de tamanhos diferentes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 20, Matrizes (Arrays Multidimensionais), parte 1',
      url: 'https://www.youtube.com/watch?v=P66G0rxdL-k',
      tipo: 'video',
      porque: 'Matrizes explicadas como tabelas, com a criação e os dois laços para percorrer, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 21, Loop for each',
      url: 'https://www.youtube.com/watch?v=2ndBbnsqBXQ',
      tipo: 'video',
      porque: 'O for-each percorrendo vetores e matrizes, com a linha inteira na variável do laço externo.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Computer Systems: A Programmer\'s Perspective (Bryant e O\'Hallaron)',
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'O exemplo clássico de somar uma matriz por linhas e por colunas, e por que a primeira forma é mais rápida.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "The Memory Hierarchy": seção 6.2, "Locality"',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os desenhos de arrays irregulares na memória ajudam a responder as questões de criação e acesso.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Understanding Arrays", parte "Working with Multidimensional Arrays"',
    },
  ],
  desafio: {
    titulo: 'Planilha de vendas',
    enunciado:
      'Três vendedores, quatro meses:\n\n```java\nint[][] vendas = {\n    {12, 15, 9, 20},\n    {8, 11, 14, 10},\n    {20, 5, 7, 16}\n};\n```\n\nImprima o total de cada vendedor (as linhas), o total de cada mês (as colunas) e o melhor mês, percorrendo a matriz uma única vez para os dois totais:\n\n```text\nVendedor 1: 56\nVendedor 2: 43\nVendedor 3: 48\nPor mês: [40, 31, 30, 46]\nMelhor mês: 4 (46)\n```',
    dicas: [
      'Crie um `int[] porMes` com o tamanho de uma linha, `vendas[0].length`.',
      'No laço de dentro, some o valor no total da linha e também em `porMes[j]`.',
      'Para o melhor mês, guarde o índice, como no desafio do episódio anterior, e some 1 ao imprimir.',
    ],
    solucao: `import java.util.Arrays;

public class Planilha {
    public static void main(String[] args) {
        int[][] vendas = {
            {12, 15, 9, 20},
            {8, 11, 14, 10},
            {20, 5, 7, 16}
        };
        int[] porMes = new int[vendas[0].length];
        for (int i = 0; i < vendas.length; i++) {
            int total = 0;
            for (int j = 0; j < vendas[i].length; j++) {
                total += vendas[i][j];
                porMes[j] += vendas[i][j];
            }
            System.out.println("Vendedor " + (i + 1) + ": " + total);
        }
        System.out.println("Por mês: " + Arrays.toString(porMes));

        int melhor = 0;
        for (int j = 1; j < porMes.length; j++) {
            if (porMes[j] > porMes[melhor]) melhor = j;
        }
        System.out.println("Melhor mês: " + (melhor + 1) + " (" + porMes[melhor] + ")");
    }
}`,
    saida: 'Vendedor 1: 56\nVendedor 2: 43\nVendedor 3: 48\nPor mês: [40, 31, 30, 46]\nMelhor mês: 4 (46)',
    comentarios:
      'O total por linha é uma variável local, zerada a cada vendedor; o total por coluna precisa de um array, porque as colunas são acumuladas ao longo de todas as linhas. O laço lê a matriz linha por linha, a ordem que aproveita o cache. Usar `vendas[i].length` no laço de dentro deixa o código correto até se as linhas tiverem tamanhos diferentes.',
  },
  exercicios: [
    {
      id: 'estagiario-t6-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `int[][] m = new int[3][5];
System.out.println(m.length + " " + m[0].length);`,
      opcoes: ['`3 5`', '`5 3`', '`15 5`', '`3 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A primeira dimensão é a quantidade de linhas, `m.length`. Cada linha é um `int[]` de 5 posições.',
    },
    {
      id: 'estagiario-t6-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int[][] t = {{1, 2, 3}, {4}, {5, 6}};
System.out.println(t.length + " " + t[1].length + " " + t[2][1]);`,
      resposta: '3 1 6',
      explicacao: 'São 3 linhas, de tamanhos 3, 1 e 2. A linha 2 é `{5, 6}`, e a posição 1 dela guarda o 6.',
    },
    {
      id: 'estagiario-t6-e02-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais linhas compilam? Escolha três.',
      opcoes: [
        '`int[][] a = new int[2][];`',
        '`int[][] b = new int[2][3];`',
        '`int[][] c = {{1}, {2, 3}};`',
        '`int[][] d = new int[][2];`',
        '`int[][] e = new int[2];`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Só a primeira dimensão é obrigatória, e linhas de tamanhos diferentes são permitidas. `new int[][2]` omite a dimensão errada, e `new int[2]` cria um `int[]`, que não cabe numa variável `int[][]`.',
    },
    {
      id: 'estagiario-t6-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `int[][] m = new int[2][];
m[0] = new int[3];
System.out.println(m[0].length + m[1].length);`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `3`',
        'Imprime `6`',
        'Lança `ArrayIndexOutOfBoundsException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'Só a linha 0 foi criada. A linha 1 continua `null`, e ler `length` de `null` lança `NullPointerException`.',
    },
    {
      id: 'estagiario-t6-e02-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `int a[][], b;
a = new int[2][2];
b = new int[2];
System.out.println(a.length);`,
      opcoes: ['Não compila na linha 3', 'Imprime `2`', 'Não compila na linha 1', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'Os colchetes depois do nome valem só para `a`. `b` é um `int` comum e não pode receber um array.',
    },
    {
      id: 'estagiario-t6-e02-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o tipo da variável do for-each externo. O programa deve imprimir `15`.',
      codigo: `public class Percorre {
    public static void main(String[] args) {
        int[][] m = {{1, 2}, {3, 4}, {5}};
        int soma = 0;
        for (___ linha : m) {
            for (int v : linha) {
                soma += v;
            }
        }
        System.out.println(soma);
    }
}`,
      respostas: ['int[]', 'var'],
      saida: '15',
      explicacao: 'Cada elemento de um `int[][]` é um `int[]`, a linha inteira. Com `var`, o compilador deduz o mesmo tipo.',
    },
    {
      id: 'estagiario-t6-e02-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int[][] m = {{1, 2}, {3, 4}};
int[] linha = m[0];
linha[1] = 9;
m[0] = new int[] {7, 7};
System.out.println(linha[1] + " " + m[0][1] + " " + m[1][0]);`,
      opcoes: ['`9 7 3`', '`9 9 3`', '`2 7 3`', '`7 7 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`linha` aponta para o mesmo array da linha 0, então `linha[1] = 9` muda a matriz. Depois, a posição 0 da matriz passa a apontar para um array novo, mas `linha` continua no antigo.',
    },
    {
      id: 'estagiario-t6-e02-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Tabuleiro {
    public static void main(String[] args) {
        char[][] casas = new char[3][3];
        int[][] pontos = new int[2][];
        int[][] erros = new int[][4];
        System.out.println(casas.length + pontos.length + erros.length);
    }
}`,
      resposta: 5,
      explicacao: 'A primeira dimensão é obrigatória: ela diz quantas linhas o array externo guarda. `new int[2][]` está certo; `new int[][4]` não.',
    },
    {
      id: 'estagiario-t6-e02-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Dado `int[][] m = {{1, 2}, {3, 4}};`, qual chamada imprime `[[1, 2], [3, 4]]`?',
      opcoes: [
        '`System.out.println(Arrays.deepToString(m));`',
        '`System.out.println(Arrays.toString(m));`',
        '`System.out.println(m);`',
        '`System.out.println(m.toString());`',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '[[1, 2], [3, 4]]' },
      codigoVerificacao: `int[][] m = {{1, 2}, {3, 4}};
System.out.println(Arrays.deepToString(m));`,
      explicacao: '`Arrays.toString` imprime cada linha com o `toString` padrão, algo como `[I@1b6d3586`. Só o `deepToString` desce nos arrays internos.',
    },
    {
      id: 'estagiario-t6-e02-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int[][] m = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
int diag = 0;
for (int i = 0; i < m.length; i++) {
    diag += m[i][i];
}
System.out.println(diag + " " + m[2][0]);`,
      resposta: '15 7',
      explicacao: 'A diagonal principal tem linha igual à coluna: 1 + 5 + 9 = 15. `m[2][0]` é a primeira coluna da última linha.',
    },
    {
      id: 'estagiario-t6-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `int[][] m = new int[4][2];
for (int i = 0; i < m.length; i++) {
    for (int j = 0; j < m.length; j++) {
        m[i][j] = 1;
    }
}
System.out.println("ok");`,
      opcoes: [
        'Lança `ArrayIndexOutOfBoundsException`',
        'Imprime `ok`',
        'Preenche só as duas primeiras linhas e imprime `ok`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      explicacao: 'O laço de dentro usa `m.length`, que é 4, mas cada linha tem só 2 colunas. Em `m[0][2]`, o índice passa do limite. O certo é `j < m[i].length`.',
    },
    {
      id: 'estagiario-t6-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quantos objetos array a expressão `new int[3][4]` cria?',
      opcoes: ['4', '1', '3', '12'],
      resposta: 0,
      explicacao: 'O array externo, com 3 referências, e as 3 linhas, cada uma um `int[4]` separado. Os 12 números não são objetos: ficam dentro das linhas.',
    },
    {
      id: 'estagiario-t6-e02-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Em quais declarações `x` é do tipo `int[][]`? Escolha três.',
      opcoes: [
        '`int[][] x;`',
        '`int x[][];`',
        '`int[] x[];`',
        '`int[] y, x;`',
        '`int[][] y, x[];`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Os pares de colchetes se somam, estejam depois do tipo ou do nome. Em `int[] y, x`, `x` é `int[]`. Em `int[][] y, x[]`, `x` ganha mais um par e vira `int[][][]`.',
    },
    {
      id: 'estagiario-t6-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Numa matriz grande, por que somar com `i` no laço de fora e `j` no de dentro (`m[i][j]`) costuma ser mais rápido que o contrário?',
      opcoes: [
        'Porque os números de uma linha ficam lado a lado na memória, e a leitura em sequência aproveita o cache',
        'Porque o compilador só otimiza laços em que `j` está dentro',
        'Porque a ordem contrária faz mais somas',
        'Porque a ordem contrária lança exceções que precisam ser tratadas',
      ],
      resposta: 0,
      explicacao: 'O número de operações é o mesmo. Percorrer coluna por coluna salta para uma linha diferente a cada leitura, e cada salto pode custar uma ida à memória principal, muito mais lenta que o cache.',
    },
    {
      id: 'estagiario-t6-e02-q15',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int[][][] cubo = new int[2][3][4];
cubo[1][2][3] = 5;
System.out.println(cubo.length + " " + cubo[0].length + " " + cubo[0][0].length + " " + cubo[1][2][3]);`,
      resposta: '2 3 4 5',
      explicacao: 'Cada nível é um array de arrays: 2 blocos, cada um com 3 linhas de 4 números. `cubo[1][2][3]` é a última posição de todas.',
    },
  ],
};

export default episodio;
