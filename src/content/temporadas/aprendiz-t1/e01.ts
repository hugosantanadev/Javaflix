import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t1-e01',
  minutos: 11,
  aula,
  armadilhas: [
    'Com n bits existem 2ⁿ combinações, mas o maior valor sem sinal é 2ⁿ − 1 (com 8 bits, 255).',
    'Na conversão por divisões, os restos são lidos de baixo para cima.',
    'Cada dígito hexadecimal vale exatamente 4 bits; dois dígitos formam um byte.',
    'Em Java, um zero à esquerda deixa o literal em octal: `010` vale 8.',
    '`0b` só aceita os dígitos 0 e 1; `0b102` não compila.',
    'KB tem 1000 bytes; KiB tem 1024.',
    'Em UTF-8 nem todo caractere ocupa 1 byte: `ã` ocupa 2.',
  ],
  ia: {
    uso:
      'A IA explica bem a ideia de base numérica e gera exercícios de conversão. Para as contas em si, use-a como tutora e confira cada resultado com os métodos de `Integer`, porque conversões feitas de cabeça por ela erram com frequência.',
    pedido:
      'Sou iniciante em Java e estou aprendendo bases numéricas.\n- Me dê 5 números entre 50 e 300 para converter para binário e hexadecimal, sem as respostas.\n- Depois que eu responder, corrija cada um mostrando as divisões por 2 e o agrupamento de 4 em 4 bits.\n- Termine com o código Java que confere as minhas respostas.',
    erros: [
      'Erra conversões de números grandes feitas de cabeça.',
      'Diz que o `char` do Java tem 8 bits, como em C.',
      'Confunde KB (1000 bytes) com KiB (1024 bytes), e bits com bytes.',
    ],
    conferir: [
      'Confira toda conversão com `Integer.toBinaryString`, `toHexString` e `parseInt(texto, base)`.',
      'Refaça a conversão pelo outro caminho: some os pesos dos bits ligados.',
      'Para tamanhos, veja se a unidade é b ou B, e KB ou KiB.',
    ],
  },
  recursos: [
    {
      titulo: 'Javadoc da classe Integer',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html',
      tipo: 'documentacao',
      porque: 'A referência de todos os métodos de conversão entre bases que o Java oferece.',
      gratuito: true,
      idioma: 'en',
      onde: 'Métodos toBinaryString, toHexString, toOctalString e parseInt(String, int)',
    },
    {
      titulo: 'RFC 3629: UTF-8',
      url: 'https://www.rfc-editor.org/rfc/rfc3629',
      tipo: 'documentacao',
      porque: 'A especificação oficial do UTF-8, com a tabela de quantos bytes cada faixa de caracteres usa.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 3, "UTF-8 definition"',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Print an Integer in Binary Format in Java',
      url: 'https://www.baeldung.com/java-print-integer-binary',
      tipo: 'artigo',
      porque: 'Três jeitos de mostrar os bits de um número em Java, inclusive escrevendo a conversão à mão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crash Course Computer Science #4: Representing Numbers and Letters with Binary',
      url: 'https://www.youtube.com/watch?v=1GSjbWt0c9M',
      tipo: 'video',
      porque: 'Binário, bytes, ASCII e Unicode em 10 minutos, com animações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Akitando #80: O Guia Hardcore de Introdução à Computação',
      url: 'https://akitaonrails.com/2020/06/04/akitando-80-o-guia-hardcore-de-introducao-a-computacao/',
      tipo: 'video',
      porque: 'Em português, com a transcrição na página: binário e hexadecimal explicados num computador de 8 bits de verdade.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Primeira parte, sobre binário e hexadecimal',
    },
    {
      titulo: 'Code: The Hidden Language of Computer Hardware and Software (Charles Petzold)',
      url: 'https://www.codehiddenlanguage.com/',
      tipo: 'livro',
      porque: 'O melhor livro para entender o computador do zero, sem pressupor nada. O site da 2ª edição tem circuitos interativos.',
      gratuito: false,
      idioma: 'en',
      onde: '1ª edição: cap. 7 "Our Ten Digits", 8 "Alternatives to Ten", 9 "Bit by Bit by Bit" e 15 "Bytes and Hex"',
    },
    {
      titulo: 'JLS 3.10.1: Integer Literals',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.1',
      tipo: 'documentacao',
      porque: 'As regras oficiais dos literais decimais, hexadecimais (`0x`), octais (`0`) e binários (`0b`), incluindo o `_` entre dígitos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Character: Unicode Character Representations',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html#unicode',
      tipo: 'documentacao',
      porque: 'Por que o `char` tem 16 bits e como o Java guarda caracteres fora desse limite em pares de `char`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Wikipédia: Sistema de numeração binário',
      url: 'https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_bin%C3%A1rio',
      tipo: 'artigo',
      porque: 'Conversões entre bases feitas passo a passo, com a história do binário.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Joel Spolsky: The Absolute Minimum Every Software Developer Must Know About Unicode',
      url: 'https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/',
      tipo: 'artigo',
      porque: 'O texto clássico sobre codificações: por que "texto puro" não existe e de onde vêm os caracteres trocados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Computer Systems: A Programmer's Perspective (Bryant e O'Hallaron)",
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'O livro de Carnegie Mellon sobre o computador visto por quem programa. O capítulo 2 é a referência sobre representação de números.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2 "Representing and Manipulating Information", seções 2.1 e 2.2',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Conversor de base sem atalho',
    enunciado:
      'Escreva a classe `Conversor` com um método `paraBinario(int n)` que devolve a representação binária de um número não negativo **sem usar** `Integer.toBinaryString`. Use o método das divisões por 2. Depois imprima o resultado para 0, 5, 13, 255 e 2026:\n\n```text\n0\n101\n1101\n11111111\n11111101010\n```',
    dicas: [
      'O resto de `n % 2` é o bit da direita; `n / 2` descarta esse bit.',
      'Os restos saem na ordem inversa. Um `StringBuilder` com `insert(0, ...)` ou `reverse()` resolve.',
      'O zero é um caso especial: o laço nem roda, então trate antes.',
    ],
    solucao: `public class Conversor {
    static String paraBinario(int n) {
        if (n == 0) return "0";
        StringBuilder bits = new StringBuilder();
        while (n > 0) {
            bits.insert(0, n % 2);
            n = n / 2;
        }
        return bits.toString();
    }

    public static void main(String[] args) {
        int[] numeros = {0, 5, 13, 255, 2026};
        for (int n : numeros) {
            System.out.println(paraBinario(n));
        }
    }
}`,
    saida: '0\n101\n1101\n11111111\n11111101010',
    comentarios:
      'Cada volta do laço extrai o bit menos significativo com `% 2` e o coloca na frente do texto. Para converter para qualquer base, basta trocar o 2 pela base e mapear os restos maiores que 9 para letras, que é o que `Integer.toString(n, base)` faz por dentro.',
  },
  bugs: [
    {
      id: 'aprendiz-t1-e01-b01',
      dificuldade: 1,
      sintoma: 'O conversor diz que 13 em binário é `1011`, mas 8 + 0 + 2 + 1 = 11.',
      codigo: `public class Conversor {
    static String binario(int n) {
        String bits = "";
        while (n > 0) {
            int resto = n % 2;
            bits = bits + resto;
            n = n / 2;
        }
        return bits;
    }

    public static void main(String[] args) {
        System.out.println(binario(13));
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: '1011' },
      correcao: `public class Conversor {
    static String binario(int n) {
        String bits = "";
        while (n > 0) {
            int resto = n % 2;
            bits = resto + bits;
            n = n / 2;
        }
        return bits;
    }

    public static void main(String[] args) {
        System.out.println(binario(13));
    }
}`,
      saidaCorrigida: '1101',
      dica: 'Os restos das divisões por 2 são lidos em que ordem? E em que ordem o laço os junta?',
      explicacao: 'O primeiro resto é o bit menos significativo, o da direita. Juntando cada resto no fim do texto, os bits saem invertidos. Cada resto novo vai na frente dos anteriores: `bits = resto + bits`.',
    },
    {
      id: 'aprendiz-t1-e01-b02',
      dificuldade: 2,
      sintoma: 'O conversor diz que 6 em binário é `10`, quando deveria ser `110`.',
      codigo: `public class Conversor {
    static String binario(int n) {
        String bits = "";
        while (n > 1) {
            bits = (n % 2) + bits;
            n = n / 2;
        }
        return bits;
    }

    public static void main(String[] args) {
        System.out.println(binario(6));
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: '10' },
      correcao: `public class Conversor {
    static String binario(int n) {
        String bits = "";
        while (n > 0) {
            bits = (n % 2) + bits;
            n = n / 2;
        }
        return bits;
    }

    public static void main(String[] args) {
        System.out.println(binario(6));
    }
}`,
      saidaCorrigida: '110',
      dica: 'Faça a tabela das divisões de 6 por 2 no papel. Quantas linhas ela tem, e quantas o laço executa?',
      explicacao: 'O método só termina quando o quociente chega a zero. Com `n > 1`, o laço para quando `n` vale 1 e descarta o último resto, que é justamente o bit mais significativo.',
    },
    {
      id: 'aprendiz-t1-e01-b03',
      dificuldade: 3,
      sintoma: 'A tabela diz que 32 bits têm `1` combinação possível, quando deveriam ser 4.294.967.296.',
      codigo: `public class Combinacoes {
    public static void main(String[] args) {
        int[] tamanhos = {8, 16, 32};
        for (int bits : tamanhos) {
            long total = 1 << bits;
            System.out.println(bits + " bits: " + total);
        }
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: '8 bits: 256\n16 bits: 65536\n32 bits: 1' },
      correcao: `public class Combinacoes {
    public static void main(String[] args) {
        int[] tamanhos = {8, 16, 32};
        for (int bits : tamanhos) {
            long total = 1L << bits;
            System.out.println(bits + " bits: " + total);
        }
    }
}`,
      saidaCorrigida: '8 bits: 256\n16 bits: 65536\n32 bits: 4294967296',
      dica: 'O resultado vai para um `long`, mas de que tipo é a conta `1 << bits`, antes de ser guardada?',
      explicacao: 'O literal `1` é um `int`, e a conta acontece em 32 bits antes de virar `long`. Num `int`, o deslocamento usa só os 5 bits de baixo da distância, então `1 << 32` é `1 << 0`, que vale 1. Com `1L`, a conta é feita em 64 bits.',
    },
  ],
  exercicios: [
    {
      id: 'aprendiz-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o valor decimal do número binário `1011`? O código abaixo faz a conversão.',
      codigo: `System.out.println(Integer.parseInt("1011", 2));`,
      opcoes: ['`11`', '`13`', '`1011`', '`9`', '`22`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11. Quem soma como se fosse da esquerda para a direita costuma chegar em 13.',
      dica: 'Some os pesos das posições com 1: 8, 4, 2 e 1, da esquerda para a direita.',
    },
    {
      id: 'aprendiz-t1-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas combinações diferentes cabem em 10 bits?',
      opcoes: ['1024', '1000', '10', '100', '512'],
      resposta: 0,
      explicacao: 'Com n bits existem 2ⁿ combinações: 2¹⁰ = 1024. É por isso que 1024 aparece tanto em computação, e por que ele fica tão perto de 1000.',
      dica: 'Com n bits existem 2ⁿ combinações.',
    },
    {
      id: 'aprendiz-t1-e01-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(Integer.toBinaryString(10));
System.out.println(Integer.toHexString(255));
System.out.println(Integer.toOctalString(8));`,
      resposta: '1010\nff\n10',
      explicacao: '10 = 8 + 2, então `1010`. 255 são oito bits ligados, `ff` em hexadecimal (em minúsculas, que é o que o Java imprime). E 8 em octal é `10`, assim como 10 é `10` em decimal: em qualquer base, a própria base se escreve 10.',
      dica: '10 = 8 + 2; 255 é o maior valor de um byte; 8 em octal é "um oito e zero unidades".',
    },
    {
      id: 'aprendiz-t1-e01-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(0x2F);`,
      opcoes: ['`47`', '`215`', '`32`', '`63`', '`2F`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`2F` em hexadecimal é 2×16 + 15 = 47. O `println` de um `int` sempre mostra o valor em decimal, não importa como o literal foi escrito.',
      dica: '2 × 16 + F, e F vale 15.',
    },
    {
      id: 'aprendiz-t1-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais literais Java valem 255? Escolha três.',
      opcoes: ['`0xFF`', '`0b11111111`', '`0377`', '`0x255`', '`0b100000000`', '`11111111`'],
      respostas: [0, 1, 2],
      verificar: { tipo: 'executa', saida: 'true\ntrue\ntrue\nfalse\nfalse\nfalse' },
      codigoVerificacao: `System.out.println(0xFF == 255);
System.out.println(0b11111111 == 255);
System.out.println(0377 == 255);
System.out.println(0x255 == 255);
System.out.println(0b100000000 == 255);
System.out.println(11111111 == 255);`,
      explicacao: '`0xFF` e oito uns em binário são 255. `0377` é octal: 3×64 + 7×8 + 7 = 255. Já `0x255` vale 597, `0b100000000` vale 256 e `11111111` sem prefixo é onze milhões e pouco, em decimal.',
      dica: '`0x`, `0b` e o zero à esquerda (octal) mudam a base do literal.',
    },
    {
      id: 'aprendiz-t1-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o programa leia o texto como binário e imprima `12`.',
      codigo: `public class Leitura {
    public static void main(String[] args) {
        System.out.println(Integer.parseInt("1100", ___));
    }
}`,
      respostas: ['2'],
      saida: '12',
      explicacao: 'O segundo argumento de `parseInt` é a base. `1100`₂ = 8 + 4 = 12. Sem a base, o texto seria lido como o decimal mil e cem.',
      dica: 'O segundo argumento de `parseInt` é a base.',
    },
    {
      id: 'aprendiz-t1-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A cor laranja deste site é `#FF7A1A`. Quanto vale o componente verde, o `7A`?',
      codigo: `System.out.println(0x7A);`,
      opcoes: ['`122`', '`71`', '`170`', '`7`', '`255`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada par de dígitos hexadecimais é um byte de 0 a 255. `7A` = 7×16 + 10 = 122. A cor é vermelho 255, verde 122 e azul 26.',
      dica: '7 × 16 + A, e A vale 10.',
    },
    {
      id: 'aprendiz-t1-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println('a' - 'A');`,
      opcoes: ['`32`', '`1`', '`26`', '`0`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em ASCII e Unicode, `a` é 97 e `A` é 65. A diferença é 32, que é exatamente um bit: maiúscula e minúscula diferem só no bit de valor 32. Subtrair dois `char` em Java dá um `int`.',
      dica: 'Veja a tabela ASCII: `a` é 97 e `A` é 65.',
    },
    {
      id: 'aprendiz-t1-e01-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println((char) ('A' + 2));
System.out.println((int) '0');`,
      resposta: 'C\n48',
      explicacao: '`A` + 2 é 67, e o cast para `char` mostra a letra `C`. O caractere `0` não vale zero: o dígito zero tem código 48 na tabela ASCII.',
      dica: 'Somar 2 a `A` avança duas letras; o dígito `0` não vale 0 na tabela.',
    },
    {
      id: 'aprendiz-t1-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um arquivo tem exatamente 1 MiB. Quantos bytes ele tem?',
      opcoes: ['1.048.576', '1.000.000', '1.024', '8.388.608', '1.000.024'],
      resposta: 0,
      explicacao: 'MiB usa potências de 2: 1024 × 1024 = 1.048.576 bytes. Já 1 MB, com prefixo decimal, tem 1.000.000. O 8.388.608 seria a conta em bits.',
      dica: 'Mebi é 1024 × 1024.',
    },
    {
      id: 'aprendiz-t1-e01-q11',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Cada dígito hexadecimal corresponde a exatamente 4 bits',
        'Um byte tem 16 bits',
        'Com 8 bits é possível representar 256 valores diferentes',
        'Computadores usam binário porque é mais fácil de ler para humanos',
        'O sistema octal usa os dígitos de 0 a 8',
      ],
      respostas: [0, 2],
      explicacao: 'Um dígito hexadecimal tem 16 valores possíveis, o mesmo que 4 bits. E 2⁸ = 256. Um byte tem 8 bits, o binário existe pela confiabilidade dos circuitos, não pela leitura, e octal vai de 0 a 7.',
      dica: 'Um dígito hexadecimal são 4 bits; um byte tem 8.',
    },
    {
      id: 'aprendiz-t1-e01-q12',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Literais {
    public static void main(String[] args) {
        int a = 0b1010;
        int b = 0x1F;
        int c = 0b1021;
        System.out.println(a + b + c);
    }
}`,
      resposta: 5,
      explicacao: 'Um literal binário só aceita os dígitos 0 e 1. O `2` em `0b1021` não pertence à base 2. `0x1F` é um hexadecimal válido.',
      dica: 'Um literal `0b` só aceita os dígitos 0 e 1.',
    },
    {
      id: 'aprendiz-t1-e01-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que os computadores trabalham em binário?',
      opcoes: [
        'Porque distinguir dois níveis de tensão é muito mais confiável do que distinguir dez',
        'Porque um número em binário ocupa menos memória que em decimal',
        'Porque os humanos pensam em binário',
        'Porque é impossível construir circuitos com mais de dois estados',
        'Por uma decisão da IBM nos anos 1980',
      ],
      resposta: 0,
      explicacao: 'Já existiram computadores decimais e até ternários. O binário venceu porque cada fio só precisa estar "perto de 0" ou "perto do máximo", o que tolera muito ruído elétrico e simplifica os circuitos.',
      dica: 'Pense no ruído elétrico entre níveis de tensão.',
    },
    {
      id: 'aprendiz-t1-e01-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = 0b1111;
System.out.println(x);
System.out.println(x + 1);
System.out.println(Integer.toBinaryString(x + 1));`,
      resposta: '15\n16\n10000',
      explicacao: 'Quatro bits ligados valem 8 + 4 + 2 + 1 = 15. Somando 1, todos os bits viram 0 e o "vai um" cria um quinto bit: `10000`, que é 16. É o mesmo que 999 + 1 em decimal.',
      dica: '`0b1111` vale 15; somando 1, todos os bits viram 0 e um novo 1 aparece à esquerda.',
    },
    {
      id: 'aprendiz-t1-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Quantos bytes a String `"Aã"` ocupa em UTF-8?',
      codigo: `byte[] bytes = "Aã".getBytes(java.nio.charset.StandardCharsets.UTF_8);
System.out.println(bytes.length);`,
      opcoes: ['`3`', '`2`', '`4`', '`6`', '`1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'UTF-8 tem tamanho variável: `A` está na faixa ASCII e usa 1 byte, `ã` precisa de 2. Por isso o número de caracteres de uma String nem sempre é o número de bytes no arquivo.',
      dica: 'Em UTF-8, letras ASCII usam 1 byte e letras acentuadas, 2.',
    },
  ],
};

export default episodio;
