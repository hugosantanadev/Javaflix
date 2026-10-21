# Javaflix

Estude Java como quem maratona uma série. Da primeira aula à certificação Oracle (1Z0-829, 1Z0-830 ou 1Z0-831) e ao backend que o mercado brasileiro pede.

- **8 cargos, 42 temporadas, 201 episódios.** Você começa como Estagiário e é promovido a cada avaliação de desempenho.
- **Cada episódio:** aula curta, armadilhas de prova, material recomendado, vídeo do seu curso (se houver), 15 exercícios e um desafio de código.
- **Cada temporada:** uma prova no formato da certificação, com cronômetro.
- **Reta final:** simulados de 50 questões no tempo da prova, montados com o banco de questões.
- **Gamificação:** XP, meta diária, ofensiva com congelamentos, sequência de acertos, revisão espaçada dos erros, 24 conquistas e mapa de atividade.
- **Gabarito conferido no JDK:** o `npm run verify` compila e executa o Java de cada questão verificável, em Java 17, 21 e 25, e reprova o conteúdo quando o gabarito diverge.

A Temporada 1 do Estagiário vem pronta. As outras você gera com o agente de código, uma por vez (veja abaixo).

## Rodando

Precisa de **Node LTS** e **JDK 25** no PATH (o JDK 25 compila para 17, 21 e 25).

```bash
npm install
```

```bash
npm run verify
```

```bash
npm run dev
```

Abra http://localhost:5173, crie seu perfil, escolha a prova e a meta diária.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run verify` | valida a estrutura de todo o conteúdo e compila e roda o Java das questões |
| `npm run verify -- --temporada estagiario-t2` | valida uma temporada só |
| `npm run verify:rapido` | só a parte estrutural, sem Java |
| `npm run links` | confere os links de material recomendado |
| `npm run videos:importar` | liga os vídeos do Google Drive aos episódios |
| `npm run build` | build de produção em `dist/` |

## Gerando as próximas temporadas

1. Abra o agente de código na pasta do projeto.
2. Cole o bloco do topo de [`docs/GERAR_TEMPORADA.md`](docs/GERAR_TEMPORADA.md), trocando `CARGO` e `TEMPORADA`.
3. Só avance para a próxima quando o `npm run verify` passar.

O catálogo com todos os cargos, temporadas e episódios está em `src/content/catalogo.ts`. As temporadas que ainda não existem aparecem no site como "Em breve".

## Vídeos do curso

Os vídeos do seu curso no Google Drive entram como reforço dentro de cada episódio. O passo a passo está em [`docs/VIDEOS.md`](docs/VIDEOS.md).

## Erros nas questões

Todo exercício tem um botão **Reportar erro**. Os reportes ficam em **Conta**, com um botão para copiar a lista e colar no agente, que corrige e roda o verify.

## Progresso

Fica no `localStorage` do navegador, separado por perfil. Em **Conta** dá para exportar e importar um backup em JSON.

## Publicando

`npm run build` gera um site estático em `dist/`. Como as rotas são do lado do cliente, configure o servidor para devolver `index.html` em qualquer caminho (no Netlify, um `_redirects` com `/* /index.html 200`; na Vercel, um rewrite equivalente).

O visual lembra uma plataforma de streaming, mas a identidade é própria: sem logotipo, fonte ou imagens de terceiros. Se for publicar, não inclua links de vídeos de um curso pago que não é seu.

## Estrutura

```text
src/
  content/
    catalogo.ts          cargos, temporadas e episódios (todos)
    types.ts             schema do conteúdo
    materiais.ts         material recomendado geral
    videos.ts            vídeos do Drive ligados a episódios
    temporadas/<id>/     conteúdo gerado: aulas (.md), exercícios e prova (.ts)
  components/            arte procedural, fileiras, player, questões, prova
  pages/                 início, episódio, carreira, revisão, simulados, conquistas
  lib/                   progresso (Zustand), XP, ofensiva, conquistas, Markdown, destaque de código
  styles/                CSS com tokens próprios
scripts/
  verify.ts              validação do conteúdo e execução do Java
  links.ts               checagem de links
  videos-importar.ts     importação dos vídeos do Drive
docs/
  GERAR_TEMPORADA.md     regras para gerar temporadas (o "Prompt 2")
  VIDEOS.md              como ligar os vídeos do curso
```
