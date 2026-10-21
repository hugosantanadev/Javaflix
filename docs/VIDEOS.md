# Vídeos do curso (Google Drive)

Os vídeos do seu curso aparecem em três lugares:

- dentro de cada episódio, na seção **Reforço em vídeo**, depois da aula;
- na página **Vídeos**, agrupados por módulo;
- numa fileira **Do seu curso** na página inicial.

O site não copia os vídeos: ele embute o player do próprio Google Drive. A ligação entre vídeo e episódio fica em `src/content/videos.local.ts`, um arquivo pessoal que está no `.gitignore`: links de curso nunca vão junto se você publicar o código. As regras de ligação feitas à mão ficam em `scripts/videos-regras.ts`.

## Jeito 1: lista de links (sempre funciona)

1. No Google Drive, abra a pasta do curso.
2. Para cada vídeo: botão direito, **Compartilhar**, **Copiar link**.
3. Crie o arquivo `videos.txt` na raiz do projeto, um vídeo por linha:

   ```text
   # Módulo | Título | Link | Duração (opcional)
   Módulo 1 | Aula 01 - Instalando o JDK | https://drive.google.com/file/d/1AbC.../view?usp=sharing | 12:40
   Módulo 1 | Aula 03 - Tipos primitivos | https://drive.google.com/file/d/1XyZ.../view
   Módulo 2 | Estruturas condicionais | https://drive.google.com/file/d/1QwE.../view
   ```

   Só o link é obrigatório. Sem título, o vídeo vira "Vídeo 1", "Vídeo 2" e não é ligado a nenhum episódio.

4. Rode:

   ```bash
   npm run videos:importar
   ```

O script lê o título de cada vídeo, compara com as palavras-chave dos episódios e sugere até dois episódios por vídeo. Ele mostra o que ligou e o que ficou sem episódio.

## Jeito 2: pasta pública inteira

Se a pasta estiver compartilhada como **Qualquer pessoa com o link**, o script lista tudo sozinho, incluindo subpastas (cada subpasta vira um módulo). Precisa de uma chave de API do Google, gratuita:

1. Em https://console.cloud.google.com, crie um projeto.
2. Em **APIs e serviços**, ative a **Google Drive API**.
3. Em **Credenciais**, crie uma **Chave de API** e restrinja à Google Drive API.
4. Rode, no PowerShell:

   ```powershell
   $env:GOOGLE_API_KEY = "sua-chave"; npm run videos:importar -- --pasta https://drive.google.com/drive/folders/ID_DA_PASTA
   ```

A chave fica só no seu terminal; não salve em arquivo do projeto.

Drives compartilhados de empresa ou curso normalmente não aceitam chave de API. Nesse caso, use o jeito 1.

## Jeito 3: Google Apps Script (pasta privada com subpastas)

É o jeito usado para o curso atual. Lê a pasta e todas as subpastas com a sua conta e grava a lista pronta:

1. Abra https://script.google.com com a conta que tem acesso à pasta (ex.: `https://script.google.com/u/3/home`).
2. **Novo projeto**, cole o conteúdo de `scripts/drive-listar.gs`, troque `PASTA_RAIZ` pelo ID da pasta, salve e clique em **Executar**.
3. Autorize (é um script seu: **Avançado**, **Acessar projeto**, **Permitir**).
4. Baixe o `javaflix-videos.txt` que aparece no seu Drive, salve como `videos.txt` na raiz do projeto e rode `npm run videos:importar -- --conta seu-email@gmail.com`.

## Jeito 4: script no console do Chrome (uma pasta por vez)

Quando a pasta só abre com uma conta específica e você não pode mudar o compartilhamento:

1. No Chrome, abra a pasta do Drive com a conta que tem acesso.
2. Aperte F12, vá na aba **Console**. Se o Chrome pedir, digite `allow pasting` e Enter.
3. Cole o conteúdo de `scripts/drive-listar-pasta.js` e aperte Enter.
4. O script rola a lista, junta nome e ID de cada vídeo e copia tudo. Cole no `videos.txt` (ou no chat do Claude).
5. Se houver subpastas, repita dentro de cada uma.

## Conta do Google usada pelo player

Se os vídeos estão numa conta que não é a principal do navegador (o link tem `/u/3/`, por exemplo), informe a conta na importação:

```bash
npm run videos:importar -- --conta seu-email@gmail.com
```

Também vale o número de `/u/N/`, mas o e-mail é mais seguro: o número muda se você sair e entrar de novo nas contas. A escolha fica salva em `CONTA_DRIVE`, no topo de `src/content/videos.local.ts`.

## Ajustar as ligações à mão

Abra `src/content/videos.local.ts` e edite o campo `episodios` de cada vídeo com os ids dos episódios (estão em `src/content/catalogo.ts`, no formato `estagiario-t1-e03`):

```ts
{
  driveId: "1AbC...",
  titulo: "Aula 03 - Tipos primitivos",
  modulo: "Módulo 1",
  episodios: ["estagiario-t1-e03", "estagiario-t1-e04"],
},
```

Rodar o importador de novo **mantém** as suas edições. Para refazer todas as sugestões, use `npm run videos:importar -- --refazer`.

## O player não abre?

O player do Drive só toca se uma destas for verdade:

- o arquivo está compartilhado como **Qualquer pessoa com o link**; ou
- você está logado no Google, no mesmo navegador, com uma conta que tem acesso ao arquivo, e o navegador permite cookies de terceiros para `drive.google.com`.

Se nada disso der, o botão **Drive** ao lado de cada vídeo abre o arquivo direto no Google Drive.

Se for publicar o site, lembre que os links ficam visíveis para quem acessar. Não publique links de um curso pago que não é seu.

