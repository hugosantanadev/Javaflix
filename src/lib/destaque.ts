import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import asm from '@shikijs/langs/asm';
import bash from '@shikijs/langs/bash';
import c from '@shikijs/langs/c';
import diff from '@shikijs/langs/diff';
import dockerfile from '@shikijs/langs/dockerfile';
import java from '@shikijs/langs/java';
import json from '@shikijs/langs/json';
import kotlin from '@shikijs/langs/kotlin';
import properties from '@shikijs/langs/properties';
import sql from '@shikijs/langs/sql';
import xml from '@shikijs/langs/xml';
import yaml from '@shikijs/langs/yaml';
import { createHighlighterCoreSync, type ThemeRegistration } from 'shiki/core';

/** Tema próprio: fundo quase preto, palavras-chave na cor de brasa do site. */
const tema: ThemeRegistration = {
  name: 'javaflix',
  type: 'dark',
  colors: {
    'editor.background': '#0f0e0c',
    'editor.foreground': '#e9e3da',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#776f65', fontStyle: 'italic' } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.other', 'variable.language'],
      settings: { foreground: '#ff8f45' },
    },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: '#a69f95' } },
    { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#b9dc8e' } },
    { scope: ['constant.character.escape'], settings: { foreground: '#e7c46c' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.other'], settings: { foreground: '#f2c75c' } },
    {
      scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class', 'storage.type.java', 'entity.other.inherited-class'],
      settings: { foreground: '#83c9f4' },
    },
    { scope: ['storage.type.primitive', 'storage.type.primitive.array'], settings: { foreground: '#ff8f45' } },
    { scope: ['entity.name.function', 'support.function', 'meta.method-call entity.name.function'], settings: { foreground: '#f1d9ad' } },
    { scope: ['storage.type.annotation', 'punctuation.definition.annotation', 'meta.declaration.annotation'], settings: { foreground: '#8fd1c2' } },
    { scope: ['variable.parameter'], settings: { foreground: '#e9e3da' } },
    { scope: ['entity.name.tag'], settings: { foreground: '#ff8f45' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#f1d9ad' } },
    { scope: ['markup.inserted', 'punctuation.definition.inserted'], settings: { foreground: '#4fd68b' } },
    { scope: ['markup.deleted', 'punctuation.definition.deleted'], settings: { foreground: '#ff5a4f' } },
    { scope: ['meta.diff.range', 'meta.diff.header'], settings: { foreground: '#8fd3ff' } },
  ],
};

const highlighter = createHighlighterCoreSync({
  themes: [tema],
  langs: [java, bash, json, sql, yaml, xml, properties, c, asm, kotlin, dockerfile, diff],
  engine: createJavaScriptRegexEngine(),
});

const ALIAS: Record<string, string> = {
  sh: 'bash',
  shell: 'bash',
  terminal: 'bash',
  yml: 'yaml',
  assembly: 'asm',
  nasm: 'asm',
  kts: 'kotlin',
  docker: 'dockerfile',
};

const SUPORTADAS = new Set(['java', 'bash', 'json', 'sql', 'yaml', 'xml', 'properties', 'c', 'asm', 'kotlin', 'dockerfile', 'diff']);

function escapar(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Retorna as linhas destacadas como HTML (uma string por linha). */
export function destacarLinhas(codigo: string, lingua = 'java'): string[] {
  const lang = ALIAS[lingua] ?? lingua;
  if (!SUPORTADAS.has(lang)) return codigo.split('\n').map(escapar);
  const { tokens } = highlighter.codeToTokens(codigo, { lang, theme: 'javaflix' });
  return tokens.map((linha) =>
    linha
      .map((t) => {
        const estilo = [t.color ? `color:${t.color}` : '', t.fontStyle === 1 ? 'font-style:italic' : ''].filter(Boolean).join(';');
        return estilo ? `<span style="${estilo}">${escapar(t.content)}</span>` : escapar(t.content);
      })
      .join(''),
  );
}

export function destacar(codigo: string, lingua = 'java'): string {
  return destacarLinhas(codigo, lingua).join('\n');
}
