**De:** coordenação pedagógica do Colégio Ponte Alta (uma escola fictícia)
**Para:** você, estagiário da equipe de sistemas
**Assunto:** boletim do 3º bimestre

Todo bimestre a coordenação passa uma tarde montando boletins à mão. O sistema da escola exporta as notas como texto, uma linha por aluno, com os campos separados por ponto e vírgula e a vírgula como separador decimal. Queremos um programa que receba esse texto e devolva o boletim pronto, com um resumo da turma para a reunião de conselho.

A exportação da turma do 2º ano B, que vamos usar como teste:

```text
Ana Souza;7,5;8;9;6,5
Bruno Lima;5;4,5;6;5,5
Carla Dias;9,5;10;9;9,5
Diego Rocha;3;4;2,5;5
Joana Prado;8;7;9
Elisa Martins;6,5;7;7,5;7
Fábio Nunes;8;6;7;6,5
Gabriela Torres de Albuquerque;10;9,5;9;8,5
Kaique Melo;7;oito;6;5
Heitor Alves;4;6;5;5,5
Igor Campos;7;6,8;7;7
```

Sim, a exportação vem com defeitos: a Joana está sem uma nota e alguém digitou "oito" por extenso. Acontece toda vez.

| Regra | Detalhe |
|---|---|
| Provas | quatro por aluno, de 0 a 10 |
| Média | aritmética das quatro, arredondada para uma casa decimal |
| Situação | pela média arredondada: 7 ou mais aprovado, de 5 a 6,9 recuperação, abaixo de 5 reprovado |
| Linhas com defeito | ignoradas, com um aviso que diz o número da linha e o motivo |
| Boletim | colunas alinhadas, vírgula decimal, nomes longos encurtados |
| Resumo | média, mediana e desvio padrão da turma, maior e menor média, contagem por situação e um histograma |
| Conselho | os três melhores e, para quem está em recuperação, as provas abaixo de 5 |

**O que entregar:** um arquivo `Boletim.java`, que roda com `java Boletim.java < turma.txt`, sem bibliotecas além do JDK.

> [!PENSE]
> Antes de começar, decida: o programa vai guardar os dados de cada aluno onde? Quantos arrays você imagina, e de que tipo? Por que não dá para criar os arrays com o tamanho exato antes de ler a última linha?

São cinco etapas. Tudo o que você precisa está nas temporadas [Texto](/?t=estagiario-t5) e [Arrays e Math](/?t=estagiario-t6), mais o que o [caixa eletrônico](/projetos/estagiario-p1) já ensinou sobre `Scanner` e métodos.
