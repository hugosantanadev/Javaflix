import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t3-e01',
  minutos: 15,
  aula,
  armadilhas: [
    'Classes com `Stream` no nome lidam com bytes; com `Reader` ou `Writer`, com caracteres.',
    '`read()` devolve `int`, não `byte` nem `char`: guardar o resultado num `byte` não compila.',
    'O fim do stream é -1; um byte negativo lido volta como um valor de 128 a 255.',
    '`read(byte[])` pode ler menos que o tamanho do buffer; use o valor devolvido ao escrever.',
    '`FileWriter` e `FileOutputStream` substituem o arquivo; para acrescentar, passe `true` no construtor.',
    'Sem `close()` ou `flush()`, o texto escrito por um `Writer` pode nem chegar ao arquivo.',
    'Um caractere pode ocupar vários bytes: em UTF-8, `á` ocupa dois.',
    'Até o Java 17, a codificação padrão dependia do sistema; desde o 18, é UTF-8.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Byte Streams',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/bytestreams.html',
      tipo: 'documentacao',
      porque: 'A cópia byte a byte com `FileInputStream` e `FileOutputStream`, e por que fechar sempre.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Character Streams',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/charstreams.html',
      tipo: 'documentacao',
      porque: 'Leitores e escritores de caracteres e as pontes entre bytes e texto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Understanding the Main Java I/O Concepts',
      url: 'https://dev.java/learn/api/io/java-io/intro/',
      tipo: 'documentacao',
      porque: 'O mapa do `java.io` e do `java.nio.file`, e o que cada um resolve.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Decorating I/O Streams',
      url: 'https://dev.java/learn/api/io/java-io/reading-writing/decorating/',
      tipo: 'documentacao',
      porque: 'O padrão Decorator aplicado aos streams, com as camadas que se empilham.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.io.InputStream',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStream.html',
      tipo: 'documentacao',
      porque: 'O contrato exato de `read`, `read(byte[])` e `transferTo`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 400: UTF-8 by Default',
      url: 'https://openjdk.org/jeps/400',
      tipo: 'documentacao',
      porque: 'Por que o Java 18 fixou UTF-8 como padrão e o que muda em programas antigos.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Jakob Jenkov: Java InputStream',
      url: 'https://jenkov.com/tutorials/java-io/inputstream.html',
      tipo: 'artigo',
      porque: 'Os métodos de leitura, a marca de fim e o fechamento correto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Jakob Jenkov: Java Reader',
      url: 'https://jenkov.com/tutorials/java-io/reader.html',
      tipo: 'artigo',
      porque: 'A família de leitores de caracteres e a relação com a codificação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: IO pt 02, FileWriter',
      url: 'https://www.youtube.com/watch?v=4wsysT3OxO4',
      tipo: 'video',
      porque: 'Escrever em arquivo, sobrescrever e acrescentar, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: IO pt 03, FileReader',
      url: 'https://www.youtube.com/watch?v=9Y8FKrklbMQ',
      tipo: 'video',
      porque: 'Ler um arquivo de texto caractere a caractere, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Core Java, Volume II (Cay Horstmann)',
      url: 'https://horstmann.com/corejava/',
      tipo: 'livro',
      porque: 'A hierarquia completa de streams, a combinação de filtros e a codificação de caracteres.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 2, "Input and Output": seção 2.1, "Input/Output Streams"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A nomenclatura das classes de I/O e as perguntas de "qual classe usar" que a prova faz.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 14, "I/O": seções "Introducing I/O Streams" e "Reading and Writing Files"',
    },
  ],
  desafio: {
    titulo: 'Raio X de um arquivo',
    enunciado:
      'Grave num arquivo temporário o texto `"Olá, mundo!\\nJava é ação.\\n"` em UTF-8, usando um `FileOutputStream`. Depois, leia o arquivo duas vezes: com um `FileInputStream`, contando os bytes e quantos deles ficam fora do ASCII (valor 128 ou mais); e com um `FileReader` em UTF-8, contando os caracteres e as linhas (quantidade de `\\n`). A saída deve ser:\n\n```text\nbytes: 29\nbytes fora do ASCII: 8\ncaracteres: 25\nlinhas: 2\n```',
    dicas: [
      '`File.createTempFile("texto", ".txt")` cria o arquivo; `deleteOnExit()` o apaga no fim.',
      'Os dois laços são iguais: ler até `read()` devolver -1.',
      'Cada uma das letras acentuadas ocupa dois bytes em UTF-8.',
    ],
    solucao: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

public class Contador {
    public static void main(String[] args) throws IOException {
        File arquivo = File.createTempFile("texto", ".txt");
        arquivo.deleteOnExit();
        try (OutputStream saida = new FileOutputStream(arquivo)) {
            saida.write("Olá, mundo!\\nJava é ação.\\n".getBytes(StandardCharsets.UTF_8));
        }
        int bytes = 0;
        int naoAscii = 0;
        try (InputStream entrada = new FileInputStream(arquivo)) {
            int b;
            while ((b = entrada.read()) != -1) {
                bytes++;
                if (b >= 128) {
                    naoAscii++;
                }
            }
        }
        int caracteres = 0;
        int linhas = 0;
        try (Reader leitor = new FileReader(arquivo, StandardCharsets.UTF_8)) {
            int c;
            while ((c = leitor.read()) != -1) {
                caracteres++;
                if (c == '\\n') {
                    linhas++;
                }
            }
        }
        System.out.println("bytes: " + bytes);
        System.out.println("bytes fora do ASCII: " + naoAscii);
        System.out.println("caracteres: " + caracteres);
        System.out.println("linhas: " + linhas);
    }
}`,
    saida: 'bytes: 29\nbytes fora do ASCII: 8\ncaracteres: 25\nlinhas: 2',
    comentarios:
      'Os mesmos 29 bytes viram 25 caracteres porque as quatro letras acentuadas (á, é, ç, ã) ocupam dois bytes cada em UTF-8, e todos esses bytes são maiores que 127. O `\\n` foi escrito à mão, e não com `println`, para o arquivo ter o mesmo tamanho em qualquer sistema: no Windows, a quebra de linha padrão tem dois bytes.',
  },
  exercicios: [
    {
      id: 'senior-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        InputStream in = new ByteArrayInputStream(new byte[] {-2, 0, 127});
        System.out.println(in.read() + " " + in.read() + " " + in.read() + " " + in.read());
    }
}`,
      opcoes: ['`254 0 127 -1`', '`-2 0 127 -1`', '`-2 0 127 0`', '`254 0 127 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`read()` devolve o byte como valor de 0 a 255: o -2 vira 254. Só o fim do stream devolve -1.',
    },
    {
      id: 'senior-t3-e01-q02',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais classes leem caracteres, e não bytes? Escolha três.',
      opcoes: ['`BufferedReader`', '`FileReader`', '`InputStreamReader`', '`FileInputStream`', '`ObjectInputStream`', '`BufferedInputStream`'],
      respostas: [0, 1, 2],
      explicacao: 'Classes terminadas em `Reader` leem caracteres. As terminadas em `InputStream` leem bytes.',
    },
    {
      id: 'senior-t3-e01-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) {
        String s = "ação";
        System.out.println(s.getBytes(StandardCharsets.UTF_8).length + " " + s.length());
    }
}`,
      resposta: '6 4',
      explicacao: 'São quatro caracteres. Em UTF-8, `ç` e `ã` ocupam dois bytes cada: 1 + 2 + 2 + 1.',
    },
    {
      id: 'senior-t3-e01-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        InputStream dez = new ByteArrayInputStream(new byte[10]);
        byte[] buf = new byte[4];
        System.out.println(dez.read(buf) + " " + dez.read(buf) + " " + dez.read(buf) + " " + dez.read(buf));
    }
}`,
      opcoes: ['`4 4 2 -1`', '`4 4 4 -1`', '`4 4 2 0`', '`10 -1 -1 -1`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Cada leitura devolve quantos bytes leu: 4, 4 e os 2 que sobravam. Depois disso, -1.',
    },
    {
      id: 'senior-t3-e01-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Reader r = new FileInputStream("dados.txt");
        System.out.println(r.read());
    }
}`,
      opcoes: [
        'Não compila: `FileInputStream` não é um `Reader`',
        'Compila e imprime o primeiro caractere',
        'Compila e lança `FileNotFoundException`',
        'Compila, com a conversão automática de bytes em caracteres',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'As famílias de bytes e de caracteres não se misturam. Para ler texto de um stream de bytes, envolva-o num `InputStreamReader`.',
    },
    {
      id: 'senior-t3-e01-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que o segundo escritor acrescente ao arquivo em vez de substituí-lo. O programa deve imprimir `ab`.',
      codigo: `import java.io.*;
