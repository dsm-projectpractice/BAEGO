import type { ReactNode } from 'react'
import type { Category } from '../../types/restaurant'

interface BadgeProps {
  children: ReactNode
  variant?: 'category' | 'open' | 'closed' | 'price' | 'default'
}

const categoryColorMap: Record<Exclude<Category, '전체'>, string> = {
  한식: 'bg-orange-50 text-orange-600',
  중식: 'bg-red-50 text-red-600',
  일식: 'bg-indigo-50 text-indigo-600',
  양식: 'bg-green-50 text-green-600',
  카페: 'bg-amber-50 text-amber-600',
}

const variantStyles: Record<string, string> = {
  open: 'bg-emerald-50 text-emerald-600',
  closed: 'bg-[#F5F5F5] text-[#ADADAD]',
  price: 'bg-[#F5F5F5] text-[#6B6B6B]',
  default: 'bg-[#F5F5F5] text-[#6B6B6B]',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const style = variantStyles[variant] ?? 'bg-[#F5F5F5] text-[#6B6B6B]'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${style}`}
    >
      {children}
    </span>
  )
}

interface CategoryBadgeProps {
  category: Exclude<Category, '전체'>
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const style = categoryColorMap[category]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${style}`}
    >
      {category}
    </span>
  )
}
