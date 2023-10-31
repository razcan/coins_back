import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}


  @Post()
  async create(@Body() createCoinDto: CreateCoinDto) {
    const coin = await this.coinsService.create(createCoinDto);
    if(!coin) {
      return 'error in creating coin'
    }
    return 'coin created successfully!!!'
  }

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  // @Get()
  // getHello(): string {
  //   return this.coinsService.getHello();
  // }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinDto: UpdateCoinDto) {
    return this.coinsService.update(+id, updateCoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsService.remove(+id);
  }
}



