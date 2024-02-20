import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Super_admin } from './superadmin.entity';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class SuperadminService {
  private readonly logger = new Logger(SuperadminService.name);

  async superadminsignUp(authCredentialsDto: any) {
    try {
      const ExsitingUser = await Super_admin.findOne({
        where: {
          username: authCredentialsDto.username,
        },
      });
      if (!ExsitingUser) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(
          authCredentialsDto.password,
          saltOrRounds,
        );
        authCredentialsDto['id'] = randomUUID();
        authCredentialsDto['password'] = hash;

        const result = await Super_admin.create(authCredentialsDto, {
          returning: false,
        });

        return result;
      } else {
        throw new Error('user is existing. Please try with another UserName.');
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
