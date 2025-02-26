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
  selector: 'app-shopping-cart',
  standalone: false,
  
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Gepolsterter Sessel',
      brand: 'BrandX',
      price: 299.99,
      image: 'assets/gepolsterter_sessel.jpg',
      quantity: 1,
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

  // Increase quantity
  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  // Decrease quantity
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Remove an item from cart
  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  // Calculate total price of all items
  getTotalPrice(): string {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }
}
