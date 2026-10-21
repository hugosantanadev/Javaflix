# Como gerar uma temporada

Este é o "Prompt 2". Para gerar uma temporada nova, abra o agente de código na pasta do projeto e cole o bloco abaixo, trocando `CARGO` e `TEMPORADA`:

```text
CARGO: estagiario
TEMPORADA: 2

Gere a temporada TEMPORADA do cargo CARGO da Javaflix seguindo docs/GERAR_TEMPORADA.md
à risca. Use a temporada estagiario-t1 como referência de tom, tamanho e formato.
Rode npm run verify até passar sem nenhum problema e npm run links no fim.
Não altere o catálogo nem outras temporadas sem me perguntar.
```

Os ids de cargo são: `aprendiz` (a trilha Base, de fundamentos), `estagiario`, `junior`, `pleno`, `senior`, `backend-junior`, `backend-pleno`, `backend-senior`. A `reta-final` não tem temporadas: os simulados se montam sozinhos com as questões das outras.

Gere **uma temporada por vez** e só avance quando o `npm run verify` passar.

---

## 1. Antes de escrever

1. Leia `src/content/catalogo.ts` e encontre a temporada (`<cargo>-t<n>`). Os títulos dos episódios, a ordem e as provas de cada um (`829`, `830`, `831`) já estão definidos lá. **Siga o catálogo.**
2. Leia a temporada `src/content/temporadas/estagiario-t1/` inteira. Ela é o padrão de qualidade.
3. Para temporadas de certificação, confira os objetivos da prova na página oficial da Oracle. Se não conseguir abrir, use o livro de Boyarsky e Selikoff e as listas de objetivos da Enthuware, e diga isso no resumo final.
4. Respeite a versão do Java de cada prova: `829` é Java 17, `830` é Java 21, `831` é Java 25. Recurso que só existe no 21 (pattern matching em `switch`, threads virtuais, sequenced collections) **não** pode estar numa questão marcada com `829`. Recurso do 22 ao 25 (`_` sem nome, `import module`, `main` de instância, gatherers, scoped values, construtor flexível) só em questões `831`.

## 2. Arquivos

```text
src/content/temporadas/<cargo>-t<n>/
  index.ts        exporta a TemporadaConteudo (episódios na ordem do catálogo + prova)
  e01.md          aula do episódio 1, em Markdown
  e01.ts          o resto do episódio 1: armadilhas, recursos, desafio, 15 exercícios
  e02.md, e02.ts  ...
  prova.ts        prova da temporada
```

O schema está em `src/content/types.ts`, com comentários. O `index.ts` segue este molde:

```ts
import type { TemporadaConteudo } from '../../types';
import e01 from './e01';
import prova from './prova';

const temporada: TemporadaConteudo = { id: 'estagiario-t2', episodios: [e01 /* ... */], prova };
export default temporada;
```

E cada `eNN.ts` importa a aula com `import aula from './eNN.md?raw';`.

## 3. A aula (`eNN.md`)

- De **7 a 12 minutos** de leitura (uns 6 a 10 mil caracteres). Curta e densa: só o que a prova cobra e o que o mercado usa.
- Não repita o título do episódio no começo; o site já mostra. Comece com um parágrafo que diga por que o assunto importa.
- Seções com `##`. Elas viram o índice lateral.
- Termine com `## Resumo para a prova`, uma lista curta (na trilha Base, `## Resumo`).
- Inclua uma seção `## Por baixo dos panos` (veja abaixo).
- Tabelas para comparar regras. Sem listas gigantes.
- Callouts, com o tipo em maiúsculas:

  ```markdown
  > [!PROVA]
  > A pegadinha que a certificação usa.

  > [!DICA]
  > Algo útil no dia a dia.

  > [!ATENCAO]
  > Um erro comum que quebra código de verdade.

  > [!VERSAO]
  > **Java 25 (1Z0-831).** O que muda nesta versão.

  > [!ANTES]
  > Como isso era feito antes, e desde quando mudou.

  > [!IA]
  > O erro que assistentes de IA cometem neste ponto, e como perceber.

  > [!PENSE]
  > Uma pergunta para a pessoa responder de cabeça antes de seguir lendo.

  > [!BOAPRATICA]
  > O jeito que o mercado considera certo, com o motivo.
  ```

