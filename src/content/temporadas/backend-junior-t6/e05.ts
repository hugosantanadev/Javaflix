import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t6-e05',
  minutos: 17,
  aula,
  armadilhas: [
    'Testes no H2 podem passar com SQL que o PostgreSQL de produção recusa, e o contrário.',
    'Sem o Docker rodando, todo teste com Testcontainers falha com "Could not find a valid Docker environment".',
    'No Testcontainers 2, as classes mudaram de pacote: `org.testcontainers.postgresql.PostgreSQLContainer`; a antiga está obsoleta.',
    'A porta do banco no teste é aleatória: nunca fixe `localhost:5432` na configuração dos testes.',
    'O contêiner é compartilhado pelos testes de mesma configuração: cada teste limpa o que cria.',
    'Variações na configuração de teste sobem contextos novos, e cada um pode subir outro contêiner.',
    'A imagem do banco nos testes deve ter a mesma versão principal da produção.',
  ],
  ia: {
    uso:
      'A IA monta rapidamente a configuração do Testcontainers e os testes de repositório contra o banco real. Diga as versões do seu projeto no pedido: o Testcontainers 2 renomeou módulos e pacotes, e boa parte dos exemplos que a IA viu usa os nomes antigos.',
    pedido:
      'Configure Testcontainers com PostgreSQL 18 num projeto Spring Boot 4.1, que usa Testcontainers 2.0.\n- Use uma @TestConfiguration com @Bean @ServiceConnection, reaproveitável por todos os testes.\n- Mostre um teste @SpringBootTest que importa essa configuração e salva um produto.\n- Liste as dependências do pom.xml sem versões, porque o Spring Boot as gerencia.\n- Não fixe portas, usuários nem senhas na configuração.\n\n<cole aqui a entidade e o repositório>',
    erros: [
      'Usa os nomes do Testcontainers 1: o artefato `postgresql` e a classe `org.testcontainers.containers.PostgreSQLContainer`, hoje obsoleta.',
      'Configura URL, usuário e senha à mão com `@DynamicPropertySource`, um caminho mais longo que o `@ServiceConnection` resolve sozinho.',
      'Fixa a porta 5432 na configuração dos testes, ignorando a porta aleatória do contêiner.',
    ],
    conferir: [
      'Rode com o Docker ligado e veja no log a versão do Testcontainers e a imagem usada.',
      'Confira se a imagem tem a mesma versão principal do PostgreSQL de produção.',
      'Rode uma vez com o Docker desligado: o erro deve ser o "Could not find a valid Docker environment", e não outro.',
    ],
  },
  recursos: [
    {
      titulo: 'Testcontainers for Java',
      url: 'https://java.testcontainers.org/',
      tipo: 'documentacao',
      porque: 'A documentação oficial, com os módulos de cada banco e serviço.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Testcontainers: Postgres Module',
      url: 'https://java.testcontainers.org/modules/databases/postgres/',
      tipo: 'documentacao',
      porque: 'O contêiner do PostgreSQL, com as opções de imagem, banco e scripts iniciais.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Testcontainers',
      url: 'https://docs.spring.io/spring-boot/reference/testing/testcontainers.html',
      tipo: 'documentacao',
      porque: 'O `@ServiceConnection`, os contêineres como beans e os serviços suportados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Development-time Services com Testcontainers',
      url: 'https://docs.spring.io/spring-boot/reference/features/dev-services.html#features.dev-services.testcontainers',
      tipo: 'documentacao',
      porque: 'Como rodar a aplicação na máquina com os contêineres da configuração de teste.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Testcontainers: Waiting for containers to start or be ready',
      url: 'https://java.testcontainers.org/features/startup_and_waits/',
      tipo: 'documentacao',
      porque: 'As estratégias de espera: por porta, por rota HTTP, por mensagem no log e pelo healthcheck do Docker.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Testcontainers Guides: Testing a Spring Boot REST API',
      url: 'https://testcontainers.com/guides/testing-spring-boot-rest-api-using-testcontainers/',
      tipo: 'tutorial',
      porque: 'Um guia passo a passo de uma API Spring Boot testada com PostgreSQL num contêiner.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Testcontainers: Fixing issues with discovering a container runtime',
      url: 'https://java.testcontainers.org/on_failure.html',
      tipo: 'documentacao',
      porque: 'A página indicada pela própria mensagem de erro quando o Docker não é encontrado.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Full Cycle: Testcontainers, a nova era de testes automatizados',
      url: 'https://www.youtube.com/watch?v=jlcWG1aPcXQ',
      tipo: 'video',
      porque: 'Por que testar com contêineres reais e como o Testcontainers funciona, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'O Igor Rudel: Spring Boot e Testcontainers',
      url: 'https://www.youtube.com/watch?v=lZbFm8FiWiw',
      tipo: 'video',
      porque: 'Testes de integração completos com Spring Boot e um banco num contêiner, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Esperando pelo log',
    enunciado:
      'Implemente a estratégia de espera por mensagem no log, a que o Testcontainers usa para o PostgreSQL. O método `esperar(log, regex, vezes)` percorre as linhas do log, na ordem, e devolve o número da linha (a partir de 1) em que a mensagem casou com a expressão regular pela n-ésima vez. Se o log acabar antes, imprime quantas vezes a mensagem apareceu e devolve -1. Use o log simulado de uma primeira subida da imagem do PostgreSQL, com o servidor temporário e o definitivo, e espere 1, 2 e 3 vezes. A saída deve ser:\n\n```text\nesperando a mensagem 1 vez(es):\n  pronto na linha 4: LOG:  database system is ready to accept connections\nesperando a mensagem 2 vez(es):\n  pronto na linha 11: LOG:  database system is ready to accept connections\nesperando a mensagem 3 vez(es):\n  não ficou pronto: a mensagem apareceu 2 de 3 vezes\n```',
    dicas: [
      '`Pattern.compile(regex)` uma vez, e `padrao.matcher(linha).matches()` para cada linha.',
      'A expressão `.*database system is ready to accept connections.*` casa com a linha inteira, com qualquer prefixo.',
      'Conte as ocorrências e devolva assim que a contagem chegar ao pedido.',
      'O log tem 11 linhas: a mensagem aparece na 4, do servidor temporário, e na 11, do definitivo.',
    ],
    solucao: `import java.util.List;
import java.util.regex.Pattern;

public class EsperaPorLog {
    /** Lê o log linha a linha até a mensagem aparecer as vezes pedidas. Devolve a linha em que ficou pronto, ou -1. */
    static int esperar(List<String> log, String regex, int vezes) {
        Pattern padrao = Pattern.compile(regex);
        int encontradas = 0;
        for (int i = 0; i < log.size(); i++) {
            if (padrao.matcher(log.get(i)).matches()) {
                encontradas++;
                if (encontradas == vezes) return i + 1;
            }
        }
        System.out.println("  não ficou pronto: a mensagem apareceu " + encontradas + " de " + vezes + " vezes");
        return -1;
    }

    public static void main(String[] args) {
        List<String> log = List.of(
                "The files belonging to this database system will be owned by user \\"postgres\\".",
                "syncing data to disk ... ok",
                "waiting for server to start....",
                "LOG:  database system is ready to accept connections",
                " done",
                "server started",
                "/usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/loja.sql",
                "waiting for server to shut down.... done",
                "server stopped",
                "PostgreSQL init process complete; ready for start up.",
                "LOG:  database system is ready to accept connections");
        String regex = ".*database system is ready to accept connections.*";
        for (int vezes = 1; vezes <= 3; vezes++) {
            System.out.println("esperando a mensagem " + vezes + " vez(es):");
            int linha = esperar(log, regex, vezes);
            if (linha > 0) System.out.println("  pronto na linha " + linha + ": " + log.get(linha - 1).strip());
        }
    }
}`,
    saida: 'esperando a mensagem 1 vez(es):\n  pronto na linha 4: LOG:  database system is ready to accept connections\nesperando a mensagem 2 vez(es):\n  pronto na linha 11: LOG:  database system is ready to accept connections\nesperando a mensagem 3 vez(es):\n  não ficou pronto: a mensagem apareceu 2 de 3 vezes',
    comentarios:
      'Esperar uma vez só daria o banco como pronto na linha 4, quando o servidor temporário ainda ia rodar scripts e ser desligado. Os testes tentariam conectar no meio da troca e falhariam às vezes, conforme a velocidade da máquina. Esperar três vezes nunca terminaria. O Testcontainers real lê o log enquanto o contêiner roda, em vez de uma lista pronta, e desiste depois do limite de tempo, 60 segundos no PostgreSQL, com uma exceção que inclui o log do contêiner, para mostrar onde a subida travou.',
  },
  bugs: [
    {
      id: 'backend-junior-t6-e05-b01',
      dificuldade: 1,
      sintoma: 'Os testes de integração conectam num PostgreSQL instalado na máquina, e não no contêiner que o Testcontainers subiu.',
      codigo: `public class UrlDoBanco {
    record Conteiner(String host, int portaMapeada) {}

    static String url(Conteiner c) {
        return "jdbc:postgresql://" + c.host() + ":5432/test";
    }

    public static void main(String[] args) {
        Conteiner postgres = new Conteiner("localhost", 49153);
        System.out.println(url(postgres));
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'jdbc:postgresql://localhost:5432/test' },
      correcao: `public class UrlDoBanco {
    record Conteiner(String host, int portaMapeada) {}

    static String url(Conteiner c) {
        return "jdbc:postgresql://" + c.host() + ":" + c.portaMapeada() + "/test";
    }

    public static void main(String[] args) {
        Conteiner postgres = new Conteiner("localhost", 49153);
        System.out.println(url(postgres));
    }
}`,
      saidaCorrigida: 'jdbc:postgresql://localhost:49153/test',
      dica: 'A porta 5432 é a de dentro do contêiner. Qual porta da máquina leva até ela?',
      explicacao: 'O Testcontainers liga a 5432 do contêiner a uma porta aleatória da máquina, e é essa que a aplicação precisa usar. Fixar a 5432 cai em outro banco, se houver um instalado, ou em conexão recusada. O `@ServiceConnection` evita o erro entregando a URL pronta.',
    },
    {
      id: 'backend-junior-t6-e05-b02',
      dificuldade: 2,
      sintoma: 'Às vezes, os primeiros testes falham com conexão recusada, como se o banco ainda estivesse reiniciando quando foram liberados.',
      codigo: `import java.util.List;

public class Espera {
    public static void main(String[] args) {
        List<String> log = List.of(
                "waiting for server to start....",
                "LOG:  database system is ready to accept connections",
                "server stopped",
                "PostgreSQL init process complete; ready for start up.",
                "LOG:  database system is ready to accept connections");
        int vezesEsperadas = 1;
        int vistas = 0;
        for (int i = 0; i < log.size(); i++) {
            if (log.get(i).contains("ready to accept connections") && ++vistas == vezesEsperadas) {
                System.out.println("testes liberados na linha " + (i + 1));
                break;
            }
        }
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'testes liberados na linha 2' },
      correcao: `import java.util.List;

public class Espera {
    public static void main(String[] args) {
        List<String> log = List.of(
                "waiting for server to start....",
                "LOG:  database system is ready to accept connections",
                "server stopped",
                "PostgreSQL init process complete; ready for start up.",
                "LOG:  database system is ready to accept connections");
        int vezesEsperadas = 2;
        int vistas = 0;
        for (int i = 0; i < log.size(); i++) {
            if (log.get(i).contains("ready to accept connections") && ++vistas == vezesEsperadas) {
                System.out.println("testes liberados na linha " + (i + 1));
                break;
            }
        }
    }
}`,
      saidaCorrigida: 'testes liberados na linha 5',
      dica: 'Leia o log até o fim. Depois da primeira mensagem de pronto, o que acontece com o servidor?',
      explicacao: 'Na primeira subida, a imagem do PostgreSQL inicia um servidor temporário, para os scripts de inicialização, e o desliga antes de subir o definitivo. Liberar os testes na primeira mensagem pega o temporário. Por isso o `PostgreSQLContainer` espera a mensagem duas vezes.',
    },
    {
      id: 'backend-junior-t6-e05-b03',
      dificuldade: 3,
      sintoma: 'A checagem do pipeline aprovou a imagem `postgres:9` para os testes, embora a produção use o PostgreSQL 18.',
      codigo: `public class VersaoDaImagem {
    public static void main(String[] args) {
        String producao = "18";
        String teste = "9";
        boolean compativel = teste.compareTo(producao) >= 0;
        System.out.println("postgres:" + teste + (compativel ? " ok para testes" : " é mais antigo que a produção"));
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'postgres:9 ok para testes' },
      correcao: `public class VersaoDaImagem {
    public static void main(String[] args) {
        String producao = "18";
        String teste = "9";
        boolean compativel = Integer.parseInt(teste) >= Integer.parseInt(producao);
        System.out.println("postgres:" + teste + (compativel ? " ok para testes" : " é mais antigo que a produção"));
    }
}`,
      saidaCorrigida: 'postgres:9 é mais antigo que a produção',
      dica: 'Compare "9" e "18" do jeito que um dicionário compararia. E do jeito que um número compararia.',
      explicacao: '`compareTo` de `String` compara caractere por caractere, e `9` vem depois de `1`, então "9" é "maior" que "18". Versões são números, e precisam ser comparadas como números, parte por parte, como o Flyway faz com as migrações.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t6-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que testar os repositórios com PostgreSQL no Testcontainers, em vez do H2 em memória, se a produção usa PostgreSQL?',
      opcoes: [
        'Porque H2 e PostgreSQL diferem em SQL, tipos, índices e funções: o teste precisa rodar no banco que vai rodar em produção',
        'Porque o H2 não funciona com o Spring Boot 4',
        'Porque o Testcontainers é mais rápido que o H2',
        'Porque o H2 não aceita transações',
      ],
      resposta: 0,
      explicacao: 'Um teste que passa no H2 prova que o código funciona no H2. Com o banco real, as diferenças aparecem no teste, e não em produção.',
    },
    {
      id: 'backend-junior-t6-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que precisa estar rodando na máquina para os testes com Testcontainers funcionarem?',
      opcoes: ['O Docker', 'Um PostgreSQL instalado', 'A aplicação em produção', 'Nada além da JVM'],
      resposta: 0,
      explicacao: 'O Testcontainers pede ao Docker que crie os contêineres. O PostgreSQL vem na imagem, sem instalação.',
    },
    {
      id: 'backend-junior-t6-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que o `@ServiceConnection` faz no bean `PostgreSQLContainer`?',
      opcoes: [
        'Faz o Spring Boot ler a URL, o usuário e a senha do contêiner e montar o `DataSource` com eles',
        'Abre uma conexão SSH com o contêiner',
        'Mantém o contêiner rodando depois dos testes',
        'Troca o PostgreSQL pelo H2',
      ],
      resposta: 0,
      explicacao: 'Na aula, a cadeia de erro mostrou o bean `jdbcContainerConnectionDetailsForPostgres`, criado a partir do contêiner, do qual o `dataSource` dependia.',
    },
    {
      id: 'backend-junior-t6-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Todos os testes com Testcontainers falham com "Could not find a valid Docker environment. Please see logs and check configuration". Qual é a causa mais provável?',
      opcoes: [
        'O Docker não está rodando ou não está acessível para o usuário que roda os testes',
        'A imagem do PostgreSQL não existe',
        'O banco demorou mais de 60 segundos para subir',
        'Falta o driver do PostgreSQL',
      ],
      resposta: 0,
      explicacao: 'O erro vem da descoberta do Docker, antes de qualquer imagem ou banco. Iniciar o Docker Desktop resolve na maioria dos casos.',
    },
    {
      id: 'backend-junior-t6-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o Testcontainers liga a porta 5432 do contêiner a uma porta aleatória da máquina, e não à 5432?',
      opcoes: [
        'Para não conflitar com um PostgreSQL já instalado nem com outros testes rodando ao mesmo tempo',
        'Porque a porta 5432 é proibida no Windows',
        'Por segurança, para esconder o banco',
        'Porque o PostgreSQL do contêiner não usa a 5432',
      ],
      resposta: 0,
      explicacao: 'Com portas livres escolhidas na hora, vários contêineres convivem. O `@ServiceConnection` entrega a porta certa ao Spring.',
    },
    {
      id: 'backend-junior-t6-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O `PostgreSQLContainer` espera a mensagem "database system is ready to accept connections" aparecer duas vezes no log. Por quê?',
      opcoes: [
        'Na primeira subida, a imagem oficial inicia um servidor temporário para rodar os scripts de inicialização e depois sobe o definitivo; a primeira mensagem é do temporário',
        'Para ter certeza de que a mensagem não é um erro de digitação',
        'Porque o PostgreSQL sempre reinicia uma vez por segurança',
        'Porque o Testcontainers sobe dois bancos',
      ],
      resposta: 0,
      explicacao: 'Conectar depois da primeira mensagem pegaria o servidor temporário prestes a ser desligado, e o teste falharia de vez em quando.',
    },
    {
      id: 'backend-junior-t6-e05-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dez classes de teste importam a mesma `TestcontainersConfiguration`, sem outras diferenças de configuração. Quantos contêineres do PostgreSQL sobem?',
      opcoes: [
        'Um: o contêiner é um bean do contexto, e o contexto é reaproveitado pelo cache',
        'Dez, um por classe',
        'Um por método de teste',
        'Nenhum, até o primeiro `save`',
      ],
      resposta: 0,
      explicacao: 'O cache de contextos guarda o contexto com o contêiner dentro. Uma variação na configuração de uma classe custaria outro contexto, e outro contêiner.',
    },
    {
      id: 'backend-junior-t6-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Testcontainers 2.0, usado pelo Spring Boot 4.1, qual é o nome completo da classe do contêiner do PostgreSQL?',
      opcoes: [
        '`org.testcontainers.postgresql.PostgreSQLContainer`',
        '`org.testcontainers.containers.PostgreSQLContainer`, a única que existe',
        '`org.springframework.boot.testcontainers.PostgreSQLContainer`',
        '`org.postgresql.PostgreSQLContainer`',
      ],
      resposta: 0,
      explicacao: 'A versão 2 moveu cada módulo para um pacote próprio. A classe em `org.testcontainers.containers` ainda existe, mas está marcada como obsoleta.',
    },
    {
      id: 'backend-junior-t6-e05-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O programa imita uma estratégia de espera com limite de tentativas. Qual é a saída?',
      codigo: `import java.util.function.IntSupplier;

public class Teste {
    static String esperar(IntSupplier saude, int maximo) {
        for (int tentativa = 1; tentativa <= maximo; tentativa++) {
            if (saude.getAsInt() == 200) return "pronto na tentativa " + tentativa;
        }
        return "desistiu depois de " + maximo;
    }

    public static void main(String[] args) {
        int[] chamadas = {0};
        IntSupplier banco = () -> ++chamadas[0] >= 4 ? 200 : 503;
        System.out.println(esperar(banco, 3) + "; " + esperar(banco, 3) + "; chamadas: " + chamadas[0]);
    }
}`,
      opcoes: [
        '`desistiu depois de 3; pronto na tentativa 1; chamadas: 4`',
        '`desistiu depois de 3; desistiu depois de 3; chamadas: 6`',
        '`pronto na tentativa 3; pronto na tentativa 1; chamadas: 4`',
        '`desistiu depois de 3; pronto na tentativa 4; chamadas: 4`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As três primeiras verificações respondem 503, e a primeira espera desiste. O serviço continua subindo: a quarta verificação, primeira da segunda espera, responde 200.',
    },
    {
      id: 'backend-junior-t6-e05-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa conta as mensagens de prontidão num trecho de log do PostgreSQL. Digite a saída exata.',
      codigo: `import java.util.List;

public class Teste {
    public static void main(String[] args) {
        List<String> log = List.of(
                "waiting for server to start....",
                "LOG:  database system is ready to accept connections",
                "server stopped",
                "PostgreSQL init process complete; ready for start up.",
                "LOG:  database system is ready to accept connections");
        int mensagens = 0;
        int prontoNaLinha = -1;
        for (int i = 0; i < log.size(); i++) {
            if (log.get(i).contains("ready to accept connections") && ++mensagens == 2) {
                prontoNaLinha = i + 1;
            }
        }
        System.out.println("mensagens: " + mensagens + ", pronto na linha " + prontoNaLinha);
    }
}`,
      resposta: 'mensagens: 2, pronto na linha 5',
      explicacao: 'A linha 4 diz "ready for start up", e não "ready to accept connections", e não conta. A segunda mensagem está na linha 5.',
    },
    {
      id: 'backend-junior-t6-e05-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o `PostgreSQLContainer` com a configuração padrão são verdadeiras? Escolha três.',
      opcoes: [
        'O banco, o usuário e a senha são `test`',
        'A porta 5432 do contêiner é ligada a uma porta aleatória da máquina',
        'O teste só começa depois de o banco ficar pronto, com limite de 60 segundos',
        'O contêiner usa a porta 5432 da máquina',
        'O contêiner continua rodando depois dos testes, para a próxima execução',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Os padrões estão no código da classe. No fim, o contêiner é parado e apagado, e o Ryuk limpa o que sobrar se a JVM morrer.',
    },
    {
      id: 'backend-junior-t6-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A JVM dos testes é encerrada à força no meio da execução. O que acontece com o contêiner do PostgreSQL?',
      opcoes: [
        'O Ryuk, contêiner auxiliar do Testcontainers, percebe que a JVM sumiu e apaga os contêineres dela',
        'Fica rodando para sempre, até alguém apagar à mão',
        'O Docker apaga todos os contêineres da máquina',
        'O próximo teste reaproveita o mesmo contêiner',
      ],
      resposta: 0,
      explicacao: 'O Ryuk existe justamente para o caso em que o código de limpeza não chega a rodar.',
    },
    {
      id: 'backend-junior-t6-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para que serve uma classe `TestLojaApplication`, em `src/test/java`, com `SpringApplication.from(LojaApplication::main).with(TestcontainersConfiguration.class).run(args)`?',
      opcoes: [
        'Para rodar a aplicação na máquina de desenvolvimento usando os contêineres da configuração de teste, sem instalar o banco',
        'Para rodar todos os testes de uma vez',
        'Para empacotar a aplicação com o PostgreSQL dentro',
        'Para subir a aplicação em produção',
      ],
      resposta: 0,
      explicacao: 'A mesma configuração que serve aos testes sobe o banco para o desenvolvimento. Fica em `src/test/java`, fora do pacote final.',
    },
    {
      id: 'backend-junior-t6-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    static class Conteiner implements AutoCloseable {
        Conteiner() {
            System.out.print("iniciou; ");
        }

        @Override
        public void close() {
            System.out.print("parou; ");
        }
    }

    public static void main(String[] args) {
        try {
            try (Conteiner banco = new Conteiner()) {
                System.out.print("teste; ");
                throw new IllegalStateException("asserção falhou");
            }
        } catch (IllegalStateException e) {
            System.out.println("capturou: " + e.getMessage());
        }
    }
}`,
      opcoes: [
        '`iniciou; teste; parou; capturou: asserção falhou`',
        '`iniciou; teste; capturou: asserção falhou`',
        '`iniciou; teste; capturou: asserção falhou` e depois `parou; `',
        '`teste; parou; capturou: asserção falhou`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `close` roda antes de a exceção sair do `try` com recursos. É a garantia de limpeza que todo recurso de teste, como um contêiner, precisa.',
    },
    {
      id: 'backend-junior-t6-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa suíte saudável, que tipo de teste deve existir em maior número?',
      opcoes: [
        'Testes de unidade, rápidos, que dão a resposta em segundos',
        'Testes de ponta a ponta, que cobrem tudo',
        'Testes com Testcontainers, que usam o banco real',
        'Todos em igual número',
      ],
      resposta: 0,
      explicacao: 'É a base da pirâmide. Os testes de integração, mais lentos, cobrem as junções; os de ponta a ponta, poucos, confirmam os fluxos principais.',
    },
  ],
};

export default episodio;
