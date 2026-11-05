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
  id: 'backend-junior-p3',
  briefing,
  etapas: [
    {
      id: 'backend-junior-p3-s01',
      titulo: 'Usuários, migrations e saldo',
      objetivo: 'Montar o projeto com banco, criar a tabela de usuários com Flyway e consultar o saldo.',
      instrucoes: s01,
      criterios: [
        'A aplicação sobe com `ddl-auto=validate` e as tabelas criadas só pelas migrations `V1` e `V2`.',
        '`GET /usuarios/1` responde `{"id":1,"nome":"Ana Lima","tipo":"COMUM","saldo":500.00}`, sem documento nem e-mail.',
        '`GET /usuarios/99` responde `404` como `ProblemDetail`, com `"detail":"usuário 99 não existe"`.',
        'O banco recusa saldo negativo e documento ou e-mail repetidos, com `check` e `unique`.',
        'A URL do banco vem de `DB_URL`, com o H2 em modo PostgreSQL como padrão.',
      ],
      dica: 'Escreva a migration primeiro e a entidade depois, campo por campo; o `validate` aponta qualquer diferença na inicialização. O `ProblemDetail.forStatusAndDetail` monta o corpo do erro numa linha.',
      solucao: s01Solucao,
    },
    {
      id: 'backend-junior-p3-s02',
      titulo: 'Transferências com transação',
      objetivo: 'Transferir entre usuários com as regras de negócio na entidade e tudo numa transação.',
      instrucoes: s02,
      criterios: [
        '`POST /transferencias` de 100.00 da Ana para o Bruno responde `201` com `Location`, e os saldos passam a 400.00 e 150.00.',
        'Saldo insuficiente, lojista pagando e pagador igual ao recebedor respondem `422` com o motivo no `detail`.',
        'Usuário inexistente responde `404`; valor negativo ou com três casas responde `400` com o campo no `detail`.',
        'Em todas as recusas, nenhum saldo muda e nenhuma transferência é gravada.',
        'O horário da resposta do `POST` é igual ao da consulta `GET /transferencias/{id}`.',
      ],
      dica: 'Ponha `debitar` e `creditar` na entidade e deixe o service só orquestrar: buscar os dois usuários, chamar os métodos e salvar a transferência. O `@Transactional` vai no método público do service.',
      solucao: s02Solucao,
    },
    {
      id: 'backend-junior-p3-s03',
      titulo: 'O autorizador externo',
      objetivo: 'Consultar o autorizador antes de concluir, com tempo limite, e responder certo quando ele nega, demora ou falha.',
      instrucoes: s03,
      criterios: [
        'Com o autorizador respondendo `{"autorizado":false}`, a transferência responde `422` e nada muda.',
        'Com o autorizador demorando mais de 2 segundos, a resposta é `503` em cerca de 2 segundos.',
        'Com o autorizador respondendo `500`, a resposta é `503`, sem detalhes internos.',
        'O service depende da interface `Autorizador`, e a URL e o tempo limite vêm de configuração.',
        'Depois dos quatro cenários (sim, não, lento e erro), só a primeira transferência está gravada.',
      ],
      dica: 'Configure o tempo limite na fábrica do `RestClient` (`JdkClientHttpRequestFactory` com `setReadTimeout`) e transforme qualquer `RestClientException` numa exceção sua. Para testar, um `HttpServer` do JDK serve de autorizador falso.',
      solucao: s03Solucao,
    },
    {
      id: 'backend-junior-p3-s04',
      titulo: 'Notificação depois do commit',
      objetivo: 'Avisar o recebedor só depois que a transferência foi gravada, sem que uma falha no aviso desfaça a transferência.',
      instrucoes: s04,
      criterios: [
        'Uma transferência concluída envia ao notificador `{"usuario":2,"texto":"você recebeu 100.00 de Ana Lima"}`.',
        'Com o notificador fora do ar, a transferência responde `201` e a falha aparece só no log.',
        'Uma transferência negada não envia nenhum aviso.',
        'O aviso é disparado por `@TransactionalEventListener(phase = AFTER_COMMIT)`, a partir de um evento com dados prontos, sem a entidade.',
      ],
      dica: 'O service só publica o evento com `ApplicationEventPublisher`; quem chama o notificador é outro componente. Envolva a chamada num `try`/`catch` que registra o erro com `log.warn`.',
      solucao: s04Solucao,
    },
    {
      id: 'backend-junior-p3-s05',
      titulo: 'Testes em quatro tamanhos',
      objetivo: 'Provar as regras, as migrations e o "tudo ou nada" com testes de unidade, Mockito, JPA e integração.',
      instrucoes: s05,
      criterios: [
        '`UsuarioTest` cobre o saldo zerado, o saldo insuficiente sem mudança e o lojista, sem Spring.',
        '`TransferenciaServiceTest` usa Mockito e prova que a transferência negada não grava nem publica evento.',
        '`UsuarioRepositoryTest` usa `@DataJpaTest`, roda as migrations e prova que o banco recusa documento repetido.',
        '`TransferenciaIntegracaoTest` prova, no banco, que a transferência negada não muda os saldos e não notifica.',
        '`./mvnw test` termina com `Tests run: 10, Failures: 0, Errors: 0`.',
      ],
      dica: 'Comece pelos testes sem Spring, que são rápidos e pegam a maioria dos erros. No teste de integração, deixe o `@Transactional` de fora e restaure os dados num `@BeforeEach` com `JdbcTemplate`.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
