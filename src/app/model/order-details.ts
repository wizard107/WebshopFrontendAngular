import { User } from './user';
import { OrderStatus } from './enums/order-status';
import { PaymentStatus } from './enums/payment-status';
import { PaymentMethod } from './enums/payment-method';

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