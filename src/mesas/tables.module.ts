import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';

@Module({
  controllers: [TablesController],
  providers: [TablesService, PrismaService],
})
export class TablesModule {}
