import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { MulterModule } from '@nestjs/platform-express';
import config from '../ormconfig'
import { multerConfig } from './multer.config';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './upload',
    //   }),
    // }),  
    MulterModule.register(multerConfig),
    CoinsModule, TypeOrmModule.forRoot(
    config
    
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
