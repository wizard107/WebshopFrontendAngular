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
  // 🔹 GET: Alle Produkte abrufen
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAll`);
  }

  // 🔹 GET: Einzelnes Produkt nach ID abrufen
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // 🔹 POST: Neues Produkt speichern
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/save`, product);
  }

  // 🔹 POST: Produkt aktualisieren
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/update/${id}`, product);
  }

  // 🔹 DELETE: Produkt löschen
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getProductImageUrl(productId: number): string {
    return `${this.baseImageUrl}${productId}/image1.jpg`;
  }
}



