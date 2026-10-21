import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t4-e02',
  minutos: 16,
  aula,
  armadilhas: [
    'Dependências de starters vão sem `<version>`: quem define as versões é o parent; fixar uma à mão pode quebrar a compatibilidade.',
    'No Spring Boot 4, o starter da web é o `spring-boot-starter-webmvc`; o `spring-boot-starter-web` é o nome do Boot 3.',
    'Classes fora do pacote da classe `@SpringBootApplication` não são encontradas pela varredura.',
    'Um bean seu do mesmo tipo substitui o da autoconfiguração; nem sempre é o que se quer.',
    'Porta 8080 ocupada impede a aplicação de subir: troque com `server.port`.',
    'Endpoints do Actuator como `env` e `heapdump` não podem ficar públicos em produção.',
    'Versões `SNAPSHOT` e `M1` no Initializr são de desenvolvimento, não para projetos reais.',
  ],
  recursos: [
    {
      titulo: 'Spring Initializr',
      url: 'https://start.spring.io/',
      tipo: 'ferramenta',
      porque: 'O gerador oficial de projetos, com todas as dependências disponíveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Developing Your First Spring Boot Application',
      url: 'https://docs.spring.io/spring-boot/tutorial/first-application/index.html',
      tipo: 'tutorial',
      porque: 'O tutorial oficial: o pom, a classe principal, o primeiro endpoint e o JAR executável.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Auto-configuration',
      url: 'https://docs.spring.io/spring-boot/reference/using/auto-configuration.html',
      tipo: 'documentacao',
      porque: 'Como a autoconfiguração funciona, como substituí-la e como desligar uma delas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Creating Your Own Auto-configuration',
      url: 'https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html',
      tipo: 'documentacao',
      porque: 'As anotações de condição e o arquivo `AutoConfiguration.imports`, de quem escreve uma.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Boot: The Executable Jar Format',
      url: 'https://docs.spring.io/spring-boot/specification/executable-jar/index.html',
      tipo: 'documentacao',
      porque: 'A estrutura do JAR reempacotado e como o `JarLauncher` carrega os JARs aninhados.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Boot: Actuator Endpoints',
      url: 'https://docs.spring.io/spring-boot/reference/actuator/endpoints.html',
      tipo: 'documentacao',
      porque: 'A lista dos endpoints, quais vêm expostos e como expor os outros com segurança.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michelli Brito: Iniciando uma aplicação Spring Boot',
      url: 'https://www.youtube.com/watch?v=OHn1jLHGptw',
      tipo: 'video',
      porque: 'O Initializr, a estrutura do projeto e a primeira execução, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Fernanda Kipper: Curso de Spring para iniciantes',
      url: 'https://www.youtube.com/watch?v=YY_hf0FOIcU',
      tipo: 'video',
      porque: 'Uma aula completa, do projeto vazio a uma API funcionando, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Daniele Leão: Criando um projeto do zero com Spring Boot',
      url: 'https://www.youtube.com/watch?v=UjQO3HSd6Ys',
      tipo: 'video',
      porque: 'O projeto passo a passo, com as explicações de cada arquivo gerado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Michelli Brito: Spring Boot, curso completo',
      url: 'https://www.youtube.com/watch?v=LXRU-Z36GEU',
      tipo: 'video',
      porque: 'Duas horas de Spring Boot, para aprofundar depois desta temporada, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Condições de autoconfiguração',
    enunciado:
      'Simule três condições do Spring Boot com um `sealed interface Condicao` e três `record`s: `ComClasse(classe)`, que exige uma classe no classpath; `SemBean(bean)`, que exige que o bean ainda não exista; e `ComPropriedade(nome, valor, seAusente)`, que exige a propriedade com aquele valor, ou aceita a ausência dela se `seAusente` for `true`. Avalie as autoconfigurações em ordem, criando o bean de cada uma aprovada e informando a primeira condição que falhou nas reprovadas. Use um `switch` com padrões de `record`. Com as quatro autoconfigurações do `main` e as duas situações, a saída deve ser:\n\n```text\nsem nada configurado:\n   + HttpClientAutoConfiguration criou httpClient\n   - DataSourceAutoConfiguration: classe org.postgresql.Driver ausente\n   - CacheAutoConfiguration: loja.cache.ativo=null, esperava true\n   + MetricasAutoConfiguration criou metricas\n   beans: [httpClient, metricas]\ncom propriedades e um httpClient próprio:\n   - HttpClientAutoConfiguration: já existe o bean httpClient\n   - DataSourceAutoConfiguration: classe org.postgresql.Driver ausente\n   + CacheAutoConfiguration criou cacheManager\n   - MetricasAutoConfiguration: loja.metricas.ativo=false, esperava true\n   beans: [httpClient, cacheManager]\n```\n\nAs autoconfigurações: `HttpClientAutoConfiguration` (classe `java.net.http.HttpClient` e sem bean `httpClient`), `DataSourceAutoConfiguration` (classe `org.postgresql.Driver`), `CacheAutoConfiguration` (propriedade `loja.cache.ativo=true`, sem aceitar ausência) e `MetricasAutoConfiguration` (propriedade `loja.metricas.ativo=true`, aceitando ausência). Na segunda situação, as propriedades são `loja.cache.ativo=true` e `loja.metricas.ativo=false`, e o usuário já declarou o bean `httpClient`.',
    dicas: [
      'Faça cada condição devolver um `Optional<String>` com o motivo da falha, vazio quando atendida.',
      '`stream().map(...).flatMap(Optional::stream).findFirst()` acha a primeira falha sem avaliar as seguintes.',
      'O `SemBean` precisa ver a lista de beans **já criados**, inclusive os do usuário, que vêm antes de todas as autoconfigurações.',
      'Com `seAusente`, a ausência da propriedade aprova a condição; um valor diferente reprova sempre.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class Condicoes {
    sealed interface Condicao permits ComClasse, SemBean, ComPropriedade {}

    record ComClasse(String classe) implements Condicao {}

    record SemBean(String bean) implements Condicao {}

    record ComPropriedade(String nome, String valor, boolean seAusente) implements Condicao {}

    record AutoConfiguracao(String nome, String beanCriado, List<Condicao> condicoes) {}

    /** Devolve o motivo da falha, ou vazio se a condição foi atendida. */
    static Optional<String> avaliar(Condicao c, Map<String, String> propriedades, List<String> beans) {
        return switch (c) {
            case ComClasse(String classe) -> {
                try {
                    Class.forName(classe, false, Condicoes.class.getClassLoader());
                    yield Optional.empty();
                } catch (ClassNotFoundException e) {
                    yield Optional.of("classe " + classe + " ausente");
                }
            }
            case SemBean(String bean) -> beans.contains(bean)
                    ? Optional.of("já existe o bean " + bean) : Optional.empty();
            case ComPropriedade(String nome, String valor, boolean seAusente) -> {
                String atual = propriedades.get(nome);
                boolean ok = atual == null ? seAusente : atual.equals(valor);
                yield ok ? Optional.empty() : Optional.of(nome + "=" + atual + ", esperava " + valor);
            }
        };
    }

    static List<String> aplicar(List<AutoConfiguracao> autos, Map<String, String> propriedades, List<String> doUsuario) {
        List<String> beans = new ArrayList<>(doUsuario);
        for (AutoConfiguracao a : autos) {
            Optional<String> falha = a.condicoes().stream()
                    .map(c -> avaliar(c, propriedades, beans))
                    .flatMap(Optional::stream)
                    .findFirst();
            if (falha.isEmpty()) {
                beans.add(a.beanCriado());
                System.out.println("   + " + a.nome() + " criou " + a.beanCriado());
            } else {
                System.out.println("   - " + a.nome() + ": " + falha.get());
            }
        }
        return beans;
    }

    public static void main(String[] args) {
        List<AutoConfiguracao> autos = List.of(
                new AutoConfiguracao("HttpClientAutoConfiguration", "httpClient",
                        List.of(new ComClasse("java.net.http.HttpClient"), new SemBean("httpClient"))),
                new AutoConfiguracao("DataSourceAutoConfiguration", "dataSource",
                        List.of(new ComClasse("org.postgresql.Driver"))),
                new AutoConfiguracao("CacheAutoConfiguration", "cacheManager",
                        List.of(new ComPropriedade("loja.cache.ativo", "true", false))),
                new AutoConfiguracao("MetricasAutoConfiguration", "metricas",
                        List.of(new ComPropriedade("loja.metricas.ativo", "true", true))));

        System.out.println("sem nada configurado:");
        System.out.println("   beans: " + aplicar(autos, Map.of(), List.of()));

        Map<String, String> propriedades = new LinkedHashMap<>();
        propriedades.put("loja.cache.ativo", "true");
        propriedades.put("loja.metricas.ativo", "false");
        System.out.println("com propriedades e um httpClient próprio:");
        System.out.println("   beans: " + aplicar(autos, propriedades, List.of("httpClient")));
    }
}`,
    saida: 'sem nada configurado:\n   + HttpClientAutoConfiguration criou httpClient\n   - DataSourceAutoConfiguration: classe org.postgresql.Driver ausente\n   - CacheAutoConfiguration: loja.cache.ativo=null, esperava true\n   + MetricasAutoConfiguration criou metricas\n   beans: [httpClient, metricas]\ncom propriedades e um httpClient próprio:\n   - HttpClientAutoConfiguration: já existe o bean httpClient\n   - DataSourceAutoConfiguration: classe org.postgresql.Driver ausente\n   + CacheAutoConfiguration criou cacheManager\n   - MetricasAutoConfiguration: loja.metricas.ativo=false, esperava true\n   beans: [httpClient, cacheManager]',
    comentarios:
      'As quatro regras do Spring Boot aparecem juntas. A biblioteca ausente desliga a configuração inteira, como o `DataSourceAutoConfiguration` sem driver. O bean do usuário vence o automático, como um `JsonMapper` próprio. Uma propriedade pode ligar algo que vem desligado, como o cache, ou desligar algo que vem ligado, como as métricas com `matchIfMissing = true`. Por isso o Spring Boot processa os beans do usuário antes das autoconfigurações: o `@ConditionalOnMissingBean` só funciona se os seus já estiverem registrados quando ele é avaliado. O `sealed interface` com o `switch` de padrões garante, em tempo de compilação, que todo tipo de condição foi tratado.',
  },
  exercicios: [
    {
      id: 'backend-junior-t4-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o `spring-boot-starter-parent` faz pelo projeto?',
      opcoes: [
        'Define versões testadas juntas para centenas de dependências e configura os plugins do Maven',
        'Instala o Spring Boot na máquina',
        'Gera as classes do projeto',
        'Cria o banco de dados',
      ],
      resposta: 0,
      explicacao: 'Por isso as dependências dos starters vão sem `<version>`. Ele também liga o `-parameters` e define a codificação e a versão do Java.',
    },
    {
      id: 'backend-junior-t4-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é um starter, como o `spring-boot-starter-webmvc`?',
      opcoes: [
        'Uma dependência que agrupa as bibliotecas de uma funcionalidade, como Spring MVC, Tomcat e Jackson',
        'Um script que inicia a aplicação',
        'Uma classe com o método `main`',
        'Um arquivo de configuração',
      ],
      resposta: 0,
      explicacao: 'Uma linha no pom traz tudo o que a funcionalidade precisa, em versões compatíveis entre si.',
    },
    {
      id: 'backend-junior-t4-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quais anotações o `@SpringBootApplication` reúne?',
      opcoes: [
        '`@SpringBootConfiguration`, `@EnableAutoConfiguration` e `@ComponentScan`',
        '`@RestController`, `@Service` e `@Repository`',
        '`@Bean`, `@Primary` e `@Qualifier`',
        '`@Transactional`, `@Configuration` e `@Component`',
      ],
      resposta: 0,
      explicacao: 'A classe vira uma configuração, a varredura começa no pacote dela, e a autoconfiguração é ligada.',
    },
    {
      id: 'backend-junior-t4-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A aplicação sobe sem erros, mas `GET /ola` responde 404. O `OlaController` está em `com.exemplo.web`, e a classe principal, em `br.com.javaflix.loja`. Por quê?',
      opcoes: [
        'O controller está fora da árvore de pacotes varrida, e nunca virou bean',
        'Faltou reiniciar o Tomcat',
        'O `@GetMapping` só funciona com `@Service`',
        'O caminho precisa terminar com barra',
      ],
      resposta: 0,
      explicacao: 'Sem o controller registrado, nenhuma rota `/ola` existe. Mova-o para `br.com.javaflix.loja.web`, por exemplo.',
    },
    {
      id: 'backend-junior-t4-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você declara um `@Bean JsonMapper` com as suas configurações. O que acontece com o `JsonMapper` que o Spring Boot criaria?',
      opcoes: [
        'Não é criado: a autoconfiguração tem `@ConditionalOnMissingBean` e cede ao seu',
        'Os dois são criados, e a aplicação falha por ambiguidade',
        'O dele substitui o seu',
        'O Spring Boot mescla as configurações dos dois',
      ],
      resposta: 0,
      explicacao: 'É a regra geral do Spring Boot: um padrão razoável, que sai do caminho quando você define o seu.',
    },
    {
      id: 'backend-junior-t4-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como descobrir por que uma autoconfiguração foi, ou não foi, aplicada?',
      opcoes: [
        'Rodar com `--debug` e ler o relatório de condições, com os *positive* e *negative matches*',
        'Abrir o pom.xml',
        'Ler o código-fonte do Tomcat',
        'Não há como saber',
      ],
      resposta: 0,
      explicacao: 'O relatório diz, para cada candidata, qual condição foi atendida ou falhou, como uma classe ausente do classpath.',
    },
    {
      id: 'backend-junior-t4-e02-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A aplicação não sobe, e o relatório diz que a porta 8080 já está em uso. Qual é a solução mais simples?',
      opcoes: [
        'Configurar outra porta com `server.port=8081`, ou encerrar o programa que está na 8080 se ele for seu',
        'Reinstalar o Java',
        'Apagar a pasta `target`',
        'Trocar o Tomcat pelo Jetty',
      ],
      resposta: 0,
      explicacao: 'Só um processo pode escutar numa porta. Antes de encerrar o que está nela, confira de quem é: pode ser outro serviço da máquina.',
    },
    {
      id: 'backend-junior-t4-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como o JAR gerado pelo `spring-boot-maven-plugin` roda com `java -jar`, se as dependências são outros JARs?',
      opcoes: [
        'As dependências ficam dentro dele, em `BOOT-INF/lib`, e o `JarLauncher`, indicado no `Main-Class`, monta o classpath e chama a `Start-Class`',
        'O `java -jar` baixa as dependências da internet',
        'As dependências precisam estar instaladas no servidor',
        'O plugin junta todas as classes num único pacote',
      ],
      resposta: 0,
      explicacao: 'Um único arquivo carrega a aplicação inteira, o que simplifica a implantação e as imagens Docker.',
    },
    {
      id: 'backend-junior-t4-e02-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o Actuator são verdadeiras? Escolha duas.',
      opcoes: [
        'Por padrão, só o endpoint `health` fica exposto pela web',
        '`/actuator/health` responde `{"status":"UP"}` quando a aplicação está saudável',
        'O endpoint `env` vem exposto publicamente por padrão',
        'Sem o Actuator, a aplicação não sobe',
        'O Actuator substitui os logs',
      ],
      respostas: [0, 1],
      explicacao: 'Os outros endpoints precisam ser expostos com `management.endpoints.web.exposure.include`, e os sensíveis exigem proteção.',
    },
    {
      id: 'backend-junior-t4-e02-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa testa a presença de classes no classpath, como faz o `@ConditionalOnClass`. Digite a saída exata.',
      codigo: `public class Teste {
    static boolean existe(String nome) {
        try {
            Class.forName(nome, false, Teste.class.getClassLoader());
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }

    public static void main(String[] args) {
        System.out.println(existe("java.util.List") + " " + existe("org.postgresql.Driver"));
    }
}`,
      resposta: 'true false',
      explicacao: 'O JDK tem o `List`, mas não o driver do PostgreSQL. Com a dependência do driver no pom, a segunda chamada daria `true`, e a configuração do banco seria aplicada.',
    },
    {
      id: 'backend-junior-t4-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Cada condição devolve um `Optional` com o motivo da falha. Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<Optional<String>> condicoes = List.of(
                Optional.empty(), Optional.of("sem classe"), Optional.of("sem propriedade"));
        String resultado = condicoes.stream()
                .flatMap(Optional::stream)
                .findFirst()
                .orElse("aplicada");
        System.out.println(resultado);
    }
}`,
      opcoes: ['`sem classe`', '`aplicada`', '`sem propriedade`', '`Optional[sem classe]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `flatMap(Optional::stream)` descarta os vazios, e o `findFirst` pega a primeira falha. Só se não houvesse falha nenhuma o resultado seria "aplicada".',
    },
    {
      id: 'backend-junior-t4-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num projeto com Spring Boot 4, qual starter traz o Spring MVC e o Tomcat embutido?',
      opcoes: ['`spring-boot-starter-webmvc`', '`spring-boot-starter-tomcat-mvc`', '`spring-mvc-boot`', '`spring-boot-web-server`'],
      resposta: 0,
      explicacao: 'No Spring Boot 3, o mesmo papel era do `spring-boot-starter-web`, nome que ainda aparece em muitos tutoriais.',
    },
    {
      id: 'backend-junior-t4-e02-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'No Spring Initializr, aparecem as versões `4.1.1`, `4.2.0 (M1)` e `4.2.0 (SNAPSHOT)`. Qual escolher para um projeto novo de produção?',
      opcoes: ['`4.1.1`', '`4.2.0 (M1)`', '`4.2.0 (SNAPSHOT)`', 'Qualquer uma, são equivalentes'],
      resposta: 0,
      explicacao: 'Marcos (`M1`) e `SNAPSHOT` são versões em desenvolvimento, que podem mudar ou ter defeitos conhecidos.',
    },
    {
      id: 'backend-junior-t4-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Com `@RequestParam(defaultValue = "mundo") String nome`, o que `GET /ola` responde, sem parâmetro?',
      opcoes: ['`Olá, mundo!`', '`Olá, null!`', '`400 Bad Request`', '`Olá, !`'],
      resposta: 0,
      explicacao: 'Sem o `defaultValue`, um `@RequestParam` é obrigatório, e a ausência dele resultaria em `400`.',
    },
    {
      id: 'backend-junior-t4-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que testar a presença de uma classe com `Class.forName(nome, false, carregador)`, e não com `Class.forName(nome)`?',
      opcoes: [
        'O `false` carrega a classe sem executar os inicializadores estáticos, para que o teste não tenha efeitos colaterais',
        'O `false` faz a busca mais rápida, só isso',
        'O `false` impede exceções',
        'Não há diferença',
      ],
      resposta: 0,
      explicacao: 'Um bloco `static` de um driver, por exemplo, poderia registrar-se no `DriverManager`. Só para saber se a classe existe, não se quer isso.',
    },
  ],
};

export default episodio;
