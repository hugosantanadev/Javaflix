import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import { Exame } from '../components/Exame';
import { CARGOS, getCargo, getTemporada } from '../content/catalogo';
import { PROVAS, type Exercicio, type Prova } from '../content/types';
import {
  cargoCompleto,
  exercicioNaProva,
  indexarQuestoes,
  questoesDaProva,
  TEMPORADAS_DISPONIVEIS,
  useTemporada,
  useTodas,
} from '../lib/conteudo';
import { estadoTemporada, pendenciasDaPromocao } from '../lib/progresso';
import { textoDaProva } from '../lib/notas';
import { embaralhar } from '../lib/respostas';
import { useProgresso, usePerfil, useStore } from '../lib/store';

function Carregando() {
  return <div className="carregando-tela" aria-busy />;
}

function Indisponivel({ titulo, texto }: { titulo: string; texto: string }) {
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

export function ProvaTemporada() {
  const { temporadaId = '' } = useParams();
  const meta = getTemporada(temporadaId);
  const carga = useTemporada(temporadaId);
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const registrar = useStore((s) => s.registrarExame);
  const nav = useNavigate();

  if (!meta) return <Indisponivel titulo="Prova não encontrada" texto="Essa temporada não existe." />;
  if (carga.status === 'carregando') return <Carregando />;
  if (carga.status !== 'ok') return <Indisponivel titulo="Em breve" texto="Essa temporada ainda não foi gerada." />;
  const st = estadoTemporada(meta, progresso, perfil.prova);
  if (!st.provaLiberada && !perfil.config.modoLivre)
    return (
      <Indisponivel
        titulo="Prova trancada"
        texto={`Conclua os ${st.relevantes.length} episódios da temporada para liberar a prova. Faltam ${st.relevantes.length - st.concluidos}.`}
      />
    );

  const questoes = questoesDaProva(carga.dados, perfil.prova);
  const cargo = getCargo(meta.cargo)!;
  return (
    <div className="pagina pagina-exame">
      <Exame
        chave={`prova-${meta.id}`}
        sobre={`${cargo.titulo}, temporada ${meta.numero}`}
        titulo={`Prova: ${meta.titulo}`}
        descricao={<p>Questões inéditas sobre tudo o que a temporada cobriu, escritas no estilo da {PROVAS[perfil.prova].codigo}.</p>}
        questoes={questoes}
        minutos={Math.ceil(questoes.length * 2.4)}
        aoEntregar={(r) => registrar('prova', meta.id, r)}
        notas={!!st.nota}
        aprovacao={st.nota ? 70 : undefined}
        extraIntro={st.nota && <p className="exame-nota">{textoDaProva(st.nota)}</p>}
        voltar={() => nav(`/?t=${meta.id}`)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

const N_AVALIACAO = 30;

export function Avaliacao() {
  const { cargoId = '' } = useParams();
  const cargo = getCargo(cargoId);
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const registrar = useStore((s) => s.registrarExame);
  const nav = useNavigate();
  const todas = useTodas();
  const [semente] = useState(() => Math.random());

  const questoes = useMemo(() => {
    if (!cargo || todas.status !== 'ok') return [];
    const ids = new Set(cargo.temporadas.map((t) => t.id));
    const idx = indexarQuestoes(todas.dados.filter((t) => ids.has(t.id)));
    const pool = [...idx.values()].filter((x) => exercicioNaProva(x.q, x.provasPadrao, perfil.prova)).map((x) => x.q);
    return embaralhar(pool, semente).slice(0, N_AVALIACAO);
  }, [cargo, todas, perfil.prova, semente]);

  if (!cargo) return <Indisponivel titulo="Cargo não encontrado" texto="Esse endereço não corresponde a nenhum cargo." />;
  if (cargo.id === 'reta-final') return <Navigate to="/simulado" replace />;
  if (!cargoCompleto(cargo.id))
    return (
      <Indisponivel
        titulo="Avaliação em breve"
        texto={`A avaliação de ${cargo.titulo} abre quando as ${cargo.temporadas.length} temporadas do cargo estiverem no ar.`}
      />
    );
  const promovido = !!progresso.promocoes[cargo.id];
  const pendencias = pendenciasDaPromocao(cargo, progresso, perfil);
  if (!promovido && pendencias.length)
    return <Indisponivel titulo="Avaliação bloqueada" texto={`Para fazer a avaliação de ${cargo.titulo}, falta ${pendencias.join(' e ')}.`} />;
  if (todas.status !== 'ok') return <Carregando />;

  const concluidas = cargo.temporadas.filter((t) => estadoTemporada(t, progresso, perfil.prova).completa).length;
  const antecipada = concluidas < cargo.temporadas.length;

  return (
    <div className="pagina pagina-exame">
      <Exame
        chave={`avaliacao-${cargo.id}`}
        sobre={promovido ? 'Você já foi promovido neste cargo' : antecipada ? 'Promoção antecipada' : 'Avaliação de desempenho'}
        titulo={`Promoção: ${cargo.titulo}`}
        descricao={
          <p>
            {N_AVALIACAO} questões sorteadas de todas as temporadas do cargo. Passou com 68%, você é promovido e o próximo cargo
            abre na sua carreira.
            {antecipada &&
              ` Você concluiu ${concluidas} de ${cargo.temporadas.length} temporadas. Se já domina o assunto, pode tentar a promoção antes.`}
          </p>
        }
        questoes={questoes}
        minutos={Math.ceil(questoes.length * 2.4)}
        aoEntregar={(r) => registrar('avaliacao', cargo.id, r)}
        voltar={() => nav('/trilha')}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Simulado() {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const registrar = useStore((s) => s.registrarSimulado);
  const nav = useNavigate();
  const todas = useTodas();
  const [prova, setProva] = useState<Prova>(perfil.prova);
  const [formato, setFormato] = useState<'completo' | 'rapido'>('completo');
  const [semente, setSemente] = useState(() => Math.random());
  const info = PROVAS[prova];

  const pool = useMemo(() => {
    if (todas.status !== 'ok') return [] as Exercicio[];
    const idx = indexarQuestoes(todas.dados);
    // o simulado imita a prova real: só questões de alternativa
    return [...idx.values()]
      .filter((x) => (x.q.tipo === 'escolha' || x.q.tipo === 'multipla') && x.provasPadrao.length > 0)
      .filter((x) => exercicioNaProva(x.q, x.provasPadrao, prova))
      .map((x) => x.q);
  }, [todas, prova]);

  const alvo = formato === 'completo' ? info.questoes : 20;
  const questoes = useMemo(() => {
    // dá preferência às mais difíceis e às de prova de temporada
    const peso = (q: Exercicio) => q.dificuldade + (q.id.includes('-prova-') ? 1 : 0) + semente;
    const ordenadas = embaralhar(pool, semente).sort((a, b) => peso(b) - peso(a));
    return embaralhar(ordenadas.slice(0, alvo), semente + 1);
  }, [pool, alvo, semente]);
  const minutos = formato === 'completo' ? info.minutos : Math.round((info.minutos / info.questoes) * 20);
  const parcial = questoes.length < alvo;
  const historico = progresso.simulados.filter((s) => s.prova === prova).slice(-5).reverse();
  const temporadasCert = CARGOS.filter((c) => c.trilha === 'certificacao').flatMap((c) => c.temporadas);
  const certTotal = temporadasCert.length;
  const certDisponiveis = temporadasCert.filter((t) => TEMPORADAS_DISPONIVEIS.some((d) => d.id === t.id)).length;

  if (todas.status !== 'ok') return <Carregando />;

  return (
    <div className="pagina pagina-exame">
      <Exame
        key={`${prova}-${formato}-${semente}`}
        chave={`simulado-${prova}-${formato}`}
        sobre="Reta final"
        titulo={`Simulado ${info.codigo}`}
        descricao={
          <>
            <p>
              No formato da prova real: enunciados longos, de 5 a 8 alternativas e o relógio correndo. A prova de verdade tem{' '}
              {info.questoes} questões em {info.minutos} minutos e aprova com {info.aprovacao}%. {info.resumo}
            </p>
            {!parcial && certDisponiveis < certTotal && (
              <p className="aviso-parcial">
                O banco cobre {certDisponiveis} de {certTotal} temporadas de certificação. Enquanto faltar temporada, o simulado
                só sorteia assuntos já gerados, então a nota vale como treino de ritmo, não como previsão da prova.
              </p>
            )}
            {parcial && (
              <p className="aviso-parcial">
                Ainda não há questões suficientes para um simulado completo: o banco tem {pool.length} questões de alternativa para a{' '}
                {info.codigo} nas {TEMPORADAS_DISPONIVEIS.length} temporada(s) já geradas. O simulado sai com {questoes.length}. Ele
                cresce sozinho conforme você gera temporadas.
              </p>
            )}
          </>
        }
        extraIntro={
          <div className="simulado-opcoes">
            <div className="campo">
              <span className="rotulo">Prova</span>
              <div className="segmentado">
                {(Object.keys(PROVAS) as Prova[]).map((p) => (
                  <button type="button" key={p} aria-pressed={p === prova} onClick={() => setProva(p)}>
                    {PROVAS[p].codigo}
                  </button>
                ))}
              </div>
            </div>
            <div className="campo">
              <span className="rotulo">Formato</span>
              <div className="segmentado">
                <button type="button" aria-pressed={formato === 'completo'} onClick={() => setFormato('completo')}>
                  Completo, {info.questoes} questões
                </button>
                <button type="button" aria-pressed={formato === 'rapido'} onClick={() => setFormato('rapido')}>
                  Rápido, 20 questões
                </button>
              </div>
            </div>
            {historico.length > 0 && (
              <div className="simulado-historico">
                <span className="rotulo">Últimos simulados</span>
                <ul>
                  {historico.map((s, i) => {
                    const pct = Math.round((s.acertos / s.total) * 100);
                    return (
                      <li key={i} className={pct >= info.aprovacao ? 'ok' : ''}>
                        <strong>{pct}%</strong> {s.acertos}/{s.total}, {new Date(s.em).toLocaleDateString('pt-BR')}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        }
        questoes={questoes}
        minutos={Math.max(5, minutos)}
        aprovacao={info.aprovacao}
        aoEntregar={(r) =>
          registrar({
            em: new Date().toISOString(),
            prova,
            acertos: r.acertos,
            total: r.total,
            segundos: r.segundos,
            aprovado: r.aprovado,
            erradas: r.erradas,
          })
        }
        voltar={() => {
          setSemente(Math.random());
          nav('/simulado');
        }}
      />
    </div>
  );
}
