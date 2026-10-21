import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t2-e05',
  minutos: 15,
  aula,
  armadilhas: [
    'Classe interna precisa de um objeto da externa: `externa.new Interna()`.',
    'Num método `static` da externa, `new Interna()` sozinho não compila.',
    'Aninhada estática se cria com `new Externa.Estatica()`; `externa.new Estatica()` não compila.',
    'A classe interna acessa os membros da externa, inclusive `private`; `Externa.this.x` resolve nomes repetidos.',
    'Classes locais e anônimas só capturam variáveis `final` ou efetivamente final.',
    'A classe anônima estende uma classe ou implementa uma interface, e nunca tem construtor.',
    'A expressão com classe anônima termina com `;`.',
    'Cada classe aninhada vira um `.class` próprio, como `Externa$Interna` ou `Externa$1`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Nested Classes',
      url: 'https://dev.java/learn/language/oop/classes-objects/nested-classes/',
      tipo: 'documentacao',
      porque: 'Os quatro tipos de classe aninhada, com o sombreamento de nomes e as regras de captura.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions',
      url: 'https://dev.java/learn/language/oop/classes-objects/design-best-practices/',
      tipo: 'documentacao',
      porque: 'O guia oficial para escolher entre os tipos de classe aninhada e as lambdas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Anonymous Classes',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html',
      tipo: 'documentacao',
      porque: 'A sintaxe da classe anônima, parte por parte, e o que ela pode declarar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.1.3: Inner Classes and Enclosing Instances',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.3',
      tipo: 'documentacao',
      porque: 'A definição de classe interna, de objeto externo e da regra do efetivamente final.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Nested Classes in Java',
      url: 'https://www.baeldung.com/java-nested-classes',
      tipo: 'artigo',
      porque: 'Os quatro tipos com exemplos curtos e quando usar cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Anonymous Classes in Java',
      url: 'https://www.baeldung.com/java-anonymous-classes',
      tipo: 'artigo',
      porque: 'Classes anônimas que estendem classes e que implementam interfaces, e as limitações delas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 64, Classes aninhadas: internas, locais e anônimas',
      url: 'https://www.youtube.com/watch?v=OQKV3dCKzSI',
      tipo: 'video',
      porque: 'Os tipos de classe aninhada numa aula só, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Internas pt 03, Classes Anônimas',
      url: 'https://www.youtube.com/watch?v=44uSWELqd3U',
      tipo: 'video',
      porque: 'Classes anônimas na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Internas pt 04, Classes aninhadas estáticas',
      url: 'https://www.youtube.com/watch?v=jm09LQDoZ5Y',
      tipo: 'video',
      porque: 'A diferença entre a classe interna e a aninhada estática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Java Anonymous Inner Classes Explained in 6 Minutes',
      url: 'https://www.youtube.com/watch?v=DwtPWZn6T1A',
      tipo: 'video',
      porque: 'Uma explicação rápida e visual das classes anônimas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que preferir a aninhada estática e o vazamento de memória das classes internas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Classes and Interfaces": Item 24, "Favor static member classes over nonstatic"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela que resume o que cada tipo de classe aninhada pode acessar e declarar.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Creating Nested Classes"',
    },
  ],
  desafio: {
    titulo: 'Filtros sob medida',
    enunciado:
      'Crie a interface `Filtro`, com `boolean aceita(int valor)`, e a classe `Numeros`, que guarda uma cópia dos valores recebidos num construtor varargs. Dentro dela, declare uma classe aninhada estática `Resumo`, com quantidade e soma, e o método `resumir(Filtro filtro)`. No `main`, use duas classes anônimas: uma que aceita os pares e outra que aceita os maiores que uma variável local `limite`. Com os números 4, 7, 10, 13 e 16 e `limite` igual a 10, a saída deve ser:\n\n```text\nPares: 3 valores, soma 30\nMaiores que 10: 2 valores, soma 29\n```',
    dicas: [
      '`Resumo` não precisa de um objeto `Numeros`: por isso é `static`.',
      'A classe anônima do segundo filtro lê `limite`, que precisa ser efetivamente final.',
      'Dê ao `Resumo` um método `descrever()` que monte o texto "3 valores, soma 30".',
    ],
    solucao: `interface Filtro {
    boolean aceita(int valor);
}

public class Numeros {
    private final int[] valores;

    Numeros(int... valores) {
        this.valores = valores.clone();
    }

    static class Resumo {
        final int quantidade;
        final int soma;

        Resumo(int quantidade, int soma) {
            this.quantidade = quantidade;
            this.soma = soma;
        }

        String descrever() {
            return quantidade + " valores, soma " + soma;
        }
    }

    Resumo resumir(Filtro filtro) {
        int q = 0;
        int s = 0;
        for (int v : valores) {
            if (filtro.aceita(v)) {
                q++;
                s += v;
            }
        }
        return new Resumo(q, s);
    }

    public static void main(String[] args) {
        Numeros n = new Numeros(4, 7, 10, 13, 16);
        int limite = 10;
        Resumo pares = n.resumir(new Filtro() {
            public boolean aceita(int valor) {
                return valor % 2 == 0;
            }
        });
        Resumo grandes = n.resumir(new Filtro() {
            public boolean aceita(int valor) {
                return valor > limite;
            }
        });
        System.out.println("Pares: " + pares.descrever());
        System.out.println("Maiores que " + limite + ": " + grandes.descrever());
    }
}`,
    saida: 'Pares: 3 valores, soma 30\nMaiores que 10: 2 valores, soma 29',
    comentarios:
      'O método `resumir` não sabe nada sobre pares ou limites: recebe o critério como objeto. Esse é o padrão *Strategy*, e as classes anônimas foram, por anos, o jeito de usá-lo em Java. No cargo Pleno, cada uma delas vira uma linha: `n.resumir(v -> v % 2 == 0)`. A interface `Filtro` é praticamente a `IntPredicate` da biblioteca padrão.',
  },
  exercicios: [
    {
      id: 'junior-t2-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais são os quatro tipos de classe aninhada?',
      opcoes: [
        'Aninhada estática, interna, local e anônima',
        'Pública, privada, protegida e de pacote',
        'Abstrata, final, estática e interna',
        'Interna, externa, local e global',
      ],
      resposta: 0,
      explicacao: 'As duas primeiras ficam no corpo da classe, com e sem `static`. As locais ficam dentro de métodos, e as anônimas são declaradas numa expressão `new`.',
    },
    {
      id: 'junior-t2-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Banco {
    private int clientes = 0;

    class Agencia {
        void abrirConta() {
            clientes++;
        }
    }

    public static void main(String[] args) {
        Banco b = new Banco();
        Banco.Agencia a1 = b.new Agencia();
        Banco.Agencia a2 = b.new Agencia();
        a1.abrirConta();
        a2.abrirConta();
        a2.abrirConta();
        System.out.println(b.clientes);
    }
}`,
      resposta: '3',
      explicacao: 'As duas agências foram criadas a partir do mesmo banco e incrementam o campo `private` dele. A classe interna enxerga os membros privados da externa.',
    },
    {
      id: 'junior-t2-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class Casa {
    class Quarto {
        String nome = "suíte";
    }

    public static void main(String[] args) {
        Quarto q = new Quarto();
        System.out.println(q.nome);
    }
}`,
      opcoes: ['Não compila', 'Imprime `suíte`', 'Imprime `null`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: '`Quarto` é interna e precisa de um objeto `Casa`, e o `main` é `static`. Seria `new Casa().new Quarto()`, ou declarar `Quarto` como `static`.',
    },
    {
      id: 'junior-t2-e05-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class A {
    int v = 10;

    class B {
        int v = 20;

        int calcular(int v) {
            return v + this.v + A.this.v;
        }
    }

    public static void main(String[] args) {
        A a = new A();
        a.v = 1;
        System.out.println(a.new B().calcular(100));
    }
}`,
      opcoes: ['`121`', '`130`', '`300`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`v` é o parâmetro (100), `this.v` é o da classe interna (20) e `A.this.v` é o do objeto externo, que foi alterado para 1.',
    },
    {
      id: 'junior-t2-e05-q05',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: '`Externa` declara a classe interna `Interna` e a aninhada estática `Estatica`. Num método `static` de outra classe, quais expressões compilam? Escolha duas.',
      opcoes: [
        '`new Externa().new Interna()`',
        '`new Externa.Estatica()`',
        '`new Externa.Interna()`',
        '`Externa.new Interna()`',
        '`new Externa().new Estatica()`',
      ],
      respostas: [0, 1],
      explicacao: 'A interna precisa de um objeto da externa antes do `new`; a estática, não, e o `new` qualificado por um objeto é proibido para ela ("qualified new of static class").',
    },
    {
      id: 'junior-t2-e05-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para ler a cor da casa, escondida pelo campo de mesmo nome da porta. O programa deve imprimir `branca numa casa azul`.',
      codigo: `public class Casa {
    String cor = "azul";

    class Porta {
        String cor = "branca";

        String descrever() {
            return cor + " numa casa " + Casa.___.cor;
        }
    }

    public static void main(String[] args) {
        System.out.println(new Casa().new Porta().descrever());
    }
}`,
      respostas: ['this'],
      saida: 'branca numa casa azul',
      explicacao: '`Casa.this` é a referência para o objeto externo ao qual a porta pertence. Sozinho, `cor` é o campo da própria porta.',
    },
    {
      id: 'junior-t2-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Contagem {
    interface Acao {
        void executar();
    }

    public static void main(String[] args) {
        int vezes = 0;
        Acao a = new Acao() {
            public void executar() {
                vezes++;
            }
        };
        a.executar();
    }
}`,
      resposta: 10,
      explicacao: 'A classe anônima captura `vezes`, que precisa ser efetivamente final, e tenta alterá-la. Um campo, em vez de variável local, resolveria.',
    },
    {
      id: 'junior-t2-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Saudacao {
    String nome;

    Saudacao(String nome) {
        this.nome = nome;
    }

    String falar() {
        return "Olá, " + nome;
    }
}

