A solução da etapa 4. As regras de empréstimo saem uma a uma, cada uma com o seu `return`:

```java executar
import java.util.Arrays;

public class BibliotecaApp {
    public static void main(String[] args) {
        Biblioteca biblioteca = new Biblioteca();
        biblioteca.cadastrar(
                new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis"),
                new Livro("L-002", "Memórias Póstumas de Brás Cubas", 1881, "Machado de Assis"),
                new Livro("L-003", "O Cortiço", 1890, "Aluísio Azevedo"),
                new Revista("R-001", "Revista Ponto e Vírgula", 2026, 42));

        Usuario ana = new Usuario("Ana", TipoUsuario.ALUNO);
        Usuario rui = new Usuario("Rui", TipoUsuario.PROFESSOR);

        System.out.println("Dia 1");
        System.out.println("Ana pega L-001: " + biblioteca.emprestar("L-001", ana, 1).getMensagem());
        System.out.println("Rui pega L-001: " + biblioteca.emprestar("L-001", rui, 1).getMensagem());
        System.out.println("Ana pega L-002: " + biblioteca.emprestar("L-002", ana, 1).getMensagem());
        System.out.println("Ana pega L-003: " + biblioteca.emprestar("L-003", ana, 1).getMensagem());
        System.out.println("Ana pega R-001: " + biblioteca.emprestar("R-001", ana, 1).getMensagem());
        System.out.println("Rui pega X-999: " + biblioteca.emprestar("X-999", rui, 1).getMensagem());

        System.out.println();
        System.out.println("Dia 14");
        System.out.println("L-002: " + biblioteca.devolver("L-002", 14));
        System.out.println();
        System.out.println("Dia 20");
        System.out.println("L-001: " + biblioteca.devolver("L-001", 20));
        System.out.println("R-001: " + biblioteca.devolver("R-001", 20));
        System.out.println("Multas recebidas: " + Moeda.formatar(biblioteca.getMultasRecebidas()));
    }
}

interface Catalogavel {
    String getTitulo();

    default boolean combina(String termo) {
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

    /** Multa por dia de atraso, em centavos. */
    public abstract long multaDiaria();

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
    public long multaDiaria() {
        return 100;
    }

    @Override
    public boolean combina(String termo) {
        return super.combina(termo) || autor.toLowerCase().contains(termo.toLowerCase());
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
    public long multaDiaria() {
        return 50;
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

enum Resultado {
    OK("Empréstimo registrado."),
    NAO_ENCONTRADO("Item não encontrado no acervo."),
    INDISPONIVEL("O item já está emprestado."),
    LIMITE_ATINGIDO("O usuário chegou ao limite de empréstimos.");

    private final String mensagem;

    Resultado(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getMensagem() {
        return mensagem;
    }
}

class Emprestimo {
    private final Item item;
    private final Usuario usuario;
    private final int diaInicio;
    private final int prazo;

    Emprestimo(Item item, Usuario usuario, int diaInicio) {
        this.item = item;
        this.usuario = usuario;
        this.diaInicio = diaInicio;
        this.prazo = usuario.getTipo().prazoPara(item);
    }

    public Item getItem() {
        return item;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public int diaLimite() {
        return diaInicio + prazo;
    }

    public int diasDeAtraso(int hoje) {
        return Math.max(0, hoje - diaLimite());
    }

    public long multa(int hoje) {
        return diasDeAtraso(hoje) * item.multaDiaria();
    }
}

final class Moeda {
    private Moeda() {
    }

    static String formatar(long centavos) {
        long resto = centavos % 100;
        return "R$ " + centavos / 100 + "," + (resto < 10 ? "0" : "") + resto;
    }
}

class Biblioteca {
    private Item[] acervo = new Item[4];
    private int totalItens;
    private Emprestimo[] emprestimos = new Emprestimo[4];
    private int totalEmprestimos;
    private long multasRecebidas;

    public void cadastrar(Item... itens) {
        for (Item item : itens) {
            if (contem(item)) continue;
            if (totalItens == acervo.length) acervo = Arrays.copyOf(acervo, acervo.length * 2);
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
        return Arrays.copyOf(achados, n);
    }

    public Resultado emprestar(String codigo, Usuario usuario, int dia) { //> Devolve um enum em vez de imprimir: quem chama decide o que mostrar.
        Item item = itemPorCodigo(codigo);
        if (item == null) return Resultado.NAO_ENCONTRADO;
        if (emprestimoDe(codigo) >= 0) return Resultado.INDISPONIVEL; //> Cada regra que falha sai na hora, com o motivo.
        if (quantosCom(usuario) >= usuario.getTipo().getLimite()) return Resultado.LIMITE_ATINGIDO;
        if (totalEmprestimos == emprestimos.length) emprestimos = Arrays.copyOf(emprestimos, emprestimos.length * 2);
        emprestimos[totalEmprestimos++] = new Emprestimo(item, usuario, dia);
        return Resultado.OK;
    }

    public Recibo devolver(String codigo, int dia) {
        int i = emprestimoDe(codigo);
        if (i < 0) return new Recibo(false, 0);
        long multa = emprestimos[i].multa(dia);
        multasRecebidas += multa;
        emprestimos[i] = emprestimos[totalEmprestimos - 1]; //> Remove trocando pelo último: rápido, mas muda a ordem.
        emprestimos[--totalEmprestimos] = null;
        return new Recibo(true, multa);
    }
    public long getMultasRecebidas() {
        return multasRecebidas;
    }

    private Item itemPorCodigo(String codigo) {
        for (int i = 0; i < totalItens; i++) {
            if (acervo[i].getCodigo().equals(codigo)) return acervo[i];
        }
        return null;
    }

    private int emprestimoDe(String codigo) {
        for (int i = 0; i < totalEmprestimos; i++) {
            if (emprestimos[i].getItem().getCodigo().equals(codigo)) return i;
        }
        return -1;
    }

    private int quantosCom(Usuario usuario) {
        int n = 0;
        for (int i = 0; i < totalEmprestimos; i++) {
            if (emprestimos[i].getUsuario() == usuario) n++;
        }
        return n;
    }

    static class Recibo { //> Classe aninhada: só existe como resposta da Biblioteca.
        private final boolean devolvido;
        private final long multa;

        Recibo(boolean devolvido, long multa) {
            this.devolvido = devolvido;
            this.multa = multa;
        }

        public boolean isDevolvido() {
            return devolvido;
        }

        public long getMulta() {
            return multa;
        }

        @Override
        public String toString() {
            if (!devolvido) return "não estava emprestado";
            return multa == 0 ? "devolvido no prazo" : "devolvido com multa de " + Moeda.formatar(multa);
        }
    }
}
```

