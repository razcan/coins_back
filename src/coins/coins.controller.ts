import { Controller, Get, Post, Body, Patch, Param,Header,HttpStatus,
 Delete, UploadedFile, UploadedFiles, HttpException, HttpCode,  Request, UseGuards } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { CreateFileInfoDTO } from './dto/create-fileinfo.dto'
import { UpdateCoinDto } from './dto/update-coin.dto';
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
import { AuthGuard } from '../auth/auth.guard'


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

// @UseGuards(AuthGuard)
@Post('uploadm')
@HttpCode(201)
@UseInterceptors(FilesInterceptor('files'))
uploadFiles(@UploadedFiles() files, @Body() createCoinDto: any,
@Body() createFileDto: CreateFileInfoDTO[],
@Res() res: Response
) {
  createFileDto=files;
  console.log(createCoinDto);
  this.coinsService.create(createCoinDto,createFileDto)
  //const httpstatus = res.status(HttpStatus.CREATED).send();
  const test = res.statusCode;
  if (test==201){
    throw new HttpException('Created', HttpStatus.CREATED);
  }
}

  // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  
  
  // return createCoinDto.files.length
  // {
  //   message: 'Files and data uploaded successfully',
  //   fileCount: createCoinDto.files.length,
  //   filesInfo: files,
  //   data: createCoinDto, 
  // };

  @Get()
  findAll() {
    return this.coinsService.findAll();
  }

  @Get('byCreated/:nr')
  findAllByCreatedDate(@Param('nr') nr: number) {
    // console.log('nr:',nr)
    return this.coinsService.findAllByCreatedDate(nr);
  }

  @Get('countries')
  findCountries() {
    return this.coinsService.findCountries();
  }


  @Get('getcoinsbycountry/:country')
  getcoinsbycountry(@Param('country') country: string) {
    //console.log(country);
    return this.coinsService.getcoinsbycountry(country);
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

// @UseGuards(AuthGuard)
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
console.log(file);
  // fs.promises.writeFile(`./upload/${file.originalname}`, file.buffer);
}

// @UseGuards(AuthGuard)
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


  // @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files')) 
  update(
    @UploadedFiles() files , 
    @Param('id') id: string, 
    @Body() updateCoinDto: any, 
    @Body() createFileDto: CreateFileInfoDTO[]) 
  {
   createFileDto=files;
 
   if (createFileDto.length == 2){
    return this.coinsService.update(+id,updateCoinDto,createFileDto)
   }

   if (createFileDto.length == 0){
    return this.coinsService.updateWithoutFiles(+id,updateCoinDto)
   }

  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsService.remove(+id);
  }
}



