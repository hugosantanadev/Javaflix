import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t1-e03',
  minutos: 13,
  aula,
  armadilhas: [
    'Um objeto fica elegível quando nenhuma referência alcançável aponta para ele, não quando "uma" variável vira `null`.',
    'Reatribuir uma variável pode deixar o objeto antigo elegível, se ninguém mais o referenciar.',
    'Ilhas de objetos que só se referenciam entre si são elegíveis.',
    'Um ciclo que ainda é alcançado por alguma variável não é elegível: confira cada seta.',
    'Objetos guardados em campos `static` continuam alcançáveis depois que o método termina.',
    'Elegível não é coletado: a prova nunca garante quando o GC roda.',
    '`System.gc()` é só uma sugestão, e `finalize()` pode nunca ser chamado.',
    '`try` com recursos só aceita tipos que implementam `AutoCloseable`, e fecha na ordem inversa.',
  ],
  ia: {
    uso:
      'A IA ajuda a desenhar as referências linha a linha e a contar objetos elegíveis, e explica bem as gerações e os coletores da HotSpot. Use-a também para revisar código que abre recursos: é onde um `close` esquecido custa caro, e onde ela às vezes propõe atalhos errados, como confiar no GC.',
    pedido:
      'Analise este trecho Java 21.\n<cole o código aqui>\n- Depois de cada linha, liste as setas de cada variável e diga quais objetos ficaram sem referência alcançável.\n- Aponte recursos (arquivos, conexões, streams) abertos fora de try com recursos.\n- Não use System.gc() nem finalize na resposta.',
    erros: [
      'Afirma que `System.gc()` garante a coleta.',
      'Recomenda atribuir `null` a variáveis locais para ajudar o GC.',
      'Fecha recursos com `close()` no fim do bloco, sem `try` com recursos, e a exceção pula o fechamento.',
    ],
    conferir: [
      'Refaça o desenho das setas você mesmo e compare a contagem.',
      'Procure todo recurso aberto e confira se está num `try` com recursos.',
      'Desconfie de qualquer resposta que dependa de quando o GC vai rodar.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Creating and Using Objects, The Garbage Collector',
      url: 'https://dev.java/learn/language/oop/classes-objects/creating-objects/#the-garbage-collector',
      tipo: 'documentacao',
      porque: 'Quando um objeto deixa de ser referenciado e o que o coletor faz com ele, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Java Garbage Collection Basics',
      url: 'https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html',
      tipo: 'tutorial',
      porque: 'O passo a passo ilustrado de marcação, varredura, gerações e promoção de objetos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'HotSpot Virtual Machine Garbage Collection Tuning Guide',
      url: 'https://docs.oracle.com/en/java/javase/21/gctuning/introduction-garbage-collection-tuning.html',
      tipo: 'documentacao',
      porque: 'O guia oficial dos coletores da HotSpot, das gerações às metas de pausa.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 421: Deprecate Finalization for Removal',
      url: 'https://openjdk.org/jeps/421',
      tipo: 'documentacao',
      porque: 'Por que o `finalize` nunca foi confiável e o que usar no lugar dele.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.ref.Cleaner',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ref/Cleaner.html',
      tipo: 'documentacao',
      porque: 'A alternativa moderna ao `finalize` para liberar recursos nativos de objetos inalcançáveis.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: JVM Garbage Collectors',
      url: 'https://www.baeldung.com/jvm-garbage-collectors',
      tipo: 'artigo',
      porque: 'Serial, Parallel, G1 e ZGC comparados, com as opções que ativam cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 66, Garbage Collector (Coletor de Lixo)',
      url: 'https://www.youtube.com/watch?v=_11TPkgZARk',
      tipo: 'video',
      porque: 'Quando um objeto fica elegível e por que `System.gc()` não garante nada, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Fernanda Kipper: Entendendo o coletor de lixo do Java (heap, stack, garbage collector)',
      url: 'https://www.youtube.com/watch?v=cgUfurMJosE',
      tipo: 'video',
      porque: 'Pilha e heap desenhados, com o caminho de um objeto até a coleta.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Computerphile: Garbage Collection (Mark & Sweep)',
      url: 'https://www.youtube.com/watch?v=c32zXYAK7CI',
      tipo: 'video',
      porque: 'O algoritmo de marcação a partir das raízes, explicado no quadro, sem depender de linguagem.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java: Garbage Collection in Java, The progress since JDK 8',
      url: 'https://www.youtube.com/watch?v=L68zxvl2LPY',
      tipo: 'video',
      porque: 'O canal oficial do Java mostra como G1, ZGC e Parallel evoluíram nas últimas versões.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Garbage Collection Handbook (Jones, Hosking e Moss)',
      url: 'https://gchandbook.org/',
      tipo: 'livro',
      porque: 'A referência sobre coleta de lixo: contagem de referências, marcação, cópia e coletores geracionais.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Mark-sweep garbage collection", e Cap. 9, "Generational garbage collection"',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os diagramas de referências linha a linha, iguais às questões de elegibilidade da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seção "Destroying Objects", partes "Understanding Garbage Collection" e "Tracing Eligibility"',
    },
  ],
  desafio: {
    titulo: 'Simule a marcação do GC',
    enunciado:
      'Cada objeto do heap é um número, e `refs[i]` lista para quem o objeto `i` aponta. Escreva `coletar(int[][] refs, int[] raizes)`, que marca tudo o que é alcançável a partir das raízes e imprime os vivos e o lixo. Use este heap:\n\n```java\nint[][] refs = {\n    {1},     // 0 -> 1\n    {2},     // 1 -> 2\n    {},      // 2\n    {4},     // 3 -> 4\n    {3},     // 4 -> 3\n    {2, 6},  // 5 -> 2 e 6\n    {}       // 6\n};\n```\n\nCom as raízes `{0}`, `{5}` e `{0, 3}`, a saída deve ser:\n\n```text\nVivos: [0, 1, 2] | Lixo: [3, 4, 5, 6]\nVivos: [2, 5, 6] | Lixo: [0, 1, 3, 4]\nVivos: [0, 1, 2, 3, 4] | Lixo: [5, 6]\n```',
    dicas: [
      'Guarde a marcação num `boolean[] vivo` do tamanho do heap.',
      'Marcar é uma busca em profundidade recursiva, como no episódio de [grafos](/assistir/aprendiz-t4-e06): se já está marcado, pare; senão, marque e visite cada destino.',
      'Sem a parada para objetos já marcados, a ilha 3 e 4 faria a recursão rodar para sempre.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Coletor {
    static void marcar(int obj, int[][] refs, boolean[] vivo) {
        if (vivo[obj]) return;
        vivo[obj] = true;
        for (int destino : refs[obj]) {
            marcar(destino, refs, vivo);
        }
    }

    static void coletar(int[][] refs, int[] raizes) {
        boolean[] vivo = new boolean[refs.length];
        for (int r : raizes) {
            marcar(r, refs, vivo);
        }
        List<Integer> vivos = new ArrayList<>();
        List<Integer> lixo = new ArrayList<>();
        for (int i = 0; i < refs.length; i++) {
            if (vivo[i]) vivos.add(i);
            else lixo.add(i);
        }
        System.out.println("Vivos: " + vivos + " | Lixo: " + lixo);
    }

    public static void main(String[] args) {
        int[][] refs = {
            {1},
            {2},
            {},
            {4},
            {3},
            {2, 6},
            {}
        };
        coletar(refs, new int[] {0});
        coletar(refs, new int[] {5});
        coletar(refs, new int[] {0, 3});
    }
}`,
    saida: 'Vivos: [0, 1, 2] | Lixo: [3, 4, 5, 6]\nVivos: [2, 5, 6] | Lixo: [0, 1, 3, 4]\nVivos: [0, 1, 2, 3, 4] | Lixo: [5, 6]',
    comentarios:
      'É exatamente a fase de marcação de um coletor real: o que não foi alcançado é lixo, sem precisar olhar o lixo um a um. Repare que 3 e 4 se referenciam e mesmo assim são lixo no primeiro caso, a ilha de isolamento. Coletores de verdade não usam recursão, que estouraria a pilha com grafos grandes: usam uma pilha explícita de objetos a visitar.',
  },
  bugs: [
    {
      id: 'junior-t1-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: variable linha is already defined in method main(String[])`.',
      codigo: `public class Relatorio {
    public static void main(String[] args) {
        StringBuilder linha = null;
        for (int i = 1; i <= 2; i++) {
            StringBuilder linha = new StringBuilder("item " + i);
        }
        System.out.println(linha);
    }
}`,
      linha: 5,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Relatorio {
    public static void main(String[] args) {
        StringBuilder linha = null;
        for (int i = 1; i <= 2; i++) {
            linha = new StringBuilder("item " + i);
        }
        System.out.println(linha);
    }
}`,
      saidaCorrigida: 'item 2',
      dica: 'Dentro do laço, a linha 5 atribui à variável de fora ou declara outra?',
      explicacao: 'Com o tipo na frente, a linha 5 declara uma nova variável `linha`, e o Java não deixa uma local esconder outra do mesmo método. A intenção era atribuir à variável de fora, que continua existindo depois do laço: basta tirar o tipo.',
    },
    {
      id: 'junior-t1-e03-b02',
      dificuldade: 2,
      sintoma: 'A auditoria deveria registrar `login;logout;`, mas só aparece `login;`.',
      codigo: `class Log implements AutoCloseable {
    StringBuilder texto = new StringBuilder();
    boolean aberto = true;

    void escrever(String s) {
        if (aberto) texto.append(s).append(';');
    }

    public void close() {
        aberto = false;
    }
}

public class Auditoria {
    public static void main(String[] args) {
        Log log = new Log();
        try (log) {
            log.escrever("login");
        }
        log.escrever("logout");
        System.out.println(log.texto);
    }
}`,
      linha: 20,
      efeito: { tipo: 'saida', saida: 'login;' },
      correcao: `class Log implements AutoCloseable {
    StringBuilder texto = new StringBuilder();
    boolean aberto = true;

    void escrever(String s) {
        if (aberto) texto.append(s).append(';');
    }

    public void close() {
        aberto = false;
    }
}

public class Auditoria {
    public static void main(String[] args) {
        Log log = new Log();
        try (log) {
            log.escrever("login");
            log.escrever("logout");
        }
        System.out.println(log.texto);
    }
}`,
      saidaCorrigida: 'login;logout;',
      dica: 'Em que momento o `try` com recursos chama o `close()`? O `logout` vem antes ou depois disso?',
      explicacao: 'O `try` com recursos fecha o recurso assim que o bloco termina. O `logout` é escrito depois do fechamento, e o `Log` já fechado ignora a escrita. Todo uso do recurso precisa ficar dentro do bloco.',
    },
    {
      id: 'junior-t1-e03-b03',
      dificuldade: 2,
      sintoma: 'O programa processa a primeira linha e depois para com `NullPointerException`.',
      codigo: `import java.util.*;

public class Importacao {
    static List<String> buffer = new ArrayList<>();

    static void processar(String linha) {
        buffer.add(linha.toUpperCase());
    }

    public static void main(String[] args) {
        processar("ana");
        System.out.println(buffer);
        buffer = null;
        processar("bia");
        System.out.println(buffer);
    }
}`,
      linha: 13,
      efeito: { tipo: 'excecao', nome: 'NullPointerException' },
      correcao: `import java.util.*;

public class Importacao {
    static List<String> buffer = new ArrayList<>();

    static void processar(String linha) {
        buffer.add(linha.toUpperCase());
    }

    public static void main(String[] args) {
        processar("ana");
        System.out.println(buffer);
        buffer.clear();
        processar("bia");
        System.out.println(buffer);
    }
}`,
      saidaCorrigida: '[ANA]\n[BIA]',
      dica: 'A ideia era esvaziar o buffer entre os lotes. O que `buffer = null` faz com a variável?',
      explicacao: 'Atribuir `null` não esvazia a lista: tira a única referência que o programa tinha para ela, e a próxima chamada usa `null`. Para reaproveitar o buffer, `clear()` remove os elementos e mantém a lista. Atribuir `null` "para ajudar o GC" raramente é necessário.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t1-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Onde ficam os objetos criados com `new`?',
      opcoes: [
        'No heap, compartilhado por todas as threads',
        'Na pilha do método que os criou',
        'No arquivo `.class`',
        'Na pilha, junto com as variáveis locais que apontam para eles',
      ],
      resposta: 0,
      explicacao: 'Os objetos ficam no heap. A pilha guarda os quadros dos métodos, com parâmetros e variáveis locais, que apontam para o heap.',
      dica: 'A pilha guarda variáveis locais; os objetos ficam numa área compartilhada.',
    },
    {
      id: 'junior-t1-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Depois da linha 4, quantos dos objetos criados nas linhas 1 e 2 estão elegíveis para a coleta de lixo?',
      codigo: `String a = new String("x");
String b = new String("y");
a = b;
b = null;`,
      opcoes: ['1', '0', '2', 'Não é possível saber'],
      resposta: 0,
      explicacao: 'Na linha 3, `a` passa a apontar para "y", e ninguém mais aponta para "x": ele fica elegível. Na linha 4, "y" perde a referência de `b`, mas continua sendo apontado por `a`.',
      dica: 'Depois de `a = b`, quem ainda aponta para o objeto "x"?',
    },
    {
      id: 'junior-t1-e03-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Depois da última linha, quantos objetos `No` estão elegíveis?',
      codigo: `class No {
    No prox;
}

No a = new No();
No b = new No();
No c = new No();
a.prox = b;
b.prox = c;
c.prox = a;
a = null;
b = null;`,
      opcoes: ['0', '2', '3', '1'],
      resposta: 0,
      explicacao: 'Os três formam um ciclo, e `c` ainda aponta para o terceiro nó, que aponta para o primeiro, que aponta para o segundo. Tudo continua alcançável. Só com `c = null` os três virariam uma ilha elegível.',
      dica: '`c` ainda aponta para um dos nós, e o ciclo liga os três.',
    },
    {
      id: 'junior-t1-e03-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `StringBuilder x = new StringBuilder("um");
StringBuilder y = x;
x = new StringBuilder("dois");
y.append("!");
StringBuilder z = y;
y = null;
System.out.println(x + " " + z);`,
      resposta: 'dois um!',
      explicacao: '`y` guardou o primeiro objeto antes de `x` ser reatribuído. O `append` altera esse primeiro objeto, que depois passa para `z`. Nenhum dos dois objetos ficou elegível.',
      dica: '`y` e depois `z` guardam a referência do "um"; o `x` passou a apontar para outro.',
    },
    {
      id: 'junior-t1-e03-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        '`System.gc()` apenas sugere uma coleta; a JVM pode ignorá-la',
        'Não há garantia de que `finalize()` seja chamado',
        '`System.gc()` garante que os objetos elegíveis sejam destruídos',
        '`finalize()` é chamado exatamente uma vez para cada objeto antes do fim do programa',
        'Atribuir `null` a uma variável destrói o objeto imediatamente',
      ],
      respostas: [0, 1],
      explicacao: 'O momento da coleta é decisão da JVM. `finalize` está obsoleto justamente por não ter garantia nenhuma, e `null` só remove uma referência.',
      dica: 'Elegível não é coletado, e nem `gc` nem `finalize` dão garantias.',
    },
    {
      id: 'junior-t1-e03-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado?',
      codigo: `if (true) {
    String msg = "olá";
}
System.out.println(msg);`,
      opcoes: ['Não compila', 'Imprime `olá`', 'Imprime `null`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: 'A variável `msg` só existe dentro do bloco do `if`. Fora dele, o nome é desconhecido. E o objeto que ela apontava fica elegível no fim do bloco.',
      dica: 'Até onde vai o escopo de uma variável declarada dentro de um bloco?',
    },
    {
      id: 'junior-t1-e03-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com a interface que permite usar a classe num `try` com recursos. O programa deve imprimir `lendo` e depois `fechado`.',
      codigo: `class Arquivo implements ___ {
    public void close() {
        System.out.println("fechado");
    }
}

public class Leitura {
    public static void main(String[] args) {
        try (Arquivo a = new Arquivo()) {
            System.out.println("lendo");
        }
    }
}`,
      respostas: ['AutoCloseable', 'java.io.Closeable'],
      saida: 'lendo\nfechado',
      explicacao: '`AutoCloseable` é a interface exigida pelo `try` com recursos. `java.io.Closeable` também serve, porque estende `AutoCloseable`. O `close` roda no fim do bloco, mesmo se houver exceção.',
      dica: 'Qual interface o `try` com recursos exige?',
    },
    {
      id: 'junior-t1-e03-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `class Tela {
    void desenhar() {
        System.out.println("desenhando");
    }
}

public class App {
    public static void main(String[] args) {
        try (Tela t = new Tela()) {
            t.desenhar();
        }
    }
}`,
      resposta: 9,
      explicacao: '`Tela` não implementa `AutoCloseable`, e o compilador não teria o que chamar no fim do bloco. Um `try` comum, sem parênteses, compilaria.',
      dica: '`Tela` pode ser usada num `try` com recursos?',
    },
    {
      id: 'junior-t1-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No ponto X, quais dos objetos criados em `processar` estão elegíveis?',
      codigo: `public class Teste {
    static StringBuilder guardado;

    static void processar() {
        StringBuilder local = new StringBuilder("A");
        StringBuilder outro = new StringBuilder("B");
        guardado = outro;
    }

    public static void main(String[] args) {
        processar();
        // ponto X
    }
}`,
      opcoes: [
        'Só o "A"',
        'Os dois',
        'Nenhum',
        'Só o "B"',
      ],
      resposta: 0,
      explicacao: 'Quando `processar` termina, as variáveis locais somem. O "A" fica sem referências, mas o "B" continua apontado pelo campo `static`, uma das raízes do GC.',
      dica: 'Quais referências sobrevivem ao fim do método? Uma delas foi guardada num `static`.',
    },
    {
      id: 'junior-t1-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dois objetos apontam um para o outro, e nenhuma variável do programa alcança nenhum deles. Por que podem ser coletados?',
      opcoes: [
        'Porque o GC procura o que é alcançável a partir das raízes, e eles não são',
        'Porque o GC conta as referências, e as duas se cancelam',
        'Não podem: cada um ainda tem uma referência apontando para ele',
        'Porque objetos em ciclo são destruídos assim que o ciclo se forma',
      ],
      resposta: 0,
      explicacao: 'A HotSpot marca tudo o que alcança a partir das raízes (variáveis locais, campos `static` e referências internas). O que não foi marcado é lixo, com ou sem referências apontando para ele.',
      dica: 'O GC parte das raízes e segue as referências.',
    },
    {
      id: 'junior-t1-e03-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Recurso implements AutoCloseable {
    String nome;

    Recurso(String nome) {
        this.nome = nome;
    }

    public void close() {
        System.out.print("-" + nome);
    }
}

try (Recurso a = new Recurso("a"); Recurso b = new Recurso("b")) {
    System.out.print("uso");
}
System.out.println();`,
      resposta: 'uso-b-a',
      explicacao: 'Os recursos são fechados no fim do bloco, na ordem inversa da abertura: o último aberto, `b`, fecha primeiro.',
      dica: 'Os recursos são fechados na ordem inversa da abertura, depois do corpo.',
    },
    {
      id: 'junior-t1-e03-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o coletor de lixo padrão da HotSpot desde o Java 9?',
      opcoes: ['G1', 'Serial', 'ZGC', 'Contagem de referências'],
      resposta: 0,
      explicacao: 'O G1 divide o heap em regiões e mira uma meta de pausa. A JVM ainda escolhe o Serial em máquinas muito pequenas, e o ZGC precisa ser pedido com `-XX:+UseZGC`.',
      dica: 'É o coletor padrão desde o Java 9, que divide o heap em regiões.',
    },
    {
      id: 'junior-t1-e03-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída, e qual objeto `Pessoa` fica elegível depois da linha 13?',
      codigo: `class Pessoa {
    String nome;
    Pessoa amigo;

    Pessoa(String nome) {
        this.nome = nome;
    }
}

Pessoa ana = new Pessoa("Ana");
ana.amigo = new Pessoa("Bia");
Pessoa bia = ana.amigo;
ana = null;
System.out.println(bia.nome + " " + (bia.amigo == null));`,
      opcoes: [
        'Imprime `Bia true`, e a Ana fica elegível',
        'Imprime `Bia true`, e nenhuma fica elegível',
        'Imprime `Bia false`, e a Bia fica elegível',
        'Lança `NullPointerException`',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'Bia true' },
      explicacao: 'A Ana aponta para a Bia, mas a Bia não aponta para ninguém. Quando `ana` vira `null`, nada mais alcança a Ana. A Bia continua alcançável pela variável `bia`.',
      dica: 'A Bia continua alcançável por `bia`. E a Ana?',
    },
    {
      id: 'junior-t1-e03-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destes são raízes a partir das quais o GC procura objetos vivos? Escolha três.',
      opcoes: [
        'Variáveis locais dos métodos em execução',
        'Campos `static` das classes carregadas',
        'Parâmetros dos métodos em execução',
        'Campos de instância de qualquer objeto do heap',
        'Objetos que sobrescrevem `finalize`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Parâmetros e variáveis locais ficam nos quadros da pilha, e campos `static` pertencem às classes. Campos de instância só contam se o objeto que os tem for alcançável.',
      dica: 'As raízes são referências que o programa usa diretamente, não as de dentro de objetos.',
    },
    {
      id: 'junior-t1-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em que se baseia a divisão do heap em geração jovem e geração velha?',
      opcoes: [
        'Na observação de que a maioria dos objetos morre pouco depois de criada',
        'No tamanho dos objetos: pequenos na jovem, grandes na velha',
        'No tipo dos objetos: strings na jovem, o resto na velha',
        'Na ordem de criação das classes',
      ],
      resposta: 0,
      explicacao: 'É a hipótese geracional. Coletar a geração jovem é barato, porque sobra pouca coisa viva para copiar; os sobreviventes de várias coletas vão para a velha, revisada com menos frequência.',
      dica: 'Pense na hipótese geracional: quanto tempo vive a maioria dos objetos?',
    },
  ],
};

export default episodio;
