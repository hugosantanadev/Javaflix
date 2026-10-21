A solução da etapa 4:

```java executar
import java.util.Locale;

public class FolhaApp {
    public static void main(String[] args) {
        Contrato[] equipe = {
            new Clt("Marina Costa", 4_500_00, 1),
            new Clt("Paulo Henrique", 8_200_00, 2),
            new Clt("Luiza Prado", 2_900_00, 0),
            new Pj("Renato Dias", 9_000_00, true),
            new Pj("Sofia Lemos", 6_500_00, false),
            new Estagio("Caio Ramos", 1_600_00, 30),
            new Estagio("Bia Nogueira", 1_400_00, 20),
        };
        Folha.imprimir(equipe);
    }
}

sealed interface Contrato permits Clt, Pj, Estagio {
    String nome();
}

record Clt(String nome, long salario, int dependentes) implements Contrato {
    Clt {
        nome = nome.strip();
        if (salario <= 0) throw new IllegalArgumentException("salário precisa ser positivo: " + nome);
        if (dependentes < 0) throw new IllegalArgumentException("dependentes não pode ser negativo: " + nome);
    }

    Clt comReajuste(int percentual) {
        return new Clt(nome, salario + Folha.percentual(salario, percentual), dependentes);
    }
}

record Pj(String nome, long valorMensal, boolean notaEmitida) implements Contrato {
    Pj {
        nome = nome.strip();
        if (valorMensal <= 0) throw new IllegalArgumentException("valor precisa ser positivo: " + nome);
    }
}

record Estagio(String nome, long bolsa, int horasSemanais) implements Contrato {
    static final long AUXILIO_TRANSPORTE = 220_00;

    Estagio {
        nome = nome.strip();
        if (bolsa <= 0) throw new IllegalArgumentException("bolsa precisa ser positiva: " + nome);
        if (horasSemanais < 1 || horasSemanais > 30) {
            throw new IllegalArgumentException("estágio vai de 1 a 30 horas por semana: " + nome);
        }
    }
}

sealed interface Pagamento permits Holerite, Bloqueado {} //> O resultado também é selado: ou holerite, ou bloqueado.

record Holerite(String nome, String tipo, long bruto, long descontos, long liquido, long custoEmpresa) implements Pagamento {}

record Bloqueado(String nome, String motivo) implements Pagamento {}

final class Moeda {
    static final Locale BR = Locale.of("pt", "BR");

    private Moeda() {
    }

    static String formatar(long centavos) {
        return String.format(BR, "R$ %,.2f", centavos / 100.0);
    }
}

final class Folha {
    static final int PREVIDENCIA = 9;
    static final int IMPOSTO = 15;
    static final long ISENCAO = 3_000_00;
    static final long DEDUCAO_DEPENDENTE = 200_00;
    static final int ENCARGOS = 28;

    private Folha() {
    }

    /** O percentual de um valor em centavos, arredondado para o centavo mais próximo. */
    static long percentual(long centavos, int percentual) {
        return (centavos * percentual + 50) / 100;
    }

    static Pagamento calcular(Contrato contrato) {
        return switch (contrato) {
            case Clt(String nome, long salario, int dependentes) -> {
                long previdencia = percentual(salario, PREVIDENCIA);
                long base = salario - previdencia - DEDUCAO_DEPENDENTE * dependentes;
                long imposto = base > ISENCAO ? percentual(base - ISENCAO, IMPOSTO) : 0;
                long descontos = previdencia + imposto;
                yield new Holerite(nome, "CLT", salario, descontos, salario - descontos, salario + percentual(salario, ENCARGOS));
            }
            case Pj(String nome, long valor, boolean notaEmitida) when !notaEmitida -> new Bloqueado(nome, "falta a nota fiscal do mês"); //> Guarda: o caso só vale quando a condição do when é verdadeira.
            case Pj(String nome, long valor, boolean notaEmitida) -> new Holerite(nome, "PJ", valor, 0, valor, valor); //> O caso sem guarda vem depois e pega os PJ com nota.
            case Estagio(String nome, long bolsa, int horasSemanais) -> {
                long bruto = bolsa + Estagio.AUXILIO_TRANSPORTE;
                yield new Holerite(nome, "Estágio", bruto, 0, bruto, bruto);
            }
        };
    }

    static void imprimir(Contrato[] equipe) {
        System.out.printf("%-15s %-8s %13s %12s %13s%n", "Nome", "Contrato", "Bruto", "Descontos", "Líquido");
        for (Contrato contrato : equipe) {
            switch (calcular(contrato)) {
                case Holerite h -> System.out.printf("%-15s %-8s %13s %12s %13s%n", h.nome(), h.tipo(),
                        Moeda.formatar(h.bruto()), Moeda.formatar(h.descontos()), Moeda.formatar(h.liquido()));
                case Bloqueado(String nome, String motivo) -> System.out.printf("%-15s bloqueado: %s%n", nome, motivo); //> Os dois tipos de Pagamento tratados, sem default.
            }
        }
    }
}
```

```saida
Nome            Contrato         Bruto    Descontos       Líquido
Marina Costa    CLT        R$ 4.500,00    R$ 539,25   R$ 3.960,75
Paulo Henrique  CLT        R$ 8.200,00  R$ 1.347,30   R$ 6.852,70
Luiza Prado     CLT        R$ 2.900,00    R$ 261,00   R$ 2.639,00
Renato Dias     PJ         R$ 9.000,00      R$ 0,00   R$ 9.000,00
Sofia Lemos     bloqueado: falta a nota fiscal do mês
Caio Ramos      Estágio    R$ 1.820,00      R$ 0,00   R$ 1.820,00
Bia Nogueira    Estágio    R$ 1.620,00      R$ 0,00   R$ 1.620,00
```

**Por que assim:**

- `Bloqueado` é um tipo, não um holerite zerado. Quem soma a folha precisa tratar o caso explicitamente, e um pagamento bloqueado nunca entra por engano num total.
- O PJ bloqueado não usa `valor` no caso com guarda. No Java 22 em diante, `_` deixaria isso explícito; aqui o nome fica, para o código compilar no Java 21.
- A tabela usa `printf` com as mesmas larguras no cabeçalho e nas linhas: `%-15s` para o nome, `%13s` para os valores, que já chegam formatados como texto. Mudar uma largura num lugar e esquecer no outro desalinha tudo; uma constante com o molde resolveria.
- O switch dentro de `imprimir` é de comando e cobre os dois tipos de `Pagamento`. Se um dia surgir um terceiro, como `Adiantamento`, o compilador aponta este lugar.
