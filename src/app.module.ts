import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import config from '../ormconfig'

@Module({
  imports: [
    CoinsModule, TypeOrmModule.forRoot(
    config
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
