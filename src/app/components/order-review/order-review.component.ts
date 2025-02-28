import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../../services/CartService';
import { ProductService } from '../../services/productService';
import { CheckoutService } from '../../services/checkoutService';
import { OrderService } from '../../services/orderService';
import { OrderDetails, OrderDetailsDTO } from '../../model/order-details';
import { OrderStatus } from '../../model/enums/order-status';
import { PaymentMethod } from '../../model/enums/payment-method';
import { PaymentStatus } from '../../model/enums/payment-status';
import { ProductDTO } from '../../model/product';
import { User } from '../../model/user';
import { UserService } from '../../services/userService';

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
    private orderService: OrderService,
    private userService: UserService,
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
    // Create User
    const name = this.addressData.firstName + " " + this.addressData.lastName;
    const address = `${this.addressData.addressLine1}, ${this.addressData.city}, ${this.addressData.state}, ${this.addressData.zipCode}, ${this.addressData.country}`;
    const newUser = new User(name, this.addressData.mail, address);

    // Save the user first and wait for response
    this.userService.saveUser(newUser).subscribe({
      next: (savedUser) => {
        console.log('User saved successfully:', savedUser);

        // Create ProductDTOs array
        const products = this.cartItems.map(item => new ProductDTO(item.product.id, item.quantity));

        // Create OrderDetailsDTO object with newly saved user ID
        const orderDetails = new OrderDetailsDTO(
          Date.now().toString(),
          parseFloat(this.getTotalPrice()),
          'USD',
          address,
          savedUser.id!,
          OrderStatus.IN_PROCESS,
          PaymentStatus.PAID,
          PaymentMethod.CREDIT_CARD,
          products
        );

        // Save order to the database
        this.orderService.saveOrder(orderDetails).subscribe({
          next: (response) => {
            alert('Your order has been placed successfully!');
            this.cartService.clearCart();
            this.router.navigate(['/order-confirmation']);
          },
          error: (error) => {
            console.error('Error placing order:', error);
            alert('There was an error placing your order. Please try again.');
          }
        });
      },
      error: (error) => {
        console.error('Error saving user:', error);
        alert('There was an error saving your user information. Please try again.');
      }
    });
  }
}