import { useStore } from './store';

/** Efeitos sonoros sintetizados com WebAudio: nada de arquivos, volume baixo. */

let ctx: AudioContext | null = null;

function configAtual() {
  const s = useStore.getState();
  return s.perfis.find((p) => p.id === s.ativo)?.config;
}

function audio(): AudioContext | null {
  const config = configAtual();
  if (config && !config.som) return null;
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null;
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function nota(freq: number, inicio: number, dur: number, tipo: OscillatorType = 'sine', volume = 0.08) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + inicio;
  const osc = a.createOscillator();
  const ganho = a.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, t);
  ganho.gain.setValueAtTime(0.0001, t);
  ganho.gain.exponentialRampToValueAtTime(volume, t + 0.012);
  ganho.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(ganho).connect(a.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/*
 * Sons de meme: tocados direto do myinstants.com, sem cópia no projeto. Precisam de
 * internet; se o áudio falhar, toca o som sintetizado. As listas vêm das páginas de
 * tendência e das buscas por "acertou", "errou", "fail" e "vitória" (conferidas em
 * 2026-10-20), sem sons políticos, sexuais, ofensivos ou "estourados".
 */
const MYINSTANTS = 'https://www.myinstants.com/media/sounds/';
const MEMES_ACERTO = [
  // auditório
  'correct.mp3', 'acertou_By4HwUh.mp3', 'acertou-mizeravijk_eifzvEs.mp3', 'acertou-pergunta.mp3', 'tmp61fq4oi1.mp3',
  'acertou-ah-miseravi.mp3', 'acertou-faustao.mp3', 'acertou.mp3', 'roda-roda-acertou-letra.mp3', 'acertou-mizeravel.mp3',
  'acertouuu.mp3', 'acertou-mizeravi_PXmHRFq.mp3', 'renan-acertou-mizeravel_1.mp3', 'certo_B0r5R3N.mp3',
  'certa-resposta-show-do-milhao.mp3', 'certa-resposta.mp3', 'tmp95w91z1r.mp3', 'resposta-certa-roda-a-roda.mp3',
  'certa-resposta-silvio.mp3', 'resposta-certa.mp3', 'resposta-certa-sbt.mp3',
  // aplausos e parabéns
  'aplausos-eeee.mp3', 'whatsapp-audio-2017-07-05-at-09.mp3', 'aplausos-yeee.mp3', 'manoel-gomes-parabens.mp3',
  'caneta-azul-meus-parabens.mp3', 'vou-resumir-com-duas-palavras_160k.mp3', 'parabens-da-xuxa.mp3', 'announcer-congratulations.mp3',
  // vitória
  'ayrton-senna-tema-da-vitoria.mp3', 'super-smash-bros-mario-luigi-victory.mp3', 'mvssf-win.mp3',
  // memes
  'hey-thats-pretty-good.mp3', 'yes-lara-voice.mp3', 'kids-saying-yay-sound-effect_3.mp3', 'wow_8.mp3', 'anime-wow-sound-effect.mp3',
  'cebolinha-elogios.mp3', 'whatsapp-audio-2018-02-27-at-23.mp3', 'foi-quando-gyro-finalmente-entendeu.mp3',
  '5-5-5-5-ai-e-muito-facil-professor.mp3', 'slc-tio-mo-molezinha.mp3', 'smzinho-meu-heroi-nao-usa-capa.mp3',
  'ele-fezz-de-novo-incansavel.mp3', 'me-chama-de-lord.mp3', 'rizz-sound-effect.mp3', 'du-bist-gut-genug.mp3', 'auraa.mp3',
  'confirma-urna.mp3', 'efeitos-sonoros-brasil-sil-sil-rede-globo.mp3', 'o-homem-uma-maquina-uma-besta-enjaulada.mp3',
];
const MEMES_ERRO = [
  // auditório
  'faustao-errou.mp3', 'errou-rude.mp3', 'errou_3.mp3', 'errou-efeito-sonoro.mp3', 'vinheta-faustao-errou-rede-globo.mp3',
  'quepena.mp3', 'ah-bicho-ruim-meme-original.mp3', 'errrrou.mp3', 'errou-show-do-milhao.mp3',
  'erou-erouuu-faustao-e-o-pais-da-europa-mp3cut.mp3', 'roda-roda-errou-letra.mp3', 'silvio-santos-resposta-errada.mp3',
  'errada-portiolli.mp3', 'ninguem-acertou.mp3',
  // buzinas de fail
  'fail-quaquaqua.mp3', 'spongebob-fail.mp3', 'fail-sound-effect.mp3', 'titanic-flute-fail.mp3',
  'sad-trombone-sound-effect-wah-wah-wah-fail-sound-fail-horns.mp3', 'thepriceisright-loserhorns.mp3',
  'wrong-buzzer-sound-effect.mp3', 'priceisrightfail_1.mp3', 'peppa-pig-fail.mp3', 'lost-a-life-game-over-sound-effect-8-bits.mp3',
  'error_CDOxCYm.mp3', 'avast-ameaca-detectada.mp3', '999-social-credit-siren.mp3', 'metal-pipe-clang.mp3',
  // fahhh e companhia
  'faaah.mp3', 'original-fah.mp3', 'fahhhhhhhhhhhhhh.mp3', 'fahhh_KcgAXfs.mp3', 'ive-got-this-faaaaaaaaahhhhh.mp3',
  // memes
  'cat-laugh-meme-1.mp3', 'voce-nao-tem-aura.mp3', 'long-brain-fart.mp3', 'tf_nemesis.mp3', 'movie_1.mp3', 'vine-boom.mp3',
  'tema-triste-chaves.mp3', 'miau-triste.mp3', 'de-novo-nao.mp3', 'eu-nao-acredito-nao-charlene.mp3',
  'dun-dun-dun-sound-effect-brass_8nFBccR.mp3', 'risada_quico.mp3', 'risada-do-gato.mp3', 'baby-laughing-meme.mp3',
  'plankton-oooooh.mp3', 'brutal-acabou-pro-beta-globo.mp3', 'ta-travaaando-free-fire.mp3', 'shocked-sound-effect.mp3',
  'discord_leave_sound_effect_download.mp3', 'nao-sobrou-nada_fZprXSC.mp3', 'seloco-nao-compensa.mp3', 'seu-madruga-nossa.mp3',
];
/** Um meme nunca toca mais que isso: alguns são trechos de música. */
const DURACAO_MAXIMA_MS = 4500;
/** Quantos sons recentes ficam fora do sorteio, inclusive depois de recarregar a página. */
const SEM_REPETIR = 25;

function lerRecentes(chave: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(chave) ?? '[]');
  } catch {
    return [];
  }
}

