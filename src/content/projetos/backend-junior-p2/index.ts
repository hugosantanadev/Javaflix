import type { ProjetoConteudo } from '../../types';
import briefing from './briefing.md?raw';
import portfolio from './portfolio.md?raw';
import s01 from './s01.md?raw';
import s01Solucao from './s01-solucao.md?raw';
import s02 from './s02.md?raw';
import s02Solucao from './s02-solucao.md?raw';
import s03 from './s03.md?raw';
import s03Solucao from './s03-solucao.md?raw';
import s04 from './s04.md?raw';
import s04Solucao from './s04-solucao.md?raw';
import s05 from './s05.md?raw';
import s05Solucao from './s05-solucao.md?raw';

const projeto: ProjetoConteudo = {
  id: 'backend-junior-p2',
  briefing,
  etapas: [
    {
      id: 'backend-junior-p2-s01',
      titulo: 'O projeto e a porta de entrada',
      objetivo: 'Criar o projeto Spring Boot e receber transações com validação, separando JSON ilegível de regra violada.',
      instrucoes: s01,
      criterios: [
        '`POST /transacao` com `{"valor": 123.45, "dataHora": "2026-10-31T12:34:56.789-03:00"}` responde `201` sem corpo.',
        'Valor `0` é aceito; valor `-10.00`, `dataHora` no futuro ou campo ausente respondem `422`.',
        '`{"valor": "cinquenta", ...}` e um JSON cortado no meio respondem `400`.',
        'Os erros são traduzidos num `@RestControllerAdvice`, e nenhuma resposta de erro mostra detalhes internos.',
        'O projeto está num repositório Git, com o primeiro commit.',
      ],
      dica: 'Comece pelo record `TransacaoRequest` com `@NotNull` e `@PositiveOrZero`, e ponha `@Valid @RequestBody` no parâmetro do controller. Depois, rode os sete `curl` e veja qual exceção o Spring lança em cada caso, antes de escrever o tratador.',
      solucao: s01Solucao,
    },
    {
      id: 'backend-junior-p2-s02',
      titulo: 'Camadas e memória segura',
      objetivo: 'Separar controller, service e repositório, guardar as transações numa coleção segura para várias threads e permitir apagar tudo.',
      instrucoes: s02,
      criterios: [
        'O controller só trata HTTP; a regra da data no futuro está no `TransacaoService`, que lança `TransacaoInvalidaException`.',
        'As transações ficam numa `ConcurrentLinkedQueue` dentro de um `@Repository`.',
        '`DELETE /transacao` responde `200` sem corpo.',
        'Uma transação com data no futuro continua respondendo `422` e não é guardada.',
        'As dependências entram pelo construtor, sem `@Autowired` em campos.',
      ],
      dica: 'Mova o `if` da data do controller para o service e troque o `return 422` por um `throw`. O tratador de erros aceita várias exceções no mesmo `@ExceptionHandler({A.class, B.class})`.',
      solucao: s02Solucao,
    },
    {
      id: 'backend-junior-p2-s03',
      titulo: 'Estatísticas do último minuto',
      objetivo: 'Calcular contagem, soma, média, mínimo e máximo das transações dos últimos 60 segundos, com o relógio injetado.',
      instrucoes: s03,
      criterios: [
        '`GET /estatistica` sem transações responde `{"count":0,"sum":0,"avg":0,"min":0,"max":0}`.',
        'Com transações de 100.00, 50.50 e 0.01 no último minuto e uma de 2 minutos atrás, responde `count` 3, `sum` 150.51, `avg` 50.17, `min` 0.01 e `max` 100.00.',
        'Uma transação de exatamente 60 segundos atrás entra na conta.',
        'O service recebe um `java.time.Clock` pelo construtor e nunca chama `now()` sem ele.',
        'A média tem duas casas, com `RoundingMode.HALF_EVEN`.',
      ],
      dica: 'Calcule `inicio = agora.minus(60s)` uma vez, filtre com `!isBefore(inicio) && !isAfter(agora)` e transforme em `List<BigDecimal>`. Trate a lista vazia antes de dividir.',
      solucao: s03Solucao,
    },
    {
      id: 'backend-junior-p2-s04',
      titulo: 'Testes de unidade e da camada web',
      objetivo: 'Testar as regras do service com o relógio fixo e as rotas com @WebMvcTest, tudo num comando só.',
      instrucoes: s04,
      criterios: [
        '`TransacaoServiceTest` roda sem Spring, com `Clock.fixed`, e cobre as fronteiras de 60 e 61 segundos.',
        'O teste da média confere que 0,01 e 0,02 dão `0.02`.',
        '`ApiTest` usa `@WebMvcTest` e `@MockitoBean`, e confere que o valor negativo dá `422` sem chamar o service.',
        '`./mvnw test` termina com `Tests run: 10, Failures: 0, Errors: 0`.',
        'Trocar `isBefore` por `isAfter` no service faz algum teste falhar.',
      ],
      dica: 'Crie um método auxiliar `registrar(valor, segundosAtras)` no teste do service: cada caso vira duas ou três linhas. Na fatia web, `verify(service, never())` é o que prova que a validação aconteceu antes.',
      solucao: s04Solucao,
    },
    {
      id: 'backend-junior-p2-s05',
      titulo: 'Configuração, saúde e limpeza',
      objetivo: 'Tornar a janela configurável, expor a saúde da aplicação e impedir que a memória cresça para sempre.',
      instrucoes: s05,
      criterios: [
        'A janela vem de `estatistica.janela` (padrão `60s`), lida num record com `@ConfigurationProperties`; `0s` impede a aplicação de subir.',
        '`GET /actuator/health` responde `200` com `"status":"UP"`, e nenhum outro endpoint do Actuator fica exposto.',
        'Um método `@Scheduled` remove as transações fora da janela e registra quantas removeu.',
        'Com `--estatistica.janela=5s`, uma transação de 3 segundos atrás sai da estatística depois de 3,5 segundos.',
        '`./mvnw test` passa com 12 testes, incluindo a limpeza e a janela inválida.',
      ],
      dica: 'O Spring converte `60s` e `5m` para `Duration` sozinho. Para agendar, `@EnableScheduling` na aplicação e `@Scheduled(fixedDelayString = "${estatistica.limpeza}")` no método; o `removeIf` da fila faz a remoção.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
