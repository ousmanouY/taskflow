import { Link, useLocation } from 'react-router-dom'

const styles = {
  nav: {
    background: '#0a0a0a',
    borderBottom: '2px solid #f0e040',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: '#f0e040',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  logoAccent: {
    color: '#ffffff',
  },
  tagline: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    color: '#666',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#888',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    animation: 'pulse 2s infinite',
  },
}

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Task<span style={styles.logoAccent}>Flow</span>
      </Link>
      <span style={styles.tagline}>Gestionnaire d'équipe</span>
      <div style={styles.right}>
        <div style={styles.dot} />
        <span>Actif</span>
      </div>
    </nav>
  )
}

export default Navbar
