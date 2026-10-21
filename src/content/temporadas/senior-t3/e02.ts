import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t3-e02',
  minutos: 16,
  aula,
  armadilhas: [
    '`readLine()` devolve a linha sem o terminador, e `null` no fim, não -1.',
    '`BufferedReader` envolve um `Reader`; passar um `InputStream` direto não compila.',
    '`mark` e `reset` só funcionam se `markSupported()` for `true`; `FileReader` e `FileInputStream` não suportam.',
    '`reset()` sem `mark()` anterior lança `IOException`.',
    '`PrintWriter` e `PrintStream` não lançam `IOException`; os erros ficam em `checkError()`.',
    '`printf` com um tipo incompatível, como `%d` para `String`, compila e lança `IllegalFormatConversionException`.',
    '`printf` usa a localidade padrão para números: informe a `Locale` para uma saída estável.',
    '`System.console()` pode devolver `null`, e `readPassword` devolve `char[]`.',
    '`Scanner.nextInt()` não consome a quebra de linha: o próximo `nextLine()` devolve o resto vazio.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Buffered Streams',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/buffers.html',
      tipo: 'documentacao',
      porque: 'As quatro classes bufferizadas e quando o buffer é descarregado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: I/O from the Command Line',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/cl.html',
      tipo: 'documentacao',
      porque: 'Os streams padrão e a classe `Console`, com o exemplo de troca de senha.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Formatting',
      url: 'https://docs.oracle.com/javase/tutorial/essential/io/formatting.html',
      tipo: 'documentacao',
      porque: '`print`, `println` e `format`, com os especificadores mais usados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Dev.java: Reading and Writing Text Files',
      url: 'https://dev.java/learn/api/io/java-io/reading-writing/buffered-text/',
      tipo: 'documentacao',
      porque: 'Leitura linha a linha e escrita bufferizada, com a codificação explícita.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.io.Console',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Console.html',
      tipo: 'documentacao',
      porque: 'Quando `System.console()` devolve `null` e por que a senha volta como `char[]`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.Formatter',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Formatter.html',
      tipo: 'documentacao',
      porque: 'A sintaxe completa dos especificadores de formato, com largura, precisão e sinalizadores.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Guide to BufferedReader',
      url: 'https://www.baeldung.com/java-buffered-reader',
      tipo: 'artigo',
      porque: '`readLine`, `lines`, `mark`, `reset` e `skip`, com exemplos de cada um.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Read and Write User Input in Java',
      url: 'https://www.baeldung.com/java-console-input-output',
      tipo: 'artigo',
      porque: '`Scanner`, `BufferedReader` sobre `System.in` e `Console`, comparados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: PrintStream vs PrintWriter in Java',
      url: 'https://www.baeldung.com/java-printstream-vs-printwriter',
      tipo: 'artigo',
      porque: 'A diferença entre as duas classes de impressão e o tratamento de erros sem exceção.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: IO pt 04, BufferedWriter',
      url: 'https://www.youtube.com/watch?v=j7cWU9PM7wc',
      tipo: 'video',
      porque: 'Escrita bufferizada, `newLine` e `flush`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: IO pt 05, BufferedReader',
      url: 'https://www.youtube.com/watch?v=Z-EG0cRvVBQ',
      tipo: 'video',
      porque: 'Leitura de arquivos linha a linha, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: '`mark`, `reset`, `skip` e a classe `Console`, com as pegadinhas que a prova cobra.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 14, "I/O": seções "Working with Advanced APIs" e "Interacting with Users"',
    },
  ],
  desafio: {
    titulo: 'Boletim em arquivo',
    enunciado:
      'Grave num arquivo temporário, com um `BufferedWriter`, as linhas `aluno;nota`, `Ana;8.5`, `Bruno;6`, `Carla;9.25` e `Diego;4.5`. Depois, leia esse arquivo com um `BufferedReader`, pule o cabeçalho e escreva em outro arquivo temporário, com um `PrintWriter`, um relatório com o nome em 8 posições à esquerda, a nota em 5 posições com 2 casas e a situação (`aprovado` com nota 6 ou mais). Termine com a média. Use `Locale.US` nos números. Por fim, imprima o relatório. A saída deve ser:\n\n```text\nALUNO    NOTA SITUAÇÃO\nAna      8.50 aprovado\nBruno    6.00 aprovado\nCarla    9.25 aprovado\nDiego    4.50 reprovado\nmédia: 7.06\n```',
    dicas: [
      'Um `readLine()` antes do laço descarta o cabeçalho.',
      'O formato `"%-8s%5.2f %s%n"` alinha nome, nota e situação.',
      'Um try-with-resources pode abrir o leitor e o escritor juntos, separados por `;`.',
    ],
    solucao: `import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

public class Relatorio {
    public static void main(String[] args) throws IOException {
        File notas = File.createTempFile("notas", ".csv");
        File relatorio = File.createTempFile("relatorio", ".txt");
        notas.deleteOnExit();
        relatorio.deleteOnExit();
        try (BufferedWriter w = new BufferedWriter(new FileWriter(notas, StandardCharsets.UTF_8))) {
            for (String linha : new String[] {"aluno;nota", "Ana;8.5", "Bruno;6", "Carla;9.25", "Diego;4.5"}) {
                w.write(linha);
                w.newLine();
            }
        }

        double soma = 0;
        int alunos = 0;
        try (BufferedReader r = new BufferedReader(new FileReader(notas, StandardCharsets.UTF_8));
             PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(relatorio, StandardCharsets.UTF_8)))) {
            r.readLine();
            out.printf("%-8s%5s %s%n", "ALUNO", "NOTA", "SITUAÇÃO");
            String linha;
            while ((linha = r.readLine()) != null) {
                String[] partes = linha.split(";");
                double nota = Double.parseDouble(partes[1]);
                out.printf(Locale.US, "%-8s%5.2f %s%n", partes[0], nota, nota >= 6 ? "aprovado" : "reprovado");
                soma += nota;
                alunos++;
            }
            out.printf(Locale.US, "média: %.2f%n", soma / alunos);
        }

        try (BufferedReader r = new BufferedReader(new FileReader(relatorio, StandardCharsets.UTF_8))) {
            r.lines().forEach(System.out::println);
        }
    }
}`,
    saida: 'ALUNO    NOTA SITUAÇÃO\nAna      8.50 aprovado\nBruno    6.00 aprovado\nCarla    9.25 aprovado\nDiego    4.50 reprovado\nmédia: 7.06',
    comentarios:
      'O `PrintWriter` envolve um `BufferedWriter`, que envolve o `FileWriter`: três camadas, cada uma com seu papel (formatar, agrupar as escritas, gravar no arquivo). Fechar o de fora, no fim do try, descarrega e fecha todas. Sem `Locale.US`, a mesma linha sairia `8,50` numa máquina configurada em português. O cabeçalho não tem números, por isso dispensa a localidade.',
  },
  exercicios: [
    {
      id: 'senior-t3-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        BufferedReader r = new BufferedReader(new StringReader("a\\nb"));
        System.out.println(r.readLine() + " " + r.readLine() + " " + r.readLine());
    }
}`,
      opcoes: ['`a b null`', '`a b -1`', '`a b` e lança `EOFException`', '`a\\n b null`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`readLine` devolve cada linha sem o terminador. No fim do texto, devolve `null`.',
    },
    {
      id: 'senior-t3-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        Reader s = new BufferedReader(new StringReader("12345"));
        System.out.print((char) s.read());
        s.mark(5);
        s.skip(2);
        System.out.print((char) s.read());
        s.reset();
        System.out.println((char) s.read());
    }
}`,
      opcoes: ['`142`', '`143`', '`141`', '`132`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Lê `1` e marca. Pula `2` e `3`, lê `4`. O `reset` volta para logo depois do `1`, e a próxima leitura é `2`.',
    },
    {
      id: 'senior-t3-e02-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Para quais classes `markSupported()` devolve `true`? Escolha três.',
      opcoes: ['`BufferedReader`', '`BufferedInputStream`', '`ByteArrayInputStream`', '`FileInputStream`', '`FileReader`'],
      respostas: [0, 1, 2],
      explicacao: 'Marcar exige guardar na memória o que foi lido depois da marca. As classes de arquivo leem direto do disco e não suportam.',
    },
    {
      id: 'senior-t3-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        BufferedReader r = new BufferedReader(new StringReader("abc"));
        System.out.println((char) r.read());
        r.reset();
    }
}`,
      opcoes: [
        'Imprime `a` e lança `IOException`',
        'Imprime `a` e volta ao começo do texto',
        'Imprime `a` e termina',
        'Não compila: `reset` exige `mark`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IOException', saida: 'a' },
      explicacao: 'O `BufferedReader` suporta marca, mas nenhuma foi feita. O `reset` não tem para onde voltar e lança `IOException`.',
    },
    {
      id: 'senior-t3-e02-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.Scanner;

public class Teste {
    public static void main(String[] args) {
        Scanner sc = new Scanner("10 20\\nfim\\n");
        int a = sc.nextInt();
        int b = sc.nextInt();
        String x = sc.nextLine();
        String y = sc.nextLine();
        System.out.println(a + b + " [" + x + "] " + y);
    }
}`,
      resposta: '30 [] fim',
      explicacao: 'Depois do segundo `nextInt`, sobra só a quebra de linha. O primeiro `nextLine` devolve o resto vazio; o segundo lê `fim`.',
    },
    {
      id: 'senior-t3-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que lê uma linha inteira. O programa deve imprimir `primeira`.',
      codigo: `import java.io.*;

public class Ler {
    public static void main(String[] args) throws IOException {
        BufferedReader r = new BufferedReader(new StringReader("primeira\\nsegunda"));
        System.out.println(r.___());
    }
}`,
      respostas: ['readLine'],
      saida: 'primeira',
      explicacao: '`readLine` lê até a quebra de linha e devolve o texto sem ela.',
    },
    {
      id: 'senior-t3-e02-q07',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.io.Console;

public class Login {
    public static void main(String[] args) {
        Console c = System.console();
        if (c != null) {
            String usuario = c.readLine("Usuário: ");
            String senha = c.readPassword("Senha: ");
        }
    }
}`,
      resposta: 8,
      explicacao: '`readPassword` devolve `char[]`, para a senha poder ser apagada da memória depois de usada. `readLine` devolve `String`.',
    },
    {
      id: 'senior-t3-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `public class Teste {
    public static void main(String[] args) {
        System.out.printf("%d%n", "dez");
    }
}`,
      opcoes: [
        'Lança `IllegalFormatConversionException`',
        'Imprime `dez`',
        'Imprime `10`',
        'Não compila: `%d` exige um número',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'IllegalFormatConversionException', saida: '' },
      explicacao: 'O compilador não confere o formato contra os argumentos: `printf` recebe `Object...`. O erro só aparece ao executar.',
    },
    {
      id: 'senior-t3-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(String.format(Locale.US, "%08.3f|%-5d|%5s|", 3.14159, 42, "ab"));
    }
}`,
      opcoes: ['`0003.142|42   |   ab|`', '`3.142   |   42|ab   |`', '`00003.14|42   |ab   |`', '`0003,142|42   |   ab|`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`%08.3f`: 8 posições com zeros à esquerda e 3 casas. `%-5d`: alinhado à esquerda em 5. `%5s`: alinhado à direita em 5. Com `Locale.US`, o separador decimal é o ponto.',
    },
    {
      id: 'senior-t3-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um programa chama `System.console().readLine()` e é executado com a entrada redirecionada de um arquivo, sem terminal. O que pode acontecer?',
      opcoes: [
        '`System.console()` devolve `null`, e a chamada lança `NullPointerException`',
        'O `Console` lê a primeira linha do arquivo',
        'O programa espera o usuário digitar',
        'Não compila: `Console` exige um terminal',
      ],
      resposta: 0,
      explicacao: 'Sem um terminal interativo, não há console. O código deve testar o resultado de `System.console()` ou usar `System.in`.',
    },
    {
      id: 'senior-t3-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) {
        System.out.println(new BufferedReader(new StringReader("a\\n\\nb\\n")).lines().count());
    }
}`,
      opcoes: ['`3`', '`2`', '`4`', '`5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As linhas são `a`, uma vazia e `b`. A quebra final termina a última linha, sem criar uma quarta.',
    },
    {
      id: 'senior-t3-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual método envia ao destino o conteúdo acumulado num `BufferedWriter`, sem fechá-lo?',
      opcoes: ['`flush()`', '`close()`', '`newLine()`', '`reset()`'],
      resposta: 0,
      explicacao: '`close()` também descarrega, mas fecha o stream. `newLine()` só escreve o separador, e `reset()` é de leitura.',
    },
    {
      id: 'senior-t3-e02-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `PrintWriter` são verdadeiras? Escolha duas.',
      opcoes: [
        'Seus métodos de escrita não lançam `IOException`',
        'Tem `printf` e `format`, que fazem a mesma coisa',
        '`println` lança `IOException` se o disco estiver cheio',
        'Só pode escrever em arquivos',
        '`checkError()` lança a última exceção ocorrida',
      ],
      respostas: [0, 1],
      explicacao: 'Os erros ficam registrados, e `checkError()` devolve um `boolean`. Um `PrintWriter` pode envolver qualquer `Writer` ou `OutputStream`.',
    },
    {
      id: 'senior-t3-e02-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.io.*;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        StringWriter sw = new StringWriter();
        try (PrintWriter pw = new PrintWriter(sw)) {
            pw.printf(Locale.US, "%.1f%%", 12.345);
        }
        System.out.println(sw);
    }
}`,
      resposta: '12.3%',
      explicacao: '`%.1f` arredonda para uma casa. `%%` escreve um sinal de porcentagem literal.',
    },
    {
      id: 'senior-t3-e02-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        BufferedReader r = new BufferedReader(new FileInputStream("dados.txt"));
        System.out.println(r.readLine());
    }
}`,
      opcoes: [
        'Não compila: `BufferedReader` exige um `Reader`',
        'Compila e imprime a primeira linha',
        'Compila e lança `FileNotFoundException` se o arquivo não existir',
        'Compila, convertendo os bytes em caracteres',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 5 },
      explicacao: 'Para ler texto de um `InputStream`, é preciso a ponte: `new BufferedReader(new InputStreamReader(new FileInputStream("dados.txt")))`.',
    },
  ],
};

export default episodio;
