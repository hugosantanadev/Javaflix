A solução final: o construtor público de `Usuario` e os quatro testes. A saída é a do `./mvnw test` real, sem os tempos:

**`Usuario.java`**

```java
package br.com.ipe.carteira;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import java.math.BigDecimal;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String documento;
    private String email;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    private BigDecimal saldo;

    @Version
    private long versao;

    protected Usuario() {
    }

    public Usuario(String nome, String documento, String email, TipoUsuario tipo, BigDecimal saldo) {
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public TipoUsuario getTipo() {
        return tipo;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void debitar(BigDecimal valor) {
        if (tipo == TipoUsuario.LOJISTA) {
            throw new RegraDeNegocioException("lojistas só recebem transferências");
        }
        if (saldo.compareTo(valor) < 0) {
            throw new RegraDeNegocioException("saldo insuficiente");
        }
        saldo = saldo.subtract(valor);
    }

    public void creditar(BigDecimal valor) {
        saldo = saldo.add(valor);
    }
}
```

**`test/TransferenciaIntegracaoTest.java`**

```java
package br.com.ipe.carteira;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

@SpringBootTest
@AutoConfigureMockMvc
class TransferenciaIntegracaoTest {

    @Autowired MockMvcTester mvc;
    @Autowired JdbcTemplate jdbc;
    @MockitoBean Autorizador autorizador;
    @MockitoBean Notificador notificador;

    @BeforeEach //> Sem @Transactional no teste: o AFTER_COMMIT precisa do commit.
    void restaurarSaldos() {
        jdbc.update("delete from transferencias");
        jdbc.update("update usuarios set saldo = 500.00 where id = 1");
        jdbc.update("update usuarios set saldo = 50.00 where id = 2");
    }

    BigDecimal saldo(long id) {
        return jdbc.queryForObject("select saldo from usuarios where id = ?", BigDecimal.class, id);
    }

    @Test
    void transferenciaGravaOsSaldosENotificaDepoisDoCommit() {
        when(autorizador.autoriza(any())).thenReturn(true);

        assertThat(mvc.post().uri("/transferencias").contentType(MediaType.APPLICATION_JSON)
                .content("{\"valor\": 100.00, \"pagador\": 1, \"recebedor\": 2}"))
                .hasStatus(201);
        assertThat(saldo(1)).isEqualByComparingTo("400.00");
        assertThat(saldo(2)).isEqualByComparingTo("150.00");
        verify(notificador).notificar(any());
    }

    @Test
    void negadaDesfazTudoENaoNotifica() {
        when(autorizador.autoriza(any())).thenReturn(false);

        assertThat(mvc.post().uri("/transferencias").contentType(MediaType.APPLICATION_JSON)
                .content("{\"valor\": 100.00, \"pagador\": 1, \"recebedor\": 2}"))
                .hasStatus(422);
        assertThat(saldo(1)).isEqualByComparingTo("500.00");
        assertThat(saldo(2)).isEqualByComparingTo("50.00");
        assertThat(jdbc.queryForObject("select count(*) from transferencias", Integer.class)).isZero();
        verify(notificador, never()).notificar(any()); //> A metade da regra que mais quebra sem ninguém ver.
    }
}
```

**`test/TransferenciaServiceTest.java`**

```java
package br.com.ipe.carteira;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

@ExtendWith(MockitoExtension.class)
class TransferenciaServiceTest {

    @Mock UsuarioRepository usuarios;
    @Mock TransferenciaRepository transferencias;
    @Mock Autorizador autorizador;
    @Mock ApplicationEventPublisher eventos;

    TransferenciaService service;
    Usuario ana;
    Usuario bruno;

    @BeforeEach
    void preparar() {
        Clock fixo = Clock.fixed(Instant.parse("2026-10-31T12:00:00Z"), ZoneOffset.UTC);
        service = new TransferenciaService(usuarios, transferencias, autorizador, eventos, fixo);
        ana = new Usuario("Ana", "12345678909", "ana@exemplo.com", TipoUsuario.COMUM, new BigDecimal("500.00"));
        bruno = new Usuario("Bruno", "98765432100", "bruno@exemplo.com", TipoUsuario.COMUM, new BigDecimal("50.00"));
    }

    @Test
    void transfereEPublicaOEvento() {
        when(usuarios.findById(1L)).thenReturn(Optional.of(ana));
        when(usuarios.findById(2L)).thenReturn(Optional.of(bruno));
        when(autorizador.autoriza(any())).thenReturn(true);
        when(transferencias.save(any())).thenAnswer(i -> i.getArgument(0));

        service.transferir(new NovaTransferencia(new BigDecimal("100.00"), 1L, 2L));

        assertThat(ana.getSaldo()).isEqualByComparingTo("400.00");
        assertThat(bruno.getSaldo()).isEqualByComparingTo("150.00");
        verify(eventos).publishEvent(any(TransferenciaRealizada.class));
    }

    @Test
    void naoAutorizadaNaoSalvaNemAvisa() {
        when(usuarios.findById(1L)).thenReturn(Optional.of(ana));
        when(usuarios.findById(2L)).thenReturn(Optional.of(bruno));
        when(autorizador.autoriza(any())).thenReturn(false);

        assertThatThrownBy(() -> service.transferir(new NovaTransferencia(new BigDecimal("100.00"), 1L, 2L)))
                .hasMessage("transferência não autorizada");
        verify(transferencias, never()).save(any());
        verify(eventos, never()).publishEvent(any());
    }

    @Test
    void mesmoUsuarioNemConsultaOAutorizador() {
        assertThatThrownBy(() -> service.transferir(new NovaTransferencia(BigDecimal.TEN, 1L, 1L)))
                .isInstanceOf(RegraDeNegocioException.class);
        verifyNoInteractions(autorizador, usuarios); //> Nem banco nem rede para uma regra que só olha o pedido.
    }
}
```

