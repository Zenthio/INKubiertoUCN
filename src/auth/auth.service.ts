import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
        console.error('Usuario no encontrado');
        throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Usuario encontrado:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Contraseña ingresada:', password);
    console.log('Hash almacenado:', user.password);
    console.log('¿Contraseña válida?', isPasswordValid);

    if (!isPasswordValid) {
        console.error('Contraseña incorrecta');
        throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  
  async login(user: { username: string; id: string }) {
    const payload = { username: user.username, sub: user.id };
    return {
      message: "Inicio de sesión exitoso",
      token: this.jwtService.sign(payload),
    };
  }
}