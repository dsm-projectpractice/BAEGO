import { useState } from 'react'
import { SlidersHorizontal, Shuffle, Utensils } from 'lucide-react'
import { AppLayout } from '../components/common/AppLayout'
import { LocationHeader } from '../components/location/LocationHeader'
import { CategoryFilter } from '../components/restaurant/CategoryFilter'
import { HeroCard, CompactCard } from '../components/restaurant/RestaurantCard'
import { FilterSheet } from '../components/filter/FilterSheet'
import { Button } from '../components/common/Button'
import { useGeolocation } from '../hooks/useGeolocation'
import { useRestaurants } from '../hooks/useRestaurants'

export default function HomePage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const { address, loading: locationLoading, refresh: refreshLocation } = useGeolocation()

  const {
    category,
    setCategory,
    distanceFilter,
    setDistanceFilter,
    featured,
    list,
    shuffle,
    total,
  } = useRestaurants()

  return (
    <>
      <AppLayout>
        {/* AppBar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#F0F0F0]">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Utensils size={14} strokeWidth={1.5} color="white" />
              </div>
              <span className="text-base font-bold text-[#1A1A1A]">배고</span>
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 h-9 px-3 bg-[#F5F5F7] rounded-xl active:opacity-70"
            >
              <SlidersHorizontal size={15} strokeWidth={1.5} className="text-[#6B6B6B]" />
              <span className="text-sm font-medium text-[#6B6B6B]">{distanceFilter}</span>
            </button>
          </div>

          <LocationHeader
            address={address || '강남구 역삼동'}
            loading={locationLoading}
            onRefresh={refreshLocation}
          />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-4">
          {/* 오늘의 추천 */}
          <section className="px-4 pt-5 pb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">오늘 뭐 먹지?</h2>
                <p className="text-xs text-[#ADADAD] mt-0.5">
                  {distanceFilter} 이내 · {total}개 식당 탐색 중
                </p>
              </div>
            </div>

            {featured ? (
              <>
                <HeroCard restaurant={featured} />
                <div className="flex justify-center mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={shuffle}
                    className="flex items-center gap-1.5 text-[#6B6B6B]"
                  >
                    <Shuffle size={14} strokeWidth={1.5} />
                    다시 추천받기
                  </Button>
                </div>
              </>
            ) : (
              <EmptyState />
            )}
          </section>

          <div className="h-2 bg-[#EFEFEF]" />

          {/* Category + List */}
          <section className="pt-5">
            <div className="px-4 mb-3">
              <CategoryFilter selected={category} onChange={setCategory} />
            </div>

            {list.length > 0 ? (
              <div className="px-4 flex flex-col gap-2.5">
                <p className="text-xs font-medium text-[#ADADAD]">주변 식당 {list.length}곳</p>
                {list.map(restaurant => (
                  <CompactCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="px-4">
                <EmptyState />
              </div>
            )}
          </section>
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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 bg-[#F0F0F0] rounded-2xl flex items-center justify-center mb-3">
        <Utensils size={22} strokeWidth={1.5} className="text-[#ADADAD]" />
      </div>
      <p className="text-sm font-medium text-[#6B6B6B]">주변에 식당이 없어요</p>
      <p className="text-xs text-[#ADADAD] mt-1">거리 범위를 늘려보세요</p>
    </div>
  )
}
