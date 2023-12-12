import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEnt } from '../users/entities/user.entity';
import { format } from 'date-fns-tz';

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

        const currentDate = new Date();

        // Add 10 minutes to the current date
        const futureDate = new Date(currentDate.getTime());
        futureDate.setMinutes(currentDate.getMinutes() + 10);

           return {
             access_token: await this.jwtService.signAsync(payload),
             expire_date_token: futureDate,
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