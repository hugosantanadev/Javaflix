import type { Exercicio } from '../../types';

/** Prova da temporada Júnior T3: herança e polimorfismo. */
const prova: Exercicio[] = [
  {
    id: 'junior-t3-prova-q01',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class A {
    A() { System.out.print("A" + f()); }
    String f() { return "a"; }
}

class B extends A {
    B() { System.out.print("B" + f()); }
    @Override String f() { return "b"; }
}

new B();
System.out.println();`,
    opcoes: ['`AbBb`', '`AaBb`', '`BbAa`', '`AaBa`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O construtor de `A` roda primeiro, mas o objeto já é um `B`: a chamada a `f()` vai para a versão sobrescrita. Depois, o construtor de `B` imprime de novo com a mesma versão.',
  },
  {
    id: 'junior-t3-prova-q02',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais trechos compilam? Escolha três.',
    opcoes: [
      '`class A { Number f() { return 1; } } class B extends A { Integer f() { return 2; } }`',
      '`class A { void g() throws Exception { } } class B extends A { void g() throws RuntimeException { } }`',
      '`class A { public void h() { } } class B extends A { void h() { } }`',
      '`class A { void k() { } } class B extends A { void k() throws Exception { } }`',
      '`class A { private void m() { } } class B extends A { int m() { return 0; } }`',
    ],
    respostas: [0, 1, 4],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Retorno covariante e exceções não verificadas são permitidos. O `m()` de `A` é `private`, então `B` declara um método novo, com o retorno que quiser. Fechar o acesso e acrescentar uma exceção verificada não compilam.',
  },
  {
    id: 'junior-t3-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class P {
    String n = "P";
    static String s() { return "sP"; }
    String i() { return "iP"; }
}

class F extends P {
    String n = "F";
    static String s() { return "sF"; }
    String i() { return "iF"; }
}

P x = new F();
System.out.println(x.n + x.s() + x.i() + ((F) x).n);`,
    opcoes: ['`PsPiFF`', '`FsFiFF`', '`PsFiFF`', '`PsPiPF`', '`FsPiFP`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Campo e método `static` seguem a referência, do tipo `P`. Só o método de instância segue o objeto, um `F`. Com o cast, a referência passa a ser `F`, e o campo lido é o de `F`.',
  },
  {
    id: 'junior-t3-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `class Veiculo { }
class Carro extends Veiculo { }
class Moto extends Veiculo { }

Veiculo[] frota = {new Carro(), new Moto()};
for (Veiculo v : frota) {
    Carro c = (Carro) v;
    System.out.print("carro ");
}`,
    opcoes: [
      'Imprime `carro` e lança `ClassCastException`',
      'Imprime `carro carro`',
      'Não compila',
      'Lança `ClassCastException` sem imprimir nada',
      'Imprime `carro` e para sem erro',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'ClassCastException', saida: 'carro' },
    explicacao: 'O cast compila, porque um `Veiculo` pode ser um `Carro`. O primeiro elemento é carro de fato; o segundo é uma moto, e a JVM recusa o cast na execução.',
  },
  {
    id: 'junior-t3-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `abstract class Forma {
    abstract double area();
    abstract double perimetro();
}

class Quadrado extends Forma {
    double lado = 2;
    double area() { return lado * lado; }
}`,
    opcoes: [
      'Não compila: `Quadrado` não implementa `perimetro()`',
      'Compila',
      'Não compila: classes abstratas não podem ter dois métodos abstratos',
      'Compila, mas `new Quadrado()` lança exceção',
      'Não compila: falta o construtor de `Quadrado`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'A primeira classe concreta precisa implementar todos os métodos abstratos herdados. Bastaria declarar `perimetro()` ou tornar `Quadrado` abstrata.',
  },
  {
    id: 'junior-t3-prova-q06',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `abstract class Jogo {
    final String jogar() {
        return iniciar() + "-" + rodada() + "-" + rodada() + "-" + fim();
    }
    String iniciar() { return "início"; }
    abstract String rodada();
    String fim() { return "fim"; }
}

class Xadrez extends Jogo {
    int lances = 0;
    String rodada() { return "lance" + (++lances); }
    @Override String fim() { return "xeque-mate"; }
}

System.out.println(new Xadrez().jogar());`,
    resposta: 'início-lance1-lance2-xeque-mate',
    explicacao: 'O método `final` da classe abstrata fixa o roteiro. `iniciar` vem da superclasse; `rodada`, implementada em `Xadrez`, roda duas vezes; e `fim` foi sobrescrito.',
  },
  {
    id: 'junior-t3-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class Item {
    String id;
    Item(String id) { this.id = id; }
    @Override public boolean equals(Object o) {
        return o instanceof Item && ((Item) o).id.equals(id);
    }
    @Override public int hashCode() { return id.hashCode(); }
}

Set<Item> s = new HashSet<>();
Item a = new Item("1");
s.add(a);
s.add(new Item("1"));
a.id = "2";
System.out.println(s.size() + " " + s.contains(a) + " " + s.contains(new Item("1")));`,
    opcoes: ['`1 false false`', '`1 true true`', '`2 true false`', '`1 true false`', '`2 false false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O segundo item é duplicata e não entra. Depois, mudar o `id` muda o `hashCode` do objeto que já está no conjunto, guardado no balde do valor antigo. Procurando por "2", o conjunto olha outro balde; procurando por "1", acha o balde certo, mas o objeto não é mais igual. Objetos usados em `HashSet` não devem mudar.',
  },
  {
    id: 'junior-t3-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `class Conta {
    String titular;
    Conta(String titular) { this.titular = titular; }
}

class Poupanca extends Conta {
    double juros;
    Poupanca(double juros) {
        this.juros = juros;
    }
}`,
    opcoes: [
      'Não compila: o `super()` inserido no construtor de `Poupanca` não encontra destino',
      'Compila, e `titular` fica `null`',
      'Não compila: `Poupanca` não pode ter campos',
      'Compila, e o construtor de `Conta` recebe `juros`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila' },
    explicacao: 'Sem `super(...)` explícito, o compilador insere `super()`, e `Conta` não tem construtor sem parâmetros. O construtor de `Poupanca` precisa receber o titular e chamar `super(titular)`.',
  },
  {
    id: 'junior-t3-prova-q09',
    tipo: 'lacuna',
    dificuldade: 1,
    enunciado: 'Complete para reaproveitar a saudação da superclasse. O programa deve imprimir `Olá, boa noite`.',
    codigo: `class Saudacao {
    String texto() {
        return "Olá";
    }
}

class SaudacaoNoturna extends Saudacao {
    @Override
    String texto() {
        return super.___() + ", boa noite";
    }
}

public class Teste {
    public static void main(String[] args) {
        System.out.println(new SaudacaoNoturna().texto());
    }
}`,
    respostas: ['texto'],
    saida: 'Olá, boa noite',
    explicacao: '`super.texto()` chama a versão de `Saudacao`. Sem o `super`, `texto()` chamaria a si mesmo, numa recursão infinita.',
  },
  {
    id: 'junior-t3-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `class Animal { }
class Ave extends Animal { }
class Pato extends Ave { }

Animal a = new Ave();
Object o = new Pato();
System.out.println((a instanceof Ave) + " " + (a instanceof Pato) + " " + (o instanceof Animal) + " " + (null instanceof Object));`,
    opcoes: [
      '`true false true false`',
      '`true true true false`',
      '`true false false false`',
      '`true false true true`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Uma `Ave` não é um `Pato`, mas um `Pato` é um `Animal`, mesmo guardado num `Object`. `null` nunca é instância de nada.',
  },
  {
    id: 'junior-t3-prova-q11',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `class Funcionario {
    double salario() { return 3000; }
}

class Gerente extends Funcionario {
    double bonus() { return 500; }
}

public class Rh {
    public static void main(String[] args) {
        Funcionario f = new Gerente();
        double total = f.salario() + f.bonus();
        System.out.println(total);
    }
}`,
    resposta: 12,
    explicacao: 'O objeto é um `Gerente`, mas a variável é `Funcionario`, que não declara `bonus()`. Seria preciso `((Gerente) f).bonus()` ou declarar `f` como `Gerente`.',
  },
  {
    id: 'junior-t3-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class Pai {
    int valor = 10;
    Pai() { mostrar(); }
    void mostrar() { System.out.print("Pai:" + valor + " "); }
}

class Filho extends Pai {
    int valor = 20;
    Filho() { mostrar(); }
    @Override void mostrar() { System.out.print("Filho:" + valor + " "); }
}

new Filho();
System.out.println();`,
    opcoes: [
      '`Filho:0 Filho:20`',
      '`Pai:10 Filho:20`',
      '`Filho:20 Filho:20`',
      '`Pai:10 Pai:10`',
      '`Filho:10 Filho:20`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'No construtor de `Pai`, a chamada já vai para `Filho.mostrar()`, que lê o `valor` de `Filho`, ainda não inicializado: 0. Depois que os inicializadores de `Filho` rodam, o mesmo método vê 20.',
  },
  {
    id: 'junior-t3-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual declaração compila?',
    opcoes: [
      '`abstract class A { abstract void f(); }`',
      '`abstract class A { private abstract void f(); }`',
      '`class A { abstract void f(); }`',
      '`final abstract class A { }`',
      '`abstract class A { static abstract void f(); }`',
    ],
    resposta: 0,
    explicacao: 'Método abstrato exige classe abstrata e não pode ser `private` nem `static`. E uma classe abstrata não pode ser `final`.',
  },
  {
    id: 'junior-t3-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class Animal { }
class Cao extends Animal { }

public class Abrigo {
    static String f(Animal a) { return "Animal"; }
    static String f(Cao c) { return "Cao"; }

    public static void main(String[] args) {
        Animal a = new Cao();
        Cao c = new Cao();
        System.out.println(f(a) + " " + f(c) + " " + f((Animal) c));
    }
}`,
    opcoes: ['`Animal Cao Animal`', '`Cao Cao Cao`', '`Cao Cao Animal`', '`Animal Animal Animal`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Sobrecarga é decidida na compilação, pelo tipo declarado do argumento: `a` é `Animal`, `c` é `Cao`, e o cast faz a expressão ser `Animal`. O objeto real não importa aqui.',
  },
  {
    id: 'junior-t3-prova-q15',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual afirmação sobre `final` em herança é verdadeira?',
    opcoes: [
      'Uma classe `final` não pode ser estendida; um método `final` não pode ser sobrescrito, mas a classe dele pode ter subclasses',
      'Um método `final` torna a classe inteira impossível de estender',
      'Uma classe `final` não pode ter métodos sobrescritos de `Object`',
      'Campos `final` não são herdados',
    ],
    resposta: 0,
    explicacao: '`final` na classe fecha a hierarquia; no método, fecha só aquele comportamento. Uma classe `final` pode sobrescrever `toString` normalmente, como `String` faz.',
  },
  {
    id: 'junior-t3-prova-q16',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `class Nota {
    int valor;
    Nota(int valor) { this.valor = valor; }
    @Override public String toString() { return "Nota(" + valor + ")"; }
}

Nota a = new Nota(10);
Nota b = new Nota(10);
System.out.println(a + " " + a.equals(b) + " " + a.toString().equals(b.toString()));`,
    resposta: 'Nota(10) false true',
    explicacao: 'Só o `toString` foi sobrescrito. O `equals` continua o de `Object`, que compara identidade. Os textos são iguais, e o `equals` da `String` compara conteúdo.',
  },
  {
    id: 'junior-t3-prova-q17',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre polimorfismo são verdadeiras? Escolha duas.',
    opcoes: [
      'A versão de um método de instância sobrescrito é escolhida pelo objeto, na execução',
      'O tipo da referência limita quais métodos podem ser chamados',
      'Campos são escolhidos pelo objeto, como os métodos',
      'Métodos `static` são escolhidos pelo objeto',
      'O cast muda a classe do objeto',
    ],
    respostas: [0, 1],
    explicacao: 'Só a escolha da implementação de métodos de instância é dinâmica. Campos e métodos `static` seguem a referência, e o cast muda só a referência.',
  },
  {
    id: 'junior-t3-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `class Fabrica {
    protected Object criar() { return null; }
}

class FabricaTexto extends Fabrica {
    String criar() { return "texto"; }
}`,
    opcoes: [
      'Não compila: o acesso ficou mais restrito',
      'Compila, graças ao retorno covariante',
      'Não compila: o retorno deveria ser `Object`',
      'Compila, mas `criar()` não é sobrescrito',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'O retorno `String` é um subtipo válido, mas sem modificador o método tem acesso de pacote, mais restrito que `protected`. Com `protected` ou `public`, compilaria.',
  },
  {
    id: 'junior-t3-prova-q19',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `abstract class Contador {
    private int total;
    abstract int passo();
    int avancar() { total += passo(); return total; }
}

Contador dois = new Contador() {
    int passo() { return 2; }
};
dois.avancar();
dois.avancar();
System.out.println(dois.avancar());`,
    resposta: '6',
    explicacao: 'A classe anônima é uma subclasse concreta que implementa `passo()`. O estado (`total`) vem da classe abstrata e acumula 2 a cada chamada.',
  },
  {
    id: 'junior-t3-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `class Ponto {
    int x;
    Ponto(int x) { this.x = x; }
    @Override public boolean equals(Object o) {
        return o != null && o.getClass() == getClass() && ((Ponto) o).x == x;
    }
    @Override public int hashCode() { return x; }
}

class Ponto3D extends Ponto {
    Ponto3D(int x) { super(x); }
}

Ponto p = new Ponto(1);
Ponto q = new Ponto3D(1);
System.out.println(p.equals(q) + " " + q.equals(p) + " " + q.equals(new Ponto3D(1)));`,
    opcoes: ['`false false true`', '`true true true`', '`true false true`', '`false true true`', '`false false false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com `getClass()`, só objetos da mesma classe exata podem ser iguais, e a simetria fica garantida: um `Ponto` nunca é igual a um `Ponto3D`, em nenhuma direção. Dois `Ponto3D` com o mesmo `x` são iguais.',
  },
];

export default prova;
