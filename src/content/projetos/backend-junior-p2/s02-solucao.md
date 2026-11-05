A solução da etapa 2. Os arquivos abaixo são os novos e os que mudaram; `EstatisticasApplication`, `TransacaoRequest` e o `pom.xml` continuam como na etapa 1. A sessão foi rodada contra a aplicação no ar:

**`Transacao.java`**

```java
package br.com.loja.estatisticas;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record Transacao(BigDecimal valor, OffsetDateTime dataHora) {}
```

**`TransacaoController.java`**

```java
package br.com.loja.estatisticas;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransacaoController {

    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @PostMapping("/transacao")
    @ResponseStatus(HttpStatus.CREATED) //> O status de sucesso fica declarado na rota.
    public void receber(@Valid @RequestBody TransacaoRequest transacao) {
        service.registrar(transacao);
    }

    @DeleteMapping("/transacao")
    public void limpar() {
        service.limpar();
    }
}
```

**`TransacaoInvalidaException.java`**

```java
package br.com.loja.estatisticas;

public class TransacaoInvalidaException extends RuntimeException {

    public TransacaoInvalidaException(String motivo) {
        super(motivo);
    }
}
```

**`TransacaoRepository.java`**

```java
package br.com.loja.estatisticas;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Stream;
import org.springframework.stereotype.Repository;

@Repository
public class TransacaoRepository {

    private final Queue<Transacao> transacoes = new ConcurrentLinkedQueue<>(); //> Inserções e leituras de várias threads, sem trava.

    public void salvar(Transacao transacao) {
        transacoes.add(transacao);
    }

    public Stream<Transacao> todas() {
        return transacoes.stream();
    }

    public void limpar() {
        transacoes.clear();
    }
}
```

**`TransacaoService.java`**

```java
package br.com.loja.estatisticas;

import java.time.OffsetDateTime;
import org.springframework.stereotype.Service;

@Service
public class TransacaoService {

    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    public void registrar(TransacaoRequest pedido) {
        if (pedido.dataHora().isAfter(OffsetDateTime.now())) {
            throw new TransacaoInvalidaException("dataHora no futuro"); //> A regra vale para qualquer ponto de entrada.
        }
        repository.salvar(new Transacao(pedido.valor(), pedido.dataHora()));
    }

    public void limpar() {
        repository.limpar();
    }
}
```

**`TratadorDeErros.java`**

```java
package br.com.loja.estatisticas;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TratadorDeErros {

    @ExceptionHandler({MethodArgumentNotValidException.class, TransacaoInvalidaException.class})
    public ResponseEntity<Void> invalida(Exception e) {
        return ResponseEntity.unprocessableContent().build();
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Void> ilegivel(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().build();
    }
}
```

A sessão real:

```text
> POST /transacao {"valor": 123.45, "dataHora": "2026-10-31T12:34:56.789-03:00"}
< 201
> POST /transacao {"valor": 10.00, "dataHora": "2026-10-31T12:35:10.000-03:00"}
< 201
> POST /transacao {"valor": 50.00, "dataHora": "2099-01-01T00:00:00Z"}
< 422
> DELETE /transacao
< 200
> POST /transacao {"valor": -1, "dataHora": "2026-10-31T12:35:10.000-03:00"}
< 422
```

**Por que assim:**

- O controller ficou só com HTTP: rota, `@Valid` e status. A regra da data está no service, e a exceção de negócio é traduzida pelo mesmo tratador de erros, que agora recebe duas exceções num `@ExceptionHandler` só.
- `Transacao` e `TransacaoRequest` têm os mesmos campos, mas papéis diferentes: um é o contrato da API, o outro é o que o sistema guarda. Se a API ganhar um campo opcional, o repositório não precisa saber.
- `ConcurrentLinkedQueue` aceita inserções simultâneas sem perder elementos, e o `stream()` dela nunca lança `ConcurrentModificationException`: ele percorre um retrato fracamente consistente da fila, suficiente para estatísticas.
- O `limpar` não é atômico em relação a um `salvar` simultâneo: uma transação que chega durante o `DELETE` pode sobreviver. Para este desafio, é aceitável; num sistema financeiro de verdade, o `DELETE` nem existiria.
