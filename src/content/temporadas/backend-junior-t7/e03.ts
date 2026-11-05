import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t7-e03',
  minutos: 15,
  aula,
  armadilhas: [
    'Um item que só aponta para o produto muda de preço junto com ele: copie o preço para o item na compra.',
    'O padrão do `@Enumerated` é `ORDINAL`: inserir uma constante no meio do enum muda a situação de pedidos antigos.',
    'Editar uma migration que já rodou quebra o *checksum* do Flyway; mudanças entram sempre numa versão nova.',
    'Sem `@Version`, duas requisições simultâneas sobre o mesmo pedido fazem a última vencer em silêncio.',
    'A `OptimisticLockException` é uma condição esperada, não um erro do servidor: responda 409.',
    '`cascade = ALL` vale entre pedido e itens, nunca do item para o produto.',
    'O `Pageable` do Spring começa na página 0.',
    '`new BigDecimal("10.0").equals(new BigDecimal("10.00"))` é `false`: compare valores com `compareTo`.',
  ],
  ia: {
    uso:
      'Migrations e entidades andam juntas, e a IA ajuda a escrever as duas de uma vez e a conferir uma contra a outra. Ela também é boa para explicar um plano de execução (`explain analyze`) linha por linha. Desconfie de entidades sem `@Version` e sem `EnumType.STRING`, e de migrations que alteram arquivos antigos.',
    pedido:
      'Escreva a migration Flyway V3 e o ajuste da entidade para guardar o motivo do cancelamento de um pedido, em PostgreSQL e Spring Boot 4.\n<cole aqui a V1, a V2 e a entidade Pedido>\n- Não altere V1 nem V2; a coluna nova aceita null para os pedidos antigos.\n- Limite o texto a 200 caracteres no banco e na validação do DTO.\n- Mantenha @Version e @Enumerated(EnumType.STRING) como estão.\n- Diga como conferir com ddl-auto=validate e com o histórico do Flyway.',
    erros: [
      'Edita a `V1__pedidos.sql` em vez de criar uma migration nova.',
      'Cria a coluna com `not null` sem valor padrão, e a migration falha em tabelas com dados.',
      'Remove ou esquece o `@Version` ao reescrever a entidade.',
      'Usa `double precision` ou `float` para valores em dinheiro.',
    ],
    conferir: [
      'Rode a aplicação com `ddl-auto=validate` num banco que já tem a V1 e a V2.',
      'Consulte `select version, checksum from flyway_schema_history` antes e depois.',
      'Rode a migration num banco com pedidos já gravados, não só num banco vazio.',
    ],
  },
  recursos: [
    {
      titulo: 'Hibernate ORM User Guide: Optimistic locking',
      url: 'https://docs.hibernate.org/orm/7.0/userguide/html_single/#locking-optimistic',
      tipo: 'documentacao',
      porque: 'Como o `@Version` funciona e o SQL que o Hibernate gera.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakarta Persistence: Enumerated',
      url: 'https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/Enumerated.html',
      tipo: 'documentacao',
      porque: 'Os dois modos de gravar enums, `ORDINAL` e `STRING`, e o padrão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Flyway: Versioned Migrations',
      url: 'https://documentation.red-gate.com/fd/versioned-migrations-273973333.html',
      tipo: 'documentacao',
      porque: 'Nomes, ordem e o *checksum* que impede editar migrations antigas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Data JPA: Paging and Sorting',
      url: 'https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.special-parameters',
      tipo: 'documentacao',
      porque: 'O `Pageable` e o `Page` usados na listagem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'PostgreSQL: Numeric Types',
      url: 'https://www.postgresql.org/docs/current/datatype-numeric.html',
      tipo: 'documentacao',
      porque: 'Por que `numeric` é exato e `double precision` não, com as precisões de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'PostgreSQL: Multicolumn Indexes',
      url: 'https://www.postgresql.org/docs/current/indexes-multicolumn.html',
      tipo: 'documentacao',
      porque: 'Como a ordem das colunas de um índice composto decide quais consultas ele atende.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Use The Index, Luke: Paging Through Results',
      url: 'https://use-the-index-luke.com/sql/partial-results/fetch-next-page',
      tipo: 'artigo',
      porque: 'Por que o `offset` fica caro e como paginar pela chave.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Vlad Mihalcea: Optimistic locking with JPA and Hibernate',
      url: 'https://vladmihalcea.com/optimistic-locking-version-property-jpa-hibernate/',
      tipo: 'artigo',
      porque: 'O problema da atualização perdida e a coluna de versão, com o SQL de cada passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michelli Brito: Spring Boot, curso completo',
      url: 'https://www.youtube.com/watch?v=LXRU-Z36GEU',
      tipo: 'video',
      porque: 'Entidades, repositórios e banco numa API Spring Boot, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'High-Performance Java Persistence (Vlad Mihalcea)',
      url: 'https://vladmihalcea.com/books/high-performance-java-persistence/',
      tipo: 'livro',
      porque: 'O livro de referência sobre JPA e Hibernate com desempenho e concorrência.',
      onde: 'Parte 2, capítulo "Concurrency Control", seção sobre optimistic locking',
      gratuito: false,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Offset ou chave',
    enunciado:
      'Num `TreeMap<Long, String>` com os pedidos de id 1 a 100 (o id cresce com a data), escreva duas buscas de 10 pedidos, do mais novo para o mais antigo: `porOffset(pagina)`, que pula `pagina × 10` linhas, e `porChave(ultimoVisto)`, que começa no primeiro id menor que o último visto. Conte as linhas que cada uma percorre e imprima exatamente:\n\n```text\noffset (página 3): [70, 69, 68, 67, 66, 65, 64, 63, 62, 61] com 40 linhas lidas\nchave (depois do 71): [70, 69, 68, 67, 66, 65, 64, 63, 62, 61] com 10 linhas lidas\n```',
    dicas: [
      '`descendingMap()` percorre do maior para o menor, como o `order by criado_em desc`.',
      '`headMap(ultimoVisto, false)` devolve só as chaves menores, como o `where id < :ultimo` usando o índice.',
      'Conte uma linha a cada elemento visitado, inclusive os que o offset descarta.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;

public class Paginas {
    static final int TAMANHO = 10;
    static final TreeMap<Long, String> pedidos = new TreeMap<>();

    record Pagina(List<Long> ids, int lidas) {}

    static Pagina porOffset(int pagina) {
        List<Long> ids = new ArrayList<>();
        int lidas = 0;
        int pular = pagina * TAMANHO;
        for (Long id : pedidos.descendingMap().keySet()) {
            lidas++;
            if (pular > 0) {
                pular--;
                continue;
            }
            ids.add(id);
            if (ids.size() == TAMANHO) break;
        }
        return new Pagina(ids, lidas);
    }

    static Pagina porChave(long ultimoVisto) {
        List<Long> ids = new ArrayList<>();
        int lidas = 0;
        NavigableMap<Long, String> anteriores = pedidos.headMap(ultimoVisto, false).descendingMap();
        for (Map.Entry<Long, String> e : anteriores.entrySet()) {
            lidas++;
            ids.add(e.getKey());
            if (ids.size() == TAMANHO) break;
        }
        return new Pagina(ids, lidas);
    }

    public static void main(String[] args) {
        for (long id = 1; id <= 100; id++) {
            pedidos.put(id, "pedido " + id);
        }
        Pagina offset = porOffset(3);
        Pagina chave = porChave(71);
        System.out.println("offset (página 3): " + offset.ids() + " com " + offset.lidas() + " linhas lidas");
        System.out.println("chave (depois do 71): " + chave.ids() + " com " + chave.lidas() + " linhas lidas");
    }
}`,
    saida: 'offset (página 3): [70, 69, 68, 67, 66, 65, 64, 63, 62, 61] com 40 linhas lidas\nchave (depois do 71): [70, 69, 68, 67, 66, 65, 64, 63, 62, 61] com 10 linhas lidas',
    comentarios:
      'As duas devolvem a mesma página, mas o offset paga por todas as linhas descartadas, e o custo cresce com o número da página. A busca pela chave custa sempre o tamanho da página, porque o índice começa direto no ponto certo. A desvantagem: não dá para pular para a página 37; só para a próxima.',
  },
  bugs: [
    {
      id: 'backend-junior-t7-e03-b01',
      dificuldade: 1,
      sintoma: 'A primeira página da listagem nunca mostra os 20 pedidos mais novos. O log da consulta diz `primeira página: limit 20 offset 20`.',
      codigo: `public class Paginacao {
    static String sql(int pagina, int tamanho) {
        int offset = (pagina + 1) * tamanho;
        return "limit " + tamanho + " offset " + offset;
    }

    public static void main(String[] args) {
        System.out.println("primeira página: " + sql(0, 20));
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: 'primeira página: limit 20 offset 20' },
      correcao: `public class Paginacao {
    static String sql(int pagina, int tamanho) {
        int offset = pagina * tamanho;
        return "limit " + tamanho + " offset " + offset;
    }

    public static void main(String[] args) {
        System.out.println("primeira página: " + sql(0, 20));
    }
}`,
      saidaCorrigida: 'primeira página: limit 20 offset 0',
      dica: 'A página 0 deveria pular quantas linhas?',
      explicacao:
        'As páginas do `Pageable` começam em 0, e a página 0 não pula nada. O `+ 1` é o vício de quem pensa em páginas a partir de 1. Um teste com a primeira página e um com a última pegam esse erro.',
    },
    {
      id: 'backend-junior-t7-e03-b02',
      dificuldade: 2,
      sintoma: 'Depois do reajuste de segunda, a segunda via de um pedido antigo mostra o fone por `120.00`, e não pelos R$ 100,00 cobrados: `pedido antigo: 120.00`.',
      codigo: `import java.math.BigDecimal;

public class Reajuste {
    static class Produto {
        BigDecimal preco = new BigDecimal("100.00");
    }

    static class Item {
        final Produto produto;
        final BigDecimal precoUnitario;

        Item(Produto produto) {
            this.produto = produto;
            this.precoUnitario = produto.preco;
        }

        BigDecimal subtotal() {
            return produto.preco;
        }
    }

    public static void main(String[] args) {
        Produto fone = new Produto();
        Item item = new Item(fone);
        fone.preco = new BigDecimal("120.00");
        System.out.println("pedido antigo: " + item.subtotal());
    }
}`,
      linha: 18,
      efeito: { tipo: 'saida', saida: 'pedido antigo: 120.00' },
      correcao: `import java.math.BigDecimal;

public class Reajuste {
    static class Produto {
        BigDecimal preco = new BigDecimal("100.00");
    }

    static class Item {
        final Produto produto;
        final BigDecimal precoUnitario;

        Item(Produto produto) {
            this.produto = produto;
            this.precoUnitario = produto.preco;
        }

        BigDecimal subtotal() {
            return precoUnitario;
        }
    }

    public static void main(String[] args) {
        Produto fone = new Produto();
        Item item = new Item(fone);
        fone.preco = new BigDecimal("120.00");
        System.out.println("pedido antigo: " + item.subtotal());
    }
}`,
      saidaCorrigida: 'pedido antigo: 100.00',
      dica: 'O preço foi copiado na criação do item. A conta usa a cópia ou o produto?',
      explicacao:
        'O item guardou o preço certo, mas o cálculo lê o preço atual do produto. É o mesmo erro de não ter a coluna `preco_unitario`: o histórico passa a depender do catálogo de hoje.',
    },
    {
      id: 'backend-junior-t7-e03-b03',
      dificuldade: 3,
      sintoma: 'O pedido 42 foi pago e cancelado no mesmo segundo. As duas requisições responderam 200, e o banco ficou com `CANCELADO`, sem estorno: `1 1 Linha[situacao=CANCELADO, versao=4]`.',
      codigo: `import java.util.HashMap;
import java.util.Map;

public class SemTrava {
    record Linha(String situacao, long versao) {}
    static final Map<Long, Linha> tabela = new HashMap<>(Map.of(42L, new Linha("CRIADO", 3)));

    static int update(long id, String nova, long versaoLida) {
        Linha atual = tabela.get(id);
        if (atual == null) return 0;
        tabela.put(id, new Linha(nova, versaoLida + 1));
        return 1;
    }

    public static void main(String[] args) {
        long v1 = tabela.get(42L).versao();
        long v2 = tabela.get(42L).versao();
        int pagamento = update(42L, "PAGO", v1);
        int cancelamento = update(42L, "CANCELADO", v2);
        System.out.println(pagamento + " " + cancelamento + " " + tabela.get(42L));
    }
}`,
      linha: 10,
      efeito: { tipo: 'saida', saida: '1 1 Linha[situacao=CANCELADO, versao=4]' },
      correcao: `import java.util.HashMap;
import java.util.Map;

public class SemTrava {
    record Linha(String situacao, long versao) {}
    static final Map<Long, Linha> tabela = new HashMap<>(Map.of(42L, new Linha("CRIADO", 3)));

    static int update(long id, String nova, long versaoLida) {
        Linha atual = tabela.get(id);
        if (atual == null || atual.versao() != versaoLida) return 0;
        tabela.put(id, new Linha(nova, versaoLida + 1));
        return 1;
    }

    public static void main(String[] args) {
        long v1 = tabela.get(42L).versao();
        long v2 = tabela.get(42L).versao();
        int pagamento = update(42L, "PAGO", v1);
        int cancelamento = update(42L, "CANCELADO", v2);
        System.out.println(pagamento + " " + cancelamento + " " + tabela.get(42L));
    }
}`,
      saidaCorrigida: '1 0 Linha[situacao=PAGO, versao=4]',
      dica: 'As duas requisições leram a versão 3. Na hora de gravar, alguém confere se a linha ainda está nessa versão?',
      explicacao:
        'A versão é lida, mas o `update` não a compara, então a segunda gravação passa por cima da primeira: é a atualização perdida. Com o `and versao = ?`, que o `@Version` acrescenta, a segunda atualiza 0 linhas e vira 409.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t7-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que a tabela `itens_pedido` tem a coluna `preco_unitario`, se o produto já tem preço?',
      opcoes: [
        'Para guardar o preço do momento da compra, que não pode mudar quando o produto for reajustado',
        'Para a consulta da listagem ficar mais rápida',
        'Porque o JPA não segue relacionamentos',
        'Para o cliente poder informar o preço',
      ],
      resposta: 0,
      explicacao:
        'O pedido é um registro histórico: o que foi cobrado não muda. Apontar só para `produtos.preco` faria um reajuste alterar pedidos antigos, inclusive os já faturados.',
      dica: 'O que acontece com pedidos de março se o preço mudar em abril?',
    },
    {
      id: 'backend-junior-t7-e03-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `enum Situacao { CRIADO, PAGO, ENVIADO }

System.out.println(Situacao.PAGO.ordinal() + " " + Situacao.valueOf("ENVIADO").ordinal() + " " + Situacao.PAGO.name());`,
      resposta: '1 2 PAGO',
      explicacao:
        '`ordinal()` é a posição, começando em 0, e é o que o `EnumType.ORDINAL` grava. `name()` é o texto, gravado pelo `EnumType.STRING`, que não muda se a ordem mudar.',
      dica: 'As posições começam em 0.',
    },
    {
      id: 'backend-junior-t7-e03-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Alguém acrescentou uma coluna editando a `V1__pedidos.sql`, que já rodou em homologação. O que acontece no próximo deploy em homologação?',
      opcoes: [
        'O Flyway recusa subir: o checksum da V1 não bate com o gravado em `flyway_schema_history`',
        'O Flyway roda a V1 de novo e acrescenta a coluna',
        'Nada: a coluna aparece no próximo reinício',
        'O Hibernate cria a coluna sozinho',
      ],
      resposta: 0,
      explicacao:
        'O Flyway guarda um checksum de cada migration aplicada e confere na inicialização. Editar uma migration antiga é detectado como divergência. A coluna nova vai numa V3.',
      dica: 'O que o Flyway guarda sobre cada migration que já rodou?',
    },
    {
      id: 'backend-junior-t7-e03-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sobre o `@Version` na entidade `Pedido`, quais afirmações estão corretas? Escolha duas.',
      opcoes: [
        'O Hibernate acrescenta `and versao = ?` ao `where` de cada `update` e incrementa a coluna',
        'Quando o `update` não altera nenhuma linha, o Hibernate lança `OptimisticLockException`',
        'Ele trava a linha no banco desde a leitura até o fim da transação',
        'Ele impede duas leituras simultâneas do mesmo pedido',
        'Ele só funciona com o banco H2',
      ],
      respostas: [0, 1],
      explicacao:
        'A trava otimista não bloqueia nada: todos leem à vontade, e o conflito só é detectado na gravação, pelo contador de linhas. Travar desde a leitura é a trava pessimista, com `select ... for update`.',
      dica: '"Otimista" porque supõe que o conflito é raro e só confere no fim.',
    },
    {
      id: 'backend-junior-t7-e03-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para calcular o offset da página 50 (as páginas começam em 0).',
      codigo: `int pagina = 50, tamanho = 20;
int offset = pagina ___ tamanho;
System.out.println("limit " + tamanho + " offset " + offset);`,
      respostas: ['*'],
      saida: 'limit 20 offset 1000',
      explicacao: 'A página n pula n × tamanho linhas. É exatamente o SQL que o Spring Data gera a partir do `Pageable`.',
      dica: 'Quantas linhas as 50 páginas anteriores ocupam?',
    },
    {
      id: 'backend-junior-t7-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A trava otimista funciona como o `compareAndSet` das classes atômicas. Qual é a saída?',
      codigo: `import java.util.concurrent.atomic.AtomicLong;

public class Teste {
    public static void main(String[] args) {
        AtomicLong versao = new AtomicLong(3);
        boolean pagou = versao.compareAndSet(3, 4);
        boolean cancelou = versao.compareAndSet(3, 4);
        System.out.println(pagou + " " + cancelou + " " + versao.get());
    }
}`,
      opcoes: ['`true false 4`', '`true true 4`', '`true true 5`', '`false false 3`', '`true false 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        '"Troque para 4 se ainda for 3": a primeira chamada encontra 3 e troca; a segunda encontra 4 e falha. É a mesma regra do `update ... where versao = 3`.',
      dica: 'Depois da primeira chamada, o valor ainda é 3?',
    },
    {
      id: 'backend-junior-t7-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `ItemPedido` foi mapeado com `@ManyToOne(cascade = CascadeType.ALL) Produto produto`. Ao apagar um pedido antigo, o que pode acontecer?',
      opcoes: [
        'A remoção em cascata tenta apagar o produto também, que outros pedidos usam',
        'Nada: cascata só vale para inserções',
        'O pedido não pode ser apagado',
        'O produto ganha um item a menos no estoque',
      ],
      resposta: 0,
      explicacao:
        '`ALL` inclui `REMOVE`. Do pedido para os itens faz sentido, porque o item não existe sem o pedido. Do item para o produto, não: o produto é uma entidade independente.',
      dica: '`ALL` inclui quais operações?',
    },
    {
      id: 'backend-junior-t7-e03-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O cancelamento lançou `OptimisticLockException`. Qual é a resposta correta da API?',
      opcoes: [
        '409 Conflict, pedindo que o cliente recarregue o pedido e tente de novo',
        '500 Internal Server Error',
        '404 Not Found',
        '200 OK, ignorando a exceção',
        'Tentar de novo no servidor, em laço, até conseguir',
      ],
      resposta: 0,
      explicacao:
        'O pedido mudou desde a leitura, e a decisão do cliente pode não fazer mais sentido: talvez ele já esteja pago. Repetir às cegas no servidor reaplicaria a ação sobre um estado que o cliente não viu.',
      dica: 'O pedido ainda está na situação que o cliente viu?',
    },
    {
      id: 'backend-junior-t7-e03-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Quantas páginas de 20 a listagem de um ano tem? Digite a saída exata.',
      codigo: `long total = 1_095_000;
int tamanho = 20;
long paginas = (total + tamanho - 1) / tamanho;
System.out.println(paginas);`,
      resposta: '54750',
      explicacao:
        '1.095.000 ÷ 20 = 54.750, exato. O `+ tamanho - 1` arredonda para cima quando sobra: com 1.095.001 pedidos, seriam 54.751 páginas. É a conta do `getTotalPages()` do `Page`.',
      dica: 'Faça 1.095.000 ÷ 20; a soma só muda o resultado quando a divisão não é exata.',
    },
    {
      id: 'backend-junior-t7-e03-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual tipo de coluna do PostgreSQL combina com `BigDecimal` para guardar o total do pedido?',
      opcoes: ['`numeric(12,2)`', '`double precision`', '`real`', '`varchar(20)`'],
      resposta: 0,
      explicacao:
        '`numeric` é decimal e exato, como o `BigDecimal`. `double precision` e `real` são binários, com os mesmos erros do `double`. Texto impede somas e comparações no banco.',
      dica: 'Qual deles é exato em base 10?',
    },
    {
      id: 'backend-junior-t7-e03-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Com o índice `(situacao, criado_em desc)`, quais consultas ele atende bem? Escolha duas.',
      opcoes: [
        '`where situacao = \'PAGO\' order by criado_em desc limit 20`',
        '`where situacao = \'CRIADO\'`',
        '`where criado_em > now() - interval \'1 day\'`, sem filtrar a situação',
        '`order by total desc limit 10`',
        '`where cliente_id = 7`',
      ],
      respostas: [0, 1],
      explicacao:
        'Um índice composto é ordenado pela primeira coluna e, dentro dela, pela segunda. Ele serve para filtrar pela situação, com ou sem a ordem por data. Sem a situação no filtro, a data está espalhada pelo índice, e o banco não consegue usá-lo direto.',
      dica: 'Pense numa lista telefônica ordenada por sobrenome e depois por nome.',
    },
    {
      id: 'backend-junior-t7-e03-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'O `update` com a versão lida não alterou nenhuma linha. Complete para decidir a resposta.',
      codigo: `int linhas = 0;
String resultado = linhas ___ 0 ? "409 Conflict" : "200 OK";
System.out.println(resultado);`,
      respostas: ['==', '<='],
      saida: '409 Conflict',
      explicacao:
        'Zero linhas alteradas significa que a versão mudou entre a leitura e a gravação. É exatamente o teste que o Hibernate faz com o retorno do `executeUpdate` antes de lançar a `OptimisticLockException`.',
      dica: 'O conflito acontece quando nenhuma linha foi alterada.',
    },
    {
      id: 'backend-junior-t7-e03-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que não compila.',
      codigo: `record Linha(String situacao, long versao) {}

Linha l = new Linha("PAGO", 4);
l.versao()++;
System.out.println(l);`,
      resposta: 4,
      explicacao:
        '`l.versao()` devolve um valor, não uma variável, e `++` precisa de uma variável. Para "subir a versão" de um record, crie outro: `new Linha(l.situacao(), l.versao() + 1)`.',
      dica: 'O `++` precisa de algo em que possa gravar.',
    },
    {
      id: 'backend-junior-t7-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A tela de detalhe carrega o pedido e, ao percorrer `pedido.getItens()`, cada `item.getProduto().getNome()`. Com 5 itens, sem `join fetch`, quantas consultas saem no pior caso?',
      opcoes: ['7: o pedido, os itens e uma por produto', '1', '2: o pedido e os itens', '5: uma por item'],
      resposta: 0,
      explicacao:
        'Uma para o pedido, uma para a coleção de itens e uma para cada um dos 5 produtos, que são *lazy*: 1 + 1 + 5. É o N+1. O `join fetch` da consulta `buscarComItens` traz tudo numa só.',
      dica: 'Conte: o pedido, a lista de itens, e cada produto aberto no laço.',
    },
    {
      id: 'backend-junior-t7-e03-q15',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O banco devolveu o total com duas casas. Digite a saída exata.',
      codigo: `BigDecimal doBanco = new BigDecimal("10.00");
BigDecimal esperado = new BigDecimal("10.0");
System.out.println(doBanco.equals(esperado) + " " + (doBanco.compareTo(esperado) == 0));`,
      resposta: 'false true',
      explicacao:
        '`equals` do `BigDecimal` compara valor e escala: 10.00 tem escala 2, e 10.0, escala 1. `compareTo` compara só o valor. Num teste, use `isEqualByComparingTo` do AssertJ.',
      dica: '`equals` do `BigDecimal` também compara o número de casas.',
    },
  ],
};

export default episodio;