public class Teste {
    public static void main(String[] args) {
        Saudacao formal = new Saudacao("Ana") {
            String falar() {
                return "Prezada " + nome;
            }
        };
        Saudacao comum = new Saudacao("Bia");
        System.out.println(formal.falar() + " / " + comum.falar());
    }
}`,
      opcoes: [
        '`Prezada Ana / Olá, Bia`',
        '`Olá, Ana / Olá, Bia`',
        'Não compila: classes anônimas não recebem argumentos',
        '`Prezada Ana / Prezada Bia`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A classe anônima estende `Saudacao`: o argumento "Ana" vai para o construtor da superclasse, e o `falar` da anônima substitui o original só nesse objeto.',
    },
    {
      id: 'junior-t2-e05-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Nomes {
    static class Estatica { }
    class Interna { }

    public static void main(String[] args) {
        Object anonimo = new Object() { };
        System.out.println(new Estatica().getClass().getName());
        System.out.println(new Nomes().new Interna().getClass().getName());
        System.out.println(anonimo.getClass().getName());
    }
}`,
      resposta: 'Nomes$Estatica\nNomes$Interna\nNomes$1',
      explicacao: 'Cada classe aninhada vira um arquivo `.class` próprio, com o nome da externa, um `$` e o nome dela. Anônimas recebem números, na ordem em que aparecem.',
    },
    {
      id: 'junior-t2-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `interface Tarefa {
    void fazer();
}

