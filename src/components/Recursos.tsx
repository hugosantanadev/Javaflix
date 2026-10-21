import { ArrowSquareOutIcon, BookmarkSimpleIcon, BookOpenTextIcon, FileTextIcon, PlayCircleIcon, WrenchIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';
import type { Recurso } from '../content/types';

interface Grupo {
  id: string;
  titulo: string;
  tipos: Recurso['tipo'][];
  Icone: ComponentType<{ size?: number; weight?: 'regular' | 'bold' | 'fill' | 'duotone' }>;
}

const GRUPOS: Grupo[] = [
  { id: 'oficial', titulo: 'Documentação oficial', tipos: ['documentacao'], Icone: BookmarkSimpleIcon },
  { id: 'artigos', titulo: 'Artigos e tutoriais', tipos: ['artigo', 'tutorial'], Icone: FileTextIcon },
  { id: 'videos', titulo: 'Vídeos', tipos: ['video'], Icone: PlayCircleIcon },
  { id: 'livros', titulo: 'Livros', tipos: ['livro'], Icone: BookOpenTextIcon },
  { id: 'pratica', titulo: 'Para praticar', tipos: ['ferramenta', 'simulado', 'curso'], Icone: WrenchIcon },
];

const ROTULO: Record<Recurso['tipo'], string> = {
  documentacao: 'Oficial',
  tutorial: 'Tutorial',
  artigo: 'Artigo',
  video: 'Vídeo',
  livro: 'Livro',
  ferramenta: 'Ferramenta',
  simulado: 'Simulado',
  curso: 'Curso',
};

function dominio(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** Material externo do episódio, separado por tipo, com idioma e onde ler. */
export function RecursosAgrupados({ recursos }: { recursos: Recurso[] }) {
  return (
    <div className="recursos-grupos">
      {GRUPOS.map((g) => {
        const itens = recursos.filter((r) => g.tipos.includes(r.tipo));
        if (!itens.length) return null;
        return (
          <section key={g.id} className="recursos-grupo">
            <h3>
              <g.Icone size={18} weight="bold" /> {g.titulo}
            </h3>
            <div className="recursos">
              {itens.map((r) => (
                <a key={r.url + r.titulo} href={r.url} target="_blank" rel="noopener noreferrer" className={`recurso ${r.nivel === 'fundo' ? 'fundo' : ''}`}>
                  <span className="recurso-tipo">
                    {ROTULO[r.tipo]}
                    <span className={`recurso-idioma ${r.idioma}`}>{r.idioma === 'pt' ? 'PT' : 'EN'}</span>
                    {!r.gratuito && <span className="recurso-pago">pago</span>}
                    {r.nivel === 'fundo' && <span className="recurso-nivel">aprofundamento</span>}
                  </span>
                  <strong>{r.titulo}</strong>
                  {r.onde && <span className="recurso-onde">{r.onde}</span>}
                  <span className="recurso-porque">{r.porque}</span>
                  <span className="recurso-dominio">
                    {dominio(r.url)} <ArrowSquareOutIcon size={13} />
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