function sorteador(lista: string[], nome: string) {
  const chave = `javaflix-memes-${nome}`;
  return () => {
    const recentes = lerRecentes(chave);
    const evitar = new Set(recentes.slice(-Math.min(SEM_REPETIR, lista.length - 1)));
    const livres = lista.filter((f) => !evitar.has(f));
    const escolhido = livres[Math.floor(Math.random() * livres.length)];
    try {
      localStorage.setItem(chave, JSON.stringify([...recentes, escolhido].slice(-SEM_REPETIR)));
    } catch {
      // sem armazenamento, o sorteio só não lembra entre recargas
    }
    return escolhido;
  };
}
const proximoAcerto = sorteador(MEMES_ACERTO, 'acerto');
const proximoErro = sorteador(MEMES_ERRO, 'erro');
let tocando: HTMLAudioElement | null = null;
let corte: number | undefined;

/** Toca um meme; devolve false se os memes estiverem desligados, para usar o som sintetizado. */
function meme(arquivo: string, reserva: () => void): boolean {
  const config = configAtual();
  if (config && (!config.som || config.sonsMeme === false)) return false;
  if (typeof Audio === 'undefined') return false;
  tocando?.pause();
  window.clearTimeout(corte);
  const a = new Audio(MYINSTANTS + arquivo);
  a.volume = 0.55;
  a.addEventListener('error', reserva, { once: true });
  a.play().catch(reserva);
  corte = window.setTimeout(() => a.pause(), DURACAO_MAXIMA_MS);
  tocando = a;
  return true;
}

function certoSintetizado(combo: number) {
  const base = 660 * Math.pow(2, Math.min(combo - 1, 6) / 12);
  nota(base, 0, 0.14, 'triangle', 0.07);
  nota(base * 1.5, 0.07, 0.22, 'triangle', 0.06);
}

function erradoSintetizado() {
  nota(196, 0, 0.18, 'sawtooth', 0.025);
  nota(155, 0.09, 0.26, 'sawtooth', 0.022);
}

export const sfx = {
  certo(combo = 1) {
    if (!meme(proximoAcerto(), () => certoSintetizado(combo))) certoSintetizado(combo);
  },
  errado() {
    if (!meme(proximoErro(), erradoSintetizado)) erradoSintetizado();
  },
  clique() {
    nota(1200, 0, 0.03, 'square', 0.012);
  },
  conclusao() {
    [523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.09, 0.32, 'triangle', 0.06));
  },
  conquista() {
    [784, 988, 1175, 1568].forEach((f, i) => nota(f, i * 0.06, 0.4, 'sine', 0.05));
  },
  ofensiva() {
    [392, 523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.07, 0.36, 'triangle', 0.055));
  },
};
