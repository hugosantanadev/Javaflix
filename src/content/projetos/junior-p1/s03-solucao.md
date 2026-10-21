A solução da etapa 3:

```java executar
import java.util.Arrays;

public class BibliotecaApp {
    public static void main(String[] args) {
        Biblioteca biblioteca = new Biblioteca();
        System.out.println("Capacidade inicial: " + biblioteca.getCapacidade());
        biblioteca.cadastrar(
                new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis"),
                new Livro("L-002", "Memórias Póstumas de Brás Cubas", 1881, "Machado de Assis"),
                new Livro("L-003", "O Cortiço", 1890, "Aluísio Azevedo"),
                new Revista("R-001", "Revista Ponto e Vírgula", 2026, 42));
        System.out.println(biblioteca.getTotalItens() + " itens, capacidade " + biblioteca.getCapacidade());
        biblioteca.cadastrar(
                new Livro("L-004", "Iracema", 1865, "José de Alencar"),
                new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis"));
        System.out.println(biblioteca.getTotalItens() + " itens, capacidade " + biblioteca.getCapacidade());

        for (String termo : new String[] {"machado", "CORTIÇO", "revista", "java"}) {
            Item[] achados = biblioteca.buscar(termo);
            System.out.println("Busca por \"" + termo + "\": " + achados.length + " resultado(s)");
            for (Item item : achados) System.out.println("  " + item);
        }
    }
}

interface Catalogavel {
    String getTitulo();

    default boolean combina(String termo) { //> Método default: quem implementa ganha a busca pelo título de graça.
        return getTitulo().toLowerCase().contains(termo.toLowerCase());
    }
}

abstract class Item implements Catalogavel {
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

    @Override
    public String getTitulo() {
        return titulo;
    }

    public int getAno() {
        return ano;
    }

    /** Dias de empréstimo para um aluno. */
    public abstract int diasDeEmprestimo();

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
    public boolean combina(String termo) {
        return super.combina(termo) || autor.toLowerCase().contains(termo.toLowerCase()); //> Reaproveita a busca pelo título e acrescenta o autor.
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
    ALUNO(3, 1),
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
        return item.diasDeEmprestimo() * fatorDePrazo;
    }
}

final class Usuario {
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

class Biblioteca {
    private Item[] acervo = new Item[4];
    private int totalItens;

    public void cadastrar(Item... itens) { //> Varargs: aceita quantos itens vierem, como um array.
        for (Item item : itens) {
            if (contem(item)) continue;
            if (totalItens == acervo.length) acervo = Arrays.copyOf(acervo, acervo.length * 2); //> Cheio: um array com o dobro do tamanho recebe a cópia.
            acervo[totalItens++] = item;
        }
    }

    public boolean contem(Item item) {
        for (int i = 0; i < totalItens; i++) {
            if (acervo[i].equals(item)) return true;
        }
        return false;
    }

    public int getTotalItens() {
        return totalItens;
    }

    public int getCapacidade() {
        return acervo.length;
    }

    public Item[] buscar(String termo) {
        Item[] achados = new Item[totalItens];
        int n = 0;
        for (int i = 0; i < totalItens; i++) {
            if (acervo[i].combina(termo)) achados[n++] = acervo[i];
        }
        return Arrays.copyOf(achados, n); //> Devolve um array do tamanho certo, sem posições vazias.
    }
}
```

```saida
Capacidade inicial: 4
4 itens, capacidade 4
5 itens, capacidade 8
Busca por "machado": 2 resultado(s)
  L-001 Dom Casmurro (1899), de Machado de Assis
  L-002 Memórias Póstumas de Brás Cubas (1881), de Machado de Assis
Busca por "CORTIÇO": 1 resultado(s)
  L-003 O Cortiço (1890), de Aluísio Azevedo
Busca por "revista": 1 resultado(s)
  R-001 Revista Ponto e Vírgula (2026), edição 42
Busca por "java": 0 resultado(s)
```

**Por que assim:**

- `cadastrar` confere duplicatas com `contem`, que usa o `equals` da etapa 1: o segundo `L-001` some sem barulho. Ignorar em silêncio é uma escolha; um sistema de verdade provavelmente avisaria, e na próxima etapa você vai ver como devolver esse tipo de resposta.
- `buscar` devolve uma **cópia** do tamanho certo, nunca o array interno. Se devolvesse `acervo`, quem chamou poderia escrever nele e bagunçar a biblioteca por fora, e veria as posições `null` do fim.
- `super.combina(termo)` dentro de `Livro` chama o método default que `Item` herdou da interface. O livro estende a busca, não a reescreve.
- A busca percorre o acervo inteiro a cada chamada, O(n). Para uma biblioteca comunitária, com alguns milhares de itens, é instantâneo; para milhões, seria preciso um índice, como as tabelas hash do episódio [Árvores e tabelas hash](/assistir/aprendiz-t4-e05).
