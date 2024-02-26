import { Injectable, Logger } from '@nestjs/common';
import { Permission } from './permission.entity';
import { ErrorMessage } from 'src/utils/helper';

@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);
  async createPermission(permissions: any) {
    try {
      const ExsitingUser = await Permission.findOne({
        where: {
          title: permissions.title,
        },
      });

      if (
        !ExsitingUser &&
        ![ExsitingUser].some((e) => e?.title === permissions?.title)
      ) {
        const result = await Permission.create(permissions, {
          returning: false,
        });
        // To Do  return successful message
        return result;
      } else {
        ErrorMessage(
          'Permission is existing. Please try with another Permission.',
        );
      }
    } catch (e) {
      this.logger.error(e);
      ErrorMessage(e);
    }
  }
}
