import { Controller, Get } from '@nestjs/common';
import { PayMethodService } from './paymethod.service';

@Controller('paymethod')
export class PayMethodController {
  constructor(private readonly payMethodService: PayMethodService) {}

  @Get('usage')
  async getUsageByPaymentMethod() {
    return this.payMethodService.getUsageByPaymentMethod();
  }
}
