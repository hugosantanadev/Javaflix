import { CaretDownIcon, CheckIcon, LockSimpleIcon, PlayIcon } from '@phosphor-icons/react';
import { useNavigate, useSearchParams } from 'react-router';
import { getCargo, getTemporadaDoEpisodio } from '../content/catalogo';
import { PROVAS, type EpisodioMeta, type TemporadaMeta } from '../content/types';
import {
  episodioDesbloqueado,
  estadoEpisodio,
  estadoTemporada,
  provasDe,
  temporadaDesbloqueada,
} from '../lib/progresso';
import { useProgresso, usePerfil } from '../lib/store';
import { Arte, ArteCargo } from './Arte';
import { ComPreview } from './Preview';

function ChipsProva({ provas }: { provas: string[] }) {
  const perfil = usePerfil()!;
  if (provas.length === 0) return <span className="chip-prova">Mercado</span>;
  return (
    <>
      {provas.map((p) => (
        <span key={p} className={`chip-prova ${p === perfil.prova ? 'minha' : ''}`}>
          {PROVAS[p as keyof typeof PROVAS].codigo.replace('1Z0-', '')}
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */

export function CardTemporada({ temporada }: { temporada: TemporadaMeta }) {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const [, setParams] = useSearchParams();
  const nav = useNavigate();
  const st = estadoTemporada(temporada, progresso, perfil.prova);
  const liberada = temporadaDesbloqueada(temporada, progresso, perfil);
  const cargo = getCargo(temporada.cargo)!;
  const abrir = () => setParams({ t: temporada.id }, { preventScrollReset: true });
  const proximo =
    st.relevantes.find((e) => !progresso.episodios[e.id]?.concluidoEm) ?? st.relevantes[0] ?? temporada.episodios[0];

  return (
    <ComPreview
      className="card"
      preview={() => (
        <div className="preview">
          <Arte temporada={temporada} />
          <div className="preview-corpo">
            <div className="preview-botoes">
              {st.disponivel && liberada ? (
                <button type="button" className="btn-redondo cheio" onClick={() => nav(`/assistir/${proximo.id}`)} aria-label="Assistir">
                  <PlayIcon size={20} weight="fill" />
                </button>
              ) : (
                <span className="btn-redondo" aria-hidden>
                  <LockSimpleIcon size={18} weight="bold" />
                </span>
              )}
              {st.completa && (
                <span className="btn-redondo" title="Temporada concluída">
                  <CheckIcon size={18} weight="bold" />
                </span>
              )}
              <button type="button" className="btn-redondo empurra" onClick={abrir} aria-label="Mais informações">
                <CaretDownIcon size={18} weight="bold" />
              </button>
            </div>
            <div className="preview-meta">
              {st.disponivel ? (
                <span className="preview-pct">{Math.round(st.pct * 100)}% assistido</span>
              ) : (
                <span className="etiqueta">Em breve</span>
              )}
              <ChipsProva provas={provasDe(temporada)} />
              <span>{temporada.episodios.length} ep.</span>
            </div>
            <p className="preview-titulo">
              {cargo.titulo}: {temporada.titulo}
            </p>
            <p className="preview-texto">{temporada.sinopse}</p>
          </div>
        </div>
      )}
    >
      <button type="button" className="card-botao" onClick={abrir} aria-label={`${temporada.titulo}, ${cargo.titulo}, temporada ${temporada.numero}`}>
        <Arte temporada={temporada} selo={`T${temporada.numero}`} />
        {!st.disponivel && <span className="card-faixa">Em breve</span>}
        {st.disponivel && !liberada && (
          <span className="card-cadeado">
            <LockSimpleIcon size={22} weight="fill" />
          </span>
        )}
        {st.completa && (
          <span className="card-check">
            <CheckIcon size={14} weight="bold" />
          </span>
        )}
        {st.iniciada && !st.completa && (
          <div className="barra-progresso card-barra">
            <span style={{ width: `${st.pct * 100}%` }} />
          </div>
        )}
      </button>
    </ComPreview>
  );
}

/* ------------------------------------------------------------------ */

export function CardEpisodio({ episodio, mostrarTemporada = true }: { episodio: EpisodioMeta; mostrarTemporada?: boolean }) {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const nav = useNavigate();
  const [, setParams] = useSearchParams();
  const t = getTemporadaDoEpisodio(episodio.id)!;
  const ee = estadoEpisodio(episodio, progresso, perfil.prova);
  const liberado = episodioDesbloqueado(episodio, progresso, perfil);
  const podeAssistir = ee.disponivel && liberado;
  const ir = () => (podeAssistir ? nav(`/assistir/${episodio.id}`) : setParams({ t: t.id }, { preventScrollReset: true }));
  const textura = [`// T${t.numero}:E${episodio.numero}`, ...episodio.tags.slice(0, 5).map((tag) => `import ${tag.replace(/\s+/g, '.')};`)];

  return (
    <ComPreview
      className="card"
      preview={() => (
        <div className="preview">
          <Arte temporada={t} glifo={`E${episodio.numero}`} textura={textura} titulo={false} />
          <div className="preview-corpo">
            <div className="preview-botoes">
              {podeAssistir ? (
                <button type="button" className="btn-redondo cheio" onClick={() => nav(`/assistir/${episodio.id}`)} aria-label="Assistir">
                  <PlayIcon size={20} weight="fill" />
                </button>
              ) : (
                <span className="btn-redondo">
                  <LockSimpleIcon size={18} weight="bold" />
                </span>
              )}
              {ee.concluido && (
                <span className="btn-redondo" title="Concluído">
                  <CheckIcon size={18} weight="bold" />
                </span>
              )}
              <button type="button" className="btn-redondo empurra" onClick={() => setParams({ t: t.id }, { preventScrollReset: true })} aria-label="Detalhes da temporada">
                <CaretDownIcon size={18} weight="bold" />
              </button>
            </div>
            <div className="preview-meta">
              <span className="preview-pct">
                T{t.numero}:E{episodio.numero}
              </span>
              <ChipsProva provas={episodio.provas} />
              {!ee.disponivel && <span className="etiqueta">Em breve</span>}
            </div>
            <p className="preview-titulo">{episodio.titulo}</p>
            <p className="preview-texto">
              {ee.concluido
                ? `Concluído com ${progresso.episodios[episodio.id]?.melhor ?? 0} de ${ee.total} acertos.`
                : ee.respondidas > 0
                  ? `${ee.respondidas} de ${ee.total} exercícios respondidos.`
                  : ee.aulaVista
                    ? 'Aula vista. Faltam os exercícios.'
                    : 'Aula curta, 15 exercícios e material extra.'}
            </p>
          </div>
        </div>
      )}
    >
      <button type="button" className="card-botao" onClick={ir} aria-label={`${episodio.titulo}, T${t.numero} E${episodio.numero}`}>
        <Arte temporada={t} glifo={`E${episodio.numero}`} textura={textura} titulo={false}>
          <div className="arte-rodape">
            {mostrarTemporada && <span className="arte-cargo">{t.titulo}</span>}
            <span className="arte-titulo menor">{episodio.titulo}</span>
          </div>
        </Arte>
        {!ee.relevante && <span className="card-faixa neutra">Fora da sua prova</span>}
        {ee.concluido && (
          <span className="card-check">
            <CheckIcon size={14} weight="bold" />
          </span>
        )}
        {ee.pct > 0 && !ee.concluido && (
          <div className="barra-progresso card-barra">
            <span style={{ width: `${ee.pct * 100}%` }} />
          </div>
        )}
      </button>
    </ComPreview>
  );
}

/* ------------------------------------------------------------------ */

export function CardTop10({ posicao, episodio }: { posicao: number; episodio: EpisodioMeta }) {
  const t = getTemporadaDoEpisodio(episodio.id)!;
  const [, setParams] = useSearchParams();
  const nav = useNavigate();
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const ee = estadoEpisodio(episodio, progresso, perfil.prova);
  const pode = ee.disponivel && episodioDesbloqueado(episodio, progresso, perfil);
  return (
    <button
      type="button"
      className="card-top10"
      onClick={() => (pode ? nav(`/assistir/${episodio.id}`) : setParams({ t: t.id }, { preventScrollReset: true }))}
      aria-label={`${posicao}º: ${episodio.titulo}`}
    >
      <span className="top10-numero" aria-hidden>
        {posicao}
      </span>
      <Arte temporada={t} formato="poster" glifo={t.glifo} titulo={false}>
        <div className="arte-rodape">
          <span className="arte-cargo">{getCargo(t.cargo)!.titulo}</span>
          <span className="arte-titulo menor">{episodio.titulo}</span>
        </div>
        {!ee.disponivel && <span className="card-faixa">Em breve</span>}
      </Arte>
    </button>
  );
}

/* ------------------------------------------------------------------ */

export function CardCargo({ cargoId, bloqueado, onClick }: { cargoId: string; bloqueado: boolean; onClick: () => void }) {
  const cargo = getCargo(cargoId)!;
  return (
    <button type="button" className="card-poster" onClick={onClick} aria-label={cargo.titulo}>
      <ArteCargo cargoId={cargoId}>
        {bloqueado && (
          <span className="card-cadeado">
            <LockSimpleIcon size={22} weight="fill" />
          </span>
        )}
      </ArteCargo>
    </button>
  );
}
