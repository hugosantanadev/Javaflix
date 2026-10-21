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
  id: 'estagiario-p2',
  briefing,
  etapas: [
    {
      id: 'estagiario-p2-s01',
      titulo: 'Lendo a planilha',
      objetivo: 'Ler as linhas coladas, separar nome e notas e recusar, com o número da linha, o que estiver fora do formato.',
      instrucoes: s01,
      criterios: [
        'Lê as linhas até uma linha em branco ou o fim da entrada e mostra `9 alunos lidos.` com a turma do pedido.',
        'A linha com três notas é ignorada com `Linha 5 ignorada: esperava o nome e 4 notas.`',
        'A linha com `oito` é ignorada com o aviso de nota inválida e o número 9, sem nenhuma exceção.',
        'Notas com vírgula, como `7,5`, viram `7.5` no `double`.',
        'Nomes ficam num `String[]` e notas num `double[][]`, um aluno por linha.',
      ],
      dica: 'Junte as linhas num `StringBuilder` e quebre tudo de uma vez com `split("\\n")`. Em cada linha, `split(";")` dá os campos: confira quantos são antes de olhar qualquer nota.',
      solucao: s01Solucao,
    },
    {
      id: 'estagiario-p2-s02',
      titulo: 'Médias e situação',
      objetivo: 'Calcular a média de cada aluno com uma casa decimal e classificar a situação pela regra da escola.',
      instrucoes: s02,
      criterios: [
        'Cada aluno tem a média das quatro provas arredondada para uma casa: Ana Souza fica com 7.8.',
        'A situação segue a regra: 7 ou mais aprovado, de 5 a 6,9 recuperação, abaixo de 5 reprovado.',
        'Igor Campos, com 6,95 antes de arredondar, aparece com média 7.0 e aprovado.',
        'A regra da situação está num método `situacao`, usado em todo lugar que precisa dela.',
      ],
      dica: 'Para uma casa decimal, multiplique por 10, arredonde com `Math.round` e divida por `10.0`. O ponto no 10.0 é o que mantém a conta em `double`.',
      solucao: s02Solucao,
    },
    {
      id: 'estagiario-p2-s03',
      titulo: 'O boletim alinhado',
      objetivo: 'Imprimir o boletim em colunas alinhadas, com vírgula decimal e nomes longos encurtados.',
      instrucoes: s03,
      criterios: [
        'O cabeçalho sai de um text block, e as colunas de P1 a Média ficam alinhadas à direita.',
        'Notas e médias aparecem com vírgula, como `7,5` e `10,0`, em qualquer computador.',
        'Gabriela Torres de Albuquerque aparece como `Gabriela Torres de ...`, sem desalinhar a linha.',
        'Nenhum número é formatado por concatenação: só `String.format` ou `printf`, com o `Locale` explícito.',
      ],
      dica: 'Monte cada linha num `StringBuilder`: o nome com `%-22s`, cada nota com `%6.1f` e, no fim, média e situação. Compare a largura de cada coluna com o cabeçalho, caractere por caractere.',
      solucao: s03Solucao,
    },
    {
      id: 'estagiario-p2-s04',
      titulo: 'Estatísticas da turma',
      objetivo: 'Resumir a turma: média, mediana, desvio padrão, extremos, contagem por situação e um histograma de texto.',
      instrucoes: s04,
      criterios: [
        'A turma do pedido mostra média 6,83, mediana 7,00 e desvio padrão 1,83.',
        'Maior e menor média aparecem: 9,5 e 3,6.',
        'A contagem é de 5 aprovados, 3 em recuperação e 1 reprovado.',
        'O histograma tem cinco faixas de 2 pontos, com um `#` por aluno, e uma média 10 cai na última faixa.',
        'A mediana vem de uma cópia ordenada: cada nome do boletim continua ao lado da própria média.',
      ],
      dica: 'Para a mediana, ordene uma cópia feita com `Arrays.copyOf` e pegue o meio; com `n` par, faça a média dos dois do meio. A faixa de uma média é `(int) (media / 2)`, limitada a 4.',
      solucao: s04Solucao,
    },
    {
      id: 'estagiario-p2-s05',
      titulo: 'Quadro de honra e recuperação',
      objetivo: 'Ordenar a turma pela média sem desalinhar os arrays e listar o que cada aluno em recuperação precisa refazer.',
      instrucoes: s05,
      criterios: [
        'O quadro de honra mostra Carla Dias (9,5), Gabriela Torres de Albuquerque (9,3) e Ana Souza (7,8), nessa ordem.',
        'A ordenação mexe num array de índices; `nomes`, `notas` e `medias` continuam na ordem da planilha.',
        'A lista de recuperação sai na ordem do ranking: Fábio Nunes, Bruno Lima e Heitor Alves.',
        'Cada aluno em recuperação mostra as provas abaixo de 5, como `P2 (4,5)`, ou um aviso quando não há nenhuma.',
        'Comparações de texto usam `equals`, nunca `==`.',
      ],
      dica: 'Comece `int[] ordem` com 0, 1, 2... e ordene esse array comparando `medias[ordem[j]]`. Cada volta da seleção acha o índice do maior entre os que faltam e troca com a posição atual.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
