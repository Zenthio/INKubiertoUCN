import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de ajustar la ruta a tu servicio Prisma
import { start } from 'repl';

@Injectable()
export class ComparationService {
  constructor(private readonly prisma: PrismaService) {}

  async getComparisonData(month: number): Promise<any> {
    console.log("GETCOMPARISON CON MES: ",month);
    let data: { valorIngreso?: number; valorGasto?: number } = {};

    const currentMonth=month;
    const currentYear=new Date().getFullYear();
    const fechaInicio= new Date(Date.UTC(currentYear,month,1));
    const fechaFinal= new Date(Date.UTC(currentYear,month+1,1));
    console.log(fechaInicio);
    console.log(fechaFinal);
    const ingreso= await this.prisma.venta.aggregate({
      _sum:{
        total:true,
      },
      where:{
        fecha:{
          gte:fechaInicio,
          lt:fechaFinal,
        },
      },
    });
    const gasto=await this.prisma.gasto.aggregate({
      _sum:{
        monto:true,
      },
      where:{
        fecha:{
          gte:fechaInicio,
          lt:fechaFinal,
        },
      },
    });
    data.valorIngreso = ingreso._sum.total || 0;  // Si no hay ventas, asignamos 0
    data.valorGasto = gasto._sum.monto || 0; 
    console.log(data);
    return data;  
}
}
