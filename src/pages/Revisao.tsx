import { ArrowRightIcon, CheckIcon, XIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Markdown } from '../components/Markdown';
import { BotaoReportar, DicaDaQuestao, Questao, rotuloTipo } from '../components/Questao';
import { getEpisodio, getTemporada } from '../content/catalogo';
import { indexarQuestoes, useTodas } from '../lib/conteudo';
import { dataCurta, diaLocal, somarDias } from '../lib/datas';
import { estaCerta, respostaVazia, type Resposta } from '../lib/respostas';
import { sfx } from '../lib/sfx';
import { revisoesPendentes, useProgresso, useStore } from '../lib/store';

const CAIXAS = ['Novas', '3 dias', '7 dias', '16 dias', '35 dias'];

export function Revisao() {
  const progresso = useProgresso();
  const todas = useTodas();
  const [sessao, setSessao] = useState<string[] | null>(null);
  const indice = useMemo(() => (todas.status === 'ok' ? indexarQuestoes(todas.dados) : null), [todas]);
  const pendentes = revisoesPendentes(progresso).filter((id) => indice?.has(id) ?? true);
  const hoje = diaLocal();
  const proximos = Array.from({ length: 7 }, (_, i) => {
    const d = somarDias(hoje, i + 1);
    return { dia: d, n: Object.values(progresso.revisao).filter((r) => r.proxima === d).length };
  });
  const porCaixa = CAIXAS.map((_, i) => Object.values(progresso.revisao).filter((r) => r.caixa === i).length);

  if (sessao && indice) return <SessaoRevisao ids={sessao} indice={indice} sair={() => setSessao(null)} />;

  return (
    <div className="pagina revisao">
      <h1 className="titulo-pagina">Revisão</h1>
      <p className="subtitulo-pagina">
        Toda questão que você erra volta aqui no dia seguinte. Acertou, ela some por mais tempo: 3, 7, 16 e 35 dias. Errou de novo,
        recomeça. É o jeito mais barato de fixar o que a prova cobra.
      </p>

      <div className="revisao-painel">
        <div className="revisao-hoje">
          <span className="revisao-num">{pendentes.length}</span>
          <span>{pendentes.length === 1 ? 'questão para hoje' : 'questões para hoje'}</span>
          <button
            type="button"
            className="btn btn-play btn-lg"
            disabled={pendentes.length === 0 || !indice}
            onClick={() => setSessao(pendentes.slice(0, 20))}
          >
            {pendentes.length > 20 ? 'Revisar 20 agora' : 'Começar revisão'}
          </button>
          {pendentes.length === 0 && <p className="revisao-vazio">Nada pendente. Erre com orgulho nos episódios que a fila enche.</p>}
        </div>
        <div className="revisao-caixas">
          <span className="rotulo">Onde estão suas questões</span>
          <ol>
            {CAIXAS.map((c, i) => (
              <li key={c}>
                <strong>{porCaixa[i]}</strong>
                <span>{c}</span>
              </li>
            ))}
          </ol>
          <span className="rotulo">Próximos 7 dias</span>
          <ol className="revisao-semana">
            {proximos.map((p) => (
              <li key={p.dia}>
                <i style={{ height: `${Math.min(100, p.n * 12)}%` }} />
                <strong>{p.n}</strong>
                <span>{dataCurta(p.dia)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function SessaoRevisao({ ids, indice, sair }: { ids: string[]; indice: ReturnType<typeof indexarQuestoes>; sair: () => void }) {
  const responder = useStore((s) => s.responderRevisao);
  const [i, setI] = useState(0);
  const [resposta, setResposta] = useState<Resposta | null>(null);
  const [res, setRes] = useState<boolean | null>(null);
  const [comDica, setComDica] = useState(false);
  const [placar, setPlacar] = useState({ certos: 0, xp: 0 });
  const item = indice.get(ids[i]);

  const confirmar = useCallback(() => {
    if (!item || res !== null || respostaVazia(resposta)) return;
    const certo = estaCerta(item.q, resposta!);
    const xp = responder(item.q.id, certo, comDica);
    certo ? sfx.certo() : sfx.errado();
    setRes(certo);
    setPlacar((p) => ({ certos: p.certos + (certo ? 1 : 0), xp: p.xp + xp }));
  }, [item, res, resposta, responder, comDica]);

  const seguir = useCallback(() => {
    setI((x) => x + 1);
    setResposta(null);
    setRes(null);
    setComDica(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      const alvo = e.target as HTMLElement;
      if (alvo.closest('textarea') && !(e.ctrlKey || e.metaKey)) return;
      if (alvo.closest('button') && !alvo.closest('.opcao, .codigo')) return;
      e.preventDefault();
      if (res !== null) seguir();
      else confirmar();
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [res, confirmar, seguir]);

  if (i >= ids.length || !item) {
    return (
      <div className="pagina revisao">
        <div className="creditos surgir">
          <div className="creditos-placar">
            <div className="placar-anel" style={{ '--pct': ids.length ? placar.certos / ids.length : 0 } as React.CSSProperties}>
              <strong>{placar.certos}</strong>
              <span>de {ids.length}</span>
            </div>
            <div className="creditos-texto">
              <span className="hero-cargo">Revisão concluída</span>
              <h1>{placar.certos === ids.length ? 'Tudo no lugar.' : 'Fila atualizada.'}</h1>
              <p>+{placar.xp} XP. As certas foram para a próxima caixa; as erradas voltam amanhã.</p>
              <div className="creditos-acoes">
                <button type="button" className="btn btn-play" onClick={sair}>
                  Voltar
                </button>
                <Link to="/" className="btn btn-linha">
                  Início
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ep = item.episodioId ? getEpisodio(item.episodioId) : null;
  const t = getTemporada(item.temporadaId)!;

  return (
    <div className="pagina revisao exercicios">
      <div className="exercicios-topo">
        <ol className="pontos">
          {ids.map((id, k) => (
            <li key={id} className={`${k < i ? 'feito' : ''} ${k === i ? 'atual' : ''}`} />
          ))}
        </ol>
        <div className="exercicios-status">
          <span>
            Revisão {i + 1} de {ids.length}
          </span>
          <button type="button" className="btn btn-linha btn-sm" onClick={sair}>
            Sair
          </button>
        </div>
      </div>
      <div className="exercicio-cartao" key={item.q.id}>
        <div className="exercicio-meta">
          <span className="etiqueta">{rotuloTipo(item.q)}</span>
          <span className="revisao-origem">
            T{t.numero} {t.titulo}
            {ep ? `, E${ep.numero} ${ep.titulo}` : ', prova da temporada'}
          </span>
        </div>
        <Questao q={item.q} resposta={resposta} mudar={setResposta} revelada={res !== null} travada={res !== null} />
        {item.q.dica && res === null && <DicaDaQuestao dica={item.q.dica} aberta={comDica} abrir={() => setComDica(true)} />}
        {res !== null && (
          <div className={`feedback ${res ? 'certo' : 'errado'}`}>
            <div className="feedback-cabeca">
              <span className="feedback-icone">{res ? <CheckIcon size={22} weight="bold" /> : <XIcon size={22} weight="bold" />}</span>
              <strong>{res ? 'Fixou' : 'Volta amanhã'}</strong>
            </div>
            <Markdown texto={item.q.explicacao} className="feedback-texto" />
          </div>
        )}
      </div>
      <div className="exercicio-acoes">
        <BotaoReportar exercicioId={item.q.id} />
        <div className="exercicio-acoes-dir">
          {res !== null ? (
            <button type="button" className="btn btn-play btn-lg" onClick={seguir} autoFocus>
              Continuar <ArrowRightIcon size={22} weight="bold" />
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
