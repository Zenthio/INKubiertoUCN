import { Module } from '@nestjs/common';
import { GraficoFService } from './graficoF.service';
import { GraficoFController } from './graficoF.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importar PrismaModule

@Module({
  imports: [PrismaModule], // Añadir PrismaModule a las importaciones
  controllers: [GraficoFController],
  providers: [GraficoFService],
})
export class GraficoFModule {}