- **A didática do episódio.** O texto conversa com a pessoa, como os livros da série *Use a Cabeça!*, e traz os quadros do Deitel ("erro comum", "boa prática"). Em toda aula, além do conteúdo:
  - **Na IDE.** O primeiro contato com cada ferramenta mostra o caminho no IntelliJ IDEA, a IDE recomendada: onde clicar, que atalho usar, como ler o erro que ela sublinha. O terminal aparece também, para entender o que a IDE faz por baixo, mas o dia a dia é na IDE. Use as figuras de interface em `public/figuras/intellij-*.svg` (desenhos próprios da interface).
  - **Como era antes.** Toda API, recurso de linguagem ou dependência com histórico ganha um `[!ANTES]`: o código do Java 8, o `javax` antes do `jakarta`, o Spring Boot 2 e 3 antes do 4, o Lombok antes dos records, o `@MockBean` antes do `@MockitoBean`. Diga a versão em que mudou, porque a pessoa vai encontrar o código antigo no trabalho.
  - **A IA erra aqui.** Pelo menos um `[!IA]` no ponto exato em que um assistente costuma errar: API antiga, método inventado, padrão inseguro. Complementa a seção `ia` do episódio.
  - **Pare e pense.** Um `[!PENSE]` antes de revelar algo que a pessoa consegue deduzir.

### Os recursos dos livros (obrigatórios)

A didática segue dois livros que o usuário pediu como referência: *Use a Cabeça! Java* (Sierra e Bates) e *Java: Como Programar* (Deitel). Use as **técnicas** dos dois, nunca o texto, os exemplos ou as imagens deles. O verify conta os episódios que ainda não têm cada item.

**Em toda aula:**

- pelo menos **uma figura** própria (veja Figuras);
- pelo menos **dois recursos do Use a Cabeça!**, de tipos diferentes, entre os abaixo;
- pelo menos **um quadro do Deitel**;
- notas na margem (`//> texto` no fim da linha) em pelo menos um bloco de código.

**Recursos do Use a Cabeça!:**

```markdown
> [!PERGUNTAS]
> **P:** A dúvida que todo iniciante tem e fica com vergonha de perguntar.
>
> **R:** A resposta direta, de 1 a 3 frases.

> [!CONVERSA]
> **javac:** Dois "personagens" conversam: duas ferramentas, dois tipos, dois conceitos rivais.
>
> **JVM:** Cada parágrafo `**Nome:** fala` vira um balão; o primeiro a falar fica à esquerda.

> [!LAPIS]
> Um exercício curto para fazer no papel, no meio da aula.
>
> **Resposta:** Tudo a partir daqui fica escondido até a pessoa clicar.

> [!COMPILADOR]
> Você é o javac. Este código compila? O que acontece ao rodar?
>
> ```java nao-compila
> // o código, verificado como os outros blocos (marque compila, nao-compila ou executar)
> ```
>
> **Resposta:** O veredito e o porquê.
```

E os **ímãs de código**: um bloco ` ```imas executar ` com as linhas na ordem certa (de 4 a 12). O site embaralha as linhas e a pessoa monta o programa clicando; o verify compila e roda as linhas na ordem, e um ` ```saida ` logo depois confere o resultado e serve de pista.

**Quadros do Deitel:**

| Destaque | Título | Quando usar |
|---|---|---|
| `[!ERRO]` | Erro comum de programação | o erro que quase todo mundo comete neste assunto, com a mensagem real do compilador ou da JVM |
| `[!PREVENCAO]` | Dica de prevenção de erro | um hábito que impede o erro de acontecer |
| `[!DESEMPENHO]` | Dica de desempenho | quando há custo de tempo ou memória para ver, com números |
| `[!ENGENHARIA]` | Observação de engenharia de software | o porquê de uma regra de design ou de convenção |

