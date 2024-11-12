import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsInt, IsNumber, IsBoolean } from 'class-validator';

export class CreateAdicionDto {
  @IsInt()
  id: number;

  @IsInt()
  idVenta: number;

  @IsDate()
  @Type(() => Date)
  fechaPago: Date;

  @IsString()
  producto: string;

  @IsString()
  categoria: string;

  @IsInt()
  cantidad: number;

  @IsInt()
  precio: number;

  @IsInt()
  costoBase: number;

  @IsInt()
  costoModif: number;

  @IsInt()
  costoTot: number;

  @IsString()
  creadoPor: string;

  @IsString()
  cocina: string;

  @IsString()
  cancelada: string;
}