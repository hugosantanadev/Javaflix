import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t5-e01',
  minutos: 11,
  aula,
  armadilhas: [
    '`s.toUpperCase();` sozinho não muda `s`: o resultado precisa ser atribuído.',
    'Reatribuir uma variável `String` não afeta outras variáveis que apontavam para o mesmo objeto.',
    '`length()` é método em `String`; em arrays, `length` é campo.',
    '`charAt(s.length())` lança `StringIndexOutOfBoundsException`.',
    '`null + "x"` dá `"nullx"`, mas `nula.length()` lança `NullPointerException`.',
    '`"   ".isEmpty()` é falso; `"   ".isBlank()` é verdadeiro.',
    '`String` é `final`: não pode ter subclasses.',
    '`length()` conta unidades UTF-16: um emoji conta 2.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de String',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html',
      tipo: 'documentacao',
      porque: 'A primeira frase já diz: "Strings are constant; their values cannot be changed after they are created".',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Strings',
      url: 'https://docs.oracle.com/javase/tutorial/java/data/strings.html',
      tipo: 'documentacao',
      porque: 'Criação, tamanho, concatenação e a explicação da imutabilidade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'dev.java: Strings',
      url: 'https://dev.java/learn/language/constructs/numbers-strings/strings/',
      tipo: 'tutorial',
      porque: 'O tutorial atual da Oracle sobre a classe `String` e os seus métodos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 254: Compact Strings',
      url: 'https://openjdk.org/jeps/254',
      tipo: 'documentacao',
      porque: 'Por que, desde o Java 9, uma `String` em Latin-1 ocupa metade da memória.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Why String is Immutable in Java?',
      url: 'https://www.baeldung.com/java-string-immutable',
      tipo: 'artigo',
      porque: 'Os motivos da imutabilidade (pool, segurança, threads e hash) com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Codando Simples: Java, Aula 23, Os principais métodos da classe String',
      url: 'https://www.youtube.com/watch?v=-2RvOvNYA0A',
      tipo: 'video',
      porque: 'Como o Java guarda strings na memória e os métodos mais usados, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Kunal Kushwaha: Strings and StringBuilder in Java',
      url: 'https://www.youtube.com/watch?v=zL1DPZ0Ovlo',
      tipo: 'video',
      porque: 'Imutabilidade, pool e o funcionamento interno de `String` e `StringBuilder`, com desenhos da memória.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A seção sobre `String` lista os métodos que a prova cobra e as regras de imutabilidade.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seção "Creating and Manipulating Strings"',
    },
  ],
  desafio: {
    titulo: 'Palíndromos',
    enunciado:
      'Escreva `palindromo(String frase)`, que diz se a frase é igual de trás para a frente, ignorando espaços, pontuação e maiúsculas. Use só `charAt`, `length` e métodos de `Character`, sem `StringBuilder`. Teste e imprima:\n\n```text\nAme a ema: true\nJavaflix: false\nSocorram-me subi no onibus em Marrocos: true\n```',
    dicas: [
      'Use dois índices, um no começo e outro no fim, andando em direção ao meio.',
      'Pule os caracteres que não são letras com `Character.isLetter(c)`.',
      'Compare com `Character.toLowerCase` dos dois lados.',
    ],
    solucao: `public class Palindromo {
    static boolean palindromo(String frase) {
        int i = 0, j = frase.length() - 1;
        while (i < j) {
            char a = frase.charAt(i);
            char b = frase.charAt(j);
            if (!Character.isLetter(a)) {
                i++;
            } else if (!Character.isLetter(b)) {
                j--;
            } else if (Character.toLowerCase(a) != Character.toLowerCase(b)) {
                return false;
            } else {
                i++;
                j--;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        for (String f : new String[] {"Ame a ema", "Javaflix", "Socorram-me subi no onibus em Marrocos"}) {
            System.out.println(f + ": " + palindromo(f));
        }
    }
}`,
    saida: 'Ame a ema: true\nJavaflix: false\nSocorram-me subi no onibus em Marrocos: true',
    comentarios:
      'Os dois índices evitam criar uma `String` nova invertida: a frase original nem é copiada. Como `String` é imutável, toda limpeza com `replace` ou `toLowerCase` geraria objetos novos; com os índices, o custo de memória é zero e o tempo é O(n).',
  },
  exercicios: [
    {
      id: 'estagiario-t5-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que significa dizer que `String` é imutável?',
      opcoes: [
        'O conteúdo de um objeto `String` não pode ser alterado depois de criado; os métodos devolvem uma nova `String`',
        'Uma variável do tipo `String` não pode receber outro valor',
        'Uma `String` não pode ser concatenada',
        'Uma `String` não pode ser passada para métodos',
      ],
      resposta: 0,
      explicacao: 'É o objeto que não muda. A variável pode apontar para outro objeto (a menos que seja `final`), e é isso que acontece em `s = s + "x"`.',
    },
    {
      id: 'estagiario-t5-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `String s = "abc";
s.concat("def");
s.toUpperCase();
System.out.println(s);
s = s.concat("!");
System.out.println(s);`,
      resposta: 'abc\nabc!',
      explicacao: 'As duas primeiras chamadas criam strings novas que ninguém guarda, e `s` continua "abc". Só a atribuição da quarta linha faz `s` apontar para o resultado.',
    },
    {
      id: 'estagiario-t5-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String a = "pão";
String b = a;
a = a + " de queijo";
System.out.println(b);`,
      opcoes: ['`pão`', '`pão de queijo`', '`null`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A concatenação cria um objeto novo e faz `a` apontar para ele. `b` continua apontando para o objeto original, que não mudou.',
    },
    {
      id: 'estagiario-t5-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String s = "Java";
System.out.println(s.charAt(s.length()));`,
      opcoes: [
        'Lança `StringIndexOutOfBoundsException`',
        'Imprime `a`',
        'Imprime um caractere vazio',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'StringIndexOutOfBoundsException' },
      explicacao: 'Com 4 caracteres, os índices válidos vão de 0 a 3. `length()` é 4, uma posição além do último caractere.',
    },
    {
      id: 'estagiario-t5-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são benefícios de `String` ser imutável? Escolha três.',
      opcoes: [
        'Literais iguais podem compartilhar o mesmo objeto no pool',
        'Várias threads podem ler a mesma `String` sem sincronização',
        'O `hashCode()` pode ser calculado uma vez e guardado',
        'Concatenar num laço fica mais rápido',
        'Outras classes podem estender `String` com segurança',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Compartilhar, ler em paralelo e guardar o hash só é seguro porque ninguém altera o conteúdo. Concatenar num laço fica mais **lento**, porque cada `+` cria um objeto novo; e `String` é `final`, sem subclasses.',
    },
    {
      id: 'estagiario-t5-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("Java".length() + "Java".charAt(1));`,
      opcoes: ['`101`', '`4a`', '`5`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Não há `String` na soma: `length()` é `int` (4) e `charAt(1)` é o `char` \'a\' (97). 4 + 97 = 101.',
    },
    {
      id: 'estagiario-t5-e01-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que converte para maiúsculas. O programa deve imprimir `JAVA`.',
      codigo: `public class Maiusculas {
    public static void main(String[] args) {
        String s = "java";
        s = s.___();
        System.out.println(s);
    }
}`,
      respostas: ['toUpperCase'],
      saida: 'JAVA',
      explicacao: '`toUpperCase()` devolve uma nova `String`. A atribuição `s = ...` é o que faz a variável passar a apontar para ela.',
    },
    {
      id: 'estagiario-t5-e01-q08',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar a classe?',
      codigo: `class Senha extends String {
}`,
      opcoes: [
        'Não compila: `String` é `final`',
        'Compila normalmente',
        'Compila, mas lança exceção ao criar um objeto',
        'Não compila: falta um construtor',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: '`String` é declarada `final`, e classes `final` não podem ser estendidas. Isso impede que uma subclasse quebre a imutabilidade.',
    },
    {
      id: 'estagiario-t5-e01-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `String a = "x";
String b = a;
b += "y";
a = a.toUpperCase();
System.out.println(a + b);`,
      resposta: 'Xxy',
      explicacao: '`b += "y"` cria "xy" e faz só `b` apontar para ele. `a.toUpperCase()` cria "X", e a atribuição o guarda em `a`. A saída concatena "X" e "xy".',
    },
    {
      id: 'estagiario-t5-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = " \\t ";
System.out.println(s.isEmpty() + " " + s.isBlank());`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A string tem 3 caracteres (espaço, tab e espaço), então não está vazia. Mas todos são espaço em branco, e `isBlank()` devolve verdadeiro.',
    },
    {
      id: 'estagiario-t5-e01-q11',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Inicial {
    public static void main(String[] args) {
        String nome = "Bia";
        char c = nome.charAt(0);
        String inicial = c;
        System.out.println(inicial);
    }
}`,
      resposta: 5,
      explicacao: '`char` não é convertido automaticamente para `String`. Use `String.valueOf(c)` ou `"" + c`.',
    },
    {
      id: 'estagiario-t5-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println("ok👍".length());`,
      opcoes: ['`4`', '`3`', '`6`', '`2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`length()` conta unidades UTF-16. "o" e "k" ocupam uma cada, mas o emoji está fora do plano básico do Unicode e ocupa duas (um par substituto): 4.',
    },
    {
      id: 'estagiario-t5-e01-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Com `String s = null;`, quais expressões lançam `NullPointerException`? Escolha duas.',
      opcoes: ['`s.length()`', '`s.isEmpty()`', '`s + "x"`', '`String.valueOf(s)`', '`"x".equals(s)`'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `String s = null;
boolean[] lanca = new boolean[5];
try { s.length(); } catch (NullPointerException e) { lanca[0] = true; }
try { s.isEmpty(); } catch (NullPointerException e) { lanca[1] = true; }
try { String r = s + "x"; } catch (NullPointerException e) { lanca[2] = true; }
try { String.valueOf(s); } catch (NullPointerException e) { lanca[3] = true; }
try { "x".equals(s); } catch (NullPointerException e) { lanca[4] = true; }
System.out.println(lanca[0] + " " + lanca[1] + " " + lanca[2] + " " + lanca[3] + " " + lanca[4]);`,
      explicacao: 'Chamar um método **em** `null` lança exceção. Concatenar e `String.valueOf` transformam `null` no texto "null", e `"x".equals(null)` simplesmente devolve falso: é por isso que o literal costuma vir à esquerda.',
    },
    {
      id: 'estagiario-t5-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = null;
s += "a";
System.out.println(s);`,
      opcoes: ['`nulla`', '`a`', 'Lança `NullPointerException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`s += "a"` é `s = s + "a"`, uma concatenação, e concatenar `null` produz o texto "null". Nenhum método é chamado em `s`.',
    },
    {
      id: 'estagiario-t5-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Desde o Java 9, como uma `String` guarda os caracteres internamente?',
      opcoes: [
        'Num `byte[]` privado, com 1 byte por caractere quando todos cabem em Latin-1, e UTF-16 caso contrário',
        'Num `char[]` público, com 2 bytes por caractere sempre',
        'Numa lista ligada de `Character`',
        'Num arquivo temporário gerenciado pela JVM',
      ],
      resposta: 0,
      explicacao: 'É a otimização *Compact Strings* (JEP 254). O array é privado e nenhum método o expõe, e é isso que garante a imutabilidade.',
    },
  ],
};

export default episodio;
