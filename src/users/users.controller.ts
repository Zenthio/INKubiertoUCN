import { Controller, Post, Body, BadRequestException, InternalServerErrorException, NotFoundException, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto'; 
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    try {
      return await this.usersService.create(username, password, email);
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) { // Usa el DTO para login
    const { username, password } = loginUserDto;
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    return { message: 'Login successful' };
  }

  @Patch('forgot-password')
async forgotPassword(@Body() body: { email: string; newPassword: string; confirmPassword: string }) {
  const { email, newPassword, confirmPassword } = body;

  // Verificar si el correo existe
  const user = await this.usersService.findByEmail(email);
  if (!user) {
    throw new BadRequestException('Email not found');
  }

  // Verificar si las contraseñas coinciden
  if (newPassword !== confirmPassword) {
    throw new BadRequestException('Passwords do not match');
  }

  // Cambiar la contraseña del usuario
  const hashedPassword = await bcrypt.hash(newPassword, 20);
  await this.usersService.updatePassword(user.email, hashedPassword);
  
  return { message: 'Password updated successfully' };
}

}