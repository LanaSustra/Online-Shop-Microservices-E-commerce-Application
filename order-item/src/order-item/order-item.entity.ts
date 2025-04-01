import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;
}
