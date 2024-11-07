import * as fs from 'fs';
import * as path from 'path';
import { ExcelService } from '../src/upload/excel.service';  // Ruta correcta al servicio Excel
import { PrismaService } from './prisma/prisma.service';

//async function testProcessExcelFile() {
    // Define la ruta completa directamente sin `path.join`
    //const filePath = 'D:\\UCN 2\\2024\\Segundo semestre\\Ingeso\\A+S\\Datos INK\\GASTOS SEPTIEMBRE23.xlsx';
    //const fileBuffer = fs.readFileSync(filePath);  // Lee el archivo y conviértelo en un buffer
    //const prismaService = new PrismaService();
    //try {
      //const excelService = new ExcelService(prismaService);  // Asegúrate de inicializar tu servicio correctamente
      //const result = await excelService.processExcelFile(fileBuffer);
  
      //console.log('Ventas procesadas:', result.ventas);
      //console.log('Adiciones procesadas:', result.adiciones);
      //console.log('Pagos procesados:', result.pagos);
    //} catch (error) {
     // console.error('Error procesando el archivo Excel:', error);
   // }
 // }
  
  // Ejecutar la prueba
  //testProcessExcelFile();