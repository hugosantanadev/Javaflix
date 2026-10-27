import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'junior-t2-e04',
  minutos: 14,
  aula,
  armadilhas: [
    'Encapsular é esconder os campos (`private`) e expor métodos que mantêm as regras do objeto.',
    'Convenção JavaBeans: `getX`, `setX`, e `isX` para propriedades `boolean`.',
    'Imutável exige: classe `final`, campos `private final`, sem setters, cópias defensivas e operações que devolvem objetos novos.',
    '`final` numa referência impede trocá-la, mas o objeto apontado continua mutável.',
    'Guardar o array ou a lista recebidos no construtor, sem cópia, deixa quem os passou alterar o objeto.',
    'Devolver o array ou a lista interna num getter também quebra a imutabilidade.',
    '`Collections.unmodifiableList` é uma visão: mudanças na lista original aparecem nela.',
    '`clone()` de array copia as referências, não os objetos: é uma cópia rasa.',
  ],
  ia: {
    uso:
      'A IA gera classes encapsuladas e imutáveis rapidamente e conhece a receita. O que ela mais esquece são as cópias defensivas e as regras de negócio dentro dos métodos. Use-a para revisar uma classe atrás de cada caminho por onde o estado pode mudar sem passar por uma regra.',
    pedido:
      'Revise esta classe Java 21, que deveria ser imutável.\n<cole a classe aqui>\n- Aponte cada caminho por onde o estado pode mudar depois da construção, inclusive por objetos mutáveis recebidos ou devolvidos.\n- Corrija com cópias defensivas na entrada e na saída, ou com List.copyOf.\n- Diga se algum método que "altera" deveria devolver um objeto novo.',
    erros: [
      'Esquece de copiar a lista ou o array recebido no construtor.',
      'Devolve a coleção interna no getter.',
      'Gera setters numa classe que deveria ser imutável.',
    ],
    conferir: [
      'Altere o array ou a lista original depois de criar o objeto e veja se ele muda.',
      'Tente alterar o que o getter devolve.',
      'Confira se todo método que "muda" o objeto devolve um objeto novo.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: A Strategy for Defining Immutable Objects',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/imstrat.html',
      tipo: 'documentacao',
      porque: 'A receita oficial, passo a passo, aplicada a uma classe de cores.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Immutable Objects',
      url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html',
      tipo: 'documentacao',
      porque: 'Por que objetos imutáveis simplificam o código concorrente.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de List.copyOf',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#copyOf(java.util.Collection)',
      tipo: 'documentacao',
      porque: 'A cópia imutável de uma lista, ideal para cópias defensivas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 17.5: final Field Semantics',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.5',
      tipo: 'documentacao',
      porque: 'A garantia do modelo de memória que torna objetos imutáveis seguros entre threads.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Immutable Objects in Java',
      url: 'https://www.baeldung.com/java-immutable-object',
      tipo: 'artigo',
      porque: 'O que torna um objeto imutável e os benefícios disso, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java 32, Encapsulamento: métodos getters e setters',
      url: 'https://www.youtube.com/watch?v=vKif9IxYTLY',
      tipo: 'video',
      porque: 'Encapsulamento e a convenção de nomes dos getters e setters, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Matheus Leandro Ferreira: Imutabilidade em Java',
      url: 'https://www.youtube.com/watch?v=JNGAR5B4e6E',
      tipo: 'video',
      porque: 'Como construir classes imutáveis e onde elas aparecem no dia a dia, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'EuProgramando: Aula 79, Classes imutáveis',
      url: 'https://www.youtube.com/watch?v=CiEcIl4EbUg',
      tipo: 'video',
      porque: 'A receita da classe imutável aplicada passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Os dois capítulos de referência sobre o assunto, com o ataque que a cópia defensiva impede.',
      gratuito: false,
      idioma: 'en',
      onde: 'Item 17, "Minimize mutability", e Item 50, "Make defensive copies when needed"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A receita de imutabilidade em cinco regras, a mesma usada nas questões.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 6, "Class Design": seção "Creating Immutable Objects"',
    },
  ],
  desafio: {
    titulo: 'Pedido imutável',
    enunciado:
      'Escreva a classe imutável `Pedido`, com um cliente obrigatório (nem nulo nem em branco) e uma lista de itens. A lista recebida no construtor não pode afetar o pedido depois, e a lista devolvida por `getItens()` não pode ser alterada. O método `comItem(String item)` devolve um pedido **novo** com o item a mais. Rode com:\n\n```java\nList<String> lista = new ArrayList<>(List.of("pizza"));\nPedido p1 = new Pedido("Ana", lista);\nlista.add("refrigerante");\nPedido p2 = p1.comItem("sobremesa");\nSystem.out.println(p1.getCliente() + " " + p1.getItens());\nSystem.out.println(p2.getCliente() + " " + p2.getItens());\ntry {\n    p2.getItens().add("café");\n} catch (UnsupportedOperationException e) {\n    System.out.println("itens não podem ser alterados por fora");\n}\ntry {\n    new Pedido(" ", lista);\n} catch (IllegalArgumentException e) {\n    System.out.println("Erro: " + e.getMessage());\n}\n```\n\nSaída esperada:\n\n```text\nAna [pizza]\nAna [pizza, sobremesa]\nitens não podem ser alterados por fora\nErro: cliente obrigatório\n```',
    dicas: [
      '`List.copyOf(itens)` resolve duas coisas: copia e devolve uma lista imutável.',
      'Em `comItem`, copie para um `ArrayList`, acrescente e crie o novo pedido com essa lista.',
      '`isBlank()` cobre a string vazia e a feita só de espaços.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

final class Pedido {
    private final String cliente;
    private final List<String> itens;

    Pedido(String cliente, List<String> itens) {
        if (cliente == null || cliente.isBlank()) {
            throw new IllegalArgumentException("cliente obrigatório");
        }
        this.cliente = cliente;
        this.itens = List.copyOf(itens);
    }

    String getCliente() {
        return cliente;
    }

    List<String> getItens() {
        return itens;
    }

    Pedido comItem(String item) {
        List<String> novos = new ArrayList<>(itens);
        novos.add(item);
        return new Pedido(cliente, novos);
    }
}

public class Cozinha {
    public static void main(String[] args) {
        List<String> lista = new ArrayList<>(List.of("pizza"));
        Pedido p1 = new Pedido("Ana", lista);
        lista.add("refrigerante");
        Pedido p2 = p1.comItem("sobremesa");
        System.out.println(p1.getCliente() + " " + p1.getItens());
        System.out.println(p2.getCliente() + " " + p2.getItens());
        try {
            p2.getItens().add("café");
        } catch (UnsupportedOperationException e) {
            System.out.println("itens não podem ser alterados por fora");
        }
        try {
            new Pedido(" ", lista);
        } catch (IllegalArgumentException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}`,
    saida: 'Ana [pizza]\nAna [pizza, sobremesa]\nitens não podem ser alterados por fora\nErro: cliente obrigatório',
    comentarios:
      'O "refrigerante" acrescentado à lista original não aparece no pedido, graças à cópia no construtor. Como a cópia já é imutável, o getter pode devolvê-la sem copiar de novo. `p1` continua igual depois de `comItem`: as duas versões coexistem, e é isso que torna objetos imutáveis seguros para compartilhar.',
  },
  bugs: [
    {
      id: 'junior-t2-e04-b01',
      dificuldade: 2,
      sintoma: 'O pedido aceita no máximo 2 itens, mas termina com `Itens: 3`.',
      codigo: `import java.util.*;

final class Pedido {
    private final List<String> itens = new ArrayList<>();

    void adicionar(String item) {
        if (itens.size() < 2) itens.add(item);
    }

    List<String> getItens() {
        return itens;
    }
}

public class Loja {
    public static void main(String[] args) {
        Pedido p = new Pedido();
        p.adicionar("caneta");
        p.getItens().add("mochila");
        p.getItens().add("estojo");
        System.out.println("Itens: " + p.getItens().size());
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'Itens: 3' },
      correcao: `import java.util.*;

final class Pedido {
    private final List<String> itens = new ArrayList<>();

    void adicionar(String item) {
        if (itens.size() < 2) itens.add(item);
    }

    List<String> getItens() {
        return new ArrayList<>(itens);
    }
}

public class Loja {
    public static void main(String[] args) {
        Pedido p = new Pedido();
        p.adicionar("caneta");
        p.getItens().add("mochila");
        p.getItens().add("estojo");
        System.out.println("Itens: " + p.getItens().size());
    }
}`,
      saidaCorrigida: 'Itens: 1',
      dica: 'A regra do limite está em `adicionar`. Existe outro caminho para pôr itens no pedido?',
      explicacao: 'O getter entrega a lista interna, e quem a recebe adiciona itens direto nela, sem passar pela regra. Devolvendo uma cópia, os `add` de fora vão para a cópia e não alcançam o pedido. Com `List.copyOf`, a cópia seria imutável, e os `add` lançariam `UnsupportedOperationException`, o que também denuncia o uso indevido.',
    },
    {
      id: 'junior-t2-e04-b02',
      dificuldade: 2,
      sintoma: 'A soma dos preços deveria dar 3550 centavos, mas o total sai `0`.',
      codigo: `final class Dinheiro {
    private final long centavos;

    Dinheiro(long centavos) {
        this.centavos = centavos;
    }

    Dinheiro somar(long outros) {
        return new Dinheiro(centavos + outros);
    }

    long getCentavos() {
        return centavos;
    }
}

public class Caixa {
    public static void main(String[] args) {
        long[] precos = {1050, 2500};
        Dinheiro total = new Dinheiro(0);
        for (long preco : precos) {
            total.somar(preco);
        }
        System.out.println(total.getCentavos());
    }
}`,
      linha: 22,
      efeito: { tipo: 'saida', saida: '0' },
      correcao: `final class Dinheiro {
    private final long centavos;

    Dinheiro(long centavos) {
        this.centavos = centavos;
    }

    Dinheiro somar(long outros) {
        return new Dinheiro(centavos + outros);
    }

    long getCentavos() {
        return centavos;
    }
}

public class Caixa {
    public static void main(String[] args) {
        long[] precos = {1050, 2500};
        Dinheiro total = new Dinheiro(0);
        for (long preco : precos) {
            total = total.somar(preco);
        }
        System.out.println(total.getCentavos());
    }
}`,
      saidaCorrigida: '3550',
      dica: '`Dinheiro` é imutável. O que o `somar` faz com o objeto original, e onde fica o resultado?',
      explicacao: 'Num objeto imutável, `somar` não altera nada: devolve um `Dinheiro` novo. O laço jogava o resultado fora, e `total` continuava o objeto com zero. Como no `toUpperCase` da `String`, o retorno precisa ser guardado.',
    },
    {
      id: 'junior-t2-e04-b03',
      dificuldade: 3,
      sintoma: 'A prova acertou 2 de 3 questões, mas a correção mostra `3 acertos`.',
      codigo: `final class Gabarito {
    private final char[] respostas;

    Gabarito(char[] respostas) {
        this.respostas = respostas;
    }

    int acertos(char[] prova) {
        int n = 0;
        for (int i = 0; i < prova.length; i++) if (prova[i] == respostas[i]) n++;
        return n;
    }
}

public class Correcao {
    public static void main(String[] args) {
        char[] oficial = {'a', 'b', 'c'};
        Gabarito g = new Gabarito(oficial);
        char[] prova = {'a', 'd', 'c'};
        oficial[1] = 'd';
        System.out.println(g.acertos(prova) + " acertos");
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: '3 acertos' },
      correcao: `final class Gabarito {
    private final char[] respostas;

    Gabarito(char[] respostas) {
        this.respostas = respostas.clone();
    }

    int acertos(char[] prova) {
        int n = 0;
        for (int i = 0; i < prova.length; i++) if (prova[i] == respostas[i]) n++;
        return n;
    }
}

public class Correcao {
    public static void main(String[] args) {
        char[] oficial = {'a', 'b', 'c'};
        Gabarito g = new Gabarito(oficial);
        char[] prova = {'a', 'd', 'c'};
        oficial[1] = 'd';
        System.out.println(g.acertos(prova) + " acertos");
    }
}`,
      saidaCorrigida: '2 acertos',
      dica: 'Depois de criado o gabarito, alguém mexeu no array `oficial`. O gabarito guarda uma cópia ou o mesmo array?',
      explicacao: 'O construtor guardou a mesma referência que recebeu. Quando `oficial[1]` mudou, o gabarito mudou junto, e a resposta errada passou a valer. Com `clone()` no construtor, o gabarito fica com um array só dele, que nada de fora alcança.',
    },
  ],
  exercicios: [
    {
      id: 'junior-t2-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que significa encapsular uma classe?',
      opcoes: [
        'Esconder os campos e expor métodos que controlam como o estado muda',
        'Declarar todos os métodos como `static`',
        'Colocar a classe dentro de outra classe',
        'Impedir que a classe seja estendida',
      ],
      resposta: 0,
      explicacao: 'Com os campos `private`, todo acesso passa por métodos da própria classe, que podem validar e manter as regras, como "o saldo nunca fica negativo".',
      dica: 'Pense em quem pode mexer no estado e por qual caminho.',
    },
    {
      id: 'junior-t2-e04-q02',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `class Termometro {
    private int graus;

    void setGraus(int graus) {
        if (graus >= -50 && graus <= 60) {
            this.graus = graus;
        }
    }

    int getGraus() {
        return graus;
    }
}

Termometro t = new Termometro();
t.setGraus(25);
t.setGraus(100);
System.out.println(t.getGraus());`,
      resposta: '25',
      explicacao: 'O setter recusa valores fora da faixa, e o segundo ajuste é ignorado. Com o campo `private`, não há outro caminho para mudar a temperatura.',
      dica: 'O segundo `setGraus` passa na validação?',
    },
    {
      id: 'junior-t2-e04-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais medidas fazem parte da receita de uma classe imutável? Escolha três.',
      opcoes: [
        'Declarar todos os campos `private` e `final`',
        'Não oferecer métodos que alteram o estado',
        'Copiar objetos mutáveis recebidos e devolvidos',
        'Declarar todos os métodos como `static`',
        'Declarar os campos `public final` para leitura direta',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Campos `private final`, nenhum método que altere o estado e cópias defensivas, além de impedir subclasses. Métodos `static` não têm relação com imutabilidade, e campos públicos expõem a representação interna.',
      dica: 'A receita fala de campos, de métodos que alteram e de objetos mutáveis.',
    },
    {
      id: 'junior-t2-e04-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `final class Senhas {
    private final int[] codigos;

    Senhas(int[] codigos) {
        this.codigos = codigos;
    }

    int primeiro() {
        return codigos[0];
    }
}

int[] base = {111, 222};
Senhas s = new Senhas(base);
base[0] = 999;
System.out.println(s.primeiro());`,
      opcoes: ['`999`', '`111`', 'Não compila', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O construtor guardou a referência ao mesmo array de `base`, sem copiar. `final` só impede trocar a referência; o conteúdo continua alterável por quem tem o array.',
      dica: 'O construtor guardou uma cópia ou a mesma referência de `base`?',
    },
    {
      id: 'junior-t2-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `final class Contador {
    private final int valor;

    Contador(int valor) {
        this.valor = valor;
    }

    Contador incrementar() {
        valor++;
        return this;
    }
}`,
      opcoes: ['Não compila', 'Compila', 'Compila, mas `incrementar` lança exceção', 'Não compila: classes `final` não podem ter construtor'],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 9 },
      explicacao: 'Um campo `final` só recebe valor uma vez, na construção. Numa classe imutável, `incrementar` deveria devolver `new Contador(valor + 1)`.',
      dica: 'Um campo `final` pode ser incrementado?',
    },
    {
      id: 'junior-t2-e04-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o nome do getter, pela convenção JavaBeans. O programa deve imprimir `true`.',
      codigo: `class Usuario {
    private boolean ativo = true;

    public boolean ___() {
        return ativo;
    }
}

public class Painel {
    public static void main(String[] args) {
        Usuario u = new Usuario();
        System.out.println(u.isAtivo());
    }
}`,
      respostas: ['isAtivo'],
      saida: 'true',
      explicacao: 'Para propriedades `boolean`, a convenção usa o prefixo `is`. Para os outros tipos, `get`. Frameworks encontram as propriedades por esses nomes.',
      dica: 'Para `boolean`, a convenção usa outro prefixo no lugar de `get`.',
    },
    {
      id: 'junior-t2-e04-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public final class Cor {
    private final int r, g, b;

    public Cor(int r, int g, int b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public void setR(int r) {
        this.r = r;
    }
}`,
      resposta: 11,
      explicacao: 'Um setter não combina com campos `final`. Numa classe imutável, a alternativa é `comR(int r)`, que devolve `new Cor(r, g, b)`.',
      dica: 'Um campo `final` aceita uma atribuição num método comum?',
    },
    {
      id: 'junior-t2-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `List<Integer> base = new ArrayList<>(List.of(1, 2));
List<Integer> visao = Collections.unmodifiableList(base);
List<Integer> copia = List.copyOf(base);
base.add(3);
System.out.println(visao.size() + " " + copia.size());`,
      opcoes: ['`3 2`', '`2 2`', '`3 3`', 'Lança `UnsupportedOperationException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A visão não deixa ninguém alterar a lista por ela, mas reflete as mudanças feitas na original. A cópia é independente.',
      dica: 'A visão acompanha a original; a cópia, não.',
    },
    {
      id: 'junior-t2-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `final class Placar {
    private final int pontos;

    Placar(int pontos) {
        this.pontos = pontos;
    }

    Placar marcar(int n) {
        return new Placar(pontos + n);
    }

    int getPontos() {
        return pontos;
    }
}

Placar p = new Placar(0);
p.marcar(3);
p = p.marcar(2);
p.marcar(10);
System.out.println(p.getPontos());`,
      opcoes: ['`2`', '`15`', '`5`', '`0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada `marcar` devolve um placar novo. Só o resultado da segunda chamada foi guardado em `p`; os outros dois objetos foram descartados.',
      dica: 'Só a atribuição guarda o objeto novo; as outras chamadas descartam o resultado.',
    },
    {
      id: 'junior-t2-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a receita de imutabilidade pede que a classe seja `final`?',
      opcoes: [
        'Para impedir que uma subclasse acrescente estado mutável ou sobrescreva métodos',
        'Porque só classes `final` podem ter campos `final`',
        'Para que a classe seja carregada mais rápido',
        'Porque classes `final` não podem ter construtores públicos',
      ],
      resposta: 0,
      explicacao: 'Uma subclasse mutável poderia ser usada onde se espera a classe imutável. Um construtor `private` com métodos de fábrica também resolve.',
      dica: 'Uma subclasse poderia acrescentar o quê a uma classe imutável?',
    },
    {
      id: 'junior-t2-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `final class Agenda {
    private final List<String> nomes;

    Agenda(List<String> nomes) {
        this.nomes = List.copyOf(nomes);
    }

    List<String> getNomes() {
        return nomes;
    }
}

Agenda a = new Agenda(List.of("Ana"));
a.getNomes().add("Bia");
System.out.println(a.getNomes());`,
      opcoes: [
        'Lança `UnsupportedOperationException`',
        'Imprime `[Ana, Bia]`',
        'Imprime `[Ana]`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'UnsupportedOperationException' },
      explicacao: 'A lista guardada é imutável, e o getter pode entregá-la sem cópia: qualquer tentativa de alteração falha. É uma cópia defensiva feita uma única vez, no construtor.',
      dica: '`List.copyOf` devolve uma lista que aceita `add`?',
    },
    {
      id: 'junior-t2-e04-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `final StringBuilder sb = new StringBuilder("a");
sb.append("b");
final int[] v = {1};
v[0]++;
System.out.println(sb + " " + v[0]);`,
      resposta: 'ab 2',
      explicacao: '`final` impede atribuir outro objeto às variáveis, não alterar os objetos para os quais elas apontam.',
      dica: '`final` impede trocar a referência, não mexer no objeto.',
    },
    {
      id: 'junior-t2-e04-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais classes da biblioteca padrão são imutáveis? Escolha três.',
      opcoes: ['`String`', '`Integer`', '`LocalDate`', '`StringBuilder`', '`ArrayList`'],
      respostas: [0, 1, 2],
      explicacao: 'Os métodos de `String`, dos wrappers e de `LocalDate` devolvem objetos novos. `StringBuilder` e `ArrayList` existem justamente para serem alterados.',
      dica: 'Quais delas não têm nenhum método que altera o objeto?',
    },
    {
      id: 'junior-t2-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Que garantia especial a especificação dá aos campos `final` de um objeto?',
      opcoes: [
        'Terminado o construtor, outras threads veem os valores desses campos sem sincronização, desde que `this` não tenha vazado',
        'Eles são guardados numa área de memória somente leitura',
        'Eles são copiados para cada thread que usa o objeto',
        'Eles não ocupam memória no objeto, porque o compilador os substitui pelo valor',
      ],
      resposta: 0,
      explicacao: 'É a semântica de campos `final` do modelo de memória (JLS 17.5). Ela permite compartilhar objetos imutáveis entre threads sem travas, desde que o construtor não publique `this` antes de terminar.',
      dica: 'Pense no modelo de memória e em outras threads.',
    },
    {
      id: 'junior-t2-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `final class Grupo {
    private final StringBuilder[] nomes;

    Grupo(StringBuilder[] nomes) {
        this.nomes = nomes.clone();
    }

    StringBuilder[] getNomes() {
        return nomes.clone();
    }
}

StringBuilder[] base = {new StringBuilder("Ana")};
Grupo g = new Grupo(base);
base[0].append("!");
g.getNomes()[0] = new StringBuilder("Bia");
System.out.println(g.getNomes()[0]);`,
      opcoes: ['`Ana!`', '`Ana`', '`Bia`', '`Bia!`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `clone()` copia o array, mas os elementos continuam sendo os mesmos `StringBuilder`. O `append` em `base[0]` altera o objeto que o grupo também guarda. Trocar um elemento da cópia devolvida não afeta o grupo.',
      dica: 'O `clone` de array é raso: copia as setas, não os `StringBuilder`.',
    },
  ],
};

export default episodio;
