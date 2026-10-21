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
  id: 'junior-p2',
  briefing,
  etapas: [
    {
      id: 'junior-p2-s01',
      titulo: 'Contratos como records',
      objetivo: 'Representar os três tipos de contrato como records imutáveis, que se validam sozinhos na hora de nascer.',
      instrucoes: s01,
      criterios: [
        '`Clt`, `Pj` e `Estagio` são records, com os valores em centavos num `long`.',
        'O construtor compacto tira os espaços do nome e recusa valores menores ou iguais a zero.',
        'Um estágio de 40 horas é recusado com uma `IllegalArgumentException` cuja mensagem diz o nome da pessoa.',
        '`comReajuste(10)` devolve um `Clt` novo com 319000 centavos, e o original continua com 290000.',
        'Dois records com os mesmos valores são iguais pelo `equals`, sem nenhum `equals` escrito à mão.',
      ],
      dica: 'No construtor compacto, os nomes dos componentes são os parâmetros: reatribua `nome = nome.strip();` e valide antes do fim. O reajuste é um `new Clt(...)` com o salário novo.',
      solucao: s01Solucao,
    },
    {
      id: 'junior-p2-s02',
      titulo: 'Uma hierarquia selada',
      objetivo: 'Juntar os três contratos numa interface selada e tratar cada um com um switch que o compilador confere.',
      instrucoes: s02,
      criterios: [
        '`Contrato` é uma interface `sealed` que permite só `Clt`, `Pj` e `Estagio`.',
        '`nome()` está declarado na interface, e nenhum record precisou implementá-lo à mão.',
        'O switch de descrição não tem `default` e compila; apagar um dos `case` faz ele parar de compilar.',
        'A saída lista as sete pessoas, com a Sofia como `PJ, nota pendente`.',
      ],
      dica: 'Os records já têm o método `nome()`, gerado pelo componente: declarar `String nome();` na interface basta. No switch, use padrões de tipo como `case Clt clt ->`.',
      solucao: s02Solucao,
    },
    {
      id: 'junior-p2-s03',
      titulo: 'O cálculo com record patterns',
      objetivo: 'Calcular bruto, descontos, líquido e custo de cada contrato com record patterns e contas em centavos sem erro.',
      instrucoes: s03,
      criterios: [
        'Marina Costa tem R$ 539,25 de descontos e R$ 3.960,75 de líquido.',
        'Paulo Henrique, com 2 dependentes, tem R$ 1.347,30 de descontos.',
        'Luiza Prado fica abaixo da faixa isenta e só paga a previdência: R$ 261,00.',
        'Os percentuais saem de um método que arredonda ao centavo, sem `double` nas contas.',
        'O switch desmonta cada record com um record pattern, como `case Clt(String nome, long salario, int dependentes)`.',
      ],
      dica: 'Comece pelo `percentual(long centavos, int pct)`: some 50 antes de dividir por 100. O imposto incide só sobre o que a base passa de R$ 3.000,00.',
      solucao: s03Solucao,
    },
    {
      id: 'junior-p2-s04',
      titulo: 'Pagamentos bloqueados',
      objetivo: 'Barrar o pagamento de quem é PJ sem nota fiscal e imprimir a folha numa tabela alinhada.',
      instrucoes: s04,
      criterios: [
        '`calcular` devolve um `Pagamento`, interface selada com `Holerite` e `Bloqueado`.',
        'A Sofia aparece como `bloqueado: falta a nota fiscal do mês`, e o Renato, com nota, recebe normalmente.',
        'O caso do PJ sem nota usa uma guarda `when`, escrita antes do caso sem guarda.',
        'A tabela tem cabeçalho e colunas alinhadas, com valores no formato `R$ 4.500,00`.',
      ],
      dica: 'O caso mais específico, com `when`, vem antes do geral. Para imprimir, um segundo switch sobre o `Pagamento` trata os dois tipos.',
      solucao: s04Solucao,
    },
    {
      id: 'junior-p2-s05',
      titulo: 'O resumo e a simulação de reajuste',
      objetivo: 'Fechar a folha com os totais por tipo de contrato e simular um reajuste sem tocar nos dados originais.',
      instrucoes: s05,
      criterios: [
        'O resumo mostra R$ 25.892,45 de líquido a pagar e R$ 32.408,00 de custo para a empresa.',
        'O custo aparece por tipo: CLT R$ 19.968,00, PJ R$ 9.000,00 e estágio R$ 3.440,00.',
        'Pagamentos bloqueados não entram no custo, e o resumo conta quantos foram.',
        'A simulação de 5% para quem é CLT dá R$ 33.406,40 de custo, e a equipe original continua igual.',
      ],
      dica: 'Some os custos no mesmo laço que imprime a tabela, com um switch de comando sobre o contrato. Na simulação, crie um array novo em que só os `Clt` são trocados por `clt.comReajuste(5)`.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
