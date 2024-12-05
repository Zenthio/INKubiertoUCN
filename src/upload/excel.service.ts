import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid'; // Generador de UUID
import { CreateVentaDto } from './dtos/create-venta.dto';
import { CreateAdicionDto } from './dtos/create-adicion.dto';
import { CreatePagoDto } from './dtos/create-pago.dto';

@Injectable()
export class ExcelService {
  constructor(private readonly prisma: PrismaService) {}

  async readExcelFileV(fileBuffer: Buffer): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
  
    const archivoId = uuidv4(); // Generar un identificador único para esta carga
    const fechaCarga = new Date(); // Fecha actual
  
    // Verificar si este archivo ya ha sido procesado
    const archivoExistente = await this.prisma.venta.findFirst({
      where: { archivoid: archivoId },
    });
  
    if (archivoExistente) {
      console.log(`El archivo con ID ${archivoId} ya fue procesado.`);
      return; // No procesamos el archivo nuevamente
    }
  
    // Procesar el archivo y cargar los datos
    const ventasSheet = workbook.worksheets[0];
    const adicionSheet = workbook.worksheets[1];
    const pagosSheet = workbook.worksheets[3];
  
    // Marcar los registros existentes como archivados
    await this.prisma.venta.updateMany({
      where: { activo: true }, // Sólo si son activos
      data: { activo: false }, // Los desactivamos
    });

    // Leer y verificar las ventas
    for (let rowNumber = 5; rowNumber <= ventasSheet.rowCount; rowNumber++) {
      const row = ventasSheet.getRow(rowNumber);
      const idv = Number(row.getCell(1).value);

      // Verificar si la venta ya existe en la base de datos
      const ventaExistente = await this.prisma.venta.findUnique({
        where: { idv: idv },
      });
      if (!idv ) {
        console.log(`Fila ${rowNumber} omitida por datos incompletos`);
        continue; 
      }

      if (!ventaExistente) {
        const venta = {
          idv,
          fecha: new Date(row.getCell(2).value as string),
          creacion: new Date(row.getCell(3).value as string),
          cerrada: new Date(row.getCell(4).value as string),
          caja: row.getCell(5).value as string,
          estado: row.getCell(6).value as string,
          mesa: Number(row.getCell(7).value),
          sala: row.getCell(8).value as string,
          camarero: row.getCell(9).value as string,
          mediopago: row.getCell(10).value ? (row.getCell(10).value as string) : null,
          total: Number(row.getCell(11).value),
          tipoventa: row.getCell(12).value as string,
          archivoid: archivoId,
          fechacarga: fechaCarga,
          activo: true
          
        };
        
        // Insertar la nueva venta en la base de datos
        await this.prisma.venta.create({
          data: venta,
        });
        //ventas.push(venta);
        console.log(`Venta con id ${idv} insertada.`);
      } else {
        console.log(`Venta con id ${idv} ya existe.`);
      }
    } 
    //Lectura Adiciones
    for (let rowNumberA = 2; rowNumberA <= adicionSheet.rowCount; rowNumberA++) {
      const rowA = adicionSheet.getRow(rowNumberA);
      const idventa = Number(rowA.getCell(1).value);
      

    const adicion = {
      idventa,
      fechapago: parseDateCell(rowA.getCell(2).value),
      producto: rowA.getCell(3).value as string,
      categoria: rowA.getCell(4).value as string,
      cantidad: Number(rowA.getCell(5).value),
      precio: Number(rowA.getCell(6).value),
      costobase: Number(rowA.getCell(7).value),
      costomodif: Number(rowA.getCell(8).value),
      costotot: Number(rowA.getCell(9).value),
      creadopor: rowA.getCell(10).value as string,
      cocina: rowA.getCell(11).value as string,
      cancelada: rowA.getCell(12).value as string,
      activo: true
    };
    await this.prisma.adicion.create({
      data: adicion,
    });
    //adiciones.push(adicion);
  }
  for (let rowNumberP = 2; rowNumberP <= pagosSheet.rowCount; rowNumberP++) {
    const rowP = pagosSheet.getRow(rowNumberP);
    const idp = Number(rowP.getCell(1).value);
    

  const pago = {
    idp,
    fecha: parseDateCell(rowP.getCell(2).value),
    mediopago: rowP.getCell(3).value as string,
    monto: Number(rowP.getCell(4).value),
    caja: rowP.getCell(5).value as string,
    sala: rowP.getCell(9).value ? (rowP.getCell(9).value as string) : null,
    mesa: rowP.getCell(10).value ? (rowP.getCell(10).value as number) : null,
    cancelado: rowP.getCell(11).value as string,
    activo: true
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
  const archivoId = uuidv4(); // Generar un identificador único para esta carga
  const fechaCarga = new Date(); // Fecha actual
  const gastosSheet = workbook.worksheets[0];

  // Verificar si este archivo ya ha sido procesado (opcional)
  const archivoExistente = await this.prisma.gasto.findFirst({
    where: { archivoid: archivoId },
  });

  if (archivoExistente) {
    console.log(`El archivo con ID ${archivoId} ya fue procesado.`);
    return; // No procesamos el archivo nuevamente
  }

  // **Eliminar los registros anteriores de la tabla de gastos**
  await this.prisma.gasto.deleteMany({
    where: {}, // Esto elimina todos los registros de la tabla
  });

  console.log("Registros antiguos eliminados correctamente.");

  // Procesar los nuevos datos de gastos desde el archivo Excel
  for (let rowNumberG = 4; rowNumberG <= gastosSheet.rowCount; rowNumberG++) {
    const rowG = gastosSheet.getRow(rowNumberG);

    const gasto = {
      fecha: parseDateCell(rowG.getCell(2).value),
      giromes: rowG.getCell(3).value as string,
      item: rowG.getCell(4).value as string,
      monto: Number(rowG.getCell(5).value),
      archivoid: archivoId,
      fechacarga: fechaCarga,
      activo: true,
    };

    await this.prisma.gasto.create({
      data: gasto,
    });


  }
}
}

function parseDateCell(cellValue: ExcelJS.CellValue): Date | null {
  if (cellValue instanceof Date) {
    return cellValue;
  }
  return null;
}
