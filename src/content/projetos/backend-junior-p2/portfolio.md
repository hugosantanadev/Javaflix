Este é, quase literalmente, o desafio técnico que vários bancos e empresas de pagamento passam para vagas de backend júnior. Ter uma versão bem feita no GitHub serve para duas coisas: mostrar a quem recruta que você domina o básico de Spring Boot, e chegar ao próximo desafio parecido já sabendo onde estão as armadilhas (a fronteira dos 60 segundos, o `422` contra o `400`, o relógio nos testes).

Publique o repositório com um commit por etapa e um README assim:

```text
# API de estatísticas de transações

API REST em Java 25 com Spring Boot 4.1 que recebe transações e responde as
estatísticas (contagem, soma, média, mínimo e máximo) das do último minuto.
Tudo em memória, sem banco, como pede o desafio.

## Rodar
./mvnw spring-boot:run
./mvnw test          (12 testes: service sem Spring e rotas com @WebMvcTest)

## Rotas
curl -i -X POST localhost:8080/transacao -H "Content-Type: application/json" \
     -d '{"valor": 123.45, "dataHora": "2026-10-31T12:34:56.789-03:00"}'
curl -i -X DELETE localhost:8080/transacao
curl -s localhost:8080/estatistica
curl -s localhost:8080/actuator/health

## Configuração
estatistica.janela=60s    (janela das estatísticas)
estatistica.limpeza=10s   (intervalo da limpeza das transações antigas)

## Decisões
- O relógio é um bean (java.time.Clock): os testes fixam o "agora" e cobrem
  as fronteiras de 60 e 61 segundos sem esperar.
- Valores em BigDecimal; média com duas casas e HALF_EVEN.
- 400 para JSON ilegível, 422 para regras violadas (negativo, futuro, ausente).
- ConcurrentLinkedQueue para várias requisições simultâneas, com limpeza
  agendada para a memória não crescer para sempre.

## Próximos passos
Persistência, autenticação e limite de requisições por cliente.
```

Em entrevista, as perguntas mais prováveis sobre este projeto são: "como você testou o tempo?", "o que acontece com mil requisições ao mesmo tempo?" e "como deixaria o `GET /estatistica` mais rápido com milhões de transações?". As duas primeiras você responde com o código; a terceira, com a ideia de guardar somas por segundo, que o "Por que assim" da etapa 3 menciona.

O próximo projeto é a [API em camadas com banco](/projetos/backend-junior-p3): a mesma organização, agora com JPA, Flyway, transações e testes de integração.
