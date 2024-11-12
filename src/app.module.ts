import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExcelModule } from './upload/excel.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ExcelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
