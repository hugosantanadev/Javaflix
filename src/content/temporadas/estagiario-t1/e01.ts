import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t1-e01',
  minutos: 9,
  aula,
  armadilhas: [
    '`java Ola.class` falha: o comando `java` recebe o nome da classe, sem extensão.',
    '`javac` exige o nome do arquivo com `.java`; `javac Ola` é erro.',
    'O modo arquivo-fonte (`java Ola.java`) não grava nenhum `.class` em disco.',
    'Um `main` sem `static` ou com retorno `int` compila; o erro só aparece ao executar.',
    '`public void static main` não compila: o tipo de retorno vem colado no nome do método.',
    '`args` nunca é `null`. Sem argumentos, ele é um array vazio e `args[0]` lança `ArrayIndexOutOfBoundsException`.',
    'Argumentos chegam sempre como `String`, mesmo quando parecem números.',
  ],
  ia: {
    uso:
      'Na certificação, use a IA como tutora: para explicar um erro de compilação com palavras simples, gerar mais exemplos parecidos com os da aula ou conferir se você entendeu uma regra. Não use para responder as questões: a prova é feita sem ajuda, e o objetivo é treinar a sua cabeça para ler código como o compilador lê.',
    pedido:
      'Estou começando em Java, com o Java 25 e o IntelliJ IDEA 2026.2. Meu programa não compila, e a IDE mostra o erro abaixo.\n- Explique o erro com palavras simples e diga em que linha procurar.\n- Não me dê o código corrigido inteiro: quero achar o problema sozinho.\n- Depois, me dê dois exemplos parecidos para eu treinar.\n\n<cole aqui o erro e o código, sem nomes nem dados pessoais>',
    erros: [
      'Manda rodar `java Ola.class`, ou `javac Ola` sem extensão, misturando nome de arquivo e nome de classe.',
      'Explica o `main` só como no Java 8, sem conhecer os arquivos-fonte compactos do Java 25, ou o contrário: diz que `void main()` funciona no Java 17.',
      'Manda baixar um JRE separado, que não existe desde o Java 11, ou descreve menus de versões antigas do IntelliJ.',
    ],
    conferir: [
      'Rode o comando ou o código: o compilador e a JVM são os juízes finais.',
      'Confira as versões: `java -version` no terminal e Help > About no IntelliJ.',
      'Compare a explicação com a aula e com a documentação oficial do JDK.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: "Hello World!" Application',
      url: 'https://docs.oracle.com/javase/tutorial/getStarted/application/index.html',
      tipo: 'documentacao',
      porque: 'O tutorial oficial clássico: o primeiro programa explicado linha a linha, com o papel de cada palavra do main.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Manual do comando java (JDK 21)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html',
      tipo: 'documentacao',
      porque: 'A referência do launcher: classpath, opções e as regras do modo arquivo-fonte.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção sobre o modo arquivo-fonte (source-file mode)',
    },
    {
      titulo: 'JEP 330: Launch Single-File Source-Code Programs',
      url: 'https://openjdk.org/jeps/330',
      tipo: 'documentacao',
      porque: 'A proposta que criou o `java Ola.java`, com as regras exatas do modo arquivo-fonte.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 512: Compact Source Files and Instance Main Methods',
      url: 'https://openjdk.org/jeps/512',
      tipo: 'documentacao',
      porque: 'Para a 1Z0-831: a ordem em que o Java 25 procura o método main.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS, capítulo 12: Execution',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html',
      tipo: 'documentacao',
      porque: 'A especificação da linguagem sobre como um programa começa a rodar. Denso, mas é a fonte da verdade.',
      gratuito: true,
      idioma: 'en',
      onde: '12.1 Java Virtual Machine Startup',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Your First Java Code',
      url: 'https://dev.java/learn/first-steps/first-java-code/',
      tipo: 'tutorial',
      porque: 'Tutorial do próprio time do Java: escrever, compilar e rodar o primeiro programa, inclusive no modo arquivo-fonte.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java main() Method Explained',
      url: 'https://www.baeldung.com/java-main-method',
      tipo: 'artigo',
      porque: 'Todas as variações válidas da assinatura do main, com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Difference Between JVM, JRE, and JDK',
      url: 'https://www.baeldung.com/jvm-vs-jre-vs-jdk',
      tipo: 'artigo',
      porque: 'As três siglas em camadas, com o que cada uma contém. Partes sobre rt.jar são anteriores ao Java 9.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Is Java a Compiled or Interpreted Language?',
      url: 'https://www.baeldung.com/java-compiled-interpreted',
      tipo: 'artigo',
      porque: 'Responde a pergunta clássica: as duas coisas, com o JIT no meio.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #02, Como Funciona o Java',
      url: 'https://www.youtube.com/watch?v=v_ZCtgwbS3o',
      tipo: 'video',
      porque: 'O Guanabara explica bytecode, JVM e a ideia de "escreva uma vez, rode em qualquer lugar", em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #04, Primeiro Programa em Java',
      url: 'https://www.youtube.com/watch?v=ijXXaIYsVx4',
      tipo: 'video',
      porque: 'O primeiro programa feito passo a passo, ideal se você nunca usou uma IDE.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Akitando #117: Linguagem Compilada vs Interpretada',
      url: 'https://akitaonrails.com/2022/04/15/akitando-117-linguagem-compilada-vs-interpretada-qual-e-melhor/',
      tipo: 'video',
      porque: 'Vai fundo: análise léxica, sintática, bytecode, JIT e linkers. A página tem o vídeo e a transcrição completa.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Seção "Hello World em C e Java"',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro de referência da certificação. O site dos autores tem a errata de cada edição.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seções sobre o ambiente Java, o método main e a execução pela linha de comando',
    },
    {
      titulo: 'Think Java, 2ª edição (Downey e Mayfield)',
      url: 'https://greenteapress.com/wp/think-java-2e/',
      tipo: 'livro',
      porque: 'Livro gratuito e leve, ótimo para quem está começando a programar.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 1, "Computer Programming"',
    },
  ],
  desafio: {
    titulo: 'Saudação com argumento opcional',
    enunciado:
      'Crie a classe `Saudacao`. Se o programa receber um argumento, imprima `Olá, <argumento>!`. Sem argumentos, imprima `Olá, mundo!`. Compile com `javac`, rode com e sem argumento, e depois rode de novo usando o modo arquivo-fonte.',
    dicas: [
      'Use `args.length` para saber se veio algum argumento.',
      'O operador ternário (`condição ? a : b`) resolve em uma linha. Você vai vê-lo a fundo na temporada de operadores.',
      'Teste também `java Saudacao "Ana Clara"` para ver as aspas juntando duas palavras.',
    ],
    solucao: `public class Saudacao {
    public static void main(String[] args) {
        String nome = args.length > 0 ? args[0] : "mundo";
        System.out.println("Olá, " + nome + "!");
    }
}`,
    saida: 'Olá, mundo!',
    comentarios:
      'Checar `args.length` antes de ler `args[0]` evita a `ArrayIndexOutOfBoundsException`. Como `args` nunca é `null`, não precisa testar `args != null`. Rodando com `java Saudacao.java Ana` o resultado é o mesmo, mas nenhum `Saudacao.class` aparece na pasta.',
  },
  bugs: [
    {
      id: 'estagiario-t1-e01-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: \';\' expected`.',
      codigo: `public class Ola {
    public static void main(String[] args) {
        System.out.println("Olá, Javaflix")
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Ola {
    public static void main(String[] args) {
        System.out.println("Olá, Javaflix");
    }
}`,
      saidaCorrigida: 'Olá, Javaflix',
      dica: 'Toda instrução em Java termina com um sinal. Procure a linha que termina sem ele.',
      explicacao: 'Em Java, cada instrução termina com `;`. O compilador aponta o erro no fim da linha onde esperava encontrar o ponto e vírgula, e é lá que ele falta.',
    },
    {
      id: 'estagiario-t1-e01-b02',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: package system does not exist`.',
      codigo: `public class Ola {
    public static void main(String[] args) {
        system.out.println("Primeiro dia");
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Ola {
    public static void main(String[] args) {
        System.out.println("Primeiro dia");
    }
}`,
      saidaCorrigida: 'Primeiro dia',
      dica: 'Java diferencia maiúsculas de minúsculas. Compare cada nome com o que você já viu funcionar.',
      explicacao: '`System` é uma classe, e o nome começa com maiúscula. Com `system`, o compilador procura algo chamado assim, não acha nada e supõe que fosse um pacote, daí a mensagem estranha.',
    },
    {
      id: 'estagiario-t1-e01-b03',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: unclosed character literal`.',
      codigo: `public class Ola {
    public static void main(String[] args) {
        System.out.println('Bom dia, turma');
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Ola {
    public static void main(String[] args) {
        System.out.println("Bom dia, turma");
    }
}`,
      saidaCorrigida: 'Bom dia, turma',
      dica: 'Em Java, aspas simples e aspas duplas não são a mesma coisa. O que cada uma delimita?',
      explicacao: 'Aspas simples delimitam um único caractere (`char`), como `\'a\'`. Texto vai entre aspas duplas (`String`). O compilador abriu um `char`, encontrou mais de um caractere e não achou o fechamento.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual ferramenta do JDK transforma `Ola.java` em bytecode?',
      opcoes: ['`java`', '`javac`', '`jar`', '`javadoc`', '`jshell`'],
      resposta: 1,
      explicacao:
        '`javac` é o compilador: lê o código-fonte e grava `Ola.class` com o bytecode. `java` executa, `jar` empacota, `javadoc` gera documentação e `jshell` é o console interativo.',
      dica: 'Duas ferramentas têm nomes parecidos: uma executa um programa pronto, a outra transforma o código-fonte. Qual o enunciado pede?',
    },
    {
      id: 'estagiario-t1-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Você tem `Ola.java` com `public class Ola` e um `main` válido. Qual sequência compila, gera `Ola.class` e executa o programa?',
      opcoes: [
        '`javac Ola.java` e depois `java Ola`',
        '`javac Ola` e depois `java Ola.class`',
        '`javac Ola.java` e depois `java Ola.class`',
        '`java Ola.java` e depois `java Ola`',
        '`jar Ola.java` e depois `java Ola`',
      ],
      resposta: 0,
      explicacao:
        '`javac` recebe o arquivo com extensão; `java` recebe o nome da classe sem extensão. `java Ola.java` até executa, mas compila em memória e não grava `Ola.class`, então o `java Ola` seguinte não encontra a classe.',
      dica: 'Um dos comandos recebe o nome do arquivo, com extensão; o outro recebe o nome da classe, sem extensão nenhuma.',
    },
    {
      id: 'estagiario-t1-e01-q03',
      tipo: 'multipla',
      dificuldade: 2,
      provas: ['829', '830'],
      enunciado:
        'No Java 21, sem recursos em preview, quais declarações dentro de `public class App` permitem executar o programa com `java App`? Escolha três.',
      opcoes: [
        '`public static void main(String[] args)`',
        '`public static void main(String... parametros)`',
        '`static public void main(String args[])`',
        '`public void main(String[] args)`',
        '`public static int main(String[] args)`',
        '`public static void main(String args)`',
      ],
      respostas: [0, 1, 2],
      explicacao:
        'Varargs, colchetes depois do nome, outro nome de parâmetro e a ordem `static public` não mudam a assinatura. Sem `static`, com retorno `int` ou com parâmetro `String` (sem array), o método compila, mas a JVM do Java 21 não o aceita como ponto de entrada.',
      dica: 'A JVM do Java 21 procura um método `static`, que não devolve nada e recebe um array de `String`. Confira essas três coisas em cada opção.',
    },
    {
      id: 'estagiario-t1-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      provas: ['831'],
      enunciado: 'No Java 25, o arquivo `Ola.java` abaixo é executado com `java Ola.java`. O que acontece?',
      codigo: `void main() {
    IO.println("Olá");
}`,
      opcoes: [
        'Imprime `Olá`',
        'Não compila: todo método precisa estar dentro de uma classe',
        'Não compila: `main` precisa ser `static`',
        'Compila, mas a JVM não encontra o método `main`',
        'Não compila: a classe `IO` não existe',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'Olá' },
      explicacao:
        'O Java 25 finalizou os arquivos-fonte compactos: o compilador cria uma classe implícita com o nome do arquivo, e a JVM aceita um `main` de instância, sem parâmetros. `IO` é uma classe nova de `java.lang`, importada automaticamente.',
      dica: 'Lembre o que o Java 25 finalizou para programas pequenos e qual classe nova do `java.lang` tem um `println`.',
    },
    {
      id: 'estagiario-t1-e01-q05',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O programa é executado com `java Contagem`, sem argumentos. Digite a saída exata.',
      codigo: `public class Contagem {
    public static void main(String[] args) {
        System.out.println(args.length);
        System.out.println(args.length > 0 ? args[0] : "vazio");
    }
}`,
      resposta: '0\nvazio',
      explicacao:
        'Sem argumentos, `args` é um array vazio: `args.length` vale 0 e a condição do ternário é falsa, então a segunda linha imprime `vazio`. Repare que `args` não é `null`, senão a primeira linha lançaria `NullPointerException`.',
      dica: 'Sem argumentos, `args` é um array vazio ou `null`? E qual lado o operador `? :` escolhe quando a condição é falsa?',
    },
    {
      id: 'estagiario-t1-e01-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O programa é executado com `java Saudacao Ana "Bia Souza" 42`. Qual é o valor de `args[1]`?',
      opcoes: [
        '`"Bia"`',
        '`"Bia Souza"`',
        'A String `"Bia Souza"` com as aspas fazendo parte do valor, 11 caracteres',
        '`"Ana"`',
        '`42`, um `int`',
      ],
      resposta: 1,
      explicacao:
        'Os índices começam em 0, então `args[1]` é o segundo argumento. As aspas no terminal só juntam as duas palavras num argumento e não fazem parte do valor. E `42` chegaria como a String `"42"`, nunca como `int`.',
      dica: 'No terminal, as aspas só juntam palavras com espaço: não entram no valor. E os índices de um array começam em 0.',
    },
    {
      id: 'estagiario-t1-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa é executado com `java Primeiro`, sem argumentos. Qual é o resultado?',
      codigo: `public class Primeiro {
    public static void main(String[] args) {
        System.out.print("Início ");
        System.out.println(args[0]);
    }
}`,
      opcoes: [
        'Imprime `Início null`',
        'Imprime `Início ` e depois lança `ArrayIndexOutOfBoundsException`',
        'Lança `NullPointerException` sem imprimir nada',
        'Não compila',
        'Imprime `Início` e termina normalmente',
      ],
      resposta: 1,
      verificar: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException', saida: 'Início' },
      explicacao:
        'O primeiro `print` executa normalmente. Depois, `args` é um array de tamanho 0, então acessar a posição 0 lança `ArrayIndexOutOfBoundsException`. Não há `null` envolvido: o array existe, só está vazio.',
      dica: 'Siga a ordem: o `print` acontece antes da linha que lê `args[0]`. O que existe na posição 0 de um array vazio?',
    },
    {
      id: 'estagiario-t1-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que o comando `java Calculadora.java` faz?',
      opcoes: [
        'Compila o arquivo em memória e executa a primeira classe declarada nele, sem gravar `.class` em disco',
        'Compila o arquivo, grava `Calculadora.class` e executa',
        'Interpreta o código-fonte linha a linha, sem compilar',
        'Só funciona com a opção `--enable-preview`',
        'Executa `Calculadora.class`, que precisa ter sido compilado antes',
      ],
      resposta: 0,
      explicacao:
        'Esse é o modo arquivo-fonte, disponível desde o Java 11. A compilação acontece de verdade, mas em memória. Por isso nenhum `.class` aparece na pasta.',
      dica: 'É o modo arquivo-fonte, do Java 11. Pense em onde a compilação acontece e se algum arquivo fica gravado no disco.',
    },
    {
      id: 'estagiario-t1-e01-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre bytecode e a JVM são verdadeiras? Escolha duas.',
      opcoes: [
        'O mesmo `.class` pode ser executado por JVMs de sistemas operacionais diferentes',
        'O `javac` gera código de máquina específico do processador',
        'A JVM pode compilar trechos de bytecode para código nativo enquanto o programa roda',
        'Para compilar um programa basta ter a JVM instalada',
        'Bytecode é o código-fonte compactado',
      ],
      respostas: [0, 2],
      explicacao:
        'Bytecode é independente de plataforma, e o compilador JIT da JVM transforma trechos muito usados em código nativo durante a execução. O `javac` não gera código de máquina, e ele faz parte do JDK, não da JVM.',
      dica: 'Pense em quem traduz para o processador, o `javac` ou a JVM, e em que momento isso acontece.',
    },
    {
      id: 'estagiario-t1-e01-q10',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Recado {
    public static void main(String[] args) {
        String texto = "Bom dia";
        System.out.println(texto);
        system.out.println(texto.length());
    }
}`,
      resposta: 5,
      explicacao:
        'Java diferencia maiúsculas de minúsculas. `system` com s minúsculo não existe; o compilador tenta interpretar como um pacote e falha com `package system does not exist`. O certo é `System`.',
      dica: 'O compilador diferencia maiúsculas de minúsculas. Compare os nomes usados nas linhas 4 e 5.',
    },
    {
      id: 'estagiario-t1-e01-q11',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o tipo do parâmetro para que `Eco` seja um ponto de entrada válido.',
      codigo: `public class Eco {
    public static void main(___ args) {
        System.out.println("args: " + args.length);
    }
}`,
      respostas: ['String[]', 'String...', 'final String[]', 'final String...'],
      saida: 'args: 0',
      explicacao:
        'O parâmetro precisa ser um array de String. As formas `String[]` e `String...` são equivalentes aqui, e `final` também é permitido. Uma `String` sozinha compilaria, mas não seria ponto de entrada.',
      dica: 'O parâmetro precisa ser um array de `String`, e existe mais de um jeito de escrever esse tipo.',
    },
    {
      id: 'estagiario-t1-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual ferramenta do JDK abre um console interativo para testar expressões Java sem criar uma classe?',
      opcoes: ['`javap`', '`jdeps`', '`jshell`', '`jlink`', '`javadoc`'],
      resposta: 2,
      explicacao:
        '`jshell` é o REPL do Java, disponível desde o Java 9. `javap` desmonta `.class`, `jdeps` analisa dependências, `jlink` monta runtimes e `javadoc` gera documentação.',
      dica: 'O nome da ferramenta junta "java" com o nome de um programa de terminal interativo.',
    },
    {
      id: 'estagiario-t1-e01-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata do programa. Linhas em branco contam.',
      codigo: `public class Placar {
    public static void main(String[] args) {
        System.out.print("Java");
        System.out.print(" ");
        System.out.println(21);
        System.out.println();
        System.out.print("fim");
    }
}`,
      resposta: 'Java 21\n\nfim',
      explicacao:
        'Os dois `print` escrevem na mesma linha, e o `println(21)` completa e quebra a linha. O `println()` vazio gera a linha em branco. O último `print` escreve `fim` sem quebra, o que não muda o que aparece na tela.',
      dica: 'Só o `println` pula linha. Um `println()` sem argumento imprime apenas a quebra, e o último `print` não pula.',
    },
    {
      id: 'estagiario-t1-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar este arquivo?',
      codigo: `public class Ordem {
    public void static main(String[] args) {
        System.out.println("rodou");
    }
}`,
      opcoes: [
        'Compila, e `java Ordem` imprime `rodou`',
        'Não compila',
        'Compila, mas `java Ordem` falha porque não acha o `main`',
        'Compila, mas `java Ordem` não imprime nada',
      ],
      resposta: 1,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao:
        'O tipo de retorno precisa vir imediatamente antes do nome do método. Com `void` antes de `static`, o compilador não entende a declaração. Modificadores podem trocar de ordem entre si (`static public`), mas nunca depois do tipo de retorno.',
      dica: 'Na declaração de um método, o tipo de retorno vem colado no nome. Onde está o `void` aqui?',
    },
    {
      id: 'estagiario-t1-e01-q15',
      tipo: 'multipla',
      dificuldade: 3,
      provas: ['829', '830'],
      enunciado:
        'Uma classe compila sem erros, mas `java App` falha no Java 21 dizendo que não encontrou um método main válido. Quais declarações de `main` podem explicar isso? Escolha duas.',
      opcoes: [
        '`public void main(String[] args)`',
        '`static public void main(String... a)`',
        '`public static void main(String args)`',
        '`public static final void main(String[] args)`',
        '`public static void main(final String[] args)`',
      ],
      respostas: [0, 2],
      explicacao:
        'As duas compilam como métodos comuns, mas não são pontos de entrada no Java 21: uma não é `static` e a outra recebe `String` em vez de `String[]`. As demais são variações válidas: ordem de modificadores, varargs, método `final` e parâmetro `final`.',
      dica: 'Uma declaração que compila mas não serve de ponto de entrada é só um método comum. Procure a que não é `static` e a que não recebe um array.',
    },
  ],
};

export default episodio;
