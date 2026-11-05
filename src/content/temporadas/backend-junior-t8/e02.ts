import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t8-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'Sem a versão no pedido, o modelo responde para a versão mais comum nos textos de treino, não para a sua.',
    '"Melhore este código" sem dizer o que é melhor dá uma reescrita que você não pediu.',
    'Sem restrições, a correção mais curta muitas vezes desliga a verificação: `@Disabled`, `catch` vazio, validação desligada.',
    'Uma instrução de segurança que não está no pedido não vai aparecer na resposta.',
    'A resposta segue o formato pedido quase sempre; um programa que a lê precisa validá-la como entrada não confiável.',
    'Pedir o código de uma tarefa grande de uma vez esconde uma premissa errada em centenas de linhas; peça o plano antes.',
    '"Aja como um especialista" não substitui o contexto e os critérios que o especialista teria.',
  ],
  ia: {
    uso:
      'Este episódio é sobre a própria IA, então o melhor uso dela aqui é como revisora dos seus pedidos. Antes de mandar uma tarefa importante, peça que ela aponte o que falta para responder sem adivinhar. Com o tempo, você passa a escrever as cinco partes sem pensar.',
    pedido:
      'Antes de executar a tarefa abaixo, revise o meu pedido.\n<cole aqui o pedido que você ia mandar>\n- Liste as informações que faltam para você responder sem adivinhar, como versões, código e mensagens de erro.\n- Aponte restrições de segurança e de manutenção que eu deveria acrescentar.\n- Sugira um formato de resposta que eu consiga conferir rápido e como eu provo que a solução funciona.\n- Não execute a tarefa ainda.',
    erros: [
      'Executa a tarefa em vez de só revisar o pedido.',
      'Sugere acrescentar "aja como especialista" no lugar de contexto concreto.',
      'Não pergunta pela versão das bibliotecas, mesmo quando a resposta depende dela.',
      'Propõe restrições genéricas ("siga boas práticas") em vez de concretas.',
    ],
    conferir: [
      'Confira se o pedido revisado tem as cinco partes da aula.',
      'Mande o pedido revisado e o original e compare as respostas.',
      'Rode os testes pedidos na parte de verificação antes de aceitar o código.',
    ],
  },
  recursos: [
    {
      titulo: 'Anthropic: Prompt engineering overview',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
      tipo: 'documentacao',
      porque: 'As técnicas de pedido do fornecedor de um modelo, com exemplos de antes e depois.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Anthropic: Use examples (multishot prompting)',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting',
      tipo: 'documentacao',
      porque: 'Como e quantos exemplos usar para ensinar um formato.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OpenAI: Prompt engineering',
      url: 'https://platform.openai.com/docs/guides/prompt-engineering',
      tipo: 'documentacao',
      porque: 'O guia de outro fornecedor: as mesmas ideias com outros nomes, o que mostra o que é geral.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'GitHub Docs: Prompt engineering for GitHub Copilot Chat',
      url: 'https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/prompt-engineering-for-copilot-chat',
      tipo: 'documentacao',
      porque: 'Os conselhos aplicados a um assistente de código dentro da IDE.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'GitHub Docs: Adding repository custom instructions',
      url: 'https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot',
      tipo: 'documentacao',
      porque: 'O arquivo de instruções do projeto, para não repetir versões e padrões a cada pedido.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Stack Overflow: How do I ask a good question?',
      url: 'https://stackoverflow.com/help/how-to-ask',
      tipo: 'artigo',
      porque: 'As regras de uma boa pergunta técnica, que valem quase iguais para a IA.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Stack Overflow: How to create a Minimal, Reproducible Example',
      url: 'https://stackoverflow.com/help/minimal-reproducible-example',
      tipo: 'artigo',
      porque: 'Como recortar o código que reproduz o problema, o melhor contexto possível.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Brown et al.: Language Models are Few-Shot Learners',
      url: 'https://arxiv.org/abs/2005.14165',
      tipo: 'artigo',
      porque: 'O artigo que mostrou que exemplos no próprio pedido ensinam tarefas novas ao modelo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Andrej Karpathy: Intro to Large Language Models',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
      tipo: 'video',
      porque: 'Por que o pedido é "o começo de um documento" que o modelo continua.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'AI Engineering (Chip Huyen)',
      url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
      tipo: 'livro',
      porque: 'O livro sobre construir sistemas com modelos de linguagem, do pedido à avaliação.',
      onde: 'Capítulo 5, "Prompt Engineering"',
      gratuito: false,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Validar e pedir de novo',
    enunciado:
      'Um sistema pede ao modelo uma lista no formato `SKU;quantidade`, uma por linha. Escreva `validar(String)`, que devolve o primeiro erro encontrado (`formato: <linha>` ou `quantidade: <linha>`) ou nenhum, e um laço que tenta até 3 respostas, na ordem da lista abaixo, parando na primeira válida. Imprima exatamente:\n\n```text\ntentativa 1: inválida (formato: Claro! Segue a lista:)\ntentativa 2: inválida (quantidade: FONE;0)\ntentativa 3: válida [CANECA x3, FONE x1]\n```\n\nAs respostas simuladas do modelo são: `"Claro! Segue a lista:\\nCANECA;3"`, `"CANECA;3\\nFONE;0"` e `"CANECA;3\\nFONE;1"`.',
    dicas: [
      'Um `Optional<String>` representa bem "o primeiro erro, se houver".',
      '`linha.matches("[A-Z0-9-]+;[0-9]+")` confere o formato inteiro de uma vez.',
      'Use `lines()` para quebrar a resposta, que também lida com `\\r\\n`.',
    ],
    solucao: `import java.util.List;
import java.util.Optional;

public class Tentativas {
    static Optional<String> validar(String resposta) {
        for (String linha : resposta.lines().toList()) {
            if (!linha.matches("[A-Z0-9-]+;[0-9]+")) return Optional.of("formato: " + linha);
            if (Integer.parseInt(linha.split(";")[1]) <= 0) return Optional.of("quantidade: " + linha);
        }
        return Optional.empty();
    }

    static List<String> itens(String resposta) {
        return resposta.lines().map(l -> l.split(";")).map(p -> p[0] + " x" + p[1]).toList();
    }

    public static void main(String[] args) {
        List<String> respostas = List.of("Claro! Segue a lista:\\nCANECA;3", "CANECA;3\\nFONE;0", "CANECA;3\\nFONE;1");
        for (int i = 0; i < 3; i++) {
            String r = respostas.get(i);
            Optional<String> erro = validar(r);
            if (erro.isEmpty()) {
                System.out.println("tentativa " + (i + 1) + ": válida " + itens(r));
                break;
            }
            System.out.println("tentativa " + (i + 1) + ": inválida (" + erro.get() + ")");
        }
    }
}`,
    saida: 'tentativa 1: inválida (formato: Claro! Segue a lista:)\ntentativa 2: inválida (quantidade: FONE;0)\ntentativa 3: válida [CANECA x3, FONE x1]',
    comentarios:
      'Num sistema real, cada nova tentativa manda junto o erro da anterior ("a linha FONE;0 tem quantidade inválida"), o que aumenta a chance de acerto. E o limite de tentativas é obrigatório: sem ele, um modelo que erra sempre vira um laço infinito e uma fatura alta. Depois do limite, a entrada vai para revisão humana.',
  },
  bugs: [
    {
      id: 'backend-junior-t8-e02-b01',
      dificuldade: 1,
      sintoma: 'Os pedidos montados pelo sistema saem sem o critério de verificação: a última linha repete o formato, `Como conferir: um arquivo`.',
      codigo: `public class Montar {
    record PedidoIA(String tarefa, String formato, String verificacao) {
        String texto() {
            return "Tarefa: " + tarefa + "\\nFormato: " + formato + "\\nComo conferir: " + formato;
        }
    }

    public static void main(String[] args) {
        System.out.println(new PedidoIA("teste de cancelar()", "um arquivo", "transição proibida dá 409").texto());
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: 'Tarefa: teste de cancelar()\nFormato: um arquivo\nComo conferir: um arquivo' },
      correcao: `public class Montar {
    record PedidoIA(String tarefa, String formato, String verificacao) {
        String texto() {
            return "Tarefa: " + tarefa + "\\nFormato: " + formato + "\\nComo conferir: " + verificacao;
        }
    }

    public static void main(String[] args) {
        System.out.println(new PedidoIA("teste de cancelar()", "um arquivo", "transição proibida dá 409").texto());
    }
}`,
      saidaCorrigida: 'Tarefa: teste de cancelar()\nFormato: um arquivo\nComo conferir: transição proibida dá 409',
      dica: 'Qual componente do record aparece duas vezes no texto, e qual não aparece nenhuma?',
      explicacao:
        'O campo `verificacao` existe, mas nunca é usado, e o compilador não avisa sobre componentes de record sem uso. Um teste do texto montado, conferindo cada parte, pegaria a troca.',
    },
    {
      id: 'backend-junior-t8-e02-b02',
      dificuldade: 2,
      sintoma: 'Um pedido montado a partir da resposta do modelo foi gravado com um item de quantidade zero. O log da validação diz `itens aceitos: 2`.',
      codigo: `public class Quantidade {
    public static void main(String[] args) {
        String[] linhas = {"CANECA;3", "FONE;0"};
        int aceitos = 0;
        for (String l : linhas) {
            int q = Integer.parseInt(l.split(";")[1]);
            if (q < 0) continue;
            aceitos++;
        }
        System.out.println("itens aceitos: " + aceitos);
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'itens aceitos: 2' },
      correcao: `public class Quantidade {
    public static void main(String[] args) {
        String[] linhas = {"CANECA;3", "FONE;0"};
        int aceitos = 0;
        for (String l : linhas) {
            int q = Integer.parseInt(l.split(";")[1]);
            if (q <= 0) continue;
            aceitos++;
        }
        System.out.println("itens aceitos: " + aceitos);
    }
}`,
      saidaCorrigida: 'itens aceitos: 1',
      dica: 'Zero é uma quantidade válida para um item de pedido?',
      explicacao:
        'A validação recusa negativos, mas deixa passar o zero, a fronteira. A resposta do modelo precisa passar pelas mesmas regras que a entrada de um usuário: no projeto da T7, `@Positive` no DTO e `check (quantidade > 0)` no banco.',
    },
    {
      id: 'backend-junior-t8-e02-b03',
      dificuldade: 3,
      sintoma: 'Em produção, toda resposta do modelo é recusada, embora pareça correta no log: `linhas válidas: 0`. Nos testes locais, passava.',
      codigo: `public class Linhas {
    public static void main(String[] args) {
        String doModelo = "CANECA;3\\r\\nFONE;1\\r\\n";
        int validas = 0;
        for (String linha : doModelo.split("\\n")) {
            if (linha.matches("[A-Z]+;[0-9]+")) validas++;
        }
        System.out.println("linhas válidas: " + validas);
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'linhas válidas: 0' },
      correcao: `public class Linhas {
    public static void main(String[] args) {
        String doModelo = "CANECA;3\\r\\nFONE;1\\r\\n";
        int validas = 0;
        for (String linha : doModelo.lines().toList()) {
            if (linha.matches("[A-Z]+;[0-9]+")) validas++;
        }
        System.out.println("linhas válidas: " + validas);
    }
}`,
      saidaCorrigida: 'linhas válidas: 2',
      dica: 'Depois do `split("\\n")`, o que sobra no fim de cada linha quando o texto veio com `\\r\\n`?',
      explicacao:
        'Quebrando só no `\\n`, cada linha termina com um `\\r` invisível, e o `matches` exige o texto inteiro no formato. `String.lines()` reconhece `\\n`, `\\r` e `\\r\\n`. O teste local usava só `\\n`; inclua as duas quebras nos casos de teste.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t8-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O pedido "Meu teste não funciona, me ajuda?" tem qual problema principal?',
      opcoes: [
        'Falta contexto: versões, o código do teste e a mensagem de erro',
        'Está em português',
        'É curto demais para o modelo entender a gramática',
        'Não começa com "aja como um especialista"',
      ],
      resposta: 0,
      explicacao: 'Sem o código e o erro, o modelo responde sobre o problema mais comum dos textos de treino, não sobre o seu. O idioma e o papel quase não importam.',
      dica: 'O que o modelo precisaria ver para saber qual é o seu problema?',
    },
    {
      id: 'backend-junior-t8-e02-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais frases são **restrições**, no sentido da aula? Escolha duas.',
      opcoes: [
        '"Não concatene valores no SQL; use parâmetros."',
        '"Não altere a assinatura dos métodos públicos."',
        '"O projeto usa Java 25 e Spring Boot 4.1."',
        '"Escreva os testes de unidade do método cancelar()."',
        '"Mostre só o diff."',
      ],
      respostas: [0, 1],
      explicacao: 'Restrições dizem o que a solução não pode fazer: segurança e escopo. As versões são contexto, "escreva os testes" é a tarefa, e "só o diff" é o formato.',
      dica: 'Restrições limitam a solução; as outras partes descrevem o problema ou a resposta.',
    },
    {
      id: 'backend-junior-t8-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O modelo escreveu a quantidade por extenso. Digite a saída exata.',
      codigo: `String linha = "CAFE-500G;dois";
String[] p = linha.split(";");
try {
    System.out.println(Integer.parseInt(p[1]));
} catch (NumberFormatException e) {
    System.out.println("inválida: " + p[1]);
}`,
      resposta: 'inválida: dois',
      explicacao: '`parseInt` só aceita dígitos (e um sinal). A resposta do modelo é texto livre até prova em contrário; a validação trata o caso em vez de deixar a exceção derrubar o processamento.',
      dica: '`Integer.parseInt("dois")` dá certo?',
    },
    {
      id: 'backend-junior-t8-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você vai pedir ao assistente uma mudança que mexe em 6 arquivos. Qual é a melhor primeira mensagem?',
      opcoes: [
        'Pedir o plano: os passos e os arquivos que ele mudaria, sem escrever código ainda',
        'Pedir o código dos 6 arquivos de uma vez, para ganhar tempo',
        'Mandar só o nome da funcionalidade e deixar ele decidir',
        'Pedir para ele não errar',
      ],
      resposta: 0,
      explicacao:
        'O plano é curto e revela uma premissa errada antes de ela virar centenas de linhas. Depois de aprovado, a mudança sai um passo por vez, com os testes rodando entre os passos.',
      dica: 'O que é mais rápido de corrigir: uma lista de passos ou 6 arquivos de código?',
    },
    {
      id: 'backend-junior-t8-e02-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete para conferir se o SKU inteiro está no formato combinado.',
      codigo: `String sku = "CAFE-500G";
System.out.println(sku.___("[A-Z0-9-]+"));`,
      respostas: ['matches'],
      saida: 'true',
      explicacao: '`matches` exige que o texto **inteiro** case com a expressão, e não só um trecho. É o que torna a validação de formato confiável.',
      dica: 'O método de `String` que testa uma expressão regular contra o texto todo.',
    },
    {
      id: 'backend-junior-t8-e02-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O modelo erra o formato em 2% das respostas, e o sistema faz 5.000 chamadas por dia. Quantos erros por dia sem nova tentativa, e com uma nova tentativa? Qual é a saída?',
      codigo: `double falha = 0.02;
long chamadas = 5_000;
System.out.println(Math.round(chamadas * falha) + " " + Math.round(chamadas * falha * falha));`,
      opcoes: ['`100 2`', '`100 50`', '`2 100`', '`100 0`', '`10 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        '5.000 × 0,02 = 100. Para falhar com a nova tentativa, as duas precisam errar: 0,02 × 0,02 = 0,0004, e 5.000 × 0,0004 = 2. A conta supõe tentativas independentes, o que melhora mandando o erro da primeira junto.',
      dica: 'Errar duas vezes seguidas tem probabilidade 0,02 vezes 0,02.',
    },
    {
      id: 'backend-junior-t8-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você pediu "corrija o teste que está falhando". A resposta acrescenta `@Disabled` ao teste. O que faltou no pedido?',
      opcoes: [
        'Uma restrição: "não desligue nem apague testes; a correção é no código ou na causa"',
        'Mais educação no pedido',
        'Pedir em inglês',
        'Nada: desligar o teste resolve o problema',
      ],
      resposta: 0,
      explicacao: 'Sem restrição, o caminho mais curto para "o teste não falha" é desligar o teste. A restrição fecha esse atalho e obriga a resposta a tratar a causa.',
      dica: 'Qual é a forma mais curta, e errada, de fazer um teste "parar de falhar"?',
    },
    {
      id: 'backend-junior-t8-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que dois exemplos de entrada e saída costumam ensinar um formato melhor do que um parágrafo descrevendo-o?',
      opcoes: [
        'Porque o modelo continua padrões: com exemplos, a continuação mais provável segue o mesmo formato',
        'Porque os modelos não leem parágrafos',
        'Porque exemplos gastam menos tokens que qualquer descrição',
        'Porque o modelo copia os exemplos na resposta',
      ],
      resposta: 0,
      explicacao:
        'Diante de dois pares no formato `"x" -> "y"`, o texto mais provável depois de um terceiro `"z" ->` é a saída no mesmo formato. A descrição exige que o modelo interprete; o exemplo só pede que ele continue.',
      dica: 'Lembre do que o modelo faz com o texto que recebe.',
    },
    {
      id: 'backend-junior-t8-e02-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Quantas linhas da resposta estão no formato? Digite a saída exata.',
      codigo: `String r = "CANECA;3\\nFONE;2\\nObrigado, qualquer coisa é só pedir!";
long validas = r.lines().filter(l -> l.matches("[A-Z]+;[0-9]+")).count();
System.out.println(validas + " de " + r.lines().count());`,
      resposta: '2 de 3',
      explicacao: 'A linha de cortesia no fim não casa com o formato. Ela é o motivo de validar linha por linha: o modelo segue o formato e, por hábito, acrescenta uma frase amigável.',
      dica: 'A terceira linha tem o formato `LETRAS;números`?',
    },
    {
      id: 'backend-junior-t8-e02-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Começar o pedido com "aja como um desenvolvedor sênior" melhora muito a resposta?',
      opcoes: [
        'Pouco: o que melhora é dar o contexto, os padrões e os critérios que um sênior teria',
        'Muito: o modelo passa a saber mais coisas',
        'Sim, é obrigatório para respostas técnicas',
        'Piora sempre a resposta',
      ],
      resposta: 0,
      explicacao: 'O papel não acrescenta informação sobre o seu projeto. Versões, código, padrões e critério de pronto acrescentam.',
      dica: 'O papel dá ao modelo alguma informação nova sobre o seu código?',
    },
    {
      id: 'backend-junior-t8-e02-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Para pedir ajuda com uma `LazyInitializationException`, quais itens mais ajudam a resposta? Escolha três.',
      opcoes: [
        'As versões do Spring Boot e do Hibernate',
        'O *stack trace* completo',
        'A entidade, o service e o controller envolvidos',
        'O projeto inteiro, com todos os arquivos',
        'A frase "é urgente"',
      ],
      respostas: [0, 1, 2],
      explicacao:
        'Versões, o erro inteiro e o código envolvido são o contexto que mais muda a resposta. O projeto inteiro dilui o que importa e gasta a janela; a urgência não muda a causa.',
      dica: 'O que um colega pediria para ver antes de ajudar?',
    },
    {
      id: 'backend-junior-t8-e02-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Complete para juntar as restrições, uma por linha.',
      codigo: `List<String> restricoes = List.of("Não use @SpringBootTest", "Não acrescente dependências");
System.out.println(String.___("\\n", restricoes));`,
      respostas: ['join'],
      saida: 'Não use @SpringBootTest\nNão acrescente dependências',
      explicacao: '`String.join` põe o separador entre os elementos, sem sobrar no fim. É um jeito simples de montar listas de restrições num pedido gerado por código.',
      dica: 'O método estático de `String` que junta elementos com um separador.',
    },
    {
      id: 'backend-junior-t8-e02-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que não compila.',
      codigo: `String contexto = "Java 25, Spring Boot 4.1";
String pedido = """Contexto: """ + contexto;
System.out.println(pedido);`,
      resposta: 2,
      explicacao:
        'Um bloco de texto precisa de uma quebra de linha logo depois das três aspas de abertura. Blocos de texto são ótimos para montar pedidos longos, mas o conteúdo começa na linha seguinte.',
      dica: 'O que precisa vir logo depois do `"""` de abertura?',
    },
    {
      id: 'backend-junior-t8-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O sistema pede ao modelo um JSON com `{"sku": ..., "quantidade": ...}` e grava o resultado direto no banco. Qual é o problema?',
      opcoes: [
        'A resposta é entrada não confiável: precisa passar por validação de formato e das regras de negócio antes de gravar',
        'Nenhum, se o pedido disse "responda só em JSON"',
        'JSON não pode ser gravado em banco relacional',
        'O modelo sempre devolve JSON válido',
      ],
      resposta: 0,
      explicacao:
        'Quase sempre não é sempre: campos faltando, quantidade zero, texto antes do JSON. Valide como validaria um formulário, e recuse ou tente de novo quando falhar.',
      dica: 'O que você faria com o mesmo JSON vindo de um formulário de usuário?',
    },
    {
      id: 'backend-junior-t8-e02-q15',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'Um exemplo de mensagem de commit montado por código. Digite a saída exata.',
      codigo: `String msg = "fix(%s): %s".formatted("frete", "corrige cálculo na fronteira");
System.out.println(msg);`,
      resposta: 'fix(frete): corrige cálculo na fronteira',
      explicacao: 'Os `%s` são trocados pelos argumentos, na ordem. Exemplos assim, no próprio pedido, ensinam o padrão melhor que uma descrição.',
      dica: 'O primeiro `%s` recebe o primeiro argumento.',
    },
  ],
};

export default episodio;
