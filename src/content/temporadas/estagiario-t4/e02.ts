import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t4-e02',
  minutos: 10,
  aula,
  armadilhas: [
    'A inicialização roda uma vez; depois, a cada volta: condição, corpo, atualização.',
    'A variável declarada no `for` não existe depois do laço.',
    'Várias variáveis na inicialização precisam ser do mesmo tipo: `int i = 0, long j = 0` não compila.',
    'Partes vazias são válidas: `for (;;)` é um laço infinito.',
    'Alterar o contador dentro do corpo se soma à atualização do cabeçalho.',
    '`i <= 10` com passo 2 a partir de 0 roda 6 vezes; com `<`, 5.',
    'Um `;` logo depois do `for (...)` vira o corpo vazio do laço.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: The for Statement',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html',
      tipo: 'documentacao',
      porque: 'O `for` clássico e o aprimorado, com o exemplo do laço infinito `for (;;)`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.14.1: The basic for Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.14.1',
      tipo: 'documentacao',
      porque: 'A ordem exata de execução das três partes e as regras de escopo da variável do laço.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'dev.java: Control Flow Statements',
      url: 'https://dev.java/learn/language/constructs/basics/controlling-flow/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre `for`, `while` e desvios.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java For Loop',
      url: 'https://www.baeldung.com/java-for-loop',
      tipo: 'artigo',
      porque: 'As variações do `for`, com exemplos de várias variáveis e partes vazias.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #13, Estruturas de Repetição (Parte 3)',
      url: 'https://www.youtube.com/watch?v=XLqPZh6n8IA',
      tipo: 'video',
      porque: 'O `for` explicado com exemplos de contagem, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As variações válidas e inválidas do cabeçalho do `for` estão listadas no livro, com as que a prova usa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção sobre o `for`',
    },
    {
      titulo: 'Think Java, 2ª edição (Downey e Mayfield)',
      url: 'https://greenteapress.com/wp/think-java-2e/',
      tipo: 'livro',
      porque: 'Laços `for` com exercícios graduais, para quem está começando.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 6, "Loops and Strings", seção sobre o `for`',
    },
  ],
  desafio: {
    titulo: 'Números primos',
    enunciado:
      'Liste os números primos de 2 a 50 com dois `for`: o externo percorre os candidatos, e o interno testa os divisores. Teste só os divisores até a raiz quadrada do candidato (`d * d <= n`). Imprima:\n\n```text\n2 3 5 7 11 13 17 19 23 29 31 37 41 43 47\n15 primos\n```',
    dicas: [
      'Use um `boolean primo = true` antes do laço interno e um `break` ao achar um divisor.',
      'Se n tem um divisor maior que √n, tem também um menor que √n: por isso basta testar até a raiz.',
      'Junte os números num `StringBuilder` ou num `StringJoiner` para não sobrar espaço no fim.',
    ],
    solucao: `import java.util.StringJoiner;

public class Primos {
    public static void main(String[] args) {
        StringJoiner primos = new StringJoiner(" ");
        int total = 0;
        for (int n = 2; n <= 50; n++) {
            boolean primo = true;
            for (int d = 2; d * d <= n; d++) {
                if (n % d == 0) {
                    primo = false;
                    break;
                }
            }
            if (primo) {
                primos.add(String.valueOf(n));
                total++;
            }
        }
        System.out.println(primos);
        System.out.println(total + " primos");
    }
}`,
    saida: '2 3 5 7 11 13 17 19 23 29 31 37 41 43 47\n15 primos',
    comentarios:
      'Testar só até √n faz uma diferença enorme: para n = 1.000.000, são mil divisões em vez de um milhão. Com `d * d <= n` não é preciso calcular raiz nenhuma (e evita os erros do ponto flutuante). Para listar muitos primos de uma vez, o crivo de Eratóstenes, com um array de `boolean`, é ainda mais rápido.',
  },
  exercicios: [
    {
      id: 'estagiario-t4-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em que ordem as partes de um `for` são executadas?',
      opcoes: [
        'Inicialização uma vez; depois, a cada volta: condição, corpo, atualização',
        'Inicialização, atualização, condição, corpo, a cada volta',
        'Condição, inicialização, corpo, atualização',
        'Inicialização, corpo, condição e atualização, a cada volta',
      ],
      resposta: 0,
      explicacao: 'A condição é testada antes de cada volta (o corpo pode nem rodar), e a atualização vem depois do corpo. A inicialização acontece uma única vez.',
    },
    {
      id: 'estagiario-t4-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int i = 10; i > 0; i -= 3) {
    System.out.println(i);
}`,
      resposta: '10\n7\n4\n1',
      explicacao: 'i passa por 10, 7, 4 e 1. Depois, 1 − 3 = −2, que falha a condição `i > 0`.',
    },
    {
      id: 'estagiario-t4-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int c = 0;
for (int i = 0; i <= 10; i += 2) c++;
System.out.println(c);`,
      opcoes: ['`6`', '`5`', '`11`', '`10`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os valores 0, 2, 4, 6, 8 e 10 passam no teste `<= 10`: 6 voltas. Com `<`, o 10 ficaria de fora.',
    },
    {
      id: 'estagiario-t4-e02-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `for (int a = 1, b = 10; a < b; a *= 2, b--) {
    System.out.println(a + ":" + b);
}`,
      opcoes: ['`1:10\n2:9\n4:8`', '`1:10\n2:9\n4:8\n8:7`', '`1:10\n2:9`', 'Não compila: duas atualizações'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A cada volta, `a` dobra e `b` diminui 1: (1, 10), (2, 9), (4, 8), e então (8, 7), em que 8 < 7 é falso. Várias expressões de atualização separadas por vírgula são válidas.',
    },
    {
      id: 'estagiario-t4-e02-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`for (int i = 0, long j = 0; i < 3; i++) {}`',
        '`for (int i = 0; i < 3; i++) {} System.out.println(i);`',
        '`for (;;) { break; }`',
        '`int i, j; for (i = 0, j = 5; i < j; i++, j--) {}`',
        '`for (var i = 0; i < 3; i++) {}`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'A inicialização é uma única declaração, com um único tipo, e a variável do `for` não existe depois dele. Partes vazias, atribuições a variáveis já declaradas e `var` são válidos.',
    },
    {
      id: 'estagiario-t4-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `for (int i = 1; i < 10; i++) {
    if (i % 3 == 0) i++;
    System.out.print(i);
}
System.out.println();`,
      opcoes: ['`12457810`', '`123456789`', '`124578`', '`1245781011`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Quando i é múltiplo de 3, o corpo o incrementa antes de imprimir: o 3 vira 4, o 6 vira 7, o 9 vira 10. Depois do 10, o `i++` leva a 11, que falha o teste.',
    },
    {
      id: 'estagiario-t4-e02-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a condição para somar de 1 a 5. O programa deve imprimir `15`.',
      codigo: `public class Soma {
    public static void main(String[] args) {
        int soma = 0;
        for (int i = 1; i ___ 5; i++) {
            soma += i;
        }
        System.out.println(soma);
    }
}`,
      respostas: ['<='],
      saida: '15',
      explicacao: 'Para incluir o 5, a condição é `<= 5`: 1 + 2 + 3 + 4 + 5 = 15. Com `< 5`, a soma pararia no 4 e daria 10, o erro de "um a menos" mais comum.',
    },
    {
      id: 'estagiario-t4-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `for (int i = 0; i < 5; i++);
System.out.println("x");`,
      opcoes: ['`x`', '`x` cinco vezes', 'Não compila: `for` sem corpo', 'Nada'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `;` logo depois do cabeçalho é o corpo do laço: um comando vazio, repetido cinco vezes. O `println` está fora do `for` e roda uma vez.',
    },
    {
      id: 'estagiario-t4-e02-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Soma {
    public static void main(String[] args) {
        int soma = 0;
        for (int i = 1; i <= 4; i++) {
            soma += i;
        }
        System.out.println(soma + " " + i);
    }
}`,
      resposta: 7,
      explicacao: 'A variável `i` foi declarada no cabeçalho do `for` e deixou de existir no fim do laço. Para usá-la depois, declare-a antes: `int i; for (i = 1; ...)`.',
    },
    {
      id: 'estagiario-t4-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 0;
for (int i = 0; i < 3; i++, x += 10) x++;
System.out.println(x);`,
      opcoes: ['`33`', '`30`', '`3`', '`13`', '`23`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O corpo (`x++`) e a atualização (`x += 10`) rodam a cada uma das 3 voltas: 3 · (1 + 10) = 33. A atualização roda depois de cada corpo, inclusive o último.',
    },
    {
      id: 'estagiario-t4-e02-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int p = 1; p < 100; p *= 3) {
    System.out.println(p);
}`,
      resposta: '1\n3\n9\n27\n81',
      explicacao: 'A atualização pode ser qualquer expressão. Multiplicando por 3, p passa por 1, 3, 9, 27 e 81; o próximo, 243, falha o teste. São cerca de log₃(100) voltas.',
    },
    {
      id: 'estagiario-t4-e02-q12',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais laços executam o corpo exatamente 5 vezes? Escolha três.',
      opcoes: [
        '`for (int i = 0; i < 5; i++)`',
        '`for (int i = 1; i <= 5; i++)`',
        '`for (int i = 5; i >= 0; i--)`',
        '`for (int i = 0; i <= 5; i++)`',
        '`for (int i = 10; i > 0; i -= 2)`',
      ],
      respostas: [0, 1, 4],
      verificar: { tipo: 'executa', saida: '5 5 6 6 5' },
      codigoVerificacao: `int a = 0, b = 0, c = 0, d = 0, e = 0;
for (int i = 0; i < 5; i++) a++;
for (int i = 1; i <= 5; i++) b++;
for (int i = 5; i >= 0; i--) c++;
for (int i = 0; i <= 5; i++) d++;
for (int i = 10; i > 0; i -= 2) e++;
System.out.println(a + " " + b + " " + c + " " + d + " " + e);`,
      explicacao: 'De 0 a 4 e de 1 a 5 são 5 valores. De 5 até 0 e de 0 até 5, inclusive, são 6. De 10 descendo de 2 em 2 enquanto positivo: 10, 8, 6, 4, 2, também 5.',
    },
    {
      id: 'estagiario-t4-e02-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que faz `for (;;) { ... }`?',
      opcoes: [
        'Um laço infinito, que só termina com `break`, `return` ou exceção',
        'Não compila: as três partes são obrigatórias',
        'Executa o corpo uma única vez',
        'Não executa o corpo nenhuma vez',
      ],
      resposta: 0,
      explicacao: 'Sem condição, o `for` considera a condição sempre verdadeira. É o equivalente a `while (true)`.',
    },
    {
      id: 'estagiario-t4-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `for (char c = 'a'; c <= 'e'; c += 2) System.out.print(c);
System.out.println();`,
      opcoes: ['`ace`', '`abcde`', '`979901`', 'Não compila: `char` no `for`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`char` é numérico, então pode ser contador. O `+= 2` tem cast implícito de volta para `char`, e a variável continua `char`: imprime letras, a, c e e.',
    },
    {
      id: 'estagiario-t4-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int count = 0;
for (byte b = 120; b > 0; b++) count++;
System.out.println(count);`,
      opcoes: ['`8`', 'O laço nunca termina', '`7`', 'Não compila', '`128`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `byte` vai de 120 a 127, 8 valores. Depois, `b++` estoura e dá a volta para −128, que falha o teste `b > 0`. O overflow encerrou o laço.',
    },
  ],
};

export default episodio;
