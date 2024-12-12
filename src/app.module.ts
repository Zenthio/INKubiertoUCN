import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExcelModule } from './upload/excel.module';
import { FinanceModule } from './finance/finance.module';
import { PrismaService } from './prisma/prisma.service';
import { RoomsModule } from './graphics/rooms.module';
import { GraficoFModule } from './graficoF/graficoF.module';
import { GraficoGModule } from './graficoG/graficoG.module';
import { TablesModule } from './mesas/tables.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ExcelModule, FinanceModule, RoomsModule, GraficoFModule, GraficoGModule, TablesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}