import type { ProjetoConteudo } from '../../types';
import briefing from './briefing.md?raw';
import portfolio from './portfolio.md?raw';
import s01 from './s01.md?raw';
import s01Solucao from './s01-solucao.md?raw';
import s02 from './s02.md?raw';
import s02Solucao from './s02-solucao.md?raw';
import s03 from './s03.md?raw';
import s03Solucao from './s03-solucao.md?raw';
import s04 from './s04.md?raw';
import s04Solucao from './s04-solucao.md?raw';
import s05 from './s05.md?raw';
import s05Solucao from './s05-solucao.md?raw';

const projeto: ProjetoConteudo = {
  id: 'junior-p1',
  briefing,
  etapas: [
    {
      id: 'junior-p1-s01',
      titulo: 'Livros e revistas',
      objetivo: 'Modelar os itens do acervo com herança e encapsulamento, e definir quando dois itens são o mesmo.',
      instrucoes: s01,
      criterios: [
        '`Item` é abstrata, com campos `private final` e só getters; `new Item(...)` não compila.',
        '`Livro` e `Revista` estendem `Item`, chamam `super(...)` e sobrescrevem `toString` a partir do da classe pai.',
        'Dois livros com o mesmo código são iguais pelo `equals` e têm o mesmo `hashCode`, mas `==` dá `false`.',
        'Uma `Revista` guardada numa variável do tipo `Item` imprime o `toString` da revista.',
      ],
      dica: 'Comece pela classe pai com os três campos em comum e o construtor `protected`. No `equals`, compare só o código, e use o mesmo campo no `hashCode`.',
      solucao: s01Solucao,
    },
    {
      id: 'junior-p1-s02',
      titulo: 'Usuários e prazos',
      objetivo: 'Representar os tipos de usuário com um enum que carrega as regras e calcular o prazo de cada empréstimo por polimorfismo.',
      instrucoes: s02,
      criterios: [
        '`TipoUsuario` é um enum com `ALUNO` (3 itens, prazo normal) e `PROFESSOR` (10 itens, prazo em dobro), com campos e construtor.',
        '`Item` declara o método abstrato `diasDeEmprestimo()`: livro responde 14 e revista 7.',
        'O prazo sai de `prazoPara(item)`, sem `instanceof` nem `if` por tipo de item: Rui leva um livro por 28 dias.',
        '`Usuario` é imutável: campos `final` e nenhum setter.',
      ],
      dica: 'Um enum pode ter construtor: `ALUNO(3, 1)` chama `TipoUsuario(int limite, int fatorDePrazo)`. O prazo é a resposta do item multiplicada pelo fator do tipo.',
      solucao: s02Solucao,
    },
    {
      id: 'junior-p1-s03',
      titulo: 'O acervo que cresce e a busca',
      objetivo: 'Guardar o acervo num array que cresce sozinho, sem itens repetidos, e buscar por título e por autor.',
      instrucoes: s03,
      criterios: [
        '`cadastrar` aceita quantos itens vierem (varargs) e ignora um item com código repetido.',
        'Começando com capacidade 4, o quinto item dobra o array para 8 sem perder nenhum.',
        'A busca não diferencia maiúsculas: `CORTIÇO` acha O Cortiço.',
        'Buscar `machado` acha os dois livros de Machado de Assis pelo autor, graças ao `combina` sobrescrito em `Livro`.',
        '`buscar` devolve um array do tamanho exato dos resultados, sem posições `null`.',
      ],
      dica: 'Antes de guardar, se `totalItens == acervo.length`, troque o array por `Arrays.copyOf(acervo, acervo.length * 2)`. Na busca, junte os achados num array temporário e devolva uma cópia do tamanho certo.',
      solucao: s03Solucao,
    },
    {
      id: 'junior-p1-s04',
      titulo: 'Empréstimo, devolução e multa',
      objetivo: 'Registrar empréstimos com as regras da biblioteca, explicar cada recusa e cobrar multa na devolução atrasada.',
      instrucoes: s04,
      criterios: [
        '`emprestar` devolve um `Resultado`: `OK`, `NAO_ENCONTRADO`, `INDISPONIVEL` ou `LIMITE_ATINGIDO`, cada um com a sua mensagem.',
        'Um item emprestado não sai de novo, e a Ana, aluna, não leva um quarto item.',
        'Devolver no dia 20 um livro que a Ana pegou no dia 1 cobra 5 dias de atraso: `R$ 5,00`.',
        'Devolver antes do vencimento não gera multa negativa, e devolver um item que não estava emprestado avisa sem quebrar.',
        'A multa por dia vem do próprio item (`multaDiaria()`), em centavos num `long`.',
      ],
      dica: 'O empréstimo guarda o dia de início e calcula o prazo no construtor, pelo tipo do usuário. O atraso é hoje menos o dia limite, nunca menor que zero: `Math.max` resolve.',
      solucao: s04Solucao,
    },
    {
      id: 'junior-p1-s05',
      titulo: 'Um tipo novo e o relatório do dia',
      objetivo: 'Aceitar DVDs sem mudar nenhuma regra existente e imprimir a situação de cada empréstimo ativo.',
      instrucoes: s05,
      criterios: [
        '`Dvd` estende `Item` com 3 dias e multa de R$ 2,00 por dia, e nenhuma linha de `Biblioteca`, `Emprestimo` ou `TipoUsuario` mudou para isso.',
        'Rui, professor, leva um DVD por 6 dias: pego no dia 1, vence no dia 7.',
        'O relatório do dia 12 mostra cada empréstimo ativo com o vencimento e, se atrasado, os dias e a multa.',
        'No roteiro final, a revista da Ana deve R$ 2,00, o DVD do Rui R$ 10,00, e as multas recebidas somam R$ 12,00.',
      ],
      dica: 'Escreva o `Dvd` e rode o `main` antigo antes de qualquer outra coisa: ele precisa continuar funcionando. No relatório, percorra só as posições de 0 a `totalEmprestimos`.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
