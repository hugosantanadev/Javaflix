import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t4-e05',
  minutos: 16,
  aula,
  armadilhas: [
    'Valores que mudam por ambiente, como endereços e tempos limite, não vão no código: vão na configuração.',
    'O arquivo de um perfil só sobrepõe as propriedades que define; as outras continuam vindo do arquivo padrão.',
    'Variáveis de ambiente usam outro formato: `loja.frete.gratis-a-partir` vira `LOJA_FRETE_GRATISAPARTIR`.',
    'Argumentos de linha de comando vencem variáveis de ambiente, que vencem os arquivos: um valor "que não muda" pode estar vindo de outra fonte.',
    'Sem `@Validated`, um `@ConfigurationProperties` aceita valores inválidos, e o erro aparece só em uso.',
    'Senhas e tokens nunca no `application.properties` versionado: use `${VARIAVEL}` e o ambiente.',
    'Esquecer de ativar o perfil de produção faz a aplicação usar os padrões, como um notificador que só imprime no console.',
  ],
  recursos: [
    {
      titulo: 'Spring Boot: Externalized Configuration',
      url: 'https://docs.spring.io/spring-boot/reference/features/external-config.html',
      tipo: 'documentacao',
      porque: 'A ordem completa das fontes, a vinculação relaxada e o `@ConfigurationProperties`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Profiles',
      url: 'https://docs.spring.io/spring-boot/reference/features/profiles.html',
      tipo: 'documentacao',
      porque: 'Ativação de perfis, grupos de perfis e arquivos por perfil.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Common Application Properties',
      url: 'https://docs.spring.io/spring-boot/appendix/application-properties/index.html',
      tipo: 'documentacao',
      porque: 'A lista de todas as propriedades `spring.*`, `server.*` e `management.*`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Twelve-Factor App: Config',
      url: 'https://12factor.net/pt_br/config',
      tipo: 'artigo',
      porque: 'O princípio de guardar a configuração no ambiente, separada do código, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Javadoc: Duration.parse',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence)',
      tipo: 'documentacao',
      porque: 'O formato ISO 8601 de durações, como `PT15M`, que o Spring Boot também aceita.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'TECH DEV BRAZIL: Spring Profiles na prática',
      url: 'https://www.youtube.com/watch?v=FUHpVIeEIgQ',
      tipo: 'video',
      porque: 'Perfis de desenvolvimento, homologação e produção num projeto real, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Michelli Brito: @Profile para ambientes dev e prod',
      url: 'https://www.youtube.com/watch?v=6nzapDKI14g',
      tipo: 'video',
      porque: 'Beans e arquivos por perfil, em sete minutos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Carreira Dev Internacional: Profiles e configuração externa no Spring Boot',
      url: 'https://www.youtube.com/watch?v=GstppgUFj4o',
      tipo: 'video',
      porque: 'Perfis, variáveis de ambiente e a ordem de prioridade, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Dan Vega: Spring Boot Environment Variables Explained',
      url: 'https://www.youtube.com/watch?v=rQV76dufxz4',
      tipo: 'video',
      porque: 'Como tirar chaves de API e senhas do código com variáveis de ambiente.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Um vinculador de propriedades',
    enunciado:
      'Escreva um `vincular(propriedades, prefixo, tipo)` que monte um `record` a partir de um mapa de propriedades, como o `Binder` do Spring Boot. Para cada componente, traduza o nome para *kebab case* (`gratisAPartir` vira `gratis-a-partir`), procure `prefixo.nome` e converta o texto para o tipo: `String`, `BigDecimal`, `List<String>` (separada por vírgulas, sem espaços nas pontas) e `Duration`, aceitando `15m`, `30s`, `2h` e o formato ISO, como `PT1H30M`. Componentes que forem `record`s são vinculados com o prefixo mais longo. Propriedades ausentes ficam `null`. Um valor que não converte lança um erro com a propriedade, o valor e o motivo. A saída deve ser:\n\n```text\nLojaProperties[nome=Loja Javaflix, frete=Frete[gratisAPartir=200.00, taxaFixa=19.90], tempoLimitePagamento=PT15M, cuponsAtivos=[BEMVINDO, FRETE10]]\nLojaProperties[nome=Loja Javaflix, frete=Frete[gratisAPartir=200.00, taxaFixa=19.90], tempoLimitePagamento=PT1H30M, cuponsAtivos=null]\nProperty: loja.tempo-limite-pagamento\nValue: "quinze"\nReason: failed to convert java.lang.String to java.time.Duration\n```\n\nNa segunda chamada, o tempo limite é `PT1H30M` e os cupons foram removidos; na terceira, o tempo limite é `quinze`.',
    dicas: [
      '`nome.replaceAll("([A-Z])", "-$1").toLowerCase()` insere um hífen antes de cada maiúscula.',
      '`getRecordComponents()` dá os componentes na ordem do construtor canônico; `getDeclaredConstructor(tipos)` o encontra.',
      'Para `15m`, separe o número do sufixo com expressões regulares e use `Duration.ofMinutes`.',
      'Capture as exceções de conversão e transforme-as numa exceção própria com a mensagem no formato do relatório do Spring.',
    ],
    solucao: `import java.lang.reflect.RecordComponent;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Vinculador {
    record Frete(BigDecimal gratisAPartir, BigDecimal taxaFixa) {}

    record LojaProperties(String nome, Frete frete, Duration tempoLimitePagamento, List<String> cuponsAtivos) {}

    static class ErroDeVinculo extends RuntimeException {
        ErroDeVinculo(String propriedade, String valor, String motivo) {
            super("Property: " + propriedade + "\\nValue: \\"" + valor + "\\"\\nReason: " + motivo);
        }
    }

    /** gratisAPartir vira gratis-a-partir. */
    static String kebab(String nome) {
        return nome.replaceAll("([A-Z])", "-$1").toLowerCase();
    }

    static Duration duracao(String texto) {
        if (texto.startsWith("P") || texto.startsWith("p")) return Duration.parse(texto);
        long n = Long.parseLong(texto.replaceAll("[a-z]+$", ""));
        return switch (texto.replaceAll("^[0-9]+", "")) {
            case "ms" -> Duration.ofMillis(n);
            case "s" -> Duration.ofSeconds(n);
            case "m" -> Duration.ofMinutes(n);
            case "h" -> Duration.ofHours(n);
            case "d" -> Duration.ofDays(n);
            default -> throw new IllegalArgumentException("'" + texto + "' is not a valid duration");
        };
    }

    static Object converter(String propriedade, String texto, Class<?> tipo) {
        try {
            if (tipo == String.class) return texto;
            if (tipo == BigDecimal.class) return new BigDecimal(texto);
            if (tipo == Duration.class) return duracao(texto);
            if (tipo == List.class) return Arrays.stream(texto.split(",")).map(String::trim).toList();
        } catch (RuntimeException e) {
            throw new ErroDeVinculo(propriedade, texto, "failed to convert java.lang.String to " + tipo.getName());
        }
        throw new IllegalArgumentException("tipo não suportado: " + tipo);
    }

    static <T extends Record> T vincular(Map<String, String> propriedades, String prefixo, Class<T> tipo) throws ReflectiveOperationException {
        RecordComponent[] componentes = tipo.getRecordComponents();
        Object[] valores = new Object[componentes.length];
        Class<?>[] tipos = new Class<?>[componentes.length];
        for (int i = 0; i < componentes.length; i++) {
            RecordComponent c = componentes[i];
            String chave = prefixo + "." + kebab(c.getName());
            tipos[i] = c.getType();
            if (c.getType().isRecord()) {
                @SuppressWarnings("unchecked")
                Class<? extends Record> aninhado = (Class<? extends Record>) c.getType();
                valores[i] = vincular(propriedades, chave, aninhado);
            } else {
                String texto = propriedades.get(chave);
                valores[i] = texto == null ? null : converter(chave, texto, c.getType());
            }
        }
        return tipo.getDeclaredConstructor(tipos).newInstance(valores);
    }

    public static void main(String[] args) throws Exception {
        Map<String, String> props = new LinkedHashMap<>();
        props.put("loja.nome", "Loja Javaflix");
        props.put("loja.frete.gratis-a-partir", "200.00");
        props.put("loja.frete.taxa-fixa", "19.90");
        props.put("loja.tempo-limite-pagamento", "15m");
        props.put("loja.cupons-ativos", "BEMVINDO, FRETE10");
        System.out.println(vincular(props, "loja", LojaProperties.class));

        props.put("loja.tempo-limite-pagamento", "PT1H30M");
        props.remove("loja.cupons-ativos");
        System.out.println(vincular(props, "loja", LojaProperties.class));

        props.put("loja.tempo-limite-pagamento", "quinze");
        try {
            vincular(props, "loja", LojaProperties.class);
        } catch (ErroDeVinculo e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    saida: 'LojaProperties[nome=Loja Javaflix, frete=Frete[gratisAPartir=200.00, taxaFixa=19.90], tempoLimitePagamento=PT15M, cuponsAtivos=[BEMVINDO, FRETE10]]\nLojaProperties[nome=Loja Javaflix, frete=Frete[gratisAPartir=200.00, taxaFixa=19.90], tempoLimitePagamento=PT1H30M, cuponsAtivos=null]\nProperty: loja.tempo-limite-pagamento\nValue: "quinze"\nReason: failed to convert java.lang.String to java.time.Duration',
    comentarios:
      'A primeira linha é idêntica ao `LojaProperties` que o Spring Boot montou na aula, e o erro tem as mesmas três informações do relatório real de falha na inicialização. A recursão para os `record`s aninhados é o que transforma `loja.frete.gratis-a-partir` no `frete.gratisAPartir`. O `Binder` de verdade vai muito além: aceita vários formatos de nome na mesma busca, porque a propriedade pode vir de uma variável de ambiente, converte dezenas de tipos com o mesmo serviço de conversão do Spring MVC, preenche mapas e listas indexadas, como `loja.cupons[0]`, e registra a origem de cada valor, que aparece no relatório como `from property source "commandLineArgs"`.',
  },
  exercicios: [
    {
      id: 'backend-junior-t4-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Onde ficam, num projeto Spring Boot, os valores padrão da configuração da aplicação?',
      opcoes: [
        'Em `src/main/resources/application.properties` ou `application.yml`',
        'Em constantes na classe principal',
        'No `pom.xml`',
        'Em variáveis de ambiente, obrigatoriamente',
      ],
      resposta: 0,
      explicacao: 'O arquivo vai junto no JAR com os padrões, e cada ambiente sobrepõe só o que precisa.',
    },
    {
      id: 'backend-junior-t4-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `@Value("${loja.suporte.email:suporte@loja.exemplo}")` injeta se a propriedade não estiver definida em lugar nenhum?',
      opcoes: ['`suporte@loja.exemplo`, o padrão depois dos dois-pontos', '`null`', 'Uma string vazia', 'A aplicação não sobe'],
      resposta: 0,
      explicacao: 'Sem o padrão, uma propriedade ausente faria a aplicação falhar na inicialização.',
    },
    {
      id: 'backend-junior-t4-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que preferir um `record` com `@ConfigurationProperties("loja")` a vários `@Value` espalhados?',
      opcoes: [
        'Porque liga o prefixo inteiro de uma vez, com tipos, conversão, propriedades aninhadas e validação na inicialização',
        'Porque o `@Value` não funciona com Spring Boot',
        'Porque o `record` dispensa o `application.properties`',
        'Porque é mais rápido em tempo de execução',
      ],
      resposta: 0,
      explicacao: 'A configuração da loja fica num lugar, testável e documentada pelo próprio tipo, em vez de strings repetidas em várias classes.',
    },
    {
      id: 'backend-junior-t4-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A propriedade `loja.frete.gratis-a-partir=200.00` está no arquivo. Que componente do `record` `Frete` a recebe?',
      opcoes: ['`gratisAPartir`', '`gratis_a_partir`', '`gratis-a-partir`, que precisa ter esse nome no Java', 'Nenhum: os nomes precisam ser idênticos'],
      resposta: 0,
      explicacao: 'É a vinculação relaxada: o *kebab case* dos arquivos corresponde ao *camel case* do Java.',
    },
    {
      id: 'backend-junior-t4-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual variável de ambiente define a propriedade `loja.frete.gratis-a-partir`?',
      opcoes: ['`LOJA_FRETE_GRATISAPARTIR`', '`LOJA.FRETE.GRATIS-A-PARTIR`', '`loja_frete_gratis_a_partir`', '`LOJA_FRETE_GRATIS_A_PARTIR`'],
      resposta: 0,
      explicacao: 'Pontos viram `_`, hífens são removidos, e tudo vai para maiúsculas. Variáveis de ambiente não aceitam pontos nem hífens.',
    },
    {
      id: 'backend-junior-t4-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A propriedade vale `200` no arquivo, `150` numa variável de ambiente e `99` num argumento `--loja.frete.gratis-a-partir=99`. Qual valor a aplicação usa?',
      opcoes: ['`99`', '`150`', '`200`', 'A aplicação falha por conflito'],
      resposta: 0,
      explicacao: 'Argumentos de linha de comando têm a maior prioridade, seguidos das variáveis de ambiente e dos arquivos.',
    },
    {
      id: 'backend-junior-t4-e05-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `application.properties` tem `loja.frete.taxa-fixa=19.90` e `loja.tempo-limite-pagamento=15m`; o `application-dev.properties` tem só `loja.frete.taxa-fixa=0.00`. Com o perfil `dev` ativo, quais valores valem?',
      opcoes: [
        'Taxa `0.00` e tempo limite `15m`',
        'Taxa `0.00` e tempo limite ausente',
        'Taxa `19.90` e tempo limite `15m`',
        'A aplicação falha por propriedade duplicada',
      ],
      resposta: 0,
      explicacao: 'O arquivo do perfil sobrepõe só o que define; o resto continua vindo do arquivo padrão.',
    },
    {
      id: 'backend-junior-t4-e05-q08',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quando um bean anotado com `@Profile("!prod")` é criado?',
      opcoes: [
        'Sempre que o perfil `prod` **não** estiver ativo',
        'Só quando o perfil `prod` estiver ativo',
        'Nunca',
        'Só quando nenhum perfil estiver ativo',
      ],
      resposta: 0,
      explicacao: 'O `!` nega o perfil. Com nenhum perfil, com `dev` ou com `teste`, o bean existe.',
    },
    {
      id: 'backend-junior-t4-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num contêiner Docker de produção, qual é a forma mais comum de ativar o perfil `prod`?',
      opcoes: [
        'A variável de ambiente `SPRING_PROFILES_ACTIVE=prod`',
        'Editar o `application.properties` dentro do JAR',
        'Recompilar o projeto com outro código',
        'Renomear o JAR para `loja-prod.jar`',
      ],
      resposta: 0,
      explicacao: 'O mesmo JAR, ou a mesma imagem, serve a todos os ambientes; só as variáveis mudam.',
    },
    {
      id: 'backend-junior-t4-e05-q10',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Onde a senha do banco de produção pode ficar? Escolha duas.',
      opcoes: [
        'Numa variável de ambiente, referenciada como `${DB_PASSWORD}`',
        'Num cofre de segredos, como os do Kubernetes ou da nuvem',
        'No `application.properties` versionado no Git',
        'Numa constante na classe de configuração',
        'No README, para facilitar',
      ],
      respostas: [0, 1],
      explicacao: 'Tudo o que vai para o Git é visto por todos com acesso ao repositório, para sempre, inclusive no histórico.',
    },
    {
      id: 'backend-junior-t4-e05-q11',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O método converte o nome de uma propriedade no da variável de ambiente correspondente. Digite a saída exata.',
      codigo: `public class Teste {
    static String variavel(String propriedade) {
        return propriedade.replace("-", "").replace('.', '_').toUpperCase();
    }

    public static void main(String[] args) {
        System.out.println(variavel("spring.datasource.url") + " " + variavel("server.max-http-request-header-size"));
    }
}`,
      resposta: 'SPRING_DATASOURCE_URL SERVER_MAXHTTPREQUESTHEADERSIZE',
      explicacao: 'Os hífens desaparecem, e não viram `_`. É por isso que o nome da variável parece estranho para propriedades com hífens.',
    },
    {
      id: 'backend-junior-t4-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        String componente = "tempoLimitePagamento";
        System.out.println(componente.replaceAll("([A-Z])", "-$1").toLowerCase());
    }
}`,
      opcoes: ['`tempo-limite-pagamento`', '`tempolimitepagamento`', '`-tempo-limite-pagamento`', '`tempo_limite_pagamento`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada maiúscula ganha um hífen antes, e o `toLowerCase` termina o *kebab case*. É o nome que o Spring Boot procura no arquivo.',
    },
    {
      id: 'backend-junior-t4-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A propriedade `loja.tempo-limite-pagamento=15m` é ligada a um componente `Duration`. Que valor ele recebe?',
      opcoes: ['A duração de 15 minutos, `PT15M`', 'A duração de 15 meses', 'A duração de 15 milissegundos', 'A aplicação falha: `Duration` só aceita `PT15M`'],
      resposta: 0,
      explicacao: 'O Spring Boot aceita sufixos como `ms`, `s`, `m`, `h` e `d`, além do formato ISO 8601. Sem sufixo, o padrão é milissegundos.',
    },
    {
      id: 'backend-junior-t4-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que é bom que uma configuração inválida, como `loja.nome` em branco com `@NotBlank`, impeça a aplicação de subir?',
      opcoes: [
        'Porque o erro aparece na implantação, com a propriedade e a origem, em vez de quebrar mais tarde, no meio do uso',
        'Porque assim a aplicação fica mais rápida',
        'Porque o Spring Boot exige que todas as propriedades existam',
        'Não é bom: a aplicação deveria subir e ignorar o erro',
      ],
      resposta: 0,
      explicacao: 'Falhar cedo transforma um defeito escondido num aviso imediato, quando quem implantou ainda está olhando.',
    },
    {
      id: 'backend-junior-t4-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.time.Duration;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Duration.parse("PT1H30M").toMinutes());
    }
}`,
      opcoes: ['`90`', '`130`', '`30`', '`1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`PT1H30M` é o formato ISO 8601 de uma hora e trinta minutos: 90 minutos. O `T` separa a parte de data da parte de horas.',
    },
  ],
};

export default episodio;
