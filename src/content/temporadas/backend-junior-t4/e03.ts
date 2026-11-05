import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t4-e03',
  minutos: 17,
  aula,
  armadilhas: [
    'Retornar o objeto direto dá sempre `200`; para `201`, `404` ou `204`, use `ResponseEntity` ou `@ResponseStatus`.',
    '`@RequestParam` é obrigatório por padrão: sem `defaultValue` ou `required = false`, a ausência dá `400`.',
    'Um `@PathVariable long id` com texto no caminho dá `400` de conversão, não `404`.',
    'Sem o `-parameters` do compilador, `@PathVariable` e `@RequestParam` precisam do nome explícito.',
    'Regras de negócio no controller dificultam testes e reaproveitamento: elas pertencem ao serviço.',
    'Receber a entidade do banco no `@RequestBody` deixa o cliente preencher campos que não devia.',
    'O `Location` com caminho relativo funciona; para a URL completa, use `ServletUriComponentsBuilder`.',
  ],
  ia: {
    uso:
      'Gerar o esqueleto de um controller a partir da tabela de rotas é trabalho repetitivo, e a IA o faz bem. O cuidado é com o que ela coloca dentro: regras de negócio no controller, entidades no `@RequestBody` e status genéricos.',
    pedido:
      'Escreva o ProdutoController de uma API Spring Boot 4.1, em Java 25.\n<cole aqui a tabela de rotas, com status de sucesso e de erro, e os records NovoProduto e ProdutoResposta>\n- O controller só traduz HTTP: chama o ProdutoService e não tem regras de negócio.\n- POST responde 201 com Location; DELETE responde 204; produto inexistente é tratado por exceção, não por if.\n- Use DTOs no @RequestBody, nunca a entidade.\n- Escreva também os testes com @WebMvcTest e @MockitoBean para cada status.',
    erros: [
      'Põe cálculo de preço, validação de estoque ou acesso a repositório dentro do controller.',
      'Recebe a entidade JPA no `@RequestBody`.',
      'Devolve `200` na criação, sem `Location`.',
      'Usa `@MockBean`, que não existe no Spring Boot 4, nos testes.',
    ],
    conferir: [
      'Rode cada rota com `curl -i` e confira status e cabeçalhos com a tabela.',
      'Mande parâmetros inválidos, um método não mapeado e um `Content-Type` errado.',
      'Leia o controller procurando qualquer coisa além de chamar o serviço e montar a resposta.',
    ],
  },
  recursos: [
    {
      titulo: 'Spring Framework: Annotated Controllers',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html',
      tipo: 'documentacao',
      porque: 'O capítulo oficial sobre controllers, mapeamentos e argumentos de métodos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Handler Methods, Method Arguments',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/arguments.html',
      tipo: 'documentacao',
      porque: 'A tabela com todos os tipos de argumento que um método de controller pode receber.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: DispatcherServlet',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet.html',
      tipo: 'documentacao',
      porque: 'O caminho de uma requisição: mapeamento, adaptadores, conversores e resolvedores de exceção.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Framework: Error Responses (Problem Details)',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html',
      tipo: 'documentacao',
      porque: 'Como o Spring gera os corpos da RFC 9457 e como personalizá-los.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Guides: Building a RESTful Web Service',
      url: 'https://spring.io/guides/gs/rest-service/',
      tipo: 'tutorial',
      porque: 'O guia oficial, curto, de um primeiro serviço REST com Spring Boot.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michelli Brito: Implementando os métodos GET e POST',
      url: 'https://www.youtube.com/watch?v=e0ItyfvbhMw',
      tipo: 'video',
      porque: 'Controllers, DTOs e respostas numa API REST com Spring Boot, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Panela Dev: Utilizando ResponseEntity para os status',
      url: 'https://www.youtube.com/watch?v=7mwTuG2OCsM',
      tipo: 'video',
      porque: 'Como escolher o status certo de cada resposta com ResponseEntity, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Build & Run: Aprenda a criar uma API em Java com Spring Boot',
      url: 'https://www.youtube.com/watch?v=A2zJpPi8JeQ',
      tipo: 'video',
      porque: 'Uma API completa, do controller ao serviço, na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Adriano Viana: Retornando objetos e manipulando a resposta HTTP',
      url: 'https://www.youtube.com/watch?v=8XhtqRRpHsM',
      tipo: 'video',
      porque: 'Corpo, status e cabeçalhos das respostas de um controller, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Um despachante completo',
    enunciado:
      'Evolua o despachante da aula. Use uma anotação `@Rota(metodo, caminho)` nos métodos, `@Variavel("nome")` para trechos do caminho e `@Param(nome, padrao)` para a query string, em que um `padrao` vazio torna o parâmetro obrigatório. Quando mais de uma rota casar com o caminho, escolha, entre as do método HTTP pedido, a que tiver **menos** variáveis; se o caminho casar só com rotas de outros métodos, responda `405` com o `Allow` em ordem alfabética. Use as mensagens de erro do Spring. Com o `ProdutoController` e os pedidos do `main`, a saída deve ser:\n\n```text\nGET /produtos -> 200 página 0\nGET /produtos?pagina=3 -> 200 página 3\nGET /produtos/7 -> 200 produto 7\nGET /produtos/busca?nome=mouse -> 200 busca por mouse\nGET /produtos/busca -> 400 Required parameter \'nome\' is not present.\nGET /produtos/abc -> 400 Failed to convert \'id\' with value: \'abc\'\nPATCH /produtos/7 -> 405 Allow: DELETE, GET\nDELETE /produtos/7 -> 200 apagado 7\nGET /clientes -> 404\n```\n\nO controller tem `GET /produtos` com `@Param(nome = "pagina", padrao = "0") int pagina`, `GET /produtos/{id}`, `GET /produtos/busca` com `@Param(nome = "nome") String nome` e `DELETE /produtos/{id}`, cada um devolvendo um texto que descreve o que fez.',
    dicas: [
      'Junte primeiro todos os candidatos cujo caminho casa, de qualquer método; daí saem tanto o escolhido quanto o `Allow`.',
      'Ordenar os candidatos do método por número de variáveis põe `/produtos/busca` antes de `/produtos/{id}`.',
      'Um `record Candidato(Method metodo, Rota rota, Map<String, String> variaveis)` carrega tudo o que a escolha precisa.',
      'A ordem de `getMethods()` não é garantida: nunca dependa dela para escolher uma rota.',
    ],
    solucao: `import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

public class Despachante {
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    @interface Rota { String metodo(); String caminho(); }

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.PARAMETER)
    @interface Variavel { String value(); }

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.PARAMETER)
    @interface Param { String nome(); String padrao() default ""; }

    public static class ProdutoController {
        @Rota(metodo = "GET", caminho = "/produtos")
        public String listar(@Param(nome = "pagina", padrao = "0") int pagina) {
            return "página " + pagina;
        }

        @Rota(metodo = "GET", caminho = "/produtos/{id}")
        public String buscar(@Variavel("id") long id) {
            return "produto " + id;
        }

        @Rota(metodo = "GET", caminho = "/produtos/busca")
        public String buscarPorNome(@Param(nome = "nome") String nome) {
            return "busca por " + nome;
        }

        @Rota(metodo = "DELETE", caminho = "/produtos/{id}")
        public String apagar(@Variavel("id") long id) {
            return "apagado " + id;
        }
    }

    record Candidato(Method metodo, Rota rota, Map<String, String> variaveis) {}

    static Map<String, String> casar(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        if (m.length != c.length) return null;
        Map<String, String> variaveis = new HashMap<>();
        for (int i = 0; i < m.length; i++) {
            if (m[i].startsWith("{")) variaveis.put(m[i].substring(1, m[i].length() - 1), c[i]);
            else if (!m[i].equals(c[i])) return null;
        }
        return variaveis;
    }

    static Map<String, String> query(String alvo) {
        Map<String, String> q = new HashMap<>();
        if (!alvo.contains("?")) return q;
        for (String par : alvo.substring(alvo.indexOf('?') + 1).split("&")) {
            String[] kv = par.split("=", 2);
            q.put(kv[0], kv.length > 1 ? kv[1] : "");
        }
        return q;
    }

    static Object converter(String texto, Class<?> tipo) {
        if (tipo == long.class) return Long.parseLong(texto);
        if (tipo == int.class) return Integer.parseInt(texto);
        return texto;
    }

    static String despachar(Object controller, String metodoHttp, String alvo) throws Exception {
        String caminho = alvo.contains("?") ? alvo.substring(0, alvo.indexOf('?')) : alvo;
        List<Candidato> casados = new ArrayList<>();
        for (Method m : controller.getClass().getMethods()) {
            Rota rota = m.getAnnotation(Rota.class);
            if (rota == null) continue;
            Map<String, String> variaveis = casar(rota.caminho(), caminho);
            if (variaveis != null) casados.add(new Candidato(m, rota, variaveis));
        }
        if (casados.isEmpty()) return "404";
        List<Candidato> doMetodo = casados.stream()
                .filter(c -> c.rota().metodo().equals(metodoHttp))
                .sorted(Comparator.comparingInt(c -> c.variaveis().size()))
                .toList();
        if (doMetodo.isEmpty()) {
            TreeSet<String> permitidos = new TreeSet<>();
            casados.forEach(c -> permitidos.add(c.rota().metodo()));
            return "405 Allow: " + String.join(", ", permitidos);
        }
        Candidato escolhido = doMetodo.get(0);
        Map<String, String> parametros = query(alvo);
        Parameter[] params = escolhido.metodo().getParameters();
        Object[] argumentos = new Object[params.length];
        for (int i = 0; i < params.length; i++) {
            String nome;
            String texto;
            Variavel v = params[i].getAnnotation(Variavel.class);
            if (v != null) {
                nome = v.value();
                texto = escolhido.variaveis().get(nome);
            } else {
                Param p = params[i].getAnnotation(Param.class);
                nome = p.nome();
                texto = parametros.getOrDefault(nome, p.padrao().isEmpty() ? null : p.padrao());
                if (texto == null) return "400 Required parameter '" + nome + "' is not present.";
            }
            try {
                argumentos[i] = converter(texto, params[i].getType());
            } catch (NumberFormatException e) {
                return "400 Failed to convert '" + nome + "' with value: '" + texto + "'";
            }
        }
        return "200 " + escolhido.metodo().invoke(controller, argumentos);
    }

    public static void main(String[] args) throws Exception {
        ProdutoController c = new ProdutoController();
        String[][] pedidos = {
            {"GET", "/produtos"}, {"GET", "/produtos?pagina=3"}, {"GET", "/produtos/7"},
            {"GET", "/produtos/busca?nome=mouse"}, {"GET", "/produtos/busca"}, {"GET", "/produtos/abc"},
            {"PATCH", "/produtos/7"}, {"DELETE", "/produtos/7"}, {"GET", "/clientes"},
        };
        for (String[] p : pedidos) {
            System.out.println(p[0] + " " + p[1] + " -> " + despachar(c, p[0], p[1]));
        }
    }
}`,
    saida: "GET /produtos -> 200 página 0\nGET /produtos?pagina=3 -> 200 página 3\nGET /produtos/7 -> 200 produto 7\nGET /produtos/busca?nome=mouse -> 200 busca por mouse\nGET /produtos/busca -> 400 Required parameter 'nome' is not present.\nGET /produtos/abc -> 400 Failed to convert 'id' with value: 'abc'\nPATCH /produtos/7 -> 405 Allow: DELETE, GET\nDELETE /produtos/7 -> 200 apagado 7\nGET /clientes -> 404",
    comentarios:
      'Cada linha corresponde a uma resposta real do Spring na aula. O `/produtos/busca` chegou à busca porque a rota literal tem zero variáveis contra uma do `/{id}`, a mesma preferência por caminhos mais específicos do `RequestMappingHandlerMapping`. A ordenação explícita importa: a ordem dos métodos devolvida pela reflexão não é especificada, e um despachante que dependesse dela poderia mudar de comportamento entre duas versões do Java. O Spring calcula essa especificidade de forma mais refinada, contando também curingas e o comprimento dos trechos, e monta a tabela de rotas uma vez só, na inicialização.',
  },
  bugs: [
    {
      id: 'backend-junior-t4-e03-b01',
      dificuldade: 1,
      sintoma: 'O aplicativo trava ao abrir um produto removido: a API responde `GET /produtos/99 -> 200 null`, e o cliente tenta ler um produto que não existe.',
      codigo: `import java.util.Map;
import java.util.Optional;

public class Responder {
    static final Map<Long, String> PRODUTOS = Map.of(1L, "Teclado", 2L, "Mouse");

    static String buscar(long id) {
        Optional<String> produto = Optional.ofNullable(PRODUTOS.get(id));
        return produto.map(nome -> "200 " + nome).orElse("200 null");
    }

    public static void main(String[] args) {
        System.out.println("GET /produtos/2 -> " + buscar(2));
        System.out.println("GET /produtos/99 -> " + buscar(99));
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: 'GET /produtos/2 -> 200 Mouse\nGET /produtos/99 -> 200 null' },
      correcao: `import java.util.Map;
import java.util.Optional;

public class Responder {
    static final Map<Long, String> PRODUTOS = Map.of(1L, "Teclado", 2L, "Mouse");

    static String buscar(long id) {
        Optional<String> produto = Optional.ofNullable(PRODUTOS.get(id));
        return produto.map(nome -> "200 " + nome).orElse("404");
    }

    public static void main(String[] args) {
        System.out.println("GET /produtos/2 -> " + buscar(2));
        System.out.println("GET /produtos/99 -> " + buscar(99));
    }
}`,
      saidaCorrigida: 'GET /produtos/2 -> 200 Mouse\nGET /produtos/99 -> 404',
      dica: 'Que status a API deveria dar quando o `Optional` vem vazio?',
      explicacao:
        'Um recurso que não existe é `404`, não `200` com o corpo vazio ou `null`. O cliente decide o que fazer pelo status; com `200`, ele acredita que recebeu um produto. É o `map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build())` da aula.',
    },
    {
      id: 'backend-junior-t4-e03-b02',
      dificuldade: 2,
      sintoma: 'O roteador caseiro de um projeto de estudo derruba a requisição de itens de pedido com `ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5`.',
      codigo: `import java.util.LinkedHashMap;
import java.util.Map;

public class Variaveis {
    static Map<String, String> extrair(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        Map<String, String> vars = new LinkedHashMap<>();
        for (int i = 0; i < m.length; i++) {
            if (m[i].startsWith("{")) vars.put(m[i].substring(1, m[i].length() - 1), c[i + 1]);
        }
        return vars;
    }

    public static void main(String[] args) {
        System.out.println(extrair("/pedidos/{pedido}/itens/{item}", "/pedidos/42/itens/3"));
    }
}`,
      linha: 9,
      efeito: { tipo: 'excecao', nome: 'ArrayIndexOutOfBoundsException' },
      correcao: `import java.util.LinkedHashMap;
import java.util.Map;

public class Variaveis {
    static Map<String, String> extrair(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        Map<String, String> vars = new LinkedHashMap<>();
        for (int i = 0; i < m.length; i++) {
            if (m[i].startsWith("{")) vars.put(m[i].substring(1, m[i].length() - 1), c[i]);
        }
        return vars;
    }

    public static void main(String[] args) {
        System.out.println(extrair("/pedidos/{pedido}/itens/{item}", "/pedidos/42/itens/3"));
    }
}`,
      saidaCorrigida: '{pedido=42, item=3}',
      dica: 'O modelo e o caminho foram quebrados do mesmo jeito. O trecho do caminho que corresponde a `m[i]` está em qual posição?',
      explicacao:
        'Modelo e caminho têm as mesmas partes nas mesmas posições: a variável `m[i]` corresponde a `c[i]`. O `i + 1` pegava o trecho seguinte e, na última variável, passava do fim do vetor. Repare que, antes de estourar, o `pedido` já teria recebido "itens" em vez de 42.',
    },
    {
      id: 'backend-junior-t4-e03-b03',
      dificuldade: 3,
      sintoma: 'A busca por nome responde 400 "Failed to convert \'id\' with value: \'busca\'": a requisição caiu no método errado, `/produtos/busca -> buscar por id`.',
      codigo: `import java.util.Comparator;
import java.util.List;

public class Prioridade {
    record Rota(String modelo, String acao) {
        boolean casa(String caminho) {
            String[] m = modelo.split("/"), c = caminho.split("/");
            if (m.length != c.length) return false;
            for (int i = 0; i < m.length; i++) if (!m[i].startsWith("{") && !m[i].equals(c[i])) return false;
            return true;
        }
    }

    public static void main(String[] args) {
        List<Rota> rotas = List.of(new Rota("/produtos/{id}", "buscar por id"), new Rota("/produtos/busca", "buscar por nome"));
        List<Rota> ordem = rotas;
        String caminho = "/produtos/busca";
        System.out.println(caminho + " -> " + ordem.stream().filter(r -> r.casa(caminho)).findFirst().map(Rota::acao).orElse("404"));
    }
}`,
      linha: 16,
      efeito: { tipo: 'saida', saida: '/produtos/busca -> buscar por id' },
      correcao: `import java.util.Comparator;
import java.util.List;

public class Prioridade {
    record Rota(String modelo, String acao) {
        boolean casa(String caminho) {
            String[] m = modelo.split("/"), c = caminho.split("/");
            if (m.length != c.length) return false;
            for (int i = 0; i < m.length; i++) if (!m[i].startsWith("{") && !m[i].equals(c[i])) return false;
            return true;
        }
    }

    public static void main(String[] args) {
        List<Rota> rotas = List.of(new Rota("/produtos/{id}", "buscar por id"), new Rota("/produtos/busca", "buscar por nome"));
        List<Rota> ordem = rotas.stream().sorted(Comparator.comparingLong((Rota r) -> r.modelo().chars().filter(ch -> ch == '{').count())).toList();
        String caminho = "/produtos/busca";
        System.out.println(caminho + " -> " + ordem.stream().filter(r -> r.casa(caminho)).findFirst().map(Rota::acao).orElse("404"));
    }
}`,
      saidaCorrigida: '/produtos/busca -> buscar por nome',
      dica: 'As duas rotas casam com `/produtos/busca`. Qual o roteador escolhe, e por quê?',
      explicacao:
        'O roteador pegava a primeira rota que casava, na ordem da declaração, e `/produtos/{id}` casa com qualquer coisa. O Spring ordena os candidatos pelo mais específico, com menos variáveis e mais trechos literais, e é isso que a correção reproduz: `/produtos/busca` vence `/produtos/{id}`.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t4-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença entre `@RestController` e `@Controller`?',
      opcoes: [
        'No `@RestController`, o retorno de cada método vira o corpo da resposta, convertido para JSON; o `@Controller` puro devolve o nome de uma página',
        'O `@RestController` só aceita `GET`',
        'O `@Controller` não é um bean',
        'Não há diferença',
      ],
      resposta: 0,
      explicacao: 'O `@RestController` é um `@Controller` com `@ResponseBody` em todos os métodos. O `@Controller` puro é usado com modelos de página, como o Thymeleaf.',
      dica: 'Num deles, o retorno vira o corpo da resposta; no outro, o nome de uma página.',
    },
    {
      id: 'backend-junior-t4-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como um método de criação responde `201 Created` com o `Location` e o recurso no corpo?',
      opcoes: [
        '`return ResponseEntity.created(URI.create("/produtos/" + p.id())).body(p);`',
        '`return p;`',
        '`return ResponseEntity.ok(p);`',
        '`@ResponseStatus(HttpStatus.CREATED)` sem mudar o retorno, que gera o `Location` sozinho',
      ],
      resposta: 0,
      explicacao: 'Retornar o objeto direto dá `200`. O `@ResponseStatus` acerta o status, mas não cria o cabeçalho `Location`.',
      dica: '`ResponseEntity` tem um atalho para o `201` que recebe a URI do recurso criado.',
    },
    {
      id: 'backend-junior-t4-e03-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O método é `buscarPorNome(@RequestParam String nome)`. O que acontece com `GET /produtos/busca`, sem o parâmetro?',
      opcoes: [
        '`400 Bad Request`: o `@RequestParam` é obrigatório por padrão',
        'O método é chamado com `nome` nulo',
        'O método é chamado com `nome` vazio',
        '`404 Not Found`',
      ],
      resposta: 0,
      explicacao: 'Com `defaultValue` ou `required = false`, a ausência passa a ser aceita.',
      dica: 'Sem `defaultValue` nem `required = false`, o parâmetro é obrigatório.',
    },
    {
      id: 'backend-junior-t4-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Com `@GetMapping("/{id}") buscar(@PathVariable long id)`, o que `GET /produtos/abc` devolve?',
      opcoes: [
        '`400`, com "Failed to convert \'id\' with value: \'abc\'"',
        '`404`',
        '`500`, com uma `NumberFormatException`',
        '`200`, com `id` igual a 0',
      ],
      resposta: 0,
      explicacao: 'A conversão falha antes de o método ser chamado, e o Spring trata isso como erro do cliente.',
      dica: '"abc" não vira `long`: é um erro do cliente.',
    },
    {
      id: 'backend-junior-t4-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O controller mapeia `GET`, `PUT` e `DELETE` em `/produtos/{id}`. O que um `PATCH /produtos/1` recebe?',
      opcoes: [
        '`405 Method Not Allowed`, com o cabeçalho `Allow` listando os métodos aceitos',
        '`404 Not Found`',
        '`400 Bad Request`',
        'O `PUT` é chamado no lugar',
      ],
      resposta: 0,
      explicacao: 'O caminho existe; o método é que não. O Spring monta o `Allow` a partir dos mapeamentos do caminho.',
      dica: 'O caminho existe, com outros métodos.',
    },
    {
      id: 'backend-junior-t4-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um cliente envia `POST /produtos` com `Content-Type: text/plain`, para um método com `@RequestBody NovoProduto`. Qual é a resposta?',
      opcoes: ['`415 Unsupported Media Type`', '`406 Not Acceptable`', '`400 Bad Request`', '`201 Created`'],
      resposta: 0,
      explicacao: 'O Spring não tem conversor de texto puro para `NovoProduto`. O `406` é o contrário: o cliente pede uma resposta num formato que a API não produz.',
      dica: 'O servidor não aceita o formato que o cliente mandou.',
    },
    {
      id: 'backend-junior-t4-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa API que só produz JSON, um cliente envia `GET /produtos/1` com `Accept: application/xml`. Qual é a resposta?',
      opcoes: ['`406 Not Acceptable`', '`415 Unsupported Media Type`', '`200`, em JSON mesmo assim', '`404 Not Found`'],
      resposta: 0,
      explicacao: 'A negociação de conteúdo falhou: não há conversor que produza XML. Com o módulo de XML do Jackson no classpath, a API passaria a responder XML.',
      dica: 'O servidor não consegue produzir o formato que o cliente pediu.',
    },
    {
      id: 'backend-junior-t4-e03-q08',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais correspondências entre anotação e parte da requisição estão corretas? Escolha duas.',
      opcoes: [
        '`@PathVariable` lê um trecho do caminho',
        '`@RequestBody` lê o corpo, convertido do JSON',
        '`@RequestParam` lê o corpo JSON',
        '`@RequestHeader` lê a query string',
        '`@CookieValue` lê um trecho do caminho',
      ],
      respostas: [0, 1],
      explicacao: '`@RequestParam` lê a query string (ou um formulário); `@RequestHeader`, um cabeçalho; `@CookieValue`, um cookie.',
      dica: 'Caminho, corpo, query string e cabeçalho: cada um tem a sua anotação.',
    },
    {
      id: 'backend-junior-t4-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O controller tem `@GetMapping("/{id}")` e `@GetMapping("/busca")`. Qual método atende `GET /produtos/busca?nome=mon`?',
      opcoes: [
        'O de `/busca`: entre dois caminhos que casam, o Spring prefere o mais específico, com trechos literais',
        'O de `/{id}`, com `id` igual a "busca", e um erro de conversão',
        'O que foi declarado primeiro na classe',
        'Os dois, e o Spring combina as respostas',
      ],
      resposta: 0,
      explicacao: 'Por isso a busca funcionou na aula. A ordem de declaração não importa para essa escolha.',
      dica: 'Entre dois caminhos que casam, o mais específico vence.',
    },
    {
      id: 'backend-junior-t4-e03-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a resposta de um método `void` anotado com `@ResponseStatus(HttpStatus.NO_CONTENT)`?',
      opcoes: ['`204`, sem corpo', '`200`, com corpo vazio', '`404`', '`201`'],
      resposta: 0,
      explicacao: 'É o padrão de um `DELETE` bem-sucedido: o recurso foi removido e não há nada a devolver no corpo.',
      dica: '`void` sem corpo, com o status da anotação.',
    },
    {
      id: 'backend-junior-t4-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O método de criação de pedidos, no controller, calcula descontos, verifica estoque, grava no banco e envia e-mail. Qual é o problema?',
      opcoes: [
        'A regra de negócio fica presa ao HTTP: não pode ser reaproveitada por outra entrada nem testada sem simular requisições',
        'Controllers não podem acessar o banco por causa de uma limitação do Spring',
        'O método fica lento demais para o Tomcat',
        'Nenhum, é a organização recomendada',
      ],
      resposta: 0,
      explicacao: 'O controller traduz HTTP e delega. O serviço concentra a regra e pode ser chamado por um controller, por uma fila ou por um teste comum.',
      dica: 'O que acontece se a mesma criação precisar ser feita por uma fila ou um job?',
    },
    {
      id: 'backend-junior-t4-e03-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.annotation.*;
import java.lang.reflect.Method;

public class Teste {
    @Retention(RetentionPolicy.RUNTIME)
    @interface ComRetencao {}

    @interface SemRetencao {}

    @ComRetencao
    @SemRetencao
    public void metodo() {}

    public static void main(String[] args) throws Exception {
        Method m = Teste.class.getMethod("metodo");
        System.out.println((m.getAnnotation(ComRetencao.class) != null) + " " + (m.getAnnotation(SemRetencao.class) != null));
    }
}`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem `@Retention`, a retenção padrão é `CLASS`: a anotação fica no bytecode mas não aparece na reflexão. Por isso todas as anotações do Spring são `RUNTIME`.',
      dica: 'Siga a lógica de casamento do programa para os dois caminhos.',
    },
    {
      id: 'backend-junior-t4-e03-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O método extrai as variáveis de caminho, como o Spring faz com `@PathVariable`. Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    static Map<String, String> casar(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        Map<String, String> v = new LinkedHashMap<>();
        for (int i = 0; i < m.length; i++) {
            if (m[i].startsWith("{")) v.put(m[i].substring(1, m[i].length() - 1), c[i]);
        }
        return v;
    }

    public static void main(String[] args) {
        System.out.println(casar("/pedidos/{pedido}/itens/{item}", "/pedidos/42/itens/3"));
    }
}`,
      resposta: '{pedido=42, item=3}',
      explicacao: 'Cada trecho entre chaves do modelo recebe o trecho na mesma posição do caminho. O Spring ainda converte cada valor para o tipo do parâmetro.',
      dica: 'As variáveis do modelo correspondem aos trechos do caminho na mesma posição.',
    },
    {
      id: 'backend-junior-t4-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `service.buscar(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build())` faz, se `buscar` devolve `Optional<Produto>`?',
      opcoes: [
        'Responde `200` com o produto, se ele existir, ou `404` sem corpo, se não',
        'Lança exceção se o produto não existir',
        'Responde sempre `200`, com `null` no corpo quando não existe',
        'Responde `204` quando não existe',
      ],
      resposta: 0,
      explicacao: 'O `map` só roda com o `Optional` cheio. É um jeito compacto de evitar o `if (p == null)` no controller.',
      dica: 'O `map` só roda se houver valor; o `orElse`, se não houver.',
    },
    {
      id: 'backend-junior-t4-e03-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num projeto montado sem o parent do Spring Boot, `@PathVariable long id` começou a falhar dizendo que o nome do parâmetro não está disponível. Qual é a causa?',
      opcoes: [
        'O compilador não está usando `-parameters`, e os nomes dos parâmetros não ficam no bytecode; ou se liga a opção, ou se escreve `@PathVariable("id")`',
        'O Spring não aceita `long`, só `Long`',
        'Faltou o `@RequestMapping` na classe',
        'O caminho precisa ser `{id:long}`',
      ],
      resposta: 0,
      explicacao: 'O parent do Spring Boot liga o `-parameters` no plugin do compilador. Sem ele, o Spring só conhece os tipos dos parâmetros, não os nomes.',
      dica: 'Os nomes dos parâmetros só existem no bytecode com uma opção do compilador.',
    },
  ],
};

export default episodio;
