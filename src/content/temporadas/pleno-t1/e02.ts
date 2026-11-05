import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'pleno-t1-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'Um `try` precisa de pelo menos um `catch` ou um `finally` (ou de recursos).',
    'A ordem é fixa: `try`, os `catch`, e no máximo um `finally` no fim.',
    'Só o primeiro `catch` compatível roda; um `catch` de superclasse antes do de subclasse não compila.',
    'O `finally` roda com ou sem exceção, e até depois de um `return` no `try` ou no `catch`.',
    '`System.exit` encerra a JVM e impede o `finally`.',
    'O valor de um `return` é calculado antes do `finally`: mudar um primitivo ali não altera o retorno.',
    'Um `return` no `finally` substitui o retorno do `try` e engole exceções pendentes.',
    'Uma exceção lançada no `finally` substitui a original, que se perde.',
  ],
  ia: {
    uso:
      'Com `try`, `catch` e `finally`, a IA ajuda a montar o passo a passo de um programa e a gerar variações para treinar a ordem de execução. Mas ela erra justamente os casos que a prova cobra: `return` no `finally`, valor de retorno fixado antes do `finally` e exceção substituída. Rode o programa antes de acreditar na saída que ela descreve.',
    pedido:
      'Estou estudando para a prova 1Z0-830, com Java 21.\n<cole aqui o programa com try, catch e finally>\n- Mostre a ordem em que cada linha roda, bloco por bloco, e o valor de cada variável no fim do try, do catch e do finally.\n- Diga o que o método devolve e por quê, citando a regra.\n- Não altere o programa; se ele não compilar, aponte a linha e a mensagem do javac.\n- Crie dois programas parecidos, um com return no finally e outro com exceção no finally, e me dê as saídas só no fim.',
    erros: [
      'Diz que o `finally` não roda quando o `try` tem `return`.',
      'Afirma que mudar uma variável primitiva no `finally` altera o valor já devolvido.',
      'Esquece que uma exceção lançada no `finally` substitui a original.',
      'Afirma que o `finally` roda mesmo depois de um `System.exit` no `try`.',
    ],
    conferir: [
      'Rode o programa e compare a saída, linha por linha, com o passo a passo da IA.',
      'Siga o fluxo no depurador do IntelliJ, avançando com F8 entre os blocos.',
      'Compile com `javac -Xlint:finally` para ver o aviso de `finally` que não termina normalmente.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Catching and Handling Exceptions',
      url: 'https://dev.java/learn/language/annotations-exceptions/exceptions/catching-handling/',
      tipo: 'documentacao',
      porque: 'Os blocos `try`, `catch` e `finally` e as exceções lançadas dentro do `finally`, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: The finally Block',
      url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/finally.html',
      tipo: 'documentacao',
      porque: 'Quando o `finally` roda e quando ele não roda.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.20.2: Execution of try-finally and try-catch-finally',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20.2',
      tipo: 'documentacao',
      porque: 'Os casos de término abrupto e por que um `return` no `finally` vence.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to the Java finally Keyword',
      url: 'https://www.baeldung.com/java-finally-keyword',
      tipo: 'artigo',
      porque: 'O `finally` com `return`, com exceções e com `System.exit`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Exception Handling in Java',
      url: 'https://www.baeldung.com/java-exceptions',
      tipo: 'artigo',
      porque: 'Um panorama do tratamento de exceções, com as antipráticas mais comuns.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 47, Exceptions: try, catch',
      url: 'https://www.youtube.com/watch?v=ld2C4GcAtsg',
      tipo: 'video',
      porque: 'O primeiro `try`/`catch`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 49, Exceptions: finally',
      url: 'https://www.youtube.com/watch?v=Xb9rK6L4GYA',
      tipo: 'video',
      porque: 'O bloco `finally` e a ordem de execução, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Exception Handling in Java Tutorial',
      url: 'https://www.youtube.com/watch?v=1XAfapkBQjk',
      tipo: 'video',
      porque: '`try`, `catch`, `finally` e a propagação, num tutorial direto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os programas que imprimem de cada bloco, com `return` e exceção no `finally`, como nas questões.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Handling Exceptions", partes "Using try and catch Statements", "Chaining catch Blocks" e "Adding a finally Block"',
    },
  ],
  desafio: {
    titulo: 'Caixa com registro',
    enunciado:
      'Escreva `static String sacar(int valor)` para um saldo `static` de 100. Valor menor ou igual a zero lança `IllegalArgumentException("valor inválido")`, tratada no próprio método com o retorno `recusado: mensagem`. Valor maior que o saldo lança `IllegalStateException("saldo insuficiente")`, que **não** é tratada ali e sobe para quem chamou. Em todos os casos, um `finally` registra `[fim]` num log que já recebeu `[início valor]`. Rode com:\n\n```java\nSystem.out.println(sacar(30));\nSystem.out.println(sacar(-5));\ntry {\n    System.out.println(sacar(500));\n} catch (IllegalStateException e) {\n    System.out.println("erro: " + e.getMessage());\n}\nSystem.out.println(log);\n```\n\nSaída esperada:\n\n```text\nok, saldo 70\nrecusado: valor inválido\nerro: saldo insuficiente\n[início 30][fim][início -5][fim][início 500][fim]\n```',
    dicas: [
      'O `log` pode ser um `static StringBuilder`.',
      'O `catch` do método só pega `IllegalArgumentException`; a outra exceção passa por ele.',
      'O `finally` roda nos três casos, inclusive quando a exceção sobe.',
    ],
    solucao: `public class Caixa {
    static int saldo = 100;
    static StringBuilder log = new StringBuilder();

    static String sacar(int valor) {
        log.append("[início ").append(valor).append("]");
        try {
            if (valor <= 0) throw new IllegalArgumentException("valor inválido");
            if (valor > saldo) throw new IllegalStateException("saldo insuficiente");
            saldo -= valor;
            return "ok, saldo " + saldo;
        } catch (IllegalArgumentException e) {
            return "recusado: " + e.getMessage();
        } finally {
            log.append("[fim]");
        }
    }

    public static void main(String[] args) {
        System.out.println(sacar(30));
        System.out.println(sacar(-5));
        try {
            System.out.println(sacar(500));
        } catch (IllegalStateException e) {
            System.out.println("erro: " + e.getMessage());
        }
        System.out.println(log);
    }
}`,
    saida: 'ok, saldo 70\nrecusado: valor inválido\nerro: saldo insuficiente\n[início 30][fim][início -5][fim][início 500][fim]',
    comentarios:
      'O `finally` é o lugar de tudo o que precisa acontecer em qualquer cenário: registrar, liberar uma trava, fechar uma conexão. Repare que o método decide quais erros sabe tratar (valor inválido vira uma resposta) e deixa subir os que não sabe (saldo insuficiente fica para quem chamou). Nenhum `return` ou `throw` no `finally`, para não esconder nada.',
  },
  bugs: [
    {
      id: 'pleno-t1-e02-b01',
      dificuldade: 1,
      sintoma: 'Depois de acrescentar uma mensagem própria para texto que não é número, o leitor de quantidades parou de compilar: `exception NumberFormatException has already been caught`.',
      codigo: `public class Leitura {
    static String ler(String texto) {
        try {
            return "lido " + Integer.parseInt(texto);
        } catch (IllegalArgumentException e) {
            return "argumento inválido";
        } catch (NumberFormatException e) {
            return "não é número: " + texto;
        }
    }

    public static void main(String[] args) {
        System.out.println(ler("42") + "; " + ler("4,2"));
    }
}`,
      linha: 7,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Leitura {
    static String ler(String texto) {
        try {
            return "lido " + Integer.parseInt(texto);
        } catch (NumberFormatException e) {
            return "não é número: " + texto;
        } catch (IllegalArgumentException e) {
            return "argumento inválido";
        }
    }

    public static void main(String[] args) {
        System.out.println(ler("42") + "; " + ler("4,2"));
    }
}`,
      saidaCorrigida: 'lido 42; não é número: 4,2',
      dica: 'Os `catch` são testados de cima para baixo. Uma `NumberFormatException` chegaria ao segundo?',
      explicacao:
        '`NumberFormatException` é subclasse de `IllegalArgumentException`, então o primeiro `catch` já pega todas elas, e o segundo nunca rodaria. O compilador recusa o `catch` inalcançável. Coloque sempre o mais específico antes do mais geral; a correção troca a ordem dos dois blocos.',
    },
    {
      id: 'pleno-t1-e02-b02',
      dificuldade: 2,
      sintoma: 'A tela de lançamento de notas mostra `ok` para as três notas, inclusive a vazia, que não foi gravada: `ok ok ok | gravadas: 2, chamadas: 0`.',
      codigo: `public class Gravacao {
    static int gravadas = 0;
    static int chamadas = 0;

    static String gravar(String nota) {
        try {
            if (nota.isBlank()) throw new IllegalArgumentException("nota vazia");
            gravadas++;
            return "gravada";
        } finally {
            return "ok";
        }
    }

    public static void main(String[] args) {
        for (String nota : new String[] {"9,5", " ", "7,0"}) {
            try {
                System.out.print(gravar(nota) + " ");
            } catch (IllegalArgumentException e) {
                System.out.print("erro (" + e.getMessage() + ") ");
            }
        }
        System.out.println("| gravadas: " + gravadas + ", chamadas: " + chamadas);
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'ok ok ok | gravadas: 2, chamadas: 0' },
      correcao: `public class Gravacao {
    static int gravadas = 0;
    static int chamadas = 0;

    static String gravar(String nota) {
        try {
            if (nota.isBlank()) throw new IllegalArgumentException("nota vazia");
            gravadas++;
            return "gravada";
        } finally {
            chamadas++;
        }
    }

    public static void main(String[] args) {
        for (String nota : new String[] {"9,5", " ", "7,0"}) {
            try {
                System.out.print(gravar(nota) + " ");
            } catch (IllegalArgumentException e) {
                System.out.print("erro (" + e.getMessage() + ") ");
            }
        }
        System.out.println("| gravadas: " + gravadas + ", chamadas: " + chamadas);
    }
}`,
      saidaCorrigida: 'gravada erro (nota vazia) gravada | gravadas: 2, chamadas: 3',
      dica: 'O que acontece com um `return` do `try`, ou com uma exceção que está subindo, quando o `finally` também tem um `return`?',
      explicacao:
        'Um `return` no `finally` substitui o retorno do `try` e engole a exceção pendente: a nota vazia lançou `IllegalArgumentException`, e quem chamou recebeu `ok`. O `javac -Xlint:finally` avisa com `finally clause cannot complete normally`. Use o `finally` só para limpeza, sem `return` nem `throw`.',
    },
    {
      id: 'pleno-t1-e02-b03',
      dificuldade: 3,
      sintoma: 'O relatório de vendas falha, e o log só diz `NullPointerException`, sem nenhuma pista do problema real: `falhou: NullPointerException`.',
      codigo: `public class Relatorio {
    static class Arquivo {
        final String nome;

        Arquivo(String nome) {
            if (nome.startsWith("/restrito")) throw new IllegalStateException("sem permissão para " + nome);
            this.nome = nome;
        }

        void fechar() {
            System.out.println("fechou " + nome);
        }
    }

    public static void main(String[] args) {
        Arquivo arquivo = null;
        try {
            try {
                arquivo = new Arquivo("/restrito/vendas.csv");
                System.out.println("gerando relatório");
            } finally {
                arquivo.fechar();
            }
        } catch (RuntimeException e) {
            System.out.println("falhou: " + e.getClass().getSimpleName());
        }
    }
}`,
      linha: 22,
      efeito: { tipo: 'saida', saida: 'falhou: NullPointerException' },
      correcao: `public class Relatorio {
    static class Arquivo {
        final String nome;

        Arquivo(String nome) {
            if (nome.startsWith("/restrito")) throw new IllegalStateException("sem permissão para " + nome);
            this.nome = nome;
        }

        void fechar() {
            System.out.println("fechou " + nome);
        }
    }

    public static void main(String[] args) {
        Arquivo arquivo = null;
        try {
            try {
                arquivo = new Arquivo("/restrito/vendas.csv");
                System.out.println("gerando relatório");
            } finally {
                if (arquivo != null) arquivo.fechar();
            }
        } catch (RuntimeException e) {
            System.out.println("falhou: " + e.getClass().getSimpleName());
        }
    }
}`,
      saidaCorrigida: 'falhou: IllegalStateException',
      dica: 'Se o construtor de `Arquivo` lançar, que valor tem `arquivo` quando o `finally` roda? E o que acontece com a exceção original?',
      explicacao:
        'O construtor lançou `IllegalStateException` antes da atribuição, e `arquivo` continuou `null`. No `finally`, `arquivo.fechar()` lançou uma `NullPointerException`, que **substituiu** a exceção original, perdida para sempre. Confira `null` antes de fechar, ou use o try com recursos, que guarda a exceção do fechamento como suprimida.',
    },
  ],
  exercicios: [
    {
      id: 'pleno-t1-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quando o bloco `finally` roda?',
      opcoes: [
        'Sempre que o `try` termina, com ou sem exceção, a não ser que a JVM seja encerrada antes',
        'Só quando há exceção',
        'Só quando não há exceção',
        'Só quando nenhum `catch` trata a exceção',
      ],
      resposta: 0,
      explicacao: 'Ele roda depois do `try` normal, depois de um `catch`, depois de um `return` e até quando a exceção não é tratada. `System.exit` é a exceção prática à regra.',
      dica: 'Pense no único jeito comum de impedir o `finally`.',
    },
    {
      id: 'pleno-t1-e02-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    public static void main(String[] args) {
        StringBuilder s = new StringBuilder();
        try {
            s.append("1");
            int x = 5 / 0;
            s.append("2");
        } catch (ArithmeticException e) {
            s.append("3");
        } finally {
            s.append("4");
        }
        s.append("5");
        System.out.println(s);
    }
}`,
      resposta: '1345',
      explicacao: 'A divisão por zero abandona o `try` antes do "2". O `catch` trata a exceção, o `finally` roda e o programa segue normalmente.',
      dica: 'Siga o fluxo: o `try` para na divisão. O que roda depois?',
    },
    {
      id: 'pleno-t1-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            Object o = "x";
            Integer i = (Integer) o;
        } catch (RuntimeException e) {
            System.out.println("runtime");
        } catch (ClassCastException e) {
            System.out.println("cast");
        }
    }
}`,
      opcoes: [
        'Não compila: o `catch` de `ClassCastException` é inalcançável',
        'Compila e imprime `runtime`',
        'Compila e imprime `cast`',
        'Compila e imprime as duas mensagens',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'Toda `ClassCastException` é uma `RuntimeException` e já seria pega pelo primeiro `catch`. O mais específico precisa vir antes.',
      dica: '`ClassCastException` é uma `RuntimeException`.',
    },
    {
      id: 'pleno-t1-e02-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static int f() {
        int x = 10;
        try {
            x += 5;
            return x;
        } finally {
            x *= 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
      opcoes: ['`15`', '`30`', '`10`', '`20`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O valor do `return` (15) é guardado antes de o `finally` rodar. Dobrar `x` depois não muda o que já foi decidido.',
      dica: 'O valor do `return` é fixado antes do `finally`.',
    },
    {
      id: 'pleno-t1-e02-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class T {
    @SuppressWarnings("finally")
    static String f() {
        try {
            throw new IllegalStateException("perdida");
        } finally {
            return "finally venceu";
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
      opcoes: [
        '`finally venceu`',
        'Lança `IllegalStateException`',
        'Imprime `perdida`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `return` no `finally` encerra o método normalmente, e a exceção pendente é descartada. É por isso que não se escreve `return` no `finally`.',
      dica: 'Um `return` no `finally` vence qualquer outra saída, inclusive uma exceção.',
    },
    {
      id: 'pleno-t1-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o bloco que sempre roda. O programa deve imprimir `usando` e depois `liberando`.',
      codigo: `public class Recurso {
    public static void main(String[] args) {
        try {
            System.out.println("usando");
        } ___ {
            System.out.println("liberando");
        }
    }
}`,
      respostas: ['finally'],
      saida: 'usando\nliberando',
      explicacao: 'Um `try` com `finally` e sem `catch` é válido: não trata nada, mas garante que a liberação aconteça.',
      dica: 'É o bloco que roda com ou sem exceção.',
    },
    {
      id: 'pleno-t1-e02-q07',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha em que o compilador acusa o erro.',
      codigo: `public class T {
    public static void main(String[] args) {
        int[] v = {1, 2};
        try {
            System.out.println(v[2]);
        }
        System.out.println("fim");
    }
}`,
      resposta: 4,
      explicacao: 'Um `try` sozinho não faz sentido: ele precisa de um `catch`, de um `finally` ou de recursos. O erro é acusado no próprio `try`.',
      dica: 'Um `try` sozinho, sem `catch` nem `finally`, é aceito?',
    },
    {
      id: 'pleno-t1-e02-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos compilam? Escolha três.',
      opcoes: [
        '`try { } finally { }`',
        '`try { } catch (Exception e) { }`',
        '`try { } catch (RuntimeException e) { } finally { }`',
        '`try { } finally { } catch (Exception e) { }`',
        '`try { } catch (Exception e) { } catch (RuntimeException e) { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'O `finally` vem sempre por último. E um `catch` de `RuntimeException` depois de um de `Exception` é inalcançável.',
      dica: 'Os `catch` vêm antes do `finally` e vão do específico para o geral.',
    },
    {
      id: 'pleno-t1-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            System.out.print("A");
            System.exit(0);
        } finally {
            System.out.print("B");
        }
    }
}`,
      opcoes: ['`A`', '`AB`', '`B`', 'Nada'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`System.exit` encerra a JVM na hora, e o `finally` nunca chega a rodar.',
      dica: 'O que `System.exit` faz com a JVM?',
    },
    {
      id: 'pleno-t1-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual exceção termina o programa?',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("do try");
        } finally {
            Object o = null;
            o.toString();
        }
    }
}`,
      opcoes: [
        '`NullPointerException`',
        '`IllegalArgumentException`',
        'As duas, encadeadas',
        'Nenhuma: o `finally` trata a do `try`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'A exceção do `finally` substitui a que estava subindo. A `IllegalArgumentException` se perde, sem nem aparecer como suprimida.',
      dica: 'Uma exceção lançada no `finally` substitui a que estava subindo.',
    },
    {
      id: 'pleno-t1-e02-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num `try` com vários `catch` e um `finally`, onde fica o `finally`?',
      opcoes: ['Depois de todos os `catch`', 'Antes dos `catch`', 'Entre quaisquer dois `catch`', 'Dentro do último `catch`'],
      resposta: 0,
      explicacao: 'A sequência é fixa: `try`, os `catch` na ordem do mais específico ao mais geral, e o `finally` no fim.',
      dica: 'A ordem dos blocos é fixa.',
    },
    {
      id: 'pleno-t1-e02-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class T {
    public static void main(String[] args) {
        try {
            try {
                System.out.print("a");
                throw new RuntimeException();
            } finally {
                System.out.print("b");
            }
        } catch (RuntimeException e) {
            System.out.print("c");
        } finally {
            System.out.print("d");
        }
        System.out.println("e");
    }
}`,
      resposta: 'abcde',
      explicacao: 'O `try` interno não trata a exceção, mas o `finally` dele roda antes de ela subir. O `catch` externo trata, o `finally` externo roda, e o programa segue.',
      dica: 'O `finally` de dentro roda antes de a exceção chegar ao `catch` de fora.',
    },
    {
      id: 'pleno-t1-e02-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class T {
    static int[] f() {
        int[] v = {1};
        try {
            return v;
        } finally {
            v[0] = 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(f()[0]);
    }
}`,
      opcoes: ['`2`', '`1`', 'Não compila', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `return` guarda a referência do array antes do `finally`. O `finally` altera o conteúdo desse mesmo array, e quem chamou vê a mudança.',
      dica: 'O `return` guardou a referência para o array, e não uma cópia dele.',
    },
    {
      id: 'pleno-t1-e02-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais situações o `finally` não roda até o fim? Escolha duas.',
      opcoes: [
        '`System.exit` chamado dentro do `try`',
        'A JVM é encerrada à força, por exemplo pelo sistema operacional',
        'Um `return` dentro do `try`',
        'Uma exceção que nenhum `catch` trata',
        'Um `break` que sai de um laço de dentro do `try`',
      ],
      respostas: [0, 1],
      explicacao: '`return`, `break`, `continue` e exceções não tratadas passam pelo `finally` antes de sair. Só o encerramento da JVM o impede.',
      dica: 'Em quais casos a JVM deixa de existir antes do `finally`?',
    },
    {
      id: 'pleno-t1-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como o `javac` compila um bloco `finally`?',
      opcoes: [
        'Copiando o código dele para cada caminho de saída, mais um tratador que pega qualquer exceção, roda o bloco e relança',
        'Com uma instrução própria da JVM chamada `finally`',
        'Como um método separado chamado no fim do `try`',
        'Com as instruções `jsr` e `ret`, usadas até hoje',
      ],
      resposta: 0,
      explicacao: 'A duplicação substituiu o antigo `jsr`/`ret`, proibido nos arquivos de classe desde o Java 7 por complicar a verificação do bytecode.',
      dica: 'A JVM não tem uma instrução própria para o `finally`.',
    },
  ],
};

export default episodio;
