import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de ajustar la ruta a tu servicio Prisma

@Injectable()
export class ComparationService {
  constructor(private readonly prisma: PrismaService) {}

  async getComparisonData(months: number[]): Promise<any> {
    const now = new Date();
    const data = {};

    for (const offset of months) {
      const month = (now.getMonth() - offset + 12) % 12;
      const year = now.getFullYear() - (now.getMonth() < offset ? 1 : 0);

      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 1);

      const ingresos = await this.prisma.pago.aggregate({
        _sum: {
          monto: true,
        },
        where: {
          fecha: {
            gte: startDate,
            lt: endDate,
          },
          monto: {
            gt: 0,
          },
        },
      });

      const gastos = await this.prisma.pago.aggregate({
        _sum: {
          monto: true,
        },
        where: {
          fecha: {
            gte: startDate,
            lt: endDate,
          },
          monto: {
            lt: 0,
          },
        },
      });

      data[month] = {
        monthName: startDate.toLocaleString('default', { month: 'long' }),
        ingresos: ingresos._sum.monto || 0,
        gastos: Math.abs(gastos._sum.monto) || 0,
      };
    }

    return data;
  }
}
