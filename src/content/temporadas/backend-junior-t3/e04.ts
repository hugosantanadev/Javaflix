import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t3-e04',
  minutos: 18,
  aula,
  armadilhas: [
    'Checar no Java se o e-mail existe não impede duplicatas com requisições simultâneas: só o `UNIQUE` impede.',
    '`ON DELETE CASCADE` em dados de negócio apaga histórico junto com o pai.',
    'Uma lista numa coluna, como `\'gamer,sem fio\'`, quebra a 1ª forma normal: use uma tabela associativa.',
    'Dinheiro em `FLOAT` ou `DOUBLE` perde centavos; use `DECIMAL`.',
    '`WHERE LOWER(email) = ...` não usa o índice de `email`; `LIKE \'%texto\'` não usa índice nenhum.',
    'Um índice em `(cidade, nome)` não ajuda a buscar só por `nome`.',
    'O PostgreSQL não indexa chaves estrangeiras sozinho, ao contrário do MySQL.',
  ],
  recursos: [
    {
      titulo: 'Documentação do PostgreSQL: Constraints',
      url: 'https://www.postgresql.org/docs/current/ddl-constraints.html',
      tipo: 'documentacao',
      porque: '`CHECK`, `NOT NULL`, `UNIQUE`, chaves primárias e estrangeiras, com as opções de `ON DELETE`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Indexes',
      url: 'https://www.postgresql.org/docs/current/indexes.html',
      tipo: 'documentacao',
      porque: 'Tipos de índice, índices compostos, sobre expressões e parciais.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Using EXPLAIN',
      url: 'https://www.postgresql.org/docs/current/using-explain.html',
      tipo: 'documentacao',
      porque: 'Como ler um plano de execução, com `Seq Scan`, `Index Scan` e os custos estimados.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Use The Index, Luke',
      url: 'https://use-the-index-luke.com/',
      tipo: 'livro',
      porque: 'O livro gratuito sobre índices para desenvolvedores: árvores B, índices compostos, funções e paginação.',
      gratuito: true,
      idioma: 'en',
      onde: 'Capítulo 1, "Anatomy of an Index", e Capítulo 2, "The Where Clause"',
    },
    {
      titulo: 'Use The Index, Luke: Concatenated Indexes',
      url: 'https://use-the-index-luke.com/sql/where-clause/the-equals-operator/concatenated-keys',
      tipo: 'artigo',
      porque: 'A regra do prefixo à esquerda, com a lista telefônica como exemplo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Microsoft Learn: Descrição da normalização do banco de dados',
      url: 'https://learn.microsoft.com/pt-br/previous-versions/troubleshoot/microsoft-365/microsoft-365-apps/access/database-normalization-description',
      tipo: 'artigo',
      porque: 'As formas normais com exemplos de tabelas antes e depois, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DesCOMPlica, Oliba!: Normalização de dados (1FN, 2FN, 3FN)',
      url: 'https://www.youtube.com/watch?v=TOFZQ5wm1UI',
      tipo: 'video',
      porque: 'As três formas normais com tabelas de exemplo, antes e depois, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Miriam TechCod: Modelo conceitual, lógico e físico',
      url: 'https://www.youtube.com/watch?v=8CkMX2qXgdY',
      tipo: 'video',
      porque: 'Do diagrama de entidades às tabelas, com chaves e relacionamentos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Banco de Dados Turbinado: Índice no banco de dados',
      url: 'https://www.youtube.com/watch?v=kpwSJZj5sCk',
      tipo: 'video',
      porque: 'O que é, como usar e quando usar um índice, com planos de execução, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Techt4lks: B-tree, Hash, GIN, GiST no PostgreSQL',
      url: 'https://www.youtube.com/watch?v=S9EFegGpQ8E',
      tipo: 'video',
      porque: 'Os tipos de índice do PostgreSQL e quando cada um serve, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Spanning Tree: Understanding B-Trees',
      url: 'https://www.youtube.com/watch?v=K1a2Bk8NrYQ',
      tipo: 'video',
      porque: 'Uma animação clara de como a árvore B busca, insere e se mantém baixa.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Índice composto',
    enunciado:
      'Simule um índice em `(cidade, nome)` com um `TreeMap` de chave composta, para 1.000 clientes gerados assim: a cidade do cliente `id` é `cidades[id % 5]` e o nome é `nomes[id % 8] + " " + id`, com as listas `{"Belém", "Curitiba", "Natal", "Recife", "São Paulo"}` e `{"Ana", "Bruno", "Carla", "Diego", "Elisa", "Fábio", "Gabi", "Hugo"}`. Escreva duas buscas que contem quantas entradas do índice leram: uma por cidade e prefixo de nome, que começa no ponto certo da árvore com `tailMap` e para assim que sair do intervalo; e uma só por nome, que não tem como aproveitar a ordem e percorre tudo. A saída deve ser:\n\n```text\ncidade = \'Recife\': 200 clientes, 201 entradas lidas\ncidade = \'Recife\' AND nome LIKE \'Hugo%\': 25 clientes, 26 entradas lidas\nnome = \'Hugo 999\': [999], 1000 entradas lidas\n```',
    dicas: [
      'A chave é um `record Chave(String cidade, String nome)` com o comparador `Comparator.comparing(Chave::cidade).thenComparing(Chave::nome)`.',
      '`tailMap(new Chave(cidade, prefixo), true)` começa exatamente no primeiro par maior ou igual ao procurado.',
      'A busca por intervalo lê uma entrada a mais: a primeira fora do intervalo, que é o sinal para parar.',
      'Sem a cidade, a ordem do índice não ajuda: só resta o `entrySet()` inteiro.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class IndiceComposto {
    record Chave(String cidade, String nome) {}

    static final Comparator<Chave> ORDEM = Comparator.comparing(Chave::cidade).thenComparing(Chave::nome);
    static final TreeMap<Chave, Integer> INDICE = new TreeMap<>(ORDEM);
    static int lidas;

    /** WHERE cidade = ? AND nome LIKE 'prefixo%': começa no primeiro par (cidade, prefixo) e para quando sai do intervalo. */
    static List<Integer> porCidadeENome(String cidade, String prefixo) {
        lidas = 0;
        List<Integer> ids = new ArrayList<>();
        for (Map.Entry<Chave, Integer> e : INDICE.tailMap(new Chave(cidade, prefixo), true).entrySet()) {
            lidas++;
            if (!e.getKey().cidade().equals(cidade) || !e.getKey().nome().startsWith(prefixo)) break;
            ids.add(e.getValue());
        }
        return ids;
    }

    /** WHERE nome = ?: a coluna não é a primeira do índice, então só resta percorrê-lo inteiro. */
    static List<Integer> porNome(String nome) {
        lidas = 0;
        List<Integer> ids = new ArrayList<>();
        for (Map.Entry<Chave, Integer> e : INDICE.entrySet()) {
            lidas++;
            if (e.getKey().nome().equals(nome)) ids.add(e.getValue());
        }
        return ids;
    }

    public static void main(String[] args) {
        String[] cidades = {"Belém", "Curitiba", "Natal", "Recife", "São Paulo"};
        String[] nomes = {"Ana", "Bruno", "Carla", "Diego", "Elisa", "Fábio", "Gabi", "Hugo"};
        for (int id = 1; id <= 1_000; id++) {
            INDICE.put(new Chave(cidades[id % cidades.length], nomes[id % nomes.length] + " " + id), id);
        }
        List<Integer> a = porCidadeENome("Recife", "");
        System.out.println("cidade = 'Recife': " + a.size() + " clientes, " + lidas + " entradas lidas");
        List<Integer> b = porCidadeENome("Recife", "Hugo");
        System.out.println("cidade = 'Recife' AND nome LIKE 'Hugo%': " + b.size() + " clientes, " + lidas + " entradas lidas");
        List<Integer> c = porNome("Hugo 999");
        System.out.println("nome = 'Hugo 999': " + c + ", " + lidas + " entradas lidas");
    }
}`,
    saida: "cidade = 'Recife': 200 clientes, 201 entradas lidas\ncidade = 'Recife' AND nome LIKE 'Hugo%': 25 clientes, 26 entradas lidas\nnome = 'Hugo 999': [999], 1000 entradas lidas",
    comentarios:
      'Os números contam a história do prefixo à esquerda. Com a cidade, a busca vai direto ao começo do trecho de Recife e lê só as 200 entradas dele; com a cidade e o começo do nome, lê só as 25 que interessam. Sem a cidade, as entradas de "Hugo 999" estão espalhadas, uma em cada trecho de cidade, e só uma varredura completa as encontra. Um banco faria o mesmo julgamento: para buscar por nome, ou se cria outro índice começando por `nome`, ou se aceita a varredura. O `TreeMap` é uma árvore rubro-negra, binária; a árvore B+ de um banco tem centenas de chaves por nó, mas a lógica da busca por intervalo é a mesma.',
  },
  exercicios: [
    {
      id: 'backend-junior-t3-e04-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que a maioria dos sistemas usa um `id` gerado como chave primária de `clientes`, em vez do e-mail?',
      opcoes: [
        'Porque o e-mail pode mudar, e uma chave que muda obriga a alterar todas as tabelas que a referenciam',
        'Porque e-mails não podem ser únicos',
        'Porque texto não pode ser chave primária',
        'Porque o `id` dispensa a restrição `UNIQUE` no e-mail',
      ],
      resposta: 0,
      explicacao: 'A chave substituta nunca muda. O e-mail continua único, com a sua própria restrição `UNIQUE`.',
    },
    {
      id: 'backend-junior-t3-e04-q02',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O cadastro consulta "esse e-mail já existe?" antes de inserir, e mesmo assim apareceram dois clientes com o mesmo e-mail. Qual é a causa provável e a correção?',
      opcoes: [
        'Duas requisições simultâneas passaram pela consulta antes de qualquer uma inserir; a correção é uma restrição `UNIQUE` no banco',
        'O banco ignorou a consulta',
        'O e-mail tinha espaços; a correção é um índice',
        'Falta um `ORDER BY` na consulta',
      ],
      resposta: 0,
      explicacao: 'A verificação e a inserção não são atômicas. Com o `UNIQUE`, a segunda inserção falha, e a aplicação trata o erro.',
    },
    {
      id: 'backend-junior-t3-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A chave estrangeira `pedidos.cliente_id` foi declarada com `ON DELETE CASCADE`. O que acontece ao apagar um cliente com três pedidos?',
      opcoes: [
        'O cliente e os três pedidos são apagados',
        'O `DELETE` é recusado',
        'Os pedidos ficam com `cliente_id` nulo',
        'Só o cliente é apagado, e os pedidos ficam apontando para um id inexistente',
      ],
      resposta: 0,
      explicacao: 'É por isso que o `CASCADE` é perigoso em dados de negócio. O padrão, `RESTRICT`, recusaria; o `SET NULL` manteria os pedidos sem cliente.',
    },
    {
      id: 'backend-junior-t3-e04-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um produto pode estar em várias promoções, e uma promoção tem vários produtos. Como modelar?',
      opcoes: [
        'Uma tabela `produto_promocoes` com `produto_id` e `promocao_id`, ambas chaves estrangeiras, formando a chave primária',
        'Uma coluna `promocao_id` em `produtos`',
        'Uma coluna `produtos` em `promocoes` com os ids separados por vírgula',
        'Duas colunas, `promocao1` e `promocao2`, em `produtos`',
      ],
      resposta: 0,
      explicacao: 'Relações de muitos para muitos viram uma tabela associativa. As outras opções limitam o número de promoções ou quebram a 1ª forma normal.',
    },
    {
      id: 'backend-junior-t3-e04-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A tabela `clientes` tem uma coluna `telefones` com valores como `\'(81) 9999-0000, (81) 3333-1111\'`. Que problema isso causa?',
      opcoes: [
        'Viola a 1ª forma normal: não dá para buscar, validar nem indexar cada telefone',
        'Nenhum, se a coluna for `TEXT`',
        'Só um problema de espaço em disco',
        'Viola a 3ª forma normal, porque telefones dependem da cidade',
      ],
      resposta: 0,
      explicacao: 'Cada coluna deve guardar um valor. Telefones viram uma tabela `telefones_cliente`, com uma linha por telefone.',
    },
    {
      id: 'backend-junior-t3-e04-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A tabela `clientes` guarda `cidade` e `estado`. Uma cliente de Recife aparece com estado `SC`. Que princípio foi violado?',
      opcoes: [
        'A 3ª forma normal: o estado depende da cidade, não da chave, e as duas informações podem se contradizer',
        'A 1ª forma normal',
        'A integridade referencial',
        'Nenhum: é um erro de digitação sem relação com o modelo',
      ],
      resposta: 0,
      explicacao: 'Com uma tabela `cidades` com o estado de cada uma, e `clientes` apontando para ela, a contradição fica impossível.',
    },
    {
      id: 'backend-junior-t3-e04-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o tipo adequado para a coluna `preco`?',
      opcoes: ['`DECIMAL(10, 2)`', '`DOUBLE`', '`FLOAT`', '`VARCHAR(20)`'],
      resposta: 0,
      explicacao: 'O `DECIMAL` guarda os centavos exatos. Tipos de ponto flutuante acumulam erros de arredondamento, e texto não permite contas nem comparações numéricas.',
    },
    {
      id: 'backend-junior-t3-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Há um índice em `clientes(email)`, mas o `EXPLAIN` de `WHERE LOWER(email) = \'ana@exemplo.com\'` mostra uma varredura completa. Por quê, e como resolver?',
      opcoes: [
        'O índice guarda os e-mails originais, não o resultado de `LOWER`; um índice sobre a expressão `LOWER(email)` resolve',
        'O índice está corrompido e precisa ser recriado',
        'Índices não funcionam com texto',
        'Falta um `ORDER BY email`',
      ],
      resposta: 0,
      explicacao: 'Outra saída é guardar o e-mail já em minúsculas e comparar sem função. O que não pode é aplicar uma função à coluna e esperar o índice dela.',
    },
    {
      id: 'backend-junior-t3-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Existe só um índice em `pedidos(cliente_id, criado_em)`. Qual destas consultas **não** pode aproveitá-lo para achar as linhas?',
      opcoes: [
        "`WHERE criado_em >= DATE '2025-09-01'`",
        '`WHERE cliente_id = 7`',
        "`WHERE cliente_id = 7 AND criado_em >= DATE '2025-09-01'`",
        '`WHERE cliente_id = 7 ORDER BY criado_em`',
      ],
      resposta: 0,
      explicacao: 'Sem a primeira coluna, a segunda está espalhada pelo índice. As outras usam o prefixo, e a última ainda recebe as linhas já ordenadas.',
    },
    {
      id: 'backend-junior-t3-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Com um índice em `produtos(nome)`, qual busca o banco consegue fazer pelo índice?',
      opcoes: ["`nome LIKE 'Monitor%'`", "`nome LIKE '%27'`", "`nome LIKE '%itor%'`", 'Nenhuma: `LIKE` nunca usa índice'],
      resposta: 0,
      explicacao: "O prefixo fixo vira um intervalo, `nome >= 'Monitor' AND nome < 'Monitos'`. Começando com `%`, não há por onde entrar na ordem.",
    },
    {
      id: 'backend-junior-t3-e04-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são custos reais de criar um índice? Escolha dois.',
      opcoes: [
        'Todo `INSERT`, `UPDATE` e `DELETE` precisa atualizar o índice',
        'O índice ocupa espaço em disco e na memória',
        'Toda consulta na tabela fica mais lenta',
        'A tabela deixa de aceitar valores nulos',
        'A chave primária deixa de ser única',
      ],
      respostas: [0, 1],
      explicacao: 'As leituras que não usam o índice continuam iguais. O custo está nas escritas e no espaço, por isso índices se criam para consultas que existem.',
    },
    {
      id: 'backend-junior-t3-e04-q12',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa conta quantas vezes um milhão de linhas pode ser dividido ao meio até sobrar uma: o número de passos de uma busca binária. Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        int n = 1_000_000;
        int passos = 0;
        while (n > 1) {
            n = (n + 1) / 2;
            passos++;
        }
        System.out.println(passos);
    }
}`,
      resposta: '20',
      explicacao: 'log₂ de um milhão é cerca de 20. Um bilhão de linhas pediria só 30 passos: é por isso que buscas em índices quase não crescem com a tabela.',
    },
    {
      id: 'backend-junior-t3-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um `TreeMap` faz o papel de um índice de preços, em centavos. Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        TreeMap<Integer, String> porPreco = new TreeMap<>();
        porPreco.put(34990, "Teclado");
        porPreco.put(12990, "Mouse");
        porPreco.put(189900, "Monitor 27");
        porPreco.put(25990, "Headset");
        porPreco.put(21900, "Webcam");
        porPreco.put(109900, "Monitor 24");
        int entre = porPreco.subMap(10000, true, 40000, true).size();
        System.out.println(entre + " " + porPreco.ceilingKey(30000) + " " + porPreco.firstEntry().getValue());
    }
}`,
      opcoes: ['`4 34990 Mouse`', '`4 25990 Mouse`', '`5 34990 Teclado`', '`3 34990 Mouse`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como num `BETWEEN 100 AND 400` com índice, o `subMap` pega o trecho ordenado sem olhar o resto. O `ceilingKey` é o primeiro preço a partir de 300,00, e o primeiro do mapa é o menor.',
    },
    {
      id: 'backend-junior-t3-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num PostgreSQL, `pedidos.cliente_id` é chave estrangeira, sem índice. Apagar um cliente sem pedidos demora segundos numa tabela com 50 milhões de pedidos. Por quê?',
      opcoes: [
        'Para garantir que nenhum pedido aponta para o cliente, o banco varre a tabela de pedidos; um índice em `cliente_id` resolve',
        'O PostgreSQL apaga em segundo plano',
        'A chave primária de `clientes` está sem índice',
        'O `DELETE` sempre reescreve a tabela inteira',
      ],
      resposta: 0,
      explicacao: 'A verificação da chave estrangeira é uma busca por `cliente_id` em `pedidos`. O PostgreSQL não cria esse índice sozinho, ao contrário do MySQL.',
    },
    {
      id: 'backend-junior-t3-e04-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A coluna booleana `ativo` vale `true` em 95% dos produtos. Um índice em `ativo` acelera `WHERE ativo = true`?',
      opcoes: [
        'Quase nunca: lê-se o índice e depois quase todas as linhas, o que custa mais que a varredura',
        'Sim, sempre: todo índice acelera a busca',
        'Só se a tabela for pequena',
        'Sim, porque booleanos ocupam pouco espaço',
      ],
      resposta: 0,
      explicacao: 'Índices brilham quando a condição seleciona poucas linhas. Para achar os 5% inativos, ele pode valer, e um índice parcial (`WHERE ativo = false`) seria ainda melhor.',
    },
  ],
};

export default episodio;
