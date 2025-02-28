import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Product} from '../model/product';


export class CartItem {
  constructor(
    public product: Product,
    public quantity: number
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);

  constructor() {
    // Load cart from localStorage on service initialization
    this.loadCart();
  }

  // Observable for components to subscribe to cart changes
  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Observable for cart total amount
  getCartTotal(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }

  // Get current cart item count
  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  // Add product to cart
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    console.log(existingItem);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.updateCart();
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  // Update item quantity
  updateQuantity(productId: number, quantity: number): void {
    console.log(quantity);
    console.log(productId);
    const item = this.cartItems.find(item => item.product.id === productId);

    if (item) {
      console.log(item);
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart();
      }
    }
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Private method to update cart and save to localStorage
  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.calculateTotal();
    this.saveCart();
  }

  // Calculate cart total
  private calculateTotal(): void {
    const total = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
    this.cartTotalSubject.next(total);
  }

  // Save cart to localStorage
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

// And update your loadCart method:
  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        // Ensure each item is properly formatted as CartItem
        this.cartItems = parsedItems.map((item: { product: Product; quantity: number; }) =>
          new CartItem(item.product, item.quantity)
        );
        this.updateCart();
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        this.cartItems = [];
        this.updateCart();
      }
    }
  }
}
