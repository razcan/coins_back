import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

//Here we have the table structure - how the data it will be saved in DB. Comparing with DTO where we have only the entered values by user.

@Entity()
export class Coin {

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    CreatedAt: Date;
    @Column()
    Issuer: string;	//Romania 
    @Column()
    Prince: string;	//Alexandru Ioan Cuza (1859-1862)
    @Column()
    Type: string;	//Pattern
    @Column()
    Year: number	//1864
    @Column()
    Value: string;	//5 Sutimi = 1⁄20 Romanat (0.05)
    @Column()
    Currency: string;	//Român
    @Column()
    Composition: string;	//Bronze
    @Column()
    Weight: number;	//7.28 g
    @Column()
    Diameter: number;	//22.5 mm
    @Column()
    Shape: string;	//Round
    @Column()
    Technique: string;	//Milled
    @Column()
    Demonetized: boolean	//Yes
    @Column()
    Number: number;	//N# 197210 Help
    @Column()
    References: string;	//KM# Pn B1, MBR# 185
    @Column()
    Script: string; //Latin


}
