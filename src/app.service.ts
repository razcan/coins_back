import { Injectable } from '@nestjs/common';
// import { BNR } from 'bnr';
import BNR = require("bnr")
import { LessThan } from 'typeorm';

@Injectable()
export class AppService {
   
  getHello(): any {

    let result = BNR.convert(1, "EUR", "RON", function (err, amount, output) {
      if (err) { return console.error(err); }
      console.log(`Result: ${amount}`);
 //     console.log(`${output.input.amount} ${output.input.currency} is ${output.output.amount} ${output.output.currency}`);
  });
  return result;
  }
}
