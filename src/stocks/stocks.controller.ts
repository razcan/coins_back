import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stocksService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.stocksService.findOne(+id);
  // }

  @Get(':coinId')
  findbyCoinId(@Param('coinId') coinId: string) {
    return this.stocksService.findbyCoinId(+coinId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}
