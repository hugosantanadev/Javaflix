import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t4-e01',
  minutos: 10,
  aula,
  armadilhas: [
    '`while` pode rodar zero vezes; `do-while` roda pelo menos uma.',
    '`do { } while (cond);` exige o `;` no final.',
    'Variável declarada dentro do `do { }` não existe na condição do `while`.',
    'Um `++` na condição é executado a cada teste, inclusive no último, que falha.',
    'Depois do laço, a variável guarda o primeiro valor que falhou a condição.',
    'Condição com `!=` e um passo que pula o valor de parada gera laço infinito.',
    'A condição precisa ser `boolean`: `while (i)` com `i` inteiro não compila.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: The while and do-while Statements',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html',
      tipo: 'documentacao',
      porque: 'Os dois laços com exemplos curtos e a diferença entre testar antes e depois.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.12: The while Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.12',
      tipo: 'documentacao',
      porque: 'A definição formal, incluindo o que acontece com `break` e `continue` dentro do laço.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.13: The do Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.13',
      tipo: 'documentacao',
      porque: 'A execução do `do-while` passo a passo, com o teste depois do corpo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Control Flow Statements',
      url: 'https://dev.java/learn/language/constructs/basics/controlling-flow/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre laços e desvios de fluxo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #11, Estruturas de Repetição (Parte 1)',
      url: 'https://www.youtube.com/watch?v=2fawKjR8d4c',
      tipo: 'video',
      porque: 'O `while` explicado do zero, com exemplos de contador, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #12, Estruturas de Repetição (Parte 2)',
      url: 'https://www.youtube.com/watch?v=ojLALwmvQIU',
      tipo: 'video',
      porque: 'O `do-while` e a diferença para o `while`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As questões de contagem de iterações do livro treinam exatamente o raciocínio da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seções sobre `while` e `do/while`',
    },
    {
      titulo: 'Think Java, 2ª edição (Downey e Mayfield)',
      url: 'https://greenteapress.com/wp/think-java-2e/',
      tipo: 'livro',
      porque: 'Laços explicados com calma e com exercícios, para quem está começando.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 6, "Loops and Strings"',
    },
  ],
  desafio: {
    titulo: 'Adivinhe o número',
    enunciado:
      'O computador precisa adivinhar um número secreto de 1 a 100, recebendo a cada chute a dica "maior" ou "menor". Simule o jogo com o segredo 73: chute sempre o meio do intervalo ainda possível, com um `do-while`, e imprima cada chute. A saída deve ser:\n\n```text\nchute 1: 50 (maior)\nchute 2: 75 (menor)\nchute 3: 62 (maior)\nchute 4: 68 (maior)\nchute 5: 71 (maior)\nchute 6: 73 (acertou)\n```',
    dicas: [
      'Guarde o intervalo possível em `baixo` e `alto`, começando em 1 e 100.',
      'O chute é `(baixo + alto) / 2`. Se o segredo for maior, `baixo = chute + 1`; se for menor, `alto = chute - 1`.',
      'O `do-while` faz sentido aqui: sempre há pelo menos um chute.',
    ],
    solucao: `public class Adivinha {
    public static void main(String[] args) {
        int segredo = 73;
        int baixo = 1, alto = 100, tentativas = 0, chute;
        do {
            chute = (baixo + alto) / 2;
            tentativas++;
            String dica;
            if (chute < segredo) {
                dica = "maior";
                baixo = chute + 1;
            } else if (chute > segredo) {
                dica = "menor";
                alto = chute - 1;
            } else {
                dica = "acertou";
            }
            System.out.println("chute " + tentativas + ": " + chute + " (" + dica + ")");
        } while (chute != segredo);
    }
}`,
    saida: 'chute 1: 50 (maior)\nchute 2: 75 (menor)\nchute 3: 62 (maior)\nchute 4: 68 (maior)\nchute 5: 71 (maior)\nchute 6: 73 (acertou)',
    comentarios:
      'É a busca binária da trilha Aprendiz disfarçada de jogo: com 100 números, nunca são precisos mais que 7 chutes, porque 2⁷ = 128. Repare que `chute` é declarado **antes** do `do`: se fosse declarado dentro do bloco, não existiria na condição `while (chute != segredo)`.',
  },
  exercicios: [
    {
      id: 'estagiario-t4-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual laço executa o corpo pelo menos uma vez, mesmo que a condição comece falsa?',
      opcoes: ['`do-while`', '`while`', '`for`', 'Nenhum: todos testam antes'],
      resposta: 0,
      explicacao: 'O `do-while` executa o corpo e só depois testa a condição. O `while` e o `for` testam antes e podem não rodar nenhuma vez.',
    },
    {
      id: 'estagiario-t4-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int n = 1, voltas = 0;
while (n < 50) {
    n *= 3;
    voltas++;
}
System.out.println(n + " " + voltas);`,
      resposta: '81 4',
      explicacao: 'n passa por 3, 9, 27 e 81. Depois da quarta volta, 81 < 50 é falso e o laço para. A variável termina com o primeiro valor que falhou a condição.',
    },
    {
      id: 'estagiario-t4-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int k = 5;
while (k-- > 2) System.out.print(k);
System.out.println();`,
      opcoes: ['`432`', '`543`', '`4321`', '`5432`', '`321`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O teste compara o valor antigo, mas o corpo já vê o decrementado: 5 > 2 (imprime 4), 4 > 2 (imprime 3), 3 > 2 (imprime 2), 2 > 2 falha. `k` termina em 1.',
    },
    {
      id: 'estagiario-t4-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 0;
do {
    x += 5;
} while (x < 0);
System.out.println(x);`,
      opcoes: ['`5`', '`0`', 'O laço nunca termina', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O corpo roda uma vez antes do primeiro teste. Depois, 5 < 0 é falso e o laço termina.',
    },
    {
      id: 'estagiario-t4-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`int i = 0; while (i < 3) i++;`',
        '`do { int t = 1; } while (t < 3);`',
        '`int i = 0; while (i) { i++; }`',
        '`int i = 0; do i++; while (i < 3);`',
        '`while (true) { break; }`',
      ],
      respostas: [1, 2],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: '`t` só existe dentro do bloco do `do`, e a condição precisa ser `boolean`. Sem chaves, o `do` aceita um único comando, e o `while (true)` com `break` é válido.',
    },
    {
      id: 'estagiario-t4-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `int i = 0;
do {
    i++;
} while (i < 3)
System.out.println(i);`,
      opcoes: [
        'Não compila: falta `;` depois do `while (i < 3)`',
        'Imprime `3`',
        'Imprime `1`',
        'Não compila: `do` exige `{ }` no `while`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'O `do-while` é um único comando, que termina com `;` depois da condição. É uma diferença de sintaxe em relação ao `while`, que termina com o corpo.',
    },
    {
      id: 'estagiario-t4-e01-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete a condição para somar os dígitos de `n`. O programa deve imprimir `10`.',
      codigo: `public class SomaDigitos {
    public static void main(String[] args) {
        int n = 2026, soma = 0;
        while (n ___ 0) {
            soma += n % 10;
            n /= 10;
        }
        System.out.println(soma);
    }
}`,
      respostas: ['>', '!='],
      saida: '10',
      explicacao: 'A cada volta, `% 10` tira o último dígito e `/ 10` o remove. Quando sobra 0, não há mais dígitos. Com números positivos, `> 0` e `!= 0` dão no mesmo.',
    },
    {
      id: 'estagiario-t4-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int i = 1;
while (i != 10) {
    i += 3;
}
System.out.println(i);`,
      opcoes: ['`10`', '`13`', 'O laço nunca termina', '`7`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'i passa por 1, 4, 7 e 10, e o `!=` para no 10. Com `i += 2`, a sequência 1, 3, 5, 7, 9, 11... pularia o 10 e o laço nunca terminaria.',
    },
    {
      id: 'estagiario-t4-e01-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int i = 0, total = 0;
while (i < 3) {
    int j = i;
    while (j < 3) {
        total++;
        j++;
    }
    i++;
}
System.out.println(total);`,
      resposta: '6',
      explicacao: 'Com i = 0, o laço interno roda 3 vezes (j de 0 a 2); com i = 1, 2 vezes; com i = 2, 1 vez. 3 + 2 + 1 = 6.',
    },
    {
      id: 'estagiario-t4-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int[] v = {4, 8, 0, 3, 5};
int i = 0, soma = 0;
while (v[i] != 0) {
    soma += v[i];
    i++;
}
System.out.println(soma + " " + i);`,
      opcoes: ['`12 2`', '`20 5`', '`12 3`', '`15 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O 0 funciona como sentinela: o laço soma 4 e 8 e para ao encontrar o 0, na posição 2. O 3 e o 5 nunca são lidos.',
    },
    {
      id: 'estagiario-t4-e01-q11',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Tentativas {
    public static void main(String[] args) {
        int total = 0;
        do {
            int cont = total + 1;
            total = cont;
        } while (cont < 3);
        System.out.println(total);
    }
}`,
      resposta: 7,
      explicacao: '`cont` foi declarada dentro do bloco do `do` e não existe mais na condição, que está fora dele. Declare a variável antes do `do` para usá-la no `while`.',
    },
    {
      id: 'estagiario-t4-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int a = 10, b = 0;
while (a > b) {
    a -= 2;
    b += 1;
}
System.out.println(a + " " + b);`,
      opcoes: ['`2 4`', '`4 3`', '`3 3`', '`0 5`', '`2 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As voltas levam (a, b) a (8, 1), (6, 2), (4, 3) e (2, 4). Agora 2 > 4 é falso e o laço para.',
    },
    {
      id: 'estagiario-t4-e01-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais laços executam o corpo exatamente 3 vezes? Escolha três.',
      opcoes: [
        '`int i = 0; while (i < 3) i++;`',
        '`int i = 0; do i++; while (i < 3);`',
        '`int i = 0; while (i <= 3) i++;`',
        '`int i = 3; do i--; while (i > 0);`',
        '`int i = 1; while (i < 3) i++;`',
      ],
      respostas: [0, 1, 3],
      verificar: { tipo: 'executa', saida: '3 3 4 3 2' },
      codigoVerificacao: `int c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;
int i = 0; while (i < 3) { i++; c1++; }
i = 0; do { i++; c2++; } while (i < 3);
i = 0; while (i <= 3) { i++; c3++; }
i = 3; do { i--; c4++; } while (i > 0);
i = 1; while (i < 3) { i++; c5++; }
System.out.println(c1 + " " + c2 + " " + c3 + " " + c4 + " " + c5);`,
      explicacao: 'De 0 enquanto menor que 3: 0, 1, 2. O `do-while` que começa em 0 também para quando i chega a 3. De 3 decrementando enquanto maior que 0: 3, 2, 1. Com `<= 3`, são 4 voltas; começando em 1, são 2.',
    },
    {
      id: 'estagiario-t4-e01-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença essencial entre `while` e `do-while`?',
      opcoes: [
        '`while` testa a condição antes do corpo; `do-while` testa depois',
        '`do-while` não aceita `break`',
        '`while` só funciona com números',
        '`do-while` roda sempre o mesmo número de vezes',
      ],
      resposta: 0,
      explicacao: 'Por testar depois, o `do-while` executa o corpo pelo menos uma vez. Fora isso, os dois funcionam igual, inclusive com `break` e `continue`.',
    },
    {
      id: 'estagiario-t4-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 3;
while (x --> 0) System.out.print(x);
System.out.println();`,
      opcoes: ['`210`', '`321`', '`3210`', 'Não compila: `-->` não existe', '`21`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O "operador seta" é só `x-- > 0` sem espaço. O teste compara o valor antigo (3, 2, 1 passam; 0 falha), e o corpo imprime o valor já decrementado: 2, 1 e 0.',
    },
  ],
};

export default episodio;