**`test/UsuarioRepositoryTest.java`**

```java
package br.com.ipe.carteira;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

@DataJpaTest
class UsuarioRepositoryTest {

    @Autowired
    UsuarioRepository usuarios;

    @Test
    void asMigrationsCriamOsUsuariosDeExemplo() {
        assertThat(usuarios.count()).isEqualTo(3); //> As migrations rodaram, inclusive a dos dados de exemplo.
        assertThat(usuarios.findById(3L)).get().extracting(Usuario::getTipo).isEqualTo(TipoUsuario.LOJISTA);
    }

    @Test
    void documentoRepetidoERecusadoPeloBanco() {
        Usuario copia = new Usuario("Outra Ana", "12345678909", "outra@exemplo.com", TipoUsuario.COMUM, BigDecimal.ZERO);
        assertThatThrownBy(() -> usuarios.saveAndFlush(copia))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}
```

**`test/UsuarioTest.java`**

```java
package br.com.ipe.carteira;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class UsuarioTest {

    Usuario comum(String saldo) {
        return new Usuario("Ana", "12345678909", "ana@exemplo.com", TipoUsuario.COMUM, new BigDecimal(saldo));
    }

    @Test
    void debitarTodoOSaldoZera() {
        Usuario ana = comum("100.00");
        ana.debitar(new BigDecimal("100.00"));
        assertThat(ana.getSaldo()).isEqualByComparingTo("0");
    }

    @Test
    void saldoInsuficienteNaoMudaNada() {
        Usuario ana = comum("100.00");
        assertThatThrownBy(() -> ana.debitar(new BigDecimal("100.01")))
                .isInstanceOf(RegraDeNegocioException.class)
                .hasMessage("saldo insuficiente");
        assertThat(ana.getSaldo()).isEqualByComparingTo("100.00");
    }

    @Test
    void lojistaNaoEnvia() {
        Usuario loja = new Usuario("Loja", "11222333000181", "loja@exemplo.com", TipoUsuario.LOJISTA, new BigDecimal("999.00"));
        assertThatThrownBy(() -> loja.debitar(BigDecimal.ONE))
                .hasMessage("lojistas só recebem transferências");
    }
}
```

A saída dos testes:

```text
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.ipe.carteira.TransferenciaIntegracaoTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.ipe.carteira.TransferenciaServiceTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.ipe.carteira.UsuarioRepositoryTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0 -- in br.com.ipe.carteira.UsuarioTest
[INFO] Tests run: 10, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

**Por que assim:**

- Seis dos dez testes não sobem Spring nenhum e rodam em milissegundos. Só dois sobem a aplicação inteira, e são os que provam o que nenhum outro consegue: o *rollback* de verdade no banco e o aviso depois do *commit*.
- O `TransferenciaServiceTest` usa Mockito para os repositórios e o autorizador, e o `UsuarioTest` usa a entidade de verdade. Mockar a entidade esconderia exatamente as regras que importam.
- Os testes de banco rodam no H2, não no PostgreSQL. Com Docker disponível, o próximo passo é trocar o banco dos testes de integração por um PostgreSQL do Testcontainers, com `@ServiceConnection`, como em [Testcontainers](/assistir/backend-junior-t6-e05).
- Ficou de fora, de propósito: a falha da trava otimista como `409`, a chave de idempotência e a *outbox*. Cite os três no README como próximos passos; mostram que você sabe onde o projeto ainda é frágil.
