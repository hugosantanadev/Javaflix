import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t4-e03',
  minutos: 12,
  aula,
  armadilhas: [
    'Duas interfaces sem relação com o mesmo `default` obrigam a classe a sobrescrever o método.',
    '`Interface.super.metodo()` só funciona com interfaces implementadas diretamente.',
    'Um método da classe ou de uma superclasse vence qualquer `default` de interface.',
    'O método da superclasse que "vence" o `default` precisa ser `public`, senão a subclasse não compila.',
    'Se uma interface estende a outra e redefine o `default`, a mais específica vence.',
    'No diamante sem redefinição no meio, só há uma versão e nenhum conflito.',
    'Um `default` numa interface e um abstrato com a mesma assinatura em outra também obrigam a sobrescrever.',
    'Mesma assinatura com retornos incompatíveis em duas interfaces: nenhuma classe pode implementar as duas.',
  ],
  ia: {
    uso:
      'A IA ajuda a explicar por que uma classe não compila depois de implementar mais uma interface e a escrever a sobrescrita que resolve o conflito. Peça sempre que ela diga qual das três regras se aplica.',
    pedido:
      'Explique qual versão de cada método esta classe Java 21 herda.\n<cole o código aqui>\n- Para cada método vindo de interfaces, diga qual regra decide: classe, interface mais específica ou sobrescrita obrigatória.\n- Escreva a sobrescrita necessária usando Interface.super.metodo().\n- Aponte métodos da superclasse que precisariam ser public para implementar a interface.',
    erros: [
      'Usa `super.metodo()` para chamar um `default`, como se a interface fosse superclasse.',
      'Chama `A.super.f()` com uma interface que a classe não implementa diretamente.',
      'Diz que a primeira interface do `implements` vence o conflito.',
    ],
    conferir: [
      'Compile: conflitos aparecem como "inherits unrelated defaults".',
      'Imprima o resultado de cada método para confirmar a versão escolhida.',
      'Troque a ordem das interfaces no `implements` e confirme que nada muda.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Extending Interfaces That Contain Default Methods',
      url: 'https://dev.java/learn/language/oop/interfaces/examples/#extending-interfaces-that-contain-default-methods',
      tipo: 'documentacao',
      porque: 'As formas de herdar, redeclarar e redefinir um método `default` numa subinterface.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Overriding and Hiding Methods',
      url: 'https://docs.oracle.com/javase/tutorial/java/IandI/override.html',
      tipo: 'documentacao',
      porque: 'A seção sobre métodos `default` traz as regras de prioridade com exemplos de cavalos alados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 9.4.1.3: Inheriting Methods with Override-Equivalent Signatures',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.4.1.3',
      tipo: 'documentacao',
      porque: 'Quando herdar duas versões é erro e quando uma delas prevalece.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 8.4.8.4: Inheriting Methods with Override-Equivalent Signatures (classes)',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.8.4',
      tipo: 'documentacao',
      porque: 'A mesma regra vista pelo lado da classe, com o caso do `default` contra o abstrato.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 6.5: invokeinterface',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-6.html#jvms-6.5.invokeinterface',
      tipo: 'documentacao',
      porque: 'Onde a JVM lança `IncompatibleClassChangeError` quando encontra dois `default` igualmente específicos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Static and Default Methods in Interfaces in Java',
      url: 'https://www.baeldung.com/java-static-default-methods',
      tipo: 'artigo',
      porque: 'A seção de herança múltipla mostra o conflito entre dois `default` e a resolução com `super`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michelli Brito: Java 8, Métodos Default',
      url: 'https://www.youtube.com/watch?v=G6WZTEcFT0A',
      tipo: 'video',
      porque: 'Métodos `default` e o que acontece quando duas interfaces os repetem, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Code Decode: Diamond problem of multiple inheritance due to default methods in Java 8',
      url: 'https://www.youtube.com/watch?v=0pCyqDAGafY',
      tipo: 'video',
      porque: 'O problema do diamante com interfaces e cada forma de resolvê-lo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Curious Coder: Java 8 Default Methods in Interface, Multiple Inheritance & Conflict Resolution',
      url: 'https://www.youtube.com/watch?v=ORmhR1VaH0c',
      tipo: 'video',
      porque: 'As três regras de resolução demonstradas em código.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os exemplos de `default` duplicados e da chamada a um `default` escondido, como cai na prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Implementing Interfaces", parte "Declaring Concrete Interface Methods"',
    },
  ],
  desafio: {
    titulo: 'Casa conectada',
    enunciado:
      'Crie as interfaces `Ligavel` e `Conectado`, ambas com um `default` chamado `ligar()` (devolvendo `energia ok` e `wi-fi ok`), e `Conectado` com um `default` chamado `status()` (`online`). Crie a classe `Aparelho`, com um `ligar()` público próprio. Depois: `Lampada` implementa as duas interfaces e combina as duas versões; `Tomada` estende `Aparelho` e implementa `Ligavel`, sem declarar nada; `Caixa` estende `Aparelho`, implementa `Conectado` e combina o `ligar()` da superclasse com o da interface. Rode com:\n\n```java\nLigavel[] dispositivos = {new Lampada(), new Tomada()};\nfor (Ligavel d : dispositivos) {\n    System.out.println(d.getClass().getSimpleName() + ": " + d.ligar());\n}\nCaixa caixa = new Caixa();\nSystem.out.println("Caixa: " + caixa.ligar() + " (" + caixa.status() + ")");\n```\n\nSaída esperada:\n\n```text\nLampada: energia ok, wi-fi ok, luz acesa\nTomada: aparelho genérico ligado\nCaixa: aparelho genérico ligado + wi-fi ok (online)\n```',
    dicas: [
      '`Lampada` é obrigada a sobrescrever `ligar()`: use `Ligavel.super.ligar()` e `Conectado.super.ligar()`.',
      '`Tomada` não precisa de nada: o método público herdado de `Aparelho` vence o `default`.',
      'Em `Caixa`, `super.ligar()` chama `Aparelho`, e `Conectado.super.ligar()` chama a interface.',
    ],
    solucao: `interface Ligavel {
    default String ligar() {
        return "energia ok";
    }
}

interface Conectado {
    default String ligar() {
        return "wi-fi ok";
    }

    default String status() {
        return "online";
    }
}

class Aparelho {
    public String ligar() {
        return "aparelho genérico ligado";
    }
}

class Lampada implements Ligavel, Conectado {
    @Override
    public String ligar() {
        return Ligavel.super.ligar() + ", " + Conectado.super.ligar() + ", luz acesa";
    }
}

class Tomada extends Aparelho implements Ligavel {
}

class Caixa extends Aparelho implements Conectado {
    @Override
    public String ligar() {
        return super.ligar() + " + " + Conectado.super.ligar();
    }
}

public class Casa {
    public static void main(String[] args) {
        Ligavel[] dispositivos = {new Lampada(), new Tomada()};
        for (Ligavel d : dispositivos) {
            System.out.println(d.getClass().getSimpleName() + ": " + d.ligar());
        }
        Caixa caixa = new Caixa();
        System.out.println("Caixa: " + caixa.ligar() + " (" + caixa.status() + ")");
    }
}`,
    saida: 'Lampada: energia ok, wi-fi ok, luz acesa\nTomada: aparelho genérico ligado\nCaixa: aparelho genérico ligado + wi-fi ok (online)',
    comentarios:
      'As três classes mostram as três regras: `Lampada` resolve um conflito entre interfaces sem relação, `Tomada` deixa a superclasse vencer, e `Caixa` usa ao mesmo tempo `super` (a classe mãe) e `Conectado.super` (a interface). O `status()` de `Caixa` vem da interface, porque nenhuma classe o declara.',
  },
  bugs: [
    {
      id: 'junior-t4-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: types Voa and Nada are incompatible;`.',
      codigo: `interface Voa {
    default String mover() { return "voando"; }
}

interface Nada {
    default String mover() { return "nadando"; }
}

class Pato implements Voa, Nada { }

public class Lago {
    public static void main(String[] args) {
        System.out.println(new Pato().mover());
    }
}`,
      linha: 9,
      efeito: { tipo: 'naoCompila' },
      correcao: `interface Voa {
    default String mover() { return "voando"; }
}

interface Nada {
    default String mover() { return "nadando"; }
}

class Pato implements Voa, Nada { public String mover() { return Nada.super.mover(); } }

public class Lago {
    public static void main(String[] args) {
        System.out.println(new Pato().mover());
    }
}`,
      saidaCorrigida: 'nadando',
      dica: 'Leia a segunda linha da mensagem: "inherits unrelated defaults". Quem precisa decidir qual versão vale?',
      explicacao: 'Duas interfaces sem relação trazem o mesmo `default`, e o compilador não escolhe por ninguém. A classe precisa sobrescrever o método, e pode reaproveitar uma das versões com `Interface.super.metodo()`.',
    },
    {
      id: 'junior-t4-e03-b02',
      dificuldade: 2,
      sintoma: 'Livros deveriam ter o desconto de 10% da interface `Descontavel`, mas o sistema aplica `0.05`.',
      codigo: `interface Descontavel {
    default double desconto() { return 0.10; }
}

class Produto {
    public double desconto() { return 0.05; }
}

class Livro extends Produto implements Descontavel { }

public class Livraria {
    public static void main(String[] args) {
        Descontavel d = new Livro();
        System.out.println(d.desconto());
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: '0.05' },
      correcao: `interface Descontavel {
    default double desconto() { return 0.10; }
}

class Produto {
    public double desconto() { return 0.05; }
}

class Livro extends Produto implements Descontavel { public double desconto() { return Descontavel.super.desconto(); } }

public class Livraria {
    public static void main(String[] args) {
        Descontavel d = new Livro();
        System.out.println(d.desconto());
    }
}`,
      saidaCorrigida: '0.1',
      dica: 'Entre um método herdado da superclasse e um `default` de interface, qual vence?',
      explicacao: 'Pela primeira regra, o método da classe ou da superclasse sempre vence o `default`, mesmo que a variável seja do tipo da interface. Para usar a versão da interface, a classe precisa sobrescrever e chamar `Descontavel.super.desconto()`.',
    },
    {
      id: 'junior-t4-e03-b03',
      dificuldade: 3,
      sintoma: 'Apagar um cliente do repositório em memória lança `UnsupportedOperationException: apagar`, embora a classe implemente `apagar`.',
      codigo: `import java.util.ArrayList;
import java.util.List;

interface Repositorio {
    void salvar(String id);

    default void apagar(String id) {
        throw new UnsupportedOperationException("apagar");
    }
}

class RepositorioMemoria implements Repositorio {
    final List<String> ids = new ArrayList<>();

    public void salvar(String id) { ids.add(id); }

    public void apagar(Object id) { ids.remove(id); }
}

public class Clientes {
    public static void main(String[] args) {
        RepositorioMemoria repo = new RepositorioMemoria();
        repo.salvar("7");
        repo.apagar("7");
        System.out.println(repo.ids);
    }
}`,
      linha: 17,
      efeito: { tipo: 'excecao', nome: 'UnsupportedOperationException' },
      correcao: `import java.util.ArrayList;
import java.util.List;

interface Repositorio {
    void salvar(String id);

    default void apagar(String id) {
        throw new UnsupportedOperationException("apagar");
    }
}

class RepositorioMemoria implements Repositorio {
    final List<String> ids = new ArrayList<>();

    public void salvar(String id) { ids.add(id); }

    public void apagar(String id) { ids.remove(id); }
}

public class Clientes {
    public static void main(String[] args) {
        RepositorioMemoria repo = new RepositorioMemoria();
        repo.salvar("7");
        repo.apagar("7");
        System.out.println(repo.ids);
    }
}`,
      saidaCorrigida: '[]',
      dica: 'O `apagar` da classe sobrescreve o `default`, ou é outro método com o mesmo nome? Compare os parâmetros.',
      explicacao: 'Com `Object`, o método da classe é uma sobrecarga; para o argumento `String`, o compilador escolhe a versão mais específica, que é o `default` da interface, e ele lança a exceção. Com o parâmetro `String`, a classe sobrescreve o `default`. Um `@Override` teria acusado o engano.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t4-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a ordem das regras para decidir qual versão de um método uma classe herda?',
      opcoes: [
        'Método da classe ou superclasse; depois a interface mais específica; senão, a classe precisa sobrescrever',
        'Interface mais específica; depois a superclasse; senão, a primeira interface declarada',
        'A primeira interface do `implements` sempre vence',
        'A última interface do `implements` sempre vence',
      ],
      resposta: 0,
      explicacao: 'A ordem no `implements` nunca decide nada. Classes vencem interfaces, subinterfaces vencem interfaces mães, e o resto é um conflito que a classe resolve.',
      dica: 'A classe existia antes dos `default`, e não pode ser atropelada por eles.',
    },
    {
      id: 'junior-t4-e03-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `interface A { default String f() { return "a"; } }
interface B { default String f() { return "b"; } }

class C implements A, B {
    public String f() { return B.super.f() + A.super.f() + "c"; }
}

System.out.println(new C().f());`,
      resposta: 'bac',
      explicacao: 'A classe é obrigada a sobrescrever `f()` e pode chamar cada versão pelo nome da interface, na ordem que quiser.',
      dica: 'A ordem das chamadas dentro do `return` define a ordem das letras.',
    },
    {
      id: 'junior-t4-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `interface Voa { default String mover() { return "voando"; } }
interface Nada { default String mover() { return "nadando"; } }

class Pato implements Voa, Nada {
    public String grasnar() { return "quack"; }
}`,
      opcoes: [
        'Não compila: `Pato` herda duas versões de `mover()` e não escolhe nenhuma',
        'Compila, e `mover()` devolve "voando"',
        'Compila, e `mover()` devolve "nadando"',
        'Compila, mas chamar `mover()` lança exceção',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'As duas interfaces não têm relação, e nenhuma regra decide entre elas. `Pato` precisa sobrescrever `mover()`.',
      dica: 'As duas interfaces não têm relação e trazem o mesmo `default`.',
    },
    {
      id: 'junior-t4-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface Descontavel {
    default double desconto() { return 0.1; }
}

class Produto {
    public double desconto() { return 0.05; }
}

class Livro extends Produto implements Descontavel { }

Descontavel d = new Livro();
System.out.println(d.desconto());`,
      opcoes: ['`0.05`', '`0.1`', 'Não compila: conflito entre a classe e a interface', '`0.15`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A classe vence: o método herdado de `Produto` implementa o da interface, mesmo chamado por uma referência `Descontavel`.',
      dica: 'Regra 1: o método herdado da superclasse vence.',
    },
    {
      id: 'junior-t4-e03-q05',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`interface A { default void f() { } } interface B extends A { default void f() { } } class C implements A, B { }`',
        '`interface A { default void f() { } } interface B extends A { } interface D extends A { } class C implements B, D { }`',
        '`interface A { default void f() { } } interface B { default void f() { } } class C implements A, B { public void f() { A.super.f(); } }`',
        '`interface A { default void f() { } } interface B { default void f() { } } class C implements A, B { }`',
        '`interface A { default void f() { } } interface B { void f(); } class C implements A, B { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'A subinterface mais específica vence, o diamante sem redefinição tem uma só versão, e a sobrescrita resolve qualquer conflito. Sem ela, dois `default`, ou um `default` e um abstrato, não compilam.',
      dica: 'Diamante sem redefinição e subinterface que redefine não conflitam.',
    },
    {
      id: 'junior-t4-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para chamar a versão de `Cantor`. O programa deve imprimir `lá-uuu`.',
      codigo: `interface Cantor {
    default String cantar() { return "lá"; }
}

interface Coral {
    default String cantar() { return "uuu"; }
}

class Solista implements Cantor, Coral {
    public String cantar() {
        return Cantor.___.cantar() + "-" + Coral.super.cantar();
    }
}

public class Show {
    public static void main(String[] args) {
        System.out.println(new Solista().cantar());
    }
}`,
      respostas: ['super'],
      saida: 'lá-uuu',
      explicacao: '`Cantor.super.cantar()` chama o `default` de `Cantor`. Sem o nome da interface, `super.cantar()` procuraria na superclasse, `Object`, e não compilaria.',
      dica: 'A sintaxe é `Interface.___.metodo()`.',
    },
    {
      id: 'junior-t4-e03-q07',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `interface Base {
    default String nome() { return "base"; }
}

interface Meio extends Base {
    default String nome() { return "meio"; }
}

class Fim implements Meio {
    public String nome() {
        return Meio.super.nome() + Base.super.nome();
    }
}`,
      resposta: 11,
      explicacao: '`Fim` implementa só `Meio` diretamente. `Base.super` tentaria pular um nível, o que não é permitido; a versão de `Base` está escondida pela de `Meio`.',
      dica: '`X.super` só funciona com interfaces implementadas diretamente.',
    },
    {
      id: 'junior-t4-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface Veiculo { default int rodas() { return 4; } }
interface Moto extends Veiculo { default int rodas() { return 2; } }

class Scooter implements Veiculo, Moto { }

Veiculo v = new Scooter();
System.out.println(v.rodas());`,
      opcoes: ['`2`', '`4`', 'Não compila: conflito entre `Veiculo` e `Moto`', '`6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Moto` estende `Veiculo` e redefine o método: é a interface mais específica, e a versão dela vence, mesmo com `Veiculo` listada no `implements`.',
      dica: '`Moto` estende `Veiculo` e redefine `rodas()`.',
    },
    {
      id: 'junior-t4-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `interface Saudavel {
    default String ola() { return "oi"; }
}

class Pessoa {
    String ola() { return "olá"; }
}

class Aluno extends Pessoa implements Saudavel { }`,
      opcoes: [
        'Não compila: o `ola()` de `Pessoa` não é `public` e não pode implementar o da interface',
        'Compila, e `ola()` devolve "olá"',
        'Compila, e `ola()` devolve "oi"',
        'Não compila: falta sobrescrever `ola()` com `Saudavel.super`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'A classe vence, mas ao vencer o método de `Pessoa` passa a implementar o da interface, que é `public`. Com acesso de pacote, ele estaria fechando o acesso.',
      dica: 'Para implementar o método da interface, o da superclasse precisa ser `public`.',
    },
    {
      id: 'junior-t4-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface A { default String f() { return "A"; } }
interface B extends A { }
interface C extends A { default String g() { return "C"; } }

class D implements B, C { }

D d = new D();
System.out.println(d.f() + d.g());`,
      opcoes: ['`AC`', 'Não compila: diamante', '`A`', '`CA`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`B` e `C` herdam o mesmo `f()` de `A`, sem redefini-lo: só existe uma versão. O `g()` vem só de `C`.',
      dica: '`f()` só tem uma versão, vinda de `A`; `g()` vem de `C`.',
    },
    {
      id: 'junior-t4-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Uma classe implementa duas interfaces sem relação que têm o mesmo método `default`. O que ela precisa fazer?',
      opcoes: [
        'Sobrescrever o método, podendo chamar as versões com `Interface.super.metodo()`',
        'Nada: vale a primeira interface do `implements`',
        'Declarar-se `abstract`',
        'Remover uma das interfaces: não há como resolver',
      ],
      resposta: 0,
      explicacao: 'A sobrescrita é a única saída para uma classe concreta, e dentro dela qualquer combinação das versões é possível.',
      dica: 'O compilador não escolhe entre dois `default` sem relação.',
    },
    {
      id: 'junior-t4-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `interface Base { default String f() { return "base"; } }
interface Exigente extends Base { String f(); }

class Impl implements Exigente {
    public String f() { return "impl"; }
}

Base b = new Impl();
System.out.println(b.f());`,
      opcoes: ['`impl`', '`base`', 'Não compila: uma interface não pode tornar abstrato um `default`', 'Lança `AbstractMethodError`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Uma subinterface pode redeclarar um `default` como abstrato, obrigando as classes a implementar. `Impl` implementou, e é a versão dela que roda.',
      dica: 'Uma subinterface pode tornar abstrato um `default`; `Impl` implementa.',
    },
    {
      id: 'junior-t4-e03-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais situações a classe é obrigada a declarar o método? Escolha duas.',
      opcoes: [
        'Duas interfaces sem relação trazem o mesmo `default`',
        'Uma interface traz um `default` e outra, sem relação, um abstrato com a mesma assinatura',
        'A superclasse tem o método `public`, e uma interface tem um `default` igual',
        'Uma interface estende a outra e redefine o `default`',
        'Duas interfaces herdam o mesmo `default` de uma terceira, sem redefini-lo',
      ],
      respostas: [0, 1],
      explicacao: 'Nos três últimos casos, uma regra decide: a classe vence, a interface mais específica vence, ou só existe uma versão. Nos dois primeiros, nenhuma regra decide.',
      dica: 'A superclasse com método `public` resolve sozinha; subinterface que redefine também.',
    },
    {
      id: 'junior-t4-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface A { static String id() { return "A"; } default String nome() { return "nome A"; } }
interface B { static String id() { return "B"; } }

class C implements A, B { }

System.out.println(A.id() + B.id() + " " + new C().nome());`,
      opcoes: ['`AB nome A`', 'Não compila: conflito entre os métodos `id()`', '`AA nome A`', '`BA nome A`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Métodos `static` de interface não são herdados, então não há o que conflitar: cada um é chamado pelo nome da sua interface.',
      dica: 'Métodos `static` de interface não são herdados, então não conflitam.',
    },
    {
      id: 'junior-t4-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Sua classe compilada implementa `X` e `Y`, e só `X` tinha o `default` `m()`. Uma versão nova da biblioteca acrescenta o mesmo `default` em `Y`. Sem recompilar sua classe, o que acontece ao chamar `m()`?',
      opcoes: [
        'A JVM lança `IncompatibleClassChangeError`',
        'Roda a versão de `X`, porque ela já estava lá',
        'Roda a versão de `Y`, porque é a mais nova',
        'A JVM recompila a classe automaticamente',
      ],
      resposta: 0,
      explicacao: 'Na execução, a JVM procura o `default` mais específico e encontra dois, sem relação. É o mesmo conflito que o compilador recusaria, só que descoberto tarde.',
      dica: 'A JVM também aplica as regras, e não acha um vencedor.',
    },
  ],
};

export default episodio;
