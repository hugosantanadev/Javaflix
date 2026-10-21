import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t2-e04',
  minutos: 16,
  aula,
  armadilhas: [
    'O `HttpClient` não lança exceção para `4xx` e `5xx`: sem checar o `statusCode()`, um erro passa por sucesso.',
    'Sem `.timeout(...)` na requisição, a espera é infinita, e um serviço travado trava o seu junto.',
    'O padrão é `Redirect.NEVER`: um `301` ou `302` chega como resposta, não é seguido.',
    'Criar um `HttpClient` por requisição joga fora o *pool* de conexões e paga o *handshake* TLS toda vez.',
    'Cabeçalhos como `Host`, `Content-Length` e `Connection` são do cliente: defini-los lança `IllegalArgumentException`.',
    'Repetir um `POST` sem `Idempotency-Key` pode criar o recurso duas vezes.',
    'Novas tentativas sem espera e sem limite transformam uma falha passageira numa sobrecarga.',
  ],
  recursos: [
    {
      titulo: 'Introduction to the Java HTTP Client',
      url: 'https://openjdk.org/groups/net/httpclient/intro.html',
      tipo: 'documentacao',
      porque: 'O guia oficial do OpenJDK: cliente, requisição, resposta, assíncrono e HTTP/2.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java HTTP Client: Examples and Recipes',
      url: 'https://openjdk.org/groups/net/httpclient/recipes.html',
      tipo: 'documentacao',
      porque: 'Receitas prontas: JSON, formulários, arquivos, autenticação e chamadas em paralelo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: HttpClient',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpClient.html',
      tipo: 'documentacao',
      porque: 'As opções do *builder*, as políticas de redirecionamento e o `close` do Java 21.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: HttpRequest',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpRequest.html',
      tipo: 'documentacao',
      porque: 'Métodos, cabeçalhos, tempo limite e os `BodyPublishers`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: HttpResponse.BodyHandlers',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpResponse.BodyHandlers.html',
      tipo: 'documentacao',
      porque: 'Todos os jeitos de receber o corpo: texto, bytes, arquivo, linhas, descarte.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 321: HTTP Client',
      url: 'https://openjdk.org/jeps/321',
      tipo: 'documentacao',
      porque: 'A proposta que trouxe o cliente para o Java 11, com as decisões de desenho.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Framework: REST Clients',
      url: 'https://docs.spring.io/spring-framework/reference/integration/rest-clients.html',
      tipo: 'documentacao',
      porque: '`RestClient`, `WebClient` e as interfaces HTTP com `@HttpExchange`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'AWS Builders\' Library: Tempos limite, novas tentativas e recuo com jitter',
      url: 'https://aws.amazon.com/pt/builders-library/timeouts-retries-and-backoff-with-jitter/',
      tipo: 'artigo',
      porque: 'Como a Amazon decide tempos limite e novas tentativas nos próprios serviços, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AWS: Exponential Backoff And Jitter',
      url: 'https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/',
      tipo: 'artigo',
      porque: 'A simulação que mostra por que o *jitter* reduz a carga sobre o servidor.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'RinaldoDev: Dominando o client HTTP do Java 11',
      url: 'https://www.youtube.com/watch?v=PZEUZ0pY6ws',
      tipo: 'video',
      porque: 'O `HttpClient` de ponta a ponta, síncrono e assíncrono, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Trabaios: HttpClient, enviando requisição com Java puro',
      url: 'https://www.youtube.com/watch?v=0wZr283YcSo',
      tipo: 'video',
      porque: 'Requisições `GET` e `POST` sem bibliotecas, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Chris Hegarty: Introduction to the Java 11 HTTP Client',
      url: 'https://www.youtube.com/watch?v=BornfFsSlc8',
      tipo: 'video',
      porque: 'O cliente apresentado por um dos engenheiros do JDK que o criaram.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dan Vega: Java 11 HttpClient and JSON',
      url: 'https://www.youtube.com/watch?v=5MmlRZZxTqk',
      tipo: 'video',
      porque: 'Uma chamada real a uma API pública, com a resposta convertida em objetos.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Novas tentativas com recuo',
    enunciado:
      'Escreva um método `enviar(cliente, pedido, maxTentativas)` que repita a requisição com recuo exponencial, começando em 50 ms e dobrando a cada vez. Só repita métodos idempotentes (`GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`) e só para `429` e `5xx`; se a resposta trouxer `Retry-After`, espere esse número de segundos em vez do recuo. Imprima uma linha por tentativa explicando a decisão. Um servidor local responde `503` nas duas primeiras chamadas a `/instavel` e `200` depois; `503` sempre em `/pagar`; `429` com `Retry-After: 0` em `/limite`; e `404` no resto. A saída deve ser:\n\n```text\nGET /instavel #1 -> 503, nova tentativa em 50 ms\nGET /instavel #2 -> 503, nova tentativa em 100 ms\nGET /instavel #3 -> 200\nGET /sumiu #1 -> 404, não repete: erro do cliente\nPOST /pagar #1 -> 503, não repete: POST não é idempotente\nGET /limite #1 -> 429, nova tentativa em 0 ms (Retry-After)\nGET /limite #2 -> 429, nova tentativa em 0 ms (Retry-After)\nGET /limite #3 -> 429, desiste depois de 3 tentativas\n```',
    dicas: [
      'Um `for (int tentativa = 1; ; tentativa++)` com `return` em cada caso de parada deixa a lógica linear.',
      'Teste os casos na ordem: sucesso, método não idempotente, erro do cliente, limite de tentativas; só então espere e repita.',
      '`resposta.headers().firstValueAsLong("Retry-After")` devolve um `OptionalLong`.',
      'Para a próxima espera, `Duration.multipliedBy(2)`.',
    ],
    solucao: `import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.OptionalLong;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

public class Retentativas {
    static final Set<String> IDEMPOTENTES = Set.of("GET", "HEAD", "PUT", "DELETE", "OPTIONS");
    static final AtomicInteger CHAMADAS_INSTAVEL = new AtomicInteger();

    static void responder(HttpExchange troca) throws IOException {
        int status = switch (troca.getRequestURI().getPath()) {
            case "/instavel" -> CHAMADAS_INSTAVEL.incrementAndGet() <= 2 ? 503 : 200;
            case "/pagar" -> 503;
            case "/limite" -> 429;
            default -> 404;
        };
        if (status == 429) troca.getResponseHeaders().add("Retry-After", "0");
        troca.sendResponseHeaders(status, -1);
        troca.close();
    }

    static HttpResponse<Void> enviar(HttpClient cliente, HttpRequest pedido, int maxTentativas) throws Exception {
        Duration espera = Duration.ofMillis(50);
        for (int tentativa = 1; ; tentativa++) {
            HttpResponse<Void> resposta = cliente.send(pedido, HttpResponse.BodyHandlers.discarding());
            int status = resposta.statusCode();
            String linha = pedido.method() + " " + pedido.uri().getPath() + " #" + tentativa + " -> " + status;
            if (status < 400) {
                System.out.println(linha);
                return resposta;
            }
            if (!IDEMPOTENTES.contains(pedido.method())) {
                System.out.println(linha + ", não repete: " + pedido.method() + " não é idempotente");
                return resposta;
            }
            if (status != 429 && status < 500) {
                System.out.println(linha + ", não repete: erro do cliente");
                return resposta;
            }
            if (tentativa == maxTentativas) {
                System.out.println(linha + ", desiste depois de " + tentativa + " tentativas");
                return resposta;
            }
            OptionalLong retryAfter = resposta.headers().firstValueAsLong("Retry-After");
            long esperaMs = retryAfter.isPresent() ? retryAfter.getAsLong() * 1000 : espera.toMillis();
            System.out.println(linha + ", nova tentativa em " + esperaMs + " ms" + (retryAfter.isPresent() ? " (Retry-After)" : ""));
            Thread.sleep(esperaMs);
            espera = espera.multipliedBy(2);
        }
    }

    public static void main(String[] args) throws Exception {
        HttpServer servidor = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), 0), 0);
        servidor.createContext("/", Retentativas::responder);
        servidor.start();
        String base = "http://127.0.0.1:" + servidor.getAddress().getPort();
        try (HttpClient cliente = HttpClient.newHttpClient()) {
            enviar(cliente, HttpRequest.newBuilder(URI.create(base + "/instavel")).build(), 4);
            enviar(cliente, HttpRequest.newBuilder(URI.create(base + "/sumiu")).build(), 4);
            enviar(cliente, HttpRequest.newBuilder(URI.create(base + "/pagar"))
                    .POST(HttpRequest.BodyPublishers.ofString("{}")).build(), 4);
            enviar(cliente, HttpRequest.newBuilder(URI.create(base + "/limite")).build(), 3);
        } finally {
            servidor.stop(0);
        }
    }
}`,
    saida: 'GET /instavel #1 -> 503, nova tentativa em 50 ms\nGET /instavel #2 -> 503, nova tentativa em 100 ms\nGET /instavel #3 -> 200\nGET /sumiu #1 -> 404, não repete: erro do cliente\nPOST /pagar #1 -> 503, não repete: POST não é idempotente\nGET /limite #1 -> 429, nova tentativa em 0 ms (Retry-After)\nGET /limite #2 -> 429, nova tentativa em 0 ms (Retry-After)\nGET /limite #3 -> 429, desiste depois de 3 tentativas',
    comentarios:
      'O `BodyHandlers.discarding()` ignora o corpo, porque a decisão depende só do status. A ordem das verificações faz cada mensagem explicar a razão certa: o `POST` com `503` seria repetível pelo status, mas não pelo método. Para produção faltam três peças: *jitter*, somando uma espera aleatória para que muitos clientes não repitam juntos; um tempo total máximo, além do número de tentativas; e o tratamento de exceções de rede, como `HttpTimeoutException` e `ConnectException`, que também merecem nova tentativa num método idempotente. E um `Retry-After` pode vir como data, não só como segundos.',
  },
  exercicios: [
    {
      id: 'backend-junior-t2-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O serviço chamado responde `500 Internal Server Error`. O que o `cliente.send(...)` do `HttpClient` faz?',
      opcoes: [
        'Devolve normalmente uma `HttpResponse` com `statusCode()` igual a 500',
        'Lança `HttpServerErrorException`',
        'Lança `IOException`',
        'Repete a requisição automaticamente',
      ],
      resposta: 0,
      explicacao: 'Um `500` é uma resposta HTTP válida. Exceções só aparecem quando não há resposta, como num tempo esgotado ou numa conexão recusada.',
    },
    {
      id: 'backend-junior-t2-e04-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a política de redirecionamento de um `HttpClient.newHttpClient()`?',
      opcoes: ['`Redirect.NEVER`: não segue', '`Redirect.ALWAYS`: segue sempre', '`Redirect.NORMAL`: segue, menos de `https` para `http`', 'Segue até cinco vezes'],
      resposta: 0,
      explicacao: 'Para seguir, configure `.followRedirects(HttpClient.Redirect.NORMAL)` no *builder*.',
    },
    {
      id: 'backend-junior-t2-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma requisição foi montada sem `.timeout(...)`, e o servidor do outro lado travou sem responder. Quanto tempo o `send` espera?',
      opcoes: ['Para sempre', '30 segundos', '60 segundos', 'O mesmo tempo do `connectTimeout`'],
      resposta: 0,
      explicacao: 'Não há tempo limite padrão para a resposta. O `connectTimeout` só vale para estabelecer a conexão, que, nesse caso, já foi feita.',
    },
    {
      id: 'backend-junior-t2-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre o `connectTimeout` do `HttpClient` e o `timeout` do `HttpRequest`?',
      opcoes: [
        'O primeiro limita o estabelecimento da conexão; o segundo, a espera pela resposta daquela requisição',
        'São sinônimos',
        'O primeiro vale para `GET`, o segundo para `POST`',
        'O primeiro é em segundos, o segundo em milissegundos',
      ],
      resposta: 0,
      explicacao: 'Uma conexão pode abrir em milissegundos e a resposta demorar minutos. Os dois limites protegem situações diferentes.',
    },
    {
      id: 'backend-junior-t2-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um serviço cria um `HttpClient` novo a cada requisição ao gateway de pagamento, por `https`. Qual é o problema?',
      opcoes: [
        'Cada chamada abre uma conexão TCP e negocia o TLS do zero, em vez de reaproveitar o *pool* de conexões',
        'Nenhum: o cliente é barato e descartável',
        'O gateway recusa clientes novos',
        'O `HttpClient` não pode ser usado mais de uma vez',
      ],
      resposta: 0,
      explicacao: 'O cliente é imutável, seguro entre threads e feito para ser compartilhado. Crie um e reaproveite.',
    },
    {
      id: 'backend-junior-t2-e04-q06',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Em quais situações vale fazer uma nova tentativa automática? Escolha duas.',
      opcoes: [
        'Um `GET /cotacao` que recebeu `503 Service Unavailable`',
        'Um `PUT /estoque/7` cujo tempo limite estourou',
        'Um `POST /pagamentos`, sem `Idempotency-Key`, que recebeu `503`',
        'Um `GET /produtos/99` que recebeu `404`',
        'Um `POST /pedidos` que recebeu `400 Bad Request`',
      ],
      respostas: [0, 1],
      explicacao: '`GET` e `PUT` são idempotentes, e os erros são passageiros. O `POST` sem chave pode duplicar a cobrança, e `404` e `400` vão falhar igual.',
    },
    {
      id: 'backend-junior-t2-e04-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.net.URI;
import java.net.http.HttpRequest;

public class Teste {
    public static void main(String[] args) {
        HttpRequest pedido = HttpRequest.newBuilder(URI.create("http://loja.exemplo/produtos")).build();
        System.out.println(pedido.method() + " " + pedido.timeout().isPresent());
    }
}`,
      opcoes: ['`GET false`', '`GET true`', '`POST false`', '`null false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem método explícito, a requisição é um `GET`. E o `timeout()` é um `Optional` vazio: nenhum limite foi definido.',
    },
    {
      id: 'backend-junior-t2-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.net.URI;
import java.net.http.HttpRequest;

public class Teste {
    public static void main(String[] args) {
        try {
            HttpRequest.newBuilder(URI.create("http://loja.exemplo/")).header("Content-Length", "10");
            System.out.println("aceitou");
        } catch (IllegalArgumentException e) {
            System.out.println("recusou");
        }
    }
}`,
      opcoes: ['`recusou`', '`aceitou`', 'Nada: lança `NullPointerException`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `Content-Length` é calculado pelo cliente a partir do corpo. Deixá-lo à mão permitiria mensagens com tamanho errado.',
    },
    {
      id: 'backend-junior-t2-e04-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Com recuo exponencial começando em 100 ms e dobrando a cada vez, quanto o cliente espera antes da 2ª, da 3ª, da 4ª e da 5ª tentativa?',
      opcoes: ['100, 200, 400 e 800 ms', '100, 100, 100 e 100 ms', '100, 200, 300 e 400 ms', '100, 1.000, 10.000 e 100.000 ms'],
      resposta: 0,
      explicacao: 'A espera dobra a cada falha, dando ao serviço cada vez mais tempo para se recuperar. Na prática, define-se também um teto.',
    },
    {
      id: 'backend-junior-t2-e04-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa calcula as esperas de um recuo exponencial com teto de 1 segundo. Digite a saída exata.',
      codigo: `import java.util.StringJoiner;

public class Teste {
    public static void main(String[] args) {
        long espera = 100;
        StringJoiner sj = new StringJoiner(" ");
        for (int i = 0; i < 6; i++) {
            sj.add(String.valueOf(Math.min(espera, 1000)));
            espera *= 2;
        }
        System.out.println(sj);
    }
}`,
      resposta: '100 200 400 800 1000 1000',
      explicacao: 'Sem o teto, a sexta espera seria de 3,2 segundos, e a décima, de quase um minuto.',
    },
    {
      id: 'backend-junior-t2-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para que serve somar um valor aleatório, o *jitter*, ao tempo de espera entre as tentativas?',
      opcoes: [
        'Para que muitos clientes que falharam juntos não repitam todos no mesmo instante',
        'Para deixar a espera mais curta',
        'Para enganar o limite de requisições do servidor',
        'Para facilitar os testes',
      ],
      resposta: 0,
      explicacao: 'Quando um serviço cai, milhares de clientes falham ao mesmo tempo. Sem *jitter*, todos voltam juntos, em ondas, e derrubam o serviço de novo.',
    },
    {
      id: 'backend-junior-t2-e04-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A resposta foi `429 Too Many Requests` com `Retry-After: 30`. O que o cliente deve fazer?',
      opcoes: [
        'Esperar 30 segundos antes de tentar de novo',
        'Tentar de novo imediatamente',
        'Abrir outra conexão e tentar de novo',
        'Considerar o recurso inexistente',
      ],
      resposta: 0,
      explicacao: 'O servidor disse exatamente quando voltar. Ignorar o aviso costuma levar a um bloqueio mais longo.',
    },
    {
      id: 'backend-junior-t2-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `cliente.sendAsync(pedido, BodyHandlers.ofString())` devolve?',
      opcoes: [
        'Um `CompletableFuture<HttpResponse<String>>`, imediatamente, que se completa quando a resposta chega',
        'A `HttpResponse<String>`, depois que a resposta chega',
        'Uma `Thread` já iniciada',
        '`void`: a resposta vai para um *callback* obrigatório',
      ],
      resposta: 0,
      explicacao: 'A chamada não bloqueia. O `join()` ou o `get()` no futuro esperam o resultado, e o `thenApply` transforma a resposta quando ela chegar.',
    },
    {
      id: 'backend-junior-t2-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A mesma busca por um produto inexistente é feita com o `HttpClient` do JDK e com o `RestClient` do Spring, usando `retrieve().body(...)`. O que acontece em cada um?',
      opcoes: [
        'O `HttpClient` devolve uma resposta com status 404; o `RestClient` lança `HttpClientErrorException.NotFound`',
        'Os dois lançam exceção',
        'Os dois devolvem a resposta com status 404',
        'O `HttpClient` lança exceção; o `RestClient` devolve `null`',
      ],
      resposta: 0,
      explicacao: 'O `RestClient` trata `4xx` e `5xx` como erro por padrão, o que pode ser mudado com `onStatus(...)`. É uma diferença que pega quem troca um pelo outro.',
    },
    {
      id: 'backend-junior-t2-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Dez requisições são enviadas em paralelo, cada uma numa thread virtual, e os resultados são lidos com `get()` na lista de `Future`s, na ordem de criação. As respostas chegam fora de ordem no servidor. Em que ordem os resultados aparecem?',
      opcoes: [
        'Na ordem de criação, porque cada `get()` espera o seu próprio `Future`',
        'Na ordem em que as respostas chegaram',
        'Em ordem aleatória',
        'Em ordem alfabética',
      ],
      resposta: 0,
      explicacao: 'O tempo total é o da mais lenta, não a soma de todas, mas a leitura segue a ordem da lista. Para tratar na ordem de chegada, há o `CompletableFuture` com `thenAccept`, ou o `ExecutorCompletionService`.',
    },
  ],
};

export default episodio;
