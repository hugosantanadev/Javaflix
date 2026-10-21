import type { EpisodioConteudo } from '../../types';
import aula from './e02.md?raw';

const episodio: EpisodioConteudo = {
  id: 'backend-junior-t1-e02',
  minutos: 14,
  aula,
  armadilhas: [
    'Uma branch é só um ponteiro para um commit: criá-la não copia arquivos.',
    'Num fast-forward não há commit de merge: o ponteiro só avança.',
    'O merge de três vias compara as duas pontas com o ancestral comum, e não uma ponta com a outra.',
    'Mudanças iguais nos dois lados não geram conflito; mudanças diferentes na mesma linha, sim.',
    'Depois de editar um conflito, é preciso `git add` e `git commit` para concluir o merge.',
    'Arquivos com marcadores `<<<<<<<` esquecidos compilam errado ou vão para produção quebrados: confira antes do commit.',
    '`git branch -d` recusa apagar uma branch não mesclada; `-D` força e pode perder commits.',
  ],
  recursos: [
    {
      titulo: 'Pro Git: Branches em Poucas Palavras',
      url: 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Branches-em-Poucas-Palavras',
      tipo: 'documentacao',
      porque: 'O que é uma branch por dentro, com os diagramas de ponteiros e o `HEAD`.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Ramificação e Mesclagem Básicas',
      url: 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Ramifica%c3%a7%c3%a3o-Branching-e-Mesclagem-Merging-B%c3%a1sicas',
      tipo: 'documentacao',
      porque: 'Fast-forward, merge de três vias e conflitos, num exemplo de hotfix.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git: Fluxos de Trabalho de Branches',
      url: 'https://git-scm.com/book/pt-br/v2/Ramifica%c3%a7%c3%a3o-Branching-no-Git-Fluxos-de-Trabalho-de-Branches-Branching-Workflows',
      tipo: 'documentacao',
      porque: 'Branches de longa duração e de tópico, como os times as organizam.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Documentação do git merge',
      url: 'https://git-scm.com/docs/git-merge',
      tipo: 'documentacao',
      porque: 'As opções de merge, a apresentação dos conflitos e o `--abort`.',
      gratuito: true,
      idioma: 'en',
      nivel: 'fundo',
    },
    {
      titulo: 'GitHub Docs: Resolver um conflito de merge usando a linha de comando',
      url: 'https://docs.github.com/pt/pull-requests/how-tos/merge-and-close-pull-requests/resolving-a-merge-conflict-using-the-command-line',
      tipo: 'documentacao',
      porque: 'O passo a passo da resolução, com os marcadores explicados.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Atlassian: Como resolver conflitos de mesclagem no Git',
      url: 'https://www.atlassian.com/br/git/tutorials/using-branches/merge-conflicts',
      tipo: 'artigo',
      porque: 'Tipos de conflito e as ferramentas para resolvê-los, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Learn Git Branching',
      url: 'https://learngitbranching.js.org/?locale=pt_BR',
      tipo: 'curso',
      porque: 'Exercícios interativos que desenham o grafo de branches a cada comando, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Gustavo Caetano: Git branch e git merge',
      url: 'https://www.youtube.com/watch?v=gcOhd8rvBOc',
      tipo: 'video',
      porque: 'Criando branches e mesclando, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Eddwan Hallen: Conflitos de merge sem medo',
      url: 'https://www.youtube.com/watch?v=H1ARqOxhcnI',
      tipo: 'video',
      porque: 'Como ler os marcadores e resolver um conflito, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Willian Justen: Resolvendo conflitos pela interface do VS Code',
      url: 'https://www.youtube.com/watch?v=anykEUKy51U',
      tipo: 'video',
      porque: 'A resolução visual, com as três versões lado a lado, em português.',
      gratuito: true,
      idioma: 'pt',
    },
    {
      titulo: 'Pro Git, 2ª edição (Scott Chacon e Ben Straub)',
      url: 'https://git-scm.com/book/pt-br/v2',
      tipo: 'livro',
      porque: 'O capítulo inteiro sobre branches, gratuito e em português.',
      gratuito: true,
      idioma: 'pt',
      onde: 'Cap. 3, "Branches no Git", seções 3.1 a 3.4; Cap. 7, "Ferramentas do Git", seção 7.8, "Merge Avançado"',
    },
  ],
  desafio: {
    titulo: 'Merge com relatório',
    enunciado:
      'Escreva um merge de três vias linha a linha, para arquivos com o mesmo número de linhas, que devolva as linhas mescladas e um relatório: quantos conflitos houve, quantas linhas vieram da outra branch e quantas mudanças da `main` foram mantidas. Uma linha alterada igualmente nos dois lados não é conflito. Use os arquivos: base `versao=1.0, frete=15, desconto=0, parcelas=3, moeda=BRL`; `main` `versao=1.1, frete=20, desconto=0, parcelas=6, moeda=BRL`; e `feature/promocao` `versao=1.1, frete=0, desconto=5, parcelas=3, moeda=USD`. A saída deve ser:\n\n```text\nversao=1.1\n<<<<<<< HEAD\nfrete=20\n=======\nfrete=0\n>>>>>>> feature/promocao\ndesconto=5\nparcelas=6\nmoeda=USD\nconflitos: 1, vindas da outra branch: 2, mantidas da main: 1\n```',
    dicas: [
      'Compare cada linha das duas versões entre si primeiro: se forem iguais, não importa o que a base dizia.',
      'Se só um lado difere da base, esse lado ganha.',
      'Um `record Resultado(List<String> linhas, int conflitos, int deles, int nossas)` organiza a resposta.',
    ],
    solucao: `import java.util.ArrayList;
import java.util.List;

public class Relatorio {
    record Resultado(List<String> linhas, int conflitos, int deles, int nossas) {}

    static Resultado mesclar(List<String> base, List<String> nossa, List<String> deles, String nomeDeles) {
        List<String> linhas = new ArrayList<>();
        int conflitos = 0, vieramDeles = 0, ficaramNossas = 0;
        for (int i = 0; i < base.size(); i++) {
            String b = base.get(i), n = nossa.get(i), d = deles.get(i);
            if (n.equals(d)) {
                linhas.add(n);
            } else if (n.equals(b)) {
                linhas.add(d);
                vieramDeles++;
            } else if (d.equals(b)) {
                linhas.add(n);
                ficaramNossas++;
            } else {
                linhas.addAll(List.of("<<<<<<< HEAD", n, "=======", d, ">>>>>>> " + nomeDeles));
                conflitos++;
            }
        }
        return new Resultado(linhas, conflitos, vieramDeles, ficaramNossas);
    }

    public static void main(String[] args) {
        List<String> base = List.of("versao=1.0", "frete=15", "desconto=0", "parcelas=3", "moeda=BRL");
        List<String> main = List.of("versao=1.1", "frete=20", "desconto=0", "parcelas=6", "moeda=BRL");
        List<String> outra = List.of("versao=1.1", "frete=0", "desconto=5", "parcelas=3", "moeda=USD");
        Resultado r = mesclar(base, main, outra, "feature/promocao");
        r.linhas().forEach(System.out::println);
        System.out.println("conflitos: " + r.conflitos() + ", vindas da outra branch: " + r.deles() + ", mantidas da main: " + r.nossas());
    }
}`,
    saida: 'versao=1.1\n<<<<<<< HEAD\nfrete=20\n=======\nfrete=0\n>>>>>>> feature/promocao\ndesconto=5\nparcelas=6\nmoeda=USD\nconflitos: 1, vindas da outra branch: 2, mantidas da main: 1',
    comentarios:
      'A versão subiu para 1.1 nos dois lados e não gerou conflito: o merge de três vias só se preocupa com mudanças **diferentes** da mesma linha. Sem a base, comparando só as duas pontas, seria impossível saber que o `desconto=5` veio de uma mudança e não de uma remoção do outro lado. O Git de verdade também lida com linhas inseridas e removidas, o que exige um algoritmo de diff, mas a regra de decisão é exatamente esta.',
  },
  exercicios: [
    {
      id: 'backend-junior-t1-e02-q01',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'O que é uma branch no Git?',
      opcoes: [
        'Um nome que aponta para um commit, e que avança a cada commit novo nela',
        'Uma cópia completa dos arquivos do projeto',
        'Um repositório separado no servidor',
        'Uma lista de arquivos alterados',
      ],
      resposta: 0,
      explicacao: 'Por ser só um ponteiro, criar e apagar branches é instantâneo e barato.',
    },
    {
      id: 'backend-junior-t1-e02-q02',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual comando cria a branch `feature/pix` e já passa para ela?',
      opcoes: ['`git switch -c feature/pix`', '`git branch feature/pix`', '`git merge feature/pix`', '`git switch feature/pix`'],
      resposta: 0,
      explicacao: '`git branch nome` só cria, sem trocar, e `git switch nome` só troca para uma branch que já existe. O antigo `git checkout -b` faz o mesmo que `switch -c`.',
    },
    {
      id: 'backend-junior-t1-e02-q03',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'A `main` não recebeu nenhum commit desde que `feature/login` foi criada, e a feature tem três commits. O que acontece em `git switch main` seguido de `git merge feature/login`?',
      opcoes: [
        'Um fast-forward: o ponteiro da `main` avança até o último commit da feature, sem commit de merge',
        'Um commit de merge com dois pais',
        'Um conflito em todos os arquivos',
        'Os três commits são juntados num só',
      ],
      resposta: 0,
      explicacao: 'Sem trabalho novo na `main`, não há nada a juntar. Para forçar um commit de merge mesmo assim, existe `git merge --no-ff`.',
    },
    {
      id: 'backend-junior-t1-e02-q04',
      tipo: 'multipla',
      dificuldade: 2,
      enunciado: 'Quais afirmações sobre o merge de três vias são verdadeiras? Escolha duas.',
      opcoes: [
        'Usa o ancestral comum das duas branches como referência',
        'Cria um commit de merge com dois pais',
        'Sempre gera conflito quando as duas branches alteraram o mesmo arquivo',
        'Apaga a branch mesclada',
        'Só funciona se a `main` não tiver commits novos',
      ],
      respostas: [0, 1],
      explicacao: 'Alterações em partes diferentes do mesmo arquivo se juntam sem conflito. Apagar a branch é um passo à parte, e sem commits novos na `main` o merge seria fast-forward.',
    },
    {
      id: 'backend-junior-t1-e02-q05',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Num conflito, o que está entre `<<<<<<< HEAD` e `=======`?',
      opcoes: [
        'A versão da branch em que você está',
        'A versão da branch que está sendo mesclada',
        'A versão do ancestral comum',
        'Um comentário gerado pelo Git',
      ],
      resposta: 0,
      explicacao: '`HEAD` é a branch atual. A outra versão fica entre `=======` e `>>>>>>> nome-da-branch`.',
    },
    {
      id: 'backend-junior-t1-e02-q06',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você editou o arquivo em conflito e removeu os marcadores. O que falta para concluir o merge?',
      opcoes: ['`git add arquivo` e depois `git commit`', 'Só `git commit`', '`git merge --continue-all`', 'Nada: o Git detecta sozinho'],
      resposta: 0,
      explicacao: 'O `git add` marca o conflito como resolvido. Enquanto houver arquivos em `UU`, o Git não deixa commitar.',
    },
    {
      id: 'backend-junior-t1-e02-q07',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'No meio de um merge cheio de conflitos, você percebe que mesclou a branch errada. Qual comando volta tudo ao estado anterior?',
      opcoes: ['`git merge --abort`', '`git restore .`', '`git branch -D main`', '`git commit --amend`'],
      resposta: 0,
      explicacao: 'O `--abort` desfaz o merge em andamento e devolve o diretório de trabalho ao estado de antes.',
    },
    {
      id: 'backend-junior-t1-e02-q08',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Qual é a saída?',
      codigo: `import java.util.*;

public class Teste {
    static String mesclar(String base, String nossa, String deles) {
        if (nossa.equals(deles)) return nossa;
        if (nossa.equals(base)) return deles;
        if (deles.equals(base)) return nossa;
        return "CONFLITO";
    }

    public static void main(String[] args) {
        System.out.println(mesclar("a", "a", "b") + " " + mesclar("a", "c", "a") + " " + mesclar("a", "d", "d") + " " + mesclar("a", "e", "f"));
    }
}`,
      opcoes: ['`b c d CONFLITO`', '`a a a a`', '`CONFLITO c d CONFLITO`', '`b c CONFLITO CONFLITO`'],
      resposta: 0,
      verificar: { tipo: 'saida' },
      explicacao: 'Se só um lado mudou, ele vence. Se os dois mudaram para o mesmo valor, não há conflito. Só mudanças diferentes nos dois lados precisam de decisão.',
    },
    {
      id: 'backend-junior-t1-e02-q09',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'O `git status --short` mostra `UU Pedido.java` durante um merge. O que isso indica?',
      opcoes: [
        'O arquivo tem um conflito ainda não resolvido',
        'O arquivo foi alterado nos dois lados e mesclado sem problemas',
        'O arquivo não é rastreado',
        'O arquivo foi apagado nos dois lados',
      ],
      resposta: 0,
      explicacao: '`U` vem de *unmerged*. Depois de editar e dar `git add`, ele passa a aparecer como modificado e preparado.',
    },
    {
      id: 'backend-junior-t1-e02-q10',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Por que criar uma branch no Git leva milissegundos, mesmo num projeto de 1 GB?',
      opcoes: [
        'Porque a branch é um arquivo pequeno com o hash de um commit, e nenhum arquivo do projeto é copiado',
        'Porque o Git cria a cópia em segundo plano',
        'Porque a branch fica no servidor',
        'Porque o Git compacta o projeto antes',
      ],
      resposta: 0,
      explicacao: 'O arquivo `.git/refs/heads/nome` guarda só 40 caracteres. Os objetos dos commits são compartilhados por todas as branches.',
    },
    {
      id: 'backend-junior-t1-e02-q11',
      tipo: 'escolha',
      dificuldade: 2,
      enunciado: 'Você tenta `git branch -d feature/teste` e o Git recusa, dizendo que a branch não foi totalmente mesclada. O que isso significa?',
      opcoes: [
        'A branch tem commits que não estão em nenhuma outra branch, e apagá-la os perderia',
        'A branch está corrompida',
        'Só o administrador pode apagar branches',
        'A branch ainda está no servidor',
      ],
      resposta: 0,
      explicacao: 'O `-d` protege trabalho não mesclado. Se você tem certeza de que pode descartá-lo, `-D` força a remoção.',
    },
    {
      id: 'backend-junior-t1-e02-q12',
      tipo: 'multipla',
      dificuldade: 1,
      enunciado: 'Quais práticas reduzem conflitos de merge num time? Escolha duas.',
      opcoes: [
        'Manter as branches curtas e integrar com a `main` com frequência',
        'Dividir o trabalho em mudanças pequenas e focadas',
        'Esperar a feature inteira ficar pronta, semanas depois, para mesclar',
        'Reformatar o projeto inteiro junto com cada feature',
        'Trabalhar sempre direto na `main`, sem branches',
      ],
      respostas: [0, 1],
      explicacao: 'Quanto mais tempo e mais código uma branch acumula, mais chances de alguém mexer nas mesmas linhas. Reformatações em massa tocam todas as linhas e geram conflitos com todo mundo.',
    },
    {
      id: 'backend-junior-t1-e02-q13',
      tipo: 'saida',
      dificuldade: 2,
      enunciado: 'Digite a saída exata.',
      codigo: `import java.util.*;

public class Teste {
    public static void main(String[] args) {
        List<String> base = List.of("x=1", "y=2", "z=3");
        List<String> nossa = List.of("x=1", "y=9", "z=3");
        List<String> deles = List.of("x=5", "y=2", "z=3");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < base.size(); i++) {
            String n = nossa.get(i), d = deles.get(i), b = base.get(i);
            sb.append(n.equals(d) ? n : n.equals(b) ? d : d.equals(b) ? n : "?").append(' ');
        }
        System.out.println(sb.toString().trim());
    }
}`,
      resposta: 'x=5 y=9 z=3',
      explicacao: 'Cada linha mudou em no máximo um lado, e a mudança vence. Não há conflito nenhum.',
    },
    {
      id: 'backend-junior-t1-e02-q14',
      tipo: 'escolha',
      dificuldade: 1,
      enunciado: 'Qual comando mostra o histórico de todas as branches como um desenho no terminal?',
      opcoes: ['`git log --oneline --graph --all`', '`git status --all`', '`git branch --graph`', '`git diff --all`'],
      resposta: 0,
      explicacao: 'O `--graph` desenha as linhas de cada branch, e o `--all` inclui todas, não só a atual.',
    },
    {
      id: 'backend-junior-t1-e02-q15',
      tipo: 'escolha',
      dificuldade: 3,
      enunciado: 'Dois colegas alteraram o mesmo arquivo `Pedido.java`, um no método `calcularFrete` e outro no método `aplicarDesconto`, em partes distantes do arquivo. O que acontece no merge?',
      opcoes: [
        'O Git junta as duas mudanças sozinho, sem conflito',
        'Sempre há conflito, porque é o mesmo arquivo',
        'Vence a mudança do commit mais recente',
        'O Git pede para escolher um dos dois arquivos inteiros',
      ],
      resposta: 0,
      explicacao: 'O merge trabalha por trechos de linhas, não por arquivo. Só há conflito quando os dois lados alteram as mesmas linhas, ou linhas vizinhas.',
    },
  ],
};

export default episodio;
