**De:** líder técnica da carteira digital do Banco Ipê (uma empresa fictícia)
**Para:** você, backend júnior no time
**Assunto:** o serviço de transferências

Parabéns pela aprovação no desafio das estatísticas. Seu primeiro trabalho no time é o coração da nossa carteira digital: o serviço que move dinheiro entre usuários. Ele é pequeno, mas cada regra aqui vale dinheiro de verdade, então o pedido é por um código em camadas, com banco, migrations e testes.

| Rota | Faz | Responde |
|---|---|---|
| `GET /usuarios/{id}` | consulta o usuário e o saldo | `200` ou `404` |
| `POST /transferencias` | transfere `{"valor": 100.00, "pagador": 1, "recebedor": 2}` | `201` com `Location`, `400`, `404`, `422` ou `503` |
| `GET /transferencias/{id}` | consulta uma transferência | `200` ou `404` |

Regras de negócio:

| Regra | Se violada |
|---|---|
| O valor é positivo, com até duas casas | `400` |
| Pagador e recebedor existem e são diferentes | `404` / `422` |
| Lojistas só recebem, nunca enviam | `422` |
| O pagador tem saldo suficiente | `422` |
| Toda transferência é aprovada pelo **autorizador externo** antes de concluir | `422` se negada, `503` se ele não responder em 2 segundos |
| Depois de concluída, o recebedor é **notificado**; se o notificador falhar, a transferência continua valendo | só registro no log |

Uma transferência é tudo ou nada: se qualquer regra falhar, nenhum saldo muda e nada fica gravado. Os erros seguem o padrão `ProblemDetail` (RFC 9457), com `title`, `status` e `detail`.

**Ambiente:** em produção, PostgreSQL, com as tabelas criadas por migrations do Flyway. Para desenvolver sem Docker, o projeto sobe com H2 em modo PostgreSQL; com Docker, basta apontar `DB_URL` para um PostgreSQL. O autorizador e o notificador são serviços de outros times; as URLs vêm de configuração.

> [!PENSE]
> A transferência chama o autorizador externo no meio da transação. O que acontece com a conexão do banco enquanto o autorizador demora 2 segundos? E por que a notificação, ao contrário da autorização, **não** pode ficar dentro da transação?

O projeto usa as temporadas [SQL](/?t=backend-junior-t3), [Spring Boot](/?t=backend-junior-t4), [Persistência com JPA](/?t=backend-junior-t5), [Testes](/?t=backend-junior-t6) e [Projeto: API de pedidos](/?t=backend-junior-t7).
