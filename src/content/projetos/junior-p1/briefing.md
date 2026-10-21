**De:** coordenação da Casa da Leitura, uma biblioteca comunitária (fictícia)
**Para:** você, desenvolvedor júnior voluntário
**Assunto:** o núcleo do sistema de empréstimos

Hoje os empréstimos são anotados num caderno, e ninguém sabe ao certo quem está com o quê. Um grupo de voluntários vai construir o sistema aos poucos: uma tela, depois uma API, um dia um aplicativo. A sua parte é a primeira e a mais importante: o **núcleo** com as regras da biblioteca, em classes Java, sem tela e sem banco. Quem vier depois só vai usar as suas classes.

| Regra | Detalhe |
|---|---|
| Acervo | livros e revistas, cada item com um código único, título e ano; livros têm autor, revistas têm número da edição |
| Prazo | livro, 14 dias; revista, 7 dias |
| Usuários | alunos levam até 3 itens no prazo normal; professores levam até 10, com o prazo em dobro |
| Empréstimo | o item precisa existir e estar disponível, e o usuário precisa estar dentro do limite; toda recusa diz o motivo |
| Multa | por dia de atraso: livro R$ 1,00, revista R$ 0,50 |
| Busca | por trecho do título, sem diferenciar maiúsculas; livros também pelo nome do autor |
| Relatório | os empréstimos ativos de um dia, com vencimento, atraso e multa |

Os voluntários combinaram duas restrições: o núcleo usa só o que todo o grupo já sabe, então **sem exceções e sem coleções** como `List`; e ele precisa aceitar tipos novos de item no futuro **sem reescrever as regras**. Os dias são números inteiros (dia 1, dia 2...): datas de verdade ficam para quando o grupo estudar a API de datas.

**O que entregar:** as classes do núcleo e um `main` que funciona como roteiro de teste, mostrando cada regra em ação.

> [!PENSE]
> Leia a tabela e sublinhe os substantivos: item, livro, revista, usuário, empréstimo, multa. Quais viram classes? Quais viram campos? E a regra "professor tem o prazo em dobro" mora em qual deles?

São cinco etapas, apoiadas nas temporadas [Classes e objetos](/?t=junior-t1), [Métodos](/?t=junior-t2), [Herança e polimorfismo](/?t=junior-t3) e [Interfaces e enums](/?t=junior-t4).
