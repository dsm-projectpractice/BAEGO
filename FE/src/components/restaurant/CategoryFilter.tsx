import type { Category } from '../../types/restaurant'

const CATEGORIES: Category[] = ['전체', '한식', '중식', '일식', '양식', '카페']

interface CategoryFilterProps {
  selected: Category
  onChange: (category: Category) => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
      {CATEGORIES.map(category => {
        const isSelected = selected === category
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={[
              'flex-shrink-0 h-8 px-4 rounded-full text-sm font-medium leading-none',
              'transition-colors duration-100 active:opacity-70',
              isSelected
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-white border border-[#EBEBEB] text-[#6B6B6B]',
            ].join(' ')}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
