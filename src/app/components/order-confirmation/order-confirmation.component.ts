import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../../services/checkoutService';

@Component({
  selector: 'app-order-confirmation',
  standalone: false,
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit {
  orderNumber: string = '';
  
  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Generate a random order number
    this.orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    // Clear checkout data since order is complete
    this.checkoutService.clearCheckoutData();
  }
  
  continueShopping(): void {
    this.router.navigate(['/']);
  }
}