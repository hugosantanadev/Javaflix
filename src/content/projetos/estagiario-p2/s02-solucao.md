Rodando com a mesma turma:

```java executar
import java.util.Scanner;

public class Boletim {
    static final int PROVAS = 4;

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

        double[] medias = new double[n]; //> Um array paralelo: medias[a] é do aluno nomes[a].
        for (int a = 0; a < n; a++) {
            double soma = 0;
            for (int p = 0; p < PROVAS; p++) soma += notas[a][p];
            medias[a] = Math.round(soma / PROVAS * 10) / 10.0; //> Multiplica por 10, arredonda e divide: uma casa decimal.
        }
        for (int a = 0; a < n; a++) {
            System.out.println(nomes[a] + ": média " + medias[a] + ", " + situacao(medias[a]));
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
        if (media >= 7) return "Aprovado"; //> Cada return encerra o método: não precisa de else.
        if (media >= 5) return "Recuperação";
        return "Reprovado";
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
Ana Souza: média 7.8, Aprovado
Bruno Lima: média 5.3, Recuperação
Carla Dias: média 9.5, Aprovado
Diego Rocha: média 3.6, Reprovado
Elisa Martins: média 7.0, Aprovado
Fábio Nunes: média 6.9, Recuperação
Gabriela Torres de Albuquerque: média 9.3, Aprovado
Heitor Alves: média 5.1, Recuperação
Igor Campos: média 7.0, Aprovado
```

**Por que assim:**

- O pedido diz "situação pela média arredondada", então o arredondamento acontece uma vez, na hora de calcular, e tudo depois usa o valor arredondado. O Igor fica com 7.0 e aprovado. Se a regra fosse outra, bastaria mudar uma linha, e é por isso que ela fica num lugar só.
- `situacao` usa `return` em cada regra, de cima para baixo. Como cada `return` encerra o método, o segundo `if` só roda quando o primeiro falhou, e o `>= 5` já significa "de 5 a 6,9".
- A média aparece com ponto, `7.8`, porque a concatenação usa o formato do Java, que não depende do idioma. A etapa 3 resolve isso.
