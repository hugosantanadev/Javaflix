A solução final. Os arquivos novos e alterados nesta etapa:

**`pom.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.1.1</version>
    </parent>
    <groupId>br.com.loja</groupId>
    <artifactId>estatisticas</artifactId>
    <version>0.1.0</version>
    <properties>
        <java.version>25</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

**`src/main/resources/application.properties`**

```properties
spring.application.name=estatisticas
estatistica.janela=60s
estatistica.limpeza=10s
management.endpoints.web.exposure.include=health
```

**`EstatisticaProperties.java`**

```java
package br.com.loja.estatisticas;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("estatistica")
public record EstatisticaProperties(Duration janela) {

    public EstatisticaProperties {
        if (janela == null) {
            janela = Duration.ofSeconds(60);
        }
        if (janela.isNegative() || janela.isZero()) { //> Falha na inicialização, não na primeira requisição.
            throw new IllegalArgumentException("estatistica.janela precisa ser positiva");
        }
    }
}
```

**`EstatisticasApplication.java`**

```java
package br.com.loja.estatisticas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ConfigurationPropertiesScan
@EnableScheduling
public class EstatisticasApplication {

    public static void main(String[] args) {
        SpringApplication.run(EstatisticasApplication.class, args);
    }
}
```

**`TransacaoRepository.java`**

```java
package br.com.loja.estatisticas;

import java.time.OffsetDateTime;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Stream;
import org.springframework.stereotype.Repository;

@Repository
public class TransacaoRepository {

    private final Queue<Transacao> transacoes = new ConcurrentLinkedQueue<>();

    public void salvar(Transacao transacao) {
        transacoes.add(transacao);
    }

    public Stream<Transacao> todas() {
        return transacoes.stream();
    }

    public void limpar() {
        transacoes.clear();
    }

