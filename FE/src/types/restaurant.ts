export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '카페'
export type DistanceFilter = '500m' | '1km' | '2km'
export type PriceRange = '저렴' | '보통' | '비쌈'

export interface Restaurant {
  id: string
  name: string
  category: Exclude<Category, '전체'>
  rating: number
  reviewCount: number
  distanceM: number
  address: string
  tags: string[]
  naverPlaceId: string
  isOpen: boolean
  priceRange: PriceRange
}
