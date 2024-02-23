import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}
  @HttpCode(HttpStatus.OK)
  @Get('/:searchparams')
  @ApiParam({
    name: 'searchparams',
    required: true,
    description: 'searchparams to fetch car details',
    type: 'string',
  })
  getCarDeatils(@Param() searchparams: string) {
    return this.carService.getCarDeatils(searchparams);
  }
}
