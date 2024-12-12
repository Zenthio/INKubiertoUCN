import { Controller, Get } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get('mesas')
  getmesasByRoom() {
    return this.tablesService.getmesasByRoom();
  }
}
