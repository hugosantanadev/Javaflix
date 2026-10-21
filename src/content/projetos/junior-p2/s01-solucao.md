Uma solução possível:

```java executar
public class FolhaApp {
    public static void main(String[] args) {
        Clt luiza = new Clt("  Luiza Prado ", 2_900_00, 0);
        Pj renato = new Pj("Renato Dias", 9_000_00, true);
        Estagio caio = new Estagio("Caio Ramos", 1_600_00, 30);
        System.out.println(luiza);
        System.out.println(renato);
        System.out.println(caio);

        System.out.println("Iguais? " + luiza.equals(new Clt("Luiza Prado", 2_900_00, 0)));

        Clt reajustada = luiza.comReajuste(10);
        System.out.println("Depois do reajuste: " + reajustada.salario());
        System.out.println("O original continua: " + luiza.salario());

        try {
            new Estagio("Duda Alves", 1_500_00, 40);
        } catch (IllegalArgumentException e) {
            System.out.println("Recusado: " + e.getMessage());
        }
    }
}

record Clt(String nome, long salario, int dependentes) { //> Uma linha declara campos, construtor, getters, equals, hashCode e toString.
    Clt { //> Construtor compacto: valida e normaliza antes de os campos receberem os valores.
        nome = nome.strip();
        if (salario <= 0) throw new IllegalArgumentException("salário precisa ser positivo: " + nome);
        if (dependentes < 0) throw new IllegalArgumentException("dependentes não pode ser negativo: " + nome);
    }

    Clt comReajuste(int percentual) {
        return new Clt(nome, salario + (salario * percentual + 50) / 100, dependentes); //> Record não muda: o reajuste devolve um record novo.
    }
}

record Pj(String nome, long valorMensal, boolean notaEmitida) {
    Pj {
        nome = nome.strip();
        if (valorMensal <= 0) throw new IllegalArgumentException("valor precisa ser positivo: " + nome);
    }
}

record Estagio(String nome, long bolsa, int horasSemanais) {
    static final long AUXILIO_TRANSPORTE = 220_00;

    Estagio {
        nome = nome.strip();
        if (bolsa <= 0) throw new IllegalArgumentException("bolsa precisa ser positiva: " + nome);
        if (horasSemanais < 1 || horasSemanais > 30) { //> O limite de 30 horas semanais vem da Lei do Estágio.
            throw new IllegalArgumentException("estágio vai de 1 a 30 horas por semana: " + nome);
        }
    }
}
```

```saida
Clt[nome=Luiza Prado, salario=290000, dependentes=0]
Pj[nome=Renato Dias, valorMensal=900000, notaEmitida=true]
Estagio[nome=Caio Ramos, bolsa=160000, horasSemanais=30]
Iguais? true
Depois do reajuste: 319000
O original continua: 290000
Recusado: estágio vai de 1 a 30 horas por semana: Duda Alves
```

**Por que assim:**

- O `toString` gerado mostra os centavos crus, `salario=290000`. Para depuração isso basta; para a tela, a formatação vai para um lugar próprio na etapa 3, sem sobrescrever o `toString` do record.
- O nome é normalizado **antes** das validações, então a mensagem de erro já sai com o nome limpo.
- `comReajuste` devolve `new Clt(...)`, e o construtor compacto roda de novo: um reajuste que deixasse o salário inválido seria recusado pelas mesmas regras. Records novos passam sempre pela porta da frente.
- O `equals` gerado compara todos os componentes. Para contratos, isso faz sentido; para um cadastro de pessoas, provavelmente não, e aí a identidade seria um CPF ou uma matrícula, como o código dos itens da biblioteca.
