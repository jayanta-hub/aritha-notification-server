import { Injectable, Logger } from '@nestjs/common';
import { User_type } from './userType.entity';
import { ErrorMessage } from 'src/utils/helper';

@Injectable()
export class UsertypeService {
  private readonly logger = new Logger(UsertypeService.name);

  async getUserType() {
    try {
      const result = await User_type.findAll();
      return result;
    } catch (e) {
      this.logger.error(e);
      ErrorMessage(e);
    }
  }
  async createUserType(userType: any) {
    try {
      const result = await User_type.create(userType);
      return result;
    } catch (e) {
      this.logger.error(e);
      ErrorMessage(e);
    }
  }
}
