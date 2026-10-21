import type { CSSProperties, ReactNode } from 'react';
import { getCargo } from '../content/catalogo';
import type { TemporadaMeta } from '../content/types';

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Tamanho do glifo em cqw para caber ~85% da largura, limitado pela altura. */
function tamanhoGlifo(glifo: string, fator = 1) {
  const n = Math.max(glifo.length, 2);
  return Math.min(62, 141 / n) * fator;
}

/** O que a arte precisa saber: uma temporada, ou um projeto com a mesma forma. */
export type ArteFonte = Pick<TemporadaMeta, 'id' | 'cargo' | 'glifo' | 'titulo'> & { episodios?: TemporadaMeta['episodios'] };

interface ArteProps {
  temporada: ArteFonte;
  /** card 16:9, poster 2:3, banner largo */
  formato?: 'card' | 'poster' | 'banner';
  titulo?: boolean;
  /** Texto pequeno no topo (ex.: "T1:E2"). */
  selo?: string;
  /** Linhas de "código" ao fundo. */
  textura?: string[];
  glifo?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Arte procedural de temporada: cor do cargo, um glifo de código gigante e
 * uma textura de listagem. Cada temporada sorteia (por hash) uma composição.
 */
export function Arte({ temporada, formato = 'card', titulo = true, selo, textura, glifo, className = '', children }: ArteProps) {
  const cargo = getCargo(temporada.cargo)!;
  const g = glifo ?? temporada.glifo;
  const h = hash(temporada.id + (glifo ?? ''));
  const variante = h % 3;
  const linhas =
    textura ??
    (temporada.episodios ?? []).map((e) => `${String(e.numero).padStart(2, '0')}  ${e.titulo.toLowerCase().replace(/\s+/g, '_')}();`);
  const estilo = {
    '--cor': cargo.cor,
    '--fundo': cargo.fundo,
    '--g': `${tamanhoGlifo(g, formato === 'poster' ? 1.45 : 1)}cqw`,
    '--rot': `${(h % 7) - 3}deg`,
    '--luz-x': `${20 + (h % 60)}%`,
  } as CSSProperties;

  return (
    <div className={`arte arte-${formato} arte-v${variante} ${className}`} style={estilo} aria-hidden={!titulo}>
      <div className="arte-luz" />
      <pre className="arte-textura">{linhas.join('\n')}</pre>
      <div className="arte-glifo">{g}</div>
      {variante === 2 && <div className="arte-glifo eco">{g}</div>}
      {selo && <span className="arte-selo">{selo}</span>}
      {titulo && (
        <div className="arte-rodape">
          <span className="arte-cargo">{cargo.titulo}</span>
          <span className="arte-titulo">{temporada.titulo}</span>
        </div>
      )}
      {children}
    </div>
  );
}

interface ArteCargoProps {
  cargoId: string;
  className?: string;
  children?: ReactNode;
}

/** Pôster vertical de cargo, usado na trilha e na fileira de promoções. */
export function ArteCargo({ cargoId, className = '', children }: ArteCargoProps) {
  const cargo = getCargo(cargoId)!;
  const palavras = cargo.titulo.split(' ');
  return (
    <div
      className={`arte arte-poster arte-cargo ${className}`}
      style={{ '--cor': cargo.cor, '--fundo': cargo.fundo, '--g': '120cqw' } as CSSProperties}
    >
      <div className="arte-luz" />
      <div className="arte-glifo">{String(cargo.ordem).padStart(2, '0')}</div>
      <div className="arte-rodape">
        <span className="arte-cargo">{cargo.trilha === 'certificacao' ? 'Certificação' : 'Mercado'}</span>
        <span className="arte-titulo">
          {palavras.map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </span>
      </div>
      {children}
    </div>
  );
}
