import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from '../coins/entities/coin.entity';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { CreateFileInfoDTO } from './dto/create-fileinfo.dto'
import { FileInfo } from '../coins/entities/fileinfo.entitty'
import * as fs from 'fs';



// export interface CoinInterface {
//   Issuer: string;	//Romania 
//   Prince: string;	//Alexandru Ioan Cuza (1859-1862)
//   Type: string;	//Pattern
//   Year: number	//1864
//   Value: string;	//5 Sutimi = 1⁄20 Romanat (0.05)
//   Currency: string;	//Român
//   Composition: string;	//Bronze
//   Weight: number;	//7.28 g
//   Diameter: number;	//22.5 mm
//   Shape: string;	//Round
//   Technique: string;	//Milled
//   Demonetized: boolean	//Yes
//   Number: number;	//N# 197210 Help
//   References: string;	//KM# Pn B1, MBR# 185
//   Script: string; //Latin
// }

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
    @InjectRepository(FileInfo)
    private readonly fileRepository: Repository<FileInfo>,
  ) {}


  async deletePicture(@Param('fileName') fileName: string) {
   await fs.unlink(`./upload/${fileName}`, (err) => {
    if (err) {
     console.error(err);
     return err;    
    }
   });
  }

  async create(createCoinDto: CreateCoinDto, createFileInfoDto: CreateFileInfoDTO[]) {   

    const file_related = createFileInfoDto;
    const coin_rezult  =  await this.coinRepository.save(createCoinDto)

    for (let i=0 ; i<file_related.length; i++)
    {
      file_related[i].coinId=coin_rezult.id;
    }
   
    await this.coinRepository.save(createCoinDto)
    await this.fileRepository.save(file_related) ;

  }

  findAll() {
    return this.coinRepository.find();
  }

  findOne(id: number) {
    return this.coinRepository.findAndCountBy({id});
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return this.coinRepository.update(id, updateCoinDto);
  }

  async remove(id: number) {

  const toremove = await this.fileRepository.find({
      where: {
          coinId: id
      },
  })

  for (let i=0 ; i<toremove.length; i++)
  {
    this.deletePicture(toremove[i].filename);
  }
     this.fileRepository.delete({coinId: id});
     this.coinRepository.delete({id});
  }

}
