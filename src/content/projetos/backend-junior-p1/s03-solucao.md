A solução da etapa 3:

```java executar
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

public class TesteDaApi {
    private static int conferidos;
    private static int falhas;

    public static void main(String[] args) throws Exception {
        HttpServer servidor = ApiDeTarefas.iniciar(0);
        String base = "http://127.0.0.1:" + servidor.getAddress().getPort();
        try (HttpClient cliente = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).build()) {
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"Estudar HTTP\"}", 201);
            pedir(cliente, base, "PUT", "/tarefas/1", "{\"titulo\": \"Estudar HTTP\", \"concluida\": true}", 200);
            pedir(cliente, base, "PUT", "/tarefas/1", "{\"titulo\": \"Estudar HTTP\", \"concluida\": true}", 200);
            pedir(cliente, base, "PATCH", "/tarefas/1", null, 405);
            pedir(cliente, base, "DELETE", "/tarefas", null, 405);
            pedir(cliente, base, "DELETE", "/tarefas/1", null, 204);
            pedir(cliente, base, "DELETE", "/tarefas/1", null, 404);
            pedir(cliente, base, "GET", "/tarefas", null, 200);
        } finally {
            servidor.stop(0);
        }
        System.out.println(conferidos - falhas + " de " + conferidos + " conferidos");
    }

    static void pedir(HttpClient cliente, String base, String metodo, String caminho, String corpo, int esperado)
            throws IOException, InterruptedException {
        HttpRequest.Builder pedido = HttpRequest.newBuilder(URI.create(base + caminho));
        if (corpo == null) {
            pedido.method(metodo, HttpRequest.BodyPublishers.noBody());
        } else {
            pedido.header("Content-Type", "application/json").method(metodo, HttpRequest.BodyPublishers.ofString(corpo));
        }
        HttpResponse<String> resposta = cliente.send(pedido.build(), HttpResponse.BodyHandlers.ofString());
        conferidos++;
        boolean certo = resposta.statusCode() == esperado;
        if (!certo) falhas++;
        System.out.printf("%-4s %-6s %-22s %d %s%n", certo ? "ok" : "ERRO", metodo, caminho, resposta.statusCode(), resposta.body());
    }
}

record Tarefa(long id, String titulo, boolean concluida) {
    String json() {
        return "{\"id\":" + id + ",\"titulo\":" + Json.texto(titulo) + ",\"concluida\":" + concluida + "}";
    }
}

final class ApiDeTarefas {
    private final Map<Long, Tarefa> tarefas = new ConcurrentHashMap<>();
    private final AtomicLong proximoId = new AtomicLong(1);

    static HttpServer iniciar(int porta) throws IOException {
        HttpServer servidor = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), porta), 0);
        ApiDeTarefas api = new ApiDeTarefas();
        servidor.createContext("/saude", troca -> {
            try (troca) {
                responder(troca, 200, "{\"status\":\"ok\"}");
            }
        });
        servidor.createContext("/tarefas", troca -> {
            try (troca) {
                api.rotear(troca);
            }
        });
        servidor.createContext("/", troca -> {
            try (troca) {
                responder(troca, 404, "{\"erro\":\"rota não encontrada\"}");
            }
        });
        servidor.start();
        return servidor;
    }

    private void rotear(HttpExchange troca) throws IOException {
        String[] partes = troca.getRequestURI().getPath().split("/");
        String metodo = troca.getRequestMethod();
        if (partes.length < 2 || !partes[1].equals("tarefas") || partes.length > 3) {
            responder(troca, 404, "{\"erro\":\"rota não encontrada\"}");
            return;
        }
        if (partes.length == 2) {
            switch (metodo) {
                case "GET" -> listar(troca);
                case "POST" -> criar(troca);
                default -> naoPermitido(troca, "GET, POST"); //> A rota existe, o método é que não: 405, não 404.
            }
            return;
        }
        Tarefa tarefa = buscar(partes[2]);
        if (tarefa == null) {
            responder(troca, 404, "{\"erro\":\"tarefa não encontrada\"}");
            return;
        }
        switch (metodo) {
            case "GET" -> responder(troca, 200, tarefa.json());
            case "PUT" -> atualizar(troca, tarefa.id());
            case "DELETE" -> apagar(troca, tarefa.id());
            default -> naoPermitido(troca, "GET, PUT, DELETE");
        }
    }

    private void listar(HttpExchange troca) throws IOException {
        String json = tarefas.values().stream()
                .sorted(Comparator.comparingLong(Tarefa::id))
                .map(Tarefa::json)
                .collect(Collectors.joining(",", "[", "]"));
        responder(troca, 200, json);
    }

    private void criar(HttpExchange troca) throws IOException {
        Map<String, Object> dados = Json.lerObjeto(lerCorpo(troca));
        long id = proximoId.getAndIncrement();
        Tarefa tarefa = new Tarefa(id, ((String) dados.get("titulo")).strip(), false);
        tarefas.put(id, tarefa);
        troca.getResponseHeaders().add("Location", "/tarefas/" + id);
        responder(troca, 201, tarefa.json());
    }

    private void atualizar(HttpExchange troca, long id) throws IOException {
        Map<String, Object> dados = Json.lerObjeto(lerCorpo(troca));
        Tarefa tarefa = new Tarefa(id, ((String) dados.get("titulo")).strip(), (Boolean) dados.get("concluida")); //> PUT troca o recurso inteiro: título e situação.
        tarefas.put(id, tarefa);
        responder(troca, 200, tarefa.json());
    }

    private void apagar(HttpExchange troca, long id) throws IOException {
        tarefas.remove(id);
        troca.sendResponseHeaders(204, -1); //> 204 No Content: deu certo e não há corpo; -1 diz isso ao servidor.
    }

    private Tarefa buscar(String texto) {
        try {
            return tarefas.get(Long.parseLong(texto));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private static String lerCorpo(HttpExchange troca) throws IOException {
        try (InputStream in = troca.getRequestBody()) {
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    private static void naoPermitido(HttpExchange troca, String permitidos) throws IOException {
        troca.getResponseHeaders().add("Allow", permitidos);
        responder(troca, 405, "{\"erro\":\"método não permitido nesta rota\"}");
    }

    static void responder(HttpExchange troca, int status, String json) throws IOException {
        byte[] corpo = json.getBytes(StandardCharsets.UTF_8);
        troca.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        troca.sendResponseHeaders(status, corpo.length);
        troca.getResponseBody().write(corpo);
    }
}

/** Um leitor de JSON pequeno, só para objetos planos com textos, números inteiros, booleanos e null. */
final class Json {
    private final String s;
    private int i;

    private Json(String s) {
        this.s = s;
    }

    static Map<String, Object> lerObjeto(String texto) {
        Json leitor = new Json(texto);
        Map<String, Object> objeto = leitor.objeto();
        leitor.espacos();
        if (leitor.i != texto.length()) throw leitor.erro("texto depois do fim do objeto");
        return objeto;
    }

    private Map<String, Object> objeto() {
        espacos();
        esperar('{');
        Map<String, Object> mapa = new LinkedHashMap<>();
        espacos();
        if (olhar() == '}') {
            i++;
            return mapa;
        }
        while (true) {
            espacos();
            String chave = texto();
            espacos();
            esperar(':');
            espacos();
            mapa.put(chave, valor());
            espacos();
            char c = proximo();
            if (c == '}') return mapa;
            if (c != ',') throw erro("esperava , ou }");
        }
    }

    private Object valor() {
        char c = olhar();
        if (c == '"') return texto();
        if (s.startsWith("true", i)) {
            i += 4;
            return true;
        }
        if (s.startsWith("false", i)) {
            i += 5;
            return false;
        }
        if (s.startsWith("null", i)) {
            i += 4;
            return null;
        }
        if (c == '-' || Character.isDigit(c)) {
            int inicio = i++;
            while (i < s.length() && Character.isDigit(s.charAt(i))) i++;
            return Long.parseLong(s.substring(inicio, i));
        }
        throw erro("valor não suportado");
    }

    private String texto() {
        esperar('"');
        StringBuilder sb = new StringBuilder();
        while (true) {
            char c = proximo();
            if (c == '"') return sb.toString();
            if (c < 0x20) throw erro("caractere de controle dentro do texto");
            if (c != '\\') {
                sb.append(c);
                continue;
            }
            char escape = proximo();
            switch (escape) {
                case '"', '\\', '/' -> sb.append(escape);
                case 'n' -> sb.append('\n');
                case 't' -> sb.append('\t');
                case 'u' -> {
                    if (i + 4 > s.length()) throw erro("escape incompleto");
                    sb.append((char) Integer.parseInt(s.substring(i, i + 4), 16));
                    i += 4;
                }
                default -> throw erro("escape inválido");
            }
        }
    }

    private char olhar() {
        if (i >= s.length()) throw erro("o texto acabou no meio do objeto");
        return s.charAt(i);
    }

    private char proximo() {
        char c = olhar();
        i++;
        return c;
    }

    private void esperar(char esperado) {
        if (proximo() != esperado) throw erro("esperava " + esperado);
    }

    private void espacos() {
        while (i < s.length() && Character.isWhitespace(s.charAt(i))) i++;
    }

    private IllegalArgumentException erro(String mensagem) {
        return new IllegalArgumentException(mensagem + " na posição " + i);
    }

    /** Um texto Java como texto JSON, com aspas e os escapes necessários. */
    static String texto(String valor) {
        StringBuilder sb = new StringBuilder("\"");
        for (char c : valor.toCharArray()) {
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\n' -> sb.append("\\n");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < 0x20) sb.append(String.format("\\u%04x", (int) c));
                    else sb.append(c);
                }
            }
        }
        return sb.append('"').toString();
    }
}
```

