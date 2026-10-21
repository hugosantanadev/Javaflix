import { ArrowSquareOutIcon, CheckIcon, PlayIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import type { VideoCurso } from '../content/types';
import { CONTA_DRIVE } from '../content/videos';
import { useProgresso, useStore } from '../lib/store';

const conta = CONTA_DRIVE ? `?authuser=${encodeURIComponent(CONTA_DRIVE)}` : '';
export const urlPreview = (id: string) => `https://drive.google.com/file/d/${id}/preview${conta}`;
export const urlDrive = (id: string) => `https://drive.google.com/file/d/${id}/view${conta}`;

/** Player do Google Drive carregado só no clique (o iframe é pesado). */
export function VideoDrive({ video, compacto = false }: { video: VideoCurso; compacto?: boolean }) {
  const [tocando, setTocando] = useState(false);
  const progresso = useProgresso();
  const marcar = useStore((s) => s.marcarVideo);
  const visto = !!progresso.videos[video.driveId];

  return (
    <div className={`video-drive ${compacto ? 'compacto' : ''}`}>
      <div className="video-tela">
        {tocando ? (
          <iframe
            src={urlPreview(video.driveId)}
            title={video.titulo}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button type="button" className="video-capa" onClick={() => setTocando(true)} aria-label={`Assistir ${video.titulo}`}>
            <span className="video-capa-titulo">{video.titulo}</span>
            <span className="video-capa-play">
              <PlayIcon size={30} weight="fill" />
            </span>
            {video.duracao && <span className="video-capa-duracao">{video.duracao}</span>}
          </button>
        )}
      </div>
      <div className="video-rodape">
        <div className="video-rodape-texto">
          <strong>{video.titulo}</strong>
          {video.modulo && <span>{video.modulo}</span>}
        </div>
        <a
          className={`btn btn-linha btn-sm ${compacto ? 'so-icone' : ''}`}
          href={urlDrive(video.driveId)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir no Google Drive"
          title="Abrir no Google Drive"
        >
          <ArrowSquareOutIcon size={16} /> {!compacto && 'Drive'}
        </a>
        <button
          type="button"
          className={`btn btn-sm ${visto ? 'btn-linha' : 'btn-ghost'} ${compacto ? 'so-icone' : ''}`}
          onClick={() => marcar(video.driveId)}
          disabled={visto}
          aria-label={visto ? 'Vídeo visto' : 'Marcar como visto'}
          title={visto ? 'Vídeo visto' : 'Marcar como visto'}
        >
          <CheckIcon size={16} weight="bold" /> {!compacto && (visto ? 'Visto' : 'Marcar visto')}
        </button>
      </div>
    </div>
  );
}
