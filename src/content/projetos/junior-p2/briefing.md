**De:** financeiro do Estúdio Mangue Digital (uma empresa fictícia)
**Para:** você, desenvolvedor júnior
**Assunto:** a folha de pagamento do mês

Somos sete pessoas, com três tipos de contrato: CLT, PJ e estágio. Até hoje a folha é uma planilha que só uma pessoa entende, e no mês passado um PJ recebeu sem ter mandado a nota fiscal. Queremos o cálculo em código: cada contrato com as suas regras, um holerite por pessoa e um resumo para a diretoria.

A equipe deste mês:

| Pessoa | Contrato | Valor | Detalhe |
|---|---|---|---|
| Marina Costa | CLT | R$ 4.500,00 | 1 dependente |
| Paulo Henrique | CLT | R$ 8.200,00 | 2 dependentes |
| Luiza Prado | CLT | R$ 2.900,00 | sem dependentes |
| Renato Dias | PJ | R$ 9.000,00 | nota emitida |
| Sofia Lemos | PJ | R$ 6.500,00 | nota **não** emitida |
| Caio Ramos | estágio | bolsa de R$ 1.600,00 | 30 horas por semana |
| Bia Nogueira | estágio | bolsa de R$ 1.400,00 | 20 horas por semana |

As regras de cálculo da empresa:

| Contrato | Descontos | Custo para a empresa |
|---|---|---|
| CLT | previdência de 9% do salário; imposto de 15% sobre o que a base passar de R$ 3.000,00, sendo a base o salário menos a previdência e R$ 200,00 por dependente | salário mais 28% de encargos |
| PJ | nenhum; sem nota fiscal do mês, o pagamento fica bloqueado | o valor da nota |
| Estágio | nenhum; a bolsa ganha R$ 220,00 de auxílio-transporte, e a jornada vai de 1 a 30 horas por semana | bolsa mais auxílio |

**Importante:** essas alíquotas são **simplificadas e inventadas** para o projeto. As tabelas reais de previdência e de imposto de renda têm várias faixas progressivas e mudam todo ano; um sistema de folha de verdade lê essas tabelas de uma fonte oficial atualizada, nunca de números fixos no código.

**O que entregar:** os tipos do domínio, o cálculo e um `main` que imprime a folha do mês e uma simulação de reajuste.

> [!PENSE]
> Os três contratos têm dados diferentes e regras diferentes, e a lista de tipos é fechada: a empresa não inventa um contrato novo toda semana. Compare com o acervo da [biblioteca](/projetos/junior-p1), que precisava aceitar tipos novos. A modelagem deveria ser a mesma?

O projeto usa tudo da temporada [Java moderno](/?t=junior-t5): records, tipos selados, switch com padrões e record patterns.
