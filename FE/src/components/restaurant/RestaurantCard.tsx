import { Star, ChevronRight, Clock, Heart } from 'lucide-react'
import { CategoryBadge, Badge } from '../common/Badge'
import { useFavorites } from '../../contexts/FavoritesContext'
import type { Restaurant } from '../../types/restaurant'

const categoryGradients: Record<string, string> = {
  한식: 'from-orange-300 to-red-400',
  중식: 'from-red-400 to-rose-500',
  일식: 'from-indigo-400 to-purple-500',
  양식: 'from-teal-400 to-green-500',
  카페: 'from-amber-300 to-yellow-400',
}

function formatDistance(m: number): string {
  if (m < 1000) return `${m}m`
  return `${(m / 1000).toFixed(1)}km`
}

function openNaver(name: string) {
  window.open(`https://map.naver.com/v5/search/${encodeURIComponent(name)}`, '_blank')
}

interface HeroCardProps {
  restaurant: Restaurant
}

export function HeroCard({ restaurant }: HeroCardProps) {
  const gradient = categoryGradients[restaurant.category] ?? 'from-gray-300 to-gray-400'
  const { isFavorite, toggle } = useFavorites()
  const liked = isFavorite(restaurant.id)

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden">
      {/* Thumbnail */}
      <div
        className={`h-44 bg-gradient-to-br ${gradient} relative flex items-end p-4`}
        onClick={() => openNaver(restaurant.name)}
      >
        <CategoryBadge category={restaurant.category} />
        {!restaurant.isOpen && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-black/30 text-white">
            영업 종료
          </span>
        )}
        {/* Favorite button on thumbnail */}
        <button
          onClick={e => { e.stopPropagation(); toggle(restaurant.id) }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center active:opacity-70"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={liked ? 'text-rose-500' : 'text-[#6B6B6B]'}
            fill={liked ? '#F43F5E' : 'none'}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4" onClick={() => openNaver(restaurant.name)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#1A1A1A] leading-tight">{restaurant.name}</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Star size={14} strokeWidth={0} fill="#FACC15" />
              <span className="text-sm font-semibold text-[#1A1A1A]">{restaurant.rating}</span>
              <span className="text-sm text-[#ADADAD]">({restaurant.reviewCount.toLocaleString()})</span>
              <span className="text-[#ADADAD] text-sm">·</span>
              <span className="text-sm text-[#6B6B6B]">{formatDistance(restaurant.distanceM)}</span>
            </div>
          </div>
          <Badge variant="price">{restaurant.priceRange}</Badge>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {restaurant.tags.map(tag => (
            <span key={tag} className="text-xs text-[#6B6B6B]">#{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-1 mt-4 pt-4 border-t border-[#F5F5F5]">
          <span className="text-sm font-medium text-blue-500">네이버 지도로 보기</span>
          <ChevronRight size={14} strokeWidth={2} className="text-blue-500" />
        </div>
      </div>
    </div>
  )
}

interface CompactCardProps {
  restaurant: Restaurant
}

export function CompactCard({ restaurant }: CompactCardProps) {
  const gradient = categoryGradients[restaurant.category] ?? 'from-gray-300 to-gray-400'
  const { isFavorite, toggle } = useFavorites()
  const liked = isFavorite(restaurant.id)

  return (
    <div className="flex items-center gap-3 bg-white border border-[#EBEBEB] rounded-2xl p-3.5">
      <div
        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0`}
        onClick={() => openNaver(restaurant.name)}
      />

      <div className="flex-1 min-w-0" onClick={() => openNaver(restaurant.name)}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1A1A1A] truncate">{restaurant.name}</span>
          {!restaurant.isOpen && (
            <span className="text-xs text-[#ADADAD] flex-shrink-0 flex items-center gap-0.5">
              <Clock size={11} strokeWidth={1.5} />
              종료
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star size={12} strokeWidth={0} fill="#FACC15" />
          <span className="text-xs font-semibold text-[#1A1A1A]">{restaurant.rating}</span>
          <span className="text-xs text-[#ADADAD]">·</span>
          <span className="text-xs text-[#6B6B6B]">{formatDistance(restaurant.distanceM)}</span>
          <span className="text-xs text-[#ADADAD]">·</span>
          <CategoryBadge category={restaurant.category} />
        </div>
        <div className="flex gap-1.5 mt-1.5">
          {restaurant.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs text-[#ADADAD]">#{tag}</span>
          ))}
        </div>
      </div>

      <button
        onClick={() => toggle(restaurant.id)}
        className="p-1.5 active:opacity-60 flex-shrink-0"
      >
        <Heart
          size={18}
          strokeWidth={1.5}
          className={liked ? 'text-rose-500' : 'text-[#DADADA]'}
          fill={liked ? '#F43F5E' : 'none'}
        />
      </button>
    </div>
  )
}
