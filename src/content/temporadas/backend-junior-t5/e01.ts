import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t5-e01',
  minutos: 17,
  aula,
  armadilhas: [
    'Sem `@Enumerated(EnumType.STRING)`, o `enum` é gravado pela posição, e uma constante nova no meio muda o significado dos dados antigos.',
    '`ddl-auto=create` apaga as tabelas a cada inicialização; em produção, `validate` ou `none` com migrações.',
    'Alterar uma entidade gerenciada já gera `UPDATE` no fim da transação, mesmo sem chamar nenhum método de salvar.',
    'Alterar uma entidade destacada, fora da transação, não muda nada no banco até um `merge`.',
    'Entidades não podem ser `final` nem `record`s: o Hibernate precisa criar subclasses e instanciá-las por reflexão.',
    '`equals` e `hashCode` pelo `id` quebram com entidades novas, que ainda não têm id.',
    'Devolver entidades direto na API expõe campos e relacionamentos que ninguém decidiu expor.',
  ],
  ia: {
    uso:
      'A IA escreve entidades JPA rapidamente a partir de uma tabela ou de uma descrição, e explica o SQL que o Hibernate gera. Ela erra nos detalhes que mudaram entre versões e nos que só aparecem em produção, como enums gravados pela posição.',
    pedido:
      'Crie a entidade JPA Produto para a tabela abaixo, no Spring Boot 4.1 com Hibernate 7 (pacote jakarta.persistence).\n- Use @Enumerated(EnumType.STRING) para o status e BigDecimal com precision e scale para o preço.\n- Construtor protegido sem argumentos e sem setters públicos para o que não deve mudar livremente.\n- Não exponha a entidade na API: proponha também um DTO de resposta.\n- Explique o SQL que o Hibernate vai gerar no INSERT.\n\n<cole aqui o create table>',
    erros: [
      'Importa `javax.persistence`, o pacote antigo; desde o Jakarta EE 9 e o Spring Boot 3, o certo é `jakarta.persistence`.',
      'Deixa o enum sem `@Enumerated(EnumType.STRING)`, gravando a posição, que muda quando alguém acrescenta um valor no meio.',
      'Gera `@Data` do Lombok na entidade, com `equals`, `hashCode` e `toString` sobre todos os campos, inclusive relacionamentos.',
    ],
    conferir: [
      'Ligue `logging.level.org.hibernate.SQL=DEBUG` e leia o SQL de cada operação.',
      'Suba com `ddl-auto=validate` contra o banco migrado: as divergências aparecem na inicialização.',
      'Confira o tipo e o tamanho de cada coluna no `create table`.',
    ],
  },
  recursos: [
    {
      titulo: 'Spring Boot: Spring Data JPA',
      url: 'https://docs.spring.io/spring-boot/reference/data/sql.html#data.sql.jpa-and-spring-data',
      tipo: 'documentacao',
      porque: 'Como o Spring Boot configura o JPA, o `ddl-auto` e as entidades.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Hibernate ORM: Introduction to Hibernate 7',
      url: 'https://docs.hibernate.org/orm/7.0/introduction/html_single/',
      tipo: 'documentacao',
      porque: 'O guia introdutório oficial: entidades, contexto de persistência e as boas práticas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakarta Persistence 3.2 Specification',
      url: 'https://jakarta.ee/specifications/persistence/3.2/',
      tipo: 'documentacao',
      porque: 'A especificação do JPA, com as regras para as classes de entidade e o ciclo de vida.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Vlad Mihalcea: How does Hibernate dirty checking work?',
      url: 'https://vladmihalcea.com/the-anatomy-of-hibernate-dirty-checking/',
      tipo: 'artigo',
      porque: 'Como o Hibernate compara as entidades com as fotografias para gerar os `UPDATE`s.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevSuperior: Introdução a JPA e Hibernate',
      url: 'https://www.youtube.com/watch?v=CAP1IPgeJkw',
      tipo: 'video',
      porque: 'Entidades, EntityManager e o ciclo de vida, numa aula completa, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Gabriel Braga: JDBC, JPA, Hibernate e Spring Data JPA, qual a diferença?',
      url: 'https://www.youtube.com/watch?v=U4janhsOVSw',
      tipo: 'video',
      porque: 'As quatro camadas de acesso a dados e o papel de cada uma, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Thorben Janssen: Entity Lifecycle Model',
      url: 'https://www.youtube.com/watch?v=Y7PpjerZkc0',
      tipo: 'video',
      porque: 'Os estados de uma entidade, explicados por um dos maiores especialistas em Hibernate.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Thorben Janssen: save, persist, merge e update',
      url: 'https://www.youtube.com/watch?v=SH29O-bcQlc',
      tipo: 'video',
      porque: 'A diferença entre as operações de gravação, com o SQL de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Um contexto de persistência',
    enunciado:
      'Implemente o coração do `EntityManager`: um contexto que, no `find(id)`, devolve a entidade já gerenciada se houver, ou faz um "select" no banco (um `Map` de linhas), cria a entidade e guarda uma **fotografia** dos valores lidos. No `commit()`, compare cada entidade gerenciada com a sua fotografia e imprima um "update" só com as colunas que mudaram, ou avise que não houve alterações. Depois do commit, o contexto fica vazio. Com o roteiro do `main`, a saída deve ser:\n\n```text\nselect produto 1\nmesmo objeto: true\nselect produto 2\nupdate produtos set preco=379.90, status=\'ESGOTADO\' where id=1\nproduto 2 sem alterações: nenhum update\nselect produto 1\nna próxima transação: 379.90\nproduto 1 sem alterações: nenhum update\nselects: 3, updates: 1\n```\n\nO roteiro busca o produto 1 duas vezes e o 2 uma vez, muda o preço e o status do 1, "muda" o nome do 2 para o mesmo valor, confirma, e depois lê o produto 1 numa nova transação.',
    dicas: [
      'Dois mapas por contexto: um de id para entidade gerenciada, outro de id para a fotografia, um `record` com os valores lidos.',
      'Compare com `Objects.equals`, campo a campo: atribuir o mesmo valor não é uma mudança.',
      'Depois de gravar, atualize o "banco" e a fotografia, para que um segundo commit não repita o update.',
      'O cache vale só dentro do contexto: um contexto novo faz um select novo.',
    ],
    solucao: `import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class Contexto {
    static class Produto {
        final long id;
        String nome;
        BigDecimal preco;
        String status;

        Produto(long id, String nome, BigDecimal preco, String status) {
            this.id = id;
            this.nome = nome;
            this.preco = preco;
            this.status = status;
        }
    }

    record Linha(String nome, BigDecimal preco, String status) {}

    static final Map<Long, Linha> BANCO = new LinkedHashMap<>();
    static int selects;
    static int updates;

    private final Map<Long, Produto> gerenciados = new LinkedHashMap<>();
    private final Map<Long, Linha> fotografias = new LinkedHashMap<>();

    Produto find(long id) {
        Produto ja = gerenciados.get(id);
        if (ja != null) return ja;
        selects++;
        System.out.println("select produto " + id);
        Linha linha = BANCO.get(id);
        if (linha == null) return null;
        Produto p = new Produto(id, linha.nome(), linha.preco(), linha.status());
        gerenciados.put(id, p);
        fotografias.put(id, linha);
        return p;
    }

    void commit() {
        for (Produto p : gerenciados.values()) {
            Linha antes = fotografias.get(p.id);
            List<String> mudancas = new ArrayList<>();
            if (!Objects.equals(antes.nome(), p.nome)) mudancas.add("nome='" + p.nome + "'");
            if (!Objects.equals(antes.preco(), p.preco)) mudancas.add("preco=" + p.preco);
            if (!Objects.equals(antes.status(), p.status)) mudancas.add("status='" + p.status + "'");
            if (mudancas.isEmpty()) {
                System.out.println("produto " + p.id + " sem alterações: nenhum update");
                continue;
            }
            updates++;
            System.out.println("update produtos set " + String.join(", ", mudancas) + " where id=" + p.id);
            Linha nova = new Linha(p.nome, p.preco, p.status);
            BANCO.put(p.id, nova);
            fotografias.put(p.id, nova);
        }
        gerenciados.clear();
        fotografias.clear();
    }

    public static void main(String[] args) {
        BANCO.put(1L, new Linha("Teclado mecânico", new BigDecimal("349.90"), "ATIVO"));
        BANCO.put(2L, new Linha("Mouse sem fio", new BigDecimal("129.90"), "ATIVO"));

        Contexto tx = new Contexto();
        Produto a = tx.find(1);
        Produto b = tx.find(1);
        System.out.println("mesmo objeto: " + (a == b));
        Produto mouse = tx.find(2);
        a.preco = new BigDecimal("379.90");
        a.status = "ESGOTADO";
        mouse.nome = "Mouse sem fio";
        tx.commit();

        Contexto outra = new Contexto();
        System.out.println("na próxima transação: " + outra.find(1).preco);
        outra.commit();
        System.out.println("selects: " + selects + ", updates: " + updates);
    }
}`,
    saida: "select produto 1\nmesmo objeto: true\nselect produto 2\nupdate produtos set preco=379.90, status='ESGOTADO' where id=1\nproduto 2 sem alterações: nenhum update\nselect produto 1\nna próxima transação: 379.90\nproduto 1 sem alterações: nenhum update\nselects: 3, updates: 1",
    comentarios:
      'São os mesmos três comportamentos que o Hibernate mostrou na aula: o segundo `find` não vai ao banco e devolve o mesmo objeto; a mudança vira `UPDATE` sem chamada nenhuma; e o cache morre com a transação. A atribuição do mesmo nome ao mouse não gerou nada, porque a comparação é por valor, não por "alguém chamou o setter". Uma diferença: este contexto atualiza só as colunas que mudaram, enquanto o Hibernate, por padrão, atualiza todas, porque assim reaproveita o mesmo SQL preparado para qualquer mudança; a anotação `@DynamicUpdate` faz o Hibernate se comportar como aqui. O custo da verificação de sujeira é proporcional ao número de entidades gerenciadas, e é por isso que carregar milhares delas numa transação só, para ler, deixa o commit lento.',
  },
  exercicios: [
    {
      id: 'backend-junior-t5-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a relação entre JPA e Hibernate?',
      opcoes: [
        'JPA é a especificação, com as anotações e interfaces; Hibernate é a implementação mais usada dela',
        'São concorrentes incompatíveis',
        'Hibernate é a especificação, e JPA, a implementação',
        'JPA é um banco de dados; Hibernate, o driver',
      ],
      resposta: 0,
      explicacao: 'O código usa as anotações `jakarta.persistence`, e o Hibernate faz o trabalho por baixo. O Spring Boot usa o Hibernate por padrão.',
    },
    {
      id: 'backend-junior-t5-e01-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `enum Status { ATIVO, ESGOTADO }` estava mapeado sem `@Enumerated`. Alguém acrescentou `PAUSADO` entre os dois. O que acontece com os produtos já gravados como `ESGOTADO`?',
      opcoes: [
        'Passam a ser lidos como `PAUSADO`, porque o padrão grava a posição (1), que agora é de outra constante',
        'Nada: o JPA grava o nome da constante',
        'A aplicação falha ao subir',
        'São apagados',
      ],
      resposta: 0,
      explicacao: 'O padrão é `EnumType.ORDINAL`. Com `EnumType.STRING`, o banco guarda "ESGOTADO", e a ordem das constantes deixa de importar.',
    },
    {
      id: 'backend-junior-t5-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual valor de `spring.jpa.hibernate.ddl-auto` é adequado em produção?',
      opcoes: [
        '`validate` ou `none`, com o esquema mantido por migrações',
        '`create`, para garantir as tabelas',
        '`create-drop`',
        '`update`, que ajusta as tabelas sozinho com segurança',
      ],
      resposta: 0,
      explicacao: 'O `create` apaga os dados a cada inicialização, e o `update` não remove nada, não tem controle de versão e pode falhar em mudanças complexas.',
    },
    {
      id: 'backend-junior-t5-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que uma entidade precisa de um construtor sem argumentos?',
      opcoes: [
        'Porque o JPA cria os objetos por reflexão ao ler linhas do banco, e depois preenche os campos',
        'Porque o Java exige em toda classe',
        'Porque o Spring injeta as dependências por ele',
        'Não precisa',
      ],
      resposta: 0,
      explicacao: 'Ele pode ser `protected`, para que o código da aplicação use o construtor com os dados obrigatórios.',
    },
    {
      id: 'backend-junior-t5-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa mesma transação, o código chama `em.find(Produto.class, 1L)` duas vezes. O que acontece?',
      opcoes: [
        'Um único `SELECT`; as duas chamadas devolvem o mesmo objeto',
        'Dois `SELECT`s, com dois objetos diferentes',
        'Dois `SELECT`s, com o mesmo objeto',
        'Erro: a entidade já está carregada',
      ],
      resposta: 0,
      explicacao: 'O contexto de persistência funciona como um cache de primeiro nível e garante uma instância por id em cada transação.',
    },
    {
      id: 'backend-junior-t5-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dentro de uma transação, o código busca um produto, chama `p.reajustar(novoPreco)` e termina, sem chamar nenhum método de salvar. O preço muda no banco?',
      opcoes: [
        'Sim: no fim da transação, a verificação de sujeira gera o `UPDATE`',
        'Não: falta chamar `em.update(p)`',
        'Não: falta chamar `em.persist(p)`',
        'Só se o campo tiver `@Column(updatable = true)` explícito',
      ],
      resposta: 0,
      explicacao: 'Entidades gerenciadas são acompanhadas. Por isso não existe `update` no JPA, e por isso alterar uma entidade "só para mostrar" na tela pode gravar sem querer.',
    },
    {
      id: 'backend-junior-t5-e01-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma entidade foi carregada numa transação já encerrada, e o código altera o status dela. O que é preciso para gravar a mudança?',
      opcoes: [
        'Numa nova transação, chamar `merge`, que copia o estado para uma entidade gerenciada',
        'Nada: a mudança é gravada sozinha',
        'Chamar `persist` de novo, que cria uma linha nova',
        'Chamar `remove` e depois `persist`',
      ],
      resposta: 0,
      explicacao: 'A entidade está destacada: o contexto que a acompanhava não existe mais. O `persist` tentaria inserir uma nova linha com o mesmo id.',
    },
    {
      id: 'backend-junior-t5-e01-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Com `@GeneratedValue(strategy = GenerationType.IDENTITY)`, quando o `INSERT` é enviado ao banco?',
      opcoes: [
        'Na hora do `persist`, porque o id só existe depois que o banco o gera',
        'Só no fim da transação, como os `UPDATE`s',
        'Só quando a aplicação encerra',
        'Nunca: o Hibernate grava em lote no dia seguinte',
      ],
      resposta: 0,
      explicacao: 'Na aula, o objeto saiu do `persist` já com `id=1`. Por isso a estratégia `IDENTITY` impede o Hibernate de agrupar `INSERT`s em lote.',
    },
    {
      id: 'backend-junior-t5-e01-q09',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais regras uma classe de entidade precisa seguir? Escolha duas.',
      opcoes: [
        'Não ser `final`',
        'Ter um construtor sem argumentos, que pode ser `protected`',
        'Ser um `record`',
        'Ter *setters* públicos para todos os campos',
        'Ter o nome terminado em `Entity`',
      ],
      respostas: [0, 1],
      explicacao: 'O Hibernate cria subclasses e instancia por reflexão. *Setters* são opcionais: os campos podem ser preenchidos direto, e métodos com comportamento costumam ser melhores.',
    },
    {
      id: 'backend-junior-t5-e01-q10',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O método imita a estratégia de nomes do Spring Boot, que transforma campos em colunas. Digite a saída exata.',
      codigo: `public class Teste {
    static String coluna(String campo) {
        return campo.replaceAll("([A-Z])", "_$1").toLowerCase();
    }

    public static void main(String[] args) {
        System.out.println(coluna("precoPromocional") + " " + coluna("criadoEm") + " " + coluna("nome"));
    }
}`,
      resposta: 'preco_promocional criado_em nome',
      explicacao: 'Por isso o `@Column(name = "criado_em")` da aula era opcional: o nome padrão já seria esse.',
    },
    {
      id: 'backend-junior-t5-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A verificação de sujeira compara valores. Qual é a saída?',
      codigo: `import java.math.BigDecimal;
import java.util.Objects;

public class Teste {
    public static void main(String[] args) {
        BigDecimal lido = new BigDecimal("349.90");
        BigDecimal novo = new BigDecimal("349.9");
        System.out.println(Objects.equals(lido, novo) + " " + (lido.compareTo(novo) == 0));
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `equals` do `BigDecimal` compara também a escala. Um verificador ingênuo veria mudança onde o valor é o mesmo; o Hibernate compara `BigDecimal` com `compareTo`.',
    },
    {
      id: 'backend-junior-t5-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que não devolver a entidade `Produto` direto como resposta de um controller?',
      opcoes: [
        'Porque qualquer campo novo da tabela apareceria na API, e relacionamentos podem disparar consultas extras ou laços na serialização',
        'Porque o Jackson não consegue serializar entidades',
        'Porque entidades não podem ser usadas em controllers',
        'Não há problema',
      ],
      resposta: 0,
      explicacao: 'O DTO define o contrato da API; a entidade define o modelo do banco. Os dois mudam por motivos diferentes.',
    },
    {
      id: 'backend-junior-t5-e01-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual configuração mostra, nos logs, o SQL gerado e os valores dos parâmetros?',
      opcoes: [
        '`logging.level.org.hibernate.SQL=DEBUG` e `logging.level.org.hibernate.orm.jdbc.bind=TRACE`',
        '`spring.jpa.hibernate.ddl-auto=create`',
        '`server.port=8080`',
        '`spring.jpa.open-in-view=true`',
      ],
      resposta: 0,
      explicacao: 'O `spring.jpa.show-sql` também mostra o SQL, mas direto no console, sem os parâmetros e fora do sistema de logs.',
    },
    {
      id: 'backend-junior-t5-e01-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Para que serve um campo anotado com `@Transient` numa entidade?',
      opcoes: [
        'Para guardar um valor só na memória, sem coluna no banco',
        'Para guardar um valor que expira',
        'Para guardar o valor criptografado',
        'Para marcar a chave primária',
      ],
      resposta: 0,
      explicacao: 'O Hibernate ignora o campo no mapeamento: ele não aparece no `CREATE TABLE` nem nos `INSERT`s.',
    },
    {
      id: 'backend-junior-t5-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A entidade implementa `hashCode` com base no `id`. Uma entidade nova é colocada num `HashSet` e depois persistida. O que pode dar errado?',
      opcoes: [
        'O `hashCode` muda quando o id é gerado, e o `HashSet` deixa de encontrar o objeto que contém',
        'Nada: o `HashSet` se atualiza sozinho',
        'O `persist` falha por causa do `HashSet`',
        'O `id` é gerado duas vezes',
      ],
      resposta: 0,
      explicacao: 'O objeto fica no "balde" do `hashCode` antigo. Para entidades, use um `hashCode` constante por classe ou uma chave natural imutável.',
    },
  ],
};

export default episodio;
