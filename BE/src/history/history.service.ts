import { Injectable } from '@nestjs/common';

// TODO: TypeORM Entity 연동 후 실제 DB 쿼리로 교체
@Injectable()
export class HistoryService {
  async create(body: {
    userId: number;
    placeId: string;
    placeName: string;
    category: string;
    region: string;
  }) {
    return { historyId: Date.now(), ...body, selectedAt: new Date() };
  }

  async findAll(userId: number) {
    return { userId, items: [] };
  }
}
