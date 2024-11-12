import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ExcelService } from './excel.service';
import * as ExcelJS from 'exceljs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload-ventas')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVentas(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      if (!file) {
        return { message: 'No file uploaded' };
      }
  
      if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return { message: 'El archivo debe ser un Excel (.xlsx)' };
      }
  
      const ventas = await this.excelService.readExcelFileV(file.buffer);
      return { message: 'Archivo procesado exitosamente', data: ventas };
    } catch (error) {
      console.error('Error al procesar el archivo de ventas', error);
      return { message: 'Error al procesar el archivo de ventas', error: error.message };
    }
  }

  @Post('upload-gastos')
  @UseInterceptors(FileInterceptor('file'))
  async uploadGastos(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      if (!file) {
        return { message: 'No file uploaded' };
      }
  
      if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return { message: 'El archivo debe ser un Excel (.xlsx)' };
      }
  
      const pagos = await this.excelService.readExcelFileP(file.buffer);
      return { message: 'Archivo procesado exitosamente', data: pagos };
    } catch (error) {
      console.error('Error al procesar el archivo de ventas', error);
      return { message: 'Error al procesar el archivo de ventas', error: error.message };
    }
  }
}

