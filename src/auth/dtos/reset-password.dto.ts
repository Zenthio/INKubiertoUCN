/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  token: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}