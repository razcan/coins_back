import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateDetailsOrderDto } from './dto/createdetails-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    ) {}


  @Post()
  create(@Body() createOrderDto: any) {


    const header:CreateOrderDto = createOrderDto.header 
    const details:CreateDetailsOrderDto = createOrderDto.orderDetails

    //  console.log('details',createOrderDto.orderDetails[0].orderId)
    this.ordersService.create(header,details);
    // return {
    //   message: 'Order and data uploaded successfully',
    //   data: createOrderDto // This contains the DTO data
    // };
    // return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('client/:id')
  @SetMetadata('roles', ['admin'])
  clientOrder(@Param('id') id: number) {
    // console.log('paici')
    return this.ordersService.clientOrder(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(+id);
  }
}
