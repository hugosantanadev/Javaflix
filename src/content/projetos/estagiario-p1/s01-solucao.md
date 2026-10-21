Uma solução possível, rodada com a entrada `1`, `abc`, `7` e `0`, uma por linha:

```java executar
import java.util.Scanner;

public class Caixa {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        System.out.println("Caixa Javaflix");
        int opcao = -1; //> Qualquer valor diferente de 0 faz o laço entrar na primeira vez.
        while (opcao != 0) {
            System.out.println();
            System.out.println("1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair");
            System.out.println("Opção:");
            if (!entrada.hasNextInt()) { //> Pergunta sem consumir: o que foi digitado continua esperando.
                if (!entrada.hasNext()) break; //> A entrada acabou de vez: sai do laço em vez de travar.
                entrada.next();
                System.out.println("Digite só o número da opção.");
                continue;
            }
            opcao = entrada.nextInt();
            switch (opcao) {
                case 1, 2, 3, 4 -> System.out.println("Em construção."); //> Vários rótulos no mesmo caso, separados por vírgula.
                case 0 -> System.out.println("Até logo!");
                default -> System.out.println("Opção inválida.");
            }
        }
    }
}
```

```entrada
1
abc
7
0
```

```saida
Caixa Javaflix

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Em construção.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Digite só o número da opção.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Opção inválida.

1 Saldo  2 Depositar  3 Sacar  4 Extrato  0 Sair
Opção:
Até logo!
```

**Por que assim:**

- `opcao` começa em `-1` só para o `while` entrar na primeira volta. Um `do-while` resolveria sem esse valor inventado; você vai ver essa versão na etapa 5.
- O `continue` volta direto ao topo do laço, pulando o `switch`: a opção inválida não chega a ser lida como número.
- Sem o `if (!entrada.hasNext()) break;`, um fim de entrada, como o do arquivo no teste da etapa 5, faria o `next()` lançar uma exceção. É um caso que quase ninguém testa e que derruba programas de verdade.
- O `switch` de seta não tem fall-through: cada caso executa só a sua linha, sem precisar de `break`.
