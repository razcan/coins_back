import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from '../coins/entities/coin.entity';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';



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
  ) {}

  create(createCoinDto: CreateCoinDto) {
    return this.coinRepository.save(createCoinDto);
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

  remove(id: number) {
    return this.coinRepository.delete({id});
  }

}
