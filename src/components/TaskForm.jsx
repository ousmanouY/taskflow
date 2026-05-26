import { useState } from 'react'

const STATUTS = ['A faire', 'En cours', 'Termine']

const styles = {
  wrapper: {
    background: '#0d0d0d',
    border: '1px solid #2a2a2a',
    borderRadius: '4px',
    padding: '1.75rem',
    marginBottom: '2.5rem',
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#f0e040',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    margin: '0 0 1.25rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  fieldFull: {
    gridColumn: '1 / -1',
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.65rem',
    color: '#666',
    display: 'block',
    marginBottom: '0.35rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  input: {
    width: '100%',
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '2px',
    padding: '0.6rem 0.75rem',
    color: '#f5f5f5',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '2px',
    padding: '0.6rem 0.75rem',
    color: '#f5f5f5',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.78rem',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  btn: {
    marginTop: '0.5rem',
    background: '#f0e040',
    color: '#0a0a0a',
    border: 'none',
    padding: '0.65rem 1.5rem',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: 'background 0.2s, transform 0.1s',
  },
}

const ETAT_INITIAL = { titre: '', description: '', statut: 'A faire' }

/**
 * TaskForm – Composant Contrôlé
 * Props :
 *   onAddTask {Function} – callback reçu depuis Dashboard (Lifting State Up)
 */
function TaskForm({ onAddTask }) {
  // État local du formulaire (composant contrôlé)
  const [champs, setChamps] = useState(ETAT_INITIAL)

  // Mise à jour générique de chaque champ via onChange
  function handleChange(e) {
    const { name, value } = e.target
    setChamps((prev) => ({ ...prev, [name]: value }))
  }

  // Soumission : génération de la nouvelle tâche + remontée via callback
  function handleSubmit(e) {
    e.preventDefault() // Bloquer le comportement par défaut du navigateur

    if (!champs.titre.trim()) return // Validation minimale

    const nouvelleTache = {
      id: Date.now(), // Identifiant unique basé sur le timestamp
      titre: champs.titre.trim(),
      description: champs.description.trim(),
      statut: champs.statut,
    }

    onAddTask(nouvelleTache) // Jalon 3 : Lifting State Up
    setChamps(ETAT_INITIAL)  // Réinitialisation du formulaire
  }

  return (
    <div style={styles.wrapper}>
      <p style={styles.heading}>+ Nouvelle tâche</p>

      {/* Jalon 3 : formulaire contrôlé, pas de balise <form> classique soumise */}
      <div>
        <div style={styles.grid}>
          <div style={styles.fieldFull}>
            <label style={styles.label} htmlFor="titre">Titre</label>
            <input
              id="titre"
              name="titre"
              style={styles.input}
              value={champs.titre}
              onChange={handleChange}
              placeholder="Ex : Rédiger les spécifications…"
              onFocus={(e) => (e.target.style.borderColor = '#f0e040')}
              onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
            />
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label} htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              style={styles.input}
              value={champs.description}
              onChange={handleChange}
              placeholder="Détaillez l'objectif de la tâche…"
              onFocus={(e) => (e.target.style.borderColor = '#f0e040')}
              onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
            />
          </div>

          <div>
            <label style={styles.label} htmlFor="statut">Statut initial</label>
            <select
              id="statut"
              name="statut"
              style={styles.select}
              value={champs.statut}
              onChange={handleChange}
            >
              {STATUTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          style={styles.btn}
          onClick={handleSubmit}
          onMouseEnter={(e) => (e.target.style.background = '#fff')}
          onMouseLeave={(e) => (e.target.style.background = '#f0e040')}
        >
          Ajouter la tâche
        </button>
      </div>
    </div>
  )
}

export default TaskForm
