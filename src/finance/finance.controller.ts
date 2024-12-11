import { Controller, Get } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Producto } from './interfaceProducto';

@Controller('finanzas')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('/ventas/totales')
  async getTotalVentas() {
    return this.financeService.getTotalVentas();
  }

  @Get('/gastos/totales')
  async getTotalGastos() {
    return this.financeService.getTotalGastos();
  }
  @Get('/ventas/producto')
  async getTotalProducto():Promise<Producto[]>{
    return this.financeService.obtenerDatos();
  }
}