    public int removerAntesDe(OffsetDateTime limite) {
        int antes = transacoes.size();
        transacoes.removeIf(t -> t.dataHora().isBefore(limite)); //> Seguro na ConcurrentLinkedQueue, mesmo com inserções simultâneas.
        return antes - transacoes.size();
    }
}
```

**`TransacaoService.java`**

```java
package br.com.loja.estatisticas;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.time.OffsetDateTime;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TransacaoService {

    private static final Logger log = LoggerFactory.getLogger(TransacaoService.class);

    private final TransacaoRepository repository;
    private final Clock relogio;
    private final EstatisticaProperties propriedades;

    public TransacaoService(TransacaoRepository repository, Clock relogio, EstatisticaProperties propriedades) {
        this.repository = repository;
        this.relogio = relogio;
        this.propriedades = propriedades;
    }

    public void registrar(TransacaoRequest pedido) {
        if (pedido.dataHora().isAfter(OffsetDateTime.now(relogio))) {
            throw new TransacaoInvalidaException("dataHora no futuro");
        }
        repository.salvar(new Transacao(pedido.valor(), pedido.dataHora()));
    }

    public void limpar() {
        repository.limpar();
    }

    public EstatisticaResponse estatistica() {
        OffsetDateTime agora = OffsetDateTime.now(relogio);
        OffsetDateTime inicio = agora.minus(propriedades.janela());
        List<BigDecimal> valores = repository.todas()
                .filter(t -> !t.dataHora().isBefore(inicio) && !t.dataHora().isAfter(agora))
                .map(Transacao::valor)
                .toList();
        if (valores.isEmpty()) {
            return EstatisticaResponse.VAZIA;
        }
        BigDecimal soma = valores.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal media = soma.divide(BigDecimal.valueOf(valores.size()), 2, RoundingMode.HALF_EVEN);
        BigDecimal minimo = valores.stream().min(BigDecimal::compareTo).orElseThrow();
        BigDecimal maximo = valores.stream().max(BigDecimal::compareTo).orElseThrow();
        return new EstatisticaResponse(valores.size(), soma, media, minimo, maximo);
    }

    @Scheduled(fixedDelayString = "${estatistica.limpeza}") //> fixedDelay: a próxima começa depois que esta termina.
    public void removerAntigas() {
        int removidas = repository.removerAntesDe(OffsetDateTime.now(relogio).minus(propriedades.janela()));
        if (removidas > 0) {
            log.info("removidas {} transações fora da janela", removidas);
        }
    }
}
```

**`test/TransacaoServiceTest.java`**

```java
package br.com.loja.estatisticas;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TransacaoServiceTest {

    static final Instant AGORA = Instant.parse("2026-10-31T12:00:00Z");

    TransacaoRepository repository;
    TransacaoService service;

    @BeforeEach
    void preparar() {
        Clock fixo = Clock.fixed(AGORA, ZoneOffset.UTC);
        repository = new TransacaoRepository();
        service = new TransacaoService(repository, fixo, new EstatisticaProperties(Duration.ofSeconds(60)));
    }

    void registrar(String valor, long segundosAtras) {
        OffsetDateTime quando = OffsetDateTime.ofInstant(AGORA.minusSeconds(segundosAtras), ZoneOffset.UTC);
        service.registrar(new TransacaoRequest(new BigDecimal(valor), quando));
    }

    @Test
    void semTransacoesTudoZero() {
        assertThat(service.estatistica()).isEqualTo(EstatisticaResponse.VAZIA);
    }

    @Test
    void contaSoOsUltimos60Segundos() {
        registrar("100.00", 10);
        registrar("50.50", 60);
        registrar("999.99", 61);

        EstatisticaResponse e = service.estatistica();

        assertThat(e.count()).isEqualTo(2);
        assertThat(e.sum()).isEqualByComparingTo("150.50");
        assertThat(e.min()).isEqualByComparingTo("50.50");
        assertThat(e.max()).isEqualByComparingTo("100.00");
    }

    @Test
    void mediaComDuasCasasArredondandoParaOPar() {
        registrar("0.01", 1);
        registrar("0.02", 2);

        assertThat(service.estatistica().avg()).isEqualByComparingTo("0.02");
    }

    @Test
    void transacaoNoFuturoERecusada() {
        OffsetDateTime futuro = OffsetDateTime.ofInstant(AGORA.plusSeconds(1), ZoneOffset.UTC);

        assertThatThrownBy(() -> service.registrar(new TransacaoRequest(BigDecimal.ONE, futuro)))
                .isInstanceOf(TransacaoInvalidaException.class);
        assertThat(service.estatistica().count()).isZero();
    }

    @Test
    void limpezaAgendadaRemoveSoAsAntigas() {
        registrar("10.00", 5);
        registrar("20.00", 61);

        service.removerAntigas();

        assertThat(repository.todas()).extracting(Transacao::valor).containsExactly(new BigDecimal("10.00"));
    }

    @Test
    void janelaPrecisaSerPositiva() {
        assertThatThrownBy(() -> new EstatisticaProperties(Duration.ZERO))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void limparApagaTudo() {
        registrar("10.00", 5);
        service.limpar();

        assertThat(service.estatistica().count()).isZero();
    }
}
```

Os testes, com os dois casos novos:

```text
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.loja.estatisticas.ApiTest
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.loja.estatisticas.TransacaoServiceTest
[INFO] Tests run: 12, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

A sessão real, com a aplicação iniciada com `--estatistica.janela=5s` e `--estatistica.limpeza=1s` e um padrão de log simples (`[log]` marca a linha do log). Entre as duas estatísticas, 3,5 segundos de espera:

```text
> GET /actuator/health
< 200 {"groups":["liveness","readiness"],"status":"UP"}
> POST /transacao {"valor": 10.00, "dataHora": "2026-10-31T20:22:09.161Z"}
< 201
> POST /transacao {"valor": 20.00, "dataHora": "2026-10-31T20:22:07.230Z"}
< 201
> GET /estatistica
< 200 {"count":2,"sum":30.00,"avg":15.00,"min":10.00,"max":20.00}
[log]removidas 1 transações fora da janela
> GET /estatistica
< 200 {"count":1,"sum":10.00,"avg":10.00,"min":10.00,"max":10.00}
```

**Por que assim:**

- A janela é validada no construtor do record: com `estatistica.janela=0s`, a aplicação nem sobe. Errar uma configuração e descobrir no deploy é muito melhor do que descobrir quando o painel antifraude mostrar zero.
- A limpeza não muda nenhuma resposta da API, só a memória: a estatística já ignorava as antigas. Por isso ela pode rodar a cada 10 segundos sem pressa, e o teste dela confere o repositório, não a rota.
- O Actuator expõe só o `health`. Endpoints como `env` e `beans` mostram configuração e estrutura interna, e não devem ficar abertos numa API pública.
- O que fica de fora, de propósito: persistência (o pedido proíbe banco), autenticação e limite de requisições por cliente. Vale citá-los no README como próximos passos; mostra que você sabe o que um serviço de verdade precisaria.
