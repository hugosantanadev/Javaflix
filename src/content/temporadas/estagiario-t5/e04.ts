import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t5-e04',
  minutos: 10,
  aula,
  armadilhas: [
    'Depois do `"""` de abertura, só pode vir uma quebra de linha: `"""abc"""` não compila.',
    'Com o `"""` de fechamento numa linha própria, o texto termina com `\\n`.',
    'A indentação removida é a menor entre as linhas com conteúdo e a linha do fechamento.',
    'Espaços no fim de cada linha são removidos; use `\\s` para manter um espaço.',
    '`\\` no fim da linha junta com a próxima, sem quebra.',
    'Aspas simples e duplas não precisam de escape; três aspas seguidas, sim (`\\"""`).',
    'Um text block é uma `String` comum: constantes iguais compartilham o mesmo objeto no pool.',
  ],
  recursos: [
    {
      titulo: 'JEP 378: Text Blocks',
      url: 'https://openjdk.org/jeps/378',
      tipo: 'documentacao',
      porque: 'A proposta final, com o algoritmo de remoção de espaço incidental explicado passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Programmer's Guide to Text Blocks",
      url: 'https://docs.oracle.com/en/java/javase/21/text-blocks/index.html',
      tipo: 'documentacao',
      porque: 'O guia oficial com recomendações de estilo e muitos exemplos de indentação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 3.10.6: Text Blocks',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.6',
      tipo: 'documentacao',
      porque: 'A definição formal, com a ordem exata de processamento: indentação, espaços finais e escapes.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de String.stripIndent',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#stripIndent()',
      tipo: 'documentacao',
      porque: 'O mesmo algoritmo dos text blocks, disponível para qualquer `String`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java Text Blocks',
      url: 'https://www.baeldung.com/java-text-blocks',
      tipo: 'artigo',
      porque: 'Exemplos com JSON, SQL e HTML, e os escapes novos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Sebastian Daschner: What You Need to Know About Java Text Blocks',
      url: 'https://blog.sebastian-daschner.com/entries/java-text-blocks',
      tipo: 'artigo',
      porque: 'Um resumo de bolso das regras de indentação, espaços e escapes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP Café #5: Text Blocks',
      url: 'https://www.youtube.com/watch?v=NDaA9MrTLBM',
      tipo: 'video',
      porque: 'José Paumard, da equipe Java da Oracle, explica os text blocks e o algoritmo de indentação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O livro traz uma tabela de espaços incidentais e essenciais com os casos que a prova usa.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seção "Creating Text Blocks"',
    },
  ],
  desafio: {
    titulo: 'Recibo em text block',
    enunciado:
      'Use um text block com `formatted()` para gerar um recibo. O modelo tem o nome do cliente, o número do pedido com 5 dígitos completados com zeros e o valor com duas casas decimais. Para Ana, pedido 42 e valor 129,9, imprima:\n\n```text\nRECIBO\nCliente: Ana\nPedido:  00042\nValor:   R$ 129.90\n```',
    dicas: [
      'Os marcadores são `%s`, `%05d` e `%.2f`.',
      'Para garantir o ponto decimal, use `String.format(Locale.US, modelo, ...)` em vez de `formatted`, que usa o idioma do sistema.',
      'Feche o text block numa linha própria e use `print`, não `println`, para não sobrar uma linha em branco.',
    ],
    solucao: `import java.util.Locale;

public class Recibo {
    public static void main(String[] args) {
        String modelo = """
            RECIBO
            Cliente: %s
            Pedido:  %05d
            Valor:   R$ %.2f
            """;
        System.out.print(String.format(Locale.US, modelo, "Ana", 42, 129.9));
    }
}`,
    saida: 'RECIBO\nCliente: Ana\nPedido:  00042\nValor:   R$ 129.90',
    comentarios:
      'O modelo fica legível como o texto final, com o alinhamento visível no código. Repare que o `%` não precisa de escape dentro do text block, porque quem interpreta os marcadores é o `format`, não o compilador. Se o texto precisasse de um sinal de porcentagem literal, seria `%%`.',
  },
  exercicios: [
    {
      id: 'estagiario-t5-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é um text block?',
      opcoes: [
        'Um literal de `String` de várias linhas, delimitado por três aspas, introduzido no Java 15',
        'Um novo tipo de dado, diferente de `String`',
        'Um comentário de várias linhas',
        'Um arquivo de texto embutido no `.class`',
      ],
      resposta: 0,
      explicacao: 'O resultado de um text block é uma `String` comum. A diferença está só na forma de escrever o literal no código-fonte.',
    },
    {
      id: 'estagiario-t5-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = """
    ab
    cd
    """;
System.out.println(s.length());`,
      opcoes: ['`6`', '`4`', '`5`', '`14`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A indentação comum é removida, e o fechamento numa linha própria acrescenta uma quebra no fim: "ab\\ncd\\n", com 6 caracteres.',
    },
    {
      id: 'estagiario-t5-e04-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída? O `replace` torna os espaços visíveis.',
      codigo: `String s = """
      x
    y
    """;
System.out.print(s.replace(' ', '.'));`,
      opcoes: ['`..x\ny`', '`x\ny`', '`......x\n....y`', '`..x\n..y`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A menor indentação (a do "y" e a do fechamento) é de 4 espaços, e ela é removida de todas as linhas. O "x" tinha 6 e fica com 2.',
    },
    {
      id: 'estagiario-t5-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar o trecho?',
      codigo: `String s = """Olá""";
System.out.println(s);`,
      opcoes: [
        'Não compila: depois do `"""` de abertura precisa vir uma quebra de linha',
        'Imprime `Olá`',
        'Imprime `"Olá"`',
        'Imprime `""Olá""`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'A abertura de um text block é sempre `"""` seguida de uma quebra de linha. Para um texto de uma linha só, use um literal comum.',
    },
    {
      id: 'estagiario-t5-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre text blocks são verdadeiras? Escolha duas.',
      opcoes: [
        'O conteúdo começa na linha seguinte à do `"""` de abertura',
        'O resultado é uma `String` comum, que pode usar todos os métodos de `String`',
        'Todo o espaço à esquerda das linhas é preservado',
        'Aspas duplas sozinhas precisam ser escapadas com `\\"`',
        'Só existem a partir do Java 21',
      ],
      respostas: [0, 1],
      explicacao: 'O espaço incidental (a indentação comum) é removido; só o essencial fica. Aspas soltas não precisam de escape, só três seguidas. E text blocks são do Java 15, presentes nas três provas.',
    },
    {
      id: 'estagiario-t5-e04-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A linha do "a" termina com dois espaços. Qual é a saída?',
      codigo: `String s = """
    a
    b\\s
    """;
System.out.print(s.replace(' ', '.'));`,
      opcoes: ['`a\nb.`', '`a..\nb.`', '`a\nb`', '`a..\nb`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Espaços no fim das linhas são removidos antes de os escapes serem interpretados. Os dois espaços depois do "a" somem; o `\\s` depois do "b" vira um espaço só depois dessa limpeza, e por isso sobrevive.',
    },
    {
      id: 'estagiario-t5-e04-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a abertura do text block. O programa deve imprimir `Javaflix`.',
      codigo: `public class Bloco {
    public static void main(String[] args) {
        String s = ___
            Javaflix
            """;
        System.out.println(s.strip());
    }
}`,
      respostas: ['"""'],
      saida: 'Javaflix',
      explicacao: 'Text blocks abrem e fecham com três aspas. O `strip()` remove a quebra de linha do fim, que existe porque o fechamento está numa linha própria.',
    },
    {
      id: 'estagiario-t5-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String s = """
    um \\
    dois""";
System.out.println(s);`,
      opcoes: ['`um dois`', '`um \\\ndois`', '`um\ndois`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Uma `\\` no fim da linha é o escape de continuação (Java 15): junta a linha com a próxima, sem quebra. O espaço antes da barra não é "espaço no fim da linha", porque a barra vem depois dele.',
    },
    {
      id: 'estagiario-t5-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = """
    a
    """;
System.out.println(s.equals("a\\n"));`,
      opcoes: ['`true`', '`false`', 'Não compila', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O text block vale exatamente "a" seguido de uma quebra de linha, a mesma `String` que o literal `"a\\n"`.',
    },
    {
      id: 'estagiario-t5-e04-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `String s = """
    "aspas" e \\"""
    """;
System.out.print(s);`,
      resposta: '"aspas" e """',
      explicacao: 'As aspas soltas ficam como estão. `\\"""` produz três aspas sem fechar o bloco. O fechamento numa linha própria acrescenta uma quebra, que o `print` imprime.',
    },
    {
      id: 'estagiario-t5-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = """
    %s tem %d anos
    """.formatted("Bia", 20);
System.out.print(s);`,
      opcoes: ['`Bia tem 20 anos`', '`%s tem %d anos`', 'Não compila: `formatted` em text block', '`Bia tem 20 anos` seguido de `%`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O text block é uma `String` comum, e `formatted` (Java 15) substitui os marcadores como o `String.format`.',
    },
    {
      id: 'estagiario-t5-e04-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String a = """
    ok""";
String b = "ok";
System.out.println(a == b);`,
      opcoes: ['`true`', '`false`', 'Não compila', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O text block e o literal geram a mesma constante "ok", sem quebra no fim porque o fechamento está na mesma linha. Constantes iguais compartilham o mesmo objeto no pool de strings, e `==` compara referências.',
    },
    {
      id: 'estagiario-t5-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o efeito de colocar o `"""` de fechamento numa linha própria, em vez de logo depois da última palavra?',
      opcoes: [
        'O texto passa a terminar com uma quebra de linha, e o fechamento entra no cálculo da indentação',
        'Nenhum: as duas formas produzem a mesma `String`',
        'O compilador passa a manter todo o espaço à esquerda',
        'O texto deixa de ser uma constante',
      ],
      resposta: 0,
      explicacao: 'Na linha própria, a última linha do texto termina com `\\n`, e a coluna do fechamento conta na menor indentação. Recuar o fechamento para a esquerda preserva espaço à esquerda do conteúdo.',
    },
    {
      id: 'estagiario-t5-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = """
    a

    b
    """;
System.out.println(s.lines().count());`,
      opcoes: ['`3`', '`2`', '`4`', '`5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A linha em branco do meio faz parte do texto: "a\\n\\nb\\n". O `lines()` devolve "a", "" e "b". A quebra final não gera uma linha vazia a mais.',
    },
    {
      id: 'estagiario-t5-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String s = "  x\\n    y".stripIndent();
System.out.println(s.replace(' ', '.'));`,
      opcoes: ['`x\n..y`', '`x\ny`', '`..x\n....y`', '`x\n....y`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`stripIndent()` aplica o mesmo algoritmo dos text blocks a uma `String` qualquer: a menor indentação é 2 (a do "x"), removida das duas linhas.',
    },
  ],
};

export default episodio;
