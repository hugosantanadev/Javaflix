Um projeto de terminal parece simples, mas mostra o que recrutador procura num estagiário: regra de negócio entendida, contas certas e cuidado com entrada errada. Guarde o projeto numa pasta própria, com três arquivos:

- `Caixa.java`, a versão final;
- `entrada.txt`, a sequência do teste de aceitação;
- `README.md`, um texto curto que qualquer pessoa entende sem abrir o código.

O README pode seguir este roteiro:

```text
# Caixa eletrônico de terminal

Protótipo de caixa eletrônico em Java puro: saldo, depósito, saque em notas,
tarifa a partir do quarto saque, limite diário e extrato.

## Como rodar
java Caixa.java
java Caixa.java < entrada.txt     (teste de aceitação)

## Decisões
- Dinheiro em centavos num long, para não ter erro de arredondamento.
- Notas pelo algoritmo guloso, que é ótimo para notas de 100, 50, 20 e 10.
- Toda leitura passa por um método que não quebra com letras.
```

A seção **Decisões** é a que mais conta: ela mostra que você sabe **por que** escreveu cada coisa. Quando chegar à temporada [Ferramentas do dia a dia](/?t=backend-junior-t1), do Backend Júnior, publique a pasta no GitHub, com um commit por etapa. O histórico conta a evolução do projeto melhor do que qualquer descrição.
