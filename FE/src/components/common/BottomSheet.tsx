import type { ReactNode } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-3xl px-4 pb-8 pt-5 animate-slideUp">
        <div className="w-10 h-1 bg-[#E8E8E8] rounded-full mx-auto mb-5" />
        {title && (
          <h3 className="text-base font-bold text-[#1A1A1A] mb-5">{title}</h3>
        )}
        {children}
      </div>
    </div>
  )
}
