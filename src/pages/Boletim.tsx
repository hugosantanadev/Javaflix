import { ArrowRightIcon, ExamIcon } from '@phosphor-icons/react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { CARGOS } from '../content/catalogo';
import { temporadaDisponivel } from '../lib/conteudo';
import { cargoUsaNotas, crDoCargo, fmtNota, MEDIA_APROVACAO, ROTULO_SITUACAO } from '../lib/notas';
import { episodioRelevante, estadoTemporada } from '../lib/progresso';
import { revisoesPendentes, useProgresso, usePerfil } from '../lib/store';

export function Boletim() {
  const progresso = useProgresso();
  const perfil = usePerfil()!;
  const relevantesDe = (t: (typeof CARGOS)[number]['temporadas'][number]) => t.episodios.filter((e) => episodioRelevante(e, perfil.prova));
  const cargos = CARGOS.filter(cargoUsaNotas);
  const pendentes = new Set(revisoesPendentes(progresso));
  const naFila = new Set(Object.keys(progresso.revisao));

  const linhas = cargos.flatMap((c) =>
    c.temporadas.filter((t) => temporadaDisponivel(t.id)).map((t) => ({ c, t, nota: estadoTemporada(t, progresso, perfil.prova).nota! })),
  );
  const iniciadas = linhas.filter((l) => l.nota.exercicios !== null || l.nota.prova !== null);
  const crGeral = iniciadas.length ? iniciadas.reduce((a, l) => a + l.nota.media, 0) / iniciadas.length : null;
  const aprovadas = linhas.filter((l) => l.nota.situacao === 'aprovado').length;

  const fracos = linhas.flatMap((l) =>
    l.nota.episodios
      .filter((e) => e.nota !== null && e.nota < MEDIA_APROVACAO)
      .map((e) => {
        const ids = [...naFila].filter((id) => id.startsWith(`${e.meta.id}-`));
        return { ...e, t: l.t, naFila: ids.length, hoje: ids.filter((id) => pendentes.has(id)).length };
      }),
  );

  return (
    <div className="pagina boletim">
      <h1 className="titulo-pagina">Boletim</h1>
      <p className="subtitulo-pagina">
        Média {MEDIA_APROVACAO} aprova a temporada: exercícios 30%, desafios 20% e prova 50%. Por enquanto vale para o cargo Estagiário.
      </p>

      <div className="numeros">
        <div className="numero destaque">
          <ExamIcon size={28} weight="fill" />
          <strong>{crGeral === null ? 'sem nota' : fmtNota(crGeral)}</strong>
          <span>CR geral</span>
        </div>
        <div className="numero">
          <strong>
            {aprovadas} de {linhas.length}
          </strong>
          <span>temporadas aprovadas</span>
        </div>
        <div className="numero">
          <strong>{fracos.length}</strong>
          <span>{fracos.length === 1 ? 'assunto abaixo de 7' : 'assuntos abaixo de 7'}</span>
        </div>
      </div>

      {iniciadas.length > 0 && (
        <section className="boletim-bloco">
          <h2>Evolução</h2>
          <ol className="boletim-evolucao" style={{ '--corte': MEDIA_APROVACAO / 10 } as CSSProperties}>
            {linhas.map(({ t, nota }) => {
              const vazia = nota.exercicios === null && nota.prova === null;
              return (
                <li key={t.id} className={vazia ? 'vazia' : nota.media >= MEDIA_APROVACAO ? 'boa' : ''}>
                  <span className="boletim-barra" style={{ '--v': vazia ? 0 : nota.media / 10 } as CSSProperties}>
                    {!vazia && <b>{fmtNota(nota.media)}</b>}
                  </span>
                  <small>T{t.numero}</small>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {cargos.map((c) => {
        const cr = crDoCargo(c, progresso, relevantesDe);
        return (
          <section key={c.id} className="boletim-bloco">
            <h2>
              {c.titulo} <span className="boletim-cr">CR {cr === null ? 'sem nota' : fmtNota(cr)}</span>
            </h2>
            {linhas
              .filter((l) => l.c.id === c.id)
              .map(({ t, nota }) => (
                <details key={t.id} className="boletim-temporada" open={nota.situacao !== 'cursando' || nota.exercicios !== null}>
                  <summary>
                    <span className="boletim-titulo">
                      T{t.numero}: {t.titulo}
                    </span>
                    <span className={`situacao ${nota.situacao}`}>{ROTULO_SITUACAO[nota.situacao]}</span>
                    <span className={`nota-valor ${nota.media >= MEDIA_APROVACAO ? 'boa' : ''}`}>{fmtNota(nota.media)}</span>
                  </summary>
                  <table className="boletim-tabela">
                    <thead>
                      <tr>
                        <th>Episódio</th>
                        <th>Exercícios</th>
                        <th>Desafio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nota.episodios.map((e) => (
                        <tr key={e.meta.id}>
                          <td>
                            <Link to={`/assistir/${e.meta.id}`}>
                              E{e.meta.numero} {e.meta.titulo}
                            </Link>
                          </td>
                          <td className={celula(e.nota)}>{e.nota === null ? 'sem nota' : fmtNota(e.nota)}</td>
                          <td className={celula(e.desafio)}>{e.desafio === null ? 'sem nota' : fmtNota(e.desafio)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Médias (peso)</td>
                        <td className={celula(nota.exercicios)}>{nota.exercicios === null ? 'sem nota' : `${fmtNota(nota.exercicios)} (30%)`}</td>
                        <td className={celula(nota.desafio)}>{nota.desafio === null ? 'sem nota' : `${fmtNota(nota.desafio)} (20%)`}</td>
                      </tr>
                      <tr>
                        <td>Prova (50%)</td>
                        <td colSpan={2} className={celula(nota.prova)}>
                          {nota.prova === null ? (
                            nota.precisaNaProva !== null && nota.precisaNaProva <= 10 ? (
                              `precisa de ${fmtNota(Math.ceil(nota.precisaNaProva * 10) / 10)} para fechar com 7`
                            ) : (
                              'sem nota'
                            )
                          ) : (
                            <>
                              {fmtNota(nota.prova)}{' '}
                              {nota.situacao === 'recuperacao' && (
                                <Link to={`/prova/${t.id}`} className="boletim-link">
                                  Fazer a recuperação
                                </Link>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </details>
              ))}
          </section>
        );
      })}

      <section className="boletim-bloco">
        <h2>Assuntos abaixo de 7</h2>
        {fracos.length === 0 ? (
          <p className="vazio-texto">Nenhum episódio concluído com nota abaixo de 7.</p>
        ) : (
          <ul className="boletim-fracos">
            {fracos.map((e) => (
              <li key={e.meta.id}>
                <span className="nota-valor">{fmtNota(e.nota!)}</span>
                <span className="boletim-titulo">
                  T{e.t.numero}:E{e.meta.numero} {e.meta.titulo}
                  <small>
                    {e.naFila === 0
                      ? 'Nenhuma questão na revisão. Refaça os exercícios para subir a nota.'
                      : `${e.naFila} ${e.naFila === 1 ? 'questão' : 'questões'} na revisão espaçada${e.hoje ? `, ${e.hoje} para hoje` : ''}.`}
                  </small>
                </span>
                {e.hoje > 0 ? (
                  <Link to="/revisao" className="btn btn-accent btn-sm">
                    Revisar <ArrowRightIcon size={16} weight="bold" />
                  </Link>
                ) : (
                  <Link to={`/assistir/${e.meta.id}?fase=exercicios`} className="btn btn-linha btn-sm">
                    Refazer
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

const celula = (n: number | null) => (n === null ? 'sem' : n >= MEDIA_APROVACAO ? 'boa' : 'baixa');
