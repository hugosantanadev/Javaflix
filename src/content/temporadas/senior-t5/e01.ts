import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'senior-t5-e01',
  minutos: 15,
  aula,
  armadilhas: [
    'No `Locale`, o idioma é minúsculo e o país maiúsculo: `pt_BR`. Na *language tag*, o separador é hífen: `pt-BR`.',
    '`Locale.forLanguageTag("pt_BR")` não lança exceção: devolve um `Locale` vazio, porque o sublinhado não vale numa tag.',
    'Não existe `Locale.BRAZIL`; `Locale.FRENCH` é só o idioma, e `Locale.FRANCE` é `fr_FR`.',
    '`Locale.of` só existe a partir do Java 19; no 17, use os construtores, `forLanguageTag` ou o `Builder`.',
    'O `Locale` padrão entra na escolha do bundle, entre o idioma pedido e o bundle base.',
    'As chaves ausentes são buscadas nos pais do bundle escolhido, nunca nos bundles do `Locale` padrão.',
    'Chave ou bundle inexistente: `MissingResourceException`.',
    'Com o mesmo nome, um bundle em classe (`ListResourceBundle`) tem preferência sobre o `.properties`.',
  ],
  recursos: [
    {
      titulo: 'The Java Tutorials: Creating a Locale',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/locale/create.html',
      tipo: 'documentacao',
      porque: 'As formas de criar um `Locale` e as constantes disponíveis.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: About the ResourceBundle Class',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/resbundle/concept.html',
      tipo: 'documentacao',
      porque: 'A família de bundles e a ordem de busca por candidatos.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'The Java Tutorials: Backing a ResourceBundle with Properties Files',
      url: 'https://docs.oracle.com/javase/tutorial/i18n/resbundle/propfile.html',
      tipo: 'documentacao',
      porque: 'Bundles em arquivos `.properties`, com o exemplo clássico de fallback.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Oracle: Internationalization Overview (Java 21)',
      url: 'https://docs.oracle.com/en/java/javase/21/intl/internationalization-overview.html',
      tipo: 'documentacao',
      porque: 'O guia atual de internacionalização do JDK, com os provedores de dados de localidade.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Javadoc de java.util.ResourceBundle',
      url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ResourceBundle.html',
      tipo: 'documentacao',
      porque: 'A especificação exata da lista de candidatos e da cadeia de pais.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'JEP 252: Use CLDR Locale Data by Default',
      url: 'https://openjdk.org/jeps/252',
      tipo: 'documentacao',
      porque: 'A troca, no Java 9, da fonte dos formatos de cada país para o CLDR do Unicode.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'JEP 226: UTF-8 Property Resource Bundles',
      url: 'https://openjdk.org/jeps/226',
      tipo: 'documentacao',
      porque: 'Por que os `.properties` de bundles passaram a ser lidos em UTF-8 no Java 9.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Baeldung: A Guide to the ResourceBundle',
      url: 'https://www.baeldung.com/java-resourcebundle',
      tipo: 'artigo',
      porque: 'Bundles em arquivos e em classes, com a busca por candidatos demonstrada.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Baeldung: Internationalization and Localization in Java',
      url: 'https://www.baeldung.com/java-8-localization',
      tipo: 'artigo',
      porque: 'Uma visão geral de `Locale`, números, datas e mensagens localizadas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Loiane Groner: Curso de Java #90, Locale (Internacionalização)',
      url: 'https://www.youtube.com/watch?v=eLjZ_L7FA4s',
      tipo: 'video',
      porque: 'Criando e usando `Locale`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'DevDojo: Classes Utilitárias, ResourceBundle',
      url: 'https://www.youtube.com/watch?v=M28gEhYT--o',
      tipo: 'video',
      porque: 'Textos em vários idiomas com arquivos `.properties`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Dr. Seán Kennedy: Java Resource Bundle Searching Tutorial',
      url: 'https://www.youtube.com/watch?v=YqrfcvdelK4',
      tipo: 'video',
      porque: 'A ordem de busca dos bundles no estilo das questões de certificação.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'OCP Oracle Certified Professional Java SE 17/21 Developer Study Guide (Boyarsky e Selikoff)',
      url: 'https://www.selikoff.net/',
      tipo: 'livro',
      porque: 'A escolha de bundles com `Locale` padrão, cobrada em quase toda prova.',
      gratuito: false,
      idioma: 'en',
      onde: 'Cap. 11, "Exceptions and Localization": seções "Supporting Internationalization and Localization" e "Loading Properties with Resource Bundles"',
    },
  ],
  desafio: {
    titulo: 'Loja em vários idiomas',
    enunciado:
      'Crie os bundles da loja como classes `ListResourceBundle` aninhadas: o base `Textos` (`saudacao=Hello!`, `carrinho=Cart`, `sair=Exit`), `Textos_pt` (`Olá!`, `Carrinho`, `Sair`), `Textos_pt_BR` (só `saudacao=E aí!`) e `Textos_es` (`¡Hola!`, `Carrito`). Com o `Locale` padrão em `en_US`, mostre, para `pt-BR`, `pt-PT`, `es-MX` e `fr-FR`, qual bundle foi escolhido e os três textos. A saída deve ser:\n\n```text\npt_BR -> pt_BR: E aí! | Carrinho | Sair\npt_PT -> pt: Olá! | Carrinho | Sair\nes_MX -> es: ¡Hola! | Carrito | Exit\nfr_FR -> (base): Hello! | Cart | Exit\n```',
    dicas: [
      'As classes precisam ser `public static`, e o nome base é o nome completo da classe base: `Textos.class.getName()`.',
      'O `getLocale()` do bundle escolhido diz de onde ele veio; o do base é `Locale.ROOT`.',
      'Para `fr-FR`, não há francês, e o padrão `en_US` também não tem bundle: sobra o base.',
    ],
    solucao: `import java.util.List;
import java.util.ListResourceBundle;
import java.util.Locale;
import java.util.ResourceBundle;

public class Loja {
    public static class Textos extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"saudacao", "Hello!"}, {"carrinho", "Cart"}, {"sair", "Exit"}};
        }
    }

    public static class Textos_pt extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"saudacao", "Olá!"}, {"carrinho", "Carrinho"}, {"sair", "Sair"}};
        }
    }

    public static class Textos_pt_BR extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"saudacao", "E aí!"}};
        }
    }

    public static class Textos_es extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"saudacao", "¡Hola!"}, {"carrinho", "Carrito"}};
        }
    }

    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        for (String tag : List.of("pt-BR", "pt-PT", "es-MX", "fr-FR")) {
            Locale pedido = Locale.forLanguageTag(tag);
            ResourceBundle textos = ResourceBundle.getBundle(Textos.class.getName(), pedido);
            String escolhido = textos.getLocale().equals(Locale.ROOT) ? "(base)" : textos.getLocale().toString();
            System.out.println(pedido + " -> " + escolhido + ": " + textos.getString("saudacao") + " | " + textos.getString("carrinho") + " | " + textos.getString("sair"));
        }
    }
}`,
    saida: 'pt_BR -> pt_BR: E aí! | Carrinho | Sair\npt_PT -> pt: Olá! | Carrinho | Sair\nes_MX -> es: ¡Hola! | Carrito | Exit\nfr_FR -> (base): Hello! | Cart | Exit',
    comentarios:
      'O espanhol mostra a herança de chaves: `Textos_es` não tem `sair`, e o texto vem do base, em inglês. Para um usuário de verdade, isso seria um defeito: todo bundle de idioma precisa ter todas as chaves, e ferramentas de tradução conferem isso. Com o padrão em `pt_BR`, em vez de `en_US`, o pedido em francês cairia no `Textos_pt_BR` e mostraria "E aí!", o que costuma surpreender em servidores configurados num idioma diferente do dos clientes.',
  },
  exercicios: [
    {
      id: 'senior-t5-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Locale.forLanguageTag("en-GB") + " " + Locale.FRANCE.getLanguage() + " " + Locale.FRANCE.getCountry());
    }
}`,
      opcoes: ['`en_GB fr FR`', '`en-GB fr FR`', '`en_GB FR fr`', '`en_gb fr fr`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `toString` usa sublinhado. O idioma é guardado em minúsculas e o país em maiúsculas.',
    },
    {
      id: 'senior-t5-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println(Locale.FRENCH + " " + Locale.FRANCE + " " + Locale.GERMAN + " " + Locale.GERMANY);
    }
}`,
      opcoes: ['`fr fr_FR de de_DE`', '`fr_FR fr_FR de_DE de_DE`', '`FRENCH FRANCE GERMAN GERMANY`', '`fr FR de DE`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'As constantes com nome de idioma só têm o idioma; as com nome de país têm idioma e país.',
    },
    {
      id: 'senior-t5-e01-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'No Java 17, quais expressões produzem o `Locale` `pt_BR`? Escolha três.',
      opcoes: [
        '`Locale.forLanguageTag("pt-BR")`',
        '`new Locale("pt", "BR")`',
        '`new Locale.Builder().setLanguage("pt").setRegion("BR").build()`',
        '`Locale.BRAZIL`',
        '`Locale.forLanguageTag("pt_BR")`',
        '`Locale.of("pt", "BR")`',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Não há constante para o Brasil, a tag não aceita sublinhado, e `Locale.of` só chegou no Java 19.',
    },
    {
      id: 'senior-t5-e01-q04',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        System.out.println("[" + Locale.forLanguageTag("pt_BR") + "] [" + Locale.forLanguageTag("es-ar") + "]");
    }
}`,
      resposta: '[] [es_AR]',
      explicacao: 'Com sublinhado, a tag é inválida e o resultado é o `Locale` vazio, sem exceção. Com hífen, o país é normalizado para maiúsculas.',
    },
    {
      id: 'senior-t5-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Existem `loja.properties`, `loja_fr.properties` e `loja_en.properties`. O `Locale` padrão é `en_US`. Qual bundle `ResourceBundle.getBundle("loja", Locale.CANADA_FRENCH)` escolhe? (`CANADA_FRENCH` é `fr_CA`.)',
      opcoes: ['`loja_fr.properties`', '`loja_en.properties`', '`loja.properties`', 'Lança `MissingResourceException`'],
      resposta: 0,
      explicacao: 'Não há `loja_fr_CA`, e o próximo candidato é só o idioma pedido, `loja_fr`. O padrão só entraria se nenhum francês existisse.',
    },
    {
      id: 'senior-t5-e01-q06',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Existem `loja.properties` e `loja_en.properties`. O `Locale` padrão é `en_US`. Qual bundle `ResourceBundle.getBundle("loja", Locale.GERMANY)` escolhe?',
      opcoes: ['`loja_en.properties`', '`loja.properties`', 'Lança `MissingResourceException`', '`loja_de.properties`, criado vazio'],
      resposta: 0,
      explicacao: 'Sem `loja_de_DE` nem `loja_de`, os candidatos seguintes vêm do padrão: `loja_en_US`, que não existe, e `loja_en`, que existe. Só depois viria o base.',
    },
    {
      id: 'senior-t5-e01-q07',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O bundle escolhido é `loja_pt_BR`, que não tem a chave `sair`. Existem também `loja_pt` (sem `sair`), `loja_en_US` (com `sair=Exit`) e `loja` (com `sair=Leave`). O padrão é `en_US`. O que `getString("sair")` devolve?',
      opcoes: ['`Leave`', '`Exit`', '`null`', 'Lança `MissingResourceException`'],
      resposta: 0,
      explicacao: 'A busca de chaves segue os pais do bundle escolhido: `pt_BR`, `pt` e o base. O `loja_en_US`, do `Locale` padrão, não é pai do `pt_BR`.',
    },
    {
      id: 'senior-t5-e01-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.*;

public class Teste {
    public static class Textos extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"titulo", "Javaflix"}};
        }
    }

    public static void main(String[] args) {
        ResourceBundle rb = ResourceBundle.getBundle(Textos.class.getName(), Locale.US);
        System.out.println(rb.getString("titulo"));
        System.out.println(rb.getString("subtitulo"));
    }
}`,
      opcoes: [
        'Imprime `Javaflix` e lança `MissingResourceException`',
        'Imprime `Javaflix` e `null`',
        'Imprime `Javaflix` e uma linha vazia',
        'Lança `MissingResourceException` antes de imprimir',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'MissingResourceException', saida: 'Javaflix' },
      explicacao: 'Uma chave que não existe em nenhum bundle da cadeia não devolve `null`: lança `MissingResourceException`, uma exceção unchecked.',
    },
    {
      id: 'senior-t5-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é o resultado de executar?',
      codigo: `import java.util.ResourceBundle;

public class Teste {
    public static void main(String[] args) {
        System.out.println("carregando");
        ResourceBundle rb = ResourceBundle.getBundle("textos.inexistentes");
        System.out.println(rb.getLocale());
    }
}`,
      opcoes: [
        'Imprime `carregando` e lança `MissingResourceException`',
        'Imprime `carregando` e uma linha vazia',
        'Imprime `carregando` e lança `FileNotFoundException`',
        'Não compila: falta o `Locale`',
      ],
      resposta: 0,
      verificar: { tipo: 'excecao', nome: 'MissingResourceException', saida: 'carregando' },
      explicacao: 'Sem nenhum candidato, nem o base, `getBundle` lança `MissingResourceException`. A versão sem `Locale` usa o padrão.',
    },
    {
      id: 'senior-t5-e01-q10',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o método estático que carrega um resource bundle. O programa deve imprimir `Javaflix`.',
      codigo: `import java.util.*;

public class Carregar {
    public static class Textos extends ListResourceBundle {
        protected Object[][] getContents() {
            return new Object[][] {{"titulo", "Javaflix"}};
        }
    }

    public static void main(String[] args) {
        ResourceBundle rb = ResourceBundle.___(Textos.class.getName(), Locale.US);
        System.out.println(rb.getString("titulo"));
    }
}`,
      respostas: ['getBundle'],
      saida: 'Javaflix',
      explicacao: '`ResourceBundle.getBundle(nomeBase, locale)` aplica a busca por candidatos e devolve o bundle escolhido.',
    },
    {
      id: 'senior-t5-e01-q11',
      tipo: 'linha',
      dificuldade: 1,
      enunciado: 'Clique na linha que impede o código de compilar.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Locale br = Locale.forLanguageTag("pt-BR");
        ResourceBundle rb = new ResourceBundle("loja", br);
        System.out.println(rb.getString("titulo"));
    }
}`,
      resposta: 6,
      explicacao: '`ResourceBundle` é abstrata e não tem esse construtor. Bundles são obtidos com `ResourceBundle.getBundle`.',
    },
    {
      id: 'senior-t5-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        Locale br = Locale.forLanguageTag("pt-BR");
        System.out.println(Locale.GERMANY.getDisplayLanguage(br) + " " + Locale.forLanguageTag("ja").getDisplayLanguage(Locale.US));
    }
}`,
      opcoes: ['`alemão Japanese`', '`German Japanese`', '`de ja`', '`Deutsch 日本語`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O argumento diz em que idioma o nome deve ser escrito: o alemão em português, o japonês em inglês.',
    },
    {
      id: 'senior-t5-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um projeto tem o arquivo `Mensagens_pt.properties` e também uma classe `Mensagens_pt` que estende `ListResourceBundle`, com o mesmo nome base. Qual é usada para o idioma `pt`?',
      opcoes: [
        'A classe, que tem preferência sobre o arquivo',
        'O arquivo, que tem preferência sobre a classe',
        'Os dois, mesclados',
        'Nenhum: o conflito lança `MissingResourceException`',
      ],
      resposta: 0,
      explicacao: 'Para cada candidato, o `ResourceBundle.Control` tenta primeiro uma classe com aquele nome e só depois um arquivo `.properties`.',
    },
    {
      id: 'senior-t5-e01-q14',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o `Locale` padrão são verdadeiras? Escolha duas.',
      opcoes: [
        'Vem da configuração do sistema operacional, e pode ser trocado com `Locale.setDefault`',
        'Formatações de números e datas sem `Locale` explícito o usam',
        'É sempre `en_US`, em qualquer máquina',
        'Só é usado por `ResourceBundle`',
        'Não pode ser alterado depois que o programa começa',
      ],
      respostas: [0, 1],
      explicacao: 'O padrão muda de máquina para máquina, e por isso código que precisa de uma saída fixa sempre informa o `Locale`.',
    },
    {
      id: 'senior-t5-e01-q15',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'No Java 21, qual é a saída?',
      provas: ['830', '831'],
      codigo: `import java.util.Locale;

public class Teste {
    public static void main(String[] args) {
        Locale a = Locale.of("pt", "BR");
        System.out.println(a + " " + a.equals(Locale.forLanguageTag("pt-BR")));
    }
}`,
      opcoes: ['`pt_BR true`', '`pt_BR false`', 'Não compila: `Locale.of` não existe', '`pt-BR true`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: '`Locale.of`, do Java 19, substitui os construtores obsoletos e produz o mesmo `Locale` que a tag `pt-BR`.',
    },
  ],
};

export default episodio;
