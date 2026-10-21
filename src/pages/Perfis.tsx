import { ArrowLeftIcon, CheckIcon, PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Avatar, AVATARES, Wordmark } from '../components/Marca';
import { PROVAS, type Prova } from '../content/types';
import { METAS, useStore } from '../lib/store';

export function Perfis() {
  const perfis = useStore((s) => s.perfis);
  const selecionar = useStore((s) => s.selecionarPerfil);
  const remover = useStore((s) => s.removerPerfil);
  const nav = useNavigate();
  const [gerenciar, setGerenciar] = useState(false);

  if (perfis.length === 0) return <NovoPerfil primeiro />;

  return (
    <div className="perfis">
      <header className="perfis-topo">
        <Wordmark tamanho={34} />
      </header>
      <div className="perfis-centro surgir">
        <h1>{gerenciar ? 'Gerenciar perfis' : 'Quem vai estudar?'}</h1>
        <ul className="perfis-grade">
          {perfis.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className="perfil-cartao"
                onClick={() => {
                  if (gerenciar) {
                    if (confirm(`Apagar o perfil ${p.nome} e todo o progresso dele?`)) remover(p.id);
                    return;
                  }
                  selecionar(p.id);
                  sessionStorage.removeItem('javaflix:boot');
                  nav('/');
                }}
              >
                <span className="perfil-avatar">
                  <Avatar indice={p.avatar} tamanho={136} />
                  {gerenciar && (
                    <span className="perfil-editar">
                      <PencilSimpleIcon size={36} />
                    </span>
                  )}
                </span>
                <span className="perfil-nome">{p.nome}</span>
                <span className="perfil-prova">{PROVAS[p.prova].codigo}</span>
              </button>
            </li>
          ))}
          {!gerenciar && perfis.length < 5 && (
            <li>
              <button type="button" className="perfil-cartao novo" onClick={() => nav('/perfis/novo')}>
                <span className="perfil-avatar mais">
                  <PlusIcon size={64} />
                </span>
                <span className="perfil-nome">Novo perfil</span>
              </button>
            </li>
          )}
        </ul>
        <button type="button" className="btn btn-linha perfis-gerenciar" onClick={() => setGerenciar((g) => !g)}>
          {gerenciar ? 'Pronto' : 'Gerenciar perfis'}
        </button>
        {gerenciar && <p className="perfis-ajuda">Clique num perfil para apagá-lo.</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function NovoPerfil({ primeiro = false }: { primeiro?: boolean }) {
  const criar = useStore((s) => s.criarPerfil);
  const selecionar = useStore((s) => s.selecionarPerfil);
  const nav = useNavigate();
  const [passo, setPasso] = useState(0);
  const [nome, setNome] = useState('');
  const [avatar, setAvatar] = useState(0);
  const [prova, setProva] = useState<Prova>('830');
  const [meta, setMeta] = useState(60);

  const concluir = () => {
    const id = criar({ nome: nome.trim() || 'Estudante', avatar, prova, meta });
    selecionar(id);
    sessionStorage.removeItem('javaflix:boot');
    nav('/');
  };

  return (
    <div className="perfis onboarding">
      <header className="perfis-topo">
        <Wordmark tamanho={34} />
        {!primeiro && (
          <button type="button" className="btn btn-linha btn-sm" onClick={() => nav('/perfis')}>
            <ArrowLeftIcon size={16} /> Perfis
          </button>
        )}
      </header>

      <div className="onboarding-corpo" key={passo}>
        <ol className="onboarding-passos" aria-label="Passos">
          {['Perfil', 'Prova', 'Ritmo'].map((p, i) => (
            <li key={p} className={i === passo ? 'atual' : i < passo ? 'feito' : ''}>
              {i < passo ? <CheckIcon size={14} weight="bold" /> : i + 1} {p}
            </li>
          ))}
        </ol>

        {passo === 0 && (
          <section className="onboarding-secao surgir">
            {primeiro && <span className="hero-cargo">Primeiro dia na empresa</span>}
            <h1>{primeiro ? 'Bem-vindo à Javaflix' : 'Novo perfil'}</h1>
            <p className="onboarding-texto">
              Você começa como estagiário e é promovido a cada avaliação de desempenho. Cada temporada tem aulas curtas, exercícios
              conferidos no JDK e uma prova no fim.
            </p>
            <div className="campo">
              <label htmlFor="nome">Como você quer ser chamado?</label>
              <input
                id="nome"
                className="input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={24}
                autoFocus
                autoComplete="given-name"
                onKeyDown={(e) => e.key === 'Enter' && nome.trim() && setPasso(1)}
              />
            </div>
            <div className="campo">
              <span className="rotulo">Avatar</span>
              <div className="avatares">
                {AVATARES.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`avatar-opcao ${avatar === i ? 'ativo' : ''}`}
                    onClick={() => setAvatar(i)}
                    aria-label={`Avatar ${i + 1}`}
                    aria-pressed={avatar === i}
                  >
                    <Avatar indice={i} tamanho={64} />
                  </button>
                ))}
              </div>
            </div>
            <div className="onboarding-acoes">
              <button type="button" className="btn btn-play btn-lg" disabled={!nome.trim()} onClick={() => setPasso(1)}>
                Continuar
              </button>
            </div>
          </section>
        )}

        {passo === 1 && (
          <section className="onboarding-secao surgir">
            <h1>Qual certificação é o alvo?</h1>
            <p className="onboarding-texto">
              As três provas compartilham a mesma base. O site marca cada episódio com as provas em que ele cai e esconde as
              questões que não valem para a sua. Dá para trocar depois, em Conta.
            </p>
            <div className="provas-opcoes">
              {(Object.keys(PROVAS) as Prova[]).map((p) => {
                const info = PROVAS[p];
                return (
                  <button type="button" key={p} className={`prova-opcao ${prova === p ? 'ativa' : ''}`} onClick={() => setProva(p)} aria-pressed={prova === p}>
                    <span className="prova-opcao-codigo">{info.codigo}</span>
                    <span className="prova-opcao-java">Java {info.java}</span>
                    <span className="prova-opcao-ficha">
                      {info.questoes} questões, {info.minutos} min, aprovação {info.aprovacao}%
                    </span>
                    <span className="prova-opcao-resumo">{info.resumo.replace(/^Java \d+\. /, '')}</span>
                    {p === '830' && <span className="etiqueta accent">Recomendada</span>}
                  </button>
                );
              })}
            </div>
            <p className="onboarding-nota">
              A 1Z0-830 é a recomendada: Java 17 e 21 são as versões que as vagas mais citam, e já existem livro e simulados para
              ela. Confira os objetivos na página oficial da Oracle antes de marcar a prova.
            </p>
            <div className="onboarding-acoes">
              <button type="button" className="btn btn-linha btn-lg" onClick={() => setPasso(0)}>
                Voltar
              </button>
              <button type="button" className="btn btn-play btn-lg" onClick={() => setPasso(2)}>
                Continuar
              </button>
            </div>
          </section>
        )}

        {passo === 2 && (
          <section className="onboarding-secao surgir">
            <h1>Qual vai ser o seu ritmo?</h1>
            <p className="onboarding-texto">
              Bater a meta diária mantém a ofensiva acesa. A cada 7 dias seguidos você ganha um congelamento, que protege a
              sequência num dia de folga.
            </p>
            <div className="metas">
              {METAS.map((m) => (
                <button type="button" key={m.xp} className={`meta-opcao ${meta === m.xp ? 'ativa' : ''}`} onClick={() => setMeta(m.xp)} aria-pressed={meta === m.xp}>
                  <strong>{m.nome}</strong>
                  <span className="meta-xp">{m.xp} XP por dia</span>
                  <span>{m.texto}</span>
                </button>
              ))}
            </div>
            <div className="onboarding-acoes">
              <button type="button" className="btn btn-linha btn-lg" onClick={() => setPasso(1)}>
                Voltar
              </button>
              <button type="button" className="btn btn-accent btn-lg" onClick={concluir}>
                Começar o estágio
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
