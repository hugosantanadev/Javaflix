import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t3-e03',
  minutos: 15,
  aula,
  armadilhas: [
    '`Serializable` é uma interface marcadora: não tem métodos para implementar.',
    'Campos `transient` e `static` não são gravados; na leitura, `transient` recebe o valor padrão, mesmo com inicializador.',
    'Na leitura, construtores e inicializadores da classe serializável não rodam; o construtor sem argumentos da primeira superclasse não serializável roda.',
    'Campos de uma superclasse não serializável não são gravados: voltam com os valores do construtor dela.',
    '`readObject` devolve `Object` e declara `ClassNotFoundException`; sem cast ou sem tratar a exceção, não compila.',
    'Um campo não `transient` de tipo não serializável causa `NotSerializableException` ao gravar.',
    'Subclasses de uma classe serializável também são serializáveis, sem precisar repetir o `implements`.',
    'O mesmo objeto gravado duas vezes no mesmo stream volta como um único objeto.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de java.io.Serializable',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Serializable.html',
      tipo: 'documentacao',
      porque: 'As regras oficiais: superclasses não serializáveis, métodos especiais e `serialVersionUID`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Java Object Serialization Specification',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/serialization/index.html',
      tipo: 'documentacao',
      porque: 'O formato dos bytes, a compatibilidade entre versões e a serialização de records.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 290: Filter Incoming Serialization Data',
      url: 'https://openjdk.org/jeps/290',
      tipo: 'documentacao',
      porque: 'Por que filtrar o que é desserializado e como o `ObjectInputFilter` funciona.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Secure Coding Guidelines for Java SE',
      url: 'https://www.oracle.com/java/technologies/javase/seccodeguide.html',
      tipo: 'documentacao',
      porque: 'A seção de serialização das diretrizes de segurança da Oracle, com os riscos de desserializar dados não confiáveis.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: Introduction to Java Serialization',
      url: 'https://www.baeldung.com/java-serialization',
      tipo: 'artigo',
      porque: 'Gravar e ler objetos, herança e serialização personalizada com `writeObject` e `readObject`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: The transient Keyword in Java',
      url: 'https://www.baeldung.com/java-transient-keyword',
      tipo: 'artigo',
      porque: 'O que acontece com campos `transient`, inclusive os `final`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: What Is the serialVersionUID?',
      url: 'https://www.baeldung.com/java-serial-version-uid',
      tipo: 'artigo',
      porque: 'A `InvalidClassException` provocada por uma mudança na classe, e como evitá-la.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to the Externalizable Interface in Java',
      url: 'https://www.baeldung.com/java-externalizable',
      tipo: 'artigo',
      porque: 'Controle total sobre o formato, e a exigência do construtor público sem argumentos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'DevDojo: Serialization pt 01',
      url: 'https://www.youtube.com/watch?v=9Bkbcn7Dgvc',
      tipo: 'video',
      porque: 'Serializar e desserializar objetos em arquivo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Effective Java, 3ª edição (Joshua Bloch)',
      url: 'https://www.informit.com/store/effective-java-9780134685991',
      tipo: 'livro',
      porque: 'Os riscos da serialização e por que preferir alternativas, do autor das coleções do Java.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 12, "Serialization": Item 85, "Prefer alternatives to Java serialization", e Item 86, "Implement Serializable with great caution"',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As regras de serialização com a pergunta clássica dos construtores na leitura.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 14, "I/O": seção "Serializing Data"',
    },
  ],
  desafio: {
    titulo: 'Salvar e restaurar o jogo',
    enunciado:
      'Um jogo salva o progresso numa lista de `Jogador`, com nome, nível, pontos e um `cache` de texto que não deve ser salvo (marque-o como `transient`). Grave a lista num arquivo temporário com `ObjectOutputStream`, depois leia-a de volta e imprima cada jogador, informando se o cache voltou vazio. Use `serialVersionUID`. Por fim, mostre que os objetos lidos são novos e iguais. A saída deve ser:\n\n```text\nAna nível 7 com 1200 pontos, cache null\nBruno nível 3 com 450 pontos, cache null\nnovos: true, iguais: true\n```',
    dicas: [
      '`ArrayList` é serializável, e grava cada elemento junto.',
      '`readObject` devolve `Object`: faça o cast para `List<Jogador>` com `@SuppressWarnings("unchecked")`.',
      'Para comparar conteúdo, sobrescreva `equals` em `Jogador` ignorando o cache.',
    ],
    solucao: `import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Salvamento {
    static class Jogador implements Serializable {
        private static final long serialVersionUID = 1L;
        final String nome;
        final int nivel;
        final int pontos;
        transient String cache;

        Jogador(String nome, int nivel, int pontos) {
            this.nome = nome;
            this.nivel = nivel;
            this.pontos = pontos;
            this.cache = "calculado em memória";
        }

        @Override
        public boolean equals(Object o) {
            return o instanceof Jogador j && nome.equals(j.nome) && nivel == j.nivel && pontos == j.pontos;
        }

        @Override
        public int hashCode() {
            return Objects.hash(nome, nivel, pontos);
        }

        @Override
        public String toString() {
            return nome + " nível " + nivel + " com " + pontos + " pontos, cache " + cache;
        }
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        File arquivo = File.createTempFile("save", ".bin");
        arquivo.deleteOnExit();
        List<Jogador> jogadores = new ArrayList<>(List.of(new Jogador("Ana", 7, 1200), new Jogador("Bruno", 3, 450)));
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(arquivo))) {
            out.writeObject(jogadores);
        }
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(arquivo))) {
            @SuppressWarnings("unchecked")
            List<Jogador> lidos = (List<Jogador>) in.readObject();
            lidos.forEach(System.out::println);
            System.out.println("novos: " + (lidos.get(0) != jogadores.get(0)) + ", iguais: " + lidos.equals(jogadores));
        }
    }
}`,
    saida: 'Ana nível 7 com 1200 pontos, cache null\nBruno nível 3 com 450 pontos, cache null\nnovos: true, iguais: true',
    comentarios:
      'A lista inteira foi gravada com um único `writeObject`, porque a serialização percorre o grafo de objetos. Os campos `final` são restaurados normalmente, mesmo sem o construtor rodar: a JVM os preenche direto. Já o `cache`, `transient`, volta `null`, embora o construtor o preenchesse: na leitura, construtor nenhum de `Jogador` é chamado.',
  },
  exercicios: [
    {
      id: 'senior-t3-e03-q01',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    static class Conta implements Serializable {
        static String banco = "A";
        String titular = "Ana";
        transient int saldo = 100;
    }

    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(new Conta());
        }
        Conta.banco = "B";
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            Conta c = (Conta) in.readObject();
            System.out.println(c.titular + " " + c.saldo + " " + Conta.banco);
        }
    }
}`,
      opcoes: ['`Ana 0 B`', '`Ana 100 A`', '`Ana 100 B`', '`Ana 0 A`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `saldo` é `transient`, e o inicializador não roda na leitura: fica 0. O `banco` é estático, não foi gravado, e vale o que a classe tem agora.',
    },
    {
      id: 'senior-t3-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.*;

public class Teste {
    static class Tarefa implements Serializable {
        String nome = "backup";
        Thread executor = new Thread(() -> { });
    }

    public static void main(String[] args) throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(new ByteArrayOutputStream())) {
            out.writeObject(new Tarefa());
        }
    }
}`,
      opcoes: [
        'Lança `NotSerializableException`',
        'Grava a tarefa, ignorando o campo `executor`',
        'Não compila: `Thread` não é `Serializable`',
        'Grava a tarefa e a thread',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NotSerializableException', saida: '' },
      explicacao: '`Thread` não é serializável, e o campo não é `transient`. O compilador não confere isso; a falha acontece ao gravar.',
    },
    {
      id: 'senior-t3-e03-q03',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ObjectInputStream in = new ObjectInputStream(new FileInputStream("dados.bin"));
        String s = in.readObject();
        System.out.println(s);
    }
}`,
      resposta: 6,
      explicacao: '`readObject` devolve `Object`. A atribuição a `String` exige um cast: `(String) in.readObject()`.',
    },
    {
      id: 'senior-t3-e03-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    static class Base {
        int nivel = 1;

        Base() {
            System.out.print("B");
        }
    }

    static class Filho extends Base implements Serializable {
        int pontos = 10;

        Filho() {
            System.out.print("F");
            nivel = 5;
            pontos = 20;
        }
    }

    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(new Filho());
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            Filho f = (Filho) in.readObject();
            System.out.println(" " + f.nivel + " " + f.pontos);
        }
    }
}`,
      opcoes: ['`BFB 1 20`', '`BFBF 5 20`', '`BF 5 20`', '`BFB 5 10`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Na leitura, só o construtor de `Base`, não serializável, roda: imprime `B` e deixa `nivel` em 1. O `pontos` vem do stream, com o valor 20 gravado.',
    },
    {
      id: 'senior-t3-e03-q05',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Num objeto serializável, quais campos não são gravados? Escolha dois.',
      opcoes: ['Campos `transient`', 'Campos `static`', 'Campos `private`', 'Campos `final`', 'Campos do tipo `String`'],
      respostas: [0, 1],
      explicacao: 'O modificador de acesso e o `final` não interferem na serialização. Só `transient` e `static` ficam de fora.',
    },
    {
      id: 'senior-t3-e03-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete para que a senha não seja gravada. O programa deve imprimir `null`.',
      codigo: `import java.io.*;

public class Login {
    static class Credencial implements Serializable {
        String usuario = "ana";
        ___ String senha = "segredo";
    }

    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(new Credencial());
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            System.out.println(((Credencial) in.readObject()).senha);
        }
    }
}`,
      respostas: ['transient'],
      saida: 'null',
      explicacao: 'O campo `transient` fica de fora e, na leitura, recebe o valor padrão de uma referência: `null`.',
    },
    {
      id: 'senior-t3-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um objeto foi gravado com a versão 1 de uma classe, que declara `serialVersionUID = 1L`. A classe mudou e agora declara `serialVersionUID = 2L`. O que acontece ao ler o objeto?',
      opcoes: [
        'Lança `InvalidClassException`',
        'Lê normalmente, ignorando os campos novos',
        'Lança `ClassNotFoundException`',
        'Lê o objeto com todos os campos em `null`',
      ],
      resposta: 0,
      explicacao: 'O `serialVersionUID` diz que as versões são incompatíveis. Com o mesmo valor, o Java tentaria a leitura, ignorando campos removidos e deixando os novos com o valor padrão.',
    },
    {
      id: 'senior-t3-e03-q08',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.io.*;

public class Teste {
    record Nota(int valor) implements Serializable {
        Nota {
            System.out.print("c ");
        }
    }

    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(new Nota(7));
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            Nota n = (Nota) in.readObject();
            System.out.println(n.valor());
        }
    }
}`,
      resposta: 'c c 7',
      explicacao: 'Diferente das classes comuns, um record é reconstruído pelo construtor canônico, que roda uma vez na criação e outra na leitura.',
    },
    {
      id: 'senior-t3-e03-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject("único");
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            System.out.println(in.readObject());
            System.out.println(in.readObject());
        }
    }
}`,
      opcoes: [
        'Imprime `único` e lança `EOFException`',
        'Imprime `único` e `null`',
        'Imprime `único` duas vezes',
        'Imprime `único` e termina',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'EOFException', saida: 'único' },
      explicacao: 'Só um objeto foi gravado. A segunda leitura encontra o fim dos dados, e `readObject` não devolve `null` nesse caso: lança `EOFException`.',
    },
    {
      id: 'senior-t3-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que uma classe que implementa `Externalizable` precisa ter, além de `writeExternal` e `readExternal`?',
      opcoes: [
        'Um construtor público sem argumentos, chamado na leitura',
        'Um campo `serialVersionUID` público',
        'Todos os campos marcados como `transient`',
        'Um método estático `readObject`',
      ],
      resposta: 0,
      explicacao: 'Ao contrário de `Serializable`, a leitura de um `Externalizable` cria o objeto pelo construtor público sem argumentos e depois chama `readExternal`.',
    },
    {
      id: 'senior-t3-e03-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;
import java.util.*;

public class Teste {
    public static void main(String[] args) throws Exception {
        List<String> a = new ArrayList<>(List.of("x"));
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(a);
            out.writeObject(a);
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            Object x = in.readObject();
            Object y = in.readObject();
            System.out.println((x == y) + " " + (x == a));
        }
    }
}`,
      opcoes: ['`true false`', '`false false`', '`true true`', '`false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Na segunda gravação, o stream registra só uma referência ao objeto já escrito. Na leitura, as duas posições apontam para o mesmo objeto, que é novo, diferente do original.',
    },
    {
      id: 'senior-t3-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.io.*;

public class Teste {
    static class A implements Serializable {
        int a = 1;
    }

    static class B extends A {
        int b = 2;
        transient int c = 3;
    }

    public static void main(String[] args) throws Exception {
        B obj = new B();
        obj.a = 10;
        obj.b = 20;
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(obj);
        }
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            B copia = (B) in.readObject();
            System.out.println(copia.a + " " + copia.b + " " + copia.c);
        }
    }
}`,
      opcoes: ['`10 20 0`', '`1 2 3`', '`10 20 3`', 'Lança `NotSerializableException`: `B` não implementa `Serializable`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`B` herda a serializabilidade de `A`. Os dois campos comuns vêm do stream; o `transient` fica com 0.',
    },
    {
      id: 'senior-t3-e03-q13',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Sobre a segurança da desserialização, quais afirmações são verdadeiras? Escolha duas.',
      opcoes: [
        'Desserializar bytes de uma fonte não confiável pode permitir a execução de código malicioso',
        'O `ObjectInputFilter` permite limitar quais classes podem ser desserializadas',
        'A desserialização sempre passa pelos construtores, que validam os dados',
        'Marcar a classe como `final` impede qualquer ataque',
        'Só a gravação de objetos oferece risco, não a leitura',
      ],
      respostas: [0, 1],
      explicacao: 'O perigo está na leitura, que cria objetos sem passar pelos construtores. Filtros e, de preferência, formatos alternativos como JSON são as defesas.',
    },
    {
      id: 'senior-t3-e03-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar?',
      codigo: `import java.io.*;

