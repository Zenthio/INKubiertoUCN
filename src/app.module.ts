import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExcelModule } from './upload/excel.module';
import { FinanceModule } from './finance/finance.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ExcelModule, FinanceModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}