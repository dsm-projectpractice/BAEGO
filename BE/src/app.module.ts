import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { createKeyv } from '@keyv/redis';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { GeocodeModule } from './geocode/geocode.module';
import { UsersModule } from './users/users.module';
import { HistoryModule } from './history/history.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        stores: [
          createKeyv(
            `redis://${config.get('REDIS_HOST')}:${config.get('REDIS_PORT')}`,
          ),
        ],
      }),
    }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: Number(config.get('RATE_LIMIT_TTL') ?? 60000),
          limit: Number(config.get('RATE_LIMIT_MAX') ?? 30),
        },
      ],
    }),

    RestaurantsModule,
    GeocodeModule,
    UsersModule,
    HistoryModule,
    FavoritesModule,
  ],
})
export class AppModule {}
