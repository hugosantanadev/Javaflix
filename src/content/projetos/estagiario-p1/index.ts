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
  id: 'estagiario-p1',
  briefing,
  etapas: [
    {
      id: 'estagiario-p1-s01',
      titulo: 'O menu em laço',
      objetivo: 'Montar o esqueleto: um menu que se repete até a pessoa escolher sair e que não quebra quando ela digita letras.',
      instrucoes: s01,
      criterios: [
        'O programa roda com `java Caixa.java` e mostra o título e o menu.',
        'O menu se repete até a pessoa digitar 0, que imprime `Até logo!`.',
        'As opções de 1 a 4 respondem `Em construção.`, e qualquer outro número responde `Opção inválida.`',
        'Letras no lugar da opção mostram `Digite só o número da opção.` e o menu volta, sem exceção.',
        'A decisão usa um `switch` de seta, não uma fila de `if`.',
      ],
      dica: 'Comece pelo laço: uma variável `opcao` que nasce diferente de 0 e um `while (opcao != 0)`. Dentro dele, antes de ler, pergunte `entrada.hasNextInt()`; se for `false`, jogue fora o pedaço com `entrada.next()` e use `continue`.',
      solucao: s01Solucao,
    },
    {
      id: 'estagiario-p1-s02',
      titulo: 'Saldo e depósito em centavos',
      objetivo: 'Guardar o dinheiro sem erro de arredondamento, mostrar o saldo formatado e aceitar só depósitos dentro da regra.',
      instrucoes: s02,
      criterios: [
        'O saldo é um `long` em centavos; nenhum `double` ou `float` guarda dinheiro.',
        'A opção 1 mostra `Saldo: R$ 1234,05`, sempre com dois dígitos de centavos.',
        'Um depósito de R$ 250 deixa o saldo em `R$ 1484,05`.',
        'Depósitos de 0, negativos ou acima de R$ 10000 são recusados com uma mensagem, e o saldo não muda.',
      ],
      dica: 'Divisão inteira por 100 dá os reais e o resto por 100 dá os centavos. O zero à esquerda só entra quando os centavos são menores que 10: um ternário resolve.',
      solucao: s02Solucao,
    },
    {
      id: 'estagiario-p1-s03',
      titulo: 'Saque em notas',
      objetivo: 'Validar o saque e entregar o valor pedido com o menor número de notas de 100, 50, 20 e 10.',
      instrucoes: s03,
      criterios: [
        'Saques menores que R$ 10 ou que não são múltiplos de 10 são recusados.',
        'Um saque maior que o saldo é recusado com `Saldo insuficiente.`, e o saldo não muda.',
        'Um saque de R$ 180 entrega `1x100 1x50 1x20 1x10`, e só aparecem as notas usadas.',
        'Depois do saque de R$ 180, o saldo fica em `R$ 1054,05`.',
        'As notas saem de divisões e restos, sem um laço que subtrai de 10 em 10.',
      ],
      dica: 'Comece pela nota maior: quantas notas de 100 cabem no valor? É a divisão inteira. O resto dessa divisão é o que sobra para a nota de 50, e assim por diante.',
      solucao: s03Solucao,
    },
    {
      id: 'estagiario-p1-s04',
      titulo: 'Tarifa, limite diário e um método',
      objetivo: 'Cobrar tarifa a partir do quarto saque, respeitar o limite do dia e tirar a repetição do código com um método.',
      instrucoes: s04,
      criterios: [
        'Os três primeiros saques não pagam tarifa; do quarto em diante, R$ 2,50 sai do saldo junto com o saque.',
        'A soma dos saques do dia não passa de R$ 1000, e a mensagem diz quanto ainda dá para sacar.',
        'O saldo precisa cobrir saque mais tarifa; se não cobrir, nada é debitado.',
        'Tarifa, saques grátis e limite são constantes `static final`, sem números soltos no meio do código.',
        'A formatação de dinheiro existe num lugar só: um método `formatar` usado em todas as mensagens.',
      ],
      dica: 'Duas variáveis declaradas antes do laço guardam quantos saques já deram certo e quanto já saiu hoje. Elas só mudam no fim de um saque aceito. A tarifa depende só da primeira.',
      solucao: s04Solucao,
    },
    {
      id: 'estagiario-p1-s05',
      titulo: 'Extrato e entrada à prova de erro',
      objetivo: 'Registrar cada movimentação, imprimir o extrato e fazer todas as perguntas aguentarem qualquer coisa digitada.',
      instrucoes: s05,
      criterios: [
        'A opção 4 lista depósitos, saques e tarifas na ordem em que aconteceram, com o saldo no fim.',
        'Sem movimentações, o extrato mostra `Nenhuma movimentação.`',
        'Letras em qualquer pergunta, não só no menu, mostram um aviso e repetem a pergunta.',
        'Ler um número com validação existe num lugar só: um método usado pelo menu e pelos valores.',
        'O teste de aceitação com `entrada.txt` termina com o saldo `R$ 801,55`.',
      ],
      dica: 'O extrato pode ser uma String que cresce com `+=`, cada linha terminando em `"\\n"`. Para a leitura, mova a proteção do menu para um método que repete a pergunta enquanto `hasNextInt()` for `false`.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
