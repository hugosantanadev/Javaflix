import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t3-e04',
  minutos: 16,
  aula,
  armadilhas: [
    'Os índices de `getName` e `subpath` começam em 0 e não contam a raiz.',
    '`subpath(inicio, fim)` exclui `fim`; índices inválidos lançam `IllegalArgumentException`.',
    '`getParent()` devolve `null` num caminho de um nome só, e `getRoot()` devolve `null` num relativo.',
    '`normalize()` só olha o texto: não confere se as pastas existem.',
    '`resolve` com um argumento absoluto devolve o próprio argumento.',
    '`relativize` entre um caminho absoluto e um relativo lança `IllegalArgumentException`.',
    '`equals` compara o texto sem normalizar: `a/./b` e `a/b` são diferentes.',
    '`endsWith(".txt")` compara nomes inteiros, não o fim do texto: devolve `false` para `nota.txt`.',
    '`getFileName()` devolve um `Path`, não uma `String`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: The Path Class',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/pathClass.html',
      tipo: 'documentacao',
      porque: 'O que é um `Path` e por que manipulá-lo não acessa o sistema de arquivos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Path Operations',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/pathOps.html',
      tipo: 'documentacao',
      porque: 'Partes do caminho, `normalize`, `resolve`, `relativize` e comparação, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Working with Paths',
      url: 'https://dev.java/learn/api/io/java-io/file-system/path/',
      tipo: 'documentacao',
      porque: 'O tutorial atualizado da Oracle sobre a API de caminhos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Accessing Resources using Paths',
      url: 'https://dev.java/learn/api/io/java-io/file-system/file-path/',
      tipo: 'documentacao',
      porque: 'A passagem de `java.io.File` para `Path` e a relação entre as duas APIs.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.nio.file.Path',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Path.html',
      tipo: 'documentacao',
      porque: 'O comportamento exato de cada método, incluindo os casos de borda de `resolve` e `relativize`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc do módulo jdk.zipfs',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/jdk.zipfs/module-summary.html',
      tipo: 'documentacao',
      porque: 'O sistema de arquivos ZIP, que usa a mesma API de `Path` e `Files`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Java NIO2 Path API',
      url: 'https://www.baeldung.com/java-nio-2-path',
      tipo: 'artigo',
      porque: 'Cada operação de `Path` demonstrada com testes.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java – Path vs File',
      url: 'https://www.baeldung.com/java-path-vs-file',
      tipo: 'artigo',
      porque: 'As diferenças entre a classe antiga e a nova, e como migrar.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java NIO Path',
      url: 'https://jenkov.com/tutorials/java-nio/path.html',
      tipo: 'artigo',
      porque: 'Caminhos absolutos e relativos e a normalização, num texto curto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: NIO pt 01, Path, Paths, Files',
      url: 'https://www.youtube.com/watch?v=PHj0E70bSeg',
      tipo: 'video',
      porque: 'Criando caminhos e a relação entre `Path`, `Paths` e `Files`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: NIO pt 03, Normalização',
      url: 'https://www.youtube.com/watch?v=k6yQvu42sq0',
      tipo: 'video',
      porque: '`normalize` com `.` e `..`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: NIO pt 04, Resolvendo Paths',
      url: 'https://www.youtube.com/watch?v=hNGyzCwLe1g',
      tipo: 'video',
      porque: '`resolve` com caminhos relativos e absolutos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: NIO pt 05, Relativize',
      url: 'https://www.youtube.com/watch?v=mbx83oInlGI',
      tipo: 'video',
      porque: 'O caminho de um lugar a outro com `relativize`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As operações de `Path` com as pegadinhas de índice e de `relativize` que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 14, "I/O": seções "Referencing Files and Directories" e "Operating on File and Path"',
    },
  ],
  desafio: {
    titulo: 'Guarda de caminhos',
    enunciado:
      'Um servidor serve arquivos da pasta `/srv/app` e recebe pedidos com caminhos escritos pelo usuário. Um invasor pode pedir `../../etc/passwd` para escapar da pasta. Para cada pedido em `config/./app.yml`, `logs/../logs/hoje.log`, `../backup/2024/app.zip` e `/etc/hosts`, resolva-o contra a base, normalize, decida se o destino continua dentro da base e mostre o caminho relativo à base. Imprima os caminhos com `/`, como na aula. A saída deve ser:\n\n```text\n/srv/app/config/app.yml | permitido | config/app.yml\n/srv/app/logs/hoje.log | permitido | logs/hoje.log\n/srv/backup/2024/app.zip | bloqueado | ../backup/2024/app.zip\n/etc/hosts | bloqueado | ../../etc/hosts\npermitidos: 2 de 4\n```',
    dicas: [
      'Normalize depois do `resolve`: antes disso, o `..` ainda está no texto e engana o teste.',
      '`startsWith(base)` compara nomes inteiros, então `/srv/application` não passaria por `/srv/app`.',
      'Um pedido absoluto, como `/etc/hosts`, substitui a base no `resolve`.',
    ],
    solucao: `import java.io.File;
import java.nio.file.Path;
import java.util.List;

public class Guarda {
    static String txt(Path p) {
        return p.toString().replace(File.separatorChar, '/');
    }

    public static void main(String[] args) {
        Path base = Path.of("/srv/app");
        List<String> pedidos = List.of("config/./app.yml", "logs/../logs/hoje.log", "../backup/2024/app.zip", "/etc/hosts");
        int dentro = 0;
        for (String pedido : pedidos) {
            Path destino = base.resolve(pedido).normalize();
            boolean permitido = destino.startsWith(base);
            if (permitido) {
                dentro++;
            }
            System.out.println(txt(destino) + " | " + (permitido ? "permitido" : "bloqueado") + " | " + txt(base.relativize(destino)));
        }
        System.out.println("permitidos: " + dentro + " de " + pedidos.size());
    }
}`,
    saida: '/srv/app/config/app.yml | permitido | config/app.yml\n/srv/app/logs/hoje.log | permitido | logs/hoje.log\n/srv/backup/2024/app.zip | bloqueado | ../backup/2024/app.zip\n/etc/hosts | bloqueado | ../../etc/hosts\npermitidos: 2 de 4',
    comentarios:
      'Esta é a defesa contra *path traversal*, uma das falhas de segurança mais comuns em servidores de arquivos. Sem o `normalize`, o pedido `../backup/2024/app.zip` resolvido viraria `/srv/app/../backup/2024/app.zip`, que começa com `/srv/app` e passaria no teste. O `relativize` confirma o resultado: todo destino bloqueado começa com `..`. Em produção, vale ainda usar `toRealPath()`, que também resolve atalhos simbólicos que poderiam apontar para fora.',
  },
  exercicios: [
    {
      id: 'senior-t3-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        Path p = Path.of("/a/b/c/d.txt");
        System.out.println(p.getNameCount() + " " + p.getName(1) + " " + p.getFileName());
    }
}`,
      opcoes: ['`4 b d.txt`', '`5 a d.txt`', '`4 a d.txt`', '`5 b d.txt`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A raiz não conta: são quatro nomes, com `a` no índice 0 e `b` no índice 1.',
    },
    {
      id: 'senior-t3-e04-q02',
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
        System.out.println(s(Path.of("/x/y/z").subpath(0, 2)));
    }
}`,
      opcoes: ['`x/y`', '`/x/y`', '`x/y/z`', '`/x`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`subpath` pega os índices 0 e 1, excluindo o 2, e o resultado nunca tem raiz.',
    },
    {
      id: 'senior-t3-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        Path p = Path.of("x/y/z");
        System.out.println(p.getName(2));
        System.out.println(p.getName(3));
    }
}`,
      opcoes: [
        'Imprime `z` e lança `IllegalArgumentException`',
        'Imprime `z` e `null`',
        'Imprime `y` e `z`',
        'Imprime `z` e lança `ArrayIndexOutOfBoundsException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: 'z' },
      explicacao: 'Os índices vão de 0 a 2. Um índice fora do intervalo lança `IllegalArgumentException`, não uma exceção de array.',
    },
    {
      id: 'senior-t3-e04-q04',
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
        System.out.println(s(Path.of("/a/./b/../../c").normalize()));
    }
}`,
      opcoes: ['`/c`', '`/a/c`', '`c`', '`/a/b/c`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `.` some; o primeiro `..` apaga `b`; o segundo apaga `a`. Sobra a raiz e `c`.',
    },
    {
      id: 'senior-t3-e04-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.io.File;
import java.nio.file.Path;

public class Teste {
    static String s(Path p) {
        return p.toString().replace(File.separatorChar, '/');
    }

    public static void main(String[] args) {
        System.out.println(s(Path.of("/a/b").relativize(Path.of("/a/c/d"))));
    }
}`,
      resposta: '../c/d',
      explicacao: 'De `/a/b`, sobe-se um nível até `/a` e desce-se por `c/d`.',
    },
    {
      id: 'senior-t3-e04-q06',
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
        System.out.println(s(Path.of("/a").resolve("/b/c")) + " " + s(Path.of("/a").resolve("b/c")));
    }
}`,
      opcoes: ['`/b/c /a/b/c`', '`/a/b/c /a/b/c`', '`/a//b/c /a/b/c`', '`/b/c /b/c`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Resolver um caminho com raiz devolve o próprio caminho. Um relativo é acrescentado ao fim.',
    },
    {
      id: 'senior-t3-e04-q07',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais métodos de `Path` funcionam só com o texto, sem acessar o sistema de arquivos? Escolha três.',
      opcoes: ['`normalize()`', '`resolve(outro)`', '`relativize(outro)`', '`toRealPath()`'],
      respostas: [0, 1, 2],
      explicacao: '`toRealPath()` consulta o disco para resolver atalhos e confirmar que o arquivo existe; os outros são operações de texto.',
    },
    {
      id: 'senior-t3-e04-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que devolve o caminho sem o último nome. O programa deve imprimir `2024`.',
      codigo: `import java.nio.file.Path;

public class Pasta {
    public static void main(String[] args) {
        System.out.println(Path.of("docs", "2024", "nota.txt").___().getFileName());
    }
}`,
      respostas: ['getParent'],
      saida: '2024',
      explicacao: 'O pai de `docs/2024/nota.txt` é `docs/2024`, cujo último nome é `2024`.',
    },
    {
      id: 'senior-t3-e04-q09',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        Path p = Path.of("docs", "nota.txt");
        String nome = p.getFileName();
        System.out.println(nome);
    }
}`,
      resposta: 6,
      explicacao: '`getFileName()` devolve um `Path`. Para obter o texto, use `p.getFileName().toString()`.',
    },
    {
      id: 'senior-t3-e04-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        Path r = Path.of("relatorios/2024/vendas.csv");
        System.out.println(r.endsWith("vendas.csv") + " " + r.endsWith("csv") + " " + r.startsWith("relatorios") + " " + r.startsWith("relat"));
    }
}`,
      opcoes: ['`true false true false`', '`true true true true`', '`true true true false`', '`true false true true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`startsWith` e `endsWith` comparam nomes inteiros do caminho, não pedaços de texto.',
    },
    {
      id: 'senior-t3-e04-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Path.of("a/../b").equals(Path.of("b")) + " " + Path.of("a/../b").normalize().equals(Path.of("b")));
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`equals` compara o texto como está. Só depois de normalizar os dois caminhos ficam iguais.',
    },
    {
      id: 'senior-t3-e04-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar, se o arquivo não existir?',
      codigo: `import java.io.IOException;
import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) throws IOException {
        System.out.println("antes");
        System.out.println(Path.of("nao-existe-javaflix.txt").toRealPath());
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `NoSuchFileException`',
        'Imprime `antes` e o caminho absoluto do arquivo',
        'Imprime `antes` e `null`',
        'Imprime `antes` e lança `FileNotFoundException`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NoSuchFileException', saida: 'antes' },
      explicacao: '`toRealPath` consulta o disco e exige que o arquivo exista. `toAbsolutePath`, ao contrário, só junta a pasta atual ao texto.',
    },
    {
      id: 'senior-t3-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Path.of("/srv").relativize(Path.of("dados/a.txt")));
    }
}`,
      opcoes: [
        'Lança `IllegalArgumentException`',
        'Imprime o caminho de `/srv` até `dados/a.txt`',
        'Imprime `dados/a.txt`',
        'Não compila: `relativize` exige dois caminhos absolutos',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalArgumentException', saida: '' },
      explicacao: 'Um caminho com raiz e um relativo não têm ponto de partida comum. O compilador não sabe disso; o erro aparece ao executar.',
    },
    {
      id: 'senior-t3-e04-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença entre `Path.of("a", "b")` e `Paths.get("a", "b")`?',
      opcoes: [
        'Nenhuma no resultado: `Path.of` chegou no Java 11 como forma preferida',
        '`Paths.get` acessa o disco; `Path.of` não',
        '`Path.of` cria caminhos absolutos; `Paths.get`, relativos',
        '`Paths.get` foi removido no Java 17',
      ],
      resposta: 0,
      explicacao: 'Os dois devolvem o mesmo `Path` do sistema de arquivos padrão. `Paths.get` continua existindo, e simplesmente chama `Path.of`.',
    },
    {
      id: 'senior-t3-e04-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.file.Path;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Path.of("a").getParent() + " " + Path.of("a").getRoot());
    }
}`,
      opcoes: ['`null null`', '`a a`', '`. null`', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um caminho relativo de um nome só não tem pai nem raiz. Concatenar `null` numa `String` não lança exceção.',
    },
  ],
};

export default episodio;
