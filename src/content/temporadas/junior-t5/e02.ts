import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t5-e02',
  minutos: 13,
  aula,
  armadilhas: [
    'O construtor compacto não tem parênteses nem parâmetros: `Ponto { ... }`.',
    'No compacto, `this.campo = ...` não compila; os campos são atribuídos automaticamente no fim.',
    'Reatribuir o parâmetro no compacto muda o valor que será guardado.',
    'O canônico por extenso precisa ter os mesmos nomes e tipos dos componentes e atribuir todos os campos.',
    'Um record tem um único construtor canônico: compacto ou por extenso, nunca os dois.',
    'Construtores não canônicos precisam começar com `this(...)`.',
    'Acessores sobrescritos precisam ser `public`, com o mesmo retorno e sem `throws`.',
    '`equals`, `hashCode` e `toString` gerados leem os campos, não os acessores sobrescritos.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Records, Using the Compact Constructor',
      url: 'https://dev.java/learn/language/oop/records/#using-the-compact-constructor',
      tipo: 'documentacao',
      porque: 'O construtor compacto, o canônico e os outros construtores, com exemplos de validação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.10.4: Record Constructor Declarations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.10.4',
      tipo: 'documentacao',
      porque: 'As regras de nomes, tipos e `throws` do construtor canônico.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.10.4.2: Compact Canonical Constructors',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.10.4.2',
      tipo: 'documentacao',
      porque: 'Onde está escrito que os campos são atribuídos no fim e que `this.campo` é proibido.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Oracle: Record Classes (Java Language Updates)',
      url: 'https://docs.oracle.com/en/java/javase/21/language/records.html',
      tipo: 'documentacao',
      porque: 'Os exemplos oficiais de validação e de construtores alternativos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Custom Constructor in Java Records',
      url: 'https://www.baeldung.com/java-records-custom-constructor',
      tipo: 'artigo',
      porque: 'As três formas de construtor de um record, lado a lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javanauta: Como criar DTO usando Record. O que é Java Record?',
      url: 'https://www.youtube.com/watch?v=NoNwe93VmMg',
      tipo: 'video',
      porque: 'Records com validação no construtor, num contexto de API, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Otavio Santana: Java Records Advanced Tips, Compact Constructors',
      url: 'https://www.youtube.com/watch?v=i0p1B7L3FW8',
      tipo: 'video',
      porque: 'Construtores compactos e acessores sobrescritos, com dicas de quem participa da especificação Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Coding with John: Records In Java, Full Tutorial',
      url: 'https://www.youtube.com/watch?v=gJ9DYC-jswo',
      tipo: 'video',
      porque: 'A parte final mostra o construtor compacto e a validação de componentes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras dos construtores compactos e canônicos, com as pegadinhas de `this.campo`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Encapsulating Data with Records", partes "Declaring Constructors" e "Customizing Records"',
    },
  ],
  desafio: {
    titulo: 'Produto validado',
    enunciado:
      'Crie o record `Produto(String sku, String nome, int precoCentavos, List<String> tags)`. O construtor compacto rejeita SKU fora do formato `AAA-000` (7 caracteres, com hífen na quarta posição), rejeita preço negativo, tira os espaços das pontas do nome e copia as tags. Acrescente um construtor sem tags, um método `comDesconto(int pct)` e um `preco()` que formata como `R$ 34,90`. Rode com:\n\n```java\nProduto p = new Produto("CAF-001", "  Café especial ", 3490, List.of("bebida"));\nProduto q = p.comDesconto(10);\nSystem.out.println(p.nome() + " " + p.preco() + " -> " + q.preco());\nSystem.out.println(new Produto("XIC-002", "Xícara", 2500));\nfor (String sku : List.of("cafe", "PAO-003")) {\n    try {\n        new Produto(sku, "Pão", -1);\n    } catch (IllegalArgumentException e) {\n        System.out.println(e.getMessage());\n    }\n}\n```\n\nSaída esperada:\n\n```text\nCafé especial R$ 34,90 -> R$ 31,41\nProduto[sku=XIC-002, nome=Xícara, precoCentavos=2500, tags=[]]\nSKU inválido: cafe\npreço negativo\n```',
    dicas: [
      'No compacto, reatribua os parâmetros: `nome = nome.strip();` e `tags = List.copyOf(tags);`.',
      'O construtor sem tags é `Produto(String sku, String nome, int precoCentavos) { this(sku, nome, precoCentavos, List.of()); }`.',
      '`comDesconto` devolve um produto novo, que passa pela mesma validação.',
    ],
    solucao: `import java.util.List;

record Produto(String sku, String nome, int precoCentavos, List<String> tags) {
    Produto {
        if (sku == null || sku.length() != 7 || sku.charAt(3) != '-') {
            throw new IllegalArgumentException("SKU inválido: " + sku);
        }
        if (precoCentavos < 0) {
            throw new IllegalArgumentException("preço negativo");
        }
        nome = nome.strip();
        tags = List.copyOf(tags);
    }

    Produto(String sku, String nome, int precoCentavos) {
        this(sku, nome, precoCentavos, List.of());
    }

    Produto comDesconto(int pct) {
        return new Produto(sku, nome, precoCentavos * (100 - pct) / 100, tags);
    }

    String preco() {
        return String.format("R$ %d,%02d", precoCentavos / 100, precoCentavos % 100);
    }
}

public class Loja {
    public static void main(String[] args) {
        Produto p = new Produto("CAF-001", "  Café especial ", 3490, List.of("bebida"));
        Produto q = p.comDesconto(10);
        System.out.println(p.nome() + " " + p.preco() + " -> " + q.preco());
        System.out.println(new Produto("XIC-002", "Xícara", 2500));
        for (String sku : List.of("cafe", "PAO-003")) {
            try {
                new Produto(sku, "Pão", -1);
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}`,
    saida: 'Café especial R$ 34,90 -> R$ 31,41\nProduto[sku=XIC-002, nome=Xícara, precoCentavos=2500, tags=[]]\nSKU inválido: cafe\npreço negativo',
    comentarios:
      'Todos os caminhos de criação, inclusive o construtor sem tags e o `comDesconto`, passam pelo construtor compacto: não existe produto inválido nem com nome sujo. A lista de tags é copiada e imutável, então o record fica realmente imutável. 3490 com 10% de desconto dá 3141 centavos, com a divisão inteira descartando a fração.',
  },
  exercicios: [
    {
      id: 'junior-t5-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como se declara o construtor compacto de `record Ponto(int x, int y)`?',
      opcoes: [
        '`Ponto { ... }`, sem parênteses',
        '`Ponto() { ... }`, sem parâmetros',
        '`compact Ponto(int x, int y) { ... }`',
        '`static Ponto { ... }`',
      ],
      resposta: 0,
      explicacao: 'O compacto não repete a lista de parâmetros: ela já está no cabeçalho do record. `Ponto() { }` seria um construtor sem parâmetros, não canônico.',
    },
    {
      id: 'junior-t5-e02-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `record Nome(String valor) {
    Nome {
        valor = valor.strip().toUpperCase();
    }
}

Nome n = new Nome("  ana ");
System.out.println("[" + n.valor() + "] " + n);`,
      resposta: '[ANA] Nome[valor=ANA]',
      explicacao: 'O compacto reatribui o parâmetro, e é esse valor normalizado que vai para o campo no fim. O `toString` mostra o campo.',
    },
    {
      id: 'junior-t5-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `record Ponto(int x, int y) {
    Ponto {
        if (x < 0) this.x = 0;
    }
}`,
      opcoes: [
        'Não compila: o compacto não pode atribuir `this.x`',
        'Compila, e pontos com `x` negativo ficam com `x = 0`',
        'Não compila: o compacto não pode ter `if`',
        'Compila, mas a atribuição é ignorada',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'No compacto, o certo é reatribuir o parâmetro: `if (x < 0) x = 0;`. O campo é `final` e será atribuído automaticamente depois.',
    },
    {
      id: 'junior-t5-e02-q04',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais records compilam? Escolha três.',
      opcoes: [
        '`record A(int x) { A { if (x < 0) throw new IllegalArgumentException(); } }`',
        '`record B(int x) { B(int x) { this.x = Math.abs(x); } }`',
        '`record C(int x, int y) { C(int x) { this(x, 0); } }`',
        '`record D(int x) { D(int y) { this.x = y; } }`',
        '`record E(int x) { int x() { return x; } }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Compacto com validação, canônico por extenso e construtor alternativo que delega são válidos. O canônico precisa usar os nomes dos componentes (`D` usou `y`), e acessores precisam ser `public`.',
    },
    {
      id: 'junior-t5-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `record Idade(int anos) {
    Idade {
        if (anos < 0 || anos > 150) {
            throw new IllegalArgumentException("idade fora da faixa: " + anos);
        }
    }
}

