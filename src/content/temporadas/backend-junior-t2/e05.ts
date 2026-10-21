import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t2-e05',
  minutos: 16,
  aula,
  armadilhas: [
    'Sem `-i`, o curl mostra só o corpo: um `404` sem corpo parece uma resposta vazia de sucesso.',
    '`-d` sem `-X` transforma a requisição num `POST`.',
    'JSON no terminal vai entre aspas simples; uma URL com `&` sem aspas vira dois comandos.',
    'No Windows PowerShell 5.1, `curl` é o `Invoke-WebRequest`: chame `curl.exe`.',
    '"Copiar como cURL" leva o token de autorização junto: apague-o antes de compartilhar.',
    'A documentação gerada só a partir do código erra o que é decidido em execução, como o `201` de um `ResponseEntity.created`.',
    'OpenAPI é a especificação; Swagger é o nome das ferramentas que a usam.',
  ],
  recursos: [
    {
      titulo: 'Everything curl',
      url: 'https://everything.curl.dev/',
      tipo: 'livro',
      porque: 'O livro gratuito do criador do curl, do uso básico ao funcionamento interno.',
      gratuito: true,
      idioma: 'en',
      onde: 'Capítulos "Command line concepts" e "HTTP with curl"',
    },
    {
      titulo: 'curl: manual (How To Use)',
      url: 'https://curl.se/docs/manpage.html',
      tipo: 'documentacao',
      porque: 'Todas as opções, com a versão em que cada uma surgiu, como o `--json` no 7.82.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'curl: tutorial',
      url: 'https://curl.se/docs/tutorial.html',
      tipo: 'documentacao',
      porque: 'Os usos mais comuns em exemplos curtos: formulários, cabeçalhos, cookies, redirecionamentos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Postman Docs: Get started',
      url: 'https://learning.postman.com/docs/getting-started/overview/',
      tipo: 'documentacao',
      porque: 'Coleções, ambientes, variáveis e testes no Postman.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Bruno',
      url: 'https://www.usebruno.com/',
      tipo: 'ferramenta',
      porque: 'Um cliente de API de código aberto que guarda as coleções em arquivos, versionáveis no Git.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'IntelliJ IDEA: HTTP Client',
      url: 'https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html',
      tipo: 'documentacao',
      porque: 'Os arquivos `.http`, ambientes e variáveis, dentro da IDE.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OpenAPI Specification v3.1.0',
      url: 'https://spec.openapis.org/oas/v3.1.0.html',
      tipo: 'documentacao',
      porque: 'A especificação completa, para tirar dúvidas sobre qualquer campo do documento.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OpenAPI Initiative: Getting Started',
      url: 'https://learn.openapis.org/',
      tipo: 'tutorial',
      porque: 'Um guia em passos curtos para escrever o primeiro documento OpenAPI.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'springdoc-openapi',
      url: 'https://springdoc.org/',
      tipo: 'documentacao',
      porque: 'A biblioteca que gera o documento e o Swagger UI no Spring Boot, com as anotações e propriedades.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Swagger Editor',
      url: 'https://editor.swagger.io/',
      tipo: 'ferramenta',
      porque: 'Para escrever um documento OpenAPI no navegador, com validação e visualização ao vivo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Código Fonte TV: Swagger, Dicionário do Programador',
      url: 'https://www.youtube.com/watch?v=3nl9AzttzBQ',
      tipo: 'video',
      porque: 'O que são o Swagger e a OpenAPI e por que documentar, em oito minutos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Javanauta: Como documentar APIs com Swagger OpenAPI no Spring Boot',
      url: 'https://www.youtube.com/watch?v=wtYAqS1GcHE',
      tipo: 'video',
      porque: 'O springdoc num projeto Spring Boot, com as anotações, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Ricardo Longatto: Conhecendo o curl',
      url: 'https://www.youtube.com/watch?v=2fze_G-G2oU',
      tipo: 'video',
      porque: 'As opções do curl na prática, contra uma API de verdade, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Automation Step by Step: How to use curl on Windows',
      url: 'https://www.youtube.com/watch?v=8f9DfgRGOBo',
      tipo: 'video',
      porque: 'O curl no Windows, com as diferenças de aspas e de terminal.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Validador de contrato',
    enunciado:
      'Escreva um validador que confira o corpo de um `POST /produtos` contra um esquema simplificado, no espírito dos `components/schemas` da OpenAPI. O esquema tem `nome` (texto, obrigatório, até 40 caracteres), `preco` (número, obrigatório, mínimo 0.01), `categoria` (texto, opcional, `PERIFERICOS` ou `MONITORES`) e `estoque` (inteiro, opcional, mínimo 0). Campos fora do esquema são erros. O corpo chega como um `Map<String, Object>`, com números em `BigDecimal`, como os do leitor de JSON do episódio 3. Se não houver erros, responda `201 Created`; senão, `422` com um corpo Problem Details listando os erros na ordem do esquema e, depois, os campos desconhecidos. A saída deve ser:\n\n```text\n201 Created\n201 Created\n422 {"title":"Corpo fora do contrato","status":422,"erros":["nome: obrigatório","preco: deve ser no mínimo 0.01","categoria: deve ser um de [PERIFERICOS, MONITORES]","estoque: deve ser inteiro","cor: campo desconhecido"]}\n422 {"title":"Corpo fora do contrato","status":422,"erros":["nome: deve ser texto","preco: deve ser número"]}\n```\n\nO segundo corpo tem `estoque` igual a `3.0`, que deve ser aceito como inteiro.',
    dicas: [
      'Um `record Campo(nome, tipo, obrigatorio, minimo, maxTamanho, valores)` e uma `List<Campo>` representam o esquema, com campos `null` quando a regra não se aplica.',
      'Para saber se um `BigDecimal` é inteiro, `stripTrailingZeros().scale() > 0` indica casas decimais de verdade: `3.0` passa, `2.5` não.',
      'Para comparar `BigDecimal`, use `compareTo`, nunca `equals`: `new BigDecimal("1.0").equals(new BigDecimal("1"))` é `false`.',
      'Monte os corpos de teste com um `LinkedHashMap`, para que os campos desconhecidos apareçam numa ordem previsível.',
    ],
    solucao: `import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

public class Contrato {
    enum Tipo { STRING, NUMBER, INTEGER }

    record Campo(String nome, Tipo tipo, boolean obrigatorio, BigDecimal minimo, Integer maxTamanho, List<String> valores) {}

    static final List<Campo> NOVO_PRODUTO = List.of(
            new Campo("nome", Tipo.STRING, true, null, 40, null),
            new Campo("preco", Tipo.NUMBER, true, new BigDecimal("0.01"), null, null),
            new Campo("categoria", Tipo.STRING, false, null, null, List.of("PERIFERICOS", "MONITORES")),
            new Campo("estoque", Tipo.INTEGER, false, BigDecimal.ZERO, null, null));

    static List<String> validar(List<Campo> esquema, Map<String, Object> corpo) {
        List<String> erros = new ArrayList<>();
        for (Campo c : esquema) {
            Object valor = corpo.get(c.nome());
            if (valor == null) {
                if (c.obrigatorio()) erros.add(c.nome() + ": obrigatório");
                continue;
            }
            switch (c.tipo()) {
                case STRING -> {
                    if (!(valor instanceof String s)) {
                        erros.add(c.nome() + ": deve ser texto");
                    } else if (c.maxTamanho() != null && s.length() > c.maxTamanho()) {
                        erros.add(c.nome() + ": no máximo " + c.maxTamanho() + " caracteres");
                    } else if (c.valores() != null && !c.valores().contains(s)) {
                        erros.add(c.nome() + ": deve ser um de " + c.valores());
                    }
                }
                case NUMBER, INTEGER -> {
                    if (!(valor instanceof BigDecimal n)) {
                        erros.add(c.nome() + ": deve ser número");
                    } else if (c.tipo() == Tipo.INTEGER && n.stripTrailingZeros().scale() > 0) {
                        erros.add(c.nome() + ": deve ser inteiro");
                    } else if (c.minimo() != null && n.compareTo(c.minimo()) < 0) {
                        erros.add(c.nome() + ": deve ser no mínimo " + c.minimo());
                    }
                }
            }
        }
        List<String> conhecidos = esquema.stream().map(Campo::nome).toList();
        for (String nome : corpo.keySet()) {
            if (!conhecidos.contains(nome)) erros.add(nome + ": campo desconhecido");
        }
        return erros;
    }

    static String responder(Map<String, Object> corpo) {
        List<String> erros = validar(NOVO_PRODUTO, corpo);
        if (erros.isEmpty()) return "201 Created";
        StringJoiner lista = new StringJoiner("\\",\\"", "[\\"", "\\"]");
        erros.forEach(lista::add);
        return "422 {\\"title\\":\\"Corpo fora do contrato\\",\\"status\\":422,\\"erros\\":" + lista + "}";
    }

    static Map<String, Object> corpo(Object... pares) {
        Map<String, Object> mapa = new LinkedHashMap<>();
        for (int i = 0; i < pares.length; i += 2) mapa.put((String) pares[i], pares[i + 1]);
        return mapa;
    }

    public static void main(String[] args) {
        System.out.println(responder(corpo("nome", "Mouse", "preco", new BigDecimal("89.90"), "categoria", "PERIFERICOS")));
        System.out.println(responder(corpo("nome", "Monitor", "preco", new BigDecimal("899"), "estoque", new BigDecimal("3.0"))));
        System.out.println(responder(corpo("preco", new BigDecimal("-5"), "categoria", "CADEIRAS",
                "estoque", new BigDecimal("2.5"), "cor", "preto")));
        System.out.println(responder(corpo("nome", 123, "preco", "barato")));
    }
}`,
    saida: '201 Created\n201 Created\n422 {"title":"Corpo fora do contrato","status":422,"erros":["nome: obrigatório","preco: deve ser no mínimo 0.01","categoria: deve ser um de [PERIFERICOS, MONITORES]","estoque: deve ser inteiro","cor: campo desconhecido"]}\n422 {"title":"Corpo fora do contrato","status":422,"erros":["nome: deve ser texto","preco: deve ser número"]}',
    comentarios:
      'Reunir todos os erros de uma vez, em vez de parar no primeiro, poupa o cliente de corrigir um campo por requisição. Cada campo produz no máximo um erro, o primeiro que encontrar, para não acumular mensagens redundantes como "deve ser número" e "deve ser no mínimo" para o mesmo valor. Validadores de JSON Schema de verdade, como os usados por *gateways* e geradores de código, seguem a mesma ideia com muito mais regras: padrões de texto, formatos como `email` e `date`, objetos aninhados e combinações como `oneOf`. No Spring, o mesmo papel é feito pelo Bean Validation, com `@NotBlank`, `@Size` e `@DecimalMin` nos DTOs, assunto da [temporada de Spring Boot](/assistir/backend-junior-t4-e04).',
  },
  exercicios: [
    {
      id: 'backend-junior-t2-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual opção do curl mostra o status e os cabeçalhos da resposta junto com o corpo?',
      opcoes: ['`-i`', '`-s`', '`-o`', '`-L`'],
      resposta: 0,
      explicacao: 'O `-s` silencia a barra de progresso, o `-o` grava o corpo num arquivo e o `-L` segue redirecionamentos.',
    },
    {
      id: 'backend-junior-t2-e05-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual método o comando `curl -d \'{"nome":"Mouse"}\' http://localhost:8086/produtos` usa?',
      opcoes: ['`POST`', '`GET`', '`PUT`', '`PATCH`'],
      resposta: 0,
      explicacao: 'Enviar um corpo com `-d` muda o método para `POST`, a menos que `-X` diga outro. E esse comando ainda não diz que o corpo é JSON: faltou o `Content-Type`.',
    },
    {
      id: 'backend-junior-t2-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que a opção `--json`, do curl 7.82 em diante, faz além de enviar o corpo?',
      opcoes: [
        'Acrescenta `Content-Type: application/json` e `Accept: application/json`',
        'Valida a sintaxe do JSON antes de enviar',
        'Formata a resposta JSON com indentação',
        'Converte a resposta em uma tabela',
      ],
      resposta: 0,
      explicacao: 'É um atalho para `--data-binary` com os dois cabeçalhos. O próprio manual avisa que nada verifica se o texto é JSON válido.',
    },
    {
      id: 'backend-junior-t2-e05-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um script de monitoramento precisa só do status de `/saude`, sem corpo nem barra de progresso. Qual comando?',
      opcoes: [
        '`curl -s -o /dev/null -w "%{http_code}" http://localhost:8086/saude`',
        '`curl -v http://localhost:8086/saude`',
        '`curl -i http://localhost:8086/saude`',
        '`curl -L http://localhost:8086/saude`',
      ],
      resposta: 0,
      explicacao: 'O `-o /dev/null` descarta o corpo, o `-s` silencia o resto, e o `-w` imprime só a variável pedida.',
    },
    {
      id: 'backend-junior-t2-e05-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Na saída do `curl -v`, o que são as linhas que começam com `>`?',
      opcoes: [
        'A requisição que o curl enviou',
        'A resposta do servidor',
        'Mensagens de erro',
        'Comentários do próprio curl sobre a conexão',
      ],
      resposta: 0,
      explicacao: '`>` é o que sai, `<` é o que chega, e `*` são as informações do curl, como a resolução do nome e a conexão.',
    },
    {
      id: 'backend-junior-t2-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Linux, por que o corpo JSON de um `curl -d` vai entre aspas simples, e não duplas?',
      opcoes: [
        'Porque o terminal não interpreta nada dentro de aspas simples, e as aspas duplas do JSON chegam intactas',
        'Porque o curl só aceita aspas simples',
        'Porque o JSON exige aspas simples',
        'É só uma preferência de estilo',
      ],
      resposta: 0,
      explicacao: 'Com aspas duplas por fora, as aspas do JSON fechariam o argumento, e o `$` seria interpretado como variável.',
    },
    {
      id: 'backend-junior-t2-e05-q07',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'O método prepara um texto para ir entre aspas simples no terminal. Digite a saída exata.',
      codigo: `public class Teste {
    static String aspas(String texto) {
        return "'" + texto.replace("'", "'\\\\''") + "'";
    }

    public static void main(String[] args) {
        System.out.println(aspas("d'Ouro"));
    }
}`,
      resposta: "'d'\\''Ouro'",
      explicacao: 'Dentro de aspas simples não há escape. A aspa do texto fecha o trecho, vem uma aspa escapada (`\\\'`), e um novo trecho se abre.',
    },
    {
      id: 'backend-junior-t2-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece no terminal com `curl http://localhost:8086/produtos?pagina=2&tamanho=10`, sem aspas?',
      opcoes: [
        'O `&` manda o curl para segundo plano, só com `pagina=2`, e `tamanho=10` vira outro comando',
        'Funciona normalmente',
        'O curl recusa a URL',
        'O terminal pede confirmação',
      ],
      resposta: 0,
      explicacao: 'O `&` é especial no terminal. Com a URL entre aspas, ele vira só um caractere da query string.',
    },
    {
      id: 'backend-junior-t2-e05-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'No Windows PowerShell 5.1, `curl -i http://localhost:8086/produtos` dá um erro estranho de parâmetro. Por quê?',
      opcoes: [
        'Lá, `curl` é um apelido do `Invoke-WebRequest`; o curl de verdade se chama `curl.exe`',
        'O Windows não tem curl',
        'O PowerShell não acessa `localhost`',
        'A opção `-i` não existe',
      ],
      resposta: 0,
      explicacao: 'O apelido foi removido no PowerShell 7, mas o Windows PowerShell 5.1, que vem com o sistema, ainda o tem.',
    },
    {
      id: 'backend-junior-t2-e05-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a relação entre OpenAPI e Swagger hoje?',
      opcoes: [
        'OpenAPI é a especificação do formato; Swagger é um conjunto de ferramentas que trabalha com ela',
        'São concorrentes incompatíveis',
        'Swagger é a versão nova da OpenAPI',
        'OpenAPI é só para APIs públicas',
      ],
      resposta: 0,
      explicacao: 'O formato se chamava Especificação Swagger até ser doado à OpenAPI Initiative. O Swagger UI e o Swagger Editor continuam com o nome antigo.',
    },
    {
      id: 'backend-junior-t2-e05-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Com o springdoc no Spring Boot, onde ficam, por padrão, o documento OpenAPI em JSON e a página para testar a API?',
      opcoes: [
        '`/v3/api-docs` e `/swagger-ui/index.html`',
        '`/openapi.json` e `/docs`',
        '`/api` e `/teste`',
        'Num arquivo em `target/`, sem endereço',
      ],
      resposta: 0,
      explicacao: 'Há também `/v3/api-docs.yaml`. Os caminhos podem ser trocados com as propriedades `springdoc.api-docs.path` e `springdoc.swagger-ui.path`.',
    },
    {
      id: 'backend-junior-t2-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O controller devolve `ResponseEntity.created(uri).body(p)`, mas o documento gerado pelo springdoc diz que o `POST` responde `200`. Por quê, e como corrigir?',
      opcoes: [
        'O status é decidido em execução, e a ferramenta só lê as assinaturas; `@ApiResponse(responseCode = "201")` documenta o certo',
        'É um defeito do Spring; a API responde mesmo `200`',
        'Porque o método não é `public`',
        'Porque falta o `@RequestBody`',
      ],
      resposta: 0,
      explicacao: 'O tipo `ResponseEntity<Produto>` não diz qual status será usado. O curl mostrou que a resposta real é `201`; a documentação precisa da anotação.',
    },
    {
      id: 'backend-junior-t2-e05-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são vantagens de escrever o contrato OpenAPI **antes** do código? Escolha duas.',
      opcoes: [
        'O contrato pode ser revisado com quem vai consumir a API antes de qualquer implementação',
        'O frontend pode trabalhar contra um servidor simulado gerado do contrato',
        'O documento nunca mais precisa ser atualizado',
        'Não é preciso escrever o código do servidor',
        'É sempre mais rápido para um time pequeno',
      ],
      respostas: [0, 1],
      explicacao: 'Geradores criam interfaces e modelos, mas a lógica continua sendo escrita à mão, e o contrato evolui junto com a API.',
    },
    {
      id: 'backend-junior-t2-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num documento OpenAPI, para que servem os `components/schemas` e o `$ref`?',
      opcoes: [
        'Para definir o formato de um objeto uma vez só e referenciá-lo em várias operações',
        'Para listar os servidores da API',
        'Para guardar exemplos de requisições',
        'Para definir os usuários com acesso',
      ],
      resposta: 0,
      explicacao: 'O `Produto` aparece na listagem, na busca e na criação, mas é definido num lugar: `$ref: "#/components/schemas/Produto"`.',
    },
    {
      id: 'backend-junior-t2-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.math.BigDecimal;

public class Teste {
    static boolean temCasas(String n) {
        return new BigDecimal(n).stripTrailingZeros().scale() > 0;
    }

    public static void main(String[] args) {
        System.out.println(temCasas("3.0") + " " + temCasas("2.5") + " " + new BigDecimal("1.0").equals(new BigDecimal("1")));
    }
}`,
      opcoes: ['`false true false`', '`true true false`', '`false true true`', '`false false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`3.0` sem os zeros finais é `3`, de escala 0. E o `equals` do `BigDecimal` compara também a escala: `1.0` e `1` são diferentes para ele, iguais para o `compareTo`.',
    },
  ],
};

export default episodio;
