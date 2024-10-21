import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(username: string, password: string, email: string) {
    const hashedPassword = await bcrypt.hash(password, 20);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

<<<<<<< HEAD
  async findByEmail(email: string){
=======
  async findByEmail(email: string) {
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updatePassword(email: string, newPassword: string) {
    return this.prisma.user.update({
      where: { email },
<<<<<<< HEAD
      data: { password: newPassword },
    });
  }

}
=======
      data: { password: newPassword }, // Asegúrate de que aquí se esté guardando el hash
    });
  }
}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
