import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service'; // Verifica que la ruta sea correcta

@Controller()
export class AppController {
<<<<<<< HEAD
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
=======
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
