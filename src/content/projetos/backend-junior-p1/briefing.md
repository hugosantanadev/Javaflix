**De:** tech lead do time de plataforma da Loja Paralela (uma empresa fictícia)
**Para:** você, backend júnior recém-chegado
**Assunto:** seu primeiro serviço

Por aqui, todo mundo usa Spring Boot. Antes de você encostar nele, tenho um pedido: construa uma API de tarefas usando **só o JDK**, sem framework nenhum. A ideia é você ver de perto tudo o que o Spring faz por você, para entender o que acontece quando algo der errado lá dentro. Ela vai servir de quadro de tarefas interno do time.

| Rota | Faz | Responde |
|---|---|---|
| `GET /saude` | diz se o serviço está de pé | `200` |
| `GET /tarefas` | lista, com filtro por situação e paginação | `200` ou `400` |
| `POST /tarefas` | cria uma tarefa a partir de `{"titulo": "..."}` | `201` com `Location`, ou um erro |
| `GET /tarefas/{id}` | busca uma tarefa | `200` ou `404` |
| `PUT /tarefas/{id}` | troca título e situação | `200`, `404` ou `422` |
| `DELETE /tarefas/{id}` | apaga | `204` ou `404` |

Toda tarefa tem `id`, `titulo` (obrigatório, até 100 caracteres) e `concluida`. Todo erro volta como `{"erro": "mensagem"}`, com `"campo"` quando o problema é num campo específico, e com o status certo: `400`, `404`, `405`, `413`, `415`, `422` ou `500`.

Três cuidados de segurança que não são opcionais, nem num serviço interno:

- a API escuta só em `127.0.0.1`, nunca na rede inteira;
- o corpo de uma requisição tem limite de tamanho;
- nenhuma resposta mostra stack trace ou detalhe interno.

**O que entregar:** um repositório Git, com um commit por etapa, contendo a API, um `Main` que sobe na porta 8080, um teste automatizado e um README com exemplos de `curl`. Os dados ficam em memória: banco é assunto de outro projeto.

> [!PENSE]
> Quem já usou Spring sabe que um `@GetMapping` resolve uma rota numa linha. Aqui, quem lê a URL, escolhe o método, converte o JSON e escreve o status é você. Antes de começar, liste as coisas que um framework web faz e que você vai ter de fazer à mão.

O projeto usa as temporadas [Ferramentas do dia a dia](/?t=backend-junior-t1) e [HTTP e APIs](/?t=backend-junior-t2). Do Pleno, vêm as coleções, os lambdas, os streams e as exceções.
