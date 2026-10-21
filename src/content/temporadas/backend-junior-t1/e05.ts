import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t1-e05',
  minutos: 16,
  aula,
  armadilhas: [
    'Pedir uma fase do Maven executa todas as anteriores: `mvn install` também compila e roda os testes.',
    'Conflitos de versão não quebram a compilação; aparecem em execução, como `NoSuchMethodError`.',
    'No Maven, vence a versão mais próxima da raiz, não a mais nova; no Gradle, vence a mais alta.',
    'Com um BOM importado, as dependências daquela família vão **sem** `<version>`; repetir a versão anula o alinhamento.',
    'Uma dependência `test` não está disponível no código de `src/main`.',
    'Versões se comparam número a número: como texto, `2.10.0` pareceria mais antiga que `2.9.0`.',
    'Os arquivos do wrapper (`mvnw`, `gradlew` e as pastas `.mvn/` e `gradle/`) vão para o Git; `target/` e `build/`, não.',
  ],
  recursos: [
    {
      titulo: 'Maven in 5 Minutes',
      url: 'https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html',
      tipo: 'documentacao',
      porque: 'O primeiro projeto Maven, do `archetype:generate` ao `mvn package`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Introduction to the Build Lifecycle',
      url: 'https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html',
      tipo: 'documentacao',
      porque: 'As fases, os goals dos plugins e quais goals cada fase executa por padrão.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Introduction to the Dependency Mechanism',
      url: 'https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html',
      tipo: 'documentacao',
      porque: 'Dependências transitivas, a regra da mais próxima, os escopos e os BOMs, direto da fonte.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Introduction to the Standard Directory Layout',
      url: 'https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html',
      tipo: 'documentacao',
      porque: 'A estrutura de pastas que o Maven e o Gradle esperam.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Maven Wrapper',
      url: 'https://maven.apache.org/tools/wrapper/',
      tipo: 'documentacao',
      porque: 'Como gerar o `mvnw` e fixar a versão do Maven no projeto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Gradle: Building Java & JVM projects',
      url: 'https://docs.gradle.org/current/userguide/building_java_projects.html',
      tipo: 'documentacao',
      porque: 'O plugin `java`, as tarefas, os testes e a configuração da versão do Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Gradle: Dependency Configurations',
      url: 'https://docs.gradle.org/current/userguide/dependency_configurations.html',
      tipo: 'documentacao',
      porque: '`implementation`, `api`, `compileOnly`, `runtimeOnly` e as de teste.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Gradle: Migrating Builds From Apache Maven',
      url: 'https://docs.gradle.org/current/userguide/migrating_from_maven.html',
      tipo: 'documentacao',
      porque: 'Os dois lado a lado: escopos, BOMs, perfis e plugins equivalentes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Gradle: Dependency Resolution',
      url: 'https://docs.gradle.org/current/userguide/dependency_resolution.html',
      tipo: 'documentacao',
      porque: 'Como o Gradle monta o grafo e resolve conflitos escolhendo a versão mais alta.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Versionamento Semântico 2.0.0',
      url: 'https://semver.org/lang/pt-BR/',
      tipo: 'documentacao',
      porque: 'A especificação de `MAIOR.MENOR.CORREÇÃO`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Giuliana Bezerra: Aprenda Maven do zero com Java',
      url: 'https://www.youtube.com/watch?v=N7AyIfUQxGc',
      tipo: 'video',
      porque: 'Uma aula prática completa: pom, dependências, ciclo de vida e plugins, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Prof. Thomás da Costa: Maven, o básico para trabalhar com projetos Java',
      url: 'https://www.youtube.com/watch?v=J9y5Spv8WsE',
      tipo: 'video',
      porque: 'Uma introdução curta e direta ao Maven, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Alura: Começando com o Gradle, tasks e comandos básicos',
      url: 'https://www.youtube.com/watch?v=uX6Ezf73OEY',
      tipo: 'video',
      porque: 'As tarefas do Gradle e os comandos do dia a dia, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Tom Gregory: Gradle tutorial for complete beginners',
      url: 'https://www.youtube.com/watch?v=-dtcEMLNmn0',
      tipo: 'video',
      porque: 'O Gradle explicado do zero, com o wrapper, as tarefas e as dependências.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'Dois resolvedores',
    enunciado:
      'Escreva os dois algoritmos de resolução de conflitos sobre o mesmo grafo de dependências. O mapa `POMS` diz, para cada `artefato:versao`, as dependências que o POM dela declara. O `maisProxima` faz o que o Maven faz: percorre a árvore em largura a partir da raiz e fica com a primeira versão que encontra de cada artefato. O `maisAlta` faz o que o Gradle faz: fica com a maior versão pedida de cada artefato, considerando só as dependências das versões escolhidas, e repete até nada mudar. Compare as versões número a número. Com o grafo abaixo, a saída deve ser:\n\n```text\nloja:1.0       → relatorios:1.0, json:2.9.0\nrelatorios:1.0 → json:2.10.0, csv:1.4\njson:2.10.0    → texto:3.1\ncsv:1.4        → texto:3.0\n```\n\n```text\nmaven:  relatorios:1.0, json:2.9.0, csv:1.4, texto:3.0\ngradle: relatorios:1.0, json:2.10.0, csv:1.4, texto:3.1\n```',
    dicas: [
      'Para o Maven, uma fila (`ArrayDeque`) e um `LinkedHashMap` bastam: o `putIfAbsent` devolve `null` só na primeira vez de cada artefato.',
      'Para o Gradle, cada rodada percorre o grafo seguindo as versões escolhidas na rodada anterior e calcula as pedidas; quando as pedidas forem iguais às escolhidas, acabou.',
      'Para comparar `2.10.0` com `2.9.0`, transforme cada uma num `int[]` e use `Arrays.compare`.',
    ],
    solucao: `import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class DoisResolvedores {
    static final Map<String, List<String>> POMS = Map.of(
            "loja:1.0", List.of("relatorios:1.0", "json:2.9.0"),
            "relatorios:1.0", List.of("json:2.10.0", "csv:1.4"),
            "json:2.9.0", List.of(),
            "json:2.10.0", List.of("texto:3.1"),
            "csv:1.4", List.of("texto:3.0"),
            "texto:3.0", List.of(),
            "texto:3.1", List.of());

    static int comparar(String a, String b) {
        int[] x = Arrays.stream(a.split("[.]")).mapToInt(Integer::parseInt).toArray();
        int[] y = Arrays.stream(b.split("[.]")).mapToInt(Integer::parseInt).toArray();
        return Arrays.compare(x, y);
    }

    static Map<String, String> maisProxima(String raiz) {
        Map<String, String> escolhidas = new LinkedHashMap<>();
        Deque<String> fila = new ArrayDeque<>(POMS.get(raiz));
        while (!fila.isEmpty()) {
            String dependencia = fila.poll();
            String[] partes = dependencia.split(":");
            if (escolhidas.putIfAbsent(partes[0], partes[1]) == null) {
                fila.addAll(POMS.get(dependencia));
            }
        }
        return escolhidas;
    }

    static Map<String, String> maisAlta(String raiz) {
        Map<String, String> escolhidas = new LinkedHashMap<>();
        while (true) {
            Map<String, String> pedidas = new LinkedHashMap<>();
            Set<String> visitados = new HashSet<>();
            Deque<String> fila = new ArrayDeque<>(List.of(raiz));
            while (!fila.isEmpty()) {
                for (String dependencia : POMS.get(fila.poll())) {
                    String[] partes = dependencia.split(":");
                    pedidas.merge(partes[0], partes[1], (v1, v2) -> comparar(v1, v2) >= 0 ? v1 : v2);
                    if (visitados.add(partes[0])) {
                        fila.add(partes[0] + ":" + escolhidas.getOrDefault(partes[0], partes[1]));
                    }
                }
            }
            if (pedidas.equals(escolhidas)) {
                return escolhidas;
            }
            escolhidas = pedidas;
        }
    }

    static String formatar(Map<String, String> versoes) {
        StringBuilder sb = new StringBuilder();
        versoes.forEach((artefato, versao) -> sb.append(sb.isEmpty() ? "" : ", ").append(artefato).append(':').append(versao));
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println("maven:  " + formatar(maisProxima("loja:1.0")));
        System.out.println("gradle: " + formatar(maisAlta("loja:1.0")));
    }
}`,
    saida: 'maven:  relatorios:1.0, json:2.9.0, csv:1.4, texto:3.0\ngradle: relatorios:1.0, json:2.10.0, csv:1.4, texto:3.1',
    comentarios:
      'No Maven, o `json` 2.9.0 declarado direto vence o 2.10.0 que os relatórios pediam, e o `texto` 3.1 nem chega a ser considerado, porque só o `json` 2.10.0, que foi descartado, o pedia. No Gradle, a primeira rodada sobe o `json` para 2.10.0; a segunda, seguindo essa versão, descobre o pedido do `texto` 3.1; a terceira não muda nada e encerra. O `comparar` numérico é essencial: com `compareTo` de `String`, o 2.9.0 pareceria maior e o resultado do Gradle sairia errado. O Gradle de verdade faz isso de forma incremental, sem refazer o grafo inteiro a cada rodada, e o Maven ainda aplica exclusões e o `dependencyManagement` antes da regra da mais próxima.',
  },
  exercicios: [
    {
      id: 'backend-junior-t1-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em `com.fasterxml.jackson.core:jackson-databind:2.17.2`, o que é `jackson-databind`?',
      opcoes: ['O `artifactId`', 'O `groupId`', 'A versão', 'O nome do pacote Java'],
      resposta: 0,
      explicacao: 'A ordem é `groupId:artifactId:version`. O `groupId` costuma ser um domínio invertido, mas não precisa coincidir com os pacotes das classes.',
    },
    {
      id: 'backend-junior-t1-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quais fases o `mvn package` executa?',
      opcoes: [
        '`validate`, `compile`, `test` e `package`',
        'Só `package`',
        '`package`, `install` e `deploy`',
        '`clean` e `package`',
      ],
      resposta: 0,
      explicacao: 'Pedir uma fase executa todas as anteriores do ciclo. O `clean` é de outro ciclo e só roda quando pedido, como em `mvn clean package`.',
    },
    {
      id: 'backend-junior-t1-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O código da aplicação usa só as interfaces do `java.sql`, e o driver do PostgreSQL só é carregado em execução. Qual é o escopo mais adequado para o driver?',
      opcoes: ['`runtime`', '`compile`', '`provided`', '`test`'],
      resposta: 0,
      explicacao: 'Com `runtime`, o driver não fica disponível para o código compilar contra ele por engano, mas vai para os testes e para a execução. `provided` seria para algo que o ambiente já fornece.',
    },
    {
      id: 'backend-junior-t1-e05-q04',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais destas dependências normalmente usam o escopo `test`? Escolha duas.',
      opcoes: ['JUnit', 'Mockito', 'Jackson', 'Spring Web', 'O driver JDBC'],
      respostas: [0, 1],
      explicacao: 'Bibliotecas de teste só são usadas em `src/test` e não vão para o JAR. As outras são necessárias com a aplicação rodando.',
    },
    {
      id: 'backend-junior-t1-e05-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Maven, o projeto declara `guava:32.0` diretamente, e uma biblioteca que ele usa depende de `guava:33.0`. Qual versão vai para o classpath?',
      opcoes: [
        '`32.0`, porque está mais perto da raiz da árvore',
        '`33.0`, porque é a mais nova',
        'As duas',
        'Nenhuma: o build falha com erro de conflito',
      ],
      resposta: 0,
      explicacao: 'É a regra da mais próxima: a declaração direta, na profundidade 1, vence a transitiva. No Gradle, a mesma situação resultaria na 33.0.',
    },
    {
      id: 'backend-junior-t1-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que significa a linha `jackson-databind:2.11.1 -> 2.21.5` no `gradle dependencies`?',
      opcoes: [
        'A versão 2.11.1 foi pedida, mas a 2.21.5, pedida em outro ponto da árvore, foi a escolhida',
        'O Gradle vai atualizar o arquivo de build para a 2.21.5',
        'As duas versões vão para o classpath',
        'A 2.21.5 não foi encontrada e a 2.11.1 foi usada no lugar',
      ],
      resposta: 0,
      explicacao: 'Por padrão, o Gradle resolve conflitos escolhendo a versão mais alta pedida, e a seta mostra a substituição.',
    },
    {
      id: 'backend-junior-t1-e05-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Arrays;

public class Teste {
    public static void main(String[] args) {
        boolean texto = "2.10.0".compareTo("2.9.0") > 0;
        boolean numeros = Arrays.compare(new int[] {2, 10, 0}, new int[] {2, 9, 0}) > 0;
        System.out.println(texto + " " + numeros);
    }
}`,
      opcoes: ['`false true`', '`true true`', '`true false`', '`false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como texto, a comparação para no primeiro caractere diferente, `1` contra `9`, e o 2.10.0 parece menor. Número a número, 10 é maior que 9.',
    },
    {
      id: 'backend-junior-t1-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para que serve importar um BOM, como o `jackson-bom`, no `<dependencyManagement>`?',
      opcoes: [
        'Para fixar num só lugar as versões de todos os módulos de uma família, que passam a ser declarados sem `<version>`',
        'Para adicionar todos os módulos do Jackson ao projeto',
        'Para baixar as bibliotecas mais rápido',
        'Para desligar as dependências transitivas',
      ],
      resposta: 0,
      explicacao: 'O BOM não adiciona dependências, só versões. Os módulos ainda precisam ser declarados, mas ficam alinhados, sem conflitos entre eles.',
    },
    {
      id: 'backend-junior-t1-e05-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que os projetos trazem o `mvnw` ou o `gradlew`, e os enviam para o Git?',
      opcoes: [
        'Para que todo o time e o CI usem a mesma versão da ferramenta, sem precisar instalá-la',
        'Porque o Maven e o Gradle não funcionam sem eles',
        'Para guardar as dependências baixadas',
        'Para substituir o `pom.xml`',
      ],
      resposta: 0,
      explicacao: 'O wrapper baixa a versão definida no arquivo de propriedades na primeira execução. Assim, ninguém compila com uma versão diferente da do CI.',
    },
    {
      id: 'backend-junior-t1-e05-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que indica a versão `1.0.0-SNAPSHOT`?',
      opcoes: [
        'Uma versão em desenvolvimento, que pode mudar',
        'Uma versão estável, publicada e imutável',
        'Uma versão com defeitos conhecidos',
        'Uma versão só para testes',
      ],
      resposta: 0,
      explicacao: 'Na entrega, o sufixo sai e a versão vira um release, como `1.0.0`, que nunca muda depois de publicado.',
    },
    {
      id: 'backend-junior-t1-e05-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais correspondências entre o Gradle e o Maven estão corretas? Escolha duas.',
      opcoes: [
        '`implementation` corresponde ao escopo `compile`',
        '`testImplementation` corresponde ao escopo `test`',
        '`compileOnly` corresponde ao escopo `runtime`',
        '`runtimeOnly` corresponde ao escopo `provided`',
        '`platform(...)` corresponde ao escopo `test`',
      ],
      respostas: [0, 1],
      explicacao: '`compileOnly` é o `provided`, e `runtimeOnly` é o `runtime`. O `platform(...)` importa um BOM, como o escopo `import` do Maven.',
    },
    {
      id: 'backend-junior-t1-e05-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Depois de adicionar uma biblioteca ao `pom.xml`, o build passa, mas a aplicação lança `NoSuchMethodError` dentro de outra biblioteca. Qual é o primeiro passo da investigação?',
      opcoes: [
        'Rodar `mvn dependency:tree -Dverbose` e procurar `omitted for conflict`',
        'Apagar o `~/.m2` inteiro',
        'Trocar de Maven para Gradle',
        'Aumentar a memória da JVM',
      ],
      resposta: 0,
      explicacao: 'O erro indica uma classe compilada contra uma versão e executada com outra. A árvore mostra qual versão venceu e qual foi descartada; um BOM ou uma declaração direta resolve.',
    },
    {
      id: 'backend-junior-t1-e05-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> versoes = new ArrayList<>(List.of("1.9.3", "2.0.0", "1.10.0", "1.2.0"));
        Collections.sort(versoes);
        System.out.println(versoes);
    }
}`,
      resposta: '[1.10.0, 1.2.0, 1.9.3, 2.0.0]',
      explicacao: 'Ordenadas como texto, `1.10.0` vem antes de `1.2.0`, porque `1` é menor que `2`. É por isso que ferramentas de build comparam versões número a número.',
    },
    {
      id: 'backend-junior-t1-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Ao rodar `./gradlew build` duas vezes seguidas, sem mudar nada, as tarefas aparecem como `UP-TO-DATE` na segunda. Por quê?',
      opcoes: [
        'O Gradle viu que as entradas e saídas de cada tarefa não mudaram e pulou o trabalho',
        'O Gradle não encontrou os testes',
        'A segunda execução falhou em silêncio',
        'O Gradle só roda cada tarefa uma vez por dia',
      ],
      resposta: 0,
      explicacao: 'É o build incremental. Mudando um único arquivo de código, só as tarefas afetadas por ele rodam de novo.',
    },
    {
      id: 'backend-junior-t1-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Uma biblioteca segue o versionamento semântico e está na 3.4.1. Qual atualização pode trazer mudanças incompatíveis?',
      opcoes: ['Para a `4.0.0`', 'Para a `3.4.2`', 'Para a `3.5.0`', 'Nenhuma: atualizações nunca quebram nada'],
      resposta: 0,
      explicacao: 'A maior muda quando há quebra de compatibilidade. A menor acrescenta recursos sem quebrar, e a correção só conserta defeitos.',
    },
  ],
};

export default episodio;
