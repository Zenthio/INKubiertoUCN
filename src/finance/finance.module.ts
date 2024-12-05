import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';

@Module({
  providers: [FinanceService, PrismaService],
  controllers: [FinanceController],
})
export class FinanceModule {}
