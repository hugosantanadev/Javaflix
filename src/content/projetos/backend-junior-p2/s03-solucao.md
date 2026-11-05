A solução da etapa 3. Primeiro, a regra da janela isolada só com o JDK, com um relógio fixo, para ver as fronteiras sem esperar o tempo passar:

```java executar
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

public class JanelaDeEstatistica {
    record Transacao(BigDecimal valor, OffsetDateTime dataHora) {}
    record Estatistica(long count, BigDecimal sum, BigDecimal avg, BigDecimal min, BigDecimal max) {}

    static Estatistica calcular(List<Transacao> todas, Clock relogio, Duration janela) {
        OffsetDateTime agora = OffsetDateTime.now(relogio);
        OffsetDateTime inicio = agora.minus(janela);
        List<BigDecimal> valores = todas.stream()
                .filter(t -> !t.dataHora().isBefore(inicio) && !t.dataHora().isAfter(agora))
                .map(Transacao::valor)
                .toList();
        if (valores.isEmpty()) {
            return new Estatistica(0, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO);
        }
        BigDecimal soma = valores.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal media = soma.divide(BigDecimal.valueOf(valores.size()), 2, RoundingMode.HALF_EVEN);
        return new Estatistica(valores.size(), soma, media,
                valores.stream().min(BigDecimal::compareTo).orElseThrow(),
                valores.stream().max(BigDecimal::compareTo).orElseThrow());
    }

    public static void main(String[] args) {
        Instant agora = Instant.parse("2026-10-31T12:00:00Z");
        Clock relogio = Clock.fixed(agora, ZoneOffset.UTC);
        List<Transacao> todas = List.of(
                new Transacao(new BigDecimal("100.00"), OffsetDateTime.parse("2026-10-31T11:59:50Z")),
                new Transacao(new BigDecimal("50.50"), OffsetDateTime.parse("2026-10-31T11:59:00Z")),
                new Transacao(new BigDecimal("999.99"), OffsetDateTime.parse("2026-10-31T11:58:59Z")),
                new Transacao(new BigDecimal("7.00"), OffsetDateTime.parse("2026-10-31T09:00:00-03:00"))); //> O mesmo instante que 12:00Z: o próprio "agora".
        System.out.println(calcular(todas, relogio, Duration.ofSeconds(60)));
        System.out.println(calcular(List.of(), relogio, Duration.ofSeconds(60)));
    }
}
```

```saida
Estatistica[count=3, sum=157.50, avg=52.50, min=7.00, max=100.00]
Estatistica[count=0, sum=0, avg=0, min=0, max=0]
```

Na aplicação, o `Clock` vira um bean, e o service usa o mesmo cálculo. Os arquivos novos e alterados:

**`EstatisticaController.java`**

```java
package br.com.loja.estatisticas;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EstatisticaController {

    private final TransacaoService service;

    public EstatisticaController(TransacaoService service) {
        this.service = service;
    }

    @GetMapping("/estatistica")
    public EstatisticaResponse estatistica() {
        return service.estatistica();
    }
}
```

**`EstatisticaResponse.java`**

```java
package br.com.loja.estatisticas;

import java.math.BigDecimal;

public record EstatisticaResponse(long count, BigDecimal sum, BigDecimal avg, BigDecimal min, BigDecimal max) {

    static final EstatisticaResponse VAZIA =
            new EstatisticaResponse(0, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO);
}
```

**`RelogioConfig.java`**

```java
package br.com.loja.estatisticas;

import java.time.Clock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RelogioConfig {

    @Bean
    public Clock relogio() {
        return Clock.systemUTC(); //> No teste, um Clock.fixed toma o lugar deste.
    }
}
```

**`TransacaoService.java`**

```java
package br.com.loja.estatisticas;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Clock;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TransacaoService {

    private static final Duration JANELA = Duration.ofSeconds(60);

    private final TransacaoRepository repository;
    private final Clock relogio;

    public TransacaoService(TransacaoRepository repository, Clock relogio) {
        this.repository = repository;
        this.relogio = relogio;
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
        OffsetDateTime inicio = agora.minus(JANELA);
        List<BigDecimal> valores = repository.todas()
                .filter(t -> !t.dataHora().isBefore(inicio) && !t.dataHora().isAfter(agora)) //> As duas pontas entram na janela.
                .map(Transacao::valor)
                .toList();
        if (valores.isEmpty()) {
            return EstatisticaResponse.VAZIA;
        }
        BigDecimal soma = valores.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal media = soma.divide(BigDecimal.valueOf(valores.size()), 2, RoundingMode.HALF_EVEN); //> Sem escala, 10 ÷ 3 lançaria ArithmeticException.
        BigDecimal minimo = valores.stream().min(BigDecimal::compareTo).orElseThrow();
        BigDecimal maximo = valores.stream().max(BigDecimal::compareTo).orElseThrow();
        return new EstatisticaResponse(valores.size(), soma, media, minimo, maximo);
    }
}
```

A sessão real, com as datas geradas na hora (10, 30, 59 e 120 segundos antes do "agora"):

```text
> GET /estatistica
< 200 {"count":0,"sum":0,"avg":0,"min":0,"max":0}
> POST /transacao {"valor": 100.00, "dataHora": "2026-10-31T20:21:54.458Z"}
< 201
> POST /transacao {"valor": 50.50, "dataHora": "2026-10-31T20:21:34.539Z"}
< 201
> POST /transacao {"valor": 0.01, "dataHora": "2026-10-31T20:21:05.541Z"}
< 201
> POST /transacao {"valor": 999.99, "dataHora": "2026-10-31T20:20:04.543Z"}
< 201
> GET /estatistica
< 200 {"count":3,"sum":150.51,"avg":50.17,"min":0.01,"max":100.00}
> DELETE /transacao
< 200
> GET /estatistica
< 200 {"count":0,"sum":0,"avg":0,"min":0,"max":0}
```

**Por que assim:**

- O `Clock` injetado é o que torna a regra testável: em produção, `Clock.systemUTC()`; no teste da próxima etapa, um `Clock.fixed`. A regra da data no futuro também passou a usá-lo, para que "agora" signifique o mesmo nas duas regras.
- Uma transação "no futuro" de poucos milissegundos é recusada, mas uma de exatamente agora entra na estatística: as duas regras usam o mesmo `agora` e se encaixam sem buraco nem sobreposição.
- A estatística percorre todas as transações guardadas a cada chamada: O(n). Com milhões de transações antigas na fila, cada `GET` fica mais lento. A etapa 5 resolve a parte da memória; resolver o tempo de forma constante exigiria guardar somas por segundo, um desafio extra comum em entrevistas.
- `min` e `max` usam `compareTo`, e não `equals`: em `BigDecimal`, `equals` considera a escala, e `10.0` seria diferente de `10.00`.
