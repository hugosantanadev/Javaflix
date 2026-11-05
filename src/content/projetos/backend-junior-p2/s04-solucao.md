A solução da etapa 4: dois arquivos de teste, sem mudar nada no código principal. A saída é a do `./mvnw test` real, sem os tempos de execução:

**`test/ApiTest.java`**

```java
package br.com.loja.estatisticas;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

@WebMvcTest({TransacaoController.class, EstatisticaController.class})
class ApiTest {

    @Autowired
    MockMvcTester mvc;

    @MockitoBean //> No Spring Boot 4, o @MockBean não existe mais.
    TransacaoService service;

    @Test
    void transacaoValidaDa201() {
        assertThat(mvc.post().uri("/transacao").contentType(MediaType.APPLICATION_JSON)
                .content("{\"valor\": 10.00, \"dataHora\": \"2026-10-31T11:59:00Z\"}"))
                .hasStatus(201);
        verify(service).registrar(any());
    }

    @Test
    void valorNegativoDa422SemChamarOServico() {
        assertThat(mvc.post().uri("/transacao").contentType(MediaType.APPLICATION_JSON)
                .content("{\"valor\": -1, \"dataHora\": \"2026-10-31T11:59:00Z\"}"))
                .hasStatus(422);
        verify(service, never()).registrar(any()); //> Prova que a validação barrou antes do service.
    }

    @Test
    void dataNoFuturoDa422() {
        doThrow(new TransacaoInvalidaException("dataHora no futuro")).when(service).registrar(any());

        assertThat(mvc.post().uri("/transacao").contentType(MediaType.APPLICATION_JSON)
                .content("{\"valor\": 1, \"dataHora\": \"2099-01-01T00:00:00Z\"}"))
                .hasStatus(422);
    }

    @Test
    void jsonInvalidoDa400() {
        assertThat(mvc.post().uri("/transacao").contentType(MediaType.APPLICATION_JSON)
                .content("{\"valor\": \"dez\"}"))
                .hasStatus(400);
    }

    @Test
    void estatisticaEmJson() {
        when(service.estatistica()).thenReturn(new EstatisticaResponse(2, new BigDecimal("150.50"),
                new BigDecimal("75.25"), new BigDecimal("50.50"), new BigDecimal("100.00")));

        assertThat(mvc.get().uri("/estatistica"))
                .hasStatusOk()
                .bodyJson().isEqualTo("{\"count\":2,\"sum\":150.50,\"avg\":75.25,\"min\":50.50,\"max\":100.00}");
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
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TransacaoServiceTest {

    static final Instant AGORA = Instant.parse("2026-10-31T12:00:00Z");

    TransacaoService service;

    @BeforeEach
    void preparar() {
        Clock fixo = Clock.fixed(AGORA, ZoneOffset.UTC); //> O "agora" do teste nunca muda.
        service = new TransacaoService(new TransacaoRepository(), fixo);
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
        registrar("50.50", 60); //> A fronteira: exatamente 60 segundos entra.
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
    void limparApagaTudo() {
        registrar("10.00", 5);
        service.limpar();

        assertThat(service.estatistica().count()).isZero();
    }
}
```

A sessão real:

```text
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.loja.estatisticas.ApiTest
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.loja.estatisticas.TransacaoServiceTest
[INFO] Tests run: 10, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

**Por que assim:**

- O teste de unidade não sobe Spring: roda em milissegundos e cobre todas as regras de negócio. O `@WebMvcTest` cobre só o que o service não sabe, como status, `@Valid` e JSON. Juntos, rodam em uns 3 segundos.
- O caso de 61 segundos é o que mata a mutação `isBefore` → `isAfter`; o de 60, a mutação contrária. Sem os dois, uma troca de operador passaria pelos testes.
- No `ApiTest`, o service é um mock, então a data no futuro só dá `422` porque o teste manda o mock lançar a exceção. É de propósito: a fatia web testa a **tradução** da exceção, e o teste de unidade, a regra.
- O JSON da estatística é comparado como JSON, com `bodyJson().isEqualTo(...)`, e não como texto: a ordem dos campos e os espaços não quebram o teste.
