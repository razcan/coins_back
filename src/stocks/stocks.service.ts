import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>
  ) {}


 async create(createStockDto: CreateStockDto) {
    const order_rezult = await this.stockRepository.save(createStockDto);
    return order_rezult;
  }

  findAll() {
      return this.stockRepository.find();
  }


  findbyCoinId(coinId: any) {
    return this.stockRepository.find(
      {where: {
        CoinId: coinId},
      }
    );
  }

  
  remove(id: number) {
    this.stockRepository.delete({id});
  }
}
