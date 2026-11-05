import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t7-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'Receber a entidade no `@RequestBody` deixa o cliente preencher id, situação e total.',
    'O DTO de entrada não tem preço: o preço vem do produto, lido do banco.',
    'Serializar uma entidade com relacionamentos *lazy* fora da transação dispara consultas extras ou `LazyInitializationException`.',
    '`@JsonIgnore` na entidade protege só os campos que alguém lembrou de anotar.',
    'Um record com uma `List` não é imutável de verdade sem `List.copyOf` no construtor compacto.',
    '`Stream.toList()` devolve uma lista que não aceita `add`.',
    'Service que devolve `ResponseEntity` amarra a regra de negócio ao HTTP e não serve para filas nem jobs.',
    'Arredondar cada item ou só o total dá resultados diferentes: escolha uma regra e escreva-a num teste.',
  ],
  ia: {
    uso:
      'Mapear DTOs é um trabalho repetitivo em que a IA economiza tempo de verdade: dado o record de entrada, o de saída e a entidade, ela escreve o método `de(...)` e os testes. O cuidado é com o que ela acrescenta por conta própria, como campos de entrada que o cliente não deveria controlar.',
    pedido:
      'Escreva os DTOs e o mapeamento para a criação de pedidos, em Java 25 com Spring Boot 4.\n<cole aqui a entidade Pedido, o Item e o Produto>\n- NovoPedido e ItemPedido, records com Bean Validation, sem id, situação, total nem preço.\n- PedidoResposta com um método estático de(Pedido), com o total calculado dos itens em BigDecimal.\n- Cópia defensiva das listas no construtor compacto.\n- Não use MapStruct nem Lombok; escreva também os testes do mapeamento com AssertJ.',
    erros: [
      'Põe `BigDecimal preco` ou `total` no DTO de entrada, "para facilitar".',
      'Usa `@RequestBody Pedido`, a entidade, no controller.',
      'Calcula o total com `double` ou converte com `doubleValue()` no meio da conta.',
      'Esquece a cópia defensiva e deixa o record com uma lista mutável compartilhada.',
    ],
    conferir: [
      'Leia os componentes do DTO de entrada: cada um precisa ser algo que o cliente pode escolher.',
      'Procure `doubleValue`, `double` e `float` no código de valores.',
      'Mande um JSON com `"total": 0.01` e confira que o total da resposta não muda.',
    ],
  },
  recursos: [
    {
      titulo: 'Martin Fowler: Data Transfer Object',
      url: 'https://martinfowler.com/eaaCatalog/dataTransferObject.html',
      tipo: 'artigo',
      porque: 'A definição original do padrão e para que ele servia.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: Service Layer',
      url: 'https://martinfowler.com/eaaCatalog/serviceLayer.html',
      tipo: 'artigo',
      porque: 'A camada de serviço como fronteira das regras e das transações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OWASP: Mass Assignment Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html',
      tipo: 'artigo',
      porque: 'O ataque que DTOs de entrada evitam, com exemplos em Spring.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Language Specification: Record Classes',
      url: 'https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.10',
      tipo: 'documentacao',
      porque: 'Componentes, acessores e o construtor compacto, que fazem dos records bons DTOs.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: RecordComponent',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/reflect/RecordComponent.html',
      tipo: 'documentacao',
      porque: 'A reflexão que o Jackson usa para ler e escrever records.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Bean Validation',
      url: 'https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html',
      tipo: 'documentacao',
      porque: 'As anotações de validação nos DTOs e como o Spring as aplica.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: The DTO Pattern',
      url: 'https://www.baeldung.com/java-dto-pattern',
      tipo: 'tutorial',
      porque: 'DTOs numa aplicação Spring, com o mapeamento escrito à mão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'MapStruct',
      url: 'https://mapstruct.org/',
      tipo: 'ferramenta',
      porque: 'O gerador de mapeamentos para quando os DTOs passam de algumas dezenas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Build & Run: Aprenda a criar uma API em Java com Spring Boot',
      url: 'https://www.youtube.com/watch?v=A2zJpPi8JeQ',
      tipo: 'video',
      porque: 'Uma API do controller ao repositório, em português, para ver as camadas funcionando.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Patterns of Enterprise Application Architecture (Martin Fowler)',
      url: 'https://martinfowler.com/books/eaa.html',
      tipo: 'livro',
      porque: 'O livro que deu nome à camada de serviço, ao repositório e ao DTO.',
      onde: 'Capítulo 1, "Layering", e capítulo 15, "Distribution Patterns"',
      gratuito: false,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Do pedido recebido à resposta',
    enunciado:
      'Escreva um `criar(NovoPedido, Map<String, BigDecimal> catalogo)` que monta a `PedidoResposta` com o preço do catálogo, e não do cliente. Um SKU fora do catálogo lança `IllegalArgumentException` com `produto inexistente: XYZ`, sem montar nada. Imprima exatamente:\n\n```text\nPedidoResposta[situacao=CRIADO, total=102.20, itens=[CANECA x3 = 59.70, CAFE-500G x1 = 42.50]]\nerro: produto inexistente: XICARA\n```',
    dicas: [
      'Confira todos os SKUs antes de calcular qualquer coisa.',
      'O item de resposta pode ter um `toString` próprio, para imprimir `CANECA x3 = 59.70`.',
      'O total é a soma dos subtotais, com `reduce(BigDecimal.ZERO, BigDecimal::add)`.',
    ],
    solucao: `import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class CriarPedido {
    record ItemPedido(String sku, int quantidade) {}
    record NovoPedido(Long clienteId, List<ItemPedido> itens) {}

    record ItemResposta(String sku, int quantidade, BigDecimal subtotal) {
        @Override
        public String toString() {
            return sku + " x" + quantidade + " = " + subtotal;
        }
    }

    record PedidoResposta(String situacao, BigDecimal total, List<ItemResposta> itens) {}

    static PedidoResposta criar(NovoPedido novo, Map<String, BigDecimal> catalogo) {
        for (ItemPedido item : novo.itens()) {
            if (!catalogo.containsKey(item.sku())) {
                throw new IllegalArgumentException("produto inexistente: " + item.sku());
            }
        }
        List<ItemResposta> itens = novo.itens().stream()
                .map(i -> new ItemResposta(i.sku(), i.quantidade(),
                        catalogo.get(i.sku()).multiply(BigDecimal.valueOf(i.quantidade()))))
                .toList();
        BigDecimal total = itens.stream().map(ItemResposta::subtotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        return new PedidoResposta("CRIADO", total, itens);
    }

    public static void main(String[] args) {
        Map<String, BigDecimal> catalogo = Map.of(
                "CANECA", new BigDecimal("19.90"),
                "CAFE-500G", new BigDecimal("42.50"));
        System.out.println(criar(new NovoPedido(1L, List.of(new ItemPedido("CANECA", 3), new ItemPedido("CAFE-500G", 1))), catalogo));
        try {
            criar(new NovoPedido(1L, List.of(new ItemPedido("CANECA", 1), new ItemPedido("XICARA", 2))), catalogo);
        } catch (IllegalArgumentException e) {
            System.out.println("erro: " + e.getMessage());
        }
    }
}`,
    saida: 'PedidoResposta[situacao=CRIADO, total=102.20, itens=[CANECA x3 = 59.70, CAFE-500G x1 = 42.50]]\nerro: produto inexistente: XICARA',
    comentarios:
      'Conferir tudo antes de calcular é a versão em memória do que o `@Transactional` faz no banco: ou o pedido sai inteiro, ou não sai. No projeto, o `Map` vira o `ProdutoRepository`, e a `IllegalArgumentException` vira uma exceção sua que o tratador de erros traduz para 422.',
  },
  bugs: [
    {
      id: 'backend-junior-t7-e02-b01',
      dificuldade: 1,
      sintoma: 'O aplicativo mostra o nome do cliente no lugar da situação do pedido: `PedidoResposta[id=42, situacao=Ana]`.',
      codigo: `public class Mapa {
    record Pedido(Long id, String cliente, String situacao) {}
    record PedidoResposta(Long id, String situacao) {
        static PedidoResposta de(Pedido p) {
            return new PedidoResposta(p.id(), p.cliente());
        }
    }

    public static void main(String[] args) {
        System.out.println(PedidoResposta.de(new Pedido(42L, "Ana", "PAGO")));
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'PedidoResposta[id=42, situacao=Ana]' },
      correcao: `public class Mapa {
    record Pedido(Long id, String cliente, String situacao) {}
    record PedidoResposta(Long id, String situacao) {
        static PedidoResposta de(Pedido p) {
            return new PedidoResposta(p.id(), p.situacao());
        }
    }

    public static void main(String[] args) {
        System.out.println(PedidoResposta.de(new Pedido(42L, "Ana", "PAGO")));
    }
}`,
      saidaCorrigida: 'PedidoResposta[id=42, situacao=PAGO]',
      dica: 'Os dois campos são `String`, então o compilador aceita qualquer um. Qual acessor foi usado?',
      explicacao:
        'Com componentes do mesmo tipo, trocar a ordem ou o acessor compila sem aviso. Um teste do mapeamento, que confira cada campo, pega o erro na hora; por isso vale testar o `de(...)` mesmo sendo "só cópia".',
    },
    {
      id: 'backend-junior-t7-e02-b02',
      dificuldade: 2,
      sintoma: 'O financeiro encontrou um pedido de dois fones de R$ 299,90 cobrado como `Subtotal: 0.02`.',
      codigo: `import java.math.BigDecimal;
import java.util.Map;

public class Preco {
    record ItemPedido(String sku, int quantidade, BigDecimal preco) {}

    static final Map<String, BigDecimal> CATALOGO = Map.of("FONE", new BigDecimal("299.90"));

    static BigDecimal subtotal(ItemPedido item) {
        BigDecimal preco = item.preco();
        return preco.multiply(BigDecimal.valueOf(item.quantidade()));
    }

    public static void main(String[] args) {
        System.out.println("Subtotal: " + subtotal(new ItemPedido("FONE", 2, new BigDecimal("0.01"))));
    }
}`,
      linha: 10,
      efeito: { tipo: 'saida', saida: 'Subtotal: 0.02' },
      correcao: `import java.math.BigDecimal;
import java.util.Map;

public class Preco {
    record ItemPedido(String sku, int quantidade, BigDecimal preco) {}

    static final Map<String, BigDecimal> CATALOGO = Map.of("FONE", new BigDecimal("299.90"));

    static BigDecimal subtotal(ItemPedido item) {
        BigDecimal preco = CATALOGO.get(item.sku());
        return preco.multiply(BigDecimal.valueOf(item.quantidade()));
    }

    public static void main(String[] args) {
        System.out.println("Subtotal: " + subtotal(new ItemPedido("FONE", 2, new BigDecimal("0.01"))));
    }
}`,
      saidaCorrigida: 'Subtotal: 599.80',
      dica: 'De onde vem o preço usado na conta: do servidor ou da requisição?',
      explicacao:
        'O preço veio do JSON do cliente, que pode mandar o valor que quiser. A conta tem de usar o preço do catálogo, lido no servidor. A correção completa é tirar `preco` do DTO de entrada, para que o erro nem seja possível.',
    },
    {
      id: 'backend-junior-t7-e02-b03',
      dificuldade: 3,
      sintoma: 'A resposta do pedido 42 mostrou ao cliente um item interno, `BRINDE-INTERNO`, acrescentado à lista depois que a resposta já estava pronta.',
      codigo: `import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Copia {
    record PedidoResposta(Long id, List<String> itens) {
        PedidoResposta {
            Objects.requireNonNull(itens);
        }
    }

    public static void main(String[] args) {
        List<String> itens = new ArrayList<>(List.of("CANECA"));
        PedidoResposta resposta = new PedidoResposta(42L, itens);
        itens.add("BRINDE-INTERNO");
        System.out.println(resposta.itens());
    }
}`,
      linha: 8,
      efeito: { tipo: 'saida', saida: '[CANECA, BRINDE-INTERNO]' },
      correcao: `import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Copia {
    record PedidoResposta(Long id, List<String> itens) {
        PedidoResposta {
            itens = List.copyOf(itens);
        }
    }

    public static void main(String[] args) {
        List<String> itens = new ArrayList<>(List.of("CANECA"));
        PedidoResposta resposta = new PedidoResposta(42L, itens);
        itens.add("BRINDE-INTERNO");
        System.out.println(resposta.itens());
    }
}`,
      saidaCorrigida: '[CANECA]',
      dica: 'O record guarda a lista que recebeu ou uma cópia dela?',
      explicacao:
        'O componente `final` impede trocar a lista, mas não alterar o conteúdo dela, e o record guardou a mesma lista do chamador. `List.copyOf` faz uma cópia imutável e já recusa `null`, então substitui o `requireNonNull`.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t7-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em qual camada deve ficar a regra "um pedido enviado não pode ser cancelado"?',
      opcoes: [
        'No service (ou na própria entidade), para valer em qualquer ponto de entrada',
        'No controller, perto da rota de cancelamento',
        'No repository, numa consulta',
        'No DTO de entrada, com uma anotação de validação',
      ],
      resposta: 0,
      explicacao:
        'Uma regra de negócio precisa valer quando o cancelamento vier da API, de uma fila ou de um job. No controller, ela só protegeria a rota HTTP. O DTO valida formato, e o repository só guarda.',
      dica: 'Quem mais, além da API, poderia cancelar um pedido?',
    },
    {
      id: 'backend-junior-t7-e02-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais componentes **não** deveriam estar no DTO de entrada `NovoPedido`? Escolha dois.',
      opcoes: ['`BigDecimal total`', '`String situacao`', '`Long clienteId`', '`List<ItemPedido> itens`', '`String cupom`'],
      respostas: [0, 1],
      explicacao:
        'Total e situação são calculados e controlados pelo servidor. Cliente, itens e um cupom são escolhas legítimas de quem compra; o cupom, claro, é conferido no service.',
      dica: 'Quais valores o servidor calcula ou controla sozinho?',
    },
    {
      id: 'backend-junior-t7-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `record ItemPedido(String sku, int quantidade) {}

System.out.println(new ItemPedido("CANECA", 3));`,
      resposta: 'ItemPedido[sku=CANECA, quantidade=3]',
      explicacao: 'O `toString` gerado mostra o nome do record e os componentes, na ordem da declaração. É o que aparece no log quando você imprime um DTO.',
      dica: 'O formato é `Nome[componente=valor, ...]`.',
    },
    {
      id: 'backend-junior-t7-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado:
        'O controller devolve a entidade `Pedido`, que tem `@ManyToOne(fetch = LAZY) Cliente cliente`. Com `spring.jpa.open-in-view=false`, a rota responde 500 com `LazyInitializationException`. Por quê?',
      opcoes: [
        'O Jackson tenta ler o cliente ao gerar o JSON, depois que a transação do service terminou e a sessão foi fechada',
        'Porque relacionamentos `LAZY` não podem ser lidos nunca',
        'Porque o Jackson não sabe serializar entidades',
        'Porque faltou `@Transactional` no repository',
      ],
      resposta: 0,
      explicacao:
        'O proxy do cliente só carrega dentro de uma sessão aberta. A serialização acontece no controller, fora dela. Com DTO, o service monta tudo o que precisa dentro da transação, e o problema não existe.',
      dica: 'Em que momento o JSON é gerado, e a transação ainda está aberta nessa hora?',
    },
    {
      id: 'backend-junior-t7-e02-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para somar os subtotais.',
      codigo: `List<BigDecimal> subtotais = List.of(new BigDecimal("59.70"), new BigDecimal("42.50"));
BigDecimal total = subtotais.stream().reduce(BigDecimal.ZERO, BigDecimal::___);
System.out.println(total);`,
      respostas: ['add'],
      saida: '102.20',
      explicacao: 'O `reduce` começa do zero e aplica `add` a cada elemento. `BigDecimal::add` é uma referência ao método de instância, usada como `(a, b) -> a.add(b)`.',
      dica: 'Qual é o método de soma do `BigDecimal`?',
    },
    {
      id: 'backend-junior-t7-e02-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que não compila.',
      codigo: `record PedidoResposta(Long id, BigDecimal total) {}

PedidoResposta r = new PedidoResposta(1L, new BigDecimal("10.00"));
r.total = BigDecimal.ZERO;
System.out.println(r);`,
      resposta: 4,
      explicacao: 'Os componentes de um record viram campos `private final`. Um DTO de resposta não muda depois de criado; para outro valor, crie outro record.',
      dica: 'Os campos de um record podem ser reatribuídos?',
    },
    {
      id: 'backend-junior-t7-e02-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Três itens de R$ 0,333. Qual é a saída?',
      codigo: `BigDecimal preco = new BigDecimal("0.333");
BigDecimal tres = BigDecimal.valueOf(3);
BigDecimal porItem = preco.setScale(2, RoundingMode.HALF_EVEN).multiply(tres);
BigDecimal noFim = preco.multiply(tres).setScale(2, RoundingMode.HALF_EVEN);
System.out.println(porItem + " " + noFim);`,
      opcoes: ['`0.99 1.00`', '`1.00 1.00`', '`0.99 0.99`', '`0.999 1.00`', '`1.00 0.99`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'Arredondando antes, cada item vira 0,33 e a soma dá 0,99. Arredondando depois, 0,999 vira 1,00. Nenhum dos dois é errado, mas a API e a nota fiscal precisam usar a mesma regra.',
      dica: 'Faça as duas contas no papel: arredondar e multiplicar, ou multiplicar e arredondar.',
    },
    {
      id: 'backend-junior-t7-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O controller recebe `@RequestBody Pedido pedido`, a entidade com setters públicos. Um cliente manda `{"itens": [...], "situacao": "ENTREGUE"}`. O que acontece?',
      opcoes: [
        'O Jackson preenche a situação, e o pedido pode ser gravado como entregue sem passar pela máquina de estados',
        'O Jackson ignora campos que não são do DTO',
        'A requisição é recusada com 400 automaticamente',
        'A situação só é preenchida se tiver `@JsonProperty`',
      ],
      resposta: 0,
      explicacao:
        'É a atribuição em massa: o Jackson usa os setters de qualquer campo que vier no JSON. A defesa é um DTO de entrada que simplesmente não tem esse campo.',
      dica: 'O Jackson sabe quais campos o cliente "pode" mandar?',
    },
    {
      id: 'backend-junior-t7-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que acontece?',
      codigo: `List<String> skus = Stream.of("CANECA", "CAFE").toList();
skus.add("BRINDE");
System.out.println(skus);`,
      opcoes: [
        'Lança `UnsupportedOperationException`',
        'Imprime `[CANECA, CAFE, BRINDE]`',
        'Não compila',
        'Imprime `[CANECA, CAFE]`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException' },
      explicacao:
        '`Stream.toList()` devolve uma lista imutável, como `List.of`. É ótimo para DTOs, que não devem mudar, mas quebra código antigo que montava a lista e depois acrescentava itens.',
      dica: 'A lista de `toList()` aceita alterações?',
    },
    {
      id: 'backend-junior-t7-e02-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Onde se confere que o SKU do item existe no catálogo?',
      opcoes: [
        'No service, consultando o repositório de produtos',
        'No DTO, com `@NotBlank`',
        'No controller, com um `if`',
        'No Jackson, ao ler o JSON',
      ],
      resposta: 0,
      explicacao:
        '`@NotBlank` só garante que veio um texto. Saber se o produto existe exige o banco, e isso é trabalho do service, que lança uma exceção traduzida para 422.',
      dica: 'Para saber se o produto existe, é preciso consultar o quê?',
    },
    {
      id: 'backend-junior-t7-e02-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais são problemas reais de devolver a entidade JPA direto no controller? Escolha três.',
      opcoes: [
        'Renomear um campo da entidade muda o JSON e quebra quem consome a API',
        'Relacionamentos *lazy* disparam consultas ou exceções na hora de gerar o JSON',
        'Campos internos, como custo ou observações da loja, vazam para o cliente',
        'O Spring não consegue serializar classes com `@Entity`',
        'A entidade ocupa mais memória que um DTO',
      ],
      respostas: [0, 1, 2],
      explicacao:
        'Contrato preso ao banco, lazy loading fora da transação e vazamento de dados são os três motivos do DTO. O Spring serializa entidades sem problema, e a diferença de memória é desprezível.',
      dica: 'Pense em compatibilidade, em transações e em privacidade.',
    },
    {
      id: 'backend-junior-t7-e02-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Complete para que o record guarde uma cópia imutável da lista.',
      codigo: `record NovoPedido(Long clienteId, List<String> itens) {
    NovoPedido {
        itens = List.___(itens);
    }
}

List<String> lista = new ArrayList<>(List.of("CANECA"));
NovoPedido n = new NovoPedido(1L, lista);
lista.add("CAFE");
System.out.println(n.itens());`,
      respostas: ['copyOf'],
      saida: '[CANECA]',
      explicacao:
        'No construtor compacto, reatribuir o parâmetro muda o que vai para o campo. `List.copyOf` cria uma cópia imutável, então a alteração posterior da lista original não aparece no record.',
      dica: 'É o método de fábrica de `List` que copia outra coleção.',
    },
    {
      id: 'backend-junior-t7-e02-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `record ItemResposta(String sku, int quantidade) {}

ItemResposta a = new ItemResposta("CANECA", 1);
ItemResposta b = new ItemResposta("CANECA", 1);
System.out.println(a.equals(b) + " " + (a == b));`,
      resposta: 'true false',
      explicacao: 'O `equals` do record compara os componentes, então os dois são iguais. O `==` compara referências, e são dois objetos diferentes. É por isso que testes com `isEqualTo` funcionam direto com DTOs em record.',
      dica: '`equals` olha os valores; `==` olha os objetos.',
    },
    {
      id: 'backend-junior-t7-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `PedidoService.cancelar` devolve `ResponseEntity<PedidoResposta>`. Qual é o problema?',
      opcoes: [
        'O service passa a depender de HTTP e não pode ser reaproveitado por uma fila ou um job; status e cabeçalhos são decisão do controller',
        'Nenhum: é a forma recomendada',
        '`ResponseEntity` não pode ter um record dentro',
        'O Spring não injeta services que devolvem `ResponseEntity`',
      ],
      resposta: 0,
      explicacao:
        'O service devolve o resultado do negócio ou lança uma exceção. O controller decide o status, e o tratador de erros traduz as exceções. Assim, a mesma regra serve a qualquer ponto de entrada.',
      dica: 'Um job noturno que cancela pedidos saberia o que fazer com um status HTTP?',
    },
    {
      id: 'backend-junior-t7-e02-q15',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que não compila.',
      codigo: `record ItemPedido(String sku, int quantidade) {}

ItemPedido item = new ItemPedido("CANECA", 3);
System.out.println(item.getSku());`,
      resposta: 4,
      explicacao: 'Os acessores de um record têm o nome do componente, sem `get`: `item.sku()`. O Jackson entende esse formato desde a versão 2.12.',
      dica: 'Como se chama o acessor de um record?',
    },
  ],
};

export default episodio;
