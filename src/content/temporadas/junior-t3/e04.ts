import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t3-e04',
  minutos: 13,
  aula,
  armadilhas: [
    'Upcast é automático; downcast exige cast explícito.',
    'O cast não cria nem altera o objeto: só muda o tipo da referência.',
    'Cast entre classes fora da mesma linha de herança não compila.',
    'Cast possível, mas falso para o objeto real, lança `ClassCastException` na execução.',
    'Cast de `null` funciona e dá `null`; `null instanceof X` é `false`.',
    '`instanceof` é verdadeiro também para subtipos; para a classe exata, compare `getClass()`.',
    '`instanceof` entre tipos impossíveis, como `String` e `Integer`, não compila.',
    '`(Tipo) x.metodo()` aplica o cast ao resultado; o certo é `((Tipo) x).metodo()`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Inheritance, Casting Objects',
      url: 'https://dev.java/learn/language/oop/inheritance/what-is-inheritance/#casting-objects',
      tipo: 'documentacao',
      porque: 'Cast implícito e explícito e o teste com `instanceof`, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.20.2: The instanceof Operator',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.20.2',
      tipo: 'documentacao',
      porque: 'Quando o `instanceof` é erro de compilação, e a forma com padrão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 5.5: Casting Contexts',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.5',
      tipo: 'documentacao',
      porque: 'A tabela completa de quais casts de referência são permitidos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 6.5: checkcast',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-6.html#jvms-6.5.checkcast',
      tipo: 'documentacao',
      porque: 'A instrução que confere o cast na execução, e por que `null` sempre passa.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Object Type Casting in Java',
      url: 'https://www.baeldung.com/java-type-casting',
      tipo: 'artigo',
      porque: 'Upcast, downcast e o método `Class.cast`, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java instanceof Operator',
      url: 'https://www.baeldung.com/java-instanceof',
      tipo: 'artigo',
      porque: 'O operador com hierarquias, interfaces e `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 45, Casting e instanceof',
      url: 'https://www.youtube.com/watch?v=POEf8DKZWds',
      tipo: 'video',
      porque: 'Cast de objetos e o teste com `instanceof`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Professor Larback: Upcasting e Downcasting em Java',
      url: 'https://www.youtube.com/watch?v=evnaxuyiVNA',
      tipo: 'video',
      porque: 'A diferença entre subir e descer na hierarquia, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Upcasting and Downcasting in Java, Full Tutorial',
      url: 'https://www.youtube.com/watch?v=HpuH7n9VOYk',
      tipo: 'video',
      porque: 'Quando cada cast compila, quando falha e como evitar a `ClassCastException`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de cast em três passos, com os casos que compilam e falham na execução.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Understanding Polymorphism", parte "Casting Objects"',
    },
  ],
  desafio: {
    titulo: 'Zoológico',
    enunciado:
      'Crie `Animal`, com nome; `Ave`, com `voar()`; `Pinguim`, uma ave cujo `voar()` diz que ele nada; e `Peixe`, com `nadar()`. Escreva `static String agir(Animal a)`, que usa `instanceof` e cast para chamar o método certo, e um laço que conta as aves. Com os animais Arara (ave), Pingo (pinguim), Nemo (peixe) e Bicho (animal comum), a saída deve ser:\n\n```text\nArara voou\nPingo não voa, nada\nNemo nadou\nBicho descansou\nAves: 2\n```',
    dicas: [
      'Um `Pinguim` também é `Ave`: o teste `a instanceof Ave` o pega, e o `voar()` sobrescrito faz o resto.',
      'Use `((Ave) a).voar()`, com os parênteses em volta do cast.',
      'Animais sem habilidade especial caem no `return` final.',
    ],
    solucao: `class Animal {
    final String nome;

    Animal(String nome) {
        this.nome = nome;
    }
}

class Ave extends Animal {
    Ave(String nome) {
        super(nome);
    }

    String voar() {
        return nome + " voou";
    }
}

class Pinguim extends Ave {
    Pinguim(String nome) {
        super(nome);
    }

    @Override
    String voar() {
        return nome + " não voa, nada";
    }
}

class Peixe extends Animal {
    Peixe(String nome) {
        super(nome);
    }

    String nadar() {
        return nome + " nadou";
    }
}

public class Zoologico {
    static String agir(Animal a) {
        if (a instanceof Ave) {
            return ((Ave) a).voar();
        }
        if (a instanceof Peixe) {
            return ((Peixe) a).nadar();
        }
        return a.nome + " descansou";
    }

    public static void main(String[] args) {
        Animal[] zoo = {new Ave("Arara"), new Pinguim("Pingo"), new Peixe("Nemo"), new Animal("Bicho")};
        int aves = 0;
        for (Animal a : zoo) {
            System.out.println(agir(a));
            if (a instanceof Ave) aves++;
        }
        System.out.println("Aves: " + aves);
    }
}`,
    saida: 'Arara voou\nPingo não voa, nada\nNemo nadou\nBicho descansou\nAves: 2',
    comentarios:
      'O pinguim mostra que `instanceof` respeita a hierarquia, e o cast para `Ave` não impede o polimorfismo: o `voar()` executado é o do objeto real. Repare também que o modelo tem um problema clássico: um pinguim é uma ave que não voa. Isso sugere que "voar" não deveria estar em `Ave`; interfaces, na próxima temporada, resolvem melhor.',
  },
  exercicios: [
    {
      id: 'junior-t3-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual conversão de referência exige um cast explícito?',
      opcoes: [
        'De `Animal` para `Cachorro`, descendo na hierarquia',
        'De `Cachorro` para `Animal`, subindo na hierarquia',
        'De `Cachorro` para `Object`',
        'Nenhuma: referências nunca precisam de cast',
      ],
      resposta: 0,
      explicacao: 'Subir é seguro e automático: todo cachorro é um animal. Descer exige o cast, porque o compilador não sabe se aquele animal é mesmo um cachorro.',
    },
    {
      id: 'junior-t3-e04-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `class A { }
class B extends A { }
class C extends B { }

A x = new B();
System.out.println((x instanceof A) + " " + (x instanceof B) + " " + (x instanceof C));`,
      resposta: 'true true false',
      explicacao: 'O objeto é um `B`, e portanto também um `A`. Não é um `C`, que é mais específico que ele.',
    },
    {
      id: 'junior-t3-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `class Fruta { }
class Maca extends Fruta { }
class Banana extends Fruta { }

Fruta f = new Maca();
Banana b = (Banana) f;
System.out.println("comi");`,
      opcoes: ['Lança `ClassCastException`', 'Imprime `comi`', 'Não compila', 'Imprime `comi` e `b` vale `null`'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ClassCastException' },
      explicacao: 'O cast compila, porque uma `Fruta` poderia ser uma `Banana`. Na execução, a JVM vê que o objeto é uma `Maca` e lança a exceção.',
    },
    {
      id: 'junior-t3-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `class Livro { }
class Revista { }

Livro l = new Livro();
Revista r = (Revista) l;`,
      opcoes: ['Não compila', 'Lança `ClassCastException`', 'Compila e `r` vale `null`', 'Compila e `r` aponta para o livro'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Nenhuma das classes estende a outra: um `Livro` nunca poderia ser uma `Revista`. O compilador recusa o cast antes de qualquer execução.',
    },
    {
      id: 'junior-t3-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`Object o = "a"; String s = (String) o;`',
        '`String s = "a"; Integer i = (Integer) s;`',
        '`Object o = 1; boolean b = o instanceof String;`',
        '`Integer i = 1; boolean b = i instanceof String;`',
        '`Object o = null; String s = (String) o;`',
      ],
      respostas: [1, 3],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Com `Object`, qualquer cast e qualquer teste são possíveis, e o compilador aceita. Entre `String` e `Integer`, classes sem relação, os dois são impossíveis e não compilam.',
    },
    {
      id: 'junior-t3-e04-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o operador que testa o tipo antes do cast. O programa deve imprimir `texto de 4 letras / outra coisa`.',
      codigo: `public class Tipos {
    static String descrever(Object obj) {
        if (obj ___ String) {
            return "texto de " + ((String) obj).length() + " letras";
        }
        return "outra coisa";
    }

    public static void main(String[] args) {
        System.out.println(descrever("java") + " / " + descrever(42));
    }
}`,
      respostas: ['instanceof'],
      saida: 'texto de 4 letras / outra coisa',
      explicacao: 'O `instanceof` garante que o cast seguinte não vai falhar. Para o `42`, que é um `Integer`, o teste dá `false` e o cast nem é tentado.',
    },
    {
      id: 'junior-t3-e04-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Object o = "a";
        String s = "b";
        Integer n = 1;
        System.out.println(o instanceof Integer);
        System.out.println(s instanceof Object);
        System.out.println(n instanceof String);
    }
}`,
      resposta: 8,
      explicacao: 'Um `Integer` nunca poderia ser uma `String`, e o compilador recusa o teste. Os outros dois são possíveis: um `Object` pode ser um `Integer`, e toda `String` é um `Object`.',
    },
    {
      id: 'junior-t3-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Animal { }

Animal a = null;
Object o = a;
String s = (String) o;
System.out.println((a instanceof Animal) + " " + (o instanceof Object) + " " + s);`,
      opcoes: ['`false false null`', 'Lança `ClassCastException`', 'Lança `NullPointerException`', '`true true null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O cast de `null` sempre funciona, porque não há objeto para conferir. E `instanceof` com `null` é sempre `false`, qualquer que seja o tipo.',
    },
    {
      id: 'junior-t3-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Conta {
    double saldo = 100;
}

class Poupanca extends Conta {
    double juros() { return saldo * 0.01; }
}

Conta c = new Poupanca();
System.out.println(((Poupanca) c).juros());`,
      opcoes: ['`1.0`', '`100.0`', 'Não compila', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os parênteses externos fazem o cast acontecer antes da chamada. Com a referência `Poupanca`, `juros()` passa a ser visível, e o objeto realmente é uma poupança.',
    },
    {
      id: 'junior-t3-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado?',
      codigo: `class Conta {
    double saldo = 100;
}

class Poupanca extends Conta {
    double juros() { return saldo * 0.01; }
}

Conta c = new Poupanca();
System.out.println((Poupanca) c.juros());`,
      opcoes: ['Não compila', 'Imprime `1.0`', 'Lança `ClassCastException`', 'Imprime `100.0`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 10 },
      explicacao: 'O ponto tem precedência sobre o cast: o código tenta chamar `c.juros()` primeiro, e `Conta` não tem esse método. O certo é `((Poupanca) c).juros()`.',
    },
    {
      id: 'junior-t3-e04-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que acontece com o objeto quando se faz `Cachorro c = (Cachorro) animal;`?',
      opcoes: [
        'Nada: o objeto é o mesmo, só a referência tem outro tipo',
        'Um objeto `Cachorro` novo é criado a partir do animal',
        'Os campos de `Animal` são descartados',
        'O objeto é convertido permanentemente em `Cachorro`',
      ],
      resposta: 0,
      explicacao: 'O cast de referência é só uma verificação e uma mudança de "visão". O objeto já era um cachorro; senão, o cast lançaria `ClassCastException`.',
    },
    {
      id: 'junior-t3-e04-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Veiculo { }
class Moto extends Veiculo { }

Veiculo v = new Moto();
System.out.println((v instanceof Veiculo) + " " + (v.getClass() == Veiculo.class) + " " + v.getClass().getSimpleName());`,
      resposta: 'true false Moto',
      explicacao: '`instanceof` aceita subtipos: uma moto é um veículo. `getClass()` devolve a classe exata do objeto, que é `Moto`.',
    },
    {
      id: 'junior-t3-e04-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `instanceof` são verdadeiras? Escolha duas.',
      opcoes: [
        '`null instanceof Object` vale `false`',
        'É verdadeiro quando o objeto é do tipo testado ou de um subtipo dele',
        'Lança `NullPointerException` quando o objeto é `null`',
        'Compara a classe exata, como `getClass()`',
        'Compila com qualquer par de tipos',
      ],
      respostas: [0, 1],
      explicacao: 'O operador nunca lança exceção: com `null`, simplesmente devolve `false`. Ele olha a hierarquia toda, e o compilador recusa testes entre tipos impossíveis.',
    },
    {
      id: 'junior-t3-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `Object o = "Java";
if (!(o instanceof String s)) {
    System.out.println("não é texto");
} else {
    System.out.println(s.length());
}`,
      opcoes: ['`4`', '`não é texto`', 'Não compila: `s` não existe no `else`', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A forma com padrão declara `s` já convertida. A variável existe onde o teste com certeza deu verdadeiro: como a condição está negada, isso é o `else`.',
    },
    {
      id: 'junior-t3-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Quais instruções de bytecode implementam o cast de referência e o operador `instanceof`?',
      opcoes: [
        '`checkcast` e `instanceof`',
        '`invokevirtual` e `getfield`',
        '`new` e `dup`',
        'Nenhuma: o cast é resolvido só na compilação',
      ],
      resposta: 0,
      explicacao: 'As duas fazem a mesma consulta à hierarquia. `checkcast` lança `ClassCastException` se a resposta for não; `instanceof` só empurra 0 ou 1 na pilha.',
    },
  ],
};

export default episodio;
