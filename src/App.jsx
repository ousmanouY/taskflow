import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'

// Styles globaux injectés via JavaScript (pas de fichier CSS externe)
const globalStyles = `
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: #0a0a0a;
    color: #f5f5f5;
    -webkit-font-smoothing: antialiased;
  }

  /* Animation pour le point "Actif" dans la navbar */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* Scrollbar discrète */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
`

/**
 * App – Composant racine
 * Jalon 5 : Configuration de BrowserRouter avec les routes déclarées
 */
function App() {
  return (
    <>
      {/* Injection des styles globaux sans fichier CSS */}
      <style>{globalStyles}</style>

      <BrowserRouter>
        {/* Layout global : Navbar affichée sur toutes les pages */}
        <Navbar />

        {/* Arbre des routes de l'application */}
        <Routes>
          {/* Route "/" → Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Route dynamique "/task/:id" → TaskDetail */}
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
