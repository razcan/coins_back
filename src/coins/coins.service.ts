import { Injectable, Param, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { Coin } from '../coins/entities/coin.entity';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { CreateFileInfoDTO } from './dto/create-fileinfo.dto'
import { FileInfo } from '../coins/entities/fileinfo.entitty'
import * as fs from 'fs';
import { StreamableFile, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StocksService } from 'src/stocks/stocks.service';
import { Stock } from 'src/stocks/entities/stock.entity';



@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
    @InjectRepository(FileInfo)
    private readonly fileRepository: Repository<FileInfo>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}


  async deletePicture(@Param('fileName') fileName: string) {
   await fs.unlink(`./upload/${fileName}`, (err) => {
    if (err) {
     console.error(err);
     return err;    
    }
   });
  }


  async downloadFile(@Param('fileName') fileName: string,  @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const file = createReadStream(join(process.cwd(), fileName //'package.json'
    ));
    return new StreamableFile(file);
  }

  async create(createCoinDto: CreateCoinDto, createFileInfoDto: CreateFileInfoDTO[]) {   

     const file_related = createFileInfoDto;

     // Clone the input date to avoid modifying the original date
    const resultStartDate = new Date(createCoinDto.StartDate);
    const resultEndDate = new Date(createCoinDto.EndDate);
   
    // Subtract one day by adjusting the date value
    resultStartDate.setDate(resultStartDate.getDate() + 1);
    resultEndDate.setDate(resultEndDate.getDate() + 1);
    
    createCoinDto.StartDate = resultStartDate;
    createCoinDto.EndDate = resultEndDate;
    // console.log('serviciu:',createCoinDto.StartDate, createCoinDto.EndDate);

    // createCoinDto.StartDate.setDate(createCoinDto.StartDate.getDate() + 1);
    // createCoinDto.EndDate.setDate(createCoinDto.EndDate + 1);

    createCoinDto.Photo1 =file_related[0].filename;
    createCoinDto.Photo2 =file_related[1].filename;

    const coin_rezult  =  await this.coinRepository.save(createCoinDto)

    for (let i=0 ; i<file_related.length; i++)
    {
      file_related[i].coinId=coin_rezult.id;
    }

   this.stockRepository.save(  
      {TransactionDate: new Date,
      Type: 'Initial Stock',
      Qtty: coin_rezult.Stock,
      CoinId: coin_rezult.id,
      Remarks: 'Initial Stock'}
      )
    
    // await this.coinRepository.save(createCoinDto)
    await this.fileRepository.save(file_related) ;
    // return rezult;
    

  }

  async findAll() {
    return this.coinRepository.find(); 
    // return this.coinRepository.find(
    //   {
    //     relations: {
    //       fileinfos: true,
    //     },
    // }
    // );
  }

  async findAllByCreatedDate(nr:number) {

    const startDate = new Date;
    startDate.setDate(startDate.getDate() - nr);

    const actualDate = new Date;


    const results = await this.coinRepository
      .createQueryBuilder('coin')
      .where(`coin.CreatedAt BETWEEN '${startDate.toISOString()}' AND '${actualDate.toISOString()}'`)
      .getMany();
    return results

  }


  async findCountries() {
   // select Continent , Country , Code, count(*)Nr from coin group by Continent , Country , Code

   // Get the EntityManager
   //const entityManager = connection.createEntityManager();

   // Define your custom SQL query
  //  const customQuery = 'SELECT * FROM user WHERE email LIKE :email';
   const customQuery = 
   'select Continent , Country , Code, count(*)Nr from coin where Stock>0 group by Continent , Country , Code';

    // Execute the query with parameters
    // const results = await this.coinRepository.query(customQuery, { email: 'example@example.com' });
    const results = await this.coinRepository.query(customQuery);
    // console.log(results);
    return results

  }

  async getcoinsbycountry(country: string) {
    const results = await this.coinRepository
      .createQueryBuilder('coin')
      .where('coin.Country = :Country', { Country: country })
      // .andWhere('coin.Stock > Stock', {Stock: 0})
      .getMany();
   return results;    
  }

  async findOne(id: number) {
    const web_link = await this.coinRepository.find(
      {where: {
            id: id},
      
    }
    );

    // const monede = await this.coinRepository.find(
    //   {where: {
    //     id: id},
    //   }
    // )

    // const fisiere = await this.fileRepository.find(
    //   {where: {
    //     coinId: id},
    //   }
    // )

    // const valueForKey0 = fisiere["0"];
    // const valueForKey1 = fisiere["1"];
    // console.log(valueForKey0.filename);  // Output: Hello, World!
    // console.log(valueForKey1.filename);  // Output: Hello, World!
   
    //myArray = myArray.concat(myObject); // Add the object to the array
    // const newArray = web_link.map(item => item.fileinfos);
    
    // const response_length= web_link.length;
    // const response_length_fileinfos= web_link[0].fileinfos.length;
    // for (let i=0;i<response_length;i++){
    //   for (let j=0; j<response_length_fileinfos; j++)
    //   console.log(web_link[i].fileinfos[j].path);

    //  }

  //   const newArray2 = newArray[0].map(item => 'http://localhost:3000/coins/download/'+item.filename);
  //  // console.log(newArray2);
  //   const myArray = [...web_link, newArray2]; 
    return web_link;

  }

 async update(id: number, updateCoinDto: UpdateCoinDto, 
  createFileInfoDto: CreateFileInfoDTO[]) {

    // console.log('ctr cu p',updateCoinDto,createFileInfoDto);
          const file_related = createFileInfoDto;
          updateCoinDto.Photo1 =file_related[0].filename;
          updateCoinDto.Photo2 =file_related[1].filename;

          const toremove = await this.fileRepository.find({
            where: {
                coinId: id
            },
        })

        for (let i=0 ; i<toremove.length; i++)
        {
          this.deletePicture(toremove[i].filename);
        }
          this.fileRepository.delete({coinId: id});
          this.fileRepository.save(createFileInfoDto);
          this.coinRepository.update(id, updateCoinDto);

   }

  async updateWithoutFiles(id: number, updateCoinDto: UpdateCoinDto) {
    console.log('ctr fara p',updateCoinDto);
     this.coinRepository.update(id, updateCoinDto);
  
    }



  async remove(id: number) {

  const toremove = await this.fileRepository.find({
      where: {
          coinId: id
      },
  })

  for (let i=0 ; i<toremove.length; i++)
  {
    this.deletePicture(toremove[i].filename);
  }
     this.fileRepository.delete({coinId: id});
     this.coinRepository.delete({id});
  }

}
