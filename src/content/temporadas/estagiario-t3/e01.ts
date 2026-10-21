import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t3-e01',
  minutos: 10,
  aula,
  armadilhas: [
    'A condição do `if` precisa ser `boolean`: `if (1)` não compila.',
    'Sem chaves, o `if` controla só o próximo comando, qualquer que seja a indentação.',
    '`if (x > 0);` tem corpo vazio; o bloco seguinte roda sempre, e compila sem aviso.',
    'O `else` pertence ao `if` mais próximo que ainda não tem `else`.',
    'Numa cadeia de `else if`, só a primeira condição verdadeira executa.',
    '`if (ok) int y = 1;` não compila: o corpo sem chaves não pode ser uma declaração.',
    'Variáveis declaradas num bloco não existem depois dele.',
    'A variável do `instanceof` com padrão funciona depois de `&&`, mas não depois de `||`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: The if-then and if-then-else Statements',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html',
      tipo: 'documentacao',
      porque: 'O `if` e as cadeias de `else if`, com o exemplo clássico de notas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.9: The if Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9',
      tipo: 'documentacao',
      porque: 'A definição formal, com a exigência de condição `boolean`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 6.3: Scope of a Declaration',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.3',
      tipo: 'documentacao',
      porque: 'Até onde uma variável de bloco existe, incluindo as variáveis de padrão do `instanceof`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 394: Pattern Matching for instanceof',
      url: 'https://openjdk.org/jeps/394',
      tipo: 'documentacao',
      porque: 'Por que o `instanceof` ganhou variáveis e as regras de escopo por fluxo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Control Flow Statements',
      url: 'https://dev.java/learn/language/constructs/basics/controlling-flow/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre `if`, laços e desvios.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #09, Estruturas Condicionais (Parte 1)',
      url: 'https://www.youtube.com/watch?v=wW3eve4vTMc',
      tipo: 'video',
      porque: 'O `if` e o `else` explicados do zero, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #10, Estruturas Condicionais (Parte 2)',
      url: 'https://www.youtube.com/watch?v=oNSrBld06qs',
      tipo: 'video',
      porque: 'Condições aninhadas, `else if` e o começo do `switch`.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O capítulo de decisões cobre o `if` e o pattern matching com as pegadinhas de escopo.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seções sobre o `if` e pattern matching',
    },
    {
      titulo: 'Think Java, 2ª edição (Downey e Mayfield)',
      url: 'https://greenteapress.com/wp/think-java-2e/',
      tipo: 'livro',
      porque: 'Condicionais, encadeamento e aninhamento, para quem está começando.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 5, "Conditionals and Logic"',
    },
  ],
  desafio: {
    titulo: 'Calculadora de IMC',
    enunciado:
      'Escreva `classificar(double peso, double altura)`, que calcula o IMC (peso dividido pela altura ao quadrado) e devolve a faixa: "abaixo do peso" (menos de 18,5), "normal" (até 24,9), "sobrepeso" (até 29,9) ou "obesidade". Use uma cadeia de `else if` na ordem certa. Para (50, 1.75), (70, 1.75), (85, 1.75) e (100, 1.75), imprima:\n\n```text\n16.3 abaixo do peso\n22.9 normal\n27.8 sobrepeso\n32.7 obesidade\n```',
    dicas: [
      'IMC = peso / (altura * altura).',
      'Teste do menor para o maior limite: cada `else if` já sabe que as condições anteriores falharam.',
      'Para uma casa decimal, use `String.format("%.1f", imc)`. O separador decimal depende do idioma do sistema; force o ponto com `Locale.US`.',
    ],
    solucao: `import java.util.Locale;

public class Imc {
    static String classificar(double peso, double altura) {
        double imc = peso / (altura * altura);
        String faixa;
        if (imc < 18.5) {
            faixa = "abaixo do peso";
        } else if (imc < 25) {
            faixa = "normal";
        } else if (imc < 30) {
            faixa = "sobrepeso";
        } else {
            faixa = "obesidade";
        }
        return String.format(Locale.US, "%.1f", imc) + " " + faixa;
    }

    public static void main(String[] args) {
        System.out.println(classificar(50, 1.75));
        System.out.println(classificar(70, 1.75));
        System.out.println(classificar(85, 1.75));
        System.out.println(classificar(100, 1.75));
    }
}`,
    saida: '16.3 abaixo do peso\n22.9 normal\n27.8 sobrepeso\n32.7 obesidade',
    comentarios:
      'Repare que os testes usam `< 25` e `< 30`, e não `<= 24.9` e `<= 29.9`: com ponto flutuante, um IMC de 24,95 escaparia de todas as faixas na versão com `<=`. Como cada `else if` só roda quando os anteriores falharam, basta testar o limite superior. E a variável `faixa` é declarada antes do `if` e recebe valor em todos os ramos, o que satisfaz a regra de atribuição definida do compilador.',
  },
  exercicios: [
    {
      id: 'estagiario-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 7;
if (x % 2 == 0) {
    System.out.println("par");
} else {
    System.out.println("ímpar");
}`,
      opcoes: ['`ímpar`', '`par`', '`par` e depois `ímpar`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '7 % 2 é 1, então a condição é falsa e o `else` executa. Só um dos dois ramos roda.',
    },
    {
      id: 'estagiario-t3-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int temperatura = 35;
if (temperatura > 20) {
    System.out.println("agradável");
} else if (temperatura > 30) {
    System.out.println("quente");
} else {
    System.out.println("frio");
}`,
      resposta: 'agradável',
      explicacao: 'A cadeia para na primeira condição verdadeira: 35 > 20, então imprime "agradável" e pula o resto, mesmo que 35 > 30 também seja verdadeiro. A condição mais restritiva deveria vir primeiro.',
    },
    {
      id: 'estagiario-t3-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int saldo = 50;
if (saldo > 100)
    System.out.println("pode comprar");
    System.out.println("compra aprovada");
System.out.println("fim");`,
      opcoes: ['`compra aprovada\nfim`', '`fim`', '`pode comprar\ncompra aprovada\nfim`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem chaves, o `if` controla só o primeiro `println`. O segundo, apesar da indentação, está fora do `if` e roda sempre. Um bug real: a compra "aprovada" sem saldo.',
    },
    {
      id: 'estagiario-t3-e01-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int a = -1, b = 5;
if (a > 0)
    if (b > 0)
        System.out.println("dois positivos");
else
    System.out.println("a não é positivo");
System.out.println("fim");`,
      opcoes: ['`fim`', '`a não é positivo\nfim`', '`dois positivos\nfim`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `else` pertence ao `if (b > 0)`, o mais próximo, apesar da indentação. Como `a > 0` é falso, todo o `if` interno (com o seu `else`) é pulado. A mensagem "a não é positivo" nunca aparece justamente quando deveria.',
    },
    {
      id: 'estagiario-t3-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`int x = 1; if (x) {}`',
        '`boolean ok = true; if (ok) int y = 2;`',
        '`boolean b = false; if (b = true) {}`',
        '`if (1 > 0) ;`',
        '`String s = "a"; if (s.isEmpty()) {} else {}`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'A condição precisa ser `boolean`, e o corpo sem chaves não pode ser uma declaração. `if (b = true)` é uma atribuição de `boolean` (compila, mas provavelmente é bug), e `if (1 > 0) ;` tem um corpo vazio válido.',
    },
    {
      id: 'estagiario-t3-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `if (false);
System.out.println("x");`,
      opcoes: ['`x`', 'Nada', 'Não compila: `if` sem corpo', 'Não compila: código inalcançável'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O corpo do `if` é o comando vazio `;`. O `println` está depois do `if` e roda sempre. E `if (false)` não gera erro de código inalcançável: é a exceção que a linguagem permite para desligar trechos.',
    },
    {
      id: 'estagiario-t3-e01-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o operador que testa se `n` é par. O programa deve imprimir `par`.',
      codigo: `public class Paridade {
    public static void main(String[] args) {
        int n = 10;
        if (n ___ 2 == 0) {
            System.out.println("par");
        } else {
            System.out.println("ímpar");
        }
    }
}`,
      respostas: ['%'],
      saida: 'par',
      explicacao: 'O resto da divisão por 2 é 0 para números pares. Com `/`, seria 5 == 0, falso.',
    },
    {
      id: 'estagiario-t3-e01-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Escopo {
    public static void main(String[] args) {
        int total = 0;
        if (total == 0) {
            int bonus = 10;
            total += bonus;
        }
        System.out.println(total + bonus);
    }
}`,
      resposta: 8,
      explicacao: '`bonus` foi declarada dentro do bloco do `if` e deixou de existir no `}`. `total`, declarada antes do `if`, continua visível.',
    },
    {
      id: 'estagiario-t3-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int x = 3;
if (x > 2) x = x * 2;
if (x > 5) x = x + 1;
else x = 0;
System.out.println(x);`,
      opcoes: ['`7`', '`6`', '`0`', '`8`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'São dois `if` independentes. O primeiro dobra x para 6. O segundo testa o novo valor: 6 > 5, então soma 1. O `else` pertence só ao segundo `if`.',
    },
    {
      id: 'estagiario-t3-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `Object o = 42;
if (o instanceof Integer i && i > 40) System.out.println("grande " + i);
else System.out.println("outro");`,
      opcoes: ['`grande 42`', '`outro`', 'Não compila: `i` não pode ser usada no `&&`', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `42` foi guardado como `Integer`. O teste de tipo passa, a variável `i` já é um `Integer`, e o lado direito do `&&` só é avaliado depois do teste verdadeiro, então pode usá-la.',
    },
    {
      id: 'estagiario-t3-e01-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha dois.',
      opcoes: [
        '`Object o = "x"; if (o instanceof String s) System.out.println(s.length());`',
        '`Object o = "x"; if (o instanceof String s || s.isEmpty()) {}`',
        '`Object o = "x"; if (!(o instanceof String s)) return; System.out.println(s);`',
        '`Object o = "x"; if (o instanceof String s) {} System.out.println(s);`',
        '`Object o = 1; if (o instanceof int i) {}`',
      ],
      respostas: [0, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'A variável do padrão existe onde o teste é certamente verdadeiro: dentro do `if`, e depois de um `if` que sai do método quando o teste falha. Depois do `||`, o lado direito roda quando o teste falhou; depois de um `if` comum, o teste pode ter falhado. E padrões de tipo primitivo não existem no Java padrão.',
    },
    {
      id: 'estagiario-t3-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `int idade = 65;
String faixa;
if (idade < 18) faixa = "menor";
else if (idade < 60) faixa = "adulto";
else faixa = "idoso";
System.out.println(faixa);`,
      opcoes: ['`idoso`', '`adulto`', '`menor`', 'Não compila: `faixa` pode não ter valor'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '65 não é menor que 18 nem que 60, então cai no `else` final. Como todos os ramos atribuem `faixa`, o compilador sabe que ela tem valor no `println`.',
    },
    {
      id: 'estagiario-t3-e01-q13',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int a = 4, b = 7;
String r = "";
if (a > 3) {
    r += "A";
    if (b < 5) r += "B";
    else if (b < 8) r += "C";
} else r += "D";
if (a + b > 10) r += "E";
System.out.println(r);`,
      resposta: 'ACE',
      explicacao: 'a > 3: acrescenta A. Dentro, b < 5 é falso e b < 8 é verdadeiro: acrescenta C. O `else` com D é do `if (a > 3)` e não roda. Por fim, 4 + 7 = 11 > 10: acrescenta E.',
    },
    {
      id: 'estagiario-t3-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual condição é verdadeira exatamente quando `x` **não** está entre 10 e 20, inclusive?',
      opcoes: ['`x < 10 || x > 20`', '`x < 10 && x > 20`', '`x <= 10 || x >= 20`', '`!(x > 10 && x < 20)`'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true' },
      codigoVerificacao: `boolean ok = true;
for (int x = 0; x <= 30; x++) {
    boolean fora = !(x >= 10 && x <= 20);
    if ((x < 10 || x > 20) != fora) ok = false;
}
System.out.println(ok);`,
      explicacao: '"Entre 10 e 20" é `x >= 10 && x <= 20`. Negando com De Morgan: `x < 10 || x > 20`. Com `&&`, nenhum número satisfaz as duas. As outras duas erram nas bordas 10 e 20.',
    },
    {
      id: 'estagiario-t3-e01-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'De que tipo precisa ser a expressão entre os parênteses de um `if`?',
      opcoes: ['`boolean` (ou `Boolean`)', 'Qualquer tipo numérico', '`int`', 'Qualquer tipo'],
      resposta: 0,
      explicacao: 'O Java exige um valor verdadeiro ou falso. Um `Boolean` também serve, por *unboxing*, mas lança `NullPointerException` se for nulo. Números não são convertidos para verdadeiro ou falso, como em C.',
    },
  ],
};

export default episodio;