```saida
ok   POST   /tarefas               201 {"id":1,"titulo":"Estudar HTTP","concluida":false}
ok   PUT    /tarefas/1             200 {"id":1,"titulo":"Estudar HTTP","concluida":true}
ok   PUT    /tarefas/1             200 {"id":1,"titulo":"Estudar HTTP","concluida":true}
ok   PATCH  /tarefas/1             405 {"erro":"método não permitido nesta rota"}
ok   DELETE /tarefas               405 {"erro":"método não permitido nesta rota"}
ok   DELETE /tarefas/1             204 
ok   DELETE /tarefas/1             404 {"erro":"tarefa não encontrada"}
ok   GET    /tarefas               200 []
8 de 8 conferidos
```

**Por que assim:**

- O roteamento decide primeiro **qual recurso** (a coleção ou um item) e depois **qual ação** (o método). Cada `switch` tem um `default` que responde `405` com `Allow`, então um método novo nunca cai no lugar errado.
- A tarefa é buscada uma vez, antes do `switch` do item: `GET`, `PUT` e `DELETE` compartilham o `404` de "não existe".
- O segundo `PUT` idêntico devolve exatamente o mesmo corpo do primeiro. É a idempotência visível no teste.
- `atualizar` faz casts sem conferir (`(String)`, `(Boolean)`). Com um campo ausente ou do tipo errado, a requisição explode. É o bug que a etapa 4 resolve, e vale tentar com `curl` antes de seguir.
