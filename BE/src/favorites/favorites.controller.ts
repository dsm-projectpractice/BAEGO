import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(
    @Body()
    body: {
      userId: number;
      placeId: string;
      placeName: string;
      category: string;
      naverLink: string;
    },
  ) {
    return this.favoritesService.create(body);
  }

  @Delete(':placeId')
  remove(@Param('placeId') placeId: string, @Query('userId') userId: string) {
    return this.favoritesService.remove(Number(userId), placeId);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.favoritesService.findAll(Number(userId));
  }
}
