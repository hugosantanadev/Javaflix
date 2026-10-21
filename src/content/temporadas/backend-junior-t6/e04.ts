import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t6-e04',
  minutos: 19,
  aula,
  armadilhas: [
    'O `@WebMvcTest` não sobe serviços nem repositórios: o que o controller usa precisa de um `@MockitoBean`.',
    'No Spring Boot 4, o `@MockBean` não existe mais; o substituto é o `@MockitoBean`, do próprio Spring Framework.',
    'O rollback do `@DataJpaTest` desfaz as linhas, mas não os ids gerados: não espere ids fixos.',
    'Com `RANDOM_PORT`, a requisição roda na thread do Tomcat e confirma a própria transação: nada é desfeito no fim do teste.',
    'Cada configuração diferente de teste, como outro `@MockitoBean` ou outra propriedade, sobe um contexto novo.',
    'Um `application.properties` em `src/test/resources` substitui o principal em vez de complementar.',
    '`@DirtiesContext` descarta o contexto do cache e torna a suíte mais lenta: use só quando não houver alternativa.',
  ],
  ia: {
    uso:
      'Testes de integração do Spring têm muitas anotações, e é aí que a IA mais tropeça: ela aprendeu com anos de código antigo, e o Spring Boot 4 mudou nomes e pacotes. Use a IA para o esqueleto e confira cada anotação e cada import no seu projeto.',
    pedido:
      'Escreva um teste @WebMvcTest para o ProdutoController abaixo, no Spring Boot 4.1.\n- Use MockMvcTester e @MockitoBean para o ProdutoService, com os pacotes do Spring Boot 4.\n- Cubra GET 200 com o JSON, GET 404 com o ProblemDetail e POST 400 com nome em branco, verificando que o serviço não é chamado.\n- Não suba a aplicação inteira: use a fatia web.\n- Não coloque URLs, usuários nem senhas reais no teste.\n\n<cole aqui o controller e os DTOs>',
    erros: [
      'Usa `@MockBean`, que não existe mais no Spring Boot 4, em vez de `@MockitoBean`.',
      'Importa `WebMvcTest` e `DataJpaTest` dos pacotes do Spring Boot 3; no 4, eles estão em módulos novos, como `org.springframework.boot.webmvc.test.autoconfigure`.',
      'Sobe `@SpringBootTest` para tudo, quando uma fatia bastaria, e a suíte fica lenta.',
      'Cria um `application.properties` de teste que substitui o principal sem perceber.',
    ],
    conferir: [
      'Compile no seu projeto: uma anotação de pacote antigo não existe no classpath do Spring Boot 4.',
      'Veja no log quantos contextos sobem, pelas linhas "Started ... in", e se cada teste usa a fatia certa.',
      'Mude o caminho ou o status de uma rota e confira que o teste falha.',
    ],
  },
  recursos: [
    {
      titulo: 'Spring Boot: Testing Spring Boot Applications',
      url: 'https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html',
      tipo: 'documentacao',
      porque: 'O `@SpringBootTest`, cada fatia de teste e o que cada uma sobe.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: MockMvc',
      url: 'https://docs.spring.io/spring-framework/reference/testing/mockmvc.html',
      tipo: 'documentacao',
      porque: 'Como o MockMvc executa requisições sem servidor, com todos os verificadores de resposta.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: MockMvc com AssertJ',
      url: 'https://docs.spring.io/spring-framework/reference/testing/mockmvc/assertj.html',
      tipo: 'documentacao',
      porque: 'O `MockMvcTester` e as asserções sobre status, cabeçalhos e JSON.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: RestTestClient',
      url: 'https://docs.spring.io/spring-framework/reference/testing/resttestclient.html',
      tipo: 'documentacao',
      porque: 'O cliente de testes do Spring Framework 7, para servidores reais ou para o MockMvc.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Framework: @MockitoBean e @MockitoSpyBean',
      url: 'https://docs.spring.io/spring-framework/reference/testing/annotations/integration-spring/annotation-mockitobean.html',
      tipo: 'documentacao',
      porque: 'Como trocar um bean do contexto por um mock ou um espião.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Context Caching',
      url: 'https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/ctx-management/caching.html',
      tipo: 'documentacao',
      porque: 'O que compõe a chave do cache de contextos, o tamanho máximo e o log de estatísticas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Guides: Testing the Web Layer',
      url: 'https://spring.io/guides/gs/testing-web/',
      tipo: 'tutorial',
      porque: 'O guia oficial, curto, com as três formas de testar a camada web.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Giuliana Bezerra: Introdução aos testes automatizados com Spring Boot',
      url: 'https://www.youtube.com/watch?v=N1UkkK4jIHM',
      tipo: 'video',
      porque: 'Um aulão sobre os tipos de teste numa aplicação Spring, de unidade a integração, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Testes em controllers com Spring MockMvc',
      url: 'https://www.youtube.com/watch?v=ngbKmhXDP4A',
      tipo: 'video',
      porque: 'O MockMvc em detalhes, com requisições, JSON e verificações de resposta, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Panela Dev: Testes de integração com MockMvc',
      url: 'https://www.youtube.com/watch?v=l5WfHfHvqo8',
      tipo: 'video',
      porque: 'Testes de integração de um microsserviço, com o contexto do Spring, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Um teste, uma transação',
    enunciado:
      'Simule o rollback automático dos testes do Spring. Um `Banco` guarda produtos num `TreeMap<Long, String>`, com uma sequência de ids que nunca volta atrás. O método `iniciar()` tira uma fotografia da tabela; `desfazer()` restaura a fotografia; `confirmar()` a descarta. Cada teste tem um nome, um indicador de rollback e um corpo. O executor inicia a transação, roda o corpo, conta os produtos e então desfaz ou confirma, imprimindo a contagem durante e depois do teste. A saída deve ser:\n\n```text\ncria dois produtos\n  ids: 1, 2\n  produtos durante o teste: 2, depois: 0\ncomeça vazio\n  produtos durante o teste: 0, depois: 0\n@Commit grava de verdade\n  id: 3\n  produtos durante o teste: 1, depois: 1\no seguinte herda a sujeira\n  id: 4\n  produtos durante o teste: 2, depois: 1\n```',
    dicas: [
      'A fotografia é uma cópia: `new TreeMap<>(produtos)`.',
      'A sequência de ids fica fora da fotografia, como no banco de verdade.',
      'Um `record Teste(String nome, boolean rollback, Consumer<Banco> corpo)` descreve cada teste.',
      'O teste com rollback desligado é o `@Commit` do Spring, ou o `@Rollback(false)`.',
    ],
    solucao: `import java.util.List;
import java.util.TreeMap;
import java.util.function.Consumer;

public class Rollback {
    static class Banco {
        private TreeMap<Long, String> produtos = new TreeMap<>();
        private TreeMap<Long, String> fotografia;
        private long proximoId = 1;

        long inserir(String nome) {
            long id = proximoId++;
            produtos.put(id, nome);
            return id;
        }

        int contar() {
            return produtos.size();
        }

        void iniciar() {
            fotografia = new TreeMap<>(produtos);
        }

        void desfazer() {
            produtos = fotografia;
            fotografia = null;
        }

        void confirmar() {
            fotografia = null;
        }
    }

    record Teste(String nome, boolean rollback, Consumer<Banco> corpo) {}

    public static void main(String[] args) {
        Banco banco = new Banco();
        List<Teste> testes = List.of(
                new Teste("cria dois produtos", true, b -> {
                    System.out.println("  ids: " + b.inserir("Teclado mecânico") + ", " + b.inserir("Mouse sem fio"));
                }),
                new Teste("começa vazio", true, b -> {
                }),
                new Teste("@Commit grava de verdade", false, b -> {
                    System.out.println("  id: " + b.inserir("Headset"));
                }),
                new Teste("o seguinte herda a sujeira", true, b -> {
                    System.out.println("  id: " + b.inserir("Monitor 27"));
                }));

        for (Teste teste : testes) {
            System.out.println(teste.nome());
            banco.iniciar();
            teste.corpo().accept(banco);
            int durante = banco.contar();
            if (teste.rollback()) banco.desfazer();
            else banco.confirmar();
            System.out.println("  produtos durante o teste: " + durante + ", depois: " + banco.contar());
        }
    }
}`,
    saida: 'cria dois produtos\n  ids: 1, 2\n  produtos durante o teste: 2, depois: 0\ncomeça vazio\n  produtos durante o teste: 0, depois: 0\n@Commit grava de verdade\n  id: 3\n  produtos durante o teste: 1, depois: 1\no seguinte herda a sujeira\n  id: 4\n  produtos durante o teste: 2, depois: 1',
    comentarios:
      'Os dois efeitos da aula aparecem aqui: os ids continuam subindo depois de cada rollback, e um teste que confirma a transação deixa dados para os seguintes. O mesmo acontece com testes que usam `RANDOM_PORT`, em que o rollback não alcança a transação do servidor. O banco de verdade não copia a tabela: ele mantém as versões antigas das linhas e as alterações pendentes, como no [episódio de transações](/assistir/backend-junior-t3-e05), e o rollback descarta as pendentes. O Spring só pede ao gerenciador de transações que desfaça, no fim de cada teste.',
  },
  bugs: [
    {
      id: 'backend-junior-t6-e04-b01',
      dificuldade: 1,
      sintoma: 'Ao juntar as propriedades de teste com as da aplicação, as da aplicação somem: o banner volta e o `open-in-view` fica sem valor.',
      codigo: `import java.util.HashMap;
import java.util.Map;

public class Propriedades {
    public static void main(String[] args) {
        Map<String, String> principal = Map.of("spring.main.banner-mode", "off", "spring.jpa.open-in-view", "false");
        Map<String, String> deTeste = Map.of("logging.level.org.springframework.test", "DEBUG");
        Map<String, String> efetivas = new HashMap<>(principal);
        efetivas = new HashMap<>(deTeste);
        System.out.println("banner-mode = " + efetivas.get("spring.main.banner-mode"));
        System.out.println("open-in-view = " + efetivas.get("spring.jpa.open-in-view"));
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: 'banner-mode = null\nopen-in-view = null' },
      correcao: `import java.util.HashMap;
import java.util.Map;

public class Propriedades {
    public static void main(String[] args) {
        Map<String, String> principal = Map.of("spring.main.banner-mode", "off", "spring.jpa.open-in-view", "false");
        Map<String, String> deTeste = Map.of("logging.level.org.springframework.test", "DEBUG");
        Map<String, String> efetivas = new HashMap<>(principal);
        efetivas.putAll(deTeste);
        System.out.println("banner-mode = " + efetivas.get("spring.main.banner-mode"));
        System.out.println("open-in-view = " + efetivas.get("spring.jpa.open-in-view"));
    }
}`,
      saidaCorrigida: 'banner-mode = off\nopen-in-view = false',
      dica: 'A ideia era acrescentar as propriedades de teste às principais. O que a linha suspeita faz com as principais?',
      explicacao: 'Atribuir um mapa novo descarta o anterior; o `putAll` acrescenta e sobrescreve só as chaves repetidas. É a mesma diferença entre um `application.properties` de teste, que esconde o principal, e um perfil de teste, que se soma a ele.',
    },
    {
      id: 'backend-junior-t6-e04-b02',
      dificuldade: 2,
      sintoma: 'O teste `salvaMonitor` passa quando roda sozinho, mas falha quando a classe inteira roda.',
      codigo: `public class IdsTeste {
    static long sequencia = 0;

    static long salvarProduto(String nome) {
        return ++sequencia;
    }

    static void salvaHeadset() {
        long id = salvarProduto("Headset");
        System.out.println("salvaHeadset: " + (id > 0 ? "passou" : "FALHOU, id " + id));
    }

    static void salvaMonitor() {
        long id = salvarProduto("Monitor 27");
        System.out.println("salvaMonitor: " + (id == 1 ? "passou" : "FALHOU, id " + id));
    }

    public static void main(String[] args) {
        salvaHeadset();
        salvaMonitor();
    }
}`,
      linha: 15,
      efeito: { tipo: 'saida', saida: 'salvaHeadset: passou\nsalvaMonitor: FALHOU, id 2' },
      correcao: `public class IdsTeste {
    static long sequencia = 0;

    static long salvarProduto(String nome) {
        return ++sequencia;
    }

    static void salvaHeadset() {
        long id = salvarProduto("Headset");
        System.out.println("salvaHeadset: " + (id > 0 ? "passou" : "FALHOU, id " + id));
    }

    static void salvaMonitor() {
        long id = salvarProduto("Monitor 27");
        System.out.println("salvaMonitor: " + (id > 0 ? "passou" : "FALHOU, id " + id));
    }

    public static void main(String[] args) {
        salvaHeadset();
        salvaMonitor();
    }
}`,
      saidaCorrigida: 'salvaHeadset: passou\nsalvaMonitor: passou',
      dica: 'Os dois testes fazem a mesma coisa. Compare o que cada um exige do id.',
      explicacao: 'A sequência de ids não volta com o rollback dos testes, como na aula: o id depende de quantos produtos já foram salvos antes. O teste certo verifica que um id foi gerado, ou busca o produto por ele, sem esperar um número fixo.',
    },
    {
      id: 'backend-junior-t6-e04-b03',
      dificuldade: 3,
      sintoma: 'Um id com letras na URL, como `/produtos/abc`, devolve 500. Existe um tratador para `IllegalArgumentException` que deveria responder 400, e o teste do controller pegou a diferença.',
      codigo: `import java.util.LinkedHashMap;
import java.util.Map;

public class Tratadores {
    static class ProdutoNaoEncontradoException extends RuntimeException {}

    static final Map<Class<? extends Throwable>, Integer> STATUS = new LinkedHashMap<>();

    static int status(Throwable erro) {
        for (Map.Entry<Class<? extends Throwable>, Integer> t : STATUS.entrySet()) {
            if (t.getKey() == erro.getClass()) return t.getValue();
        }
        return 500;
    }

    public static void main(String[] args) {
        STATUS.put(ProdutoNaoEncontradoException.class, 404);
        STATUS.put(IllegalArgumentException.class, 400);
        System.out.println("produto inexistente: " + status(new ProdutoNaoEncontradoException()));
        System.out.println("número inválido na URL: " + status(new NumberFormatException("abc")));
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'produto inexistente: 404\nnúmero inválido na URL: 500' },
      correcao: `import java.util.LinkedHashMap;
import java.util.Map;

public class Tratadores {
    static class ProdutoNaoEncontradoException extends RuntimeException {}

    static final Map<Class<? extends Throwable>, Integer> STATUS = new LinkedHashMap<>();

    static int status(Throwable erro) {
        for (Map.Entry<Class<? extends Throwable>, Integer> t : STATUS.entrySet()) {
            if (t.getKey().isInstance(erro)) return t.getValue();
        }
        return 500;
    }

    public static void main(String[] args) {
        STATUS.put(ProdutoNaoEncontradoException.class, 404);
        STATUS.put(IllegalArgumentException.class, 400);
        System.out.println("produto inexistente: " + status(new ProdutoNaoEncontradoException()));
        System.out.println("número inválido na URL: " + status(new NumberFormatException("abc")));
    }
}`,
      saidaCorrigida: 'produto inexistente: 404\nnúmero inválido na URL: 400',
      dica: '`NumberFormatException` não é exatamente `IllegalArgumentException`. Que relação existe entre as duas?',
      explicacao: '`NumberFormatException` é subclasse de `IllegalArgumentException`, e um tratador vale para o tipo e para as subclasses, como os `@ExceptionHandler` do Spring. Comparar classes com `==` só aceita o tipo exato; `isInstance` aceita a herança.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t6-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual anotação sobe só a camada web, para testar um controller com os serviços mockados?',
      opcoes: ['`@WebMvcTest(ProdutoController.class)`', '`@SpringBootTest`', '`@DataJpaTest`', '`@ExtendWith(MockitoExtension.class)`'],
      resposta: 0,
      explicacao: 'A fatia web sobe controllers, tratadores de erro, conversão de JSON e validação, e deixa serviços e repositórios de fora.',
    },
    {
      id: 'backend-junior-t6-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um `@WebMvcTest(ProdutoController.class)` não sobe: "Parameter 0 of constructor in ProdutoController required a bean of type \'ProdutoService\' that could not be found." O que fazer?',
      opcoes: [
        'Declarar `@MockitoBean ProdutoService service;` na classe de teste',
        'Trocar para `@SpringBootTest`, que sempre resolve',
        'Anotar o serviço com `@Component` além de `@Service`',
        'Declarar `@Mock ProdutoService service;`',
      ],
      resposta: 0,
      explicacao: 'O serviço está fora da fatia. O `@MockitoBean` registra um mock como bean do contexto; o `@Mock` só cria um objeto no teste, que o Spring não conhece.',
    },
    {
      id: 'backend-junior-t6-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que o `MockMvc` faz ao executar `mvc.perform(get("/produtos/1"))`?',
      opcoes: [
        'Passa a requisição por todo o Spring MVC, com roteamento, JSON, validação e tratadores de erro, mas sem rede nem servidor',
        'Abre uma conexão HTTP com um Tomcat local',
        'Chama o método do controller diretamente, sem o Spring',
        'Simula só o código de status',
      ],
      resposta: 0,
      explicacao: 'Requisição e resposta são objetos em memória, e o `DispatcherServlet` real os processa. Por isso o teste pega erros de mapeamento e de JSON.',
    },
    {
      id: 'backend-junior-t6-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa classe `@DataJpaTest`, um teste salva três produtos. O teste seguinte chama `produtos.count()`. Qual é o resultado?',
      opcoes: [
        '0: cada teste roda numa transação que é desfeita no fim',
        '3: o banco em memória guarda tudo até o fim da classe',
        'Depende da ordem dos testes',
        'Um erro, porque o banco foi fechado',
      ],
      resposta: 0,
      explicacao: 'O `@DataJpaTest` é transacional, com rollback padrão. Na aula, o log mostrou "Began transaction" e "Rolled back transaction" em cada teste.',
    },
    {
      id: 'backend-junior-t6-e04-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um teste `@DataJpaTest` salva um produto e verifica `assertThat(salvo.getId()).isEqualTo(1L)`. Sozinho, passa; com a classe inteira, falha às vezes. Por quê?',
      opcoes: [
        'O rollback desfaz as linhas, mas não a sequência de ids: se outro teste inseriu antes, o id é outro',
        'O Hibernate gera ids aleatórios',
        'O H2 reinicia a sequência a cada teste',
        'O id só é gerado depois do rollback',
      ],
      resposta: 0,
      explicacao: 'Sequências e colunas de identidade não participam da transação. Na aula, o produto do segundo teste ganhou o id 2 com a tabela vazia.',
    },
    {
      id: 'backend-junior-t6-e04-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um `@SpringBootTest(webEnvironment = RANDOM_PORT)` anotado com `@Transactional` cria um produto por HTTP. Depois do teste, o produto continua no banco. Por quê?',
      opcoes: [
        'A requisição é atendida pela thread do Tomcat, numa transação própria, já confirmada; a transação do teste é outra',
        'O `@Transactional` não funciona em testes',
        'O H2 não aceita rollback',
        'Porque a porta é aleatória',
      ],
      resposta: 0,
      explicacao: 'O rollback do teste só alcança o que roda na thread do teste. Com servidor de verdade, os testes precisam limpar o que criam.',
    },
    {
      id: 'backend-junior-t6-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Duas classes `@SpringBootTest` são idênticas, exceto que uma declara `@MockitoBean Notificador notificador;`. Quantos contextos o Spring sobe para elas?',
      opcoes: ['Dois: o conjunto de mocks faz parte da chave do cache', 'Um, compartilhado', 'Nenhum: mocks dispensam contexto', 'Um por método de teste'],
      resposta: 0,
      explicacao: 'O mock troca um bean, e o contexto resultante é diferente. Padronizar os mocks dos testes de integração evita subidas extras.',
    },
    {
      id: 'backend-junior-t6-e04-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que um `@WebMvcTest(ProdutoController.class)` sobe? Escolha três.',
      opcoes: [
        'O `ProdutoController`',
        'Os `@RestControllerAdvice` e `@ExceptionHandler`',
        'A conversão de JSON com Jackson e a validação',
        'O `ProdutoService`, anotado com `@Service`',
        'O `ProdutoRepository` e o banco de dados',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Serviços, repositórios e o banco ficam fora da fatia web. Para testá-los juntos, `@SpringBootTest`; para o repositório, `@DataJpaTest`.',
    },
    {
      id: 'backend-junior-t6-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `src/main/resources/application.properties` tem 20 propriedades. Alguém cria um `src/test/resources/application.properties` com uma linha de log. O que acontece nos testes?',
      opcoes: [
        'Só a linha de log vale: o arquivo de teste substitui o principal, que tem o mesmo nome no classpath',
        'As 21 propriedades valem',
        'O Spring avisa que há dois arquivos e para',
        'O arquivo de teste é ignorado',
      ],
      resposta: 0,
      explicacao: 'O de teste vem antes no classpath e esconde o outro. Para ajustar poucas propriedades, use um perfil de teste ou o atributo `properties` do `@SpringBootTest`.',
    },
    {
      id: 'backend-junior-t6-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa usa configurações como chave de um cache, como o Spring faz com os contextos. Qual é a saída?',
      codigo: `import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Teste {
    record Configuracao(String tipo, Set<String> mocks) {}

    public static void main(String[] args) {
        Configuracao a = new Configuracao("@SpringBootTest", Set.of("Notificador", "Estoque"));
        Configuracao b = new Configuracao("@SpringBootTest", Set.of("Estoque", "Notificador"));
        Configuracao c = new Configuracao("@SpringBootTest", Set.of("Estoque"));
        Map<Configuracao, String> cache = new HashMap<>();
        cache.put(a, "contexto 1");
        cache.putIfAbsent(b, "contexto 2");
        cache.putIfAbsent(c, "contexto 3");
        System.out.println(a.equals(b) + " " + cache.size() + " " + cache.get(b));
    }
}`,
      opcoes: ['`true 2 contexto 1`', '`false 3 contexto 2`', '`true 3 contexto 1`', '`true 2 contexto 2`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Conjuntos iguais em qualquer ordem tornam as configurações iguais, e `b` reaproveita o contexto de `a`. Com um mock a menos, `c` é outra chave.',
    },
    {
      id: 'backend-junior-t6-e04-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa imita dois testes com rollback, numa tabela com sequência de ids. Digite a saída exata.',
      codigo: `import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

public class Teste {
    public static void main(String[] args) {
        List<String> tabela = new ArrayList<>();
        long sequencia = 0;
        StringJoiner saida = new StringJoiner("; ");
        for (int teste = 1; teste <= 2; teste++) {
            List<String> fotografia = new ArrayList<>(tabela);
            long id = ++sequencia;
            tabela.add("produto " + id);
            saida.add("teste " + teste + ": id " + id + ", linhas " + tabela.size());
            tabela = fotografia;
        }
        System.out.println(saida + "; no fim: " + tabela.size());
    }
}`,
      resposta: 'teste 1: id 1, linhas 1; teste 2: id 2, linhas 1; no fim: 0',
      explicacao: 'Cada teste começa com a tabela vazia e termina desfeito, mas a sequência fica fora da fotografia e continua de onde parou.',
    },
    {
      id: 'backend-junior-t6-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a vantagem do `MockMvcTester` sobre o `MockMvc` clássico?',
      opcoes: [
        'Asserções do AssertJ, com encadeamento fluente e mensagens detalhadas, e sem `throws Exception` nos testes',
        'Ele sobe um servidor de verdade',
        'Ele dispensa o `@WebMvcTest`',
        'Ele testa o banco de dados junto',
      ],
      resposta: 0,
      explicacao: 'Por baixo, é o mesmo MockMvc. A diferença é a forma de verificar: `assertThat(mvc.get().uri(...)).hasStatusOk().bodyJson()...`.',
    },
    {
      id: 'backend-junior-t6-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre `@Mock` e `@MockitoBean`?',
      opcoes: [
        '`@Mock` cria um mock no teste, sem Spring; `@MockitoBean` também registra o mock no contexto do Spring, no lugar do bean real',
        'São sinônimos',
        '`@MockitoBean` só funciona com interfaces',
        '`@Mock` é a versão nova do `@MockitoBean`',
      ],
      resposta: 0,
      explicacao: 'Em testes de unidade, `@Mock` basta. Em testes com contexto, só um bean do contexto chega aos objetos que o Spring monta.',
    },
    {
      id: 'backend-junior-t6-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O programa escolhe o tratador de uma exceção pela classe mais próxima, como os `@ExceptionHandler`. Qual é a saída?',
      codigo: `import java.util.Map;

public class Teste {
    static class ProdutoNaoEncontradoException extends RuntimeException {}

    static final Map<Class<?>, Integer> TRATADORES = Map.of(
            RuntimeException.class, 500,
            IllegalArgumentException.class, 400,
            ProdutoNaoEncontradoException.class, 404);

    static int status(Throwable erro) {
        for (Class<?> tipo = erro.getClass(); tipo != null; tipo = tipo.getSuperclass()) {
            Integer status = TRATADORES.get(tipo);
            if (status != null) return status;
        }
        return 500;
    }

    public static void main(String[] args) {
        System.out.println(status(new ProdutoNaoEncontradoException()) + " "
                + status(new NumberFormatException("abc")) + " "
                + status(new IllegalStateException()));
    }
}`,
      opcoes: ['`404 400 500`', '`500 500 500`', '`404 500 500`', '`404 400 400`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`NumberFormatException` herda de `IllegalArgumentException`, e `IllegalStateException`, só de `RuntimeException`. Testes de controller verificam justamente esse mapeamento.',
    },
    {
      id: 'backend-junior-t6-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual tipo de teste é o mais adequado para verificar que `findByNomeContainingIgnoreCaseOrderByNome` devolve os produtos certos, na ordem certa?',
      opcoes: [
        '`@DataJpaTest`, que roda a consulta num banco de verdade',
        'Um teste com Mockito, mockando o repositório',
        '`@WebMvcTest`',
        'Nenhum: consultas do Spring Data não precisam de teste',
      ],
      resposta: 0,
      explicacao: 'Mockar o repositório testaria o mock. A consulta só é verificada de verdade executando o SQL que o Spring Data gera.',
    },
  ],
};

export default episodio;
