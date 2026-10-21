import { InfoIcon, PlayIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getCargo } from '../content/catalogo';
import { PROVAS, type EpisodioMeta, type TemporadaMeta } from '../content/types';
import { useTemporada } from '../lib/conteudo';
import { destacarLinhas } from '../lib/destaque';
import { estadoEpisodio, estadoTemporada, provasDe } from '../lib/progresso';
import { useProgresso, usePerfil } from '../lib/store';

function prefereMenosMovimento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Digita o texto aos poucos, como um trailer. Sem animação para quem pediu menos movimento. */
function useDigitacao(texto: string, cps = 38) {
  const [n, setN] = useState(() => (prefereMenosMovimento() ? texto.length : 0));
  useEffect(() => {
    if (prefereMenosMovimento()) {
      setN(texto.length);
      return;
    }
    setN(0);
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= texto.length) window.clearInterval(t);
    }, 1000 / cps);
    return () => window.clearInterval(t);
  }, [texto, cps]);
  return n;
}

function trailerPadrao(t: TemporadaMeta) {
  return [
    `// ${t.titulo}`,
    ...t.episodios.slice(0, 5).map((e) => `episodio(${e.numero}, "${e.titulo}");`),
    t.episodios.length > 5 ? '// ...' : '',
  ]
    .filter(Boolean)
    .join('\n');
}

function Trailer({ temporada }: { temporada: TemporadaMeta }) {
  const carga = useTemporada(temporada.id);
  const codigo = useMemo(() => {
    if (carga.status !== 'ok') return trailerPadrao(temporada);
    for (const ep of carga.dados.episodios) {
      const m = /```java[^\n]*\n([\s\S]*?)```/.exec(ep.aula);
      if (m && m[1].split('\n').length <= 14) return m[1].trimEnd();
    }
    return trailerPadrao(temporada);
  }, [carga, temporada]);
  const n = useDigitacao(codigo);
  const visivel = codigo.slice(0, n);
  const linhas = destacarLinhas(visivel || ' ');
  return (
    <pre className="hero-trailer" aria-hidden>
      <code>
        {linhas.map((l, i) => (
          <span key={i} className="hero-trailer-linha">
            <span dangerouslySetInnerHTML={{ __html: l || ' ' }} />
            {i === linhas.length - 1 && <span className="cursor" />}
            {'\n'}
          </span>
        ))}
      </code>
    </pre>
  );
}

interface HeroProps {
  temporada: TemporadaMeta;
  episodio: EpisodioMeta | null;
}

export function Hero({ temporada, episodio }: HeroProps) {
  const cargo = getCargo(temporada.cargo)!;
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const nav = useNavigate();
  const [, setParams] = useSearchParams();
  const st = estadoTemporada(temporada, progresso, perfil.prova);
  const ep = episodio ?? st.relevantes[0] ?? temporada.episodios[0];
  const ee = estadoEpisodio(ep, progresso, perfil.prova);
  const provas = provasDe(temporada);
  const continuar = ee.pct > 0 && !ee.concluido;

  return (
    <section className="hero" style={{ '--cor': cargo.cor, '--fundo': cargo.fundo } as CSSProperties}>
      <div className="hero-fundo" aria-hidden>
        <div className="hero-luz" />
        <div className="hero-glifo">{temporada.glifo}</div>
        <Trailer temporada={temporada} />
      </div>
      <div className="hero-vinheta" aria-hidden />
      <div className="hero-conteudo surgir">
        <div className="hero-sobre">
          <span className="hero-cargo">{cargo.titulo}</span>
          <span className="hero-temporada">Temporada {temporada.numero}</span>
        </div>
        <h1 className="hero-titulo">{temporada.titulo}</h1>
        <div className="hero-meta">
          {provas.length > 0 ? (
            provas.map((p) => (
              <span key={p} className={`chip-prova ${p === perfil.prova ? 'minha' : ''}`}>
                {PROVAS[p].codigo}
              </span>
            ))
          ) : (
            <span className="chip-prova">Mercado</span>
          )}
          <span>{temporada.episodios.length} episódios</span>
          {st.disponivel && <span>{Math.round(st.pct * 100)}% assistido</span>}
        </div>
        <p className="hero-sinopse">{temporada.sinopse}</p>
        {continuar && (
          <div className="hero-continuar">
            <div className="barra-progresso">
              <span style={{ width: `${ee.pct * 100}%` }} />
            </div>
            <span>
              T{temporada.numero}:E{ep.numero} {ep.titulo}
            </span>
          </div>
        )}
        <div className="hero-acoes">
          {st.disponivel ? (
            <button type="button" className="btn btn-play btn-lg" onClick={() => nav(`/assistir/${ep.id}`)}>
              <PlayIcon size={26} weight="fill" />
              {continuar ? 'Continuar' : ee.concluido ? 'Rever' : 'Assistir'}
              <span className="hero-ep">
                T{temporada.numero}:E{ep.numero}
              </span>
            </button>
          ) : (
            <span className="etiqueta">Em breve</span>
          )}
          <button type="button" className="btn btn-ghost btn-lg" onClick={() => setParams({ t: temporada.id }, { preventScrollReset: true })}>
            <InfoIcon size={26} weight="bold" />
            Mais informações
          </button>
        </div>
      </div>
    </section>
  );
}
