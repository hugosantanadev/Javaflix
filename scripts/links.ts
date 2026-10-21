/**
 * npm run links
 *
 * Abre cada link de material recomendado (episódios e src/content/materiais.ts)
 * e avisa os que não respondem. Sites que bloqueiam robôs (403/429) aparecem
 * como aviso, não como erro.
 */
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import type { TemporadaConteudo } from '../src/content/types.ts';

const BLOQUEIAM_ROBOS = ['education.oracle.com', 'baeldung.com', 'leetcode.com'];
const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function coletar(): Promise<Map<string, string[]>> {
  const usos = new Map<string, string[]>();
  const add = (url: string, onde: string) => usos.set(url, [...(usos.get(url) ?? []), onde]);
  const vite = await createServer({
    root: RAIZ,
    configFile: false,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const { MATERIAIS } = await vite.ssrLoadModule('/src/content/materiais.ts');
    for (const m of MATERIAIS as { url: string; titulo: string }[]) add(m.url, `materiais: ${m.titulo}`);
    const dir = join(RAIZ, 'src', 'content', 'temporadas');
    if (existsSync(dir)) {
      for (const p of await readdir(dir, { withFileTypes: true })) {
        if (!p.isDirectory()) continue;
        const mod = await vite.ssrLoadModule(`/src/content/temporadas/${p.name}/index.ts`);
        const t = mod.default as TemporadaConteudo;
        for (const ep of t.episodios) for (const r of ep.recursos) add(r.url, `${ep.id}: ${r.titulo}`);
      }
    }
  } finally {
    await vite.close();
  }
  return usos;
}

async function checar(url: string): Promise<{ status: number; erro?: string }> {
  // YouTube responde 200 até para vídeo inexistente; o oEmbed devolve erro de verdade
  if (/youtube\.com|youtu\.be/.test(url)) {
    try {
      const r = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(20_000) });
      return { status: r.ok ? 200 : r.status };
    } catch (e) {
      return { status: 0, erro: (e as Error).message };
    }
  }
  const opcoes = {
    redirect: 'follow' as const,
    signal: AbortSignal.timeout(20_000),
    headers: { 'user-agent': 'Mozilla/5.0 (Javaflix link checker)', accept: 'text/html,*/*' },
  };
  try {
    let r = await fetch(url, { ...opcoes, method: 'HEAD' });
    if (r.status === 405 || r.status === 403 || r.status === 404) r = await fetch(url, { ...opcoes, method: 'GET' });
    return { status: r.status };
  } catch (e) {
    return { status: 0, erro: (e as Error).message };
  }
}

async function main() {
  const usos = await coletar();
  console.log(`\nConferindo ${usos.size} links...\n`);
  const urls = [...usos.keys()];
  const resultados: { url: string; status: number; erro?: string }[] = [];
  const fila = [...urls];
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      while (fila.length) {
        const url = fila.shift()!;
        resultados.push({ url, ...(await checar(url)) });
      }
    }),
  );
  let erros = 0;
  for (const r of resultados.sort((a, b) => a.url.localeCompare(b.url))) {
    const ok = r.status >= 200 && r.status < 400;
    // a Oracle Education bloqueia robôs; o link é conferido à mão
    const aviso = r.status === 403 || r.status === 429 || (r.status === 0 && BLOQUEIAM_ROBOS.some((d) => r.url.includes(d)));
    if (!ok && !aviso) erros++;
    const marca = ok ? '\x1b[32m✓\x1b[0m' : aviso ? '\x1b[33m!\x1b[0m' : '\x1b[31m✗\x1b[0m';
    console.log(`${marca} ${String(r.status || 'ERR').padEnd(4)} ${r.url}${r.erro ? `  (${r.erro})` : ''}`);
    if (!ok) for (const u of usos.get(r.url)!) console.log(`         usado em ${u}`);
  }
  console.log(erros ? `\n${erros} link(s) quebrado(s).\n` : '\nTodos os links responderam.\n');
  process.exit(erros ? 1 : 0);
}

main();
