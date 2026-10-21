import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t1-e03',
  minutos: 12,
  aula,
  armadilhas: [
    'No meio-somador, a soma é XOR, não OR: 1 + 1 dá soma 0 e vai-um 1.',
    'O somador completo tem três entradas; o meio-somador, duas.',
    'Overflow não gera erro no hardware: o vai-um excedente some e o valor dá a volta.',
    'Subtração usa o mesmo somador: A − B = A + ~B + 1.',
    'Circuito combinacional não guarda estado; memória exige realimentação.',
    'Com n bits de endereço se acessam 2ⁿ posições, não n.',
  ],
  recursos: [
    {
      titulo: 'Wikipédia: Somador',
      url: 'https://pt.wikipedia.org/wiki/Somador',
      tipo: 'artigo',
      porque: 'Meio-somador, somador completo e somador com antecipação de vai-um, com os diagramas.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'JLS 15.18.2: Additive Operators for Numeric Types',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.18.2',
      tipo: 'documentacao',
      porque: 'Onde a especificação do Java diz que soma de inteiros com overflow simplesmente dá a volta, sem exceção.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Crash Course Computer Science #5: How Computers Calculate, the ALU',
      url: 'https://www.youtube.com/watch?v=1I5ZMmrOfnA',
      tipo: 'video',
      porque: 'Monta o meio-somador, o somador completo e a ALU a partir das portas lógicas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crash Course Computer Science #6: Registers and RAM',
      url: 'https://www.youtube.com/watch?v=fpnE6UAfbtU',
      tipo: 'video',
      porque: 'Do latch ao registrador e à grade endereçável de memória.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Ben Eater: Building an 8-bit breadboard computer!',
      url: 'https://www.youtube.com/playlist?list=PLowKtXNTBypGqImE405J2565dvjafglHU',
      tipo: 'video',
      porque: 'Um computador de 8 bits montado em protoboard, chip por chip: somador, registradores, RAM e clock de verdade.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Nand2Tetris',
      url: 'https://www.nand2tetris.org/',
      tipo: 'curso',
      porque: 'Os projetos 2 e 3 do curso são exatamente este episódio: você constrói a ALU e a memória num simulador.',
      gratuito: true,
      idioma: 'en',
      onde: 'Projeto 2 (Boolean Arithmetic) e Projeto 3 (Memory)',
    },
    {
      titulo: 'Code: The Hidden Language of Computer Hardware and Software (Charles Petzold)',
      url: 'https://www.codehiddenlanguage.com/',
      tipo: 'livro',
      porque: 'A construção do somador e do flip-flop contada com calma, a partir de relés.',
      gratuito: false,
      idioma: 'en',
      onde: '1ª edição: cap. 12 "A Binary Adding Machine", 13 "But What About Subtraction?", 14 "Feedback and Flip-Flops" e 16 "An Assemblage of Memory"',
    },
    {
      titulo: 'Javadoc de Math.addExact',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html#addExact(int,int)',
      tipo: 'documentacao',
      porque: 'Como fazer o Java lançar exceção no overflow, em vez de dar a volta como o somador da aula.',
      gratuito: true,
      idioma: 'en',
      onde: 'Métodos addExact, subtractExact e multiplyExact',
    },
    {
      titulo: 'Wikipédia: Complemento para dois',
      url: 'https://pt.wikipedia.org/wiki/Complemento_para_dois',
      tipo: 'artigo',
      porque: 'Por que inverter os bits e somar 1 dá o negativo, com exemplos de 8 bits.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Flip-flop',
      url: 'https://pt.wikipedia.org/wiki/Flip-flop',
      tipo: 'artigo',
      porque: 'Latch SR, flip-flop D e os outros tipos, com os diagramas de tempo.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'CircuitVerse',
      url: 'https://circuitverse.org/',
      tipo: 'ferramenta',
      porque: 'Monte o meio somador, o somador completo e um latch SR no navegador e veja os sinais mudarem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Computer Systems: A Programmer's Perspective (Bryant e O'Hallaron)",
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'A aritmética de inteiros do ponto de vista de quem programa, com overflow e complemento de dois.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, seção 2.3 "Integer Arithmetic"',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Subtrator de 8 bits',
    enunciado:
      'Partindo do `somar8Bits` da aula, escreva `subtrair8Bits(x, y)` usando **só** o somador (sem o operador `-`). Imprima `subtrair8Bits(50, 8)` e, interpretado como `byte` com sinal, `subtrair8Bits(8, 50)`:\n\n```text\n42\n-42\n```',
    dicas: [
      'A − B = A + (NOT B) + 1. Em 8 bits, NOT B é `~y & 0xFF`.',
      'O "+ 1" pode ser outra chamada de `somar8Bits` ou um vai-um inicial igual a 1.',
      'Para ver o resultado como número com sinal, faça cast para `byte`.',
    ],
    solucao: `public class Subtrator {
    static int[] somadorCompleto(int a, int b, int vemUm) {
        int soma = a ^ b ^ vemUm;
        int vaiUm = (a & b) | (vemUm & (a ^ b));
        return new int[] {soma, vaiUm};
    }

    static int somar8Bits(int x, int y, int vemUm) {
        int resultado = 0;
        int vaiUm = vemUm;
        for (int i = 0; i < 8; i++) {
            int[] r = somadorCompleto((x >> i) & 1, (y >> i) & 1, vaiUm);
            resultado |= r[0] << i;
            vaiUm = r[1];
        }
        return resultado;
    }

    static int subtrair8Bits(int x, int y) {
        return somar8Bits(x, ~y & 0xFF, 1);
    }

    public static void main(String[] args) {
        System.out.println(subtrair8Bits(50, 8));
        System.out.println((byte) subtrair8Bits(8, 50));
    }
}`,
    saida: '42\n-42',
    comentarios:
      'Entrar com vai-um 1 na primeira coluna é o "+ 1" do complemento de dois sem precisar de uma segunda soma, e é assim que o hardware faz. `8 − 50` dá `11010110` em 8 bits, que sem sinal é 214 e com sinal é -42: os mesmos bits, duas leituras.',
  },
  exercicios: [
    {
      id: 'aprendiz-t1-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num meio-somador, quais são as saídas para A = 1 e B = 1?',
      opcoes: ['Soma 0 e vai-um 1', 'Soma 1 e vai-um 1', 'Soma 1 e vai-um 0', 'Soma 0 e vai-um 0', 'Soma 2 e vai-um 0'],
      resposta: 0,
      explicacao: '1 + 1 = 10 em binário: o dígito da coluna é 0 e sobe um. A soma é o XOR (1 XOR 1 = 0) e o vai-um é o AND (1 AND 1 = 1).',
    },
    {
      id: 'aprendiz-t1-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O código aplica as fórmulas do somador completo com A = 1, B = 1 e vem-um = 1. Digite a saída exata.',
      codigo: `int a = 1, b = 1, vemUm = 1;
int soma = a ^ b ^ vemUm;
int vaiUm = (a & b) | (vemUm & (a ^ b));
System.out.println(soma + " " + vaiUm);`,
      resposta: '1 1',
      explicacao: '1 + 1 + 1 = 3, que em binário é `11`: o dígito da coluna é 1 e sobe 1. Pelo XOR de três bits, a soma é 1 quando há um número ímpar de uns.',
    },
    {
      id: 'aprendiz-t1-e03-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um somador ripple-carry de 32 bits feito só com somadores completos usa quantos deles?',
      opcoes: ['32', '16', '64', '1', '31'],
      resposta: 0,
      explicacao: 'Um somador completo por coluna de bits, com o vai-um de cada um ligado no próximo. Alguns projetos usam um meio-somador no primeiro bit, mas a pergunta pede só somadores completos.',
    },
    {
      id: 'aprendiz-t1-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o somador ripple-carry fica lento quando o número de bits cresce?',
      opcoes: [
        'Porque cada coluna precisa esperar o vai-um da coluna anterior ficar pronto',
        'Porque somadores completos usam mais energia que meios-somadores',
        'Porque o clock precisa dar um pulso por bit',
        'Porque a memória é mais lenta que a ALU',
      ],
      resposta: 0,
      explicacao: 'O vai-um atravessa os bits em cascata, então o tempo cresce junto com o número de bits. Os somadores com antecipação de vai-um calculam os vai-uns em paralelo para evitar essa espera.',
    },
    {
      id: 'aprendiz-t1-e03-q05',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais destes são circuitos sequenciais, ou seja, guardam estado? Escolha duas.',
      opcoes: ['Flip-flop', 'Registrador', 'Somador completo', 'Porta XOR', 'Multiplexador'],
      respostas: [0, 1],
      explicacao: 'O flip-flop guarda um bit, e o registrador é um conjunto de flip-flops. Somador, XOR e multiplexador são combinacionais: a saída depende só das entradas daquele momento.',
    },
    {
      id: 'aprendiz-t1-e03-q06',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Usando o `somar8Bits` da aula (que descarta o último vai-um), digite a saída exata.',
      codigo: `public class Estouro {
    static int somar8Bits(int x, int y) {
        int resultado = 0;
        int vaiUm = 0;
        for (int i = 0; i < 8; i++) {
            int a = (x >> i) & 1;
            int b = (y >> i) & 1;
            resultado |= (a ^ b ^ vaiUm) << i;
            vaiUm = (a & b) | (vaiUm & (a ^ b));
        }
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(somar8Bits(255, 1));
        System.out.println(somar8Bits(128, 128));
        System.out.println(somar8Bits(100, 27));
    }
}`,
      resposta: '0\n0\n127',
      explicacao: '255 + 1 = 256 e 128 + 128 = 256: os dois precisam de um nono bit, que é descartado, e sobra 0. Já 100 + 27 = 127 cabe em 8 bits.',
    },
    {
      id: 'aprendiz-t1-e03-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o operador para que `soma` seja o bit de soma do somador completo. O programa imprime a soma das 8 combinações de entrada.',
      codigo: `public class BitDeSoma {
    public static void main(String[] args) {
        StringBuilder saida = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int a = (i >> 2) & 1, b = (i >> 1) & 1, vemUm = i & 1;
            int soma = a ^ b ___ vemUm;
            saida.append(soma);
        }
        System.out.println(saida);
    }
}`,
      respostas: ['^'],
      saida: '01101001',
      explicacao: 'O bit de soma é o XOR das três entradas: vale 1 quando há um número ímpar de uns. Com `+`, a precedência faria `a ^ (b + vemUm)` e o resultado poderia ser 2, que nem é um bit.',
    },
    {
      id: 'aprendiz-t1-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como a ALU calcula A − B usando o somador?',
      opcoes: [
        'Soma A com o complemento de dois de B: inverte os bits de B e soma 1',
        'Usa um circuito subtrator separado, com portas diferentes',
        'Soma B com o complemento de dois de A',
        'Inverte os bits do resultado de A + B',
      ],
      resposta: 0,
      explicacao: 'Em complemento de dois, −B = ~B + 1. Então A − B = A + ~B + 1, e o mesmo somador serve para as duas operações. O "+ 1" entra como vai-um inicial.',
    },
    {
      id: 'aprendiz-t1-e03-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(7 + (~3) + 1);
System.out.println(~3);`,
      resposta: '4\n-4',
      explicacao: '`~3 + 1` é −3 em complemento de dois, então a primeira linha é 7 − 3 = 4. Sozinho, `~3` é −4: inverter os bits equivale a calcular −x − 1.',
    },
    {
      id: 'aprendiz-t1-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que um flip-flop D faz quando o clock sobe?',
      opcoes: [
        'Copia o valor da entrada D para a saída e o mantém até a próxima subida do clock',
        'Inverte o valor que estava guardado',
        'Soma D ao valor guardado',
        'Apaga o valor guardado',
      ],
      resposta: 0,
      explicacao: 'O flip-flop D "fotografa" a entrada no instante da borda do clock. Entre uma borda e outra, mudanças em D são ignoradas. É isso que mantém um processador sincronizado.',
    },
    {
      id: 'aprendiz-t1-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a memória DRAM precisa de refresh periódico?',
      opcoes: [
        'Porque cada bit fica num capacitor que perde carga com o tempo',
        'Porque o sistema operacional precisa limpar a memória',
        'Porque a DRAM usa flip-flops, que esquecem o valor sem clock',
        'Para apagar dados de programas que já terminaram',
      ],
      resposta: 0,
      explicacao: 'A DRAM guarda cada bit como carga num capacitor minúsculo, que vaza em milissegundos. O controlador relê e regrava todas as linhas o tempo todo. A SRAM, feita de transistores em realimentação, não tem esse problema.',
    },
    {
      id: 'aprendiz-t1-e03-q12',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais destas são flags que uma ALU costuma produzir? Escolha três.',
      opcoes: ['Zero', 'Negativo', 'Overflow', 'Ponteiro', 'Compilado', 'Coleta de lixo'],
      respostas: [0, 1, 2],
      explicacao: 'Zero, negativo, carry e overflow descrevem o resultado da última operação, e são usadas pelos saltos condicionais. Ponteiro, compilação e coleta de lixo são conceitos de software.',
    },
    {
      id: 'aprendiz-t1-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `byte a = 100;
byte b = 100;
byte s = (byte) (a + b);
System.out.println(s);`,
      opcoes: ['`200`', '`-56`', '`56`', 'Não compila', 'Lança `ArithmeticException`'],
      resposta: 1,
      verificar: { tipo: 'saida' },
      explicacao: '200 não cabe num `byte` com sinal (máximo 127). Ao truncar para 8 bits, sobra `11001000`, que em complemento de dois é 200 − 256 = −56. O cast permite a compilação, e overflow nunca lança exceção.',
    },
    {
      id: 'aprendiz-t1-e03-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantos bits de endereço são necessários para acessar 1024 posições de memória?',
      opcoes: ['10', '1024', '8', '32', '512'],
      resposta: 0,
      explicacao: 'Com n bits de endereço se distinguem 2ⁿ posições, e 2¹⁰ = 1024. É o logaritmo na base 2 do número de posições.',
    },
    {
      id: 'aprendiz-t1-e03-q15',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Um decodificador transforma um endereço binário numa única linha ligada. Digite a saída exata.',
      codigo: `int endereco = 0b101;
int linhas = 1 << endereco;
System.out.println(linhas);
System.out.println(Integer.toBinaryString(linhas));`,
      resposta: '32\n100000',
      explicacao: '`0b101` é 5. Deslocar 1 cinco posições à esquerda liga só o bit 5: `100000`, que vale 32. É o padrão "um bit por linha" de um decodificador de 3 entradas e 8 saídas.',
    },
  ],
};

export default episodio;
