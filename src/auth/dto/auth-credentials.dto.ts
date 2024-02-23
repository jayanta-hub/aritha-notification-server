import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class SingupDto {
  @ApiProperty({
    description:
      'The Username for login. Username have minimun 4 characters including letters, number and special characters',
    example: 'Jayanta@123!',
  })
  @IsString()
  @MinLength(4)
  @IsOptional()
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Username is too weak',
  // })
  username: string;

  @ApiProperty({
    description: 'The User firstname.',
    example: 'Jayanta',
  })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({
    description: 'The User lastname',
    example: 'Jayanta',
  })
  @IsString()
  @IsOptional()
  lastname: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'PhoneNumber',
    example: '9898989898',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'The Email of the User',
    example: 'jayanta.Garu@gmail.com',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The user belongs to the Which organization',
    example: 'jkn2112b3jh12b3',
  })
  @IsString()
  @IsOptional()
  @IsOptional()
  orgid: string;

  @ApiProperty({
    description: 'App Details belongs to the user',
    example: 'jkn2112b3jh12b3',
  })
  @IsArray()
  @IsOptional()
  appdetails: object[];

  @ApiProperty({
    description: 'Org Name',
    example: 'Garu',
  })
  @IsString()
  @IsOptional()
  orgname: string;

  @ApiProperty({
    description: 'Type of user',
    example: 'SUPERADMIN || ORGADMIN ||ORGUSER',
  })
  @IsString()
  userType: string;
}
export class SigninDto {
  @ApiProperty({
    description: 'The UserName',
    example: 'Jayanta123',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsString()
  password: string;
}
export class DeleteDto {
  @ApiProperty({
    description: 'The userId of the User',
    example: 'Jayanta123',
  })
  @IsString()
  userid: string;
}
