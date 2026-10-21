import type { EpisodioConteudo } from '../../types';
import aula from './e06.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t3-e06',
  minutos: 17,
  aula,
  armadilhas: [
    '`Files.list` só devolve os filhos diretos; `Files.walk` desce a árvore inteira e inclui a pasta inicial.',
    '`Files.walk(inicio, 0)` devolve só o próprio início.',
    'A ordem de `list`, `walk` e `find` não é garantida: ordene se precisar de uma ordem.',
    '`list`, `walk` e `find` devolvem streams que seguram pastas abertas: feche-os.',
    'No glob, `*` não atravessa pastas; `**` atravessa.',
    '`BasicFileAttributes` é somente leitura; para alterar datas, use `BasicFileAttributeView`.',
    '`Files.list` num arquivo comum lança `NotDirectoryException`; `Files.walk` num caminho inexistente lança `NoSuchFileException`.',
    '`SKIP_SUBTREE` só faz sentido em `preVisitDirectory`; para parar tudo, use `TERMINATE`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Walking the File Tree',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/walk.html',
      tipo: 'documentacao',
      porque: '`FileVisitor`, a ordem das chamadas e os valores de `FileVisitResult`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Finding Files',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/find.html',
      tipo: 'documentacao',
      porque: 'A sintaxe de glob e o `PathMatcher` num visitante que procura arquivos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Managing Metadata',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/fileAttr.html',
      tipo: 'documentacao',
      porque: 'Atributos básicos, DOS e POSIX, com as visões que permitem alterá-los.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Walking the File Tree',
      url: 'https://dev.java/learn/api/io/java-io/file-system/walking-tree/',
      tipo: 'documentacao',
      porque: 'O percurso com `FileVisitor`, incluindo cópia e exclusão recursivas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Listing the Content of a Directory',
      url: 'https://dev.java/learn/api/io/java-io/file-system/listing/',
      tipo: 'documentacao',
      porque: '`Files.list`, `DirectoryStream` e os filtros por glob.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Managing File Attributes',
      url: 'https://dev.java/learn/api/io/java-io/file-system/metadata/',
      tipo: 'documentacao',
      porque: 'Leitura e alteração de atributos, com as diferenças entre sistemas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.nio.file.FileSystem (getPathMatcher)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/FileSystem.html',
      tipo: 'documentacao',
      porque: 'A especificação completa da sintaxe de glob e de regex em `getPathMatcher`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: A Guide To NIO2 FileVisitor',
      url: 'https://www.baeldung.com/java-nio2-file-visitor',
      tipo: 'artigo',
      porque: 'Um buscador de arquivos com `SimpleFileVisitor`, método a método.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: List Files in a Directory in Java',
      url: 'https://www.baeldung.com/java-list-directory-files',
      tipo: 'artigo',
      porque: 'As formas de listar uma pasta, com e sem recursão, comparadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Delete a Directory Recursively in Java',
      url: 'https://www.baeldung.com/java-delete-directory',
      tipo: 'artigo',
      porque: 'O truque da ordem reversa e a versão com `walkFileTree`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: NIO pt 06, BasicFileAttributes',
      url: 'https://www.youtube.com/watch?v=7ccX4cxlWOg',
      tipo: 'video',
      porque: 'Lendo e alterando atributos de arquivos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: NIO pt 11, SimpleFileVisitor',
      url: 'https://www.youtube.com/watch?v=1-fBnhNcbmY',
      tipo: 'video',
      porque: 'Percorrendo uma árvore de pastas com um visitante, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: NIO pt 13, PathMatcher',
      url: 'https://www.youtube.com/watch?v=m5jwgf8FEl0',
      tipo: 'video',
      porque: 'Padrões glob e o `PathMatcher`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
  ],
  desafio: {
    titulo: 'Inventário de projeto',
    enunciado:
      'Crie numa pasta temporária os arquivos `src/Main.java` (120 bytes), `src/util/Texto.java` (80), `docs/guia.md` (300), `docs/notas.md` (50), `README.md` (30) e `build/app.jar` (1000). Percorra a árvore com `walkFileTree`, ignorando a pasta `build`, e calcule, por extensão, quantos arquivos há e quantos bytes somam, além do maior arquivo e de quantas pastas foram visitadas. Use os atributos que o visitante recebe, sem chamar `Files.size`. Apague tudo no fim. A saída deve ser:\n\n```text\njava: 2 arquivos, 200 bytes\nmd: 3 arquivos, 380 bytes\nmaior: docs/guia.md (300 bytes)\npastas visitadas: 4 (build ignorada)\n```',
    dicas: [
      '`"x".repeat(n)` gera um conteúdo de exatamente `n` bytes.',
      'Em `preVisitDirectory`, devolva `SKIP_SUBTREE` para a pasta `build`.',
      'Um `TreeMap` deixa as extensões em ordem alfabética.',
    ],
    solucao: `import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Stream;

public class Inventario {
    static void criar(Path raiz, String caminho, int bytes) throws IOException {
        Path arquivo = raiz.resolve(caminho);
        Files.createDirectories(arquivo.getParent());
        Files.writeString(arquivo, "x".repeat(bytes));
    }

    static String extensao(Path arquivo) {
        String nome = arquivo.getFileName().toString();
        return nome.substring(nome.lastIndexOf('.') + 1);
    }

    public static void main(String[] args) throws IOException {
        Path raiz = Files.createTempDirectory("inventario");
        criar(raiz, "src/Main.java", 120);
        criar(raiz, "src/util/Texto.java", 80);
        criar(raiz, "docs/guia.md", 300);
        criar(raiz, "docs/notas.md", 50);
        criar(raiz, "README.md", 30);
        criar(raiz, "build/app.jar", 1000);

        Map<String, Integer> quantidade = new TreeMap<>();
        Map<String, Long> bytes = new TreeMap<>();
        Path[] maior = new Path[1];
        long[] tamanhoMaior = {-1};
        int[] pastas = {0};

        Files.walkFileTree(raiz, new SimpleFileVisitor<>() {
            @Override
            public FileVisitResult preVisitDirectory(Path pasta, BasicFileAttributes attrs) {
                if (pasta.getFileName().toString().equals("build")) {
                    return FileVisitResult.SKIP_SUBTREE;
                }
                pastas[0]++;
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path arquivo, BasicFileAttributes attrs) {
                String ext = extensao(arquivo);
                quantidade.merge(ext, 1, Integer::sum);
                bytes.merge(ext, attrs.size(), Long::sum);
                if (attrs.size() > tamanhoMaior[0]) {
                    tamanhoMaior[0] = attrs.size();
                    maior[0] = arquivo;
                }
                return FileVisitResult.CONTINUE;
            }
        });

        for (String ext : quantidade.keySet()) {
            System.out.println(ext + ": " + quantidade.get(ext) + " arquivos, " + bytes.get(ext) + " bytes");
        }
        String nomeMaior = raiz.relativize(maior[0]).toString().replace(File.separatorChar, '/');
        System.out.println("maior: " + nomeMaior + " (" + tamanhoMaior[0] + " bytes)");
        System.out.println("pastas visitadas: " + pastas[0] + " (build ignorada)");

        try (Stream<Path> todos = Files.walk(raiz)) {
            todos.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
    saida: 'java: 2 arquivos, 200 bytes\nmd: 3 arquivos, 380 bytes\nmaior: docs/guia.md (300 bytes)\npastas visitadas: 4 (build ignorada)',
    comentarios:
      'As quatro pastas visitadas são a raiz, `src`, `src/util` e `docs`; o `SKIP_SUBTREE` impediu que o visitante entrasse em `build`, e o `app.jar`, o maior arquivo de todos, ficou de fora. Como a classe anônima não pode alterar variáveis locais, os contadores vivem em arrays de uma posição, um truque comum; um campo ou uma classe visitante nomeada também serviriam. Os atributos chegam prontos em `visitFile`, sem uma nova consulta ao disco por arquivo.',
  },
  exercicios: [
    {
      id: 'senior-t3-e06-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A pasta `base` contém `a.txt` e a subpasta `sub`, com `b.txt` dentro. Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.Comparator;
import java.util.stream.Stream;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("questao");
        Files.writeString(base.resolve("a.txt"), "a");
        Files.createDirectory(base.resolve("sub"));
        Files.writeString(base.resolve("sub/b.txt"), "b");
        try (Stream<Path> s0 = Files.walk(base, 0);
             Stream<Path> s1 = Files.walk(base, 1);
             Stream<Path> s = Files.walk(base);
             Stream<Path> l = Files.list(base)) {
            System.out.println(s0.count() + " " + s1.count() + " " + s.count() + " " + l.count());
        }
        try (Stream<Path> t = Files.walk(base)) {
            t.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
      opcoes: ['`1 3 4 2`', '`0 2 3 2`', '`1 2 3 2`', '`0 3 4 3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`walk` inclui o início: com profundidade 0, só ele; com 1, ele mais `a.txt` e `sub`; sem limite, também `b.txt`. `list` devolve só os dois filhos.',
    },
    {
      id: 'senior-t3-e06-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais caminhos casam com o padrão `glob:*.txt`? Escolha dois.',
      opcoes: ['`notas.txt`', '`a.txt`', '`docs/notas.txt`', '`notas.txt.bak`', '`notastxt`'],
      respostas: [0, 1],
      explicacao: 'O `*` não atravessa a separação de pastas, e o padrão precisa casar com o caminho inteiro, até o fim.',
    },
    {
      id: 'senior-t3-e06-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.nio.file.*;

public class Teste {
    public static void main(String[] args) {
        PathMatcher m = FileSystems.getDefault().getPathMatcher("glob:v?.{txt,md}");
        System.out.println(m.matches(Path.of("v1.txt")) + " " + m.matches(Path.of("v12.txt")) + " " + m.matches(Path.of("v2.md")));
    }
}`,
      resposta: 'true false true',
      explicacao: 'O `?` casa com exatamente um caractere, então `v12` não passa. As chaves aceitam qualquer uma das extensões.',
    },
    {
      id: 'senior-t3-e06-q04',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com o método que percorre a árvore filtrando por caminho e atributos. O programa deve imprimir `2`.',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.Comparator;
import java.util.stream.Stream;

public class Busca {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("busca");
        Files.createDirectories(base.resolve("x/y"));
        Files.writeString(base.resolve("x/um.txt"), "1");
        Files.writeString(base.resolve("x/y/dois.txt"), "2");
        try (Stream<Path> achados = Files.___(base, 5, (p, atributos) -> atributos.isRegularFile())) {
            System.out.println(achados.count());
        }
        try (Stream<Path> t = Files.walk(base)) {
            t.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
      respostas: ['find'],
      saida: '2',
      explicacao: '`Files.find` recebe a profundidade e um `BiPredicate<Path, BasicFileAttributes>`. Só os dois arquivos passam pelo filtro.',
    },
    {
      id: 'senior-t3-e06-q05',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path p = Path.of("dados.txt");
        BasicFileAttributes a = Files.readAttributes(p, BasicFileAttributes.class);
        System.out.println(a.size());
        a.setTimes(FileTime.fromMillis(0), null, null);
    }
}`,
      resposta: 10,
      explicacao: '`BasicFileAttributes` é um retrato somente leitura. `setTimes` pertence a `BasicFileAttributeView`, obtida com `Files.getFileAttributeView`.',
    },
    {
      id: 'senior-t3-e06-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Para apagar uma árvore com `Files.walk(raiz)`, por que se ordenam os caminhos com `Comparator.reverseOrder()` antes de apagar?',
      opcoes: [
        'Na ordem reversa, cada arquivo vem antes da pasta que o contém, e as pastas são apagadas já vazias',
        'Porque `walk` só funciona em ordem reversa',
        'Para apagar primeiro os arquivos maiores',
        'Porque `Files.delete` exige caminhos ordenados',
      ],
      resposta: 0,
      explicacao: 'Um caminho mais longo, como `raiz/a/b.txt`, vem depois de `raiz/a` na ordem natural. Invertida, a ordem põe o conteúdo antes da pasta.',
    },
    {
      id: 'senior-t3-e06-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num `FileVisitor`, o que devolver em `preVisitDirectory` para não entrar numa pasta, continuando o resto do percurso?',
      opcoes: ['`FileVisitResult.SKIP_SUBTREE`', '`FileVisitResult.TERMINATE`', '`FileVisitResult.SKIP_SIBLINGS`', '`null`'],
      resposta: 0,
      explicacao: '`TERMINATE` encerra todo o percurso, e `SKIP_SIBLINGS` pula as pastas e arquivos irmãos. Só `SKIP_SUBTREE` pula exatamente aquela pasta.',
    },
    {
      id: 'senior-t3-e06-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A pasta contém `a.txt`, `node_modules/x.js` e `src/b.txt`. Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Comparator;
import java.util.stream.Stream;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("questao");
        Files.createDirectories(base.resolve("node_modules"));
        Files.createDirectories(base.resolve("src"));
        Files.writeString(base.resolve("a.txt"), "1");
        Files.writeString(base.resolve("node_modules/x.js"), "2");
        Files.writeString(base.resolve("src/b.txt"), "3");
        int[] arquivos = {0};
        Files.walkFileTree(base, new SimpleFileVisitor<>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                return dir.endsWith("node_modules") ? FileVisitResult.SKIP_SUBTREE : FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                arquivos[0]++;
                return FileVisitResult.CONTINUE;
            }
        });
        System.out.println(arquivos[0]);
        try (Stream<Path> t = Files.walk(base)) {
            t.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
      opcoes: ['`2`', '`3`', '`1`', '`0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `node_modules` é pulado inteiro, e o `x.js` nunca é visitado. Sobram `a.txt` e `src/b.txt`.',
    },
    {
      id: 'senior-t3-e06-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.stream.Stream;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path arquivo = Files.createTempFile("comum", ".txt");
        arquivo.toFile().deleteOnExit();
        System.out.println(Files.isRegularFile(arquivo));
        try (Stream<Path> s = Files.list(arquivo)) {
            System.out.println(s.count());
        }
    }
}`,
      opcoes: [
        'Imprime `true` e lança `NotDirectoryException`',
        'Imprime `true` e `0`',
        'Imprime `true` e `1`',
        'Imprime `true` e lança `NoSuchFileException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NotDirectoryException', saida: 'true' },
      explicacao: '`Files.list` exige uma pasta. Num arquivo comum, lança `NotDirectoryException`, uma `FileSystemException`.',
    },
    {
      id: 'senior-t3-e06-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar, se a pasta não existir?',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.stream.Stream;

public class Teste {
    public static void main(String[] args) throws IOException {
        System.out.println("percorrendo");
        try (Stream<Path> s = Files.walk(Path.of("pasta-inexistente-javaflix"))) {
            System.out.println(s.count());
        }
    }
}`,
      opcoes: [
        'Imprime `percorrendo` e lança `NoSuchFileException`',
        'Imprime `percorrendo` e `0`',
        'Imprime `percorrendo` e `1`',
        'Imprime `percorrendo` e lança `NotDirectoryException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchFileException', saida: 'percorrendo' },
      explicacao: 'O `walk` precisa ler os atributos do ponto de partida logo de início, e falha se ele não existir.',
    },
    {
      id: 'senior-t3-e06-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.time.Instant;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("questao");
        Path arquivo = Files.writeString(pasta.resolve("a.txt"), "abc");
        Files.setLastModifiedTime(arquivo, FileTime.from(Instant.parse("2020-02-29T10:00:00Z")));
        BasicFileAttributes p = Files.readAttributes(pasta, BasicFileAttributes.class);
        BasicFileAttributes a = Files.readAttributes(arquivo, BasicFileAttributes.class);
        System.out.println(p.isDirectory() + " " + a.isRegularFile() + " " + a.size() + " " + a.lastModifiedTime());
        Files.delete(arquivo);
        Files.delete(pasta);
    }
}`,
      opcoes: [
        '`true true 3 2020-02-29T10:00:00Z`',
        '`true true 3` e a data e hora atuais',
        '`false true 3 2020-02-29T10:00:00Z`',
        'Lança `DateTimeException`: 2020-02-29 não existe',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A data de modificação pode ser alterada livremente, e 2020 foi bissexto. O `toString` de `FileTime` usa o formato ISO, em UTC.',
    },
    {
      id: 'senior-t3-e06-q12',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais métodos de `Files` devolvem um `Stream<Path>`? Escolha três.',
      opcoes: ['`list`', '`walk`', '`find`', '`newDirectoryStream`', '`walkFileTree`'],
      respostas: [0, 1, 2],
      explicacao: '`newDirectoryStream` devolve um `DirectoryStream<Path>`, que é `Iterable` mas não é um `Stream`. `walkFileTree` devolve o `Path` inicial e trabalha com um visitante.',
    },
    {
      id: 'senior-t3-e06-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma árvore contém um atalho simbólico que aponta para uma pasta acima dele. O que acontece com `Files.walk(raiz, FileVisitOption.FOLLOW_LINKS)`?',
      opcoes: [
        'O ciclo é detectado e o percurso lança `FileSystemLoopException`, embrulhada numa `UncheckedIOException`',
        'O percurso entra num laço infinito',
        'O atalho é ignorado, como sem a opção',
        'O compilador recusa a opção',
      ],
      resposta: 0,
      explicacao: 'Seguindo atalhos, o `walk` guarda as pastas já visitadas e reconhece o ciclo. Como o erro surge durante o consumo do stream, ele chega embrulhado em `UncheckedIOException`. Sem `FOLLOW_LINKS`, o atalho é tratado como um arquivo comum.',
    },
    {
      id: 'senior-t3-e06-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a forma mais eficiente de obter tamanho, tipo e data de modificação de um mesmo arquivo?',
      opcoes: [
        'Uma única chamada a `Files.readAttributes(p, BasicFileAttributes.class)`',
        'Chamar `Files.size`, `Files.isDirectory` e `Files.getLastModifiedTime`',
        'Abrir o arquivo com `Files.newInputStream` e contar os bytes',
        'Usar `Files.walk(p, 0)`',
      ],
      resposta: 0,
      explicacao: '`readAttributes` busca todos os atributos básicos numa só consulta ao sistema; os métodos separados fariam uma consulta cada.',
    },
    {
      id: 'senior-t3-e06-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um programa imprime os nomes devolvidos por `Files.list(pasta)` e espera vê-los em ordem alfabética. Em outra máquina, a ordem muda. Por quê?',
      opcoes: [
        'A ordem de listagem depende do sistema de arquivos e não é garantida; é preciso ordenar',
        'Porque `Files.list` é paralelo',
        'Porque a outra máquina usa outra versão do Java',
        'Porque `Files.list` ordena por data de criação',
      ],
      resposta: 0,
      explicacao: 'A API não promete ordem nenhuma. Um `.sorted()` no stream resolve.',
    },
  ],
};

export default episodio;
