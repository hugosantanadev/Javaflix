"""Insere `dica` em cada exercício de um episódio, a partir de um JSON {"q01": "texto", ...}.

Uso: python scripts/retro/dicas.py src/content/temporadas/estagiario-t2/e01.ts dicas.json
A dica entra como última propriedade do exercício. Exercícios que já têm dica são pulados.
"""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
arquivo, origem = sys.argv[1], sys.argv[2]
texto = open(arquivo, encoding='utf-8').read()
dicas = json.load(open(origem, encoding='utf-8'))
inicio = texto.index('\n  exercicios: [')
cabeca, corpo = texto[:inicio], texto[inicio:]
partes = re.split(r"(\n    \{\n      id: ')", corpo)
saida = [partes[0]]
feitas = 0
for marca, bloco in zip(partes[1::2], partes[2::2]):
    qid = bloco[: bloco.index("'")]
    chave = 'q' + qid.split('-q')[-1]
    fim = bloco.index('\n    },')
    if chave in dicas and '\n      dica:' not in bloco[:fim]:
        valor = dicas[chave].replace('\\', '\\\\').replace("'", "\\'")
        bloco = bloco[:fim] + f"\n      dica: '{valor}'," + bloco[fim:]
        feitas += 1
    saida.append(marca + bloco)
open(arquivo, 'w', encoding='utf-8').write(cabeca + ''.join(saida))
print(f'ok: {arquivo} {feitas} dicas')
