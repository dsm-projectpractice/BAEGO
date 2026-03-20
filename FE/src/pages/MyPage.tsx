import { useState } from 'react'
import {
  ChevronRight,
  Heart,
  MapPin,
  Bell,
  FileText,
  Shield,
  Info,
  User,
  Shuffle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/common/AppLayout'
import { useFavorites } from '../contexts/FavoritesContext'
import { FilterSheet } from '../components/filter/FilterSheet'
import type { DistanceFilter } from '../types/restaurant'

export default function MyPage() {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const [defaultDistance, setDefaultDistance] = useState<DistanceFilter>('1km')
  const [distanceSheetOpen, setDistanceSheetOpen] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState(false)

  return (
    <>
      <AppLayout>
        {/* AppBar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#F0F0F0]">
          <div className="flex items-center px-4 h-14">
            <h1 className="text-base font-bold text-[#1A1A1A]">내 정보</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-4">
          {/* Profile Card */}
          <div className="mx-4 mt-4 bg-white border border-[#EBEBEB] rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <User size={26} strokeWidth={1.5} color="white" />
              </div>
              <div>
                <p className="text-base font-bold text-[#1A1A1A]">배고 사용자</p>
                <p className="text-xs text-[#ADADAD] mt-0.5">오늘도 맛있는 점심 드세요</p>
              </div>
            </div>

            <div className="flex mt-5 pt-4 border-t border-[#F5F5F5]">
              <StatItem label="찜한 식당" value={favorites.length} onClick={() => navigate('/favorites')} />
              <div className="w-px bg-[#F0F0F0]" />
              <StatItem label="탐색 범위" value={defaultDistance} onClick={() => setDistanceSheetOpen(true)} />
              <div className="w-px bg-[#F0F0F0]" />
              <StatItem label="추천 받기" value="랜덤" onClick={() => navigate('/home')} />
            </div>
          </div>

          {/* 내 활동 */}
          <SectionHeader title="내 활동" />
          <div className="mx-4 bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden">
            <SettingsItem
              icon={<Heart size={17} strokeWidth={1.5} className="text-rose-400" />}
              label="찜한 식당"
              value={`${favorites.length}곳`}
              onClick={() => navigate('/favorites')}
            />
            <Divider />
            <SettingsItem
              icon={<Shuffle size={17} strokeWidth={1.5} className="text-blue-500" />}
              label="추천 다시 받기"
              onClick={() => navigate('/home')}
            />
          </div>

          {/* 앱 설정 */}
          <SectionHeader title="앱 설정" />
          <div className="mx-4 bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden">
            <SettingsItem
              icon={<MapPin size={17} strokeWidth={1.5} className="text-blue-500" />}
              label="기본 탐색 거리"
              value={defaultDistance}
              onClick={() => setDistanceSheetOpen(true)}
            />
            <Divider />
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
                  <Bell size={17} strokeWidth={1.5} className="text-[#6B6B6B]" />
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">점심 알림</span>
              </div>
              <button
                onClick={() => setNotifEnabled(prev => !prev)}
                className={[
                  'w-11 h-6 rounded-full transition-colors duration-200 relative',
                  notifEnabled ? 'bg-blue-500' : 'bg-[#E0E0E0]',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
                    notifEnabled ? 'translate-x-5' : 'translate-x-0.5',
                  ].join(' ')}
                />
              </button>
            </div>
          </div>

          {/* 앱 정보 */}
          <SectionHeader title="앱 정보" />
          <div className="mx-4 bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden">
            <SettingsItem
              icon={<FileText size={17} strokeWidth={1.5} className="text-[#6B6B6B]" />}
              label="서비스 이용약관"
              onClick={() => {}}
            />
            <Divider />
            <SettingsItem
              icon={<Shield size={17} strokeWidth={1.5} className="text-[#6B6B6B]" />}
              label="개인정보 처리방침"
              onClick={() => {}}
            />
            <Divider />
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
                  <Info size={17} strokeWidth={1.5} className="text-[#6B6B6B]" />
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">버전 정보</span>
              </div>
              <span className="text-sm text-[#ADADAD]">1.0.0</span>
            </div>
          </div>
        </main>
      </AppLayout>

      <FilterSheet
        open={distanceSheetOpen}
        onClose={() => setDistanceSheetOpen(false)}
        distanceFilter={defaultDistance}
        onDistanceChange={setDefaultDistance}
      />
    </>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="px-4 pt-6 pb-2 text-xs font-semibold text-[#ADADAD] uppercase tracking-wider">
      {title}
    </p>
  )
}

function Divider() {
  return <div className="h-px bg-[#F5F5F5] mx-4" />
}

function SettingsItem({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  value?: string | number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-4 active:bg-[#F9F9F9]"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {value !== undefined && (
          <span className="text-sm text-[#ADADAD]">{value}</span>
        )}
        <ChevronRight size={16} strokeWidth={1.5} className="text-[#DADADA]" />
      </div>
    </button>
  )
}

function StatItem({
  label,
  value,
  onClick,
}: {
  label: string
  value: string | number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-1 active:opacity-60"
    >
      <span className="text-base font-bold text-[#1A1A1A]">{value}</span>
      <span className="text-xs text-[#ADADAD]">{label}</span>
    </button>
  )
}
