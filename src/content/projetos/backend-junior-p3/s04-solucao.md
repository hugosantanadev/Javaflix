A solução da etapa 4. Primeiro, a ideia do "depois do commit" só com o JDK: as ações registradas durante a transação só rodam se ela terminar bem.

```java executar
import java.util.ArrayList;
import java.util.List;

public class DepoisDoCommit {
    static class Transacao {
        private final List<Runnable> depoisDoCommit = new ArrayList<>();

        void registrar(Runnable acao) {
            depoisDoCommit.add(acao);
        }

        void executar(String nome, Runnable trabalho) {
            try {
                trabalho.run();
                System.out.println(nome + ": commit");
                depoisDoCommit.forEach(acao -> { //> Só depois do commit; num rollback, a lista é descartada.
                    try {
                        acao.run();
                    } catch (RuntimeException e) {
                        System.out.println("  aviso falhou (" + e.getMessage() + "), transferência mantida");
                    }
                });
            } catch (RuntimeException e) {
                System.out.println(nome + ": rollback (" + e.getMessage() + "), nenhum aviso");
            } finally {
                depoisDoCommit.clear();
            }
        }
    }

    public static void main(String[] args) {
        Transacao tx = new Transacao();
        tx.executar("transferência 1", () -> tx.registrar(() -> System.out.println("  aviso enviado para Bruno")));
        tx.executar("transferência 2", () -> tx.registrar(() -> {
            throw new IllegalStateException("notificador fora do ar");
        }));
        tx.executar("transferência 3", () -> {
            tx.registrar(() -> System.out.println("  aviso enviado para Bruno"));
            throw new IllegalStateException("transferência não autorizada");
        });
    }
}
```

```saida
transferência 1: commit
  aviso enviado para Bruno
transferência 2: commit
  aviso falhou (notificador fora do ar), transferência mantida
transferência 3: rollback (transferência não autorizada), nenhum aviso
```

Na aplicação, o Spring faz esse papel com o `@TransactionalEventListener`. Os arquivos novos e alterados:

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
carteira.notificador.url=${NOTIFICADOR_URL:http://localhost:9091/notificacao}
carteira.notificador.tempo-limite=2s
```

**`AvisoDeTransferencia.java`**

```java
package br.com.ipe.carteira;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class AvisoDeTransferencia {

    private static final Logger log = LoggerFactory.getLogger(AvisoDeTransferencia.class);

    private final Notificador notificador;

    public AvisoDeTransferencia(Notificador notificador) {
        this.notificador = notificador;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT) //> Num rollback, o evento é descartado.
    public void aoConcluir(TransferenciaRealizada evento) {
        try {
            notificador.notificar(evento);
        } catch (RuntimeException e) { //> A falha do aviso não volta para a transferência.
            log.warn("notificação da transferência {} falhou: {}", evento.transferencia(), e.getMessage());
        }
    }
}
```

**`Notificador.java`**

```java
package br.com.ipe.carteira;

public interface Notificador {

    void notificar(TransferenciaRealizada evento);
}
```

**`NotificadorHttp.java`**

```java
package br.com.ipe.carteira;

import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class NotificadorHttp implements Notificador {

    record Mensagem(Long usuario, String texto) {}

    private final RestClient cliente;

    public NotificadorHttp(@Value("${carteira.notificador.url}") String url,
                           @Value("${carteira.notificador.tempo-limite}") Duration limite) {
        JdkClientHttpRequestFactory fabrica = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder().connectTimeout(limite).build());
        fabrica.setReadTimeout(limite);
        this.cliente = RestClient.builder().baseUrl(url).requestFactory(fabrica).build();
    }

    @Override
    public void notificar(TransferenciaRealizada e) {
        cliente.post()
                .contentType(MediaType.APPLICATION_JSON)
                .body(new Mensagem(e.recebedor(), "você recebeu " + e.valor() + " de " + e.pagador()))
                .retrieve()
                .toBodilessEntity();
    }
}
```

**`TransferenciaRealizada.java`**

```java
package br.com.ipe.carteira;

import java.math.BigDecimal;

public record TransferenciaRealizada(Long transferencia, Long recebedor, String pagador, BigDecimal valor) {}
```

**`TransferenciaService.java`**

```java
package br.com.ipe.carteira;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferenciaService {

    private final UsuarioRepository usuarios;
    private final TransferenciaRepository transferencias;
    private final Autorizador autorizador;
    private final ApplicationEventPublisher eventos;
    private final Clock relogio;

    public TransferenciaService(UsuarioRepository usuarios, TransferenciaRepository transferencias,
                                Autorizador autorizador, ApplicationEventPublisher eventos, Clock relogio) {
        this.usuarios = usuarios;
        this.transferencias = transferencias;
        this.autorizador = autorizador;
        this.eventos = eventos;
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
        if (!autorizador.autoriza(pedido)) {
            throw new RegraDeNegocioException("transferência não autorizada");
        }
        Transferencia t = new Transferencia(pagador, recebedor, pedido.valor(),
                OffsetDateTime.now(relogio).truncatedTo(ChronoUnit.MICROS));
        Transferencia salva = transferencias.save(t);
        eventos.publishEvent(new TransferenciaRealizada(salva.getId(), recebedor.getId(), pagador.getNome(), salva.getValor())); //> Publica dados prontos, não a entidade.
        return TransferenciaResposta.de(salva);
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

A sessão real. As linhas com `[notificador recebeu]` são do notificador falso, e `[log]` marca o log da aplicação:

```text
  (notificador: ok)
> POST /transferencias {"valor": 100.00, "pagador": 1, "recebedor": 2}
  [notificador recebeu] {"usuario":2,"texto":"você recebeu 100.00 de Ana Lima"} -> 204
< 201 {"id":1,"valor":100.00,"pagador":1,"recebedor":2,"criadaEm":"2026-10-31T20:32:01.775635Z"}
  (notificador: fora)
> POST /transferencias {"valor": 20.00, "pagador": 2, "recebedor": 1}
  [notificador recebeu] {"usuario":1,"texto":"você recebeu 20.00 de Bruno Reis"} -> 503
[log]notificação da transferência 2 falhou: 503 Service Unavailable: [no body]
< 201 {"id":2,"valor":20.00,"pagador":2,"recebedor":1,"criadaEm":"2026-10-31T20:32:01.84065Z"}
  (autorizador: nao)
> POST /transferencias {"valor": 5.00, "pagador": 1, "recebedor": 2}
< 422 {"detail":"transferência não autorizada","instance":"/transferencias","status":422,"title":"Unprocessable Content"}
> GET /usuarios/1
< 200 {"id":1,"nome":"Ana Lima","tipo":"COMUM","saldo":420.00}
> GET /usuarios/2
< 200 {"id":2,"nome":"Bruno Reis","tipo":"COMUM","saldo":130.00}
```

**Por que assim:**

- O aviso sai antes da resposta `201` chegar ao cliente: o `AFTER_COMMIT` roda na mesma thread, logo depois do *commit*. Um notificador lento atrasa a resposta em até 2 segundos; com `@Async` no listener, o aviso iria para outra thread e a resposta sairia na hora.
- A transferência negada não gerou aviso, e a transferência com o notificador fora continuou valendo: os saldos finais são 420.00 e 130.00. São as duas metades da regra do pedido.
- Se a aplicação cair entre o *commit* e o aviso, o aviso se perde. A solução clássica é a *outbox*: gravar o aviso numa tabela, na mesma transação, e um processo separado enviá-lo e marcá-lo como enviado. É assunto do cargo Pleno.
