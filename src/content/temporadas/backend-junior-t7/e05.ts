import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t7-e05',
  minutos: 15,
  aula,
  armadilhas: [
    'Documentação escrita à parte do código envelhece; o OpenAPI gerado pelas anotações acompanha cada mudança.',
    'O Swagger UI permite chamar a API pelo navegador: desligue ou proteja em produção.',
    'Senha com valor padrão no `application.properties` faz a aplicação subir em produção com a senha de exemplo.',
    'Um segredo commitado continua no histórico do Git depois de apagado: troque a senha.',
    'Gerar um jar por ambiente faz homologação testar um artefato diferente do que vai para produção.',
    'Versões comparadas como texto põem a 1.10.0 antes da 1.9.3.',
    'Renomear um campo do JSON quebra quem consome a API: é mudança de versão maior.',
    'Um health check que engole a exceção do banco responde `UP` com o banco fora do ar.',
  ],
  ia: {
    uso:
      'Documentação e configuração de entrega são textos padronizados, e a IA escreve rascunhos bons de README, `CHANGELOG`, YAML de CI e anotações do OpenAPI. Os erros dela aqui são de atualização e de segurança: versões antigas de *actions* e de Java, e senhas de exemplo escritas nos arquivos.',
    pedido:
      'Escreva o workflow de CI do GitHub Actions e o trecho do README sobre como rodar e testar esta API Spring Boot 4 com Java 25.\n<cole aqui o pom.xml e o application.properties>\n- O CI roda ./mvnw -B verify em push e pull request, com cache do Maven; os testes usam Testcontainers.\n- Nenhuma senha no YAML nem no README; a configuração vem de variáveis de ambiente.\n- O README tem o comando para subir o banco local, o comando dos testes e um exemplo de curl para criar um pedido.\n- Diga como confirmo que as versões das actions e do Java estão atuais.',
    erros: [
      'Usa `java-version: 17` ou versões antigas das *actions* no YAML.',
      'Coloca `spring.datasource.password=senha123` "para o exemplo funcionar".',
      'Esquece que os testes com Testcontainers precisam de Docker e escreve um README que não roda numa máquina sem ele.',
      'Liga o Swagger UI em todos os ambientes.',
    ],
    conferir: [
      'Faça o push numa branch e veja o CI rodar até o fim, com os testes de integração.',
      'Procure `password`, `senha` e `secret` em todos os arquivos que a IA gerou.',
      'Clone o repositório numa pasta vazia e siga o README ao pé da letra.',
    ],
  },
  recursos: [
    {
      titulo: 'springdoc-openapi',
      url: 'https://springdoc.org/',
      tipo: 'documentacao',
      porque: 'A biblioteca que gera o OpenAPI e o Swagger UI a partir dos controllers.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Externalized Configuration',
      url: 'https://docs.spring.io/spring-boot/reference/features/external-config.html',
      tipo: 'documentacao',
      porque: 'A ordem das fontes de configuração, os placeholders e as variáveis de ambiente.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Actuator Endpoints',
      url: 'https://docs.spring.io/spring-boot/reference/actuator/endpoints.html',
      tipo: 'documentacao',
      porque: 'O `/actuator/health`, os indicadores de saúde e como expô-los com segurança.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: The Executable Jar Format',
      url: 'https://docs.spring.io/spring-boot/specification/executable-jar/index.html',
      tipo: 'documentacao',
      porque: 'A estrutura `BOOT-INF` e o launcher que roda jars dentro do jar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'GitHub Actions: Building and testing Java with Maven',
      url: 'https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-java-with-maven',
      tipo: 'documentacao',
      porque: 'O workflow de CI para um projeto Maven, com cache das dependências.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Semantic Versioning 2.0.0',
      url: 'https://semver.org/lang/pt-BR/',
      tipo: 'documentacao',
      porque: 'As regras de MAIOR, MENOR e CORREÇÃO, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Keep a Changelog',
      url: 'https://keepachangelog.com/pt-BR/1.1.0/',
      tipo: 'artigo',
      porque: 'Um formato simples de `CHANGELOG.md`, escrito para quem usa o projeto.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'The Twelve-Factor App: Config',
      url: 'https://12factor.net/pt_br/config',
      tipo: 'artigo',
      porque: 'Por que a configuração fica no ambiente, e não no código.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Javanauta: Como documentar APIs com Swagger OpenAPI no Spring Boot',
      url: 'https://www.youtube.com/watch?v=wtYAqS1GcHE',
      tipo: 'video',
      porque: 'O springdoc num projeto Spring Boot, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Código Fonte TV: Swagger, Dicionário do Programador',
      url: 'https://www.youtube.com/watch?v=3nl9AzttzBQ',
      tipo: 'video',
      porque: 'O que é o Swagger e o OpenAPI, em poucos minutos.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Continuous Delivery (Jez Humble e David Farley)',
      url: 'https://continuousdelivery.com/',
      tipo: 'livro',
      porque: 'O livro que definiu o pipeline de entrega e o artefato único para todos os ambientes.',
      onde: 'Capítulo 5, "Anatomy of the Deployment Pipeline"',
      gratuito: false,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'A próxima versão',
    enunciado:
      'Escreva `proxima(String atual, List<Mudanca> mudancas)`, com `enum Mudanca { CORRECAO, RECURSO, QUEBRA }`, que devolve a próxima versão semântica: a mudança mais forte decide qual número sobe, e os números à direita dele voltam a zero. Sem mudanças, a versão fica igual. Imprima exatamente:\n\n```text\n1.4.2 + [CORRECAO] = 1.4.3\n1.4.2 + [CORRECAO, RECURSO] = 1.5.0\n1.4.2 + [RECURSO, QUEBRA] = 2.0.0\n0.9.0 + [] = 0.9.0\n```',
    dicas: [
      'Quebre a versão com `split("[.]")`, que evita escapar o ponto.',
      'A ordem das constantes no enum já é a ordem de força: `max` com `Comparator.naturalOrder()` acha a mais forte.',
      'Um `switch` sobre a mudança mais forte monta a versão nova.',
    ],
    solucao: `import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class ProximaVersao {
    enum Mudanca { CORRECAO, RECURSO, QUEBRA }

    static String proxima(String atual, List<Mudanca> mudancas) {
        String[] p = atual.split("[.]");
        int maior = Integer.parseInt(p[0]), menor = Integer.parseInt(p[1]), correcao = Integer.parseInt(p[2]);
        Optional<Mudanca> maisForte = mudancas.stream().max(Comparator.naturalOrder());
        if (maisForte.isEmpty()) return atual;
        return switch (maisForte.get()) {
            case QUEBRA -> (maior + 1) + ".0.0";
            case RECURSO -> maior + "." + (menor + 1) + ".0";
            case CORRECAO -> maior + "." + menor + "." + (correcao + 1);
        };
    }

    public static void main(String[] args) {
        List<List<Mudanca>> casos = List.of(
                List.of(Mudanca.CORRECAO),
                List.of(Mudanca.CORRECAO, Mudanca.RECURSO),
                List.of(Mudanca.RECURSO, Mudanca.QUEBRA));
        for (List<Mudanca> c : casos) {
            System.out.println("1.4.2 + " + c + " = " + proxima("1.4.2", c));
        }
        System.out.println("0.9.0 + [] = " + proxima("0.9.0", List.of()));
    }
}`,
    saida: '1.4.2 + [CORRECAO] = 1.4.3\n1.4.2 + [CORRECAO, RECURSO] = 1.5.0\n1.4.2 + [RECURSO, QUEBRA] = 2.0.0\n0.9.0 + [] = 0.9.0',
    comentarios:
      'Ferramentas de release, como o *semantic-release*, fazem essa conta a partir das mensagens de commit (`fix:`, `feat:`, `feat!:`). O ponto importante é o zero à direita: a 1.5.0 vem depois da 1.4.2, e não existe uma 1.5.2 nascida do nada.',
  },
  bugs: [
    {
      id: 'backend-junior-t7-e05-b01',
      dificuldade: 1,
      sintoma: 'Em produção, a aplicação tenta o banco local e não sobe. O log mostra `conectando em jdbc:postgresql://localhost:5432/pedidos`, embora o servidor tenha `DB_URL` definida.',
      codigo: `import java.util.Map;

public class Config {
    public static void main(String[] args) {
        Map<String, String> ambiente = Map.of("DB_URL", "jdbc:postgresql://db-prod:5432/pedidos");
        String url = ambiente.getOrDefault("DB_ULR", "jdbc:postgresql://localhost:5432/pedidos");
        System.out.println("conectando em " + url);
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: 'conectando em jdbc:postgresql://localhost:5432/pedidos' },
      correcao: `import java.util.Map;

public class Config {
    public static void main(String[] args) {
        Map<String, String> ambiente = Map.of("DB_URL", "jdbc:postgresql://db-prod:5432/pedidos");
        String url = ambiente.getOrDefault("DB_URL", "jdbc:postgresql://localhost:5432/pedidos");
        System.out.println("conectando em " + url);
    }
}`,
      saidaCorrigida: 'conectando em jdbc:postgresql://db-prod:5432/pedidos',
      dica: 'A variável existe no ambiente. O nome procurado é exatamente o mesmo?',
      explicacao:
        'Com valor padrão, um nome digitado errado não dá erro: cai em silêncio no padrão. É o motivo de deixar sem padrão o que não pode ter um valor de exemplo em produção, e de logar a URL do banco (sem a senha) na inicialização.',
    },
    {
      id: 'backend-junior-t7-e05-b02',
      dificuldade: 2,
      sintoma: 'O script de deploy pegou a tag errada: o log diz `deploy da versão 1.9.3`, mas a mais nova é a 1.10.0.',
      codigo: `import java.util.List;

public class UltimaVersao {
    public static void main(String[] args) {
        List<String> tags = List.of("1.9.3", "1.10.0", "1.2.11");
        String ultima = tags.stream().max(String::compareTo).get();
        System.out.println("deploy da versão " + ultima);
    }
}`,
      linha: 6,
      efeito: { tipo: 'saida', saida: 'deploy da versão 1.9.3' },
      correcao: `import java.util.List;

public class UltimaVersao {
    public static void main(String[] args) {
        List<String> tags = List.of("1.9.3", "1.10.0", "1.2.11");
        String ultima = tags.stream().max(java.util.Comparator.comparing((String v) -> java.util.Arrays.stream(v.split("[.]")).mapToInt(Integer::parseInt).toArray(), java.util.Arrays::compare)).get();
        System.out.println("deploy da versão " + ultima);
    }
}`,
      saidaCorrigida: 'deploy da versão 1.10.0',
      dica: 'Como texto, qual vem primeiro: `"1.10.0"` ou `"1.9.3"`?',
      explicacao:
        'Comparando texto, o terceiro caractere decide: `1` é menor que `9`, então a 1.10.0 parece mais velha. Versões precisam ser comparadas número a número, como na aula.',
    },
    {
      id: 'backend-junior-t7-e05-b03',
      dificuldade: 3,
      sintoma: 'O banco caiu às 3h, mas o balanceador continuou mandando tráfego para a instância, porque o health check respondia `status: UP`.',
      codigo: `public class Saude {
    static boolean bancoResponde() {
        throw new IllegalStateException("Connection refused");
    }

    static String health() {
        try {
            bancoResponde();
        } catch (IllegalStateException e) {
            System.out.println("aviso: " + e.getMessage());
        }
        return "UP";
    }

    public static void main(String[] args) {
        System.out.println("status: " + health());
    }
}`,
      linha: 10,
      efeito: { tipo: 'saida', saida: 'aviso: Connection refused\nstatus: UP' },
      correcao: `public class Saude {
    static boolean bancoResponde() {
        throw new IllegalStateException("Connection refused");
    }

    static String health() {
        try {
            bancoResponde();
        } catch (IllegalStateException e) {
            return "DOWN: " + e.getMessage();
        }
        return "UP";
    }

    public static void main(String[] args) {
        System.out.println("status: " + health());
    }
}`,
      saidaCorrigida: 'status: DOWN: Connection refused',
      dica: 'Depois de registrar o aviso, o método segue para qual `return`?',
      explicacao:
        'O `catch` registra o erro e deixa o fluxo cair no `return "UP"`. Um health check que engole falhas é pior que nenhum, porque dá falsa confiança ao balanceador. O indicador do Actuator responde `DOWN` com status 503 quando o banco não responde.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t7-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que fazer com o Swagger UI em produção?',
      opcoes: [
        'Desligar com uma propriedade vinda do ambiente, ou deixar ligado só atrás de autenticação',
        'Deixar sempre ligado, porque é só documentação',
        'Apagar as anotações do OpenAPI antes do deploy',
        'Gerar um jar diferente para produção, sem o springdoc',
      ],
      resposta: 0,
      explicacao:
        'A tela permite chamar a API pelo navegador e expõe todas as rotas. Uma propriedade como `springdoc.swagger-ui.enabled=${SWAGGER_LIGADO:false}` resolve sem mudar o artefato. Um jar diferente por ambiente quebraria a regra do artefato único.',
      dica: 'A mesma resposta precisa valer sem gerar um jar diferente.',
    },
    {
      id: 'backend-junior-t7-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `List<String> tags = List.of("1.9.3", "1.10.0");
System.out.println(tags.stream().sorted().toList());`,
      resposta: '[1.10.0, 1.9.3]',
      explicacao: 'A ordem natural de `String` compara caractere a caractere: no terceiro, `1` vem antes de `9`. Para versões, compare os números, como na aula.',
      dica: 'Compare os textos caractere por caractere, até o primeiro diferente.',
    },
    {
      id: 'backend-junior-t7-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `application.properties` tem `spring.datasource.password=${DB_SENHA}`, sem padrão. O servidor novo não tem a variável. O que acontece, e isso é bom?',
      opcoes: [
        'A aplicação não sobe, com "Could not resolve placeholder \'DB_SENHA\'"; é bom, porque o erro aparece no deploy, e não no primeiro pedido',
        'A aplicação sobe com a senha vazia e falha só na primeira consulta',
        'O Spring pede a senha no console',
        'A aplicação sobe com a senha do ambiente local',
      ],
      resposta: 0,
      explicacao:
        'Um placeholder sem padrão e sem valor impede a inicialização. Falhar cedo, e de forma clara, é o comportamento desejado para segredos: o health check nunca diria `UP` para uma instância sem senha.',
      dica: 'O que o Spring faz com `${NOME}` quando não acha o valor e não há `:padrão`?',
    },
    {
      id: 'backend-junior-t7-e05-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais itens um README de API deve ter, para alguém rodar o projeto na primeira tentativa? Escolha dois.',
      opcoes: [
        'O comando para subir as dependências locais, como o banco, e o comando para rodar a aplicação',
        'O comando dos testes e o que eles exigem, como Docker para o Testcontainers',
        'A senha do banco de produção, para facilitar',
        'A lista de todas as classes do projeto',
        'O histórico completo de commits',
      ],
      respostas: [0, 1],
      explicacao:
        'Rodar e testar são as duas primeiras coisas que alguém tenta. Senhas nunca vão para o repositório, e a lista de classes e o histórico já estão no próprio Git.',
      dica: 'O que a pessoa faz nos primeiros cinco minutos depois de clonar?',
    },
    {
      id: 'backend-junior-t7-e05-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para ler a variável com um valor padrão, como o `${SWAGGER_LIGADO:false}`.',
      codigo: `Map<String, String> ambiente = Map.of("DB_URL", "jdbc:postgresql://db:5432/pedidos");
String swagger = ambiente.___("SWAGGER_LIGADO", "false");
System.out.println(swagger);`,
      respostas: ['getOrDefault'],
      saida: 'false',
      explicacao: '`getOrDefault` devolve o valor da chave ou, se ela não existe, o padrão. É o comportamento do `${NOME:padrão}`.',
      dica: 'O método de `Map` que já recebe o valor padrão.',
    },
    {
      id: 'backend-junior-t7-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Alguém commitou o `application-prod.properties` com a senha do banco, percebeu uma hora depois e apagou o arquivo num novo commit. O que ainda falta fazer?',
      opcoes: [
        'Trocar a senha do banco, porque ela continua no histórico do Git e em qualquer clone feito nesse tempo',
        'Nada: o arquivo foi apagado',
        'Fazer um `git revert` do commit que apagou',
        'Tornar o repositório privado e seguir em frente',
      ],
      resposta: 0,
      explicacao:
        'Apagar num commit novo não tira o arquivo dos commits anteriores. Mesmo reescrevendo o histórico, não dá para saber quem clonou. A única correção segura é invalidar o segredo.',
      dica: 'Os commits anteriores ainda existem?',
    },
    {
      id: 'backend-junior-t7-e05-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A versão atual é 1.4.2, e a entrega acrescenta um campo opcional ao JSON de resposta. O programa calcula a próxima versão. Qual é a saída?',
      codigo: `String[] p = "1.4.2".split("[.]");
System.out.println(p[0] + "." + (Integer.parseInt(p[1]) + 1) + ".0");`,
      opcoes: ['`1.5.0`', '`1.4.3`', '`2.0.0`', '`1.5.2`', '`1.41.0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'Um campo opcional novo é recurso compatível: sobe o número do meio, e a correção volta a zero. Os parênteses fazem a soma antes da concatenação; sem eles, sairia `1.41.0`.',
      dica: 'Recurso novo compatível sobe qual número, e o que acontece com o último?',
    },
    {
      id: 'backend-junior-t7-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Depois do deploy, `/actuator/health` responde 503 com `"db": {"status": "DOWN"}`. O que o balanceador de carga faz, se estiver configurado com esse health check?',
      opcoes: [
        'Para de mandar requisições para essa instância, e o tráfego segue nas que estão `UP`',
        'Reinicia o banco de dados',
        'Manda o tráfego normalmente, porque a aplicação está rodando',
        'Apaga a instância e faz o deploy de novo',
      ],
      resposta: 0,
      explicacao:
        'O health check existe para o balanceador decidir quem recebe tráfego. Uma instância que roda mas não alcança o banco responderia erro a todos os pedidos; tirá-la da rotação protege os clientes enquanto você investiga.',
      dica: 'Para que o balanceador consulta o health check?',
    },
    {
      id: 'backend-junior-t7-e05-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `boolean comoNumeros = Arrays.compare(new int[] {1, 10, 0}, new int[] {1, 9, 3}) > 0;
boolean comoTexto = "1.10.0".compareTo("1.9.3") > 0;
System.out.println(comoNumeros + " " + comoTexto);`,
      resposta: 'true false',
      explicacao:
        '`Arrays.compare` compara posição por posição: 1 = 1, depois 10 > 9, e decide. Como texto, `1` < `9` no terceiro caractere. É a diferença entre escolher a versão certa e a errada no deploy.',
      dica: 'O primeiro compara 10 com 9; o segundo, o caractere `1` com o `9`.',
    },
    {
      id: 'backend-junior-t7-e05-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o CI da aula faz a cada push?',
      opcoes: [
        'Baixa o código num servidor limpo e roda `./mvnw verify`, com todos os testes; se algo falha, o push fica marcado como quebrado',
        'Faz o deploy em produção',
        'Formata o código automaticamente',
        'Roda só os testes que mudaram',
      ],
      resposta: 0,
      explicacao:
        'Integração contínua é compilar e testar tudo, a cada mudança, num ambiente que não é a máquina de ninguém. O deploy é uma etapa seguinte, que só acontece para o que passou.',
      dica: 'O arquivo YAML da aula tem um único passo de execução.',
    },
    {
      id: 'backend-junior-t7-e05-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais mudanças exigem subir a versão **maior** da API? Escolha duas.',
      opcoes: [
        'Renomear o campo `total` do JSON para `valorTotal`',
        'Remover a rota `GET /pedidos/{id}`',
        'Acrescentar um campo opcional `observacao` à resposta',
        'Corrigir o cálculo do frete na fronteira',
        'Criar a rota `GET /pedidos/{id}/historico`',
      ],
      respostas: [0, 1],
      explicacao:
        'Renomear um campo e remover uma rota quebram clientes que funcionavam. Campo opcional novo e rota nova são recursos compatíveis (versão menor), e a correção de bug sobe só o último número.',
      dica: 'Um cliente que não mudou nada continua funcionando?',
    },
    {
      id: 'backend-junior-t7-e05-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Complete para converter o número do meio da versão.',
      codigo: `String[] p = "1.4.2".split("[.]");
int menor = Integer.___(p[1]) + 1;
System.out.println(p[0] + "." + menor + ".0");`,
      respostas: ['parseInt', 'valueOf'],
      saida: '1.5.0',
      explicacao:
        '`Integer.parseInt` converte o texto `"4"` no número 4. O `split("[.]")` usa uma classe de caracteres para o ponto, que sozinho, numa regex, casaria com qualquer caractere.',
      dica: 'O método de `Integer` que lê um número de um texto.',
    },
    {
      id: 'backend-junior-t7-e05-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que não compila.',
      codigo: `Map<String, String> ambiente = Map.of("DB_URL", "jdbc:postgresql://db:5432/pedidos");
String porta = ambiente.get("PORTA", "8080");
System.out.println(porta);`,
      resposta: 2,
      explicacao: '`get` recebe só a chave. Para um padrão, o método é `getOrDefault`, como na lacuna deste episódio.',
      dica: 'Quantos argumentos o `get` de um `Map` recebe?',
    },
    {
      id: 'backend-junior-t7-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que gerar um único jar e usá-lo em homologação e em produção, mudando só as variáveis de ambiente?',
      opcoes: [
        'Para que o que foi testado em homologação seja exatamente o que vai para produção',
        'Porque o Maven só consegue gerar um jar por projeto',
        'Para o deploy ficar mais rápido',
        'Porque as variáveis de ambiente deixam a aplicação mais segura que arquivos',
      ],
      resposta: 0,
      explicacao:
        'Recompilar por ambiente abre espaço para diferenças: outra versão de dependência, um arquivo esquecido. Com o mesmo artefato, a única diferença é a configuração, e ela é visível.',
      dica: 'Qual é a garantia que você perde se cada ambiente tiver o seu jar?',
    },
    {
      id: 'backend-junior-t7-e05-q15',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'A variável `PERFIL` não está definida. Digite a saída exata.',
      codigo: `Map<String, String> ambiente = Map.of();
String perfil = Optional.ofNullable(ambiente.get("PERFIL")).orElse("dev");
System.out.println("perfil ativo: " + perfil);`,
      resposta: 'perfil ativo: dev',
      explicacao: '`get` devolve `null` para a chave ausente, o `Optional` fica vazio, e o `orElse` entrega o padrão. É mais uma forma do `${PERFIL:dev}`.',
      dica: 'O que `get` devolve quando a chave não existe?',
    },
  ],
};

export default episodio;
