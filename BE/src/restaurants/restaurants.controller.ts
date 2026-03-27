import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('api/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async search(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('category') category?: string,
    @Query('radius') radius?: string,
    @Query('sort') sort?: string,
  ) {
    if (!lat || !lng) {
      throw new BadRequestException('lat and lng are required');
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      throw new BadRequestException('lat and lng must be valid numbers');
    }

    return this.restaurantsService.search({
      lat: latNum,
      lng: lngNum,
      category,
      radius: radius ? parseInt(radius) : undefined,
      sort: sort === 'rating' ? 'rating' : 'distance',
    });
  }
}
