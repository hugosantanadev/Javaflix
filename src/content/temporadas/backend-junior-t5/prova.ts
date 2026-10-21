import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T5: Persistência com JPA. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t5-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Logo depois de `Produto p = new Produto("Webcam", preco);`, antes de qualquer chamada ao `EntityManager`, em que situação está o objeto?',
    opcoes: [
      'É um objeto novo, que o contexto de persistência não conhece: nenhuma mudança nele vira SQL',
      'Já está gerenciado e será inserido no fim da transação',
      'Já foi inserido no banco, porque tem `@Entity`',
      'Está destacado, esperando um `merge`',
    ],
    resposta: 0,
    explicacao: 'Só depois do `persist` o objeto passa a ser gerenciado. Até lá, é um objeto Java comum, mesmo com as anotações.',
  },
  {
    id: 'backend-junior-t5-prova-q02',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Com o id em `GenerationType.IDENTITY`, uma transação faz `em.persist(p)` e, em seguida, `p.reajustar(novoPreco)`. Que SQL sai?',
    opcoes: [
      'Um `INSERT` no `persist`, com o preço antigo, e um `UPDATE` no fim da transação, com o novo',
      'Um único `INSERT`, no fim, já com o preço novo',
      'Só o `INSERT`: a mudança depois do `persist` se perde',
      'Um `UPDATE` só, porque a entidade já existe',
    ],
    resposta: 0,
    explicacao:
      'O id vem do banco, e o Hibernate precisa inserir na hora para conhecê-lo. A mudança posterior é encontrada pela verificação de sujeira e vira `UPDATE`, como numa execução real com o Hibernate 7.4.',
  },
  {
    id: 'backend-junior-t5-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Por que tabelas com muitas inserções costumam usar `GenerationType.SEQUENCE` em vez de `IDENTITY`?',
    opcoes: [
      'Com `IDENTITY`, cada `INSERT` precisa ir ao banco na hora para trazer o id, e o Hibernate não consegue agrupar as inserções em lote',
      'Porque `IDENTITY` não funciona no PostgreSQL',
      'Porque `SEQUENCE` gera ids menores',
      'Porque `IDENTITY` repete ids depois de um reinício',
    ],
    resposta: 0,
    explicacao: 'Com uma sequência, o Hibernate pede os ids antes e pode enviar vários `INSERT`s de uma vez no *flush*.',
  },
  {
    id: 'backend-junior-t5-prova-q04',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Uma rota chama `pedidoRepository.findById(id).get()`. O que acontece quando o pedido não existe, e o que fazer?',
    opcoes: [
      '`NoSuchElementException`, que vira um erro 500; use `orElseThrow` com uma exceção que a API traduz para 404',
      'Devolve `null`, e o controller responde 204',
      'O Spring Data responde 404 sozinho',
      'Devolve um pedido vazio',
    ],
    resposta: 0,
    explicacao: '`findById` devolve `Optional`. O `get()` num `Optional` vazio lança exceção; o `orElseThrow` deixa claro o que significa não encontrar.',
  },
  {
    id: 'backend-junior-t5-prova-q05',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'O programa traduz um nome de método derivado, como o Spring Data. Digite a saída exata.',
    codigo: `public class Teste {
    static String inicialMinuscula(String s) {
        return Character.toLowerCase(s.charAt(0)) + s.substring(1);
    }

    public static void main(String[] args) {
        String metodo = "findByStatusOrderByPrecoDesc";
        String[] partes = metodo.substring("findBy".length()).split("OrderBy");
        String ordem = partes[1];
        boolean decrescente = ordem.endsWith("Desc");
        String campo = inicialMinuscula(ordem.replace("Desc", "").replace("Asc", ""));
        System.out.println("where p." + inicialMinuscula(partes[0]) + " = ?1 order by p." + campo + (decrescente ? " desc" : " asc"));
    }
}`,
    resposta: 'where p.status = ?1 order by p.preco desc',
    explicacao: 'O que vem antes de `OrderBy` são as condições; o que vem depois, a ordenação. `Desc` no fim inverte a ordem.',
  },
  {
    id: 'backend-junior-t5-prova-q06',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Um serviço sem `@Transactional` chama `produtoRepository.reajustarTodos(fator)`, um método `@Modifying @Query`. Sai `TransactionRequiredException: No active transaction for update or delete query`. Por quê?',
    opcoes: [
      'Atualizações em massa exigem uma transação, e os métodos declarados no repositório não ganham uma por padrão; anote o método do serviço com `@Transactional`',
      'Porque `@Modifying` só funciona com SQL nativo',
      'Porque o repositório precisa estender `CrudRepository`',
      'Porque o Spring Data proíbe `UPDATE` em JPQL',
    ],
    resposta: 0,
    explicacao: 'Os métodos herdados, como `save`, já são transacionais. Os declarados por você, como os `@Query`, dependem da transação de quem chama.',
  },
  {
    id: 'backend-junior-t5-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O que `List<Produto> findTop3ByStatusOrderByCriadoEmDesc(Status status)` busca?',
    opcoes: [
      'Os três produtos mais recentes com aquele status',
      'Os três primeiros produtos cadastrados, de qualquer status',
      'Todos os produtos com o status, e o Java corta três na memória',
      'Nada: `Top3` não é aceito pelo Spring Data',
    ],
    resposta: 0,
    explicacao: '`Top3` limita o resultado no próprio SQL, e o `OrderByCriadoEmDesc` põe os mais recentes primeiro.',
  },
  {
    id: 'backend-junior-t5-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Numa transação, o código faz só `cliente.getPedidos().remove(pedido)`, com `@OneToMany(mappedBy = "cliente")` no `Cliente`, sem cascata nem `orphanRemoval`. O que muda no banco?',
    opcoes: [
      'Nada: a lista é o lado inverso, e o `cliente_id` do pedido continua o mesmo',
      'O pedido é apagado',
      'O `cliente_id` do pedido vira `null`',
      'O cliente é apagado',
    ],
    resposta: 0,
    explicacao: 'Só o lado dono, o `@ManyToOne` do pedido, grava a chave estrangeira. A lista em memória e o banco passam a discordar.',
  },
  {
    id: 'backend-junior-t5-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O programa compara um cliente carregado com um proxy do mesmo cliente, de três formas. Qual é a saída?',
    codigo: `public class Teste {
    static class Cliente {
        private Long id;

        Cliente() {}
        Cliente(Long id) { this.id = id; }

        Long getId() { return id; }

        boolean igualPorClasse(Object o) {
            return o != null && getClass() == o.getClass() && getId().equals(((Cliente) o).getId());
        }

        boolean igualPorTipo(Object o) {
            return o instanceof Cliente c && getId().equals(c.getId());
        }

        boolean igualPorCampo(Object o) {
            return o instanceof Cliente c && id.equals(c.id);
        }
    }

    /** Como o proxy do Hibernate: uma subclasse que guarda o id à parte. */
    static class ClienteProxy extends Cliente {
        private final Long idDoProxy;

        ClienteProxy(Long id) { this.idDoProxy = id; }

        @Override
        Long getId() { return idDoProxy; }
    }

    public static void main(String[] args) {
        Cliente carregado = new Cliente(7L);
        Cliente proxy = new ClienteProxy(7L);
        System.out.println(carregado.igualPorClasse(proxy) + " " + carregado.igualPorTipo(proxy) + " " + carregado.igualPorCampo(proxy));
    }
}`,
    opcoes: ['`false true false`', '`true true true`', '`false false false`', '`true true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O proxy é de outra classe, então `getClass()` falha; e os campos do proxy não guardam o estado, então ler `c.id` direto dá `null`. Um `equals` de entidade usa `instanceof` e os getters.',
  },
  {
    id: 'backend-junior-t5-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Com `spring.jpa.open-in-view=false`, um controller devolve direto a entidade `Pedido`, buscada num serviço `@Transactional`, e a lista de itens é `LAZY`. O que acontece?',
    opcoes: [
      'A serialização para JSON acessa a lista fora da transação e falha com `LazyInitializationException`; devolva um DTO montado no serviço',
      'O JSON sai com a lista vazia',
      'O Jackson ignora as coleções preguiçosas',
      'O Spring reabre a transação para serializar',
    ],
    resposta: 0,
    explicacao: 'O Jackson chama os getters de tudo, inclusive da coleção preguiçosa. Com um DTO, o serviço decide o que carregar enquanto ainda há transação.',
  },
  {
    id: 'backend-junior-t5-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a diferença entre `cascade = CascadeType.REMOVE` e `orphanRemoval = true` num `@OneToMany`?',
    opcoes: [
      'Os dois apagam os filhos quando o pai é apagado; só o `orphanRemoval` também apaga um filho retirado da coleção',
      'São sinônimos',
      'O `REMOVE` apaga o pai quando o último filho sai',
      'O `orphanRemoval` só vale para `@ManyToMany`',
    ],
    resposta: 0,
    explicacao: 'O `orphanRemoval` trata o filho sem pai como lixo. É o que fez o `itens.remove(1)` da aula virar um `DELETE`.',
  },
  {
    id: 'backend-junior-t5-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Uma tela mostra 20 pedidos, os itens de cada um e o nome do produto de cada item. Cada pedido tem 3 itens, de 60 produtos diferentes no total. Tudo é `LAZY`, sem busca em lote. Quantas consultas a tela faz?',
    opcoes: ['81', '21', '3', '61'],
    resposta: 0,
    explicacao: 'Uma para os pedidos, 20 para os itens de cada pedido e 60 para os produtos. Foi o número contado numa execução real com o Hibernate 7.4.',
  },
  {
    id: 'backend-junior-t5-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Na mesma tela, sem mudar o código, liga-se `spring.jpa.properties.hibernate.default_batch_fetch_size=20`. Quantas consultas passam a ser feitas?',
    opcoes: ['5', '1', '3', '81'],
    resposta: 0,
    explicacao:
      'Uma para os pedidos, uma para os itens dos 20 pedidos de uma vez e três para os 60 produtos, de 20 em 20. A execução real confirmou as 5.',
  },
  {
    id: 'backend-junior-t5-prova-q14',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais formas buscam os pedidos com o nome do cliente numa consulta só? Escolha três.',
    opcoes: [
      '`select p from Pedido p join fetch p.cliente`',
      'Um método de repositório com `@EntityGraph(attributePaths = "cliente")`',
      'Uma projeção `select new ...Resumo(p.id, c.nome) from Pedido p join p.cliente c`',
      '`select p from Pedido p join p.cliente c`, acessando `p.getCliente().getNome()` depois',
      'Marcar o `@ManyToOne` como `EAGER` e usar `select p from Pedido p`',
    ],
    respostas: [0, 1, 2],
    explicacao: 'O `join` sem `fetch` não preenche o cliente, e o `EAGER` busca cada cliente numa consulta separada logo depois.',
  },
  {
    id: 'backend-junior-t5-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Por que a recomendação é mapear tudo como `LAZY` e decidir a busca em cada consulta?',
    opcoes: [
      'Porque cada tela precisa de dados diferentes, e o `EAGER` no mapeamento faz todas as consultas buscarem o relacionamento, usem ou não',
      'Porque `LAZY` é sempre mais rápido, em qualquer caso',
      'Porque `EAGER` não funciona com Spring Data',
      'Porque `LAZY` dispensa transações',
    ],
    resposta: 0,
    explicacao: 'O mapeamento vale para a aplicação inteira; o `join fetch` e o `@EntityGraph` valem para uma consulta. A decisão fica onde o uso é conhecido.',
  },
  {
    id: 'backend-junior-t5-prova-q16',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.Arrays;

public class Teste {
    public static void main(String[] args) {
        boolean comoNumeros = Arrays.compare(new int[] {1, 10}, new int[] {1, 9}) > 0;
        boolean comoTexto = "1.10".compareTo("1.9") > 0;
        System.out.println(comoNumeros + " " + comoTexto);
    }
}`,
    opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Como números, a versão 1.10 vem depois da 1.9; como texto, `1` vem antes de `9`. O Flyway compara versões do primeiro jeito.',
  },
  {
    id: 'backend-junior-t5-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Numa base vazia, com Flyway e `ddl-auto=validate`, o Hibernate não reclama de tabelas ausentes. Por quê?',
    opcoes: [
      'O Spring Boot executa as migrações antes de criar o `EntityManagerFactory`, e a validação já encontra as tabelas criadas',
      'Porque o `validate` só confere depois da primeira requisição',
      'Porque o Flyway desliga o `validate`',
      'Porque o Hibernate cria as tabelas que faltam antes de validar',
    ],
    resposta: 0,
    explicacao: 'O `entityManagerFactory` depende do `flywayInitializer`, como mostram as mensagens de erro da aula. Se o Flyway falha, o JPA nem chega a subir.',
  },
  {
    id: 'backend-junior-t5-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Depois de juntar dois *branches*, a aplicação não sobe: "Found more than one migration with version 4", apontando `V4__descricao_produto.sql` e `V4__telefone_cliente.sql`. Nenhuma das duas rodou em produção. O que fazer?',
    opcoes: [
      'Renomear uma delas para a V5, conferindo que a ordem faz sentido',
      'Apagar a tabela de histórico e subir de novo',
      'Juntar as duas num arquivo só, chamado `V4__tudo.sql`, em todos os ambientes, inclusive os que já rodaram uma delas',
      'Ligar `outOfOrder=true`',
    ],
    resposta: 0,
    explicacao: 'Cada versão identifica uma única migração. Se uma delas já tivesse rodado em algum ambiente, ela manteria a V4, e a outra viraria a V5.',
  },
  {
    id: 'backend-junior-t5-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A loja já tem um banco em produção, criado à mão, e o time quer adotar o Flyway. Qual é o caminho?',
    opcoes: [
      'Registrar o estado atual como *baseline*, com `spring.flyway.baseline-on-migrate=true`, e escrever só as migrações seguintes',
      'Apagar o banco e recriá-lo pelas migrações',
      'Escrever uma V1 com todo o esquema e deixar o Flyway rodá-la sobre as tabelas existentes',
      'Não é possível: o Flyway só funciona em bancos vazios',
    ],
    resposta: 0,
    explicacao: 'A *baseline* diz ao Flyway que tudo até aquela versão já existe. Para criar ambientes novos do zero, o time ainda pode ter uma migração com o esquema inicial.',
  },
  {
    id: 'backend-junior-t5-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Em qual destas situações o `repair` do Flyway é a ferramenta certa?',
    opcoes: [
      'Depois que uma migração falhou no meio, num MySQL, e alguém já desfez à mão a parte aplicada',
      'Para aplicar migrações pendentes mais rápido',
      'Para desfazer a última migração aplicada',
      'Para permitir editar livremente migrações já aplicadas em produção',
    ],
    resposta: 0,
    explicacao: 'O `repair` remove do histórico as migrações que falharam e realinha os checksums com os arquivos. Ele não desfaz nada no esquema.',
  },
];

export default prova;
