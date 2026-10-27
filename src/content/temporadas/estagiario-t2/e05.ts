import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t2-e05',
  minutos: 12,
  aula,
  armadilhas: [
    'O ternário é expressão: não pode ser um comando sozinho, e os ramos não podem ser `void`.',
    'Só um ramo do ternário é avaliado: um `x++` no outro ramo não acontece.',
    '`true ? 1 : 2.0` imprime `1.0`: o tipo do ternário inteiro é `double`.',
    '`false ? 1 : \'a\'` é `char`, mas `true ? \'a\' : i` (com `i` variável `int`) é `int`.',
    'Um `Integer` nulo num ternário cujo outro ramo é `int` lança `NullPointerException`.',
    'Num `int`, só os 5 bits de baixo da distância contam: `1 << 32` é 1 e `1 << 33` é 2.',
    '`&` vem antes de `^`, que vem antes de `|`: `6 & 3 | 4` é `(6 & 3) | 4`.',
    '`~x` é −x − 1: `~0` é −1.',
  ],
  ia: {
    uso:
      'Peça à IA para converter ternários aninhados em `if` ou em `switch`, e o contrário, e para explicar operações bit a bit com os bits desenhados. Ela acerta bem a ideia geral, mas erra detalhes de tipo do ternário e a regra dos 5 bits do deslocamento: confira sempre rodando.',
    pedido:
      'Estou estudando o operador ternário e os operadores bit a bit para a certificação Java (Java 21). Gere 6 expressões: 3 com ternário misturando tipos nos ramos e 3 com &, |, ^, ~, << e >>.\n- Não mostre os resultados.\n- Na correção, diga o tipo de cada ternário pela regra da JLS 15.25 e mostre os bits de cada conta.\n- Inclua pelo menos um deslocamento maior que 31 posições.',
    erros: [
      'Diz que `1 << 32` num `int` vale 4.294.967.296, ignorando que só os 5 bits de baixo da distância contam.',
      'Afirma que `true ? 1 : 2.0` imprime `1`, esquecendo que o tipo do ternário inteiro é `double`.',
      'Confunde `>>`, que copia o sinal, com `>>>`, que põe zeros à esquerda.',
    ],
    conferir: [
      'Rode cada expressão no `jshell`.',
      'Use `Integer.toBinaryString` para ver os bits antes e depois.',
      'Confira o tipo do ternário com Ctrl + Shift + P no IntelliJ.',
    ],
  },
  recursos: [
    {
      titulo: 'JLS 15.25: Conditional Operator ? :',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.25',
      tipo: 'documentacao',
      porque: 'As tabelas com o tipo do resultado para cada combinação de ramos, a fonte das pegadinhas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.19: Shift Operators',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.19',
      tipo: 'documentacao',
      porque: 'A regra dos 5 (ou 6) bits de baixo na distância de deslocamento.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.22.1: Integer Bitwise Operators &, ^, and |',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.22.1',
      tipo: 'documentacao',
      porque: 'Os operadores bit a bit com operandos inteiros e a promoção que eles aplicam.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Bitwise and Bit Shift Operators',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op3.html',
      tipo: 'tutorial',
      porque: 'Os operadores `&`, `|`, `^`, `~`, `<<`, `>>` e `>>>` com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Ternary Operator in Java',
      url: 'https://www.baeldung.com/java-ternary-operator',
      tipo: 'artigo',
      porque: 'Sintaxe, aninhamento e quando o ternário deixa o código mais legível, ou menos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Bitwise Operators',
      url: 'https://www.baeldung.com/java-bitwise-operators',
      tipo: 'artigo',
      porque: 'Cada operador bit a bit com a conta em binário ao lado e usos com máscaras e flags.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #08, Operadores Lógicos e Relacionais',
      url: 'https://www.youtube.com/watch?v=xHgnlic7fj8',
      tipo: 'video',
      porque: 'As condições que alimentam o ternário, com exemplos em Java, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O ternário com efeitos colaterais e tipos diferentes aparece em várias questões do livro.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Operators": seção sobre o operador ternário e a tabela de operadores bit a bit',
    },
  ],
  desafio: {
    titulo: 'Permissões rwx',
    enunciado:
      'Guarde as permissões de um arquivo num `int`, com `LER = 4`, `ESCREVER = 2` e `EXECUTAR = 1`. Escreva `descrever(int p)`, que devolve o texto no formato do Linux usando ternários (`r` ou `-`, `w` ou `-`, `x` ou `-`). Comece sem permissões, conceda leitura, depois escrita, depois execução, e por fim revogue a escrita, imprimindo após cada passo:\n\n```text\nr--\nrw-\nrwx\nr-x\n```',
    dicas: [
      'Conceder é `p |= FLAG`; revogar é `p &= ~FLAG`.',
      'Testar é `(p & FLAG) != 0`, e o ternário escolhe a letra ou o traço.',
    ],
    solucao: `public class Permissoes {
    static final int LER = 4;
    static final int ESCREVER = 2;
    static final int EXECUTAR = 1;

    static String descrever(int p) {
        return ((p & LER) != 0 ? "r" : "-")
                + ((p & ESCREVER) != 0 ? "w" : "-")
                + ((p & EXECUTAR) != 0 ? "x" : "-");
    }

    public static void main(String[] args) {
        int p = 0;
        p |= LER;
        System.out.println(descrever(p));
        p |= ESCREVER;
        System.out.println(descrever(p));
        p |= EXECUTAR;
        System.out.println(descrever(p));
        p &= ~ESCREVER;
        System.out.println(descrever(p));
    }
}`,
    saida: 'r--\nrw-\nrwx\nr-x',
    comentarios:
      'Os parênteses em volta de cada ternário são obrigatórios: o `+` da concatenação tem precedência maior que o `?:`, e sem eles o último ramo de um ternário engoliria o resto da expressão. Os valores 4, 2 e 1 são os do `chmod`: `rwx` é 7, `r-x` é 5, e é por isso que `chmod 755` dá todas as permissões ao dono e leitura e execução aos outros.',
  },
  bugs: [
    {
      id: 'estagiario-t2-e05-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: not a statement`.',
      codigo: `public class Turno {
    public static void main(String[] args) {
        int hora = 14;
        hora < 12 ? System.out.println("Manhã") : System.out.println("Tarde");
    }
}`,
      linha: 4,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Turno {
    public static void main(String[] args) {
        int hora = 14;
        System.out.println(hora < 12 ? "Manhã" : "Tarde");
    }
}`,
      saidaCorrigida: 'Tarde',
      dica: 'O ternário produz um valor. Ele pode ficar sozinho numa linha, como um comando?',
      explicacao: 'O ternário é uma expressão, não um comando, e os ramos precisam produzir valores, o que um `println` não faz. O jeito certo é usar o ternário para escolher o texto e imprimir o resultado uma vez.',
    },
    {
      id: 'estagiario-t2-e05-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: bad type in conditional expression`.',
      codigo: `public class Desconto {
    public static void main(String[] args) {
        boolean vip = false;
        int desconto = vip ? 10 : "nenhum";
        System.out.println("Desconto: " + desconto);
    }
}`,
      linha: 4,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Desconto {
    public static void main(String[] args) {
        boolean vip = false;
        int desconto = vip ? 10 : 0;
        System.out.println("Desconto: " + desconto);
    }
}`,
      saidaCorrigida: 'Desconto: 0',
      dica: 'Os dois ramos precisam caber na variável que recebe o resultado. De que tipo é cada um?',
      explicacao: 'O resultado vai para um `int`, mas um dos ramos é uma `String`. Os dois ramos de um ternário precisam produzir valores compatíveis com o destino. "Sem desconto" é o número 0.',
    },
    {
      id: 'estagiario-t2-e05-b03',
      dificuldade: 3,
      sintoma: 'Imprime `Senhas de 32 bits: 1`, mas existem 2³² = 4294967296 combinações.',
      codigo: `public class Combinacoes {
    public static void main(String[] args) {
        long possibilidades = 1 << 32;
        System.out.println("Senhas de 32 bits: " + possibilidades);
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: 'Senhas de 32 bits: 1' },
      correcao: `public class Combinacoes {
    public static void main(String[] args) {
        long possibilidades = 1L << 32;
        System.out.println("Senhas de 32 bits: " + possibilidades);
    }
}`,
      saidaCorrigida: 'Senhas de 32 bits: 4294967296',
      dica: 'A variável é `long`, mas de que tipo é o `1` que está sendo deslocado? Quantos bits da distância contam nesse tipo?',
      explicacao: 'O deslocamento acontece no tipo do operando da esquerda, um `int`, e num `int` só os 5 bits de baixo da distância contam: 32 vira 0. Com `1L`, a conta é feita em `long`, onde contam 6 bits, e 32 posições funcionam.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t2-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 10;
System.out.println(x > 5 ? "grande" : "pequeno");`,
      opcoes: ['`grande`', '`pequeno`', '`true`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A condição `x > 5` é verdadeira, então o ternário vale o primeiro ramo. O ternário é uma expressão e pode ser passado direto ao `println`.',
      dica: 'A condição é verdadeira? Então só o primeiro ramo é usado.',
    },
    {
      id: 'estagiario-t2-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int n = 0;
System.out.println(n > 0 ? "positivo" : n < 0 ? "negativo" : "zero");
int a = 3, b = 7;
System.out.println(a > b ? a : b);`,
      resposta: 'zero\n7',
      explicacao: 'O ternário aninhado é lido como `n > 0 ? "positivo" : (n < 0 ? "negativo" : "zero")`. Com n = 0, as duas condições falham. O segundo é o clássico "maior de dois".',
      dica: 'O ternário é associativo à direita: o segundo `?` só é avaliado se o primeiro for falso.',
    },
    {
      id: 'estagiario-t2-e05-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(true ? 1 : 2.0);`,
      opcoes: ['`1.0`', '`1`', '`2.0`', 'Não compila: ramos de tipos diferentes'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O tipo do ternário é decidido pelos dois ramos, não pelo que foi escolhido. `int` e `double` são promovidos para `double`, então o 1 vira 1.0.',
      dica: 'Um ramo é `int` e o outro é `double`. Qual é o tipo do ternário inteiro?',
    },
    {
      id: 'estagiario-t2-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 5;
int y = x < 3 ? x++ : x--;
System.out.println(x + " " + y);`,
      opcoes: ['`4 5`', '`4 4`', '`6 5`', '`5 5`', '`5 4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A condição é falsa, então só o ramo `x--` é avaliado: ele vale 5 (o valor antigo) e deixa x em 4. O `x++` do outro ramo não roda.',
      dica: 'Só o ramo escolhido roda, e o `x--` entrega o valor antigo antes de decrementar.',
    },
    {
      id: 'estagiario-t2-e05-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `Integer v = null;
boolean usar = true;
int r = usar ? v : 0;
System.out.println(r);`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `0`',
        'Imprime `null`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'Com um ramo `Integer` e outro `int`, o tipo do ternário é `int`, e o `Integer` escolhido passa por *unboxing*. Desembrulhar `null` lança `NullPointerException`.',
      dica: 'Com um ramo `int`, o `Integer` passa por unboxing. O que acontece com um `Integer` nulo?',
    },
    {
      id: 'estagiario-t2-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(6 & 3 | 4);`,
      opcoes: ['`6`', '`7`', '`2`', '`4`', '`0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`&` tem precedência maior que `|`. 6 & 3 é `110 & 011` = `010` (2), e 2 | 4 é `010 | 100` = `110` (6).',
      dica: '`&` vem antes de `|`. Calcule `6 & 3` em binário primeiro.',
    },
    {
      id: 'estagiario-t2-e05-q07',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(5 ^ 3);
System.out.println(~0);
System.out.println(1 << 10);`,
      resposta: '6\n-1\n1024',
      explicacao: '5 ^ 3 é `101 ^ 011` = `110`, 6. `~0` liga os 32 bits, e todos os bits ligados valem −1 em complemento de dois. `1 << 10` é 2¹⁰.',
      dica: '`^` liga os bits diferentes, `~0` inverte todos os bits do zero, e `1 << 10` é uma potência de 2.',
    },
    {
      id: 'estagiario-t2-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(1 << 35);`,
      opcoes: ['`8`', '`34359738368`', '`0`', 'Não compila', '`-8`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Num `int`, só os 5 bits de baixo da distância contam: 35 & 31 = 3. Então `1 << 35` é `1 << 3`, que é 8. Com `1L << 35`, o deslocamento seria de 35 mesmo.',
      dica: 'Num `int`, só os 5 bits de baixo da distância contam. Quanto sobra de 35?',
    },
    {
      id: 'estagiario-t2-e05-q09',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete a terceira linha da troca de valores sem variável auxiliar. O programa deve imprimir `9 5`.',
      codigo: `public class Troca {
    public static void main(String[] args) {
        int a = 5, b = 9;
        a ^= b;
        b ^= a;
        a ___ b;
        System.out.println(a + " " + b);
    }
}`,
      respostas: ['^='],
      saida: '9 5',
      explicacao: 'Como x ^ x = 0 e x ^ 0 = x, três XORs trocam os valores: depois da primeira linha a guarda a ^ b; a segunda faz b = b ^ (a ^ b) = a; a terceira faz a = (a ^ b) ^ a = b. É um truque clássico, mas na prática uma variável temporária é mais legível.',
      dica: 'As duas primeiras linhas usam o mesmo operador. A terceira repete o padrão.',
    },
    {
      id: 'estagiario-t2-e05-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`int x = true ? 1 : 2;`',
        '`String s = 1 > 0 ? "sim" : "não";`',
        '`int y = 1 > 0 ? 1 : "um";`',
        '`Object o = 1 > 0 ? 1 : "um";`',
        '`1 > 0 ? System.out.println("a") : System.out.println("b");`',
      ],
      respostas: [0, 1, 3],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Com ramos `int` e `String`, o resultado é uma referência comum (algo como `Object`), que não cabe num `int`, mas cabe num `Object`. A última não compila porque o ternário não pode ser um comando sozinho e `println` não devolve valor.',
      dica: 'O ternário precisa produzir um valor que caiba no destino e não pode ser um comando sozinho.',
    },
    {
      id: 'estagiario-t2-e05-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(false ? 'a' : 98);`,
      opcoes: ['`b`', '`98`', '`a`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um ramo é `char` e o outro é uma constante `int` que cabe num `char`: o tipo do ternário é `char`. O ramo escolhido, 98, vira o caractere \'b\'. Se o 98 estivesse numa variável `int`, o resultado seria `int` e o `println` mostraria 98.',
      dica: '`char` com uma constante `int` que cabe em `char` dá `char`. Qual letra tem código 98?',
    },
    {
      id: 'estagiario-t2-e05-q12',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Ternario {
    public static void main(String[] args) {
        int idade = 20;
        String tipo = idade >= 18 ? "adulto" : "menor";
        int desconto = idade < 12 ? 50 : 0;
        boolean vip = idade > 60 ? "sim" : "não";
        System.out.println(tipo + desconto + vip);
    }
}`,
      resposta: 6,
      explicacao: 'Os dois ramos são `String`, então o ternário é `String`, e não dá para atribuí-lo a um `boolean`. O certo seria `boolean vip = idade > 60;`, sem ternário nenhum.',
      dica: 'Procure um ramo cujo tipo não cabe na variável que recebe o resultado.',
    },
    {
      id: 'estagiario-t2-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println((-8 >> 1) + " " + (-8 >>> 1 > 0));`,
      opcoes: ['`-4 true`', '`-4 false`', '`4 true`', '`2147483644 true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`>>` copia o bit de sinal e divide por 2 mantendo o negativo: −4. `>>>` põe um zero à esquerda, e o resultado vira um número positivo enorme (2147483644), logo `> 0` é verdadeiro.',
      dica: '`>>` copia o bit de sinal; `>>>` põe zero à esquerda, e o número vira positivo.',
    },
    {
      id: 'estagiario-t2-e05-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais expressões testam corretamente se o bit de valor 4 está ligado em `flags`? Escolha duas.',
      opcoes: [
        '`(flags & 4) != 0`',
        '`((flags >> 2) & 1) == 1`',
        '`(flags | 4) != 0`',
        '`flags % 4 == 0`',
        '`(flags ^ 4) == 4`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `boolean[] ok = {true, true, true, true, true};
for (int flags = 0; flags < 16; flags++) {
    boolean ligado = (flags & 4) == 4;
    if (((flags & 4) != 0) != ligado) ok[0] = false;
    if ((((flags >> 2) & 1) == 1) != ligado) ok[1] = false;
    if (((flags | 4) != 0) != ligado) ok[2] = false;
    if ((flags % 4 == 0) != ligado) ok[3] = false;
    if (((flags ^ 4) == 4) != ligado) ok[4] = false;
}
System.out.println(ok[0] + " " + ok[1] + " " + ok[2] + " " + ok[3] + " " + ok[4]);`,
      explicacao: 'A máscara `& 4` isola o bit; deslocar duas casas e isolar o bit 0 dá no mesmo. `flags | 4` liga o bit, e o resultado nunca é zero. `% 4 == 0` testa os dois bits de baixo. E `(flags ^ 4) == 4` só vale quando `flags` é 0.',
      dica: 'Testar um bit é isolar esse bit com um `&` e ver se sobrou algo.',
    },
    {
      id: 'estagiario-t2-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o operador `~` faz com um `int`?',
      opcoes: [
        'Inverte todos os 32 bits; o resultado é −x − 1',
        'Troca o sinal: o resultado é −x',
        'Calcula o valor absoluto',
        'Nega um `boolean`',
      ],
      resposta: 0,
      explicacao: 'O complemento bit a bit vira cada 0 em 1 e cada 1 em 0. Em complemento de dois, isso dá −x − 1: `~5` é −6. Para negar um `boolean`, o operador é `!`; `~` não compila com `boolean`.',
      dica: 'Pense no complemento de dois: inverter todos os bits é quase o mesmo que trocar o sinal. Falta quanto?',
    },
  ],
};

export default episodio;
