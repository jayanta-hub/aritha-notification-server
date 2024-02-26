/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { Super_admin } from './superadmin.entity';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { ErrorMessage } from 'src/utils/helper';

@Injectable()
export class SuperadminService {
  private readonly logger = new Logger(SuperadminService.name);

  async superadminsignUp(authCredentialsDto: any) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(authCredentialsDto.password, saltOrRounds);
      authCredentialsDto['id'] = randomUUID();
      authCredentialsDto['password'] = hash;
      const [user, created] = await Super_admin.findOrCreate({
        where: {
          username: authCredentialsDto.username,
        },
        defaults: authCredentialsDto,
      });
      if (created) {
        return user;
      } else {
        throw new Error('user is existing. Please try with another UserName.');
      }
    } catch (e) {
      this.logger.error(e);
      return ErrorMessage(e);
    }
  }
}
