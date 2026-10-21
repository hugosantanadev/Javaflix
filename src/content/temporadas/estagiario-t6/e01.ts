import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t6-e01',
  minutos: 12,
  aula,
  armadilhas: [
    '`int[] a, b` declara dois arrays; `int a[], b` declara um array e um `int` comum.',
    '`new int[3] {1, 2, 3}` não compila: ou se informa o tamanho, ou os valores.',
    'O atalho `{1, 2, 3}` só vale na declaração; `var v = {1, 2}` não compila.',
    'Posições começam com o valor padrão: 0, `false`, caractere 0 ou `null`.',
    '`length` é um campo, sem parênteses; `length()` é da `String`.',
    'O último índice é `length - 1`; `i <= v.length` num laço lança `ArrayIndexOutOfBoundsException`.',
    'Atribuir um array a outra variável copia a referência; `==` e `equals` comparam referências.',
    'Guardar um `Integer` num `String[]` visto como `Object[]` compila, mas lança `ArrayStoreException`.',
  ],
  recursos: [
    {
      titulo: 'JLS, capítulo 10: Arrays',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html',
      tipo: 'documentacao',
      porque: 'A definição oficial: declaração, criação, valores padrão, `length` e as exceções de array.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 10.6: Array Initializers',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html#jls-10.6',
      tipo: 'documentacao',
      porque: 'Onde o atalho `{1, 2, 3}` pode aparecer, e por que ele exige uma declaração ou um `new`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Dev.java: Creating Arrays',
      url: 'https://dev.java/learn/language/constructs/basics/arrays/',
      tipo: 'documentacao',
      porque: 'O tutorial atual da Oracle sobre declarar, criar, inicializar e copiar arrays.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Arrays',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html',
      tipo: 'documentacao',
      porque: 'O tutorial clássico, com o diagrama dos índices e os exemplos de criação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Arrays in Java, A Reference Guide',
      url: 'https://www.baeldung.com/java-arrays-guide',
      tipo: 'artigo',
      porque: 'Um guia de referência com todas as formas de declarar, criar e percorrer arrays.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 19, Vetores (Arrays)',
      url: 'https://www.youtube.com/watch?v=HxRb5KLofcI',
      tipo: 'video',
      porque: 'Declaração, criação e acesso a vetores, explicados em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #14, Vetores',
      url: 'https://www.youtube.com/watch?v=KAS94-Lcboc',
      tipo: 'video',
      porque: 'Vetores desenhados na lousa, com índices e laços que os percorrem.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Cobre cada forma de declaração que a prova usa, inclusive as que misturam colchetes.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Understanding Arrays", de "Creating an Array of Primitives" a "Using an Array"',
    },
  ],
  desafio: {
    titulo: 'Notas da turma',
    enunciado:
      'Dado `int[] notas = {7, 5, 9, 3, 8, 10, 6};`, encontre a maior e a menor nota com as posições delas, numa única passada, e depois inverta o array **no lugar**, sem criar outro. Imprima:\n\n```text\nMaior: 10 (posição 5)\nMenor: 3 (posição 3)\nInvertido: [6, 10, 8, 3, 9, 5, 7]\n```',
    dicas: [
      'Guarde o **índice** do maior e do menor, começando em 0, e compare a partir do índice 1.',
      'Para inverter, use dois índices, um no começo e outro no fim, trocando e andando até se cruzarem.',
      'A troca precisa de uma variável temporária.',
    ],
    solucao: `import java.util.Arrays;

public class Notas {
    public static void main(String[] args) {
        int[] notas = {7, 5, 9, 3, 8, 10, 6};
        int iMaior = 0;
        int iMenor = 0;
        for (int i = 1; i < notas.length; i++) {
            if (notas[i] > notas[iMaior]) iMaior = i;
            if (notas[i] < notas[iMenor]) iMenor = i;
        }
        System.out.println("Maior: " + notas[iMaior] + " (posição " + iMaior + ")");
        System.out.println("Menor: " + notas[iMenor] + " (posição " + iMenor + ")");

        for (int i = 0, j = notas.length - 1; i < j; i++, j--) {
            int tmp = notas[i];
            notas[i] = notas[j];
            notas[j] = tmp;
        }
        System.out.println("Invertido: " + Arrays.toString(notas));
    }
}`,
    saida: 'Maior: 10 (posição 5)\nMenor: 3 (posição 3)\nInvertido: [6, 10, 8, 3, 9, 5, 7]',
    comentarios:
      'Guardar o índice, e não o valor, resolve as duas perguntas de uma vez. A inversão faz `length / 2` trocas e não usa memória extra; com tamanho ímpar, o elemento do meio fica onde está. O `for` com duas variáveis, separadas por vírgula, é legal e aparece na prova.',
  },
  exercicios: [
    {
      id: 'estagiario-t6-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais são os índices válidos de um array criado com `new int[5]`?',
      opcoes: ['De 0 a 4', 'De 1 a 5', 'De 0 a 5', 'De 1 a 4'],
      resposta: 0,
      explicacao: 'Os índices começam em 0 e vão até `length - 1`. Um array de tamanho 5 tem as posições 0, 1, 2, 3 e 4.',
    },
    {
      id: 'estagiario-t6-e01-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] v = new int[4];
v[1] = 7;
System.out.println(v.length + " " + v[0] + " " + v[1]);`,
      resposta: '4 0 7',
      explicacao: 'O array tem 4 posições, todas começando com 0. Só a posição 1 recebeu um valor.',
    },
    {
      id: 'estagiario-t6-e01-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais linhas compilam? Escolha três.',
      opcoes: [
        '`int[] a = new int[] {1, 2};`',
        '`int b[] = {1, 2};`',
        '`int[] c = new int[2];`',
        '`int[] d = new int[2] {1, 2};`',
        '`var e = {1, 2};`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Informar tamanho e valores juntos não compila. E o atalho `{1, 2}` precisa de um tipo declarado: com `var`, o compilador não saberia se é `int[]`, `long[]` ou `Integer[]`.',
    },
    {
      id: 'estagiario-t6-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na declaração `int[] a, b[];`, quais são os tipos de `a` e de `b`?',
      opcoes: [
        '`a` é `int[]` e `b` é `int[][]`',
        '`a` e `b` são `int[]`',
        '`a` é `int[]` e `b` é `int`',
        'A declaração não compila',
      ],
      resposta: 0,
      explicacao: 'Os colchetes depois do tipo valem para todas as variáveis, e os depois do nome se somam a eles, só para aquela variável. `b` ganha os dois pares.',
    },
    {
      id: 'estagiario-t6-e01-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `Object[] itens = new String[2];
itens[0] = "caneta";
itens[1] = 10;
System.out.println(itens.length);`,
      opcoes: [
        'Lança `ArrayStoreException`',
        'Imprime `2`',
        'Não compila na linha 3',
        'Lança `ClassCastException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArrayStoreException' },
      explicacao: 'Arrays são covariantes: um `String[]` cabe numa variável `Object[]`, e o compilador aceita guardar um `Integer` ali. Na execução, a JVM confere o tipo real do array e recusa.',
    },
    {
      id: 'estagiario-t6-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String[] nomes = new String[2];
nomes[1] = "Bia";
System.out.println(nomes[0].length() + nomes[1].length());`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `3`',
        'Imprime `03`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'Criar um array de `String` não cria nenhuma `String`: a posição 0 continua `null`, e chamar um método nela lança `NullPointerException`.',
    },
    {
      id: 'estagiario-t6-e01-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o laço percorra o array inteiro. O programa deve imprimir `15`.',
      codigo: `public class Soma {
    public static void main(String[] args) {
        int[] v = {1, 2, 3, 4, 5};
        int soma = 0;
        for (int i = 0; i < v.___; i++) {
            soma += v[i];
        }
        System.out.println(soma);
    }
}`,
      respostas: ['length'],
      saida: '15',
      explicacao: 'Em arrays, o tamanho é o campo `length`, sem parênteses. `length()` é o método da `String`, e `size()` é das coleções.',
    },
    {
      id: 'estagiario-t6-e01-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Criacao {
    public static void main(String[] args) {
        int[] a = new int[3];
        int[] b = new int[] {1, 2, 3};
        int[] c = new int[3] {1, 2, 3};
        System.out.println(a.length + b.length + c.length);
    }
}`,
      resposta: 5,
      explicacao: 'Com valores entre chaves, o tamanho é deduzido e não pode ser informado. As linhas 3 e 4 mostram as duas formas corretas.',
    },
    {
      id: 'estagiario-t6-e01-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int[] a = {1, 2, 3};
int[] b = a;
b[1] = 20;
a = new int[] {4, 5, 6};
System.out.println(a[1] + " " + b[1]);`,
      opcoes: ['`5 20`', '`20 20`', '`5 2`', '`20 5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`b = a` faz as duas variáveis apontarem para o mesmo array, e `b[1] = 20` muda esse array. Depois, `a` passa a apontar para um array novo, mas `b` continua no antigo.',
    },
    {
      id: 'estagiario-t6-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `var precos = {9.9, 15.0, 4.5};
System.out.println(precos.length);`,
      opcoes: ['Não compila', 'Imprime `3`', 'Imprime `3.0`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 1 },
      explicacao: 'O inicializador `{...}` não tem tipo próprio, e `var` precisa de um. Com `var precos = new double[] {9.9, 15.0, 4.5};` compilaria.',
    },
    {
      id: 'estagiario-t6-e01-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int[] notas = {7, 9, 4, 10};
int soma = 0;
for (int i = 0; i < notas.length; i++) {
    soma += notas[i];
}
System.out.println(soma / notas.length + " " + notas[notas.length - 1]);`,
      resposta: '7 10',
      explicacao: 'A soma é 30, e 30 / 4 entre inteiros dá 7. A última posição é `length - 1`, que guarda o 10.',
    },
    {
      id: 'estagiario-t6-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `int[] v = {1, 2, 3};
for (int i = 0; i <= v.length; i++) {
    System.out.print(v[i]);
}`,
      opcoes: [
        'Imprime `123` e lança `ArrayIndexOutOfBoundsException`',
        'Imprime `123`',
        'Lança `ArrayIndexOutOfBoundsException` sem imprimir nada',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException', saida: '123' },
      explicacao: 'Com `<=`, o laço tenta ler `v[3]` depois de imprimir as três posições válidas. O compilador não confere índices: o erro só aparece na execução.',
    },
    {
      id: 'estagiario-t6-e01-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre os valores iniciais são verdadeiras? Escolha duas.',
      codigo: `double[] d = new double[2];
boolean[] b = new boolean[2];
String[] s = new String[2];`,
      opcoes: [
        '`d[0]` vale `0.0`',
        '`s[0]` vale `null`',
        '`b[0]` vale `true`',
        '`s[0]` vale `""`',
        'As posições ficam sem valor até a primeira atribuição',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: '0.0 false null' },
      codigoVerificacao: `double[] d = new double[2];
boolean[] b = new boolean[2];
String[] s = new String[2];
System.out.println(d[0] + " " + b[0] + " " + s[0]);`,
      explicacao: 'Posições de array sempre recebem o valor padrão do tipo, como os campos: `0.0` para `double`, `false` para `boolean` e `null` para referências. Só variáveis locais ficam sem valor.',
    },
    {
      id: 'estagiario-t6-e01-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `char[] letras = {'o', 'i'};
System.out.println(letras);`,
      opcoes: ['`oi`', '`[o, i]`', '`[C@` seguido de um número', '`oi` e um aviso de compilação'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`println` tem uma versão própria para `char[]`, que imprime os caracteres. Para qualquer outro array, ele imprime o tipo e um número, como `[I@1b6d3586`. Já `"" + letras` chamaria o `toString` e mostraria o `[C@...`.',
    },
    {
      id: 'estagiario-t6-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `String[] cores = {"azul", "verde"};
System.out.println(cores.length() + cores[0].length());`,
      opcoes: ['Não compila', 'Imprime `6`', 'Imprime `24`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'Em arrays, `length` é campo: `cores.length()` não compila. Já em `cores[0]`, que é uma `String`, o certo é `length()`, com parênteses.',
    },
  ],
};

export default episodio;
