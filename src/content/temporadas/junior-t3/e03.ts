import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t3-e03',
  minutos: 13,
  aula,
  armadilhas: [
    'O tipo da referência decide, na compilação, quais métodos podem ser chamados.',
    'O tipo do objeto decide, na execução, qual versão de um método de instância roda.',
    'Pela referência da superclasse, um método que só existe na subclasse não compila.',
    'Campos não são polimórficos: `p.nome` usa o tipo da variável `p`.',
    'Métodos `static` também seguem a referência, não o objeto.',
    'Um método sobrescrito chamado no construtor da superclasse roda antes da inicialização dos campos da subclasse.',
    'Superclasse não vira subclasse sem cast: `Carro c = veiculo;` não compila.',
    'Sobrecarga é decidida pela referência; sobrescrita, pelo objeto. As duas podem se combinar na mesma chamada.',
  ],
  ia: {
    uso:
      'A IA ajuda a trocar cadeias de `if` por tipo por métodos sobrescritos e a prever qual versão roda numa chamada. Use-a para explicar uma saída que surpreendeu, pedindo que separe o que o compilador decide e o que a JVM decide.',
    pedido:
      'Explique a saída deste programa Java 21, linha a linha.\n<cole o código aqui>\n- Para cada chamada, diga o tipo da referência e o tipo do objeto.\n- Diga se o membro chamado é método de instância, campo ou static, e qual dos dois tipos o escolhe.\n- Aponte construtores que chamam métodos sobrescrevíveis.',
    erros: [
      'Gera cadeias de `instanceof` onde um método sobrescrito resolveria.',
      'Afirma que campos também são polimórficos.',
      'Chama um método sobrescrevível dentro do construtor da superclasse.',
    ],
    conferir: [
      'Rode o programa e compare com a explicação.',
      'Troque o tipo da variável para o da subclasse e veja o que muda na compilação e na saída.',
      'No depurador, confira o tipo do objeto no painel Variables.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Polymorphism',
      url: 'https://dev.java/learn/language/oop/inheritance/polymorphism/',
      tipo: 'documentacao',
      porque: 'O despacho dinâmico de métodos e o esconderijo de campos, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Hiding Fields',
      url: 'https://docs.oracle.com/javase/tutorial/java/IandI/hidevariables.html',
      tipo: 'documentacao',
      porque: 'Por que esconder campos é permitido e por que não é recomendado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.12.4.4: Locate Method to Invoke',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.12.4.4',
      tipo: 'documentacao',
      porque: 'O passo da execução em que a JVM procura o método a partir da classe real do objeto.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Polymorphism in Java',
      url: 'https://www.baeldung.com/java-polymorphism',
      tipo: 'artigo',
      porque: 'Polimorfismo estático e dinâmico, com exemplos de cada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 40, Herança e Polimorfismo',
      url: 'https://www.youtube.com/watch?v=pMPlngyWHLM',
      tipo: 'video',
      porque: 'Polimorfismo com uma hierarquia de exemplo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Java Polymorphism Fully Explained In 7 Minutes',
      url: 'https://www.youtube.com/watch?v=jhDUxynEQRI',
      tipo: 'video',
      porque: 'Referência da superclasse, objeto da subclasse e o que cada um decide.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Logan Smith: Two Ways To Do Dynamic Dispatch',
      url: 'https://www.youtube.com/watch?v=wU8hQvU8aKM',
      tipo: 'video',
      porque: 'Como as linguagens implementam a chamada virtual, das vtables aos ponteiros gordos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Aleksey Shipilëv: The Black Magic of (Java) Method Dispatch',
      url: 'https://shipilev.net/blog/2015/black-magic-method-dispatch/',
      tipo: 'artigo',
      porque: 'Chamadas monomórficas, bimórficas e megamórficas medidas na HotSpot.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'O exemplo do construtor que chama um método sobrescrito e imprime `null`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Item 19, "Design and document for inheritance or else prohibit it"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A distinção entre objeto e referência, base de todas as questões de polimorfismo.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Understanding Polymorphism", partes "Object vs. Reference", "Polymorphism and Method Overriding" e "Overriding vs. Hiding Members"',
    },
  ],
  desafio: {
    titulo: 'Folha de pagamento',
    enunciado:
      'Crie `Funcionario`, com nome e valor base, `salario()` (que devolve a base) e `linha()`, que monta o texto com o nome, o nome simples da classe e o salário. Crie `Horista`, cujo salário é a base vezes as horas, e `Vendedor`, cujo salário é o da superclasse mais 5% das vendas. Rode com:\n\n```java\nFuncionario[] equipe = {\n    new Funcionario("Ana", 4000),\n    new Horista("Bia", 50, 120),\n    new Vendedor("Caio", 2000, 30000)\n};\ndouble total = 0;\nfor (Funcionario f : equipe) {\n    System.out.println(f.linha());\n    total += f.salario();\n}\nSystem.out.println("Total: " + total);\n```\n\nSaída esperada:\n\n```text\nAna (Funcionario): 4000.0\nBia (Horista): 6000.0\nCaio (Vendedor): 3500.0\nTotal: 13500.0\n```',
    dicas: [
      '`linha()` fica só em `Funcionario` e chama `salario()`, que cada subclasse sobrescreve.',
      'Em `Vendedor`, `super.salario()` devolve a base.',
      'O laço trata todos como `Funcionario` e nunca precisa saber o tipo real.',
    ],
    solucao: `class Funcionario {
    final String nome;
    final double base;

    Funcionario(String nome, double base) {
        this.nome = nome;
        this.base = base;
    }

    double salario() {
        return base;
    }

    String linha() {
        return nome + " (" + getClass().getSimpleName() + "): " + salario();
    }
}

class Horista extends Funcionario {
    final int horas;

    Horista(String nome, double valorHora, int horas) {
        super(nome, valorHora);
        this.horas = horas;
    }

    @Override
    double salario() {
        return base * horas;
    }
}

class Vendedor extends Funcionario {
    final double vendas;

    Vendedor(String nome, double base, double vendas) {
        super(nome, base);
        this.vendas = vendas;
    }

    @Override
    double salario() {
        return super.salario() + vendas * 0.05;
    }
}

public class Folha {
    public static void main(String[] args) {
        Funcionario[] equipe = {
            new Funcionario("Ana", 4000),
            new Horista("Bia", 50, 120),
            new Vendedor("Caio", 2000, 30000)
        };
        double total = 0;
        for (Funcionario f : equipe) {
            System.out.println(f.linha());
            total += f.salario();
        }
        System.out.println("Total: " + total);
    }
}`,
    saida: 'Ana (Funcionario): 4000.0\nBia (Horista): 6000.0\nCaio (Vendedor): 3500.0\nTotal: 13500.0',
    comentarios:
      'O laço e o método `linha()` são escritos uma vez e funcionam para qualquer tipo de funcionário, inclusive os que ainda não existem. Um estagiário com bolsa fixa seria só mais uma subclasse, sem tocar no código da folha. É o princípio aberto/fechado: aberto para extensão, fechado para modificação.',
  },
  bugs: [
    {
      id: 'junior-t3-e03-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: cannot find symbol`, apontando `buscar()` numa variável do tipo `Animal`.',
      codigo: `class Animal {
    String som() { return "..."; }
}

class Cachorro extends Animal {
    @Override String som() { return "au"; }
    String buscar() { return "bolinha"; }
}

public class Parque {
    public static void main(String[] args) {
        Animal rex = new Cachorro();
        System.out.println(rex.som() + " " + rex.buscar());
    }
}`,
      linha: 13,
      efeito: { tipo: 'naoCompila' },
      correcao: `class Animal {
    String som() { return "..."; }
}

class Cachorro extends Animal {
    @Override String som() { return "au"; }
    String buscar() { return "bolinha"; }
}

public class Parque {
    public static void main(String[] args) {
        Animal rex = new Cachorro();
        System.out.println(rex.som() + " " + ((Cachorro) rex).buscar());
    }
}`,
      saidaCorrigida: 'au bolinha',
      dica: 'O compilador decide o que pode ser chamado olhando o objeto ou a variável?',
      explicacao: 'O compilador só enxerga os membros do tipo da referência, e `Animal` não tem `buscar`. O cast `((Cachorro) rex)` muda o tipo da referência para a chamada; melhor ainda, quando o código sempre precisa do cachorro, declare a variável como `Cachorro`.',
    },
    {
      id: 'junior-t3-e03-b02',
      dificuldade: 2,
      sintoma: 'O frete expresso deveria custar 30, mas o total mostra o frete comum: `110.0`.',
      codigo: `class Frete {
    static double valor() { return 10; }
}

class FreteExpresso extends Frete {
    static double valor() { return 30; }
}

public class Pedido {
    static double total(Frete f, double itens) {
        return itens + f.valor();
    }

    public static void main(String[] args) {
        System.out.println(total(new FreteExpresso(), 100));
    }
}`,
      linha: 2,
      efeito: { tipo: 'saida', saida: '110.0' },
      correcao: `class Frete {
    double valor() { return 10; }
}

class FreteExpresso extends Frete {
    double valor() { return 30; }
}

public class Pedido {
    static double total(Frete f, double itens) {
        return itens + f.valor();
    }

    public static void main(String[] args) {
        System.out.println(total(new FreteExpresso(), 100));
    }
}`,
      saidaCorrigida: '130.0',
      dica: 'Métodos `static` seguem o objeto ou o tipo declarado da variável?',
      explicacao: 'Métodos `static` não são polimórficos: `f.valor()` vira `Frete.valor()` na compilação, pelo tipo do parâmetro. Para cada frete calcular o seu valor, `valor` precisa ser um método de instância sobrescrito.',
    },
    {
      id: 'junior-t3-e03-b03',
      dificuldade: 3,
      sintoma: 'O programa lança `ArrayStoreException: Retangulo` ao guardar um retângulo num array de `Forma`.',
      codigo: `class Forma { }

class Circulo extends Forma { }

class Retangulo extends Forma { }

public class Desenho {
    public static void main(String[] args) {
        Forma[] formas = new Circulo[2];
        formas[0] = new Circulo();
        formas[1] = new Retangulo();
        System.out.println(formas.length + " formas");
    }
}`,
      linha: 9,
      efeito: { tipo: 'excecao', nome: 'ArrayStoreException' },
      correcao: `class Forma { }

class Circulo extends Forma { }

class Retangulo extends Forma { }

public class Desenho {
    public static void main(String[] args) {
        Forma[] formas = new Forma[2];
        formas[0] = new Circulo();
        formas[1] = new Retangulo();
        System.out.println(formas.length + " formas");
    }
}`,
      saidaCorrigida: '2 formas',
      dica: 'A variável é `Forma[]`. E o array criado no heap, de que tipo é?',
      explicacao: 'Arrays em Java são covariantes: um `Circulo[]` pode ser apontado por uma variável `Forma[]`. Mas o array guarda o próprio tipo e confere cada gravação na execução, e um `Retangulo` não cabe num array de círculos. Crie o array com o tipo que deve aceitar.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t3-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em `Animal a = new Cachorro();`, com `som()` sobrescrito em `Cachorro`, qual versão `a.som()` executa?',
      opcoes: [
        'A de `Cachorro`, escolhida na execução pelo objeto real',
        'A de `Animal`, porque a variável é `Animal`',
        'As duas, em sequência',
        'Depende da ordem em que as classes foram declaradas',
      ],
      resposta: 0,
      explicacao: 'A referência permite a chamada, porque `Animal` declara `som()`. Na execução, a JVM consulta a classe real do objeto e encontra a versão de `Cachorro`.',
      dica: 'Método de instância sobrescrito: quem decide é o objeto real.',
    },
    {
      id: 'junior-t3-e03-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `class Instrumento {
    String tocar() { return "?"; }
}

class Violao extends Instrumento {
    @Override String tocar() { return "dlim"; }
}

class Bateria extends Instrumento {
    @Override String tocar() { return "tum"; }
}

Instrumento[] banda = {new Violao(), new Bateria(), new Instrumento(), new Violao()};
String som = "";
for (Instrumento i : banda) som += i.tocar() + " ";
System.out.println(som.trim());`,
      resposta: 'dlim tum ? dlim',
      explicacao: 'O array é de `Instrumento`, mas cada posição guarda um objeto diferente, e cada um executa a sua versão de `tocar()`.',
      dica: 'Cada objeto do array toca a sua versão; o `Instrumento` puro usa a da superclasse.',
    },
    {
      id: 'junior-t3-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `class Conta {
    double saldo() { return 100; }
}

class ContaInvestimento extends Conta {
    double rendimento() { return 5; }
}

Conta c = new ContaInvestimento();
System.out.println(c.saldo());
System.out.println(c.rendimento());`,
      opcoes: ['Não compila', 'Imprime `100.0` e `5.0`', 'Imprime `100.0` e lança exceção', 'Imprime `100.0` e `0.0`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 11 },
      explicacao: 'O objeto tem `rendimento()`, mas a variável é `Conta`, e o compilador só aceita os métodos que `Conta` declara.',
      dica: 'Pela variável `Conta`, o compilador enxerga `rendimento()`?',
    },
    {
      id: 'junior-t3-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class A {
    int x = 1;
    int getX() { return x; }
}

class B extends A {
    int x = 2;
    @Override int getX() { return x; }
}

A a = new B();
B b = new B();
System.out.println(a.x + " " + a.getX() + " " + b.x + " " + ((A) b).x);`,
      opcoes: ['`1 2 2 1`', '`2 2 2 2`', '`1 1 2 1`', '`1 2 2 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Campos seguem a referência: por `A`, o `x` de `A` (1); por `B`, o de `B` (2). O método sobrescrito segue o objeto, um `B` nos dois casos.',
      dica: 'Campo segue a referência; método sobrescrito segue o objeto. O cast muda só a referência.',
    },
    {
      id: 'junior-t3-e03-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Dado `Forma f = new Circulo();`, em que `Circulo` sobrescreve `area()` e declara o campo `raio`, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Por `f`, só se chamam métodos declarados em `Forma`',
        '`f.area()` executa a versão de `Circulo`',
        '`f.raio` compila, porque o objeto tem esse campo',
        '`f.area()` executa sempre a versão de `Forma`',
        'O objeto é convertido em `Forma` e perde os dados de `Circulo`',
      ],
      respostas: [0, 1],
      explicacao: 'O objeto continua sendo um `Circulo` completo; só a "visão" pela variável é limitada. O compilador não deixa usar `raio` por uma referência `Forma`.',
      dica: 'Separe o que o compilador deixa usar do que roda na execução.',
    },
    {
      id: 'junior-t3-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o tipo do parâmetro para que o método aceite qualquer animal. O programa deve imprimir `miau muu`.',
      codigo: `class Animal {
    String som() { return "..."; }
}

class Gato extends Animal {
    @Override String som() { return "miau"; }
}

class Vaca extends Animal {
    @Override String som() { return "muu"; }
}

public class Fazenda {
    static String ouvir(___ a) {
        return a.som();
    }

    public static void main(String[] args) {
        System.out.println(ouvir(new Gato()) + " " + ouvir(new Vaca()));
    }
}`,
      respostas: ['Animal'],
      saida: 'miau muu',
      explicacao: 'Com o parâmetro do tipo da superclasse, o método aceita qualquer subclasse, e cada objeto responde com a sua versão. `Object` aceitaria os objetos, mas não deixaria chamar `som()`.',
      dica: 'Use o tipo mais geral que tem `som()`.',
    },
    {
      id: 'junior-t3-e03-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `class Veiculo {
}

