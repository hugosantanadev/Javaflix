import { CheckIcon, FlagIcon, LightbulbIcon, XIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';
import type { Exercicio } from '../content/types';
import { destacar } from '../lib/destaque';
import { LETRAS, normalizarSaida, quantasCorretas, type Resposta } from '../lib/respostas';
import { useStore } from '../lib/store';
import { Codigo } from './Codigo';
import { Markdown, MarkdownInline } from './Markdown';

const POR_EXTENSO = ['', 'uma', 'duas', 'três', 'quatro', 'cinco'];

export function rotuloTipo(q: Exercicio): string {
  switch (q.tipo) {
    case 'escolha':
      return 'Escolha uma';
    case 'multipla':
      return `Escolha ${POR_EXTENSO[q.respostas.length] ?? q.respostas.length}`;
    case 'saida':
      return 'Digite a saída';
    case 'lacuna':
      return 'Complete o código';
    case 'linha':
      return 'Ache o erro';
  }
}

function Opcao({ texto }: { texto: string }) {
  const m = /^\s*`([^`][\s\S]*?)`\s*$/.exec(texto);
  if (m && !m[1].includes('`')) {
    const codigo = m[1];
    if (codigo.includes('\n')) return <pre className="opcao-pre">{codigo}</pre>;
    return <code className="opcao-codigo" dangerouslySetInnerHTML={{ __html: destacar(codigo) }} />;
  }
  return <MarkdownInline texto={texto} />;
}

interface QuestaoProps {
  q: Exercicio;
  resposta: Resposta | null;
  mudar: (r: Resposta) => void;
  revelada: boolean;
  travada: boolean;
  /** Atalhos de teclado para as opções (desligar quando há várias questões na tela). */
  atalhos?: boolean;
}

