import { CopyIcon, DownloadSimpleIcon, TrashIcon, UploadSimpleIcon } from '@phosphor-icons/react';
import { useRef, useState, type CSSProperties } from 'react';
import { Avatar, AVATARES } from '../components/Marca';
import { PROVAS, type Prova } from '../content/types';
import { ACENTOS, TEMAS, temaEfetivo, useAparencia } from '../lib/aparencia';
import { METAS, useProgresso, usePerfil, useStore } from '../lib/store';

function Interruptor({ ligado, mudar, rotulo, texto }: { ligado: boolean; mudar: (v: boolean) => void; rotulo: string; texto: string }) {
  return (
    <label className="interruptor">
      <span className="interruptor-texto">
        <strong>{rotulo}</strong>
        <span>{texto}</span>
      </span>
      <input type="checkbox" role="switch" checked={ligado} onChange={(e) => mudar(e.target.checked)} />
      <i aria-hidden />
    </label>
  );
}

export function Conta() {
  const perfil = usePerfil()!;
  const progresso = useProgresso();
  const editar = useStore((s) => s.editarPerfil);
  const importar = useStore((s) => s.importar);
  const zerar = useStore((s) => s.zerarProgresso);
  const removerReporte = useStore((s) => s.removerReporte);
  const [nome, setNome] = useState(perfil.nome);
  const [aviso, setAviso] = useState<string | null>(null);
  const arquivo = useRef<HTMLInputElement>(null);
  const { tema, acento, mudarTema, mudarAcento } = useAparencia();
  const claro = temaEfetivo(tema) === 'claro';

  const exportar = () => {
    const s = useStore.getState();
    const blob = new Blob([JSON.stringify({ versao: 1, perfis: s.perfis, progresso: s.progresso }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `javaflix-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const textoReportes = progresso.reportes
    .map((r) => `- ${r.exercicio}: ${r.motivo}${r.texto ? `. ${r.texto}` : ''}`)
    .join('\n');

  return (
    <div className="pagina conta">
      <h1 className="titulo-pagina">Conta</h1>

      <section className="conta-secao">
        <h2>Perfil</h2>
        <div className="conta-perfil">
          <Avatar indice={perfil.avatar} tamanho={88} />
          <div className="campo">
            <label htmlFor="conta-nome">Nome</label>
            <input
              id="conta-nome"
              className="input"
              value={nome}
              maxLength={24}
              onChange={(e) => setNome(e.target.value)}
              onBlur={() => nome.trim() && editar(perfil.id, { nome: nome.trim() })}
            />
          </div>
        </div>
        <div className="avatares">
          {AVATARES.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`avatar-opcao ${perfil.avatar === i ? 'ativo' : ''}`}
              onClick={() => editar(perfil.id, { avatar: i })}
              aria-label={`Avatar ${i + 1}`}
              aria-pressed={perfil.avatar === i}
            >
              <Avatar indice={i} tamanho={48} />
            </button>
          ))}
        </div>
      </section>

      <section className="conta-secao">
        <h2>Prova alvo</h2>
        <p className="conta-texto">Muda quais episódios e questões aparecem. O progresso continua o mesmo.</p>
        <div className="provas-opcoes compacto">
          {(Object.keys(PROVAS) as Prova[]).map((p) => (
            <button
              type="button"
              key={p}
              className={`prova-opcao ${perfil.prova === p ? 'ativa' : ''}`}
              onClick={() => editar(perfil.id, { prova: p })}
              aria-pressed={perfil.prova === p}
            >
              <span className="prova-opcao-codigo">{PROVAS[p].codigo}</span>
              <span className="prova-opcao-java">Java {PROVAS[p].java}</span>
              <span className="prova-opcao-ficha">
                {PROVAS[p].questoes} questões, {PROVAS[p].minutos} min
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="conta-secao">
        <h2>Meta diária</h2>
        <div className="metas compacto">
          {METAS.map((m) => (
            <button
              type="button"
              key={m.xp}
              className={`meta-opcao ${perfil.meta === m.xp ? 'ativa' : ''}`}
              onClick={() => editar(perfil.id, { meta: m.xp })}
              aria-pressed={perfil.meta === m.xp}
            >
              <strong>{m.nome}</strong>
              <span className="meta-xp">{m.xp} XP por dia</span>
            </button>
          ))}
        </div>
      </section>

      <section className="conta-secao">
        <h2>Aparência</h2>
        <p className="conta-texto">Vale para este navegador, em todos os perfis. Os blocos de código continuam escuros nos dois temas.</p>
        <div className="segmentado" role="group" aria-label="Tema">
          {TEMAS.map((t) => (
            <button type="button" key={t.id} aria-pressed={tema === t.id} onClick={() => mudarTema(t.id)}>
              {t.nome}
            </button>
          ))}
        </div>
        <div className="acentos" role="group" aria-label="Cor de destaque">
          {ACENTOS.map((a) => (
            <button
              type="button"
              key={a.id}
              className={`acento ${acento === a.id ? 'ativo' : ''}`}
              aria-pressed={acento === a.id}
              onClick={() => mudarAcento(a.id)}
              style={{ '--amostra': claro ? a.claro : a.escuro } as CSSProperties}
            >
              <i aria-hidden /> {a.nome}
            </button>
          ))}
        </div>
      </section>

      <section className="conta-secao">
        <h2>Preferências</h2>
        <div className="interruptores">
          <Interruptor
            ligado={perfil.config.som}
            mudar={(v) => editar(perfil.id, { config: { ...perfil.config, som: v } })}
            rotulo="Sons"
            texto="Efeitos curtos ao acertar, errar e bater a meta."
          />
          <Interruptor
            ligado={perfil.config.sonsMeme !== false}
            mudar={(v) => editar(perfil.id, { config: { ...perfil.config, sonsMeme: v } })}
            rotulo="Sons de meme"
            texto="No acerto e no erro, um meme sorteado (do myinstants, precisa de internet). Desligado, volta o som discreto."
          />
          <Interruptor
            ligado={perfil.config.autoplay}
            mudar={(v) => editar(perfil.id, { config: { ...perfil.config, autoplay: v } })}
            rotulo="Próximo episódio automático"
            texto="Nos créditos, o próximo episódio começa depois de 10 segundos."
          />
          <Interruptor
            ligado={perfil.config.modoLivre}
            mudar={(v) => editar(perfil.id, { config: { ...perfil.config, modoLivre: v } })}
            rotulo="Modo livre"
            texto="Libera todos os cargos e provas sem exigir promoção. Bom para revisar quem já sabe."
          />
        </div>
      </section>

      <section className="conta-secao">
        <h2>Erros reportados</h2>
        {progresso.reportes.length === 0 ? (
          <p className="conta-texto">Nenhum reporte. Use o botão “Reportar erro” em qualquer questão que parecer errada.</p>
        ) : (
          <>
            <p className="conta-texto">
              Copie a lista e cole no agente que gera o conteúdo, pedindo para corrigir as questões e rodar <code>npm run verify</code>.
            </p>
            <ul className="reportes">
              {progresso.reportes.map((r) => (
                <li key={r.id}>
                  <code>{r.exercicio}</code>
                  <span>
                    {r.motivo}
                    {r.texto && `: ${r.texto}`}
                  </span>
                  <button type="button" className="btn-redondo" onClick={() => removerReporte(r.id)} aria-label="Remover reporte">
                    <TrashIcon size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-linha btn-sm"
              onClick={() => {
                void navigator.clipboard?.writeText(`Corrija estas questões da Javaflix e rode npm run verify:\n${textoReportes}`);
                setAviso('Lista copiada.');
              }}
            >
              <CopyIcon size={16} /> Copiar lista
            </button>
          </>
        )}
      </section>

      <section className="conta-secao">
        <h2>Backup</h2>
        <p className="conta-texto">O progresso fica salvo neste navegador. Exporte de vez em quando para não perder, ou para levar para outro computador.</p>
        <div className="conta-botoes">
          <button type="button" className="btn btn-linha btn-sm" onClick={exportar}>
            <DownloadSimpleIcon size={16} /> Exportar progresso
          </button>
          <button type="button" className="btn btn-linha btn-sm" onClick={() => arquivo.current?.click()}>
            <UploadSimpleIcon size={16} /> Importar backup
          </button>
          <input
            ref={arquivo}
            type="file"
            accept="application/json"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                importar(await f.text());
                setAviso('Backup importado. Escolha o perfil.');
                window.location.href = '/perfis';
              } catch (err) {
                setAviso((err as Error).message);
              }
            }}
          />
          <button
            type="button"
            className="btn btn-linha btn-sm perigo"
            onClick={() => {
              if (confirm('Zerar todo o progresso deste perfil? Não dá para desfazer.')) {
                zerar();
                setAviso('Progresso zerado.');
              }
            }}
          >
            <TrashIcon size={16} /> Zerar progresso
          </button>
        </div>
        {aviso && <p className="conta-aviso">{aviso}</p>}
      </section>
    </div>
  );
}
