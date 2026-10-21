import type { TemporadaConteudo } from '../../types';
import e01 from './e01';
import e02 from './e02';
import e03 from './e03';
import e04 from './e04';
import e05 from './e05';
import prova from './prova';

const temporada: TemporadaConteudo = {
  id: 'backend-junior-t3',
  episodios: [e01, e02, e03, e04, e05],
  prova,
};

export default temporada;
