import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalVentas(): Promise<{ total: number }> {
    const result = await this.prisma.venta.aggregate({
      _sum: {
        total: true,
      },
    });
    return { total: result._sum.total || 0 };
  }

  async getTotalGastos(): Promise<{ total: number }> {
    const result = await this.prisma.gasto.aggregate({
      _sum: {
        monto: true,
      },
    });
    return { total: -(result._sum.monto || 0) }; // Devuelve el total negativo para representar los gastos
  }
}
