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
  id: 'backend-junior-p1',
  briefing,
  etapas: [
    {
      id: 'backend-junior-p1-s01',
      titulo: 'O servidor e a rota de saúde',
      objetivo: 'Subir um servidor HTTP só com o JDK, responder a rota de saúde e testar tudo numa porta livre.',
      instrucoes: s01,
      criterios: [
        '`GET /saude` responde `200` com `{"status":"ok"}` e `Content-Type: application/json; charset=utf-8`.',
        'Qualquer outra rota, inclusive `/saude/extra`, responde `404` com um JSON de erro.',
        'O servidor escuta só no loopback, e o `Main` sobe na porta 8080.',
        '`TesteDaApi` sobe a API na porta 0, faz as três requisições e para o servidor no fim.',
        'O projeto está num repositório Git, com o primeiro commit.',
      ],
      dica: 'Monte o servidor com `HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), porta), 0)`. Responda sempre em três passos: cabeçalhos, `sendResponseHeaders` com o tamanho em bytes e o corpo.',
      solucao: s01Solucao,
    },
    {
      id: 'backend-junior-p1-s02',
      titulo: 'Criar, listar e buscar',
      objetivo: 'Guardar tarefas em memória e oferecer criação, listagem e busca, com o JSON escrito sempre escapado.',
      instrucoes: s02,
      criterios: [
        '`POST /tarefas` responde `201`, com `Location: /tarefas/1` e a tarefa criada no corpo.',
        '`GET /tarefas` devolve um array JSON com as tarefas em ordem de id.',
        '`GET /tarefas/2` devolve a tarefa, e `/tarefas/99` ou `/tarefas/abc` respondem `404`.',
        'Um título com aspas, como `Ler sobre "REST"`, sai escapado e o JSON continua válido.',
        'As tarefas ficam num `ConcurrentHashMap`, com ids de um `AtomicLong`.',
      ],
      dica: 'Quebre o caminho com `split("/")`: a coleção tem duas partes e o item, três. Para o JSON de saída, cada texto passa por `Json.texto(...)`, que põe as aspas e os escapes.',
      solucao: s02Solucao,
    },
    {
      id: 'backend-junior-p1-s03',
      titulo: 'Atualizar, apagar e métodos não permitidos',
      objetivo: 'Completar o CRUD com PUT e DELETE e responder 405 com o cabeçalho Allow para os métodos que a rota não aceita.',
      instrucoes: s03,
      criterios: [
        '`PUT /tarefas/1` com título e `concluida` troca a tarefa inteira e responde `200`; repetir o mesmo `PUT` dá o mesmo resultado.',
        '`DELETE /tarefas/1` responde `204` sem corpo, e um segundo `DELETE` responde `404`.',
        '`PATCH /tarefas/1` e `DELETE /tarefas` respondem `405` com o cabeçalho `Allow`.',
        'O roteamento separa coleção e item e escolhe a ação com um `switch` pelo método.',
      ],
      dica: 'Decida primeiro se o caminho é a coleção ou um item, e só depois olhe o método. O `default` de cada `switch` é o lugar do `405`. Para o `204`, use `sendResponseHeaders(204, -1)`.',
      solucao: s03Solucao,
    },
    {
      id: 'backend-junior-p1-s04',
      titulo: 'Validação e erros que ajudam',
      objetivo: 'Transformar toda entrada ruim numa resposta clara, com o status certo, sem nunca derrubar o serviço nem vazar detalhes.',
      instrucoes: s04,
      criterios: [
        'JSON malformado, ou que não é um objeto, responde `400` com uma mensagem que diz onde está o problema.',
        'Título vazio, que não é texto ou com mais de 100 caracteres responde `422` com `"campo":"titulo"`.',
        'Um corpo com mais de 10.000 bytes responde `413` sem ser lido inteiro na memória.',
        'Um `POST` sem `Content-Type: application/json` responde `415`, testado com `curl`.',
        'Um erro inesperado responde `500` com `{"erro":"erro interno"}`, e o detalhe vai só para o log.',
      ],
      dica: 'Crie `ErroHttp` com o status e faça um método `atender` envolver todas as rotas: ele captura `ErroHttp`, captura `Exception` para o `500` e fecha a troca no `finally`.',
      solucao: s04Solucao,
    },
    {
      id: 'backend-junior-p1-s05',
      titulo: 'Filtros, paginação e concorrência',
      objetivo: 'Filtrar e paginar a listagem com parâmetros validados e atender cada requisição numa thread virtual.',
      instrucoes: s05,
      criterios: [
        '`GET /tarefas?concluida=false` devolve só as pendentes, com `total` contando as filtradas.',
        '`GET /tarefas?pagina=2&tamanho=2` devolve só a terceira tarefa, com `pagina`, `tamanho` e `total` no corpo.',
        'Parâmetros inválidos, como `tamanho=abc` ou `tamanho=1000`, respondem `400`.',
        'O servidor atende cada requisição numa thread virtual.',
        '`TesteDaApi` roda os 10 cenários e termina com `10 de 10 conferidos`.',
      ],
      dica: 'Leia a query com `getRawQuery()`, quebre por `&` e por `=`, e decodifique com `URLDecoder`. Na listagem: filtre, ordene, conte o total e só então aplique `skip` e `limit`.',
      solucao: s05Solucao,
    },
  ],
  portfolio,
};

export default projeto;
