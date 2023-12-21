import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrderDetails } from '../orders/entities/orderdetail.entity';
import { StocksService } from 'src/stocks/stocks.service';
import { Stock } from 'src/stocks/entities/stock.entity';


@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,StocksService
  ],
  exports: [OrdersService,StocksService],
  imports: [MulterModule.register(multerConfig), TypeOrmModule.forFeature([Order, OrderDetails,Stock,])]
})
export class OrdersModule {}
