import {
  ArrowLeftIcon,
  CaretDownIcon,
  CheckIcon,
  ClockIcon,
  CodeIcon,
  LightbulbIcon,
  LockSimpleIcon,
} from '@phosphor-icons/react';
import { useRef, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router';
import { Arte } from '../components/Arte';
import { Markdown, MarkdownInline } from '../components/Markdown';
import { CARGOS, getCargo } from '../content/catalogo';
import { getProjeto, PROJETOS } from '../content/projetos';
import type { EtapaProjeto, ProjetoMeta } from '../content/types';
import { projetoDisponivel, useProjeto } from '../lib/conteudo';
import { dataCurta } from '../lib/datas';
import { etapaDesbloqueada, motivoBloqueioProjeto } from '../lib/progresso';
import { useProgresso, usePerfil, useStore, XP } from '../lib/store';

const etapasConcluidas = (projetoId: string, etapas: Record<string, { concluidaEm?: string }> = {}) =>
  Object.entries(etapas).filter(([id, e]) => id.startsWith(`${projetoId}-s`) && e.concluidaEm).length;

const textura = (itens: string[]) => itens.map((t, i) => `${String(i + 1).padStart(2, '0')}  ${t.toLowerCase().replace(/[^\p{L}\d]+/gu, '_')}();`);

export function Projetos() {
  const progresso = useProgresso();
  const cargos = CARGOS.filter((c) => PROJETOS.some((p) => p.cargo === c.id));
  const concluidos = Object.keys(progresso.projetos ?? {}).length;
  const etapas = Object.values(progresso.etapas ?? {}).filter((e) => e.concluidaEm).length;

  return (
    <div className="pagina projetos">
      <header className="trilha-cabeca">
        <h1 className="titulo-pagina">Projetos</h1>
        <p className="subtitulo-pagina">
          Sistemas feitos do zero, do jeito que as vagas pedem. Cada projeto chega como um chamado de empresa, é dividido em etapas
          com critérios de aceite e termina com uma solução de referência para comparar. Ele abre quando você conclui as temporadas
          que ele usa, e os de um mesmo cargo vêm em sequência: no backend, primeiro uma API sem framework, depois um monolito, depois
          camadas e, no pleno, system design.
        </p>
        <div className="trilha-resumo">
          <div>
            <strong>
              {concluidos}/{PROJETOS.filter((p) => projetoDisponivel(p.id)).length}
            </strong>
            <span>projetos concluídos</span>
          </div>
          <div>
            <strong>{etapas}</strong>
            <span>etapas entregues</span>
          </div>
          <div>
            <strong>{XP.etapa} XP</strong>
            <span>por etapa, {XP.etapaComSolucao} se abrir a solução antes</span>
          </div>
          <div>
            <strong>+{XP.projeto} XP</strong>
            <span>ao concluir um projeto</span>
          </div>
        </div>
      </header>

      {cargos.map((c) => (
        <section key={c.id} className="projetos-cargo" style={{ '--cor': c.cor } as CSSProperties}>
          <div className="projetos-cargo-cabeca">
            <h2>{c.titulo}</h2>
            <span className="etiqueta">{c.trilha === 'mercado' ? 'Mercado' : 'Certificação'}</span>
          </div>
          <ol className="projetos-grade">
            {PROJETOS.filter((p) => p.cargo === c.id).map((pj) => (
              <CardProjeto key={pj.id} pj={pj} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function CardProjeto({ pj }: { pj: ProjetoMeta }) {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const disponivel = projetoDisponivel(pj.id);
  const motivo = motivoBloqueioProjeto(pj, progresso, perfil);
  const concluido = progresso.projetos?.[pj.id];
  const feitas = etapasConcluidas(pj.id, progresso.etapas);
  const aberto = disponivel && !motivo;

  const corpo = (
    <>
      <Arte temporada={pj} formato="card" titulo={false} selo={`Projeto ${pj.numero}`} textura={textura(pj.pratica)} />
      <div className="projeto-card-corpo">
        <h3>{pj.titulo}</h3>
        <p>{pj.resumo}</p>
        <ul className="projeto-chips">
          {pj.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="projeto-card-rodape">
          {!disponivel ? (
            <span className="etiqueta">Em breve</span>
          ) : concluido ? (
            <span className="etiqueta ok">
              <CheckIcon size={12} weight="bold" /> Concluído em {dataCurta(concluido)}
            </span>
          ) : motivo ? (
            <span className="projeto-trava">
              <LockSimpleIcon size={14} weight="fill" /> {motivo}
            </span>
          ) : (
            <span className="etiqueta accent">{feitas > 0 ? `${feitas} ${feitas === 1 ? 'etapa entregue' : 'etapas entregues'}` : 'Aberto'}</span>
          )}
          <span className="projeto-horas">
            <ClockIcon size={14} /> {pj.horas}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <li className={`projeto-card ${aberto ? '' : 'trancado'} ${concluido ? 'concluido' : ''}`}>
      {aberto ? (
        <Link to={`/projetos/${pj.id}`} className="projeto-card-link">
          {corpo}
        </Link>
      ) : (
        <div className="projeto-card-link">{corpo}</div>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */

export function Projeto() {
  const { projetoId = '' } = useParams();
  const pj = getProjeto(projetoId);
  const carga = useProjeto(pj?.id);
  const perfil = usePerfil()!;
  const progresso = useProgresso();

  if (!pj) return <Aviso titulo="Projeto não encontrado" texto="Esse endereço não corresponde a nenhum projeto." />;
  const motivo = motivoBloqueioProjeto(pj, progresso, perfil);
  if (motivo) return <Aviso titulo="Projeto bloqueado" texto={motivo} />;
  if (carga.status === 'indisponivel') return <Aviso titulo="Em breve" texto="Esse projeto ainda não foi escrito." />;
  if (carga.status === 'erro') return <Aviso titulo="Não deu para carregar" texto={carga.erro} />;
  if (carga.status === 'carregando') return <div className="carregando-tela" aria-busy />;

  return <PaginaProjeto key={pj.id} pj={pj} etapas={carga.dados.etapas} briefing={carga.dados.briefing} portfolio={carga.dados.portfolio} />;
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="pagina aviso-pagina">
      <h1 className="titulo-pagina">{titulo}</h1>
      <p className="subtitulo-pagina">{texto}</p>
      <Link to="/projetos" className="btn btn-play" style={{ marginTop: 28 }}>
        Ver os projetos
      </Link>
    </div>
  );
}

interface PaginaProps {
  pj: ProjetoMeta;
  etapas: EtapaProjeto[];
  briefing: string;
  portfolio: string;
}

function PaginaProjeto({ pj, etapas, briefing, portfolio }: PaginaProps) {
  const cargo = getCargo(pj.cargo)!;
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const feitas = etapas.filter((e) => progresso.etapas?.[e.id]?.concluidaEm).length;
  const concluido = progresso.projetos?.[pj.id];
  const pendente = etapas.find((e, i) => etapaDesbloqueada(etapas, i, progresso, perfil) && !progresso.etapas?.[e.id]?.concluidaEm);
  const [abertas, setAbertas] = useState<Set<string>>(() => new Set(pendente ? [pendente.id] : []));
  const refs = useRef(new Map<string, HTMLLIElement>());

  const alternar = (id: string) =>
    setAbertas((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const aoConcluir = (i: number) => {
    const proxima = etapas[i + 1];
    setAbertas((s) => {
      const n = new Set(s);
      n.delete(etapas[i].id);
      if (proxima) n.add(proxima.id);
      return n;
    });
    if (proxima) requestAnimationFrame(() => refs.current.get(proxima.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <div className="pagina projeto" style={{ '--cor': cargo.cor } as CSSProperties}>
      <Link to="/projetos" className="projeto-voltar">
        <ArrowLeftIcon size={16} /> Projetos
      </Link>
      <header className="projeto-hero">
        <Arte temporada={pj} formato="card" titulo={false} selo={`Projeto ${pj.numero}`} textura={textura(etapas.map((e) => e.titulo))} />
        <div className="projeto-hero-texto">
          <span className="projeto-hero-cargo">
            {cargo.titulo} · Projeto {pj.numero}
          </span>
          <h1>{pj.titulo}</h1>
          <p>{pj.resumo}</p>
          <dl className="projeto-ficha">
            <div>
              <dt>Tempo</dt>
              <dd>{pj.horas}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{pj.stack.join(', ')}</dd>
            </div>
            <div>
              <dt>Progresso</dt>
              <dd>{concluido ? `Concluído em ${dataCurta(concluido)}` : `${feitas} de ${etapas.length} etapas`}</dd>
            </div>
          </dl>
          <ul className="projeto-chips">
            {pj.pratica.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="projeto-barra" role="progressbar" aria-valuemin={0} aria-valuemax={etapas.length} aria-valuenow={feitas}>
            <span style={{ width: `${(feitas / etapas.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <section className="projeto-secao">
        <h2>O pedido</h2>
        <Markdown texto={briefing} className="md-projeto" />
      </section>

      <section className="projeto-secao">
        <h2>Etapas</h2>
        <ol className="etapas">
          {etapas.map((e, i) => (
            <Etapa
              key={e.id}
              ref={(el) => {
                if (el) refs.current.set(e.id, el);
                else refs.current.delete(e.id);
              }}
              pj={pj}
              etapas={etapas}
              i={i}
              aberta={abertas.has(e.id)}
              alternar={() => alternar(e.id)}
              aoConcluir={() => aoConcluir(i)}
            />
          ))}
        </ol>
      </section>

      <section className="projeto-secao">
        <h2>No portfólio</h2>
        <Markdown texto={portfolio} className="md-projeto" />
      </section>
    </div>
  );
}

interface EtapaProps {
  ref: (el: HTMLLIElement | null) => void;
  pj: ProjetoMeta;
  etapas: EtapaProjeto[];
  i: number;
  aberta: boolean;
  alternar: () => void;
  aoConcluir: () => void;
}

function Etapa({ ref, pj, etapas, i, aberta, alternar, aoConcluir }: EtapaProps) {
  const e = etapas[i];
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const marcarCriterio = useStore((s) => s.marcarCriterio);
  const verSolucaoEtapa = useStore((s) => s.verSolucaoEtapa);
  const concluirEtapa = useStore((s) => s.concluirEtapa);
  const reg = progresso.etapas?.[e.id];
  const concluida = !!reg?.concluidaEm;
  const liberada = etapaDesbloqueada(etapas, i, progresso, perfil);
  const marcados = new Set(reg?.criterios ?? []);
  const prontos = e.criterios.filter((_, k) => marcados.has(k)).length;
  const [dica, setDica] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [solucao, setSolucao] = useState(false);

  const abrirSolucao = () => {
    if (concluida || reg?.viuSolucao) setSolucao(true);
    else setConfirmar(true);
  };

  return (
    <li ref={ref} className={`etapa ${concluida ? 'concluida' : ''} ${liberada ? '' : 'trancada'} ${aberta && liberada ? 'aberta' : ''}`}>
      <button type="button" className="etapa-cabeca" onClick={alternar} disabled={!liberada} aria-expanded={aberta && liberada}>
        <span className="etapa-num" aria-hidden>
          {concluida ? <CheckIcon size={16} weight="bold" /> : liberada ? i + 1 : <LockSimpleIcon size={14} weight="fill" />}
        </span>
        <span className="etapa-titulos">
          <strong>{e.titulo}</strong>
          <span>{liberada ? e.objetivo : 'Abre quando você concluir a etapa anterior.'}</span>
        </span>
        {liberada && <CaretDownIcon size={18} className="etapa-seta" />}
      </button>

      {aberta && liberada && (
        <div className="etapa-corpo">
          <Markdown texto={e.instrucoes} className="md-projeto" />

          <div className="etapa-criterios">
            <h3>
              Critérios de aceite{' '}
              <small>
                {prontos}/{e.criterios.length}
              </small>
            </h3>
            <ul>
              {e.criterios.map((c, k) => (
                <li key={k}>
                  <label className={`criterio ${marcados.has(k) ? 'feito' : ''}`}>
                    <input
                      type="checkbox"
                      checked={marcados.has(k)}
                      disabled={concluida}
                      onChange={(ev) => marcarCriterio(e.id, k, ev.target.checked)}
                    />
                    <span className="criterio-caixa" aria-hidden>
                      <CheckIcon size={12} weight="bold" />
                    </span>
                    <MarkdownInline texto={c} />
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {dica && (
            <div className="dica surgir questao-dica">
              <LightbulbIcon size={20} weight="fill" />
              <Markdown texto={e.dica} />
            </div>
          )}
          {confirmar && !solucao && (
            <div className="etapa-confirmar surgir" role="alertdialog" aria-label="Ver a solução antes de concluir">
              <p>
                Vale tentar mais um pouco: ver a solução antes de concluir reduz o XP desta etapa de {XP.etapa} para {XP.etapaComSolucao}.
                Comparar depois de terminar não custa nada.
              </p>
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-linha"
                  onClick={() => {
                    verSolucaoEtapa(e.id);
                    setSolucao(true);
                    setConfirmar(false);
                  }}
                >
                  Ver mesmo assim
                </button>
                <button type="button" className="btn btn-sm btn-ghost" onClick={() => setConfirmar(false)}>
                  Continuar tentando
                </button>
              </div>
            </div>
          )}

          <div className="etapa-acoes">
            {!dica && (
              <button type="button" className="btn btn-sm btn-linha" onClick={() => setDica(true)}>
                <LightbulbIcon size={18} /> Pedir dica
              </button>
            )}
            {!solucao && !confirmar && (
              <button type="button" className="btn btn-sm btn-linha" onClick={abrirSolucao}>
                <CodeIcon size={18} /> {concluida ? 'Comparar com a solução' : 'Ver a solução de referência'}
              </button>
            )}
            {!concluida && (
              <button
                type="button"
                className="btn btn-accent etapa-concluir"
                disabled={prontos < e.criterios.length}
                title={prontos < e.criterios.length ? 'Marque todos os critérios de aceite' : undefined}
                onClick={() => {
                  concluirEtapa(pj.id, e.id, etapas.map((x) => x.id));
                  aoConcluir();
                }}
              >
                <CheckIcon size={18} weight="bold" /> Concluir etapa
              </button>
            )}
          </div>

          {solucao && (
            <div className="etapa-solucao surgir">
              <h3>Solução de referência</h3>
              <Markdown texto={e.solucao} className="md-projeto" />
            </div>
          )}
        </div>
      )}
    </li>
  );
}
