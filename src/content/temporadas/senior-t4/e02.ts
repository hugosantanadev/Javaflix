import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t4-e02',
  minutos: 16,
  aula,
  armadilhas: [
    '`requires transitive` repassa a legibilidade a quem requer o módulo; o `requires` comum, não.',
    '`requires static` é obrigatório para compilar e opcional para executar.',
    '`exports` não libera reflexão profunda: `setAccessible` em membros privados exige `opens`.',
    '`opens` libera a reflexão, mas não permite compilar contra os tipos do pacote.',
    'Um `open module` abre todos os pacotes e não pode ter diretivas `opens`.',
    'Sem abertura, `setAccessible(true)` lança `InaccessibleObjectException`; `trySetAccessible()` devolve `false`.',
    'Desde o Java 17, só `--add-opens` libera reflexão profunda nas partes internas do JDK.',
    '`getDeclaredField` declara `NoSuchFieldException`, uma exceção checked.',
  ],
  recursos: [
    {
      titulo: 'Dev.java: Implied Readability with requires transitive',
      url: 'https://dev.java/learn/organizing/modules/implied-readability/',
      tipo: 'documentacao',
      porque: 'Quando repassar uma dependência e o que acontece com quem requer o módulo.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Optional Dependencies with requires static',
      url: 'https://dev.java/learn/organizing/modules/optional-dependencies/',
      tipo: 'documentacao',
      porque: 'Dependências só de compilação e como testar se o módulo está presente.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Reflective Access with Open Modules and Open Packages',
      url: 'https://dev.java/learn/organizing/modules/opening-for-reflection/',
      tipo: 'documentacao',
      porque: '`opens`, `opens ... to` e `open module`, com o caso dos frameworks.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Circumventing Strong Encapsulation with --add-exports and --add-opens',
      url: 'https://dev.java/learn/organizing/modules/add-exports-opens/',
      tipo: 'documentacao',
      porque: 'As opções de linha de comando que abrem exceções ao encapsulamento.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Extending the Module Graph with --add-modules and --add-reads',
      url: 'https://dev.java/learn/organizing/modules/add-modules-reads/',
      tipo: 'documentacao',
      porque: 'Incluir módulos na resolução e criar leituras que o descritor não declara.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 403: Strongly Encapsulate JDK Internals',
      url: 'https://openjdk.org/jeps/403',
      tipo: 'documentacao',
      porque: 'O fim do `--illegal-access` no Java 17 e a lista de APIs internas que continuam acessíveis.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.lang.reflect.AccessibleObject',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/AccessibleObject.html',
      tipo: 'documentacao',
      porque: 'As regras exatas de quando `setAccessible` funciona com módulos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: A Guide to Java 9 Modularity',
      url: 'https://www.baeldung.com/java-9-modularity',
      tipo: 'artigo',
      porque: 'Todas as diretivas do descritor, incluindo `requires transitive`, `requires static` e `opens`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Illegal Reflective Access Warning',
      url: 'https://www.baeldung.com/java-illegal-reflective-access',
      tipo: 'artigo',
      porque: 'A origem do aviso de acesso ilegal e como `--add-opens` o resolve.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Laur Spilca: Java Modules, Project Jigsaw and Java 9 syntax',
      url: 'https://www.youtube.com/watch?v=HeRZRGdvyL4',
      tipo: 'video',
      porque: 'A sintaxe do descritor, com `requires transitive` e `opens`, em exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Devoxx: Modules in One Lesson (Mark Reinhold)',
      url: 'https://www.youtube.com/watch?v=rFhhLXcOBsk',
      tipo: 'video',
      porque: 'O arquiteto da plataforma demonstra legibilidade, exportações e encapsulamento ao vivo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: '`requires transitive`, `opens` e as tabelas de acesso que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 12, "Modules": seção "Diving into the Module Declaration"',
    },
  ],
  desafio: {
    titulo: 'Inspetor de objetos',
    enunciado:
      'Escreva `static String inspecionar(Object objeto)`, que lista os campos de instância do objeto (sem os estáticos) em ordem alfabética, no formato `nome=valor`, e diz se o pacote da classe está aberto para o módulo do inspetor. Use `trySetAccessible()`: se o acesso for negado, mostre `?` no lugar do valor, sem lançar exceção. Inspecione um `record Produto(String nome, int quantidade)` criado no próprio programa e um `LocalDate.of(2025, 3, 14)`. A saída deve ser:\n\n```text\nProduto [aberto]: nome=caneta, quantidade=3\nLocalDate [fechado]: day=?, month=?, year=?\n```',
    dicas: [
      '`Modifier.isStatic(campo.getModifiers())` identifica os campos estáticos.',
      '`tipo.getModule().isOpen(tipo.getPackageName(), Inspetor.class.getModule())` diz se o pacote está aberto para você.',
      'Mesmo com `trySetAccessible()` devolvendo `true`, `get` declara `IllegalAccessException`.',
    ],
    solucao: `import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;

public class Inspetor {
    record Produto(String nome, int quantidade) {}

    static String inspecionar(Object objeto) {
        Class<?> tipo = objeto.getClass();
        String campos = Arrays.stream(tipo.getDeclaredFields())
            .filter(f -> !Modifier.isStatic(f.getModifiers()))
            .sorted(Comparator.comparing(Field::getName))
            .map(f -> f.getName() + "=" + valor(f, objeto))
            .collect(Collectors.joining(", "));
        String pacote = tipo.getPackageName();
        boolean aberto = tipo.getModule().isOpen(pacote, Inspetor.class.getModule());
        return tipo.getSimpleName() + " [" + (aberto ? "aberto" : "fechado") + "]: " + campos;
    }

    static String valor(Field campo, Object objeto) {
        if (!campo.trySetAccessible()) {
            return "?";
        }
        try {
            return String.valueOf(campo.get(objeto));
        } catch (IllegalAccessException e) {
            return "?";
        }
    }

    public static void main(String[] args) {
        System.out.println(inspecionar(new Produto("caneta", 3)));
        System.out.println(inspecionar(LocalDate.of(2025, 3, 14)));
    }
}`,
    saida: 'Produto [aberto]: nome=caneta, quantidade=3\nLocalDate [fechado]: day=?, month=?, year=?',
    comentarios:
      'O `Produto` está no módulo sem nome, que é aberto a todos, e por isso seus campos privados se deixam ler. O `LocalDate` está no pacote `java.time`, que o `java.base` exporta mas não abre: os nomes dos campos aparecem, porque `getDeclaredFields` só lista, mas os valores não. Bibliotecas de serialização em JSON enfrentam exatamente isso, e por isso pedem que os pacotes das entidades sejam abertos para elas.',
  },
  exercicios: [
    {
      id: 'senior-t4-e02-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O módulo `com.loja` declara `requires transitive java.logging;`. O módulo `com.app` declara só `requires com.loja;`. O que `com.app` pode fazer?',
      opcoes: [
        'Usar os tipos exportados de `com.loja` e também os de `java.logging`',
        'Usar só os tipos de `com.loja`',
        'Usar só os tipos de `java.logging`',
        'Nada: `com.app` precisa declarar `requires transitive com.loja`',
      ],
      resposta: 0,
      explicacao: 'O `transitive` faz quem lê `com.loja` ler também `java.logging`. É o caso de uma API que devolve um `Logger`.',
    },
    {
      id: 'senior-t4-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.module.ModuleDescriptor.Requires;

public class Teste {
    public static void main(String[] args) {
        System.out.println(ModuleLayer.boot().findModule("java.sql").orElseThrow().getDescriptor().requires().stream()
            .filter(r -> r.modifiers().contains(Requires.Modifier.TRANSITIVE))
            .count());
    }
}`,
      opcoes: ['`3`', '`0`', '`1`', '`4`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `java.sql` repassa `java.logging`, `java.xml` e `java.transaction.xa`. O `java.base`, implícito, não é transitivo.',
    },
    {
      id: 'senior-t4-e02-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `requires static` são verdadeiras? Escolha duas.',
      opcoes: [
        'O módulo requerido precisa estar presente para compilar',
        'O módulo requerido pode faltar na execução',
        'A dependência é repassada a quem requer o módulo',
        'Libera reflexão profunda no módulo requerido',
        'Só pode ser usado com módulos do JDK',
      ],
      respostas: [0, 1],
      explicacao: '`static` torna a dependência opcional em tempo de execução. Quem repassa é o `transitive`, e quem libera reflexão é o `opens`.',
    },
    {
      id: 'senior-t4-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.lang.reflect.Field;
import java.util.ArrayList;

public class Teste {
    public static void main(String[] args) throws Exception {
        Field dados = ArrayList.class.getDeclaredField("elementData");
        System.out.println("antes");
        dados.setAccessible(true);
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `InaccessibleObjectException`',
        'Imprime `antes` e termina normalmente',
        'Lança `NoSuchFieldException` antes de imprimir',
        'Imprime `antes` e lança `IllegalAccessException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'InaccessibleObjectException', saida: 'antes' },
      explicacao: 'Obter o `Field` funciona, porque é só consultar. Torná-lo acessível exige que `java.util` esteja aberto para o chamador, e o `java.base` não o abre.',
    },
    {
      id: 'senior-t4-e02-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Teste {
    private int x = 1;

    public static void main(String[] args) throws Exception {
        System.out.println(Teste.class.getDeclaredField("x").trySetAccessible() + " " + String.class.getDeclaredField("value").trySetAccessible());
    }
}`,
      resposta: 'true false',
      explicacao: 'A própria classe pode abrir seus campos. O campo privado de `String` fica num pacote fechado, e `trySetAccessible` devolve `false` em vez de lançar exceção.',
    },
    {
      id: 'senior-t4-e02-q06',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método que tenta tornar o campo acessível sem lançar exceção. O programa deve imprimir `false`.',
      codigo: `import java.lang.reflect.Field;

