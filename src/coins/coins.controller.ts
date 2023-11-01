import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { FileDto } from './dto/file-coin.dto';

import { StreamableFile, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

import { Express } from 'express'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ParseFilePipeBuilder,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs';



@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}


  @Post()
  async create(@Body() createCoinDto: CreateCoinDto) {
    const coin = await this.coinsService.create(createCoinDto);
    if(!coin) {
      return 'error in creating coin'
    }
    return 'coin created successfully!!!'
  }

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get('file')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'Image1.jpeg'
    //'package.json'
    ));
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // });
    return new StreamableFile(file);
  }

@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
console.log(file);
  // fs.promises.writeFile(`./upload/${file.originalname}`, file.buffer);
}

// @UseInterceptors(FileInterceptor('file'))
// @Post('upload')
// uploadFile(
//   @Body() body: FileDto,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   return {
//     body,
//     file: file.buffer.toString(),
//   };
// }

//file with type validation
@UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @Body() body: FileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }

//multiple files upload
// @Post('upload')
// @UseInterceptors(FilesInterceptor('files'))
// uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
// console.log(files);
// }


@Post('file4')
@UseInterceptors(FilesInterceptor('files', 20))
uploadFile3(@UploadedFiles() files) {
 return files.map(
     (files: { 
         originalname: any; 
         size: any;
         filename : any;
         path: any;
         mimetype: any;
   }) => [files.originalname
      , files.size, files.filename,files.mimetype, files.path 
   ]);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinDto: UpdateCoinDto) {
    return this.coinsService.update(+id, updateCoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsService.remove(+id);
  }
}



