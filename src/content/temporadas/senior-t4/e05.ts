import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t4-e05',
  minutos: 16,
  aula,
  armadilhas: [
    'Tudo no classpath vai para o módulo sem nome, que lê todos os módulos e exporta e abre todos os seus pacotes.',
    'Um módulo nomeado não pode requerer o módulo sem nome: não há nome para pôr no `requires`.',
    'Um JAR sem `module-info` no module path vira módulo automático, que exporta e abre todos os pacotes e lê todos os módulos.',
    'O nome automático vem do `Automatic-Module-Name` do manifesto; sem ele, do nome do arquivo, sem `.jar` e sem a versão.',
    'Na derivação, hífens e outros símbolos viram pontos: `commons-lang3-3.12.0.jar` vira `commons.lang3`.',
    'Um nome derivado inválido, como `cool.2go`, impede o JAR de ser módulo automático.',
    'Bottom-up modulariza das bibliotecas para a aplicação; top-down começa pela aplicação e usa as dependências como automáticas.',
    'Pacotes repetidos em dois JARs funcionavam no classpath, mas impedem a aplicação de iniciar no module path.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Code on the Class Path, the Unnamed Module',
      url: 'https://dev.java/learn/organizing/modules/unnamed-module/',
      tipo: 'documentacao',
      porque: 'O que acontece com o código do classpath e como ele convive com módulos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Incremental Modularization with Automatic Modules',
      url: 'https://dev.java/learn/organizing/modules/automatic-module/',
      tipo: 'documentacao',
      porque: 'Módulos automáticos, o `Automatic-Module-Name` e as estratégias de migração.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.lang.module.ModuleFinder (of)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/module/ModuleFinder.html',
      tipo: 'documentacao',
      porque: 'As regras oficiais de derivação do nome e da versão de um módulo automático.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 261: Module System',
      url: 'https://openjdk.org/jeps/261',
      tipo: 'documentacao',
      porque: 'As seções sobre módulos sem nome, automáticos e o conjunto padrão de módulos raiz.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The State of the Module System: Compatibility and migration',
      url: 'https://openjdk.org/projects/jigsaw/spec/sotms/',
      tipo: 'artigo',
      porque: 'A explicação original de como o legado foi acomodado, com as estratégias de migração.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: A Guide to Java 9 Modularity',
      url: 'https://www.baeldung.com/java-9-modularity',
      tipo: 'artigo',
      porque: 'Os tipos de módulo lado a lado, com o comportamento de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java Modules',
      url: 'https://jenkov.com/tutorials/java/modules.html',
      tipo: 'artigo',
      porque: 'As seções sobre módulos sem nome, automáticos e migração.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Java Modules in Real Life',
      url: 'https://www.youtube.com/watch?v=UqnwQp1uHuY',
      tipo: 'video',
      porque: 'O que acontece ao migrar aplicações reais, com bibliotecas que ainda não são modulares.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Module System, Migration to JDK 11 (Sander Mak)',
      url: 'https://www.youtube.com/watch?v=1o9-BfC_vV0',
      tipo: 'video',
      porque: 'Migração passo a passo, com módulos automáticos e o `jdeps`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Java 9 Modularity (Sander Mak e Paul Bakker)',
      url: 'https://javamodularity.com/',
      tipo: 'livro',
      porque: 'Dois capítulos inteiros sobre migrar aplicações e bibliotecas.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 8, "Migration to Modules", e Cap. 9, "Migration Case Study: Spring and Hibernate"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os tipos de módulo e as estratégias de migração, com as tabelas que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 12, "Modules": seções "Comparing Types of Modules" e "Migrating an Application"',
    },
  ],
  desafio: {
    titulo: 'Plano de migração',
    enunciado:
      'Uma aplicação vai virar o módulo `com.loja.app`, com a estratégia de cima para baixo. Crie numa pasta temporária JARs vazios com os nomes `jackson-databind-2.17.0.jar` (com `Automatic-Module-Name: com.fasterxml.jackson.databind`), `commons-io-2.15.1.jar`, `postgresql-42.7.3.jar` (com `Automatic-Module-Name: org.postgresql.jdbc`), `minha-lib-v2.jar` e `3d-render-1.0.jar`. Para cada JAR, em ordem de nome, mostre o nome de módulo automático, a versão e de onde veio o nome, ou avise que ele não pode ser módulo automático. Termine gerando o `module-info.java` da aplicação com um `requires` para cada dependência válida, em ordem alfabética. A saída deve ser:\n\n```text\n3d-render-1.0.jar: não pode ser módulo automático\ncommons-io-2.15.1.jar: commons.io 2.15.1 (nome do arquivo)\njackson-databind-2.17.0.jar: com.fasterxml.jackson.databind 2.17.0 (manifesto)\nminha-lib-v2.jar: minha.lib.v2 sem versão (nome do arquivo)\npostgresql-42.7.3.jar: org.postgresql.jdbc 42.7.3 (manifesto)\nmodule com.loja.app {\n    requires com.fasterxml.jackson.databind;\n    requires commons.io;\n    requires minha.lib.v2;\n    requires org.postgresql.jdbc;\n}\n```',
    dicas: [
      '`ModuleFinder.of(jar).findAll()` lança `FindException` quando o nome derivado é inválido.',
      'Abra o JAR com `java.util.jar.JarFile` e leia `getManifest()` para saber se o nome veio de lá.',
      'Em `minha-lib-v2`, o hífen não é seguido de um dígito, e nada vira versão.',
    ],
    solucao: `import java.io.IOException;
import java.lang.module.FindException;
import java.lang.module.ModuleDescriptor;
import java.lang.module.ModuleFinder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.jar.Attributes;
import java.util.jar.JarFile;
import java.util.jar.JarOutputStream;
import java.util.jar.Manifest;
import java.util.stream.Stream;

public class Migracao {
    static void criarJar(Path pasta, String nome, String nomeAutomatico) throws IOException {
        Manifest manifesto = new Manifest();
        manifesto.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
        if (nomeAutomatico != null) {
            manifesto.getMainAttributes().put(new Attributes.Name("Automatic-Module-Name"), nomeAutomatico);
        }
        try (JarOutputStream out = new JarOutputStream(Files.newOutputStream(pasta.resolve(nome)), manifesto)) {
            out.flush();
        }
    }

    static boolean temNomeNoManifesto(Path jar) throws IOException {
        try (JarFile arquivo = new JarFile(jar.toFile())) {
            Manifest m = arquivo.getManifest();
            return m != null && m.getMainAttributes().getValue("Automatic-Module-Name") != null;
        }
    }

    public static void main(String[] args) throws IOException {
        Path libs = Files.createTempDirectory("libs");
        Map<String, String> dependencias = new TreeMap<>();
        dependencias.put("jackson-databind-2.17.0.jar", "com.fasterxml.jackson.databind");
        dependencias.put("commons-io-2.15.1.jar", null);
        dependencias.put("postgresql-42.7.3.jar", "org.postgresql.jdbc");
        dependencias.put("minha-lib-v2.jar", null);
        dependencias.put("3d-render-1.0.jar", null);
        for (Map.Entry<String, String> e : dependencias.entrySet()) {
            criarJar(libs, e.getKey(), e.getValue());
        }

        TreeSet<String> requires = new TreeSet<>();
        List<Path> jars;
        try (Stream<Path> conteudo = Files.list(libs)) {
            jars = conteudo.sorted(Comparator.comparing(p -> p.getFileName().toString())).toList();
        }
        for (Path jar : jars) {
            String arquivo = jar.getFileName().toString();
            try {
                ModuleDescriptor d = ModuleFinder.of(jar).findAll().iterator().next().descriptor();
                String origem = temNomeNoManifesto(jar) ? "manifesto" : "nome do arquivo";
                System.out.println(arquivo + ": " + d.name() + " " + d.version().map(Object::toString).orElse("sem versão") + " (" + origem + ")");
                requires.add(d.name());
            } catch (FindException e) {
                System.out.println(arquivo + ": não pode ser módulo automático");
            }
        }
        System.out.println("module com.loja.app {");
        requires.forEach(r -> System.out.println("    requires " + r + ";"));
        System.out.println("}");

        try (Stream<Path> todos = Files.walk(libs)) {
            todos.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
    saida: '3d-render-1.0.jar: não pode ser módulo automático\ncommons-io-2.15.1.jar: commons.io 2.15.1 (nome do arquivo)\njackson-databind-2.17.0.jar: com.fasterxml.jackson.databind 2.17.0 (manifesto)\nminha-lib-v2.jar: minha.lib.v2 sem versão (nome do arquivo)\npostgresql-42.7.3.jar: org.postgresql.jdbc 42.7.3 (manifesto)\nmodule com.loja.app {\n    requires com.fasterxml.jackson.databind;\n    requires commons.io;\n    requires minha.lib.v2;\n    requires org.postgresql.jdbc;\n}',
    comentarios:
      'Os dois JARs com `Automatic-Module-Name` mostram por que o atributo existe: sem ele, o driver viraria `postgresql`, e uma futura versão modular, com o nome `org.postgresql.jdbc`, quebraria todos os `requires` escritos antes. O `3d-render` não tem como entrar no module path: `3d` não é um identificador. A saída seria renomear o JAR, pedir ao autor o atributo no manifesto ou deixá-lo no classpath, o que impede o módulo da aplicação de usá-lo.',
  },
  exercicios: [
    {
      id: 'senior-t4-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Um JAR sem `module-info.class` é colocado no module path. Que tipo de módulo ele vira?',
      opcoes: ['Um módulo automático', 'Um módulo nomeado sem exportações', 'Parte do módulo sem nome', 'Nenhum: a JVM recusa iniciar'],
      resposta: 0,
      explicacao: 'O module path transforma JARs comuns em módulos automáticos, com nome derivado e todos os pacotes exportados.',
    },
    {
      id: 'senior-t4-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída de um programa executado pelo classpath?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Module meu = Teste.class.getModule();
        Module sql = java.sql.Connection.class.getModule();
        System.out.println(meu.canRead(sql) + " " + sql.canRead(meu));
    }
}`,
      opcoes: ['`true false`', '`true true`', '`false false`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O módulo sem nome lê todos os módulos. Um módulo nomeado, como o `java.sql`, não lê o módulo sem nome.',
    },
    {
      id: 'senior-t4-e05-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o módulo sem nome são verdadeiras? Escolha duas.',
      opcoes: [
        'Contém tudo o que é carregado pelo classpath',
        'Exporta e abre todos os seus pacotes',
        'Pode ser requerido por um módulo nomeado com `requires unnamed`',
        'Só lê o `java.base`',
        'Tem um `module-info` gerado pela JVM',
      ],
      respostas: [0, 1],
      explicacao: 'O módulo sem nome lê todos os módulos e não tem descritor. Nenhum módulo nomeado consegue declarar dependência dele.',
    },
    {
      id: 'senior-t4-e05-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.io.IOException;
import java.lang.module.*;
import java.nio.file.*;
import java.util.jar.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("q");
        Path jar = pasta.resolve("spring-core-6.1.2.jar");
        Manifest m = new Manifest();
        m.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
        try (JarOutputStream out = new JarOutputStream(Files.newOutputStream(jar), m)) {
            out.flush();
        }
        ModuleDescriptor d = ModuleFinder.of(jar).findAll().iterator().next().descriptor();
        System.out.println(d.name() + " " + d.version().orElseThrow());
        Files.delete(jar);
        Files.delete(pasta);
    }
}`,
      resposta: 'spring.core 6.1.2',
      explicacao: 'O `-6.1.2` vira a versão; o resto, `spring-core`, tem o hífen trocado por ponto.',
    },
    {
      id: 'senior-t4-e05-q05',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.lang.module.*;
import java.nio.file.*;
import java.util.jar.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("q");
        Path jar = pasta.resolve("app-1x.jar");
        Manifest m = new Manifest();
        m.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
        try (JarOutputStream out = new JarOutputStream(Files.newOutputStream(jar), m)) {
            out.flush();
        }
        pasta.toFile().deleteOnExit();
        jar.toFile().deleteOnExit();
        System.out.println("procurando");
        ModuleFinder.of(jar).findAll();
    }
}`,
      opcoes: [
        'Imprime `procurando` e lança `FindException`',
        'Imprime `procurando` e encontra o módulo `app` com versão `1x`',
        'Imprime `procurando` e encontra o módulo `app.1x`',
        'Imprime `procurando` e termina sem encontrar nada',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'FindException', saida: 'procurando' },
      explicacao: 'A versão só é separada quando o hífen é seguido de dígitos e depois de um ponto ou do fim do nome. `-1x` não se encaixa, o nome fica `app.1x`, e `1x` não é um identificador válido.',
    },
    {
      id: 'senior-t4-e05-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o atributo do manifesto que define o nome do módulo automático. O programa deve imprimir `com.empresa.util`.',
      codigo: `import java.io.IOException;
import java.lang.module.*;
import java.nio.file.*;
import java.util.jar.*;

public class Nome {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("q");
        Path jar = pasta.resolve("util-1.0.jar");
        Manifest m = new Manifest();
        m.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
        m.getMainAttributes().put(new Attributes.Name("___"), "com.empresa.util");
        try (JarOutputStream out = new JarOutputStream(Files.newOutputStream(jar), m)) {
            out.flush();
        }
        System.out.println(ModuleFinder.of(jar).findAll().iterator().next().descriptor().name());
        Files.delete(jar);
        Files.delete(pasta);
    }
}`,
      respostas: ['Automatic-Module-Name'],
      saida: 'com.empresa.util',
      explicacao: 'O `Automatic-Module-Name` vale mais que o nome do arquivo, e dá à biblioteca um nome estável antes de ela ganhar um `module-info`.',
    },
    {
      id: 'senior-t4-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Module meu = Teste.class.getModule();
        boolean nomeado = meu.isNamed();
        String descritor = meu.getDescriptor();
        System.out.println(nomeado + " " + descritor);
    }
}`,
      resposta: 5,
      explicacao: '`getDescriptor()` devolve um `ModuleDescriptor`, ou `null` no módulo sem nome, e não uma `String`.',
    },
    {
      id: 'senior-t4-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um time quer modularizar sua aplicação agora, mas depende de várias bibliotecas de terceiros que ainda não têm `module-info`. Qual estratégia se encaixa?',
      opcoes: [
        'De cima para baixo: a aplicação vira módulo e as bibliotecas vão para o module path como automáticas',
        'De baixo para cima: esperar todas as bibliotecas serem modularizadas',
        'Deixar a aplicação no classpath e as bibliotecas no module path',
        'Colocar tudo no module path como módulo sem nome',
      ],
      resposta: 0,
      explicacao: 'O bottom-up exige controlar todas as dependências. Com bibliotecas de terceiros, o top-down com módulos automáticos é o caminho.',
    },
    {
      id: 'senior-t4-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um módulo nomeado precisa usar uma classe de um JAR que está no classpath. O que é possível?',
      opcoes: [
        'Nada pelo `requires`: é preciso mover o JAR para o module path, onde ele vira módulo automático',
        '`requires classpath;` no `module-info`',
        '`requires` com o nome do arquivo do JAR',
        'Funciona sem declarar nada, porque o módulo sem nome exporta tudo',
      ],
      resposta: 0,
      explicacao: 'O módulo sem nome exporta tudo, mas módulos nomeados não o leem. Só no module path o JAR ganha um nome que pode aparecer num `requires`.',
    },
    {
      id: 'senior-t4-e05-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.lang.module.*;
import java.nio.file.*;
import java.util.jar.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("q");
        Path jar = pasta.resolve("guava-32.1.2-jre.jar");
        Manifest m = new Manifest();
        m.getMainAttributes().put(Attributes.Name.MANIFEST_VERSION, "1.0");
        try (JarOutputStream out = new JarOutputStream(Files.newOutputStream(jar), m)) {
            out.flush();
        }
        ModuleDescriptor d = ModuleFinder.of(jar).findAll().iterator().next().descriptor();
        System.out.println(d.name() + " " + d.version().orElseThrow() + " " + d.isAutomatic());
        Files.delete(jar);
        Files.delete(pasta);
    }
}`,
      opcoes: ['`guava 32.1.2-jre true`', '`guava.jre 32.1.2 true`', '`guava 32.1.2 true`', '`guava.32.1.2.jre sem versão`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Tudo a partir do primeiro hífen seguido de dígitos vira versão, inclusive o sufixo `-jre`.',
    },
    {
      id: 'senior-t4-e05-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre módulos automáticos são verdadeiras? Escolha três.',
      opcoes: [
        'Exportam todos os seus pacotes',
        'Leem todos os outros módulos, inclusive o sem nome',
        'Podem ser requeridos por módulos nomeados',
        'Podem entrar numa imagem do `jlink`',
        'Precisam de um `module-info.class`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O `jlink` só aceita módulos nomeados, e um JAR com `module-info` já é um módulo nomeado, não automático.',
    },
    {
      id: 'senior-t4-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que uma biblioteca ainda não modular deve declarar `Automatic-Module-Name` no manifesto?',
      opcoes: [
        'Para ter um nome de módulo estável, que não mude se o arquivo for renomeado e que seja o mesmo da futura versão modular',
        'Para que a JVM a carregue mais rápido',
        'Para exportar só alguns pacotes',
        'Para que ela possa ser usada no classpath',
      ],
      resposta: 0,
      explicacao: 'Quem escreve `requires` depende do nome. Um nome derivado do arquivo muda com a renomeação e raramente coincide com o nome que a biblioteca terá ao ganhar um `module-info`.',
    },
    {
      id: 'senior-t4-e05-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Dois JARs comuns, `a.jar` e `b.jar`, têm classes no mesmo pacote `com.util`. Funcionavam no classpath. O que acontece ao movê-los para o module path, como módulos automáticos?',
      opcoes: [
        'A aplicação não inicia: o mesmo pacote estaria em dois módulos',
        'Funciona como antes',
        'Vale a classe do JAR que vier primeiro',
        'Os dois são unidos num único módulo automático',
      ],
      resposta: 0,
      explicacao: 'O classpath tolerava pacotes divididos entre JARs. No module path, cada pacote pertence a um só módulo, e é preciso reorganizar o código ou manter um dos JARs no classpath.',
    },
    {
      id: 'senior-t4-e05-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída de um programa executado pelo classpath?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Module meu = Teste.class.getModule();
        System.out.println(meu.isNamed() + " " + (meu.getDescriptor() == null) + " " + meu.getName());
    }
}`,
      opcoes: ['`false true null`', '`true false Teste`', '`false false unnamed`', '`true true null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O módulo sem nome não tem nome nem descritor: os dois métodos devolvem `null`.',
    },
    {
      id: 'senior-t4-e05-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Na estratégia de baixo para cima, por onde começa a modularização?',
      opcoes: [
        'Pelas bibliotecas que não dependem de nenhuma outra do projeto',
        'Pela classe `main` da aplicação',
        'Pelos módulos do JDK',
        'Pelos JARs de terceiros, como automáticos',
      ],
      resposta: 0,
      explicacao: 'Cada passo só precisa de módulos já nomeados: primeiro as folhas do grafo de dependências, depois quem depende delas, até a aplicação.',
    },
  ],
};

export default episodio;
