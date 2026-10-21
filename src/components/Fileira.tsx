import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';

interface FileiraProps {
  titulo: ReactNode;
  link?: { to: string; rotulo: string };
  variante?: 'cards' | 'posters' | 'top10';
  children: ReactNode;
  vazio?: ReactNode;
}

/** Fileira horizontal com setas, como nas plataformas de streaming. */
export function Fileira({ titulo, link, variante = 'cards', children, vazio }: FileiraProps) {
  const trilho = useRef<HTMLDivElement>(null);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const medir = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setPodeVoltar(el.scrollLeft > 4);
    setPodeAvancar(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    medir();
    const el = trilho.current;
    if (!el) return;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [medir, children]);

  const rolar = (dir: number) => {
    const el = trilho.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.86, behavior: 'smooth' });
  };

  return (
    <section className={`fileira fileira-${variante}`}>
      <header className="fileira-cabeca">
        <h2>{titulo}</h2>
        {link && (
          <Link to={link.to} className="fileira-link">
            {link.rotulo} <CaretRightIcon size={14} weight="bold" />
          </Link>
        )}
      </header>
      {vazio ? (
        <div className="fileira-vazia">{vazio}</div>
      ) : (
        <div className="fileira-corpo">
          {podeVoltar && (
            <button type="button" className="fileira-seta esq" onClick={() => rolar(-1)} aria-label="Voltar">
              <CaretLeftIcon size={34} weight="bold" />
            </button>
          )}
          <div className="fileira-trilho" ref={trilho} onScroll={medir}>
            {children}
          </div>
          {podeAvancar && (
            <button type="button" className="fileira-seta dir" onClick={() => rolar(1)} aria-label="Avançar">
              <CaretRightIcon size={34} weight="bold" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
