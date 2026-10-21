import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t4-e01',
  minutos: 16,
  aula,
  armadilhas: [
    '`exports` recebe um pacote, nunca uma classe, e não inclui os subpacotes.',
    'Uma classe `public` num pacote não exportado só é acessível dentro do próprio módulo.',
    '`java.base` é requerido implicitamente; os outros módulos do JDK, como `java.sql`, precisam de `requires`.',
    'Nomes de módulo seguem as regras de identificadores com pontos: hifens não são permitidos.',
    'Não pode haver ciclo de `requires`, e um mesmo pacote não pode estar em dois módulos.',
    'O `module-info.java` fica na raiz do código do módulo, fora de qualquer pacote.',
    'Uma classe no classpath pertence ao módulo sem nome: `getModule().getName()` devolve `null`.',
    'Para rodar, `java --module-path pasta --module modulo/pacote.Classe`, abreviado `-p` e `-m`.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Introduction to Modules in Java',
      url: 'https://dev.java/learn/organizing/modules/intro/',
      tipo: 'documentacao',
      porque: 'O tutorial oficial de módulos, começando pelo porquê e pelo `module-info`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Building Modules on the Command Line',
      url: 'https://dev.java/learn/organizing/modules/building/',
      tipo: 'documentacao',
      porque: 'Compilar, empacotar e rodar módulos com `javac`, `jar` e `java`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Qualified exports and opens',
      url: 'https://dev.java/learn/organizing/modules/qualified-exports-opens/',
      tipo: 'documentacao',
      porque: 'Exportar um pacote só para módulos específicos, e quando isso é útil.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 7.7: Module Declarations',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html#jls-7.7',
      tipo: 'documentacao',
      porque: 'A gramática do `module-info.java` e as regras de cada diretiva na especificação.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 261: Module System',
      url: 'https://openjdk.org/jeps/261',
      tipo: 'documentacao',
      porque: 'A proposta que implementou o sistema de módulos, com as opções de linha de comando.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 511: Module Import Declarations',
      url: 'https://openjdk.org/jeps/511',
      tipo: 'documentacao',
      porque: 'O `import module` do Java 25 e as regras de ambiguidade entre pacotes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The State of the Module System (Mark Reinhold)',
      url: 'https://openjdk.org/projects/jigsaw/spec/sotms/',
      tipo: 'artigo',
      porque: 'O texto de referência do arquiteto da plataforma sobre os conceitos do sistema de módulos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Jakob Jenkov: Java Modules',
      url: 'https://jenkov.com/tutorials/java/modules.html',
      tipo: 'artigo',
      porque: 'Um guia corrido de módulos, do descritor ao `jlink`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'SouJava: Java Modules (JPMS) no dia a dia',
      url: 'https://www.youtube.com/watch?v=Oc62FVeQuR4',
      tipo: 'video',
      porque: 'Módulos aplicados em projetos reais, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Microsoft Developer: Introduction to Java Modules',
      url: 'https://www.youtube.com/watch?v=3KP5YiKLkeo',
      tipo: 'video',
      porque: 'Uma introdução curta, com um módulo criado do zero.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Module Imports in Java 23 (Inside Java Newscast #69)',
      url: 'https://www.youtube.com/watch?v=WHknBEhzB0k',
      tipo: 'video',
      porque: 'As importações de módulo, que se tornaram definitivas no Java 25.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java 9 Modularity (Sander Mak e Paul Bakker)',
      url: 'https://javamodularity.com/',
      tipo: 'livro',
      porque: 'O livro de referência sobre módulos, escrito durante o projeto Jigsaw.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Modules and the Modular JDK", e Cap. 3, "Working with Modules"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As diretivas do `module-info` e os comandos de compilação e execução que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 12, "Modules": seções "Introducing Modules" e "Creating and Running a Modular Program"',
    },
  ],
  desafio: {
    titulo: 'Planta do módulo',
    enunciado:
      'Monte com `ModuleDescriptor.newModule` o descritor do módulo `com.javaflix.catalogo`, que requer `java.sql`, requer `java.logging` de forma transitiva, exporta `com.javaflix.catalogo.api` para todos e `com.javaflix.catalogo.dto` só para `com.javaflix.web`, e tem ainda o pacote `com.javaflix.catalogo.interno`. Escreva `static String gerar(ModuleDescriptor m)`, que devolve o texto do `module-info.java` correspondente, com os `requires` e os `exports` em ordem alfabética e sem o `java.base` implícito. Por fim, mostre os pacotes que não são exportados. A saída deve ser:\n\n```text\nmodule com.javaflix.catalogo {\n    requires transitive java.logging;\n    requires java.sql;\n    exports com.javaflix.catalogo.api;\n    exports com.javaflix.catalogo.dto to com.javaflix.web;\n}\npacotes internos: [com.javaflix.catalogo.interno]\n```',
    dicas: [
      '`requires(Set.of(Requires.Modifier.TRANSITIVE), "java.logging")` cria um `requires transitive`.',
      '`exports(Set.of(), pacote, Set.of(alvo))` cria uma exportação qualificada; `isQualified()` e `targets()` a identificam.',
      'Filtre o `requires` com o modificador `MANDATED`: é o `java.base` que o construtor acrescenta sozinho.',
    ],
    solucao: `import java.lang.module.ModuleDescriptor;
import java.lang.module.ModuleDescriptor.Exports;
import java.lang.module.ModuleDescriptor.Requires;
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class Planta {
    static String gerar(ModuleDescriptor m) {
        StringBuilder sb = new StringBuilder("module " + m.name() + " {\\n");
        m.requires().stream()
            .filter(r -> !r.modifiers().contains(Requires.Modifier.MANDATED))
            .sorted(Comparator.comparing(Requires::name))
            .forEach(r -> sb.append("    requires ")
                .append(r.modifiers().contains(Requires.Modifier.TRANSITIVE) ? "transitive " : "")
                .append(r.name()).append(";\\n"));
        m.exports().stream()
            .sorted(Comparator.comparing(Exports::source))
            .forEach(e -> sb.append("    exports ").append(e.source())
                .append(e.isQualified() ? " to " + String.join(", ", new TreeSet<>(e.targets())) : "")
                .append(";\\n"));
        return sb.append("}").toString();
    }

    public static void main(String[] args) {
        ModuleDescriptor catalogo = ModuleDescriptor.newModule("com.javaflix.catalogo")
            .requires("java.sql")
            .requires(Set.of(Requires.Modifier.TRANSITIVE), "java.logging")
            .exports("com.javaflix.catalogo.api")
            .exports(Set.of(), "com.javaflix.catalogo.dto", Set.of("com.javaflix.web"))
            .packages(Set.of("com.javaflix.catalogo.interno"))
            .build();
        System.out.println(gerar(catalogo));
        Set<String> internos = new TreeSet<>(catalogo.packages());
        catalogo.exports().forEach(e -> internos.remove(e.source()));
        System.out.println("pacotes internos: " + internos);
    }
}`,
    saida: 'module com.javaflix.catalogo {\n    requires transitive java.logging;\n    requires java.sql;\n    exports com.javaflix.catalogo.api;\n    exports com.javaflix.catalogo.dto to com.javaflix.web;\n}\npacotes internos: [com.javaflix.catalogo.interno]',
    comentarios:
      'O construtor de descritores aplica as mesmas regras do compilador: nome válido, pacote exportado uma vez só, e o `java.base` acrescentado como `MANDATED`. Os pacotes do módulo incluem os exportados, por isso o interno é calculado pela diferença. Num projeto de verdade, o `module-info.class` gerado pelo `javac` guarda exatamente esse descritor, e `ModuleFinder` ou `jar --describe-module` o leem de volta.',
  },
  exercicios: [
    {
      id: 'senior-t4-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A classe abaixo é executada pelo classpath, sem módulos. Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println(String.class.getModule().getName() + " " + Teste.class.getModule().isNamed());
    }
}`,
      opcoes: ['`java.base false`', '`java.lang false`', '`java.base true`', '`null false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`String` está no módulo `java.base`. Uma classe carregada pelo classpath pertence ao módulo sem nome.',
    },
    {
      id: 'senior-t4-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual linha de um `module-info.java` torna as classes `public` de `com.loja.api` acessíveis a outros módulos?',
      opcoes: ['`exports com.loja.api;`', '`requires com.loja.api;`', '`exports com.loja.api.Catalogo;`', '`public com.loja.api;`'],
      resposta: 0,
      explicacao: '`exports` recebe pacotes, nunca classes. `requires` declara que o módulo depende de outro módulo.',
    },
    {
      id: 'senior-t4-e01-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são diretivas válidas dentro da declaração de um módulo? Escolha três.',
      opcoes: ['`requires java.sql;`', '`exports com.loja.api;`', '`provides com.loja.api.Pagamento with com.loja.Pix;`', '`extends java.base;`', '`public com.loja.api;`'],
      respostas: [0, 1, 2],
      explicacao: 'As diretivas são `requires`, `exports`, `opens`, `uses` e `provides`. Módulos não têm herança nem modificadores de acesso.',
    },
    {
      id: 'senior-t4-e01-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.lang.module.ModuleDescriptor;
import java.util.TreeSet;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor d = ModuleDescriptor.newModule("app").requires("java.sql").build();
        System.out.println(new TreeSet<>(d.requires().stream().map(ModuleDescriptor.Requires::name).toList()));
    }
}`,
      resposta: '[java.base, java.sql]',
      explicacao: 'O construtor acrescenta `java.base` a todo módulo, como o compilador faz com o `module-info`.',
    },
    {
      id: 'senior-t4-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        System.out.println("criando");
        ModuleDescriptor.newModule("minha-loja").build();
    }
}`,
      opcoes: [
        'Imprime `criando` e lança `IllegalArgumentException`',
        'Imprime `criando` e cria o descritor',
        'Não compila: nome de módulo inválido',
        'Imprime `criando` e lança `IllegalStateException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: 'criando' },
      explicacao: 'Cada parte do nome de um módulo precisa ser um identificador Java, e o hífen não é permitido. O compilador faria a mesma recusa num `module-info.java`.',
    },
    {
      id: 'senior-t4-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que devolve o nome do módulo. O programa deve imprimir `java.base`.',
      codigo: `public class Nome {
    public static void main(String[] args) {
        System.out.println(String.class.getModule().___());
    }
}`,
      respostas: ['getName'],
      saida: 'java.base',
      explicacao: '`Class.getModule()` devolve o `Module` da classe, e `getName()` o seu nome, ou `null` para o módulo sem nome.',
    },
    {
      id: 'senior-t4-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        Module base = Object.class.getModule();
        System.out.println(base.isExported("java.util") + " " + base.isExported("sun.nio.ch") + " " + base.isExported("jdk.internal.misc"));
    }
}`,
      opcoes: ['`true false false`', '`true true true`', '`true true false`', '`false false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Só os pacotes da API oficial são exportados para todos. `sun.nio.ch` e `jdk.internal.misc` são internos do JDK.',
    },
    {
      id: 'senior-t4-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Os módulos compilados estão na pasta `mods`. Qual comando executa a classe `com.loja.app.Main`, do módulo `com.loja`?',
      opcoes: [
        '`java --module-path mods --module com.loja/com.loja.app.Main`',
        '`java -cp mods com.loja.app.Main --module com.loja`',
        '`java --module com.loja.app.Main --module-path mods/com.loja`',
        '`java -p mods -m com.loja.app.Main`',
      ],
      resposta: 0,
      explicacao: 'O formato de `--module` (`-m`) é `modulo/classe`. Sem o nome do módulo antes da barra, a JVM não sabe qual módulo iniciar.',
    },
    {
      id: 'senior-t4-e01-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Os módulos `com.vendas` e `com.estoque` contêm, cada um, uma classe no pacote `com.util`. Os dois estão no module path de uma aplicação. O que acontece?',
      opcoes: [
        'A aplicação não inicia: o mesmo pacote não pode estar em dois módulos lidos pela mesma camada',
        'Vale a classe do módulo que aparece primeiro no module path',
        'As duas classes são mescladas num só pacote',
        'Funciona, desde que nenhum dos dois exporte `com.util`',
      ],
      resposta: 0,
      explicacao: 'É o problema do *split package*. Mesmo pacotes não exportados entram na regra, porque cada pacote precisa pertencer a exatamente um módulo.',
    },
    {
      id: 'senior-t4-e01-q10',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor d = ModuleDescriptor.newModule("app").requires("java.sql").build();
        System.out.println(d.requires().get(0));
    }
}`,
      resposta: 6,
      explicacao: '`requires()` devolve um `Set<Requires>`, sem ordem e sem acesso por índice.',
    },
    {
      id: 'senior-t4-e01-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor sql = ModuleLayer.boot().findModule("java.sql").orElseThrow().getDescriptor();
        System.out.println(sql.exports().stream().map(ModuleDescriptor.Exports::source).sorted().toList());
    }
}`,
      opcoes: ['`[java.sql, javax.sql]`', '`[java.sql]`', '`[java.sql, java.sql.Driver]`', '`[]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O módulo `java.sql` exporta dois pacotes: `java.sql`, com JDBC, e `javax.sql`, com `DataSource` e companhia.',
    },
    {
      id: 'senior-t4-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O módulo `com.loja` tem a classe `public class Banco` no pacote `com.loja.interno`, que não é exportado. Quem consegue usar `Banco`?',
      opcoes: [
        'Só o código do próprio módulo `com.loja`',
        'Qualquer módulo que tenha `requires com.loja`',
        'Qualquer código, porque a classe é `public`',
        'Ninguém: classes de pacotes não exportados não compilam',
      ],
      resposta: 0,
      explicacao: 'Com módulos, `public` só vale fora do módulo para pacotes exportados. Dentro dele, a classe continua acessível normalmente.',
    },
    {
      id: 'senior-t4-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `module-info.java` de `a` contém `requires b;`, e o de `b` contém `requires a;`. O que acontece?',
      opcoes: [
        'Não compila: dependências cíclicas entre módulos não são permitidas',
        'Compila, e cada módulo enxerga o outro',
        'Compila, mas a JVM escolhe um dos dois para carregar primeiro',
        'Compila com um aviso',
      ],
      resposta: 0,
      explicacao: 'O grafo de módulos não pode ter ciclos. A solução costuma ser extrair o que os dois compartilham para um terceiro módulo.',
    },
    {
      id: 'senior-t4-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No Java 25, qual é a saída?',
      provas: ['831'],
      codigo: `import module java.base;

public class Teste {
    public static void main(String[] args) {
        List<Integer> numeros = new ArrayList<>(List.of(3, 1, 2));
        Collections.sort(numeros);
        System.out.println(numeros + " " + LocalDate.of(2025, 9, 16).getDayOfWeek());
    }
}`,
      opcoes: [
        '`[1, 2, 3] TUESDAY`',
        'Não compila: faltam os imports de `java.util` e `java.time`',
        'Não compila: a classe não está num módulo',
        '`[3, 1, 2] TUESDAY`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`import module java.base` importa todos os pacotes exportados pelo módulo, incluindo `java.util` e `java.time`, e funciona também em classes fora de módulos.',
    },
    {
      id: 'senior-t4-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor vazio = ModuleDescriptor.newModule("vazio").build();
        System.out.println(vazio.requires().size() + " " + vazio.exports().size() + " " + vazio.packages().size());
    }
}`,
      opcoes: ['`1 0 0`', '`0 0 0`', '`1 1 1`', '`0 0 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Mesmo um módulo sem diretivas requer `java.base`. Ele não exporta nada e, neste descritor, não tem pacotes.',
    },
  ],
};

export default episodio;
