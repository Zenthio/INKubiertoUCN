<<<<<<< HEAD
import { IsString, IsNotEmpty, isEmail, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
=======
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3

  @IsString()
  @IsNotEmpty()
  password: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
