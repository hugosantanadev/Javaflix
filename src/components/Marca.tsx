import type { CSSProperties } from 'react';

export function Wordmark({ tamanho = 30 }: { tamanho?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: tamanho }} aria-label="Javaflix">
      JAVAFLIX
    </span>
  );
}

export const AVATARES = [
  { fundo: '#F5A524', glifo: '{ }' },
  { fundo: '#2FD3A0', glifo: 'λ' },
  { fundo: '#5B8CFF', glifo: '@' },
  { fundo: '#FF5D4A', glifo: '#' },
  { fundo: '#E8C766', glifo: '->' },
  { fundo: '#33C7E6', glifo: '::' },
  { fundo: '#A8E05F', glifo: ';' },
  { fundo: '#E4E4E7', glifo: '[ ]' },
];

export function Avatar({ indice, tamanho = 32, className = '' }: { indice: number; tamanho?: number; className?: string }) {
  const a = AVATARES[indice % AVATARES.length];
  return (
    <span
      className={`avatar ${className}`}
      style={{ '--av-fundo': a.fundo, width: tamanho, height: tamanho, fontSize: tamanho * (a.glifo.length > 2 ? 0.3 : 0.42) } as CSSProperties}
      aria-hidden
    >
      {a.glifo}
    </span>
  );
}
