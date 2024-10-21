import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
})
export class AppModule {}
=======
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
