import { Check } from 'lucide-react'
import { BottomSheet } from '../common/BottomSheet'
import { Button } from '../common/Button'
import type { DistanceFilter } from '../../types/restaurant'

const DISTANCE_OPTIONS: { label: string; value: DistanceFilter; desc: string }[] = [
  { label: '500m', value: '500m', desc: '걸어서 5분 내외' },
  { label: '1km', value: '1km', desc: '걸어서 10분 내외' },
  { label: '2km', value: '2km', desc: '걸어서 20분 내외' },
]

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  distanceFilter: DistanceFilter
  onDistanceChange: (value: DistanceFilter) => void
}

export function FilterSheet({
  open,
  onClose,
  distanceFilter,
  onDistanceChange,
}: FilterSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="거리 설정">
      <div className="flex flex-col gap-2 mb-6">
        {DISTANCE_OPTIONS.map(option => {
          const isSelected = distanceFilter === option.value
          return (
            <button
              key={option.value}
              onClick={() => onDistanceChange(option.value)}
              className={[
                'flex items-center justify-between w-full px-4 py-4 rounded-2xl border',
                'active:opacity-70 transition-colors duration-100',
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-[#EBEBEB] bg-white',
              ].join(' ')}
            >
              <div className="text-left">
                <p className={`text-sm font-semibold ${isSelected ? 'text-blue-600' : 'text-[#1A1A1A]'}`}>
                  {option.label} 이내
                </p>
                <p className="text-xs text-[#ADADAD] mt-0.5">{option.desc}</p>
              </div>
              {isSelected && (
                <Check size={18} strokeWidth={2.5} className="text-blue-500" />
              )}
            </button>
          )
        })}
      </div>
      <Button variant="primary" size="lg" fullWidth onClick={onClose}>
        적용하기
      </Button>
    </BottomSheet>
  )
}
