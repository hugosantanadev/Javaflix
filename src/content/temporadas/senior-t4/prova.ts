import type { Exercicio } from '../../types';

/** Prova da temporada Sênior T4: módulos. */
const prova: Exercicio[] = [
  {
    id: 'senior-t4-prova-q01',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println(Integer.class.getModule().getName() + " " + java.util.logging.Logger.class.getModule().getName());
    }
}`,
    opcoes: ['`java.base java.logging`', '`java.lang java.util.logging`', '`java.base java.base`', '`null null`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`Integer` fica no `java.base`. O pacote `java.util.logging` não está no `java.base`, e sim no módulo `java.logging`.',
  },
  {
    id: 'senior-t4-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O `module-info.java` de `com.loja` tem só `exports com.loja;`. Os tipos `public` do pacote `com.loja.api` ficam acessíveis a outros módulos?',
    opcoes: [
      'Não: `exports` vale para um pacote, sem incluir os subpacotes',
      'Sim: exportar um pacote exporta os subpacotes',
      'Sim, mas só por reflexão',
      'Não compila: é preciso exportar o pacote mais específico',
    ],
    resposta: 0,
    explicacao: 'Para o compilador, `com.loja` e `com.loja.api` são pacotes independentes. Cada um precisa do próprio `exports`.',
  },
  {
    id: 'senior-t4-prova-q03',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais linhas são válidas dentro de uma declaração `module`? Escolha três.',
    opcoes: [
      '`requires transitive java.sql;`',
      '`exports com.loja.dto to com.loja.web;`',
      '`opens com.loja.modelo;`',
      '`requires java.sql.*;`',
      '`exports *;`',
    ],
    respostas: [0, 1, 2],
    explicacao: 'Não há curingas no `module-info`: cada módulo requerido e cada pacote exportado aparece pelo nome.',
  },
  {
    id: 'senior-t4-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.lang.module.ModuleDescriptor;
import java.lang.module.ModuleDescriptor.Requires;
import java.util.Set;
import java.util.TreeSet;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor d = ModuleDescriptor.newModule("a")
            .requires(Set.of(Requires.Modifier.TRANSITIVE), "b")
            .requires(Set.of(Requires.Modifier.STATIC), "c")
            .build();
        System.out.println(new TreeSet<>(d.requires().stream().map(r -> r.name() + r.modifiers()).toList()));
    }
}`,
    opcoes: [
      '`[b[TRANSITIVE], c[STATIC], java.base[MANDATED]]`',
      '`[b[TRANSITIVE], c[STATIC]]`',
      '`[b, c, java.base]`',
      'Lança `IllegalStateException`: `static` e `transitive` não podem ser misturados',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Cada `requires` guarda seus modificadores, e o construtor acrescenta o `java.base` como `MANDATED`.',
  },
  {
    id: 'senior-t4-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        System.out.println("montando");
        ModuleDescriptor.newModule("a").requires("b").requires("b").build();
    }
}`,
    opcoes: [
      'Imprime `montando` e lança `IllegalStateException`',
      'Imprime `montando` e monta o descritor com um só `requires b`',
      'Imprime `montando` e monta o descritor com dois `requires b`',
      'Não compila',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: 'montando' },
    explicacao: 'Um módulo não pode requerer o mesmo módulo duas vezes. O `javac` também recusa um `module-info` com `requires` repetido.',
  },
  {
    id: 'senior-t4-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O módulo `a` tem `requires transitive b;`. O módulo `b` tem `requires c;`. O módulo `d` tem `requires a;`. Quais módulos `d` lê, além do `java.base`?',
    opcoes: ['`a` e `b`', '`a`, `b` e `c`', 'Só `a`', '`a` e `c`'],
    resposta: 0,
    explicacao: 'O `transitive` de `a` repassa `b`. Mas `b` requer `c` sem `transitive`, e a cadeia para ali.',
  },
  {
    id: 'senior-t4-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class Teste {
    static Module m(String nome) {
        return ModuleLayer.boot().findModule(nome).orElseThrow();
    }

    public static void main(String[] args) {
        System.out.println(m("java.sql.rowset").canRead(m("java.xml")) + " " + m("java.sql").canRead(m("java.desktop")));
    }
}`,
    opcoes: ['`true false`', '`false false`', '`true true`', '`false true`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `java.sql.rowset` repassa o `java.sql`, que repassa o `java.xml`. O `java.sql` não tem relação nenhuma com o `java.desktop`.',
  },
  {
    id: 'senior-t4-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um framework precisa ler os campos privados das classes de `com.loja.modelo` por reflexão, mas nenhum outro módulo deve compilar contra elas. Qual diretiva usar?',
    opcoes: ['`opens com.loja.modelo;`', '`exports com.loja.modelo;`', '`requires transitive com.loja.modelo;`', '`uses com.loja.modelo;`'],
    resposta: 0,
    explicacao: '`opens` libera a reflexão profunda em tempo de execução sem tornar o pacote visível para a compilação.',
  },
  {
    id: 'senior-t4-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.lang.reflect.Field;
import java.util.HashMap;

public class Teste {
    public static void main(String[] args) throws Exception {
        Field tabela = HashMap.class.getDeclaredField("table");
        tabela.setAccessible(true);
        System.out.println("acessou");
    }
}`,
    opcoes: [
      'Lança `InaccessibleObjectException`',
      'Imprime `acessou`',
      'Lança `NoSuchFieldException`',
      'Lança `IllegalAccessException`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'InaccessibleObjectException', saida: '' },
    explicacao: 'O campo existe, mas o `java.base` não abre o pacote `java.util`. Desde o Java 17, só `--add-opens` liberaria esse acesso.',
  },
  {
    id: 'senior-t4-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual opção da JVM permite que o código do classpath acesse por reflexão os membros privados das classes de `java.util`?',
    opcoes: [
      '`--add-opens java.base/java.util=ALL-UNNAMED`',
      '`--add-exports java.util=ALL-UNNAMED`',
      '`--add-opens java.util/java.base=ALL-UNNAMED`',
      '`--add-reads java.base=java.util`',
    ],
    resposta: 0,
    explicacao: 'O formato é `modulo/pacote=destino`. Exportar não basta para membros privados, e `ALL-UNNAMED` representa o classpath.',
  },
  {
    id: 'senior-t4-prova-q11',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Num sistema com o serviço `com.api.Notificador`, a implementação `com.email.Email` e o consumidor `com.app`, onde ficam `provides` e `uses`?',
    opcoes: [
      '`provides com.api.Notificador with com.email.Email;` no módulo do e-mail; `uses com.api.Notificador;` no `com.app`',
      'Os dois no módulo da API',
      '`uses` no módulo do e-mail e `provides` no `com.app`',
      'Os dois no `com.app`',
    ],
    resposta: 0,
    explicacao: 'O provedor anuncia o que fornece; o consumidor anuncia o que procura. O módulo da API só exporta a interface.',
  },
  {
    id: 'senior-t4-prova-q12',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída, sabendo que ninguém registrou provedores de `Runnable`?',
    codigo: `import java.util.ServiceLoader;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ServiceLoader.load(Runnable.class).findFirst().isEmpty() + " " + ServiceLoader.load(Runnable.class).stream().count());
    }
}`,
    opcoes: ['`true 0`', '`false 0`', 'Lança `ServiceConfigurationError`', '`true 1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Sem provedores, o `ServiceLoader` fica vazio. Não é erro: o consumidor decide o que fazer.',
  },
  {
    id: 'senior-t4-prova-q13',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre `ServiceLoader` são verdadeiras? Escolha duas.',
    opcoes: [
      'Os provedores só são instanciados quando o iterador ou o `get()` chega neles',
      '`stream()` permite saber o tipo de cada provedor sem criá-lo',
      'O consumidor precisa declarar `requires` de cada provedor',
      'Lança exceção quando não encontra provedores',
      'Só funciona com módulos nomeados',
    ],
    respostas: [0, 1],
    explicacao: 'O carregamento é preguiçoso, e `Provider.type()` informa a classe. O consumidor não depende dos provedores, e no classpath o registro é o `META-INF/services`.',
  },
  {
    id: 'senior-t4-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual comando lista apenas os módulos do JDK de que um JAR depende?',
    opcoes: ['`jdeps --list-deps app.jar`', '`jar --describe-module --file app.jar`', '`jlink --list-modules app.jar`', '`java --list-modules app.jar`'],
    resposta: 0,
    explicacao: '`jar --describe-module` mostra o descritor gravado no JAR, se houver. `java --list-modules` lista os módulos do runtime, sem analisar a aplicação.',
  },
  {
    id: 'senior-t4-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um time roda `jlink --module-path mods --add-modules com.loja --output imagem`. O `com.loja` requer `java.sql`. O que a imagem contém?',
    opcoes: [
      '`com.loja`, `java.sql`, os módulos que o `java.sql` repassa e o `java.base`',
      'Só o `com.loja`',
      '`com.loja` e o JDK inteiro',
      '`com.loja` e `java.base`',
    ],
    resposta: 0,
    explicacao: 'O `jlink` resolve o grafo a partir dos módulos raiz e inclui tudo o que eles requerem, direta ou transitivamente.',
  },
  {
    id: 'senior-t4-prova-q16',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é a saída?',
    codigo: `import java.util.spi.ToolProvider;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ToolProvider.findFirst("jdeps").map(ToolProvider::name).orElse("nenhuma"));
    }
}`,
    opcoes: ['`jdeps`', '`nenhuma`', 'Lança `NoSuchElementException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'As ferramentas do JDK estão disponíveis como `ToolProvider`, encontradas pelo `ServiceLoader`.',
  },
  {
    id: 'senior-t4-prova-q17',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.IOException;
import java.lang.module.*;
import java.nio.file.*;
import java.util.jar.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("p");
        Path jar = pasta.resolve("my-app-utils-2.0.1.jar");
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
    opcoes: ['`my.app.utils 2.0.1`', '`my-app-utils 2.0.1`', '`my.app.utils.2.0.1` sem versão', '`myapputils 2.0.1`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `-2.0.1` vira a versão, e os hífens restantes viram pontos.',
  },
  {
    id: 'senior-t4-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Uma aplicação modular quer usar uma biblioteca que está no classpath. Por que um `requires` não resolve?',
    opcoes: [
      'O código do classpath forma o módulo sem nome, que módulos nomeados não podem requerer',
      'Porque o classpath não é lido pela JVM quando há módulos',
      'Porque `requires` só aceita módulos do JDK',
      'Resolve, desde que se use o nome do arquivo',
    ],
    resposta: 0,
    explicacao: 'A biblioteca precisa ir para o module path, onde vira um módulo automático com nome.',
  },
  {
    id: 'senior-t4-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Na migração de cima para baixo (*top-down*), o que acontece primeiro?',
    opcoes: [
      'A aplicação ganha um `module-info`, e as dependências vão para o module path como módulos automáticos',
      'Todas as bibliotecas ganham `module-info` antes da aplicação',
      'A aplicação é movida para o classpath',
      'Os módulos do JDK são substituídos por módulos automáticos',
    ],
    resposta: 0,
    explicacao: 'O top-down não espera pelas dependências. Na estratégia de baixo para cima, é o contrário: as bibliotecas sem dependências vão primeiro.',
  },
  {
    id: 'senior-t4-prova-q20',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'No Java 25, qual é a saída?',
    provas: ['831'],
    codigo: `import module java.sql;

public class Teste {
    public static void main(String[] args) {
        Logger log = Logger.getLogger("loja");
        System.out.println(log.getName() + " " + Connection.class.getModule().getName() + " " + Logger.class.getModule().getName());
    }
}`,
    opcoes: [
      '`loja java.sql java.logging`',
      'Não compila: `Logger` está em `java.logging`, que não foi importado',
      'Não compila: `import module` exige que a classe seja um módulo',
      '`loja java.sql java.sql`',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`import module java.sql` importa os pacotes exportados pelo `java.sql` e também os dos módulos que ele repassa com `requires transitive`, como o `java.logging`.',
  },
];

export default prova;
