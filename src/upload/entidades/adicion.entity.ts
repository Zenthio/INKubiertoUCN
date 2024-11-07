import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venta } from './venta.entity';

@Entity()
export class Adicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVenta: number;

  @Column()
  fechaPago: Date;

  @Column()
  producto: string;

  @Column()
  categoria: string;

  @Column()
  cantidad: number;

  @Column()
  precio: number;

  @Column()
  costoBase: number;

  @Column()
  costoModif: number;

  @Column()
  costoTot: number;

  @Column()
  creadoPor: string;

  @Column()
  cocina: string;

  @Column()
  cancelada: string;

  @ManyToOne(() => Venta, venta => venta.adiciones)
  venta: Venta;
}