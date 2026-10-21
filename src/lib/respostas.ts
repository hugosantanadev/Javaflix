import type { Exercicio } from '../content/types';

/** Normaliza uma saída de programa: CRLF, espaços no fim das linhas e linhas vazias no fim. */
export function normalizarSaida(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/^\n+|\n+$/g, '');
}

/** Normaliza um trecho de código digitado: espaços repetidos e espaços em volta de pontuação. */
export function normalizarCodigo(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([[\](){};,.<>=+\-*/%!&|?:^~])\s*/g, '$1')
    .replace(/;$/, '');
}

export type Resposta =
  | { tipo: 'escolha'; valor: number }
  | { tipo: 'multipla'; valor: number[] }
  | { tipo: 'saida'; valor: string }
  | { tipo: 'lacuna'; valor: string }
  | { tipo: 'linha'; valor: number };

export function estaCerta(q: Exercicio, r: Resposta): boolean {
  switch (q.tipo) {
    case 'escolha':
      return r.tipo === 'escolha' && r.valor === q.resposta;
    case 'multipla': {
      if (r.tipo !== 'multipla') return false;
      const a = [...r.valor].sort();
      const b = [...q.respostas].sort();
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    case 'saida':
      return r.tipo === 'saida' && normalizarSaida(r.valor) === normalizarSaida(q.resposta);
    case 'lacuna':
      return r.tipo === 'lacuna' && q.respostas.some((x) => normalizarCodigo(x) === normalizarCodigo(r.valor));
    case 'linha':
      return r.tipo === 'linha' && r.valor === q.resposta;
  }
}

export function respostaVazia(r: Resposta | null): boolean {
  if (!r) return true;
  switch (r.tipo) {
    case 'escolha':
    case 'linha':
      return r.valor < 0;
    case 'multipla':
      return r.valor.length === 0;
    case 'saida':
    case 'lacuna':
      return r.valor.trim() === '';
  }
}

export function quantasCorretas(q: Exercicio) {
  return q.tipo === 'multipla' ? q.respostas.length : 1;
}

export const LETRAS = 'ABCDEFGH';

export function embaralhar<T>(lista: T[], semente = Math.random()): T[] {
  const a = [...lista];
  let s = Math.floor(semente * 2 ** 31) || 1;
  const rand = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
