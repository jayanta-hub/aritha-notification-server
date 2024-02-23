/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Org } from './ogr.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrgService {
  private readonly logger = new Logger(OrgService.name);
  async orgSignUp(userInfoDto: any) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(userInfoDto.password, saltOrRounds);
      userInfoDto['id'] = randomUUID();
      userInfoDto['password'] = hash;
      const [org, created] = await Org.findOrCreate({
        where: {
          orgname: userInfoDto.orgname,
        },
        defaults: userInfoDto,
      });
      if (created) {
        return org;
      } else {
        throw new Error(
          'Oraganazation is existing. Please try with another UserName.',
        );
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
