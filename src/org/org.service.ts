/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { Org } from './ogr.entity';
import { randomUUID } from 'crypto';
import { ErrorMessage } from 'src/utils/helper';

@Injectable()
export class OrgService {
  private readonly logger = new Logger(OrgService.name);
  async orgSignUp(userInfoDto: any) {
    try {
      userInfoDto['id'] = randomUUID();
      delete userInfoDto['userType'];
      const [org, created] = await Org.findOrCreate({
        where: {
          orgname: userInfoDto.orgname,
        },
        defaults: userInfoDto,
      });
      if (created) {
        return org;
      } else {
        ErrorMessage(
          'Oraganazation is existing. Please try with another UserName.',
        );
      }
    } catch (e) {
      this.logger.error(e);
      ErrorMessage(e);
    }
  }
}
