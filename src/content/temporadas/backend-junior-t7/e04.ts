import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t7-e04',
  minutos: 14,
  aula,
  armadilhas: [
    'Uma regra que vira status HTTP precisa de dois testes: um da regra, na entidade, e um do status, na fatia web.',
    'A máquina de estados tem 25 combinações; testar só as 5 permitidas deixa as 20 proibidas sem garantia.',
    '100% de cobertura de linhas não prova nada: uma linha com `?:` tem dois ramos, e um teste sem asserção também conta.',
    'Exigir uma porcentagem de cobertura no CI incentiva testes que chamam métodos sem conferir o resultado.',
    'O valor exato da fronteira ("a partir de 200") é o caso que mais falha e o que menos se testa.',
    'Calcular o valor esperado com a mesma fórmula do código copia o erro para o teste.',
    'Uma suíte só de `@SpringBootTest` fica tão lenta que o time para de rodá-la antes do commit.',
  ],
  ia: {
    uso:
      'Gerar testes é uma das tarefas em que a IA mais rende, porque o formato é repetitivo. O risco é ela gerar muitos testes do caminho feliz e calcular o esperado copiando a implementação. Dê a ela os critérios de aceitação, não só o código, e use o teste de mutação para medir o que ela entregou.',
    pedido:
      'Escreva os testes de unidade da entidade Pedido abaixo, com JUnit 6 e AssertJ.\n<cole aqui a entidade e o enum Situacao>\n- Um teste parametrizado com as 25 combinações de situação de origem e destino, gerado por @MethodSource.\n- Os casos de fronteira do total: um item, itens com preço de três casas, quantidade 1.\n- Valores esperados escritos à mão, nunca calculados com a mesma fórmula do código.\n- Nada de Spring nem de banco nesses testes; nomes que digam o comportamento.',
    erros: [
      'Testa só as transições permitidas e esquece as proibidas.',
      'Calcula o total esperado repetindo a fórmula do código.',
      'Sobe `@SpringBootTest` para testar uma regra que está numa classe comum.',
      'Escreve testes sem asserção, que só chamam o método.',
    ],
    conferir: [
      'Conte os casos do teste parametrizado no relatório: precisam ser 25.',
      'Rode o PIT na classe e veja se algum mutante sobrevive.',
      'Quebre a regra de propósito, trocando `>=` por `>`, e confira que algum teste falha.',
    ],
  },
  recursos: [
    {
      titulo: 'JUnit User Guide: Parameterized Tests',
      url: 'https://docs.junit.org/current/user-guide/#writing-tests-parameterized-tests',
      tipo: 'documentacao',
      porque: '`@CsvSource`, `@MethodSource` e os nomes de cada caso.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JaCoCo: Coverage Counters',
      url: 'https://www.jacoco.org/jacoco/trunk/doc/counters.html',
      tipo: 'documentacao',
      porque: 'A diferença entre cobertura de instruções, linhas e ramos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JaCoCo: Maven Plug-in',
      url: 'https://www.jacoco.org/jacoco/trunk/doc/maven.html',
      tipo: 'documentacao',
      porque: 'Como gerar o relatório de cobertura no `mvn verify`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'PIT Mutation Testing',
      url: 'https://pitest.org/',
      tipo: 'ferramenta',
      porque: 'O teste de mutação para Java, com os tipos de mutante que ele aplica.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'PIT: Mutation Operators',
      url: 'https://pitest.org/quickstart/mutators/',
      tipo: 'documentacao',
      porque: 'A lista de mutações, como a de fronteira, que troca `>=` por `>`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: Test Coverage',
      url: 'https://martinfowler.com/bliki/TestCoverage.html',
      tipo: 'artigo',
      porque: 'Por que cobertura é uma ferramenta para achar código sem teste, e não uma meta.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Martin Fowler: The Practical Test Pyramid',
      url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
      tipo: 'artigo',
      porque: 'A pirâmide aplicada a uma aplicação web, camada por camada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Giuliana Bezerra: Introdução aos testes automatizados com Spring Boot',
      url: 'https://www.youtube.com/watch?v=N1UkkK4jIHM',
      tipo: 'video',
      porque: 'Os tipos de teste numa aplicação Spring, de unidade a integração, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'AlgaWorks: Testes em controllers com Spring MockMvc',
      url: 'https://www.youtube.com/watch?v=ngbKmhXDP4A',
      tipo: 'video',
      porque: 'Os testes da fatia web, com status e JSON, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Test-Driven Development: By Example (Kent Beck)',
      url: 'https://www.oreilly.com/library/view/test-driven-development/0321146530/',
      tipo: 'livro',
      porque: 'O livro que popularizou o ciclo de escrever o teste antes do código.',
      onde: 'Parte I, "The Money Example", em especial os capítulos 1 a 4',
      gratuito: false,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Um testador de mutantes',
    enunciado:
      'A regra é "frete grátis a partir de 200": `total >= 200`. Crie três mutantes como `IntPredicate`, com `>`, `<` e `==` no lugar do `>=`, e rode duas suítes de casos (valor de entrada e resultado esperado): uma com 250 e 100, e outra que acrescenta 200. Um mutante morre quando algum caso dá resultado diferente do esperado. Imprima exatamente:\n\n```text\nsem fronteira: 2 de 3 mortos, sobreviventes [>]\ncom fronteira: 3 de 3 mortos, sobreviventes []\n```',
    dicas: [
      'Um `LinkedHashMap<String, IntPredicate>` guarda os mutantes na ordem em que foram criados.',
      'A suíte pode ser um `Map<Integer, Boolean>`, com o valor e o resultado esperado da regra original.',
      'Um mutante sobrevive quando passa em **todos** os casos.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.IntPredicate;

public class Mutantes {
    static final Map<String, IntPredicate> MUTANTES = new LinkedHashMap<>();

    static String rodar(String nome, Map<Integer, Boolean> casos) {
        List<String> sobreviventes = new ArrayList<>();
        for (Map.Entry<String, IntPredicate> m : MUTANTES.entrySet()) {
            boolean passouEmTudo = casos.entrySet().stream()
                    .allMatch(c -> m.getValue().test(c.getKey()) == c.getValue());
            if (passouEmTudo) sobreviventes.add(m.getKey());
        }
        int mortos = MUTANTES.size() - sobreviventes.size();
        return nome + ": " + mortos + " de " + MUTANTES.size() + " mortos, sobreviventes " + sobreviventes;
    }

    public static void main(String[] args) {
        MUTANTES.put(">", t -> t > 200);
        MUTANTES.put("<", t -> t < 200);
        MUTANTES.put("==", t -> t == 200);

        Map<Integer, Boolean> semFronteira = new LinkedHashMap<>();
        semFronteira.put(250, true);
        semFronteira.put(100, false);

        Map<Integer, Boolean> comFronteira = new LinkedHashMap<>(semFronteira);
        comFronteira.put(200, true);

        System.out.println(rodar("sem fronteira", semFronteira));
        System.out.println(rodar("com fronteira", comFronteira));
    }
}`,
    saida: 'sem fronteira: 2 de 3 mortos, sobreviventes [>]\ncom fronteira: 3 de 3 mortos, sobreviventes []',
    comentarios:
      'É o algoritmo do PIT em miniatura: alterar o código, rodar os testes e ver quem percebe. O mutante `>` só morre com o caso 200, a fronteira. Na prática, o PIT altera o bytecode, gera dezenas de mutantes por classe e mostra os sobreviventes linha por linha.',
  },
  bugs: [
    {
      id: 'backend-junior-t7-e04-b01',
      dificuldade: 1,
      sintoma: 'Uma cliente comprou exatamente R$ 200,00 e pagou frete, mas a regra é "frete grátis a partir de 200". O log mostra `frete de 200: R$ 15,00`.',
      codigo: `public class Frete {
    static String frete(int total) {
        return total > 200 ? "grátis" : "R$ 15,00";
    }

    public static void main(String[] args) {
        System.out.println("frete de 200: " + frete(200));
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: 'frete de 200: R$ 15,00' },
      correcao: `public class Frete {
    static String frete(int total) {
        return total >= 200 ? "grátis" : "R$ 15,00";
    }

    public static void main(String[] args) {
        System.out.println("frete de 200: " + frete(200));
    }
}`,
      saidaCorrigida: 'frete de 200: grátis',
      dica: '"A partir de 200" inclui o 200?',
      explicacao:
        'É o erro de fronteira, o mesmo que o mutante `>` simula. Os testes com 250 e 100 passavam nas duas versões. Para toda regra com limite, escreva um caso exatamente no limite.',
    },
    {
      id: 'backend-junior-t7-e04-b02',
      dificuldade: 2,
      sintoma: 'A listagem deveria abrir com o pedido mais recente, mas mostra primeiro o mais antigo do mês: `primeiro da lista: pedido 1`.',
      codigo: `import java.util.Comparator;
import java.util.List;

public class Listagem {
    record Pedido(long id, String criadoEm) {}

    public static void main(String[] args) {
        List<Pedido> pedidos = List.of(
                new Pedido(1, "2026-10-01"), new Pedido(2, "2026-10-15"), new Pedido(3, "2026-10-08"));
        List<Pedido> pagina = pedidos.stream()
                .sorted(Comparator.comparing(Pedido::criadoEm))
                .toList();
        System.out.println("primeiro da lista: pedido " + pagina.get(0).id());
    }
}`,
      linha: 11,
      efeito: { tipo: 'saida', saida: 'primeiro da lista: pedido 1' },
      correcao: `import java.util.Comparator;
import java.util.List;

public class Listagem {
    record Pedido(long id, String criadoEm) {}

    public static void main(String[] args) {
        List<Pedido> pedidos = List.of(
                new Pedido(1, "2026-10-01"), new Pedido(2, "2026-10-15"), new Pedido(3, "2026-10-08"));
        List<Pedido> pagina = pedidos.stream()
                .sorted(Comparator.comparing(Pedido::criadoEm).reversed())
                .toList();
        System.out.println("primeiro da lista: pedido " + pagina.get(0).id());
    }
}`,
      saidaCorrigida: 'primeiro da lista: pedido 2',
      dica: 'O `Comparator.comparing` ordena de qual jeito, do menor ou do maior?',
      explicacao:
        'O padrão é a ordem crescente, do mais antigo para o mais novo. `reversed()` inverte. O teste que pegaria isso usa dados fora de ordem, como aqui; com pedidos já inseridos em ordem, a listagem errada passa.',
    },
    {
      id: 'backend-junior-t7-e04-b03',
      dificuldade: 3,
      sintoma: 'O painel do dia mostra `pedidos de hoje: 1`, mas foram 2: um entrou à meia-noite em ponto. Os testes passavam porque nenhum usava 00:00.',
      codigo: `import java.time.LocalDateTime;
import java.util.List;

public class Hoje {
    static long contarDeHoje(List<LocalDateTime> criados, LocalDateTime agora) {
        LocalDateTime inicio = agora.toLocalDate().atStartOfDay();
        return criados.stream().filter(c -> c.isAfter(inicio)).count();
    }

    public static void main(String[] args) {
        LocalDateTime agora = LocalDateTime.of(2026, 10, 31, 15, 0);
        List<LocalDateTime> criados = List.of(
                LocalDateTime.of(2026, 10, 31, 0, 0),
                LocalDateTime.of(2026, 10, 31, 9, 30),
                LocalDateTime.of(2026, 10, 30, 23, 59));
        System.out.println("pedidos de hoje: " + contarDeHoje(criados, agora));
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'pedidos de hoje: 1' },
      correcao: `import java.time.LocalDateTime;
import java.util.List;

public class Hoje {
    static long contarDeHoje(List<LocalDateTime> criados, LocalDateTime agora) {
        LocalDateTime inicio = agora.toLocalDate().atStartOfDay();
        return criados.stream().filter(c -> !c.isBefore(inicio)).count();
    }

    public static void main(String[] args) {
        LocalDateTime agora = LocalDateTime.of(2026, 10, 31, 15, 0);
        List<LocalDateTime> criados = List.of(
                LocalDateTime.of(2026, 10, 31, 0, 0),
                LocalDateTime.of(2026, 10, 31, 9, 30),
                LocalDateTime.of(2026, 10, 30, 23, 59));
        System.out.println("pedidos de hoje: " + contarDeHoje(criados, agora));
    }
}`,
      saidaCorrigida: 'pedidos de hoje: 2',
      dica: '00:00 de hoje é "depois" do início do dia?',
      explicacao:
        '`isAfter` é estrito: um instante não é depois de si mesmo. "A partir de" é `!isBefore`, o `>=` das datas. É a mesma fronteira do frete, agora no tempo, e só aparece com um caso de teste exatamente na meia-noite.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t7-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A regra "pedido enviado não pode ser cancelado" já tem um teste na entidade. Por que testar também o 409 com `@WebMvcTest`?',
      opcoes: [
        'Porque a regra e a tradução para o status HTTP podem quebrar separadamente: alguém pode mudar o tratador de erros sem tocar na entidade',
        'Porque o teste da entidade não roda no CI',
        'Porque o `@WebMvcTest` também testa o banco',
        'Não precisa: um teste por regra basta',
      ],
      resposta: 0,
      explicacao:
        'O teste da entidade garante que a exceção acontece. O da fatia web garante que ela vira 409 com o corpo certo. Um bug no tratador, como o do e01, passaria pelo primeiro e seria pego pelo segundo.',
      dica: 'Lembre do bug do 500 no lugar do 409 no primeiro episódio.',
    },
    {
      id: 'backend-junior-t7-e04-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `enum Situacao { CRIADO, PAGO, ENVIADO, ENTREGUE, CANCELADO }

int n = Situacao.values().length;
int combinacoes = n * n;
int permitidas = 5;
System.out.println(combinacoes + " " + (combinacoes - permitidas));`,
      resposta: '25 20',
      explicacao: 'Cada uma das 5 situações pode pedir cada uma das 5, inclusive ela mesma: 25 casos. Só 5 são permitidos, e os outros 20 precisam responder 409.',
      dica: 'Origem e destino podem ser qualquer uma das 5 situações.',
    },
    {
      id: 'backend-junior-t7-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `int total = 200;
System.out.println((total >= 200) + " " + (total > 200));`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Só no valor exato da fronteira os dois operadores discordam. É por isso que o caso 200 é o que mata o mutante `>`.',
      dica: '200 é maior que 200?',
    },
    {
      id: 'backend-junior-t7-e04-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'A regra é "frete grátis a partir de R$ 200,00". Quais valores são os mais importantes para os testes? Escolha dois.',
      opcoes: ['`200.00`', '`199.99`', '`1000.00`', '`250.00`', '`0.00`'],
      respostas: [0, 1],
      explicacao:
        'O limite e o valor logo abaixo dele cercam a fronteira dos dois lados. Um valor longe, como 1000 ou 250, passa tanto com `>=` quanto com `>`; zero é um caso válido, mas não testa a regra do limite.',
      dica: 'Onde fica a fronteira, e qual é o vizinho dela do outro lado?',
    },
    {
      id: 'backend-junior-t7-e04-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para conferir se a transição está na lista das permitidas.',
      codigo: `Set<String> permitidas = Set.of("CRIADO>PAGO", "PAGO>ENVIADO");
String de = "PAGO", para = "ENVIADO";
boolean esperado = permitidas.___(de + ">" + para);
System.out.println(esperado);`,
      respostas: ['contains'],
      saida: 'true',
      explicacao: 'A lista das permitidas é uma segunda forma de escrever a regra. Comparar as duas, em todas as combinações, é o que o teste da aula faz.',
      dica: 'Qual método do `Set` diz se um elemento está nele?',
    },
    {
      id: 'backend-junior-t7-e04-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O JaCoCo mostra 100% de cobertura de linhas na classe `Frete`, que tem uma linha com `total >= 200 ? "grátis" : "R$ 15,00"`. O único teste chama `frete(250)` e não tem asserção. O que dá para concluir?',
      opcoes: [
        'Quase nada: só um dos dois ramos foi executado, e nenhum resultado foi conferido',
        'A regra do frete está garantida',
        'O ramo de `"R$ 15,00"` também foi testado, porque a linha foi executada',
        'O JaCoCo está com defeito',
      ],
      resposta: 0,
      explicacao:
        'Cobertura de linhas conta linhas tocadas. A cobertura de ramos mostraria 50%. E nenhuma das duas sabe se existe asserção: um teste que só chama o método conta igual.',
      dica: 'A linha tem dois resultados possíveis. Quantos o teste exercitou, e conferiu algum?',
    },
    {
      id: 'backend-junior-t7-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quanto tempo levariam 94 testes se todos fossem `@SpringBootTest` de 2 segundos? Qual é a saída?',
      codigo: `System.out.println(94 * 2 + " segundos");`,
      opcoes: ['`188 segundos`', '`96 segundos`', '`942 segundos`', '`47 segundos`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        '94 × 2 = 188 segundos, mais de 3 minutos. Com a pirâmide da aula, a mesma cobertura sai em uns 12 segundos mais a inicialização do contêiner.',
      dica: 'Multiplique e lembre que a conta vem antes da concatenação.',
    },
    {
      id: 'backend-junior-t7-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O PIT relata: "changed conditional boundary → SURVIVED" na linha `if (total.compareTo(LIMITE) >= 0)`. O que isso significa?',
      opcoes: [
        'Trocar `>=` por `>` não fez nenhum teste falhar: falta um caso exatamente no limite',
        'O código tem um bug na fronteira',
        'O PIT não conseguiu compilar o mutante',
        'O teste dessa linha está lento demais',
      ],
      resposta: 0,
      explicacao:
        'Um mutante sobrevivente aponta uma lacuna nos **testes**, não necessariamente no código. O código pode estar certo; o que falta é um teste que provaria isso, com o valor do limite.',
      dica: 'Quem "sobreviveu", e a que ele sobreviveu?',
    },
    {
      id: 'backend-junior-t7-e04-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Quantos casos distinguem o original do mutante em cada suíte? Digite a saída exata.',
      codigo: `IntPredicate original = t -> t >= 200;
IntPredicate mutante = t -> t > 200;
int semFronteira = 0, comFronteira = 0;
for (int t : new int[] {250, 100}) if (original.test(t) != mutante.test(t)) semFronteira++;
for (int t : new int[] {250, 100, 200}) if (original.test(t) != mutante.test(t)) comFronteira++;
System.out.println(semFronteira + " " + comFronteira);`,
      resposta: '0 1',
      explicacao: 'Para 250 e 100, os dois concordam. Só o 200 dá `true` no original e `false` no mutante. Sem esse caso, o mutante sobrevive.',
      dica: 'Teste cada valor nos dois predicados.',
    },
    {
      id: 'backend-junior-t7-e04-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença entre cobertura de linhas e cobertura de ramos?',
      opcoes: [
        'A de linhas conta linhas executadas; a de ramos conta cada caminho de uma decisão, como os dois lados de um `if`',
        'São a mesma coisa com nomes diferentes',
        'A de ramos conta os branches do Git',
        'A de linhas só existe para testes de integração',
      ],
      resposta: 0,
      explicacao: 'Um `if` numa linha só tem uma linha e dois ramos. A cobertura de ramos é mais exigente e mostra decisões testadas pela metade, em amarelo na IDE.',
      dica: 'Uma linha com um `if` pode ter mais de um caminho.',
    },
    {
      id: 'backend-junior-t7-e04-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Sobre o JaCoCo, quais afirmações estão corretas? Escolha duas.',
      opcoes: [
        'Ele se instala como agente Java e acrescenta sondas ao bytecode das classes carregadas',
        'Ele registra quais trechos foram executados, e não se o resultado foi conferido',
        'Ele lê o código-fonte e procura chamadas de `assert`',
        'Ele roda a suíte várias vezes, alterando o código',
        'Ele só funciona com testes de integração',
      ],
      respostas: [0, 1],
      explicacao:
        'O JaCoCo instrumenta o bytecode e marca o que rodou. Alterar o código e rodar a suíte várias vezes é o que o PIT faz. Nenhum dos dois lê o código-fonte em busca de asserções.',
      dica: 'Uma das alternativas descreve outra ferramenta da aula.',
    },
    {
      id: 'backend-junior-t7-e04-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Complete para que o frete seja grátis **a partir de** 200,00.',
      codigo: `BigDecimal limite = new BigDecimal("200.00");
for (String valor : List.of("200.00", "250.00")) {
    BigDecimal total = new BigDecimal(valor);
    String frete = total.compareTo(limite) ___ 0 ? "grátis" : "R$ 15,00";
    System.out.println(frete);
}`,
      respostas: ['>='],
      saida: 'grátis\ngrátis',
      explicacao:
        '`compareTo` devolve negativo, zero ou positivo. "A partir de" é maior ou igual a zero. Com `>`, o 200 pagaria frete; com `==`, só o 200 seria grátis.',
      dica: '`compareTo` devolve 0 quando os valores são iguais.',
    },
    {
      id: 'backend-junior-t7-e04-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que não compila.',
      codigo: `enum Situacao {
    CRIADO, PAGO;

    boolean podeIrPara(Situacao destino) { return this == CRIADO && destino == PAGO; }
}

boolean ok = Situacao.CRIADO.podeIrPara("PAGO");
System.out.println(ok);`,
      resposta: 7,
      explicacao:
        'O método recebe uma `Situacao`, e `"PAGO"` é um texto. No teste parametrizado, o JUnit converte o texto do `@CsvSource` para o enum sozinho; no seu código, use `Situacao.valueOf("PAGO")`.',
      dica: 'Qual é o tipo do parâmetro de `podeIrPara`?',
    },
    {
      id: 'backend-junior-t7-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste calcula o esperado assim: `BigDecimal esperado = preco.multiply(BigDecimal.valueOf(qtd)).setScale(2, HALF_UP);`, a mesma linha do código. Qual é o problema?',
      opcoes: [
        'Se a fórmula do código estiver errada, o teste repete o erro e passa; o esperado deve ser um valor escrito à mão',
        'Nenhum: assim o teste nunca fica desatualizado',
        '`setScale` não pode ser usado em testes',
        'O teste fica lento por causa do `BigDecimal`',
      ],
      resposta: 0,
      explicacao:
        'Um teste é uma segunda opinião. Copiar a fórmula transforma a segunda opinião numa cópia da primeira. Escreva `new BigDecimal("59.70")`, calculado no papel.',
      dica: 'O que esse teste faria se a fórmula do código tivesse um erro?',
    },
    {
      id: 'backend-junior-t7-e04-q15',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O nome de cada caso parametrizado segue o modelo `{0} -> {1}: {2}`. Digite a saída exata do equivalente em Java.',
      codigo: `String nome = "%s -> %s: %s".formatted("CRIADO", "PAGO", true);
System.out.println(nome);`,
      resposta: 'CRIADO -> PAGO: true',
      explicacao: 'O `name` do `@ParameterizedTest` troca `{0}`, `{1}` e `{2}` pelos argumentos, e o relatório mostra um caso por linha com esse nome. Quando um falha, você sabe qual transição quebrou sem abrir o código.',
      dica: 'Cada `%s` recebe um argumento, na ordem.',
    },
  ],
};

export default episodio;
