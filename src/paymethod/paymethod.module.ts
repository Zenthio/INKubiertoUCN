import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'; // Asegúrate de ajustar la ruta a tu módulo Prisma
import { PayMethodService } from './paymethod.service';
import { PayMethodController } from './paymethod.controller';

@Module({
  imports: [PrismaModule],
  providers: [PayMethodService],
  controllers: [PayMethodController],
})
export class PayMethodModule {}