Varie os personagens e os quadros de um episódio para outro: o objetivo é a aula parecer uma conversa com intervalos, não um texto corrido com caixas iguais.

- Blocos de código. O verify compila e roda os blocos marcados:

  | Marcação | O que o verify faz |
  |---|---|
  | ` ```java executar ` | compila e executa; tem de terminar sem erro |
  | ` ```java executar ` seguido de ` ```saida ` | compila, executa e compara a saída com o bloco `saida` |
  | ` ```java compila ` | só compila |
  | ` ```java nao-compila ` | exige que **não** compile |
  | ` ```java ` | só mostra, sem verificar (use para trechos com vários erros comentados) |

  Acrescente `java25` (ou `java21`) na marcação para compilar com outra versão: ` ```java executar java25 `. Sem isso, usa a versão da menor prova do episódio.

- Use ` ```bash ` para comandos de terminal, ` ```text ` para diagramas, ` ```c ` para C e ` ```asm ` para assembly. Esses blocos não são verificados: copie saídas reais (do `javap -c`, do [Compiler Explorer](https://godbolt.org/)) e diga o compilador e a opção usados (`gcc -O2`, x86-64).
- Links para outros episódios usam o caminho do site: `[o episódio de JVM](/assistir/aprendiz-t2-e04)`. O verify confere se o episódio existe.
- Pelo menos **3 blocos verificados** por aula (`executar`, `compila` ou `nao-compila`).

### A matemática aqui

Quase todo assunto tem uma conta por trás: o tamanho de um tipo em bits, a precisão do ponto flutuante, o custo de um laço, quantas consultas um N+1 faz, quanto tempo uma suíte de testes leva, quantos servidores aguentam uma carga. Mostre essa conta num destaque `> [!MATEMATICA]` ("A matemática aqui"):

- **Um por episódio**, no ponto da aula em que a conta aparece, e curto: de 3 a 6 frases.
- **Sempre com um exemplo calculado**, com números do assunto (bits do `byte`, 500 pedidos, 800 testes), e não uma fórmula solta.
- Do Estagiário em diante, comece pelo básico (binário, potências de 2, porcentagem, divisão inteira) e suba conforme o cargo (logaritmo, Big-O, probabilidade, estimativas de capacidade).
- Quando a conta tiver um episódio próprio na trilha Aprendiz (binário, complemento de dois, IEEE 754, Big-O), aponte para ele.

### Figuras

Toda aula tem pelo menos uma figura, e as de conceito visual pedem mais: bits numa palavra, idas e voltas entre aplicação e banco, camadas, filas, memória, uma pirâmide de testes, a tela da IDE. Prefira de uma a três por aula, cada uma no ponto em que o texto descreve o que ela mostra.

- Só desenhos **próprios**, em SVG, salvos em `public/figuras/<nome>.svg`. Nada de imagens de terceiros, nem de busca na internet: além do direito autoral, o site não usa marca de ninguém.
- Na aula: `![texto alternativo que descreve a figura](/figuras/nome.svg "Legenda curta, que diz o que olhar.")`. O verify exige que o arquivo exista e que o texto alternativo seja descritivo.
- Fundo `#13110f`, texto `#f3eee7` e `#bdb5aa`, detalhes `#8a8277`, destaque `#ff7a1a`, sucesso `#4fd68b`, matemática `#f2c75c`; fontes `Segoe UI, system-ui, sans-serif` e `Cascadia Code, Consolas, monospace`; `viewBox` com 760 de largura.
- Coloque um `<title>` no SVG e confira que nenhum texto passa da borda.

### Por baixo dos panos

Toda aula de Java tem uma seção `## Por baixo dos panos` que liga o assunto ao que a máquina faz. Escolha o que for mais revelador para o tema:

- o bytecode real (`javap -c`), comparado com o código-fonte;
- o que o `javac` resolve na compilação e o que fica para a execução (constantes, generics apagados, açúcar sintático como `for` aprimorado, records e enums);
- onde cada coisa fica na memória (pilha, heap, metaspace) e o custo disso;
- o equivalente em C ou assembly, quando ajuda a entender por que o Java é como é;
- a regra da JLS ou da JVMS que explica o comportamento, com o número da seção.

