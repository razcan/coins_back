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
import {v4 as uuidv4} from 'uuid';
import { MailerService } from '../../mailer.service'
import { StocksService } from 'src/stocks/stocks.service';
import { Stock } from 'src/stocks/entities/stock.entity';


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

    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
   
    private dataSource: DataSource,
  ) {}

  async sendMail(header: any, url:any): Promise<void> {
    const mailerService = new MailerService();

     const dateTime = new Date();
     const dateAsString = dateTime.toLocaleDateString();
    
    const to = 'razvan.mustata@gmail.com';
    const bcc = 'razvan.mustata@nirogroup.ro'
    const subject = 'A new order has been added';
    const text = "";
    const html = `<h1>
    <br>
    Draga ${header.Customer.toUpperCase()},
    <br>
    Am inregistrat comanda ta din data de: ${dateAsString} in valoare de ${header.TotalAmount} RON.
    <br>
    Adresa la care se va transmite aceasta comanda este: ${header.ShippingAddress}
    <br>
    Daca doriti sa vizualizati comanda, dati click pe linkul de mai jos:
   <br>
    </h1>
    <a href="${url}">Go to Order</a>
    `
    const attachments = [
    //   {   // binary buffer as an attachment
    //     filename: 'text.txt',
    //     content:  'hello world!'
    // },
    // {   // file on disk as an attachment
    //   filename: 'git.txt',
    //   path: '/Users/razvanmustata/Projects/coins/coins-backend/git.txt' // stream this file
    // },
    ]
    
    mailerService.sendMail(to,bcc, subject, text, html,attachments)
      .then(() => console.log('Email sent successfully.'))
      .catch(error => console.error('Error sending email:', error));
    }

    async sendContactMail(header: any): Promise<void> {
      const mailerService = new MailerService();
      
      const to = 'razvan.mustata@gmail.com';
      const bcc = 'razvan.mustata@nirogroup.ro'
      const subject = 'A new request has been added!';
      const text = "";
      const html = `
      <br>
          Ati primit o inregistrare de contact la data ${header.ContactDate} de catre clientul ${header.Customer} cu numarul de telefon ${header.Phone}
          si adresa de email ${header.Email}.
          Mesajul este ${header.Message}.
      <br>
      `
      const attachments = [
      ]
      
      mailerService.sendMail(to,bcc, subject, text, html,attachments)
        .then(() => console.log('Email sent successfully.'))
        .catch(error => console.error('Error sending email:', error));
      }
    

  async create(header : any, details: any) {

     const order_details = details.length;
     header.uuid = uuidv4();
     const order_rezult = await this.orderRepository.save(header);

    for (let i=0 ; i<order_details; i++)
    {
      details[i].orderId=order_rezult.id;

      await this.stockRepository.save(
        {
          TransactionDate: new Date,
          Type: 'Decrease',
          Qtty: -1*details[i].Quantity,
          CoinId: details[i].CoinId,
          Remarks: `OrderId: ${details[i].orderId} `
        });

      
      
    }
     await this.orderdetailsRepository.save(details);
   
     const url = `http://localhost:3001/customer/uuid?uuid=${header.uuid}`

     this.sendMail(header,url)
    
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

 async clientOrder(id: string) {
  const manager = this.orderRepository
  const custom_query = 
  `SELECT o.id,o.OrderDate ,o.Customer ,o.TotalAmount ,o.OrderStatus ,o.ShippingAddress 
  ,Email ,Phone , od2.Quantity ,
  od2.UnitPrice ,od2.UnitPrice ,od2.Total , c.Code ,c.Name ,c.Photo1 , c.Photo2 ,c.Year ,c.Status 
  FROM [order] o
  join order_details od2  on od2.orderId  =o.id 
  join coin c on c.id =od2.CoinId 
  where o.uuid like '${id}'
  ;`

  // Using repository:
  // const order2 = await manager
  //   .createQueryBuilder("order")
  //   .where("order.id = :id", { id: 1 })
  //   .getOne()

  //   console.log('a',order2)

 const result = await manager.query(custom_query)

 return result
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
