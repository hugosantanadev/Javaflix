import { useLayoutEffect, useMemo, useRef, type MouseEvent } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { renderInline, renderMarkdown } from '../lib/markdown';
import { sfx } from '../lib/sfx';

/** Ímãs de código: clicar move a linha entre a geladeira e a montagem; conferir compara com a ordem certa. */
function ima(alvo: HTMLElement): boolean {
  const bloco = alvo.closest<HTMLElement>('[data-imas]');
  if (!bloco) return false;
  const geladeira = bloco.querySelector<HTMLElement>('.imas-geladeira')!;
  const montagem = bloco.querySelector<HTMLElement>('.imas-montagem')!;
  const resultado = bloco.querySelector<HTMLElement>('.imas-resultado')!;
  // na montagem, o recuo sai da profundidade das chaves, como uma IDE formatando o código
  const recuar = () => {
    let nivel = 0;
    montagem.querySelectorAll<HTMLElement>('.ima').forEach((b) => {
      const linha = (b.dataset.ima ?? '').trim();
      if (linha.startsWith('}')) nivel = Math.max(0, nivel - 1);
      b.style.setProperty('--recuo', `${nivel * 4}ch`);
      if (linha.endsWith('{')) nivel++;
    });
  };
  const botao = alvo.closest<HTMLElement>('.ima');
  if (botao) {
    (botao.parentElement === geladeira ? montagem : geladeira).appendChild(botao);
    recuar();
    bloco.classList.remove('certo', 'errado');
    resultado.textContent = '';
    return true;
  }
  if (alvo.closest('[data-imas-recomecar]')) {
    [...bloco.querySelectorAll<HTMLElement>('.ima')]
      .sort((a, b) => Number(a.dataset.pos) - Number(b.dataset.pos))
      .forEach((b) => geladeira.appendChild(b));
    bloco.classList.remove('certo', 'errado');
    resultado.textContent = '';
    return true;
  }
  if (alvo.closest('[data-imas-conferir]')) {
    // compara sem os espaços: as três chaves "}" de um programa são intercambiáveis
    const certo: string[] = (JSON.parse(bloco.dataset.certo ?? '[]') as string[]).map((l) => l.trim());
    const montado = [...montagem.querySelectorAll<HTMLElement>('.ima')].map((b) => (b.dataset.ima ?? '').trim());
    const primeiraErrada = montado.findIndex((l, i) => l !== certo[i]);
    const ok = montado.length === certo.length && primeiraErrada < 0;
    bloco.classList.toggle('certo', ok);
    bloco.classList.toggle('errado', !ok);
    if (ok) resultado.textContent = 'Isso! O programa está na ordem certa.';
    else if (primeiraErrada >= 0) resultado.textContent = `Quase: a linha ${primeiraErrada + 1} está fora do lugar.`;
    else resultado.textContent = `Faltam ${certo.length - montado.length} linha(s) na montagem.`;
    if (ok) sfx.certo();
    else sfx.errado();
    return true;
  }
  return false;
}

function cliques(e: MouseEvent<HTMLElement>, nav: NavigateFunction) {
  if (ima(e.target as HTMLElement)) return;
  // links internos (ex.: para outro episódio) navegam sem recarregar o site
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="/"]');
  if (link && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
    e.preventDefault();
    nav(link.getAttribute('href')!);
    return;
  }
  const botao = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copiar]');
  if (!botao) return;
  const pre = botao.closest('figure')?.querySelector('pre');
  if (!pre) return;
  void navigator.clipboard?.writeText(pre.innerText).then(() => {
    botao.textContent = 'Copiado';
    window.setTimeout(() => (botao.textContent = 'Copiar'), 1400);
  });
}

/** Na margem (telas largas), cada anotação fica na altura da sua linha e empurra a seguinte se encostar. */
const MARGEM = '(min-width: 1440px)';

function posicionarNotas(raiz: HTMLElement) {
  // só as aulas têm a coluna da margem; em outras páginas as notas ficam embaixo do código
  const naMargem = raiz.classList.contains('md-aula') && window.matchMedia(MARGEM).matches;
  raiz.querySelectorAll<HTMLElement>('.md-anotado').forEach((bloco) => {
    const pre = bloco.querySelector('pre');
    const notas = bloco.querySelectorAll<HTMLElement>('.md-notas li');
    if (!pre) return;
    const estilo = getComputedStyle(pre);
    const alturaLinha = parseFloat(estilo.lineHeight);
    const topoPre = pre.getBoundingClientRect().top - bloco.getBoundingClientRect().top + parseFloat(estilo.paddingTop);
    let livre = 0;
    notas.forEach((li) => {
      if (!naMargem) {
        li.style.top = '';
        return;
      }
      const desejado = topoPre + (Number(li.dataset.linha) - 1) * alturaLinha - 2;
      const topo = Math.max(desejado, livre);
      li.style.top = `${topo}px`;
      livre = topo + li.offsetHeight + 10;
    });
  });
}

export function Markdown({ texto, className = '' }: { texto: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(texto), [texto]);
  const nav = useNavigate();
  const raiz = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = raiz.current;
    if (!el || !el.querySelector('.md-anotado')) return;
    const posicionar = () => posicionarNotas(el);
    posicionar();
    void document.fonts?.ready.then(posicionar);
    window.addEventListener('resize', posicionar);
    return () => window.removeEventListener('resize', posicionar);
  }, [html]);

  return <div ref={raiz} className={`md ${className}`} onClick={(e) => cliques(e, nav)} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MarkdownInline({ texto, className = '' }: { texto: string; className?: string }) {
  const html = useMemo(() => renderInline(texto), [texto]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
