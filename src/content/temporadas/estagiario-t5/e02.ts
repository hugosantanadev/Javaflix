import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t5-e02',
  minutos: 13,
  aula,
  armadilhas: [
    '`substring(inicio, fim)` exclui o `fim`: `"Java".substring(1, 3)` é `"av"`.',
    '`substring(s.length())` devolve `""`; `inicio > fim` lança `StringIndexOutOfBoundsException`.',
    '`indexOf` devolve −1 quando não acha, e não lança exceção.',
    '`replaceAll` e `split` usam expressão regular: `.` casa com qualquer caractere.',
    '`split` descarta as strings vazias do final, mas não as do meio.',
    '`replace` troca todas as ocorrências, não só a primeira.',
    '`compareTo` devolve a diferença entre os caracteres; maiúsculas vêm antes das minúsculas.',
    '`concat` só aceita `String`: `"a".concat(\'b\')` não compila.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de String',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html',
      tipo: 'documentacao',
      porque: 'A lista completa de métodos, com a versão em que cada um apareceu.',
      gratuito: true,
      idioma: 'en',
      onde: 'Tabela "Method Summary"',
    },
    {
      titulo: 'Javadoc de String.split(String, int)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#split(java.lang.String,int)',
      tipo: 'documentacao',
      porque: 'A tabela que mostra o efeito do limite e por que as strings vazias do final somem.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Manipulating Characters in a String',
      url: 'https://docs.oracle.com/javase/tutorial/java/data/manipstrings.html',
      tipo: 'documentacao',
      porque: 'As tabelas de `substring`, `indexOf`, `replace` e `split`, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Comparing Strings and Portions of Strings',
      url: 'https://docs.oracle.com/javase/tutorial/java/data/comparestrings.html',
      tipo: 'documentacao',
      porque: '`compareTo`, `startsWith`, `regionMatches` e companhia.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Formatter',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Formatter.html',
      tipo: 'documentacao',
      porque: 'A sintaxe completa dos marcadores de `String.format`: largura, precisão, alinhamento e conversões.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Strings',
      url: 'https://dev.java/learn/language/constructs/numbers-strings/strings/',
      tipo: 'tutorial',
      porque: 'Os métodos mais usados de `String` no tutorial atual da Oracle.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Split a String in Java',
      url: 'https://www.baeldung.com/java-split-string',
      tipo: 'artigo',
      porque: 'As armadilhas do `split` com expressões regulares e as alternativas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Codando Simples: Java, Aula 23, Os principais métodos da classe String',
      url: 'https://www.youtube.com/watch?v=-2RvOvNYA0A',
      tipo: 'video',
      porque: 'Os métodos de `String` usados no dia a dia, demonstrados em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A lista de métodos de `String` cobrados na prova, com as pegadinhas de índice de cada um.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Important String Methods"',
    },
  ],
  desafio: {
    titulo: 'Formatar nomes',
    enunciado:
      'Escreva `formatar(String nome)`, que recebe um nome completo com espaços sobrando e letras bagunçadas e devolve cada palavra com a primeira letra maiúscula e o resto minúsculo, separadas por um único espaço. Teste e imprima:\n\n```text\n[Ana Maria Silva]\n[João Pedro]\n[Bia]\n```\n\npara `"  aNA   maria SILVA "`, `"joão pedro"` e `"BIA"`.',
    dicas: [
      'Comece com `strip()` e divida com `split("\\\\s+")`: a expressão `\\s+` casa com um ou mais espaços.',
      'Para cada palavra: `substring(0, 1).toUpperCase() + substring(1).toLowerCase()`.',
      'Junte o resultado com `String.join(" ", partes)`.',
    ],
    solucao: `public class Nomes {
    static String formatar(String nome) {
        String[] partes = nome.strip().split("\\\\s+");
        for (int i = 0; i < partes.length; i++) {
            String p = partes[i];
            partes[i] = p.substring(0, 1).toUpperCase() + p.substring(1).toLowerCase();
        }
        return String.join(" ", partes);
    }

    public static void main(String[] args) {
        System.out.println("[" + formatar("  aNA   maria SILVA ") + "]");
        System.out.println("[" + formatar("joão pedro") + "]");
        System.out.println("[" + formatar("BIA") + "]");
    }
}`,
    saida: '[Ana Maria Silva]\n[João Pedro]\n[Bia]',
    comentarios:
      'O `strip()` antes do `split` é essencial: com espaços no começo, o primeiro pedaço seria uma string vazia, e o `substring(0, 1)` lançaria exceção. A expressão `\\s+` trata vários espaços seguidos como um separador só. Para nomes como "da Silva", em que a preposição fica minúscula, seria preciso uma lista de exceções.',
  },
  exercicios: [
    {
      id: 'estagiario-t5-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("Javaflix".substring(4));`,
      opcoes: ['`flix`', '`aflix`', '`Java`', '`fli`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com um argumento, `substring` vai do índice informado até o fim. Os índices começam em 0: J0 a1 v2 a3 f4.',
    },
    {
      id: 'estagiario-t5-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `String s = "programa";
System.out.println(s.substring(1, 4));
System.out.println(s.indexOf('a'));
System.out.println(s.lastIndexOf('a'));
System.out.println(s.indexOf("gra"));`,
      resposta: 'rog\n5\n7\n3',
      explicacao: '`substring(1, 4)` pega as posições 1, 2 e 3 (o 4 é excluído). O primeiro \'a\' está na posição 5, e o último na 7. "gra" começa na posição 3.',
    },
    {
      id: 'estagiario-t5-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `System.out.println("abc".substring(2, 1));`,
      opcoes: [
        'Lança `StringIndexOutOfBoundsException`',
        'Imprime uma linha vazia',
        'Imprime `b`',
        'Imprime `cb`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'StringIndexOutOfBoundsException' },
      explicacao: 'O início não pode ser maior que o fim. `substring` não inverte a ordem nem devolve vazio nesse caso: lança exceção.',
    },
    {
      id: 'estagiario-t5-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("  Java  ".trim().concat("flix").toUpperCase().length());`,
      opcoes: ['`8`', '`12`', '`JAVAFLIX`', '`4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada método devolve uma `String` nova, sobre a qual o próximo é chamado: "Java", "Javaflix", "JAVAFLIX". O último devolve o tamanho, 8.',
    },
    {
      id: 'estagiario-t5-e02-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Com `String s = "a.b.c";`, quais expressões devolvem `"a-b-c"`? Escolha duas.',
      opcoes: [
        '`s.replace(".", "-")`',
        '`s.replace(\'.\', \'-\')`',
        '`s.replaceAll(".", "-")`',
        '`s.replaceFirst(".", "-")`',
        '`String.join("-", s.split("."))`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `String s = "a.b.c";
System.out.println(s.replace(".", "-").equals("a-b-c") + " " + s.replace('.', '-').equals("a-b-c") + " "
        + s.replaceAll(".", "-").equals("a-b-c") + " " + s.replaceFirst(".", "-").equals("a-b-c") + " "
        + String.join("-", s.split(".")).equals("a-b-c"));`,
      explicacao: '`replace` é literal, nas duas versões (com `char` ou com texto). As outras três usam expressão regular, em que `.` casa com qualquer caractere: `replaceAll` dá "-----", `replaceFirst` dá "-.b.c" e o `split(".")` devolve um array vazio.',
    },
    {
      id: 'estagiario-t5-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("1,2,,3,,".split(",").length);`,
      opcoes: ['`4`', '`6`', '`5`', '`3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os pedaços seriam "1", "2", "", "3", "" e "". O `split` descarta as strings vazias do final, mas mantém a do meio: sobram 4.',
    },
    {
      id: 'estagiario-t5-e02-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que encontra a posição do `@`. O programa deve imprimir `ana`.',
      codigo: `public class Usuario {
    public static void main(String[] args) {
        String email = "ana@javaflix.com";
        System.out.println(email.substring(0, email.___('@')));
    }
}`,
      respostas: ['indexOf', 'lastIndexOf'],
      saida: 'ana',
      explicacao: '`indexOf(\'@\')` devolve 3, e `substring(0, 3)` pega as posições 0, 1 e 2. Como só há um `@`, `lastIndexOf` daria o mesmo.',
    },
    {
      id: 'estagiario-t5-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("Banana".compareTo("abacaxi"));`,
      opcoes: ['`-31`', '`31`', '`-1`', '`1`', '`0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os primeiros caracteres já diferem: \'B\' (66) menos \'a\' (97) é −31. Por isso "Banana" vem antes de "abacaxi" na ordem natural: maiúsculas vêm antes das minúsculas.',
    },
    {
      id: 'estagiario-t5-e02-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Troca {
    public static void main(String[] args) {
        String s = "gato";
        char primeira = s.charAt(0);
        s.charAt(0) = 'p';
        System.out.println(s + primeira);
    }
}`,
      resposta: 5,
      explicacao: '`charAt` devolve um valor, não uma posição que possa receber atribuição. Para "trocar" uma letra, crie uma nova `String`: `s = "p" + s.substring(1)`.',
    },
    {
      id: 'estagiario-t5-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("ab".repeat(0).isEmpty() + " " + "-".repeat(3));`,
      opcoes: ['`true ---`', '`false ---`', '`true -`', 'Lança `IllegalArgumentException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`repeat(0)` devolve a string vazia; só um argumento negativo lança `IllegalArgumentException`. `"-".repeat(3)` é "---".',
    },
    {
      id: 'estagiario-t5-e02-q11',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `String s = "Mississippi";
System.out.println(s.replace("ss", "SS"));
System.out.println(s.indexOf("ss", 3));
System.out.println(s.chars().filter(c -> c == 's').count());`,
      resposta: 'MiSSiSSippi\n5\n4',
      explicacao: '`replace` troca as duas ocorrências de "ss". `indexOf("ss", 3)` começa a procurar na posição 3: a ocorrência que começa na 2 fica para trás, e a próxima começa na 5. Há quatro letras s.',
    },
    {
      id: 'estagiario-t5-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("[" + String.join("/", "a", "b", "c") + "][" + String.join("/", List.of()) + "]");`,
      opcoes: ['`[a/b/c][]`', '`[a/b/c/][/]`', '`[abc][]`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`String.join` põe o separador só entre os elementos, nunca no começo ou no fim. Com uma coleção vazia, devolve a string vazia.',
    },
    {
      id: 'estagiario-t5-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`String r = "x".repeat(2);`',
        '`String j = String.join(",", "a", "b");`',
        '`int n = "abc".length;`',
        '`String c = "a".concat(\'b\');`',
        '`boolean t = "abc".contains("b");`',
      ],
      respostas: [0, 1, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Em `String`, o tamanho vem do método `length()`; o campo `length` é dos arrays. `concat` recebe uma `String`, e um `char` não é convertido automaticamente.',
    },
    {
      id: 'estagiario-t5-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      provas: ['830', '831'],
      enunciado: 'No Java 21, qual é a saída?',
      codigo: `System.out.println("banana".indexOf('n', 3, 6));`,
      opcoes: ['`4`', '`2`', '`-1`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A versão de `indexOf` com início e fim (Java 21) procura só no trecho entre as posições 3 (incluída) e 6 (excluída): o primeiro \'n\' nesse trecho está na posição 4. O \'n\' da posição 2 fica de fora.',
    },
    {
      id: 'estagiario-t5-e02-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual método remove os espaços em branco do começo e do fim de uma `String`, considerando os espaços do Unicode?',
      opcoes: ['`strip()`', '`substring()`', '`replace(" ", "")`', '`split(" ")`'],
      resposta: 0,
      explicacao: '`strip()` (Java 11) remove espaços em branco Unicode das pontas. `trim()` faz algo parecido, mas só reconhece caracteres com código até 32. `replace(" ", "")` removeria também os espaços do meio.',
    },
  ],
};

export default episodio;
