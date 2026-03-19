import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F7] pb-[60px]">
      {children}
      <BottomNav />
    </div>
  )
}
