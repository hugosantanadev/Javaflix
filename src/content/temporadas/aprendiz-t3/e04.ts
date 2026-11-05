import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t3-e04',
  minutos: 14,
  aula,
  armadilhas: [
    'Em Java, `-7 % 3` é −1: o resto tem o sinal do dividendo.',
    '`n % 2 == 1` falha para ímpares negativos. Use `n % 2 != 0`.',
    '`(i - 1) % t` dá −1 quando `i` é 0. Use `Math.floorMod(i - 1, t)` em índices circulares.',
    '`hashCode()` pode ser negativo: `hash % t` pode gerar índice negativo.',
    '`/` arredonda para zero: `-7 / 2` é −3, mas `Math.floorDiv(-7, 2)` é −4.',
    'Divisão inteira por zero lança `ArithmeticException`, tanto com `/` quanto com `%`.',
    'Na exponenciação modular, reduza a cada multiplicação; senão o `long` estoura.',
  ],
  ia: {
    uso:
      'A IA ajuda a montar contas modulares, como dias da semana, buffers circulares e dígitos verificadores. Confira sempre os casos com números negativos, que é onde ela costuma usar `%` no lugar de `Math.floorMod`.',
    pedido:
      'Revise o uso de % neste código Java.\n<cole o código aqui>\n- Aponte cada % cujo dividendo pode ser negativo e diga o que acontece nesse caso.\n- Troque por Math.floorMod onde o resultado é usado como índice ou posição circular.\n- Aponte testes de paridade com n % 2 == 1.',
    erros: [
      'Usa `%` para voltar posições num buffer circular ou num calendário.',
      'Testa ímpar com `n % 2 == 1`, que falha para negativos.',
      'Inverte a condição de parada do algoritmo de Euclides.',
    ],
    conferir: [
      'Teste com deslocamentos negativos e com zero.',
      'Compare `%` e `Math.floorMod` para os mesmos valores.',
      'Valide CPFs conhecidos, válidos e inválidos, ao testar um verificador.',
    ],
  },
  recursos: [
    {
      titulo: 'JLS 15.17.3: Remainder Operator %',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17.3',
      tipo: 'documentacao',
      porque: 'A regra oficial: o resto tem o sinal do dividendo e a identidade `(a/b)*b + a%b == a` sempre vale. Tem exemplos com negativos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.17.2: Division Operator /',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17.2',
      tipo: 'documentacao',
      porque: 'Por que a divisão inteira arredonda em direção a zero, e o caso especial de `Integer.MIN_VALUE / -1`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de Math.floorMod',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html#floorMod(int,int)',
      tipo: 'documentacao',
      porque: 'A diferença entre `floorMod` e `%`, com uma tabela de exemplos com sinais diferentes.',
      gratuito: true,
      idioma: 'en',
      onde: 'Métodos floorDiv e floorMod',
    },
    {
      titulo: 'Javadoc de BigInteger',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html#modPow(java.math.BigInteger,java.math.BigInteger)',
      tipo: 'documentacao',
      porque: 'Aritmética modular com números de qualquer tamanho, a base da criptografia em Java.',
      gratuito: true,
      idioma: 'en',
      onde: 'Métodos gcd, mod, modPow e modInverse',
    },
    {
      titulo: 'Wikipédia: Aritmética modular',
      url: 'https://pt.wikipedia.org/wiki/Aritm%C3%A9tica_modular',
      tipo: 'artigo',
      porque: 'Congruência, propriedades e aplicações, com a notação formal.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Algoritmo de Euclides',
      url: 'https://pt.wikipedia.org/wiki/Algoritmo_de_Euclides',
      tipo: 'artigo',
      porque: 'A prova de que o algoritmo funciona e a análise do número de passos.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Cadastro de Pessoas Físicas',
      url: 'https://pt.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas',
      tipo: 'artigo',
      porque: 'O cálculo dos dois dígitos verificadores do CPF, com exemplo.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Seção "Dígitos verificadores"',
    },
    {
      titulo: 'Portal da OBMEP: Aritmética dos Restos',
      url: 'https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=63',
      tipo: 'curso',
      porque: 'Módulo gratuito do IMPA com videoaulas, material teórico e exercícios sobre congruências.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'PIC OBMEP: Aritmética, Aula 42, "7+6=1"',
      url: 'https://www.youtube.com/watch?v=SswU5Qmc3pg',
      tipo: 'video',
      porque: 'A aritmética modular apresentada a partir do relógio, sem fórmulas, pelo Programa de Iniciação Científica da OBMEP.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Clock Math: Introduction to Modular Arithmetic',
      url: 'https://www.youtube.com/watch?v=a9negsQP2qI',
      tipo: 'video',
      porque: 'Congruência, soma e multiplicação modular com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Discrete Mathematics: An Open Introduction (Oscar Levin)',
      url: 'https://discrete.openmathbooks.org/dmoi3/sec_addtops-numbth.html',
      tipo: 'livro',
      porque: 'Livro gratuito: divisibilidade, aritmética modular e equações com congruências, com exercícios.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção 5.2 "Introduction to Number Theory"',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Validador de CPF',
    enunciado:
      'Escreva `valido(String cpf)`, que aceita o CPF com ou sem pontuação e confere os dois dígitos verificadores. CPFs com todos os dígitos iguais devem ser recusados. Para os números fictícios abaixo, imprima:\n\n```text\n123.456.789-09: válido\n123.456.789-08: inválido\n213.456.789-09: inválido\n111.111.111-11: inválido\n```',
    dicas: [
      'Tire a pontuação com `cpf.replaceAll("[^0-9]", "")` e confira se sobraram 11 dígitos.',
      'Um método `digito(String numeros, int pesoInicial)` serve para os dois verificadores: pesos de 10 a 2 no primeiro, de 11 a 2 no segundo.',
      '`numeros.charAt(i) - \'0\'` converte o caractere no dígito.',
      'Para recusar dígitos repetidos: `n.chars().distinct().count() == 1`.',
    ],
    solucao: `public class Cpf {
    static int digito(String numeros, int pesoInicial) {
        int soma = 0;
        for (int i = 0; i < numeros.length(); i++) {
            soma += (numeros.charAt(i) - '0') * (pesoInicial - i);
        }
        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    static boolean valido(String cpf) {
        String n = cpf.replaceAll("[^0-9]", "");
        if (n.length() != 11 || n.chars().distinct().count() == 1) {
            return false;
        }
        String base = n.substring(0, 9);
        int d1 = digito(base, 10);
        int d2 = digito(base + d1, 11);
        return n.equals(base + d1 + d2);
    }

    public static void main(String[] args) {
        String[] testes = {"123.456.789-09", "123.456.789-08", "213.456.789-09", "111.111.111-11"};
        for (String cpf : testes) {
            System.out.println(cpf + ": " + (valido(cpf) ? "válido" : "inválido"));
        }
    }
}`,
    saida: '123.456.789-09: válido\n123.456.789-08: inválido\n213.456.789-09: inválido\n111.111.111-11: inválido',
    comentarios:
      'O terceiro teste é o primeiro com os dois dígitos iniciais trocados: o módulo 11 percebe a inversão, como a aula previu. O quarto é curioso: 111.111.111-11 passa na conta dos dígitos verificadores (faça a conta), mas a Receita não emite CPFs com dígitos todos iguais, e por isso todo validador sério os recusa à parte. O dígito verificador protege contra erro de digitação, não contra fraude: qualquer um consegue gerar um número que passa na conta.',
  },
  bugs: [
    {
      id: 'aprendiz-t3-e04-b01',
      dificuldade: 1,
      sintoma: 'Pedir "ontem" num domingo lança `ArrayIndexOutOfBoundsException: Index -1 out of bounds for length 7`.',
      codigo: `public class Calendario {
    public static void main(String[] args) {
        String[] dias = {"dom", "seg", "ter", "qua", "qui", "sex", "sab"};
        int hoje = 0;
        int ontem = (hoje - 1) % 7;
        System.out.println(dias[ontem]);
    }
}`,
      linha: 5,
      efeito: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      correcao: `public class Calendario {
    public static void main(String[] args) {
        String[] dias = {"dom", "seg", "ter", "qua", "qui", "sex", "sab"};
        int hoje = 0;
        int ontem = Math.floorMod(hoje - 1, 7);
        System.out.println(dias[ontem]);
    }
}`,
      saidaCorrigida: 'sab',
      dica: 'Quanto vale `-1 % 7` em Java? O resto do `%` tem o sinal de quem?',
      explicacao: 'O `%` do Java tem o sinal do dividendo, então `-1 % 7` é −1, um índice inválido. `Math.floorMod` devolve um valor de 0 a 6 para qualquer dividendo e dá a volta no calendário corretamente.',
    },
    {
      id: 'aprendiz-t3-e04-b02',
      dificuldade: 2,
      sintoma: 'A lista {3, -3, 5, -7} tem quatro ímpares, mas o contador mostra `2`.',
      codigo: `public class Impares {
    public static void main(String[] args) {
        int[] numeros = {3, -3, 5, -7};
        int impares = 0;
        for (int n : numeros) {
            if (n % 2 == 1) impares++;
        }
        System.out.println(impares);
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: '2' },
      correcao: `public class Impares {
    public static void main(String[] args) {
        int[] numeros = {3, -3, 5, -7};
        int impares = 0;
        for (int n : numeros) {
            if (n % 2 != 0) impares++;
        }
        System.out.println(impares);
    }
}`,
      saidaCorrigida: '4',
      dica: 'Quanto vale `-3 % 2` em Java?',
      explicacao: 'Para negativos ímpares, o resto do Java é −1, não 1. O teste `n % 2 != 0` vale para os dois sinais, assim como `(n & 1) == 1`.',
    },
    {
      id: 'aprendiz-t3-e04-b03',
      dificuldade: 3,
      sintoma: 'O cálculo do mdc de 252 e 105 lança `ArithmeticException: / by zero`.',
      codigo: `public class Euclides {
    static int mdc(int a, int b) {
        while (a != 0) {
            int r = a % b;
            a = b;
            b = r;
        }
        return a;
    }

    public static void main(String[] args) {
        System.out.println(mdc(252, 105));
    }
}`,
      linha: 3,
      efeito: { tipo: 'excecao', nome: 'ArithmeticException' },
      correcao: `public class Euclides {
    static int mdc(int a, int b) {
        while (b != 0) {
            int r = a % b;
            a = b;
            b = r;
        }
        return a;
    }

    public static void main(String[] args) {
        System.out.println(mdc(252, 105));
    }
}`,
      saidaCorrigida: '21',
      dica: 'Anote `a` e `b` a cada volta. Quem chega a zero primeiro, e o laço percebe?',
      explicacao: 'No algoritmo de Euclides, é o resto, guardado em `b`, que chega a zero, e aí `a` é o mdc. Testando `a`, o laço dá mais uma volta e divide por `b` igual a zero. A condição de parada precisa olhar a variável que zera.',
    },
  ],
  exercicios: [
    {
      id: 'aprendiz-t3-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quanto valem `17 / 5` e `17 % 5` em Java?',
      opcoes: ['3 e 2', '3,4 e 0', '3 e 4', '2 e 7', '4 e −3'],
      resposta: 0,
      explicacao: '17 = 3 · 5 + 2. A divisão de dois `int` descarta a parte fracionária, e o resto é o que sobra.',
      dica: '17 = 3 × 5 + 2.',
    },
    {
      id: 'aprendiz-t3-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(-17 / 5 + " " + -17 % 5);`,
      opcoes: ['`-3 -2`', '`-4 3`', '`-3 2`', '`-4 -2`', '`-3 -3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `/` arredonda −3,4 em direção a zero: −3. O `%` completa a identidade: (−3) · 5 + r = −17, então r = −2. A resposta `-4 3` é a da divisão euclidiana, que é o que `floorDiv` e `floorMod` calculam.',
      dica: 'O quociente arredonda para zero, e o resto tem o sinal do dividendo.',
    },
    {
      id: 'aprendiz-t3-e04-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(Math.floorDiv(-17, 5));
System.out.println(Math.floorMod(-17, 5));
System.out.println(Math.floorMod(17, -5));`,
      resposta: '-4\n3\n-3',
      explicacao: '`floorDiv` arredonda −3,4 para baixo: −4. Então −17 = (−4) · 5 + 3. Com divisor negativo, o `floorMod` acompanha o sinal do divisor: 17 = (−4) · (−5) + (−3).',
      dica: '`floorDiv` arredonda para baixo; o `floorMod` tem o sinal do divisor.',
    },
    {
      id: 'aprendiz-t3-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais expressões dizem corretamente se um `int n` é ímpar, **inclusive** para negativos? Escolha duas.',
      opcoes: ['`n % 2 != 0`', '`(n & 1) == 1`', '`n % 2 == 1`', '`n % 2 > 0`', '`n / 2 == 1`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `boolean[] ok = {true, true, true, true, true};
for (int n = -5; n <= 5; n++) {
    boolean impar = n % 2 != 0;
    if ((n % 2 != 0) != impar) ok[0] = false;
    if (((n & 1) == 1) != impar) ok[1] = false;
    if ((n % 2 == 1) != impar) ok[2] = false;
    if ((n % 2 > 0) != impar) ok[3] = false;
    if ((n / 2 == 1) != impar) ok[4] = false;
}
System.out.println(ok[0] + " " + ok[1] + " " + ok[2] + " " + ok[3] + " " + ok[4]);`,
      explicacao: 'Para ímpares negativos, `n % 2` é −1, então os testes com `== 1` e `> 0` falham. Comparar com zero funciona para os dois sinais. O teste de bit também: em complemento de dois, todo ímpar, positivo ou negativo, tem o último bit 1.',
      dica: 'Com negativos, o resto do `%` pode ser −1.',
    },
    {
      id: 'aprendiz-t3-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String[] dias = {"dom", "seg", "ter", "qua", "qui", "sex", "sab"};
int hoje = 0;
System.out.println(dias[(hoje - 1) % 7]);`,
      opcoes: [
        'Lança `ArrayIndexOutOfBoundsException`',
        'Imprime `sab`',
        'Imprime `dom`',
        'Imprime `seg`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      explicacao: '(0 − 1) % 7 é −1 em Java, porque o resto tem o sinal do dividendo, e −1 não é um índice válido. Para dar a volta e chegar em `sab`, use `Math.floorMod(hoje - 1, 7)`.',
      dica: 'Quanto vale `-1 % 7` em Java?',
    },
    {
      id: 'aprendiz-t3-e04-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método de `Math` que dá a volta corretamente. O programa deve imprimir `sab`.',
      codigo: `public class Ontem {
    public static void main(String[] args) {
        String[] dias = {"dom", "seg", "ter", "qua", "qui", "sex", "sab"};
        int hoje = 0;
        System.out.println(dias[Math.___(hoje - 1, 7)]);
    }
}`,
      respostas: ['floorMod'],
      saida: 'sab',
      explicacao: '`Math.floorMod(-1, 7)` é 6: com divisor positivo, o resultado fica sempre entre 0 e 6. É a ferramenta certa para qualquer índice circular que possa andar para trás.',
      dica: 'O método que dá a volta para trás corretamente.',
    },
    {
      id: 'aprendiz-t3-e04-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um relógio marca 38 horas depois da meia-noite. Que número o ponteiro das horas mostra num relógio de 12 horas? Em outras palavras, 38 ≡ ? (mod 12).',
      opcoes: ['2', '3', '26', '0', '6'],
      resposta: 0,
      explicacao: '38 = 3 · 12 + 2, então 38 ≡ 2 (mod 12). Também dá para conferir pela definição: 38 − 2 = 36, que é múltiplo de 12.',
      dica: 'Tire os múltiplos de 12 de 38.',
    },
    {
      id: 'aprendiz-t3-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o último dígito de 7¹⁰⁰?',
      opcoes: ['1', '7', '9', '3', '0'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '1' },
      codigoVerificacao: `System.out.println(BigInteger.valueOf(7).pow(100).mod(BigInteger.TEN));`,
      explicacao: 'O último dígito é o resto por 10. As potências de 7 módulo 10 repetem o ciclo 7, 9, 3, 1, de tamanho 4. Como 100 é múltiplo de 4, 7¹⁰⁰ cai na posição do 1.',
      dica: 'As potências de 7 terminam em 7, 9, 3, 1, e repetem.',
    },
    {
      id: 'aprendiz-t3-e04-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int a = 252, b = 105;
while (b != 0) {
    int r = a % b;
    System.out.println(a + " % " + b + " = " + r);
    a = b;
    b = r;
}
System.out.println("mdc = " + a);`,
      resposta: '252 % 105 = 42\n105 % 42 = 21\n42 % 21 = 0\nmdc = 21',
      explicacao: 'É o algoritmo de Euclides na forma iterativa: a cada volta, o par (a, b) vira (b, a mod b). Quando o resto chega a zero, o último divisor é o mdc.',
      dica: 'Siga o laço: o resto vira o novo `b` até zerar.',
    },
    {
      id: 'aprendiz-t3-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No cálculo do primeiro dígito verificador de um CPF, a soma ponderada dos nove dígitos deu 210. Qual é o dígito, sabendo que 210 mod 11 = 1?',
      opcoes: ['0', '1', '10', '9'],
      resposta: 0,
      explicacao: 'A regra é: se o resto for menor que 2, o dígito é 0; senão, é 11 − resto. Com resto 1, o dígito é 0. A conta 11 − 1 daria 10, que não cabe num dígito, e é por isso que a regra existe.',
      dica: 'Resto menor que 2 dá dígito 0.',
    },
    {
      id: 'aprendiz-t3-e04-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais expressões dão o mesmo resultado que `Math.floorMod(x, 8)` para **qualquer** `int x`? Escolha duas.',
      opcoes: ['`x & 7`', '`((x % 8) + 8) % 8`', '`x % 8`', '`Math.abs(x) % 8`', '`x >> 3`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `int[] xs = {-17, -9, -8, -1, 0, 1, 7, 8, 13, Integer.MIN_VALUE, Integer.MAX_VALUE};
boolean[] ok = {true, true, true, true, true};
for (int x : xs) {
    int certo = Math.floorMod(x, 8);
    if ((x & 7) != certo) ok[0] = false;
    if (((x % 8) + 8) % 8 != certo) ok[1] = false;
    if (x % 8 != certo) ok[2] = false;
    if (Math.abs(x) % 8 != certo) ok[3] = false;
    if ((x >> 3) != certo) ok[4] = false;
}
System.out.println(ok[0] + " " + ok[1] + " " + ok[2] + " " + ok[3] + " " + ok[4]);`,
      explicacao: 'Em complemento de dois, os 3 bits de baixo de qualquer `int` são exatamente o resto da divisão por 8 no sentido matemático, então `x & 7` funciona até para negativos. Somar 8 ao resto negativo do `%` e tirar o resto de novo também corrige o sinal. `x % 8` falha nos negativos, `Math.abs` dá o resto errado (−1 viraria 1 em vez de 7) e `x >> 3` é a divisão, não o resto.',
      dica: 'Para potências de 2, o resto são os bits de baixo.',
    },
    {
      id: 'aprendiz-t3-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `int total = 10;
int pessoas = 0;
System.out.println(total % pessoas);`,
      opcoes: [
        'Lança `ArithmeticException`',
        'Imprime `10`',
        'Imprime `0`',
        'Imprime `NaN`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArithmeticException' },
      explicacao: 'O resto também é uma divisão, e divisão inteira por zero lança `ArithmeticException` ("/ by zero"). Com `double`, `10.0 % 0` daria `NaN` sem exceção.',
      dica: 'Resto por zero, com inteiros.',
    },
    {
      id: 'aprendiz-t3-e04-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Restos {
    public static void main(String[] args) {
        int a = 17 % 5;
        double b = 17.5 % 5;
        long c = 17L % 5;
        int d = 17 % 5.0;
        System.out.println(a + b + c + d);
    }
}`,
      resposta: 6,
      explicacao: 'O `%` segue a promoção numérica como os outros operadores: com um `double` na conta, o resultado é `double`, e atribuir `double` a `int` exige cast. A linha 4 mostra que o `%` com ponto flutuante é válido em Java.',
      dica: 'O resultado de `int % double` é de que tipo?',
    },
    {
      id: 'aprendiz-t3-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Na exponenciação modular por quadrados, quantas voltas o laço dá, aproximadamente, para um expoente de 1.000.000?',
      opcoes: ['Cerca de 20', 'Cerca de 1.000.000', 'Cerca de 1.000', 'Cerca de 500.000', 'Cerca de 6'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '20' },
      codigoVerificacao: `int voltas = 0;
for (long e = 1_000_000; e > 0; e >>= 1) voltas++;
System.out.println(voltas);`,
      explicacao: 'O laço roda uma vez por bit do expoente, e 1.000.000 tem 20 bits (2²⁰ ≈ 1,05 milhão). Cada volta faz no máximo duas multiplicações. O 6 seria a quantidade de dígitos decimais, não de bits.',
      dica: 'O número de voltas é o número de bits do expoente.',
    },
    {
      id: 'aprendiz-t3-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o `HashMap` do Java usa capacidades que são potências de 2?',
      opcoes: [
        'Para calcular o índice com `hash & (capacidade - 1)`, que é mais rápido que `%` e nunca dá negativo',
        'Porque a memória só pode ser alocada em potências de 2',
        'Para que nunca haja colisões',
        'Porque o `hashCode()` sempre devolve potências de 2',
      ],
      resposta: 0,
      explicacao: 'Com capacidade 2ᵏ, o resto da divisão vira uma máscara de bits: um ciclo de CPU em vez de uma divisão cara. E, em complemento de dois, `x & (2ᵏ − 1)` já é o resto matemático, entre 0 e 2ᵏ − 1, mesmo para hashes negativos. Colisões continuam acontecendo; isso é outro assunto.',
      dica: 'Com n = 2ᵏ, o resto vira um AND com n − 1.',
    },
  ],
};

export default episodio;
