import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne,OneToOne,JoinColumn } from 'typeorm';
import { Coin } from './coin.entity';


@Entity()
export class FileInfo{

    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    CreatedAt: Date;
    @Column({nullable: true})
    fieldname: string;	//files 
    @Column({nullable: true})
    originalname:string; //"jpg.jpeg",
    @Column({nullable: true})
    encoding: string; //"7bit",
    @Column({nullable: true})
    mimetype: string; //"image/jpeg",
    @Column({nullable: true})
    destination: string; //"./upload",
    @Column({nullable: true})
    filename: string; //"files-1698858353186-975370700.jpeg",
    @Column({nullable: true})
    path: string; //"upload/files-1698858353186-975370700.jpeg",
    @Column({nullable: true})
    size: number;//5800
    @Column({nullable: true})
    coinId: number;//5800


    @ManyToOne(() => Coin, (coin) => coin.fileinfos)
    // @JoinColumn({ referencedColumnName: "id" })
    coin: Coin;
}