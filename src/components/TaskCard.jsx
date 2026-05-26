import { Link } from 'react-router-dom'

// Mapping des statuts vers des couleurs et labels visuels
const STATUT_CONFIG = {
  'A faire': { color: '#f0e040', bg: 'rgba(240,224,64,0.1)', label: '● À faire' },
  'En cours': { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', label: '◆ En cours' },
  'Termine': { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', label: '✔ Terminé' },
}

const styles = {
  card: {
    background: '#111',
    border: '1px solid #222',
    borderRadius: '4px',
    padding: '1.25rem 1.5rem',
    textDecoration: 'none',
    display: 'block',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  accentBar: (color) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3px',
    height: '100%',
    background: color,
  }),
  titre: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '1rem',
    color: '#f5f5f5',
    margin: '0 0 0.4rem 0',
    paddingLeft: '0.75rem',
  },
  description: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    color: '#777',
    margin: '0 0 1rem 0',
    paddingLeft: '0.75rem',
    lineHeight: 1.6,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '0.75rem',
  },
  badge: (config) => ({
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: config.color,
    background: config.bg,
    padding: '0.25rem 0.6rem',
    borderRadius: '2px',
    letterSpacing: '0.05em',
  }),
  idLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    color: '#333',
  },
}

/**
 * TaskCard – Composant réutilisable
 * Props :
 *   tache {Object} – objet tâche { id, titre, description, statut }
 */
function TaskCard({ tache }) {
  const config = STATUT_CONFIG[tache.statut] || STATUT_CONFIG['A faire']

  return (
    // Jalon 5 : utilisation de <Link> au lieu de <a href>
    <Link
      to={`/task/${tache.id}`}
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = config.color
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#222'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Barre colorée latérale selon le statut */}
      <div style={styles.accentBar(config.color)} />

      <h3 style={styles.titre}>{tache.titre}</h3>
      <p style={styles.description}>{tache.description}</p>

      <div style={styles.footer}>
        <span style={styles.badge(config)}>{config.label}</span>
        <span style={styles.idLabel}>#{tache.id}</span>
      </div>
    </Link>
  )
}

export default TaskCard
