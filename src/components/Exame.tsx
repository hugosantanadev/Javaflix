import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkSimpleIcon,
  CaretDownIcon,
  CheckIcon,
  ClockIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Exercicio } from '../content/types';
import { formatarTempo } from '../lib/datas';
import { fmtNota, pontuar } from '../lib/notas';
import { embaralhar, estaCerta, respostaVazia, type Resposta } from '../lib/respostas';
import { sfx } from '../lib/sfx';
import { Markdown } from './Markdown';
import { BotaoReportar, Questao, rotuloTipo } from './Questao';

export interface ResultadoExame {
  acertos: number;
  total: number;
  pct: number;
  aprovado: boolean;
  segundos: number;
  erradas: string[];
}

interface ExameProps {
  /** Chave para salvar a tentativa em andamento (sessionStorage). */
  chave: string;
  titulo: string;
  sobre: string;
  descricao: ReactNode;
  questoes: Exercicio[];
  minutos: number;
  aprovacao?: number;
  aoEntregar: (r: ResultadoExame) => void;
  voltar: () => void;
  extraIntro?: ReactNode;
  /** Sistema de notas: múltipla escolha com nota parcial, ordem sorteada a cada tentativa e resultado de 0 a 10. */
  notas?: boolean;
}

interface Tentativa {
  ids: string[];
  respostas: Record<string, Resposta>;
  marcadas: string[];
  inicio: number;
  entregue?: ResultadoExame;
}

