import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from '../coins/entities/coin.entity';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService],
  exports: [CoinsService],
  imports: [ TypeOrmModule.forFeature([Coin])]
})
export class CoinsModule {}
