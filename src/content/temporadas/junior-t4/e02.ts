import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t4-e02',
  minutos: 15,
  aula,
  armadilhas: [
    'Interface funcional tem exatamente um método abstrato; `default`, `static` e `private` não contam.',
    'Métodos abstratos que repetem métodos públicos de `Object`, como `equals`, também não contam.',
    '`@FunctionalInterface` numa interface com dois métodos abstratos não compila.',
    'Lambda com chaves exige `return` e ponto e vírgula; sem chaves, não aceita `return`.',
    'Uma lambda só pode ser atribuída a uma interface funcional: `Object o = s -> s;` não compila.',
    'Lambdas só capturam variáveis locais efetivamente final.',
    'Os métodos são `get`, `accept`, `test` e `apply`; nas versões primitivas, `applyAsInt` e afins.',
    '`f.andThen(g)` aplica `f` primeiro; `f.compose(g)` aplica `g` primeiro.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Using Lambdas Expressions in Your Application',
      url: 'https://dev.java/learn/language/fp/lambdas/functional-interfaces/',
      tipo: 'documentacao',
      porque: 'As interfaces funcionais do JDK, organizadas por categoria, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 9.8: Functional Interfaces',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.8',
      tipo: 'documentacao',
      porque: 'A definição exata, com os exemplos de métodos de `Object` que não contam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc do pacote java.util.function',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html',
      tipo: 'documentacao',
      porque: 'Todas as interfaces prontas, com os métodos abstratos e os `default` de combinação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.FunctionalInterface',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/FunctionalInterface.html',
      tipo: 'documentacao',
      porque: 'O que a anotação confere e por que ela é opcional.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Brian Goetz: State of the Lambda',
      url: 'https://cr.openjdk.org/~briangoetz/lambda/lambda-state-final.html',
      tipo: 'artigo',
      porque: 'O arquiteto da linguagem explica por que as lambdas foram desenhadas sobre interfaces funcionais.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Functional Interfaces in Java',
      url: 'https://www.baeldung.com/java-8-functional-interfaces',
      tipo: 'artigo',
      porque: 'Cada interface de `java.util.function` com um exemplo de uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'eXcript: Java 8, Aula 5, Interfaces Funcionais',
      url: 'https://www.youtube.com/watch?v=e0RrdNX1PcI',
      tipo: 'video',
      porque: 'O que são interfaces funcionais e como as lambdas se encaixam nelas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'RinaldoDev: Aprenda streams mais fácil conhecendo as interfaces funcionais',
      url: 'https://www.youtube.com/watch?v=Ht0eto2mEpc',
      tipo: 'video',
      porque: '`Supplier`, `Consumer`, `Predicate` e `Function` explicados um a um, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Lambda Expressions in Java, Full Simple Tutorial',
      url: 'https://www.youtube.com/watch?v=tj5sLSFjVj4',
      tipo: 'video',
      porque: 'Da classe anônima à lambda, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas das interfaces funcionais e dos métodos de combinação, cobradas literalmente na prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Lambdas and Functional Interfaces": seções "Coding Functional Interfaces" e "Working with Built-in Functional Interfaces"',
    },
  ],
  desafio: {
    titulo: 'Senhas fortes',
    enunciado:
      'Monte um validador de senhas só com interfaces funcionais. Crie um `Predicate<String>` para cada regra (pelo menos 8 caracteres, algum dígito, alguma maiúscula, nenhum espaço) e combine-os com `and` num único `forte`. Crie também uma `Function<String, String>` que mascara a senha, mantendo só o primeiro caractere. Para as senhas `Java2026`, `javaflix`, `Senha 123` e `Ab1`, a saída deve ser:\n\n```text\nJ******* -> forte\nj******* -> fraca\nS******** -> fraca\nA** -> fraca\n```',
    dicas: [
      'Para "algum dígito", percorra `s.toCharArray()` dentro de uma lambda com chaves e use `Character.isDigit`.',
      '`tamanho.and(temDigito).and(temMaiuscula).and(semEspaco)` combina as quatro regras.',
      'A máscara é o primeiro caractere seguido de `"*".repeat(s.length() - 1)`.',
    ],
    solucao: `import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

public class Senhas {
    public static void main(String[] args) {
        Predicate<String> tamanho = s -> s.length() >= 8;
        Predicate<String> temDigito = s -> {
            for (char c : s.toCharArray()) {
                if (Character.isDigit(c)) return true;
            }
            return false;
        };
        Predicate<String> temMaiuscula = s -> {
            for (char c : s.toCharArray()) {
                if (Character.isUpperCase(c)) return true;
            }
            return false;
        };
        Predicate<String> semEspaco = s -> !s.contains(" ");
        Predicate<String> forte = tamanho.and(temDigito).and(temMaiuscula).and(semEspaco);
        Function<String, String> mascarar = s -> s.charAt(0) + "*".repeat(s.length() - 1);

        for (String senha : List.of("Java2026", "javaflix", "Senha 123", "Ab1")) {
            System.out.println(mascarar.apply(senha) + " -> " + (forte.test(senha) ? "forte" : "fraca"));
        }
    }
}`,
    saida: 'J******* -> forte\nj******* -> fraca\nS******** -> fraca\nA** -> fraca',
    comentarios:
      'Cada regra é um objeto independente, testável sozinho e reaproveitável em outro validador. O `and` cria um predicado novo a partir dos outros, sem `if` aninhado, e para no primeiro falso, como o `&&`. Trocar a política de senhas vira trocar a combinação, não reescrever a lógica.',
  },
  exercicios: [
    {
      id: 'junior-t4-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que define uma interface funcional?',
      opcoes: [
        'Ter exatamente um método abstrato',
        'Ter a anotação `@FunctionalInterface`',
        'Ter só métodos `default`',
        'Estar no pacote `java.util.function`',
      ],
      resposta: 0,
      explicacao: 'A anotação é opcional: ela só pede ao compilador que confira a regra. Qualquer interface com um único método abstrato, em qualquer pacote, é funcional.',
    },
    {
      id: 'junior-t4-e02-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `interface Calculo {
    int fazer(int x);
}

Calculo dobro = x -> x * 2;
Calculo quadrado = x -> x * x;
System.out.println(dobro.fazer(5) + quadrado.fazer(5) + " " + quadrado.fazer(dobro.fazer(3)));`,
      resposta: '35 36',
      explicacao: 'As duas primeiras chamadas dão 10 e 25, somados antes do texto: 35. Depois, o quadrado do dobro de 3: 36.',
    },
    {
      id: 'junior-t4-e02-q03',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`@FunctionalInterface interface A { void f(); }`',
        '`@FunctionalInterface interface B { void f(); default void g() { } }`',
        '`@FunctionalInterface interface C { void f(); boolean equals(Object o); }`',
        '`@FunctionalInterface interface D { void f(); void g(); }`',
        '`@FunctionalInterface interface E { default void g() { } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Métodos `default` e métodos abstratos de `Object` não contam. `D` tem dois métodos abstratos, e `E` nenhum: os dois falham na conferência da anotação.',
    },
    {
      id: 'junior-t4-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `Function<Integer, Integer> dobro = x -> { x * 2; };
System.out.println(dobro.apply(4));`,
      opcoes: ['Não compila', 'Imprime `8`', 'Imprime `null`', 'Imprime `4`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 1 },
      explicacao: 'Com chaves, o corpo é um bloco de comandos, e `x * 2;` não é um comando válido. O certo seria `x -> x * 2` ou `x -> { return x * 2; }`.',
    },
    {
      id: 'junior-t4-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `Predicate<Integer> par = n -> n % 2 == 0;
Predicate<Integer> grande = n -> n > 10;
System.out.println(par.and(grande).test(12) + " " + par.or(grande).test(7) + " " + par.negate().test(7));`,
      opcoes: ['`true false true`', '`true true true`', '`false false true`', '`true false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '12 é par e maior que 10. 7 não é par nem maior que 10. E a negação de "par" para 7 é verdadeira.',
    },
    {
      id: 'junior-t4-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método do `Supplier`. O programa deve imprimir `pronto`.',
      codigo: `import java.util.function.Supplier;

public class Fornecedor {
    public static void main(String[] args) {
        Supplier<String> mensagem = () -> "pronto";
        System.out.println(mensagem.___());
    }
}`,
      respostas: ['get'],
      saida: 'pronto',
      explicacao: '`Supplier` não recebe nada e devolve um valor, pelo método `get()`. A lambda sem parâmetros é escrita com parênteses vazios.',
    },
    {
      id: 'junior-t4-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.function.Function;
import java.util.function.Predicate;

public class Lambdas {
    public static void main(String[] args) {
        Predicate<String> vazio = s -> s.isEmpty();
        Function<String, Integer> tamanho = s -> s.length();
        Object qualquer = s -> s.length();
        System.out.println(vazio.test("") + " " + tamanho.apply("abc"));
    }
}`,
      resposta: 8,
      explicacao: 'Uma lambda precisa de uma interface funcional como alvo, para saber o tipo do parâmetro e do retorno. `Object` não é interface funcional.',
    },
    {
      id: 'junior-t4-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `Function<Integer, Integer> mais1 = x -> x + 1;
Function<Integer, Integer> vezes10 = x -> x * 10;
System.out.println(mais1.andThen(vezes10).apply(2) + " " + mais1.compose(vezes10).apply(2));`,
      opcoes: ['`30 21`', '`21 30`', '`30 30`', '`21 21`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`andThen` aplica `mais1` e depois `vezes10`: (2 + 1) × 10. `compose` aplica primeiro o argumento: 2 × 10 + 1.',
    },
    {
      id: 'junior-t4-e02-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais pares de interface e método abstrato estão corretos? Escolha três.',
      opcoes: [
        '`Supplier` e `get()`',
        '`Consumer` e `accept(T)`',
        '`Predicate` e `test(T)`',
        '`Function` e `run(T)`',
        '`BinaryOperator` e `test(T, T)`',
      ],
      respostas: [0, 1, 2],
      explicacao: '`Function` e os operadores usam `apply`. `run()` é de `Runnable`, que não recebe nem devolve nada.',
    },
    {
      id: 'junior-t4-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `BiFunction<String, Integer, String> corta = (s, n) -> s.substring(0, n);
BinaryOperator<String> junta = (a, b) -> a + "-" + b;
UnaryOperator<String> inverte = s -> new StringBuilder(s).reverse().toString();
System.out.println(junta.apply(corta.apply("javaflix", 4), inverte.apply("abc")));`,
      opcoes: ['`java-cba`', '`java-abc`', '`javaf-cba`', '`cba-java`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`corta` recebe dois tipos diferentes e devolve um terceiro. `BinaryOperator` e `UnaryOperator` são versões de `BiFunction` e `Function` com todos os tipos iguais.',
    },
    {
      id: 'junior-t4-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `int total = 0;
Consumer<Integer> somar = x -> total += x;
somar.accept(5);`,
      opcoes: ['Não compila', 'Compila, e `total` passa a valer 5', 'Compila, mas `total` continua 0', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'A lambda captura `total`, que precisaria ser efetivamente final, e ainda tenta alterá-la. A mesma regra vale para classes anônimas e locais.',
    },
    {
      id: 'junior-t4-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `StringBuilder log = new StringBuilder();
Consumer<String> a = s -> log.append("[").append(s).append("]");
Consumer<String> b = s -> log.append(s.length());
a.andThen(b).accept("oi");
a.accept("x");
System.out.println(log);`,
      opcoes: ['`[oi]2[x]`', '`[oi][x]2`', '`2[oi][x]`', 'Não compila: a lambda altera `log`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A variável `log` nunca é reatribuída, então é efetivamente final; alterar o objeto apontado é permitido. `andThen` roda `a` e depois `b` com o mesmo argumento.',
    },
    {
      id: 'junior-t4-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: '`Comparator` declara `compare(T, T)` e também `boolean equals(Object o)`, os dois abstratos. Por que ele ainda é uma interface funcional?',
      opcoes: [
        'Porque métodos abstratos que repetem métodos públicos de `Object` não contam',
        'Porque `equals` é `default` em `Comparator`',
        'Porque a anotação `@FunctionalInterface` desliga a regra',
        'Não é: `Comparator` não aceita lambdas',
      ],
      resposta: 0,
      explicacao: 'Toda classe já herda `equals` de `Object`, então esse método nunca fica sem implementação. Só `compare` precisa ser fornecido pela lambda.',
    },
    {
      id: 'junior-t4-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `IntPredicate impar = n -> n % 2 != 0;
IntUnaryOperator triplo = n -> n * 3;
ToIntFunction<String> letras = String::length;
int r = triplo.applyAsInt(letras.applyAsInt("lambda"));
System.out.println(r + " " + impar.test(r));`,
      opcoes: ['`18 false`', '`18 true`', '`6 false`', 'Não compila: `String::length` não é uma lambda'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '"lambda" tem 6 letras, e o triplo é 18, par. As versões primitivas trabalham com `int` direto, sem autoboxing, e usam `applyAsInt` no lugar de `apply`.',
    },
    {
      id: 'junior-t4-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como o `javac` compila uma lambda?',
      opcoes: [
        'Move o corpo para um método privado e usa `invokedynamic`; a classe que implementa a interface é gerada em memória na primeira execução',
        'Gera um arquivo `.class` com nome numerado, como uma classe anônima',
        'Copia o corpo da lambda para cada lugar em que ela é chamada',
        'Interpreta a lambda em tempo de execução, sem bytecode',
      ],
      resposta: 0,
      explicacao: 'O `LambdaMetafactory` cria uma classe oculta na primeira vez que a linha roda. Por isso lambdas não deixam arquivos `Main$1.class`, e o JDK pode mudar essa estratégia sem recompilação.',
    },
  ],
};

export default episodio;
