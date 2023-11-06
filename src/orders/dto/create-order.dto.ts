export class CreateOrderDto { 
    OrderDate: Date;
    Customer: string;	
    TotalAmount: number;
    OrderStatus: string;
    ShippingAddress: string;	
    PaymentMethod: string;
    ShippingMethod: string;
}
