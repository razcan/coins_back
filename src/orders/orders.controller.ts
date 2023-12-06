import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateDetailsOrderDto } from './dto/createdetails-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { MailerService } from '../../mailer.service'


@Controller('orders')
export class OrdersController {


  constructor(private readonly ordersService: OrdersService,
    ) {
    }


  @Post()
  create(@Body() createOrderDto: any) {
    const header:CreateOrderDto = createOrderDto.header 
    const details:CreateDetailsOrderDto = createOrderDto.orderDetails
    this.ordersService.create(header,details);
   
  }

@Post('sendEmail')
async sendMail(): Promise<void> {
const mailerService = new MailerService();

const to = 'razvan.mustata@gmail.com';
const subject = 'Test Email';
const text = 'This is a test email sent from a Node.js app with nodemailer.';

mailerService.sendMail(to, subject, text)
  .then(() => console.log('Email sent successfully.'))
  .catch(error => console.error('Error sending email:', error));
}


  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('client/:id')
  clientOrder(@Param('id') id: string) {
    // console.log('paici')
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
