Rodando com a entrada `1`, `2`, `250`, `2`, `0`, `1` e `0`: o saldo, um depósito aceito, um recusado e o saldo de novo.

```java executar
import java.util.Scanner;

public class Caixa {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        long saldo = 123_405; //> Centavos num long: R$ 1234,05 sem erro de arredondamento.
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
                case 1 -> {
                    long reais = saldo / 100;
                    long centavos = saldo % 100;
                    System.out.println("Saldo: R$ " + reais + "," + (centavos < 10 ? "0" : "") + centavos); //> O zero entra só quando os centavos têm um dígito.
                }
                case 2 -> {
                    System.out.println("Valor do depósito, em reais:");
                    int valor = entrada.nextInt();
                    if (valor < 1 || valor > 10_000) {
                        System.out.println("O depósito precisa ficar entre R$ 1 e R$ 10000.");
                    } else {
                        saldo += valor * 100L; //> O L faz a multiplicação acontecer em long.
                        System.out.println("Depósito feito.");
                    }
                }
                case 3, 4 -> System.out.println("Em construção.");
                case 0 -> System.out.println("Até logo!");
                default -> System.out.println("Opção inválida.");
            }
        }
    }
}
```

```entrada
1
2
250
2
0
1
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
Depósito feito.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do depósito, em reais:
O depósito precisa ficar entre R$ 1 e R$ 10000.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Saldo: R$ 1484,05

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Até logo!
```

**Por que assim:**

- O saldo nunca passa por `double`: entra em centavos, soma em centavos e só vira texto na hora de imprimir.
- O ternário `(centavos < 10 ? "0" : "")` devolve uma String vazia quando não precisa do zero. Como a expressão começa com a String `"R$ "`, cada `+` seguinte junta texto; se ela começasse com `reais + centavos`, os dois seriam somados como números antes de virar texto.
- A validação acontece **antes** de mexer no saldo. Um depósito recusado não pode deixar rastro.
- Repare que a conta de formatar está escrita dentro do `case 1`. Por enquanto é o único lugar; na etapa 4 ela vai aparecer em vários, e aí vira um método.
