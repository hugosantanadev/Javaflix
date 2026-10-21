import { ArrowRightIcon, ArrowsClockwiseIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { Boot } from '../components/Boot';
import { CardCargo, CardEpisodio, CardTemporada, CardTop10 } from '../components/Cards';
import { Fileira } from '../components/Fileira';
import { Hero } from '../components/Hero';
import { VideoDrive } from '../components/VideoDrive';
import { CARGOS, getEpisodio, getTemporadaDoEpisodio, TEMPORADAS } from '../content/catalogo';
import { MATERIAIS } from '../content/materiais';
import { PROVAS, type Prova } from '../content/types';
import { VIDEOS } from '../content/videos';
import { temporadaDisponivel } from '../lib/conteudo';
import { saudacao } from '../lib/datas';
import { cargoAtual, cargoDesbloqueado, emAndamento, proximoEpisodio } from '../lib/progresso';
import { revisoesPendentes, useProgresso, usePerfil } from '../lib/store';

/** Seleção editorial dos temas que mais pegam em cada prova. */
const TOP10: Record<Prova, string[]> = {
  '830': [
    'pleno-t6-e05',
    'junior-t5-e05',
    'junior-t3-e02',
    'pleno-t3-e03',
    'pleno-t1-e04',
    'estagiario-t2-e03',
    'junior-t1-e05',
    'senior-t1-e05',
    'pleno-t4-e04',
    'estagiario-t5-e03',
  ],
  '829': [
    'pleno-t6-e05',
    'junior-t3-e02',
    'pleno-t3-e03',
    'pleno-t1-e04',
    'senior-t5-e04',
    'estagiario-t2-e03',
    'junior-t1-e05',
    'junior-t5-e04',
    'pleno-t4-e04',
    'estagiario-t5-e03',
  ],
  '831': [
    'pleno-t6-e05',
    'junior-t5-e05',
    'pleno-t6-e06',
    'junior-t3-e02',
    'senior-t1-e06',
    'pleno-t1-e04',
    'estagiario-t2-e03',
    'senior-t1-e05',
    'junior-t1-e05',
    'estagiario-t1-e01',
  ],
};

export function Inicio() {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const nav = useNavigate();
  const cargo = cargoAtual(progresso);
  const prox = proximoEpisodio(progresso, perfil);
  const temporadaHero = prox ? getTemporadaDoEpisodio(prox.id)! : (cargo.temporadas[0] ?? TEMPORADAS[0]);
  const pendentes = revisoesPendentes(progresso).length;

  const continuar = useMemo(() => {
    const lista = emAndamento(progresso, perfil.prova);
    if (prox && !lista.some((e) => e.id === prox.id)) lista.unshift(prox);
    return lista;
  }, [progresso, perfil.prova, prox]);

  const emBreve = TEMPORADAS.filter((t) => !temporadaDisponivel(t.id)).slice(0, 12);
  const top10 = TOP10[perfil.prova].map((id) => getEpisodio(id)).filter(Boolean);
  const episodiosHero = temporadaHero.episodios;
  const cargosSeguintes = CARGOS.filter((c) => c.ordem > cargo.ordem);
  const base = CARGOS.find((c) => c.trilha === 'base');
  const episodiosDoCargo = new Set(cargo.temporadas.flatMap((t) => t.episodios.map((e) => e.id)));
  const videosDoCargo = VIDEOS.filter((v) => v.episodios.some((id) => episodiosDoCargo.has(id)));

  return (
    <div className="inicio">
      <Boot />
      <Hero temporada={temporadaHero} episodio={prox} />

      <div className="fileiras">
        {continuar.length > 0 && (
          <Fileira titulo={`Continuar estudando como ${perfil.nome}`}>
            {continuar.map((e) => (
              <CardEpisodio key={e.id} episodio={e} />
            ))}
          </Fileira>
        )}

        {pendentes > 0 && (
          <section className="faixa-revisao">
            <ArrowsClockwiseIcon size={36} weight="bold" />
            <div>
              <strong>
                {pendentes} {pendentes === 1 ? 'questão volta' : 'questões voltam'} hoje para revisão
              </strong>
              <span>Questões que você errou reaparecem em 1, 3, 7, 16 e 35 dias até ficarem no lugar.</span>
            </div>
            <Link to="/revisao" className="btn btn-play">
              Revisar agora
            </Link>
          </section>
        )}

        <Fileira titulo={`Sua carreira: ${cargo.titulo}`} link={{ to: '/trilha', rotulo: 'Ver carreira' }}>
          {cargo.temporadas.length > 0 ? (
            cargo.temporadas.map((t) => <CardTemporada key={t.id} temporada={t} />)
          ) : (
            <Link to="/simulado" className="card card-simulado">
              <span>Reta final</span>
              <strong>Simulados de {PROVAS[perfil.prova].questoes} questões</strong>
              <ArrowRightIcon size={20} />
            </Link>
          )}
        </Fileira>

        {base && (
          <Fileira titulo="Por baixo dos panos: do bit aos algoritmos" link={{ to: '/trilha', rotulo: 'Trilha Aprendiz' }}>
            {base.temporadas.map((t) => (
              <CardTemporada key={t.id} temporada={t} />
            ))}
          </Fileira>
        )}

        <Fileira titulo={`Top 10 da ${PROVAS[perfil.prova].codigo}: onde a prova mais pega`} variante="top10">
          {top10.map((e, i) => (
            <CardTop10 key={e!.id} posicao={i + 1} episodio={e!} />
          ))}
        </Fileira>

        <Fileira titulo={`${temporadaHero.titulo}: episódios`}>
          {episodiosHero.map((e) => (
            <CardEpisodio key={e.id} episodio={e} mostrarTemporada={false} />
          ))}
        </Fileira>

        {videosDoCargo.length > 0 && (
          <Fileira titulo={`Do seu curso: aulas para ${cargo.titulo}`} link={{ to: '/videos', rotulo: 'Todos os vídeos' }}>
            {videosDoCargo.slice(0, 14).map((v) => (
              <div key={v.driveId} className="card card-video">
                <VideoDrive video={v} compacto />
              </div>
            ))}
          </Fileira>
        )}

        {cargosSeguintes.length > 0 && (
          <Fileira titulo="Próximas promoções" variante="posters">
            {cargosSeguintes.map((c) => (
              <CardCargo
                key={c.id}
                cargoId={c.id}
                bloqueado={!cargoDesbloqueado(c, progresso, perfil)}
                onClick={() => (c.temporadas[0] ? nav(`/?t=${c.temporadas[0].id}`) : nav('/simulado'))}
              />
            ))}
          </Fileira>
        )}

        {emBreve.length > 0 && (
          <Fileira titulo="Em breve na Javaflix">
            {emBreve.map((t) => (
              <CardTemporada key={t.id} temporada={t} />
            ))}
          </Fileira>
        )}

        <section className="materiais-faixa">
          <div className="materiais-faixa-texto">
            <h2>Para estudar fora daqui</h2>
            <p>Documentação oficial, simuladores e o livro de referência. Cada episódio também indica o seu material.</p>
            <Link to="/materiais" className="btn btn-linha">
              Ver todos os materiais
            </Link>
          </div>
          <ul className="materiais-faixa-lista">
            {MATERIAIS.filter((m) => m.grupo !== 'mercado')
              .slice(0, 6)
              .map((m) => (
                <li key={m.url}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer">
                    <strong>{m.titulo}</strong>
                    <span>{m.porque}</span>
                    <ArrowSquareOutIcon size={16} />
                  </a>
                </li>
              ))}
          </ul>
        </section>

        <footer className="rodape">
          <span>
            {saudacao()}, {perfil.nome}. Alvo: {PROVAS[perfil.prova].codigo}.
          </span>
          <span>Javaflix é um projeto de estudo pessoal, sem ligação com a Oracle ou com serviços de streaming.</span>
        </footer>
      </div>
    </div>
  );
}
