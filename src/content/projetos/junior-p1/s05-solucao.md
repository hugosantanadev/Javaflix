A versão final. Compare com a etapa 4: além do `main`, só há duas novidades, a classe `Dvd` e o método `imprimirRelatorio`.

```java executar
import java.util.Arrays;

public class BibliotecaApp {
    public static void main(String[] args) {
        Biblioteca biblioteca = new Biblioteca();
        biblioteca.cadastrar(
                new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis"),
                new Livro("L-002", "Memórias Póstumas de Brás Cubas", 1881, "Machado de Assis"),
                new Livro("L-003", "O Cortiço", 1890, "Aluísio Azevedo"),
                new Revista("R-001", "Revista Ponto e Vírgula", 2026, 42),
                new Dvd("D-001", "Sertão em Movimento", 2019, 95));

        Usuario ana = new Usuario("Ana", TipoUsuario.ALUNO);
        Usuario rui = new Usuario("Rui", TipoUsuario.PROFESSOR);

        System.out.println("Dia 1");
        System.out.println("Ana pega L-001: " + biblioteca.emprestar("L-001", ana, 1).getMensagem());
        System.out.println("Ana pega R-001: " + biblioteca.emprestar("R-001", ana, 1).getMensagem());
        System.out.println("Rui pega D-001: " + biblioteca.emprestar("D-001", rui, 1).getMensagem());
        System.out.println("Rui pega L-003: " + biblioteca.emprestar("L-003", rui, 1).getMensagem());

        System.out.println();
        System.out.println("Relatório do dia 12");
        biblioteca.imprimirRelatorio(12);

        System.out.println();
        System.out.println("Dia 12: devoluções");
        System.out.println("R-001: " + biblioteca.devolver("R-001", 12));
        System.out.println("D-001: " + biblioteca.devolver("D-001", 12));
        System.out.println("L-001: " + biblioteca.devolver("L-001", 12));
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

class Dvd extends Item { //> Tipo novo: nenhuma outra classe precisou mudar.
    private final int minutos;

    Dvd(String codigo, String titulo, int ano, int minutos) {
        super(codigo, titulo, ano);
        this.minutos = minutos;
    }

    @Override
    public int diasDeEmprestimo() {
        return 3;
    }

    @Override
    public long multaDiaria() {
        return 200;
    }

    @Override
    public String toString() {
        return super.toString() + ", " + minutos + " min";
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

    public int diasDeAtraso(int hoje) { //> Math.max impede atraso negativo para quem devolve antes.
        return Math.max(0, hoje - diaLimite());
    }

    public long multa(int hoje) {
        return diasDeAtraso(hoje) * item.multaDiaria(); //> Polimorfismo: cada tipo de item sabe a própria multa.
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

    public Resultado emprestar(String codigo, Usuario usuario, int dia) {
        Item item = itemPorCodigo(codigo);
        if (item == null) return Resultado.NAO_ENCONTRADO;
        if (emprestimoDe(codigo) >= 0) return Resultado.INDISPONIVEL;
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
        emprestimos[i] = emprestimos[totalEmprestimos - 1];
        emprestimos[--totalEmprestimos] = null;
        return new Recibo(true, multa);
    }

    public void imprimirRelatorio(int hoje) { //> Percorre só os empréstimos ativos, de 0 a totalEmprestimos.
        if (totalEmprestimos == 0) {
            System.out.println("Nenhum empréstimo ativo.");
            return;
        }
        for (int i = 0; i < totalEmprestimos; i++) {
            Emprestimo e = emprestimos[i];
            String situacao = e.diasDeAtraso(hoje) == 0
                    ? "no prazo"
                    : e.diasDeAtraso(hoje) + " dias de atraso, multa " + Moeda.formatar(e.multa(hoje));
            System.out.println(e.getItem().getCodigo() + " com " + e.getUsuario() + ", vence no dia " + e.diaLimite() + ": " + situacao);
        }
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

    static class Recibo {
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
Ana pega R-001: Empréstimo registrado.
Rui pega D-001: Empréstimo registrado.
Rui pega L-003: Empréstimo registrado.

Relatório do dia 12
L-001 com Ana (aluno), vence no dia 15: no prazo
R-001 com Ana (aluno), vence no dia 8: 4 dias de atraso, multa R$ 2,00
D-001 com Rui (professor), vence no dia 7: 5 dias de atraso, multa R$ 10,00
L-003 com Rui (professor), vence no dia 29: no prazo

Dia 12: devoluções
R-001: devolvido com multa de R$ 2,00
D-001: devolvido com multa de R$ 10,00
L-001: devolvido no prazo
Multas recebidas: R$ 12,00
```

**Por que assim:**

- O DVD do Rui vence no dia 7: 3 dias vezes o fator 2 do professor, somados ao dia 1. Nenhuma linha de `TipoUsuario` mudou para isso funcionar.
- O relatório chama `diasDeAtraso` duas vezes por empréstimo. Para alguns empréstimos não pesa; se pesasse, uma variável local guardaria o valor. Clareza primeiro, otimização quando houver um motivo medido.
- `imprimirRelatorio` escreve direto no `System.out`, ao contrário de `emprestar`, que devolve um resultado. É uma concessão para caber no projeto: quando este núcleo virar uma API, o relatório deve devolver dados, e quem chama decide o formato, seja texto, JSON ou uma tela.
- O que falta para um sistema real fica bem visível: datas de verdade, usuários com identificador, persistência e exceções para erros inesperados. Cada um tem a sua temporada no Pleno e no Backend Júnior.
