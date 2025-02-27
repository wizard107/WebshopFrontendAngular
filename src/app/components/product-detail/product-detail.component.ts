import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/productService';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: false,

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Observable<Product | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
      name: 'Unbekanntes Produkt',
      description: 'Dieses Produkt existiert nicht oder wurde entfernt.',
      price: 0,
      imageId: 'assets/placeholder.jpg'
    };
  }
}
