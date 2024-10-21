<<<<<<< HEAD
import { IsString, IsNotEmpty, IsAlphanumeric, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
=======
import {
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  Length,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
