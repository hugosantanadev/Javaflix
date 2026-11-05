import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T7: Projeto: API de pedidos. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t7-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O serviço aplica uma sequência de pedidos de mudança à máquina de estados. Qual é a saída?',
    codigo: `import java.util.EnumSet;
import java.util.List;
import java.util.Set;

public class Teste {
    enum Situacao {
        CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO;

        Set<Situacao> proximas() {
            return switch (this) {
                case CRIADO -> EnumSet.of(PAGO, CANCELADO);
                case PAGO -> EnumSet.of(ENVIADO, CANCELADO);
                case ENVIADO -> EnumSet.of(ENTREGUE);
                case ENTREGUE, CANCELADO -> EnumSet.noneOf(Situacao.class);
            };
        }
    }

    public static void main(String[] args) {
        Situacao atual = Situacao.CRIADO;
        int recusados = 0;
        for (Situacao pedido : List.of(Situacao.ENVIADO, Situacao.PAGO, Situacao.ENVIADO, Situacao.CANCELADO)) {
            if (atual.proximas().contains(pedido)) {
                atual = pedido;
            } else {
                recusados++;
            }
        }
        System.out.println(atual + " " + recusados);
    }
}`,
    opcoes: ['`ENVIADO 2`', '`CANCELADO 1`', '`ENVIADO 1`', '`CANCELADO 0`', '`CRIADO 4`', '`PAGO 2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`CRIADO` não vai direto para `ENVIADO` (recusado), vai para `PAGO`, depois para `ENVIADO`, e um enviado não pode ser cancelado (recusado). Termina `ENVIADO`, com duas recusas, que na API seriam dois 409.',
  },
  {
    id: 'backend-junior-t7-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.EnumSet;

public class Teste {
    enum Situacao { CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO }

    public static void main(String[] args) {
        EnumSet<Situacao> emAndamento = EnumSet.range(Situacao.PAGO, Situacao.ENTREGUE);
        System.out.println(emAndamento + " " + EnumSet.complementOf(emAndamento).size());
    }
}`,
    opcoes: [
      '`[PAGO, ENVIADO, ENTREGUE] 2`',
      '`[PAGO, ENVIADO] 3`',
      '`[PAGO, ENTREGUE] 3`',
      '`[PAGO, ENVIADO, ENTREGUE] 5`',
      'Não compila: `range` não existe em `EnumSet`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`range` inclui as duas pontas, na ordem da declaração. O complemento tem as outras duas: `CRIADO` e `CANCELADO`. Por isso a ordem das constantes no enum importa também no código, e não só no banco.',
  },
  {
    id: 'backend-junior-t7-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Em `POST /pedidos`, o corpo é um JSON válido, mas um dos itens tem um SKU que não existe no catálogo. Pelo contrato da temporada, qual é a resposta?',
    opcoes: [
      '422 Unprocessable Content, porque o pedido está bem formado mas não pode ser processado',
      '400 Bad Request, porque o SKU é inválido',
      '404 Not Found, porque o produto não existe',
      '409 Conflict',
      '500 Internal Server Error',
    ],
    resposta: 0,
    explicacao:
      'O 400 fica para o formato (campo obrigatório ausente, quantidade negativa). O 404 se refere ao recurso da URL, que é `/pedidos`. O 409 é para o estado de um recurso existente. O SKU inexistente é uma regra de negócio sobre dados válidos: 422.',
  },
  {
    id: 'backend-junior-t7-prova-q04',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais rotas seguem o contrato desenhado na temporada? Escolha duas.',
    opcoes: [
      '`POST /pedidos/{id}/cancelamento`',
      '`GET /pedidos?situacao=PAGO&page=2`',
      '`POST /cancelarPedido?id=42`',
      '`PUT /pedidos/{id}` com `{"situacao": "PAGO"}`',
      '`GET /pedidos/listar-pagos`',
      '`DELETE /pedidos/{id}` para cancelar',
    ],
    respostas: [0, 1],
    explicacao:
      'Ações viram sub-recursos com substantivo, e filtros vão na query string. Verbos no caminho fogem do REST; o `PUT` com a situação deixa o cliente escolher a transição; e `DELETE` apagaria o pedido, quando cancelar é uma mudança de estado que precisa ficar registrada.',
  },
  {
    id: 'backend-junior-t7-prova-q05',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    record ItemPedido(String sku, int quantidade) {
        ItemPedido {
            sku = sku.strip().toUpperCase();
            if (quantidade <= 0) throw new IllegalArgumentException("quantidade");
        }
    }

    record NovoPedido(List<ItemPedido> itens) {
        NovoPedido {
            itens = List.copyOf(itens);
        }
    }

    public static void main(String[] args) {
        List<ItemPedido> itens = new ArrayList<>();
        itens.add(new ItemPedido(" caneca ", 2));
        NovoPedido pedido = new NovoPedido(itens);
        itens.add(new ItemPedido("cafe", 1));
        System.out.println(pedido.itens().size() + " " + pedido.itens().get(0).sku());
    }
}`,
    opcoes: ['`1 CANECA`', '`2 CANECA`', '`1  caneca `', '`2 caneca`', 'Lança `IllegalArgumentException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O construtor compacto do item normaliza o SKU antes de gravar o campo. O do pedido copia a lista, então o item acrescentado depois não aparece. É a combinação de validação e imutabilidade que torna o DTO seguro.',
  },
  {
    id: 'backend-junior-t7-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Três itens de R$ 0,335, arredondando em `HALF_EVEN`. Qual é a saída?',
    codigo: `import java.math.BigDecimal;
import java.math.RoundingMode;

public class Teste {
    public static void main(String[] args) {
        BigDecimal preco = new BigDecimal("0.335");
        BigDecimal tres = BigDecimal.valueOf(3);
        BigDecimal porItem = preco.setScale(2, RoundingMode.HALF_EVEN).multiply(tres);
        BigDecimal noFim = preco.multiply(tres).setScale(2, RoundingMode.HALF_EVEN);
        System.out.println(porItem + " " + noFim);
    }
}`,
    opcoes: ['`1.02 1.00`', '`1.02 1.01`', '`0.99 1.00`', '`1.00 1.00`', '`1.005 1.00`', '`1.02 1.02`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'No `HALF_EVEN`, um 5 exato arredonda para o vizinho par. 0,335 vira 0,34 (o 3 é ímpar, sobe para 4), e 3 × 0,34 = 1,02. Já 1,005 vira 1,00 (o 0 é par, fica). Dois centavos de diferença no mesmo pedido, conforme a regra escolhida.',
  },
  {
    id: 'backend-junior-t7-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Com `spring.jpa.open-in-view=false`, o controller devolve a entidade `Pedido`, que tem `@ManyToOne(fetch = LAZY) Cliente cliente`. A rota responde 500. Qual é a melhor correção?',
    opcoes: [
      'Montar um `PedidoResposta` no service, dentro da transação, com os dados do cliente de que a tela precisa',
      'Ligar `open-in-view=true` em produção',
      'Trocar o relacionamento para `EAGER` em todas as entidades',
      'Anotar o controller com `@Transactional`',
      'Pôr `@JsonIgnore` no campo `cliente` e deixar o aplicativo sem o nome',
    ],
    resposta: 0,
    explicacao:
      'O DTO resolve a causa: o service lê o que precisa enquanto a sessão está aberta, e o Jackson recebe só dados. As outras opções ou escondem o problema (`open-in-view`, transação no controller), ou criam outro (`EAGER` em tudo carrega dados demais).',
  },
  {
    id: 'backend-junior-t7-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Um enum era gravado com `EnumType.ORDINAL`. O programa simula o que um deploy que insere uma constante faz com um pedido antigo. Qual é a saída?',
    codigo: `public class Teste {
    enum Antes { CRIADO, PAGO, ENVIADO, ENTREGUE }
    enum Depois { CRIADO, PAGO, SEPARADO, ENVIADO, ENTREGUE }

    public static void main(String[] args) {
        int gravado = Antes.ENVIADO.ordinal();
        Depois lido = Depois.values()[gravado];
        System.out.println(gravado + " " + lido + " " + Depois.valueOf(Antes.ENVIADO.name()));
    }
}`,
    opcoes: [
      '`2 SEPARADO ENVIADO`',
      '`2 ENVIADO ENVIADO`',
      '`3 ENVIADO ENVIADO`',
      '`2 SEPARADO SEPARADO`',
      'Lança `IllegalArgumentException`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O banco guardou a posição 2, que depois do deploy é `SEPARADO`: o pedido "voltou" uma etapa sem nenhum SQL. Pelo nome, como o `EnumType.STRING` grava, a leitura continua certa.',
  },
  {
    id: 'backend-junior-t7-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Três requisições leem o pedido 42 na versão 5 e tentam gravar, nesta ordem, pagar, cancelar e pagar de novo. O programa simula o `update ... where versao = ?`. Qual é a saída?',
    codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    static long versao = 5;
    static String situacao = "CRIADO";

    static int update(String nova, long versaoLida) {
        if (versao != versaoLida) return 0;
        situacao = nova;
        versao++;
        return 1;
    }

    public static void main(String[] args) {
        long lida = versao;
        List<Integer> linhas = new ArrayList<>();
        linhas.add(update("PAGO", lida));
        linhas.add(update("CANCELADO", lida));
        linhas.add(update("PAGO", lida));
        System.out.println(linhas + " " + situacao + " v" + versao);
    }
}`,
    opcoes: [
      '`[1, 0, 0] PAGO v6`',
      '`[1, 1, 1] PAGO v8`',
      '`[1, 0, 1] PAGO v7`',
      '`[1, 1, 0] CANCELADO v7`',
      '`[0, 0, 0] CRIADO v5`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Só a primeira encontra a versão 5. Depois dela, a linha está na 6, e as outras duas atualizam 0 linhas, o que o Hibernate transforma em `OptimisticLockException` e a API em 409.',
  },
  {
    id: 'backend-junior-t7-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Depois do 409 por `OptimisticLockException`, um colega propõe que o service repita o cancelamento automaticamente até conseguir. Por que isso é um problema neste caso?',
    opcoes: [
      'A nova tentativa aplicaria o cancelamento sobre um estado que o cliente não viu, como um pedido que acabou de ser pago, e a decisão dele pode não valer mais',
      'Porque o Hibernate não permite tentar de novo',
      'Porque a versão nunca muda depois do primeiro conflito',
      'Porque repetir sempre gera um deadlock',
      'Não é problema: repetir é sempre a resposta para conflitos',
    ],
    resposta: 0,
    explicacao:
      'Repetir automaticamente faz sentido quando a operação não depende do que o usuário viu, como somar um contador. Mudar a situação de um pedido depende: quem cancela um pedido criado talvez não cancelasse um já pago. O 409 devolve a decisão ao cliente.',
  },
  {
    id: 'backend-junior-t7-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A listagem tem 41 pedidos pagos, em páginas de 20. Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        int total = 41, tamanho = 20;
        int paginas = (total + tamanho - 1) / tamanho;
        int naUltima = total - (paginas - 1) * tamanho;
        String sqlUltima = "limit " + tamanho + " offset " + (paginas - 1) * tamanho;
        System.out.println(paginas + " " + naUltima + " " + sqlUltima);
    }
}`,
    opcoes: [
      '`3 1 limit 20 offset 40`',
      '`2 1 limit 20 offset 40`',
      '`3 1 limit 20 offset 60`',
      '`2 21 limit 20 offset 20`',
      '`3 20 limit 20 offset 40`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'São 3 páginas (20, 20 e 1), numeradas de 0 a 2. A última pula 2 × 20 = 40 linhas. Esse caso, com uma página de um item só, é um ótimo teste da listagem.',
  },
  {
    id: 'backend-junior-t7-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Uma colega editou a `V1__pedidos.sql`, que já rodou em homologação e produção, para corrigir o tamanho de uma coluna. Qual é o caminho certo?',
    opcoes: [
      'Desfazer a edição da V1 e criar uma `V3` com o `alter table`',
      'Manter a edição e rodar `flyway repair` em todos os ambientes, sem mais nada',
      'Apagar a tabela `flyway_schema_history` e subir de novo',
      'Ligar `ddl-auto=update` para o Hibernate ajustar a coluna',
      'Manter a edição; o Flyway roda a V1 de novo e corrige a coluna',
    ],
    resposta: 0,
    explicacao:
      'Migrations aplicadas são história: os bancos existentes já rodaram a V1 antiga e não a rodam de novo. O `repair` só atualizaria o checksum, e a coluna continuaria errada nos bancos antigos. Uma migration nova leva a correção a todos.',
  },
  {
    id: 'backend-junior-t7-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'A regra é "conta como pedido do dia o que foi criado a partir de 00:00". O teste usa 09:30 e 23:59 do dia anterior. O programa compara a implementação com um mutante. Qual é a saída?',
    codigo: `import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Predicate;

public class Teste {
    public static void main(String[] args) {
        LocalDateTime inicio = LocalDateTime.of(2026, 10, 31, 0, 0);
        Predicate<LocalDateTime> original = c -> !c.isBefore(inicio);
        Predicate<LocalDateTime> mutante = c -> c.isAfter(inicio);
        List<LocalDateTime> casosDoTeste = List.of(
                LocalDateTime.of(2026, 10, 31, 9, 30), LocalDateTime.of(2026, 10, 30, 23, 59));
        boolean morre = casosDoTeste.stream().anyMatch(c -> original.test(c) != mutante.test(c));
        boolean morreComMeiaNoite = morre || original.test(inicio) != mutante.test(inicio);
        System.out.println(morre + " " + morreComMeiaNoite);
    }
}`,
    opcoes: ['`false true`', '`true true`', '`false false`', '`true false`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Para 09:30 e 23:59, `isAfter` e `!isBefore` concordam, e o mutante sobrevive. Só 00:00 em ponto, a fronteira, os distingue. A suíte precisa desse caso para que um `isAfter` escrito por engano seja pego.',
  },
  {
    id: 'backend-junior-t7-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Uma situação nova, `SEPARADO`, entra no enum. Quantos casos o teste parametrizado gerado por laço passa a ter, e quantos deles devem ser proibidos se as transições permitidas passarem a ser 6?',
    codigo: `public class Teste {
    enum Situacao { CRIADO, PAGO, SEPARADO, ENVIADO, ENTREGUE, CANCELADO }

    public static void main(String[] args) {
        int n = Situacao.values().length;
        int permitidas = 6;
        System.out.println(n * n + " " + (n * n - permitidas));
    }
}`,
    opcoes: ['`36 30`', '`25 19`', '`30 24`', '`36 6`', '`12 6`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Com 6 situações, são 6 × 6 = 36 combinações, e 30 proibidas. O teste gerado por laço acompanha o enum sozinho; uma tabela escrita à mão precisaria de 11 linhas novas, e alguém esqueceria alguma.',
  },
  {
    id: 'backend-junior-t7-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'O relatório mostra 96% de cobertura de linhas e 61% de ramos no pacote `pedido`, e o PIT relata 14 mutantes sobreviventes no `Pedido.java`. Qual é a conclusão mais correta?',
    opcoes: [
      'Quase todo o código é executado, mas muitas decisões só foram testadas por um lado e vários resultados não são conferidos; os sobreviventes apontam os testes que faltam',
      'A suíte está ótima, porque 96% passa de qualquer meta',
      'O PIT está errado, porque a cobertura é alta',
      'É preciso apagar os testes e começar de novo',
      'Basta acrescentar testes até a cobertura de linhas chegar a 100%',
    ],
    resposta: 0,
    explicacao:
      'Linhas executadas não são linhas conferidas. A diferença para a cobertura de ramos e os mutantes vivos mostram onde estão as lacunas: fronteiras, o lado `else` de decisões e asserções ausentes.',
  },
  {
    id: 'backend-junior-t7-prova-q16',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais testes pertencem à base da pirâmide do projeto, rodando sem Spring e sem banco? Escolha dois.',
    opcoes: [
      'As 25 combinações da máquina de estados no enum `Situacao`',
      'O cálculo do total em `Pedido.adicionar`, com preços de três casas',
      'A resposta 409 do `POST /pedidos/{id}/cancelamento`',
      'A ordem da listagem com o índice do PostgreSQL',
      'O `@Version` com duas transações reais',
    ],
    respostas: [0, 1],
    explicacao:
      'Regras e cálculos em classes comuns se testam em milissegundos, sem contexto. O 409 precisa da fatia web; a listagem e o `@Version`, de um banco de verdade.',
  },
  {
    id: 'backend-junior-t7-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O script de deploy escolhe a tag mais nova. Qual é a saída?',
    codigo: `import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Teste {
    static int[] partes(String v) {
        return Arrays.stream(v.split("[.]")).mapToInt(Integer::parseInt).toArray();
    }

    public static void main(String[] args) {
        List<String> tags = List.of("1.9.12", "1.10.0", "1.10.2", "1.9.3");
        String comoTexto = tags.stream().max(Comparator.naturalOrder()).get();
        String comoVersao = tags.stream().max(Comparator.comparing(Teste::partes, Arrays::compare)).get();
        System.out.println(comoTexto + " " + comoVersao);
    }
}`,
    opcoes: ['`1.9.3 1.10.2`', '`1.10.2 1.10.2`', '`1.9.12 1.10.2`', '`1.9.3 1.10.0`', '`1.9.12 1.9.12`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Como texto, o maior é o que tem o maior caractere na primeira diferença: `1.9.3` ganha de `1.9.12` (3 > 1) e de `1.10.x` (9 > 1). Como versão, `1.10.2` é a mais nova.',
  },
  {
    id: 'backend-junior-t7-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'O `application.properties` tem `spring.datasource.password=${DB_SENHA:pedidos123}`, para "facilitar o desenvolvimento". Qual é o risco?',
    opcoes: [
      'Se a variável faltar em produção, a aplicação sobe com a senha de exemplo, em vez de falhar no deploy, e a senha fica no Git para sempre',
      'Nenhum: o padrão só vale na máquina local',
      'O Spring recusa placeholders com padrão em senhas',
      'A senha fica visível só no Swagger',
      'O padrão desliga a variável de ambiente',
    ],
    resposta: 0,
    explicacao:
      'O padrão vale em qualquer lugar em que a variável não exista, inclusive produção. Para segredos, a ausência deve impedir a inicialização. A conveniência local vai num `.env` fora do Git ou nas configurações de execução da IDE.',
  },
  {
    id: 'backend-junior-t7-prova-q19',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Sobre o caminho de entrega da temporada, quais afirmações estão corretas? Escolha duas.',
    opcoes: [
      'O mesmo jar vai para homologação e produção; só as variáveis de ambiente mudam',
      'O balanceador só manda tráfego para instâncias cujo `/actuator/health` responde `UP`',
      'O CI precisa da senha do banco de produção para rodar os testes de integração',
      'Cada ambiente tem o seu jar, compilado com o seu `application.properties`',
      'Um health check deve responder `UP` sempre que o processo estiver rodando',
    ],
    respostas: [0, 1],
    explicacao:
      'O artefato único garante que o testado é o entregue, e o health check protege os clientes de uma instância quebrada. O CI usa o banco do Testcontainers, e um health check que ignora o banco dá falsa confiança.',
  },
  {
    id: 'backend-junior-t7-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'A versão atual da API é 1.6.3. A entrega renomeia o campo `total` para `valorTotal`, acrescenta a rota de histórico e corrige um bug no frete. Qual é a próxima versão, e o que fazer pelos clientes atuais?',
    opcoes: [
      '2.0.0, mantendo a versão 1 no ar por um período (por exemplo, em `/v1`) para quem ainda lê `total`',
      '1.7.0, porque a mudança mais visível é a rota nova',
      '1.6.4, porque há uma correção de bug',
      '2.0.0, desligando a versão 1 no mesmo dia',
      '1.7.3, somando as três mudanças',
    ],
    resposta: 0,
    explicacao:
      'A mudança mais forte decide: renomear um campo quebra quem o lê, então sobe a maior, e as outras voltam a zero. Desligar a versão antiga de imediato quebraria os aplicativos que ainda não foram atualizados.',
  },
];

export default prova;
