import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t5-e05',
  minutos: 17,
  aula,
  armadilhas: [
    'Editar uma migração já aplicada muda o checksum, e a aplicação deixa de subir: escreva uma migração nova.',
    'Um sublinhado só no nome (`V3_adicionar.sql`) não é o padrão do Flyway: são dois, entre a versão e a descrição.',
    'Versões são comparadas como números: `V10` vem depois de `V2`, embora venha antes em ordem alfabética.',
    'Uma versão menor que a atual, vinda de outro *branch*, é recusada na validação: renomeie para a próxima livre.',
    'Em bancos sem DDL transacional, como MySQL e H2, uma migração que falha no meio deixa metade aplicada.',
    '"No migrations found" seguido de "missing table" é caminho errado das migrações, não erro de mapeamento.',
    'Renomear ou apagar uma coluna num único passo quebra a versão anterior da aplicação, que ainda roda durante o deploy.',
  ],
  ia: {
    uso:
      'A IA escreve migrações SQL com facilidade e ajuda a planejar mudanças em etapas. O cuidado é com o que ela não sabe: o que já rodou em produção, a versão do banco e o volume de dados de cada tabela.',
    pedido:
      'Escreva a próxima migração Flyway (V5) para acrescentar a coluna email, única, à tabela clientes, no PostgreSQL 18.\n- Não altere migrações já aplicadas.\n- A tabela já tem dados, e a versão antiga da aplicação continua no ar durante o deploy.\n- Dê nomes legíveis a restrições e índices.\n- Explique o que acontece se a migração falhar no meio.\n\n<cole aqui as migrações existentes e a entidade>',
    erros: [
      'Edita uma migração já aplicada em vez de criar uma nova, e o checksum impede a aplicação de subir.',
      'Escreve SQL de outro banco, como o MySQL, ou recursos que a sua versão do PostgreSQL não tem.',
      'Renomeia ou apaga colunas num passo só, quebrando a versão anterior da aplicação durante o deploy.',
      'Sugere `ddl-auto=update` junto com o Flyway, por garantia.',
    ],
    conferir: [
      'Rode a migração num banco igual ao de produção, como no Testcontainers, com dados de exemplo.',
      'Suba a aplicação com `ddl-auto=validate` depois de migrar.',
      'Confira o número da versão contra o histórico de produção e os outros *branches*.',
    ],
  },
  recursos: [
    {
      titulo: 'Documentação do Flyway',
      url: 'https://documentation.red-gate.com/flyway',
      tipo: 'documentacao',
      porque: 'A documentação oficial, com os comandos, as configurações e cada banco suportado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Flyway: Migrations',
      url: 'https://documentation.red-gate.com/fd/migrations-271585107.html',
      tipo: 'documentacao',
      porque: 'Migrações versionadas e repetíveis, a tabela de histórico e o checksum, explicados pelo próprio Flyway.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Boot: Use a Higher-level Database Migration Tool',
      url: 'https://docs.spring.io/spring-boot/how-to/data-initialization.html#howto.data-initialization.migration-tool.flyway',
      tipo: 'documentacao',
      porque: 'Como o Spring Boot executa o Flyway na inicialização e as propriedades `spring.flyway.*`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Redgate: Flyway naming patterns matter',
      url: 'https://www.red-gate.com/blog/database-devops/flyway-naming-patterns-matter',
      tipo: 'artigo',
      porque: 'Os padrões de nome dos arquivos e os erros mais comuns ao escolhê-los.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: Evolutionary Database Design',
      url: 'https://martinfowler.com/articles/evodb.html',
      tipo: 'artigo',
      porque: 'O artigo que popularizou as migrações versionadas, com as práticas de times que mudam o banco toda semana.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Martin Fowler: Parallel Change',
      url: 'https://martinfowler.com/bliki/ParallelChange.html',
      tipo: 'artigo',
      porque: 'A técnica de expandir e contrair, para mudar o esquema sem parar a aplicação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Código Fonte TV: Migrations, o versionamento do banco de dados',
      url: 'https://www.youtube.com/watch?v=HRw1Dcxxu2k',
      tipo: 'video',
      porque: 'Oito minutos sobre o que são migrações e por que todo projeto precisa delas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Fernanda Kipper: Migrations com Flyway num projeto Spring e PostgreSQL',
      url: 'https://www.youtube.com/watch?v=LX5jaieOIAk',
      tipo: 'video',
      porque: 'O Flyway configurado do zero num projeto Spring com PostgreSQL, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'José Barros: Como usar o Flyway com o Spring Boot',
      url: 'https://www.youtube.com/watch?v=etzhWHsfCfw',
      tipo: 'video',
      porque: 'Uma demonstração curta da integração com o Spring Boot, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'O flyway info',
    enunciado:
      'Implemente a leitura dos nomes de arquivo e o estado de cada migração, como o comando `flyway info`. Um `record Versao(int[] partes)` comparável deve ler versões como `1`, `1_1` e `10` e compará-las numericamente, parte por parte. Cada arquivo `V<versão>__<descrição>.sql` vira uma migração com versão e descrição (sublinhados viram espaços); `R__<descrição>.sql` é repetível, sem versão, e vai para o fim. Com as versões 1 e 2 aplicadas, cada versionada é `Success` se foi aplicada, `Ignored` se é menor que a versão atual e não foi aplicada, e `Pending` nos outros casos; a repetível nunca aplicada é `Pending`. A saída deve ser:\n\n```text\n1 | criar tabelas | Success\n1.1 | dados iniciais | Ignored\n2 | criar tags | Success\n3 | adicionar email cliente | Pending\n10 | indice pedidos | Pending\nR | view resumo pedidos | Pending\nversão atual: 2\n```',
    dicas: [
      '`texto.split("[._]")` separa as partes da versão, aceitando ponto ou sublinhado.',
      '`Arrays.compare(int[], int[])` compara dois vetores de números parte por parte, e o mais curto vem antes quando é prefixo do outro.',
      '`nome.split("__", 2)` separa o prefixo da descrição.',
      '`Comparator.nullsLast(Comparator.naturalOrder())` põe as migrações sem versão no fim.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

public class Versoes {
    record Versao(int[] partes) implements Comparable<Versao> {
        static Versao de(String texto) {
            return new Versao(Arrays.stream(texto.split("[._]")).mapToInt(Integer::parseInt).toArray());
        }

        @Override
        public int compareTo(Versao outra) {
            return Arrays.compare(partes, outra.partes);
        }

        @Override
        public String toString() {
            return String.join(".", Arrays.stream(partes).mapToObj(String::valueOf).toList());
        }
    }

    /** Versão nula indica uma migração repetível. */
    record Migracao(Versao versao, String descricao) {}

    static Migracao ler(String arquivo) {
        String nome = arquivo.substring(0, arquivo.length() - ".sql".length());
        String[] partes = nome.split("__", 2);
        String descricao = partes[1].replace('_', ' ');
        if (partes[0].equals("R")) return new Migracao(null, descricao);
        return new Migracao(Versao.de(partes[0].substring(1)), descricao);
    }

    public static void main(String[] args) {
        List<String> arquivos = List.of("V10__indice_pedidos.sql", "R__view_resumo_pedidos.sql", "V2__criar_tags.sql",
                "V1_1__dados_iniciais.sql", "V3__adicionar_email_cliente.sql", "V1__criar_tabelas.sql");
        Set<String> aplicadas = Set.of("1", "2");

        List<Migracao> migracoes = new ArrayList<>(arquivos.stream().map(Versoes::ler).toList());
        migracoes.sort(Comparator.comparing(Migracao::versao, Comparator.nullsLast(Comparator.naturalOrder())));
        Versao atual = migracoes.stream()
                .map(Migracao::versao)
                .filter(v -> v != null && aplicadas.contains(v.toString()))
                .max(Comparator.naturalOrder())
                .orElseThrow();

        for (Migracao m : migracoes) {
            String estado;
            if (m.versao() == null) estado = "Pending";
            else if (aplicadas.contains(m.versao().toString())) estado = "Success";
            else if (m.versao().compareTo(atual) < 0) estado = "Ignored";
            else estado = "Pending";
            System.out.println((m.versao() == null ? "R" : m.versao()) + " | " + m.descricao() + " | " + estado);
        }
        System.out.println("versão atual: " + atual);
    }
}`,
    saida: '1 | criar tabelas | Success\n1.1 | dados iniciais | Ignored\n2 | criar tags | Success\n3 | adicionar email cliente | Pending\n10 | indice pedidos | Pending\nR | view resumo pedidos | Pending\nversão atual: 2',
    comentarios:
      'Os estados são os nomes que o Flyway usa: com estes mesmos arquivos e as versões 1 e 2 aplicadas, a API `flyway.info()` devolveu `Success` para 1 e 2, `Ignored` para 1.1 e `Pending` para 3 e 10. A migração 1.1 é a que faz a validação falhar com "Detected resolved migration not applied to database". Repare que o `record` guarda um `int[]`, e o `equals` gerado compara vetores por referência: por isso o código compara as versões pelo texto ou pelo `compareTo`, e nunca com `equals`. O Flyway real também aceita versões com zeros à esquerda, prefixos e sufixos configuráveis e migrações escritas em Java, e trata repetíveis aplicadas e alteradas com o estado `Outdated`.',
  },
  exercicios: [
    {
      id: 'backend-junior-t5-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que não usar `spring.jpa.hibernate.ddl-auto=update` em produção?',
      opcoes: [
        'Ele só acrescenta tabelas e colunas, não renomeia nem converte dados, e não deixa registro nem revisão do que fez',
        'Porque ele apaga as tabelas a cada subida',
        'Porque ele não funciona com PostgreSQL',
        'Porque ele exige o Flyway',
      ],
      resposta: 0,
      explicacao: 'Renomear um atributo vira uma coluna nova, vazia, ao lado da antiga. Migrações deixam cada mudança explícita, revisada e registrada.',
    },
    {
      id: 'backend-junior-t5-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual nome de arquivo segue o padrão de migração versionada do Flyway?',
      opcoes: ['`V3__adicionar_email.sql`', '`V3_adicionar_email.sql`', '`v3-adicionar-email.sql`', '`adicionar_email_V3.sql`'],
      resposta: 0,
      explicacao: 'O padrão é `V`, a versão, dois sublinhados e a descrição. Com um sublinhado só, o Flyway não sabe onde a versão termina.',
    },
    {
      id: 'backend-junior-t5-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Em que ordem o Flyway aplica `V10__a.sql`, `V2__b.sql`, `V1_1__c.sql` e `V1__d.sql` num banco vazio?',
      opcoes: ['1, 1.1, 2, 10', '10, 1.1, 1, 2', '1, 2, 10, 1.1', '1.1, 1, 10, 2'],
      resposta: 0,
      explicacao: 'As versões são comparadas como números, parte por parte. `V1_1` é a versão 1.1, que vem logo depois da 1.',
    },
    {
      id: 'backend-junior-t5-e05-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa ordena os nomes dos arquivos como texto. Digite a saída exata.',
      codigo: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Teste {
    public static void main(String[] args) {
        List<String> arquivos = new ArrayList<>(List.of("V2__b.sql", "V10__a.sql", "V1__d.sql", "V1_1__c.sql"));
        Collections.sort(arquivos);
        System.out.println(arquivos);
    }
}`,
      resposta: '[V10__a.sql, V1_1__c.sql, V1__d.sql, V2__b.sql]',
      explicacao: 'Em ordem de texto, `0` vem antes de `_`, e `1` também. Por isso o Flyway lê a versão como números, e não confia na ordem alfabética.',
    },
    {
      id: 'backend-junior-t5-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A `V1__criar_tabelas.sql` já foi aplicada em todos os ambientes. Alguém a edita para mudar o tamanho de uma coluna. O que acontece na próxima subida?',
      opcoes: [
        'A validação falha com "Migration checksum mismatch for migration version 1", e a aplicação não sobe',
        'O Flyway reaplica a V1 com o novo tamanho',
        'O Flyway ignora a mudança em silêncio',
        'O Hibernate ajusta a coluna sozinho',
      ],
      resposta: 0,
      explicacao: 'O checksum do arquivo não bate com o do histórico. Desfaça a edição e escreva uma nova versão com o `alter table`.',
    },
    {
      id: 'backend-junior-t5-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A aplicação não sobe com "Schema validation: missing table [clientes]", e o log do Flyway, logo antes, diz "No migrations found. Are your locations set up correctly?". Qual é a causa provável?',
      opcoes: [
        'Os arquivos não estão onde o Flyway procura, como `src/main/resources/db/migration`',
        'A entidade `Cliente` está com o nome da tabela errado',
        'Falta o `ddl-auto=create`',
        'O banco está fora do ar',
      ],
      resposta: 0,
      explicacao: 'O Flyway não achou nada para aplicar, e o banco ficou vazio. O erro do Hibernate é consequência; a causa está no caminho.',
    },
    {
      id: 'backend-junior-t5-e05-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Produção está na versão 3. Do *branch* de uma colega chega a `V2_1__indice.sql`, escrita antes da V3 existir. O Flyway recusa a subida. Qual é a melhor correção?',
      opcoes: [
        'Renomear o arquivo para a próxima versão livre, a V4, depois de conferir que ele faz sentido sobre a V3',
        'Ligar `outOfOrder=true` em produção',
        'Apagar a linha da V3 da tabela de histórico',
        'Rodar o SQL do arquivo à mão no banco',
      ],
      resposta: 0,
      explicacao: 'A V2_1 foi escrita sem conhecer a V3. Como V4, ela entra depois, na ordem em que vai de fato rodar.',
    },
    {
      id: 'backend-junior-t5-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para que serve a coluna `checksum` da tabela `flyway_schema_history`?',
      opcoes: [
        'Para detectar se o arquivo de uma migração aplicada foi alterado depois',
        'Para contar quantas linhas a migração alterou',
        'Para guardar a senha do banco',
        'Para ordenar as migrações',
      ],
      resposta: 0,
      explicacao: 'A cada subida, o Flyway recalcula o checksum dos arquivos e compara com o histórico, na validação.',
    },
    {
      id: 'backend-junior-t5-e05-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O programa calcula o CRC32 de um mesmo SQL salvo no Windows e no Linux, de duas formas. Qual é a saída?',
      codigo: `import java.nio.charset.StandardCharsets;
import java.util.zip.CRC32;

public class Teste {
    static long porLinha(String sql) {
        CRC32 crc = new CRC32();
        sql.lines().forEach(l -> crc.update(l.getBytes(StandardCharsets.UTF_8)));
        return crc.getValue();
    }

    static long inteiro(String sql) {
        CRC32 crc = new CRC32();
        crc.update(sql.getBytes(StandardCharsets.UTF_8));
        return crc.getValue();
    }

    public static void main(String[] args) {
        String windows = "alter table clientes\\r\\nadd column email varchar(120);";
        String linux = "alter table clientes\\nadd column email varchar(120);";
        System.out.println((porLinha(windows) == porLinha(linux)) + " " + (inteiro(windows) == inteiro(linux)));
    }
}`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Linha a linha, as quebras ficam de fora, e os dois textos dão o mesmo resultado. É assim que o Flyway calcula: um arquivo com `\\r\\n` ou `\\n` tem o mesmo checksum.',
    },
    {
      id: 'backend-junior-t5-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quando uma migração repetível, como `R__view_resumo_pedidos.sql`, é executada?',
      opcoes: [
        'Depois das versionadas pendentes, e de novo sempre que o conteúdo do arquivo mudar',
        'Em toda subida da aplicação',
        'Só uma vez, como as versionadas',
        'Antes de todas as versionadas',
      ],
      resposta: 0,
      explicacao: 'O checksum decide: mudou, roda de novo. Por isso ela serve para *views* e funções, recriadas inteiras com `create or replace`.',
    },
    {
      id: 'backend-junior-t5-e05-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são boas práticas com Flyway? Escolha três.',
      opcoes: [
        'Usar `spring.jpa.hibernate.ddl-auto=validate`',
        'Fazer cada mudança numa migração nova, pequena',
        'Testar as migrações no mesmo banco de produção',
        'Apagar a tabela `flyway_schema_history` quando a validação falhar',
        'Manter o `ddl-auto=update` ligado junto com o Flyway, por garantia',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Apagar o histórico faria o Flyway tentar recriar tudo, e o `update` faria mudanças fora das migrações, sem registro.',
    },
    {
      id: 'backend-junior-t5-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma migração com dois comandos falha no segundo. Qual é a diferença entre rodá-la no PostgreSQL e no MySQL?',
      opcoes: [
        'No PostgreSQL, a transação desfaz a migração inteira; no MySQL, o primeiro comando fica aplicado e é preciso limpar e rodar o `repair`',
        'Nenhuma: os dois desfazem tudo',
        'Nenhuma: nos dois, o primeiro comando fica aplicado',
        'No PostgreSQL, o Flyway pula o comando com erro',
      ],
      resposta: 0,
      explicacao: 'O PostgreSQL executa DDL dentro de transações; o MySQL, como o H2 da aula, confirma cada comando na hora.',
    },
    {
      id: 'backend-junior-t5-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Depois de acrescentar `private String telefone;` à entidade `Cliente`, a aplicação não sobe: "Schema validation: missing column [telefone] in table [clientes]". O que fazer?',
      opcoes: [
        'Escrever uma migração nova com `alter table clientes add column telefone ...`',
        'Trocar o `ddl-auto` para `update`',
        'Editar a V1 para incluir a coluna',
        'Desligar o Flyway',
      ],
      resposta: 0,
      explicacao: 'O `validate` descobriu que o código e o banco divergem. A correção é levar o banco junto, com uma migração.',
    },
    {
      id: 'backend-junior-t5-e05-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa descobre as migrações pendentes, comparando versões parte por parte. Digite a saída exata.',
      codigo: `import java.util.Arrays;
import java.util.List;

public class Teste {
    static int[] partes(String versao) {
        return Arrays.stream(versao.split("[.]")).mapToInt(Integer::parseInt).toArray();
    }

    public static void main(String[] args) {
        List<String> locais = List.of("1", "2", "2.1", "3", "10");
        String atual = "2.1";
        List<String> pendentes = locais.stream()
                .filter(v -> Arrays.compare(partes(v), partes(atual)) > 0)
                .toList();
        System.out.println("pendentes: " + pendentes);
    }
}`,
      resposta: 'pendentes: [3, 10]',
      explicacao: 'Só as versões maiores que 2.1 estão pendentes. Comparando números, 10 é maior que 3, ao contrário da comparação de texto.',
    },
    {
      id: 'backend-junior-t5-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A coluna `nome` precisa virar `nome_completo` sem parar a loja, que roda em várias instâncias atualizadas uma de cada vez. Qual é o caminho seguro?',
      opcoes: [
        'Em etapas: criar a coluna nova e copiar os dados, passar a aplicação para ela e, num deploy seguinte, apagar a antiga',
        'Um `alter table ... rename column` na próxima migração',
        'Mudar só a entidade e deixar o `update` resolver',
        'Parar todas as instâncias e editar a V1',
      ],
      resposta: 0,
      explicacao: 'Durante o deploy, versões antiga e nova convivem, e a antiga ainda lê `nome`. É a técnica de expandir e contrair.',
    },
  ],
};

export default episodio;
