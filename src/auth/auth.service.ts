/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
//import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { ResetPasswordDto } from 'src/auth/dtos/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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

  /*

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

  */

  async requestResetPassword(email: string) {

    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }

    const token = uuidv4();
    await this.prisma.passwordResetToken.create({
      data: {
        email,
        token,
        createdAt: new Date(),
      },
    });

    const resetLink = `http://your-frontend-url/reset-password?token=${token}`; //Falta cambiarlo a localhost:Elpuerto

    await this.mailerService.sendMail({
      to: email,
      subject: 'Restablecimiento de contraseña',
      template: './reset-password', // The template file name
      context: {
        name: user.username,
        resetLink,
      },
    });

    return { message: 'Correo de confirmación enviado' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const tokenRecord = await this.prisma.passwordResetToken.findUnique({
      where: { token: resetPasswordDto.token },
    });

    if (!tokenRecord) {
      throw new ConflictException('Token inválido o expirado');
    }

    const tokenAge = (new Date().getTime() - new Date(tokenRecord.createdAt).getTime()) / 1000;
    if (tokenAge > 3600) { // 1 hour in seconds
      throw new ConflictException('Token expirado');
    }
  
    const user = await this.prisma.usuario.findUnique({
      where: { email: tokenRecord.email },
    });
    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, saltRounds);
    await this.prisma.usuario.update({
      where: { email: tokenRecord.email },
      data: { password: hashedPassword },
    });
  
    await this.prisma.passwordResetToken.delete({
      where: { token: resetPasswordDto.token },
    });
  
    return { message: 'Contraseña actualizada exitosamente' };
  }

}