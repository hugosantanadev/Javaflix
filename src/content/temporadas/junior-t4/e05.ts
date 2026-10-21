import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t4-e05',
  minutos: 14,
  aula,
  armadilhas: [
    'Quando há membros depois das constantes, a lista termina com ponto e vírgula.',
    'O construtor de um enum é sempre `private`; `public` ou `protected` não compila.',
    'Toda constante precisa passar argumentos compatíveis com algum construtor.',
    'Todas as constantes são criadas juntas, uma vez, no primeiro uso do enum.',
    'O construtor do enum não pode ler campos `static` do próprio enum que não sejam constantes de compilação.',
    'Com um método `abstract` no enum, todas as constantes precisam implementá-lo no próprio corpo.',
    'Constante com corpo vira uma subclasse anônima: `getClass()` não é o enum; `getDeclaringClass()` é.',
    '`toString` pode ser sobrescrito, mas `name()` é `final` e é o que o `valueOf` usa.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Enums, Adding Members to Enums',
      url: 'https://dev.java/learn/language/oop/classes-objects/enums/#adding-members-to-enums',
      tipo: 'documentacao',
      porque: 'Campos, construtores e métodos em enums, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Enums, Abstract Methods in Enums',
      url: 'https://dev.java/learn/language/oop/classes-objects/enums/#abstract-methods-in-enums',
      tipo: 'documentacao',
      porque: 'Métodos abstratos implementados por constante.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.9.2: Enum Body Declarations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.9.2',
      tipo: 'documentacao',
      porque: 'As regras do construtor e a proibição de ler campos `static` nele.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Enum Types',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html',
      tipo: 'documentacao',
      porque: 'O exemplo dos planetas com massa, raio e gravidade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Attaching Values to Java Enum',
      url: 'https://www.baeldung.com/java-enum-values',
      tipo: 'artigo',
      porque: 'Campos em enums e a busca de constantes por um código próprio.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Enumeração pt 03, Sobrescrita de métodos',
      url: 'https://www.youtube.com/watch?v=8Vwf5vgMoDY',
      tipo: 'video',
      porque: 'Constantes com corpo próprio sobrescrevendo métodos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Enumeração pt 01, Introdução',
      url: 'https://www.youtube.com/watch?v=3xzrprPwS2Q',
      tipo: 'video',
      porque: 'Enums com atributos e construtores desde o começo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Java Enums Explained in 6 Minutes',
      url: 'https://www.youtube.com/watch?v=wq9SJb8VeyM',
      tipo: 'video',
      porque: 'A parte final mostra campos e construtores em enums.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Métodos específicos por constante e o enum como singleton.',
      gratuito: false,
      idioma: 'en',
      onde: 'Item 3, "Enforce the singleton property with a private constructor or an enum type", e Item 34, "Use enums instead of int constants"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Construtores, campos e corpos de constante, com o ponto e vírgula que a prova adora esconder.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Working with Enums", parte "Adding Constructors, Fields, and Methods"',
    },
  ],
  desafio: {
    titulo: 'Estados de um pedido',
    enunciado:
      'Crie o enum `Estado`, com `NOVO`, `PAGO`, `ENVIADO` e `ENTREGUE`. Cada constante recebe no construtor se o pedido ainda pode ser cancelado (só `NOVO` e `PAGO`) e implementa, no próprio corpo, o método abstrato `proximo()`; `ENTREGUE` devolve a si mesmo. Rode com:\n\n```java\nEstado e = Estado.NOVO;\nStringBuilder caminho = new StringBuilder(e.name());\nwhile (e != Estado.ENTREGUE) {\n    e = e.proximo();\n    caminho.append(" -> ").append(e);\n}\nSystem.out.println(caminho);\nfor (Estado s : Estado.values()) {\n    System.out.print(s + (s.podeCancelar() ? " (cancelável) " : " "));\n}\nSystem.out.println();\nSystem.out.println(Estado.ENTREGUE.proximo());\n```\n\nSaída esperada:\n\n```text\nNOVO -> PAGO -> ENVIADO -> ENTREGUE\nNOVO (cancelável) PAGO (cancelável) ENVIADO ENTREGUE\nENTREGUE\n```',
    dicas: [
      'A sintaxe é `NOVO(true) { Estado proximo() { return PAGO; } },` para cada constante.',
      'Dentro dos corpos, uma constante pode citar outra declarada depois: o método só roda quando todas já existem.',
      'Não esqueça o `;` depois da última constante, antes do campo e do construtor.',
    ],
    solucao: `enum Estado {
    NOVO(true) {
        Estado proximo() { return PAGO; }
    },
    PAGO(true) {
        Estado proximo() { return ENVIADO; }
    },
    ENVIADO(false) {
        Estado proximo() { return ENTREGUE; }
    },
    ENTREGUE(false) {
        Estado proximo() { return this; }
    };

    private final boolean cancelavel;

    Estado(boolean cancelavel) {
        this.cancelavel = cancelavel;
    }

    abstract Estado proximo();

    boolean podeCancelar() {
        return cancelavel;
    }
}

public class Pedidos {
    public static void main(String[] args) {
        Estado e = Estado.NOVO;
        StringBuilder caminho = new StringBuilder(e.name());
        while (e != Estado.ENTREGUE) {
            e = e.proximo();
            caminho.append(" -> ").append(e);
        }
        System.out.println(caminho);
        for (Estado s : Estado.values()) {
            System.out.print(s + (s.podeCancelar() ? " (cancelável) " : " "));
        }
        System.out.println();
        System.out.println(Estado.ENTREGUE.proximo());
    }
}`,
    saida: 'NOVO -> PAGO -> ENVIADO -> ENTREGUE\nNOVO (cancelável) PAGO (cancelável) ENVIADO ENTREGUE\nENTREGUE',
    comentarios:
      'É uma máquina de estados inteira dentro de um tipo: nenhum `if` decide para onde o pedido vai, cada estado sabe o seu sucessor. Um estado novo, como `DEVOLVIDO`, não compilaria sem `proximo()`, então ninguém esquece de tratá-lo. O `podeCancelar` usa um campo, porque é um dado; o `proximo`, um método por constante, porque é um comportamento.',
  },
  exercicios: [
    {
      id: 'junior-t4-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o modificador de acesso do construtor de um enum?',
      opcoes: [
        'Sempre `private`, escrito ou não',
        '`public`, para criar constantes de fora',
        '`protected`, para as subclasses',
        'O mesmo do enum',
      ],
      resposta: 0,
      explicacao: 'As constantes são os únicos objetos do enum, criados pela própria classe. Um construtor acessível de fora permitiria criar outros.',
    },
    {
      id: 'junior-t4-e05-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `enum Moeda {
    REAL("R$", 1.0), DOLAR("US$", 5.0);

    final String simbolo;
    final double cotacao;

    Moeda(String simbolo, double cotacao) {
        this.simbolo = simbolo;
        this.cotacao = cotacao;
    }

    String converter(double reais) {
        return simbolo + " " + reais / cotacao;
    }
}

System.out.println(Moeda.DOLAR.converter(50) + " | " + Moeda.REAL.converter(50));`,
      resposta: 'US$ 10.0 | R$ 50.0',
      explicacao: 'Cada constante guarda o seu símbolo e a sua cotação, recebidos no construtor. O método usa os campos da constante em que foi chamado.',
    },
    {
      id: 'junior-t4-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `enum Tamanho {
    P, M, G
    int ordem() {
        return ordinal() + 1;
    }
}`,
      opcoes: [
        'Não compila: falta o `;` depois das constantes',
        'Compila',
        'Não compila: enums não podem ter métodos',
        'Não compila: `ordinal()` não pode ser usado dentro do enum',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'O ponto e vírgula só é opcional quando a lista de constantes é a única coisa no enum. Com membros depois, ele é obrigatório.',
    },
    {
      id: 'junior-t4-e05-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `enum Fase {
    A, B, C;

    Fase() {
        System.out.print(name().toLowerCase());
    }
}

System.out.print("[");
Fase f = Fase.C;
System.out.println("]" + f.ordinal());`,
      opcoes: ['`[abc]2`', '`abc[]2`', '`[c]2`', '`[]2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O enum é inicializado no primeiro uso, depois do "[", e nesse momento as três constantes são criadas, na ordem de declaração.',
    },
    {
      id: 'junior-t4-e05-q05',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais enums compilam? Escolha três.',
      opcoes: [
        '`enum A { X, Y; private A() { } }`',
        '`enum B { X(1); final int v; B(int v) { this.v = v; } }`',
        '`enum C { X { void f() { } }; void f() { } }`',
        '`enum D { X; public D() { } }`',
        '`enum E { X(1), Y; final int v; E(int v) { this.v = v; } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Construtor `private` explícito, campos e constantes com corpo sobrescrevendo um método são válidos. `public` no construtor é proibido, e em `E` a constante `Y` não tem construtor sem parâmetros para usar.',
    },
    {
      id: 'junior-t4-e05-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para obrigar cada constante a implementar o método. O programa deve imprimir `miau muu`.',
      codigo: `enum Animal {
    GATO {
        String som() { return "miau"; }
    },
    VACA {
        String som() { return "muu"; }
    };

    ___ String som();
}

public class Fazenda {
    public static void main(String[] args) {
        System.out.println(Animal.GATO.som() + " " + Animal.VACA.som());
    }
}`,
      respostas: ['abstract'],
      saida: 'miau muu',
      explicacao: 'Um método `abstract` no enum, sem corpo, só é aceito porque todas as constantes o implementam nos seus corpos.',
    },
    {
      id: 'junior-t4-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `enum Transporte {
    CARRO {
        int rodas() { return 4; }
    },
    MOTO {
        int rodas() { return 2; }
    },
    BARCO;

    abstract int rodas();
}`,
      resposta: 8,
      explicacao: 'Com um método abstrato, o enum só pode ter constantes que o implementem. `BARCO`, sem corpo, seria uma instância de uma classe abstrata.',
    },
    {
      id: 'junior-t4-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface Tarifa {
    double calcular(int km);
}

enum Corrida implements Tarifa {
    ECONOMICA {
        public double calcular(int km) { return 2.0 * km; }
    },
    PREMIUM {
        public double calcular(int km) { return 5 + 3.5 * km; }
    }
}

Tarifa t = Corrida.PREMIUM;
System.out.println(t.calcular(10) + " " + Corrida.ECONOMICA.calcular(10));`,
      opcoes: ['`40.0 20.0`', '`35.0 20.0`', 'Não compila: enums não implementam interfaces', '`40 20`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O enum implementa `Tarifa`, e cada constante dá a sua versão do método. Uma constante pode ser usada onde se espera a interface.',
    },
    {
      id: 'junior-t4-e05-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `enum Naipe {
    COPAS,
    OUROS {
        @Override public String toString() { return "ouros!"; }
    };
}

System.out.println(Naipe.OUROS + " " + (Naipe.OUROS.getClass() == Naipe.class) + " " + (Naipe.OUROS.getDeclaringClass() == Naipe.class) + " " + Naipe.valueOf("OUROS").name());`,
      opcoes: [
        '`ouros! false true OUROS`',
        '`ouros! true true ouros!`',
        '`OUROS false true OUROS`',
        'Lança `IllegalArgumentException`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O corpo próprio torna `OUROS` uma subclasse anônima do enum, então `getClass()` não é `Naipe`. O `toString` mudou, mas `name()` é `final` e o `valueOf` continua usando o nome declarado.',
    },
    {
      id: 'junior-t4-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `enum Plano {
    BASICO(10), PRO(30), GRATIS;

    final int preco;

    Plano(int preco) {
        this.preco = preco;
    }
}`,
      opcoes: [
        'Não compila: `GRATIS` precisa de um construtor sem parâmetros',
        'Compila, e `GRATIS.preco` vale 0',
        'Compila, e `GRATIS.preco` vale 10',
        'Não compila: falta `private` no construtor',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'Cada constante chama um construtor. `GRATIS`, sem argumentos, precisaria de `Plano()`, que não existe. A solução seria `GRATIS(0)` ou um segundo construtor.',
    },
    {
      id: 'junior-t4-e05-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quando o ponto e vírgula depois da última constante é obrigatório?',
      opcoes: [
        'Quando o enum declara campos, construtores ou métodos depois das constantes',
        'Sempre',
        'Nunca: ele é sempre opcional',
        'Só quando as constantes têm argumentos',
      ],
      resposta: 0,
      explicacao: 'Ele separa a lista de constantes dos outros membros. Num enum que só lista constantes, pode ser omitido.',
    },
    {
      id: 'junior-t4-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `enum Cor {
    VERMELHO("#F00"), VERDE("#0F0"), AZUL("#00F");

    private final String hex;

    Cor(String hex) {
        this.hex = hex;
    }

    static Cor porHex(String hex) {
        for (Cor c : values()) {
            if (c.hex.equalsIgnoreCase(hex)) return c;
        }
        return null;
    }
}

System.out.println(Cor.porHex("#0f0") + " " + Cor.porHex("#FFF") + " " + Cor.AZUL.hex);`,
      opcoes: ['`VERDE null #00F`', 'Lança `IllegalArgumentException`', '`null null #00F`', '`VERDE VERMELHO #00F`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O método de busca compara o código de cada constante, sem diferenciar maiúsculas. Para um código que não existe, ele devolve `null`, diferente do `valueOf`, que lançaria exceção.',
    },
    {
      id: 'junior-t4-e05-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'O construtor de um enum roda uma vez por constante, na inicialização do enum',
        'Uma constante pode ter um corpo próprio que sobrescreve métodos do enum',
        'O construtor de um enum pode ser `public`',
        'Cada uso de `Cor.VERDE` cria um objeto novo',
        'Enums não podem ter métodos abstratos',
      ],
      respostas: [0, 1],
      explicacao: 'As constantes são criadas uma vez e reaproveitadas para sempre. Métodos abstratos são permitidos, desde que toda constante os implemente.',
    },
    {
      id: 'junior-t4-e05-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `enum Contador {
    A, B, C;

    static int total = 0;

    Contador() {
        total++;
    }
}`,
      opcoes: [
        'Não compila: o construtor não pode ler um campo `static` do enum',
        'Compila, e `total` termina valendo 3',
        'Compila, e `total` termina valendo 0',
        'Não compila: enums não podem ter campos `static`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'As constantes são criadas antes dos outros campos `static` receberem valor. Se fosse permitido, o `total = 0` rodaria depois e apagaria a contagem. Por isso o compilador proíbe.',
    },
    {
      id: 'junior-t4-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que o compilador gera para uma constante de enum com corpo próprio?',
      opcoes: [
        'Uma subclasse anônima do enum, com nome como `Operacao$1`',
        'Um método `static` separado',
        'Nada: o corpo é copiado para o enum',
        'Uma interface com o método do corpo',
      ],
      resposta: 0,
      explicacao: 'A constante passa a ser uma instância dessa subclasse. Por isso o `getClass()` dela difere do enum, e o `getDeclaringClass()` existe para chegar ao enum.',
    },
  ],
};

export default episodio;
