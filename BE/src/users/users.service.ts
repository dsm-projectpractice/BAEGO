import { Injectable } from '@nestjs/common';

// TODO: TypeORM Entity 연동 후 실제 DB 쿼리로 교체
@Injectable()
export class UsersService {
  async findOrCreate(deviceId: string) {
    // stub — DB 연동 전 임시 응답
    return { userId: 1, deviceId };
  }

  async getPreferences(deviceId: string) {
    return {
      deviceId,
      preferredCategory: '전체',
      preferredRadius: 1000,
      preferredSort: 'distance',
      dislikedCategories: null,
    };
  }

  async updatePreferences(
    userId: number,
    body: { category?: string; radius?: number; sort?: string },
  ) {
    return { userId, ...body, updated: true };
  }
}