function lerTentativa(chave: string): Tentativa | null {
  try {
    const t = sessionStorage.getItem(`javaflix:exame:${chave}`);
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}

function salvarTentativa(chave: string, t: Tentativa | null) {
  try {
    if (t) sessionStorage.setItem(`javaflix:exame:${chave}`, JSON.stringify(t));
    else sessionStorage.removeItem(`javaflix:exame:${chave}`);
  } catch {
    /* modo privado: segue sem salvar */
  }
}

export function Exame({ chave, titulo, sobre, descricao, questoes, minutos, aprovacao = 68, aoEntregar, voltar, extraIntro, notas = false }: ExameProps) {
  const [tentativa, setTentativa] = useState<Tentativa | null>(() => {
    const t = lerTentativa(chave);
    if (t && t.ids.every((id) => questoes.some((q) => q.id === id))) return t;
    return null;
  });

  useEffect(() => salvarTentativa(chave, tentativa), [chave, tentativa]);

  const porId = useMemo(() => new Map(questoes.map((q) => [q.id, q])), [questoes]);

  if (!tentativa) {
    return (
      <div className="exame-intro surgir">
        <button type="button" className="exame-voltar" onClick={voltar}>
          <ArrowLeftIcon size={20} weight="bold" /> Voltar
        </button>
        <span className="hero-cargo">{sobre}</span>
        <h1 className="titulo-pagina">{titulo}</h1>
        <div className="exame-intro-texto">{descricao}</div>
        <dl className="exame-ficha">
          <div>
            <dt>Questões</dt>
            <dd>{questoes.length}</dd>
          </div>
          <div>
            <dt>Tempo</dt>
            <dd>{minutos} min</dd>
          </div>
          <div>
            <dt>Aprovação</dt>
            <dd>{notas ? `média ${fmtNota(aprovacao / 10)}` : `${aprovacao}%`}</dd>
          </div>
        </dl>
        <ul className="exame-regras">
          <li>Sem gabarito durante a prova: você só vê o resultado no final.</li>
          <li>Dá para pular, voltar e marcar questões para revisar antes de entregar.</li>
          <li>Quando o tempo acaba, a prova é entregue com o que estiver respondido.</li>
          <li>Questões erradas entram na sua fila de revisão.</li>
        </ul>
        {extraIntro}
        <button
          type="button"
          className="btn btn-play btn-lg"
          disabled={questoes.length === 0}
          onClick={() => {
            const ids = questoes.map((q) => q.id);
            setTentativa({ ids: notas ? embaralhar(ids) : ids, respostas: {}, marcadas: [], inicio: Date.now() });
          }}
        >
          Começar agora
        </button>
      </div>
    );
  }

  if (tentativa.entregue) {
    return (
      <ResultadoTela
        titulo={titulo}
        resultado={tentativa.entregue}
        aprovacao={aprovacao}
        notas={notas}
        questoes={tentativa.ids.map((id) => porId.get(id)!).filter(Boolean)}
        respostas={tentativa.respostas}
        refazer={() => setTentativa(null)}
        voltar={() => {
          setTentativa(null);
          voltar();
        }}
      />
    );
  }

  return (
    <Prova
      titulo={titulo}
      tentativa={tentativa}
      setTentativa={setTentativa}
      porId={porId}
      minutos={minutos}
      entregar={(t) => {
        const qs = t.ids.map((id) => porId.get(id)!);
        const erradas = qs.filter((q) => !t.respostas[q.id] || !estaCerta(q, t.respostas[q.id])).map((q) => q.id);
        const acertos = qs.length - erradas.length;
        // com notas, a múltipla escolha meio certa conta pela metade
        const pontos = notas ? qs.reduce((a, q) => a + pontuar(q, t.respostas[q.id] ?? null), 0) : acertos;
        const pct = qs.length ? Math.round((pontos / qs.length) * 100) : 0;
        const r: ResultadoExame = {
          acertos,
          total: qs.length,
          pct,
          aprovado: pct >= aprovacao,
          segundos: Math.round((Date.now() - t.inicio) / 1000),
          erradas,
        };
        if (r.aprovado) sfx.conclusao();
        aoEntregar(r);
        setTentativa({ ...t, entregue: r });
        window.scrollTo({ top: 0 });
      }}
    />
  );
}

/* ------------------------------------------------------------------ */

function Prova({
  titulo,
  tentativa,
  setTentativa,
  porId,
  minutos,
  entregar,
}: {
  titulo: string;
  tentativa: Tentativa;
  setTentativa: (t: Tentativa) => void;
  porId: Map<string, Exercicio>;
  minutos: number;
  entregar: (t: Tentativa) => void;
}) {
  const [indice, setIndice] = useState(0);
  const [agora, setAgora] = useState(Date.now());
  const [confirmando, setConfirmando] = useState(false);
  const [grade, setGrade] = useState(false);
  const limite = tentativa.inicio + minutos * 60_000;
  const restante = Math.max(0, (limite - agora) / 1000);
  const id = tentativa.ids[indice];
  const q = porId.get(id)!;
  const respondidas = tentativa.ids.filter((x) => !respostaVazia(tentativa.respostas[x] ?? null)).length;

  useEffect(() => {
    const t = window.setInterval(() => setAgora(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (restante <= 0) entregar(tentativa);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restante <= 0]);

  const mudar = useCallback(
    (r: Resposta) => setTentativa({ ...tentativa, respostas: { ...tentativa.respostas, [id]: r } }),
    [tentativa, id, setTentativa],
  );

  const marcada = tentativa.marcadas.includes(id);

  return (
    <div className="prova">
      <header className="prova-barra">
        <strong className="prova-titulo">{titulo}</strong>
        <span className={`prova-relogio ${restante < 300 ? 'urgente' : ''}`} aria-label="Tempo restante">
          <ClockIcon size={18} weight="bold" /> {formatarTempo(restante)}
        </span>
        <button type="button" className="btn btn-accent btn-sm" onClick={() => setConfirmando(true)}>
          Entregar
        </button>
      </header>

      <div className="prova-grade-layout">
        <div className="prova-palco">
          <div className="exercicio-cartao" key={id}>
            <div className="exercicio-meta">
              <span className="exercicio-num">
                {indice + 1}
                <small>/{tentativa.ids.length}</small>
              </span>
              <span className="etiqueta">{rotuloTipo(q)}</span>
              {marcada && (
                <span className="etiqueta accent">
                  <BookmarkSimpleIcon size={12} weight="fill" /> Revisar
                </span>
              )}
            </div>
            <Questao q={q} resposta={tentativa.respostas[id] ?? null} mudar={mudar} revelada={false} travada={false} />
          </div>
          <div className="prova-nav">
            <button type="button" className="btn btn-linha" disabled={indice === 0} onClick={() => setIndice((i) => i - 1)}>
              <ArrowLeftIcon size={18} weight="bold" /> Anterior
            </button>
            <button
              type="button"
              className={`btn ${marcada ? 'btn-ghost' : 'btn-linha'}`}
              onClick={() =>
                setTentativa({
                  ...tentativa,
                  marcadas: marcada ? tentativa.marcadas.filter((x) => x !== id) : [...tentativa.marcadas, id],
                })
              }
            >
              <BookmarkSimpleIcon size={18} weight={marcada ? 'fill' : 'regular'} /> {marcada ? 'Marcada' : 'Marcar'}
            </button>
            {indice < tentativa.ids.length - 1 ? (
              <button type="button" className="btn btn-play" onClick={() => setIndice((i) => i + 1)}>
                Próxima <ArrowRightIcon size={18} weight="bold" />
              </button>
            ) : (
              <button type="button" className="btn btn-accent" onClick={() => setConfirmando(true)}>
                Revisar e entregar
              </button>
            )}
          </div>
        </div>

        <aside className={`prova-mapa ${grade ? 'aberto' : ''}`}>
          <button type="button" className="prova-mapa-toggle" onClick={() => setGrade((g) => !g)}>
            {respondidas} de {tentativa.ids.length} respondidas <CaretDownIcon size={14} weight="bold" />
          </button>
          <div className="prova-mapa-grade">
            {tentativa.ids.map((x, i) => {
              const r = !respostaVazia(tentativa.respostas[x] ?? null);
              const m = tentativa.marcadas.includes(x);
              return (
                <button
                  type="button"
                  key={x}
                  className={`${r ? 'respondida' : ''} ${m ? 'marcada' : ''} ${i === indice ? 'atual' : ''}`}
                  onClick={() => {
                    setIndice(i);
                    setGrade(false);
                  }}
                  aria-label={`Questão ${i + 1}${r ? ', respondida' : ''}${m ? ', marcada' : ''}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="prova-mapa-legenda">
            <span>
              <i className="respondida" /> Respondida
            </span>
            <span>
              <i className="marcada" /> Marcada
            </span>
          </div>
        </aside>
      </div>

      {confirmando && (
        <div className="modal-fundo leve" onClick={() => setConfirmando(false)}>
          <div className="modal-pequeno" onClick={(e) => e.stopPropagation()}>
            <h3>Entregar a prova?</h3>
            <p className="modal-pequeno-texto">
              {respondidas < tentativa.ids.length
                ? `Faltam ${tentativa.ids.length - respondidas} questões sem resposta. Elas contam como erradas.`
                : 'Todas as questões estão respondidas.'}
              {tentativa.marcadas.length > 0 && ` Você marcou ${tentativa.marcadas.length} para revisar.`}
            </p>
            <div className="modal-pequeno-acoes">
              <button type="button" className="btn btn-linha btn-sm" onClick={() => setConfirmando(false)}>
                Continuar a prova
              </button>
              <button type="button" className="btn btn-accent btn-sm" onClick={() => entregar(tentativa)}>
                Entregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ResultadoTela({
  titulo,
  resultado,
  aprovacao,
  questoes,
  respostas,
  refazer,
  voltar,
  notas,
}: {
  titulo: string;
  resultado: ResultadoExame;
  aprovacao: number;
  notas: boolean;
  questoes: Exercicio[];
  respostas: Record<string, Resposta>;
  refazer: () => void;
  voltar: () => void;
}) {
  const [aberta, setAberta] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<'todas' | 'erradas'>('erradas');
  const lista = filtro === 'erradas' ? questoes.filter((q) => resultado.erradas.includes(q.id)) : questoes;

  return (
    <div className="resultado surgir">
      <div className={`resultado-placar ${resultado.aprovado ? 'aprovado' : 'reprovado'}`}>
        <div className="placar-anel grande" style={{ '--pct': resultado.pct / 100 } as React.CSSProperties}>
          <strong>{notas ? fmtNota(resultado.pct / 10) : `${resultado.pct}%`}</strong>
          <span>
            {resultado.acertos} de {resultado.total}
          </span>
          <i className="placar-corte" style={{ '--corte': aprovacao / 100 } as React.CSSProperties} />
        </div>
        <div>
          <span className="hero-cargo">{titulo}</span>
          <h1>{notas ? (resultado.aprovado ? 'Boa prova' : 'Prova abaixo de 7') : resultado.aprovado ? 'Aprovado' : 'Ainda não'}</h1>
          <p>
            {notas
              ? `Nota ${fmtNota(resultado.pct / 10)} na prova, que vale 50% da média da temporada. Fica a maior nota entre as tentativas.`
              : resultado.aprovado
              ? `Passou da linha de ${aprovacao}%. As questões erradas foram para a sua revisão.`
              : `Faltaram ${Math.max(1, Math.ceil((aprovacao / 100) * resultado.total) - resultado.acertos)} acertos para os ${aprovacao}%. Revise as explicações abaixo e tente de novo.`}
          </p>
          <span className="resultado-tempo">
            <ClockIcon size={16} /> {formatarTempo(resultado.segundos)} usados
          </span>
          <div className="creditos-acoes">
            <button type="button" className="btn btn-play" onClick={voltar}>
              Voltar
            </button>
            <button type="button" className="btn btn-linha" onClick={refazer}>
              Fazer de novo
            </button>
          </div>
        </div>
      </div>

      <div className="resultado-lista-cabeca">
        <h2>Correção</h2>
        <div className="segmentado" role="tablist">
          <button type="button" role="tab" aria-selected={filtro === 'erradas'} onClick={() => setFiltro('erradas')}>
            Erradas ({resultado.erradas.length})
          </button>
          <button type="button" role="tab" aria-selected={filtro === 'todas'} onClick={() => setFiltro('todas')}>
            Todas ({questoes.length})
          </button>
        </div>
      </div>

      {lista.length === 0 && <p className="vazio-texto">Nenhuma questão errada. Bonito.</p>}
      <ol className="resultado-lista">
        {lista.map((q) => {
          const i = questoes.indexOf(q);
          const r = respostas[q.id] ?? null;
          const certa = !!r && estaCerta(q, r);
          const open = aberta === q.id;
          return (
            <li key={q.id} className={certa ? 'certa' : 'errada'}>
              <button type="button" className="resultado-item" onClick={() => setAberta(open ? null : q.id)} aria-expanded={open}>
                <span className="resultado-icone">{certa ? <CheckIcon size={16} weight="bold" /> : <XIcon size={16} weight="bold" />}</span>
                <span className="resultado-num">{i + 1}</span>
                <span className="resultado-resumo">{resumir(q.enunciado)}</span>
                <CaretDownIcon size={16} className={open ? 'virado' : ''} />
              </button>
              {open && (
                <div className="resultado-detalhe">
                  <Questao q={q} resposta={r} mudar={() => {}} revelada travada atalhos={false} />
                  <div className={`feedback ${certa ? 'certo' : 'errado'}`}>
                    <Markdown texto={q.explicacao} className="feedback-texto" />
                  </div>
                  <BotaoReportar exercicioId={q.id} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function resumir(md: string) {
  const t = md.replace(/`/g, '').replace(/\*\*/g, '').replace(/\n+/g, ' ');
  return t.length > 110 ? t.slice(0, 110).replace(/\s+\S*$/, '') + '…' : t;
}
