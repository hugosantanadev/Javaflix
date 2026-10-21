// Cole no console do Chrome (F12, aba Console) com a pasta do Google Drive aberta.
// Ele rola a lista até o fim, junta nome e ID de cada vídeo e copia o resultado
// no formato do videos.txt. Depois é só colar no chat ou no arquivo videos.txt.
// Se a pasta tiver subpastas, entre em cada uma e rode de novo.
(async () => {
  const VIDEO = /\.(mp4|mkv|mov|webm|avi|m4v)$/i;
  const achados = new Map();
  const coletar = () =>
    document.querySelectorAll('[data-id]').forEach((el) => {
      const id = el.getAttribute('data-id');
      if (!/^[\w-]{25,}$/.test(id) || achados.has(id)) return;
      const nome =
        (el.innerText || '').split('\n').map((s) => s.trim()).filter(Boolean)[0] || el.getAttribute('aria-label') || '';
      if (nome) achados.set(id, nome);
    });

  const rolaveis = [...document.querySelectorAll('*')].filter(
    (e) => e.scrollHeight > e.clientHeight + 50 && /auto|scroll/.test(getComputedStyle(e).overflowY),
  );
  const caixa = rolaveis.sort((a, b) => b.scrollHeight - a.scrollHeight)[0] || document.scrollingElement;
  let parado = 0;
  let antes = -1;
  while (parado < 4) {
    coletar();
    caixa.scrollTop += caixa.clientHeight * 0.8;
    await new Promise((r) => setTimeout(r, 700));
    parado = achados.size === antes ? parado + 1 : 0;
    antes = achados.size;
  }
  coletar();

  const pasta = document.title.replace(/\s*-\s*Google Drive\s*$/, '').trim() || 'Curso';
  const itens = [...achados].map(([id, nome]) => ({ id, nome }));
  const videos = itens.filter((i) => VIDEO.test(i.nome));
  if (videos.length === 0) {
    console.log('Nenhum arquivo de vídeo nesta pasta. Itens encontrados (provavelmente subpastas):');
    console.log(itens.map((i) => '- ' + i.nome).join('\n'));
    console.log('Entre em cada subpasta e rode o script de novo.');
    return;
  }
  const texto = videos
    .map((v) => `${pasta} | ${v.nome.replace(VIDEO, '')} | https://drive.google.com/file/d/${v.id}/view`)
    .join('\n');
  copy(texto);
  console.log(texto);
  console.log(`\n${videos.length} vídeos copiados para a área de transferência. Cole no chat do Claude.`);
})();
