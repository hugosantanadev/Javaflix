import { useEffect, useState } from 'react';
import { PROVAS } from '../content/types';
import { proximoEpisodio, rotuloEpisodio } from '../lib/progresso';
import { estadoOfensiva, useProgresso, usePerfil } from '../lib/store';
import { Wordmark } from './Marca';

const CHAVE = 'javaflix:boot';

function jaViu() {
  try {
    return sessionStorage.getItem(CHAVE) === '1';
  } catch {
    return true;
  }
}

/** Abertura curta, no clima de uma JVM subindo. Uma vez por sessão; clique pula. */
export function Boot() {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const [ativo, setAtivo] = useState(() => !jaViu() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (!ativo) return;
    try {
      sessionStorage.setItem(CHAVE, '1');
    } catch {
      /* ok */
    }
    const t1 = window.setTimeout(() => setSaindo(true), 2100);
    const t2 = window.setTimeout(() => setAtivo(false), 2600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [ativo]);

  if (!ativo) return null;

  const prox = proximoEpisodio(progresso, perfil);
  const concluidos = Object.values(progresso.episodios).filter((e) => e.concluidoEm).length;
  const { dias } = estadoOfensiva(progresso.ofensiva);
  const info = PROVAS[perfil.prova];
  const linhas = [
    `$ java -jar javaflix.jar --perfil "${perfil.nome}"`,
    `[0.004s] JVM pronta. Alvo: ${info.codigo} (Java ${info.java})`,
    `[0.027s] Progresso carregado: ${concluidos} episódio(s), ${progresso.xp} XP`,
    `[0.051s] Ofensiva: ${dias} dia(s)`,
    prox ? `[0.078s] Próximo: ${rotuloEpisodio(prox)} ${prox.titulo}` : '[0.078s] Tudo em dia',
  ];

  return (
    <div className={`boot ${saindo ? 'saindo' : ''}`} onClick={() => setAtivo(false)} role="presentation">
      <pre className="boot-log">
        {linhas.map((l, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.16}s` }}>
            {l}
            {'\n'}
          </span>
        ))}
      </pre>
      <div className="boot-marca">
        <Wordmark tamanho={96} />
      </div>
    </div>
  );
}
