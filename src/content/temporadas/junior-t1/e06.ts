import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t1-e06',
  minutos: 14,
  aula,
  armadilhas: [
    'Do mais fechado ao mais aberto: `private`, nenhum modificador, `protected`, `public`.',
    'Sem modificador, o acesso é de pacote; escrever `default` num campo não compila.',
    '`private` é por classe: um método de `Conta` lê o campo `private` de outra `Conta`.',
    'Duas classes no mesmo arquivo são classes diferentes: `private` de uma não é visível na outra.',
    'No mesmo pacote, `protected` se comporta como acesso de pacote.',
    'Fora do pacote, a subclasse só acessa `protected` por `this` ou por referência do próprio tipo, nunca pelo tipo da superclasse.',
    'Classes de topo só podem ser `public` ou sem modificador; variáveis locais não aceitam modificador de acesso.',
    'Um membro `public` de uma classe sem modificador não é visível fora do pacote.',
  ],
  ia: {
    uso:
      'A IA ajuda a escolher o acesso de cada membro e a explicar por que um acesso não compila, inclusive o caso de `protected` entre pacotes. Peça que ela proponha o acesso mais restrito que funcione e justifique cada membro aberto: isso evita as classes cheias de `public` que ela costuma gerar.',
    pedido:
      'Revise os modificadores de acesso desta classe Java 21.\n<cole a classe aqui>\n- Proponha o acesso mais restrito que funcione para cada campo e método, e justifique cada um que ficar public ou protected.\n- Aponte campos que podem ser alterados de fora sem passar por uma regra.\n- Não gere getters e setters para todos os campos automaticamente.',
    erros: [
      'Gera getters e setters `public` para todos os campos.',
      'Diz que uma subclasse de outro pacote acessa `protected` por qualquer referência.',
      'Usa `default` como se fosse o modificador do acesso de pacote.',
    ],
    conferir: [
      'Compile o caso de `protected` com as classes em pacotes diferentes de verdade.',
      'Para cada `public`, pergunte quem de fora precisa daquilo.',
      'Rode a inspeção "Declaration access can be weaker" da IDE.',
    ],
  },
  recursos: [
    {
      titulo: 'Dev.java: More on Classes, Controlling Access to Members of a Class',
      url: 'https://dev.java/learn/language/oop/classes-objects/more-on-classes/#controlling-access-to-members-of-a-class',
      tipo: 'documentacao',
      porque: 'A tabela oficial de acesso, com dicas de qual nível escolher.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Controlling Access to Members of a Class',
      url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html',
      tipo: 'documentacao',
      porque: 'O diagrama com quatro classes em dois pacotes, que mostra quem enxerga o quê.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 6.6: Access Control',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.6',
      tipo: 'documentacao',
      porque: 'As regras formais de acesso para pacotes, classes e membros.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 6.6.2: Details on protected Access',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.6.2',
      tipo: 'documentacao',
      porque: 'A regra exata do tipo da referência no acesso `protected` fora do pacote.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Dev.java: Packages',
      url: 'https://dev.java/learn/language/oop/packages/',
      tipo: 'documentacao',
      porque: 'Criar pacotes, nomeá-los e usar os membros de um pacote em outro.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Access Modifiers in Java',
      url: 'https://www.baeldung.com/java-access-modifiers',
      tipo: 'artigo',
      porque: 'Os quatro níveis com um exemplo de cada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java \'protected\' Access Modifier',
      url: 'https://www.baeldung.com/java-protected-access-modifier',
      tipo: 'artigo',
      porque: 'Os casos de `protected` entre pacotes, inclusive o da referência do tipo da superclasse.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 181: Nest-Based Access Control',
      url: 'https://openjdk.org/jeps/181',
      tipo: 'documentacao',
      porque: 'Como o Java 11 eliminou os métodos sintéticos de acesso entre classes aninhadas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 31, Modificadores private e public',
      url: 'https://www.youtube.com/watch?v=6oD7TE90e-M',
      tipo: 'video',
      porque: 'Por que esconder os campos e expor métodos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 39, Herança: modificadores de acesso + protected',
      url: 'https://www.youtube.com/watch?v=xjxDh9xbfLM',
      tipo: 'video',
      porque: 'O `protected` com subclasses, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Escola para Programadores: Certificação Java (Modificadores de Acesso)',
      url: 'https://www.youtube.com/watch?v=8hofwTZKCEU',
      tipo: 'video',
      porque: 'Modificadores de acesso no estilo das questões da certificação, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os exemplos de `protected` com pássaros e cisnes em pacotes diferentes são a melhor preparação para a prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 5, "Methods": seção "Applying Access Modifiers", partes "Private Access", "Package Access", "Protected Access" e "Public Access"',
    },
  ],
  desafio: {
    titulo: 'Termostato encapsulado',
    enunciado:
      'Escreva a classe `Termostato`, com a temperatura-alvo e a contagem de ajustes em campos `private`. Os limites, 10 e 30 graus, são constantes `private static final`. O método público `ajustar(double novo)` só aceita valores dentro dos limites, devolvendo `true` ou `false`, e o alvo e os ajustes são lidos por métodos. Rode com:\n\n```java\nTermostato t = new Termostato();\nSystem.out.println(t.ajustar(25.5) + " " + t.ajustar(40) + " " + t.ajustar(9.5));\nSystem.out.println("alvo: " + t.getAlvo() + ", ajustes: " + t.getAjustes());\n```\n\nSaída esperada (o alvo começa em 22):\n\n```text\ntrue false false\nalvo: 25.5, ajustes: 1\n```\n\nDepois, confira: numa outra classe, `t.alvo = 50;` não deve compilar.',
    dicas: [
      'Com os campos `private`, a única forma de mudar o alvo é passar por `ajustar`, que valida.',
      'Os métodos de leitura podem ser `public`; a regra de negócio fica escondida.',
      'Conte o ajuste só quando ele for aceito.',
    ],
    solucao: `class Termostato {
    private static final double MINIMO = 10.0;
    private static final double MAXIMO = 30.0;
    private double alvo = 22.0;
    private int ajustes;

    public boolean ajustar(double novo) {
        if (novo < MINIMO || novo > MAXIMO) {
            return false;
        }
        alvo = novo;
        ajustes++;
        return true;
    }

    public double getAlvo() {
        return alvo;
    }

    public int getAjustes() {
        return ajustes;
    }
}

public class Casa {
    public static void main(String[] args) {
        Termostato t = new Termostato();
        System.out.println(t.ajustar(25.5) + " " + t.ajustar(40) + " " + t.ajustar(9.5));
        System.out.println("alvo: " + t.getAlvo() + ", ajustes: " + t.getAjustes());
    }
}`,
    saida: 'true false false\nalvo: 25.5, ajustes: 1',
    comentarios:
      'Esconder os campos garante que nenhum código de fora deixe o termostato num estado inválido, como 50 graus: toda mudança passa pela validação. Os métodos `getAlvo` e `getAjustes` seguem a convenção de nomes dos *getters*, que a próxima temporada aprofunda junto com a imutabilidade.',
  },
  bugs: [
    {
      id: 'junior-t1-e06-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: saldo has private access in Cofre`.',
      codigo: `class Cofre {
    private int saldo = 100;

    int ver() {
        return saldo;
    }
}

public class Banco {
    public static void main(String[] args) {
        Cofre c = new Cofre();
        System.out.println(c.saldo);
    }
}`,
      linha: 12,
      efeito: { tipo: 'naoCompila' },
      correcao: `class Cofre {
    private int saldo = 100;

    int ver() {
        return saldo;
    }
}

public class Banco {
    public static void main(String[] args) {
        Cofre c = new Cofre();
        System.out.println(c.ver());
    }
}`,
      saidaCorrigida: '100',
      dica: 'O campo é `private`. A classe `Cofre` oferece outro jeito de ler o saldo?',
      explicacao: 'Um membro `private` só é visível dentro da própria classe, mesmo para outra classe do mesmo arquivo. O `Cofre` expõe o saldo pelo método `ver()`, que é de pacote: é por ele que o `Banco` deve ler.',
    },
    {
      id: 'junior-t1-e06-b02',
      dificuldade: 2,
      sintoma: 'A conta tinha 50 e não deveria permitir saque maior que o saldo, mas termina com `-30.0`.',
      codigo: `class Conta {
    double saldo;

    void sacar(double valor) {
        if (valor <= saldo) saldo -= valor;
    }
}

public class Caixa {
    public static void main(String[] args) {
        Conta c = new Conta();
        c.saldo = 50;
        c.saldo -= 80;
        c.sacar(10);
        System.out.println(c.saldo);
    }
}`,
      linha: 13,
      efeito: { tipo: 'saida', saida: '-30.0' },
      correcao: `class Conta {
    double saldo;

    void sacar(double valor) {
        if (valor <= saldo) saldo -= valor;
    }
}

public class Caixa {
    public static void main(String[] args) {
        Conta c = new Conta();
        c.saldo = 50;
        c.sacar(80);
        c.sacar(10);
        System.out.println(c.saldo);
    }
}`,
      saidaCorrigida: '40.0',
      dica: 'A regra que impede o saldo negativo está em `sacar`. O primeiro saque passou por ela?',
      explicacao: 'O campo `saldo` está aberto para o pacote, e o primeiro saque foi feito direto nele, sem passar pela regra de `sacar`. Usando o método, o saque de 80 é recusado. É o motivo de campos assim serem `private`: com ele, a linha com o bug nem compilaria.',
    },
    {
      id: 'junior-t1-e06-b03',
      dificuldade: 3,
      sintoma: 'O quarto deveria copiar a temperatura da sala, 22, mas os dois terminam em `19 19`.',
      codigo: `class Termostato {
    private int alvo;

    Termostato(int alvo) {
        this.alvo = alvo;
    }

    void copiarDe(Termostato outro) {
        outro.alvo = alvo;
    }

    int alvo() {
        return alvo;
    }
}

public class Casa {
    public static void main(String[] args) {
        Termostato sala = new Termostato(22);
        Termostato quarto = new Termostato(19);
        quarto.copiarDe(sala);
        System.out.println(sala.alvo() + " " + quarto.alvo());
    }
}`,
      linha: 9,
      efeito: { tipo: 'saida', saida: '19 19' },
      correcao: `class Termostato {
    private int alvo;

    Termostato(int alvo) {
        this.alvo = alvo;
    }

    void copiarDe(Termostato outro) {
        alvo = outro.alvo;
    }

    int alvo() {
        return alvo;
    }
}

public class Casa {
    public static void main(String[] args) {
        Termostato sala = new Termostato(22);
        Termostato quarto = new Termostato(19);
        quarto.copiarDe(sala);
        System.out.println(sala.alvo() + " " + quarto.alvo());
    }
}`,
      saidaCorrigida: '22 22',
      dica: 'Em `quarto.copiarDe(sala)`, quem é `this` e quem é `outro`? Em qual dos dois a atribuição escreve?',
      explicacao: 'Dentro da classe, um objeto lê e escreve o `private` de outro objeto dela, e o compilador não reclama de nenhuma direção. A atribuição estava invertida: gravava o alvo do quarto (`this`) na sala (`outro`). O certo é `alvo = outro.alvo`.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t1-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a ordem dos níveis de acesso, do mais restritivo ao mais aberto?',
      opcoes: [
        '`private`, nenhum modificador, `protected`, `public`',
        'nenhum modificador, `private`, `protected`, `public`',
        '`private`, `protected`, nenhum modificador, `public`',
        '`protected`, `private`, nenhum modificador, `public`',
      ],
      resposta: 0,
      explicacao: 'Sem modificador, o acesso é de pacote. `protected` inclui o pacote e acrescenta as subclasses de outros pacotes, por isso é mais aberto.',
      dica: 'Comece pelo que só a própria classe vê e termine no que todos veem.',
    },
    {
      id: 'junior-t1-e06-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado?',
      codigo: `class Senha {
    private String valor = "1234";
}

public class Login {
    public static void main(String[] args) {
        Senha s = new Senha();
        System.out.println(s.valor.length());
    }
}`,
      opcoes: ['Não compila', 'Imprime `4`', 'Lança exceção', 'Imprime `1234`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: '`valor` é `private` de `Senha`. Estar no mesmo arquivo não muda nada: `Login` é outra classe.',
      dica: '`valor` é `private` em `Senha`. Quem pode lê-lo?',
    },
    {
      id: 'junior-t1-e06-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Ponto {
    private int x;

    Ponto(int x) {
        this.x = x;
    }

    int distancia(Ponto outro) {
        return Math.abs(x - outro.x);
    }

    public static void main(String[] args) {
        Ponto a = new Ponto(3);
        Ponto b = new Ponto(10);
        System.out.println(a.distancia(b) + " " + b.x);
    }
}`,
      resposta: '7 10',
      explicacao: 'O acesso `private` é por classe: o código de `Ponto` lê o `x` de qualquer `Ponto`, inclusive de `outro` e de `b` no `main`.',
      dica: 'O `private` é por classe: um `Ponto` lê o `x` de outro `Ponto`.',
    },
    {
      id: 'junior-t1-e06-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais declarações de classe de topo compilam? Escolha duas.',
      opcoes: [
        '`public class A { }`',
        '`class B { }`',
        '`private class C { }`',
        '`protected class D { }`',
        '`static class E { }`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Uma classe de topo só pode ser `public` ou ter acesso de pacote. `private`, `protected` e `static` só fazem sentido para classes aninhadas, dentro de outra.',
      dica: 'Classes de topo aceitam só dois níveis de acesso.',
    },
    {
      id: 'junior-t1-e06-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'As classes estão em pacotes diferentes. Quais das linhas A, B e C compilam?',
      codigo: `// arquivo loja/Produto.java
package loja;

public class Produto {
    protected double preco = 10;
}

// arquivo promo/Oferta.java
package promo;

import loja.Produto;

public class Oferta extends Produto {
    void aplicar(Produto p, Oferta o) {
        preco *= 0.9;      // linha A
        o.preco *= 0.9;    // linha B
        p.preco *= 0.9;    // linha C
    }
}`,
      opcoes: ['A e B', 'Só A', 'A, B e C', 'Nenhuma'],
      resposta: 0,
      explicacao: 'Fora do pacote, `Oferta` acessa `preco` pela herança: em si mesma (A) e em outra `Oferta` (B). Pela referência `p`, do tipo `Produto`, não: poderia ser um produto de qualquer outra hierarquia.',
      dica: 'Fora do pacote, `protected` só pelo `this` ou por referências do tipo da subclasse.',
    },
    {
      id: 'junior-t1-e06-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a palavra que coloca a classe num pacote. O programa deve imprimir `loja.Caixa`.',
      codigo: `___ loja;

public class Caixa {
    public static void main(String[] args) {
        System.out.println(Caixa.class.getName());
    }
}`,
      respostas: ['package'],
      saida: 'loja.Caixa',
      explicacao: 'A declaração `package` vem antes de tudo no arquivo, e o nome completo da classe passa a incluir o pacote: `loja.Caixa`.',
      dica: 'Qual declaração vai na primeira linha do arquivo para definir o pacote?',
    },
    {
      id: 'junior-t1-e06-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Contas {
    private int total;

    void somar(int valor) {
        total += valor;
    }
}

private class Auditoria {
    int verificacoes;
}`,
      resposta: 9,
      explicacao: 'Uma classe de topo só pode ser `public` ou ter acesso de pacote. `private` só faz sentido para uma classe aninhada, escondida dentro de outra.',
      dica: 'Uma classe de topo pode ser `private`?',
    },
    {
      id: 'junior-t1-e06-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `class Estoque {
    int quantidade = 5;
    protected int reservado = 2;
    private int perdido = 1;

    int disponivel() {
        return quantidade - reservado - perdido;
    }
}

public class Deposito {
    public static void main(String[] args) {
        Estoque e = new Estoque();
        e.quantidade += 3;
        e.reservado++;
        System.out.println(e.disponivel());
    }
}`,
      opcoes: ['`4`', '`5`', '`6`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No mesmo pacote, acesso de pacote e `protected` são livres. `perdido` é `private`, mas só `disponivel`, da própria classe, o lê: 8 - 3 - 1 = 4.',
      dica: 'Todos os acessos estão no mesmo pacote, e o `private` é lido pelo método da própria classe.',
    },
    {
      id: 'junior-t1-e06-q09',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'A classe `B`, em outro pacote, estende `A`, que declara `protected int x`. Dentro de um método de instância de `B`, quais acessos compilam? Escolha três.',
      opcoes: [
        '`x`',
        '`this.x`',
        '`new B().x`',
        '`new A().x`',
        '`((A) this).x`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O que vale é o tipo da referência: `B` ou uma subclasse dela. `new A().x` e `((A) this).x` usam referências do tipo `A`, e o cast muda o tipo da expressão, mesmo apontando para o próprio objeto.',
      dica: 'O acesso pela herança vale para `this` e para referências do próprio tipo da subclasse.',
    },
    {
      id: 'junior-t1-e06-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `public class Preco {
    default double valor = 9.9;

    public static void main(String[] args) {
        System.out.println(new Preco().valor);
    }
}`,
      opcoes: ['Não compila', 'Imprime `9.9`', 'Imprime `0.0`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'O acesso de pacote não tem palavra: basta não escrever modificador. `default` é usado em métodos de interface e no `switch`, não em campos.',
      dica: '`default` é modificador de acesso?',
    },
    {
      id: 'junior-t1-e06-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como se declara um membro visível só para as classes do mesmo pacote?',
      opcoes: [
        'Sem nenhum modificador de acesso',
        'Com `protected`',
        'Com `default`',
        'Com `package`',
      ],
      resposta: 0,
      explicacao: 'A ausência de modificador é o acesso de pacote. `protected` também abre para subclasses de outros pacotes.',
      dica: 'O acesso de pacote não tem palavra própria.',
    },
    {
      id: 'junior-t1-e06-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `public class Externa {
    private int a = 1;

    static class Aninhada {
        private int b = 2;
    }

    public static void main(String[] args) {
        Externa e = new Externa();
        Aninhada n = new Aninhada();
        System.out.println(e.a + n.b);
    }
}`,
      opcoes: ['`3`', 'Não compila: `b` é `private` de `Aninhada`', '`12`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O limite do `private` é a classe de topo inteira, incluindo as classes aninhadas: elas formam um ninho, e cada uma enxerga os membros `private` das outras.',
      dica: 'A classe aninhada faz parte da externa, e as duas se enxergam por inteiro.',
    },
    {
      id: 'junior-t1-e06-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A classe `Motor` não tem modificador de acesso e declara um método `public void ligar()`. Uma classe de outro pacote pode chamar `ligar()`?',
      opcoes: [
        'Não, porque ela nem enxerga a classe `Motor`',
        'Sim, porque o método é `public`',
        'Sim, desde que importe `Motor`',
        'Só se for subclasse de `Motor`',
      ],
      resposta: 0,
      explicacao: 'Para usar um membro, é preciso enxergar a classe dele primeiro. Uma classe com acesso de pacote é invisível fora do pacote, e nem o `import` funciona.',
      dica: 'Para usar um membro, é preciso enxergar a classe primeiro.',
    },
    {
      id: 'junior-t1-e06-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma aplicação foi compilada contra a versão 1 de uma biblioteca, em que um campo era `public`. Na versão 2, ele virou `private`. O que acontece ao rodar a aplicação, sem recompilar, com a versão 2?',
      opcoes: [
        'Lança `IllegalAccessError` quando o código tenta acessar o campo',
        'Funciona normalmente, porque o acesso só é conferido na compilação',
        'A JVM recompila a aplicação automaticamente',
        'O campo é lido com o valor padrão',
      ],
      resposta: 0,
      explicacao: 'A JVM confere o acesso de novo ao ligar as classes. Por isso, reduzir a visibilidade de algo público é uma mudança incompatível para quem já usa a biblioteca.',
      dica: 'A JVM confere o acesso de novo quando liga as classes.',
    },
    {
      id: 'junior-t1-e06-q15',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos **não** compilam? Escolha dois.',
      opcoes: [
        '`class A { private private int x; }`',
        '`class B { public private int y; }`',
        '`class C { protected static int z; }`',
        '`class D { private final int w = 1; }`',
        '`class E { public static final int V = 2; }`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'opcoesNaoCompilam' },
      explicacao: 'Um membro tem no máximo um modificador de acesso, e repetir um modificador também é erro. Combinar o acesso com `static` e `final` é normal.',
      dica: 'Um membro só pode ter um modificador de acesso, e nunca repetido.',
    },
  ],
};

export default episodio;
