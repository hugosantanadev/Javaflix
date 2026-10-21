import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t1-e06',
  minutos: 16,
  aula,
  armadilhas: [
    '`ScopedValue` não tem `set`: para mudar o valor num trecho, faz-se uma associação aninhada com `where(...).run(...)`.',
    '`get()` sem associação lança `NoSuchElementException`; `isBound()` e `orElse` evitam a exceção.',
    'A associação termina com o `run` ou o `call`, mesmo quando sai por exceção.',
    'Threads criadas com `new Thread` ou `Thread.ofVirtual()` não herdam scoped values; só as subtarefas de `StructuredTaskScope` herdam.',
    'Um `ThreadLocal` sem `remove()` vaza o valor para a próxima tarefa da mesma thread de pool.',
    'No Java 25, `ScopedValue` é definitivo; `StructuredTaskScope` ainda é preview e exige `--enable-preview`.',
    'No `StructuredTaskScope.open()`, a primeira falha cancela as outras subtarefas e o `join()` lança `FailedException`.',
  ],
  recursos: [
    {
      titulo: 'JEP 506: Scoped Values',
      url: 'https://openjdk.org/jeps/506',
      tipo: 'documentacao',
      porque: 'A proposta definitiva do Java 25, com a comparação detalhada entre scoped values e `ThreadLocal`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 505: Structured Concurrency (Fifth Preview)',
      url: 'https://openjdk.org/jeps/505',
      tipo: 'documentacao',
      porque: 'A motivação da concorrência estruturada e a API redesenhada do Java 25, com `open` e os `Joiner`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Scoped Values (Core Libraries, Java 25)',
      url: 'https://docs.oracle.com/en/java/javase/25/core/scoped-values.html',
      tipo: 'documentacao',
      porque: 'O guia oficial, com associação, reassociação e herança de valores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Structured Concurrency (Core Libraries, Java 25)',
      url: 'https://docs.oracle.com/en/java/javase/25/core/structured-concurrency.html',
      tipo: 'documentacao',
      porque: 'Exemplos oficiais de escopos e políticas de término com a API de preview.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.ScopedValue',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ScopedValue.html',
      tipo: 'documentacao',
      porque: '`where`, `run`, `call`, `get`, `isBound` e `orElse`, com as regras de herança.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.concurrent.StructuredTaskScope',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/StructuredTaskScope.html',
      tipo: 'documentacao',
      porque: 'Os `Joiner` prontos, o cancelamento e as regras de confinamento das subtarefas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Scoped Values in Java',
      url: 'https://www.baeldung.com/java-20-scoped-values',
      tipo: 'artigo',
      porque: 'A troca de `ThreadLocal` por `ScopedValue` num exemplo de servidor, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: An Introduction to ThreadLocal in Java',
      url: 'https://www.baeldung.com/java-threadlocal',
      tipo: 'artigo',
      porque: 'O uso clássico de `ThreadLocal` e o vazamento entre tarefas de um pool, que os scoped values evitam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Scoped Values in Java 24 (Inside Java Newscast #86)',
      url: 'https://www.youtube.com/watch?v=7tfUJLUbZiM',
      tipo: 'video',
      porque: 'Nicolai Parlog, da Oracle, apresenta a API praticamente final dos scoped values.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Structured Concurrency Revamp in Java 25 (Inside Java Newscast #91)',
      url: 'https://www.youtube.com/watch?v=vLJDPmXufQw',
      tipo: 'video',
      porque: 'O que mudou na `StructuredTaskScope` do Java 25 e como usar os `Joiner`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devoxx: Loom in JDK 25, Virtual Threads, Structured Concurrency and Scoped Values (Rémi Forax e José Paumard)',
      url: 'https://www.youtube.com/watch?v=962JVfxyuTk',
      tipo: 'video',
      porque: 'As três peças do Projeto Loom juntas, com exemplos longos e o funcionamento interno.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
  ],
  desafio: {
    titulo: 'Contexto da requisição',
    enunciado:
      'Um serviço de pedidos registra logs com o id da requisição e o usuário, sem passar esses dados por parâmetro. Crie `record Contexto(String id, String usuario)` e dois scoped values: `CONTEXTO` e `LOG`, uma `List<String>` onde cada requisição acumula suas linhas. Escreva `log(mensagem)`, que adiciona `[id] usuario: mensagem` ao `LOG`; `calcularFrete(cep)`, que registra o cálculo e devolve 15 para CEPs que começam com `0` e 30 para os outros; e `auditar()`, que registra `pedido conferido` em nome do usuário `auditoria`, sem mudar o contexto de quem a chamou. Atenda as requisições `r1` (ana, CEP `01310-100`) e `r2` (bruno, CEP `88015-200`), cada uma numa thread virtual, e imprima as linhas de cada uma em ordem. A saída deve ser:\n\n```text\n[r1] ana: pedido recebido\n[r1] ana: calculando frete para 01310-100\n[r1] auditoria: pedido conferido\n[r1] ana: frete de 15 reais\n[r2] bruno: pedido recebido\n[r2] bruno: calculando frete para 88015-200\n[r2] auditoria: pedido conferido\n[r2] bruno: frete de 30 reais\nfora de requisição: false\n```',
    dicas: [
      '`ScopedValue.where(CONTEXTO, contexto).where(LOG, linhas).run(...)` associa os dois de uma vez.',
      'Em `auditar`, uma associação aninhada de `CONTEXTO` vale só durante o `log` da auditoria.',
      'Associe os valores dentro da tarefa de cada thread virtual: threads criadas à mão não herdam associações.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Requisicoes {
    record Contexto(String id, String usuario) {}

    static final ScopedValue<Contexto> CONTEXTO = ScopedValue.newInstance();
    static final ScopedValue<List<String>> LOG = ScopedValue.newInstance();

    static void log(String mensagem) {
        Contexto c = CONTEXTO.get();
        LOG.get().add("[" + c.id() + "] " + c.usuario() + ": " + mensagem);
    }

    static int calcularFrete(String cep) {
        log("calculando frete para " + cep);
        return cep.startsWith("0") ? 15 : 30;
    }

    static void auditar() {
        Contexto atual = CONTEXTO.get();
        ScopedValue.where(CONTEXTO, new Contexto(atual.id(), "auditoria")).run(() -> log("pedido conferido"));
    }

    static List<String> atender(Contexto contexto, String cep) {
        List<String> linhas = new ArrayList<>();
        ScopedValue.where(CONTEXTO, contexto).where(LOG, linhas).run(() -> {
            log("pedido recebido");
            int frete = calcularFrete(cep);
            auditar();
            log("frete de " + frete + " reais");
        });
        return linhas;
    }

    public static void main(String[] args) throws Exception {
        List<Future<List<String>>> futuros = new ArrayList<>();
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            futuros.add(executor.submit(() -> atender(new Contexto("r1", "ana"), "01310-100")));
            futuros.add(executor.submit(() -> atender(new Contexto("r2", "bruno"), "88015-200")));
        }
        for (Future<List<String>> f : futuros) {
            f.get().forEach(System.out::println);
        }
        System.out.println("fora de requisição: " + CONTEXTO.isBound());
    }
}`,
    saida: '[r1] ana: pedido recebido\n[r1] ana: calculando frete para 01310-100\n[r1] auditoria: pedido conferido\n[r1] ana: frete de 15 reais\n[r2] bruno: pedido recebido\n[r2] bruno: calculando frete para 88015-200\n[r2] auditoria: pedido conferido\n[r2] bruno: frete de 30 reais\nfora de requisição: false',
    comentarios:
      'As duas requisições rodam ao mesmo tempo, cada uma com o seu contexto, e nenhuma enxerga o da outra: a associação pertence à thread que a fez. `calcularFrete` e `auditar` não recebem o contexto por parâmetro, mas o leem de onde estiverem. A auditoria troca o usuário só durante a própria linha de log, e a seguinte volta a ser da ana, sem nenhum código para restaurar. O `LOG` mostra que a imutabilidade é da associação, não do objeto: a lista é sempre a mesma, mas recebe linhas.',
  },
  exercicios: [
    {
      id: 'senior-t1-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static final ScopedValue<String> X = ScopedValue.newInstance();

    public static void main(String[] args) {
        ScopedValue.where(X, "a").run(() -> {
            System.out.print(X.get());
            ScopedValue.where(X, "b").run(() -> System.out.print(X.get()));
            System.out.println(X.get());
        });
    }
}`,
      opcoes: ['`aba`', '`abb`', '`aaa`', 'Lança exceção: `X` já estava associado'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A associação aninhada vale só dentro do `run` interno. Quando ele termina, `X` volta a valer `"a"`.',
    },
    {
      id: 'senior-t1-e06-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    static final ScopedValue<String> X = ScopedValue.newInstance();

    public static void main(String[] args) {
        ScopedValue.where(X, "a").run(() -> System.out.println(X.get()));
        System.out.println(X.get());
    }
}`,
      opcoes: [
        'Imprime `a` e lança `NoSuchElementException`',
        'Imprime `a` duas vezes',
        'Imprime `a` e `null`',
        'Lança `NoSuchElementException` sem imprimir nada',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException', saida: 'a' },
      explicacao: 'Fora do `run`, `X` não está associado. `get()` não devolve `null`: lança exceção.',
    },
    {
      id: 'senior-t1-e06-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static final ScopedValue<String> X = ScopedValue.newInstance();

    public static void main(String[] args) {
        System.out.print(X.orElse("padrão") + " ");
        ScopedValue.where(X, "definido").run(() -> System.out.println(X.orElse("padrão")));
    }
}`,
      opcoes: ['`padrão definido`', '`padrão padrão`', '`null definido`', 'Lança `NoSuchElementException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`orElse` devolve a alternativa quando não há associação e o valor associado quando há.',
    },
    {
      id: 'senior-t1-e06-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static final ScopedValue<String> X = ScopedValue.newInstance();

    public static void main(String[] args) {
        try {
            ScopedValue.where(X, "a").run(() -> {
                System.out.print(X.isBound() + " ");
                throw new IllegalStateException("erro");
            });
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage() + " " + X.isBound());
        }
    }
}`,
      opcoes: ['`true erro false`', '`true erro true`', '`false erro false`', '`true` e a exceção sai do `main`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A exceção atravessa o `run` normalmente, e a associação é desfeita mesmo assim. Não há como ela sobreviver ao bloco.',
    },
    {
      id: 'senior-t1-e06-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static final ScopedValue<String> X = ScopedValue.newInstance();

    public static void main(String[] args) {
        ScopedValue.where(X, "a").run(() -> {
            Thread t = new Thread(() -> System.out.print(X.isBound() + " "));
            t.start();
            try {
                t.join();
            } catch (InterruptedException e) {
                return;
            }
            System.out.println(X.isBound());
        });
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Associações pertencem à thread que as fez. Uma thread criada à mão começa sem nenhuma; só as subtarefas de `StructuredTaskScope` herdam.',
    },
    {
      id: 'senior-t1-e06-q06',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    static final ScopedValue<Integer> A = ScopedValue.newInstance();
    static final ScopedValue<Integer> B = ScopedValue.newInstance();

    static int produto() {
        return A.get() * B.get();
    }

    public static void main(String[] args) {
        int r = ScopedValue.where(A, 4).where(B, 5).call(Teste::produto);
        int s = ScopedValue.where(A, 4).where(B, 5).call(() -> ScopedValue.where(A, 1).call(Teste::produto));
        System.out.println(r + " " + s);
    }
}`,
      resposta: '20 5',
      explicacao: '`call` devolve o resultado da operação. No segundo cálculo, a associação interna troca só `A`, e `B` continua valendo 5.',
    },
    {
      id: 'senior-t1-e06-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que associa um valor ao scoped value. O programa deve imprimir `ana`.',
      codigo: `public class Sessao {
    static final ScopedValue<String> USUARIO = ScopedValue.newInstance();

    public static void main(String[] args) {
        ScopedValue.___(USUARIO, "ana").run(() -> System.out.println(USUARIO.get()));
    }
}`,
      respostas: ['where'],
      saida: 'ana',
      explicacao: '`where` prepara a associação, e `run` executa a lambda com ela ativa.',
    },
    {
      id: 'senior-t1-e06-q08',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    static final ScopedValue<String> X = ScopedValue.newInstance();

    public static void main(String[] args) {
        ScopedValue.where(X, "a").run(() -> {
            System.out.println(X.get());
            X.set("b");
            System.out.println(X.get());
        });
    }
}`,
      resposta: 7,
      explicacao: '`ScopedValue` não tem `set`. Para usar outro valor num trecho, faz-se uma associação aninhada.',
    },
    {
      id: 'senior-t1-e06-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `ScopedValue` no Java 25 são verdadeiras? Escolha duas.',
      opcoes: [
        'A associação termina sozinha quando o `run` ou o `call` acaba',
        'Um código chamado dentro do `run` não pode trocar o valor para quem o chamou',
        'É preciso chamar `remove()` no fim para evitar vazamentos',
        'Threads criadas com `new Thread` dentro do `run` herdam o valor',
        'Só compila com `--enable-preview`',
      ],
      respostas: [0, 1],
      explicacao: 'Sem `set`, ninguém altera a associação de quem chamou; no máximo, cria uma aninhada que vale só para si. Não existe `remove()`, a herança vale só para `StructuredTaskScope`, e a API é definitiva no 25.',
    },
    {
      id: 'senior-t1-e06-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.concurrent.*;

public class Teste {
    static final ThreadLocal<Integer> CONTADOR = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        for (int i = 0; i < 3; i++) {
            pool.submit(() -> CONTADOR.set(CONTADOR.get() + 1)).get();
        }
        System.out.println(pool.submit(() -> CONTADOR.get()).get() + " " + CONTADOR.get());
        pool.shutdown();
    }
}`,
      resposta: '3 0',
      explicacao: 'As quatro tarefas rodam na mesma thread do pool, e o valor de uma fica para a próxima. A thread `main` tem o seu próprio valor, que nunca saiu do inicial.',
    },
    {
      id: 'senior-t1-e06-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que `InheritableThreadLocal` pesa num programa com milhões de threads virtuais?',
      opcoes: [
        'Cada thread criada recebe uma cópia dos valores da thread mãe',
        'Ele impede a desmontagem das threads virtuais',
        'Ele só funciona com threads de plataforma e lança exceção nas virtuais',
        'Ele obriga as threads a rodarem em sequência',
      ],
      resposta: 0,
      explicacao: 'A herança copia um mapa a cada thread criada. Scoped values compartilham uma estrutura imutável, sem cópia.',
    },
    {
      id: 'senior-t1-e06-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num escopo aberto com `StructuredTaskScope.open()`, três subtarefas foram criadas com `fork`. A segunda lança exceção enquanto as outras ainda rodam. O que acontece?',
      opcoes: [
        'As outras são canceladas, e `join()` lança `FailedException` com a exceção como causa',
        'As outras continuam até o fim, e `join()` devolve normalmente',
        '`join()` devolve `null` para a subtarefa que falhou',
        'A exceção é impressa no erro padrão e ignorada',
      ],
      resposta: 0,
      explicacao: 'A política padrão é "todas ou nenhuma": uma falha torna inútil o trabalho das outras, que são interrompidas.',
    },
    {
      id: 'senior-t1-e06-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que devolve o `join()` de um escopo aberto com `StructuredTaskScope.open(Joiner.anySuccessfulResultOrThrow())`?',
      opcoes: [
        'O resultado da primeira subtarefa que terminar com sucesso',
        'Uma lista com o resultado de todas as subtarefas',
        'O resultado da primeira subtarefa criada com `fork`',
        'Sempre `null`; os resultados ficam nas `Subtask`',
      ],
      resposta: 0,
      explicacao: 'É o equivalente estruturado do `invokeAny`: as subtarefas restantes são canceladas assim que uma tem sucesso.',
    },
    {
      id: 'senior-t1-e06-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um arquivo usa `StructuredTaskScope` e é compilado com `javac --release 25 Painel.java`. Qual é o resultado?',
      opcoes: [
        'Erro: `StructuredTaskScope` é uma API de preview, desativada por padrão',
        'Compila sem avisos',
        'Compila, mas lança `UnsupportedOperationException` ao rodar',
        'Erro: a classe só existe a partir do Java 26',
      ],
      resposta: 0,
      explicacao: 'No Java 25, a concorrência estruturada está na quinta preview. É preciso `--enable-preview` tanto no `javac` quanto no `java`.',
    },
    {
      id: 'senior-t1-e06-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dentro de `ScopedValue.where(USUARIO, "ana").run(...)`, uma subtarefa criada com `escopo.fork(...)` de uma `StructuredTaskScope` chama `USUARIO.get()`. O que obtém?',
      opcoes: [
        '`"ana"`, porque as subtarefas herdam as associações de quem as criou',
        '`null`, porque a subtarefa roda em outra thread',
        'Uma `NoSuchElementException`, como em qualquer thread nova',
        'Um erro de compilação: scoped values não podem ser lidos em subtarefas',
      ],
      resposta: 0,
      explicacao: 'A herança automática é exclusiva da concorrência estruturada, porque ela garante que as subtarefas terminam antes de a associação acabar.',
    },
  ],
};

export default episodio;
