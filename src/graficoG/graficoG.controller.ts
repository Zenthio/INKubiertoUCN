import { Controller, Get } from '@nestjs/common';
import { GraficoGService } from './graficoG.service';

@Controller('graficoG')
export class GraficoGController {
  constructor(private readonly graficoGService: GraficoGService) {}

  @Get('daily')
  getDailyData() {
    return this.graficoGService.generateDailyData();
  }

  @Get('weekly')
  getWeeklyData() {
    return this.graficoGService.generateWeeklyData();
  }

  @Get('annual')
  getAnnualData() {
    return this.graficoGService.generateAnnualData();
  }
}
