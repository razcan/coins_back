import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany,JoinTable,OneToOne, InsertResult,JoinColumn,TreeChildren,TreeParent } from 'typeorm';
import { OrderDetails } from './orderdetail.entity';
@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    CreatedAt: Date;
    @Column()
    OrderDate: Date;
    @Column()
    Customer: string;	
    @Column()
    TotalAmount: number;
    @Column()
    OrderStatus: string;
    @Column()
    ShippingAddress: string;	
    @Column()
    PaymentMethod: string;
    @Column()
    ShippingMethod: string;
    
     @OneToMany(() => OrderDetails, (orderdetails) => orderdetails.order)
     orderdetails: OrderDetails;
}
