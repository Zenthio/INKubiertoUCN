import { IsDate, IsOptional, IsString, IsInt, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGastoDto{
  @IsInt()
  id: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  giroMes: string;

  @IsString()
  item: string;

  @IsInt()
  monto: number;
}