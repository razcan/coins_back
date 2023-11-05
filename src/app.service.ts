import { Injectable } from '@nestjs/common';
// import { BNR } from 'bnr';
import BNR = require("bnr")

@Injectable()
export class AppService {
   
  getHello(): any {

    BNR.convert(1, "EUR", "RON", function (err, amount, output) {
      if (err) { return console.error(err); }
      console.log(`Result: ${amount}`);
      console.log(`${output.input.amount} ${output.input.currency} is ${output.output.amount} ${output.output.currency}`);
      // Result: 107.72102819395911
      // 100 EUR is 107.72102819395911 USD
  });
  }
}
