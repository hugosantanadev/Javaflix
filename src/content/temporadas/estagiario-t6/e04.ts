import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t6-e04',
  minutos: 14,
  aula,
  armadilhas: [
    '`parseInt` devolve `int`; `valueOf` devolve `Integer`. Texto inválido lança `NumberFormatException`.',
    'Desembrulhar um wrapper `null` lança `NullPointerException`, numa linha sem chamada de método visível.',
    '`Long l = 42;` não compila: o autoboxing não alarga o `int` antes de embrulhar.',
    '`==` entre wrappers compara referências; só "funciona" no cache de -128 a 127.',
    '`equals` entre wrappers de tipos diferentes é sempre `false`: `Long.valueOf(1).equals(1)` dá `false`.',
    '`list.remove(1)` numa `List<Integer>` remove o índice 1, não o valor 1.',
    '`Math.round(double)` devolve `long`; `pow`, `sqrt`, `floor` e `ceil` devolvem `double`.',
    '`Math.round(-2.5)` é -2: o meio é arredondado para cima, no sentido do infinito positivo.',
  ],
  ia: {
    uso:
      'A IA explica bem quando o compilador embrulha e desembrulha valores, e qual método de `Math` devolve qual tipo. Use-a para revisar código com wrappers atrás de `==`, de unboxing de `null` e de `remove` ambíguo em listas de números.',
    pedido:
      'Revise o uso de wrappers e de Math neste código Java 21.\n<cole o código aqui>\n- Marque cada ponto em que acontece autoboxing ou unboxing e diga se o valor pode ser null ali.\n- Aponte comparações de Integer, Long ou Double com ==.\n- Para cada chamada de Math, diga o tipo devolvido e se cabe na variável que o recebe.',
    erros: [
      'Compara wrappers com `==`, o que passa nos testes com números pequenos.',
      'Chama `remove(int)` numa `List<Integer>` querendo remover um valor.',
      'Esquece que `Math.round(double)` devolve `long` e que `pow` devolve `double`.',
    ],
    conferir: [
      'Teste comparações de wrappers com valores acima de 127.',
      'Rode o código com `null` nos wrappers que vêm de mapas, bancos ou formulários.',
      'Confira o tipo de retorno de cada método de `Math` com **Ctrl + Q** na IDE.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Autoboxing and Unboxing',
      url: 'https://dev.java/learn/language/constructs/numbers-strings/autoboxing/',
      tipo: 'documentacao',
      porque: 'O tutorial atual da Oracle sobre quando o compilador embrulha e desembrulha os valores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The Numbers Classes',
      url: 'https://docs.oracle.com/javase/tutorial/java/data/numbers.html',
      tipo: 'documentacao',
      porque: 'A hierarquia dos wrappers numéricos e os métodos de conversão de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 5.1.7: Boxing Conversion',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.7',
      tipo: 'documentacao',
      porque: 'Onde a especificação garante o cache de -128 a 127, e só ele.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de Integer.valueOf(int)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#valueOf(int)',
      tipo: 'documentacao',
      porque: 'Documenta o cache e por que `valueOf` é preferível ao construtor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.Math',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html',
      tipo: 'documentacao',
      porque: 'O tipo de retorno de cada método e os casos especiais, como o arredondamento do meio no `round`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Wrapper Classes in Java',
      url: 'https://www.baeldung.com/java-wrapper-classes',
      tipo: 'artigo',
      porque: 'Os wrappers, as conversões e o autoboxing, com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Guide to the Java Math Class',
      url: 'https://www.baeldung.com/java-lang-math',
      tipo: 'artigo',
      porque: 'Um passeio pelos métodos de `Math`, inclusive os `Exact` e o `floorMod`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 57, Wrappers: classes de tipos primitivos',
      url: 'https://www.youtube.com/watch?v=U0dcVFvJIhk',
      tipo: 'video',
      porque: 'Os wrappers e o autoboxing explicados em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #07, Operadores Aritméticos e Classe Math',
      url: 'https://www.youtube.com/watch?v=W9V5wtOOZHs',
      tipo: 'video',
      porque: 'Os métodos de `Math` mais usados, com exemplos no NetBeans.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Bro Code: Learn WRAPPER CLASSES in 10 minutes',
      url: 'https://www.youtube.com/watch?v=5bt07czziV4',
      tipo: 'video',
      porque: 'Uma revisão rápida de wrappers, autoboxing e unboxing.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Project Valhalla',
      url: 'https://openjdk.org/projects/valhalla/',
      tipo: 'documentacao',
      porque: 'O projeto da OpenJDK que quer acabar com o custo do autoboxing com classes de valor.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas de wrappers e de métodos de `Math`, com os tipos de retorno que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seção "Creating Wrapper Classes"; Cap. 4, "Core APIs": seção "Calculating with Math APIs"',
    },
  ],
  desafio: {
    titulo: 'Boletim a partir de texto',
    enunciado:
      'As notas chegam como texto, e algumas vêm erradas: `String[] entradas = {"7.5", "8", "dez", "9.25", "6"};`. Converta cada uma, ignorando as inválidas com um aviso, e calcule a média com uma casa decimal, a maior e a menor nota usando `Math`. Imprima:\n\n```text\nIgnorado: dez\nNotas válidas: 4\nMédia: 7.7\nMaior: 9.25\nMenor: 6.0\n```',
    dicas: [
      '`Double.parseDouble` lança `NumberFormatException` com texto inválido: trate dentro do laço.',
      'Comece o maior com `Double.NEGATIVE_INFINITY` e o menor com `Double.POSITIVE_INFINITY`, e use `Math.max` e `Math.min`.',
      'Para uma casa decimal: `Math.round(valor * 10) / 10.0`. Dividir por `10.0`, e não por `10`, é o que mantém a casa.',
    ],
    solucao: `public class Boletim {
    public static void main(String[] args) {
        String[] entradas = {"7.5", "8", "dez", "9.25", "6"};
        double soma = 0;
        double maior = Double.NEGATIVE_INFINITY;
        double menor = Double.POSITIVE_INFINITY;
        int validas = 0;
        for (String entrada : entradas) {
            try {
                double nota = Double.parseDouble(entrada);
                soma += nota;
                maior = Math.max(maior, nota);
                menor = Math.min(menor, nota);
                validas++;
            } catch (NumberFormatException e) {
                System.out.println("Ignorado: " + entrada);
            }
        }
        double media = Math.round(soma / validas * 10) / 10.0;
        System.out.println("Notas válidas: " + validas);
        System.out.println("Média: " + media);
        System.out.println("Maior: " + maior);
        System.out.println("Menor: " + menor);
    }
}`,
    saida: 'Ignorado: dez\nNotas válidas: 4\nMédia: 7.7\nMaior: 9.25\nMenor: 6.0',
    comentarios:
      'A soma é 30.75 e a média, 7.6875; multiplicada por 10, dá 76.875, que o `round` leva a 77, um `long`. Dividir por `10.0` transforma de volta em `double`: 7.7. Começar com os infinitos garante que a primeira nota válida vira o maior e o menor, sem caso especial. Para dinheiro, use `BigDecimal`, como no episódio de [ponto flutuante](/assistir/aprendiz-t3-e03).',
  },
  bugs: [
    {
      id: 'estagiario-t6-e04-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: incompatible types: int cannot be converted to Long`.',
      codigo: `public class Contador {
    public static void main(String[] args) {
        Long visitas = 0;
        visitas += 5;
        System.out.println(visitas);
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Contador {
    public static void main(String[] args) {
        Long visitas = 0L;
        visitas += 5;
        System.out.println(visitas);
    }
}`,
      saidaCorrigida: '5',
      dica: 'O literal `0` é um `int`. O autoboxing consegue alargar para `long` e embrulhar num passo só?',
      explicacao: 'O autoboxing não faz duas conversões de uma vez: `0` é `int`, e embrulhá-lo dá um `Integer`, não um `Long`. Com o sufixo, `0L` já é `long`, e basta embrulhar.',
    },
    {
      id: 'estagiario-t6-e04-b02',
      dificuldade: 2,
      sintoma: 'A senha atendida era a 3, mas quem saiu da fila foi a 40: o programa mostra `[10, 20, 3]`.',
      codigo: `import java.util.*;

public class Fila {
    public static void main(String[] args) {
        List<Integer> senhas = new ArrayList<>(List.of(10, 20, 3, 40));
        int atendida = 3;
        senhas.remove(atendida);
        System.out.println(senhas);
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: '[10, 20, 3]' },
      correcao: `import java.util.*;

public class Fila {
    public static void main(String[] args) {
        List<Integer> senhas = new ArrayList<>(List.of(10, 20, 3, 40));
        int atendida = 3;
        senhas.remove(Integer.valueOf(atendida));
        System.out.println(senhas);
    }
}`,
      saidaCorrigida: '[10, 20, 40]',
      dica: 'A lista tem dois `remove`: um recebe um índice `int`, o outro um objeto. Qual deles um `int` escolhe?',
      explicacao: 'Com um `int`, o compilador escolhe `remove(int índice)`, que não precisa de autoboxing, e remove a posição 3, onde está o 40. Para remover o valor 3, o argumento precisa ser um objeto: `Integer.valueOf(atendida)`.',
    },
    {
      id: 'estagiario-t6-e04-b03',
      dificuldade: 3,
      sintoma: 'Os dois times fizeram 150 pontos, mas o placar diz `Alguém venceu`.',
      codigo: `public class Placar {
    public static void main(String[] args) {
        Integer casa = 150;
        Integer visitante = 150;
        if (casa == visitante) {
            System.out.println("Empate");
        } else {
            System.out.println("Alguém venceu");
        }
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'Alguém venceu' },
      correcao: `public class Placar {
    public static void main(String[] args) {
        Integer casa = 150;
        Integer visitante = 150;
        if (casa.equals(visitante)) {
            System.out.println("Empate");
        } else {
            System.out.println("Alguém venceu");
        }
    }
}`,
      saidaCorrigida: 'Empate',
      dica: 'O 150 está na faixa do cache do `Integer`? O `==` entre dois objetos compara o quê?',
      explicacao: 'O cache só vai de -128 a 127. Cada `150` virou um objeto próprio, e o `==` entre objetos compara referências. Com placares menores o código "funcionaria", o que torna o bug traiçoeiro. O `equals` compara os valores.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t6-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a classe wrapper do tipo `char`?',
      opcoes: ['`Character`', '`Char`', '`String`', '`CharSequence`'],
      resposta: 0,
      explicacao: '`Character` e `Integer` são os dois wrappers cujo nome não é só o primitivo com inicial maiúscula. Os outros seis seguem a regra: `Byte`, `Short`, `Long`, `Float`, `Double` e `Boolean`.',
      dica: 'É um dos dois wrappers cujo nome não é só o primitivo com maiúscula.',
    },
    {
      id: 'estagiario-t6-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int a = Integer.parseInt("12");
Integer b = Integer.valueOf("30");
System.out.println(a + b + "!" + a + b);`,
      resposta: '42!1230',
      explicacao: 'Os dois números viram números de verdade. Da esquerda para a direita, `a + b` é soma (42); depois do `"!"`, tudo é concatenação de texto.',
      dica: 'A soma `a + b` vem antes do texto; depois do `"!"`, tudo é concatenação.',
    },
    {
      id: 'estagiario-t6-e04-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `Integer x = 100, y = 100;
Integer p = 1000, q = 1000;
System.out.println((x == y) + " " + (p == q) + " " + p.equals(q));`,
      opcoes: ['`true false true`', '`true true true`', '`false false true`', '`true false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '100 está no cache de -128 a 127, e os dois autoboxings devolvem o mesmo objeto. 1000 está fora, e cada autoboxing cria um objeto novo. `equals` compara o valor e dá `true` nos dois casos.',
      dica: 'O cache vai de -128 a 127. Onde ficam o 100 e o 1000?',
    },
    {
      id: 'estagiario-t6-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `Integer pontos = null;
int bonus = 10;
int total = pontos + bonus;
System.out.println(total);`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `10`',
        'Imprime `null10`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'Para somar, o compilador desembrulha `pontos` com `pontos.intValue()`, e chamar um método em `null` lança a exceção. Não há concatenação, porque nenhum dos lados é `String`.',
      dica: 'Para somar, o `Integer` precisa ser desembrulhado. E se ele for `null`?',
    },
    {
      id: 'estagiario-t6-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais linhas compilam? Escolha três.',
      opcoes: [
        '`Integer a = 5;`',
        '`long b = 5;`',
        '`Double c = 5.0;`',
        '`Long d = 5;`',
        '`Double e = 5;`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O autoboxing embrulha o valor no wrapper do **próprio** tipo. `5` é `int`: vira `Integer`, ou é alargado para `long` quando o destino é primitivo. Alargar e embrulhar ao mesmo tempo, como em `Long d = 5` e `Double e = 5`, não é permitido.',
      dica: 'O autoboxing não alarga e embrulha ao mesmo tempo.',
    },
    {
      id: 'estagiario-t6-e04-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `List<Integer> v = new ArrayList<>(List.of(4, 3, 2, 1));
v.remove(1);
v.remove(Integer.valueOf(4));
System.out.println(v);`,
      opcoes: ['`[2, 1]`', '`[3, 2]`', '`[4, 2, 1]`', '`[3, 2, 1]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`remove(1)` chama `remove(int)` e tira o elemento do índice 1, o 3. `remove(Integer.valueOf(4))` chama `remove(Object)` e tira o valor 4. Sobra `[2, 1]`.',
      dica: '`remove(1)` usa o índice; `remove(Integer.valueOf(4))`, o valor.',
    },
    {
      id: 'estagiario-t6-e04-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para converter o texto em número. O programa deve imprimir `26`.',
      codigo: `public class Idade {
    public static void main(String[] args) {
        String texto = "25";
        int idade = Integer.___(texto);
        System.out.println(idade + 1);
    }
}`,
      respostas: ['parseInt', 'valueOf'],
      saida: '26',
      explicacao: '`parseInt` devolve um `int` direto. `valueOf` devolve um `Integer`, que é desembrulhado ao ser guardado na variável `int`: também funciona, com um objeto a mais no caminho.',
      dica: 'Os métodos que convertem texto em número começam com `parse` ou `valueOf`.',
    },
    {
      id: 'estagiario-t6-e04-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Arredonda {
    public static void main(String[] args) {
        double preco = 4.6;
        long a = Math.round(preco);
        int b = Math.round((float) preco);
        int c = Math.round(preco);
        System.out.println(a + b + c);
    }
}`,
      resposta: 6,
      explicacao: '`Math.round(double)` devolve `long`, que não cabe num `int` sem cast. Já `Math.round(float)` devolve `int`, por isso a linha 5 compila.',
      dica: 'Que tipo `Math.round(double)` devolve? Ele cabe num `int` sem cast?',
    },
    {
      id: 'estagiario-t6-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(Math.round(-3.5) + " " + Math.floor(-3.5) + " " + Math.ceil(-3.5));`,
      opcoes: ['`-3 -4.0 -3.0`', '`-4 -4.0 -3.0`', '`-3 -3.0 -4.0`', '`-4 -4 -3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`round` leva o meio para cima, no sentido do infinito positivo: -3.5 vira -3. `floor` vai para o inteiro abaixo (-4.0) e `ceil` para o de cima (-3.0), ambos como `double`.',
      dica: 'O `round` leva o meio para o lado do +∞; o `floor`, sempre para baixo.',
    },
    {
      id: 'estagiario-t6-e04-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(Math.pow(3, 2) + " " + Math.max(4, 9L) + " " + Math.sqrt(2.25));`,
      resposta: '9.0 9 1.5',
      explicacao: '`pow` sempre devolve `double`. `max` com um `int` e um `long` usa a versão de `long` e devolve 9, sem ponto. `sqrt` também é `double`.',
      dica: '`pow` e `sqrt` devolvem `double`; `max` com um `long` devolve `long`.',
    },
    {
      id: 'estagiario-t6-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quais valores a expressão `(int) (Math.random() * 10)` pode produzir?',
      opcoes: ['Os inteiros de 0 a 9', 'Os inteiros de 1 a 10', 'Os inteiros de 0 a 10', 'Qualquer `double` de 0 a 10'],
      resposta: 0,
      explicacao: '`Math.random()` vai de 0.0 até quase 1.0, nunca 1.0. Multiplicado por 10, vai de 0.0 até quase 10.0, e o cast corta a parte decimal: de 0 a 9. Para 1 a 10, some 1.',
      dica: 'O `random` nunca chega a 1.0, e o cast corta a parte decimal.',
    },
    {
      id: 'estagiario-t6-e04-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `Long a = 10L;
Integer b = 10;
System.out.println(a.equals(10L) + " " + a.equals(b) + " " + (a == 10));`,
      opcoes: ['`true false true`', '`true true true`', '`true false false`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `equals` dos wrappers exige o mesmo tipo: um `Long` nunca é igual a um `Integer`, mesmo com o mesmo valor. Já `a == 10` compara wrapper com primitivo: `a` é desembrulhado e a comparação é numérica.',
      dica: 'O `equals` entre wrappers exige o mesmo tipo; o `==` com um primitivo desembrulha.',
    },
    {
      id: 'estagiario-t6-e04-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String texto = "12a";
int n = Integer.parseInt(texto);
System.out.println(n);`,
      opcoes: [
        'Lança `NumberFormatException`',
        'Imprime `12`',
        'Imprime `0`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NumberFormatException' },
      explicacao: '`parseInt` exige que o texto inteiro seja um número válido; ele não aproveita o começo. O compilador não confere o conteúdo da `String`, então o erro só aparece na execução.',
      dica: 'O texto tem uma letra no meio do número.',
    },
    {
      id: 'estagiario-t6-e04-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais expressões têm tipo `double`, mesmo recebendo argumentos `int`? Escolha três.',
      opcoes: [
        '`Math.pow(2, 3)`',
        '`Math.sqrt(9)`',
        '`Math.floor(7)`',
        '`Math.max(2, 3)`',
        '`Math.abs(-4)`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'executa', saida: '8.0 3.0 7.0 3 4' },
      codigoVerificacao: `System.out.println(Math.pow(2, 3) + " " + Math.sqrt(9) + " " + Math.floor(7) + " " + Math.max(2, 3) + " " + Math.abs(-4));`,
      explicacao: '`pow`, `sqrt` e `floor` só existem na versão de `double`: o `int` é alargado e o resultado é `double`. `max` e `abs` têm versões para `int`, e devolvem `int`.',
      dica: 'Quais métodos de `Math` sempre devolvem `double`?',
    },
    {
      id: 'estagiario-t6-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `System.out.println(Math.abs(Integer.MIN_VALUE));`,
      opcoes: ['`-2147483648`', '`2147483648`', '`2147483647`', 'Lança `ArithmeticException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Em complemento de dois, o menor `int` não tem positivo correspondente: 2147483648 não cabe. Negá-lo dá a volta e devolve o próprio valor. Para receber uma exceção, existe `Math.absExact`.',
      dica: 'O positivo de `Integer.MIN_VALUE` cabe num `int`?',
    },
  ],
};

export default episodio;
