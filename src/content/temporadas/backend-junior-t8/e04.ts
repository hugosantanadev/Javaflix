import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t8-e04',
  minutos: 14,
  aula,
  armadilhas: [
    'Ler o diff antes de compilar e rodar os testes gasta atenção com o que a máquina pegaria de graça.',
    'Testes gerados pelo mesmo modelo que gerou o código tendem a ter os mesmos pontos cegos.',
    'A divisão inteira do Java trunca em direção ao zero: fórmulas de arredondamento que funcionam nos positivos falham nos negativos.',
    'Compilar prova que a dependência existe, não que ela é a que parece.',
    'Um nome de dependência quase igual ao oficial, como `starter-validator` no lugar de `starter-validation`, é sinal de alucinação ou de ataque.',
    '`==` entre `Integer` funciona até 127 e falha depois: o teste com valores pequenos passa.',
    'O `toString` de um record mostra todos os componentes, inclusive dados pessoais, em qualquer log.',
    'Diffs grandes demais não são revisados de verdade: peça mudanças menores.',
  ],
  ia: {
    uso:
      'A IA também revisa, e uma segunda conversa, sem o histórico da geração, encontra problemas que a primeira não viu. O valor está em pedir revisões focadas e casos de teste que provem cada problema apontado, para você confirmar se é real.',
    pedido:
      'Revise este diff de uma API Spring Boot 4.1 em Java 25. Você não escreveu este código.\n<cole aqui o diff>\n- Procure erros de fronteira, de tipos numéricos (double em dinheiro, divisão inteira), de igualdade (== em objetos) e de segurança (SQL montado com +, dados pessoais em log, exceções engolidas).\n- Para cada problema, diga a linha e escreva um caso de teste JUnit que falha por causa dele.\n- Liste as dependências novas e diga se o nome é exatamente o do Maven Central.\n- Não reescreva o código; só aponte.',
    erros: [
      'Aponta "problemas" de estilo e deixa passar o erro de lógica.',
      'Escreve casos de teste que passam com o código errado, porque copiam a mesma fórmula.',
      'Confirma que uma dependência existe sem ter como saber.',
      'Reescreve tudo em vez de apontar os problemas.',
    ],
    conferir: [
      'Rode cada caso de teste sugerido: se ele passa, o problema apontado não foi demonstrado.',
      'Procure cada dependência nova pelo nome exato em search.maven.org.',
      'Compare a lista de problemas com o funil da aula: faltou alguma camada?',
    ],
  },
  recursos: [
    {
      titulo: 'Java Language Specification: Division Operator',
      url: 'https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.17.2',
      tipo: 'documentacao',
      porque: 'A regra que faz a divisão inteira truncar em direção ao zero.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: Math.floorDiv',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Math.html#floorDiv(int,int)',
      tipo: 'documentacao',
      porque: 'A divisão que arredonda para baixo também nos negativos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Maven Central Search',
      url: 'https://central.sonatype.com/',
      tipo: 'ferramenta',
      porque: 'Onde conferir o nome exato, o publicador e as versões de uma dependência.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OWASP: SQL Injection Prevention Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
      tipo: 'artigo',
      porque: 'Por que consultas parametrizadas resolvem e escapar aspas à mão não.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OWASP: Logging Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html',
      tipo: 'artigo',
      porque: 'O que pode e o que nunca deve ir para um log.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OWASP Dependency-Check',
      url: 'https://owasp.org/www-project-dependency-check/',
      tipo: 'ferramenta',
      porque: 'Confere as dependências do projeto contra vulnerabilidades conhecidas, no Maven.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'jqwik: Property-Based Testing in Java',
      url: 'https://jqwik.net/',
      tipo: 'ferramenta',
      porque: 'Testes com entradas sorteadas e redução automática do contraexemplo, para o JUnit.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Google Engineering Practices: How to do a code review',
      url: 'https://google.github.io/eng-practices/review/reviewer/',
      tipo: 'artigo',
      porque: 'O que olhar numa revisão, em que ordem, e o tamanho certo de uma mudança.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spencer et al.: We Have a Package for You! (alucinação de pacotes)',
      url: 'https://arxiv.org/abs/2406.10279',
      tipo: 'artigo',
      porque: 'O estudo que mediu com que frequência os modelos sugerem pacotes que não existem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Giuliana Bezerra: Introdução aos testes automatizados com Spring Boot',
      url: 'https://www.youtube.com/watch?v=N1UkkK4jIHM',
      tipo: 'video',
      porque: 'As camadas de teste numa aplicação Spring, em português: a base do funil de conferência.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Software Engineering at Google (Winters, Manshreck e Wright)',
      url: 'https://abseil.io/resources/swe-book',
      tipo: 'livro',
      porque: 'Revisão de código, testes e dependências numa empresa com milhares de desenvolvedores; gratuito online.',
      onde: 'Capítulo 9, "Code Review", e capítulo 21, "Dependency Management"',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Um testador diferencial',
    enunciado:
      'Escreva `comparar(IntUnaryOperator a, IntUnaryOperator b, long semente, int vezes)`, que sorteia `vezes` inteiros entre -1.000 e 999 com `new Random(semente)` e devolve quantas vezes `a` e `b` divergem e o **menor contraexemplo** em valor absoluto. Compare a fórmula gerada `(x + 4) / 5 * 5` e uma corrigida com `Math.floorDiv` contra a versão óbvia da aula (somar 1 até chegar a um múltiplo de 5), com semente 42 e 10.000 sorteios. Imprima exatamente:\n\n```text\ngerada: 4092 divergências, menor contraexemplo -5\ncorrigida: 0 divergências\n```',
    dicas: [
      '`r.nextInt(-1_000, 1_000)` sorteia no intervalo, com o fim excluído.',
      'Um record `Resultado(int divergencias, Integer menor)` devolve as duas informações.',
      'O menor contraexemplo é o que mais facilita entender o erro: em -5, é fácil fazer a conta à mão.',
    ],
    solucao: `import java.util.Random;
import java.util.function.IntUnaryOperator;

public class Diferencas {
    record Resultado(int divergencias, Integer menor) {}

    static Resultado comparar(IntUnaryOperator a, IntUnaryOperator b, long semente, int vezes) {
        Random r = new Random(semente);
        int divergencias = 0;
        Integer menor = null;
        for (int i = 0; i < vezes; i++) {
            int x = r.nextInt(-1_000, 1_000);
            if (a.applyAsInt(x) != b.applyAsInt(x)) {
                divergencias++;
                if (menor == null || Math.abs(x) < Math.abs(menor)) menor = x;
            }
        }
        return new Resultado(divergencias, menor);
    }

    public static void main(String[] args) {
        IntUnaryOperator obvia = x -> {
            int r = x;
            while (r % 5 != 0) r++;
            return r;
        };
        IntUnaryOperator gerada = x -> (x + 4) / 5 * 5;
        IntUnaryOperator corrigida = x -> Math.floorDiv(x + 4, 5) * 5;
        Resultado r1 = comparar(gerada, obvia, 42, 10_000);
        Resultado r2 = comparar(corrigida, obvia, 42, 10_000);
        System.out.println("gerada: " + r1.divergencias() + " divergências, menor contraexemplo " + r1.menor());
        System.out.println("corrigida: " + r2.divergencias() + " divergências");
    }
}`,
    saida: 'gerada: 4092 divergências, menor contraexemplo -5\ncorrigida: 0 divergências',
    comentarios:
      'Em -5, a fórmula gerada faz (-1) / 5 = 0, e o resultado é 0, quando -5 já é múltiplo de 5. Bibliotecas de testes por propriedades, como o jqwik, fazem esse trabalho de "encolher" o contraexemplo automaticamente. A semente fixa torna o teste repetível: se ele falhar no CI, falha igual na sua máquina.',
  },
  bugs: [
    {
      id: 'backend-junior-t8-e04-b01',
      dificuldade: 1,
      sintoma: 'Depois de um código gerado entrar no ar, clientes com id acima de 127 não conseguem ver os próprios pedidos. O log mostra `acesso negado` para o cliente 1500 no pedido dele.',
      codigo: `public class Ids {
    public static void main(String[] args) {
        Integer donoDoPedido = 1500;
        Integer usuarioLogado = 1500;
        if (donoDoPedido == usuarioLogado) {
            System.out.println("acesso liberado");
        } else {
            System.out.println("acesso negado");
        }
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'acesso negado' },
      correcao: `public class Ids {
    public static void main(String[] args) {
        Integer donoDoPedido = 1500;
        Integer usuarioLogado = 1500;
        if (donoDoPedido.equals(usuarioLogado)) {
            System.out.println("acesso liberado");
        } else {
            System.out.println("acesso negado");
        }
    }
}`,
      saidaCorrigida: 'acesso liberado',
      dica: 'Por que funcionava para os clientes de id baixo?',
      explicacao:
        '`==` entre `Integer` compara referências. O Java reaproveita os objetos de -128 a 127, então ids pequenos "funcionam"; acima disso, cada valor é um objeto novo. Os testes com ids 1 e 2 passavam. Use `equals`, ou tipos primitivos.',
    },
    {
      id: 'backend-junior-t8-e04-b02',
      dificuldade: 2,
      sintoma: 'Estornos pequenos somem do extrato: `estorno de -7 centavos vira 0`. Para valores positivos, o arredondamento funciona.',
      codigo: `public class Arredonda {
    static int paraCimaDe5(int centavos) {
        return (centavos + 4) / 5 * 5;
    }

    public static void main(String[] args) {
        System.out.println("estorno de -7 centavos vira " + paraCimaDe5(-7));
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: 'estorno de -7 centavos vira 0' },
      correcao: `public class Arredonda {
    static int paraCimaDe5(int centavos) {
        return Math.floorDiv(centavos + 4, 5) * 5;
    }

    public static void main(String[] args) {
        System.out.println("estorno de -7 centavos vira " + paraCimaDe5(-7));
    }
}`,
      saidaCorrigida: 'estorno de -7 centavos vira -5',
      dica: 'Quanto vale `-3 / 5` em Java?',
      explicacao:
        'A divisão inteira trunca em direção ao zero: `-3 / 5` é 0, e não -1. `Math.floorDiv` arredonda para baixo, e a fórmula volta a valer para negativos. O teste diferencial da aula encontra esse caso sozinho.',
    },
    {
      id: 'backend-junior-t8-e04-b03',
      dificuldade: 3,
      sintoma: 'Uma auditoria encontrou CPFs completos no log de produção: `cliente criado: Cliente[id=7, nome=Ana Lima, cpf=12345678900]`.',
      codigo: `public class Log {
    record Cliente(long id, String nome, String cpf) {}

    static void criar(Cliente c) {
        System.out.println("cliente criado: " + c);
    }

    public static void main(String[] args) {
        criar(new Cliente(7, "Ana Lima", "12345678900"));
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'cliente criado: Cliente[id=7, nome=Ana Lima, cpf=12345678900]' },
      correcao: `public class Log {
    record Cliente(long id, String nome, String cpf) {}

    static void criar(Cliente c) {
        System.out.println("cliente criado: id=" + c.id());
    }

    public static void main(String[] args) {
        criar(new Cliente(7, "Ana Lima", "12345678900"));
    }
}`,
      saidaCorrigida: 'cliente criado: id=7',
      dica: 'O que o `toString` gerado de um record inclui?',
      explicacao:
        'Concatenar o record chama o `toString` gerado, que mostra todos os componentes. Logue só o identificador. Uma alternativa é sobrescrever o `toString` do record para mascarar o CPF, para que nenhum log futuro o vaze por descuido.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t8-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O agente entregou um diff de 60 linhas. Qual é a melhor ordem de conferência?',
      opcoes: [
        'Compilar e rodar a suíte primeiro; depois ler o diff com atenção à lógica, à segurança e às dependências',
        'Ler o diff inteiro primeiro; compilar só se parecer certo',
        'Fazer o commit e deixar o CI conferir',
        'Pedir ao agente para conferir',
      ],
      resposta: 0,
      explicacao: 'O compilador e os testes pegam a primeira leva de erros de graça. A atenção humana vai para o que eles não sabem julgar.',
      dica: 'O que é mais barato: a sua atenção ou o compilador?',
    },
    {
      id: 'backend-junior-t8-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `System.out.println(-7 / 5 + " " + Math.floorDiv(-7, 5));`,
      resposta: '-1 -2',
      explicacao: 'A divisão do Java trunca em direção ao zero: -1,4 vira -1. `floorDiv` arredonda para baixo: -1,4 vira -2. Nos positivos, os dois dão o mesmo resultado.',
      dica: '-7 ÷ 5 = -1,4. Truncar e arredondar para baixo dão o mesmo número?',
    },
    {
      id: 'backend-junior-t8-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O assistente gerou um validador de CPF e 10 testes, todos passando. Por que isso prova pouco?',
      opcoes: [
        'Os testes vieram do mesmo modelo, com a mesma compreensão da regra; se ele entendeu errado, os testes confirmam o erro',
        'Porque 10 testes é pouco para qualquer método',
        'Porque testes gerados nunca compilam',
        'Prova muito: testes passando sempre indicam código correto',
      ],
      resposta: 0,
      explicacao: 'Testes são uma segunda opinião só quando vêm de uma fonte independente: você, o critério de aceitação ou uma versão óbvia num teste diferencial.',
      dica: 'Os testes e o código vieram da mesma "cabeça"?',
    },
    {
      id: 'backend-junior-t8-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais trechos num diff gerado merecem atenção de segurança? Escolha dois.',
      opcoes: [
        '`"... where nome = \'" + nome + "\'"`',
        '`log.info("pagamento recebido: {}", cartao)`',
        '`private static final int LIMITE = 20;`',
        '`return Optional.ofNullable(cliente);`',
        '`@Positive int quantidade`',
      ],
      respostas: [0, 1],
      explicacao: 'SQL montado por concatenação abre injeção, e logar o objeto do cartão vaza dados sensíveis. Uma constante, um `Optional` e uma validação são inofensivos.',
      dica: 'Onde dados de fora entram no SQL, e onde dados sensíveis saem para o log?',
    },
    {
      id: 'backend-junior-t8-e04-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para dividir arredondando para baixo, também nos negativos.',
      codigo: `System.out.println(Math.___(-7, 5));`,
      respostas: ['floorDiv'],
      saida: '-2',
      explicacao: '`Math.floorDiv` é a divisão "matemática" para baixo. O par dela é `Math.floorMod`, que devolve sempre um resto com o sinal do divisor.',
      dica: '"floor" é o arredondamento para baixo.',
    },
    {
      id: 'backend-junior-t8-e04-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `IntUnaryOperator gerada = x -> (x + 4) / 5 * 5;
IntUnaryOperator obvia = x -> {
    int r = x;
    while (r % 5 != 0) r++;
    return r;
};
System.out.println(gerada.applyAsInt(-7) + " " + obvia.applyAsInt(-7));`,
      opcoes: ['`0 -5`', '`-5 -5`', '`-10 -5`', '`0 0`', '`-5 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Na gerada, (-7 + 4) / 5 = -3 / 5 = 0, e 0 × 5 = 0. Na óbvia, -7 sobe até -5, o múltiplo de 5 logo acima. A divergência só aparece nos negativos.',
      dica: 'Faça -3 / 5 com a regra de truncar em direção ao zero.',
    },
    {
      id: 'backend-junior-t8-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O diff acrescenta `org.springframework.boot:spring-boot-starter-validator` ao `pom.xml`, e o build falha ao baixar. O que provavelmente aconteceu?',
      opcoes: [
        'O modelo inventou um nome parecido com o oficial, `spring-boot-starter-validation`; confira o nome exato no repositório central',
        'O Maven Central está fora do ar',
        'A dependência é paga',
        'Falta a versão no `pom.xml`',
      ],
      resposta: 0,
      explicacao: 'É uma alucinação típica: um nome plausível, quase igual ao de verdade. O perigo maior é quando alguém publica um pacote com o nome inventado, e o build passa a baixar código malicioso.',
      dica: 'Compare o nome com o do starter de validação que você usou na temporada de Spring Boot.',
    },
    {
      id: 'backend-junior-t8-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um erro aparece em 1 a cada 1.000 entradas. Qual é a chance de 10 testes escolhidos ao acaso encontrarem o erro? Qual é a saída?',
      codigo: `double chance = 1 - Math.pow(0.999, 10);
System.out.println(Math.round(chance * 100) + "%");`,
      opcoes: ['`1%`', '`10%`', '`0%`', '`99%`', '`50%`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A chance de cada teste não pegar é 0,999; de os 10 não pegarem, 0,999¹⁰ ≈ 0,990. Sobra cerca de 1%. Com 10.000 sorteios, a chance de não encontrar cai para perto de zero.',
      dica: 'Calcule a chance de nenhum dos 10 encontrar e subtraia de 1.',
    },
    {
      id: 'backend-junior-t8-e04-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `Integer a = 127, b = 127;
Integer c = 1000, d = 1000;
System.out.println((a == b) + " " + (c == d) + " " + c.equals(d));`,
      resposta: 'true false true',
      explicacao: 'De -128 a 127, o autoboxing reaproveita os mesmos objetos, e `==` acerta por acaso. Para 1000, são objetos diferentes. `equals` compara o valor e funciona sempre.',
      dica: 'O Java guarda em cache os `Integer` de -128 a 127.',
    },
    {
      id: 'backend-junior-t8-e04-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é *slopsquatting*?',
      opcoes: [
        'Publicar um pacote malicioso com o nome de uma dependência que os modelos costumam inventar',
        'Um padrão de projeto para APIs',
        'Um tipo de teste de carga',
        'Copiar código de outro projeto sem licença',
      ],
      resposta: 0,
      explicacao: 'Como os modelos repetem os mesmos nomes inventados, um atacante pode registrar esses nomes e esperar que alguém copie a sugestão. Conferir o nome exato e a origem fecha a porta.',
      dica: 'Junta "slop", o texto gerado sem cuidado, com o golpe de registrar nomes parecidos.',
    },
    {
      id: 'backend-junior-t8-e04-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'O diff tem `"select * from pedidos where situacao = \'" + situacao + "\'"`. Quais correções resolvem a injeção? Escolha duas.',
      opcoes: [
        'Usar uma consulta parametrizada, com `where situacao = ?` e o valor passado à parte',
        'Usar um método derivado do Spring Data, como `findBySituacao(Situacao s)`',
        'Trocar as aspas simples do valor por duas aspas simples, à mão',
        'Limitar o valor a 20 caracteres',
        'Converter o valor para maiúsculas antes de concatenar',
      ],
      respostas: [0, 1],
      explicacao: 'Nas duas primeiras, o valor nunca vira parte do texto SQL. Escapar à mão erra em casos de borda, e limitar ou mudar a caixa não impede um texto malicioso curto.',
      dica: 'Quais opções separam o valor do comando SQL?',
    },
    {
      id: 'backend-junior-t8-e04-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Complete a consulta parametrizada do JDBC.',
      codigo: `String sql = "select id from pedidos where situacao = ___";
System.out.println(sql);`,
      respostas: ['?'],
      saida: 'select id from pedidos where situacao = ?',
      explicacao: 'No JDBC, cada `?` é preenchido depois com `setString`, `setLong` e afins, e o banco recebe o valor separado do comando. O JPA aceita também parâmetros com nome, como `:situacao`.',
      dica: 'O marcador de parâmetro do `PreparedStatement`.',
    },
    {
      id: 'backend-junior-t8-e04-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'O assistente sugeriu este código. Clique na linha que não compila.',
      codigo: `List<Integer> valores = List.of(10, 20, 30);
int total = valores.sum();
System.out.println(total);`,
      resposta: 2,
      explicacao: '`List` não tem `sum`. O jeito do Java é `valores.stream().mapToInt(Integer::intValue).sum()`. O nome inventado vem de outras linguagens, em que listas têm `sum`.',
      dica: 'Que métodos a interface `List` tem?',
    },
    {
      id: 'backend-junior-t8-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que pedir a revisão do código gerado numa conversa nova, e não na mesma em que ele foi gerado?',
      opcoes: [
        'Sem o histórico, o modelo não "defende" as escolhas que fez e olha o código como algo alheio',
        'Porque conversas longas ficam mais caras, e só por isso',
        'Porque o modelo só revisa código em conversas novas',
        'Não faz diferença',
      ],
      resposta: 0,
      explicacao: 'Na mesma conversa, o contexto contém o raciocínio que levou ao erro, e a continuação mais provável é concordar com ele. Uma conversa nova se parece mais com uma revisão de verdade.',
      dica: 'O que está no contexto da conversa original?',
    },
    {
      id: 'backend-junior-t8-e04-q15',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Digite a saída exata.',
      codigo: `int primeiro = new Random(42).nextInt(100);
int segundo = new Random(42).nextInt(100);
System.out.println(primeiro == segundo);`,
      resposta: 'true',
      explicacao: 'Com a mesma semente, o `Random` produz a mesma sequência. É o que torna um teste com sorteio repetível: se falhar no CI, falha igual na sua máquina.',
      dica: 'O que a semente controla?',
    },
  ],
};

export default episodio;
