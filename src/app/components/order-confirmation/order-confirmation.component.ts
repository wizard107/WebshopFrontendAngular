import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  reviews: number;
}


@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Gepolsterter Sessel',
      brand: 'BrandX',
      price: 299.99,
      image: 'assets/gepolsterter_sessel.jpg',
      quantity: 2,
      reviews: 120
    },
    {
      id: 2,
      name: 'Holzhocker',
      brand: 'BrandY',
      price: 89.99,
      image: 'assets/holzhocker.jpg',
      quantity: 1,
      reviews: 85
    }
  ];
  // Calculate total price of all items
  getTotalPrice(): string {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }
}
