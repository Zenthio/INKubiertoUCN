import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma el cuerpo a la clase DTO
    whitelist: true, // Elimina propiedades no especificadas en el DTO
  }));

  // Habilitar CORS para permitir solicitudes del frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Cambia esto si tu frontend tiene otra URL
    credentials: true, // Permitir el uso de credenciales (como cookies)
  });

  await app.listen(3000);
}
bootstrap();