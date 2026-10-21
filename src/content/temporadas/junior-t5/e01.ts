import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t5-e01',
  minutos: 13,
  aula,
  armadilhas: [
    'Os acessores de um record têm o nome do componente: `nome()`, não `getNome()`.',
    'Os campos gerados são `private final`: nenhum método pode reatribuí-los.',
    'Records não podem declarar campos de instância além dos componentes; campos `static` são permitidos.',
    'Todo record estende `java.lang.Record` e é `final`: não estende outra classe e não pode ser estendido.',
    'Records podem implementar interfaces e ter métodos de instância e `static`.',
    'O `toString` gerado tem o formato `Ponto[x=1, y=2]`.',
    'O `equals` compara todos os componentes, mas arrays são comparados por referência.',
    'A imutabilidade é rasa: uma lista recebida continua podendo ser alterada por fora.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Using Records to Model Immutable Data',
      url: 'https://dev.java/learn/language/oop/records/',
      tipo: 'documentacao',
      porque: 'O que um record gera, o que ele não aceita e como usá-lo de verdade, no tutorial oficial.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Record Classes (Java Language Updates)',
      url: 'https://docs.oracle.com/en/java/javase/21/language/records.html',
      tipo: 'documentacao',
      porque: 'O guia oficial do recurso, com as restrições numeradas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 395: Records',
      url: 'https://openjdk.org/jeps/395',
      tipo: 'documentacao',
      porque: 'A motivação do recurso: por que um record é um "portador transparente de dados".',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 8.10: Record Classes',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.10',
      tipo: 'documentacao',
      porque: 'As regras formais de componentes, acessores e membros proibidos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.lang.Record',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html',
      tipo: 'documentacao',
      porque: 'O contrato de `equals`, `hashCode` e `toString` que todo record cumpre.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Record Keyword',
      url: 'https://www.baeldung.com/java-record-keyword',
      tipo: 'artigo',
      porque: 'De uma classe imutável tradicional a um record, com cada membro gerado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Michelli Brito: Crie DTO usando Record em Java',
      url: 'https://www.youtube.com/watch?v=lmzpyCNyziI',
      tipo: 'video',
      porque: 'Records como objetos de transferência de dados numa aplicação real, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'A Arte de Programar: Java Records explicados, guia prático com exemplos e limitações',
      url: 'https://www.youtube.com/watch?v=xqqjwVeVSKw',
      tipo: 'video',
      porque: 'O que records fazem e o que eles não podem fazer, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Giuliana Bezerra: Qual o melhor, Lombok ou Records?',
      url: 'https://www.youtube.com/watch?v=95TFOpIIz_I',
      tipo: 'video',
      porque: 'Records comparados à biblioteca que os projetos usavam antes deles, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Coding with John: Records In Java, Full Tutorial',
      url: 'https://www.youtube.com/watch?v=gJ9DYC-jswo',
      tipo: 'video',
      porque: 'Um tutorial completo, do primeiro record ao construtor compacto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'O que o compilador gera e as regras de records, no formato das questões.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 7, "Beyond Classes": seção "Encapsulating Data with Records", partes "Applying Records" e "Understanding Record Immutability"',
    },
  ],
  desafio: {
    titulo: 'Extrato com records',
    enunciado:
      'Crie o record `Transacao(String descricao, double valor)`, com o método `credito()` (valor positivo), e o record `Resumo(double creditos, double debitos)`, com o método `saldo()`. Escreva `static Resumo resumir(List<Transacao> transacoes)`. Rode com:\n\n```java\nList<Transacao> mes = List.of(\n    new Transacao("salário", 3000),\n    new Transacao("aluguel", -1200),\n    new Transacao("mercado", -450.5),\n    new Transacao("freela", 800)\n);\nResumo r = resumir(mes);\nSystem.out.println(r);\nSystem.out.println("Saldo: " + r.saldo());\nSystem.out.println(mes.get(1));\nSystem.out.println(mes.contains(new Transacao("freela", 800)));\n```\n\nSaída esperada:\n\n```text\nResumo[creditos=3800.0, debitos=-1650.5]\nSaldo: 2149.5\nTransacao[descricao=aluguel, valor=-1200.0]\ntrue\n```',
    dicas: [
      'Os acessores são `t.valor()` e `t.descricao()`.',
      'Devolver um `Resumo` é o jeito limpo de um método devolver dois valores.',
      'O `contains` funciona porque o `equals` do record compara os componentes.',
    ],
    solucao: `import java.util.List;

record Transacao(String descricao, double valor) {
    boolean credito() {
        return valor > 0;
    }
}

record Resumo(double creditos, double debitos) {
    double saldo() {
        return creditos + debitos;
    }
}

public class Extrato {
    static Resumo resumir(List<Transacao> transacoes) {
        double c = 0;
        double d = 0;
        for (Transacao t : transacoes) {
            if (t.credito()) c += t.valor();
            else d += t.valor();
        }
        return new Resumo(c, d);
    }

    public static void main(String[] args) {
        List<Transacao> mes = List.of(
            new Transacao("salário", 3000),
            new Transacao("aluguel", -1200),
            new Transacao("mercado", -450.5),
            new Transacao("freela", 800)
        );
        Resumo r = resumir(mes);
        System.out.println(r);
        System.out.println("Saldo: " + r.saldo());
        System.out.println(mes.get(1));
        System.out.println(mes.contains(new Transacao("freela", 800)));
    }
}`,
    saida: 'Resumo[creditos=3800.0, debitos=-1650.5]\nSaldo: 2149.5\nTransacao[descricao=aluguel, valor=-1200.0]\ntrue',
    comentarios:
      'Dois records de uma linha substituem duas classes completas, com `toString` legível e `equals` correto de graça. `Resumo` mostra um uso muito comum: agrupar vários resultados num único retorno, sem criar uma classe só para isso. Os métodos acrescentados (`credito`, `saldo`) são derivados dos componentes, sem estado extra.',
  },
  exercicios: [
    {
      id: 'junior-t5-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o compilador gera para `record Ponto(int x, int y) { }`?',
      opcoes: [
        'Campos `private final`, construtor canônico, acessores `x()` e `y()`, `equals`, `hashCode` e `toString`',
        'Campos públicos e métodos `getX()` e `setX()`',
        'Só os campos e o construtor',
        'Uma interface com os métodos `x()` e `y()`',
      ],
      resposta: 0,
      explicacao: 'O record é uma classe completa e imutável. Os acessores levam o nome do componente, e não há setters.',
    },
    {
      id: 'junior-t5-e01-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `record Livro(String titulo, int ano) { }

Livro l = new Livro("Dom Casmurro", 1899);
System.out.println(l.titulo().length() + " " + l.ano() + " " + l);`,
      resposta: '12 1899 Livro[titulo=Dom Casmurro, ano=1899]',
      explicacao: '"Dom Casmurro" tem 12 caracteres, contando o espaço. O `toString` gerado mostra o nome do record e cada componente com o seu valor.',
    },
    {
      id: 'junior-t5-e01-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado?',
      codigo: `record Produto(String nome, double preco) { }

Produto p = new Produto("Caneta", 2.5);
System.out.println(p.getNome());`,
      opcoes: ['Não compila', 'Imprime `Caneta`', 'Imprime `null`', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao: 'O acessor gerado é `nome()`. Records não seguem a convenção JavaBeans de `get`, a não ser que você declare o método.',
    },
    {
      id: 'junior-t5-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais records compilam? Escolha três.',
      opcoes: [
        '`record A(int x) { }`',
        '`record B(int x) { static int contador; }`',
        '`record C(String s) implements Comparable<C> { public int compareTo(C o) { return s.compareTo(o.s); } }`',
        '`record D(int x) { int y; }`',
        '`record E(int x) extends Object { }`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao: 'Campos `static` e interfaces são permitidos. Campos de instância extras não, e nenhum record pode ter `extends`, nem mesmo de `Object`.',
    },
    {
      id: 'junior-t5-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `record Cor(int r, int g, int b) { }

Set<Cor> cores = new HashSet<>();
cores.add(new Cor(255, 0, 0));
cores.add(new Cor(255, 0, 0));
cores.add(new Cor(0, 0, 255));
System.out.println(cores.size() + " " + cores.contains(new Cor(0, 0, 255)));`,
      opcoes: ['`2 true`', '`3 true`', '`2 false`', '`3 false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`equals` e `hashCode` gerados usam todos os componentes. Duas cores com os mesmos valores são iguais, e o `HashSet` guarda só uma.',
    },
    {
      id: 'junior-t5-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete a declaração. O programa deve imprimir `12 Ponto[x=3, y=4]`.',
      codigo: `___ Ponto(int x, int y) { }

public class Mapa {
    public static void main(String[] args) {
        Ponto p = new Ponto(3, 4);
        System.out.println(p.x() * p.y() + " " + p);
    }
}`,
      respostas: ['record'],
      saida: '12 Ponto[x=3, y=4]',
      explicacao: 'A palavra `record` com a lista de componentes basta para ter construtor, acessores e o `toString` no formato `Ponto[x=3, y=4]`.',
    },
    {
      id: 'junior-t5-e01-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `record Pedido(int numero, double total) {
    static int criados = 0;
    private String status = "novo";

    double totalComTaxa() {
        return total * 1.1;
    }
}`,
      resposta: 3,
      explicacao: 'O estado de um record é só o que está entre parênteses. Campos `static` são permitidos; campos de instância extras, não. `status` teria de virar um componente.',
    },
    {
      id: 'junior-t5-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `record Carrinho(List<String> itens) { }

List<String> base = new ArrayList<>(List.of("pão"));
Carrinho c = new Carrinho(base);
base.add("leite");
System.out.println(c.itens().size() + " " + c);`,
      opcoes: ['`2 Carrinho[itens=[pão, leite]]`', '`1 Carrinho[itens=[pão]]`', 'Lança `UnsupportedOperationException`', 'Não compila: records só aceitam componentes imutáveis'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O record guarda a referência à mesma lista, sem copiar. O campo é `final`, mas a lista apontada continua mutável: a imutabilidade do record é rasa.',
    },
    {
      id: 'junior-t5-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `record Contador(int valor) {
    Contador incrementar() {
        valor++;
        return this;
    }
}`,
      opcoes: ['Não compila', 'Compila', 'Compila, mas `incrementar` lança exceção', 'Compila, e `incrementar` devolve uma cópia'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'O campo `valor` é `final`. Num record, a forma de "incrementar" é devolver um novo: `return new Contador(valor + 1);`.',
    },
    {
      id: 'junior-t5-e01-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `record Notas(int[] valores) { }

Notas a = new Notas(new int[] {7, 8});
Notas b = new Notas(new int[] {7, 8});
int[] mesmo = {9};
System.out.println(a.equals(b) + " " + new Notas(mesmo).equals(new Notas(mesmo)));`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `equals` do record usa o `equals` de cada componente, e arrays herdam o de `Object`, que compara referências. Dois arrays com o mesmo conteúdo são diferentes; o mesmo array é igual a si mesmo.',
    },
    {
      id: 'junior-t5-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a superclasse de todo record?',
      opcoes: ['`java.lang.Record`', '`java.lang.Object`, diretamente', '`java.io.Serializable`', 'Nenhuma: records não têm superclasse'],
      resposta: 0,
      explicacao: 'Todo record estende `java.lang.Record`, que estende `Object`. Por isso um record não pode declarar `extends`.',
    },
    {
      id: 'junior-t5-e01-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `record Temperatura(double celsius) {
    static Temperatura deFahrenheit(double f) {
        return new Temperatura((f - 32) * 5 / 9);
    }

    double fahrenheit() {
        return celsius * 9 / 5 + 32;
    }
}

Temperatura t = Temperatura.deFahrenheit(212);
System.out.println(t + " " + new Temperatura(0).fahrenheit());`,
      resposta: 'Temperatura[celsius=100.0] 32.0',
      explicacao: 'Métodos `static` funcionam como fábricas, e métodos de instância podem calcular valores derivados dos componentes. 212 °F são 100 °C, e 0 °C são 32 °F.',
    },
    {
      id: 'junior-t5-e01-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que um record pode declarar no corpo? Escolha três.',
      opcoes: [
        'Métodos de instância',
        'Campos `static`',
        'A implementação de interfaces listadas no cabeçalho',
        'Campos de instância além dos componentes',
        'Uma cláusula `extends`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O estado é fixo pelo cabeçalho, mas o comportamento é livre. A herança de classes é proibida porque o record já estende `Record`.',
    },
    {
      id: 'junior-t5-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `record Animal(String nome) { }

class Cachorro extends Animal {
    Cachorro() {
        super("Rex");
    }
}`,
      opcoes: ['Não compila: records são `final`', 'Compila', 'Não compila: falta o acessor `nome()`', 'Compila, mas `Cachorro` não herda `nome()`'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 3 },
      explicacao: 'Todo record é implicitamente `final`. Para compartilhar comportamento entre records, use interfaces.',
    },
    {
      id: 'junior-t5-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Como os métodos `equals`, `hashCode` e `toString` de um record são implementados no bytecode?',
      opcoes: [
        'Com uma instrução `invokedynamic` que monta a implementação em tempo de execução a partir dos componentes',
        'O compilador escreve o código completo de cada um, campo a campo',
        'Eles não existem: a JVM trata records de forma especial',
        'Eles herdam as versões de `Object`',
      ],
      resposta: 0,
      explicacao: 'O bootstrap `ObjectMethods` gera os três métodos na primeira chamada. Records antigos ganham automaticamente as otimizações de versões novas do JDK.',
    },
  ],
};

export default episodio;
