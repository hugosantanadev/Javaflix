import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t4-e04',
  minutos: 11,
  aula,
  armadilhas: [
    '`break` e `continue` sem rótulo afetam só o laço mais interno.',
    'No `for`, o `continue` executa a atualização antes do próximo teste; no `while`, pula o resto do corpo, inclusive um `i++` no fim.',
    '`break` dentro de `switch` dentro de laço sai só do `switch`.',
    '`continue` só pode ser usado dentro de laço, e o rótulo dele precisa marcar um laço.',
    '`break rótulo` pode sair de qualquer bloco rotulado, não só de laços.',
    'O rótulo precisa envolver o `break` ou `continue`: não se salta para um laço que já terminou.',
    '`goto` é palavra reservada, mas não existe como comando.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Branching Statements',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/branch.html',
      tipo: 'documentacao',
      porque: '`break`, `continue` e `return`, com exemplos de rótulos em laços aninhados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.15: The break Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.15',
      tipo: 'documentacao',
      porque: 'As regras do `break` com e sem rótulo, incluindo o uso em blocos comuns.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.16: The continue Statement',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.16',
      tipo: 'documentacao',
      porque: 'Por que o rótulo de um `continue` precisa ser de um laço.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 14.7: Labeled Statements',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.7',
      tipo: 'documentacao',
      porque: 'O escopo de um rótulo e o que pode ser rotulado.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: The Java continue and break Keywords',
      url: 'https://www.baeldung.com/java-continue-and-break',
      tipo: 'artigo',
      porque: 'As quatro combinações (com e sem rótulo, `break` e `continue`) com exemplos curtos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #13, Estruturas de Repetição (Parte 3)',
      url: 'https://www.youtube.com/watch?v=XLqPZh6n8IA',
      tipo: 'video',
      porque: 'Laços `for` e o controle de repetição, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A tabela de onde `break`, `continue` e rótulos são permitidos vem do livro.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Making Decisions": seções sobre laços aninhados, rótulos, `break` e `continue`',
    },
  ],
  desafio: {
    titulo: 'Primeiro par de soma 10',
    enunciado:
      'Dado o array `{3, 9, 4, 7, 6, 1}`, encontre o primeiro par de posições `i < j` cujos valores somam 10, usando dois `for` aninhados e um `break` rotulado para parar assim que encontrar. Conte também quantas comparações foram feitas. Imprima:\n\n```text\nposições 0 e 3: 3 + 7\n3 comparações\n```',
    dicas: [
      'O laço interno começa em `j = i + 1`, para não repetir pares nem comparar um elemento com ele mesmo.',
      'Declare as variáveis do resultado antes dos laços, com −1 para "não achou".',
      'Rotule o laço externo e use `break rotulo;` quando a soma for 10.',
    ],
    solucao: `public class ParSoma {
    public static void main(String[] args) {
        int[] v = {3, 9, 4, 7, 6, 1};
        int a = -1, b = -1, comparacoes = 0;
        procura:
        for (int i = 0; i < v.length; i++) {
            for (int j = i + 1; j < v.length; j++) {
                comparacoes++;
                if (v[i] + v[j] == 10) {
                    a = i;
                    b = j;
                    break procura;
                }
            }
        }
        System.out.println("posições " + a + " e " + b + ": " + v[a] + " + " + v[b]);
        System.out.println(comparacoes + " comparações");
    }
}`,
    saida: 'posições 0 e 3: 3 + 7\n3 comparações',
    comentarios:
      'O `break` rotulado poupa as comparações restantes: sem ele, o laço externo continuaria depois de achar o par. Esta é a solução O(n²) do problema "Two Sum", que o seu curso resolve no módulo de Leetcode; com um `HashSet` dos valores já vistos, dá para resolvê-lo numa única passada, em O(n), como mostra a trilha Aprendiz no episódio de tabelas hash.',
  },
  exercicios: [
    {
      id: 'estagiario-t4-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o `continue` faz dentro de um laço?',
      opcoes: [
        'Pula o resto da volta atual e segue para a próxima',
        'Encerra o laço',
        'Reinicia o laço do começo, com a inicialização',
        'Pausa a execução até o próximo comando',
      ],
      resposta: 0,
      explicacao: 'O `continue` abandona a volta atual. Num `for`, a atualização ainda acontece antes do próximo teste. Quem encerra o laço é o `break`.',
    },
    {
      id: 'estagiario-t4-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `for (int i = 0; i < 10; i++) {
    if (i % 3 != 0) continue;
    if (i > 7) break;
    System.out.println(i);
}`,
      resposta: '0\n3\n6',
      explicacao: 'Os números que não são múltiplos de 3 são pulados. O 9 é múltiplo, mas é maior que 7, e o `break` encerra o laço antes de imprimi-lo.',
    },
    {
      id: 'estagiario-t4-e04-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int conta = 0;
fora:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j > i) continue fora;
        conta++;
    }
}
System.out.println(conta);`,
      opcoes: ['`6`', '`9`', '`3`', '`1`', '`5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para cada i, o laço interno conta os j de 0 até i e, no primeiro j maior que i, o `continue fora` passa para o próximo i. São 1 + 2 + 3 = 6.',
    },
    {
      id: 'estagiario-t4-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int total = 0;
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;
        total += 10;
    }
    total++;
}
System.out.println(total);`,
      opcoes: ['`33`', '`30`', '`11`', '`3`', '`90`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `break` sem rótulo sai só do laço interno. Em cada volta do externo, o interno soma 10 uma vez (j = 0) e para; depois, o `total++` do externo roda. 3 · 11 = 33.',
    },
    {
      id: 'estagiario-t4-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`int x = 1; if (x > 0) { continue; }`',
        '`bloco: { continue bloco; }`',
        '`bloco: { if (true) break bloco; }`',
        '`laco: while (true) { break laco; }`',
        '`for (int i = 0; i < 2; i++) { switch (i) { case 0: continue; default: break; } }`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: '`continue` só existe dentro de laço, e o seu rótulo precisa ser de um laço. `break` com rótulo funciona em qualquer bloco, e um `continue` dentro de um `switch` que está dentro de um laço vale para o laço.',
    },
    {
      id: 'estagiario-t4-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int i = 0;
do {
    i++;
    if (i == 2) continue;
    System.out.print(i);
} while (i < 4);
System.out.println();`,
      opcoes: ['`134`', '`1234`', '`1`', '`13`', 'O laço nunca termina'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No `do-while`, o `continue` vai direto para o teste da condição. Como o incremento está no começo do corpo, nada é pulado além do `print` do 2.',
    },
    {
      id: 'estagiario-t4-e04-q07',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o `break` para parar a busca no primeiro número par. O programa deve imprimir `0 0`.',
      codigo: `public class PrimeiroPar {
    public static void main(String[] args) {
        int[][] m = {{8, 9}, {10, 11}};
        int linha = -1, coluna = -1;
        achou:
        for (int l = 0; l < m.length; l++) {
            for (int c = 0; c < m[l].length; c++) {
                if (m[l][c] % 2 == 0) {
                    linha = l;
                    coluna = c;
                    break ___;
                }
            }
        }
        System.out.println(linha + " " + coluna);
    }
}`,
      respostas: ['achou'],
      saida: '0 0',
      explicacao: 'O `break achou` sai dos dois laços no primeiro par, o 8. Um `break` sem rótulo sairia só do laço interno, e a linha seguinte encontraria o 10, sobrescrevendo o resultado com `1 0`.',
    },
    {
      id: 'estagiario-t4-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int soma = 0;
for (int i = 0; i < 4; i++) {
    switch (i) {
        case 1: break;
        case 2: soma += 100; break;
        default: soma += i;
    }
}
System.out.println(soma);`,
      opcoes: ['`103`', '`100`', '`3`', '`1`', '`6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Dentro do `switch`, o `break` sai só do `switch`, e o laço continua. i = 0 soma 0, i = 1 não soma, i = 2 soma 100, i = 3 soma 3.',
    },
    {
      id: 'estagiario-t4-e04-q09',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Rotulos {
    public static void main(String[] args) {
        int n = 0;
        laco:
        for (int i = 0; i < 3; i++) {
            n++;
        }
        bloco:
        {
            n++;
            continue laco;
        }
        System.out.println(n);
    }
}`,
      resposta: 11,
      explicacao: 'O rótulo `laco` só vale dentro do laço que ele marca. Na linha 11, o laço já terminou, e o `continue` também não está dentro de nenhum laço.',
    },
    {
      id: 'estagiario-t4-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `int i = 0, n = 0;
fora:
while (i < 3) {
    i++;
    for (int j = 0; j < 5; j++) {
        if (j == i) continue fora;
        n++;
    }
}
System.out.println(n);`,
      opcoes: ['`6`', '`15`', '`3`', '`9`', 'O laço nunca termina'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para i = 1, o interno conta j = 0 e salta no j = 1; para i = 2, conta 0 e 1; para i = 3, conta 0, 1 e 2. 1 + 2 + 3 = 6. O `continue fora` vai para o teste do `while`, e o `i++` está no começo do corpo, então o laço termina.',
    },
    {
      id: 'estagiario-t4-e04-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = 5;
etapa: {
    System.out.println("A");
    if (x > 3) break etapa;
    System.out.println("B");
}
System.out.println("C");`,
      resposta: 'A\nC',
      explicacao: 'Um `break` com rótulo pode sair de um bloco comum. Como x > 3, ele pula o resto do bloco, e a execução continua depois dele.',
    },
    {
      id: 'estagiario-t4-e04-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como sair de dois laços aninhados de uma vez, de dentro do laço interno?',
      opcoes: [
        'Com `break` seguido do rótulo do laço externo',
        'Com dois `break` seguidos',
        'Com `continue`',
        'Com `goto`',
      ],
      resposta: 0,
      explicacao: 'O `break rótulo` encerra o comando rotulado, mesmo que seja externo. Dois `break` seguidos não funcionam: o primeiro já sai do laço interno, e o segundo nunca é alcançado (e nem compila).',
    },
    {
      id: 'estagiario-t4-e04-q13',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Um `break` com rótulo pode encerrar um bloco `{ }` rotulado que não é laço',
        'Um `continue` sem rótulo dentro de um `switch` que está dentro de um `for` vai para a próxima volta do `for`',
        'Um `continue` pode ser usado para encerrar um `switch`',
        '`goto rotulo;` salta para o rótulo indicado',
        'Rótulos só podem ser usados com `break`, nunca com `continue`',
      ],
      respostas: [0, 1],
      explicacao: 'O `break` rotulado funciona em qualquer comando rotulado. O `continue` ignora o `switch` e afeta o laço que o contém. `continue` não tem sentido num `switch`; `goto` não existe como comando; e rótulos de laços servem para os dois.',
    },
    {
      id: 'estagiario-t4-e04-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `int pulos = 0;
for (int i = 0; i < 5; i++) {
    if (i < 3) {
        pulos++;
        continue;
    }
    System.out.println(i);
}
System.out.println(pulos);`,
      resposta: '3\n4\n3',
      explicacao: 'As voltas 0, 1 e 2 contam um pulo e vão para a próxima volta, com o `i++` do cabeçalho executado normalmente. As voltas 3 e 4 imprimem. Por fim, 3 pulos.',
    },
    {
      id: 'estagiario-t4-e04-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `int[] v = {5, 12, 8, 20};
int achado = -1;
for (int x : v) {
    if (x > 10) {
        achado = x;
        break;
    }
}
System.out.println(achado);`,
      opcoes: ['`12`', '`20`', '`-1`', '`5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O laço para no primeiro valor maior que 10. Sem o `break`, o último maior que 10, o 20, sobrescreveria o resultado.',
    },
  ],
};

export default episodio;
