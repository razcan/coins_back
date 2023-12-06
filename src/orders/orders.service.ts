import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateDetailsOrderDto } from './dto/createdetails-order.dto';
// import { Order } from './entities/order.entity';
import { Order } from './entities/order.entity'
import { OrderDetails } from './entities/orderdetail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { DataSource } from "typeorm"
import "reflect-metadata"


const AppDataSource = new DataSource({
  type: "sqlite",
  name: "teste",
  database: 'db.db',
  entities: [ Order ,OrderDetails, ],
  // entities: [__dirname + '/../**/*.entity.ts'] ,
  migrations: [/*...*/],
  logging: true,
  synchronize: true,
  migrationsTableName: 'custom_migration_table',
})



@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderdetailsRepository: Repository<OrderDetails>,
    private dataSource: DataSource
  ) {}

  async create(header : any, details: any) {

     const order_details = details.length;
     const order_rezult = await this.orderRepository.save(header);

    for (let i=0 ; i<order_details; i++)
    {
      details[i].orderId=order_rezult.id;
    }
     await this.orderdetailsRepository.save(details);
   
     return order_rezult;
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

  findOne(id: any) {
    return this.orderRepository.find(
      {where: {
        id: id},
    relations: {
      orderdetails: true,
              },
      }
    );
  }

 async clientOrder(id: number) {
  console.log(id)

  const manager = this.orderRepository
  const custom_query = 
  `SELECT o.id,o.OrderDate ,o.Customer ,o.TotalAmount ,o.OrderStatus ,o.ShippingAddress 
  ,Email ,Phone , od2.Quantity ,
  od2.UnitPrice ,od2.UnitPrice ,od2.Total , c.Code ,c.Name ,c.Photo1 , c.Photo2 ,c.Year ,c.Status 
  FROM [order] o
  join order_details od2  on od2.orderId  =o.id 
  join coin c on c.id =od2.CoinId 
  where o.id =${id}
  ;
  `
  const result = await manager.query(custom_query)

  // const users = await AppDataSource.query(
  //   'select * FROM order '
  // );

console.log(result);

//   const manager = AppDataSource.manager;
//   const result = await manager.query('select * FROM order WHERE id = 1', [
//       1,
//     ]);
// console.log(result);

  // const user = await AppDataSource.manager
  //   .createQueryBuilder(Order, "order")
  //   .where("order.id = :id", { id: 1 })
  //   .getOne()



  // return await this.order2Repository.getOrders();
  

//   const DataSource =   AppDataSource.getRepository(Order)
// console.log('z',DataSource)

//const userMetadata = AppDataSource.hasMetadata(Order)

// const userMetadata = this.dataSource;
// const order = await AppDataSource
//     .createQueryBuilder()
//     .select("order")
//     .from(Order, "order")
//     .where("order.id = :id", { id: 1 })
//     .getOne()

    // console.log('order',userMetadata)

// const order = await DataSource.manager
//     .createQueryBuilder(Order, "user")
//     .where("user.id = :id", { id: 1 })
//     .getOne()

//     console.log(order)


  // const person = await AppDataSource.manager.findOneBy(Order, { id: 1 })

//   const user = await AppDataSource.getRepository(Order).findOneBy({
//     id: '39',
// })

  // const person = await AppDataSource.getRepository().findOneBy({ id: 1 })
  //  console.log(person);

  // return this.orderRepository.find()

  // const firstOrder = await AppDataSource
  //   .getRepository(Order)
  //   .createQueryBuilder("order")
  //   .where("id = :id", { id: 39 })
  //   .getOne()

    // const firstOrder = await config.manager
    // .createQueryBuilder(Order, "order")
    // .where("order.id = :id", { id: 39 })
    // .getOne()

    // console.log('ia sa vedem',firstOrder)

  // return AppDataSource.manager.find(Order)

  // const user = await AppDataSource.getRepository

    // const customQuery = 
    // 'SELECT o.id,o.OrderDate ,o.Customer ,o.TotalAmount ,o.OrderStatus ,o.ShippingAddress ,Email ,Phone , od.Quantity ,od.UnitPrice ,od.UnitPrice ,od.Total ,
    // c.Code ,c.Name ,c.Photo1 , c.Photo2 ,c.Year ,c.Status 
    // FROM order o
    // join order_details od on od.orderId  =o.id 
    // join coin c on c.id =od.CoinId 
    // where o.id=39';
 
     // Execute the query with parameters
     // const results = await this.coinRepository.query(customQuery, { email: 'example@example.com' });
    //  const results = await this.orde.query(customQuery);

  }

 async update(id: any, updateOrderDto: any) {

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

  async remove(id: any) {

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
