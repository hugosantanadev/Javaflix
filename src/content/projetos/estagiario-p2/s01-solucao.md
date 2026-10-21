Uma solução possível, rodada com a turma do pedido:

```java executar
import java.util.Arrays;
import java.util.Scanner;

public class Boletim {
    static final int PROVAS = 4;

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        StringBuilder texto = new StringBuilder(); //> Cresce sem criar uma String nova a cada linha.
        while (entrada.hasNextLine()) {
            String linha = entrada.nextLine().strip();
            if (linha.isEmpty()) break; //> Linha em branco: acabou a colagem.
            texto.append(linha).append('\n');
        }
        if (texto.isEmpty()) {
            System.out.println("Nenhum aluno informado.");
            return;
        }
        String[] linhas = texto.toString().split("\n");

        String[] nomes = new String[linhas.length]; //> Arrays do tamanho máximo; n conta quantos foram usados.
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
                String campo = campos[p + 1].strip().replace(',', '.'); //> A planilha usa vírgula; o parseDouble quer ponto.
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
        for (int a = 0; a < n; a++) {
            System.out.println(nomes[a] + " " + Arrays.toString(notas[a]));
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
Ana Souza [7.5, 8.0, 9.0, 6.5]
Bruno Lima [5.0, 4.5, 6.0, 5.5]
Carla Dias [9.5, 10.0, 9.0, 9.5]
Diego Rocha [3.0, 4.0, 2.5, 5.0]
Elisa Martins [6.5, 7.0, 7.5, 7.0]
Fábio Nunes [8.0, 6.0, 7.0, 6.5]
Gabriela Torres de Albuquerque [10.0, 9.5, 9.0, 8.5]
Heitor Alves [4.0, 6.0, 5.0, 5.5]
Igor Campos [7.0, 6.8, 7.0, 7.0]
```

**Por que assim:**

- O `StringBuilder` junta as linhas sem criar uma String nova a cada `append`. Só no fim ele vira texto, e o `split("\n")` diz quantas linhas vieram.
- Os arrays nascem com o tamanho máximo possível, `linhas.length`, e `n` conta os alunos válidos. As posições depois de `n` ficam sem uso; é o preço de não saber o tamanho de antemão. Na temporada [Coleções](/?t=pleno-t3) do Pleno, uma `List` cresce sozinha e acaba com isso.
- A nota é gravada em `notas[n][p]` antes de a linha inteira ser validada. Se uma nota adiante for inválida, `n` não avança, e a próxima linha válida escreve por cima. Funciona, mas é sutil: vale um comentário no seu código.
- `ehNota` recusa `""`, `"."`, `"7."`, `"1.2.3"` e qualquer letra antes de chamar o `parseDouble`. Por isso o programa nunca lança `NumberFormatException`.
