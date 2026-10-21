import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t2-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'Só a lista de parâmetros diferencia sobrecargas; métodos que diferem só no retorno não compilam.',
    'Nomes de parâmetros, modificadores e exceções não fazem parte da assinatura.',
    'A ordem de escolha é: exato e alargamento, depois autoboxing, depois varargs.',
    'Alargar vem antes de embrulhar: com `m(long)` e `m(Integer)`, um `int` vai para `long`.',
    'Um `int` nunca vira `Long`; mas vira `Integer` e daí `Object`.',
    '`char` alarga para `int`: `m(\'A\')` escolhe `m(int)` antes de `m(Character)`.',
    'Duas versões igualmente boas tornam a chamada ambígua, e o erro aparece na chamada.',
    'A sobrecarga é escolhida na compilação, pelo tipo declarado, não pelo objeto real.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Defining Methods, Overloading Methods',
      url: 'https://dev.java/learn/language/oop/classes-objects/defining-methods/#overloading-methods',
      tipo: 'documentacao',
      porque: 'O que é a assinatura de um método e quando duas versões podem coexistir.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.2: Method Signature',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.2',
      tipo: 'documentacao',
      porque: 'A definição formal de assinatura, sem o tipo de retorno.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.12.2: Compile-Time Step 2, Determine Method Signature',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.12.2',
      tipo: 'documentacao',
      porque: 'As três fases de busca e a regra do método mais específico, de onde vêm todas as respostas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Method Overloading and Overriding in Java',
      url: 'https://www.baeldung.com/java-method-overload-override',
      tipo: 'artigo',
      porque: 'Sobrecarga e sobrescrita lado a lado, com a diferença entre escolher na compilação e na execução.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 33, Sobrecarga de métodos e construtores (overload)',
      url: 'https://www.youtube.com/watch?v=ZpssJov_5_A',
      tipo: 'video',
      porque: 'Sobrecarga de métodos e de construtores, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Sobrecarga de métodos',
      url: 'https://www.youtube.com/watch?v=UNPh61FYFrA',
      tipo: 'video',
      porque: 'Quando usar sobrecarga e o que não conta para diferenciar as versões.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java Challengers: Advanced Overloading with varargs',
      url: 'https://www.youtube.com/watch?v=t7Mj_v0ouDc',
      tipo: 'video',
      porque: 'Um desafio que combina alargamento, boxing e varargs, como nas questões mais difíceis.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que sobrecargas com o mesmo número de parâmetros confundem, com o exemplo clássico de `List.remove`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Methods": Item 52, "Use overloading judiciously"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela com a ordem de escolha e os exemplos com cada tipo de conversão.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Methods": seção "Overloading Methods", partes "Reference Types", "Primitives", "Autoboxing" e "Putting It All Together"',
    },
  ],
  desafio: {
    titulo: 'Preveja cada versão',
    enunciado:
      'Escreva seis versões de `formatar`: com `int`, `long`, `double`, `String`, `Object` e `int...`. Cada uma devolve o nome do tipo e o valor; a de varargs devolve quantos valores recebeu. **Antes de rodar**, preveja que versão cada chamada abaixo usa:\n\n```java\nSystem.out.println(formatar(7));\nSystem.out.println(formatar(7L));\nSystem.out.println(formatar(\'x\'));\nSystem.out.println(formatar(2.5f));\nSystem.out.println(formatar("oi"));\nSystem.out.println(formatar(Integer.valueOf(3)));\nSystem.out.println(formatar());\nSystem.out.println(formatar(1, 2, 3));\n```\n\nSaída esperada:\n\n```text\nint: 7\nlong: 7\nint: 120\ndouble: 2.5\nString: oi\nObject: 3\nvarargs: 0 valores\nvarargs: 3 valores\n```',
    dicas: [
      'O `char` alarga para `int` na primeira fase, antes de qualquer embrulho.',
      'O `float` não tem versão própria: alarga para `double`.',
      'Para o `Integer`, a primeira fase já encontra `Object` (um supertipo); desembrulhar para `int` seria só na segunda.',
    ],
    solucao: `public class Formatos {
    static String formatar(int x) {
        return "int: " + x;
    }

    static String formatar(long x) {
        return "long: " + x;
    }

    static String formatar(double x) {
        return "double: " + x;
    }

    static String formatar(String s) {
        return "String: " + s;
    }

    static String formatar(Object o) {
        return "Object: " + o;
    }

    static String formatar(int... valores) {
        return "varargs: " + valores.length + " valores";
    }

    public static void main(String[] args) {
        System.out.println(formatar(7));
        System.out.println(formatar(7L));
        System.out.println(formatar('x'));
        System.out.println(formatar(2.5f));
        System.out.println(formatar("oi"));
        System.out.println(formatar(Integer.valueOf(3)));
        System.out.println(formatar());
        System.out.println(formatar(1, 2, 3));
    }
}`,
    saida: 'int: 7\nlong: 7\nint: 120\ndouble: 2.5\nString: oi\nObject: 3\nvarargs: 0 valores\nvarargs: 3 valores',
    comentarios:
      'A linha mais traiçoeira é a do `Integer`: muita gente aposta em `int`, mas desembrulhar é da segunda fase, e a primeira já encontrou `Object`, porque `Integer` é um `Object`. O `char` virou o número 120, o código de "x", porque a versão `int` venceu sem precisar de embrulho. Sobrecargas assim confundem até quem as escreveu, e o Effective Java recomenda evitar versões com o mesmo número de parâmetros.',
  },
  exercicios: [
    {
      id: 'junior-t2-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que precisa ser diferente entre duas versões sobrecarregadas de um método?',
      opcoes: [
        'A lista de parâmetros: número, tipos ou ordem',
        'O tipo de retorno',
        'Os nomes dos parâmetros',
        'O modificador de acesso',
      ],
      resposta: 0,
      explicacao: 'A assinatura é o nome mais os tipos dos parâmetros. Retorno, nomes e modificadores não contam.',
    },
    {
      id: 'junior-t2-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static String f(int x) { return "int"; }
    static String f(long x) { return "long"; }
    static String f(double x) { return "double"; }

    public static void main(String[] args) {
        byte b = 1;
        System.out.println(f(b) + " " + f(2L) + " " + f(3.0f) + " " + f('c'));
    }
}`,
      resposta: 'int long double int',
      explicacao: 'Cada argumento vai para o menor tipo que o aceita por alargamento: `byte` e `char` para `int`, `float` para `double`. O `2L` tem versão exata.',
    },
    {
      id: 'junior-t2-e02-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Conversor {
    int converter(String s) {
        return s.length();
    }

    long converter(String texto) {
        return texto.length() * 2L;
    }
}`,
      opcoes: [
        'Não compila: os dois métodos têm a mesma assinatura',
        'Compila, porque os retornos são diferentes',
        'Compila, porque os nomes dos parâmetros são diferentes',
        'Compila, mas qualquer chamada a `converter` é ambígua',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Para a assinatura, só importam o nome e os tipos dos parâmetros: os dois são `converter(String)`.',
    },
    {
      id: 'junior-t2-e02-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static void m(Object o) { System.out.print("O "); }
    static void m(long l) { System.out.print("L "); }
    static void m(int... v) { System.out.print("V "); }

    public static void main(String[] args) {
        m(1);
        m(Integer.valueOf(1));
        m(1, 2);
        System.out.println();
    }
}`,
      opcoes: ['`L O V`', '`O O V`', '`L L V`', '`V O V`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `int` alarga para `long` na primeira fase. O `Integer` já é um `Object`, também na primeira fase, sem precisar desembrulhar. Dois argumentos só cabem no varargs.',
    },
    {
      id: 'junior-t2-e02-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais classes compilam? Escolha três.',
      opcoes: [
        '`class A { void m(int x) { } void m(long x) { } }`',
        '`class B { void m(int x, String s) { } void m(String s, int x) { } }`',
        '`class C { void m(int[] v) { } void m(int... v) { } }`',
        '`class D { int m(int x) { return x; } void m(int y) { } }`',
        '`class E { void m(Integer x) { } void m(int x) { } }`',
      ],
      respostas: [0, 1, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Tipos diferentes, ordem diferente e primitivo contra wrapper são sobrecargas válidas. `int[]` e `int...` são o mesmo tipo para a assinatura, e `D` só muda o retorno e o nome do parâmetro.',
    },
    {
      id: 'junior-t2-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que a versão sem parâmetros reaproveite a outra. O programa deve imprimir `Olá, mundo`.',
      codigo: `public class Saudacao {
    static String ola(String nome) {
        return "Olá, " + nome;
    }

    static String ola() {
        return ___("mundo");
    }

    public static void main(String[] args) {
        System.out.println(ola());
    }
}`,
      respostas: ['ola'],
      saida: 'Olá, mundo',
      explicacao: 'Uma sobrecarga pode chamar outra pelo mesmo nome: o compilador escolhe a versão de um parâmetro `String`. É o jeito comum de oferecer valores padrão em Java.',
    },
    {
      id: 'junior-t2-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Soma {
    static int somar(int a, double b) {
        return (int) (a + b);
    }

    static int somar(double a, int b) {
        return (int) (a + b);
    }

    public static void main(String[] args) {
        System.out.println(somar(1.5, 2));
        System.out.println(somar(1, 2));
    }
}`,
      resposta: 12,
      explicacao: 'Na linha 11, só `somar(double, int)` aceita os argumentos. Na 12, as duas versões aceitam dois `int`, cada uma alargando um deles, e nenhuma é mais específica: a chamada é ambígua.',
    },
    {
      id: 'junior-t2-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class Frete {
    static double calcular(Long distancia) {
        return distancia * 1.5;
    }

    public static void main(String[] args) {
        System.out.println(calcular(10));
    }
}`,
      opcoes: ['Não compila', 'Imprime `15.0`', 'Imprime `15`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: '`10` é `int`, que só se embrulha em `Integer`. Alargar para `long` e depois embrulhar em `Long` são duas conversões, e o Java não faz as duas. Com `10L`, compilaria.',
    },
    {
      id: 'junior-t2-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `public class T {
    static void m(Object o) { System.out.println("Object"); }
    static void m(String s) { System.out.println("String"); }
    static void m(Integer i) { System.out.println("Integer"); }

    public static void main(String[] args) {
        m(null);
    }
}`,
      opcoes: ['Não compila', 'Imprime `String`', 'Imprime `Object`', 'Imprime `Integer`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: '`null` cabe em todas. `String` e `Integer` são mais específicos que `Object`, mas nenhum é mais específico que o outro: a chamada é ambígua. Sem a versão `Integer`, venceria `String`.',
    },
    {
      id: 'junior-t2-e02-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static String tipo(Object o) { return "Object"; }
    static String tipo(String s) { return "String"; }

    public static void main(String[] args) {
        String s = "a";
        Object o = s;
        System.out.println(tipo(s) + " " + tipo(o) + " " + tipo((String) o));
    }
}`,
      resposta: 'String Object String',
      explicacao: 'A escolha usa o tipo declarado da expressão, na compilação. `o` aponta para uma `String`, mas é declarada `Object`. O cast muda o tipo da expressão e, com ele, a versão escolhida.',
    },
    {
      id: 'junior-t2-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na resolução de sobrecarga, qual é a ordem de preferência das conversões?',
      opcoes: [
        'Tipo exato ou alargamento, depois autoboxing, depois varargs',
        'Autoboxing, depois alargamento, depois varargs',
        'Varargs, depois autoboxing, depois alargamento',
        'Tipo exato, depois varargs, depois autoboxing',
      ],
      resposta: 0,
      explicacao: 'As fases preservam o comportamento de código antigo: autoboxing chegou no Java 5, junto com os varargs, e por isso eles só entram quando as regras originais não encontram nada.',
    },
    {
      id: 'junior-t2-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static void m(Character c) { System.out.print("Character "); }
    static void m(int i) { System.out.print("int "); }
    static void m(Object o) { System.out.print("Object "); }

    public static void main(String[] args) {
        char c = 'x';
        m(c);
        m(Character.valueOf('y'));
        m("z");
        System.out.println();
    }
}`,
      opcoes: [
        '`int Character Object`',
        '`Character Character Object`',
        '`int int Object`',
        '`Character Character String`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `char` alarga para `int` na primeira fase; embrulhar em `Character` ficaria para a segunda. O `Character` tem versão exata, e a `String` só cabe em `Object`.',
    },
    {
      id: 'junior-t2-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais diferenças, sozinhas, permitem que dois métodos com o mesmo nome coexistam? Escolha duas.',
      opcoes: [
        'O número de parâmetros',
        'O tipo de algum parâmetro',
        'Só o tipo de retorno',
        'Só os nomes dos parâmetros',
        'Só o modificador de acesso',
      ],
      respostas: [0, 1],
      explicacao: 'A assinatura é feita do nome e dos tipos dos parâmetros. As outras diferenças deixam os dois métodos com a mesma assinatura, e a classe não compila.',
    },
    {
      id: 'junior-t2-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static void m(short s) { System.out.print("short "); }
    static void m(int i) { System.out.print("int "); }

    public static void main(String[] args) {
        short s = 1;
        m(s);
        m(1);
        m((short) 1);
        m(s + s);
        System.out.println();
    }
}`,
      opcoes: [
        '`short int short int`',
        '`short short short short`',
        '`short int short short`',
        '`int int int int`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O literal `1` é `int`, e uma chamada de método nunca estreita um `int` para `short` sozinha. A soma de dois `short` é promovida a `int`, como você viu nos operadores.',
    },
    {
      id: 'junior-t2-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No bytecode, como a JVM sabe qual versão sobrecarregada chamar?',
      opcoes: [
        'A chamada carrega o descritor completo do método, escolhido pelo compilador',
        'A JVM repete a resolução de sobrecarga em cada chamada',
        'A JVM chama a primeira versão declarada na classe',
        'Cada versão recebe um nome diferente, como `m1` e `m2`',
      ],
      resposta: 0,
      explicacao: 'O compilador grava algo como `m:(J)V`, com os tipos dos parâmetros e do retorno. A JVM só procura esse método exato. Por isso uma sobrecarga nova numa biblioteca só afeta quem recompila.',
    },
  ],
};

export default episodio;
