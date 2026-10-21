import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t6-e03',
  minutos: 18,
  aula,
  armadilhas: [
    'Misturar matchers com valores, como `reservar(anyString(), 1)`, lança `InvalidUseOfMatchersException`: use `eq(1)`.',
    'Com a `MockitoExtension`, configurar uma resposta que o teste não usa lança `UnnecessaryStubbingException`.',
    'Mock sem configuração não lança erro: devolve `false`, zero, `null`, `Optional.empty()` ou coleções vazias.',
    'Quando duas configurações servem para a mesma chamada, vale a mais recente: configure o caso geral antes do específico.',
    '`ArgumentCaptor.getValue()` devolve o último valor capturado; para todos, `getAllValues()`.',
    'Verificar cada chamada interna amarra o teste à implementação, e ele quebra a cada refatoração.',
    'No JDK 21 em diante, sem o agente configurado no Surefire, o Mockito se anexa sozinho e avisa que isso vai deixar de funcionar.',
  ],
  ia: {
    uso:
      'Em testes com Mockito, a IA economiza a parte mecânica: os campos `@Mock`, as configurações com `when` e os `verify`. O risco é ela mockar demais e escrever um teste que só repete a implementação, linha por linha. Diga no pedido o que é dependência e o que é objeto de valor.',
    pedido:
      'Escreva testes de unidade com JUnit 6 e Mockito 5 para o CheckoutService abaixo.\n- Mocke só as dependências (Estoque, Pedidos, Notificador); use um Carrinho real.\n- Cubra: compra com estoque, produto sem estoque (não salva nem notifica) e salvar antes de notificar.\n- Use @ExtendWith(MockitoExtension.class) e não configure respostas que o teste não usa.\n- Verifique só as interações que são o objetivo do serviço, não cada chamada interna.\n- Use e-mails fictícios, como ana@exemplo.com.\n\n<cole aqui o serviço e as interfaces>',
    erros: [
      'Mocka objetos de valor, como o carrinho, e às vezes a própria classe testada.',
      'Mistura matchers com valores, como `reservar(anyString(), 1)`, que lança `InvalidUseOfMatchersException`.',
      'Usa APIs antigas: `@MockBean`, que não existe no Spring Boot 4, ou `MockitoAnnotations.initMocks`, obsoleto, no lugar da `MockitoExtension`.',
      'Escreve um `verify` para cada linha do método, amarrando o teste à implementação.',
    ],
    conferir: [
      'Rode com a `MockitoExtension`: o modo estrito acusa configurações sem uso.',
      'Mude a implementação sem mudar o comportamento: o teste deve continuar passando.',
      'Inverta uma regra de propósito, como notificar sem estoque, e veja o teste falhar.',
    ],
  },
  recursos: [
    {
      titulo: 'Javadoc do Mockito',
      url: 'https://javadoc.io/doc/org.mockito/mockito-core/latest/org.mockito/org/mockito/Mockito.html',
      tipo: 'documentacao',
      porque: 'A documentação oficial do Mockito fica no próprio Javadoc da classe `Mockito`, com uma seção numerada para cada recurso, inclusive a do agente.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: MockitoExtension',
      url: 'https://javadoc.io/doc/org.mockito/mockito-junit-jupiter/latest/org.mockito.junit.jupiter/org/mockito/junit/jupiter/MockitoExtension.html',
      tipo: 'documentacao',
      porque: 'A integração com o JUnit, o modo estrito e como mudar a rigidez com `@MockitoSettings`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Site do Mockito',
      url: 'https://site.mockito.org/',
      tipo: 'documentacao',
      porque: 'Primeiros passos, perguntas frequentes e as mudanças de cada versão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Martin Fowler: Mocks Aren't Stubs",
      url: 'https://martinfowler.com/articles/mocksArentStubs.html',
      tipo: 'artigo',
      porque: 'O artigo clássico sobre verificar estado ou comportamento, e as duas escolas de testes com dublês.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Martin Fowler: Test Double',
      url: 'https://martinfowler.com/bliki/TestDouble.html',
      tipo: 'artigo',
      porque: 'Os tipos de dublê, de *dummy* a *mock*, definidos em uma página.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Fernanda Kipper: Começando com testes unitários no Java Spring, JUnit e Mockito',
      url: 'https://www.youtube.com/watch?v=T6ChO8LQxRE',
      tipo: 'video',
      porque: 'Testes de um serviço Spring com mocks, do zero, num dos canais de Java mais vistos do Brasil, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Javanauta: Testes unitários com JUnit 5 e Mockito, passo a passo',
      url: 'https://www.youtube.com/watch?v=rVSwDX9KUt8',
      tipo: 'video',
      porque: 'Mocks, configuração de respostas e verificações num projeto real, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Matheus do Java: Testes unitários com JUnit e Mockito',
      url: 'https://www.youtube.com/watch?v=rBdPPHq7REw',
      tipo: 'video',
      porque: 'Uma introdução direta ao Mockito, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Matchers de argumentos',
    enunciado:
      'Estenda um mock feito com `java.lang.reflect.Proxy` para aceitar matchers, com a mesma regra do Mockito. Os métodos `qualquerTexto()`, `igual(valor)` e `menorOuIgual(limite)` guardam uma condição numa lista de pendentes e devolvem um valor qualquer. Cada chamada ao mock anota os matchers pendentes como parte da "última chamada" e limpa a lista. O `quando(...)` configura a última chamada: sem matchers, cada argumento é comparado com `equals`; com matchers, eles precisam ser exatamente tantos quanto os argumentos, ou o erro é `Invalid use of argument matchers! 2 matchers expected, 1 recorded`. Ao responder, a configuração mais recente que serve vence. A saída deve ser:\n\n```text\nreservar(Teclado, 1): true\nreservar(Mouse, 5): true\nreservar(Mouse, 6): false\nreservar(Monitor, 2): true\nreservar(Teclado, 2): false\nInvalid use of argument matchers! 2 matchers expected, 1 recorded\n```',
    dicas: [
      'Os matchers são executados antes da chamada ao mock, porque são argumentos dela: quando o mock é chamado, os pendentes já estão na lista.',
      'Guarde as condições como `Predicate<Object>`.',
      'Para que a configuração mais recente vença, percorra as respostas do fim para o começo.',
      'Em `quando(estoque.reservar(qualquerTexto(), 1))`, só um matcher foi registrado para dois argumentos.',
    ],
    solucao: `import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Predicate;

public class Matchers {
    record Resposta(Method metodo, List<Predicate<Object>> condicoes, Object valor) {}

    record Chamada(Method metodo, Object[] argumentos, List<Predicate<Object>> matchers) {}

    interface Configuracao<T> {
        void entaoRetorna(T valor);
    }

    static final List<Predicate<Object>> pendentes = new ArrayList<>();
    static final List<Resposta> respostas = new ArrayList<>();
    static Chamada ultima;

    static String qualquerTexto() {
        pendentes.add(a -> a instanceof String);
        return "";
    }

    static int igual(int esperado) {
        pendentes.add(a -> Objects.equals(a, esperado));
        return 0;
    }

    static String igual(String esperado) {
        pendentes.add(a -> Objects.equals(a, esperado));
        return "";
    }

    static int menorOuIgual(int limite) {
        pendentes.add(a -> a instanceof Integer i && i <= limite);
        return 0;
    }

    static Object padrao(Class<?> tipo) {
        if (tipo == boolean.class) return false;
        if (tipo == int.class) return 0;
        return null;
    }

    @SuppressWarnings("unchecked")
    static <T> T mock(Class<T> tipo) {
        return (T) Proxy.newProxyInstance(tipo.getClassLoader(), new Class<?>[] {tipo}, (proxy, metodo, args) -> {
            ultima = new Chamada(metodo, args, new ArrayList<>(pendentes));
            pendentes.clear();
            for (int i = respostas.size() - 1; i >= 0; i--) {
                Resposta r = respostas.get(i);
                if (!r.metodo().equals(metodo)) continue;
                boolean todas = true;
                for (int j = 0; j < args.length; j++) {
                    if (!r.condicoes().get(j).test(args[j])) todas = false;
                }
                if (todas) return r.valor();
            }
            return padrao(metodo.getReturnType());
        });
    }

    static <T> Configuracao<T> quando(T ignorado) {
        Chamada c = ultima;
        List<Predicate<Object>> condicoes = new ArrayList<>();
        if (c.matchers().isEmpty()) {
            for (Object argumento : c.argumentos()) condicoes.add(a -> Objects.equals(a, argumento));
        } else if (c.matchers().size() != c.argumentos().length) {
            throw new IllegalStateException("Invalid use of argument matchers! " + c.argumentos().length
                    + " matchers expected, " + c.matchers().size() + " recorded");
        } else {
            condicoes.addAll(c.matchers());
        }
        return valor -> respostas.add(new Resposta(c.metodo(), condicoes, valor));
    }

    interface Estoque {
        boolean reservar(String produto, int quantidade);
    }

    public static void main(String[] args) {
        Estoque estoque = mock(Estoque.class);
        quando(estoque.reservar(qualquerTexto(), igual(1))).entaoRetorna(true);
        quando(estoque.reservar(igual("Mouse"), menorOuIgual(5))).entaoRetorna(true);
        quando(estoque.reservar("Monitor", 2)).entaoRetorna(true);

        System.out.println("reservar(Teclado, 1): " + estoque.reservar("Teclado", 1));
        System.out.println("reservar(Mouse, 5): " + estoque.reservar("Mouse", 5));
        System.out.println("reservar(Mouse, 6): " + estoque.reservar("Mouse", 6));
        System.out.println("reservar(Monitor, 2): " + estoque.reservar("Monitor", 2));
        System.out.println("reservar(Teclado, 2): " + estoque.reservar("Teclado", 2));
        try {
            quando(estoque.reservar(qualquerTexto(), 1)).entaoRetorna(true);
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    saida: 'reservar(Teclado, 1): true\nreservar(Mouse, 5): true\nreservar(Mouse, 6): false\nreservar(Monitor, 2): true\nreservar(Teclado, 2): false\nInvalid use of argument matchers! 2 matchers expected, 1 recorded',
    comentarios:
      'Este é exatamente o motivo do erro mais estranho do Mockito: um `anyString()` não tem como saber em que posição foi usado, porque é só um método que roda antes da chamada e devolve um valor de mentira. O Mockito conta quantos matchers foram registrados e compara com o número de argumentos. Um valor literal, como o `1`, não registra nada, e a conta não fecha. O `eq(1)` registra, e por isso resolve. Os valores de mentira também explicam outro detalhe: `any()` devolve `null`, e usar um matcher fora de um `when` ou `verify`, como num cálculo, deixa um registro pendente que estoura na próxima configuração.',
  },
  bugs: [
    {
      id: 'backend-junior-t6-e03-b01',
      dificuldade: 1,
      sintoma: 'O teste usa um estoque falso que nega o mouse e espera a compra recusada, mas o pedido sai confirmado.',
      codigo: `import java.util.List;

public class CheckoutTeste {
    interface Estoque { boolean reservar(String produto); }

    static String finalizar(List<String> produtos, Estoque estoque) {
        for (String p : produtos) {
            estoque.reservar(p);
        }
        return "pedido confirmado";
    }

    public static void main(String[] args) {
        Estoque semMouse = produto -> !produto.equals("Mouse sem fio");
        try {
            System.out.println(finalizar(List.of("Teclado mecânico", "Mouse sem fio"), semMouse));
        } catch (IllegalStateException e) {
            System.out.println("recusado: " + e.getMessage());
        }
    }
}`,
      linha: 8,
      efeito: { tipo: 'saida', saida: 'pedido confirmado' },
      correcao: `import java.util.List;

public class CheckoutTeste {
    interface Estoque { boolean reservar(String produto); }

    static String finalizar(List<String> produtos, Estoque estoque) {
        for (String p : produtos) {
            if (!estoque.reservar(p)) throw new IllegalStateException("sem estoque: " + p);
        }
        return "pedido confirmado";
    }

    public static void main(String[] args) {
        Estoque semMouse = produto -> !produto.equals("Mouse sem fio");
        try {
            System.out.println(finalizar(List.of("Teclado mecânico", "Mouse sem fio"), semMouse));
        } catch (IllegalStateException e) {
            System.out.println("recusado: " + e.getMessage());
        }
    }
}`,
      saidaCorrigida: 'recusado: sem estoque: Mouse sem fio',
      dica: 'O estoque responde se conseguiu reservar. Alguém está ouvindo essa resposta?',
      explicacao: 'O serviço chamava a reserva e jogava a resposta fora. O dublê de teste fez o caso "sem estoque" acontecer sob controle, coisa difícil de provocar com o estoque de verdade. É para isso que dublês servem.',
    },
    {
      id: 'backend-junior-t6-e03-b02',
      dificuldade: 2,
      sintoma: 'Com o repositório falso em memória, dois pedidos diferentes ganham o mesmo id, e o primeiro some.',
      codigo: `import java.util.LinkedHashMap;
import java.util.Map;

public class PedidosFalsos {
    static class PedidosEmMemoria {
        final Map<Long, String> dados = new LinkedHashMap<>();
        long proximoId = 1;

        long salvar(String email) {
            dados.put(proximoId, email);
            return proximoId;
        }
    }

    public static void main(String[] args) {
        PedidosEmMemoria pedidos = new PedidosEmMemoria();
        long a = pedidos.salvar("ana@exemplo.com");
        long b = pedidos.salvar("bruno@exemplo.com");
        System.out.println(a + " " + b + " " + pedidos.dados);
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: '1 1 {1=bruno@exemplo.com}' },
      correcao: `import java.util.LinkedHashMap;
import java.util.Map;

public class PedidosFalsos {
    static class PedidosEmMemoria {
        final Map<Long, String> dados = new LinkedHashMap<>();
        long proximoId = 1;

        long salvar(String email) {
            dados.put(proximoId, email);
            return proximoId++;
        }
    }

    public static void main(String[] args) {
        PedidosEmMemoria pedidos = new PedidosEmMemoria();
        long a = pedidos.salvar("ana@exemplo.com");
        long b = pedidos.salvar("bruno@exemplo.com");
        System.out.println(a + " " + b + " " + pedidos.dados);
    }
}`,
      saidaCorrigida: '1 2 {1=ana@exemplo.com, 2=bruno@exemplo.com}',
      dica: 'Siga o valor de `proximoId` nas duas chamadas a `salvar`. Ele muda em algum momento?',
      explicacao: 'O fake nunca avançava a sequência, então a segunda gravação sobrescreveu a primeira no mapa. O pós-incremento devolve o valor atual e só então soma um. Um fake também é código, e precisa estar certo, ou os testes que dependem dele passam a mentir.',
    },
    {
      id: 'backend-junior-t6-e03-b03',
      dificuldade: 3,
      sintoma: 'O teste com um mock feito à mão lança `NullPointerException` antes de qualquer asserção.',
      codigo: `import java.lang.reflect.Proxy;
import java.util.Optional;

public class MockCaseiro {
    interface Clientes { Optional<String> nomePorEmail(String email); }

    @SuppressWarnings("unchecked")
    static <T> T mock(Class<T> tipo) {
        return (T) Proxy.newProxyInstance(tipo.getClassLoader(), new Class<?>[] {tipo},
                (proxy, metodo, args) -> null);
    }

    public static void main(String[] args) {
        Clientes clientes = mock(Clientes.class);
        String saudacao = clientes.nomePorEmail("ana@exemplo.com").map(n -> "Olá, " + n).orElse("Olá, visitante");
        System.out.println(saudacao);
    }
}`,
      linha: 10,
      efeito: { tipo: 'excecao', nome: 'NullPointerException' },
      correcao: `import java.lang.reflect.Proxy;
import java.util.Optional;

public class MockCaseiro {
    interface Clientes { Optional<String> nomePorEmail(String email); }

    @SuppressWarnings("unchecked")
    static <T> T mock(Class<T> tipo) {
        return (T) Proxy.newProxyInstance(tipo.getClassLoader(), new Class<?>[] {tipo},
                (proxy, metodo, args) -> metodo.getReturnType() == Optional.class ? Optional.empty() : null);
    }

    public static void main(String[] args) {
        Clientes clientes = mock(Clientes.class);
        String saudacao = clientes.nomePorEmail("ana@exemplo.com").map(n -> "Olá, " + n).orElse("Olá, visitante");
        System.out.println(saudacao);
    }
}`,
      saidaCorrigida: 'Olá, visitante',
      dica: 'A exceção estoura numa chamada encadeada. Qual valor o mock devolve para um método que promete um `Optional`?',
      explicacao: 'Um método que devolve `Optional` nunca deveria devolver `null`, e o mock caseiro devolvia `null` para tudo. O Mockito resolve isso com valores padrão por tipo: `Optional.empty()`, coleções vazias, zero e `false`. É um dos motivos para não reinventar mocks.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t6-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que usar mocks no teste de unidade do `CheckoutService`, que depende de estoque, banco e e-mail?',
      opcoes: [
        'Para testar a lógica do serviço sem depender de sistemas lentos ou com efeitos reais, como mandar e-mails, e controlar casos como "sem estoque"',
        'Porque o Mockito deixa o serviço mais rápido em produção',
        'Porque classes com dependências não podem ser testadas de outra forma',
        'Para não precisar escrever asserções',
      ],
      resposta: 0,
      explicacao: 'Com dublês, o teste decide o que cada dependência responde e roda em milissegundos. A integração real fica para outro tipo de teste.',
    },
    {
      id: 'backend-junior-t6-e03-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um `@Mock Estoque estoque` sem nenhuma configuração recebe `estoque.reservar("Headset", 1)`, que devolve `boolean`. O que acontece?',
      opcoes: ['Devolve `false`', 'Lança `NullPointerException`', 'Lança `UnsupportedOperationException`', 'Devolve `true`'],
      resposta: 0,
      explicacao: 'Mocks devolvem valores padrão: `false`, zero, `null`, `Optional.empty()` e coleções vazias, conforme o tipo de retorno.',
    },
    {
      id: 'backend-junior-t6-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `@InjectMocks CheckoutService checkout;` faz, numa classe com três campos `@Mock`?',
      opcoes: [
        'Cria o serviço passando os mocks ao construtor, conforme os tipos dos parâmetros',
        'Transforma o serviço num mock também',
        'Injeta o serviço real do Spring',
        'Cria o serviço com todas as dependências nulas',
      ],
      resposta: 0,
      explicacao: 'O serviço é real; só as dependências são dublês. Com injeção pelo construtor, o teste também poderia escrever `new CheckoutService(estoque, pedidos, notificador)`.',
    },
    {
      id: 'backend-junior-t6-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: '`when(estoque.reservar(anyString(), 1)).thenReturn(true);` lança `InvalidUseOfMatchersException`. Qual é a correção?',
      opcoes: [
        '`when(estoque.reservar(anyString(), eq(1))).thenReturn(true);`',
        '`when(estoque.reservar("anyString", 1)).thenReturn(true);`',
        '`when(estoque.reservar(anyString(), anyString())).thenReturn(true);`',
        'Trocar `when` por `verify`',
      ],
      resposta: 0,
      explicacao: 'Ou todos os argumentos são matchers, ou nenhum. O `eq(1)` é a forma de passar um valor exato como matcher.',
    },
    {
      id: 'backend-junior-t6-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste com `MockitoExtension` falha com `UnnecessaryStubbingException`. O que isso quer dizer?',
      opcoes: [
        'Uma resposta foi configurada com `when` e nunca foi usada pelo código testado',
        'Um mock foi chamado sem configuração',
        'Um `verify` falhou',
        'O mock foi criado duas vezes',
      ],
      resposta: 0,
      explicacao: 'O modo estrito aponta a linha. Geralmente é sobra de um teste copiado, ou sinal de que o código deixou de chamar a dependência.',
    },
    {
      id: 'backend-junior-t6-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `verify(notificador, never()).pedidoConfirmado(anyString(), anyLong());` garante?',
      opcoes: [
        'Que nenhum e-mail de confirmação foi enviado, com quaisquer argumentos',
        'Que o notificador nunca será chamado no futuro',
        'Que o método foi chamado com argumentos nulos',
        'Que o notificador não foi criado',
      ],
      resposta: 0,
      explicacao: 'É a verificação do caminho triste: sem estoque, o pedido não deve ser salvo nem confirmado.',
    },
    {
      id: 'backend-junior-t6-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa mostra o que um mock vê numa chamada. Qual é a saída?',
      codigo: `import java.lang.reflect.Proxy;

public class Teste {
    interface Estoque {
        boolean reservar(String produto, int quantidade);
    }

    static String ultima = "nenhuma";

    public static void main(String[] args) {
        Estoque estoque = (Estoque) Proxy.newProxyInstance(Estoque.class.getClassLoader(), new Class<?>[] {Estoque.class},
                (proxy, metodo, argumentos) -> {
                    ultima = metodo.getName() + "(" + argumentos[0] + ", " + argumentos[1] + ")";
                    return false;
                });
        boolean resposta = estoque.reservar("Mouse", 2);
        System.out.println(resposta + " " + ultima);
    }
}`,
      opcoes: ['`false reservar(Mouse, 2)`', '`false nenhuma`', '`true reservar(Mouse, 2)`', 'Lança `ClassCastException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O valor devolvido não diz nada sobre a chamada, mas o handler guardou qual foi. É assim que o `when(...)` do Mockito sabe o que configurar: ele usa a última chamada registrada.',
    },
    {
      id: 'backend-junior-t6-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O serviço monta um objeto internamente e o passa a `pedidos.salvar(...)`. Como o teste examina esse objeto?',
      opcoes: [
        'Com um `ArgumentCaptor`, usado no `verify`, e depois `getValue()`',
        'Com `when(pedidos.salvar(...)).thenReturn(...)`',
        'Lendo o campo privado do serviço por reflexão',
        'Não é possível examinar argumentos de mocks',
      ],
      resposta: 0,
      explicacao: 'O captor guarda o argumento recebido pelo mock, e o teste pode fazer asserções sobre ele, como o total do carrinho na aula.',
    },
    {
      id: 'backend-junior-t6-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para que serve o `InOrder` do teste da aula, que verifica `salvar` antes de `pedidoConfirmado`?',
      opcoes: [
        'Para garantir que o e-mail só sai depois de o pedido estar gravado',
        'Para fazer os mocks responderem em ordem',
        'Para ordenar os testes da classe',
        'Para acelerar a verificação',
      ],
      resposta: 0,
      explicacao: 'Um `verify` comum só confere que as chamadas aconteceram. Quando a ordem é parte da regra, o `InOrder` a verifica.',
    },
    {
      id: 'backend-junior-t6-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa captura argumentos como um `ArgumentCaptor`. Qual é a saída?',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    interface Notificador {
        void pedidoConfirmado(String email, long pedidoId);
    }

    public static void main(String[] args) {
        List<Long> capturados = new ArrayList<>();
        Notificador notificador = (email, id) -> capturados.add(id);
        for (long id : new long[] {7, 8, 9}) {
            notificador.pedidoConfirmado("ana@exemplo.com", id);
        }
        System.out.println(capturados + " " + capturados.getLast());
    }
}`,
      opcoes: ['`[7, 8, 9] 9`', '`[7, 8, 9] 7`', '`[9] 9`', '`[] 9`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com três chamadas, o captor real também guarda os três valores: `getAllValues()` devolve `[7, 8, 9]`, e `getValue()`, o último.',
    },
    {
      id: 'backend-junior-t6-e03-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são boas práticas com mocks? Escolha três.',
      opcoes: [
        'Usar objetos de valor reais, como o carrinho, em vez de mocká-los',
        'Verificar as interações que são o objetivo do código, como o pedido salvo e o e-mail enviado',
        'Desconfiar de testes que precisam de muitos mocks',
        'Fazer um `verify` para cada linha do método testado',
        'Mockar a própria classe testada para controlar o resultado',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Verificar cada linha copia a implementação no teste; mockar a classe testada testa o mock, e não o código.',
    },
    {
      id: 'backend-junior-t6-e03-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Em vez de um mock, o teste usa um *fake*: uma implementação simples, em memória. Digite a saída exata.',
      codigo: `import java.util.LinkedHashMap;
import java.util.Map;

public class Teste {
    interface Pedidos {
        long salvar(String email);
    }

    static class PedidosEmMemoria implements Pedidos {
        final Map<Long, String> dados = new LinkedHashMap<>();
        long proximoId = 1;

        public long salvar(String email) {
            long id = proximoId++;
            dados.put(id, email);
            return id;
        }
    }

    public static void main(String[] args) {
        PedidosEmMemoria pedidos = new PedidosEmMemoria();
        long a = pedidos.salvar("ana@exemplo.com");
        long b = pedidos.salvar("bruno@exemplo.com");
        System.out.println(a + " " + b + " " + pedidos.dados);
    }
}`,
      resposta: '1 2 {1=ana@exemplo.com, 2=bruno@exemplo.com}',
      explicacao: 'O fake se comporta como um repositório de verdade, gerando ids e guardando dados, sem configurar resposta por resposta. O teste pode verificar o estado final.',
    },
    {
      id: 'backend-junior-t6-e03-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O programa imita como o Mockito escolhe entre duas configurações que servem para a mesma chamada. Qual é a saída?',
      codigo: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class Teste {
    record Resposta(Predicate<String> condicao, boolean valor) {}

    static final List<Resposta> respostas = new ArrayList<>();

    static boolean reservar(String produto) {
        for (int i = respostas.size() - 1; i >= 0; i--) {
            if (respostas.get(i).condicao().test(produto)) return respostas.get(i).valor();
        }
        return false;
    }

    public static void main(String[] args) {
        respostas.add(new Resposta(p -> true, true));
        respostas.add(new Resposta(p -> p.equals("Mouse"), false));
        System.out.println(reservar("Mouse") + " " + reservar("Teclado"));
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A configuração mais recente que serve vence. No Mockito real, `when(reservar(anyString(), anyInt()))` seguido de `when(reservar(eq("Mouse"), anyInt()))` dá o mesmo resultado; na ordem inversa, o caso geral esconderia o específico.',
    },
    {
      id: 'backend-junior-t6-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No JDK 25, os testes imprimem "Mockito is currently self-attaching to enable the inline-mock-maker. This will no longer work in future releases of the JDK". O que fazer?',
      opcoes: [
        'Configurar o Surefire para iniciar a JVM dos testes com o Mockito como agente (`-javaagent`)',
        'Voltar para o JDK 17',
        'Ignorar: o aviso não tem consequência',
        'Trocar todos os mocks por `Proxy`',
      ],
      resposta: 0,
      explicacao: 'Carregar agentes com a JVM já rodando vai ser proibido por padrão. Com o objetivo `properties` do plugin de dependências e o `argLine` do Surefire, o agente entra na partida e os avisos somem.',
    },
    {
      id: 'backend-junior-t6-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um repositório em memória, feito com um `HashMap`, usado no lugar do banco num teste, é que tipo de dublê?',
      opcoes: [
        'Um *fake*: uma implementação simplificada que funciona de verdade',
        'Um *mock*: um objeto que verifica as chamadas recebidas',
        'Um *stub*: respostas fixas, configuradas para o teste',
        'Um *dummy*: só ocupa um parâmetro e nunca é usado',
      ],
      resposta: 0,
      explicacao: 'Na classificação de Gerard Meszaros, popularizada por Martin Fowler, o fake tem comportamento real, mas inadequado para produção, como guardar tudo na memória.',
    },
  ],
};

export default episodio;
