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
  // Require for all users.

  @ApiProperty({
    description: 'The Email of the User',
    example: 'jayanta.Garu@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Type of user',
    example: 'SUPERADMIN || ORGADMIN ||ORGUSER',
  })
  @IsString()
  userType: string;

  // Require for Organization.

  @ApiProperty({
    description: 'Organization Name',
    example: 'Org1',
  })
  @IsString()
  @IsOptional()
  orgname: string;

  @ApiProperty({
    description: 'Description about organization. If user is  Organization',
    example: 'This is Aritha Consulting Organization',
  })
  @IsString()
  @IsOptional()
  @IsOptional()
  description: string;

  // Require for Organization users.

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
    description:
      'The Username for login. Username have minimun 4 characters including letters, number and special characters. If user is Org user.',
    example: 'Jayanta@123!',
  })
  @IsString()
  @MinLength(4)
  @IsOptional()
  @MaxLength(32)
  username: string;

  @ApiProperty({
    description:
      'The password of the User. If user is not Supper Admin / Organization',
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
    description: 'PhoneNumber. If user is Organization user.',
    example: '9898989898',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsOptional()
  phone: string;

  @ApiProperty({
    description:
      'The user belongs to the Which organization. If user is Organization user.',
    example: 'jkn2112b3jh12b3',
  })
  @IsString()
  @IsOptional()
  @IsOptional()
  orgid: string;

  @ApiProperty({
    description:
      'App Details belongs to the user. If user is Organization user.',
    example: `[{appname: 'Holisto',role: 'User',permission: ['VIEW', 'UPDATE'],},{appname: 'Deduce',role: 'User',permission: ['VIEW'],}]`,
  })
  @IsArray()
  @IsOptional()
  appdetails: object[];
}
export class SigninDto {
  @ApiProperty({
    description: 'The UserName. If user is Organization user.',
    example: 'Jayanta123',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the User. If user is Organization user.',
    example: 'Password@123',
  })
  @IsString()
  password: string;
}
export class DeleteDto {
  @ApiProperty({
    description: 'The userId of the User.',
    example: 'Jayanta123',
  })
  @IsString()
  userid: string;
}
