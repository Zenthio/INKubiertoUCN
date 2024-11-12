import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsInt, IsNumber, IsIn, IsBoolean } from 'class-validator';

export class CreatePagoDto {
  @IsInt()
  id: number;

  @IsInt()
  idP: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  medioPago: string;

  @IsInt()
  monto: number;

  @IsString()
  caja: string;

  @IsString()
  sala: string;

  @IsInt()
  mesa: number;

  @IsString()
  cancelado: string;
}