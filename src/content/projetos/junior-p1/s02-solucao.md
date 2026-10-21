A solução da etapa 2:

```java executar
public class BibliotecaApp {
    public static void main(String[] args) {
        Item[] itens = {
            new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis"),
            new Revista("R-001", "Revista Ponto e Vírgula", 2026, 42),
        };
        Usuario[] usuarios = {new Usuario("Ana", TipoUsuario.ALUNO), new Usuario("Rui", TipoUsuario.PROFESSOR)};

        for (Usuario usuario : usuarios) {
            for (Item item : itens) {
                int prazo = usuario.getTipo().prazoPara(item);
                System.out.println(usuario + " leva " + item.getCodigo() + " por " + prazo + " dias");
            }
        }
        for (TipoUsuario tipo : TipoUsuario.values()) {
            System.out.println(tipo + ": até " + tipo.getLimite() + " itens ao mesmo tempo");
        }
    }
}

abstract class Item {
    private final String codigo;
    private final String titulo;
    private final int ano;

    protected Item(String codigo, String titulo, int ano) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.ano = ano;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public int getAno() {
        return ano;
    }

    /** Dias de empréstimo para um aluno. */
    public abstract int diasDeEmprestimo(); //> Cada subclasse é obrigada a responder.

    @Override
    public boolean equals(Object outro) {
        if (this == outro) return true;
        if (!(outro instanceof Item)) return false;
        Item item = (Item) outro;
        return codigo.equals(item.codigo);
    }

    @Override
    public int hashCode() {
        return codigo.hashCode();
    }

    @Override
    public String toString() {
        return codigo + " " + titulo + " (" + ano + ")";
    }
}

class Livro extends Item {
    private final String autor;

    Livro(String codigo, String titulo, int ano, String autor) {
        super(codigo, titulo, ano);
        this.autor = autor;
    }

    public String getAutor() {
        return autor;
    }

    @Override
    public int diasDeEmprestimo() {
        return 14;
    }

    @Override
    public String toString() {
        return super.toString() + ", de " + autor;
    }
}

class Revista extends Item {
    private final int edicao;

    Revista(String codigo, String titulo, int ano, int edicao) {
        super(codigo, titulo, ano);
        this.edicao = edicao;
    }

    @Override
    public int diasDeEmprestimo() {
        return 7;
    }

    @Override
    public String toString() {
        return super.toString() + ", edição " + edicao;
    }
}

enum TipoUsuario {
    ALUNO(3, 1), //> Cada constante chama o construtor do enum com os seus valores.
    PROFESSOR(10, 2);

    private final int limite;
    private final int fatorDePrazo;

    TipoUsuario(int limite, int fatorDePrazo) {
        this.limite = limite;
        this.fatorDePrazo = fatorDePrazo;
    }

    public int getLimite() {
        return limite;
    }

    public int prazoPara(Item item) {
        return item.diasDeEmprestimo() * fatorDePrazo; //> Polimorfismo: o objeto decide quantos dias, o tipo multiplica.
    }
}

final class Usuario { //> final e sem setters: depois de criado, ninguém muda o usuário.
    private final String nome;
    private final TipoUsuario tipo;

    Usuario(String nome, TipoUsuario tipo) {
        this.nome = nome;
        this.tipo = tipo;
    }

    public String getNome() {
        return nome;
    }

    public TipoUsuario getTipo() {
        return tipo;
    }

    @Override
    public String toString() {
        return nome + " (" + tipo.name().toLowerCase() + ")";
    }
}
```

```saida
Ana (aluno) leva L-001 por 14 dias
Ana (aluno) leva R-001 por 7 dias
Rui (professor) leva L-001 por 28 dias
Rui (professor) leva R-001 por 14 dias
ALUNO: até 3 itens ao mesmo tempo
PROFESSOR: até 10 itens ao mesmo tempo
```

**Por que assim:**

- Cada regra mora com quem sabe dela: o item sabe os próprios dias, o tipo de usuário sabe o limite e o fator. `prazoPara` só junta as duas, e nenhum `instanceof` aparece.
- O fator do prazo é um `int` guardado no enum, não um `if (this == PROFESSOR)`. Um tipo novo, como `FUNCIONARIO(5, 1)`, é uma linha a mais.
- `Usuario` é `final` e não tem setters: um objeto que não muda pode ser compartilhado à vontade, sem ninguém alterar o tipo de um usuário no meio de um empréstimo.
- `tipo.name()` devolve o nome da constante, `ALUNO`, e o `toLowerCase()` deixa o texto pronto para a tela. Para textos com acento ou formatos mais caprichados, um campo com o rótulo no enum seria o próximo passo.
