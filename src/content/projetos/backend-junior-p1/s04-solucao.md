A solução da etapa 4. O teste passa por cada tipo de entrada ruim:

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
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"Estudar\"", 400);
            pedir(cliente, base, "POST", "/tarefas", "[1, 2]", 400);
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"  \"}", 422);
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": 42}", 422);
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"" + "x".repeat(101) + "\"}", 422);
            pedir(cliente, base, "POST", "/tarefas", "{\"titulo\": \"" + "x".repeat(20_000) + "\"}", 413);
            pedir(cliente, base, "PUT", "/tarefas/1", "{\"titulo\": \"Estudar HTTP\"}", 422);
            pedir(cliente, base, "GET", "/tarefas/1", null, 200);
        } finally {
            servidor.stop(0);
        }
        System.out.println(conferidos - falhas + " de " + conferidos + " conferidos");
    }

    static void pedir(HttpClient cliente, String base, String metodo, String caminho, String corpo, int esperado)
            throws IOException, InterruptedException {
        HttpRequest.Builder pedido = HttpRequest.newBuilder(URI.create(base + caminho));
        if (corpo != null && corpo.length() > 200) caminho = caminho + " (" + corpo.length() + " bytes)";
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

/** Erro que vira uma resposta HTTP: o status e uma mensagem segura para o cliente. */
class ErroHttp extends RuntimeException {
    private static final long serialVersionUID = 1L;

    final int status;
    final String campo;

    ErroHttp(int status, String mensagem) {
        this(status, mensagem, null);
    }

    ErroHttp(int status, String mensagem, String campo) {
        super(mensagem);
        this.status = status;
        this.campo = campo;
    }
}

final class ApiDeTarefas {
    static final int LIMITE_DO_CORPO = 10_000;
    static final int MAXIMO_DO_TITULO = 100;

    private final Map<Long, Tarefa> tarefas = new ConcurrentHashMap<>();
    private final AtomicLong proximoId = new AtomicLong(1);

    static HttpServer iniciar(int porta) throws IOException {
        HttpServer servidor = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), porta), 0);
        ApiDeTarefas api = new ApiDeTarefas();
        servidor.createContext("/saude", troca -> api.atender(troca, () -> responder(troca, 200, "{\"status\":\"ok\"}")));
        servidor.createContext("/tarefas", troca -> api.atender(troca, () -> api.rotear(troca)));
        servidor.createContext("/", troca -> api.atender(troca, () -> {
            throw new ErroHttp(404, "rota não encontrada");
        }));
        servidor.start();
        return servidor;
    }

    interface Acao {
        void executar() throws IOException;
    }

    /** Toda requisição passa por aqui: os erros viram respostas, e a troca sempre fecha. */
    private void atender(HttpExchange troca, Acao acao) { //> Um lugar só trata os erros de todas as rotas.
        try {
            acao.executar();
        } catch (ErroHttp e) {
            responderErro(troca, e);
        } catch (Exception e) {
            System.err.println("erro inesperado em " + troca.getRequestURI() + ": " + e); //> O detalhe vai para o log; o cliente recebe só "erro interno".
            responderErro(troca, new ErroHttp(500, "erro interno"));
        } finally {
            troca.close();
        }
    }

    private void rotear(HttpExchange troca) throws IOException {
        String[] partes = troca.getRequestURI().getPath().split("/");
        String metodo = troca.getRequestMethod();
        if (partes.length < 2 || !partes[1].equals("tarefas") || partes.length > 3) {
            throw new ErroHttp(404, "rota não encontrada");
        }
        if (partes.length == 2) {
            switch (metodo) {
                case "GET" -> listar(troca);
                case "POST" -> criar(troca);
                default -> naoPermitido(troca, "GET, POST");
            }
            return;
        }
        long id = paraId(partes[2]);
        switch (metodo) {
            case "GET" -> responder(troca, 200, buscar(id).json());
            case "PUT" -> atualizar(troca, id);
            case "DELETE" -> apagar(troca, id);
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
        Map<String, Object> dados = lerJson(troca);
        long id = proximoId.getAndIncrement();
        Tarefa tarefa = new Tarefa(id, titulo(dados), false);
        tarefas.put(id, tarefa);
        troca.getResponseHeaders().add("Location", "/tarefas/" + id);
        responder(troca, 201, tarefa.json());
    }

    private void atualizar(HttpExchange troca, long id) throws IOException {
        buscar(id);
        Map<String, Object> dados = lerJson(troca);
        if (!(dados.get("concluida") instanceof Boolean concluida)) { //> Confere o tipo antes de usar: "true" como texto não serve.
            throw new ErroHttp(422, "concluida é obrigatório e precisa ser true ou false", "concluida");
        }
        Tarefa tarefa = new Tarefa(id, titulo(dados), concluida);
        tarefas.put(id, tarefa);
        responder(troca, 200, tarefa.json());
    }

    private void apagar(HttpExchange troca, long id) throws IOException {
        if (tarefas.remove(id) == null) throw new ErroHttp(404, "tarefa não encontrada");
        troca.sendResponseHeaders(204, -1);
    }

    private Tarefa buscar(long id) {
        Tarefa tarefa = tarefas.get(id);
        if (tarefa == null) throw new ErroHttp(404, "tarefa não encontrada");
        return tarefa;
    }

    private static String titulo(Map<String, Object> dados) {
        if (!(dados.get("titulo") instanceof String texto) || texto.isBlank()) {
            throw new ErroHttp(422, "titulo é obrigatório", "titulo");
        }
        String titulo = texto.strip();
        if (titulo.length() > MAXIMO_DO_TITULO) {
            throw new ErroHttp(422, "titulo tem no máximo " + MAXIMO_DO_TITULO + " caracteres", "titulo");
        }
        return titulo;
    }

    private static long paraId(String texto) {
        try {
            return Long.parseLong(texto);
        } catch (NumberFormatException e) {
            throw new ErroHttp(404, "tarefa não encontrada");
        }
    }

    private static Map<String, Object> lerJson(HttpExchange troca) throws IOException {
        String tipo = troca.getRequestHeaders().getFirst("Content-Type");
        if (tipo == null || !tipo.startsWith("application/json")) {
            throw new ErroHttp(415, "envie o corpo como application/json");
        }
        byte[] bytes;
        try (InputStream corpo = troca.getRequestBody()) {
            bytes = corpo.readNBytes(LIMITE_DO_CORPO + 1); //> Lê no máximo 1 byte além do limite: um corpo gigante não enche a memória.
        }
        if (bytes.length > LIMITE_DO_CORPO) throw new ErroHttp(413, "corpo maior que " + LIMITE_DO_CORPO + " bytes");
        try {
            return Json.lerObjeto(new String(bytes, StandardCharsets.UTF_8));
        } catch (IllegalArgumentException e) {
            throw new ErroHttp(400, "JSON inválido: " + e.getMessage());
        }
    }

    private static void naoPermitido(HttpExchange troca, String permitidos) {
        troca.getResponseHeaders().add("Allow", permitidos);
        throw new ErroHttp(405, "método não permitido nesta rota");
    }

    private static void responderErro(HttpExchange troca, ErroHttp erro) {
        String campo = erro.campo == null ? "" : ",\"campo\":" + Json.texto(erro.campo);
        try {
            responder(troca, erro.status, "{\"erro\":" + Json.texto(erro.getMessage()) + campo + "}");
        } catch (IOException e) {
            System.err.println("não deu para responder: " + e);
        }
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
ok   POST   /tarefas               400 {"erro":"JSON inválido: o texto acabou no meio do objeto na posição 20"}
ok   POST   /tarefas               400 {"erro":"JSON inválido: esperava { na posição 1"}
ok   POST   /tarefas               422 {"erro":"titulo é obrigatório","campo":"titulo"}
ok   POST   /tarefas               422 {"erro":"titulo é obrigatório","campo":"titulo"}
ok   POST   /tarefas               422 {"erro":"titulo tem no máximo 100 caracteres","campo":"titulo"}
ok   POST   /tarefas (20014 bytes) 413 {"erro":"corpo maior que 10000 bytes"}
ok   PUT    /tarefas/1             422 {"erro":"concluida é obrigatório e precisa ser true ou false","campo":"concluida"}
ok   GET    /tarefas/1             200 {"id":1,"titulo":"Estudar HTTP","concluida":false}
9 de 9 conferidos
```

**Por que assim:**

- Os métodos de negócio não sabem nada de resposta de erro: lançam `ErroHttp` e pronto. Quem converte é `atender`, num lugar só. No Spring, esse papel é do `@RestControllerAdvice`, e a ideia é exatamente esta.
- `instanceof String texto` confere o tipo e já declara a variável. `{"titulo": 42}` vira `422`, não uma `ClassCastException`.
- A mensagem do `400` mostra a posição do erro no JSON. Isso ajuda quem integra com a API e não revela nada interno; já a mensagem de uma exceção inesperada poderia revelar, e por isso o `500` é genérico.
- O caso de 20.000 bytes prova o limite, mas o teste também mostra um custo: o cliente enviou o corpo inteiro antes de ouvir o `413`. Servidores de produção conferem o cabeçalho `Content-Length` antes de ler; vale fazer isso também como exercício.
