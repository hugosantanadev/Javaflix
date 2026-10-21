import {
  CaretDownIcon,
  FireIcon,
  GearIcon,
  SnowflakeIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { PROVAS } from '../content/types';
import { diaLocal, nomeDoDia, somarDias } from '../lib/datas';
import { estadoOfensiva, revisoesPendentes, useProgresso, usePerfil, useStore } from '../lib/store';
import { Avatar, Wordmark } from './Marca';

const LINKS = [
  { to: '/', rotulo: 'Início', fim: true },
  { to: '/trilha', rotulo: 'Carreira' },
  { to: '/projetos', rotulo: 'Projetos' },
  { to: '/revisao', rotulo: 'Revisão' },
  { to: '/simulado', rotulo: 'Simulados' },
  { to: '/videos', rotulo: 'Vídeos' },
  { to: '/materiais', rotulo: 'Materiais' },
];

function useFora(ref: React.RefObject<HTMLElement | null>, fechar: () => void, aberto: boolean) {
  useEffect(() => {
    if (!aberto) return;
    const f = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) fechar();
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar();
    document.addEventListener('pointerdown', f);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', f);
      document.removeEventListener('keydown', esc);
    };
  }, [aberto, fechar, ref]);
}

export function Navbar() {
  const [solida, setSolida] = useState(false);
  const sentinela = useRef<HTMLDivElement>(null);
  const loc = useLocation();
  const progresso = useProgresso();
  const pendentes = revisoesPendentes(progresso).length;

  useEffect(() => {
    const el = sentinela.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSolida(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [loc.pathname]);

  return (
    <>
      <div ref={sentinela} className="nav-sentinela" aria-hidden />
      <header className={`nav ${solida ? 'solida' : ''}`}>
        <Link to="/" className="nav-marca" aria-label="Javaflix, início">
          <Wordmark tamanho={28} />
        </Link>
        <nav className="nav-links" aria-label="Principal">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.fim} className={({ isActive }) => (isActive ? 'ativo' : '')}>
              {l.rotulo}
              {l.to === '/revisao' && pendentes > 0 && <span className="nav-badge">{pendentes}</span>}
            </NavLink>
          ))}
        </nav>
        <MenuNavegar pendentes={pendentes} />
        <div className="nav-direita">
          <Ofensiva />
          <MenuPerfil />
        </div>
      </header>
    </>
  );
}

