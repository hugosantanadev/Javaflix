Uma solução possível, num arquivo só para caber aqui. No seu projeto, cada classe vai no próprio arquivo, num pacote como `br.com.casadaleitura`.

```java executar
public class BibliotecaApp {
    public static void main(String[] args) {
        Livro dom = new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis");
        Livro outroDom = new Livro("L-001", "Dom Casmurro", 1899, "Machado de Assis");
        Revista revista = new Revista("R-001", "Revista Ponto e Vírgula", 2026, 42);

        System.out.println(dom);
        System.out.println(revista);
        System.out.println("Mesmo objeto? " + (dom == outroDom));
        System.out.println("Mesmo item? " + dom.equals(outroDom));
        System.out.println("Livro igual à revista? " + dom.equals(revista));
        System.out.println("Mesmo hashCode? " + (dom.hashCode() == outroDom.hashCode()));

        Item item = revista; //> Uma referência do tipo Item aponta para um objeto Revista.
        System.out.println("Visto como Item: " + item);
    }
}

abstract class Item { //> abstract: ninguém cria um Item genérico, só livros e revistas.
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

    @Override
    public boolean equals(Object outro) {
        if (this == outro) return true;
        if (!(outro instanceof Item)) return false;
        Item item = (Item) outro;
        return codigo.equals(item.codigo); //> Dois itens são o mesmo quando têm o mesmo código.
    }

    @Override
    public int hashCode() {
        return codigo.hashCode(); //> Iguais pelo equals precisam ter o mesmo hashCode.
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
    public String toString() {
        return super.toString() + ", edição " + edicao;
    }
}
```

```saida
L-001 Dom Casmurro (1899), de Machado de Assis
R-001 Revista Ponto e Vírgula (2026), edição 42
Mesmo objeto? false
Mesmo item? true
Livro igual à revista? false
Mesmo hashCode? true
Visto como Item: R-001 Revista Ponto e Vírgula (2026), edição 42
```

**Por que assim:**

- O `equals` segue o roteiro de sempre: mesma referência, `true` na hora; outro tipo ou `null`, `false` (o `instanceof` já cuida do `null`); senão, compara o que define a identidade, o código.
- Usar `instanceof Item`, e não `getClass()`, faz um livro e uma revista com o mesmo código serem iguais. Aqui isso nunca acontece, porque os códigos têm prefixos diferentes, mas é uma decisão consciente: "mesmo código, mesmo item".
- `Livro` e `Revista` chamam `super.toString()` e só acrescentam o que é delas. Se o formato do código mudar, ele muda num lugar só.
- A última linha imprime o `toString` da `Revista`, embora a variável seja do tipo `Item`: o compilador olha o tipo da variável para saber **se** pode chamar, e a JVM olha o objeto para saber **qual** versão roda.
