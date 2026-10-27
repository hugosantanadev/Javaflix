"""Procura quadros e figuras que cortaram um parágrafo ao meio.

Uso: python scripts/retro/paragrafos.py src/content/temporadas/junior-t1/e01.md [...]
Aponta: linha de texto colada logo depois de um quadro (vira continuação dele),
linha começando com espaço (resto de parágrafo cortado) e imagem no meio de uma linha.
"""
import re
import sys

problemas = 0
for p in sys.argv[1:]:
    linhas = open(p, encoding='utf-8').read().split('\n')
    codigo = False
    for i, l in enumerate(linhas):
        if l.lstrip('> ').startswith('```'):
            codigo = not codigo
            continue
        if codigo:
            continue
        seguinte = linhas[i + 1] if i + 1 < len(linhas) else ''
        motivo = None
        if l.startswith('>') and seguinte.strip() and not seguinte.startswith('>'):
            motivo = 'texto colado depois do quadro'
        elif re.match(r'^ [^ ]', l):
            motivo = 'linha começa com espaço'
        elif re.search(r'\S !\[', l):
            motivo = 'imagem no meio da linha'
        if motivo:
            problemas += 1
            print(f'{p}:{i + 2 if motivo.startswith("texto") else i + 1}: {motivo}')
sys.exit(1 if problemas else 0)
