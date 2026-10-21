import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t4-e01',
  minutos: 14,
  aula,
  armadilhas: [
    'Toda recursão precisa de um caso base que seja **alcançado**: `fat(-1)` com caso base `n == 0` nunca termina.',
    'Cada chamada recursiva ocupa um frame na pilha: profundidade n custa O(n) de memória.',
    'A JVM não faz otimização de chamada de cauda. Recursão muito profunda vira `StackOverflowError`.',
    '`StackOverflowError` é um `Error`, não uma `Exception`: um `catch (Exception e)` não o pega.',
    'Variáveis locais não são compartilhadas entre chamadas: cada frame tem as suas.',
    'Fibonacci recursivo sem memoização é exponencial; com memoização, linear.',
    'Hanói com n discos exige exatamente 2ⁿ − 1 movimentos.',
  ],
  recursos: [
    {
      titulo: 'JVMS 2.5.2: Java Virtual Machine Stacks',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5.2',
      tipo: 'documentacao',
      porque: 'A definição oficial da pilha de cada thread, dos frames e de quando a JVM lança `StackOverflowError`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de StackOverflowError',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StackOverflowError.html',
      tipo: 'documentacao',
      porque: 'O erro que aparece quando a recursão é profunda demais, e por que ele é um `Error`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Recursividade (ciência da computação)',
      url: 'https://pt.wikipedia.org/wiki/Recursividade_(ci%C3%AAncia_da_computa%C3%A7%C3%A3o)',
      tipo: 'artigo',
      porque: 'Recursão direta e indireta, recursão de cauda e a relação com a indução matemática.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Torre de Hanói',
      url: 'https://pt.wikipedia.org/wiki/Torre_de_Han%C3%B3i',
      tipo: 'artigo',
      porque: 'A lenda, a solução recursiva e a prova de que 2ⁿ − 1 movimentos são o mínimo.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Baeldung: Recursion in Java',
      url: 'https://www.baeldung.com/java-recursion',
      tipo: 'artigo',
      porque: 'Recursão de cauda, comparação com laços e exemplos clássicos em Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Bóson Treinamentos: Lógica de Programação, Recursividade',
      url: 'https://www.youtube.com/watch?v=M7c-m2xN9FQ',
      tipo: 'video',
      porque: 'Como uma função recursiva funciona, com dois exemplos montados passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Introdução a Algoritmos (Curso de Algoritmos #01)',
      url: 'https://www.youtube.com/watch?v=8mei6uVttho',
      tipo: 'video',
      porque: 'O que é um algoritmo, explicado do zero pelo Gustavo Guanabara.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'CS50x 2024: Lecture 3, Algorithms',
      url: 'https://www.youtube.com/watch?v=jZzyERW7h1A',
      tipo: 'video',
      porque: 'A aula de Harvard sobre busca, ordenação e recursão, com demonstrações no palco.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java Visualizer (Python Tutor)',
      url: 'https://pythontutor.com/java.html',
      tipo: 'ferramenta',
      porque: 'Cole o fatorial recursivo e veja os frames sendo empilhados e desempilhados, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'VisuAlgo: Recursion Tree and DAG',
      url: 'https://visualgo.net/en/recursion',
      tipo: 'ferramenta',
      porque: 'Desenha a árvore de chamadas do Fibonacci e mostra como a memoização a transforma num grafo pequeno.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Entendendo Algoritmos (Aditya Bhargava)',
      url: 'https://novatec.com.br/livros/entendendo-algoritmos/',
      tipo: 'livro',
      porque: 'O capítulo de recursão é o mais ilustrado e acessível que existe, com a pilha de chamadas desenhada.',
      gratuito: false,
      idioma: 'pt',
      onde: 'Cap. 3 "Recursão"',
    },
  ],
  desafio: {
    titulo: 'Todas as permutações',
    enunciado:
      'Escreva um método recursivo que imprima todas as ordens possíveis das letras de uma palavra sem letras repetidas, em ordem alfabética, e conte quantas são. Para `"ABC"`:\n\n```text\nABC\nACB\nBAC\nBCA\nCAB\nCBA\n6 permutações\n```',
    dicas: [
      'Monte a resposta num prefixo: a cada chamada, escolha uma letra ainda não usada e acrescente ao prefixo.',
      'O caso base é o prefixo com o tamanho da palavra: imprima e volte.',
      'Use um `boolean[] usado` e desmarque a letra depois da chamada recursiva. Essa técnica se chama *backtracking*.',
    ],
    solucao: `public class Permutacoes {
    static int total = 0;

    static void permutar(String letras, String prefixo, boolean[] usado) {
        if (prefixo.length() == letras.length()) {
            System.out.println(prefixo);
            total++;
            return;
        }
        for (int i = 0; i < letras.length(); i++) {
            if (!usado[i]) {
                usado[i] = true;
                permutar(letras, prefixo + letras.charAt(i), usado);
                usado[i] = false;
            }
        }
    }

    public static void main(String[] args) {
        permutar("ABC", "", new boolean[3]);
        System.out.println(total + " permutações");
    }
}`,
    saida: 'ABC\nACB\nBAC\nBCA\nCAB\nCBA\n6 permutações',
    comentarios:
      'São n! permutações: 3 escolhas para a primeira letra, 2 para a segunda, 1 para a última. A árvore de chamadas tem exatamente esse formato. Com 10 letras já são 3.628.800 linhas, e com 20 seria inviável: é a classe O(n!) do episódio de Big-O. O *backtracking* (marcar, explorar, desmarcar) é a base de solucionadores de sudoku, de labirintos e do problema das oito rainhas.',
  },
  exercicios: [
    {
      id: 'aprendiz-t4-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que toda função recursiva precisa para terminar?',
      opcoes: [
        'Um caso base que seja alcançado depois de um número finito de chamadas',
        'Um laço `for` dentro da função',
        'Uma variável `static` para contar as chamadas',
        'Um bloco `try`/`catch` para `StackOverflowError`',
      ],
      resposta: 0,
      explicacao: 'O caso base resolve o problema sem chamar a função de novo, e cada chamada recursiva precisa chegar mais perto dele. Sem isso, as chamadas se acumulam até a pilha acabar. Capturar o erro não conserta o algoritmo.',
    },
    {
      id: 'aprendiz-t4-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Digitos {
    static int somaDigitos(int n) {
        return n < 10 ? n : n % 10 + somaDigitos(n / 10);
    }

    static long potencia(long base, int exp) {
        return exp == 0 ? 1 : base * potencia(base, exp - 1);
    }

    public static void main(String[] args) {
        System.out.println(somaDigitos(2026));
        System.out.println(potencia(2, 10));
    }
}`,
      resposta: '10\n1024',
      explicacao: '`somaDigitos` separa o último dígito com `% 10` e chama a si mesma com o resto do número (`/ 10`): 6 + 2 + 0 + 2 = 10. `potencia` multiplica a base `exp` vezes até chegar a 2⁰ = 1: 2¹⁰ = 1024.',
    },
    {
      id: 'aprendiz-t4-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Inverte {
    static String inverte(String s) {
        return s.isEmpty() ? "" : inverte(s.substring(1)) + s.charAt(0);
    }

    public static void main(String[] args) {
        System.out.println(inverte("java"));
    }
}`,
      opcoes: ['`avaj`', '`java`', '`ajav`', '`a`', 'Lança `StringIndexOutOfBoundsException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O inverso de "java" é o inverso de "ava" seguido de "j". Descendo até a string vazia e concatenando na volta, sai "avaj". O caso base `isEmpty()` evita chamar `charAt(0)` numa string vazia.',
    },
    {
      id: 'aprendiz-t4-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quantos movimentos são necessários para resolver a Torre de Hanói com 10 discos?',
      opcoes: ['1023', '1024', '100', '20', '512'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '1023' },
      codigoVerificacao: `public class Conta {
    static long m(int n) {
        return n == 0 ? 0 : 2 * m(n - 1) + 1;
    }

    public static void main(String[] args) {
        System.out.println(m(10));
    }
}`,
      explicacao: 'A recorrência M(n) = 2 · M(n − 1) + 1 tem solução 2ⁿ − 1, e 2¹⁰ − 1 = 1023. O 1024 esquece o −1, que vem do movimento do disco maior não ser duplicado.',
    },
    {
      id: 'aprendiz-t4-e01-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Fatorial {
    static long fat(int n) {
        if (n == 0) {
            return 1;
        }
        return n * fat(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(fat(-1));
    }
}`,
      opcoes: [
        'Lança `StackOverflowError`',
        'Imprime `1`',
        'Imprime `0`',
        'Imprime `-1`',
        'Lança `ArithmeticException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'StackOverflowError' },
      explicacao: 'Com −1, as chamadas vão para −2, −3, −4... e nunca chegam ao caso base `n == 0`. A pilha estoura. O caso base mais seguro seria `n <= 1`, ou uma validação que rejeite negativos.',
    },
    {
      id: 'aprendiz-t4-e01-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre recursão em Java são verdadeiras? Escolha duas.',
      opcoes: [
        'Cada chamada cria um novo frame na pilha, com as próprias variáveis locais',
        'A JVM não faz otimização de chamada de cauda',
        'Uma solução recursiva é sempre mais rápida que a versão com laço',
        'As variáveis locais são compartilhadas entre todas as chamadas',
        'Recursão só funciona com métodos `static`',
      ],
      respostas: [0, 1],
      explicacao: 'Cada chamada tem o seu frame, e é por isso que o `n` de cada nível não se mistura. A JVM não reaproveita frames em chamadas de cauda. Recursão costuma ser mais lenta que laço por causa do custo de cada chamada, e funciona em qualquer método, de instância ou estático.',
    },
    {
      id: 'aprendiz-t4-e01-q07',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `public class IdaVolta {
    static void conta(int n) {
        if (n == 0) {
            return;
        }
        System.out.println("ida " + n);
        conta(n - 1);
        System.out.println("volta " + n);
    }

    public static void main(String[] args) {
        conta(3);
    }
}`,
      resposta: 'ida 3\nida 2\nida 1\nvolta 1\nvolta 2\nvolta 3',
      explicacao: 'O que vem antes da chamada recursiva acontece na descida, em ordem decrescente. O que vem depois só roda quando a chamada interna retorna, ou seja, na subida, em ordem inversa. É a pilha desempilhando.',
    },
    {
      id: 'aprendiz-t4-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a chamada recursiva para que o problema diminua a cada passo. O programa deve imprimir `120`.',
      codigo: `public class Fat {
    static int fatorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * fatorial(n ___ 1);
    }

    public static void main(String[] args) {
        System.out.println(fatorial(5));
    }
}`,
      respostas: ['-'],
      saida: '120',
      explicacao: 'n! = n × (n − 1)!. Com `n - 1`, cada chamada se aproxima do caso base. Com `n + 1`, a recursão nunca terminaria.',
    },
    {
      id: 'aprendiz-t4-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No algoritmo que acha o maior valor de `v`, qual é o invariante do laço no começo da volta `i`?',
      codigo: `int maior = v[0];
for (int i = 1; i < v.length; i++) {
    if (v[i] > maior) {
        maior = v[i];
    }
}`,
      opcoes: [
        '`maior` é o maior valor entre `v[0]` e `v[i - 1]`',
        '`maior` é o maior valor do array inteiro',
        '`maior` é igual a `v[i]`',
        '`maior` é o maior valor entre `v[i]` e `v[v.length - 1]`',
      ],
      resposta: 0,
      explicacao: 'O invariante descreve o trabalho feito até aqui: os i primeiros elementos já foram vistos. Ele vale antes da primeira volta (só `v[0]`), continua valendo a cada volta e, quando o laço termina com i = n, vira exatamente o resultado desejado.',
    },
    {
      id: 'aprendiz-t4-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quanto de memória extra uma recursão de profundidade n usa na pilha?',
      opcoes: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
      resposta: 0,
      explicacao: 'Cada chamada pendente mantém um frame na pilha até retornar. Com n chamadas aninhadas ao mesmo tempo, são n frames. É por isso que a versão com laço, que usa O(1), pode ser preferível para n grande.',
    },
    {
      id: 'aprendiz-t4-e01-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Memo {
    static long[] memo = new long[50];
    static int chamadas = 0;

    static long fib(int n) {
        chamadas++;
        if (n < 2) {
            return n;
        }
        if (memo[n] != 0) {
            return memo[n];
        }
        memo[n] = fib(n - 1) + fib(n - 2);
        return memo[n];
    }

    public static void main(String[] args) {
        System.out.println(fib(10) + " " + chamadas);
    }
}`,
      resposta: '55 19',
      explicacao: 'Cada valor de 2 a 10 é calculado uma única vez e faz duas chamadas: 9 × 2 = 18, mais a chamada inicial, 19. As chamadas repetidas encontram o valor no `memo` e voltam na hora. Sem memoização seriam 177.',
    },
    {
      id: 'aprendiz-t4-e01-q12',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Hanoi {
    static void mover(int n, char de, char para, char via) {
        if (n == 0) return;
        mover(n - 1, de, via, para);
        System.out.println(de + " -> " + para);
        mover(n - 1, via, para, de);
    }

    public static void main(String[] args) {
        int total = mover(3, 'A', 'C', 'B');
        System.out.println(total);
    }
}`,
      resposta: 10,
      explicacao: '`mover` é `void`: não devolve valor, então não pode ser atribuído a um `int`. Para contar os movimentos, o método teria de devolver `int` ou usar um contador `static`.',
    },
    {
      id: 'aprendiz-t4-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um algoritmo recursivo resolve um problema de tamanho n fazendo duas chamadas de tamanho n − 1 e mais um passo constante: T(n) = 2T(n − 1) + 1, com T(0) = 0. Qual é T(n)?',
      opcoes: ['2ⁿ − 1', 'n²', '2n', 'n log n', 'n!'],
      resposta: 0,
      explicacao: 'Calculando: 0, 1, 3, 7, 15, 31... cada termo é o dobro do anterior mais 1, ou seja, 2ⁿ − 1, e a indução confirma. É a recorrência da Torre de Hanói, e mostra que duas chamadas recursivas que só diminuem o problema em 1 dão crescimento exponencial.',
    },
    {
      id: 'aprendiz-t4-e01-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais corpos de `static int soma(int n)` devolvem 0 + 1 + ... + n corretamente para **todo** n ≥ 0? Escolha duas.',
      opcoes: [
        '`return n == 0 ? 0 : n + soma(n - 1);`',
        '`return n <= 0 ? 0 : soma(n - 1) + n;`',
        '`return n + soma(n - 1);`',
        '`return n == 1 ? 1 : n + soma(n - 1);`',
        '`return n == 0 ? 0 : soma(n) + n - 1;`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: '55 55 0 true' },
      codigoVerificacao: `public class Somas {
    static int a(int n) { return n == 0 ? 0 : n + a(n - 1); }
    static int b(int n) { return n <= 0 ? 0 : b(n - 1) + n; }
    static int d(int n) { return n == 1 ? 1 : n + d(n - 1); }

    public static void main(String[] args) {
        boolean estourou = false;
        try {
            d(0);
        } catch (StackOverflowError erro) {
            estourou = true;
        }
        System.out.println(a(10) + " " + b(10) + " " + b(0) + " " + estourou);
    }
}`,
      explicacao: 'As duas primeiras têm caso base e diminuem n. A terceira não tem caso base. A quarta funciona para n ≥ 1, mas com n = 0 pula o caso base e desce para sempre: a pegadinha é o "todo n ≥ 0". A quinta chama `soma(n)` com o mesmo n, sem progresso.',
    },
    {
      id: 'aprendiz-t4-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual problema a memoização resolve no Fibonacci recursivo?',
      opcoes: [
        'Evita recalcular os mesmos subproblemas, guardando cada resultado na primeira vez',
        'Evita o estouro de inteiros em valores grandes',
        'Transforma a recursão em recursão de cauda',
        'Permite usar `float` em vez de `long`',
      ],
      resposta: 0,
      explicacao: 'fib(n − 1) e fib(n − 2) recalculam quase as mesmas coisas, e a árvore de chamadas cresce exponencialmente. Guardando cada fib(k) calculado, cada valor é feito uma vez: de exponencial para linear. O overflow continua existindo a partir de fib(93) num `long`.',
    },
  ],
};

export default episodio;
