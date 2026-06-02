import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const API_URL = 'http://localhost:5000/api/tasks';

const STATUTS = ['A faire', 'En cours', 'Termine'];

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f4f8',
    padding: '2rem',
  }
};

export default function Dashboard() {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTaches(data))
      .catch(err => console.log('Erreur:', err));
  }, []);

  const ajouterTache = async (nouvelleTache) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nouvelleTache)
      });
      if (res.ok) {
        const tache = await res.json();
        setTaches([...taches, tache]);
      }
    } catch (err) {
      console.log('Erreur:', err);
    }
  };

  return (
    <div style={styles.page}>
      <h1>TaskFlow</h1>
      <TaskForm onSubmit={ajouterTache} />
      {taches.map(tache => (
        <TaskCard key={tache._id} tache={tache} />
      ))}
    </div>
  );
}
