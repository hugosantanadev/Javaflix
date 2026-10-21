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
    },
    {
      id: 'aprendiz-t2-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais áreas de memória da JVM são compartilhadas por todas as threads? Escolha duas.',
      opcoes: ['Heap', 'Metaspace (área de métodos)', 'Pilha da JVM', 'PC', 'Variáveis locais'],
      respostas: [0, 1],
      explicacao: 'Objetos e estrutura das classes são de todos. Cada thread tem a sua pilha (com as variáveis locais) e o seu PC, porque cada uma está num ponto diferente do programa.',
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
    },
    {
      id: 'aprendiz-t2-e04-q08',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais plataformas executam bytecode numa máquina virtual? Escolha duas.',
      opcoes: ['Java, na JVM', 'C#, no .NET', 'C compilado com gcc', 'Assembly x86', 'Rust'],
      respostas: [0, 1],
      explicacao: 'Java e C# compilam para um bytecode próprio e usam JIT. C e Rust são compilados antecipadamente para código de máquina, e assembly já é código de máquina com nomes.',
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
    },
    {
      id: 'aprendiz-t2-e04-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Onde ficam os objetos criados com `new`?',
      opcoes: ['No heap', 'Na pilha da thread', 'No metaspace', 'No PC', 'No arquivo `.class`'],
      resposta: 0,
      explicacao: 'Todo objeto e todo array vivem no heap, compartilhado entre as threads. Uma variável local guarda só a referência, e essa referência fica no frame, na pilha.',
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
    },
    {
      id: 'aprendiz-t2-e04-q15',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'O que faz parte do motor de execução da JVM? Escolha duas.',
      opcoes: ['O interpretador de bytecode', 'O compilador JIT', 'O `javac`', 'A IDE', 'O classpath'],
      respostas: [0, 1],
      explicacao: 'O motor de execução interpreta e compila bytecode enquanto o programa roda, junto com o coletor de lixo. O `javac` roda antes, separado da JVM, e o classpath é só a lista de lugares onde procurar classes.',
    },
  ],
};

export default episodio;
