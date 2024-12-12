import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'; // Asegúrate de ajustar la ruta a tu módulo Prisma
import { ComparationService } from './comparation.service';
import { ComparationController } from './comparation.controller';

@Module({
  imports: [PrismaModule],
  providers: [ComparationService],
  controllers: [ComparationController],
})
export class ComparationModule {}