public class App {
    public static void main(String[] args) {
        Tarefa t = new Tarefa() {
            public void fazer() {
                System.out.println("feito");
            }
        }
        t.fazer();
    }
}`,
      opcoes: [
        'Não compila: falta o `;` depois da classe anônima',
        'Compila e imprime `feito`',
        'Não compila: interfaces não podem ser instanciadas',
        'Compila, mas não imprime nada',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'A classe anônima faz parte de uma atribuição, e toda atribuição termina com `;`. O `new Tarefa() { ... }` não instancia a interface: instancia uma classe sem nome que a implementa.',
    },
    {
      id: 'junior-t2-e05-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais variáveis locais do método uma classe anônima pode usar?',
      opcoes: [
        'As `final` ou efetivamente final',
        'Todas, podendo alterá-las',
        'Nenhuma: só campos da classe',
        'Só os parâmetros do método',
      ],
      resposta: 0,
      explicacao: 'O valor é copiado para dentro da classe anônima quando ela é criada. Para a cópia não ficar desatualizada, a variável não pode mudar.',
    },
    {
      id: 'junior-t2-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Saudacoes {
    static String repetir(String palavra, int vezes) {
        class Eco {
            String gerar() {
                String r = "";
                for (int i = 0; i < vezes; i++) r += palavra;
                return r;
            }
        }
        return new Eco().gerar();
    }

    public static void main(String[] args) {
        System.out.println(repetir("ha", 3));
    }
}`,
      opcoes: ['`hahaha`', '`ha`', 'Não compila: a classe local não enxerga os parâmetros', 'Uma linha vazia'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os parâmetros `palavra` e `vezes` nunca são reatribuídos, então são efetivamente final e podem ser lidos pela classe local.',
    },
    {
      id: 'junior-t2-e05-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre classes aninhadas estáticas são verdadeiras? Escolha duas.',
      opcoes: [
        'Podem ser criadas sem nenhum objeto da classe externa',
        'Enxergam os membros `private static` da classe externa',
        'Acessam diretamente os campos de instância da classe externa',
        'São criadas com a sintaxe `externa.new Estatica()`',
        'Não podem ter construtores',
      ],
      respostas: [0, 1],
      explicacao: 'Elas fazem parte da classe externa, mas não de um objeto dela. Para ler campos de instância, precisam receber um objeto, como qualquer outra classe.',
    },
    {
      id: 'junior-t2-e05-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que uma classe interna pode causar vazamento de memória?',
      opcoes: [
        'Porque guarda, num campo escondido, uma referência ao objeto externo, que fica vivo enquanto ela existir',
        'Porque cada objeto dela é criado fora do heap',
        'Porque o coletor de lixo ignora classes aninhadas',
        'Porque ela copia todos os campos da classe externa',
      ],
      resposta: 0,
      explicacao: 'O campo `this$0` aponta para o objeto externo. Se a classe interna for guardada em algum lugar duradouro, como uma lista `static`, o objeto externo inteiro não pode ser coletado.',
    },
    {
      id: 'junior-t2-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Time {
    private int gols;

    class Jogador {
        void marcar() {
            gols++;
        }
    }

    public static void main(String[] args) {
        Time a = new Time();
        Time b = new Time();
        Time.Jogador j1 = a.new Jogador();
        Time.Jogador j2 = b.new Jogador();
        Time.Jogador j3 = a.new Jogador();
        j1.marcar();
        j2.marcar();
        j3.marcar();
        System.out.println(a.gols + " " + b.gols);
    }
}`,
      opcoes: ['`2 1`', '`3 0`', '`1 1`', '`3 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada jogador pertence ao time usado no `new`: `j1` e `j3` são do time `a`, e `j2` do `b`. Os gols vão para o time de cada um.',
    },
  ],
};

export default episodio;
