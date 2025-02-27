import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://cloud-808233828339.europe-west3.run.app/api/v1/webshop/product';
  baseImageUrl = 'https://storage.googleapis.com/webshop-images/products/';

  constructor(private http: HttpClient) {}

  // Methode zum Abrufen aller Produkte
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAll`);
  }

  // Methode zum Abrufen eines Produkts nach ID
  getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getProductImageUrl(productId: number): string {
    return `${this.baseImageUrl}${productId}/image1.jpg`;
  }
}