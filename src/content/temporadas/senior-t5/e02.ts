import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t5-e02',
  minutos: 16,
  aula,
  armadilhas: [
    'O arredondamento padrão de `NumberFormat` e `DecimalFormat` é `HALF_EVEN`: 2,5 vira 2 e 3,5 vira 4.',
    '`parse` devolve um `Number`, que é `Long` para valores inteiros e `Double` para os outros.',
    '`parse` lê até o primeiro caractere inválido: `"12abc"` dá 12, sem exceção.',
    '`ParseException` só acontece quando nada pode ser lido, e é uma exceção checked.',
    'O formato de moeda exige o símbolo ao ler: `"12.50"` falha num `getCurrencyInstance(Locale.US)`.',
    'Formatos de vários países usam o espaço não separável (caractere 160): a comparação com texto digitado falha.',
    'No `DecimalFormat`, `0` mostra o dígito mesmo quando é zero; `#` o omite.',
    'Instâncias de `NumberFormat` e `DecimalFormat` não são thread-safe.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Using Predefined Formats',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/format/numberFormat.html',
      tipo: 'documentacao',
      porque: 'Números, moedas e percentuais com os formatos prontos de cada `Locale`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Customizing Formats',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/format/decimalFormat.html',
      tipo: 'documentacao',
      porque: 'A tabela de símbolos dos padrões do `DecimalFormat`, com exemplos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.text.NumberFormat',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/NumberFormat.html',
      tipo: 'documentacao',
      porque: 'As fábricas, o comportamento de `parse` e o aviso sobre sincronização.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.text.DecimalFormat',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/DecimalFormat.html',
      tipo: 'documentacao',
      porque: 'A gramática completa dos padrões e o arredondamento.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Javadoc de java.text.CompactNumberFormat',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/CompactNumberFormat.html',
      tipo: 'documentacao',
      porque: 'Os números compactos do Java 12, como `1M` e `2 milhões`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Number Formatting in Java',
      url: 'https://www.baeldung.com/java-number-formatting',
      tipo: 'artigo',
      porque: 'As várias formas de formatar números, de `String.format` a `NumberFormat`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: A Practical Guide to DecimalFormat',
      url: 'https://www.baeldung.com/java-decimalformat',
      tipo: 'artigo',
      porque: 'Padrões, símbolos por localidade e arredondamento com `DecimalFormat`.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Java Money and the Currency API',
      url: 'https://www.baeldung.com/java-money-and-currency',
      tipo: 'artigo',
      porque: 'A classe `Currency` e por que cálculos com dinheiro pedem cuidado.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, Internacionalização de moeda com Locale',
      url: 'https://www.youtube.com/watch?v=waedzSaWMjo',
      tipo: 'video',
      porque: 'Formatando valores em dinheiro para vários países, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Loiane Groner: Curso de Java #90, Locale (Internacionalização)',
      url: 'https://www.youtube.com/watch?v=eLjZ_L7FA4s',
      tipo: 'video',
      porque: 'Números e moedas formatados com `Locale`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: '`NumberFormat`, `DecimalFormat` e números compactos com as pegadinhas da prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seção "Supporting Internationalization and Localization", parte sobre números',
    },
  ],
  desafio: {
    titulo: 'Nota fiscal para clientes de fora',
    enunciado:
      'Uma loja brasileira vende 3 cadernos de R$ 19,90, 1 mochila de R$ 249,00 e 2 canetas de R$ 7,45, com 10% de desconto, arredondado para o centavo com `HALF_UP`. Faça as contas com `BigDecimal` e mostre a nota para clientes no Brasil, nos Estados Unidos e na Alemanha. O valor é sempre em reais: use `setCurrency(Currency.getInstance("BRL"))` no formato de moeda de cada país. Troque o espaço não separável por um espaço comum. A saída deve ser:\n\n```text\npt_BR: subtotal R$ 323,60 | desconto 10% = R$ 32,36 | total R$ 291,24\nen_US: subtotal R$323.60 | desconto 10% = R$32.36 | total R$291.24\nde_DE: subtotal 323,60 R$ | desconto 10 % = 32,36 R$ | total 291,24 R$\n```',
    dicas: [
      'Crie os preços com `new BigDecimal("19.90")`, a partir de texto, e nunca com `double`.',
      '`NumberFormat.format` aceita um `BigDecimal` diretamente.',
      'Sem `setCurrency`, o formato americano mostraria dólares, e o alemão, euros, com os mesmos números.',
    ],
    solucao: `import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.List;
import java.util.Locale;

public class Nota {
    record Item(String nome, int quantidade, BigDecimal preco) {
        BigDecimal total() {
            return preco.multiply(BigDecimal.valueOf(quantidade));
        }
    }

    static String txt(String s) {
        return s.replace((char) 160, ' ').replace((char) 0x202F, ' ');
    }

    public static void main(String[] args) {
        List<Item> itens = List.of(
            new Item("caderno", 3, new BigDecimal("19.90")),
            new Item("mochila", 1, new BigDecimal("249.00")),
            new Item("caneta", 2, new BigDecimal("7.45")));
        BigDecimal subtotal = itens.stream().map(Item::total).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal taxa = new BigDecimal("0.10");
        BigDecimal desconto = subtotal.multiply(taxa).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.subtract(desconto);

        Currency real = Currency.getInstance("BRL");
        for (Locale l : List.of(Locale.forLanguageTag("pt-BR"), Locale.US, Locale.GERMANY)) {
            NumberFormat moeda = NumberFormat.getCurrencyInstance(l);
            moeda.setCurrency(real);
            NumberFormat percentual = NumberFormat.getPercentInstance(l);
            System.out.println(l + ": subtotal " + txt(moeda.format(subtotal)) + " | desconto " + txt(percentual.format(taxa)) + " = " + txt(moeda.format(desconto)) + " | total " + txt(moeda.format(total)));
        }
    }
}`,
    saida: 'pt_BR: subtotal R$ 323,60 | desconto 10% = R$ 32,36 | total R$ 291,24\nen_US: subtotal R$323.60 | desconto 10% = R$32.36 | total R$291.24\nde_DE: subtotal 323,60 R$ | desconto 10 % = 32,36 R$ | total 291,24 R$',
    comentarios:
      'A moeda e o formato são coisas independentes: o `Locale` decide onde vai o símbolo e quais são os separadores, e o `Currency` decide qual é o dinheiro. O cliente americano vê os reais no formato que conhece, com ponto decimal e símbolo colado. As contas em `BigDecimal` dão exatamente R$ 323,60; em `double`, a soma de 19,90 três vezes já carregaria erros de representação.',
  },
  exercicios: [
    {
      id: 'senior-t5-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(NumberFormat.getCurrencyInstance(Locale.US).format(0.5) + " " + NumberFormat.getPercentInstance(Locale.US).format(1.5));
    }
}`,
      opcoes: ['`$0.50 150%`', '`$0.5 1.5%`', '`$.50 150%`', '`0.50$ 150%`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O formato de moeda usa as duas casas do dólar. O de percentual multiplica por 100.',
    },
    {
      id: 'senior-t5-e02-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        NumberFormat i = NumberFormat.getIntegerInstance(Locale.US);
        System.out.println(i.format(4.5) + " " + i.format(5.5));
    }
}`,
      opcoes: ['`4 6`', '`5 6`', '`4 5`', '`5 5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'No `HALF_EVEN`, o empate vai para o vizinho par: 4,5 vira 4 e 5,5 vira 6.',
    },
    {
      id: 'senior-t5-e02-q03',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) throws ParseException {
        NumberFormat us = NumberFormat.getInstance(Locale.US);
        Number x = us.parse("3.14abc");
        Number y = us.parse("42");
        System.out.println(x + " " + y + " " + y.getClass().getSimpleName());
    }
}`,
      resposta: '3.14 42 Long',
      explicacao: 'A leitura para no `a` e devolve o que leu. Um valor inteiro volta como `Long`.',
    },
    {
      id: 'senior-t5-e02-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) throws ParseException {
        System.out.println(NumberFormat.getInstance(Locale.US).parse("x12"));
    }
}`,
      opcoes: ['Lança `ParseException`', 'Imprime `12`', 'Imprime `0`', 'Imprime `null`'],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'ParseException', saida: '' },
      explicacao: 'Com o primeiro caractere inválido, nada pode ser lido, e aí sim a exceção é lançada.',
    },
    {
      id: 'senior-t5-e02-q05',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) throws ParseException {
        NumberFormat f = NumberFormat.getInstance(Locale.US);
        String texto = f.format(1.5);
        double d = f.parse(texto);
        System.out.println(d);
    }
}`,
      resposta: 9,
      explicacao: '`parse` devolve um `Number`. Para obter o `double`, é preciso chamar `doubleValue()`.',
    },
    {
      id: 'senior-t5-e02-q06',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com a fábrica de formatos de percentual. O programa deve imprimir `75%`.',
      codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Percentual {
    public static void main(String[] args) {
        System.out.println(NumberFormat.___(Locale.US).format(0.75));
    }
}`,
      respostas: ['getPercentInstance'],
      saida: '75%',
      explicacao: 'O formato de percentual multiplica o valor por 100 e acrescenta o sinal, na posição do `Locale`.',
    },
    {
      id: 'senior-t5-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        DecimalFormatSymbols us = DecimalFormatSymbols.getInstance(Locale.US);
        System.out.println(new DecimalFormat("00.00", us).format(3.14159) + " " + new DecimalFormat("#,##0.0", us).format(1234.56));
    }
}`,
      opcoes: ['`03.14 1,234.6`', '`3.14 1234.6`', '`03.14 1,234.56`', '`3.1416 1,234.6`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `00` à esquerda obriga dois dígitos inteiros. Com uma casa no padrão, 1234,56 é arredondado para 1234,6.',
    },
    {
      id: 'senior-t5-e02-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre `NumberFormat.parse` são verdadeiras? Escolha duas.',
      opcoes: [
        'Lê até o primeiro caractere que não faz parte de um número',
        'Declara `ParseException`, uma exceção checked',
        'Sempre devolve um `Double`',
        'Lança exceção se houver qualquer caractere inválido no texto',
        'Ignora a localidade e usa sempre o ponto como decimal',
      ],
      respostas: [0, 1],
      explicacao: 'O tipo devolvido é `Long` ou `Double`, conforme o valor, e os separadores são os do `Locale` do formato.',
    },
    {
      id: 'senior-t5-e02-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        NumberFormat f = NumberFormat.getInstance(Locale.US);
        f.setMaximumFractionDigits(1);
        System.out.println(f.format(2.25) + " " + f.format(2.35));
    }
}`,
      opcoes: ['`2.2 2.4`', '`2.3 2.4`', '`2.2 2.3`', '`2.3 2.3`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '2,25 é exato em binário: é um empate, e o `HALF_EVEN` vai para o 2 par, 2,2. Já 2,35 é guardado como 2,35000000000000008..., um pouco acima do meio, e sobe para 2,4.',
    },
    {
      id: 'senior-t5-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um teste compara `NumberFormat.getCurrencyInstance(Locale.forLanguageTag("pt-BR")).format(10)` com o texto `"R$ 10,00"`, digitado no código, e falha. Por quê?',
      opcoes: [
        'O espaço depois de `R$` no resultado é o espaço não separável, um caractere diferente do espaço comum',
        'O formato brasileiro escreve `R$10.00`',
        'O formato devolve um `Number`, não uma `String`',
        'O `Locale` `pt-BR` usa o dólar',
      ],
      resposta: 0,
      explicacao: 'O CLDR usa o caractere 160 entre o símbolo e o número, para que a quebra de linha não os separe. A comparação precisa usar o mesmo caractere.',
    },
    {
      id: 'senior-t5-e02-q11',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Currency;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Currency.getInstance("BRL").getDefaultFractionDigits() + " " + Currency.getInstance(Locale.JAPAN).getCurrencyCode());
    }
}`,
      opcoes: ['`2 JPY`', '`2 YEN`', '`0 JPY`', '`2 ¥`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O real tem duas casas decimais. A moeda do Japão é identificada pelo código ISO 4217, `JPY`.',
    },
    {
      id: 'senior-t5-e02-q12',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Qual é a saída?',
      codigo: `import java.text.NumberFormat;
