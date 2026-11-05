import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t8-e01',
  minutos: 14,
  aula,
  armadilhas: [
    'O modelo não consulta a documentação: ele calcula o texto mais provável depois do seu contexto.',
    'Temperatura zero deixa a resposta repetível, não correta.',
    'Uma API que mudou depois do corte de treino continua "provável" para o modelo, como o `@MockBean` no Spring Boot 4.',
    'Instruções enterradas no meio de um contexto longo são as mais esquecidas.',
    'Português e nomes do seu domínio gastam mais tokens que inglês.',
    'O tom confiante e o código bem formatado não dizem nada sobre a correção da resposta.',
    'O modelo não aprende com a conversa: os parâmetros não mudam enquanto você usa.',
  ],
  ia: {
    uso:
      'Entender tokens, probabilidade e corte de conhecimento muda o jeito de usar qualquer assistente: você passa a mandar o contexto que ele não tem, a desconfiar de APIs recentes e a conferir o que parece plausível demais. O próprio assistente explica bem esses conceitos; use-o como tutor e teste-o contra a documentação.',
    pedido:
      'Explique, para um desenvolvedor Java júnior, como o modelo que está respondendo gera o texto desta resposta.\n- Use um exemplo de código Java para mostrar tokens, probabilidade do próximo token e temperatura.\n- Diga qual é o seu corte de conhecimento e dê dois exemplos de APIs do Java ou do Spring que você pode não conhecer.\n- Liste três sinais de que uma resposta sua sobre uma biblioteca pode ser alucinação.\n- Não invente números de parâmetros ou de vocabulário: se não souber, diga que não sabe.',
    erros: [
      'Afirma conhecer versões de bibliotecas lançadas depois do próprio corte de treino.',
      'Inventa métodos com nomes plausíveis, vindos de outras bibliotecas ou linguagens.',
      'Cita números exatos sobre a própria arquitetura que não foram publicados.',
      'Responde com a mesma confiança quando acerta e quando erra.',
    ],
    conferir: [
      'Compile todo método sugerido antes de confiar na explicação dele.',
      'Abra o Javadoc ou a documentação da versão que você usa, não a de qualquer versão.',
      'Pergunte de novo de outro jeito: respostas que mudam muito entre execuções pedem conferência redobrada.',
    ],
  },
  recursos: [
    {
      titulo: 'Andrej Karpathy: Let\'s build the GPT Tokenizer',
      url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
      tipo: 'video',
      porque: 'O BPE construído do zero, linha por linha, com os efeitos estranhos que os tokens causam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Andrej Karpathy: Intro to Large Language Models',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
      tipo: 'video',
      porque: 'Uma hora sobre o que é um modelo de linguagem, como é treinado e onde ele falha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: '3Blue1Brown: Transformers, the tech behind LLMs',
      url: 'https://www.youtube.com/watch?v=wjZofJX0v4M',
      tipo: 'video',
      porque: 'A melhor visualização de embeddings, atenção e da previsão do próximo token.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jay Alammar: The Illustrated Transformer',
      url: 'https://jalammar.github.io/illustrated-transformer/',
      tipo: 'artigo',
      porque: 'A arquitetura do Transformer explicada com desenhos, passo a passo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Vaswani et al.: Attention Is All You Need',
      url: 'https://arxiv.org/abs/1706.03762',
      tipo: 'artigo',
      porque: 'O artigo de 2017 que criou o Transformer, base de todos os modelos atuais.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Sennrich et al.: Neural Machine Translation of Rare Words with Subword Units',
      url: 'https://arxiv.org/abs/1508.07909',
      tipo: 'artigo',
      porque: 'O artigo que trouxe o BPE para o processamento de linguagem.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Anthropic: Glossary',
      url: 'https://docs.anthropic.com/en/docs/about-claude/glossary',
      tipo: 'documentacao',
      porque: 'Tokens, janela de contexto, temperatura e outros termos, com as definições usadas por um fornecedor de modelos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc: HttpClient.Builder',
      url: 'https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpClient.Builder.html',
      tipo: 'documentacao',
      porque: 'Para conferir o exemplo de alucinação da aula: os métodos que o builder tem de verdade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Speech and Language Processing (Jurafsky e Martin)',
      url: 'https://web.stanford.edu/~jurafsky/slp3/',
      tipo: 'livro',
      porque: 'O livro-texto de processamento de linguagem, gratuito, dos n-gramas aos Transformers.',
      onde: 'Capítulo 3, "N-gram Language Models", e capítulo 9, "The Transformer"',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Um modelo de bigramas',
    enunciado:
      'O ancestral dos modelos de linguagem é o modelo de **bigramas**: a probabilidade do próximo token depende só do anterior. Treine um com as frases `public static void main`, `public static void main`, `public static void run` e `private static int soma`: conte, para cada token, quantas vezes cada outro veio logo depois. Mostre as chances depois de `static` e de `void`, em porcentagem arredondada, e gere a continuação de `public` escolhendo sempre o mais provável, até não haver próximo. Imprima exatamente:\n\n```text\ndepois de "static": {int=25%, void=75%}\ndepois de "void": {main=67%, run=33%}\ngeração: public static void main\n```',
    dicas: [
      'Um `Map<String, Map<String, Integer>>` guarda as contagens; `computeIfAbsent` e `merge` deixam o código curto.',
      'Use `TreeMap` para as chaves saírem em ordem alfabética.',
      'A porcentagem é `Math.round(100.0 * contagem / total)`.',
    ],
    solucao: `import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Bigramas {
    static final Map<String, Map<String, Integer>> contagens = new TreeMap<>();

    static void treinar(String frase) {
        String[] t = frase.split(" ");
        for (int i = 0; i + 1 < t.length; i++) {
            contagens.computeIfAbsent(t[i], k -> new TreeMap<>()).merge(t[i + 1], 1, Integer::sum);
        }
    }

    static Map<String, String> chances(String token) {
        Map<String, Integer> proximos = contagens.get(token);
        int total = proximos.values().stream().mapToInt(Integer::intValue).sum();
        Map<String, String> r = new TreeMap<>();
        proximos.forEach((k, v) -> r.put(k, Math.round(100.0 * v / total) + "%"));
        return r;
    }

    static String gerar(String inicio) {
        StringBuilder texto = new StringBuilder(inicio);
        String atual = inicio;
        while (contagens.containsKey(atual)) {
            atual = contagens.get(atual).entrySet().stream()
                    .max(Map.Entry.comparingByValue()).get().getKey();
            texto.append(' ').append(atual);
        }
        return texto.toString();
    }

    public static void main(String[] args) {
        List.of("public static void main", "public static void main", "public static void run", "private static int soma")
                .forEach(Bigramas::treinar);
        System.out.println("depois de \\"static\\": " + chances("static"));
        System.out.println("depois de \\"void\\": " + chances("void"));
        System.out.println("geração: " + gerar("public"));
    }
}`,
    saida: 'depois de "static": {int=25%, void=75%}\ndepois de "void": {main=67%, run=33%}\ngeração: public static void main',
    comentarios:
      'Um modelo de bigramas só enxerga um token para trás, e um Transformer enxerga o contexto inteiro, com a atenção decidindo o que importa. A ideia de fundo é a mesma: contar o que costuma vir depois e escolher pelo provável. Repare que "main" não foi escolhido por ser certo, e sim por ter aparecido mais.',
  },
  bugs: [
    {
      id: 'backend-junior-t8-e01-b01',
      dificuldade: 1,
      sintoma: 'A sugestão do assistente não compila: `error: cannot find symbol`, apontando o método `capitalize()`.',
      codigo: `public class Nome {
    public static void main(String[] args) {
        String cliente = "ana lima";
        String titulo = cliente.capitalize();
        System.out.println(titulo);
    }
}`,
      linha: 4,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Nome {
    public static void main(String[] args) {
        String cliente = "ana lima";
        String titulo = Character.toUpperCase(cliente.charAt(0)) + cliente.substring(1);
        System.out.println(titulo);
    }
}`,
      saidaCorrigida: 'Ana lima',
      dica: 'O método existe na classe `String` do Java, ou em outra linguagem ou biblioteca?',
      explicacao:
        '`capitalize` existe no Kotlin, no Python e no Apache Commons (`StringUtils.capitalize`), mas não em `java.lang.String`. O modelo juntou um padrão comum a um tipo em que ele não existe: uma alucinação típica, que o compilador pega na hora.',
    },
    {
      id: 'backend-junior-t8-e01-b02',
      dificuldade: 2,
      sintoma: 'O painel de custos da integração com a IA mostra `custo diário: US$ 0.0`, mas a fatura do mês chegou com US$ 67,50.',
      codigo: `public class Custo {
    public static void main(String[] args) {
        long tokensPorDia = 750_000;
        double dolaresPorMilhao = 3.0;
        double custo = tokensPorDia / 1_000_000 * dolaresPorMilhao;
        System.out.println("custo diário: US$ " + custo);
    }
}`,
      linha: 5,
      efeito: { tipo: 'saida', saida: 'custo diário: US$ 0.0' },
      correcao: `public class Custo {
    public static void main(String[] args) {
        long tokensPorDia = 750_000;
        double dolaresPorMilhao = 3.0;
        double custo = tokensPorDia / 1_000_000.0 * dolaresPorMilhao;
        System.out.println("custo diário: US$ " + custo);
    }
}`,
      saidaCorrigida: 'custo diário: US$ 2.25',
      dica: 'Qual é o resultado de `750_000 / 1_000_000` quando os dois são inteiros?',
      explicacao:
        'A divisão entre `long`s acontece antes da multiplicação pelo `double` e dá 0. Com `1_000_000.0`, a conta vira decimal: 0,75 milhão de tokens a US$ 3 dá US$ 2,25 por dia, e US$ 67,50 em 30 dias.',
    },
    {
      id: 'backend-junior-t8-e01-b03',
      dificuldade: 3,
      sintoma: 'O classificador de chamados, que usa os escores de um modelo, mostra `0%` de confiança para todas as categorias quando os escores passam de 700.',
      codigo: `import java.util.Arrays;

public class Softmax {
    public static void main(String[] args) {
        double[] logits = {1000, 999, 998};
        double max = Arrays.stream(logits).max().getAsDouble();
        double[] e = Arrays.stream(logits).map(x -> Math.exp(x)).toArray();
        double soma = Arrays.stream(e).sum();
        System.out.println(Math.round(e[0] / soma * 100) + "%");
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: '0%' },
      correcao: `import java.util.Arrays;

public class Softmax {
    public static void main(String[] args) {
        double[] logits = {1000, 999, 998};
        double max = Arrays.stream(logits).max().getAsDouble();
        double[] e = Arrays.stream(logits).map(x -> Math.exp(x - max)).toArray();
        double soma = Arrays.stream(e).sum();
        System.out.println(Math.round(e[0] / soma * 100) + "%");
    }
}`,
      saidaCorrigida: '67%',
      dica: 'Quanto vale `Math.exp(1000)` num `double`? E infinito dividido por infinito?',
      explicacao:
        '`Math.exp` passa do maior `double` perto de 709 e vira `Infinity`; `Infinity / Infinity` é `NaN`, e `Math.round(NaN)` é 0. Subtrair o máximo antes não muda o resultado do softmax e mantém os expoentes em 0 ou abaixo. O `max` estava calculado, mas não era usado.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t8-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que um modelo de linguagem faz, a cada passo, ao gerar uma resposta?',
      opcoes: [
        'Calcula a probabilidade de cada próximo token possível, dado o texto até ali, e escolhe um',
        'Procura a resposta num banco de dados de perguntas e respostas',
        'Executa o código que você mandou e devolve o resultado',
        'Consulta a documentação oficial da biblioteca na internet',
      ],
      resposta: 0,
      explicacao:
        'O mecanismo de base é prever o próximo token, repetidamente. Alguns assistentes têm ferramentas extras, como busca ou execução de código, mas o texto em si sai dessa previsão.',
      dica: 'Pense no ciclo da figura da aula.',
    },
    {
      id: 'backend-junior-t8-e01-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Uma classe tem 12.000 caracteres. Com 3 a 4 caracteres por token, quantos tokens ela ocupa? Digite a saída exata.',
      codigo: `int caracteres = 12_000;
System.out.println(caracteres / 4 + " a " + caracteres / 3);`,
      resposta: '3000 a 4000',
      explicacao: 'Com 4 caracteres por token, 3.000; com 3, típico do português, 4.000. É a conta que diz quantos arquivos cabem num pedido.',
      dica: 'Faça as duas divisões; a concatenação vem depois.',
    },
    {
      id: 'backend-junior-t8-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece com as probabilidades quando a temperatura sobe de 0,5 para 2,0?',
      opcoes: [
        'Elas se espalham: o token mais provável perde chance, e os menos prováveis ganham',
        'O modelo passa a errar menos',
        'O modelo passa a responder mais rápido',
        'Elas se concentram ainda mais no token mais provável',
      ],
      resposta: 0,
      explicacao:
        'A temperatura divide os logits antes do softmax. Dividir por um número maior aproxima os valores, e as chances ficam parecidas. É o que a tabela da aula mostra: o primeiro token cai de 98% para 63%.',
      dica: 'Veja a linha `t=2.0` da saída da aula.',
    },
    {
      id: 'backend-junior-t8-e01-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais situações aumentam a chance de alucinação numa pergunta sobre código? Escolha duas.',
      opcoes: [
        'Perguntar sobre uma versão de biblioteca lançada depois do corte de treino do modelo',
        'Perguntar sobre uma biblioteca interna da empresa, sem mandar o código dela',
        'Mandar o trecho de código e a mensagem de erro completa',
        'Pedir a explicação de um conceito clássico, como `equals` e `hashCode`',
        'Mandar a documentação da versão que você usa no contexto',
      ],
      respostas: [0, 1],
      explicacao:
        'O modelo alucina quando precisa produzir algo que não viu: o que veio depois do treino ou o que nunca foi público. Dar o código, o erro e a documentação no contexto reduz exatamente esse risco; conceitos clássicos ele viu milhares de vezes.',
      dica: 'Em quais casos o modelo nunca viu a resposta?',
    },
    {
      id: 'backend-junior-t8-e01-q05',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'O softmax usa a exponencial. Complete com o método de `Math` que calcula e elevado a x.',
      codigo: `double e = Math.___(1.0);
System.out.println(e);`,
      respostas: ['exp'],
      saida: '2.718281828459045',
      explicacao: '`Math.exp(x)` é eˣ. No softmax, ela transforma logits, que podem ser negativos, em números positivos, que depois viram proporções.',
      dica: 'O nome é a abreviação de "exponencial".',
    },
    {
      id: 'backend-junior-t8-e01-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Três tokens com o mesmo logit. Qual é a saída?',
      codigo: `double[] logits = {2.0, 2.0, 2.0};
double[] e = Arrays.stream(logits).map(Math::exp).toArray();
double soma = Arrays.stream(e).sum();
System.out.println(Math.round(e[0] / soma * 100) + "%");`,
      opcoes: ['`33%`', '`100%`', '`2%`', '`67%`', '`0%`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Com logits iguais, as exponenciais são iguais, e cada token fica com um terço. Nesse caso, a temperatura não muda nada: dividir números iguais pelo mesmo valor mantém a igualdade.',
      dica: 'Se os três valores são iguais, que fração cada um tem da soma?',
    },
    {
      id: 'backend-junior-t8-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num projeto com Spring Boot 4, o assistente sugere `@MockBean` num teste. Qual é a explicação mais provável?',
      opcoes: [
        'O modelo viu milhares de exemplos com `@MockBean`, das versões anteriores, e ele continua sendo o token mais provável para esse contexto',
        'O `@MockBean` voltou no Spring Boot 4',
        'O modelo está com defeito',
        'O assistente leu o seu `pom.xml` e concluiu que a anotação existe',
      ],
      resposta: 0,
      explicacao:
        'A anotação foi removida no Spring Boot 4, mas os textos de treino são majoritariamente das versões antigas. Diga a versão no pedido e compile: o erro aparece na hora.',
      dica: 'De onde vêm as probabilidades do modelo?',
    },
    {
      id: 'backend-junior-t8-e01-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A atenção compara cada token com todos os outros. Quantas vezes mais comparações há num contexto de 2.000 tokens do que num de 1.000? Qual é a saída?',
      codigo: `long mil = 1_000L * 1_000;
long doisMil = 2_000L * 2_000;
System.out.println(doisMil / mil);`,
      opcoes: ['`4`', '`2`', '`8`', '`1`', '`1000`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O número de pares cresce com o quadrado do tamanho: dobrar o contexto quadruplica essa etapa. É por isso que contextos longos custam mais e têm limite.',
      dica: '(2n)² = 4n².',
    },
    {
      id: 'backend-junior-t8-e01-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'O primeiro passo do BPE conta os pares de vizinhos. Digite a saída exata.',
      codigo: `String[] t = {"a", "a", "a", "b"};
Map<String, Integer> pares = new TreeMap<>();
for (int i = 0; i + 1 < t.length; i++) {
    pares.merge(t[i] + "|" + t[i + 1], 1, Integer::sum);
}
System.out.println(pares);`,
      resposta: '{a|a=2, a|b=1}',
      explicacao: 'Os pares são `a|a` (posições 0 e 1), `a|a` (1 e 2) e `a|b` (2 e 3). O `merge` soma 1 a cada ocorrência, e o `TreeMap` imprime em ordem. O BPE fundiria `a|a` primeiro.',
      dica: 'Com 4 elementos, há 3 pares de vizinhos.',
    },
    {
      id: 'backend-junior-t8-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Com temperatura zero, o assistente dá sempre a mesma resposta para a mesma pergunta. O que isso garante?',
      opcoes: [
        'Que a resposta é repetível, mas não que está certa',
        'Que a resposta está certa',
        'Que o modelo consultou a documentação',
        'Que não há alucinação',
      ],
      resposta: 0,
      explicacao: 'Temperatura zero escolhe sempre o token mais provável. Se o mais provável for um método que não existe, ele vai aparecer todas as vezes.',
      dica: 'O token mais provável é sempre o correto?',
    },
    {
      id: 'backend-junior-t8-e01-q11',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'O assistente sugeriu um método que você não conhecia. Quais são formas confiáveis de conferir? Escolha duas.',
      opcoes: [
        'Compilar o código no seu projeto, com as versões que ele usa',
        'Abrir o Javadoc ou a documentação da versão que você usa',
        'Perguntar ao assistente se ele tem certeza',
        'Confiar se a explicação vier bem detalhada',
        'Conferir se o nome do método parece com os de outras bibliotecas',
      ],
      respostas: [0, 1],
      explicacao:
        'O compilador e a documentação são fontes independentes do modelo. Perguntar se ele tem certeza produz mais texto provável, muitas vezes uma confirmação; detalhe e nome plausível são exatamente o que uma alucinação tem.',
      dica: 'Quais opções não dependem do próprio modelo?',
    },
    {
      id: 'backend-junior-t8-e01-q12',
      tipo: 'lacuna',
      dificuldade: 3,
      enunciado: 'Uma janela de 200 mil tokens e classes de 4 mil tokens cada. Complete para calcular quantas classes cabem.',
      codigo: `int janela = 200_000, porClasse = 4_000;
int classes = janela ___ porClasse;
System.out.println(classes);`,
      respostas: ['/'],
      saida: '50',
      explicacao: '200.000 ÷ 4.000 = 50, sem contar o pedido e a resposta, que também ocupam a janela. Na prática, mande só os arquivos que importam para a pergunta.',
      dica: 'Quantas vezes 4.000 cabe em 200.000?',
    },
    {
      id: 'backend-junior-t8-e01-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'O assistente sugeriu este código para pôr um tempo limite no cliente HTTP. Clique na linha que não compila.',
      codigo: `import java.net.http.HttpClient;
import java.time.Duration;

public class Teste {
    public static void main(String[] args) {
        HttpClient cliente = HttpClient.newBuilder()
                .readTimeout(Duration.ofSeconds(5))
                .build();
        System.out.println(cliente.version());
    }
}`,
      resposta: 7,
      explicacao:
        'O `HttpClient.Builder` tem `connectTimeout`; o tempo limite da resposta se define em cada `HttpRequest`, com `.timeout(...)`. `readTimeout` existe em outros clientes, como o OkHttp, e por isso parece plausível.',
      dica: 'Confira os métodos do `HttpClient.Builder` no Javadoc.',
    },
    {
      id: 'backend-junior-t8-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você vai mandar 2.000 linhas de código e uma instrução importante: "não altere a interface pública". Onde a instrução tem mais chance de ser seguida?',
      opcoes: [
        'No começo ou no fim do pedido, fora do meio do código',
        'No meio do código, como comentário',
        'Tanto faz: o modelo lê tudo igualmente',
        'Só no nome do arquivo',
      ],
      resposta: 0,
      explicacao:
        'Os modelos prestam menos atenção ao meio de contextos longos. Instruções vão nas pontas, de preferência repetidas no fim, perto de onde a resposta começa.',
      dica: 'A aula fala de "esquecimento do meio".',
    },
    {
      id: 'backend-junior-t8-e01-q15',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'As probabilidades da figura somam quanto? Digite a saída exata.',
      codigo: `double[] p = {0.72, 0.09, 0.06, 0.04, 0.09};
double soma = 0;
for (double x : p) soma += x;
System.out.println(Math.round(soma * 100) + "%");`,
      resposta: '100%',
      explicacao: 'O softmax sempre produz uma distribuição: todos os tokens do vocabulário somam 100%. O `Math.round` absorve os pequenos erros do `double` na soma.',
      dica: '72 + 9 + 6 + 4 + 9.',
    },
  ],
};

export default episodio;
