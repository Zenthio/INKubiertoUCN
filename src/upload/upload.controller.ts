import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelService } from './excel.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    // Procesa y guarda los datos del archivo Excel en la base de datos.
    return this.excelService.processExcelFile(file.buffer);
  }
}