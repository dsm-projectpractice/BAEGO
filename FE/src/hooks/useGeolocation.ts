import { useState, useCallback, useEffect } from 'react'

interface GeolocationState {
  coords: { lat: number; lng: number } | null
  address: string
  loading: boolean
  error: string | null
}

const DEFAULT_COORDS = { lat: 37.4979, lng: 127.0276 }
const GEOCODE_API_BASE = 'http://localhost:3000/api/geocode'

async function fetchAddress(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(`${GEOCODE_API_BASE}?lat=${lat}&lng=${lng}`)
    if (!res.ok) return '현재 위치'
    const data: { address: string } = await res.json()
    return data.address || '현재 위치'
  } catch {
    return '현재 위치'
  }
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
      async position => {
        const { latitude, longitude } = position.coords
        const coords = { lat: latitude, lng: longitude }
        const address = await fetchAddress(latitude, longitude)
        setState({ coords, address, loading: false, error: null })
      },
      async () => {
        const address = await fetchAddress(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng)
        setState({ coords: DEFAULT_COORDS, address, loading: false, error: null })
      },
      { timeout: 8000, maximumAge: 60000 }
    )
  }, [])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  const refresh = useCallback(() => {
    setState({ coords: null, address: '', loading: false, error: null })
    requestLocation()
  }, [requestLocation])

  return { ...state, requestLocation, refresh }
}
