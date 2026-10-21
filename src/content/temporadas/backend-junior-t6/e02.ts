import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t6-e02',
  minutos: 16,
  aula,
  armadilhas: [
    '`assertThat(x);` sem nenhum método depois não verifica nada e passa sempre.',
    '`isEqualTo` com `BigDecimal` usa o `equals`, que compara a escala; use `isEqualByComparingTo`.',
    '`containsExactly` exige a mesma ordem; quando ela não importa, `containsExactlyInAnyOrder`.',
    'O `as(...)` precisa vir antes da asserção: depois, a verificação já aconteceu.',
    'Asserções suaves sem `assertAll()` no fim não reclamam de nada.',
    '`hasMessage` compara a mensagem inteira; para um trecho, `hasMessageContaining`.',
    'Comparar entidades com `isEqualTo` falha pelo id gerado; use a comparação recursiva ignorando o campo.',
  ],
  ia: {
    uso:
      'A IA converte asserções antigas para AssertJ muito bem e conhece a maioria dos métodos. Peça para trocar `assertTrue(lista.contains(x))` por asserções que explicam a falha, montar `extracting` com tuplas e comparações recursivas. Revise o resultado com a mesma desconfiança de qualquer código: a asserção errada passa em silêncio.',
    pedido:
      'Reescreva as asserções deste teste com AssertJ 3.27, sem mudar o que ele verifica.\n- Use a asserção mais específica para cada caso: isEqualByComparingTo para BigDecimal, extracting com containsExactly para listas, assertThatThrownBy para exceções.\n- Prefira uma asserção legível a várias encadeadas sem necessidade.\n- Para cada asserção, mostre a mensagem que ela daria ao falhar.\n\n<cole aqui o teste>',
    erros: [
      'Inventa métodos que parecem do AssertJ, mas não existem; o compilador acusa, e a correção da IA às vezes é outro método inventado.',
      'Deixa um `assertThat(valor);` sem nenhum método depois, que não verifica nada e passa sempre.',
      'Usa `isEqualTo` em `BigDecimal`, ou `containsExactly` onde a ordem não importa, deixando o teste errado ou frágil.',
    ],
    conferir: [
      'Compile: método inexistente não passa do `javac`.',
      'Quebre o código de propósito e leia a mensagem de falha: ela precisa explicar o problema sem depurar.',
      'Procure linhas que terminam em `assertThat(...)`; sem um método encadeado, elas não verificam nada.',
    ],
  },
  recursos: [
    {
      titulo: 'AssertJ: documentação',
      url: 'https://assertj.github.io/doc/',
      tipo: 'documentacao',
      porque: 'O guia oficial, com exemplos de cada tipo de asserção.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'AssertJ: Core assertions guide',
      url: 'https://assertj.github.io/doc/#assertj-core-assertions-guide',
      tipo: 'documentacao',
      porque: 'Coleções, `extracting`, filtros, exceções e descrições, seção por seção.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'AssertJ: Recursive comparison',
      url: 'https://assertj.github.io/doc/#assertj-core-recursive-comparison',
      tipo: 'documentacao',
      porque: 'Todas as opções da comparação campo a campo: ignorar campos, comparar tipos diferentes e registrar comparadores.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'AssertJ: Soft assertions',
      url: 'https://assertj.github.io/doc/#assertj-core-soft-assertions',
      tipo: 'documentacao',
      porque: 'As formas de usar asserções suaves, inclusive com a extensão do JUnit.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc do AssertJ',
      url: 'https://www.javadoc.io/doc/org.assertj/assertj-core/latest/index.html',
      tipo: 'documentacao',
      porque: 'A referência de cada classe de asserções, para descobrir o método certo.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Spring Boot: Test Scope Dependencies',
      url: 'https://docs.spring.io/spring-boot/reference/testing/test-scope-dependencies.html',
      tipo: 'documentacao',
      porque: 'A lista do que o `spring-boot-starter-test` traz: JUnit, AssertJ, Mockito e outras.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Diego Pacheco: AssertJ',
      url: 'https://www.youtube.com/watch?v=1AkWNT_Sm1Y',
      tipo: 'video',
      porque: 'Seis minutos de AssertJ na prática, de um arquiteto brasileiro conhecido pelos vídeos curtos, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Elvis Sousa: Teste unitário com JUnit e AssertJ',
      url: 'https://www.youtube.com/watch?v=CmahlMDER_8',
      tipo: 'video',
      porque: 'JUnit e AssertJ juntos num projeto, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Aneesh Mistry: Testing collections with AssertJ',
      url: 'https://www.youtube.com/watch?v=Uvi6a_PeMqI',
      tipo: 'video',
      porque: 'Conteúdo e ordem de coleções com AssertJ, o assunto que mais aparece em testes reais.',
      gratuito: true,
      idioma: 'en',
    },
  ],
  desafio: {
    titulo: 'O containsExactly',
    enunciado:
      'Implemente `verificar(atual, esperado)`, que devolve `null` quando as duas listas são iguais, e a mensagem de falha quando não são, no espírito do `containsExactly` do AssertJ. A mensagem começa com `esperava exatamente <esperado>, nessa ordem, mas era <atual>`. Se as listas têm os mesmos elementos, contando repetições, mas em outra ordem, acrescente uma linha para cada índice diferente. Senão, acrescente os elementos esperados que não foram encontrados e os que não eram esperados, contando repetições. A saída deve ser:\n\n```text\npassou\nesperava exatamente [Mouse, Teclado, Headset], nessa ordem, mas era [Teclado, Mouse, Headset]\n  - índice 0: esperava Mouse, era Teclado\n  - índice 1: esperava Teclado, era Mouse\nesperava exatamente [Teclado, Headset], nessa ordem, mas era [Teclado, Mouse]\n  não encontrados: [Headset]\n  inesperados: [Mouse]\nesperava exatamente [Mouse, Teclado, Teclado], nessa ordem, mas era [Mouse, Mouse, Teclado]\n  não encontrados: [Teclado]\n  inesperados: [Mouse]\n```',
    dicas: [
      'Comece com uma cópia da lista esperada e, para cada elemento real, tente removê-lo da cópia.',
      '`lista.remove(objeto)` remove só a primeira ocorrência e devolve `false` se não encontrou: o que não foi removido é inesperado.',
      'O que sobrar na cópia são os não encontrados.',
      'Se as duas sobras ficarem vazias, a diferença é só de ordem.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Exatamente {
    /** Devolve null se as listas são iguais, ou a mensagem de falha. */
    static String verificar(List<String> atual, List<String> esperado) {
        if (atual.equals(esperado)) return null;
        List<String> naoEncontrados = new ArrayList<>(esperado);
        List<String> inesperados = new ArrayList<>();
        for (String elemento : atual) {
            if (!naoEncontrados.remove(elemento)) inesperados.add(elemento);
        }
        StringBuilder mensagem = new StringBuilder("esperava exatamente " + esperado + ", nessa ordem, mas era " + atual);
        if (naoEncontrados.isEmpty() && inesperados.isEmpty()) {
            for (int i = 0; i < atual.size(); i++) {
                if (!atual.get(i).equals(esperado.get(i))) {
                    mensagem.append("\\n  - índice ").append(i).append(": esperava ").append(esperado.get(i))
                            .append(", era ").append(atual.get(i));
                }
            }
        } else {
            if (!naoEncontrados.isEmpty()) mensagem.append("\\n  não encontrados: ").append(naoEncontrados);
            if (!inesperados.isEmpty()) mensagem.append("\\n  inesperados: ").append(inesperados);
        }
        return mensagem.toString();
    }

    static void mostrar(List<String> atual, List<String> esperado) {
        String falha = verificar(atual, esperado);
        System.out.println(falha == null ? "passou" : falha);
    }

    public static void main(String[] args) {
        mostrar(List.of("Teclado", "Mouse"), List.of("Teclado", "Mouse"));
        mostrar(List.of("Teclado", "Mouse", "Headset"), List.of("Mouse", "Teclado", "Headset"));
        mostrar(List.of("Teclado", "Mouse"), List.of("Teclado", "Headset"));
        mostrar(List.of("Mouse", "Mouse", "Teclado"), List.of("Mouse", "Teclado", "Teclado"));
    }
}`,
    saida: 'passou\nesperava exatamente [Mouse, Teclado, Headset], nessa ordem, mas era [Teclado, Mouse, Headset]\n  - índice 0: esperava Mouse, era Teclado\n  - índice 1: esperava Teclado, era Mouse\nesperava exatamente [Teclado, Headset], nessa ordem, mas era [Teclado, Mouse]\n  não encontrados: [Headset]\n  inesperados: [Mouse]\nesperava exatamente [Mouse, Teclado, Teclado], nessa ordem, mas era [Mouse, Mouse, Teclado]\n  não encontrados: [Teclado]\n  inesperados: [Mouse]',
    comentarios:
      'O último caso mostra por que repetições importam: como conjuntos, as duas listas seriam iguais, mas uma tem dois mouses e a outra, dois teclados. Remover da cópia, um por um, compara as listas como multiconjuntos, sem perder as repetições. O AssertJ faz o mesmo raciocínio e ainda formata os valores, pondo textos entre aspas, e usa a comparação configurada, que pode ser trocada com `usingElementComparator`. A remoção numa lista custa O(n) a cada elemento; para listas grandes, contar ocorrências num `HashMap` deixaria a comparação linear.',
  },
  bugs: [
    {
      id: 'backend-junior-t6-e02-b01',
      dificuldade: 1,
      sintoma: 'O total do carrinho sai errado em produção, mas o teste do total passa.',
      codigo: `import java.math.BigDecimal;

public class TotalTeste {
    record Afirmacao(BigDecimal atual) {
        void ehIgualA(String esperado) {
            if (atual.compareTo(new BigDecimal(esperado)) != 0) throw new AssertionError("expected: " + esperado + " but was: " + atual);
        }
    }

    static Afirmacao afirmarQue(BigDecimal atual) {
        return new Afirmacao(atual);
    }

    public static void main(String[] args) {
        BigDecimal total = new BigDecimal("349.90").add(new BigDecimal("129.90"));
        try {
            afirmarQue(total);
            System.out.println("teste passou");
        } catch (AssertionError e) {
            System.out.println("teste falhou: " + e.getMessage());
        }
    }
}`,
      linha: 17,
      efeito: { tipo: 'saida', saida: 'teste passou' },
      correcao: `import java.math.BigDecimal;

public class TotalTeste {
    record Afirmacao(BigDecimal atual) {
        void ehIgualA(String esperado) {
            if (atual.compareTo(new BigDecimal(esperado)) != 0) throw new AssertionError("expected: " + esperado + " but was: " + atual);
        }
    }

    static Afirmacao afirmarQue(BigDecimal atual) {
        return new Afirmacao(atual);
    }

    public static void main(String[] args) {
        BigDecimal total = new BigDecimal("349.90").add(new BigDecimal("129.90"));
        try {
            afirmarQue(total).ehIgualA("609.70");
            System.out.println("teste passou");
        } catch (AssertionError e) {
            System.out.println("teste falhou: " + e.getMessage());
        }
    }
}`,
      saidaCorrigida: 'teste falhou: expected: 609.70 but was: 479.80',
      dica: 'Procure a linha que parece uma asserção. Ela compara alguma coisa?',
      explicacao: 'Como o `assertThat` do AssertJ, o `afirmarQue` só cria o objeto de asserções: quem verifica é o método encadeado. Sem ele, o teste passa sempre. Corrigido, o teste falha, e é isso que se quer: ele denuncia que o carrinho somou um mouse só, e não dois.',
    },
    {
      id: 'backend-junior-t6-e02-b02',
      dificuldade: 2,
      sintoma: 'A regra só exige que o produto tenha estas três tags, em qualquer ordem, mas o teste falha.',
      codigo: `import java.util.List;

public class TagsTeste {
    public static void main(String[] args) {
        List<String> tags = List.of("promo", "gamer", "sem fio");
        List<String> esperadas = List.of("gamer", "promo", "sem fio");
        boolean iguais = tags.equals(esperadas);
        System.out.println(iguais ? "passou" : "FALHOU: " + tags);
    }
}`,
      linha: 7,
      efeito: { tipo: 'saida', saida: 'FALHOU: [promo, gamer, sem fio]' },
      correcao: `import java.util.List;

public class TagsTeste {
    public static void main(String[] args) {
        List<String> tags = List.of("promo", "gamer", "sem fio");
        List<String> esperadas = List.of("gamer", "promo", "sem fio");
        boolean iguais = tags.stream().sorted().toList().equals(esperadas.stream().sorted().toList());
        System.out.println(iguais ? "passou" : "FALHOU: " + tags);
    }
}`,
      saidaCorrigida: 'passou',
      dica: 'O `equals` de duas listas olha mais do que o conteúdo. A ordem faz parte da regra?',
      explicacao: 'O `equals` de `List` exige a mesma ordem, como o `containsExactly`. Quando a ordem não importa, compare cópias ordenadas, o que mantém as repetições, ou use o `containsExactlyInAnyOrder` do AssertJ. Teste exigente demais também é bug: ele quebra quando nada errado aconteceu.',
    },
    {
      id: 'backend-junior-t6-e02-b03',
      dificuldade: 3,
      sintoma: 'O cadastro grava o e-mail errado, mas o teste de cadastro, que compara o cliente salvo com o esperado, passa.',
      codigo: `import java.lang.reflect.RecordComponent;
import java.util.Objects;
import java.util.Set;

public class ClienteTeste {
    record Cliente(Long id, String nome, String email) {}

    static String diferenca(Record atual, Record esperado, Set<String> ignorados) throws Exception {
        for (RecordComponent c : atual.getClass().getRecordComponents()) {
            if (ignorados.contains(c.getName())) continue;
            Object a = c.getAccessor().invoke(atual);
            Object e = c.getAccessor().invoke(esperado);
            if (!Objects.equals(a, e)) return c.getName() + ": " + a + " != " + e;
        }
        return null;
    }

    public static void main(String[] args) throws Exception {
        Cliente salvo = new Cliente(42L, "Ana Lima", "ana.lima@exemplo.com");
        Cliente esperado = new Cliente(null, "Ana Lima", "ana@exemplo.com");
        String d = diferenca(salvo, esperado, Set.of("id", "email"));
        System.out.println(d == null ? "teste passou" : "teste falhou em " + d);
    }
}`,
      linha: 21,
      efeito: { tipo: 'saida', saida: 'teste passou' },
      correcao: `import java.lang.reflect.RecordComponent;
import java.util.Objects;
import java.util.Set;

public class ClienteTeste {
    record Cliente(Long id, String nome, String email) {}

    static String diferenca(Record atual, Record esperado, Set<String> ignorados) throws Exception {
        for (RecordComponent c : atual.getClass().getRecordComponents()) {
            if (ignorados.contains(c.getName())) continue;
            Object a = c.getAccessor().invoke(atual);
            Object e = c.getAccessor().invoke(esperado);
            if (!Objects.equals(a, e)) return c.getName() + ": " + a + " != " + e;
        }
        return null;
    }

    public static void main(String[] args) throws Exception {
        Cliente salvo = new Cliente(42L, "Ana Lima", "ana.lima@exemplo.com");
        Cliente esperado = new Cliente(null, "Ana Lima", "ana@exemplo.com");
        String d = diferenca(salvo, esperado, Set.of("id"));
        System.out.println(d == null ? "teste passou" : "teste falhou em " + d);
    }
}`,
      saidaCorrigida: 'teste falhou em email: ana.lima@exemplo.com != ana@exemplo.com',
      dica: 'A comparação campo a campo está certa. O problema é o que ela foi mandada ignorar.',
      explicacao: 'Só o id, gerado pelo banco, deveria ficar de fora, como no `usingRecursiveComparison().ignoringFields("id")`. Ignorar o e-mail apagou justamente o defeito que o teste existia para pegar. Cada campo ignorado precisa de um motivo.',
    },
  ],
  exercicios: [
    {
      id: 'backend-junior-t6-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que `assertThat(produtos).contains("Headset")` é preferível a `assertTrue(produtos.contains("Headset"))`?',
      opcoes: [
        'Quando falha, a mensagem mostra a lista real e o elemento que faltou, e não só "expected: <true> but was: <false>"',
        'Porque o `assertTrue` não funciona com listas',
        'Porque o AssertJ roda mais rápido',
        'Porque o `assertTrue` não é do JUnit 5 em diante',
      ],
      resposta: 0,
      explicacao: 'As duas verificam a mesma coisa. A diferença aparece na falha: uma explica o problema, a outra obriga a depurar.',
    },
    {
      id: 'backend-junior-t6-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O total calculado é `new BigDecimal("609.70")`. Qual asserção passa?',
      opcoes: [
        '`assertThat(total).isEqualByComparingTo("609.7")`',
        '`assertThat(total).isEqualTo(new BigDecimal("609.7"))`',
        '`assertThat(total).isEqualTo("609.70")`',
        '`assertThat(total).isSameAs(new BigDecimal("609.70"))`',
      ],
      resposta: 0,
      explicacao: 'O `isEqualTo` usa o `equals`, que também compara a escala, ou compara com um texto, de outro tipo; o `isSameAs` compara referências.',
    },
    {
      id: 'backend-junior-t6-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Os produtos do carrinho são `["Teclado", "Mouse", "Headset"]`, nessa ordem. Qual asserção **falha**?',
      opcoes: [
        '`containsExactly("Mouse", "Teclado", "Headset")`',
        '`containsExactlyInAnyOrder("Headset", "Teclado", "Mouse")`',
        '`contains("Mouse", "Headset")`',
        '`hasSize(3)`',
      ],
      resposta: 0,
      explicacao: 'O `containsExactly` exige os mesmos elementos na mesma ordem. Os outros conferem conteúdo sem ordem, parte do conteúdo e o tamanho.',
    },
    {
      id: 'backend-junior-t6-e02-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Com a lista `["Teclado", "Mouse", "Headset"]`, quais asserções passam? Escolha três.',
      opcoes: [
        '`assertThat(lista).startsWith("Teclado")`',
        '`assertThat(lista).doesNotContain("Monitor")`',
        '`assertThat(lista).allSatisfy(p -> assertThat(p).isNotBlank())`',
        '`assertThat(lista).containsOnly("Teclado", "Mouse")`',
        '`assertThat(lista).isEmpty()`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'O `containsOnly` aceita repetições e qualquer ordem, mas não elementos a mais, e o Headset sobra. A lista não está vazia.',
    },
    {
      id: 'backend-junior-t6-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste termina com `assertThat(pedido.estaPago());`. O pedido não está pago. O que acontece?',
      opcoes: [
        'O teste passa: sem um método como `isTrue()`, nada é verificado',
        'O teste falha, porque o valor é falso',
        'Não compila',
        'O AssertJ avisa que a asserção está incompleta',
      ],
      resposta: 0,
      explicacao: 'O `assertThat` só cria o objeto de asserções. Ferramentas de análise estática pegam esse erro; o teste em si fica verde.',
    },
    {
      id: 'backend-junior-t6-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a forma certa de descrever uma asserção com o `as`?',
      opcoes: [
        '`assertThat(carrinho.vazio()).as("carrinho recém-criado").isTrue();`',
        '`assertThat(carrinho.vazio()).isTrue().as("carrinho recém-criado");`',
        '`assertThat("carrinho recém-criado", carrinho.vazio()).isTrue();`',
        '`as("carrinho recém-criado").assertThat(carrinho.vazio()).isTrue();`',
      ],
      resposta: 0,
      explicacao: 'A descrição precisa estar configurada quando a verificação acontece. Depois do `isTrue()`, ela já não aparece numa falha.',
    },
    {
      id: 'backend-junior-t6-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste cria `SoftAssertions soft = new SoftAssertions();`, faz três `soft.assertThat(...)`, todas falhando, e termina. O que acontece?',
      opcoes: [
        'O teste passa: as falhas foram guardadas, mas ninguém chamou `soft.assertAll()`',
        'O teste falha na primeira asserção',
        'O teste falha com as três falhas',
        'Não compila sem o `assertAll`',
      ],
      resposta: 0,
      explicacao: 'As asserções suaves só lançam o erro no `assertAll`. O `assertSoftly(soft -> ...)` evita esquecer, chamando-o sozinho.',
    },
    {
      id: 'backend-junior-t6-e02-q08',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Um teste salva um cliente e quer verificar que o salvo tem os mesmos dados do esperado, mas o id foi gerado pelo banco. Qual asserção serve?',
      opcoes: [
        '`assertThat(salvo).usingRecursiveComparison().ignoringFields("id").isEqualTo(esperado)`',
        '`assertThat(salvo).isEqualTo(esperado)`',
        '`assertThat(salvo).isSameAs(esperado)`',
        '`assertThat(salvo).hasToString(esperado.toString())`',
      ],
      resposta: 0,
      explicacao: 'A comparação recursiva confere campo por campo, entrando nos objetos internos, e deixa de fora os campos indicados.',
    },
    {
      id: 'backend-junior-t6-e02-q09',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa faz o que um `extracting` seguido de `containsExactly` e de `containsExactlyInAnyOrder` fazem. Digite a saída exata.',
      codigo: `import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Teste {
    record Item(String produto, int quantidade) {}

    public static void main(String[] args) {
        List<Item> itens = List.of(new Item("Teclado", 1), new Item("Mouse", 2));
        List<String> produtos = itens.stream().map(Item::produto).toList();
        System.out.println(produtos + " " + produtos.equals(List.of("Mouse", "Teclado"))
                + " " + new HashSet<>(produtos).equals(Set.of("Mouse", "Teclado")));
    }
}`,
      resposta: '[Teclado, Mouse] false true',
      explicacao: 'O `extracting` é um `map`. A lista não é igual na ordem pedida, mas tem os mesmos elementos em qualquer ordem.',
    },
    {
      id: 'backend-junior-t6-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Numa API fluente, um método devolve um objeto novo em vez de alterar o atual. Qual é a saída?',
      codigo: `public class Teste {
    static class Afirmacao {
        final String descricao;

        Afirmacao(String descricao) {
            this.descricao = descricao;
        }

        Afirmacao como(String novaDescricao) {
            return new Afirmacao(novaDescricao);
        }
    }

    public static void main(String[] args) {
        Afirmacao a = new Afirmacao("");
        a.como("total do carrinho");
        Afirmacao b = a.como("frete");
        System.out.println("[" + a.descricao + "] [" + b.descricao + "]");
    }
}`,
      opcoes: ['`[] [frete]`', '`[total do carrinho] [frete]`', '`[frete] [frete]`', '`[] []`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O retorno da primeira chamada foi descartado, e `a` continua como estava. Por isso APIs fluentes se usam numa cadeia só, usando sempre o que cada método devolve.',
    },
    {
      id: 'backend-junior-t6-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O que acontece com `assertThatThrownBy(() -> carrinho.totalComCupom("DEZ")).isInstanceOf(IllegalArgumentException.class)`, se o cupom DEZ é válido?',
      opcoes: [
        'Falha com "Expecting code to raise a throwable."',
        'Passa, porque nenhuma exceção é melhor que uma',
        'Lança a `IllegalArgumentException`',
        'Não compila',
      ],
      resposta: 0,
      explicacao: 'O `assertThatThrownBy` exige que o código lance algo. A asserção sobre o tipo nem chega a ser feita.',
    },
    {
      id: 'backend-junior-t6-e02-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'A mensagem da exceção é "cupom inválido: NATAL". Qual asserção passa?',
      opcoes: [
        '`.hasMessageContaining("inválido")`',
        '`.hasMessage("inválido")`',
        '`.hasMessage("cupom inválido")`',
        '`.hasMessageStartingWith("NATAL")`',
      ],
      resposta: 0,
      explicacao: 'O `hasMessage` compara a mensagem inteira; o `hasMessageContaining`, um trecho. Há também `hasMessageStartingWith` e `hasMessageEndingWith`.',
    },
    {
      id: 'backend-junior-t6-e02-q13',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Uma verificação "em qualquer ordem" caseira compara listas de dois jeitos. Qual é a saída?',
      codigo: `import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

public class Teste {
    public static void main(String[] args) {
        List<String> atual = new ArrayList<>(List.of("Mouse", "Mouse", "Teclado"));
        List<String> esperado = new ArrayList<>(List.of("Teclado", "Teclado", "Mouse"));
        boolean comoConjunto = new HashSet<>(atual).equals(new HashSet<>(esperado));
        Collections.sort(atual);
        Collections.sort(esperado);
        System.out.println(atual.equals(esperado) + " " + comoConjunto);
    }
}`,
      opcoes: ['`false true`', '`true true`', '`false false`', '`true false`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Como conjuntos, as repetições somem e as listas parecem iguais. Ordenadas, as duas mostram que uma tem dois mouses e a outra, dois teclados, como o `containsExactlyInAnyOrder` percebe.',
    },
    {
      id: 'backend-junior-t6-e02-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Como verificar, numa asserção só, o produto e a quantidade de cada item do carrinho, na ordem?',
      opcoes: [
        '`assertThat(itens).extracting(Item::produto, Item::quantidade).containsExactly(tuple("Teclado", 1), tuple("Mouse", 2))`',
        '`assertThat(itens).containsExactly("Teclado", 1, "Mouse", 2)`',
        '`assertThat(itens.toString()).isEqualTo("Teclado 1 Mouse 2")`',
        '`assertThat(itens).hasSize(2)`',
      ],
      resposta: 0,
      explicacao: 'Com várias funções, o `extracting` produz tuplas, uma por elemento, e a falha mostra exatamente quais tuplas não bateram.',
    },
    {
      id: 'backend-junior-t6-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que, depois de `assertThat(nome)`, a IDE sugere `startsWith`, e depois de `assertThat(lista)`, sugere `hasSize`?',
      opcoes: [
        'O `assertThat` é sobrecarregado: o compilador escolhe a versão pelo tipo do argumento, e cada uma devolve uma classe de asserções própria do tipo',
        'Porque a IDE lê o valor da variável em tempo de execução',
        'Porque o AssertJ usa reflexão para descobrir os métodos',
        'Por coincidência: os métodos são os mesmos para todos os tipos',
      ],
      resposta: 0,
      explicacao: 'Há versões do `assertThat` para `String`, `List`, `BigDecimal`, `Optional` e muitos outros tipos, escolhidas em tempo de compilação.',
    },
  ],
};

export default episodio;
