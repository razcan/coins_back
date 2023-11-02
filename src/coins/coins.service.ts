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


@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
    @InjectRepository(FileInfo)
    private readonly fileRepository: Repository<FileInfo>,
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
    const coin_rezult  =  await this.coinRepository.save(createCoinDto)
//to
    for (let i=0 ; i<file_related.length; i++)
    {
      file_related[i].coinId=coin_rezult.id;
    }
   
    await this.coinRepository.save(createCoinDto)
    await this.fileRepository.save(file_related) ;

  }

  async findAll() {
    return this.coinRepository.find(
      {
        relations: {
          fileinfos: true,
        },
    }
    );
  }

  async findOne(id: number) {
    const web_link = await this.coinRepository.find(
      {
        relations: {
          fileinfos: true,
        },
    }
    );
    console.log('gigiiiiiiiiiiiiiiiii',web_link[0].fileinfos[0].filename);
    const fileStream = createReadStream(`./upload/${web_link[0].fileinfos[0].filename}`);
    const link = `http://localhost:3000/coins/download/${web_link[0].fileinfos[0].filename}`
    return link;

    // return this.coinRepository.find(
    //   { where: {
    //     id: id},
    //     relations: {
    //       fileinfos: true,
    //     }
    //   }
      
    //   );
  }

  update(id: number, updateCoinDto: UpdateCoinDto) {
    return this.coinRepository.update(id, updateCoinDto);
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
