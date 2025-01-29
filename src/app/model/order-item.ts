import { OrderDetails } from './order-details';
import { Product } from './product';

export class OrderItem {
    id: number;
    quantity: number;
    order: OrderDetails;
    product: Product;

    constructor(id: number, quantity: number, order: OrderDetails, product: Product) {
        this.id = id;
        this.quantity = quantity;
        this.order = order;
        this.product = product;
    }
}