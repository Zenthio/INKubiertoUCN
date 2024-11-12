import { IsDate, IsOptional, IsString, IsInt, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAdicionDto } from './create-adicion.dto';
import { CreatePagoDto } from './create-pago.dto';
export class CreateVentaDto {
  @IsInt()
  idV: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsDate()
  @Type(() => Date)
  creacion: Date;

  @IsDate()
  @Type(() => Date)
  cerrada: Date;

  @IsString()
  caja: string;

  @IsString()
  estado: string;

  @IsInt()
  mesa: number;

  @IsString()
  sala: string;

  @IsString()
  camarero: string;

  @IsString()
  medioPago: string;

  @IsNumber()
  total: number;

  @IsString()
  tipoVenta: string;

  @IsArray()
  @Type(() => CreateAdicionDto)
  adiciones: CreateAdicionDto[];

}