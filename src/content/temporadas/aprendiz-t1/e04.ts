import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t1-e04',
  minutos: 12,
  aula,
  armadilhas: [
    'O PC guarda o endereço da próxima instrução, não da que está executando.',
    'Na arquitetura de von Neumann, programa e dados ficam na mesma memória.',
    'A ordem do ciclo é busca, decodifica, executa.',
    'Registradores são mais rápidos que cache, que é mais rápido que RAM, que é mais rápida que SSD.',
    'Variáveis locais e endereços de retorno ficam na pilha; objetos criados com `new` ficam no heap.',
    'Recursão sem caso base termina em `StackOverflowError`, não em loop infinito.',
  ],
  recursos: [
    {
      titulo: 'JVMS 2.5: Run-Time Data Areas',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5',
      tipo: 'documentacao',
      porque: 'Onde a especificação da JVM define o PC, as pilhas de cada thread e o heap, os mesmos conceitos deste episódio.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Crash Course Computer Science #7: The Central Processing Unit (CPU)',
      url: 'https://www.youtube.com/watch?v=FZGugFqdr60',
      tipo: 'video',
      porque: 'O ciclo de busca, decodificação e execução numa CPU didática com 4 registradores e 16 posições de memória, como a deste episódio.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Crash Course Computer Science #8: Instructions & Programs',
      url: 'https://www.youtube.com/watch?v=zltgXvg6r3k',
      tipo: 'video',
      porque: 'Saltos, laços e o que acontece quando a CPU encontra HALT.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Akitando #81: Aprendendo sobre Computadores com Super Mario (do jeito Hardcore++)',
      url: 'https://akitaonrails.com/2020/06/18/akitando-81-aprendendo-sobre-computadores-com-super-mario-do-jeito-hardcore/',
      tipo: 'video',
      porque: 'Em português: o processador 6502 do Nintendinho, memória, registradores e assembly, com o Super Mario como exemplo.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Nandgame',
      url: 'https://nandgame.com/',
      tipo: 'ferramenta',
      porque: 'As fases finais montam a unidade de controle e a CPU completa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Computer Systems: A Programmer\'s Perspective (Bryant e O\'Hallaron)',
      url: 'https://csapp.cs.cmu.edu/',
      tipo: 'livro',
      porque: 'O livro usado em Carnegie Mellon para explicar o computador do ponto de vista de quem programa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1 "A Tour of Computer Systems" e cap. 6 "The Memory Hierarchy"',
      nivel: 'fundo',
    },
    {
      titulo: 'Code: The Hidden Language of Computer Hardware and Software (Charles Petzold)',
      url: 'https://www.codehiddenlanguage.com/',
      tipo: 'livro',
      porque: 'Termina montando um processador completo e explica como ele busca e executa instruções.',
      gratuito: false,
      idioma: 'en',
      onde: '1ª edição: cap. 17 "Automation" e 19 "Two Classic Microprocessors"',
    },
    {
      titulo: 'Javadoc de StackOverflowError',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StackOverflowError.html',
      tipo: 'documentacao',
      porque: 'O erro que aparece quando a pilha de chamadas enche, como na recursão sem caso base.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Wikipédia: Arquitetura de von Neumann',
      url: 'https://pt.wikipedia.org/wiki/Arquitetura_de_von_Neumann',
      tipo: 'artigo',
      porque: 'A ideia de guardar programa e dados na mesma memória, e o gargalo que ela cria.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Latency Numbers Every Programmer Should Know',
      url: 'https://gist.github.com/jboner/2841832',
      tipo: 'artigo',
      porque: 'A tabela de tempos de cache, RAM, SSD e rede que inspirou a da aula, com a escala humana ao lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Ben Eater: Building an 8-bit breadboard computer!',
      url: 'https://www.youtube.com/playlist?list=PLowKtXNTBypGqImE405J2565dvjafglHU',
      tipo: 'video',
      porque: 'Uma CPU de 8 bits montada em protoboard: dá para ver o ciclo de busca e execução acontecer nos LEDs.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Saltos na CPU de brinquedo',
    enunciado:
      'Acrescente à CPU de brinquedo três instruções: `SUB` (opcode `0x6`, A = A − B), `JUMP` (opcode `0x7`, o PC vai para o endereço) e `JUMP_SE_ZERO` (opcode `0x5`, salta só se A for zero). Com elas, escreva um programa **na memória da própria CPU** que multiplica 6 por 4 com somas repetidas e guarda o resultado no endereço 13. Programa e dados precisam caber nas 16 posições. Imprima `memoria[13]`:\n\n```text\n24\n```',
    dicas: [
      'Reserve as últimas posições para os dados: o contador (4), o resultado (0), a parcela (6) e a constante 1.',
      'O laço é: carregue o contador; se for zero, salte para o HALT. Senão, some 6 ao resultado, subtraia 1 do contador e salte de volta ao começo.',
      'Conte as instruções: 12 posições para o programa e 4 para os dados fecham as 16.',
    ],
    solucao: `public class CpuComSalto {
    static final int LOAD_A = 0x1, LOAD_B = 0x2, ADD = 0x3, STORE_A = 0x4;
    static final int JUMP_SE_ZERO = 0x5, SUB = 0x6, JUMP = 0x7, HALT = 0xF;

    public static void main(String[] args) {
        int[] m = new int[16];
        m[0] = 0x1C;  // LOAD_A 12          A = contador
        m[1] = 0x5B;  // JUMP_SE_ZERO 11    acabou? vai para o HALT
        m[2] = 0x1D;  // LOAD_A 13          A = resultado
        m[3] = 0x2E;  // LOAD_B 14          B = 6
        m[4] = 0x30;  // ADD                A = resultado + 6
        m[5] = 0x4D;  // STORE_A 13
        m[6] = 0x1C;  // LOAD_A 12          A = contador
        m[7] = 0x2F;  // LOAD_B 15          B = 1
        m[8] = 0x60;  // SUB                A = contador - 1
        m[9] = 0x4C;  // STORE_A 12
        m[10] = 0x70; // JUMP 0             volta ao começo
        m[11] = 0xF0; // HALT
        m[12] = 4;    // contador
        m[13] = 0;    // resultado
        m[14] = 6;    // parcela
        m[15] = 1;    // constante 1

        int pc = 0, a = 0, b = 0;
        while (true) {
            int instrucao = m[pc++];
            int op = instrucao >> 4;
            int end = instrucao & 0xF;
            if (op == LOAD_A) a = m[end];
            else if (op == LOAD_B) b = m[end];
            else if (op == ADD) a = a + b;
            else if (op == SUB) a = a - b;
            else if (op == STORE_A) m[end] = a;
            else if (op == JUMP) pc = end;
            else if (op == JUMP_SE_ZERO) { if (a == 0) pc = end; }
            else if (op == HALT) break;
        }
        System.out.println(m[13]);
    }
}`,
    saida: '24',
    comentarios:
      'Repare no padrão: testar a condição no começo, sair do laço com um salto condicional e voltar com um salto incondicional. É exatamente o que um `while (contador != 0)` vira em linguagem de máquina. E as 16 posições acabam: programa e dados disputam a mesma memória, a ideia de von Neumann na prática.',
  },
  exercicios: [
    {
      id: 'aprendiz-t1-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a ideia central da arquitetura de von Neumann?',
      opcoes: [
        'O programa e os dados ficam guardados na mesma memória',
        'Cada instrução tem um circuito próprio dentro da CPU',
        'O processador só trabalha com números decimais',
        'A memória fica dentro da ALU',
      ],
      resposta: 0,
      explicacao: 'Antes, programar um computador era religar cabos. Guardar o programa na memória, como números, permite trocar de programa carregando outros números, e permite que um programa gere outro, que é o que um compilador faz.',
    },
    {
      id: 'aprendiz-t1-e04-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Para que serve o PC (contador de programa)?',
      opcoes: [
        'Guarda o endereço da próxima instrução a ser buscada',
        'Conta quantos programas estão abertos',
        'Guarda o resultado da última conta da ALU',
        'Mede a velocidade do clock',
      ],
      resposta: 0,
      explicacao: 'A cada busca, o PC avança para a instrução seguinte. Um salto é só uma instrução que escreve um novo endereço no PC.',
    },
    {
      id: 'aprendiz-t1-e04-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a ordem do ciclo de instrução?',
      opcoes: ['Busca, decodifica, executa', 'Decodifica, busca, executa', 'Executa, busca, decodifica', 'Busca, executa, decodifica'],
      resposta: 0,
      explicacao: 'Primeiro a instrução vem da memória (busca), depois a unidade de controle descobre o que ela significa (decodifica) e por fim a operação acontece (executa).',
    },
    {
      id: 'aprendiz-t1-e04-q04',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'A CPU de brinquedo roda o programa abaixo. Digite a saída exata.',
      codigo: `public class Programa {
    public static void main(String[] args) {
        int[] memoria = new int[16];
        memoria[0] = 0x1E; // LOAD_A 14
        memoria[1] = 0x2F; // LOAD_B 15
        memoria[2] = 0x30; // ADD
        memoria[3] = 0x30; // ADD
        memoria[4] = 0x4D; // STORE_A 13
        memoria[5] = 0xF0; // HALT
        memoria[14] = 2;
        memoria[15] = 5;

        int pc = 0, a = 0, b = 0, ciclos = 0;
        while (true) {
            int instrucao = memoria[pc++];
            int opcode = instrucao >> 4, endereco = instrucao & 0xF;
            ciclos++;
            if (opcode == 0x1) a = memoria[endereco];
            else if (opcode == 0x2) b = memoria[endereco];
            else if (opcode == 0x3) a = a + b;
            else if (opcode == 0x4) memoria[endereco] = a;
            else if (opcode == 0xF) break;
        }
        System.out.println(memoria[13] + " " + ciclos);
    }
}`,
      resposta: '12 6',
      explicacao: 'A começa com 2 e B com 5. Os dois ADD fazem A = 7 e depois A = 12, que é guardado no endereço 13. Foram 6 instruções buscadas, contando o HALT.',
    },
    {
      id: 'aprendiz-t1-e04-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual lista está em ordem do acesso mais rápido para o mais lento?',
      opcoes: [
        'Registrador, cache L1, cache L2, RAM, SSD',
        'Cache L1, registrador, RAM, cache L2, SSD',
        'RAM, cache L1, registrador, SSD, cache L2',
        'SSD, RAM, cache L2, cache L1, registrador',
      ],
      resposta: 0,
      explicacao: 'Quanto mais perto da ALU, mais rápido e menor. Registradores ficam dentro da CPU, os caches no mesmo chip, a RAM em pentes separados e o SSD do outro lado de um barramento ainda mais lento.',
    },
    {
      id: 'aprendiz-t1-e04-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que significa um processador de 3 GHz?',
      opcoes: [
        'O clock dá 3 bilhões de pulsos por segundo',
        'O processador executa exatamente 3 bilhões de programas por segundo',
        'O processador tem 3 GB de cache',
        'O processador tem 3 núcleos',
      ],
      resposta: 0,
      explicacao: 'Giga é 10⁹ e hertz é por segundo. Quantas instruções saem por pulso depende do processador: algumas levam vários ciclos, e pipelines modernos terminam várias por ciclo.',
    },
    {
      id: 'aprendiz-t1-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O método abaixo esqueceu o caso base. Qual é o resultado de executar?',
      codigo: `public class Fatorial {
    static int fatorial(int n) {
        return n * fatorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(fatorial(5));
    }
}`,
      opcoes: [
        'Imprime `120`',
        'Imprime `0`',
        'Lança `StackOverflowError`',
        'Não compila',
        'Fica rodando para sempre sem erro',
      ],
      resposta: 2,
      verificar: { tipo: 'excecao', nome: 'StackOverflowError' },
      explicacao: 'Cada chamada empilha um quadro com `n` e o endereço de retorno, e nenhuma chega a retornar. Quando a pilha da thread acaba, a JVM lança `StackOverflowError`. O compilador não tem como saber que a recursão nunca termina.',
    },
    {
      id: 'aprendiz-t1-e04-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que fica guardado na pilha de chamadas? Escolha duas.',
      opcoes: [
        'O endereço para onde voltar quando o método terminar',
        'As variáveis locais do método',
        'Os objetos criados com `new`',
        'O código-fonte do programa',
        'O bytecode de todas as classes carregadas',
      ],
      respostas: [0, 1],
      explicacao: 'Cada quadro da pilha guarda o endereço de retorno, os parâmetros e as variáveis locais. Objetos vão para o heap; a pilha guarda só a referência a eles, quando ela está numa variável local.',
    },
    {
      id: 'aprendiz-t1-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que percorrer um array em ordem costuma ser mais rápido do que acessar posições aleatórias?',
      opcoes: [
        'Porque o cache traz da RAM um bloco de endereços vizinhos de uma vez',
        'Porque o compilador transforma o laço em uma única instrução',
        'Porque a RAM é mais rápida para endereços menores',
        'Porque arrays ficam guardados dentro dos registradores',
      ],
      resposta: 0,
      explicacao: 'Cada leitura da RAM traz uma linha de cache inteira, em geral 64 bytes. Lendo em ordem, os próximos elementos já estão no cache. Saltando aleatoriamente, quase toda leitura paga a viagem até a RAM.',
    },
    {
      id: 'aprendiz-t1-e04-q10',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o operador que separa o opcode (os 4 bits de cima) da instrução. O programa deve imprimir `2 15`.',
      codigo: `public class Decodifica {
    public static void main(String[] args) {
        int instrucao = 0x2F;
        int opcode = instrucao ___ 4;
        int endereco = instrucao & 0xF;
        System.out.println(opcode + " " + endereco);
    }
}`,
      respostas: ['>>', '>>>'],
      saida: '2 15',
      explicacao: 'Deslocar 4 bits para a direita descarta o nibble de baixo e traz o de cima para o lugar dele: `0x2F >> 4` = `0x2`. A máscara `& 0xF` faz o oposto: fica só com os 4 bits de baixo. Dividir por 16 também funcionaria aqui.',
    },
    {
      id: 'aprendiz-t1-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece com o PC quando a CPU executa uma instrução de salto (JUMP)?',
      opcoes: [
        'Recebe o endereço de destino, então a próxima busca acontece lá',
        'É zerado, e o programa recomeça',
        'Não muda; o salto é feito pela ALU',
        'É copiado para a memória',
      ],
      resposta: 0,
      explicacao: 'Saltar é só escrever no PC. Num salto condicional, essa escrita só acontece se a condição (lida nas flags da ALU) for verdadeira. É assim que `if` e laços funcionam no nível da máquina.',
    },
    {
      id: 'aprendiz-t1-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que um pipeline faz num processador?',
      opcoes: [
        'Sobrepõe as etapas de instruções diferentes, como uma linha de montagem',
        'Liga vários computadores em rede',
        'Guarda as instruções mais usadas num disco rápido',
        'Executa a mesma instrução várias vezes para conferir o resultado',
      ],
      resposta: 0,
      explicacao: 'Enquanto uma instrução executa, a próxima já está sendo decodificada e a seguinte, buscada. Cada instrução continua passando por todas as etapas, mas várias andam ao mesmo tempo.',
    },
    {
      id: 'aprendiz-t1-e04-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O código monta uma instrução da CPU de brinquedo com opcode 4 (STORE_A) e endereço 13. Digite a saída exata.',
      codigo: `int instrucao = (0x4 << 4) | 13;
System.out.println(Integer.toHexString(instrucao));
System.out.println(instrucao);`,
      resposta: '4d\n77',
      explicacao: '`0x4 << 4` põe o opcode nos 4 bits de cima: `0x40`. O OR com 13 (`0xD`) preenche os 4 de baixo: `0x4D`. Em decimal, 4×16 + 13 = 77. A mesma instrução, duas formas de escrever.',
    },
    {
      id: 'aprendiz-t1-e04-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que acontece em toda instrução, sem exceção? Escolha duas.',
      opcoes: [
        'A instrução é buscada na memória',
        'O PC é atualizado',
        'O disco é acessado',
        'O sistema operacional é chamado',
        'O coletor de lixo roda',
      ],
      respostas: [0, 1],
      explicacao: 'Toda instrução passa pela busca, e o PC sempre muda: avança para a próxima ou recebe o destino de um salto. Disco, sistema operacional e coleta de lixo só entram em ação em situações específicas.',
    },
    {
      id: 'aprendiz-t1-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na maioria das CPUs, de onde a ALU tira os operandos de uma conta?',
      opcoes: ['Dos registradores', 'Direto do disco', 'Do código-fonte', 'Do cache L3, sempre'],
      resposta: 0,
      explicacao: 'A ALU está ligada aos registradores. Dados na memória precisam ser carregados num registrador antes da conta e gravados de volta depois. Por isso o código de máquina é cheio de instruções de carga e armazenamento.',
    },
  ],
};

export default episodio;
