import type { Exercicio } from '../../types';

/** Prova da temporada Pleno T5: lambdas. */
const prova: Exercicio[] = [
  {
    id: 'pleno-t5-prova-q01',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais declarações compilam? Escolha três.',
    opcoes: [
      '`Runnable r = () -> { };`',
      '`BiPredicate<String, Integer> p = (s, n) -> s.length() == n;`',
      '`Function<String, String> f = (final var s) -> s.trim();`',
      '`Supplier<String> s = () -> return "x";`',
      '`BiPredicate<String, String> p = (String s, t) -> true;`',
      '`Consumer<String> c = s -> { s.length() };`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: '`return` exige chaves, os parâmetros não podem misturar estilos, e uma instrução dentro de chaves precisa de ponto e vírgula.',
  },
  {
    id: 'pleno-t5-prova-q02',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.function.Supplier;

public class Teste {
    static void enviar(Runnable r) {
        System.out.print("R ");
    }

    static void enviar(Supplier<String> s) {
        System.out.print("S ");
    }

    public static void main(String[] args) {
        enviar(() -> "x");
        enviar(() -> { });
        enviar(() -> System.out.print(""));
        System.out.println();
    }
}`,
    opcoes: ['`S R R`', '`S R S`', '`R R R`', 'Não compila: as chamadas são ambíguas'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Um corpo que é só um valor serve apenas ao `Supplier`. Um bloco vazio e uma chamada a método `void` servem apenas ao `Runnable`.',
  },
  {
    id: 'pleno-t5-prova-q03',
    tipo: 'linha',
    dificuldade: 3,
    enunciado: 'Clique na linha que o compilador aponta como erro.',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Runnable> l = new ArrayList<>();
        int total = 0;
        for (int i = 0; i < 3; i++) {
            int c = i;
            l.add(() -> System.out.print(c));
            l.add(() -> System.out.print(total));
            total += i;
        }
    }
}`,
    resposta: 10,
    explicacao: '`total` é reatribuída na linha 11, e por isso não pode ser capturada. O erro aparece onde ela é usada dentro da lambda. A cópia `c` nasce a cada volta e nunca muda.',
  },
  {
    id: 'pleno-t5-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        IntFunction<String> f = n -> "#".repeat(n);
        ToIntFunction<String> g = String::length;
        System.out.println(g.applyAsInt(f.apply(3)) + f.apply(2));
    }
}`,
    opcoes: ['`3##`', '`5`', '`###2`', 'Não compila: o método de `IntFunction` é `applyAsInt`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`IntFunction` recebe `int` e devolve objeto, com `apply`. `ToIntFunction` devolve `int`, com `applyAsInt`. O `int` 3 seguido da `String` vira concatenação.',
  },
  {
    id: 'pleno-t5-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Predicate<Integer> positivo = n -> n > 0;
        IntPredicate par = n -> n % 2 == 0;
        IntPredicate copia = positivo;
        System.out.println(par.test(4) + " " + copia.test(4));
    }
}`,
    opcoes: [
      'Não compila: `Predicate<Integer>` não é um `IntPredicate`',
      'Compila e imprime `true true`',
      'Compila com aviso de autoboxing',
      'Não compila: `IntPredicate` não existe',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: 'As versões primitivas não têm relação de herança com as genéricas. Seria preciso criar outra lambda, como `n -> positivo.test(n)`.',
  },
  {
    id: 'pleno-t5-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("a");
        Supplier<String> texto = sb::toString;
        sb.append("b");
        sb = new StringBuilder("z");
        System.out.println(texto.get() + sb);
    }
}`,
    opcoes: ['`abz`', '`az`', '`zz`', 'Não compila: `sb` não é efetivamente final'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A referência guardou o primeiro `StringBuilder`, que recebeu o "b". Apontar `sb` para outro objeto depois não afeta a referência, e referências não exigem efetivamente final.',
  },
  {
    id: 'pleno-t5-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        String s = null;
        Supplier<Integer> lambda = () -> s.length();
        System.out.println("lambda criada");
        Supplier<Integer> referencia = s::length;
        System.out.println("referência criada");
    }
}`,
    opcoes: [
      'Imprime `lambda criada` e lança `NullPointerException`',
      'Imprime as duas linhas',
      'Lança `NullPointerException` antes de imprimir',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NullPointerException', saida: 'lambda criada' },
    explicacao: 'A lambda só usaria `s` ao ser chamada, o que não acontece. A referência confere o objeto na criação e falha ali.',
  },
  {
    id: 'pleno-t5-prova-q08',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BiFunction<String, String, Integer> posicao = String::indexOf;
        System.out.println(posicao.apply("javaflix", "a") + posicao.apply("javaflix", "flix"));
    }
}`,
    resposta: '5',
    explicacao: 'O primeiro parâmetro é o objeto e o segundo, o argumento: `"javaflix".indexOf("a")` é 1 e `indexOf("flix")` é 4. Os dois `Integer` são somados.',
  },
  {
    id: 'pleno-t5-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<String, Integer> a = String::length;
        Supplier<Integer> b = String::length;
        System.out.println(a.apply("abc") + b.get());
    }
}`,
    opcoes: [
      'Não compila: o `Supplier` não fornece o objeto para `length`',
      'Compila e imprime `3`',
      'Compila e imprime `33`',
      'Compila e lança `NullPointerException`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: '`String::length` sem objeto precisa recebê-lo como primeiro parâmetro. A `Function` o recebe; o `Supplier` não recebe nada.',
  },
  {
    id: 'pleno-t5-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        int[] contador = {0};
        Runnable r = () -> contador[0]++;
        r.run();
        r.run();
        System.out.println(contador[0]);
    }
}`,
    opcoes: ['`2`', '`0`', 'Não compila: `contador` não é efetivamente final', '`1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A variável `contador` sempre aponta para o mesmo array; só o conteúdo muda, e isso é permitido.',
  },
  {
    id: 'pleno-t5-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, Integer> mais2 = x -> x + 2;
        Function<Integer, Integer> vezes10 = x -> x * 10;
        System.out.println(mais2.compose(vezes10).andThen(vezes10).apply(1));
    }
}`,
    opcoes: ['`120`', '`30`', '`102`', '`210`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`compose` aplica `vezes10` primeiro: 10. Depois `mais2`: 12. Por fim, o `andThen`: 120.',
  },
  {
    id: 'pleno-t5-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int[] n = {0};
        Predicate<String> a = s -> { n[0]++; return s.isEmpty(); };
        Predicate<String> b = s -> { n[0]++; return true; };
        a.and(b).test("x");
        a.or(b).test("x");
        System.out.println(n[0]);
    }
}`,
    opcoes: ['`3`', '`4`', '`2`', '`1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'No `and`, `a` dá falso e `b` não é avaliado: 1. No `or`, `a` dá falso e `b` precisa ser avaliado: mais 2.',
  },
  {
    id: 'pleno-t5-prova-q13',
    tipo: 'lacuna',
    dificuldade: 2,
    enunciado: 'Complete com o método estático que inverte um predicado. O programa deve imprimir `true false`.',
    codigo: `import java.util.function.Predicate;

public class Inverte {
    public static void main(String[] args) {
        Predicate<String> temTexto = Predicate.___(String::isBlank);
        System.out.println(temTexto.test("a") + " " + temTexto.test("  "));
    }
}`,
    respostas: ['not'],
    saida: 'true false',
    explicacao: '`Predicate.not`, do Java 11, inverte uma referência a método, que não tem tipo próprio para receber um `.negate()`.',
  },
  {
    id: 'pleno-t5-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        String s = "valor";
        Function<String, Integer> tamanho = s -> s.length();
        System.out.println(tamanho.apply(s));
    }
}`,
    opcoes: [
      'Não compila: o parâmetro `s` repete o nome de uma variável local',
      'Compila e imprime `5`',
      'Compila e imprime `0`',
      'Não compila: `s` não é efetivamente final',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 6 },
    explicacao: 'O parâmetro da lambda estaria no mesmo escopo da variável `s`. Com outro nome, como `t -> t.length()`, compilaria.',
  },
  {
    id: 'pleno-t5-prova-q15',
    tipo: 'multipla',
    dificuldade: 1,
    enunciado: 'Quais pares de interface e método estão corretos? Escolha três.',
    opcoes: [
      '`Supplier<T>`: `get()`',
      '`BiConsumer<T, U>`: `accept(T, U)`',
      '`IntSupplier`: `getAsInt()`',
      '`Predicate<T>`: `apply(T)`',
      '`Consumer<T>`: `consume(T)`',
    ],
    respostas: [0, 1, 2],
    explicacao: '`Predicate` usa `test`, e `Consumer` usa `accept`.',
  },
  {
    id: 'pleno-t5-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, List<String>> criar = ArrayList::new;
        List<String> l = criar.apply(5);
        l.add("a");
        System.out.println(l.size());
    }
}`,
    opcoes: ['`1`', '`6`', '`5`', 'Não compila: `ArrayList::new` só serve a `Supplier`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Com uma `Function<Integer, ...>`, a referência chama o construtor que recebe a capacidade inicial. A lista nasce vazia.',
  },
  {
    id: 'pleno-t5-prova-q17',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        Function<Integer, Function<Integer, Integer>> potencia = b -> e -> (int) Math.pow(b, e);
        System.out.println(potencia.apply(2).apply(10) + potencia.apply(3).andThen(x -> x - 1).apply(2));
    }
}`,
    resposta: '1032',
    explicacao: '`potencia.apply(2)` devolve a função que eleva 2: 1024. `potencia.apply(3)` eleva 3, e o `andThen` subtrai 1: 9 - 1 = 8. A soma dá 1032.',
  },
  {
    id: 'pleno-t5-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.io.IOException;
import java.util.concurrent.Callable;

public class Teste {
    public static void main(String[] args) {
        Callable<String> c = () -> { throw new IOException("c"); };
        Runnable r = () -> { throw new IOException("r"); };
    }
}`,
    opcoes: [
      'Não compila: `run()` não declara exceções checked',
      'Compila',
      'Não compila: nenhuma lambda pode lançar `IOException`',
      'Não compila: `main` precisa de `throws IOException`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: '`Callable.call()` declara `throws Exception`, então a primeira lambda pode lançar `IOException`. `Runnable.run()` não declara nada.',
  },
  {
    id: 'pleno-t5-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.*;
import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        BinaryOperator<String> maior = BinaryOperator.maxBy(Comparator.comparingInt(String::length));
        System.out.println(maior.apply("ab", "cd") + maior.apply("a", "bcd"));
    }
}`,
    opcoes: ['`abbcd`', '`cdbcd`', '`aba`', '`cda`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'No empate de tamanho, `maxBy` fica com o primeiro argumento. Entre "a" e "bcd", o maior é "bcd".',
  },
  {
    id: 'pleno-t5-prova-q20',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Dentro de uma lambda escrita num método de instância, a que se refere `this`?',
    opcoes: [
      'Ao objeto da classe que contém o método',
      'Ao objeto que implementa a interface funcional',
      'A nada: `this` não pode ser usado em lambdas',
      'Ao primeiro parâmetro da lambda',
    ],
    resposta: 0,
    explicacao: 'A lambda não cria um escopo de objeto próprio, ao contrário de uma classe anônima, em que `this` é a própria instância anônima.',
  },
];

export default prova;
