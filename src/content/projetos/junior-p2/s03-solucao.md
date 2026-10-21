A solução da etapa 3, com o cálculo de cada contrato num único switch:

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
        for (Contrato contrato : equipe) {
            Holerite h = Folha.calcular(contrato);
            System.out.println(h.nome() + " (" + h.tipo() + "): bruto " + Moeda.formatar(h.bruto())
                    + ", descontos " + Moeda.formatar(h.descontos()) + ", líquido " + Moeda.formatar(h.liquido()));
        }
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

record Holerite(String nome, String tipo, long bruto, long descontos, long liquido, long custoEmpresa) {}

final class Moeda {
    static final Locale BR = Locale.of("pt", "BR");

    private Moeda() {
    }

    static String formatar(long centavos) {
        return String.format(BR, "R$ %,.2f", centavos / 100.0); //> A divisão por 100.0 só acontece para mostrar; as contas ficam em centavos.
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
        return (centavos * percentual + 50) / 100; //> O + 50 faz a divisão inteira arredondar em vez de cortar.
    }

    static Holerite calcular(Contrato contrato) {
        return switch (contrato) {
            case Clt(String nome, long salario, int dependentes) -> { //> Record pattern: testa o tipo e já tira os componentes.
                long previdencia = percentual(salario, PREVIDENCIA);
                long base = salario - previdencia - DEDUCAO_DEPENDENTE * dependentes;
                long imposto = base > ISENCAO ? percentual(base - ISENCAO, IMPOSTO) : 0; //> Imposto só sobre o que passa da faixa isenta.
                long descontos = previdencia + imposto;
                yield new Holerite(nome, "CLT", salario, descontos, salario - descontos, salario + percentual(salario, ENCARGOS));
            }
            case Pj(String nome, long valor, boolean notaEmitida) -> new Holerite(nome, "PJ", valor, 0, valor, valor);
            case Estagio(String nome, long bolsa, int horasSemanais) -> {
                long bruto = bolsa + Estagio.AUXILIO_TRANSPORTE;
                yield new Holerite(nome, "Estágio", bruto, 0, bruto, bruto);
            }
        };
    }
}
```

```saida
Marina Costa (CLT): bruto R$ 4.500,00, descontos R$ 539,25, líquido R$ 3.960,75
Paulo Henrique (CLT): bruto R$ 8.200,00, descontos R$ 1.347,30, líquido R$ 6.852,70
Luiza Prado (CLT): bruto R$ 2.900,00, descontos R$ 261,00, líquido R$ 2.639,00
Renato Dias (PJ): bruto R$ 9.000,00, descontos R$ 0,00, líquido R$ 9.000,00
Sofia Lemos (PJ): bruto R$ 6.500,00, descontos R$ 0,00, líquido R$ 6.500,00
Caio Ramos (Estágio): bruto R$ 1.820,00, descontos R$ 0,00, líquido R$ 1.820,00
Bia Nogueira (Estágio): bruto R$ 1.620,00, descontos R$ 0,00, líquido R$ 1.620,00
```

**Por que assim:**

- `Moeda.formatar` divide por `100.0` só para **mostrar**. Todas as contas continuam em centavos inteiros; o `double` aparece na última linha, e o `%,.2f` arredonda para exibir sem erro.
- `comReajuste` agora usa `Folha.percentual`, a mesma regra de arredondamento das outras contas. Duas fórmulas parecidas espalhadas pelo código acabam, um dia, dando resultados diferentes.
- O imposto usa a técnica de faixa: só o que **passa** de R$ 3.000,00 paga 15%. É assim que as tabelas progressivas reais funcionam, faixa por faixa, e é um erro comum aplicar a alíquota sobre a base inteira.
- O resultado da Sofia está **errado** pelas regras do pedido: ela recebe sem nota. O código compila e as contas batem, mas a regra de negócio falhou. Teste a regra, não só a conta: é o que a próxima etapa corrige.
