import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateDetailsOrderDto } from './dto/createdetails-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetails } from './entities/orderdetail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly createOrderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly createorderdetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(createOrderDto: any) {
 
    const order_details = createOrderDto.DetailsOrder.length;

    const order_rezult = await this.createOrderRepository.save(createOrderDto);

    for (let i=0 ; i<order_details; i++)
    {
      createOrderDto.DetailsOrder[i].orderId=order_rezult.id;
     //console.log('xx',createOrderDto.DetailsOrder[i])
    }
    console.log(createOrderDto.DetailsOrder);
    await this.createorderdetailsRepository.save(createOrderDto.DetailsOrder);
   return 'This action adds a new order: '+createOrderDto;
  }

  findAll() {
    return this.createOrderRepository.find(
      {
        relations: {
          orderdetails: true,
        },
    }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
