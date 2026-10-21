import type { EpisodioConteudo } from '../../types';
import aula from './e03.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t1-e03',
  minutos: 15,
  aula,
  armadilhas: [
    'O rebase não move commits: cria cópias com hashes novos e aponta a branch para elas.',
    'Rebase de commits que outras pessoas já baixaram quebra o histórico delas.',
    'Depois de um rebase numa branch já enviada, o push comum é recusado; use `--force-with-lease`, nunca `--force` puro.',
    'No conflito de um rebase, `HEAD` é a `main`, e o seu commit é o outro lado: o inverso do merge.',
    'Depois de resolver um conflito de rebase, o comando é `git rebase --continue`, e não `git commit`.',
    '`git reset --hard` descarta mudanças não commitadas sem volta, e nem o reflog as recupera.',
    'Para desfazer um commit que já está na `main` compartilhada, use `git revert`, que não reescreve o histórico.',
  ],
  recursos: [
    {
      titulo: 'Pro Git: Rebase',
      url: 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Rebase-Rebasing',
      tipo: 'documentacao',
      porque: 'O rebase com diagramas, o `--onto` e "os perigos do rebase", em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Reescrevendo o Histórico',
      url: 'https://git-scm.com/book/pt-br/v2/Ferramentas-do-Git-Reescrevendo-o-Hist%c3%b3rico',
      tipo: 'documentacao',
      porque: '`--amend` e o rebase interativo: reordenar, juntar, dividir e apagar commits.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Reset Desmistificado',
      url: 'https://git-scm.com/book/pt-br/v2/Ferramentas-do-Git-Reset-Desmistificado',
      tipo: 'documentacao',
      porque: 'As três árvores do Git e o que `--soft`, `--mixed` e `--hard` fazem com cada uma.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'GitHub Docs: Sobre a troca de base do Git',
      url: 'https://docs.github.com/pt/get-started/using-git/about-git-rebase',
      tipo: 'documentacao',
      porque: 'Os comandos do rebase interativo e o push forçado numa branch de pull request.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Documentação do git rebase',
      url: 'https://git-scm.com/docs/git-rebase',
      tipo: 'documentacao',
      porque: 'Todas as opções, inclusive `--autosquash`, `--onto` e `--update-refs`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'Atlassian: Merge x rebase',
      url: 'https://www.atlassian.com/br/git/tutorials/merging-vs-rebasing',
      tipo: 'artigo',
      porque: 'Quando usar cada um, a regra de ouro e um fluxo de trabalho com os dois.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Atlassian: git reflog',
      url: 'https://www.atlassian.com/br/git/tutorials/rewriting-history/git-reflog',
      tipo: 'artigo',
      porque: 'Como ler o reflog e recuperar commits depois de um reset ou rebase.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Manutenção e Recuperação de Dados',
      url: 'https://git-scm.com/book/pt-br/v2/Git-Internals-Por-Dentro-do-Git-Manuten%c3%a7%c3%a3o-e-Recupera%c3%a7%c3%a3o-de-Dados',
      tipo: 'documentacao',
      porque: 'O reflog, o `git gc` e como achar commits perdidos.',
      gratuito: true,
      idioma: 'pt',
      nivel: 'fundo',
    },
    {
      titulo: 'Código Fonte TV: Git Rebase, como e quando usar',
      url: 'https://www.youtube.com/watch?v=M4h5nieYBXQ',
      tipo: 'video',
      porque: 'O que o rebase faz e os cuidados para não estragar o histórico do time, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Alura: Como o rebase funciona?',
      url: 'https://www.youtube.com/watch?v=sowW5RgMjqA',
      tipo: 'video',
      porque: 'Uma explicação curta, com o histórico desenhado antes e depois, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Vamos Codar: Merge vs rebase, qual a diferença?',
      url: 'https://www.youtube.com/watch?v=Lxm5EA2WTMg',
      tipo: 'video',
      porque: 'Os dois lado a lado, no mesmo repositório, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Willian Justen: Juntando commits com squash',
      url: 'https://www.youtube.com/watch?v=UO2RFLAId7Y',
      tipo: 'video',
      porque: 'O rebase interativo na prática, juntando commits antes do pull request, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git, 2ª edição (Scott Chacon e Ben Straub)',
      url: 'https://git-scm.com/book/pt-br/v2',
      tipo: 'livro',
      porque: 'Rebase, reescrita de histórico e recuperação de dados, gratuito e em português.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Cap. 3, seção 3.6, "Rebase"; Cap. 7, seções 7.6, "Reescrevendo o Histórico", e 7.7, "Reset Desmistificado"; Cap. 10, seção 10.7',
    },
  ],
  desafio: {
    titulo: 'Autosquash',
    enunciado:
      'Escreva o método que monta a lista de tarefas do `git rebase -i --autosquash`. Ele recebe os commits do mais antigo ao mais novo e devolve uma linha por commit, no formato `acao hash mensagem`. Um commit cuja mensagem começa com `fixup! ` ou `squash! ` vai para logo depois do commit cuja mensagem é o resto do texto, com a ação `fixup` ou `squash`; vários ajustes do mesmo commit ficam na ordem em que foram criados. Se o commit alvo não estiver na lista, o ajuste fica onde está, como `pick`. Todos os outros são `pick`. Com os commits abaixo, a saída deve ser exatamente a que o Git produziu para o mesmo repositório:\n\n```text\n16aa98b Cria o carrinho\n15759cf Calcula o total\n2fd34ef fixup! Cria o carrinho\n6004b2b squash! Calcula o total\n96a054a Adiciona testes\n1e56aa1 fixup! Cria o carrinho\nc401a9d fixup! Ajusta o login\n```\n\n```text\npick 16aa98b Cria o carrinho\nfixup 2fd34ef fixup! Cria o carrinho\nfixup 1e56aa1 fixup! Cria o carrinho\npick 15759cf Calcula o total\nsquash 6004b2b squash! Calcula o total\npick 96a054a Adiciona testes\npick c401a9d fixup! Ajusta o login\n```',
    dicas: [
      'Pense em grupos: cada `pick` abre um grupo, e os ajustes entram no grupo do commit que corrigem.',
      'Um `Map` da mensagem para o grupo encontra o alvo de cada ajuste; uma `List` de grupos mantém a ordem original.',
      'O alvo vem depois do prefixo: `"fixup! ".length()` é 7, e `"squash! ".length()` é 8.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Autosquash {
    record Commit(String hash, String mensagem) {}

    static List<String> planejar(List<Commit> commits) {
        List<List<String>> grupos = new ArrayList<>();
        Map<String, List<String>> porMensagem = new HashMap<>();
        for (Commit c : commits) {
            String linha = c.hash() + " " + c.mensagem();
            String acao = c.mensagem().startsWith("fixup! ") ? "fixup"
                    : c.mensagem().startsWith("squash! ") ? "squash" : null;
            List<String> alvo = acao == null ? null : porMensagem.get(c.mensagem().substring(acao.length() + 2));
            if (alvo != null) {
                alvo.add(acao + " " + linha);
            } else {
                List<String> grupo = new ArrayList<>(List.of("pick " + linha));
                grupos.add(grupo);
                porMensagem.putIfAbsent(c.mensagem(), grupo);
            }
        }
        List<String> todo = new ArrayList<>();
        grupos.forEach(todo::addAll);
        return todo;
    }

    public static void main(String[] args) {
        List<Commit> commits = List.of(
                new Commit("16aa98b", "Cria o carrinho"),
                new Commit("15759cf", "Calcula o total"),
                new Commit("2fd34ef", "fixup! Cria o carrinho"),
                new Commit("6004b2b", "squash! Calcula o total"),
                new Commit("96a054a", "Adiciona testes"),
                new Commit("1e56aa1", "fixup! Cria o carrinho"),
                new Commit("c401a9d", "fixup! Ajusta o login"));
        planejar(commits).forEach(System.out::println);
    }
}`,
    saida: 'pick 16aa98b Cria o carrinho\nfixup 2fd34ef fixup! Cria o carrinho\nfixup 1e56aa1 fixup! Cria o carrinho\npick 15759cf Calcula o total\nsquash 6004b2b squash! Calcula o total\npick 96a054a Adiciona testes\npick c401a9d fixup! Ajusta o login',
    comentarios:
      'A lista de grupos preserva a ordem dos `pick`, e o mapa liga cada mensagem ao seu grupo; o `putIfAbsent` faz um ajuste ir para o **primeiro** commit com aquela mensagem, como o Git faz. O `fixup! Ajusta o login` não tem alvo na branch, e o Git o deixa como `pick` no mesmo lugar, o que é um bom lembrete: o autosquash só junta commits que estão no trecho que está sendo reaplicado. O Git de verdade também aceita como alvo o começo do hash e encadeamentos como `fixup! fixup! Cria o carrinho`, que ficam como exercício extra.',
  },
  exercicios: [
    {
      id: 'backend-junior-t1-e03-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que faz `git rebase main`, rodado dentro de `feature/cupom`?',
      opcoes: [
        'Reaplica os commits de `feature/cupom` em cima da ponta da `main`',
        'Traz os commits de `feature/cupom` para a `main`',
        'Apaga a `main` e a recria a partir da branch',
        'Cria um commit de merge entre as duas branches',
      ],
      resposta: 0,
      explicacao: 'O rebase muda a base da branch atual. A `main` não é alterada; para levá-la até a branch, ainda é preciso um merge, que vira fast-forward.',
    },
    {
      id: 'backend-junior-t1-e03-q02',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Depois de um rebase, os commits da branch têm o mesmo conteúdo e a mesma mensagem, mas hashes diferentes. Por quê?',
      opcoes: [
        'O hash inclui o commit pai e a data do committer, que mudaram',
        'O Git sorteia um hash novo a cada rebase',
        'O rebase compacta os arquivos de outro jeito',
        'O hash depende do nome da branch',
      ],
      resposta: 0,
      explicacao: 'O hash é o SHA-1 do texto do commit, que tem a árvore, o pai, o autor, o committer e a mensagem. Trocar o pai já basta, e a mudança se propaga para todos os commits seguintes.',
    },
    {
      id: 'backend-junior-t1-e03-q03',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre merge e rebase são verdadeiras? Escolha duas.',
      opcoes: [
        'O merge preserva os commits existentes; o rebase os substitui por cópias',
        'O rebase produz um histórico em linha reta',
        'O rebase é sempre mais seguro que o merge',
        'O merge reescreve o histórico da `main`',
        'Com rebase, nunca há conflitos',
      ],
      respostas: [0, 1],
      explicacao: 'O rebase é o que reescreve histórico, e por isso exige cuidado com branches compartilhadas. Conflitos existem nos dois, e no rebase podem aparecer em cada commit reaplicado.',
    },
    {
      id: 'backend-junior-t1-e03-q04',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Três pessoas trabalham direto na branch `release`, que está no servidor. Você faz rebase da `release` local e envia com `--force`. O que acontece?',
      opcoes: [
        'Os colegas ficam com commits que não existem mais no servidor, e o próximo pull deles duplica commits ou gera conflitos',
        'Nada: o Git sincroniza os colegas sozinho',
        'O servidor recusa qualquer `--force`',
        'Os commits dos colegas são reaplicados automaticamente',
      ],
      resposta: 0,
      explicacao: 'É a regra de ouro: não faça rebase de commits que outras pessoas já têm. Pior ainda, o `--force` pode apagar commits que alguém enviou depois do seu último pull.',
    },
    {
      id: 'backend-junior-t1-e03-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre `git push --force` e `git push --force-with-lease`?',
      opcoes: [
        'O `--force-with-lease` recusa o envio se a branch remota mudou desde a última vez que você a baixou',
        'O `--force-with-lease` só funciona no GitHub',
        'O `--force` é mais seguro porque pede confirmação',
        'Não há diferença',
      ],
      resposta: 0,
      explicacao: 'Assim, um commit que um colega enviou para a sua branch nesse meio-tempo não é apagado em silêncio.',
    },
    {
      id: 'backend-junior-t1-e03-q06',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Você tem dois commits locais, ainda não enviados, e um colega enviou um commit para a mesma branch. O que `git pull --rebase` faz?',
      opcoes: [
        'Baixa o commit do colega e reaplica os seus dois em cima dele, sem commit de merge',
        'Apaga o commit do colega',
        'Envia os seus commits primeiro',
        'Cria um commit "Merge branch \'main\'"',
      ],
      resposta: 0,
      explicacao: 'O `pull` comum faria um merge, com aquele commit de merge que não diz nada. Com `--rebase`, só os seus commits locais mudam, então a regra de ouro continua respeitada.',
    },
    {
      id: 'backend-junior-t1-e03-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No rebase interativo, qual ação junta o commit ao anterior e **descarta** a mensagem dele?',
      opcoes: ['`fixup`', '`squash`', '`reword`', '`drop`'],
      resposta: 0,
      explicacao: 'O `squash` também junta, mas combina as mensagens e abre o editor. O `drop` apaga o commit, mudanças e tudo.',
    },
    {
      id: 'backend-junior-t1-e03-q08',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais destas operações o `git rebase -i` permite? Escolha três.',
      opcoes: [
        'Mudar a ordem dos commits',
        'Trocar a mensagem de um commit antigo',
        'Juntar vários commits num só',
        'Desfazer um commit que já está na `main` de todos, sem reescrever o histórico',
        'Recuperar mudanças descartadas por `git reset --hard` antes de qualquer commit',
      ],
      respostas: [0, 1, 2],
      explicacao: 'Desfazer sem reescrever é papel do `git revert`. E mudanças que nunca foram commitadas não estão em lugar nenhum do Git para serem recuperadas.',
    },
    {
      id: 'backend-junior-t1-e03-q09',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Durante um `git rebase main`, aparece um conflito. O que está entre `<<<<<<< HEAD` e `=======`?',
      opcoes: [
        'A versão da `main`, mais os commits da branch já reaplicados',
        'A versão do seu commit que está sendo aplicado',
        'A versão do ancestral comum',
        'A versão do servidor',
      ],
      resposta: 0,
      explicacao: 'No rebase, o Git está "em cima" da `main` aplicando os seus commits, então o `HEAD` é a base nova e o seu commit é o outro lado. No merge é o inverso.',
    },
    {
      id: 'backend-junior-t1-e03-q10',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você resolveu o conflito de um rebase e deu `git add` no arquivo. Qual é o próximo comando?',
      opcoes: ['`git rebase --continue`', '`git commit -m "Resolve conflito"`', '`git merge --continue`', '`git rebase --skip`'],
      resposta: 0,
      explicacao: 'O `--continue` cria o commit reaplicado e segue para o próximo. O `--skip` jogaria fora o seu commit inteiro.',
    },
    {
      id: 'backend-junior-t1-e03-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um commit com defeito já está na `main` do time há dois dias. Qual é o jeito seguro de desfazê-lo?',
      opcoes: [
        '`git revert <hash>`, que cria um commit novo com as mudanças inversas',
        '`git reset --hard HEAD~1` e `git push --force`',
        '`git rebase -i` com `drop` e push forçado',
        '`git commit --amend`',
      ],
      resposta: 0,
      explicacao: 'O `revert` acrescenta história em vez de reescrevê-la, então ninguém do time é afetado. As outras opções reescrevem commits compartilhados.',
    },
    {
      id: 'backend-junior-t1-e03-q12',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você terminou um rebase interativo e percebeu que apagou um commit importante por engano. Como voltar?',
      opcoes: [
        'Achar no `git reflog` a posição de antes do rebase e rodar `git reset --hard` para ela, ou `git reset --hard ORIG_HEAD`',
        'Não há como: o commit foi apagado do disco',
        '`git rebase --abort`',
        '`git revert HEAD`',
      ],
      resposta: 0,
      explicacao: 'O commit original continua no banco de objetos, e o reflog guarda por onde o `HEAD` passou. O `--abort` só funciona com um rebase ainda em andamento.',
    },
    {
      id: 'backend-junior-t1-e03-q13',
      tipo: 'saida',
      dificuldade: 1,
      enunciado: 'O programa simula um rebase: os commits da branch, `C` e `D`, são reaplicados em cima da `main`, que ganhou o commit `M`. As cópias levam um apóstrofo. Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> main = new ArrayList<>(List.of("A", "B"));
        List<String> branch = List.of("C", "D");
        main.add("M");
        List<String> rebase = new ArrayList<>(main);
        for (String c : branch) rebase.add(c + "'");
        System.out.println(rebase);
    }
}`,
      resposta: "[A, B, M, C', D']",
      explicacao: "Os commits da branch vêm depois do `M`, em linha reta, e são cópias (`C'`, `D'`), não os originais.",
    },
    {
      id: 'backend-junior-t1-e03-q14',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O programa conta quantos commits o autosquash juntaria a outro. Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> msgs = List.of("Cria o carrinho", "fixup! Cria o carrinho", "Calcula o total",
                "squash! Calcula o total", "fixup! Ajusta o login");
        Set<String> vistos = new HashSet<>();
        int juntados = 0;
        for (String m : msgs) {
            String alvo = m.replaceFirst("^(fixup|squash)! ", "");
            if (!alvo.equals(m) && vistos.contains(alvo)) juntados++;
            else vistos.add(m);
        }
        System.out.println(juntados + " de " + msgs.size());
    }
}`,
      opcoes: ['`2 de 5`', '`3 de 5`', '`1 de 5`', '`0 de 5`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O `fixup!` e o `squash!` do carrinho e do total têm alvo na lista. O `fixup! Ajusta o login` não tem, e por isso continua como um commit separado.',
    },
    {
      id: 'backend-junior-t1-e03-q15',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você fez um commit local com a mensagem errada e quer refazê-lo, mantendo as mudanças já preparadas para o próximo commit. Qual comando?',
      opcoes: ['`git reset --soft HEAD~1`', '`git reset --hard HEAD~1`', '`git revert HEAD`', '`git restore .`'],
      resposta: 0,
      explicacao: 'O `--soft` só move a branch para trás, e as mudanças continuam na área de preparação. O `--hard` as descartaria. Para só trocar a mensagem, `git commit --amend` também resolve.',
    },
  ],
};

export default episodio;
