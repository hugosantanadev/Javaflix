import type { Exercicio } from '../../types';

/** Prova da temporada Sênior T3: entrada e saída. */
const prova: Exercicio[] = [
  {
    id: 'senior-t3-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.*;
import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) throws IOException {
        InputStream in = new ByteArrayInputStream("abcdef".getBytes(StandardCharsets.UTF_8));
        byte[] buf = new byte[5];
        int n = in.read(buf, 1, 3);
        System.out.println(n + " " + new String(buf, 1, n, StandardCharsets.UTF_8));
    }
}`,
    opcoes: ['`3 abc`', '`3 bcd`', '`5 abcde`', '`4 abc`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`read(buf, 1, 3)` lê até 3 bytes e os guarda a partir da posição 1 do array. Os bytes lidos são os três primeiros do stream.',
  },
  {
    id: 'senior-t3-prova-q02',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais classes precisam envolver outro stream, isto é, não abrem um arquivo sozinhas pelo nome? Escolha três.',
    opcoes: ['`BufferedReader`', '`ObjectInputStream`', '`InputStreamReader`', '`FileInputStream`', '`FileReader`'],
    respostas: [0, 1, 2],
    explicacao: '`FileInputStream` e `FileReader` são de baixo nível e abrem o arquivo diretamente. As outras acrescentam comportamento a um stream existente.',
  },
  {
    id: 'senior-t3-prova-q03',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Um programa grava `abc` num arquivo com `new FileWriter(f)` e fecha. Depois, abre de novo com `new FileWriter(f)`, grava `x` e fecha. Qual é o conteúdo final?',
    opcoes: ['`x`', '`abcx`', '`xbc`', '`abc`'],
    resposta: 0,
    explicacao: 'Sem o argumento `append` igual a `true`, o `FileWriter` começa um arquivo vazio, descartando o conteúdo anterior.',
  },
  {
    id: 'senior-t3-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Reader r = new BufferedReader(new StringReader("javaflix"));
        System.out.print((char) r.read());
        r.mark(10);
        r.skip(3);
        System.out.print((char) r.read());
        r.reset();
        System.out.println((char) r.read());
    }
}`,
    opcoes: ['`jfa`', '`jfj`', '`jav`', '`jfl`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Lê `j` e marca. Pula `a`, `v` e `a`, lê `f`. O `reset` volta para logo depois do `j`, e a leitura seguinte é `a`.',
  },
  {
    id: 'senior-t3-prova-q05',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(String.format(Locale.US, "[%6.2f][%-4s][%x]", 3.14159, "ok", 255));
    }
}`,
    resposta: '[  3.14][ok  ][ff]',
    explicacao: '`%6.2f` ocupa 6 posições com 2 casas, alinhado à direita. `%-4s` ocupa 4, alinhado à esquerda. `%x` escreve em hexadecimal.',
  },
  {
    id: 'senior-t3-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Sobre a classe `Console`, qual afirmação é verdadeira?',
    opcoes: [
      '`readPassword` devolve um `char[]`, que pode ser apagado da memória depois do uso',
      '`System.console()` nunca devolve `null`',
      '`readPassword` devolve uma `String` sem exibir os caracteres',
      '`Console` só funciona dentro de IDEs',
    ],
    resposta: 0,
    explicacao: 'Uma `String` é imutável e fica na memória até a coleta de lixo; um `char[]` pode ser sobrescrito. Sem terminal interativo, `System.console()` devolve `null`.',
  },
  {
    id: 'senior-t3-prova-q07',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.*;

public class Teste {
    static class Pessoa {
        String pais = "BR";

        Pessoa() {
            pais = "??";
        }
    }

    static class Aluno extends Pessoa implements Serializable {
        String nome;
        transient int nota = 10;

        Aluno(String nome) {
            this.nome = nome;
            this.pais = "PT";
        }
    }

    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(new Aluno("Ana"));
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            Aluno a = (Aluno) in.readObject();
            System.out.println(a.nome + " " + a.pais + " " + a.nota);
        }
    }
}`,
    opcoes: ['`Ana ?? 0`', '`Ana PT 10`', '`Ana BR 0`', '`Ana PT 0`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`pais` é de `Pessoa`, que não é serializável: na leitura, o construtor dela roda e o deixa em `??`. O `nome` vem do stream; a `nota`, `transient`, fica 0.',
  },
  {
    id: 'senior-t3-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.io.*;
import java.util.Optional;

public class Teste {
    static class Perfil implements Serializable {
        String nome = "ana";
        Optional<String> apelido = Optional.of("aninha");
    }

    public static void main(String[] args) throws IOException {
        System.out.println("gravando");
        try (ObjectOutputStream out = new ObjectOutputStream(new ByteArrayOutputStream())) {
            out.writeObject(new Perfil());
        }
    }
}`,
    opcoes: [
      'Imprime `gravando` e lança `NotSerializableException`',
      'Imprime `gravando` e grava o perfil',
      'Não compila: `Optional` não é `Serializable`',
      'Imprime `gravando` e grava o perfil sem o apelido',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'NotSerializableException', saida: 'gravando' },
    explicacao: '`Optional` não implementa `Serializable`, de propósito: foi pensado para retornos de métodos, não para campos. O campo precisaria ser `transient`.',
  },
  {
    id: 'senior-t3-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        ObjectOutputStream out = new ObjectOutputStream(new FileWriter("dados.bin"));
        out.writeObject("texto");
    }
}`,
    opcoes: [
      'Não compila: `ObjectOutputStream` envolve um `OutputStream`, e `FileWriter` é um `Writer`',
      'Compila e grava o objeto como texto',
      'Compila e lança `NotSerializableException`',
      'Compila e grava os bytes do objeto',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 5 },
    explicacao: 'A serialização produz bytes, e só aceita streams de bytes, como `FileOutputStream`.',
  },
  {
    id: 'senior-t3-prova-q10',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        Path p = Path.of("/a/b/c").subpath(1, 3);
        System.out.println(p.getNameCount() + " " + p.getName(0));
    }
}`,
    opcoes: ['`2 b`', '`2 a`', '`3 b`', '`2 /b`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '`subpath(1, 3)` devolve `b/c`, sem raiz. É um caminho novo, em que `b` está no índice 0.',
  },
  {
    id: 'senior-t3-prova-q11',
    tipo: 'saida',
    dificuldade: 3,
    enunciado: 'Digite a saída exata.',
    codigo: `import java.io.File;
