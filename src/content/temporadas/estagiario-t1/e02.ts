import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'estagiario-t1-e02',
  minutos: 10,
  aula,
  armadilhas: [
    'A ordem é `package`, `import`, tipos. Um `import` depois da classe não compila.',
    'Só comentários podem vir antes do `package`.',
    'No máximo uma classe `public` por arquivo, e o arquivo leva o nome dela.',
    '`import java.util.*;` não importa subpacotes como `java.util.function`.',
    '`java.lang` é importado automaticamente; importá-lo de novo é redundante, mas compila.',
    'Dois curingas com a mesma classe (`java.util.*` e `java.sql.*` com `Date`) só dão erro quando você usa o nome ambíguo.',
    'Dois imports explícitos com o mesmo nome simples dão erro mesmo sem uso.',
    'Comentários `/* */` não se aninham: o primeiro `*/` fecha tudo.',
  ],
  ia: {
    uso:
      'A IA explica bem por que um arquivo não compila por causa da ordem, de um import ou de duas classes públicas, e ajuda a descobrir em que pacote mora uma classe. Para estudar para a prova, peça que ela invente arquivos com erros de estrutura para você achar: é o tipo de questão que mais cai neste assunto.',
    pedido:
      'Estou estudando para a certificação Java (Java 25). Monte 5 arquivos .java curtos, cada um com no máximo um erro de estrutura: ordem de package e import, duas classes public, nome de arquivo errado, conflito de imports ou import de classe inexistente.\n- Não diga qual é o erro; numere os arquivos.\n- Inclua pelo menos um arquivo que compila, para eu não achar que todos têm erro.\n- Depois que eu responder, confira as minhas respostas e explique cada uma.',
    erros: [
      'Inventa o pacote de uma classe, como `java.util.LocalDate` no lugar de `java.time.LocalDate`.',
      'Diz que `import java.util.*` também importa `java.util.function`, ou que imports deixam o programa mais lento.',
      'Garante que um arquivo compila sem ter compilado: ela erra justamente nos casos de conflito entre curinga e import explícito.',
    ],
    conferir: [
      'Compile cada arquivo: o `javac` decide, e a mensagem de erro aponta a linha.',
      'Confira o pacote de uma classe no Javadoc oficial do JDK.',
      'No IntelliJ, Alt + Enter mostra o pacote certo de uma classe sem import.',
    ],
  },
  recursos: [
    {
      titulo: 'The Java Tutorials: Packages',
      url: 'https://docs.oracle.com/javase/tutorial/java/package/index.html',
      tipo: 'documentacao',
      porque: 'Lição oficial sobre criar e usar pacotes, importar membros e resolver conflitos de nome.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JLS, capítulo 7: Packages and Modules',
      url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html',
      tipo: 'documentacao',
      porque: 'As regras exatas de import simples, curinga e conflito de nomes, direto da especificação.',
      gratuito: true,
      idioma: 'en',
      onde: '7.5 Import Declarations',
    },
    {
      titulo: 'Manual do javac (JDK 21)',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/specs/man/javac.html',
      tipo: 'documentacao',
      porque: 'Tudo sobre `-d`, `--class-path` e como o compilador procura os arquivos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 511: Module Import Declarations',
      url: 'https://openjdk.org/jeps/511',
      tipo: 'documentacao',
      porque: 'Para a 1Z0-831: como funciona o `import module` do Java 25.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'dev.java: Packages',
      url: 'https://dev.java/learn/language/oop/packages/',
      tipo: 'tutorial',
      porque: 'Capítulo oficial sobre pacotes, imports e a relação com as pastas do projeto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Guide to Java Packages',
      url: 'https://www.baeldung.com/java-packages',
      tipo: 'artigo',
      porque: 'Do pacote à linha de comando: compila e roda classes empacotadas pelo nome qualificado.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Advantages and Disadvantages of Using Java Wildcard Imports',
      url: 'https://www.baeldung.com/java-wildcard-imports',
      tipo: 'artigo',
      porque: 'Quando o curinga ajuda e quando causa o conflito clássico entre java.util.Date e java.sql.Date.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Curso em Vídeo: Curso de Java #04, Primeiro Programa em Java',
      url: 'https://www.youtube.com/watch?v=ijXXaIYsVx4',
      tipo: 'video',
      porque: 'Mostra na prática a estrutura de um arquivo Java: classe, main e pacote criados pela IDE.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'Cobre cada pegadinha de import que cai na prova, com exercícios no fim do capítulo.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 1, "Building Blocks": seções sobre pacotes, imports, conflitos de nome e a ordem dos elementos no arquivo',
    },
  ],
  desafio: {
    titulo: 'Duas Date no mesmo arquivo',
    enunciado:
      'Crie a classe `Relatorio` no pacote `br.com.javaflix`, salva em `br/com/javaflix/Relatorio.java`. Ela deve usar `java.time.LocalDate`, `java.util.Date` **e** `java.sql.Date` no mesmo arquivo, sem erro de ambiguidade, e imprimir:\n\n```text\n2026-10-10\n2026-10-10\nDate\n```\n\nCompile com `javac -d out` e execute com o nome totalmente qualificado.',
    dicas: [
      'Importe só uma das duas `Date`. A outra você usa pelo nome completo, como `java.sql.Date`.',
      '`java.sql.Date.valueOf(LocalDate)` converte uma data, e `getTime()` devolve os milissegundos.',
      'Para rodar: `java -cp out br.com.javaflix.Relatorio`.',
    ],
    solucao: `package br.com.javaflix;

import java.time.LocalDate;
import java.util.Date;

public class Relatorio {
    public static void main(String[] args) {
        LocalDate dia = LocalDate.of(2026, 10, 10);
        java.sql.Date sql = java.sql.Date.valueOf(dia);
        Date util = new Date(sql.getTime());
        System.out.println(dia);
        System.out.println(sql);
        System.out.println(util.getClass().getSimpleName());
    }
}`,
    saida: '2026-10-10\n2026-10-10\nDate',
    comentarios:
      'O import explícito de `java.util.Date` deixa `Date` sem ambiguidade, e `java.sql.Date` aparece sempre pelo nome completo. O `package` obriga a usar `-d` na compilação (para criar `out/br/com/javaflix/`) e o nome qualificado na execução. Tente importar as duas `Date` explicitamente para ver o erro do compilador.',
  },
  bugs: [
    {
      id: 'estagiario-t1-e02-b01',
      dificuldade: 1,
      sintoma: 'O `javac` recusa o programa com `error: cannot find symbol` apontando para `Println`.',
      codigo: `public class Recado {
    public static void main(String[] args) {
        System.out.Println("Reunião às 10h");
    }
}`,
      linha: 3,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Recado {
    public static void main(String[] args) {
        System.out.println("Reunião às 10h");
    }
}`,
      saidaCorrigida: 'Reunião às 10h',
      dica: 'A mensagem diz exatamente qual símbolo não existe. Compare a grafia com a do método que você conhece.',
      explicacao: 'Métodos começam com letra minúscula por convenção, e o nome exato é `println`. Para o compilador, `Println` é outro nome, que não existe em `PrintStream`.',
    },
    {
      id: 'estagiario-t1-e02-b02',
      dificuldade: 2,
      sintoma: 'O `javac` recusa o programa com `error: invalid method declaration; return type required`.',
      codigo: `public class Saudacao {
    static saudar(String nome) {
        return "Olá, " + nome;
    }

    public static void main(String[] args) {
        System.out.println(saudar("Ana"));
    }
}`,
      linha: 2,
      efeito: { tipo: 'naoCompila' },
      correcao: `public class Saudacao {
    static String saudar(String nome) {
        return "Olá, " + nome;
    }

    public static void main(String[] args) {
        System.out.println(saudar("Ana"));
    }
}`,
      saidaCorrigida: 'Olá, Ana',
      dica: 'Toda declaração de método diz o que ele devolve, logo antes do nome. O que este método devolve?',
      explicacao: 'A declaração de um método precisa do tipo de retorno: `void` se não devolve nada, ou o tipo do valor, aqui `String`. Sem ele, o compilador só aceitaria a linha se fosse um construtor, e construtores têm o nome da classe.',
    },
    {
      id: 'estagiario-t1-e02-b03',
      dificuldade: 3,
      sintoma: 'O programa compila e roda, mas a mensagem da tarde não aparece.',
      codigo: `public class Turnos {
    public static void main(String[] args) {
        System.out.println("Bom dia"); // turno da manhã
        // turno da tarde System.out.println("Boa tarde");
        System.out.println("Boa noite"); // turno da noite
    }
}`,
      linha: 4,
      efeito: { tipo: 'saida', saida: 'Bom dia\nBoa noite' },
      correcao: `public class Turnos {
    public static void main(String[] args) {
        System.out.println("Bom dia"); // turno da manhã
        System.out.println("Boa tarde"); // turno da tarde
        System.out.println("Boa noite"); // turno da noite
    }
}`,
      saidaCorrigida: 'Bom dia\nBoa tarde\nBoa noite',
      dica: 'O compilador ignora uma parte de algumas linhas. Qual parte, e a partir de onde?',
      explicacao: 'Um comentário de linha vai do `//` até o fim da linha. Na linha 4, o código veio depois do comentário e virou texto ignorado. Bugs assim não dão erro nenhum: só a saída denuncia, e por isso vale ler a saída inteira.',
    },
  ],
  exercicios: [
    {
      id: 'estagiario-t1-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é o resultado de compilar `Carrinho.java`?',
      codigo: `import java.util.List;
package loja;

public class Carrinho {
    List<String> itens;
}`,
      opcoes: [
        'Compila normalmente',
        'Não compila: a declaração `package` precisa vir antes dos imports',
        'Não compila: `List` precisa ser inicializada',
        'Compila, mas a classe fica no pacote padrão',
      ],
      resposta: 1,
      verificar: { tipo: 'naoCompila', linha: 2 },
      explicacao:
        'Se existir, o `package` é a primeira instrução do arquivo; só comentários e linhas em branco podem vir antes. Com o `import` na frente, o compilador não aceita o `package` da linha 2.',
      dica: 'Lembre a ordem fixa do arquivo: o que precisa vir primeiro, o `package` ou o `import`?',
    },
    {
      id: 'estagiario-t1-e02-q02',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais linhas são comentários válidos, que compilam dentro de um método? Escolha três.',
      opcoes: [
        '`// tudo certo`',
        '`/* várias\n   linhas */`',
        '`/** estilo javadoc */`',
        '`# comentário`',
        '`/* externo /* interno */ ainda externo */`',
        '`<!-- comentário -->`',
      ],
      respostas: [0, 1, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        'Java aceita `//`, `/* */` e `/** */`. O `#` e o `<!-- -->` são de outras linguagens. E comentários de bloco não se aninham: o primeiro `*/` fecha o comentário e `ainda externo */` vira código inválido.',
      dica: 'Java tem três formas de comentário, todas começando com barra. E comentários de bloco não se aninham.',
    },
    {
      id: 'estagiario-t1-e02-q03',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que a linha `import java.util.*;` traz para o arquivo?',
      opcoes: [
        'As classes e interfaces públicas do pacote `java.util`, mas não as dos subpacotes como `java.util.function`',
        'Todas as classes de `java.util` e também as de `java.util.concurrent` e `java.util.function`',
        'Só as classes que o código usa, e isso deixa o programa mais lento',
        'Nada: `java.util` já é importado automaticamente',
      ],
      resposta: 0,
      explicacao:
        'O curinga vale para um pacote só. Subpacotes são pacotes independentes e precisam do seu próprio import. Imports não têm custo em tempo de execução, e o único pacote importado automaticamente é `java.lang`.',
      dica: 'O curinga pega o que está diretamente no pacote. Um subpacote é outro pacote, com outro nome.',
    },
    {
      id: 'estagiario-t1-e02-q04',
      tipo: 'linha',
      dificuldade: 2,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;
import java.sql.*;

public class Agenda {
    public static void main(String[] args) {
        List<String> eventos = new ArrayList<>();
        Date hoje = null;
        System.out.println(eventos.size() + " " + hoje);
    }
}`,
      resposta: 7,
      explicacao:
        '`java.util` e `java.sql` têm, cada um, uma classe `Date`. Com dois curingas, o nome `Date` fica ambíguo, e o erro aparece onde ele é usado. `List` e `ArrayList` só existem em `java.util`, então não há problema com eles.',
      dica: 'Dois pacotes importados com curinga têm uma classe com o mesmo nome simples. Qual linha usa esse nome?',
    },
    {
      id: 'estagiario-t1-e02-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado?',
      codigo: `import java.util.Date;
import java.sql.*;

public class Agenda {
    public static void main(String[] args) {
        Date d = new Date(0);
        System.out.println(d.getClass().getName());
    }
}`,
      opcoes: ['`java.util.Date`', '`java.sql.Date`', 'Não compila: `Date` é ambíguo', 'Não compila: import duplicado'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'Um import explícito tem prioridade sobre um import com curinga. Por isso `Date` aqui é `java.util.Date`, e o `java.sql.*` não causa conflito.',
      dica: 'Um import explícito, com o nome da classe, tem prioridade sobre um import com curinga.',
    },
    {
      id: 'estagiario-t1-e02-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual pacote é importado automaticamente em todo arquivo Java?',
      opcoes: ['`java.util`', '`java.lang`', '`java.io`', '`java.base`', 'Nenhum: tudo precisa de import'],
      resposta: 1,
      explicacao:
        '`java.lang` traz `String`, `System`, `Math`, `Integer` e outras classes básicas, sem import. `java.base` é o nome de um módulo, não de um pacote.',
      dica: 'É o pacote de `String`, `System` e `Math`, classes que você usa sem importar nada.',
    },
    {
      id: 'estagiario-t1-e02-q07',
      tipo: 'multipla',
      dificuldade: 3,
      enunciado: 'Cada opção é um arquivo `A.java` completo. Quais compilam? Escolha duas.',
      opcoes: [
        '`import java.lang.*;\npublic class A { }`',
        '`import java.util.Date;\nimport java.sql.Date;\npublic class A { }`',
        '`import java.util.*;\nimport java.util.*;\npublic class A { }`',
        '`import java.util.Lista;\npublic class A { }`',
        '`import java.util.*.*;\npublic class A { }`',
      ],
      respostas: [0, 2],
      verificar: { tipo: 'opcoesCompilam' },
      explicacao:
        'Importar `java.lang` ou repetir o mesmo curinga é redundante, mas permitido. Dois imports explícitos de `Date` conflitam mesmo sem uso, importar uma classe que não existe é erro, e `*.*` não é sintaxe válida.',
      dica: 'Imports repetidos ou desnecessários compilam. Uma classe que não existe, ou dois imports explícitos com o mesmo nome simples, não.',
    },
    {
      id: 'estagiario-t1-e02-q08',
      tipo: 'lacuna',
      dificuldade: 2,
      enunciado: 'O arquivo não tem nenhum import. Complete a declaração para o código compilar e imprimir `2026`.',
      codigo: `public class Relogio {
    public static void main(String[] args) {
        ___ agora = java.time.LocalDate.of(2026, 10, 10);
        System.out.println(agora.getYear());
    }
}`,
      respostas: ['java.time.LocalDate', 'var'],
      saida: '2026',
      explicacao:
        'Sem import, a classe precisa aparecer pelo nome totalmente qualificado: `java.time.LocalDate`. Também vale `var`, que deixa o compilador inferir o tipo; você vai ver `var` no próximo episódio.',
      dica: 'Sem import, ainda dá para usar uma classe pelo nome completo, com o pacote. E existe um jeito de não escrever o tipo.',
    },
    {
      id: 'estagiario-t1-e02-q09',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O arquivo `Loja.java` contém o código abaixo. O que acontece ao compilar?',
      codigo: `public class Loja {
}

public class Produto {
}`,
      opcoes: [
        'Compila e gera `Loja.class` e `Produto.class`',
        'Não compila: `Produto` é pública e deveria estar em `Produto.java`',
        'Compila só a classe `Loja` e ignora `Produto`',
        'Não compila: um arquivo só pode declarar uma classe',
      ],
      resposta: 1,
      verificar: { tipo: 'naoCompila', linha: 4 },
      explicacao:
        'Um arquivo pode ter várias classes de topo, mas só uma pode ser `public`, e ela dá nome ao arquivo. Se `Produto` não fosse `public`, compilaria e geraria dois `.class`.',
      dica: 'Conte quantas classes `public` há no arquivo e compare os nomes com o nome do arquivo.',
    },
    {
      id: 'estagiario-t1-e02-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O código abaixo está em `Carro.java`. Qual é o resultado de compilar e executar `java Carro`?',
      codigo: `class Motor {
    String ligar() {
        return "vrum";
    }
}

public class Carro {
    public static void main(String[] args) {
        System.out.println(new Motor().ligar());
    }
}`,
      opcoes: [
        '`vrum`',
        'Não compila: `Motor` precisa estar em `Motor.java`',
        'Não compila: só pode haver uma classe por arquivo',
        'Compila, mas lança exceção porque `Motor.class` não existe',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'Classes que não são `public` podem dividir o arquivo com a classe pública. O `javac` gera `Carro.class` e `Motor.class`, um para cada tipo.',
      dica: 'Classes sem `public` podem morar em qualquer arquivo. Cada uma vira o seu próprio `.class` na compilação.',
    },
    {
      id: 'estagiario-t1-e02-q11',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `public class Comentarios {
    public static void main(String[] args) {
        // System.out.println("um");
        System.out.println("dois // três");
        /* System.out.println("quatro"); */
        System.out.println("cinco /* seis */");
    }
}`,
      resposta: 'dois // três\ncinco /* seis */',
      explicacao:
        'As linhas comentadas não executam. Já `//` e `/* */` dentro de aspas fazem parte da String e são impressos normalmente.',
      dica: 'Dentro de aspas, `//` e `/* */` são texto comum. Fora delas, apagam o que vem depois.',
    },
    {
      id: 'estagiario-t1-e02-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado:
        'A classe `App` declara `package br.com.loja;` e foi compilada com `javac -d out App.java`. Qual comando executa o programa a partir da mesma pasta?',
      opcoes: [
        '`java -cp out br.com.loja.App`',
        '`java out/br/com/loja/App`',
        '`java -cp out App`',
        '`java br.com.loja.App.class`',
        '`java -cp out/br/com/loja App`',
      ],
      resposta: 0,
      explicacao:
        'O classpath aponta para a raiz das pastas de pacote (`out`) e a classe é chamada pelo nome totalmente qualificado. Apontar o classpath para a pasta da classe e usar só `App` falha, porque a JVM encontra um `App.class` que pertence ao pacote `br.com.loja`.',
      dica: 'O `-cp` aponta a pasta onde começam os pacotes, e o `java` recebe o nome qualificado da classe, com pontos.',
    },
    {
      id: 'estagiario-t1-e02-q13',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais afirmações sobre a estrutura de um arquivo `.java` são verdadeiras? Escolha duas.',
      opcoes: [
        'A declaração `package`, se existir, é a primeira instrução do arquivo; só comentários podem vir antes',
        'Um arquivo pode ter várias declarações `package`, uma para cada classe',
        'Os imports vêm depois do `package` e antes das declarações de tipos',
        'Imports podem aparecer entre duas classes do mesmo arquivo',
        'O nome do arquivo precisa ser igual ao de todas as classes declaradas nele',
      ],
      respostas: [0, 2],
      explicacao:
        'A ordem é fixa: no máximo um `package`, depois os imports, depois os tipos. Todas as classes do arquivo ficam no mesmo pacote, e só a classe `public` precisa bater com o nome do arquivo.',
      dica: 'Pense na ordem: no máximo um pacote, depois os imports, depois os tipos.',
    },
    {
      id: 'estagiario-t1-e02-q14',
      tipo: 'linha',
      dificuldade: 3,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `// Arquivo: Caixa.java
package banco;

import java.util.List;
import java.util.ArrayList;

public class Caixa {
    List<String> clientes = new ArrayList<>();
}

import java.util.Map;`,
      resposta: 11,
      explicacao:
        'O comentário antes do `package` é permitido. O problema é o `import` da última linha: depois que a primeira declaração de tipo aparece, não pode vir mais nenhum import.',
      dica: 'Leia o arquivo até a última linha: o que aparece depois do fim da classe?',
    },
    {
      id: 'estagiario-t1-e02-q15',
      tipo: 'escolha',
      dificuldade: 2,
      provas: ['831'],
      enunciado: 'No Java 25, qual é o resultado de compilar e executar?',
      codigo: `import module java.base;

public class Modulo {
    public static void main(String[] args) {
        List<String> nomes = List.of("Ana", "Bia");
        Path arquivo = Path.of("dados.txt");
        System.out.println(nomes.size() + " " + arquivo);
    }
}`,
      opcoes: [
        '`2 dados.txt`',
        'Não compila: `import module` só funciona dentro de `module-info.java`',
        'Não compila: `List` e `Path` precisam de imports próprios',
        'Compila, mas lança exceção porque `dados.txt` não existe',
      ],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao:
        'O Java 25 finalizou o import de módulo: `import module java.base;` traz todas as classes públicas dos pacotes exportados por `java.base`, incluindo `java.util.List` e `java.nio.file.Path`. Criar um `Path` não acessa o disco, então nada é lançado.',
      dica: 'O Java 25 trouxe um import que traz, de uma vez, todos os pacotes exportados por um módulo, como o `java.base`.',
    },
  ],
};

export default episodio;
