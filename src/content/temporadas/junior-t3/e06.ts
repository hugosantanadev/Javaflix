import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t3-e06',
  minutos: 15,
  aula,
  armadilhas: [
    'O `equals` herdado de `Object` compara identidade, como `==`.',
    'A assinatura correta é `public boolean equals(Object o)`; com outro tipo de parâmetro, é uma sobrecarga que as coleções ignoram.',
    '`equals` e `hashCode` sobrescritos precisam ser `public`.',
    'Objetos iguais pelo `equals` precisam ter o mesmo `hashCode`.',
    'Objetos diferentes podem ter o mesmo `hashCode`: colisões são permitidas.',
    'Sobrescrever só o `equals` faz o `HashSet` aceitar duplicatas e o `contains` falhar.',
    'Um `equals` com `instanceof` entre superclasse e subclasse pode quebrar a simetria.',
    'O `hashCode` padrão não é o endereço de memória do objeto.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Object as a Superclass',
      url: 'https://dev.java/learn/language/oop/inheritance/objects/',
      tipo: 'documentacao',
      porque: '`toString`, `equals`, `hashCode` e os outros métodos herdados de `Object`, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Object.equals',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)',
      tipo: 'documentacao',
      porque: 'O contrato oficial: reflexivo, simétrico, transitivo, consistente e `false` para `null`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Object.hashCode',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#hashCode()',
      tipo: 'documentacao',
      porque: 'A regra que liga `hashCode` ao `equals`, e o que não é exigido.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de Objects.hash',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Objects.html#hash(java.lang.Object...)',
      tipo: 'documentacao',
      porque: 'O atalho para calcular o `hashCode` a partir de vários campos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java equals() and hashCode() Contracts',
      url: 'https://www.baeldung.com/java-equals-hashcode-contracts',
      tipo: 'artigo',
      porque: 'Os contratos com exemplos de como quebrá-los, inclusive com herança.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to hashCode() in Java',
      url: 'https://www.baeldung.com/java-hashcode',
      tipo: 'artigo',
      porque: 'Como as coleções usam o `hashCode` e como escrever um bom.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 43, Classe Object',
      url: 'https://www.youtube.com/watch?v=dAGvL88bO9o',
      tipo: 'video',
      porque: 'Os métodos herdados de `Object` e quando sobrescrevê-los, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Matheus Leandro Ferreira: Como usar Equals e Hashcode em Java',
      url: 'https://www.youtube.com/watch?v=dlk1gQIp8qg',
      tipo: 'video',
      porque: 'O par `equals` e `hashCode` aplicado a coleções, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Orientação Objetos, Sobrescrita do método toString',
      url: 'https://www.youtube.com/watch?v=62qcGF6IVfc',
      tipo: 'video',
      porque: 'O `toString` sobrescrito e onde ele é chamado automaticamente, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Os três capítulos de referência, com a receita do `hashCode` e o problema da simetria com herança.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 3, "Methods Common to All Objects": Itens 10, 11 e 12',
    },
  ],
  desafio: {
    titulo: 'Agenda sem duplicatas',
    enunciado:
      'Crie a classe imutável `Contato`, com nome e telefone, em que o telefone é guardado só com os dígitos (`replaceAll("[^0-9]", "")`). Dois contatos são iguais quando têm o mesmo telefone, mesmo com nomes diferentes. Sobrescreva `equals`, `hashCode` e `toString`, e use um `LinkedHashSet`, que mantém a ordem de inserção. Rode com:\n\n```java\nSet<Contato> agenda = new LinkedHashSet<>();\nagenda.add(new Contato("Ana", "(81) 99999-1111"));\nagenda.add(new Contato("Bia", "81 98888-2222"));\nagenda.add(new Contato("Ana Souza", "81999991111"));\nSystem.out.println(agenda.size());\nSystem.out.println(agenda);\nSystem.out.println(agenda.contains(new Contato("?", "81-98888-2222")));\n```\n\nSaída esperada:\n\n```text\n2\n[Ana <81999991111>, Bia <81988882222>]\ntrue\n```',
    dicas: [
      'Normalize o telefone no construtor: assim `equals` e `hashCode` trabalham sempre com o mesmo formato.',
      'O `hashCode` pode ser o da própria `String` do telefone, o único campo usado no `equals`.',
      'O terceiro contato tem o mesmo telefone do primeiro e não entra no conjunto.',
    ],
    solucao: `import java.util.LinkedHashSet;
import java.util.Set;

final class Contato {
    private final String nome;
    private final String telefone;

    Contato(String nome, String telefone) {
        this.nome = nome;
        this.telefone = telefone.replaceAll("[^0-9]", "");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Contato)) return false;
        return telefone.equals(((Contato) o).telefone);
    }

    @Override
    public int hashCode() {
        return telefone.hashCode();
    }

    @Override
    public String toString() {
        return nome + " <" + telefone + ">";
    }
}

public class Agenda {
    public static void main(String[] args) {
        Set<Contato> agenda = new LinkedHashSet<>();
        agenda.add(new Contato("Ana", "(81) 99999-1111"));
        agenda.add(new Contato("Bia", "81 98888-2222"));
        agenda.add(new Contato("Ana Souza", "81999991111"));
        System.out.println(agenda.size());
        System.out.println(agenda);
        System.out.println(agenda.contains(new Contato("?", "81-98888-2222")));
    }
}`,
    saida: '2\n[Ana <81999991111>, Bia <81988882222>]\ntrue',
    comentarios:
      'O conjunto mantém o primeiro contato e ignora o terceiro, igual pelo telefone. Como a classe é imutável, o `hashCode` de um contato nunca muda depois que ele entra no conjunto. Se o telefone pudesse ser alterado, o contato "sumiria" do `HashSet`, porque estaria guardado no balde do `hashCode` antigo.',
  },
  exercicios: [
    {
      id: 'junior-t3-e06-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o `equals` herdado de `Object` compara?',
      opcoes: [
        'Se as duas referências apontam para o mesmo objeto',
        'Se todos os campos são iguais',
        'Se os dois objetos têm o mesmo `toString`',
        'Se os dois objetos são da mesma classe',
      ],
      resposta: 0,
      explicacao: 'Sem sobrescrita, `equals` faz o mesmo que `==`. Cada classe decide o que "igual" significa para ela ao sobrescrevê-lo.',
    },
    {
      id: 'junior-t3-e06-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `class Carta {
    String valor, naipe;
    Carta(String valor, String naipe) { this.valor = valor; this.naipe = naipe; }
    @Override public String toString() { return valor + " de " + naipe; }
}

Carta c = new Carta("Ás", "copas");
System.out.println("Tirei " + c);
System.out.println(String.valueOf((Object) null) + " " + c.toString().length());`,
      resposta: 'Tirei Ás de copas\nnull 11',
      explicacao: 'A concatenação chama o `toString` sobrescrito. `String.valueOf` com `null` devolve o texto "null", sem exceção. "Ás de copas" tem 11 caracteres.',
    },
    {
      id: 'junior-t3-e06-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Ponto {
    int x;
    Ponto(int x) { this.x = x; }
    public boolean equals(Ponto p) { return p != null && x == p.x; }
}

Ponto a = new Ponto(1);
Ponto b = new Ponto(1);
Object o = b;
System.out.println(a.equals(b) + " " + a.equals(o) + " " + o.equals(a));`,
      opcoes: ['`true false false`', '`true true true`', '`true true false`', '`false false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`equals(Ponto)` é uma sobrecarga. Só é escolhida quando o argumento é declarado `Ponto`. Com um `Object`, ou chamada por uma referência `Object`, vale o `equals(Object)` herdado, que compara identidade.',
    },
    {
      id: 'junior-t3-e06-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `class Moeda {
    String codigo;

    @Override
    public boolean equals(Moeda outra) {
        return codigo.equals(outra.codigo);
    }
}`,
      opcoes: [
        'Não compila: o método não sobrescreve `equals(Object)`',
        'Compila',
        'Compila, mas o `@Override` é ignorado',
        'Não compila: falta o `hashCode`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila' },
      explicacao: 'Com parâmetro `Moeda`, o método é uma sobrecarga, e o `@Override` acusa o erro. É exatamente o bug que a anotação existe para pegar.',
    },
    {
      id: 'junior-t3-e06-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais propriedades fazem parte do contrato do `equals`? Escolha três.',
      opcoes: [
        '`x.equals(x)` é sempre `true`',
        'Se `x.equals(y)`, então `y.equals(x)`',
        '`x.equals(null)` é `false`',
        'Objetos iguais têm o mesmo `toString`',
        'Objetos com o mesmo `hashCode` são iguais',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Reflexividade, simetria e o tratamento de `null` estão no contrato, junto com transitividade e consistência. O `toString` não tem relação, e `hashCode` igual não implica igualdade.',
    },
    {
      id: 'junior-t3-e06-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete o tipo de retorno do `hashCode`. O programa deve imprimir `true`.',
      codigo: `import java.util.Objects;

class Placa {
    private final String valor;

    Placa(String valor) {
        this.valor = valor;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Placa && ((Placa) o).valor.equals(valor);
    }

    @Override
    public ___ hashCode() {
        return Objects.hash(valor);
    }
}

public class Detran {
    public static void main(String[] args) {
        System.out.println(new Placa("ABC1D23").hashCode() == new Placa("ABC1D23").hashCode());
    }
}`,
      respostas: ['int'],
      saida: 'true',
      explicacao: 'A assinatura é `public int hashCode()`. Como `equals` e `hashCode` usam o mesmo campo, placas iguais têm o mesmo `hashCode`.',
    },
    {
      id: 'junior-t3-e06-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `class Livro {
    String isbn;

    @Override
    boolean equals(Object o) {
        return o instanceof Livro && ((Livro) o).isbn.equals(isbn);
    }
}`,
      resposta: 5,
      explicacao: 'O `equals` de `Object` é `public`, e a sobrescrita não pode fechar o acesso. Falta o `public` na declaração.',
    },
    {
      id: 'junior-t3-e06-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Cor {
    String nome;
    Cor(String nome) { this.nome = nome; }
    @Override public boolean equals(Object o) {
        return o instanceof Cor && ((Cor) o).nome.equals(nome);
    }
}

Set<Cor> cores = new HashSet<>();
cores.add(new Cor("azul"));
cores.add(new Cor("azul"));
System.out.println(cores.size() + " " + new Cor("azul").equals(new Cor("azul")));`,
      opcoes: ['`2 true`', '`1 true`', '`2 false`', '`1 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `equals` diz que as cores são iguais, mas o `hashCode` herdado é diferente para cada objeto. O `HashSet` procura pelo `hashCode` primeiro e nunca chega a comparar as duas: aceita a duplicata.',
    },
    {
      id: 'junior-t3-e06-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `final class Ponto {
    final int x, y;
    Ponto(int x, int y) { this.x = x; this.y = y; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Ponto)) return false;
        Ponto p = (Ponto) o;
        return x == p.x && y == p.y;
    }
    @Override public int hashCode() { return Objects.hash(x, y); }
}

