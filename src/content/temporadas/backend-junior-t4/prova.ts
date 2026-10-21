import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T4: Spring Boot. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t4-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'O que caracteriza a inversão de controle no Spring?',
    opcoes: [
      'O contêiner cria os objetos e entrega as dependências, em vez de cada classe criar as suas com `new`',
      'As classes são executadas na ordem inversa',
      'O banco de dados controla a aplicação',
      'O controller chama o serviço, e não o contrário',
    ],
    resposta: 0,
    explicacao: 'A injeção de dependências é a técnica que realiza essa inversão: a classe declara o que precisa, e o contêiner entrega.',
  },
  {
    id: 'backend-junior-t4-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A aplicação não sobe: "Parameter 0 of constructor in PedidoService required a single bean, but 2 were found: correios, transportadora". Qual destas mudanças **não** resolve?',
    opcoes: [
      'Anotar o `PedidoService` com `@Scope("prototype")`',
      'Anotar uma das implementações com `@Primary`',
      'Anotar o parâmetro com `@Qualifier("correios")`',
      'Mudar o parâmetro para `List<Frete>` e escolher no código',
    ],
    resposta: 0,
    explicacao: 'O escopo do serviço não muda o fato de haver dois candidatos para o parâmetro. As outras três resolvem a ambiguidade.',
  },
  {
    id: 'backend-junior-t4-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Um `@Service` tem o campo `private int pedidosHoje`, incrementado a cada requisição. Com tráfego, o número fica menor que o real. Por quê?',
    opcoes: [
      'O serviço é um singleton usado por várias threads ao mesmo tempo, e o `++` não é atômico',
      'O Spring recria o serviço a cada requisição',
      'O `int` estoura',
      'O Tomcat descarta requisições',
    ],
    resposta: 0,
    explicacao: 'Duas threads podem ler o mesmo valor e gravar o mesmo resultado. Contadores compartilhados pedem `AtomicLong`, ou melhor, o banco ou uma ferramenta de métricas.',
  },
  {
    id: 'backend-junior-t4-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O programa monta um objeto injetando, pelo construtor, uma implementação escolhida pelo tipo. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    interface Frete { String nome(); }
    public static class Correios implements Frete { public String nome() { return "Correios"; } }
    public static class Pedido {
        final Frete frete;
        public Pedido(Frete frete) { this.frete = frete; }
    }

    public static void main(String[] args) throws Exception {
        List<Class<?>> registradas = List.of(Correios.class, Pedido.class);
        Class<?> tipo = Pedido.class.getConstructors()[0].getParameterTypes()[0];
        Class<?> escolhida = registradas.stream().filter(tipo::isAssignableFrom).findFirst().orElseThrow();
        Pedido p = new Pedido((Frete) escolhida.getConstructor().newInstance());
        System.out.println(tipo.getSimpleName() + " " + p.frete.nome());
    }
}`,
    opcoes: ['`Frete Correios`', '`Correios Correios`', '`Pedido Correios`', 'Lança `NoSuchElementException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O parâmetro do construtor é do tipo `Frete`, e a única classe registrada compatível é `Correios`. É, em miniatura, o que o contêiner faz.',
  },
  {
    id: 'backend-junior-t4-prova-q05',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Por que as dependências de starters, num pom com `spring-boot-starter-parent`, não precisam de `<version>`?',
    opcoes: [
      'O parent importa um BOM com versões testadas juntas para centenas de bibliotecas',
      'O Maven escolhe sempre a versão mais nova',
      'Os starters não têm versão',
      'O Initializr baixa as versões depois',
    ],
    resposta: 0,
    explicacao: 'Trocar a versão do parent atualiza todas as dependências de uma vez, mantendo a compatibilidade entre elas.',
  },
  {
    id: 'backend-junior-t4-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Com o driver do PostgreSQL no classpath, o Spring Boot cria um `DataSource` sozinho. Se você declarar o seu próprio `@Bean DataSource`, o que acontece?',
    opcoes: [
      'A autoconfiguração cede, por causa do `@ConditionalOnMissingBean`, e só o seu existe',
      'Os dois são criados, e a aplicação falha por ambiguidade',
      'O do Spring Boot substitui o seu',
      'A aplicação ignora o driver',
    ],
    resposta: 0,
    explicacao: 'É a regra geral da autoconfiguração: um padrão razoável que sai do caminho quando você define o seu.',
  },
  {
    id: 'backend-junior-t4-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O que roda quando você executa `java -jar loja.jar` com um JAR gerado pelo `spring-boot-maven-plugin`?',
    opcoes: [
      'O `JarLauncher` do Spring Boot, que monta o classpath com `BOOT-INF/classes` e `BOOT-INF/lib` e chama a `Start-Class`',
      'O `main` da sua classe diretamente, com as dependências baixadas na hora',
      'Um Tomcat instalado no sistema',
      'O Maven, que compila e executa',
    ],
    resposta: 0,
    explicacao: 'O `Main-Class` do manifesto aponta para o lançador, e a `Start-Class`, para a sua classe com `@SpringBootApplication`.',
  },
  {
    id: 'backend-junior-t4-prova-q08',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Uma autoconfiguração tem `@ConditionalOnProperty(name = "loja.metricas.ativo", havingValue = "true", matchIfMissing = true)`. Com `loja.metricas.ativo=false` no arquivo, ela é aplicada?',
    opcoes: [
      'Não: a propriedade existe e tem outro valor; o `matchIfMissing` só vale quando ela está ausente',
      'Sim, porque `matchIfMissing` é `true`',
      'Sim, porque qualquer valor da propriedade a ativa',
      'A aplicação falha',
    ],
    resposta: 0,
    explicacao: 'Sem a propriedade, a configuração seria aplicada. Com `false`, ela é desligada. É o padrão para recursos ligados por padrão.',
  },
  {
    id: 'backend-junior-t4-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Com `@GetMapping("/{id}") buscar(@PathVariable long id)` e `@GetMapping("/promocoes") promocoes()` no mesmo controller, qual método atende `GET /produtos/promocoes`?',
    opcoes: [
      '`promocoes()`: o caminho literal é mais específico que o com variável',
      '`buscar`, com erro de conversão de "promocoes" para `long`',
      'O que foi declarado primeiro',
      'Nenhum: a ambiguidade impede a aplicação de subir',
    ],
    resposta: 0,
    explicacao: 'O Spring compara a especificidade dos padrões que casam e prefere os trechos literais.',
  },
  {
    id: 'backend-junior-t4-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a resposta de `POST /produtos` com `Content-Type: application/xml` para um método `criar(@RequestBody NovoProduto novo)`, numa API que só tem o Jackson para JSON?',
    opcoes: ['`415 Unsupported Media Type`', '`406 Not Acceptable`', '`400 Bad Request`', '`201 Created`'],
    resposta: 0,
    explicacao: 'Não há conversor capaz de ler XML para `NovoProduto`. O `406` seria para um `Accept` que a API não consegue atender.',
  },
  {
    id: 'backend-junior-t4-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O despachante do programa escolhe, entre as rotas que casam, a que tem menos variáveis. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    static int variaveis(String modelo, String caminho) {
        String[] m = modelo.split("/"), c = caminho.split("/");
        if (m.length != c.length) return -1;
        int v = 0;
        for (int i = 0; i < m.length; i++) {
            if (m[i].startsWith("{")) v++;
            else if (!m[i].equals(c[i])) return -1;
        }
        return v;
    }

    public static void main(String[] args) {
        List<String> rotas = List.of("/produtos/{id}", "/produtos/{id}/itens", "/produtos/novos", "/{tipo}/{id}");
        String caminho = "/produtos/novos";
        String escolhida = rotas.stream()
                .filter(r -> variaveis(r, caminho) >= 0)
                .min(Comparator.comparingInt(r -> variaveis(r, caminho)))
                .orElse("404");
        System.out.println(escolhida);
    }
}`,
    opcoes: ['`/produtos/novos`', '`/produtos/{id}`', '`/{tipo}/{id}`', '`404`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Três rotas casam: `/produtos/{id}` com uma variável, `/{tipo}/{id}` com duas e `/produtos/novos` com nenhuma. A mais específica vence.',
  },
  {
    id: 'backend-junior-t4-prova-q12',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Como um método de controller deve responder à criação de um recurso?',
    opcoes: [
      '`ResponseEntity.created(uri).body(criado)`, que gera `201` com `Location`',
      '`return criado;`, que gera `201` sozinho',
      '`ResponseEntity.ok(criado)`',
      '`ResponseEntity.noContent().build()`',
    ],
    resposta: 0,
    explicacao: 'Retornar o objeto direto dá `200`. O `created` acerta o status e o cabeçalho de uma vez.',
  },
  {
    id: 'backend-junior-t4-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um DTO tem `@Positive Integer quantidade`, e o cliente não envia o campo. Com `@Valid`, a validação aceita?',
    opcoes: [
      'Aceita: o `@Positive` considera o `null` válido; para exigir o campo, falta `@NotNull`',
      'Recusa: o `@Positive` exige um número',
      'Aceita, e a quantidade vira 1',
      'O Jackson recusa antes',
    ],
    resposta: 0,
    explicacao: 'Só `@NotNull` e as anotações que o incluem rejeitam o nulo. É a armadilha mais comum do Bean Validation.',
  },
  {
    id: 'backend-junior-t4-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O serviço lança `PedidoNaoEncontradoException`, e não existe nenhum tratador para ela. O que o cliente recebe?',
    opcoes: ['`500 Internal Server Error`', '`404 Not Found`', '`400 Bad Request`', 'A mensagem da exceção com `200`'],
    resposta: 0,
    explicacao: 'O Spring não sabe o significado de exceções do domínio. Um `@ExceptionHandler` num `@RestControllerAdvice` faz a tradução para `404`.',
  },
  {
    id: 'backend-junior-t4-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais práticas de tratamento de erros são adequadas? Escolha duas.',
    opcoes: [
      'Responder erros inesperados com uma mensagem genérica e registrar os detalhes no log',
      'Listar os campos inválidos e os motivos na resposta de validação',
      'Devolver o *stack trace* para ajudar o cliente a depurar',
      'Responder `200` com `{"erro": ...}` para não assustar o cliente',
      'Usar `500` para qualquer erro, inclusive os de validação',
    ],
    respostas: [0, 1],
    explicacao: 'O cliente precisa saber o que corrigir, mas não precisa, e não deve, ver detalhes internos do servidor.',
  },
  {
    id: 'backend-junior-t4-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Há tratadores para `RuntimeException` (500), `ErroDeNegocio` (422) e `CupomInvalidoException` (400). `CupomExpiradoException` estende `CupomInvalidoException`, que estende `ErroDeNegocio`. Que status recebe uma `CupomExpiradoException`?',
    opcoes: ['`400`', '`422`', '`500`', 'Os três, em sequência'],
    resposta: 0,
    explicacao: 'O tratador escolhido é o do tipo mais próximo na hierarquia: `CupomInvalidoException`, a um passo de distância.',
  },
  {
    id: 'backend-junior-t4-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O `application.properties` tem `loja.frete.taxa-fixa=19.90`, e o servidor tem a variável `LOJA_FRETE_TAXAFIXA=9.90`. A aplicação é iniciada sem argumentos. Que valor vale?',
    opcoes: ['`9.90`, da variável de ambiente', '`19.90`, do arquivo', 'A aplicação falha por conflito', 'Os dois, somados'],
    resposta: 0,
    explicacao: 'Variáveis de ambiente têm prioridade sobre os arquivos, e só perdem para os argumentos de linha de comando.',
  },
  {
    id: 'backend-junior-t4-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Com `spring.profiles.active=prod`, quais arquivos de configuração o Spring Boot lê?',
    opcoes: [
      '`application.properties` e `application-prod.properties`, com o segundo sobrepondo o primeiro',
      'Só o `application-prod.properties`',
      'Só o `application.properties`',
      'Todos os arquivos `application-*.properties` do projeto',
    ],
    resposta: 0,
    explicacao: 'O arquivo do perfil complementa o padrão. Arquivos de outros perfis, como o `dev`, não são lidos.',
  },
  {
    id: 'backend-junior-t4-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O programa traduz nomes de componentes Java em propriedades, como o Spring Boot faz. Qual é a saída?',
    codigo: `public class Teste {
    static String propriedade(String prefixo, String componente) {
        return prefixo + "." + componente.replaceAll("([A-Z])", "-$1").toLowerCase();
    }

    public static void main(String[] args) {
        System.out.println(propriedade("loja.frete", "gratisAPartir") + " " + propriedade("loja", "nome"));
    }
}`,
    opcoes: [
      '`loja.frete.gratis-a-partir loja.nome`',
      '`loja.frete.gratisAPartir loja.nome`',
      '`loja.frete.gratis_a_partir loja.nome`',
      '`loja-frete-gratis-a-partir loja-nome`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O prefixo vem do `@ConfigurationProperties` e dos `record`s aninhados; o nome do componente, em *kebab case*, completa a chave.',
  },
  {
    id: 'backend-junior-t4-prova-q20',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Onde deve ficar a chave secreta da API de pagamentos usada em produção?',
    opcoes: [
      'Numa variável de ambiente ou num cofre de segredos, referenciada no arquivo como `${PAGAMENTOS_CHAVE}`',
      'No `application-prod.properties`, versionado no Git',
      'Numa constante da classe de configuração',
      'No README do projeto',
    ],
    resposta: 0,
    explicacao: 'Tudo o que vai para o Git fica no histórico para sempre, acessível a todos com acesso ao repositório.',
  },
];

export default prova;
