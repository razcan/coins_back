import { Order } from "../src/orders/entities/order.entity"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "sqlite",
    name: "teste",
    database: 'db.db',
    entities: [ Order , ],
    // entities: [__dirname + '/../**/*.entity.ts'] ,
    migrations: [/*...*/],
    logging: true,
    synchronize: true,
    migrationsTableName: 'custom_migration_table',
  })

const orderRepository = AppDataSource.getRepository(Order)

orderRepository.find()