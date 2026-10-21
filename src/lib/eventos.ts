/** Barramento simples para efeitos visuais disparados pelo estado (toasts, sons). */

export type Evento =
  | { tipo: 'xp'; valor: number; motivo: string }
  | { tipo: 'meta'; dias: number }
  | { tipo: 'congelamento'; total: number }
  | { tipo: 'conquista'; id: string }
  | { tipo: 'promocao'; cargo: string }
  | { tipo: 'aviso'; texto: string };

type Ouvinte = (e: Evento) => void;
const ouvintes = new Set<Ouvinte>();

export function emitir(e: Evento) {
  // depois do commit do estado, para não disparar setState durante render
  queueMicrotask(() => ouvintes.forEach((o) => o(e)));
}

export function ouvir(o: Ouvinte): () => void {
  ouvintes.add(o);
  return () => ouvintes.delete(o);
}
