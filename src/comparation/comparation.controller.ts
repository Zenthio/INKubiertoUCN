import { Controller, Get, Query } from '@nestjs/common';
import { ComparationService } from './comparation.service';

@Controller('comparation')
export class ComparationController {
  constructor(private readonly comparationService: ComparationService) {}

  @Get('usage')
  async getComparisonData(@Query('months') months: string) {
    const parsedMonths = months.split(',').map((month) => parseInt(month, 10));
    return this.comparationService.getComparisonData(parsedMonths);
  }
}
