import * as xlsx from 'xlsx';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { CreateAdicionDto } from './dtos/create-adicion.dto';
import { CreatePagoDto } from './dtos/create-pago.dto';

@Injectable()
export class ExcelService {
  constructor(private readonly prisma: PrismaService) {}
    

  async processExcelFile(fileBuffer: Buffer) {
    const excel = xlsx.read(fileBuffer, { type: 'buffer' });
    const ventasE = excel.SheetNames[0];
    const workVentas = excel.Sheets[ventasE];
    const rowsVentas = xlsx.utils.sheet_to_json(workVentas, { header: 1 });
    const ventas: CreateVentaDto[] = [];
    rowsVentas.forEach((row: any[], index: number) => {
      if (index > 3 && row.length) {
          const venta: CreateVentaDto = {
            id: row[0],
            fecha: row[1],
            creacion: row[2],
            cerrada: row[3],
            caja: row[4],
            estado: row[5],
            mesa: row[6],
            sala: row[7],
            camarero: row[8],
            medioPago: row[9],
            total: row[10],
            tipoVenta: row[11],
            adiciones: [],
            pagos: []
          };
          console.log('Venta procesada:', venta);
          ventas.push(venta);
      }
  });
  
  const adicionesE = excel.SheetNames[1];
  const workAdiciones = excel.Sheets[adicionesE];
  const rowsAdiciones = xlsx.utils.sheet_to_json(workAdiciones, { header: 1 });
  const adiciones: CreateAdicionDto[] = [];

  rowsAdiciones.forEach((row: any[], index: number) => {
      if (index > 0 && row.length) { 
          const adicion: CreateAdicionDto= {
            idVenta: row[0],
            fechaPago: row[1],
            producto: row[2],
            categoria: row[3],
            cantidad: row[4],
            precio: row[5],
            costoBase: row[6],
            costoModif: row[7],
            costoTot: row[8],
            creadoPor: row[9],
            cocina: row[10],
            cancelada: row[11]
          };
          adiciones.push(adicion);
      }
  });

    // Leer la cuarta hoja (Pagos)
  const pagosE = excel.SheetNames[2];
  const workPagos = excel.Sheets[pagosE];
  const rowsPagos = xlsx.utils.sheet_to_json(workPagos, { header: 1 });
  const pagos: CreatePagoDto[] = [];

  rowsPagos.forEach((row: any[], index: number) => {
      if (index > 0 && row.length) {
          const pago: CreatePagoDto = {
            id: row[0],
            fecha: row[1],
            medioPago: row[2],
            monto: row[3],
            caja: row[4],
            sala: row[8],
            mesa: row[9],
            cancelado: row[10]   
          };
          pagos.push(pago);
      }
  });
  return { ventas, adiciones, pagos };

  }

}