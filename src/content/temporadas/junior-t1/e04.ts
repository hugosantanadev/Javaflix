import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t1-e04',
  minutos: 13,
  aula,
  armadilhas: [
    'Um campo `static` existe uma vez por classe: todos os objetos enxergam e alteram o mesmo valor.',
    'Acessar um membro `static` por uma referência `null` funciona: só o tipo declarado importa.',
    'Método `static` não tem `this` e não acessa campos ou métodos de instância sem uma referência.',
    '`main` é `static`: chamar dele um método de instância da própria classe, sem objeto, não compila.',
    'Métodos de instância acessam membros `static` normalmente.',
    'Constante `static final` não pode receber outro valor depois de inicializada.',
    'É `import static`, nunca `static import`; e `import` comum não importa métodos nem campos.',
    'Um `import static` de um nome traz todas as versões sobrecarregadas dele.',
  ],
  ia: {
    uso:
      'A IA ajuda a decidir o que deve ser `static` e o que deve ser de cada objeto, e explica os erros de contexto estático. Peça sempre a justificativa de cada `static` que ela propuser: é a pergunta que separa uma constante legítima de um estado global escondido.',
    pedido:
      'Revise o uso de static nesta classe Java 21.\n<cole a classe aqui>\n- Para cada campo static, diga se o valor é o mesmo para todos os objetos e para a aplicação inteira.\n- Aponte coleções static que só crescem.\n- Aponte acessos a membros static por meio de uma referência e troque pelo nome da classe.',
    erros: [
      'Torna `static` um campo que é de cada objeto, como nome ou saldo.',
      'Cria uma lista ou um mapa `static` como cache e nunca o limpa.',
      'Resolve o erro de contexto estático tornando tudo `static`, em vez de criar um objeto.',
    ],
    conferir: [
      'Crie dois objetos com valores diferentes e confira se cada um mantém os seus.',
      'Procure campos `static` que não são `final` e pergunte quem os altera.',
      'Aceite a sugestão da IDE de acessar membros `static` pelo nome da classe.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: More on Classes, Understanding Class Members',
      url: 'https://dev.java/learn/language/oop/classes-objects/more-on-classes/#understanding-class-members',
      tipo: 'documentacao',
      porque: 'Variáveis de classe, métodos de classe e constantes, com a tabela do que cada um pode acessar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Understanding Class Members',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html',
      tipo: 'documentacao',
      porque: 'O exemplo clássico da bicicleta que conta quantas foram criadas com um campo `static`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.3.2: static Methods',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.3.2',
      tipo: 'documentacao',
      porque: 'Por que um método `static` não pode usar `this` nem membros de instância.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 7.5.3: Single-Static-Import Declarations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html#jls-7.5.3',
      tipo: 'documentacao',
      porque: 'A sintaxe do `import static` e o que acontece quando dois imports trazem o mesmo nome.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 6.5: invokestatic',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-6.html#jvms-6.5.invokestatic',
      tipo: 'documentacao',
      porque: 'A instrução que chama métodos `static` e dispara a inicialização da classe.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: A Guide to the Static Keyword in Java',
      url: 'https://www.baeldung.com/java-static',
      tipo: 'artigo',
      porque: 'Campos, métodos, blocos e classes `static`, com quando usar cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 34, Variáveis e métodos estáticos (modificador static)',
      url: 'https://www.youtube.com/watch?v=Dz_w4YpFL80',
      tipo: 'video',
      porque: 'O contador de instâncias com `static`, explicado em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Curso Java Completo, Aula 42: Modificador static',
      url: 'https://www.youtube.com/watch?v=JFFfIN14oc4',
      tipo: 'video',
      porque: 'O que muda na memória quando um campo passa a ser `static`.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Curso Java Completo, Aula 43: Métodos Estáticos',
      url: 'https://www.youtube.com/watch?v=gsKyd0TmDR0',
      tipo: 'video',
      porque: 'Quando faz sentido um método `static` e o que ele não pode acessar.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Membros de classe e de instância, a referência nula e os `import static`, no estilo da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Methods": seção "Accessing static Data", partes "Class vs. Instance Membership" e "Static Imports"',
    },
  ],
  desafio: {
    titulo: 'Numeração de pedidos',
    enunciado:
      'Crie a classe `Pedido`. Cada pedido recebe um `id` sequencial, começando em 1, e um valor em centavos. A classe acompanha, em campos `static`, a quantidade de pedidos e o faturamento total, e oferece dois métodos `static`: `formatar(int centavos)`, que devolve algo como `R$ 49,90`, e `resumo()`. Rode com:\n\n```java\nSystem.out.println(Pedido.resumo());\nPedido a = new Pedido(4990);\nPedido b = new Pedido(1205);\nPedido c = new Pedido(800);\nSystem.out.println("#" + a.id + " " + Pedido.formatar(a.valorCentavos));\nSystem.out.println("#" + c.id + " " + Pedido.formatar(c.valorCentavos));\nSystem.out.println(Pedido.resumo());\n```\n\nSaída esperada:\n\n```text\n0 pedidos, total R$ 0,00, média R$ 0,00\n#1 R$ 49,90\n#3 R$ 8,00\n3 pedidos, total R$ 69,95, média R$ 23,31\n```',
    dicas: [
      'Um `static int proximoId = 1;` e, no construtor, `id = proximoId++;`.',
      '`centavos / 100` dá os reais e `centavos % 100` os centavos; `String.format("%02d", ...)` completa com zero.',
      'Sem pedidos, a média não pode dividir por zero.',
    ],
    solucao: `class Pedido {
    static int proximoId = 1;
    static int quantidade;
    static int faturamentoCentavos;

    final int id;
    int valorCentavos;

    Pedido(int valorCentavos) {
        this.id = proximoId++;
        this.valorCentavos = valorCentavos;
        quantidade++;
        faturamentoCentavos += valorCentavos;
    }

    static String formatar(int centavos) {
        return "R$ " + centavos / 100 + "," + String.format("%02d", centavos % 100);
    }

    static String resumo() {
        int media = quantidade == 0 ? 0 : faturamentoCentavos / quantidade;
        return quantidade + " pedidos, total " + formatar(faturamentoCentavos) + ", média " + formatar(media);
    }
}

public class Loja {
    public static void main(String[] args) {
        System.out.println(Pedido.resumo());
        Pedido a = new Pedido(4990);
        Pedido b = new Pedido(1205);
        Pedido c = new Pedido(800);
        System.out.println("#" + a.id + " " + Pedido.formatar(a.valorCentavos));
        System.out.println("#" + c.id + " " + Pedido.formatar(c.valorCentavos));
        System.out.println(Pedido.resumo());
    }
}`,
    saida: '0 pedidos, total R$ 0,00, média R$ 0,00\n#1 R$ 49,90\n#3 R$ 8,00\n3 pedidos, total R$ 69,95, média R$ 23,31',
    comentarios:
      'O `resumo()` funciona antes de qualquer pedido existir, porque os campos `static` pertencem à classe. O `id` é de instância e `final`: cada pedido tem o seu, fixo. Guardar dinheiro em centavos inteiros evita os erros de arredondamento do `double`. Num sistema com várias threads, `proximoId++` precisaria de sincronização, assunto da temporada de concorrência.',
  },
  bugs: [
    {
      id: 'junior-t1-e04-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: non-static method somar(int,int) cannot be referenced from a static context`.',
      codigo: `public class Calculadora {
    int somar(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(somar(2, 3));
    }
}`,
      linha: 7,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Calculadora {
    int somar(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(new Calculadora().somar(2, 3));
    }
}`,
      saidaCorrigida: '5',
      dica: 'O `main` é `static`: existe algum objeto `Calculadora` ali para chamar o método?',
      explicacao: 'Um método de instância precisa de um objeto, e o `main`, sendo `static`, não tem `this`. Ou se cria um objeto e se chama o método por ele, ou se declara `somar` como `static`, já que ele não usa nenhum campo.',
    },
    {
      id: 'junior-t1-e04-b02',
      dificuldade: 2,
      sintoma: 'Foram cadastradas a Ana e a Bia, mas o programa mostra `Bia e Bia`.',
      codigo: `class Cliente {
    static String nome;

    Cliente(String nome) {
        Cliente.nome = nome;
    }
}

public class Cadastro {
    public static void main(String[] args) {
        Cliente a = new Cliente("Ana");
        Cliente b = new Cliente("Bia");
        System.out.println(a.nome + " e " + b.nome);
    }
}`,
      linha: 2,
      efeito: { tipo: 'saida', saida: 'Bia e Bia' },
      correcao: `class Cliente {
    String nome;

    Cliente(String nome) {
        this.nome = nome;
    }
}

public class Cadastro {
    public static void main(String[] args) {
        Cliente a = new Cliente("Ana");
        Cliente b = new Cliente("Bia");
        System.out.println(a.nome + " e " + b.nome);
    }
}`,
      saidaCorrigida: 'Ana e Bia',
      dica: 'Quantas cópias do campo `nome` existem, com dois clientes criados?',
      explicacao: 'Um campo `static` existe uma vez só, na classe. O segundo construtor sobrescreveu o nome do primeiro, e `a.nome` e `b.nome` leem o mesmo campo. O nome é de cada cliente: campo de instância, atribuído com `this.nome`.',
    },
    {
      id: 'junior-t1-e04-b03',
      dificuldade: 2,
      sintoma: 'Cada pedido deveria ganhar um número novo, 1, 2 e 3, mas todos saem com o número 1.',
      codigo: `class Pedido {
    int contador;
    int numero;

    Pedido() {
        contador++;
        numero = contador;
    }
}

public class Loja {
    public static void main(String[] args) {
        Pedido p1 = new Pedido();
        Pedido p2 = new Pedido();
        Pedido p3 = new Pedido();
        System.out.println(p1.numero + " " + p2.numero + " " + p3.numero);
    }
}`,
      linha: 2,
      efeito: { tipo: 'saida', saida: '1 1 1' },
      correcao: `class Pedido {
    static int contador;
    int numero;

    Pedido() {
        contador++;
        numero = contador;
    }
}

public class Loja {
    public static void main(String[] args) {
        Pedido p1 = new Pedido();
        Pedido p2 = new Pedido();
        Pedido p3 = new Pedido();
        System.out.println(p1.numero + " " + p2.numero + " " + p3.numero);
    }
}`,
      saidaCorrigida: '1 2 3',
      dica: 'O contador é de cada pedido ou da loja inteira? Quanto ele vale quando um pedido novo nasce?',
      explicacao: 'Como campo de instância, cada pedido nasce com o seu próprio `contador` valendo 0, e todos chegam a 1. O contador precisa ser compartilhado entre todos os pedidos: `static`. O `numero`, sim, é de cada pedido.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t1-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas cópias de um campo `static` existem quando há 10 objetos da classe?',
      opcoes: ['Uma, compartilhada por todos', 'Dez, uma por objeto', 'Onze', 'Nenhuma, até algum método `static` ser chamado'],
      resposta: 0,
      explicacao: 'O campo `static` pertence à classe. Existe uma única cópia, mesmo que nenhum objeto seja criado.',
      dica: 'Um campo `static` pertence à classe, não aos objetos.',
    },
    {
      id: 'junior-t1-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Placar {
    static int total;
    int local;

    void marcar() {
        total++;
        local++;
    }

    public static void main(String[] args) {
        Placar a = new Placar();
        Placar b = new Placar();
        a.marcar();
        a.marcar();
        b.marcar();
        System.out.println(a.local + " " + b.local + " " + total);
    }
}`,
      resposta: '2 1 3',
      explicacao: 'Cada objeto tem o seu `local`; o `total` é um só, incrementado nas três chamadas.',
      dica: '`local` é de cada placar; `total` é um só, somado pelos três `marcar()`.',
    },
    {
      id: 'junior-t1-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class Teste {
    int valor = 5;

    static int dobro() {
        return this.valor * 2;
    }

    public static void main(String[] args) {
        System.out.println(dobro());
    }
}`,
      opcoes: ['Não compila', 'Imprime `10`', 'Imprime `0`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Um método `static` não roda sobre objeto nenhum, então não existe `this`. Seria preciso receber um `Teste` como parâmetro ou tornar o método de instância.',
      dica: 'Um método `static` tem `this`?',
    },
    {
      id: 'junior-t1-e04-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `public class Config {
    static String modo = "produção";

    public static void main(String[] args) {
        Config c = null;
        System.out.println(c.modo);
    }
}`,
      opcoes: ['`produção`', 'Lança `NullPointerException`', 'Não compila', '`null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para membros `static`, o compilador usa só o tipo da variável e troca `c.modo` por `Config.modo`. O valor de `c` nunca é consultado.',
      dica: 'O compilador troca `c.modo` pelo nome da classe. O `null` chega a ser usado?',
    },
    {
      id: 'junior-t1-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações de import compilam? Escolha três.',
      opcoes: [
        '`import static java.lang.Math.*;`',
        '`import static java.lang.Math.max;`',
        '`import static java.util.Arrays.sort;`',
        '`static import java.lang.Math.max;`',
        '`import java.lang.Math.max;`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'A sintaxe é `import static`, com o nome de um membro ou `*`. A ordem invertida não compila, e o `import` comum só aceita tipos, não métodos.',
      dica: 'A ordem certa é `import static`, e o `import` comum só traz tipos.',
    },
    {
      id: 'junior-t1-e04-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o campo conte todos os robôs criados. O programa deve imprimir `3`.',
      codigo: `public class Robo {
    ___ int criados;

    Robo() {
        criados++;
    }

    public static void main(String[] args) {
        new Robo();
        new Robo();
        new Robo();
        System.out.println(criados);
    }
}`,
      respostas: ['static'],
      saida: '3',
      explicacao: 'Com `static`, há um único `criados`, que cada construtor incrementa. Sem ele, o `main` nem compilaria, porque não poderia ler um campo de instância.',
      dica: 'Qual modificador faz o campo ser um só para todos os robôs?',
    },
    {
      id: 'junior-t1-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Util {
    static int chamadas;

    static int quadrado(int x) {
        chamadas++;
        return x * x;
    }

    public static void main(String[] args) {
        Util u = new Util();
        int a = u.quadrado(3);
        int b = Util.quadrado(4);
        int c = quadrado(a - b);
        System.out.println(a + b + c + " " + chamadas);
    }
}`,
      opcoes: ['`74 3`', '`25 3`', '`74 2`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As três formas chamam o mesmo método `static`: pela referência, pela classe e pelo nome sozinho. `quadrado(9 - 16)` é 49, e 9 + 16 + 49 = 74 antes de virar texto.',
      dica: 'As três chamadas incrementam o mesmo contador; `quadrado(9 - 16)` é o quadrado de -7.',
    },
    {
      id: 'junior-t1-e04-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import static java.lang.Math.max;
import java.lang.Math.min;

public class Limites {
    public static void main(String[] args) {
        System.out.println(max(1, 2));
    }
}`,
      resposta: 2,
      explicacao: 'O `import` comum procura um **tipo** chamado `min` dentro de `java.lang.Math`, e ele não existe. Para importar o método, seria `import static java.lang.Math.min;`.',
      dica: 'Um `import` sem `static` pode trazer um método?',
    },
    {
      id: 'junior-t1-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class App {
    void saudar() {
        System.out.println("oi");
    }

    public static void main(String[] args) {
        saudar();
    }
}`,
      opcoes: ['Não compila', 'Imprime `oi`', 'Lança exceção', 'Compila, mas não imprime nada'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: '`saudar` é de instância, e `main` é `static`. Seria preciso um objeto: `new App().saudar();`.',
      dica: 'O `main` é `static`. Ele pode chamar um método de instância sem objeto?',
    },
    {
      id: 'junior-t1-e04-q10',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'De dentro de um método `static`, o que pode ser usado diretamente, só pelo nome, sem uma referência? Escolha duas.',
      opcoes: [
        'Outros métodos `static` da mesma classe',
        'Campos `static` da mesma classe',
        'Campos de instância da mesma classe',
        'A palavra `this`',
        'Métodos de instância da mesma classe',
      ],
      respostas: [0, 1],
      explicacao: 'Membros `static` existem sem objeto e podem ser usados direto. Membros de instância precisam de um objeto, e `this` não existe num contexto `static`.',
      dica: 'Num contexto `static`, só o que é `static` está disponível direto.',
    },
    {
      id: 'junior-t1-e04-q11',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `class Fila {
    static int proximo = 100;
    int senha;

    Fila() {
        senha = proximo++;
    }
}

