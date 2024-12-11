import { Controller, Get } from '@nestjs/common';
import { GraficoFService } from './graficoF.service';

@Controller('graficoF')
export class GraficoFController {
  constructor(private readonly graficoFService: GraficoFService) {}

  @Get('daily')
  getDailyData() {
    return this.graficoFService.generateDailyData();
  }

  @Get('weekly')
  getWeeklyData() {
    return this.graficoFService.generateWeeklyData();
  }

  @Get('annual')
  getAnnualData() {
    return this.graficoFService.generateAnnualData();
  }
}
