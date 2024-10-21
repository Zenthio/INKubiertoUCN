import { IsString, IsNotEmpty, isEmail, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