Termine a seção com links para os episódios da trilha Base que aprofundam o assunto (`aprendiz-*`). Na trilha Base, a aula inteira já é "por baixo dos panos"; lá a seção é opcional.

## 4. O episódio (`eNN.ts`)

```ts
const episodio: EpisodioConteudo = {
  id: 'estagiario-t2-e01',
  minutos: 9,
  aula,
  armadilhas: [...],   // 5 a 8 frases curtas, uma pegadinha cada
  recursos: [...],     // 8 a 14 links, agrupados no site por tipo
  desafio: {...},      // opcional, mas faça em quase todo episódio de código
  ia: {...},           // obrigatório em episódios novos (seção "IA na prática")
  bugs: [...],         // obrigatório em episódios novos: 3 bugs da aba Depuração
  exercicios: [...],   // exatamente 15
};
```

### Recursos

Os recursos são a seção "Para ir além" do episódio. A pessoa precisa achar ali, para **este** assunto, a página exata da documentação, um artigo, um vídeo e o capítulo do livro. Nada de link genérico para a home de um site.

| Campo | Regra |
|---|---|
| `tipo` | `documentacao`, `artigo`, `tutorial`, `video`, `curso`, `livro`, `simulado` ou `ferramenta` |
| `idioma` | obrigatório: `'pt'` ou `'en'` |
| `onde` | obrigatório em `livro`: capítulo e seção (`'Cap. 1, "Understanding Data Types"'`). Use também para apontar a seção de uma página longa da JLS ou do Javadoc |
| `nivel` | `'fundo'` para o que vai além da prova (JVMS, código-fonte do JDK, livros de computação) |
| `porque` | uma frase dizendo o que a pessoa ganha abrindo |

O verify exige **pelo menos 5** recursos, com pelo menos uma `documentacao` e um `video`. Mire em 8 a 14, nesta mistura:

- **Documentação oficial** (2 a 4): a seção certa da JLS ou da JVMS (com âncora, `jls-4.html#jls-4.2.1`), o tutorial da Oracle ou do dev.java sobre o tema, o Javadoc da classe, a JEP que criou o recurso.
- **Artigos** (2 a 4): Baeldung, InfoQ, blogs de quem escreveu o recurso (Brian Goetz, Nicolai Parlog).
- **Vídeos** (1 a 3): de preferência em português (Curso em Vídeo, Akitando, Loiane Groner), mais um em inglês quando valer a pena (Java YouTube channel, Crash Course Computer Science).
- **Livros** (1 a 2): o OCP de Boyarsky e Selikoff para temporadas de certificação, *Effective Java* para boas práticas, *Think Java* (gratuito) para iniciantes, e na trilha Base *Code*, de Charles Petzold, *Computer Systems: A Programmer's Perspective* e *Crafting Interpreters*.

Não invente URLs nem ids de vídeo. Use os que já estão em `docs/RECURSOS.md` (conferidos) ou abra a página antes de usar. O `npm run links` testa cada link e confere vídeos do YouTube pelo oEmbed, que falha quando o vídeo não existe. Link quebrado não pode ficar. Os sites `education.oracle.com` e `baeldung.com` bloqueiam robôs: o script só avisa, então confira esses à mão.

### Desafio

Um problema pequeno para resolver na IDE, com `dicas` progressivas e uma `solucao` completa (um programa com `main`). O verify compila e roda a solução; se houver `saida`, ela é comparada. A solução precisa ser determinística: nada de data atual, aleatório ou leitura do teclado.

### IA na prática (`ia`)

Obrigatória em todo episódio novo. Aparece depois das armadilhas e ensina a usar um assistente de IA **naquele assunto**, sem confiar às cegas.

