import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t5-e03',
  minutos: 18,
  aula,
  armadilhas: [
    'Num relacionamento bidirecional, só o lado dono, o do `@ManyToOne`, grava a chave estrangeira: mudar só a lista não muda o banco.',
    'Esquecer o `mappedBy` no `@OneToMany` cria uma tabela intermediária que ninguém pediu.',
    '`@ManyToOne` e `@OneToOne` são `EAGER` por padrão: declare `fetch = FetchType.LAZY`.',
    'Cascata em `@ManyToOne` (para o cliente, o produto) pode apagar ou alterar entidades que não pertencem ao objeto.',
    'Acessar uma coleção preguiçosa depois do fim da transação lança `LazyInitializationException`.',
    'O `open-in-view`, ligado por padrão no Spring Boot, esconde a exceção e deixa a serialização do JSON disparar consultas.',
    '`toString`, `equals` e `hashCode` gerados com os dois lados de um relacionamento entram em recursão infinita.',
  ],
  ia: {
    uso:
      'A IA mapeia relacionamentos corretamente nos casos comuns, mas costuma repetir padrões que funcionam em exemplos pequenos e quebram em produção: `EAGER`, cascata em tudo e entidades devolvidas direto como JSON.',
    pedido:
      'Mapeie Pedido e ItemPedido com JPA (Hibernate 7): um pedido tem muitos itens, e cada item aponta para um produto.\n- @ManyToOne sempre LAZY; o lado dono é o ItemPedido.\n- Cascata e orphanRemoval só na lista de itens do pedido, nunca para Produto ou Cliente.\n- Métodos adicionar e remover que mantêm os dois lados sincronizados.\n- Sem toString, equals ou hashCode que percorram os relacionamentos.\n\n<cole aqui as entidades atuais>',
    erros: [
      'Deixa o `@ManyToOne` com o padrão `EAGER`, ou marca coleções como `EAGER` para fugir de uma `LazyInitializationException`.',
      'Põe `cascade = CascadeType.ALL` também no `@ManyToOne`, e apagar um pedido tenta apagar o cliente.',
      'Esquece o `mappedBy`, e o Hibernate cria uma tabela intermediária que ninguém pediu.',
      'Sugere ligar o `open-in-view` para esconder a exceção.',
    ],
    conferir: [
      'Leia o DDL gerado: só a tabela do lado dono deve ter a chave estrangeira.',
      'Remova um item da lista e veja o `DELETE` no log.',
      'Procure `FetchType.EAGER` e `CascadeType` no código gerado e justifique cada um.',
    ],
  },
  recursos: [
    {
      titulo: 'A Short Guide to Hibernate 7: Associations',
      url: 'https://docs.hibernate.org/orm/7.0/introduction/html_single/#associations',
      tipo: 'documentacao',
      porque: 'O guia oficial do Hibernate sobre cada tipo de relacionamento, com o lado dono e o `mappedBy`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Open EntityManager in View',
      url: 'https://docs.spring.io/spring-boot/reference/data/sql.html#data.sql.jpa-and-spring-data.open-entity-manager-in-view',
      tipo: 'documentacao',
      porque: 'O que a propriedade `spring.jpa.open-in-view` faz e como desligá-la.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Vlad Mihalcea: The best way to map a @OneToMany relationship',
      url: 'https://vladmihalcea.com/the-best-way-to-map-a-onetomany-association-with-jpa-and-hibernate/',
      tipo: 'artigo',
      porque: 'Compara o SQL de cada forma de mapear um para muitos e mostra por que o bidirecional com `mappedBy` é o melhor.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Vlad Mihalcea: The Open Session In View Anti-Pattern',
      url: 'https://vladmihalcea.com/the-open-session-in-view-anti-pattern/',
      tipo: 'artigo',
      porque: 'Por que manter o contexto aberto até o fim da requisição é uma má ideia, com o SQL que ele esconde.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Vlad Mihalcea: The best way to use the @ManyToMany annotation',
      url: 'https://vladmihalcea.com/the-best-way-to-use-the-manytomany-annotation-with-jpa-and-hibernate/',
      tipo: 'artigo',
      porque: 'Por que usar `Set` no muitos para muitos e como manter os dois lados sincronizados.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Thorben Janssen: Entity Mappings, Introduction to JPA FetchTypes',
      url: 'https://thorben-janssen.com/entity-mappings-introduction-jpa-fetchtypes/',
      tipo: 'artigo',
      porque: 'Os padrões `EAGER` e `LAZY` de cada relacionamento e o efeito de cada um nas consultas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'xavecoding: Relacionamentos @OneToMany e @ManyToOne',
      url: 'https://www.youtube.com/watch?v=5fSj22q4lDk',
      tipo: 'video',
      porque: 'O par mais comum de relacionamentos, com o lado dono e o mappedBy, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'xavecoding: Tipos de fetching no Spring Data',
      url: 'https://www.youtube.com/watch?v=swedZ9adS9M',
      tipo: 'video',
      porque: 'LAZY e EAGER na prática, com o SQL de cada um, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'xavecoding: Cascade e @PreRemove',
      url: 'https://www.youtube.com/watch?v=iIs-bdZU848',
      tipo: 'video',
      porque: 'Quando usar cascata e o que acontece ao apagar uma entidade com filhos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Inicializando atributos Lazy',
      url: 'https://www.youtube.com/watch?v=E-rmoyyYKvw',
      tipo: 'video',
      porque: 'Como e quando os relacionamentos preguiçosos são carregados, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'A cascata e os órfãos',
    enunciado:
      'Simule o *flush* de um `@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)`. Um `Pedido` tem uma lista de `Item`s e guarda, num `Set<Integer>`, os ids que já estão gravados. O método `flush()` deve dar id (sequencial, a partir de 1) a cada item novo e imprimir o `insert`, depois imprimir um `delete` para cada id gravado que não está mais na lista, e por fim atualizar o conjunto de gravados. Um `flush` sem mudanças não imprime nada. A saída deve ser:\n\n```text\n--- primeiro flush\ninsert into itens_pedido (id, produto, quantidade) values (1, \'Teclado mecânico\', 1)\ninsert into itens_pedido (id, produto, quantidade) values (2, \'Mouse sem fio\', 2)\n--- remove o mouse e acrescenta um headset\ninsert into itens_pedido (id, produto, quantidade) values (3, \'Headset\', 1)\ndelete from itens_pedido where id=2\n--- flush sem mudanças\nitens: [1:Teclado mecânico, 3:Headset]\n```',
    dicas: [
      'Um item sem id é novo: é ele que gera o `insert`.',
      'Os órfãos são a diferença entre os ids gravados e os ids que estão na lista agora.',
      'Ao remover um item, desfaça também o outro lado: `item.pedido = null`.',
      'Use `LinkedHashSet` para que os `delete`s saiam numa ordem previsível.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class Cascata {
    static int proximoId = 1;

    static class Item {
        Integer id;
        Pedido pedido;
        final String produto;
        final int quantidade;

        Item(Pedido pedido, String produto, int quantidade) {
            this.pedido = pedido;
            this.produto = produto;
            this.quantidade = quantidade;
        }
    }

    static class Pedido {
        final List<Item> itens = new ArrayList<>();
        final Set<Integer> gravados = new LinkedHashSet<>();

        void adicionar(String produto, int quantidade) {
            itens.add(new Item(this, produto, quantidade));
        }

        void remover(String produto) {
            itens.removeIf(i -> {
                if (!i.produto.equals(produto)) return false;
                i.pedido = null;
                return true;
            });
        }

        /** Como o flush de um @OneToMany(cascade = ALL, orphanRemoval = true). */
        void flush() {
            Set<Integer> atuais = new LinkedHashSet<>();
            for (Item i : itens) {
                if (i.id == null) {
                    i.id = proximoId++;
                    System.out.println("insert into itens_pedido (id, produto, quantidade) values (" + i.id + ", '" + i.produto + "', " + i.quantidade + ")");
                }
                atuais.add(i.id);
            }
            for (Integer id : gravados) {
                if (!atuais.contains(id)) System.out.println("delete from itens_pedido where id=" + id);
            }
            gravados.clear();
            gravados.addAll(atuais);
        }
    }

    public static void main(String[] args) {
        Pedido p = new Pedido();
        p.adicionar("Teclado mecânico", 1);
        p.adicionar("Mouse sem fio", 2);
        System.out.println("--- primeiro flush");
        p.flush();
        System.out.println("--- remove o mouse e acrescenta um headset");
        p.remover("Mouse sem fio");
        p.adicionar("Headset", 1);
        p.flush();
        System.out.println("--- flush sem mudanças");
        p.flush();
        System.out.println("itens: " + p.itens.stream().map(i -> i.id + ":" + i.produto).toList());
    }
}`,
    saida: "--- primeiro flush\ninsert into itens_pedido (id, produto, quantidade) values (1, 'Teclado mecânico', 1)\ninsert into itens_pedido (id, produto, quantidade) values (2, 'Mouse sem fio', 2)\n--- remove o mouse e acrescenta um headset\ninsert into itens_pedido (id, produto, quantidade) values (3, 'Headset', 1)\ndelete from itens_pedido where id=2\n--- flush sem mudanças\nitens: [1:Teclado mecânico, 3:Headset]",
    comentarios:
      'O Hibernate não sabe que você chamou `remover`: ele descobre as mudanças comparando a coleção com a fotografia de quando ela foi carregada, como o conjunto `gravados` faz aqui. É por isso que trocar a coleção inteira (`pedido.setItens(novaLista)`) é um erro clássico com `orphanRemoval`: a coleção que o Hibernate acompanha some, e ele lança `HibernateException: A collection with cascade="all-delete-orphan" was no longer referenced`. Altere a lista existente com `add`, `remove` e `clear`. O Hibernate real também ordena as operações do *flush*: insere antes de apagar, como esta simulação, e agrupa os comandos quando o *batch* está ligado.',
  },
  exercicios: [
    {
      id: 'backend-junior-t5-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado:
        '`Pedido` tem `@ManyToOne @JoinColumn(name = "cliente_id") Cliente cliente`, e `Cliente` tem `@OneToMany(mappedBy = "cliente") List<Pedido> pedidos`. Qual é o lado dono da relação?',
      opcoes: [
        'O `Pedido`: é o lado do `@ManyToOne`, que mapeia a chave estrangeira',
        'O `Cliente`: é o lado "um"',
        'Os dois, igualmente',
        'Nenhum: o dono é a tabela intermediária',
      ],
      resposta: 0,
      explicacao: 'O lado com `mappedBy` é o inverso. O Hibernate só olha o lado dono, o campo `cliente` do pedido, para gravar `cliente_id`.',
    },
    {
      id: 'backend-junior-t5-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece se o `@OneToMany` do `Cliente` for declarado sem `mappedBy`, mantendo o `@ManyToOne` do `Pedido`?',
      opcoes: [
        'O Hibernate entende dois relacionamentos independentes e cria uma tabela intermediária para a lista do cliente',
        'Nada muda: o `mappedBy` é só documentação',
        'A aplicação não compila',
        'A chave estrangeira passa para a tabela de clientes',
      ],
      resposta: 0,
      explicacao: 'Sem `mappedBy`, a lista ganha mapeamento próprio, numa tabela `clientes_pedidos`, e a mesma informação passa a ser gravada em dois lugares.',
    },
    {
      id: 'backend-junior-t5-e03-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado:
        'O programa monta um relacionamento bidirecional pela metade. A "lista" é o que o objeto `ana` mostra; o "banco" é o que o Hibernate gravaria, olhando só o lado dono. Digite a saída exata.',
      codigo: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Teste {
    static class Cliente {
        final List<Pedido> pedidos = new ArrayList<>();
    }

    static class Pedido {
        final int id;
        Cliente cliente;
        Pedido(int id) { this.id = id; }
    }

    public static void main(String[] args) {
        Cliente ana = new Cliente();
        Pedido p1 = new Pedido(1);
        p1.cliente = ana;
        Pedido p2 = new Pedido(2);
        ana.pedidos.add(p2);
        System.out.println("lista " + ana.pedidos.stream().map(p -> p.id).toList()
                + ", banco " + Stream.of(p1, p2).filter(p -> p.cliente == ana).map(p -> p.id).toList());
    }
}`,
      resposta: 'lista [2], banco [1]',
      explicacao: 'Cada metade só foi feita de um lado: a lista em memória tem o pedido 2, mas o banco teria o pedido 1. Um método que atualiza os dois lados juntos evita a divergência.',
    },
    {
      id: 'backend-junior-t5-e03-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais relacionamentos são `EAGER` por padrão no JPA? Escolha dois.',
      opcoes: ['`@ManyToOne`', '`@OneToOne`', '`@OneToMany`', '`@ManyToMany`', '`@ElementCollection`'],
      respostas: [0, 1],
      explicacao: 'Os que apontam para um único objeto são `EAGER`; as coleções são `LAZY`. Na prática, declare `LAZY` também nos dois primeiros.',
    },
    {
      id: 'backend-junior-t5-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado:
        'Dentro de uma transação, com `@OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true) List<ItemPedido> itens`, o código faz `pedido.getItens().remove(0)`. O que acontece no banco?',
      opcoes: [
        'No fim da transação, o item removido é apagado com um `DELETE`',
        'Nada: é preciso chamar `itemRepository.delete(item)`',
        'A coluna `pedido_id` do item vira `null`',
        'O pedido inteiro é apagado',
      ],
      resposta: 0,
      explicacao: 'O item ficou órfão, sem pedido, e o `orphanRemoval` o apaga. Na aula, o `itens.remove(1)` virou `delete from itens_pedido where id=?`.',
    },
    {
      id: 'backend-junior-t5-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Alguém colocou `cascade = CascadeType.ALL` no `@ManyToOne Cliente cliente` do `Pedido`. O que acontece ao apagar um pedido?',
      opcoes: [
        'O Hibernate tenta apagar também o cliente, que pode ter outros pedidos: ou a chave estrangeira impede, ou um cliente é perdido',
        'Nada: cascata só vale do lado "um" para o lado "muitos"',
        'Os outros pedidos do cliente passam para outro cliente',
        'O pedido não pode mais ser apagado',
      ],
      resposta: 0,
      explicacao: 'A cascata segue a direção do atributo anotado, qualquer que seja o tipo do relacionamento. Ela serve para composição, como os itens de um pedido, e não para entidades independentes.',
    },
    {
      id: 'backend-junior-t5-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado:
        'Com `spring.jpa.open-in-view=false`, o controller recebe um `Pedido` de um método `@Transactional` do serviço e chama `pedido.getItens().size()`. O que acontece?',
      opcoes: [
        '`LazyInitializationException`: a transação terminou quando o serviço retornou, e a coleção não foi carregada',
        'Os itens são buscados normalmente',
        'A lista vem vazia',
        'O Spring abre uma nova transação automaticamente',
      ],
      resposta: 0,
      explicacao: 'Sem contexto aberto, a coleção preguiçosa não tem como ir ao banco. Carregue os itens no serviço e devolva um DTO.',
    },
    {
      id: 'backend-junior-t5-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que desligar o `spring.jpa.open-in-view`, se ele evita a `LazyInitializationException`?',
      opcoes: [
        'Porque ele deixa a montagem da resposta disparar consultas escondidas e segura uma conexão do banco durante toda a requisição',
        'Porque ele desliga o cache do Hibernate',
        'Porque ele impede o uso de `@Transactional`',
        'Porque ele só funciona com H2',
      ],
      resposta: 0,
      explicacao: 'Com ele ligado, a serialização do JSON pode gerar dezenas de consultas sem ninguém perceber. Desligado, o problema aparece cedo, como exceção.',
    },
    {
      id: 'backend-junior-t5-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O programa imita o proxy preguiçoso do Hibernate. Qual é a saída?',
      codigo: `import java.lang.reflect.Proxy;

public class Teste {
    interface Produto {
        long getId();
        String getNome();
    }

    static int consultas = 0;

    static Produto referencia(long id) {
        String[] nome = new String[1];
        return (Produto) Proxy.newProxyInstance(Produto.class.getClassLoader(), new Class<?>[] {Produto.class},
                (proxy, metodo, argumentos) -> {
                    if (metodo.getName().equals("getId")) return id;
                    if (nome[0] == null) {
                        consultas++;
                        nome[0] = "Produto " + id;
                    }
                    return nome[0];
                });
    }

    public static void main(String[] args) {
        Produto a = referencia(1);
        Produto b = referencia(2);
        long soma = a.getId() + b.getId();
        String nomes = a.getNome() + a.getNome();
        System.out.println(soma + " " + consultas);
    }
}`,
      opcoes: ['`3 1`', '`3 0`', '`3 2`', '`3 4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O id já é conhecido e não custa consulta. Só o primeiro `getNome()` de `a` busca; o segundo usa o valor guardado, e `b` nunca é carregado.',
    },
    {
      id: 'backend-junior-t5-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    record Cliente(String nome, List<Pedido> pedidos) {}
    record Pedido(int id, Cliente cliente) {}

    public static void main(String[] args) {
        Cliente ana = new Cliente("Ana", new ArrayList<>());
        ana.pedidos().add(new Pedido(1, ana));
        try {
            System.out.println(ana);
        } catch (StackOverflowError e) {
            System.out.println("StackOverflowError");
        }
    }
}`,
      opcoes: [
        '`StackOverflowError`',
        '`Cliente[nome=Ana, pedidos=[Pedido[id=1, cliente=(this Collection)]]]`',
        '`Cliente[nome=Ana, pedidos=[Pedido[id=1]]]`',
        'Não compila: os records se referenciam mutuamente',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `toString` do cliente imprime o pedido, que imprime o cliente, e assim para sempre. O mesmo acontece com entidades e `toString`, `equals` e `hashCode` gerados, e com a serialização para JSON.',
    },
    {
      id: 'backend-junior-t5-e03-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado:
        'Num `@ManyToMany`, o Hibernate compara as tags de um produto com a fotografia de quando foram carregadas. O programa faz essa comparação. Digite a saída exata.',
      codigo: `import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class Teste {
    public static void main(String[] args) {
        Set<String> fotografia = new LinkedHashSet<>(List.of("java", "promo", "usado"));
        Set<String> atual = new LinkedHashSet<>(List.of("java", "novo", "usado"));
        Set<String> inserir = new LinkedHashSet<>(atual);
        inserir.removeAll(fotografia);
        Set<String> apagar = new LinkedHashSet<>(fotografia);
        apagar.removeAll(atual);
        System.out.println("insert " + inserir + " delete " + apagar);
    }
}`,
      resposta: 'insert [novo] delete [promo]',
      explicacao: 'Só as diferenças viram SQL: uma linha nova e uma apagada em `produto_tags`. As tags que não mudaram não geram comando nenhum.',
    },
    {
      id: 'backend-junior-t5-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que `itens_pedido` foi mapeada como a entidade `ItemPedido`, e não como um `@ManyToMany` entre `Pedido` e `Produto`?',
      opcoes: [
        'Porque a associação tem dados próprios, a quantidade e o preço da época, e o `@ManyToMany` só guarda as duas chaves',
        'Porque o `@ManyToMany` não aceita a tabela `produtos`',
        'Porque um pedido só pode ter um produto',
        'Por desempenho: o `@ManyToMany` faz um `SELECT` por linha',
      ],
      resposta: 0,
      explicacao: 'A tabela associativa de um `@ManyToMany` tem só as duas chaves estrangeiras. Quando a associação ganha um dado, ela vira uma entidade com dois `@ManyToOne`.',
    },
    {
      id: 'backend-junior-t5-e03-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que a especificação do JPA proíbe que uma classe de entidade seja `final`?',
      opcoes: [
        'Porque o proxy preguiçoso é uma subclasse gerada em tempo de execução, e uma classe `final` não pode ter subclasses',
        'Porque o Hibernate altera os atributos `final` com reflexão',
        'Porque classes `final` não podem ter construtor sem argumentos',
        'Porque o `javac` não compila anotações em classes `final`',
      ],
      resposta: 0,
      explicacao: 'O proxy do cliente na aula era um `Cliente`, de uma subclasse criada com ByteBuddy que sobrescreve cada método para buscar os dados no primeiro uso.',
    },
    {
      id: 'backend-junior-t5-e03-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado:
        'Um pedido novo com dois itens novos é gravado com `em.persist(pedido)`, com `cascade = CascadeType.ALL` na lista de itens. Quantos `INSERT`s saem?',
      opcoes: ['Três: um em `pedidos` e dois em `itens_pedido`', 'Um, só do pedido', 'Dois, só dos itens', 'Nenhum, até chamar `persist` em cada item'],
      resposta: 0,
      explicacao: 'O `persist` se propaga do pedido para os itens. Sem a cascata, os itens novos precisariam de `persist` próprio, ou o Hibernate reclamaria de uma entidade transitória.',
    },
    {
      id: 'backend-junior-t5-e03-q15',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais formas resolvem uma `LazyInitializationException` sem esconder o problema? Escolha duas.',
      opcoes: [
        'Carregar o necessário num método `@Transactional` do serviço e devolver um DTO',
        'Buscar o pedido já com os itens, numa consulta com `join fetch`',
        'Religar o `spring.jpa.open-in-view`',
        'Marcar todos os relacionamentos como `EAGER`',
        'Capturar a exceção e devolver uma lista vazia',
      ],
      respostas: [0, 1],
      explicacao: 'As duas buscam o que vai ser usado enquanto há transação. As outras trocam a exceção por consultas escondidas, consultas demais ou dados errados.',
    },
  ],
};

export default episodio;
