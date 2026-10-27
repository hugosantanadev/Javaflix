import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t4-e05',
  minutos: 11,
  aula,
  armadilhas: [
    'O laço interno recomeça do zero a cada volta do externo.',
    'Com limites fixos, o total é o produto das voltas; com limite dependente, é uma soma.',
    '`for (j = 0; j < i; j++)` dentro de `for (i = 0; i < n; i++)` executa n(n − 1)/2 vezes.',
    'Uma variável que deve recomeçar a cada linha precisa ser declarada (ou zerada) dentro do laço externo.',
    'Variáveis do laço interno não existem no externo.',
    'Um `break` sem rótulo no laço interno não encerra o externo.',
    'Dois laços aninhados sobre os mesmos n dados custam O(n²).',
  ],
  ia: {
    uso:
      'A IA ajuda a montar a tabela de voltas de laços aninhados e a deduzir a fórmula do total, e é boa em sugerir uma versão O(n) quando o laço interno só procura algo. Peça sempre a contagem volta a volta, não só o número final, para você conferir onde ela errou, se errou.',
    pedido:
      'Conte quantas vezes o corpo interno deste código Java 21 executa.\n<cole os laços aqui>\n- Monte uma linha com o número de voltas do laço interno para cada valor do externo e some.\n- Dê a fórmula em função de n, se houver, e a complexidade em notação O.\n- Diga se existe uma versão com menos voltas para o mesmo resultado.',
    erros: [
      'Multiplica os limites quando o limite interno depende do externo, e o total era uma soma.',
      'Erra por um nos limites com `<=` ou com o interno começando em `i + 1`.',
      'Propõe percorrer uma matriz coluna por coluna sem mencionar o custo de cache.',
    ],
    conferir: [
      'Ponha um contador no corpo interno e rode o código com n pequeno.',
      'Teste a fórmula com dois valores de n diferentes.',
      'Em matrizes irregulares, confira se o limite interno usa `m[i].length`, não `m[0].length`.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: The for Statement',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html',
      tipo: 'documentacao',
      porque: 'A base dos laços que se aninham, com o for-each para percorrer arrays.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Arrays',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html',
      tipo: 'documentacao',
      porque: 'Arrays multidimensionais e como percorrê-los, com o exemplo de array de arrays.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.14.1: The basic for Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.14.1',
      tipo: 'documentacao',
      porque: 'A execução de um `for` dentro de outro segue exatamente as mesmas regras de um `for` sozinho.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Wikipédia: Grande-O',
      url: 'https://pt.wikipedia.org/wiki/Grande-O',
      tipo: 'artigo',
      porque: 'Por que laços aninhados são O(n²) e o que isso significa quando n cresce.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #13, Estruturas de Repetição (Parte 3)',
      url: 'https://www.youtube.com/watch?v=XLqPZh6n8IA',
      tipo: 'video',
      porque: 'Laços `for`, incluindo laços dentro de laços, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os exercícios de laços aninhados do livro são do mesmo tipo das questões de contagem da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção sobre laços aninhados',
    },
  ],
  desafio: {
    titulo: 'Triângulo de Pascal',
    enunciado:
      'Imprima as 6 primeiras linhas do triângulo de Pascal. Cada linha n tem os coeficientes C(n, 0), C(n, 1), ..., C(n, n), e dá para calcular cada um a partir do anterior: C(n, k) = C(n, k − 1) · (n − k + 1) / k. Use dois laços aninhados:\n\n```text\n1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1\n```',
    dicas: [
      'O laço externo vai de n = 0 a 5; o interno, de k = 0 a n.',
      'Comece cada linha com `long c = 1` (que é C(n, 0)) e atualize `c` depois de imprimir.',
      'Multiplique antes de dividir: `c = c * (n - k) / (k + 1)` dá sempre um inteiro exato.',
    ],
    solucao: `import java.util.StringJoiner;

public class Pascal {
    public static void main(String[] args) {
        for (int n = 0; n <= 5; n++) {
            StringJoiner linha = new StringJoiner(" ");
            long c = 1;
            for (int k = 0; k <= n; k++) {
                linha.add(String.valueOf(c));
                c = c * (n - k) / (k + 1);
            }
            System.out.println(linha);
        }
    }
}`,
    saida: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1',
    comentarios:
      'Cada número é a soma dos dois acima dele, mas a fórmula multiplicativa dispensa guardar a linha anterior. Multiplicar antes de dividir é essencial: C(n, k) · (n − k) é sempre divisível por (k + 1), e a divisão inteira sai exata; na ordem inversa, a divisão truncaria. A linha n soma 2ⁿ, o número de subconjuntos de n elementos.',
  },
  bugs: [
    {
      id: 'estagiario-t4-e05-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: variable i is already defined in method main(String[])`.',
      codigo: `public class Tabuada {
    public static void main(String[] args) {
        for (int i = 1; i <= 2; i++) {
            for (int i = 1; i <= 3; i++) {
                System.out.print(i * i);
            }
            System.out.println();
        }
    }
}`,
      linha: 4,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Tabuada {
    public static void main(String[] args) {
        for (int i = 1; i <= 2; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.print(i * j);
            }
            System.out.println();
        }
    }
}`,
      saidaCorrigida: '123\n246',
      dica: 'O `i` do laço externo ainda existe dentro dele. Dá para declarar outro com o mesmo nome?',
      explicacao: 'O laço interno está dentro do escopo do `i` externo, e o Java não deixa uma variável local esconder outra. O laço interno precisa da sua própria variável, por costume `j`, e o corpo multiplica as duas.',
    },
    {
      id: 'estagiario-t4-e05-b02',
      dificuldade: 3,
      sintoma: 'O total do primeiro aluno sai certo, mas os seguintes vêm somados com os anteriores: 15, 29 e 45.',
      codigo: `public class Notas {
    public static void main(String[] args) {
        int[][] notas = {{7, 8}, {5, 9}, {10, 6}};
        int soma = 0;
        for (int[] aluno : notas) {
            for (int n : aluno) {
                soma += n;
            }
            System.out.println("Total do aluno: " + soma);
        }
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: 'Total do aluno: 15\nTotal do aluno: 29\nTotal do aluno: 45' },
      correcao: `public class Notas {
    public static void main(String[] args) {
        int[][] notas = {{7, 8}, {5, 9}, {10, 6}};
        for (int[] aluno : notas) {
            int soma = 0;
            for (int n : aluno) {
                soma += n;
            }
            System.out.println("Total do aluno: " + soma);
        }
    }
}`,
      saidaCorrigida: 'Total do aluno: 15\nTotal do aluno: 14\nTotal do aluno: 16',
      dica: 'Quando a `soma` volta a valer zero? Uma vez no programa ou uma vez por aluno?',
      explicacao: 'Declarada antes dos dois laços, a `soma` é zerada uma vez só e acumula todos os alunos. Declarada dentro do laço externo, ela nasce zerada a cada aluno, que é o que o total por aluno pede.',
    },
    {
      id: 'estagiario-t4-e05-b03',
      dificuldade: 2,
      sintoma: 'O programa para com `ArrayIndexOutOfBoundsException: Index 2 out of bounds for length 2`.',
      codigo: `public class Irregular {
    public static void main(String[] args) {
        int[][] m = {{1, 2, 3}, {4, 5}, {6, 7, 8}};
        int soma = 0;
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[0].length; j++) {
                soma += m[i][j];
            }
        }
        System.out.println(soma);
    }
}`,
      linha: 6,
      efeito: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      correcao: `public class Irregular {
    public static void main(String[] args) {
        int[][] m = {{1, 2, 3}, {4, 5}, {6, 7, 8}};
        int soma = 0;
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++) {
                soma += m[i][j];
            }
        }
        System.out.println(soma);
    }
}`,
      saidaCorrigida: '36',
      dica: 'Todas as linhas desta matriz têm o mesmo tamanho da primeira?',
      explicacao: 'Em Java, cada linha de um `int[][]` é um array independente, e as linhas podem ter tamanhos diferentes. O limite do laço interno precisa ser o tamanho da linha atual, `m[i].length`, e não o da primeira.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t4-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas vezes o corpo interno executa?',
      codigo: `for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 4; j++) {
        // corpo
    }
}`,
      opcoes: ['20', '9', '5', '4', '25'],
      resposta: 0,
      explicacao: 'Para cada uma das 5 voltas do externo, o interno dá 4 voltas: 5 × 4 = 20.',
      dica: 'Os dois limites são fixos: multiplique as voltas.',
    },
    {
      id: 'estagiario-t4-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int i = 3; i >= 1; i--) {
    for (int j = 0; j < i; j++) {
        System.out.print("#");
    }
    System.out.println();
}`,
      resposta: '###\n##\n#',
      explicacao: 'O externo vai de 3 até 1, e o interno imprime i símbolos em cada linha. O `println()` quebra a linha depois de cada volta do externo.',
      dica: 'O i desce de 3 a 1, e cada linha tem i símbolos.',
    },
    {
      id: 'estagiario-t4-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int n = 0;
for (int i = 0; i < 3; i++)
    for (int j = i; j < 3; j++)
        n++;
System.out.println(n);`,
      opcoes: ['`6`', '`9`', '`3`', '`4`', '`5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O interno começa em `i`: roda 3 vezes com i = 0, 2 vezes com i = 1 e 1 vez com i = 2. 3 + 2 + 1 = 6.',
      dica: 'O interno começa em i: conte as voltas para i = 0, 1 e 2 e some.',
    },
    {
      id: 'estagiario-t4-e05-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int n = 0;
for (int i = 1; i < 10; i *= 3)
    for (int j = i; j > 0; j--)
        n++;
System.out.println(n);`,
      opcoes: ['`13`', '`9`', '`27`', '`3`', '`45`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O externo passa por 1, 3 e 9 (o próximo, 27, falha o teste). O interno roda i vezes em cada um: 1 + 3 + 9 = 13.',
      dica: 'O i vale 1, 3 e 9, e o interno roda i vezes em cada um.',
    },
    {
      id: 'estagiario-t4-e05-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais pares de laços executam o corpo interno exatamente 12 vezes? Escolha dois.',
      opcoes: [
        '`for (i = 0; i < 3; i++) for (j = 0; j < 4; j++)`',
        '`for (i = 0; i < 2; i++) for (j = 0; j < 6; j++)`',
        '`for (i = 0; i < 4; i++) for (j = 0; j <= i; j++)`',
        '`for (i = 0; i < 4; i++) for (j = 0; j < i; j++)`',
        '`for (i = 0; i <= 3; i++) for (j = 0; j <= 3; j++)`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: '12 12 10 6 16' },
      codigoVerificacao: `int a = 0, b = 0, c = 0, d = 0, e = 0;
for (int i = 0; i < 3; i++) for (int j = 0; j < 4; j++) a++;
for (int i = 0; i < 2; i++) for (int j = 0; j < 6; j++) b++;
for (int i = 0; i < 4; i++) for (int j = 0; j <= i; j++) c++;
for (int i = 0; i < 4; i++) for (int j = 0; j < i; j++) d++;
for (int i = 0; i <= 3; i++) for (int j = 0; j <= 3; j++) e++;
System.out.println(a + " " + b + " " + c + " " + d + " " + e);`,
      explicacao: '3 × 4 e 2 × 6 dão 12. Com `j <= i`, o interno roda 1 + 2 + 3 + 4 = 10 vezes; com `j < i`, 0 + 1 + 2 + 3 = 6; e de 0 a 3 inclusive nos dois, 4 × 4 = 16.',
      dica: 'Calcule cada opção: produto quando os limites são fixos, soma quando dependem do i.',
    },
    {
      id: 'estagiario-t4-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int soma = 0;
for (int i = 1; i <= 2; i++) {
    int x = 0;
    for (int j = 1; j <= 3; j++) x += j;
    soma += x;
}
System.out.println(soma);`,
      opcoes: ['`12`', '`6`', '`18`', '`21`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`x` é declarada dentro do laço externo e volta a 0 a cada volta. O interno soma 1 + 2 + 3 = 6, e isso acontece duas vezes: 12.',
      dica: 'O `x` é zerado a cada volta externa. Quanto ele vale ao final de cada uma?',
    },
    {
      id: 'estagiario-t4-e05-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o limite do laço interno para desenhar o triângulo. O programa deve imprimir `#`, `##` e `###`, um por linha.',
      codigo: `public class Triangulo {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 0; j < ___; j++) {
                System.out.print("#");
            }
            System.out.println();
        }
    }
}`,
      respostas: ['i'],
      saida: '#\n##\n###',
      explicacao: 'Na linha i, o laço interno precisa rodar i vezes. Como `j` começa em 0, a condição é `j < i`.',
      dica: 'Na linha i, quantos `#` precisam sair?',
    },
    {
      id: 'estagiario-t4-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String r = "";
for (char c = 'a'; c <= 'b'; c++)
    for (int n = 1; n <= 2; n++)
        r += c + "" + n + " ";
System.out.println(r.trim());`,
      opcoes: ['`a1 a2 b1 b2`', '`a1 b1 a2 b2`', '`a1 b2`', '`98 99 100 101`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para cada letra do externo, o interno passa pelos números 1 e 2. O `c + ""` transforma o `char` em `String` antes de concatenar o número; sem ele, `c + n` seria uma soma.',
      dica: 'O laço externo é o das letras; o interno, o dos números.',
    },
    {
      id: 'estagiario-t4-e05-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Matriz {
    public static void main(String[] args) {
        int soma = 0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                soma += i + j;
            }
            System.out.println(j);
        }
        System.out.println(soma);
    }
}`,
      resposta: 8,
      explicacao: '`j` pertence ao laço interno e deixa de existir quando ele termina. Na linha 8 ainda estamos dentro do laço externo, mas fora do interno.',
      dica: 'Onde foi declarado o `j`, e até onde ele existe?',
    },
    {
      id: 'estagiario-t4-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída? O código soma a diagonal secundária.',
      codigo: `int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int s = 0;
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        if (i + j == 2) s += m[i][j];
System.out.println(s);`,
      opcoes: ['`15`', '`45`', '`12`', '`9`', '`18`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os elementos com i + j = 2 são m[0][2], m[1][1] e m[2][0]: 3 + 5 + 7 = 15. Coincide com a diagonal principal porque o centro é comum às duas.',
      dica: 'Ache as casas com `i + j == 2` e some os valores delas.',
    },
    {
      id: 'estagiario-t4-e05-q11',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int i = 1; i <= 3; i++) {
    String linha = "";
    for (int j = i; j >= 1; j--) linha += j;
    System.out.println(linha);
}`,
      resposta: '1\n21\n321',
      explicacao: 'O laço interno começa em `i` e desce até 1. Como `linha` é uma `String`, `linha += j` concatena os dígitos.',
      dica: 'O interno desce de i até 1, concatenando cada número.',
    },
    {
      id: 'estagiario-t4-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dois laços aninhados percorrem os mesmos n elementos, o externo de 0 a n − 1 e o interno também. Qual é a complexidade?',
      opcoes: ['O(n²)', 'O(n)', 'O(2n)', 'O(n log n)', 'O(log n)'],
      resposta: 0,
      explicacao: 'O corpo executa n × n vezes. Mesmo quando o interno começa em `i + 1`, o total é n(n − 1)/2, que continua O(n²), porque Big-O descarta a constante 1/2.',
      dica: 'Para cada um dos n valores do externo, o interno roda n vezes.',
    },
    {
      id: 'estagiario-t4-e05-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int c = 0;
externo:
for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= 4; j++) {
        if (i * j > 6) break externo;
        c++;
    }
}
System.out.println(c);`,
      opcoes: ['`7`', '`8`', '`10`', '`16`', '`12`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com i = 1, os 4 produtos (até 4) passam: c = 4. Com i = 2, passam 2, 4 e 6: c = 7. Em 2 × 4 = 8, o `break externo` encerra os dois laços.',
      dica: 'Siga até o primeiro produto maior que 6: o `break externo` encerra tudo nesse ponto.',
    },
    {
      id: 'estagiario-t4-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quantas vezes o corpo executa, em função de n?',
      codigo: `for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        // corpo`,
      opcoes: ['n(n − 1)/2', 'n²', 'n(n + 1)/2', '2n', 'n − 1'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '45' },
      codigoVerificacao: `int n = 10, c = 0;
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        c++;
System.out.println(c);`,
      explicacao: 'O interno roda n − 1, n − 2, ..., 1, 0 vezes: a soma de Gauss até n − 1, que é n(n − 1)/2. É o número de pares de elementos distintos. Para n = 10, 45.',
      dica: 'O interno roda n − 1, n − 2, ..., até 0 vezes. Some.',
    },
    {
      id: 'estagiario-t4-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para somar todos os elementos de uma matriz `int[][]` grande, qual ordem de laços costuma ser mais rápida?',
      opcoes: [
        'Linhas no laço externo e colunas no interno (`m[i][j]` com `j` variando mais rápido)',
        'Colunas no laço externo e linhas no interno',
        'As duas ordens têm sempre o mesmo desempenho',
        'Depende só do número de linhas',
      ],
      resposta: 0,
      explicacao: 'Cada linha é um array contíguo na memória. Variando `j` no laço interno, os acessos seguem a memória em sequência e aproveitam cada bloco carregado no cache. Pela coluna, cada acesso pula para outra linha.',
      dica: 'Cada linha da matriz fica contígua na memória, e o cache carrega blocos vizinhos.',
    },
  ],
};

export default episodio;
