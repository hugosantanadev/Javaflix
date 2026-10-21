import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenTextIcon,
  BugBeetleIcon,
  CheckCircleIcon,
  CheckIcon,
  CodeIcon,
  FireIcon,
  LightbulbIcon,
  ListChecksIcon,
  PlayIcon,
  RobotIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { Arte } from '../components/Arte';
import { Codigo } from '../components/Codigo';
import { Depuracao } from '../components/Depuracao';
import { Markdown } from '../components/Markdown';
import { BotaoReportar, DicaDaQuestao, Questao, rotuloTipo } from '../components/Questao';
import { RecursosAgrupados } from '../components/Recursos';
import { VideoDrive } from '../components/VideoDrive';
import { getCargo, getEpisodio, getTemporadaDoEpisodio } from '../content/catalogo';
import { PROVAS, type EpisodioConteudo, type Exercicio } from '../content/types';
import { VIDEOS } from '../content/videos';
import { episodioDisponivel, exerciciosDoEpisodio, useTemporada } from '../lib/conteudo';
import { indiceDoMarkdown } from '../lib/markdown';
import { episodioDesbloqueado, episodioSeguinte, estadoTemporada, motivoDoBloqueio } from '../lib/progresso';
import { estaCerta, respostaVazia, type Resposta } from '../lib/respostas';
import { sfx } from '../lib/sfx';
import { bonusCombo, estadoOfensiva, useProgresso, usePerfil, useStore } from '../lib/store';

type Fase = 'aula' | 'exercicios' | 'desafio' | 'depuracao' | 'creditos';

