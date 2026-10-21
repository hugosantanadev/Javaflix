import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t2-e02',
  minutos: 12,
  aula,
  armadilhas: [
    'A ordem é pré-processamento, compilação, montagem e ligação.',
    '`#include` é texto colado pelo pré-processador, não um import do Java.',
    '"undefined reference" é erro do ligador, não do compilador.',
    'Executável C não é portátil: muda com a ISA e com o sistema operacional.',
    'Em C, acesso fora do array é comportamento indefinido; em Java, é exceção.',
    'Em Java, `int` tem sempre 32 bits e `long` sempre 64, em qualquer máquina.',
  ],
  recursos: [
    {
      titulo: 'JEP 454: Foreign Function & Memory API',
      url: 'https://openjdk.org/jeps/454',
      tipo: 'documentacao',
      porque: 'A API final do Java 22 para chamar funções C e lidar com memória nativa sem JNI.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 4.2: Primitive Types and Values',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2',
      tipo: 'documentacao',
      porque: 'Onde o Java fixa o tamanho e o comportamento de cada tipo primitivo, ao contrário do C.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'CS50x: notas da semana 1 (C)',
      url: 'https://cs50.harvard.edu/x/2025/notes/1/',
      tipo: 'tutorial',
      porque: 'O curso de Harvard explica C do zero, inclusive as etapas de compilação, com vídeo da aula.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Akitando #117: Linguagem Compilada vs Interpretada',
      url: 'https://akitaonrails.com/2022/04/15/akitando-117-linguagem-compilada-vs-interpretada-qual-e-melhor/',
      tipo: 'video',
      porque: 'Em português: o Hello World em C e Java lado a lado, com pré-processador, linker e bibliotecas.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Seção "Hello World em C e Java"',
    },
    {
      titulo: 'Compiler Explorer',
      url: 'https://godbolt.org/',
      tipo: 'ferramenta',
      porque: 'Escreva C e veja o assembly gerado, linha por linha, com cores ligando o código-fonte ao resultado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Computer Systems: A Programmer\'s Perspective (Bryant e O\'Hallaron)',
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'Explica em detalhe o que o ligador faz e como um executável é carregado na memória.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7 "Linking" e cap. 9 "Virtual Memory"',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 15.10.4: Run-Time Evaluation of Array Access Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.10.4',
      tipo: 'documentacao',
      porque: 'A regra que obriga o Java a conferir os limites de todo acesso a array, o que o C não faz.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Foreign Function and Memory API',
      url: 'https://docs.oracle.com/en/java/javase/22/core/foreign-function-and-memory-api.html',
      tipo: 'documentacao',
      porque: 'O guia oficial para chamar funções C a partir do Java, com exemplos usando a `strlen` da biblioteca padrão.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'cppreference: C language',
      url: 'https://en.cppreference.com/c/language',
      tipo: 'documentacao',
      porque: 'A referência da linguagem C: tipos, ponteiros, arrays e o que é comportamento indefinido.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Beej's Guide to C Programming: Pointers",
      url: 'https://beej.us/guide/bgc/html/split/pointers.html',
      tipo: 'tutorial',
      porque: 'Ponteiros explicados com calma e bom humor. O capítulo "Manual Memory Allocation" cobre `malloc` e `free`.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Um buffer overflow de mentira',
    enunciado:
      'Simule em Java a memória de um programa C: um `byte[] memoria` de 16 posições, em que os bytes 0 a 7 são o buffer `nome` e o byte 8 é o `saldo`. Escreva `copiarSemChecagem`, que copia os bytes de um texto para o buffer **sem conferir o tamanho**, e `copiarComChecagem`, que para no fim do buffer. Com o saldo valendo 100, copie `"Javaflix!!"` (10 bytes) e mostre o efeito:\n\n```text\nsaldo antes: 100\nsaldo depois, sem checagem: 33\nsaldo depois, com checagem: 100\n```',
    dicas: [
      'Copie byte a byte num laço, começando na posição 0 do array `memoria`.',
      'O décimo byte de `"Javaflix!!"` é um `!`, código 33, e cai em cima do saldo.',
      'A versão segura só copia `Math.min(texto.length, 8)` bytes.',
    ],
    solucao: `public class Estouro {
    static final int NOME = 0, TAMANHO_NOME = 8, SALDO = 8;

    static void copiarSemChecagem(byte[] memoria, byte[] texto) {
        for (int i = 0; i < texto.length; i++) {
            memoria[NOME + i] = texto[i];
        }
    }

    static void copiarComChecagem(byte[] memoria, byte[] texto) {
        for (int i = 0; i < Math.min(texto.length, TAMANHO_NOME); i++) {
            memoria[NOME + i] = texto[i];
        }
    }

    public static void main(String[] args) {
        byte[] texto = "Javaflix!!".getBytes();

        byte[] memoria = new byte[16];
        memoria[SALDO] = 100;
        System.out.println("saldo antes: " + memoria[SALDO]);
        copiarSemChecagem(memoria, texto);
        System.out.println("saldo depois, sem checagem: " + memoria[SALDO]);

        memoria = new byte[16];
        memoria[SALDO] = 100;
        copiarComChecagem(memoria, texto);
        System.out.println("saldo depois, com checagem: " + memoria[SALDO]);
    }
}`,
    saida: 'saldo antes: 100\nsaldo depois, sem checagem: 33\nsaldo depois, com checagem: 100',
    comentarios:
      'O Java não deixa você estourar um array de verdade, então a simulação usa um array grande para fazer o papel da memória inteira, como ela é vista por um programa C. Funções como `strcpy` do C copiam até achar o fim do texto, sem saber o tamanho do destino, e foi assim que surgiram muitos ataques reais: o texto excedente sobrescreve o que vem depois, inclusive o endereço de retorno na pilha.',
  },
  exercicios: [
    {
      id: 'aprendiz-t2-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a ordem das etapas ao compilar um programa C?',
      opcoes: [
        'Pré-processamento, compilação, montagem, ligação',
        'Compilação, pré-processamento, ligação, montagem',
        'Ligação, montagem, compilação, pré-processamento',
        'Montagem, compilação, pré-processamento, ligação',
      ],
      resposta: 0,
      explicacao: 'O texto é expandido, vira assembly, vira código objeto e por fim é ligado às bibliotecas. O `gcc` chama cada uma dessas ferramentas por você.',
    },
    {
      id: 'aprendiz-t2-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o ligador (linker) faz?',
      opcoes: [
        'Junta os arquivos objeto e as bibliotecas, resolvendo as referências entre eles',
        'Expande os `#include` e `#define`',
        'Transforma C em assembly',
        'Carrega o programa na memória toda vez que ele roda',
        'Confere os tipos das variáveis',
      ],
      resposta: 0,
      explicacao: 'O código objeto chama funções que estão em outros arquivos ou bibliotecas. O ligador encontra onde cada uma está e preenche os endereços. Expandir `#include` é do pré-processador, e carregar na memória é do sistema operacional.',
    },
    {
      id: 'aprendiz-t2-e02-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quem trata a linha `#include <stdio.h>`?',
      opcoes: ['O pré-processador', 'O compilador', 'O ligador', 'O sistema operacional', 'O montador'],
      resposta: 0,
      explicacao: 'Linhas que começam com `#` são diretivas do pré-processador. O `#include` copia o conteúdo do arquivo no lugar da linha antes de o compilador ver qualquer coisa.',
    },
    {
      id: 'aprendiz-t2-e02-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre um executável C e um `.class` Java são verdadeiras? Escolha duas.',
      opcoes: [
        'O executável C contém código de máquina de um processador específico',
        'O `.class` roda em qualquer sistema que tenha uma JVM',
        'O executável C roda em qualquer sistema operacional',
        'O `.class` contém código de máquina x86',
        'Os dois precisam de uma JVM para rodar',
      ],
      respostas: [0, 1],
      explicacao: 'O executável nativo depende da ISA e do formato do sistema operacional. O `.class` tem bytecode, que é independente de plataforma, e cada JVM o traduz.',
    },
    {
      id: 'aprendiz-t2-e02-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em C, escrever em `v[3]` num array de 3 posições é comportamento indefinido. E em Java, qual é o resultado?',
      codigo: `public class Notas {
    public static void main(String[] args) {
        int[] notas = new int[3];
        notas[3] = 10;
        System.out.println("gravou");
    }
}`,
      opcoes: [
        'Lança `ArrayIndexOutOfBoundsException`',
        'Imprime `gravou`',
        'Não compila',
        'Sobrescreve outra variável sem aviso',
        'Aumenta o array para 4 posições',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      explicacao: 'Os índices vão de 0 a 2. O compilador não confere índices, mas a JVM confere todo acesso em tempo de execução e lança a exceção antes de escrever qualquer coisa.',
    },
    {
      id: 'aprendiz-t2-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em C, o que pode acontecer ao escrever em `v[10]` num array `int v[10]`?',
      opcoes: [
        'Qualquer coisa: o padrão chama isso de comportamento indefinido, e a memória vizinha pode ser corrompida sem aviso',
        'O compilador sempre recusa o código',
        'O programa sempre lança uma exceção',
        'O array cresce automaticamente',
      ],
      resposta: 0,
      explicacao: 'C não confere limites. O valor pode cair em cima de outra variável, do endereço de retorno ou de nada importante, e o programa pode até parecer funcionar. É a origem do buffer overflow.',
    },
    {
      id: 'aprendiz-t2-e02-q07',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] v = new int[5];
try {
    v[5] = 1;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println(e.getMessage());
}`,
      resposta: 'Index 5 out of bounds for length 5',
      explicacao: 'A mensagem da exceção diz o índice tentado e o tamanho do array. Um array de 5 posições aceita os índices de 0 a 4.',
    },
    {
      id: 'aprendiz-t2-e02-q08',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantos bits tem um `long` em Java?',
      opcoes: ['Sempre 64', 'Depende do sistema operacional', '32 no Windows e 64 no Linux', 'No mínimo 32', 'Depende do processador'],
      resposta: 0,
      explicacao: 'A especificação do Java fixa os tamanhos de todos os primitivos. Em C, `long` tem 32 bits no Windows de 64 bits e 64 bits no Linux de 64 bits.',
    },
    {
      id: 'aprendiz-t2-e02-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais problemas comuns em C o Java evita por projeto? Escolha três.',
      opcoes: [
        'Acesso fora dos limites de um array sem aviso',
        'Liberar a mesma memória duas vezes',
        'Aritmética com ponteiros para endereços arbitrários',
        'Erros de lógica na regra de negócio',
        'Laços infinitos',
        'Divisão inteira que descarta a parte decimal',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Java confere limites, não tem `free` nem ponteiros aritméticos. Erros de lógica, laços infinitos e a divisão inteira truncando continuam sendo responsabilidade de quem programa, em qualquer linguagem.',
    },
    {
      id: 'aprendiz-t2-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No código C `int idade = 30; int *p = &idade; *p = 31;`, o que a última linha faz?',
      opcoes: [
        'Muda o valor de `idade` para 31, através do endereço guardado em `p`',
        'Faz `p` apontar para o endereço 31',
        'Cria uma cópia de `idade` com valor 31',
        'Não compila',
      ],
      resposta: 0,
      explicacao: '`p` guarda o endereço de `idade`, e `*p` acessa o que está nesse endereço. Para mudar para onde `p` aponta, seria `p = ...` sem o asterisco.',
    },
    {
      id: 'aprendiz-t2-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um executável compilado para Linux x86-64 não roda no Windows, mesmo no mesmo computador. Por quê?',
      opcoes: [
        'O formato do arquivo e as chamadas ao sistema operacional são diferentes',
        'O processador muda de ISA quando troca o sistema operacional',
        'O Windows não executa código de máquina',
        'O arquivo precisa ser recompilado a cada execução',
      ],
      resposta: 0,
      explicacao: 'A CPU é a mesma, mas o Linux usa o formato ELF e o Windows o PE, e cada sistema oferece serviços (abrir arquivo, escrever na tela) de jeitos diferentes. O código de máquina em si poderia até ser parecido.',
    },
    {
      id: 'aprendiz-t2-e02-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = Integer.MAX_VALUE;
System.out.println(x + 1);
System.out.println(Math.addExact(1, 2));`,
      resposta: '-2147483648\n3',
      explicacao: 'Em Java, overflow de `int` é definido: dá a volta para o menor valor. Em C, o mesmo overflow com sinal é comportamento indefinido. `Math.addExact` faz a soma normal quando ela cabe.',
    },
    {
      id: 'aprendiz-t2-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `System.out.println(Math.addExact(Integer.MAX_VALUE, 1));`,
      opcoes: ['Lança `ArithmeticException`', 'Imprime `-2147483648`', 'Imprime `2147483648`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArithmeticException' },
      explicacao: 'Os métodos `*Exact` da classe `Math` conferem overflow e lançam `ArithmeticException` em vez de dar a volta. São a escolha certa quando um valor fora da faixa indica um erro, como em cálculos financeiros.',
    },
    {
      id: 'aprendiz-t2-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em que linguagem é escrita a maior parte da JVM HotSpot, a JVM mais usada?',
      opcoes: ['C++', 'Java', 'Assembly', 'Python', 'Kotlin'],
      resposta: 0,
      explicacao: 'A HotSpot é um programa C++, com trechos em assembly. Partes da plataforma Java são escritas em Java, mas o núcleo que interpreta, compila e coleta lixo é nativo.',
    },
    {
      id: 'aprendiz-t2-e02-q15',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a constante que informa quantos bits tem um `int`. O programa deve imprimir `32`.',
      codigo: `public class Bits {
    public static void main(String[] args) {
        System.out.println(Integer.___);
    }
}`,
      respostas: ['SIZE'],
      saida: '32',
      explicacao: 'Cada wrapper tem `SIZE` (em bits) e `BYTES` (em bytes). Como o Java fixa os tamanhos, esses valores são os mesmos em qualquer máquina.',
    },
  ],
};

export default episodio;
