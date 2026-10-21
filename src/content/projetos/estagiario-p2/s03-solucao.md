Rodando com a mesma turma:

```java executar
import java.util.Locale;
import java.util.Scanner;

public class Boletim {
    static final int PROVAS = 4;
    static final Locale BR = Locale.of("pt", "BR"); //> Formata números com vírgula, do jeito brasileiro.

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        StringBuilder texto = new StringBuilder();
        while (entrada.hasNextLine()) {
            String linha = entrada.nextLine().strip();
            if (linha.isEmpty()) break;
            texto.append(linha).append('\n');
        }
        if (texto.isEmpty()) {
            System.out.println("Nenhum aluno informado.");
            return;
        }
        String[] linhas = texto.toString().split("\n");

        String[] nomes = new String[linhas.length];
        double[][] notas = new double[linhas.length][PROVAS];
        int n = 0;
        for (int i = 0; i < linhas.length; i++) {
            String[] campos = linhas[i].split(";");
            if (campos.length != PROVAS + 1) {
                System.out.println("Linha " + (i + 1) + " ignorada: esperava o nome e " + PROVAS + " notas.");
                continue;
            }
            boolean valida = true;
            for (int p = 0; p < PROVAS; p++) {
                String campo = campos[p + 1].strip().replace(',', '.');
                if (!ehNota(campo)) {
                    valida = false;
                    break;
                }
                notas[n][p] = Double.parseDouble(campo);
            }
            if (!valida) {
                System.out.println("Linha " + (i + 1) + " ignorada: nota que não é um número de 0 a 10.");
                continue;
            }
            nomes[n] = campos[0].strip();
            n++;
        }
        System.out.println(n + " alunos lidos.");
        System.out.println();

        double[] medias = new double[n];
        for (int a = 0; a < n; a++) {
            double soma = 0;
            for (int p = 0; p < PROVAS; p++) soma += notas[a][p];
            medias[a] = Math.round(soma / PROVAS * 10) / 10.0;
        }

        System.out.println("""
                BOLETIM DO 3º BIMESTRE, 2º ANO B
                Aluno                     P1    P2    P3    P4  Média  Situação"""); //> Text block: o cabeçalho fica no código como aparece na tela.
        for (int a = 0; a < n; a++) {
            StringBuilder linha = new StringBuilder(String.format("%-22s", encurtar(nomes[a], 22))); //> %-22s: 22 colunas, alinhado à esquerda.
            for (int p = 0; p < PROVAS; p++) linha.append(String.format(BR, "%6.1f", notas[a][p])); //> %6.1f: 6 colunas, uma casa, alinhado à direita.
            linha.append(String.format(BR, "%7.1f  %s", medias[a], situacao(medias[a])));
            System.out.println(linha);
        }
    }

    static boolean ehNota(String s) {
        if (s.isEmpty() || s.startsWith(".") || s.endsWith(".")) return false;
        int pontos = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '.') pontos++;
            else if (c < '0' || c > '9') return false;
        }
        return pontos <= 1 && Double.parseDouble(s) <= 10;
    }

    static String situacao(double media) {
        if (media >= 7) return "Aprovado";
        if (media >= 5) return "Recuperação";
        return "Reprovado";
    }

    static String encurtar(String nome, int largura) {
        return nome.length() <= largura ? nome : nome.substring(0, largura - 3) + "...";
    }
}
```

```entrada
Ana Souza;7,5;8;9;6,5
Bruno Lima;5;4,5;6;5,5
Carla Dias;9,5;10;9;9,5
Diego Rocha;3;4;2,5;5
Joana Prado;8;7;9
Elisa Martins;6,5;7;7,5;7
Fábio Nunes;8;6;7;6,5
Gabriela Torres de Albuquerque;10;9,5;9;8,5
Kaique Melo;7;oito;6;5
Heitor Alves;4;6;5;5,5
Igor Campos;7;6,8;7;7
```

```saida
Linha 5 ignorada: esperava o nome e 4 notas.
Linha 9 ignorada: nota que não é um número de 0 a 10.
9 alunos lidos.

BOLETIM DO 3º BIMESTRE, 2º ANO B
Aluno                     P1    P2    P3    P4  Média  Situação
Ana Souza                7,5   8,0   9,0   6,5    7,8  Aprovado
Bruno Lima               5,0   4,5   6,0   5,5    5,3  Recuperação
Carla Dias               9,5  10,0   9,0   9,5    9,5  Aprovado
Diego Rocha              3,0   4,0   2,5   5,0    3,6  Reprovado
Elisa Martins            6,5   7,0   7,5   7,0    7,0  Aprovado
Fábio Nunes              8,0   6,0   7,0   6,5    6,9  Recuperação
Gabriela Torres de ...  10,0   9,5   9,0   8,5    9,3  Aprovado
Heitor Alves             4,0   6,0   5,0   5,5    5,1  Recuperação
Igor Campos              7,0   6,8   7,0   7,0    7,0  Aprovado
```

**Por que assim:**

- O idioma vira uma constante, `BR`, usada em toda formatação de número. Assim o boletim sai igual no seu computador e num servidor configurado em inglês.
- O text block deixa o cabeçalho no código do jeito que ele aparece na tela. As aspas de fechamento grudadas no fim da última linha evitam uma quebra de linha extra.
- `encurtar` corta em 19 caracteres e soma `...`, fechando exatamente as 22 colunas. Um nome cortado ainda desalinharia se o corte e o `%-22s` usassem larguras diferentes; por isso as duas usam o mesmo 22.
- O `StringBuilder` monta a linha em pedaços, um `append` por coluna. Com `+`, a expressão ficaria longa demais para ler.
