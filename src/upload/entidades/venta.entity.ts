import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Adicion } from './adicion.entity';
import { Pago } from './pago.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  creacion: Date;

  @Column()
  cerrada: Date;

  @Column()
  caja: string;

  @Column()
  estado: string;

  @Column()
  mesa: number;

  @Column()
  sala: string;

  @Column()
  camarero: string;

  @Column()
  medioPago: string;

  @Column('float')
  total: number;

  @Column()
  tipoVenta: string;

  @OneToMany(() => Adicion, adicion => adicion.venta)
  adiciones: Adicion[];

}