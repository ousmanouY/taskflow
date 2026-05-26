import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import useLocalStorage from '../hooks/useLocalStorage'

// Données initiales de démonstration
const TACHES_INITIALES = [
  {
    id: 1,
    titre: 'Conception de l\'ontologie',
    description: 'Rédiger les axiomes de base du domaine.',
    statut: 'A faire',
  },
  {
    id: 2,
    titre: 'Maquettage des interfaces',
    description: 'Produire les wireframes pour les écrans principaux.',
    statut: 'En cours',
  },
  {
    id: 3,
    titre: 'Mise en place du dépôt Git',
    description: 'Initialiser le repo, configurer .gitignore et les branches.',
    statut: 'Termine',
  },
]

const STATUTS = ['A faire', 'En cours', 'Termine']

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f5f5f5',
    padding: '2rem',
    maxWidth: '860px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #1a1a1a',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '2.2rem',
    color: '#f5f5f5',
    margin: '0 0 0.35rem 0',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.72rem',
    color: '#555',
    margin: 0,
    letterSpacing: '0.06em',
  },
  statsRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  statCard: (color) => ({
    flex: 1,
    minWidth: '120px',
    background: '#111',
    border: `1px solid ${color}33`,
    borderRadius: '4px',
    padding: '0.75rem 1rem',
    textAlign: 'center',
  }),
  statNumber: (color) => ({
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.8rem',
    color: color,
    display: 'block',
    lineHeight: 1,
    marginBottom: '0.3rem',
  }),
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '0.75rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    color: '#333',
  },
}

const STAT_COLORS = {
  'A faire': '#f0e040',
  'En cours': '#60a5fa',
  'Termine': '#4ade80',
}

/**
 * Dashboard – Page principale
 * Jalons 2 (map + TaskCard), 3 (TaskForm + onAddTask), 4 (useLocalStorage = useEffect + localStorage)
 */
function Dashboard() {
  // Jalon 4 + BONUS : useState remplacé par le hook personnalisé useLocalStorage
  // Lit depuis localStorage à l'init, synchronise à chaque changement
  const [taches, setTaches] = useLocalStorage('taskflow_data', TACHES_INITIALES)

  // Jalon 3 – Lifting State Up : callback transmis à TaskForm
  function handleAddTask(nouvelleTache) {
    // Immuabilité obligatoire : spread operator, jamais push()
    setTaches([...taches, nouvelleTache])
  }

  // Calcul des statistiques par statut
  const stats = STATUTS.map((s) => ({
    label: s,
    count: taches.filter((t) => t.statut === s).length,
    color: STAT_COLORS[s],
  }))

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Tableau de bord</h1>
        <p style={styles.subtitle}>
          {taches.length} tâche{taches.length !== 1 ? 's' : ''} enregistrée{taches.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Statistiques rapides */}
      <div style={styles.statsRow}>
        {stats.map(({ label, count, color }) => (
          <div key={label} style={styles.statCard(color)}>
            <span style={styles.statNumber(color)}>{count}</span>
            <span style={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* Jalon 3 : TaskForm reçoit la callback onAddTask (Lifting State Up) */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Jalon 2 : .map() avec key={tache.id} — index interdit */}
      {taches.length === 0 ? (
        <div style={styles.emptyState}>
          Aucune tâche pour le moment.<br />Créez votre première tâche ci-dessus.
        </div>
      ) : (
        <div style={styles.grid}>
          {taches.map((tache) => (
            <TaskCard key={tache.id} tache={tache} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
