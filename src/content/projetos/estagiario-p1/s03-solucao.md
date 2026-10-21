Rodando com a entrada `3`, `180`, `3`, `75`, `3`, `5000`, `1` e `0`: um saque que dá certo, um valor que nenhuma nota alcança, um saque maior que o saldo e o saldo final.

```java executar
import java.util.Scanner;

public class Caixa {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        long saldo = 123_405; // R$ 1234,05, em centavos
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
                    System.out.println("Saldo: R$ " + reais + "," + (centavos < 10 ? "0" : "") + centavos);
                }
                case 2 -> {
                    System.out.println("Valor do depósito, em reais:");
                    int valor = entrada.nextInt();
                    if (valor < 1 || valor > 10_000) {
                        System.out.println("O depósito precisa ficar entre R$ 1 e R$ 10000.");
                    } else {
                        saldo += valor * 100L;
                        System.out.println("Depósito feito.");
                    }
                }
                case 3 -> {
                    System.out.println("Valor do saque, em reais:");
                    int valor = entrada.nextInt();
                    if (valor < 10 || valor % 10 != 0) { //> Sobrou resto na divisão por 10: nenhuma combinação de notas chega lá.
                        System.out.println("O caixa só tem notas de 10, 20, 50 e 100.");
                    } else if (valor * 100L > saldo) { //> Compara em centavos, a mesma unidade do saldo.
                        System.out.println("Saldo insuficiente.");
                    } else {
                        saldo -= valor * 100L;
                        int resto = valor;
                        int n100 = resto / 100; //> Quantas notas de 100 cabem.
                        resto = resto % 100; //> O que sobra passa para a nota seguinte.
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
                    }
                }
                case 4 -> System.out.println("Em construção.");
                case 0 -> System.out.println("Até logo!");
                default -> System.out.println("Opção inválida.");
            }
        }
    }
}
```

```entrada
3
180
3
75
3
5000
1
0
```

```saida
Caixa Javaflix

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Retire as notas: 1x100 1x50 1x20 1x10

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
O caixa só tem notas de 10, 20, 50 e 100.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Valor do saque, em reais:
Saldo insuficiente.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Saldo: R$ 1054,05

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Até logo!
```

**Por que assim:**

- A ordem das validações vai da mais barata e óbvia para a que depende do estado: primeiro o formato do valor, depois o saldo.
- O desconto do saldo só acontece no `else`, quando todas as regras passaram. Descontar antes e "devolver" se algo der errado é a receita clássica de bug em sistema financeiro.
- As notas usam a mesma variável `resto`, que diminui a cada passo, e só quatro divisões. Um laço que subtrai de 10 em 10 daria até 100 voltas para R$ 1000.
- As quatro linhas de `if (n... > 0)` se repetem. Com arrays, da temporada [Arrays e Math](/?t=estagiario-t6), as notas viram uma lista e o cálculo vira um laço de quatro voltas: um bom exercício para depois.
