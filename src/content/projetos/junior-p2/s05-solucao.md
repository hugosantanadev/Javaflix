A versão final:

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

        System.out.println();
        System.out.println("Simulação: reajuste de 5% para quem é CLT");
        Contrato[] reajustada = Folha.reajustarClt(equipe, 5);
        System.out.println("Custo hoje:         " + Moeda.formatar(Folha.custoTotal(equipe)));
        System.out.println("Custo com reajuste: " + Moeda.formatar(Folha.custoTotal(reajustada)));
        System.out.println("Original intacto: " + equipe[0]);
        System.out.println("Reajustado:       " + reajustada[0]);
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

sealed interface Pagamento permits Holerite, Bloqueado {}

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
            case Pj(String nome, long valor, boolean notaEmitida) when !notaEmitida -> new Bloqueado(nome, "falta a nota fiscal do mês");
            case Pj(String nome, long valor, boolean notaEmitida) -> new Holerite(nome, "PJ", valor, 0, valor, valor);
            case Estagio(String nome, long bolsa, int horasSemanais) -> {
                long bruto = bolsa + Estagio.AUXILIO_TRANSPORTE;
                yield new Holerite(nome, "Estágio", bruto, 0, bruto, bruto);
            }
        };
    }

    static long custoTotal(Contrato[] equipe) {
        long total = 0;
        for (Contrato c : equipe) {
            if (calcular(c) instanceof Holerite h) total += h.custoEmpresa(); //> Pagamento bloqueado não entra no custo do mês.
        }
        return total;
    }

    static Contrato[] reajustarClt(Contrato[] equipe, int percentual) {
        Contrato[] nova = new Contrato[equipe.length];
        for (int i = 0; i < equipe.length; i++) {
            nova[i] = equipe[i] instanceof Clt clt ? clt.comReajuste(percentual) : equipe[i]; //> Um array novo: a equipe original não muda.
        }
        return nova;
    }

    static void imprimir(Contrato[] equipe) {
        System.out.printf("%-15s %-8s %13s %12s %13s%n", "Nome", "Contrato", "Bruto", "Descontos", "Líquido");
        long totalLiquido = 0;
        long custoClt = 0;
        long custoPj = 0;
        long custoEstagio = 0;
        Holerite maior = null;
        int bloqueados = 0;
        for (Contrato contrato : equipe) {
            Pagamento pagamento = calcular(contrato);
            long custo = 0;
            switch (pagamento) {
                case Holerite h -> {
                    System.out.printf("%-15s %-8s %13s %12s %13s%n", h.nome(), h.tipo(), Moeda.formatar(h.bruto()),
                            Moeda.formatar(h.descontos()), Moeda.formatar(h.liquido()));
                    totalLiquido += h.liquido();
                    custo = h.custoEmpresa();
                    if (maior == null || h.liquido() > maior.liquido()) maior = h;
                }
                case Bloqueado(String nome, String motivo) -> {
                    System.out.printf("%-15s bloqueado: %s%n", nome, motivo);
                    bloqueados++;
                }
            }
            switch (contrato) { //> Switch de comando sobre tipo selado: também precisa cobrir todos os casos.
                case Clt c -> custoClt += custo;
                case Pj p -> custoPj += custo;
                case Estagio e -> custoEstagio += custo;
            }
        }
        System.out.println();
        System.out.println("Total líquido a pagar: " + Moeda.formatar(totalLiquido));
        System.out.println("Custo para a empresa:  " + Moeda.formatar(custoClt + custoPj + custoEstagio));
        System.out.println("  CLT " + Moeda.formatar(custoClt) + ", PJ " + Moeda.formatar(custoPj) + ", estágio " + Moeda.formatar(custoEstagio));
        System.out.println("Maior líquido: " + maior.nome() + ", " + Moeda.formatar(maior.liquido())); //> Supõe pelo menos um holerite. Veja a discussão abaixo.
        System.out.println("Pagamentos bloqueados: " + bloqueados);
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

Total líquido a pagar: R$ 25.892,45
Custo para a empresa:  R$ 32.408,00
  CLT R$ 19.968,00, PJ R$ 9.000,00, estágio R$ 3.440,00
Maior líquido: Renato Dias, R$ 9.000,00
Pagamentos bloqueados: 1

Simulação: reajuste de 5% para quem é CLT
Custo hoje:         R$ 32.408,00
Custo com reajuste: R$ 33.406,40
Original intacto: Clt[nome=Marina Costa, salario=450000, dependentes=1]
Reajustado:       Clt[nome=Marina Costa, salario=472500, dependentes=1]
```

**Por que assim:**

- O resumo é calculado no mesmo laço que imprime a tabela: cada contrato é calculado uma vez. `custoTotal`, usado na simulação, calcula de novo; para sete pessoas não importa, e manter os dois métodos simples vale mais.
- `custoTotal` usa `instanceof Holerite h`, um padrão de tipo fora do switch. Quando só um dos casos interessa, ele é mais curto que um switch inteiro.
- `maior.nome()` supõe que existe ao menos um holerite. Com uma equipe toda bloqueada, `maior` seria `null` e o programa quebraria com `NullPointerException`. A correção é um `if (maior != null)`, e o caso vale um teste: é exatamente o tipo de borda que escapa.
- A simulação não copia records, só referências: o array novo aponta para os mesmos `Pj` e `Estagio` do original. Isso é seguro **porque** records são imutáveis; com objetos que mudam, compartilhar seria um convite a bugs.
