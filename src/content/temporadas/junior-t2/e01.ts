import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t2-e01',
  minutos: 12,
  aula,
  armadilhas: [
    'Java passa tudo por valor; para objetos, o valor copiado é a referência.',
    'Alterar o objeto recebido (campo, array, `append`) é visível para quem chamou.',
    'Reatribuir o parâmetro (`p = new ...`) não muda a variável de quem chamou.',
    'Nenhum método consegue trocar as variáveis de quem o chamou.',
    '`String` e wrappers são imutáveis: `s += "!"` ou `n++` dentro do método não mudam o original.',
    'Ignorar o retorno de um método compila, mas o resultado se perde.',
    'O compilador exige `return` em todos os caminhos pela estrutura do código, sem avaliar as condições.',
    'Código depois de `return` é inalcançável e não compila.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Calling Methods and Constructors, Passing Reference Data Type Arguments',
      url: 'https://dev.java/learn/language/oop/classes-objects/calling-methods-constructors/#passing-reference-data-type-arguments',
      tipo: 'documentacao',
      porque: 'O tutorial oficial mostra o método que move um círculo e o que tenta trocá-lo por outro.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Passing Information to a Method or a Constructor',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html',
      tipo: 'documentacao',
      porque: 'A versão clássica do mesmo tutorial, com primitivos e referências lado a lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JVMS 2.6: Frames',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.6',
      tipo: 'documentacao',
      porque: 'Como a JVM monta o quadro de cada chamada, com as variáveis locais e a pilha de operandos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Scott Stanchfield: Java is Pass-by-Value, Dammit!',
      url: 'https://www.javadude.com/post/20010516-pass-by-value/',
      tipo: 'artigo',
      porque: 'O texto clássico que acabou com a confusão, comparando Java com C e C++.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Pass-By-Value as a Parameter Passing Mechanism in Java',
      url: 'https://www.baeldung.com/java-pass-by-value-or-pass-by-reference',
      tipo: 'artigo',
      porque: 'Pilha e heap desenhados em cada etapa de uma chamada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 61, Passagem de parâmetros por valor e por referência',
      url: 'https://www.youtube.com/watch?v=B2w7bESRZNU',
      tipo: 'video',
      porque: 'Primitivos, objetos e o que muda em cada caso, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'CFBCursos: Passagem por valor e por referência em Java. Será que existe em Java? (Aula 28)',
      url: 'https://www.youtube.com/watch?v=25hU1275aXM',
      tipo: 'video',
      porque: 'Testa na prática se Java tem passagem por referência, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Java is ALWAYS Pass By Value. Here\'s Why',
      url: 'https://www.youtube.com/watch?v=-5NC5_sI-vQ',
      tipo: 'video',
      porque: 'A demonstração mais clara da diferença entre alterar o objeto e reatribuir o parâmetro.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Questões de passagem de dados com `StringBuilder` e `String`, no estilo exato da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Methods": seção "Passing Data among Methods", partes "Passing Objects" e "Returning Objects"',
    },
  ],
  desafio: {
    titulo: 'Descontos com e sem efeito colateral',
    enunciado:
      'Escreva três métodos para um array de preços: `comDesconto(double[] precos, int pct)`, que devolve um array **novo** sem mexer no original; `aplicarDesconto(double[] precos, int pct)`, que altera o próprio array; e `zerar(double[] precos)`, escrito com `precos = new double[precos.length];`. Rode com:\n\n```java\ndouble[] precos = {100.0, 50.0, 20.0};\ndouble[] promo = comDesconto(precos, 10);\nSystem.out.println(Arrays.toString(precos) + " " + Arrays.toString(promo));\naplicarDesconto(precos, 50);\nSystem.out.println(Arrays.toString(precos));\nzerar(precos);\nSystem.out.println(Arrays.toString(precos));\n```\n\nSaída esperada:\n\n```text\n[100.0, 50.0, 20.0] [90.0, 45.0, 18.0]\n[50.0, 25.0, 10.0]\n[50.0, 25.0, 10.0]\n```\n\nExplique por que `zerar` não zerou nada.',
    dicas: [
      'Em `comDesconto`, crie `new double[precos.length]` e preencha só ele.',
      'Em `aplicarDesconto`, escreva em `precos[i]`: o array é o mesmo de quem chamou.',
      '`zerar` faz a sua cópia da referência apontar para outro array; o do `main` continua intacto.',
    ],
    solucao: `import java.util.Arrays;

public class Descontos {
    static double[] comDesconto(double[] precos, int pct) {
        double[] novos = new double[precos.length];
        for (int i = 0; i < precos.length; i++) {
            novos[i] = precos[i] * (100 - pct) / 100;
        }
        return novos;
    }

    static void aplicarDesconto(double[] precos, int pct) {
        for (int i = 0; i < precos.length; i++) {
            precos[i] = precos[i] * (100 - pct) / 100;
        }
    }

    static void zerar(double[] precos) {
        precos = new double[precos.length];
    }

    public static void main(String[] args) {
        double[] precos = {100.0, 50.0, 20.0};
        double[] promo = comDesconto(precos, 10);
        System.out.println(Arrays.toString(precos) + " " + Arrays.toString(promo));
        aplicarDesconto(precos, 50);
        System.out.println(Arrays.toString(precos));
        zerar(precos);
        System.out.println(Arrays.toString(precos));
    }
}`,
    saida: '[100.0, 50.0, 20.0] [90.0, 45.0, 18.0]\n[50.0, 25.0, 10.0]\n[50.0, 25.0, 10.0]',
    comentarios:
      '`comDesconto` é uma função pura: só lê a entrada e devolve um resultado, o que a torna fácil de testar e segura de chamar de qualquer lugar. `aplicarDesconto` tem efeito colateral, útil quando copiar sairia caro, mas quem chama precisa saber disso. `zerar` só reatribuiu a cópia local da referência; para zerar de fato, seria preciso escrever em cada posição, por exemplo com `Arrays.fill(precos, 0)`.',
  },
  exercicios: [
    {
      id: 'junior-t2-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como Java passa os argumentos para um método?',
      opcoes: [
        'Sempre por valor; para objetos, o valor copiado é a referência',
        'Primitivos por valor e objetos por referência',
        'Sempre por referência',
        'Depende do modificador do parâmetro',
      ],
      resposta: 0,
      explicacao: 'O parâmetro sempre recebe uma cópia. Quando a cópia é uma referência, ela aponta para o mesmo objeto, o que dá a impressão de passagem por referência.',
    },
    {
      id: 'junior-t2-e01-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    static int somar(int n) {
        n += 10;
        return n;
    }

    public static void main(String[] args) {
        int a = 5;
        int b = somar(a);
        System.out.println(a + " " + b);
    }
}`,
      resposta: '5 15',
      explicacao: '`n` é uma cópia de `a`. O método muda a cópia e devolve o resultado, guardado em `b`; `a` continua 5.',
    },
    {
      id: 'junior-t2-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Caixa {
    int valor;
}

public class Teste {
    static void mudar(Caixa c) {
        c.valor = 7;
        c = new Caixa();
        c.valor = 99;
    }

    public static void main(String[] args) {
        Caixa x = new Caixa();
        mudar(x);
        System.out.println(x.valor);
    }
}`,
      opcoes: ['`7`', '`99`', '`0`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A primeira linha do método altera a caixa de `x`. Depois, `c` passa a apontar para uma caixa nova, e o 99 vai para ela, que ninguém fora do método enxerga.',
    },
    {
      id: 'junior-t2-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static void completar(String s) {
        s += "!";
    }

    public static void main(String[] args) {
        String msg = "oi";
        completar(msg);
        System.out.println(msg);
    }
}`,
      opcoes: ['`oi`', '`oi!`', '`!`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`String` é imutável: `s += "!"` cria uma `String` nova e reatribui o parâmetro. A variável `msg` continua apontando para "oi".',
    },
    {
      id: 'junior-t2-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Um método pode alterar o conteúdo de um array recebido, e quem chamou vê a mudança',
        'Reatribuir um parâmetro dentro do método não muda a variável de quem chamou',
        'Java passa objetos por referência',
        'Um método pode trocar os valores de duas variáveis `int` de quem o chamou',
        'Ao receber uma `String`, o método recebe uma cópia de cada caractere',
      ],
      respostas: [0, 1],
      explicacao: 'O array é compartilhado pela referência copiada; a variável de quem chamou, não. Para trocar duas variáveis, seria preciso passagem por referência, que Java não tem. E nenhuma cópia de caracteres acontece: copia-se só a referência.',
    },
    {
      id: 'junior-t2-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Nota {
    static String conceito(int nota) {
        if (nota >= 7) {
            return "aprovado";
        }
        if (nota < 7) {
            return "reprovado";
        }
    }
}`,
      opcoes: [
        'Não compila: falta `return` num caminho possível',
        'Compila, porque as duas condições cobrem todos os casos',
        'Compila, e o método devolve `null` se nenhum `if` for verdadeiro',
        'Não compila: um método não pode ter dois `return`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'O compilador não avalia as condições: para ele, os dois `if` podem ser falsos, e o método terminaria sem devolver nada. Trocar o segundo `if` por um `else` resolve.',
    },
    {
      id: 'junior-t2-e01-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o método devolva o maior valor. O programa deve imprimir `8`.',
      codigo: `public class Maior {
    static int maior(int a, int b) {
        ___ a > b ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(maior(3, 8));
    }
}`,
      respostas: ['return'],
      saida: '8',
      explicacao: '`return` encerra o método e entrega o valor da expressão a quem chamou. Num método `int`, ele é obrigatório.',
    },
    {
      id: 'junior-t2-e01-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Calculo {
    static void mostrar(int n) {
        System.out.println(n);
        return;
        System.out.println("fim");
    }
}`,
      resposta: 5,
      explicacao: 'Depois do `return`, nada pode rodar, e o compilador recusa comandos inalcançáveis. Em métodos `void`, `return;` sem valor serve para sair mais cedo, mas precisa ser o último comando do bloco.',
    },
    {
      id: 'junior-t2-e01-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static void processar(int[] v) {
        v[0] = 10;
        v = new int[] {20, 30};
        v[1] = 40;
    }

    public static void main(String[] args) {
        int[] dados = {1, 2};
        processar(dados);
        System.out.println(dados[0] + " " + dados[1]);
    }
}`,
      opcoes: ['`10 2`', '`20 40`', '`10 40`', '`1 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A primeira escrita vai para o array de `dados`. Depois, `v` passa a apontar para um array novo, e o 40 vai para ele.',
    },
    {
      id: 'junior-t2-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static int dobro(int n) {
        return n * 2;
    }

    public static void main(String[] args) {
        int x = 4;
        dobro(x);
        x = dobro(x) + dobro(1);
        System.out.println(x);
    }
}`,
      opcoes: ['`10`', '`18`', '`8`', 'Não compila: o retorno da linha 8 é ignorado'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Ignorar o retorno compila, e o resultado da primeira chamada simplesmente se perde. `x` ainda vale 4 na linha seguinte: 8 + 2 = 10.',
    },
    {
      id: 'junior-t2-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Ponto {
    int x;
}

public class Teste {
    static Ponto mover(Ponto p) {
        p.x++;
        return p;
    }

    public static void main(String[] args) {
        Ponto a = new Ponto();
        Ponto b = mover(a);
        Ponto c = mover(b);
        System.out.println(a.x + " " + (a == c));
    }
}`,
      opcoes: ['`2 true`', '`1 false`', '`2 false`', '`1 true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O método devolve a mesma referência que recebeu. `a`, `b` e `c` apontam para o único ponto, incrementado duas vezes.',
    },
    {
      id: 'junior-t2-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Juros {
    static double aplicar(final double valor, double taxa) {
        valor *= 1 + taxa;
        return valor;
    }
}`,
      opcoes: ['Não compila', 'Compila', 'Compila com um aviso', 'Não compila: parâmetros não podem ser `final`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'Parâmetros podem ser `final`, e então não podem ser reatribuídos, nem com `*=`. Bastaria `return valor * (1 + taxa);`.',
    },
    {
      id: 'junior-t2-e01-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    static void incrementar(Integer n) {
        n++;
    }

    public static void main(String[] args) {
        Integer contador = 5;
        incrementar(contador);
        System.out.println(contador);
    }
}`,
      resposta: '5',
      explicacao: '`Integer` é imutável. `n++` desembrulha, soma, embrulha num objeto novo e reatribui a variável local `n`. O `Integer` de `contador` nunca muda.',
    },
    {
      id: 'junior-t2-e01-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No quadro de um método de instância, o que fica na posição 0 do vetor de variáveis locais?',
      opcoes: [
        'A referência `this`, copiada como os outros argumentos',
        'O primeiro parâmetro declarado',
        'O endereço de retorno',
        'O valor que o método vai devolver',
      ],
      resposta: 0,
      explicacao: 'Para a JVM, `this` é um argumento implícito, passado por valor como os outros. Os parâmetros declarados começam na posição 1. Em métodos `static`, que não têm `this`, começam na 0.',
    },
    {
      id: 'junior-t2-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static StringBuilder a(StringBuilder sb) {
        return sb.append("a");
    }

    static StringBuilder b(StringBuilder sb) {
        sb = new StringBuilder("b");
        return sb;
    }

    public static void main(String[] args) {
        StringBuilder s = new StringBuilder("x");
        StringBuilder r1 = a(s);
        StringBuilder r2 = b(s);
        System.out.println(s + " " + r1 + " " + r2);
    }
}`,
      opcoes: ['`xa xa b`', '`x xa b`', '`xa xa xa`', '`b xa b`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`a` altera o objeto de `s` e devolve a mesma referência: `s` e `r1` são o mesmo "xa". `b` cria outro objeto e o devolve, sem tocar em `s`.',
    },
  ],
};

export default episodio;
