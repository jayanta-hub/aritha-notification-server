import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Car } from './car.entity';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);
  async getCarDeatils(name: any) {
    try {
      const result = await Car.findAll({
        where: {
          car_brand: name.searchparams,
        },
      });
      return result;
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
