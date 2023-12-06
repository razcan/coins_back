import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { OrdersModule } from './orders/orders.module';
import config from '../ormconfig'

@Module({
  imports: [  
    TypeOrmModule.forRoot(
    config,
    
    ), CoinsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
