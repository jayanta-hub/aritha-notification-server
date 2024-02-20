import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class SuperAdminSingupDto {
  @ApiProperty({
    description: 'The User',
    example: 'Jayanta',
  })
  @IsString()
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'The User firstname',
    example: 'Jayanta',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'The User lastname',
    example: 'Jayanta',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @ApiProperty({
    description: 'PhoneNumber',
    example: '9898989898',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @ApiProperty({
    description: 'The Email of the User',
    example: 'jayanta.Garu@gmail.com',
  })
  @IsString()
  email: string;
}