public class Tentativa {
    public static void main(String[] args) throws Exception {
        Field campo = String.class.getDeclaredField("value");
        System.out.println(campo.___());
    }
}`,
      respostas: ['trySetAccessible'],
      saida: 'false',
      explicacao: '`trySetAccessible()`, do Java 9, devolve se conseguiu. `setAccessible(true)` lançaria `InaccessibleObjectException`.',
    },
    {
      id: 'senior-t4-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.lang.reflect.Field;

public class Teste {
    private String nome = "ana";

    public static void main(String[] args) {
        Field campo = Teste.class.getDeclaredField("nome");
        System.out.println(campo.getName());
    }
}`,
      resposta: 7,
      explicacao: '`getDeclaredField` declara `NoSuchFieldException`, uma exceção checked, que precisa ser tratada ou declarada no `main`.',
    },
    {
      id: 'senior-t4-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O pacote `com.loja.modelo` aparece num `opens`, mas não num `exports`. O que outro módulo pode fazer com as classes dele?',
      opcoes: [
        'Acessá-las por reflexão, inclusive os membros privados, mas não compilar contra elas',
        'Compilar contra elas, mas não acessá-las por reflexão',
        'Compilar contra elas e acessá-las por reflexão',
        'Nada: sem `exports`, o pacote é invisível',
      ],
      resposta: 0,
      explicacao: '`opens` trata só do acesso em tempo de execução, por reflexão. Compilar contra o pacote exigiria `exports`.',
    },
    {
      id: 'senior-t4-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        System.out.println("montando");
        ModuleDescriptor.newOpenModule("com.app").opens("com.app.modelo").build();
    }
}`,
      opcoes: [
        'Imprime `montando` e lança `IllegalStateException`',
        'Imprime `montando` e monta o descritor',
        'Não compila: `newOpenModule` não existe',
        'Imprime `montando` e lança `IllegalArgumentException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalStateException', saida: 'montando' },
      explicacao: 'Um `open module` já abre todos os pacotes, e uma diretiva `opens` nele é proibida, no descritor e no `module-info.java`.',
    },
    {
      id: 'senior-t4-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma biblioteca antiga, rodando pelo classpath no Java 21, falha ao acessar por reflexão um campo privado de `java.lang.Thread`. Qual opção da JVM resolve, sem mudar o código?',
      opcoes: [
        '`--add-opens java.base/java.lang=ALL-UNNAMED`',
        '`--add-exports java.base/java.lang=ALL-UNNAMED`',
        '`--illegal-access=permit`',
        '`--add-reads java.base=ALL-UNNAMED`',
      ],
      resposta: 0,
      explicacao: 'Reflexão profunda exige abertura, não exportação, e `java.lang` já é exportado. O `--illegal-access` foi removido no Java 17.',
    },
    {
      id: 'senior-t4-e02-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.lang.module.ModuleDescriptor;

public class Teste {
    public static void main(String[] args) {
        ModuleDescriptor d = ModuleDescriptor.newOpenModule("com.app").build();
        System.out.println(d.isOpen() + " " + d.opens());
    }
}`,
      opcoes: ['`true []`', '`false []`', '`true [com.app]`', '`true null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O módulo inteiro é aberto, sem precisar de diretivas `opens`: a lista fica vazia.',
    },
    {
      id: 'senior-t4-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'As entidades JPA de `com.loja` ficam em `com.loja.entidades`. O código de outros módulos não deve usá-las, mas o Hibernate precisa preencher seus campos privados. Qual diretiva é a mais adequada?',
      opcoes: [
        '`opens com.loja.entidades to org.hibernate.orm.core;`',
        '`exports com.loja.entidades;`',
        '`exports com.loja.entidades to org.hibernate.orm.core;`',
        '`requires transitive org.hibernate.orm.core;`',
      ],
      resposta: 0,
      explicacao: 'O Hibernate precisa de reflexão profunda, que só `opens` dá. A forma qualificada restringe a abertura ao módulo dele, sem expor as entidades a mais ninguém.',
    },
    {
      id: 'senior-t4-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são opções válidas da linha de comando do `java` para contornar o encapsulamento dos módulos? Escolha três.',
      opcoes: ['`--add-opens`', '`--add-exports`', '`--add-reads`', '`--add-requires`', '`--open-module`'],
      respostas: [0, 1, 2],
      explicacao: 'As opções reais são `--add-opens`, `--add-exports`, `--add-reads` e `--add-modules`. As outras duas não existem.',
    },
    {
      id: 'senior-t4-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `public class Teste {
    public static void main(String[] args) throws Exception {
        System.out.println(String.class.getMethod("toUpperCase").invoke("abc"));
    }
}`,
      opcoes: ['`ABC`', 'Lança `InaccessibleObjectException`', '`abc`', 'Lança `IllegalAccessException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Reflexão sobre membros públicos de pacotes exportados continua livre. O encapsulamento só barra o acesso a membros não públicos ou a pacotes não exportados.',
    },
    {
      id: 'senior-t4-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Quando faz sentido declarar `requires transitive` em vez de `requires`?',
      opcoes: [
        'Quando tipos do outro módulo aparecem na API pública do seu, em parâmetros, retornos ou exceções',
        'Sempre, para facilitar a vida de quem usa o módulo',
        'Quando o outro módulo só é usado internamente',
        'Quando o outro módulo é opcional em tempo de execução',
      ],
      resposta: 0,
      explicacao: 'Repassar uma dependência que é só detalhe de implementação acopla os clientes a ela sem necessidade. Para dependências opcionais, o modificador é `static`.',
    },
  ],
};

export default episodio;
