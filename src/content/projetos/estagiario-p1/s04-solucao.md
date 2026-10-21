Rodando com cinco saques de R$ 200 e R$ 300 seguidos do saldo: os três primeiros grátis, o quarto com tarifa e o quinto barrado pelo limite.

```java executar
import java.util.Scanner;

public class Caixa {
    static final long TARIFA = 250;          // R$ 2,50, em centavos
    static final int SAQUES_GRATIS = 3;
    static final int LIMITE_DIARIO = 1_000;  // em reais

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        long saldo = 123_405;                // R$ 1234,05, em centavos
        int saques = 0;
        int sacadoHoje = 0;
        System.out.println("Caixa Javaflix");
        int opcao = -1;
        while (opcao != 0) {
            System.out.println();
            System.out.println("1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair");
            System.out.println("Opção:");
            if (!entrada.hasNextInt()) {
                if (!entrada.hasNext()) break;
                entrada.next();
                System.out.println("Digite só o número da opção.");
                continue;
            }
            opcao = entrada.nextInt();
            switch (opcao) {
                case 1 -> System.out.println("Saldo: " + formatar(saldo));
                case 2 -> {
                    System.out.println("Valor do depósito, em reais:");
                    int valor = entrada.nextInt();
                    if (valor < 1 || valor > 10_000) {
                        System.out.println("O depósito precisa ficar entre R$ 1 e R$ 10000.");
                    } else {
                        saldo += valor * 100L;
                        System.out.println("Depósito feito. Saldo: " + formatar(saldo));
                    }
                }
                case 3 -> {
                    System.out.println("Valor do saque, em reais:");
                    int valor = entrada.nextInt();
                    long tarifa = saques >= SAQUES_GRATIS ? TARIFA : 0; //> Do quarto saque em diante, cobra a tarifa.
                    if (valor < 10 || valor % 10 != 0) {
                        System.out.println("O caixa só tem notas de 10, 20, 50 e 100.");
                    } else if (sacadoHoje + valor > LIMITE_DIARIO) { //> O limite é testado antes do saldo. Veja a discussão abaixo.
                        System.out.println("Passa do limite diário. Hoje ainda dá para sacar R$ " + (LIMITE_DIARIO - sacadoHoje) + ".");
                    } else if (valor * 100L + tarifa > saldo) { //> O saldo precisa cobrir o saque e a tarifa juntos.
                        System.out.println("Saldo insuficiente.");
                    } else {
                        saldo -= valor * 100L + tarifa;
                        saques++;
                        sacadoHoje += valor;
                        int resto = valor;
                        int n100 = resto / 100;
                        resto = resto % 100;
                        int n50 = resto / 50;
                        resto = resto % 50;
                        int n20 = resto / 20;
                        resto = resto % 20;
                        int n10 = resto / 10;
                        String notas = "";
                        if (n100 > 0) notas += " " + n100 + "x100";
                        if (n50 > 0) notas += " " + n50 + "x50";
                        if (n20 > 0) notas += " " + n20 + "x20";
                        if (n10 > 0) notas += " " + n10 + "x10";
                        System.out.println("Retire as notas:" + notas);
                        if (tarifa > 0) System.out.println("Tarifa cobrada: " + formatar(tarifa));
                    }
                }
                case 4 -> System.out.println("Em construção.");
                case 0 -> System.out.println("Até logo!");
                default -> System.out.println("Opção inválida.");
            }
        }
    }

    /** 123405 centavos viram "R$ 1234,05". */
    static String formatar(long centavos) { //> Um lugar só para a regra de formatação.
        long reais = centavos / 100;
        long resto = centavos % 100;
        return "R$ " + reais + "," + (resto < 10 ? "0" : "") + resto;
    }
}
```

```entrada
3
200
3
200
3
200
3
200
3
300
1
0
```

```saida
Caixa Javaflix

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 2x100

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 2x100

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 2x100

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 2x100
Tarifa cobrada: R$ 2,50

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Passa do limite diário. Hoje ainda dá para sacar R$ 200.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Saldo: R$ 431,55

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Até logo!
```

**Por que assim:**

- `saques` e `sacadoHoje` ficam fora do laço: declaradas dentro, voltariam a zero a cada volta do menu, e a tarifa nunca seria cobrada.
- Só os saques que deram certo contam para a tarifa e para o limite. Um saque recusado não incrementa nada, porque os `++` e `+=` estão no `else` final.
- Sobre a ordem dos `else if`: aqui o limite vem antes do saldo, e isso tem um efeito colateral. Com R$ 50 de saldo e R$ 900 já sacados, a mensagem diz "ainda dá para sacar R$ 100", um valor que o saldo não cobre. Testar o saldo primeiro evita a promessa falsa; melhor ainda seria mostrar o menor dos dois valores, com o `Math.min` da temporada [Arrays e Math](/?t=estagiario-t6). Não existe ordem certa universal: existe a que deixa a mensagem verdadeira.
- O método `formatar` não sabe nada de caixa eletrônico: recebe centavos e devolve texto. Métodos assim, que não dependem do resto do programa, são os mais fáceis de testar e de reaproveitar.
