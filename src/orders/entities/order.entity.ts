import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany,JoinTable,OneToOne, 
    InsertResult,JoinColumn,TreeChildren,TreeParent } from 'typeorm';
import { OrderDetails } from './orderdetail.entity';
import { SetMetadata } from '@nestjs/common';


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    uuid: string;
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
    @Column()
    Email: string;
    @Column()
    Phone: string;
    @Column()
    Remarks: string;
    
     @OneToMany(() => OrderDetails, (orderdetails) => orderdetails.order)
     orderdetails: OrderDetails[];
}
