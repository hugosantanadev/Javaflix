import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'aprendiz-t3-e01',
  minutos: 13,
  aula,
  armadilhas: [
    'p → q só é falsa quando p é verdadeiro e q é falso. Com p falso, a implicação é verdadeira.',
    'A recíproca (q → p) não é equivalente à implicação. A contrapositiva (¬q → ¬p) é.',
    'A negação de `>=` é `<`, e não `<=`.',
    'Negar "todos" dá "algum não", e não "nenhum".',
    '`allMatch` numa stream vazia devolve `true`; `anyMatch` devolve `false`.',
    '`addAll`, `retainAll` e `removeAll` alteram o próprio conjunto. Copie antes se precisar do original.',
    'Na lógica, p ∧ q ≡ q ∧ p. No Java, a ordem dos lados de `&&` decide o que chega a ser avaliado.',
  ],
  recursos: [
    {
      titulo: 'Javadoc de Set',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html',
      tipo: 'documentacao',
      porque: 'O contrato de um conjunto em Java: sem elementos repetidos, com as operações de união, interseção e diferença.',
      gratuito: true,
      idioma: 'en',
      onde: 'Métodos addAll, retainAll, removeAll e containsAll',
    },
    {
      titulo: 'Javadoc de Stream.allMatch',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html#allMatch(java.util.function.Predicate)',
      tipo: 'documentacao',
      porque: 'A documentação diz com todas as letras: numa stream vazia, devolve `true`. É a verdade vazia da lógica.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de EnumSet',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/EnumSet.html',
      tipo: 'documentacao',
      porque: 'O conjunto de enums que é guardado como um vetor de bits, com todas as operações em tempo constante.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'The Java Tutorials: The Set Interface',
      url: 'https://docs.oracle.com/javase/tutorial/collections/interfaces/set.html',
      tipo: 'tutorial',
      porque: 'Exemplos de união, interseção e diferença sem estragar o conjunto original.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seção "Set Interface Bulk Operations"',
    },
    {
      titulo: 'Wikipédia: Lógica proposicional',
      url: 'https://pt.wikipedia.org/wiki/L%C3%B3gica_proposicional',
      tipo: 'artigo',
      porque: 'Conectivos, tabelas-verdade, tautologias e regras de inferência, com a notação formal.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Wikipédia: Teoria dos conjuntos',
      url: 'https://pt.wikipedia.org/wiki/Teoria_dos_conjuntos',
      tipo: 'artigo',
      porque: 'As operações entre conjuntos com diagramas de Venn, e a história da teoria.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'UNIVESP: Noções da Teoria dos Conjuntos I',
      url: 'https://www.youtube.com/watch?v=Esg9NLDZFdI',
      tipo: 'video',
      porque: 'Aula da disciplina de Lógica e Matemática Discreta da UNIVESP sobre pertinência, inclusão e operações.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'UNIVESP: Lógica e Matemática Discreta (playlist)',
      url: 'https://www.youtube.com/playlist?list=PLxI8Can9yAHf6oB0nf8FwLhqSOcBLqOxH',
      tipo: 'curso',
      porque: 'A disciplina inteira em vídeo: proposições, demonstrações, conjuntos e contagem.',
      gratuito: true,
      idioma: 'pt',
      nivel: 'fundo',
    },
    {
      titulo: 'Curso em Vídeo: Operadores Lógicos e Relacionais (Curso de Algoritmos #04)',
      url: 'https://www.youtube.com/watch?v=Ig4QZNpVZYs',
      tipo: 'video',
      porque: 'E, OU e NÃO com tabelas-verdade, explicados do zero.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Stanford CS103: Truth Table Tool',
      url: 'https://web.stanford.edu/class/cs103/tools/truth-table-tool/',
      tipo: 'ferramenta',
      porque: 'Digite qualquer fórmula e veja a tabela-verdade. Bom para conferir equivalências.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Discrete Mathematics: An Open Introduction (Oscar Levin)',
      url: 'https://discrete.openmathbooks.org/dmoi3/sec_propositional.html',
      tipo: 'livro',
      porque: 'Livro gratuito e muito usado em cursos de matemática discreta, com exercícios resolvidos.',
      gratuito: true,
      idioma: 'en',
      onde: 'Seções 0.2 "Mathematical Statements", 0.3 "Sets" e 3.1 "Propositional Logic"',
    },
  ],
  desafio: {
    titulo: 'Detector de tautologias',
    enunciado:
      'Escreva o método `tautologia`, que recebe uma fórmula de duas variáveis como `BiPredicate<Boolean, Boolean>` e testa as quatro combinações de valores. Use-o para classificar quatro fórmulas e imprima:\n\n```text\np ∨ ¬p: tautologia\n(p → q) ∨ (q → p): tautologia\np → q: não é tautologia\nDe Morgan: tautologia\n```',
    dicas: [
      'Dois laços aninhados sobre `{false, true}` geram as quatro linhas da tabela.',
      'Basta uma linha falsa para a fórmula não ser tautologia: devolva `false` assim que achar.',
      'Escreva a implicação como um método `implica(p, q)` que devolve `!p || q`.',
      'De Morgan como fórmula: `!(p && q) == (!p || !q)`.',
    ],
    solucao: `import java.util.function.BiPredicate;

public class Tautologias {
    static boolean implica(boolean p, boolean q) {
        return !p || q;
    }

    static boolean tautologia(BiPredicate<Boolean, Boolean> formula) {
        boolean[] valores = {false, true};
        for (boolean p : valores) {
            for (boolean q : valores) {
                if (!formula.test(p, q)) {
                    return false;
                }
            }
        }
        return true;
    }

    static void testar(String nome, BiPredicate<Boolean, Boolean> formula) {
        System.out.println(nome + ": " + (tautologia(formula) ? "tautologia" : "não é tautologia"));
    }

    public static void main(String[] args) {
        testar("p ∨ ¬p", (p, q) -> p || !p);
        testar("(p → q) ∨ (q → p)", (p, q) -> implica(p, q) || implica(q, p));
        testar("p → q", (p, q) -> implica(p, q));
        testar("De Morgan", (p, q) -> !(p && q) == (!p || !q));
    }
}`,
    saida: 'p ∨ ¬p: tautologia\n(p → q) ∨ (q → p): tautologia\np → q: não é tautologia\nDe Morgan: tautologia',
    comentarios:
      'É um provador de teoremas por força bruta: com n variáveis, testa 2ⁿ linhas. Para duas ou três variáveis é instantâneo. Com 60 variáveis já seriam mais de um quintilhão de linhas, e é por isso que verificar fórmulas grandes é um problema difícil de verdade (o famoso problema SAT). A segunda fórmula surpreende: entre duas proposições quaisquer, sempre uma implica a outra.',
  },
  exercicios: [
    {
      id: 'aprendiz-t3-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantas linhas tem a tabela-verdade de uma fórmula com 4 proposições simples?',
      opcoes: ['16', '8', '4', '32', '24'],
      resposta: 0,
      explicacao: 'Cada proposição tem 2 valores possíveis e as escolhas são independentes: 2 × 2 × 2 × 2 = 2⁴ = 16. Quem responde 8 multiplicou 4 por 2.',
    },
    {
      id: 'aprendiz-t3-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Em que caso a implicação p → q é **falsa**?',
      opcoes: [
        'Quando p é verdadeiro e q é falso',
        'Quando p é falso e q é verdadeiro',
        'Quando p e q são falsos',
        'Quando p é falso, qualquer que seja q',
      ],
      resposta: 0,
      explicacao: 'A implicação só promete algo quando p acontece. Se p é falso, ela não foi quebrada e vale como verdadeira (verdade vazia). O único caso de quebra é p verdadeiro com q falso.',
    },
    {
      id: 'aprendiz-t3-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual frase é **equivalente** a "se o pedido foi pago, então ele foi enviado"?',
      opcoes: [
        'Se o pedido não foi enviado, então ele não foi pago',
        'Se o pedido foi enviado, então ele foi pago',
        'Se o pedido não foi pago, então ele não foi enviado',
        'O pedido foi pago e foi enviado',
      ],
      resposta: 0,
      explicacao: 'É a contrapositiva, ¬q → ¬p, que sempre equivale à original. A segunda opção é a recíproca e a terceira é a inversa: as duas dizem outra coisa (um pedido pode ser enviado como brinde, sem pagamento).',
    },
    {
      id: 'aprendiz-t3-e01-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O Java não tem operador de implicação. Qual expressão calcula p → q?',
      opcoes: ['`!p || q`', '`p || !q`', '`!p && q`', '`p && q`', '`p == q`'],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true' },
      codigoVerificacao: `boolean[] v = {false, true};
boolean ok = true;
for (boolean p : v) for (boolean q : v) {
    boolean tabela = !(p && !q);
    if ((!p || q) != tabela) ok = false;
}
System.out.println(ok);`,
      explicacao: 'p → q só falha com p verdadeiro e q falso, ou seja, é ¬(p ∧ ¬q). Por De Morgan, isso vira ¬p ∨ q. `p == q` é a bicondicional, que também falha quando p é falso e q é verdadeiro.',
    },
    {
      id: 'aprendiz-t3-e01-q05',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `List<String> vazia = List.of();
List<String> nomes = List.of("Ana", "Bia");
System.out.println(vazia.stream().allMatch(s -> s.length() > 10));
System.out.println(vazia.stream().noneMatch(s -> s.isEmpty()));
System.out.println(nomes.stream().anyMatch(s -> s.startsWith("B")));
System.out.println(nomes.stream().allMatch(s -> s.endsWith("a")));`,
      resposta: 'true\ntrue\ntrue\ntrue',
      explicacao: 'Numa lista vazia não há contraexemplo, então "todos" e "nenhum" são verdadeiros. Na lista com nomes, "Bia" começa com B e os dois nomes terminam com "a". Parece pegadinha, mas são quatro `true`.',
    },
    {
      id: 'aprendiz-t3-e01-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual condição é equivalente a `!(a > 5 || b == 0)` para quaisquer inteiros `a` e `b`?',
      opcoes: [
        '`a <= 5 && b != 0`',
        '`a < 5 && b != 0`',
        '`a <= 5 || b != 0`',
        '`a > 5 && b == 0`',
        '`a < 5 || b != 0`',
      ],
      resposta: 0,
      verificar: { tipo: 'executa', saida: 'true' },
      codigoVerificacao: `boolean igual = true;
for (int a = 0; a <= 10; a++) for (int b = -2; b <= 2; b++) {
    if (!(a > 5 || b == 0) != (a <= 5 && b != 0)) igual = false;
}
System.out.println(igual);`,
      explicacao: 'Por De Morgan, a negação de um OU vira o E das negações. A negação de `a > 5` é `a <= 5` (o 5 também falha no `>`), e a de `b == 0` é `b != 0`. Trocar `<=` por `<` erra exatamente no caso `a == 5`.',
    },
    {
      id: 'aprendiz-t3-e01-q07',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais fórmulas são tautologias? Escolha duas.',
      opcoes: ['p ∨ ¬p', '(p ∧ q) → p', 'p → (p ∧ q)', 'p ∧ ¬p', 'p ⊕ p'],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true false false false' },
      codigoVerificacao: `boolean[] v = {false, true};
boolean t1 = true, t2 = true, t3 = true, t4 = true, t5 = true;
for (boolean p : v) for (boolean q : v) {
    if (!(p || !p)) t1 = false;
    if (!(!(p && q) || p)) t2 = false;
    if (!(!p || (p && q))) t3 = false;
    if (!(p && !p)) t4 = false;
    if (!(p ^ p)) t5 = false;
}
System.out.println(t1 + " " + t2 + " " + t3 + " " + t4 + " " + t5);`,
      explicacao: 'p ∨ ¬p é sempre verdadeira. (p ∧ q) → p também: se os dois valem, p vale. p → (p ∧ q) falha com p verdadeiro e q falso. p ∧ ¬p e p ⊕ p são contradições: falsas em todas as linhas.',
    },
    {
      id: 'aprendiz-t3-e01-q08',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `Set<Integer> a = new TreeSet<>(Set.of(1, 2, 3, 4));
Set<Integer> b = Set.of(3, 4, 5);
a.retainAll(b);
System.out.println(a);`,
      opcoes: ['`[3, 4]`', '`[1, 2, 3, 4, 5]`', '`[1, 2]`', '`[5]`', '`[1, 2, 5]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`retainAll` mantém só o que também está no outro conjunto: é a interseção. A união seria `addAll` e a diferença, `removeAll`.',
    },
    {
      id: 'aprendiz-t3-e01-q09',
      tipo: 'saida',
      dificuldade: 3,
      enunciado: 'Digite a saída exata.',
      codigo: `Set<String> a = new TreeSet<>(List.of("x", "y", "z"));
Set<String> b = a;
b.removeAll(Set.of("y"));
System.out.println(a + " " + b.size());`,
      resposta: '[x, z] 2',
      explicacao: '`b = a` não copia o conjunto: as duas variáveis apontam para o mesmo objeto. O `removeAll` em `b` altera `a` também. Para trabalhar numa cópia, use `new TreeSet<>(a)`.',
    },
    {
      id: 'aprendiz-t3-e01-q10',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'Complete com um operador para calcular as permissões que o dono tem e o grupo não (a diferença dono − grupo). O programa deve imprimir `2`.',
      codigo: `public class Diferenca {
    static final int LER = 1;
    static final int ESCREVER = 2;
    static final int EXECUTAR = 4;

    public static void main(String[] args) {
        int dono = LER | ESCREVER | EXECUTAR;
        int grupo = LER | EXECUTAR;
        System.out.println(dono ___ ~grupo);
    }
}`,
      respostas: ['&'],
      saida: '2',
      explicacao: 'A − B é "está em A **e não** está em B", que em bits é `a & ~b`. O `~grupo` liga todos os bits que o grupo não tem, e o `&` com o dono deixa só o `ESCREVER`.',
    },
    {
      id: 'aprendiz-t3-e01-q11',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Numa escola, 120 alunos fazem Java, 80 fazem SQL e 30 fazem os dois. Quantos alunos fazem pelo menos um dos cursos?',
      opcoes: ['170', '200', '230', '140', '110'],
      resposta: 0,
      explicacao: 'Pela inclusão-exclusão, |A ∪ B| = |A| + |B| − |A ∩ B| = 120 + 80 − 30 = 170. Somar só 120 + 80 conta duas vezes os 30 que estão nas duas turmas.',
    },
    {
      id: 'aprendiz-t3-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Quantos subconjuntos tem o conjunto {a, b, c, d, e}, contando o vazio e o próprio conjunto?',
      opcoes: ['32', '25', '10', '31', '120'],
      resposta: 0,
      explicacao: 'Cada um dos 5 elementos está ou não está no subconjunto: 2⁵ = 32. O 31 esquece o conjunto vazio. O 120 é 5!, a quantidade de ordens, que não importa em conjuntos.',
    },
    {
      id: 'aprendiz-t3-e01-q13',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `public class Matricula {
    public static void main(String[] args) {
        int idade = 20;
        boolean temDocumento = true;
        boolean podeEntrar = idade >= 18 && temDocumento;
        boolean recusar = !idade >= 18 || !temDocumento;
        System.out.println(podeEntrar + " " + recusar);
    }
}`,
      resposta: 6,
      explicacao: 'O `!` tem precedência maior que `>=`, então o Java tenta calcular `!idade`, e não existe negação lógica de um `int`. O certo é `!(idade >= 18)` ou, melhor, `idade < 18`.',
    },
    {
      id: 'aprendiz-t3-e01-q14',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Quais expressões dão o mesmo resultado que `!(x != null && x.isEmpty())` para qualquer `String x`, **inclusive** `null`, sem lançar exceção? Escolha duas.',
      opcoes: [
        '`x == null || !x.isEmpty()`',
        '`!(x != null) || !x.isEmpty()`',
        '`!x.isEmpty() || x == null`',
        '`x == null && !x.isEmpty()`',
        '`x != null || x.isEmpty()`',
      ],
      respostas: [0, 1],
      verificar: { tipo: 'executa', saida: 'true true' },
      codigoVerificacao: `String[] valores = {null, "", "java"};
boolean ok = true;
for (String x : valores) {
    boolean original = !(x != null && x.isEmpty());
    if ((x == null || !x.isEmpty()) != original) ok = false;
    if ((!(x != null) || !x.isEmpty()) != original) ok = false;
}
boolean lancou = false;
try {
    String x = null;
    boolean c = !x.isEmpty() || x == null;
} catch (NullPointerException e) {
    lancou = true;
}
System.out.println(ok + " " + lancou);`,
      explicacao: 'De Morgan transforma a expressão em `x == null || !x.isEmpty()`, e a segunda opção é a mesma coisa escrita de outro jeito. A terceira é logicamente equivalente, mas avalia `x.isEmpty()` primeiro e lança `NullPointerException` quando `x` é nulo: o curto-circuito só protege quem vem depois do teste.',
    },
    {
      id: 'aprendiz-t3-e01-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a negação de "todo pedido foi entregue"?',
      opcoes: [
        'Algum pedido não foi entregue',
        'Nenhum pedido foi entregue',
        'Todo pedido não foi entregue',
        'Algum pedido foi entregue',
      ],
      resposta: 0,
      explicacao: '¬∀x P(x) ≡ ∃x ¬P(x): basta um contraexemplo para a frase "todo pedido foi entregue" ser falsa. "Nenhum pedido foi entregue" é uma afirmação muito mais forte. Em streams, é a diferença entre `!allMatch(p)` e `noneMatch(p)`.',
    },
  ],
};

export default episodio;
