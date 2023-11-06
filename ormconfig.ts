import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

import { Coin } from './src/coins/entities/coin.entity'
import { FileInfo } from "src/coins/entities/fileinfo.entitty";
import { Order } from './src/orders/entities/order.entity'
import { OrderDetails } from './src/orders/entities/orderdetail.entity'

const config: SqliteConnectionOptions = {
    type: "sqlite",
    database: 'db.db',
    entities: [ Coin, FileInfo, Order ,OrderDetails, ],
  //   entities: [
  //     __dirname + '/../**/*.entity{.ts,.js}',
  // ],
    //entities: [__dirname + '/../**/*.entity.js'],
    migrations: [/*...*/],
    logging: true,
    synchronize: true,
    migrationsTableName: 'custom_migration_table',
  }

export default config;