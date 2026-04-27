import { useState, useMemo, useCallback, useEffect } from 'react'
import type { Category, DistanceFilter, Restaurant } from '../types/restaurant'

const DISTANCE_MAP: Record<DistanceFilter, number> = {
  '500m': 500,
  '1km': 1000,
  '2km': 2000,
}

const CATEGORY_API_MAP: Record<Category, string> = {
  '전체': '전체',
  '한식': '한식',
  '중식': '중식',
  '일식': '일식',
  '양식': '양식',
  '카페': '카페',
}

const DEFAULT_COORDS = { lat: 37.4979, lng: 127.0276 }

// Naver Local Search API item → Restaurant 매핑
interface NaverRestaurantItem {
  title: string
  link: string
  category: string
  description: string
  telephone: string
  address: string
  roadAddress: string
  mapx: string
  mapy: string
}

interface NaverSearchResponse {
  lastBuildDate: string
  total: number
  start: number
  display: number
  items: NaverRestaurantItem[]
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

function mapNaverItem(item: NaverRestaurantItem, index: number): Restaurant {
  // category 예: "음식점>한식" → "한식"
  const rawCategory = item.category.split('>').pop() ?? '한식'
  const categoryMap: Record<string, Restaurant['category']> = {
    한식: '한식',
    중식: '중식',
    일식: '일식',
    양식: '양식',
    카페: '카페',
  }
  const category: Restaurant['category'] = categoryMap[rawCategory] ?? '한식'

  return {
    id: `naver-${item.mapx}-${item.mapy}-${index}`,
    name: stripHtml(item.title),
    category,
    rating: 0,
    reviewCount: 0,
    distanceM: 0,
    address: item.roadAddress || item.address,
    tags: item.description ? [item.description] : [],
    naverPlaceId: item.link,
    isOpen: true,
    priceRange: '보통',
  }
}

export function useRestaurants(coords: { lat: number; lng: number } | null) {
  const [category, setCategory] = useState<Category>('전체')
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('1km')
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const effectiveCoords = coords ?? DEFAULT_COORDS

  useEffect(() => {
    const radius = DISTANCE_MAP[distanceFilter]
    const apiCategory = CATEGORY_API_MAP[category]

    const params = new URLSearchParams({
      lat: String(effectiveCoords.lat),
      lng: String(effectiveCoords.lng),
      category: apiCategory,
      radius: String(radius),
    })

    setLoading(true)
    setError(null)

    fetch(`http://localhost:3000/api/restaurants?${params.toString()}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`)
        }
        return res.json() as Promise<NaverSearchResponse>
      })
      .then(data => {
        const items = Array.isArray(data.items) ? data.items : []
        setRestaurants(items.map(mapNaverItem))
        setFeaturedIndex(0)
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : '알 수 없는 오류')
        setRestaurants([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [effectiveCoords.lat, effectiveCoords.lng, category, distanceFilter])

  const featured = useMemo<Restaurant | null>(() => {
    if (restaurants.length === 0) return null
    return restaurants[featuredIndex % restaurants.length]
  }, [restaurants, featuredIndex])

  const shuffle = useCallback(() => {
    setFeaturedIndex(prev => prev + 1)
  }, [])

  const list = useMemo<Restaurant[]>(() => {
    if (!featured) return restaurants
    return restaurants.filter(r => r.id !== featured.id)
  }, [restaurants, featured])

  return {
    category,
    setCategory,
    distanceFilter,
    setDistanceFilter,
    featured,
    list,
    shuffle,
    total: restaurants.length,
    loading,
    error,
  }
}
