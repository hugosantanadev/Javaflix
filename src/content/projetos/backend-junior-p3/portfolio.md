Uma carteira digital com transferências é o projeto de portfólio mais pedido em vagas de backend júnior no Brasil, porque concentra o que mais cai em entrevista: camadas, transação, regra de negócio, integração com outro serviço e testes. O diferencial do seu não é ter as rotas, que todo mundo tem; é conseguir explicar o *rollback*, o tempo limite e o aviso depois do *commit*.

Publique o repositório com um commit por etapa e um README assim:

```text
# Carteira digital: transferências

API REST em Java 25 com Spring Boot 4.1, JPA e Flyway: usuários comuns e
lojistas, transferências com saldo, autorizador externo e notificação.

## Rodar
./mvnw spring-boot:run                       (H2 em modo PostgreSQL, sem Docker)
DB_URL=jdbc:postgresql://localhost:5432/carteira DB_USUARIO=... DB_SENHA=... ./mvnw spring-boot:run
./mvnw test                                  (10 testes: unidade, JPA e integração)

## Rotas
curl -s localhost:8080/usuarios/1
curl -i -X POST localhost:8080/transferencias -H "Content-Type: application/json" \
     -d '{"valor": 100.00, "pagador": 1, "recebedor": 2}'

## Decisões
- Transferência é tudo ou nada: @Transactional no service; regras na entidade.
- Autorizador com tempo limite de 2 s: negado é 422, indisponível é 503.
- Notificação com @TransactionalEventListener(AFTER_COMMIT): falha não desfaz
  a transferência, e transferência desfeita não notifica.
- Erros em ProblemDetail (RFC 9457); dinheiro em BigDecimal e numeric(12,2).

## Próximos passos
- Trava otimista como 409; chave de idempotência no POST.
- Outbox para garantir a notificação; Testcontainers com PostgreSQL nos testes.
```

Perguntas prováveis em entrevista: "o que acontece se o autorizador cair?", "e se a notificação falhar?", "como você evita transferir duas vezes se o cliente repetir o pedido?" e "por que H2 nos testes não basta?". As três primeiras você responde com o código; a última, com a seção de próximos passos.

Com este projeto, a trilha de projetos do Backend Júnior está completa. O cargo Pleno começa com [system design](/projetos/backend-pleno-p1): o mesmo cuidado, agora com várias instâncias, cache e filas.
