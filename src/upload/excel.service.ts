import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVentaDto } from './dtos/create-venta.dto';
import { CreateAdicionDto } from './dtos/create-adicion.dto';
import { CreatePagoDto } from './dtos/create-pago.dto';

@Injectable()
export class ExcelService {
  constructor(private readonly prisma: PrismaService) {}

  async readExcelFileV(fileBuffer: Buffer): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);

    const ventasSheet = workbook.worksheets[0];
    const adicionSheet = workbook.worksheets[1];
    const pagosSheet = workbook.worksheets[3];
    const ventas = [];
    const adiciones = [];
    const pagos = [];
    // Leer y verificar las ventas
    for (let rowNumber = 5; rowNumber <= ventasSheet.rowCount; rowNumber++) {
      const row = ventasSheet.getRow(rowNumber);
      const idV = Number(row.getCell(1).value);

      // Verificar si la venta ya existe en la base de datos
      const ventaExistente = await this.prisma.venta.findUnique({
        where: { idV: idV },
      });
      if (!idV ) {
        console.log(`Fila ${rowNumber} omitida por datos incompletos`);
        continue; 
      }

      if (!ventaExistente) {
        const venta = {
          idV,
          fecha: new Date(row.getCell(2).value as string),
          creacion: new Date(row.getCell(3).value as string),
          cerrada: new Date(row.getCell(4).value as string),
          caja: row.getCell(5).value as string,
          estado: row.getCell(6).value as string,
          mesa: Number(row.getCell(7).value),
          sala: row.getCell(8).value as string,
          camarero: row.getCell(9).value as string,
          medioPago: row.getCell(10).value ? (row.getCell(10).value as string) : null,
          total: Number(row.getCell(11).value),
          tipoVenta: row.getCell(12).value as string
          
        };
        
        // Insertar la nueva venta en la base de datos
        await this.prisma.venta.create({
          data: venta,
        });
        //ventas.push(venta);
        console.log(`Venta con id ${idV} insertada.`);
      } else {
        console.log(`Venta con id ${idV} ya existe.`);
      }
    } 
    //Lectura Adiciones
    for (let rowNumberA = 2; rowNumberA <= adicionSheet.rowCount; rowNumberA++) {
      const rowA = adicionSheet.getRow(rowNumberA);
      const idVenta = Number(rowA.getCell(1).value);
      

    const adicion = {
      idVenta,
      fechaPago: parseDateCell(rowA.getCell(2).value),
      producto: rowA.getCell(3).value as string,
      categoria: rowA.getCell(4).value as string,
      cantidad: Number(rowA.getCell(5).value),
      precio: Number(rowA.getCell(6).value),
      costoBase: Number(rowA.getCell(7).value),
      costoModif: Number(rowA.getCell(8).value),
      costoTot: Number(rowA.getCell(9).value),
      creadoPor: rowA.getCell(10).value as string,
      cocina: rowA.getCell(11).value as string,
      cancelada: rowA.getCell(12).value as string,
    };
    await this.prisma.adicion.create({
      data: adicion,
    });
    //adiciones.push(adicion);
    const venta = ventas.find((v) => v.idV === adicion.idVenta);
    if (venta) {
      venta.adiciones.push(adicion);
    } else {
      console.log(`No se encontró la venta con id ${adicion.idVenta}`);
    }
  }
  for (let rowNumberP = 2; rowNumberP <= pagosSheet.rowCount; rowNumberP++) {
    const rowP = pagosSheet.getRow(rowNumberP);
    const idP = Number(rowP.getCell(1).value);
    

  const pago = {
    idP,
    fecha: parseDateCell(rowP.getCell(2).value),
    medioPago: rowP.getCell(3).value as string,
    monto: Number(rowP.getCell(4).value),
    caja: rowP.getCell(5).value as string,
    sala: rowP.getCell(9).value ? (rowP.getCell(9).value as string) : null,
    mesa: rowP.getCell(10).value ? (rowP.getCell(10).value as number) : null,
    cancelado: rowP.getCell(11).value as string,
  };
  await this.prisma.pago.create({
    data: pago,
  });
  //pagos.push(pago);
  }
}
async readExcelFileP(fileBuffer: Buffer): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(fileBuffer);
  const gastosSheet = workbook.worksheets[0];
  const gastos = [];
  for (let rowNumberG = 4; rowNumberG <= gastosSheet.rowCount; rowNumberG++) {
    const rowG = gastosSheet.getRow(rowNumberG);

    const gasto = {
      fecha: parseDateCell(rowG.getCell(2).value),
      giroMes: rowG.getCell(3).value as string,
      item: rowG.getCell(4).value as string,
      monto: Number(rowG.getCell(5).value)
    };
    await this.prisma.gasto.create({
      data: gasto,
    });
    //gastos.push(gasto);
    console.log(gasto);
  }
}
}
function parseDateCell(cellValue: ExcelJS.CellValue): Date | null {
  if (cellValue instanceof Date) {
    return cellValue;
  }
  return null;
}