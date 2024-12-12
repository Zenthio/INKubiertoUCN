import { Controller, Get } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Producto } from './interfaceProducto';

@Controller('finanzas')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('/ventas/totalesConIVA')
  async getTotalVentas() {
    return this.financeService.getTotalVentas();
  }

  @Get('/gastos/totalesConIVA')
  async getTotalGastos() {
    return this.financeService.getTotalGastos();
  }

  @Get('/ventas/producto')
  async getProducts():Promise<Producto[]>{
    return this.financeService.getProducts();
  }
}
