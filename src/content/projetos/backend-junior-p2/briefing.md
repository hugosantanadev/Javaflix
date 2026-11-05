**De:** coordenação de tecnologia do Banco Ipê (uma empresa fictícia)
**Para:** candidatas e candidatos à vaga de desenvolvedor backend júnior
**Assunto:** desafio técnico

Obrigado pelo interesse na vaga. Antes da entrevista técnica, pedimos que você construa uma pequena API. Ela recebe as transações feitas pelos clientes e responde, a qualquer momento, as estatísticas das transações do **último minuto**. É o mesmo tipo de serviço que alimenta o nosso painel antifraude.

| Rota | Faz | Responde |
|---|---|---|
| `POST /transacao` | recebe `{"valor": 123.45, "dataHora": "2026-10-31T12:34:56.789-03:00"}` | `201` sem corpo, `422` ou `400` |
| `DELETE /transacao` | apaga todas as transações | `200` sem corpo |
| `GET /estatistica` | estatísticas das transações dos últimos 60 segundos | `200` com `count`, `sum`, `avg`, `min` e `max` |

Regras de negócio:

| Situação | Resposta |
|---|---|
| Transação válida | `201` |
| `valor` ou `dataHora` ausente, `valor` negativo, `dataHora` no futuro | `422`, e nada é guardado |
| JSON que não dá para ler (texto onde deveria vir número, chave sem valor) | `400` |
| Nenhuma transação no último minuto | estatísticas todas com zero |

Restrições, que fazem parte da avaliação:

- **não use banco de dados nem cache externo**: tudo fica em memória;
- a API recebe e devolve só JSON;
- o código precisa de testes automatizados, e eles precisam rodar com um comando só;
- o projeto precisa estar num repositório Git público, com um README que diga como rodar.

**O que avaliamos:** se as regras foram cumpridas exatamente, a organização do código em camadas, os testes, o cuidado com concorrência (várias requisições ao mesmo tempo) e a clareza do README. Não avaliamos visual, autenticação nem desempenho extremo.

> [!PENSE]
> Antes de abrir o Spring Initializr, responda no papel: "as transações dos últimos 60 segundos" depende de quê? Como você vai testar uma regra que muda de resultado a cada segundo que passa, sem colocar `Thread.sleep(60_000)` nos testes?

O projeto usa as temporadas [HTTP e APIs](/?t=backend-junior-t2), [Spring Boot](/?t=backend-junior-t4) e [Testes](/?t=backend-junior-t6). Do Pleno, vêm os streams e o `BigDecimal`; do Sênior, a concorrência.
