import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t2-e01',
  minutos: 14,
  aula,
  armadilhas: [
    'Em `Caixa<String>`, `T` é o parâmetro de tipo e `String` é o argumento de tipo.',
    '`var lista = new ArrayList<>();` cria um `ArrayList<Object>`, que aceita qualquer coisa.',
    'O diamante só aparece do lado do `new`: `List<> l = new ArrayList<String>()` não compila.',
    'Diamante com classe anônima compila desde o Java 9.',
    'Tipos primitivos não são argumentos de tipo: `List<int>` não compila.',
    '`new T()`, `new T[10]` e campos `static T` não compilam; declarar `T[] itens` compila.',
    'Uma classe genérica não pode estender `Throwable`, nem indiretamente.',
    'Raw type compila com aviso de `unchecked`; aviso não é erro de compilação.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Introducing Generics',
      url: 'https://dev.java/learn/language/fp/generics/intro/',
      tipo: 'documentacao',
      porque: 'Por que usar generics, tipos genéricos, raw types e convenções de nomes, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Generic Types',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/types.html',
      tipo: 'documentacao',
      porque: 'A classe `Box<T>` passo a passo, com o diamante e os múltiplos parâmetros de tipo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Restrictions on Generics',
      url: 'https://docs.oracle.com/javase/tutorial/java/generics/restrictions.html',
      tipo: 'documentacao',
      porque: 'A lista completa do que não se pode fazer com um parâmetro de tipo, com o motivo de cada item.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.1.2: Generic Classes and Type Parameters',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.2',
      tipo: 'documentacao',
      porque: 'A definição formal de classe genérica e a regra que proíbe genéricos estendendo `Throwable`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JVMS 4.7.9: The Signature Attribute',
      url: 'https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-4.html#jvms-4.7.9',
      tipo: 'documentacao',
      porque: 'Onde o arquivo `.class` guarda as assinaturas genéricas que o bytecode apagou.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: The Basics of Java Generics',
      url: 'https://www.baeldung.com/java-generics',
      tipo: 'artigo',
      porque: 'Um panorama de generics, de classes e métodos a wildcards, com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Raw Types in Java',
      url: 'https://www.baeldung.com/raw-types-java',
      tipo: 'artigo',
      porque: 'O que são raw types, por que ainda existem e o risco de usá-los.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the Diamond Operator in Java',
      url: 'https://www.baeldung.com/java-diamond-operator',
      tipo: 'artigo',
      porque: 'A história do diamante, do Java 7 às classes anônimas do Java 9.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Generics pt 01, Introdução',
      url: 'https://www.youtube.com/watch?v=YOHMTPIxRDk',
      tipo: 'video',
      porque: 'O problema das listas sem tipo e como generics o resolvem, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Generics pt 04, Classes Genéricas pt 01',
      url: 'https://www.youtube.com/watch?v=ZWhEZ-7PXg8',
      tipo: 'video',
      porque: 'Criando uma classe genérica do zero, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Generics In Java, Full Simple Tutorial',
      url: 'https://www.youtube.com/watch?v=K1iu1kXkVoA',
      tipo: 'video',
      porque: 'Classes e métodos genéricos e limites, num tutorial direto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Por que raw types são perigosos e como transformar uma classe em genérica.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Generics": Item 26, "Don\'t use raw types", e Item 29, "Favor generic types"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de classes, interfaces e records genéricos no formato das questões da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 9, "Collections and Generics": seção "Working with Generics", partes "Creating Generic Classes", "Implementing Generic Interfaces" e "Creating a Generic Record"',
    },
  ],
  desafio: {
    titulo: 'Uma pilha para qualquer tipo',
    enunciado:
      'Escreva a classe genérica `Pilha<T>`, apoiada num `ArrayList<T>`, com `empilhar(T)`, `desempilhar()`, `topo()` e `tamanho()`. `desempilhar` e `topo` lançam `IllegalStateException("pilha vazia")` quando não há elementos. No `main`, use uma `Pilha<String>` como histórico de edições (empilhe "título", "parágrafo" e "imagem" e desfaça a última) e uma `Pilha<Integer>` para inverter os dígitos de `"2026"`. Por fim, chame `topo()` numa `Pilha<Double>` vazia. A saída deve ser:\n\n```text\ndesfeito: imagem\ntopo: parágrafo (2)\ninvertido: 6202\nerro: pilha vazia\n```',
    dicas: [
      'O topo é o último elemento da lista: `itens.get(itens.size() - 1)`.',
      '`List<T>.remove(int)` devolve o elemento removido, já com o tipo `T`.',
      '`c - \'0\'` converte o caractere de um dígito no seu valor.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Pilhas {
    static class Pilha<T> {
        private final List<T> itens = new ArrayList<>();

        void empilhar(T item) {
            itens.add(item);
        }

        T desempilhar() {
            if (itens.isEmpty()) {
                throw new IllegalStateException("pilha vazia");
            }
            return itens.remove(itens.size() - 1);
        }

        T topo() {
            if (itens.isEmpty()) {
                throw new IllegalStateException("pilha vazia");
            }
            return itens.get(itens.size() - 1);
        }

        int tamanho() {
            return itens.size();
        }
    }

    public static void main(String[] args) {
        Pilha<String> edicoes = new Pilha<>();
        edicoes.empilhar("título");
        edicoes.empilhar("parágrafo");
        edicoes.empilhar("imagem");
        System.out.println("desfeito: " + edicoes.desempilhar());
        System.out.println("topo: " + edicoes.topo() + " (" + edicoes.tamanho() + ")");

        Pilha<Integer> digitos = new Pilha<>();
        for (char c : "2026".toCharArray()) {
            digitos.empilhar(c - '0');
        }
        int invertido = 0;
        while (digitos.tamanho() > 0) {
            invertido = invertido * 10 + digitos.desempilhar();
        }
        System.out.println("invertido: " + invertido);

        try {
            new Pilha<Double>().topo();
        } catch (IllegalStateException e) {
            System.out.println("erro: " + e.getMessage());
        }
    }
}`,
    saida: 'desfeito: imagem\ntopo: parágrafo (2)\ninvertido: 6202\nerro: pilha vazia',
    comentarios:
      'Uma única classe atende a texto, a números e a qualquer outro tipo, e cada uso é conferido pelo compilador: `edicoes.empilhar(3)` não compilaria. Em `digitos.empilhar(c - \'0\')`, o `int` é embalado em `Integer`; em `invertido * 10 + digitos.desempilhar()`, é desembalado de volta. A `Pilha<Double>` vazia mostra que o argumento de tipo não muda o comportamento: o código que roda é o mesmo para todos.',
  },
  exercicios: [
    {
      id: 'pleno-t2-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Na declaração `class Caixa<T>` e no uso `Caixa<String> c`, como se chamam `T` e `String`?',
      opcoes: [
        '`T` é o parâmetro de tipo; `String` é o argumento de tipo',
        '`T` é o argumento de tipo; `String` é o parâmetro de tipo',
        'Os dois são parâmetros de tipo',
        '`T` é um wildcard; `String` é o limite dele',
      ],
      resposta: 0,
      explicacao: 'Como em métodos, o parâmetro é o nome declarado e o argumento é o valor passado no uso. `Caixa<String>` é chamado de tipo parametrizado.',
    },
    {
      id: 'pleno-t2-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<int> numeros = new ArrayList<>();
        numeros.add(1);
        System.out.println(numeros);
    }
}`,
      opcoes: [
        'Não compila: argumentos de tipo precisam ser tipos de referência',
        'Compila e imprime `[1]`',
        'Compila com aviso e imprime `[1]`',
        'Não compila: falta o tipo no diamante',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Primitivos não podem ser argumentos de tipo. Com `List<Integer>`, o `add(1)` funcionaria por autoboxing.',
    },
    {
      id: 'pleno-t2-e01-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    static class Contador<T> {
        private T ultimo;
        private int vezes;

        void registrar(T item) {
            ultimo = item;
            vezes++;
        }

        public String toString() {
            return ultimo + "x" + vezes;
        }
    }

    public static void main(String[] args) {
        Contador<String> letras = new Contador<>();
        letras.registrar("a");
        letras.registrar("b");
        Contador<Integer> numeros = new Contador<>();
        numeros.registrar(7);
        System.out.println(letras + " " + numeros);
    }
}`,
      resposta: 'bx2 7x1',
      explicacao: 'Cada objeto tem os próprios campos, qualquer que seja o argumento de tipo. `letras` registrou duas vezes e guarda o último, "b".',
    },
    {
      id: 'pleno-t2-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações compilam? Escolha três.',
      opcoes: [
        '`List<String> a = new ArrayList<>();`',
        '`Map<String, List<Integer>> b = new HashMap<>();`',
        '`var c = new ArrayList<>();`',
        '`List<> d = new ArrayList<String>();`',
        '`List<int> e = new ArrayList<>();`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O diamante fica só do lado do `new`. Com `var`, ele deduz `Object`. Primitivos nunca são argumentos de tipo.',
    },
    {
      id: 'pleno-t2-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        var lista = new ArrayList<>();
        lista.add(1);
        lista.add("2");
        System.out.println(lista.size() + " " + lista.get(1).getClass().getSimpleName());
    }
}`,
      opcoes: ['`2 String`', 'Não compila: `lista` é um `ArrayList<Integer>`', '`2 Object`', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem tipo à esquerda, o diamante deduz `Object`, então a lista aceita os dois valores. `getClass()` mostra o tipo real do objeto, `String`.',
    },
    {
      id: 'pleno-t2-e01-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Cache<T> {
    private T valor;
    private int acessos;
    private static int instancias;
    private static T ultimoValor;

    Cache(T valor) {
        this.valor = valor;
        instancias++;
    }
}`,
      resposta: 5,
      explicacao: 'Um campo `static` é único para todas as parametrizações, então não pode ter o tipo `T`. Um `static int` é permitido.',
    },
    {
      id: 'pleno-t2-e01-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Erros {
    static class Falha<T> extends RuntimeException {
        private final T dado;

        Falha(T dado) {
            this.dado = dado;
        }
    }
}`,
      opcoes: [
        'Não compila: uma classe genérica não pode estender `Throwable`',
        'Compila',
        'Não compila: exceções precisam de um construtor com `String`',
        'Compila, mas `catch (Falha<String> e)` não compilaria',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'O `catch` precisa identificar o tipo exato da exceção na execução, e o argumento de tipo não existe lá. Por isso a regra vale mesmo estendendo `Throwable` indiretamente.',
    },
    {
      id: 'pleno-t2-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a declaração dos parâmetros de tipo. O programa deve imprimir `idade=31`.',
      codigo: `public class Entradas {
    record Entrada<___>(A chave, B valor) {
        public String toString() {
            return chave + "=" + valor;
        }
    }

    public static void main(String[] args) {
        Entrada<String, Integer> e = new Entrada<>("idade", 31);
        System.out.println(e);
    }
}`,
      respostas: ['A, B'],
      saida: 'idade=31',
      explicacao: 'Records genéricos declaram os parâmetros depois do nome, como as classes. Os dois tipos são separados por vírgula.',
    },
    {
      id: 'pleno-t2-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    interface Conversor<E, S> {
        S converter(E entrada);
    }

    static class Tamanho implements Conversor<String, Integer> {
        public Integer converter(String texto) {
            return texto.length();
        }
    }

    public static void main(String[] args) {
        Conversor<String, Integer> c = new Tamanho();
        int total = 0;
        for (String s : List.of("ab", "cde")) {
            total += c.converter(s);
        }
        System.out.println(total);
    }
}`,
      opcoes: ['`5`', '`abcde`', '`0`', 'Não compila: `converter` deveria receber `Object`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Ao fixar `Conversor<String, Integer>`, o método passa a receber `String` e devolver `Integer`. A soma é 2 + 3.',
    },
    {
      id: 'pleno-t2-e01-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    interface Conversor<E, S> {
        S converter(E entrada);
    }

    static class Tamanho implements Conversor<String, Integer> {
        public Integer converter(Object entrada) {
            return entrada.toString().length();
        }
    }
}`,
      opcoes: [
        'Não compila: `converter(Object)` não implementa `converter(String)`',
        'Compila, porque `Object` aceita qualquer `String`',
        'Compila com aviso de `unchecked`',
        'Não compila: `Tamanho` precisa ser genérica',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Ao fixar `String`, o método a implementar é `converter(String)`. O `converter(Object)` tem o mesmo apagamento mas não o sobrescreve, e o compilador acusa conflito de nomes.',
    },
    {
      id: 'pleno-t2-e01-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Dentro de `class Caixa<T>`, quais operações **não** compilam? Escolha duas.',
      opcoes: [
        '`T item = new T();`',
        '`static T padrao;`',
        '`private T[] itens;`',
        '`T primeiro(T a, T b) { return a; }`',
        '`boolean igual(T outro) { return outro.equals(this); }`',
      ],
      respostas: [0, 1],
      explicacao: 'Não se cria instância de `T`, e `T` não aparece em membros `static`. Declarar um campo `T[]` é permitido; o problema seria criar o array com `new T[n]`. Todo `T` tem `equals`, herdado de `Object`.',
    },
    {
      id: 'pleno-t2-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>();
        List cru = nomes;
        cru.add(7);
        System.out.println(nomes.size() + " " + nomes.contains(7));
    }
}`,
      opcoes: ['`1 true`', 'Não compila: `nomes` só aceita `String`', 'Lança `ClassCastException`', '`0 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O raw type desliga a verificação: o `Integer` entra numa lista de `String`, e o código compila só com aviso. `contains` recebe `Object`, então não há cast para falhar.',
    },
    {
      id: 'pleno-t2-e01-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Pela convenção, qual letra representa o tipo dos elementos de uma coleção na declaração de `List` e `Set`?',
      opcoes: ['`E`', '`T`', '`K`', '`R`'],
      resposta: 0,
      explicacao: '`E` de *element* aparece em `List<E>`, `Set<E>` e `Collection<E>`. `K` e `V` são de mapas, e `R` costuma ser o resultado de uma função.',
    },
    {
      id: 'pleno-t2-e01-q14',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    record Par<A, B>(A primeiro, B segundo) {
        Par<B, A> invertido() {
            return new Par<>(segundo, primeiro);
        }
    }

    public static void main(String[] args) {
        var p = new Par<>("x", 1).invertido();
        System.out.println(p.primeiro() + p.primeiro() + p.segundo());
    }
}`,
      resposta: '2x',
      explicacao: 'Depois de invertido, `p` é um `Par<Integer, String>`. Os dois `Integer` são somados como números antes de a concatenação com `"x"` começar.',
    },
    {
      id: 'pleno-t2-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Comparator<String> invertida = new Comparator<>() {
            public int compare(String a, String b) {
                return b.compareTo(a);
            }
        };
        List<String> letras = new ArrayList<>(List.of("b", "a", "c"));
        letras.sort(invertida);
        System.out.println(letras);
    }
}`,
      opcoes: [
        '`[c, b, a]`',
        '`[a, b, c]`',
        'Não compila: o diamante não pode ser usado com classe anônima',
        '`[b, a, c]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Desde o Java 9, o diamante funciona com classes anônimas, e aqui ele deduz `Comparator<String>`. A comparação invertida ordena de trás para a frente.',
    },
  ],
};

export default episodio;
