# Como gerar um projeto prático

A aba **Projetos** tem sistemas feitos do zero, do jeito que as vagas pedem. Cada projeto chega como um chamado de empresa, é dividido em etapas com critérios de aceite e termina com uma solução de referência verificada. A referência de qualidade é `src/content/projetos/estagiario-p1`.

## 1. Catálogo

`src/content/projetos.ts` lista todos os projetos (`ProjetoMeta`), inclusive os que ainda não foram escritos, que aparecem como "em breve". Não mude o catálogo sem pedir.

- `id` é `<cargo>-p<n>`, com `n` seguindo 1, 2, 3 dentro do cargo.
- `requisitos` são temporadas do próprio cargo que o projeto usa. O projeto abre quando elas estão concluídas, o cargo está liberado e o projeto anterior do mesmo cargo terminou. Modo livre ignora tudo.
- `resumo` com até 180 caracteres; `pratica` com 3 a 6 itens curtos.

A progressão do backend é a pedida pelo mercado: API sem framework, monolito, camadas e, no pleno, system design.

## 2. Arquivos

```text
src/content/projetos/<id>/
  index.ts            ProjetoConteudo: etapas com título, objetivo, critérios e dica
  briefing.md         o pedido
  portfolio.md        como mostrar o projeto
  s01.md              instruções da etapa 1
  s01-solucao.md      solução de referência da etapa 1
  ...
```

## 3. O pedido (`briefing.md`)

Um chamado de uma empresa **fictícia**: quem pede, para quê, as regras de negócio numa tabela, o que entregar e o que fica fora do escopo. Termine com um `> [!PENSE]` que faça a pessoa planejar antes de abrir a IDE e com links para as temporadas que o projeto usa.

## 4. Etapas

De 4 a 7. Cada etapa termina com um programa que roda e é cumulativa: a solução da etapa 3 contém tudo das etapas 1 e 2.

**Instruções (`sNN.md`)**, no mínimo 400 caracteres:

- explique só o que é **novo** para o cargo, com link para a temporada que aprofunda (`/?t=<temporada>` ou `/assistir/<episodio>`);
- diga o que construir numa lista numerada, com as mensagens exatas que o programa imprime;
- mostre uma sessão de exemplo em bloco `text`, marcando com `>` o que a pessoa digita;
- **não** entregue o código da solução; trechos de "receita" (uma API nova, um formato de método) podem aparecer;
- use os destaques das aulas onde couberem: `[!MATEMATICA]` com conta resolvida, `[!IA]` com um pedido que cuida de segurança e manutenção, `[!ANTES]`, `[!BOAPRATICA]` e `[!PENSE]`. Figuras seguem as regras de `GERAR_TEMPORADA.md`.

**Critérios de aceite** (de 3 a 6): verificáveis, com valores exatos ("um saque de R$ 180 entrega `1x100 1x50 1x20 1x10`"), na ordem em que a pessoa vai testar. Inclua um critério de qualidade de código quando a etapa ensinar um ("a formatação existe num lugar só").

**Dica:** por onde começar, sem entregar a solução.

**Solução (`sNN-solucao.md`):**

- uma frase dizendo com que entrada a solução foi rodada;
- o programa completo num bloco `java executar`, seguido de um bloco `entrada` (o que a pessoa digitaria, passado no stdin pelo verify) e do bloco `saida` real;
- notas na margem (`//> texto` no fim da linha) em até quatro linhas importantes;
- **Por que assim:** de 3 a 5 itens que explicam as decisões, discutem alternativas e apontam limitações. Uma solução de referência que admite um defeito ensina mais do que uma que finge ser perfeita.

Escreva cada versão do programa no scratchpad, rode com a entrada de teste e copie código, entrada e saída reais para o Markdown com um script, nunca à mão. Programas que leem do teclado devem imprimir as perguntas com `println`, para a saída ficar legível sem o eco do que foi digitado.

Projetos com Spring Boot, banco ou Docker não rodam no verify, que usa só o JDK: capture as saídas num projeto real no scratchpad, como nas temporadas de mercado, e use blocos `java` sem marcação. Partes que dão para isolar no JDK, como uma regra de negócio, continuam em `java executar`.

## 5. Portfólio (`portfolio.md`)

Como guardar e mostrar o projeto: os arquivos que entram, um roteiro de README em bloco `text` (o que é, como rodar, decisões) e o que destacar para quem recruta. A seção de decisões é a que mais conta.

## 6. XP e conquistas

Cada etapa concluída vale 40 XP, ou 15 se a pessoa abriu a solução antes de concluir; terminar o projeto dá mais 150. As conquistas "Primeiro commit", "Pronto para o portfólio" e "GitHub verdinho" contam etapas e projetos.

## 7. Conferir

```text
npm run verify -- --projeto <id>
```

O verify confere a estrutura (ids, tamanhos, critérios, dica, figuras, links, nada de travessão) e compila e roda cada bloco verificado, com a entrada do bloco `entrada`. Só entregue com ele passando, e abra a página do projeto no navegador para conferir.
