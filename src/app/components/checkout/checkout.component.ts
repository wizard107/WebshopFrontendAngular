import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../../services/CartService';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/productService';
import { CheckoutService } from '../../services/checkoutService';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private cartSubscription: Subscription | null = null;
  
  @ViewChild(AddressComponent) addressComponent!: AddressComponent;
  @ViewChild(PaymentComponent) paymentComponent!: PaymentComponent;

  constructor(
    private cartService: CartService, 
    private productService: ProductService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

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
  
  proceedToReview(): void {
    // Validate forms before proceeding
    const addressValid = this.addressComponent.isValid();
    const paymentValid = this.paymentComponent.isValid();
    
    if (addressValid && paymentValid) {
      // Forms are valid, navigate to order review
      this.router.navigate(['/order-review']);
    } else {
      // Scroll to the first invalid field
      const invalidElement = document.querySelector('.error-message');
      if (invalidElement) {
        invalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}