class Carro extends Veiculo {
}

public class Garagem {
    public static void main(String[] args) {
        Veiculo v = new Carro();
        Carro c = new Carro();
        Veiculo w = c;
        Carro d = v;
    }
}`,
      resposta: 12,
      explicacao: 'Todo `Carro` é um `Veiculo`, então guardar um carro numa variável `Veiculo` é automático. O contrário não: o compilador não sabe que `v` aponta para um carro, e exige um cast.',
      dica: 'Atribuir um tipo mais geral a um mais específico sem cast compila?',
    },
    {
      id: 'junior-t3-e03-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Base {
    Base() {
        mostrar();
    }

    void mostrar() {
        System.out.println("base");
    }
}

class Sub extends Base {
    String msg = "sub";

    @Override
    void mostrar() {
        System.out.println(msg);
    }
}

new Sub();`,
      opcoes: ['`null`', '`sub`', '`base`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O construtor de `Base` roda antes dos inicializadores de `Sub`, mas o objeto já é um `Sub`: a chamada vai para a versão sobrescrita, que lê `msg` ainda com o valor padrão. Imprimir `null` não lança exceção.',
      dica: 'O construtor de `Base` roda antes do inicializador de `msg`.',
    },
    {
      id: 'junior-t3-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Funcionario {
    double bonus() { return 100; }
}

