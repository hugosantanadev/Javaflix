Uma solução possível, com a API e o teste no mesmo arquivo para caber aqui. No projeto, `ApiDeTarefas`, `Main` e `TesteDaApi` ficam em arquivos separados.

```java executar
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class TesteDaApi {
    public static void main(String[] args) throws Exception {
        HttpServer servidor = ApiDeTarefas.iniciar(0); //> Porta 0: o sistema escolhe uma porta livre, e o teste nunca briga com outro programa.
        String base = "http://127.0.0.1:" + servidor.getAddress().getPort();
        try (HttpClient cliente = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build()) {
            for (String caminho : new String[] {"/saude", "/nada", "/saude/extra"}) {
                HttpRequest pedido = HttpRequest.newBuilder(URI.create(base + caminho)).GET().build();
                HttpResponse<String> resposta = cliente.send(pedido, HttpResponse.BodyHandlers.ofString());
                System.out.println("GET " + caminho + " -> " + resposta.statusCode() + " "
                        + resposta.headers().firstValue("Content-Type").orElse("") + " " + resposta.body());
            }
        } finally {
            servidor.stop(0);
        }
    }
}

final class ApiDeTarefas {
    static HttpServer iniciar(int porta) throws IOException {
        HttpServer servidor = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), porta), 0); //> Só o loopback: a API não fica exposta na rede.
        servidor.createContext("/saude", troca -> {
            try (troca) {
                if (troca.getRequestURI().getPath().equals("/saude")) responder(troca, 200, "{\"status\":\"ok\"}");
                else responder(troca, 404, "{\"erro\":\"rota não encontrada\"}");
            }
        });
        servidor.createContext("/", troca -> { //> O contexto "/" pega tudo o que nenhum outro pegou.
            try (troca) {
                responder(troca, 404, "{\"erro\":\"rota não encontrada\"}");
            }
        });
        servidor.start();
        return servidor;
    }

    static void responder(HttpExchange troca, int status, String json) throws IOException {
        byte[] corpo = json.getBytes(StandardCharsets.UTF_8);
        troca.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        troca.sendResponseHeaders(status, corpo.length); //> O tamanho é em bytes, não em caracteres: "ã" ocupa 2.
        troca.getResponseBody().write(corpo);
    }
}
```

```saida
GET /saude -> 200 application/json; charset=utf-8 {"status":"ok"}
GET /nada -> 404 application/json; charset=utf-8 {"erro":"rota não encontrada"}
GET /saude/extra -> 404 application/json; charset=utf-8 {"erro":"rota não encontrada"}
```

**Por que assim:**

- `iniciar` devolve o `HttpServer`, e quem chamou decide quando parar. É isso que permite o mesmo código subir na 8080 no `Main` e numa porta livre no teste.
- O `try (troca)` fecha a troca mesmo se `responder` lançar uma exceção. Uma troca esquecida aberta deixa o cliente esperando até o tempo limite.
- O contexto `/saude` confere o caminho exato, porque o `HttpServer` casa contextos por prefixo. É o primeiro exemplo de algo que o framework faz e você nem percebe.
- O teste ainda só imprime. A partir da próxima etapa ele passa a **conferir** o status esperado, e aí vira um teste de verdade.
