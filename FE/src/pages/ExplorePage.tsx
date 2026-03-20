import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { AppLayout } from '../components/common/AppLayout'
import { CategoryFilter } from '../components/restaurant/CategoryFilter'
import { CompactCard } from '../components/restaurant/RestaurantCard'
import { FilterSheet } from '../components/filter/FilterSheet'
import { mockRestaurants } from '../data/mockRestaurants'
import type { Category, DistanceFilter } from '../types/restaurant'

const DISTANCE_MAP: Record<DistanceFilter, number> = {
  '500m': 500,
  '1km': 1000,
  '2km': 2000,
}

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('전체')
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('2km')
  const [filterOpen, setFilterOpen] = useState(false)

  const results = useMemo(() => {
    const maxDist = DISTANCE_MAP[distanceFilter]
    return mockRestaurants.filter(r => {
      const matchCat = category === '전체' || r.category === category
      const matchDist = r.distanceM <= maxDist
      const matchQuery =
        query.trim() === '' ||
        r.name.includes(query) ||
        r.tags.some(t => t.includes(query)) ||
        r.category.includes(query)
      return matchCat && matchDist && matchQuery
    })
  }, [query, category, distanceFilter])

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
