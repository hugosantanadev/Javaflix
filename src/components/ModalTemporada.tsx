import {
  CaretDownIcon,
  CheckIcon,
  ExamIcon,
  LockSimpleIcon,
  PlayIcon,
  TrophyIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { getCargo, getTemporada } from '../content/catalogo';
import { PROVAS } from '../content/types';
import { cargoCompleto, exerciciosDoEpisodio, questoesDaProva, useTemporada } from '../lib/conteudo';
import { primeiroParagrafo } from '../lib/markdown';
import {
  episodioRelevante,
  estadoEpisodio,
  estadoTemporada,
  provasDe,
  temporadaDesbloqueada,
} from '../lib/progresso';
import { useProgresso, usePerfil } from '../lib/store';
import { Arte } from './Arte';

export function ModalTemporada() {
  const [params, setParams] = useSearchParams();
  const id = params.get('t');
  const temporada = id ? getTemporada(id) : undefined;
  const fechar = () => {
    const p = new URLSearchParams(params);
    p.delete('t');
    setParams(p, { preventScrollReset: true });
  };

  useEffect(() => {
    if (!temporada) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar();
    document.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = antes;
      document.removeEventListener('keydown', esc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temporada?.id]);

  if (!temporada) return null;
  return (
    <div className="modal-fundo" onClick={fechar}>
      <div className="modal" role="dialog" aria-modal aria-label={temporada.titulo} onClick={(e) => e.stopPropagation()}>
        <ConteudoModal key={temporada.id} temporadaId={temporada.id} fechar={fechar} trocar={(t) => setParams({ t }, { preventScrollReset: true })} />
      </div>
    </div>
  );
}

function ConteudoModal({ temporadaId, fechar, trocar }: { temporadaId: string; fechar: () => void; trocar: (id: string) => void }) {
  const temporada = getTemporada(temporadaId)!;
  const cargo = getCargo(temporada.cargo)!;
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const nav = useNavigate();
  const carga = useTemporada(temporada.id);
  const st = estadoTemporada(temporada, progresso, perfil.prova);
  const liberada = temporadaDesbloqueada(temporada, progresso, perfil);
  const podeAssistir = st.disponivel && liberada;
  const proximo = st.relevantes.find((e) => !progresso.episodios[e.id]?.concluidoEm) ?? st.relevantes[0] ?? temporada.episodios[0];
  const provas = provasDe(temporada);
  const ultima = cargo.temporadas[cargo.temporadas.length - 1]?.id === temporada.id;
  const [seletor, setSeletor] = useState(false);
  const topo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topo.current?.scrollIntoView({ block: 'start' });
  }, [temporadaId]);

  const dados = carga.status === 'ok' ? carga.dados : null;
  const nProva = dados ? questoesDaProva(dados, perfil.prova).length : 0;
  const regProva = progresso.provas[temporada.id];

  return (
    <>
      <div className="modal-topo" ref={topo}>
        <Arte temporada={temporada} formato="banner" titulo={false} />
        <div className="modal-topo-vinheta" />
        <button type="button" className="modal-fechar" onClick={fechar} aria-label="Fechar">
          <XIcon size={22} weight="bold" />
        </button>
        <div className="modal-topo-conteudo">
          <span className="hero-cargo">{cargo.titulo}</span>
          <h2 className="modal-titulo">{temporada.titulo}</h2>
          <div className="modal-acoes">
            {podeAssistir ? (
              <button type="button" className="btn btn-play" onClick={() => nav(`/assistir/${proximo.id}`)}>
                <PlayIcon size={22} weight="fill" /> {st.iniciada ? 'Continuar' : 'Assistir'} E{proximo.numero}
              </button>
            ) : !st.disponivel ? (
              <span className="etiqueta">Em breve</span>
            ) : (
              <span className="etiqueta">
                <LockSimpleIcon size={14} weight="fill" /> Exige promoção
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="modal-corpo">
        <div className="modal-info">
          <div>
            <div className="hero-meta">
              {st.disponivel && <span className="preview-pct">{Math.round(st.pct * 100)}% assistido</span>}
              <span>Temporada {temporada.numero}</span>
              <span>{temporada.episodios.length} episódios</span>
            </div>
            <p className="modal-sinopse">{temporada.sinopse}</p>
          </div>
          <dl className="modal-ficha">
            <div>
              <dt>Provas</dt>
              <dd>
                {provas.length
                  ? provas.map((p) => (
                      <span key={p} className={`chip-prova ${p === perfil.prova ? 'minha' : ''}`}>
                        {PROVAS[p].codigo}
                      </span>
                    ))
                  : 'Conteúdo de mercado, fora da certificação'}
              </dd>
            </div>
            <div>
              <dt>Cargo</dt>
              <dd>
                {cargo.titulo}, {cargo.foco.toLowerCase()}
              </dd>
            </div>
            <div>
              <dt>Seu progresso</dt>
              <dd>
                {st.concluidos} de {st.relevantes.length} episódios
                {st.provaAprovada ? ', prova aprovada' : ''}
              </dd>
            </div>
          </dl>
        </div>

        <div className="modal-episodios-cabeca">
          <h3>Episódios</h3>
          <div className="seletor-temporada">
            <button type="button" className="btn btn-linha btn-sm" onClick={() => setSeletor((s) => !s)} aria-expanded={seletor}>
              Temporada {temporada.numero} <CaretDownIcon size={14} weight="fill" />
            </button>
            {seletor && (
              <div className="menu">
                {cargo.temporadas.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    className={`menu-item ${t.id === temporada.id ? 'ativo' : ''}`}
                    onClick={() => {
                      setSeletor(false);
                      trocar(t.id);
                    }}
                  >
                    Temporada {t.numero}: {t.titulo}
                    <span className="menu-item-dica">{t.episodios.length} ep.</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <ol className="lista-episodios">
          {temporada.episodios.map((e) => {
            const ee = estadoEpisodio(e, progresso, perfil.prova);
            const conteudo = dados?.episodios.find((x) => x.id === e.id);
            const n = conteudo ? exerciciosDoEpisodio(conteudo, perfil.prova).length : 15;
            const relevante = episodioRelevante(e, perfil.prova);
            const clicavel = podeAssistir && ee.disponivel;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  className={`episodio-linha ${clicavel ? '' : 'inativa'} ${relevante ? '' : 'fora'}`}
                  onClick={() => clicavel && nav(`/assistir/${e.id}`)}
                  disabled={!clicavel}
                >
                  <span className="episodio-numero">{e.numero}</span>
                  <span className="episodio-thumb">
                    <Arte temporada={temporada} glifo={`E${e.numero}`} titulo={false} />
                    {clicavel && (
                      <span className="episodio-play">
                        <PlayIcon size={22} weight="fill" />
                      </span>
                    )}
                    {ee.pct > 0 && (
                      <span className="barra-progresso">
                        <span style={{ width: `${ee.pct * 100}%` }} />
                      </span>
                    )}
                  </span>
                  <span className="episodio-texto">
                    <span className="episodio-titulo">
                      {e.titulo}
                      <span className="episodio-duracao">
                        {conteudo ? `${conteudo.minutos} min de aula, ${n} exercícios` : `${n} exercícios`}
                      </span>
                    </span>
                    <span className="episodio-desc">
                      {!relevante && <em>Não cai na {PROVAS[perfil.prova].codigo}. </em>}
                      {conteudo ? primeiroParagrafo(conteudo.aula, 180) : st.disponivel ? 'Carregando…' : 'Em breve.'}
                    </span>
                  </span>
                  <span className="episodio-status">
                    {ee.concluido ? (
                      <CheckIcon size={20} weight="bold" className="ok" />
                    ) : !st.disponivel ? null : !liberada ? (
                      <LockSimpleIcon size={18} />
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {st.disponivel && (
          <div className={`bloco-prova ${st.provaAprovada ? 'aprovada' : ''}`}>
            <ExamIcon size={34} weight="duotone" />
            <div>
              <strong>Prova da temporada</strong>
              <span>
                {nProva} questões no formato da certificação, {Math.ceil(nProva * 2.4)} min. Aprovação com 68%.
                {regProva && ` Melhor nota: ${regProva.melhorPct}%.`}
              </span>
            </div>
            {st.provaLiberada || perfil.config.modoLivre ? (
              <Link to={`/prova/${temporada.id}`} className={`btn ${st.provaAprovada ? 'btn-linha' : 'btn-accent'} btn-sm`}>
                {st.provaAprovada ? 'Refazer' : regProva ? 'Tentar de novo' : 'Fazer a prova'}
              </Link>
            ) : (
              <span className="bloco-prova-trava">
                <LockSimpleIcon size={16} /> Conclua os episódios
              </span>
            )}
          </div>
        )}

        {ultima && cargo.trilha !== 'base' && (
          <div className="bloco-prova avaliacao">
            <TrophyIcon size={34} weight="duotone" />
            <div>
              <strong>Avaliação de desempenho: promoção de {cargo.titulo}</strong>
              <span>
                {cargoCompleto(cargo.id)
                  ? '30 questões de todas as temporadas do cargo. Passou com 68%, é promovido.'
                  : `Abre quando as ${cargo.temporadas.length} temporadas do cargo estiverem no ar.`}
              </span>
            </div>
            {cargoCompleto(cargo.id) && (
              <Link to={`/avaliacao/${cargo.id}`} className="btn btn-linha btn-sm">
                Ver avaliação
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
