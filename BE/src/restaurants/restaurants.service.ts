import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { firstValueFrom } from 'rxjs';

export interface RestaurantQuery {
  lat: number;
  lng: number;
  category?: string;
  radius?: number;
  sort?: 'distance' | 'rating';
}

const CATEGORY_KEYWORD: Record<string, string> = {
  한식: '한식',
  중식: '중식',
  일식: '일식',
  양식: '양식',
  전체: '음식점',
};

const VALID_RADIUS = [500, 1000, 2000];
const VALID_CATEGORIES = ['전체', '한식', '중식', '일식', '양식'];

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger(RestaurantsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async search(query: RestaurantQuery) {
    const category = VALID_CATEGORIES.includes(query.category ?? '')
      ? (query.category ?? '전체')
      : '전체';

    const radius = VALID_RADIUS.includes(query.radius ?? 0)
      ? (query.radius ?? 1000)
      : 1000;

    const sort = query.sort === 'rating' ? 'comment' : 'distance';

    const cacheKey = `restaurants:${query.lat.toFixed(3)}:${query.lng.toFixed(3)}:${category}:${radius}:${sort}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      this.logger.debug(`Cache HIT: ${cacheKey}`);
      return cached;
    }

    const keyword = CATEGORY_KEYWORD[category] ?? '음식점';
    const coordinate = `${query.lng},${query.lat}`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          'https://openapi.naver.com/v1/search/local.json',
          {
            params: {
              query: keyword,
              display: 20,
              start: 1,
              sort,
              radius,
              coordinate,
            },
            headers: {
              'X-Naver-Client-Id': this.configService.get('NAVER_CLIENT_ID'),
              'X-Naver-Client-Secret': this.configService.get(
                'NAVER_CLIENT_SECRET',
              ),
            },
          },
        ),
      );

      const ttl = Number(
        this.configService.get('CACHE_TTL_RESTAURANTS') ?? 1800,
      );
      await this.cacheManager.set(cacheKey, data, ttl * 1000);

      return data;
    } catch (err) {
      this.logger.error('Naver Search API error', err?.message);
      throw new HttpException(
        'Failed to fetch restaurants from Naver API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
