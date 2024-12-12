import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GraficoGService {
  constructor(private readonly prisma: PrismaService) {}

  async getDaysInMonth(year: number, month: number): Promise<number> {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  async generateDailyData(): Promise<{ day: string, expenses: number }[]> {
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth();
    const daysInMonth = await this.getDaysInMonth(currentYear, currentMonth);

    const gastos = await this.prisma.gasto.findMany({
      where: {
        fecha: {
          gte: new Date(Date.UTC(currentYear, currentMonth, 1)),
          lt: new Date(Date.UTC(currentYear, currentMonth + 1, 1)),
        },
      },
      select: {
        fecha: true,
        monto: true,
      },
    });

    const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
      day: (i + 1).toString(),
      expenses: 0,
    }));

    gastos.forEach((gasto) => {
      const day = new Date(gasto.fecha).getUTCDate();
      dailyData[day - 1].expenses += Math.abs(Math.trunc(gasto.monto));
    });

    return dailyData;
  }

  async generateWeeklyData(): Promise<{ week: string, expenses: number }[]> {
    const dailyData = await this.generateDailyData();
    const weeklyData = [];
    let weeklyExpenses = 0;
    let weekNumber = 1;

    dailyData.forEach((data, index) => {
      weeklyExpenses += data.expenses;
      if ((index + 1) % 7 === 0 || index === dailyData.length - 1) {
        weeklyData.push({ week: `Semana ${weekNumber}`, expenses: Math.trunc(weeklyExpenses) });
        weeklyExpenses = 0;
        weekNumber += 1;
      }
    });

    return weeklyData;
  }

  async generateAnnualData(): Promise<{ month: string, expenses: number }[]> {
    const currentYear = new Date().getUTCFullYear();

    const gastos = await this.prisma.gasto.findMany({
      where: {
        fecha: {
          gte: new Date(Date.UTC(currentYear, 0, 1)),
          lt: new Date(Date.UTC(currentYear + 1, 0, 1)),
        },
      },
      select: {
        fecha: true,
        monto: true,
      },
    });

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const annualData = monthNames.map((month, i) => ({
      month: month,
      expenses: 0,
    }));

    gastos.forEach((gasto) => {
      const monthIndex = new Date(gasto.fecha).getUTCMonth();
      annualData[monthIndex].expenses += Math.abs(Math.trunc(gasto.monto));
    });

    console.log("Orden de meses antes de enviar:", annualData.map(item => item.month));
    return annualData;
  }
}
