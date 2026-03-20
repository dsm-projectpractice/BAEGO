import { useState, useCallback } from 'react'

interface GeolocationState {
  coords: { lat: number; lng: number } | null
  address: string
  loading: boolean
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    address: '',
    loading: false,
    error: null,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: '위치 기능을 지원하지 않는 브라우저입니다.' }))
      return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        // 실제 서비스에서는 Naver Reverse Geocoding API 호출
        // 현재는 mock 주소 반환
        setState({
          coords: { lat: latitude, lng: longitude },
          address: '강남구 역삼동',
          loading: false,
          error: null,
        })
      },
      _err => {
        // 권한 거부 또는 에러 시 mock 위치 사용
        setState({
          coords: { lat: 37.5013, lng: 127.0397 },
          address: '강남구 역삼동',
          loading: false,
          error: null,
        })
      },
      { timeout: 8000, maximumAge: 60000 }
    )
  }, [])

  const refresh = useCallback(() => {
    setState({ coords: null, address: '', loading: false, error: null })
    requestLocation()
  }, [requestLocation])

  return { ...state, requestLocation, refresh }
}
