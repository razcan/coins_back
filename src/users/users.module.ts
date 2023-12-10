import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEnt } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEnt])]
})
export class UsersModule {}

