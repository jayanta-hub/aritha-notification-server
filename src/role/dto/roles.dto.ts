import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateRolesDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  description: string;
}