export function Assistir() {
  const { episodioId = '' } = useParams();
  const meta = getEpisodio(episodioId);
  const temporada = getTemporadaDoEpisodio(episodioId);
  const carga = useTemporada(temporada?.id);
  const perfil = usePerfil()!;
  const progresso = useProgresso();

  if (!meta || !temporada) return <Aviso titulo="Episódio não encontrado" texto="Esse endereço não corresponde a nenhum episódio." />;
  const bloqueio = motivoDoBloqueio(meta, progresso, perfil);
  if (bloqueio) return <Aviso titulo={bloqueio.titulo} texto={bloqueio.texto} />;
  if (carga.status === 'indisponivel')
    return <Aviso titulo="Em breve" texto="Essa temporada ainda não foi gerada. Veja docs/GERAR_TEMPORADA.md para gerar." />;
  if (carga.status === 'erro') return <Aviso titulo="Não deu para carregar" texto={carga.erro} />;
  if (carga.status === 'carregando') return <div className="carregando-tela" aria-busy />;

  const ep = carga.dados.episodios.find((e) => e.id === episodioId);
  if (!ep) return <Aviso titulo="Episódio não encontrado" texto="O conteúdo da temporada não tem esse episódio." />;
  return <Player key={ep.id} ep={ep} />;
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="pagina aviso-pagina">
      <h1 className="titulo-pagina">{titulo}</h1>
      <p className="subtitulo-pagina">{texto}</p>
      <Link to="/" className="btn btn-play" style={{ marginTop: 28 }}>
        Voltar ao início
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Player({ ep }: { ep: EpisodioConteudo }) {
  const meta = getEpisodio(ep.id)!;
  const temporada = getTemporadaDoEpisodio(ep.id)!;
  const cargo = getCargo(temporada.cargo)!;
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const [params, setParams] = useSearchParams();
  const exercicios = useMemo(() => exerciciosDoEpisodio(ep, perfil.prova), [ep, perfil.prova]);
  const sessao = progresso.sessoes[ep.id];
  const concluido = !!progresso.episodios[ep.id]?.concluidoEm;

  const faseInicial = (): Fase => {
    const f = params.get('fase') as Fase | null;
    if (f === 'aula' || f === 'exercicios' || f === 'desafio' || f === 'depuracao') return f;
    if (!progresso.aulas[ep.id]) return 'aula';
    if (concluido) return 'aula';
    return 'exercicios';
  };
  const [fase, setFaseInterna] = useState<Fase>(faseInicial);
  const setFase = useCallback(
    (f: Fase) => {
      setFaseInterna(f);
      const p = new URLSearchParams(params);
      if (f === 'aula') p.delete('fase');
      else p.set('fase', f);
      setParams(p, { replace: true, preventScrollReset: true });
      requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    },
    [params, setParams],
  );

  const respondidas = sessao ? sessao.resultados.filter((r) => r !== null).length : 0;
  const total = exercicios.length;
  const pct = concluido ? 1 : (progresso.aulas[ep.id] ? 0.2 : 0) + (total ? (respondidas / total) * 0.8 : 0);

  return (
    <div className="player" style={{ '--cor': cargo.cor, '--fundo': cargo.fundo } as CSSProperties}>
      <header className="player-barra">
        <Link to={`/?t=${temporada.id}`} className="player-voltar" aria-label="Voltar para a temporada">
          <ArrowLeftIcon size={26} weight="bold" />
        </Link>
        <div className="player-titulo">
          <span>
            {cargo.titulo}, T{temporada.numero}:E{meta.numero}
          </span>
          <strong>{meta.titulo}</strong>
        </div>
        <nav className="player-abas" aria-label="Partes do episódio">
          <button type="button" className={fase === 'aula' ? 'ativa' : ''} onClick={() => setFase('aula')}>
            <BookOpenTextIcon size={18} /> Aula
          </button>
          <button
            type="button"
            className={fase === 'exercicios' || fase === 'creditos' ? 'ativa' : ''}
            onClick={() => setFase(concluido && respondidas === total ? 'creditos' : 'exercicios')}
          >
            <ListChecksIcon size={18} /> Exercícios <span className="player-aba-num">{respondidas}/{total}</span>
          </button>
          {ep.desafio && (
            <button type="button" className={fase === 'desafio' ? 'ativa' : ''} onClick={() => setFase('desafio')}>
              <CodeIcon size={18} /> Desafio
              {progresso.desafios[ep.id] && <CheckIcon size={14} weight="bold" className="ok" />}
            </button>
          )}
          {!!ep.bugs?.length && (
            <button type="button" className={fase === 'depuracao' ? 'ativa' : ''} onClick={() => setFase('depuracao')}>
              <BugBeetleIcon size={18} /> Depuração{' '}
              <span className="player-aba-num">
                {ep.bugs.filter((b) => progresso.bugs?.[b.id]).length}/{ep.bugs.length}
              </span>
            </button>
          )}
        </nav>
      </header>
      <div className="player-trilho" aria-hidden>
        <span style={{ width: `${pct * 100}%` }} />
        <i style={{ left: `${pct * 100}%` }} />
      </div>

      {fase === 'aula' && <FaseAula ep={ep} total={total} irExercicios={() => setFase('exercicios')} />}
      {fase === 'exercicios' && <FaseExercicios ep={ep} exercicios={exercicios} aoTerminar={() => setFase('creditos')} />}
      {fase === 'desafio' && ep.desafio && <FaseDesafio ep={ep} />}
      {fase === 'depuracao' && !!ep.bugs?.length && <Depuracao ep={ep} />}
      {fase === 'creditos' && (
        <Creditos ep={ep} total={total} refazer={() => setFase('exercicios')} irDesafio={ep.desafio ? () => setFase('desafio') : undefined} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aula                                                                */
/* ------------------------------------------------------------------ */



/**
 * Índice lateral que acompanha a leitura: destaca a seção em que você está e
 * marca as que já passaram. O cálculo roda no máximo a cada 80 ms durante o
 * scroll e só lê a posição de uns poucos títulos.
 */
function IndiceAula({ itens }: { itens: { id: string; titulo: string }[] }) {
  const [ativo, setAtivo] = useState(itens[0]?.id);
  const lista = useRef<HTMLOListElement>(null);
  const chave = itens.map((i) => i.id).join('|');

  useEffect(() => {
    const alvos = itens.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!alvos.length) return;
    const LIMITE = 150;
    const recalcular = () => {
      let atual = alvos[0].id;
      for (const el of alvos) if (el.getBoundingClientRect().top <= LIMITE) atual = el.id;
      // no fim da página, a última seção pode nunca chegar ao topo
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) atual = alvos[alvos.length - 1].id;
      setAtivo(atual);
    };
    let espera: number | null = null;
    const agendar = () => {
      if (espera !== null) return;
      espera = window.setTimeout(() => {
        espera = null;
        recalcular();
      }, 80);
    };
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    recalcular();
    return () => {
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
      if (espera !== null) window.clearTimeout(espera);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  // mantém o item ativo visível dentro do índice, sem rolar a página
  useEffect(() => {
    const ol = lista.current;
    const item = ol?.querySelector<HTMLElement>('a.ativo');
    if (!ol || !item) return;
    const caixa = ol.parentElement!;
    const topo = item.offsetTop - caixa.clientHeight / 3;
    caixa.scrollTo({ top: Math.max(0, topo), behavior: 'smooth' });
  }, [ativo]);

  const iAtivo = itens.findIndex((i) => i.id === ativo);
  return (
    <nav className="aula-indice" aria-label="Neste episódio">
      <span className="aula-lateral-titulo">Neste episódio</span>
      <ol ref={lista} style={{ '--progresso': itens.length > 1 ? iAtivo / (itens.length - 1) : 0 } as CSSProperties}>
        {itens.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={i === iAtivo ? 'ativo' : i < iAtivo ? 'lido' : ''}
              aria-current={i === iAtivo ? 'location' : undefined}
            >
              {h.titulo}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function FaseAula({ ep, total, irExercicios }: { ep: EpisodioConteudo; total: number; irExercicios: () => void }) {
  const meta = getEpisodio(ep.id)!;
  const temporada = getTemporadaDoEpisodio(ep.id)!;
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const marcarAula = useStore((s) => s.marcarAula);
  const fim = useRef<HTMLDivElement>(null);
  const indice = useMemo(() => indiceDoMarkdown(ep.aula), [ep.aula]);
  const videos = VIDEOS.filter((v) => v.episodios.includes(ep.id));
  const [todosVideos, setTodosVideos] = useState(false);
  const vista = !!progresso.aulas[ep.id];

  useEffect(() => {
    const el = fim.current;
    if (!el || vista) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        marcarAula(ep.id);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ep.id, vista, marcarAula]);

  return (
    <article className="aula">
      <header className="aula-cabeca">
        <Arte temporada={temporada} formato="banner" titulo={false} glifo={`E${meta.numero}`} />
        <div className="aula-cabeca-vinheta" />
        <div className="aula-cabeca-texto surgir">
          <span className="hero-cargo">
            Temporada {temporada.numero}: {temporada.titulo}
          </span>
          <h1>{meta.titulo}</h1>
          <div className="hero-meta">
            <span>{ep.minutos} min de leitura</span>
            <span>{total} exercícios</span>
            {meta.provas.map((p) => (
              <span key={p} className={`chip-prova ${p === perfil.prova ? 'minha' : ''}`}>
                {PROVAS[p].codigo}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="aula-grade">
        <aside className="aula-lateral">
          <IndiceAula
            itens={[
              ...indice,
              { id: 'armadilhas', titulo: 'Armadilhas de prova' },
              ...(ep.ia ? [{ id: 'ia', titulo: 'IA na prática' }] : []),
              ...(videos.length > 0 ? [{ id: 'videos', titulo: 'Reforço em vídeo' }] : []),
              { id: 'recursos', titulo: 'Para ir além' },
            ]}
          />
          <button type="button" className="btn btn-accent aula-lateral-cta" onClick={irExercicios}>
            <ListChecksIcon size={20} weight="bold" /> Ir aos exercícios
          </button>
        </aside>

        <div className="aula-texto">
          <Markdown texto={ep.aula} className="md-aula" />

          <section id="armadilhas" className="aula-bloco">
            <h2>Armadilhas de prova</h2>
            <ul className="armadilhas">
              {ep.armadilhas.map((a, i) => (
                <li key={i}>
                  <WarningIcon size={20} weight="fill" />
                  <Markdown texto={a} />
                </li>
              ))}
            </ul>
          </section>

          {ep.ia && (
            <section id="ia" className="aula-bloco">
              <h2>IA na prática</h2>
              <div className="ia-uso">
                <RobotIcon size={22} weight="duotone" />
                <Markdown texto={ep.ia.uso} />
              </div>
              <h3 className="ia-titulo">Peça assim</h3>
              <div className="ia-pedido">
                <Markdown texto={'```text\n' + ep.ia.pedido + '\n```'} className="md-aula" />
              </div>
              <div className="ia-colunas">
                <div>
                  <h3 className="ia-titulo">Onde a IA costuma errar</h3>
                  <ul className="ia-lista ia-erros">
                    {ep.ia.erros.map((e, i) => (
                      <li key={i}>
                        <XCircleIcon size={20} weight="fill" />
                        <Markdown texto={e} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="ia-titulo">Como conferir</h3>
                  <ul className="ia-lista ia-conferir">
                    {ep.ia.conferir.map((c, i) => (
                      <li key={i}>
                        <CheckCircleIcon size={20} weight="fill" />
                        <Markdown texto={c} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {videos.length > 0 && (
            <section id="videos" className="aula-bloco">
              <h2>Reforço em vídeo</h2>
              <p className="aula-bloco-texto">
                {videos.length === 1 ? 'Uma aula' : `${videos.length} aulas`} do seu curso sobre o mesmo assunto. Use quando o texto não
                bastar.
              </p>
              <div className="videos-lista">
                {videos.slice(0, todosVideos ? undefined : 3).map((v) => (
                  <VideoDrive key={v.driveId} video={v} />
                ))}
              </div>
              {videos.length > 3 && !todosVideos && (
                <button type="button" className="btn btn-linha btn-sm videos-mais" onClick={() => setTodosVideos(true)}>
                  Ver mais {videos.length - 3} {videos.length - 3 === 1 ? 'vídeo' : 'vídeos'}
                </button>
              )}
            </section>
          )}

          <section id="recursos" className="aula-bloco">
            <h2>Para ir além</h2>
            <p className="aula-bloco-texto">
              Material escolhido para este assunto: a fonte oficial, artigos, vídeos e o capítulo certo dos livros.
            </p>
            <RecursosAgrupados recursos={ep.recursos} />
          </section>

          <div ref={fim} className="aula-fim">
            <div>
              <strong>Aula concluída{vista ? '' : '?'}</strong>
              <span>Agora são {total} exercícios. A cada acerto seguido, o bônus de sequência aumenta.</span>
            </div>
            <button type="button" className="btn btn-play btn-lg" onClick={() => (marcarAula(ep.id), irExercicios())}>
              <PlayIcon size={24} weight="fill" /> Começar exercícios
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Exercícios                                                          */
/* ------------------------------------------------------------------ */

function FaseExercicios({ ep, exercicios, aoTerminar }: { ep: EpisodioConteudo; exercicios: Exercicio[]; aoTerminar: () => void }) {
  const progresso = useProgresso();
  const iniciar = useStore((s) => s.iniciarSessao);
  const responder = useStore((s) => s.responderNoEpisodio);
  const avancar = useStore((s) => s.avancarSessao);
  const concluir = useStore((s) => s.concluirEpisodio);
  const sessao = progresso.sessoes[ep.id];
  const pronta = !!sessao && sessao.resultados.length === exercicios.length;

  useEffect(() => {
    if (!pronta || (sessao && sessao.resultados.every((r) => r !== null))) iniciar(ep.id, exercicios.length, !!sessao && pronta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primeiroAberto = sessao ? sessao.resultados.findIndex((r) => r === null) : 0;
  const [indice, setIndice] = useState(Math.max(0, primeiroAberto));
  const [resposta, setResposta] = useState<Resposta | null>(null);
  const [confirmada, setConfirmada] = useState<null | { certo: boolean; ganho: number }>(null);
  const [comDica, setComDica] = useState(false);
  const palco = useRef<HTMLDivElement>(null);

  const q = exercicios[indice];
  const combo = sessao?.combo ?? 0;
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!confirmada) return;
    const t = window.setTimeout(() => feedbackRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 120);
    return () => window.clearTimeout(t);
  }, [confirmada]);

  const confirmar = useCallback(() => {
    if (!q || confirmada || respostaVazia(resposta)) return;
    const certo = estaCerta(q, resposta!);
    const ganho = responder(ep.id, q.id, indice, certo, q.tipo, comDica);
    if (certo) sfx.certo((sessao?.combo ?? 0) + 1);
    else sfx.errado();
    setConfirmada({ certo, ganho });
  }, [q, confirmada, resposta, responder, ep.id, indice, sessao?.combo, comDica]);

  const seguir = useCallback(() => {
    if (!confirmada) return;
    const s = useStore.getState();
    const atual = s.ativo ? s.progresso[s.ativo]?.sessoes[ep.id] : undefined;
    const proximo = atual ? atual.resultados.findIndex((r, i) => r === null && i > indice) : -1;
    const qualquer = atual ? atual.resultados.findIndex((r) => r === null) : -1;
    const alvo = proximo >= 0 ? proximo : qualquer;
    if (alvo < 0) {
      concluir(ep.id);
      sfx.conclusao();
      aoTerminar();
      return;
    }
    avancar(ep.id, alvo);
    setIndice(alvo);
    setResposta(null);
    setConfirmada(null);
    setComDica(false);
    palco.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [confirmada, ep.id, indice, concluir, aoTerminar, avancar]);

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      const alvo = e.target as HTMLElement;
      const emTexto = !!alvo.closest('textarea');
      if (emTexto && !(e.ctrlKey || e.metaKey)) return;
      if (alvo.closest('button') && !alvo.closest('.opcao, .codigo')) return;
      e.preventDefault();
      if (confirmada) seguir();
      else confirmar();
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [confirmada, confirmar, seguir]);

  if (!q || !sessao) return <div className="carregando-tela" aria-busy />;

  const certosAteAqui = sessao.resultados.filter((r) => r === true).length;
  const explicacaoCorreta = confirmada && (
    <div ref={feedbackRef} className={`feedback ${confirmada.certo ? 'certo' : 'errado'}`} role="status">
      <div className="feedback-cabeca">
        <span className="feedback-icone">{confirmada.certo ? <CheckIcon size={22} weight="bold" /> : <XIcon size={22} weight="bold" />}</span>
        <strong>{confirmada.certo ? fraseAcerto(sessao.combo) : 'Não foi dessa vez'}</strong>
        {confirmada.ganho > 0 && <span className="feedback-xp">+{confirmada.ganho} XP</span>}
        {confirmada.certo && comDica && <span className="feedback-revisao">Com dica: sem XP nesta questão</span>}
        {!confirmada.certo && <span className="feedback-revisao">Volta amanhã na sua revisão</span>}
      </div>
      <Markdown texto={q.explicacao} className="feedback-texto" />
    </div>
  );

  return (
    <div className="exercicios" ref={palco}>
      <div className="exercicios-topo">
        <ol className="pontos" aria-label="Progresso dos exercícios">
          {sessao.resultados.map((r, i) => (
            <li key={i} className={`${r === true ? 'certo' : r === false ? 'errado' : ''} ${i === indice ? 'atual' : ''}`}>
              <span className="sr-only">
                Exercício {i + 1}: {r === true ? 'certo' : r === false ? 'errado' : 'não respondido'}
              </span>
            </li>
          ))}
        </ol>
        <div className="exercicios-status">
          <span>
            {certosAteAqui} certos de {sessao.resultados.filter((r) => r !== null).length}
          </span>
          {combo >= 2 && (
            <span className="combo" key={combo}>
              <FireIcon size={16} weight="fill" /> Sequência de {combo}
              {bonusCombo(combo + 1) > 0 && <em>próximo acerto +{10 + bonusCombo(combo + 1)} XP</em>}
            </span>
          )}
        </div>
      </div>

      <div className="exercicio-cartao" key={q.id}>
        <div className="exercicio-meta">
          <span className="exercicio-num">
            {indice + 1}
            <small>/{exercicios.length}</small>
          </span>
          <span className="etiqueta">{rotuloTipo(q)}</span>
          <span className="dificuldade" aria-label={`Dificuldade ${q.dificuldade} de 3`}>
            {[1, 2, 3].map((d) => (
              <i key={d} className={d <= q.dificuldade ? 'on' : ''} />
            ))}
          </span>
        </div>
        <Questao q={q} resposta={resposta} mudar={setResposta} revelada={!!confirmada} travada={!!confirmada} />
        {q.dica && !confirmada && <DicaDaQuestao dica={q.dica} aberta={comDica} abrir={() => setComDica(true)} />}
        {explicacaoCorreta}
      </div>

      <div className="exercicio-acoes">
        <BotaoReportar exercicioId={q.id} />
        <div className="exercicio-acoes-dir">
          {!confirmada && (
            <span className="exercicio-atalho">
              <span className="kbd">{q.tipo === 'saida' ? 'Ctrl + Enter' : 'Enter'}</span> confirma
            </span>
          )}
          {confirmada ? (
            <button type="button" className="btn btn-play btn-lg" onClick={seguir} autoFocus>
              {sessao.resultados.some((r, i) => r === null && i !== indice) ? 'Continuar' : 'Ver resultado'}
              <ArrowRightIcon size={22} weight="bold" />
            </button>
          ) : (
            <button type="button" className="btn btn-accent btn-lg" onClick={confirmar} disabled={respostaVazia(resposta)}>
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function fraseAcerto(combo: number) {
  if (combo >= 10) return 'Imparável';
  if (combo >= 6) return `${combo} seguidas`;
  if (combo >= 3) return 'Sequência quente';
  return 'Certo';
}

/* ------------------------------------------------------------------ */
/* Desafio                                                             */
/* ------------------------------------------------------------------ */

function FaseDesafio({ ep }: { ep: EpisodioConteudo }) {
  const d = ep.desafio!;
  const [dicas, setDicas] = useState(0);
  const [solucao, setSolucao] = useState(false);
  const progresso = useProgresso();
  const concluir = useStore((s) => s.concluirDesafio);
  const feito = !!progresso.desafios[ep.id];

  return (
    <div className="desafio">
      <div className="desafio-cabeca">
        <span className="hero-cargo">Desafio de código</span>
        <h1>{d.titulo}</h1>
        <p>Resolva na sua IDE ou no terminal. Depois compare com a solução comentada.</p>
      </div>
      <Markdown texto={d.enunciado} className="desafio-enunciado" />

      <div className="desafio-dicas">
        {d.dicas.slice(0, dicas).map((t, i) => (
          <div key={i} className="dica surgir">
            <LightbulbIcon size={20} weight="fill" />
            <Markdown texto={t} />
          </div>
        ))}
        {dicas < d.dicas.length && (
          <button type="button" className="btn btn-linha btn-sm" onClick={() => setDicas((n) => n + 1)}>
            <LightbulbIcon size={18} /> {dicas === 0 ? 'Quero uma dica' : 'Mais uma dica'} ({d.dicas.length - dicas} restantes)
          </button>
        )}
      </div>

      {!solucao ? (
        <button type="button" className="btn btn-ghost" onClick={() => setSolucao(true)}>
          <CodeIcon size={20} /> Ver a solução
        </button>
      ) : (
        <div className="desafio-solucao surgir">
          <h2>Solução</h2>
          <Codigo codigo={d.solucao} />
          {d.saida && (
            <figure className="md-saida">
              <figcaption>Saída (sem argumentos)</figcaption>
              <pre>{d.saida}</pre>
            </figure>
          )}
          <Markdown texto={d.comentarios} />
        </div>
      )}

      <div className="desafio-fim">
        {feito ? (
          <span className="etiqueta ok">
            <CheckIcon size={14} weight="bold" /> Desafio resolvido
          </span>
        ) : (
          <button type="button" className="btn btn-accent" onClick={() => concluir(ep.id)}>
            <CheckIcon size={20} weight="bold" /> Resolvi o desafio
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Créditos                                                            */
/* ------------------------------------------------------------------ */

function Creditos({ ep, total, refazer, irDesafio }: { ep: EpisodioConteudo; total: number; refazer: () => void; irDesafio?: () => void }) {
  const meta = getEpisodio(ep.id)!;
  const temporada = getTemporadaDoEpisodio(ep.id)!;
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const iniciar = useStore((s) => s.iniciarSessao);
  const nav = useNavigate();
  const sessao = progresso.sessoes[ep.id];
  const acertos = sessao ? sessao.resultados.filter((r) => r === true).length : 0;
  const pct = total ? acertos / total : 0;
  const prox = episodioSeguinte(ep.id, perfil.prova);
  const proxDisponivel = !!prox && episodioDisponivel(prox.id) && episodioDesbloqueado(prox, progresso, perfil);
  const proxTemporada = prox ? getTemporadaDoEpisodio(prox.id)! : null;
  const st = estadoTemporada(temporada, progresso, perfil.prova);
  const mostrarProva = st.provaLiberada && !st.provaAprovada;
  const { dias, status } = estadoOfensiva(progresso.ofensiva);
  const [contagem, setContagem] = useState(perfil.config.autoplay && proxDisponivel && !mostrarProva ? 10 : -1);

  useEffect(() => {
    if (contagem < 0) return;
    if (contagem === 0) {
      nav(`/assistir/${prox!.id}`);
      return;
    }
    const t = window.setTimeout(() => setContagem((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [contagem, nav, prox]);

  const frase = pct === 1 ? 'Gabaritou.' : pct >= 0.8 ? 'Mandou bem.' : pct >= 0.6 ? 'Bom episódio.' : 'Esse pede revisão.';

  return (
    <div className="creditos surgir">
      <div className="creditos-placar">
        <div className="placar-anel" style={{ '--pct': pct } as CSSProperties}>
          <strong>{acertos}</strong>
          <span>de {total}</span>
        </div>
        <div className="creditos-texto">
          <span className="hero-cargo">
            T{temporada.numero}:E{meta.numero} concluído
          </span>
          <h1>{frase}</h1>
          <ul className="creditos-numeros">
            <li>
              <strong>+{sessao?.xp ?? 0}</strong> XP nos exercícios
            </li>
            <li>
              <strong>{sessao?.melhorCombo ?? 0}</strong> melhor sequência
            </li>
            <li>
              <strong>
                <FireIcon size={18} weight={status === 'feita' ? 'fill' : 'regular'} /> {dias}
              </strong>
              {dias === 1 ? 'dia' : 'dias'} de ofensiva{status === 'feita' ? ', meta de hoje feita' : ''}
            </li>
          </ul>
          <div className="creditos-acoes">
            <button
              type="button"
              className="btn btn-linha"
              onClick={() => {
                iniciar(ep.id, total, true);
                refazer();
              }}
            >
              Refazer exercícios
            </button>
            {irDesafio && !progresso.desafios[ep.id] && (
              <button type="button" className="btn btn-ghost" onClick={irDesafio}>
                <CodeIcon size={20} /> Desafio de código
              </button>
            )}
          </div>
        </div>
      </div>

      {mostrarProva ? (
        <div className="proximo">
          <span className="proximo-rotulo">Fim da temporada</span>
          <div className="proximo-cartao">
            <Arte temporada={temporada} titulo={false} glifo="?" />
            <div>
              <strong>Prova da temporada {temporada.numero}</strong>
              <p>Questões inéditas no formato da certificação, com cronômetro. Aprovação com 68%.</p>
              <Link to={`/prova/${temporada.id}`} className="btn btn-play">
                Fazer a prova
              </Link>
            </div>
          </div>
        </div>
      ) : prox && proxTemporada ? (
        <div className="proximo">
          <span className="proximo-rotulo">Próximo episódio</span>
          <div className="proximo-cartao">
            <Arte temporada={proxTemporada} titulo={false} glifo={`E${prox.numero}`} />
            <div>
              <strong>
                T{proxTemporada.numero}:E{prox.numero} {prox.titulo}
              </strong>
              {proxDisponivel ? (
                <>
                  {contagem > 0 && (
                    <p className="proximo-contagem">
                      Começa em <strong>{contagem}</strong>s
                    </p>
                  )}
                  <div className="proximo-acoes">
                    <button type="button" className="btn btn-play" onClick={() => nav(`/assistir/${prox.id}`)}>
                      <PlayIcon size={20} weight="fill" /> Assistir agora
                    </button>
                    {contagem > 0 && (
                      <button type="button" className="btn btn-linha" onClick={() => setContagem(-1)}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <p>Em breve. A próxima temporada ainda não foi gerada.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
