import { useEffect } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Tema = 'escuro' | 'claro' | 'sistema';
export type Acento = 'brasa' | 'cobalto' | 'esmeralda' | 'rosa' | 'ambar';

export const TEMAS: { id: Tema; nome: string }[] = [
  { id: 'escuro', nome: 'Escuro' },
  { id: 'claro', nome: 'Claro' },
  { id: 'sistema', nome: 'Igual ao sistema' },
];

/** `escuro` e `claro` são as amostras mostradas no seletor, as mesmas cores de base.css. */
export const ACENTOS: { id: Acento; nome: string; escuro: string; claro: string }[] = [
  { id: 'brasa', nome: 'Brasa', escuro: '#ff7a1a', claro: '#bf5006' },
  { id: 'cobalto', nome: 'Cobalto', escuro: '#4d8dff', claro: '#1f5fd1' },
  { id: 'esmeralda', nome: 'Esmeralda', escuro: '#2ecf86', claro: '#0d7a4a' },
  { id: 'rosa', nome: 'Rosa', escuro: '#ff5f8f', claro: '#c2185b' },
  { id: 'ambar', nome: 'Âmbar', escuro: '#f5b41a', claro: '#8f5f00' },
];

interface EstadoAparencia {
  tema: Tema;
  acento: Acento;
  mudarTema: (tema: Tema) => void;
  mudarAcento: (acento: Acento) => void;
}

/** Fica fora dos perfis: vale também na tela de escolha de perfil. */
export const useAparencia = create<EstadoAparencia>()(
  persist(
    (set) => ({
      tema: 'escuro',
      acento: 'brasa',
      mudarTema: (tema) => set({ tema }),
      mudarAcento: (acento) => set({ acento }),
    }),
    { name: 'javaflix-aparencia', storage: createJSONStorage(() => localStorage) },
  ),
);

const CONSULTA_CLARO = '(prefers-color-scheme: light)';

export function temaEfetivo(tema: Tema): 'escuro' | 'claro' {
  if (tema !== 'sistema') return tema;
  return window.matchMedia(CONSULTA_CLARO).matches ? 'claro' : 'escuro';
}

export function aplicarAparencia(tema: Tema, acento: Acento) {
  const raiz = document.documentElement;
  const claro = temaEfetivo(tema) === 'claro';
  if (claro) raiz.dataset.tema = 'claro';
  else delete raiz.dataset.tema;
  if (acento === 'brasa') delete raiz.dataset.acento;
  else raiz.dataset.acento = acento;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', claro ? '#f4f3f0' : '#0b0a09');
}

/** Aplica a aparência escolhida e acompanha o sistema quando o tema é "Igual ao sistema". */
export function useAplicarAparencia() {
  const tema = useAparencia((s) => s.tema);
  const acento = useAparencia((s) => s.acento);
  useEffect(() => {
    aplicarAparencia(tema, acento);
    if (tema !== 'sistema') return;
    const consulta = window.matchMedia(CONSULTA_CLARO);
    const mudou = () => aplicarAparencia(tema, acento);
    consulta.addEventListener('change', mudou);
    return () => consulta.removeEventListener('change', mudou);
  }, [tema, acento]);
}
