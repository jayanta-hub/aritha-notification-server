import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
export class AppdetailsDto {
  @ApiProperty({
    description: 'The the User',
    example: 'Jayanta',
  })
  @IsString()
  orgid: string;

  @ApiProperty({
    description: 'The usertype of the User',
    example: 'ADMIN',
  })
  @IsArray()
  appname: string[];
}