class Gerente extends Funcionario {
    @Override double bonus() { return super.bonus() * 3; }
}

class Diretor extends Gerente {
    @Override double bonus() { return super.bonus() + 1000; }
}

Funcionario f = new Diretor();
System.out.println(f.bonus());`,
      opcoes: ['`1300.0`', '`1100.0`', '`100.0`', '`3300.0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O objeto é um `Diretor`, cuja versão chama a de `Gerente` (300) e soma 1000. Cada `super` sobe exatamente um nível.',
      dica: 'Siga a cadeia de `super.bonus()`: Diretor chama Gerente, que chama Funcionario.',
    },
    {
      id: 'junior-t3-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class A {
    static String tipo() { return "A"; }
    String nome() { return "a"; }
}

class B extends A {
    static String tipo() { return "B"; }
    @Override String nome() { return "b"; }
}

A[] v = {new A(), new B()};
String r = "";
for (A x : v) r += x.tipo() + x.nome();
System.out.println(r);`,
      opcoes: ['`AaAb`', '`AaBb`', '`AaAa`', '`BbBb`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`x` é declarada `A`, e o método `static` é escolhido por ela, nos dois casos. O método de instância segue cada objeto.',
      dica: '`tipo()` é `static`, escolhido pela referência `A`; `nome()` segue o objeto.',
    },
    {
      id: 'junior-t3-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a vantagem de declarar um parâmetro como `Forma` em vez de `Circulo`?',
      opcoes: [
        'O método passa a aceitar qualquer subclasse de `Forma`, inclusive as criadas no futuro',
        'O método fica mais rápido',
        'O objeto recebido perde os métodos de `Circulo` para economizar memória',
        'Nenhuma: as duas formas são equivalentes',
      ],
      resposta: 0,
      explicacao: 'Programar para o tipo mais geral que oferece o que o método precisa deixa o código aberto a extensões, sem alterações.',
      dica: 'Pense no que acontece quando surgir uma forma nova.',
    },
    {
      id: 'junior-t3-e03-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Pagamento {
    double taxa(double valor) { return 0; }
}

class Cartao extends Pagamento {
    @Override double taxa(double valor) { return valor * 0.03; }
}

class Boleto extends Pagamento {
    @Override double taxa(double valor) { return 2.5; }
}

public class Caixa {
    static double total(Pagamento p, double valor) {
        return valor + p.taxa(valor);
    }

    public static void main(String[] args) {
        System.out.println(total(new Cartao(), 200) + " " + total(new Boleto(), 200) + " " + total(new Pagamento(), 200));
    }
}`,
      resposta: '206.0 202.5 200.0',
      explicacao: '`total` recebe um `Pagamento` e chama `taxa`, que cada objeto implementa do seu jeito: 3% no cartão, 2,50 fixos no boleto e nada no pagamento comum.',
      dica: 'Cartão cobra 3% de 200; boleto, 2,5 fixos; a forma base, zero.',
    },
    {
      id: 'junior-t3-e03-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'O que é decidido pelo tipo da **referência**, e não pelo tipo do objeto? Escolha três.',
      opcoes: [
        'Qual campo é lido quando há campos de mesmo nome',
        'Qual método `static` é chamado',
        'Quais métodos podem ser chamados',
        'Qual versão de um método de instância sobrescrito roda',
        'O resultado de `getClass()`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Tudo o que é resolvido na compilação depende da referência. Só a escolha do método de instância sobrescrito, e o que depende do objeto em si, como `getClass()`, é decidido na execução.',
      dica: 'O que é resolvido na compilação, olhando a variável?',
    },
    {
      id: 'junior-t3-e03-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Pai {
    String f(Object o) { return "Pai.Object"; }
}

class Filho extends Pai {
    @Override String f(Object o) { return "Filho.Object"; }
    String f(String s) { return "Filho.String"; }
}

Pai p = new Filho();
System.out.println(p.f("x"));`,
      opcoes: ['`Filho.Object`', '`Filho.String`', '`Pai.Object`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'São dois passos. Na compilação, pela referência `Pai`, a única assinatura é `f(Object)`. Na execução, o objeto é um `Filho`, que sobrescreve `f(Object)`. A sobrecarga com `String` nem é considerada.',
      dica: 'A sobrecarga é escolhida pelo tipo declarado `Pai`, que só tem `f(Object)`; depois, a sobrescrita segue o objeto.',
    },
    {
      id: 'junior-t3-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num ponto do código em que, na prática, só objetos `Circulo` passam por `f.area()`, o que o JIT da HotSpot costuma fazer?',
      opcoes: [
        'Trata a chamada como monomórfica: confere o tipo e executa o código de `Circulo.area()` embutido',
        'Consulta a tabela virtual em toda chamada, sem exceção',
        'Converte o método em `static`',
        'Nada: chamadas virtuais não podem ser otimizadas',
      ],
      resposta: 0,
      explicacao: 'O JIT registra os tipos vistos em cada chamada. Com um só, gera uma checagem barata seguida do método embutido (*inlining*). Se outro tipo aparecer depois, a otimização é desfeita.',
      dica: 'Só um tipo passa por aquele ponto: o JIT pode apostar nele.',
    },
  ],
};

export default episodio;
