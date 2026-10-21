import { FireIcon, LockSimpleIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { CONQUISTAS } from '../lib/conquistas';
import { dataCurta, diaLocal, deDia, somarDias } from '../lib/datas';
import { estadoOfensiva, useProgresso, usePerfil } from '../lib/store';

const SEMANAS = 20;

export function Conquistas() {
  const progresso = useProgresso();
  const perfil = usePerfil()!;
  const hoje = diaLocal();
  const { dias } = estadoOfensiva(progresso.ofensiva, hoje);

  const respostas = Object.values(progresso.respostas);
  const certas = respostas.reduce((s, r) => s + r.acertos, 0);
  const total = respostas.reduce((s, r) => s + r.acertos + r.erros, 0);
  const desbloqueadas = CONQUISTAS.filter((c) => progresso.conquistas[c.id]).length;

  // grade de atividade: colunas = semanas, linhas = dias (domingo em cima)
  const grade = useMemo(() => {
    const fim = deDia(hoje);
    const inicioUltimaSemana = somarDias(hoje, -fim.getDay());
    const inicio = somarDias(inicioUltimaSemana, -(SEMANAS - 1) * 7);
    return Array.from({ length: SEMANAS }, (_, s) =>
      Array.from({ length: 7 }, (_, d) => {
        const dia = somarDias(inicio, s * 7 + d);
        return { dia, xp: dia > hoje ? -1 : (progresso.xpPorDia[dia] ?? 0) };
      }),
    );
  }, [hoje, progresso.xpPorDia]);

  const nivel = (xp: number) => {
    if (xp < 0) return 'futuro';
    if (xp === 0) return 'n0';
    if (xp < perfil.meta * 0.5) return 'n1';
    if (xp < perfil.meta) return 'n2';
    if (xp < perfil.meta * 2) return 'n3';
    return 'n4';
  };

  const ultimos30 = Array.from({ length: 30 }, (_, i) => progresso.xpPorDia[somarDias(hoje, -i)] ?? 0).reduce((a, b) => a + b, 0);

  return (
    <div className="pagina conquistas">
      <h1 className="titulo-pagina">Conquistas</h1>
      <p className="subtitulo-pagina">Seu histórico de estudo e os selos que você já ganhou.</p>

      <div className="numeros">
        <div className="numero destaque">
          <FireIcon size={28} weight="fill" />
          <strong>{dias}</strong>
          <span>{dias === 1 ? 'dia de ofensiva' : 'dias de ofensiva'}</span>
        </div>
        <div className="numero">
          <strong>{progresso.ofensiva.recorde}</strong>
          <span>recorde de ofensiva</span>
        </div>
        <div className="numero">
          <strong>{progresso.xp.toLocaleString('pt-BR')}</strong>
          <span>XP no total</span>
        </div>
        <div className="numero">
          <strong>{ultimos30.toLocaleString('pt-BR')}</strong>
          <span>XP nos últimos 30 dias</span>
        </div>
        <div className="numero">
          <strong>{total ? Math.round((certas / total) * 100) : 0}%</strong>
          <span>de acerto em {total} respostas</span>
        </div>
        <div className="numero">
          <strong>{progresso.estat.melhorCombo}</strong>
          <span>maior sequência de acertos</span>
        </div>
      </div>

      <section className="atividade">
        <div className="atividade-cabeca">
          <h2>Atividade</h2>
          <div className="atividade-legenda" aria-hidden>
            menos <i className="n0" /> <i className="n1" /> <i className="n2" /> <i className="n3" /> <i className="n4" /> mais
          </div>
        </div>
        <div className="atividade-grade" role="img" aria-label={`XP por dia nas últimas ${SEMANAS} semanas`}>
          {grade.map((semana, s) => (
            <div key={s} className="atividade-semana">
              {semana.map((c) => (
                <i key={c.dia} className={nivel(c.xp)} title={c.xp >= 0 ? `${dataCurta(c.dia)}: ${c.xp} XP` : undefined} />
              ))}
            </div>
          ))}
        </div>
        <p className="atividade-nota">Quadrado cheio é dia com a meta de {perfil.meta} XP batida.</p>
      </section>

      <section>
        <div className="atividade-cabeca">
          <h2>Selos</h2>
          <span className="atividade-legenda">
            {desbloqueadas} de {CONQUISTAS.length}
          </span>
        </div>
        <ul className="selos">
          {CONQUISTAS.map((c) => {
            const em = progresso.conquistas[c.id];
            return (
              <li key={c.id} className={em ? 'ganho' : 'trancado'}>
                <span className="selo">{em ? c.selo : <LockSimpleIcon size={18} weight="fill" />}</span>
                <strong>{c.titulo}</strong>
                <span>{c.descricao}</span>
                {em && <small>{dataCurta(em)}</small>}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
