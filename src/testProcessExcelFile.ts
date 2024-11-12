import * as ExcelJS from 'exceljs';
import { format } from 'date-fns';
import { read } from 'fs';
import { error } from 'console';

async function readExcelFileV(filePath: string): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const ventasSheet = workbook.worksheets[0];
  const adicionSheet = workbook.worksheets[1];
  const pagosSheet = workbook.worksheets[3];
  const ventas = [];
  const pagos = [];

  //Lectura Ventas
  ventasSheet.eachRow((row, rowNumber) => {
    if (rowNumber < 4) return;

    const venta = {
      id: Number(row.getCell(1).value),
      fecha: parseDateCell(row.getCell(2).value),
      creacion: parseDateCell(row.getCell(3).value),
      cerrada: parseDateCell(row.getCell(4).value),
      caja: row.getCell(5).value as string,
      estado: row.getCell(6).value as string,
      mesa: Number(row.getCell(7).value),
      sala: row.getCell(8).value as string,
      camarero: row.getCell(9).value as string,
      medioDePago: row.getCell(10).value ? (row.getCell(10).value as string) : null,
      total: row.getCell(11).value as string,
      tipoDeVenta: row.getCell(12).value as string,
      adiciones: [],
      pagos: []
    };

    ventas.push(venta);
  });
  //Lectura Adiciones
  adicionSheet.eachRow((rowA, rowNumberA) => {
    if(rowNumberA < 1) return;

    const adicion = {
      idVenta: Number(rowA.getCell(1).value),
      fechaPago: parseDateCell(rowA.getCell(2).value),
      producto: rowA.getCell(3).value as string,
      categoria: rowA.getCell(4).value as string,
      cantidad: rowA.getCell(5).value as string,
      precio: Number(rowA.getCell(6).value),
      costoBase: Number(rowA.getCell(7).value),
      costoModif: Number(rowA.getCell(8).value),
      costoTot: Number(rowA.getCell(9).value),
      creadoPor: rowA.getCell(10).value as string,
      cocina: rowA.getCell(11).value as string,
      cancelada: rowA.getCell(12).value as string,
    };
    const venta = ventas.find((v) => v.id === adicion.idVenta);
    if (venta) {
      venta.adiciones.push(adicion);
    } else {
      console.log(`No se encontró la venta con id ${adicion.idVenta}`);
    }
  });
  //Lectura Pagos
  pagosSheet.eachRow((rowP, rowNumberP) => {
    if(rowNumberP < 1) return;

    const pago = {
      idVenta: Number(rowP.getCell(1).value),
      fechaPago: parseDateCell(rowP.getCell(2).value),
      medioPago: rowP.getCell(3).value as string,
      monto: Number(rowP.getCell(4).value),
      caja: rowP.getCell(5).value as string,
      sala: rowP.getCell(6).value as string,
      mesa: Number(rowP.getCell(7).value),
      cancelado: Number(rowP.getCell(8).value),
    };
    pagos.push(pago);
  });


}

function parseDateCell(cellValue: ExcelJS.CellValue): Date | null {
  if (cellValue instanceof Date) {
    return cellValue;
  }
  return null;
}


async function readExcelFileG(filePath: string): Promise<void>{
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const gastosSheet = workbook.worksheets[0];
  const gastos = [];
  gastosSheet.eachRow((rowG, rowNumberG) => {
    if (rowNumberG < 4) return;
    const fecha = parseDateCell(rowG.getCell(2).value);
  
    // Verifica si la fecha es válida (no está vacía o nula)
    if (!fecha) {
      return; 
  }
    const gasto = {
      fecha: fecha,
      giroMes: rowG.getCell(3).value as string,
      item: rowG.getCell(4).value as string,
      monto: Number(rowG.getCell(5).value)
    };
    gastos.push(gasto);
  });
}

const filePath = 'D:\\UCN 2\\2024\\Segundo semestre\\Ingeso\\A+S\\Datos INK\\VENTAS SEPTIEMBRE23.xlsx';
readExcelFileV(filePath).catch((error) => {
  console.error('Error al leer el archivo:', error);
});

const filePathG = 'D:\\UCN 2\\2024\\Segundo semestre\\Ingeso\\A+S\\Datos INK\\GASTOS SEPTIEMBRE23.xlsx';
readExcelFileG(filePathG).catch((error) => {
  console.error('Error al leer el archivo', error);
});