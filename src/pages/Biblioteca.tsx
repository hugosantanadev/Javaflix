import { ArrowSquareOutIcon, FilmStripIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { VideoDrive } from '../components/VideoDrive';
import { getEpisodio, getTemporadaDoEpisodio } from '../content/catalogo';
import { GRUPOS, MATERIAIS, type Material } from '../content/materiais';
import { PROVAS } from '../content/types';
import { VIDEOS } from '../content/videos';
import { useProgresso, usePerfil } from '../lib/store';

export function Videos() {
  const progresso = useProgresso();
  const [filtro, setFiltro] = useState<'todos' | 'ligados' | 'soltos'>('todos');
  const modulos = useMemo(() => {
    const lista = VIDEOS.filter((v) => (filtro === 'todos' ? true : filtro === 'ligados' ? v.episodios.length > 0 : v.episodios.length === 0));
    const m = new Map<string, typeof VIDEOS>();
    for (const v of lista) {
      const k = v.modulo ?? 'Sem módulo';
      m.set(k, [...(m.get(k) ?? []), v]);
    }
    return [...m.entries()];
  }, [filtro]);
  const vistos = VIDEOS.filter((v) => progresso.videos[v.driveId]).length;

  if (VIDEOS.length === 0) {
    return (
      <div className="pagina videos">
        <h1 className="titulo-pagina">Vídeos do curso</h1>
        <div className="vazio-grande">
          <FilmStripIcon size={56} weight="duotone" />
          <h2>Nenhum vídeo ligado ainda</h2>
          <p>
            Os vídeos do seu curso no Google Drive aparecem aqui e dentro de cada episódio, na seção <em>Reforço em vídeo</em>. Para
            ligar: copie os links dos vídeos para <code>videos.txt</code> na raiz do projeto, um por linha com o título, e rode{' '}
            <code>npm run videos:importar</code>. O script sugere os episódios pelo título. O passo a passo está em{' '}
            <code>docs/VIDEOS.md</code>. No site publicado, exporte os vídeos em Conta na versão local e importe o arquivo lá.
          </p>
          <pre className="vazio-exemplo">{`# videos.txt
Módulo 1 | Aula 03 - Tipos primitivos | https://drive.google.com/file/d/1AbC.../view
Módulo 1 | Aula 04 - Variáveis e escopo | https://drive.google.com/file/d/1XyZ.../view`}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina videos">
      <h1 className="titulo-pagina">Vídeos do curso</h1>
      <p className="subtitulo-pagina">
        {VIDEOS.length} vídeos do seu Drive, {vistos} vistos. Cada um aparece como reforço nos episódios do mesmo assunto.
      </p>
      <div className="segmentado" role="tablist" style={{ marginTop: 24 }}>
        {(['todos', 'ligados', 'soltos'] as const).map((f) => (
          <button type="button" role="tab" key={f} aria-selected={filtro === f} onClick={() => setFiltro(f)}>
            {f === 'todos' ? 'Todos' : f === 'ligados' ? 'Ligados a episódios' : 'Sem episódio'}
          </button>
        ))}
      </div>
      {modulos.map(([modulo, vids]) => (
        <section key={modulo} className="videos-modulo">
          <h2>{modulo}</h2>
          <div className="videos-grade">
            {vids.map((v) => (
              <div key={v.driveId} className="videos-item">
                <VideoDrive video={v} compacto />
                {v.episodios.length > 0 && (
                  <div className="videos-episodios">
                    {v.episodios.map((id) => {
                      const e = getEpisodio(id);
                      const t = getTemporadaDoEpisodio(id);
                      return e && t ? (
                        <Link key={id} to={`/assistir/${id}`} className="chip-prova">
                          T{t.numero}:E{e.numero} {e.titulo}
                        </Link>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const ROTULO: Record<Material['tipo'], string> = {
  documentacao: 'Documentação',
  tutorial: 'Tutorial',
  livro: 'Livro',
  simulado: 'Simulado',
  video: 'Vídeo',
  artigo: 'Artigo',
  ferramenta: 'Ferramenta',
  curso: 'Curso',
};

export function Materiais() {
  const perfil = usePerfil()!;
  const grupos = Object.entries(GRUPOS) as [Material['grupo'], (typeof GRUPOS)[Material['grupo']]][];
  return (
    <div className="pagina materiais">
      <h1 className="titulo-pagina">Materiais</h1>
      <p className="subtitulo-pagina">
        O que vale ter aberto numa aba enquanto você estuda para a {PROVAS[perfil.prova].codigo}. Cada episódio ainda indica o
        material específico do assunto.
      </p>
      {grupos.map(([g, info]) => {
        const itens = MATERIAIS.filter((m) => m.grupo === g && (!m.provas || m.provas.includes(perfil.prova)));
        if (itens.length === 0) return null;
        return (
          <section key={g} className="materiais-grupo">
            <div className="materiais-grupo-cabeca">
              <h2>{info.titulo}</h2>
              <p>{info.texto}</p>
            </div>
            <div className="recursos">
              {itens.map((m) => (
                <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer" className="recurso">
                  <span className="recurso-tipo">
                    {ROTULO[m.tipo]}
                    {!m.gratuito && ', pago'}
                  </span>
                  <strong>{m.titulo}</strong>
                  <span className="recurso-porque">{m.porque}</span>
                  <span className="recurso-dominio">
                    {new URL(m.url).hostname.replace(/^www\./, '')} <ArrowSquareOutIcon size={14} />
                  </span>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
