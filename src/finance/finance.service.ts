import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Producto } from './interfaceProducto';


@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalVentas(): Promise<{ total: number }> {
    const currentYear = new Date().getFullYear(); 
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0));

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
    return { total: result._sum.total || 0 };
  }

  async getTotalGastos(): Promise<{ total: number }> {
    const currentYear = new Date().getFullYear(); 
    const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11 
    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0)); 
    const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0)); // Obtener todos los gastos dentro del rango de fechas y loguearlos 
   
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


      async getProducts(): Promise<{ NOMBRE: string, CANTIDAD: number ,VENTAS: number }[]> {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // Meses en JavaScript van de 0 a 11
        const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1, 0, 0, 0));
        const firstDayOfNextMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 1, 0, 0, 0));
    
        const products = await this.prisma.adicion.groupBy({
          by: ['producto'],
          _sum: {
            precio: true,
            cantidad: true,
          },
          where: {
            fechapago: {
              gte: firstDayOfMonth,
              lt: firstDayOfNextMonth,
            },
          },
        });
    
        return products.map(product => ({
          NOMBRE: product.producto || 'sin producto',
          CANTIDAD: product._sum.cantidad || 0,
          VENTAS: product._sum.precio,
        }));
      }catch (error){
        throw new Error(`Error al obtener datos agrupados: ${error.message}`)
      }
}

