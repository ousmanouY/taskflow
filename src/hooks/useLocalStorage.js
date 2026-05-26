import { useState, useEffect } from 'react'

/**
 * Hook personnalisé useLocalStorage
 * Encapsule la logique de persistance dans le localStorage.
 * Remplace useState tout en synchronisant automatiquement les données.
 *
 * @param {string} key   - La clé de stockage dans le localStorage
 * @param {*} initialValue - La valeur initiale si aucune donnée n'existe
 * @returns {[any, Function]} - [valeur, setter] identique à useState
 */
function useLocalStorage(key, initialValue) {
  // Initialisation : lecture synchrone du localStorage au montage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Erreur lecture localStorage:', error)
      return initialValue
    }
  })

  // Effet de bord : synchronisation à chaque changement de valeur
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Erreur écriture localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