| Campo | Regra |
|---|---|
| `uso` | um parágrafo (80+ caracteres): para que a IA serve neste assunto e onde está o limite dela |
| `pedido` | um pedido pronto para copiar, em linhas curtas: o que fazer, as versões do projeto (Java 25, Spring Boot 4.1...) e as restrições, terminando com `<cole aqui ...>` |
| `erros` | 2 a 4 erros que assistentes de IA cometem de verdade neste assunto: API antiga, método inventado, padrão inseguro, solução que troca um problema por outro |
| `conferir` | 2 a 4 formas concretas de conferir: compilar, rodar, ler o SQL do log, fazer o teste falhar de propósito |

Todo `pedido` ensina engenharia de prompt pelo exemplo, e por isso sempre inclui:

- **Contexto**: versões, o código relevante e a regra de negócio, porque a IA não conhece o projeto.
- **Segurança**: nada de dados reais, senhas ou chaves no pedido; parâmetros em vez de texto concatenado; validação da entrada; o mínimo de permissão.
- **Manutenção**: nomes que dizem a intenção, um assunto por método e por teste, sem dependência nova sem motivo, sem mudar o que não foi pedido.
- **Verificação**: peça a explicação, o SQL gerado, a mensagem de falha ou os casos de teste, para que a resposta possa ser conferida.

Os erros vêm de preferência do que você viu acontecer ao capturar as saídas da aula (nomes que mudaram de versão, como `@MockBean` no Spring Boot 4). Nas temporadas de certificação, a IA entra como tutora: explicar um erro de compilação, gerar mais exemplos, corrigir uma explicação. Nunca como quem resolve a prova.

### Depuração (`bugs`)

Obrigatória em todo episódio novo: **3 bugs**, um de cada dificuldade (1, 2 e 3), sobre o assunto do episódio. Aparecem na aba Depuração. O aluno lê o sintoma, clica na linha culpada e vê a correção.

| Campo | Regra |
|---|---|
| `id` | `<episodio>-b01` a `-b03` |
| `sintoma` | como o bug chegaria num chamado: a mensagem do compilador, a saída errada ou a exceção, sem dizer onde está |
| `codigo` | programa completo e determinístico, com o bug numa linha só |
| `linha` | a linha culpada, que é a linha que muda na correção |
| `efeito` | `naoCompila` (todos os erros na `linha`), `saida` (a saída errada, exata) ou `excecao` (nome simples) |
| `correcao` | o mesmo código corrigido, **com o mesmo número de linhas** |
| `saidaCorrigida` | a saída da correção |
| `dica` | por onde começar a investigar, sem entregar a resposta |
| `explicacao` | por que acontece e como evitar, de 1 a 4 frases |

O verify confere tudo: que o código com bug se comporta como o `efeito` diz, em todas as versões do Java do episódio, que a correção roda limpa e imprime `saidaCorrigida`, e que a `linha` é uma das que mudam. Confira também que a mensagem citada no sintoma é a do `javac` de verdade.

A dificuldade acompanha o cargo, para que a pessoa aprenda a depurar junto com o resto:

| Cargo | Bugs típicos |
|---|---|
| Aprendiz | lógica de algoritmo: índice que passa do fim, condição de parada, conta que estoura |
| Estagiário | sintaxe e tipos: `;` esquecido, maiúscula trocada, aspas simples em texto, literal grande demais, `var` sem valor, divisão inteira |
| Júnior (certificação) | erros de execução e de API: `NullPointerException`, `equals` e `hashCode`, `ConcurrentModificationException`, `Integer` comparado com `==` |
| Pleno (certificação) | genéricos, streams preguiçosos, `Optional` mal usado, imutabilidade, sobrecarga escolhida pelo compilador |
| Sênior (certificação) | concorrência, recursos não fechados, codificação de texto, datas e fusos |
| Backend Júnior | bugs de produção simulados em Java puro: fronteira de regra, `BigDecimal`, status HTTP, SQL com `NULL`, testes que passam sem testar |
| Backend Pleno | idempotência, cache desatualizado, retentativa sem limite, segredo no log, fuso horário |

## 5. Os 15 exercícios

### Tipos

