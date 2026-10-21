import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router';
import { Efeitos } from './components/Efeitos';
import { ModalTemporada } from './components/ModalTemporada';
import { Navbar } from './components/Navbar';
import { useAplicarAparencia } from './lib/aparencia';
import { usePerfil } from './lib/store';
import { Assistir } from './pages/Assistir';
import { Materiais, Videos } from './pages/Biblioteca';
import { Conquistas } from './pages/Conquistas';
import { Conta } from './pages/Conta';
import { Avaliacao, ProvaTemporada, Simulado } from './pages/Exames';
import { Inicio } from './pages/Inicio';
import { NovoPerfil, Perfis } from './pages/Perfis';
import { Projeto, Projetos } from './pages/Projetos';
import { Revisao } from './pages/Revisao';
import { Trilha } from './pages/Trilha';

function ComPerfil({ navbar }: { navbar: boolean }) {
  const perfil = usePerfil();
  if (!perfil) return <Navigate to="/perfis" replace />;
  return (
    <>
      {navbar && <Navbar />}
      <main>
        <Outlet />
      </main>
      <ModalTemporada />
      <Efeitos />
      <ScrollRestoration getKey={(loc) => loc.pathname} />
    </>
  );
}

const router = createBrowserRouter([
  { path: '/perfis', element: <Perfis /> },
  { path: '/perfis/novo', element: <NovoPerfil /> },
  {
    element: <ComPerfil navbar />,
    children: [
      { path: '/', element: <Inicio /> },
      { path: '/trilha', element: <Trilha /> },
      { path: '/projetos', element: <Projetos /> },
      { path: '/projetos/:projetoId', element: <Projeto /> },
      { path: '/revisao', element: <Revisao /> },
      { path: '/simulado', element: <Simulado /> },
      { path: '/videos', element: <Videos /> },
      { path: '/materiais', element: <Materiais /> },
      { path: '/conquistas', element: <Conquistas /> },
      { path: '/conta', element: <Conta /> },
      { path: '/prova/:temporadaId', element: <ProvaTemporada /> },
      { path: '/avaliacao/:cargoId', element: <Avaliacao /> },
    ],
  },
  {
    element: <ComPerfil navbar={false} />,
    children: [{ path: '/assistir/:episodioId', element: <Assistir /> }],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function App() {
  useAplicarAparencia();
  return <RouterProvider router={router} />;
}
