Rodando com a mesma turma:

```java executar
import java.util.Arrays;
import java.util.Locale;
import java.util.Scanner;

public class Boletim {
    static final int PROVAS = 4;
    static final Locale BR = Locale.of("pt", "BR");

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
                Aluno                     P1    P2    P3    P4  Média  Situação""");
        for (int a = 0; a < n; a++) {
            StringBuilder linha = new StringBuilder(String.format("%-22s", encurtar(nomes[a], 22)));
            for (int p = 0; p < PROVAS; p++) linha.append(String.format(BR, "%6.1f", notas[a][p]));
            linha.append(String.format(BR, "%7.1f  %s", medias[a], situacao(medias[a])));
            System.out.println(linha);
        }

        double soma = 0;
        double maior = medias[0];
        double menor = medias[0];
        for (double m : medias) {
            soma += m;
            maior = Math.max(maior, m);
            menor = Math.min(menor, m);
        }
        double mediaTurma = soma / n;
        double somaQuadrados = 0;
        for (double m : medias) somaQuadrados += Math.pow(m - mediaTurma, 2);
        double desvio = Math.sqrt(somaQuadrados / n); //> Raiz da média dos quadrados das distâncias até a média.
        double[] ordenadas = Arrays.copyOf(medias, n); //> Ordena uma cópia: medias continua alinhado com nomes.
        Arrays.sort(ordenadas);
        double mediana = n % 2 == 1 ? ordenadas[n / 2] : (ordenadas[n / 2 - 1] + ordenadas[n / 2]) / 2;

        System.out.println();
        System.out.printf(BR, "Média da turma %.2f, mediana %.2f, desvio padrão %.2f%n", mediaTurma, mediana, desvio);
        System.out.printf(BR, "Maior média %.1f, menor média %.1f%n", maior, menor);
        int aprovados = 0;
        int recuperacao = 0;
        int[] faixas = new int[5];
        for (double m : medias) {
            if (m >= 7) aprovados++;
            else if (m >= 5) recuperacao++;
            faixas[Math.min((int) (m / 2), 4)]++; //> 0 a 2 cai na faixa 0, 2 a 4 na 1... e o 10 vai para a última.
        }
        System.out.println("Aprovados " + aprovados + ", recuperação " + recuperacao + ", reprovados " + (n - aprovados - recuperacao));
        for (int f = 0; f < faixas.length; f++) {
            System.out.printf("%2d a %2d  %s%n", f * 2, f * 2 + 2, "#".repeat(faixas[f]));
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

Média da turma 6,83, mediana 7,00, desvio padrão 1,83
Maior média 9,5, menor média 3,6
Aprovados 5, recuperação 3, reprovados 1
 0 a  2  
 2 a  4  #
 4 a  6  ##
 6 a  8  ####
 8 a 10  ##
```

**Por que assim:**

- `maior` e `menor` começam com `medias[0]`, e não com 0 e 10. Assim o código funciona com qualquer escala de notas, e não depende de um valor "impossível".
- A mediana usa a cópia ordenada, e o boletim, impresso antes, usa o array original. Se você ordenar `medias` no lugar da cópia e imprimir o boletim depois, verá a Ana com a média do Diego.
- O desvio padrão divide por `n` porque os dados são a turma inteira, não uma amostra.
- `Math.min((int) (m / 2), 4)` resolve o caso do 10 sem um `if` especial: 10 ÷ 2 = 5, que vira 4, a última faixa.
- As estatísticas usam as médias já arredondadas. A média da turma mudaria um pouco com as médias brutas; para um conselho de classe, a diferença não importa, mas num sistema financeiro importaria. Decida e escreva a decisão no README.
