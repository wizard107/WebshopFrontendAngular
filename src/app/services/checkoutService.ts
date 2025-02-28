import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private addressData: AddressData = {
    mail: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  };
  
  private paymentData: PaymentData = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };

  constructor() { }
  
  // Address methods
  setAddressData(data: AddressData): void {
    this.addressData = { ...data };
  }
  
  getAddressData(): AddressData {
    return { ...this.addressData };
  }
  
  // Payment methods
  setPaymentData(data: PaymentData): void {
    this.paymentData = { ...data };
  }
  
  getPaymentData(): PaymentData {
    return { ...this.paymentData };
  }
  
  // Clear all checkout data
  clearCheckoutData(): void {
    this.addressData = {
      mail: '',
      firstName: '',
      lastName: '',
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    };
    
    this.paymentData = {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    };
  }
}