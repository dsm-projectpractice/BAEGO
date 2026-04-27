import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Restaurant } from '../types/restaurant'

interface FavoritesContextValue {
  favorites: Restaurant[]
  toggle: (restaurant: Restaurant) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Restaurant[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('baego_favorites') || '[]')
    } catch {
      return []
    }
  })

  const toggle = useCallback((restaurant: Restaurant) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === restaurant.id)
      const next = exists ? prev.filter(f => f.id !== restaurant.id) : [...prev, restaurant]
      localStorage.setItem('baego_favorites', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.some(f => f.id === id),
    [favorites]
  )

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