```saida
Dia 1
Ana pega L-001: Empréstimo registrado.
Rui pega L-001: O item já está emprestado.
Ana pega L-002: Empréstimo registrado.
Ana pega L-003: Empréstimo registrado.
Ana pega R-001: O usuário chegou ao limite de empréstimos.
Rui pega X-999: Item não encontrado no acervo.

Dia 14
L-002: devolvido no prazo

Dia 20
L-001: devolvido com multa de R$ 5,00
R-001: não estava emprestado
Multas recebidas: R$ 5,00
```

**Por que assim:**

- A ordem das checagens em `emprestar` vai do problema mais básico ao mais específico: o item existe? está livre? o usuário pode levar mais um? Só depois de todas passarem algo muda.
- `devolver` tira o empréstimo do array trocando-o pelo último e apagando a última posição. É O(1), mas muda a ordem dos empréstimos ativos; se a ordem importasse, seria preciso deslocar todos os seguintes uma posição.
- `quantosCom` compara usuários com `==`. Funciona porque o roteiro usa sempre o mesmo objeto para a Ana. Dois objetos `Usuario("Ana", ALUNO)` criados em lugares diferentes contariam como pessoas diferentes; num sistema real, o usuário teria um identificador e um `equals` por ele, como os itens.
- `Moeda` tem o construtor `private`: é uma classe só de métodos `static`, e criar um objeto dela não faria sentido.
