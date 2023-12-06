import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../multer.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrderDetails } from '../orders/entities/orderdetail.entity';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService
  ],
  exports: [OrdersService],
  imports: [MulterModule.register(multerConfig), TypeOrmModule.forFeature([Order, OrderDetails,])]
})
export class OrdersModule {}
