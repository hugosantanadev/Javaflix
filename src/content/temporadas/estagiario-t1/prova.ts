import type { Exercicio } from '../../types';

/** Prova da Temporada 1: questões inéditas, no formato da certificação. */
const prova: Exercicio[] = [
  {
    id: 'estagiario-t1-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O arquivo é executado com `java Bilhete.java`, sem argumentos. Qual é o resultado?',
    codigo: `public class Bilhete {
    public static void main(String... args) {
        String destino = args.length > 1 ? args[1] : "nenhum";
        System.out.print(args.length + " ");
        System.out.println(destino);
    }
}`,
    opcoes: [
      '`0 nenhum`',
      '`1 nenhum`',
      '`0 null`',
      'Lança `ArrayIndexOutOfBoundsException`',
      'Não compila: `main` precisa receber `String[]`',
      'Não compila: o modo arquivo-fonte exige um `package`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`String...` é uma forma válida de declarar o parâmetro do `main`. Sem argumentos, `args` é um array vazio: `args.length` vale 0 e o ternário evita o acesso a `args[1]`, escolhendo `nenhum`.',
  },
  {
    id: 'estagiario-t1-prova-q02',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais declarações compilam? Escolha duas.',
    opcoes: [
      '`float f = 1_000.0;`',
      '`long l = 0x7FFF_FFFF_FFFFL;`',
      '`int i = 0b_101;`',
      '`double d = 1_000.000_1;`',
      "`char c = '\\u00ZZ';`",
      '`short s = 40_000;`',
    ],
    respostas: [1, 3],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao:
      'Underscores entre dígitos hexadecimais ou decimais são permitidos, então B e D compilam. `1_000.0` é `double` e não vai para `float` sem cast; `0b_101` tem `_` logo depois do prefixo; `\\u00ZZ` não é um escape Unicode válido; e 40.000 não cabe em `short`.',
  },
  {
    id: 'estagiario-t1-prova-q03',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o arquivo `Caixa.java` de compilar.',
    codigo: `// Arquivo: Caixa.java
package banco;

import java.util.List;
import java.util.ArrayList;

public class Caixa {
    List<String> nomes = new ArrayList<>();
}

class Extrato {
}

import java.util.Map;`,
    resposta: 14,
    explicacao:
      'O comentário antes do `package` e a segunda classe (não pública) são permitidos. O `import` no fim do arquivo não é: imports só podem vir antes da primeira declaração de tipo.',
  },
  {
    id: 'estagiario-t1-prova-q04',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Letras {
    public static void main(String[] args) {
        char a = 'J';
        char b = 'a';
        int soma = a + b;
        System.out.println(a + b + "va");
        System.out.println("" + a + b + "va");
        System.out.println(soma);
    }
}`,
    opcoes: [
      '`Java\nJava\n171`',
      '`171va\nJava\n171`',
      '`171va\n171va\n171`',
      '`Java\nJava\nJa`',
      '`74va\nJava\n171`',
      'Não compila',
    ],
    resposta: 1,
    verificar: { tipo: 'saida' },
    explicacao:
      'A expressão é avaliada da esquerda para a direita. Em `a + b + "va"`, os dois `char` são somados primeiro como números (74 + 97 = 171) e só depois entra a String. Em `"" + a + b + "va"`, a String vem primeiro e tudo vira concatenação.',
  },
  {
    id: 'estagiario-t1-prova-q05',
    tipo: 'linha',
    dificuldade: 1,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `public class Estoque {
    public static void main(String[] args) {
        var quantidade = 10;
        var preco = 2.5;
        var total;
        total = quantidade * preco;
        System.out.println(total);
    }
}`,
    resposta: 5,
    explicacao: '`var` precisa do inicializador na mesma declaração, porque é dele que o compilador tira o tipo. Separar declaração e atribuição só funciona com o tipo explícito, como `double total;`.',
  },
  {
    id: 'estagiario-t1-prova-q06',
    tipo: 'multipla',
    dificuldade: 1,
    enunciado: 'Quais afirmações sobre as ferramentas do JDK são verdadeiras? Escolha três.',
    opcoes: [
      '`javac` compila arquivos-fonte e grava arquivos `.class`',
      '`java Programa.java` executa um arquivo-fonte sem gravar `.class` em disco',
      '`jar` é necessário para executar qualquer programa Java',
      '`jshell` permite testar trechos de código de forma interativa',
      '`javadoc` compila comentários em bytecode',
      '`java Programa.class` executa a classe `Programa`',
    ],
    respostas: [0, 1, 3],
    explicacao:
      'O `jar` só empacota; classes soltas rodam sem ele. O `javadoc` gera HTML, não bytecode. E o comando `java` recebe o nome da classe sem extensão: `java Programa.class` procura uma classe chamada `Programa.class` e falha.',
  },
  {
    id: 'estagiario-t1-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado?',
    codigo: `public class Turno {
    public static void main(String[] args) {
        int hora = 14;
        String turno;
        if (hora < 12) {
            turno = "manhã";
        }
        if (hora >= 12) {
            turno = "tarde";
        }
        System.out.println(turno);
    }
}`,
    opcoes: [
      'Imprime `tarde`',
      'Imprime `manhã`',
      'Imprime `null`',
      'Não compila',
      'Lança `NullPointerException`',
    ],
    resposta: 3,
    verificar: { tipo: 'naoCompila', linha: 11 },
    explicacao:
      'Para o compilador, os dois `if` são independentes: existe um caminho teórico em que nenhum deles executa. Ele não deduz que as condições se complementam. Com `if`/`else`, compilaria e imprimiria `tarde`.',
  },
  {
    id: 'estagiario-t1-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Placar {
    static int pontos;
    static String jogador;

    public static void main(String[] args) {
        int bonus = 5;
        System.out.println(jogador + ":" + (pontos + bonus));
    }
}`,
    opcoes: [
      '`null:5`',
      '`:5`',
      'Não compila: `pontos` não foi inicializado',
      'Não compila: `jogador` não foi inicializado',
      'Lança `NullPointerException`',
      '`0:5`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Campos ganham valor padrão: `pontos` vale 0 e `jogador` vale `null`. Concatenar `null` numa String produz o texto `null`, sem exceção. Os parênteses fazem `pontos + bonus` ser somado antes.',
  },
  {
    id: 'estagiario-t1-prova-q09',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Cada opção é um arquivo `A.java` completo. Quais compilam? Escolha duas.',
    opcoes: [
      '`import java.util.*;\nimport java.sql.*;\npublic class A { Date d; }`',
      '`import java.util.Date;\nimport java.sql.*;\npublic class A { Date d; }`',
      '`import java.util.Date;\nimport java.sql.Date;\npublic class A { }`',
      '`import java.util.*;\nimport java.sql.*;\npublic class A { java.util.Date d; }`',
      '`import java.util.*;\nimport java.sql.*;\npublic class A { List<Date> d; }`',
    ],
    respostas: [1, 3],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao:
      'B compila porque o import explícito vence o curinga. D compila porque o nome completo dispensa o import. A e E usam `Date` com dois curingas que a contêm, e C tem dois imports explícitos com o mesmo nome simples.',
  },
  {
    id: 'estagiario-t1-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `long total = 0x1F + 017 + 0b1_1 + 1_0L;
System.out.println(total);`,
    opcoes: [
      '`59`',
      '`61`',
      '`49`',
      'Não compila: `_` não é permitido em literal binário',
      'Não compila: não dá para somar `int` com `long` numa atribuição',
      '`0x1F01701110`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`0x1F` é 31, `017` é octal 15, `0b1_1` é binário 3 (o `_` está entre dígitos) e `1_0L` é 10. Somando: 31 + 15 + 3 + 10 = 59. A expressão vira `long` por causa do último termo.',
  },
  {
    id: 'estagiario-t1-prova-q11',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado:
      'A classe `Relatorio` declara `package br.com.vendas;` e foi compilada com `javac -d classes Relatorio.java`, a partir da pasta do projeto. Quais comandos, executados na mesma pasta, rodam o programa? Escolha dois.',
    opcoes: [
      '`java -cp classes br.com.vendas.Relatorio`',
      '`java -classpath classes br.com.vendas.Relatorio`',
      '`java classes/br/com/vendas/Relatorio`',
      '`java -cp classes Relatorio`',
      '`java -cp classes/br/com/vendas Relatorio`',
      '`java br.com.vendas.Relatorio.class`',
    ],
    respostas: [0, 1],
    explicacao:
      '`-cp` e `-classpath` são a mesma opção e devem apontar para a raiz das pastas de pacote. A classe é sempre chamada pelo nome totalmente qualificado, sem extensão e sem caminho de pasta.',
  },
  {
    id: 'estagiario-t1-prova-q12',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado:
      'Uma equipe compila o projeto no Windows com o JDK 21 e copia os arquivos `.class` para um servidor Linux com Java 21 instalado. O que acontece?',
    opcoes: [
      'Os `.class` rodam no Linux sem recompilar',
      'É preciso recompilar no Linux, porque o bytecode é específico de cada sistema',
      'Só rodam se o servidor tiver o `javac` instalado',
      'Só rodam se o código não usar `System.out`',
      'Rodam, mas sem o compilador JIT',
    ],
    resposta: 0,
    explicacao:
      'Bytecode é independente de plataforma. Quem muda de um sistema para outro é a JVM, que interpreta o bytecode e compila os trechos quentes para código nativo da máquina onde está.',
  },
  {
    id: 'estagiario-t1-prova-q13',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `public class Notas {
    public static void main(String[] args) {
        var turma = "3B";
        var notas = new int[] {7, 8, 9};
        var medias = {7.5, 8.0};
        System.out.println(turma + notas.length);
    }
}`,
    resposta: 5,
    explicacao:
      'Um inicializador de array solto, como `{7.5, 8.0}`, só funciona quando o tipo está escrito na declaração. Com `var`, o compilador não sabe que tipo de array criar. Já `new int[] {7, 8, 9}` informa o tipo e compila.',
  },
  {
    id: 'estagiario-t1-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Doc {
    /** Soma dois números. */
    static int soma(int a, int b) {
        return a + b; // devolve a soma
    }

    public static void main(String[] args) {
        System.out.println("/* " + soma(2, 3) + " */");
    }
}`,
    opcoes: [
      '`/* 5 */`',
      '`5`',
      'Não compila: comentário de bloco não foi fechado',
      '`/* soma(2, 3) */`',
      'Não compila: comentário javadoc só pode ficar antes de classes',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Os símbolos de comentário estão dentro de aspas, então são texto comum e aparecem na saída. O comentário `/** */` antes de um método é permitido; é assim que se documentam métodos.',
  },
  {
    id: 'estagiario-t1-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    provas: ['829', '830'],
    enunciado: 'No Java 21, quais declarações compilam? Escolha três.',
    opcoes: ['`int _valor = 1;`', '`int $ = 2;`', '`int valor#1 = 3;`', '`int 1valor = 4;`', '`int valor_1 = 5;`', '`int _ = 6;`'],
    respostas: [0, 1, 4],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao:
      '`_valor`, `$` e `valor_1` seguem a regra: começam com letra, `$` ou `_` e continuam com letras, dígitos, `$` ou `_`. O `#` não é permitido, nomes não começam com dígito e `_` sozinho não é identificador no Java 21.',
  },
  {
    id: 'estagiario-t1-prova-q16',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Em quais declarações o literal `40000` é aceito sem cast? Escolha quatro.',
    opcoes: ['`byte x = 40000;`', '`short x = 40000;`', '`char x = 40000;`', '`int x = 40000;`', '`long x = 40000;`', '`float x = 40000;`'],
    respostas: [2, 3, 4, 5],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao:
      '`char` vai de 0 a 65.535, então comporta 40.000, mesmo tendo os mesmos 16 bits de `short`, que só vai até 32.767. `int`, `long` e `float` aceitam um `int` por conversão de alargamento. `byte` não chega lá.',
  },
  {
    id: 'estagiario-t1-prova-q17',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Durante a execução, qual componente transforma trechos de bytecode muito usados em código nativo?',
    opcoes: ['O `javac`', 'O compilador JIT da JVM', 'O class loader', 'O `jlink`', 'O sistema operacional'],
    resposta: 1,
    explicacao:
      'O compilador just-in-time faz parte da JVM e age enquanto o programa roda. O `javac` atua antes, gerando bytecode; o class loader carrega classes; o `jlink` monta runtimes.',
  },
  {
    id: 'estagiario-t1-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Mistura {
    public static void main(String[] args) {
        var x = 5;
        {
            var y = x * 2L;
            x = (int) y + 1;
        }
        var texto = x + "" + x;
        System.out.println(texto);
    }
}`,
    opcoes: [
      '`1111`',
      '`22`',
      '`1010`',
      'Não compila: `y` é `long` e `x` é `int`',
      'Não compila: `x` não pode ser alterado dentro do bloco',
      '`11`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`x * 2L` é `long`, então `y` vale 10 como `long`. O cast `(int) y` permite a atribuição, e `x` vira 11. O bloco pode alterar variáveis de fora; só não pode redeclarar. Por fim, `x + "" + x` concatena: `1111`.',
  },
  {
    id: 'estagiario-t1-prova-q19',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre `var` são verdadeiras? Escolha duas.',
    opcoes: [
      '`var` pode ser usado em variáveis locais que têm inicializador',
      '`var` pode ser usado em campos de uma classe',
      'O tipo de uma variável declarada com `var` é decidido na compilação e não muda',
      '`var` torna a variável dinamicamente tipada, como em JavaScript',
      '`var x = null;` compila, e `x` passa a ser do tipo `Object`',
    ],
    respostas: [0, 2],
    explicacao:
      '`var` é inferência de tipo em tempo de compilação, só para variáveis locais. O tipo fica fixo como se tivesse sido escrito. Com `null` sozinho não há tipo para inferir, então não compila.',
  },
  {
    id: 'estagiario-t1-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    provas: ['831'],
    enunciado: 'No Java 25, o arquivo `Oi.java` é executado com `java Oi.java`. Qual é o resultado?',
    codigo: `String saudacao = "Oi";

void main() {
    IO.println(saudacao + ", Java 25");
}`,
    opcoes: [
      'Imprime `Oi, Java 25`',
      'Não compila: campos não podem ficar fora de uma classe',
      'Não compila: `main` precisaria ser `static` para ler `saudacao`',
      'Compila, mas a JVM não encontra um `main` válido',
    ],
    resposta: 0,
    verificar: { tipo: 'executa', saida: 'Oi, Java 25' },
    explicacao:
      'Num arquivo-fonte compacto, campos e métodos soltos pertencem a uma classe implícita. Como o `main` é de instância, a JVM cria um objeto dessa classe antes de chamá-lo, e o método enxerga o campo `saudacao` normalmente.',
  },
];

export default prova;
