import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t5-e03',
  minutos: 12,
  aula,
  armadilhas: [
    'Toda subclasse direta de uma classe selada precisa ser `final`, `sealed` ou `non-sealed`.',
    'Records e enums são implicitamente `final` e podem implementar uma interface selada sem modificador extra.',
    'Uma classe fora do `permits` não pode estender a classe selada.',
    'Toda classe listada no `permits` precisa estender diretamente a classe selada.',
    'O `permits` só pode ser omitido quando as subclasses estão no mesmo arquivo.',
    'As subclasses permitidas precisam estar no mesmo pacote (ou no mesmo módulo).',
    '`non-sealed` reabre a hierarquia: as subclasses dela não precisam estar no `permits`.',
    'Interfaces não podem ser `final`: uma subinterface de uma interface selada é `sealed` ou `non-sealed`.',
  ],
  recursos: [
    {
      titulo: 'Oracle: Sealed Classes (Java Language Updates)',
      url: 'https://docs.oracle.com/en/java/javase/21/language/sealed-classes-and-interfaces.html',
      tipo: 'documentacao',
      porque: 'O guia oficial, com as regras de `permits`, pacotes e modificadores das subclasses.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 409: Sealed Classes',
      url: 'https://openjdk.org/jeps/409',
      tipo: 'documentacao',
      porque: 'A motivação do recurso e a relação com records e pattern matching.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.1.1.2: sealed, non-sealed, and final Classes',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.1.2',
      tipo: 'documentacao',
      porque: 'As regras formais, inclusive quando o `permits` pode ser omitido.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de Class.getPermittedSubclasses',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Class.html#getPermittedSubclasses()',
      tipo: 'documentacao',
      porque: 'Como a reflexão expõe a lista de subclasses permitidas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Sealed Classes and Interfaces in Java',
      url: 'https://www.baeldung.com/java-sealed-classes-interfaces',
      tipo: 'artigo',
      porque: 'Classes e interfaces seladas com records, e o uso com `instanceof`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Brian Goetz: Data Oriented Programming in Java (InfoQ)',
      url: 'https://www.infoq.com/articles/data-oriented-programming-java/',
      tipo: 'artigo',
      porque: 'O arquiteto da linguagem mostra como records, sealed e pattern matching formam um estilo de programação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'A Arte de Programar: Classes e Interfaces Seladas em Java',
      url: 'https://www.youtube.com/watch?v=Mfl9-iEC46M',
      tipo: 'video',
      porque: 'Como usar classes seladas e por que elas importam, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Dev de olho: Classe Selada, Sealed Class no Java',
      url: 'https://www.youtube.com/watch?v=glY7ili0c9c',
      tipo: 'video',
      porque: '`sealed`, `permits`, `final` e `non-sealed` na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Java: Sealed Classes, JEP Café #2',
      url: 'https://www.youtube.com/watch?v=652kheEraHQ',
      tipo: 'video',
      porque: 'O canal oficial do Java explica as regras e os usos das classes seladas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de regras de classes seladas, cobrada literalmente nas questões.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Sealing Classes"',
    },
  ],
  desafio: {
    titulo: 'Calculadora de expressões',
    enunciado:
      'Crie a interface selada `Expr`, com `int valor()` e `String texto()`, e três records que a implementam: `Num(int n)`, `Soma(Expr a, Expr b)` e `Mult(Expr a, Expr b)`. Cada record calcula o próprio valor e o próprio texto, a soma entre parênteses. Rode com:\n\n```java\nExpr e = new Mult(new Soma(new Num(2), new Num(3)), new Num(4));\nSystem.out.println(e.texto() + " = " + e.valor());\nExpr f = new Soma(new Num(1), new Mult(new Num(2), new Num(5)));\nSystem.out.println(f.texto() + " = " + f.valor());\nSystem.out.println(Expr.class.isSealed() + " " + Expr.class.getPermittedSubclasses().length);\n```\n\nSaída esperada:\n\n```text\n(2 + 3) * 4 = 20\n(1 + 2 * 5) = 11\ntrue 3\n```',
    dicas: [
      'Os records podem ter outros `Expr` como componentes: a expressão vira uma árvore.',
      'O `valor()` de `Soma` é `a.valor() + b.valor()`: a recursão desce a árvore sozinha.',
      'Os métodos implementados da interface precisam ser `public`.',
    ],
    solucao: `sealed interface Expr permits Num, Soma, Mult {
    int valor();

    String texto();
}

record Num(int n) implements Expr {
    public int valor() { return n; }
    public String texto() { return String.valueOf(n); }
}

record Soma(Expr a, Expr b) implements Expr {
    public int valor() { return a.valor() + b.valor(); }
    public String texto() { return "(" + a.texto() + " + " + b.texto() + ")"; }
}

record Mult(Expr a, Expr b) implements Expr {
    public int valor() { return a.valor() * b.valor(); }
    public String texto() { return a.texto() + " * " + b.texto(); }
}

public class Calculadora {
    public static void main(String[] args) {
        Expr e = new Mult(new Soma(new Num(2), new Num(3)), new Num(4));
        System.out.println(e.texto() + " = " + e.valor());
        Expr f = new Soma(new Num(1), new Mult(new Num(2), new Num(5)));
        System.out.println(f.texto() + " = " + f.valor());
        System.out.println(Expr.class.isSealed() + " " + Expr.class.getPermittedSubclasses().length);
    }
}`,
    saida: '(2 + 3) * 4 = 20\n(1 + 2 * 5) = 11\ntrue 3',
    comentarios:
      'É uma árvore sintática, como a que o compilador monta no episódio de compiladores: cada nó sabe se avaliar. Com a interface selada, ninguém de fora acrescenta um tipo de nó que a calculadora não conheça. No episódio 5, a mesma avaliação será escrita de fora dos records, com um `switch` sobre os tipos que o compilador garante ser completo.',
  },
  exercicios: [
    {
      id: 'junior-t5-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que uma classe `sealed` declara?',
      opcoes: [
        'Quais classes podem estendê-la diretamente',
        'Que nenhuma classe pode estendê-la',
        'Que os campos dela não podem ser alterados',
        'Que ela não pode ser instanciada',
      ],
      resposta: 0,
      explicacao: 'É o meio-termo entre uma classe aberta e uma `final`: só as subclasses do `permits` podem estendê-la.',
    },
    {
      id: 'junior-t5-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `sealed class Animal permits Gato, Cao { }
final class Gato extends Animal { }
non-sealed class Cao extends Animal { }
class Labrador extends Cao { }

public class Abrigo {
    public static void main(String[] args) {
        Animal a = new Labrador();
        System.out.println((a instanceof Cao) + " " + (a instanceof Gato) + " " + a.getClass().getSimpleName());
    }
}`,
      resposta: 'true false Labrador',
      explicacao: '`Cao` é `non-sealed`, então `Labrador` pode estendê-lo sem estar no `permits` de `Animal`. Um labrador é um `Cao` e um `Animal`, mas não um `Gato`.',
    },
    {
      id: 'junior-t5-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `sealed interface Forma permits Circulo { }

class Circulo implements Forma { }`,
      opcoes: [
        'Não compila: `Circulo` precisa ser `final`, `sealed` ou `non-sealed`',
        'Compila',
        'Não compila: interfaces não podem ser seladas',
        'Compila, e `Circulo` passa a ser `final` automaticamente',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'A subclasse permitida precisa declarar como a hierarquia continua. Só records e enums dispensam o modificador, por já serem implicitamente `final`.',
    },
    {
      id: 'junior-t5-e03-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`sealed class A permits B { } final class B extends A { }`',
        '`sealed interface I permits R { } record R() implements I { }`',
        '`sealed class A { } final class B extends A { } non-sealed class C extends A { }`',
        '`sealed class A permits B { } class B extends A { }`',
        '`sealed class A permits B { } final class B { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Um record serve como subclasse sem modificador, e no mesmo arquivo o `permits` pode ser omitido. Uma subclasse sem modificador, ou uma classe do `permits` que não estende a selada, não compilam.',
    },
    {
      id: 'junior-t5-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `sealed class Moeda permits Real, Dolar { }
final class Real extends Moeda { }
final class Dolar extends Moeda { }
final class Euro extends Moeda { }`,
      opcoes: [
        'Não compila: `Euro` não está no `permits`',
        'Compila',
        'Compila, e `Euro` é acrescentado ao `permits`',
        'Não compila: classes seladas só podem ter duas subclasses',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: 'Com o `permits` escrito, só as classes listadas podem estender `Moeda`. Para aceitar `Euro`, seria preciso incluí-la na lista.',
    },
    {
      id: 'junior-t5-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a declaração da classe. O programa deve imprimir `true 2`.',
      codigo: `___ class Veiculo permits Carro, Moto { }
final class Carro extends Veiculo { }
final class Moto extends Veiculo { }

public class Frota {
    public static void main(String[] args) {
        System.out.println(Veiculo.class.isSealed() + " " + Veiculo.class.getPermittedSubclasses().length);
    }
}`,
      respostas: ['sealed'],
      saida: 'true 2',
      explicacao: 'O `permits` só é aceito numa classe `sealed`. A reflexão confirma a selagem e as duas subclasses permitidas.',
    },
    {
      id: 'junior-t5-e03-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `sealed class Conta permits Corrente, Poupanca { }
final class Corrente extends Conta { }
non-sealed class Poupanca extends Conta { }
class PoupancaKids extends Poupanca { }
class CorrenteVip extends Corrente { }`,
      resposta: 5,
      explicacao: '`Poupanca` é `non-sealed` e aceita subclasses livremente. `Corrente` é `final`, e nada pode estendê-la.',
    },
    {
      id: 'junior-t5-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `sealed interface Bebida permits Cafe, Suco { double preco(); }
record Cafe(boolean grande) implements Bebida {
    public double preco() { return grande ? 7.5 : 5.0; }
}
record Suco(String fruta) implements Bebida {
    public double preco() { return 8.0; }
}

public class Bar {
    public static void main(String[] args) {
        Bebida[] pedido = {new Cafe(true), new Suco("uva"), new Cafe(false)};
        double total = 0;
        for (Bebida b : pedido) total += b.preco();
        System.out.println(total);
    }
}`,
      opcoes: ['`20.5`', '`23.0`', '`18.0`', 'Não compila: records precisam ser `final`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Records já são `final`, então implementam a interface selada sem modificador. 7,5 + 8 + 5 = 20,5.',
    },
    {
      id: 'junior-t5-e03-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais modificadores tornam válida uma subclasse permitida de uma classe selada? Escolha três.',
      opcoes: ['`final`', '`sealed`', '`non-sealed`', 'Só `abstract`', '`static`'],
      respostas: [0, 1, 2],
      explicacao: 'A subclasse precisa dizer se fecha, continua selando ou reabre a hierarquia. `abstract` pode acompanhar `sealed` ou `non-sealed`, mas sozinho não basta.',
    },
    {
      id: 'junior-t5-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `sealed class Forma permits Circulo, Quadrado { }
final class Circulo extends Forma { }
final class Quadrado { }`,
      opcoes: [
        'Não compila: `Quadrado` está no `permits` mas não estende `Forma`',
        'Compila',
        'Compila, e `Quadrado` passa a estender `Forma`',
        'Não compila: `Circulo` precisa ser `sealed`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 1 },
      explicacao: 'O `permits` precisa listar subclasses diretas de verdade. O erro aparece na própria cláusula `permits`, que fica inválida.',
    },
    {
      id: 'junior-t5-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quando a cláusula `permits` pode ser omitida?',
      opcoes: [
        'Quando todas as subclasses estão no mesmo arquivo da classe selada',
        'Sempre: o compilador procura as subclasses no projeto inteiro',
        'Nunca',
        'Quando a classe selada é abstrata',
      ],
      resposta: 0,
      explicacao: 'No mesmo arquivo, o compilador conhece todas as subclasses e as considera permitidas. Em arquivos separados, a lista precisa ser explícita.',
    },
    {
      id: 'junior-t5-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `sealed interface Status permits Ativo, Inativo, Pendente { }
record Ativo() implements Status { }
record Inativo(String motivo) implements Status { }
enum Pendente implements Status { ANALISE, DOCUMENTOS }

public class Cadastro {
    public static void main(String[] args) {
        Status s = Pendente.DOCUMENTOS;
        System.out.println(Status.class.getPermittedSubclasses().length + " " + (s instanceof Pendente) + " " + new Inativo("férias"));
    }
}`,
      opcoes: [
        '`3 true Inativo[motivo=férias]`',
        '`2 true Inativo[motivo=férias]`',
        'Não compila: enums não podem implementar interfaces seladas',
        '`3 false Inativo[motivo=férias]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Records e enums servem como implementações de uma interface selada. São três tipos permitidos, e a constante `DOCUMENTOS` é um `Pendente`.',
    },
    {
      id: 'junior-t5-e03-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais tipos podem implementar diretamente uma interface selada sem escrever `final`, `sealed` ou `non-sealed`? Escolha duas.',
      opcoes: ['Records', 'Enums', 'Classes comuns', 'Interfaces', 'Classes abstratas'],
      respostas: [0, 1],
      explicacao: 'Records são sempre `final`, e enums são `final` (ou selados, quando têm constantes com corpo). Classes e interfaces precisam declarar o modificador.',
    },
    {
      id: 'junior-t5-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `sealed class Pessoa permits Cliente, Funcionario { }
final class Cliente extends Pessoa { }
non-sealed class Funcionario extends Pessoa { }
class Gerente extends Funcionario { }
class Diretor extends Gerente { }

public class Empresa {
    public static void main(String[] args) {
        Pessoa p = new Diretor();
        System.out.println((p instanceof Funcionario) + " " + (p instanceof Gerente) + " " + (p instanceof Cliente));
    }
}`,
      opcoes: ['`true true false`', '`true false false`', 'Não compila: `Diretor` não está no `permits`', '`false true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Abaixo de `Funcionario`, que é `non-sealed`, a hierarquia é aberta como qualquer outra. A selagem só restringe os filhos diretos de `Pessoa`.',
    },
    {
      id: 'junior-t5-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que acontece se uma ferramenta gerar bytecode de uma classe que estende uma classe selada sem estar na lista de permitidas?',
      opcoes: [
        'A JVM recusa a carga com `IncompatibleClassChangeError`, consultando o atributo `PermittedSubclasses`',
        'A classe carrega normalmente: a selagem é só do compilador',
        'A JVM acrescenta a classe à lista de permitidas',
        'A classe carrega, mas não pode ser instanciada',
      ],
      resposta: 0,
      explicacao: 'A lista de subclasses permitidas vai para o arquivo `.class`, e a JVM a confere ao carregar cada subclasse. A garantia vale mesmo para código que não passou pelo `javac`.',
    },
  ],
};

export default episodio;
