import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalVentas(): Promise<{ total: number }> {
    const currentYear = new Date().getFullYear(); 
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0));


    // Imprimir las ventas que cumplen con el rango de fechas 
    const ventas = await this.prisma.venta.findMany({ 
      where: { 
        fecha: { 
          gte: firstDayOfMonth, // Primer día del mes actual 
          lt: firstDayOfNextMonth, // Primer día del próximo mes  
          },
         }, 
         orderBy: { fecha: 'asc', // Ordenar las ventas por fecha ascendente 
        },
        });
        console.log(`Ventas del ${currentMonth + 1}/${currentYear}:`, ventas);
    const result = await this.prisma.venta.aggregate({
         _sum: { 
            total: true,
         }, 
         where: { 
            fecha: { 
              gte: firstDayOfMonth, // Primer día del mes actual 
              lt: firstDayOfNextMonth, // Primer día del próximo mes 
            }, 
         }, 
    }); 
    console.log("Total ventas sumadas:", result._sum.total || 0);

    // Asegurarse de que la última venta está incluida en la suma 
    const lastVenta = ventas[ventas.length - 1]; 
    console.log("Última venta registrada:", lastVenta);
    return { total: result._sum.total || 0 };
  }

  async getTotalGastos(): Promise<{ total: number }> {
    const currentYear = new Date().getFullYear(); 
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11 
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0)); 
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0)); // Obtener todos los gastos dentro del rango de fechas y loguearlos 
    const gastos = await this.prisma.gasto.findMany({ 
      where: { 
        fecha: { 
          gte: firstDayOfMonth, 
          lt: firstDayOfNextMonth, 
        }, 
      }, 
      orderBy: { 
        fecha: 'asc', // Ordenar los gastos por fecha ascendente 
        }, 
      }); 
      console.log(`Gastos del ${currentMonth + 1}/${currentYear}:`, gastos); // Realizar la agregación de gastos 
      const result = await this.prisma.gasto.aggregate({ 
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
      console.log("Total gastos sumados:", result._sum.monto || 0); 
      return { total: -(result._sum.monto || 0) }; // Devuelve el total negativo para representar los gastos 
      }
}