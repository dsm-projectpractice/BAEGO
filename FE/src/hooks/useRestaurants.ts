import { useState, useMemo, useCallback } from 'react'
import { mockRestaurants } from '../data/mockRestaurants'
import type { Category, DistanceFilter, Restaurant } from '../types/restaurant'

const DISTANCE_MAP: Record<DistanceFilter, number> = {
  '500m': 500,
  '1km': 1000,
  '2km': 2000,
}

export function useRestaurants() {
  const [category, setCategory] = useState<Category>('전체')
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('1km')
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const filtered = useMemo<Restaurant[]>(() => {
    const maxDistance = DISTANCE_MAP[distanceFilter]
    return mockRestaurants.filter(r => {
      const matchCategory = category === '전체' || r.category === category
      const matchDistance = r.distanceM <= maxDistance
      return matchCategory && matchDistance
    })
  }, [category, distanceFilter])

  const featured = useMemo<Restaurant | null>(() => {
    if (filtered.length === 0) return null
    return filtered[featuredIndex % filtered.length]
  }, [filtered, featuredIndex])

  const shuffle = useCallback(() => {
    setFeaturedIndex(prev => prev + 1)
  }, [])

  const list = useMemo<Restaurant[]>(() => {
    if (!featured) return filtered
    return filtered.filter(r => r.id !== featured.id)
  }, [filtered, featured])

  return {
    category,
    setCategory,
    distanceFilter,
    setDistanceFilter,
    featured,
    list,
    shuffle,
    total: filtered.length,
  }
}
