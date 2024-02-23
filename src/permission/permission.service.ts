import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Permission } from './permission.entity';

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
        return new UnauthorizedException(
          'Roles is existing. Please try with another Roles.',
        );
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
