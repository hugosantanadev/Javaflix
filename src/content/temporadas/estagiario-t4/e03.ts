import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t4-e03',
  minutos: 11,
  aula,
  armadilhas: [
    'O for-each funciona com arrays e `Iterable`. `Map` não é `Iterable`.',
    'A variável do laço é uma cópia: `x = ...` não altera o array.',
    'Se o elemento é um objeto, alterar o objeto pela variável altera o que está no array.',
    'O tipo da variável aceita ampliação e boxing, nunca redução: `for (int x : arrayDeLong)` não compila.',
    'Remover da lista dentro do for-each costuma lançar `ConcurrentModificationException`.',
    'Remover o penúltimo elemento não lança exceção: o laço termina sem visitar o último.',
    'Array ou coleção `null` no for-each lança `NullPointerException`.',
  ],
  ia: {
    uso:
      'A IA converte laços com índice em for-each, e o contrário, e explica bem a diferença entre mudar a variável e mudar o objeto. O cuidado maior é com remoção durante o laço: é um erro que os modelos repetem com frequência, porque o código parece certo e às vezes passa no teste.',
    pedido:
      'Reescreva o laço Java 21 abaixo usando for-each quando o índice não for necessário.\n<cole o laço aqui>\n- Se o laço remove elementos da coleção, use removeIf ou um Iterator com it.remove(), nunca remove dentro do for-each.\n- Diga se alguma atribuição à variável do laço deixaria de ter efeito no array depois da troca.\n- Liste os casos de teste: coleção vazia, um elemento e o elemento removido no começo, no meio e no fim.',
    erros: [
      'Remove elementos da coleção dentro de um for-each sobre ela mesma.',
      'Converte para for-each um laço que atribuía `v[i] = ...`, e a atribuição passa a mudar só a cópia.',
      'Tenta percorrer um `Map` diretamente, sem `entrySet`, `keySet` ou `values`.',
    ],
    conferir: [
      'Teste a remoção com o elemento alvo no começo, no meio e no fim da lista.',
      'Imprima o array depois do laço para ver se as mudanças ficaram.',
      'Compile: o `javac` recusa o for-each sobre um `Map` e as reduções de tipo.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: The for Statement',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html',
      tipo: 'documentacao',
      porque: 'O fim da página apresenta o for aprimorado e recomenda usá-lo sempre que possível.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.14.2: The enhanced for statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.14.2',
      tipo: 'documentacao',
      porque: 'A tradução exata do for-each em `for` com índice e em laço com `Iterator`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Iterable',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Iterable.html',
      tipo: 'documentacao',
      porque: 'A interface que qualquer classe implementa para poder ser usada num for-each.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de ConcurrentModificationException',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ConcurrentModificationException.html',
      tipo: 'documentacao',
      porque: 'A própria documentação avisa que a exceção é lançada "em base de melhor esforço", sem garantia.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Avoiding the ConcurrentModificationException in Java',
      url: 'https://www.baeldung.com/java-concurrentmodificationexception',
      tipo: 'artigo',
      porque: 'As formas seguras de remover durante a iteração: `Iterator.remove`, `removeIf` e coleta separada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #14, Vetores',
      url: 'https://www.youtube.com/watch?v=KAS94-Lcboc',
      tipo: 'video',
      porque: 'Arrays percorridos com `for` e com for-each, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro compara o for-each com o `for` clássico e mostra quais tipos podem ser percorridos.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seção sobre o for-each',
    },
  ],
  desafio: {
    titulo: 'Estatísticas de notas',
    enunciado:
      'Com as notas `{7, 9, 4, 10, 6}`, use for-each para calcular a mínima, a máxima e a média, e depois conte quantas notas ficaram acima da média. Imprima:\n\n```text\nmínima: 4\nmáxima: 10\nmédia: 7.2\nacima da média: 2\n```',
    dicas: [
      'Comece mínima e máxima com o primeiro elemento, ou com `Integer.MAX_VALUE` e `Integer.MIN_VALUE`.',
      'A média precisa de duas passadas pelo array: uma para somar, outra para comparar cada nota com o resultado.',
      'Divida em `double`: `(double) soma / notas.length`.',
    ],
    solucao: `public class Estatisticas {
    public static void main(String[] args) {
        int[] notas = {7, 9, 4, 10, 6};
        int minima = Integer.MAX_VALUE;
        int maxima = Integer.MIN_VALUE;
        int soma = 0;
        for (int n : notas) {
            minima = Math.min(minima, n);
            maxima = Math.max(maxima, n);
            soma += n;
        }
        double media = (double) soma / notas.length;
        int acima = 0;
        for (int n : notas) {
            if (n > media) {
                acima++;
            }
        }
        System.out.println("mínima: " + minima);
        System.out.println("máxima: " + maxima);
        System.out.println("média: " + media);
        System.out.println("acima da média: " + acima);
    }
}`,
    saida: 'mínima: 4\nmáxima: 10\nmédia: 7.2\nacima da média: 2',
    comentarios:
      'Duas passadas são inevitáveis: só dá para saber quem está acima da média depois de conhecer a média. O for-each é a escolha natural aqui, porque nenhuma conta depende da posição. Começar o mínimo com `Integer.MAX_VALUE` garante que a primeira nota sempre o substitui, mesmo que todas sejam negativas.',
  },
  bugs: [
    {
      id: 'estagiario-t4-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: for-each not applicable to expression type`.',
      codigo: `import java.util.*;

public class Estoque {
    public static void main(String[] args) {
        Map<String, Integer> estoque = new TreeMap<>(Map.of("caneta", 10, "lápis", 4));
        for (String produto : estoque) {
            System.out.println(produto);
        }
    }
}`,
      linha: 6,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.util.*;

public class Estoque {
    public static void main(String[] args) {
        Map<String, Integer> estoque = new TreeMap<>(Map.of("caneta", 10, "lápis", 4));
        for (String produto : estoque.keySet()) {
            System.out.println(produto);
        }
    }
}`,
      saidaCorrigida: 'caneta\nlápis',
      dica: 'O for-each funciona com arrays e com `Iterable`. Um `Map` é uma dessas coisas?',
      explicacao: 'Um `Map` não é `Iterable`: ele tem chaves e valores, e o laço não saberia o que entregar. Escolha a visão que quer percorrer: `keySet()` para as chaves, `values()` para os valores ou `entrySet()` para os pares.',
    },
    {
      id: 'estagiario-t4-e03-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: possible lossy conversion from long to int`.',
      codigo: `public class Visitas {
    public static void main(String[] args) {
        long[] porDia = {1200L, 3400L, 2800L};
        long total = 0;
        for (int v : porDia) {
            total += v;
        }
        System.out.println("Total: " + total);
    }
}`,
      linha: 5,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Visitas {
    public static void main(String[] args) {
        long[] porDia = {1200L, 3400L, 2800L};
        long total = 0;
        for (long v : porDia) {
            total += v;
        }
        System.out.println("Total: " + total);
    }
}`,
      saidaCorrigida: 'Total: 7400',
      dica: 'Os elementos do array são `long`. Eles cabem numa variável `int` sem cast?',
      explicacao: 'O tipo da variável do for-each precisa aceitar cada elemento sem perda: o mesmo tipo, uma ampliação ou boxing. Um `long` não cabe num `int`, e o for-each não tem onde pôr um cast.',
    },
    {
      id: 'estagiario-t4-e03-b03',
      dificuldade: 3,
      sintoma: 'O programa para com `ConcurrentModificationException` ao tirar do carrinho os itens marcados com "x".',
      codigo: `import java.util.*;

public class Carrinho {
    public static void main(String[] args) {
        List<String> itens = new ArrayList<>(List.of("x-livro", "caneta", "x-mochila", "caderno"));
        for (String item : itens) {
            if (item.startsWith("x-")) itens.remove(item);
        }
        System.out.println(itens);
    }
}`,
      linha: 7,
      efeito: { tipo: 'excecao', nome: 'ConcurrentModificationException' },
      correcao: `import java.util.*;

public class Carrinho {
    public static void main(String[] args) {
        List<String> itens = new ArrayList<>(List.of("x-livro", "caneta", "x-mochila", "caderno"));
        for (Iterator<String> it = itens.iterator(); it.hasNext(); ) {
            if (it.next().startsWith("x-")) it.remove();
        }
        System.out.println(itens);
    }
}`,
      saidaCorrigida: '[caneta, caderno]',
      dica: 'O for-each usa um iterador escondido. Quem está mexendo na lista enquanto ele a percorre?',
      explicacao: 'A lista mudou por fora do iterador do for-each, e na volta seguinte o `next()` percebe e lança a exceção. Removendo pelo próprio iterador, com `it.remove()`, a lista e o iterador continuam de acordo. Com lambdas, `itens.removeIf(i -> i.startsWith("x-"))` faz o mesmo numa linha.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t4-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Com o que o for-each funciona?',
      opcoes: [
        'Com arrays e com qualquer objeto que implemente `Iterable`',
        'Só com arrays',
        'Só com `List`',
        'Com arrays, listas e mapas',
      ],
      resposta: 0,
      explicacao: '`List`, `Set` e as outras coleções implementam `Iterable`. `Map` não implementa: percorre-se `entrySet()`, `keySet()` ou `values()`.',
      dica: 'O for-each precisa de algo que saiba entregar um elemento depois do outro. Arrays sabem; e as coleções?',
    },
    {
      id: 'estagiario-t4-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] v = {3, 8, 1, 6};
int maior = v[0], soma = 0;
for (int x : v) {
    if (x > maior) maior = x;
    soma += x;
}
System.out.println(maior + " " + soma);`,
      resposta: '8 18',
      explicacao: 'O laço visita 3, 8, 1 e 6, guardando o maior e acumulando a soma: 3 + 8 + 1 + 6 = 18.',
      dica: 'O laço passa por todos os elementos, atualizando o maior e somando ao mesmo tempo.',
    },
    {
      id: 'estagiario-t4-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int[] v = {1, 2, 3};
for (int x : v) x++;
System.out.println(v[0] + v[1] + v[2]);`,
      opcoes: ['`6`', '`9`', '`123`', '`234`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada volta copia o elemento para `x`, e o `x++` altera só a cópia. O array continua {1, 2, 3}, e a soma é 6.',
      dica: 'A variável do laço é uma cópia do elemento. O `x++` muda o array?',
    },
    {
      id: 'estagiario-t4-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `List<String> itens = new ArrayList<>(List.of("a", "b", "c"));
for (String s : itens) {
    if (s.equals("b")) itens.remove(s);
}
System.out.println(itens);`,
      opcoes: [
        'Imprime `[a, c]`',
        'Lança `ConcurrentModificationException`',
        'Imprime `[a, b, c]`',
        'Imprime `[a]`',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: '[a, c]' },
      explicacao: 'Remover o penúltimo elemento deixa o iterador numa posição igual ao novo tamanho da lista. O `hasNext()` devolve falso e o laço termina sem chamar o `next()` que lançaria a exceção. O "c" nem é visitado.',
      dica: 'Remover o penúltimo elemento é o caso especial: o laço termina antes de o iterador conferir a lista.',
    },
    {
      id: 'estagiario-t4-e03-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `List<Integer> numeros = new ArrayList<>(List.of(1, 2, 3, 4));
for (Integer n : numeros) {
    if (n % 2 == 0) numeros.remove(n);
}
System.out.println(numeros);`,
      opcoes: [
        'Lança `ConcurrentModificationException`',
        'Imprime `[1, 3]`',
        'Imprime `[1, 3, 4]`',
        'Lança `IndexOutOfBoundsException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ConcurrentModificationException' },
      explicacao: 'Ao remover o 2, a lista muda por fora do iterador. Ainda há elementos a visitar, e o próximo `next()` detecta a modificação. Como `n` é `Integer`, `remove(n)` remove pelo valor, não pela posição. O certo seria `numeros.removeIf(n -> n % 2 == 0)`.',
      dica: 'O primeiro par removido é o 2, que não é o penúltimo. O que acontece na volta seguinte?',
    },
    {
      id: 'estagiario-t4-e03-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`long[] g = {1L}; for (int x : g) {}`',
        '`Map<String, Integer> m = Map.of(); for (String k : m) {}`',
        '`int[] v = {1}; for (long x : v) {}`',
        '`List<String> l = List.of(); for (var s : l) {}`',
        '`int[] v = {1}; for (final int x : v) {}`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: '`long` para `int` é redução, que exige cast. E `Map` não é `Iterable`. Ampliar de `int` para `long`, usar `var` e declarar a variável `final` são permitidos.',
      dica: 'O tipo da variável precisa aceitar cada elemento sem perda, e um `Map` não é `Iterable`.',
    },
    {
      id: 'estagiario-t4-e03-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a sintaxe do for-each. O programa deve imprimir `3`.',
      codigo: `import java.util.List;

public class Conta {
    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia", "Caio");
        int total = 0;
        for (String nome ___ nomes) {
            total++;
        }
        System.out.println(total);
    }
}`,
      respostas: [':'],
      saida: '3',
      explicacao: 'O for-each usa dois-pontos entre a variável e o que será percorrido: "para cada nome em nomes".',
      dica: 'Qual símbolo separa a variável da coleção no for-each?',
    },
    {
      id: 'estagiario-t4-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `StringBuilder[] textos = {new StringBuilder("ok"), new StringBuilder("ja")};
for (StringBuilder sb : textos) {
    sb.append("va");
    sb = new StringBuilder("?");
}
System.out.println(textos[0] + " " + textos[1]);`,
      opcoes: ['`okva java`', '`? ?`', '`ok ja`', '`okva? java?`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `append` altera o objeto para o qual a cópia aponta, que é o mesmo do array. Já `sb = new ...` só redireciona a cópia, sem tocar no array.',
      dica: 'O `append` muda o objeto compartilhado; a atribuição a `sb` muda só a cópia.',
    },
    {
      id: 'estagiario-t4-e03-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Mapa {
    public static void main(String[] args) {
        Map<String, Integer> idades = new HashMap<>();
        idades.put("Ana", 30);
        for (String nome : idades.keySet()) {
            System.out.println(nome);
        }
        for (String nome : idades) {
            System.out.println(nome);
        }
    }
}`,
      resposta: 10,
      explicacao: '`Map` não implementa `Iterable`, então não pode ser percorrido diretamente. A linha 7 mostra o jeito certo: percorrer a visão das chaves.',
      dica: 'Qual dos dois laços tenta percorrer o próprio `Map`, sem escolher uma visão dele?',
    },
    {
      id: 'estagiario-t4-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `char[] letras = {'a', 'b'};
for (int c : letras) System.out.println(c);`,
      opcoes: ['`97\n98`', '`a\nb`', 'Não compila: `char` não converte para `int`', '`a97\nb98`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`char` para `int` é uma ampliação, permitida no for-each. A variável é `int`, então o `println` mostra os códigos 97 e 98.',
      dica: 'Um `char` amplia para `int` sem cast. O que o `println` mostra de um `int`?',
    },
    {
      id: 'estagiario-t4-e03-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `Map<String, Integer> estoque = new TreeMap<>(Map.of("uva", 2, "kiwi", 7));
int total = 0;
for (Map.Entry<String, Integer> e : estoque.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
    total += e.getValue();
}
System.out.println(total);`,
      resposta: 'kiwi=7\nuva=2\n9',
      explicacao: '`entrySet()` devolve os pares chave e valor, e o `TreeMap` os mantém em ordem alfabética das chaves: kiwi antes de uva.',
      dica: 'O `TreeMap` percorre as chaves em ordem alfabética. Some os valores no caminho.',
    },
    {
      id: 'estagiario-t4-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `int[] v = null;
for (int x : v) System.out.println(x);
System.out.println("fim");`,
      opcoes: ['Lança `NullPointerException`', 'Imprime `fim`', 'Imprime nada', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'O for-each lê o tamanho do array logo no começo, e ler o `length` de `null` lança a exceção. Ele não trata `null` como uma coleção vazia.',
      dica: 'O for-each precisa pedir os elementos ao array. E se o array for `null`?',
    },
    {
      id: 'estagiario-t4-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o jeito seguro de remover os elementos pares de uma `ArrayList<Integer>` chamada `lista`?',
      opcoes: [
        '`lista.removeIf(n -> n % 2 == 0);`',
        '`for (Integer n : lista) if (n % 2 == 0) lista.remove(n);`',
        '`for (int i = 0; i < lista.size(); i++) lista.remove(i);`',
        'Não existe jeito seguro de remover de uma lista',
      ],
      resposta: 0,
      explicacao: '`removeIf` percorre e remove de forma controlada pela própria lista. O for-each com `remove` lança `ConcurrentModificationException` (ou pula elementos), e o terceiro remove por posição, pulando um elemento a cada remoção.',
      dica: 'Procure o método das coleções feito para remover por uma condição, sem laço manual.',
    },
    {
      id: 'estagiario-t4-e03-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são limitações do for-each em relação ao `for` clássico? Escolha três.',
      opcoes: [
        'Não dá acesso ao índice do elemento',
        'Não percorre de trás para a frente',
        'Não permite trocar o elemento do array atribuindo à variável do laço',
        'Não funciona com `List`',
        'Não funciona com arrays de primitivos',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O for-each visita todos os elementos, em ordem, sem expor a posição, e a variável é uma cópia. Ele funciona com listas e com arrays de qualquer tipo.',
      dica: 'Pense no que o for-each não tem: índice, direção e acesso à posição do array.',
    },
    {
      id: 'estagiario-t4-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int[][] m = {{1, 2}, {3}, {}};
int s = 0;
for (int[] linha : m)
    for (int x : linha)
        s += x;
System.out.println(s);`,
      opcoes: ['`6`', '`3`', 'Lança `ArrayIndexOutOfBoundsException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um array bidimensional é um array de arrays: o laço externo recebe cada linha (`int[]`), e o interno percorre os números dela. A linha vazia não causa erro: o laço interno roda zero vezes.',
      dica: 'O laço externo pega cada linha, e o interno soma os números dela; a linha vazia não soma nada.',
    },
  ],
};

export default episodio;
