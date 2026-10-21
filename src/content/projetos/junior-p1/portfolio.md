Este é o primeiro projeto que mostra **modelagem**: transformar regras escritas em português em classes que conversam entre si. É exatamente o que uma entrevista técnica de júnior pede quando diz "modele um sistema de biblioteca no quadro". Ter feito, com as decisões explicadas, faz muita diferença.

Organize o projeto como num trabalho de verdade: uma pasta `src/br/com/casadaleitura`, um arquivo por classe, e o `BibliotecaApp` com o roteiro de teste. No README, inclua um diagrama simples em texto:

```text
Catalogavel (interface)
  └── Item (abstrata): código, título, ano
        ├── Livro: autor        14 dias, R$ 1,00/dia
        ├── Revista: edição      7 dias, R$ 0,50/dia
        └── Dvd: minutos         3 dias, R$ 2,00/dia

TipoUsuario (enum): ALUNO(3 itens, x1), PROFESSOR(10 itens, x2)
Biblioteca ── guarda ──> Item[] e Emprestimo[]
Emprestimo ── liga ──> Item + Usuario + dia
```

E uma seção de **decisões**: por que o resultado de um empréstimo é um enum e não uma mensagem impressa; por que o acervo dobra de tamanho; e como o DVD entrou sem mudar nenhuma regra. Esse último ponto é o melhor argumento do projeto: mostra que você entende para que serve o polimorfismo, e não só a sintaxe.

Quando chegar ao Backend Júnior, este núcleo vira a camada de domínio de uma API: o projeto [Uma API sem framework](/projetos/backend-junior-p1) é o próximo passo natural.