export function Questao({ q, resposta, mudar, revelada, travada, atalhos = true }: QuestaoProps) {
  // atalhos A-H / 1-8 para opções
  useEffect(() => {
    if (!atalhos || travada || (q.tipo !== 'escolha' && q.tipo !== 'multipla')) return;
    const f = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo.closest('input, textarea, [contenteditable]') || e.ctrlKey || e.metaKey || e.altKey) return;
      let i = LETRAS.indexOf(e.key.toUpperCase());
      if (i < 0 && /^[1-8]$/.test(e.key)) i = Number(e.key) - 1;
      if (i < 0 || i >= q.opcoes.length) return;
      e.preventDefault();
      if (q.tipo === 'escolha') mudar({ tipo: 'escolha', valor: i });
      else {
        const atual = resposta?.tipo === 'multipla' ? resposta.valor : [];
        mudar({ tipo: 'multipla', valor: atual.includes(i) ? atual.filter((x) => x !== i) : [...atual, i] });
      }
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [atalhos, travada, q, resposta, mudar]);

  const corretas = q.tipo === 'escolha' ? [q.resposta] : q.tipo === 'multipla' ? q.respostas : [];

  return (
    <div className="questao">
      <Markdown texto={q.enunciado} className="questao-enunciado" />

      {q.tipo === 'linha' ? (
        <Codigo
          codigo={q.codigo}
          aoClicarLinha={travada ? undefined : (n) => mudar({ tipo: 'linha', valor: n })}
          linhaSelecionada={resposta?.tipo === 'linha' ? resposta.valor : null}
          linhaCerta={revelada ? q.resposta : null}
          linhaErrada={revelada && resposta?.tipo === 'linha' && resposta.valor !== q.resposta ? resposta.valor : null}
        />
      ) : q.tipo === 'lacuna' ? (
        <Codigo
          codigo={q.codigo}
          lacuna={{
            valor: resposta?.tipo === 'lacuna' ? resposta.valor : '',
            mudar: (v) => mudar({ tipo: 'lacuna', valor: v }),
            travado: travada,
            estado: revelada ? (resposta && 'valor' in resposta && respostaLacunaCerta(q, resposta) ? 'certo' : 'errado') : undefined,
          }}
        />
      ) : q.codigo ? (
        <Codigo codigo={q.codigo} />
      ) : null}

      {(q.tipo === 'escolha' || q.tipo === 'multipla') && (
        <ol className={`opcoes ${q.tipo === 'multipla' ? 'multipla' : ''}`}>
          {q.opcoes.map((op, i) => {
            const marcada =
              resposta?.tipo === 'escolha' ? resposta.valor === i : resposta?.tipo === 'multipla' ? resposta.valor.includes(i) : false;
            const certa = corretas.includes(i);
            const estado = revelada ? (certa ? 'certa' : marcada ? 'errada' : 'neutra') : marcada ? 'marcada' : '';
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`opcao ${estado}`}
                  disabled={travada}
                  aria-pressed={marcada}
                  onClick={() => {
                    if (q.tipo === 'escolha') mudar({ tipo: 'escolha', valor: i });
                    else {
                      const atual = resposta?.tipo === 'multipla' ? resposta.valor : [];
                      mudar({ tipo: 'multipla', valor: atual.includes(i) ? atual.filter((x) => x !== i) : [...atual, i] });
                    }
                  }}
                >
                  <span className="opcao-letra">
                    {revelada && certa ? <CheckIcon size={16} weight="bold" /> : revelada && marcada ? <XIcon size={16} weight="bold" /> : LETRAS[i]}
                  </span>
                  <span className="opcao-texto">
                    <Opcao texto={op} />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      {q.tipo === 'multipla' && !travada && (
        <p className="questao-contagem">
          {resposta?.tipo === 'multipla' ? resposta.valor.length : 0} de {quantasCorretas(q)} marcadas
        </p>
      )}

      {q.tipo === 'saida' && (
        <CampoSaida
          valor={resposta?.tipo === 'saida' ? resposta.valor : ''}
          mudar={(v) => mudar({ tipo: 'saida', valor: v })}
          travado={travada}
          esperado={revelada ? q.resposta : null}
        />
      )}
    </div>
  );
}

function respostaLacunaCerta(q: Exercicio, r: Resposta) {
  if (q.tipo !== 'lacuna' || r.tipo !== 'lacuna') return false;
  const norm = (s: string) =>
    s
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\s*([[\](){};,.<>=+\-*/%!&|?:^~])\s*/g, '$1')
      .replace(/;$/, '');
  return q.respostas.some((x) => norm(x) === norm(r.valor));
}

function CampoSaida({ valor, mudar, travado, esperado }: { valor: string; mudar: (v: string) => void; travado: boolean; esperado: string | null }) {
  const certo = esperado !== null && normalizarSaida(valor) === normalizarSaida(esperado);
  return (
    <div className="campo-saida">
      <div className="campo-saida-cabeca">
        <span>Console</span>
        <span className="campo-saida-dica">Uma linha por linha impressa. Espaços no fim não contam.</span>
      </div>
      <textarea
        className="campo-saida-texto"
        value={valor}
        onChange={(e) => mudar(e.target.value)}
        disabled={travado}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        rows={Math.max(3, valor.split('\n').length + 1)}
        placeholder="Digite aqui o que o programa imprime"
        aria-label="Saída do programa"
        data-saida
      />
      {esperado !== null && !certo && (
        <div className="campo-saida-comparacao">
          <div>
            <span>Saída real</span>
            <pre>{esperado}</pre>
          </div>
          <div>
            <span>Você digitou</span>
            <pre>{valor || ' '}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reportar erro                                                       */
/* ------------------------------------------------------------------ */

const MOTIVOS = ['O gabarito está errado', 'A explicação está errada ou confusa', 'O enunciado é ambíguo', 'Erro de digitação', 'Outro'];

export function BotaoReportar({ exercicioId }: { exercicioId: string }) {
  const [aberto, setAberto] = useState(false);
  const [motivo, setMotivo] = useState(MOTIVOS[0]);
  const [texto, setTexto] = useState('');
  const [enviado, setEnviado] = useState(false);
  const reportar = useStore((s) => s.reportar);
  const jaReportado = useStore((s) => (s.ativo ? s.progresso[s.ativo]?.reportes.some((r) => r.exercicio === exercicioId) : false));

  const motivosId = useMemo(() => `motivo-${exercicioId}`, [exercicioId]);

  if (enviado || jaReportado)
    return (
      <span className="reportar enviado">
        <FlagIcon size={16} weight="fill" /> Reportado. Obrigado.
      </span>
    );

  return (
    <>
      <button type="button" className="reportar" onClick={() => setAberto(true)}>
        <FlagIcon size={16} /> Reportar erro
      </button>
      {aberto && (
        <div className="modal-fundo leve" onClick={() => setAberto(false)}>
          <form
            className="modal-pequeno"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              reportar({ exercicio: exercicioId, motivo, texto });
              setEnviado(true);
              setAberto(false);
            }}
          >
            <h3>Reportar erro na questão</h3>
            <p className="modal-pequeno-texto">
              Os reportes ficam salvos em <strong>Conta</strong>, prontos para copiar e colar no agente que gera o conteúdo.
            </p>
            <fieldset className="campo">
              <legend className="rotulo" id={motivosId}>
                O que está errado?
              </legend>
              <div className="radios">
                {MOTIVOS.map((m) => (
                  <label key={m} className="radio">
                    <input type="radio" name="motivo" value={m} checked={motivo === m} onChange={() => setMotivo(m)} />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="campo">
              <label htmlFor={`txt-${exercicioId}`}>Detalhes (opcional)</label>
              <textarea id={`txt-${exercicioId}`} className="input" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ex.: rodei na IDE e a saída foi 12, não 11." />
            </div>
            <div className="modal-pequeno-acoes">
              <button type="button" className="btn btn-linha btn-sm" onClick={() => setAberto(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-accent btn-sm">
                Enviar reporte
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

/** A dica custa o XP da questão: o aviso fica no próprio botão, antes de abrir. */
export function DicaDaQuestao({ dica, aberta, abrir }: { dica: string; aberta: boolean; abrir: () => void }) {
  if (aberta)
    return (
      <div className="dica surgir questao-dica">
        <LightbulbIcon size={20} weight="fill" />
        <Markdown texto={dica} />
      </div>
    );
  return (
    <button type="button" className="btn btn-linha btn-sm questao-dica-botao" onClick={abrir}>
      <LightbulbIcon size={18} /> Pedir dica <small>(sem XP nesta questão)</small>
    </button>
  );
}
