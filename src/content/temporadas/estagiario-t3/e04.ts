import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t3-e04',
  minutos: 11,
  aula,
  armadilhas: [
    'Comando depois de `return`, `throw`, `break` ou `continue` no mesmo bloco não compila.',
    '`while (true)` sem `break` torna inalcançável o que vem depois; `while (false)` torna o corpo inalcançável.',
    '`if (false) { ... }` compila: é a exceção feita de propósito.',
    'Uma `final` inicializada com constante conta como constante: `while (LIGADO)` com `LIGADO` final `true` se comporta como `while (true)`.',
    'Variável local lida antes de ter valor em todos os caminhos não compila; campos têm valor padrão.',
    '`if (true) x = 1;` deixa `x` definitivamente atribuída; `if (b) x = 1;` com `b` variável, não.',
    'Método com retorno precisa de `return` ou `throw` em todos os caminhos; o erro aparece na `}` final.',
    'Bloco interno não pode redeclarar uma variável local do bloco externo.',
  ],
  recursos: [
    {
      titulo: 'JLS 14.22: Unreachable Statements',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.22',
      tipo: 'documentacao',
      porque: 'As regras de alcançabilidade para cada comando, incluindo a exceção do `if` explicada pela própria especificação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS, capítulo 16: Definite Assignment',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-16.html',
      tipo: 'documentacao',
      porque: 'A análise de atribuição definida, com os exemplos de `if (true)` e de variáveis `final`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 8.4.7: Method Body',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.7',
      tipo: 'documentacao',
      porque: 'A regra que exige que um método com retorno não possa "terminar normalmente".',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 6.4: Shadowing and Obscuring',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.4',
      tipo: 'documentacao',
      porque: 'Quando um nome pode esconder outro, e por que uma local não pode esconder outra local.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OpenJDK: Compilation Overview',
      url: 'https://openjdk.org/groups/compiler/doc/compilation-overview/index.html',
      tipo: 'documentacao',
      porque: 'A fase "flow" do `javac`, que faz as análises deste episódio.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #15, Métodos',
      url: 'https://www.youtube.com/watch?v=EuxmbXZCFVQ',
      tipo: 'video',
      porque: 'Métodos com retorno e o escopo das variáveis locais, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro lista os casos de código inalcançável que a prova usa, e as regras de escopo.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seções sobre código inalcançável; Cap. 1, "Building Blocks": escopo de variáveis',
    },
  ],
  desafio: {
    titulo: 'Classificação sem buracos',
    enunciado:
      'Escreva `classificar(int temperatura)`, que devolve "congelante" (abaixo de 0), "frio" (até 15), "agradável" (até 25) ou "quente". O método precisa compilar sem nenhum `return` "de enfeite" e sem variável não inicializada. Faça duas versões: uma com `if`/`else if`/`else` e outra com uma expressão `switch` sobre `Integer.signum` ou uma variável auxiliar, à sua escolha. Teste com −5, 10, 20 e 30 e imprima:\n\n```text\n-5: congelante\n10: frio\n20: agradável\n30: quente\n```',
    dicas: [
      'Com `else` no final, todo caminho tem `return`, e o compilador fica satisfeito.',
      'Uma alternativa é declarar `String r;` e atribuir em todos os ramos, com um único `return r;` no fim.',
    ],
    solucao: `public class Temperatura {
    static String classificar(int t) {
        if (t < 0) {
            return "congelante";
        } else if (t <= 15) {
            return "frio";
        } else if (t <= 25) {
            return "agradável";
        } else {
            return "quente";
        }
    }

    static String classificarComVariavel(int t) {
        String r;
        if (t < 0) {
            r = "congelante";
        } else if (t <= 15) {
            r = "frio";
        } else if (t <= 25) {
            r = "agradável";
        } else {
            r = "quente";
        }
        return r;
    }

    public static void main(String[] args) {
        for (int t : new int[] {-5, 10, 20, 30}) {
            String a = classificar(t);
            String b = classificarComVariavel(t);
            System.out.println(t + ": " + (a.equals(b) ? a : "divergência"));
        }
    }
}`,
    saida: '-5: congelante\n10: frio\n20: agradável\n30: quente',
    comentarios:
      'As duas versões compilam pelo mesmo motivo: o `else` final fecha o último caminho. Tire o `else` da primeira e aparece "missing return statement"; tire da segunda e aparece "variable r might not have been initialized". A versão com uma única saída costuma ser mais fácil de depurar; a com vários `return`, mais fácil de ler. O compilador garante as duas.',
  },
  exercicios: [
    {
      id: 'estagiario-t3-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que o método abaixo não compila?',
      codigo: `static int f() {
    return 1;
    System.out.println("fim");
}`,
      opcoes: [
        'O `println` está depois do `return` e nunca pode ser executado',
        'Falta um `return` depois do `println`',
        'Um método `static` não pode usar `println`',
        'O método compila e o `println` é ignorado',
      ],
      resposta: 0,
      explicacao: 'Código inalcançável é erro de compilação em Java, não um aviso. O `return` encerra o método, e nenhum caminho chega ao `println`.',
    },
    {
      id: 'estagiario-t3-e04-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`while (true) { } System.out.println("x");`',
        '`while (false) { System.out.println("x"); }`',
        '`if (false) { System.out.println("x"); }`',
        '`do { } while (false); System.out.println("x");`',
        '`for (int i = 0; ; i++) { if (i > 3) break; } System.out.println("x");`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'O `while (true)` sem `break` nunca termina, e o corpo do `while (false)` nunca roda. O `if (false)` é a exceção deliberada, o `do-while` roda o corpo uma vez e termina, e o `for` sem condição tem um `break` alcançável.',
    },
    {
      id: 'estagiario-t3-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `int x;
int n = 5;
if (n > 3) x = 10;
System.out.println(x);`,
      opcoes: [
        'Não compila: `x` pode não ter sido inicializada',
        'Compila e imprime `10`',
        'Compila e imprime `0`',
        'Compila e lança exceção',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'O compilador não executa `n > 3`: para ele, existe o caminho em que o `if` não entra, e nele `x` não tem valor. Variáveis locais não têm valor padrão.',
    },
    {
      id: 'estagiario-t3-e04-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `int x;
if (true) x = 7;
System.out.println(x);`,
      opcoes: ['Imprime `7`', 'Não compila: `x` pode não ter sido inicializada', 'Imprime `0`', 'Não compila: `if (true)` é código morto'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '7' },
      explicacao: 'Com uma condição constante `true`, o caminho do "falso" não existe na análise de atribuição definida, e `x` conta como atribuída. Trocando `true` por uma variável `boolean`, o mesmo código deixa de compilar.',
    },
    {
      id: 'estagiario-t3-e04-q05',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Em que linha o compilador aponta o erro?',
      codigo: `public class Sinal {
    static String sinal(int n) {
        if (n > 0) {
            return "positivo";
        } else if (n < 0) {
            return "negativo";
        }
    }

    public static void main(String[] args) {
        System.out.println(sinal(1));
    }
}`,
      resposta: 8,
      explicacao: 'Quando `n` é zero, o método chega ao fim sem `return`. O erro "missing return statement" é apontado na chave que fecha o método, o ponto aonde esse caminho chega. Um `else` ou um `return` antes da chave resolveria.',
    },
    {
      id: 'estagiario-t3-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Busca {
    static int primeiroNegativo(int[] v) {
        int i = 0;
        while (true) {
            if (v[i] < 0) return i;
            i++;
        }
    }

    public static void main(String[] args) {
        System.out.println(primeiroNegativo(new int[] {4, 9, -2, -7}));
    }
}`,
      opcoes: ['`2`', '`-2`', 'Não compila: falta `return` no fim do método', '`3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como o `while (true)` não tem `break`, o fim do método é inalcançável, e nenhum `return` final é exigido. O método devolve a posição do primeiro negativo, 2.',
    },
    {
      id: 'estagiario-t3-e04-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o código compile e imprima `2`.',
      codigo: `public class Atribuicao {
    public static void main(String[] args) {
        int x;
        int n = 2;
        if (n > 5) {
            x = 1;
        } ___ {
            x = 2;
        }
        System.out.println(x);
    }
}`,
      respostas: ['else'],
      saida: '2',
      explicacao: 'Com o `else`, os dois caminhos atribuem `x`, e a leitura no `println` passa na análise de atribuição definida.',
    },
    {
      id: 'estagiario-t3-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `int total = 0;
for (int i = 0; i < 3; i++) {
    int total = i;
}`,
      opcoes: [
        'Não compila: `total` já está declarada no escopo externo',
        'Compila: a `total` de dentro sombreia a de fora',
        'Compila, mas `total` termina valendo 2',
        'Não compila: `i` não pode ser usada dentro do laço',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Variáveis locais não podem ser sombreadas por outras locais. A `total` externa ainda está viva dentro do laço. Sombreamento só é permitido quando uma local esconde um campo.',
    },
    {
      id: 'estagiario-t3-e04-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int i = 0; i < 2; i++) {
    int dobro = i * 2;
    System.out.println(dobro);
}
for (int i = 5; i < 6; i++) {
    int dobro = i * 2;
    System.out.println(dobro);
}`,
      resposta: '0\n2\n10',
      explicacao: 'Cada laço tem o seu próprio `i` e o seu próprio `dobro`, que deixam de existir no fim do laço. Por isso os nomes podem ser reaproveitados no segundo laço.',
    },
    {
      id: 'estagiario-t3-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `final boolean LIGADO = true;
while (LIGADO) {
    System.out.println("rodando");
}
System.out.println("fim");`,
      opcoes: [
        'Não compila: o último `println` é inalcançável',
        'Compila e imprime "rodando" para sempre',
        'Compila e imprime `fim`',
        'Não compila: `final` não pode ser condição de laço',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: '`LIGADO` é `final` e inicializada com uma constante: o compilador a trata como o literal `true`. O laço sem `break` nunca termina, e o comando seguinte é inalcançável. Sem o `final`, compilaria (e rodaria para sempre).',
    },
    {
      id: 'estagiario-t3-e04-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais classes compilam? Escolha três.',
      opcoes: [
        '`class A { int f() { while (true) { } } }`',
        '`class B { int f(boolean b) { if (b) return 1; } }`',
        '`class C { int f() { throw new RuntimeException(); } }`',
        '`class D { int f(int x) { switch (x) { case 1: return 1; default: return 0; } } }`',
        '`class E { int f(int x) { switch (x) { case 1: return 1; case 2: return 2; } } }`',
      ],
      respostas: [0, 2, 3],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Um método pode terminar com `return`, com `throw` ou nunca terminar (laço infinito): o que não pode é chegar à `}` final. B deixa o caminho do `b` falso; E deixa o caminho de qualquer valor que não seja 1 nem 2, porque não tem `default`.',
    },
    {
      id: 'estagiario-t3-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `for (int i = 0; i < 3; i++) {
    break;
    System.out.println(i);
}`,
      opcoes: [
        'Não compila: o `println` é inalcançável',
        'Compila e não imprime nada',
        'Compila e imprime `0`',
        'Compila e imprime `0`, `1` e `2`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Depois de um `break` no mesmo bloco, nada pode ser executado. Com o `break` dentro de um `if`, o `println` voltaria a ser alcançável.',
    },
    {
      id: 'estagiario-t3-e04-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que a regra de **atribuição definida** exige?',
      opcoes: [
        'Que toda variável local tenha recebido valor em todos os caminhos possíveis antes de ser lida',
        'Que toda variável seja declarada com `final`',
        'Que todo campo seja inicializado no construtor',
        'Que toda variável seja usada pelo menos uma vez',
      ],
      resposta: 0,
      explicacao: 'O compilador analisa a estrutura do código, sem executá-lo, e recusa leituras de variáveis locais que possam não ter valor. Campos não entram na regra porque recebem valor padrão.',
    },
    {
      id: 'estagiario-t3-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int n = 1;
int x;
switch (n) {
    case 1 -> x = 10;
    default -> x = 20;
}
System.out.println(x);`,
      opcoes: ['`10`', 'Não compila: `x` pode não ter sido inicializada', '`20`', '`0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com `default`, todo caminho do `switch` atribui `x`, então a leitura é permitida. Sem o `default`, não compilaria. O `case 1` casa e x vale 10.',
    },
    {
      id: 'estagiario-t3-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `final int x;
boolean b = true;
if (b) x = 1;
x = 2;`,
      opcoes: [
        'Não compila: `x` pode já ter sido atribuída',
        'Compila; `x` termina valendo 2',
        'Compila; `x` termina valendo 1',
        'Não compila: `final` precisa de valor na declaração',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Uma `final` local pode ser declarada sem valor, mas cada caminho só pode atribuí-la uma vez. No caminho em que o `if` entra, a segunda atribuição seria a segunda vez. É a atribuição definida ao contrário: "certamente não atribuída".',
    },
  ],
};

export default episodio;
