import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('api/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(
    @Body()
    body: {
      userId: number;
      placeId: string;
      placeName: string;
      category: string;
      region: string;
    },
  ) {
    return this.historyService.create(body);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.historyService.findAll(Number(userId));
  }
}
