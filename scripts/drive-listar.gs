/**
 * Lista todos os vídeos de uma pasta do Google Drive, entrando em todas as
 * subpastas (e atalhos para pastas), e grava o resultado no formato do
 * videos.txt da Javaflix num arquivo "javaflix-videos.txt" no seu Drive.
 *
 * Como usar: em script.google.com (com a conta que tem acesso à pasta),
 * crie um projeto, cole este código, salve e rode a função listarVideos.
 * Só lê a pasta; o único arquivo criado é o javaflix-videos.txt.
 */
const PASTA_RAIZ = '1VZQgv4rYT8GHjiQDGaeshLuajqnpOuDE';

function listarVideos() {
  const linhas = [];
  const visitadas = {};

  function visitar(pasta, caminho) {
    const id = pasta.getId();
    if (visitadas[id]) return;
    visitadas[id] = true;

    const arquivos = pasta.getFiles();
    while (arquivos.hasNext()) {
      let f = arquivos.next();
      let mime = f.getMimeType();
      if (mime === 'application/vnd.google-apps.shortcut') {
        const alvo = f.getTargetId();
        if (f.getTargetMimeType() === 'application/vnd.google-apps.folder') {
          visitar(DriveApp.getFolderById(alvo), caminho.concat(f.getName()));
          continue;
        }
        f = DriveApp.getFileById(alvo);
        mime = f.getMimeType();
      }
      if (mime.indexOf('video/') === 0) {
        const nome = f.getName().replace(/\.[^.]+$/, '');
        linhas.push([caminho.join(' / ') || 'Curso', nome, 'https://drive.google.com/file/d/' + f.getId() + '/view'].join(' | '));
      }
    }

    const subpastas = pasta.getFolders();
    while (subpastas.hasNext()) {
      const s = subpastas.next();
      visitar(s, caminho.concat(s.getName()));
    }
  }

  visitar(DriveApp.getFolderById(PASTA_RAIZ), []);
  linhas.sort();
  const arquivo = DriveApp.createFile('javaflix-videos.txt', linhas.join('\n'), MimeType.PLAIN_TEXT);
  Logger.log(linhas.length + ' vídeos listados. Arquivo criado: ' + arquivo.getUrl());
}
