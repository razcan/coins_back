import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany,JoinTable,OneToOne, 
    InsertResult,JoinColumn,TreeChildren,TreeParent } from 'typeorm';
import { SetMetadata } from '@nestjs/common';


@Entity()
export class Stock {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    CreatedAt: Date;
    @Column()
    TransactionDate: Date;
    @Column()
    Type: string;	
    @Column()
    Qtty: number;
    @Column()
    CoinId: number;
    @Column()
    Remarks: string;
    
}
