import type { Exercicio } from '../../types';

/** Prova da temporada Pleno T2: generics. */
const prova: Exercicio[] = [
  {
    id: 'pleno-t2-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        var a = new ArrayList<>();
        a.add("x");
        a.add(2);
        List<String> b = new ArrayList<>();
        b.add("y");
        System.out.println(a.size() + b.size() + "" + a.get(1));
    }
}`,
    opcoes: ['`32`', '`212`', 'Não compila: `a` é um `ArrayList<String>`', '`3x`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com `var`, o diamante deduz `Object`, e a lista aceita os dois valores. Os tamanhos são somados antes da concatenação: 2 + 1, depois `""`, depois o elemento 2.',
  },
  {
    id: 'pleno-t2-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais declarações compilam? Escolha três.',
    opcoes: [
      '`class A<T> { T[] itens; }`',
      '`class B<T> { static int contador; }`',
      '`class C<T> { <R> R converter(T t) { return null; } }`',
      '`class D<T> { static T padrao; }`',
      '`class E<T> { T criar() { return new T(); } }`',
      '`class F<T> extends Exception { }`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'Declarar `T[]` é permitido; criar o array ou um `new T()`, não. Campos `static` não podem usar `T`, mas podem ter outros tipos. E nenhuma classe genérica pode estender `Throwable`.',
  },
  {
    id: 'pleno-t2-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.List;

public class Util {
    public static <T> T primeiro(List<T> l) {
        return l.get(0);
    }

    public <T> static T ultimo(List<T> l) {
        return l.get(l.size() - 1);
    }
}`,
    opcoes: [
      'Não compila: o `<T>` de `ultimo` aparece antes de um modificador',
      'Compila',
      'Não compila: métodos `static` não podem ser genéricos',
      'Não compila: os dois métodos usam o mesmo nome de parâmetro de tipo',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 8 },
    explicacao: 'Todos os modificadores vêm antes da lista de parâmetros de tipo, que fica logo antes do retorno. Cada método pode declarar o próprio `T`.',
  },
  {
    id: 'pleno-t2-prova-q04',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.*;

public class Teste {
    static <T> List<T> duplicar(List<T> lista) {
        List<T> resultado = new ArrayList<>(lista);
        resultado.addAll(lista);
        return resultado;
    }

    public static void main(String[] args) {
        System.out.println(duplicar(List.of(1, 2)) + "" + duplicar(List.of("a")).size());
    }
}`,
    resposta: '[1, 2, 1, 2]2',
    explicacao: 'O mesmo método atende a `Integer` e a `String`. A primeira chamada é impressa como lista; da segunda, só o tamanho.',
  },
  {
    id: 'pleno-t2-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.*;

public class Cadastro {
    void salvar(Set<String> nomes) {
        System.out.println("nomes");
    }

    void salvar(Set<Integer> codigos) {
        System.out.println("códigos");
    }
}`,
    opcoes: [
      'Não compila: os dois métodos têm o mesmo apagamento',
      'Compila: é uma sobrecarga válida',
      'Compila, mas as chamadas com `Set` vazio são ambíguas',
      'Não compila: `Set<Integer>` não é permitido como parâmetro',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 8 },
    explicacao: 'Depois do apagamento, os dois viram `salvar(Set)`. Seria preciso dar nomes diferentes aos métodos.',
  },
  {
    id: 'pleno-t2-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Integer> numeros = new ArrayList<>();
        List cru = numeros;
        cru.add("três");
        System.out.println(numeros.size());
        int total = 0;
        for (Integer n : numeros) {
            total += n;
        }
        System.out.println(total);
    }
}`,
    opcoes: [
      'Imprime `1` e depois lança `ClassCastException`',
      'Lança `ClassCastException` em `cru.add("três")`',
      'Imprime `1` e `0`',
      'Não compila: `numeros` só aceita `Integer`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'ClassCastException', saida: '1' },
    explicacao: 'O raw type deixa a `String` entrar sem erro. A falha aparece no `for`, onde o compilador inseriu o cast para `Integer`.',
  },
  {
    id: 'pleno-t2-prova-q07',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais atribuições compilam? Escolha três.',
    opcoes: [
      '`List<? extends Number> a = new ArrayList<Double>();`',
      '`List<? super Double> b = new ArrayList<Number>();`',
      '`List<? extends Comparable<?>> c = new ArrayList<String>();`',
      '`List<Number> d = new ArrayList<Double>();`',
      '`List<? super Double> e = new ArrayList<Integer>();`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`String` implementa `Comparable<String>`, que é um `Comparable<?>`. `Number` é supertipo de `Double`, mas `Integer` não é. E `List<Number>` é invariante.',
  },
  {
    id: 'pleno-t2-prova-q08',
    tipo: 'linha',
    dificuldade: 2,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `import java.util.*;

