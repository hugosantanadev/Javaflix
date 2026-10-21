import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t2-e02',
  minutos: 16,
  aula,
  armadilhas: [
    'Verbos no caminho (`/criarPedido`, `/pedidos/42/deletar`) desperdiçam os métodos do HTTP: o verbo é o método.',
    'Uma ação com `GET` que altera dados, como `GET /pedidos/42/cancelar`, será disparada por robôs e pré-carregamentos.',
    'Caminho inexistente é `404`; caminho que existe com método não aceito é `405`, com o cabeçalho `Allow`.',
    '`PUT` substitui o recurso inteiro: um `PUT` só com `{"status": "PAGO"}` apaga, pela especificação, os outros campos.',
    'Listagens sem limite de tamanho funcionam no desenvolvimento e derrubam a produção.',
    'Erro com `200 OK` e `{"erro": ...}` no corpo engana clientes, proxies e o monitoramento.',
    'Remover, renomear ou mudar o tipo de um campo quebra quem já usa a API, mesmo que seja "só um detalhe".',
  ],
  recursos: [
    {
      titulo: 'Microsoft: Práticas recomendadas de design de API Web',
      url: 'https://learn.microsoft.com/pt-br/azure/architecture/best-practices/api-design',
      tipo: 'documentacao',
      porque: 'Recursos, métodos, status, paginação, versões e HATEOAS num guia só, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Google: Guia de projeto da API',
      url: 'https://docs.cloud.google.com/apis/design?hl=pt-br',
      tipo: 'documentacao',
      porque: 'O desenho orientado a recursos, os métodos padrão e os métodos personalizados com `:`.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Zalando RESTful API Guidelines',
      url: 'https://opensource.zalando.com/restful-api-guidelines/',
      tipo: 'documentacao',
      porque: 'Um dos guias de API mais completos e citados, com regras numeradas e justificativas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'RFC 9457: Problem Details for HTTP APIs',
      url: 'https://www.rfc-editor.org/rfc/rfc9457.html',
      tipo: 'documentacao',
      porque: 'O formato padrão de erros, com `type`, `title`, `status`, `detail` e `instance`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'IETF: The Idempotency-Key HTTP Header Field',
      url: 'https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/',
      tipo: 'documentacao',
      porque: 'A proposta de padrão do cabeçalho, com os erros `400`, `409` e `422`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Stripe: Idempotent requests',
      url: 'https://docs.stripe.com/api/idempotent_requests',
      tipo: 'documentacao',
      porque: 'Como uma API de pagamentos de verdade usa a `Idempotency-Key`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: Richardson Maturity Model',
      url: 'https://martinfowler.com/articles/richardsonMaturityModel.html',
      tipo: 'artigo',
      porque: 'Os quatro níveis, com o mesmo exemplo de agendamento evoluindo de nível em nível.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Roy Fielding: Representational State Transfer (REST)',
      url: 'https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm',
      tipo: 'artigo',
      porque: 'O capítulo da tese que definiu o REST, com cada restrição e o que ela proporciona.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'MDN: REST',
      url: 'https://developer.mozilla.org/pt-BR/docs/Glossary/REST',
      tipo: 'documentacao',
      porque: 'A definição curta, com links para os conceitos relacionados, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Boas práticas para uma API RESTful',
      url: 'https://www.youtube.com/watch?v=P-juXKmJy_g',
      tipo: 'video',
      porque: 'Nomes de recursos, métodos e status, de quem ensina Spring há anos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Código Fonte TV: REST, Dicionário do Programador',
      url: 'https://www.youtube.com/watch?v=S7MduKwvVGk',
      tipo: 'video',
      porque: 'O que é REST e o que é RESTful, em oito minutos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Hora de Codar: O que é uma API REST?',
      url: 'https://www.youtube.com/watch?v=9SbUPqKEWcY',
      tipo: 'video',
      porque: 'API, HTTP e RESTful do zero, com exemplos de requisições, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Master Dev: Boas práticas de nomenclatura das URIs',
      url: 'https://www.youtube.com/watch?v=5Bj3xzKb-Uo',
      tipo: 'video',
      porque: 'Plural, hierarquia, hífen e o que evitar nos caminhos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Pagamento idempotente',
    enunciado:
      'Escreva o tratamento de `POST /pagamentos` com o cabeçalho `Idempotency-Key`. Sem a chave, responda `400`. Com uma chave nova, crie o pagamento (conte a cobrança), devolva `201` com o id e guarde a resposta junto com o corpo da requisição. Com uma chave já vista e o **mesmo** corpo, devolva a resposta guardada, sem cobrar de novo. Com uma chave já vista e **outro** corpo, responda `422`. Os ids começam em 100. A saída deve ser:\n\n```text\nResposta[status=201, corpo={"id":100}]\nResposta[status=201, corpo={"id":100}]\nResposta[status=422, corpo={"title":"chave já usada com outro corpo"}]\nResposta[status=201, corpo={"id":101}]\nResposta[status=400, corpo={"title":"Idempotency-Key obrigatório"}]\ncobranças feitas: 2\n```',
    dicas: [
      'Um `Map<String, ...>` da chave para o par (corpo da requisição, resposta) guarda tudo o que é preciso.',
      'Dois `record`s deixam o código claro: um para a resposta e outro para o que fica gravado.',
      'A ordem das verificações importa: primeiro a falta de chave, depois a chave conhecida, por último a criação.',
    ],
    solucao: `import java.util.HashMap;
import java.util.Map;

public class Idempotencia {
    record Resposta(int status, String corpo) {}

    record Gravada(String corpoDaRequisicao, Resposta resposta) {}

    static final Map<String, Gravada> PELA_CHAVE = new HashMap<>();
    static int proximoId = 100;
    static int cobrancas = 0;

    static Resposta criarPagamento(String chave, String corpo) {
        if (chave == null) {
            return new Resposta(400, "{\\"title\\":\\"Idempotency-Key obrigatório\\"}");
        }
        Gravada anterior = PELA_CHAVE.get(chave);
        if (anterior != null) {
            if (!anterior.corpoDaRequisicao().equals(corpo)) {
                return new Resposta(422, "{\\"title\\":\\"chave já usada com outro corpo\\"}");
            }
            return anterior.resposta();
        }
        cobrancas++;
        Resposta nova = new Resposta(201, "{\\"id\\":" + proximoId++ + "}");
        PELA_CHAVE.put(chave, new Gravada(corpo, nova));
        return nova;
    }

    public static void main(String[] args) {
        String corpo = "{\\"pedido\\":42,\\"valor\\":150.00}";
        System.out.println(criarPagamento("a1b2", corpo));
        System.out.println(criarPagamento("a1b2", corpo));
        System.out.println(criarPagamento("a1b2", "{\\"pedido\\":42,\\"valor\\":999.00}"));
        System.out.println(criarPagamento("c3d4", corpo));
        System.out.println(criarPagamento(null, corpo));
        System.out.println("cobranças feitas: " + cobrancas);
    }
}`,
    saida: 'Resposta[status=201, corpo={"id":100}]\nResposta[status=201, corpo={"id":100}]\nResposta[status=422, corpo={"title":"chave já usada com outro corpo"}]\nResposta[status=201, corpo={"id":101}]\nResposta[status=400, corpo={"title":"Idempotency-Key obrigatório"}]\ncobranças feitas: 2',
    comentarios:
      'A segunda chamada devolve exatamente a primeira resposta, e só duas cobranças acontecem em cinco requisições. Comparar o corpo protege contra um cliente que reaproveita a chave por engano para outra operação. Num servidor real faltam três coisas: as chaves vão para um armazenamento compartilhado, como o Redis ou o banco, porque há várias cópias do servidor; elas expiram depois de algumas horas ou dias; e uma requisição com a chave ainda em processamento recebe `409`, o que exige marcar a chave como "em andamento" antes de cobrar, de forma atômica.',
  },
  exercicios: [
    {
      id: 'backend-junior-t2-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o melhor endereço para listar os pedidos do cliente 7?',
      opcoes: ['`GET /clientes/7/pedidos`', '`GET /listarPedidosDoCliente?id=7`', '`POST /clientes/7/pedidos/listar`', '`GET /Cliente/7/Pedido`'],
      resposta: 0,
      explicacao: 'Pedidos são um sub-recurso do cliente. `GET /pedidos?cliente=7` também seria uma boa opção, como filtro da coleção.',
    },
    {
      id: 'backend-junior-t2-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual destas rotas é um erro de desenho, e não só uma questão de gosto?',
      opcoes: ['`GET /pedidos/42/cancelar`', '`POST /pedidos/42/cancelamento`', '`POST /pedidos/42:cancelar`', '`DELETE /pedidos/42`'],
      resposta: 0,
      explicacao: 'Um `GET` não pode alterar dados: navegadores, proxies e robôs o disparam sem pedir. As duas formas com `POST` são convenções aceitas para ações.',
    },
    {
      id: 'backend-junior-t2-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A API aceita `GET`, `PUT` e `DELETE` em `/produtos/{id}`. O que ela deve responder a um `PATCH /produtos/9`?',
      opcoes: [
        '`405 Method Not Allowed` com `Allow: DELETE, GET, PUT`',
        '`404 Not Found`',
        '`400 Bad Request`',
        '`200 OK`, ignorando o método',
      ],
      resposta: 0,
      explicacao: 'O recurso existe; o método é que não é aceito. O `Allow` diz ao cliente o que ele pode usar.',
    },
    {
      id: 'backend-junior-t2-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static Map<String, String> casar(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        if (m.length != c.length) return null;
        Map<String, String> p = new LinkedHashMap<>();
        for (int i = 0; i < m.length; i++) {
            if (m[i].startsWith("{")) p.put(m[i].substring(1, m[i].length() - 1), c[i]);
            else if (!m[i].equals(c[i])) return null;
        }
        return p;
    }

    public static void main(String[] args) {
        System.out.println(casar("/lojas/{loja}/produtos/{sku}", "/lojas/sp/produtos/A-7")
                + " " + casar("/lojas/{loja}", "/lojas/sp/produtos"));
    }
}`,
      opcoes: ['`{loja=sp, sku=A-7} null`', '`{loja=sp, sku=A-7} {loja=sp}`', '`{sku=A-7, loja=sp} null`', '`null null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `LinkedHashMap` mantém a ordem em que as variáveis aparecem no modelo. O segundo caminho tem mais partes que o modelo e não casa.',
    },
    {
      id: 'backend-junior-t2-e02-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Onde devem ir os filtros de uma listagem, como "pedidos pagos do cliente 7"?',
      opcoes: [
        'Na query string: `GET /pedidos?status=PAGO&cliente=7`',
        'No caminho: `GET /pedidos/PAGO/7`',
        'No corpo de um `GET`',
        'Num cabeçalho `X-Filtro`',
      ],
      resposta: 0,
      explicacao: 'O caminho identifica o recurso; a query refina a listagem. Corpo em `GET` não tem significado definido e muitos intermediários o descartam.',
    },
    {
      id: 'backend-junior-t2-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um usuário lê a página 1 de pedidos, ordenados do mais novo para o mais antigo, com paginação por deslocamento. Antes de ele pedir a página 2, três pedidos novos são criados. O que acontece?',
      opcoes: [
        'Os três últimos pedidos da página 1 aparecem de novo no começo da página 2',
        'A página 2 pula três pedidos',
        'Nada muda: a paginação por deslocamento é estável',
        'A API devolve erro',
      ],
      resposta: 0,
      explicacao: 'Os pedidos novos empurram todos os outros três posições para trás. A paginação por cursor ("depois do pedido X") não tem esse problema.',
    },
    {
      id: 'backend-junior-t2-e02-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual `Content-Type` a RFC 9457 define para respostas de erro no formato Problem Details?',
      opcoes: ['`application/problem+json`', '`application/error+json`', '`text/plain`', '`application/json; erro=true`'],
      resposta: 0,
      explicacao: 'O tipo diz ao cliente que o corpo segue o formato padrão, com `type`, `title`, `status`, `detail` e `instance`.',
    },
    {
      id: 'backend-junior-t2-e02-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais mudanças quebram clientes que já usam a API? Escolha duas.',
      opcoes: [
        'Renomear o campo `total` da resposta para `valorTotal`',
        'Tornar obrigatório o campo `cupom`, que era opcional na requisição',
        'Acrescentar o campo `prazoEntrega` à resposta',
        'Criar o endpoint `GET /pedidos/{id}/rastreio`',
        'Aceitar um novo parâmetro opcional `?moeda=`',
      ],
      respostas: [0, 1],
      explicacao: 'Quem lia `total` passa a receber nada, e quem não enviava `cupom` passa a receber erro. As mudanças aditivas são ignoradas por clientes que seguem o leitor tolerante.',
    },
    {
      id: 'backend-junior-t2-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O aplicativo envia `POST /pagamentos` com `Idempotency-Key: 7f3c`, a conexão cai e ele reenvia exatamente a mesma requisição. O que o servidor deve fazer?',
      opcoes: [
        'Devolver a resposta guardada da primeira requisição, sem cobrar de novo',
        'Cobrar de novo, porque é outra requisição',
        'Responder `409 Conflict` sempre',
        'Ignorar o cabeçalho, porque `POST` não é idempotente',
      ],
      resposta: 0,
      explicacao: 'A chave torna o `POST` seguro para repetir. O `409` é só para quando a primeira requisição com a chave ainda está sendo processada.',
    },
    {
      id: 'backend-junior-t2-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um cliente reaproveita, por engano, a mesma `Idempotency-Key` num pagamento de outro valor. Pela proposta da IETF, qual deve ser a resposta?',
      opcoes: ['`422 Unprocessable Content`', '`201 Created`, com o pagamento antigo', '`201 Created`, com um pagamento novo', '`404 Not Found`'],
      resposta: 0,
      explicacao: 'Devolver o pagamento antigo esconderia o erro, e criar um novo violaria o contrato da chave. O `422` avisa o cliente.',
    },
    {
      id: 'backend-junior-t2-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma API tem um único endereço, `POST /api`, e recebe `{"acao": "buscarPedido", "id": 42}` no corpo. Em que nível do modelo de Richardson ela está?',
      opcoes: ['Nível 0', 'Nível 1', 'Nível 2', 'Nível 3'],
      resposta: 0,
      explicacao: 'Nenhum recurso tem URI própria, e o HTTP é só um transporte. É o estilo das antigas APIs SOAP e de muitas APIs RPC.',
    },
    {
      id: 'backend-junior-t2-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que é ruim responder `200 OK` com `{"erro": "estoque insuficiente"}`?',
      opcoes: [
        'Clientes, proxies e o monitoramento olham o status, e vão tratar a falha como sucesso',
        'Porque JSON não pode ter um campo chamado `erro`',
        'Porque o `200` não pode ter corpo',
        'Não há problema',
      ],
      resposta: 0,
      explicacao: 'Painéis de taxa de erro, novas tentativas automáticas e o próprio código do cliente dependem do status. O erro deve vir com `4xx` ou `5xx`.',
    },
    {
      id: 'backend-junior-t2-e02-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa simula um servidor que guarda a resposta de cada `Idempotency-Key`. Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, Integer> respostas = new HashMap<>();
        int criados = 0;
        for (String chave : List.of("k1", "k2", "k1", "k1", "k3", "k2")) {
            if (!respostas.containsKey(chave)) {
                criados++;
                respostas.put(chave, 100 + criados);
            }
        }
        System.out.println(criados + " " + respostas.get("k1") + " " + respostas.get("k3"));
    }
}`,
      resposta: '3 101 103',
      explicacao: 'Seis requisições, mas só três chaves distintas: só três recursos são criados. As repetições recebem o id guardado da primeira vez.',
    },
    {
      id: 'backend-junior-t2-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O pedido 42 tem `cliente`, `itens` e `status`. Um cliente envia `PUT /pedidos/42` com o corpo `{"status": "PAGO"}`. Pela semântica do HTTP, o que deveria acontecer?',
      opcoes: [
        'O pedido é substituído pelo corpo enviado, ficando sem `cliente` e sem `itens`, ou a API recusa com `422`',
        'Só o `status` muda, e o resto é mantido',
        'A API cria um pedido novo',
        'O `PUT` é convertido em `PATCH` automaticamente',
      ],
      resposta: 0,
      explicacao: 'O `PUT` substitui a representação inteira. Para alterar só alguns campos, o método é o `PATCH`.',
    },
    {
      id: 'backend-junior-t2-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a principal vantagem prática de a API não guardar estado entre requisições?',
      opcoes: [
        'Qualquer cópia do servidor pode atender qualquer requisição, e escalar é acrescentar cópias',
        'As respostas ficam menores',
        'Não é preciso autenticação',
        'O banco de dados deixa de ser necessário',
      ],
      resposta: 0,
      explicacao: 'Sem estado na memória do servidor, um balanceador distribui as requisições livremente. O estado fica no banco, num cache compartilhado ou na própria requisição.',
    },
  ],
};

export default episodio;