Set<Ponto> pontos = new HashSet<>(List.of(new Ponto(1, 2), new Ponto(3, 4)));
pontos.add(new Ponto(1, 2));
System.out.println(pontos.size() + " " + pontos.contains(new Ponto(3, 4)));`,
      resposta: '2 true',
      explicacao: 'Com `equals` e `hashCode` coerentes, o segundo (1, 2) é reconhecido como duplicata, e um (3, 4) novo é encontrado pelo `contains`.',
    },
    {
      id: 'junior-t3-e06-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String a = null;
String b = null;
String c = "x";
System.out.println(Objects.equals(a, b) + " " + Objects.equals(a, c) + " " + Objects.equals(c, "x"));`,
      opcoes: ['`true false true`', 'Lança `NullPointerException`', '`false false true`', '`true true true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Objects.equals` trata `null` dos dois lados: dois nulos são iguais, um nulo e um não nulo não são, e nos outros casos chama o `equals` normal.',
    },
    {
      id: 'junior-t3-e06-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Se `a.equals(b)` é `true`, o que o contrato exige?',
      opcoes: [
        '`a.hashCode() == b.hashCode()`',
        '`a == b`',
        '`a.toString().equals(b.toString())`',
        'Nada sobre `hashCode`',
      ],
      resposta: 0,
      explicacao: 'Objetos iguais precisam cair no mesmo balde das coleções de hash. Por isso quem sobrescreve `equals` precisa sobrescrever `hashCode`.',
    },
    {
      id: 'junior-t3-e06-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `class Ponto {
    int x;
    Ponto(int x) { this.x = x; }
    @Override public boolean equals(Object o) {
        return o instanceof Ponto && ((Ponto) o).x == x;
    }
}

