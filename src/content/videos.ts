import type { VideoCurso } from './types';

/**
 * Vídeos do curso no Google Drive, ligados aos episódios em que servem de reforço.
 *
 * A lista real fica em `videos.local.ts`, gerado por `npm run videos:importar`
 * (veja docs/VIDEOS.md). Esse arquivo é pessoal: está no .gitignore para que
 * links de curso nunca sejam publicados junto com o site. Sem ele, o site
 * funciona normalmente, só sem a seção de vídeos.
 */
interface ArquivoVideos {
  VIDEOS: VideoCurso[];
  /** Conta do Google com acesso aos vídeos (e-mail ou número de /u/N/). */
  CONTA_DRIVE?: string | null;
}

const locais = import.meta.glob<ArquivoVideos>('./videos.local.ts', { eager: true });
const local = Object.values(locais)[0];

export const VIDEOS: VideoCurso[] = local?.VIDEOS ?? [];
export const CONTA_DRIVE: string | null = local?.CONTA_DRIVE ?? null;
