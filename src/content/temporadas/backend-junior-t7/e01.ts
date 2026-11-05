import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t7-e01',
  minutos: 13,
  aula,
  armadilhas: [
    'Um critério que não dá para transformar em teste ("o sistema deve ser rápido") ainda não é um critério de aceitação.',
    'Mudar a situação do pedido com `PUT` ou `PATCH` no corpo deixa o cliente pular etapas; ações como pagar e cancelar são recursos próprios.',
    'Uma transição proibida não é erro do servidor: responda 409 Conflict, não 500.',
    'Regras de transição espalhadas em `if`s nos controllers divergem com o tempo; deixe-as num lugar só, no enum ou na entidade.',
    '`EnumSet` imprime as constantes na ordem em que foram declaradas, não na ordem em que você as passou.',
    'Escolher microsserviços antes de estimar o volume complica o projeto sem resolver nenhum problema real.',
    'Pacotes por camada (`controller`, `service`, `repository`) obrigam tudo a ser público; pacotes por funcionalidade permitem esconder o que é interno.',
  ],
  ia: {
    uso:
      'Na fase de planejamento, a IA é ótima para encontrar cenários que você esqueceu e péssima para decidir regras de negócio, porque não conhece a loja. Leve as histórias e as regras já escritas e use-a como revisora: ela lista casos de borda, sugere status HTTP e aponta inconsistências entre a tabela de rotas e as regras.',
    pedido:
      'Revise o contrato desta API REST de pedidos, que vai ser feita em Spring Boot 4.\n<cole aqui as histórias, a máquina de estados e a tabela de rotas>\n- Liste os cenários de cada história que não estão cobertos, incluindo os de erro.\n- Para cada rota, confira o status de sucesso e os de erro; transição proibida deve ser 409.\n- Aponte qualquer rota que permita ao cliente mudar a situação do pedido direto.\n- Não invente regras de negócio: quando faltar informação, escreva a pergunta que devo fazer.',
    erros: [
      'Propõe `PUT /pedidos/{id}` com a situação no corpo, o que permite pular de `CRIADO` para `ENTREGUE`.',
      'Usa 400 ou 500 para uma transição proibida, em vez de 409.',
      'Inventa regras que ninguém pediu, como prazo de cancelamento ou taxa de frete, e as apresenta como fato.',
      'Sugere microsserviços, filas e cache para um volume que um banco só atende com folga.',
    ],
    conferir: [
      'Para cada regra que a IA citar, ache a frase da história de onde ela veio; se não houver, é invenção.',
      'Percorra a máquina de estados e confira que cada transição proibida tem uma linha de erro na tabela.',
      'Refaça a estimativa de volume com os seus números antes de aceitar uma sugestão de arquitetura.',
    ],
  },
  recursos: [
    {
      titulo: 'Martin Fowler: Given When Then',
      url: 'https://martinfowler.com/bliki/GivenWhenThen.html',
      tipo: 'artigo',
      porque: 'O formato mais usado para escrever critérios de aceitação que viram testes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: Monolith First',
      url: 'https://martinfowler.com/bliki/MonolithFirst.html',
      tipo: 'artigo',
      porque: 'Por que começar com um monolito bem dividido antes de pensar em microsserviços.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michael Nygard: Documenting Architecture Decisions',
      url: 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions',
      tipo: 'artigo',
      porque: 'O texto original dos registros de decisão (ADRs), curtos e guardados no repositório.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: Richardson Maturity Model',
      url: 'https://martinfowler.com/articles/richardsonMaturityModel.html',
      tipo: 'artigo',
      porque: 'Recursos, verbos e status: a base para desenhar as rotas do contrato.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OpenAPI Specification',
      url: 'https://spec.openapis.org/oas/latest.html',
      tipo: 'documentacao',
      porque: 'O formato padrão para escrever o contrato da API antes do código.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'RFC 9110: 409 Conflict',
      url: 'https://www.rfc-editor.org/rfc/rfc9110.html#name-409-conflict',
      tipo: 'documentacao',
      porque: 'A definição do status que a API usa para transições proibidas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: EnumSet',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/EnumSet.html',
      tipo: 'documentacao',
      porque: 'O conjunto de constantes de enum usado na máquina de estados, e por que ele é tão rápido.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Initializr',
      url: 'https://start.spring.io/',
      tipo: 'ferramenta',
      porque: 'Onde o projeto da temporada nasce, com as dependências escolhidas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'AlgaWorks: Boas práticas para uma API RESTful',
      url: 'https://www.youtube.com/watch?v=P-juXKmJy_g',
      tipo: 'video',
      porque: 'Nomes de recursos, verbos e status, em português, antes de escrever o primeiro controller.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Master Dev: Boas práticas de nomenclatura das URIs',
      url: 'https://www.youtube.com/watch?v=5Bj3xzKb-Uo',
      tipo: 'video',
      porque: 'Como nomear caminhos e quando uma ação vira um sub-recurso.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Domain-Driven Design (Eric Evans)',
      url: 'https://www.domainlanguage.com/ddd/',
      tipo: 'livro',
      porque: 'A referência para conversar com quem conhece o negócio e transformar regras em modelo.',
      onde: 'Parte I, capítulo 2, "Communication and the Use of Language"',
      gratuito: false,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'A máquina de estados com histórico',
    enunciado:
      'Escreva uma classe `Pedido` com a situação atual e um histórico das transições. O método `mudarPara(Situacao destino)` aceita só as transições da aula e, quando a transição é proibida, lança `IllegalStateException` com a mensagem `pedido 7: ENVIADO -> CANCELADO não é permitido`. Monte o fluxo abaixo e imprima exatamente:\n\n```text\nCRIADO -> PAGO\nPAGO -> ENVIADO\nerro: pedido 7: ENVIADO -> CANCELADO não é permitido\nENVIADO -> ENTREGUE\nfinal: ENTREGUE (3 transições)\n```',
    dicas: [
      'Reaproveite o `enum Situacao` com o método `proximas()` da aula.',
      'O histórico pode ser uma `List<String>` com uma linha por transição aceita.',
      'Só grave no histórico depois de conferir a transição.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

public class Fluxo {
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

    static class Pedido {
        private final long id;
        private Situacao situacao = Situacao.CRIADO;
        private final List<String> historico = new ArrayList<>();

        Pedido(long id) {
            this.id = id;
        }

        void mudarPara(Situacao destino) {
            if (!situacao.proximas().contains(destino)) {
                throw new IllegalStateException("pedido " + id + ": " + situacao + " -> " + destino + " não é permitido");
            }
            historico.add(situacao + " -> " + destino);
            System.out.println(situacao + " -> " + destino);
            situacao = destino;
        }
    }

    public static void main(String[] args) {
        Pedido p = new Pedido(7);
        p.mudarPara(Situacao.PAGO);
        p.mudarPara(Situacao.ENVIADO);
        try {
            p.mudarPara(Situacao.CANCELADO);
        } catch (IllegalStateException e) {
            System.out.println("erro: " + e.getMessage());
        }
        p.mudarPara(Situacao.ENTREGUE);
        System.out.println("final: " + p.situacao + " (" + p.historico.size() + " transições)");
    }
}`,
    saida: 'CRIADO -> PAGO\nPAGO -> ENVIADO\nerro: pedido 7: ENVIADO -> CANCELADO não é permitido\nENVIADO -> ENTREGUE\nfinal: ENTREGUE (3 transições)',
    comentarios:
      'A conferência vem antes de qualquer mudança: se a transição é proibida, nem a situação nem o histórico mudam. Na API, essa `IllegalStateException` (ou uma exceção sua que a estenda) é o que o tratador de erros traduz para 409. O histórico vira, mais adiante, uma tabela de auditoria.',
  },
  bugs: [
    {
      id: 'backend-junior-t7-e01-b01',
      dificuldade: 1,
      sintoma: 'O suporte recebeu um pedido já enviado que foi cancelado pelo aplicativo. O teste da regra imprime `ENVIADO pode cancelar? true`.',
      codigo: `public class Pedidos {
    enum Situacao { CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO }

    static boolean podeCancelar(Situacao s) {
        return s != Situacao.ENTREGUE;
    }

    public static void main(String[] args) {
        System.out.println("ENVIADO pode cancelar? " + podeCancelar(Situacao.ENVIADO));
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'ENVIADO pode cancelar? true' },
      correcao: `public class Pedidos {
    enum Situacao { CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO }

    static boolean podeCancelar(Situacao s) {
        return s == Situacao.CRIADO || s == Situacao.PAGO;
    }

    public static void main(String[] args) {
        System.out.println("ENVIADO pode cancelar? " + podeCancelar(Situacao.ENVIADO));
    }
}`,
      saidaCorrigida: 'ENVIADO pode cancelar? false',
      dica: 'A regra diz quais situações **podem** ser canceladas. O código lista as que podem ou as que não podem?',
      explicacao:
        'A condição negativa deixa passar tudo o que não foi lembrado: `ENVIADO` e até `CANCELADO`. Escreva a lista do que é permitido, que é a regra da história. Melhor ainda, use a máquina de estados, que obriga a decidir cada situação.',
    },
    {
      id: 'backend-junior-t7-e01-b02',
      dificuldade: 2,
      sintoma: 'O pedido de 3 canecas de R$ 19,90 aparece no e-mail como `Total: 59.699999999999996`.',
      codigo: `import java.math.BigDecimal;

public class Total {
    public static void main(String[] args) {
        BigDecimal preco = new BigDecimal("19.90");
        int quantidade = 3;
        double total = preco.doubleValue() * quantidade;
        System.out.println("Total: " + total);
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'Total: 59.699999999999996' },
      correcao: `import java.math.BigDecimal;

public class Total {
    public static void main(String[] args) {
        BigDecimal preco = new BigDecimal("19.90");
        int quantidade = 3;
        BigDecimal total = preco.multiply(BigDecimal.valueOf(quantidade));
        System.out.println("Total: " + total);
    }
}`,
      saidaCorrigida: 'Total: 59.70',
      dica: 'O preço começou exato. Em que momento ele deixou de ser?',
      explicacao:
        '`doubleValue()` converte para binário, em que 19,90 não é exato, e a multiplicação expõe o erro. Faça a conta inteira em `BigDecimal`, com `multiply`, e a escala de duas casas se mantém.',
    },
    {
      id: 'backend-junior-t7-e01-b03',
      dificuldade: 3,
      sintoma: 'Cancelar um pedido enviado deveria responder 409, mas o monitoramento mostra `HTTP 500` e um alerta de erro do servidor.',
      codigo: `public class Status {
    static class TransicaoInvalida extends RuntimeException {}
    static class NaoEncontrado extends RuntimeException {}

    static int status(RuntimeException e) {
        if (e instanceof NaoEncontrado) return 404;
        if (e instanceof IllegalStateException) return 409;
        return 500;
    }

    static void cancelar(String situacao) {
        if (situacao.equals("ENVIADO")) throw new TransicaoInvalida();
    }

    public static void main(String[] args) {
        try {
            cancelar("ENVIADO");
        } catch (RuntimeException e) {
            System.out.println("HTTP " + status(e));
        }
    }
}`,
      linha: 2,
      efeito: { tipo: 'saida', saida: 'HTTP 500' },
      correcao: `public class Status {
    static class TransicaoInvalida extends IllegalStateException {}
    static class NaoEncontrado extends RuntimeException {}

    static int status(RuntimeException e) {
        if (e instanceof NaoEncontrado) return 404;
        if (e instanceof IllegalStateException) return 409;
        return 500;
    }

    static void cancelar(String situacao) {
        if (situacao.equals("ENVIADO")) throw new TransicaoInvalida();
    }

    public static void main(String[] args) {
        try {
            cancelar("ENVIADO");
        } catch (RuntimeException e) {
            System.out.println("HTTP " + status(e));
        }
    }
}`,
      saidaCorrigida: 'HTTP 409',
      dica: 'O tratador de erros procura um tipo específico de exceção para responder 409. A exceção lançada é desse tipo?',
      explicacao:
        'O tratador traduz por tipo, e `TransicaoInvalida` não é uma `IllegalStateException`, então cai no 500. Faça a exceção de negócio estender o tipo que o tratador espera, ou trate `TransicaoInvalida` explicitamente, e cubra o 409 com um teste.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t7-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destas frases é um bom critério de aceitação para a história "Como cliente, quero cancelar um pedido"?',
      opcoes: [
        'Um pedido `CRIADO` ou `PAGO` passa a `CANCELADO`; um pedido `ENVIADO` responde 409 e continua `ENVIADO`',
        'O cancelamento deve ser rápido e fácil de usar',
        'O sistema deve tratar todos os erros de cancelamento',
        'O botão de cancelar deve ser vermelho',
      ],
      resposta: 0,
      explicacao:
        'Um critério bom diz a situação de partida, a ação e o resultado esperado, e por isso vira teste. "Rápido" e "todos os erros" não têm como ser conferidos; a cor do botão é decisão de interface, não da API.',
      dica: 'Qual das frases você conseguiria transformar num teste automatizado?',
    },
    {
      id: 'backend-junior-t7-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `enum Situacao {
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

System.out.println(Situacao.PAGO.proximas().contains(Situacao.CANCELADO));
System.out.println(Situacao.ENVIADO.proximas());`,
      resposta: 'true\n[ENTREGUE]',
      explicacao: 'Um pedido pago ainda pode ser cancelado. O enviado só segue para entregue, e o `EnumSet` imprime como uma lista entre colchetes.',
      dica: 'Procure o `case` de cada situação e veja o que está no conjunto.',
    },
    {
      id: 'backend-junior-t7-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O cliente chama `POST /pedidos/42/cancelamento`, mas o pedido 42 já foi enviado. Qual resposta segue o contrato?',
      opcoes: [
        '409 Conflict, com um corpo que explica que um pedido enviado não pode ser cancelado',
        '500 Internal Server Error',
        '404 Not Found',
        '200 OK, sem mudar nada',
        '400 Bad Request',
      ],
      resposta: 0,
      explicacao:
        'A requisição está bem formada e o pedido existe, então não é 400 nem 404. O que impede é o estado atual do recurso, que é exatamente o caso do 409. O 500 diria que a API quebrou, e o 200 mentiria que deu certo.',
      dica: 'A requisição está correta e o pedido existe. O que impede o cancelamento?',
    },
    {
      id: 'backend-junior-t7-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais rotas seguem o estilo do contrato da aula? Escolha duas.',
      opcoes: [
        '`GET /pedidos?situacao=PAGO&page=0`',
        '`POST /pedidos/{id}/pagamento`',
        '`GET /buscarPedidosPagos`',
        '`PATCH /pedidos/{id}` com `{"situacao": "ENTREGUE"}`',
        '`POST /pedidos/{id}/cancelar-pedido-agora`',
      ],
      respostas: [0, 1],
      explicacao:
        'Filtros vão na *query string* do recurso, e ações viram sub-recursos com substantivos. Um verbo no caminho foge do padrão REST, e o `PATCH` na situação deixa o cliente pular etapas da máquina de estados.',
      dica: 'Substantivos no caminho, verbos no método HTTP, e ninguém muda a situação direto.',
    },
    {
      id: 'backend-junior-t7-e01-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para criar o conjunto com as duas situações seguintes a `CRIADO`.',
      codigo: `enum Situacao { CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO }

Set<Situacao> proximas = EnumSet.___(Situacao.PAGO, Situacao.CANCELADO);
System.out.println(proximas);`,
      respostas: ['of'],
      saida: '[PAGO, CANCELADO]',
      explicacao: '`EnumSet.of` cria o conjunto com as constantes passadas. Há também `noneOf`, para o vazio, `allOf` e `range`.',
      dica: 'É o mesmo método de fábrica que `List` e `Set` têm.',
    },
    {
      id: 'backend-junior-t7-e01-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Alguém acrescentou `ENVIADO` ao enum. Clique na linha que deixou de compilar.',
      codigo: `enum Situacao { CRIADO, PAGO, ENVIADO }

Situacao s = Situacao.PAGO;
String texto = switch (s) {
    case CRIADO -> "novo";
    case PAGO -> "pago";
};
System.out.println(texto);`,
      resposta: 4,
      explicacao:
        'Uma expressão `switch` precisa cobrir todos os valores, e o erro "the switch expression does not cover all possible input values" aponta o próprio `switch`. É por isso que vale escrever as regras do pedido com `switch` sem `default`: a situação nova não passa despercebida.',
      dica: 'Quem precisa ter um resultado para cada constante do enum?',
    },
    {
      id: 'backend-junior-t7-e01-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A loja espera 3.000 pedidos por dia. Quantos pedidos em um ano de 365 dias?',
      codigo: `System.out.println(3_000 * 365);`,
      opcoes: ['`1095000`', '`109500`', '`3365`', '`10950000`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '3.000 × 365 = 1.095.000. O `_` no literal só separa os milhares para a leitura e não muda o valor.',
      dica: 'Faça 3 × 365 e acrescente três zeros.',
    },
    {
      id: 'backend-junior-t7-e01-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que a aula prefere `POST /pedidos/{id}/cancelamento` a `PATCH /pedidos/{id}` com `{"situacao": "CANCELADO"}`?',
      opcoes: [
        'Porque a ação deixa o servidor decidir a transição pela máquina de estados; com a situação no corpo, o cliente pode pedir qualquer mudança, inclusive pular etapas',
        'Porque `PATCH` não existe no Spring',
        'Porque `POST` é mais rápido que `PATCH`',
        'Porque `PATCH` não aceita corpo JSON',
        'Porque assim a resposta pode ser 200',
      ],
      resposta: 0,
      explicacao:
        'Com o `PATCH`, quem decide o destino é o cliente, e o servidor teria de validar cada combinação. Com a ação, o cliente diz o que quer fazer, e a regra fica do lado de quem conhece o negócio. O `PATCH` existe no Spring e aceita JSON normalmente.',
      dica: 'Quem decide para qual situação o pedido vai, em cada caso?',
    },
    {
      id: 'backend-junior-t7-e01-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Um roteador caseiro quebra o caminho em partes. Digite a saída exata.',
      codigo: `String[] partes = "/pedidos/42/cancelamento".split("/");
System.out.println(partes.length + " [" + partes[0] + "] " + partes[2]);`,
      resposta: '4 [] 42',
      explicacao:
        'A barra inicial gera um trecho vazio antes dela, então as partes são `""`, `pedidos`, `42` e `cancelamento`. Esquecer esse primeiro elemento é o erro clássico de quem escreve o próprio roteador e acha o id em `partes[1]`.',
      dica: 'O que existe antes da primeira barra?',
    },
    {
      id: 'backend-junior-t7-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado:
        'A estimativa da aula dá cerca de 0,1 pedido por segundo no pico e menos de 1 GB de dados por ano. Qual arquitetura combina com esses números?',
      opcoes: [
        'Um monolito em camadas, com um banco PostgreSQL',
        'Um microsserviço por entidade, com uma fila entre eles',
        'Um banco por tabela, para dividir a carga',
        'Um cache distribuído na frente de todas as consultas',
      ],
      resposta: 0,
      explicacao:
        'Um servidor e um banco comuns atendem milhares de requisições por segundo, e o volume aqui é dezenas de milhares de vezes menor. As outras opções acrescentam rede, falhas parciais e operação sem resolver nenhum gargalo.',
      dica: 'Algum desses números chega perto do limite de um servidor comum?',
    },
    {
      id: 'backend-junior-t7-e01-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais perguntas você deveria levar a quem pediu o projeto, antes de programar? Escolha duas.',
      opcoes: [
        'Um pedido pago e cancelado tem o pagamento estornado, e quem faz o estorno?',
        'O preço do item é o do momento da compra ou o atual do produto?',
        'Qual versão do Spring Boot devo usar?',
        'Posso usar Lombok nas entidades?',
        'O banco deve ter índices?',
      ],
      respostas: [0, 1],
      explicacao:
        'As duas primeiras são regras de negócio que só quem conhece a loja sabe responder, e cada resposta muda o modelo. Versão, bibliotecas e índices são decisões técnicas do time, não de quem encomendou.',
      dica: 'Quais perguntas só alguém do negócio consegue responder?',
    },
    {
      id: 'backend-junior-t7-e01-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Complete para calcular o total do item sem perder precisão.',
      codigo: `BigDecimal preco = new BigDecimal("19.90");
int quantidade = 3;
BigDecimal total = preco.___(BigDecimal.valueOf(quantidade));
System.out.println(total);`,
      respostas: ['multiply'],
      saida: '59.70',
      explicacao:
        '`BigDecimal` não tem operadores; as contas são métodos: `add`, `subtract`, `multiply`, `divide`. A escala do resultado é a soma das escalas, 2 + 0, por isso sai `59.70`.',
      dica: 'Os métodos de `BigDecimal` têm o nome da operação em inglês.',
    },
    {
      id: 'backend-junior-t7-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `enum Situacao { CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO }

Set<Situacao> s = EnumSet.of(Situacao.CANCELADO, Situacao.PAGO);
System.out.println(s);`,
      opcoes: ['`[PAGO, CANCELADO]`', '`[CANCELADO, PAGO]`', 'A ordem muda a cada execução', '`[1, 4]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'O `EnumSet` guarda as constantes como bits, na ordem da declaração do enum, e percorre nessa ordem, não na ordem de inserção. Por isso a saída é estável, ao contrário de um `HashSet`.',
      dica: 'Por dentro, o `EnumSet` é um conjunto de bits indexado pela posição da constante.',
    },
    {
      id: 'backend-junior-t7-e01-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a principal vantagem de organizar os pacotes por funcionalidade (`pedido`, `produto`) em vez de por camada (`controller`, `service`)?',
      opcoes: [
        'O que muda junto fica junto, e as classes internas de uma funcionalidade podem ser package-private',
        'O Spring só encontra os beans assim',
        'A aplicação fica mais rápida',
        'Não é preciso escrever testes',
      ],
      resposta: 0,
      explicacao:
        'Uma mudança no pedido mexe no controller, no serviço e no repositório do pedido, que ficam lado a lado. O Spring encontra beans em qualquer subpacote da classe principal, e a organização não muda o desempenho.',
      dica: 'Pense numa mudança no pedido: quantas pastas você abre em cada estilo?',
    },
    {
      id: 'backend-junior-t7-e01-q15',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que não compila.',
      codigo: `enum Situacao { CRIADO, PAGO, ENVIADO }

Set<Situacao> proximas = EnumSet.of(Situacao.PAGO);
proximas.add("ENVIADO");
System.out.println(proximas);`,
      resposta: 4,
      explicacao:
        'O conjunto é de `Situacao`, e `"ENVIADO"` é uma `String`. É uma das vantagens do enum sobre situações guardadas como texto: um nome digitado errado nem compila. Para converter um texto vindo da requisição, use `Situacao.valueOf`.',
      dica: 'Qual é o tipo dos elementos do conjunto, e qual é o tipo do argumento?',
    },
  ],
};

export default episodio;
