import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { AppLayout } from '../components/common/AppLayout'
import { CategoryFilter } from '../components/restaurant/CategoryFilter'
import { CompactCard } from '../components/restaurant/RestaurantCard'
import { FilterSheet } from '../components/filter/FilterSheet'
import { useGeolocation } from '../hooks/useGeolocation'
import type { Category, DistanceFilter, Restaurant } from '../types/restaurant'

const DISTANCE_MAP: Record<DistanceFilter, number> = {
  '500m': 500,
  '1km': 1000,
  '2km': 2000,
}

const DEFAULT_COORDS = { lat: 37.4979, lng: 127.0276 }

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

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('전체')
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('2km')
  const [filterOpen, setFilterOpen] = useState(false)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const { coords } = useGeolocation()
  const effectiveCoords = coords ?? DEFAULT_COORDS

  useEffect(() => {
    const radius = DISTANCE_MAP[distanceFilter]
    const params = new URLSearchParams({
      lat: String(effectiveCoords.lat),
      lng: String(effectiveCoords.lng),
      category,
      radius: String(radius),
    })

    setLoading(true)
    setFetchError(null)

    fetch(`http://localhost:3000/api/restaurants?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(`서버 오류: ${res.status}`)
        return res.json() as Promise<NaverSearchResponse>
      })
      .then(data => {
        const items = Array.isArray(data.items) ? data.items : []
        setRestaurants(items.map(mapNaverItem))
      })
      .catch(() => {
        setFetchError('잠시 후 다시 시도해주세요')
        setRestaurants([])
      })
      .finally(() => setLoading(false))
  }, [effectiveCoords.lat, effectiveCoords.lng, category, distanceFilter])

  const results = useMemo(() => {
    if (query.trim() === '') return restaurants
    return restaurants.filter(r =>
      r.name.includes(query) ||
      r.tags.some(t => t.includes(query)) ||
      r.category.includes(query)
    )
  }, [query, restaurants])

  return (
    <>
      <AppLayout>
        {/* AppBar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#F0F0F0]">
          <div className="flex items-center justify-between px-4 h-14">
            <h1 className="text-base font-bold text-[#1A1A1A]">탐색</h1>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 h-9 px-3 bg-[#F5F5F7] rounded-xl active:opacity-70"
            >
              <SlidersHorizontal size={15} strokeWidth={1.5} className="text-[#6B6B6B]" />
              <span className="text-sm font-medium text-[#6B6B6B]">{distanceFilter}</span>
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2.5 bg-[#F5F5F7] rounded-xl px-3.5 h-11">
              <Search size={16} strokeWidth={1.5} className="text-[#ADADAD] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="식당 이름, 메뉴, 카테고리 검색"
                className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#ADADAD] outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="active:opacity-60">
                  <X size={15} strokeWidth={1.5} className="text-[#ADADAD]" />
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div className="px-4 pb-3">
            <CategoryFilter selected={category} onChange={setCategory} />
          </div>
        </header>

        {/* List */}
        <main className="flex-1 px-4 pt-4">
          {loading ? (
            <div className="flex flex-col gap-2.5 pb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-[#F5F5F7] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-medium text-[#6B6B6B]">{fetchError}</p>
            </div>
          ) : (
            <>
              <p className="text-xs font-medium text-[#ADADAD] mb-3">
                {results.length}개의 식당
              </p>
              {results.length > 0 ? (
                <div className="flex flex-col gap-2.5 pb-4">
                  {results.map(r => (
                    <CompactCard key={r.id} restaurant={r} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 bg-[#F0F0F0] rounded-2xl flex items-center justify-center mb-3">
                    <Search size={22} strokeWidth={1.5} className="text-[#ADADAD]" />
                  </div>
                  <p className="text-sm font-medium text-[#6B6B6B]">검색 결과가 없어요</p>
                  <p className="text-xs text-[#ADADAD] mt-1">다른 키워드나 거리 범위를 시도해보세요</p>
                </div>
              )}
            </>
          )}
        </main>
      </AppLayout>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        distanceFilter={distanceFilter}
        onDistanceChange={setDistanceFilter}
      />
    </>
  )
}
