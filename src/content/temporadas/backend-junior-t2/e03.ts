import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t2-e03',
  minutos: 17,
  aula,
  armadilhas: [
    'JSON exige aspas duplas, não aceita vírgula sobrando nem comentários.',
    'Inteiros acima de 2⁵³ perdem precisão no JavaScript: envie ids grandes como texto.',
    'Dinheiro em `double` acumula erros como `0.1 + 0.2 = 0.30000000000000004`; use `BigDecimal`.',
    '`readValue(json, List.class)` devolve uma lista de `LinkedHashMap`, não dos seus objetos: use `TypeReference`.',
    'No Jackson 2, campo desconhecido falha e `int` ausente vira 0; no Jackson 3, é o contrário.',
    'Criar um `ObjectMapper` por requisição desperdiça tempo: ele é seguro entre threads e deve ser reaproveitado.',
    'Converter o JSON da requisição direto na entidade deixa o cliente preencher campos que não devia, como `administrador`.',
  ],
  recursos: [
    {
      titulo: 'RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format',
      url: 'https://www.rfc-editor.org/rfc/rfc8259.html',
      tipo: 'documentacao',
      porque: 'A especificação do formato, curta, com a seção sobre a precisão dos números.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'MDN: Trabalhando com JSON',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/JSON',
      tipo: 'documentacao',
      porque: 'A sintaxe e os erros mais comuns, do ponto de vista de quem consome a API, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'MDN: Number.MAX_SAFE_INTEGER',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER',
      tipo: 'documentacao',
      porque: 'Por que o JavaScript só garante inteiros exatos até 2⁵³ − 1.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Jackson Databind (GitHub)',
      url: 'https://github.com/FasterXML/jackson-databind',
      tipo: 'documentacao',
      porque: 'O README oficial, com o uso do `ObjectMapper`, anotações e configurações.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jackson 3 Migration Guide',
      url: 'https://github.com/FasterXML/jackson/blob/main/jackson3/MIGRATING_TO_JACKSON_3.md',
      tipo: 'documentacao',
      porque: 'Todas as mudanças da versão 3: pacotes, exceções, padrões alterados e módulos embutidos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jackson Annotations (GitHub)',
      url: 'https://github.com/FasterXML/jackson-annotations',
      tipo: 'documentacao',
      porque: 'A lista das anotações, com exemplos de cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: Class.getRecordComponents',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Class.html#getRecordComponents()',
      tipo: 'documentacao',
      porque: 'A reflexão sobre `record`s usada pelo serializador do exemplo e pelo próprio Jackson.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OWASP: Mass Assignment Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html',
      tipo: 'artigo',
      porque: 'O ataque de preencher campos que o cliente não devia, e como os DTOs o evitam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'json.org: Introdução ao JSON',
      url: 'https://www.json.org/json-pt.html',
      tipo: 'documentacao',
      porque: 'Os diagramas da gramática do JSON, que guiam o leitor do desafio, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Código Fonte TV: JSON, Dicionário do Programador',
      url: 'https://www.youtube.com/watch?v=P81dE-tkaaA',
      tipo: 'video',
      porque: 'O que é JSON e por que ele substituiu o XML nas APIs, em sete minutos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Hora de Codar: Aprenda JSON em 20 minutos',
      url: 'https://www.youtube.com/watch?v=BWPUSXzSWA8',
      tipo: 'video',
      porque: 'A sintaxe completa, com exemplos de cada tipo de valor, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Jaime Junior: Introdução ao Jackson ObjectMapper',
      url: 'https://www.youtube.com/watch?v=uLQjstl6OmA',
      tipo: 'video',
      porque: 'O `ObjectMapper` na prática, com testes em JUnit 5, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'CoderFromScratch: Parsing JSON in Java, Part 1',
      url: 'https://www.youtube.com/watch?v=Hv_a3ZBSO_g',
      tipo: 'video',
      porque: 'Jackson com objetos simples, árvore de nós e configurações, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Leitor de JSON',
    enunciado:
      'Escreva um analisador de JSON por descida recursiva, sem bibliotecas: objetos viram `LinkedHashMap`, listas viram `ArrayList`, textos viram `String` (tratando os escapes `\\"`, `\\\\`, `\\n`, `\\t` e `\\uXXXX`), números viram `BigDecimal`, e `true`, `false` e `null` viram os valores Java. Ao achar algo inesperado, lance `IllegalArgumentException` dizendo o que era esperado e em que posição. Escreva também um método `caminho(raiz, "itens[0].sku")` que navega pelo resultado. A saída deve ser:\n\n```text\ncliente = Ana "Mel" (String)\nitens[0].sku = TEC-1 (String)\nitens[1].quantidade = 1 (BigDecimal)\ntotal = 150.00 (BigDecimal)\npago = true (Boolean)\ncupom = null\n{"sku": "X",} -> esperava aspas abrindo um nome na posição 12\n[1, 2 -> esperava \',\' ou \']\' na posição 5\n{"a" 1} -> esperava \':\' na posição 5\n```',
    dicas: [
      'Um método por regra da gramática: `valor()`, `objeto()`, `lista()`, `texto()` e `numero()`, todos avançando a mesma posição `pos`.',
      'O `valor()` decide pelo primeiro caractere: `{`, `[`, aspas, `t`, `f`, `n` ou o começo de um número.',
      'Objeto e lista têm a mesma forma: abre, verifica se fecha logo, e depois lê itens separados por vírgula com um `do { } while (consumir(\',\'))`.',
      'Para o caminho, divida a expressão com `split("[.\\\\[\\\\]]+")` e use `get(int)` nas partes numéricas e `get(String)` nas outras.',
    ],
    solucao: `import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class LeitorJson {
    private final String texto;
    private int pos;

    LeitorJson(String texto) {
        this.texto = texto;
    }

    static Object ler(String texto) {
        LeitorJson leitor = new LeitorJson(texto);
        Object valor = leitor.valor();
        leitor.espacos();
        if (leitor.pos != texto.length()) throw leitor.erro("fim do texto");
        return valor;
    }

    Object valor() {
        espacos();
        if (pos >= texto.length()) throw erro("um valor");
        char c = texto.charAt(pos);
        if (c == '{') return objeto();
        if (c == '[') return lista();
        if (c == '"') return texto();
        if (texto.startsWith("true", pos)) { pos += 4; return true; }
        if (texto.startsWith("false", pos)) { pos += 5; return false; }
        if (texto.startsWith("null", pos)) { pos += 4; return null; }
        return numero();
    }

    Map<String, Object> objeto() {
        Map<String, Object> mapa = new LinkedHashMap<>();
        pos++;
        espacos();
        if (consumir('}')) return mapa;
        do {
            espacos();
            if (pos >= texto.length() || texto.charAt(pos) != '"') throw erro("aspas abrindo um nome");
            String nome = texto();
            espacos();
            if (!consumir(':')) throw erro("':'");
            mapa.put(nome, valor());
            espacos();
        } while (consumir(','));
        if (!consumir('}')) throw erro("',' ou '}'");
        return mapa;
    }

    List<Object> lista() {
        List<Object> lista = new ArrayList<>();
        pos++;
        espacos();
        if (consumir(']')) return lista;
        do {
            lista.add(valor());
            espacos();
        } while (consumir(','));
        if (!consumir(']')) throw erro("',' ou ']'");
        return lista;
    }

    String texto() {
        StringBuilder sb = new StringBuilder();
        pos++;
        while (pos < texto.length() && texto.charAt(pos) != '"') {
            char c = texto.charAt(pos++);
            if (c != '\\\\') {
                sb.append(c);
                continue;
            }
            char e = texto.charAt(pos++);
            switch (e) {
                case 'n' -> sb.append('\\n');
                case 't' -> sb.append('\\t');
                case 'u' -> {
                    sb.append((char) Integer.parseInt(texto.substring(pos, pos + 4), 16));
                    pos += 4;
                }
                default -> sb.append(e);
            }
        }
        if (!consumir('"')) throw erro("aspas fechando o texto");
        return sb.toString();
    }

    BigDecimal numero() {
        int inicio = pos;
        while (pos < texto.length() && "+-0123456789.eE".indexOf(texto.charAt(pos)) >= 0) pos++;
        if (inicio == pos) throw erro("um valor");
        return new BigDecimal(texto.substring(inicio, pos));
    }

    void espacos() {
        while (pos < texto.length() && Character.isWhitespace(texto.charAt(pos))) pos++;
    }

    boolean consumir(char c) {
        if (pos < texto.length() && texto.charAt(pos) == c) {
            pos++;
            return true;
        }
        return false;
    }

    IllegalArgumentException erro(String esperado) {
        return new IllegalArgumentException("esperava " + esperado + " na posição " + pos);
    }

    static Object caminho(Object raiz, String expressao) {
        Object atual = raiz;
        for (String parte : expressao.split("[.\\\\[\\\\]]+")) {
            atual = parte.matches("\\\\d+") ? ((List<?>) atual).get(Integer.parseInt(parte)) : ((Map<?, ?>) atual).get(parte);
        }
        return atual;
    }

    public static void main(String[] args) {
        Object pedido = ler("""
                {"id": 42, "cliente": "Ana \\\\"Mel\\\\"",
                 "itens": [{"sku": "TEC-1", "quantidade": 2}, {"sku": "MOU-2", "quantidade": 1}],
                 "total": 150.00, "pago": true, "cupom": null}
                """);
        for (String c : List.of("cliente", "itens[0].sku", "itens[1].quantidade", "total", "pago", "cupom")) {
            Object v = caminho(pedido, c);
            System.out.println(c + " = " + v + (v == null ? "" : " (" + v.getClass().getSimpleName() + ")"));
        }
        for (String ruim : List.of("{\\"sku\\": \\"X\\",}", "[1, 2", "{\\"a\\" 1}")) {
            try {
                ler(ruim);
            } catch (IllegalArgumentException e) {
                System.out.println(ruim + " -> " + e.getMessage());
            }
        }
    }
}`,
    saida: 'cliente = Ana "Mel" (String)\nitens[0].sku = TEC-1 (String)\nitens[1].quantidade = 1 (BigDecimal)\ntotal = 150.00 (BigDecimal)\npago = true (Boolean)\ncupom = null\n{"sku": "X",} -> esperava aspas abrindo um nome na posição 12\n[1, 2 -> esperava \',\' ou \']\' na posição 5\n{"a" 1} -> esperava \':\' na posição 5',
    comentarios:
      'A descida recursiva segue a gramática ao pé da letra: um objeto contém valores, que podem ser objetos, e a pilha de chamadas do Java faz o papel da pilha de aninhamento. Ler números como `BigDecimal` preserva o `150.00` exatamente, o que um `double` não faria. Faltam a um analisador de produção a validação estrita dos números (zeros à esquerda, um ponto sem dígitos), o tratamento de pares substitutos no `\\u`, limites de profundidade e de tamanho, que impedem que um JSON com milhões de `[` aninhados estoure a pilha, e desempenho: o Jackson lê direto dos bytes, sem montar a `String` inteira antes.',
  },
  exercicios: [
    {
      id: 'backend-junior-t2-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual destes textos é um JSON válido?',
      opcoes: [
        '`{"nome": "Ana", "tags": []}`',
        "`{'nome': 'Ana'}`",
        '`{"nome": "Ana",}`',
        '`{"nome": "Ana" /* cliente */}`',
      ],
      resposta: 0,
      explicacao: 'JSON só aceita aspas duplas, não tem vírgula sobrando e não tem comentários.',
    },
    {
      id: 'backend-junior-t2-e03-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destes textos **não** são JSON válido? Escolha dois.',
      opcoes: ['`[1, 2,]`', '`{"preco": 007}`', '`{"a": null}`', '`[]`', '`"só um texto"`'],
      respostas: [0, 1],
      explicacao: 'Vírgula sobrando e zero à esquerda são proibidos. Um texto sozinho, sem objeto em volta, é JSON válido desde a RFC 7159.',
    },
    {
      id: 'backend-junior-t2-e03-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A API devolve `{"id": 9007199254740993}`, e o frontend em JavaScript mostra o pedido 9007199254740992. Qual é a correção mais segura?',
      opcoes: [
        'Enviar o id como texto: `{"id": "9007199254740993"}`',
        'Enviar o id como `double`',
        'Trocar o `long` por `int` no Java',
        'Pedir ao frontend que some 1',
      ],
      resposta: 0,
      explicacao: 'O JavaScript guarda números como `double`, exatos só até 2⁵³. Como texto, o id chega intacto; ids não são usados em contas mesmo.',
    },
    {
      id: 'backend-junior-t2-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.math.BigDecimal;

public class Teste {
    public static void main(String[] args) {
        boolean comDouble = 0.1 + 0.2 == 0.3;
        int comDecimal = new BigDecimal("0.1").add(new BigDecimal("0.2")).compareTo(new BigDecimal("0.3"));
        System.out.println(comDouble + " " + comDecimal);
    }
}`,
      opcoes: ['`false 0`', '`true 0`', '`false 1`', '`true 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '0,1 e 0,2 não têm representação exata em binário, e a soma em `double` dá 0.30000000000000004. Com `BigDecimal`, a conta é exata, e o `compareTo` devolve 0 para valores iguais.',
    },
    {
      id: 'backend-junior-t2-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o tipo dos elementos da lista devolvida por `mapper.readValue("[{\\"sku\\":\\"A\\"}]", List.class)`?',
      opcoes: ['`LinkedHashMap`', 'O `record Item` do projeto', '`String`', '`JsonNode`'],
      resposta: 0,
      explicacao: 'Sem o tipo dos elementos, o Jackson usa a representação genérica de um objeto JSON, um mapa. Para receber `Item`, use `new TypeReference<List<Item>>() {}`.',
    },
    {
      id: 'backend-junior-t2-e03-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que a `TypeReference` é escrita como uma subclasse anônima, com `{}` no fim?',
      opcoes: [
        'Porque o tipo genérico de uma superclasse fica gravado no bytecode da subclasse, e o Jackson o lê por reflexão',
        'Porque a `TypeReference` é uma interface',
        'Para que o Jackson possa sobrescrever métodos dela',
        'É só uma convenção, sem efeito',
      ],
      resposta: 0,
      explicacao: 'O apagamento de tipos remove os genéricos dos objetos, mas não das declarações. `getGenericSuperclass()` na subclasse anônima devolve `TypeReference<List<Item>>` completo.',
    },
    {
      id: 'backend-junior-t2-e03-q07',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `@JsonInclude(JsonInclude.Include.NON_NULL)` numa classe faz ao gerar o JSON?',
      opcoes: [
        'Omite os campos cujo valor é `null`',
        'Escreve `null` em todos os campos vazios',
        'Lança exceção se algum campo for `null`',
        'Troca `null` por texto vazio',
      ],
      resposta: 0,
      explicacao: 'Assim, `{"total": 99.90, "cupom": null}` vira `{"total": 99.90}`. Para o cliente, a ausência do campo e o `null` costumam ter o mesmo significado.',
    },
    {
      id: 'backend-junior-t2-e03-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Numa árvore de `JsonNode` sem o campo `cupom`, qual é a diferença entre `raiz.get("cupom")` e `raiz.path("cupom")`?',
      opcoes: [
        '`get` devolve `null`; `path` devolve um nó ausente, que pode ser encadeado sem `NullPointerException`',
        'Os dois devolvem `null`',
        'Os dois lançam exceção',
        '`path` cria o campo com valor `null`',
      ],
      resposta: 0,
      explicacao: '`raiz.path("cupom").path("codigo").asString()` funciona mesmo sem o campo, e `isMissingNode()` diz que ele não existia.',
    },
    {
      id: 'backend-junior-t2-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Com `new ObjectMapper()`, sem configuração, o JSON `{"sku":"X","quantidade":1,"cor":"preto"}` é lido para `record Item(String sku, int quantidade)`. O que acontece no Jackson 2.21 e no 3.1?',
      opcoes: [
        'No 2, `UnrecognizedPropertyException`; no 3, o campo `cor` é ignorado',
        'Os dois ignoram o campo',
        'Os dois lançam exceção',
        'No 2, o campo é ignorado; no 3, exceção',
      ],
      resposta: 0,
      explicacao: 'O Jackson 3 mudou o padrão de `FAIL_ON_UNKNOWN_PROPERTIES` para desligado, o comportamento de leitor tolerante.',
    },
    {
      id: 'backend-junior-t2-e03-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Com `new ObjectMapper()`, o JSON `{"sku":"X"}` é lido para `record Item(String sku, int quantidade)`. O que acontece no Jackson 2.21 e no 3.1?',
      opcoes: [
        'No 2, `quantidade` vira 0; no 3, `MismatchedInputException`',
        'Os dois deixam `quantidade` como 0',
        'Os dois lançam exceção',
        'No 2, exceção; no 3, `quantidade` vira 0',
      ],
      resposta: 0,
      explicacao: 'O Jackson 3 ligou `FAIL_ON_NULL_FOR_PRIMITIVES` por padrão. Um zero silencioso numa quantidade costuma ser um defeito, não um valor desejado.',
    },
    {
      id: 'backend-junior-t2-e03-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a forma recomendada de usar o `ObjectMapper` numa aplicação?',
      opcoes: [
        'Criar uma instância configurada e reaproveitá-la, inclusive entre threads',
        'Criar um novo a cada conversão',
        'Criar um por thread, porque ele não é seguro entre threads',
        'Usar `synchronized` em toda chamada',
      ],
      resposta: 0,
      explicacao: 'Depois de configurado, o mapper é seguro para uso concorrente, e criá-lo é caro porque ele monta e guarda os serializadores de cada classe.',
    },
    {
      id: 'backend-junior-t2-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O endpoint `PUT /clientes/7` converte o JSON recebido direto na entidade `Cliente`, que tem o campo `administrador`. Qual é o risco, e a correção?',
      opcoes: [
        'Qualquer cliente pode enviar `"administrador": true`; receba um DTO só com os campos permitidos',
        'Nenhum risco, o Jackson ignora campos booleanos',
        'O risco é de desempenho; use `JsonNode`',
        'O risco é o JSON ficar grande demais',
      ],
      resposta: 0,
      explicacao: 'É o ataque de *mass assignment*. Um `record` de entrada com `nome` e `email` não tem como receber o `administrador`.',
    },
    {
      id: 'backend-junior-t2-e03-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.reflect.RecordComponent;
import java.math.BigDecimal;
import java.util.StringJoiner;

public class Teste {
    record Produto(String nome, BigDecimal preco, boolean ativo) {}

    public static void main(String[] args) {
        StringJoiner sj = new StringJoiner(",");
        for (RecordComponent c : Produto.class.getRecordComponents()) {
            sj.add(c.getName() + ":" + c.getType().getSimpleName());
        }
        System.out.println(sj);
    }
}`,
      opcoes: [
        '`nome:String,preco:BigDecimal,ativo:boolean`',
        '`ativo:boolean,nome:String,preco:BigDecimal`',
        '`nome,preco,ativo`',
        '`nome:String,preco:BigDecimal,ativo:Boolean`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os componentes vêm na ordem da declaração, e é por isso que o JSON de um `record` segue essa ordem. O tipo de `ativo` é o primitivo `boolean`.',
    },
    {
      id: 'backend-junior-t2-e03-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Num projeto com Jackson 2 e o módulo `jackson-datatype-jsr310` registrado, sem outras configurações, como sai `LocalDateTime.of(2025, 9, 16, 14, 30)`?',
      opcoes: ['`[2025,9,16,14,30]`', '`"2025-09-16T14:30:00"`', '`1758043800000`', '`"16/09/2025 14:30"`'],
      resposta: 0,
      explicacao: 'No Jackson 2, `WRITE_DATES_AS_TIMESTAMPS` vem ligado, e datas locais viram listas de números. Desligando a opção, ou no Jackson 3, sai o texto ISO 8601.',
    },
    {
      id: 'backend-junior-t2-e03-q15',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Ao ler um JSON para `Map<String, Object>`, o Jackson transforma números decimais em `Double`. O programa compara isso com um `BigDecimal`. Digite a saída exata.',
      codigo: `import java.math.BigDecimal;

public class Teste {
    public static void main(String[] args) {
        System.out.println(new BigDecimal("150.00") + " " + Double.parseDouble("150.00"));
    }
}`,
      resposta: '150.00 150.0',
      explicacao: 'O `double` não guarda a escala, só o valor. Para dinheiro, declare o campo como `BigDecimal` numa classe ou `record`, e o Jackson preserva o `150.00`.',
    },
  ],
};

export default episodio;
