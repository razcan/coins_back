import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from '../coins/entities/coin.entity';
import { multerConfig } from '../multer.config';
import { MulterModule } from '@nestjs/platform-express';
import { FileInfo } from '../coins/entities/fileinfo.entitty';


@Module({
  controllers: [CoinsController],
  providers: [CoinsService],
  exports: [CoinsService],
  imports: [MulterModule.register(multerConfig), TypeOrmModule.forFeature([Coin,FileInfo])]
})
export class CoinsModule {}
