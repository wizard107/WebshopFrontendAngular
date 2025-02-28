import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/productService';
import {Observable} from 'rxjs';
import {CartService} from "../../services/CartService";
import { ProductCategories } from '../../model/enums/product-categories';

@Component({
  selector: 'app-product-detail',
  standalone: false,

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Observable<Product | null> | undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));

      if (productId) {
        const foundProduct = this.productService.getProductById(productId);

        if (foundProduct) {
          this.product = foundProduct;
        } else {
          console.warn('Product not found, using fallback.');
          //this.product = this.getFallbackProduct(); // Assign a default product
        }
      }
    });
  }

  getProductImageUrl(productId: number): string {
    return this.productService.getProductImageUrl(productId);
  }

  getFallbackProduct(): {
    imageId: string;
    color: string;
    material: string;
    price: number;
    name: string;
    description: string;
    id: number;
    category: undefined;
    inventory: undefined
  } {
    return {
      category: undefined, color: '', inventory: undefined, material: '',
      id: 0,
      name: 'Unkonwn Product',
      description: 'This Product does not exist or has been removed.',
      price: 0,
      imageId: 'assets/placeholder.jpg'
    };
  }
  addToCart(product: Product): void {
    console.log("add to cart", product);
    this.cartService.addToCart(product);
    alert('Product has been added to the cart!');
  }
  // Increment quantity
  incrementQuantity(): void {
    this.quantity++;
  }

  // Decrement quantity
  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  formatCategory(category: any): string {
    if (category === undefined || category === null) return 'Not specified';
    
    // Get the string representation of the enum value
    const categoryString = String(category);
    
    // Replace underscores with spaces and format properly
    return categoryString
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

}
