import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body('device_id') deviceId: string) {
    return this.usersService.findOrCreate(deviceId);
  }

  @Get(':deviceId/preferences')
  getPreferences(@Param('deviceId') deviceId: string) {
    return this.usersService.getPreferences(deviceId);
  }

  @Patch(':userId/preferences')
  updatePreferences(
    @Param('userId') userId: string,
    @Body() body: { category?: string; radius?: number; sort?: string },
  ) {
    return this.usersService.updatePreferences(Number(userId), body);
  }
}
