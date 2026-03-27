import { Injectable } from '@nestjs/common';

// TODO: TypeORM Entity 연동 후 실제 DB 쿼리로 교체
@Injectable()
export class FavoritesService {
  async create(body: {
    userId: number;
    placeId: string;
    placeName: string;
    category: string;
    naverLink: string;
  }) {
    return { favoriteId: Date.now(), ...body, createdAt: new Date() };
  }

  async remove(userId: number, placeId: string) {
    return { userId, placeId, removed: true };
  }

  async findAll(userId: number) {
    return { userId, items: [] };
  }
}
