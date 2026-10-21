Uma API sem framework é um projeto raro no portfólio de um júnior, e justamente por isso chama atenção: mostra que você entende HTTP, e não só anotações. Em entrevista, perguntas como "qual a diferença entre 400 e 422?", "o que é idempotência?" ou "por que limitar o tamanho do corpo?" você responde com o seu próprio código.

Publique o repositório no GitHub com o histórico de commits, um por etapa, e um README assim:

```text
# API de tarefas sem framework

API REST em Java 25 usando só o JDK (com.sun.net.httpserver), para entender
o que um framework web faz por baixo.

## Rodar
Execute Main (porta 8080) e TesteDaApi (sobe numa porta livre e confere 10 cenários).

## Rotas
curl -i http://127.0.0.1:8080/saude
curl -i -X POST -H "Content-Type: application/json" -d '{"titulo":"Estudar HTTP"}' http://127.0.0.1:8080/tarefas
curl -i "http://127.0.0.1:8080/tarefas?concluida=false&pagina=1&tamanho=10"
curl -i -X PUT -H "Content-Type: application/json" -d '{"titulo":"Estudar HTTP","concluida":true}' http://127.0.0.1:8080/tarefas/1
curl -i -X DELETE http://127.0.0.1:8080/tarefas/1

## Decisões
- Erros centralizados: cada problema vira uma exceção com status; 500 nunca expõe detalhes.
- Segurança: só loopback, corpo limitado a 10.000 bytes, JSON sempre escapado, página com teto.
- Concorrência: ConcurrentHashMap, AtomicLong e uma thread virtual por requisição.
```

O próximo passo natural é o [monolito com Spring Boot](/projetos/backend-junior-p2). Quando terminá-lo, escreva no README dos dois uma comparação curta: quantas linhas cada um tem, o que o framework resolveu e o que continuou sendo trabalho seu.
