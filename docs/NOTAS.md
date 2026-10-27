# Sistema de notas (no lugar do XP)

Simula uma faculdade: cada questão tem nota, cada episódio tem média, e a temporada só é aprovada com média 7. Decidido com o usuário em 2026-10-27. Implementado no Estagiário em 2026-10-27 (`src/lib/notas.ts`, página `/boletim`).

## Escopo

Implementar e validar **só no cargo Estagiário** (T1 a T6). Os outros cargos recebem o sistema depois que o usuário aprovar o resultado.

## Pontuação de cada questão (0 a 1)

- Escolha única, saída, lacuna e "clique na linha": tudo ou nada (1 ou 0).
- Saída de várias linhas: **tudo ou nada**, sem nota proporcional por linha.
- Múltipla escolha ("escolha N"): cada alternativa certa marcada vale 1/N; **cada alternativa errada marcada desconta 1/N**; mínimo 0. Ex.: escolha 3, marcou 2 certas = 0,67; 2 certas e 1 errada = 0,33.
- Peso opcional por questão (padrão 1), definido no conteúdo.

## Teto por dica e por tentativa

A nota da questão é a pontuação parcial multiplicada pelo teto:

- Abriu a dica: teto 0,7.
- Segunda tentativa: teto 0,7; terceira em diante: teto 0,5.
- Viu a solução: 0.

## Média do episódio

- (soma dos pontos ÷ soma dos pesos) × 10.
- Aparece em tempo real durante o exercício ("Nota parcial: 8,3, 12 de 15 respondidas") e fica fixa ao concluir.
- Refazer guarda a maior nota.
- Bugs da aba Depuração entram como trabalho, com peso menor.

## Média da temporada

- Pesos: exercícios dos episódios 30%, desafio 20%, prova 50%.
- Recalculada a cada questão respondida.
- O painel mostra a média atual, quanto falta ("precisa de 6,2 na prova para fechar com 7") e a situação: cursando, aprovado ou recuperação.
- **Média ≥ 7: aprovado**, e a próxima temporada destrava.
- Abaixo de 7: recuperação. Refaz a prova com questões sorteadas de novo, e a nota da prova é trocada se a nova for maior.

## Fim do XP como regra

- O XP deixa de destravar conteúdo.
- A promoção de cargo exige todas as temporadas do cargo aprovadas e um CR (média do cargo) ≥ 7.
- A ofensiva e as conquistas continuam como incentivo.

## Boletim

Página nova com:

- a nota de cada episódio, de cada prova e da temporada;
- a situação de cada temporada;
- o CR geral e a evolução;
- os assuntos abaixo de 7, ligados à revisão espaçada.

## Pontos de atenção

- Progresso antigo, sem tentativas registradas: a nota do episódio sai dos acertos guardados (tudo ou nada, sem teto); prova antiga usa a melhor porcentagem; desafio antigo vale 10.
- Bug da Depuração: peso 0,5; achado de primeira vale 1, depois de errar 0,7.
- Desafio: dica limita a 7, ver a solução zera. Desafio não entregue conta 0 na média.
- "Questões sorteadas de novo" na recuperação: a prova sorteia a ordem das questões a cada tentativa (o banco de cada prova é fixo).
- O Modo livre ignora os bloqueios, mas mostra as notas.
- Arquivos principais:
  - `src/lib/store.ts`: pontos, tentativa e uso de dica por questão;
  - `src/lib/progresso.ts`: aprovação por média;
  - a correção das questões;
  - a tela da prova;
  - a página nova de boletim.
