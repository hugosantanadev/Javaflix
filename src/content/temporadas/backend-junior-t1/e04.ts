import type { EpisodioConteudo } from '../../types';
import aula from './e04.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t1-e04',
  minutos: 15,
  aula,
  armadilhas: [
    '`origin/main` é a cópia local do servidor no último `fetch`: ela não se atualiza sozinha.',
    '`git fetch` não mexe nas suas branches; quem traz os commits para a branch atual é o `pull`, ou um merge depois do `fetch`.',
    'Push recusado com "fetch first" não se resolve com `--force`: integre o trabalho do outro com `git pull --rebase`.',
    'O GitHub não aceita a senha da conta no Git: use um token pelo HTTPS ou uma chave SSH.',
    'Tokens e chaves privadas no código são senhas vazadas, mesmo em repositório privado.',
    'Para ajustar um pull request, faça commits novos na mesma branch e envie: não abra outro pull request.',
    '`Closes #12` só fecha a issue quando o pull request é mesclado na branch padrão do repositório.',
  ],
  recursos: [
    {
      titulo: 'Pro Git: Trabalhando com Repositórios Remotos',
      url: 'https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Trabalhando-com-Reposit%c3%b3rios-Remotos',
      tipo: 'documentacao',
      porque: '`remote`, `fetch`, `pull` e `push`, com os nomes e endereços dos remotos.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Branches Remotos',
      url: 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Branches-Remotos-Remote-Branches',
      tipo: 'documentacao',
      porque: 'O que é `origin/main`, como as branches remotas avançam e o rastreamento com `-u`.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Contribuindo para um Projeto no GitHub',
      url: 'https://git-scm.com/book/pt-br/v2/GitHub-Contribuindo-para-um-Projeto',
      tipo: 'documentacao',
      porque: 'Fork, pull request, discussão e as referências `refs/pull`, com um exemplo completo.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Solicitações de pull',
      url: 'https://docs.github.com/pt/pull-requests/reference/pull-requests',
      tipo: 'documentacao',
      porque: 'Rascunhos, revisores, verificações e o ciclo de vida de um pull request.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Revisões de pull request',
      url: 'https://docs.github.com/pt/pull-requests/reference/pull-request-reviews',
      tipo: 'documentacao',
      porque: 'Comentar, aprovar e pedir mudanças, e as revisões obrigatórias.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Vincular uma pull request a um problema',
      url: 'https://docs.github.com/pt/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue',
      tipo: 'documentacao',
      porque: 'A lista de palavras-chave que fecham issues e a regra da branch padrão.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Sobre métodos de mesclagem',
      url: 'https://docs.github.com/pt/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github',
      tipo: 'documentacao',
      porque: 'Merge commit, squash e rebase: o que cada botão faz com o histórico.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Sobre branches protegidos',
      url: 'https://docs.github.com/pt/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches',
      tipo: 'documentacao',
      porque: 'Revisão obrigatória, verificações de status e bloqueio de push forçado.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Conectando-se ao GitHub com o SSH',
      url: 'https://docs.github.com/pt/authentication/connecting-to-github-with-ssh',
      tipo: 'documentacao',
      porque: 'Gerar a chave, cadastrá-la e testar a conexão, passo a passo.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Google Engineering Practices: Code Review',
      url: 'https://google.github.io/eng-practices/review/',
      tipo: 'artigo',
      porque: 'O guia de revisão do Google, para autores e revisores, com o critério de "melhorar a saúde do código".',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Filho da nuvem: Como criar seu primeiro pull request no GitHub',
      url: 'https://www.youtube.com/watch?v=Du04jBWrv4A',
      tipo: 'video',
      porque: 'Fork, branch, push e pull request num projeto real, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Waldemar Neto: Dicas para melhorar seus pull requests e code reviews',
      url: 'https://www.youtube.com/watch?v=3wr0G5jz7_o',
      tipo: 'video',
      porque: 'Tamanho, descrição e tom dos comentários, de quem revisa código todo dia, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Mayk Brito: Recebi um code review no GitHub, e agora?',
      url: 'https://www.youtube.com/watch?v=YKncSsTDR_4',
      tipo: 'video',
      porque: 'O lado de quem recebe a revisão: responder, ajustar e atualizar o pull request, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git, 2ª edição (Scott Chacon e Ben Straub)',
      url: 'https://git-scm.com/book/pt-br/v2',
      tipo: 'livro',
      porque: 'Remotos e o GitHub de ponta a ponta, gratuito e em português.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Cap. 2, seção 2.5, "Trabalhando com Repositórios Remotos"; Cap. 3, seção 3.5, "Branches Remotos"; Cap. 6, "GitHub", seções 6.1 a 6.3',
    },
  ],
  desafio: {
    titulo: 'Diff de revisão',
    enunciado:
      'A aba de arquivos de um pull request é um diff. Escreva um método que compare duas versões de um arquivo, linha a linha, e devolva o diff completo: cada linha que ficou igual começa com um espaço, cada removida com `-` e cada acrescentada com `+`, com as remoções antes das inclusões quando uma linha é trocada. Use a maior subsequência comum (LCS) para decidir o que ficou igual. Depois do diff, imprima o resumo no formato do `git diff --stat`, com singular e plural corretos. Com o `Frete.java` abaixo, antes e depois de ganhar o frete grátis para clientes premium, a saída deve ser a mesma que o `git diff` mostra, com o arquivo inteiro:\n\n```text\n public class Frete {\n-    static double calcular(double peso) {\n+    static double calcular(double peso, boolean premium) {\n+        if (premium) return 0;\n         if (peso > 10) return 30;\n         return 15;\n     }\n }\n2 insertions(+), 1 deletion(-)\n```',
    dicas: [
      'Monte a tabela `lcs[i][j]` de trás para a frente: o tamanho da maior subsequência comum entre `antes` a partir de `i` e `depois` a partir de `j`.',
      'Depois, ande do começo: linhas iguais saem com espaço; senão, remova de `antes` se isso não diminuir a LCS, ou acrescente de `depois`.',
      'Preferir a remoção no empate é o que coloca o `-` antes do `+`, como o Git faz.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class DiffRevisao {
    static List<String> diff(List<String> antes, List<String> depois) {
        int n = antes.size(), m = depois.size();
        int[][] lcs = new int[n + 1][m + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                lcs[i][j] = antes.get(i).equals(depois.get(j))
                        ? lcs[i + 1][j + 1] + 1
                        : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
            }
        }
        List<String> linhas = new ArrayList<>();
        int i = 0, j = 0;
        while (i < n || j < m) {
            if (i < n && j < m && antes.get(i).equals(depois.get(j))) {
                linhas.add(" " + antes.get(i++));
                j++;
            } else if (j == m || (i < n && lcs[i + 1][j] >= lcs[i][j + 1])) {
                linhas.add("-" + antes.get(i++));
            } else {
                linhas.add("+" + depois.get(j++));
            }
        }
        return linhas;
    }

    static String resumo(List<String> linhas) {
        long mais = linhas.stream().filter(l -> l.startsWith("+")).count();
        long menos = linhas.stream().filter(l -> l.startsWith("-")).count();
        return mais + (mais == 1 ? " insertion(+), " : " insertions(+), ")
                + menos + (menos == 1 ? " deletion(-)" : " deletions(-)");
    }

    public static void main(String[] args) {
        List<String> antes = List.of(
                "public class Frete {",
                "    static double calcular(double peso) {",
                "        if (peso > 10) return 30;",
                "        return 15;",
                "    }",
                "}");
        List<String> depois = List.of(
                "public class Frete {",
                "    static double calcular(double peso, boolean premium) {",
                "        if (premium) return 0;",
                "        if (peso > 10) return 30;",
                "        return 15;",
                "    }",
                "}");
        List<String> linhas = diff(antes, depois);
        linhas.forEach(System.out::println);
        System.out.println(resumo(linhas));
    }
}`,
    saida: ' public class Frete {\n-    static double calcular(double peso) {\n+    static double calcular(double peso, boolean premium) {\n+        if (premium) return 0;\n         if (peso > 10) return 30;\n         return 15;\n     }\n }\n2 insertions(+), 1 deletion(-)',
    comentarios:
      'A LCS encontra o maior conjunto de linhas que pode ficar no lugar; tudo o que sobra é remoção ou inclusão. A tabela custa `n × m` de memória, o que basta para arquivos de código, mas o Git usa o algoritmo de Myers, que acha o diff mínimo sem a tabela inteira, e mostra só três linhas de contexto em volta de cada trecho alterado, nos blocos que começam com `@@`. Num pull request grande, cada linha deste diff é uma linha que alguém precisa ler: é o argumento mais concreto para manter os pull requests pequenos.',
  },
  exercicios: [
    {
      id: 'backend-junior-t1-e04-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é `origin/main`?',
      opcoes: [
        'A cópia local de onde a `main` do servidor estava no último contato com ele',
        'A `main` do servidor, sempre atualizada em tempo real',
        'Uma branch que você criou com esse nome',
        'O primeiro commit do repositório',
      ],
      resposta: 0,
      explicacao: 'As branches remotas só avançam com `fetch`, `pull` ou `push`. Por isso, o `git status` pode dizer que você está atualizado quando o servidor já tem commits novos.',
    },
    {
      id: 'backend-junior-t1-e04-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual é a diferença entre `git fetch` e `git pull`?',
      opcoes: [
        'O `fetch` só baixa e atualiza as branches remotas; o `pull` baixa e integra na branch atual',
        'O `fetch` envia commits; o `pull` recebe',
        'São sinônimos',
        'O `pull` só funciona no GitHub',
      ],
      resposta: 0,
      explicacao: 'O `pull` é um `fetch` seguido de merge, ou de rebase com `--rebase`. O `fetch` é seguro a qualquer momento, porque não toca no seu trabalho.',
    },
    {
      id: 'backend-junior-t1-e04-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Seu `git push` é recusado com `! [rejected] main -> main (fetch first)`. O que fazer?',
      opcoes: [
        '`git pull --rebase` para integrar os commits do servidor, e então `git push` de novo',
        '`git push --force`',
        'Apagar o repositório local e clonar de novo',
        'Esperar alguns minutos e tentar de novo',
      ],
      resposta: 0,
      explicacao: 'O servidor tem commits que você não tem. O `--force` os apagaria; integrá-los primeiro mantém o trabalho de todos.',
    },
    {
      id: 'backend-junior-t1-e04-q04',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que o `-u` faz em `git push -u origin feature/frete`?',
      opcoes: [
        'Liga a branch local à remota, para os próximos `push` e `pull` saberem o destino',
        'Atualiza o Git para a versão mais nova',
        'Envia só os arquivos não rastreados',
        'Desfaz o último push',
      ],
      resposta: 0,
      explicacao: 'É o `--set-upstream`. Depois dele, o `git status` também passa a comparar a branch com a remota.',
    },
    {
      id: 'backend-junior-t1-e04-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Como autenticar no GitHub para fazer `git push`?',
      opcoes: [
        'Com um token de acesso pelo HTTPS, ou com uma chave SSH',
        'Com a senha da conta, digitada a cada push',
        'Com o e-mail da conta, configurado em `user.email`',
        'Não precisa: repositórios públicos aceitam push de qualquer pessoa',
      ],
      resposta: 0,
      explicacao: 'A senha da conta deixou de valer para o Git em 2021. O `user.email` só identifica o autor dos commits, não autentica nada.',
    },
    {
      id: 'backend-junior-t1-e04-q06',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais destes nunca devem ir para um commit? Escolha dois.',
      opcoes: [
        'Um token de acesso ao GitHub',
        'A chave SSH privada, sem o `.pub`',
        'O arquivo `README.md`',
        'O `.gitignore`',
        'O `CODEOWNERS`',
      ],
      respostas: [0, 1],
      explicacao: 'Token e chave privada são credenciais. A chave **pública** pode ser compartilhada, e é ela que se cadastra no GitHub.',
    },
    {
      id: 'backend-junior-t1-e04-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O revisor pediu duas mudanças no seu pull request. Como entregá-las?',
      opcoes: [
        'Fazer commits na mesma branch e dar `git push`: o pull request se atualiza sozinho',
        'Fechar o pull request e abrir outro',
        'Mandar o código corrigido nos comentários',
        'Commitar direto na `main`',
      ],
      resposta: 0,
      explicacao: 'O pull request aponta para a branch, não para commits fixos. Cada push novo aparece no pull request, e o revisor vê só o que mudou desde a última revisão.',
    },
    {
      id: 'backend-junior-t1-e04-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você quer contribuir com um projeto de código aberto em que não tem permissão de escrita. Qual é o caminho?',
      opcoes: [
        'Fazer um fork, trabalhar numa branch dele e abrir o pull request do fork para o original',
        'Clonar o original e dar push direto na `main` dele',
        'Pedir a senha de um dos mantenedores',
        'Mandar o código por e-mail como anexo',
      ],
      resposta: 0,
      explicacao: 'O fork é uma cópia na sua conta, onde você pode enviar à vontade. Um remoto `upstream` apontando para o original ajuda a manter o fork atualizado.',
    },
    {
      id: 'backend-junior-t1-e04-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;
import java.util.regex.*;

public class Teste {
    public static void main(String[] args) {
        Pattern p = Pattern.compile("(?i)(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?):? +#([0-9]+)");
        Matcher m = p.matcher("Fixes #3, CLOSES #4 e resolve #5. Ver #6.");
        List<String> issues = new ArrayList<>();
        while (m.find()) issues.add(m.group(1));
        System.out.println(issues);
    }
}`,
      opcoes: ['`[3, 4, 5]`', '`[3, 4, 5, 6]`', '`[3]`', '`[]`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `(?i)` ignora maiúsculas, e `fix(?:e[sd])?` aceita `fix`, `fixes` e `fixed`. O `#6` só vem depois de "Ver", que não é palavra de fechamento.',
    },
    {
      id: 'backend-junior-t1-e04-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'A descrição do seu pull request tem `Closes #12`, mas ele foi mesclado na branch `develop`, e a padrão do repositório é a `main`. O que acontece com a issue 12?',
      opcoes: [
        'Continua aberta: as palavras de fechamento só valem para pull requests na branch padrão',
        'É fechada, como sempre',
        'É apagada',
        'O merge é bloqueado',
      ],
      resposta: 0,
      explicacao: 'O GitHub ignora as palavras-chave quando o destino não é a branch padrão. Em times com `develop`, a issue costuma ser fechada à mão, ou quando a `develop` chega na `main`.',
    },
    {
      id: 'backend-junior-t1-e04-q11',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais atitudes ajudam a ter o seu pull request revisado bem e rápido? Escolha duas.',
      opcoes: [
        'Manter o pull request pequeno e focado num assunto',
        'Revisar o próprio diff antes de pedir revisão',
        'Juntar três features e uma reformatação num pull request só',
        'Deixar a descrição vazia, porque o código fala por si',
        'Ignorar os comentários com que você não concorda',
      ],
      respostas: [0, 1],
      explicacao: 'Pull requests pequenos são lidos de verdade. Discordar de um comentário é válido, mas respondendo com argumentos, não ignorando.',
    },
    {
      id: 'backend-junior-t1-e04-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num code review, o que indica um comentário que começa com `nit:`?',
      opcoes: [
        'Um detalhe, que o revisor sugere mas não considera bloqueante',
        'Um defeito grave, que impede o merge',
        'Uma pergunta sobre segurança',
        'Um comentário automático do CI',
      ],
      resposta: 0,
      explicacao: 'Vem de *nitpick*, "implicância". Separar o essencial do detalhe ajuda o autor a priorizar.',
    },
    {
      id: 'backend-junior-t1-e04-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Uma branch com 8 commits, entre eles "wip" e "corrige teste", é integrada com **Squash and merge**. O que aparece na `main`?',
      opcoes: [
        'Um único commit novo com todas as mudanças da branch',
        'Os 8 commits, mais um commit de merge',
        'Os 8 commits em linha reta',
        'Só o último commit da branch',
      ],
      resposta: 0,
      explicacao: 'Por isso o squash é popular: cada pull request vira um commit na `main`, e o histórico da branch fica no próprio pull request.',
    },
    {
      id: 'backend-junior-t1-e04-q14',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'O programa conta as linhas acrescentadas e removidas de um diff. Digite a saída exata.',
      codigo: `public class Teste {
    public static void main(String[] args) {
        String diff = """
                 public class Pedido {
                -    double total;
                +    BigDecimal total;
                +    String cupom;
                     int itens;
                +    boolean pago;
                 }
                """;
        long mais = diff.lines().filter(l -> l.startsWith("+")).count();
        long menos = diff.lines().filter(l -> l.startsWith("-")).count();
        System.out.println("+" + mais + " -" + menos);
    }
}`,
      resposta: '+3 -1',
      explicacao: 'A troca do tipo de `total` aparece como uma remoção e uma inclusão. As linhas que começam com espaço são contexto, e não contam.',
    },
    {
      id: 'backend-junior-t1-e04-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O repositório tem `/src/pagamento/  @empresa/time-pagamentos` no `CODEOWNERS`, e a `main` é protegida exigindo a aprovação dos donos do código. Você abre um pull request que altera um arquivo em `src/pagamento`. O que acontece?',
      opcoes: [
        'O time de pagamentos é chamado para revisar, e o merge exige a aprovação de alguém dele',
        'Qualquer pessoa pode aprovar',
        'O pull request é recusado automaticamente',
        'O arquivo é movido para outra pasta',
      ],
      resposta: 0,
      explicacao: 'O `CODEOWNERS` define os revisores de cada parte do código, e a proteção da branch transforma a revisão deles em requisito para o merge.',
    },
  ],
};

export default episodio;
