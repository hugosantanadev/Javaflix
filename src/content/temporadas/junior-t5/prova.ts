import type { Exercicio } from '../../types';

/** Prova da temporada Júnior T5: Java moderno. */
const prova: Exercicio[] = [
  {
    id: 'junior-t5-prova-q01',
    tipo: 'saida',
    dificuldade: 1,
    enunciado: 'Digite a saída exata.',
    codigo: `record Aluno(String nome, double nota) { }

Aluno a = new Aluno("Bia", 8.5);
Aluno b = new Aluno("Bia", 8.5);
System.out.println(a.nome() + " " + a.equals(b) + " " + (a == b) + " " + a);`,
    resposta: 'Bia true false Aluno[nome=Bia, nota=8.5]',
    explicacao: 'O acessor tem o nome do componente; `equals` compara os componentes, enquanto `==` compara os objetos; o `toString` segue o formato `Nome[componente=valor]`.',
  },
  {
    id: 'junior-t5-prova-q02',
    tipo: 'multipla',
    dificuldade: 3,
    enunciado: 'Quais records compilam? Escolha três.',
    opcoes: [
      '`record A(int x) { A { if (x > 10) x = 10; } }`',
      '`record B(String s) { public String s() { return s.trim(); } }`',
      '`record C(int x) { static C zero() { return new C(0); } }`',
      '`record D(int x) { D { this.x = x; } }`',
      '`record E(int x) { private int y = 0; }`',
    ],
    respostas: [0, 1, 2],
    verificar: { tipo: 'opcoesCompilam' },
    explicacao: 'O compacto pode reatribuir o parâmetro, o acessor pode ser sobrescrito como `public` e métodos `static` são livres. O compacto não pode atribuir `this.x`, e campos de instância extras são proibidos.',
  },
  {
    id: 'junior-t5-prova-q03',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `sealed abstract class Veiculo permits Carro, Moto { }
final class Carro extends Veiculo { }
class Moto extends Veiculo { }`,
    opcoes: [
      'Não compila: `Moto` precisa ser `final`, `sealed` ou `non-sealed`',
      'Compila',
      'Não compila: classes seladas não podem ser abstratas',
      'Compila, e `Moto` passa a ser `final`',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 3 },
    explicacao: 'Cada subclasse permitida declara como a hierarquia continua. Só records e enums dispensam o modificador.',
  },
  {
    id: 'junior-t5-prova-q04',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `record Cep(String valor) {
    Cep {
        valor = valor.replace("-", "");
        if (valor.length() != 8) throw new IllegalArgumentException("CEP inválido");
    }
}

System.out.println(new Cep("50000-000").valor() + " " + new Cep("01310100"));`,
    opcoes: [
      '`50000000 Cep[valor=01310100]`',
      '`50000-000 Cep[valor=01310100]`',
      'Lança `IllegalArgumentException`',
      'Não compila: o compacto não pode reatribuir o parâmetro',
    ],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O compacto normaliza o parâmetro antes de validar, e é o valor normalizado que vai para o campo. Os dois CEPs ficam com 8 dígitos.',
  },
  {
    id: 'junior-t5-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `Object[] dados = {"abc", "", 10, null};
int r = 0;
for (Object d : dados) {
    if (d instanceof String s && !s.isEmpty()) r += s.length();
    else if (d instanceof Integer i) r += i;
}
System.out.println(r);`,
    opcoes: ['`13`', '`3`', '`10`', 'Lança `NullPointerException`', 'Não compila'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '"abc" soma 3; a `String` vazia falha na condição e não casa com `Integer`; 10 soma 10; `null` não casa com nenhum padrão.',
  },
  {
    id: 'junior-t5-prova-q06',
    tipo: 'linha',
    dificuldade: 3,
    enunciado: 'Clique na linha que impede o código de compilar.',
    codigo: `public class T {
    public static void main(String[] args) {
        Object o = 5;
        if (o instanceof Integer i && i > 0) {
            System.out.println(i);
        }
        if (!(o instanceof Integer j) || j < 0) {
            System.out.println("negativo ou não inteiro");
        }
        if (o instanceof Integer k || k > 10) {
            System.out.println("?");
        }
    }
}`,
    resposta: 10,
    explicacao: 'Na linha 7, o lado direito do `||` só roda quando `!(o instanceof Integer j)` é falso, isto é, quando o teste deu certo: `j` existe. Na linha 10, o lado direito roda quando o teste falhou, e `k` não existe.',
  },
  {
    id: 'junior-t5-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `public class T {
    static String classificar(Object o) {
        return switch (o) {
            case Integer i when i % 2 == 0 -> "par";
            case Integer i -> "ímpar";
            case String s when s.length() > 3 -> "palavra longa";
            case String s -> "palavra curta";
            case null -> "nulo";
            default -> "outro";
        };
    }

    public static void main(String[] args) {
        System.out.println(classificar(4) + ", " + classificar(7) + ", " + classificar("java") + ", " + classificar(null));
    }
}`,
    opcoes: [
      '`par, ímpar, palavra longa, nulo`',
      '`par, ímpar, palavra curta, nulo`',
      'Lança `NullPointerException`',
      'Não compila: `case null` precisa ser o primeiro',
      '`par, par, palavra longa, outro`',
    ],
    resposta: 0,
    provas: ['830', '831'],
    verificar: { tipo: 'saida' },
    explicacao: 'Os `case` com guarda vêm antes dos mesmos tipos sem guarda. "java" tem 4 letras, mais que 3. O `case null` pode ficar em qualquer posição antes do `default`.',
  },
  {
    id: 'junior-t5-prova-q08',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `class Base {
}

record Item(int id) extends Base {
}`,
    opcoes: ['Não compila', 'Compila', 'Compila, mas `Item` não herda nada de `Base`', 'Não compila: `Base` precisa ser selada'],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 4 },
    explicacao: 'Todo record já estende `java.lang.Record`, e a sintaxe de record não aceita `extends`. Para compartilhar comportamento, use interfaces.',
  },
  {
    id: 'junior-t5-prova-q09',
    tipo: 'lacuna',
    dificuldade: 2,
    enunciado: 'Complete o modificador que reabre a hierarquia. O programa deve imprimir `true`.',
    codigo: `sealed class Pessoa permits Cliente, Funcionario { }
final class Cliente extends Pessoa { }
___ class Funcionario extends Pessoa { }
class Gerente extends Funcionario { }

public class Empresa {
    public static void main(String[] args) {
        Pessoa p = new Gerente();
        System.out.println(p instanceof Funcionario);
    }
}`,
    respostas: ['non-sealed'],
    saida: 'true',
    explicacao: 'Para que `Gerente` estenda `Funcionario` livremente, `Funcionario` precisa ser `non-sealed`. Com `final`, `Gerente` não compilaria; com `sealed`, `Gerente` também precisaria de um modificador.',
  },
  {
    id: 'junior-t5-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `record Tag(String nome) {
    Tag {
        nome = nome.toLowerCase();
    }
}

Set<Tag> tags = new HashSet<>(List.of(new Tag("Java"), new Tag("JAVA"), new Tag("java "), new Tag("Spring")));
System.out.println(tags.size());`,
    opcoes: ['`3`', '`2`', '`4`', 'Lança `IllegalArgumentException`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: '"Java" e "JAVA" viram o mesmo "java" e são iguais. "java " tem um espaço no fim, que o `toLowerCase` não remove, então é diferente. Com "spring", são 3.',
  },
  {
    id: 'junior-t5-prova-q11',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é a saída?',
    codigo: `sealed interface Evento permits Clique, Tecla { }
record Clique(int x, int y) implements Evento { }
record Tecla(char c, boolean shift) implements Evento { }

public class Ui {
    static String tratar(Evento e) {
        return switch (e) {
            case Clique(int x, int y) when x < 0 || y < 0 -> "fora da tela";
            case Clique(int x, int y) -> "clique em " + x + "," + y;
            case Tecla(char c, boolean shift) -> shift ? String.valueOf(Character.toUpperCase(c)) : String.valueOf(c);
        };
    }

    public static void main(String[] args) {
        System.out.println(tratar(new Clique(3, -1)) + " | " + tratar(new Clique(10, 20)) + " | " + tratar(new Tecla('a', true)));
    }
}`,
    opcoes: [
      '`fora da tela | clique em 10,20 | A`',
      '`clique em 3,-1 | clique em 10,20 | A`',
      '`fora da tela | clique em 10,20 | a`',
      'Não compila: falta `default`',
    ],
    resposta: 0,
    provas: ['830', '831'],
    verificar: { tipo: 'saida' },
    explicacao: 'A guarda pega o clique com coordenada negativa. A interface selada está coberta por completo, então o `switch` dispensa `default`. Com `shift`, a tecla vira maiúscula.',
  },
  {
    id: 'junior-t5-prova-q12',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Qual afirmação sobre records é verdadeira?',
    opcoes: [
      'Podem implementar interfaces',
      'Podem estender outras classes',
      'Têm métodos `get` gerados para cada componente',
      'Podem declarar campos de instância além dos componentes',
      'Podem ser estendidos por outras classes',
    ],
    resposta: 0,
    explicacao: 'Records são `final`, estendem `Record` e só guardam os componentes. Os acessores têm o nome dos componentes, sem `get`. Interfaces são a forma de dar comportamento comum a eles.',
  },
  {
    id: 'junior-t5-prova-q13',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `public class T {
    static String f(Integer n) {
        return switch (n) {
            case Integer i -> "qualquer";
            case Integer i when i > 0 -> "positivo";
        };
    }
}`,
    opcoes: [
      'Não compila: o segundo `case` é dominado pelo primeiro',
      'Compila, e números positivos dão "positivo"',
      'Compila, e todos os números dão "qualquer"',
      'Não compila: falta `default`',
    ],
    resposta: 0,
    provas: ['830', '831'],
    verificar: { tipo: 'naoCompila', linha: 5 },
    explicacao: 'O `case` sem guarda casa com todo `Integer`, então o guardado depois dele nunca seria alcançado. A ordem certa é o contrário.',
  },
  {
    id: 'junior-t5-prova-q14',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a saída?',
    codigo: `sealed interface Resultado permits Ok, Erro { }
record Ok(int valor) implements Resultado { }
record Erro(String mensagem) implements Resultado { }

public class Servico {
    static String mostrar(Resultado r) {
        if (r instanceof Ok ok) return "ok: " + ok.valor();
        if (r instanceof Erro e) return "erro: " + e.mensagem();
        return "impossível";
    }

    public static void main(String[] args) {
        System.out.println(mostrar(new Ok(42)) + " / " + mostrar(new Erro("timeout")));
    }
}`,
    opcoes: ['`ok: 42 / erro: timeout`', '`impossível / impossível`', 'Não compila: records não implementam interfaces seladas', '`ok: 42 / impossível`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'Records são `final` e implementam a interface selada sem modificador. O `instanceof` com padrão testa e converte cada caso.',
  },
  {
    id: 'junior-t5-prova-q15',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'O que o compilador gera para um record? Escolha três.',
    opcoes: [
      'O construtor canônico',
      'Um acessor para cada componente',
      'O método `toString`',
      'Um método `set` para cada componente',
      'Um construtor sem parâmetros',
    ],
    respostas: [0, 1, 2],
    explicacao: 'Também gera `equals`, `hashCode` e os campos `private final`. Setters não existem, e o único construtor gerado é o canônico.',
  },
  {
    id: 'junior-t5-prova-q16',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `record Retangulo(int largura, int altura) {
    Retangulo {
        if (largura <= 0 || altura <= 0) throw new IllegalArgumentException("lado inválido");
    }

    Retangulo(int lado) {
        this(lado, lado);
    }

    int area() {
        return largura * altura;
    }
}

System.out.print(new Retangulo(3).area() + " ");
try {
    new Retangulo(0);
} catch (IllegalArgumentException e) {
    System.out.print(e.getMessage());
}
System.out.println();`,
    resposta: '9 lado inválido',
    explicacao: 'O construtor de um parâmetro delega para o canônico, que valida. Por isso o quadrado de lado 0 também é recusado.',
  },
  {
    id: 'junior-t5-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de executar?',
    codigo: `public class T {
    static String f(Object o) {
        return switch (o) {
            case String s -> s;
            default -> "?";
        };
    }

    public static void main(String[] args) {
        String nada = null;
        System.out.println(f(nada).length());
    }
}`,
    opcoes: [
      'Lança `NullPointerException` dentro do `switch`',
      'Imprime `1`',
      'Imprime `0`',
      'Não compila',
    ],
    resposta: 0,
    provas: ['830', '831'],
    verificar: { tipo: 'excecao', nome: 'NullPointerException' },
    explicacao: 'O `switch` não tem `case null`, e o `default` não pega o `null`: a exceção acontece antes de qualquer `case`.',
  },
  {
    id: 'junior-t5-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'No Java 25, cobrado pela prova 1Z0-831, qual é a saída?',
    codigo: `record Par(String chave, int valor) { }

List<Object> itens = List.of(new Par("a", 1), new Par("b", 2), "x");
int soma = 0;
for (Object o : itens) {
    if (o instanceof Par(_, int v)) soma += v;
}
System.out.println(soma);`,
    opcoes: ['`3`', '`0`', 'Não compila: `_` não é um padrão válido', 'Lança `ClassCastException`'],
    resposta: 0,
    provas: ['831'],
    verificar: { tipo: 'saida' },
    explicacao: 'O `_` é o padrão sem nome do Java 22: casa com a chave sem declarar variável. Os dois pares somam 3, e a `String` não casa com o padrão.',
  },
  {
    id: 'junior-t5-prova-q19',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é o resultado de compilar?',
    codigo: `Object o = "a";
int s = 1;
if (o instanceof String s) {
    System.out.println(s);
}`,
    opcoes: [
      'Não compila: já existe uma variável local `s` no escopo',
      'Compila e imprime `a`',
      'Compila e imprime `1`',
      'Compila, mas não imprime nada',
    ],
    resposta: 0,
    verificar: { tipo: 'naoCompila', linha: 3 },
    explicacao: 'A variável de padrão é uma variável local e não pode repetir o nome de outra que já está em escopo.',
  },
  {
    id: 'junior-t5-prova-q20',
    tipo: 'saida',
    dificuldade: 2,
    enunciado: 'Digite a saída exata.',
    codigo: `record Endereco(String cidade, String uf) { }
record Cliente(String nome, Endereco endereco) { }

Cliente c = new Cliente("Ana", new Endereco("Recife", "PE"));
System.out.println(c + " " + c.endereco().uf());`,
    resposta: 'Cliente[nome=Ana, endereco=Endereco[cidade=Recife, uf=PE]] PE',
    explicacao: 'O `toString` do record chama o `toString` de cada componente, e o componente `endereco` é outro record.',
  },
];

export default prova;
