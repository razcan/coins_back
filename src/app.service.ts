import { Injectable } from '@nestjs/common';
//https://github.com/Bloggify/node-bnr
import BNR = require("bnr")

@Injectable()
export class AppService {
   
  getExchangeForEUR(): any {

    let result = BNR.convert(1, "EUR", "RON", function (err, amount, output) {
      if (err) { return console.error(err); }
      console.log(`Result: ${amount}`);
 //     console.log(`${output.input.amount} ${output.input.currency} is ${output.output.amount} ${output.output.currency}`);
  });
  return result;
  }
}
