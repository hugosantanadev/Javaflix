import type { Exercicio } from '../../types';

/** Prova da temporada Estagiário T5: texto. */
const prova: Exercicio[] = [
  {
    id: 'estagiario-t5-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `String s = "Java";
s.concat("flix");
s = s.toUpperCase();
System.out.println(s + s.length());`,
    opcoes: ['`JAVA4`', '`JAVAFLIX8`', '`Java4`', '`JAVA8`', '`JAVAflix4`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `concat` cria "Javaflix", mas ninguém guarda o resultado. Só o `toUpperCase` é atribuído. "JAVA" tem 4 caracteres, concatenados ao texto.',
  },
  {
    id: 'estagiario-t5-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos **não** compilam? Escolha dois.',
    opcoes: [
      '`String s = \'a\';`',
      '`char c = "a";`',
      '`String s = "a" + \'b\';`',
      '`String s = String.valueOf(\'a\');`',
      '`String s = null;`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'opcoesNaoCompilam' },
    explicacao: '`char` e `String` não se convertem na atribuição, em nenhum sentido. Concatenar um `char` com uma `String` e usar `String.valueOf` são as formas certas de converter.',
  },
  {
    id: 'estagiario-t5-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `String s = "abracadabra";
System.out.println(s.indexOf("bra") + " " + s.lastIndexOf("bra") + " " + s.indexOf("bra", 2) + " " + s.substring(4, 7));`,
    opcoes: ['`1 8 8 cad`', '`1 8 1 cad`', '`1 9 8 cada`', '`2 8 8 cad`', '`1 8 8 ada`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '"bra" aparece nas posições 1 e 8. Procurando a partir da posição 2, a primeira ocorrência é a da 8. `substring(4, 7)` pega as posições 4, 5 e 6: "cad".',
  },
  {
    id: 'estagiario-t5-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println("Java".replace('a', 'o').concat("!").substring(1));`,
    opcoes: ['`ovo!`', '`Jovo!`', '`ava!`', '`ovo`', '`Jova!`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`replace` troca todos os \'a\': "Jovo". O `concat` dá "Jovo!", e `substring(1)` remove o primeiro caractere.',
  },
  {
    id: 'estagiario-t5-prova-q05',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println(" a b ".split(" ").length);`,
    opcoes: ['`3`', '`2`', '`4`', '`5`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O espaço inicial gera uma string vazia no começo, que é mantida. Os pedaços são "", "a", "b" e "", e só o vazio do final é descartado.',
  },
  {
    id: 'estagiario-t5-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `List<String> l = new ArrayList<>(List.of("banana", "Abacaxi", "apple", "Banana"));
Collections.sort(l);
System.out.println(l);`,
    opcoes: [
      '`[Abacaxi, Banana, apple, banana]`',
      '`[Abacaxi, apple, Banana, banana]`',
      '`[apple, banana, Abacaxi, Banana]`',
      '`[Abacaxi, apple, banana, Banana]`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A ordem natural de `String` usa `compareTo`, que compara os códigos dos caracteres. Todas as maiúsculas (65 a 90) vêm antes das minúsculas (97 a 122).',
  },
  {
    id: 'estagiario-t5-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `StringBuilder sb = new StringBuilder("12345");
sb.reverse().deleteCharAt(0).insert(0, "-").append(sb.length());
System.out.println(sb);`,
    opcoes: ['`-43215`', '`-43214`', '`-54321`', '`54321-5`', '`-4321`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A cadeia altera o mesmo objeto: "54321", depois "4321", depois "-4321". O argumento `sb.length()` só é avaliado quando chega a vez do `append`, depois das chamadas anteriores, e vale 5.',
  },
  {
    id: 'estagiario-t5-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `StringBuilder sb = new StringBuilder("ok");
System.out.println("ok".equals(sb) + " " + "ok".contentEquals(sb));`,
    opcoes: ['`false true`', '`true true`', '`false false`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`String.equals` só devolve verdadeiro para outra `String`; um `StringBuilder` com o mesmo texto não serve. `contentEquals` compara com qualquer sequência de caracteres.',
  },
  {
    id: 'estagiario-t5-prova-q09',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais trechos compilam? Escolha três.',
    opcoes: [
      '`StringBuilder a = new StringBuilder("x").append(1);`',
      '`String b = new StringBuilder("x") + "y";`',
      '`StringBuilder c = new StringBuilder().insert(0, \'a\');`',
      '`String d = new StringBuilder("x");`',
      '`StringBuilder e = "x" + new StringBuilder();`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`append` e `insert` devolvem `StringBuilder`. A concatenação com `+` chama `toString()` e produz uma `String`, por isso B compila e E não. Um `StringBuilder` não é atribuível a `String`.',
  },
  {
    id: 'estagiario-t5-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `String t = """
    a
      b
    c""";
System.out.println(t.replace(' ', '.') + "|");`,
    opcoes: ['`a\n..b\nc|`', '`a\nb\nc|`', '`....a\n......b\n....c|`', '`a\n..b\nc\n|`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A menor indentação entre as linhas com conteúdo é de 4 espaços, removida de todas: o "b" fica com 2. O fechamento na mesma linha do "c" faz o texto não terminar com quebra.',
  },
  {
    id: 'estagiario-t5-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar o trecho?',
    codigo: `String t = """ texto """;
System.out.println(t);`,
    opcoes: [
      'Não compila: o conteúdo não pode começar na linha da abertura',
      'Imprime `texto`',
      'Imprime ` texto `',
      'Imprime `""" texto """`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: 'Depois do `"""` de abertura só pode haver espaços e uma quebra de linha. Text blocks são sempre de várias linhas no código-fonte.',
  },
  {
    id: 'estagiario-t5-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída? O `replace` torna os espaços visíveis.',
    codigo: `String t = """
    x\\s\\
    y
    """;
System.out.print(t.replace(' ', '.'));`,
    opcoes: ['`x.y`', '`xy`', '`x.\ny`', '`x\\s\\\ny`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `\\s` vira um espaço que não é removido, e a `\\` no fim da linha junta a linha com a próxima. O texto fica "x y" seguido da quebra de linha final.',
  },
  {
    id: 'estagiario-t5-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `String a = "flix";
String b = "java" + a;
String c = "javaflix";
final String d = "flix";
String e = "java" + d;
System.out.println((b == c) + " " + (e == c) + " " + b.equals(e));`,
    opcoes: ['`false true true`', '`true true true`', '`false false true`', '`true false true`', '`false true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`a` é variável comum: `"java" + a` é calculado na execução e cria um objeto novo. `d` é `final` com constante: `"java" + d` é calculado pelo compilador e vira o literal do pool. O conteúdo das três é igual.',
  },
  {
    id: 'estagiario-t5-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `String x = new StringBuilder("ja").append("va").toString();
System.out.println((x == "java") + " " + (x.intern() == "java"));`,
    opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`toString()` cria uma `String` nova, fora do pool. `intern()` devolve a cópia do pool, que é o mesmo objeto do literal "java".',
  },
  {
    id: 'estagiario-t5-prova-q15',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais expressões valem `true`? Escolha duas.',
    opcoes: [
      '`"abc" == "ab" + "c"`',
      '`"abc" == new String("abc").intern()`',
      '`"abc" == "ABC".toLowerCase()`',
      '`"abc" == String.valueOf("abc".toCharArray())`',
      '`"abc" == new String("abc")`',
    ],
    respostas: [0, 1],
    verificar: { tipo: 'executa', saida: 'true true false false false' },
    codigoVerificacao: `System.out.println(("abc" == "ab" + "c") + " " + ("abc" == new String("abc").intern()) + " "
        + ("abc" == "ABC".toLowerCase()) + " " + ("abc" == String.valueOf("abc".toCharArray())) + " "
        + ("abc" == new String("abc")));`,
    explicacao: 'A concatenação de literais é constante, e `intern()` devolve o objeto do pool. Resultados de métodos e objetos criados com `new` são objetos novos.',
  },
  {
    id: 'estagiario-t5-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `String s = "Java";
s += 21;
s = s.replace("21", "25") + s.length();
System.out.println(s);`,
    opcoes: ['`Java256`', '`Java25`', '`Java257`', '`Java2521`', '`Java216`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Depois do `+=`, s é "Java21". Na linha seguinte, o lado direito é todo avaliado antes da atribuição: `replace` dá "Java25", e `s.length()` ainda é o de "Java21", 6.',
  },
  {
    id: 'estagiario-t5-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `System.out.println("a,b;c".split("[,;]").length);`,
    opcoes: ['`3`', '`1`', '`2`', 'Lança exceção'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O argumento do `split` é uma expressão regular, e `[,;]` casa com vírgula ou ponto e vírgula. Os pedaços são "a", "b" e "c".',
  },
  {
    id: 'estagiario-t5-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `StringBuilder sb = new StringBuilder("abc");
sb.insert(5, "x");
System.out.println(sb);`,
    opcoes: [
      'Lança `StringIndexOutOfBoundsException`',
      'Imprime `abcx`',
      'Imprime `abc  x`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'StringIndexOutOfBoundsException' },
    explicacao: 'A posição de inserção vai de 0 a `length()`. Com 3 caracteres, 5 é inválido: o `StringBuilder` não preenche o espaço que falta.',
  },
];

export default prova;