| `tipo` | O aluno... | Campos |
|---|---|---|
| `escolha` | marca uma alternativa | `opcoes`, `resposta` (índice) |
| `multipla` | marca várias | `opcoes`, `respostas` (índices); o enunciado diz "Escolha duas." / "Escolha dois." / "Escolha três." |
| `saida` | digita a saída do programa | `codigo`, `resposta` (linhas separadas por `\n`) |
| `lacuna` | completa o `___` no código | `codigo` com um único `___`, `respostas` aceitas, `saida` |
| `linha` | clica na linha que não compila | `codigo`, `resposta` (número da linha, começando em 1) |

### Distribuição por episódio

- Pelo menos 3 tipos diferentes. Uma boa mistura: 6 `escolha`, 3 `multipla`, 2 `saida`, 2 `linha`, 2 `lacuna`.
- Dificuldade: uns 4 de nível 1, 7 de nível 2 e 4 de nível 3.
- **Pelo menos 6 verificados pelo JDK** (tipos `saida`, `lacuna`, `linha`, ou qualquer questão com `verificar`). Em episódios de código, mire em 9 ou mais.
- Ids: `<episodio>-q01` até `-q15`.

### Verificação (`verificar`)

| `verificar` | Exige que... |
|---|---|
| `{ tipo: 'saida' }` | o código rode sem erro e a alternativa correta, sem as crases, seja **igual** à saída. Nenhuma alternativa errada pode ser igual |
| `{ tipo: 'executa', saida: '...' }` | o código rode e imprima exatamente aquilo (use quando as alternativas são frases, como "Imprime `ok`") |
| `{ tipo: 'naoCompila', linha?: n }` | o código não compile; se `linha` vier, um dos erros precisa estar nela |
| `{ tipo: 'excecao', nome: 'X', saida?: '...' }` | o código compile e lance a exceção `X` (nome simples) |
| `{ tipo: 'opcoesCompilam' }` | cada alternativa é um trecho de código; as corretas são exatamente as que compilam |
| `{ tipo: 'opcoesNaoCompilam' }` | o contrário: as corretas são as que não compilam |

Como o verify monta o código:

- Com `void main(` no texto: é um programa completo e compila como está. O arquivo leva o nome da classe `public`.
- Sem `main`, só com declarações de `class`, `interface`, `enum` ou `record`: só compila.
- Declarações de tipo seguidas de comandos soltos (um `record Pedido(...) {}` e depois o código que o usa) contam como trecho: o verify embrulha tudo num `main`, e o record vira um record local.
- Só comandos soltos: o verify embrulha num `main` que declara `throws Exception`, com estes imports: `java.util.*`, `java.util.function.*`, `java.util.stream.*`, `java.time.*`, `java.time.format.*`, `java.io.*`, `java.nio.file.*` e `java.math.*`. Os números de linha continuam contados no código que o aluno vê.
- Por causa do `throws Exception`, questões sobre exceções verificadas (checked) **precisam** ser programas completos.
- Questões de `linha` exigem que **todos** os erros do compilador estejam naquela linha.
- Se precisar de imports extras só para a verificação, use `codigoVerificacao` (mantendo a mesma numeração de linhas).

Toda questão é compilada em **todas** as versões das provas a que pertence. Se o resultado mudar entre versões (compila no 25, não no 21), separe em questões diferentes, cada uma com `provas` próprias.

### Alternativas

- Saídas e código vão entre crases: `` '`26`' ``. Saída de várias linhas: `` '`linha 1\nlinha 2`' ``.
- Frases ficam sem crases, com código inline quando preciso: `'Não compila: `x` não foi inicializada'`.
- De 4 a 6 alternativas nos episódios; as erradas devem ser erros que alguém realmente cometeria (somar octal como decimal, esquecer a promoção para `int`, achar que compila).
- Nada de "todas as anteriores" ou "nenhuma das anteriores".

### Explicação

Toda questão explica **por que** a certa é certa e por que as erradas atraem. De 1 a 4 frases. É o momento em que o aluno aprende, então capriche.

