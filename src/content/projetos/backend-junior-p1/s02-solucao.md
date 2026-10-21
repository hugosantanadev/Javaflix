A solução da etapa 2. O teste cria uma tarefa com aspas no título, para provar que o JSON sai escapado:

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
            pedir(cliente, base, "GET", "/tarefas", null, 200);
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"Estudar HTTP\"}", 201);
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"Ler sobre \\\"REST\\\"\"}", 201);
            pedir(cliente, base, "GET", "/tarefas", null, 200);
            pedir(cliente, base, "GET", "/tarefas/2", null, 200);
            pedir(cliente, base, "GET", "/tarefas/99", null, 404);
            pedir(cliente, base, "GET", "/tarefas/abc", null, 404);
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
    private final Map<Long, Tarefa> tarefas = new ConcurrentHashMap<>(); //> Mapa seguro para várias threads ao mesmo tempo.
    private final AtomicLong proximoId = new AtomicLong(1); //> Gera ids sem repetir, mesmo com pedidos simultâneos.

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
        String[] partes = troca.getRequestURI().getPath().split("/"); //> "/tarefas/7" vira "", "tarefas" e "7".
        String metodo = troca.getRequestMethod();
        boolean colecao = partes.length == 2 && partes[1].equals("tarefas");
        if (colecao && metodo.equals("GET")) {
            listar(troca);
        } else if (colecao && metodo.equals("POST")) {
            criar(troca);
        } else if (partes.length == 3 && partes[1].equals("tarefas") && metodo.equals("GET")) {
            buscar(troca, partes[2]);
        } else {
            responder(troca, 404, "{\"erro\":\"rota não encontrada\"}");
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
        String corpo;
        try (InputStream in = troca.getRequestBody()) {
            corpo = new String(in.readAllBytes(), StandardCharsets.UTF_8);
        }
        Map<String, Object> dados = Json.lerObjeto(corpo);
        long id = proximoId.getAndIncrement();
        Tarefa tarefa = new Tarefa(id, ((String) dados.get("titulo")).strip(), false);
        tarefas.put(id, tarefa);
        troca.getResponseHeaders().add("Location", "/tarefas/" + id); //> 201 Created diz onde o recurso novo mora.
        responder(troca, 201, tarefa.json());
    }

    private void buscar(HttpExchange troca, String texto) throws IOException {
        Tarefa tarefa = null;
        try {
            tarefa = tarefas.get(Long.parseLong(texto));
        } catch (NumberFormatException e) {
            // "/tarefas/abc" não é uma tarefa: cai no 404 abaixo
        }
        if (tarefa == null) responder(troca, 404, "{\"erro\":\"tarefa não encontrada\"}");
        else responder(troca, 200, tarefa.json());
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
ok   GET    /tarefas               200 []
ok   POST   /tarefas               201 {"id":1,"titulo":"Estudar HTTP","concluida":false}
ok   POST   /tarefas               201 {"id":2,"titulo":"Ler sobre \"REST\"","concluida":false}
ok   GET    /tarefas               200 [{"id":1,"titulo":"Estudar HTTP","concluida":false},{"id":2,"titulo":"Ler sobre \"REST\"","concluida":false}]
ok   GET    /tarefas/2             200 {"id":2,"titulo":"Ler sobre \"REST\"","concluida":false}
ok   GET    /tarefas/99            404 {"erro":"tarefa não encontrada"}
ok   GET    /tarefas/abc           404 {"erro":"tarefa não encontrada"}
7 de 7 conferidos
```

**Por que assim:**

- A listagem ordena por id com um stream: um `ConcurrentHashMap` não guarda ordem nenhuma, e uma API que devolve itens em ordem diferente a cada chamada confunde quem a usa.
- `"/tarefas/abc"` responde `404`, não `400`: do ponto de vista do cliente, não existe recurso com esse endereço. As duas escolhas são defensáveis; o importante é ser consistente.
- `criar` ainda confia no corpo: um JSON sem `titulo` gera uma exceção que derruba a requisição. É de propósito, para a etapa 4 consertar com calma.
- O `pedir` do teste compara o status recebido com o esperado e conta as falhas. Ainda não é JUnit, mas já é a mesma ideia: uma entrada conhecida, um resultado esperado e uma verificação automática.