class PontoColorido extends Ponto {
    String cor;
    PontoColorido(int x, String cor) { super(x); this.cor = cor; }
    @Override public boolean equals(Object o) {
        return o instanceof PontoColorido && super.equals(o) && ((PontoColorido) o).cor.equals(cor);
    }
}

Ponto p = new Ponto(1);
PontoColorido pc = new PontoColorido(1, "azul");
System.out.println(p.equals(pc) + " " + pc.equals(p));`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Para `Ponto`, um ponto colorido é um ponto com o mesmo `x`: `true`. Para `PontoColorido`, um ponto comum nem é colorido: `false`. A simetria foi quebrada, um problema clássico de `equals` com herança.',
    },
    {
      id: 'junior-t3-e06-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `hashCode` são verdadeiras? Escolha duas.',
      opcoes: [
        'Objetos iguais pelo `equals` precisam ter o mesmo `hashCode`',
        'Objetos diferentes podem ter o mesmo `hashCode`',
        'O `hashCode` padrão é o endereço de memória do objeto',
        'Objetos com o mesmo `hashCode` são iguais pelo `equals`',
        'O `hashCode` de um objeto pode mudar a cada chamada, mesmo sem alterações',
      ],
      respostas: [0, 1],
      explicacao: 'Colisões são permitidas e inevitáveis: há mais objetos possíveis que valores de `int`. O padrão é um número guardado no cabeçalho, e o contrato exige consistência enquanto o objeto não mudar.',
    },
    {
      id: 'junior-t3-e06-q14',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println("Aa".hashCode() + " " + "BB".hashCode() + " " + "Aa".equals("BB"));`,
      resposta: '2112 2112 false',
      explicacao: '"Aa" dá 65 × 31 + 97 = 2112, e "BB" dá 66 × 31 + 66 = 2112. É uma colisão: mesmo `hashCode`, objetos diferentes. O contrato permite.',
    },
    {
      id: 'junior-t3-e06-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O `hashCode` herdado de `Object`, na HotSpot, é o endereço de memória do objeto?',
      opcoes: [
        'Não: é um número gerado na primeira chamada e guardado no cabeçalho, porque os objetos mudam de lugar na coleta',
        'Sim, convertido para `int`',
        'Sim, mas só enquanto o objeto não for movido',
        'Não: é sempre zero até alguém sobrescrevê-lo',
      ],
      resposta: 0,
      explicacao: 'O coletor move objetos o tempo todo, e o `hashCode` precisa ficar fixo. A HotSpot sorteia o número com um gerador por thread e o guarda na palavra de marcação do cabeçalho.',
    },
  ],
};

export default episodio;
