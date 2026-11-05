import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t4-e01',
  minutos: 16,
  aula,
  armadilhas: [
    'Uma classe com `@Service` fora da árvore de pacotes da classe `@SpringBootApplication` não é encontrada.',
    'Duas implementações da mesma interface sem `@Primary` ou `@Qualifier` impedem a aplicação de subir.',
    'Beans são singletons: um campo mutável num serviço é compartilhado por todas as requisições ao mesmo tempo.',
    'Injeção em campo com `@Autowired` esconde dependências e dificulta testes; prefira o construtor.',
    'Dependências circulares falham na inicialização: o ciclo indica uma classe com responsabilidades demais.',
    'Escolher o bean pelo nome do parâmetro funciona, mas renomear a variável muda o comportamento.',
    'Quem recebe um bean com `@Transactional` recebe um proxy, não o objeto original.',
  ],
  ia: {
    uso:
      'A IA explica bem as mensagens de inicialização do Spring, como "required a single bean, but 2 were found", e sugere as saídas. Ao gerar código, ela tende a repetir padrões antigos dos tutoriais: injeção em campo, `@Autowired` desnecessário e estado guardado em serviços.',
    pedido:
      'A aplicação Spring Boot 4.1 não sobe com este relatório:\n<cole aqui o APPLICATION FAILED TO START completo>\n<cole aqui as classes envolvidas>\n- Explique a causa em uma frase.\n- Proponha a correção mantendo a injeção pelo construtor e os campos final.\n- Diga qual das saídas (@Primary, @Qualifier, List) combina com cada situação.\n- Não use injeção em campo nem spring.main.allow-circular-references.',
    erros: [
      'Usa `@Autowired` em campos privados em vez do construtor.',
      'Resolve dependência circular ligando `allow-circular-references`.',
      'Guarda dados de uma requisição em campos de um `@Service`.',
      'Cria a dependência com `new` dentro do construtor, anulando a injeção.',
    ],
    conferir: [
      'Suba a aplicação e leia o relatório de inicialização inteiro.',
      'Escreva um teste de unidade criando o serviço com `new` e uma implementação falsa.',
      'Procure campos não `final` em classes anotadas com `@Service`.',
    ],
  },
  recursos: [
    {
      titulo: 'Spring Framework: The IoC Container',
      url: 'https://docs.spring.io/spring-framework/reference/core/beans.html',
      tipo: 'documentacao',
      porque: 'O capítulo oficial sobre o contêiner, os beans, a injeção e os escopos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Dependency Injection',
      url: 'https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html',
      tipo: 'documentacao',
      porque: 'Injeção por construtor e por *setter*, e por que o construtor é o recomendado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Bean Scopes',
      url: 'https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html',
      tipo: 'documentacao',
      porque: 'Singleton, prototype, request e session, com o que cada um significa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Fine-tuning Annotation-based Autowiring with @Primary or @Fallback',
      url: 'https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired-primary.html',
      tipo: 'documentacao',
      porque: 'Como resolver a ambiguidade com `@Primary`, `@Fallback` e `@Qualifier`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Martin Fowler: Inversion of Control Containers and the Dependency Injection pattern',
      url: 'https://martinfowler.com/articles/injection.html',
      tipo: 'artigo',
      porque: 'O artigo que deu nome à injeção de dependências, com as formas de injetar comparadas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Giuliana Bezerra: Injeção de dependências, do Java ao Spring',
      url: 'https://www.youtube.com/watch?v=CSsB53HCC3A',
      tipo: 'video',
      porque: 'A injeção feita à mão e depois pelo Spring, no mesmo exemplo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: O que é injeção de dependências e como funciona no Spring',
      url: 'https://www.youtube.com/watch?v=GaOxliPuQtA',
      tipo: 'video',
      porque: 'Beans, contêiner e injeção pelo construtor, de quem ensina Spring há anos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Código Fonte TV: Injeção de dependências, Dicionário do Programador',
      url: 'https://www.youtube.com/watch?v=evhskJG1kvY',
      tipo: 'video',
      porque: 'O conceito sem framework, com exemplos do dia a dia, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevSuperior: Injeção de dependência e inversão de controle',
      url: 'https://www.youtube.com/watch?v=O07XFebgw-g',
      tipo: 'video',
      porque: 'Uma explicação curta e visual dos dois conceitos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Um contêiner com @Principal',
    enunciado:
      'Evolua o contêiner da aula com duas regras do Spring. Primeiro, quando houver mais de um candidato para um tipo e **exatamente um** deles tiver a anotação `@Principal` (crie-a, com retenção em tempo de execução), use esse. Segundo, detecte dependências circulares e informe o caminho completo, como `Relatorio -> Vendas -> Estoque -> Vendas`, em vez de estourar a pilha. Com os cenários abaixo, a saída deve ser:\n\n```text\ncom @Principal: pedido com frete Transportadora\nsem @Principal: pedido com frete Correios\nciclo: ERRO, dependência circular: Relatorio -> Vendas -> Estoque -> Vendas\nsem ciclo: criado\n```\n\nNo primeiro cenário, há `Correios` e `Transportadora` (esta com `@Principal`); no segundo, só `Correios`. No terceiro, `Relatorio` precisa de `Vendas`, que precisa de `Estoque`, que precisa de `Vendas`. No quarto, pede-se a interface `Frete` com só `Correios` registrado.',
    dicas: [
      '`classe.isAnnotationPresent(Principal.class)` só funciona se a anotação tiver `@Retention(RetentionPolicy.RUNTIME)`.',
      'Um `LinkedHashSet` com as classes em criação guarda a ordem: se a classe já está nele, o caminho é o conjunto mais a própria classe.',
      'Tire a classe do conjunto num `finally`, para que um erro numa dependência não deixe o estado sujo.',
      'O primeiro elemento do caminho não precisa ser o que fecha o ciclo: `Relatorio` só leva ao ciclo, não faz parte dele.',
    ],
    solucao: `import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

public class Container {
    @Retention(RetentionPolicy.RUNTIME)
    @interface Principal {}

    interface Frete { String nome(); }

    public static class Correios implements Frete {
        public String nome() { return "Correios"; }
    }

    @Principal
    public static class Transportadora implements Frete {
        public String nome() { return "Transportadora"; }
    }

    public static class Calculadora {
        private final Frete frete;

        public Calculadora(Frete frete) { this.frete = frete; }

        public String descrever() { return "pedido com frete " + frete.nome(); }
    }

    public static class Estoque {
        public Estoque(Vendas vendas) {}
    }

    public static class Vendas {
        public Vendas(Estoque estoque) {}
    }

    public static class Relatorio {
        public Relatorio(Vendas vendas) {}
    }

    private final List<Class<?>> registradas = new ArrayList<>();
    private final Map<Class<?>, Object> singletons = new HashMap<>();
    private final LinkedHashSet<Class<?>> emCriacao = new LinkedHashSet<>();

    Container registrar(Class<?>... classes) {
        registradas.addAll(List.of(classes));
        return this;
    }

    Class<?> escolher(Class<?> tipo) {
        List<Class<?>> candidatas = registradas.stream().filter(tipo::isAssignableFrom).toList();
        if (candidatas.isEmpty()) throw new IllegalStateException("nenhum bean do tipo " + tipo.getSimpleName());
        if (candidatas.size() == 1) return candidatas.get(0);
        List<Class<?>> principais = candidatas.stream().filter(c -> c.isAnnotationPresent(Principal.class)).toList();
        if (principais.size() == 1) return principais.get(0);
        throw new IllegalStateException("esperava 1 bean do tipo " + tipo.getSimpleName() + ", achou "
                + candidatas.stream().map(Class::getSimpleName).toList());
    }

    <T> T obter(Class<T> tipo) throws ReflectiveOperationException {
        Class<?> classe = escolher(tipo);
        Object pronto = singletons.get(classe);
        if (pronto != null) return tipo.cast(pronto);
        if (!emCriacao.add(classe)) {
            List<String> caminho = new ArrayList<>(emCriacao.stream().map(Class::getSimpleName).toList());
            caminho.add(classe.getSimpleName());
            throw new IllegalStateException("dependência circular: " + String.join(" -> ", caminho));
        }
        try {
            Constructor<?> construtor = classe.getConstructors()[0];
            Object[] argumentos = new Object[construtor.getParameterCount()];
            for (int i = 0; i < argumentos.length; i++) argumentos[i] = obter(construtor.getParameterTypes()[i]);
            pronto = construtor.newInstance(argumentos);
            singletons.put(classe, pronto);
            return tipo.cast(pronto);
        } finally {
            emCriacao.remove(classe);
        }
    }

    static void tentar(String titulo, Container c, Class<?> tipo) {
        try {
            Object bean = c.obter(tipo);
            System.out.println(titulo + ": " + (bean instanceof Calculadora calc ? calc.descrever() : "criado"));
        } catch (IllegalStateException e) {
            System.out.println(titulo + ": ERRO, " + e.getMessage());
        } catch (ReflectiveOperationException e) {
            System.out.println(titulo + ": ERRO de reflexão, " + e);
        }
    }

    public static void main(String[] args) {
        tentar("com @Principal", new Container().registrar(Correios.class, Transportadora.class, Calculadora.class), Calculadora.class);
        tentar("sem @Principal", new Container().registrar(Correios.class, Calculadora.class), Calculadora.class);
        tentar("ciclo", new Container().registrar(Relatorio.class, Vendas.class, Estoque.class), Relatorio.class);
        tentar("sem ciclo", new Container().registrar(Correios.class), Frete.class);
    }
}`,
    saida: 'com @Principal: pedido com frete Transportadora\nsem @Principal: pedido com frete Correios\nciclo: ERRO, dependência circular: Relatorio -> Vendas -> Estoque -> Vendas\nsem ciclo: criado',
    comentarios:
      'O conjunto ordenado de "em criação" é o mesmo truque que o Spring usa para lançar a `BeanCurrentlyInCreationException`: se um bean é pedido enquanto ainda está sendo criado, só pode haver um ciclo. A mensagem com o caminho completo é o que o relatório de falha do Spring Boot mostra, desenhando o ciclo com setas. A anotação personalizada também revela por que a retenção importa: com o padrão, `CLASS`, a anotação existe no bytecode mas some em tempo de execução, e o `isAnnotationPresent` devolveria `false`. As anotações do Spring, como `@Primary`, são todas `RUNTIME` pelo mesmo motivo.',
  },
  bugs: [
    {
      id: 'backend-junior-t4-e01-b01',
      dificuldade: 1,
      sintoma: 'O teste do `PedidoService` passa um frete grátis falso, mas o total continua somando o frete dos Correios: `teste com frete grátis: 117.00`.',
      codigo: `import java.math.BigDecimal;

public class FreteFalso {
    interface Frete { BigDecimal calcular(BigDecimal subtotal); }

    static class FreteCorreios implements Frete {
        public BigDecimal calcular(BigDecimal subtotal) { return new BigDecimal("17.00"); }
    }

    static class PedidoService {
        private final Frete frete;

        PedidoService(Frete frete) {
            this.frete = new FreteCorreios();
        }

        BigDecimal total(BigDecimal subtotal) { return subtotal.add(frete.calcular(subtotal)); }
    }

    public static void main(String[] args) {
        PedidoService comFreteGratis = new PedidoService(subtotal -> BigDecimal.ZERO);
        System.out.println("teste com frete grátis: " + comFreteGratis.total(new BigDecimal("100.00")));
    }
}`,
      linha: 14,
      efeito: { tipo: 'saida', saida: 'teste com frete grátis: 117.00' },
      correcao: `import java.math.BigDecimal;

public class FreteFalso {
    interface Frete { BigDecimal calcular(BigDecimal subtotal); }

    static class FreteCorreios implements Frete {
        public BigDecimal calcular(BigDecimal subtotal) { return new BigDecimal("17.00"); }
    }

    static class PedidoService {
        private final Frete frete;

        PedidoService(Frete frete) {
            this.frete = frete;
        }

        BigDecimal total(BigDecimal subtotal) { return subtotal.add(frete.calcular(subtotal)); }
    }

    public static void main(String[] args) {
        PedidoService comFreteGratis = new PedidoService(subtotal -> BigDecimal.ZERO);
        System.out.println("teste com frete grátis: " + comFreteGratis.total(new BigDecimal("100.00")));
    }
}`,
      saidaCorrigida: 'teste com frete grátis: 100.00',
      dica: 'O construtor recebe um `Frete`. Ele usa o que recebeu?',
      explicacao:
        'O construtor ignora o parâmetro e cria a própria implementação, e a injeção deixa de existir: nem o teste nem o Spring conseguem trocar o frete. Guardar o que chegou pelo construtor é o ponto inteiro da injeção de dependências.',
    },
    {
      id: 'backend-junior-t4-e01-b02',
      dificuldade: 2,
      sintoma: 'Em produção, o Bruno recebeu a cobrança do mouse da Ana: `Bruno paga por [Mouse, Teclado]`.',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class CarrinhoCompartilhado {
    static class CarrinhoService {
        private final List<String> itens = new ArrayList<>();

        String fechar(String cliente, List<String> novos) {
            itens.addAll(novos);
            return cliente + " paga por " + itens;
        }
    }

    public static void main(String[] args) {
        CarrinhoService singleton = new CarrinhoService();
        System.out.println(singleton.fechar("Ana", List.of("Mouse")));
        System.out.println(singleton.fechar("Bruno", List.of("Teclado")));
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: 'Ana paga por [Mouse]\nBruno paga por [Mouse, Teclado]' },
      correcao: `import java.util.ArrayList;
import java.util.List;

public class CarrinhoCompartilhado {
    static class CarrinhoService {
        private final List<String> itens = new ArrayList<>();

        String fechar(String cliente, List<String> novos) {
            List<String> itens = new ArrayList<>(novos);
            return cliente + " paga por " + itens;
        }
    }

    public static void main(String[] args) {
        CarrinhoService singleton = new CarrinhoService();
        System.out.println(singleton.fechar("Ana", List.of("Mouse")));
        System.out.println(singleton.fechar("Bruno", List.of("Teclado")));
    }
}`,
      saidaCorrigida: 'Ana paga por [Mouse]\nBruno paga por [Teclado]',
      dica: 'Quantas instâncias do serviço existem, e de quem é o campo `itens`?',
      explicacao:
        'O serviço é um singleton, como todo bean por padrão, e o campo `itens` é compartilhado por todas as requisições: cada uma soma os itens das anteriores. Os dados de uma operação vivem em variáveis locais e parâmetros, nunca em campos de um bean.',
    },
    {
      id: 'backend-junior-t4-e01-b03',
      dificuldade: 3,
      sintoma: 'O contêiner caseiro de um projeto de estudo diz que não há bean de frete, embora a classe `Correios` implemente `Frete`: `Frete -> ERRO: 0 beans do tipo Frete`.',
      codigo: `import java.util.List;

public class BuscaPorTipo {
    interface Frete {}
    static class Correios implements Frete {}
    static class Relogio {}

    static final List<Object> BEANS = List.of(new Correios(), new Relogio());

    static Object bean(Class<?> tipo) {
        List<Object> candidatos = BEANS.stream().filter(b -> b.getClass() == tipo).toList();
        if (candidatos.size() != 1) return "ERRO: " + candidatos.size() + " beans do tipo " + tipo.getSimpleName();
        return candidatos.get(0).getClass().getSimpleName();
    }

    public static void main(String[] args) {
        System.out.println("Frete -> " + bean(Frete.class));
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'Frete -> ERRO: 0 beans do tipo Frete' },
      correcao: `import java.util.List;

public class BuscaPorTipo {
    interface Frete {}
    static class Correios implements Frete {}
    static class Relogio {}

    static final List<Object> BEANS = List.of(new Correios(), new Relogio());

    static Object bean(Class<?> tipo) {
        List<Object> candidatos = BEANS.stream().filter(tipo::isInstance).toList();
        if (candidatos.size() != 1) return "ERRO: " + candidatos.size() + " beans do tipo " + tipo.getSimpleName();
        return candidatos.get(0).getClass().getSimpleName();
    }

    public static void main(String[] args) {
        System.out.println("Frete -> " + bean(Frete.class));
    }
}`,
      saidaCorrigida: 'Frete -> Correios',
      dica: 'A classe do objeto é igual à interface pedida? O que significa "ser do tipo" `Frete`?',
      explicacao:
        '`getClass() == tipo` só aceita a classe exata, e nenhum objeto tem a interface como classe. Ser do tipo `Frete` é implementá-la ou estender quem implementa: `tipo.isInstance(b)`, ou `isAssignableFrom`, que é o que o Spring usa para achar candidatos.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t4-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a principal vantagem de o `PedidoService` receber um `Frete` pelo construtor, em vez de criar `new FreteCorreios()` dentro dele?',
      opcoes: [
        'A implementação pode ser trocada, inclusive por uma falsa num teste, sem mudar o serviço',
        'O código fica mais rápido',
        'O Spring deixa de ser necessário',
        'O frete passa a ser calculado em paralelo',
      ],
      resposta: 0,
      explicacao: 'O serviço depende da interface, não de uma implementação. Quem monta o objeto escolhe qual frete usar.',
      dica: 'Pense no teste: como trocar o frete de verdade por um falso?',
    },
    {
      id: 'backend-junior-t4-e01-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A aplicação precisa de um `HttpClient` configurado como bean. Como declará-lo, já que você não pode anotar a classe do JDK?',
      opcoes: [
        'Com um método `@Bean` que o cria, numa classe anotada com `@Configuration`',
        'Com `@Component` na declaração `HttpClient cliente;`',
        'Com `@Service` na classe que vai usá-lo',
        'Não é possível: só classes suas viram beans',
      ],
      resposta: 0,
      explicacao: 'O método `@Bean` diz ao contêiner como criar o objeto, e o resultado vira um bean como qualquer outro.',
      dica: 'Classes de bibliotecas não podem ser anotadas: um método as cria.',
    },
    {
      id: 'backend-junior-t4-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A classe principal está em `br.com.loja`, e um `@Service` foi criado em `com.loja.frete`. A aplicação falha com `NoSuchBeanDefinitionException`. Por quê?',
      opcoes: [
        'A varredura começa no pacote da classe `@SpringBootApplication` e só desce pelos subpacotes dele',
        'Faltou o `@Autowired` no serviço',
        'Serviços precisam terminar com o sufixo `Service`',
        'O `@Service` só funciona em interfaces',
      ],
      resposta: 0,
      explicacao: '`com.loja.frete` não está dentro de `br.com.loja`. Mova a classe para um subpacote, como `br.com.loja.frete`.',
      dica: 'A varredura parte do pacote da classe principal e desce.',
    },
    {
      id: 'backend-junior-t4-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Há duas implementações de `Frete`, e o relatório diz que o construtor do `PedidoService` "required a single bean, but 2 were found". Qual mudança faz a aplicação subir usando sempre a transportadora?',
      opcoes: [
        'Anotar a classe `Transportadora` com `@Primary`',
        'Anotar o `PedidoService` com `@Primary`',
        'Apagar a interface `Frete`',
        'Trocar `@Service` por `@Component` nas duas',
      ],
      resposta: 0,
      explicacao: 'O `@Primary` vence quando há ambiguidade. Os estereótipos são todos `@Component` para o contêiner, e trocá-los não muda nada.',
      dica: 'Uma das implementações precisa ser a preferida.',
    },
    {
      id: 'backend-junior-t4-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais formas resolvem a ambiguidade entre duas implementações de `Frete`? Escolha três.',
      opcoes: [
        '`@Primary` numa das implementações',
        '`@Qualifier("correios")` no parâmetro do construtor',
        'Receber `List<Frete>` e escolher no código',
        '`@Scope("prototype")` nas duas',
        'Tornar o construtor `private`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O escopo muda quantas instâncias existem, não qual é escolhida. E um construtor privado impediria o Spring de criar a classe.',
      dica: 'Escolher uma, escolher pelo nome ou receber todas.',
    },
    {
      id: 'backend-junior-t4-e01-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um `@Service` guarda o carrinho do usuário num campo `private List<Item> itens`, preenchido a cada requisição. Em produção, clientes começam a ver itens de outros clientes. Por quê?',
      opcoes: [
        'O serviço é um singleton compartilhado por todas as requisições, e o campo é o mesmo para todos',
        'O Spring cria um serviço por usuário, mas mistura as listas',
        'O `ArrayList` perde itens com o tempo',
        'O banco de dados está devolvendo dados errados',
      ],
      resposta: 0,
      explicacao: 'Serviços devem ser sem estado. O carrinho mora no banco, numa sessão ou é recebido em cada requisição, nunca num campo do singleton.',
      dica: 'Quantas instâncias de um serviço existem, por padrão?',
    },
    {
      id: 'backend-junior-t4-e01-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o escopo padrão de um bean no Spring?',
      opcoes: ['Singleton: uma instância para todo o contêiner', 'Prototype: uma instância por injeção', 'Request: uma por requisição HTTP', 'Session: uma por usuário'],
      resposta: 0,
      explicacao: 'Os outros escopos precisam ser pedidos com `@Scope`. Os de `request` e `session` só existem em aplicações web.',
      dica: 'Uma instância para o contêiner inteiro.',
    },
    {
      id: 'backend-junior-t4-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: '`EstoqueService` recebe `VendaService` no construtor, e `VendaService` recebe `EstoqueService`. A aplicação não sobe. Qual é a melhor correção?',
      opcoes: [
        'Extrair a parte que os dois usam para uma terceira classe, da qual ambos dependem',
        'Trocar a injeção pelo construtor por injeção em campo',
        'Ligar `spring.main.allow-circular-references`',
        'Juntar as duas classes numa só, com tudo dentro',
      ],
      resposta: 0,
      explicacao: 'O ciclo revela responsabilidades mal divididas. As duas opções do meio só escondem o problema, e juntar tudo cria uma classe grande demais.',
      dica: 'Duas classes que precisam uma da outra fazem coisas demais.',
    },
    {
      id: 'backend-junior-t4-e01-q09',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O serviço recebe o cálculo de frete pelo construtor; o teste passa uma *lambda*. Digite a saída exata.',
      codigo: `public class Teste {
    interface Frete { int calcular(int pesoKg); }

    static class PedidoService {
        private final Frete frete;
        PedidoService(Frete frete) { this.frete = frete; }
        int total(int itens, int pesoKg) { return itens + frete.calcular(pesoKg); }
    }

    public static void main(String[] args) {
        PedidoService porPeso = new PedidoService(peso -> peso * 3);
        PedidoService gratis = new PedidoService(peso -> 0);
        System.out.println(porPeso.total(100, 4) + " " + gratis.total(100, 4));
    }
}`,
      resposta: '112 100',
      explicacao: 'O mesmo serviço, com duas implementações de `Frete`. É isso que torna o serviço testável sem frete real.',
      dica: 'O serviço soma o subtotal com o que a lambda devolve.',
    },
    {
      id: 'backend-junior-t4-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O contêiner descobre do que um bean precisa olhando os parâmetros do construtor por reflexão. Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static class Relatorio {
        public Relatorio(String titulo, List<Integer> numeros, int limite) {}
    }

    public static void main(String[] args) {
        Class<?>[] tipos = Relatorio.class.getConstructors()[0].getParameterTypes();
        System.out.println(Arrays.stream(tipos).map(Class::getSimpleName).toList());
    }
}`,
      opcoes: ['`[String, List, int]`', '`[String, List<Integer>, int]`', '`[titulo, numeros, limite]`', '`[]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`getParameterTypes` devolve as classes, sem os tipos genéricos, que exigem `getGenericParameterTypes`. Os nomes dos parâmetros só existem com o `-parameters` do compilador.',
      dica: 'A reflexão dos parâmetros devolve as classes, sem os genéricos.',
    },
    {
      id: 'backend-junior-t4-e01-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a injeção em campo (`@Autowired private Frete frete;`) é desaconselhada?',
      opcoes: [
        'Esconde as dependências, impede o campo `final` e obriga o teste a usar reflexão ou o Spring para preenchê-lo',
        'Porque o Spring não a suporta mais',
        'Porque deixa a aplicação mais lenta em produção',
        'Porque só funciona com interfaces',
      ],
      resposta: 0,
      explicacao: 'Com o construtor, a classe declara tudo o que precisa e pode ser criada com `new` num teste comum.',
      dica: 'Compare com o construtor: o que fica visível e o que dá para fazer num teste?',
    },
    {
      id: 'backend-junior-t4-e01-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que o `@Repository` faz além de registrar a classe como bean?',
      opcoes: [
        'Traduz as exceções específicas do banco para a hierarquia `DataAccessException` do Spring',
        'Cria as tabelas no banco',
        'Abre uma transação em cada método',
        'Nada: é idêntico ao `@Component`',
      ],
      resposta: 0,
      explicacao: 'Com a tradução, o código trata, por exemplo, uma `DuplicateKeyException` do Spring, sem depender das exceções de cada driver.',
      dica: 'É um estereótipo com um trabalho extra sobre as exceções.',
    },
    {
      id: 'backend-junior-t4-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um construtor recebe `List<Frete> fretes`, e a aplicação tem os beans `correios` e `transportadora`. O que é injetado?',
      opcoes: ['Uma lista com os dois beans', 'Um erro de ambiguidade', 'Uma lista vazia', 'Só o primeiro bean registrado'],
      resposta: 0,
      explicacao: 'Para coleções, o Spring injeta todos os candidatos. É o caminho para escolher o frete em tempo de execução, como o mais barato para cada pedido.',
      dica: 'Um parâmetro `List<Frete>` recebe todos os candidatos.',
    },
    {
      id: 'backend-junior-t4-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quando roda um método anotado com `@PostConstruct` num bean?',
      opcoes: [
        'Depois que o objeto foi criado e as dependências injetadas',
        'Antes do construtor',
        'A cada chamada de qualquer método do bean',
        'Quando a aplicação encerra',
      ],
      resposta: 0,
      explicacao: 'É o lugar para inicializações que dependem das dependências, como carregar um cache. O encerramento é com `@PreDestroy`.',
      dica: 'Depois de criar e injetar, antes de usar.',
    },
    {
      id: 'backend-junior-t4-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como um método anotado com `@Transactional` ganha uma transação, se o código dele não abre nenhuma?',
      opcoes: [
        'O Spring injeta um proxy no lugar do bean, que abre a transação, chama o método original e confirma ou desfaz',
        'O compilador reescreve o método',
        'A anotação é lida pelo banco de dados',
        'O Java abre transações sozinho para métodos anotados',
      ],
      resposta: 0,
      explicacao: 'Por isso uma chamada de um método para outro dentro da mesma classe não passa pelo proxy, e o `@Transactional` do segundo é ignorado.',
      dica: 'Quem é injetado não é o objeto original, mas um intermediário.',
    },
  ],
};

export default episodio;
