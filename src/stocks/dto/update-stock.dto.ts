import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(CreateStockDto) {

    TransactionDate: Date;

    Type: string;	

    Qtty: number;

    CoinId: number;

    Remarks: string;
}
