import { Controller, Get } from '@nestjs/common';
import { FinanceService } from './finance.service';

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
}
