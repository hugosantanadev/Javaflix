import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t5-e02',
  minutos: 17,
  aula,
  armadilhas: [
    'Nomes de métodos derivados usam os atributos da entidade, não as colunas: `findByCriadoEm`, não `findByCriado_em`.',
    'Um atributo digitado errado no nome do método impede a aplicação de subir.',
    'Páginas começam em 0: `PageRequest.of(1, 20)` é a segunda página.',
    'Cada `Page` faz um `count` extra; em tabelas enormes, prefira `Slice`.',
    '`save` numa entidade destacada faz `merge`: um `SELECT` antes do `UPDATE`.',
    'Atualizações `@Modifying` não passam pelo contexto de persistência: entidades já carregadas ficam com valores antigos.',
    'JPQL fala de entidades e atributos (`from Produto p where p.preco`), não de tabelas e colunas.',
  ],
  ia: {
    uso:
      'Para consultas, a IA sugere bem nomes de métodos derivados e escreve JPQL. Peça sempre o SQL resultante e desconfie de nomes muito longos ou de consultas que trazem tudo para filtrar na memória.',
    pedido:
      'Escreva no ProdutoRepository (Spring Data JPA 4) um método que busque produtos ATIVOS por trecho do nome, sem diferenciar maiúsculas, ordenados por preço e com paginação.\n- Use parâmetros, nunca concatenação de texto na consulta.\n- Se o nome derivado passar de três condições, use @Query com um nome que diga a intenção.\n- Mostre o SQL que o Hibernate vai gerar e quantas consultas a paginação faz.\n\n<cole aqui a entidade>',
    erros: [
      'Monta JPQL ou SQL concatenando texto vindo do usuário, o que abre caminho para injeção de SQL.',
      'Inventa palavras que o Spring Data não reconhece nos nomes de métodos, ou usa o nome da coluna no lugar do atributo.',
      'Usa `findAll()` e filtra com streams na memória, trazendo a tabela inteira.',
    ],
    conferir: [
      'Suba a aplicação: nomes derivados inválidos falham na inicialização.',
      'Leia o SQL no log e confira que os valores chegam como parâmetros (`?`), e não concatenados.',
      'Teste com `@DataJpaTest`, usando dados que diferenciem maiúsculas, acentos e ordem.',
    ],
  },
  recursos: [
    {
      titulo: 'Spring Data JPA: Reference Documentation',
      url: 'https://docs.spring.io/spring-data/jpa/reference/',
      tipo: 'documentacao',
      porque: 'A documentação completa dos repositórios, das consultas e das projeções.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Data JPA: Query Methods',
      url: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html',
      tipo: 'documentacao',
      porque: 'A tabela com todas as palavras aceitas nos nomes de métodos e o JPQL que cada uma gera.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Data JPA: Projections',
      url: 'https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html',
      tipo: 'documentacao',
      porque: 'Projeções por interface, por classe e dinâmicas.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Guides: Accessing Data with JPA',
      url: 'https://spring.io/guides/gs/accessing-data-jpa/',
      tipo: 'tutorial',
      porque: 'O guia oficial, curto, de um primeiro repositório com Spring Boot.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: java.lang.reflect.Proxy',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/reflect/Proxy.html',
      tipo: 'documentacao',
      porque: 'O mecanismo do JDK que cria implementações de interfaces em tempo de execução, usado no desafio.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Dev Eficiente: O poder da geração de queries no Spring Data JPA',
      url: 'https://www.youtube.com/watch?v=hJr1fryXzwA',
      tipo: 'video',
      porque: 'Consultas derivadas do nome dos métodos, com os limites de cada abordagem, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Dev Eficiente: Paginação e consultas dinâmicas com Spring Data JPA',
      url: 'https://www.youtube.com/watch?v=1bTg0tEJAqQ',
      tipo: 'video',
      porque: 'Pageable, Page e consultas montadas em tempo de execução, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Turbinando a camada de persistência com Spring Data JPA',
      url: 'https://www.youtube.com/watch?v=AzbydpkeHtk',
      tipo: 'video',
      porque: 'Repositórios, consultas e boas práticas, de quem ensina Spring há anos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Michelli Brito: Spring Data JPA, curso 2024',
      url: 'https://www.youtube.com/watch?v=Ca30sv9EbLo',
      tipo: 'video',
      porque: 'Quase duas horas de Spring Data JPA, para aprofundar, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Um repositório sem implementação',
    enunciado:
      'Crie, com `java.lang.reflect.Proxy`, uma implementação em tempo de execução para interfaces de repositório sobre uma lista de `record`s. O método `criar(interface, tipo, dados)` deve, primeiro, conferir todos os métodos `findBy...` da interface contra os componentes do `record`, lançando `No property \'x\' found for type \'Produto\'` se algum não existir, como o Spring Data faz na inicialização. Depois, devolve o proxy, que atende `findById`, `findAll`, `count` e métodos `findByAtributo` (igualdade) e `findByAtributoGreaterThan` (maior que). A saída deve ser:\n\n```text\né um proxy: true\nfindById(2): Optional[Produto[id=2, nome=Mouse sem fio, preco=129.90, status=ATIVO]]\ncount(): 4\nfindByStatus("ESGOTADO"): [Produto[id=4, nome=Headset, preco=259.90, status=ESGOTADO]]\nfindByPrecoGreaterThan(300): [Teclado mecânico, Monitor 27]\nRepositorioErrado: No property \'nomee\' found for type \'Produto\'\n```',
    dicas: [
      '`Proxy.newProxyInstance(carregador, new Class<?>[] {interfaceDoRepositorio}, (proxy, metodo, args) -> ...)` cria o objeto.',
      'Dentro do `InvocationHandler`, um `switch` no `metodo.getName()` decide o que fazer.',
      'O atributo de `findByPrecoGreaterThan` é o resto do nome sem `findBy` e sem `GreaterThan`, com a inicial minúscula.',
      'Para comparar valores de tipos variados, um cast para `Comparable<Object>` resolve `BigDecimal`, `String` e números.',
    ],
    solucao: `import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.RecordComponent;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Repositorios {
    record Produto(Long id, String nome, BigDecimal preco, String status) {}

    interface ProdutoRepository {
        Optional<Produto> findById(Long id);
        List<Produto> findAll();
        long count();
        List<Produto> findByStatus(String status);
        List<Produto> findByPrecoGreaterThan(BigDecimal valor);
    }

    interface RepositorioErrado {
        List<Produto> findByNomee(String nome);
    }

    static RecordComponent propriedade(Class<?> tipo, String nome) {
        return Arrays.stream(tipo.getRecordComponents())
                .filter(c -> c.getName().equals(nome))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(
                        "No property '" + nome + "' found for type '" + tipo.getSimpleName() + "'"));
    }

    static String nomeDaPropriedade(Method m) {
        String resto = m.getName().substring("findBy".length()).replace("GreaterThan", "");
        return Character.toLowerCase(resto.charAt(0)) + resto.substring(1);
    }

    @SuppressWarnings("unchecked")
    static <T, E extends Record> T criar(Class<T> interfaceDoRepositorio, Class<E> tipo, List<E> dados) {
        for (Method m : interfaceDoRepositorio.getMethods()) {
            if (m.getName().startsWith("findBy") && !m.getName().equals("findById")) {
                propriedade(tipo, nomeDaPropriedade(m));
            }
        }
        return (T) Proxy.newProxyInstance(interfaceDoRepositorio.getClassLoader(), new Class<?>[] {interfaceDoRepositorio},
                (proxy, metodo, args) -> switch (metodo.getName()) {
                    case "findById" -> dados.stream().filter(e -> valor(e, propriedade(tipo, "id")).equals(args[0])).findFirst();
                    case "findAll" -> List.copyOf(dados);
                    case "count" -> (long) dados.size();
                    default -> {
                        RecordComponent c = propriedade(tipo, nomeDaPropriedade(metodo));
                        boolean maiorQue = metodo.getName().endsWith("GreaterThan");
                        yield dados.stream().filter(e -> {
                            Object v = valor(e, c);
                            return maiorQue ? ((Comparable<Object>) v).compareTo(args[0]) > 0 : v.equals(args[0]);
                        }).toList();
                    }
                });
    }

    static Object valor(Record e, RecordComponent c) {
        try {
            return c.getAccessor().invoke(e);
        } catch (ReflectiveOperationException ex) {
            throw new IllegalStateException(ex);
        }
    }

    public static void main(String[] args) {
        List<Produto> dados = List.of(
                new Produto(1L, "Teclado mecânico", new BigDecimal("349.90"), "ATIVO"),
                new Produto(2L, "Mouse sem fio", new BigDecimal("129.90"), "ATIVO"),
                new Produto(3L, "Monitor 27", new BigDecimal("1899.00"), "ATIVO"),
                new Produto(4L, "Headset", new BigDecimal("259.90"), "ESGOTADO"));
        ProdutoRepository repo = criar(ProdutoRepository.class, Produto.class, dados);
        System.out.println("é um proxy: " + Proxy.isProxyClass(repo.getClass()));
        System.out.println("findById(2): " + repo.findById(2L));
        System.out.println("count(): " + repo.count());
        System.out.println("findByStatus(\\"ESGOTADO\\"): " + repo.findByStatus("ESGOTADO"));
        System.out.println("findByPrecoGreaterThan(300): " + repo.findByPrecoGreaterThan(new BigDecimal("300")).stream().map(Produto::nome).toList());
        try {
            criar(RepositorioErrado.class, Produto.class, dados);
        } catch (IllegalStateException e) {
            System.out.println("RepositorioErrado: " + e.getMessage());
        }
    }
}`,
    saida: "é um proxy: true\nfindById(2): Optional[Produto[id=2, nome=Mouse sem fio, preco=129.90, status=ATIVO]]\ncount(): 4\nfindByStatus(\"ESGOTADO\"): [Produto[id=4, nome=Headset, preco=259.90, status=ESGOTADO]]\nfindByPrecoGreaterThan(300): [Teclado mecânico, Monitor 27]\nRepositorioErrado: No property 'nomee' found for type 'Produto'",
    comentarios:
      'Nenhuma classe implementa `ProdutoRepository`, e mesmo assim o objeto funciona: o `Proxy` cria, em tempo de execução, uma classe que implementa a interface e encaminha cada chamada ao mesmo `InvocationHandler`. A validação antes de criar o proxy é a mesma ideia que faz o Spring Data recusar `findByNomee` na inicialização: o erro aparece quando a aplicação sobe, e não quando um cliente chama a rota. O Spring Data faz isso com muito mais cuidado: analisa os nomes uma vez, guarda a consulta pronta de cada método, delega os métodos de `JpaRepository` à `SimpleJpaRepository` e trata os métodos de `Object`, como `toString` e `equals`, que este proxy simples não trata.',
  },
  exercicios: [
    {
      id: 'backend-junior-t5-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em `interface PedidoRepository extends JpaRepository<Pedido, Long>`, o que os tipos genéricos indicam?',
      opcoes: [
        'A entidade gerenciada e o tipo do id dela',
        'A tabela e o banco de dados',
        'O tipo de retorno e o tipo do parâmetro de todos os métodos',
        'O controller e o serviço que usam o repositório',
      ],
      resposta: 0,
      explicacao: 'Com eles, os métodos herdados ficam tipados: `findById(Long)` devolve `Optional<Pedido>`.',
    },
    {
      id: 'backend-junior-t5-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Que consulta o Spring Data gera para `findByNomeContainingIgnoreCase(String trecho)`?',
      opcoes: [
        'Um `like` com o trecho envolvido em `%`, comparando os dois lados em maiúsculas',
        'Um `=` exato',
        'Uma busca textual com índice próprio',
        'Nenhuma: o nome é inválido',
      ],
      resposta: 0,
      explicacao: 'Na aula, o SQL foi `upper(p1_0.nome) like upper(?) escape \'\\\'`, com os caracteres especiais do valor escapados.',
    },
    {
      id: 'backend-junior-t5-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O repositório declara `List<Produto> findByValor(BigDecimal valor)`, mas a entidade tem `preco`, e não `valor`. Quando o erro aparece?',
      opcoes: [
        'Na inicialização: a aplicação não sobe, com "No property \'valor\' found for type \'Produto\'"',
        'Só quando o método for chamado',
        'Na compilação, pelo `javac`',
        'Nunca: o método devolve uma lista vazia',
      ],
      resposta: 0,
      explicacao: 'O Spring Data analisa todos os métodos derivados ao criar o repositório, o que transforma o erro em falha de inicialização.',
    },
    {
      id: 'backend-junior-t5-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual destas consultas é JPQL válido para a entidade `Produto`, mapeada na tabela `produtos`, com o campo `criadoEm` na coluna `criado_em`?',
      opcoes: [
        '`select p from Produto p where p.criadoEm > :data`',
        '`select * from produtos where criado_em > :data`',
        '`select p from produtos p where p.criado_em > :data`',
        '`select p from Produto p where criado_em > :data`',
      ],
      resposta: 0,
      explicacao: 'JPQL usa o nome da entidade e dos atributos Java. A segunda opção é SQL, que exigiria `nativeQuery = true`.',
    },
    {
      id: 'backend-junior-t5-e02-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual `PageRequest` busca a primeira página, com 20 itens?',
      opcoes: ['`PageRequest.of(0, 20)`', '`PageRequest.of(1, 20)`', '`PageRequest.of(20, 1)`', '`PageRequest.of(20, 0)`'],
      resposta: 0,
      explicacao: 'O número da página começa em 0. A API, se quiser, pode mostrar páginas a partir de 1 e subtrair antes de chamar o repositório.',
    },
    {
      id: 'backend-junior-t5-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um método que devolve `Page<Pedido>` ficou lento numa tabela de 80 milhões de linhas, embora cada página tenha só 20 pedidos. Qual é a causa provável e a alternativa?',
      opcoes: [
        'O `count` extra que o `Page` faz para calcular o total; um `Slice`, que só diz se há próxima página, dispensa o `count`',
        'O `Page` busca todas as linhas e corta na memória',
        'A ordenação; basta remover o `Sort`',
        'O `Page` não usa índices',
      ],
      resposta: 0,
      explicacao: 'Na aula, cada página gerou dois SQLs: a busca e o `count`. Contar milhões de linhas filtradas pode custar mais que buscar 20 delas.',
    },
    {
      id: 'backend-junior-t5-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `repo.save(new Produto("Mouse", preco))` faz, sendo o `id` gerado pelo banco?',
      opcoes: [
        'Um `persist`: o id é nulo, e sai um `INSERT`',
        'Um `merge`: busca o produto e depois atualiza',
        'Nada, até alguém chamar `flush`',
        'Um `UPDATE` com id nulo',
      ],
      resposta: 0,
      explicacao: 'O `save` decide pelo id: nulo é entidade nova. Com id preenchido, ele faz `merge`, com um `SELECT` antes.',
    },
    {
      id: 'backend-junior-t5-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Numa transação, o código carrega o produto 2, chama `reajustarTodos(1.10)` (um `@Modifying` que atualiza todos os preços) e lê `produto.getPreco()`. Que valor aparece?',
      opcoes: [
        'O preço antigo: a atualização em massa foi direto ao banco, sem mexer na entidade já carregada',
        'O preço novo, atualizado automaticamente',
        'Um erro de concorrência',
        '`null`',
      ],
      resposta: 0,
      explicacao: 'O contexto de persistência não sabe da atualização em massa. Recarregue a entidade, ou use `@Modifying(clearAutomatically = true)`, que limpa o contexto.',
    },
    {
      id: 'backend-junior-t5-e02-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'A entidade `Produto` tem os atributos `id`, `nome`, `preco` e `status`. Quais métodos são consultas derivadas válidas? Escolha dois.',
      opcoes: [
        '`List<Produto> findByStatusOrderByPrecoDesc(Status status)`',
        '`long countByPrecoLessThan(BigDecimal limite)`',
        '`List<Produto> findByCategoria(String categoria)`',
        '`List<Produto> findByNomeIgual(String nome)`',
        '`List<Produto> findByPreco_Valor(BigDecimal valor)`',
      ],
      respostas: [0, 1],
      explicacao: 'Não há atributo `categoria`, `Igual` não é uma palavra do Spring Data, e `Preco_Valor` procuraria um atributo `valor` dentro de `preco`.',
    },
    {
      id: 'backend-junior-t5-e02-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa traduz as condições de um nome de método, como o Spring Data. Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        String metodo = "findByStatusAndPrecoGreaterThan";
        String[] partes = metodo.substring(metodo.indexOf("By") + 2).split("And");
        StringBuilder sb = new StringBuilder();
        int n = 0;
        for (String p : partes) {
            boolean maior = p.endsWith("GreaterThan");
            String campo = p.replace("GreaterThan", "");
            campo = Character.toLowerCase(campo.charAt(0)) + campo.substring(1);
            if (n > 0) sb.append(" and ");
            sb.append(campo).append(maior ? " > ?" : " = ?").append(++n);
        }
        System.out.println(sb);
    }
}`,
      resposta: 'status = ?1 and preco > ?2',
      explicacao: 'Cada trecho entre `And` vira uma condição, e os parâmetros do método são ligados na ordem: o primeiro ao status, o segundo ao preço.',
    },
    {
      id: 'backend-junior-t5-e02-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.reflect.Proxy;

public class Teste {
    interface Repositorio { String findByNome(String nome); }

    public static void main(String[] args) {
        Repositorio r = (Repositorio) Proxy.newProxyInstance(
                Repositorio.class.getClassLoader(),
                new Class<?>[] {Repositorio.class},
                (proxy, metodo, argumentos) -> metodo.getName() + "(" + argumentos[0] + ")");
        System.out.println(r.findByNome("Ana") + " " + Proxy.isProxyClass(r.getClass()));
    }
}`,
      opcoes: ['`findByNome(Ana) true`', '`null true`', '`Ana false`', 'Não compila: a interface não tem implementação'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O proxy implementa a interface em tempo de execução, e toda chamada vai para o *handler*, que recebe o `Method` e os argumentos. É a base dos repositórios do Spring Data.',
    },
    {
      id: 'backend-junior-t5-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma tela lista nome e preço de 5.000 produtos. Por que uma projeção `select new ResumoProduto(p.nome, p.preco)` é melhor que `findAll()`?',
      opcoes: [
        'Busca só duas colunas e não cria entidades gerenciadas, que passariam pela verificação de sujeira',
        'Porque `findAll()` não funciona com mais de mil linhas',
        'Porque projeções são guardadas em cache para sempre',
        'Não há diferença de desempenho',
      ],
      resposta: 0,
      explicacao: 'Menos dados trafegam, e o Hibernate não precisa guardar fotografias de 5.000 entidades para comparar no fim da transação.',
    },
    {
      id: 'backend-junior-t5-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o `existsByNome` da aula gerou `select p1_0.id ... fetch first ? rows only`?',
      opcoes: [
        'Para saber se existe, basta achar uma linha: o banco para na primeira, sem contar todas',
        'Porque o Spring Data não sabe fazer `count`',
        'Para ordenar os resultados',
        'Porque o H2 não aceita `exists`',
      ],
      resposta: 0,
      explicacao: 'Um `count(*) > 0` contaria todas as linhas que casam. O `exists` só precisa de uma.',
    },
    {
      id: 'backend-junior-t5-e02-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Os métodos de busca herdados de `JpaRepository`, chamados fora de qualquer `@Transactional`, rodam em que tipo de transação?',
      opcoes: [
        'Numa transação própria, marcada como só leitura',
        'Sem transação nenhuma',
        'Numa transação que só termina quando a aplicação encerra',
        'Numa transação de escrita, sempre',
      ],
      resposta: 0,
      explicacao: 'A implementação padrão, `SimpleJpaRepository`, é anotada com `@Transactional(readOnly = true)`, e os métodos de escrita sobrescrevem isso.',
    },
    {
      id: 'backend-junior-t5-e02-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que fazer com um método chamado `findByStatusAndPrecoGreaterThanAndNomeContainingIgnoreCaseAndCriadoEmAfterOrderByPrecoDesc`?',
      opcoes: [
        'Reescrevê-lo com `@Query` e um nome que diga a intenção, como `buscarVitrine`',
        'Nada: nomes longos são a forma recomendada',
        'Dividi-lo em quatro repositórios',
        'Trocar `And` por `Or`',
      ],
      resposta: 0,
      explicacao: 'Consultas derivadas são ótimas para casos simples. Quando o nome vira uma frase, a consulta escrita fica mais legível e mais fácil de mudar.',
    },
  ],
};

export default episodio;
