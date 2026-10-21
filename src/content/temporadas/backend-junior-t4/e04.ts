import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t4-e04',
  minutos: 17,
  aula,
  armadilhas: [
    'Sem `@Valid` no parâmetro, as anotações do DTO são ignoradas.',
    'Menos o `@NotNull`, todas as anotações consideram o `null` válido: `@Min(1) Integer quantidade` aceita a ausência.',
    '`@NotEmpty` aceita `"   "`; para texto, o certo quase sempre é `@NotBlank`.',
    'Sem tratador, exceções do domínio como "não encontrado" viram `500`.',
    'Com `spring.mvc.problemdetails.enabled`, personalize os erros do Spring MVC estendendo `ResponseEntityExceptionHandler`.',
    'A mensagem de uma exceção inesperada pode conter dados sensíveis: ela vai para o log, nunca para a resposta.',
    'Um tratador para `Exception.class` é a rede de segurança, mas não deve esconder exceções que merecem status próprio.',
  ],
  recursos: [
    {
      titulo: 'Spring Boot: Validation',
      url: 'https://docs.spring.io/spring-boot/reference/io/validation.html',
      tipo: 'documentacao',
      porque: 'O starter de validação e como o Spring Boot o configura.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Validation in Spring MVC',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-config/validation.html',
      tipo: 'documentacao',
      porque: '`@Valid` no corpo e a validação de parâmetros dos métodos de controller.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Exceptions (@ExceptionHandler)',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html',
      tipo: 'documentacao',
      porque: 'Como os tratadores são escolhidos, os argumentos e os tipos de retorno possíveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Spring Framework: Error Responses (Problem Details)',
      url: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html',
      tipo: 'documentacao',
      porque: '`ProblemDetail`, `ErrorResponse` e o `ResponseEntityExceptionHandler`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakarta Bean Validation 3.1: built-in constraints',
      url: 'https://jakarta.ee/specifications/bean-validation/3.1/jakarta-validation-spec-3.1.html#builtinconstraints',
      tipo: 'documentacao',
      porque: 'A lista oficial das anotações, com o comportamento de cada uma diante do `null`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Hibernate Validator: Reference Guide',
      url: 'https://docs.hibernate.org/stable/validator/reference/en-US/html_single/',
      tipo: 'documentacao',
      porque: 'O guia da implementação usada pelo Spring: grupos, validadores próprios e mensagens.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevSuperior: Bean Validation com Java e Spring Boot',
      url: 'https://www.youtube.com/watch?v=ulPtCY7nhwM',
      tipo: 'video',
      porque: 'As anotações de validação e o tratamento dos erros numa API, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Fernanda Kipper: Como tratar exceções no Java Spring',
      url: 'https://www.youtube.com/watch?v=GmbK-O3v3Gg',
      tipo: 'video',
      porque: 'Tratadores centrais com @ControllerAdvice e respostas de erro padronizadas, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Erudio: Tratamento de exceções com @ControllerAdvice',
      url: 'https://www.youtube.com/watch?v=IKkr-GbObAQ',
      tipo: 'video',
      porque: '@ControllerAdvice, @ResponseStatus e @ExceptionHandler comparados, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'JDev Treinamento: Controle de erros da API',
      url: 'https://www.youtube.com/watch?v=3Lboji1wQFc',
      tipo: 'video',
      porque: 'Um tratador global de erros passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Escolhendo o tratador',
    enunciado:
      'Implemente a escolha do tratador de exceções como o Spring faz: um mapa de classe de exceção para um `Tratamento(status, titulo, mostrarMensagem)`, e uma busca que sobe pela hierarquia da exceção, com `getSuperclass()`, até achar a classe mais próxima com tratador. Exceções de domínio mostram a própria mensagem; o tratador de `Exception` mostra uma mensagem genérica e registra a exceção real num "log". A hierarquia é `ErroDeNegocio` (422), com as subclasses `EstoqueInsuficiente`, sem tratador próprio, e `CupomExpirado`, com tratador próprio; e `NaoEncontrado` (404). Com as quatro exceções do `main`, a saída deve ser:\n\n```text\n404 Não encontrado: O produto 99 não existe. (tratado por NaoEncontrado)\n422 Regra de negócio violada: O produto 2 tem 2 unidades, e o pedido pede 5. (tratado por ErroDeNegocio)\n422 Cupom expirado: O cupom NATAL venceu em 25/12. (tratado por CupomExpirado)\n500 Erro interno: Ocorreu um erro inesperado. (tratado por Exception)  [log: java.lang.IllegalStateException: conexão recusada: senha=segredo123]\n```',
    dicas: [
      'Um `while (classe != null && !mapa.containsKey(classe)) classe = classe.getSuperclass();` encontra o tratador mais próximo.',
      'O tratador de `Exception.class` garante que a busca sempre termina com um resultado.',
      'Separe o que vai para o cliente (`detalhe`) do que vai para o log: só o segundo pode conter a mensagem de um erro inesperado.',
      'Um `record Tratamento` com um `boolean mostrarMensagem` evita um `if` por tipo de exceção.',
    ],
    solucao: `import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Tratadores {
    static class ErroDeNegocio extends RuntimeException {
        ErroDeNegocio(String mensagem) { super(mensagem); }
    }

    static class EstoqueInsuficiente extends ErroDeNegocio {
        EstoqueInsuficiente(String mensagem) { super(mensagem); }
    }

    static class CupomExpirado extends ErroDeNegocio {
        CupomExpirado(String mensagem) { super(mensagem); }
    }

    static class NaoEncontrado extends RuntimeException {
        NaoEncontrado(String mensagem) { super(mensagem); }
    }

    record Tratamento(int status, String titulo, boolean mostrarMensagem) {}

    static final Map<Class<? extends Throwable>, Tratamento> TRATADORES = new LinkedHashMap<>();

    static {
        TRATADORES.put(Exception.class, new Tratamento(500, "Erro interno", false));
        TRATADORES.put(ErroDeNegocio.class, new Tratamento(422, "Regra de negócio violada", true));
        TRATADORES.put(CupomExpirado.class, new Tratamento(422, "Cupom expirado", true));
        TRATADORES.put(NaoEncontrado.class, new Tratamento(404, "Não encontrado", true));
    }

    /** Sobe pela hierarquia da exceção até achar a classe mais próxima que tem tratador. */
    static String tratar(Throwable erro) {
        Class<?> classe = erro.getClass();
        while (classe != null && !TRATADORES.containsKey(classe)) {
            classe = classe.getSuperclass();
        }
        Tratamento t = TRATADORES.get(classe);
        String detalhe = t.mostrarMensagem() ? erro.getMessage() : "Ocorreu um erro inesperado.";
        String log = t.status() >= 500 ? "  [log: " + erro + "]" : "";
        return t.status() + " " + t.titulo() + ": " + detalhe + " (tratado por " + classe.getSimpleName() + ")" + log;
    }

    public static void main(String[] args) {
        List<Throwable> erros = List.of(
                new NaoEncontrado("O produto 99 não existe."),
                new EstoqueInsuficiente("O produto 2 tem 2 unidades, e o pedido pede 5."),
                new CupomExpirado("O cupom NATAL venceu em 25/12."),
                new IllegalStateException("conexão recusada: senha=segredo123"));
        for (Throwable e : erros) System.out.println(tratar(e));
    }
}`,
    saida: '404 Não encontrado: O produto 99 não existe. (tratado por NaoEncontrado)\n422 Regra de negócio violada: O produto 2 tem 2 unidades, e o pedido pede 5. (tratado por ErroDeNegocio)\n422 Cupom expirado: O cupom NATAL venceu em 25/12. (tratado por CupomExpirado)\n500 Erro interno: Ocorreu um erro inesperado. (tratado por Exception)  [log: java.lang.IllegalStateException: conexão recusada: senha=segredo123]',
    comentarios:
      'O `EstoqueInsuficiente` não tem tratador próprio e herda o de `ErroDeNegocio`; o `CupomExpirado` tem o seu, que vence por ser mais próximo. O `IllegalStateException` sobe até `RuntimeException` e depois até `Exception`, a rede de segurança. É exatamente a regra do `ExceptionHandlerMethodResolver` do Spring, que mede a distância de cada tratador na hierarquia e escolhe o menor. A separação entre a resposta e o log é a parte de segurança: o cliente nunca vê a senha, e quem opera o sistema vê tudo. Em produção, o "log" seria um `log.error("Erro inesperado", e)`, com o *stack trace* completo.',
  },
  exercicios: [
    {
      id: 'backend-junior-t4-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O DTO tem `@NotBlank String nome`, mas o método é `criar(@RequestBody NovoProduto novo)`. Um corpo com `"nome": ""` é aceito. Por quê?',
      opcoes: [
        'Faltou o `@Valid` antes do `@RequestBody`: sem ele, as regras do DTO não são verificadas',
        '`@NotBlank` não funciona em `record`s',
        'O Jackson ignora anotações de validação',
        'Texto vazio é considerado válido pelo `@NotBlank`',
      ],
      resposta: 0,
      explicacao: 'A validação do corpo só acontece quando pedida. Com `@Valid @RequestBody`, o mesmo corpo resulta em `400`.',
    },
    {
      id: 'backend-junior-t4-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O campo é `@DecimalMin("0.01") BigDecimal preco`, e um cliente envia o JSON sem o campo `preco`. A validação passa?',
      opcoes: [
        'Passa: o `@DecimalMin` considera o `null` válido; para exigir o preço, falta o `@NotNull`',
        'Não passa: o `@DecimalMin` exige um valor',
        'Passa, e o preço vira 0.01',
        'O Jackson recusa o JSON antes da validação',
      ],
      resposta: 0,
      explicacao: 'Só o `@NotNull` e as anotações que o incluem, como `@NotBlank` e `@NotEmpty`, rejeitam o nulo. As outras validam apenas valores presentes.',
    },
    {
      id: 'backend-junior-t4-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre `@NotEmpty` e `@NotBlank` num texto `"   "`, só com espaços?',
      opcoes: [
        '`@NotEmpty` aceita, porque o texto tem caracteres; `@NotBlank` recusa, porque eles são só espaços',
        'Os dois recusam',
        'Os dois aceitam',
        '`@NotEmpty` recusa e `@NotBlank` aceita',
      ],
      resposta: 0,
      explicacao: 'Para nomes, títulos e descrições, o `@NotBlank` é quase sempre o certo. O `@NotEmpty` também serve para coleções.',
    },
    {
      id: 'backend-junior-t4-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Sem nenhum tratador próprio, uma requisição com três campos inválidos recebe `{"detail":"Invalid request content.",...}`. O que falta?',
      opcoes: [
        'Um tratador que liste os campos e as mensagens, para o cliente saber o que corrigir',
        'Nada: é o máximo que o Spring permite',
        'Trocar o status para `500`',
        'Desligar o Problem Details',
      ],
      resposta: 0,
      explicacao: 'As informações estão no `BindingResult` da `MethodArgumentNotValidException`; o tratador as transforma numa lista no corpo da resposta.',
    },
    {
      id: 'backend-junior-t4-e04-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O serviço lança `ProdutoNaoEncontradoException`, e não há tratador para ela. Que status o cliente recebe?',
      opcoes: ['`500`', '`404`', '`400`', '`204`'],
      resposta: 0,
      explicacao: 'O Spring não sabe que a exceção significa "não encontrado". Um `@ExceptionHandler` que a traduza para `404` resolve.',
    },
    {
      id: 'backend-junior-t4-e04-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Para que serve uma classe anotada com `@RestControllerAdvice`?',
      opcoes: [
        'Para reunir os tratadores de exceção que valem para todos os controllers',
        'Para criar um controller com conselhos de uso',
        'Para validar o JSON antes do Jackson',
        'Para registrar rotas novas',
      ],
      resposta: 0,
      explicacao: 'Sem ela, cada controller precisaria dos seus próprios `@ExceptionHandler`, repetidos.',
    },
    {
      id: 'backend-junior-t4-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma exceção inesperada tem a mensagem "conexão recusada: senha=segredo123". O que o tratador de `Exception` deve fazer?',
      opcoes: [
        'Registrar a exceção completa no log e responder `500` com uma mensagem genérica',
        'Responder `500` com a mensagem da exceção, para ajudar o cliente',
        'Responder `200`, para não assustar o cliente',
        'Responder `400`, porque o erro foi do cliente',
      ],
      resposta: 0,
      explicacao: 'Mensagens internas podem conter senhas, nomes de tabelas e versões de bibliotecas. O detalhe é para quem opera o sistema, não para quem chama a API.',
    },
    {
      id: 'backend-junior-t4-e04-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Há tratadores para `ErroDeNegocio` (422) e para `Exception` (500). Uma `EstoqueInsuficienteException`, que estende `ErroDeNegocio`, é lançada. Qual tratador é usado?',
      opcoes: [
        'O de `ErroDeNegocio`, o mais próximo na hierarquia',
        'O de `Exception`, o mais genérico',
        'Os dois, um depois do outro',
        'Nenhum: só tratadores do tipo exato são usados',
      ],
      resposta: 0,
      explicacao: 'O Spring escolhe o tratador do tipo mais próximo da exceção. O de `Exception` só pega o que nenhum outro tratou.',
    },
    {
      id: 'backend-junior-t4-e04-q09',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais traduções de erro em status estão adequadas? Escolha três.',
      opcoes: [
        'Corpo com campos inválidos: `400`',
        'Produto inexistente: `404`',
        'Estoque insuficiente para o pedido: `422`',
        'Campos inválidos: `500`',
        'Produto inexistente: `200` com `{"erro": ...}`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Erros de entrada são do cliente, `4xx`. Status `200` com erro no corpo engana clientes e monitoramento.',
    },
    {
      id: 'backend-junior-t4-e04-q10',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa sobe pela hierarquia de uma exceção, como o Spring faz ao procurar o tratador. Digite a saída exata.',
      codigo: `public class Teste {
    static class ErroDeNegocio extends RuntimeException {}
    static class EstoqueInsuficiente extends ErroDeNegocio {}

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (Class<?> c = EstoqueInsuficiente.class; c != Exception.class; c = c.getSuperclass()) {
            sb.append(c.getSimpleName()).append(" -> ");
        }
        System.out.println(sb.append("Exception"));
    }
}`,
      resposta: 'EstoqueInsuficiente -> ErroDeNegocio -> RuntimeException -> Exception',
      explicacao: 'Cada passo do laço é um candidato a tratador. O primeiro que tiver um `@ExceptionHandler` vence.',
    },
    {
      id: 'backend-junior-t4-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.annotation.*;
import java.lang.reflect.RecordComponent;

public class Teste {
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.RECORD_COMPONENT)
    @interface TamanhoMax { int value(); }

    record Produto(@TamanhoMax(40) String nome, int estoque) {}

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (RecordComponent c : Produto.class.getRecordComponents()) {
            TamanhoMax t = c.getAnnotation(TamanhoMax.class);
            sb.append(c.getName()).append('=').append(t == null ? "-" : t.value()).append(' ');
        }
        System.out.println(sb.toString().trim());
    }
}`,
      opcoes: ['`nome=40 estoque=-`', '`nome=- estoque=-`', '`nome=40 estoque=40`', '`nome=40`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A anotação está só no componente `nome`. É lendo assim, componente a componente, que o validador descobre as regras de cada campo.',
    },
    {
      id: 'backend-junior-t4-e04-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como trocar a mensagem padrão de uma regra por uma própria?',
      opcoes: [
        'Com o atributo `message`: `@NotBlank(message = "informe o nome do produto")`',
        'Sobrescrevendo o `toString` do DTO',
        'Não é possível',
        'Com um comentário acima da anotação',
      ],
      resposta: 0,
      explicacao: 'A mensagem também pode ser uma chave, entre chaves, de um arquivo de mensagens, para ter traduções.',
    },
    {
      id: 'backend-junior-t4-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que as mensagens de validação da aula vieram em português?',
      opcoes: [
        'A requisição tinha `Accept-Language: pt-BR`, e o Hibernate Validator traz traduções das mensagens padrão',
        'Porque o código foi escrito em português',
        'Porque o servidor está no Brasil',
        'Porque o Spring traduz tudo automaticamente com um tradutor online',
      ],
      resposta: 0,
      explicacao: 'O Spring passa o idioma da requisição para o validador. Com `Accept-Language: en`, as mesmas regras responderiam em inglês.',
    },
    {
      id: 'backend-junior-t4-e04-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Com `spring.mvc.problemdetails.enabled=true`, um advice comum com `@ExceptionHandler(MethodArgumentNotValidException.class)` não é chamado, e a resposta continua genérica. Qual é a correção?',
      opcoes: [
        'Fazer o advice estender `ResponseEntityExceptionHandler` e sobrescrever `handleMethodArgumentNotValid`',
        'Remover o `@Valid`',
        'Lançar a exceção de novo dentro do controller',
        'Trocar o `@RestControllerAdvice` por `@Service`',
      ],
      resposta: 0,
      explicacao: 'A propriedade faz o Spring Boot registrar o próprio tratador das exceções do Spring MVC. Um advice que estende `ResponseEntityExceptionHandler` assume esse papel.',
    },
    {
      id: 'backend-junior-t4-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que preferir um `@ExceptionHandler` central a anotar cada exceção do domínio com `@ResponseStatus`?',
      opcoes: [
        'Porque o tratador monta um Problem Details completo e mantém as decisões de HTTP fora das classes do domínio',
        'Porque o `@ResponseStatus` não funciona',
        'Porque exceções não podem ter anotações',
        'Não há diferença',
      ],
      resposta: 0,
      explicacao: 'O domínio deve poder ser usado fora da web, por uma fila ou um job. Com o tratador, só a camada web sabe que "não encontrado" é `404`.',
    },
  ],
};

export default episodio;
