Este projeto mostra o Java de hoje, e isso chama atenção: muita gente chega à entrevista de júnior escrevendo Java como em 2010. Records, tipos selados e switch com padrões numa regra de negócio de verdade mostram que você acompanha a linguagem.

Guarde o projeto com um arquivo por tipo, num pacote como `br.com.mangue.folha`, e um README com:

```text
# Folha de pagamento

Calcula a folha de uma equipe com contratos CLT, PJ e estágio:
holerite por pessoa, resumo de custos e simulação de reajuste.

## Modelagem
sealed interface Contrato permits Clt, Pj, Estagio   (records, validados na criação)
sealed interface Pagamento permits Holerite, Bloqueado

## Decisões
- Valores em centavos num long; percentuais arredondados ao centavo.
- Tipos selados: um contrato novo obriga cada switch a tratá-lo.
- PJ sem nota vira Bloqueado, um tipo próprio, e nunca entra nos totais.
- Alíquotas simplificadas, em constantes; não são as tabelas oficiais.
```

O ponto alto para contar numa entrevista é a comparação com a [biblioteca](/projetos/junior-p1): lá, hierarquia aberta e polimorfismo, porque tipos novos entram sem mexer em nada; aqui, hierarquia selada e switch, porque esquecer um caso custa dinheiro. Saber escolher entre as duas, e explicar por quê, é o que separa quem decorou a sintaxe de quem entende design.