public class Banco {
    public static void main(String[] args) {
        Fila a = new Fila();
        Fila b = new Fila();
        Fila.proximo += 10;
        Fila c = new Fila();
        System.out.println(a.senha + " " + b.senha + " " + c.senha + " " + a.proximo);
    }
}`,
      resposta: '100 101 112 113',
      explicacao: 'O pós-incremento entrega o valor atual e depois soma 1. Depois de `b`, `proximo` vale 102, e o `+= 10` o leva a 112. `a.proximo` é o mesmo campo único, já em 113.',
      dica: '`proximo++` usa o valor e depois incrementa; o `+= 10` muda o campo compartilhado.',
    },
    {
      id: 'junior-t1-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a classe `java.lang.Math` tem um construtor `private`?',
      opcoes: [
        'Para impedir que se criem objetos dela, já que todos os seus membros são `static`',
        'Para que só a JVM possa chamar os métodos dela',
        'Porque construtores `private` deixam os métodos mais rápidos',
        'Para que ela não possa ser importada',
      ],
      resposta: 0,
      explicacao: 'Um objeto `Math` não teria estado nenhum. Com o construtor `private`, `new Math()` não compila fora da classe, deixando claro que ela é só um conjunto de funções.',
      dica: 'Faz sentido criar um objeto de uma classe que só tem métodos `static`?',
    },
    {
      id: 'junior-t1-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import static java.lang.Integer.MAX_VALUE;

public class Limite {
    public static void main(String[] args) {
        int x = MAX_VALUE;
        x++;
        System.out.println(x == Integer.MIN_VALUE);
    }
}`,
      opcoes: ['`true`', '`false`', 'Não compila', 'Lança `ArithmeticException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `import static` traz a constante `MAX_VALUE`. Somar 1 a ela dá a volta, pelo complemento de dois, e chega ao menor `int`.',
      dica: 'Somar 1 ao maior `int` dá a volta para o menor.',
    },
    {
      id: 'junior-t1-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class Taxa {
    static final double JUROS = 0.05;

    public static void main(String[] args) {
        JUROS = 0.06;
        System.out.println(JUROS);
    }
}`,
      opcoes: ['Não compila', 'Imprime `0.06`', 'Imprime `0.05`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: '`final` impede uma nova atribuição. Uma constante `static final` recebe o valor uma única vez, na declaração ou num bloco `static`.',
      dica: 'Um campo `final` pode receber outro valor depois de inicializado?',
    },
    {
      id: 'junior-t1-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual instrução de bytecode chama um método `static`, e quando é decidido qual método será executado?',
      opcoes: [
        '`invokestatic`, decidido na compilação, pelo tipo declarado',
        '`invokevirtual`, decidido na execução, pela classe do objeto',
        '`invokestatic`, decidido na execução, pela classe do objeto',
        '`invokespecial`, decidido na carga da classe',
      ],
      resposta: 0,
      explicacao: 'Sem objeto, não há o que consultar na execução: o método é fixado na compilação. É por isso que métodos `static` não são sobrescritos, só escondidos, como você verá na temporada de herança.',
      dica: 'Métodos `static` não dependem de objeto: a decisão pode ser tomada antes de rodar.',
    },
  ],
};

export default episodio;
