# Javaflix

Site de estudo de Java no formato de streaming: oito cargos (Estagiário a Backend Sênior), temporadas, episódios com aula, 15 exercícios, desafio e prova por temporada, e uma aba de projetos práticos feitos do zero. Gamificado com XP, ofensiva diária, revisão espaçada e conquistas. Tudo em português do Brasil.

## Comandos

- `npm run dev`: servidor de desenvolvimento (http://localhost:5173)
- `npm run verify`: confere a estrutura de todo o conteúdo e compila e roda o Java de cada questão verificável, nas versões 17, 21 e 25 conforme as provas. **Precisa passar antes de qualquer entrega.**
- `npm run verify -- --temporada <id>`: só uma temporada
- `npm run verify -- --projeto <id>`: só um projeto da aba Projetos
- `npm run links`: confere os links de material recomendado
- `npm run videos:importar`: liga vídeos do Google Drive aos episódios (veja `docs/VIDEOS.md`)
- `npm run build`: build de produção em `dist/`

Requer Node LTS e JDK 25 no PATH.

## Gerar conteúdo

Siga **`docs/GERAR_TEMPORADA.md`** à risca. Resumo:

- O catálogo (`src/content/catalogo.ts`) define cargos, temporadas, episódios e as provas de cada episódio. Não mude sem pedir.
- O conteúdo de cada temporada fica em `src/content/temporadas/<cargo>-t<n>/`. A `estagiario-t1` é a referência de qualidade.
- Schema em `src/content/types.ts`.
- Uma temporada por vez; só entregue com o verify passando.
- Projetos práticos (aba Projetos): siga **`docs/GERAR_PROJETO.md`**. Catálogo em `src/content/projetos.ts`, conteúdo em `src/content/projetos/<id>/`; a referência é `estagiario-p1`.

## Código

- React 19 + TypeScript + Vite, React Router, Zustand (progresso no `localStorage`), Shiki para destacar código, Marked para Markdown.
- CSS próprio em `src/styles/` com tokens em `base.css`. Tema escuro (padrão) e claro, cinco acentos (brasa, cobalto, esmeralda, rosa, âmbar) escolhidos em Conta (`src/lib/aparencia.ts`). Use sempre os tokens (`--bg`, `--text`, `--accent`, `--veu-1`, `--trilho`...), nunca cores fixas; painéis de código, saída e arte continuam escuros no tema claro. Raio de 4px em elementos interativos e 8px em painéis.
- A arte das temporadas é procedural (`src/components/Arte.tsx`): cor do cargo e glifo de código. Sem imagens nem marca de terceiros.
- Ícones: `@phosphor-icons/react`, sempre os nomes com sufixo `Icon`.
- Textos de interface sem travessão (—).
