import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t4-e01',
  minutos: 14,
  aula,
  armadilhas: [
    'Uma classe implementa várias interfaces, mas estende uma só classe; interfaces estendem várias interfaces.',
    'Métodos sem corpo de interface são `public abstract`: a implementação na classe precisa ser `public`.',
    'Campos de interface são `public static final`: precisam de valor e não podem ser reatribuídos.',
    'Interfaces não têm construtores e não podem ser instanciadas com `new`.',
    'Nada numa interface pode ser `protected`.',
    'Métodos `static` de interface não são herdados: só se chamam pelo nome da interface.',
    'Métodos `private` de interface (Java 9) têm corpo e só servem aos outros métodos dela.',
    'Cast de uma classe não `final` para uma interface compila; se o objeto não a implementar, falha na execução.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Interfaces',
      url: 'https://dev.java/learn/language/oop/interfaces/defining-interfaces/',
      tipo: 'documentacao',
      porque: 'O que é uma interface, como declarar e o que ela pode conter.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Implementing an Interface, Default Methods',
      url: 'https://dev.java/learn/language/oop/interfaces/examples/#default-methods',
      tipo: 'documentacao',
      porque: 'Como métodos `default` e `static` permitem evoluir uma interface sem quebrar quem a implementa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Using an Interface as a Type',
      url: 'https://docs.oracle.com/javase/tutorial/java/IandI/interfaceAsType.html',
      tipo: 'documentacao',
      porque: 'Interfaces como tipo de variáveis e parâmetros, com o exemplo da interface `Relatable`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 9.4: Method Declarations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.4',
      tipo: 'documentacao',
      porque: 'Os modificadores permitidos e implícitos em cada tipo de método de interface.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java Interfaces',
      url: 'https://www.baeldung.com/java-interfaces',
      tipo: 'artigo',
      porque: 'Interfaces, herança múltipla de tipo e polimorfismo com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Static and Default Methods in Interfaces in Java',
      url: 'https://www.baeldung.com/java-static-default-methods',
      tipo: 'artigo',
      porque: 'Quando usar cada um e por que os métodos `static` de interface não são herdados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Private Methods in Java Interfaces',
      url: 'https://www.baeldung.com/java-interface-private-methods',
      tipo: 'artigo',
      porque: 'Os métodos `private` do Java 9 e como eles organizam os métodos `default`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 44, Orientação a Objetos: Interfaces',
      url: 'https://www.youtube.com/watch?v=6uLLfRNgRA4',
      tipo: 'video',
      porque: 'Interfaces como contrato, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Curso Java Completo, Aula 181: Java 8, novas regras para interfaces, métodos default',
      url: 'https://www.youtube.com/watch?v=AJt9yYisBRE',
      tipo: 'video',
      porque: 'O que mudou nas interfaces com o Java 8, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Codando Simples: Java 8, Aula 2, Entenda os static e default methods',
      url: 'https://www.youtube.com/watch?v=fSj70-63IPw',
      tipo: 'video',
      porque: 'Métodos `static` e `default` lado a lado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de modificadores implícitos e as regras de cada tipo de método de interface.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Implementing Interfaces", partes "Inserting Implicit Modifiers" e "Declaring Concrete Interface Methods"',
    },
  ],
  desafio: {
    titulo: 'Canais de aviso',
    enunciado:
      'Crie a interface `Canal`, com `nome()`, `enviar(String destino, String msg)` (que devolve se conseguiu), um método `default` chamado `enviarParaTodos(List<String> destinos, String msg)` que conta os envios bem-sucedidos e registra `[log] ok/total via nome` por um método `private`, e um método `static` chamado `silencioso()`, que devolve um canal que aceita tudo sem imprimir. Implemente `Email`, que só aceita destinos com `@`, e `Sms`, que recusa mensagens com mais de 20 caracteres. Rode com:\n\n```java\nList<Canal> canais = List.of(new Email(), new Sms(), Canal.silencioso());\nList<String> destinos = List.of("ana@x.com", "81999990000");\nint total = 0;\nfor (Canal c : canais) {\n    total += c.enviarParaTodos(destinos, "Pedido saiu");\n}\nSystem.out.println("Total: " + total);\n```\n\nSaída esperada:\n\n```text\ne-mail para ana@x.com: Pedido saiu\n[log] 1/2 via e-mail\nSMS para ana@x.com: Pedido saiu\nSMS para 81999990000: Pedido saiu\n[log] 2/2 via SMS\n[log] 2/2 via silencioso\nTotal: 5\n```',
    dicas: [
      'O `default` chama `enviar` e `nome`, que cada classe implementa.',
      'O método `private` de log só pode ser chamado de dentro da interface.',
      'Em `silencioso()`, devolva uma classe anônima que implementa `Canal`.',
    ],
    solucao: `import java.util.List;

interface Canal {
    String nome();

    boolean enviar(String destino, String msg);

    default int enviarParaTodos(List<String> destinos, String msg) {
        int ok = 0;
        for (String d : destinos) {
            if (enviar(d, msg)) ok++;
        }
        registrar(ok + "/" + destinos.size() + " via " + nome());
        return ok;
    }

    private void registrar(String linha) {
        System.out.println("[log] " + linha);
    }

    static Canal silencioso() {
        return new Canal() {
            public String nome() { return "silencioso"; }
            public boolean enviar(String destino, String msg) { return true; }
        };
    }
}

class Email implements Canal {
    public String nome() {
        return "e-mail";
    }

    public boolean enviar(String destino, String msg) {
        if (!destino.contains("@")) return false;
        System.out.println("e-mail para " + destino + ": " + msg);
        return true;
    }
}

class Sms implements Canal {
    public String nome() {
        return "SMS";
    }

    public boolean enviar(String destino, String msg) {
        if (msg.length() > 20) return false;
        System.out.println("SMS para " + destino + ": " + msg);
        return true;
    }
}

public class Avisos {
    public static void main(String[] args) {
        List<Canal> canais = List.of(new Email(), new Sms(), Canal.silencioso());
        List<String> destinos = List.of("ana@x.com", "81999990000");
        int total = 0;
        for (Canal c : canais) {
            total += c.enviarParaTodos(destinos, "Pedido saiu");
        }
        System.out.println("Total: " + total);
    }
}`,
    saida: 'e-mail para ana@x.com: Pedido saiu\n[log] 1/2 via e-mail\nSMS para ana@x.com: Pedido saiu\nSMS para 81999990000: Pedido saiu\n[log] 2/2 via SMS\n[log] 2/2 via silencioso\nTotal: 5',
    comentarios:
      'O comportamento comum, enviar para todos e registrar, está escrito uma vez, no `default`; cada classe só implementa o que é dela. O `private` esconde um detalhe que nenhuma classe precisa ver, e o `static` funciona como uma fábrica de canais prontos. Acrescentar um canal de WhatsApp seria só mais uma classe.',
  },
  exercicios: [
    {
      id: 'junior-t4-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais modificadores o compilador acrescenta a um método sem corpo declarado numa interface?',
      opcoes: ['`public abstract`', '`protected abstract`', '`public static`', 'Nenhum: ele fica com acesso de pacote'],
      resposta: 0,
      explicacao: 'Todo método abstrato de interface é `public abstract`, escrito ou não. Por isso a classe que o implementa precisa usar `public`.',
    },
    {
      id: 'junior-t4-e01-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `interface A {
    default String quem() { return "A"; }
}

interface B {
    String nome();
}

class C implements A, B {
    public String nome() { return "C"; }
}

C c = new C();
A a = c;
System.out.println(c.quem() + c.nome() + a.quem());`,
      resposta: 'ACA',
      explicacao: '`C` herda o `default` de `A` e implementa o método abstrato de `B`. A referência `A` aponta para o mesmo objeto e chama o mesmo `quem()`.',
    },
    {
      id: 'junior-t4-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `interface Motor {
    void ligar();
}

class MotorEletrico implements Motor {
    void ligar() {
        System.out.println("zzz");
    }
}`,
      opcoes: ['Não compila', 'Compila', 'Compila, mas `ligar` não implementa o método da interface', 'Não compila: falta `@Override`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'O método da interface é implicitamente `public`. Sem modificador, a implementação teria acesso de pacote, mais restrito, e a sobrescrita não pode fechar o acesso.',
    },
    {
      id: 'junior-t4-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais interfaces compilam? Escolha três.',
      opcoes: [
        '`interface A { int X = 1; void f(); }`',
        '`interface B { default void g() { } static void h() { } }`',
        '`interface C { private void p() { } default void q() { p(); } }`',
        '`interface D { int y; }`',
        '`interface E { protected void r(); }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Constantes, métodos abstratos, `default`, `static` e `private` são permitidos. Um campo de interface é `final` e precisa de valor, e nada numa interface pode ser `protected`.',
    },
    {
      id: 'junior-t4-e01-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `interface Conversor {
    static double paraKm(double milhas) {
        return milhas * 1.609;
    }
}

