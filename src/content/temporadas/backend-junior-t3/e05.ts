import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t3-e05',
  minutos: 18,
  aula,
  armadilhas: [
    'No JDBC, sem `setAutoCommit(false)`, cada comando é confirmado sozinho, e um erro no meio não desfaz os anteriores.',
    'Ler um valor, calcular no Java e gravar o resultado perde atualizações concorrentes, sem erro nenhum.',
    'Em READ COMMITTED, duas leituras da mesma linha na mesma transação podem dar valores diferentes.',
    'REPEATABLE READ e SERIALIZABLE podem recusar uma gravação: a aplicação precisa repetir a transação inteira.',
    'Um `UPDATE` com controle de versão que afeta 0 linhas é um conflito, não um sucesso.',
    'Bloquear linhas em ordens diferentes em transações diferentes leva a impasses.',
    'Chamadas HTTP ou esperas dentro de uma transação aberta mantêm as linhas bloqueadas o tempo todo.',
  ],
  recursos: [
    {
      titulo: 'Documentação do PostgreSQL: Transaction Isolation',
      url: 'https://www.postgresql.org/docs/current/transaction-iso.html',
      tipo: 'documentacao',
      porque: 'Os níveis de isolamento, a tabela de anomalias e o que o PostgreSQL faz em cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Explicit Locking',
      url: 'https://www.postgresql.org/docs/current/explicit-locking.html',
      tipo: 'documentacao',
      porque: '`FOR UPDATE`, os tipos de bloqueio de linha e a detecção de impasses.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Documentação do PostgreSQL: Transactions (tutorial)',
      url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
      tipo: 'tutorial',
      porque: 'O exemplo da transferência bancária com `BEGIN`, `COMMIT`, `ROLLBACK` e *savepoints*.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do PostgreSQL: Introduction to MVCC',
      url: 'https://www.postgresql.org/docs/current/mvcc-intro.html',
      tipo: 'documentacao',
      porque: 'Por que leituras não bloqueiam escritas, contado pelos autores do banco.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Documentação do PostgreSQL: Write-Ahead Logging',
      url: 'https://www.postgresql.org/docs/current/wal-intro.html',
      tipo: 'documentacao',
      porque: 'Como o registro sequencial garante a durabilidade depois do `COMMIT`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Martin Kleppmann: Designing Data-Intensive Applications',
      url: 'https://dataintensive.net/',
      tipo: 'livro',
      porque: 'O capítulo mais claro já escrito sobre transações, isolamento, atualização perdida e MVCC.',
      gratuito: false,
      idioma: 'en',
      onde: 'Capítulo 7, "Transactions"',
    },
    {
      titulo: 'DesCOMPlica, Oliba!: Transações no PostgreSQL',
      url: 'https://www.youtube.com/watch?v=iFmL8Ys46Z0',
      tipo: 'video',
      porque: 'ACID na prática, com COMMIT, ROLLBACK e SAVEPOINT no PostgreSQL, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Cubos Tecnologia: Níveis de isolamento de transações',
      url: 'https://www.youtube.com/watch?v=JU6lj8_z0HA',
      tipo: 'video',
      porque: 'Uma palestra sobre as anomalias e os níveis de isolamento, com exemplos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Leonardo Zamariola: Transaction Isolation Level',
      url: 'https://www.youtube.com/watch?v=71_m6AJ6AuM',
      tipo: 'video',
      porque: 'Os níveis de isolamento demonstrados com duas sessões no banco, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'ByteByteGo: ACID Properties in Databases',
      url: 'https://www.youtube.com/watch?v=GAe5oB742dw',
      tipo: 'video',
      porque: 'As quatro garantias explicadas com diagramas, em cinco minutos.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'MVCC em miniatura',
    enunciado:
      'Implemente o controle de concorrência por múltiplas versões. Cada gravação acrescenta uma `Versao(valor, criadaPor)` à lista da chave, e cada transação tem uma **fotografia**: o conjunto das transações confirmadas que ela enxerga. Uma leitura devolve a versão mais nova criada pela própria transação ou por uma da fotografia. Em READ COMMITTED, a fotografia é renovada a cada leitura; em REPEATABLE READ, vale a do começo da transação, e uma gravação sobre uma versão criada por alguém fora da fotografia é recusada. Com o roteiro do `main` abaixo, que repete os cenários da aula, a saída deve ser:\n\n```text\nA lê saldo: 100\nB grava saldo = 80\nA lê saldo: 100\nB COMMIT\nA lê saldo: 80\nA COMMIT\nR lê saldo: 80\nC grava saldo = 60\nC COMMIT\nR lê saldo: 80\nR grava saldo: ERRO, não foi possível serializar o acesso\nD lê saldo: 60\nversões guardadas: 3\n```\n\nO valor inicial, 100, é uma versão criada pela transação 0, já confirmada. O roteiro: A (READ COMMITTED) lê; B (READ COMMITTED) grava 80; A lê; B confirma; A lê e confirma. Depois, R (REPEATABLE READ) lê; C grava 60 e confirma; R lê e tenta gravar 70. Por fim, D lê.',
    dicas: [
      'Guarde as versões num `Map<String, List<Versao>>` e as transações confirmadas num `Set<Integer>`.',
      'Para ler, percorra a lista de trás para a frente e pare na primeira versão visível.',
      'A segunda leitura de A ainda vê 100 porque B não confirmou: a versão 80 existe, mas não é visível.',
      'A recusa de R é a regra "o primeiro a gravar vence": a última versão foi criada por C, que não está na fotografia de R.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MiniMvcc {
    enum Isolamento { READ_COMMITTED, REPEATABLE_READ }

    record Versao(int valor, int criadaPor) {}

    static final Map<String, List<Versao>> VERSOES = new HashMap<>();
    static final Set<Integer> CONFIRMADAS = new HashSet<>();
    static int proximoId = 1;

    static final class Transacao {
        final int id = proximoId++;
        final String nome;
        final Isolamento isolamento;
        Set<Integer> fotografia;

        Transacao(String nome, Isolamento isolamento) {
            this.nome = nome;
            this.isolamento = isolamento;
            this.fotografia = Set.copyOf(CONFIRMADAS);
        }

        /** Em READ COMMITTED, cada comando tira uma fotografia nova; em REPEATABLE READ, vale a do começo. */
        Set<Integer> visiveis() {
            if (isolamento == Isolamento.READ_COMMITTED) fotografia = Set.copyOf(CONFIRMADAS);
            return fotografia;
        }

        Versao visivel(String chave) {
            Set<Integer> vistas = visiveis();
            List<Versao> lista = VERSOES.get(chave);
            for (int i = lista.size() - 1; i >= 0; i--) {
                Versao v = lista.get(i);
                if (v.criadaPor() == id || vistas.contains(v.criadaPor())) return v;
            }
            return null;
        }

        void ler(String chave) {
            System.out.println(nome + " lê " + chave + ": " + visivel(chave).valor());
        }

        void gravar(String chave, int valor) {
            List<Versao> lista = VERSOES.get(chave);
            Versao ultima = lista.get(lista.size() - 1);
            if (isolamento == Isolamento.REPEATABLE_READ && ultima.criadaPor() != id && !fotografia.contains(ultima.criadaPor())) {
                System.out.println(nome + " grava " + chave + ": ERRO, não foi possível serializar o acesso");
                return;
            }
            lista.add(new Versao(valor, id));
            System.out.println(nome + " grava " + chave + " = " + valor);
        }

        void confirmar() {
            CONFIRMADAS.add(id);
            System.out.println(nome + " COMMIT");
        }
    }

    public static void main(String[] args) {
        VERSOES.put("saldo", new ArrayList<>(List.of(new Versao(100, 0))));
        CONFIRMADAS.add(0);

        Transacao a = new Transacao("A", Isolamento.READ_COMMITTED);
        a.ler("saldo");
        Transacao b = new Transacao("B", Isolamento.READ_COMMITTED);
        b.gravar("saldo", 80);
        a.ler("saldo");
        b.confirmar();
        a.ler("saldo");
        a.confirmar();

        Transacao r = new Transacao("R", Isolamento.REPEATABLE_READ);
        r.ler("saldo");
        Transacao c = new Transacao("C", Isolamento.READ_COMMITTED);
        c.gravar("saldo", 60);
        c.confirmar();
        r.ler("saldo");
        r.gravar("saldo", 70);

        Transacao d = new Transacao("D", Isolamento.READ_COMMITTED);
        d.ler("saldo");
        System.out.println("versões guardadas: " + VERSOES.get("saldo").size());
    }
}`,
    saida: 'A lê saldo: 100\nB grava saldo = 80\nA lê saldo: 100\nB COMMIT\nA lê saldo: 80\nA COMMIT\nR lê saldo: 80\nC grava saldo = 60\nC COMMIT\nR lê saldo: 80\nR grava saldo: ERRO, não foi possível serializar o acesso\nD lê saldo: 60\nversões guardadas: 3',
    comentarios:
      'Repare que nenhuma leitura esperou nada: enquanto B tinha a versão 80 sem confirmar, A simplesmente lia a anterior. É a grande vantagem do MVCC sobre um banco que bloqueasse a linha a cada leitura. A recusa de R é o mesmo erro que o PostgreSQL dá em REPEATABLE READ, e pelo mesmo motivo: aceitar a gravação de 70 apagaria o 60 de C, que R nunca viu. Um banco de verdade ainda marca quem apagou cada versão, bloqueia a linha para a segunda gravação concorrente esperar a primeira, considera transações em andamento na fotografia e remove as versões que nenhuma transação viva enxerga mais, o trabalho do `VACUUM` no PostgreSQL.',
  },
  exercicios: [
    {
      id: 'backend-junior-t3-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Numa transferência, o crédito no destino funcionou e o débito na origem falhou. O que a **atomicidade** garante?',
      opcoes: [
        'Que o crédito também seja desfeito, e nada da transação permaneça',
        'Que o débito seja tentado de novo automaticamente',
        'Que o crédito fique, porque já foi executado',
        'Que a transação fique pendente até alguém decidir',
      ],
      resposta: 0,
      explicacao: 'Tudo ou nada. Com o `ROLLBACK`, o banco volta ao estado de antes da transação.',
    },
    {
      id: 'backend-junior-t3-e05-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um método JDBC executa dois `UPDATE`s, sem chamar `setAutoCommit(false)`, e o segundo lança exceção. O que acontece com o primeiro?',
      opcoes: [
        'Já está confirmado: cada comando foi uma transação própria',
        'É desfeito automaticamente',
        'Fica pendente até o próximo `commit()`',
        'É desfeito quando a conexão fechar',
      ],
      resposta: 0,
      explicacao: 'O JDBC começa em *autocommit*. Para agrupar comandos, desligue-o e chame `commit()` ou `rollback()` explicitamente.',
    },
    {
      id: 'backend-junior-t3-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O código de venda faz `int q = buscarEstoque(id); gravarEstoque(id, q - 1);` em duas consultas. Com duas vendas simultâneas do mesmo produto, que defeito pode acontecer?',
      opcoes: [
        'As duas leem o mesmo valor e gravam o mesmo resultado: uma venda não baixa o estoque',
        'O banco lança erro de concorrência',
        'O estoque fica negativo sempre',
        'Nenhum, porque cada consulta é atômica',
      ],
      resposta: 0,
      explicacao: 'É a atualização perdida. Cada comando é atômico, mas o par "ler e depois gravar" não é, e nada avisa.',
    },
    {
      id: 'backend-junior-t3-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a forma mais simples e segura de baixar uma unidade do estoque, sem permitir que ele fique negativo?',
      opcoes: [
        '`UPDATE estoque SET quantidade = quantidade - 1 WHERE produto_id = ? AND quantidade >= 1`, checando se afetou 1 linha',
        'Ler a quantidade, verificar no Java e gravar o novo valor',
        '`SELECT quantidade FROM estoque` sem `WHERE`, para ler tudo de uma vez',
        'Trocar o nível de isolamento para READ UNCOMMITTED',
      ],
      resposta: 0,
      explicacao: 'O banco calcula a partir do valor atual e serializa as gravações. Se a condição falhar, 0 linhas afetadas significa "sem estoque".',
    },
    {
      id: 'backend-junior-t3-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que `SELECT ... FROM ingressos WHERE id = 7 FOR UPDATE` faz?',
      opcoes: [
        'Lê a linha e a bloqueia até o fim da transação; quem tentar bloqueá-la também espera',
        'Lê a linha e a atualiza automaticamente',
        'Apaga a linha depois de ler',
        'Lê a linha sem bloqueio nenhum',
      ],
      resposta: 0,
      explicacao: 'É o bloqueio pessimista: garante que ninguém altere a linha entre a leitura e a gravação da sua transação.',
    },
    {
      id: 'backend-junior-t3-e05-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O `UPDATE produtos SET nome = ?, versao = versao + 1 WHERE id = 7 AND versao = 3` afetou 0 linhas. O que isso significa?',
      opcoes: [
        'Outra transação alterou o produto depois da sua leitura; é preciso reler e decidir de novo',
        'O produto 7 foi apagado, com certeza',
        'A alteração foi gravada, mas o contador não',
        'O banco está fora do ar',
      ],
      resposta: 0,
      explicacao: 'É o bloqueio otimista detectando o conflito. O JPA, com `@Version`, transforma esse 0 numa `OptimisticLockException`.',
    },
    {
      id: 'backend-junior-t3-e05-q07',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Pelo padrão SQL, quais anomalias o nível READ COMMITTED permite? Escolha duas.',
      opcoes: [
        'Leitura não repetível',
        'Fantasma',
        'Leitura suja',
        'Ver alterações desfeitas por `ROLLBACK`',
        'Perder um `COMMIT` depois de uma queda de energia',
      ],
      respostas: [0, 1],
      explicacao: 'O READ COMMITTED só impede ler o que não foi confirmado. A última opção é uma questão de durabilidade, garantida em qualquer nível.',
    },
    {
      id: 'backend-junior-t3-e05-q08',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais são os níveis de isolamento padrão do PostgreSQL e do MySQL com InnoDB?',
      opcoes: [
        'READ COMMITTED no PostgreSQL; REPEATABLE READ no MySQL',
        'SERIALIZABLE nos dois',
        'READ UNCOMMITTED nos dois',
        'REPEATABLE READ no PostgreSQL; READ COMMITTED no MySQL',
      ],
      resposta: 0,
      explicacao: 'O mesmo código pode se comportar diferente nos dois bancos. Na dúvida, defina o nível explicitamente.',
    },
    {
      id: 'backend-junior-t3-e05-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A transação R, em REPEATABLE READ, leu o saldo 80. Outra transação mudou o saldo para 60 e confirmou. Que valor R obtém ao ler de novo?',
      opcoes: ['80', '60', '140', 'Um erro de leitura'],
      resposta: 0,
      explicacao: 'R enxerga a fotografia do começo da transação. Em READ COMMITTED, a segunda leitura veria 60.',
    },
    {
      id: 'backend-junior-t3-e05-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Em REPEATABLE READ, o PostgreSQL recusa uma gravação com `could not serialize access due to concurrent update`. O que a aplicação deve fazer?',
      opcoes: [
        'Repetir a transação inteira desde o começo, com uma fotografia nova',
        'Repetir só o comando que falhou, na mesma transação',
        'Ignorar o erro e confirmar',
        'Trocar para READ UNCOMMITTED',
      ],
      resposta: 0,
      explicacao: 'A transação foi desfeita, e as leituras que embasaram a decisão podem estar desatualizadas. Só recomeçando ela decide sobre os dados atuais.',
    },
    {
      id: 'backend-junior-t3-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Transferências entre contas às vezes falham com "deadlock detected". Qual mudança evita o problema?',
      opcoes: [
        'Atualizar as duas contas sempre na mesma ordem, por exemplo a de menor id primeiro',
        'Aumentar o tempo limite das transações',
        'Usar `SELECT *` antes de cada `UPDATE`',
        'Desligar a detecção de impasses',
      ],
      resposta: 0,
      explicacao: 'O impasse nasce de duas transações bloqueando as mesmas linhas em ordens opostas. Com uma ordem fixa, uma sempre espera a outra terminar.',
    },
    {
      id: 'backend-junior-t3-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um método `@Transactional` baixa o estoque, chama o gateway de pagamento por HTTP, que às vezes demora 20 segundos, e só então confirma. Qual é o problema?',
      opcoes: [
        'A linha do estoque fica bloqueada durante toda a chamada externa, e outras vendas do produto esperam',
        'Nenhum: transações não bloqueiam nada',
        'O HTTP não funciona dentro de uma transação',
        'O banco desfaz a transação depois de 5 segundos',
      ],
      resposta: 0,
      explicacao: 'Transações devem ser curtas. Faça a chamada externa fora, com uma reserva ou um status intermediário, e confirme a venda numa transação rápida.',
    },
    {
      id: 'backend-junior-t3-e05-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa simula o bloqueio otimista: a gravação só acontece se a versão lida ainda for a atual. Digite a saída exata.',
      codigo: `public class Teste {
    static int versao = 1;

    static int gravar(int versaoLida) {
        if (versaoLida != versao) return 0;
        versao++;
        return 1;
    }

    public static void main(String[] args) {
        int lidaPorA = versao;
        int lidaPorB = versao;
        int a = gravar(lidaPorA);
        int b = gravar(lidaPorB);
        int b2 = gravar(versao);
        System.out.println(a + " " + b + " " + b2 + " " + versao);
    }
}`,
      resposta: '1 0 1 3',
      explicacao: 'A grava e muda a versão para 2. B, com a versão 1, não consegue; ao reler (versão 2), grava e a versão vai a 3.',
    },
    {
      id: 'backend-junior-t3-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O programa intercala duas vendas que leem, calculam e gravam o estoque. Qual é a saída?',
      codigo: `public class Teste {
    static int estoque = 10;

    public static void main(String[] args) {
        int lidoA = estoque;
        int lidoB = estoque;
        estoque = lidoA - 2;
        estoque = lidoB - 3;
        int relativo = 10;
        relativo -= 2;
        relativo -= 3;
        System.out.println(estoque + " " + relativo);
    }
}`,
      opcoes: ['`7 5`', '`5 5`', '`8 5`', '`7 7`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'B gravou a partir do valor que leu antes da gravação de A, e a venda de 2 unidades sumiu. A versão relativa, como `SET quantidade = quantidade - 3`, chega aos 5 corretos.',
    },
    {
      id: 'backend-junior-t3-e05-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num banco com MVCC, uma transação longa está lendo uma tabela enquanto outra atualiza linhas dela. O que acontece?',
      opcoes: [
        'Nenhuma espera pela outra: a leitura vê as versões antigas, e a atualização cria versões novas',
        'A atualização espera a leitura terminar',
        'A leitura espera a atualização terminar',
        'As duas são canceladas',
      ],
      resposta: 0,
      explicacao: 'Com várias versões de cada linha, leituras e escritas não disputam bloqueios. Só duas escritas na mesma linha esperam uma pela outra.',
    },
  ],
};

export default episodio;
