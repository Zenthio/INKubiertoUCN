import { IsString, IsNotEmpty, IsAlphanumeric, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  }