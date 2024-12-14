import { Controller, Get, Query } from '@nestjs/common';
import { ComparationService } from './comparation.service';

@Controller('comparation')
export class ComparationController {
  constructor(private readonly comparationService: ComparationService) {}

  @Get('usage')
  async getComparisonData(@Query('months') monthString: string) {
  const month=parseInt(monthString)
  return this.comparationService.getComparisonData(month);
  }
}