Idade a = new Idade(30);
Idade b = new Idade(200);
System.out.println(a.anos() + b.anos());`,
      opcoes: ['Lança `IllegalArgumentException`', 'Imprime `230`', 'Imprime `30`', 'Não compila'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException' },
      explicacao: 'O construtor compacto roda em todo `new`. Com 200, ele lança a exceção, e o record inválido nunca chega a existir.',
    },
    {
      id: 'junior-t5-e02-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete o construtor compacto. O programa deve imprimir `[arroz]`.',
      codigo: `import java.util.ArrayList;
import java.util.List;

record Lista(List<String> itens) {
    ___ {
        itens = List.copyOf(itens);
    }
}

public class Compras {
    public static void main(String[] args) {
        List<String> base = new ArrayList<>(List.of("arroz"));
        Lista l = new Lista(base);
        base.add("feijão");
        System.out.println(l.itens());
    }
}`,
      respostas: ['Lista'],
      saida: '[arroz]',
      explicacao: 'O compacto usa só o nome do record. A cópia feita nele isola o record das mudanças na lista original.',
    },
    {
      id: 'junior-t5-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `record Retangulo(double largura, double altura) {
    Retangulo(double lado) {
        this.largura = lado;
        this.altura = lado;
    }

    double area() {
        return largura * altura;
    }
}`,
      resposta: 2,
      explicacao: 'Um construtor que não é o canônico precisa delegar com `this(...)` antes de qualquer coisa. O certo seria `Retangulo(double lado) { this(lado, lado); }`.',
    },
    {
      id: 'junior-t5-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `record Fracao(int num, int den) {
    Fracao {
        if (den < 0) {
            num = -num;
            den = -den;
        }
    }

    @Override
    public String toString() {
        return num + "/" + den;
    }
}

