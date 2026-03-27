import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeocodeService {
  private readonly logger = new Logger(GeocodeService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async reverse(lat: number, lng: number): Promise<{ address: string }> {
    const cacheKey = `geocode:${lat.toFixed(3)}:${lng.toFixed(3)}`;
    const cached = await this.cacheManager.get<{ address: string }>(cacheKey);
    if (cached) {
      this.logger.debug(`Cache HIT: ${cacheKey}`);
      return cached;
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
          {
            params: {
              coords: `${lng},${lat}`,
              output: 'json',
              orders: 'admcode',
            },
            headers: {
              'X-NCP-APIGW-API-KEY-ID': this.configService.get(
                'NAVER_MAP_CLIENT_ID',
              ),
              'X-NCP-APIGW-API-KEY': this.configService.get(
                'NAVER_MAP_CLIENT_SECRET',
              ),
            },
          },
        ),
      );

      const region = data?.results?.[0]?.region;
      const address = region
        ? `${region.area1?.name ?? ''} ${region.area2?.name ?? ''} ${region.area3?.name ?? ''}`.trim()
        : '위치 정보 없음';

      const result = { address };
      const ttl = Number(this.configService.get('CACHE_TTL_GEOCODE') ?? 86400);
      await this.cacheManager.set(cacheKey, result, ttl * 1000);

      return result;
    } catch (err) {
      this.logger.error('Naver Reverse Geocoding API error', err?.message);
      throw new HttpException(
        'Failed to fetch address from Naver Maps API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
