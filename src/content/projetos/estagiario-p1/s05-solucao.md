A versão final, rodada com a sequência do teste de aceitação. Repare no `cem` no meio, que agora gera um aviso em vez de derrubar o programa.

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
        String extrato = "";
        int movimentos = 0;

        System.out.println("Caixa Javaflix");
        int opcao;
        do {
            System.out.println();
            System.out.println("1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair");
            opcao = lerInteiro(entrada, "Opção:"); //> O menu usa o mesmo método das outras perguntas.
            switch (opcao) {
                case 1 -> System.out.println("Saldo: " + formatar(saldo));
                case 2 -> {
                    int valor = lerInteiro(entrada, "Valor do depósito, em reais:");
                    if (valor < 1 || valor > 10_000) {
                        System.out.println("O depósito precisa ficar entre R$ 1 e R$ 10000.");
                    } else {
                        saldo += valor * 100L;
                        extrato += "Depósito      +" + formatar(valor * 100L) + "\n"; //> Cada movimentação vira uma linha no fim do extrato.
                        movimentos++;
                        System.out.println("Depósito feito. Saldo: " + formatar(saldo));
                    }
                }
                case 3 -> {
                    int valor = lerInteiro(entrada, "Valor do saque, em reais:");
                    long tarifa = saques >= SAQUES_GRATIS ? TARIFA : 0;
                    if (valor < 10 || valor % 10 != 0) {
                        System.out.println("O caixa só tem notas de 10, 20, 50 e 100.");
                    } else if (sacadoHoje + valor > LIMITE_DIARIO) {
                        System.out.println("Passa do limite diário. Hoje ainda dá para sacar R$ " + (LIMITE_DIARIO - sacadoHoje) + ".");
                    } else if (valor * 100L + tarifa > saldo) {
                        System.out.println("Saldo insuficiente.");
                    } else {
                        saldo -= valor * 100L + tarifa;
                        saques++;
                        sacadoHoje += valor;
                        extrato += "Saque         -" + formatar(valor * 100L) + "\n";
                        movimentos++;
                        if (tarifa > 0) {
                            extrato += "Tarifa saque  -" + formatar(tarifa) + "\n";
                            movimentos++;
                        }
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
                case 4 -> {
                    if (movimentos == 0) System.out.println("Nenhuma movimentação.");
                    else System.out.print(extrato);
                    System.out.println("Saldo:        " + formatar(saldo));
                }
                case 0 -> System.out.println("Até logo!");
                default -> System.out.println("Opção inválida.");
            }
        } while (opcao != 0); //> do-while: o menu aparece pelo menos uma vez.
    }

    /** Pergunta até a pessoa digitar um número inteiro. Se a entrada acabar, devolve 0 (sair). */
    static int lerInteiro(Scanner entrada, String pergunta) {
        System.out.println(pergunta);
        while (!entrada.hasNextInt()) {
            if (!entrada.hasNext()) return 0; //> Sem mais entrada, devolve 0 e o caixa se despede.
            entrada.next();
            System.out.println("Digite só números.");
            System.out.println(pergunta);
        }
        return entrada.nextInt();
    }

    /** 123405 centavos viram "R$ 1234,05". */
    static String formatar(long centavos) {
        long reais = centavos / 100;
        long resto = centavos % 100;
        return "R$ " + reais + "," + (resto < 10 ? "0" : "") + resto;
    }
}
```

```entrada
1
2
50
3
cem
180
3
35
3
100
3
100
3
100
3
600
4
0
```

```saida
Caixa Javaflix

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Saldo: R$ 1234,05

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do depósito, em reais:
Depósito feito. Saldo: R$ 1284,05

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Digite só números.
Valor do saque, em reais:
Retire as notas: 1x100 1x50 1x20 1x10

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
O caixa só tem notas de 10, 20, 50 e 100.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 1x100

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 1x100

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 1x100
Tarifa cobrada: R$ 2,50

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Passa do limite diário. Hoje ainda dá para sacar R$ 520.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Depósito      +R$ 50,00
Saque         -R$ 180,00
Saque         -R$ 100,00
Saque         -R$ 100,00
Saque         -R$ 100,00
Tarifa saque  -R$ 2,50
Saldo:        R$ 801,55

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Até logo!
```

**Por que assim:**

- O laço virou `do-while`: o menu aparece pelo menos uma vez, e `opcao` não precisa mais começar com um valor inventado.
- `lerInteiro` concentra toda a proteção de entrada. O menu e os valores usam o mesmo método, então uma melhoria nele, como recusar números negativos, vale para todas as perguntas de uma vez.
- O extrato registra a tarifa como uma linha separada do saque. Quem confere o extrato precisa ver o que foi cobrado e por quê.
- O teste com `entrada.txt` é o seu primeiro teste automatizado: a mesma entrada sempre produz a mesma saída, e qualquer mudança que quebre uma regra aparece na hora. No Backend Júnior, o JUnit faz isso para cada método.

**Para ir além:** mostre o ponto do milhar no `formatar` (`R$ 1.234,05`), usando `/ 1000` e `% 1000`; ou guarde no extrato o saldo depois de cada movimentação.
