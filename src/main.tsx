import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource-variable/caveat';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/base.css';
import './styles/app.css';
import './styles/aula.css';
import './styles/quiz.css';
import './styles/paginas.css';
import './styles/projetos.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
