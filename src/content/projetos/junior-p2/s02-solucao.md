A solução da etapa 2:

```java executar
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
            String descricao = switch (contrato) { //> Sem default: o compilador sabe que só existem três tipos.
                case Clt clt -> "CLT, " + clt.dependentes() + " dependente(s)";
                case Pj pj -> pj.notaEmitida() ? "PJ" : "PJ, nota pendente";
                case Estagio estagio -> "estágio, " + estagio.horasSemanais() + "h por semana";
            };
            System.out.println(contrato.nome() + ": " + descricao); //> nome() vem da interface, e cada record já tem esse método.
        }
    }
}

sealed interface Contrato permits Clt, Pj, Estagio { //> Selada: a lista de quem pode ser um Contrato é fechada aqui.
    String nome();
}

record Clt(String nome, long salario, int dependentes) implements Contrato {
    Clt {
        nome = nome.strip();
        if (salario <= 0) throw new IllegalArgumentException("salário precisa ser positivo: " + nome);
        if (dependentes < 0) throw new IllegalArgumentException("dependentes não pode ser negativo: " + nome);
    }

    Clt comReajuste(int percentual) {
        return new Clt(nome, salario + (salario * percentual + 50) / 100, dependentes);
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
```

```saida
Marina Costa: CLT, 1 dependente(s)
Paulo Henrique: CLT, 2 dependente(s)
Luiza Prado: CLT, 0 dependente(s)
Renato Dias: PJ
Sofia Lemos: PJ, nota pendente
Caio Ramos: estágio, 30h por semana
Bia Nogueira: estágio, 20h por semana
```

**Por que assim:**

- O switch é uma **expressão**: devolve a descrição direto para a variável. Cada caso é uma linha, e o compilador confere que os três tipos estão lá.
- `contrato.nome()` funciona sem saber o tipo, porque o método está na interface. Use a interface para o que é comum e o switch só para o que é diferente.
- Os records ficam nos mesmos arquivos da interface no exemplo; num projeto, cada um iria no próprio arquivo, no mesmo pacote. Tipos selados exigem que as subclasses estejam no mesmo pacote, ou no mesmo módulo.
- `dependente(s)` é uma saída preguiçosa para o plural. Um `if` resolveria, mas para uma descrição interna não vale a complicação; para um texto que o cliente lê, valeria.
