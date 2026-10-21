import type { Exercicio } from '../../types';

/** Prova da temporada Backend Júnior T1: ferramentas do dia a dia. */
const prova: Exercicio[] = [
  {
    id: 'backend-junior-t1-prova-q01',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O `git status --short` mostra `AM App.java`. O que isso significa?',
    opcoes: [
      'O arquivo é novo e foi preparado com `git add`, mas foi modificado de novo depois disso',
      'O arquivo foi apagado e recriado',
      'O arquivo tem um conflito de merge',
      'O arquivo foi commitado e enviado ao servidor',
    ],
    resposta: 0,
    explicacao: 'A primeira coluna é a área de preparação (`A`, novo e preparado) e a segunda, o diretório de trabalho (`M`, modificado). Um `git add` de novo levaria a versão atual para o próximo commit.',
  },
  {
    id: 'backend-junior-t1-prova-q02',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O arquivo `.env`, com senhas, foi commitado semana passada. Hoje você o acrescentou ao `.gitignore`, mas ele continua aparecendo como modificado. O que está acontecendo, e o que mais precisa ser feito?',
    opcoes: [
      'Arquivos já rastreados ignoram o `.gitignore`: é preciso `git rm --cached .env`, e as senhas devem ser trocadas, porque continuam no histórico',
      'O `.gitignore` só vale depois de reiniciar o terminal',
      'Basta rodar `git restore .env`',
      'O `.gitignore` precisa estar dentro da pasta `.git`',
    ],
    resposta: 0,
    explicacao: 'O `.gitignore` só impede que arquivos não rastreados entrem. Tirar o arquivo do índice resolve daqui para a frente, mas os commits antigos ainda guardam as senhas.',
  },
  {
    id: 'backend-junior-t1-prova-q03',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O programa calcula o hash de blob do Git para o conteúdo de três arquivos: `config.txt`, `copia.txt` e `outro.txt`. Qual é a saída?',
    codigo: `import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;

public class Teste {
    static String hash(String conteudo) throws Exception {
        byte[] dados = conteudo.getBytes(StandardCharsets.UTF_8);
        MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
        sha1.update(("blob " + dados.length + "\\0").getBytes(StandardCharsets.UTF_8));
        sha1.update(dados);
        return HexFormat.of().formatHex(sha1.digest());
    }

    public static void main(String[] args) throws Exception {
        Map<String, String> arquivos = new LinkedHashMap<>();
        arquivos.put("config.txt", "frete=15\\n");
        arquivos.put("copia.txt", "frete=15\\n");
        arquivos.put("outro.txt", "frete=20\\n");
        Set<String> blobs = new HashSet<>();
        for (String conteudo : arquivos.values()) blobs.add(hash(conteudo));
        System.out.println(blobs.size());
    }
}`,
    opcoes: ['`2`', '`3`', '`1`', '`6`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O nome do arquivo não entra no hash do blob, só o conteúdo. Os dois arquivos iguais viram um único objeto, e é a árvore que guarda os nomes.',
  },
  {
    id: 'backend-junior-t1-prova-q04',
    tipo: 'escolha',
    dificuldade: 1,
    enunciado: 'Você deu `git add` em `Pedido.java` por engano e quer tirá-lo do próximo commit, **sem perder** as mudanças feitas nele. Qual comando?',
    opcoes: ['`git restore --staged Pedido.java`', '`git restore Pedido.java`', '`git rm Pedido.java`', '`git reset --hard`'],
    resposta: 0,
    explicacao: 'O `--staged` mexe só na área de preparação. Sem ele, o `restore` descartaria as mudanças do arquivo, sem volta.',
  },
  {
    id: 'backend-junior-t1-prova-q05',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'A `main` não andou desde que `feature/frete` foi criada. Qual é o efeito de `git merge --no-ff feature/frete`?',
    opcoes: [
      'Cria um commit de merge, mesmo que um fast-forward fosse possível',
      'Recusa o merge, porque ele seria fast-forward',
      'Faz o fast-forward normalmente',
      'Junta todos os commits da branch num só',
    ],
    resposta: 0,
    explicacao: 'O `--no-ff` preserva no histórico o registro de que existiu uma branch. Juntar tudo num commit é o `--squash`.',
  },
  {
    id: 'backend-junior-t1-prova-q06',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O método aplica a regra do merge de três vias a cada linha. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    static String mesclar(String base, String nossa, String deles) {
        if (nossa.equals(deles)) return nossa;
        if (nossa.equals(base)) return deles;
        if (deles.equals(base)) return nossa;
        return "CONFLITO";
    }

    public static void main(String[] args) {
        List<String> base = List.of("x=1", "y=2", "z=3");
        List<String> nossa = List.of("x=1", "y=7", "z=9");
        List<String> deles = List.of("x=4", "y=2", "z=9");
        StringJoiner sj = new StringJoiner(" ");
        for (int i = 0; i < base.size(); i++) sj.add(mesclar(base.get(i), nossa.get(i), deles.get(i)));
        System.out.println(sj);
    }
}`,
    opcoes: ['`x=4 y=7 z=9`', '`x=1 y=2 z=3`', '`CONFLITO y=7 CONFLITO`', '`x=4 CONFLITO z=9`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'O `x` e o `y` mudaram cada um num lado só, e a mudança vence. O `z` mudou nos dois lados para o mesmo valor, o que não é conflito.',
  },
  {
    id: 'backend-junior-t1-prova-q07',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Um merge gerou conflitos em três arquivos. Você resolveu dois, deu `git add` neles e rodou `git commit`. O que acontece?',
    opcoes: [
      'O Git recusa o commit, porque ainda há um arquivo com conflito não resolvido',
      'O commit é criado com o terceiro arquivo do jeito que estava antes do merge',
      'O commit é criado com os marcadores de conflito no terceiro arquivo',
      'O merge é desfeito automaticamente',
    ],
    resposta: 0,
    explicacao: 'Enquanto houver arquivos em `UU`, o merge não pode ser concluído. Resolva o terceiro, dê `git add` nele e commite, ou desista com `git merge --abort`.',
  },
  {
    id: 'backend-junior-t1-prova-q08',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a diferença entre `git branch -d teste` e `git branch -D teste`?',
    opcoes: [
      'O `-d` recusa apagar uma branch com commits não mesclados; o `-D` apaga mesmo assim',
      'O `-d` apaga só a branch local; o `-D`, também a do servidor',
      'O `-D` apaga também os arquivos do diretório de trabalho',
      'Não há diferença',
    ],
    resposta: 0,
    explicacao: 'O `-D` é o `-d --force`. Para apagar a branch no servidor, o comando é `git push origin --delete teste`.',
  },
  {
    id: 'backend-junior-t1-prova-q09',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Em qual destas situações fazer rebase é seguro?',
    opcoes: [
      'Na sua branch de feature, ainda não compartilhada, para atualizá-la com a `main`',
      'Na `main` compartilhada, para deixar o histórico em linha reta',
      'Na branch `release`, em que três pessoas commitam',
      'Em commits que já foram para produção e estão marcados com tags',
    ],
    resposta: 0,
    explicacao: 'O rebase troca commits por cópias. Só é seguro quando ninguém mais tem os originais.',
  },
  {
    id: 'backend-junior-t1-prova-q10',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'A branch tem os commits `A`, `B` e `C`, nessa ordem, e você faz `git rebase main` depois que a `main` ganhou um commit novo. Quantos desses três commits ficam com hash diferente?',
    opcoes: ['Os três', 'Só o `A`, cujo pai mudou', 'Nenhum: o conteúdo é o mesmo', 'Só o `C`, o mais recente'],
    resposta: 0,
    explicacao: 'O `A` ganha um pai novo, o que muda o hash dele. Como o `B` guarda o hash do `A` como pai, também muda, e o mesmo vale para o `C`, em cascata.',
  },
  {
    id: 'backend-junior-t1-prova-q11',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'No meio de um rebase, um commit seu dá conflito, e você percebe que a mudança dele já não faz sentido, porque a `main` resolveu o problema de outro jeito. Qual comando?',
    opcoes: ['`git rebase --skip`', '`git rebase --continue`', '`git rebase --abort`', '`git commit --amend`'],
    resposta: 0,
    explicacao: 'O `--skip` descarta só o commit atual e segue com os próximos. O `--abort` desistiria do rebase inteiro.',
  },
  {
    id: 'backend-junior-t1-prova-q12',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Você rodou `git reset --hard HEAD~2` na sua branch local e percebeu que os dois commits apagados eram importantes. O que fazer?',
    opcoes: [
      'Procurar o hash anterior no `git reflog` e rodar `git reset --hard` para ele',
      'Nada: commits apagados com `reset --hard` não podem ser recuperados',
      '`git revert HEAD~2`',
      '`git merge --abort`',
    ],
    resposta: 0,
    explicacao: 'Os commits continuam no banco de objetos, e o reflog guarda a posição anterior do `HEAD`. O que o `--hard` destrói de verdade são mudanças nunca commitadas.',
  },
  {
    id: 'backend-junior-t1-prova-q13',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Depois de um `git fetch`, o `git status` diz "Your branch is behind \'origin/main\' by 2 commits, and can be fast-forwarded". O que isso indica?',
    opcoes: [
      'O servidor tem dois commits que a sua `main` ainda não tem, e um `git pull` os traz sem conflito',
      'Você tem dois commits que ainda não enviou',
      'O seu repositório está corrompido',
      'O `fetch` falhou',
    ],
    resposta: 0,
    explicacao: 'O `fetch` atualizou o `origin/main`, mas não a sua `main`. Como você não tem commits próprios, a integração é um fast-forward.',
  },
  {
    id: 'backend-junior-t1-prova-q14',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Você fez rebase da sua branch de pull request e rodou `git push --force-with-lease`, mas o push foi recusado. Qual é a causa mais provável?',
    opcoes: [
      'Alguém enviou um commit para a branch depois do seu último `fetch`, e o push o apagaria',
      'O `--force-with-lease` não funciona depois de um rebase',
      'O GitHub não aceita push em branches de pull request',
      'O rebase não alterou nada',
    ],
    resposta: 0,
    explicacao: 'É exatamente a proteção do `--force-with-lease`. Baixe o commit novo, reaplique o seu trabalho sobre ele e envie de novo.',
  },
  {
    id: 'backend-junior-t1-prova-q15',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'O seu fork está atrasado em relação ao repositório original, configurado como o remoto `upstream`. Como trazer as novidades para a sua `main`?',
    opcoes: [
      '`git fetch upstream` e depois `git merge upstream/main` na sua `main`',
      '`git push upstream main`',
      '`git clone` do original por cima do fork',
      '`git fetch origin`',
    ],
    resposta: 0,
    explicacao: 'O `fetch upstream` baixa os commits do original para `upstream/main`, e o merge, ou um rebase, os integra. Depois, um `git push` atualiza o fork no GitHub.',
  },
  {
    id: 'backend-junior-t1-prova-q16',
    tipo: 'multipla',
    dificuldade: 2,
    enunciado: 'Quais destes comentários de code review são bons exemplos? Escolha dois.',
    opcoes: [
      '"Se a lista de itens vier vazia, o `get(0)` lança exceção. Vale tratar esse caso ou validar antes?"',
      '"nit: `calc` ficaria mais claro como `calcularFrete`."',
      '"Isso está errado."',
      '"Eu faria tudo diferente."',
      '"Aprovado." num pull request de 3.000 linhas lido em dois minutos',
    ],
    respostas: [0, 1],
    explicacao: 'Bons comentários apontam o problema, explicam o porquê e deixam claro o que é bloqueante e o que é detalhe.',
  },
  {
    id: 'backend-junior-t1-prova-q17',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'Qual é a diferença entre `mvn package` e `mvn install`?',
    opcoes: [
      'O `install` faz tudo o que o `package` faz e ainda copia o JAR para o repositório local `~/.m2`',
      'O `install` baixa o Maven; o `package`, as dependências',
      'O `package` envia o JAR para o Maven Central',
      'O `install` pula os testes',
    ],
    resposta: 0,
    explicacao: 'Com o JAR no `~/.m2`, outros projetos da mesma máquina podem declará-lo como dependência. Publicar num repositório remoto é o `deploy`.',
  },
  {
    id: 'backend-junior-t1-prova-q18',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'Uma aplicação roda num servidor que já traz a API de Servlet. O código precisa dela para compilar, mas o JAR não deve levá-la. Qual escopo do Maven, e qual configuração do Gradle?',
    opcoes: [
      '`provided` no Maven e `compileOnly` no Gradle',
      '`runtime` no Maven e `runtimeOnly` no Gradle',
      '`compile` no Maven e `implementation` no Gradle',
      '`test` no Maven e `testImplementation` no Gradle',
    ],
    resposta: 0,
    explicacao: 'Os dois significam "disponível para compilar, fornecido pelo ambiente na execução". O `runtime` seria o oposto: só em execução.',
  },
  {
    id: 'backend-junior-t1-prova-q19',
    tipo: 'escolha',
    dificuldade: 3,
    enunciado: 'O programa aplica a regra do Maven a um grafo em que `a:1` e `b:1` estão na mesma profundidade e pedem versões diferentes de `log`. Qual é a saída?',
    codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        Map<String, List<String>> poms = Map.of(
                "app", List.of("a:1", "b:1"),
                "a:1", List.of("log:2"),
                "b:1", List.of("log:3"),
                "log:2", List.of(),
                "log:3", List.of());
        Map<String, String> escolhidas = new LinkedHashMap<>();
        Deque<String> fila = new ArrayDeque<>(poms.get("app"));
        while (!fila.isEmpty()) {
            String dep = fila.poll();
            String[] p = dep.split(":");
            if (escolhidas.putIfAbsent(p[0], p[1]) == null) fila.addAll(poms.get(dep));
        }
        System.out.println("log:" + escolhidas.get("log"));
    }
}`,
    opcoes: ['`log:2`', '`log:3`', '`log:null`', '`log:2,3`'],
    resposta: 0,
    verificar: { tipo: 'saida' },
    explicacao: 'As duas versões estão na profundidade 2. No empate, vence a que aparece primeiro, e `a:1` foi declarada antes de `b:1`. Trocar a ordem das dependências no `pom.xml` mudaria o resultado.',
  },
  {
    id: 'backend-junior-t1-prova-q20',
    tipo: 'escolha',
    dificuldade: 2,
    enunciado: 'No mesmo grafo da questão anterior, `app` depende de `a:1` e `b:1`, que pedem `log:2` e `log:3`. Qual versão de `log` o Gradle escolhe, com a configuração padrão?',
    opcoes: ['`log:3`', '`log:2`', 'As duas', 'Nenhuma: o build falha'],
    resposta: 0,
    explicacao: 'O Gradle resolve conflitos pela versão mais alta, sem olhar a profundidade nem a ordem. O `gradle dependencies` mostraria `log:2 -> 3`.',
  },
];

export default prova;
