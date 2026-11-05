import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t5-e04',
  minutos: 13,
  aula,
  armadilhas: [
    'Variáveis locais e parâmetros capturados por lambdas precisam ser `final` ou efetivamente final.',
    'Uma reatribuição antes ou depois da lambda, inclusive `++` e `+=`, já impede a captura.',
    'O erro aparece na linha em que a variável é usada dentro da lambda, não na linha da reatribuição.',
    'A variável do for-each pode ser capturada; o contador do for clássico não, porque o `i++` o reatribui.',
    'Campos de instância e estáticos podem ser lidos e alterados dentro de lambdas.',
    'O conteúdo de um objeto capturado pode mudar: `sb.append(...)` e `array[0]++` são permitidos.',
    'Uma lambda não pode declarar uma variável com o nome de uma local de fora; uma classe anônima pode.',
    'Classes anônimas seguem a mesma regra, com a mensagem `referenced from an inner class`.',
  ],
  ia: {
    uso:
      'Para capturas em lambdas, a IA ajuda a entender o erro `must be final or effectively final` e a achar a reatribuição que o causou. Ela costuma propor atalhos que compilam e escondem o problema, como o array de um elemento, e confunde o que é capturado por cópia, as variáveis locais, com o que é lido na hora, os campos.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui o método com a lambda e a mensagem do javac>\n- Liste toda atribuição às variáveis capturadas e diga se cada uma é efetivamente final.\n- Diga em que linha o compilador aponta o erro e por quê.\n- Corrija sem arrays de um elemento nem AtomicInteger, a menos que não haja alternativa.\n- Explique se a lambda lê cada valor na criação ou na execução.',
    erros: [
      'Sugere `int[] contador = {0}` para acumular dentro de uma lambda, quando um `sum` ou um `reduce` resolveria.',
      'Diz que a regra também impede alterar campos dentro da lambda.',
      'Aponta o erro na linha da reatribuição, quando o `javac` o aponta na lambda.',
      'Esquece que a lambda lê campos na hora em que roda, e não quando foi criada.',
    ],
    conferir: [
      'Ponha `final` na variável capturada e veja onde o compilador aponta a reatribuição.',
      'Mude um campo depois de criar a lambda e rode-a para ver o valor usado.',
      'Use o depurador para inspecionar os valores capturados dentro da lambda.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Capturing Local Values',
      url: 'https://dev.java/learn/language/fp/lambdas/first-lambdas/#capturing-local-values',
      tipo: 'documentacao',
      porque: 'A regra de captura com os exemplos do tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 4.12.4: final Variables',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12.4',
      tipo: 'documentacao',
      porque: 'A definição exata de efetivamente final, inclusive para variáveis sem inicializador.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JLS 15.27.2: Lambda Body',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.27.2',
      tipo: 'documentacao',
      porque: 'A regra que proíbe usar variáveis locais não efetivamente final dentro de lambdas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Why Do We Need Effectively Final?',
      url: 'https://www.baeldung.com/java-lambda-effectively-final-local-variables',
      tipo: 'artigo',
      porque: 'Os motivos da regra, com os problemas de concorrência que ela evita.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Brian Goetz: State of the Lambda',
      url: 'https://cr.openjdk.org/~briangoetz/lambda/lambda-state-final.html',
      tipo: 'artigo',
      porque: 'As seções sobre escopo léxico e captura explicam a decisão de proibir a mutação de locais.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Kody Simpson: Variable Capture (Effectively Final)',
      url: 'https://www.youtube.com/watch?v=um8GVlfmTH8',
      tipo: 'video',
      porque: 'Exemplos curtos do que compila e do que não compila ao capturar variáveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Beat99.Academy: Lambdas, Syntax, Scope & Patterns, Effectively Final',
      url: 'https://www.youtube.com/watch?v=6L6omcLT2IQ',
      tipo: 'video',
      porque: 'Escopo de lambdas e a regra de captura, com padrões de uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Modern Java in Action (Raoul-Gabriel Urma, Mario Fusco e Alan Mycroft)',
      url: 'https://www.manning.com/books/modern-java-in-action',
      tipo: 'livro',
      porque: 'A explicação da restrição pela diferença entre pilha e heap.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Lambda expressions": seção 3.5, "Type checking, type inference, and restrictions", parte "Using local variables"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As tabelas do que uma lambda pode acessar e as questões de "qual linha não compila".',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Lambdas and Functional Interfaces": seção "Working with Variables in Lambdas"',
    },
  ],
  desafio: {
    titulo: 'Placar com ações adiadas',
    enunciado:
      'Crie a classe `Placar` com um campo `int pontos` e o método `Runnable bonus(int valor)`, que devolve uma ação que soma `valor` aos pontos. No `main`, para as rodadas de 1 a 3 num for clássico, guarde numa lista a ação de bônus de `rodada * 10` pontos e, noutra lista, um `Supplier<String>` com a mensagem da rodada. Depois, execute todas as ações num `forEach`, contando quantas foram executadas, imprima as mensagens e o total. A saída deve ser:\n\n```text\nrodada 1: +10\nrodada 2: +20\nrodada 3: +30\ntotal: 60 em 3 ações\n```',
    dicas: [
      'O contador `rodada` do for clássico não pode ser capturado; copie-o para uma variável nova dentro do laço.',
      'A lambda de `bonus` pode alterar `pontos`, porque é um campo.',
      'Para contar dentro do `forEach`, use um array de um elemento.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

public class Placar {
    private int pontos;

    Runnable bonus(int valor) {
        return () -> pontos += valor;
    }

    public static void main(String[] args) {
        Placar placar = new Placar();
        List<Runnable> acoes = new ArrayList<>();
        List<Supplier<String>> mensagens = new ArrayList<>();
        for (int rodada = 1; rodada <= 3; rodada++) {
            int numero = rodada;
            int valor = rodada * 10;
            acoes.add(placar.bonus(valor));
            mensagens.add(() -> "rodada " + numero + ": +" + valor);
        }

        int[] executadas = {0};
        acoes.forEach(acao -> {
            acao.run();
            executadas[0]++;
        });
        mensagens.forEach(m -> System.out.println(m.get()));
        System.out.println("total: " + placar.pontos + " em " + executadas[0] + " ações");
    }
}`,
    saida: 'rodada 1: +10\nrodada 2: +20\nrodada 3: +30\ntotal: 60 em 3 ações',
    comentarios:
      'As variáveis `numero` e `valor` nascem a cada volta do laço e nunca mudam, por isso podem ser capturadas. O parâmetro `valor` de `bonus` também é efetivamente final. A lambda altera `pontos` sem problema, porque guarda uma referência ao `Placar`, não uma cópia do campo. O array `executadas` funciona, mas, como você verá nos streams, `count()` faria o mesmo sem truque.',
  },
  bugs: [
    {
      id: 'pleno-t5-e04-b01',
      dificuldade: 1,
      sintoma: 'O cálculo do total com taxa não compila: `local variables referenced from a lambda expression must be final or effectively final`, apontando a lambda, e não o `if` que muda a taxa.',
      codigo: `import java.util.function.Function;

public class Checkout {
    public static void main(String[] args) {
        String cliente = "vip";
        double taxa = 0.05;
        if (cliente.equals("vip")) taxa = 0.02;
        Function<Double, Double> comTaxa = valor -> valor * (1 + taxa);
        System.out.println("total: " + comTaxa.apply(200.0));
    }
}`,
      linha: 8,
      efeito: { tipo: 'naoCompila' },
      correcao: `import java.util.function.Function;

public class Checkout {
    public static void main(String[] args) {
        String cliente = "vip";
        double taxa = 0.05;
        if (cliente.equals("vip")) taxa = 0.02;
        double taxaDoCliente = taxa; Function<Double, Double> comTaxa = valor -> valor * (1 + taxaDoCliente);
        System.out.println("total: " + comTaxa.apply(200.0));
    }
}`,
      saidaCorrigida: 'total: 204.0',
      dica: 'A variável `taxa` recebe quantas atribuições no método? Uma só, ou mais de uma?',
      explicacao:
        '`taxa` é reatribuída no `if` e deixou de ser efetivamente final, e o erro aparece na linha da lambda que a usa. A correção copia o valor final para uma variável nova, que nunca muda, e a lambda captura a cópia. Outra saída é calcular a taxa numa única atribuição, com o operador ternário.',
    },
    {
      id: 'pleno-t5-e04-b02',
      dificuldade: 2,
      sintoma: 'Os três clientes receberam o lembrete com o nome do último: `Olá, Caio! Seu pedido saiu.\nOlá, Caio! Seu pedido saiu.\nOlá, Caio! Seu pedido saiu.`.',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class Lembretes {
    public static void main(String[] args) {
        StringBuilder mensagem = new StringBuilder();
        List<Runnable> envios = new ArrayList<>();
        for (String cliente : List.of("Ana", "Bia", "Caio")) {
            mensagem.setLength(0);
            mensagem.append("Olá, ").append(cliente).append("! Seu pedido saiu.");
            envios.add(() -> System.out.println(mensagem));
        }
        envios.forEach(Runnable::run);
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'Olá, Caio! Seu pedido saiu.\nOlá, Caio! Seu pedido saiu.\nOlá, Caio! Seu pedido saiu.' },
      correcao: `import java.util.ArrayList;
import java.util.List;

public class Lembretes {
    public static void main(String[] args) {
        StringBuilder mensagem = new StringBuilder();
        List<Runnable> envios = new ArrayList<>();
        for (String cliente : List.of("Ana", "Bia", "Caio")) {
            mensagem.setLength(0);
            mensagem.append("Olá, ").append(cliente).append("! Seu pedido saiu.");
            String texto = mensagem.toString(); envios.add(() -> System.out.println(texto));
        }
        envios.forEach(Runnable::run);
    }
}`,
      saidaCorrigida: 'Olá, Ana! Seu pedido saiu.\nOlá, Bia! Seu pedido saiu.\nOlá, Caio! Seu pedido saiu.',
      dica: 'A variável `mensagem` é efetivamente final, e a lambda compila. Mas o objeto que ela aponta é o mesmo nas três voltas?',
      explicacao:
        'A regra do efetivamente final protege a variável, não o objeto: as três lambdas capturaram o mesmo `StringBuilder`, que foi esvaziado e preenchido de novo a cada volta. Quando os lembretes rodam, ele guarda só a última mensagem. Capture um valor imutável de cada volta, como a `String` da correção.',
    },
    {
      id: 'pleno-t5-e04-b03',
      dificuldade: 3,
      sintoma: 'Um pedido feito durante a promoção foi cobrado sem o desconto, porque a promoção terminou antes do pagamento: `pedido feito na promoção, cobrado: 100.0`.',
      codigo: `import java.util.function.Function;

public class Promocao {
    static class Loja {
        double desconto = 0.10;

        Function<Double, Double> regraDoPedido() {
            return valor -> valor * (1 - desconto);
        }
    }

    public static void main(String[] args) {
        Loja loja = new Loja();
        Function<Double, Double> regra = loja.regraDoPedido();
        loja.desconto = 0.0;
        System.out.println("pedido feito na promoção, cobrado: " + regra.apply(100.0));
    }
}`,
      linha: 8,
      efeito: { tipo: 'saida', saida: 'pedido feito na promoção, cobrado: 100.0' },
      correcao: `import java.util.function.Function;

public class Promocao {
    static class Loja {
        double desconto = 0.10;

        Function<Double, Double> regraDoPedido() {
            double fixo = desconto; return valor -> valor * (1 - fixo);
        }
    }

    public static void main(String[] args) {
        Loja loja = new Loja();
        Function<Double, Double> regra = loja.regraDoPedido();
        loja.desconto = 0.0;
        System.out.println("pedido feito na promoção, cobrado: " + regra.apply(100.0));
    }
}`,
      saidaCorrigida: 'pedido feito na promoção, cobrado: 90.0',
      dica: 'A lambda guarda o valor de `desconto` do momento em que foi criada, ou lê o campo quando roda?',
      explicacao:
        'Campos não são copiados na captura: a lambda guarda uma referência ao objeto, `this`, e lê `desconto` só quando roda, depois da mudança para 0. Para congelar o valor do momento do pedido, copie o campo para uma variável local e capture a cópia, como na correção.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t5-e04-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int limite = 10;
        Predicate<Integer> abaixo = n -> n < limite;
        limite = 20;
        System.out.println(abaixo.test(15));
    }
}`,
      opcoes: [
        'Não compila: `limite` não é efetivamente final',
        'Compila e imprime `true`',
        'Compila e imprime `false`',
        'Não compila: falta `final` na declaração',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'A reatribuição na linha 7 tira o "efetivamente final", e o erro aparece onde a variável é usada na lambda, na linha 6.',
      dica: 'Toda reatribuição conta, mesmo depois da lambda.',
    },
    {
      id: 'pleno-t5-e04-q02',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que o compilador aponta como erro.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int base = 2;
        int fator = 3;
        fator++;
        Function<Integer, Integer> a = n -> n * base;
        Function<Integer, Integer> b = n -> n * fator;
        System.out.println(a.apply(5) + b.apply(5));
    }
}`,
      resposta: 9,
      explicacao: '`fator++` acontece antes da lambda, mas já é uma segunda atribuição. `base` nunca muda e pode ser capturada.',
      dica: 'O erro aparece na lambda que usa a variável reatribuída.',
    },
    {
      id: 'pleno-t5-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static int total = 0;
    int vezes = 0;

    void rodar() {
        Runnable r = () -> {
            vezes++;
            total += 10;
        };
        r.run();
        r.run();
        r.run();
        System.out.println(vezes + " " + total);
    }

    public static void main(String[] args) {
        new Teste().rodar();
    }
}`,
      opcoes: ['`3 30`', 'Não compila: campos não podem ser alterados em lambdas', '`0 0`', '`1 10`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A regra de captura vale só para variáveis locais. Campos de instância e estáticos podem mudar livremente dentro da lambda.',
      dica: 'Campos não estão sujeitos à regra.',
    },
    {
      id: 'pleno-t5-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que pode ser alterado dentro de uma lambda? Escolha três.',
      opcoes: [
        'Um campo de instância da classe',
        'Um campo estático',
        'Um elemento de um array local',
        'Uma variável local declarada fora da lambda',
        'Um parâmetro do método que contém a lambda',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O array local pode ter o conteúdo alterado, porque a variável continua apontando para o mesmo array. Variáveis locais e parâmetros externos não podem ser reatribuídos.',
      dica: 'A regra vale para variáveis locais e parâmetros, não para campos nem para o conteúdo de arrays.',
    },
    {
      id: 'pleno-t5-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        int[] soma = {0};
        List.of(4, 5, 6).forEach(n -> soma[0] += n);
        System.out.println(soma[0]);
    }
}`,
      opcoes: ['`15`', '`0`', 'Não compila: `soma` não é efetivamente final', '`6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A variável `soma` nunca é reatribuída; só o conteúdo do array muda.',
      dica: 'A variável `soma` não muda; o conteúdo do array, sim.',
    },
    {
      id: 'pleno-t5-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Runnable> l = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            l.add(() -> System.out.print(i));
        }
        l.forEach(Runnable::run);
    }
}`,
      opcoes: [
        'Não compila: `i` não é efetivamente final',
        'Compila e imprime `012`',
        'Compila e imprime `333`',
        'Compila e imprime `222`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'O `i++` do for clássico reatribui a variável. A correção é copiar para uma variável nova dentro do laço: `int j = i;`.',
      dica: 'O contador do for clássico é reatribuído pelo `i++`.',
    },
    {
      id: 'pleno-t5-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Runnable> l = new ArrayList<>();
        for (String s : List.of("x", "y")) {
            l.add(() -> System.out.print(s));
        }
        for (int i = 3; i > 1; i--) {
            int c = i;
            l.add(() -> System.out.print(c));
        }
        l.forEach(Runnable::run);
        System.out.println();
    }
}`,
      opcoes: ['`xy32`', '`yy22`', 'Não compila: `s` não é efetivamente final', '`xy11`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No for-each, cada volta cria uma variável nova. No for clássico, a cópia `c` também é nova a cada volta. Cada lambda guarda o seu valor.',
      dica: 'A variável do for-each é nova a cada volta, e `c` também.',
    },
    {
      id: 'pleno-t5-e04-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o modificador que torna explícita a regra que a lambda exige. O programa deve imprimir `30`.',
      codigo: `import java.util.function.Function;

public class Explicita {
    public static void main(String[] args) {
        ___ int base = 10;
        Function<Integer, Integer> somar = n -> n + base;
        System.out.println(somar.apply(20));
    }
}`,
      respostas: ['final'],
      saida: '30',
      explicacao: 'Com `final`, o compilador garante que a variável nunca mude. Sem ele, o código também compilaria, porque `base` já é efetivamente final.',
      dica: 'É a palavra que impede reatribuições.',
    },
    {
      id: 'pleno-t5-e04-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        String nome = "fora";
        Runnable a = new Runnable() {
            String nome = "dentro";

            public void run() {
                System.out.print(nome + " ");
            }
        };
        Runnable b = () -> System.out.print(nome + " ");
        a.run();
        b.run();
        System.out.println();
    }
}`,
      opcoes: ['`dentro fora`', '`fora fora`', '`dentro dentro`', 'Não compila: `nome` declarado duas vezes'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A classe anônima cria um escopo novo, e o campo `nome` esconde a variável externa. A lambda não cria escopo e usa a variável local.',
      dica: 'A classe anônima cria um escopo próprio; a lambda, não.',
    },
    {
      id: 'pleno-t5-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int total = 10;
        Supplier<Integer> s = () -> {
            int total = 5;
            return total;
        };
        System.out.println(s.get());
    }
}`,
      opcoes: [
        'Não compila: `total` já foi declarada no mesmo escopo',
        'Compila e imprime `5`',
        'Compila e imprime `10`',
        'Não compila: lambdas não podem declarar variáveis',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 7 },
      explicacao: 'O corpo da lambda está no mesmo escopo do método. Uma classe anônima poderia declarar um campo `total`; a lambda não.',
      dica: 'A lambda não cria um escopo novo.',
    },
    {
      id: 'pleno-t5-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        int x;
        if (args.length > 99) {
            x = 1;
        } else {
            x = 2;
        }
        Supplier<Integer> s = () -> x;
        System.out.println(s.get());
    }
}`,
      opcoes: ['`2`', '`1`', 'Não compila: `x` é atribuída em dois lugares', 'Não compila: `x` pode não ter sido inicializada'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada caminho atribui `x` exatamente uma vez, e ela nunca muda depois. Isso conta como efetivamente final.',
      dica: 'Atribuída uma vez em cada caminho, ela continua efetivamente final.',
    },
    {
      id: 'pleno-t5-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.util.function.*;

public class Teste {
    static Supplier<String> criar(String nome) {
        nome = nome.trim();
        return () -> nome;
    }
}`,
      opcoes: [
        'Não compila: o parâmetro `nome` foi reatribuído',
        'Compila',
        'Não compila: parâmetros nunca podem ser capturados',
        'Compila, mas a lambda devolve o nome sem `trim`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Parâmetros seguem a mesma regra das variáveis locais. Sem a reatribuição, ou guardando o resultado numa variável nova, compilaria.',
      dica: 'Parâmetro reatribuído não é efetivamente final.',
    },
    {
      id: 'pleno-t5-e04-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.function.*;

public class Teste {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        Consumer<String> anotar = s -> sb.append(s).append(',');
        anotar.accept("x");
        anotar.accept("y");
        System.out.println(sb + "" + sb.length());
    }
}`,
      resposta: 'x,y,4',
      explicacao: 'A variável `sb` aponta sempre para o mesmo objeto, que muda por dentro. "x,y," tem quatro caracteres.',
      dica: 'O objeto muda por dentro; a variável `sb` não muda.',
    },
    {
      id: 'pleno-t5-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        int n = 1;
        Runnable r = new Runnable() {
            public void run() {
                System.out.println(n);
            }
        };
        n = 2;
        r.run();
    }
}`,
      opcoes: [
        'Não compila: classes anônimas também só capturam variáveis efetivamente final',
        'Compila e imprime `1`',
        'Compila e imprime `2`',
        'Compila, porque a regra só vale para lambdas',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Desde o Java 8, classes anônimas e locais aceitam variáveis efetivamente final em vez de exigir `final`, mas a reatribuição continua proibida.',
      dica: 'Classes anônimas seguem a mesma regra desde o Java 8.',
    },
    {
      id: 'pleno-t5-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o Java exige que variáveis locais capturadas sejam efetivamente final?',
      opcoes: [
        'A lambda guarda uma cópia do valor; se a variável pudesse mudar, a cópia ficaria desatualizada',
        'Porque variáveis locais ficam no heap e precisam ser imutáveis',
        'Para que a lambda possa ser serializada',
        'Porque o `invokedynamic` só aceita constantes',
      ],
      resposta: 0,
      explicacao: 'A variável vive na pilha e some quando o método termina, mas a lambda pode viver mais. Proibir mudanças garante que a cópia e o original sejam sempre iguais.',
      dica: 'A lambda recebe uma cópia do valor.',
    },
  ],
};

export default episodio;
