import type { EpisodioConteudo } from '../../types';
import aula from './e01.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t1-e01',
  minutos: 14,
  aula,
  armadilhas: [
    '`git add` não grava nada no histórico: só coloca a mudança na área de preparação. Quem grava é o `git commit`.',
    'No `git status --short`, a primeira coluna é a área de preparação e a segunda, o diretório de trabalho: ` M` ainda não foi preparado.',
    '`git diff` sem opções não mostra o que já foi preparado; para isso, `git diff --staged`.',
    '`git restore arquivo` descarta mudanças não commitadas sem volta.',
    '`git commit --amend` troca o último commit por outro: não use em commits que já foram enviados.',
    'Um arquivo já commitado continua rastreado depois de entrar no `.gitignore`; é preciso `git rm --cached`.',
    'Uma senha que chegou a ser commitada deve ser trocada, mesmo que o commit seja apagado.',
  ],
  recursos: [
    {
      titulo: 'Pro Git: Gravando Alterações no Repositório',
      url: 'https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Gravando-Altera%c3%a7%c3%b5es-no-Reposit%c3%b3rio',
      tipo: 'documentacao',
      porque: '`status`, `add`, `diff`, `commit` e `.gitignore`, no livro oficial do Git, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Desfazendo Coisas',
      url: 'https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Desfazendo-Coisas',
      tipo: 'documentacao',
      porque: '`--amend`, tirar arquivos da área de preparação e descartar mudanças.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Configuração inicial do Git',
      url: 'https://git-scm.com/book/pt-br/v2/Primeiros-Passos-Configura%c3%a7%c3%a3o-inicial-do-Git',
      tipo: 'documentacao',
      porque: 'Nome, e-mail, editor e os três níveis de configuração.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Objetos do Git',
      url: 'https://git-scm.com/book/pt-br/v2/Git-Internals-Por-Dentro-do-Git-Objetos-do-Git',
      tipo: 'documentacao',
      porque: 'Blobs, árvores e commits por dentro, com o cálculo do hash.',
      gratuito: true,
      idioma: 'pt',
      nivel: 'fundo',
    },
    {
      titulo: 'Documentação do git status',
      url: 'https://git-scm.com/docs/git-status',
      tipo: 'documentacao',
      porque: 'O significado de cada código do formato curto.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'Documentação do gitignore',
      url: 'https://git-scm.com/docs/gitignore',
      tipo: 'documentacao',
      porque: 'A sintaxe completa dos padrões, com negação e pastas.',
      gratuito: true,
      idioma: 'en',
    },
    {
      titulo: 'GitHub Docs: Ignorar arquivos',
      url: 'https://docs.github.com/pt/get-started/git-basics/ignoring-files',
      tipo: 'documentacao',
      porque: 'Os modelos de `.gitignore` por linguagem e o `.gitignore` global.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Conventional Commits 1.0.0',
      url: 'https://www.conventionalcommits.org/pt-br/v1.0.0/',
      tipo: 'artigo',
      porque: 'O padrão de mensagens de commit com tipos como `feat` e `fix`, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Full Stack Club: Curso de Git e GitHub para completos iniciantes',
      url: 'https://www.youtube.com/watch?v=Yp0RRTdtkqY',
      tipo: 'video',
      porque: 'Do primeiro commit ao GitHub, passo a passo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Hora de Codar: Aprenda Git em 30 minutos',
      url: 'https://www.youtube.com/watch?v=Zwv9qRyVeU4',
      tipo: 'video',
      porque: 'Os principais comandos do Git num só vídeo, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Curso em Vídeo: O que é Git e GitHub?',
      url: 'https://www.youtube.com/watch?v=GDGMf2bnHlE',
      tipo: 'video',
      porque: 'A ideia de controle de versão explicada sem pressa, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git, 2ª edição (Scott Chacon e Ben Straub)',
      url: 'https://git-scm.com/book/pt-br/v2',
      tipo: 'livro',
      porque: 'O livro de referência do Git, gratuito e traduzido para o português.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Cap. 2, "Fundamentos de Git", seções 2.1 a 2.4; Cap. 10, "Git Internals", seção 10.2, "Objetos do Git"',
    },
  ],
  desafio: {
    titulo: 'Recalculando um commit',
    enunciado:
      'O `git cat-file -p HEAD` de um repositório mostrou o commit abaixo, cujo hash é `f3a5aafcccda2a78a37d5a48701bc233d96d3e4b`. Escreva `static String hash(String tipo, String conteudo)`, que calcula o SHA-1 de `tipo + " " + tamanho + "\\0"` seguido do conteúdo em UTF-8, e confira que ele reproduz o hash do commit e o do blob `Loja Javaflix\\n`. Mostre também o que acontece com o hash ao trocar uma única letra da mensagem. O conteúdo do commit é:\n\n```text\ntree f33ecbdf7262f83187b175b9365f0c4b6a11ed1a\nparent 483e0d22485266b527433d2295247b2b1b80dc6d\nauthor Ana Lima <ana@exemplo.com> 1758031200 -0300\ncommitter Ana Lima <ana@exemplo.com> 1758031200 -0300\n\nAdiciona a classe App\n```\n\nA saída deve ser:\n\n```text\nblob do README: ef70a67cf975bb4bfe632a012955d98dee441bf7\ncommit: f3a5aafcccda2a78a37d5a48701bc233d96d3e4b\nabreviado: f3a5aaf\ncom uma letra trocada: a793f6d\n```',
    dicas: [
      'O tamanho no cabeçalho é em bytes, não em caracteres: use `getBytes(StandardCharsets.UTF_8).length`.',
      'Um text block preserva as quebras de linha, inclusive a linha em branco e a quebra final.',
      '`HexFormat.of().formatHex(bytes)`, do Java 17, converte o resultado do `MessageDigest` em texto.',
    ],
    solucao: `import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

public class HashCommit {
    static String hash(String tipo, String conteudo) throws Exception {
        byte[] dados = conteudo.getBytes(StandardCharsets.UTF_8);
        MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
        sha1.update((tipo + " " + dados.length + "\\0").getBytes(StandardCharsets.UTF_8));
        sha1.update(dados);
        return HexFormat.of().formatHex(sha1.digest());
    }

    public static void main(String[] args) throws Exception {
        String readme = hash("blob", "Loja Javaflix\\n");
        String commit = """
            tree f33ecbdf7262f83187b175b9365f0c4b6a11ed1a
            parent 483e0d22485266b527433d2295247b2b1b80dc6d
            author Ana Lima <ana@exemplo.com> 1758031200 -0300
            committer Ana Lima <ana@exemplo.com> 1758031200 -0300

            Adiciona a classe App
            """;
        System.out.println("blob do README: " + readme);
        String h = hash("commit", commit);
        System.out.println("commit: " + h);
        System.out.println("abreviado: " + h.substring(0, 7));
        String alterado = commit.replace("Adiciona a classe App", "Adiciona a classe app");
        System.out.println("com uma letra trocada: " + hash("commit", alterado).substring(0, 7));
    }
}`,
    saida: 'blob do README: ef70a67cf975bb4bfe632a012955d98dee441bf7\ncommit: f3a5aafcccda2a78a37d5a48701bc233d96d3e4b\nabreviado: f3a5aaf\ncom uma letra trocada: a793f6d',
    comentarios:
      'O hash do commit não é sorteado: é o SHA-1 do texto do próprio commit, que inclui o hash da árvore e o do commit pai. Trocar uma letra da mensagem dá um hash completamente diferente, e, como o próximo commit guarda este hash como `parent`, toda a cadeia seguinte mudaria também. É por isso que reescrever um commit antigo, assunto do episódio de rebase, sempre cria commits novos.',
  },
  exercicios: [
    {
      id: 'backend-junior-t1-e01-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que `git add README.md` faz?',
      opcoes: [
        'Coloca a versão atual do arquivo na área de preparação, para entrar no próximo commit',
        'Grava o arquivo no histórico do repositório',
        'Envia o arquivo para o GitHub',
        'Cria o arquivo `README.md`',
      ],
      resposta: 0,
      explicacao: 'O histórico só recebe a mudança no `git commit`, e o servidor, só no `git push`.',
    },
    {
      id: 'backend-junior-t1-e01-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O `git status --short` mostra a linha `?? Pedido.java`. O que isso significa?',
      opcoes: [
        'O arquivo existe, mas o Git ainda não o rastreia',
        'O arquivo tem um conflito',
        'O arquivo foi apagado',
        'O arquivo está pronto para o commit',
      ],
      resposta: 0,
      explicacao: '`??` indica um arquivo não rastreado. Depois de um `git add`, ele apareceria como `A `.',
    },
    {
      id: 'backend-junior-t1-e01-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a diferença entre ` M App.java` e `M  App.java` no `git status --short`?',
      opcoes: [
        'Com o espaço antes, a mudança ainda não foi preparada; com o `M` na primeira coluna, ela já está na área de preparação',
        'Nenhuma: é só formatação',
        '` M` é arquivo novo; `M ` é arquivo modificado',
        '` M` é uma mudança já commitada',
      ],
      resposta: 0,
      explicacao: 'A primeira coluna é a área de preparação e a segunda, o diretório de trabalho. `MM` significaria as duas coisas.',
    },
    {
      id: 'backend-junior-t1-e01-q04',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Num projeto Java com Maven, o que deve ir para o `.gitignore`? Escolha três.',
      opcoes: ['`target/`', '`*.class`', '`.env`', '`src/`', '`pom.xml`'],
      respostas: [0, 1, 2],
      explicacao: 'Saídas do build e arquivos com segredos ficam de fora. O código-fonte e o `pom.xml` são justamente o que precisa ser versionado.',
    },
    {
      id: 'backend-junior-t1-e01-q05',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você editou `App.java`, rodou `git add App.java` e depois editou de novo. O que `git diff` (sem opções) mostra?',
      opcoes: [
        'Só a segunda edição, que ainda não foi preparada',
        'As duas edições',
        'Só a primeira edição',
        'Nada, porque o arquivo já foi adicionado',
      ],
      resposta: 0,
      explicacao: '`git diff` compara o diretório de trabalho com a área de preparação. A primeira edição apareceria em `git diff --staged`.',
    },
    {
      id: 'backend-junior-t1-e01-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você preparou por engano um arquivo com senhas. Qual comando o tira da área de preparação sem apagar o arquivo?',
      opcoes: ['`git restore --staged .env`', '`git restore .env`', '`git rm .env`', '`git commit --amend`'],
      resposta: 0,
      explicacao: 'Sem `--staged`, o `restore` descartaria o conteúdo do arquivo; o `rm` o apagaria. Depois, acrescente o arquivo ao `.gitignore`.',
    },
    {
      id: 'backend-junior-t1-e01-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

public class Teste {
    static String hash(String conteudo) throws Exception {
        byte[] dados = conteudo.getBytes(StandardCharsets.UTF_8);
        MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
        sha1.update(("blob " + dados.length + "\\0").getBytes(StandardCharsets.UTF_8));
        sha1.update(dados);
        return HexFormat.of().formatHex(sha1.digest());
    }

    public static void main(String[] args) throws Exception {
        System.out.println(hash("a").equals(hash("a")) + " " + hash("a").equals(hash("a\\n")) + " " + hash("a").length());
    }
}`,
      opcoes: ['`true false 40`', '`true true 40`', '`false false 40`', '`true false 20`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'O mesmo conteúdo sempre dá o mesmo hash; um byte a mais, um hash diferente. O SHA-1 tem 20 bytes, que viram 40 dígitos hexadecimais.',
    },
    {
      id: 'backend-junior-t1-e01-q08',
      tipo: 'lacuna',
      dificuldade: 1,
      enunciado: 'Complete com o algoritmo de hash que o Git usa por padrão. O programa deve imprimir `40`.',
      codigo: `import java.security.MessageDigest;
import java.util.HexFormat;

public class Algoritmo {
    public static void main(String[] args) throws Exception {
        MessageDigest md = MessageDigest.getInstance("___");
        System.out.println(HexFormat.of().formatHex(md.digest("x".getBytes())).length());
    }
}`,
      respostas: ['SHA-1'],
      saida: '40',
      explicacao: 'O Git identifica objetos pelo SHA-1, de 160 bits. Versões recentes também aceitam repositórios com SHA-256, de 64 dígitos.',
    },
    {
      id: 'backend-junior-t1-e01-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você já enviou um commit para o servidor e percebeu um erro de digitação na mensagem. Por que não é uma boa ideia usar `git commit --amend` e enviar de novo?',
      opcoes: [
        'O `--amend` cria um commit novo, com outro hash, e quem já baixou o antigo terá um histórico diferente do seu',
        'O `--amend` apaga o repositório remoto',
        'O `--amend` só funciona antes do primeiro commit',
        'Não há problema nenhum',
      ],
      resposta: 0,
      explicacao: 'Reescrever um commit compartilhado obriga um envio forçado e bagunça o trabalho dos colegas. Um commit novo de correção é o caminho seguro.',
    },
    {
      id: 'backend-junior-t1-e01-q10',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'No terminal, qual é a diferença entre `echo oi > notas.txt` e `echo oi >> notas.txt`?',
      opcoes: [
        '`>` substitui o conteúdo do arquivo; `>>` acrescenta ao fim',
        '`>` acrescenta; `>>` substitui',
        '`>>` cria uma cópia do arquivo',
        'Nenhuma',
      ],
      resposta: 0,
      explicacao: 'Os dois criam o arquivo se ele não existir. A diferença está no que acontece com o conteúdo anterior.',
    },
    {
      id: 'backend-junior-t1-e01-q11',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais são tipos de objeto guardados na pasta `.git`? Escolha três.',
      opcoes: ['Blob', 'Árvore (tree)', 'Commit', 'Diff', 'Pull request'],
      respostas: [0, 1, 2],
      explicacao: 'O Git guarda fotografias completas, não diferenças: o `diff` é calculado na hora. Pull requests existem no GitHub, fora do Git.',
    },
    {
      id: 'backend-junior-t1-e01-q12',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual mensagem de commit segue as boas práticas?',
      opcoes: [
        '`fix: corrige arredondamento do desconto no carrinho`',
        '`ajustes`',
        '`Fiz várias mudanças no sistema hoje à tarde`',
        '`wip`',
      ],
      resposta: 0,
      explicacao: 'Uma linha curta, no imperativo, dizendo o que muda, com o tipo da mudança no padrão Conventional Commits.',
    },
    {
      id: 'backend-junior-t1-e01-q13',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Um `.env` com a senha do banco foi commitado e enviado ao GitHub. Logo depois, alguém o removeu com outro commit. O que ainda precisa ser feito?',
      opcoes: [
        'Trocar a senha: ela continua no histórico, acessível a quem tiver o repositório',
        'Nada: o arquivo já foi removido',
        'Só acrescentar `.env` ao `.gitignore`',
        'Renomear o arquivo',
      ],
      resposta: 0,
      explicacao: 'Commits antigos guardam o conteúdo para sempre, e qualquer clone tem uma cópia. A senha deve ser considerada vazada.',
    },
    {
      id: 'backend-junior-t1-e01-q14',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Por que o Git consegue guardar mil commits de um projeto em que um arquivo grande nunca mudou sem ocupar mil cópias dele?',
      opcoes: [
        'Porque o objeto é identificado pelo hash do conteúdo: o mesmo conteúdo vira o mesmo blob, guardado uma vez só',
        'Porque o Git comprime todos os arquivos num só',
        'Porque o Git só guarda arquivos `.java`',
        'Porque o Git guarda os arquivos no servidor, não na máquina',
      ],
      resposta: 0,
      explicacao: 'Cada commit aponta para árvores e blobs pelo hash. Conteúdo repetido aponta para o mesmo objeto.',
    },
    {
      id: 'backend-junior-t1-e01-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'O que um objeto commit guarda, segundo o `git cat-file -p`?',
      opcoes: [
        'O hash da árvore do projeto, o hash do commit pai, autor, quem commitou, datas e a mensagem',
        'Só as linhas alteradas em relação ao commit anterior',
        'Uma cópia compactada de todos os arquivos',
        'O nome da branch em que foi criado',
      ],
      resposta: 0,
      explicacao: 'O commit não guarda diferenças nem o nome da branch: aponta para uma árvore completa e para o pai, e as branches apontam para ele.',
    },
  ],
};

export default episodio;
