import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T6: Testes. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t6-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'O JUnit cria um objeto novo da classe de teste para cada método `@Test`, como o programa abaixo, que simula essa execução com dois testes. Qual é a saída?',
    codigo: `public class Teste {
    static class CarrinhoTest {
        int itens = 0;

        void adicionaUm() {
            itens++;
            System.out.print(itens);
        }

        void adicionaDois() {
            itens += 2;
            System.out.print(itens);
        }
    }

    public static void main(String[] args) {
        new CarrinhoTest().adicionaUm();
        System.out.print(" ");
        new CarrinhoTest().adicionaDois();
        System.out.println();
    }
}`,
    opcoes: ['`1 2`', '`1 3`', '`0 2`', '`1 1`', '`3 3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Cada teste ganha a sua instância, então os campos começam do zero em todos. É o ciclo `PER_METHOD`, o padrão do JUnit 5 e 6, que impede um teste de herdar o estado de outro pelos campos de instância.',
  },
  {
    id: 'backend-junior-t6-prova-q02',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Dois testes usam uma lista `static` como "banco em memória". Cada um adiciona um cliente e confere que a lista tem tamanho 1. O programa simula a execução dos dois, na ordem em que o JUnit decidiu rodar. Qual é a saída?',
    codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    static List<String> clientes = new ArrayList<>();

    static String cadastraAna() {
        clientes.add("Ana");
        return clientes.size() == 1 ? "passou" : "falhou";
    }

    static String cadastraBia() {
        clientes.add("Bia");
        return clientes.size() == 1 ? "passou" : "falhou";
    }

    public static void main(String[] args) {
        System.out.println(cadastraBia() + " " + cadastraAna());
    }
}`,
    opcoes: ['`passou falhou`', '`passou passou`', '`falhou passou`', '`falhou falhou`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O campo `static` não é recriado entre os testes, e o segundo encontra o cliente do primeiro. Como o JUnit não promete uma ordem fixa, o teste que falha muda de uma execução para outra. Limpe o estado num `@BeforeEach` ou não use estado `static`.',
  },
  {
    id: 'backend-junior-t6-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'O teste `assertEquals(0.3, carrinho.total())` falha com `expected: <0.3> but was: <0.30000000000000004>`, embora o carrinho tenha itens de 0.1 e 0.2. O programa mostra as duas comparações possíveis. Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        double total = 0.1 + 0.2;
        boolean exata = total == 0.3;
        boolean comTolerancia = Math.abs(total - 0.3) < 1e-9;
        System.out.println(exata + " " + comTolerancia);
    }
}`,
    opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Em binário, 0.1 e 0.2 não são exatos, e a soma passa um pouco de 0.3. Para `double`, use a versão com tolerância (`assertEquals(0.3, total, 1e-9)` ou `isCloseTo` no AssertJ). Para dinheiro, o certo é `BigDecimal` no próprio código.',
  },
  {
    id: 'backend-junior-t6-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Um teste compara o pedido devolvido pelo serviço com um esperado: `assertEquals(esperado, obtido)`. Com `Pedido` como classe comum, o teste falha mesmo com os mesmos campos. O programa compara as duas versões. Qual é a saída?',
    codigo: `public class Teste {
    static class Pedido {
        final String cliente;
        final int itens;

        Pedido(String cliente, int itens) {
            this.cliente = cliente;
            this.itens = itens;
        }
    }

    record PedidoRecord(String cliente, int itens) {}

    public static void main(String[] args) {
        boolean classe = new Pedido("Ana", 2).equals(new Pedido("Ana", 2));
        boolean registro = new PedidoRecord("Ana", 2).equals(new PedidoRecord("Ana", 2));
        System.out.println(classe + " " + registro);
    }
}`,
    opcoes: ['`false true`', '`true true`', '`false false`', '`true false`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Sem `equals`, a classe herda o de `Object`, que compara referências. O `record` gera um `equals` campo a campo. Quando não dá para mudar a classe, o AssertJ resolve com `usingRecursiveComparison()`.',
  },
  {
    id: 'backend-junior-t6-prova-q05',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Um mock do Mockito sem nenhum `when` devolve valores padrão. O programa imita esse comportamento com um `Proxy`, como o Mockito faz por baixo. Qual é a saída?',
    codigo: `import java.lang.reflect.Proxy;
import java.util.List;
import java.util.Optional;

public class Teste {
    interface ClienteRepository {
        int contar();
        String nome(long id);
        List<String> todos();
        Optional<String> buscar(long id);
    }

    public static void main(String[] args) {
        ClienteRepository mock = (ClienteRepository) Proxy.newProxyInstance(
                Teste.class.getClassLoader(),
                new Class<?>[] {ClienteRepository.class},
                (proxy, metodo, argumentos) -> {
                    Class<?> tipo = metodo.getReturnType();
                    if (tipo == int.class) return 0;
                    if (tipo == List.class) return List.of();
                    if (tipo == Optional.class) return Optional.empty();
                    return null;
                });
        System.out.println(mock.contar() + " " + mock.nome(1) + " " + mock.todos() + " " + mock.buscar(1));
    }
}`,
    opcoes: [
      '`0 null [] Optional.empty`',
      '`0 null null null`',
      'Lança `NullPointerException`',
      '`null null [] Optional.empty`',
      '`0  [] Optional.empty`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O Mockito usa essa mesma política (`RETURNS_DEFAULTS`): zero para números, `false` para `boolean`, coleções e `Optional` vazios, e `null` para os outros objetos. Por isso um `String` não configurado costuma estourar em `NullPointerException` longe do teste.',
  },
  {
    id: 'backend-junior-t6-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Um serviço calcula o vencimento "um mês depois de hoje". O teste recebe um `Clock` fixo em vez de usar `LocalDate.now()`. Qual é a saída?',
    codigo: `import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

public class Teste {
    static LocalDate vencimento(Clock relogio) {
        return LocalDate.now(relogio).plusMonths(1);
    }

    public static void main(String[] args) {
        Clock fixo = Clock.fixed(Instant.parse("2026-01-31T10:00:00Z"), ZoneOffset.UTC);
        System.out.println(vencimento(fixo));
    }
}`,
    opcoes: ['`2026-02-28`', '`2026-03-03`', '`2026-03-02`', '`2026-02-31`', 'Lança `DateTimeException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`plusMonths` ajusta para o último dia válido do mês. Com o relógio injetado, o teste dá o mesmo resultado em qualquer dia; com `LocalDate.now()`, ele só pegaria esse caso de borda no fim de janeiro.',
  },
  {
    id: 'backend-junior-t6-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Um teste deveria garantir que dividir por zero lança exceção, mas passa mesmo depois que alguém trocou a divisão para devolver 0. O programa reproduz o teste. Qual é a saída?',
    codigo: `public class Teste {
    static int dividir(int a, int b) {
        return b == 0 ? 0 : a / b;
    }

    static String testeDivisaoPorZero() {
        try {
            dividir(10, 0);
        } catch (ArithmeticException e) {
            return "passou";
        }
        return "passou";
    }

    public static void main(String[] args) {
        System.out.println(testeDivisaoPorZero());
    }
}`,
    opcoes: ['`passou`', 'Lança `ArithmeticException`', '`0`', 'Não compila: `return` inalcançável'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O padrão `try`/`catch` sem `fail()` depois da chamada aceita os dois caminhos. É o motivo de existir `assertThrows` (ou `assertThatThrownBy`): ele falha quando a exceção não acontece e ainda devolve a exceção para conferir a mensagem.',
  },
  {
    id: 'backend-junior-t6-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'O `assertAll` do JUnit e as *soft assertions* do AssertJ rodam todas as conferências e relatam todas as falhas de uma vez. O programa imita esse comportamento. Qual é a saída?',
    codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    public static void main(String[] args) {
        String nome = "ana";
        int idade = 17;
        String email = "ana@exemplo.com";

        List<Runnable> conferencias = List.of(
                () -> { if (!nome.equals("Ana")) throw new AssertionError("nome"); },
                () -> { if (idade < 18) throw new AssertionError("idade"); },
                () -> { if (!email.contains("@")) throw new AssertionError("email"); });

        List<String> falhas = new ArrayList<>();
        for (Runnable c : conferencias) {
            try {
                c.run();
            } catch (AssertionError e) {
                falhas.add(e.getMessage());
            }
        }
        System.out.println(falhas.size() + " " + falhas);
    }
}`,
    opcoes: ['`2 [nome, idade]`', '`1 [nome]`', '`3 [nome, idade, email]`', '`0 []`', 'Lança `AssertionError`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'Com asserções comuns, o teste pararia na primeira falha, e você só descobriria a idade depois de corrigir o nome. Agrupar mostra o quadro inteiro numa execução.',
  },
  {
    id: 'backend-junior-t6-prova-q09',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Em vez de um mock, o teste usa um *fake*: um repositório em memória escrito à mão. Qual é a saída?',
    codigo: `import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class Teste {
    interface Estoque {
        Optional<Integer> quantidade(String sku);
        void salvar(String sku, int qtd);
    }

    static class EstoqueEmMemoria implements Estoque {
        private final Map<String, Integer> dados = new HashMap<>();
        public Optional<Integer> quantidade(String sku) { return Optional.ofNullable(dados.get(sku)); }
        public void salvar(String sku, int qtd) { dados.put(sku, qtd); }
    }

    static String vender(Estoque estoque, String sku, int qtd) {
        int atual = estoque.quantidade(sku).orElse(0);
        if (atual < qtd) return "sem estoque";
        estoque.salvar(sku, atual - qtd);
        return "ok";
    }

    public static void main(String[] args) {
        Estoque estoque = new EstoqueEmMemoria();
        estoque.salvar("MOUSE", 3);
        String r1 = vender(estoque, "MOUSE", 2);
        String r2 = vender(estoque, "MOUSE", 2);
        System.out.println(r1 + ", " + r2 + ", " + estoque.quantidade("MOUSE").get());
    }
}`,
    opcoes: ['`ok, sem estoque, 1`', '`ok, ok, -1`', '`ok, sem estoque, 3`', '`ok, ok, 1`', '`sem estoque, sem estoque, 3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      'O *fake* guarda estado de verdade, então o segundo `vender` enxerga o que o primeiro fez. Com um mock, você teria de programar cada resposta com `when`, e o teste acabaria repetindo a implementação.',
  },
  {
    id: 'backend-junior-t6-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Para conferir o que o serviço enviou ao gateway de e-mail, o teste usa um *spy* escrito à mão que guarda os argumentos, papel que o `ArgumentCaptor` faz no Mockito. Qual é a saída?',
    codigo: `import java.util.ArrayList;
import java.util.List;

public class Teste {
    interface Email { void enviar(String para, String assunto); }

    static class EmailEspiao implements Email {
        final List<String> enviados = new ArrayList<>();
        public void enviar(String para, String assunto) { enviados.add(para + ":" + assunto); }
    }

    static void cadastrar(Email email, String endereco) {
        String normalizado = endereco.strip().toLowerCase();
        email.enviar(normalizado, "Bem-vindo");
    }

    public static void main(String[] args) {
        EmailEspiao espiao = new EmailEspiao();
        cadastrar(espiao, "  Ana@Exemplo.COM ");
        System.out.println(espiao.enviados);
    }
}`,
    opcoes: [
      '`[ana@exemplo.com:Bem-vindo]`',
      '`[  Ana@Exemplo.COM :Bem-vindo]`',
      '`[Ana@Exemplo.COM:Bem-vindo]`',
      '`[]`',
      '`[ana@exemplo.com :Bem-vindo]`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao:
      '`strip` tira os espaços das pontas e `toLowerCase` deixa tudo minúsculo. Capturar o argumento permite conferir o valor transformado, e não só que o método foi chamado.',
  },
  {
    id: 'backend-junior-t6-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Um teste com `@WebMvcTest(PedidoController.class)` falha ao subir: "No qualifying bean of type \'PedidoService\' available". O projeto usa Spring Boot 4. O que resolve?',
    codigo: `@WebMvcTest(PedidoController.class)
class PedidoControllerTest {

    @Autowired
    MockMvcTester mvc;

    @Test
    void listaPedidos() {
        assertThat(mvc.get().uri("/pedidos")).hasStatusOk();
    }
}`,
    opcoes: [
      'Declarar `@MockitoBean PedidoService service;` na classe de teste, porque a fatia web não carrega os `@Service`',
      'Trocar `@WebMvcTest` por `@DataJpaTest`',
      'Declarar `@MockBean PedidoService service;`, como sempre foi feito',
      'Anotar o `PedidoService` com `@Controller` para ele entrar na fatia',
      'Acrescentar `@Transactional` na classe de teste',
    ],
    resposta: 0,
    explicacao:
      '`@WebMvcTest` só carrega a camada web: controllers, advices, conversores. As dependências do controller precisam vir como mocks. O `@MockBean` foi removido no Spring Boot 4; o substituto é o `@MockitoBean`, do Spring Framework.',
  },
  {
    id: 'backend-junior-t6-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Um teste `@SpringBootTest(webEnvironment = RANDOM_PORT)` anotado com `@Transactional` cria um cliente pelo `RestClient`, chamando a API de verdade. Depois, outro teste encontra esse cliente no banco. Por quê?',
    opcoes: [
      'A requisição é atendida por outra thread, do servidor, numa transação própria que já fez *commit*; o *rollback* do teste não alcança essa transação',
      'Porque `@Transactional` não funciona em classes de teste',
      'Porque o `RANDOM_PORT` desliga o *rollback* de propósito',
      'Porque o banco H2 ignora *rollbacks*',
      'Porque faltou `@Rollback(true)`, que não é o padrão',
    ],
    resposta: 0,
    explicacao:
      'O *rollback* automático vale para a transação aberta na thread do teste. Com servidor real, a chamada HTTP roda em outra thread. Nesses testes, limpe o banco num `@BeforeEach` ou use dados com identificadores únicos.',
  },
  {
    id: 'backend-junior-t6-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Sobre um teste anotado com `@DataJpaTest`, qual afirmação está correta?',
    opcoes: [
      'Cada teste roda numa transação que é desfeita no fim, e só os componentes de JPA são carregados',
      'A aplicação inteira sobe, com servidor web numa porta aleatória',
      'Os repositórios são mocks e nenhum SQL é executado',
      'Os dados gravados num teste ficam para os testes seguintes',
      'Ele só funciona com Testcontainers',
    ],
    resposta: 0,
    explicacao:
      'É uma fatia: entidades, repositórios, `EntityManager` e o banco. Controllers e services ficam de fora. O *rollback* no fim de cada teste mantém os testes independentes.',
  },
  {
    id: 'backend-junior-t6-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'A suíte tem 40 classes de teste com `@SpringBootTest`, e cada uma declara um conjunto diferente de `@MockitoBean`. Os testes ficaram lentos, e o log mostra o Spring subindo dezenas de vezes. Qual é a causa mais provável?',
    opcoes: [
      'Cada combinação diferente de mocks muda a configuração, e o cache de contextos não consegue reaproveitar um contexto já criado',
      'O `@MockitoBean` é lento para criar o mock',
      'O JUnit roda as classes em paralelo por padrão',
      'O Spring sobe um contexto novo para cada método de teste, em qualquer caso',
      'Falta `@DirtiesContext` em todas as classes',
    ],
    resposta: 0,
    explicacao:
      'O Spring guarda contextos por configuração. Classes com a mesma configuração dividem um contexto; cada variação cria outro. Padronize uma classe base com os mocks comuns. `@DirtiesContext` faria o contrário: descartaria o contexto.',
  },
  {
    id: 'backend-junior-t6-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Com o modo estrito do Mockito, o teste abaixo falha mesmo com a asserção certa. Por quê?',
    codigo: `@ExtendWith(MockitoExtension.class)
class FreteServiceTest {

    @Mock
    CepClient cep;

    @InjectMocks
    FreteService frete;

    @Test
    void freteGratisAcimaDe200() {
        when(cep.distanciaKm("01001-000")).thenReturn(12.0);

        assertThat(frete.calcular("01001-000", new BigDecimal("250"))).isZero();
    }
}`,
    opcoes: [
      'Para compras acima de 200, o serviço nem consulta o CEP, e o *stub* não usado gera `UnnecessaryStubbingException`',
      'Porque `@InjectMocks` não injeta pelo construtor',
      'Porque `when` não funciona com `double`',
      'Porque falta `verify(cep).distanciaKm(...)`',
      'Porque `isZero` não aceita `BigDecimal`',
    ],
    resposta: 0,
    explicacao:
      'A `MockitoExtension` usa *stubs* estritos: configurar o que o código não usa é sinal de teste desatualizado ou confuso. Tire o `when` desse teste; ele pertence ao cenário abaixo de 200.',
  },
  {
    id: 'backend-junior-t6-prova-q16',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'Com `spy` num objeto real, `when(spy.cotacao("USD")).thenReturn(5.0)` faz uma chamada HTTP de verdade e falha sem internet. Qual é a forma correta?',
    opcoes: [
      '`doReturn(5.0).when(spy).cotacao("USD");`',
      '`when(spy.cotacao("USD")).thenReturn(5.0).never();`',
      '`verify(spy).cotacao("USD");`',
      '`spy.cotacao("USD") == 5.0;`',
      'Não há forma: *spies* não aceitam *stubs*',
    ],
    resposta: 0,
    explicacao:
      'Em `when(spy.metodo())`, o método real roda para calcular o argumento do `when`. O `doReturn(...).when(spy).metodo()` configura sem chamar o método.',
  },
  {
    id: 'backend-junior-t6-prova-q17',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado:
      'Um teste deve garantir que, ao cancelar um pedido já entregue, o serviço lança exceção e **não** chama o gateway de estorno. Quais trechos fazem parte de um teste correto? Escolha duas.',
    opcoes: [
      '`assertThatThrownBy(() -> service.cancelar(id)).isInstanceOf(PedidoEntregueException.class);`',
      '`verify(estorno, never()).estornar(any());`',
      '`verify(estorno).estornar(any());`',
      '`when(estorno.estornar(any())).thenThrow(new RuntimeException());`',
      '`assertThat(service.cancelar(id)).isNull();`',
    ],
    respostas: [0, 1],
    explicacao:
      'A exceção se confere com `assertThatThrownBy`, e a ausência da chamada com `verify(..., never())`. O `verify` sem `never` exigiria a chamada; o `thenThrow` mudaria o cenário; e `cancelar` lança, então não há retorno para conferir.',
  },
  {
    id: 'backend-junior-t6-prova-q18',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Sobre o ciclo de vida do JUnit 5 e 6, quais afirmações estão corretas? Escolha duas.',
    opcoes: [
      'Com o ciclo padrão, um método `@BeforeAll` precisa ser `static`',
      '`@BeforeEach` roda antes de cada método `@Test` da classe',
      '`@AfterAll` roda depois de cada teste',
      'Os métodos `@Test` rodam sempre na ordem em que aparecem no arquivo',
      '`@Disabled` apaga o teste do relatório',
    ],
    respostas: [0, 1],
    explicacao:
      '`@BeforeAll` roda uma vez, antes de existir qualquer instância, por isso é `static` (a menos que a classe use `@TestInstance(PER_CLASS)`). A ordem dos testes é determinística, mas não segue o arquivo; e o teste desligado aparece como ignorado.',
  },
  {
    id: 'backend-junior-t6-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado:
      'Os testes de repositório passam no H2, mas uma consulta com `ILIKE` e uma coluna `jsonb` quebram em produção, no PostgreSQL. Qual mudança resolve melhor?',
    opcoes: [
      'Rodar os testes de integração com Testcontainers, num PostgreSQL de verdade, com `@ServiceConnection` ligando a URL ao Spring',
      'Ativar o modo de compatibilidade com PostgreSQL do H2 e parar por aí',
      'Trocar os testes de repositório por mocks do repositório',
      'Rodar os testes direto no banco de produção',
      'Remover as migrations dos testes',
    ],
    resposta: 0,
    explicacao:
      'O modo de compatibilidade do H2 imita só parte do PostgreSQL. Com o mesmo banco da produção num contêiner, o teste encontra os mesmos erros que a produção encontraria. O custo é precisar de Docker na máquina e no CI.',
  },
  {
    id: 'backend-junior-t6-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado:
      'A suíte com Testcontainers leva 4 minutos, porque cada uma das 30 classes de teste sobe o seu próprio PostgreSQL. O que reduz mais esse tempo?',
    opcoes: [
      'Declarar o contêiner uma vez, num campo `static` de uma classe base (ou numa configuração compartilhada), para que todas as classes usem o mesmo contêiner e o mesmo contexto',
      'Trocar `@Container` por `@Disabled`',
      'Aumentar o tempo limite de inicialização do contêiner',
      'Criar um contêiner novo em cada `@BeforeEach`',
      'Usar a imagem `latest` do PostgreSQL',
    ],
    resposta: 0,
    explicacao:
      'Subir um banco custa segundos; fazer isso 30 vezes custa minutos. Com um contêiner compartilhado, ele sobe uma vez, e o cache de contextos do Spring também passa a reaproveitar o contexto. Fixe a versão da imagem, de preferência a mesma da produção.',
  },
  {
    id: 'backend-junior-t6-prova-q21',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais características fazem um bom teste de unidade? Escolha duas.',
    opcoes: [
      'Dá o mesmo resultado em qualquer máquina e a qualquer hora, sem depender de rede, relógio ou ordem dos testes',
      'Falha por um motivo só, com um nome que diz o comportamento esperado',
      'Confere cada método privado diretamente, por reflexão',
      'Repete no teste o mesmo cálculo que o código faz, para chegar ao valor esperado',
      'Cobre muitos cenários num único método, para a suíte ficar menor',
    ],
    respostas: [0, 1],
    explicacao:
      'Repetível e focado: quando quebra, você sabe o que quebrou e confia que não é acaso. Testar métodos privados prende o teste à implementação, e refazer o cálculo no teste copia o mesmo erro do código.',
  },
];

export default prova;
