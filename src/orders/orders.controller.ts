import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateDetailsOrderDto } from './dto/createdetails-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';



@Controller('orders')
export class OrdersController {


  constructor(private readonly ordersService: OrdersService,
    ) {
    }


  @Post()
  create(@Body() createOrderDto: any) {
    const header:CreateOrderDto = createOrderDto.header 
    const details:CreateDetailsOrderDto = createOrderDto.orderDetails
    // this.sendMail(header);
    this.ordersService.create(header,details);
   
  }

  @Post('contact')
  sendContactMail(@Body() contact: any) {
   this.ordersService.sendContactMail(contact.header);
   return contact.header
    // this.sendMail(header);
   
   
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('client/:id')
  clientOrder(@Param('id') id: string) {
    return this.ordersService.clientOrder(id);
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
