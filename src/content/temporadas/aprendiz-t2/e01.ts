import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t2-e01',
  minutos: 12,
  aula,
  armadilhas: [
    'Assembly não é portátil: código x86 não roda em ARM.',
    'O montador traduz quase um para um; quem transforma C em assembly é o compilador.',
    'Na convenção System V (Linux e macOS), o primeiro argumento inteiro chega em `rdi`/`edi` e o retorno sai em `rax`/`eax`.',
    'Little-endian guarda o byte menos significativo primeiro: `0x12345678` fica `78 56 34 12` na memória.',
    'O `ByteBuffer` do Java é big-endian por padrão.',
    '`cmp` só liga flags; quem decide o desvio é o salto condicional seguinte.',
  ],
  recursos: [
    {
      titulo: 'JVMS 4: The class File Format',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html',
      tipo: 'documentacao',
      porque: 'A especificação do formato `.class`, que define a ordem dos bytes big-endian e a estrutura do bytecode.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de ByteBuffer',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/ByteBuffer.html',
      tipo: 'documentacao',
      porque: 'Como o Java converte números em bytes e escolhe a ordem com `order(ByteOrder)`.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seções "Access to binary data" e o método order(ByteOrder)',
    },
    {
      titulo: 'Compiler Explorer',
      url: 'https://godbolt.org/',
      tipo: 'ferramenta',
      porque: 'Cole a função `soma` em C, troque o compilador e o `-O0` por `-O2` e veja o assembly mudar ao vivo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crash Course Computer Science #11: The First Programming Languages',
      url: 'https://www.youtube.com/watch?v=RU1u-js7db8',
      tipo: 'video',
      porque: 'De programar com chaves e números a assembly, montadores e os primeiros compiladores de Grace Hopper.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Akitando #81: Aprendendo sobre Computadores com Super Mario (do jeito Hardcore++)',
      url: 'https://akitaonrails.com/2020/06/18/akitando-81-aprendendo-sobre-computadores-com-super-mario-do-jeito-hardcore/',
      tipo: 'video',
      porque: 'Em português: lendo o assembly do 6502 de um jogo de verdade. A página tem a transcrição completa.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Computer Systems: A Programmer\'s Perspective (Bryant e O\'Hallaron)',
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'O capítulo de referência sobre assembly x86-64 para quem programa em linguagens de alto nível.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3 "Machine-Level Representation of Programs"',
      nivel: 'fundo',
    },
    {
      titulo: 'Microsoft Learn: x64 calling convention',
      url: 'https://learn.microsoft.com/en-us/cpp/build/x64-calling-convention?view=msvc-170',
      tipo: 'documentacao',
      porque: 'A convenção de chamada do Windows, com argumentos em `rcx`, `rdx`, `r8` e `r9`, para comparar com a System V da aula.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'System V x86-64 psABI',
      url: 'https://gitlab.com/x86-psABIs/x86-64-ABI',
      tipo: 'documentacao',
      porque: 'A especificação que define a convenção de chamada usada no Linux e no macOS.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 3.2 "Function Calling Sequence"',
      nivel: 'fundo',
    },
    {
      titulo: 'Wikipédia: Linguagem assembly',
      url: 'https://pt.wikipedia.org/wiki/Assembly',
      tipo: 'artigo',
      porque: 'Montadores, mnemônicos e exemplos de assembly de vários processadores.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipedia: Endianness',
      url: 'https://en.wikipedia.org/wiki/Endianness',
      tipo: 'artigo',
      porque: 'Big-endian e little-endian com diagramas, a origem dos nomes e quais sistemas usam cada ordem.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Monte uma instrução x86 à mão',
    enunciado:
      'A instrução `mov eax, valor` em x86-64 é o byte `B8` seguido do valor em 4 bytes, em little-endian. Escreva a classe `Montador` com um método que recebe um `int` e devolve os 5 bytes da instrução, **sem usar** `ByteBuffer`. Imprima em hexadecimal a instrução para 1000:\n\n```text\nb8 e8 03 00 00\n```',
    dicas: [
      '1000 em hexadecimal é `0x3E8`, ou seja, os bytes `00 00 03 E8` do mais para o menos significativo.',
      'O byte menos significativo de `v` é `v & 0xFF`; o seguinte é `(v >> 8) & 0xFF`, e assim por diante.',
      'Little-endian: escreva primeiro o byte menos significativo.',
    ],
    solucao: `public class Montador {
    static int[] movEax(int valor) {
        int[] bytes = new int[5];
        bytes[0] = 0xB8;
        for (int i = 0; i < 4; i++) {
            bytes[i + 1] = (valor >> (8 * i)) & 0xFF;
        }
        return bytes;
    }

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int b : movEax(1000)) sb.append(String.format("%02x ", b));
        System.out.println(sb.toString().trim());
    }
}`,
    saida: 'b8 e8 03 00 00',
    comentarios:
      'Deslocar 8 × i bits e mascarar com `0xFF` extrai cada byte, do menos para o mais significativo, que é exatamente a ordem little-endian. É assim que um montador gera os bytes de uma instrução, e você acabou de escrever um montador de uma instrução só.',
  },
  exercicios: [
    {
      id: 'aprendiz-t2-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que um montador (assembler) faz?',
      opcoes: [
        'Traduz as instruções em assembly para os bytes do código de máquina, quase uma por uma',
        'Traduz código C para assembly',
        'Executa o programa linha a linha',
        'Junta vários arquivos objeto num executável',
        'Converte bytecode Java em código nativo',
      ],
      resposta: 0,
      explicacao: 'Cada mnemônico corresponde a uma instrução de máquina, então o montador faz uma tradução direta. C para assembly é trabalho do compilador, juntar objetos é do ligador, e bytecode para nativo é do JIT.',
    },
    {
      id: 'aprendiz-t2-e01-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num Linux x86-64, em qual registrador chega o primeiro argumento inteiro de uma função C?',
      opcoes: ['`rdi` (ou `edi`, para 32 bits)', '`rax`', '`rsp`', '`rcx`', '`rip`'],
      resposta: 0,
      explicacao: 'A convenção System V usa `rdi`, `rsi`, `rdx`, `rcx`, `r8` e `r9`, nessa ordem. `rax` é o retorno, `rsp` é o topo da pilha e `rip` é o contador de programa. No Windows, o primeiro argumento vai em `rcx`.',
    },
    {
      id: 'aprendiz-t2-e01-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Na mesma convenção, onde a função deixa o valor de retorno?',
      opcoes: ['Em `rax` (ou `eax`)', 'Em `rdi`', 'No topo da pilha', 'Em `rsp`', 'Num arquivo temporário'],
      resposta: 0,
      explicacao: 'Por isso o `lea eax, [rdi+rsi]` da versão otimizada não precisa de mais nada antes do `ret`: o resultado já está onde quem chamou vai procurar.',
    },
    {
      id: 'aprendiz-t2-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre assembly são verdadeiras? Escolha duas.',
      opcoes: [
        'Cada instrução corresponde, em geral, a uma instrução de máquina',
        'Assembly escrito para x86 não roda num processador ARM',
        'Assembly é portátil entre processadores, como C',
        'Assembly é interpretado pela JVM',
        'Programas em assembly não usam registradores',
      ],
      respostas: [0, 1],
      explicacao: 'Assembly é só código de máquina com nomes, então está preso à ISA do processador. C é que é portátil: o mesmo código é recompilado para cada processador. E registradores são o centro de qualquer programa em assembly.',
    },
    {
      id: 'aprendiz-t2-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No laço em assembly, qual é o papel do par `cmp ecx, edi` seguido de `jg fim`?',
      opcoes: [
        'Comparar i com n e sair do laço quando i passar de n',
        'Somar i em n',
        'Chamar a função fim',
        'Copiar edi para ecx',
      ],
      resposta: 0,
      explicacao: '`cmp` faz a subtração i − n só para ligar as flags. `jg` ("jump if greater") salta para `fim` quando o resultado indica i > n. É o teste do `for (...; i <= n; ...)` invertido: sai quando a condição de continuar falha.',
    },
    {
      id: 'aprendiz-t2-e01-q06',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class Bytes {
    static String hex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x ", b));
        return sb.toString().trim();
    }

    public static void main(String[] args) {
        int n = 0x0A0B0C0D;
        System.out.println(hex(ByteBuffer.allocate(4).putInt(n).array()));
        System.out.println(hex(ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(n).array()));
    }
}`,
      resposta: '0a 0b 0c 0d\n0d 0c 0b 0a',
      explicacao: 'O `ByteBuffer` começa big-endian: o byte mais significativo (`0a`) vem primeiro. Com `LITTLE_ENDIAN`, a ordem se inverte, que é como um processador x86 guardaria esse número na memória.',
    },
    {
      id: 'aprendiz-t2-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num computador x86 (little-endian), o `int` `0x12345678` é gravado no endereço 100. Qual byte fica no endereço 100?',
      opcoes: ['`0x78`', '`0x12`', '`0x34`', '`0x56`', 'Depende do sistema operacional'],
      resposta: 0,
      explicacao: 'Little-endian começa pelo byte menos significativo: o endereço 100 guarda `0x78`, o 101 guarda `0x56`, o 102 `0x34` e o 103 `0x12`. Quem decide a ordem é o processador, não o sistema operacional.',
    },
    {
      id: 'aprendiz-t2-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o código gerado com `gcc -O0` guarda os argumentos na pilha e relê logo depois, em vez de usar os registradores direto?',
      opcoes: [
        'Sem otimização, cada variável ganha um lugar fixo na memória, o que facilita a depuração',
        'Porque registradores não podem ser somados',
        'Porque a convenção de chamada proíbe usar `edi` dentro da função',
        'Porque a pilha é mais rápida que os registradores',
      ],
      resposta: 0,
      explicacao: 'No `-O0`, o compilador prioriza fidelidade ao código-fonte: um depurador consegue mostrar e alterar cada variável no seu endereço. Com `-O2`, as variáveis vivem em registradores e algumas nem existem mais, o que deixa o código rápido e a depuração difícil.',
    },
    {
      id: 'aprendiz-t2-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um registrador de 32 bits, como o `eax`, dá a volta quando passa do máximo. O `int` do Java se comporta igual. Qual é a saída?',
      codigo: `int x = 0x7FFFFFFF;
x++;
System.out.println(x == Integer.MIN_VALUE);`,
      opcoes: ['`true`', '`false`', 'Não compila', 'Lança `ArithmeticException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`0x7FFFFFFF` é o maior `int`. Somando 1, o bit de sinal liga e o valor vira `0x80000000`, o menor `int`. A especificação do Java define esse comportamento, que coincide com o da instrução `add` do processador.',
    },
    {
      id: 'aprendiz-t2-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é a ISA de um processador?',
      opcoes: [
        'O conjunto de instruções que ele entende, com seus formatos e registradores',
        'O sistema operacional que vem instalado nele',
        'A velocidade do clock',
        'A quantidade de memória cache',
      ],
      resposta: 0,
      explicacao: 'ISA (instruction set architecture) é o "idioma" da máquina: x86-64, ARM64, RISC-V. Dois processadores com a mesma ISA rodam o mesmo código de máquina, mesmo sendo de fabricantes diferentes.',
    },
    {
      id: 'aprendiz-t2-e01-q11',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Compiladores trocam multiplicações e divisões por potências de 2 por deslocamentos de bits. Digite a saída exata.',
      codigo: `System.out.println(5 << 3);
System.out.println(40 >> 2);
System.out.println(-40 >> 2);
System.out.println(-40 >>> 28);`,
      resposta: '40\n10\n-10\n15',
      explicacao: '`<< 3` multiplica por 8 e `>> 2` divide por 4, preservando o sinal (o `>>` copia o bit de sinal). Já o `>>>` empurra zeros pela esquerda: os 4 bits de cima de -40 (`0xFFFFFFD8`) são `1111`, que vale 15.',
    },
    {
      id: 'aprendiz-t2-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'No x86-64, o que o registrador `rsp` guarda?',
      opcoes: ['O endereço do topo da pilha', 'O resultado das funções', 'O endereço da próxima instrução', 'O primeiro argumento', 'O número de núcleos'],
      resposta: 0,
      explicacao: '`rsp` é o *stack pointer*. Instruções como `push`, `pop`, `call` e `ret` o atualizam sozinhas. O endereço da próxima instrução fica em `rip`.',
    },
    {
      id: 'aprendiz-t2-e01-q13',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Onde ainda se escreve assembly à mão hoje? Escolha duas.',
      opcoes: [
        'Em trechos de sistemas operacionais e drivers, como o início do boot',
        'Em rotinas de criptografia e multimídia que precisam de desempenho máximo',
        'Em telas de sites',
        'Em APIs REST com Spring Boot',
        'Em consultas SQL',
      ],
      respostas: [0, 1],
      explicacao: 'Assembly aparece onde é preciso controle total do hardware ou de cada ciclo. Para aplicações comuns, linguagens de alto nível e compiladores otimizadores fazem um trabalho igual ou melhor, com muito menos esforço.',
    },
    {
      id: 'aprendiz-t2-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quantos bytes ocupa a instrução `ret` em x86-64?',
      opcoes: ['1 byte (`C3`)', '4 bytes', '8 bytes', '15 bytes', 'Depende do sistema operacional'],
      resposta: 0,
      explicacao: 'x86 tem instruções de tamanho variável: `ret` e `nop` usam 1 byte, `mov eax, 1` usa 5, e o máximo é 15. Em ARM64, toda instrução tem 4 bytes.',
    },
    {
      id: 'aprendiz-t2-e01-q15',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com um operador de deslocamento para multiplicar 7 por 8. O programa deve imprimir `56`.',
      codigo: `public class Desloca {
    public static void main(String[] args) {
        int x = 7 ___ 3;
        System.out.println(x);
    }
}`,
      respostas: ['<<'],
      saida: '56',
      explicacao: 'Deslocar 3 bits para a esquerda multiplica por 2³ = 8. É uma das trocas que compiladores fazem por conta própria, porque o deslocamento é mais barato que a multiplicação em muitos processadores.',
    },
  ],
};

export default episodio;
