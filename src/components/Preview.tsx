import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const ESCALA = 1.45;

interface Props {
  children: ReactNode;
  /** Conteúdo do cartão expandido. */
  preview: () => ReactNode;
  className?: string;
}

/**
 * Cartão que se expande ao passar o mouse, flutuando por cima da fileira
 * (num portal, para não ser cortado pelo scroll horizontal).
 * Em telas de toque, não expande: o clique segue direto.
 */
export function ComPreview({ children, preview, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const cancelar = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => cancelar, []);

  useEffect(() => {
    if (!rect) return;
    const fechar = () => setRect(null);
    window.addEventListener('resize', fechar);
    document.addEventListener('scroll', fechar, { capture: true, passive: true });
    return () => {
      window.removeEventListener('resize', fechar);
      document.removeEventListener('scroll', fechar, { capture: true });
    };
  }, [rect]);

  const entrar = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (min-width: 900px)').matches) return;
    cancelar();
    timer.current = window.setTimeout(() => {
      if (ref.current) setRect(ref.current.getBoundingClientRect());
    }, 480);
  };

  let estilo: React.CSSProperties | undefined;
  let origem = 'center';
  if (rect) {
    const largura = rect.width * ESCALA;
    const margem = 12;
    let left = rect.left - (largura - rect.width) / 2;
    if (left < margem) {
      left = Math.max(margem, rect.left);
      origem = 'left';
    } else if (left + largura > window.innerWidth - margem) {
      left = Math.min(window.innerWidth - margem - largura, rect.right - largura);
      origem = 'right';
    }
    const top = Math.max(8, rect.top - rect.height * (ESCALA - 1) * 0.6);
    estilo = { left, top, width: largura, transformOrigin: `${origem} top` };
  }

  return (
    // O portal é filho React deste div: sair do preview para fora também dispara este leave.
    <div
      ref={ref}
      className={`com-preview ${className}`}
      onPointerEnter={entrar}
      onPointerLeave={() => {
        cancelar();
        setRect(null);
      }}
    >
      {children}
      {rect &&
        createPortal(
          <div className="preview-flutuante" style={estilo} onPointerLeave={() => setRect(null)} onClick={() => setRect(null)}>
            {preview()}
          </div>,
          document.body,
        )}
    </div>
  );
}
