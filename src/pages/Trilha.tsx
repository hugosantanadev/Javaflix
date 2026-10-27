import { CheckIcon, LockSimpleIcon, TrophyIcon } from '@phosphor-icons/react';
import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArteCargo } from '../components/Arte';
import { CARGOS } from '../content/catalogo';
import { PROVAS } from '../content/types';
import { cargoCompleto, temporadaDisponivel } from '../lib/conteudo';
import { dataCurta } from '../lib/datas';
import { cargoAtual, cargoDesbloqueado, estadoTemporada, infoNivel, nivelExigido, pendenciasDaPromocao } from '../lib/progresso';
import { cargoUsaNotas, MEDIA_APROVACAO } from '../lib/notas';
import { useProgresso, usePerfil } from '../lib/store';

const geradas = (n: number) => (n === 1 ? '1 gerada' : `${n} geradas`);

export function Trilha() {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const atual = cargoAtual(progresso);
  const [, setParams] = useSearchParams();
  const totalEps = CARGOS.reduce((s, c) => s + c.temporadas.reduce((x, t) => x + t.episodios.length, 0), 0);
  const feitos = Object.values(progresso.episodios).filter((e) => e.concluidoEm).length;
  const nivel = infoNivel(progresso.xp);

  return (
    <div className="pagina trilha">
      <header className="trilha-cabeca">
        <h1 className="titulo-pagina">Sua carreira</h1>
        <p className="subtitulo-pagina">
          Oito cargos, do estágio ao backend sênior. Os cinco primeiros levam à {PROVAS[perfil.prova].codigo}; os três últimos
          cobrem o que as vagas de backend Java pedem. Tudo abre em sequência: cada episódio concluído destrava o seguinte, cada
          temporada concluída destrava a próxima, e a promoção de cargo exige todas as temporadas, as provas, o nível mínimo e a
          avaliação de desempenho. Antes de tudo, a trilha opcional Aprendiz mostra como o computador funciona por dentro.
        </p>
        <div className="trilha-resumo">
          <div>
            <strong>{atual.titulo}</strong>
            <span>cargo atual</span>
          </div>
          <div>
            <strong>Nível {nivel.nivel}</strong>
            <span>
              {progresso.xp.toLocaleString('pt-BR')} XP, faltam {nivel.falta.toLocaleString('pt-BR')} para o {nivel.nivel + 1}
            </span>
          </div>
          <div>
            <strong>
              {feitos}/{totalEps}
            </strong>
            <span>episódios concluídos</span>
          </div>
          <div>
            <strong>{Object.keys(progresso.promocoes).length}</strong>
            <span>promoções</span>
          </div>
        </div>
      </header>

      <ol className="escada">
        {CARGOS.map((c) => {
          const promovido = progresso.promocoes[c.id];
          const liberado = cargoDesbloqueado(c, progresso, perfil);
          const eAtual = c.id === atual.id && !promovido;
          const estados = c.temporadas.map((t) => estadoTemporada(t, progresso, perfil.prova));
          const completas = estados.filter((s) => s.completa).length;
          const completo = cargoCompleto(c.id);
          return (
            <li
              key={c.id}
              className={`degrau ${promovido ? 'promovido' : ''} ${eAtual ? 'atual' : ''} ${liberado ? '' : 'trancado'}`}
              style={{ '--cor': c.cor } as CSSProperties}
            >
              <div className="degrau-marcador" aria-hidden>
                {promovido ? (
                  <CheckIcon size={16} weight="bold" />
                ) : c.trilha === 'base' ? (
                  '0'
                ) : liberado ? (
                  c.ordem
                ) : (
                  <LockSimpleIcon size={14} weight="fill" />
                )}
              </div>
              <div className="degrau-poster">
                <ArteCargo cargoId={c.id} />
              </div>
              <div className="degrau-corpo">
                <div className="degrau-topo">
                  <h2>{c.titulo}</h2>
                  {eAtual && <span className="etiqueta accent">Você está aqui</span>}
                  {promovido && <span className="etiqueta ok">Promovido em {dataCurta(promovido)}</span>}
                  {c.trilha === 'mercado' && <span className="etiqueta">Mercado</span>}
                  {c.trilha === 'base' && <span className="etiqueta">Opcional</span>}
                </div>
                <p className="degrau-foco">{c.foco}</p>
                <p className="degrau-desc">{c.descricao}</p>
                {c.temporadas.length > 0 ? (
                  <ul className="degrau-temporadas">
                    {c.temporadas.map((t, i) => {
                      const s = estados[i];
                      const disp = temporadaDisponivel(t.id);
                      return (
                        <li key={t.id}>
                          <button
                            type="button"
                            className={`temporada-pilula ${s.completa ? 'completa' : ''} ${disp ? '' : 'embreve'}`}
                            onClick={() => setParams({ t: t.id }, { preventScrollReset: true })}
                            style={{ '--pct': s.pct } as CSSProperties}
                          >
                            <span className="temporada-pilula-num">T{t.numero}</span>
                            <span className="temporada-pilula-nome">{t.titulo}</span>
                            {s.completa ? <CheckIcon size={14} weight="bold" /> : !disp ? <small>em breve</small> : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="degrau-desc">Simulados completos no formato e no tempo da prova.</p>
                )}
                <div className="degrau-rodape">
                  {c.temporadas.length > 0 && (
                    <span>
                      {completas} de {c.temporadas.length} temporadas fechadas
                      {c.trilha !== 'base' &&
                        (cargoUsaNotas(c) ? ` · promoção com CR ${MEDIA_APROVACAO}` : ` · promoção a partir do nível ${nivelExigido(c, perfil.prova)}`)}
                    </span>
                  )}
                  {c.trilha === 'base' ? (
                    <span className="degrau-aviso">Sem avaliação: é a base para entender o resto, no seu ritmo.</span>
                  ) : c.id === 'reta-final' ? (
                    liberado && (
                      <Link to="/simulado" className="btn btn-sm btn-linha">
                        <TrophyIcon size={16} /> Ir para os simulados
                      </Link>
                    )
                  ) : completo && liberado && !promovido ? (
                    pendenciasDaPromocao(c, progresso, perfil).length === 0 ? (
                      <Link to={`/avaliacao/${c.id}`} className="btn btn-sm btn-accent">
                        <TrophyIcon size={16} /> Fazer a avaliação
                      </Link>
                    ) : (
                      <span className="degrau-aviso">
                        <LockSimpleIcon size={14} weight="fill" /> Avaliação: falta {pendenciasDaPromocao(c, progresso, perfil).join(' e ')}
                      </span>
                    )
                  ) : !completo && c.temporadas.length > 0 ? (
                    <span className="degrau-aviso">
                      Avaliação abre com as {c.temporadas.length} temporadas no ar ({geradas(c.temporadas.filter((t) => temporadaDisponivel(t.id)).length)})
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
