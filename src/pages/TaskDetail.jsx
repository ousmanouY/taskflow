import { useParams, Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

const STATUT_CONFIG = {
  'A faire': { color: '#f0e040', icon: '●' },
  'En cours': { color: '#60a5fa', icon: '◆' },
  'Termine': { color: '#4ade80', icon: '✔' },
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f5f5f5',
    padding: '2rem',
    maxWidth: '680px',
    margin: '0 auto',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    color: '#666',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    marginBottom: '2.5rem',
    transition: 'color 0.2s',
  },
  idTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#444',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
  },
  titre: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '2.4rem',
    color: '#f5f5f5',
    margin: '0 0 1.5rem 0',
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
  },
  badge: (config) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: config.color,
    background: `${config.color}15`,
    border: `1px solid ${config.color}44`,
    padding: '0.4rem 0.9rem',
    borderRadius: '2px',
    marginBottom: '2rem',
  }),
  separator: {
    border: 'none',
    borderTop: '1px solid #1a1a1a',
    margin: '2rem 0',
  },
  sectionLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '0.6rem',
  },
  description: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 400,
    fontSize: '1.05rem',
    color: '#ccc',
    lineHeight: 1.75,
    margin: 0,
  },
  notFound: {
    textAlign: 'center',
    padding: '4rem 2rem',
    fontFamily: "'Space Mono', monospace",
    color: '#444',
  },
  notFoundCode: {
    fontSize: '4rem',
    display: 'block',
    marginBottom: '1rem',
  },
}

/**
 * TaskDetail – Page de détail d'une tâche
 * Jalon 5 : useParams() pour extraire l'id depuis l'URL /task/:id
 */
function TaskDetail() {
  // Jalon 5 : extraction de l'identifiant depuis l'URL
  const { id } = useParams()

  // Lecture des tâches depuis le localStorage via le hook personnalisé
  const [taches] = useLocalStorage('taskflow_data', [])

  // Recherche de la tâche correspondante (conversion de l'id string → number)
  const tache = taches.find((t) => t.id === Number(id) || String(t.id) === id)

  // Cas : tâche introuvable
  if (!tache) {
    return (
      <div style={styles.page}>
        <div style={styles.notFound}>
          <span style={styles.notFoundCode}>404</span>
          <p>Tâche #{id} introuvable.</p>
          {/* Jalon 5 : <Link> au lieu de <a href> */}
          <Link to="/" style={{ ...styles.backLink, color: '#f0e040' }}>
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    )
  }

  const config = STATUT_CONFIG[tache.statut] || STATUT_CONFIG['A faire']

  return (
    <div style={styles.page}>
      {/* Jalon 5 : navigation interne via <Link> — aucune balise <a href> */}
      <Link
        to="/"
        style={styles.backLink}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#f0e040')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
      >
        ← Retour au tableau de bord
      </Link>

      <p style={styles.idTag}>TÂCHE #{tache.id}</p>
      <h1 style={styles.titre}>{tache.titre}</h1>

      <div style={styles.badge(config)}>
        <span>{config.icon}</span>
        <span>{tache.statut}</span>
      </div>

      <hr style={styles.separator} />

      <p style={styles.sectionLabel}>Description</p>
      <p style={styles.description}>{tache.description}</p>
    </div>
  )
}

export default TaskDetail