import java.nio.file.Path;

public class Teste {
    static String s(Path p) {
        return p.toString().replace(File.separatorChar, '/');
    }

    public static void main(String[] args) {
        System.out.println(s(Path.of("/x/y/../z").normalize().relativize(Path.of("/x/w"))));
    }
}`,
    resposta: '../w',
    explicacao: 'Normalizado, o primeiro caminho é `/x/z`. De lá até `/x/w`, sobe-se um nível e desce-se para `w`.',
  },
  {
    id: 'senior-t3-prova-q12',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.File;
import java.nio.file.Path;

public class Teste {
    static String s(Path p) {
        return p.toString().replace(File.separatorChar, '/');
    }

    public static void main(String[] args) {
        System.out.println(s(Path.of("a/b").resolve(Path.of("/c"))));
    }
}`,
    opcoes: ['`/c`', '`a/b/c`', '`a/b//c`', 'Lança `IllegalArgumentException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Quando o argumento de `resolve` tem raiz, ele é devolvido como está, e o caminho base é ignorado.',
  },
  {
    id: 'senior-t3-prova-q13',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais afirmações sobre `Path` são verdadeiras? Escolha duas.',
    opcoes: [
      '`normalize`, `resolve` e `relativize` não acessam o sistema de arquivos',
      '`getRoot()` devolve `null` para um caminho relativo',
      '`normalize` lança exceção se uma pasta do caminho não existir',
      '`equals` normaliza os caminhos antes de comparar',
      '`getFileName()` devolve uma `String`',
    ],
    respostas: [0, 1],
    explicacao: 'As operações de `Path` são de texto; `equals` compara o texto como está; e `getFileName()` devolve um `Path`.',
  },
  {
    id: 'senior-t3-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("prova");
        Path a = Files.writeString(base.resolve("a.txt"), "A");
        Path b = Files.writeString(base.resolve("b.txt"), "B");
        base.toFile().deleteOnExit();
        a.toFile().deleteOnExit();
        b.toFile().deleteOnExit();
        System.out.println(Files.readString(b));
        Files.move(a, b);
    }
}`,
    opcoes: [
      'Imprime `B` e lança `FileAlreadyExistsException`',
      'Imprime `B` e substitui `b.txt` pelo conteúdo de `a.txt`',
      'Imprime `B` e acrescenta `A` ao fim de `b.txt`',
      'Imprime `B` e lança `DirectoryNotEmptyException`',
    ],
    resposta: 0,
    verificar: { tipo: 'excecao', nome: 'FileAlreadyExistsException', saida: 'B' },
    explicacao: 'Como `copy`, o `move` não sobrescreve um destino existente sem `StandardCopyOption.REPLACE_EXISTING`.',
  },
  {
    id: 'senior-t3-prova-q15',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.List;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path p = Files.createTempFile("prova", ".txt");
        Files.write(p, List.of("um", "dois"));
        Files.writeString(p, "três\\n", StandardOpenOption.APPEND);
        Path c = Files.copy(p, p.resolveSibling(p.getFileName() + ".bak"), StandardCopyOption.REPLACE_EXISTING);
        Files.writeString(p, "zero\\n");
        System.out.println(Files.readAllLines(p).size() + " " + Files.readAllLines(c));
        Files.delete(p);
        Files.delete(c);
    }
}`,
    opcoes: ['`1 [um, dois, três]`', '`4 [um, dois, três]`', '`1 [zero]`', '`4 [um, dois, três, zero]`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'A cópia foi feita quando o arquivo tinha as três linhas. Depois, o `writeString` sem opções substituiu o original por uma linha só, sem afetar a cópia.',
  },
  {
    id: 'senior-t3-prova-q16',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path p = Path.of("dados.txt");
        String conteudo = Files.readAllBytes(p);
        System.out.println(conteudo);
    }
}`,
    opcoes: [
      'Não compila: `readAllBytes` devolve `byte[]`',
      'Compila e imprime o conteúdo do arquivo',
      'Compila e lança `NoSuchFileException` se o arquivo não existir',
      'Compila e imprime os bytes separados por vírgula',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 7 },
    explicacao: 'Para obter o texto direto, o método é `Files.readString(p)`. Com os bytes, seria `new String(bytes, StandardCharsets.UTF_8)`.',
  },
  {
    id: 'senior-t3-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um programa chama `Files.delete(pasta)` numa pasta que contém um arquivo. O que acontece?',
    opcoes: [
      'Lança `DirectoryNotEmptyException`',
      'Apaga a pasta e o arquivo',
      'Devolve `false` e não apaga nada',
      'Apaga só o arquivo',
    ],
    resposta: 0,
    explicacao: '`delete` não é recursivo. Para apagar uma árvore, percorra-a e apague o conteúdo antes da pasta.',
  },
  {
    id: 'senior-t3-prova-q18',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A pasta `raiz` contém `a/topo.txt` e `a/b/c/fundo.txt`. Qual é a saída?',
    codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.Comparator;
import java.util.stream.Stream;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path raiz = Files.createTempDirectory("prova");
        Files.createDirectories(raiz.resolve("a/b/c"));
        Files.writeString(raiz.resolve("a/b/c/fundo.txt"), "x");
        Files.writeString(raiz.resolve("a/topo.txt"), "y");
        try (Stream<Path> s2 = Files.walk(raiz, 2); Stream<Path> todos = Files.walk(raiz)) {
            System.out.println(s2.count() + " " + todos.filter(Files::isRegularFile).count());
        }
        try (Stream<Path> t = Files.walk(raiz)) {
            t.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
    }
}`,
    opcoes: ['`4 2`', '`3 2`', '`2 1`', '`6 2`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Até a profundidade 2, o `walk` devolve `raiz`, `a`, `a/b` e `a/topo.txt`. Sem limite, os arquivos são os dois.',
  },
  {
    id: 'senior-t3-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `import java.nio.file.*;

public class Teste {
    public static void main(String[] args) {
        PathMatcher m = FileSystems.getDefault().getPathMatcher("glob:**/*.java");
        System.out.println(m.matches(Path.of("src", "Main.java")) + " " + m.matches(Path.of("Main.java")));
    }
}`,
    opcoes: ['`true false`', '`true true`', '`false true`', '`false false`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O padrão exige uma barra antes do nome: `**` casa com qualquer coisa antes dela, mas a barra precisa existir. Um arquivo solto, sem pasta, não casa.',
  },
  {
    id: 'senior-t3-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Num `SimpleFileVisitor` usado para apagar uma árvore, em qual método a pasta deve ser apagada?',
    opcoes: [
      '`postVisitDirectory`, que roda depois de todo o conteúdo da pasta',
      '`preVisitDirectory`, antes de entrar nela',
      '`visitFile`, junto com os arquivos',
      '`visitFileFailed`',
    ],
    resposta: 0,
    explicacao: 'Quando `postVisitDirectory` é chamado, os arquivos e subpastas já foram visitados e apagados, e a pasta está vazia.',
  },
];

export default prova;