class Painel implements Conversor {
    double mostrar(double milhas) {
        return Conversor.paraKm(milhas) + Painel.paraKm(milhas);
    }
}`,
      opcoes: [
        'Não compila: métodos `static` de interface não são herdados por `Painel`',
        'Compila',
        'Não compila: interfaces não podem ter métodos `static`',
        'Compila, mas `Painel.paraKm` chama outro método',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'Diferente dos métodos `static` de classes, os de interface só existem pelo nome da interface. `Conversor.paraKm` funciona; `Painel.paraKm` não.',
    },
    {
      id: 'junior-t4-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a palavra que liga a classe à interface. O programa deve imprimir `miau`.',
      codigo: `interface Animal {
    String som();
}

class Gato ___ Animal {
    public String som() {
        return "miau";
    }
}

public class Teste {
    public static void main(String[] args) {
        Animal a = new Gato();
        System.out.println(a.som());
    }
}`,
      respostas: ['implements'],
      saida: 'miau',
      explicacao: 'Classes implementam interfaces com `implements`. O `extends` liga uma classe a outra classe, ou uma interface a outras interfaces.',
    },
    {
      id: 'junior-t4-e01-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `interface Limites {
    int MAXIMO = 100;
}

class Validador implements Limites {
    boolean valido(int x) {
        MAXIMO = 200;
        return x <= MAXIMO;
    }
}`,
      resposta: 7,
      explicacao: 'Campos de interface são `public static final`, mesmo sem os modificadores escritos. `MAXIMO` é uma constante e não aceita outra atribuição.',
    },
    {
      id: 'junior-t4-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface Desconto {
    double percentual();

    default double aplicar(double preco) {
        return preco * (1 - percentual() / 100);
    }
}

class Cupom implements Desconto {
    public double percentual() { return 25; }
}

System.out.println(new Cupom().aplicar(80));`,
      opcoes: ['`60.0`', '`20.0`', '`80.0`', 'Não compila: métodos `default` não podem chamar abstratos'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `default` usa o método abstrato, que cada classe implementa: 80 × 0,75 = 60.0. É o mesmo padrão template das classes abstratas.',
    },
    {
      id: 'junior-t4-e01-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado?',
      codigo: `interface Tarefa {
    void fazer();
}

Tarefa t = new Tarefa();
t.fazer();`,
      opcoes: ['Não compila', 'Compila e não faz nada', 'Lança `InstantiationError`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Interfaces não podem ser instanciadas. Seria preciso uma classe que a implemente, ou uma classe anônima: `new Tarefa() { public void fazer() { } }`.',
    },
    {
      id: 'junior-t4-e01-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `interface X { String x(); }
interface Y { String y(); }
interface XY extends X, Y { default String ambos() { return x() + y(); } }

abstract class Base implements XY {
    public String x() { return "1"; }
}

class Final extends Base {
    public String y() { return "2"; }
}

XY obj = new Final();
X soX = obj;
System.out.println(obj.ambos() + soX.x() + (soX instanceof Y));`,
      opcoes: ['`121true`', '`12false`', '`121false`', 'Não compila: `Base` não implementa `y()`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Base` é abstrata e pode deixar `y()` para `Final`. Pela referência `X`, só `x()` é visível, mas o objeto continua sendo um `Final`, que também é um `Y`.',
    },
    {
      id: 'junior-t4-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais modificadores um campo declarado numa interface recebe implicitamente?',
      opcoes: ['`public static final`', '`private final`', '`public` apenas', '`protected static`'],
      resposta: 0,
      explicacao: 'Interfaces não têm estado de instância: todo campo é uma constante pública e compartilhada.',
    },
    {
      id: 'junior-t4-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `interface Medida {
    double valor();

    static Medida de(double v) {
        return new Medida() {
            public double valor() { return v; }
        };
    }

    default String formatar() {
        return arredondar() + " un";
    }

    private long arredondar() {
        return Math.round(valor());
    }
}

System.out.println(Medida.de(2.6).formatar());`,
      opcoes: ['`3 un`', '`2.6 un`', '`2 un`', 'Não compila: métodos `private` não são permitidos em interfaces'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O método `static` cria a medida com uma classe anônima. O `default` usa o método `private` da interface, que arredonda 2,6 para 3.',
    },
    {
      id: 'junior-t4-e01-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Uma classe pode implementar várias interfaces',
        'Uma interface pode estender várias interfaces',
        'Uma interface pode declarar construtores',
        'Uma interface pode ter campos de instância',
        'Métodos `static` de interface são herdados pelas classes que a implementam',
      ],
      respostas: [0, 1],
      explicacao: 'Interfaces permitem herança múltipla de tipo. Não têm construtores nem estado de instância, e seus métodos `static` ficam presos ao nome da interface.',
    },
    {
      id: 'junior-t4-e01-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `interface Voador { }
class Carro { }

Carro c = new Carro();
Object o = c;
System.out.println(o instanceof Voador);
Voador v = (Voador) c;`,
      opcoes: [
        'Imprime `false` e lança `ClassCastException`',
        'Não compila na linha 7',
        'Imprime `false`',
        'Imprime `true`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ClassCastException', saida: 'false' },
      explicacao: '`Carro` não é `final`: uma subclasse dele poderia implementar `Voador`, então o compilador aceita o cast. Na execução, o objeto é um `Carro` comum, e o cast falha.',
    },
    {
      id: 'junior-t4-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Que instrução de bytecode chama um método por uma referência do tipo de uma interface?',
      opcoes: ['`invokeinterface`', '`invokevirtual`', '`invokestatic`', '`invokespecial`'],
      resposta: 0,
      explicacao: 'Métodos de interface não têm posição fixa na tabela virtual, porque cada classe implementa interfaces diferentes. A HotSpot usa uma tabela por interface, a *itable*, e os caches do JIT deixam o custo igual ao de uma chamada virtual.',
    },
  ],
};

export default episodio;
