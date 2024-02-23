import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User_type } from './userType.entity';

@Injectable()
export class UsertypeService {
  private readonly logger = new Logger(UsertypeService.name);

  async getUserType() {
    try {
      const result = await User_type.findAll();
      return result;
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
  async createUserType(userType: any) {
    console.log('🚀 ~ UsertypeService ~ createUserType ~ userType:', userType);
    try {
      const result = await User_type.create(userType);
      return result;
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
