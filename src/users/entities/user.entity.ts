import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany,
    JoinTable,OneToOne, InsertResult,JoinColumn,TreeChildren,TreeParent, ManyToMany } 
    from 'typeorm';

//Here we have the table structure - how the data it will be saved in DB. Comparing with DTO where we have only the entered values by user.

@Entity()
export class UserEnt {

    @PrimaryGeneratedColumn()
    userId: number;
    @CreateDateColumn()
    createdat: Date;
    @Column()
    username: string;	
    @Column()
    password: string;	
    @Column()
    role: string;
    @Column()
    name: string;	
    @Column()
    avatar: string;	 

}
