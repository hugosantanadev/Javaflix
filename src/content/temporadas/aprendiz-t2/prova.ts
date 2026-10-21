import type { Exercicio } from '../../types';

/** Prova da temporada Aprendiz T2: do código à máquina. */
const prova: Exercicio[] = [
  {
    id: 'aprendiz-t2-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a relação entre assembly e código de máquina?',
    opcoes: [
      'Assembly é o código de máquina escrito com nomes legíveis; o montador traduz quase um para um',
      'Assembly é uma linguagem de alto nível que roda em qualquer processador',
      'Código de máquina é gerado a partir do bytecode Java pelo montador',
      'São a mesma coisa: o processador lê assembly diretamente',
    ],
    resposta: 0,
    explicacao: 'O processador só entende bytes. O assembly dá nomes (`mov`, `add`, `jmp`) a esses bytes e rótulos aos endereços. Como cada processador tem as próprias instruções, assembly de x86 não roda em ARM.',
  },
  {
    id: 'aprendiz-t2-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Num Linux x86-64, uma função C `int soma(int a, int b)` recebe `a` e `b` e devolve o resultado em quais registradores?',
    opcoes: [
      '`a` em `edi`, `b` em `esi`, resultado em `eax`',
      '`a` em `eax`, `b` em `ebx`, resultado em `ecx`',
      '`a` em `rcx`, `b` em `rdx`, resultado em `r8`',
      'Os argumentos sempre chegam pela pilha, e o resultado também',
    ],
    resposta: 0,
    explicacao: 'Pela convenção System V, os argumentos inteiros chegam em `rdi`, `rsi`, `rdx`, `rcx`, `r8` e `r9`, e o retorno sai em `rax`. Para `int`, de 32 bits, usam-se as metades `edi`, `esi` e `eax`. A ordem `rcx`, `rdx`, `r8`, `r9` é a do Windows.',
  },
  {
    id: 'aprendiz-t2-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Em assembly, como um laço `for` é representado?',
    opcoes: [
      'Com uma comparação, um salto condicional para sair e um salto incondicional de volta ao teste',
      'Com uma instrução `for` que o processador executa n vezes',
      'Copiando o corpo do laço n vezes, sempre',
      'Com uma chamada recursiva da função',
    ],
    resposta: 0,
    explicacao: 'Não existe `for` no processador. O `cmp` liga as flags, um salto como `jg` sai quando a condição falha e um `jmp` volta para o teste. Desenrolar o laço é uma otimização possível, não a forma geral.',
  },
  {
    id: 'aprendiz-t2-prova-q04',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `byte[] b = java.nio.ByteBuffer.allocate(4).putInt(258).array();
System.out.println(b[0] + " " + b[1] + " " + b[2] + " " + b[3]);`,
    opcoes: ['`0 0 1 2`', '`2 1 0 0`', '`0 0 0 258`', '`258 0 0 0`', '`1 2 0 0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '258 é `0x00000102`. O `ByteBuffer` é big-endian por padrão: o byte mais significativo vem primeiro, então os bytes são 0, 0, 1 e 2. Em little-endian, a ordem seria `2 1 0 0`.',
  },
  {
    id: 'aprendiz-t2-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual etapa da compilação de um programa C junta o código objeto com as bibliotecas para gerar o executável?',
    opcoes: ['Ligação (*linker*)', 'Pré-processamento', 'Montagem', 'Análise semântica'],
    resposta: 0,
    explicacao: 'A ordem é pré-processar (`#include` e `#define`), compilar para assembly, montar para código objeto e ligar. É o ligador que resolve as chamadas a funções de outras unidades, como o `printf` da biblioteca padrão.',
  },
  {
    id: 'aprendiz-t2-prova-q06',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais bugs comuns em C o Java transforma em erros previsíveis ou elimina? Escolha três.',
    opcoes: [
      'Ler fora dos limites de um array',
      'Usar memória depois de liberá-la',
      'Seguir um ponteiro nulo sem aviso',
      'Laço infinito',
      'Erro de lógica num cálculo',
    ],
    respostas: [0, 1, 2],
    explicacao: 'Acesso fora do array vira `ArrayIndexOutOfBoundsException`, não existe `free` para usar depois, e o nulo vira `NullPointerException` com mensagem. Laços infinitos e erros de lógica continuam sendo responsabilidade de quem programa, em qualquer linguagem.',
  },
  {
    id: 'aprendiz-t2-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `int max = Integer.MAX_VALUE;
System.out.println(max + 1 == Integer.MIN_VALUE);`,
    opcoes: ['`true`', '`false`', 'Lança `ArithmeticException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Em C, overflow de inteiro com sinal é comportamento indefinido. Em Java ele é definido: a soma dá a volta, em complemento de dois, e o maior `int` mais um vira o menor. Só `Math.addExact` lança exceção.',
  },
  {
    id: 'aprendiz-t2-prova-q08',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Por que um executável compilado de C para Windows x86-64 não roda num Linux ARM?',
    opcoes: [
      'Porque o processador tem outras instruções e o sistema usa outro formato de executável e outras chamadas de sistema',
      'Porque o Linux não aceita programas escritos em C',
      'Porque falta instalar a JVM',
      'Porque executáveis só rodam na máquina onde foram compilados',
    ],
    resposta: 0,
    explicacao: 'São duas barreiras: a arquitetura (x86 e ARM falam línguas de máquina diferentes) e o sistema operacional (formato PE no Windows, ELF no Linux, e chamadas de sistema próprias). Um `.class`, por outro lado, roda em qualquer JVM.',
  },
  {
    id: 'aprendiz-t2-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual etapa do compilador transforma a sequência de caracteres em tokens?',
    opcoes: ['Análise léxica', 'Análise sintática', 'Análise semântica', 'Geração de código', 'Otimização'],
    resposta: 0,
    explicacao: 'O lexer agrupa caracteres em palavras (palavras-chave, identificadores, literais, operadores) e descarta espaços e comentários. O parser recebe esses tokens e monta a árvore.',
  },
  {
    id: 'aprendiz-t2-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Na árvore sintática de `2 + 3 * 4`, por que a multiplicação é calculada antes da soma?',
    opcoes: [
      'Porque ela fica mais funda na árvore, como filho do nó da soma',
      'Porque o processador sempre multiplica antes de somar',
      'Porque o lexer reordena os tokens',
      'Porque a JVM avalia da direita para a esquerda',
    ],
    resposta: 0,
    explicacao: 'O parser aplica as regras de precedência ao montar a árvore. Para calcular a soma, é preciso primeiro o valor de seus filhos, e um deles é o `*`. Parênteses só mudam a forma da árvore.',
  },
  {
    id: 'aprendiz-t2-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `final String a = "Ja";
String b = "va";
String java = "Java";
System.out.println((java == a + "va") + " " + (java == "Ja" + b));`,
    opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`a` é `final` e inicializada com constante, então `a + "va"` é uma expressão constante: o `javac` calcula e usa o mesmo `"Java"` do pool. `b` não é `final`, então `"Ja" + b` é calculado na execução e cria um objeto novo.',
  },
  {
    id: 'aprendiz-t2-prova-q12',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos não compilam? Escolha dois.',
    opcoes: [
      '`while (false) { System.out.println("x"); }`',
      '`for (;;) { } System.out.println("x");`',
      '`if (false) { System.out.println("x"); }`',
      '`int x = 10 / 0;`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: 'O corpo do `while (false)` é inalcançável, e o comando depois de um `for (;;)` sem `break` também. O `if (false)` é permitido de propósito, para desligar código com constantes. `10 / 0` compila e só falha na execução.',
  },
  {
    id: 'aprendiz-t2-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Que tipo de erro é `int x = "dez";` e em que etapa o compilador o encontra?',
    opcoes: [
      'Erro de tipos, na análise semântica',
      'Erro de sintaxe, na análise sintática',
      'Erro léxico, na análise léxica',
      'Erro de execução, na JVM',
    ],
    resposta: 0,
    explicacao: 'A frase está bem formada (tipo, nome, `=`, valor, `;`), então passa pelo lexer e pelo parser. É a análise semântica que confere se o tipo do valor combina com o da variável.',
  },
  {
    id: 'aprendiz-t2-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class Tabela {
    static {
        System.out.println("carregando");
    }
    static final int LIMITE = 3;
    static int usos = 0;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Tabela.LIMITE);
        System.out.println(Tabela.usos);
    }
}`,
    opcoes: [
      '`3\ncarregando\n0`',
      '`carregando\n3\n0`',
      '`3\n0`',
      '`carregando\n3\ncarregando\n0`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`LIMITE` é uma constante de compilação: o valor 3 foi copiado para `Main` e ler esse campo não inicializa `Tabela`. `usos` não é `final`, então lê-lo é um uso ativo, e o bloco `static` roda nesse momento, uma única vez.',
  },
  {
    id: 'aprendiz-t2-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Por que o bytecode da JVM foi projetado para uma máquina de pilha, e não de registradores?',
    opcoes: [
      'Para não depender de quantos registradores o processador real tem; o JIT faz esse mapeamento',
      'Porque máquinas de pilha são sempre mais rápidas',
      'Porque a JVM não pode usar registradores',
      'Para que o bytecode possa ser lido por pessoas',
    ],
    resposta: 0,
    explicacao: 'x86-64 tem 16 registradores de uso geral, ARM64 tem 31. Com operandos numa pilha, o bytecode é o mesmo para todos, e o JIT decide, em cada máquina, como alocar os registradores ao gerar o código nativo.',
  },
  {
    id: 'aprendiz-t2-prova-q16',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre a JVM HotSpot são verdadeiras? Escolha duas.',
    opcoes: [
      'O código começa interpretado e os trechos mais executados são compilados pelo JIT',
      'Cada thread tem a própria pilha, mas todas compartilham o heap',
      'O `javac` gera código nativo para o processador da máquina',
      'Todas as classes do classpath são carregadas quando o programa começa',
      'Objetos são liberados quando o método que os criou termina',
    ],
    respostas: [0, 1],
    explicacao: 'O `javac` gera bytecode, e quem gera código nativo é o JIT, durante a execução. Classes são carregadas sob demanda. E um objeto só vira lixo quando nada alcançável o referencia, o que pode ser bem depois do fim do método.',
  },
  {
    id: 'aprendiz-t2-prova-q17',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `class Config {
    static String nome = null;
    static int tamanho = nome.length();
}

public class Main {
    public static void main(String[] args) {
        System.out.println("antes");
        System.out.println(Config.tamanho);
    }
}`,
    opcoes: [
      'Imprime `antes` e lança `ExceptionInInitializerError`',
      'Lança `NullPointerException` antes de imprimir qualquer coisa',
      'Imprime `antes` e lança `NullPointerException`, sem embrulho',
      'Imprime `antes` e `0`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'ExceptionInInitializerError' },
    explicacao: '`Config` só é inicializada no primeiro uso ativo, depois do `antes`. Na inicialização, `nome.length()` lança `NullPointerException`, e a JVM a embrulha num `ExceptionInInitializerError`, porque escapou de um inicializador estático.',
  },
  {
    id: 'aprendiz-t2-prova-q18',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `java.util.ArrayDeque<Integer> pilha = new java.util.ArrayDeque<>();
pilha.push(7);
pilha.push(2);
pilha.push(pilha.pop() * pilha.pop());
pilha.push(4);
int direita = pilha.pop();
int esquerda = pilha.pop();
System.out.println(esquerda - direita);`,
    resposta: '10',
    explicacao: 'É uma máquina de pilha calculando `7 * 2 - 4`: empilha 7 e 2, multiplica (14 no topo), empilha 4 e subtrai na ordem certa, 14 - 4. É o que o bytecode `bipush 7, iconst_2, imul, iconst_4, isub` faria.',
  },
];

export default prova;
