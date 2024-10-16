import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto'; 
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    return this.usersService.create(username, password);
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
}