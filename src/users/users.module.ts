import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
=======
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Agrega PrismaModule aquí
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
