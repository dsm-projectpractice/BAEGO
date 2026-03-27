import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { GeocodeService } from './geocode.service';

@Controller('api/geocode')
export class GeocodeController {
  constructor(private readonly geocodeService: GeocodeService) {}

  @Get()
  async reverse(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    if (!lat || !lng) {
      throw new BadRequestException('lat and lng are required');
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      throw new BadRequestException('lat and lng must be valid numbers');
    }

    return this.geocodeService.reverse(latNum, lngNum);
  }
}
