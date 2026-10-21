import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t5-e04',
  minutos: 18,
  aula,
  armadilhas: [
    'Um laço que acessa um relacionamento preguiçoso de cada elemento faz uma consulta por elemento: o N+1.',
    'Trocar `LAZY` por `EAGER` não resolve: em JPQL, o Hibernate busca um por um logo depois, até o que não é usado.',
    '`join` sem `fetch` só filtra; não preenche o relacionamento, e o N+1 continua.',
    'Dois `join fetch` de `List` na mesma consulta lançam `MultipleBagFetchException`; trocar por `Set` esconde um produto cartesiano.',
    '`join fetch` de coleção com `setMaxResults` pode paginar na memória, trazendo a tabela inteira: pagine os ids primeiro.',
    'Com poucos dados de teste, o N+1 passa despercebido: conte as consultas, não só o tempo.',
  ],
  ia: {
    uso:
      'A IA reconhece o N+1 quando você mostra o log e propõe `join fetch`, `@EntityGraph` ou projeções. Ela também propõe soluções que trocam um problema por outro, como paginar um `join fetch` de coleção.',
    pedido:
      'Esta listagem faz uma consulta por pedido, como mostra o log abaixo. Proponha a correção com Spring Data JPA 4 e Hibernate 7.\n- Mostre o SQL antes e depois e quantas consultas cada versão faz para 50 pedidos.\n- Se a tela só lê dados, prefira uma projeção em DTO.\n- Não use EAGER no mapeamento nem paginação sobre join fetch de coleção.\n\n<cole aqui o método, o laço e o log do SQL>',
    erros: [
      'Sugere trocar `LAZY` por `EAGER`, que em JPQL mantém o N+1 e o espalha para toda consulta.',
      'Pagina um `join fetch` de coleção, que conta linhas do JOIN e pode paginar na memória.',
      'Junta duas listas no mesmo `join fetch`, recebe `MultipleBagFetchException` e corrige trocando `List` por `Set`.',
    ],
    conferir: [
      'Conte as consultas antes e depois, pelo log ou pelas estatísticas do Hibernate.',
      'Teste com muitos registros: o número de consultas deve ficar constante.',
      'Confira que a paginação acontece no próprio SQL, com `offset` e `fetch first`.',
    ],
  },
  recursos: [
    {
      titulo: 'A Short Guide to Hibernate 7: Association fetching',
      url: 'https://docs.hibernate.org/orm/7.0/introduction/html_single/#association-fetching',
      tipo: 'documentacao',
      porque: 'As estratégias de busca do Hibernate, com `join fetch`, busca em lote e subselect, explicadas por quem o mantém.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Data JPA: Configuring Fetch- and LoadGraphs',
      url: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.entity-graph',
      tipo: 'documentacao',
      porque: 'Como usar `@EntityGraph` nos métodos do repositório.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Vlad Mihalcea: N+1 query problem with JPA and Hibernate',
      url: 'https://vladmihalcea.com/n-plus-1-query-problem/',
      tipo: 'artigo',
      porque: 'O problema em cada tipo de relacionamento, com `EAGER` e `LAZY`, e como detectá-lo em testes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Vlad Mihalcea: The best way to fix the Hibernate MultipleBagFetchException',
      url: 'https://vladmihalcea.com/hibernate-multiplebagfetchexception/',
      tipo: 'artigo',
      porque: 'Por que trocar `List` por `Set` é a correção errada, e qual é a certa.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Vlad Mihalcea: Fixing the "firstResult/maxResults specified with collection fetch" warning',
      url: 'https://vladmihalcea.com/fix-hibernate-hhh000104-entity-fetch-pagination-warning-message/',
      tipo: 'artigo',
      porque: 'A paginação em memória e as formas de paginar coleções no banco.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Thorben Janssen: 5 ways to initialize lazy associations',
      url: 'https://thorben-janssen.com/5-ways-to-initialize-lazy-relations-and-when-to-use-them/',
      tipo: 'artigo',
      porque: 'Compara `join fetch`, grafos de entidade e outras formas de carregar relacionamentos, com quando usar cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevSuperior: Problema N+1, estudo de caso com Spring e JPA',
      url: 'https://www.youtube.com/watch?v=sqbqoR-lMf8',
      tipo: 'video',
      porque: 'Um caso real do começo ao fim: o log com consultas repetidas e as correções, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Canal do Ed: Relacionamentos JPA e o temível problema do N+1',
      url: 'https://www.youtube.com/watch?v=py_TnkBTjUw',
      tipo: 'video',
      porque: 'Como os relacionamentos geram o N+1 e as formas de lidar com ele, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Thorben Janssen: JOIN FETCH with Hibernate',
      url: 'https://www.youtube.com/watch?v=QAaTLLYdHJ0',
      tipo: 'video',
      porque: 'Seis minutos sobre o JOIN FETCH, de um dos maiores especialistas em Hibernate.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Busca em lote',
    enunciado:
      'Reproduza a busca em lote do Hibernate (`default_batch_fetch_size`). Um `Contexto` guarda os ids de clientes referenciados e ainda não carregados, numa ordem previsível, e os nomes já carregados. O método `referenciar(id)` só anota o id, como a criação de um proxy. O método `nome(id)`, se o cliente ainda não foi carregado, faz **uma** consulta com o id pedido e os próximos pendentes, até o tamanho do lote, completando as posições vazias com `null`, e imprime o SQL. Com pedidos dos clientes 7, 8, 7, 9, 10 e 11 e lote 2, a saída deve ser:\n\n```text\n   select id, nome from clientes where id in (7, 8)\npedido 1: Ana Lima\npedido 2: Bruno Souza\npedido 3: Ana Lima\n   select id, nome from clientes where id in (9, 10)\npedido 4: Carla Dias\npedido 5: Davi Rocha\n   select id, nome from clientes where id in (11, null)\npedido 6: Elisa Melo\nconsultas de clientes: 3\n```',
    dicas: [
      'Um `LinkedHashSet` guarda os pendentes sem repetição e na ordem em que foram referenciados.',
      'O lote começa pelo id pedido; depois, percorra os pendentes até completar o tamanho.',
      'Depois da consulta, mova cada id do lote dos pendentes para os carregados.',
      'Para as posições vazias, acrescente `"null"` à lista de parâmetros até ela ter o tamanho do lote.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Lotes {
    static final Map<Integer, String> CLIENTES = Map.of(
            7, "Ana Lima", 8, "Bruno Souza", 9, "Carla Dias", 10, "Davi Rocha", 11, "Elisa Melo");

    static class Contexto {
        final int tamanhoDoLote;
        final Set<Integer> pendentes = new LinkedHashSet<>();
        final Map<Integer, String> carregados = new HashMap<>();
        int consultas;

        Contexto(int tamanhoDoLote) {
            this.tamanhoDoLote = tamanhoDoLote;
        }

        /** Como criar um proxy: só anota o id, sem ir ao banco. */
        void referenciar(int id) {
            if (!carregados.containsKey(id)) pendentes.add(id);
        }

        /** O primeiro acesso carrega o id pedido e outros pendentes, até o tamanho do lote. */
        String nome(int id) {
            if (!carregados.containsKey(id)) {
                List<Integer> lote = new ArrayList<>();
                lote.add(id);
                for (int pendente : pendentes) {
                    if (lote.size() == tamanhoDoLote) break;
                    if (pendente != id) lote.add(pendente);
                }
                List<String> parametros = new ArrayList<>();
                for (int i = 0; i < tamanhoDoLote; i++) {
                    parametros.add(i < lote.size() ? String.valueOf(lote.get(i)) : "null");
                }
                consultas++;
                System.out.println("   select id, nome from clientes where id in (" + String.join(", ", parametros) + ")");
                for (int carregado : lote) {
                    carregados.put(carregado, CLIENTES.get(carregado));
                    pendentes.remove(carregado);
                }
            }
            return carregados.get(id);
        }
    }

    public static void main(String[] args) {
        int[][] pedidos = {{1, 7}, {2, 8}, {3, 7}, {4, 9}, {5, 10}, {6, 11}};
        Contexto contexto = new Contexto(2);
        for (int[] p : pedidos) contexto.referenciar(p[1]);
        for (int[] p : pedidos) System.out.println("pedido " + p[0] + ": " + contexto.nome(p[1]));
        System.out.println("consultas de clientes: " + contexto.consultas);
    }
}`,
    saida: '   select id, nome from clientes where id in (7, 8)\npedido 1: Ana Lima\npedido 2: Bruno Souza\npedido 3: Ana Lima\n   select id, nome from clientes where id in (9, 10)\npedido 4: Carla Dias\npedido 5: Davi Rocha\n   select id, nome from clientes where id in (11, null)\npedido 6: Elisa Melo\nconsultas de clientes: 3',
    comentarios:
      'Sem lote, seriam cinco consultas de clientes; com lote 2, três; com lote 10, uma. O Hibernate faz o mesmo com uma fila de proxies pendentes no contexto de persistência: ao inicializar um, aproveita para inicializar outros da mesma entidade. O `null` no fim mantém o comando sempre com o mesmo número de parâmetros, para que o banco reaproveite o plano. A busca em lote não elimina o N+1, só o divide pelo tamanho do lote, e por isso é uma rede de proteção: nas telas que você conhece, `join fetch`, `@EntityGraph` ou uma projeção continuam sendo a resposta.',
  },
  exercicios: [
    {
      id: 'backend-junior-t5-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Uma listagem busca 50 pedidos e, para cada um, chama `pedido.getCliente().getNome()`, com o cliente `LAZY`. Quantas consultas isso pode fazer?',
      opcoes: [
        'Até 51: uma para os pedidos e uma para cada cliente diferente',
        'Uma só',
        'Duas: uma para os pedidos e uma para todos os clientes',
        '50: uma por pedido, com o cliente junto',
      ],
      resposta: 0,
      explicacao: 'É o N+1: o "1" é a consulta da lista, e cada relacionamento acessado acrescenta uma. Clientes repetidos já estão no contexto e não geram consulta nova.',
    },
    {
      id: 'backend-junior-t5-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na aula, quatro pedidos geraram só três consultas de clientes. Por quê?',
      opcoes: [
        'A Ana tinha dois pedidos, e o contexto de persistência já a tinha carregado no primeiro',
        'O Hibernate pulou um pedido',
        'O H2 guardou a consulta em cache',
        'A busca em lote estava ligada',
      ],
      resposta: 0,
      explicacao: 'O contexto de persistência garante um objeto por linha. O proxy do cliente 1 no pedido 3 é o mesmo do pedido 1, já inicializado.',
    },
    {
      id: 'backend-junior-t5-e04-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa conta as consultas de uma listagem com N+1, considerando o contexto de persistência. Digite a saída exata.',
      codigo: `import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Teste {
    public static void main(String[] args) {
        List<Integer> clienteDeCadaPedido = List.of(5, 3, 5, 8, 3, 5);
        Set<Integer> noContexto = new HashSet<>();
        int consultas = 1;
        for (int cliente : clienteDeCadaPedido) {
            if (noContexto.add(cliente)) consultas++;
        }
        System.out.println("pedidos: " + clienteDeCadaPedido.size() + ", consultas: " + consultas);
    }
}`,
      resposta: 'pedidos: 6, consultas: 4',
      explicacao: 'Uma consulta para a lista e uma para cada cliente distinto: 5, 3 e 8. O `add` devolve `false` para os que já estão no conjunto.',
    },
    {
      id: 'backend-junior-t5-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre `select p from Pedido p join p.cliente c where c.nome = :nome` e `select p from Pedido p join fetch p.cliente`?',
      opcoes: [
        'O `join` comum só liga as tabelas para filtrar; o `join fetch` também preenche o cliente de cada pedido',
        'Nenhuma: os dois carregam o cliente',
        'O `join fetch` só funciona com `@OneToMany`',
        'O `join` comum faz uma consulta por pedido',
      ],
      resposta: 0,
      explicacao: 'Com o `join` comum, o cliente continua sendo um proxy, e acessá-lo no laço volta ao N+1. Só o `fetch` manda carregar.',
    },
    {
      id: 'backend-junior-t5-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para acabar com o N+1, alguém trocou o `@ManyToOne(fetch = LAZY)` do cliente por `EAGER`. O que acontece com `select p from Pedido p`?',
      opcoes: [
        'O N+1 continua: o Hibernate busca cada cliente logo depois da consulta, e agora em toda consulta de pedidos, mesmo nas que não usam o cliente',
        'O Hibernate passa a fazer um JOIN, e o problema some',
        'A consulta não compila',
        'Os clientes deixam de ser buscados',
      ],
      resposta: 0,
      explicacao: 'Na aula, com `EAGER`, uma listagem que só contava itens passou de 5 para 8 consultas. `EAGER` decide quando buscar, não como.',
    },
    {
      id: 'backend-junior-t5-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `@EntityGraph(attributePaths = "cliente")` faz num método de repositório do Spring Data?',
      opcoes: [
        'Faz aquela consulta buscar o cliente junto, como um `join fetch`, sem mudar o mapeamento da entidade',
        'Muda o cliente para `EAGER` em toda a aplicação',
        'Cria um índice na coluna `cliente_id`',
        'Faz o método devolver só o cliente',
      ],
      resposta: 0,
      explicacao: 'Na aula, o SQL foi idêntico ao do `join fetch`. O plano de busca vale só para o método anotado.',
    },
    {
      id: 'backend-junior-t5-e04-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado:
        'Com `default_batch_fetch_size=10`, uma listagem busca 25 pedidos, cada um de um cliente diferente, e mostra o nome de todos. Quantas consultas são feitas no total?',
      opcoes: ['4', '26', '2', '3'],
      resposta: 0,
      explicacao: 'Uma para os pedidos e três para os clientes: 10, 10 e 5, a última completada com `null`. Sem o lote, seriam 26.',
    },
    {
      id: 'backend-junior-t5-e04-q08',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'O programa divide os ids em consultas de lote, como o Hibernate. Digite a saída exata.',
      codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    public static void main(String[] args) {
        List<Integer> ids = List.of(11, 12, 13, 14, 15, 16, 17);
        int lote = 3;
        List<List<Integer>> consultas = new ArrayList<>();
        for (int i = 0; i < ids.size(); i += lote) {
            List<Integer> parametros = new ArrayList<>(ids.subList(i, Math.min(i + lote, ids.size())));
            while (parametros.size() < lote) parametros.add(null);
            consultas.add(parametros);
        }
        System.out.println(consultas);
    }
}`,
      resposta: '[[11, 12, 13], [14, 15, 16], [17, null, null]]',
      explicacao: 'Sete ids em lotes de três dão três consultas, e a última é completada com `null` para manter o mesmo formato de comando.',
    },
    {
      id: 'backend-junior-t5-e04-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado:
        '`select c from Cliente c join fetch c.pedidos p join fetch p.itens`, com `pedidos` e `itens` declarados como `List`, lança `MultipleBagFetchException`. Qual é a melhor saída?',
      opcoes: [
        'Buscar uma coleção por consulta, ou usar a busca em lote; trocar por `Set` some com o erro, mas mantém um produto cartesiano',
        'Trocar as duas por `Set`, que resolve o problema por completo',
        'Marcar as duas coleções como `EAGER`',
        'Usar `select distinct`',
      ],
      resposta: 0,
      explicacao: 'Buscar duas coleções na mesma consulta multiplica as linhas: cada pedido vem repetido para cada item. O erro protege você desse resultado.',
    },
    {
      id: 'backend-junior-t5-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que `select p from Pedido p join fetch p.itens` com `setMaxResults(20)` é perigoso?',
      opcoes: [
        'O limite do SQL contaria linhas do JOIN, e não pedidos; para acertar, o Hibernate pode trazer tudo e paginar na memória',
        'Porque `setMaxResults` não funciona em JPQL',
        'Porque devolve sempre 20 itens, e não 20 pedidos',
        'Não há perigo: o banco pagina corretamente',
      ],
      resposta: 0,
      explicacao: 'O aviso `HHH90003004` denuncia a paginação em memória. A forma segura é paginar os ids e depois buscar os pedidos com os itens.',
    },
    {
      id: 'backend-junior-t5-e04-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais formas reduzem as consultas de uma listagem de pedidos com o nome do cliente? Escolha três.',
      opcoes: [
        '`join fetch p.cliente` na consulta',
        '`@EntityGraph(attributePaths = "cliente")` no método do repositório',
        '`spring.jpa.properties.hibernate.default_batch_fetch_size=10`',
        'Trocar o relacionamento para `FetchType.EAGER`',
        'Religar o `spring.jpa.open-in-view`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'As duas primeiras fazem uma consulta só; a busca em lote divide o N pelo tamanho do lote. O `EAGER` mantém o N+1, e o `open-in-view` só muda onde ele acontece.',
    },
    {
      id: 'backend-junior-t5-e04-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a forma mais simples de perceber um N+1 durante o desenvolvimento?',
      opcoes: [
        'Ligar o log do SQL (`logging.level.org.hibernate.SQL=DEBUG`) e ver consultas repetidas com ids diferentes',
        'Medir o tempo da requisição com poucos dados',
        'Ler o código das entidades',
        'Olhar o uso de memória da JVM',
      ],
      resposta: 0,
      explicacao: 'O N+1 é invisível no código e gritante no log. Com poucos dados, o tempo engana: cada consulta é rápida.',
    },
    {
      id: 'backend-junior-t5-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa junta as linhas de um `join fetch` como o Hibernate 6 em diante faz. Qual é a saída?',
      codigo: `import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Teste {
    record Linha(int pedido, String item) {}

    public static void main(String[] args) {
        List<Linha> linhas = List.of(new Linha(1, "Teclado"), new Linha(1, "Mouse"), new Linha(2, "Monitor"));
        Map<Integer, List<String>> pedidos = new LinkedHashMap<>();
        for (Linha l : linhas) {
            pedidos.computeIfAbsent(l.pedido(), k -> new ArrayList<>()).add(l.item());
        }
        System.out.println(linhas.size() + " " + pedidos.size() + " " + pedidos);
    }
}`,
      opcoes: [
        '`3 2 {1=[Teclado, Mouse], 2=[Monitor]}`',
        '`3 3 {1=[Teclado], 1=[Mouse], 2=[Monitor]}`',
        '`3 2 {1=[Mouse], 2=[Monitor]}`',
        '`2 2 {1=[Teclado, Mouse], 2=[Monitor]}`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Três linhas do banco viram dois pedidos, porque as linhas do mesmo pedido se juntam. No Hibernate 5, a lista vinha com o pedido 1 repetido, e era preciso `distinct`.',
    },
    {
      id: 'backend-junior-t5-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma rota só leitura devolve, em JSON, o id do pedido, o nome do cliente e a quantidade de itens. Qual é a forma mais eficiente?',
      opcoes: [
        'Uma projeção em DTO: `select new ...ResumoPedido(p.id, c.nome, count(i)) ...`, numa consulta',
        'Buscar as entidades com `join fetch` dos clientes e dos itens e contar na memória',
        'Buscar com `findAll()` e deixar a serialização carregar o resto',
        'Uma consulta por pedido, para não carregar dados demais',
      ],
      resposta: 0,
      explicacao: 'A projeção traz só as colunas da resposta, deixa a contagem para o banco e não cria entidades gerenciadas.',
    },
    {
      id: 'backend-junior-t5-e04-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um teste conta as consultas de uma listagem: com 3 pedidos, 4 consultas; com 30 pedidos, 31. O que isso indica?',
      opcoes: [
        'Um N+1: o número de consultas cresce com os dados, quando deveria ficar constante',
        'Que o banco está lento',
        'Que o teste está errado: o número sempre cresce',
        'Que a busca em lote está ligada',
      ],
      resposta: 0,
      explicacao: 'Uma listagem bem resolvida faz o mesmo número de consultas para 3 ou 3.000 pedidos. Testar esse número protege contra regressões.',
    },
  ],
};

export default episodio;
