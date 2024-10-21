import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user.dto'; // Asegúrate de que esta ruta sea correcta

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return { message: 'Invalid credentials' }; // Manejo de error
    }
    return this.authService.login(user);
  }
}