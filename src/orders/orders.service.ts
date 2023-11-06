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

  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    await this.createOrderRepository.save(createOrderDto)
    // return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
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
