import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany,JoinTable,OneToOne, InsertResult,JoinColumn,TreeChildren,TreeParent, ManyToMany } from 'typeorm';
import { FileInfo } from './fileinfo.entitty';
import { OrderDetails } from 'src/orders/entities/orderdetail.entity';

//Here we have the table structure - how the data it will be saved in DB. Comparing with DTO where we have only the entered values by user.

@Entity()
export class Coin {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    CreatedAt: Date;
    @Column()
    Continent: string;	
    @Column()
    Country: string;	
    @Column()
    Code: string;
    @Column()
    Catalog: string;	
    @Column()
    Value: string;	
    @Column()
    Name: string;	
    @Column()
    Year: number	
    @Column()
    Composition: string;	
    @Column()
    Status: string;	
    @Column()
    Price: number;	
    @Column()
    References: string;	
    @Column()
    Stock: number;
    @Column()
    Photo1: string;	 
    @Column()
    Photo2: string;	 
    @Column()
    StartDate: Date;	 
    @Column()
    EndDate: Date;	 

 
    
    @OneToMany(() => FileInfo, (fileinfos) => fileinfos.coin,  {
        cascade: ["insert", "update","remove","soft-remove"],
    },)
    @JoinColumn()
    fileinfos: FileInfo[];
    // @JoinTable()
    // fileinfos: FileInfo;

    
    // @ManyToMany(() => OrderDetails, (orderdetails) => orderdetails.order)
    // @JoinColumn()
    // orderdetails: OrderDetails;


}
