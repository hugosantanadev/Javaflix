import { FireIcon, SnowflakeIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { CARGOS, getCargo } from '../content/catalogo';
import { getConquista } from '../lib/conquistas';
import { ouvir, type Evento } from '../lib/eventos';
import { sfx } from '../lib/sfx';
import { ArteCargo } from './Arte';

interface Toast {
  id: number;
  evento: Evento;
}

let seq = 0;

/** Toasts de XP e conquistas, e as celebrações de meta diária e promoção. */
export function Efeitos() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [meta, setMeta] = useState<number | null>(null);
  const [promocao, setPromocao] = useState<string | null>(null);

  useEffect(
    () =>
      ouvir((e) => {
        if (e.tipo === 'meta') {
          setMeta(e.dias);
          sfx.ofensiva();
          window.setTimeout(() => setMeta(null), 2600);
          return;
        }
        if (e.tipo === 'promocao') {
          setPromocao(e.cargo);
          sfx.conclusao();
          return;
        }
        if (e.tipo === 'conquista') sfx.conquista();
        const id = ++seq;
        setToasts((t) => {
          // XP seguidos se acumulam num toast só
          if (e.tipo === 'xp') {
            const ultimo = t[t.length - 1];
            if (ultimo && ultimo.evento.tipo === 'xp') {
              const somado: Toast = {
                id,
                evento: { tipo: 'xp', valor: ultimo.evento.valor + e.valor, motivo: e.motivo },
              };
              return [...t.slice(0, -1), somado];
            }
          }
          return [...t.slice(-3), { id, evento: e }];
        });
        window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), e.tipo === 'conquista' ? 4200 : 1900);
      }),
    [],
  );

  return (
    <>
      <div className="toasts" aria-live="polite">
        {toasts.map(({ id, evento: e }) => {
          if (e.tipo === 'xp')
            return (
              <div key={id} className="toast toast-xp">
                <strong>+{e.valor} XP</strong>
                <span>{e.motivo}</span>
              </div>
            );
          if (e.tipo === 'conquista') {
            const c = getConquista(e.id);
            if (!c) return null;
            return (
              <div key={id} className="toast toast-conquista">
                <span className="selo">{c.selo}</span>
                <div>
                  <small>Conquista desbloqueada</small>
                  <strong>{c.titulo}</strong>
                  <span>{c.descricao}</span>
                </div>
              </div>
            );
          }
          if (e.tipo === 'congelamento')
            return (
              <div key={id} className="toast toast-gelo">
                <SnowflakeIcon size={22} weight="bold" />
                <span>Você ganhou um congelamento de ofensiva ({e.total}/2)</span>
              </div>
            );
          if (e.tipo === 'aviso')
            return (
              <div key={id} className="toast">
                <span>{e.texto}</span>
              </div>
            );
          return null;
        })}
      </div>

      {meta !== null && (
        <div className="celebra-meta" role="status" onClick={() => setMeta(null)}>
          <div className="celebra-chama">
            <FireIcon size={120} weight="fill" />
          </div>
          <strong>{meta}</strong>
          <span>{meta === 1 ? 'dia de ofensiva' : 'dias de ofensiva'}</span>
          <small>Meta diária batida</small>
        </div>
      )}

      {promocao && (
        <div className="celebra-promocao" role="dialog" aria-modal onClick={() => setPromocao(null)}>
          <div className="celebra-promocao-caixa" onClick={(e) => e.stopPropagation()}>
            <span className="celebra-sobre">Avaliação de desempenho aprovada</span>
            <h2>
              Promovido!
              <span>{proximoTitulo(promocao)}</span>
            </h2>
            <div className="celebra-poster">
              <ArteCargo cargoId={promocao} />
            </div>
            <button type="button" className="btn btn-play" onClick={() => setPromocao(null)}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function proximoTitulo(cargoId: string) {
  const c = getCargo(cargoId);
  if (!c) return '';
  const prox = CARGOS.find((x) => x.ordem === c.ordem + 1);
  return prox ? `Agora você é ${prox.titulo}` : 'Você completou a trilha inteira';
}
