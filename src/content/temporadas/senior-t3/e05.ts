import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t3-e05',
  minutos: 17,
  aula,
  armadilhas: [
    '`createDirectory` exige que a pasta mãe exista; `createDirectories` cria o caminho inteiro.',
    'Sem opções, `write` e `writeString` criam o arquivo ou substituem o conteúdo; `APPEND` acrescenta.',
    '`copy` e `move` lançam `FileAlreadyExistsException` se o destino existir, a menos que se use `REPLACE_EXISTING`.',
    '`Files.copy` aceita `CopyOption`; passar uma `StandardOpenOption` não compila.',
    'Copiar uma pasta cria só a pasta, sem o conteúdo.',
    '`delete` lança `NoSuchFileException` e `DirectoryNotEmptyException`; `deleteIfExists` devolve `boolean`.',
    '`Files.lines` devolve um `Stream` que segura o arquivo aberto: feche com try-with-resources.',
    '`Files.mismatch` devolve -1 quando os arquivos são iguais, e não 0.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Reading, Writing, and Creating Files',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/file.html',
      tipo: 'documentacao',
      porque: 'Os métodos de `Files` do mais simples ao mais flexível, com as opções de abertura.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Copying a File or Directory',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/copy.html',
      tipo: 'documentacao',
      porque: 'As opções de cópia e o comportamento com pastas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Deleting a File or Directory',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/delete.html',
      tipo: 'documentacao',
      porque: 'As exceções de `delete` e quando usar `deleteIfExists`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Reading and Writing Small Files',
      url: 'https://dev.java/learn/api/io/java-io/reading-writing/small-files/',
      tipo: 'documentacao',
      porque: '`readString`, `readAllLines`, `writeString` e a codificação padrão de `Files`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Manipulating Files and Directories',
      url: 'https://dev.java/learn/api/io/java-io/file-system/move-copy-delete/',
      tipo: 'documentacao',
      porque: 'Copiar, mover e apagar, com o tratamento de cada exceção.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Creating and Reading Directories',
      url: 'https://dev.java/learn/api/io/java-io/file-system/creating-reading-directories/',
      tipo: 'documentacao',
      porque: 'Criar pastas, inclusive temporárias, e as diferenças entre os métodos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.nio.file.Files',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html',
      tipo: 'documentacao',
      porque: 'A referência de todos os métodos, com as exceções que cada um declara.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Introduction to Java NIO2 File API',
      url: 'https://www.baeldung.com/java-nio-2-file-api',
      tipo: 'artigo',
      porque: 'Consultas, criação, cópia, movimento e exclusão, testados um a um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: How to Read a File in Java',
      url: 'https://www.baeldung.com/reading-file-in-java',
      tipo: 'artigo',
      porque: 'As várias formas de ler um arquivo, com `Files` e com `java.io`, comparadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java – Write to File',
      url: 'https://www.baeldung.com/java-write-to-file',
      tipo: 'artigo',
      porque: 'As formas de gravar, incluindo as opções de acrescentar e criar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: NIO pt 02, Path, Paths, Files pt 02',
      url: 'https://www.youtube.com/watch?v=0Cw4YlsqIqU',
      tipo: 'video',
      porque: 'Criando pastas e arquivos e copiando com `Files`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Os métodos de `Files` com as exceções e opções que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 14, "I/O": seções "Operating on File and Path" e "Reading and Writing Files"',
    },
  ],
  desafio: {
    titulo: 'Gravação segura',
    enunciado:
      'Um programa guarda a configuração em `app.conf`, numa pasta temporária, com o conteúdo `porta=8080`. Antes de alterá-la, faça um backup em `app.conf.bak`, substituindo um backup antigo se houver. Depois, grave `porta=9090` com segurança: escreva num arquivo temporário da mesma pasta e mova-o por cima do original com `ATOMIC_MOVE` e `REPLACE_EXISTING`. Mostre os dois conteúdos, a posição da primeira diferença e quantos arquivos ficaram na pasta (`Files.list`, do próximo episódio, devolve um stream com o conteúdo de uma pasta). Apague tudo no fim. A saída deve ser:\n\n```text\nbackup criado: app.conf.bak\nconfig atualizado: porta=9090\nbackup intacto: porta=8080\nprimeira diferença no byte 6\narquivos na pasta: 2\n```',
    dicas: [
      '`Files.createTempFile(pasta, prefixo, sufixo)` cria o temporário dentro da pasta informada.',
      'O temporário precisa estar no mesmo disco do destino para o `move` atômico funcionar.',
      '`Files.list` também precisa ser fechado com try-with-resources.',
    ],
    solucao: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class Seguro {
    static void gravarComSeguranca(Path destino, String conteudo) throws IOException {
        Path temporario = Files.createTempFile(destino.getParent(), "gravando", ".tmp");
        Files.writeString(temporario, conteudo);
        Files.move(temporario, destino, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
    }

    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("config");
        Path config = pasta.resolve("app.conf");
        Files.writeString(config, "porta=8080");

        Path backup = Files.copy(config, pasta.resolve("app.conf.bak"), StandardCopyOption.REPLACE_EXISTING);
        System.out.println("backup criado: " + backup.getFileName());

        gravarComSeguranca(config, "porta=9090");
        System.out.println("config atualizado: " + Files.readString(config));
        System.out.println("backup intacto: " + Files.readString(backup));
        System.out.println("primeira diferença no byte " + Files.mismatch(config, backup));

        long arquivos;
        try (var conteudo = Files.list(pasta)) {
            arquivos = conteudo.count();
        }
        System.out.println("arquivos na pasta: " + arquivos);

        Files.delete(config);
        Files.delete(backup);
        Files.delete(pasta);
    }
}`,
    saida: 'backup criado: app.conf.bak\nconfig atualizado: porta=9090\nbackup intacto: porta=8080\nprimeira diferença no byte 6\narquivos na pasta: 2',
    comentarios:
      'Gravar direto em `app.conf` com `writeString` funcionaria quase sempre; o problema é o "quase". Se o programa cair no meio, o arquivo fica pela metade e a configuração se perde. Com o temporário e o `move` atômico, quem ler o arquivo verá a versão antiga ou a nova, nunca uma mistura. Só sobram dois arquivos: o temporário deixou de existir ao ser movido. E o `mismatch` aponta o índice 6, o primeiro dígito da porta.',
  },
  exercicios: [
    {
      id: 'senior-t3-e05-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("questao");
        base.toFile().deleteOnExit();
        System.out.println("criando");
        Files.createDirectory(base.resolve("ano/mes"));
    }
}`,
      opcoes: [
        'Imprime `criando` e lança `NoSuchFileException`',
        'Imprime `criando` e cria as pastas `ano` e `mes`',
        'Imprime `criando` e cria só a pasta `ano`',
        'Imprime `criando` e lança `FileAlreadyExistsException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchFileException', saida: 'criando' },
      explicacao: '`createDirectory` cria uma única pasta e exige que a mãe, `ano`, exista. `createDirectories` criaria as duas.',
    },
    {
      id: 'senior-t3-e05-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path p = Files.createTempFile("questao", ".txt");
        Files.writeString(p, "a");
        Files.writeString(p, "b");
        Files.writeString(p, "c", StandardOpenOption.APPEND);
        System.out.println(Files.readString(p));
        Files.delete(p);
    }
}`,
      opcoes: ['`bc`', '`abc`', '`c`', '`b`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O segundo `writeString`, sem opções, substitui o `a` por `b`. O terceiro acrescenta `c`.',
    },
    {
      id: 'senior-t3-e05-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path a = Files.createTempFile("origem", ".txt");
        Path b = Files.createTempFile("destino", ".txt");
        a.toFile().deleteOnExit();
        b.toFile().deleteOnExit();
        System.out.println(Files.exists(b));
        Files.copy(a, b);
    }
}`,
      opcoes: [
        'Imprime `true` e lança `FileAlreadyExistsException`',
        'Imprime `true` e substitui o destino',
        'Imprime `true` e anexa a origem ao destino',
        'Imprime `false` e copia',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'FileAlreadyExistsException', saida: 'true' },
      explicacao: 'O destino já existe, porque `createTempFile` o criou. Sem `REPLACE_EXISTING`, a cópia não sobrescreve.',
    },
    {
      id: 'senior-t3-e05-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `delete` e `deleteIfExists` são verdadeiras? Escolha duas.',
      opcoes: [
        '`delete` lança `NoSuchFileException` se o caminho não existir',
        '`deleteIfExists` devolve `false` quando não havia nada para apagar',
        '`delete` apaga uma pasta junto com o conteúdo',
        '`deleteIfExists` nunca lança exceção',
        '`delete` devolve `boolean`',
      ],
      respostas: [0, 1],
      explicacao: '`delete` devolve `void` e não apaga pastas com conteúdo. `deleteIfExists` também lança `DirectoryNotEmptyException` numa pasta com conteúdo.',
    },
    {
      id: 'senior-t3-e05-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path x = Files.writeString(Files.createTempFile("primeiro", ".txt"), "abcdef");
        Path y = Files.writeString(Files.createTempFile("segundo", ".txt"), "abcxef");
        Path z = Files.writeString(Files.createTempFile("terceiro", ".txt"), "abcdef");
        System.out.println(Files.mismatch(x, y) + " " + Files.mismatch(x, z));
        Files.delete(x);
        Files.delete(y);
        Files.delete(z);
    }
}`,
      resposta: '3 -1',
      explicacao: 'O primeiro byte diferente entre `x` e `y` está no índice 3 (`d` e `x`). Arquivos iguais dão -1.',
    },
    {
      id: 'senior-t3-e05-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que cria a pasta e todas as que faltarem no caminho. O programa deve imprimir `true`.',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Pastas {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("questao");
        Path fundo = Files.___(base.resolve("a/b/c"));
        System.out.println(Files.isDirectory(fundo));
        Files.delete(fundo);
        Files.delete(fundo.getParent());
        Files.delete(fundo.getParent().getParent());
        Files.delete(base);
    }
}`,
      respostas: ['createDirectories'],
      saida: 'true',
      explicacao: '`createDirectories` cria `a`, `b` e `c` e não reclama das que já existirem.',
    },
    {
      id: 'senior-t3-e05-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.List;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path p = Path.of("dados.txt");
        List<String> linhas = Files.lines(p);
        System.out.println(linhas.size());
    }
}`,
      resposta: 8,
      explicacao: '`Files.lines` devolve um `Stream<String>`. Quem devolve `List<String>` é `Files.readAllLines`.',
    },
    {
      id: 'senior-t3-e05-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("questao");
        Path origem = Files.createDirectory(base.resolve("origem"));
        Files.writeString(origem.resolve("a.txt"), "1");
        Path copia = Files.copy(origem, base.resolve("destino"));
        System.out.println(Files.isDirectory(copia) + " " + Files.exists(copia.resolve("a.txt")));
        Files.delete(origem.resolve("a.txt"));
        Files.delete(origem);
        Files.delete(copia);
        Files.delete(base);
    }
}`,
      opcoes: ['`true false`', '`true true`', '`false false`', 'Lança `DirectoryNotEmptyException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Copiar uma pasta cria apenas a pasta, vazia. O conteúdo precisa ser copiado arquivo por arquivo.',
    },
    {
      id: 'senior-t3-e05-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path pasta = Files.createTempDirectory("questao");
        Path arquivo = Files.writeString(pasta.resolve("a.txt"), "x");
        pasta.toFile().deleteOnExit();
        arquivo.toFile().deleteOnExit();
        System.out.println("apagando");
        Files.delete(pasta);
    }
}`,
      opcoes: [
        'Imprime `apagando` e lança `DirectoryNotEmptyException`',
        'Imprime `apagando` e apaga a pasta e o arquivo',
        'Imprime `apagando` e apaga só o arquivo',
        'Imprime `apagando` e lança `NoSuchFileException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'DirectoryNotEmptyException', saida: 'apagando' },
      explicacao: '`Files.delete` não apaga pastas com conteúdo. Para isso, é preciso apagar o conteúdo antes, de dentro para fora.',
    },
    {
      id: 'senior-t3-e05-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path arquivo = Files.createTempFile("existente", ".txt");
        arquivo.toFile().deleteOnExit();
        System.out.println(Files.exists(arquivo));
        Files.writeString(arquivo, "novo", StandardOpenOption.CREATE_NEW);
    }
}`,
      opcoes: [
        'Imprime `true` e lança `FileAlreadyExistsException`',
        'Imprime `true` e substitui o conteúdo',
        'Imprime `true` e acrescenta `novo`',
        'Imprime `false` e cria o arquivo',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'FileAlreadyExistsException', saida: 'true' },
      explicacao: '`CREATE_NEW` exige que o arquivo ainda não exista. É útil para não sobrescrever um arquivo por engano.',
    },
    {
      id: 'senior-t3-e05-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path base = Files.createTempDirectory("questao");
        Path antes = Files.writeString(base.resolve("antes.txt"), "dados");
        Path depois = Files.move(antes, base.resolve("depois.txt"));
        System.out.println(Files.exists(antes) + " " + Files.exists(depois) + " " + Files.readString(depois));
        Files.delete(depois);
        Files.delete(base);
    }
}`,
      opcoes: ['`false true dados`', '`true true dados`', '`false false dados`', '`true false dados`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Mover na mesma pasta é renomear: o arquivo deixa de existir no nome antigo e passa a existir no novo, com o mesmo conteúdo.',
    },
    {
      id: 'senior-t3-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o stream devolvido por `Files.lines(caminho)` deve ficar num try-with-resources?',
      opcoes: [
        'Porque ele mantém o arquivo aberto enquanto não for fechado',
        'Porque, sem isso, ele lê o arquivo inteiro na memória',
        'Porque ele não compila fora de um try',
        'Porque ele apaga o arquivo ao fechar',
      ],
      resposta: 0,
      explicacao: 'O stream é preguiçoso e lê as linhas sob demanda, segurando o descritor do arquivo. Sem o fechamento, o recurso vaza.',
    },
    {
      id: 'senior-t3-e05-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.IOException;
import java.nio.file.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path origem = Path.of("a.txt");
        Path destino = Path.of("b.txt");
        Files.copy(origem, destino, StandardOpenOption.APPEND);
    }
}`,
      opcoes: [
        'Não compila: `copy` recebe `CopyOption`, e `StandardOpenOption` não é uma',
        'Compila e acrescenta `a.txt` ao fim de `b.txt`',
        'Compila e lança `UnsupportedOperationException`',
        'Compila e substitui `b.txt`',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 8 },
      explicacao: 'As opções de abrir arquivos (`StandardOpenOption`) e as de copiar e mover (`StandardCopyOption`) são de tipos diferentes. `copy` não tem um modo de acrescentar.',
    },
    {
      id: 'senior-t3-e05-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.IOException;
import java.nio.file.*;
import java.util.List;

public class Teste {
    public static void main(String[] args) throws IOException {
        Path p = Files.createTempFile("linhas", ".txt");
        Files.write(p, List.of("a", "b", "c"));
        System.out.println(Files.readAllLines(p).size() + " " + Files.readString(p).lines().count());
        Files.delete(p);
    }
}`,
      opcoes: ['`3 3`', '`3 4`', '`1 3`', '`3 1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`write` com uma lista grava cada elemento numa linha. As duas formas de ler encontram três linhas.',
    },
    {
      id: 'senior-t3-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída, se o caminho `nada-aqui-javaflix` não existir?',
      codigo: `import java.nio.file.*;

public class Teste {
    public static void main(String[] args) {
        Path p = Path.of("nada-aqui-javaflix");
        System.out.println(Files.exists(p) + " " + Files.notExists(p) + " " + Files.isDirectory(p));
    }
}`,
      opcoes: ['`false true false`', '`false false false`', 'Lança `NoSuchFileException`', '`true false false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Os métodos de consulta não lançam exceção: devolvem `false` quando não conseguem confirmar. `notExists` só é `true` quando há certeza de que o caminho não existe.',
    },
  ],
};

export default episodio;
