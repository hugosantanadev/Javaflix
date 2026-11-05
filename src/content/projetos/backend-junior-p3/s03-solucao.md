A solução da etapa 3. Os arquivos novos e alterados:

**`application.properties`**

```properties
spring.application.name=carteira
spring.datasource.url=${DB_URL:jdbc:h2:mem:carteira;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH}
spring.datasource.username=${DB_USUARIO:sa}
spring.datasource.password=${DB_SENHA:}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.open-in-view=false
carteira.autorizador.url=${AUTORIZADOR_URL:http://localhost:9090/autorizacao}
carteira.autorizador.tempo-limite=2s
```

**`Autorizador.java`**

```java
package br.com.ipe.carteira;

public interface Autorizador {

    boolean autoriza(NovaTransferencia pedido);
}
```

**`AutorizadorHttp.java`**

```java
package br.com.ipe.carteira;

import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Component
public class AutorizadorHttp implements Autorizador {

    record Resposta(boolean autorizado) {}

    private final RestClient cliente;

    public AutorizadorHttp(@Value("${carteira.autorizador.url}") String url,
                           @Value("${carteira.autorizador.tempo-limite}") Duration limite) {
        JdkClientHttpRequestFactory fabrica = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder().connectTimeout(limite).build());
        fabrica.setReadTimeout(limite); //> Sem isto, um autorizador travado prende a requisição para sempre.
        this.cliente = RestClient.builder().baseUrl(url).requestFactory(fabrica).build();
    }

    @Override
    public boolean autoriza(NovaTransferencia pedido) {
        try {
            Resposta r = cliente.get().retrieve().body(Resposta.class);
            return r != null && r.autorizado();
        } catch (RestClientException e) { //> Tempo esgotado, conexão recusada e 5xx caem aqui.
            throw new AutorizadorIndisponivelException(e);
        }
    }
}
```

**`AutorizadorIndisponivelException.java`**

```java
package br.com.ipe.carteira;

public class AutorizadorIndisponivelException extends RuntimeException {

    public AutorizadorIndisponivelException(Throwable causa) {
        super("autorizador indisponível", causa);
    }
}
```

**`TransferenciaService.java`**

```java
package br.com.ipe.carteira;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferenciaService {

    private final UsuarioRepository usuarios;
    private final TransferenciaRepository transferencias;
    private final Autorizador autorizador;
    private final Clock relogio;

    public TransferenciaService(UsuarioRepository usuarios, TransferenciaRepository transferencias,
                                Autorizador autorizador, Clock relogio) {
        this.usuarios = usuarios;
        this.transferencias = transferencias;
        this.autorizador = autorizador;
        this.relogio = relogio;
    }

    @Transactional
    public TransferenciaResposta transferir(NovaTransferencia pedido) {
        if (pedido.pagador().equals(pedido.recebedor())) {
            throw new RegraDeNegocioException("pagador e recebedor precisam ser diferentes");
        }
        Usuario pagador = buscar(pedido.pagador());
        Usuario recebedor = buscar(pedido.recebedor());
        pagador.debitar(pedido.valor());
        recebedor.creditar(pedido.valor());
        if (!autorizador.autoriza(pedido)) { //> Depois das regras locais: não gasta a chamada externa à toa.
            throw new RegraDeNegocioException("transferência não autorizada");
        }
        Transferencia t = new Transferencia(pagador, recebedor, pedido.valor(),
                OffsetDateTime.now(relogio).truncatedTo(ChronoUnit.MICROS));
        return TransferenciaResposta.de(transferencias.save(t));
    }

    @Transactional(readOnly = true)
    public TransferenciaResposta buscarTransferencia(Long id) {
        return transferencias.findById(id)
                .map(TransferenciaResposta::de)
                .orElseThrow(() -> new NaoEncontradoException("transferência " + id + " não existe"));
    }

    private Usuario buscar(Long id) {
        return usuarios.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("usuário " + id + " não existe"));
    }
}
```

**`TratadorDeErros.java`**

```java
package br.com.ipe.carteira;

import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TratadorDeErros {

    @ExceptionHandler(NaoEncontradoException.class)
    public ProblemDetail naoEncontrado(NaoEncontradoException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(RegraDeNegocioException.class)
    public ProblemDetail regra(RegraDeNegocioException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_CONTENT, e.getMessage());
    }

    @ExceptionHandler(AutorizadorIndisponivelException.class)
    public ProblemDetail indisponivel(AutorizadorIndisponivelException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.SERVICE_UNAVAILABLE, "autorizador indisponível, tente de novo");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail invalida(MethodArgumentNotValidException e) {
        String campos = e.getBindingResult().getFieldErrors().stream()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .sorted()
                .collect(Collectors.joining("; "));
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, campos);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail ilegivel(HttpMessageNotReadableException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "corpo da requisição inválido");
    }
}
```

A sessão real, com um autorizador falso que muda de comportamento a cada bloco (sim, não, lento e erro). O tempo aparece quando passa de 1 segundo:

```text
  (autorizador: sim)
> POST /transferencias {"valor": 100.00, "pagador": 1, "recebedor": 2}
< 201 {"id":1,"valor":100.00,"pagador":1,"recebedor":2,"criadaEm":"2026-10-31T20:31:50.782011Z"}
  (autorizador: nao)
> POST /transferencias {"valor": 50.00, "pagador": 1, "recebedor": 2}
< 422 {"detail":"transferência não autorizada","instance":"/transferencias","status":422,"title":"Unprocessable Content"}
  (autorizador: lento)
> POST /transferencias {"valor": 50.00, "pagador": 1, "recebedor": 2}
< 503 {"detail":"autorizador indisponível, tente de novo","instance":"/transferencias","status":503,"title":"Service Unavailable"}  (2.0 s)
  (autorizador: erro)
> POST /transferencias {"valor": 50.00, "pagador": 1, "recebedor": 2}
< 503 {"detail":"autorizador indisponível, tente de novo","instance":"/transferencias","status":503,"title":"Service Unavailable"}
> GET /usuarios/1
< 200 {"id":1,"nome":"Ana Lima","tipo":"COMUM","saldo":400.00}
> GET /usuarios/2
< 200 {"id":2,"nome":"Bruno Reis","tipo":"COMUM","saldo":150.00}
```

**Por que assim:**

- Só a primeira transferência ficou: o saldo final da Ana é 400.00. Nas outras três, o débito aconteceu na entidade, a exceção saiu do `@Transactional`, e o *rollback* o descartou antes de chegar ao banco.
- O autorizador é chamado depois das regras locais. Uma transferência sem saldo é recusada sem gastar uma chamada de rede, e o autorizador recebe menos carga.
- A chamada externa acontece com a transação aberta e uma conexão do banco presa. Para este volume, é aceitável e mantém o código simples; com muito tráfego, a saída é autorizar antes de abrir a transação e conferir o saldo de novo dentro dela.
- `503` diz ao cliente que o problema é temporário. Ele pode tentar de novo, mas, sem uma chave de idempotência, uma nova tentativa depois de um tempo esgotado pode duplicar uma transferência que o autorizador chegou a aprovar. É o próximo problema que um sistema de pagamentos de verdade resolve.
