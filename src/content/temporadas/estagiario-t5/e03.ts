import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t5-e03',
  minutos: 12,
  aula,
  armadilhas: [
    'Os métodos de `StringBuilder` alteram o próprio objeto e devolvem `this`.',
    '`StringBuilder b = a.append("x");` faz `a` e `b` apontarem para o mesmo buffer.',
    '`equals` de `StringBuilder` compara referências, não conteúdo.',
    '`substring` devolve uma `String` e não altera o buffer.',
    '`delete(inicio, fim)` e `replace(inicio, fim, s)` excluem o `fim`.',
    '`StringBuilder sb = "abc";` e `String s = sb;` não compilam.',
    '`new StringBuilder(10)` cria um buffer vazio com capacidade 10, não o texto "10".',
    '`StringBuffer` tem os mesmos métodos, mas sincronizados.',
  ],
  ia: {
    uso:
      'A IA ajuda a decidir entre `+`, `StringBuilder`, `String.join` e `Collectors.joining` para montar texto, e a estimar o custo de cada um. Peça a justificativa da escolha: se ela não falar em laço ou em tamanho dos dados, a resposta provavelmente é decorada.',
    pedido:
      'Este método Java 21 monta um texto grande em partes.\n<cole o método aqui>\n- Diga quantas Strings intermediárias ele cria para n itens e qual é a complexidade.\n- Reescreva com StringBuilder só se houver ganho real, e explique por quê.\n- Aponte qualquer comparação de StringBuilder com equals.',
    erros: [
      'Compara dois `StringBuilder` com `equals` esperando comparar o texto.',
      'Troca `+` por `StringBuilder` em concatenações de uma linha, sem ganho e com menos legibilidade.',
      'Reaproveita o mesmo `StringBuilder` em duas variáveis sem perceber que elas compartilham o buffer.',
    ],
    conferir: [
      'Procure `equals` entre buffers e troque por `toString().equals` ou `compareTo`.',
      'Meça com dados grandes: o ganho do `StringBuilder` aparece em laços com milhares de voltas.',
      'Confira se cada variável que deveria ter o próprio texto tem o próprio `new StringBuilder`.',
    ],
  },
  recursos: [
    {
      titulo: 'Javadoc de StringBuilder',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html',
      tipo: 'documentacao',
      porque: 'Todos os métodos, com o aviso sobre `compareTo` e sobre não ser seguro entre threads.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The StringBuilder Class',
      url: 'https://docs.oracle.com/javase/tutorial/java/data/buffers.html',
      tipo: 'documentacao',
      porque: 'Capacidade, `append`, `insert`, `reverse` e um exemplo de palíndromo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'dev.java: String Builders',
      url: 'https://dev.java/learn/language/constructs/numbers-strings/string-builders/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre `StringBuilder`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: StringBuilder vs StringBuffer in Java',
      url: 'https://www.baeldung.com/java-string-builder-string-buffer',
      tipo: 'artigo',
      porque: 'As diferenças entre os dois, com uma medição de desempenho.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Kunal Kushwaha: Strings and StringBuilder in Java',
      url: 'https://www.youtube.com/watch?v=zL1DPZ0Ovlo',
      tipo: 'video',
      porque: 'Por que concatenar `String` num laço é quadrático e como o `StringBuilder` resolve, com desenhos da memória.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'StringBuilder Class in Java: Capacity, Append, Insert, Delete, Replace, Reverse',
      url: 'https://www.youtube.com/watch?v=G-D5SzwBWg4',
      tipo: 'video',
      porque: 'Uma demonstração de cada método do `StringBuilder`, um por um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro mostra o encadeamento de chamadas com as perguntas de "qual é a saída" típicas da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Using the StringBuilder Class"',
    },
  ],
  desafio: {
    titulo: 'Tabela em texto',
    enunciado:
      'Monte, com um único `StringBuilder`, uma tabela de produtos e preços com colunas alinhadas e uma linha de total. Use `append` para tudo e só chame `toString()` no fim. Com os produtos café (12,5), pão (0,8) e queijo (35), imprima:\n\n```text\nproduto   preço\ncafé      12.50\npão        0.80\nqueijo    35.00\ntotal     48.30\n```',
    dicas: [
      'Use `String.format(Locale.US, "%-8s%7.2f%n", nome, preco)` para cada linha e acrescente com `append`.',
      'Acumule o total num `double` enquanto percorre os produtos.',
      'Um `StringBuilder` aceita `append` encadeado: `sb.append(a).append(b)`.',
    ],
    solucao: `import java.util.Locale;

public class Tabela {
    public static void main(String[] args) {
        String[] nomes = {"café", "pão", "queijo"};
        double[] precos = {12.5, 0.8, 35};
        StringBuilder sb = new StringBuilder();
        sb.append("produto   preço").append('\\n');
        double total = 0;
        for (int i = 0; i < nomes.length; i++) {
            sb.append(String.format(Locale.US, "%-8s%7.2f", nomes[i], precos[i])).append('\\n');
            total += precos[i];
        }
        sb.append(String.format(Locale.US, "%-8s%7.2f", "total", total));
        System.out.println(sb);
    }
}`,
    saida: 'produto   preço\ncafé      12.50\npão        0.80\nqueijo    35.00\ntotal     48.30',
    comentarios:
      'Montar o texto inteiro num `StringBuilder` e imprimir uma vez é o padrão de quem gera relatórios, arquivos e respostas HTTP. Somar preços em `double` funciona aqui, mas, como você viu no episódio de ponto flutuante, valores de dinheiro de verdade pedem `BigDecimal`.',
  },
  bugs: [
    {
      id: 'estagiario-t5-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: String cannot be converted to StringBuilder`.',
      codigo: `public class Recibo {
    public static void main(String[] args) {
        StringBuilder recibo = "Total: ";
        recibo.append(42);
        System.out.println(recibo);
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Recibo {
    public static void main(String[] args) {
        StringBuilder recibo = new StringBuilder("Total: ");
        recibo.append(42);
        System.out.println(recibo);
    }
}`,
      saidaCorrigida: 'Total: 42',
      dica: 'Um literal entre aspas é de que tipo? Ele vira `StringBuilder` sozinho?',
      explicacao: 'Literais entre aspas são `String`, e não há conversão automática de `String` para `StringBuilder`. O buffer precisa ser criado com `new`, passando o texto inicial ao construtor.',
    },
    {
      id: 'estagiario-t5-e03-b02',
      dificuldade: 2,
      sintoma: 'A senha digitada é igual à correta, mas o sistema responde `Senha incorreta`.',
      codigo: `public class Senha {
    public static void main(String[] args) {
        StringBuilder digitada = new StringBuilder("ab").append("12");
        String correta = "ab12";
        if (digitada.equals(correta)) {
            System.out.println("Acesso liberado");
        } else {
            System.out.println("Senha incorreta");
        }
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'Senha incorreta' },
      correcao: `public class Senha {
    public static void main(String[] args) {
        StringBuilder digitada = new StringBuilder("ab").append("12");
        String correta = "ab12";
        if (digitada.toString().equals(correta)) {
            System.out.println("Acesso liberado");
        } else {
            System.out.println("Senha incorreta");
        }
    }
}`,
      saidaCorrigida: 'Acesso liberado',
      dica: 'Qual `equals` está sendo chamado: o de `String` ou o de `StringBuilder`? E o que ele compara?',
      explicacao: 'O `StringBuilder` herda o `equals` de `Object`, que só é verdadeiro para o mesmo objeto. Comparado com uma `String`, dá sempre falso. Convertendo o buffer com `toString()`, o `equals` chamado passa a ser o de `String`, que compara o texto.',
    },
    {
      id: 'estagiario-t5-e03-b03',
      dificuldade: 3,
      sintoma: 'Cada pessoa deveria receber a própria saudação, mas as duas linhas saem `Olá, AnaBia`.',
      codigo: `public class Saudacoes {
    public static void main(String[] args) {
        StringBuilder base = new StringBuilder("Olá, ");
        StringBuilder ana = base;
        ana.append("Ana");
        StringBuilder bia = base;
        bia.append("Bia");
        System.out.println(ana);
        System.out.println(bia);
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: 'Olá, AnaBia\nOlá, AnaBia' },
      correcao: `public class Saudacoes {
    public static void main(String[] args) {
        StringBuilder base = new StringBuilder("Olá, ");
        StringBuilder ana = new StringBuilder(base);
        ana.append("Ana");
        StringBuilder bia = new StringBuilder(base);
        bia.append("Bia");
        System.out.println(ana);
        System.out.println(bia);
    }
}`,
      saidaCorrigida: 'Olá, Ana\nOlá, Bia',
      dica: 'Quantos objetos `StringBuilder` existem neste programa? Conte os `new`.',
      explicacao: 'Atribuir um `StringBuilder` a outra variável copia a referência, não o buffer: `base`, `ana` e `bia` são o mesmo objeto, e os dois `append` vão para ele. Com `new StringBuilder(base)`, cada pessoa ganha um buffer próprio, que começa com o texto da base.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t5-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença essencial entre `String` e `StringBuilder`?',
      opcoes: [
        '`StringBuilder` é mutável: os métodos alteram o próprio objeto',
        '`StringBuilder` só aceita letras',
        '`String` é mais rápida para concatenar num laço',
        '`StringBuilder` não tem método `toString()`',
      ],
      resposta: 0,
      explicacao: 'A `String` é imutável e todo método devolve um objeto novo; o `StringBuilder` muda no lugar. Por isso ele é a escolha para montar textos em muitos passos.',
      dica: 'Pense no que acontece com o objeto quando um método é chamado nele.',
    },
    {
      id: 'estagiario-t5-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `StringBuilder sb = new StringBuilder("ab");
sb.append("cd").insert(1, "-").append(3);
System.out.println(sb);
sb.reverse();
System.out.println(sb);`,
      resposta: 'a-bcd3\n3dcb-a',
      explicacao: 'O encadeamento funciona porque cada método devolve o próprio `StringBuilder`: "abcd", depois "a-bcd" e "a-bcd3". O `reverse` altera o mesmo objeto.',
      dica: 'Siga a cadeia: `append`, depois `insert` na posição 1, depois outro `append`. O `reverse` muda o mesmo buffer.',
    },
    {
      id: 'estagiario-t5-e03-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `StringBuilder a = new StringBuilder("x");
StringBuilder b = a.append("y");
b.append("z");
System.out.println(a + " " + (a == b));`,
      opcoes: ['`xyz true`', '`xy false`', '`xyz false`', '`x false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`append` devolve o próprio objeto, então `b` é o mesmo `StringBuilder` que `a`. Acrescentar "z" por `b` aparece em `a`.',
      dica: 'O `append` devolve o próprio objeto. Quantos `StringBuilder` existem?',
    },
    {
      id: 'estagiario-t5-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(new StringBuilder("abcdef").delete(1, 3).insert(2, "XY"));`,
      opcoes: ['`adXYef`', '`aXYdef`', '`abXYef`', '`adeXYf`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`delete(1, 3)` remove as posições 1 e 2 (b e c), deixando "adef". Depois, `insert(2, "XY")` insere antes da posição 2: "adXYef".',
      dica: 'O `delete(1, 3)` remove as posições 1 e 2; o `insert` usa as posições do texto já encurtado.',
    },
    {
      id: 'estagiario-t5-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(new StringBuilder("a").equals(new StringBuilder("a")));`,
      opcoes: ['`false`', '`true`', 'Não compila', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`StringBuilder` herda o `equals` de `Object`, que compara referências. São dois objetos diferentes. Para comparar o conteúdo, use `toString().equals(...)` ou `compareTo`.',
      dica: 'O `StringBuilder` sobrescreve o `equals` de `Object`?',
    },
    {
      id: 'estagiario-t5-e03-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`StringBuilder sb = "abc";`',
        '`String s = new StringBuilder("a");`',
        '`StringBuilder sb = new StringBuilder("a"); String s = sb.toString();`',
        '`StringBuilder sb = new StringBuilder(10);`',
        '`StringBuilder sb = new StringBuilder(); sb.append(1).append(\'x\').append(2.5);`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Um literal é `String`, e `String` e `StringBuilder` não se convertem na atribuição. O construtor com `int` define a capacidade, e `append` aceita qualquer tipo.',
      dica: 'Não há conversão automática entre `String` e `StringBuilder` na atribuição.',
    },
    {
      id: 'estagiario-t5-e03-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para inverter o texto. O programa deve imprimir `xilfavaj`.',
      codigo: `public class Inverte {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("javaflix");
        sb.___();
        System.out.println(sb);
    }
}`,
      respostas: ['reverse'],
      saida: 'xilfavaj',
      explicacao: '`reverse()` inverte o próprio buffer, e por isso nem é preciso guardar o retorno. Com uma `String`, o mesmo exigiria criar uma nova.',
      dica: 'O método tem o nome de inverter em inglês.',
    },
    {
      id: 'estagiario-t5-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `StringBuilder sb = new StringBuilder("javaflix");
sb.substring(4);
System.out.println(sb);`,
      opcoes: ['`javaflix`', '`flix`', '`java`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`substring` é o método do `StringBuilder` que **não** altera o buffer: devolve uma `String` nova, que aqui foi descartada.',
      dica: 'Dos métodos da tabela, qual devolve uma `String` sem alterar o buffer?',
    },
    {
      id: 'estagiario-t5-e03-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Converte {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("abc");
        sb.append("def");
        String r = sb.reverse();
        System.out.println(r);
    }
}`,
      resposta: 5,
      explicacao: '`reverse()` devolve o próprio `StringBuilder`, e `StringBuilder` não é atribuível a `String`. O certo é `String r = sb.reverse().toString();`.',
      dica: 'Que tipo o `reverse()` devolve? Ele cabe numa variável `String`?',
    },
    {
      id: 'estagiario-t5-e03-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `StringBuilder sb = new StringBuilder("abc");
System.out.println(sb.length() + " " + sb.capacity());`,
      resposta: '3 19',
      explicacao: 'Criado a partir de um texto, o buffer recebe uma folga de 16 além do tamanho do texto: capacidade 3 + 16 = 19. O `length()` é só o texto que existe.',
      dica: 'Com texto inicial, a capacidade é 16 mais o tamanho do texto.',
    },
    {
      id: 'estagiario-t5-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `StringBuilder sb = new StringBuilder("javaflix");
sb.setLength(4);
sb.append("!");
System.out.println(sb);`,
      opcoes: ['`java!`', '`javaflix!`', '`!`', '`flix!`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`setLength(4)` corta o buffer para os 4 primeiros caracteres. O `append` acrescenta depois deles.',
      dica: 'O `setLength(4)` corta o buffer nos 4 primeiros caracteres.',
    },
    {
      id: 'estagiario-t5-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre `StringBuilder` e `StringBuffer`?',
      opcoes: [
        '`StringBuffer` tem métodos sincronizados, seguros para várias threads e mais lentos',
        '`StringBuffer` é imutável',
        '`StringBuilder` não tem `insert`',
        '`StringBuffer` foi criado depois e substitui o `StringBuilder`',
      ],
      resposta: 0,
      explicacao: 'Os dois têm a mesma API. O `StringBuffer` é do Java 1.0 e sincroniza cada chamada; o `StringBuilder`, do Java 5, não sincroniza e é a escolha padrão.',
      dica: 'Lembre: um dos dois tem todos os métodos `synchronized`.',
    },
    {
      id: 'estagiario-t5-e03-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Com `StringBuilder sb = new StringBuilder("abc");`, quais chamadas devolvem uma `String`? Escolha duas.',
      opcoes: ['`sb.toString()`', '`sb.substring(1)`', '`sb.append("x")`', '`sb.reverse()`', '`sb.insert(0, "x")`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'String String StringBuilder StringBuilder StringBuilder' },
      codigoVerificacao: `StringBuilder sb = new StringBuilder("abc");
Object[] r = {sb.toString(), sb.substring(1), sb.append("x"), sb.reverse(), sb.insert(0, "x")};
StringJoiner sj = new StringJoiner(" ");
for (Object o : r) sj.add(o.getClass().getSimpleName());
System.out.println(sj);`,
      explicacao: '`toString` e `substring` devolvem `String`. Os métodos que alteram o buffer devolvem o próprio `StringBuilder`, para permitir o encadeamento.',
      dica: 'Os métodos de alteração devolvem `this`; os outros dois devolvem texto novo.',
    },
    {
      id: 'estagiario-t5-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      provas: ['830', '831'],
      enunciado: 'No Java 21, qual é a saída?',
      codigo: `StringBuilder sb = new StringBuilder("ab");
sb.repeat("c", 2);
System.out.println(sb);`,
      opcoes: ['`abcc`', '`abab`', '`cc`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `repeat` do `StringBuilder` (Java 21) acrescenta o texto repetido no fim do buffer. Diferente do `repeat` da `String`, que devolve uma nova `String` com o texto original repetido.',
      dica: 'No Java 21, o `repeat` acrescenta o texto n vezes ao fim do buffer.',
    },
    {
      id: 'estagiario-t5-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que usar `StringBuilder` num laço que junta 100 mil pedaços de texto, em vez de `texto += pedaco`?',
      opcoes: [
        'Porque cada `+=` cria uma `String` nova e copia todo o texto anterior, o que soma O(n²) cópias',
        'Porque `+=` não funciona com `String` dentro de laços',
        'Porque `StringBuilder` comprime o texto',
        'Porque `String` tem limite de 100 caracteres',
      ],
      resposta: 0,
      explicacao: 'Com `String`, a volta k copia os k pedaços anteriores: 1 + 2 + ... + n. O `StringBuilder` acrescenta no buffer, com crescimento geométrico, e o total fica O(n).',
      dica: 'Quantas vezes o texto anterior é copiado a cada `+=`?',
    },
  ],
};

export default episodio;
