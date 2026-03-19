import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Utensils } from 'lucide-react'
import { Button } from '../components/common/Button'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { useGeolocation } from '../hooks/useGeolocation'

export default function SplashPage() {
  const navigate = useNavigate()
  const { coords, loading, requestLocation } = useGeolocation()

  useEffect(() => {
    if (coords) {
      navigate('/home', { replace: true })
    }
  }, [coords, navigate])

  return (
    <div className="flex flex-col min-h-screen bg-white px-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Utensils size={26} strokeWidth={1.5} color="white" />
          </div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
            배고
          </h1>
          <p className="mt-3 text-base text-[#6B6B6B] leading-relaxed">
            지금 내 주변 맛집,<br />
            터치 한 번으로 바로 추천받아요
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <FeatureItem
              icon={<MapPin size={16} strokeWidth={1.5} className="text-blue-500" />}
              text="현재 위치 기반으로 주변 맛집 탐색"
            />
            <FeatureItem
              icon={<span className="text-base">🎲</span>}
              text="고민 없이 랜덤 추천으로 메뉴 결정"
            />
            <FeatureItem
              icon={<span className="text-base">🔍</span>}
              text="거리·카테고리 필터로 취향대로 탐색"
            />
          </div>
        </div>
      </div>

      <div className="pb-10 pt-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={requestLocation}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoadingSpinner size={18} color="white" />
              위치 확인 중...
            </>
          ) : (
            <>
              <MapPin size={18} strokeWidth={2} />
              내 위치로 시작하기
            </>
          )}
        </Button>
        <p className="mt-4 text-center text-xs text-[#ADADAD] leading-relaxed">
          위치 정보는 식당 추천에만 사용되며<br />
          서버에 저장되지 않아요
        </p>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#F5F5F7] rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm text-[#6B6B6B]">{text}</span>
    </div>
  )
}
