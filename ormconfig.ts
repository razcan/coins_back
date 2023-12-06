import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
// import { DataSource } from "typeorm"

import { Coin } from './src/coins/entities/coin.entity'
import { FileInfo } from "src/coins/entities/fileinfo.entitty";
import { Order } from './src//orders/entities/order.entity'
import { OrderDetails } from './src/orders/entities/orderdetail.entity'


const config: SqliteConnectionOptions = {
    type: "sqlite",
    database: 'db.db',
    name: "default",
    // "entities": [
    //    './src/**/**/*.entity.{js,ts}'
    // ],
     entities: [ Coin, FileInfo, Order ,OrderDetails, ],
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: [__dirname + '/../**/*.entity.*'],
    logging: true,
    synchronize: true,
    migrations: [/*...*/],
    migrationsTableName: 'migrations',
  }

//   export const AppDataSource = new DataSource({
//     type: "sqlite",
//     database: 'db.db',
//     entities: [ Coin, FileInfo, Order ,OrderDetails, ],
//     migrations: [/*...*/],
//     logging: true,
//     synchronize: true,
//     migrationsTableName: 'custom_migration_table',
// })

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })
  

export default config;