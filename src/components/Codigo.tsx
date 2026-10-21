import { useMemo } from 'react';
import { destacar, destacarLinhas } from '../lib/destaque';

interface CodigoProps {
  codigo: string;
  /** Linhas clicáveis (exercício "linha"). */
  aoClicarLinha?: (n: number) => void;
  linhaSelecionada?: number | null;
  linhaCerta?: number | null;
  linhaErrada?: number | null;
  /** Exercício "lacuna": valor e mudança do input embutido no lugar de ___. */
  lacuna?: { valor: string; mudar: (v: string) => void; travado: boolean; estado?: 'certo' | 'errado' };
  rotulo?: string;
}

/** Bloco de código com números de linha, com suporte a linha clicável e lacuna. */
export function Codigo({ codigo, aoClicarLinha, linhaSelecionada, linhaCerta, linhaErrada, lacuna, rotulo = 'Java' }: CodigoProps) {
  const linhas = useMemo(() => {
    if (!lacuna) return destacarLinhas(codigo);
    return codigo.split('\n').map((l) => (l.includes('___') ? null : destacar(l)));
  }, [codigo, lacuna]);
  const brutas = codigo.split('\n');
  const largura = String(brutas.length).length;

  return (
    <figure className={`codigo ${aoClicarLinha ? 'clicavel' : ''}`}>
      <figcaption>
        <span className="md-lingua">{rotulo}</span>
        {aoClicarLinha && <span className="codigo-dica">Clique na linha</span>}
      </figcaption>
      <pre>
        <code style={{ '--largura-num': `${largura + 1}ch` } as React.CSSProperties}>
          {linhas.map((html, i) => {
            const n = i + 1;
            const classes = [
              'linha',
              linhaSelecionada === n ? 'selecionada' : '',
              linhaCerta === n ? 'certa' : '',
              linhaErrada === n ? 'errada' : '',
            ].join(' ');
            let conteudo: React.ReactNode;
            if (html === null && lacuna) {
              const [antes, depois] = brutas[i].split('___');
              conteudo = (
                <>
                  <span dangerouslySetInnerHTML={{ __html: destacar(antes) }} />
                  <input
                    className={`lacuna ${lacuna.estado ?? ''}`}
                    value={lacuna.valor}
                    onChange={(e) => lacuna.mudar(e.target.value)}
                    disabled={lacuna.travado}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    aria-label="Complete o código"
                    size={Math.max(6, lacuna.valor.length + 1)}
                    data-lacuna
                  />
                  <span dangerouslySetInnerHTML={{ __html: destacar(depois) }} />
                </>
              );
            } else {
              conteudo = <span dangerouslySetInnerHTML={{ __html: html || ' ' }} />;
            }
            if (aoClicarLinha) {
              return (
                <button type="button" key={i} className={classes} onClick={() => aoClicarLinha(n)} aria-label={`Linha ${n}`}>
                  <span className="num">{n}</span>
                  {conteudo}
                </button>
              );
            }
            return (
              <span key={i} className={classes}>
                <span className="num">{n}</span>
                {conteudo}
                {'\n'}
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
