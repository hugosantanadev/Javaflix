import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t4-e03',
  minutos: 16,
  aula,
  armadilhas: [
    '`provides ... with ...` fica no módulo do provedor; `uses ...` fica no módulo do consumidor.',
    'O consumidor não declara `requires` do provedor: só conhece a interface do serviço.',
    'O pacote da implementação não precisa ser exportado para ser um provedor.',
    'Um provedor precisa de construtor público sem argumentos, ou de um método `public static provider()` em módulos.',
    'Um módulo nomeado que chama `ServiceLoader.load` sem o `uses` correspondente recebe `ServiceConfigurationError`.',
    'Sem provedores, o `ServiceLoader` fica vazio: `findFirst()` devolve `Optional.empty`, sem exceção.',
    '`ServiceLoader` é preguiçoso: `stream()` com `Provider.type()` não instancia o provedor.',
    'No classpath, o registro é o arquivo `META-INF/services/` com o nome completo da interface.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Decoupling Modules with Services',
      url: 'https://dev.java/learn/organizing/modules/services/',
      tipo: 'documentacao',
      porque: 'O tutorial oficial de serviços entre módulos, com `uses`, `provides` e `ServiceLoader`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.ServiceLoader',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ServiceLoader.html',
      tipo: 'documentacao',
      porque: 'A referência completa: provedores em módulos e no classpath, ordem de busca e erros possíveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.ServiceLoader.Provider',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ServiceLoader.Provider.html',
      tipo: 'documentacao',
      porque: 'Como inspecionar o tipo de um provedor antes de instanciá-lo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Creating Extensible Applications',
      url: 'https://docs.oracle.com/javase/tutorial/ext/basics/spi.html',
      tipo: 'documentacao',
      porque: 'O padrão de provedores de serviço no classpath, com o arquivo `META-INF/services`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Service Provider Interface',
      url: 'https://www.baeldung.com/java-spi',
      tipo: 'artigo',
      porque: 'Um serviço completo, da interface aos provedores em JARs separados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java: Modules and Services',
      url: 'https://www.youtube.com/watch?v=RjVjm4uuMvc',
      tipo: 'video',
      porque: 'Serviços entre módulos explicados pela equipe do Java.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Developer Summit: Programming with ServiceLoader API in Java (Venkat Subramaniam)',
      url: 'https://www.youtube.com/watch?v=4mT7qPMLkYE',
      tipo: 'video',
      porque: 'O `ServiceLoader` em código ao vivo, com módulos e com o classpath.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle Developers: Venkat Subramaniam Explains Java Modules',
      url: 'https://www.youtube.com/watch?v=DItYExUOPeM',
      tipo: 'video',
      porque: 'Por que módulos existem e como serviços completam o desacoplamento.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java 9 Modularity (Sander Mak e Paul Bakker)',
      url: 'https://javamodularity.com/',
      tipo: 'livro',
      porque: 'O capítulo inteiro sobre serviços, com padrões de uso e o método `provider()`.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Services"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os quatro papéis de um serviço e as diretivas de cada módulo, como a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 12, "Modules": seção "Creating a Service"',
    },
  ],
  desafio: {
    titulo: 'Cotação de frete',
    enunciado:
      'Uma loja aceita fretes de provedores que podem ser instalados separadamente. Crie a interface de serviço `Frete`, com `boolean atende(int km)` e `long precoEmCentavos(int km)`, e três provedores: `Correios` (atende qualquer distância, R$ 15,00 mais 10 centavos por km), `Motoboy` (até 20 km, R$ 8,00 mais R$ 1,20 por km) e `RetiradaNaLoja` (até 3 km, grátis). Registre-os como na aula, num arquivo `META-INF/services` de uma pasta temporária, liste os provedores pelo tipo sem instanciá-los e cote o frete mais barato para 2, 10 e 50 km. A saída deve ser:\n\n```text\nprovedores: [Correios, Motoboy, RetiradaNaLoja]\n2 km: RetiradaNaLoja por R$ 0,00 (3 opções)\n10 km: Correios por R$ 16,00 (2 opções)\n50 km: Correios por R$ 20,00 (1 opção)\n```',
    dicas: [
      'Os provedores precisam ser `public static` e ter construtor público sem argumentos, o padrão.',
      '`loader.stream().map(ServiceLoader.Provider::get)` instancia todos; `p.type()` só informa a classe.',
      '`String.format("R$ %d,%02d", centavos / 100, centavos % 100)` monta o valor sem depender da localidade.',
    ],
    solucao: `import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.ServiceLoader;

public class Fretes {
    public interface Frete {
        boolean atende(int km);
        long precoEmCentavos(int km);
    }

    public static class Correios implements Frete {
        public boolean atende(int km) { return true; }
        public long precoEmCentavos(int km) { return 1500 + km * 10L; }
    }

    public static class Motoboy implements Frete {
        public boolean atende(int km) { return km <= 20; }
        public long precoEmCentavos(int km) { return 800 + km * 120L; }
    }

    public static class RetiradaNaLoja implements Frete {
        public boolean atende(int km) { return km <= 3; }
        public long precoEmCentavos(int km) { return 0; }
    }

    static String reais(long centavos) {
        return String.format("R$ %d,%02d", centavos / 100, centavos % 100);
    }

    static void cotar(ServiceLoader<Frete> loader, int km) {
        List<Frete> opcoes = loader.stream().map(ServiceLoader.Provider::get).filter(f -> f.atende(km)).toList();
        Frete melhor = opcoes.stream().min(Comparator.comparingLong(f -> f.precoEmCentavos(km))).orElseThrow();
        System.out.println(km + " km: " + melhor.getClass().getSimpleName() + " por " + reais(melhor.precoEmCentavos(km))
            + " (" + opcoes.size() + (opcoes.size() == 1 ? " opção)" : " opções)"));
    }

    public static void main(String[] args) throws IOException {
        Path raiz = Files.createTempDirectory("fretes");
        Path registro = raiz.resolve("META-INF/services/" + Frete.class.getName());
        Files.createDirectories(registro.getParent());
        Files.writeString(registro, String.join("\\n", Correios.class.getName(), Motoboy.class.getName(), RetiradaNaLoja.class.getName()));

        try (URLClassLoader carregador = new URLClassLoader(new URL[] {raiz.toUri().toURL()}, Fretes.class.getClassLoader())) {
            ServiceLoader<Frete> loader = ServiceLoader.load(Frete.class, carregador);
            System.out.println("provedores: " + loader.stream().map(p -> p.type().getSimpleName()).sorted().toList());
            for (int km : new int[] {2, 10, 50}) {
                cotar(loader, km);
            }
        }

        Files.delete(registro);
        Files.delete(registro.getParent());
        Files.delete(registro.getParent().getParent());
        Files.delete(raiz);
    }
}`,
    saida: 'provedores: [Correios, Motoboy, RetiradaNaLoja]\n2 km: RetiradaNaLoja por R$ 0,00 (3 opções)\n10 km: Correios por R$ 16,00 (2 opções)\n50 km: Correios por R$ 20,00 (1 opção)',
    comentarios:
      'O método `cotar` não conhece nenhum provedor pelo nome: só a interface `Frete`. Acrescentar uma transportadora seria criar a classe e uma linha no arquivo de registro, sem tocar na cotação. Com módulos, cada provedor estaria no seu módulo, com `provides Frete with ...`, e o da loja teria `uses Frete`. Aos 10 km, o motoboy custaria R$ 20,00 e perde para os Correios, por R$ 16,00.',
  },
  exercicios: [
    {
      id: 'senior-t4-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em qual `module-info.java` fica a diretiva `provides com.loja.api.Pagamento with com.loja.pix.Pix;`?',
      opcoes: [
        'No do módulo que contém a classe `Pix`',
        'No do módulo que contém a interface `Pagamento`',
        'No do módulo que usa o pagamento',
        'Em todos os três',
      ],
      resposta: 0,
      explicacao: 'Cada provedor se registra no próprio módulo. O módulo da interface só a exporta, e o consumidor declara `uses`.',
    },
    {
      id: 'senior-t4-e03-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o módulo consumidor precisa declarar para procurar provedores de `com.loja.api.Pagamento` com `ServiceLoader`?',
      opcoes: [
        '`requires com.loja.api;` e `uses com.loja.api.Pagamento;`',
        '`requires com.loja.pix;` e `requires com.loja.cartao;`',
        '`provides com.loja.api.Pagamento;`',
        '`opens com.loja.api;`',
      ],
      resposta: 0,
      explicacao: 'O consumidor lê a interface pelo módulo da API e anuncia o uso do serviço. Requerer os provedores acabaria com o desacoplamento.',
    },
    {
      id: 'senior-t4-e03-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre serviços entre módulos são verdadeiras? Escolha duas.',
      opcoes: [
        'O módulo do provedor não precisa exportar o pacote da implementação',
        'O consumidor não precisa declarar `requires` dos módulos provedores',
        'O provedor precisa ser uma classe `final`',
        'Cada serviço aceita um único provedor',
        'A interface do serviço precisa estar no mesmo módulo do consumidor',
      ],
      respostas: [0, 1],
      explicacao: 'Um serviço pode ter vários provedores, a implementação não precisa ser `final`, e a interface costuma ficar num módulo próprio de API.',
    },
    {
      id: 'senior-t4-e03-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata, sabendo que não há provedores registrados.',
      codigo: `import java.util.ServiceLoader;

public class Teste {
    interface Relatorio {
        String gerar();
    }

    public static void main(String[] args) {
        ServiceLoader<Relatorio> loader = ServiceLoader.load(Relatorio.class);
        System.out.println(loader.findFirst().isPresent() + " " + loader.stream().count());
    }
}`,
      resposta: 'false 0',
      explicacao: 'Sem provedores, o `ServiceLoader` não lança nada: só fica vazio.',
    },
    {
      id: 'senior-t4-e03-q05',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método estático que cria um localizador de serviços. O programa deve imprimir `Optional.empty`.',
      codigo: `import java.util.ServiceLoader;

public class Busca {
    interface Plugin {
        void iniciar();
    }

    public static void main(String[] args) {
        System.out.println(ServiceLoader.___(Plugin.class).findFirst());
    }
}`,
      respostas: ['load'],
      saida: 'Optional.empty',
      explicacao: '`ServiceLoader.load(Servico.class)` procura os provedores visíveis. Também há versões que recebem um carregador de classes ou uma camada de módulos.',
    },
    {
      id: 'senior-t4-e03-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.module.ModuleDescriptor;
import java.util.List;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor pix = ModuleDescriptor.newModule("com.loja.pix")
            .requires("com.loja.api")
            .provides("com.loja.api.Pagamento", List.of("com.loja.pix.Pix"))
            .build();
        System.out.println(pix.provides() + " " + pix.exports());
    }
}`,
      opcoes: [
        '`[com.loja.api.Pagamento with [com.loja.pix.Pix]] []`',
        '`[com.loja.pix.Pix] [com.loja.pix]`',
        'Lança `IllegalStateException`: o pacote do provedor precisa ser exportado',
        '`[com.loja.api.Pagamento with [com.loja.pix.Pix]] [com.loja.pix]`',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O descritor registra o serviço e a implementação, sem exportar nenhum pacote. O pacote `com.loja.pix` passa a fazer parte do módulo, mas continua fechado.',
    },
    {
      id: 'senior-t4-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.file.spi.FileSystemProvider;

public class Teste {
    public static void main(String[] args) {
        System.out.println(FileSystemProvider.installedProviders().stream().map(FileSystemProvider::getScheme).sorted().toList());
    }
}`,
      opcoes: ['`[file, jar, jrt]`', '`[file]`', '`[]`', '`[file, http, jar]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Além do sistema de arquivos padrão, `file`, o JDK traz provedores para ZIP e JAR (`jar`) e para as classes do próprio JDK (`jrt`), descobertos como serviços.',
    },
    {
      id: 'senior-t4-e03-q08',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.ServiceLoader;

public class Teste {
    interface Pagamento {
        String nome();
    }

    public static void main(String[] args) {
        ServiceLoader<Pagamento> loader = ServiceLoader.load("Pagamento");
        System.out.println(loader.findFirst());
    }
}`,
      resposta: 9,
      explicacao: '`ServiceLoader.load` recebe o objeto `Class` do serviço, como `Pagamento.class`, e não o nome em texto.',
    },
    {
      id: 'senior-t4-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma classe provedora tem só um construtor `public Pix(String chave)`. O que é preciso para ela funcionar como provedor num módulo?',
      opcoes: [
        'Acrescentar um construtor público sem argumentos ou um método `public static Pix provider()`',
        'Nada: o `ServiceLoader` passa `null` para a chave',
        'Torná-la `abstract`',
        'Exportar o pacote dela',
      ],
      resposta: 0,
      explicacao: 'O `ServiceLoader` não sabe que argumentos passar. Ele usa o construtor sem argumentos ou, em módulos, o método estático `provider()`.',
    },
    {
      id: 'senior-t4-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num JAR usado pelo classpath, sem módulos, onde se registra que `com.loja.pix.Pix` implementa o serviço `com.loja.api.Pagamento`?',
      opcoes: [
        'Num arquivo `META-INF/services/com.loja.api.Pagamento` contendo a linha `com.loja.pix.Pix`',
        'Num arquivo `META-INF/services/com.loja.pix.Pix` contendo `com.loja.api.Pagamento`',
        'No `MANIFEST.MF`, com `Service-Provider: com.loja.pix.Pix`',
        'Numa anotação `@Provides` na classe `Pix`',
      ],
      resposta: 0,
      explicacao: 'O nome do arquivo é o nome completo da interface do serviço, e cada linha lista uma implementação.',
    },
    {
      id: 'senior-t4-e03-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O arquivo de registro aponta para uma classe que não implementa o serviço. Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.*;
import java.util.ServiceLoader;

public class Teste {
    public interface Pagamento {
        String nome();
    }

    public static void main(String[] args) throws IOException {
        Path raiz = Files.createTempDirectory("servicos");
        Path registro = raiz.resolve("META-INF/services/" + Pagamento.class.getName());
        Files.createDirectories(registro.getParent());
        Files.writeString(registro, Teste.class.getName());
        raiz.toFile().deleteOnExit();
        registro.getParent().getParent().toFile().deleteOnExit();
        registro.getParent().toFile().deleteOnExit();
        registro.toFile().deleteOnExit();
        URLClassLoader carregador = new URLClassLoader(new URL[] {raiz.toUri().toURL()});
        System.out.println("procurando");
        for (Pagamento p : ServiceLoader.load(Pagamento.class, carregador)) {
            System.out.println(p.nome());
        }
    }
}`,
      opcoes: [
        'Imprime `procurando` e lança `ServiceConfigurationError`',
        'Imprime `procurando` e ignora a classe inválida',
        'Imprime `procurando` e lança `ClassCastException`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ServiceConfigurationError', saida: 'procurando' },
      explicacao: '`Teste` não implementa `Pagamento`. O erro só aparece quando o iterador chega nessa entrada, e é um `Error`, não uma `Exception`.',
    },
    {
      id: 'senior-t4-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um aplicativo quer listar os nomes das classes provedoras de um serviço sem criar nenhuma instância. Qual trecho faz isso?',
      opcoes: [
        '`loader.stream().map(p -> p.type().getName()).toList()`',
        '`loader.stream().map(p -> p.get().getClass().getName()).toList()`',
        '`for (Servico s : loader) nomes.add(s.getClass().getName());`',
        '`loader.findFirst().get().getClass().getName()`',
      ],
      resposta: 0,
      explicacao: '`Provider.type()` devolve a classe sem instanciá-la. As outras alternativas criam os objetos, com `get()` ou pelo iterador.',
    },
    {
      id: 'senior-t4-e03-q13',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.println(ModuleLayer.boot().findModule("java.sql").orElseThrow().getDescriptor().uses());
    }
}`,
      opcoes: ['`[java.sql.Driver]`', '`[]`', '`[java.sql.Connection]`', '`[java.sql]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `DriverManager` encontra os drivers JDBC como provedores do serviço `java.sql.Driver`, e por isso o módulo declara `uses`.',
    },
    {
      id: 'senior-t4-e03-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o módulo consumidor de um serviço não deve declarar `requires` dos módulos provedores?',
      opcoes: [
        'Para não depender das implementações: provedores podem ser trocados ou acrescentados sem recompilar o consumidor',
        'Porque `requires` e `uses` não podem aparecer juntos',
        'Porque provedores não podem ser lidos por outros módulos',
        'Porque o `requires` faria o `ServiceLoader` ignorar o provedor',
      ],
      resposta: 0,
      explicacao: 'O ponto dos serviços é o desacoplamento. Na resolução, a JVM acrescenta ao grafo os módulos que fornecem os serviços usados, sem precisar de `requires`.',
    },
    {
      id: 'senior-t4-e03-q15',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destes são serviços que o JDK descobre com `ServiceLoader`? Escolha três.',
      opcoes: ['`java.sql.Driver`', '`java.nio.file.spi.FileSystemProvider`', '`java.nio.charset.spi.CharsetProvider`', '`java.lang.String`', '`java.lang.Thread`'],
      respostas: [0, 1, 2],
      explicacao: 'Drivers JDBC, sistemas de arquivos e codificações de caracteres são pontos de extensão. `String` e `Thread` são classes comuns.',
    },
  ],
};

export default episodio;
