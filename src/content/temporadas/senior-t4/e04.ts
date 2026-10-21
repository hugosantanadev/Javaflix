import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t4-e04',
  minutos: 17,
  aula,
  armadilhas: [
    'Um JAR modular é um JAR com `module-info.class` na raiz; o mesmo JAR no classpath perde o descritor e vai para o módulo sem nome.',
    'Com `--main-class` gravado no JAR, `java -p mods -m modulo` dispensa o `/classe`.',
    '`jlink` só aceita módulos nomeados: JARs comuns e módulos automáticos não entram numa imagem.',
    '`jlink --add-modules` inclui também, recursivamente, todos os módulos requeridos pelos módulos raiz.',
    '`jdeps` analisa o bytecode e não enxerga dependências criadas por reflexão, como `Class.forName`.',
    '`jdeps --jdk-internals` aponta o uso de APIs internas do JDK, com sugestões de substitutas.',
    '`ToolProvider.findFirst` devolve um `Optional`, e não há provedor para `java`.',
    'Um pacote não exportado bloqueia até a reflexão sobre seus membros públicos, vinda de fora do módulo.',
  ],
  recursos: [
    {
      titulo: 'The jar Command',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/jar.html',
      tipo: 'documentacao',
      porque: 'As opções para criar e descrever JARs modulares, incluindo `--main-class` e `--describe-module`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The jdeps Command',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/jdeps.html',
      tipo: 'documentacao',
      porque: 'Todas as formas de análise, de `--list-deps` a `--generate-module-info`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The jlink Command',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/jlink.html',
      tipo: 'documentacao',
      porque: 'As opções e os plugins que reduzem a imagem, como `--strip-debug` e `--compress`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 282: jlink: The Java Linker',
      url: 'https://openjdk.org/jeps/282',
      tipo: 'documentacao',
      porque: 'A proposta que criou o `jlink`, com a motivação das imagens sob medida.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 493: Linking Run-Time Images without JMODs',
      url: 'https://openjdk.org/jeps/493',
      tipo: 'documentacao',
      porque: 'A mudança do Java 24 que permite usar o `jlink` sem a pasta `jmods`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.util.spi.ToolProvider',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/spi/ToolProvider.html',
      tipo: 'documentacao',
      porque: 'Como chamar as ferramentas do JDK de dentro de um programa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to jlink',
      url: 'https://www.baeldung.com/jlink',
      tipo: 'artigo',
      porque: 'Do módulo ao runtime personalizado, com o lançador e a comparação de tamanhos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Multi-Module Maven Application with Java Modules',
      url: 'https://www.baeldung.com/maven-multi-module-project-java-jpms',
      tipo: 'artigo',
      porque: 'Módulos num projeto Maven de verdade, em vez da linha de comando.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: How-to Build Custom Java Runtimes with Jlink',
      url: 'https://www.youtube.com/watch?v=mJKlxqQQeyI',
      tipo: 'video',
      porque: 'O passo a passo oficial para montar e reduzir um runtime com `jlink`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: "Java: Java's Custom Runtime Builder, jlink",
      url: 'https://www.youtube.com/watch?v=3UCBmdbeYm4',
      tipo: 'video',
      porque: 'Uma apresentação curta do `jlink` e de quando ele compensa.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java 9 Modularity (Sander Mak e Paul Bakker)',
      url: 'https://javamodularity.com/',
      tipo: 'livro',
      porque: 'Imagens personalizadas com `jlink` e o uso de `jdeps` numa migração.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 13, "Scaling Down with Custom Runtime Images"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os comandos `jar`, `jdeps` e `jlink` com as opções que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 12, "Modules": seções "Discovering Modules" e "Comparing Types of Modules"',
    },
  ],
  desafio: {
    titulo: 'Dois módulos de verdade',
    enunciado:
      'Usando as ferramentas pelo `ToolProvider`, como na aula, crie numa pasta temporária dois módulos: `com.loja.api`, que exporta `com.loja.api` com a classe `Preco` e o método `static String formatar(long centavos)`, e `com.loja.app`, que requer `com.loja.api` e tem a classe principal `com.loja.app.Main`, que imprime `caneta: ` seguido do preço de 350 centavos. Compile os dois de uma vez com `--module-source-path`, empacote cada um num JAR (o do app com `--main-class`), resolva uma configuração a partir de `com.loja.app` e mostre o que cada módulo lê. Depois, tente invocar o `main` por reflexão; como `com.loja.app` não exporta seu pacote, use o `ModuleLayer.Controller` para abrir essa exportação ao seu programa e tente de novo. A saída deve ser:\n\n```text\ncom.loja.api lê [java.base]\ncom.loja.app lê [com.loja.api, java.base]\nbloqueado: o pacote com.loja.app não é exportado\ncaneta: R$ 3,50\n```',
    dicas: [
      '`javac --module-source-path src --module com.loja.api,com.loja.app -d classes` compila os dois e cria uma pasta por módulo.',
      '`ModuleLayer.defineModulesWithOneLoader(configuracao, List.of(ModuleLayer.boot()), carregador)` devolve um `Controller`.',
      '`controle.addExports(modulo, pacote, outroModulo)` é o que o lançador `java` faz para chamar o `main` de um pacote não exportado.',
    ],
    solucao: `import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.module.Configuration;
import java.lang.module.ModuleFinder;
import java.lang.module.ResolvedModule;
import java.lang.reflect.Method;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.spi.ToolProvider;
import java.util.stream.Stream;

public class DoisModulos {
    static void escrever(Path raiz, String caminho, String codigo) throws IOException {
        Path arquivo = raiz.resolve(caminho);
        Files.createDirectories(arquivo.getParent());
        Files.writeString(arquivo, codigo);
    }

    static String ferramenta(String nome, String... argumentos) {
        StringWriter saida = new StringWriter();
        PrintWriter escritor = new PrintWriter(saida);
        int codigo = ToolProvider.findFirst(nome).orElseThrow().run(escritor, escritor, argumentos);
        escritor.flush();
        if (codigo != 0) {
            throw new IllegalStateException(nome + " falhou: " + saida);
        }
        return saida.toString();
    }

    public static void main(String[] args) throws Exception {
        Path base = Files.createTempDirectory("dois");
        Path src = base.resolve("src");
        escrever(src, "com.loja.api/module-info.java", "module com.loja.api { exports com.loja.api; }");
        escrever(src, "com.loja.api/com/loja/api/Preco.java",
            "package com.loja.api; public final class Preco { public static String formatar(long centavos) { return \\"R$ \\" + centavos / 100 + \\",\\" + String.format(\\"%02d\\", centavos % 100); } }");
        escrever(src, "com.loja.app/module-info.java", "module com.loja.app { requires com.loja.api; }");
        escrever(src, "com.loja.app/com/loja/app/Main.java",
            "package com.loja.app; import com.loja.api.Preco; public class Main { public static void main(String[] a) { System.out.println(\\"caneta: \\" + Preco.formatar(350)); } }");

        Path classes = base.resolve("classes");
        ferramenta("javac", "-d", classes.toString(), "--module-source-path", src.toString(), "--module", "com.loja.api,com.loja.app");

        Path mods = Files.createDirectories(base.resolve("mods"));
        for (String modulo : List.of("com.loja.api", "com.loja.app")) {
            List<String> argumentos = new ArrayList<>(List.of("--create", "--file", mods.resolve(modulo + ".jar").toString()));
            if (modulo.equals("com.loja.app")) {
                argumentos.addAll(List.of("--main-class", "com.loja.app.Main"));
            }
            argumentos.addAll(List.of("-C", classes.resolve(modulo).toString(), "."));
            ferramenta("jar", argumentos.toArray(String[]::new));
        }

        Configuration configuracao = ModuleLayer.boot().configuration().resolve(ModuleFinder.of(mods), ModuleFinder.of(), Set.of("com.loja.app"));
        for (ResolvedModule m : configuracao.modules().stream().sorted(Comparator.comparing(ResolvedModule::name)).toList()) {
            System.out.println(m.name() + " lê " + m.reads().stream().map(ResolvedModule::name).sorted().toList());
        }

        ModuleLayer.Controller controle = ModuleLayer.defineModulesWithOneLoader(configuracao, List.of(ModuleLayer.boot()), ClassLoader.getSystemClassLoader());
        Module app = controle.layer().findModule("com.loja.app").orElseThrow();
        String principal = app.getDescriptor().mainClass().orElseThrow();
        Method main = controle.layer().findLoader("com.loja.app").loadClass(principal).getMethod("main", String[].class);
        try {
            main.invoke(null, (Object) new String[0]);
        } catch (IllegalAccessException e) {
            System.out.println("bloqueado: o pacote com.loja.app não é exportado");
        }
        controle.addExports(app, "com.loja.app", DoisModulos.class.getModule());
        main.invoke(null, (Object) new String[0]);

        try (Stream<Path> todos = Files.walk(base)) {
            todos.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
    saida: 'com.loja.api lê [java.base]\ncom.loja.app lê [com.loja.api, java.base]\nbloqueado: o pacote com.loja.app não é exportado\ncaneta: R$ 3,50',
    comentarios:
      'A primeira tentativa falha pelo encapsulamento forte: `Main` é `public`, mas está num pacote que `com.loja.app` não exporta, e por isso nem a reflexão de outro módulo o alcança. O lançador `java -m` enfrenta o mesmo obstáculo e o resolve do mesmo jeito, abrindo a exportação só para si. O grafo também mostra a diferença entre os dois módulos: só o app lê a API, e os dois leem o `java.base`, implícito.',
  },
  exercicios: [
    {
      id: 'senior-t4-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que torna um JAR um JAR modular?',
      opcoes: [
        'Ter um `module-info.class` na raiz',
        'Ter um atributo `Automatic-Module-Name` no `MANIFEST.MF`',
        'Ter o nome no formato `nome-versao.jar`',
        'Ser criado com a opção `--modular` do `jar`',
      ],
      resposta: 0,
      explicacao: 'O descritor compilado na raiz do JAR é o que faz dele um módulo nomeado. O `Automatic-Module-Name` dá nome a um JAR comum, que vira um módulo automático.',
    },
    {
      id: 'senior-t4-e04-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um JAR modular é colocado no classpath, com `-cp`, e não no module path. Como a JVM o trata?',
      opcoes: [
        'Como parte do módulo sem nome: o `module-info` é ignorado',
        'Como um módulo nomeado, igual ao module path',
        'Como um módulo automático',
        'A JVM recusa iniciar',
      ],
      resposta: 0,
      explicacao: 'No classpath, tudo vai para o módulo sem nome. Essa compatibilidade permite publicar uma biblioteca modular que também funciona para quem ainda não usa módulos.',
    },
    {
      id: 'senior-t4-e04-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o `jlink` são verdadeiras? Escolha duas.',
      opcoes: [
        'Acrescenta à imagem, recursivamente, os módulos requeridos pelos módulos pedidos',
        'Só trabalha com módulos nomeados',
        'Aceita JARs comuns do classpath',
        'Gera um JAR executável com todas as dependências dentro',
        'Precisa que a aplicação rode antes para descobrir as dependências',
      ],
      respostas: [0, 1],
      explicacao: 'O `jlink` gera uma pasta com um runtime completo, não um JAR, e calcula as dependências pelos descritores, sem executar nada.',
    },
    {
      id: 'senior-t4-e04-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual comando cria `mods/loja.jar` com as classes de `classes/` e grava `com.loja.Main` como classe principal?',
      opcoes: [
        '`jar --create --file mods/loja.jar --main-class com.loja.Main -C classes .`',
        '`jar --file mods/loja.jar --main com.loja.Main classes`',
        '`jlink --create mods/loja.jar --main-class com.loja.Main`',
        '`javac --jar mods/loja.jar --main-class com.loja.Main classes`',
      ],
      resposta: 0,
      explicacao: '`-C classes .` entra na pasta `classes` e inclui tudo a partir dali, deixando o `module-info.class` na raiz do JAR.',
    },
    {
      id: 'senior-t4-e04-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Antes de atualizar uma aplicação para uma versão nova do Java, qual comando aponta o uso de APIs internas do JDK, como `sun.misc.BASE64Encoder`?',
      opcoes: ['`jdeps --jdk-internals app.jar`', '`jlink --check app.jar`', '`jar --describe-module --file app.jar`', '`java --list-modules app.jar`'],
      resposta: 0,
      explicacao: 'O `jdeps` lista cada uso de API interna e sugere a substituta oficial, como `java.util.Base64` nesse caso.',
    },
    {
      id: 'senior-t4-e04-q06',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.spi.ToolProvider;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ToolProvider.findFirst("jlink").isPresent() + " " + ToolProvider.findFirst("java").isPresent());
    }
}`,
      resposta: 'true false',
      explicacao: 'O `jlink`, o `jar`, o `javac` e o `jdeps`, entre outros, têm provedores. O lançador `java` não: ele é o próprio processo da JVM.',
    },
    {
      id: 'senior-t4-e04-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que procura uma ferramenta pelo nome. O programa deve imprimir `true`.',
      codigo: `import java.util.spi.ToolProvider;

public class Ferramentas {
    public static void main(String[] args) {
        System.out.println(ToolProvider.___("jar").isPresent());
    }
}`,
      respostas: ['findFirst'],
      saida: 'true',
      explicacao: '`ToolProvider.findFirst(nome)` devolve um `Optional<ToolProvider>` com a primeira ferramenta encontrada com aquele nome.',
    },
    {
      id: 'senior-t4-e04-q08',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.spi.ToolProvider;

public class Teste {
    public static void main(String[] args) {
        ToolProvider jar = ToolProvider.findFirst("jar");
        System.out.println(jar.name());
    }
}`,
      resposta: 5,
      explicacao: '`findFirst` devolve `Optional<ToolProvider>`. Para obter a ferramenta, use `orElseThrow()` ou outro método do `Optional`.',
    },
    {
      id: 'senior-t4-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que faz a opção `--launcher loja=com.loja/com.loja.app.Main` do `jlink`?',
      opcoes: [
        'Cria na imagem o script `bin/loja`, que executa a classe `com.loja.app.Main` do módulo `com.loja`',
        'Define `loja` como nome do módulo raiz',
        'Grava a classe principal no `module-info` do módulo',
        'Inicia a aplicação ao terminar a montagem da imagem',
      ],
      resposta: 0,
      explicacao: 'O lançador evita digitar `bin/java -m modulo/classe`: basta rodar `bin/loja`.',
    },
    {
      id: 'senior-t4-e04-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.module.ModuleFinder;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ModuleFinder.ofSystem().find("java.sql").isPresent() + " " + ModuleFinder.ofSystem().find("com.loja").isPresent());
    }
}`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`ModuleFinder.ofSystem()` procura nos módulos do runtime em uso, que tem o `java.sql`. Um módulo da aplicação só seria achado por um `ModuleFinder.of(pasta)`.',
    },
    {
      id: 'senior-t4-e04-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O código de uma aplicação carrega o driver do banco com `Class.forName("org.postgresql.Driver")`. O que o `jdeps` informa sobre essa dependência?',
      opcoes: [
        'Nada: ele analisa referências no bytecode, e o nome da classe é só um texto',
        'Que a aplicação depende do módulo do driver',
        'Que a aplicação depende do pacote `org.postgresql`',
        'Um erro, porque o driver não está no module path',
      ],
      resposta: 0,
      explicacao: 'Dependências por reflexão só existem em tempo de execução. Para elas, a análise estática não basta, e é comum declará-las à parte, como com `--add-modules`.',
    },
    {
      id: 'senior-t4-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma aplicação modular depende de uma biblioteca distribuída como JAR comum, sem `module-info`, usada como módulo automático. O que acontece ao rodar o `jlink` com ela?',
      opcoes: [
        'O `jlink` recusa: módulos automáticos não podem entrar numa imagem',
        'O `jlink` converte a biblioteca num módulo nomeado',
        'A biblioteca é ignorada e a imagem é gerada sem ela',
        'Funciona normalmente',
      ],
      resposta: 0,
      explicacao: 'Módulos automáticos não têm um descritor de verdade para o `jlink` ligar. A saída é gerar um `module-info` para a biblioteca, por exemplo com `jdeps --generate-module-info`, ou esperar uma versão modular.',
    },
    {
      id: 'senior-t4-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.spi.ToolProvider;

public class Teste {
    public static void main(String[] args) {
        System.out.println("procurando");
        ToolProvider java = ToolProvider.findFirst("java").orElseThrow();
        System.out.println(java.name());
    }
}`,
      opcoes: [
        'Imprime `procurando` e lança `NoSuchElementException`',
        'Imprime `procurando` e `java`',
        'Imprime `procurando` e `null`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchElementException', saida: 'procurando' },
      explicacao: 'Não existe um `ToolProvider` chamado `java`, e o `orElseThrow()` de um `Optional` vazio lança `NoSuchElementException`.',
    },
    {
      id: 'senior-t4-e04-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída, se o arquivo `nao-existe-javaflix.jar` não existir?',
      codigo: `import java.io.*;
import java.util.spi.ToolProvider;

public class Teste {
    public static void main(String[] args) {
        StringWriter mensagens = new StringWriter();
        int codigo = ToolProvider.findFirst("jar").orElseThrow()
            .run(new PrintWriter(mensagens), new PrintWriter(mensagens), "--describe-module", "--file", "nao-existe-javaflix.jar");
        System.out.println("código " + codigo);
    }
}`,
      opcoes: ['`código 1`', '`código 0`', 'Lança `FileNotFoundException`', 'Lança `NoSuchFileException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As ferramentas não lançam exceção ao falhar: devolvem um código diferente de 0, como fariam na linha de comando, e escrevem o erro no `PrintWriter` de erros.',
    },
    {
      id: 'senior-t4-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o `jlink` é útil para aplicações que rodam em contêineres?',
      opcoes: [
        'A imagem leva só os módulos usados, e fica bem menor que um JDK completo',
        'Porque contêineres não aceitam o JDK',
        'Porque o `jlink` compila a aplicação para código nativo',
        'Porque a imagem dispensa a JVM',
      ],
      resposta: 0,
      explicacao: 'Uma imagem com poucos módulos fica na casa das dezenas de megabytes, o que reduz o tamanho do contêiner e a superfície de ataque. Ela continua rodando sobre a JVM; código nativo é outra tecnologia, como o GraalVM Native Image.',
    },
  ],
};

export default episodio;
