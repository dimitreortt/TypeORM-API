import { Client } from './Client';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum TransactionTypes {
  DEFPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionTypes,
  })
  type: string;

  @Column({ type: 'numeric' })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'client_id',
  })
  client: Client;
}
