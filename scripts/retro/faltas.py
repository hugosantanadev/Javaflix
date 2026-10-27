"""Lista o que falta no retroativo de cada episódio. Uso: python faltas.py estagiario-t2 junior-t1 ..."""
import re
import sys
from pathlib import Path

RAIZ = Path(r'D:/Projetos Pessoais/Javaflix/src/content/temporadas')
sys.stdout.reconfigure(encoding='utf-8')
for temporada in sys.argv[1:]:
    pasta = RAIZ / temporada
    for md in sorted(pasta.glob('e0*.md')):
        aula = md.read_text(encoding='utf-8')
        ts = md.with_suffix('.ts').read_text(encoding='utf-8')
        hf = set(re.findall(r'\[!(PERGUNTAS|CONVERSA|LAPIS|COMPILADOR)\]', aula)) | ({'IMAS'} if '```imas' in aula else set())
        falta = []
        if '](/figuras/' not in aula: falta.append('figura')
        if len(hf) < 2: falta.append(f'livro({len(hf)})')
        if not re.search(r'\[!(ERRO|PREVENCAO|DESEMPENHO|ENGENHARIA)\]', aula): falta.append('deitel')
        if '//>' not in aula: falta.append('notas')
        for tag in ('MATEMATICA', 'ANTES', 'IA', 'PENSE'):
            if f'[!{tag}]' not in aula: falta.append(tag.lower())
        if '## Na IDE' not in aula: falta.append('ide')
        if '\n  ia: {' not in ts: falta.append('ia.ts')
        if '\n  bugs: [' not in ts: falta.append('bugs')
        n_ex = len(re.findall(r"\n    \{\n      id: '", ts))
        n_dica = len(re.findall(r'\n      dica:', ts))
        if n_dica < 15: falta.append(f'dicas {n_dica}/15')
        print(f'{temporada}/{md.stem} ({len(aula)//1000}k): {", ".join(falta) or "ok"}')
