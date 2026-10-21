import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t6-e01',
  minutos: 17,
  aula,
  armadilhas: [
    '`assertEquals(esperado, obtido)`: com os argumentos invertidos, o teste funciona, mas a mensagem de falha troca os papéis.',
    '`assertEquals` com `BigDecimal` compara a escala: 259.8 e 259.80 são diferentes para o `equals`.',
    'O `@BeforeAll` precisa ser `static`; no JUnit 6, um não estático é um problema de descoberta que derruba a execução inteira.',
    'Testes que dependem da ordem ou de estado estático compartilhado passam sozinhos e falham juntos.',
    'Um `@Disabled` esquecido é um teste que não protege nada: ele aparece só como pulado.',
    'Sem testar os valores-limite, como 199.99 e 200.00, um `>` no lugar de `>=` passa despercebido.',
    'Uma anotação própria sem `@Retention(RUNTIME)` não é vista por reflexão em tempo de execução.',
  ],
  ia: {
    uso:
      'Um assistente de IA é bom para sugerir casos de teste que você não tinha pensado, principalmente valores-limite e caminhos de erro, e para escrever a parte repetitiva de um teste parametrizado. Decidir o que testar e conferir cada valor esperado continua sendo trabalho seu: a IA não conhece a regra de negócio, só o código que você mostrou.',
    pedido:
      'Escreva testes JUnit 6 para o método Frete.calcular(BigDecimal total, String uf) abaixo.\nRegra de negócio: frete grátis a partir de R$ 200,00; SP paga 15,00; os outros estados, 25,00.\n- Use @ParameterizedTest com @CsvSource e inclua os valores-limite 199.99 e 200.00.\n- Um comportamento por teste, com nomes que descrevem a regra.\n- Calcule os valores esperados pela regra acima, não pelo código.\n- Não altere o código de produção e não use dados reais de clientes.\nExplique por que escolheu cada caso.\n\n<cole aqui a classe Frete>',
    erros: [
      'Escreve testes do JUnit 4 (`org.junit.Test`, `@Before`, `@RunWith`), que o JUnit 6 do Spring Boot 4 só executa com o motor de compatibilidade *vintage*.',
      'Calcula o valor esperado copiando a lógica do próprio código testado: se a lógica estiver errada, o teste erra junto e passa.',
      'Compara `BigDecimal` com `assertEquals` sem pensar na escala, como o `259.8` contra `259.80` da aula.',
    ],
    conferir: [
      'Faça cada teste falhar de propósito, mudando o esperado ou o código: um teste que nunca falha não protege nada.',
      'Confira cada valor esperado com a regra de negócio, à mão, e não com o código.',
      'Veja se os imports são de `org.junit.jupiter.api` e se os casos de fronteira estão lá.',
    ],
  },
  recursos: [
    {
      titulo: 'JUnit User Guide: Writing Tests',
      url: 'https://docs.junit.org/current/writing-tests/intro.html',
      tipo: 'documentacao',
      porque: 'O guia oficial do JUnit, com cada anotação e as asserções.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JUnit User Guide: Test Instance Lifecycle',
      url: 'https://docs.junit.org/current/writing-tests/test-instance-lifecycle.html',
      tipo: 'documentacao',
      porque: 'Por que o JUnit cria um objeto por teste, e como mudar isso com `@TestInstance`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JUnit User Guide: Parameterized Classes and Tests',
      url: 'https://docs.junit.org/current/writing-tests/parameterized-classes-and-tests.html',
      tipo: 'documentacao',
      porque: 'Todas as fontes de argumentos, as conversões e os nomes das execuções.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: org.junit.jupiter.api.Assertions',
      url: 'https://docs.junit.org/current/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html',
      tipo: 'documentacao',
      porque: 'A lista completa das asserções do JUnit, de `assertEquals` a `assertTimeout`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Maven Surefire: Using JUnit Platform',
      url: 'https://maven.apache.org/surefire/maven-surefire-plugin/examples/junit-platform.html',
      tipo: 'documentacao',
      porque: 'Como o plugin que roda os testes no `mvn test` encontra e executa o JUnit.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Martin Fowler: The Practical Test Pyramid',
      url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
      tipo: 'artigo',
      porque: 'O mapa dos tipos de teste, de unidade a ponta a ponta, que esta temporada percorre.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Attekita Dev: Descomplicando testes unitários',
      url: 'https://www.youtube.com/watch?v=HcDJdKfm5nA',
      tipo: 'video',
      porque: 'Um guia rápido sobre o que é um teste de unidade e por que escrever um, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Luan Codeplays: JUnit 5, começando com testes unitários',
      url: 'https://www.youtube.com/watch?v=1siXcUpsld0',
      tipo: 'video',
      porque: 'O primeiro teste com JUnit 5, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'O8K Group: Realizando testes unitários com JUnit 5',
      url: 'https://www.youtube.com/watch?v=W3fSgHrBzek',
      tipo: 'video',
      porque: 'Uma aula longa com as anotações, as asserções e os testes parametrizados, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Testes parametrizados',
    enunciado:
      'Implemente, com reflexão, um executor de testes parametrizados. A anotação `@Casos(nome = "...", value = {...})` traz um modelo de nome e uma lista de casos, cada um com valores separados por vírgula. Para cada método anotado, em ordem de nome, imprima o nome do método e execute-o uma vez por caso, convertendo cada valor (sem espaços nas pontas) para o tipo do parâmetro correspondente: `String`, `int` ou `BigDecimal`. O nome de cada execução é o modelo com `{0}`, `{1}`... trocados pelos valores. Uma execução que lança `AssertionError` é falha. A saída deve ser:\n\n```text\nfrete\n  ✔ total 199.99 para SP paga 15.00\n  ✔ total 199.99 para BA paga 25.00\n  ✔ total 200.00 para BA paga 0\n  ✘ total 350.00 para SP paga 0.00: expected: <0.00> but was: <0>\nsubtotal\n  ✔ 2 unidades a 129.90 custam 259.80\n  ✔ 3 unidades a 10.00 custam 30.00\n6 casos, 1 falha(s)\n```',
    dicas: [
      'A anotação precisa de `@Retention(RetentionPolicy.RUNTIME)` para ser lida com `getAnnotation`.',
      '`metodo.getParameterTypes()` diz o tipo de cada parâmetro, na ordem.',
      'Compare tipos primitivos com `tipo == int.class`.',
      'A exceção lançada pelo teste chega embrulhada numa `InvocationTargetException`; a original está em `getCause()`.',
    ],
    solucao: `import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Parametrizados {
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    @interface Casos {
        String nome();
        String[] value();
    }

    static Object converter(String texto, Class<?> tipo) {
        if (tipo == String.class) return texto;
        if (tipo == int.class) return Integer.parseInt(texto);
        if (tipo == BigDecimal.class) return new BigDecimal(texto);
        throw new IllegalArgumentException("sem conversão para " + tipo.getSimpleName());
    }

    static String nome(String modelo, String[] valores) {
        String nome = modelo;
        for (int i = 0; i < valores.length; i++) {
            nome = nome.replace("{" + i + "}", valores[i]);
        }
        return nome;
    }

    static void verificarIgual(Object esperado, Object obtido) {
        if (!esperado.equals(obtido)) {
            throw new AssertionError("expected: <" + esperado + "> but was: <" + obtido + ">");
        }
    }

    public static class LojaTeste {
        @Casos(nome = "total {0} para {1} paga {2}", value = {
                "199.99, SP, 15.00", "199.99, BA, 25.00", "200.00, BA, 0", "350.00, SP, 0.00"})
        public void frete(BigDecimal total, String uf, BigDecimal esperado) {
            BigDecimal frete = total.compareTo(new BigDecimal("200.00")) >= 0 ? BigDecimal.ZERO
                    : uf.equals("SP") ? new BigDecimal("15.00") : new BigDecimal("25.00");
            verificarIgual(esperado, frete);
        }

        @Casos(nome = "{0} unidades a {1} custam {2}", value = {"2, 129.90, 259.80", "3, 10.00, 30.00"})
        public void subtotal(int quantidade, BigDecimal preco, BigDecimal esperado) {
            verificarIgual(esperado, preco.multiply(BigDecimal.valueOf(quantidade)));
        }
    }

    public static void main(String[] args) throws Exception {
        int casos = 0;
        int falhas = 0;
        List<Method> metodos = Arrays.stream(LojaTeste.class.getDeclaredMethods())
                .filter(m -> m.isAnnotationPresent(Casos.class))
                .sorted(Comparator.comparing(Method::getName))
                .toList();
        for (Method metodo : metodos) {
            Casos anotacao = metodo.getAnnotation(Casos.class);
            System.out.println(metodo.getName());
            for (String caso : anotacao.value()) {
                String[] valores = Arrays.stream(caso.split(",")).map(String::trim).toArray(String[]::new);
                Class<?>[] tipos = metodo.getParameterTypes();
                Object[] argumentos = new Object[tipos.length];
                for (int i = 0; i < tipos.length; i++) argumentos[i] = converter(valores[i], tipos[i]);
                casos++;
                String nome = nome(anotacao.nome(), valores);
                try {
                    metodo.invoke(new LojaTeste(), argumentos);
                    System.out.println("  ✔ " + nome);
                } catch (InvocationTargetException e) {
                    falhas++;
                    System.out.println("  ✘ " + nome + ": " + e.getCause().getMessage());
                }
            }
        }
        System.out.println(casos + " casos, " + falhas + " falha(s)");
    }
}`,
    saida: 'frete\n  ✔ total 199.99 para SP paga 15.00\n  ✔ total 199.99 para BA paga 25.00\n  ✔ total 200.00 para BA paga 0\n  ✘ total 350.00 para SP paga 0.00: expected: <0.00> but was: <0>\nsubtotal\n  ✔ 2 unidades a 129.90 custam 259.80\n  ✔ 3 unidades a 10.00 custam 30.00\n6 casos, 1 falha(s)',
    comentarios:
      'O caso que falhou é o mesmo detalhe da aula: `BigDecimal.ZERO` tem escala 0, e `0.00` tem escala 2, então o `equals` não os considera iguais. É o tipo de surpresa que um teste parametrizado pega, porque testar muitos casos custa uma linha cada. O `@ParameterizedTest` do JUnit faz o mesmo com muito mais recursos: conversão para dezenas de tipos, inclusive datas e enums, conversores próprios, `@MethodSource` para casos que não cabem em texto e o nome padrão com o índice e os argumentos. E cada caso aparece como um teste separado no relatório, como aqui.',
  },
  bugs: [
    {
      id: 'backend-junior-t6-e01-b01',
      dificuldade: 1,
      sintoma: 'A regra é frete grátis **a partir de** R$ 200,00, mas um carrinho de exatamente 200,00 paga 25,00. O teste do valor-limite pegou.',
      codigo: `import java.math.BigDecimal;

public class Frete {
    static BigDecimal calcular(BigDecimal total, String uf) {
        if (total.compareTo(new BigDecimal("200.00")) > 0) return BigDecimal.ZERO;
        return uf.equals("SP") ? new BigDecimal("15.00") : new BigDecimal("25.00");
    }

    public static void main(String[] args) {
        System.out.println("199.99 -> " + calcular(new BigDecimal("199.99"), "BA"));
        System.out.println("200.00 -> " + calcular(new BigDecimal("200.00"), "BA"));
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: '199.99 -> 25.00\n200.00 -> 25.00' },
      correcao: `import java.math.BigDecimal;

public class Frete {
    static BigDecimal calcular(BigDecimal total, String uf) {
        if (total.compareTo(new BigDecimal("200.00")) >= 0) return BigDecimal.ZERO;
        return uf.equals("SP") ? new BigDecimal("15.00") : new BigDecimal("25.00");
    }

    public static void main(String[] args) {
        System.out.println("199.99 -> " + calcular(new BigDecimal("199.99"), "BA"));
        System.out.println("200.00 -> " + calcular(new BigDecimal("200.00"), "BA"));
    }
}`,
      saidaCorrigida: '199.99 -> 25.00\n200.00 -> 0',
      dica: 'O bug só aparece num valor exato. Releia a regra palavra por palavra e compare com a condição.',
      explicacao: '"A partir de 200" inclui o 200, então a comparação precisa ser `>= 0`. É o erro mais comum em regras com fronteira, e só um teste com o valor exato da fronteira o encontra.',
    },
    {
      id: 'backend-junior-t6-e01-b02',
      dificuldade: 2,
      sintoma: 'O teste falha dizendo que esperava `Olá, Ana` e recebeu `Olá, Ana`. Os dois textos parecem idênticos.',
      codigo: `public class SaudacaoTeste {
    static String saudar(String nome) {
        return "Olá, " + nome;
    }

    static void verificarIgual(String esperado, String obtido) {
        if (esperado != obtido) System.out.println("FALHOU: esperava [" + esperado + "], veio [" + obtido + "]");
        else System.out.println("passou");
    }

    public static void main(String[] args) {
        verificarIgual("Olá, Ana", saudar("Ana"));
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'FALHOU: esperava [Olá, Ana], veio [Olá, Ana]' },
      correcao: `public class SaudacaoTeste {
    static String saudar(String nome) {
        return "Olá, " + nome;
    }

    static void verificarIgual(String esperado, String obtido) {
        if (!esperado.equals(obtido)) System.out.println("FALHOU: esperava [" + esperado + "], veio [" + obtido + "]");
        else System.out.println("passou");
    }

    public static void main(String[] args) {
        verificarIgual("Olá, Ana", saudar("Ana"));
    }
}`,
      saidaCorrigida: 'passou',
      dica: 'O problema não está no código testado, e sim no verificador. O que exatamente ele compara?',
      explicacao: '`!=` compara referências: se são o mesmo objeto. O texto montado em tempo de execução é um objeto novo, diferente do literal, mesmo com o mesmo conteúdo. Asserções comparam com `equals`, como o `assertEquals` faz por dentro.',
    },
    {
      id: 'backend-junior-t6-e01-b03',
      dificuldade: 3,
      sintoma: 'Cada teste passa quando roda sozinho, mas o segundo falha quando os dois rodam juntos.',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class CarrinhoTeste {
    static final List<String> itens = new ArrayList<>();

    void adicionaUmItem() {
        itens.add("Teclado mecânico");
        System.out.println("adicionaUmItem: " + (itens.size() == 1 ? "passou" : "FALHOU, tamanho " + itens.size()));
    }

    void adicionaOutroItem() {
        itens.add("Mouse sem fio");
        System.out.println("adicionaOutroItem: " + (itens.size() == 1 ? "passou" : "FALHOU, tamanho " + itens.size()));
    }

    public static void main(String[] args) {
        new CarrinhoTeste().adicionaUmItem();
        new CarrinhoTeste().adicionaOutroItem();
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'adicionaUmItem: passou\nadicionaOutroItem: FALHOU, tamanho 2' },
      correcao: `import java.util.ArrayList;
import java.util.List;

public class CarrinhoTeste {
    final List<String> itens = new ArrayList<>();

    void adicionaUmItem() {
        itens.add("Teclado mecânico");
        System.out.println("adicionaUmItem: " + (itens.size() == 1 ? "passou" : "FALHOU, tamanho " + itens.size()));
    }

    void adicionaOutroItem() {
        itens.add("Mouse sem fio");
        System.out.println("adicionaOutroItem: " + (itens.size() == 1 ? "passou" : "FALHOU, tamanho " + itens.size()));
    }

    public static void main(String[] args) {
        new CarrinhoTeste().adicionaUmItem();
        new CarrinhoTeste().adicionaOutroItem();
    }
}`,
      saidaCorrigida: 'adicionaUmItem: passou\nadicionaOutroItem: passou',
      dica: 'Como o JUnit, o `main` cria um objeto novo para cada teste. Então o que é que sobrevive de um teste para o outro?',
      explicacao: 'Um campo `static` pertence à classe, e não ao objeto: os dois testes usaram a mesma lista. Sem o `static`, cada objeto de teste tem a sua, como o JUnit espera. Estado estático em testes é a causa mais comum de testes que dependem da ordem.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t6-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num projeto Maven com Spring Boot, onde fica a classe `CarrinhoTest` que testa `br.com.javaflix.loja.Carrinho`?',
      opcoes: [
        'Em `src/test/java/br/com/javaflix/loja/CarrinhoTest.java`',
        'Em `src/main/java/br/com/javaflix/loja/CarrinhoTest.java`',
        'Em `src/test/resources/CarrinhoTest.java`',
        'Na raiz do projeto, ao lado do `pom.xml`',
      ],
      resposta: 0,
      explicacao: 'Os testes ficam numa árvore própria, no mesmo pacote, e não vão para o pacote final da aplicação. O mesmo pacote dá acesso ao que não é público.',
    },
    {
      id: 'backend-junior-t6-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em que ordem aparecem as três partes de um teste na estrutura *Arrange, Act, Assert*?',
      opcoes: [
        'Preparar o cenário, agir chamando o código e verificar o resultado',
        'Verificar, preparar e agir',
        'Agir, verificar e preparar',
        'Preparar, verificar e agir',
      ],
      resposta: 0,
      explicacao: 'Separar as três partes com uma linha em branco deixa claro o que é cenário, o que é a ação testada e o que é a expectativa.',
    },
    {
      id: 'backend-junior-t6-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste escreve `assertEquals(carrinho.total(), new BigDecimal("609.70"))`. O que acontece quando o total está errado?',
      opcoes: [
        'O teste falha normalmente, mas a mensagem chama de esperado o valor que o código produziu',
        'O teste passa mesmo com o total errado',
        'Não compila',
        'O JUnit corrige a ordem sozinho',
      ],
      resposta: 0,
      explicacao: 'O primeiro argumento é o esperado. Invertidos, a mensagem "expected: <...> but was: <...>" engana quem for ler a falha.',
    },
    {
      id: 'backend-junior-t6-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste lança `NullPointerException` antes de chegar à asserção. Como o Surefire o classifica?',
      opcoes: ['Como erro (*error*)', 'Como falha (*failure*)', 'Como pulado (*skipped*)', 'Como sucesso, porque nenhuma asserção falhou'],
      resposta: 0,
      explicacao: 'Falha é uma asserção que não vale, um `AssertionError`. Qualquer outra exceção inesperada é erro: o teste nem chegou a verificar.',
    },
    {
      id: 'backend-junior-t6-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.math.BigDecimal;

public class Teste {
    public static void main(String[] args) {
        BigDecimal a = new BigDecimal("259.8");
        BigDecimal b = new BigDecimal("259.80");
        System.out.println(a.equals(b) + " " + a.compareTo(b) + " " + b.stripTrailingZeros().equals(a));
    }
}`,
      opcoes: ['`false 0 true`', '`true 0 true`', '`false 0 false`', '`false -1 true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `equals` compara valor e escala; o `compareTo`, só o valor. Sem os zeros à direita, 259.80 vira 259.8, com a mesma escala de `a`.',
    },
    {
      id: 'backend-junior-t6-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa imita o JUnit, que cria um objeto de teste para cada método. Qual é a saída?',
      codigo: `import java.util.StringJoiner;

public class Teste {
    static int estatico = 0;
    int deInstancia = 0;

    void teste() {
        estatico++;
        deInstancia++;
    }

    public static void main(String[] args) {
        StringJoiner saida = new StringJoiner(" ");
        for (int i = 0; i < 3; i++) {
            Teste objetoDeTeste = new Teste();
            objetoDeTeste.teste();
            saida.add(objetoDeTeste.deInstancia + "/" + estatico);
        }
        System.out.println(saida);
    }
}`,
      opcoes: ['`1/1 1/2 1/3`', '`1/1 2/2 3/3`', '`1/1 1/1 1/1`', '`3/3 3/3 3/3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O campo de instância recomeça em cada objeto novo; o estático é um só e acumula. Por isso estado estático em testes vaza de um teste para outro.',
    },
    {
      id: 'backend-junior-t6-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Ao rodar os testes, o JUnit 6 recusa a classe: "@BeforeAll method \'void ...preparar()\' must be static unless the test class is annotated with @TestInstance(Lifecycle.PER_CLASS)". Por quê?',
      opcoes: [
        'O `@BeforeAll` roda antes de existir qualquer objeto de teste, porque cada teste ganha o seu; por isso precisa ser estático',
        'Porque métodos de teste não podem ter `void`',
        'Porque o `@BeforeAll` só funciona em classes públicas',
        'Porque o nome `preparar` é reservado',
      ],
      resposta: 0,
      explicacao: 'Com o ciclo padrão, um objeto por método, não há instância para um método que roda uma vez antes de todos. O `PER_CLASS` muda para um objeto só.',
    },
    {
      id: 'backend-junior-t6-e01-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um teste passa quando roda sozinho e falha quando roda junto com os outros da classe. Qual é a causa mais provável?',
      opcoes: [
        'Estado compartilhado entre testes, como um campo estático ou um arquivo, alterado por outro teste',
        'O JUnit roda os testes em ordem alfabética',
        'Falta memória para rodar todos juntos',
        'A IDE está com o cache desatualizado',
      ],
      resposta: 0,
      explicacao: 'Testes isolados não dependem de quem rodou antes. Sem estado estático mutável, e com o cenário montado no `@BeforeEach`, o problema some.',
    },
    {
      id: 'backend-junior-t6-e01-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa monta o nome de uma execução parametrizada, como o `name` do `@ParameterizedTest`. Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        String modelo = "{1} paga {2} com total {0}";
        String[] valores = " 199.99, SP ,15.00".split(",");
        String nome = modelo;
        for (int i = 0; i < valores.length; i++) {
            nome = nome.replace("{" + i + "}", valores[i].trim());
        }
        System.out.println("[" + nome + "]");
    }
}`,
      resposta: '[SP paga 15.00 com total 199.99]',
      explicacao: 'Cada `{n}` é trocado pelo valor de índice n, em qualquer posição do modelo, e o `trim` tira os espaços das pontas de cada valor.',
    },
    {
      id: 'backend-junior-t6-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A regra é "frete grátis a partir de R$ 200,00". Qual par de casos mais protege contra um `>` escrito no lugar de `>=`?',
      opcoes: ['199.99 e 200.00', '50.00 e 500.00', '0.00 e 1000.00', '200.00 e 300.00'],
      resposta: 0,
      explicacao: 'Só o valor exatamente na fronteira distingue `>` de `>=`, e o vizinho de baixo confirma o outro lado. São os valores-limite.',
    },
    {
      id: 'backend-junior-t6-e01-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destas anotações existem no JUnit Jupiter, o JUnit 5 em diante? Escolha três.',
      opcoes: ['`@BeforeEach`', '`@ParameterizedTest`', '`@Nested`', '`@Before`', '`@TestCase`'],
      respostas: [0, 1, 2],
      explicacao: '`@Before` é do JUnit 4, substituída por `@BeforeEach`. `@TestCase` não existe; no JUnit 3, testes eram classes que estendiam `TestCase`.',
    },
    {
      id: 'backend-junior-t6-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um executor de testes caseiro procura métodos anotados com `@Caso`. Qual é a saída?',
      codigo: `import java.lang.annotation.ElementType;
import java.lang.annotation.Target;
import java.util.Arrays;

public class Teste {
    @Target(ElementType.METHOD)
    @interface Caso {}

    static class Casos {
        @Caso
        public void primeiro() {}

        @Caso
        public void segundo() {}

        public void auxiliar() {}
    }

    public static void main(String[] args) {
        long encontrados = Arrays.stream(Casos.class.getDeclaredMethods())
                .filter(m -> m.isAnnotationPresent(Caso.class))
                .count();
        System.out.println(encontrados);
    }
}`,
      opcoes: ['`0`', '`2`', '`3`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem `@Retention`, a anotação fica no `.class` mas não é carregada em tempo de execução, e a reflexão não a vê. As do JUnit são `RUNTIME`.',
    },
    {
      id: 'backend-junior-t6-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece com `assertThrows(IllegalArgumentException.class, () -> carrinho.adicionar("Headset", preco, 1))`, se a quantidade 1 for aceita normalmente?',
      opcoes: [
        'O teste falha: "Expected java.lang.IllegalArgumentException to be thrown, but nothing was thrown."',
        'O teste passa, porque nada deu errado',
        'O teste é marcado como pulado',
        'O `assertThrows` devolve `null` e o teste continua',
      ],
      resposta: 0,
      explicacao: 'O `assertThrows` exige a exceção. Quando ela vem, é devolvida para conferir a mensagem; quando não vem, o teste falha.',
    },
    {
      id: 'backend-junior-t6-e01-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `@Disabled("frete por CEP ainda não existe")` faz com um teste?',
      opcoes: [
        'O JUnit não o executa e o relata como pulado, com o motivo',
        'Executa o teste e ignora a falha',
        'Apaga o teste do relatório',
        'Faz o build falhar',
      ],
      resposta: 0,
      explicacao: 'No resumo do Surefire, ele entra em `Skipped`. É útil por pouco tempo; um teste desligado para sempre deveria ser apagado ou consertado.',
    },
    {
      id: 'backend-junior-t6-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual destes testes é mais frágil, quebrando em refatorações que não mudam o comportamento?',
      opcoes: [
        'Um que verifica, por reflexão, que o `Carrinho` guarda os itens num `ArrayList` privado chamado `itens`',
        'Um que adiciona dois itens e verifica o total',
        'Um que verifica a exceção para quantidade zero',
        'Um que verifica o total com o cupom DEZ',
      ],
      resposta: 0,
      explicacao: 'Trocar a lista por outra estrutura não muda nada para quem usa o carrinho, mas quebra esse teste. Teste o que o código entrega, não como ele guarda.',
    },
  ],
};

export default episodio;