public class Teste {
    public static void main(String[] args) throws IOException {
        ObjectInputStream in = new ObjectInputStream(new FileInputStream("dados.bin"));
        Object o = in.readObject();
        System.out.println(o);
    }
}`,
      opcoes: [
        'Não compila: `readObject` declara `ClassNotFoundException`, que não é tratada',
        'Compila e imprime o objeto',
        'Compila e lança `FileNotFoundException` se o arquivo não existir',
        'Não compila: falta o cast',
      ],
      resposta: 0,
      verificar: { tipo: 'naoCompila', linha: 6 },
      explicacao: 'Além de `IOException`, `readObject` declara `ClassNotFoundException`, que é checked e não é subclasse de `IOException`. Atribuir a `Object` dispensa o cast.',
    },
    {
      id: 'senior-t3-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma classe serializável tem `transient int tentativas = 3;` e um construtor que faz `tentativas = 5;`. Qual é o valor de `tentativas` num objeto acabado de desserializar?',
      opcoes: ['0', '3', '5', 'Depende do valor no momento da gravação'],
      resposta: 0,
      explicacao: 'O campo não é gravado, e na leitura nem o inicializador nem o construtor da classe serializável rodam. Fica o valor padrão do `int`.',
    },
  ],
};

export default episodio;
