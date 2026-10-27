import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t2-e03',
  minutos: 11,
  aula,
  armadilhas: [
    'O varargs precisa ser o último parâmetro, e só pode haver um por método.',
    'Dentro do método, `int... v` é um `int[]` comum.',
    'Chamado sem argumentos, o método recebe um array vazio, não `null`.',
    '`m(int[])` e `m(int...)` têm a mesma assinatura e não podem coexistir.',
    'Um método com parâmetro `int[]` não aceita valores soltos, como `m(1, 2)`.',
    'Passar um array a um varargs entrega o próprio array: alterações nele são vistas por quem chamou.',
    'Varargs é a última fase da sobrecarga: `m(5)` prefere `m(int)` a `m(int...)`.',
    '`m(int...)` e `m(Integer...)` tornam `m(1)` ambígua.',
  ],
  ia: {
    uso:
      'A IA ajuda a desenhar APIs com varargs e a decidir quando eles valem a pena. O ponto fraco dela são os casos de borda: chamada sem argumentos, `null` e arrays passados para `Object...`. Peça sempre o `length` que o método recebe em cada chamada.',
    pedido:
      'Para cada chamada deste método Java 21 com varargs, diga o que o parâmetro recebe.\n<cole o método e as chamadas>\n- Diga o length do array e cada elemento, ou se ele é null.\n- Aponte chamadas que lançariam exceção dentro do método, como acessar a posição 0 de um array vazio.\n- Se o método exige pelo menos um valor, proponha a assinatura com um parâmetro fixo antes do varargs.',
    erros: [
      'Diz que a chamada sem argumentos passa `null`.',
      'Não percebe que um `String[]` passado para `Object...` vira vários argumentos.',
      'Acessa `valores[0]` sem tratar o array vazio.',
    ],
    conferir: [
      'Chame o método sem argumentos, com um e com vários.',
      'Imprima `length` do parâmetro em cada caso.',
      'Teste com `null` e com um array passado para `Object...`.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Calling Methods and Constructors, Arbitrary Number of Arguments',
      url: 'https://dev.java/learn/language/oop/classes-objects/calling-methods-constructors/#arbitrary-number-of-arguments',
      tipo: 'documentacao',
      porque: 'Como declarar e chamar varargs, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Varargs (guia da linguagem)',
      url: 'https://docs.oracle.com/javase/8/docs/technotes/guides/language/varargs.html',
      tipo: 'documentacao',
      porque: 'O texto que apresentou o recurso no Java 5, com o exemplo do `MessageFormat` e o conselho de usá-lo com moderação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.1: Formal Parameters',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.1',
      tipo: 'documentacao',
      porque: 'A regra do parâmetro de aridade variável: último e único.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.12.2.4: Phase 3, Variable Arity Invocation',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.12.2.4',
      tipo: 'documentacao',
      porque: 'Por que os varargs só entram na escolha depois de todas as outras conversões.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de List: Unmodifiable Lists',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#unmodifiable',
      tipo: 'documentacao',
      porque: 'Repare nas onze versões fixas de `List.of`, criadas para evitar o array do varargs.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Varargs in Java',
      url: 'https://www.baeldung.com/java-varargs',
      tipo: 'artigo',
      porque: 'Sintaxe, regras e a poluição do heap com genéricos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Métodos pt 09, Varargs',
      url: 'https://www.youtube.com/watch?v=T0E4Ewwz1IY',
      tipo: 'video',
      porque: 'Varargs na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Bro Code: Learn VARARGS in 6 minutes',
      url: 'https://www.youtube.com/watch?v=2knxgAFqwKk',
      tipo: 'video',
      porque: 'Uma revisão rápida, com o array por trás dos argumentos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'O padrão `m(int primeiro, int... resto)` para exigir ao menos um argumento, e o custo de alocar o array.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Methods": Item 53, "Use varargs judiciously"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de declaração e chamada de varargs, com as variações que caem na prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Methods": seção "Working with Varargs"',
    },
  ],
  desafio: {
    titulo: 'Utilitários com varargs',
    enunciado:
      'Escreva dois métodos: `juntar(String separador, String... partes)`, que une as partes com o separador, e `maximo(int primeiro, int... resto)`, que devolve o maior valor e, pela própria assinatura, exige pelo menos um argumento. Rode com:\n\n```java\nSystem.out.println(juntar(", ", "arroz", "feijão", "farofa"));\nSystem.out.println("[" + juntar("-") + "]");\nSystem.out.println(juntar(" / ", new String[] {"a", "b"}));\nSystem.out.println(maximo(3) + " " + maximo(3, 9, 4) + " " + maximo(-5, -2));\n```\n\nSaída esperada:\n\n```text\narroz, feijão, farofa\n[]\na / b\n3 9 -2\n```',
    dicas: [
      'Em `juntar`, coloque o separador antes de cada parte, menos da primeira.',
      'Com `maximo(int primeiro, int... resto)`, a chamada `maximo()` nem compila: o erro aparece cedo, não em tempo de execução.',
      'Comece o máximo em `primeiro`: ele sempre existe.',
    ],
    solucao: `public class Utilitarios {
    static String juntar(String separador, String... partes) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < partes.length; i++) {
            if (i > 0) sb.append(separador);
            sb.append(partes[i]);
        }
        return sb.toString();
    }

    static int maximo(int primeiro, int... resto) {
        int max = primeiro;
        for (int v : resto) {
            if (v > max) max = v;
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println(juntar(", ", "arroz", "feijão", "farofa"));
        System.out.println("[" + juntar("-") + "]");
        System.out.println(juntar(" / ", new String[] {"a", "b"}));
        System.out.println(maximo(3) + " " + maximo(3, 9, 4) + " " + maximo(-5, -2));
    }
}`,
    saida: 'arroz, feijão, farofa\n[]\na / b\n3 9 -2',
    comentarios:
      'Separar o primeiro valor do resto transforma uma regra de negócio ("ao menos um") numa regra de compilação, sem `if` e sem exceção. A própria biblioteca faz parecido: `String.join` é quase o seu `juntar`, e `EnumSet.of(E primeiro, E... resto)` usa o mesmo truque do `maximo`.',
  },
  bugs: [
    {
      id: 'junior-t2-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa: `method media in class Media cannot be applied to given types`.',
      codigo: `public class Media {
    static double media(double[] valores) {
        double soma = 0;
        for (double v : valores) soma += v;
        return soma / valores.length;
    }

    public static void main(String[] args) {
        System.out.println(media(7.0, 8.0, 9.0));
    }
}`,
      linha: 9,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Media {
    static double media(double[] valores) {
        double soma = 0;
        for (double v : valores) soma += v;
        return soma / valores.length;
    }

    public static void main(String[] args) {
        System.out.println(media(new double[] {7.0, 8.0, 9.0}));
    }
}`,
      saidaCorrigida: '8.0',
      dica: 'O parâmetro é `double[]` ou `double...`? Qual dos dois aceita valores soltos?',
      explicacao: 'Só um parâmetro varargs aceita valores separados por vírgula. Com `double[]`, quem chama precisa passar um array pronto. A outra correção possível seria trocar a declaração para `double... valores`.',
    },
    {
      id: 'junior-t2-e03-b02',
      dificuldade: 2,
      sintoma: 'O maior de `3, 9, 4` sai certo, mas a segunda chamada para com `ArrayIndexOutOfBoundsException`.',
      codigo: `public class Maximo {
    static int maior(int... valores) {
        int max = valores[0];
        for (int v : valores) if (v > max) max = v;
        return max;
    }

    public static void main(String[] args) {
        System.out.println(maior(3, 9, 4));
        System.out.println(maior());
    }
}`,
      linha: 3,
      efeito: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      correcao: `public class Maximo {
    static int maior(int primeiro, int... resto) {
        int max = primeiro;
        for (int v : resto) if (v > max) max = v;
        return max;
    }

    public static void main(String[] args) {
        System.out.println(maior(3, 9, 4));
        System.out.println(maior(5));
    }
}`,
      saidaCorrigida: '9\n5',
      dica: 'O que o método recebe quando é chamado sem argumentos? Faz sentido pedir o maior de nenhum número?',
      explicacao: 'Sem argumentos, `valores` é um array vazio, e `valores[0]` não existe. Como o maior só faz sentido com pelo menos um número, a assinatura pode exigir isso: um parâmetro fixo antes do varargs. A chamada vazia passa a nem compilar.',
    },
    {
      id: 'junior-t2-e03-b03',
      dificuldade: 3,
      sintoma: 'O lote de etiquetas deveria contar como um dado só, mas o registro mostra `lote: 3 dado(s)`.',
      codigo: `public class Auditoria {
    static void registrar(String acao, Object... dados) {
        System.out.println(acao + ": " + dados.length + " dado(s)");
    }

    public static void main(String[] args) {
        String[] tags = {"urgente", "financeiro", "revisar"};
        registrar("lote", tags);
    }
}`,
      linha: 8,
      efeito: { tipo: 'saida', saida: 'lote: 3 dado(s)' },
      correcao: `public class Auditoria {
    static void registrar(String acao, Object... dados) {
        System.out.println(acao + ": " + dados.length + " dado(s)");
    }

    public static void main(String[] args) {
        String[] tags = {"urgente", "financeiro", "revisar"};
        registrar("lote", (Object) tags);
    }
}`,
      saidaCorrigida: 'lote: 1 dado(s)',
      dica: 'Um `String[]` é um `Object[]`. Quando ele chega sozinho num `Object...`, vira um argumento ou o array inteiro de argumentos?',
      explicacao: 'Um `String[]` pode ser usado como `Object[]`, então o compilador o passa como o próprio array de varargs, e cada etiqueta vira um dado. Com o cast para `Object`, o array inteiro vira um único elemento.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t2-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Dentro do método `static int somar(int... valores)`, qual é o tipo de `valores`?',
      opcoes: ['`int[]`', '`int`', '`List<Integer>`', '`Integer...`, um tipo especial'],
      resposta: 0,
      explicacao: 'Varargs é um array: tem `length`, índices e pode ser percorrido com for-each.',
      dica: 'Por dentro, o varargs é de que tipo?',
    },
    {
      id: 'junior-t2-e03-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static int contar(String... s) {
        return s.length;
    }

    public static void main(String[] args) {
        System.out.println(contar() + contar("a") + contar("a", "b", "c"));
    }
}`,
      resposta: '4',
      explicacao: 'Os tamanhos são 0, 1 e 3. Como são números, a soma acontece antes de imprimir.',
      dica: 'Some os tamanhos: zero, um e três.',
    },
    {
      id: 'junior-t2-e03-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais classes compilam? Escolha três.',
      opcoes: [
        '`class A { void m(int... x) { } }`',
        '`class B { void m(String s, int... x) { } }`',
        '`class C { void m(int... x, String s) { } }`',
        '`class D { void m(int... x, int... y) { } }`',
        '`class E { static void main(String... args) { } }`',
      ],
      respostas: [0, 1, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O varargs pode vir depois de parâmetros comuns, mas precisa ser o último e o único. O `main` aceita `String...` no lugar de `String[]`.',
      dica: 'O varargs precisa ser o último, e só pode haver um.',
    },
    {
      id: 'junior-t2-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class T {
    static int primeiro(int[] v) {
        return v[0];
    }

    public static void main(String[] args) {
        System.out.println(primeiro(new int[] {4, 5}));
        System.out.println(primeiro(4, 5));
    }
}`,
      opcoes: ['Não compila', 'Imprime `4` duas vezes', 'Imprime `4` e lança exceção', 'Imprime `4` e `5`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Só um varargs aceita valores soltos. Com `int[] v`, quem chama precisa montar o array. Trocando para `int... v`, as duas chamadas funcionariam.',
      dica: 'Um parâmetro `int[]` aceita valores soltos?',
    },
    {
      id: 'junior-t2-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static String m(int x) { return "fixo"; }
    static String m(int... x) { return "varargs"; }

    public static void main(String[] args) {
        System.out.println(m(5) + " " + m() + " " + m(5, 6));
    }
}`,
      opcoes: ['`fixo varargs varargs`', '`varargs varargs varargs`', 'Não compila: a chamada `m(5)` é ambígua', '`fixo fixo varargs`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Varargs é a última fase da resolução: com um `int`, a versão fixa serve sem ele. Zero ou dois argumentos só cabem no varargs.',
      dica: 'Varargs é a última fase da escolha: `m(5)` acha uma versão antes.',
    },
    {
      id: 'junior-t2-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a declaração para que o método aceite quantos números quiser. O programa deve imprimir `10`.',
      codigo: `public class Soma {
    static int somar(int___ valores) {
        int total = 0;
        for (int v : valores) total += v;
        return total;
    }

    public static void main(String[] args) {
        System.out.println(somar(1, 2, 3, 4));
    }
}`,
      respostas: ['...'],
      saida: '10',
      explicacao: 'As reticências depois do tipo fazem do parâmetro um varargs. Com `int[]`, a chamada com quatro valores soltos não compilaria.',
      dica: 'Qual símbolo transforma o parâmetro em varargs?',
    },
    {
      id: 'junior-t2-e03-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Relatorio {
    static String titulo(String texto) {
        return texto.toUpperCase();
    }

    static String linha(String... campos, char separador) {
        return String.join(String.valueOf(separador), campos);
    }
}`,
      resposta: 6,
      explicacao: 'O varargs precisa ser o último parâmetro. Bastaria trocar a ordem: `linha(char separador, String... campos)`.',
      dica: 'Pode haver parâmetro depois do varargs?',
    },
    {
      id: 'junior-t2-e03-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static int n(Object... o) {
        return o == null ? -1 : o.length;
    }

    public static void main(String[] args) {
        System.out.println(n() + " " + n((Object) null) + " " + n((Object[]) null) + " " + n(1, null));
    }
}`,
      opcoes: ['`0 1 -1 2`', '`0 -1 -1 2`', '`-1 1 -1 2`', '`0 1 1 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem argumentos, o array é vazio. O cast para `Object` faz o `null` virar um elemento; o cast para `Object[]` faz dele o próprio array. Com dois argumentos, o `null` é só o segundo elemento.',
      dica: 'O cast decide se o `null` é um elemento ou o array inteiro.',
    },
    {
      id: 'junior-t2-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Arrays;

public class T {
    static void dobrar(int... v) {
        for (int i = 0; i < v.length; i++) v[i] *= 2;
    }

    public static void main(String[] args) {
        int[] dados = {1, 2, 3};
        dobrar(dados);
        dobrar(dados[0], dados[1]);
        System.out.println(Arrays.toString(dados));
    }
}`,
      opcoes: ['`[2, 4, 6]`', '`[4, 8, 6]`', '`[1, 2, 3]`', '`[4, 8, 12]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Na primeira chamada, o método recebe o próprio array e o altera. Na segunda, o compilador monta um array novo com cópias dos valores, e dobrá-lo não afeta `dados`.',
      dica: 'O primeiro `dobrar` recebe o próprio array; o segundo, um array novo com cópias.',
    },
    {
      id: 'junior-t2-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `public class T {
    static void m(int... v) { System.out.println("int"); }
    static void m(Integer... v) { System.out.println("Integer"); }

    public static void main(String[] args) {
        m(1);
    }
}`,
      opcoes: ['Não compila', 'Imprime `int`', 'Imprime `Integer`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'As duas versões servem na fase de varargs, e nenhuma é mais específica: `int` e `Integer` não são subtipos um do outro. A chamada é ambígua.',
      dica: '`int...` e `Integer...`: algum é mais específico que o outro?',
    },
    {
      id: 'junior-t2-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `static int total(int... v)` recebe em `v` na chamada `total()`?',
      opcoes: ['Um array vazio', '`null`', 'Um array com um zero', 'A chamada não compila'],
      resposta: 0,
      explicacao: 'O compilador monta `new int[0]`. Por isso `v.length` funciona e vale 0, sem risco de `NullPointerException`.',
      dica: 'Sem argumentos, o compilador monta que array?',
    },
    {
      id: 'junior-t2-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Mais {
    static void m(int... v) { System.out.print("int... "); }
    static void m(long... v) { System.out.print("long... "); }
    static void m(Object o) { System.out.print("Object "); }

    public static void main(String[] args) {
        m(1, 2);
        m();
        m(1);
        System.out.println();
    }
}`,
      opcoes: [
        '`int... int... Object`',
        '`int... int... int...`',
        'Não compila: a chamada `m()` é ambígua',
        '`int... long... Object`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Entre `int...` e `long...`, `int...` é mais específico, inclusive sem argumentos. Com um só `int`, a versão `Object` serve na segunda fase, por autoboxing, antes de os varargs serem considerados.',
      dica: '`m(1)` acha `m(Object)` por boxing, antes da fase dos varargs; entre `int...` e `long...`, vale o mais específico.',
    },
    {
      id: 'junior-t2-e03-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    static String montar(String sep, int... nums) {
        String r = "";
        for (int i = 0; i < nums.length; i++) {
            r += (i == 0 ? "" : sep) + nums[i];
        }
        return "<" + r + ">";
    }

    public static void main(String[] args) {
        System.out.println(montar("-", 1, 2, 3) + montar("+"));
    }
}`,
      resposta: '<1-2-3><>',
      explicacao: 'O primeiro argumento vai para o parâmetro fixo; o resto, para o varargs. Na segunda chamada, o varargs é vazio e o laço não roda.',
      dica: 'O separador entra só antes do segundo número em diante; sem números, sobram os sinais.',
    },
    {
      id: 'junior-t2-e03-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Para `static void m(String... s)`, quais chamadas compilam? Escolha três.',
      opcoes: [
        '`m();`',
        '`m("a", "b");`',
        '`m(new String[] {"x"});`',
        '`m(1);`',
        '`m(new Object[] {"x"});`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Zero ou mais `String`, ou um `String[]` pronto. Um `int` não é `String`, e um `Object[]` não é um `String[]`, mesmo que só contenha strings.',
      dica: 'O varargs aceita nada, valores soltos ou um array do mesmo tipo.',
    },
    {
      id: 'junior-t2-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que o compilador gera na chamada `media(7, 8, 10)`, sendo `media(int... notas)`?',
      opcoes: [
        'O código de `new int[] {7, 8, 10}` e uma chamada comum com esse array',
        'Três chamadas, uma para cada valor',
        'Uma `List<Integer>` com os valores',
        'Nada especial: a JVM monta o array na execução, ao ver a flag do método',
      ],
      resposta: 0,
      explicacao: 'Varargs é açúcar sintático resolvido na compilação. O método tem um parâmetro array comum e uma flag, `ACC_VARARGS`, que só o compilador usa. Cada chamada aloca um array novo.',
      dica: 'Varargs é escrita abreviada: o array é montado na chamada.',
    },
  ],
};

export default episodio;
