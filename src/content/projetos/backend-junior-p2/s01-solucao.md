A solução da etapa 1: quatro arquivos além do `pom.xml`. Ela foi rodada com Spring Boot 4.1.1 e Java 25, e cada requisição da sessão abaixo foi feita de verdade contra a aplicação no ar (`>` é a requisição, `<` é a resposta).

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
            <artifactId>spring-boot-starter-webmvc-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

**`EstatisticasApplication.java`**

```java
package br.com.loja.estatisticas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EstatisticasApplication {

    public static void main(String[] args) {
        SpringApplication.run(EstatisticasApplication.class, args);
    }
}
```

**`TransacaoController.java`**

```java
package br.com.loja.estatisticas;

import jakarta.validation.Valid;
import java.time.OffsetDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransacaoController {

    @PostMapping("/transacao")
    public ResponseEntity<Void> receber(@Valid @RequestBody TransacaoRequest transacao) {
        if (transacao.dataHora().isAfter(OffsetDateTime.now())) { //> Compara instantes, independente do fuso escrito.
            return ResponseEntity.unprocessableContent().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
```

**`TransacaoRequest.java`**

```java
package br.com.loja.estatisticas;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record TransacaoRequest(
        @NotNull @PositiveOrZero BigDecimal valor, //> Zero vale: o pedido só proíbe negativos.
        @NotNull OffsetDateTime dataHora) {}
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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Void> invalida(MethodArgumentNotValidException e) {
        return ResponseEntity.unprocessableContent().build();
    }

    @ExceptionHandler(HttpMessageNotReadableException.class) //> O JSON nem virou objeto: 400.
    public ResponseEntity<Void> ilegivel(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().build();
    }
}
```

A sessão real:

```text
> POST /transacao {"valor": 123.45, "dataHora": "2026-10-31T12:34:56.789-03:00"}
< 201
> POST /transacao {"valor": 0, "dataHora": "2026-10-31T12:35:00Z"}
< 201
> POST /transacao {"valor": -10.00, "dataHora": "2026-10-31T12:34:56.789-03:00"}
< 422
> POST /transacao {"valor": 50.00, "dataHora": "2099-01-01T00:00:00Z"}
< 422
> POST /transacao {"valor": 50.00}
< 422
> POST /transacao {"valor": "cinquenta", "dataHora": "2026-10-31T12:34:56Z"}
< 400
> POST /transacao {"valor": 50.00, "dataHora": 
< 400
```

**Por que assim:**

- `422` e `400` são separados pelo **momento** da falha: o Jackson lança `HttpMessageNotReadableException` antes de existir um objeto; o Bean Validation lança `MethodArgumentNotValidException` depois. Um `@RestControllerAdvice` só com esses dois métodos cobre todos os casos do pedido.
- As respostas de erro não têm corpo porque o pedido não pede. Numa API de verdade, um `ProblemDetail` com a mensagem ajudaria quem consome; aqui, acrescentar algo que não foi pedido pode contar contra numa correção automática.
- `{"valor": 50.00}`, sem `dataHora`, é `422`, e não `400`: o JSON é válido e só falta um campo. É a mesma decisão do `@NotNull`.
- A regra da data no futuro ainda está no controller, e com `OffsetDateTime.now()` direto: dá para testar só esperando o relógio. As duas coisas mudam nas próximas etapas.