System.out.println(new Fracao(3, -4) + " " + new Fracao(-1, 2).equals(new Fracao(1, -2)));`,
      opcoes: ['`-3/4 true`', '`3/-4 false`', '`-3/4 false`', '`3/-4 true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O compacto normaliza o sinal para o numerador. Depois disso, (1, -2) vira (-1, 2), e os dois records têm os mesmos campos.',
    },
    {
      id: 'junior-t5-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `record Usuario(String login) {
    String login() {
        return login.toLowerCase();
    }
}`,
      opcoes: ['Não compila: o acessor precisa ser `public`', 'Compila', 'Não compila: acessores não podem ser sobrescritos', 'Compila, mas o acessor original continua sendo usado'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao: 'Um acessor declarado explicitamente substitui o gerado, que é `public`, e precisa manter esse acesso.',
    },
    {
      id: 'junior-t5-e02-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `record Pixel(int x, int y, String cor) {
    Pixel(int x, int y) {
        this(x, y, "preto");
    }
}

System.out.println(new Pixel(1, 2) + " " + new Pixel(3, 4, "azul").cor());`,
      resposta: 'Pixel[x=1, y=2, cor=preto] azul',
      explicacao: 'O construtor de dois parâmetros delega para o canônico, completando a cor com um valor padrão.',
    },
    {
      id: 'junior-t5-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No construtor compacto, quando os campos recebem os seus valores?',
      opcoes: [
        'No fim do construtor, automaticamente, com os valores que os parâmetros tiverem nesse momento',
        'Antes da primeira linha do construtor',
        'Só se o código atribuir `this.campo`',
        'Quando o acessor é chamado pela primeira vez',
      ],
      resposta: 0,
      explicacao: 'O compilador acrescenta uma atribuição por componente depois do corpo. Por isso o corpo pode validar e normalizar os parâmetros antes.',
    },
    {
      id: 'junior-t5-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `record Texto(String valor) {
    @Override
    public String valor() {
        return valor.toUpperCase();
    }
}

Texto a = new Texto("java");
Texto b = new Texto("JAVA");
System.out.println(a.valor() + " " + a.equals(b) + " " + a);`,
      opcoes: [
        '`JAVA false Texto[valor=java]`',
        '`JAVA true Texto[valor=JAVA]`',
        '`JAVA true Texto[valor=java]`',
        '`java false Texto[valor=java]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O acessor sobrescrito muda só o que ele devolve. O `equals` e o `toString` gerados leem os campos, que guardam "java" e "JAVA".',
    },
    {
      id: 'junior-t5-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o construtor compacto são verdadeiras? Escolha duas.',
      opcoes: [
        'Ele não declara parâmetros entre parênteses',
        'Ele pode reatribuir os parâmetros antes da atribuição automática dos campos',
        'Ele precisa atribuir cada campo com `this.campo`',
        'Ele pode declarar `throws IOException`',
        'Ele cria um segundo construtor, sem parâmetros',
      ],
      respostas: [0, 1],
      explicacao: 'O compacto é o próprio construtor canônico, com os parâmetros implícitos. Construtores canônicos não podem ter `throws`.',
    },
    {
      id: 'junior-t5-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `record Credencial(String usuario, String senha) {
    @Override
    public String toString() {
        return "Credencial[usuario=" + usuario + ", senha=***]";
    }
}

Credencial c = new Credencial("ana", "s3gr3do");
System.out.println(c + " " + c.senha().length());`,
      opcoes: [
        '`Credencial[usuario=ana, senha=***] 7`',
        '`Credencial[usuario=ana, senha=s3gr3do] 7`',
        '`Credencial[usuario=ana, senha=***] 3`',
        'Não compila: records não podem sobrescrever `toString`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `toString` sobrescrito esconde a senha nos logs, mas o acessor continua devolvendo o valor real, de 7 caracteres.',
    },
    {
      id: 'junior-t5-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como o `javac` compila um construtor compacto?',
      opcoes: [
        'Como o construtor canônico comum, com uma atribuição `this.campo = campo` acrescentada depois do corpo para cada componente',
        'Como um bloco `static` executado antes do construtor',
        'Como um método separado chamado depois do construtor',
        'Ele não gera bytecode: a JVM interpreta o corpo na hora',
      ],
      resposta: 0,
      explicacao: 'O compacto é uma forma curta de escrever o canônico. As atribuições geradas no fim usam os valores finais dos parâmetros.',
    },
  ],
};

export default episodio;
