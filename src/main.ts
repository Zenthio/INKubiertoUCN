import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma el cuerpo a la clase DTO
      whitelist: true, // Elimina propiedades no especificadas en el DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
