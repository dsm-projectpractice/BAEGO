import { NavLink } from 'react-router-dom'
import { Home, Compass, Heart, User } from 'lucide-react'

const tabs = [
  { path: '/home', icon: Home, label: '홈' },
  { path: '/explore', icon: Compass, label: '탐색' },
  { path: '/favorites', icon: Heart, label: '찜' },
  { path: '/mypage', icon: User, label: '내 정보' },
] as const

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#F0F0F0] z-30">
      <div className="flex items-center">
        {tabs.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                'flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 active:opacity-60',
                isActive ? 'text-blue-500' : 'text-[#ADADAD]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  fill={isActive && label === '찜' ? 'currentColor' : 'none'}
                />
                <span className={`text-[10px] font-medium ${isActive ? 'text-blue-500' : 'text-[#ADADAD]'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="h-safe-bottom bg-white" />
    </nav>
  )
}
