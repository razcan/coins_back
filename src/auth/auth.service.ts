import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEnt } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username,password) {
  const userrzc = await this.usersService.findUser(username,password);
      if (userrzc.length==0) {
      throw new UnauthorizedException();
       }
       const payload = { sub: userrzc, username: userrzc };
           return {
             access_token: await this.jwtService.signAsync(payload),
          };
  }

  // async signIn(username, pass) {
  //   const user = await this.usersService.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }

  //   const payload = { sub: user.userId, username: user.username };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}