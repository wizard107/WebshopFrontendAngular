import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../../services/CartService';
import { ProductService } from '../../services/productService';
import { CheckoutService } from '../../services/checkoutService';

interface AddressData {
  mail: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

@Component({
  selector: 'app-order-review',
  standalone: false,
  templateUrl: './order-review.component.html',
  styleUrl: './order-review.component.scss'
})
export class OrderReviewComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  addressData: AddressData = {
    mail: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  };
  paymentData: PaymentData = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };
  private cartSubscription: Subscription | null = null;

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
    
    // Get checkout data from the service
    this.addressData = this.checkoutService.getAddressData();
    this.paymentData = this.checkoutService.getPaymentData();
    
    // Redirect back to checkout if no data is available
    if (!this.addressData.mail || !this.paymentData.cardNumber) {
      this.router.navigate(['/checkout']);
    }
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
  
  lastFourDigits(): string {
    // Return the last 4 digits of the card number for display
    return this.paymentData.cardNumber.slice(-4);
  }
  
  placeOrder(): void {
    // Implement order placement logic here
    alert('Your order has been placed successfully!');
    // You would typically:
    // 1. Send order data to your backend
    // 2. Clear the cart
    // 3. Navigate to an order confirmation page
    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation']);
  }
}