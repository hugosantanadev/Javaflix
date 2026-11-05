import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t2-e04',
  minutos: 13,
  aula,
  armadilhas: [
    'Heap e metaspace são compartilhados; pilha e PC são de cada thread.',
    'Objetos ficam no heap; a pilha guarda frames com variáveis locais.',
    'A classe só é inicializada no primeiro uso ativo, não quando o programa começa.',
    'Ler uma constante `static final` não inicializa a classe: o valor foi copiado pelo `javac`.',
    'Declarar uma variável do tipo de uma classe, sem usá-la, não inicializa a classe.',
    'Exceção num inicializador `static` aparece como `ExceptionInInitializerError`.',
    'Java começa interpretado; medir desempenho sem aquecimento mede o interpretador.',
  ],
  ia: {
    uso:
      'A IA explica bem as áreas de memória da JVM e o papel do JIT, e ajuda a ler a saída do `javap -c`. Para afirmações de desempenho, peça a fonte ou meça, porque mitos antigos sobre a JVM aparecem com frequência.',
    pedido:
      'Estou estudando a JVM por dentro.\n<cole a saída do javap -c aqui>\n- Explique cada instrução e mostre a pilha de operandos depois de cada uma.\n- Diga em que área de memória ficam as variáveis locais, os objetos e o bytecode deste método.\n- Diga quando a classe é inicializada e se alguma constante foi copiada pelo javac.',
    erros: [
      'Diz que o Java é interpretado, ignorando o JIT.',
      'Afirma que `System.gc()` libera a memória na hora.',
      'Recomenda `final` em métodos "para ficar mais rápido".',
    ],
    conferir: [
      'Rode `javap -c` na classe e compare com a explicação.',
      'Use `-XX:+PrintCompilation` para ver quais métodos o JIT compilou.',
      'Meça desempenho com JMH, nunca com um laço e `currentTimeMillis`.',
    ],
  },
  recursos: [
    {
      titulo: 'JVMS 2.5: Run-Time Data Areas',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5',
      tipo: 'documentacao',
      porque: 'A definição oficial de heap, pilhas, PC e área de métodos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JVMS 5.5: Initialization',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-5.html#jvms-5.5',
      tipo: 'documentacao',
      porque: 'A lista exata de eventos que disparam a inicialização de uma classe.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Manual do javap (JDK 21)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/javap.html',
      tipo: 'documentacao',
      porque: 'A ferramenta para ver o bytecode de qualquer classe: `javap -c` mostra as instruções.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Tiered Compilation in JVM',
      url: 'https://www.baeldung.com/jvm-tiered-compilation',
      tipo: 'artigo',
      porque: 'Como o interpretador, o C1 e o C2 se revezam, com as camadas e os limites de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: View Bytecode of a Class File in Java',
      url: 'https://www.baeldung.com/java-class-view-bytecode',
      tipo: 'artigo',
      porque: 'O `javap` e outras ferramentas para inspecionar bytecode, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #02, Como Funciona o Java',
      url: 'https://www.youtube.com/watch?v=v_ZCtgwbS3o',
      tipo: 'video',
      porque: 'A ideia de bytecode e JVM explicada do zero, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Akitando #117: Linguagem Compilada vs Interpretada',
      url: 'https://akitaonrails.com/2022/04/15/akitando-117-linguagem-compilada-vs-interpretada-qual-e-melhor/',
      tipo: 'video',
      porque: 'Bytecode, interpretadores e JIT comparados entre Java, Python, JavaScript e outras.',
      gratuito: true,
      idioma: 'pt',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 12.4.1: When Initialization Occurs',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.4.1',
      tipo: 'documentacao',
      porque: 'A regra, na linguagem, que explica por que ler uma constante não inicializa a classe. Tem exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'dev.java: Getting to Know the JVM',
      url: 'https://dev.java/learn/jvm/',
      tipo: 'tutorial',
      porque: 'O tutorial oficial sobre a JVM: carregamento de classes, memória, JIT e ferramentas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Introduction to Garbage Collection Tuning',
      url: 'https://docs.oracle.com/en/java/javase/21/gctuning/introduction-garbage-collection-tuning.html',
      tipo: 'documentacao',
      porque: 'O guia oficial dos coletores (G1, ZGC, Parallel) e de quando escolher cada um.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 483: Ahead-of-Time Class Loading & Linking',
      url: 'https://openjdk.org/jeps/483',
      tipo: 'documentacao',
      porque: 'O cache de início rápido do Java 24, com números de quanto ele economiza.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'GraalVM: Native Image',
      url: 'https://www.graalvm.org/latest/reference-manual/native-image/',
      tipo: 'documentacao',
      porque: 'Como compilar Java para um executável nativo e o que deixa de funcionar.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: JVM Garbage Collectors',
      url: 'https://www.baeldung.com/jvm-garbage-collectors',
      tipo: 'artigo',
      porque: 'Os coletores da HotSpot lado a lado, com a opção de linha de comando de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JMH',
      url: 'https://github.com/openjdk/jmh',
      tipo: 'ferramenta',
      porque: 'A ferramenta do OpenJDK para medir desempenho direito, com aquecimento e sem enganar o JIT.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Uma máquina de pilha',
    enunciado:
      'Escreva a classe `MaquinaDePilha` que executa um programa de instruções `PUSH n`, `ADD`, `MUL`, `SUB` e `PRINT`, guardado num array de Strings, usando uma pilha de inteiros. Rode o programa que calcula `(2 + 3) * 4 - 6` e imprima o resultado:\n\n```text\n14\n```',
    dicas: [
      '`ArrayDeque<Integer>` funciona como pilha com `push` e `pop`.',
      'Em `SUB`, cuidado com a ordem: o primeiro `pop` é o operando da direita.',
      'O programa fica: PUSH 2, PUSH 3, ADD, PUSH 4, MUL, PUSH 6, SUB, PRINT.',
    ],
    solucao: `import java.util.ArrayDeque;

public class MaquinaDePilha {
    public static void main(String[] args) {
        String[] programa = {"PUSH 2", "PUSH 3", "ADD", "PUSH 4", "MUL", "PUSH 6", "SUB", "PRINT"};
        ArrayDeque<Integer> pilha = new ArrayDeque<>();
        for (String instrucao : programa) {
            String[] partes = instrucao.split(" ");
            switch (partes[0]) {
                case "PUSH" -> pilha.push(Integer.parseInt(partes[1]));
                case "ADD" -> pilha.push(pilha.pop() + pilha.pop());
                case "MUL" -> pilha.push(pilha.pop() * pilha.pop());
                case "SUB" -> {
                    int direita = pilha.pop();
                    int esquerda = pilha.pop();
                    pilha.push(esquerda - direita);
                }
                case "PRINT" -> System.out.println(pilha.peek());
                default -> throw new IllegalStateException("instrução desconhecida: " + instrucao);
            }
        }
    }
}`,
    saida: '14',
    comentarios:
      'É a mesma ideia do bytecode: `iload`/`bipush` empilham, `iadd`/`imul`/`isub` desempilham dois valores e empilham o resultado. Repare que a expressão não precisou de parênteses: a ordem das instruções já resolve a precedência, o que é chamado de notação pós-fixa. Um interpretador de verdade é este laço com mais instruções e muita otimização.',
  },
  bugs: [
    {
      id: 'aprendiz-t2-e04-b01',
      dificuldade: 1,
      sintoma: 'O programa cai no primeiro uso de `Config` com `ExceptionInInitializerError`, causado por `NumberFormatException: For input string: "80 80"`.',
      codigo: `class Config {
    static int porta = Integer.parseInt("80 80");
}

public class Servidor {
    public static void main(String[] args) {
        System.out.println("subindo na porta " + Config.porta);
    }
}`,
      linha: 2,
      efeito: { tipo: 'excecao', nome: 'ExceptionInInitializerError' },
      correcao: `class Config {
    static int porta = Integer.parseInt("8080");
}

public class Servidor {
    public static void main(String[] args) {
        System.out.println("subindo na porta " + Config.porta);
    }
}`,
      saidaCorrigida: 'subindo na porta 8080',
      dica: 'A exceção aparece quando `Config` é inicializada. O que a inicialização de `Config` executa?',
      explicacao: 'O valor inicial de um campo `static` roda na inicialização da classe. Uma exceção ali é embrulhada em `ExceptionInInitializerError`, e a causa real fica na linha "Caused by". O texto com espaço não é um número válido para `parseInt`.',
    },
    {
      id: 'aprendiz-t2-e04-b02',
      dificuldade: 2,
      sintoma: 'A máquina de pilha de brinquedo calcula `7 2 -` como `-5`, quando deveria dar 5.',
      codigo: `import java.util.ArrayDeque;
import java.util.Deque;

public class MaquinaDePilha {
    public static void main(String[] args) {
        Deque<Integer> pilha = new ArrayDeque<>();
        pilha.push(7);
        pilha.push(2);
        int a = pilha.pop();
        int b = pilha.pop();
        pilha.push(a - b);
        System.out.println(pilha.pop());
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: '-5' },
      correcao: `import java.util.ArrayDeque;
import java.util.Deque;

public class MaquinaDePilha {
    public static void main(String[] args) {
        Deque<Integer> pilha = new ArrayDeque<>();
        pilha.push(7);
        pilha.push(2);
        int a = pilha.pop();
        int b = pilha.pop();
        pilha.push(b - a);
        System.out.println(pilha.pop());
    }
}`,
      saidaCorrigida: '5',
      dica: 'Qual valor sai primeiro da pilha: o 7, que entrou primeiro, ou o 2?',
      explicacao: 'A pilha devolve primeiro o último que entrou: `a` é o 2 e `b` é o 7. Para soma e multiplicação a ordem não importa, mas para subtração e divisão sim. O `isub` da JVM faz exatamente isso: o operando de baixo menos o de cima.',
    },
    {
      id: 'aprendiz-t2-e04-b03',
      dificuldade: 3,
      sintoma: 'O tempo limite deveria ser o dobro do padrão, 20 segundos, mas a configuração mostra `limite = 0`.',
      codigo: `class Tempo {
    static int limite = Tempo.padrao * 2;
    static int padrao = 10;
}

public class Painel {
    public static void main(String[] args) {
        System.out.println("limite = " + Tempo.limite);
    }
}`,
      linha: 2,
      efeito: { tipo: 'saida', saida: 'limite = 0' },
      correcao: `class Tempo {
    static int padrao = 10;
    static int limite = Tempo.padrao * 2;
}

public class Painel {
    public static void main(String[] args) {
        System.out.println("limite = " + Tempo.limite);
    }
}`,
      saidaCorrigida: 'limite = 20',
      dica: 'Os campos `static` recebem os valores iniciais em que ordem? Quanto vale `padrao` antes de receber o 10?',
      explicacao: 'A inicialização da classe executa os inicializadores `static` na ordem em que aparecem no código. Quando `limite` é calculado, `padrao` ainda tem o valor padrão, 0. O nome qualificado `Tempo.padrao` engana o compilador, que recusaria `padrao * 2` sozinho. Declare primeiro o que é usado depois.',
    },
  ],
  exercicios: [
    {
      id: 'aprendiz-t2-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a principal desvantagem de um interpretador puro em relação a um compilador antecipado?',
      opcoes: [
        'É mais lento, porque analisa e executa o código de novo a cada vez',
        'Não é portável entre sistemas operacionais',
        'Não consegue executar laços',
        'Precisa de um compilador C instalado',
      ],
      resposta: 0,
      explicacao: 'O interpretador ganha em portabilidade e começa a rodar na hora, mas paga o custo de entender cada instrução toda vez que ela executa. O JIT existe justamente para tirar esse custo dos trechos que rodam muito.',
      dica: 'O interpretador refaz o trabalho a cada execução da linha.',
    },
    {
      id: 'aprendiz-t2-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Config {
    static {
        System.out.println("Config inicializada");
    }
    static int porta = 8080;
}

public class Main {
    public static void main(String[] args) {
        System.out.println("início");
        System.out.println(Config.porta);
    }
}`,
      opcoes: [
        '`início\nConfig inicializada\n8080`',
        '`Config inicializada\ninício\n8080`',
        '`início\n8080`',
        '`início\n8080\nConfig inicializada`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A JVM só inicializa `Config` quando o campo estático é lido, depois de `início` já ter sido impresso. O bloco `static` roda uma única vez, logo antes do primeiro uso.',
      dica: 'A classe só é inicializada no primeiro uso ativo.',
    },
    {
      id: 'aprendiz-t2-e04-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A única mudança em relação ao código anterior é o `final`. Qual é a saída agora?',
      codigo: `class Config {
    static {
        System.out.println("Config inicializada");
    }
    static final int PORTA = 8080;
}

public class Main {
    public static void main(String[] args) {
        System.out.println("início");
        System.out.println(Config.PORTA);
    }
}`,
      opcoes: [
        '`início\n8080`',
        '`início\nConfig inicializada\n8080`',
        '`Config inicializada\ninício\n8080`',
        'Não compila: constantes não podem ficar em classes com bloco `static`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`PORTA` é uma constante de compilação. O `javac` copia o 8080 direto no bytecode de `Main`, que nem chega a tocar em `Config`. Sem uso ativo, a classe não é inicializada e o bloco `static` não roda.',
      dica: 'Constantes `static final` são copiadas para quem usa.',
    },
    {
      id: 'aprendiz-t2-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais áreas de memória da JVM são compartilhadas por todas as threads? Escolha duas.',
      opcoes: ['Heap', 'Metaspace (área de métodos)', 'Pilha da JVM', 'PC', 'Variáveis locais'],
      respostas: [0, 1],
      explicacao: 'Objetos e estrutura das classes são de todos. Cada thread tem a sua pilha (com as variáveis locais) e o seu PC, porque cada uma está num ponto diferente do programa.',
      dica: 'Uma pilha e um PC são de cada thread.',
    },
    {
      id: 'aprendiz-t2-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a JVM verifica o bytecode antes de executá-lo?',
      opcoes: [
        'Para garantir que ele não viole tipos nem a pilha, e assim não corrompa a memória',
        'Para traduzi-lo para código nativo',
        'Para conferir se o código-fonte tem erros de sintaxe',
        'Para comprimir o arquivo `.class`',
      ],
      resposta: 0,
      explicacao: 'O `.class` pode ter vindo de qualquer lugar, até de um compilador malicioso. O verificador confere tipos, pilha e inicialização das variáveis antes de executar, e é parte do que torna a JVM segura.',
      dica: 'Um `.class` pode ter sido adulterado.',
    },
    {
      id: 'aprendiz-t2-e04-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que faz o compilador JIT?',
      opcoes: [
        'Compila para código nativo os trechos de bytecode mais executados, durante a execução',
        'Compila o código-fonte Java para bytecode',
        'Remove objetos que não são mais usados',
        'Carrega as classes do classpath',
      ],
      resposta: 0,
      explicacao: 'Just-in-time quer dizer "na hora certa": o JIT espera descobrir quais trechos são quentes e só então gasta tempo compilando-os. Bytecode é trabalho do `javac`, e remover objetos é do coletor de lixo.',
      dica: '*Just in time*: na hora em que precisa.',
    },
    {
      id: 'aprendiz-t2-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que medições de desempenho em Java precisam de aquecimento?',
      opcoes: [
        'Porque o código começa interpretado e só fica rápido depois que o JIT o compila',
        'Porque a JVM reduz a velocidade nos primeiros segundos para economizar energia',
        'Porque o coletor de lixo só começa a funcionar depois de um tempo',
        'Porque o bytecode precisa ser baixado da internet',
      ],
      resposta: 0,
      explicacao: 'Nas primeiras execuções você mede o interpretador e o próprio trabalho de compilar. Ferramentas como o JMH rodam o código muitas vezes antes de começar a medir.',
      dica: 'O código começa interpretado.',
    },
    {
      id: 'aprendiz-t2-e04-q08',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais plataformas executam bytecode numa máquina virtual? Escolha duas.',
      opcoes: ['Java, na JVM', 'C#, no .NET', 'C compilado com gcc', 'Assembly x86', 'Rust'],
      respostas: [0, 1],
      explicacao: 'Java e C# compilam para um bytecode próprio e usam JIT. C e Rust são compilados antecipadamente para código de máquina, e assembly já é código de máquina com nomes.',
      dica: 'Quais têm bytecode e máquina virtual?',
    },
    {
      id: 'aprendiz-t2-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa máquina de pilha, qual sequência calcula `a * b + c`?',
      opcoes: [
        'empilha a, empilha b, multiplica, empilha c, soma',
        'empilha a, multiplica, empilha b, soma, empilha c',
        'multiplica, soma, empilha a, empilha b, empilha c',
        'empilha a, empilha b, empilha c, soma, multiplica',
      ],
      resposta: 0,
      explicacao: 'Cada operação usa os dois valores do topo. Primeiro `a` e `b` são empilhados e multiplicados; o resultado fica no topo, `c` é empilhado e a soma junta os dois. A última opção calcularia `a * (b + c)`.',
      dica: 'Os operandos são empilhados antes da operação.',
    },
    {
      id: 'aprendiz-t2-e04-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `class A {
    static {
        System.out.println("A");
    }
    static void oi() {
        System.out.println("oi de A");
    }
}

class B {
    static {
        System.out.println("B");
    }
}

public class Ordem {
    public static void main(String[] args) {
        System.out.println("main");
        A.oi();
        A.oi();
        B b = null;
        System.out.println("fim");
    }
}`,
      resposta: 'main\nA\noi de A\noi de A\nfim',
      explicacao: 'A primeira chamada a `A.oi()` inicializa `A`, e a segunda não repete o bloco `static`. Declarar `B b = null` não é um uso ativo: nenhum objeto é criado e nenhum membro estático é acessado, então `B` nunca é inicializada.',
      dica: 'A inicialização acontece uma vez, no primeiro uso; siga a ordem do `main`.',
    },
    {
      id: 'aprendiz-t2-e04-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Onde ficam os objetos criados com `new`?',
      opcoes: ['No heap', 'Na pilha da thread', 'No metaspace', 'No PC', 'No arquivo `.class`'],
      resposta: 0,
      explicacao: 'Todo objeto e todo array vivem no heap, compartilhado entre as threads. Uma variável local guarda só a referência, e essa referência fica no frame, na pilha.',
      dica: 'Objetos não ficam na pilha.',
    },
    {
      id: 'aprendiz-t2-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quando um objeto pode ser recolhido pelo coletor de lixo?',
      opcoes: [
        'Quando não há mais nenhuma referência alcançável que leve até ele',
        'Assim que o método que o criou termina',
        'Quando o programador chama `delete`',
        'Depois de um tempo fixo, definido na criação',
      ],
      resposta: 0,
      explicacao: 'O coletor parte das raízes (variáveis locais ativas, campos estáticos) e marca tudo o que alcança. O que sobra é lixo. Um objeto devolvido por um método continua vivo se quem chamou guardou a referência.',
      dica: 'O coletor segue as referências a partir das raízes.',
    },
    {
      id: 'aprendiz-t2-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a troca ao usar o GraalVM Native Image para compilar Java antecipadamente?',
      opcoes: [
        'Início muito mais rápido e menos memória, mas build demorado e sem as otimizações que dependem de observar o programa rodando',
        'O programa fica sempre mais rápido em tudo, sem nenhuma desvantagem',
        'O programa passa a rodar em qualquer sistema operacional sem recompilar',
        'O código Java é convertido para C antes de rodar',
      ],
      resposta: 0,
      explicacao: 'Um executável nativo não precisa carregar classes nem aquecer, por isso é ótimo para serverless e linha de comando. Em compensação, perde a portabilidade do bytecode e as otimizações especulativas do JIT.',
      dica: 'Compilar antes ganha no início e perde o que só se descobre rodando.',
    },
    {
      id: 'aprendiz-t2-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `class Falha {
    static int x = 10 / 0;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Falha.x);
    }
}`,
      opcoes: [
        'Lança `ExceptionInInitializerError`',
        'Lança `ArithmeticException` diretamente, sem embrulho',
        'Não compila: divisão por zero',
        'Imprime `0`',
        'Imprime `Infinity`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ExceptionInInitializerError' },
      explicacao: 'A divisão inteira por zero lança `ArithmeticException` durante a inicialização da classe. A JVM embrulha qualquer exceção que escape de um inicializador `static` num `ExceptionInInitializerError`. O compilador não recusa `10 / 0`, porque isso só falha na execução.',
      dica: 'Exceção no inicializador `static` é embrulhada.',
    },
    {
      id: 'aprendiz-t2-e04-q15',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'O que faz parte do motor de execução da JVM? Escolha duas.',
      opcoes: ['O interpretador de bytecode', 'O compilador JIT', 'O `javac`', 'A IDE', 'O classpath'],
      respostas: [0, 1],
      explicacao: 'O motor de execução interpreta e compila bytecode enquanto o programa roda, junto com o coletor de lixo. O `javac` roda antes, separado da JVM, e o classpath é só a lista de lugares onde procurar classes.',
      dica: 'O motor executa bytecode.',
    },
  ],
};

export default episodio;
