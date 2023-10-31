import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

import { Coin } from './src/coins/entities/coin.entity'

const config: SqliteConnectionOptions = {
    type: "sqlite",
    database: 'db',
    entities: [ Coin, ],
    logging: true,
    synchronize: true
  }

// import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"; 
// export const devConfig: PostgresConnectionOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '1234',
//   database: 'AWT',
//   entities: ["dist/**/*.entity{.ts,.js}"],
//   synchronize: true,
// }

//mysql
// TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'razvan',
//   password: 'vasilica#25',
//   database: 'api_local',
//   entities: [],
//   synchronize: true,
//   autoLoadEntities: true,
// }),

export default config;