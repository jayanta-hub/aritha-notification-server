import { Body, Controller, Post } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}
  @Post('/signup')
  async createSuperAdmin(@Body() createSuperAdmin: any): Promise<void> {
    await this.superadminService.superadminsignUp(createSuperAdmin);
  }
}
