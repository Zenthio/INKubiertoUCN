/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { ResetPasswordDto } from 'src/auth/dtos/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      select: { id: true, username: true, password: true },
    });
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
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
  async register(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const user = await this.prisma.usuario.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    return {
      userID: user.id,
      username: user.username,
      email: user.email,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: resetPasswordDto.email },
    });
    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, saltRounds);
    await this.prisma.usuario.update({
      where: { email: resetPasswordDto.email },
      data: { password: hashedPassword },
    });
    return { message: 'Contraseña actualizada exitosamente' };
  }

}