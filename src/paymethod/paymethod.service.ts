import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de ajustar la ruta a tu servicio Prisma

@Injectable()
export class PayMethodService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsageByPaymentMethod(): Promise<{ [key: string]: number }> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0)); //puede tener error 
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0));

    const pagos = await this.prisma.pago.findMany({
      where: {
        fecha: {
          gte: firstDayOfMonth,
          lt: firstDayOfNextMonth,
        },
        cancelado: {
          not: 'si',
        },
      },
    });

    const usage = pagos.reduce((acc, pago) => {
      acc[pago.mediopago] = (acc[pago.mediopago] || 0) + 1;
      return acc;
    }, {});

    return usage;
  }
}
