**De:** coordenação de produto da Cooperativa Vale Verde (uma empresa fictícia)
**Para:** você, estagiário do time de canais
**Assunto:** protótipo do caixa eletrônico

Antes de contratar o software dos caixas de verdade, queremos testar o fluxo com alguns associados num protótipo que roda no terminal. Não precisa de tela bonita nem de banco de dados: precisa acertar as contas e não quebrar quando alguém digitar errado. O associado de teste começa com **R$ 1234,05** de saldo.

As regras de negócio que o protótipo precisa seguir:

| Regra | Detalhe |
|---|---|
| Depósito | valor inteiro em reais, de R$ 1 a R$ 10000 |
| Saque | múltiplo de 10; o caixa tem notas de 100, 50, 20 e 10 e entrega o menor número de notas |
| Tarifa | os três primeiros saques do dia são grátis; do quarto em diante, R$ 2,50 por saque |
| Limite | no máximo R$ 1000 em saques por dia |
| Extrato | todas as movimentações da sessão, na ordem, com o saldo no fim |
| Robustez | letras no lugar de números geram um aviso, nunca um erro |

**O que entregar:** um único arquivo `Caixa.java`, que roda com `java Caixa.java`, sem nenhuma biblioteca além do JDK.

**Fora do escopo:** senha, várias contas e salvar os dados em arquivo. Ficam para outros projetos.

> [!PENSE]
> Antes de abrir a IDE, leia as regras de novo e anote: que informações o programa precisa lembrar enquanto roda? Cada uma vai virar uma variável. Compare a sua lista com a das etapas.

O projeto tem cinco etapas, e cada uma termina com um programa que funciona. Faça na ordem, rode depois de cada mudança pequena e só confira a solução de referência depois de marcar os critérios de aceite. Tudo o que você precisa saber está nas temporadas do Estagiário até [Laços](/?t=estagiario-t4); o que for novo, como o `Scanner`, vem explicado na etapa.
