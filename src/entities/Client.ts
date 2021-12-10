import { Transaction } from './Transaction';
import { Person } from './utils/Person';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Banker } from './Banker';

@Entity('client')
export class Client extends Person {
  @Column({
    type: 'numeric',
  })
  balance: number;

  @Column({
    default: true,
    name: 'active',
  })
  isActive: boolean;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additionalInfo: {
    age: number;
    hairColor: string;
  };

  @Column({
    type: 'simple-array',
    default: [],
  })
  familyMembers: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
