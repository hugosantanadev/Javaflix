import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t1-e01',
  minutos: 13,
  aula,
  armadilhas: [
    'A variável de um objeto guarda uma referência; `b = a` faz as duas apontarem para o mesmo objeto.',
    '`==` entre objetos compara identidade: dois objetos com os mesmos valores dão `false`.',
    'Campos recebem valor padrão (0, `false`, `null`); variáveis locais não, e lê-las sem atribuir não compila.',
    'Se algum caminho do código puder pular a atribuição, a variável local continua sem valor para o compilador.',
    'Usar um membro de uma referência `null` lança `NullPointerException`; imprimir ou concatenar `null` não.',
    '`x = null` apaga só aquela referência; outras variáveis continuam apontando para o objeto.',
    'Campo de instância não pode ser acessado pelo nome da classe: `Conta.saldo` não compila se `saldo` não for `static`.',
    'O `equals` herdado de `Object` também compara identidade, até a classe sobrescrevê-lo.',
  ],
  ia: {
    uso:
      'A IA é boa para desenhar, em texto, quais variáveis apontam para quais objetos depois de cada linha, e para gerar classes simples a partir de uma descrição. O cuidado é com o que ela não diz: campos que ficam `null`, objetos compartilhados sem querer e `==` usado como se comparasse conteúdo.',
    pedido:
      'Acompanhe este trecho Java 21 linha por linha.\n<cole o código aqui>\n- Depois de cada atribuição, diga para qual objeto cada variável aponta (objeto 1, objeto 2...).\n- Diga quantos objetos foram criados e quais ficaram sem referência no fim.\n- Aponte qualquer campo de tipo objeto que pode ser usado enquanto ainda é null.',
    erros: [
      'Explica o `==` entre objetos como comparação de valores.',
      'Deixa campos de coleção sem inicializar.',
      'Conta objetos pelas variáveis, e não pelos `new`.',
    ],
    conferir: [
      'Conte os `new`: cada um cria exatamente um objeto.',
      'Imprima os campos de um objeto recém-criado para ver os valores padrão.',
      'No depurador, compare os números `@` das variáveis para ver quais apontam para o mesmo objeto.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: Creating and Using Objects',
      url: 'https://dev.java/learn/language/oop/classes-objects/creating-objects/',
      tipo: 'documentacao',
      porque: 'Declarar a variável, instanciar com `new`, acessar campos e métodos: o tutorial oficial do assunto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Creating Classes',
      url: 'https://dev.java/learn/language/oop/classes-objects/creating-classes/',
      tipo: 'documentacao',
      porque: 'Como se declara uma classe, seus campos e as convenções de nomes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 4.12.5: Initial Values of Variables',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12.5',
      tipo: 'documentacao',
      porque: 'A regra oficial: quais variáveis recebem valor padrão e quais precisam de atribuição antes do uso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 12.5: Creation of New Class Instances',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.5',
      tipo: 'documentacao',
      porque: 'O passo a passo do que acontece num `new`, da reserva de memória ao fim do construtor.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Using Objects',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/usingobject.html',
      tipo: 'documentacao',
      porque: 'O operador ponto para campos e métodos, com o exemplo clássico do retângulo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Classes and Objects',
      url: 'https://www.baeldung.com/java-classes-objects',
      tipo: 'artigo',
      porque: 'Classe, objeto e referência em poucos exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 24, Orientação a Objetos: Classes e atributos',
      url: 'https://www.youtube.com/watch?v=Gq1BS63pkRA',
      tipo: 'video',
      porque: 'A primeira classe, os atributos e a criação de objetos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 25, Classes e métodos simples',
      url: 'https://www.youtube.com/watch?v=-t_c6F_Uoeg',
      tipo: 'video',
      porque: 'Métodos que leem e alteram os campos do próprio objeto.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Aleksey Shipilëv: Java Objects Inside Out',
      url: 'https://shipilev.net/jvm/objects-inside-out/',
      tipo: 'artigo',
      porque: 'Um engenheiro da JVM mostra, byte a byte, o cabeçalho e o layout dos objetos na memória.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JOL: Java Object Layout',
      url: 'https://github.com/openjdk/jol',
      tipo: 'ferramenta',
      porque: 'A ferramenta da OpenJDK que imprime o tamanho e o layout real de qualquer objeto.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 519: Compact Object Headers',
      url: 'https://openjdk.org/jeps/519',
      tipo: 'documentacao',
      porque: 'Como o Java 25 reduziu o cabeçalho dos objetos de 12 para 8 bytes, e o que isso economiza.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Valores padrão, variáveis locais sem valor e leitura de campos, no estilo das questões da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seções "Creating Objects" e "Initializing Variables"',
    },
  ],
  desafio: {
    titulo: 'Transferências entre contas',
    enunciado:
      'Crie a classe `Conta`, com `titular` e `saldo`, e o método `transferir(Conta destino, double valor)`. Ele recusa destino `null`, valor menor ou igual a zero e valor maior que o saldo, imprimindo `Transferência recusada: <valor>`. Rode com este `main`:\n\n```java\nConta ana = new Conta();\nana.titular = "Ana";\nana.saldo = 100;\nConta bia = new Conta();\nbia.titular = "Bia";\nConta mesma = ana;\n\nana.transferir(bia, 30);\nmesma.transferir(bia, 80);\nana.transferir(null, 10);\nSystem.out.println(ana.titular + ": " + ana.saldo);\nSystem.out.println(bia.titular + ": " + bia.saldo);\nSystem.out.println("mesma == ana: " + (mesma == ana));\n```\n\nA saída esperada é:\n\n```text\nTransferência recusada: 80.0\nTransferência recusada: 10.0\nAna: 70.0\nBia: 30.0\nmesma == ana: true\n```',
    dicas: [
      'Dentro de `transferir`, `saldo` é o saldo do objeto em que o método foi chamado; o do outro é `destino.saldo`.',
      'Confira `destino == null` antes de qualquer outra coisa: ler `destino.saldo` com `destino` nulo lançaria exceção.',
      '`mesma` não é outra conta: é outro nome para a conta da Ana.',
    ],
    solucao: `class Conta {
    String titular;
    double saldo;

    void transferir(Conta destino, double valor) {
        if (destino == null || valor <= 0 || valor > saldo) {
            System.out.println("Transferência recusada: " + valor);
            return;
        }
        saldo -= valor;
        destino.saldo += valor;
    }
}

public class Banco {
    public static void main(String[] args) {
        Conta ana = new Conta();
        ana.titular = "Ana";
        ana.saldo = 100;
        Conta bia = new Conta();
        bia.titular = "Bia";
        Conta mesma = ana;

        ana.transferir(bia, 30);
        mesma.transferir(bia, 80);
        ana.transferir(null, 10);
        System.out.println(ana.titular + ": " + ana.saldo);
        System.out.println(bia.titular + ": " + bia.saldo);
        System.out.println("mesma == ana: " + (mesma == ana));
    }
}`,
    saida: 'Transferência recusada: 80.0\nTransferência recusada: 10.0\nAna: 70.0\nBia: 30.0\nmesma == ana: true',
    comentarios:
      'A segunda transferência é recusada porque `mesma` é a conta da Ana, que já tinha só 70 depois da primeira. O curto-circuito do `||` garante que `valor > saldo` nunca é avaliado com destino nulo, e a ordem das condições importa. Num sistema real, dinheiro seria `BigDecimal` e a regra ficaria protegida por encapsulamento, assunto da próxima temporada.',
  },
  bugs: [
    {
      id: 'junior-t1-e01-b01',
      dificuldade: 2,
      sintoma: 'Só a Bia se mudou para Natal, mas o programa mostra `Ana: Natal, Bia: Natal`.',
      codigo: `class Endereco {
    String cidade;
}

public class Mudanca {
    public static void main(String[] args) {
        Endereco casaAna = new Endereco();
        casaAna.cidade = "Recife";
        Endereco casaBia = casaAna;
        casaBia.cidade = "Natal";
        System.out.println("Ana: " + casaAna.cidade + ", Bia: " + casaBia.cidade);
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: 'Ana: Natal, Bia: Natal' },
      correcao: `class Endereco {
    String cidade;
}

public class Mudanca {
    public static void main(String[] args) {
        Endereco casaAna = new Endereco();
        casaAna.cidade = "Recife";
        Endereco casaBia = new Endereco();
        casaBia.cidade = "Natal";
        System.out.println("Ana: " + casaAna.cidade + ", Bia: " + casaBia.cidade);
    }
}`,
      saidaCorrigida: 'Ana: Recife, Bia: Natal',
      dica: 'Quantos objetos `Endereco` este programa cria? Conte os `new`.',
      explicacao: 'Atribuir `casaAna` a `casaBia` copia a referência: as duas variáveis passam a apontar para o mesmo endereço, e mudar a cidade por uma muda o que a outra enxerga. Cada pessoa precisa do seu próprio objeto, criado com `new`.',
    },
    {
      id: 'junior-t1-e01-b02',
      dificuldade: 2,
      sintoma: 'O programa para com `NullPointerException` ao adicionar o primeiro item ao carrinho.',
      codigo: `import java.util.*;

class Carrinho {
    List<String> itens;

    void adicionar(String item) {
        itens.add(item);
    }
}

public class Loja {
    public static void main(String[] args) {
        Carrinho c = new Carrinho();
        c.adicionar("livro");
        System.out.println(c.itens);
    }
}`,
      linha: 4,
      efeito: { tipo: 'excecao', nome: 'NullPointerException' },
      correcao: `import java.util.*;

class Carrinho {
    List<String> itens = new ArrayList<>();

    void adicionar(String item) {
        itens.add(item);
    }
}

public class Loja {
    public static void main(String[] args) {
        Carrinho c = new Carrinho();
        c.adicionar("livro");
        System.out.println(c.itens);
    }
}`,
      saidaCorrigida: '[livro]',
      dica: 'Qual é o valor padrão de um campo do tipo `List`? Alguém criou a lista?',
      explicacao: 'O campo `itens` declara a variável, mas não cria lista nenhuma: como todo campo de tipo objeto, ele começa `null`. O `add` é chamado numa referência vazia. Inicializando o campo na declaração, cada carrinho já nasce com uma lista vazia.',
    },
    {
      id: 'junior-t1-e01-b03',
      dificuldade: 3,
      sintoma: 'O cliente está na mesma posição da loja, (2, 5), mas o programa diz `Cliente longe`.',
      codigo: `class Ponto {
    int x, y;
}

public class Mapa {
    public static void main(String[] args) {
        Ponto loja = new Ponto();
        loja.x = 2; loja.y = 5;
        Ponto cliente = new Ponto();
        cliente.x = 2; cliente.y = 5;
        if (loja == cliente) {
            System.out.println("Cliente na loja");
        } else {
            System.out.println("Cliente longe");
        }
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'Cliente longe' },
      correcao: `class Ponto {
    int x, y;
}

public class Mapa {
    public static void main(String[] args) {
        Ponto loja = new Ponto();
        loja.x = 2; loja.y = 5;
        Ponto cliente = new Ponto();
        cliente.x = 2; cliente.y = 5;
        if (loja.x == cliente.x && loja.y == cliente.y) {
            System.out.println("Cliente na loja");
        } else {
            System.out.println("Cliente longe");
        }
    }
}`,
      saidaCorrigida: 'Cliente na loja',
      dica: 'O `==` entre duas referências pergunta se os valores são iguais ou se é o mesmo objeto?',
      explicacao: 'São dois objetos diferentes com os mesmos valores, e o `==` entre referências só é verdadeiro para o mesmo objeto. Para comparar posições, compare os campos. Mais adiante neste cargo, sobrescrever `equals` deixa essa comparação dentro da própria classe.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em `Conta c = new Conta();`, o que a variável `c` guarda?',
      opcoes: [
        'Uma referência para o objeto criado no heap',
        'Uma cópia de todos os campos do objeto',
        'O código da classe `Conta`',
        'O nome do objeto',
      ],
      resposta: 0,
      explicacao: 'O objeto mora no heap; a variável guarda só o endereço dele. Por isso duas variáveis podem apontar para o mesmo objeto.',
      dica: 'O objeto fica no heap. O que vai para a variável?',
    },
    {
      id: 'junior-t1-e01-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `class Caixa {
    int itens;
    String rotulo;
}

Caixa c = new Caixa();
c.itens += 2;
System.out.println(c.itens + " " + c.rotulo);`,
      resposta: '2 null',
      explicacao: 'Campos começam com o valor padrão: `itens` vale 0 e passa a 2; `rotulo` continua `null`, que a concatenação transforma em texto.',
      dica: 'Campos começam com o valor padrão: `0` para `int` e `null` para objetos.',
    },
    {
      id: 'junior-t1-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Copo {
    int ml;
}

Copo a = new Copo();
Copo b = a;
a.ml = 200;
b.ml += 50;
Copo c = new Copo();
c.ml = a.ml;
System.out.println(a.ml + " " + (a == b) + " " + (a == c));`,
      opcoes: ['`250 true false`', '`200 true false`', '`250 true true`', '`250 false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`a` e `b` são o mesmo copo: os 50 ml somados por `b` aparecem em `a`. `c` recebeu o mesmo valor, mas é outro objeto, e `==` compara identidade.',
      dica: '`a` e `b` são o mesmo copo; `c` é outro, que só copiou o número.',
    },
    {
      id: 'junior-t1-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `int pontos;
boolean bonus = true;
if (bonus) {
    pontos = 10;
}
System.out.println(pontos);`,
      opcoes: ['Não compila', 'Imprime `10`', 'Imprime `0`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: '`pontos` é local e só recebe valor dentro do `if`. Para o compilador, `bonus` poderia ser `false`, então há um caminho em que `pontos` é lido sem valor. Um `else` com atribuição resolveria.',
      dica: 'Variável local precisa de atribuição em todos os caminhos antes de ser lida.',
    },
    {
      id: 'junior-t1-e01-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Numa classe com os campos `int a; String b; boolean c; double d;`, quais afirmações valem para um objeto recém-criado? Escolha duas.',
      opcoes: [
        '`a` vale `0` e `d` vale `0.0`',
        '`b` vale `null`',
        '`b` vale `""`',
        '`c` vale `true`',
        'Ler qualquer campo antes de atribuir não compila',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: '0 null false 0.0' },
      codigoVerificacao: `class Campos {
    int a;
    String b;
    boolean c;
    double d;
}

Campos x = new Campos();
System.out.println(x.a + " " + x.b + " " + x.c + " " + x.d);`,
      explicacao: 'Campos sempre recebem o valor padrão do tipo: 0, 0.0, `false` e `null`. A exigência de atribuir antes de ler vale só para variáveis locais.',
      dica: 'Lembre os valores padrão de cada tipo de campo.',
    },
    {
      id: 'junior-t1-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `class Carro {
    String placa;
}

Carro c = new Carro();
System.out.println(c.placa.toUpperCase());`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `null`',
        'Imprime `NULL`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'O objeto `c` existe, mas o campo `placa` nunca recebeu uma `String`. Chamar `toUpperCase()` numa referência nula lança a exceção.',
      dica: 'Qual é o valor padrão de um campo `String`? E o que acontece ao chamar método nele?',
    },
    {
      id: 'junior-t1-e01-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a palavra que cria o objeto. O programa deve imprimir `Dom Casmurro`.',
      codigo: `class Livro {
    String titulo = "Dom Casmurro";
}

public class Biblioteca {
    public static void main(String[] args) {
        Livro l = ___ Livro();
        System.out.println(l.titulo);
    }
}`,
      respostas: ['new'],
      saida: 'Dom Casmurro',
      explicacao: '`new` reserva a memória do objeto, inicializa os campos e chama o construtor. O resultado é a referência guardada em `l`.',
      dica: 'Que palavra reservada cria objetos?',
    },
    {
      id: 'junior-t1-e01-q08',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `class Conta {
    double saldo;
}

public class Teste {
    public static void main(String[] args) {
        Conta c = new Conta();
        c.saldo = 50;
        Conta.saldo = 10;
        System.out.println(c.saldo);
    }
}`,
      resposta: 9,
      explicacao: 'Cada conta tem o seu `saldo`, então é preciso dizer **de qual objeto**: `c.saldo`. Pelo nome da classe só se acessam membros `static`, assunto do episódio 4.',
      dica: '`saldo` é um campo do objeto ou da classe?',
    },
    {
      id: 'junior-t1-e01-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class No {
    int valor;
    No proximo;
}

No a = new No();
a.valor = 1;
a.proximo = new No();
a.proximo.valor = 2;
No b = a.proximo;
a.proximo = null;
System.out.println(a.valor + " " + b.valor + " " + (a.proximo == null));`,
      opcoes: ['`1 2 true`', 'Lança `NullPointerException`', '`1 0 true`', '`1 2 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`b` guardou a referência do segundo nó antes de `a.proximo` virar `null`. Apagar uma referência não apaga o objeto, que continua acessível por `b`.',
      dica: '`b` guardou a referência do segundo nó antes de `a.proximo` virar `null`.',
    },
    {
      id: 'junior-t1-e01-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quantos objetos `Conta` são criados?',
      codigo: `Conta a = new Conta();
Conta b = a;
Conta c = new Conta();
Conta d = c;
c = a;`,
      opcoes: ['2', '1', '3', '4'],
      resposta: 0,
      explicacao: 'Objetos só nascem com `new`, e há dois. As outras linhas apenas copiam referências: no fim, `a`, `b` e `c` apontam para o primeiro, e `d` para o segundo.',
      dica: 'Conte os `new`, não as variáveis.',
    },
    {
      id: 'junior-t1-e01-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `class Contador {
    int valor;

    void incrementar() {
        valor++;
    }
}

Contador x = new Contador();
Contador y = new Contador();
x.incrementar();
x.incrementar();
y.incrementar();
Contador z = x;
z.incrementar();
System.out.println(x.valor + " " + y.valor);`,
      resposta: '3 1',
      explicacao: 'Cada contador tem o seu `valor`. `z` é outro nome para `x`, então o terceiro incremento também vai para `x`.',
      dica: '`z` aponta para o mesmo contador de `x`.',
    },
    {
      id: 'junior-t1-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Aluno {
    String nome;
    double nota;
}

Aluno a = new Aluno();
String texto = a.nome + ":" + a.nota;
System.out.println(texto);`,
      opcoes: ['`null:0.0`', '`:0.0`', '`:0`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Concatenar `null` não chama nenhum método no objeto: a referência nula vira o texto "null". A exceção só aconteceria com algo como `a.nome.length()`.',
      dica: 'Concatenar `null` dá o texto `"null"`, e o `double` padrão é `0.0`.',
    },
    {
      id: 'junior-t1-e01-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'No bytecode de `new Conta()`, o que faz a instrução `new`?',
      opcoes: [
        'Reserva a memória do objeto e zera os campos; o construtor é chamado depois, por `invokespecial`',
        'Reserva a memória e já executa o construtor',
        'Carrega o arquivo `Conta.class` do disco a cada chamada',
        'Copia um objeto `Conta` existente',
      ],
      resposta: 0,
      explicacao: 'São etapas separadas: `new` aloca e zera (de onde vêm os valores padrão), `dup` duplica a referência e `invokespecial` chama o `<init>`, o construtor. A classe é carregada uma única vez, na primeira utilização.',
      dica: 'Lembre as três instruções: `new`, `dup` e `invokespecial`.',
    },
    {
      id: 'junior-t1-e01-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`int x; x++;`',
        '`String s; System.out.println(s);`',
        '`int[] v = new int[1]; v[0]++;`',
        '`String t = null; System.out.println(t);`',
        '`Object o = new Object(); System.out.println(o == null);`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Variáveis locais sem valor não podem ser lidas, e `x++` lê antes de escrever. Posições de array têm valor padrão, e `null` é um valor como outro qualquer: atribuído, pode ser impresso e comparado.',
      dica: 'Variáveis locais sem atribuição não podem ser lidas; posições de array, sim.',
    },
    {
      id: 'junior-t1-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Ponto {
    int x, y;
}

Ponto p1 = new Ponto();
Ponto p2 = new Ponto();
System.out.println((p1 == p2) + " " + p1.equals(p2) + " " + (p1.x == p2.x));`,
      opcoes: ['`false false true`', '`true true true`', '`false true true`', '`false false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'São dois objetos, e `==` compara identidade. O `equals` herdado de `Object` faz a mesma comparação, até que a classe o sobrescreva, como você verá na temporada de herança. Os campos, `int`, são comparados por valor.',
      dica: 'Dois objetos diferentes: o `==` e o `equals` herdado comparam o quê?',
    },
  ],
};

export default episodio;
