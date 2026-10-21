/** Datas no fuso local, no formato AAAA-MM-DD. */

export function diaLocal(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dia}`;
}

export function deDia(dia: string): Date {
  const [y, m, d] = dia.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function somarDias(dia: string, n: number): string {
  const d = deDia(dia);
  d.setDate(d.getDate() + n);
  return diaLocal(d);
}

/** Dias entre a e b (b - a), ignorando horário de verão. */
export function diferencaDias(a: string, b: string): number {
  const ua = Date.UTC(...(a.split('-').map(Number) as [number, number, number]));
  const ub = Date.UTC(...(b.split('-').map(Number) as [number, number, number]));
  return Math.round((ub - ua) / 86_400_000);
}

const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function nomeDoDia(dia: string): string {
  return DIAS[deDia(dia).getDay()];
}

export function dataCurta(dia: string): string {
  const d = deDia(dia);
  return `${d.getDate()} ${MESES[d.getMonth()]}`;
}

export function saudacao(d: Date = new Date()): string {
  const h = d.getHours();
  if (h < 5) return 'Boa madrugada';
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function formatarTempo(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const mm = String(m).padStart(2, '0');
  const sss = String(ss).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${sss}` : `${mm}:${sss}`;
}
