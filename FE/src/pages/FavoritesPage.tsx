import { Heart } from 'lucide-react'
import { AppLayout } from '../components/common/AppLayout'
import { CompactCard } from '../components/restaurant/RestaurantCard'
import { useFavorites } from '../contexts/FavoritesContext'
import { mockRestaurants } from '../data/mockRestaurants'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  const favoriteRestaurants = mockRestaurants.filter(r => favorites.includes(r.id))

  return (
    <AppLayout>
      {/* AppBar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#F0F0F0]">
        <div className="flex items-center px-4 h-14">
          <h1 className="text-base font-bold text-[#1A1A1A]">찜한 식당</h1>
          {favorites.length > 0 && (
            <span className="ml-2 text-sm text-[#ADADAD]">{favorites.length}곳</span>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 pt-4">
        {favoriteRestaurants.length > 0 ? (
          <div className="flex flex-col gap-2.5 pb-4">
            {favoriteRestaurants.map(r => (
              <CompactCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 bg-[#FFF1F3] rounded-2xl flex items-center justify-center mb-4">
              <Heart size={24} strokeWidth={1.5} className="text-rose-400" />
            </div>
            <p className="text-sm font-semibold text-[#1A1A1A]">아직 찜한 식당이 없어요</p>
            <p className="text-xs text-[#ADADAD] mt-1.5 leading-relaxed">
              마음에 드는 식당에서<br />하트를 눌러 저장해보세요
            </p>
          </div>
        )}
      </main>
    </AppLayout>
  )
}
