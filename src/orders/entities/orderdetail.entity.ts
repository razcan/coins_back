import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany,JoinTable,OneToOne, InsertResult,JoinColumn,TreeChildren,TreeParent, ManyToOne, ManyToMany } from 'typeorm';
import { Order } from './order.entity'
import { Coin } from 'src/coins/entities/coin.entity';

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    CreatedAt: Date;
    @Column()
    CoinId: number; 
    @Column()
    Quantity: number;
    @Column()
    UnitPrice: number;
    @Column()
    Discount: number;
    @Column()
    Total: number;

     @ManyToOne(() => Order, (order) => order.orderdetails)
     order: Order;

     @ManyToMany(() => Coin)
     @JoinTable()
     coin: Coin[]
}