function MenuNavegar({ pendentes }: { pendentes: number }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const loc = useLocation();
  useFora(ref, () => setAberto(false), aberto);
  useEffect(() => setAberto(false), [loc.pathname]);
  const atual = LINKS.find((l) => (l.fim ? loc.pathname === l.to : loc.pathname.startsWith(l.to)))?.rotulo ?? 'Navegar';
  return (
    <div className="nav-navegar" ref={ref}>
      <button type="button" onClick={() => setAberto((a) => !a)} aria-expanded={aberto}>
        {atual} <CaretDownIcon size={14} weight="fill" />
      </button>
      {aberto && (
        <div className="menu menu-navegar">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.fim}>
              {l.rotulo}
              {l.to === '/revisao' && pendentes > 0 && <span className="nav-badge">{pendentes}</span>}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function Ofensiva() {
  const progresso = useProgresso();
  const perfil = usePerfil()!;
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useFora(ref, () => setAberto(false), aberto);
  const hoje = diaLocal();
  const { dias, status, faltam } = estadoOfensiva(progresso.ofensiva, hoje);
  const xpHoje = progresso.xpPorDia[hoje] ?? 0;
  const pct = Math.min(1, xpHoje / perfil.meta);
  const semana = Array.from({ length: 7 }, (_, i) => somarDias(hoje, i - 6));
  const congelados = new Set(progresso.ofensiva.diasCongelados);

  return (
    <div className="ofensiva" ref={ref}>
      <button
        type="button"
        className={`ofensiva-botao ${status}`}
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-label={`Ofensiva de ${dias} dias`}
      >
        <span className="ofensiva-anel" style={{ '--pct': pct } as React.CSSProperties}>
          <FireIcon size={18} weight={status === 'feita' ? 'fill' : 'bold'} />
        </span>
        <span className="ofensiva-num">{dias}</span>
      </button>
      {aberto && (
        <div className="menu ofensiva-painel">
          <div className="ofensiva-topo">
            <FireIcon size={34} weight="fill" className={status === 'feita' ? 'acesa' : ''} />
            <div>
              <strong>{dias === 1 ? '1 dia' : `${dias} dias`} de ofensiva</strong>
              <span>
                {status === 'feita' && 'Meta de hoje batida. Até amanhã.'}
                {status === 'pendente' && 'Bata a meta de hoje para manter a sequência.'}
                {status === 'nova' && 'Bata a meta diária para acender a primeira chama.'}
                {status === 'protegida' &&
                  `Você ficou ${faltam} dia(s) fora, mas tem congelamento. Bata a meta hoje para salvar.`}
                {status === 'perdida' && 'A sequência zerou. Bata a meta hoje para recomeçar.'}
              </span>
            </div>
          </div>
          <div className="ofensiva-semana">
            {semana.map((d) => {
              const feito = (progresso.xpPorDia[d] ?? 0) >= perfil.meta;
              const gelo = congelados.has(d);
              return (
                <div key={d} className={`dia ${feito ? 'feito' : ''} ${gelo ? 'gelo' : ''} ${d === hoje ? 'hoje' : ''}`}>
                  <span>{nomeDoDia(d).slice(0, 3)}</span>
                  <i>{gelo ? <SnowflakeIcon size={14} weight="bold" /> : feito ? <FireIcon size={14} weight="fill" /> : null}</i>
                </div>
              );
            })}
          </div>
          <div className="ofensiva-meta">
            <div className="ofensiva-meta-linha">
              <span>Meta diária</span>
              <strong>
                {xpHoje} / {perfil.meta} XP
              </strong>
            </div>
            <div className="barra-progresso">
              <span style={{ width: `${pct * 100}%` }} />
            </div>
          </div>
          <div className="ofensiva-rodape">
            <span>
              <SnowflakeIcon size={16} weight="bold" /> {progresso.ofensiva.congelamentos} de 2 congelamentos
            </span>
            <span>Recorde: {progresso.ofensiva.recorde} dias</span>
          </div>
          <p className="ofensiva-ajuda">A cada 7 dias seguidos você ganha um congelamento, que cobre um dia sem estudo.</p>
        </div>
      )}
    </div>
  );
}

function MenuPerfil() {
  const perfil = usePerfil()!;
  const perfis = useStore((s) => s.perfis);
  const selecionar = useStore((s) => s.selecionarPerfil);
  const editar = useStore((s) => s.editarPerfil);
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  useFora(ref, () => setAberto(false), aberto);

  return (
    <div className="menu-perfil" ref={ref}>
      <button type="button" className="menu-perfil-botao" onClick={() => setAberto((a) => !a)} aria-expanded={aberto} aria-label="Menu do perfil">
        <Avatar indice={perfil.avatar} tamanho={34} />
        <CaretDownIcon size={12} weight="fill" className={aberto ? 'virado' : ''} />
      </button>
      {aberto && (
        <div className="menu menu-perfil-lista">
          <div className="menu-perfil-cabeca">
            <Avatar indice={perfil.avatar} tamanho={40} />
            <div>
              <strong>{perfil.nome}</strong>
              <span>Alvo: {PROVAS[perfil.prova].codigo}</span>
            </div>
          </div>
          {perfis
            .filter((p) => p.id !== perfil.id)
            .map((p) => (
              <button
                type="button"
                key={p.id}
                className="menu-item"
                onClick={() => {
                  selecionar(p.id);
                  sessionStorage.removeItem('javaflix:boot');
                  nav('/');
                }}
              >
                <Avatar indice={p.avatar} tamanho={26} /> {p.nome}
              </button>
            ))}
          <hr />
          <button type="button" className="menu-item" onClick={() => editar(perfil.id, { config: { ...perfil.config, som: !perfil.config.som } })}>
            {perfil.config.som ? <SpeakerHighIcon size={20} /> : <SpeakerSlashIcon size={20} />}
            Som {perfil.config.som ? 'ligado' : 'desligado'}
          </button>
          <Link to="/conta" className="menu-item" onClick={() => setAberto(false)}>
            <GearIcon size={20} /> Conta e preferências
          </Link>
          <Link to="/conquistas" className="menu-item" onClick={() => setAberto(false)}>
            <FireIcon size={20} /> Conquistas e estatísticas
          </Link>
          <button
            type="button"
            className="menu-item"
            onClick={() => {
              selecionar(null);
              nav('/perfis');
            }}
          >
            <UsersIcon size={20} /> Trocar de perfil
          </button>
        </div>
      )}
    </div>
  );
}
