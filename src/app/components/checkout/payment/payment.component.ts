import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkoutService';

interface PaymentData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  paymentData: PaymentData = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };
  
  // Validation flags
  cardNumberInvalid = false;
  cardHolderInvalid = false;
  expiryDateInvalid = false;
  cvvInvalid = false;
  
  constructor(private checkoutService: CheckoutService) {}
  
  ngOnInit(): void {
    // Pre-populate form with any existing data
    const savedData = this.checkoutService.getPaymentData();
    if (savedData.cardNumber) {
      this.paymentData = { ...savedData };
    }
  }
  
  isValid(): boolean {
    let isValid = true;
    
    // Reset validation flags
    this.cardNumberInvalid = false;
    this.cardHolderInvalid = false;
    this.expiryDateInvalid = false;
    this.cvvInvalid = false;
    
    // Validate card number - must be 16 digits
    if (!this.paymentData.cardNumber || !/^\d{16}$/.test(this.paymentData.cardNumber)) {
      this.cardNumberInvalid = true;
      isValid = false;
    }
    
    // Validate card holder name
    if (!this.paymentData.cardHolder) {
      this.cardHolderInvalid = true;
      isValid = false;
    }
    
    // Validate expiry date - must be in MM/YY format
    if (!this.paymentData.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.paymentData.expiryDate)) {
      this.expiryDateInvalid = true;
      isValid = false;
    }
    
    // Validate CVV - must be 3 or 4 digits
    if (!this.paymentData.cvv || !/^\d{3,4}$/.test(this.paymentData.cvv)) {
      this.cvvInvalid = true;
      isValid = false;
    }
    
    // Save the data regardless of validation to preserve user input
    this.checkoutService.setPaymentData(this.paymentData);
    
    return isValid;
  }
}