import java.nio.charset.StandardCharsets;

public class Log {
    public static void main(String[] args) throws IOException {
        File f = File.createTempFile("log", ".txt");
        f.deleteOnExit();
        try (Writer w = new FileWriter(f, StandardCharsets.UTF_8)) {
            w.write("a");
        }
        try (Writer w = new FileWriter(f, StandardCharsets.UTF_8, ___)) {
            w.write("b");
        }
        try (Reader r = new FileReader(f, StandardCharsets.UTF_8)) {
            char[] buf = new char[10];
            System.out.println(new String(buf, 0, r.read(buf)));
        }
    }
}`,
      respostas: ['true'],
      saida: 'ab',
      explicacao: 'O último argumento `append` decide entre acrescentar (`true`) e substituir (`false`, o padrão).',
    },
    {
      id: 'senior-t3-e01-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        InputStream entrada = new ByteArrayInputStream(new byte[] {1, 2});
        int a = entrada.read();
        byte b = entrada.read();
        System.out.println(a + b);
    }
}`,
      resposta: 7,
      explicacao: '`read()` devolve `int`, e a conversão para `byte` perderia informação. Seria preciso um cast explícito, que trataria o -1 do fim como um byte comum.',
    },
    {
      id: 'senior-t3-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) {
        byte[] utf8 = "é".getBytes(StandardCharsets.UTF_8);
        System.out.println(new String(utf8, StandardCharsets.ISO_8859_1));
    }
}`,
      opcoes: ['`Ã©`', '`é`', '`?`', 'Lança `UnsupportedEncodingException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `é` em UTF-8 são dois bytes. Lidos em ISO-8859-1, em que cada byte é um caractere, viram `Ã` e `©`.',
    },
    {
      id: 'senior-t3-e01-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de executar, se o arquivo não existir?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        System.out.println("antes");
        try (InputStream in = new FileInputStream("nao-existe-javaflix.txt")) {
            System.out.println(in.read());
        }
    }
}`,
      opcoes: [
        'Imprime `antes` e lança `FileNotFoundException`',
        'Imprime `antes` e `-1`',
        'Imprime `antes` e cria o arquivo vazio',
        'Não compila: `FileNotFoundException` não é tratada',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'FileNotFoundException', saida: 'antes' },
      explicacao: 'Abrir para leitura um arquivo inexistente falha no construtor. `FileNotFoundException` é subclasse de `IOException`, declarada no `throws` do `main`.',
    },
    {
      id: 'senior-t3-e01-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;
import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) throws IOException {
        File f = File.createTempFile("buffer", ".txt");
        f.deleteOnExit();
        Writer w = new FileWriter(f, StandardCharsets.UTF_8);
        w.write("abc");
        System.out.print(f.length() + " ");
        w.close();
        System.out.println(f.length());
    }
}`,
      opcoes: ['`0 3`', '`3 3`', '`0 0`', '`3 0`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `FileWriter` acumula o texto codificado num buffer interno. Só o `close()`, ou um `flush()`, o envia ao arquivo.',
    },
    {
      id: 'senior-t3-e01-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) {
        StringWriter sw = new StringWriter();
        try (PrintWriter pw = new PrintWriter(sw)) {
            pw.print("x=");
            pw.print(42);
        }
        System.out.println(sw);
    }
}`,
      opcoes: ['`x=42`', '`x=`', 'Uma linha vazia', 'Não compila: `PrintWriter` exige um arquivo'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Um `PrintWriter` pode escrever em qualquer `Writer`. O `StringWriter` guarda o texto na memória, e seu `toString()` o devolve.',
    },
    {
      id: 'senior-t3-e01-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;
import java.nio.charset.StandardCharsets;

public class Teste {
    public static void main(String[] args) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        long n = new ByteArrayInputStream("abc".getBytes(StandardCharsets.UTF_8)).transferTo(out);
        System.out.println(n + " " + out);
    }
}`,
      opcoes: ['`3 abc`', '`3 [97, 98, 99]`', '`0 abc`', 'Não compila: `transferTo` não existe'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`transferTo`, do Java 9, copia tudo e devolve quantos bytes copiou. O `toString()` de um `ByteArrayOutputStream` decodifica os bytes como texto.',
    },
    {
      id: 'senior-t3-e01-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Fechar um `BufferedReader` fecha também o `FileReader` que ele envolve',
        '`InputStreamReader` converte um stream de bytes em caracteres',
        '`FileOutputStream` acrescenta ao fim do arquivo por padrão',
        '`read()` devolve 0 quando chega ao fim do stream',
        '`FileReader` lê bytes',
      ],
      respostas: [0, 1],
      explicacao: 'O padrão de `FileOutputStream` é substituir; `read()` devolve -1 no fim; e `FileReader` lê caracteres.',
    },
    {
      id: 'senior-t3-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um laço de cópia faz `while ((n = in.read(buffer)) != -1) { out.write(buffer); }`, com um buffer de 4096 bytes, num arquivo de 5000 bytes. Qual é o problema?',
      opcoes: [
        'A cópia fica com 8192 bytes: a segunda escrita grava o buffer inteiro, incluindo restos da leitura anterior',
        'Nenhum: `write(buffer)` grava só o que foi lido',
        'O laço nunca termina',
        'A cópia fica com 4096 bytes',
      ],
      resposta: 0,
      explicacao: 'A segunda leitura traz 904 bytes, mas `write(buffer)` grava os 4096. O certo é `out.write(buffer, 0, n)`.',
    },
    {
      id: 'senior-t3-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um programa usa `new FileReader("dados.txt")`, sem informar a codificação, para ler um arquivo gravado em UTF-8 com acentos. Em qual situação os acentos podem sair errados?',
      opcoes: [
        'Rodando no Java 17 num Windows configurado com windows-1252',
        'Rodando no Java 21 em qualquer sistema',
        'Rodando no Java 18 no Linux',
        'Em nenhuma: `FileReader` detecta a codificação sozinho',
      ],
      resposta: 0,
      explicacao: 'Até o Java 17, a codificação padrão vinha do sistema. Desde o Java 18, é sempre UTF-8. Nenhuma classe do `java.io` detecta a codificação de um arquivo.',
    },
  ],
};

export default episodio;
