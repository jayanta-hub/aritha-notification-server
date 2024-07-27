import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/auth/authusers.entity';
import { ErrorMessage } from 'src/utils/helper';

@Injectable()
export class ResetUsernameService {
  private readonly logger = new Logger(ResetUsernameService.name);
  async update(updateUsername: any) {
    try {
      const user = await Users.findOne({
        where: { email: updateUsername.email },
      });
      if (user) {
        // the user is currently named "Jane" in the database
        user.username = updateUsername.username;
        // the name is still "Jane" in the database
        await user.save();
        return {
          data: {
            id: user?.id,
            username: user?.username,
            orgid: user?.orgid,
          },
          message: 'Username updated successfully.',
        };
      } else {
        throw new NotFoundException({
          message: 'User not found',
        });
      }
    } catch (err) {
      this.logger.error(err);
      return ErrorMessage(err);
    }
  }
}
