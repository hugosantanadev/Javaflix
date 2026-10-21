import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t1-e04',
  minutos: 10,
  aula,
  armadilhas: [
    'Identificador não começa com dígito e não pode ser palavra reservada, incluindo `goto` e `const`.',
    '`var`, `record`, `yield`, `sealed` e `permits` podem ser nomes de variável.',
    '`int _ = 1;` não compila no Java 17 e 21; no Java 25 é uma variável sem nome.',
    'Variável local lida antes de receber valor em todos os caminhos não compila, mesmo que a condição seja óbvia.',
    '`var` exige inicializador, não aceita `null` sozinho, nem `{1, 2}` solto, nem duas variáveis na mesma linha.',
    '`var` não serve para campos, parâmetros ou retorno de método.',
    'O tipo de uma variável `var` é fixo: atribuir outro tipo depois é erro.',
    'Não dá para declarar num bloco interno uma variável com o nome de outra que ainda está no escopo.',
  ],
  ia: {
    uso:
      'A IA é boa para sugerir nomes mais claros que `x`, `aux` e `temp`, o que pesa muito na manutenção, e explica bem um erro de escopo ou de variável não inicializada quando você cola a mensagem do compilador junto com o código. Antes de colar código de trabalho, troque senhas, chaves e dados reais por valores de exemplo.',
    pedido:
      'Revise os nomes de variáveis do método Java 25 abaixo.\n- Sugira nomes mais claros, em português e em camelCase.\n- Não mude a lógica nem o tipo de nenhuma variável.\n- Diga onde o var deixaria o código mais legível e onde esconderia o tipo.\n- Responda com uma tabela: nome atual, nome sugerido e motivo.\n\n<cole o método aqui>',
    erros: [
      'Põe `var` em campo, parâmetro ou tipo de retorno, onde ele não compila.',
      'Diz que `var` deixa a variável dinâmica, como em JavaScript, aceitando valores de outro tipo depois.',
      'Renomeia uma variável e esquece um dos usos, ou sugere um nome que colide com outro do mesmo escopo.',
    ],
    conferir: [
      'Compile depois de cada mudança: o `javac` acusa nome repetido e variável fora do escopo.',
      'Aplique os nomes pela IDE, com **Shift + F6**, que troca todos os usos de uma vez, em vez de colar o código da IA por cima do seu.',
      'Confira o tipo inferido de cada `var` com **Ctrl + Shift + P**.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: Variables',
      url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html',
      tipo: 'documentacao',
      porque: 'Os tipos de variável (campo, local, parâmetro) e as regras de nome, do tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 286: Local-Variable Type Inference',
      url: 'https://openjdk.org/jeps/286',
      tipo: 'documentacao',
      porque: 'A proposta original do `var`, com todas as restrições explicadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 456: Unnamed Variables & Patterns',
      url: 'https://openjdk.org/jeps/456',
      tipo: 'documentacao',
      porque: 'Para a 1Z0-831: onde o `_` pode ser usado como variável sem nome.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS, capítulo 16: Definite Assignment',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-16.html',
      tipo: 'documentacao',
      porque: 'As regras que o compilador usa para decidir se uma variável local já tem valor.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'dev.java: Variables',
      url: 'https://dev.java/learn/language/constructs/basics/variables/',
      tipo: 'tutorial',
      porque: 'Capítulo oficial sobre variáveis, nomes válidos e valores padrão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Guia de estilo do var (OpenJDK)',
      url: 'https://openjdk.org/projects/amber/guides/lvti-style-guide',
      tipo: 'artigo',
      porque: 'Do próprio time do Java: quando `var` ajuda a leitura e quando atrapalha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to var in Java',
      url: 'https://www.baeldung.com/java-10-local-variable-type-inference',
      tipo: 'artigo',
      porque: 'Exemplos de cada restrição do var e as armadilhas com diamond e classes anônimas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #06, Tipos Primitivos e Manipulação de Dados',
      url: 'https://www.youtube.com/watch?v=JEAQeT7YGs4',
      tipo: 'video',
      porque: 'Declaração e inicialização de variáveis na prática, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de identificador, inicialização, var e escopo exatamente como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seções sobre identificadores, inicialização de variáveis, var e escopo',
    },
    {
      titulo: 'Think Java, 2ª edição (Downey e Mayfield)',
      url: 'https://greenteapress.com/wp/think-java-2e/',
      tipo: 'livro',
      porque: 'Explicação gratuita e sem pressa de variáveis e atribuição.',
      gratuito: true,
      idioma: 'en',
      onde: 'Cap. 2, "Variables and Operators"',
    },
  ],
  desafio: {
    titulo: 'Conta do café',
    enunciado:
      'Escreva a classe `Conta` que calcula o total de 3 cafés de R$ 4,50 usando `var` e imprime `Total: 13.5`. Depois, dentro de um bloco `{ }`, calcule um desconto de 10% numa variável `desconto` e imprima `Com desconto: 12.15`. Por fim, tente usar `desconto` depois do bloco e leia a mensagem do compilador antes de apagar a linha.',
    dicas: [
      'Qual tipo o `var` escolhe para `4.50`? E para `3`? E para o produto dos dois?',
      'Para não sofrer com arredondamento, calcule o desconto como `total / 10`.',
    ],
    solucao: `public class Conta {
    public static void main(String[] args) {
        var preco = 4.50;
        var quantidade = 3;
        var total = preco * quantidade;
        System.out.println("Total: " + total);
        {
            var desconto = total / 10;
            System.out.println("Com desconto: " + (total - desconto));
        }
        // System.out.println(desconto); // não compila: desconto não existe aqui
    }
}`,
    saida: 'Total: 13.5\nCom desconto: 12.15',
    comentarios:
      '`preco` vira `double`, `quantidade` vira `int` e o produto é `double`. O `desconto` só existe dentro do bloco: a linha comentada no fim gera `cannot find symbol`. Os parênteses em `(total - desconto)` importam: sem eles, a subtração viria depois da concatenação com a String e não compilaria.',
  },
  bugs: [
    {
      id: 'estagiario-t1-e04-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: cannot infer type for local variable nome`.',
      codigo: `public class Cadastro {
    public static void main(String[] args) {
        var nome;
        nome = "Ana Lima";
        System.out.println(nome);
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Cadastro {
    public static void main(String[] args) {
        String nome;
        nome = "Ana Lima";
        System.out.println(nome);
    }
}`,
      saidaCorrigida: 'Ana Lima',
      dica: 'O `var` descobre o tipo olhando para alguma coisa na própria declaração. O que está faltando ali?',
      explicacao: 'Com `var`, o tipo vem do valor inicial, na mesma linha, e a atribuição da linha seguinte não ajuda: a inferência acontece só na declaração. Com o tipo escrito, `String nome;`, declarar agora e atribuir depois é permitido.',
    },
    {
      id: 'estagiario-t1-e04-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: variable idade is already defined in method main(String[])`.',
      codigo: `public class Idade {
    public static void main(String[] args) {
        int idade = 17;
        if (idade < 18) {
            int idade = 18;
        }
        System.out.println(idade);
    }
}`,
      linha: 5,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Idade {
    public static void main(String[] args) {
        int idade = 17;
        if (idade < 18) {
            idade = 18;
        }
        System.out.println(idade);
    }
}`,
      saidaCorrigida: '18',
      dica: 'Uma linha declara uma variável nova onde a intenção era mudar uma que já existe.',
      explicacao: 'Variáveis locais não podem ser declaradas de novo num bloco interno enquanto a de fora ainda está no escopo. A intenção era atribuir, então basta tirar o `int`.',
    },
    {
      id: 'estagiario-t1-e04-b03',
      dificuldade: 3,
      sintoma: 'O saldo deveria terminar em 101.5, mas o programa imprime 101.',
      codigo: `public class Saldo {
    public static void main(String[] args) {
        var saldo = 100;
        saldo += 1.5;
        System.out.println(saldo);
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: '101' },
      correcao: `public class Saldo {
    public static void main(String[] args) {
        var saldo = 100.0;
        saldo += 1.5;
        System.out.println(saldo);
    }
}`,
      saidaCorrigida: '101.5',
      dica: 'Descubra que tipo o `var` escolheu para `saldo`. Depois, lembre o que o `+=` faz quando o resultado não cabe nesse tipo.',
      explicacao: 'O `var` inferiu `int` a partir de `100`. E o `+=` esconde um cast: `saldo += 1.5` vira `saldo = (int) (saldo + 1.5)`, que corta a parte decimal sem erro nenhum. Com `100.0`, o tipo inferido é `double`.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t1-e04-q01',
      tipo: 'multipla',
      dificuldade: 2,
      provas: ['829', '830'],
      enunciado: 'No Java 21, quais declarações compilam? Escolha três.',
      opcoes: ['`int $total = 10;`', '`int _quantidade = 5;`', '`int 2lugar = 1;`', '`int class = 3;`', '`int var = 7;`', '`int _ = 0;`'],
      respostas: [0, 1, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        'Identificadores podem começar com `$` ou `_`, e `var` é uma palavra-chave contextual, que funciona como nome de variável. Começar com dígito e usar `class` são erros. O `_` sozinho não é identificador desde o Java 9.',
      dica: 'Revise as regras: começa com letra, `$` ou `_`, sem palavras reservadas. E repare na versão pedida: o que o `_` sozinho significa no Java 21?',
    },
    {
      id: 'estagiario-t1-e04-q02',
      tipo: 'escolha',
      dificuldade: 3,
      provas: ['831'],
      enunciado: 'No Java 25, qual é o resultado do trecho?',
      codigo: `int _ = 10;
int _ = 20;
System.out.println("ok");`,
      opcoes: [
        'Imprime `ok`',
        'Não compila: `_` é palavra reservada',
        'Não compila: a variável `_` foi declarada duas vezes',
        'Imprime `20`',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'ok' },
      explicacao:
        'No Java 22 em diante, `_` declara uma variável sem nome: o valor é calculado, mas não pode ser lido. Como não cria nome nenhum, dá para ter várias no mesmo bloco. É útil quando um valor precisa ser declarado, mas não é usado.',
      dica: 'No Java 25, `_` sozinho é uma variável sem nome. Duas variáveis sem nome entram em conflito?',
    },
    {
      id: 'estagiario-t1-e04-q03',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Saldo {
    public static void main(String[] args) {
        int saldo;
        int deposito = 100;
        if (deposito > 50) {
            saldo = deposito;
        }
        System.out.println(saldo);
    }
}`,
      resposta: 8,
      explicacao:
        'Declarar `saldo` sem valor é permitido. O erro aparece na leitura: o compilador não avalia a condição do `if` e enxerga um caminho em que `saldo` continua sem valor.',
      dica: 'O compilador não avalia a condição do `if`. Existe um caminho em que alguma variável chega à leitura sem valor?',
    },
    {
      id: 'estagiario-t1-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int nota = 7;
String situacao;
if (nota >= 6) {
    situacao = "aprovado";
} else {
    situacao = "reprovado";
}
System.out.println(situacao);`,
      opcoes: ['`aprovado`', 'Não compila: `situacao` pode não ter sido inicializada', '`null`', '`reprovado`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'Com `if` e `else` atribuindo valor, todos os caminhos inicializam `situacao`, e o compilador aceita a leitura. Como a nota é 7, sai `aprovado`.',
      dica: 'Confira se os dois caminhos do `if` atribuem um valor antes da leitura.',
    },
    {
      id: 'estagiario-t1-e04-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais usos de `var` compilam dentro de um método? Escolha duas.',
      opcoes: [
        '`var nome = "Ana";`',
        '`var x;`',
        '`var nada = null;`',
        '`var a = 1, b = 2;`',
        '`var lista = new java.util.ArrayList<String>();`',
        '`var notas = {7, 8, 9};`',
      ],
      respostas: [0, 4],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        '`var` precisa de um inicializador com tipo claro. Sem valor, com `null` sozinho ou com `{...}` solto não há tipo para inferir, e `var` não permite duas variáveis na mesma declaração.',
      dica: 'O `var` só funciona quando o compilador descobre um tipo pelo lado direito, com uma variável por declaração.',
    },
    {
      id: 'estagiario-t1-e04-q06',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Inferencia {
    public static void main(String[] args) {
        var contador = 10;
        contador = contador + 5;
        var texto = "valor: " + contador;
        contador = "quinze";
        System.out.println(texto);
    }
}`,
      resposta: 6,
      explicacao:
        '`contador` foi inferido como `int` na linha 3, e esse tipo não muda. Atribuir uma String a ele é erro, como seria com `int contador`.',
      dica: 'O tipo de uma variável `var` é decidido na declaração e nunca muda. Procure uma atribuição de outro tipo.',
    },
    {
      id: 'estagiario-t1-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar e executar?',
      codigo: `public class Config {
    var porta = 8080;

    public static void main(String[] args) {
        System.out.println("iniciando");
    }
}`,
      opcoes: [
        'Imprime `iniciando`',
        'Não compila: `var` não pode ser usado em campos',
        'Não compila: `porta` precisaria ser `static`',
        'Imprime `8080`',
      ],
      resposta: 1,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: '`var` só existe para variáveis locais. Em campos, parâmetros e tipos de retorno, o tipo precisa ser escrito.',
      dica: 'Onde o `var` pode aparecer: em variáveis locais, em campos ou em parâmetros?',
    },
    {
      id: 'estagiario-t1-e04-q08',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `int x = 1;
{
    int y = x + 1;
    System.out.println(y);
}
{
    int y = 10;
    System.out.println(x + y);
}`,
      resposta: '2\n11',
      explicacao:
        'Cada bloco tem o seu próprio `y`, que deixa de existir no `}`. Por isso o segundo bloco pode declarar outro `y`. O `x` foi declarado fora, então os dois blocos enxergam.',
      dica: 'Cada bloco `{ }` tem o seu escopo. O segundo `y` é outro `y`, e `x` é visível nos dois blocos.',
    },
    {
      id: 'estagiario-t1-e04-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Escopo {
    public static void main(String[] args) {
        int total = 0;
        {
            int parcial = 5;
            int total = parcial * 2;
            System.out.println(total);
        }
    }
}`,
      resposta: 6,
      explicacao:
        'O `total` de fora ainda está no escopo dentro do bloco, e Java não permite outra variável local com o mesmo nome ali. Bastaria escrever `total = parcial * 2;` sem redeclarar.',
      dica: 'Dentro de um bloco aninhado dá para ler as variáveis de fora, mas não para declarar outra com o mesmo nome.',
    },
    {
      id: 'estagiario-t1-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quais são os tipos inferidos para `a`, `b`, `c` e `d`, nessa ordem?',
      codigo: `var a = 10;
var b = 10L;
var c = 'x';
var d = 1.5f;`,
      opcoes: [
        '`int`, `long`, `char`, `float`',
        '`Integer`, `Long`, `Character`, `Float`',
        '`int`, `int`, `String`, `double`',
        '`long`, `long`, `char`, `double`',
        'Não compila: `var` não aceita literais',
      ],
      resposta: 0,
      explicacao:
        'O `var` usa exatamente o tipo do literal: inteiro sem sufixo é `int`, com `L` é `long`, entre aspas simples é `char` e com `f` é `float`. Primitivos continuam primitivos, sem virar wrappers.',
      dica: 'O `var` não troca primitivo por classe: ele assume exatamente o tipo do literal, como no episódio anterior.',
    },
    {
      id: 'estagiario-t1-e04-q11',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com um tipo para que o código compile e imprima `75`.',
      codigo: `public class Pedido {
    public static void main(String[] args) {
        ___ itens = 3, preco = 25;
        System.out.println(itens * preco);
    }
}`,
      respostas: ['int', 'long', 'short', 'byte'],
      saida: '75',
      explicacao:
        'As duas variáveis da declaração compartilham o tipo. Qualquer tipo inteiro serve, porque 3 e 25 cabem em todos e o produto é impresso como 75. Com `double` sairia `75.0`, e `var` não aceita duas variáveis numa linha.',
      dica: 'Uma declaração com vírgula usa um único tipo para todas as variáveis. Qualquer tipo inteiro em que 3 e 25 caibam serve.',
    },
    {
      id: 'estagiario-t1-e04-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String var = "var";
String record = "record";
String yield = "yield";
System.out.println(var + record + yield);`,
      opcoes: [
        '`varrecordyield`',
        'Não compila: `var` é palavra reservada',
        'Não compila: `record` é palavra reservada',
        'Não compila: `yield` é palavra reservada',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        '`var`, `record` e `yield` são palavras-chave contextuais: só têm significado especial em certas posições, como o tipo de uma variável local ou dentro de um `switch`. Como nomes de variável, são permitidas.',
      dica: '`var`, `record` e `yield` são palavras-chave contextuais. Fora do lugar especial delas, o que elas viram?',
    },
    {
      id: 'estagiario-t1-e04-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações **não** compilam? Escolha três.',
      opcoes: ['`int goto = 1;`', '`int const = 2;`', '`int null = 3;`', '`int var = 4;`', '`int record = 5;`', '`int main = 6;`'],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao:
        '`goto` e `const` são reservadas mesmo sem uso na linguagem, e `null` é um literal. `var` e `record` são contextuais, e `main` é só o nome de um método: todos funcionam como nome de variável.',
      dica: 'Algumas palavras são reservadas mesmo sem uso no Java, e os literais também não servem como nome.',
    },
    {
      id: 'estagiario-t1-e04-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar este trecho?',
      codigo: `for (int i = 0; i < 3; i++) {
}
System.out.println(i);`,
      opcoes: ['Imprime `3`', 'Imprime `2`', 'Não compila: `i` não existe fora do `for`', 'Lança uma exceção'],
      resposta: 2,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao:
        'A variável declarada no cabeçalho do `for` existe só dentro do laço. Para usar o valor final depois, ela teria de ser declarada antes do `for`.',
      dica: 'Até onde vai o escopo de uma variável declarada no `for`?',
    },
    {
      id: 'estagiario-t1-e04-q15',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `var c = 'a';
var n = c + 1;
var s = "" + c + 1;
System.out.println(n);
System.out.println(s);`,
      resposta: '98\na1',
      explicacao:
        '`c` é `char`. Em `c + 1`, o `char` vira `int` e `n` é inferido como `int` 98. Em `"" + c + 1`, a expressão já começa como String, então tudo é concatenado: `a` e depois `1`.',
      dica: '`c` é `char`. Que tipo dá `char + int`? E, com a String vazia na frente, o `+` soma ou concatena?',
    },
  ],
};

export default episodio;
