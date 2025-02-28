import { User } from './user';
import { OrderStatus } from './enums/order-status';
import { PaymentStatus } from './enums/payment-status';
import { PaymentMethod } from './enums/payment-method';
import { Product, ProductDTO } from './product';

export class OrderDetails {
    id: number;
    orderDate: string;
    totalAmount: number;
    currency: string;
    shippingAddress: string;
    user: User;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;

    constructor(
        id: number, orderDate: string, totalAmount: number, currency: string, shippingAddress: string, user: User,
        orderStatus: OrderStatus, paymentStatus: PaymentStatus, paymentMethod: PaymentMethod
    ) {
        this.id = id;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.currency = currency;
        this.shippingAddress = shippingAddress;
        this.user = user;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
    }
}

export class OrderDetailsDTO {
    orderDate: string;
    totalAmount: number;
    currency: string;
    shippingAddress: string;
    userId: number;
    orderStatus: OrderStatus; // Assuming OrderStatus is a string enum
    paymentStatus: PaymentStatus; // Assuming PaymentStatus is a string enum
    paymentMethod: PaymentMethod; // Assuming PaymentMethod is a string enum
    products: ProductDTO[];
  
    constructor(
      orderDate: string,
      totalAmount: number,
      currency: string,
      shippingAddress: string,
      userId: number,
      orderStatus: OrderStatus,
      paymentStatus: PaymentStatus,
      paymentMethod: PaymentMethod,
      products: ProductDTO[]
    ) {
      this.orderDate = orderDate;
      this.totalAmount = totalAmount;
      this.currency = currency;
      this.shippingAddress = shippingAddress;
      this.userId = userId;
      this.orderStatus = orderStatus;
      this.paymentStatus = paymentStatus;
      this.paymentMethod = paymentMethod;
      this.products = products;
    }
}