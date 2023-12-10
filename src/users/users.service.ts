import { Injectable } from '@nestjs/common';
import { Param, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { UserEnt } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEnt)
    private readonly userRepository: Repository<UserEnt>,
  ) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

   findUser(username: string, password: string) {
    const user =  this.userRepository.find(
      {where: 
            {username: username,
            password: password},
    }
    );
    return user;
}

}