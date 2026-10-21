Processar um arquivo de texto, desconfiar dos dados e produzir um relatório é o que boa parte dos sistemas faz o dia inteiro, e é o tipo de tarefa que aparece em teste técnico de estágio. Guarde na pasta do projeto:

- `Boletim.java`, a versão final;
- `turma.txt`, a turma do pedido, com as duas linhas defeituosas;
- `README.md`.

Um roteiro de README:

```text
# Boletim da turma

Lê a exportação de notas de uma turma (texto com ";" e vírgula decimal),
calcula médias e situação, imprime o boletim alinhado e um resumo
estatístico para o conselho de classe.

## Como rodar
java Boletim.java < turma.txt

## Decisões
- Linhas com defeito são ignoradas com o número da linha e o motivo;
  nenhuma nota inválida chega ao parseDouble.
- A média é arredondada uma vez, com uma casa, e a situação usa o valor arredondado.
- O ranking ordena um array de índices, para não desalinhar os arrays paralelos.
- Números formatados com Locale pt-BR explícito.
```

Para mostrar mais domínio, inclua no README o exemplo da saída e um parágrafo sobre o que você mudaria com o que aprendeu depois: um `record Aluno` e um `enum Situacao`, do Júnior, e uma `List`, do Pleno. Reescrever o mesmo projeto com ferramentas melhores, e explicar a diferença, é uma das melhores histórias para contar numa entrevista.
