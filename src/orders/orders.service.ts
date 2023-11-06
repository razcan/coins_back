import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateDetailsOrderDto } from './dto/createdetails-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetails } from './entities/orderdetail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface NewOrder {
   OrderDate: Date;
   Customer: string;	
   TotalAmount: number;
   OrderStatus: string;
   ShippingAddress: string;	
   PaymentMethod: string;
   ShippingMethod: string;
}

interface NewOrderDetail {
  CoinId: number; 
  Quantity: number;
  UnitPrice: number;
  Discount: number;
  Total: number;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly createOrderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly createorderdetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(createOrderDto: any) {
    
    // var newOrder : NewOrder = {
    //   Customer: createOrderDto.Customer,
    //   OrderDate: createOrderDto.OrderDate,
    //   TotalAmount: createOrderDto.TotalAmount,
    //   OrderStatus: createOrderDto.OrderStatus,
    //   ShippingAddress: createOrderDto.ShippingAddress,
    //   PaymentMethod: createOrderDto.PaymentMethod,
    //   ShippingMethod: createOrderDto.ShippingMethod
    // }  
    // var newOrderDetail : NewOrderDetail ={
    //   CoinId: createOrderDto.DetailsOrder[0].CoinId,
    //   Quantity: createOrderDto[0].DetailsOrder.Quantity,
    //   UnitPrice: createOrderDto[0].DetailsOrder.UnitPrice,
    //   Discount: createOrderDto[0].DetailsOrder.Discount,
    //   Total: createOrderDto[0].DetailsOrder.Total
    // }
    console.log('Din servicu dto: ',createOrderDto.DetailsOrder);
    // console.log('Din servicu: ',newOrder);
   // console.log('Din servicu detaliu: ',newOrderDetail);
    // await this.createOrderRepository.save(createOrderDto);
    // await this.createorderdetailsRepository.save(createDetailsOrderDto);
   return 'This action adds a new order';
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
