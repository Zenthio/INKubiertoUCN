import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  async getmesasByRoom(): Promise<{ name: number, total: number }[]> {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0));

    const mesas = await this.prisma.pago.groupBy({
      by: ['mesa'],
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

    return mesas.map(mesa => ({
      name: mesa.mesa || 0,
      total: mesa._sum.monto || 0,
    }));
  }
}
