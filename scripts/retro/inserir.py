"""Insere os campos `ia` e `bugs` num episódio.

Uso: python scripts/retro/inserir.py <episodio.ts> <fragmento.ts>

O fragmento tem duas partes, cada uma começando por uma linha marcadora:
//@ia     -> texto inserido antes de `  recursos: [`
//@bugs   -> texto inserido antes de `  exercicios: [`
O texto de cada parte vai como está, já indentado com dois espaços.
"""
import sys

alvo, frag = sys.argv[1], sys.argv[2]
partes = {}
atual = None
for linha in open(frag, encoding='utf-8').read().splitlines(keepends=True):
    if linha.startswith('//@'):
        atual = linha[3:].strip()
        partes[atual] = ''
    elif atual:
        partes[atual] += linha

s = open(alvo, encoding='utf-8').read()
for nome, ancora in (('ia', '  recursos: [\n'), ('bugs', '  exercicios: [\n')):
    if nome not in partes:
        continue
    if f'\n  {nome}: ' in s:
        sys.exit(f'{alvo} já tem {nome}')
    if s.count(ancora) != 1:
        sys.exit(f'{alvo}: âncora de {nome} não é única')
    s = s.replace(ancora, partes[nome] + ancora)
open(alvo, 'w', encoding='utf-8').write(s)
print('ok:', alvo, ', '.join(partes))
