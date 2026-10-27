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
  ia: {
    uso:
      'A IA escreve laços `for` com facilidade, e por isso mesmo vale conferir os limites: começo, condição e passo. Use-a para gerar treinos de contagem de voltas e para explicar a ordem de execução do cabeçalho, sempre pedindo a tabela volta a volta.',
    pedido:
      'Estou estudando o for clássico para a certificação Java (Java 21). Gere 6 laços for com passos diferentes (somando, subtraindo, multiplicando e dividindo), várias variáveis no cabeçalho e um que altere o contador no corpo.\n- Não mostre quantas vezes cada um roda.\n- Na correção, mostre o valor do contador em cada teste da condição, inclusive no que falha.\n- Diga qual valor a variável teria depois do laço, se ela fosse declarada antes dele.',
    erros: [
      'Usa `i <= v.length` num laço sobre um array, passando uma posição do fim.',
      'Conta errado as voltas de um laço com `<=` ou com passo maior que 1.',
      'Usa a variável do `for` depois do laço, onde ela não existe mais.',
    ],
    conferir: [
      'Rode o laço com um `println` do contador no começo do corpo.',
      'Confira o primeiro e o último valor processados: são eles que pegam os erros por um.',
      'Para arrays, a condição certa é quase sempre `i < v.length`.',
    ],
  },
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
  bugs: [
    {
      id: 'estagiario-t4-e02-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: \';\' expected` e `error: illegal start of type`, os dois na mesma linha.',
      codigo: `public class Contagem {
    public static void main(String[] args) {
        for (int i = 0, i < 3, i++) {
            System.out.println("Volta " + i);
        }
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Contagem {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println("Volta " + i);
        }
    }
}`,
      saidaCorrigida: 'Volta 0\nVolta 1\nVolta 2',
      dica: 'O cabeçalho do `for` tem três partes. Que caractere separa uma parte da outra?',
      explicacao: 'As três partes do cabeçalho são separadas por `;`. A vírgula serve para outra coisa: separar várias variáveis ou várias atualizações dentro da mesma parte. Com vírgulas, o compilador lê tudo como uma declaração só e se perde.',
    },
    {
      id: 'estagiario-t4-e02-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com cinco erros na mesma linha, começando por `error: <identifier> expected`.',
      codigo: `public class Fatorial {
    public static void main(String[] args) {
        for (int i = 1, long produto = 1; i <= 5; i++) {
            produto *= i;
            System.out.println(i + "! = " + produto);
        }
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Fatorial {
    public static void main(String[] args) {
        for (int i = 1, produto = 1; i <= 5; i++) {
            produto *= i;
            System.out.println(i + "! = " + produto);
        }
    }
}`,
      saidaCorrigida: '1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120',
      dica: 'A inicialização do `for` é uma declaração só. Uma declaração pode ter dois tipos?',
      explicacao: 'A inicialização declara variáveis de um único tipo, como `int i = 1, produto = 1`. Escrever o tipo de novo no meio, `long produto`, não é permitido. Se `produto` precisasse ser `long` para fatoriais grandes, ela teria de ser declarada antes do laço.',
    },
    {
      id: 'estagiario-t4-e02-b03',
      dificuldade: 3,
      sintoma: 'Imprime `Soma: 6`, mas a soma de 1 a 5 é 15.',
      codigo: `public class Soma {
    public static void main(String[] args) {
        int soma = 0;
        int i;
        for (i = 1; i <= 5; i++);
        {
            soma += i;
        }
        System.out.println("Soma: " + soma);
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'Soma: 6' },
      correcao: `public class Soma {
    public static void main(String[] args) {
        int soma = 0;
        int i;
        for (i = 1; i <= 5; i++)
        {
            soma += i;
        }
        System.out.println("Soma: " + soma);
    }
}`,
      saidaCorrigida: 'Soma: 15',
      dica: 'Olhe o fim da linha do `for`. Qual é o corpo dele, de verdade? E com que valor de `i` o bloco de baixo roda?',
      explicacao: 'O `;` depois do cabeçalho é o corpo do laço: ele roda cinco vezes sem fazer nada e deixa `i` em 6. O bloco entre chaves roda uma vez, depois, e soma só esse 6. Sem o `;`, o bloco volta a ser o corpo.',
    },
  ],
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
      dica: 'A inicialização é especial: roda quantas vezes? E a atualização vem antes ou depois do corpo?',
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
      dica: 'Comece em 10 e tire 3 enquanto o valor for maior que zero.',
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
      dica: 'Liste os valores de `i`: começa em 0, anda de 2 em 2, e o `<=` deixa o 10 passar?',
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
      dica: 'Calcule `a` e `b` a cada volta: `a` dobra e `b` diminui 1. Pare quando `a < b` falhar.',
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
      dica: 'A inicialização declara um tipo só, e a variável do `for` não existe depois dele.',
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
      dica: 'Quando `i` é múltiplo de 3, o corpo soma 1 antes de imprimir, e o `i++` do cabeçalho soma mais 1 depois.',
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
      dica: 'Para somar o 5 também, a condição precisa deixar o 5 passar.',
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
      dica: 'O `;` logo depois do cabeçalho é o corpo do laço. O `println` faz parte dele?',
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
      dica: 'Até onde a variável declarada no cabeçalho do `for` existe?',
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
      dica: 'A cada volta, o corpo soma 1 a `x` e a atualização soma mais 10. Quantas voltas são?',
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
      dica: 'Multiplique por 3 a partir de 1 enquanto o valor for menor que 100.',
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
      dica: 'Conte as voltas de cada um; cuidado com os `<=` e `>=`, que incluem o extremo.',
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
      dica: 'Sem condição, o laço testa o quê para parar?',
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
      dica: '`char` também é número: somar 2 pula uma letra.',
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
      dica: 'O `byte` vai até 127. O que acontece quando ele passa disso?',
    },
  ],
};

export default episodio;
