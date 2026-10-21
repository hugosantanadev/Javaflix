import { BugBeetleIcon, CheckIcon, EyeIcon, LightbulbIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import type { Bug, EpisodioConteudo } from '../content/types';
import { useProgresso, useStore } from '../lib/store';
import { Codigo } from './Codigo';
import { Markdown } from './Markdown';

const NIVEL = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' } as const;

/** Aba Depuração: um card por bug, com sintoma, código clicável e a correção comentada. */
export function Depuracao({ ep }: { ep: EpisodioConteudo }) {
  const bugs = ep.bugs ?? [];
  const progresso = useProgresso();
  const resolvidos = bugs.filter((b) => progresso.bugs?.[b.id]).length;

  return (
    <div className="depuracao">
      <div className="desafio-cabeca">
        <span className="hero-cargo">Depuração</span>
        <h1>Ache o bug</h1>
        <p>
          Cada bug chega como chegaria para você: um sintoma e o código. Leia, levante uma hipótese e clique na linha culpada. Achar
          de primeira vale mais XP.
        </p>
        <span className="etiqueta">
          {resolvidos} de {bugs.length} resolvidos
        </span>
      </div>
      {bugs.map((b, i) => (
        <CartaoBug key={b.id} bug={b} numero={i + 1} />
      ))}
    </div>
  );
}

function CartaoBug({ bug, numero }: { bug: Bug; numero: number }) {
  const progresso = useProgresso();
  const resolver = useStore((s) => s.resolverBug);
  const jaResolvido = !!progresso.bugs?.[bug.id];
  const [erradas, setErradas] = useState<number[]>([]);
  const [achou, setAchou] = useState(jaResolvido);
  const [revelado, setRevelado] = useState(jaResolvido);
  const [dica, setDica] = useState(false);
  const fim = achou || revelado;

  const clicar = (n: number) => {
    if (fim) return;
    if (n === bug.linha) {
      setAchou(true);
      setRevelado(true);
      resolver(bug.id, erradas.length === 0);
    } else if (!erradas.includes(n)) {
      setErradas((e) => [...e, n]);
    }
  };

  return (
    <section className={`bug ${fim ? 'fim' : ''}`} aria-labelledby={`${bug.id}-titulo`}>
      <header className="bug-cabeca">
        <BugBeetleIcon size={22} weight="duotone" />
        <h2 id={`${bug.id}-titulo`}>Bug {numero}</h2>
        <span className={`bug-nivel n${bug.dificuldade}`}>{NIVEL[bug.dificuldade]}</span>
        {achou && (
          <span className="etiqueta ok">
            <CheckIcon size={14} weight="bold" /> Resolvido
          </span>
        )}
      </header>

      <Markdown texto={bug.sintoma} className="bug-sintoma" />
      <Efeito bug={bug} />

      <Codigo
        codigo={bug.codigo}
        rotulo="Java com bug"
        aoClicarLinha={fim ? undefined : clicar}
        linhaCerta={fim ? bug.linha : null}
        linhaErrada={!fim && erradas.length ? erradas[erradas.length - 1] : null}
      />

      {!fim && (
        <div className="bug-acoes">
          {erradas.length > 0 && <span className="bug-errou">Não é a linha {erradas[erradas.length - 1]}. Olhe de novo.</span>}
          {!dica ? (
            <button type="button" className="btn btn-linha btn-sm" onClick={() => setDica(true)}>
              <LightbulbIcon size={18} /> Quero uma dica
            </button>
          ) : (
            <div className="dica surgir">
              <LightbulbIcon size={20} weight="fill" />
              <Markdown texto={bug.dica} />
            </div>
          )}
          {erradas.length >= 2 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRevelado(true)}>
              <EyeIcon size={18} /> Mostrar o bug
            </button>
          )}
        </div>
      )}

      {fim && (
        <div className="bug-correcao surgir">
          <h3 className="ia-titulo">{achou ? 'Isso. A correção:' : 'O bug estava na linha ' + bug.linha + '. A correção:'}</h3>
          <Codigo codigo={bug.correcao} rotulo="Java corrigido" linhaCerta={bug.linha} />
          <figure className="md-saida">
            <figcaption>Saída depois da correção</figcaption>
            <pre>{bug.saidaCorrigida}</pre>
          </figure>
          <Markdown texto={bug.explicacao} />
        </div>
      )}
    </section>
  );
}

function Efeito({ bug }: { bug: Bug }) {
  const e = bug.efeito;
  if (e.tipo === 'naoCompila') return <p className="bug-efeito">O compilador recusa o código.</p>;
  if (e.tipo === 'excecao')
    return (
      <p className="bug-efeito">
        Ao rodar, lança <code>{e.nome}</code>.
      </p>
    );
  return (
    <figure className="md-saida bug-saida">
      <figcaption>Saída atual, com o bug</figcaption>
      <pre>{e.saida}</pre>
    </figure>
  );
}
