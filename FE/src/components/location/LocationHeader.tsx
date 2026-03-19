import { MapPin, RotateCcw } from 'lucide-react'
import { LoadingSpinner } from '../common/LoadingSpinner'

interface LocationHeaderProps {
  address: string
  loading: boolean
  onRefresh: () => void
}

export function LocationHeader({ address, loading, onRefresh }: LocationHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-1.5">
        <MapPin size={16} strokeWidth={2} className="text-blue-500 flex-shrink-0" />
        {loading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size={14} />
            <span className="text-sm text-[#ADADAD]">위치 확인 중...</span>
          </div>
        ) : (
          <span className="text-sm font-semibold text-[#1A1A1A]">
            {address || '위치를 불러오는 중'}
          </span>
        )}
      </div>
      <button
        onClick={onRefresh}
        className="flex items-center gap-1 text-xs text-[#ADADAD] active:opacity-60"
      >
        <RotateCcw size={12} strokeWidth={1.5} />
        새로고침
      </button>
    </div>
  )
}