import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        NumberFormat c = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
        System.out.println(c.format(1500) + " " + c.format(999) + " " + c.format(2500));
    }
}`,
      opcoes: ['`2K 999 2K`', '`1.5K 999 2.5K`', '`2K 1K 3K`', '`1K 999 2K`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'A forma compacta não mostra casas por padrão e arredonda com `HALF_EVEN`: 1,5 mil e 2,5 mil viram 2 mil. Abaixo de mil, o número aparece inteiro.',
    },
    {
      id: 'senior-t5-e02-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um serviço guarda um único `NumberFormat` num campo `static` e o usa em várias threads ao mesmo tempo. Qual é o risco?',
      opcoes: [
        'Textos formatados errados ou misturados, porque `NumberFormat` não é thread-safe',
        'Nenhum: os formatos são imutáveis',
        'Um `ConcurrentModificationException` garantido',
        'Os números passarem a usar o `Locale` padrão',
      ],
      resposta: 0,
      explicacao: 'O formato guarda estado durante cada chamada. Use uma instância por uso, por thread, ou sincronize o acesso.',
    },
    {
      id: 'senior-t5-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Por que cálculos com dinheiro devem usar `BigDecimal` em vez de `double`?',
      opcoes: [
        'Porque `double` representa frações decimais de forma aproximada, e os erros se acumulam',
        'Porque `double` não pode ser formatado com `NumberFormat`',
        'Porque `BigDecimal` é mais rápido',
        'Porque `double` não aceita valores negativos',
      ],
      resposta: 0,
      explicacao: 'Em `double`, `0.1 + 0.2` dá `0.30000000000000004`. `BigDecimal` guarda o valor decimal exato e deixa o arredondamento explícito.',
    },
    {
      id: 'senior-t5-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Num `DecimalFormat`, qual é a diferença entre os símbolos `0` e `#`?',
      opcoes: [
        '`0` sempre mostra um dígito, inclusive zero; `#` omite zeros à esquerda e à direita',
        '`0` é para inteiros; `#` é para decimais',
        '`#` arredonda; `0` trunca',
        'Não há diferença',
      ],
      resposta: 0,
      explicacao: 'Com `0.00`, o valor 0,5 sai `0.50`; com `#.##`, sai `0.5`.',
    },
  ],
};

export default episodio;
