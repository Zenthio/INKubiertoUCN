import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSalesByRoom(): Promise<{ name: string, total: number }[]> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0));

    const sales = await this.prisma.pago.groupBy({
      by: ['sala'],
      _sum: {
        monto: true,
      },
      where: {
        fecha: {
          gte: firstDayOfMonth,
          lt: firstDayOfNextMonth,
        },
      },
    });

    return sales.map(sale => ({
      name: sale.sala || 'sin sala',
      total: sale._sum.monto || 0,
    }));
  }
}
