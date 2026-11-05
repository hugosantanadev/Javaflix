import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t3-e05',
  minutos: 13,
  aula,
  armadilhas: [
    'Classe abstrata não pode ser instanciada com `new`, mas pode ser o tipo de uma variável.',
    'Método abstrato não tem corpo, nem vazio: termina em `;`.',
    'Método abstrato só existe em classe abstrata (ou interface).',
    'Método abstrato não pode ser `private`, `final` nem `static`; classe abstrata não pode ser `final`.',
    'A primeira subclasse concreta precisa implementar todos os métodos abstratos herdados, de todos os níveis.',
    'Uma subclasse abstrata pode implementar só parte dos métodos abstratos.',
    'Classes abstratas têm construtores, que rodam pela cadeia de `super(...)`.',
    'Uma classe abstrata pode não ter nenhum método abstrato.',
  ],
  ia: {
    uso:
      'A IA ajuda a decidir o que fica concreto e o que fica abstrato numa superclasse, e a montar um Template Method. Use-a para revisar se um método com corpo "padrão" não deveria ser abstrato.',
    pedido:
      'Revise esta classe abstrata Java 21 e suas subclasses.\n<cole o código aqui>\n- Aponte métodos concretos com valor padrão vazio (0, null, "") que deveriam ser abstract.\n- Confira se cada subclasse concreta implementa todos os métodos abstratos herdados.\n- Aponte construtores que chamam métodos abstratos.',
    erros: [
      'Dá corpo "padrão" a métodos que deveriam ser abstratos, escondendo subclasses incompletas.',
      'Chama um método abstrato no construtor da classe abstrata.',
      'Combina `abstract` com `private`, `final` ou `static`.',
    ],
    conferir: [
      'Compile depois de criar uma subclasse vazia: o erro deve listar os métodos pendentes.',
      'Tente um `new` da classe abstrata: precisa ser recusado.',
      'Teste cada subclasse pelo tipo da superclasse.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Abstract Methods and Classes',
      url: 'https://dev.java/learn/language/oop/inheritance/abstract-classes/',
      tipo: 'documentacao',
      porque: 'Classes e métodos abstratos, e quando preferir uma classe abstrata a uma interface.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.1.1.1: abstract Classes',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.1.1',
      tipo: 'documentacao',
      porque: 'A regra que obriga a primeira classe concreta a implementar todos os métodos abstratos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.4.3.1: abstract Methods',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.3.1',
      tipo: 'documentacao',
      porque: 'As combinações proibidas com `private`, `static` e `final`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.AbstractList',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/AbstractList.html',
      tipo: 'documentacao',
      porque: 'Uma classe abstrata real da biblioteca: implemente `get` e `size` e ganhe uma lista inteira.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Abstract Classes in Java',
      url: 'https://www.baeldung.com/java-abstract-class',
      tipo: 'artigo',
      porque: 'Quando usar classes abstratas, com o exemplo de um jogo de tabuleiro.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Refactoring Guru: Template Method',
      url: 'https://refactoring.guru/pt-br/design-patterns/template-method',
      tipo: 'artigo',
      porque: 'O padrão em que a classe abstrata fixa o roteiro e as subclasses preenchem os passos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 41, Herança: classes abstratas',
      url: 'https://www.youtube.com/watch?v=Oibb-17nD14',
      tipo: 'video',
      porque: 'Classes e métodos abstratos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Classes abstratas pt 01',
      url: 'https://www.youtube.com/watch?v=ws1NVBGeegs',
      tipo: 'video',
      porque: 'Por que uma classe genérica demais deve ser abstrata, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Abstract Classes and Methods in Java Explained in 7 Minutes',
      url: 'https://www.youtube.com/watch?v=HvPlEJ3LHgE',
      tipo: 'video',
      porque: 'As regras de classes e métodos abstratos numa explicação rápida.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A lista de declarações inválidas, a mais cobrada nas questões de classes abstratas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Class Design": seção "Creating Abstract Classes", partes "Declaring Abstract Methods", "Creating a Concrete Class" e "Spotting Invalid Declarations"',
    },
  ],
  desafio: {
    titulo: 'Gerador de relatórios',
    enunciado:
      'Crie a classe abstrata `Relatorio`, com um título, um método `final` chamado `gerar()` que monta cabeçalho, corpo e rodapé, um método abstrato `corpo()` e um `rodape()` concreto que devolve `-- fim --`. Crie `RelatorioVendas`, que recebe as vendas por varargs e mostra quantidade e total, e `RelatorioEstoque`, que mostra a quantidade de itens e troca o rodapé por um alerta quando há menos de 10. Rode com:\n\n```java\nRelatorio[] todos = {new RelatorioVendas(120.5, 80, 49.5), new RelatorioEstoque(7)};\nfor (Relatorio r : todos) {\n    System.out.println(r.gerar());\n}\n```\n\nSaída esperada:\n\n```text\n== Vendas ==\n3 vendas, total 250.0\n-- fim --\n== Estoque ==\n7 itens em estoque\n-- repor estoque! --\n```',
    dicas: [
      '`gerar()` é `final`: o formato é decidido na classe abstrata, uma vez só.',
      'O construtor de cada subclasse passa o título com `super("Vendas")`.',
      'Em `RelatorioEstoque`, o rodapé sobrescrito pode reaproveitar `super.rodape()` quando não há alerta.',
    ],
    solucao: `abstract class Relatorio {
    private final String titulo;

    Relatorio(String titulo) {
        this.titulo = titulo;
    }

    final String gerar() {
        return "== " + titulo + " ==\\n" + corpo() + "\\n" + rodape();
    }

    protected abstract String corpo();

    protected String rodape() {
        return "-- fim --";
    }
}

class RelatorioVendas extends Relatorio {
    private final double[] vendas;

    RelatorioVendas(double... vendas) {
        super("Vendas");
        this.vendas = vendas.clone();
    }

    @Override
    protected String corpo() {
        double total = 0;
        for (double v : vendas) total += v;
        return vendas.length + " vendas, total " + total;
    }
}

class RelatorioEstoque extends Relatorio {
    private final int itens;

    RelatorioEstoque(int itens) {
        super("Estoque");
        this.itens = itens;
    }

    @Override
    protected String corpo() {
        return itens + " itens em estoque";
    }

    @Override
    protected String rodape() {
        return itens < 10 ? "-- repor estoque! --" : super.rodape();
    }
}

public class Relatorios {
    public static void main(String[] args) {
        Relatorio[] todos = {new RelatorioVendas(120.5, 80, 49.5), new RelatorioEstoque(7)};
        for (Relatorio r : todos) {
            System.out.println(r.gerar());
        }
    }
}`,
    saida: '== Vendas ==\n3 vendas, total 250.0\n-- fim --\n== Estoque ==\n7 itens em estoque\n-- repor estoque! --',
    comentarios:
      'É o Template Method: o roteiro (`gerar`) fica fixo e protegido por `final`, o passo obrigatório (`corpo`) é abstrato, e o passo opcional (`rodape`) tem uma versão padrão que as subclasses podem trocar. Um terceiro relatório seria só mais uma subclasse com um `corpo()`, e o compilador garantiria que ele não fosse esquecido.',
  },
  bugs: [
    {
      id: 'junior-t3-e05-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: Veiculo is abstract; cannot be instantiated`.',
      codigo: `abstract class Veiculo {
    abstract int rodas();
}

class Moto extends Veiculo {
    int rodas() { return 2; }
}

public class Garagem {
    public static void main(String[] args) {
        Veiculo v = new Veiculo();
        System.out.println(v.rodas() + " rodas");
    }
}`,
      linha: 11,
      efeito: { tipo: 'naoCompila' },
      correcao: `abstract class Veiculo {
    abstract int rodas();
}

class Moto extends Veiculo {
    int rodas() { return 2; }
}

public class Garagem {
    public static void main(String[] args) {
        Veiculo v = new Moto();
        System.out.println(v.rodas() + " rodas");
    }
}`,
      saidaCorrigida: '2 rodas',
      dica: 'Quantas rodas teria "um veículo qualquer"? Que classe da hierarquia sabe responder?',
      explicacao: 'Uma classe abstrata pode ser o tipo da variável, mas não o do objeto: ela tem métodos sem corpo. O `new` precisa ser de uma subclasse concreta, e a variável `Veiculo` continua aceitando qualquer uma.',
    },
    {
      id: 'junior-t3-e05-b02',
      dificuldade: 2,
      sintoma: 'O cliente VIP deveria ter 20% de desconto, mas paga o preço cheio: `200.0`.',
      codigo: `abstract class Cliente {
    double desconto() { return 0; }

    double pagar(double valor) {
        return valor * (1 - desconto());
    }
}

class ClienteVip extends Cliente {
    double descontos() { return 0.2; }
}

public class Loja {
    public static void main(String[] args) {
        Cliente c = new ClienteVip();
        System.out.println(c.pagar(200));
    }
}`,
      linha: 10,
      efeito: { tipo: 'saida', saida: '200.0' },
      correcao: `abstract class Cliente {
    abstract double desconto();

    double pagar(double valor) {
        return valor * (1 - desconto());
    }
}

class ClienteVip extends Cliente {
    double desconto() { return 0.2; }
}

public class Loja {
    public static void main(String[] args) {
        Cliente c = new ClienteVip();
        System.out.println(c.pagar(200));
    }
}`,
      saidaCorrigida: '160.0',
      dica: 'O `pagar` chama qual método? A subclasse sobrescreve esse mesmo método?',
      explicacao: '`descontos()` é um método novo, e `pagar` continua usando o `desconto()` padrão, que devolve 0. Com `desconto()` abstrato na superclasse, o engano de nome vira erro de compilação em vez de um desconto que some em silêncio.',
    },
    {
      id: 'junior-t3-e05-b03',
      dificuldade: 3,
      sintoma: 'Gerar o relatório de vendas derruba o programa com `StackOverflowError`.',
      codigo: `abstract class Relatorio {
    String gerar() {
        return "[" + corpo() + "]";
    }

    abstract String corpo();
}

class Vendas extends Relatorio {
    String corpo() {
        return gerar().toUpperCase();
    }
}

public class Sistema {
    public static void main(String[] args) {
        System.out.println(new Vendas().gerar());
    }
}`,
      linha: 11,
      efeito: { tipo: 'excecao', nome: 'StackOverflowError' },
      correcao: `abstract class Relatorio {
    String gerar() {
        return "[" + corpo() + "]";
    }

    abstract String corpo();
}

class Vendas extends Relatorio {
    String corpo() {
        return "vendas".toUpperCase();
    }
}

public class Sistema {
    public static void main(String[] args) {
        System.out.println(new Vendas().gerar());
    }
}`,
      saidaCorrigida: '[VENDAS]',
      dica: 'Siga as chamadas: `gerar` chama `corpo`, e `corpo` chama...?',
      explicacao: 'No Template Method, o roteiro (`gerar`) chama o passo (`corpo`). Se o passo chamar o roteiro de volta, as duas chamadas se alternam até estourar a pilha. O passo deve produzir só a sua parte, sem chamar o método que o chamou.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t3-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que não se pode fazer com uma classe abstrata?',
      opcoes: [
        'Criar um objeto dela com `new`',
        'Declarar uma variável do tipo dela',
        'Escrever construtores nela',
        'Escrever métodos com corpo nela',
      ],
      resposta: 0,
      explicacao: 'Ela pode ter tudo o que uma classe comum tem, e ser usada como tipo. Só não pode ser instanciada diretamente: os objetos são sempre de subclasses concretas.',
      dica: 'Variável do tipo abstrato pode; objeto do tipo abstrato, não.',
    },
    {
      id: 'junior-t3-e05-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `abstract class Bebida {
    String servir() {
        return "servindo " + nome() + " a " + temperatura() + " graus";
    }

    abstract String nome();
    abstract int temperatura();
}

class Cafe extends Bebida {
    String nome() { return "café"; }
    int temperatura() { return 70; }
}

Bebida b = new Cafe();
System.out.println(b.servir());`,
      resposta: 'servindo café a 70 graus',
      explicacao: 'O método concreto da classe abstrata chama os abstratos, e o polimorfismo executa as versões de `Cafe`.',
      dica: '`servir` é concreto e chama os dois métodos que `Cafe` implementa.',
    },
    {
      id: 'junior-t3-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `abstract class Conta {
    abstract double taxa();
    abstract String tipo();
}

class ContaCorrente extends Conta {
    double taxa() {
        return 12.5;
    }
}`,
      opcoes: [
        'Não compila: `ContaCorrente` não implementa `tipo()`',
        'Compila, e `tipo()` devolve `null`',
        'Compila, porque basta implementar um método abstrato',
        'Não compila: classes abstratas não podem ter dois métodos abstratos',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Uma classe concreta precisa implementar todos os métodos abstratos que herdou. A alternativa seria declarar `ContaCorrente` como `abstract`.',
      dica: 'A primeira classe concreta precisa implementar quantos dos métodos abstratos?',
    },
    {
      id: 'junior-t3-e05-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`abstract class A { }`',
        '`abstract class B { abstract void f(); void g() { } }`',
        '`class C { abstract void f(); }`',
        '`abstract class D { D() { } static void s() { } }`',
        '`abstract class E { abstract void f() { } }`',
      ],
      respostas: [0, 1, 3],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Classes abstratas podem ser vazias e ter construtores e métodos `static`. Um método abstrato exige uma classe abstrata e não pode ter corpo, nem vazio.',
      dica: 'Método abstrato só em classe abstrata e sem corpo; o resto é livre.',
    },
    {
      id: 'junior-t3-e05-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado?',
      codigo: `abstract class Animal {
    String nome = "animal";
}

Animal a = new Animal();
System.out.println(a.nome);`,
      opcoes: ['Não compila', 'Imprime `animal`', 'Imprime `null`', 'Lança `InstantiationError`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Mesmo sem nenhum método abstrato, uma classe `abstract` não pode ser instanciada. Uma subclasse, ainda que vazia, poderia.',
      dica: 'Existe `new` de classe abstrata?',
    },
    {
      id: 'junior-t3-e05-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a declaração da classe. O programa deve imprimir `fiu`.',
      codigo: `___ class Instrumento {
    abstract String tocar();
}

class Flauta extends Instrumento {
    String tocar() {
        return "fiu";
    }
}

public class Musica {
    public static void main(String[] args) {
        Instrumento i = new Flauta();
        System.out.println(i.tocar());
    }
}`,
      respostas: ['abstract'],
      saida: 'fiu',
      explicacao: 'Uma classe com método abstrato precisa ser declarada `abstract`. A variável do tipo abstrato aponta para um objeto concreto, a flauta.',
      dica: 'Uma classe com método abstrato precisa de qual modificador?',
    },
    {
      id: 'junior-t3-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `abstract class Pagamento {
    protected double valor;

    abstract double taxa();

    private abstract void validar();

    double total() {
        return valor + taxa();
    }
}`,
      resposta: 6,
      explicacao: 'Um método `private` não é visível para as subclasses, que nunca poderiam implementá-lo. `abstract` e `private` são uma combinação proibida.',
      dica: 'Um método abstrato que a subclasse não enxerga poderia ser implementado?',
    },
    {
      id: 'junior-t3-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `abstract class Base {
    Base() {
        System.out.println("criando " + nome());
    }

    abstract String nome();
}

class Concreta extends Base {
    private String nome = "concreta";

    String nome() {
        return nome;
    }
}

new Concreta();`,
      opcoes: ['`criando null`', '`criando concreta`', 'Lança `AbstractMethodError`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O construtor da classe abstrata roda antes dos inicializadores da subclasse, mas a chamada já vai para a versão de `Concreta`, que lê o campo ainda com `null`.',
      dica: 'O construtor de `Base` roda antes do inicializador do campo `nome` de `Concreta`.',
    },
    {
      id: 'junior-t3-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `abstract class A {
    abstract String f();
    String g() { return "A.g"; }
}

abstract class B extends A {
    String f() { return "B.f"; }
    abstract String h();
}

class C extends B {
    String h() { return "C.h"; }
    String g() { return "C.g"; }
}

A x = new C();
B y = new C();
System.out.println(x.f() + " " + x.g() + " " + y.h());`,
      opcoes: ['`B.f C.g C.h`', '`B.f A.g C.h`', 'Não compila: `C` não implementa `f()`', '`A.f C.g C.h`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`B` implementou `f()` e deixou `h()` para `C`, que ainda sobrescreveu `g()`. `C` é concreta porque, somando a herança, todos os abstratos têm implementação.',
      dica: '`B` implementa `f`, `C` implementa `h` e sobrescreve `g`.',
    },
    {
      id: 'junior-t3-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `abstract class Regras {
    final abstract boolean valida(String s);
}`,
      opcoes: ['Não compila', 'Compila', 'Compila, mas nenhuma subclasse pode existir', 'Compila com um aviso'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: '`final` proíbe sobrescrever, e um método abstrato só existe para ser sobrescrito. A combinação é contraditória.',
      dica: '`final` impede a sobrescrita; `abstract` exige.',
    },
    {
      id: 'junior-t3-e05-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais modificadores não podem acompanhar `abstract` na declaração de um método? Escolha três.',
      opcoes: ['`private`', '`final`', '`static`', '`protected`', '`public`'],
      respostas: [0, 1, 2],
      explicacao: 'Os três impedem a sobrescrita: `private` esconde o método, `final` a proíbe e `static` não participa dela. `protected` e `public` são comuns em métodos abstratos.',
      dica: 'Quais modificadores impedem ou dispensam a sobrescrita?',
    },
    {
      id: 'junior-t3-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `abstract class Saudacao {
    abstract String texto();

    String gritar() {
        return texto().toUpperCase() + "!";
    }
}

Saudacao s = new Saudacao() {
    String texto() {
        return "olá";
    }
};
System.out.println(s.gritar());`,
      opcoes: ['`OLÁ!`', '`olá!`', 'Não compila: classes abstratas não podem ser instanciadas', '`OLÁ`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `new Saudacao() { ... }` não instancia a classe abstrata: cria uma subclasse anônima concreta, que implementa `texto()`.',
      dica: 'A anônima implementa `texto()`; `gritar` faz o resto.',
    },
    {
      id: 'junior-t3-e05-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Uma classe abstrata pode declarar construtores?',
      opcoes: [
        'Sim, e eles rodam quando uma subclasse chama `super(...)`',
        'Não, porque ela não pode ser instanciada',
        'Sim, mas só `private`',
        'Só se não tiver nenhum método abstrato',
      ],
      resposta: 0,
      explicacao: 'O construtor inicializa a parte comum do objeto, que existe em toda subclasse. Ele nunca é chamado com `new` diretamente, só pela cadeia de construtores.',
      dica: 'A parte comum do objeto precisa ser inicializada por alguém.',
    },
    {
      id: 'junior-t3-e05-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Base {
    String f() { return "base"; }
}

abstract class Meio extends Base {
    abstract String f();
}

class Fim extends Meio {
    String f() { return "fim"; }
}

Base b = new Fim();
System.out.println(b.f());`,
      opcoes: ['`fim`', '`base`', 'Não compila: um método abstrato não pode sobrescrever um concreto', 'Lança `AbstractMethodError`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'É permitido "reabstrair" um método: `Meio` declara `f()` abstrato de novo, obrigando as subclasses concretas a escrever a sua versão. `Fim` implementa, e é ela que roda.',
      dica: 'Um método abstrato pode redeclarar um concreto; `Fim` implementa de novo.',
    },
    {
      id: 'junior-t3-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que acontece se um bytecode gerado por outra ferramenta tentar fazer `new` de uma classe abstrata?',
      opcoes: [
        'A JVM lança `InstantiationError`',
        'O objeto é criado, com os métodos abstratos vazios',
        'O objeto é criado, e chamar um método abstrato devolve `null`',
        'Nada: a proteção existe só no compilador',
      ],
      resposta: 0,
      explicacao: 'A classe tem a flag `ACC_ABSTRACT`, que a JVM também confere. A proteção não depende de o código ter passado pelo `javac`.',
      dica: 'A JVM também confere a proibição, com um erro próprio.',
    },
  ],
};

export default episodio;
