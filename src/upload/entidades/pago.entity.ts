import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venta } from './venta.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idP: number;

  @Column()
  fecha: Date;

  @Column()
  medioPago: string;

  @Column()
  monto: number;

  @Column()
  caja: string;

  @Column()
  sala: string;

  @Column()
  mesa: number;

  @Column()
  cancelado: string;
}