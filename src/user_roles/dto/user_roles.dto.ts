import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
export class CreateRolesDto {
  @ApiProperty()
  @IsString()
  userid: string;

  @ApiProperty()
  @IsArray()
  appdetails: string[];
}
