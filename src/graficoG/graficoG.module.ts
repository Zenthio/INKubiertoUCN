import { Module } from '@nestjs/common';
import { GraficoGService } from './graficoG.service';
import { GraficoGController } from './graficoG.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importar PrismaModule

@Module({
  imports: [PrismaModule], // Añadir PrismaModule a las importaciones
  controllers: [GraficoGController],
  providers: [GraficoGService],
})
export class GraficoGModule {}
