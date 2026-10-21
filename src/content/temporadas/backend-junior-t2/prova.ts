import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T2: HTTP e APIs. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t2-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Numa mensagem HTTP/1.1, o que separa os cabeçalhos do corpo?',
    opcoes: ['Uma linha em branco, `\\r\\n\\r\\n`', 'O cabeçalho `Body:`', 'Um caractere nulo', 'O fim da conexão TCP'],
    resposta: 0,
    explicacao: 'Os cabeçalhos terminam na primeira linha vazia. Depois dela vêm `Content-Length` bytes de corpo, ou os pedaços de um `chunked`.',
  },
  {
    id: 'backend-junior-t2-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Para que serve um `HEAD /relatorios/2025.pdf`?',
    opcoes: [
      'Para obter só os cabeçalhos, como o tamanho e a data de modificação, sem baixar o arquivo',
      'Para baixar só o começo do arquivo',
      'Para apagar o arquivo',
      'Para criar o arquivo, se ele não existir',
    ],
    resposta: 0,
    explicacao: 'A resposta de um `HEAD` tem os mesmos cabeçalhos que a do `GET`, mas sem corpo. É útil para checar existência, tamanho e cache.',
  },
  {
    id: 'backend-junior-t2-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um `POST /clientes` tenta cadastrar um e-mail que já está em uso por outro cliente. Qual status descreve melhor a situação?',
    opcoes: ['`409 Conflict`', '`404 Not Found`', '`500 Internal Server Error`', '`201 Created`'],
    resposta: 0,
    explicacao: 'O pedido é bem formado, mas conflita com o estado atual do recurso. Algumas APIs usam `422` aqui; o essencial é não usar `500` nem `201`.',
  },
  {
    id: 'backend-junior-t2-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) {
        String corpo = "ação";
        System.out.println(corpo.length() + " " + corpo.getBytes(StandardCharsets.UTF_8).length);
    }
}`,
    opcoes: ['`4 6`', '`4 4`', '`6 6`', '`4 5`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`ç` e `ã` ocupam dois bytes cada em UTF-8. O `Content-Length` desse corpo é 6, não 4.',
  },
  {
    id: 'backend-junior-t2-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual requisição altera **só** o e-mail do cliente 7, mantendo o resto?',
    opcoes: [
      '`PATCH /clientes/7` com `{"email": "novo@exemplo.com"}`',
      '`PUT /clientes/7` com `{"email": "novo@exemplo.com"}`',
      '`POST /clientes/7/alterarEmail`',
      '`GET /clientes/7?email=novo@exemplo.com`',
    ],
    resposta: 0,
    explicacao: 'O `PUT` substituiria o cliente inteiro pelo corpo enviado. O `GET` nunca altera dados, e um verbo no caminho foge da convenção.',
  },
  {
    id: 'backend-junior-t2-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Por que APIs com listas enormes e muito movimentadas preferem paginação por cursor à paginação por deslocamento (`?pagina=500`)?',
    opcoes: [
      'Porque o cursor não obriga o banco a percorrer as linhas das páginas anteriores, e itens novos não fazem outros se repetirem',
      'Porque o cursor permite pular direto para qualquer página',
      'Porque o cursor dispensa ordenação',
      'Porque o cursor deixa as respostas menores',
    ],
    resposta: 0,
    explicacao: 'O preço do cursor é justamente não poder pular para "a página 500": só se anda para a frente, ou para trás, a partir de um item.',
  },
  {
    id: 'backend-junior-t2-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Num corpo Problem Details (RFC 9457), qual é a diferença entre `title` e `detail`?',
    opcoes: [
      '`title` resume o tipo de problema e é igual em todas as ocorrências; `detail` explica esta ocorrência específica',
      '`title` é para o usuário e `detail` é o *stack trace*',
      'São sinônimos',
      '`title` é obrigatório e contém o status numérico',
    ],
    resposta: 0,
    explicacao: '"Estoque insuficiente" é o `title`; "O produto 7 tem 2 unidades, e o pedido pede 5" é o `detail`. *Stack traces* nunca vão na resposta.',
  },
  {
    id: 'backend-junior-t2-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O roteador testa as rotas na ordem da lista e usa a primeira que casar. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    record Rota(String modelo, String acao) {}

    static boolean casa(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        if (m.length != c.length) return false;
        for (int i = 0; i < m.length; i++) {
            if (!m[i].startsWith("{") && !m[i].equals(c[i])) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        List<Rota> rotas = List.of(new Rota("/pedidos/{id}", "buscar pedido"), new Rota("/pedidos/novos", "listar novos"));
        for (Rota r : rotas) {
            if (casa(r.modelo(), "/pedidos/novos")) {
                System.out.println(r.acao());
                break;
            }
        }
    }
}`,
    opcoes: ['`buscar pedido`', '`listar novos`', '`buscar pedido` e `listar novos`', 'Nada'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A variável `{id}` casa com qualquer texto, inclusive `novos`. Por isso roteadores de verdade, como o do Spring, dão prioridade aos caminhos literais sobre os que têm variáveis.',
  },
  {
    id: 'backend-junior-t2-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Uma API tem URIs por recurso, usa `GET`, `POST`, `PUT` e `DELETE` com o significado certo e responde `201`, `404` e `422` quando apropriado, mas as respostas não trazem links. Em que nível de Richardson ela está?',
    opcoes: ['Nível 2', 'Nível 0', 'Nível 1', 'Nível 3'],
    resposta: 0,
    explicacao: 'O nível 3 exigiria hipermídia, com links para as próximas ações nas respostas. O nível 2 é onde está a maioria das APIs chamadas de REST.',
  },
  {
    id: 'backend-junior-t2-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O JSON `{"total": 150.00}` é lido pelo Jackson de duas formas: para `Map<String, Object>` e para `record Pedido(BigDecimal total)`. Como fica o `total` em cada uma?',
    opcoes: [
      'No mapa, `Double` com valor `150.0`; no `record`, `BigDecimal` com valor `150.00`',
      'Os dois ficam `BigDecimal` com `150.00`',
      'Os dois ficam `Double` com `150.0`',
      'No mapa, `String`; no `record`, `BigDecimal`',
    ],
    resposta: 0,
    explicacao: 'Sem um tipo declarado, o Jackson usa `Double` para números decimais, e a escala se perde. Declarar o campo como `BigDecimal` preserva o valor exato.',
  },
  {
    id: 'backend-junior-t2-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        long id = 9007199254740995L;
        double noNavegador = id;
        System.out.println((long) noNavegador);
    }
}`,
    opcoes: ['`9007199254740996`', '`9007199254740995`', '`9007199254740994`', '`9007199254740992`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Acima de 2⁵³, um `double` só representa números pares. O id fica exatamente entre dois deles e é arredondado para o de mantissa par. É o que um frontend em JavaScript faria com esse id.',
  },
  {
    id: 'backend-junior-t2-prova-q12',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o JSON gerado pelo Jackson para `new Item("TEC-1", 2)`, sendo `record Item(@JsonProperty("codigo") String sku, int quantidade)`?',
    opcoes: [
      '`{"codigo":"TEC-1","quantidade":2}`',
      '`{"sku":"TEC-1","quantidade":2}`',
      '`{"codigo":"TEC-1","sku":"TEC-1","quantidade":2}`',
      '`{"quantidade":2}`',
    ],
    resposta: 0,
    explicacao: 'O `@JsonProperty` troca o nome do campo no JSON, na escrita e na leitura. No Java, o componente continua se chamando `sku`.',
  },
  {
    id: 'backend-junior-t2-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Ao migrar do Jackson 2 para o 3, um método que chama `mapper.readValue(...)` deixou de precisar de `throws IOException`. Por quê?',
    opcoes: [
      'No Jackson 3, a `JacksonException` passou a ser filha de `RuntimeException`, uma exceção não verificada',
      'Porque o Jackson 3 nunca lança exceções',
      'Porque o Jackson 3 devolve `null` em caso de erro',
      'Porque o compilador do Java 21 ignora o `throws`',
    ],
    resposta: 0,
    explicacao: 'Os erros continuam acontecendo, e precisam ser tratados ou deixados subir. Só o compilador deixou de obrigar a declará-los.',
  },
  {
    id: 'backend-junior-t2-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Um `HttpClient` com `followRedirects(HttpClient.Redirect.NORMAL)` recebe, de `https://loja.exemplo/antigo`, um `301` com `Location: http://loja.exemplo/novo`. O que acontece?',
    opcoes: [
      'O redirecionamento não é seguido, porque sairia de `https` para `http`, e o `301` é devolvido',
      'O cliente segue normalmente',
      'O cliente lança exceção de segurança',
      'O cliente troca o endereço para `https` sozinho',
    ],
    resposta: 0,
    explicacao: 'O `NORMAL` segue tudo, menos a troca de `https` para `http`, que exporia a requisição. O `ALWAYS` seguiria mesmo assim.',
  },
  {
    id: 'backend-junior-t2-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.net.URI;
import java.net.http.HttpRequest;
import java.time.Duration;

public class Teste {
    public static void main(String[] args) {
        HttpRequest pedido = HttpRequest.newBuilder(URI.create("http://loja.exemplo/pedidos/42"))
                .timeout(Duration.ofSeconds(2))
                .DELETE()
                .build();
        System.out.println(pedido.method() + " " + pedido.timeout().map(Duration::toMillis).orElse(-1L));
    }
}`,
    opcoes: ['`DELETE 2000`', '`GET 2000`', '`DELETE -1`', '`DELETE 2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `timeout()` devolve um `Optional<Duration>`, presente porque foi definido. Dois segundos são 2.000 milissegundos.',
  },
  {
    id: 'backend-junior-t2-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O cliente envia `POST /pagamentos` com `Idempotency-Key: 9b1d`, e a resposta não chega por uma queda de rede. É seguro reenviar automaticamente?',
    opcoes: [
      'Sim, com a mesma chave e o mesmo corpo: o servidor devolve o resultado da primeira tentativa, se ela tiver sido processada',
      'Não, nunca se repete um `POST`',
      'Sim, mas com uma chave nova',
      'Só se o corpo for alterado',
    ],
    resposta: 0,
    explicacao: 'A chave é o que torna o `POST` repetível. Uma chave nova faria o servidor tratar a repetição como um pagamento novo.',
  },
  {
    id: 'backend-junior-t2-prova-q17',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Um `curl -L -H "Authorization: Bearer abc"` recebe um redirecionamento para **outro** domínio. O que o curl faz com o cabeçalho de autorização?',
    opcoes: [
      'Segue o redirecionamento, mas não envia as credenciais para o outro domínio',
      'Envia o token para o novo domínio',
      'Recusa seguir o redirecionamento',
      'Pede confirmação no terminal',
    ],
    resposta: 0,
    explicacao: 'É uma proteção contra vazamento de credenciais. O `--location-trusted` muda isso, e só deve ser usado quando o destino é confiável.',
  },
  {
    id: 'backend-junior-t2-prova-q18',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'O `curl -i --json \'{"nome":"Mouse"}\' .../produtos` respondeu `HTTP/1.1 201` com `Location: /produtos/43`. Como ver o produto criado?',
    opcoes: [
      '`curl http://localhost:8086/produtos/43`',
      '`curl -X POST http://localhost:8086/produtos/43`',
      '`curl -X DELETE http://localhost:8086/produtos/43`',
      'Repetir o mesmo `POST`',
    ],
    resposta: 0,
    explicacao: 'O `Location` diz onde o recurso criado mora. Repetir o `POST` criaria outro produto.',
  },
  {
    id: 'backend-junior-t2-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Num fluxo de contrato primeiro, que ferramenta transforma o documento OpenAPI em interfaces Java para o servidor e em clientes para outras linguagens?',
    opcoes: ['O OpenAPI Generator', 'O curl', 'O Swagger UI', 'O Jackson'],
    resposta: 0,
    explicacao: 'O Swagger UI só exibe e testa a API, e o Jackson converte JSON. A geração de código vem de ferramentas como o OpenAPI Generator.',
  },
  {
    id: 'backend-junior-t2-prova-q20',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'O que um documento OpenAPI descreve? Escolha dois.',
    opcoes: [
      'Os caminhos, com as operações, os parâmetros e as respostas de cada uma',
      'Os formatos dos objetos de requisição e resposta, nos `components/schemas`',
      'As tabelas do banco de dados',
      'O código-fonte dos controllers',
      'As senhas dos servidores',
    ],
    respostas: [0, 1],
    explicacao: 'O documento descreve o contrato visto de fora, não a implementação. Credenciais nunca entram nele.',
  },
];

export default prova;
