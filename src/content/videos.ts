import type { VideoCurso } from './types';

/**
 * Vídeos do curso no Google Drive, ligados aos episódios em que servem de reforço.
 *
 * A lista real fica em `videos.local.ts`, gerado por `npm run videos:importar`
 * (veja docs/VIDEOS.md). Esse arquivo é pessoal: está no .gitignore para que
 * links de curso nunca sejam publicados junto com o site. Sem ele (por exemplo,
 * no site publicado), vale a lista importada em Conta, guardada só no navegador.
 * Sem nenhuma das duas, o site funciona normalmente, só sem a seção de vídeos.
 */
interface ArquivoVideos {
  VIDEOS: VideoCurso[];
  /** Conta do Google com acesso aos vídeos (e-mail ou número de /u/N/). */
  CONTA_DRIVE?: string | null;
}

const locais = import.meta.glob<ArquivoVideos>('./videos.local.ts', { eager: true });

/** Chave do localStorage com os vídeos importados pela página Conta. */
export const CHAVE_VIDEOS = 'javaflix-videos';

function importados(): ArquivoVideos | undefined {
  try {
    const bruto = localStorage.getItem(CHAVE_VIDEOS);
    return bruto ? (JSON.parse(bruto) as ArquivoVideos) : undefined;
  } catch {
    return undefined;
  }
}

/** Vídeos vindos do arquivo local ou importados neste navegador. */
export const ORIGEM_VIDEOS: 'arquivo' | 'importados' | null = Object.values(locais)[0] ? 'arquivo' : importados() ? 'importados' : null;
const local = Object.values(locais)[0] ?? importados();

export const VIDEOS: VideoCurso[] = local?.VIDEOS ?? [];
export const CONTA_DRIVE: string | null = local?.CONTA_DRIVE ?? null;

/** Confere e guarda um arquivo exportado; devolve quantos vídeos vieram. */
export function importarVideos(texto: string): number {
  const dados = JSON.parse(texto) as Partial<ArquivoVideos> & { tipo?: string };
  const lista = dados.VIDEOS;
  if (dados.tipo !== 'javaflix-videos' || !Array.isArray(lista) || lista.some((v) => typeof v?.driveId !== 'string' || !Array.isArray(v.episodios))) {
    throw new Error('Esse arquivo não é uma exportação de vídeos do Javaflix.');
  }
  localStorage.setItem(CHAVE_VIDEOS, JSON.stringify({ VIDEOS: lista, CONTA_DRIVE: dados.CONTA_DRIVE ?? null }));
  return lista.length;
}

export function removerVideos() {
  localStorage.removeItem(CHAVE_VIDEOS);
}
