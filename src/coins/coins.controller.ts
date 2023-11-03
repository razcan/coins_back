import { Controller, Get, Post, Body, Patch, Param,Header, Delete, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { CreateFileInfoDTO } from './dto/create-fileinfo.dto'
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
import { FileInfo } from './entities/fileinfo.entitty';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';




@Controller('coins')
export class CoinsController {
  constructor
  (
    private readonly coinsService: CoinsService,
    @InjectRepository(FileInfo)
    private readonly userRepository: Repository<FileInfo>,
    ) {}


  // @Post()
  // async create(@Body() createCoinDto: CreateCoinDto) {
  //   const coin = await this.coinsService.create(createCoinDto);
  //   if(!coin) {
  //     return 'error in creating coin'
  //   }
  //   return 'coin created successfully!!!'
  // }

  //multiple files upload
// @Post('uploadm')
// @UseInterceptors(FilesInterceptor('files'))
// uploadFilem(@UploadedFiles() files: Array<Express.Multer.File>) {
// // console.log(files);
// return {
//   message: 'Files uploaded successfully',
//   fileCount: files.length,
//   all_files: files, 
// }
// }

@Post('uploadm')
@UseInterceptors(FilesInterceptor('files'))
uploadFiles(@UploadedFiles() files, @Body() createCoinDto: CreateCoinDto,@Body() createFileDto: CreateFileInfoDTO[]) {
  createFileDto=files;
  this.coinsService.create(createCoinDto,createFileDto);
  return {
    message: 'Files and data uploaded successfully',
    fileCount: files.length,
    filesInfo: files,
    data: createCoinDto, // This contains the DTO data
  };
}

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const fileStream = createReadStream(`./upload/${filename}`);
    fileStream.pipe(res);
  }

  // @Get('ff')
  // @Header('Content-Type', 'application/json')
  // @Header('Content-Disposition', 'attachment; filename="package.json"')
  // getStaticFile(): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), 'package.json'));
  //   return new StreamableFile(file);
  // }  

  // @Get('file')
  // getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), 'package.json'
  //   ));
  //   // res.set({
  //   //   'Content-Type': 'application/json',
  //   //   'Content-Disposition': 'attachment; filename="package.json"',
  //   // });
  //   return new StreamableFile(file);
  // }


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