### Dica (`dica`)

Toda questão nova tem uma `dica`: uma pista que aponta o caminho sem entregar a resposta ("olhe o tipo do literal", "conte quantas vezes o laço roda"). Quem abre a dica não ganha XP naquela questão, e a sequência de acertos não aumenta; na revisão, a questão volta no dia seguinte. Por isso a dica precisa valer a troca: nada de repetir o enunciado.

### Questões só de conceito

Questões sem código não têm a rede do verify. Escreva com cuidado redobrado, de preferência em cima de regras que você consegue citar (JLS, Javadoc). O site tem botão de reportar erro para estas.

## 6. A prova da temporada (`prova.ts`)

- De **18 a 25 questões**, inéditas (não copie exercícios dos episódios).
- Ids: `<temporada>-prova-q01` em diante.
- Formato da certificação: enunciados longos, programas completos, de **5 a 8 alternativas**, "Escolha duas/três" nas múltiplas.
- Use só `escolha` e `multipla`, com no máximo 3 de `linha`.
- Misture os episódios da temporada, com peso maior nos difíceis.
- Pelo menos metade verificada pelo JDK.
- O simulado da Reta Final reaproveita estas questões, então elas precisam valer como questão de prova.

## 7. Temporadas de mercado (cargos de backend)

- No catálogo elas têm `provas: []`. O verify usa Java 25.
- Código que depende de bibliotecas (Spring, JUnit, Jackson) **não compila** no verify. Nesses casos, faça questões conceituais, mostre código em blocos ` ```java ` sem marcação, e verifique tudo o que der para fazer com Java puro (HTTP com `java.net.http`, SQL com strings, lógica de negócio).
- Prefira cenários de trabalho: "o endpoint devolve 500 quando...", "qual índice resolve...", "o que este log indica...".
- Os recursos devem apontar para a documentação oficial da ferramenta da versão atual.

## 7b. Trilha Base (cargo `aprendiz`)

- Fundamentos de computação, do bit à JVM: circuitos, assembly, C, compiladores, matemática, algoritmos. É opcional e fica sempre liberada.
- `provas: []` no catálogo; o verify usa Java 25 e não exige mínimo de blocos verificados. Mesmo assim, verifique em Java tudo o que der: simule um somador, uma CPU de brinquedo, uma máquina de pilha.
- A matemática aparece com tabelas e exemplos calculados, não com fórmulas soltas. Mostre a conta passo a passo.

## 8. Estilo de escrita

- Português do Brasil, direto, na segunda pessoa ("você").
- Frases curtas. Um parágrafo, uma ideia.
- **Sem travessão** (—). Use vírgula, dois-pontos, parênteses ou ponto.
- Sem frases de efeito vazias ("mergulhar", "desvendar", "jornada", "poderoso").
- Nomes de exemplo brasileiros e situações reais: pedido, boleto, Pix, nota fiscal, turma.
- Termos técnicos em inglês quando é assim que o mercado fala (bytecode, deploy, thread), sem itálico.

## 9. Checklist antes de entregar

- [ ] Os episódios batem com o catálogo: mesmos ids, mesma ordem, mesmos títulos.
- [ ] Cada episódio: aula com 3+ blocos verificados e seção "Por baixo dos panos", 5 a 8 armadilhas, 8 a 14 recursos (documentação, artigo, vídeo e livro com `onde`), 15 exercícios com 6+ verificados.
- [ ] Cada episódio: seção `ia` com pedido que cobra contexto, segurança, manutenção e verificação; 3 `bugs`, um de cada dificuldade, no nível do cargo.
- [ ] Prova com 18 a 25 questões no formato da certificação.
- [ ] Nenhum recurso do Java 21+ em questão `829`; nenhum do 22+ fora de questão `831`.
- [ ] `npm run verify` passa sem nenhum problema.
- [ ] `npm run links` sem link quebrado.
- [ ] Resumo final para o usuário: o que foi gerado, quantas questões verificadas e qualquer ponto em que você teve dúvida sobre a regra.
