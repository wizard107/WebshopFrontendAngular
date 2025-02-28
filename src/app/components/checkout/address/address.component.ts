import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkoutService';

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

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  addressData: AddressData = {
    mail: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  };
  
  // Validation flags
  mailInvalid = false;
  firstNameInvalid = false;
  lastNameInvalid = false;
  addressLine1Invalid = false;
  cityInvalid = false;
  zipCodeInvalid = false;
  countryInvalid = false;
  
  constructor(private checkoutService: CheckoutService) {}
  
  ngOnInit(): void {
    // Pre-populate form with any existing data
    const savedData = this.checkoutService.getAddressData();
    if (savedData.mail) {
      this.addressData = { ...savedData };
    }
  }
  
  isValid(): boolean {
    let isValid = true;
    
    // Reset validation flags
    this.mailInvalid = false;
    this.firstNameInvalid = false;
    this.lastNameInvalid = false;
    this.addressLine1Invalid = false;
    this.cityInvalid = false;
    this.zipCodeInvalid = false;
    this.countryInvalid = false;
    
    // Validate email
    if (!this.addressData.mail || !this.isValidEmail(this.addressData.mail)) {
      this.mailInvalid = true;
      isValid = false;
    }
    
    // Validate other required fields
    if (!this.addressData.firstName) {
      this.firstNameInvalid = true;
      isValid = false;
    }
    
    if (!this.addressData.lastName) {
      this.lastNameInvalid = true;
      isValid = false;
    }
    
    if (!this.addressData.addressLine1) {
      this.addressLine1Invalid = true;
      isValid = false;
    }
    
    if (!this.addressData.city) {
      this.cityInvalid = true;
      isValid = false;
    }
    
    
    if (!this.addressData.zipCode) {
      this.zipCodeInvalid = true;
      isValid = false;
    }
    
    if (!this.addressData.country) {
      this.countryInvalid = true;
      isValid = false;
    }
    
    // Save the data regardless of validation to preserve user input
    this.checkoutService.setAddressData(this.addressData);
    
    return isValid;
  }
  
  // Email validation helper
  private isValidEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }
}