import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t5-e04',
  minutos: 12,
  aula,
  armadilhas: [
    'A variável de padrão só existe onde o teste certamente deu verdadeiro.',
    'Ela vale no lado direito de `&&`, mas não no de `||`.',
    'Com `if (!(x instanceof T t)) return;`, a variável `t` existe depois do `if`.',
    'No `else` de um teste positivo, a variável de padrão não existe.',
    'A variável de padrão não é `final` por padrão e pode ser reatribuída.',
    'Ela não pode ter o nome de outra variável local já em escopo.',
    'No Java 17, o tipo do padrão precisa ser subtipo estrito do tipo da expressão; o Java 21 aceita o mesmo tipo.',
    '`obj instanceof List<String> l` não compila com `obj` do tipo `Object`: o cast não é seguro.',
  ],
  ia: {
    uso:
      'A IA ajuda a trocar pares de `instanceof` e cast pelo padrão de tipo e a reescrever `equals` em uma linha. Confira o escopo da variável, que é onde ela costuma errar.',
    pedido:
      'Modernize os testes de tipo deste código Java 21.\n<cole o código aqui>\n- Troque instanceof seguido de cast pelo padrão de tipo.\n- Para cada variável de padrão, diga em que linhas ela existe.\n- Aponte cadeias de else if em que um tipo mais geral é testado antes de um mais específico.',
    erros: [
      'Usa a variável de padrão depois de `||` ou no `else`.',
      'Testa `Number` antes de `Integer` numa cadeia de `else if`.',
      'Mantém o cast antigo logo depois do padrão, repetindo o tipo.',
    ],
    conferir: [
      'Compile: uso fora do escopo aparece como "cannot find symbol".',
      'Teste com `null`: o padrão dá `false` sem exceção.',
      'Passe um objeto de cada tipo da cadeia e confira o ramo escolhido.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Using Pattern Matching, Pattern Matching for instanceof',
      url: 'https://dev.java/learn/language/fp/pattern-matching/#pattern-matching-for-instanceof',
      tipo: 'documentacao',
      porque: 'Variáveis de padrão e o escopo delas, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Pattern Matching for the instanceof Operator',
      url: 'https://docs.oracle.com/en/java/javase/21/language/pattern-matching-instanceof.html',
      tipo: 'documentacao',
      porque: 'O guia oficial, com os casos de `&&`, `||` e negação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 394: Pattern Matching for instanceof',
      url: 'https://openjdk.org/jeps/394',
      tipo: 'documentacao',
      porque: 'A versão final do recurso, no Java 16, com a explicação do escopo por fluxo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 6.3.1: Scope for Pattern Variables Declared in Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.3.1',
      tipo: 'documentacao',
      porque: 'As regras exatas de onde uma variável de padrão está definida.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Pattern Matching for instanceof in Java',
      url: 'https://www.baeldung.com/java-pattern-matching-instanceof',
      tipo: 'artigo',
      porque: 'Do teste com cast à forma com padrão, com os casos de escopo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Pattern Matching for instanceof',
      url: 'https://www.youtube.com/watch?v=KYN9UfPpJ38',
      tipo: 'video',
      porque: 'O recurso explicado no código, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Pattern Matching for instanceof',
      url: 'https://www.youtube.com/watch?v=CMiCLBYIaUQ',
      tipo: 'video',
      porque: 'A motivação do recurso e o código que ele elimina, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: Pattern Matching Full Tutorial with Records, Instanceof and Switch, JEP Café #14',
      url: 'https://www.youtube.com/watch?v=aKaw9W789wU',
      tipo: 'video',
      porque: 'O canal oficial do Java percorre o pattern matching do `instanceof` aos records.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de escopo das variáveis de padrão, com os exemplos de `&&` e `||` que caem na prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção "Creating Decision-Making Statements", parte "Shortening Code with Pattern Matching"',
    },
  ],
  desafio: {
    titulo: 'Somador tolerante',
    enunciado:
      'Escreva `static double somar(Object[] valores)`, que soma o que der para somar: números de qualquer tipo, textos que representem números e arrays aninhados de `Object`, recursivamente. O resto é ignorado. Use `instanceof` com padrão em todos os testes. Rode com:\n\n```java\nObject[] dados = {10, 2.5, "7", "abc", new Object[] {1, "2", new Object[] {3L}}, null, true};\nSystem.out.println(somar(dados));\nSystem.out.println(somar(new Object[] {}));\n```\n\nSaída esperada:\n\n```text\n25.5\n0.0\n```',
    dicas: [
      '`Number` cobre `Integer`, `Double` e `Long`: `n.doubleValue()` converte qualquer um.',
      'Para textos, combine o padrão com uma condição: `o instanceof String s && !s.isBlank()`, e trate `NumberFormatException`.',
      'Um `Object[]` aninhado é somado com uma chamada recursiva; `null` e `true` não casam com nenhum padrão.',
    ],
    solucao: `public class Somador {
    static double somar(Object[] valores) {
        double total = 0;
        for (Object o : valores) {
            if (o instanceof Number n) {
                total += n.doubleValue();
            } else if (o instanceof String s && !s.isBlank()) {
                try {
                    total += Double.parseDouble(s);
                } catch (NumberFormatException e) {
                    // texto que não é número: ignora
                }
            } else if (o instanceof Object[] interno) {
                total += somar(interno);
            }
        }
        return total;
    }

    public static void main(String[] args) {
        Object[] dados = {10, 2.5, "7", "abc", new Object[] {1, "2", new Object[] {3L}}, null, true};
        System.out.println(somar(dados));
        System.out.println(somar(new Object[] {}));
    }
}`,
    saida: '25.5\n0.0',
    comentarios:
      '10 + 2,5 + 7 dão 19,5, e o array interno soma 1 + 2 + 3 = 6. O `null` não casa com nenhum padrão, porque `instanceof` é falso para `null`, e o `Boolean` não é um `Number`. O padrão também funciona com tipos de array, como `Object[] interno`. No próximo episódio, essa cadeia de `if` vira um único `switch`.',
  },
  bugs: [
    {
      id: 'junior-t5-e04-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: cannot find symbol`, apontando a variável `s`.',
      codigo: `public class Validador {
    static boolean textoCurto(Object o) {
        return o instanceof String s || s.length() < 5;
    }

    public static void main(String[] args) {
        System.out.println(textoCurto("oi") + " " + textoCurto(42));
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Validador {
    static boolean textoCurto(Object o) {
        return o instanceof String s && s.length() < 5;
    }

    public static void main(String[] args) {
        System.out.println(textoCurto("oi") + " " + textoCurto(42));
    }
}`,
      saidaCorrigida: 'true false',
      dica: 'No lado direito do `||`, o teste do `instanceof` deu certo ou falhou?',
      explicacao: 'O lado direito do `||` só é avaliado quando o lado esquerdo deu `false`, ou seja, quando `o` não é uma `String` e `s` não recebeu valor. Com `&&`, o lado direito roda só se o teste deu certo, e `s` existe ali.',
    },
    {
      id: 'junior-t5-e04-b02',
      dificuldade: 2,
      sintoma: 'O relatório deveria mostrar `inteiro: 42`, mas mostra `número: 42.0`.',
      codigo: `public class Tipos {
    static String descrever(Object o) {
        if (o instanceof String s) return "texto: " + s;
        else if (o instanceof Number n) return "número: " + n.doubleValue();
        else if (o instanceof Integer i) return "inteiro: " + i;
        return "outro";
    }

    public static void main(String[] args) {
        System.out.println(descrever(42));
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: 'número: 42.0' },
      correcao: `public class Tipos {
    static String descrever(Object o) {
        if (o instanceof String s) return "texto: " + s;
        else if (o instanceof Integer i) return "inteiro: " + i;
        else if (o instanceof Number n) return "número: " + n.doubleValue();
        return "outro";
    }

    public static void main(String[] args) {
        System.out.println(descrever(42));
    }
}`,
      saidaCorrigida: 'inteiro: 42',
      dica: 'Um `Integer` é um `Number`? Qual dos dois testes ele encontra primeiro?',
      explicacao: '`Integer` é subclasse de `Number`, então o teste mais geral captura o inteiro antes de o específico ser avaliado. Numa cadeia de `else if`, teste os tipos mais específicos primeiro. O `switch` com padrões do próximo episódio recusa essa ordem na compilação.',
    },
    {
      id: 'junior-t5-e04-b03',
      dificuldade: 3,
      sintoma: 'Ler a quantidade digitada " 42" lança `NumberFormatException: For input string: " 42"`.',
      codigo: `public class Formulario {
    static int quantidade(Object campo) {
        if (campo instanceof Integer i) return i;
        if (campo instanceof String s && !s.isBlank()) return Integer.parseInt(s);
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(quantidade(" 42") + quantidade(8));
    }
}`,
      linha: 4,
      efeito: { tipo: 'excecao', nome: 'NumberFormatException' },
      correcao: `public class Formulario {
    static int quantidade(Object campo) {
        if (campo instanceof Integer i) return i;
        if (campo instanceof String s && !s.isBlank()) return Integer.parseInt(s.strip());
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(quantidade(" 42") + quantidade(8));
    }
}`,
      saidaCorrigida: '50',
      dica: 'O padrão converteu o tipo, mas o texto continua o mesmo. O `parseInt` aceita espaços?',
      explicacao: 'O padrão de tipo só converte a referência: o conteúdo da `String` continua com o espaço, e `Integer.parseInt` não aceita espaços. Normalize o texto com `strip()` antes de converter.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t5-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que faz `if (obj instanceof String s)`?',
      opcoes: [
        'Testa se `obj` é uma `String` e, se for, declara `s` com o valor já convertido',
        'Converte `obj` para `String` e lança exceção se não der',
        'Declara `s` como `null` quando o teste falha',
        'Compara `obj` com a variável `s`',
      ],
      resposta: 0,
      explicacao: 'É o teste e o cast numa só operação. Se o teste falha, `s` nem existe naquele ponto do código.',
      dica: 'O padrão junta o teste e o cast.',
    },
    {
      id: 'junior-t5-e04-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `Object[] itens = {"oi", 7, 2.0};
String r = "";
for (Object o : itens) {
    if (o instanceof String s) r += s.length();
    else if (o instanceof Integer i) r += i + 1;
    else r += "?";
}
System.out.println(r);`,
      resposta: '28?',
      explicacao: '"oi" tem 2 letras; 7 + 1 é 8, somado antes de virar texto porque `i + 1` está sozinho no lado direito do `+=`. O `Double` não casa com nenhum padrão.',
      dica: '"oi" tem 2 letras, 7 + 1 é 8, e o `double` cai no `else`.',
    },
    {
      id: 'junior-t5-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `Object o = "a";
if (o instanceof String s || s.isEmpty()) {
    System.out.println("?");
}`,
      opcoes: [
        'Não compila: `s` não existe no lado direito do `||`',
        'Compila e imprime `?`',
        'Compila, mas lança `NullPointerException`',
        'Compila e não imprime nada',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'O lado direito do `||` só roda quando o esquerdo deu falso, ou seja, quando `o` não é uma `String`. Nesse caso, `s` não teria valor.',
      dica: 'No lado direito do `||`, o teste deu certo ou falhou?',
    },
    {
      id: 'junior-t5-e04-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`Object o = "texto"; if (o instanceof String s && s.length() > 2) { }`',
        '`Object o = "texto"; if (!(o instanceof String s)) return; System.out.println(s);`',
        '`Object o = "texto"; if (o instanceof String s) { s = s.trim(); }`',
        '`Object o = "texto"; if (o instanceof String s) { } System.out.println(s);`',
        '`Object o = "texto"; if (o instanceof String s) { } else { System.out.println(s); }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'A variável vale depois de `&&`, depois de um `if` negado que sai do método, e pode ser reatribuída. Fora de um `if` comum, ou no `else` dele, o teste pode ter falhado, e ela não existe.',
      dica: '`&&`, a forma negada com `return` e a reatribuição são permitidos.',
    },
    {
      id: 'junior-t5-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 17, cobrado pela prova 1Z0-829, qual é o resultado?',
      codigo: `String s = "abc";
if (s instanceof String t) {
    System.out.println(t.length());
}`,
      opcoes: ['Não compila', 'Imprime `3`', 'Não imprime nada', 'Lança exceção'],
      resposta: 0,
      provas: ['829'],
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'No Java 17, o tipo do padrão precisa ser mais específico que o da expressão: um teste de `String` contra `String` nunca falharia. A restrição caiu no Java 21.',
      dica: 'No Java 17, o tipo do padrão precisa ser mais específico que o da expressão.',
    },
    {
      id: 'junior-t5-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 21 ou 25, cobrados pelas provas 1Z0-830 e 1Z0-831, qual é o resultado?',
      codigo: `String s = "abc";
if (s instanceof String t) {
    System.out.println(t.length());
}`,
      opcoes: ['`3`', 'Não compila', 'Não imprime nada', 'Lança exceção'],
      resposta: 0,
      provas: ['830', '831'],
      verificar: { tipo: 'saida' },
      explicacao: 'Desde o Java 21, padrões incondicionais são aceitos no `instanceof`. O teste só daria falso para `null`.',
      dica: 'O Java 21 removeu a restrição do tipo idêntico.',
    },
    {
      id: 'junior-t5-e04-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o padrão para declarar a variável `n` já convertida. O programa deve imprimir `10`.',
      codigo: `public class Padrao {
    public static void main(String[] args) {
        Object o = 5;
        if (o instanceof Integer ___) {
            System.out.println(n * 2);
        }
    }
}`,
      respostas: ['n'],
      saida: '10',
      explicacao: 'O nome depois do tipo declara a variável de padrão. Dentro do `if`, `n` é um `Integer`, e a conta funciona sem cast.',
      dica: 'Depois do tipo vem o nome da variável usada no corpo.',
    },
    {
      id: 'junior-t5-e04-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Escopo {
    public static void main(String[] args) {
        Object o = 42;
        if (o instanceof Integer i && i > 10) {
            System.out.println("grande");
        } else {
            System.out.println(i);
        }
    }
}`,
      resposta: 7,
      explicacao: 'O `else` roda quando a condição inteira deu falso, o que inclui o caso em que `o` não é um `Integer`. Ali, `i` não existe.',
      dica: 'No `else`, o teste falhou. A variável existe ali?',
    },
    {
      id: 'junior-t5-e04-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `Object x = 42;
if (!(x instanceof Integer i)) {
    System.out.println("não é inteiro");
    return;
}
i = i * 2;
System.out.println(i);`,
      opcoes: ['`84`', '`42`', 'Não compila: `i` não existe fora do `if`', 'Não compila: variáveis de padrão são `final`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como o `if` negado sai do método quando o teste falha, depois dele o teste certamente deu verdadeiro e `i` existe. Variáveis de padrão não são `final` e podem ser reatribuídas.',
      dica: 'Se o teste falha, o método sai; depois do `if`, `i` existe e não é `final`.',
    },
    {
      id: 'junior-t5-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `Object o = null;
if (o instanceof String s) {
    System.out.println("texto " + s);
} else {
    System.out.println("não é texto");
}`,
      opcoes: ['`não é texto`', '`texto null`', 'Lança `NullPointerException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`instanceof` é sempre falso para `null`, com ou sem padrão, e nunca lança exceção.',
      dica: '`null instanceof` qualquer coisa é `false`.',
    },
    {
      id: 'junior-t5-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `Object o = "a";
String s = "b";
if (o instanceof String s) {
    System.out.println(s);
}`,
      opcoes: [
        'Não compila: já existe uma variável `s` no escopo',
        'Compila e imprime `a`',
        'Compila e imprime `b`',
        'Compila, e a variável de padrão esconde a outra',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'A variável de padrão é uma variável local como outra qualquer: não pode repetir o nome de outra local em escopo.',
      dica: 'Duas variáveis locais com o mesmo nome no mesmo escopo?',
    },
    {
      id: 'junior-t5-e04-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `final class Moeda {
    final String codigo;
    Moeda(String codigo) { this.codigo = codigo; }

    @Override
    public boolean equals(Object o) {
        return o instanceof Moeda m && codigo.equals(m.codigo);
    }

    @Override
    public int hashCode() { return codigo.hashCode(); }
}

Moeda brl = new Moeda("BRL");
System.out.println(brl.equals(new Moeda("BRL")) + " " + brl.equals("BRL") + " " + brl.equals(null));`,
      resposta: 'true false false',
      explicacao: 'O padrão com `&&` resolve o `equals` numa linha: uma `String` não é `Moeda`, e `null instanceof` é falso, sem exceção.',
      dica: 'O padrão no `equals` trata outro tipo e `null` com `false`.',
    },
    {
      id: 'junior-t5-e04-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais pontos a variável `t` de `x instanceof T t` pode ser usada? Escolha duas.',
      opcoes: [
        'No corpo do `if (x instanceof T t)`',
        'No lado direito de `x instanceof T t && ...`',
        'No lado direito de `x instanceof T t || ...`',
        'No `else` de `if (x instanceof T t)`',
        'Depois de um `if (x instanceof T t) { }` comum',
      ],
      respostas: [0, 1],
      explicacao: 'Só onde o teste certamente deu verdadeiro. Nos outros três pontos, o teste pode ter falhado.',
      dica: 'Onde o teste certamente deu verdadeiro?',
    },
    {
      id: 'junior-t5-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `Object o = new ArrayList<String>();
if (o instanceof List<String> lista) {
    System.out.println(lista.size());
}`,
      opcoes: [
        'Não compila: a JVM não tem como conferir o `<String>` a partir de um `Object`',
        'Compila e imprime `0`',
        'Compila, com um aviso, e imprime `0`',
        'Compila, mas lança `ClassCastException`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'Os tipos genéricos são apagados na execução: o objeto é só um `ArrayList`. Um padrão como `List<?> lista` compilaria, porque não promete o tipo dos elementos.',
      dica: 'Os genéricos são apagados na execução. A JVM consegue conferir o `<String>`?',
    },
    {
      id: 'junior-t5-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Que bytecode o `javac` gera para `if (o instanceof String s)`?',
      opcoes: [
        'Um `instanceof`, um `checkcast` e o armazenamento numa variável local, como no código escrito à mão',
        'Uma instrução nova da JVM, criada para o pattern matching',
        'Uma chamada a um método da biblioteca que faz a conversão',
        'Um bloco `try` que captura `ClassCastException`',
      ],
      resposta: 0,
      explicacao: 'O recurso é todo do compilador: a análise de escopo garante que a variável só seja usada onde o teste deu certo. Na execução, o custo é o mesmo do código antigo.',
      dica: 'Nenhuma instrução nova: é o mesmo bytecode do código à mão.',
    },
  ],
};

export default episodio;