public class Teste {
    static void processar(List<? extends CharSequence> textos) {
        CharSequence primeiro = textos.get(0);
        Object qualquer = textos.get(0);
        textos.add(null);
        textos.add("novo");
    }
}`,
    resposta: 8,
    explicacao: 'Ler como `CharSequence` ou `Object` é permitido. Escrever não: a lista pode ser de `StringBuilder`, e uma `String` não caberia. Só `null` entra.',
  },
  {
    id: 'pleno-t2-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    static void encher(List<? super Integer> lista) {
        for (int i = 3; i > 0; i--) {
            lista.add(i);
        }
    }

    public static void main(String[] args) {
        List<Number> numeros = new ArrayList<>();
        encher(numeros);
        numeros.add(0.5);
        System.out.println(numeros);
    }
}`,
    opcoes: [
      '`[3, 2, 1, 0.5]`',
      'Não compila: `List<Number>` não é `List<? super Integer>`',
      '`[1, 2, 3, 0.5]`',
      'Não compila: `numeros.add(0.5)` depois de `encher`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`Number` é supertipo de `Integer`, então a lista é aceita. Fora do método, ela continua sendo uma `List<Number>` e aceita o `Double`.',
  },
  {
    id: 'pleno-t2-prova-q10',
    tipo: 'lacuna',
    dificuldade: 3,
    enunciado: 'Complete o limite para que o método aceite a lista de maçãs. O programa deve imprimir `120`.',
    codigo: `import java.util.List;

public class Pomar {
    static class Fruta implements Comparable<Fruta> {
        final int peso;

        Fruta(int peso) {
            this.peso = peso;
        }

        public int compareTo(Fruta outra) {
            return Integer.compare(peso, outra.peso);
        }
    }

    static class Maca extends Fruta {
        Maca(int peso) {
            super(peso);
        }
    }

    static <T extends Comparable<___>> T menor(List<? extends T> itens) {
        T m = itens.get(0);
        for (T item : itens) {
            if (item.compareTo(m) < 0) {
                m = item;
            }
        }
        return m;
    }

    public static void main(String[] args) {
        List<Maca> macas = List.of(new Maca(150), new Maca(120), new Maca(200));
        System.out.println(menor(macas).peso);
    }
}`,
    respostas: ['? super T'],
    saida: '120',
    explicacao: '`Maca` herdou `Comparable<Fruta>`. Com `Comparable<T>`, a chamada não compilaria; com `Comparable<? super T>`, qualquer supertipo de `Maca` serve.',
  },
  {
    id: 'pleno-t2-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.lang.reflect.Method;
import java.util.*;

public class Teste {
    static class Texto implements Comparable<Texto> {
        String v;

        Texto(String v) {
            this.v = v;
        }

        public int compareTo(Texto o) {
            return v.compareTo(o.v);
        }
    }

    public static void main(String[] args) {
        long pontes = Arrays.stream(Texto.class.getDeclaredMethods()).filter(Method::isBridge).count();
        System.out.println(Texto.class.getDeclaredMethods().length + " " + pontes);
    }
}`,
    opcoes: ['`2 1`', '`1 0`', '`2 0`', '`3 1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Além de `compareTo(Texto)`, o compilador gera o método-ponte `compareTo(Object)`, exigido pela interface depois do apagamento. Construtores não entram em `getDeclaredMethods`.',
  },
  {
    id: 'pleno-t2-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class Teste {
    static <T extends Comparable<T> & Number> T menor(T a, T b) {
        return a.compareTo(b) <= 0 ? a : b;
    }
}`,
    opcoes: [
      'Não compila: a classe `Number` precisa ser o primeiro limite',
      'Compila',
      'Não compila: um parâmetro de tipo não pode ter dois limites',
      'Compila, e o apagamento de `T` é `Comparable`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 2 },
    explicacao: 'Com vários limites, a classe vem primeiro e as interfaces depois do `&`. Invertendo para `<T extends Number & Comparable<T>>`, compilaria.',
  },
  {
    id: 'pleno-t2-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    static <T> List<T> vazia() {
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        List<String> a = Teste.<String>vazia();
        a.add("x");
        var b = Teste.<Integer>vazia();
        b.add(1);
        var c = Teste.vazia();
        c.add("y");
        c.add(2);
        System.out.println(a.size() + b.size() + c.size());
    }
}`,
    opcoes: [
      '`4`',
      '`112`',
      'Não compila: `c` não aceita valores de tipos diferentes',
      'Não compila: `vazia()` sem testemunha não tem tipo',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Sem testemunha e sem destino tipado, `T` é inferido como `Object`, e `c` é uma `List<Object>`. Os tamanhos 1, 1 e 2 são somados.',
  },
  {
    id: 'pleno-t2-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um método genérico `<T> void ordenar(List<T> lista, ___ criterio)` usa o critério para comparar os elementos. Qual tipo de parâmetro é o mais flexível?',
    opcoes: ['`Comparator<? super T>`', '`Comparator<? extends T>`', '`Comparator<T>`', '`Comparator<?>`'],
    resposta: 0,
    explicacao: 'O comparador consome elementos de `T`, então segue o PECS com `super`. Assim, um `Comparator<Object>` ou de uma superclasse também serve.',
  },
  {
    id: 'pleno-t2-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre o apagamento de tipos são verdadeiras? Escolha duas.',
    opcoes: [
      'Campos `static` de uma classe genérica são compartilhados por todas as suas parametrizações',
      'O compilador insere casts onde valores genéricos são usados com o tipo específico',
      '`List<String>` e `List<Integer>` geram arquivos `.class` diferentes',
      'A JVM confere o argumento de tipo a cada `add` numa lista genérica',
      'Métodos que diferem só no argumento de tipo do parâmetro são sobrecargas válidas',
    ],
    respostas: [0, 1],
    explicacao: 'Só existe uma classe para todas as parametrizações, e os tipos somem na execução. Por isso a verificação é toda do compilador, e métodos com o mesmo apagamento conflitam.',
  },
  {
    id: 'pleno-t2-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    static class Caixa<N extends Number> {
        List<N> itens = new ArrayList<>();

        void add(N n) {
            itens.add(n);
        }

        int somaInteira() {
            int soma = 0;
            for (N n : itens) {
                soma += n.intValue();
            }
            return soma;
        }
    }

    public static void main(String[] args) {
        Caixa<Double> c = new Caixa<>();
        c.add(1.9);
        c.add(2.9);
        System.out.println(c.somaInteira());
    }
}`,
    opcoes: ['`3`', '`4`', '`4.8`', 'Não compila: `N` não tem o método `intValue()`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O limite `Number` dá acesso a `intValue()`, que trunca: 1 + 2.',
  },
  {
    id: 'pleno-t2-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Object o = new ArrayList<String>();
        if (o instanceof List<String> lista) {
            System.out.println(lista.size());
        }
    }
}`,
    opcoes: [
      'Não compila: um `Object` não pode ser conferido como `List<String>`',
      'Compila e imprime `0`',
      'Compila com aviso de `unchecked` e imprime `0`',
      'Não compila: `instanceof` não aceita tipos genéricos',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'Na execução, só dá para saber que o objeto é uma `List`, não de quê. `o instanceof List<?> lista` compilaria.',
  },
  {
    id: 'pleno-t2-prova-q18',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.*;

public class Teste {
    record Par<A, B>(A a, B b) { }

    static String juntar(List<? extends Par<?, ?>> pares) {
        StringBuilder sb = new StringBuilder();
        for (Par<?, ?> p : pares) {
            sb.append(p.a()).append(p.b());
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(juntar(List.of(new Par<>("x", 1), new Par<>(2, 'y'))));
    }
}`,
    resposta: 'x12y',
    explicacao: 'Os dois pares têm parametrizações diferentes, mas ambos são `Par<?, ?>`. O método só lê os componentes como `Object` e os concatena.',
  },
  {
    id: 'pleno-t2-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class Teste {
    static class Fruta implements Comparable<Fruta> {
        public int compareTo(Fruta o) { return 0; }
    }

    static class Maca extends Fruta implements Comparable<Maca> {
        public int compareTo(Maca o) { return 0; }
    }
}`,
    opcoes: [
      'Não compila: `Comparable` não pode ser herdado com argumentos diferentes',
      'Compila: `Maca` sobrescreve `compareTo`',
      'Compila: `Maca` sobrecarrega `compareTo`',
      'Não compila: falta `@Override` em `Maca`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'Uma classe não pode ser `Comparable<Fruta>` e `Comparable<Maca>` ao mesmo tempo: depois do apagamento, as duas exigiriam o mesmo método-ponte `compareTo(Object)`.',
  },
  {
    id: 'pleno-t2-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Object o = new ArrayList<Integer>(List.of(1));
        if (o instanceof List<?> lista) {
            System.out.println(lista.size() + " " + (lista.get(0) instanceof Integer));
        }
    }
}`,
    opcoes: [
      '`1 true`',
      'Não compila: `instanceof` não aceita tipos genéricos',
      '`1 false`',
      'Não compila: `lista.get(0)` devolve `Object`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`List<?>` é reificável e pode ser usado em `instanceof`, inclusive com padrão. O elemento é lido como `Object`, mas o objeto real é um `Integer`.',
  },
];

export default prova;
