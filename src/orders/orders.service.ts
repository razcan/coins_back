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
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderdetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(createOrderDto: any) {
 
    const order_details = createOrderDto.DetailsOrder.length;

    const order_rezult = await this.orderRepository.save(createOrderDto);

    for (let i=0 ; i<order_details; i++)
    {
      createOrderDto.DetailsOrder[i].orderId=order_rezult.id;
    }
    await this.orderdetailsRepository.save(createOrderDto.DetailsOrder);
   
    return createOrderDto;
  }

  findAll() {
    return this.orderRepository.find(
      {
        relations: {
          orderdetails: true,
        },
    }
    );
  }

  findOne(id: number) {
    return this.orderRepository.find(
      {where: {
        id: id},
    relations: {
      orderdetails: true,
              },
      }
    );
  }

 async update(id: number, updateOrderDto: any) {

    const tobe_updated = await this.orderRepository.find(
      {where: {id: id},
      // relations: { orderdetails: true,},
      }
    )
    tobe_updated[0].OrderDate =updateOrderDto.OrderDate;
    tobe_updated[0].Customer =updateOrderDto.Customer;
    tobe_updated[0].TotalAmount =updateOrderDto.TotalAmount;
    tobe_updated[0].OrderStatus =updateOrderDto.OrderStatus;
    tobe_updated[0].ShippingAddress =updateOrderDto.ShippingAddress;
    tobe_updated[0].PaymentMethod =updateOrderDto.PaymentMethod;
    tobe_updated[0].PaymentMethod =updateOrderDto.PaymentMethod;

    let details_existent = updateOrderDto.DetailsOrder;

    const details_to_update = await this.orderdetailsRepository.find({
      where: {
        orderId: id
      },
  })

  for (let i=0 ; i<details_to_update.length; i++)
  {
    let idc = details_to_update[i].id
    details_to_update[i].CoinId=details_existent[i].CoinId;
    details_to_update[i].Quantity=details_existent[i].Quantity;
    details_to_update[i].UnitPrice=details_existent[i].UnitPrice;
    details_to_update[i].Discount=details_existent[i].Discount;
    details_to_update[i].Total=details_existent[i].Total;
    this.orderdetailsRepository.update(idc, details_to_update[i])
  }

   return this.orderRepository.update(id, tobe_updated[0]);
  }

  async remove(id: number) {

    const details_to_remove = await this.orderdetailsRepository.find({
      where: {
        orderId: id
      },
  })
  
  for (let i=0 ; i<details_to_remove.length; i++){
    this.orderdetailsRepository.delete({orderId: id});
  }
     this.orderRepository.delete({id});
  
    }
  }
