import type { EpisodioConteudo } from '../../types';
import aula from './e05.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t5-e05',
  minutos: 11,
  aula,
  armadilhas: [
    '`==` entre strings compara referências; `equals` compara o conteúdo.',
    'Literais iguais são o mesmo objeto (pool); `new String("x")` sempre cria um objeto novo.',
    'Concatenação só de literais e de `final` com constante acontece na compilação e vai para o pool.',
    'Concatenação com variável comum ou com chamada de método cria um objeto novo em tempo de execução.',
    '`intern()` devolve a cópia do pool.',
    '`s.equals("x")` com `s` nulo lança `NullPointerException`; `"x".equals(s)` devolve `false`.',
    '`trim()` devolve a própria `String` quando não há espaços nas pontas.',
    '`switch` com `String` compara por `equals`, não por referência.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de String.intern',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#intern()',
      tipo: 'documentacao',
      porque: 'A documentação descreve o pool e garante que literais e constantes iguais são o mesmo objeto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 3.10.5: String Literals',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.5',
      tipo: 'documentacao',
      porque: 'A especificação com o exemplo clássico de `==` entre literais, constantes e concatenações em tempo de execução.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS 15.29: Constant Expressions',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.29',
      tipo: 'documentacao',
      porque: 'O que conta como constante de compilação e, por isso, vai para o pool.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: Comparing Strings and Portions of Strings',
      url: 'https://docs.oracle.com/javase/tutorial/java/data/comparestrings.html',
      tipo: 'documentacao',
      porque: '`equals`, `equalsIgnoreCase`, `compareTo` e `regionMatches` lado a lado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Java String Pool',
      url: 'https://www.baeldung.com/java-string-pool',
      tipo: 'artigo',
      porque: 'Como o pool funciona, o `intern()` e a mudança do pool para o heap no Java 7.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Comparing Strings in Java',
      url: 'https://www.baeldung.com/java-compare-strings',
      tipo: 'artigo',
      porque: 'Todas as formas de comparar strings, com quando usar cada uma.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 192: String Deduplication in G1',
      url: 'https://openjdk.org/jeps/192',
      tipo: 'documentacao',
      porque: 'A otimização do coletor G1 que compartilha os bytes de strings iguais criadas em tempo de execução.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Codando Simples: Java, Aula 23, Os principais métodos da classe String',
      url: 'https://www.youtube.com/watch?v=-2RvOvNYA0A',
      tipo: 'video',
      porque: 'Como o Java guarda strings na memória e por que comparar com `==` engana, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Kunal Kushwaha: Strings and StringBuilder in Java',
      url: 'https://www.youtube.com/watch?v=zL1DPZ0Ovlo',
      tipo: 'video',
      porque: 'O pool de strings desenhado na memória, com `==` e `equals` comparados.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'As questões de `==` com strings do livro são as mais parecidas com as da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 4, "Core APIs": seções "Understanding Equality" e "The String Pool"',
    },
  ],
  desafio: {
    titulo: 'Login sem armadilhas',
    enunciado:
      'Escreva `autenticar(String usuario, String senha)`, que aceita o usuário "admin" sem diferenciar maiúsculas e a senha "Java#2026" exatamente, sem lançar exceção com argumentos nulos. Os textos digitados chegam como objetos novos, então teste com `new String(...)`. Imprima:\n\n```text\nADMIN / Java#2026: true\nadmin / java#2026: false\nnull / Java#2026: false\nadmin / null: false\n```',
    dicas: [
      'Compare com o literal à esquerda: `"admin".equalsIgnoreCase(usuario)`.',
      '`"Java#2026".equals(senha)` devolve `false` para `null`, sem exceção.',
      'Para imprimir, `"" + null` vira "null".',
    ],
    solucao: `public class Login {
    static boolean autenticar(String usuario, String senha) {
        return "admin".equalsIgnoreCase(usuario) && "Java#2026".equals(senha);
    }

    static void testar(String usuario, String senha) {
        System.out.println(usuario + " / " + senha + ": " + autenticar(usuario, senha));
    }

    public static void main(String[] args) {
        testar(new String("ADMIN"), new String("Java#2026"));
        testar(new String("admin"), new String("java#2026"));
        testar(null, new String("Java#2026"));
        testar(new String("admin"), null);
    }
}`,
    saida: 'ADMIN / Java#2026: true\nadmin / java#2026: false\nnull / Java#2026: false\nadmin / null: false',
    comentarios:
      'Com `==`, o primeiro teste daria `false`, porque as strings criadas com `new` não são as do pool, exatamente como acontece com texto digitado de verdade. Colocar o literal à esquerda elimina o risco de `NullPointerException`. Num sistema real, a senha nunca é comparada em texto puro: guarda-se um hash, comparado com uma função de tempo constante.',
  },
  exercicios: [
    {
      id: 'estagiario-t5-e05-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como se compara o **conteúdo** de duas strings em Java?',
      opcoes: ['Com `equals`', 'Com `==`', 'Com `compareTo` igual a 1', 'Com `hashCode`'],
      resposta: 0,
      explicacao: '`equals` compara caractere por caractere. `==` compara se as duas variáveis apontam para o mesmo objeto. `compareTo` dá 0 (e não 1) para textos iguais.',
    },
    {
      id: 'estagiario-t5-e05-q02',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `String a = "abc";
String b = "abc";
String c = new String("abc");
System.out.println(a == b);
System.out.println(a == c);
System.out.println(a.equals(c));`,
      resposta: 'true\nfalse\ntrue',
      explicacao: 'Literais iguais são o mesmo objeto do pool. `new String` cria um objeto separado, com o mesmo conteúdo.',
    },
    {
      id: 'estagiario-t5-e05-q03',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String s1 = "Java";
String s2 = "Ja";
String s3 = s2 + "va";
System.out.println((s1 == s3) + " " + s1.equals(s3) + " " + (s1 == s3.intern()));`,
      opcoes: ['`false true true`', '`true true true`', '`false true false`', '`false false true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`s2` não é `final`, então `s2 + "va"` é calculado em tempo de execução e cria um objeto novo. O conteúdo é igual, e `intern()` devolve o "Java" do pool, que é o mesmo de `s1`.',
    },
    {
      id: 'estagiario-t5-e05-q04',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `final String x = "Ja";
String y = x + "va";
System.out.println(y == "Java");`,
      opcoes: ['`true`', '`false`', 'Não compila', 'Lança exceção'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`x` é `final` e inicializada com um literal: é uma constante de compilação. `x + "va"` é calculado pelo `javac`, vira o literal "Java" e vai para o pool.',
    },
    {
      id: 'estagiario-t5-e05-q05',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais expressões valem `true`? Escolha três.',
      opcoes: [
        '`"a" + "b" == "ab"`',
        '`new String("x").equals("x")`',
        '`"Ok".equalsIgnoreCase("OK")`',
        '`new String("x") == "x"`',
        '`"x".equals(null)`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'executa', saida: 'true true true false false' },
      codigoVerificacao: `System.out.println(("a" + "b" == "ab") + " " + new String("x").equals("x") + " "
        + "Ok".equalsIgnoreCase("OK") + " " + (new String("x") == "x") + " " + "x".equals(null));`,
      explicacao: 'A concatenação de dois literais é constante e vai para o pool. `equals` e `equalsIgnoreCase` comparam conteúdo. Um objeto criado com `new` nunca é o do pool, e `equals(null)` é sempre `false`.',
    },
    {
      id: 'estagiario-t5-e05-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `String perfil = null;
if (perfil.equals("admin")) {
    System.out.println("acesso total");
}
System.out.println("fim");`,
      opcoes: [
        'Lança `NullPointerException`',
        'Imprime `fim`',
        'Imprime `acesso total` e `fim`',
        'Não compila',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'NullPointerException' },
      explicacao: 'O método é chamado **em** `perfil`, que é nulo. Com o literal à esquerda, `"admin".equals(perfil)`, o resultado seria `false`, sem exceção.',
    },
    {
      id: 'estagiario-t5-e05-q07',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método que compara o conteúdo. O programa deve imprimir `liberado`.',
      codigo: `public class Senha {
    public static void main(String[] args) {
        String senha = "javaflix";
        String digitada = new String("javaflix");
        if (senha.___(digitada)) {
            System.out.println("liberado");
        } else {
            System.out.println("negado");
        }
    }
}`,
      respostas: ['equals', 'contentEquals'],
      saida: 'liberado',
      explicacao: 'A senha digitada é um objeto novo, então `==` daria `false`. `equals` compara o conteúdo; `contentEquals` também, e aceita qualquer sequência de caracteres.',
    },
    {
      id: 'estagiario-t5-e05-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String s = "abc";
String t = s.trim();
System.out.println(s == t);`,
      opcoes: ['`true`', '`false`', 'Não compila', 'Depende da JVM'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Sem espaços para remover, `trim()` devolve a própria `String`, e a documentação garante isso. Com algo para remover, devolveria um objeto novo.',
    },
    {
      id: 'estagiario-t5-e05-q09',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Compara {
    public static void main(String[] args) {
        String nome = "Ana";
        boolean igual = nome.equals("Ana");
        boolean outro = nome == 'Ana';
        System.out.println(igual + " " + outro);
    }
}`,
      resposta: 5,
      explicacao: 'Aspas simples são para um único `char`. `\'Ana\'` não é um literal válido, e mesmo `\'A\'` não poderia ser comparado com `==` a uma `String`.',
    },
    {
      id: 'estagiario-t5-e05-q10',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `String a = new String("x");
String b = new String("x");
String c = a.intern();
String d = b.intern();
System.out.println((a == b) + " " + (c == d) + " " + (c == "x"));`,
      resposta: 'false true true',
      explicacao: 'Dois `new` são dois objetos. `intern()` devolve a cópia única do pool, a mesma para os dois e a mesma do literal "x".',
    },
    {
      id: 'estagiario-t5-e05-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `String cmd = new String("sair");
switch (cmd) {
    case "sair" -> System.out.println("até logo");
    default -> System.out.println("?");
}`,
      opcoes: ['`até logo`', '`?`', 'Não compila', 'Lança `NullPointerException`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `switch` com `String` compara usando `hashCode` e `equals`, não referências. Um objeto criado com `new` cai no `case` com o mesmo texto.',
    },
    {
      id: 'estagiario-t5-e05-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Desde o Java 7, onde fica o pool de strings?',
      opcoes: [
        'No heap comum, e as strings sem referências podem ser coletadas pelo GC',
        'Na PermGen, com tamanho fixo',
        'No disco, num arquivo temporário',
        'Na pilha de cada thread',
      ],
      resposta: 0,
      explicacao: 'Até o Java 6, o pool ficava na PermGen, e internar strings demais estourava a memória. A partir do Java 7, ele fica no heap e participa da coleta de lixo.',
    },
    {
      id: 'estagiario-t5-e05-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `String s = "Java";
String t = "Ja" + "VA".toLowerCase();
System.out.println((s == t) + " " + s.equals(t));`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A chamada de método faz a expressão deixar de ser constante: ela é calculada em tempo de execução e gera um objeto novo. O conteúdo é o mesmo.',
    },
    {
      id: 'estagiario-t5-e05-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Uma variável `s` pode ser nula. Quais expressões comparam o conteúdo com "admin" sem risco de exceção? Escolha duas.',
      opcoes: [
        '`"admin".equals(s)`',
        '`Objects.equals(s, "admin")`',
        '`s.equals("admin")`',
        '`s == "admin"`',
        '`s.equalsIgnoreCase("admin")`',
      ],
      respostas: [0, 1],
      explicacao: 'Com o literal chamando o método, ou com `Objects.equals`, `null` vira simplesmente `false`. `s.equals` e `s.equalsIgnoreCase` lançam exceção com `s` nulo. E `s == "admin"` não lança, mas compara referências, não conteúdo.',
    },
    {
      id: 'estagiario-t5-e05-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `"SIM".equalsIgnoreCase("sim")` devolve?',
      opcoes: ['`true`', '`false`', '`0`', 'Lança exceção'],
      resposta: 0,
      explicacao: '`equalsIgnoreCase` compara o conteúdo sem diferenciar maiúsculas de minúsculas. É o jeito certo de comparar respostas como "sim", "Sim" e "SIM".',
    },
  ],
};

export default episodio;
