import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t6-e03',
  minutos: 13,
  aula,
  armadilhas: [
    '`Arrays.sort` ordena o próprio array e devolve `void`: `int[] o = Arrays.sort(v)` não compila.',
    'Textos são ordenados por código de caractere: dígitos, depois maiúsculas, depois minúsculas.',
    '`binarySearch` num array fora de ordem tem resultado indefinido.',
    'Valor não encontrado: `binarySearch` devolve `-(ponto de inserção) - 1`, nunca simplesmente -1.',
    '`a.equals(b)` entre arrays compara referências; o conteúdo se compara com `Arrays.equals`.',
    '`Arrays.compare` só garante o sinal; se um array é o começo do outro, o mais curto vem antes.',
    '`Arrays.asList` tem tamanho fixo: `set` funciona, `add` e `remove` lançam `UnsupportedOperationException`.',
    '`Arrays.asList(new int[] {1, 2, 3})` é uma lista com um único elemento, o próprio array.',
  ],
  ia: {
    uso:
      'A IA conhece bem a classe `Arrays` e escolhe o método certo para cada tarefa. Use-a para explicar o resultado de `binarySearch`, `compare` e `mismatch` em casos de borda, e confira cada resposta rodando: são métodos em que um detalhe (ordem, sinal, tamanho fixo) muda tudo.',
    pedido:
      'Explique o que cada chamada da classe Arrays neste código Java 21 devolve.\n<cole o código aqui>\n- Para binarySearch, diga se o array está ordenado naquele ponto e, se o valor não existir, qual é o ponto de inserção.\n- Para asList, diga se a lista aceita add e se está ligada ao array.\n- Diga quais chamadas alteram o array original.',
    erros: [
      'Chama `binarySearch` num array que não foi ordenado.',
      'Usa `Arrays.asList` com `int[]` ou chama `add` na lista que ele devolve.',
      'Ordena um array que outra parte do código esperava na ordem original.',
    ],
    conferir: [
      'Confira se há um `sort` antes de cada `binarySearch`, no mesmo array.',
      'Teste o `binarySearch` com um valor ausente e confira o ponto de inserção.',
      'Imprima o array original depois do `sort` para ver se ele deveria ter mudado.',
    ],
  },
  recursos: [
    {
      titulo: 'Javadoc de java.util.Arrays',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html',
      tipo: 'documentacao',
      porque: 'O contrato de cada método: o retorno negativo do `binarySearch`, as regras do `compare` e do `mismatch`, os intervalos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Arrays.asList',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#asList(T...)',
      tipo: 'documentacao',
      porque: 'Documenta que a lista é de tamanho fixo e que as mudanças passam para o array, e vice-versa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de System.arraycopy',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html#arraycopy(java.lang.Object,int,java.lang.Object,int,int)',
      tipo: 'documentacao',
      porque: 'A ordem dos cinco parâmetros, a cópia com sobreposição e as exceções que ele pode lançar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the java.util.Arrays Class',
      url: 'https://www.baeldung.com/java-util-arrays',
      tipo: 'artigo',
      porque: 'Um passeio pelos métodos da classe, com exemplos de cada grupo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: How to Copy an Array in Java',
      url: 'https://www.baeldung.com/java-array-copy',
      tipo: 'artigo',
      porque: 'Compara `arraycopy`, `copyOf`, `copyOfRange` e `clone`, e explica a cópia rasa de arrays de objetos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Difference Between Arrays.asList() and List.of()',
      url: 'https://www.baeldung.com/java-arrays-aslist-vs-list-of',
      tipo: 'artigo',
      porque: 'O que cada uma aceita: `set`, `add`, `null` e a ligação com o array.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'CFBCursos: Métodos que irão facilitar sua vida ao trabalhar com Arrays em Java (Aula 30)',
      url: 'https://www.youtube.com/watch?v=h-DohVfEslo',
      tipo: 'video',
      porque: 'Os métodos da classe `Arrays` usados na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Caleb Curry: Array Methods (Arrays.fill, Arrays.asList, Arrays.equals)',
      url: 'https://www.youtube.com/watch?v=GQWbUdb4d58',
      tipo: 'video',
      porque: 'Mostra a lista apoiada no array e a diferença entre `==`, `equals` e `Arrays.equals`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Tim Peters: listsort.txt, a descrição original do TimSort',
      url: 'https://github.com/python/cpython/blob/main/Objects/listsort.txt',
      tipo: 'artigo',
      porque: 'O próprio autor explica como o algoritmo usado pelo `Arrays.sort` com objetos aproveita trechos já ordenados.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de regras do `compare` e do `mismatch` são as que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Understanding Arrays", partes "Sorting", "Searching" e "Comparing"',
    },
  ],
  desafio: {
    titulo: 'Ranking ordenado',
    enunciado:
      'Ordene `int[] pontos = {340, 120, 560, 230, 450};`, encontre a posição do 450 e depois escreva `inserirOrdenado(int[] v, int valor)`, que devolve um array novo, uma posição maior, com o valor no lugar certo. Use o resultado negativo do `binarySearch` para achar a posição, sem percorrer o array. Imprima:\n\n```text\nOrdenado: [120, 230, 340, 450, 560]\n450 está na posição 3\nInserindo 300 na posição 2\nNovo ranking: [120, 230, 300, 340, 450, 560]\n```',
    dicas: [
      'Se `binarySearch` devolve `r` negativo, o ponto de inserção é `-r - 1`.',
      '`Arrays.copyOf(v, v.length + 1)` cria o array maior, já com o começo copiado.',
      'Depois, `System.arraycopy` empurra o resto uma posição para a direita.',
    ],
    solucao: `import java.util.Arrays;

public class Ranking {
    static int[] inserirOrdenado(int[] v, int valor) {
        int pos = Arrays.binarySearch(v, valor);
        if (pos < 0) pos = -pos - 1;
        System.out.println("Inserindo " + valor + " na posição " + pos);
        int[] novo = Arrays.copyOf(v, v.length + 1);
        System.arraycopy(v, pos, novo, pos + 1, v.length - pos);
        novo[pos] = valor;
        return novo;
    }

    public static void main(String[] args) {
        int[] pontos = {340, 120, 560, 230, 450};
        Arrays.sort(pontos);
        System.out.println("Ordenado: " + Arrays.toString(pontos));
        System.out.println("450 está na posição " + Arrays.binarySearch(pontos, 450));
        pontos = inserirOrdenado(pontos, 300);
        System.out.println("Novo ranking: " + Arrays.toString(pontos));
    }
}`,
    saida: 'Ordenado: [120, 230, 340, 450, 560]\n450 está na posição 3\nInserindo 300 na posição 2\nNovo ranking: [120, 230, 300, 340, 450, 560]',
    comentarios:
      'O número negativo do `binarySearch` não é só um "não achei": ele carrega a posição de inserção, encontrada em O(log n). A cópia ainda custa O(n), e é exatamente isso que um `ArrayList` faz ao inserir no meio. Se o valor já existir, `pos` é positivo e o novo entra antes do igual, o que mantém o array ordenado do mesmo jeito.',
  },
  bugs: [
    {
      id: 'estagiario-t6-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: no suitable method found for fill(int[])`.',
      codigo: `import java.util.Arrays;

public class Zera {
    public static void main(String[] args) {
        int[] contadores = {4, 2, 7};
        Arrays.fill(contadores);
        System.out.println(Arrays.toString(contadores));
    }
}`,
      linha: 6,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.util.Arrays;

public class Zera {
    public static void main(String[] args) {
        int[] contadores = {4, 2, 7};
        Arrays.fill(contadores, 0);
        System.out.println(Arrays.toString(contadores));
    }
}`,
      saidaCorrigida: '[0, 0, 0]',
      dica: 'O `fill` preenche o array com o quê? Esse valor foi informado?',
      explicacao: 'O `Arrays.fill` precisa do array e do valor que vai em cada posição; não existe versão só com o array. Para zerar, passe `0`.',
    },
    {
      id: 'estagiario-t6-e03-b02',
      dificuldade: 2,
      sintoma: 'O 13 foi sorteado, mas o programa responde `Não foi dessa vez`.',
      codigo: `import java.util.Arrays;

public class Sorteio {
    public static void main(String[] args) {
        int[] sorteados = {7, 13, 21};
        boolean ganhou = Arrays.asList(sorteados).contains(13);
        System.out.println(ganhou ? "Ganhou!" : "Não foi dessa vez");
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'Não foi dessa vez' },
      correcao: `import java.util.Arrays;

public class Sorteio {
    public static void main(String[] args) {
        Integer[] sorteados = {7, 13, 21};
        boolean ganhou = Arrays.asList(sorteados).contains(13);
        System.out.println(ganhou ? "Ganhou!" : "Não foi dessa vez");
    }
}`,
      saidaCorrigida: 'Ganhou!',
      dica: 'Quantos elementos tem a lista que o `asList` montou a partir de um `int[]`?',
      explicacao: 'O `asList` trabalha com objetos, e um `int[]` inteiro é um objeto só: a lista tem um elemento, o próprio array, e não contém o número 13. Com `Integer[]`, cada número vira um elemento da lista.',
    },
    {
      id: 'estagiario-t6-e03-b03',
      dificuldade: 3,
      sintoma: 'A ordem de chegada deveria continuar `[30, 10, 20]`, mas sai ordenada.',
      codigo: `import java.util.Arrays;

public class Ranking {
    public static void main(String[] args) {
        int[] chegada = {30, 10, 20};
        int[] ordenado = chegada;
        Arrays.sort(ordenado);
        System.out.println("Ordem de chegada: " + Arrays.toString(chegada));
        System.out.println("Menor tempo: " + ordenado[0]);
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: 'Ordem de chegada: [10, 20, 30]\nMenor tempo: 10' },
      correcao: `import java.util.Arrays;

public class Ranking {
    public static void main(String[] args) {
        int[] chegada = {30, 10, 20};
        int[] ordenado = Arrays.copyOf(chegada, chegada.length);
        Arrays.sort(ordenado);
        System.out.println("Ordem de chegada: " + Arrays.toString(chegada));
        System.out.println("Menor tempo: " + ordenado[0]);
    }
}`,
      saidaCorrigida: 'Ordem de chegada: [30, 10, 20]\nMenor tempo: 10',
      dica: 'Quantos arrays existem neste programa? O `sort` ordena qual deles?',
      explicacao: 'Atribuir um array a outra variável copia a referência: `ordenado` e `chegada` são o mesmo array, e o `sort` o altera no lugar. Com `Arrays.copyOf`, `ordenado` vira um array novo, e o original fica como estava.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t6-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado?',
      codigo: `int[] v = {3, 1, 2};
int[] ordenado = Arrays.sort(v);
System.out.println(Arrays.toString(ordenado));`,
      opcoes: ['Não compila', 'Imprime `[1, 2, 3]`', 'Imprime `[3, 1, 2]`', 'Imprime `null`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: '`Arrays.sort` devolve `void`: ele ordena o próprio array. Bastaria `Arrays.sort(v);` e imprimir `v`.',
      dica: 'O que o `Arrays.sort` devolve?',
    },
    {
      id: 'estagiario-t6-e03-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] v = {5, 3, 8, 1};
Arrays.sort(v);
System.out.println(Arrays.toString(v) + " " + v[0]);`,
      resposta: '[1, 3, 5, 8] 1',
      explicacao: 'Depois do `sort`, o próprio `v` está em ordem crescente, e a posição 0 guarda o menor valor.',
      dica: 'O `sort` muda o próprio array; depois, a posição 0 tem o menor.',
    },
    {
      id: 'estagiario-t6-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int[] v = {10, 20, 30, 40};
System.out.println(Arrays.binarySearch(v, 30) + " " + Arrays.binarySearch(v, 25));`,
      opcoes: ['`2 -3`', '`2 -2`', '`3 -3`', '`2 -1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O 30 está na posição 2. O 25 deveria entrar na posição 2, entre o 20 e o 30, então o resultado é -2 - 1 = -3.',
      dica: 'O 30 está na posição 2. O 25 entraria em qual posição? Aplique `-(posição) - 1`.',
    },
    {
      id: 'estagiario-t6-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que o código imprime?',
      codigo: `int[] v = {9, 2, 7, 4};
System.out.println(Arrays.binarySearch(v, 7));`,
      opcoes: [
        'O resultado não é previsível',
        '`2`, a posição do 7',
        '`-1`, porque o array não está ordenado',
        'Lança `IllegalArgumentException`',
      ],
      resposta: 0,
      explicacao: 'A busca binária pressupõe ordem. Num array fora de ordem, a documentação diz que o resultado é indefinido, e a prova espera exatamente essa resposta. O método não confere a ordem, porque isso custaria O(n).',
      dica: 'O array está ordenado? O que a documentação diz nesse caso?',
    },
    {
      id: 'estagiario-t6-e03-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `String[] s = {"b", "B", "a", "1", "A"};
Arrays.sort(s);
System.out.println(Arrays.toString(s));`,
      resposta: '[1, A, B, a, b]',
      explicacao: 'A ordem natural da `String` compara os códigos dos caracteres: dígitos (48 a 57) vêm antes das maiúsculas (65 a 90), que vêm antes das minúsculas (97 a 122).',
      dica: 'A ordem é a dos códigos: dígitos, depois maiúsculas, depois minúsculas.',
    },
    {
      id: 'estagiario-t6-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int[] a = {1, 2};
int[] b = {1, 2, 3};
int[] c = {1, 3};
System.out.println((Arrays.compare(a, b) < 0) + " " + (Arrays.compare(c, b) > 0) + " " + Arrays.mismatch(a, b));`,
      opcoes: ['`true true 2`', '`true false 2`', '`false true -1`', '`true true -1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`a` é o começo de `b`, então vem antes: negativo. Entre `c` e `b`, a posição 1 decide, e 3 é maior que 2: positivo. O `mismatch` de `a` e `b` é 2, a primeira posição que só existe num deles.',
      dica: 'O prefixo mais curto vem antes; o primeiro elemento diferente decide.',
    },
    {
      id: 'estagiario-t6-e03-q07',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sobre `List<String> l = Arrays.asList(arr);`, com `arr` um `String[]`, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`l.set(0, "x")` também muda `arr[0]`',
        '`l.add("y")` lança `UnsupportedOperationException`',
        '`l` é uma cópia independente de `arr`',
        '`l` não aceita nem `set`, como a `List.of`',
        '`Arrays.asList(new int[] {1, 2, 3}).size()` vale 3',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'x add falha 1' },
      codigoVerificacao: `String[] arr = {"a", "b"};
List<String> l = Arrays.asList(arr);
l.set(0, "x");
String r;
try {
    l.add("y");
    r = "add ok";
} catch (UnsupportedOperationException e) {
    r = "add falha";
}
System.out.println(arr[0] + " " + r + " " + Arrays.asList(new int[] {1, 2, 3}).size());`,
      explicacao: 'A lista é uma "janela" para o array: mudanças passam de um para o outro, e o tamanho não pode mudar. Com `int[]`, o array inteiro vira um único elemento, e o tamanho é 1.',
      dica: 'A lista é uma janela para o array, com tamanho fixo.',
    },
    {
      id: 'estagiario-t6-e03-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que compara o conteúdo dos dois arrays. O programa deve imprimir `iguais`.',
      codigo: `import java.util.Arrays;

public class Compara {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        int[] b = {1, 2, 3};
        if (Arrays.___(a, b)) {
            System.out.println("iguais");
        } else {
            System.out.println("diferentes");
        }
    }
}`,
      respostas: ['equals'],
      saida: 'iguais',
      explicacao: '`Arrays.equals` confere tamanho e elementos, na ordem. `a.equals(b)` daria `false`, porque arrays herdam o `equals` de `Object`, que compara referências.',
      dica: 'O método de `Arrays` que compara o conteúdo tem o mesmo nome do de `Object`.',
    },
    {
      id: 'estagiario-t6-e03-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] v = {4, 5, 6};
int[] a = Arrays.copyOf(v, 4);
int[] b = Arrays.copyOfRange(v, 0, 2);
System.out.println(Arrays.toString(a) + Arrays.toString(b));`,
      resposta: '[4, 5, 6, 0][4, 5]',
      explicacao: '`copyOf` com tamanho maior completa com o valor padrão, 0. `copyOfRange` inclui o início e exclui o fim: posições 0 e 1.',
      dica: 'O `copyOf` completa com o valor padrão; o `copyOfRange` exclui o fim.',
    },
    {
      id: 'estagiario-t6-e03-q10',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.Arrays;

public class Ordena {
    public static void main(String[] args) {
        int[] v = {3, 1, 2};
        Arrays.sort(v);
        v.sort();
        System.out.println(Arrays.toString(v));
    }
}`,
      resposta: 7,
      explicacao: 'Um array só tem o campo `length` e os métodos de `Object`, com o `clone` tornado público. Ordenar, buscar e imprimir é com os métodos estáticos da classe `Arrays`.',
      dica: 'Arrays têm métodos de instância como `sort`?',
    },
    {
      id: 'estagiario-t6-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `List<Integer> numeros = Arrays.asList(1, 2, 3);
numeros.set(0, 10);
numeros.add(4);
System.out.println(numeros);`,
      opcoes: [
        'Lança `UnsupportedOperationException`',
        'Imprime `[10, 2, 3, 4]`',
        'Imprime `[1, 2, 3, 4]`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException' },
      explicacao: 'O `set` funciona, porque não muda o tamanho. O `add` tentaria aumentar a lista, e a lista do `asList` tem tamanho fixo. Para uma lista que cresce, use `new ArrayList<>(Arrays.asList(1, 2, 3))`.',
      dica: 'O `set` funciona; e o `add`, numa lista de tamanho fixo?',
    },
    {
      id: 'estagiario-t6-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `Integer[] arr = {3, 1, 2};
List<Integer> lista = Arrays.asList(arr);
Arrays.sort(arr);
System.out.println(lista);`,
      opcoes: ['`[1, 2, 3]`', '`[3, 1, 2]`', '`[3, 2, 1]`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A lista não guarda cópia nenhuma: ela lê o array. Ordenar o array muda o que a lista mostra.',
      dica: 'A lista está apoiada no array. O que ela vê depois do `sort`?',
    },
    {
      id: 'estagiario-t6-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int[] v = new int[5];
Arrays.fill(v, 1, 3, 9);
System.out.println(Arrays.toString(v));`,
      opcoes: ['`[0, 9, 9, 0, 0]`', '`[0, 9, 9, 9, 0]`', '`[9, 9, 9, 0, 0]`', '`[1, 3, 9, 0, 0]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os dois números do meio são o intervalo: do índice 1 (incluído) ao 3 (excluído). Só as posições 1 e 2 recebem o 9.',
      dica: 'O intervalo do `fill` inclui o início e exclui o fim.',
    },
    {
      id: 'estagiario-t6-e03-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que `Arrays.sort` usa o TimSort para arrays de objetos e o Dual-Pivot Quicksort para primitivos?',
      opcoes: [
        'Com objetos, a ordenação precisa ser estável, mantendo a ordem original entre elementos iguais; com primitivos, elementos iguais são indistinguíveis',
        'Porque o quicksort não consegue comparar objetos',
        'Porque o TimSort é sempre mais rápido, mas não funciona com números',
        'Por compatibilidade com versões antigas, sem diferença de comportamento',
      ],
      resposta: 0,
      explicacao: 'Dois objetos "iguais" para a ordenação podem ser diferentes em outros campos, e a ordem entre eles importa. O TimSort é estável e aproveita trechos já ordenados. Com primitivos, a estabilidade não faz diferença, e o quicksort de dois pivôs costuma ser mais rápido.',
      dica: 'Pense na estabilidade: o que acontece com a ordem de elementos iguais?',
    },
    {
      id: 'estagiario-t6-e03-q15',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] v = {1, 2, 3, 4, 5};
System.arraycopy(v, 0, v, 1, 3);
System.out.println(Arrays.toString(v));`,
      resposta: '[1, 1, 2, 3, 5]',
      explicacao: 'Com origem e destino no mesmo array, o `arraycopy` funciona como se copiasse primeiro para um array temporário: os valores 1, 2 e 3 vão para as posições 1, 2 e 3. A posição 0 e a 4 não mudam.',
      dica: 'Origem e destino são o mesmo array: as posições 0, 1 e 2 vão para 1, 2 e 3.',
    },
  ],
};

export default episodio;
