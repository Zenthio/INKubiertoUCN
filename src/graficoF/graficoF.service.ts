import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GraficoFService {
  constructor(private readonly prisma: PrismaService) {}

  async getDaysInMonth(year: number, month: number): Promise<number> {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  async generateDailyData(): Promise<{ day: string, earnings: number }[]> {
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth();
    const daysInMonth = await this.getDaysInMonth(currentYear, currentMonth);

    const ventas = await this.prisma.venta.findMany({
      where: {
        fecha: {
          gte: new Date(Date.UTC(currentYear, currentMonth, 1)),
          lt: new Date(Date.UTC(currentYear, currentMonth + 1, 1)),
        },
      },
      select: {
        fecha: true,
        total: true,
      },
    });

    const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
      day: (i + 1).toString(),
      earnings: 0,
    }));

    ventas.forEach((venta) => {
      const day = new Date(venta.fecha).getUTCDate();
      dailyData[day - 1].earnings += Math.trunc(venta.total);
    });

    return dailyData;
  }

  async generateWeeklyData(): Promise<{ week: string, earnings: number }[]> {
    const dailyData = await this.generateDailyData();
    const weeklyData = [];
    let weeklyEarnings = 0;
    let weekNumber = 1;

    dailyData.forEach((data, index) => {
      weeklyEarnings += data.earnings;
      if ((index + 1) % 7 === 0 || index === dailyData.length - 1) {
        weeklyData.push({ week: `Semana ${weekNumber}`, earnings: Math.trunc(weeklyEarnings) });
        weeklyEarnings = 0;
        weekNumber += 1;
      }
    });

    return weeklyData;
  }

  async generateAnnualData(): Promise<{ month: string, earnings: number }[]> {
    const currentYear = new Date().getUTCFullYear();

    const ventas = await this.prisma.venta.findMany({
      where: {
        fecha: {
          gte: new Date(Date.UTC(currentYear, 0, 1)),
          lt: new Date(Date.UTC(currentYear + 1, 0, 1)),
        },
      },
      select: {
        fecha: true,
        total: true,
      },
    });

    // Mantenemos los nombres completos de los meses para asegurar una ordenación correcta
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const annualData = monthNames.map((month, i) => ({
      month: month,
      earnings: 0,
    }));

    ventas.forEach((venta) => {
      const monthIndex = new Date(venta.fecha).getUTCMonth();
      annualData[monthIndex].earnings += Math.trunc(venta.total);
    });

    console.log("Orden de meses antes de enviar:", annualData.map(item => item.month));
    return annualData;
  }
}
