import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t2-e01',
  minutos: 16,
  aula,
  armadilhas: [
    'Um `GET` nunca deve alterar dados: navegadores, proxies e robôs o repetem à vontade.',
    '`POST` não é idempotente: reenviá-lo depois de uma falha de rede pode criar o recurso duas vezes.',
    '`401` é "não sei quem você é"; `403` é "sei, e você não pode".',
    '`Content-Type` descreve o corpo que vai na mensagem; `Accept` diz o que o cliente quer receber.',
    'Nomes de cabeçalho não diferenciam maiúsculas: compare com `equalsIgnoreCase` ou um mapa sem diferença de caixa.',
    '`Content-Length` conta bytes, não caracteres: `"Café"` tem 4 caracteres e 5 bytes em UTF-8.',
    'Erros `4xx` não se resolvem repetindo a requisição igual; `5xx`, às vezes sim, de preferência respeitando o `Retry-After`.',
  ],
  ia: {
    uso:
      'Para HTTP, a IA é uma boa consultora de "qual status, qual método, qual cabeçalho" e explica uma troca de mensagens que você colar. Use-a para revisar o desenho das respostas de uma API. Ela não conhece as convenções do seu time e repete práticas comuns e erradas, como erro com status 200.',
    pedido:
      'Revise os status e cabeçalhos desta API de pedidos, feita em Spring Boot 4.1.\n<cole aqui a lista de rotas, com método, caminho, situações e o status que cada uma devolve hoje>\n- Para cada situação, diga o status mais adequado segundo a RFC 9110 e justifique em uma frase.\n- Aponte respostas de erro que hoje saem com status 2xx.\n- Diga quais rotas não são idempotentes e o que acontece se o cliente repetir a requisição.\n- Não cole nem peça tokens ou cookies reais.',
    erros: [
      'Usa `400` para tudo, inclusive para regras de negócio que pediam `422`.',
      'Troca `401` por `403`, ou devolve `403` para quem não está logado.',
      'Sugere `GET` para operações que alteram dados, como cancelar um pedido.',
      'Calcula o `Content-Length` com `String.length()`.',
    ],
    conferir: [
      'Confira cada status na seção da RFC 9110 que o define.',
      'Rode as rotas com `curl -i` e veja o status e os cabeçalhos de verdade.',
      'Teste com texto acentuado para pegar erros de tamanho em bytes.',
    ],
  },
  recursos: [
    {
      titulo: 'MDN: Uma visão geral do HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview',
      tipo: 'documentacao',
      porque: 'Clientes, servidores, proxies, mensagens e a falta de estado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'MDN: Mensagens HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages',
      tipo: 'documentacao',
      porque: 'A anatomia da requisição e da resposta, e como o HTTP/2 as divide em quadros.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'MDN: Métodos de requisição HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods',
      tipo: 'documentacao',
      porque: 'Cada método, com as propriedades de seguro, idempotente e armazenável em cache.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'MDN: Códigos de status de respostas HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status',
      tipo: 'documentacao',
      porque: 'A lista completa, um código por página, com exemplos.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'MDN: Cabeçalhos HTTP',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers',
      tipo: 'documentacao',
      porque: 'Referência de todos os cabeçalhos, agrupados por finalidade.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'RFC 9110: HTTP Semantics',
      url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
      tipo: 'documentacao',
      porque: 'A especificação de métodos, status e cabeçalhos, válida para todas as versões do HTTP.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'RFC 9112: HTTP/1.1',
      url: 'https://www.rfc-editor.org/rfc/rfc9112.html',
      tipo: 'documentacao',
      porque: 'O formato em texto, o `Content-Length`, o `chunked` e o *request smuggling*.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc: com.sun.net.httpserver.HttpServer',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/jdk.httpserver/com/sun/net/httpserver/HttpServer.html',
      tipo: 'documentacao',
      porque: 'O servidor HTTP simples que vem no JDK, usado nos exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Refatorando: Entendendo o protocolo HTTP',
      url: 'https://www.youtube.com/watch?v=PcHbyGVoqZk',
      tipo: 'video',
      porque: 'Requisição, resposta, métodos e status, com desenhos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Código Fonte TV: HTTP, Dicionário do Programador',
      url: 'https://www.youtube.com/watch?v=hwttZtWkXTk',
      tipo: 'video',
      porque: 'A história e o funcionamento do HTTP em dez minutos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Cod3r: O básico de HTTP',
      url: 'https://www.youtube.com/watch?v=CXzbUwK6lc8',
      tipo: 'video',
      porque: 'Os conceitos essenciais, com requisições de verdade no navegador, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'ByteByteGo: HTTP Status Codes Explained In 5 Minutes',
      url: 'https://www.youtube.com/watch?v=qmpUfWN7hh4',
      tipo: 'video',
      porque: 'As classes de status e os códigos mais usados, com diagramas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'High Performance Browser Networking (Ilya Grigorik)',
      url: 'https://hpbn.co/',
      tipo: 'livro',
      porque: 'O livro inteiro, gratuito na web: TCP, TLS, HTTP/1.1 e HTTP/2 por dentro.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
      onde: 'Cap. 9, "Brief History of HTTP"; Cap. 11, "HTTP/1.X"; Cap. 12, "HTTP/2"',
    },
  ],
  desafio: {
    titulo: 'Leitor de requisições',
    enunciado:
      'Escreva um método que receba os bytes crus de uma requisição HTTP/1.1 e devolva um `record` com o método, o caminho sem a query string, os parâmetros da query já decodificados, os cabeçalhos (buscáveis sem diferença de maiúsculas) e o corpo. Leia exatamente `Content-Length` **bytes** de corpo e ignore o que vier depois, que já seria a próxima requisição na mesma conexão. Com a requisição abaixo, em que o corpo tem 15 caracteres e 16 bytes, a saída deve ser:\n\n```text\nPOST /produtos?busca=teclado%20sem%20fio&pagina=2 HTTP/1.1\nHost: loja.exemplo\ncontent-type: application/json\nContent-Length: 16\n\n{"nome":"Café"}GET /seguinte HTTP/1.1\n```\n\n```text\nmétodo: POST\ncaminho: /produtos\nparâmetros: {busca=teclado sem fio, pagina=2}\nContent-Type: application/json\ncorpo: {"nome":"Café"}\n```',
    dicas: [
      'Procure a sequência `\\r\\n\\r\\n` nos **bytes**: tudo antes dela é ASCII, e o corpo começa 4 bytes depois.',
      'Um `TreeMap` com `String.CASE_INSENSITIVE_ORDER` faz `get("Content-Type")` achar `content-type`.',
      '`URLDecoder.decode(texto, StandardCharsets.UTF_8)` transforma `%20` em espaço.',
      'Converta só os `Content-Length` bytes do corpo para `String`, com `Arrays.copyOfRange`.',
    ],
    solucao: `import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

public class LeitorDeRequisicoes {
    record Requisicao(String metodo, String caminho, Map<String, String> parametros,
                      Map<String, String> cabecalhos, String corpo) {}

    static Requisicao ler(byte[] bruto) {
        int fimDoCabecalho = indiceDe(bruto, "\\r\\n\\r\\n".getBytes(StandardCharsets.US_ASCII));
        String[] linhas = new String(bruto, 0, fimDoCabecalho, StandardCharsets.US_ASCII).split("\\r\\n");
        String[] partes = linhas[0].split(" ");
        String alvo = partes[1];
        String caminho = alvo.contains("?") ? alvo.substring(0, alvo.indexOf('?')) : alvo;
        Map<String, String> parametros = new LinkedHashMap<>();
        if (alvo.contains("?")) {
            for (String par : alvo.substring(alvo.indexOf('?') + 1).split("&")) {
                String[] kv = par.split("=", 2);
                parametros.put(URLDecoder.decode(kv[0], StandardCharsets.UTF_8),
                        kv.length > 1 ? URLDecoder.decode(kv[1], StandardCharsets.UTF_8) : "");
            }
        }
        Map<String, String> cabecalhos = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        for (int i = 1; i < linhas.length; i++) {
            int doisPontos = linhas[i].indexOf(':');
            cabecalhos.put(linhas[i].substring(0, doisPontos).trim(), linhas[i].substring(doisPontos + 1).trim());
        }
        int inicio = fimDoCabecalho + 4;
        int tamanho = Integer.parseInt(cabecalhos.getOrDefault("Content-Length", "0"));
        String corpo = new String(Arrays.copyOfRange(bruto, inicio, inicio + tamanho), StandardCharsets.UTF_8);
        return new Requisicao(partes[0], caminho, parametros, cabecalhos, corpo);
    }

    static int indiceDe(byte[] dados, byte[] alvo) {
        for (int i = 0; i + alvo.length <= dados.length; i++) {
            if (Arrays.equals(dados, i, i + alvo.length, alvo, 0, alvo.length)) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        String texto = "POST /produtos?busca=teclado%20sem%20fio&pagina=2 HTTP/1.1\\r\\n"
                + "Host: loja.exemplo\\r\\n"
                + "content-type: application/json\\r\\n"
                + "Content-Length: 16\\r\\n"
                + "\\r\\n"
                + "{\\"nome\\":\\"Café\\"}GET /seguinte HTTP/1.1\\r\\n";
        Requisicao r = ler(texto.getBytes(StandardCharsets.UTF_8));
        System.out.println("método: " + r.metodo());
        System.out.println("caminho: " + r.caminho());
        System.out.println("parâmetros: " + r.parametros());
        System.out.println("Content-Type: " + r.cabecalhos().get("Content-Type"));
        System.out.println("corpo: " + r.corpo());
    }
}`,
    saida: 'método: POST\ncaminho: /produtos\nparâmetros: {busca=teclado sem fio, pagina=2}\nContent-Type: application/json\ncorpo: {"nome":"Café"}',
    comentarios:
      'O cabeçalho é sempre ASCII, mas o corpo não: se o texto inteiro fosse convertido para `String` antes, os índices de caracteres e de bytes deixariam de coincidir depois do `é`, e o `Content-Length` cortaria o corpo no lugar errado. Por isso a busca do fim do cabeçalho e o corte do corpo são feitos sobre os bytes. Um servidor de verdade ainda trata `Transfer-Encoding: chunked`, cabeçalhos repetidos, limites de tamanho e requisições malformadas, que aqui lançariam exceções; e recusa uma requisição com `Content-Length` e `chunked` ao mesmo tempo, a porta de entrada do *request smuggling*.',
  },
  bugs: [
    {
      id: 'backend-junior-t2-e01-b01',
      dificuldade: 1,
      sintoma: 'Um servidor HTTP escrito à mão manda respostas cortadas quando o nome do produto tem acento: o cliente recebe `{"nome":"Café"`, sem a chave final, e o parser de JSON falha.',
      codigo: `import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class Tamanho {
    public static void main(String[] args) {
        String json = "{\\"nome\\":\\"Café\\"}";
        int contentLength = json.length();
        byte[] noFio = json.getBytes(StandardCharsets.UTF_8);
        byte[] lidos = Arrays.copyOf(noFio, contentLength);
        System.out.println("recebido: " + new String(lidos, StandardCharsets.UTF_8));
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'recebido: {"nome":"Café"' },
      correcao: `import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class Tamanho {
    public static void main(String[] args) {
        String json = "{\\"nome\\":\\"Café\\"}";
        int contentLength = json.getBytes(StandardCharsets.UTF_8).length;
        byte[] noFio = json.getBytes(StandardCharsets.UTF_8);
        byte[] lidos = Arrays.copyOf(noFio, contentLength);
        System.out.println("recebido: " + new String(lidos, StandardCharsets.UTF_8));
    }
}`,
      saidaCorrigida: 'recebido: {"nome":"Café"}',
      dica: 'O `Content-Length` conta o quê? Quantos bytes o `é` ocupa em UTF-8?',
      explicacao:
        'O JSON tem 15 caracteres e 16 bytes, porque o `é` ocupa dois. O cliente lê exatamente `Content-Length` bytes e para um antes do fim. O tamanho precisa ser calculado sobre os bytes que vão de fato para o fio.',
    },
    {
      id: 'backend-junior-t2-e01-b02',
      dificuldade: 2,
      sintoma: 'O cliente da API de estoque ficou repetindo um pedido inválido sem parar, mas desiste na primeira vez que o servidor responde 503: `400 -> tenta de novo`, `503 -> desiste`.',
      codigo: `public class Retentar {
    static boolean vaiTentarDeNovo(int status) {
        return status / 100 == 4;
    }

    public static void main(String[] args) {
        for (int status : new int[] {400, 404, 503}) {
            System.out.println(status + " -> " + (vaiTentarDeNovo(status) ? "tenta de novo" : "desiste"));
        }
    }
}`,
      linha: 3,
      efeito: { tipo: 'saida', saida: '400 -> tenta de novo\n404 -> tenta de novo\n503 -> desiste' },
      correcao: `public class Retentar {
    static boolean vaiTentarDeNovo(int status) {
        return status >= 500;
    }

    public static void main(String[] args) {
        for (int status : new int[] {400, 404, 503}) {
            System.out.println(status + " -> " + (vaiTentarDeNovo(status) ? "tenta de novo" : "desiste"));
        }
    }
}`,
      saidaCorrigida: '400 -> desiste\n404 -> desiste\n503 -> tenta de novo',
      dica: 'Qual classe de status diz "repetir igual não vai adiantar"?',
      explicacao:
        'Um `4xx` é erro do cliente: a mesma requisição vai falhar do mesmo jeito. Um `5xx` pode ser temporário, e tentar de novo, com espera, faz sentido. O código tinha as duas classes trocadas. Num cliente de verdade, a nova tentativa também respeita o `Retry-After` e tem um limite.',
    },
    {
      id: 'backend-junior-t2-e01-b03',
      dificuldade: 3,
      sintoma: 'Depois que o proxy passou a falar HTTP/2 com o serviço, todas as requisições chegam com `formato: desconhecido`, embora o cliente mande `Content-Type: application/json`.',
      codigo: `import java.util.HashMap;
import java.util.Map;

public class Cabecalhos {
    public static void main(String[] args) {
        String[] recebidos = {"content-type: application/json", "content-length: 26"};
        Map<String, String> cabecalhos = new HashMap<>();
        for (String linha : recebidos) {
            String[] p = linha.split(": ", 2);
            cabecalhos.put(p[0], p[1]);
        }
        System.out.println("formato: " + cabecalhos.getOrDefault("Content-Type", "desconhecido"));
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'formato: desconhecido' },
      correcao: `import java.util.HashMap;
import java.util.Map;

public class Cabecalhos {
    public static void main(String[] args) {
        String[] recebidos = {"content-type: application/json", "content-length: 26"};
        Map<String, String> cabecalhos = new java.util.TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        for (String linha : recebidos) {
            String[] p = linha.split(": ", 2);
            cabecalhos.put(p[0], p[1]);
        }
        System.out.println("formato: " + cabecalhos.getOrDefault("Content-Type", "desconhecido"));
    }
}`,
      saidaCorrigida: 'formato: application/json',
      dica: 'Os nomes de cabeçalho diferenciam maiúsculas de minúsculas? E as chaves de um `HashMap`?',
      explicacao:
        'Nomes de cabeçalho não diferenciam maiúsculas, e o HTTP/2 manda todos em minúsculas. Um `HashMap` comum diferencia. Um `TreeMap` com `String.CASE_INSENSITIVE_ORDER` trata `Content-Type` e `content-type` como a mesma chave; é o que o `HttpHeaders` do Spring e do JDK fazem por dentro.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t2-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes métodos é **seguro**, isto é, não deve alterar nada no servidor?',
      opcoes: ['`GET`', '`POST`', '`DELETE`', '`PATCH`'],
      resposta: 0,
      explicacao: 'Métodos seguros podem ser repetidos, pré-carregados e guardados em cache. `HEAD` e `OPTIONS` também são seguros.',
      dica: 'Seguro quer dizer: só lê, nunca altera nada.',
    },
    {
      id: 'backend-junior-t2-e01-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais métodos são **idempotentes**, de modo que repetir a mesma requisição deixa o servidor no mesmo estado? Escolha dois.',
      opcoes: ['`PUT`', '`DELETE`', '`POST`', '`PATCH`, sempre', 'Nenhum método HTTP é idempotente'],
      respostas: [0, 1],
      explicacao: '`PUT` grava o mesmo valor de novo e `DELETE` apaga o que já foi apagado. Dois `POST` criam dois recursos, e um `PATCH` como "some 1 ao estoque" muda o resultado a cada repetição.',
      dica: 'Repetir a mesma requisição deixa o servidor no mesmo estado. Qual dos métodos cria algo novo a cada vez?',
    },
    {
      id: 'backend-junior-t2-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma cliente logada tenta abrir `GET /pedidos/77`, que é de outra pessoa. Qual status a API deve devolver?',
      opcoes: ['`403 Forbidden`', '`401 Unauthorized`', '`400 Bad Request`', '`500 Internal Server Error`'],
      resposta: 0,
      explicacao: 'A API sabe quem ela é, e ela não tem permissão: `403`. O `401` seria para uma requisição sem credenciais válidas. Algumas APIs respondem `404` nesse caso, para nem revelar que o pedido existe.',
      dica: 'O servidor sabe quem ela é, mas ela não tem permissão para esse recurso.',
    },
    {
      id: 'backend-junior-t2-e01-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um `POST /pedidos` criou o pedido 512. Qual é a resposta mais adequada?',
      opcoes: [
        '`201 Created` com `Location: /pedidos/512`',
        '`200 OK` sem cabeçalhos especiais',
        '`204 No Content`',
        '`302 Found` com `Location: /pedidos/512`',
      ],
      resposta: 0,
      explicacao: 'O `201` diz que algo foi criado, e o `Location` diz onde. O `302` mandaria o cliente fazer outra requisição.',
      dica: 'Criou um recurso: há um status próprio e um cabeçalho que diz onde ele está.',
    },
    {
      id: 'backend-junior-t2-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O cliente envia o corpo `{"nome": "Teclado",` (o JSON termina no meio). Qual status a API deve devolver?',
      opcoes: ['`400 Bad Request`', '`422 Unprocessable Content`', '`404 Not Found`', '`500 Internal Server Error`'],
      resposta: 0,
      explicacao: 'A requisição está malformada: nem dá para ler o JSON. O `422` é para um JSON legível com dados inválidos. E nunca `500`: o erro é do cliente.',
      dica: 'O JSON nem chega a virar um objeto.',
    },
    {
      id: 'backend-junior-t2-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que um cliente bem escrito deve fazer ao receber `503 Service Unavailable` com `Retry-After: 30`?',
      opcoes: [
        'Esperar 30 segundos antes de tentar de novo',
        'Repetir imediatamente, várias vezes',
        'Desistir para sempre: o recurso não existe',
        'Trocar o método para `POST`',
      ],
      resposta: 0,
      explicacao: 'O servidor está temporariamente indisponível e disse quando voltar. Repetir em rajada só aumenta a sobrecarga.',
      dica: 'O 503 é temporário, e o cabeçalho diz quanto esperar.',
    },
    {
      id: 'backend-junior-t2-e01-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um cliente envia `Content-Type: application/json` e `Accept: text/csv`. O que isso significa?',
      opcoes: [
        'O corpo enviado é JSON, e o cliente quer receber a resposta em CSV',
        'O cliente quer receber JSON e está enviando CSV',
        'A requisição é inválida, porque os dois precisam ser iguais',
        'O servidor deve responder nos dois formatos',
      ],
      resposta: 0,
      explicacao: '`Content-Type` descreve o que vai na mensagem; `Accept`, o que se aceita de volta. Se o servidor não souber gerar CSV, responde `406 Not Acceptable`.',
      dica: 'Um cabeçalho fala do que vai; o outro, do que o cliente quer receber.',
    },
    {
      id: 'backend-junior-t2-e01-q08',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) {
        String corpo = "Café";
        System.out.println(corpo.length() + " " + corpo.getBytes(StandardCharsets.UTF_8).length);
    }
}`,
      resposta: '4 5',
      explicacao: 'O `é` ocupa dois bytes em UTF-8. Um `Content-Length: 4` cortaria o último byte, e o cliente receberia um caractere inválido.',
      dica: 'Conte caracteres e bytes de "Café": o `é` ocupa dois bytes em UTF-8.',
    },
    {
      id: 'backend-junior-t2-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        String linha = "HTTP/1.1 404 Not Found";
        String[] partes = linha.split(" ", 3);
        int status = Integer.parseInt(partes[1]);
        System.out.println(status / 100 + "xx|" + partes[2]);
    }
}`,
      opcoes: ['`4xx|Not Found`', '`404|Not Found`', '`4xx|Not`', '`4.04xx|Not Found`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O limite 3 no `split` deixa a frase inteira na última parte, mesmo com espaços. E a divisão inteira por 100 dá a classe do status.',
      dica: 'Leia o que o programa imprime para cada status e caminho.',
    },
    {
      id: 'backend-junior-t2-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um servidor recebeu o cabeçalho `content-length: 16`, todo em minúsculas. Ele deve tratá-lo como o `Content-Length`?',
      opcoes: [
        'Sim: nomes de cabeçalho não diferenciam maiúsculas de minúsculas',
        'Não: o nome correto é `Content-Length`, e o cabeçalho deve ser ignorado',
        'Só no HTTP/1.0',
        'Só se o método for `POST`',
      ],
      resposta: 0,
      explicacao: 'No HTTP/2, aliás, todos os nomes de cabeçalho trafegam em minúsculas.',
      dica: 'Os nomes de cabeçalho diferenciam maiúsculas de minúsculas?',
    },
    {
      id: 'backend-junior-t2-e01-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O cliente envia `If-None-Match: "v7"`, e o recurso continua na versão `"v7"`. Qual é a resposta ideal?',
      opcoes: [
        '`304 Not Modified`, sem corpo',
        '`200 OK` com o recurso inteiro',
        '`204 No Content`',
        '`409 Conflict`',
      ],
      resposta: 0,
      explicacao: 'O cliente já tem a versão atual em cache. O `304` economiza o corpo inteiro na rede.',
      dica: 'Se o cliente já tem a versão atual, o servidor não precisa reenviar o corpo.',
    },
    {
      id: 'backend-junior-t2-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Se o HTTP não guarda estado entre requisições, como um usuário continua logado ao navegar pela loja?',
      opcoes: [
        'Um cookie de sessão ou um token é enviado de novo em cada requisição',
        'O servidor lembra o endereço IP do usuário',
        'A conexão TCP fica aberta enquanto o usuário estiver logado',
        'O navegador envia a senha a cada clique',
      ],
      resposta: 0,
      explicacao: 'O estado viaja com a requisição. IPs mudam e são compartilhados, e uma conexão pode fechar a qualquer momento.',
      dica: 'O que viaja em cada requisição e identifica o usuário?',
    },
    {
      id: 'backend-junior-t2-e01-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um `POST /checkout` precisa ser redirecionado temporariamente para outro endereço, mantendo o método e o corpo. Qual status?',
      opcoes: ['`307 Temporary Redirect`', '`302 Found`', '`301 Moved Permanently`', '`304 Not Modified`'],
      resposta: 0,
      explicacao: 'Com `301` e `302`, clientes podem trocar o `POST` por `GET`. O `307` e o `308`, permanente, garantem o mesmo método.',
      dica: 'Entre os redirecionamentos temporários, um garante que o método e o corpo não mudam.',
    },
    {
      id: 'backend-junior-t2-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa requisição HTTPS para `https://loja.exemplo/pedidos?cpf=123`, o que alguém observando a rede consegue ver?',
      opcoes: [
        'O endereço IP do servidor e, em geral, o nome `loja.exemplo`, mas não o caminho, a query, os cabeçalhos nem o corpo',
        'Tudo, inclusive o CPF na query',
        'Nada, nem o IP do servidor',
        'Só o corpo da resposta',
      ],
      resposta: 0,
      explicacao: 'O TLS cifra a mensagem HTTP inteira. Mesmo assim, dados sensíveis não devem ir na URL: ela aparece em logs e no histórico do navegador.',
      dica: 'O TLS cifra a mensagem HTTP inteira, inclusive o caminho e a query string.',
    },
    {
      id: 'backend-junior-t2-e01-q15',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'O que uma requisição HTTP/1.1 precisa ter, no mínimo? Escolha duas.',
      opcoes: [
        'A linha de requisição, com método, alvo e versão',
        'O cabeçalho `Host`',
        'Um corpo',
        'O cabeçalho `Content-Type`',
        'Um cookie',
      ],
      respostas: [0, 1],
      explicacao: 'Um `GET` não tem corpo, e por isso dispensa `Content-Type`. O `Host` é obrigatório porque um IP pode servir muitos sites.',
      dica: 'A primeira linha é obrigatória, e o HTTP/1.1 exige um cabeçalho específico.',
    },
  ],
};

export default episodio;
