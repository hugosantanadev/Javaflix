"""Lista os exercícios de um episódio de forma compacta, para escrever as dicas.

Uso: python scripts/retro/listar.py src/content/temporadas/estagiario-t2/e01.ts
"""
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
texto = open(sys.argv[1], encoding='utf-8').read()
inicio = texto.index('\n  exercicios: [')
blocos = re.split(r"\n    \{\n      id: '", texto[inicio:])[1:]
for bloco in blocos:
    qid = bloco[: bloco.index("'")]
    tipo = re.search(r"tipo: '(\w+)'", bloco).group(1)
    enun = re.search(r"enunciado:\s*\n?\s*'((?:[^'\\]|\\.)*)'", bloco)
    cod = re.search(r'codigo: `((?:[^`\\]|\\.)*)`', bloco)
    resp = re.search(r'(resposta|respostas|saida|aceitas|linha): ([^\n]+)', bloco)
    print(f"## {qid.split('-')[-1]} {tipo} | {resp.group(0)[:90] if resp else ''}")
    if enun:
        print('  E:', enun.group(1)[:220])
    if cod:
        print('  C:', ' / '.join(cod.group(1).split('\n'))[:420])
    ops = re.search(r'opcoes: \[([\s\S]*?)\n      \]', bloco) or re.search(r'opcoes: \[([^\n]*)\]', bloco)
    if ops:
        print('  O:', ' '.join(ops.group(1).split())[:300])
