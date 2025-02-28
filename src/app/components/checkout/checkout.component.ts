import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {CartItem, CartService} from '../../services/CartService';
import {CommonModule} from '@angular/common';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-checkout',
  standalone: false,
  
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  private cartSubscription: Subscription | null = null;

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to cart items changes
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getTotalPrice(): string {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product.price * item.quantity;
    }
    return total.toFixed(2);
  }

  getProductImageUrl(productId: number): string {
    return this.productService.getProductImageUrl(productId);
  }
}

