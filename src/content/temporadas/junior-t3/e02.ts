import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t3-e02',
  minutos: 15,
  aula,
  armadilhas: [
    'Sobrescrever exige a mesma assinatura; parâmetros de tipos diferentes criam uma sobrecarga.',
    'O acesso só pode ficar igual ou mais aberto: `public` não vira `protected`.',
    'O retorno pode ser um subtipo (covariante), mas com primitivos precisa ser idêntico.',
    'O método da subclasse não pode declarar exceções verificadas novas ou mais amplas.',
    'Métodos `final` não podem ser sobrescritos.',
    'Métodos `static` são escondidos, não sobrescritos: vale o tipo declarado.',
    'Um método de instância não pode "sobrescrever" um `static`, nem o contrário.',
    'Um método `private` com o mesmo nome na subclasse é um método novo, que a superclasse nunca chama.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Overriding and Hiding Methods',
      url: 'https://dev.java/learn/language/oop/inheritance/overriding/',
      tipo: 'documentacao',
      porque: 'Sobrescrita, esconder métodos `static` e a tabela do que acontece em cada combinação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.8.3: Requirements in Overriding and Hiding',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.8.3',
      tipo: 'documentacao',
      porque: 'As regras oficiais de retorno, acesso e exceções, de onde saem as questões.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.Override',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Override.html',
      tipo: 'documentacao',
      porque: 'Quando o compilador acusa erro num método anotado com `@Override`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Variable and Method Hiding in Java',
      url: 'https://www.baeldung.com/java-variable-method-hiding',
      tipo: 'artigo',
      porque: 'A diferença entre esconder e sobrescrever, com campos e métodos `static`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Method Overloading and Overriding in Java',
      url: 'https://www.baeldung.com/java-method-overload-override',
      tipo: 'artigo',
      porque: 'Sobrecarga e sobrescrita comparadas, para não confundir as duas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'CODEficando: Override de métodos, Programação Java',
      url: 'https://www.youtube.com/watch?v=kIN8RdVy-IQ',
      tipo: 'video',
      porque: 'A sobrescrita na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Como usar @Override?',
      url: 'https://www.youtube.com/watch?v=cvgztHrY9Yk',
      tipo: 'video',
      porque: 'Por que a anotação evita bugs silenciosos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OpenJDK Wiki: HotSpot VirtualCalls',
      url: 'https://wiki.openjdk.org/spaces/HotSpot/pages/11829285/VirtualCalls',
      tipo: 'documentacao',
      porque: 'A descrição interna das vtables e das chamadas virtuais na HotSpot.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de sobrescrita numeradas e os casos de métodos `private` e `static`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Class Design": seção "Inheriting Members", partes "Overriding a Method", "Redeclaring private Methods", "Hiding Static Methods" e "Writing final Methods"',
    },
  ],
  desafio: {
    titulo: 'Tarifas de envio',
    enunciado:
      'Crie a classe `Envio`, com `double custo(double kg)` (10 mais 2 por quilo) e um método `final` chamado `recibo(double kg)`, que devolve o nome simples da classe e o custo. Crie `Expresso`, que cobra 50% a mais que o envio comum, e `Promocional`, grátis até 1 kg e com 5 de desconto acima disso. As duas subclasses devem reaproveitar o cálculo da superclasse com `super`. Rode com:\n\n```java\nEnvio[] envios = {new Envio(), new Expresso(), new Promocional()};\nfor (Envio e : envios) {\n    System.out.println(e.recibo(3));\n}\nSystem.out.println(new Promocional().recibo(0.5));\n```\n\nSaída esperada:\n\n```text\nEnvio: 16.0\nExpresso: 24.0\nPromocional: 11.0\nPromocional: 0.0\n```',
    dicas: [
      '`getClass().getSimpleName()` devolve o nome da classe real do objeto.',
      'O `recibo` é escrito uma vez só, na superclasse, e chama `custo`: cada objeto executa a sua versão.',
      'Em `Expresso`, `return super.custo(kg) * 1.5;`.',
    ],
    solucao: `class Envio {
    double custo(double kg) {
        return 10 + 2 * kg;
    }

    final String recibo(double kg) {
        return getClass().getSimpleName() + ": " + custo(kg);
    }
}

class Expresso extends Envio {
    @Override
    double custo(double kg) {
        return super.custo(kg) * 1.5;
    }
}

class Promocional extends Envio {
    @Override
    double custo(double kg) {
        return kg <= 1 ? 0 : super.custo(kg) - 5;
    }
}

public class Correios {
    public static void main(String[] args) {
        Envio[] envios = {new Envio(), new Expresso(), new Promocional()};
        for (Envio e : envios) {
            System.out.println(e.recibo(3));
        }
        System.out.println(new Promocional().recibo(0.5));
    }
}`,
    saida: 'Envio: 16.0\nExpresso: 24.0\nPromocional: 11.0\nPromocional: 0.0',
    comentarios:
      'O `recibo` é um *método template*: a superclasse fixa o formato, como `final`, e deixa o cálculo para as subclasses. Mesmo escrito em `Envio`, ele chama o `custo` de cada objeto real, graças à tabela de métodos virtuais. Esse é o polimorfismo, assunto do próximo episódio.',
  },
  exercicios: [
    {
      id: 'junior-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é sobrescrever um método?',
      opcoes: [
        'Redeclarar, na subclasse, um método de instância herdado, com a mesma assinatura',
        'Declarar dois métodos com o mesmo nome e parâmetros diferentes na mesma classe',
        'Chamar o método da superclasse com `super`',
        'Declarar um método `static` com o nome de outro',
      ],
      resposta: 0,
      explicacao: 'Na sobrescrita, a subclasse substitui o comportamento herdado. Mesmo nome com parâmetros diferentes é sobrecarga, e `static` com o mesmo nome é esconder.',
    },
    {
      id: 'junior-t3-e02-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Base {
    String nome() { return "base"; }
    String descrever() { return "eu sou " + nome(); }
}

class Derivada extends Base {
    @Override
    String nome() { return "derivada"; }
}

System.out.println(new Derivada().descrever());`,
      resposta: 'eu sou derivada',
      explicacao: '`descrever` é herdado, mas o `nome()` dentro dele é chamado no objeto real, um `Derivada`. Métodos de instância sobrescritos são escolhidos pelo objeto, mesmo quando a chamada está na superclasse.',
    },
    {
      id: 'junior-t3-e02-q03',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`class A { protected Object f() { return null; } } class B extends A { public String f() { return ""; } }`',
        '`class A { public void g() { } } class B extends A { protected void g() { } }`',
        '`class A { int h() { return 0; } } class B extends A { long h() { return 0; } }`',
        '`class A { void k() throws Exception { } } class B extends A { void k() { } }`',
        '`class A { static void m() { } } class B extends A { static void m() { } }`',
      ],
      respostas: [0, 3, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Abrir o acesso e devolver um subtipo é permitido, assim como declarar menos exceções e esconder um `static` com outro. Fechar o acesso e trocar o primitivo de retorno não.',
    },
    {
      id: 'junior-t3-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `class Animal {
    String som() {
        return "...";
    }
}

class Gato extends Animal {
    @Override
    String Som() {
        return "miau";
    }
}`,
      opcoes: [
        'Não compila: `Som` não sobrescreve nenhum método',
        'Compila, e `Som` sobrescreve `som`',
        'Compila, e `Gato` passa a ter os dois métodos',
        'Não compila: falta `public` em `Som`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Java diferencia maiúsculas, e `Som` é outro nome. Sem o `@Override`, a classe compilaria com um método novo e o bug passaria despercebido.',
    },
    {
      id: 'junior-t3-e02-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class A {
    static String s() { return "A.s"; }
    String i() { return "A.i"; }
}

class B extends A {
    static String s() { return "B.s"; }
    String i() { return "B.i"; }
}

A x = new B();
B y = new B();
System.out.println(x.s() + " " + x.i() + " " + y.s() + " " + y.i());`,
      opcoes: ['`A.s B.i B.s B.i`', '`B.s B.i B.s B.i`', '`A.s A.i B.s B.i`', '`A.s B.i A.s B.i`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O método `static` é escolhido pelo tipo declarado: `x` é `A`, então `A.s`. O método de instância segue o objeto, que nos dois casos é um `B`.',
    },
    {
      id: 'junior-t3-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a anotação que pede ao compilador para confirmar a sobrescrita. O programa deve imprimir `2`.',
      codigo: `class Veiculo {
    int rodas() {
        return 4;
    }
}

class Moto extends Veiculo {
    @___
    int rodas() {
        return 2;
    }
}

public class Garagem {
    public static void main(String[] args) {
        Veiculo v = new Moto();
        System.out.println(v.rodas());
    }
}`,
      respostas: ['Override'],
      saida: '2',
      explicacao: '`@Override` não muda o comportamento, mas faz o compilador recusar o método se ele não sobrescrever nada. A chamada por uma variável `Veiculo` executa a versão da moto.',
    },
    {
      id: 'junior-t3-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `class Servico {
    public String status() {
        return "ok";
    }
}

class ServicoInterno extends Servico {
    protected String status() {
        return "interno";
    }
}`,
      resposta: 8,
      explicacao: 'O método original é `public`, e a subclasse tentou fechá-lo para `protected`. Quem usa um `Servico` tem o direito de chamar `status()`, e a subclasse não pode tirar esse direito.',
    },
    {
      id: 'junior-t3-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Pai {
    private String nome() { return "Pai"; }
    String quem() { return nome(); }
}

class Filho extends Pai {
    String nome() { return "Filho"; }
}

Filho f = new Filho();
System.out.println(f.quem() + " " + f.nome());`,
      opcoes: ['`Pai Filho`', '`Filho Filho`', '`Pai Pai`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`nome()` de `Pai` é `private`: não é herdado nem sobrescrito. O `quem()` chama sempre a versão de `Pai`. O `nome()` de `Filho` é um método independente.',
    },
    {
      id: 'junior-t3-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.FileNotFoundException;
import java.io.IOException;

class Origem {
    void abrir() throws FileNotFoundException {
    }
}

class Destino extends Origem {
    @Override
    void abrir() throws IOException {
    }
}`,
      opcoes: [
        'Não compila: `IOException` é mais ampla que a exceção do método original',
        'Compila',
        'Não compila: métodos sobrescritos não podem declarar exceções',
        'Compila, mas o `@Override` é ignorado',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: '`FileNotFoundException` é uma `IOException`, e não o contrário. Quem chama `Origem.abrir()` só se preparou para a primeira; a subclasse não pode lançar algo mais amplo.',
    },
    {
      id: 'junior-t3-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Animal {
    Animal reproduzir() {
        return new Animal();
    }

    String tipo() {
        return "animal";
    }
}

class Coelho extends Animal {
    @Override
    Coelho reproduzir() {
        return new Coelho();
    }

    @Override
    String tipo() {
        return "coelho";
    }
}

Coelho c = new Coelho().reproduzir().reproduzir();
System.out.println(c.tipo());`,
      opcoes: ['`coelho`', '`animal`', 'Não compila: o retorno deveria ser `Animal`', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O retorno covariante permite que `Coelho.reproduzir()` declare `Coelho`. Por isso o resultado pode ser guardado numa variável `Coelho` sem cast.',
    },
    {
      id: 'junior-t3-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A superclasse declara `protected void salvar() throws IOException`. Qual destas versões **não** pode sobrescrevê-lo?',
      opcoes: [
        '`private void salvar()`',
        '`public void salvar()`',
        '`protected void salvar() throws FileNotFoundException`',
        '`public void salvar() throws IllegalStateException`',
      ],
      resposta: 0,
      explicacao: 'Fechar o acesso é proibido. Abrir o acesso, declarar menos exceções verificadas ou uma mais específica, e declarar exceções não verificadas é permitido.',
    },
    {
      id: 'junior-t3-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `class Base {
    final void iniciar() {
        System.out.println("base");
    }
}

class Derivada extends Base {
    void iniciar() {
        System.out.println("derivada");
    }
}`,
      opcoes: ['Não compila', 'Compila', 'Compila, mas `Derivada.iniciar` nunca é chamado', 'Não compila: falta `@Override`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: '`final` num método impede a sobrescrita. A classe continua podendo ser estendida; só esse método fica fixo.',
    },
    {
      id: 'junior-t3-e02-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Impressora {
    String imprimir(Object o) { return "Impressora/Object"; }
}

class Laser extends Impressora {
    String imprimir(String s) { return "Laser/String"; }
}

Impressora i = new Laser();
Laser l = new Laser();
System.out.println(i.imprimir("x") + " " + l.imprimir("x") + " " + l.imprimir(1));`,
      opcoes: [
        '`Impressora/Object Laser/String Impressora/Object`',
        '`Laser/String Laser/String Impressora/Object`',
        '`Laser/String Laser/String Laser/String`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`imprimir(String)` é uma sobrecarga, não uma sobrescrita. Pela variável `Impressora`, o compilador só conhece `imprimir(Object)`, que `Laser` não sobrescreveu. Pela variável `Laser`, a versão `String` é a mais específica para "x", e o `1` só cabe em `Object`.',
    },
    {
      id: 'junior-t3-e02-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais métodos não podem ser sobrescritos por uma subclasse? Escolha três.',
      opcoes: ['Os `final`', 'Os `static`', 'Os `private`', 'Os `protected`', 'Os que devolvem `void`'],
      respostas: [0, 1, 2],
      explicacao: '`final` proíbe por definição; `static` só pode ser escondido; `private` nem é herdado. `protected` e `void` não impedem a sobrescrita.',
    },
    {
      id: 'junior-t3-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Quando `String criar()` sobrescreve `Object criar()`, o que o `javac` gera na subclasse?',
      opcoes: [
        'Um método ponte sintético `Object criar()`, que chama a versão que devolve `String`',
        'Nada: a JVM ignora o tipo de retorno nas chamadas',
        'Um cast para `String` em cada lugar que chama `criar()`',
        'Duas cópias completas do corpo do método',
      ],
      resposta: 0,
      explicacao: 'Para a JVM, o descritor inclui o retorno, então os dois métodos são diferentes. O método ponte ocupa a entrada da tabela virtual da versão original e repassa a chamada.',
    },
  ],
};

export default episodio;
